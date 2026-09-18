import {
  Stethoscope,
  Scale,
  Plane,
  Landmark,
  Headphones,
  Phone,
  Video,
  ShieldCheck,
  BookOpen,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const map: Record<string, { icon: LucideIcon; color: string }> = {
  Medical: { icon: Stethoscope, color: "#0ea5e9" },
  Legal: { icon: Scale, color: "#8b5cf6" },
  Immigration: { icon: Plane, color: "#14b8a6" },
  Government: { icon: Landmark, color: "#0f172a" },
  "Customer Service": { icon: Headphones, color: "#f59e0b" },
  "Remote Interpreting": { icon: Video, color: "#ec4899" },
  Compliance: { icon: ShieldCheck, color: "#16a34a" },
  Ethics: { icon: BookOpen, color: "#f97316" },
}

export function categoryMeta(category: string) {
  return map[category] ?? { icon: BookOpen, color: "#f97316" }
}

export function CourseVisual({ category, className }: { category: string; className?: string }) {
  const { icon: Icon, color } = categoryMeta(category)
  return (
    <div
      className={cn("relative flex items-center justify-center overflow-hidden", className)}
      style={{ backgroundColor: color }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)",
          backgroundSize: "22px 22px, 30px 30px",
        }}
        aria-hidden="true"
      />
      <Icon className="relative h-10 w-10 text-white" strokeWidth={1.75} aria-hidden="true" />
    </div>
  )
}

export { Phone }
