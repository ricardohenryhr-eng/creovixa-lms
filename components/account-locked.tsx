"use client"

import { Lock, LogOut, ShieldAlert } from "lucide-react"
import { Logo } from "@/components/logo"
import { Badge, Button, Card } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { effectiveStatus, lockReason, statusLabels, statusTones, inactivityDays } from "@/lib/access"
import type { User } from "@/lib/data"

export function AccountLocked({ user }: { user: User }) {
  const { logout } = useAuth()
  const status = effectiveStatus(user)
  const idle = inactivityDays(user)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/30 px-4 py-10">
      <div className="mb-8">
        <Logo />
      </div>
      <Card className="w-full max-w-md p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-destructive">
          <Lock className="h-7 w-7" />
        </span>
        <div className="mt-4 flex items-center justify-center gap-2">
          <h1 className="font-display text-xl font-bold tracking-tight">Access unavailable</h1>
          <Badge tone={statusTones[status]}>{statusLabels[status]}</Badge>
        </div>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">{lockReason(user)}</p>

        {status === "expired" && idle !== null && (
          <div className="mt-5 flex items-center gap-3 rounded-lg border border-border bg-background p-3 text-left">
            <ShieldAlert className="h-5 w-5 shrink-0 text-amber-500" />
            <p className="text-xs text-muted-foreground">
              Inactive for <span className="font-semibold text-foreground">{idle} days</span>. Ask a Super Admin or
              Admin to reactivate or extend your access from the Access Management console.
            </p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-2">
          <a href="mailto:admin@creovixa.com">
            <Button className="w-full">Contact administrator</Button>
          </a>
          <Button variant="ghost" onClick={logout} className="w-full">
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </Card>
      <p className="mt-6 text-xs text-muted-foreground">© {new Date().getFullYear()} Creovixa Language Services</p>
    </div>
  )
}
