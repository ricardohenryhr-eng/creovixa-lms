"use client"

import { Suspense, useEffect, useState, type FormEvent } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Search, ShieldCheck, ShieldX, CheckCircle2, Loader2 } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, Input, Card, Badge } from "@/components/ui"
import { CertificatePreview } from "@/components/certificate-preview"
import type { Certificate } from "@/lib/data"
import { verifyCertificate } from "@/app/actions/certificates"
import { formatDate } from "@/lib/utils"

function VerifyInner() {
  const params = useSearchParams()
  const initial = params.get("id") ?? ""
  const [query, setQuery] = useState(initial)
  const [searched, setSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Certificate | null>(null)

  async function runSearch(value: string) {
    const trimmed = value.trim()
    if (!trimmed) return
    setLoading(true)
    setSearched(true)
    const found = await verifyCertificate(trimmed)
    setResult(found)
    setLoading(false)
  }

  // Auto-verify when arriving with ?id=... (e.g. from a saved link).
  useEffect(() => {
    if (initial.trim()) void runSearch(initial)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function submit(e: FormEvent) {
    e.preventDefault()
    void runSearch(query)
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">Certificate verification</h1>
        <p className="mt-2 text-muted-foreground">Enter a certificate ID to confirm its authenticity.</p>
      </div>

      <form onSubmit={submit} className="mt-8 flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. CVX-MED-2024-0192"
            className="pl-9"
            aria-label="Certificate ID"
          />
        </div>
        <Button type="submit" size="md" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
        </Button>
      </form>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Try a sample: <button type="button" onClick={() => { setQuery("CVX-MED-2024-0192"); void runSearch("CVX-MED-2024-0192") }} className="font-medium text-primary hover:underline">CVX-MED-2024-0192</button>
      </p>

      {searched && (
        <div className="mt-8">
          {loading ? (
            <Card className="flex items-center gap-3 p-5 text-sm text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" /> Checking the certificate register…
            </Card>
          ) : result ? (
            <div>
              <Card className="mb-5 flex items-center gap-3 border-success/30 bg-green-50 p-4">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm font-semibold text-green-800">Valid certificate</p>
                  <p className="text-xs text-green-700">
                    Issued to {result.recipient} · {result.status === "valid" ? "Active" : "Expired"} ·{" "}
                    {result.expiresAt ? `Expires ${formatDate(result.expiresAt)}` : "No expiration"}
                  </p>
                </div>
                <Badge tone={result.status === "valid" ? "green" : "red"} className="ml-auto">
                  {result.status === "valid" ? "Valid" : "Expired"}
                </Badge>
              </Card>
              <CertificatePreview cert={result} />
            </div>
          ) : (
            <Card className="flex items-center gap-3 border-destructive/30 bg-red-50 p-5">
              <ShieldX className="h-6 w-6 text-destructive" />
              <div>
                <p className="text-sm font-semibold text-red-800">No certificate found</p>
                <p className="text-xs text-red-700">We couldn&apos;t find a certificate matching &ldquo;{query}&rdquo;. Check the ID and try again.</p>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

export default function VerifyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/"><Logo /></Link>
          <Link href="/login"><Button variant="outline" size="sm">Sign in</Button></Link>
        </div>
      </header>
      <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
        <Suspense fallback={<div className="text-sm text-muted-foreground">Loading…</div>}>
          <VerifyInner />
        </Suspense>
      </main>
    </div>
  )
}
