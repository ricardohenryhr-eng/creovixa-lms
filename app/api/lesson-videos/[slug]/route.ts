import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

/**
 * Public read of the database-backed video overlay for a single course.
 * Returns a map keyed by lesson id so the course page can merge real training
 * media (video URL, transcript, audio, duration) onto the static lesson data.
 * RLS allows everyone to read this table; only admins can write it.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("lesson_videos")
    .select("lesson_id, video_url, transcript, audio_url, duration_seconds")
    .eq("course_slug", slug)

  if (error) {
    return NextResponse.json({ videos: {} })
  }

  const videos: Record<
    string,
    { videoUrl: string | null; transcript: string | null; audioUrl: string | null; durationSeconds: number | null }
  > = {}

  for (const row of data ?? []) {
    videos[row.lesson_id] = {
      videoUrl: row.video_url,
      transcript: row.transcript,
      audioUrl: row.audio_url,
      durationSeconds: row.duration_seconds,
    }
  }

  return NextResponse.json({ videos })
}
