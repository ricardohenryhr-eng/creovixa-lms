"use server"

import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { rowToCertificate, type CertificateRow } from "@/lib/certificates"
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

  const { error } = await supabase.from("certificates").upsert(
    {
      cert_id: input.certId,
      user_id: user.id,
      recipient: input.recipient,
      course_slug: input.courseSlug ?? null,
      course_title: input.courseTitle,
      score: Math.round(input.score),
      hours: input.hours ?? null,
      variant: input.variant ?? "standard",
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
