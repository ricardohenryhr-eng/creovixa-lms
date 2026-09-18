"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { PageHeader, Input } from "@/components/ui"
import { CourseCard } from "@/components/course-card"
import { courses, categories } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function CoursesPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesCategory = category === "All" || c.category === category
      const q = query.trim().toLowerCase()
      const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div>
      <PageHeader title="Course catalog" subtitle="Browse every certification track available to your team." />

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

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">No courses match your search.</p>
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
