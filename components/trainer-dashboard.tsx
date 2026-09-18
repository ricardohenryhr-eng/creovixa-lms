"use client"

import Link from "next/link"
import {
  Users,
  BookOpen,
  Award,
  ClipboardCheck,
  TrendingUp,
  ArrowRight,
  Activity,
  GraduationCap,
} from "lucide-react"
import { Card, Badge, Progress, Button, StatCard, Avatar } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { teamUsers, courses, assessments, certificates, recentActivity, roleLabels, buildQuizAttempts } from "@/lib/data"
import { effectiveStatus, statusLabels, statusTones } from "@/lib/access"

/**
 * Teaching-focused dashboard for the Trainer role: learner progress, quiz
 * performance, and delivery stats — distinct from the learner and admin views.
 */
export function TrainerDashboard() {
  const { user } = useAuth()
  if (!user) return null

  const learners = teamUsers.filter((u) => u.role === "interpreter" || u.role === "student")
  const attempts = buildQuizAttempts()
  const avgScore = attempts.length
    ? Math.round(attempts.reduce((sum, a) => sum + a.score, 0) / attempts.length)
    : 0
  const passRate = attempts.length
    ? Math.round((attempts.filter((a) => a.passed).length / attempts.length) * 100)
    : 0

  const stats = [
    {
      label: "Learners",
      value: learners.length,
      icon: <Users className="h-5 w-5" />,
      tone: "blue" as const,
      hint: `${learners.filter((l) => effectiveStatus(l) === "active").length} active`,
    },
    {
      label: "Courses delivered",
      value: courses.length,
      icon: <BookOpen className="h-5 w-5" />,
      tone: "orange" as const,
      hint: "Foundation + advanced",
    },
    {
      label: "Quiz pass rate",
      value: `${passRate}%`,
      icon: <ClipboardCheck className="h-5 w-5" />,
      tone: "green" as const,
      hint: `Avg score ${avgScore}%`,
    },
    {
      label: "Certificates issued",
      value: certificates.length + 38,
      icon: <Award className="h-5 w-5" />,
      tone: "amber" as const,
      hint: "This year",
    },
  ]

  const topLearners = [...learners].sort((a, b) => b.progress - a.progress).slice(0, 5)

  return (
    <div>
      <div className="mb-6">
        <Badge tone="orange">{roleLabels[user.role]}</Badge>
        <h1 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back, {user.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Monitor learner progress and quiz performance across your training programs.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} tone={s.tone} hint={s.hint} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Learner progress</h2>
              <Link
                href="/admin/progress"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="flex flex-col divide-y divide-border">
              {topLearners.map((u) => (
                <div key={u.id} className="flex items-center gap-3 py-3">
                  <Avatar name={u.name} color={u.avatarColor} size={38} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{u.name}</p>
                    <div className="mt-1.5 flex items-center gap-3">
                      <Progress value={u.progress} className="max-w-[180px]" />
                      <span className="text-xs text-muted-foreground">{u.progress}%</span>
                    </div>
                  </div>
                  <Badge tone={statusTones[effectiveStatus(u)]}>{statusLabels[effectiveStatus(u)]}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Quiz performance</h2>
              <Link
                href="/admin/quiz-results"
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Full results <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {assessments.slice(0, 4).map((a) => {
                const rows = attempts.filter((r) => r.quiz === a.title)
                const rate = rows.length ? Math.round((rows.filter((r) => r.passed).length / rows.length) * 100) : 0
                return (
                  <div key={a.id} className="rounded-lg border border-border p-3">
                    <p className="truncate text-sm font-medium">{a.title}</p>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {rows.length ? `${rows.length} attempts` : "No attempts"}
                      </span>
                      <Badge tone={rows.length ? (rate >= 70 ? "green" : "amber") : "muted"}>
                        {rows.length ? `${rate}% pass` : "—"}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
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
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {a.course} · {a.time}
                  </p>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="p-5">
            <div className="mb-2 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold">Manage training</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              Review course content and download completion reports for your cohorts.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/admin/courses">
                <Button variant="outline" className="w-full justify-between">
                  Course management <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button variant="outline" className="w-full justify-between">
                  <span className="inline-flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Reports
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
