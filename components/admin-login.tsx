"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2, Lock, ShieldCheck, KeyRound, ArrowLeft, Copy, Check, Sparkles } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, Input } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { isPlatformAdmin } from "@/lib/admin"
import {
  readProvisioning,
  acknowledgeTempPassword,
  setSuperAdminPassword,
  superAdminMfaCode,
  superAdminMfaEnabled,
  SUPER_ADMIN_EMAIL,
  type ProvisioningState,
} from "@/lib/provisioning"
import type { User } from "@/lib/data"

/**
 * Demo two-factor code. In production this would be a TOTP/SMS/email code
 * verified server-side; here we accept a single fixed 6-digit code so the
 * admin portal's MFA step can be exercised end to end.
 */
const DEMO_MFA_CODE = "246810"

type Step = "setup" | "credentials" | "mfa" | "change-password"

/** Password policy for the Super Admin's self-chosen password. */
function passwordIssue(pw: string): string | null {
  if (pw.length < 10) return "Use at least 10 characters."
  if (!/[a-z]/.test(pw)) return "Include a lowercase letter."
  if (!/[A-Z]/.test(pw)) return "Include an uppercase letter."
  if (!/[0-9]/.test(pw)) return "Include a number."
  return null
}

export function AdminLogin() {
  const router = useRouter()
  const { authenticate, establishSession } = useAuth()

  const [prov, setProv] = useState<ProvisioningState | null>(null)
  const [step, setStep] = useState<Step>("credentials")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [pending, setPending] = useState<User | null>(null)
  const [copied, setCopied] = useState(false)
  const [savedConfirmed, setSavedConfirmed] = useState(false)

  // New-password fields for the forced first-login change.
  const [newPw, setNewPw] = useState("")
  const [confirmPw, setConfirmPw] = useState("")

  // Load provisioning on mount. If the Super Admin has not yet been set up,
  // open on the one-time temporary-password reveal.
  useEffect(() => {
    const p = readProvisioning()
    setProv(p)
    if (!p.acknowledged && p.mustChangePassword) setStep("setup")
  }, [])

  const maskedEmail = useMemo(() => {
    if (!pending) return ""
    const [name, domain] = pending.email.split("@")
    const head = name.slice(0, 2)
    return `${head}${"•".repeat(Math.max(name.length - 2, 2))}@${domain}`
  }, [pending])

  function acknowledgeSetup() {
    acknowledgeTempPassword()
    setProv(readProvisioning())
    setStep("credentials")
  }

  async function copyTemp() {
    if (!prov) return
    try {
      await navigator.clipboard.writeText(prov.tempPassword)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard may be unavailable; the password is visible to copy manually
    }
  }

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
    setPending(res.user)
    setCode("")
    setLoading(false)
    // Two-factor is temporarily disabled for the Super Admin while code
    // delivery is being fixed: verified email + password grants access
    // directly. All other admins still require the second factor.
    const mfaRequired = !(res.user.email.toLowerCase() === SUPER_ADMIN_EMAIL && !superAdminMfaEnabled())
    if (mfaRequired) {
      setStep("mfa")
    } else {
      proceedAfterVerification(res.user)
    }
  }

  /** After identity is verified, enforce a first-login password change or enter. */
  function proceedAfterVerification(verified: User) {
    if (verified.mustChangePassword) {
      setNewPw("")
      setConfirmPw("")
      setStep("change-password")
      return
    }
    establishSession(verified)
    router.replace("/admin/dashboard")
  }

  function submitMfa(e: FormEvent) {
    e.preventDefault()
    setError("")
    if (!pending) return
    setLoading(true)
    // The Super Admin verifies against the provisioned code (resettable from
    // the admin console); other platform admins use the fixed demo code.
    const expected = pending.email.toLowerCase() === SUPER_ADMIN_EMAIL ? superAdminMfaCode() : DEMO_MFA_CODE
    if (code.trim() !== expected) {
      setError("Invalid authentication code. Try again.")
      setLoading(false)
      return
    }
    setLoading(false)
    proceedAfterVerification(pending)
  }

  function submitNewPassword(e: FormEvent) {
    e.preventDefault()
    setError("")
    if (!pending) return
    const issue = passwordIssue(newPw)
    if (issue) {
      setError(issue)
      return
    }
    if (newPw !== confirmPw) {
      setError("Passwords do not match.")
      return
    }
    setLoading(true)
    setSuperAdminPassword(newPw)
    establishSession({ ...pending, mustChangePassword: false })
    router.replace("/admin/dashboard")
  }

  function backToCredentials() {
    setStep("credentials")
    setPending(null)
    setCode("")
    setError("")
  }

  // Avoid a hydration flash before provisioning is read.
  if (!prov) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary text-white">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
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
          {step === "setup" && (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h1 className="font-display text-xl font-bold">Super Admin setup</h1>
                  <p className="text-sm text-slate-300">One-time temporary password</p>
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-300">
                A secure temporary password has been generated for{" "}
                <span className="font-medium text-white">{SUPER_ADMIN_EMAIL}</span>. Save it now — it is shown{" "}
                <span className="font-semibold text-white">only once</span> and will be required to sign in. You&apos;ll
                set your own password immediately after.
              </p>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3">
                <code className="select-all break-all font-mono text-base font-semibold text-white">
                  {prov.tempPassword}
                </code>
                <button
                  type="button"
                  onClick={copyTemp}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/20 bg-white/10 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-white/20"
                  aria-label="Copy temporary password"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <label className="mt-4 flex items-start gap-2.5 text-sm text-slate-200">
                <input
                  type="checkbox"
                  checked={savedConfirmed}
                  onChange={(e) => setSavedConfirmed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/10 accent-primary"
                />
                <span>I have securely saved this temporary password.</span>
              </label>

              <Button
                type="button"
                size="lg"
                className="mt-5 w-full"
                disabled={!savedConfirmed}
                onClick={acknowledgeSetup}
              >
                Continue to sign in
              </Button>
            </>
          )}

          {step === "credentials" && (
            <>
              <h1 className="font-display text-xl font-bold">Administrator sign in</h1>
              <p className="mt-1.5 text-sm text-slate-300">Restricted access. Authorized Creovixa staff only.</p>

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
          )}

          {step === "mfa" && (
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
                    Demo authenticator code:{" "}
                    <span className="font-mono font-semibold text-white">
                      {pending?.email.toLowerCase() === SUPER_ADMIN_EMAIL ? superAdminMfaCode() : DEMO_MFA_CODE}
                    </span>
                  </p>
                )}
              </form>
            </>
          )}

          {step === "change-password" && (
            <>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <h1 className="font-display text-xl font-bold">Create your password</h1>
                  <p className="text-sm text-slate-300">Required before you can continue</p>
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-300">
                For security, replace the temporary password with your own. At least 10 characters, including upper- and
                lowercase letters and a number.
              </p>

              <form onSubmit={submitNewPassword} className="mt-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="new-pw" className="text-sm font-medium text-slate-200">
                    New password
                  </label>
                  <div className="relative">
                    <Input
                      id="new-pw"
                      type={show ? "text" : "password"}
                      autoComplete="new-password"
                      value={newPw}
                      onChange={(e) => setNewPw(e.target.value)}
                      required
                      autoFocus
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
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="confirm-pw" className="text-sm font-medium text-slate-200">
                    Confirm new password
                  </label>
                  <Input
                    id="confirm-pw"
                    type={show ? "text" : "password"}
                    autoComplete="new-password"
                    value={confirmPw}
                    onChange={(e) => setConfirmPw(e.target.value)}
                    required
                    className="border-white/15 bg-white/10 text-white placeholder:text-slate-400"
                  />
                </div>

                {error && (
                  <p className="rounded-lg bg-red-500/15 px-3 py-2 text-sm text-red-200" role="alert">
                    {error}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Set password &amp; enter dashboard
                </Button>
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
