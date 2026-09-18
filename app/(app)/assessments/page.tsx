import Link from "next/link"
import { FileCheck2, Clock, Target, CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import { PageHeader, Card, Badge, Button } from "@/components/ui"
import { assessments } from "@/lib/data"

function statusBadge(status: string, score: number | null) {
  if (status === "passed") return <Badge tone="green"><CheckCircle2 className="h-3 w-3" /> Passed · {score}%</Badge>
  if (status === "failed") return <Badge tone="red"><XCircle className="h-3 w-3" /> Failed · {score}%</Badge>
  return <Badge tone="muted">Not started</Badge>
}

export default function AssessmentsPage() {
  return (
    <div>
      <PageHeader title="Assessments" subtitle="Timed quizzes and exams with automatic grading and instant results." />

      <div className="grid gap-4 sm:grid-cols-2">
        {assessments.map((a) => (
          <Card key={a.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <FileCheck2 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display font-semibold leading-snug">{a.title}</h3>
                  <p className="text-xs text-muted-foreground">{a.category}</p>
                </div>
              </div>
              {statusBadge(a.status, a.bestScore)}
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {a.durationMinutes} min</span>
              <span className="inline-flex items-center gap-1.5"><Target className="h-4 w-4" /> Pass ≥ {a.passingScore}%</span>
              <span>{a.questions.length} questions</span>
            </div>

            <Link href={`/assessments/${a.id}`} className="mt-5">
              <Button variant={a.status === "not_started" ? "primary" : "outline"} className="w-full">
                {a.status === "not_started" ? "Start assessment" : "Retake assessment"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
