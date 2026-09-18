"use client"

import Link from "next/link"
import { FileCheck2, Clock, Target, CheckCircle2, Lock, ArrowRight } from "lucide-react"
import { PageHeader, Card, Badge, Button } from "@/components/ui"
import { assessments, getCourseById } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { assessmentUnlocked, assessmentPassed } from "@/lib/curriculum"

export default function AssessmentsPage() {
  const { state } = useProgress()

  return (
    <div>
      <PageHeader title="Assessments" subtitle="Final quizzes unlock once you complete the course lessons." />

      <div className="grid gap-4 sm:grid-cols-2">
        {assessments.map((a) => {
          const course = getCourseById(a.courseId)
          const unlocked = course ? assessmentUnlocked(course, state) : true
          const passed = course ? assessmentPassed(course, state) : false
          const best = state.passedAssessments[a.id] ?? null

          return (
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
                {passed ? (
                  <Badge tone="green"><CheckCircle2 className="h-3 w-3" /> Passed{best ? ` · ${best}%` : ""}</Badge>
                ) : unlocked ? (
                  <Badge tone="muted">Not started</Badge>
                ) : (
                  <Badge tone="amber"><Lock className="h-3 w-3" /> Locked</Badge>
                )}
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {a.durationMinutes} min</span>
                <span className="inline-flex items-center gap-1.5"><Target className="h-4 w-4" /> Pass ≥ {a.passingScore}%</span>
                <span>{a.questions.length} questions</span>
              </div>

              {unlocked ? (
                <Link href={`/assessments/${a.id}`} className="mt-5">
                  <Button variant={passed ? "outline" : "primary"} className="w-full">
                    {passed ? "Retake assessment" : "Start assessment"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Button className="mt-5 w-full" disabled>
                    <Lock className="h-4 w-4" /> Complete lessons to unlock
                  </Button>
                  {course && (
                    <Link href={`/courses/${course.slug}`} className="mt-2 text-center text-xs font-medium text-primary hover:underline">
                      Go to {course.title}
                    </Link>
                  )}
                </>
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
