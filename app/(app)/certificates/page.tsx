"use client"

import { useState } from "react"
import Link from "next/link"
import { Award, Download, X, ShieldCheck, ExternalLink } from "lucide-react"
import { PageHeader, Card, Badge, Button } from "@/components/ui"
import { CertificatePreview } from "@/components/certificate-preview"
import { certificates, type Certificate } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function CertificatesPage() {
  const [active, setActive] = useState<Certificate | null>(null)

  return (
    <div>
      <PageHeader
        title="Certificates"
        subtitle="Your earned certifications, each with a unique verifiable ID."
        action={
          <Link href="/verify">
            <Button variant="outline"><ShieldCheck className="h-4 w-4" /> Verify a certificate</Button>
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c) => (
          <Card key={c.id} className="flex flex-col p-5">
            <div className="flex items-start justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Award className="h-5 w-5" />
              </span>
              <Badge tone={c.status === "valid" ? "green" : "red"}>{c.status === "valid" ? "Valid" : "Expired"}</Badge>
            </div>
            <h3 className="mt-4 font-display font-semibold leading-snug">{c.courseTitle}</h3>
            <p className="mt-1 font-mono text-xs text-muted-foreground">{c.certId}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span>Issued {formatDate(c.issuedAt)}</span>
              <span>Score {c.score}%</span>
            </div>
            <Button variant="outline" className="mt-4 w-full" onClick={() => setActive(c)}>
              View certificate
            </Button>
          </Card>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setActive(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <div className="flex gap-2">
                <Button size="sm" onClick={() => window.print()}>
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
                <Link href={`/verify?id=${active.certId}`}>
                  <Button size="sm" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    <ExternalLink className="h-4 w-4" /> Verify
                  </Button>
                </Link>
              </div>
              <button onClick={() => setActive(null)} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </button>
            </div>
            <CertificatePreview cert={active} />
          </div>
        </div>
      )}
    </div>
  )
}
