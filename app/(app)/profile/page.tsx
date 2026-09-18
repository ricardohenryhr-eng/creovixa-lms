"use client"

import { useRef, useState, type FormEvent } from "react"
import Image from "next/image"
import { Camera, Check, GraduationCap, Award, BookOpen } from "lucide-react"
import { PageHeader, Card, Button, Input, Badge, Avatar, Progress } from "@/components/ui"
import { useAuth } from "@/lib/auth"
import { roleLabels, courses, certificates } from "@/lib/data"
import { cn, formatDate } from "@/lib/utils"

type Tab = "profile" | "security" | "history"

const tabs: { id: Tab; label: string }[] = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "history", label: "Training history" },
]

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const [tab, setTab] = useState<Tab>("profile")
  const [photo, setPhoto] = useState<string | null>(null)
  const [name, setName] = useState(user?.name ?? "")
  const [email, setEmail] = useState(user?.email ?? "")
  const [saved, setSaved] = useState(false)
  const [pwMsg, setPwMsg] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  if (!user) return null

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhoto(reader.result as string)
    reader.readAsDataURL(file)
  }

  function saveProfile(e: FormEvent) {
    e.preventDefault()
    updateUser({ name, email })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function changePassword(e: FormEvent) {
    e.preventDefault()
    setPwMsg("Password updated successfully.")
    setTimeout(() => setPwMsg(""), 2500)
    ;(e.target as HTMLFormElement).reset()
  }

  const completed = courses.filter((c) => c.progress === 100)

  return (
    <div>
      <PageHeader title="Profile" subtitle="Manage your personal information, security, and training records." />

      {/* Header card */}
      <Card className="mb-6 p-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            {photo ? (
              <Image src={photo} alt="Profile photo" width={80} height={80} className="h-20 w-20 rounded-full object-cover" />
            ) : (
              <Avatar name={user.name} color={user.avatarColor} size={80} />
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow"
              aria-label="Upload profile photo"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} className="hidden" />
          </div>
          <div className="text-center sm:text-left">
            <h2 className="font-display text-xl font-bold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Badge tone="orange">{roleLabels[user.role]}</Badge>
              <Badge tone="muted">Joined {formatDate(user.joinedAt)}</Badge>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:ml-auto">
            <Stat icon={<BookOpen className="h-4 w-4" />} value={user.coursesEnrolled} label="Enrolled" />
            <Stat icon={<GraduationCap className="h-4 w-4" />} value={user.coursesCompleted} label="Completed" />
            <Stat icon={<Award className="h-4 w-4" />} value={user.certificates} label="Certificates" />
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-6 inline-flex rounded-lg border border-border bg-card p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn("rounded-md px-4 py-1.5 text-sm font-medium transition", tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "profile" && (
        <Card className="max-w-2xl p-6">
          <h3 className="font-display text-lg font-semibold">Personal information</h3>
          <form onSubmit={saveProfile} className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Full name"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
            <Field label="Email address"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
            <Field label="Role"><Input value={roleLabels[user.role]} disabled /></Field>
            <Field label="Phone"><Input placeholder="+1 (555) 000-0000" /></Field>
            <div className="sm:col-span-2 flex items-center gap-3">
              <Button type="submit">Save changes</Button>
              {saved && <span className="inline-flex items-center gap-1 text-sm text-success"><Check className="h-4 w-4" /> Saved</span>}
            </div>
          </form>
        </Card>
      )}

      {tab === "security" && (
        <Card className="max-w-2xl p-6">
          <h3 className="font-display text-lg font-semibold">Change password</h3>
          <form onSubmit={changePassword} className="mt-4 grid gap-4">
            <Field label="Current password"><Input type="password" required placeholder="••••••••" /></Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="New password"><Input type="password" required placeholder="••••••••" /></Field>
              <Field label="Confirm new password"><Input type="password" required placeholder="••••••••" /></Field>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit">Update password</Button>
              {pwMsg && <span className="inline-flex items-center gap-1 text-sm text-success"><Check className="h-4 w-4" /> {pwMsg}</span>}
            </div>
          </form>
        </Card>
      )}

      {tab === "history" && (
        <Card className="p-6">
          <h3 className="font-display text-lg font-semibold">Training history</h3>
          <div className="mt-4 flex flex-col gap-3">
            {courses.filter((c) => c.progress > 0).map((c) => (
              <div key={c.id} className="flex items-center gap-4 rounded-lg border border-border p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.title}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <Progress value={c.progress} className="max-w-[200px]" tone={c.progress === 100 ? "success" : "primary"} />
                    <span className="text-xs text-muted-foreground">{c.progress}%</span>
                  </div>
                </div>
                {c.progress === 100 ? <Badge tone="green">Completed</Badge> : <Badge tone="amber">In progress</Badge>}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{completed.length} courses completed · {certificates.length} certificates earned</p>
        </Card>
      )}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="rounded-lg bg-muted/60 px-3 py-2 text-center">
      <span className="mx-auto flex justify-center text-primary">{icon}</span>
      <p className="mt-1 font-display text-lg font-bold leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}
