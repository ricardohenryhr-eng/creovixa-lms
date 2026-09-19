"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { parseVideoSource } from "@/lib/video"

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
  return { ok: true, message: "Lesson media removed." }
}
