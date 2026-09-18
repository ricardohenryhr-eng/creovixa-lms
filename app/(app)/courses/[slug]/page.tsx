"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  ArrowLeft,
  PlayCircle,
  FileText,
  BookOpen,
  ImageIcon,
  Eye,
  Lock,
  CheckCircle2,
  Circle,
  Clock,
  Star,
  Users,
  Award,
  FileCheck2,
  ShieldCheck,
} from "lucide-react"
import { Card, Badge, Progress, Button } from "@/components/ui"
import { CourseVisual } from "@/components/course-visual"
import { Logo } from "@/components/logo"
import {
  ContentGuard,
  ProtectedNotice,
  ProtectedVideoPlayer,
  ProtectedDocumentViewer,
  type ViewerKind,
} from "@/components/content-protection"
import { useAuth } from "@/lib/auth"
import { useProgress } from "@/lib/progress"
import { getCourse } from "@/lib/data"
import type { Lesson, LessonType } from "@/lib/data"
import {
  orderedCourses,
  courseAssessment,
  lessonList,
  completedLessonSet,
  lessonUnlocked,
  allLessonsComplete,
  assessmentPassed,
  assessmentUnlocked,
  courseUnlocked,
  courseCompleted,
  certificateAccess,
} from "@/lib/curriculum"
import { formatDate } from "@/lib/utils"

const lessonIcon: Record<LessonType, typeof PlayCircle> = {
  video: PlayCircle,
  lecture: BookOpen,
  image: ImageIcon,
  reading: FileText,
  pdf: FileText,
}

const typeLabel: Record<LessonType, string> = {
  video: "Video",
  lecture: "Lecture",
  image: "Image",
  reading: "Reading",
  pdf: "Document",
}

function viewerKindFor(type: LessonType): ViewerKind {
  if (type === "image") return "image"
  if (type === "lecture") return "lecture"
  if (type === "pdf") return "pdf"
  return "reading"
}

export default function CourseDetailPage() {
  const params = useParams<{ slug: string }>()
  const course = getCourse(params.slug)
  if (!course) notFound()

  const { user } = useAuth()
  const viewer = user?.email ?? "guest"
  const recipient = user?.name ?? "Creovixa Learner"
  const { state, setCourseLessons, markCourseCompleted } = useProgress()

  const lessons = useMemo(() => lessonList(course), [course])
  const completedSet = completedLessonSet(course, state)

  const videoLessons = lessons.filter((l) => l.type === "video")
  const [currentVideoId, setCurrentVideoId] = useState(videoLessons[0]?.id)
  const currentVideo = lessons.find((l) => l.id === currentVideoId) ?? videoLessons[0]

  const [viewerLesson, setViewerLesson] = useState<Lesson | null>(null)

  const progressPct = Math.round((completedSet.size / lessons.length) * 100)
  const assessment = courseAssessment(course.id)
  const lessonsDone = allLessonsComplete(course, state)
  const quizPassed = assessmentPassed(course, state)
  const quizUnlocked = assessmentUnlocked(course, state)
  const unlocked = courseUnlocked(course, state)

  const access = certificateAccess(course, state, recipient)
  const rule = course.cert
  const waited = access.availableOn ? Date.now() >= access.availableOn.getTime() : false

  // Stamp the completion date the first time all requirements are met.
  useEffect(() => {
    if (courseCompleted(course, state)) markCourseCompleted(course.id)
  }, [course, state, markCourseCompleted])

  function markComplete(id: string) {
    if (completedSet.has(id)) return
    setCourseLessons(course.id, [...completedSet, id])
  }

  function onVideoComplete() {
    if (!currentVideo) return
    markComplete(currentVideo.id)
    // Advance the player to the next video lesson, if any.
    const nextVideo = videoLessons.find((l) => !completedSet.has(l.id) && l.id !== currentVideo.id)
    if (nextVideo) setCurrentVideoId(nextVideo.id)
  }

  function openLesson(l: Lesson) {
    if (!lessonUnlocked(course, l.id, state)) return
    if (l.type === "video") setCurrentVideoId(l.id)
    else setViewerLesson(l)
  }

  // ── Course locked by sequence ────────────────────────────────────────────
  if (!unlocked) {
    const idx = orderedCourses.findIndex((c) => c.id === course.id)
    const prev = orderedCourses[idx - 1]
    return (
      <ContentGuard>
        <BackLink />
        <Card className="mx-auto mt-6 max-w-xl p-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </span>
          <h1 className="mt-4 font-display text-xl font-bold">This course is locked</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Courses must be completed in sequence. Finish{" "}
            <span className="font-medium text-foreground">{prev?.title}</span> to unlock{" "}
            <span className="font-medium text-foreground">{course.title}</span>.
          </p>
          {prev && (
            <Link href={`/courses/${prev.slug}`} className="mt-5 inline-block">
              <Button>Go to {prev.title}</Button>
            </Link>
          )}
        </Card>
      </ContentGuard>
    )
  }

  return (
    <ContentGuard>
      <BackLink />

      {/* Hero */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="relative">
          <CourseVisual category={course.category} className="h-40 w-full sm:h-52" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute left-5 top-4 rounded-md bg-background/90 px-2 py-1 shadow-sm">
            <Logo className="text-sm" />
          </span>
          <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center gap-2">
            {course.foundation && <Badge tone="amber">Foundation · Step {course.order}</Badge>}
            <Badge tone="orange">{course.category}</Badge>
            <Badge tone="default">{course.level}</Badge>
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">{course.title}</h1>
          <p className="mt-2 max-w-3xl text-pretty text-muted-foreground">{course.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><PlayCircle className="h-4 w-4" /> {lessons.length} lessons</span>
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
          {currentVideo && (
            <>
              <div className="mb-3">
                <ProtectedVideoPlayer
                  key={currentVideo.id}
                  title={currentVideo.title}
                  viewer={viewer}
                  completed={completedSet.has(currentVideo.id)}
                  onComplete={onVideoComplete}
                />
              </div>
              <div className="mb-6">
                <ProtectedNotice text="Streaming only. Downloading, seeking, and fast-forwarding are disabled — each video must be watched in full to unlock the next lesson." />
              </div>
            </>
          )}

          <Card className="p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Course content</h2>
              <span className="text-xs text-muted-foreground">Complete lessons in order</span>
            </div>
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
                      const isUnlocked = lessonUnlocked(course, l.id, state)
                      const active = l.id === currentVideo?.id && l.type === "video"
                      return (
                        <li key={l.id} className={active ? "bg-accent/40" : undefined}>
                          <button
                            onClick={() => openLesson(l)}
                            disabled={!isUnlocked}
                            className="flex w-full items-center gap-3 px-4 py-3 text-left disabled:cursor-not-allowed"
                          >
                            <span className="shrink-0">
                              {done ? (
                                <CheckCircle2 className="h-5 w-5 text-success" />
                              ) : isUnlocked ? (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground" />
                              )}
                            </span>
                            <Icon className={isUnlocked ? "h-4 w-4 shrink-0 text-muted-foreground" : "h-4 w-4 shrink-0 text-muted-foreground/50"} />
                            <span className={isUnlocked ? (done ? "flex-1 text-sm text-muted-foreground" : "flex-1 text-sm") : "flex-1 text-sm text-muted-foreground/50"}>
                              {l.title}
                            </span>
                            <Badge tone="muted">{typeLabel[l.type]}</Badge>
                            <span className="hidden w-14 text-right text-xs text-muted-foreground sm:block">{l.duration}</span>
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
              <span className="text-sm font-medium text-primary">{progressPct}%</span>
            </div>
            <Progress value={progressPct} tone={progressPct === 100 ? "success" : "primary"} />
            <p className="mt-2 text-xs text-muted-foreground">
              {completedSet.size} of {lessons.length} lessons complete
            </p>
          </Card>

          {assessment && (
            <Card className="p-5">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-primary" />
                <h3 className="font-display font-semibold">Final assessment</h3>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {assessment.title} · {assessment.questions.length} questions · pass ≥ {assessment.passingScore}%
              </p>
              {quizUnlocked ? (
                <Link href={`/assessments/${assessment.id}`} className="mt-4 block">
                  <Button variant={quizPassed ? "outline" : "primary"} className="w-full">
                    {quizPassed ? "Retake assessment" : "Take final quiz"}
                  </Button>
                </Link>
              ) : (
                <>
                  <Button className="mt-4 w-full" disabled>
                    <Lock className="h-4 w-4" /> Quiz locked
                  </Button>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Complete all {lessons.length} lessons to unlock the final quiz.
                  </p>
                </>
              )}
            </Card>
          )}

          {/* View-only supplementary materials — no downloads */}
          <Card className="p-5">
            <h3 className="mb-1 font-display font-semibold">Course materials</h3>
            <p className="mb-3 text-xs text-muted-foreground">Open documents in the protected viewer.</p>
            <ul className="flex flex-col gap-2">
              {course.resources.map((r) => (
                <li key={r.id}>
                  <button
                    onClick={() => setViewerLesson({ id: `res-${r.id}`, title: r.name, duration: r.size, type: "pdf", completed: false })}
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

          {/* Certificate gate — rules depend on the course's cert configuration */}
          <Card className={access.accessible ? "border-primary/30 bg-accent/40 p-5" : "p-5"}>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="font-display font-semibold">Certificate</h3>
              {rule.restricted && <Badge tone="red">Restricted</Badge>}
            </div>

            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {rule.requiresLessonCompletion && (
                <RequirementRow met={lessonsDone} label={`Complete all ${lessons.length} lessons`} detail={`${completedSet.size}/${lessons.length}`} />
              )}
              {assessment && (
                <RequirementRow
                  met={quizPassed}
                  label={`Pass ${assessment.title}`}
                  detail={`need ${assessment.passingScore}%`}
                />
              )}
              {rule.adminReleaseOnly && (
                <>
                  <RequirementRow met={access.released} label="Administrator approval" />
                  <RequirementRow
                    met={waited}
                    label={`${rule.releaseAfterMonths}-month waiting period`}
                    detail={access.availableOn ? formatDate(access.availableOn.toISOString()) : undefined}
                  />
                </>
              )}
            </ul>

            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-success" />
              {rule.validityMonths === null
                ? "This certificate does not expire."
                : `Valid for ${rule.validityMonths} months from the date of issue.`}
            </p>

            {!access.earned ? (
              <Button className="mt-4 w-full" disabled>
                <Lock className="h-4 w-4" /> Certificate locked
              </Button>
            ) : access.accessible ? (
              <Link href="/certificates" className="mt-4 block">
                <Button className="w-full">View &amp; download certificate</Button>
              </Link>
            ) : (
              <>
                <Button className="mt-4 w-full" disabled>
                  <Lock className="h-4 w-4" /> {access.reason}
                </Button>
                <p className="mt-2 text-xs text-muted-foreground">
                  This certificate is protected and can only be released by an administrator
                  {access.availableOn ? ` on or after ${formatDate(access.availableOn.toISOString())}.` : "."}
                </p>
              </>
            )}
          </Card>
        </div>
      </div>

      {viewerLesson && (
        <ProtectedDocumentViewer
          name={viewerLesson.title.match(/\.[a-z]+$/i) ? viewerLesson.title : `${viewerLesson.title}.pdf`}
          viewer={viewer}
          kind={viewerKindFor(viewerLesson.type)}
          reviewed={completedSet.has(viewerLesson.id)}
          onReviewed={viewerLesson.id.startsWith("res-") ? undefined : () => markComplete(viewerLesson.id)}
          onClose={() => setViewerLesson(null)}
        />
      )}
    </ContentGuard>
  )
}

function BackLink() {
  return (
    <Link
      href="/courses"
      className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft className="h-4 w-4" /> Back to catalog
    </Link>
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
