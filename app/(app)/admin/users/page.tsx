"use client"

import { useMemo, useState, type FormEvent } from "react"
import { Search, UserPlus, MoreVertical, Ban, Trash2, BookPlus, CircleCheck, X, ShieldCheck } from "lucide-react"
import { PageHeader, Card, Badge, Button, Input, Avatar } from "@/components/ui"
import { teamUsers, roleLabels, courses, type User, type Role } from "@/lib/data"
import { useAuth } from "@/lib/auth"
import { canManageAdmins } from "@/lib/admin"
import { canModifyAccount, isPermanent } from "@/lib/access"
import { cn, formatDate } from "@/lib/utils"

const roleFilters: (Role | "all")[] = ["all", "admin", "interpreter", "student", "trainer"]
const avatarColors = ["#0f172a", "#f97316", "#0ea5e9", "#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"]

export default function UsersPage() {
  const { user } = useAuth()
  const canMakeAdmins = user ? canManageAdmins(user.role) : false
  const [users, setUsers] = useState<User[]>(teamUsers)
  const [query, setQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all")
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [assignFor, setAssignFor] = useState<User | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return users.filter((u) => {
      const matchesRole = roleFilter === "all" || u.role === roleFilter
      const matchesQuery = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      return matchesRole && matchesQuery
    })
  }, [users, query, roleFilter])

  function toggleSuspend(id: string) {
    const target = users.find((u) => u.id === id)
    if (!target || !canModifyAccount(user, target)) return
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: u.status === "active" ? "suspended" : "active" } : u)))
    setMenuFor(null)
  }

  function remove(id: string) {
    const target = users.find((u) => u.id === id)
    if (!target || !canModifyAccount(user, target)) return
    setUsers((prev) => prev.filter((u) => u.id !== id))
    setMenuFor(null)
  }

  function addUser(user: User) {
    setUsers((prev) => [user, ...prev])
    setShowAdd(false)
  }

  return (
    <div>
      <PageHeader
        title="User management"
        subtitle="Add, edit, suspend, and assign courses to your members."
        action={<Button onClick={() => setShowAdd(true)}><UserPlus className="h-4 w-4" /> Add user</Button>}
      />

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
                roleFilter === r ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {r === "all" ? "All roles" : roleLabels[r]}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">User</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Progress</th>
                <th className="px-4 py-3 font-semibold">Joined</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-muted/30">
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
                    <div className="flex items-center gap-1.5">
                      <Badge tone="muted">{roleLabels[u.role]}</Badge>
                      {isPermanent(u) && (
                        <span
                          title="Permanent account — cannot be suspended or deleted"
                          className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary"
                        >
                          <ShieldCheck className="h-3 w-3" /> Permanent
                        </span>
                      )}
                    </div>
                    {u.title && <p className="mt-1 text-xs text-muted-foreground">{u.title}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone={u.status === "active" ? "green" : "red"}>{u.status === "active" ? "Active" : "Suspended"}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-muted">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${u.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{u.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(u.joinedAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setMenuFor((m) => (m === u.id ? null : u.id))}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
                        aria-label={`Actions for ${u.name}`}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {menuFor === u.id && (
                        <div className="absolute right-0 z-10 mt-1 w-52 overflow-hidden rounded-lg border border-border bg-popover p-1 text-left shadow-lg">
                          <button onClick={() => { setAssignFor(u); setMenuFor(null) }} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
                            <BookPlus className="h-4 w-4" /> Assign course
                          </button>
                          {canModifyAccount(user, u) ? (
                            <>
                              <button onClick={() => toggleSuspend(u.id)} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
                                {u.status === "active" ? <><Ban className="h-4 w-4" /> Suspend</> : <><CircleCheck className="h-4 w-4" /> Reactivate</>}
                              </button>
                              <button onClick={() => remove(u.id)} className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive hover:bg-red-50">
                                <Trash2 className="h-4 w-4" /> Delete
                              </button>
                            </>
                          ) : (
                            <p className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground">
                              <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
                              {isPermanent(u)
                                ? "Protected account — cannot be suspended or deleted."
                                : "Only a Super Admin can manage administrator accounts."}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No users match your filters.</p>}
      </Card>

      {showAdd && <AddUserModal canMakeAdmins={canMakeAdmins} onClose={() => setShowAdd(false)} onAdd={addUser} />}
      {assignFor && <AssignModal user={assignFor} onClose={() => setAssignFor(null)} />}
    </div>
  )
}

function AddUserModal({
  canMakeAdmins,
  onClose,
  onAdd,
}: {
  canMakeAdmins: boolean
  onClose: () => void
  onAdd: (u: User) => void
}) {
  // Only a Super Admin may create administrator accounts; everyone else who
  // can reach this screen may invite learners and trainers only.
  const assignableRoles: Role[] = canMakeAdmins
    ? ["super_admin", "admin", "trainer", "interpreter", "student"]
    : ["trainer", "interpreter", "student"]

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<Role>(assignableRoles.includes("interpreter") ? "interpreter" : assignableRoles[0])

  const isAdminRole = role === "super_admin" || role === "admin"

  function submit(e: FormEvent) {
    e.preventDefault()
    onAdd({
      id: `u-${Date.now()}`,
      name: name || "New User",
      email: email || "new.user@creovixa.com",
      role,
      status: "active",
      avatarColor: avatarColors[Math.floor(Math.random() * avatarColors.length)],
      joinedAt: new Date().toISOString().slice(0, 10),
      coursesEnrolled: 0,
      coursesCompleted: 0,
      certificates: 0,
      progress: 0,
    })
  }

  return (
    <Modal title="Add new user" onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5"><span className="text-sm font-medium">Full name</span><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" required /></label>
        <label className="flex flex-col gap-1.5"><span className="text-sm font-medium">Email</span><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@creovixa.com" required /></label>
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium">Role</span>
          <select value={role} onChange={(e) => setRole(e.target.value as Role)} className="h-10 rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {assignableRoles.map((r) => (
              <option key={r} value={r}>{roleLabels[r]}</option>
            ))}
          </select>
          {!canMakeAdmins && (
            <span className="text-xs text-muted-foreground">Only a Super Admin can create administrator accounts.</span>
          )}
          {isAdminRole && (
            <span className="text-xs text-muted-foreground">
              New administrators must set up two-factor authentication on first sign in.
            </span>
          )}
        </label>
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">Add user</Button>
        </div>
      </form>
    </Modal>
  )
}

function AssignModal({ user, onClose }: { user: User; onClose: () => void }) {
  const [selected, setSelected] = useState<string[]>([])
  const [done, setDone] = useState(false)

  function toggle(id: string) {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <Modal title={`Assign courses to ${user.name}`} onClose={onClose}>
      {done ? (
        <div className="py-6 text-center">
          <CircleCheck className="mx-auto h-10 w-10 text-success" />
          <p className="mt-3 text-sm font-medium">Assigned {selected.length} course{selected.length === 1 ? "" : "s"}.</p>
          <Button className="mt-4" onClick={onClose}>Done</Button>
        </div>
      ) : (
        <>
          <div className="flex max-h-72 flex-col gap-2 overflow-y-auto">
            {courses.map((c) => (
              <label key={c.id} className={cn("flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition", selected.includes(c.id) ? "border-primary bg-accent/50" : "border-border hover:bg-muted")}>
                <input type="checkbox" checked={selected.includes(c.id)} onChange={() => toggle(c.id)} className="h-4 w-4 accent-[var(--primary)]" />
                <span className="min-w-0 flex-1 truncate">{c.title}</span>
                <Badge tone="muted">{c.category}</Badge>
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button disabled={selected.length === 0} onClick={() => setDone(true)}>Assign {selected.length > 0 ? `(${selected.length})` : ""}</Button>
          </div>
        </>
      )}
    </Modal>
  )
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h3 className="font-display font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}
