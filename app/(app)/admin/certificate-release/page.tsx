import { Lock, Clock, ShieldCheck } from "lucide-react"
import { PageHeader, Card } from "@/components/ui"
import { AdminCertApprovals } from "@/components/admin-cert-approvals"

const rules = [
  {
    icon: Lock,
    title: "Admin release only",
    desc: "Protected certificates are never issued automatically. An administrator must release each one manually.",
  },
  {
    icon: Clock,
    title: "Six-month waiting period",
    desc: "The Medical Interpreter certificate becomes eligible only six months after the learner completes the program.",
  },
  {
    icon: ShieldCheck,
    title: "Revocable at any time",
    desc: "A released certificate can be revoked if standing changes, immediately removing learner access.",
  },
]

export default function CertificateReleasePage() {
  return (
    <div>
      <PageHeader
        title="Certificate release control"
        subtitle="Govern the issuance of protected, restricted certificates."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {rules.map((r) => (
          <Card key={r.title} className="p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
              <r.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 font-display font-semibold">{r.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{r.desc}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <AdminCertApprovals />
      </div>
    </div>
  )
}
