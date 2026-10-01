"use client"

import { useState, useTransition } from "react"
import useSWR from "swr"
import { CheckCircle2, Loader2, Lock, Upload } from "lucide-react"
import { PageHeader, Card, Badge, Button, Input } from "@/components/ui"
import { CertificatePreview } from "@/components/certificate-preview"
import { useAuth } from "@/lib/auth"
import type { Certificate } from "@/lib/data"
import { formatDate } from "@/lib/utils"
import {
  activateCertificateTemplate,
  listCertificateTemplates,
  uploadCertificateTemplate,
  type CertificateTemplate,
} from "@/app/actions/certificate-templates"

const SAMPLE: Omit<Certificate, "templateStandardUrl" | "templateMedicalUrl"> = {
  id: "preview",
  certId: "CVX-COC-2026-0001",
  courseTitle: "Code of Conduct",
  recipient: "Jordan Ellis",
  issuedAt: "2026-09-18T00:00:00.000Z",
  expiresAt: "2027-09-18T00:00:00.000Z",
  score: 96,
  status: "valid",
}

export default function CertificateTemplatesPage() {
  const { user } = useAuth()
  const canManage = user?.role === "super_admin"
  const { data: templates = [], isLoading, mutate } = useSWR("certificate-templates", () => listCertificateTemplates())
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [message, setMessage] = useState<{ tone: "success" | "danger"; text: string } | null>(null)
  const [pending, startTransition] = useTransition()

  const selected = templates.find((t) => t.id === selectedId) ?? templates.find((t) => t.isActive) ?? templates[0]

  function handleUpload(formData: FormData) {
    setMessage(null)
    startTransition(async () => {
      const result = await uploadCertificateTemplate(formData)
      setMessage(result.ok ? { tone: "success", text: "Template uploaded." } : { tone: "danger", text: result.error ?? "Upload failed." })
      if (result.ok) await mutate()
    })
  }

  function handleActivate(template: CertificateTemplate) {
    setMessage(null)
    startTransition(async () => {
      const result = await activateCertificateTemplate(template.id)
      setMessage(
        result.ok
          ? { tone: "success", text: `"${template.name}" is now the active template for new certificates.` }
          : { tone: "danger", text: result.error ?? "Could not activate the template." },
      )
      if (result.ok) await mutate()
    })
  }

  return (
    <div>
      <PageHeader
        title="Certificate templates"
        subtitle="The official design every certificate is printed on. New certificates use the active template; issued certificates keep theirs."
      />

      {message ? (
        <p
          role="status"
          className={`mb-4 rounded-md border px-4 py-2.5 text-sm ${message.tone === "success" ? "border-success/30 bg-success/10 text-success" : "border-danger/30 bg-danger/10 text-danger"}`}
        >
          {message.text}
        </p>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Card className="p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-foreground">Live preview{selected ? ` · ${selected.name}` : ""}</h2>
            <span className="text-xs text-muted-foreground">Sample learner data</span>
          </div>
          {selected ? (
            <div className="flex flex-col gap-6">
              <CertificatePreview cert={{ ...SAMPLE, templateStandardUrl: selected.standardUrl, templateMedicalUrl: selected.medicalUrl }} />
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">40-Hour Medical variant</p>
                <CertificatePreview
                  cert={{
                    ...SAMPLE,
                    certId: "CVX-MED-2026-0001",
                    courseTitle: "40-Hour Medical Interpreter Training",
                    variant: "medical",
                    hours: 40,
                    templateStandardUrl: selected.standardUrl,
                    templateMedicalUrl: selected.medicalUrl,
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">{isLoading ? "Loading templates…" : "No templates yet."}</p>
          )}
        </Card>

        <div className="flex flex-col gap-6">
          <Card className="p-4">
            <h2 className="mb-3 text-sm font-semibold text-foreground">Templates</h2>
            <ul className="flex flex-col gap-2">
              {templates.map((t) => (
                <li key={t.id}>
                  <div
                    className={`flex flex-col gap-2 rounded-md border p-3 ${selected?.id === t.id ? "border-primary bg-primary/5" : "border-border"}`}
                  >
                    <button type="button" onClick={() => setSelectedId(t.id)} className="flex items-center gap-3 text-left">
                      <img src={t.originalUrl || "/placeholder.svg"} alt="" className="h-10 w-14 rounded-sm object-cover" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-foreground">{t.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          {t.width} × {t.height} · {formatDate(t.createdAt)}
                        </span>
                      </span>
                    </button>
                    <div className="flex items-center justify-between gap-2">
                      {t.isActive ? (
                        <Badge tone="green">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">{t.isDefault ? "Official master" : "Inactive"}</span>
                      )}
                      {canManage && !t.isActive ? (
                        <Button size="sm" variant="outline" disabled={pending} onClick={() => handleActivate(t)}>
                          Make active
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-4">
            <h2 className="mb-1 text-sm font-semibold text-foreground">Upload a new template</h2>
            {canManage ? (
              <form action={handleUpload} className="flex flex-col gap-3">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  PNG or JPEG up to 4 MB, using the official landscape layout (1280 × 993 proportions). Field positions stay the same, so keep
                  the name, course, dates, number and QR areas where they are.
                </p>
                <label className="flex flex-col gap-1 text-xs font-medium text-foreground">
                  Name
                  <Input name="name" required maxLength={120} placeholder="e.g. 2027 Official Template" />
                </label>
                <label className="flex flex-col gap-1 text-xs font-medium text-foreground">
                  Image
                  <Input name="file" type="file" required accept="image/png,image/jpeg" />
                </label>
                <label className="flex items-start gap-2 text-xs text-foreground">
                  <input type="checkbox" name="hasSampleText" defaultChecked className="mt-0.5" />
                  Design contains sample text in the field areas (erase it automatically)
                </label>
                <label className="flex items-start gap-2 text-xs text-foreground">
                  <input type="checkbox" name="activate" className="mt-0.5" />
                  Make active for new certificates
                </label>
                <Button type="submit" disabled={pending}>
                  {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {pending ? "Processing…" : "Upload template"}
                </Button>
              </form>
            ) : (
              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3.5 w-3.5" /> Only a Super Admin can upload or activate templates.
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
