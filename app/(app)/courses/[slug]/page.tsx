"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  ArrowLeft,
  PlayCircle,
  FileText,
  BookOpen,
  Eye,
  Lock,
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
import { Logo } from "@/components/logo"
import {
  ContentGuard,
  ProtectedNotice,
  ProtectedVideoPlayer,
  ProtectedDocumentViewer,
} from "@/components/content-protection"
import { useAuth } from "@/lib/auth"
import { useProgress } from "@/lib/progress"
import { getCourse, assessments } from "@/lib/data"

const lessonIcon = { video: PlayCircle, pdf: FileText, reading: BookOpen }

export default function CourseDetailPage() {
  const params = useParams<{ slug: string }>()
  const course = getCourse(params.slug)
  if (!course) notFound()

  const { user } = useAuth()
  const viewer = user?.email ?? "guest"
  const { state, setCourseLessons } = useProgress()

  const allLessons = useMemo(() => course.modules.flatMap((m) => m.lessons), [course])
  const seedIds = useMemo(() => allLessons.filter((l) => l.completed).map((l) => l.id), [allLessons])

  // Effective completed set: stored progress if present, otherwise seed from data.
  const completedIds = state.completedLessons[course.id] ?? seedIds
  const completedSet = useMemo(() => new Set(completedIds), [completedIds])

  const videoLessons = allLessons.filter((l) => l.type === "video")
  const [currentId, setCurrentId] = useState(videoLessons[0]?.id ?? allLessons[0]?.id)
  const currentLesson = allLessons.find((l) => l.id === currentId) ?? allLessons[0]

  const [docName, setDocName] = useState<string | null>(null)
  const [enrolled, setEnrolled] = useState(course.progress > 0)

  const progress = Math.round((completedSet.size / allLessons.length) * 100)

  const relatedAssessment = assessments.find((a) => a.courseId === course.id)
  const assessmentScore = relatedAssessment ? state.passedAssessments[relatedAssessment.id] ?? 0 : 0
  const assessmentPassed = relatedAssessment ? assessmentScore >= relatedAssessment.passingScore : true
  const certReady = progress === 100 && assessmentPassed

  function setComplete(id: string, complete: boolean) {
    const next = new Set(completedSet)
    if (complete) next.add(id)
    else next.delete(id)
    setCourseLessons(course.id, [...next])
  }

  function openLesson(id: string, type: "video" | "pdf" | "reading", title: string) {
    if (type === "video") setCurrentId(id)
    else setDocName(`${title}.pdf`)
  }

  return (
    <ContentGuard>
      <Link
        href="/courses"
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      {/* Hero */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="relative">
          <CourseVisual category={course.category} className="h-40 w-full sm:h-52" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {/* Creovixa branding on every course */}
          <span className="absolute left-5 top-4 rounded-md bg-background/90 px-2 py-1 shadow-sm">
            <Logo className="text-sm" />
          </span>
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
          {/* Protected player */}
          <div className="mb-3">
            <ProtectedVideoPlayer
              key={currentLesson.id}
              title={currentLesson.title}
              viewer={viewer}
              completed={completedSet.has(currentLesson.id)}
              onComplete={() => setComplete(currentLesson.id, true)}
            />
          </div>
          <div className="mb-6">
            <ProtectedNotice text="Streaming only. Recording, download, and screen capture of this lesson are disabled." />
          </div>

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
                      const done = completedSet.has(l.id)
                      const active = l.id === currentLesson.id && l.type === "video"
                      return (
                        <li key={l.id} className={active ? "bg-accent/40" : undefined}>
                          <div className="flex items-center gap-3 px-4 py-3">
                            <button
                              onClick={() => setComplete(l.id, !done)}
                              aria-label={done ? "Mark lesson incomplete" : "Mark lesson complete"}
                              className="shrink-0"
                            >
                              {done ? (
                                <CheckCircle2 className="h-5 w-5 text-success" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground transition hover:text-primary" />
                              )}
                            </button>
                            <button
                              onClick={() => openLesson(l.id, l.type, l.title)}
                              className="flex flex-1 items-center gap-3 text-left"
                            >
                              <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                              <span className={done ? "flex-1 text-sm text-muted-foreground" : "flex-1 text-sm"}>{l.title}</span>
                              <span className="text-xs text-muted-foreground">{l.duration}</span>
                            </button>
                          </div>
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
              {completedSet.size} of {allLessons.length} lessons complete
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
                <Button variant="outline" className="w-full">{assessmentPassed ? "Retake assessment" : "Take assessment"}</Button>
              </Link>
            </Card>
          )}

          {/* View-only course materials — no downloads */}
          <Card className="p-5">
            <h3 className="mb-1 font-display font-semibold">Course materials</h3>
            <p className="mb-3 text-xs text-muted-foreground">Open documents in the protected viewer.</p>
            <ul className="flex flex-col gap-2">
              {course.resources.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => setDocName(r.name)}
                    className="flex w-full items-center gap-3 rounded-lg border border-border px-3 py-2.5 text-left transition hover:border-primary hover:bg-accent/30"
                  >
                    <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{r.name}</span>
                      <span className="text-xs text-muted-foreground">{r.size} · view only</span>
                    </span>
                    <Eye className="h-4 w-4 shrink-0 text-primary" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-primary" />
              Downloads are disabled to protect course content.
            </div>
          </Card>

          {/* Completion requirements gate before certificate issuance */}
          <Card className={certReady ? "border-primary/30 bg-accent/40 p-5" : "p-5"}>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">Certificate</h3>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {certReady
                ? "All requirements met. Your certificate is ready."
                : "Complete every requirement below to unlock your certificate."}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <RequirementRow met={progress === 100} label={`Complete all ${allLessons.length} lessons`} detail={`${completedSet.size}/${allLessons.length}`} />
              {relatedAssessment && (
                <RequirementRow
                  met={assessmentPassed}
                  label={`Pass ${relatedAssessment.title}`}
                  detail={assessmentScore > 0 ? `${assessmentScore}% (need ${relatedAssessment.passingScore}%)` : `need ${relatedAssessment.passingScore}%`}
                />
              )}
            </ul>
            {certReady ? (
              <Link href="/certificates" className="mt-4 block">
                <Button className="w-full">View certificate</Button>
              </Link>
            ) : (
              <Button className="mt-4 w-full" disabled>
                <Lock className="h-4 w-4" /> Certificate locked
              </Button>
            )}
          </Card>
        </div>
      </div>

      {docName && <ProtectedDocumentViewer name={docName} viewer={viewer} onClose={() => setDocName(null)} />}
    </ContentGuard>
  )
}

function RequirementRow({ met, label, detail }: { met: boolean; label: string; detail?: string }) {
  return (
    <li className="flex items-center gap-2.5">
      {met ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
      ) : (
        <Circle className="h-4 w-4 shrink-0 text-muted-foreground" />
      )}
      <span className={met ? "flex-1" : "flex-1 text-muted-foreground"}>{label}</span>
      {detail && <span className="text-xs text-muted-foreground">{detail}</span>}
    </li>
  )
}
