"use client"

import { ShieldAlert, CheckCircle2, Clock, Lock } from "lucide-react"
import { Card, Badge, Button, Avatar } from "@/components/ui"
import { certificates } from "@/lib/data"
import { useProgress } from "@/lib/progress"
import { orderedCourses, eligibleDate } from "@/lib/curriculum"
import { formatDate } from "@/lib/utils"

/**
 * Admin control for protected/restricted certificates (the 40-Hour Medical
 * Interpreter certificate). These are never released automatically — an admin
 * releases them here, and only after the required waiting period.
 */
export function AdminCertApprovals() {
  const { state, releaseCourse, revokeCourseRelease } = useProgress()
  const restricted = orderedCourses.filter((c) => c.cert.adminReleaseOnly)

  // Build approval rows from historical certificate holders per restricted course.
  const rows = restricted.flatMap((course) => {
    const holders = certificates.filter((c) => c.certId.includes(`-${course.certPrefix}-`))
    return holders.map((h) => {
      const completedAt = state.courseCompletedAt[course.id] ?? h.issuedAt
      const availableOn = eligibleDate(completedAt, course.cert.releaseAfterMonths ?? 6)
      const waited = availableOn ? Date.now() >= availableOn.getTime() : false
      const released = state.releasedCourses.includes(course.id)
      return { course, holder: h, availableOn, waited, released }
    })
  })

  return (
    <Card className="p-5">
      <div className="mb-1 flex items-center gap-2">
        <ShieldAlert className="h-5 w-5 text-primary" />
        <h2 className="font-display text-lg font-semibold">Medical certificate approvals</h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        The Medical Interpreter certificate is protected. Release it only after the {restricted[0]?.cert.releaseAfterMonths ?? 6}-month
        waiting period. Interpreters cannot download it automatically.
      </p>

      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
          No pending certificate approvals.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {rows.map(({ course, holder, availableOn, waited, released }) => (
            <div key={`${course.id}-${holder.id}`} className="flex flex-wrap items-center gap-3 py-3">
              <Avatar name={holder.recipient} size={38} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{holder.recipient}</p>
                <p className="truncate text-xs text-muted-foreground">{course.title} · {holder.certId}</p>
              </div>

              {released ? (
                <Badge tone="green"><CheckCircle2 className="h-3 w-3" /> Released</Badge>
              ) : waited ? (
                <Badge tone="amber"><Clock className="h-3 w-3" /> Eligible</Badge>
              ) : (
                <Badge tone="muted"><Lock className="h-3 w-3" /> Waiting period</Badge>
              )}

              <span className="hidden text-xs text-muted-foreground sm:block">
                Eligible {availableOn ? formatDate(availableOn.toISOString()) : "—"}
              </span>

              {released ? (
                <Button size="sm" variant="outline" onClick={() => revokeCourseRelease(course.id)}>
                  Revoke
                </Button>
              ) : (
                <Button size="sm" disabled={!waited} onClick={() => releaseCourse(course.id)}>
                  {waited ? "Release certificate" : "Not yet eligible"}
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
