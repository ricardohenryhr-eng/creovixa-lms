"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import useSWR from "swr"
import {
  PlayCircle,
  Target,
  BookOpen,
  ListChecks,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Lock,
  Video,
  Clock,
  FileText,
  Headphones,
  ImageIcon,
  Paperclip,
  MessagesSquare,
  ClipboardCheck,
  Circle,
} from "lucide-react"
import { RichText } from "@/components/rich-text"
import { Card, Badge, Button } from "@/components/ui"
import { YouTubePlayer } from "@/components/youtube-player"
import { getWatchProgress, saveWatchProgress } from "@/app/actions/progress"
import type { Lesson } from "@/lib/data"
import { normalizeRequiredPercent, parseVideoSource } from "@/lib/video"
import { cn } from "@/lib/utils"

/**
 * Renders a single lesson in full inside the course page: an embedded YouTube
 * player with watch-percentage tracking (or a "coming soon" notice when no
 * video is set yet), the lesson transcript, an audio
 * practice drill, learning objectives, the written material, key terminology,
 * and an inline knowledge check that must be passed before completion.
 */
export function LessonViewer({
  lesson,
  courseSlug,
  viewer,
  completed,
  onComplete,
  index,
  total,
  videoFree = false,
}: {
  lesson: Lesson
  courseSlug: string
  viewer: string
  completed: boolean
  onComplete: () => void
  index: number
  total: number
  /** Text/image/quiz-only course: never render or require a video. */
  videoFree?: boolean
}) {
  const videoIds = useMemo(() => {
    if (videoFree) return []
    return [lesson.videoUrl, ...(lesson.extraVideos ?? [])]
      .map((u) => parseVideoSource(u).videoId)
      .filter((id): id is string => Boolean(id))
  }, [lesson.videoUrl, lesson.extraVideos, videoFree])
  const hasVideo = videoIds.length > 0
  const requiredPercent = normalizeRequiredPercent(lesson.requiredPercent)
  const kc = lesson.knowledgeCheck ?? []
  const hasKc = kc.length > 0

  const [watchedSet, setWatchedSet] = useState<Set<number>>(new Set())
  const watched = completed || !hasVideo || videoIds.every((_, i) => watchedSet.has(i))
  const markWatched = useCallback((i: number) => {
    setWatchedSet((prev) => (prev.has(i) ? prev : new Set(prev).add(i)))
  }, [])
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showDebrief, setShowDebrief] = useState(false)

  // Reset transient state whenever the selected lesson changes.
  useEffect(() => {
    setWatchedSet(new Set())
    setAnswers({})
    setSubmitted(false)
    setShowDebrief(false)
  }, [lesson.id])

  const kcPassed = useMemo(() => {
    if (!hasKc) return true
    return kc.every((q) => answers[q.id] === q.answer)
  }, [answers, kc, hasKc])

  const canComplete = watched && (completed || !hasKc || (submitted && kcPassed))

  return (
    <div className="flex flex-col gap-5">
      {/* Video / media */}
      {hasVideo ? (
        <div className="flex flex-col gap-6">
          {videoIds.map((id, i) => (
            <div key={`${lesson.id}-${i}-${id}`} className="flex flex-col gap-2">
              {videoIds.length > 1 && (
                <p className="text-sm font-semibold text-foreground">
                  Video {i + 1} of {videoIds.length}
                </p>
              )}
              <LessonVideo
                videoId={id}
                title={videoIds.length > 1 ? `${lesson.title} (video ${i + 1})` : lesson.title}
                courseSlug={courseSlug}
                lessonId={i === 0 ? lesson.id : `${lesson.id}#v${i + 1}`}
                viewer={viewer}
                requiredPercent={requiredPercent}
                onWatched={() => markWatched(i)}
                watched={completed || watchedSet.has(i)}
              />
            </div>
          ))}
        </div>
      ) : lesson.type === "video" && !videoFree ? (
        <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed border-border bg-muted text-muted-foreground">
          <div className="flex flex-col items-center gap-2 text-center">
            <Video className="h-7 w-7" />
            <span className="text-sm font-semibold text-foreground">Training video coming soon</span>
            <span className="text-xs">This lesson&apos;s video is being produced. The rest of the lesson is available below.</span>
          </div>
        </div>
      ) : null}

      {/* Images and diagrams sit directly below the video */}
      {lesson.images?.length ? <LessonImages images={lesson.images} /> : null}

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
        {lesson.body?.trim() ? (
          <section className="mt-6">
            <SectionTitle icon={BookOpen}>Training notes</SectionTitle>
            <div className="mt-3">
              <RichText text={lesson.body} />
            </div>
          </section>
        ) : lesson.content?.length ? (
          <section className="mt-6">
            <SectionTitle icon={BookOpen}>Training notes</SectionTitle>
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
            <SectionTitle icon={GraduationCap}>Vocabulary</SectionTitle>
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

        {/* Lesson summary */}
        {lesson.summary?.trim() ? (
          <section className="mt-6">
            <SectionTitle icon={FileText}>Summary</SectionTitle>
            <p className="mt-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-pretty text-sm leading-relaxed text-foreground/90">
              {lesson.summary}
            </p>
          </section>
        ) : null}

        {/* PDF attachments */}
        {lesson.attachments?.length ? (
          <section className="mt-6">
            <SectionTitle icon={Paperclip}>Lesson documents</SectionTitle>
            <ul className="mt-3 flex flex-col gap-2">
              {lesson.attachments.map((a, i) => (
                <li key={i}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-medium transition hover:bg-muted"
                  >
                    <FileText className="h-4 w-4 shrink-0 text-primary" />
                    <span className="flex-1 truncate">{a.name}</span>
                    <span className="text-xs text-muted-foreground">PDF</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Scenario-based exercise */}
        {lesson.scenario ? (
          <section className="mt-6">
            <SectionTitle icon={MessagesSquare}>Scenario exercise</SectionTitle>
            <div className="mt-3 flex flex-col gap-3 rounded-lg border border-border p-4">
              <p className="text-pretty text-sm leading-relaxed text-foreground/90">{lesson.scenario.situation}</p>
              <p className="text-pretty text-sm font-medium leading-relaxed">Your task: {lesson.scenario.task}</p>
              {showDebrief ? (
                <p className="rounded-lg bg-muted/40 px-4 py-3 text-pretty text-sm leading-relaxed text-foreground/90">
                  <span className="font-semibold">Model approach: </span>
                  {lesson.scenario.debrief}
                </p>
              ) : (
                <div>
                  <Button variant="outline" onClick={() => setShowDebrief(true)}>
                    Reveal model approach
                  </Button>
                </div>
              )}
            </div>
          </section>
        ) : null}

        {/* Completion requirements */}
        <section className="mt-6">
          <SectionTitle icon={ClipboardCheck}>Completion requirements</SectionTitle>
          <ul className="mt-3 flex flex-col gap-2">
            {[
              hasVideo && { label: `Watch at least ${requiredPercent}% of the lesson video`, met: watched },
              (lesson.content?.length || lesson.body?.trim()) && { label: "Read the training notes and vocabulary", met: completed },
              lesson.scenario && { label: "Work through the scenario exercise", met: completed || showDebrief },
              hasKc && { label: "Answer every knowledge check question correctly (100%)", met: completed || (submitted && kcPassed) },
              { label: "Select “Mark lesson complete”", met: completed },
            ]
              .filter((r): r is { label: string; met: boolean } => Boolean(r))
              .map((r) => (
                <li key={r.label} className="flex items-start gap-2.5 text-sm leading-relaxed">
                  {r.met ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  ) : (
                    <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  )}
                  <span>
                    {r.label}
                    <span className="sr-only">{r.met ? " (done)" : " (not done)"}</span>
                  </span>
                </li>
              ))}
          </ul>
        </section>

        {/* Knowledge check (always last) */}
        {hasKc && (
          <section className="mt-6">
            <SectionTitle icon={ListChecks}>Knowledge check</SectionTitle>
            <p className="mt-1 text-xs text-muted-foreground">Passing score: 100%. Answer every question correctly to complete this lesson.</p>
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
                    ? videoIds.length > 1
                      ? `Watch at least ${requiredPercent}% of each lesson video to continue.`
                      : `Watch at least ${requiredPercent}% of the lesson video to continue.`
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

/** Lesson images and diagrams, each with an optional caption. */
function LessonImages({ images }: { images: { url: string; caption?: string }[] }) {
  return (
    <Card className="p-5 sm:p-6">
      <SectionTitle icon={ImageIcon}>Images &amp; diagrams</SectionTitle>
      <div className={cn("mt-4 grid gap-4", images.length > 1 && "sm:grid-cols-2")}>
        {images.map((img, i) => (
          <figure key={i} className="flex flex-col gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- admin-uploaded images on arbitrary storage hosts */}
            <img
              src={img.url}
              alt={img.caption || `Lesson diagram ${i + 1}`}
              loading="lazy"
              className="w-full rounded-lg border border-border bg-muted object-contain"
            />
            {img.caption ? <figcaption className="text-xs text-muted-foreground">{img.caption}</figcaption> : null}
          </figure>
        ))}
      </div>
    </Card>
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
 * Embedded YouTube lesson video. Loads the learner's saved watch percentage,
 * saves progress as they watch, and unlocks completion once they have watched
 * at least the lesson's required percentage of the video.
 */
function LessonVideo({
  videoId,
  title,
  courseSlug,
  lessonId,
  viewer,
  requiredPercent,
  watched,
  onWatched,
}: {
  videoId: string
  title: string
  courseSlug: string
  lessonId: string
  viewer: string
  requiredPercent: number
  watched: boolean
  onWatched: () => void
}) {
  const { data: saved } = useSWR(["watch-progress", courseSlug, lessonId], () => getWatchProgress(courseSlug, lessonId))
  const [livePercent, setLivePercent] = useState(0)
  const percent = Math.max(saved?.maxPercent ?? 0, livePercent)
  const onWatchedRef = useRef(onWatched)
  onWatchedRef.current = onWatched

  useEffect(() => {
    if (!watched && percent >= requiredPercent) onWatchedRef.current()
  }, [percent, watched, requiredPercent])

  return (
    <div className="flex flex-col gap-2">
      <YouTubePlayer
        videoId={videoId}
        title={title}
        viewer={viewer}
        initialPercent={saved?.maxPercent ?? 0}
        onProgress={(u) => {
          setLivePercent((p) => Math.max(p, u.percent))
          void saveWatchProgress({ courseSlug, lessonId, requiredPercent, ...u })
        }}
      />
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-label="Video watched"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
        </div>
        <span className="inline-flex items-center gap-1.5 tabular-nums">
          {watched || percent >= requiredPercent ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-success" /> Video watched
            </>
          ) : (
            <>
              <PlayCircle className="h-3.5 w-3.5" /> {percent}% watched · {requiredPercent}% required
            </>
          )}
        </span>
      </div>
    </div>
  )
}
