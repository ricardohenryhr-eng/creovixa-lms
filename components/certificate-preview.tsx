import { Award, ShieldCheck } from "lucide-react"
import { Logo } from "@/components/logo"
import { formatDate } from "@/lib/utils"
import type { Certificate } from "@/lib/data"

export function CertificatePreview({ cert }: { cert: Certificate }) {
  return (
    <div className="relative overflow-hidden rounded-xl border-4 border-double border-secondary bg-card p-8 sm:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle at 15% 15%, #0f172a 1.5px, transparent 1.5px)",
          backgroundSize: "26px 26px",
        }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center text-center">
        <div className="flex w-full items-center justify-between">
          <Logo />
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <Award className="h-5 w-5" />
          </span>
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.25em] text-primary">Certificate of Completion</p>
        <p className="mt-4 text-sm text-muted-foreground">This certifies that</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">{cert.recipient}</h2>
        <p className="mt-4 max-w-md text-sm text-muted-foreground">has successfully completed the certification course</p>
        <p className="mt-2 font-display text-xl font-bold">{cert.courseTitle}</p>
        <p className="mt-1 text-sm text-muted-foreground">with a final score of <span className="font-semibold text-foreground">{cert.score}%</span></p>

        <div className="mt-8 grid w-full max-w-lg grid-cols-3 gap-4 border-t border-border pt-6 text-left">
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Issued</p>
            <p className="text-sm font-medium">{formatDate(cert.issuedAt)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Valid until</p>
            <p className="text-sm font-medium">{formatDate(cert.expiresAt)}</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">Certificate ID</p>
            <p className="text-sm font-medium">{cert.certId}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-success" />
          Verify at creovixa.com/verify · Creovixa Language Services
        </div>
      </div>
    </div>
  )
}
