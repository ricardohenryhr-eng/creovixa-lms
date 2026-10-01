import type { KnowledgeQuestion, TermItem } from "@/lib/data"

export interface LessonImage {
  url: string
  caption?: string
}

export interface LessonAttachment {
  name: string
  url: string
}

export type LessonStatus = "draft" | "published"

/** Admin-editable lesson content stored in `lesson_videos`, keyed by `${moduleId}::${lessonId}`. */
export interface LessonContentRow {
  lessonKey: string
  videoUrl: string | null
  transcript: string | null
  audioUrl: string | null
  durationSeconds: number | null
  title: string | null
  body: string | null
  images: LessonImage[]
  vocabulary: TermItem[]
  quiz: KnowledgeQuestion[]
  attachments: LessonAttachment[]
  status: LessonStatus
  updatedAt: string | null
}

/**
 * Courses delivered as text, images, and quizzes only. Video is never
 * required (or shown) for these, and the admin editor hides the video field.
 */
export const VIDEO_FREE_COURSES = new Set([
  "code-of-conduct",
  "hipaa-fraud-awareness",
  "healthcare-hipaa-compliance",
  "opi-training",
  "vri-training",
])

export function isVideoFreeCourse(slug: string): boolean {
  return VIDEO_FREE_COURSES.has(slug)
}

export function lessonKey(moduleId: string, lessonId: string): string {
  return `${moduleId}::${lessonId}`
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : []
}

function str(value: unknown): string {
  return typeof value === "string" ? value : ""
}

/** Normalise a raw `lesson_videos` row into a typed, defensively-parsed shape. */
export function toLessonContentRow(r: Record<string, unknown>): LessonContentRow {
  return {
    lessonKey: str(r.lesson_id),
    videoUrl: (r.video_url as string | null) ?? null,
    transcript: (r.transcript as string | null) ?? null,
    audioUrl: (r.audio_url as string | null) ?? null,
    durationSeconds: (r.duration_seconds as number | null) ?? null,
    title: (r.title as string | null) ?? null,
    body: (r.body as string | null) ?? null,
    images: asArray(r.images)
      .map((i) => ({ url: str((i as LessonImage)?.url), caption: str((i as LessonImage)?.caption) || undefined }))
      .filter((i) => i.url),
    vocabulary: asArray(r.vocabulary)
      .map((t) => ({ term: str((t as TermItem)?.term), definition: str((t as TermItem)?.definition) }))
      .filter((t) => t.term),
    quiz: asArray(r.quiz)
      .map((q, i) => {
        const raw = q as KnowledgeQuestion
        return {
          id: str(raw?.id) || `q${i + 1}`,
          question: str(raw?.question),
          options: asArray(raw?.options).map(str),
          answer: typeof raw?.answer === "number" ? raw.answer : 0,
          explanation: str(raw?.explanation) || undefined,
        }
      })
      .filter((q) => q.question && q.options.length >= 2),
    attachments: asArray(r.resources)
      .map((a) => ({ name: str((a as LessonAttachment)?.name), url: str((a as LessonAttachment)?.url) }))
      .filter((a) => a.url),
    status: r.status === "draft" ? "draft" : "published",
    updatedAt: (r.updated_at as string | null) ?? null,
  }
}
