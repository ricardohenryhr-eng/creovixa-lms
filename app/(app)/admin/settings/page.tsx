"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { PageHeader, Card, Button, Input } from "@/components/ui"

const brandColors = [
  { name: "Dark Blue", hex: "#0F172A" },
  { name: "Orange", hex: "#F97316" },
  { name: "White", hex: "#FFFFFF" },
]

const toggles = [
  { id: "enroll", label: "Course enrollment notifications", desc: "Email learners when they are enrolled in a course." },
  { id: "certs", label: "Certificate notifications", desc: "Notify learners when a certificate is issued." },
  { id: "exam", label: "Exam result notifications", desc: "Send automatic score reports after assessments." },
  { id: "digest", label: "Weekly admin digest", desc: "Summary of completions and new sign-ups." },
]

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ enroll: true, certs: true, exam: true, digest: false })

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <PageHeader title="Platform settings" subtitle="Configure branding, defaults, and notifications." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold">Organization</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5"><span className="text-sm font-medium">Organization name</span><Input defaultValue="Creovixa Language Services" /></label>
              <label className="flex flex-col gap-1.5"><span className="text-sm font-medium">Support email</span><Input defaultValue="support@creovixa.com" /></label>
              <label className="flex flex-col gap-1.5"><span className="text-sm font-medium">Website</span><Input defaultValue="https://www.creovixa.com" /></label>
              <label className="flex flex-col gap-1.5"><span className="text-sm font-medium">Default language</span>
                <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </label>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold">Notifications</h2>
            <div className="mt-4 flex flex-col divide-y divide-border">
              {toggles.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-4 py-3.5">
                  <div>
                    <p className="text-sm font-medium">{t.label}</p>
                    <p className="text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                  <button
                    role="switch"
                    aria-checked={enabled[t.id]}
                    onClick={() => setEnabled((p) => ({ ...p, [t.id]: !p[t.id] }))}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${enabled[t.id] ? "bg-primary" : "bg-muted-foreground/30"}`}
                  >
                    <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${enabled[t.id] ? "left-[22px]" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Button onClick={save}>Save settings</Button>
              {saved && <span className="inline-flex items-center gap-1 text-sm text-success"><Check className="h-4 w-4" /> Saved</span>}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold">Brand colors</h2>
            <p className="mt-1 text-sm text-muted-foreground">Creovixa primary palette.</p>
            <div className="mt-4 flex flex-col gap-3">
              {brandColors.map((c) => (
                <div key={c.hex} className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-lg border border-border" style={{ backgroundColor: c.hex }} />
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="font-mono text-xs text-muted-foreground">{c.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-lg font-semibold">Certificate defaults</h2>
            <div className="mt-4 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5"><span className="text-sm font-medium">Validity period</span>
                <select className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option>2 years</option>
                  <option>1 year</option>
                  <option>3 years</option>
                </select>
              </label>
              <label className="flex flex-col gap-1.5"><span className="text-sm font-medium">ID prefix</span><Input defaultValue="CVX" /></label>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
