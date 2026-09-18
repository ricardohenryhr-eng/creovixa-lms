import { TrendingUp, Users, Award, FileCheck2, Download } from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Button, Progress } from "@/components/ui"
import { courses, teamUsers, certificates } from "@/lib/data"
import { categoryMeta } from "@/components/course-visual"

const monthly = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 55 },
  { month: "Mar", value: 61 },
  { month: "Apr", value: 48 },
  { month: "May", value: 72 },
  { month: "Jun", value: 80 },
  { month: "Jul", value: 68 },
  { month: "Aug", value: 91 },
]

const examStats = [
  { label: "Medical Interpretation", pass: 92, taken: 240 },
  { label: "Legal Interpretation", pass: 78, taken: 180 },
  { label: "HIPAA Compliance", pass: 96, taken: 320 },
  { label: "Ethics & Standards", pass: 71, taken: 210 },
]

export default function ReportsPage() {
  const maxMonthly = Math.max(...monthly.map((m) => m.value))
  const topCourses = [...courses].sort((a, b) => b.enrolled - a.enrolled).slice(0, 6)
  const maxEnrolled = Math.max(...topCourses.map((c) => c.enrolled))
  const avgCompletion = Math.round(teamUsers.reduce((s, u) => s + u.progress, 0) / teamUsers.length)

  return (
    <div>
      <PageHeader
        title="Reports & analytics"
        subtitle="Completion rates, course statistics, and exam performance."
        action={<Button variant="outline"><Download className="h-4 w-4" /> Export CSV</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg. completion" value={`${avgCompletion}%`} icon={<TrendingUp className="h-5 w-5" />} tone="orange" hint="All members" />
        <StatCard label="Active learners" value={teamUsers.filter((u) => u.status === "active").length} icon={<Users className="h-5 w-5" />} tone="blue" hint="This month" />
        <StatCard label="Certificates" value={certificates.length + 38} icon={<Award className="h-5 w-5" />} tone="green" hint="Issued YTD" />
        <StatCard label="Exams taken" value="950" icon={<FileCheck2 className="h-5 w-5" />} tone="amber" hint="86% pass rate" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Certificates issued over time */}
        <Card className="p-5">
          <h2 className="mb-1 font-display text-lg font-semibold">Certificates issued</h2>
          <p className="mb-5 text-sm text-muted-foreground">Monthly, current year</p>
          <div className="flex h-52 items-end gap-3">
            {monthly.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                    style={{ height: `${(m.value / maxMonthly) * 100}%` }}
                    title={`${m.value} certificates`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{m.month}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Exam statistics */}
        <Card className="p-5">
          <h2 className="mb-1 font-display text-lg font-semibold">Exam pass rates</h2>
          <p className="mb-5 text-sm text-muted-foreground">By assessment</p>
          <div className="flex flex-col gap-4">
            {examStats.map((e) => (
              <div key={e.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="font-medium">{e.label}</span>
                  <span className="text-muted-foreground">{e.pass}% · {e.taken} taken</span>
                </div>
                <Progress value={e.pass} tone={e.pass >= 80 ? "success" : "primary"} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Course statistics */}
      <Card className="mt-6 p-5">
        <h2 className="mb-1 font-display text-lg font-semibold">Top courses by enrollment</h2>
        <p className="mb-5 text-sm text-muted-foreground">Course statistics across the catalog</p>
        <div className="flex flex-col gap-4">
          {topCourses.map((c) => {
            const { color } = categoryMeta(c.category)
            return (
              <div key={c.id} className="flex items-center gap-4">
                <div className="w-40 shrink-0">
                  <p className="truncate text-sm font-medium">{c.title}</p>
                  <Badge tone="muted" className="mt-1">{c.category}</Badge>
                </div>
                <div className="h-6 flex-1 overflow-hidden rounded-md bg-muted">
                  <div className="flex h-full items-center justify-end rounded-md px-2" style={{ width: `${(c.enrolled / maxEnrolled) * 100}%`, backgroundColor: color }}>
                    <span className="text-xs font-medium text-white">{c.enrolled.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
