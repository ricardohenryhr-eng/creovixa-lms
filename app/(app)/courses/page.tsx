"use client"

import { useMemo, useState } from "react"
import { Search, Info } from "lucide-react"
import { PageHeader, Input } from "@/components/ui"
import { CourseCard } from "@/components/course-card"
import { categories } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { coursesByTrack, courseUnlocked, courseCompleted, lessonProgress } from "@/lib/curriculum"
import { cn } from "@/lib/utils"

export default function CoursesPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const { state } = useProgress()

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase()
    return coursesByTrack
      .map((group) => ({
        ...group,
        courses: group.courses.filter((c) => {
          const matchesCategory = category === "All" || c.category === category
          const matchesQuery =
            !q ||
            c.title.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.category.toLowerCase().includes(q)
          return matchesCategory && matchesQuery
        }),
      }))
      .filter((group) => group.courses.length > 0)
  }, [query, category])

  return (
    <div>
      <PageHeader title="Course catalog" subtitle="Complete the certification tracks in order — foundations first." />

      <div className="mb-5 flex items-center gap-2 rounded-lg border border-border bg-accent/40 px-4 py-3 text-sm text-muted-foreground">
        <Info className="h-4 w-4 shrink-0 text-primary" />
        Courses unlock in sequence. Finish each course to unlock the next one.
      </div>

      <div className="relative mb-5 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses…"
          className="pl-9"
          aria-label="Search courses"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
              category === c
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:border-primary hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {sections.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">No courses match your search.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {sections.map((group) => (
            <section key={group.track}>
              <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-border pb-2">
                <h2 className="font-display text-lg font-bold tracking-tight">{group.label}</h2>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {group.courses.length} {group.courses.length === 1 ? "course" : "courses"}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.courses.map((c) => (
                  <CourseCard
                    key={c.id}
                    course={c}
                    locked={!courseUnlocked(c, state)}
                    completed={courseCompleted(c, state)}
                    progressPct={lessonProgress(c, state).pct}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
