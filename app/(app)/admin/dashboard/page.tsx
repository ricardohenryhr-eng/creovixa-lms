import { redirect } from "next/navigation"

/**
 * `/admin/dashboard` is the canonical post-login landing path. The admin
 * dashboard itself is rendered at `/admin`, so this route forwards there,
 * keeping a stable, explicit dashboard URL for redirects and bookmarks.
 */
export default function AdminDashboardRedirect() {
  redirect("/admin")
}
