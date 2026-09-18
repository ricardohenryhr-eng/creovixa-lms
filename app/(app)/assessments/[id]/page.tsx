"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Target,
  Lock,
} from "lucide-react"
import { Card, Badge, Button, Progress } from "@/components/ui"
import { getAssessment, getCourse } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { assessmentUnlocked } from "@/lib/curriculum"
import { cn } from "@/lib/utils"

export default function QuizPage() {
  const params = useParams<{ id: string }>()
  const assessment = getAssessment(params.id)
  if (!assessment) notFound()

  const course = getCourse(assessment.courseId) ?? undefined
  const total = assessment.questions.length
  const { state, markAssessmentPassed } = useProgress()
  const recordedRef = useRef(false)
  const locked = course ? !assessmentUnlocked(course, state) : false

  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(assessment.durationMinutes * 60)

  useEffect(() => {
    if (!started || submitted) return
    if (secondsLeft <= 0) {
      setSubmitted(true)
      return
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [started, submitted, secondsLeft])

  const score = useMemo(() => {
    const correct = assessment.questions.filter((q) => answers[q.id] === q.answer).length
    return Math.round((correct / total) * 100)
  }, [answers, assessment.questions, total])

  const answeredCount = Object.keys(answers).length
  const passed = score >= assessment.passingScore

  // Persist a passing score so the linked course can issue its certificate.
  useEffect(() => {
    if (submitted && passed && !recordedRef.current) {
      recordedRef.current = true
      markAssessmentPassed(assessment.id, score)
    }
  }, [submitted, passed, score, assessment.id, markAssessmentPassed])
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0")
  const ss = String(secondsLeft % 60).padStart(2, "0")

  function select(qid: string, idx: number) {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qid]: idx }))
  }

  function reset() {
    recordedRef.current = false
    setStarted(false)
    setSubmitted(false)
    setAnswers({})
    setCurrent(0)
    setSecondsLeft(assessment.durationMinutes * 60)
  }

  // ---- Locked: lessons not yet complete ----
  if (locked) {
    return (
      <div className="mx-auto max-w-2xl">
        <Link href="/assessments" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to assessments
        </Link>
        <Card className="p-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </span>
          <h1 className="mt-4 font-display text-xl font-bold">Final quiz locked</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You must complete all lessons in{" "}
            <span className="font-medium text-foreground">{course?.title}</span> before taking the final quiz.
          </p>
          {course && (
            <Link href={`/courses/${course.slug}`} className="mt-5 inline-block">
              <Button>Go to course</Button>
            </Link>
          )}
        </Card>
      </div>
    )
  }

  // ---- Intro screen ----
  if (!started) {
    return (
      <div className="mx-auto max-w-2xl">
        <Link href="/assessments" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to assessments
        </Link>
        <Card className="p-6 sm:p-8">
          <Badge tone="orange">{assessment.category}</Badge>
          <h1 className="mt-3 font-display text-2xl font-bold tracking-tight">{assessment.title}</h1>
          {course && <p className="mt-1 text-sm text-muted-foreground">Linked course: {course.title}</p>}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border p-4 text-center">
              <Clock className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 text-lg font-semibold">{assessment.durationMinutes} min</p>
              <p className="text-xs text-muted-foreground">Time limit</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <Target className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 text-lg font-semibold">{assessment.passingScore}%</p>
              <p className="text-xs text-muted-foreground">To pass</p>
            </div>
            <div className="rounded-lg border border-border p-4 text-center">
              <CheckCircle2 className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-2 text-lg font-semibold">{total}</p>
              <p className="text-xs text-muted-foreground">Questions</p>
            </div>
          </div>
          <ul className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
            <li>• The timer starts as soon as you begin.</li>
            <li>• You can move between questions freely before submitting.</li>
            <li>• Your score is graded automatically on submission.</li>
          </ul>
          <Button size="lg" className="mt-6 w-full" onClick={() => setStarted(true)}>
            Start assessment <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    )
  }

  // ---- Result screen ----
  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl">
        <Card className="overflow-hidden">
          <div className={cn("flex flex-col items-center px-6 py-10 text-center text-white", passed ? "bg-success" : "bg-destructive")}>
            {passed ? <Award className="h-12 w-12" /> : <XCircle className="h-12 w-12" />}
            <h1 className="mt-3 font-display text-2xl font-bold">{passed ? "Congratulations, you passed!" : "Not quite there"}</h1>
            <p className="mt-1 text-white/85">You scored {score}% (passing is {assessment.passingScore}%)</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border border-border p-4">
                <p className="font-display text-2xl font-bold">{score}%</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="font-display text-2xl font-bold text-success">{assessment.questions.filter((q) => answers[q.id] === q.answer).length}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="font-display text-2xl font-bold text-destructive">{total - assessment.questions.filter((q) => answers[q.id] === q.answer).length}</p>
                <p className="text-xs text-muted-foreground">Incorrect</p>
              </div>
            </div>

            {/* Review */}
            <div className="mt-6 flex flex-col gap-4">
              <h2 className="font-display font-semibold">Score report</h2>
              {assessment.questions.map((q, i) => {
                const chosen = answers[q.id]
                const isCorrect = chosen === q.answer
                return (
                  <div key={q.id} className="rounded-lg border border-border p-4">
                    <div className="flex items-start gap-2">
                      {isCorrect ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" /> : <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />}
                      <p className="text-sm font-medium">{i + 1}. {q.question}</p>
                    </div>
                    <div className="mt-2 pl-6 text-sm">
                      <p className="text-muted-foreground">
                        Your answer: <span className={isCorrect ? "text-success" : "text-destructive"}>{chosen != null ? q.options[chosen] : "No answer"}</span>
                      </p>
                      {!isCorrect && <p className="text-success">Correct answer: {q.options[q.answer]}</p>}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" className="flex-1" onClick={reset}>
                <RotateCcw className="h-4 w-4" /> Retake
              </Button>
              {passed ? (
                <Link href="/certificates" className="flex-1">
                  <Button className="w-full"><Award className="h-4 w-4" /> View certificate</Button>
                </Link>
              ) : (
                <Link href="/assessments" className="flex-1">
                  <Button className="w-full">Back to assessments</Button>
                </Link>
              )}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // ---- Quiz screen ----
  const q = assessment.questions[current]
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">Question {current + 1} of {total}</p>
        <Badge tone={secondsLeft < 60 ? "red" : "muted"}>
          <Clock className="h-3.5 w-3.5" /> {mm}:{ss}
        </Badge>
      </div>
      <Progress value={((current + 1) / total) * 100} className="mb-6" />

      <Card className="p-6">
        <h2 className="font-display text-lg font-semibold leading-snug">{q.question}</h2>
        <div className="mt-5 flex flex-col gap-3">
          {q.options.map((opt, idx) => {
            const selected = answers[q.id] === idx
            return (
              <button
                key={idx}
                onClick={() => select(q.id, idx)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition",
                  selected ? "border-primary bg-accent/50 ring-1 ring-primary" : "border-border hover:border-primary/50 hover:bg-muted",
                )}
              >
                <span className={cn("flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-semibold", selected ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground/40 text-muted-foreground")}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            )
          })}
        </div>
      </Card>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="outline" disabled={current === 0} onClick={() => setCurrent((c) => c - 1)}>
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        <span className="text-xs text-muted-foreground">{answeredCount}/{total} answered</span>
        {current < total - 1 ? (
          <Button onClick={() => setCurrent((c) => c + 1)}>
            Next <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => setSubmitted(true)} disabled={answeredCount < total}>
            Submit <CheckCircle2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
