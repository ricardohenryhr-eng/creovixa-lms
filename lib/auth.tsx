"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { Role, User, UserStatus } from "./data"
import { createClient } from "./supabase/client"

interface AuthResult {
  ok: boolean
  error?: string
  user?: User
  mustChangePassword?: boolean
}

interface AuthState {
  user: User | null
  loading: boolean
  /** Sign in with real Supabase credentials and hydrate the session. */
  login: (email: string, password: string) => Promise<AuthResult>
  /** Compatibility alias for older callers — behaves like login. */
  authenticate: (email: string, password: string) => Promise<AuthResult>
  /** No-op: the Supabase session is already established by login. */
  establishSession: (user: User) => void
  /** Demo role switching is disabled in the real platform. */
  loginAs: (role: Role) => void
  logout: () => Promise<void>
  /** Optimistically patch the in-memory user (server remains source of truth). */
  updateUser: (patch: Partial<User>) => void
  refresh: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

const AVATAR_COLORS = ["#0f172a", "#f97316", "#0ea5e9", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"]

function colorForEmail(email: string): string {
  let hash = 0
  for (let i = 0; i < email.length; i++) hash = (hash * 31 + email.charCodeAt(i)) >>> 0
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

function mapStatus(status: string): UserStatus {
  switch (status) {
    case "pending_first_login":
      return "pending"
    case "suspended":
      return "suspended"
    case "reactivated":
      return "reactivated"
    default:
      return "active"
  }
}

interface ProfileRow {
  id: string
  full_name: string
  email: string
  role: Role
  status: string
  password_changed: boolean
  permanent: boolean
  created_at: string
  last_login: string | null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createClient(), [])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const hydrate = useCallback(async () => {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    if (!authUser) {
      setUser(null)
      return
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id, full_name, email, role, status, password_changed, permanent, created_at, last_login")
      .eq("id", authUser.id)
      .single<ProfileRow>()

    if (!profile) {
      setUser(null)
      return
    }

    // Aggregate the user's own enrollment stats (RLS-scoped to themselves).
    const { data: enr } = await supabase
      .from("enrollments")
      .select("progress, completed, certificate_issued")
      .eq("user_id", authUser.id)

    const rows = enr ?? []
    const completed = rows.filter((r) => r.completed).length
    const certificates = rows.filter((r) => r.certificate_issued).length
    const progress = rows.length
      ? Math.round(rows.reduce((sum, r) => sum + (r.progress ?? 0), 0) / rows.length)
      : 0

    setUser({
      id: profile.id,
      name: profile.full_name || profile.email,
      email: profile.email,
      role: profile.role,
      status: mapStatus(profile.status),
      avatarColor: colorForEmail(profile.email),
      joinedAt: profile.created_at?.slice(0, 10) ?? "",
      coursesEnrolled: rows.length,
      coursesCompleted: completed,
      certificates,
      progress,
      lastLoginAt: profile.last_login?.slice(0, 10),
      permanent: profile.permanent,
      mustChangePassword: !profile.password_changed,
    })
  }, [supabase])

  useEffect(() => {
    let active = true
    ;(async () => {
      await hydrate()
      if (active) setLoading(false)
    })()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") {
        setUser(null)
        return
      }
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED") {
        void hydrate()
      }
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [hydrate, supabase])

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })
      if (error || !data.user) {
        // Genericize the credential signal to resist account enumeration.
        return { ok: false, error: "Invalid email or password." }
      }
      const { data: profile } = await supabase
        .from("profiles")
        .select("role, status, password_changed")
        .eq("id", data.user.id)
        .single<{ role: Role; status: string; password_changed: boolean }>()

      await hydrate()
      return {
        ok: true,
        mustChangePassword: profile ? !profile.password_changed : false,
      }
    },
    [supabase, hydrate],
  )

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    setUser(null)
  }, [supabase])

  const updateUser = useCallback((patch: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev))
  }, [])

  const value: AuthState = {
    user,
    loading,
    login,
    authenticate: login,
    establishSession: () => {},
    loginAs: () => {},
    logout,
    updateUser,
    refresh: hydrate,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
