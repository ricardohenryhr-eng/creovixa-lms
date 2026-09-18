"use client"

import { useEffect, useState } from "react"
import { KeyRound, RefreshCw, Copy, Check, ShieldCheck } from "lucide-react"
import { Card, Button } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { isCertificateController } from "@/lib/admin"
import { readProvisioning, resetSuperAdminMfa, SUPER_ADMIN_EMAIL } from "@/lib/provisioning"
import { formatDateTime } from "@/lib/utils"

/**
 * Super-Admin-only two-factor management. Shows the current verification code
 * for testing and lets the Super Admin reset it, invalidating the old code and
 * generating a new one. Rendered only for the designated Super Admin.
 */
export function Admin2faCard() {
  const { user } = useAuth()
  const [code, setCode] = useState<string | null>(null)
  const [generatedAt, setGeneratedAt] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [justReset, setJustReset] = useState(false)

  useEffect(() => {
    const p = readProvisioning()
    setCode(p.mfaCode)
    setGeneratedAt(p.mfaGeneratedAt)
  }, [])

  if (!isCertificateController(user)) return null

  function reset() {
    const next = resetSuperAdminMfa()
    setCode(next)
    setGeneratedAt(readProvisioning().mfaGeneratedAt)
    setJustReset(true)
    setTimeout(() => setJustReset(false), 2500)
  }

  async function copy() {
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard may be unavailable; the code is visible to copy manually
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <KeyRound className="h-4 w-4" />
        </span>
        <div>
          <h2 className="font-display text-lg font-semibold">Two-factor authentication</h2>
          <p className="text-xs text-muted-foreground">Super Admin · {SUPER_ADMIN_EMAIL}</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Current verification code for the secure admin portal. Resetting invalidates the old code immediately and
        generates a new one.
      </p>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3">
        <code
          className="select-all font-mono text-2xl font-bold tracking-[0.35em] text-foreground"
          aria-label="Current two-factor verification code"
        >
          {code ?? "······"}
        </code>
        <button
          type="button"
          onClick={copy}
          disabled={!code}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50"
          aria-label="Copy verification code"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {generatedAt && (
        <p className="mt-2 text-xs text-muted-foreground">Last reset {formatDateTime(generatedAt)}</p>
      )}

      <div className="mt-5 flex items-center gap-3">
        <Button onClick={reset} variant="outline">
          <RefreshCw className="h-4 w-4" /> Reset 2FA &amp; regenerate code
        </Button>
        {justReset && (
          <span className="inline-flex items-center gap-1 text-sm text-success">
            <ShieldCheck className="h-4 w-4" /> New code generated
          </span>
        )}
      </div>

      <p className="mt-4 rounded-lg border border-border bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
        Shown here for testing. In production the code would be delivered through an authenticator app, SMS, or email
        rather than displayed on screen.
      </p>
    </Card>
  )
}
