export const SUPER_ADMIN_EMAIL = "ricardo.henry@creovixa.com"

export type Role = "super_admin" | "admin" | "interpreter" | "student" | "trainer"
export type AccountStatus = "pending_first_login" | "active" | "suspended" | "reactivated"

/** Roles the Add User form may assign. Super Admin is provisioned separately. */
export const ASSIGNABLE_ROLES: Role[] = ["interpreter", "student", "trainer", "admin"]

export const roleLabels: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  interpreter: "Interpreter",
  student: "Student",
  trainer: "Trainer",
}

export const statusLabels: Record<AccountStatus, string> = {
  pending_first_login: "Pending First Login",
  active: "Active",
  suspended: "Suspended",
  reactivated: "Reactivated",
}

export function isSuperAdminEmail(email: string | null | undefined): boolean {
  return (email ?? "").toLowerCase() === SUPER_ADMIN_EMAIL
}

export function isAdminRole(role: Role | null | undefined): boolean {
  return role === "super_admin" || role === "admin"
}

/** Only the Super Admin may create/delete admins or promote users to admin. */
export function canManageAdmins(email: string | null | undefined): boolean {
  return isSuperAdminEmail(email)
}

export interface Profile {
  id: string
  first_name: string
  last_name: string
  full_name: string
  email: string
  role: Role
  status: AccountStatus
  password_changed: boolean
  permanent: boolean
  invited_by: string
  created_at: string
  updated_at: string
  last_login: string | null
}
