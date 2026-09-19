import Link from "next/link"
import { ShieldCheck, ShieldX, CheckCircle2, Search } from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, Card, Badge } from "@/components/ui"
import { CertificatePreview } from "@/components/certificate-preview"
import { verifyCertificate } from "@/app/actions/certificates"
import { formatDate } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function VerifyByIdPage({ params }: { params: Promise<{ certificateId: string }> }) {
  const { certificateId } = await params
  const id = decodeURIComponent(certificateId)
  const result = await verifyCertificate(id)

  return (
    <div className="flex min-h-screen flex-col bg-muted/30">
      <header className="border-b border-border bg-background no-print">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/"><Logo /></Link>
          <Link href="/login"><Button variant="outline" size="sm">Sign in</Button></Link>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 py-12 sm:py-16">
        <div className="mx-auto w-full max-w-2xl">
          <div className="text-center no-print">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight">Certificate verification</h1>
            <p className="mt-2 text-muted-foreground">
              Verifying certificate <span className="font-mono font-medium text-foreground">{id}</span>
            </p>
          </div>

          <div className="mt-8">
            {result ? (
              <div>
                <Card className="mb-5 flex items-center gap-3 border-success/30 bg-green-50 p-4 no-print">
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
              <Card className="flex flex-col items-start gap-3 border-destructive/30 bg-red-50 p-5 no-print sm:flex-row sm:items-center">
                <ShieldX className="h-6 w-6 shrink-0 text-destructive" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-red-800">No certificate found</p>
                  <p className="text-xs text-red-700">
                    We couldn&apos;t find a certificate matching &ldquo;{id}&rdquo;. Check the ID and try again.
                  </p>
                </div>
                <Link href="/verify">
                  <Button variant="outline" size="sm"><Search className="h-4 w-4" /> Search by ID</Button>
                </Link>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
