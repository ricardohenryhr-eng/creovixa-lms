import { Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export function AdminPreviewBadge({ className, detail }: { className?: string; detail?: string }) {
  return (
    <div
      role="status"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
        className,
      )}
    >
      <Eye className="h-3.5 w-3.5" aria-hidden="true" />
      <span>Admin Preview Mode</span>
      <span className="font-normal text-muted-foreground">
        {detail ?? "Progression locks bypassed"}
      </span>
    </div>
  )
}
