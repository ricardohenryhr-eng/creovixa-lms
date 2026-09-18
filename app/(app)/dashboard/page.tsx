"use client"

import Link from "next/link"
import {
  BookOpen,
  GraduationCap,
  Award,
  TrendingUp,
  Users,
  FileCheck2,
  ArrowRight,
  PlayCircle,
  Activity,
} from "lucide-react"
import { Card, Badge, Progress, Button, StatCard } from "@/components/ui"
import { CourseVisual } from "@/components/course-visual"
import { useAuth } from "@/lib/auth"
import { courses, certificates, teamUsers, recentActivity, roleLabels } from "@/lib/data"

export default function DashboardPage() {
  const { user } = useAuth()
  if (!user) return null

  const isAdmin = user.role === "admin" || user.role === "super_admin"
  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100)
  const completed = courses.filter((c) => c.progress === 100)

  const stats = isAdmin
    ? [
        { label: "Active users", value: teamUsers.filter((u) => u.status === "active").length, icon: <Users className="h-5 w-5" />, tone: "blue" as const, hint: `${teamUsers.length} total accounts` },
        { label: "Total courses", value: courses.length, icon: <BookOpen className="h-5 w-5" />, tone: "orange" as const, hint: "Across 8 categories" },
        { label: "Certificates issued", value: certificates.length + 38, icon: <Award className="h-5 w-5" />, tone: "green" as const, hint: "This year" },
        { label: "Avg. completion", value: "74%", icon: <TrendingUp className="h-5 w-5" />, tone: "amber" as const, hint: "+6% vs last month" },
      ]
    : [
        { label: "Enrolled courses", value: user.coursesEnrolled, icon: <BookOpen className="h-5 w-5" />, tone: "orange" as const, hint: `${inProgress.length} in progress` },
        { label: "Completed", value: user.coursesCompleted, icon: <GraduationCap className="h-5 w-5" />, tone: "green" as const, hint: "Keep it up" },
        { label: "Certificates", value: user.certificates, icon: <Award className="h-5 w-5" />, tone: "blue" as const, hint: "Verifiable" },
        { label: "Overall progress", value: `${user.progress}%`, icon: <TrendingUp className="h-5 w-5" />, tone: "amber" as const, hint: "Across all courses" },
      ]

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Badge tone="orange">{roleLabels[user.role]}</Badge>
        </div>
        <h1 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {isAdmin
            ? "Here's how your organization's training is tracking."
            : "Pick up where you left off and keep your certifications current."}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} tone={s.tone} hint={s.hint} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Continue learning / org overview */}
        <div className="lg:col-span-2">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">
                {isAdmin ? "Courses overview" : "Continue learning"}
              </h2>
              <Link href="/my-courses" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {(isAdmin ? courses.slice(0, 4) : inProgress.slice(0, 4)).map((c) => (
                <Link
                  key={c.id}
                  href={`/courses/${c.slug}`}
                  className="group flex items-center gap-4 rounded-lg border border-border p-3 transition hover:border-primary hover:bg-accent/30"
                >
                  <CourseVisual category={c.category} className="h-14 w-14 shrink-0 rounded-lg" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{c.title}</p>
                    <div className="mt-2 flex items-center gap-3">
                      <Progress value={c.progress} className="max-w-[160px]" />
                      <span className="text-xs text-muted-foreground">{c.progress}%</span>
                    </div>
                  </div>
                  <PlayCircle className="h-5 w-5 shrink-0 text-muted-foreground transition group-hover:text-primary" />
                </Link>
              ))}
            </div>
          </Card>

          {!isAdmin && completed.length > 0 && (
            <Card className="mt-6 p-5">
              <h2 className="mb-4 font-display text-lg font-semibold">Completed courses</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {completed.map((c) => (
                  <div key={c.id} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <CourseVisual category={c.category} className="h-10 w-10 shrink-0 rounded-lg" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{c.title}</p>
                      <Badge tone="green" className="mt-1"><FileCheck2 className="h-3 w-3" /> Completed</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Recent activity */}
        <div>
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold">Recent activity</h2>
            </div>
            <ol className="relative flex flex-col gap-5 border-l border-border pl-5">
              {recentActivity.map((a) => (
                <li key={a.id} className="relative">
                  <span className="absolute -left-[26px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
                  <p className="text-sm font-medium leading-snug">{a.text}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.course} · {a.time}</p>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="mt-6 p-5">
            <h2 className="mb-2 font-display text-lg font-semibold">Next up</h2>
            <p className="text-sm text-muted-foreground">
              {isAdmin ? "Review pending certificate approvals and new user requests." : "Complete the Ethics & Standards knowledge check to stay compliant."}
            </p>
            <Link href={isAdmin ? "/admin/reports" : "/assessments"} className="mt-4 block">
              <Button variant="outline" className="w-full">
                {isAdmin ? "Open reports" : "Go to assessments"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
