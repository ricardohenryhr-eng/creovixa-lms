import { cn } from "@/lib/utils"

const mark = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
    <path
      d="M12 3c-4.97 0-9 3.58-9 8 0 2.2 1.02 4.18 2.66 5.6L5 21l4.2-2.03c.9.2 1.83.32 2.8.32 4.97 0 9-3.58 9-8s-4.03-8.29-9-8.29Z"
      fill="currentColor"
    />
  </svg>
)

export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display font-extrabold tracking-tight", className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">{mark}</span>
      <span className={inverted ? "text-white" : "text-secondary"}>
        Creovixa<span className="text-primary"> LMS</span>
      </span>
    </span>
  )
}

// Official full brand lockup used on certificates and formal documents.
export function BrandLogo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        {mark}
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-lg font-extrabold tracking-tight", inverted ? "text-white" : "text-secondary")}>
          Creovixa
        </span>
        <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">Language Services</span>
      </span>
    </span>
  )
}
