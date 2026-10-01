"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { parseVideoSource } from "@/lib/video"
import { createAdminClient } from "@/lib/supabase/admin"
import type { KnowledgeQuestion, TermItem } from "@/lib/data"
import {
  isVideoFreeCourse,
  toLessonContentRow,
  type LessonAttachment,
  type LessonContentRow,
  type LessonImage,
  type LessonStatus,
} from "@/lib/lesson-content"

export interface LessonVideoRow {
  courseSlug: string
  lessonId: string
  videoUrl: string | null
  transcript: string | null
  audioUrl: string | null
  durationSeconds: number | null
}

interface ActionResult {
  ok: boolean
  error?: string
  message?: string
}

/**
 * Resolve the caller and enforce that they are a platform admin. Writes to
 * lesson_videos are also protected by RLS; this guard gives friendly errors.
 */
async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: "Not authenticated." as const }
  const { data } = await supabase.from("profiles").select("role").eq("id", user.id).single()
  if (!data || (data.role !== "super_admin" && data.role !== "admin")) {
    return { error: "Admin access required." as const }
  }
  return { supabase }
}

/** All database-backed lesson media rows, for the admin audit report. */
export async function listLessonVideos(): Promise<LessonVideoRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("lesson_videos")
    .select("course_slug, lesson_id, video_url, transcript, audio_url, duration_seconds")
  if (error || !data) return []
  return data.map((r) => ({
    courseSlug: r.course_slug,
    lessonId: r.lesson_id,
    videoUrl: r.video_url,
    transcript: r.transcript,
    audioUrl: r.audio_url,
    durationSeconds: r.duration_seconds,
  }))
}

/**
 * Create or update the media for one lesson. A blank video URL is allowed
 * (stores transcript/audio while the video is still being produced); a
 * non-blank URL must resolve to a supported source (MP4, Supabase Storage,
 * YouTube, or Vimeo).
 */
export async function upsertLessonVideo(input: {
  courseSlug: string
  lessonId: string
  videoUrl?: string
  transcript?: string
  audioUrl?: string
  durationSeconds?: number | null
}): Promise<ActionResult> {
  const guard = await requireAdmin()
  if ("error" in guard) return { ok: false, error: guard.error }
  const { supabase } = guard

  const courseSlug = input.courseSlug?.trim()
  const lessonId = input.lessonId?.trim()
  if (!courseSlug || !lessonId) return { ok: false, error: "Missing course or lesson." }

  const videoUrl = input.videoUrl?.trim() || null
  if (videoUrl && parseVideoSource(videoUrl).kind === "none") {
    return { ok: false, error: "That video URL is not a supported MP4, Supabase, YouTube, or Vimeo link." }
  }

  const audioUrl = input.audioUrl?.trim() || null
  const transcript = input.transcript?.trim() || null
  const duration =
    input.durationSeconds != null && Number.isFinite(input.durationSeconds) && input.durationSeconds > 0
      ? Math.round(input.durationSeconds)
      : null

  const { error } = await supabase.from("lesson_videos").upsert(
    {
      course_slug: courseSlug,
      lesson_id: lessonId,
      video_url: videoUrl,
      transcript,
      audio_url: audioUrl,
      duration_seconds: duration,
    },
    { onConflict: "course_slug,lesson_id" },
  )

  if (error) return { ok: false, error: error.message }

  revalidatePath(`/courses/${courseSlug}`)
  revalidatePath("/admin/videos")
  return { ok: true, message: "Lesson media saved." }
}

/** Every edited lesson row for one course, including drafts, for the admin editor. */
export async function listLessonContent(courseSlug: string): Promise<LessonContentRow[]> {
  const guard = await requireAdmin()
  if ("error" in guard) return []
  const { data, error } = await guard.supabase.from("lesson_videos").select("*").eq("course_slug", courseSlug)
  if (error || !data) return []
  return data.map(toLessonContentRow)
}

const MAX_TEXT = 20000
const isHttpUrl = (u: string) => /^https?:\/\/\S+$/i.test(u) || u.startsWith("/")

/** Create or replace all editable content for one lesson. */
export async function saveLessonContent(input: {
  courseSlug: string
  lessonKey: string
  videoUrl: string
  body: string
  images: LessonImage[]
  vocabulary: TermItem[]
  quiz: KnowledgeQuestion[]
  attachments: LessonAttachment[]
  status: LessonStatus
}): Promise<ActionResult> {
  const guard = await requireAdmin()
  if ("error" in guard) return { ok: false, error: guard.error }
  const { supabase } = guard

  const courseSlug = input.courseSlug?.trim()
  const lessonKey = input.lessonKey?.trim()
  if (!courseSlug || !lessonKey || !lessonKey.includes("::")) return { ok: false, error: "Missing course or lesson." }

  let videoUrl = input.videoUrl?.trim() || null
  if (isVideoFreeCourse(courseSlug)) videoUrl = null
  if (videoUrl) {
    const kind = parseVideoSource(videoUrl).kind
    if (kind !== "youtube" && kind !== "vimeo" && kind !== "supabase" && !/\.(mp4|webm)(\?.*)?$/i.test(videoUrl)) {
      return { ok: false, error: "Paste a full YouTube link, e.g. https://www.youtube.com/watch?v=… or https://youtu.be/…" }
    }
  }

  const body = (input.body ?? "").trim().slice(0, MAX_TEXT) || null

  const images = (input.images ?? []).slice(0, 20).map((i) => ({
    url: (i.url ?? "").trim(),
    caption: (i.caption ?? "").trim().slice(0, 300) || undefined,
  }))
  if (images.some((i) => !isHttpUrl(i.url))) return { ok: false, error: "Every image needs a valid URL." }

  const vocabulary = (input.vocabulary ?? [])
    .map((t) => ({ term: (t.term ?? "").trim().slice(0, 200), definition: (t.definition ?? "").trim().slice(0, 1000) }))
    .filter((t) => t.term || t.definition)
  if (vocabulary.some((t) => !t.term || !t.definition)) {
    return { ok: false, error: "Each vocabulary entry needs both a term and a definition." }
  }

  const quiz: KnowledgeQuestion[] = []
  for (const [i, q] of (input.quiz ?? []).slice(0, 30).entries()) {
    const question = (q.question ?? "").trim().slice(0, 1000)
    const options = (q.options ?? []).map((o) => (o ?? "").trim().slice(0, 500)).filter(Boolean)
    if (!question && options.length === 0) continue
    if (!question) return { ok: false, error: `Quiz question ${i + 1} is missing its text.` }
    if (options.length < 2) return { ok: false, error: `Quiz question ${i + 1} needs at least two answer options.` }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= options.length) {
      return { ok: false, error: `Select the correct answer for quiz question ${i + 1}.` }
    }
    quiz.push({
      id: `q${quiz.length + 1}`,
      question,
      options,
      answer: q.answer,
      explanation: (q.explanation ?? "").trim().slice(0, 1000) || undefined,
    })
  }

  const attachments = (input.attachments ?? [])
    .slice(0, 20)
    .map((a) => ({ name: (a.name ?? "").trim().slice(0, 200) || "Lesson document", url: (a.url ?? "").trim() }))
  if (attachments.some((a) => !isHttpUrl(a.url))) return { ok: false, error: "Every PDF attachment needs a valid URL." }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { error } = await supabase.from("lesson_videos").upsert(
    {
      course_slug: courseSlug,
      lesson_id: lessonKey,
      video_url: videoUrl,
      provider: videoUrl ? parseVideoSource(videoUrl).kind : null,
      body,
      images,
      vocabulary,
      quiz,
      resources: attachments,
      status: input.status === "draft" ? "draft" : "published",
      updated_by: user?.id ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "course_slug,lesson_id" },
  )
  if (error) return { ok: false, error: error.message }

  revalidatePath(`/courses/${courseSlug}`)
  revalidatePath("/admin/lessons")
  return { ok: true, message: input.status === "draft" ? "Draft saved. Learners still see the previous version." : "Lesson published." }
}

const IMAGE_TYPES = new Set(["image/png", "image/jpeg"])
const MAX_UPLOAD = 5 * 1024 * 1024

/** Upload an image or PDF for a lesson to Supabase Storage and return its public URL. */
export async function uploadLessonAsset(formData: FormData): Promise<ActionResult & { url?: string; name?: string }> {
  const guard = await requireAdmin()
  if ("error" in guard) return { ok: false, error: guard.error }

  const file = formData.get("file")
  const courseSlug = String(formData.get("courseSlug") ?? "").replace(/[^a-z0-9-]/gi, "")
  const kind = formData.get("kind") === "pdf" ? "pdf" : "image"
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Choose a file to upload." }
  if (!courseSlug) return { ok: false, error: "Missing course." }
  if (file.size > MAX_UPLOAD) return { ok: false, error: "Files must be 5 MB or smaller." }
  if (kind === "image" && !IMAGE_TYPES.has(file.type)) return { ok: false, error: "Images must be PNG or JPEG." }
  if (kind === "pdf" && file.type !== "application/pdf") return { ok: false, error: "Attachments must be PDF files." }

  const ext = kind === "pdf" ? "pdf" : file.type === "image/png" ? "png" : "jpg"
  const path = `${courseSlug}/${kind}s/${crypto.randomUUID()}.${ext}`
  const admin = createAdminClient()
  const { error } = await admin.storage
    .from("lesson-media")
    .upload(path, Buffer.from(await file.arrayBuffer()), { contentType: file.type, upsert: false })
  if (error) return { ok: false, error: error.message }

  const { data } = admin.storage.from("lesson-media").getPublicUrl(path)
  return { ok: true, url: data.publicUrl, name: file.name.replace(/\.[^.]+$/, "") }
}

/** Remove the database media for one lesson (reverts it to "coming soon"). */
export async function deleteLessonVideo(courseSlug: string, lessonId: string): Promise<ActionResult> {
  const guard = await requireAdmin()
  if ("error" in guard) return { ok: false, error: guard.error }
  const { supabase } = guard

  const { error } = await supabase
    .from("lesson_videos")
    .delete()
    .eq("course_slug", courseSlug)
    .eq("lesson_id", lessonId)

  if (error) return { ok: false, error: error.message }

  revalidatePath(`/courses/${courseSlug}`)
  revalidatePath("/admin/videos")
  revalidatePath("/admin/lessons")
  return { ok: true, message: "Lesson content reset to the default version." }
}
