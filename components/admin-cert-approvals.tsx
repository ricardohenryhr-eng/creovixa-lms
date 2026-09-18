"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  Ban,
  Copy,
  Check,
  ScrollText,
} from "lucide-react"
import { Card, Badge, Button, Avatar } from "@/components/ui"
import { certificates } from "@/lib/data"
import { useAuth } from "@/lib/auth"
import { useProgress, type AuditAction } from "@/lib/progress"
import { orderedCourses, eligibleDate } from "@/lib/curriculum"
import { isCertificateController, CERT_CONTROLLER_EMAIL } from "@/lib/admin"
import { formatDate, formatDateTime } from "@/lib/utils"

/**
 * Admin control for protected/restricted certificates (the 40-Hour Medical
 * Interpreter certificate). Each earned certificate has a secure, auto-generated
 * access code stored here and hidden from the learner. Only the designated Super
 * Admin (Ricardo Henry) may view the code and release, revoke, regenerate, or
 * disable it — and only after the required waiting period. Every action is
 * written to the audit trail.
 */
export function AdminCertApprovals() {
  const { user } = useAuth()
  const controller = isCertificateController(user)
  const {
    state,
    ensureCertCode,
    regenerateCertCode,
    setCertCodeDisabled,
    releaseCourse,
    revokeCourseRelease,
  } = useProgress()

  const restricted = orderedCourses.filter((c) => c.cert.adminReleaseOnly)

  const rows = useMemo(() => {
    return restricted.flatMap((course) => {
      const holders = certificates.filter((c) => c.certId.includes(`-${course.certPrefix}-`))
      return holders.map((h) => {
        const completedAt = state.courseCompletedAt[course.id] ?? h.issuedAt
        const availableOn = eligibleDate(completedAt, course.cert.releaseAfterMonths ?? 6)
        const waited = availableOn ? Date.now() >= availableOn.getTime() : false
        const released = state.releasedCourses.includes(course.id)
        const codeRecord = state.certCodes[h.certId]
        return { course, holder: h, availableOn, waited, released, codeRecord }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, restricted.length])

  // Auto-generate an access code for every earned protected certificate.
  useEffect(() => {
    rows.forEach(({ course, holder, codeRecord }) => {
      if (!codeRecord) ensureCertCode(holder.certId, course.id, holder.recipient)
    })
  }, [rows, ensureCertCode])

  const waitingMonths = restricted[0]?.cert.releaseAfterMonths ?? 6

  return (
    <div className="flex flex-col gap-6">
      <Card className="p-5">
        <div className="mb-1 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-semibold">Medical certificate access codes</h2>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
          The 40-Hour Medical Interpreter certificate is protected. A unique access code is generated automatically on
          completion and kept hidden from the learner. Release it only after the {waitingMonths}-month waiting period.
        </p>

        {!controller && (
          <div className="mb-4 flex items-start gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <p className="text-muted-foreground">
              Access codes are visible and controllable only by the Super Administrator
              (<span className="font-medium text-foreground">{CERT_CONTROLLER_EMAIL}</span>). You can view request
              status but cannot reveal codes or release certificates.
            </p>
          </div>
        )}

        {rows.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            No protected certificates awaiting release.
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-border">
            {rows.map((row) => (
              <ApprovalRow
                key={`${row.course.id}-${row.holder.id}`}
                row={row}
                controller={controller}
                actor={user?.name ?? "Super Admin"}
                onRelease={() =>
                  releaseCourse(row.course.id, {
                    actor: user?.name ?? "Super Admin",
                    certId: row.holder.certId,
                    recipient: row.holder.recipient,
                  })
                }
                onRevoke={() =>
                  revokeCourseRelease(row.course.id, {
                    actor: user?.name ?? "Super Admin",
                    certId: row.holder.certId,
                    recipient: row.holder.recipient,
                  })
                }
                onRegenerate={() =>
                  regenerateCertCode({
                    actor: user?.name ?? "Super Admin",
                    certId: row.holder.certId,
                    recipient: row.holder.recipient,
                  })
                }
                onToggleDisabled={(disabled) =>
                  setCertCodeDisabled(
                    {
                      actor: user?.name ?? "Super Admin",
                      certId: row.holder.certId,
                      recipient: row.holder.recipient,
                    },
                    disabled,
                  )
                }
              />
            ))}
          </div>
        )}
      </Card>

      {controller && <AuditTrail entries={state.auditLog} />}
    </div>
  )
}

interface Row {
  course: (typeof orderedCourses)[number]
  holder: (typeof certificates)[number]
  availableOn: Date | null
  waited: boolean
  released: boolean
  codeRecord?: { code: string; disabled: boolean; generatedAt: string }
}

function ApprovalRow({
  row,
  controller,
  onRelease,
  onRevoke,
  onRegenerate,
  onToggleDisabled,
}: {
  row: Row
  controller: boolean
  actor: string
  onRelease: () => void
  onRevoke: () => void
  onRegenerate: () => void
  onToggleDisabled: (disabled: boolean) => void
}) {
  const { course, holder, availableOn, waited, released, codeRecord } = row
  const [reveal, setReveal] = useState(false)
  const [copied, setCopied] = useState(false)
  const disabled = codeRecord?.disabled ?? false

  function copy() {
    if (!codeRecord) return
    navigator.clipboard?.writeText(codeRecord.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const statusBadge = disabled ? (
    <Badge tone="red"><Ban className="h-3 w-3" /> Disabled</Badge>
  ) : released ? (
    <Badge tone="green"><CheckCircle2 className="h-3 w-3" /> Released</Badge>
  ) : waited ? (
    <Badge tone="amber"><Clock className="h-3 w-3" /> Eligible</Badge>
  ) : (
    <Badge tone="muted"><Lock className="h-3 w-3" /> Waiting period</Badge>
  )

  return (
    <div className="flex flex-col gap-3 py-4">
      <div className="flex flex-wrap items-center gap-3">
        <Avatar name={holder.recipient} size={38} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{holder.recipient}</p>
          <p className="truncate text-xs text-muted-foreground">
            {course.title} · {holder.certId}
          </p>
        </div>
        {statusBadge}
        <span className="hidden text-xs text-muted-foreground sm:block">
          Eligible {availableOn ? formatDate(availableOn.toISOString()) : "—"}
        </span>
      </div>

      {/* Secure access code — Super Admin only */}
      <div className="rounded-lg border border-border bg-muted/40 px-3 py-2.5">
        {controller ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Access code</span>
            <code className="rounded bg-background px-2 py-1 font-mono text-sm">
              {codeRecord ? (reveal ? codeRecord.code : "••••••••••••••••") : "Generating…"}
            </code>
            <button
              onClick={() => setReveal((r) => !r)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label={reveal ? "Hide code" : "Reveal code"}
            >
              {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <button
              onClick={copy}
              disabled={!codeRecord}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground disabled:opacity-40"
              aria-label="Copy code"
            >
              {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </button>
            {codeRecord && (
              <span className="ml-auto text-xs text-muted-foreground">Generated {formatDate(codeRecord.generatedAt)}</span>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            Access code hidden — Super Admin only
          </div>
        )}
      </div>

      {controller && (
        <div className="flex flex-wrap gap-2">
          {released ? (
            <Button size="sm" variant="outline" onClick={onRevoke}>
              Revoke release
            </Button>
          ) : (
            <Button size="sm" disabled={!waited || disabled} onClick={onRelease}>
              {disabled ? "Code disabled" : waited ? "Approve & release" : "Not yet eligible"}
            </Button>
          )}
          <Button size="sm" variant="outline" onClick={onRegenerate}>
            <RefreshCw className="h-3.5 w-3.5" /> Regenerate code
          </Button>
          <Button size="sm" variant="outline" onClick={() => onToggleDisabled(!disabled)}>
            <Ban className="h-3.5 w-3.5" /> {disabled ? "Enable code" : "Disable code"}
          </Button>
        </div>
      )}
    </div>
  )
}

const actionLabels: Record<AuditAction, string> = {
  generated: "Code generated",
  regenerated: "Code regenerated",
  released: "Certificate released",
  revoked: "Release revoked",
  disabled: "Code disabled",
  enabled: "Code enabled",
}

const actionTone: Record<AuditAction, "green" | "red" | "amber" | "muted"> = {
  generated: "muted",
  regenerated: "amber",
  released: "green",
  revoked: "red",
  disabled: "red",
  enabled: "green",
}

function AuditTrail({ entries }: { entries: ReturnType<typeof useProgress>["state"]["auditLog"] }) {
  return (
    <Card className="p-5">
      <div className="mb-1 flex items-center gap-2">
        <ScrollText className="h-5 w-5 text-primary" />
        <h2 className="font-display text-lg font-semibold">Certificate audit trail</h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Every access-code action is logged with the actor and timestamp. This record is append-only.
      </p>

      {entries.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
          No audit events yet.
        </p>
      ) : (
        <div className="flex flex-col divide-y divide-border">
          {entries.map((e) => (
            <div key={e.id} className="flex flex-wrap items-center gap-3 py-3 text-sm">
              <Badge tone={actionTone[e.action]}>{actionLabels[e.action]}</Badge>
              <span className="min-w-0 flex-1 truncate">
                <span className="font-medium">{e.recipient}</span>
                <span className="text-muted-foreground"> · {e.certId}</span>
              </span>
              <span className="text-xs text-muted-foreground">by {e.actor}</span>
              <span className="text-xs text-muted-foreground">{formatDateTime(e.at)}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
