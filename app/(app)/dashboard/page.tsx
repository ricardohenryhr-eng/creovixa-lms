import Link from "next/link"
import { BookOpen, GraduationCap, Award, TrendingUp, ArrowRight, Clock, CheckCircle2 } from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Progress } from "@/components/ui"
import { getCurrentProfile, getEnrollmentsForUser } from "@/lib/queries"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const profile = await getCurrentProfile()
  const enrollments = profile ? await getEnrollmentsForUser(profile.id) : []

  const firstName = profile?.first_name || profile?.full_name || "there"
  const inProgress = enrollments.filter((e) => e.progress > 0 && !e.completed)
  const completed = enrollments.filter((e) => e.completed)
  const notStarted = enrollments.filter((e) => e.progress === 0 && !e.completed)
  const certificates = enrollments.filter((e) => e.certificate_issued).length
  const overall = enrollments.length
    ? Math.round(enrollments.reduce((s, e) => s + e.progress, 0) / enrollments.length)
    : 0

  return (
    <div>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        subtitle="Your assigned training, progress, and certificates."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Assigned courses" value={enrollments.length} icon={<BookOpen className="h-5 w-5" />} tone="blue" />
        <StatCard label="In progress" value={inProgress.length} icon={<GraduationCap className="h-5 w-5" />} tone="orange" />
        <StatCard label="Completed" value={completed.length} icon={<CheckCircle2 className="h-5 w-5" />} tone="green" />
        <StatCard label="Certificates" value={certificates} icon={<Award className="h-5 w-5" />} tone="amber" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Assigned courses</h2>
              <Link href="/my-courses" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                All courses <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {enrollments.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border py-12 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium">No courses assigned yet</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your administrator will assign training to your account. Assignments appear here instantly.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {enrollments.map((e) => {
                  const c = e.course
                  return (
                    <Link
                      key={e.id}
                      href={c ? `/courses/${c.slug}` : "/my-courses"}
                      className="flex items-center gap-4 rounded-lg border border-border p-4 transition hover:border-primary hover:shadow-sm"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                        <BookOpen className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-medium">{c?.title ?? "Course"}</p>
                          {e.completed && <Badge tone="green">Completed</Badge>}
                          {e.certificate_issued && <Badge tone="amber">Certificate</Badge>}
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <Progress value={e.progress} className="max-w-xs" />
                          <span className="whitespace-nowrap text-xs text-muted-foreground">{e.progress}%</span>
                        </div>
                        {c && (
                          <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge tone="muted">{c.category}</Badge>
                            <span className="inline-flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {c.hours}h · {c.lessons_count} lessons
                            </span>
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </Link>
                  )
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-1">
          <Card className="p-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h2 className="font-display text-lg font-semibold">Overall progress</h2>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <span className="font-display text-4xl font-bold tracking-tight">{overall}%</span>
              <span className="pb-1 text-sm text-muted-foreground">across {enrollments.length} course{enrollments.length === 1 ? "" : "s"}</span>
            </div>
            <Progress value={overall} className="mt-3" />
            <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-muted/50 p-2">
                <dt className="text-xs text-muted-foreground">Not started</dt>
                <dd className="font-display text-lg font-semibold">{notStarted.length}</dd>
              </div>
              <div className="rounded-lg bg-muted/50 p-2">
                <dt className="text-xs text-muted-foreground">In progress</dt>
                <dd className="font-display text-lg font-semibold">{inProgress.length}</dd>
              </div>
              <div className="rounded-lg bg-muted/50 p-2">
                <dt className="text-xs text-muted-foreground">Completed</dt>
                <dd className="font-display text-lg font-semibold">{completed.length}</dd>
              </div>
            </dl>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-lg font-semibold">Upcoming training</h2>
            {notStarted.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">You&apos;ve started everything assigned to you. Great work.</p>
            ) : (
              <ul className="mt-3 flex flex-col gap-2">
                {notStarted.slice(0, 4).map((e) => (
                  <li key={e.id} className="flex items-center gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="truncate">{e.course?.title ?? "Course"}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
