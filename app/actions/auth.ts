"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { validatePassword, generateTempPassword } from "@/lib/password"
import { welcomeEmail, sendEmail } from "@/lib/emails"
import { SUPER_ADMIN_EMAIL } from "@/lib/roles"

interface ActionResult {
  ok: boolean
  error?: string
  message?: string
}

/**
 * Complete the forced first-login password change. The user is already
 * authenticated with their temporary password; this sets their real password,
 * invalidates the temporary one, and activates the account.
 */
export async function completeFirstLogin(newPassword: string, confirmPassword: string): Promise<ActionResult> {
  if (newPassword !== confirmPassword) return { ok: false, error: "Passwords do not match." }
  const check = validatePassword(newPassword)
  if (!check.valid) return { ok: false, error: `Password must have: ${check.errors.join(", ")}.` }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: "Your session expired. Please sign in again." }

  const { error: pwErr } = await supabase.auth.updateUser({ password: newPassword })
  if (pwErr) {
    if (pwErr.message.toLowerCase().includes("different from the old"))
      return { ok: false, error: "Choose a password different from your temporary one." }
    return { ok: false, error: pwErr.message }
  }

  const now = new Date().toISOString()
  await supabase
    .from("profiles")
    .update({ password_changed: true, status: "active", last_login: now, updated_at: now })
    .eq("id", user.id)

  // Close out onboarding via service role (RLS-safe, own row also allowed).
  const admin = createAdminClient()
  await admin
    .from("onboarding")
    .update({ status: "active", temp_password_active: false, completed_at: now })
    .eq("user_id", user.id)

  revalidatePath("/", "layout")
  return { ok: true }
}

/** Record a successful login timestamp for the current user. */
export async function recordLogin(): Promise<void> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return
  await supabase.from("profiles").update({ last_login: new Date().toISOString() }).eq("id", user.id)
}

/**
 * Idempotently provision the permanent Super Admin (Ricardo Henry).
 * Returns the one-time temporary password only when the account is first created.
 */
export async function bootstrapSuperAdmin(): Promise<{ ok: boolean; created: boolean; tempPassword?: string; error?: string }> {
  const admin = createAdminClient()

  const { data: existing } = await admin.from("profiles").select("id").eq("email", SUPER_ADMIN_EMAIL).maybeSingle()
  if (existing) return { ok: true, created: false }

  const tempPassword = generateTempPassword(20)
  const { data: created, error } = await admin.auth.admin.createUser({
    email: SUPER_ADMIN_EMAIL,
    password: tempPassword,
    email_confirm: true,
    user_metadata: {
      first_name: "Ricardo",
      last_name: "Henry",
      role: "super_admin",
      invited_by: "system",
      permanent: true,
    },
  })
  if (error || !created.user) return { ok: false, created: false, error: error?.message ?? "Failed to create Super Admin." }

  const userId = created.user.id
  await admin
    .from("profiles")
    .update({ role: "super_admin", permanent: true, invited_by: "system" })
    .eq("id", userId)
  await admin.from("onboarding").upsert({ user_id: userId, status: "pending_first_login", temp_password_active: true })
  await sendEmail(welcomeEmail({ fullName: "Ricardo Henry", email: SUPER_ADMIN_EMAIL, tempPassword, courses: [] }))

  return { ok: true, created: true, tempPassword }
}
