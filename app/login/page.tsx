"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, ShieldCheck } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, Input } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { isPlatformAdmin } from "@/lib/admin"

export default function LoginPage() {
  const router = useRouter()
  const { authenticate, establishSession } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = authenticate(email, password)
    if (!res.ok || !res.user) {
      setError(res.error ?? "Unable to sign in.")
      setLoading(false)
      return
    }
    // Administrators must sign in through the secure portal, which enforces
    // two-factor authentication. Send them there instead of creating a session.
    if (isPlatformAdmin(res.user.role)) {
      router.push("/admin")
      return
    }
    establishSession(res.user)
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between bg-secondary p-12 text-white lg:flex">
        <Link href="/">
          <Logo inverted />
        </Link>
        <div>
          <h2 className="max-w-md text-balance font-display text-4xl font-extrabold leading-tight">
            Welcome back to your interpreter training hub.
          </h2>
          <p className="mt-4 max-w-md text-pretty text-slate-300">
            Continue your certification tracks, take assessments, and manage your team — all in one secure platform.
          </p>
          <div className="mt-8 flex items-center gap-3 text-sm text-slate-300">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Role-based access for admins, interpreters, and students.
          </div>
        </div>
        <p className="text-sm text-slate-400">© {new Date().getFullYear()} Creovixa Language Services</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center px-4 py-10 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="lg:hidden">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h1 className="mt-8 font-display text-2xl font-bold tracking-tight lg:mt-0">Sign in to your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter your credentials to access the dashboard.</p>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">Email address</label>
              <Input id="email" type="email" autoComplete="email" placeholder="you@creovixa.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">Password</label>
                <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
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

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" disabled={loading} className="mt-2">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in
            </Button>
          </form>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Creovixa LMS is a private, invitation-only platform. Access is granted by administrators.
          </p>
        </div>
      </div>
    </div>
  )
}
