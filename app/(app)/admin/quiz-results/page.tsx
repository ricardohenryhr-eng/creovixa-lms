import { FileCheck2, CheckCircle2, Percent, Target } from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Progress, Avatar } from "@/components/ui"
import { assessments, teamUsers } from "@/lib/data"
import { formatDate } from "@/lib/utils"

const attemptDates = ["2026-09-14", "2026-09-10", "2026-09-05", "2026-08-29", "2026-08-22", "2026-08-15"]

interface Attempt {
  id: string
  learnerName: string
  learnerColor: string
  quiz: string
  category: string
  score: number
  passingScore: number
  passed: boolean
  date: string
}

/** Deterministic sample of quiz attempts derived from learners and assessments. */
function buildAttempts(): Attempt[] {
  const learners = teamUsers.filter((u) => u.role === "interpreter" || u.role === "student")
  const rows: Attempt[] = []
  assessments.forEach((a, ai) => {
    learners.forEach((u, ui) => {
      if ((ai + ui) % 2 === 0 && rows.length < 14) {
        const score = 62 + ((ai * 9 + ui * 17) % 39) // 62–100
        rows.push({
          id: `${a.id}-${u.id}`,
          learnerName: u.name,
          learnerColor: u.avatarColor,
          quiz: a.title,
          category: a.category,
          score,
          passingScore: a.passingScore,
          passed: score >= a.passingScore,
          date: attemptDates[(ai + ui) % attemptDates.length],
        })
      }
    })
  })
  return rows.sort((x, y) => (x.date < y.date ? 1 : -1))
}

export default function QuizResultsPage() {
  const attempts = buildAttempts()
  const passedCount = attempts.filter((a) => a.passed).length
  const passRate = attempts.length ? Math.round((passedCount / attempts.length) * 100) : 0
  const avgScore = attempts.length ? Math.round(attempts.reduce((s, a) => s + a.score, 0) / attempts.length) : 0

  const byQuiz = assessments.map((a) => {
    const rows = attempts.filter((r) => r.quiz === a.title)
    const passed = rows.filter((r) => r.passed).length
    return { title: a.title, taken: rows.length, rate: rows.length ? Math.round((passed / rows.length) * 100) : 0 }
  })

  return (
    <div>
      <PageHeader title="Quiz results" subtitle="Assessment attempts, scores, and pass rates across the platform." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Attempts" value={attempts.length} icon={<FileCheck2 className="h-5 w-5" />} tone="orange" hint="Recent" />
        <StatCard label="Passed" value={passedCount} icon={<CheckCircle2 className="h-5 w-5" />} tone="green" hint={`${attempts.length - passedCount} failed`} />
        <StatCard label="Pass rate" value={`${passRate}%`} icon={<Percent className="h-5 w-5" />} tone="blue" hint="Across quizzes" />
        <StatCard label="Avg. score" value={`${avgScore}%`} icon={<Target className="h-5 w-5" />} tone="amber" hint="All attempts" />
      </div>

      <Card className="mt-6 p-5">
        <h2 className="mb-1 font-display text-lg font-semibold">Pass rate by assessment</h2>
        <p className="mb-5 text-sm text-muted-foreground">How each quiz is performing</p>
        <div className="flex flex-col gap-4">
          {byQuiz.map((q) => (
            <div key={q.title}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="min-w-0 truncate pr-3 font-medium">{q.title}</span>
                <span className="shrink-0 text-muted-foreground">{q.rate}% · {q.taken} taken</span>
              </div>
              <Progress value={q.rate} tone={q.rate >= 80 ? "success" : "primary"} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6 overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <h2 className="font-display text-lg font-semibold">Recent attempts</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Learner</th>
                <th className="px-4 py-3 font-semibold">Assessment</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Score</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {attempts.map((a) => (
                <tr key={a.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={a.learnerName} color={a.learnerColor} size={30} />
                      <span className="font-medium">{a.learnerName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{a.quiz}</td>
                  <td className="px-4 py-3"><Badge tone="muted">{a.category}</Badge></td>
                  <td className="px-4 py-3 font-medium">{a.score}%</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(a.date)}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge tone={a.passed ? "green" : "red"}>{a.passed ? "Passed" : "Failed"}</Badge>
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
