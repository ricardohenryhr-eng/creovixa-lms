import Link from "next/link"
import { Clock, PlayCircle, Star } from "lucide-react"
import { Badge, Progress } from "@/components/ui"
import { CourseVisual } from "@/components/course-visual"
import type { Course } from "@/lib/data"

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <CourseVisual category={course.category} className="h-32 w-full" />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
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

        {course.progress > 0 && (
          <div className="mt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="font-medium text-foreground">{course.progress === 100 ? "Completed" : "In progress"}</span>
              <span className="text-muted-foreground">{course.progress}%</span>
            </div>
            <Progress value={course.progress} tone={course.progress === 100 ? "success" : "primary"} />
          </div>
        )}
      </div>
    </Link>
  )
}
