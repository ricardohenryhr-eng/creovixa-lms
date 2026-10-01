import type { Certificate } from "@/lib/data"

/** Special wording reserved for the final medical program certificate only. */
export const MEDICAL_PROGRAM_TITLE = "40-Hour Medical Interpreter Training"
export const MEDICAL_PROGRAM_HOURS = 40
export const MEDICAL_PROGRAM_DESCRIPTION =
  "This certifies that the learner has successfully completed the full 40-Hour Medical Interpreter Training Program and all required assessments."

export function isMedicalCertificate(cert: Pick<Certificate, "certId" | "variant">) {
  return cert.variant === "medical" || cert.certId.split("-")[1]?.toUpperCase() === "MED"
}

/** Shape of a row in the public.certificates table. */
export interface CertificateRow {
  id: string
  cert_id: string
  user_id: string | null
  recipient: string
  course_slug: string | null
  course_title: string
  score: number
  hours: number | null
  variant: "standard" | "medical"
  issued_at: string
  expires_at: string | null
}

/** Map a DB row to the UI Certificate shape, computing valid/expired status. */
export function rowToCertificate(row: CertificateRow): Certificate {
  const expiresAt = row.expires_at ?? ""
  const expired = expiresAt ? Date.now() > new Date(expiresAt).getTime() : false
  return {
    id: row.id,
    certId: row.cert_id,
    courseTitle: row.course_title,
    recipient: row.recipient,
    issuedAt: row.issued_at,
    expiresAt,
    score: row.score,
    status: expired ? "expired" : "valid",
    variant: row.variant,
    hours: row.hours ?? undefined,
  }
}
