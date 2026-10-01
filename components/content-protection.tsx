"use client"

import { useEffect, type ReactNode } from "react"
import { Lock, X, FileText, BookOpen, ImageIcon, CheckCircle2 } from "lucide-react"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

export type ViewerKind = "reading" | "lecture" | "image" | "pdf"

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
 * Protected document viewer modal. Renders course documents view-only:
 * no download or print controls, selection and right-click disabled, and a
 * per-viewer watermark overlaid on every page.
 */
export function ProtectedDocumentViewer({
  name,
  viewer,
  kind = "reading",
  reviewed = false,
  onReviewed,
  onClose,
}: {
  name: string
  viewer: string
  kind?: ViewerKind
  reviewed?: boolean
  onReviewed?: () => void
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
  const kindLabel = kind === "lecture" ? "Lecture notes" : kind === "image" ? "Illustrated material" : kind === "pdf" ? "Document" : "Reading"
  const KindIcon = kind === "image" ? ImageIcon : kind === "lecture" ? BookOpen : FileText

  function complete() {
    onReviewed?.()
    onClose()
  }

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
            <KindIcon className="h-4 w-4 shrink-0 text-primary" />
            <span className="truncate text-sm font-medium">{name}</span>
            <span className="hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/70 sm:inline">
              {kindLabel}
            </span>
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
              {kind === "image" && (
                <div className="mt-5 flex aspect-video w-full items-center justify-center rounded-lg border border-border bg-gradient-to-br from-secondary/90 to-primary/70 text-white">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <ImageIcon className="h-8 w-8 opacity-90" aria-hidden="true" />
                    <span className="text-xs font-medium uppercase tracking-wide text-white/80">
                      Protected illustration · view only
                    </span>
                  </div>
                </div>
              )}
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                This {kindLabel.toLowerCase()} is provided exclusively to enrolled Creovixa learners for the purpose of
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

        {/* Completion footer — consuming a lesson is how it gets marked complete */}
        {onReviewed && (
          <div className="flex items-center justify-between gap-3 bg-secondary px-4 py-3 text-white">
            <span className="inline-flex items-center gap-1.5 text-xs text-white/70">
              <Lock className="h-3.5 w-3.5" /> View only · downloads disabled
            </span>
            {reviewed ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4 text-success" /> Completed
              </span>
            ) : (
              <button
                onClick={complete}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                <CheckCircle2 className="h-4 w-4" /> Mark as reviewed &amp; continue
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
