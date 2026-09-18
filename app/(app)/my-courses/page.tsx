"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { PageHeader, Button } from "@/components/ui"
import { CourseCard } from "@/components/course-card"
import { courses } from "@/lib/data"
import { cn } from "@/lib/utils"

type Tab = "all" | "in_progress" | "completed"

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "All enrolled" },
  { id: "in_progress", label: "In progress" },
  { id: "completed", label: "Completed" },
]

export default function MyCoursesPage() {
  const [tab, setTab] = useState<Tab>("all")

  // Enrolled = any course with progress recorded (demo: progress >= 0 but treat >0 as enrolled)
  const enrolled = courses.filter((c) => c.progress > 0)
  const filtered = enrolled.filter((c) => {
    if (tab === "in_progress") return c.progress > 0 && c.progress < 100
    if (tab === "completed") return c.progress === 100
    return true
  })

  return (
    <div>
      <PageHeader
        title="My courses"
        subtitle="Track and continue the courses you're enrolled in."
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
          {filtered.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      )}
    </div>
  )
}
