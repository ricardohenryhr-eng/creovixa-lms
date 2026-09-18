"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { DashboardShell } from "@/components/dashboard-shell"
import { AccountLocked } from "@/components/account-locked"
import { useAuth } from "@/lib/auth"
import { isLocked } from "@/lib/access"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace("/login")
  }, [loading, user, router])

  if (loading || !user) {
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
