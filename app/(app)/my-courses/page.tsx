"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { PageHeader, Button } from "@/components/ui"
import { CourseCard } from "@/components/course-card"
import { useProgress } from "@/lib/progress"
import { orderedCourses, courseUnlocked, courseCompleted, lessonProgress } from "@/lib/curriculum"
import { cn } from "@/lib/utils"

type Tab = "all" | "in_progress" | "completed"

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "All courses" },
  { id: "in_progress", label: "In progress" },
  { id: "completed", label: "Completed" },
]

export default function MyCoursesPage() {
  const [tab, setTab] = useState<Tab>("all")
  const { state } = useProgress()

  const rows = orderedCourses.map((c) => {
    const pct = lessonProgress(c, state).pct
    const completed = courseCompleted(c, state)
    const locked = !courseUnlocked(c, state)
    return { course: c, pct, completed, locked }
  })

  const filtered = rows.filter((r) => {
    if (tab === "in_progress") return !r.completed && r.pct > 0
    if (tab === "completed") return r.completed
    return true
  })

  return (
    <div>
      <PageHeader
        title="My courses"
        subtitle="Your certification path, in the order you must complete it."
        action={
          <Link href="/courses">
            <Button variant="outline">Browse catalog</Button>
          </Link>
        }
      />

      <div className="mb-6 inline-flex rounded-lg border border-border bg-card p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "rounded-md px-4 py-1.5 text-sm font-medium transition",
              tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">No courses in this view yet.</p>
          <Link href="/courses" className="mt-4 inline-block">
            <Button>Explore courses</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <CourseCard key={r.course.id} course={r.course} locked={r.locked} completed={r.completed} progressPct={r.pct} />
          ))}
        </div>
      )}
    </div>
  )
}
