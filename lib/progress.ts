"use client"

import { useCallback, useEffect, useState } from "react"

const KEY = "creovixa_progress_v2"
const EVENT = "creovixa-progress-change"

export interface ProgressState {
  /** courseId -> completed lesson ids */
  completedLessons: Record<string, string[]>
  /** assessmentId -> best score achieved */
  passedAssessments: Record<string, number>
  /** courseId -> ISO date the course first met its completion requirements */
  courseCompletedAt: Record<string, string>
  /** courseIds whose restricted certificate an admin has released */
  releasedCourses: string[]
}

const empty: ProgressState = {
  completedLessons: {},
  passedAssessments: {},
  courseCompletedAt: {},
  releasedCourses: [],
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
    }
  } catch {
    return empty
  }
}

function write(state: ProgressState) {
  window.localStorage.setItem(KEY, JSON.stringify(state))
  window.dispatchEvent(new Event(EVENT))
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

  /** Admin: release / revoke a restricted certificate. */
  const releaseCourse = useCallback((courseId: string) => {
    const s = read()
    if (s.releasedCourses.includes(courseId)) return
    s.releasedCourses = [...s.releasedCourses, courseId]
    write(s)
  }, [])

  const revokeCourseRelease = useCallback((courseId: string) => {
    const s = read()
    s.releasedCourses = s.releasedCourses.filter((id) => id !== courseId)
    write(s)
  }, [])

  return {
    state,
    setCourseLessons,
    markAssessmentPassed,
    markCourseCompleted,
    releaseCourse,
    revokeCourseRelease,
  }
}
