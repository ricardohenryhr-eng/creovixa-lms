"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Play, Pause, Lock, ShieldCheck, X, FileText, Maximize2 } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

/**
 * Repeating diagonal watermark that ties any protected surface to the
 * signed-in viewer, deterring screen capture and redistribution.
 */
export function Watermark({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
      <div className="absolute -inset-1/4 flex flex-wrap gap-x-10 gap-y-8 rotate-[-24deg] opacity-[0.10]">
        {Array.from({ length: 60 }).map((_, i) => (
          <span key={i} className="whitespace-nowrap text-[11px] font-semibold tracking-wide text-white">
            Creovixa · {label}
          </span>
        ))}
      </div>
    </div>
  )
}

/**
 * Wraps course content and blocks the common ways of copying or exporting it:
 * right-click, text selection/copy/cut, image drag, and save/print/view-source
 * keyboard shortcuts. Best-effort by nature of the web, but covers casual copying.
 */
export function ContentGuard({ children, className }: { children: ReactNode; className?: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase()
      const mod = e.ctrlKey || e.metaKey
      if (mod && ["s", "p", "u", "c", "x"].includes(key)) e.preventDefault()
      if (key === "printscreen") e.preventDefault()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  const prevent = (e: { preventDefault: () => void }) => e.preventDefault()

  return (
    <div
      className={cn("select-none", className)}
      onContextMenu={prevent}
      onCopy={prevent}
      onCut={prevent}
      onDragStart={prevent}
    >
      {children}
    </div>
  )
}

/** Small inline notice reused across protected surfaces. */
export function ProtectedNotice({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
      <Lock className="h-3.5 w-3.5 text-primary" />
      {text}
    </div>
  )
}

/**
 * Protected video player. Streams only (no download/PiP), branded with the
 * Creovixa logo and a per-viewer watermark. Playback progress drives lesson
 * completion via onComplete.
 */
export function ProtectedVideoPlayer({
  title,
  viewer,
  completed = false,
  onComplete,
}: {
  title: string
  viewer: string
  completed?: boolean
  onComplete?: () => void
}) {
  const [playing, setPlaying] = useState(false)
  const [pct, setPct] = useState(completed ? 100 : 0)
  const firedRef = useRef(completed)

  useEffect(() => {
    if (!playing || pct >= 100) return
    const t = setTimeout(() => setPct((p) => Math.min(100, p + 2)), 160)
    return () => clearTimeout(t)
  }, [playing, pct])

  useEffect(() => {
    if (pct >= 100) {
      setPlaying(false)
      if (!firedRef.current) {
        firedRef.current = true
        onComplete?.()
      }
    }
  }, [pct, onComplete])

  return (
    <div
      className="relative aspect-video w-full overflow-hidden rounded-xl bg-secondary text-white"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Background surface */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(249,115,22,0.18), transparent 55%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.06), transparent 50%)",
        }}
      />
      <Watermark label={viewer} />

      {/* Top bar: brand + protection status */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
        <span className="rounded-md bg-background/90 px-2 py-1">
          <Logo className="text-sm" />
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          Protected stream
        </span>
      </div>

      {/* Center play/pause */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:scale-105"
          aria-label={playing ? "Pause lesson" : "Play lesson"}
        >
          {playing ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 translate-x-0.5" />}
        </button>
      </div>

      {/* Bottom bar: title + progress */}
      <div className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="truncate font-medium">{title}</span>
          <span className="inline-flex items-center gap-2 text-white/70">
            {pct >= 100 ? "Watched" : `${pct}%`}
            <Maximize2 className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  )
}

/**
 * Protected document viewer modal. Renders course documents view-only:
 * no download or print controls, selection and right-click disabled, and a
 * per-viewer watermark overlaid on every page.
 */
export function ProtectedDocumentViewer({
  name,
  viewer,
  onClose,
}: {
  name: string
  viewer: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      const mod = e.ctrlKey || e.metaKey
      if (mod && ["s", "p", "u", "c", "x"].includes(e.key.toLowerCase())) e.preventDefault()
    }
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  const prevent = (e: { preventDefault: () => void }) => e.preventDefault()

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="mx-auto flex h-full w-full max-w-3xl flex-col"
        onClick={(e) => e.stopPropagation()}
        onContextMenu={prevent}
        onCopy={prevent}
        onCut={prevent}
        onDragStart={prevent}
      >
        {/* Toolbar — intentionally has no download or print action */}
        <div className="flex items-center justify-between gap-3 bg-secondary px-4 py-3 text-white">
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate text-sm font-medium">{name}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 text-[11px] text-white/70 sm:inline-flex">
              <Lock className="h-3.5 w-3.5" /> View only · downloads disabled
            </span>
            <button
              onClick={onClose}
              aria-label="Close document"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Page */}
        <div className="flex-1 overflow-y-auto bg-muted p-4 sm:p-6">
          <div className="relative mx-auto max-w-2xl select-none overflow-hidden rounded-lg bg-card p-8 shadow-lg sm:p-12">
            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]" aria-hidden="true">
              <div className="absolute -inset-1/4 flex flex-wrap gap-x-10 gap-y-8 rotate-[-24deg]">
                {Array.from({ length: 40 }).map((_, i) => (
                  <span key={i} className="whitespace-nowrap text-xs font-semibold">
                    Creovixa · {viewer}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <Logo />
                <span className="text-xs text-muted-foreground">Confidential training material</span>
              </div>
              <h2 className="font-display text-xl font-bold tracking-tight">{name.replace(/\.[a-z]+$/i, "")}</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                This document is provided exclusively to enrolled Creovixa learners for the purpose of
                completing certified interpreter training. It may be viewed within the platform but may
                not be downloaded, printed, copied, or redistributed.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Interpreters are expected to review each section in full before attempting the linked
                assessment. Key competencies covered include accurate meaning transfer, register and
                tone preservation, code of ethics adherence, confidentiality, and role boundaries across
                medical, legal, and community settings.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Access to this material is tied to your account and every view is watermarked with your
                identity. Unauthorized sharing is a violation of the Creovixa learner agreement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
