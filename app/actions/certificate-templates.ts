"use server"

import { revalidatePath } from "next/cache"
import sharp from "sharp"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { cleanTemplate, matchesMasterLayout } from "@/lib/certificate-cleaner"

export interface CertificateTemplate {
  id: string
  name: string
  originalUrl: string
  standardUrl: string
  medicalUrl: string
  width: number
  height: number
  isActive: boolean
  isDefault: boolean
  createdAt: string
}

interface TemplateRow {
  id: string
  name: string
  original_url: string
  standard_url: string
  medical_url: string
  width: number
  height: number
  is_active: boolean
  is_default: boolean
  created_at: string
}

const MAX_BYTES = 4 * 1024 * 1024
const BUCKET = "certificate-templates"

function toTemplate(r: TemplateRow): CertificateTemplate {
  return {
    id: r.id,
    name: r.name,
    originalUrl: r.original_url,
    standardUrl: r.standard_url,
    medicalUrl: r.medical_url,
    width: r.width,
    height: r.height,
    isActive: r.is_active,
    isDefault: r.is_default,
    createdAt: r.created_at,
  }
}

/** Returns the caller's id only when they are a Super Admin. */
async function requireSuperAdmin(): Promise<string | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle<{ role: string }>()
  return profile?.role === "super_admin" ? user.id : null
}

export async function listCertificateTemplates(): Promise<CertificateTemplate[]> {
  const admin = createAdminClient()
  const { data, error } = await admin.from("certificate_templates").select("*").order("created_at", { ascending: false })
  if (error) {
    console.log("[v0] listCertificateTemplates error:", error.message)
    return []
  }
  return (data as TemplateRow[]).map(toTemplate)
}

export async function uploadCertificateTemplate(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const userId = await requireSuperAdmin()
  if (!userId) return { ok: false, error: "Only a Super Admin can manage certificate templates." }

  const file = formData.get("file")
  const name = String(formData.get("name") ?? "").trim().slice(0, 120)
  const hasSampleText = formData.get("hasSampleText") === "on"
  const activate = formData.get("activate") === "on"

  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "Choose a template image to upload." }
  if (!name) return { ok: false, error: "Give the template a name." }
  if (!["image/png", "image/jpeg"].includes(file.type)) return { ok: false, error: "Upload a PNG or JPEG image." }
  if (file.size > MAX_BYTES) return { ok: false, error: "The image must be 4 MB or smaller." }

  const input = Buffer.from(await file.arrayBuffer())
  let width = 0
  let height = 0
  try {
    const meta = await sharp(input).metadata()
    width = meta.width ?? 0
    height = meta.height ?? 0
  } catch {
    return { ok: false, error: "That file could not be read as an image." }
  }
  if (!matchesMasterLayout(width, height)) {
    return {
      ok: false,
      error: `The template must use the official landscape layout (1280 × 993 proportions, at least 1000px wide). This image is ${width} × ${height}.`,
    }
  }

  // When the design still carries sample wording, erase it from the field
  // areas; otherwise keep the upload exactly as provided.
  const standard = hasSampleText ? await cleanTemplate(input, { removeTitle: false }) : await sharp(input).png().toBuffer()
  const medical = await cleanTemplate(input, { removeTitle: true })

  const admin = createAdminClient()
  const folder = `${Date.now()}-${crypto.randomUUID()}`
  const ext = file.type === "image/png" ? "png" : "jpg"
  const uploads: [string, Buffer, string][] = [
    [`${folder}/original.${ext}`, input, file.type],
    [`${folder}/standard.png`, standard, "image/png"],
    [`${folder}/medical.png`, medical, "image/png"],
  ]
  const urls: string[] = []
  for (const [path, body, contentType] of uploads) {
    const { error } = await admin.storage.from(BUCKET).upload(path, body, { contentType, upsert: false })
    if (error) {
      console.log("[v0] template upload error:", error.message)
      return { ok: false, error: "Uploading the template failed. Please try again." }
    }
    urls.push(admin.storage.from(BUCKET).getPublicUrl(path).data.publicUrl)
  }

  const { data: inserted, error } = await admin
    .from("certificate_templates")
    .insert({
      name,
      original_url: urls[0],
      standard_url: urls[1],
      medical_url: urls[2],
      width,
      height,
      created_by: userId,
    })
    .select("id")
    .single<{ id: string }>()
  if (error || !inserted) {
    console.log("[v0] template insert error:", error?.message)
    return { ok: false, error: "Saving the template failed. Please try again." }
  }

  if (activate) return activateCertificateTemplate(inserted.id)
  revalidatePath("/admin/certificate-templates")
  return { ok: true }
}

export async function activateCertificateTemplate(id: string): Promise<{ ok: boolean; error?: string }> {
  if (!(await requireSuperAdmin())) return { ok: false, error: "Only a Super Admin can manage certificate templates." }

  const admin = createAdminClient()
  const { data: target } = await admin.from("certificate_templates").select("id").eq("id", id).maybeSingle()
  if (!target) return { ok: false, error: "Template not found." }

  const { error: clearError } = await admin.from("certificate_templates").update({ is_active: false }).eq("is_active", true)
  if (clearError) return { ok: false, error: clearError.message }
  const { error } = await admin.from("certificate_templates").update({ is_active: true }).eq("id", id)
  if (error) return { ok: false, error: error.message }

  revalidatePath("/admin/certificate-templates")
  return { ok: true }
}
