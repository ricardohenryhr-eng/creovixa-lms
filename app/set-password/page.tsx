"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, ShieldCheck, Check, X } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, Input } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { completeFirstLogin } from "@/app/actions/auth"
import { validatePassword } from "@/lib/password"
import { cn } from "@/lib/utils"

const RULES: { label: string; test: (pw: string) => boolean }[] = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter", test: (p) => /[a-z]/.test(p) },
  { label: "One number", test: (p) => /[0-9]/.test(p) },
  { label: "One special character", test: (p) => /[^A-Za-z0-9]/.test(p) },
]

export default function SetPasswordPage() {
  const router = useRouter()
  const { user, loading, refresh } = useAuth()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // If someone lands here without a session, send them to sign in.
  useEffect(() => {
    if (!loading && !user) router.replace("/login")
    // Already changed — no reason to be here.
    if (!loading && user && !user.mustChangePassword) router.replace("/dashboard")
  }, [loading, user, router])

  const check = validatePassword(password)
  const matches = password.length > 0 && password === confirm
  const canSubmit = check.valid && matches && !submitting

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    const res = await completeFirstLogin(password, confirm)
    if (!res.ok) {
      setError(res.error ?? "Could not set your password.")
      setSubmitting(false)
      return
    }
    await refresh()
    router.replace("/dashboard")
  }

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <Logo />
        <div className="mt-6 flex items-center gap-2 rounded-lg bg-accent/50 px-3 py-2 text-sm text-accent-foreground">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
          Set your own password to finish activating your account.
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold tracking-tight">Create a new password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{user.email}</span>. Your temporary password will
          be permanently invalidated.
        </p>

        <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="new-password" className="text-sm font-medium">New password</label>
            <div className="relative">
              <Input
                id="new-password"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="confirm-password" className="text-sm font-medium">Confirm password</label>
            <Input
              id="confirm-password"
              type={show ? "text" : "password"}
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          <ul className="flex flex-col gap-1.5 rounded-lg bg-muted/50 p-3">
            {RULES.map((rule) => {
              const ok = rule.test(password)
              return (
                <li key={rule.label} className={cn("flex items-center gap-2 text-xs", ok ? "text-success" : "text-muted-foreground")}>
                  {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                  {rule.label}
                </li>
              )
            })}
            <li className={cn("flex items-center gap-2 text-xs", matches ? "text-success" : "text-muted-foreground")}>
              {matches ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
              Passwords match
            </li>
          </ul>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" disabled={!canSubmit}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Set password &amp; continue
          </Button>
        </form>
      </div>
    </div>
  )
}
