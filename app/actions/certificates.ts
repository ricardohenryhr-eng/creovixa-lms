"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import {
  MEDICAL_PROGRAM_HOURS,
  MEDICAL_PROGRAM_TITLE,
  rowToCertificate,
  type CertificateRow,
} from "@/lib/certificates"
import { orderedCourses, courseAssessment } from "@/lib/curriculum"
import type { Certificate } from "@/lib/data"

const COLUMNS = "id, cert_id, user_id, recipient, course_slug, course_title, score, hours, variant, issued_at, expires_at"

export interface IssueCertificateInput {
  certId: string
  recipient: string
  courseSlug?: string | null
  courseTitle: string
  score: number
  hours?: number | null
  variant?: "standard" | "medical"
  issuedAt?: string
  expiresAt?: string | null
}

/**
 * Persist a newly earned certificate for the signed-in learner. Idempotent:
 * re-issuing the same cert_id is a no-op, so the record is permanent and stable
 * across sessions. RLS enforces that the row belongs to the caller.
 */
export async function issueCertificate(input: IssueCertificateInput): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { ok: false, error: "Not authenticated" }

  // The client never decides what a certificate says: the course, title,
  // hours, and passing threshold all come from the server-side curriculum.
  const course = orderedCourses.find((c) => c.slug === input.courseSlug)
  if (!course) return { ok: false, error: "Unknown course" }
  if (!input.certId.startsWith(`CVX-${course.certPrefix}-`)) return { ok: false, error: "Invalid certificate ID" }

  const score = Math.round(input.score)
  if (!Number.isFinite(score) || score < 0 || score > 100) return { ok: false, error: "Invalid score" }
  const assessment = courseAssessment(course.id)
  if (assessment && score < assessment.passingScore) {
    return { ok: false, error: `Final exam not passed (requires ${assessment.passingScore}%)` }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .maybeSingle<{ full_name: string | null }>()
  const recipient = profile?.full_name?.trim() || input.recipient.trim()
  if (!recipient) return { ok: false, error: "Missing learner name" }

  const medical = course.certPrefix === "MED"

  const { error } = await supabase.from("certificates").upsert(
    {
      cert_id: input.certId,
      user_id: user.id,
      recipient,
      course_slug: course.slug,
      course_title: medical ? MEDICAL_PROGRAM_TITLE : course.title,
      score,
      hours: medical ? MEDICAL_PROGRAM_HOURS : course.hours ?? null,
      variant: medical ? "medical" : "standard",
      issued_at: input.issuedAt ?? new Date().toISOString(),
      expires_at: input.expiresAt && input.expiresAt.length > 0 ? input.expiresAt : null,
    },
    { onConflict: "cert_id", ignoreDuplicates: true },
  )

  if (error) {
    console.log("[v0] issueCertificate error:", error.message)
    return { ok: false, error: error.message }
  }
  return { ok: true }
}

/** List the signed-in learner's persisted certificates (RLS-scoped to them). */
export async function listMyCertificates(): Promise<Certificate[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data, error } = await supabase
    .from("certificates")
    .select(COLUMNS)
    .eq("user_id", user.id)
    .order("issued_at", { ascending: false })

  if (error) {
    console.log("[v0] listMyCertificates error:", error.message)
    return []
  }
  return (data as CertificateRow[]).map(rowToCertificate)
}

/**
 * List every persisted certificate for the Admin dashboard. Verifies the caller
 * is an admin, then reads through the service role so the full roster (including
 * seeded records with no owning user) is returned.
 */
export async function listAllCertificates(): Promise<Certificate[]> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return []

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single<{ role: string }>()
  if (!profile || (profile.role !== "admin" && profile.role !== "super_admin")) return []

  const admin = createAdminClient()
  const { data, error } = await admin.from("certificates").select(COLUMNS).order("issued_at", { ascending: false })
  if (error) {
    console.log("[v0] listAllCertificates error:", error.message)
    return []
  }
  return (data as CertificateRow[]).map(rowToCertificate)
}

/**
 * Public certificate verification by ID. Looks up a single record through the
 * service role (a scoped, read-only lookup safe for the public /verify page and
 * QR scans). Returns null when the ID is unknown.
 */
export async function verifyCertificate(certId: string): Promise<Certificate | null> {
  const trimmed = certId.trim()
  if (!trimmed) return null

  const admin = createAdminClient()
  const { data, error } = await admin.from("certificates").select(COLUMNS).eq("cert_id", trimmed).maybeSingle()

  if (error) {
    console.log("[v0] verifyCertificate error:", error.message)
    return null
  }
  if (!data) return null
  return rowToCertificate(data as CertificateRow)
}
