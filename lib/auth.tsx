"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { demoUsers, type Role, type User } from "./data"

interface AuthState {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => { ok: boolean; error?: string }
  loginAs: (role: Role) => void
  logout: () => void
  updateUser: (patch: Partial<User>) => void
}

const AuthContext = createContext<AuthState | null>(null)

const STORAGE_KEY = "creovixa.session"

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

  function login(email: string, password: string) {
    const match = demoUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
    if (!match) return { ok: false, error: "No account found for that email." }
    if (match.password !== password) return { ok: false, error: "Incorrect password." }
    const { password: _pw, ...safe } = match
    persist(safe)
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
    <AuthContext.Provider value={{ user, loading, login, loginAs, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
