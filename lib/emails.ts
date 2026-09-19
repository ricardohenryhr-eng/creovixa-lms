import "server-only"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendViaZoho, isMailerConfigured } from "@/lib/mailer"

/**
 * Canonical sender. Every platform message is From: Creovixa Learn <admin@creovixa.com>.
 * Ricardo Henry's personal address is never used as a sender.
 */
export const EMAIL_FROM_NAME = "Creovixa Learn"
export const EMAIL_FROM_ADDRESS = "admin@creovixa.com"

/** Branded login URL shown in onboarding emails. */
export const LOGIN_URL = "https://lms.creovixa.com/user/signin"

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
 * Send a transactional email through Zoho Mail SMTP, then record it in
 * public.email_log (the durable outbox) with the real delivery result.
 *
 * If Zoho SMTP credentials are not configured yet, the message is still logged
 * with delivery_status = 'logged' so provisioning never fails silently; once
 * ZOHO_SMTP_USER / ZOHO_SMTP_PASSWORD are set, delivery happens automatically.
 *
 * Delivery failures do NOT throw: the caller's operation (e.g. creating a user)
 * must succeed even if the mail server is briefly unreachable. The failure is
 * captured in the outbox so an admin can resend.
 */
export async function sendEmail(msg: EmailMessage): Promise<void> {
  const admin = createAdminClient()

  let deliveryStatus = "logged"
  let provider = "none"
  let providerMessageId: string | null = null
  let errorText: string | null = null

  if (isMailerConfigured()) {
    provider = "zoho"
    try {
      providerMessageId = await sendViaZoho({
        to: msg.to,
        fromName: EMAIL_FROM_NAME,
        fromAddress: EMAIL_FROM_ADDRESS,
        subject: msg.subject,
        text: msg.body,
      })
      deliveryStatus = "sent"
    } catch (err) {
      deliveryStatus = "failed"
      errorText = err instanceof Error ? err.message : "Unknown SMTP error"
      console.log("[v0] Zoho SMTP send failed:", errorText)
    }
  }

  const { error } = await admin.from("email_log").insert({
    to_email: msg.to,
    from_name: EMAIL_FROM_NAME,
    from_email: EMAIL_FROM_ADDRESS,
    subject: msg.subject,
    body: msg.body,
    kind: msg.kind,
    delivery_status: deliveryStatus,
    provider,
    provider_message_id: providerMessageId,
    error: errorText,
  })
  if (error) {
    console.log("[v0] email_log insert failed:", error.message)
  }
}

export function welcomeEmail(params: {
  fullName: string
  email: string
  tempPassword: string
  courses: string[]
  invitedBy: string
}): EmailMessage {
  // Phrase the enrollment line to match the number of assigned courses.
  const enrollmentBlock =
    params.courses.length === 0
      ? `Your Creovixa LMS account has been created.`
      : `You have been enrolled in the following course(s):

${courseListText(params.courses)}`

  const body = `Hello ${params.fullName},

${enrollmentBlock}

To access your training, please log in here:
${LOGIN_URL}

Email: ${params.email}
Temporary Password: ${params.tempPassword}

For security reasons, you will be required to create your own password after your first login.

${FOOTER}`
  return { to: params.email, subject: "Welcome to Creovixa LMS", body, kind: "welcome" }
}

export function passwordResetEmail(params: {
  fullName: string
  email: string
  resetLink: string
}): EmailMessage {
  const greetingName = params.fullName?.trim() ? params.fullName : "there"
  const body = `Hello ${greetingName},

We received a request to reset the password for your Creovixa LMS account (${params.email}).

To choose a new password, click the link below:

${params.resetLink}

If you did not request a password reset, you can safely ignore this email and your password will remain unchanged.

${FOOTER}`
  return { to: params.email, subject: "Reset your Creovixa LMS password", body, kind: "password_reset" }
}

export function adminResetEmail(params: {
  fullName: string
  email: string
  tempPassword: string
}): EmailMessage {
  const greetingName = params.fullName?.trim() ? params.fullName : "there"
  const body = `Hello ${greetingName},

Your Creovixa LMS password has been reset by an administrator.

To access your training, please log in here:
${LOGIN_URL}

Email: ${params.email}
Temporary Password: ${params.tempPassword}

For security reasons, you will be required to create your own password after your next login.

${FOOTER}`
  return { to: params.email, subject: "Your Creovixa LMS password has been reset", body, kind: "password_reset" }
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
