import { createClient } from "@supabase/supabase-js"

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })

const email = "v0-verify+videos@creovixa.com"
const password = "Verify!2026#tmp"
const action = process.argv[2] || "create"

if (action === "create") {
  // Remove any leftover from a prior run
  const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 })
  const existing = list?.users?.find((u) => u.email === email)
  if (existing) await admin.auth.admin.deleteUser(existing.id)

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })
  if (error) { console.error("create error:", error.message); process.exit(1) }
  const id = data.user.id
  const { error: pErr } = await admin
    .from("profiles")
    .upsert({ id, email, role: "admin", password_changed: true, first_name: "Verify", last_name: "Bot" }, { onConflict: "id" })
  if (pErr) { console.error("profile error:", pErr.message); process.exit(1) }
  console.log("CREATED", email, password, id)
} else if (action === "delete") {
  const { data: list } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 })
  const existing = list?.users?.find((u) => u.email === email)
  if (existing) {
    await admin.from("profiles").delete().eq("id", existing.id)
    await admin.auth.admin.deleteUser(existing.id)
    console.log("DELETED", email)
  } else {
    console.log("NOT FOUND", email)
  }
}
