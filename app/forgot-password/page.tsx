"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Loader2, Mail } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, Input } from "@/components/ui"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSent(true)
    }, 800)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          {sent ? (
            <div className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-success">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <h1 className="mt-4 font-display text-xl font-bold">Check your inbox</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                If an account exists for <span className="font-medium text-foreground">{email}</span>, we&apos;ve sent a
                link to reset your password.
              </p>
              <Link href="/login" className="mt-6 inline-block">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4" />
                  Back to sign in
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Mail className="h-6 w-6" />
              </span>
              <h1 className="mt-4 font-display text-xl font-bold tracking-tight">Reset your password</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Enter the email associated with your account and we&apos;ll send you a reset link.
              </p>
              <form onSubmit={submit} className="mt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium">Email address</label>
                  <Input id="email" type="email" placeholder="you@creovixa.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <Button type="submit" size="lg" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  Send reset link
                </Button>
              </form>
              <Link href="/login" className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
