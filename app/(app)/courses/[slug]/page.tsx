"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  ArrowLeft,
  PlayCircle,
  FileText,
  BookOpen,
  Download,
  CheckCircle2,
  Circle,
  Clock,
  Star,
  Users,
  Award,
  FileCheck2,
} from "lucide-react"
import { Card, Badge, Progress, Button } from "@/components/ui"
import { CourseVisual } from "@/components/course-visual"
import { getCourse, assessments } from "@/lib/data"

const lessonIcon = { video: PlayCircle, pdf: FileText, reading: BookOpen }

export default function CourseDetailPage() {
  const params = useParams<{ slug: string }>()
  const course = getCourse(params.slug)
  if (!course) notFound()

  const allLessons = course.modules.flatMap((m) => m.lessons)
  const [completed, setCompleted] = useState<Record<string, boolean>>(
    Object.fromEntries(allLessons.map((l) => [l.id, l.completed])),
  )
  const [enrolled, setEnrolled] = useState(course.progress > 0)

  const progress = useMemo(() => {
    const total = allLessons.length
    const done = Object.values(completed).filter(Boolean).length
    return Math.round((done / total) * 100)
  }, [completed, allLessons.length])

  const relatedAssessment = assessments.find((a) => a.courseId === course.id)

  function toggle(id: string) {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div>
      <Link href="/courses" className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      {/* Hero */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="relative">
          <CourseVisual category={course.category} className="h-40 w-full sm:h-52" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center gap-2">
            <Badge tone="orange">{course.category}</Badge>
            <Badge tone="default">{course.level}</Badge>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{course.title}</h1>
          <p className="mt-2 max-w-3xl text-pretty text-muted-foreground">{course.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><PlayCircle className="h-4 w-4" /> {course.lessonsCount} lessons</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.hours} hours</span>
            <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.enrolled.toLocaleString()} enrolled</span>
            <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-primary text-primary" /> {course.rating}</span>
            <span>Instructor: <span className="font-medium text-foreground">{course.instructor}</span></span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Curriculum */}
        <div className="lg:col-span-2">
          {/* Player placeholder */}
          <Card className="mb-6 overflow-hidden">
            <div className="flex aspect-video items-center justify-center bg-secondary text-white">
              <button className="flex flex-col items-center gap-3 text-slate-200 transition hover:text-white">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                  <PlayCircle className="h-8 w-8" />
                </span>
                <span className="text-sm font-medium">Play current lesson</span>
              </button>
            </div>
          </Card>

          <Card className="p-5 sm:p-6">
            <h2 className="mb-4 font-display text-lg font-semibold">Course content</h2>
            <div className="flex flex-col gap-4">
              {course.modules.map((m, i) => (
                <div key={m.id} className="overflow-hidden rounded-lg border border-border">
                  <div className="flex items-center justify-between bg-muted/50 px-4 py-3">
                    <p className="text-sm font-semibold">Module {i + 1}: {m.title}</p>
                    <span className="text-xs text-muted-foreground">{m.lessons.length} lessons</span>
                  </div>
                  <ul className="divide-y divide-border">
                    {m.lessons.map((l) => {
                      const Icon = lessonIcon[l.type]
                      const done = completed[l.id]
                      return (
                        <li key={l.id}>
                          <button
                            onClick={() => toggle(l.id)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-accent/30"
                          >
                            {done ? (
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                            ) : (
                              <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                            )}
                            <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                            <span className={done ? "flex-1 text-sm text-muted-foreground line-through" : "flex-1 text-sm"}>{l.title}</span>
                            <span className="text-xs text-muted-foreground">{l.duration}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-display font-semibold">Your progress</h3>
              <span className="text-sm font-medium text-primary">{progress}%</span>
            </div>
            <Progress value={progress} tone={progress === 100 ? "success" : "primary"} />
            <p className="mt-2 text-xs text-muted-foreground">
              {Object.values(completed).filter(Boolean).length} of {allLessons.length} lessons complete
            </p>
            {enrolled ? (
              <Button className="mt-4 w-full">
                {progress === 100 ? "Review course" : "Continue learning"}
                <PlayCircle className="h-4 w-4" />
              </Button>
            ) : (
              <Button className="mt-4 w-full" onClick={() => setEnrolled(true)}>
                Enroll now
              </Button>
            )}
          </Card>

          {relatedAssessment && (
            <Card className="p-5">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-primary" />
                <h3 className="font-display font-semibold">Assessment</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {relatedAssessment.title} · {relatedAssessment.questions.length} questions · {relatedAssessment.durationMinutes} min
              </p>
              <Link href={`/assessments/${relatedAssessment.id}`} className="mt-4 block">
                <Button variant="outline" className="w-full">Take assessment</Button>
              </Link>
            </Card>
          )}

          <Card className="p-5">
            <h3 className="mb-3 font-display font-semibold">Downloadable resources</h3>
            <ul className="flex flex-col gap-2">
              {course.resources.map((r) => (
                <li key={r.id}>
                  <button className="flex w-full items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-left transition hover:border-primary hover:bg-accent/30">
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{r.name}</span>
                      <span className="text-xs text-muted-foreground">{r.size}</span>
                    </span>
                    <Download className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          </Card>

          {progress === 100 && (
            <Card className="border-primary/30 bg-accent/40 p-5">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <h3 className="font-display font-semibold">Certificate ready</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">You've completed this course. Download your certificate.</p>
              <Link href="/certificates" className="mt-4 block">
                <Button className="w-full">View certificate</Button>
              </Link>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
