import Link from "next/link"
import { Users, BookOpen, Award, BarChart3, Settings, ArrowRight, UserPlus, FileCheck2 } from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Avatar } from "@/components/ui"
import { teamUsers, courses, certificates, roleLabels } from "@/lib/data"
import { formatDate } from "@/lib/utils"

const shortcuts = [
  { href: "/admin/users", label: "User management", desc: "Add, edit, suspend, and assign courses.", icon: Users },
  { href: "/admin/reports", label: "Reports & analytics", desc: "Completion rates, exams, and certificates.", icon: BarChart3 },
  { href: "/admin/settings", label: "Platform settings", desc: "Branding, notifications, and defaults.", icon: Settings },
]

export default function AdminPage() {
  const active = teamUsers.filter((u) => u.status === "active").length
  const recent = [...teamUsers].sort((a, b) => (a.joinedAt < b.joinedAt ? 1 : -1)).slice(0, 5)

  return (
    <div>
      <PageHeader title="Admin panel" subtitle="Manage users, monitor training, and configure the platform." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total users" value={teamUsers.length} icon={<Users className="h-5 w-5" />} tone="blue" hint={`${active} active`} />
        <StatCard label="Courses" value={courses.length} icon={<BookOpen className="h-5 w-5" />} tone="orange" hint="Published" />
        <StatCard label="Certificates" value={certificates.length + 38} icon={<Award className="h-5 w-5" />} tone="green" hint="Issued this year" />
        <StatCard label="Exams passed" value="312" icon={<FileCheck2 className="h-5 w-5" />} tone="amber" hint="87% pass rate" />
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
            <div className="flex flex-col divide-y divide-border">
              {recent.map((u) => (
                <div key={u.id} className="flex items-center gap-3 py-3">
                  <Avatar name={u.name} color={u.avatarColor} size={38} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{u.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                  </div>
                  <Badge tone="muted">{roleLabels[u.role]}</Badge>
                  <Badge tone={u.status === "active" ? "green" : "red"}>{u.status === "active" ? "Active" : "Suspended"}</Badge>
                  <span className="hidden text-xs text-muted-foreground sm:block">{formatDate(u.joinedAt)}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card className="flex items-center gap-3 border-primary/30 bg-accent/40 p-5">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <UserPlus className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display font-semibold">Add a new user</p>
              <Link href="/admin/users" className="text-sm text-primary hover:underline">Go to user management</Link>
            </div>
          </Card>
          {shortcuts.map((s) => (
            <Link key={s.href} href={s.href}>
              <Card className="flex items-center gap-3 p-5 transition hover:border-primary hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted text-foreground">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-semibold">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
