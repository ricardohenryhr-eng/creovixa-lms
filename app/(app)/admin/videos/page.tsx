"use client"

import { useMemo, useState } from "react"
import useSWR from "swr"
import {
  Video,
  CircleCheck,
  CircleAlert,
  CircleDashed,
  Search,
  ChevronDown,
  Save,
  Trash2,
  ExternalLink,
} from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Button, Input } from "@/components/ui"
import { courses } from "@/lib/data"
import { parseVideoSource, videoKindLabel } from "@/lib/video"
import { listLessonVideos, upsertLessonVideo, deleteLessonVideo, type LessonVideoRow } from "@/app/actions/videos"
import { cn } from "@/lib/utils"

interface VideoLessonRef {
  courseSlug: string
  courseTitle: string
  category: string
  moduleTitle: string
  lessonId: string
  lessonTitle: string
  key: string
}

/** Every video-type lesson across the whole catalog, in catalog order. */
const videoLessons: VideoLessonRef[] = courses
  .slice()
  .sort((a, b) => a.order - b.order)
  .flatMap((c) =>
    c.modules.flatMap((m) =>
      m.lessons
        .filter((l) => l.type === "video")
        .map((l) => ({
          courseSlug: c.slug,
          courseTitle: c.title,
          category: c.category,
          moduleTitle: m.title,
          lessonId: l.id,
          lessonTitle: l.title,
          key: `${c.slug}::${l.id}`,
        })),
    ),
  )

const categoryOptions = ["All", ...Array.from(new Set(videoLessons.map((l) => l.category)))]

type Status = "published" | "media" | "missing"

function statusOf(row: LessonVideoRow | undefined): Status {
  if (row && row.videoUrl && row.videoUrl.trim()) return "published"
  if (row && (row.transcript || row.audioUrl)) return "media"
  return "missing"
}

export default function VideoContentPage() {
  const { data: rows, mutate, isLoading } = useSWR("lesson-videos", () => listLessonVideos())
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [statusFilter, setStatusFilter] = useState<"all" | Status>("all")

  const mediaByKey = useMemo(() => {
    const map = new Map<string, LessonVideoRow>()
    for (const r of rows ?? []) map.set(`${r.courseSlug}::${r.lessonId}`, r)
    return map
  }, [rows])

  const stats = useMemo(() => {
    let published = 0
    let media = 0
    let missing = 0
    for (const l of videoLessons) {
      const s = statusOf(mediaByKey.get(l.key))
      if (s === "published") published++
      else if (s === "media") media++
      else missing++
    }
    return { total: videoLessons.length, published, media, missing }
  }, [mediaByKey])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return videoLessons.filter((l) => {
      if (category !== "All" && l.category !== category) return false
      if (statusFilter !== "all" && statusOf(mediaByKey.get(l.key)) !== statusFilter) return false
      if (q && !l.lessonTitle.toLowerCase().includes(q) && !l.courseTitle.toLowerCase().includes(q)) return false
      return true
    })
  }, [query, category, statusFilter, mediaByKey])

  // Group filtered lessons by course, preserving order.
  const grouped = useMemo(() => {
    const groups: { courseSlug: string; courseTitle: string; category: string; lessons: VideoLessonRef[] }[] = []
    for (const l of filtered) {
      let g = groups.find((x) => x.courseSlug === l.courseSlug)
      if (!g) {
        g = { courseSlug: l.courseSlug, courseTitle: l.courseTitle, category: l.category, lessons: [] }
        groups.push(g)
      }
      g.lessons.push(l)
    }
    return groups
  }, [filtered])

  return (
    <div>
      <PageHeader
        title="Video content"
        subtitle="Audit every video lesson and attach real training media. Supports MP4, Supabase Storage, YouTube, and Vimeo (private/unlisted)."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Video lessons" value={stats.total} icon={<Video className="h-5 w-5" />} tone="orange" hint="Across catalog" />
        <StatCard label="With video" value={stats.published} icon={<CircleCheck className="h-5 w-5" />} tone="green" hint="Ready to watch" />
        <StatCard label="Media only" value={stats.media} icon={<CircleAlert className="h-5 w-5" />} tone="amber" hint="Transcript/audio, no video" />
        <StatCard label="Missing video" value={stats.missing} icon={<CircleDashed className="h-5 w-5" />} tone="blue" hint="Shows “coming soon”" />
      </div>

      <div className="mb-5 mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search lessons or courses…" className="pl-9" aria-label="Search video lessons" />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", "missing", "media", "published"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium capitalize transition",
                statusFilter === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {s === "all" ? "All" : s === "media" ? "Media only" : s === "published" ? "With video" : "Missing"}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {categoryOptions.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition",
              category === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {isLoading ? (
        <Card className="p-10 text-center text-sm text-muted-foreground">Loading video audit…</Card>
      ) : grouped.length === 0 ? (
        <Card className="p-10 text-center text-sm text-muted-foreground">No video lessons match your filters.</Card>
      ) : (
        <div className="flex flex-col gap-5">
          {grouped.map((g) => (
            <Card key={g.courseSlug} className="overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/40 px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate font-display font-semibold">{g.courseTitle}</p>
                  <p className="text-xs text-muted-foreground">{g.category}</p>
                </div>
                <a
                  href={`/courses/${g.courseSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                >
                  View course <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <ul className="divide-y divide-border">
                {g.lessons.map((l) => (
                  <AuditRow key={l.key} lesson={l} media={mediaByKey.get(l.key)} onSaved={() => mutate()} />
                ))}
              </ul>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

function StatusBadge({ status }: { status: Status }) {
  if (status === "published") return <Badge tone="green"><CircleCheck className="h-3.5 w-3.5" /> With video</Badge>
  if (status === "media") return <Badge tone="amber"><CircleAlert className="h-3.5 w-3.5" /> Media only</Badge>
  return <Badge tone="muted"><CircleDashed className="h-3.5 w-3.5" /> Coming soon</Badge>
}

function AuditRow({ lesson, media, onSaved }: { lesson: VideoLessonRef; media: LessonVideoRow | undefined; onSaved: () => void }) {
  const [open, setOpen] = useState(false)
  const [videoUrl, setVideoUrl] = useState(media?.videoUrl ?? "")
  const [transcript, setTranscript] = useState(media?.transcript ?? "")
  const [audioUrl, setAudioUrl] = useState(media?.audioUrl ?? "")
  const [duration, setDuration] = useState(media?.durationSeconds != null ? String(media.durationSeconds) : "")
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null)

  const status = statusOf(media)
  const source = parseVideoSource(videoUrl)
  const urlValid = !videoUrl.trim() || source.kind !== "none"

  async function save() {
    setSaving(true)
    setMsg(null)
    const res = await upsertLessonVideo({
      courseSlug: lesson.courseSlug,
      lessonId: lesson.lessonId,
      videoUrl,
      transcript,
      audioUrl,
      durationSeconds: duration ? Number(duration) : null,
    })
    setSaving(false)
    setMsg({ ok: res.ok, text: res.ok ? res.message ?? "Saved." : res.error ?? "Save failed." })
    if (res.ok) onSaved()
  }

  async function remove() {
    setSaving(true)
    setMsg(null)
    const res = await deleteLessonVideo(lesson.courseSlug, lesson.lessonId)
    setSaving(false)
    if (res.ok) {
      setVideoUrl("")
      setTranscript("")
      setAudioUrl("")
      setDuration("")
      setMsg({ ok: true, text: "Removed." })
      onSaved()
    } else {
      setMsg({ ok: false, text: res.error ?? "Remove failed." })
    }
  }

  return (
    <li>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/30"
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium">{lesson.lessonTitle}</span>
          <span className="truncate text-xs text-muted-foreground">{lesson.moduleTitle} · lesson {lesson.lessonId}</span>
        </span>
        <StatusBadge status={status} />
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="border-t border-border bg-muted/20 px-4 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Video URL</span>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="MP4, Supabase Storage, YouTube, or Vimeo URL"
              />
              <span className="text-xs text-muted-foreground">
                {videoUrl.trim()
                  ? urlValid
                    ? `Detected source: ${videoKindLabel(source.kind)}`
                    : "Not a supported video URL."
                  : "Leave blank to keep this lesson as “Training video coming soon”."}
              </span>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Audio drill URL</span>
              <Input value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} placeholder="MP3/audio URL (optional)" />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Duration (seconds)</span>
              <Input
                type="number"
                min={0}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 760"
              />
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Transcript</span>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                rows={5}
                placeholder="Full lesson transcript (optional)"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm leading-relaxed outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Button onClick={save} disabled={saving || !urlValid}>
              <Save className="h-4 w-4" /> {saving ? "Saving…" : "Save media"}
            </Button>
            {media && (
              <Button variant="outline" onClick={remove} disabled={saving}>
                <Trash2 className="h-4 w-4" /> Remove
              </Button>
            )}
            {msg && (
              <span className={cn("text-sm font-medium", msg.ok ? "text-success" : "text-destructive")}>{msg.text}</span>
            )}
          </div>
        </div>
      )}
    </li>
  )
}
