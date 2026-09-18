export type Role = "super_admin" | "admin" | "interpreter" | "student" | "trainer"

/**
 * Platform access lifecycle for an account.
 * - active / reactivated: full access.
 * - pending: awaiting admin approval, cannot access content yet.
 * - suspended: manually disabled by an admin.
 * - expired: automatically locked after the inactivity limit elapsed.
 */
export type UserStatus = "active" | "pending" | "suspended" | "expired" | "reactivated"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  /** Optional job title shown for staff accounts, e.g. "HR Admin". */
  title?: string
  status: UserStatus
  avatarColor: string
  joinedAt: string
  coursesEnrolled: number
  coursesCompleted: number
  certificates: number
  progress: number
  /** ISO date of the account's most recent sign-in (undefined = never signed in). */
  lastLoginAt?: string
  /** ISO date when platform access lapses if the account stays inactive. */
  accessExpiresAt?: string
  /**
   * Permanent accounts never expire and cannot be suspended or deleted by
   * lower-level administrators. Reserved for the founding Super Admin.
   */
  permanent?: boolean
  /**
   * Seed/demo account. Demo accounts are usable in preview for showcasing the
   * app but are rejected at sign-in in production — only real invited users
   * may access the LMS there.
   */
  demo?: boolean
  /**
   * Account must set a new password before reaching the dashboard. Set for the
   * Super Admin, whose real credential is managed by the provisioning store.
   */
  mustChangePassword?: boolean
}

export type LessonType = "video" | "lecture" | "image" | "reading" | "pdf"

export interface Lesson {
  id: string
  title: string
  duration: string
  type: LessonType
  completed: boolean
}

export interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

export interface Resource {
  id: string
  name: string
  size: string
  type: "pdf" | "doc" | "slides"
}

/**
 * Governs how a course's certificate is issued and accessed.
 * - validityMonths: null means the certificate never expires.
 * - requiresLessonCompletion: false means the certificate is awarded on
 *   passing the final quiz alone (no full course completion required).
 * - adminReleaseOnly / releaseAfterMonths / restricted describe the protected
 *   Medical Interpreter certificate that only an admin can release, and only
 *   after a waiting period.
 */
export interface CertRule {
  validityMonths: number | null
  downloadable: boolean
  requiresLessonCompletion: boolean
  restricted?: boolean
  adminReleaseOnly?: boolean
  releaseAfterMonths?: number
}

export interface Course {
  id: string
  slug: string
  title: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  description: string
  instructor: string
  lessonsCount: number
  hours: number
  enrolled: number
  rating: number
  progress: number
  accentImage: string
  /** Position in the required learning sequence (1 = first). */
  order: number
  /** Foundation courses appear first and must be completed before others. */
  foundation: boolean
  /** Prefix used to build/match this course's certificate id (e.g. MED). */
  certPrefix: string
  cert: CertRule
  modules: Module[]
  resources: Resource[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  answer: number
}

export interface Assessment {
  id: string
  courseId: string
  title: string
  category: string
  durationMinutes: number
  passingScore: number
  questions: QuizQuestion[]
  status: "not_started" | "passed" | "failed"
  bestScore: number | null
}

export interface Certificate {
  id: string
  certId: string
  courseTitle: string
  recipient: string
  issuedAt: string
  /** Empty string means the certificate does not expire. */
  expiresAt: string
  score: number
  status: "valid" | "expired"
}

export const roleLabels: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  interpreter: "Interpreter",
  student: "Student",
  trainer: "Trainer",
}

/** Access-control demo dates are seeded relative to load time so the
 *  inactivity/expiry scenarios always hold regardless of the current date. */
function daysAgoISO(days: number): string {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  d.setDate(d.getDate() - days)
  return d.toISOString().slice(0, 10)
}
function daysAheadISO(days: number): string {
  return daysAgoISO(-days)
}

export const demoUsers: (User & { password: string })[] = [
  {
    id: "u-0",
    name: "Ricardo Henry",
    email: "ricardo.henry@creovixa.com",
    // The Super Admin's real credential is issued by the provisioning store
    // (auto-generated temp password, rotated on first login). This seed value
    // is never a valid credential.
    password: "provisioned::not-a-valid-credential",
    role: "super_admin",
    title: "Super Admin",
    mustChangePassword: true,
    status: "active",
    avatarColor: "#1e293b",
    joinedAt: "2022-09-01",
    coursesEnrolled: 12,
    coursesCompleted: 12,
    certificates: 9,
    progress: 100,
    lastLoginAt: daysAgoISO(0),
    // Founding Super Admin: permanent, never expires, cannot be deleted.
    permanent: true,
  },
  {
    id: "u-1",
    name: "Anderson Verger",
    email: "anderson.verger@creovixa.com",
    password: "Admin123!",
    role: "admin",
    title: "HR Admin",
    status: "active",
    avatarColor: "#0f172a",
    joinedAt: "2023-01-12",
    coursesEnrolled: 12,
    coursesCompleted: 9,
    certificates: 7,
    progress: 78,
    lastLoginAt: daysAgoISO(0),
    accessExpiresAt: daysAheadISO(15),
  },
  {
    id: "u-1b",
    name: "Belson Bugotte",
    email: "belson.bugotte@creovixa.com",
    password: "Admin123!",
    role: "admin",
    title: "Operations Admin",
    status: "active",
    avatarColor: "#1d4ed8",
    joinedAt: "2023-02-08",
    coursesEnrolled: 10,
    coursesCompleted: 8,
    certificates: 6,
    progress: 84,
    lastLoginAt: daysAgoISO(0),
    accessExpiresAt: daysAheadISO(15),
  },
  {
    id: "u-t",
    name: "Priya Nair",
    email: "trainer@creovixa.com",
    password: "demo",
    demo: true,
    role: "trainer",
    status: "active",
    avatarColor: "#ec4899",
    joinedAt: "2022-11-03",
    coursesEnrolled: 3,
    coursesCompleted: 3,
    certificates: 3,
    progress: 100,
    lastLoginAt: daysAgoISO(0),
    accessExpiresAt: daysAheadISO(15),
  },
  {
    id: "u-2",
    name: "Daniel Okoro",
    email: "interpreter@creovixa.com",
    password: "demo",
    demo: true,
    role: "interpreter",
    status: "active",
    avatarColor: "#f97316",
    joinedAt: "2023-06-04",
    coursesEnrolled: 8,
    coursesCompleted: 5,
    certificates: 4,
    progress: 64,
    lastLoginAt: daysAgoISO(2),
    accessExpiresAt: daysAheadISO(13),
  },
  {
    id: "u-3",
    name: "Amara Khan",
    email: "student@creovixa.com",
    password: "demo",
    demo: true,
    role: "student",
    status: "active",
    avatarColor: "#0ea5e9",
    joinedAt: "2024-02-19",
    coursesEnrolled: 5,
    coursesCompleted: 2,
    certificates: 2,
    progress: 41,
    lastLoginAt: daysAgoISO(1),
    accessExpiresAt: daysAheadISO(14),
  },
  {
    id: "u-9",
    name: "Rosa Mendes",
    email: "expired@creovixa.com",
    password: "demo",
    demo: true,
    role: "interpreter",
    status: "active",
    avatarColor: "#64748b",
    joinedAt: "2023-03-18",
    coursesEnrolled: 7,
    coursesCompleted: 4,
    certificates: 3,
    progress: 58,
    // Inactive well beyond the 15-day limit — logs in to a locked account.
    lastLoginAt: daysAgoISO(24),
    accessExpiresAt: daysAgoISO(9),
  },
]

export const teamUsers: User[] = [
  ...demoUsers.map(({ password, ...u }) => u),
  {
    id: "u-4",
    name: "Lucas Bianchi",
    email: "lucas.bianchi@creovixa.com",
    role: "interpreter",
    status: "active",
    avatarColor: "#8b5cf6",
    joinedAt: "2023-09-22",
    coursesEnrolled: 10,
    coursesCompleted: 8,
    certificates: 6,
    progress: 82,
    // 11 days idle → access lapses in 4 days (inside the 5-day reminder window).
    lastLoginAt: daysAgoISO(11),
    accessExpiresAt: daysAheadISO(4),
  },
  {
    id: "u-5",
    name: "Priya Nair",
    email: "priya.nair@creovixa.com",
    role: "trainer",
    status: "active",
    avatarColor: "#ec4899",
    joinedAt: "2022-11-03",
    coursesEnrolled: 3,
    coursesCompleted: 3,
    certificates: 3,
    progress: 100,
    lastLoginAt: daysAgoISO(1),
    accessExpiresAt: daysAheadISO(14),
  },
  {
    id: "u-6",
    name: "Mateo Alvarez",
    email: "mateo.alvarez@creovixa.com",
    role: "student",
    status: "suspended",
    avatarColor: "#14b8a6",
    joinedAt: "2024-04-15",
    coursesEnrolled: 4,
    coursesCompleted: 1,
    certificates: 0,
    progress: 22,
    lastLoginAt: daysAgoISO(8),
    accessExpiresAt: daysAheadISO(7),
  },
  {
    id: "u-7",
    name: "Chen Wei",
    email: "chen.wei@creovixa.com",
    role: "interpreter",
    status: "active",
    avatarColor: "#f59e0b",
    joinedAt: "2023-12-08",
    coursesEnrolled: 9,
    coursesCompleted: 6,
    certificates: 5,
    progress: 71,
    // 21 days idle → already expired and auto-locked.
    lastLoginAt: daysAgoISO(21),
    accessExpiresAt: daysAgoISO(6),
  },
  {
    id: "u-8",
    name: "Fatima Zahra",
    email: "fatima.zahra@creovixa.com",
    role: "student",
    status: "active",
    avatarColor: "#ef4444",
    joinedAt: "2024-05-30",
    coursesEnrolled: 6,
    coursesCompleted: 3,
    certificates: 2,
    progress: 55,
    // 13 days idle → access lapses in 2 days (inside the 2-day reminder window).
    lastLoginAt: daysAgoISO(13),
    accessExpiresAt: daysAheadISO(2),
  },
  {
    id: "u-10",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@creovixa.com",
    role: "interpreter",
    status: "pending",
    avatarColor: "#22c55e",
    joinedAt: daysAgoISO(3),
    coursesEnrolled: 0,
    coursesCompleted: 0,
    certificates: 0,
    progress: 0,
    // Newly registered, awaiting admin approval — never signed in.
  },
  {
    id: "u-11",
    name: "Omar Farah",
    email: "omar.farah@creovixa.com",
    role: "interpreter",
    status: "reactivated",
    avatarColor: "#3b82f6",
    joinedAt: "2023-07-11",
    coursesEnrolled: 8,
    coursesCompleted: 5,
    certificates: 4,
    progress: 63,
    // Recently restored by an admin after a lapse.
    lastLoginAt: daysAgoISO(0),
    accessExpiresAt: daysAheadISO(30),
  },
]

export const categories = [
  "All",
  "Foundation",
  "Medical",
  "Legal",
  "Immigration",
  "Government",
  "Customer Service",
  "Remote Interpreting",
  "Compliance",
  "Ethics",
]

const resources: Resource[] = [
  { id: "r1", name: "Course Handbook.pdf", size: "2.4 MB", type: "pdf" },
  { id: "r2", name: "Terminology Glossary.pdf", size: "1.1 MB", type: "pdf" },
  { id: "r3", name: "Practice Scenarios.docx", size: "680 KB", type: "doc" },
  { id: "r4", name: "Lecture Slides.pptx", size: "5.2 MB", type: "slides" },
]

/** Standard module set covering all four learning-material types. */
function buildModules(topic: string): Module[] {
  return [
    {
      id: "m1",
      title: "Foundations",
      lessons: [
        { id: "l1", title: `Introduction to ${topic}`, duration: "12:40", type: "video", completed: false },
        { id: "l2", title: "Core concepts (lecture)", duration: "18:05", type: "lecture", completed: false },
        { id: "l3", title: "Terminology in context", duration: "Image", type: "image", completed: false },
        { id: "l4", title: "Reference handbook", duration: "Reading", type: "reading", completed: false },
      ],
    },
    {
      id: "m2",
      title: "Applied Practice",
      lessons: [
        { id: "l5", title: "Live scenario walkthrough", duration: "24:12", type: "video", completed: false },
        { id: "l6", title: "Role-play transcripts", duration: "Reading", type: "reading", completed: false },
        { id: "l7", title: "Common pitfalls & review", duration: "15:30", type: "video", completed: false },
      ],
    },
  ]
}

/** Larger program for the 40-hour Medical Interpreter capstone. */
function buildMedicalModules(): Module[] {
  return [
    {
      id: "m1",
      title: "Unit 1 · Role & Ethics of the Medical Interpreter",
      lessons: [
        { id: "l1", title: "The interpreter's role in healthcare", duration: "16:20", type: "video", completed: false },
        { id: "l2", title: "Code of ethics & standards (lecture)", duration: "22:10", type: "lecture", completed: false },
        { id: "l3", title: "Interpreter positioning diagrams", duration: "Image", type: "image", completed: false },
        { id: "l4", title: "National standards handbook", duration: "Reading", type: "reading", completed: false },
      ],
    },
    {
      id: "m2",
      title: "Unit 2 · Clinical Terminology & Body Systems",
      lessons: [
        { id: "l5", title: "Medical terminology foundations", duration: "28:45", type: "video", completed: false },
        { id: "l6", title: "Body systems illustrated", duration: "Image", type: "image", completed: false },
        { id: "l7", title: "Anatomy & pharmacology glossary", duration: "Reading", type: "reading", completed: false },
      ],
    },
    {
      id: "m3",
      title: "Unit 3 · Modes of Interpreting & Encounter Management",
      lessons: [
        { id: "l8", title: "Consecutive, simultaneous & sight translation", duration: "31:00", type: "video", completed: false },
        { id: "l9", title: "Managing the clinical encounter (lecture)", duration: "24:30", type: "lecture", completed: false },
        { id: "l10", title: "Triadic encounter transcripts", duration: "Reading", type: "reading", completed: false },
      ],
    },
    {
      id: "m4",
      title: "Unit 4 · Specialized Settings & Final Practicum",
      lessons: [
        { id: "l11", title: "Mental health, oncology & emergency settings", duration: "26:15", type: "video", completed: false },
        { id: "l12", title: "Cultural mediation case studies", duration: "Reading", type: "reading", completed: false },
        { id: "l13", title: "Final practicum walkthrough", duration: "33:40", type: "video", completed: false },
      ],
    },
  ]
}

const oneYear: CertRule = { validityMonths: 12, downloadable: true, requiresLessonCompletion: true }
const oneYearQuizOnly: CertRule = { validityMonths: 12, downloadable: true, requiresLessonCompletion: false }
const medicalCert: CertRule = {
  validityMonths: null,
  downloadable: false,
  requiresLessonCompletion: true,
  restricted: true,
  adminReleaseOnly: true,
  releaseAfterMonths: 6,
}

export const courses: Course[] = [
  // ── Foundation certification courses (must be completed first, in order) ──
  {
    id: "c-10",
    slug: "code-of-conduct",
    title: "Code of Conduct",
    category: "Foundation",
    level: "Beginner",
    description:
      "The professional conduct, integrity, and behavioral standards every Creovixa interpreter agrees to uphold. Certificate is awarded on passing the final quiz.",
    instructor: "Anderson Verger",
    lessonsCount: 7,
    hours: 3,
    enrolled: 2600,
    rating: 4.9,
    progress: 0,
    accentImage: "ethics",
    order: 1,
    foundation: true,
    certPrefix: "COC",
    cert: oneYearQuizOnly,
    modules: buildModules("the Code of Conduct"),
    resources,
  },
  {
    id: "c-8",
    slug: "hipaa-fraud-awareness",
    title: "HIPAA & Fraud Awareness",
    category: "Compliance",
    level: "Beginner",
    description:
      "Protect patient privacy, handle protected health information correctly, and recognize and prevent fraud, waste, and abuse. Certificate is awarded after completing the course and passing the final quiz.",
    instructor: "Sofia Marin",
    lessonsCount: 7,
    hours: 4,
    enrolled: 1870,
    rating: 4.9,
    progress: 0,
    accentImage: "hipaa",
    order: 2,
    foundation: true,
    certPrefix: "HIPAA",
    cert: oneYear,
    modules: buildModules("HIPAA & Fraud Awareness"),
    resources,
  },
  {
    id: "c-11",
    slug: "compliance-training",
    title: "Compliance Training",
    category: "Compliance",
    level: "Beginner",
    description:
      "Regulatory requirements, reporting obligations, and organizational compliance policies for language-services professionals. Certificate is awarded on passing the final quiz.",
    instructor: "Sofia Marin",
    lessonsCount: 7,
    hours: 3,
    enrolled: 1990,
    rating: 4.8,
    progress: 0,
    accentImage: "hipaa",
    order: 3,
    foundation: true,
    certPrefix: "COMP",
    cert: oneYearQuizOnly,
    modules: buildModules("Compliance"),
    resources,
  },
  {
    id: "c-9",
    slug: "ethics-and-standards",
    title: "Ethics & Standards of Practice",
    category: "Ethics",
    level: "Beginner",
    description:
      "The professional code of ethics, impartiality, confidentiality, and role boundaries every interpreter must uphold.",
    instructor: "Priya Nair",
    lessonsCount: 7,
    hours: 5,
    enrolled: 2440,
    rating: 4.9,
    progress: 0,
    accentImage: "ethics",
    order: 4,
    foundation: true,
    certPrefix: "ETH",
    cert: oneYear,
    modules: buildModules("Ethics & Standards"),
    resources,
  },

  // ── Interpreting skill courses (unlock after foundations) ──
  {
    id: "c-5",
    slug: "customer-service-interpretation",
    title: "Customer Service Interpretation",
    category: "Customer Service",
    level: "Beginner",
    description:
      "Handle contact-center and business support calls with clarity, tone management, and efficient turn-taking.",
    instructor: "Chen Wei",
    lessonsCount: 7,
    hours: 8,
    enrolled: 1520,
    rating: 4.7,
    progress: 0,
    accentImage: "customer",
    order: 5,
    foundation: false,
    certPrefix: "CS",
    cert: oneYear,
    modules: buildModules("Customer Service Interpretation"),
    resources,
  },
  {
    id: "c-6",
    slug: "opi-training",
    title: "OPI (Over-the-Phone Interpreting) Training",
    category: "Remote Interpreting",
    level: "Beginner",
    description:
      "Build the audio-only skills, call flow discipline, and note-taking techniques essential for over-the-phone interpreting.",
    instructor: "Chen Wei",
    lessonsCount: 7,
    hours: 6,
    enrolled: 2100,
    rating: 4.8,
    progress: 0,
    accentImage: "opi",
    order: 6,
    foundation: false,
    certPrefix: "OPI",
    cert: oneYear,
    modules: buildModules("OPI"),
    resources,
  },
  {
    id: "c-7",
    slug: "vri-training",
    title: "VRI (Video Remote Interpreting) Training",
    category: "Remote Interpreting",
    level: "Intermediate",
    description:
      "Camera presence, platform tools, and positioning for effective video remote interpreting across industries.",
    instructor: "Daniel Okoro",
    lessonsCount: 7,
    hours: 7,
    enrolled: 1330,
    rating: 4.7,
    progress: 0,
    accentImage: "vri",
    order: 7,
    foundation: false,
    certPrefix: "VRI",
    cert: oneYear,
    modules: buildModules("VRI"),
    resources,
  },
  {
    id: "c-3",
    slug: "immigration-interpretation",
    title: "Immigration Interpretation",
    category: "Immigration",
    level: "Intermediate",
    description:
      "Interpret confidently across asylum interviews, USCIS appointments, and immigration hearings with cultural sensitivity.",
    instructor: "Daniel Okoro",
    lessonsCount: 7,
    hours: 12,
    enrolled: 640,
    rating: 4.7,
    progress: 0,
    accentImage: "immigration",
    order: 8,
    foundation: false,
    certPrefix: "IMM",
    cert: oneYear,
    modules: buildModules("Immigration Interpretation"),
    resources,
  },
  {
    id: "c-4",
    slug: "government-interpretation",
    title: "Government & Public Sector Interpretation",
    category: "Government",
    level: "Intermediate",
    description:
      "Serve public agencies, social services, and civic institutions with precise, neutral, and compliant interpretation.",
    instructor: "Sofia Marin",
    lessonsCount: 7,
    hours: 10,
    enrolled: 410,
    rating: 4.6,
    progress: 0,
    accentImage: "government",
    order: 9,
    foundation: false,
    certPrefix: "GOV",
    cert: oneYear,
    modules: buildModules("Government Interpretation"),
    resources,
  },
  {
    id: "c-2",
    slug: "legal-interpretation",
    title: "Legal Interpretation Fundamentals",
    category: "Legal",
    level: "Advanced",
    description:
      "Courtroom procedure, legal terminology, sight translation, and the ethical standards demanded of certified legal interpreters.",
    instructor: "Priya Nair",
    lessonsCount: 7,
    hours: 16,
    enrolled: 980,
    rating: 4.8,
    progress: 0,
    accentImage: "legal",
    order: 10,
    foundation: false,
    certPrefix: "LEG",
    cert: oneYear,
    modules: buildModules("Legal Interpretation"),
    resources,
  },

  // ── Capstone: protected, restricted Medical Interpreter certificate ──
  {
    id: "c-1",
    slug: "medical-interpreter-training-40h",
    title: "40-Hour Medical Interpreter Training",
    category: "Medical",
    level: "Advanced",
    description:
      "The full 40-hour medical interpreter program — videos, lectures, illustrated materials, readings, and a final assessment. Only one final Medical Interpreter Certificate is issued for the entire program. The certificate never expires, is protected, and is released only by an administrator six months after completion.",
    instructor: "Priya Nair",
    lessonsCount: 13,
    hours: 40,
    enrolled: 1240,
    rating: 4.9,
    progress: 0,
    accentImage: "medical",
    order: 11,
    foundation: false,
    certPrefix: "MED",
    cert: medicalCert,
    modules: buildMedicalModules(),
    resources,
  },
]

export const assessments: Assessment[] = [
  {
    id: "a-1",
    courseId: "c-1",
    title: "40-Hour Medical Interpreter — Final Assessment",
    category: "Medical",
    durationMinutes: 45,
    passingScore: 80,
    status: "not_started",
    bestScore: null,
    questions: [
      {
        id: "q1",
        question: "What is the primary role of a medical interpreter during a patient encounter?",
        options: [
          "To advocate for the patient's treatment plan",
          "To convey messages accurately and impartially between parties",
          "To summarize the conversation for efficiency",
          "To offer medical advice when the provider is unavailable",
        ],
        answer: 1,
      },
      {
        id: "q2",
        question: "Which practice best protects patient confidentiality?",
        options: [
          "Discussing cases with colleagues for feedback",
          "Keeping session notes on a personal phone",
          "Following HIPAA guidelines and destroying notes after the session",
          "Sharing details with family members present",
        ],
        answer: 2,
      },
      {
        id: "q3",
        question: "When an interpreter does not understand a medical term, they should:",
        options: [
          "Guess based on context",
          "Skip the term",
          "Ask for clarification before interpreting",
          "Substitute a similar sounding word",
        ],
        answer: 2,
      },
      {
        id: "q4",
        question: "The correct interpreting mode for a physician giving discharge instructions is usually:",
        options: ["Simultaneous", "Consecutive", "Summary", "Sight translation only"],
        answer: 1,
      },
      {
        id: "q5",
        question: "Cultural brokering by an interpreter should be done:",
        options: [
          "Freely whenever the interpreter feels it helps",
          "Only transparently and when it prevents a misunderstanding",
          "Never under any circumstances",
          "By replacing the provider's questions",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "a-2",
    courseId: "c-2",
    title: "Legal Interpretation Assessment",
    category: "Legal",
    durationMinutes: 60,
    passingScore: 80,
    status: "not_started",
    bestScore: null,
    questions: [
      {
        id: "q1",
        question: "In a courtroom, the interpreter must interpret:",
        options: [
          "Only what is relevant",
          "Everything said, verbatim and in the same register",
          "A cleaned-up version without slang",
          "Only the attorney's statements",
        ],
        answer: 1,
      },
      {
        id: "q2",
        question: "Sight translation refers to:",
        options: [
          "Interpreting a video recording",
          "Reading a written document aloud in another language",
          "Translating road signs",
          "Whispered interpreting",
        ],
        answer: 1,
      },
      {
        id: "q3",
        question: "If an interpreter makes an error on the record, they should:",
        options: [
          "Ignore it to avoid disruption",
          "Correct it immediately on the record",
          "Fix it privately after the session",
          "Ask the attorney to fix it",
        ],
        answer: 1,
      },
      {
        id: "q4",
        question: "The interpreter's relationship to both parties must remain:",
        options: ["Friendly", "Impartial and neutral", "Supportive of the defendant", "Advisory"],
        answer: 1,
      },
    ],
  },
  {
    id: "a-3",
    courseId: "c-8",
    title: "HIPAA & Fraud Awareness Quiz",
    category: "Compliance",
    durationMinutes: 20,
    passingScore: 80,
    status: "not_started",
    bestScore: null,
    questions: [
      {
        id: "q1",
        question: "PHI stands for:",
        options: [
          "Private Health Interpretation",
          "Protected Health Information",
          "Patient Health Index",
          "Public Health Inspection",
        ],
        answer: 1,
      },
      {
        id: "q2",
        question: "Under HIPAA, interpreters are considered:",
        options: ["Unrelated third parties", "Business associates bound by privacy rules", "Exempt volunteers", "Public officials"],
        answer: 1,
      },
      {
        id: "q3",
        question: "Suspected fraud, waste, or abuse should be:",
        options: [
          "Kept quiet to avoid conflict",
          "Reported through the proper compliance channels",
          "Handled only if a patient complains",
          "Ignored unless it is large",
        ],
        answer: 1,
      },
      {
        id: "q4",
        question: "A HIPAA breach should be:",
        options: [
          "Kept quiet",
          "Reported through the proper channels immediately",
          "Handled only if the patient complains",
          "Fixed by deleting records",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "a-4",
    courseId: "c-9",
    title: "Ethics & Standards Knowledge Check",
    category: "Ethics",
    durationMinutes: 25,
    passingScore: 80,
    status: "not_started",
    bestScore: null,
    questions: [
      {
        id: "q1",
        question: "The principle of impartiality requires interpreters to:",
        options: [
          "Take the side of the vulnerable party",
          "Refrain from expressing personal opinions or bias",
          "Advise clients on the best decision",
          "Correct participants' factual errors",
        ],
        answer: 1,
      },
      {
        id: "q2",
        question: "Confidentiality means the interpreter:",
        options: [
          "May share anonymized stories",
          "Keeps all assignment information private",
          "Can discuss cases with family",
          "Reports everything to the agency",
        ],
        answer: 1,
      },
      {
        id: "q3",
        question: "If an assignment exceeds an interpreter's competence, they should:",
        options: ["Continue anyway", "Decline or withdraw from the assignment", "Improvise", "Ask the client to slow down"],
        answer: 1,
      },
    ],
  },
  {
    id: "a-5",
    courseId: "c-10",
    title: "Code of Conduct Final Quiz",
    category: "Foundation",
    durationMinutes: 15,
    passingScore: 80,
    status: "not_started",
    bestScore: null,
    questions: [
      {
        id: "q1",
        question: "An interpreter who is offered a personal gift by a client should:",
        options: [
          "Accept it to maintain rapport",
          "Politely decline in line with the code of conduct",
          "Accept only if it is small",
          "Ask a supervisor to accept it for them",
        ],
        answer: 1,
      },
      {
        id: "q2",
        question: "Professional conduct requires interpreters to arrive:",
        options: ["Whenever convenient", "Prepared and on time for every assignment", "Only for paid work", "After the provider"],
        answer: 1,
      },
      {
        id: "q3",
        question: "A conflict of interest should be:",
        options: ["Hidden", "Disclosed immediately", "Ignored if minor", "Resolved privately with the client"],
        answer: 1,
      },
    ],
  },
  {
    id: "a-6",
    courseId: "c-11",
    title: "Compliance Training Final Quiz",
    category: "Compliance",
    durationMinutes: 15,
    passingScore: 80,
    status: "not_started",
    bestScore: null,
    questions: [
      {
        id: "q1",
        question: "Compliance policies exist primarily to:",
        options: [
          "Slow down the workflow",
          "Ensure legal, ethical, and regulatory obligations are met",
          "Increase paperwork",
          "Limit interpreter assignments",
        ],
        answer: 1,
      },
      {
        id: "q2",
        question: "When unsure whether an action is compliant, an interpreter should:",
        options: ["Proceed anyway", "Ask the compliance team before acting", "Guess", "Ask another interpreter"],
        answer: 1,
      },
      {
        id: "q3",
        question: "Records containing sensitive information must be:",
        options: [
          "Stored on personal devices",
          "Handled and stored according to policy",
          "Shared freely within the team",
          "Kept indefinitely",
        ],
        answer: 1,
      },
    ],
  },
]

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    certId: "CVX-MED-2024-0192",
    courseTitle: "40-Hour Medical Interpreter Training",
    recipient: "Daniel Okoro",
    issuedAt: "2024-08-14",
    expiresAt: "",
    score: 92,
    status: "valid",
  },
  {
    id: "cert-2",
    certId: "CVX-HIPAA-2024-0455",
    courseTitle: "HIPAA & Fraud Awareness",
    recipient: "Daniel Okoro",
    issuedAt: "2024-09-02",
    expiresAt: "2025-09-02",
    score: 88,
    status: "expired",
  },
  {
    id: "cert-3",
    certId: "CVX-CS-2023-1120",
    courseTitle: "Customer Service Interpretation",
    recipient: "Daniel Okoro",
    issuedAt: "2023-12-19",
    expiresAt: "2024-12-19",
    score: 95,
    status: "expired",
  },
  {
    id: "cert-4",
    certId: "CVX-OPI-2022-0788",
    courseTitle: "OPI Training",
    recipient: "Daniel Okoro",
    issuedAt: "2022-05-10",
    expiresAt: "2023-05-10",
    score: 84,
    status: "expired",
  },
]

export const recentActivity = [
  { id: "act-1", text: "Completed lesson 'Core concepts (lecture)'", course: "HIPAA & Fraud Awareness", time: "2 hours ago" },
  { id: "act-2", text: "Passed HIPAA & Fraud Awareness Quiz with 88%", course: "HIPAA & Fraud Awareness", time: "1 day ago" },
  { id: "act-3", text: "Enrolled in Code of Conduct", course: "Code of Conduct", time: "2 days ago" },
  { id: "act-4", text: "Viewed 'Terminology Glossary.pdf'", course: "OPI Training", time: "4 days ago" },
  { id: "act-5", text: "Earned certificate CVX-CS-2023-1120", course: "Customer Service", time: "1 week ago" },
]

export const notifications = [
  { id: "n-1", type: "enrollment", title: "New course assigned", body: "You have been enrolled in Code of Conduct.", time: "2h ago", unread: true },
  { id: "n-2", type: "certificate", title: "Certificate awaiting release", body: "Your Medical Interpreter certificate requires admin approval.", time: "1d ago", unread: true },
  { id: "n-3", type: "exam", title: "Exam result available", body: "You scored 88% on the HIPAA & Fraud Awareness Quiz.", time: "1d ago", unread: false },
  { id: "n-4", type: "enrollment", title: "Reminder", body: "Complete Code of Conduct to unlock the next course.", time: "3d ago", unread: false },
]

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug)
}

export function getCourseById(id: string) {
  return courses.find((c) => c.id === id)
}

export function getAssessment(id: string) {
  return assessments.find((a) => a.id === id)
}

export function findCertificate(certId: string) {
  return certificates.find((c) => c.certId.toLowerCase() === certId.toLowerCase())
}

export interface QuizAttempt {
  id: string
  learnerName: string
  learnerColor: string
  quiz: string
  category: string
  score: number
  passingScore: number
  passed: boolean
  date: string
}

const attemptDates = ["2026-09-14", "2026-09-10", "2026-09-05", "2026-08-29", "2026-08-22", "2026-08-15"]

/**
 * Deterministic sample of quiz attempts derived from learners and assessments.
 * Shared by the admin Quiz Results page and the Trainer dashboard so their
 * pass-rate and score figures always agree.
 */
export function buildQuizAttempts(): QuizAttempt[] {
  const learners = teamUsers.filter((u) => u.role === "interpreter" || u.role === "student")
  const rows: QuizAttempt[] = []
  assessments.forEach((a, ai) => {
    learners.forEach((u, ui) => {
      if ((ai + ui) % 2 === 0 && rows.length < 14) {
        const score = 62 + ((ai * 9 + ui * 17) % 39) // 62–100
        rows.push({
          id: `${a.id}-${u.id}`,
          learnerName: u.name,
          learnerColor: u.avatarColor,
          quiz: a.title,
          category: a.category,
          score,
          passingScore: a.passingScore,
          passed: score >= a.passingScore,
          date: attemptDates[(ai + ui) % attemptDates.length],
        })
      }
    })
  })
  return rows.sort((x, y) => (x.date < y.date ? 1 : -1))
}
