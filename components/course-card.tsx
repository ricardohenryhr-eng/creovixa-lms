import Link from "next/link"
import { Clock, PlayCircle, Star, Lock, CheckCircle2 } from "lucide-react"
import { Badge, Progress } from "@/components/ui"
import { CourseVisual } from "@/components/course-visual"
import type { Course } from "@/lib/data"

export function CourseCard({
  course,
  locked = false,
  progressPct,
  completed = false,
}: {
  course: Course
  locked?: boolean
  progressPct?: number
  completed?: boolean
}) {
  const pct = progressPct ?? course.progress
  const inner = (
    <>
      <div className="relative">
        <CourseVisual category={course.category} className="h-32 w-full" />
        {course.foundation && (
          <span className="absolute left-3 top-3">
            <Badge tone="amber">Foundation · Step {course.order}</Badge>
          </span>
        )}
        {locked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-secondary/70 text-white">
            <Lock className="h-6 w-6" />
            <span className="px-4 text-center text-xs font-medium">Complete the previous course to unlock</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="muted">{course.category}</Badge>
          <Badge tone="orange">{course.level}</Badge>
        </div>
        <h3 className="mt-3 font-display text-base font-semibold leading-snug group-hover:text-primary">
          {course.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{course.description}</p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><PlayCircle className="h-3.5 w-3.5" /> {course.lessonsCount} lessons</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.hours}h</span>
          <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-primary text-primary" /> {course.rating}</span>
        </div>

        {(completed || pct > 0) && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 font-medium text-foreground">
                {completed && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                {completed ? "Completed" : "In progress"}
              </span>
              <span className="text-muted-foreground">{pct}%</span>
            </div>
            <Progress value={pct} tone={completed ? "success" : "primary"} />
          </div>
        )}
      </div>
    </>
  )

  const base = "group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition"

  if (locked) {
    return (
      <div className={`${base} cursor-not-allowed opacity-80`} aria-disabled="true">
        {inner}
      </div>
    )
  }

  return (
    <Link href={`/courses/${course.slug}`} className={`${base} hover:-translate-y-0.5 hover:shadow-md`}>
      {inner}
    </Link>
  )
}
