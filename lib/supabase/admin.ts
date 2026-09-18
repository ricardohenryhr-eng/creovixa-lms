import { createClient } from "@supabase/supabase-js"

/**
 * Service-role client. Bypasses RLS — use ONLY in trusted server code
 * (provisioning, admin actions) after the caller's admin role is verified.
 * Never import this into client components.
 */
export function createAdminClient() {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
