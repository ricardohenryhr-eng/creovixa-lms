"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { demoUsers, type Role, type User } from "./data"
import { isLocked, INACTIVITY_LIMIT_DAYS } from "./access"

interface AuthResult {
  ok: boolean
  error?: string
  user?: User
}

interface AuthState {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => { ok: boolean; error?: string }
  /** Validate credentials without creating a session (used by the 2FA flow). */
  authenticate: (email: string, password: string) => AuthResult
  /** Persist a verified user as the active session. */
  establishSession: (user: User) => void
  loginAs: (role: Role) => void
  logout: () => void
  updateUser: (patch: Partial<User>) => void
}

const AuthContext = createContext<AuthState | null>(null)

const STORAGE_KEY = "creovixa.session"

/** Mark now as the last login and grant a fresh inactivity window. */
function refreshActivity(user: User): User {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const expires = new Date(today)
  expires.setDate(expires.getDate() + INACTIVITY_LIMIT_DAYS)
  const wasReactivated = user.status === "reactivated"
  return {
    ...user,
    status: wasReactivated ? "reactivated" : "active",
    lastLoginAt: today.toISOString().slice(0, 10),
    accessExpiresAt: expires.toISOString().slice(0, 10),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
    setLoading(false)
  }, [])

  function persist(next: User | null) {
    setUser(next)
    if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    else localStorage.removeItem(STORAGE_KEY)
  }

  function authenticate(email: string, password: string): AuthResult {
    const match = demoUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
    if (!match) return { ok: false, error: "No account found for that email." }
    if (match.password !== password) return { ok: false, error: "Incorrect password." }
    const { password: _pw, ...safe } = match
    return { ok: true, user: safe }
  }

  function establishSession(safe: User) {
    // Signing in counts as activity: unlocked accounts get a fresh access
    // window. Locked accounts (suspended / pending / expired) are persisted
    // as-is so the app shell shows the lockout screen.
    persist(isLocked(safe) ? safe : refreshActivity(safe))
  }

  function login(email: string, password: string) {
    const res = authenticate(email, password)
    if (!res.ok || !res.user) return { ok: false, error: res.error }
    establishSession(res.user)
    return { ok: true }
  }

  function loginAs(role: Role) {
    const match = demoUsers.find((u) => u.role === role) ?? demoUsers[0]
    const { password: _pw, ...safe } = match
    persist(safe)
  }

  function logout() {
    persist(null)
  }

  function updateUser(patch: Partial<User>) {
    setUser((prev) => {
      if (!prev) return prev
      const next = { ...prev, ...patch }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, authenticate, establishSession, loginAs, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
