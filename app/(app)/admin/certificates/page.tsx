"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Award, CheckCircle2, XCircle, Lock, Search, ArrowRight, Eye, Download, X, ExternalLink } from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Button, Input, Avatar } from "@/components/ui"
import { certificates, courses, type Certificate } from "@/lib/data"
import { CertificatePreview } from "@/components/certificate-preview"
import { cn, formatDate } from "@/lib/utils"

type StatusFilter = "all" | "valid" | "expired"
const filters: StatusFilter[] = ["all", "valid", "expired"]

export default function CertificateManagementPage() {
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState<StatusFilter>("all")
  const [active, setActive] = useState<Certificate | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return certificates.filter((c) => {
      const matchesStatus = status === "all" || c.status === status
      const matchesQuery =
        !q || c.recipient.toLowerCase().includes(q) || c.certId.toLowerCase().includes(q) || c.courseTitle.toLowerCase().includes(q)
      return matchesStatus && matchesQuery
    })
  }, [query, status])

  const validCount = certificates.filter((c) => c.status === "valid").length
  const expiredCount = certificates.filter((c) => c.status === "expired").length
  const restrictedCount = courses.filter((c) => c.cert.adminReleaseOnly).length

  return (
    <div>
      <PageHeader
        title="Certificate management"
        subtitle="Review issued certificates, validity, and protected releases."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Issued" value={certificates.length + 38} icon={<Award className="h-5 w-5" />} tone="green" hint="This year" />
        <StatCard label="Valid" value={validCount} icon={<CheckCircle2 className="h-5 w-5" />} tone="blue" hint="Currently active" />
        <StatCard label="Expired" value={expiredCount} icon={<XCircle className="h-5 w-5" />} tone="red" hint="Need renewal" />
        <StatCard label="Restricted" value={restrictedCount} icon={<Lock className="h-5 w-5" />} tone="amber" hint="Admin release only" />
      </div>

      <Card className="mt-6 flex flex-wrap items-center justify-between gap-3 border-primary/30 bg-accent/40 p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Lock className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display font-semibold">Protected certificates</p>
            <p className="text-sm text-muted-foreground">The Medical Interpreter certificate is released manually after its waiting period.</p>
          </div>
        </div>
        <Link href="/admin/certificate-release">
          <Button variant="outline">Release control <ArrowRight className="h-4 w-4" /></Button>
        </Link>
      </Card>

      <div className="mb-5 mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by recipient, ID, or course…" className="pl-9" aria-label="Search certificates" />
        </div>
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setStatus(f)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium capitalize transition",
                status === f ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Certificate ID</th>
                <th className="px-4 py-3 font-semibold">Recipient</th>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">Issued</th>
                <th className="px-4 py-3 font-semibold">Expires</th>
                <th className="px-4 py-3 font-semibold">Score</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{c.certId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={c.recipient} size={30} />
                      <span className="font-medium">{c.recipient}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{c.courseTitle}</td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(c.issuedAt)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.expiresAt ? formatDate(c.expiresAt) : "Never"}</td>
                  <td className="px-4 py-3 font-medium">{c.score}%</td>
                  <td className="px-4 py-3">
                    <Badge tone={c.status === "valid" ? "green" : "red"}>{c.status === "valid" ? "Valid" : "Expired"}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="outline" onClick={() => setActive(c)}>
                      <Eye className="h-4 w-4" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No certificates match your filters.</p>}
      </Card>

      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setActive(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between no-print">
              <div className="flex gap-2">
                <Button size="sm" onClick={() => window.print()}>
                  <Download className="h-4 w-4" /> Download PDF
                </Button>
                <Link href={`/verify/${active.certId}`}>
                  <Button size="sm" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    <ExternalLink className="h-4 w-4" /> Verify
                  </Button>
                </Link>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20"
              >
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
