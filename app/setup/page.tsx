"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, ShieldCheck, Copy, Check } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui"
import { bootstrapSuperAdmin } from "@/app/actions/auth"
import { SUPER_ADMIN_EMAIL } from "@/lib/roles"

export default function SetupPage() {
  const router = useRouter()
  const [state, setState] = useState<"idle" | "working" | "created" | "exists" | "error">("idle")
  const [tempPassword, setTempPassword] = useState("")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  async function run() {
    setState("working")
    setError("")
    const res = await bootstrapSuperAdmin()
    if (!res.ok) {
      setError(res.error ?? "Setup failed.")
      setState("error")
      return
    }
    if (res.created) {
      setTempPassword(res.tempPassword ?? "")
      setState("created")
    } else {
      setState("exists")
    }
  }

  function copy() {
    navigator.clipboard.writeText(tempPassword)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
        <Logo />
        <div className="mt-6 flex items-center gap-2 rounded-lg bg-accent/50 px-3 py-2 text-sm text-accent-foreground">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
          One-time platform setup
        </div>
        <h1 className="mt-6 font-display text-2xl font-bold tracking-tight">Provision the Super Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Creates the permanent Super Admin account for{" "}
          <span className="font-medium text-foreground">{SUPER_ADMIN_EMAIL}</span>. This is safe to run more than once —
          the account is only created if it does not already exist.
        </p>

        {state === "idle" && (
          <Button className="mt-6" size="lg" onClick={run}>
            Create Super Admin
          </Button>
        )}

        {state === "working" && (
          <Button className="mt-6" size="lg" disabled>
            <Loader2 className="h-4 w-4 animate-spin" /> Working…
          </Button>
        )}

        {state === "exists" && (
          <div className="mt-6">
            <p className="rounded-lg bg-muted/50 px-3 py-2 text-sm">
              The Super Admin already exists. Sign in with the credentials from the original welcome email.
            </p>
            <Button className="mt-4" onClick={() => router.push("/login")}>
              Go to sign in
            </Button>
          </div>
        )}

        {state === "created" && (
          <div className="mt-6 flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium">Super Admin created.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Save this one-time temporary password now. You will set a permanent password on first sign in.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 p-3">
              <code className="min-w-0 flex-1 truncate font-mono text-sm">{tempPassword}</code>
              <button
                onClick={copy}
                className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted"
                aria-label="Copy temporary password"
              >
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
            <Button onClick={() => router.push("/login")}>Continue to sign in</Button>
          </div>
        )}

        {state === "error" && (
          <div className="mt-6">
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-destructive">{error}</p>
            <Button className="mt-4" variant="outline" onClick={run}>
              Try again
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
