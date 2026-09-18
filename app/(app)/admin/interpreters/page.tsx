"use client"

import { useMemo, useState } from "react"
import { UserCheck, Award, CheckCircle2, Search, Ban } from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Button, Input, Avatar, Progress } from "@/components/ui"
import { teamUsers, type User } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function InterpreterManagementPage() {
  const [interpreters, setInterpreters] = useState<User[]>(() => teamUsers.filter((u) => u.role === "interpreter"))
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return interpreters.filter((u) => !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q))
  }, [interpreters, query])

  function toggleSuspend(id: string) {
    setInterpreters((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u)),
    )
  }

  const activeCount = interpreters.filter((u) => u.status === "active").length
  const totalCerts = interpreters.reduce((s, u) => s + u.certificates, 0)
  const avgProgress = interpreters.length
    ? Math.round(interpreters.reduce((s, u) => s + u.progress, 0) / interpreters.length)
    : 0

  return (
    <div>
      <PageHeader
        title="Interpreter management"
        subtitle="Track certified interpreters, their readiness, and account status."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Interpreters" value={interpreters.length} icon={<UserCheck className="h-5 w-5" />} tone="blue" hint={`${activeCount} active`} />
        <StatCard label="Active" value={activeCount} icon={<CheckCircle2 className="h-5 w-5" />} tone="green" hint="In good standing" />
        <StatCard label="Certificates" value={totalCerts} icon={<Award className="h-5 w-5" />} tone="orange" hint="Held collectively" />
        <StatCard label="Avg. readiness" value={`${avgProgress}%`} icon={<UserCheck className="h-5 w-5" />} tone="amber" hint="Training progress" />
      </div>

      <div className="relative mb-5 mt-6 max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search interpreters…" className="pl-9" aria-label="Search interpreters" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((u) => (
          <Card key={u.id} className="flex flex-col gap-4 p-5">
            <div className="flex items-start gap-3">
              <Avatar name={u.name} color={u.avatarColor} size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display font-semibold">{u.name}</p>
                <p className="truncate text-xs text-muted-foreground">{u.email}</p>
              </div>
              <Badge tone={u.status === "active" ? "green" : "red"}>{u.status === "active" ? "Active" : "Suspended"}</Badge>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                <span>Training readiness</span>
                <span className="font-medium text-foreground">{u.progress}%</span>
              </div>
              <Progress value={u.progress} tone={u.progress >= 80 ? "success" : "primary"} />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-muted/50 py-2">
                <p className="font-display text-lg font-bold">{u.coursesCompleted}</p>
                <p className="text-[11px] text-muted-foreground">Completed</p>
              </div>
              <div className="rounded-lg bg-muted/50 py-2">
                <p className="font-display text-lg font-bold">{u.coursesEnrolled}</p>
                <p className="text-[11px] text-muted-foreground">Enrolled</p>
              </div>
              <div className="rounded-lg bg-muted/50 py-2">
                <p className="font-display text-lg font-bold">{u.certificates}</p>
                <p className="text-[11px] text-muted-foreground">Certs</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">Joined {formatDate(u.joinedAt)}</span>
              <Button size="sm" variant={u.status === "active" ? "outline" : "primary"} onClick={() => toggleSuspend(u.id)}>
                {u.status === "active" ? <><Ban className="h-3.5 w-3.5" /> Suspend</> : <><CheckCircle2 className="h-3.5 w-3.5" /> Reactivate</>}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {filtered.length === 0 && (
        <Card className="p-10 text-center text-sm text-muted-foreground">No interpreters match your search.</Card>
      )}
    </div>
  )
}
