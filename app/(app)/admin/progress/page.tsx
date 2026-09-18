import { TrendingUp, Users, GraduationCap, Award } from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Progress, Avatar } from "@/components/ui"
import { teamUsers, roleLabels } from "@/lib/data"

const buckets = [
  { label: "0–25%", min: 0, max: 25 },
  { label: "26–50%", min: 26, max: 50 },
  { label: "51–75%", min: 51, max: 75 },
  { label: "76–100%", min: 76, max: 100 },
]

export default function TrainingProgressPage() {
  const learners = [...teamUsers].sort((a, b) => b.progress - a.progress)
  const avgProgress = Math.round(teamUsers.reduce((s, u) => s + u.progress, 0) / teamUsers.length)
  const totalCompleted = teamUsers.reduce((s, u) => s + u.coursesCompleted, 0)
  const totalCerts = teamUsers.reduce((s, u) => s + u.certificates, 0)

  const distribution = buckets.map((b) => ({
    ...b,
    count: teamUsers.filter((u) => u.progress >= b.min && u.progress <= b.max).length,
  }))
  const maxBucket = Math.max(1, ...distribution.map((d) => d.count))

  return (
    <div>
      <PageHeader
        title="Training progress tracking"
        subtitle="Monitor how learners are advancing through the certification path."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg. completion" value={`${avgProgress}%`} icon={<TrendingUp className="h-5 w-5" />} tone="orange" hint="All learners" />
        <StatCard label="Learners tracked" value={teamUsers.length} icon={<Users className="h-5 w-5" />} tone="blue" hint="Enrolled members" />
        <StatCard label="Courses completed" value={totalCompleted} icon={<GraduationCap className="h-5 w-5" />} tone="green" hint="Cumulative" />
        <StatCard label="Certificates earned" value={totalCerts} icon={<Award className="h-5 w-5" />} tone="amber" hint="Cumulative" />
      </div>

      <Card className="mt-6 p-5">
        <h2 className="mb-1 font-display text-lg font-semibold">Progress distribution</h2>
        <p className="mb-5 text-sm text-muted-foreground">Learners grouped by overall completion</p>
        <div className="flex h-40 items-end gap-6">
          {distribution.map((d) => (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-sm font-medium">{d.count}</span>
              <div className="flex w-full flex-1 items-end">
                <div className="w-full rounded-t-md bg-primary/80" style={{ height: `${(d.count / maxBucket) * 100}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">Learner progress</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Learner</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Completed</th>
                <th className="px-4 py-3 font-semibold">Enrolled</th>
                <th className="px-4 py-3 font-semibold">Overall progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {learners.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} color={u.avatarColor} size={34} />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{u.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><Badge tone="muted">{roleLabels[u.role]}</Badge></td>
                  <td className="px-4 py-3 text-muted-foreground">{u.coursesCompleted} / {u.coursesEnrolled}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.coursesEnrolled}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Progress value={u.progress} tone={u.progress >= 80 ? "success" : "primary"} className="w-40" />
                      <span className="w-9 text-xs text-muted-foreground">{u.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
