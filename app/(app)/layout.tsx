"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { AccountLocked } from "@/components/account-locked"
import { AdminLogin } from "@/components/admin-login"
import { useAuth } from "@/lib/auth"
import { isLocked } from "@/lib/access"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // The admin console lives at /admin. When reached while signed out it acts as
  // a hidden, secure admin portal instead of bouncing to the learner sign-in.
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/")

  useEffect(() => {
    if (!loading && !user && !isAdminPath) router.replace("/login")
  }, [loading, user, isAdminPath, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    if (isAdminPath) return <AdminLogin />
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  // A locked account (suspended / pending / expired) cannot reach any learner
  // content — dashboards, courses, certificates, materials, or quizzes.
  if (isLocked(user)) {
    return <AccountLocked user={user} />
  }

  return <DashboardShell>{children}</DashboardShell>
}
