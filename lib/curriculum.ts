import { courses, assessments, certificates, type Course, type Assessment, type Lesson } from "@/lib/data"
import type { ProgressState } from "@/lib/progress"

/** Courses in required learning order (foundations first). */
export const orderedCourses: Course[] = [...courses].sort((a, b) => a.order - b.order)

export function courseAssessment(courseId: string): Assessment | undefined {
  return assessments.find((a) => a.courseId === courseId)
}

export function lessonList(course: Course): Lesson[] {
  return course.modules.flatMap((m) => m.lessons)
}

export function completedLessonSet(course: Course, state: ProgressState): Set<string> {
  return new Set(state.completedLessons[course.id] ?? [])
}

export function lessonProgress(course: Course, state: ProgressState): { done: number; total: number; pct: number } {
  const lessons = lessonList(course)
  const set = completedLessonSet(course, state)
  const done = lessons.filter((l) => set.has(l.id)).length
  const total = lessons.length
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 }
}

export function allLessonsComplete(course: Course, state: ProgressState): boolean {
  const lessons = lessonList(course)
  const set = completedLessonSet(course, state)
  return lessons.length > 0 && lessons.every((l) => set.has(l.id))
}

export function assessmentPassed(course: Course, state: ProgressState): boolean {
  const a = courseAssessment(course.id)
  if (!a) return true
  return (state.passedAssessments[a.id] ?? 0) >= a.passingScore
}

/**
 * Whether a lesson is unlocked. Lessons must be consumed in order: the first
 * lesson is always open; every later lesson unlocks only once the previous one
 * is complete (which, for videos, means it was watched to 100%).
 */
export function lessonUnlocked(course: Course, lessonId: string, state: ProgressState): boolean {
  const lessons = lessonList(course)
  const idx = lessons.findIndex((l) => l.id === lessonId)
  if (idx <= 0) return true
  return completedLessonSet(course, state).has(lessons[idx - 1].id)
}

/** All lessons done AND final quiz passed — required before the quiz counts / cert issues. */
export function courseCompleted(course: Course, state: ProgressState): boolean {
  const lessonsOk = course.cert.requiresLessonCompletion ? allLessonsComplete(course, state) : true
  return lessonsOk && assessmentPassed(course, state)
}

/**
 * The final quiz unlocks once every lesson is complete for training courses.
 * Quiz-only certification courses (Code of Conduct, Compliance) can be taken
 * directly, matching their "certificate awarded on passing the quiz" rule.
 */
export function assessmentUnlocked(course: Course, state: ProgressState): boolean {
  if (!course.cert.requiresLessonCompletion) return true
  return allLessonsComplete(course, state)
}

/** A course is locked until the previous course in the sequence is completed. */
export function courseUnlocked(course: Course, state: ProgressState): boolean {
  const idx = orderedCourses.findIndex((c) => c.id === course.id)
  if (idx <= 0) return true
  return courseCompleted(orderedCourses[idx - 1], state)
}

/** Static (historical) certificate issued for this course to the given recipient. */
export function staticCertFor(course: Course, recipient: string) {
  return certificates.find(
    (c) => c.certId.includes(`-${course.certPrefix}-`) && c.recipient.toLowerCase() === recipient.toLowerCase(),
  )
}

/** Certificate earned = learning requirements met, or a historical cert exists. */
export function certificateEarned(course: Course, state: ProgressState, recipient: string): boolean {
  return courseCompleted(course, state) || !!staticCertFor(course, recipient)
}

/** Date a restricted certificate becomes eligible (completion + waiting period). */
export function eligibleDate(completedAtIso: string | undefined, months: number): Date | null {
  if (!completedAtIso) return null
  const d = new Date(completedAtIso)
  d.setMonth(d.getMonth() + months)
  return d
}

export interface CertAccess {
  earned: boolean
  accessible: boolean
  released: boolean
  reason?: string
  availableOn?: Date
}

/**
 * Resolves whether a certificate can currently be viewed/downloaded, applying
 * the restricted Medical rule: admin release AND a waiting period after
 * completion. Uses a historical completion date when present so the demo's
 * pre-issued Medical certificate is already past its waiting period.
 */
export function certificateAccess(course: Course, state: ProgressState, recipient: string): CertAccess {
  const earned = certificateEarned(course, state, recipient)
  const released = state.releasedCourses.includes(course.id)
  if (!earned) return { earned: false, accessible: false, released, reason: "Requirements not met" }

  const rule = course.cert
  if (!rule.adminReleaseOnly) return { earned: true, accessible: true, released }

  const completedAt = state.courseCompletedAt[course.id] ?? staticCertFor(course, recipient)?.issuedAt
  const availableOn = eligibleDate(completedAt, rule.releaseAfterMonths ?? 6) ?? undefined
  const waited = availableOn ? Date.now() >= availableOn.getTime() : false

  if (!released) return { earned: true, accessible: false, released: false, reason: "Awaiting admin release", availableOn }
  if (!waited)
    return { earned: true, accessible: false, released: true, reason: "Available 6 months after completion", availableOn }
  return { earned: true, accessible: true, released: true, availableOn }
}

/** Build the certificate id shown to a learner for an earned course. */
export function certIdFor(course: Course, state: ProgressState, recipient: string): string {
  const existing = staticCertFor(course, recipient)
  if (existing) return existing.certId
  const year = new Date(state.courseCompletedAt[course.id] ?? Date.now()).getFullYear()
  return `CVX-${course.certPrefix}-${year}-${course.id.replace(/\D/g, "").padStart(4, "0")}`
}
