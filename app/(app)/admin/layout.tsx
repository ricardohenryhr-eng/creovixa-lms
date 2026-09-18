"use client"

import Link from "next/link"
import { ShieldAlert } from "lucide-react"
import { Button, Card } from "@/components/ui"
import { useAuth } from "@/lib/auth"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const isAdmin = user?.role === "admin" || user?.role === "super_admin"

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md py-16">
        <Card className="p-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-destructive">
            <ShieldAlert className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-display text-xl font-bold">Admin access only</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You don&apos;t have permission to view this area. Sign in with an admin account to continue.
          </p>
          <Link href="/dashboard" className="mt-6 inline-block">
            <Button variant="outline">Back to dashboard</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
