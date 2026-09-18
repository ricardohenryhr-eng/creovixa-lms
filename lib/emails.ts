import "server-only"
import { createAdminClient } from "@/lib/supabase/admin"

/**
 * Canonical sender. Every platform message is From: Creovixa Learn <admin@creovixa.com>.
 * Ricardo Henry's personal address is never used as a sender.
 */
export const EMAIL_FROM_NAME = "Creovixa Learn"
export const EMAIL_FROM_ADDRESS = "admin@creovixa.com"

/** Branded login URL shown in onboarding emails. */
export const LOGIN_URL = "https://lms.creovixa.com/user/sign-in"

const FOOTER = `Regards,

Creovixa Learn

--

Please do not reply to this message.
Mail sent to this address cannot be answered.`

function courseListText(courses: string[]): string {
  if (!courses.length) return "No courses assigned yet."
  return courses.map((c) => `- ${c}`).join("\n")
}

export interface EmailMessage {
  to: string
  subject: string
  body: string
  kind: string
}

/**
 * "Send" an email. Because no delivery provider is connected yet, the message
 * is persisted to public.email_log (the durable outbox) instead of being
 * transmitted. Swapping in a real provider later only changes this function.
 */
export async function sendEmail(msg: EmailMessage): Promise<void> {
  const admin = createAdminClient()
  const { error } = await admin.from("email_log").insert({
    to_email: msg.to,
    from_name: EMAIL_FROM_NAME,
    from_email: EMAIL_FROM_ADDRESS,
    subject: msg.subject,
    body: msg.body,
    kind: msg.kind,
  })
  if (error) {
    console.log("[v0] email_log insert failed:", error.message)
    throw new Error("Failed to record outbound email")
  }
}

export function welcomeEmail(params: {
  fullName: string
  email: string
  tempPassword: string
  courses: string[]
}): EmailMessage {
  const body = `Hello ${params.fullName},

Your Creovixa LMS account has been created successfully.

Login URL:

${LOGIN_URL}

Email:
${params.email}

Temporary Password:
${params.tempPassword}

For security reasons, you must create your own password during your first login.

Assigned Courses:
${courseListText(params.courses)}

${FOOTER}`
  return { to: params.email, subject: "Welcome to Creovixa LMS", body, kind: "welcome" }
}

export function courseAssignmentEmail(params: {
  fullName: string
  email: string
  courses: string[]
}): EmailMessage {
  const body = `Hello ${params.fullName},

You have been enrolled in the following course(s):

${courseListText(params.courses)}

To take this course please log on to:

${LOGIN_URL}

${FOOTER}`
  return { to: params.email, subject: "New Training Assigned", body, kind: "course_assignment" }
}
