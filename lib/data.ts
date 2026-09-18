export type Role = "super_admin" | "admin" | "interpreter" | "student" | "trainer"

export type UserStatus = "active" | "suspended"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  status: UserStatus
  avatarColor: string
  joinedAt: string
  coursesEnrolled: number
  coursesCompleted: number
  certificates: number
  progress: number
}

export interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "pdf" | "reading"
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

export const demoUsers: (User & { password: string })[] = [
  {
    id: "u-1",
    name: "Sofia Marin",
    email: "admin@creovixa.com",
    password: "demo",
    role: "admin",
    status: "active",
    avatarColor: "#0f172a",
    joinedAt: "2023-01-12",
    coursesEnrolled: 12,
    coursesCompleted: 9,
    certificates: 7,
    progress: 78,
  },
  {
    id: "u-2",
    name: "Daniel Okoro",
    email: "interpreter@creovixa.com",
    password: "demo",
    role: "interpreter",
    status: "active",
    avatarColor: "#f97316",
    joinedAt: "2023-06-04",
    coursesEnrolled: 8,
    coursesCompleted: 5,
    certificates: 4,
    progress: 64,
  },
  {
    id: "u-3",
    name: "Amara Khan",
    email: "student@creovixa.com",
    password: "demo",
    role: "student",
    status: "active",
    avatarColor: "#0ea5e9",
    joinedAt: "2024-02-19",
    coursesEnrolled: 5,
    coursesCompleted: 2,
    certificates: 2,
    progress: 41,
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
  },
]

export const categories = [
  "All",
  "Medical",
  "Legal",
  "Immigration",
  "Government",
  "Customer Service",
  "Remote Interpreting",
  "Compliance",
  "Ethics",
]

function buildModules(topic: string): Module[] {
  return [
    {
      id: "m1",
      title: "Foundations",
      lessons: [
        { id: "l1", title: `Introduction to ${topic}`, duration: "12:40", type: "video", completed: true },
        { id: "l2", title: "Core terminology & glossary", duration: "18:05", type: "video", completed: true },
        { id: "l3", title: "Reference handbook", duration: "PDF", type: "pdf", completed: false },
      ],
    },
    {
      id: "m2",
      title: "Applied Practice",
      lessons: [
        { id: "l4", title: "Live scenario walkthrough", duration: "24:12", type: "video", completed: false },
        { id: "l5", title: "Role-play transcripts", duration: "Reading", type: "reading", completed: false },
        { id: "l6", title: "Practice worksheet", duration: "PDF", type: "pdf", completed: false },
      ],
    },
    {
      id: "m3",
      title: "Assessment Prep",
      lessons: [
        { id: "l7", title: "Common pitfalls & review", duration: "15:30", type: "video", completed: false },
        { id: "l8", title: "Final knowledge check", duration: "Quiz", type: "reading", completed: false },
      ],
    },
  ]
}

const resources: Resource[] = [
  { id: "r1", name: "Course Handbook.pdf", size: "2.4 MB", type: "pdf" },
  { id: "r2", name: "Terminology Glossary.pdf", size: "1.1 MB", type: "pdf" },
  { id: "r3", name: "Practice Scenarios.docx", size: "680 KB", type: "doc" },
  { id: "r4", name: "Lecture Slides.pptx", size: "5.2 MB", type: "slides" },
]

export const courses: Course[] = [
  {
    id: "c-1",
    slug: "medical-interpretation",
    title: "Medical Interpretation Certification",
    category: "Medical",
    level: "Advanced",
    description:
      "Master clinical terminology, patient-provider dynamics, and the protocols required to interpret accurately in hospitals, clinics, and telehealth settings.",
    instructor: "Priya Nair",
    lessonsCount: 24,
    hours: 18,
    enrolled: 1240,
    rating: 4.9,
    progress: 72,
    accentImage: "medical",
    modules: buildModules("Medical Interpretation"),
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
    lessonsCount: 20,
    hours: 16,
    enrolled: 980,
    rating: 4.8,
    progress: 40,
    accentImage: "legal",
    modules: buildModules("Legal Interpretation"),
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
    lessonsCount: 16,
    hours: 12,
    enrolled: 640,
    rating: 4.7,
    progress: 0,
    accentImage: "immigration",
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
    lessonsCount: 14,
    hours: 10,
    enrolled: 410,
    rating: 4.6,
    progress: 0,
    accentImage: "government",
    modules: buildModules("Government Interpretation"),
    resources,
  },
  {
    id: "c-5",
    slug: "customer-service-interpretation",
    title: "Customer Service Interpretation",
    category: "Customer Service",
    level: "Beginner",
    description:
      "Handle contact-center and business support calls with clarity, tone management, and efficient turn-taking.",
    instructor: "Chen Wei",
    lessonsCount: 12,
    hours: 8,
    enrolled: 1520,
    rating: 4.7,
    progress: 100,
    accentImage: "customer",
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
    lessonsCount: 10,
    hours: 6,
    enrolled: 2100,
    rating: 4.8,
    progress: 55,
    accentImage: "opi",
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
    lessonsCount: 11,
    hours: 7,
    enrolled: 1330,
    rating: 4.7,
    progress: 0,
    accentImage: "vri",
    modules: buildModules("VRI"),
    resources,
  },
  {
    id: "c-8",
    slug: "hipaa-compliance",
    title: "HIPAA Compliance for Interpreters",
    category: "Compliance",
    level: "Beginner",
    description:
      "Protect patient privacy and handle protected health information correctly in every medical interpreting encounter.",
    instructor: "Sofia Marin",
    lessonsCount: 8,
    hours: 4,
    enrolled: 1870,
    rating: 4.9,
    progress: 100,
    accentImage: "hipaa",
    modules: buildModules("HIPAA Compliance"),
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
    lessonsCount: 9,
    hours: 5,
    enrolled: 2440,
    rating: 4.9,
    progress: 30,
    accentImage: "ethics",
    modules: buildModules("Ethics & Standards"),
    resources,
  },
]

export const assessments: Assessment[] = [
  {
    id: "a-1",
    courseId: "c-1",
    title: "Medical Interpretation Final Exam",
    category: "Medical",
    durationMinutes: 45,
    passingScore: 80,
    status: "passed",
    bestScore: 92,
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
    title: "HIPAA Compliance Quiz",
    category: "Compliance",
    durationMinutes: 20,
    passingScore: 75,
    status: "passed",
    bestScore: 88,
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
    passingScore: 75,
    status: "failed",
    bestScore: 62,
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
]

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    certId: "CVX-MED-2024-0192",
    courseTitle: "Medical Interpretation Certification",
    recipient: "Daniel Okoro",
    issuedAt: "2024-08-14",
    expiresAt: "2026-08-14",
    score: 92,
    status: "valid",
  },
  {
    id: "cert-2",
    certId: "CVX-HIPAA-2024-0455",
    courseTitle: "HIPAA Compliance for Interpreters",
    recipient: "Daniel Okoro",
    issuedAt: "2024-09-02",
    expiresAt: "2026-09-02",
    score: 88,
    status: "valid",
  },
  {
    id: "cert-3",
    certId: "CVX-CS-2023-1120",
    courseTitle: "Customer Service Interpretation",
    recipient: "Daniel Okoro",
    issuedAt: "2023-12-19",
    expiresAt: "2025-12-19",
    score: 95,
    status: "valid",
  },
  {
    id: "cert-4",
    certId: "CVX-OPI-2022-0788",
    courseTitle: "OPI Training",
    recipient: "Daniel Okoro",
    issuedAt: "2022-05-10",
    expiresAt: "2024-05-10",
    score: 84,
    status: "expired",
  },
]

export const recentActivity = [
  { id: "act-1", text: "Completed lesson 'Core terminology & glossary'", course: "Medical Interpretation", time: "2 hours ago" },
  { id: "act-2", text: "Passed HIPAA Compliance Quiz with 88%", course: "HIPAA Compliance", time: "1 day ago" },
  { id: "act-3", text: "Enrolled in Legal Interpretation Fundamentals", course: "Legal Interpretation", time: "2 days ago" },
  { id: "act-4", text: "Downloaded 'Terminology Glossary.pdf'", course: "OPI Training", time: "4 days ago" },
  { id: "act-5", text: "Earned certificate CVX-CS-2023-1120", course: "Customer Service", time: "1 week ago" },
]

export const notifications = [
  { id: "n-1", type: "enrollment", title: "New course assigned", body: "You have been enrolled in Legal Interpretation Fundamentals.", time: "2h ago", unread: true },
  { id: "n-2", type: "certificate", title: "Certificate issued", body: "Your Medical Interpretation certificate is ready to download.", time: "1d ago", unread: true },
  { id: "n-3", type: "exam", title: "Exam result available", body: "You scored 88% on the HIPAA Compliance Quiz.", time: "1d ago", unread: false },
  { id: "n-4", type: "enrollment", title: "Reminder", body: "Ethics & Standards module is due in 3 days.", time: "3d ago", unread: false },
]

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug)
}

export function getAssessment(id: string) {
  return assessments.find((a) => a.id === id)
}

export function findCertificate(certId: string) {
  return certificates.find((c) => c.certId.toLowerCase() === certId.toLowerCase())
}
