/**
 * Video source parsing for the lesson player.
 *
 * A lesson's stored video URL can be one of four kinds:
 *   - mp4      → a direct video file (any hosting) played with <video>
 *   - supabase → a Supabase Storage object URL, also played with <video>
 *   - youtube  → public/unlisted YouTube, played via privacy-friendly embed
 *   - vimeo    → public/unlisted Vimeo (with optional /hash), played via embed
 *
 * File-backed sources ("mp4"/"supabase") support automatic watch tracking via
 * the <video> element's timeupdate. Embeds cannot report progress, so the
 * player asks the learner to confirm they finished watching.
 */

export type VideoKind = "mp4" | "youtube" | "vimeo" | "supabase" | "none"

export interface VideoSource {
  kind: VideoKind
  /** For iframe embeds (youtube / vimeo). */
  embedUrl?: string
  /** For native <video> playback (mp4 / supabase). */
  fileUrl?: string
  /** Whether native <video> playback (with progress tracking) is available. */
  isFile: boolean
}

export function parseVideoSource(raw?: string | null): VideoSource {
  const url = (raw ?? "").trim()
  if (!url) return { kind: "none", isFile: false }

  const yt = parseYouTube(url)
  if (yt) return { kind: "youtube", embedUrl: yt, isFile: false }

  const vm = parseVimeo(url)
  if (vm) return { kind: "vimeo", embedUrl: vm, isFile: false }

  // Supabase Storage object URLs (public, sign, or authenticated object paths).
  if (/\/storage\/v1\/object\//.test(url)) {
    return { kind: "supabase", fileUrl: url, isFile: true }
  }

  // Direct media files.
  if (/\.(mp4|webm|ogg|ogv|mov|m4v)(\?.*)?$/i.test(url)) {
    return { kind: "mp4", fileUrl: url, isFile: true }
  }

  // Unknown but present: attempt native playback and let the browser decide.
  return { kind: "mp4", fileUrl: url, isFile: true }
}

/** Whether a stored URL resolves to a playable video of any supported kind. */
export function hasPlayableVideo(raw?: string | null): boolean {
  return parseVideoSource(raw).kind !== "none"
}

function parseYouTube(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, "")
    if (host === "youtu.be") {
      const id = u.pathname.slice(1)
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
    }
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (u.pathname === "/watch") {
        const id = u.searchParams.get("v")
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
      }
      if (u.pathname.startsWith("/embed/")) return url
      if (u.pathname.startsWith("/shorts/")) {
        const id = u.pathname.split("/")[2]
        return id ? `https://www.youtube-nocookie.com/embed/${id}` : null
      }
    }
    return null
  } catch {
    return null
  }
}

function parseVimeo(url: string): string | null {
  try {
    const u = new URL(url)
    const host = u.hostname.replace(/^www\./, "")
    if (host === "player.vimeo.com") return url
    if (host === "vimeo.com") {
      // https://vimeo.com/123456789  or  /123456789/abcdef123 (unlisted hash)
      const parts = u.pathname.split("/").filter(Boolean)
      const id = parts[0]
      const hash = parts[1]
      if (/^\d+$/.test(id)) {
        return hash
          ? `https://player.vimeo.com/video/${id}?h=${hash}`
          : `https://player.vimeo.com/video/${id}`
      }
    }
    return null
  } catch {
    return null
  }
}

/** Human label for a video kind, used in the admin audit report. */
export function videoKindLabel(kind: VideoKind): string {
  switch (kind) {
    case "mp4":
      return "MP4"
    case "supabase":
      return "Supabase Storage"
    case "youtube":
      return "YouTube"
    case "vimeo":
      return "Vimeo"
    default:
      return "None"
  }
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
