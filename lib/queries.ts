import "server-only"
import { createClient } from "@/lib/supabase/server"
import type { Profile, Role, AccountStatus } from "@/lib/roles"

export interface CourseRow {
  id: string
  slug: string
  title: string
  category: string
  level: string
  description: string
  hours: number
  lessons_count: number
  order: number
  foundation: boolean
  cert_prefix: string
}

export interface EnrollmentRow {
  id: string
  user_id: string
  course_id: string
  progress: number
  completed: boolean
  certificate_issued: boolean
  assigned_at: string
  completed_at: string | null
  course?: CourseRow
}

/** The signed-in user's own profile, or null if not authenticated / no profile. */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase
    .from("profiles")
    .select(
      "id, first_name, last_name, full_name, email, role, status, password_changed, permanent, invited_by, created_at, updated_at, last_login",
    )
    .eq("id", user.id)
    .single()
  return (data as Profile) ?? null
}

/** All profiles (admins only, enforced by RLS). Ordered newest first. */
export async function getAllProfiles(): Promise<Profile[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("profiles")
    .select(
      "id, first_name, last_name, full_name, email, role, status, password_changed, permanent, invited_by, created_at, updated_at, last_login",
    )
    .order("created_at", { ascending: false })
  return (data as Profile[]) ?? []
}

export async function getCourses(): Promise<CourseRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("courses")
    .select("id, slug, title, category, level, description, hours, lessons_count, order, foundation, cert_prefix")
    .order("order", { ascending: true })
  return (data as CourseRow[]) ?? []
}

/** Enrollments for a specific user, with the joined course. */
export async function getEnrollmentsForUser(userId: string): Promise<EnrollmentRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("enrollments")
    .select(
      "id, user_id, course_id, progress, completed, certificate_issued, assigned_at, completed_at, course:courses(id, slug, title, category, level, description, hours, lessons_count, order, foundation, cert_prefix)",
    )
    .eq("user_id", userId)
    .order("assigned_at", { ascending: false })
  return (data as unknown as EnrollmentRow[]) ?? []
}

export interface EmailLogRow {
  id: string
  to_email: string
  from_name: string
  from_email: string
  subject: string
  body: string
  kind: string
  delivery_status: string
  provider: string
  provider_message_id: string | null
  error: string | null
  created_at: string
}

/** Recorded outbound emails (admins only, enforced by RLS). Newest first. */
export async function getEmailLog(): Promise<EmailLogRow[]> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("email_log")
    .select(
      "id, to_email, from_name, from_email, subject, body, kind, delivery_status, provider, provider_message_id, error, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(200)
  return (data as EmailLogRow[]) ?? []
}

export interface AdminStats {
  totalUsers: number
  activeUsers: number
  suspendedUsers: number
  pendingUsers: number
  courses: number
  certificates: number
  completionRate: number
  enrollments: number
  completedEnrollments: number
}

/** Platform statistics computed from real database records (admins only). */
export async function getAdminStats(): Promise<AdminStats> {
  const supabase = await createClient()
  const [{ data: profiles }, { data: courses }, { data: enrollments }] = await Promise.all([
    supabase.from("profiles").select("id, status"),
    supabase.from("courses").select("id"),
    supabase.from("enrollments").select("id, completed, certificate_issued"),
  ])

  const p = (profiles as { status: AccountStatus }[]) ?? []
  const e = (enrollments as { completed: boolean; certificate_issued: boolean }[]) ?? []
  const completed = e.filter((x) => x.completed).length

  return {
    totalUsers: p.length,
    activeUsers: p.filter((x) => x.status === "active" || x.status === "reactivated").length,
    suspendedUsers: p.filter((x) => x.status === "suspended").length,
    pendingUsers: p.filter((x) => x.status === "pending_first_login").length,
    courses: (courses as unknown[])?.length ?? 0,
    certificates: e.filter((x) => x.certificate_issued).length,
    completionRate: e.length ? Math.round((completed / e.length) * 100) : 0,
    enrollments: e.length,
    completedEnrollments: completed,
  }
}

/** Map of userId -> { assigned, completed, certificates } for the admin roster. */
export async function getEnrollmentSummary(): Promise<
  Record<string, { assigned: number; completed: number; certificates: number; progress: number }>
> {
  const supabase = await createClient()
  const { data } = await supabase.from("enrollments").select("user_id, progress, completed, certificate_issued")
  const rows = (data as { user_id: string; progress: number; completed: boolean; certificate_issued: boolean }[]) ?? []
  const map: Record<string, { assigned: number; completed: number; certificates: number; progress: number }> = {}
  for (const r of rows) {
    const m = (map[r.user_id] ??= { assigned: 0, completed: 0, certificates: 0, progress: 0 })
    m.assigned += 1
    if (r.completed) m.completed += 1
    if (r.certificate_issued) m.certificates += 1
    m.progress += r.progress
  }
  for (const id of Object.keys(map)) {
    const m = map[id]
    m.progress = m.assigned ? Math.round(m.progress / m.assigned) : 0
  }
  return map
}
