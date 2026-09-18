"use client"

import { useMemo, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, Lock, ShieldCheck, KeyRound, ArrowLeft } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, Input } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { isPlatformAdmin } from "@/lib/admin"
import type { User } from "@/lib/data"

/**
 * Demo two-factor code. In production this would be a TOTP/SMS/email code
 * verified server-side; here we accept a single fixed 6-digit code so the
 * admin portal's MFA step can be exercised end to end.
 */
const DEMO_MFA_CODE = "246810"

type Step = "credentials" | "mfa"

export function AdminLogin() {
  const router = useRouter()
  const { authenticate, establishSession } = useAuth()

  const [step, setStep] = useState<Step>("credentials")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState<User | null>(null)

  const maskedEmail = useMemo(() => {
    if (!pending) return ""
    const [name, domain] = pending.email.split("@")
    const head = name.slice(0, 2)
    return `${head}${"•".repeat(Math.max(name.length - 2, 2))}@${domain}`
  }, [pending])

  function submitCredentials(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = authenticate(email, password)
    if (!res.ok || !res.user) {
      setError(res.error ?? "Unable to sign in.")
      setLoading(false)
      return
    }
    if (!isPlatformAdmin(res.user.role)) {
      setError("This account does not have administrator access.")
      setLoading(false)
      return
    }
    // Credentials verified — require the second factor before creating a session.
    setPending(res.user)
    setStep("mfa")
    setCode("")
    setLoading(false)
  }

  function submitMfa(e: FormEvent) {
    e.preventDefault()
    setError("")
    if (!pending) return
    setLoading(true)
    if (code.trim() !== DEMO_MFA_CODE) {
      setError("Invalid authentication code. Try again.")
      setLoading(false)
      return
    }
    establishSession(pending)
    router.replace("/admin")
  }

  function backToCredentials() {
    setStep("credentials")
    setPending(null)
    setCode("")
    setError("")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4 py-10 text-white">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo inverted />
          <div className="mt-6 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
            <Lock className="h-3.5 w-3.5 text-primary" /> Secure administrator portal
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
          {step === "credentials" ? (
            <>
              <h1 className="font-display text-xl font-bold">Administrator sign in</h1>
              <p className="mt-1.5 text-sm text-slate-300">
                Restricted access. Authorized Creovixa staff only.
              </p>

              <form onSubmit={submitCredentials} className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="admin-email" className="text-sm font-medium text-slate-200">
                    Work email
                  </label>
                  <Input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@creovixa.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-white/15 bg-white/10 text-white placeholder:text-slate-400"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="admin-password" className="text-sm font-medium text-slate-200">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="admin-password"
                      type={show ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-white/15 bg-white/10 pr-10 text-white placeholder:text-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShow((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white"
                      aria-label={show ? "Hide password" : "Show password"}
                    >
                      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200" role="alert">
                    {error}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={loading} className="mt-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Continue
                </Button>
              </form>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={backToCredentials}
                className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <KeyRound className="h-5 w-5" />
                </span>
                <div>
                  <h1 className="font-display text-xl font-bold">Two-factor authentication</h1>
                  <p className="text-sm text-slate-300">Enter the 6-digit code for {maskedEmail}</p>
                </div>
              </div>

              <form onSubmit={submitMfa} className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="admin-mfa" className="text-sm font-medium text-slate-200">
                    Authentication code
                  </label>
                  <Input
                    id="admin-mfa"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="000000"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    required
                    autoFocus
                    className="border-white/15 bg-white/10 text-center text-lg tracking-[0.5em] text-white placeholder:text-slate-500"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200" role="alert">
                    {error}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={loading || code.length < 6}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Verify &amp; sign in
                </Button>

                {process.env.NODE_ENV !== "production" && (
                  <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-300">
                    Demo authenticator code: <span className="font-mono font-semibold text-white">{DEMO_MFA_CODE}</span>
                  </p>
                )}
              </form>
            </>
          )}
        </div>

        <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          Protected by two-factor authentication
        </p>
      </div>
    </div>
  )
}
