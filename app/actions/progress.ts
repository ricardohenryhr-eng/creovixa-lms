"use server"

import { createClient } from "@/lib/supabase/server"
import { WATCH_THRESHOLD } from "@/lib/video"

export interface WatchProgress {
  maxPercent: number
  watchedSeconds: number
  durationSeconds: number | null
  completed: boolean
}

const clampInt = (n: unknown, min: number, max: number) => {
  const v = Math.round(Number(n))
  return Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : min
}

/** The signed-in learner's saved watch progress for one lesson. */
export async function getWatchProgress(courseSlug: string, lessonId: string): Promise<WatchProgress | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data } = await supabase
    .from("lesson_progress")
    .select("max_percent, watched_seconds, duration_seconds, completed_at")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .eq("lesson_id", lessonId)
    .maybeSingle()
  if (!data) return null
  return {
    maxPercent: data.max_percent ?? 0,
    watchedSeconds: data.watched_seconds ?? 0,
    durationSeconds: data.duration_seconds,
    completed: Boolean(data.completed_at),
  }
}

/**
 * Persist watch progress. Progress never goes backwards: the stored percentage
 * and watched seconds only increase, so rewatching or reloading is safe.
 */
export async function saveWatchProgress(input: {
  courseSlug: string
  lessonId: string
  percent: number
  watchedSeconds: number
  durationSeconds: number
}): Promise<{ ok: boolean }> {
  const courseSlug = String(input.courseSlug ?? "").slice(0, 200)
  const lessonId = String(input.lessonId ?? "").slice(0, 200)
  if (!courseSlug || !lessonId) return { ok: false }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false }

  const duration = clampInt(input.durationSeconds, 0, 24 * 3600)
  const watched = clampInt(input.watchedSeconds, 0, duration || 24 * 3600)
  const percent = clampInt(input.percent, 0, 100)

  const { data: existing } = await supabase
    .from("lesson_progress")
    .select("max_percent, watched_seconds, completed_at")
    .eq("user_id", user.id)
    .eq("course_slug", courseSlug)
    .eq("lesson_id", lessonId)
    .maybeSingle()

  const maxPercent = Math.max(existing?.max_percent ?? 0, percent)
  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      course_slug: courseSlug,
      lesson_id: lessonId,
      max_percent: maxPercent,
      watched_seconds: Math.max(existing?.watched_seconds ?? 0, watched),
      duration_seconds: duration || null,
      completed_at: existing?.completed_at ?? (maxPercent >= WATCH_THRESHOLD ? new Date().toISOString() : null),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,course_slug,lesson_id" },
  )
  return { ok: !error }
}
