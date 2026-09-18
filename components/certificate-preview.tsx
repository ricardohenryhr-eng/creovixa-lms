"use client"

import { QRCodeSVG } from "qrcode.react"
import { Award, ShieldCheck } from "lucide-react"
import { BrandLogo } from "@/components/logo"
import { Signature } from "@/components/signature"
import { formatDate } from "@/lib/utils"
import type { Certificate } from "@/lib/data"

const SIGNATORIES = [
  { key: "ricardo", name: "Ricardo Henry", title: "Chief Executive Officer (CEO)" },
  { key: "belson", name: "Belson Bugotte", title: "Training Director" },
  { key: "anderson", name: "Anderson Verger", title: "Human Resources Manager (HR)" },
] as const

function verificationUrl(certId: string) {
  const base = typeof window !== "undefined" ? window.location.origin : "https://creovixa.com"
  return `${base}/verify?id=${encodeURIComponent(certId)}`
}

export function CertificatePreview({ cert }: { cert: Certificate }) {
  const verifyUrl = verificationUrl(cert.certId)

  return (
    <div className="relative overflow-hidden rounded-xl border-4 border-double border-secondary bg-card p-6 sm:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 15% 15%, #0f172a 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center text-center">
        <div className="flex w-full items-center justify-between gap-4">
          <BrandLogo />
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Award className="h-6 w-6" />
          </span>
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Certificate of Completion</p>
        <p className="mt-4 text-sm text-muted-foreground">This certifies that</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">{cert.recipient}</h2>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">has successfully completed the certification course</p>
        <p className="mt-2 font-display text-xl font-bold">{cert.courseTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          with a final score of <span className="font-semibold text-foreground">{cert.score}%</span>
        </p>

        <div className="mt-8 grid w-full max-w-lg grid-cols-2 gap-4 border-t border-border pt-6 text-left sm:grid-cols-3">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Date of completion</p>
            <p className="text-sm font-medium">{formatDate(cert.issuedAt)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Valid until</p>
            <p className="text-sm font-medium">{formatDate(cert.expiresAt)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Certificate No.</p>
            <p className="font-mono text-sm font-medium">{cert.certId}</p>
          </div>
        </div>

        <div className="mt-8 flex w-full max-w-lg flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid flex-1 grid-cols-3 gap-3">
            {SIGNATORIES.map((s) => (
              <div key={s.key} className="flex flex-col items-center text-center">
                <Signature nameKey={s.key} className="h-9 w-full text-secondary" />
                <span className="mt-1 h-px w-full bg-border" />
                <span className="mt-1.5 text-[11px] font-semibold leading-tight text-foreground">{s.name}</span>
                <span className="text-[9px] leading-tight text-muted-foreground">{s.title}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center">
            <span className="rounded-lg border border-border bg-white p-1.5">
              <QRCodeSVG value={verifyUrl} size={72} level="M" />
            </span>
            <span className="mt-1.5 text-[9px] uppercase tracking-wide text-muted-foreground">Scan to verify</span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-success" />
          Verify at creovixa.com/verify · Creovixa Language Services
        </div>
      </div>
    </div>
  )
}
