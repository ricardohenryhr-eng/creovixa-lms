"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShieldAlert } from "lucide-react"
import { Button, Card } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { canAccessAdmin, canAccessSection, sectionForPath } from "@/lib/admin"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const pathname = usePathname()

  const role = user?.role
  const hasAdmin = role ? canAccessAdmin(role) : false
  const section = sectionForPath(pathname)
  const allowed = role ? hasAdmin && canAccessSection(role, section) : false

  if (!allowed) {
    return (
      <div className="mx-auto max-w-md py-16">
        <Card className="p-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-xl font-bold">
            {hasAdmin ? "Restricted section" : "Admin access only"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {hasAdmin
              ? "Your role doesn't have permission to view this part of the admin console."
              : "You don't have permission to view this area. Sign in with an admin account to continue."}
          </p>
          <Link href={hasAdmin ? "/admin" : "/dashboard"} className="mt-6 inline-block">
            <Button variant="outline">{hasAdmin ? "Back to admin panel" : "Back to dashboard"}</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
