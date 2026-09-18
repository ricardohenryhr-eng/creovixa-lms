import { cn } from "@/lib/utils"

/**
 * Primary Creovixa lockup (globe + wordmark) used in headers, the sidebar,
 * and auth screens. On dark surfaces pass `inverted` to sit the full-color
 * logo on a clean white chip so it stays legible.
 */
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        inverted && "rounded-md bg-white px-2.5 py-1.5 shadow-sm",
        className,
      )}
    >
      <img
        src="/creovixa-logo-full.png"
        alt="Creovixa Language Services"
        className="h-7 w-auto"
      />
      <span className="ml-2.5 text-lg font-bold leading-none tracking-tight">
        <span className="text-secondary">Creovixa</span>
        <span className="text-primary"> LMS</span>
      </span>
    </span>
  )
}

/** Compact globe mark only, for tight spaces like avatars or favicons-in-UI. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/creovixa-mark.png"
      alt="Creovixa"
      className={cn("h-8 w-auto", className)}
    />
  )
}

// Official full brand lockup used on certificates and formal documents.
export function BrandLogo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        inverted && "rounded-lg bg-white px-3 py-2 shadow-sm",
        className,
      )}
    >
      <img
        src="/creovixa-logo-full.png"
        alt="Creovixa Language Services"
        className="h-12 w-auto"
      />
    </span>
  )
}
