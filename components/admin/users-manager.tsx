"use client"

import { useMemo, useState, useTransition, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import {
  Search,
  UserPlus,
  MoreVertical,
  Ban,
  Trash2,
  BookPlus,
  CircleCheck,
  X,
  ShieldCheck,
  ArrowUpCircle,
  Pencil,
  KeyRound,
  Send,
  Loader2,
} from "lucide-react"
import { PageHeader, Card, Badge, Button, Input, Avatar } from "@/components/ui"
import {
  ASSIGNABLE_ROLES,
  roleLabels,
  statusLabels,
  isSuperAdminEmail,
  type Profile,
  type Role,
  type AccountStatus,
} from "@/lib/roles"
import {
  createUser,
  assignCourses,
  suspendUser,
  reactivateUser,
  deleteUser,
  promoteToAdmin,
  updateUser,
  adminResetPassword,
  resendInvitation,
} from "@/app/actions/users"
import { cn, formatDate } from "@/lib/utils"

interface CourseOption {
  id: string
  title: string
  category: string
}
type Summary = Record<string, { assigned: number; completed: number; certificates: number; progress: number }>

const roleFilters: (Role | "all")[] = ["all", "admin", "interpreter", "student", "trainer"]
const avatarColors = ["#0f172a", "#f97316", "#0ea5e9", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"]

const statusTone: Record<AccountStatus, "green" | "amber" | "red" | "blue"> = {
  active: "green",
  reactivated: "blue",
  pending_first_login: "amber",
  suspended: "red",
}

function colorFor(email: string): string {
  let h = 0
  for (let i = 0; i < email.length; i++) h = (h * 31 + email.charCodeAt(i)) >>> 0
  return avatarColors[h % avatarColors.length]
}

export function UsersManager({
  profiles,
  courses,
  summary,
  canMakeAdmins,
  meEmail,
}: {
  profiles: Profile[]
  courses: CourseOption[]
  summary: Summary
  canMakeAdmins: boolean
  meEmail: string
}) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all")
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [assignFor, setAssignFor] = useState<Profile | null>(null)
  const [editFor, setEditFor] = useState<Profile | null>(null)
  const [pending, startTransition] = useTransition()
  const [toast, setToast] = useState<{ ok: boolean; msg: string } | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return profiles.filter((u) => {
      const matchesRole = roleFilter === "all" || u.role === roleFilter
      const matchesQuery = !q || u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      return matchesRole && matchesQuery
    })
  }, [profiles, query, roleFilter])

  function flash(res: { ok: boolean; error?: string; message?: string }) {
    setToast({ ok: res.ok, msg: res.ok ? (res.message ?? "Done.") : (res.error ?? "Something went wrong.") })
    setTimeout(() => setToast(null), 4000)
    if (res.ok) router.refresh()
  }

  function canModify(target: Profile): boolean {
    if (target.permanent || target.role === "super_admin") return false
    if (target.role === "admin") return isSuperAdminEmail(meEmail)
    return true
  }

  function act(fn: () => Promise<{ ok: boolean; error?: string; message?: string }>) {
    setMenuFor(null)
    startTransition(async () => {
      const res = await fn()
      flash(res)
    })
  }

  return (
    <div>
      <PageHeader
        title="User management"
        subtitle="Create, suspend, and assign courses to real platform accounts."
        action={
          <Button onClick={() => setShowAdd(true)}>
            <UserPlus className="h-4 w-4" /> Add user
          </Button>
        }
      />

      {toast && (
        <div
          className={cn(
            "mb-4 rounded-lg px-4 py-3 text-sm",
            toast.ok ? "bg-green-50 text-green-800" : "bg-red-50 text-destructive",
          )}
          role="status"
        >
          {toast.msg}
        </div>
      )}

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users…" className="pl-9" aria-label="Search users" />
        </div>
        <div className="flex flex-wrap gap-2">
          {roleFilters.map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium capitalize transition",
                roleFilter === r
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {r === "all" ? "All roles" : roleLabels[r]}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Progress</th>
                <th className="px-4 py-3 font-semibold">Last login</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u) => {
                const s = summary[u.id] ?? { assigned: 0, completed: 0, certificates: 0, progress: 0 }
                const permanent = u.permanent || u.role === "super_admin"
                return (
                  <tr key={u.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={u.full_name || u.email} color={colorFor(u.email)} size={36} />
                        <div className="min-w-0">
                          <p className="truncate font-medium">{u.full_name || u.email}</p>
                          <p className="truncate text-xs text-muted-foreground">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <Badge tone="muted">{roleLabels[u.role]}</Badge>
                        {permanent && (
                          <span
                            title="Permanent account — cannot be suspended or deleted"
                            className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary"
                          >
                            <ShieldCheck className="h-3 w-3" /> Permanent
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={statusTone[u.status]}>{statusLabels[u.status]}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${s.progress}%` }} />
                        </div>
                        <span className="whitespace-nowrap text-xs text-muted-foreground">
                          {s.completed}/{s.assigned} done
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{u.last_login ? formatDate(u.last_login) : "Never"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(u.created_at)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="relative inline-block">
                        <button
                          onClick={() => setMenuFor((m) => (m === u.id ? null : u.id))}
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                          aria-label={`Actions for ${u.full_name || u.email}`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {menuFor === u.id && (
                          <div className="absolute right-0 z-10 mt-1 w-56 overflow-hidden rounded-lg border border-border bg-popover p-1 text-left shadow-lg">
                            <button
                              onClick={() => {
                                setAssignFor(u)
                                setMenuFor(null)
                              }}
                              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                            >
                              <BookPlus className="h-4 w-4" /> Assign course
                            </button>
                            {canMakeAdmins && u.role !== "admin" && u.role !== "super_admin" && (
                              <button
                                onClick={() => act(() => promoteToAdmin(u.id))}
                                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                              >
                                <ArrowUpCircle className="h-4 w-4" /> Promote to Admin
                              </button>
                            )}
                            {canModify(u) ? (
                              <>
                                <button
                                  onClick={() => {
                                    setEditFor(u)
                                    setMenuFor(null)
                                  }}
                                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                                >
                                  <Pencil className="h-4 w-4" /> Edit user
                                </button>
                                <button
                                  onClick={() => act(() => adminResetPassword(u.id))}
                                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                                >
                                  <KeyRound className="h-4 w-4" /> Reset password
                                </button>
                                <button
                                  onClick={() => act(() => resendInvitation(u.id))}
                                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                                >
                                  <Send className="h-4 w-4" /> Resend invitation
                                </button>
                                {u.status === "suspended" ? (
                                  <button
                                    onClick={() => act(() => reactivateUser(u.id))}
                                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                                  >
                                    <CircleCheck className="h-4 w-4" /> Reactivate
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => act(() => suspendUser(u.id))}
                                    className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
                                  >
                                    <Ban className="h-4 w-4" /> Suspend
                                  </button>
                                )}
                                <button
                                  onClick={() => act(() => deleteUser(u.id))}
                                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" /> Delete
                                </button>
                              </>
                            ) : (
                              <p className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground">
                                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                                {permanent
                                  ? "Protected account — cannot be modified."
                                  : "Only a Super Admin can manage administrator accounts."}
                              </p>
                            )}
                          </div>
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
          <p className="py-12 text-center text-sm text-muted-foreground">
            {profiles.length === 0 ? "No users yet. Click “Add user” to create the first account." : "No users match your filters."}
          </p>
        )}
      </Card>

      {showAdd && (
        <AddUserModal
          canMakeAdmins={canMakeAdmins}
          courses={courses}
          pending={pending}
          onClose={() => setShowAdd(false)}
          onCreate={(input) =>
            startTransition(async () => {
              const res = await createUser(input)
              if (res.ok) setShowAdd(false)
              flash(res)
            })
          }
        />
      )}
      {assignFor && (
        <AssignModal
          user={assignFor}
          courses={courses}
          pending={pending}
          onClose={() => setAssignFor(null)}
          onAssign={(courseIds) =>
            startTransition(async () => {
              const res = await assignCourses({ userId: assignFor.id, courseIds })
              if (res.ok) setAssignFor(null)
              flash(res)
            })
          }
        />
      )}
      {editFor && (
        <EditUserModal
          user={editFor}
          canMakeAdmins={canMakeAdmins}
          pending={pending}
          onClose={() => setEditFor(null)}
          onSave={(input) =>
            startTransition(async () => {
              const res = await updateUser({ userId: editFor.id, ...input })
              if (res.ok) setEditFor(null)
              flash(res)
            })
          }
        />
      )}
    </div>
  )
}

function EditUserModal({
  user,
  canMakeAdmins,
  pending,
  onClose,
  onSave,
}: {
  user: Profile
  canMakeAdmins: boolean
  pending: boolean
  onClose: () => void
  onSave: (input: { firstName: string; lastName: string; role: Role }) => void
}) {
  // Admins may only be re-assigned by a Super Admin; keep the current role selectable.
  const roles: Role[] = canMakeAdmins ? ASSIGNABLE_ROLES : ASSIGNABLE_ROLES.filter((r) => r !== "admin")
  const [firstName, setFirstName] = useState(user.first_name ?? "")
  const [lastName, setLastName] = useState(user.last_name ?? "")
  const [role, setRole] = useState<Role>(user.role)

  function submit(e: FormEvent) {
    e.preventDefault()
    onSave({ firstName, lastName, role })
  }

  return (
    <Modal title={`Edit ${user.full_name || user.email}`} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">First name</span>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Last name</span>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </label>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Email address</span>
          <Input value={user.email} disabled className="opacity-70" />
          <span className="text-xs text-muted-foreground">Email is the account identifier and cannot be changed.</span>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Role</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {roleLabels[r]}
              </option>
            ))}
          </select>
          {!canMakeAdmins && <span className="text-xs text-muted-foreground">Only a Super Admin can grant the Admin role.</span>}
        </label>
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Save changes
          </Button>
        </div>
      </form>
    </Modal>
  )
}

function AddUserModal({
  canMakeAdmins,
  courses,
  pending,
  onClose,
  onCreate,
}: {
  canMakeAdmins: boolean
  courses: CourseOption[]
  pending: boolean
  onClose: () => void
  onCreate: (input: { firstName: string; lastName: string; email: string; role: Role; courseIds: string[] }) => void
}) {
  const roles: Role[] = canMakeAdmins ? ASSIGNABLE_ROLES : ASSIGNABLE_ROLES.filter((r) => r !== "admin")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<Role>("interpreter")
  const [selected, setSelected] = useState<string[]>([])

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  function submit(e: FormEvent) {
    e.preventDefault()
    onCreate({ firstName, lastName, email, role, courseIds: selected })
  }

  return (
    <Modal title="Add new user" onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">First name</span>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" required />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium">Last name</span>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" required />
          </label>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Email address</span>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@creovixa.com" required />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Role</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {roleLabels[r]}
              </option>
            ))}
          </select>
          {!canMakeAdmins && <span className="text-xs text-muted-foreground">Only a Super Admin can create administrator accounts.</span>}
        </label>
        <div className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Assigned courses</span>
          <div className="flex max-h-48 flex-col gap-2 overflow-y-auto rounded-lg border border-border p-2">
            {courses.map((c) => (
              <label
                key={c.id}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm transition",
                  selected.includes(c.id) ? "border-primary bg-accent/50" : "border-transparent hover:bg-muted",
                )}
              >
                <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggle(c.id)} className="h-4 w-4 accent-[var(--primary)]" />
                <span className="min-w-0 flex-1 truncate">{c.title}</span>
                <Badge tone="muted">{c.category}</Badge>
              </label>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            A welcome email with a temporary password and a course-assignment email are recorded automatically.
          </span>
        </div>
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={pending}>
            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
            Create user
          </Button>
        </div>
      </form>
    </Modal>
  )
}

function AssignModal({
  user,
  courses,
  pending,
  onClose,
  onAssign,
}: {
  user: Profile
  courses: CourseOption[]
  pending: boolean
  onClose: () => void
  onAssign: (courseIds: string[]) => void
}) {
  const [selected, setSelected] = useState<string[]>([])
  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }
  return (
    <Modal title={`Assign courses to ${user.full_name || user.email}`} onClose={onClose}>
      <div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
        {courses.map((c) => (
          <label
            key={c.id}
            className={cn(
              "flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition",
              selected.includes(c.id) ? "border-primary bg-accent/50" : "border-border hover:bg-muted",
            )}
          >
            <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggle(c.id)} className="h-4 w-4 accent-[var(--primary)]" />
            <span className="min-w-0 flex-1 truncate">{c.title}</span>
            <Badge tone="muted">{c.category}</Badge>
          </label>
        ))}
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={selected.length === 0 || pending} onClick={() => onAssign(selected)}>
          {pending && <Loader2 className="h-4 w-4 animate-spin" />}
          Assign {selected.length > 0 ? `(${selected.length})` : ""}
        </Button>
      </div>
    </Modal>
  )
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl border border-border bg-card shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="font-display font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
