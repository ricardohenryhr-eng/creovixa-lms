/**
 * Video source parsing for the lesson player.
 *
 * Lessons use YouTube embeds only. The database stores just the canonical
 * YouTube watch URL; the LMS renders it with its own embedded player so
 * learners never leave the lesson page during normal playback.
 */

export type VideoKind = "youtube" | "none"

export interface VideoSource {
  kind: VideoKind
  /** 11-character YouTube video id. */
  videoId?: string
  /** Privacy-friendly embed URL (youtube-nocookie.com). */
  embedUrl?: string
  /** Kept for callers that branch on native playback; always false. */
  isFile: false
}

/** Default percentage of a lesson video a learner must watch; admins can override per lesson. */
export const WATCH_THRESHOLD = 80

/** Clamp an admin-configured viewing requirement to 10–100, falling back to the default. */
export function normalizeRequiredPercent(value: unknown): number {
  const n = Math.round(Number(value))
  return Number.isFinite(n) && n > 0 ? Math.min(100, Math.max(10, n)) : WATCH_THRESHOLD
}

const ID_RE = /^[A-Za-z0-9_-]{11}$/

/** Extract a YouTube video id from any common YouTube URL shape (or a bare id). */
export function youtubeId(raw?: string | null): string | null {
  const url = (raw ?? "").trim()
  if (!url) return null
  if (ID_RE.test(url)) return url
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^(www\.|m\.)/, "")
    let id: string | null | undefined = null
    if (host === "youtu.be") id = u.pathname.split("/")[1]
    else if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "music.youtube.com") {
      if (u.pathname === "/watch") id = u.searchParams.get("v")
      else if (/^\/(embed|shorts|live|v)\//.test(u.pathname)) id = u.pathname.split("/")[2]
    }
    return id && ID_RE.test(id) ? id : null
  } catch {
    return null
  }
}

/** Canonical URL stored in the database for a YouTube video. */
export function canonicalYouTubeUrl(raw?: string | null): string | null {
  const id = youtubeId(raw)
  return id ? `https://www.youtube.com/watch?v=${id}` : null
}

export function parseVideoSource(raw?: string | null): VideoSource {
  const id = youtubeId(raw)
  if (!id) return { kind: "none", isFile: false }
  return { kind: "youtube", videoId: id, embedUrl: `https://www.youtube-nocookie.com/embed/${id}`, isFile: false }
}

/** Whether a stored URL resolves to a playable YouTube video. */
export function hasPlayableVideo(raw?: string | null): boolean {
  return parseVideoSource(raw).kind !== "none"
}

/** Human label for a video kind, used in the admin audit report. */
export function videoKindLabel(kind: VideoKind): string {
  return kind === "youtube" ? "YouTube" : "None"
}

/** Format a whole-second duration as m:ss or h:mm:ss. */
export function formatDuration(seconds?: number | null): string | null {
  if (!seconds || seconds <= 0) return null
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  const pad = (n: number) => n.toString().padStart(2, "0")
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}
