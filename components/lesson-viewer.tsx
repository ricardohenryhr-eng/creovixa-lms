"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  PlayCircle,
  Target,
  BookOpen,
  ListChecks,
  GraduationCap,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Lock,
  Video,
  Clock,
  FileText,
  Headphones,
} from "lucide-react"
import { Card, Badge, Button } from "@/components/ui"
import { Watermark } from "@/components/content-protection"
import type { Lesson } from "@/lib/data"
import { parseVideoSource } from "@/lib/video"
import { cn } from "@/lib/utils"

/**
 * Renders a single lesson in full inside the course page: a video player that
 * supports MP4, Supabase Storage, YouTube, and Vimeo (or a "coming soon"
 * notice when no real video is set yet), the lesson transcript, an audio
 * practice drill, learning objectives, the written material, key terminology,
 * and an inline knowledge check that must be passed before completion.
 */
export function LessonViewer({
  lesson,
  viewer,
  completed,
  onComplete,
  index,
  total,
}: {
  lesson: Lesson
  viewer: string
  completed: boolean
  onComplete: () => void
  index: number
  total: number
}) {
  const source = useMemo(() => parseVideoSource(lesson.videoUrl), [lesson.videoUrl])
  const hasVideo = source.kind !== "none"
  const kc = lesson.knowledgeCheck ?? []
  const hasKc = kc.length > 0

  const [watched, setWatched] = useState(completed || !hasVideo)
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  // Reset transient state whenever the selected lesson changes.
  useEffect(() => {
    setWatched(completed || !hasVideo)
    setAnswers({})
    setSubmitted(false)
  }, [lesson.id, completed, hasVideo])

  const kcPassed = useMemo(() => {
    if (!hasKc) return true
    return kc.every((q) => answers[q.id] === q.answer)
  }, [answers, kc, hasKc])

  const canComplete = watched && (completed || !hasKc || (submitted && kcPassed))

  return (
    <div className="flex flex-col gap-5">
      {/* Video / media */}
      {hasVideo ? (
        <VideoPlayer
          key={lesson.id}
          source={source}
          viewer={viewer}
          onWatched={() => setWatched(true)}
          watched={watched}
        />
      ) : lesson.type === "video" ? (
        <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted text-muted-foreground">
          <div className="flex flex-col items-center gap-2 text-center">
            <Video className="h-7 w-7" />
            <span className="text-sm font-semibold text-foreground">Training video coming soon</span>
            <span className="text-xs">This lesson&apos;s video is being produced. The rest of the lesson is available below.</span>
          </div>
        </div>
      ) : null}

      {/* Transcript */}
      {lesson.transcript?.trim() ? <Transcript text={lesson.transcript} /> : null}

      {/* Audio practice drill */}
      {lesson.audioUrl?.trim() ? <AudioPractice url={lesson.audioUrl} /> : null}

      <Card className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="muted">
            Lesson {index + 1} of {total}
          </Badge>
          {lesson.duration && (
            <Badge tone="muted">
              <Clock className="h-3.5 w-3.5" /> {lesson.duration}
            </Badge>
          )}
          {completed && (
            <Badge tone="green">
              <CheckCircle2 className="h-3.5 w-3.5" /> Completed
            </Badge>
          )}
        </div>
        <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-balance">{lesson.title}</h2>

        {/* Learning objectives */}
        {lesson.objectives?.length ? (
          <section className="mt-6">
            <SectionTitle icon={Target}>Learning objectives</SectionTitle>
            <ul className="mt-3 flex flex-col gap-2">
              {lesson.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Written training material */}
        {lesson.content?.length ? (
          <section className="mt-6">
            <SectionTitle icon={BookOpen}>Training material</SectionTitle>
            <div className="mt-3 flex flex-col gap-4">
              {lesson.content.map((p, i) => (
                <p key={i} className="text-pretty text-sm leading-relaxed text-foreground/90">
                  {p}
                </p>
              ))}
            </div>
          </section>
        ) : null}

        {/* Key terminology */}
        {lesson.terminology?.length ? (
          <section className="mt-6">
            <SectionTitle icon={GraduationCap}>Key terminology</SectionTitle>
            <dl className="mt-3 overflow-hidden rounded-lg border border-border">
              {lesson.terminology.map((t, i) => (
                <div key={i} className={cn("grid gap-1 px-4 py-3 sm:grid-cols-[minmax(0,180px)_1fr] sm:gap-4", i % 2 === 1 && "bg-muted/40")}>
                  <dt className="text-sm font-semibold">{t.term}</dt>
                  <dd className="text-sm text-muted-foreground">{t.definition}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {/* Knowledge check */}
        {hasKc && (
          <section className="mt-6">
            <SectionTitle icon={ListChecks}>Knowledge check</SectionTitle>
            <p className="mt-1 text-xs text-muted-foreground">Answer correctly to complete this lesson.</p>
            <div className="mt-3 flex flex-col gap-5">
              {kc.map((q, qi) => {
                const selected = answers[q.id]
                return (
                  <div key={q.id} className="rounded-lg border border-border p-4">
                    <p className="text-sm font-medium">
                      {qi + 1}. {q.question}
                    </p>
                    <div className="mt-3 flex flex-col gap-2">
                      {q.options.map((opt, oi) => {
                        const chosen = selected === oi
                        // Never reveal the correct option after a wrong attempt: the
                        // correct answer is only highlighted once the whole check is passed.
                        const showCorrect = submitted && kcPassed && oi === q.answer
                        const showWrong = submitted && chosen && oi !== q.answer
                        return (
                          <button
                            key={oi}
                            type="button"
                            disabled={submitted && kcPassed}
                            onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                            className={cn(
                              "flex items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-sm transition",
                              chosen ? "border-primary bg-accent/40" : "border-border hover:bg-muted",
                              showCorrect && "border-success bg-success/10",
                              showWrong && "border-destructive bg-destructive/10",
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                                chosen ? "border-primary" : "border-muted-foreground/40",
                              )}
                            >
                              {chosen && <span className="h-2 w-2 rounded-full bg-primary" />}
                            </span>
                            <span className="flex-1">{opt}</span>
                            {showCorrect && <CheckCircle2 className="h-4 w-4 text-success" />}
                            {showWrong && <XCircle className="h-4 w-4 text-destructive" />}
                          </button>
                        )
                      })}
                    </div>
                    {submitted && kcPassed && q.explanation && (
                      <p className="mt-2 text-xs text-success">{q.explanation}</p>
                    )}
                  </div>
                )
              })}
            </div>

            {!completed && (
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {!submitted || !kcPassed ? (
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(true)}
                    disabled={Object.keys(answers).length < kc.length}
                  >
                    {submitted && !kcPassed ? "Check answers again" : "Check answers"}
                  </Button>
                ) : null}
                {submitted && (
                  <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", kcPassed ? "text-success" : "text-destructive")}>
                    {kcPassed ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" /> All correct
                      </>
                    ) : (
                      <>
                        <XCircle className="h-4 w-4" /> Some answers are incorrect — review and try again
                      </>
                    )}
                  </span>
                )}
              </div>
            )}
          </section>
        )}

        {/* Completion control */}
        <div className="mt-6 border-t border-border pt-5">
          {completed ? (
            <span className="inline-flex items-center gap-2 rounded-lg bg-success/10 px-4 py-2.5 text-sm font-semibold text-success">
              <CheckCircle2 className="h-4 w-4" /> Lesson completed
            </span>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={onComplete} disabled={!canComplete}>
                {canComplete ? <CheckCircle2 className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                Mark lesson complete
              </Button>
              {!canComplete && (
                <p className="text-xs text-muted-foreground">
                  {!watched
                    ? "Finish watching the lesson video to continue."
                    : hasKc
                      ? "Pass the knowledge check above to complete this lesson."
                      : ""}
                </p>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

function SectionTitle({ icon: Icon, children }: { icon: typeof Target; children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
      <Icon className="h-4 w-4 text-primary" />
      {children}
    </h3>
  )
}

/** Collapsible lesson transcript shown beneath the video. */
function Transcript({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <Card className="p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <SectionTitle icon={FileText}>Transcript</SectionTitle>
        <Button variant="outline" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? "Hide transcript" : "Show transcript"}
        </Button>
      </div>
      {open && (
        <div className="mt-4 max-h-96 overflow-y-auto whitespace-pre-line text-pretty text-sm leading-relaxed text-foreground/90">
          {text}
        </div>
      )}
    </Card>
  )
}

/** Native audio player for interpreting practice drills. */
function AudioPractice({ url }: { url: string }) {
  return (
    <Card className="p-5 sm:p-6">
      <SectionTitle icon={Headphones}>Audio practice drill</SectionTitle>
      <p className="mt-1 text-xs text-muted-foreground">
        Practice interpreting along with this audio exercise.
      </p>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- practice audio has an accompanying transcript */}
      <audio src={url} controls preload="none" controlsList="nodownload" className="mt-3 w-full">
        Your browser does not support the audio element.
      </audio>
    </Card>
  )
}

/**
 * Video player supporting MP4/Supabase (native <video> with watch tracking)
 * and YouTube/Vimeo (privacy-friendly iframe embeds). File playback disables
 * download and picture-in-picture and carries a per-viewer watermark; embeds
 * ask the learner to confirm they finished watching, since cross-origin
 * players cannot report progress.
 */
function VideoPlayer({
  source,
  viewer,
  watched,
  onWatched,
}: {
  source: ReturnType<typeof parseVideoSource>
  viewer: string
  watched: boolean
  onWatched: () => void
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const firedRef = useRef(watched)

  useEffect(() => {
    firedRef.current = watched
  }, [watched])

  if (source.isFile && source.fileUrl) {
    return (
      <div className="relative overflow-hidden rounded-xl bg-black" onContextMenu={(e) => e.preventDefault()}>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- lesson provides a full transcript section */}
        <video
          ref={ref}
          src={source.fileUrl}
          controls
          preload="metadata"
          playsInline
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          className="aspect-video w-full"
          onTimeUpdate={(e) => {
            const v = e.currentTarget
            if (!firedRef.current && v.duration && v.currentTime / v.duration >= 0.9) {
              firedRef.current = true
              onWatched()
            }
          }}
          onEnded={() => {
            if (!firedRef.current) {
              firedRef.current = true
              onWatched()
            }
          }}
        />
        <div className="pointer-events-none absolute inset-0">
          <Watermark label={viewer} />
        </div>
        <StatusBadge watched={watched} />
        <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          <PlayCircle className="h-3.5 w-3.5" /> Lesson video
        </div>
      </div>
    )
  }

  // Embedded player (YouTube / Vimeo).
  return (
    <div className="flex flex-col gap-3">
      <div className="relative overflow-hidden rounded-xl bg-black">
        <iframe
          src={source.embedUrl}
          title="Lesson video"
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
        <div className="pointer-events-none absolute inset-0">
          <Watermark label={viewer} />
        </div>
        <StatusBadge watched={watched} />
      </div>
      {!watched && (
        <Button variant="outline" onClick={onWatched} className="self-start">
          <CheckCircle2 className="h-4 w-4" /> I&apos;ve finished watching this video
        </Button>
      )}
    </div>
  )
}

function StatusBadge({ watched }: { watched: boolean }) {
  return (
    <div className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
      {watched ? "Watched" : "Protected stream"}
    </div>
  )
}
