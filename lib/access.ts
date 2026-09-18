import type { User, UserStatus } from "./data"

/** Access lapses automatically after this many days of inactivity. */
export const INACTIVITY_LIMIT_DAYS = 15

/** Reminders fire this many days before access expires. */
export const REMINDER_DAYS = [5, 2] as const

/** Options offered when an admin extends an account's access window. */
export const EXTEND_OPTIONS = [15, 30, 60] as const

const DAY_MS = 24 * 60 * 60 * 1000

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

/** Whole days from `iso` until now (positive = in the past). */
export function daysSince(iso?: string): number | null {
  if (!iso) return null
  const then = startOfDay(new Date(iso)).getTime()
  const now = startOfDay(new Date()).getTime()
  return Math.round((now - then) / DAY_MS)
}

/** Whole days from now until `iso` (positive = in the future). */
export function daysUntil(iso?: string): number | null {
  const since = daysSince(iso)
  return since === null ? null : -since
}

/**
 * Permanent accounts (the founding Super Admin) never expire and are exempt
 * from suspension, deletion, and the inactivity lifecycle.
 */
export function isPermanent(user: User): boolean {
  return user.permanent === true || user.role === "super_admin"
}

/**
 * Resolve when access expires. Prefer the stored window; otherwise derive it
 * from the last login plus the inactivity limit.
 */
export function accessExpiry(user: User): Date | null {
  if (isPermanent(user)) return null
  if (user.accessExpiresAt) return startOfDay(new Date(user.accessExpiresAt))
  if (user.lastLoginAt) {
    const d = startOfDay(new Date(user.lastLoginAt))
    d.setDate(d.getDate() + INACTIVITY_LIMIT_DAYS)
    return d
  }
  return null
}

/** Days of inactivity since the last sign-in (null if the user never signed in). */
export function inactivityDays(user: User): number | null {
  return daysSince(user.lastLoginAt)
}

/** Days remaining before access expires (negative once lapsed). */
export function daysToExpiry(user: User): number | null {
  const expiry = accessExpiry(user)
  if (!expiry) return null
  return Math.round((expiry.getTime() - startOfDay(new Date()).getTime()) / DAY_MS)
}

/**
 * The account's effective status, factoring in automatic expiration.
 * A stored "active"/"reactivated" account whose window has lapsed reads as
 * "expired" so the rest of the app treats it consistently.
 */
export function effectiveStatus(user: User): UserStatus {
  // Permanent accounts are always active and cannot be locked out.
  if (isPermanent(user)) return "active"
  if (user.status === "suspended" || user.status === "pending") return user.status
  const remaining = daysToExpiry(user)
  if (remaining !== null && remaining < 0) return "expired"
  return user.status
}

/** Locked accounts cannot reach any learner content. */
export function isLocked(user: User): boolean {
  const s = effectiveStatus(user)
  return s === "suspended" || s === "pending" || s === "expired"
}

/**
 * Whether `actor` may suspend or delete `target`.
 * - Permanent accounts (founding Super Admin) can never be suspended or deleted.
 * - Administrator accounts (super_admin / admin) may only be managed by a Super Admin.
 * - Everyone else may be managed by any admin who can reach this screen.
 */
export function canModifyAccount(actor: User | null, target: User): boolean {
  if (isPermanent(target)) return false
  if (target.role === "super_admin" || target.role === "admin") {
    return actor?.role === "super_admin"
  }
  return true
}

export const statusLabels: Record<UserStatus, string> = {
  active: "Active",
  pending: "Pending Approval",
  suspended: "Suspended",
  expired: "Expired",
  reactivated: "Reactivated",
}

type Tone = "green" | "amber" | "red" | "blue" | "muted"

export const statusTones: Record<UserStatus, Tone> = {
  active: "green",
  pending: "amber",
  suspended: "red",
  expired: "red",
  reactivated: "blue",
}

/** Human explanation of why a locked account can't get in. */
export function lockReason(user: User): string {
  switch (effectiveStatus(user)) {
    case "pending":
      return "Your account is awaiting administrator approval. You'll be notified once access is granted."
    case "suspended":
      return "Your access has been suspended by an administrator. Please contact your program administrator to restore access."
    case "expired": {
      const idle = inactivityDays(user)
      return `Your access expired after ${INACTIVITY_LIMIT_DAYS} days of inactivity${
        idle !== null ? ` (last sign-in was ${idle} days ago)` : ""
      }. Only a Super Admin or Admin can reactivate your account.`
    }
    default:
      return "Your account is currently inaccessible."
  }
}

export type ReminderKind = "expiring-5" | "expiring-2" | "suspended" | "restored"

export interface AccessNotification {
  userId: string
  name: string
  email: string
  kind: ReminderKind
  message: string
}

/**
 * The access notifications currently applicable to a user: upcoming-expiry
 * reminders for active accounts, and status notices for suspended/reactivated.
 */
export function notificationsFor(user: User): AccessNotification[] {
  const out: AccessNotification[] = []
  const status = effectiveStatus(user)

  if (status === "suspended") {
    out.push({
      userId: user.id,
      name: user.name,
      email: user.email,
      kind: "suspended",
      message: "Access suspended — user notified.",
    })
  }

  if (user.status === "reactivated") {
    out.push({
      userId: user.id,
      name: user.name,
      email: user.email,
      kind: "restored",
      message: "Access restored — user notified.",
    })
  }

  if (status === "active" || status === "reactivated") {
    const remaining = daysToExpiry(user)
    if (remaining !== null && remaining >= 0) {
      if (remaining <= 2) {
        out.push({
          userId: user.id,
          name: user.name,
          email: user.email,
          kind: "expiring-2",
          message: `Access expires in ${remaining} day${remaining === 1 ? "" : "s"} — final reminder sent.`,
        })
      } else if (remaining <= 5) {
        out.push({
          userId: user.id,
          name: user.name,
          email: user.email,
          kind: "expiring-5",
          message: `Access expires in ${remaining} days — reminder sent.`,
        })
      }
    }
  }

  return out
}

/** Reactivate an account and grant a fresh access window from today. */
export function reactivate(user: User, days = INACTIVITY_LIMIT_DAYS): User {
  const today = startOfDay(new Date())
  const expires = new Date(today)
  expires.setDate(expires.getDate() + days)
  return {
    ...user,
    status: "reactivated",
    lastLoginAt: today.toISOString().slice(0, 10),
    accessExpiresAt: expires.toISOString().slice(0, 10),
  }
}

/** Suspend (disable) an account's access. */
export function suspend(user: User): User {
  return { ...user, status: "suspended" }
}

/** Push an account's expiry out by `days` from the later of today or its current expiry. */
export function extendAccess(user: User, days: number): User {
  const today = startOfDay(new Date())
  const current = accessExpiry(user)
  const base = current && current.getTime() > today.getTime() ? current : today
  const next = new Date(base)
  next.setDate(next.getDate() + days)
  return {
    ...user,
    // Extending a lapsed account brings it back to active.
    status: user.status === "suspended" || user.status === "pending" ? user.status : "active",
    accessExpiresAt: next.toISOString().slice(0, 10),
  }
}

/** Approve a pending account, granting first-time access. */
export function approve(user: User, days = INACTIVITY_LIMIT_DAYS): User {
  const today = startOfDay(new Date())
  const expires = new Date(today)
  expires.setDate(expires.getDate() + days)
  return {
    ...user,
    status: "active",
    lastLoginAt: user.lastLoginAt ?? today.toISOString().slice(0, 10),
    accessExpiresAt: expires.toISOString().slice(0, 10),
  }
}
