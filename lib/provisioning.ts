"use client"

/**
 * Super Admin provisioning.
 *
 * During system setup a secure temporary password is generated automatically
 * for the founding Super Admin and displayed exactly once on the secure admin
 * portal. The Super Admin must acknowledge (save) it, then change it on first
 * login before reaching the dashboard. After the change the temporary password
 * is invalidated and the credential is never displayed again.
 *
 * This is the app's client-side demo of an account-provisioning flow. In a real
 * backend the temporary password would be delivered out-of-band (e.g. email)
 * and stored only as a salted hash, and the forced rotation enforced server-side.
 */

export const SUPER_ADMIN_EMAIL = "ricardo.henry@creovixa.com"

const KEY = "creovixa.provisioning"

export interface ProvisioningState {
  /** Auto-generated one-time temporary password (valid until first change). */
  tempPassword: string
  /** True once the temporary password has been revealed and saved. */
  acknowledged: boolean
  /** True until the Super Admin sets their own password on first login. */
  mustChangePassword: boolean
  /** The Super Admin's chosen password after first login (demo: plain text). */
  password: string | null
}

function randInt(max: number): number {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint32Array(1)
    crypto.getRandomValues(arr)
    return arr[0] % max
  }
  return Math.floor(Math.random() * max)
}

/** Build a strong 16-character temporary password with mixed character classes. */
function generateTempPassword(): string {
  const upper = "ABCDEFGHJKMNPQRSTUVWXYZ"
  const lower = "abcdefghijkmnpqrstuvwxyz"
  const digits = "23456789"
  const specials = "!@#$%&*?"
  const all = upper + lower + digits + specials
  const pick = (set: string) => set[randInt(set.length)]
  const chars = [pick(upper), pick(lower), pick(digits), pick(specials)]
  while (chars.length < 16) chars.push(pick(all))
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randInt(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.join("")
}

/**
 * Read the provisioning record, creating it (with a freshly generated temporary
 * password) the first time it is accessed in the browser.
 */
export function readProvisioning(): ProvisioningState {
  if (typeof window === "undefined") {
    return { tempPassword: "", acknowledged: false, mustChangePassword: true, password: null }
  }
  try {
    const raw = window.localStorage.getItem(KEY)
    if (raw) return JSON.parse(raw) as ProvisioningState
  } catch {
    // fall through to fresh provisioning
  }
  const initial: ProvisioningState = {
    tempPassword: generateTempPassword(),
    acknowledged: false,
    mustChangePassword: true,
    password: null,
  }
  window.localStorage.setItem(KEY, JSON.stringify(initial))
  return initial
}

function writeProvisioning(next: ProvisioningState) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(KEY, JSON.stringify(next))
}

/** Mark the temporary password as revealed and saved — it won't be shown again. */
export function acknowledgeTempPassword() {
  writeProvisioning({ ...readProvisioning(), acknowledged: true })
}

/** Persist the Super Admin's chosen password and clear the forced-change flag. */
export function setSuperAdminPassword(newPassword: string) {
  writeProvisioning({
    ...readProvisioning(),
    password: newPassword,
    mustChangePassword: false,
    acknowledged: true,
  })
}

/** The credential currently valid for the Super Admin (chosen, else temporary). */
export function superAdminPassword(): string {
  const s = readProvisioning()
  return s.password ?? s.tempPassword
}

/** Whether the Super Admin still needs to set their own password. */
export function superAdminMustChangePassword(): boolean {
  return readProvisioning().mustChangePassword
}
