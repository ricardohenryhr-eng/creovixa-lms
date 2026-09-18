import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  FileText,
  GraduationCap,
  ShieldCheck,
  Users,
  Video,
} from "lucide-react"
import { Logo } from "@/components/logo"
import { Button, Badge } from "@/components/ui"
import { CourseVisual } from "@/components/course-visual"
import { courses } from "@/lib/data"

const features = [
  { icon: GraduationCap, title: "Specialized tracks", body: "Medical, legal, immigration, government, and remote interpreting courses built by working professionals." },
  { icon: Video, title: "Video & PDF lessons", body: "On-demand video lessons, downloadable handbooks, glossaries, and practice scenarios." },
  { icon: FileText, title: "Timed assessments", body: "Multiple-choice quizzes and timed exams with automatic grading and instant score reports." },
  { icon: Award, title: "Verifiable certificates", body: "Auto-generated certificates with a unique ID and a public verification page." },
  { icon: ShieldCheck, title: "Compliance ready", body: "HIPAA, ethics, and standards-of-practice modules to keep your team audit-ready." },
  { icon: BarChart3, title: "Progress tracking", body: "Dashboards and reports for learners and admins to monitor completion and results." },
]

const stats = [
  { value: "9", label: "Certification tracks" },
  { value: "120+", label: "Video lessons" },
  { value: "6,400+", label: "Interpreters trained" },
  { value: "98%", label: "Pass rate" },
]

export default function HomePage() {
  const featured = courses.slice(0, 6)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#courses" className="hover:text-foreground">Courses</a>
            <a href="#verify" className="hover:text-foreground">Verify</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/login" className="hidden sm:block">
              <Button size="sm">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
            <div>
              <Badge tone="orange" className="mb-5">Creovixa Language Services</Badge>
              <h1 className="text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Train, certify, and grow world-class interpreters.
              </h1>
              <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-slate-300 sm:text-lg">
                The complete learning platform for interpretation and translation professionals — from medical and
                legal to OPI, VRI, and HIPAA compliance. Learn, get assessed, and earn verifiable certificates.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/login">
                  <Button size="lg">
                    Enter the platform
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/verify">
                  <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    Verify a certificate
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-300">
                {["Role-based access", "Automatic grading", "Downloadable PDFs"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                <Image
                  src="/hero-interpreter.png"
                  alt="Professional interpreter working with a headset at a modern desk"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-border bg-card p-4 text-card-foreground shadow-lg sm:block">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                    <Award className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold">Certificate issued</p>
                    <p className="text-xs text-muted-foreground">CVX-MED-2024-0192</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-extrabold text-secondary sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="max-w-2xl">
            <Badge tone="orange">Why Creovixa LMS</Badge>
            <h2 className="mt-4 text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Everything your interpreters need in one platform
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground">
              Purpose-built for language-service organizations that need structured training, measurable outcomes, and
              compliance you can prove.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-xl border border-border bg-card p-6 shadow-sm transition hover:shadow-md">
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Courses */}
        <section id="courses" className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-2xl">
                <Badge tone="orange">Certification tracks</Badge>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">Popular courses</h2>
              </div>
              <Link href="/login" className="text-sm font-medium text-primary hover:underline">
                View full catalog
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((c) => (
                <div key={c.id} className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition hover:shadow-md">
                  <CourseVisual category={c.category} className="h-32 w-full" />
                  <div className="p-5">
                    <div className="flex items-center gap-2">
                      <Badge tone="muted">{c.category}</Badge>
                      <Badge tone="orange">{c.level}</Badge>
                    </div>
                    <h3 className="mt-3 font-display text-base font-semibold leading-snug">{c.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{c.description}</p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{c.lessonsCount} lessons</span>
                      <span>{c.hours}h</span>
                      <span>{c.rating} rating</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / verify */}
        <section id="verify" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="overflow-hidden rounded-2xl bg-secondary px-6 py-12 text-white sm:px-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to raise your interpreting standards?
                </h2>
                <p className="mt-3 max-w-xl text-pretty text-slate-300">
                  Sign in to access your dashboard, continue your courses, and manage your team. New here? Explore the
                  demo with a single click.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Link href="/login">
                  <Button size="lg">Sign in</Button>
                </Link>
                <Link href="/verify">
                  <Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                    Verify certificate
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <Logo />
          <p>© {new Date().getFullYear()} Creovixa Language Services. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Trusted by language teams worldwide
          </div>
        </div>
      </footer>
    </div>
  )
}
