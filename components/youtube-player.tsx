"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Maximize, Minimize, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { Watermark } from "@/components/content-protection"
import { cn } from "@/lib/utils"

interface YTPlayer {
  playVideo(): void
  pauseVideo(): void
  seekTo(seconds: number, allowSeekAhead: boolean): void
  getCurrentTime(): number
  getDuration(): number
  getPlayerState(): number
  mute(): void
  unMute(): void
  isMuted(): boolean
  destroy(): void
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string
      host?: string
      width?: string
      height?: string
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: (e: { target: YTPlayer }) => void
        onStateChange?: (e: { data: number; target: YTPlayer }) => void
      }
    },
  ) => YTPlayer
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

const STATE = { ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3 } as const

let apiPromise: Promise<YTNamespace> | null = null
function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (apiPromise) return apiPromise
  apiPromise = new Promise((resolve) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      if (window.YT) resolve(window.YT)
    }
    const script = document.createElement("script")
    script.src = "https://www.youtube.com/iframe_api"
    script.async = true
    document.head.appendChild(script)
  })
  return apiPromise
}

const fmt = (s: number) => {
  const t = Math.max(0, Math.floor(s))
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const sec = (t % 60).toString().padStart(2, "0")
  return h > 0 ? `${h}:${m.toString().padStart(2, "0")}:${sec}` : `${m}:${sec}`
}

export interface WatchUpdate {
  percent: number
  watchedSeconds: number
  durationSeconds: number
}

/**
 * Embedded YouTube player that keeps learners inside the LMS. YouTube's own
 * controls, title links, pause screen and end-screen suggestions are hidden
 * behind LMS controls, so normal playback never sends anyone to youtube.com.
 * Watch percentage counts distinct seconds actually played, so skipping ahead
 * does not count towards completion.
 */
export function YouTubePlayer({
  videoId,
  title,
  viewer,
  initialPercent = 0,
  onProgress,
}: {
  videoId: string
  title: string
  viewer?: string
  initialPercent?: number
  /** Called on a throttle while playing, and on pause, end, and unmount. */
  onProgress?: (update: WatchUpdate) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<YTPlayer | null>(null)
  const seenRef = useRef<Set<number>>(new Set())
  const lastTimeRef = useRef(0)
  const lastReportRef = useRef(0)
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  const [ready, setReady] = useState(false)
  const [state, setState] = useState<number>(-1)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [percent, setPercent] = useState(initialPercent)
  const initialRef = useRef(initialPercent)

  useEffect(() => {
    initialRef.current = Math.max(initialRef.current, initialPercent)
    setPercent((p) => Math.max(p, initialPercent))
  }, [initialPercent])

  const report = useCallback((force = false) => {
    const p = playerRef.current
    if (!p || seenRef.current.size === 0) return
    const d = Math.floor(p.getDuration() || 0)
    if (!d) return
    const now = Date.now()
    if (!force && now - lastReportRef.current < 10000) return
    lastReportRef.current = now
    const pct = Math.max(initialRef.current, Math.min(100, Math.round((seenRef.current.size / d) * 100)))
    onProgressRef.current?.({ percent: pct, watchedSeconds: seenRef.current.size, durationSeconds: d })
  }, [])

  useEffect(() => {
    let cancelled = false
    seenRef.current = new Set()
    lastTimeRef.current = 0
    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return
      playerRef.current = new YT.Player(mountRef.current, {
        videoId,
        host: "https://www.youtube-nocookie.com",
        width: "100%",
        height: "100%",
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          modestbranding: 1,
          cc_load_policy: 0,
          origin: window.location.origin,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return
            setDuration(e.target.getDuration() || 0)
            setReady(true)
          },
          onStateChange: (e) => {
            setState(e.data)
            if (e.data === STATE.PLAYING) setDuration(e.target.getDuration() || 0)
            if (e.data === STATE.PAUSED || e.data === STATE.ENDED) report(true)
          },
        },
      })
    })
    return () => {
      cancelled = true
      report(true)
      playerRef.current?.destroy()
      playerRef.current = null
      setReady(false)
    }
  }, [videoId, report])

  // Sample playback twice a second; only contiguous playback counts as watched.
  useEffect(() => {
    if (state !== STATE.PLAYING) return
    const id = setInterval(() => {
      const p = playerRef.current
      if (!p) return
      const t = p.getCurrentTime()
      const last = lastTimeRef.current
      if (t >= last && t - last <= 2) {
        for (let s = Math.floor(last); s < Math.floor(t); s++) seenRef.current.add(s)
      }
      lastTimeRef.current = t
      setCurrent(t)
      const d = p.getDuration() || 0
      if (d > 0) {
        setPercent((prev) => Math.max(prev, Math.min(100, Math.round((seenRef.current.size / Math.floor(d)) * 100))))
      }
      report()
    }, 500)
    return () => clearInterval(id)
  }, [state, report])

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === containerRef.current)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  const playing = state === STATE.PLAYING || state === STATE.BUFFERING
  const ended = state === STATE.ENDED

  function toggle() {
    const p = playerRef.current
    if (!p || !ready) return
    if (playing) p.pauseVideo()
    else {
      if (ended) {
        p.seekTo(0, true)
        lastTimeRef.current = 0
      }
      p.playVideo()
    }
  }

  function seek(to: number) {
    const p = playerRef.current
    if (!p) return
    p.seekTo(to, true)
    lastTimeRef.current = to
    setCurrent(to)
  }

  function toggleMute() {
    const p = playerRef.current
    if (!p) return
    if (p.isMuted()) p.unMute()
    else p.mute()
    setMuted(!muted)
  }

  function toggleFullscreen() {
    const el = containerRef.current
    if (!el) return
    if (document.fullscreenElement) void document.exitFullscreen()
    else void el.requestFullscreen?.()
  }

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      aria-label={`${title} video player`}
      onContextMenu={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return
        if (e.key === " " || e.key.toLowerCase() === "k") {
          e.preventDefault()
          toggle()
        } else if (e.key === "ArrowRight") seek(Math.min(duration, current + 5))
        else if (e.key === "ArrowLeft") seek(Math.max(0, current - 5))
        else if (e.key.toLowerCase() === "f") toggleFullscreen()
      }}
      className={cn(
        "group relative aspect-video w-full overflow-hidden rounded-xl bg-black text-white outline-none focus-visible:ring-2 focus-visible:ring-ring",
        fullscreen && "rounded-none",
      )}
    >
      <div className="pointer-events-none absolute inset-0 [&>iframe]:h-full [&>iframe]:w-full">
        <div ref={mountRef} />
      </div>

      {/* Click shield: every click lands on the LMS, never on YouTube links. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={toggle}
        className="absolute inset-0 z-10 cursor-pointer"
      />

      {viewer ? (
        <div className="pointer-events-none absolute inset-0 z-10">
          <Watermark label={viewer} />
        </div>
      ) : null}

      {/* Cover shown before start, while paused, and at the end — hides YouTube's suggestion screens. */}
      {!playing ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element -- YouTube-hosted thumbnail */}
          <img
            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/40" />
          <button
            type="button"
            onClick={toggle}
            disabled={!ready}
            aria-label={ended ? "Replay video" : current > 0 ? "Resume video" : "Play video"}
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105 disabled:opacity-60"
          >
            {ended ? <RotateCcw className="h-7 w-7" /> : <Play className="h-7 w-7 translate-x-0.5" />}
          </button>
          <span className="absolute left-4 top-3 max-w-[70%] truncate text-sm font-medium">{title}</span>
        </div>
      ) : null}

      {/* LMS control bar */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 z-30 flex flex-col gap-2 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-6 transition-opacity",
          playing ? "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" : "opacity-100",
        )}
      >
        <input
          type="range"
          min={0}
          max={Math.max(1, Math.floor(duration))}
          step={1}
          value={Math.floor(current)}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
          className="h-1 w-full cursor-pointer accent-primary"
          disabled={!ready}
        />
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={toggle}
            disabled={!ready}
            aria-label={playing ? "Pause" : "Play"}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/15"
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            disabled={!ready}
            aria-label={muted ? "Unmute" : "Mute"}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/15"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <span className="tabular-nums text-white/80">
            {fmt(current)} / {fmt(duration)}
          </span>
          <span className="ml-auto rounded-full bg-white/15 px-2 py-0.5 tabular-nums">
            {percent >= 100 ? "Watched" : `${percent}% watched`}
          </span>
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? "Exit full screen" : "Full screen"}
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-white/15"
          >
            {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
