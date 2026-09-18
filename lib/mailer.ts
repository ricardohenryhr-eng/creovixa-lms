import "server-only"
import nodemailer, { type Transporter } from "nodemailer"

/**
 * Zoho Mail SMTP transport for all Creovixa transactional email.
 *
 * Credentials come from environment variables:
 *   ZOHO_SMTP_USER      full Zoho mailbox login (e.g. admin@creovixa.com)
 *   ZOHO_SMTP_PASSWORD  Zoho app-specific password (NOT the account password)
 *   ZOHO_SMTP_HOST      optional, defaults to smtp.zoho.com
 *   ZOHO_SMTP_PORT      optional, defaults to 465 (SSL). Use 587 for STARTTLS.
 *
 * Zoho requires the SMTP login to match the From address's mailbox, so the
 * envelope sender is always the authenticated Zoho user.
 */
const HOST = process.env.ZOHO_SMTP_HOST ?? "smtp.zoho.com"
const PORT = Number(process.env.ZOHO_SMTP_PORT ?? "465")
const USER = process.env.ZOHO_SMTP_USER
const PASSWORD = process.env.ZOHO_SMTP_PASSWORD

let cached: Transporter | null = null

export function isMailerConfigured(): boolean {
  return Boolean(USER && PASSWORD)
}

function getTransport(): Transporter {
  if (!USER || !PASSWORD) {
    throw new Error(
      "Zoho SMTP is not configured. Set ZOHO_SMTP_USER and ZOHO_SMTP_PASSWORD (an app-specific password).",
    )
  }
  if (cached) return cached
  cached = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    // Port 465 uses implicit TLS (secure=true); 587 upgrades via STARTTLS.
    secure: PORT === 465,
    auth: { user: USER, pass: PASSWORD },
  })
  return cached
}

export interface SmtpMessage {
  to: string
  fromName: string
  fromAddress: string
  subject: string
  text: string
}

/** Deliver a plain-text message through Zoho SMTP. Throws on failure. */
export async function sendViaZoho(msg: SmtpMessage): Promise<string> {
  const transport = getTransport()
  const info = await transport.sendMail({
    // Display name uses the branded From; the envelope stays the Zoho login.
    from: `${msg.fromName} <${msg.fromAddress}>`,
    sender: USER,
    to: msg.to,
    subject: msg.subject,
    text: msg.text,
  })
  return info.messageId
}
