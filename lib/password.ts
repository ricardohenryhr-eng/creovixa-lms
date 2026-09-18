import { randomInt } from "crypto"

const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ"
const LOWER = "abcdefghijkmnpqrstuvwxyz"
const DIGITS = "23456789"
const SPECIAL = "!@#$%^&*()-_=+?"
const ALL = UPPER + LOWER + DIGITS + SPECIAL

/**
 * Generate a strong random temporary password:
 * >= 16 chars, guaranteed upper/lower/number/special. Uses crypto randomInt.
 */
export function generateTempPassword(length = 20): string {
  const required = [
    UPPER[randomInt(UPPER.length)],
    LOWER[randomInt(LOWER.length)],
    DIGITS[randomInt(DIGITS.length)],
    SPECIAL[randomInt(SPECIAL.length)],
  ]
  const rest: string[] = []
  for (let i = required.length; i < Math.max(16, length); i++) {
    rest.push(ALL[randomInt(ALL.length)])
  }
  const chars = [...required, ...rest]
  // Fisher–Yates shuffle so required chars aren't always at the front.
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.join("")
}

export interface PasswordCheck {
  valid: boolean
  errors: string[]
}

/**
 * Validate a user-chosen password against the first-login policy:
 * min 8 chars, one uppercase, one lowercase, one number, one special.
 */
export function validatePassword(pw: string): PasswordCheck {
  const errors: string[] = []
  if (pw.length < 8) errors.push("At least 8 characters")
  if (!/[A-Z]/.test(pw)) errors.push("One uppercase letter")
  if (!/[a-z]/.test(pw)) errors.push("One lowercase letter")
  if (!/[0-9]/.test(pw)) errors.push("One number")
  if (!/[^A-Za-z0-9]/.test(pw)) errors.push("One special character")
  return { valid: errors.length === 0, errors }
}
