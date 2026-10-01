import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { toLessonContentRow, type LessonContentRow } from "@/lib/lesson-content"

export const dynamic = "force-dynamic"

/**
 * Public read of the admin-edited lesson content for a single course
 * (video, images, notes, vocabulary, PDFs, quiz). Only published rows are
 * returned, keyed by `${moduleId}::${lessonId}`, so the course page can
 * overlay them onto the authored lesson data. RLS allows everyone to read
 * this table; only admins can write it.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("lesson_videos")
    .select("*")
    .eq("course_slug", slug)
    .eq("status", "published")

  if (error) return NextResponse.json({ videos: {} })

  const videos: Record<string, LessonContentRow> = {}
  for (const row of data ?? []) {
    const parsed = toLessonContentRow(row)
    videos[parsed.lessonKey] = parsed
  }

  return NextResponse.json({ videos })
}
