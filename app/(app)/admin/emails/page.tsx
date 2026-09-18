import { Mail, Inbox } from "lucide-react"
import { PageHeader, Card, Badge } from "@/components/ui"
import { getEmailLog } from "@/lib/queries"
import { formatDateTime } from "@/lib/utils"

export const dynamic = "force-dynamic"

const kindTone: Record<string, "blue" | "green" | "amber" | "muted"> = {
  welcome: "blue",
  course_assignment: "green",
  password_reset: "amber",
  general: "muted",
}

const kindLabel: Record<string, string> = {
  welcome: "Welcome",
  course_assignment: "Course assigned",
  password_reset: "Password reset",
  general: "General",
}

const statusTone: Record<string, "green" | "amber" | "red" | "muted"> = {
  sent: "green",
  logged: "amber",
  failed: "red",
}

const statusLabel: Record<string, string> = {
  sent: "Delivered via Zoho",
  logged: "Logged (SMTP not configured)",
  failed: "Delivery failed",
}

export default async function EmailOutboxPage() {
  const emails = await getEmailLog()

  return (
    <div>
      <PageHeader
        title="Email outbox"
        subtitle="Every transactional message is delivered through Zoho Mail SMTP and recorded here with its delivery status. Temporary passwords appear in welcome emails and are visible only to admins."
      />

      <div className="mb-5 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
        Sender for all messages: <span className="font-medium text-foreground">Creovixa Learn &lt;admin@creovixa.com&gt;</span>
      </div>

      {emails.length === 0 ? (
        <Card className="py-16 text-center">
          <Inbox className="mx-auto h-8 w-8 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">No emails recorded yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Create a user or assign a course to generate messages.</p>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {emails.map((e) => (
            <Card key={e.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-primary" />
                    <p className="font-display font-semibold">{e.subject}</p>
                    <Badge tone={kindTone[e.kind] ?? "muted"}>{kindLabel[e.kind] ?? e.kind}</Badge>
                    <Badge tone={statusTone[e.delivery_status] ?? "muted"}>
                      {statusLabel[e.delivery_status] ?? e.delivery_status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    From {e.from_name} &lt;{e.from_email}&gt; · To{" "}
                    <span className="font-medium text-foreground">{e.to_email}</span>
                  </p>
                  {e.delivery_status === "failed" && e.error && (
                    <p className="mt-1 text-xs text-destructive">Error: {e.error}</p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">{formatDateTime(e.created_at)}</span>
              </div>
              <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-muted/50 p-4 font-sans text-sm leading-relaxed text-foreground">
                {e.body}
              </pre>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
