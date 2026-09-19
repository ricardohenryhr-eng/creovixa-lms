"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Award, Download, X, ShieldCheck, ExternalLink, Lock, Clock } from "lucide-react"
import { PageHeader, Card, Badge, Button } from "@/components/ui"
import { CertificatePreview } from "@/components/certificate-preview"
import type { Certificate, Course } from "@/lib/data"
import { useAuth } from "@/lib/auth"
import { useProgress } from "@/lib/progress"
import {
  orderedCourses,
  certificateAccess,
  certIdFor,
  staticCertFor,
  courseAssessment,
} from "@/lib/curriculum"
import { formatDate } from "@/lib/utils"

function addMonths(iso: string, months: number) {
  const d = new Date(iso)
  d.setMonth(d.getMonth() + months)
  return d.toISOString()
}

export default function CertificatesPage() {
  const { user } = useAuth()
  const recipient = user?.name ?? "Creovixa Learner"
  const { state, ensureCertCode } = useProgress()
  const [active, setActive] = useState<Certificate | null>(null)

  const rows = useMemo(() => {
    return orderedCourses.map((course) => {
      const access = certificateAccess(course, state, recipient)
      const stat = staticCertFor(course, recipient)
      const issuedAt = stat?.issuedAt ?? state.courseCompletedAt[course.id] ?? new Date().toISOString()
      const expiresAt =
        course.cert.validityMonths === null ? "" : stat?.expiresAt ?? addMonths(issuedAt, course.cert.validityMonths)
      const expired = expiresAt ? Date.now() > new Date(expiresAt).getTime() : false
      const assessmentId = courseAssessment(course.id)?.id
      const score = stat?.score ?? (assessmentId ? state.passedAssessments[assessmentId] ?? 100 : 100)
      const certId = stat?.certId ?? certIdFor(course, state, recipient)

      // A protected certificate whose access code has been disabled by the
      // Super Admin cannot be downloaded even after it was released.
      const codeDisabled = course.cert.restricted && (state.certCodes[certId]?.disabled ?? false)
      const finalAccess =
        codeDisabled && access.accessible
          ? { ...access, accessible: false, reason: "Access disabled by administrator" }
          : access

      const cert: Certificate = {
        id: course.id,
        certId,
        courseTitle: course.title,
        recipient,
        issuedAt,
        expiresAt,
        score,
        status: expired ? "expired" : "valid",
        variant: course.certPrefix === "MED" ? "medical" : "standard",
        hours: course.hours,
      }
      return { course, access: finalAccess, cert, expired }
    })
  }, [state, recipient])

  // A protected certificate's secure access code is generated automatically the
  // moment its requirements are met. The learner never sees the code itself.
  useEffect(() => {
    rows.forEach(({ course, access, cert }) => {
      if (course.cert.restricted && access.earned) {
        ensureCertCode(cert.certId, course.id, recipient)
      }
    })
  }, [rows, recipient, ensureCertCode])

  const earnedCount = rows.filter((r) => r.access.earned).length

  return (
    <div>
      <PageHeader
        title="Certificates"
        subtitle={`${earnedCount} earned · each certificate carries a unique verifiable ID and QR code.`}
        action={
          <Link href="/verify">
            <Button variant="outline"><ShieldCheck className="h-4 w-4" /> Verify a certificate</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map(({ course, access, cert, expired }) => (
          <CertCard
            key={course.id}
            course={course}
            cert={cert}
            expired={expired}
            earned={access.earned}
            accessible={access.accessible}
            reason={access.reason}
            availableOn={access.availableOn}
            onView={() => setActive(cert)}
          />
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setActive(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between no-print">
              <div className="flex gap-2">
                <Button size="sm" onClick={() => window.print()}>
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
                <Link href={`/verify/${active.certId}`}>
                  <Button size="sm" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    <ExternalLink className="h-4 w-4" /> Verify
                  </Button>
                </Link>
              </div>
              <button onClick={() => setActive(null)} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>
            <CertificatePreview cert={active} />
          </div>
        </div>
      )}
    </div>
  )
}

function CertCard({
  course,
  cert,
  expired,
  earned,
  accessible,
  reason,
  availableOn,
  onView,
}: {
  course: Course
  cert: Certificate
  expired: boolean
  earned: boolean
  accessible: boolean
  reason?: string
  availableOn?: Date
  onView: () => void
}) {
  const restricted = course.cert.restricted

  const statusBadge = !earned ? (
    <Badge tone="muted"><Lock className="h-3 w-3" /> Locked</Badge>
  ) : !accessible ? (
    <Badge tone="amber"><Clock className="h-3 w-3" /> Awaiting release</Badge>
  ) : expired ? (
    <Badge tone="red">Expired</Badge>
  ) : (
    <Badge tone="green">Valid</Badge>
  )

  return (
    <Card className="flex flex-col p-5">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
          <Award className="h-5 w-5" />
        </span>
        {statusBadge}
      </div>
      <h3 className="mt-4 font-display font-semibold leading-snug">{course.title}</h3>

      {earned ? (
        <>
          <p className="mt-1 font-mono text-xs text-muted-foreground">{cert.certId}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>Issued {formatDate(cert.issuedAt)}</span>
            <span>{cert.expiresAt ? `Expires ${formatDate(cert.expiresAt)}` : "No expiration"}</span>
            <span>Score {cert.score}%</span>
          </div>
        </>
      ) : (
        <p className="mt-1 flex-1 text-sm text-muted-foreground">
          Complete this course{courseAssessment(course.id) ? " and pass its final quiz" : ""} to earn this certificate.
        </p>
      )}

      {restricted && (
        <p className="mt-3 rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
          Protected certificate · released by an administrator{course.cert.releaseAfterMonths ? ` ${course.cert.releaseAfterMonths} months after completion` : ""}.
        </p>
      )}

      <div className="mt-4">
        {accessible ? (
          <Button variant="outline" className="w-full" onClick={onView}>
            View &amp; download
          </Button>
        ) : earned ? (
          <>
            <Button className="w-full" disabled>
              <Lock className="h-4 w-4" /> {reason ?? "Restricted"}
            </Button>
            {availableOn && (
              <p className="mt-2 text-center text-xs text-muted-foreground">Eligible on {formatDate(availableOn.toISOString())}</p>
            )}
          </>
        ) : (
          <Link href={`/courses/${course.slug}`}>
            <Button variant="outline" className="w-full">Go to course</Button>
          </Link>
        )}
      </div>
    </Card>
  )
}
