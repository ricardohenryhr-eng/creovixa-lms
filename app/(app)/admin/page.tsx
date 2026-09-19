import Link from "next/link"
import {
  Users,
  BookOpen,
  Award,
  BarChart3,
  Settings,
  ArrowRight,
  UserPlus,
  FileCheck2,
  UserCheck,
  BadgeCheck,
  ClipboardList,
  Hourglass,
  History,
} from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Avatar } from "@/components/ui"
import { AdminCertApprovals } from "@/components/admin-cert-approvals"
import { getAdminStats, getAllProfiles, getEnrollmentSummary, getAuditLog, type AuditLogRow } from "@/lib/queries"
import { roleLabels, statusLabels, type AccountStatus } from "@/lib/roles"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

const shortcuts = [
  { href: "/admin/users", label: "User management", desc: "Add, edit, suspend, and assign courses.", icon: Users },
  { href: "/admin/courses", label: "Course management", desc: "Catalog, sequence, and publication.", icon: BookOpen },
  { href: "/admin/certificates", label: "Certificate management", desc: "Issued certificates and validity.", icon: Award },
  { href: "/admin/interpreters", label: "Interpreter management", desc: "Readiness and account standing.", icon: UserCheck },
  { href: "/admin/certificate-release", label: "Certificate release", desc: "Release protected certificates.", icon: BadgeCheck },
  { href: "/admin/progress", label: "Training progress", desc: "Track learner advancement.", icon: ClipboardList },
  { href: "/admin/quiz-results", label: "Quiz results", desc: "Attempts, scores, and pass rates.", icon: FileCheck2 },
  { href: "/admin/reports", label: "Reports & analytics", desc: "Completion rates and certificates.", icon: BarChart3 },
  { href: "/admin/settings", label: "Platform settings", desc: "Branding, notifications, and defaults.", icon: Settings },
]

const statusTone: Record<AccountStatus, "green" | "amber" | "red" | "blue"> = {
  active: "green",
  reactivated: "blue",
  pending_first_login: "amber",
  suspended: "red",
}

const avatarColors = ["#0f172a", "#f97316", "#0ea5e9", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"]
function colorFor(email: string): string {
  let h = 0
  for (let i = 0; i < email.length; i++) h = (h * 31 + email.charCodeAt(i)) >>> 0
  return avatarColors[h % avatarColors.length]
}

export default async function AdminPage() {
  const [stats, profiles, summary, auditLog] = await Promise.all([
    getAdminStats(),
    getAllProfiles(),
    getEnrollmentSummary(),
    getAuditLog(20),
  ])
  const recent = profiles.slice(0, 5)

  return (
    <div>
      <PageHeader title="Admin panel" subtitle="Manage users, monitor training, and configure the platform." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={stats.totalUsers} icon={<Users className="h-5 w-5" />} tone="blue" hint={`${stats.pendingUsers} pending first login`} />
        <StatCard label="Active users" value={stats.activeUsers} icon={<UserCheck className="h-5 w-5" />} tone="green" hint="Able to sign in" />
        <StatCard label="Suspended users" value={stats.suspendedUsers} icon={<Users className="h-5 w-5" />} tone="red" hint="Access disabled" />
        <StatCard label="Courses assigned" value={stats.coursesAssigned} icon={<ClipboardList className="h-5 w-5" />} tone="orange" hint={`${stats.courses} in catalog`} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Certificates issued" value={stats.certificates} icon={<Award className="h-5 w-5" />} tone="green" hint="Released to learners" />
        <StatCard label="Pending certificates" value={stats.pendingCertificates} icon={<Hourglass className="h-5 w-5" />} tone="amber" hint="Completed, awaiting release" />
        <StatCard label="Completed courses" value={stats.completedEnrollments} icon={<FileCheck2 className="h-5 w-5" />} tone="muted" />
        <StatCard label="Completion rate" value={`${stats.completionRate}%`} icon={<BarChart3 className="h-5 w-5" />} tone="blue" />
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Quick access</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex items-center gap-3 border-primary/30 bg-accent/40 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UserPlus className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-display font-semibold">Add a new user</p>
              <Link href="/admin/users" className="text-sm text-primary hover:underline">Go to user management</Link>
            </div>
          </Card>
          {shortcuts.map((s) => (
            <Link key={s.href} href={s.href}>
              <Card className="flex h-full items-center gap-3 p-5 transition hover:border-primary hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Recent users</h2>
              <Link href="/admin/users" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                Manage all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            {recent.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">No users yet. Create the first account in user management.</p>
            ) : (
              <div className="flex flex-col divide-y divide-border">
                {recent.map((u) => {
                  const s = summary[u.id]
                  return (
                    <div key={u.id} className="flex items-center gap-3 py-3">
                      <Avatar name={u.full_name || u.email} color={colorFor(u.email)} size={38} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{u.full_name || u.email}</p>
                        <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                      </div>
                      {s && <span className="hidden text-xs text-muted-foreground md:block">{s.completed}/{s.assigned} done</span>}
                      <Badge tone="muted">{roleLabels[u.role]}</Badge>
                      <Badge tone={statusTone[u.status]}>{statusLabels[u.status]}</Badge>
                      <span className="hidden text-xs text-muted-foreground sm:block">{formatDate(u.created_at)}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-1">
          <AdminCertApprovals />
        </div>
      </div>

      <div className="mt-6">
        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <History className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Audit log</h2>
            <Badge tone="muted">Recent activity</Badge>
          </div>
          {auditLog.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No admin activity recorded yet. Actions like creating users, assigning courses, and password resets appear here.
            </p>
          ) : (
            <div className="flex flex-col divide-y divide-border">
              {auditLog.map((entry) => (
                <div key={entry.id} className="flex flex-wrap items-center gap-x-2 gap-y-1 py-2.5 text-sm">
                  <Badge tone="blue">{auditActionLabel(entry.action)}</Badge>
                  <span className="text-foreground">{auditDescription(entry)}</span>
                  <span className="ml-auto whitespace-nowrap text-xs text-muted-foreground">{formatDate(entry.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

const AUDIT_LABELS: Record<string, string> = {
  user_created: "User created",
  user_updated: "User updated",
  user_suspended: "User suspended",
  user_reactivated: "User reactivated",
  user_deleted: "User deleted",
  invitation_sent: "Invitation sent",
  password_reset: "Password reset",
  course_assigned: "Course assigned",
}

function auditActionLabel(action: string): string {
  return AUDIT_LABELS[action] ?? action.replace(/_/g, " ")
}

function auditDescription(entry: AuditLogRow): string {
  const actor = entry.actor_email ?? "System"
  const target = entry.target_email ? ` → ${entry.target_email}` : ""
  const courses = entry.details && Array.isArray((entry.details as { courses?: unknown }).courses)
    ? ((entry.details as { courses: string[] }).courses.join(", "))
    : ""
  return `${actor}${target}${courses ? ` (${courses})` : ""}`
}
