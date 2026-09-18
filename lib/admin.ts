import {
  ShieldCheck,
  Users,
  BookOpen,
  Award,
  UserCheck,
  BadgeCheck,
  ClipboardList,
  FileCheck2,
  BarChart3,
  Settings,
  KeyRound,
  Mail,
  type LucideIcon,
} from "lucide-react"
import type { Role } from "./data"

/**
 * The distinct areas of the admin console. Access to each is governed per role
 * so trainers see only training-related sections while admins and super admins
 * manage the whole platform.
 */
export type AdminSection =
  | "dashboard"
  | "users"
  | "courses"
  | "certificates"
  | "interpreters"
  | "access"
  | "release"
  | "progress"
  | "quiz"
  | "reports"
  | "emails"
  | "settings"

export interface AdminNavItem {
  href: string
  label: string
  section: AdminSection
  icon: LucideIcon
}

export const adminNav: AdminNavItem[] = [
  { href: "/admin", label: "Overview", section: "dashboard", icon: ShieldCheck },
  { href: "/admin/users", label: "User Management", section: "users", icon: Users },
  { href: "/admin/courses", label: "Course Management", section: "courses", icon: BookOpen },
  { href: "/admin/certificates", label: "Certificate Management", section: "certificates", icon: Award },
  { href: "/admin/interpreters", label: "Interpreter Management", section: "interpreters", icon: UserCheck },
  { href: "/admin/access", label: "Access Management", section: "access", icon: KeyRound },
  { href: "/admin/certificate-release", label: "Certificate Release", section: "release", icon: BadgeCheck },
  { href: "/admin/progress", label: "Training Progress", section: "progress", icon: ClipboardList },
  { href: "/admin/quiz-results", label: "Quiz Results", section: "quiz", icon: FileCheck2 },
  { href: "/admin/reports", label: "Reports", section: "reports", icon: BarChart3 },
  { href: "/admin/emails", label: "Email Outbox", section: "emails", icon: Mail },
  { href: "/admin/settings", label: "Settings", section: "settings", icon: Settings },
]

const allSections = adminNav.map((i) => i.section)

/** Which admin sections each role may access. Empty means no admin access. */
export const roleAccess: Record<Role, AdminSection[]> = {
  super_admin: allSections,
  admin: allSections,
  trainer: ["dashboard", "courses", "progress", "quiz", "reports"],
  interpreter: [],
  student: [],
}

export function canAccessAdmin(role: Role): boolean {
  return roleAccess[role].length > 0
}

/**
 * Platform administrators (Super Admin and Admin) manage the whole platform and
 * must authenticate through the secure admin portal with two-factor auth.
 * Trainers have limited console access but are not platform admins.
 */
export function isPlatformAdmin(role: Role): boolean {
  return role === "super_admin" || role === "admin"
}

/** Only a Super Admin may create or manage other administrator accounts. */
export function canManageAdmins(role: Role): boolean {
  return role === "super_admin"
}

/** The single Super Admin authorized to control protected certificate codes. */
export const CERT_CONTROLLER_EMAIL = "ricardo.henry@creovixa.com"

/**
 * Whether the given account may view and control protected 40-Hour Medical
 * certificate access codes — release, revoke, regenerate, or disable them.
 * Restricted to the designated Super Admin (Ricardo Henry) only.
 */
export function isCertificateController(user: { role: Role; email: string } | null | undefined): boolean {
  if (!user) return false
  return user.role === "super_admin" && user.email.toLowerCase() === CERT_CONTROLLER_EMAIL
}

export function canAccessSection(role: Role, section: AdminSection): boolean {
  return roleAccess[role].includes(section)
}

/** Nav items the given role is allowed to see, in display order. */
export function navForRole(role: Role): AdminNavItem[] {
  return adminNav.filter((item) => canAccessSection(role, item.section))
}

/** Resolve which admin section a pathname belongs to (longest prefix wins). */
export function sectionForPath(pathname: string): AdminSection {
  if (pathname === "/admin") return "dashboard"
  const match = adminNav
    .filter((i) => i.href !== "/admin" && pathname.startsWith(i.href))
    .sort((a, b) => b.href.length - a.href.length)[0]
  return match?.section ?? "dashboard"
}
