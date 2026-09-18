"use client"

import { useMemo, useState } from "react"
import { BookOpen, Layers, Users, Star, Search, Lock } from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Button, Input } from "@/components/ui"
import { courses, categories } from "@/lib/data"
import { categoryMeta } from "@/components/course-visual"
import { cn } from "@/lib/utils"

export default function CourseManagementPage() {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("All")
  const [published, setPublished] = useState<Record<string, boolean>>(
    () => Object.fromEntries(courses.map((c) => [c.id, true])),
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return [...courses]
      .sort((a, b) => a.order - b.order)
      .filter((c) => {
        const matchesCat = category === "All" || c.category === category
        const matchesQuery = !q || c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
        return matchesCat && matchesQuery
      })
  }, [query, category])

  const totalEnrolled = courses.reduce((s, c) => s + c.enrolled, 0)
  const foundationCount = courses.filter((c) => c.foundation).length
  const avgRating = (courses.reduce((s, c) => s + c.rating, 0) / courses.length).toFixed(1)
  const liveCount = Object.values(published).filter(Boolean).length

  return (
    <div>
      <PageHeader
        title="Course management"
        subtitle="Manage the certification catalog, sequence, and publication status."
        action={<Button><BookOpen className="h-4 w-4" /> New course</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Courses" value={courses.length} icon={<BookOpen className="h-5 w-5" />} tone="orange" hint={`${liveCount} published`} />
        <StatCard label="Foundation" value={foundationCount} icon={<Layers className="h-5 w-5" />} tone="blue" hint="Required first" />
        <StatCard label="Total enrolled" value={totalEnrolled.toLocaleString()} icon={<Users className="h-5 w-5" />} tone="green" hint="Across catalog" />
        <StatCard label="Avg. rating" value={avgRating} icon={<Star className="h-5 w-5" />} tone="amber" hint="Learner feedback" />
      </div>

      <div className="mb-5 mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search courses or instructors…" className="pl-9" aria-label="Search courses" />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition",
                category === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">Lessons</th>
                <th className="px-4 py-3 font-semibold">Hours</th>
                <th className="px-4 py-3 font-semibold">Enrolled</th>
                <th className="px-4 py-3 font-semibold">Certificate</th>
                <th className="px-4 py-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => {
                const { color } = categoryMeta(c.category)
                const isLive = published[c.id]
                return (
                  <tr key={c.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 text-muted-foreground">{c.order}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="h-8 w-8 shrink-0 rounded-md" style={{ backgroundColor: color }} aria-hidden="true" />
                        <div className="min-w-0">
                          <p className="truncate font-medium">{c.title}</p>
                          <p className="truncate text-xs text-muted-foreground">{c.category} · {c.instructor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><Badge tone="muted">{c.level}</Badge></td>
                    <td className="px-4 py-3 text-muted-foreground">{c.lessonsCount}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.hours}h</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.enrolled.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      {c.cert.adminReleaseOnly ? (
                        <Badge tone="red"><Lock className="h-3 w-3" /> Restricted</Badge>
                      ) : c.cert.requiresLessonCompletion ? (
                        <Badge tone="blue">Standard</Badge>
                      ) : (
                        <Badge tone="amber">Quiz only</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        role="switch"
                        aria-checked={isLive}
                        aria-label={`${isLive ? "Unpublish" : "Publish"} ${c.title}`}
                        onClick={() => setPublished((p) => ({ ...p, [c.id]: !p[c.id] }))}
                        className={cn("relative ml-auto inline-flex h-6 w-11 shrink-0 rounded-full transition", isLive ? "bg-primary" : "bg-muted-foreground/30")}
                      >
                        <span className={cn("absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all", isLive ? "left-[22px]" : "left-0.5")} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No courses match your filters.</p>}
      </Card>
    </div>
  )
}
