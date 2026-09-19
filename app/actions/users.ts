"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { generateTempPassword } from "@/lib/password"
import { welcomeEmail, courseAssignmentEmail, adminResetEmail, sendEmail } from "@/lib/emails"
import { ASSIGNABLE_ROLES, isSuperAdminEmail, type Role } from "@/lib/roles"

interface ActionResult {
  ok: boolean
  error?: string
  message?: string
}

type AdminClient = ReturnType<typeof createAdminClient>

/**
 * Resolve the calling user's profile and enforce that they are an admin.
 * Returns the caller profile or an error result.
 */
async function requireAdmin(): Promise<
  { profile: { id: string; email: string; role: Role } } | { error: string }
> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated." }
  const { data } = await supabase.from("profiles").select("id, email, role").eq("id", user.id).single()
  if (!data) return { error: "No profile found." }
  if (data.role !== "super_admin" && data.role !== "admin") return { error: "Admin access required." }
  return { profile: data as { id: string; email: string; role: Role } }
}

/**
 * Append a row to the immutable audit log. Failures are swallowed (logged only)
 * so an audit hiccup can never roll back the underlying admin action.
 */
async function logAudit(
  admin: AdminClient,
  actor: { id: string; email: string },
  action: string,
  target?: { id?: string; email?: string },
  details?: Record<string, unknown>,
): Promise<void> {
  const { error } = await admin.from("audit_log").insert({
    actor_id: actor.id,
    actor_email: actor.email,
    action,
    target_id: target?.id ?? null,
    target_email: target?.email ?? null,
    details: details ?? null,
  })
  if (error) console.log("[v0] audit_log insert failed:", error.message)
}

async function courseTitles(admin: AdminClient, courseIds: string[]): Promise<string[]> {
  if (!courseIds.length) return []
  const { data } = await admin.from("courses").select("id, title").in("id", courseIds)
  const byId = new Map((data ?? []).map((c: { id: string; title: string }) => [c.id, c.title]))
  return courseIds.map((id) => byId.get(id)).filter((t): t is string => Boolean(t))
}

export async function createUser(input: {
  firstName: string
  lastName: string
  email: string
  role: Role
  courseIds: string[]
}): Promise<ActionResult> {
  const auth = await requireAdmin()
  if ("error" in auth) return { ok: false, error: auth.error }

  const firstName = input.firstName.trim()
  const lastName = input.lastName.trim()
  const email = input.email.trim().toLowerCase()

  if (!firstName || !lastName) return { ok: false, error: "First and last name are required." }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { ok: false, error: "Enter a valid email address." }
  if (!ASSIGNABLE_ROLES.includes(input.role)) return { ok: false, error: "Invalid role." }

  // Only the Super Admin may create Admin accounts.
  if (input.role === "admin" && !isSuperAdminEmail(auth.profile.email)) {
    return { ok: false, error: "Only the Super Admin can create Admin accounts." }
  }
  // Nobody may provision another Super Admin.
  if (isSuperAdminEmail(email)) {
    return { ok: false, error: "That address is reserved for the permanent Super Admin." }
  }

  const admin = createAdminClient()
  const tempPassword = generateTempPassword(20)

  // Create the auth user with a confirmed email so they can sign in immediately
  // with the temporary password. The DB trigger creates the profile row.
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
      role: input.role,
      invited_by: auth.profile.email,
      permanent: false,
    },
  })

  if (createErr || !created.user) {
    const msg = createErr?.message ?? "Failed to create user."
    return { ok: false, error: msg.includes("already been registered") ? "A user with that email already exists." : msg }
  }

  const userId = created.user.id
  const fullName = `${firstName} ${lastName}`

  // Ensure profile reflects the invited_by/role even if metadata parsing lagged.
  await admin.from("profiles").update({ role: input.role, invited_by: auth.profile.email }).eq("id", userId)

  // Onboarding record.
  await admin.from("onboarding").upsert({ user_id: userId, status: "pending_first_login", temp_password_active: true })

  // Assign selected courses.
  const uniqueCourseIds = Array.from(new Set(input.courseIds))
  if (uniqueCourseIds.length) {
    await admin
      .from("enrollments")
      .insert(
        uniqueCourseIds.map((course_id) => ({ user_id: userId, course_id, assigned_by: auth.profile.email })),
      )
  }
  const titles = await courseTitles(admin, uniqueCourseIds)

  // Single invitation email: it already contains the enrollment and the
  // temporary credentials, so no separate course-assignment email on creation.
  await sendEmail(
    welcomeEmail({ fullName, email, tempPassword, courses: titles, invitedBy: auth.profile.email }),
  )

  await logAudit(admin, auth.profile, "user_created", { id: userId, email }, { role: input.role, courses: titles })
  await logAudit(admin, auth.profile, "invitation_sent", { id: userId, email }, { kind: "welcome" })

  revalidatePath("/admin/users")
  revalidatePath("/admin")
  revalidatePath("/admin/dashboard")
  return {
    ok: true,
    message: `${fullName} created. A welcome email with their temporary password was sent to ${email}.`,
  }
}

export async function assignCourses(input: { userId: string; courseIds: string[] }): Promise<ActionResult> {
  const auth = await requireAdmin()
  if ("error" in auth) return { ok: false, error: auth.error }

  const admin = createAdminClient()
  const { data: profile } = await admin
    .from("profiles")
    .select("email, full_name")
    .eq("id", input.userId)
    .single()
  if (!profile) return { ok: false, error: "User not found." }

  // Skip courses already assigned.
  const { data: existing } = await admin.from("enrollments").select("course_id").eq("user_id", input.userId)
  const have = new Set((existing ?? []).map((e: { course_id: string }) => e.course_id))
  const toAdd = Array.from(new Set(input.courseIds)).filter((id) => !have.has(id))
  if (!toAdd.length) return { ok: false, error: "Those courses are already assigned." }

  await admin.from("enrollments").insert(toAdd.map((course_id) => ({ user_id: input.userId, course_id, assigned_by: auth.profile.email })))
  const titles = await courseTitles(admin, toAdd)
  await sendEmail(courseAssignmentEmail({ fullName: profile.full_name, email: profile.email, courses: titles }))

  await logAudit(admin, auth.profile, "course_assigned", { id: input.userId, email: profile.email }, { courses: titles })

  revalidatePath("/admin/users")
  revalidatePath("/admin")
  revalidatePath("/dashboard")
  return { ok: true, message: `Assigned ${toAdd.length} course(s) and recorded a notification email.` }
}

async function guardTarget(userId: string, opts: { requireSuper?: boolean }): Promise<
  {
    admin: AdminClient
    caller: { id: string; email: string }
    target: { email: string; role: Role; full_name: string }
  } | { error: string }
> {
  const auth = await requireAdmin()
  if ("error" in auth) return { error: auth.error }
  const admin = createAdminClient()
  const { data: target } = await admin
    .from("profiles")
    .select("email, role, permanent, full_name")
    .eq("id", userId)
    .single()
  if (!target) return { error: "User not found." }
  if (target.permanent || target.role === "super_admin") return { error: "The Super Admin account is protected." }
  if (target.role === "admin" && !isSuperAdminEmail(auth.profile.email)) {
    return { error: "Only the Super Admin can manage Admin accounts." }
  }
  if (opts.requireSuper && !isSuperAdminEmail(auth.profile.email)) {
    return { error: "Only the Super Admin can perform this action." }
  }
  return {
    admin,
    caller: { id: auth.profile.id, email: auth.profile.email },
    target: target as { email: string; role: Role; full_name: string },
  }
}

export async function updateUser(input: {
  userId: string
  firstName: string
  lastName: string
  role: Role
}): Promise<ActionResult> {
  const g = await guardTarget(input.userId, {})
  if ("error" in g) return { ok: false, error: g.error }

  const firstName = input.firstName.trim()
  const lastName = input.lastName.trim()
  if (!firstName || !lastName) return { ok: false, error: "First and last name are required." }
  if (!ASSIGNABLE_ROLES.includes(input.role)) return { ok: false, error: "Invalid role." }
  // Promoting to Admin (or changing an Admin's role) is a Super-Admin-only action.
  if ((input.role === "admin" || g.target.role === "admin") && !isSuperAdminEmail(g.caller.email)) {
    return { ok: false, error: "Only the Super Admin can manage Admin accounts." }
  }

  const fullName = `${firstName} ${lastName}`
  await g.admin
    .from("profiles")
    .update({ first_name: firstName, last_name: lastName, full_name: fullName, role: input.role, updated_at: new Date().toISOString() })
    .eq("id", input.userId)
  // Keep auth metadata in sync.
  await g.admin.auth.admin.updateUserById(input.userId, {
    user_metadata: { first_name: firstName, last_name: lastName, role: input.role },
  })

  await logAudit(g.admin, g.caller, "user_updated", { id: input.userId, email: g.target.email }, {
    full_name: fullName,
    role: input.role,
  })

  revalidatePath("/admin/users")
  revalidatePath("/admin")
  return { ok: true, message: `${fullName} updated.` }
}

export async function adminResetPassword(userId: string): Promise<ActionResult> {
  const g = await guardTarget(userId, {})
  if ("error" in g) return { ok: false, error: g.error }

  const tempPassword = generateTempPassword(20)
  const { error } = await g.admin.auth.admin.updateUserById(userId, { password: tempPassword })
  if (error) return { ok: false, error: error.message }

  // Force a fresh password on next login and re-arm the temporary credential.
  await g.admin.from("profiles").update({ password_changed: false, updated_at: new Date().toISOString() }).eq("id", userId)
  await g.admin.from("onboarding").upsert({ user_id: userId, status: "pending_first_login", temp_password_active: true })

  await sendEmail(adminResetEmail({ fullName: g.target.full_name, email: g.target.email, tempPassword }))
  await logAudit(g.admin, g.caller, "password_reset", { id: userId, email: g.target.email })

  revalidatePath("/admin/users")
  revalidatePath("/admin")
  return { ok: true, message: `A new temporary password was emailed to ${g.target.email}.` }
}

export async function resendInvitation(userId: string): Promise<ActionResult> {
  const g = await guardTarget(userId, {})
  if ("error" in g) return { ok: false, error: g.error }

  const tempPassword = generateTempPassword(20)
  const { error } = await g.admin.auth.admin.updateUserById(userId, { password: tempPassword })
  if (error) return { ok: false, error: error.message }

  await g.admin.from("profiles").update({ password_changed: false, updated_at: new Date().toISOString() }).eq("id", userId)
  await g.admin.from("onboarding").upsert({ user_id: userId, status: "pending_first_login", temp_password_active: true })

  // Re-send the full invitation, including the current course enrollment.
  const { data: enr } = await g.admin.from("enrollments").select("course_id").eq("user_id", userId)
  const titles = await courseTitles(g.admin, (enr ?? []).map((e: { course_id: string }) => e.course_id))
  const { data: caller } = await g.admin.from("profiles").select("invited_by").eq("id", userId).single()

  await sendEmail(
    welcomeEmail({
      fullName: g.target.full_name,
      email: g.target.email,
      tempPassword,
      courses: titles,
      invitedBy: (caller?.invited_by as string) || g.caller.email,
    }),
  )
  await logAudit(g.admin, g.caller, "invitation_sent", { id: userId, email: g.target.email }, { kind: "resend" })

  revalidatePath("/admin/users")
  revalidatePath("/admin")
  return { ok: true, message: `Invitation with a new temporary password re-sent to ${g.target.email}.` }
}

export async function suspendUser(userId: string): Promise<ActionResult> {
  const g = await guardTarget(userId, {})
  if ("error" in g) return { ok: false, error: g.error }
  await g.admin.from("profiles").update({ status: "suspended", updated_at: new Date().toISOString() }).eq("id", userId)
  await logAudit(g.admin, g.caller, "user_suspended", { id: userId, email: g.target.email })
  revalidatePath("/admin/users")
  revalidatePath("/admin")
  return { ok: true, message: "Account suspended." }
}

export async function reactivateUser(userId: string): Promise<ActionResult> {
  const g = await guardTarget(userId, {})
  if ("error" in g) return { ok: false, error: g.error }
  await g.admin.from("profiles").update({ status: "reactivated", updated_at: new Date().toISOString() }).eq("id", userId)
  await logAudit(g.admin, g.caller, "user_reactivated", { id: userId, email: g.target.email })
  revalidatePath("/admin/users")
  revalidatePath("/admin")
  return { ok: true, message: "Account reactivated." }
}

export async function promoteToAdmin(userId: string): Promise<ActionResult> {
  const g = await guardTarget(userId, { requireSuper: true })
  if ("error" in g) return { ok: false, error: g.error }
  await g.admin.from("profiles").update({ role: "admin", updated_at: new Date().toISOString() }).eq("id", userId)
  await logAudit(g.admin, g.caller, "user_updated", { id: userId, email: g.target.email }, { role: "admin", promoted: true })
  revalidatePath("/admin/users")
  revalidatePath("/admin")
  return { ok: true, message: "User promoted to Admin." }
}

export async function deleteUser(userId: string): Promise<ActionResult> {
  const g = await guardTarget(userId, {})
  if ("error" in g) return { ok: false, error: g.error }
  const targetEmail = g.target.email
  // Removing the auth user cascades to profile/enrollments/onboarding.
  const { error } = await g.admin.auth.admin.deleteUser(userId)
  if (error) return { ok: false, error: error.message }
  await logAudit(g.admin, g.caller, "user_deleted", { email: targetEmail })
  revalidatePath("/admin/users")
  revalidatePath("/admin")
  revalidatePath("/admin/dashboard")
  return { ok: true, message: "Account deleted." }
}

export async function sendPasswordReset(email: string): Promise<ActionResult> {
  const supabase = await createClient()
  const redirectTo =
    process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `https://lms.creovixa.com/auth/callback`
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), { redirectTo })
  // Always report success to avoid account enumeration.
  if (error) console.log("[v0] password reset error:", error.message)
  return { ok: true, message: "If an account exists for that address, a reset link has been recorded." }
}
