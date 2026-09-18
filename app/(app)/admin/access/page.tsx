"use client"

import { useMemo, useRef, useState } from "react"
import {
  KeyRound,
  Search,
  Clock,
  AlertTriangle,
  Ban,
  CheckCircle2,
  CalendarPlus,
  BellRing,
  UserCog,
  ChevronDown,
} from "lucide-react"
import { PageHeader, Card, StatCard, Badge, Button, Input, Avatar } from "@/components/ui"
import { teamUsers, type User, type Role } from "@/lib/data"
import {
  INACTIVITY_LIMIT_DAYS,
  REMINDER_DAYS,
  EXTEND_OPTIONS,
  effectiveStatus,
  statusLabels,
  statusTones,
  inactivityDays,
  daysToExpiry,
  accessExpiry,
  notificationsFor,
  reactivate,
  suspend,
  extendAccess,
  approve,
} from "@/lib/access"
import { formatDate } from "@/lib/utils"

const ROLE_FILTERS: { value: Role | "all"; label: string }[] = [
  { value: "interpreter", label: "Interpreters" },
  { value: "student", label: "Students" },
  { value: "trainer", label: "Trainers" },
  { value: "all", label: "All learners" },
]

const STATUS_FILTERS = ["all", "active", "reactivated", "pending", "suspended", "expired"] as const
type StatusFilter = (typeof STATUS_FILTERS)[number]

// Access management covers learner and trainer accounts, not admins.
const MANAGED_ROLES: Role[] = ["interpreter", "student", "trainer"]

export default function AccessManagementPage() {
  const [users, setUsers] = useState<User[]>(() => teamUsers.filter((u) => MANAGED_ROLES.includes(u.role)))
  const [query, setQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<Role | "all">("interpreter")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [feedback, setFeedback] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return users.filter((u) => {
      if (roleFilter !== "all" && u.role !== roleFilter) return false
      if (statusFilter !== "all" && effectiveStatus(u) !== statusFilter) return false
      if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false
      return true
    })
  }, [users, query, roleFilter, statusFilter])

  const counts = useMemo(() => {
    let active = 0
    let expiring = 0
    let locked = 0
    let pending = 0
    for (const u of users) {
      const s = effectiveStatus(u)
      if (s === "active" || s === "reactivated") {
        active++
        const left = daysToExpiry(u)
        if (left !== null && left >= 0 && left <= 5) expiring++
      }
      if (s === "suspended" || s === "expired") locked++
      if (s === "pending") pending++
    }
    return { active, expiring, locked, pending }
  }, [users])

  const reports = useMemo(() => users.flatMap(notificationsFor), [users])

  function apply(id: string, fn: (u: User) => User, note: (u: User) => string) {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u
        const next = fn(u)
        setFeedback(note(next))
        return next
      }),
    )
  }

  return (
    <div>
      <PageHeader
        title="Access management"
        subtitle={`Interpreter LMS access expires automatically after ${INACTIVITY_LIMIT_DAYS} days of inactivity. Reactivate, suspend, or extend accounts here.`}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active access" value={counts.active} icon={<CheckCircle2 className="h-5 w-5" />} tone="green" hint="Within their window" />
        <StatCard label="Expiring soon" value={counts.expiring} icon={<Clock className="h-5 w-5" />} tone="amber" hint="≤ 5 days left" />
        <StatCard label="Locked" value={counts.locked} icon={<Ban className="h-5 w-5" />} tone="red" hint="Suspended or expired" />
        <StatCard label="Pending approval" value={counts.pending} icon={<UserCog className="h-5 w-5" />} tone="blue" hint="Awaiting activation" />
      </div>

      {feedback && (
        <div className="mt-6 flex items-center gap-2 rounded-lg border border-primary/30 bg-accent/40 px-4 py-3 text-sm" role="status">
          <BellRing className="h-4 w-4 shrink-0 text-primary" />
          <span>{feedback}</span>
          <button onClick={() => setFeedback(null)} className="ml-auto text-xs text-muted-foreground hover:text-foreground">
            Dismiss
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[240px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email…"
            className="pl-9"
            aria-label="Search accounts"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ROLE_FILTERS.map((r) => (
            <FilterChip key={r.value} active={roleFilter === r.value} onClick={() => setRoleFilter(r.value)}>
              {r.label}
            </FilterChip>
          ))}
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {STATUS_FILTERS.map((s) => (
          <FilterChip key={s} active={statusFilter === s} onClick={() => setStatusFilter(s)}>
            {s === "all" ? "All statuses" : statusLabels[s]}
          </FilterChip>
        ))}
      </div>

      {/* Accounts table */}
      <Card className="mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-4 py-3 font-medium">Account</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Last login</th>
                <th className="px-4 py-3 font-medium">Inactivity</th>
                <th className="px-4 py-3 font-medium">Access expires</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u) => {
                const status = effectiveStatus(u)
                const idle = inactivityDays(u)
                const left = daysToExpiry(u)
                const expiry = accessExpiry(u)
                const locked = status === "suspended" || status === "expired"
                return (
                  <tr key={u.id} className="align-middle">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.name} color={u.avatarColor} size={36} />
                        <div className="min-w-0">
                          <p className="truncate font-medium">{u.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={statusTones[status]}>{statusLabels[status]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {u.lastLoginAt ? formatDate(u.lastLoginAt) : "Never"}
                    </td>
                    <td className="px-4 py-3">
                      {idle === null ? (
                        <span className="text-muted-foreground">—</span>
                      ) : (
                        <span className={idle >= INACTIVITY_LIMIT_DAYS ? "font-medium text-destructive" : "text-foreground"}>
                          {idle} day{idle === 1 ? "" : "s"}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {status === "pending" ? (
                        <span className="text-muted-foreground">—</span>
                      ) : status === "suspended" ? (
                        <span className="text-muted-foreground">Disabled</span>
                      ) : left !== null && left < 0 ? (
                        <span className="font-medium text-destructive">Lapsed {expiry ? formatDate(expiry.toISOString()) : ""}</span>
                      ) : (
                        <span className={left !== null && left <= 5 ? "font-medium text-amber-600" : "text-foreground"}>
                          {expiry ? formatDate(expiry.toISOString()) : "—"}
                          {left !== null && left >= 0 && <span className="text-muted-foreground"> · {left}d left</span>}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        {status === "pending" ? (
                          <Button
                            size="sm"
                            onClick={() => apply(u.id, (x) => approve(x), (x) => `${x.name} approved — access granted and welcome notification sent.`)}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                          </Button>
                        ) : locked ? (
                          <Button
                            size="sm"
                            onClick={() => apply(u.id, (x) => reactivate(x), (x) => `${x.name} reactivated — access restored and user notified.`)}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5" /> Reactivate
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => apply(u.id, (x) => suspend(x), (x) => `${x.name} suspended — access disabled and user notified.`)}
                          >
                            <Ban className="h-3.5 w-3.5" /> Suspend
                          </Button>
                        )}
                        {status !== "pending" && (
                          <ExtendMenu
                            onExtend={(days) =>
                              apply(
                                u.id,
                                (x) => extendAccess(x, days),
                                (x) => `${x.name}'s access extended by ${days} days (now through ${
                                  accessExpiry(x) ? formatDate(accessExpiry(x)!.toISOString()) : ""
                                }).`,
                              )
                            }
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="p-10 text-center text-sm text-muted-foreground">No accounts match your filters.</p>
        )}
      </Card>

      {/* Inactivity reports & notifications */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-4 flex items-center gap-2">
            <BellRing className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg font-semibold">Inactivity reports &amp; notifications</h2>
          </div>
          {reports.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">No pending access notifications.</p>
          ) : (
            <ul className="flex flex-col divide-y divide-border">
              {reports.map((n) => (
                <li key={`${n.userId}-${n.kind}`} className="flex items-center gap-3 py-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      n.kind === "suspended"
                        ? "bg-red-100 text-destructive"
                        : n.kind === "restored"
                          ? "bg-sky-100 text-sky-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {n.kind === "suspended" ? (
                      <Ban className="h-4 w-4" />
                    ) : n.kind === "restored" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{n.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{n.message}</p>
                  </div>
                  <span className="hidden text-xs text-muted-foreground sm:block">{n.email}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="mb-3 font-display text-lg font-semibold">Access policy</h2>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Access expires automatically after <span className="font-medium text-foreground">&nbsp;{INACTIVITY_LIMIT_DAYS} days</span>&nbsp;of inactivity.
            </li>
            <li className="flex gap-2">
              <BellRing className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Reminders sent {REMINDER_DAYS.join(" and ")} days before expiration.
            </li>
            <li className="flex gap-2">
              <Ban className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Locked accounts lose access to courses, certificates, materials, quizzes, and dashboards.
            </li>
            <li className="flex gap-2">
              <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Only Super Admins and Admins can reactivate or extend access.
            </li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:bg-muted"
      }`}
    >
      {children}
    </button>
  )
}

function ExtendMenu({ onExtend }: { onExtend: (days: number) => void }) {
  const [open, setOpen] = useState(false)
  const [custom, setCustom] = useState("")
  const ref = useRef<HTMLDivElement>(null)

  function choose(days: number) {
    onExtend(days)
    setOpen(false)
    setCustom("")
  }

  function applyCustom() {
    const n = Number.parseInt(custom, 10)
    if (Number.isFinite(n) && n > 0) choose(n)
  }

  return (
    <div className="relative" ref={ref}>
      <Button size="sm" variant="ghost" onClick={() => setOpen((o) => !o)} aria-haspopup="menu" aria-expanded={open}>
        <CalendarPlus className="h-3.5 w-3.5" /> Extend <ChevronDown className="h-3 w-3" />
      </Button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden="true" />
          <div className="absolute right-0 z-20 mt-1 w-48 rounded-lg border border-border bg-card p-1.5 shadow-lg" role="menu">
            {EXTEND_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => choose(d)}
                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                role="menuitem"
              >
                Extend {d} days
              </button>
            ))}
            <div className="mt-1 border-t border-border px-2 pb-1 pt-2">
              <p className="mb-1.5 text-xs text-muted-foreground">Custom duration</p>
              <div className="flex items-center gap-1.5">
                <Input
                  type="number"
                  min={1}
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.nativeEvent.isComposing) applyCustom()
                  }}
                  placeholder="Days"
                  className="h-9"
                  aria-label="Custom days"
                />
                <Button size="sm" onClick={applyCustom}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
