"use client"

import { useCallback, useEffect, useState } from "react"

const KEY = "creovixa_progress_v2"
const EVENT = "creovixa-progress-change"

/**
 * A secure, auto-generated access code for a protected certificate. Generated
 * automatically when a learner meets all requirements, stored only in the admin
 * dashboard, never shown to the learner, and non-editable by learners. Only the
 * designated Super Admin can view, regenerate, or disable it.
 */
export interface CertCode {
  code: string
  certId: string
  courseId: string
  recipient: string
  generatedAt: string
  disabled: boolean
}

export type AuditAction =
  | "generated"
  | "regenerated"
  | "released"
  | "revoked"
  | "disabled"
  | "enabled"

/** An immutable record of every action taken on a protected certificate code. */
export interface AuditEntry {
  id: string
  at: string
  actor: string
  action: AuditAction
  certId: string
  recipient: string
  detail?: string
}

export interface ProgressState {
  /** courseId -> completed lesson ids */
  completedLessons: Record<string, string[]>
  /** assessmentId -> best score achieved */
  passedAssessments: Record<string, number>
  /** courseId -> ISO date the course first met its completion requirements */
  courseCompletedAt: Record<string, string>
  /** courseIds whose restricted certificate an admin has released */
  releasedCourses: string[]
  /** certId -> secure access code record (admin-only) */
  certCodes: Record<string, CertCode>
  /** append-only audit trail of certificate-code actions */
  auditLog: AuditEntry[]
}

const empty: ProgressState = {
  completedLessons: {},
  passedAssessments: {},
  courseCompletedAt: {},
  releasedCourses: [],
  certCodes: {},
  auditLog: [],
}

function read(): ProgressState {
  if (typeof window === "undefined") return empty
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return {
      completedLessons: parsed.completedLessons ?? {},
      passedAssessments: parsed.passedAssessments ?? {},
      courseCompletedAt: parsed.courseCompletedAt ?? {},
      releasedCourses: parsed.releasedCourses ?? [],
      certCodes: parsed.certCodes ?? {},
      auditLog: parsed.auditLog ?? [],
    }
  } catch {
    return empty
  }
}

function write(state: ProgressState) {
  window.localStorage.setItem(KEY, JSON.stringify(state))
  window.dispatchEvent(new Event(EVENT))
}

/** Generate a secure, unique certificate access code, e.g. CVX-AC-3F9A-1C7B-D204. */
function generateAccessCode(): string {
  const bytes = new Uint8Array(6)
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    crypto.getRandomValues(bytes)
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256)
  }
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").toUpperCase()
  return `CVX-AC-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`
}

function makeAuditEntry(
  actor: string,
  action: AuditAction,
  certId: string,
  recipient: string,
  detail?: string,
): AuditEntry {
  const id =
    typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `a-${Date.now()}-${Math.random()}`
  return { id, at: new Date().toISOString(), actor, action, certId, recipient, detail }
}

/** Append an audit record (newest first) without mutating the input array. */
function appendAudit(state: ProgressState, entry: AuditEntry): AuditEntry[] {
  return [entry, ...state.auditLog]
}

/** Actor metadata attached to code-control actions for the audit trail. */
export interface CodeActionMeta {
  actor: string
  certId: string
  recipient: string
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(empty)

  useEffect(() => {
    setState(read())
    const handler = () => setState(read())
    window.addEventListener(EVENT, handler)
    window.addEventListener("storage", handler)
    return () => {
      window.removeEventListener(EVENT, handler)
      window.removeEventListener("storage", handler)
    }
  }, [])

  /** Replace the full set of completed lesson ids for a course. */
  const setCourseLessons = useCallback((courseId: string, lessonIds: string[]) => {
    const s = read()
    s.completedLessons = { ...s.completedLessons, [courseId]: lessonIds }
    write(s)
  }, [])

  /** Record a passing (or best) score for an assessment. */
  const markAssessmentPassed = useCallback((assessmentId: string, score: number) => {
    const s = read()
    const prev = s.passedAssessments[assessmentId] ?? 0
    s.passedAssessments = { ...s.passedAssessments, [assessmentId]: Math.max(prev, score) }
    write(s)
  }, [])

  /** Stamp the completion date the first time a course meets its requirements. */
  const markCourseCompleted = useCallback((courseId: string) => {
    const s = read()
    if (s.courseCompletedAt[courseId]) return
    s.courseCompletedAt = { ...s.courseCompletedAt, [courseId]: new Date().toISOString() }
    write(s)
  }, [])

  /**
   * Auto-generate a secure access code for a protected certificate the first
   * time its requirements are met. Idempotent: a code is created only once and
   * is logged in the audit trail. Learners never see this code.
   */
  const ensureCertCode = useCallback((certId: string, courseId: string, recipient: string) => {
    const s = read()
    if (s.certCodes[certId]) return
    const code = generateAccessCode()
    s.certCodes = {
      ...s.certCodes,
      [certId]: { code, certId, courseId, recipient, generatedAt: new Date().toISOString(), disabled: false },
    }
    s.auditLog = appendAudit(s, makeAuditEntry("System", "generated", certId, recipient, "Access code generated automatically on completion"))
    write(s)
  }, [])

  /** Super Admin: issue a brand-new access code, invalidating the previous one. */
  const regenerateCertCode = useCallback((meta: CodeActionMeta) => {
    const s = read()
    const existing = s.certCodes[meta.certId]
    const code = generateAccessCode()
    s.certCodes = {
      ...s.certCodes,
      [meta.certId]: {
        code,
        certId: meta.certId,
        courseId: existing?.courseId ?? "",
        recipient: meta.recipient,
        generatedAt: new Date().toISOString(),
        disabled: existing?.disabled ?? false,
      },
    }
    s.auditLog = appendAudit(s, makeAuditEntry(meta.actor, "regenerated", meta.certId, meta.recipient))
    write(s)
  }, [])

  /** Super Admin: disable or re-enable a certificate access code. */
  const setCertCodeDisabled = useCallback((meta: CodeActionMeta, disabled: boolean) => {
    const s = read()
    const existing = s.certCodes[meta.certId]
    if (!existing) return
    s.certCodes = { ...s.certCodes, [meta.certId]: { ...existing, disabled } }
    s.auditLog = appendAudit(s, makeAuditEntry(meta.actor, disabled ? "disabled" : "enabled", meta.certId, meta.recipient))
    write(s)
  }, [])

  /** Super Admin: release a restricted certificate (activates learner download). */
  const releaseCourse = useCallback((courseId: string, meta?: CodeActionMeta) => {
    const s = read()
    if (!s.releasedCourses.includes(courseId)) {
      s.releasedCourses = [...s.releasedCourses, courseId]
    }
    if (meta) {
      s.auditLog = appendAudit(s, makeAuditEntry(meta.actor, "released", meta.certId, meta.recipient))
    }
    write(s)
  }, [])

  const revokeCourseRelease = useCallback((courseId: string, meta?: CodeActionMeta) => {
    const s = read()
    s.releasedCourses = s.releasedCourses.filter((id) => id !== courseId)
    if (meta) {
      s.auditLog = appendAudit(s, makeAuditEntry(meta.actor, "revoked", meta.certId, meta.recipient))
    }
    write(s)
  }, [])

  return {
    state,
    setCourseLessons,
    markAssessmentPassed,
    markCourseCompleted,
    ensureCertCode,
    regenerateCertCode,
    setCertCodeDisabled,
    releaseCourse,
    revokeCourseRelease,
  }
}
