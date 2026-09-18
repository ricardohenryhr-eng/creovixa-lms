"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2, MailCheck } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, Input } from "@/components/ui"
import { requestPasswordReset } from "@/app/actions/auth"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function submit(e: FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    const res = await requestPasswordReset(email)
    setLoading(false)
    if (!res.ok) {
      setError(res.error ?? "Something went wrong. Please try again.")
      return
    }
    setMessage(res.message ?? "If an account exists for that email, a password reset link is on its way.")
    setDone(true)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <Logo />

        {done ? (
          <div className="mt-8 flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/50">
              <MailCheck className="h-6 w-6 text-primary" />
            </div>
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">Check your email</h1>
            <p className="mt-2 text-sm text-muted-foreground">{message}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              The reset link is sent from Creovixa Learn &lt;admin@creovixa.com&gt; and expires after a short time.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="mt-6 font-display text-2xl font-bold tracking-tight">Forgot your password?</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the email tied to your account and we&apos;ll send you a secure link to choose a new password.
            </p>

            <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium">Email address</label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@creovixa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              <Button type="submit" size="lg" disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Send reset link
              </Button>
            </form>

            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
