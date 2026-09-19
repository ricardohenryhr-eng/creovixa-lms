import type { Module, Resource, QuizQuestion } from "@/lib/data"
import { cchiContent } from "@/lib/cchi-content"

/**
 * Full, professionally authored training content for every course in the
 * catalog. This is the single source of truth for what a learner reads,
 * watches, and is quizzed on inside each course page. Course metadata (title,
 * hours, sequencing, certificate rules) lives in lib/data.ts and pulls its
 * modules, resources, and final assessment from here by slug.
 */

export interface FinalAssessmentSpec {
  title: string
  category: string
  durationMinutes: number
  passingScore: number
  questions: QuizQuestion[]
}

export interface CourseContent {
  modules: Module[]
  resources: Resource[]
  finalAssessment: FinalAssessmentSpec
}

/**
 * Placeholder demo streams have been removed. Real training videos are managed
 * per lesson in the database (the lesson_videos table) via Admin → Video
 * Content and overlaid onto these lessons at runtime. Until an admin uploads a
 * real video for a lesson, the player shows "Training video coming soon"
 * instead of a placeholder clip. These empty strings keep each authored lesson
 * marked as a video lesson without shipping a fake video.
 */
const V = {
  a: "",
  b: "",
  c: "",
  d: "",
  e: "",
  f: "",
  g: "",
  h: "",
  i: "",
}

/** Every course ships the same three generated, downloadable study documents. */
function standardResources(prefix: string): Resource[] {
  return [
    { id: `${prefix}-sg`, name: "Study Guide.pdf", size: "PDF", type: "pdf", kind: "study_guide" },
    { id: `${prefix}-vocab`, name: "Vocabulary List.pdf", size: "PDF", type: "pdf", kind: "vocabulary" },
    { id: `${prefix}-manual`, name: "Course Manual.pdf", size: "PDF", type: "pdf", kind: "manual" },
  ]
}

// ───────────────────────────────────────────────────────────────────────────
// 1. Code of Conduct
// ───────────────────────────────────────────────────────────────────────────
const codeOfConduct: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "Professional Standards & Integrity",
      lessons: [
        {
          id: "l1",
          title: "What the Code of Conduct is and why it matters",
          duration: "12:40",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Explain the purpose of a professional code of conduct",
            "Identify the core values every Creovixa interpreter agrees to uphold",
            "Recognize how conduct affects client trust and patient safety",
          ],
          content: [
            "A code of conduct is the shared set of behavioral standards that defines what it means to act as a professional interpreter. It is not a list of arbitrary rules; it is the practical expression of the trust that clients, patients, and providers place in you every time you take an assignment. When you interpret, people share information they would never share with a stranger — medical histories, legal jeopardy, financial hardship — because they believe you will handle it responsibly. The code exists to protect that trust.",
            "Creovixa interpreters commit to five core values: accuracy, confidentiality, impartiality, professionalism, and respect. Accuracy means conveying everything that is said faithfully, without adding, omitting, or altering meaning. Confidentiality means treating everything you learn on assignment as privileged. Impartiality means you do not take sides or let personal opinions color your work. Professionalism covers punctuality, preparation, and appearance. Respect means honoring the dignity, culture, and autonomy of everyone in the encounter.",
            "Conduct has consequences that reach far beyond a single call. A breach of confidentiality can expose a patient to discrimination. A biased rendering can change the outcome of an asylum hearing. An interpreter who arrives unprepared can delay urgent care. Because your work sits at the center of high-stakes communication, small lapses can cause real harm — which is exactly why professional conduct is treated as a non-negotiable foundation of the role.",
          ],
          terminology: [
            { term: "Code of conduct", definition: "The agreed set of professional behavioral standards an interpreter commits to follow." },
            { term: "Fidelity", definition: "Faithfully conveying the full meaning of a message without addition, omission, or distortion." },
            { term: "Privileged information", definition: "Sensitive information shared in a professional relationship that must be kept confidential." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The primary purpose of a professional code of conduct is to:",
              options: [
                "Increase the number of assignments an interpreter receives",
                "Protect the trust clients and patients place in interpreters",
                "Replace the need for interpreter training",
                "Set interpreter pay rates",
              ],
              answer: 1,
              explanation: "The code exists to protect the trust that makes high-stakes interpreting possible.",
            },
          ],
        },
        {
          id: "l2",
          title: "Core professional values in practice (lecture)",
          duration: "18:05",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply the five core values to realistic situations",
            "Distinguish acceptable from unacceptable professional behavior",
          ],
          content: [
            "Values only matter when they guide behavior under pressure. Consider punctuality: arriving five minutes early to test your equipment is a small act, but it signals reliability and prevents a provider from waiting with a patient in distress. Consider preparation: reviewing an assignment's subject matter beforehand lets you interpret specialized terms accurately instead of guessing in the moment.",
            "Appearance and demeanor also communicate professionalism. Whether you work on camera, on the phone, or in person, a calm, neutral, and courteous manner reassures everyone that the encounter is in capable hands. Avoid slang, side conversations, and anything that draws attention away from the parties you serve.",
            "Finally, professional values require you to know your limits. If an assignment falls outside your competence — an unfamiliar dialect, a highly technical specialty, or a situation where you have a personal connection to a party — the professional choice is to disclose it and, if necessary, decline. Declining an assignment you cannot perform well is not a failure; it is the code working as intended.",
          ],
          terminology: [
            { term: "Competence", definition: "Having the skills, knowledge, and language proficiency required to perform an assignment accurately." },
            { term: "Demeanor", definition: "The outward manner and conduct an interpreter presents during an encounter." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An interpreter asked to cover a highly technical specialty far outside their experience should:",
              options: [
                "Accept and do their best without mentioning it",
                "Disclose the limitation and decline if they cannot interpret accurately",
                "Accept and summarize instead of interpreting fully",
                "Accept and look up terms silently during the call",
              ],
              answer: 1,
              explanation: "Knowing and disclosing your limits protects accuracy and the parties you serve.",
            },
          ],
        },
        {
          id: "l3",
          title: "Interpreter positioning and professional presence",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Recognize professional positioning and presentation for each modality"],
          content: [
            "Professional presence looks different across modalities but rests on the same principle: minimize your own footprint so communication flows directly between the parties. On-site, position yourself slightly to the side and behind the patient where possible, so the provider and patient maintain eye contact with each other rather than with you.",
            "On video, frame yourself from the chest up, centered, with even lighting and a plain background. On the phone, your voice is your entire presence — speak clearly, at a measured pace, and identify yourself and your role at the start of every call.",
          ],
          terminology: [
            { term: "Positioning", definition: "Where an interpreter physically or visually places themselves to support direct communication between parties." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Good on-site positioning aims to:",
              options: [
                "Put the interpreter at the center of attention",
                "Support direct eye contact between provider and patient",
                "Keep the interpreter out of the room entirely",
                "Face the interpreter away from both parties",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Boundaries, Gifts & Conflicts",
      lessons: [
        {
          id: "l4",
          title: "Professional boundaries reference handbook",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: ["Identify professional boundaries and how to maintain them"],
          content: [
            "Boundaries keep the interpreter's role clear. You are there to enable communication — not to advise, advocate, counsel, or befriend the parties. Boundary drift often begins with good intentions: a patient asks what you would do, a client asks for a ride, a family asks you to 'just explain it simply.' Each request, however sympathetic, pulls you out of your role.",
            "The professional response is warm but firm: redirect the question to the appropriate party ('I'll interpret that question for the doctor'), and interpret exactly what is said rather than substituting your own explanation. Maintaining boundaries protects your impartiality and ensures the provider — not the interpreter — remains responsible for the substance of the encounter.",
          ],
          terminology: [
            { term: "Boundary", definition: "The limit that separates the interpreter's role from the roles of the provider, client, and patient." },
            { term: "Role drift", definition: "Gradually taking on tasks outside interpreting, such as advising or advocating." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A patient asks the interpreter, 'What would you do?' The best response is to:",
              options: [
                "Give honest personal advice",
                "Interpret the question so the provider can answer",
                "Refuse to respond and stay silent",
                "Explain the medical options yourself",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Gifts, conflicts of interest, and disclosure",
          duration: "15:30",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Apply the rules on gifts and tips",
            "Identify and disclose conflicts of interest",
          ],
          content: [
            "Interpreters decline personal gifts, tips, and favors from the parties they serve. Even a small gift can create — or appear to create — a sense of obligation that threatens impartiality. Decline politely and explain that professional standards do not allow it; most people understand and respect the answer.",
            "A conflict of interest exists whenever your personal relationships or interests could bias, or appear to bias, your work. Interpreting for a relative, a neighbor, a business you have a stake in, or a case whose outcome affects you personally are all conflicts. The rule is simple: disclose the conflict immediately and withdraw if it cannot be managed. Disclosure protects everyone and is always the correct first step.",
          ],
          terminology: [
            { term: "Conflict of interest", definition: "A personal interest or relationship that could improperly influence, or appear to influence, professional judgment." },
            { term: "Disclosure", definition: "Promptly informing the relevant parties of a conflict or limitation." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An interpreter discovers the patient is a close family friend. They should:",
              options: [
                "Continue quietly to avoid delay",
                "Disclose the relationship immediately and withdraw if needed",
                "Interpret only the medical parts",
                "Ask the patient to keep it secret",
              ],
              answer: 1,
              explanation: "Prompt disclosure of a conflict of interest is always the correct first step.",
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("coc"),
  finalAssessment: {
    title: "Code of Conduct Final Quiz",
    category: "Foundation",
    durationMinutes: 15,
    passingScore: 80,
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
      {
        id: "q4",
        question: "Interpreting 'faithfully' means:",
        options: [
          "Improving the speaker's grammar",
          "Conveying the full meaning without adding, omitting, or altering it",
          "Summarizing to save time",
          "Leaving out offensive language",
        ],
        answer: 1,
      },
      {
        id: "q5",
        question: "When a patient asks the interpreter for personal advice, the interpreter should:",
        options: [
          "Provide their best opinion",
          "Interpret the question so the provider can respond",
          "Decline and end the session",
          "Change the subject",
        ],
        answer: 1,
      },
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// 2. HIPAA & Fraud Awareness
// ───────────────────────────────────────────────────────────────────────────
const hipaa: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "Protecting Health Information",
      lessons: [
        {
          id: "l1",
          title: "HIPAA fundamentals and why privacy matters",
          duration: "14:10",
          type: "video",
          completed: false,
          videoUrl: V.c,
          objectives: [
            "Define HIPAA and its purpose",
            "Explain what counts as Protected Health Information (PHI)",
            "Describe the interpreter's status as a business associate",
          ],
          content: [
            "The Health Insurance Portability and Accountability Act (HIPAA) is the U.S. federal law that sets national standards for protecting sensitive patient health information. Its Privacy Rule governs who may see and use that information, and its Security Rule governs how electronic information must be safeguarded. For interpreters, HIPAA is not background legal trivia — it directly defines how you must handle everything you hear and see on a medical assignment.",
            "Protected Health Information, or PHI, is any information that can identify a patient and relates to their health, care, or payment for care. It includes obvious items like names, diagnoses, and medical record numbers, but also dates, addresses, phone numbers, and any detail that could single out an individual. If it could help someone identify the patient, treat it as PHI.",
            "When you interpret in healthcare, you are considered a 'business associate' — a party that handles PHI on behalf of a covered entity such as a hospital or clinic. That status makes you personally bound by HIPAA's privacy obligations. You may use and disclose PHI only as needed to do your job, and never for any other purpose.",
          ],
          terminology: [
            { term: "HIPAA", definition: "The U.S. law setting national standards for protecting patient health information." },
            { term: "PHI (Protected Health Information)", definition: "Any information that identifies a patient and relates to their health, care, or payment." },
            { term: "Covered entity", definition: "A health plan, clearinghouse, or provider that transmits health information electronically." },
            { term: "Business associate", definition: "A party, such as an interpreter, that handles PHI on behalf of a covered entity." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Under HIPAA, a medical interpreter is generally considered:",
              options: [
                "An unrelated third party with no obligations",
                "A business associate bound by privacy rules",
                "A covered entity",
                "Exempt because they only speak, not write",
              ],
              answer: 1,
            },
            {
              id: "k2",
              question: "Which of the following is PHI?",
              options: [
                "A patient's diagnosis and appointment date",
                "The weather on the day of the visit",
                "The clinic's public phone number",
                "A general fact about a disease",
              ],
              answer: 0,
            },
          ],
        },
        {
          id: "l2",
          title: "Minimum necessary and safe handling of PHI (lecture)",
          duration: "19:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply the 'minimum necessary' principle",
            "Handle notes, devices, and conversations securely",
          ],
          content: [
            "HIPAA's 'minimum necessary' principle says you should access, use, and disclose only the smallest amount of PHI required to do your job. For an interpreter, that means you do not go looking at charts you were not asked to interpret, you do not repeat details that are not relevant, and you do not retain information after the encounter ends.",
            "Safe handling is mostly about everyday discipline. Do not take session notes on a personal phone or unsecured app; if you must take notes, keep them minimal and destroy them immediately afterward. Never discuss a case in a hallway, elevator, break room, or on social media. When working remotely, use a private space where others cannot overhear, and lock your screen when you step away.",
            "Remember that a casual, well-meaning comment can be a breach. Telling a colleague 'I just interpreted for someone from your neighborhood with the same condition' can identify a patient. The safe default is simple: what happens on assignment stays on assignment.",
          ],
          terminology: [
            { term: "Minimum necessary", definition: "The HIPAA principle of using or sharing only the least PHI required for a task." },
            { term: "Breach", definition: "An impermissible use or disclosure of PHI that compromises its privacy or security." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The 'minimum necessary' principle means an interpreter should:",
              options: [
                "Read the entire chart to be thorough",
                "Use and share only the PHI needed to do their job",
                "Keep detailed notes for future reference",
                "Share relevant PHI with interested colleagues",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Fraud, Waste & Abuse",
      lessons: [
        {
          id: "l3",
          title: "Recognizing fraud, waste, and abuse",
          duration: "16:00",
          type: "video",
          completed: false,
          videoUrl: V.d,
          objectives: [
            "Distinguish fraud, waste, and abuse",
            "Recognize red flags an interpreter might encounter",
          ],
          content: [
            "Fraud is an intentional deception for unlawful gain — for example, billing for services that were never provided. Waste is the overuse or careless use of resources, usually without intent to deceive. Abuse falls in between: practices that are inconsistent with sound standards and result in unnecessary cost, even if not clearly fraudulent. All three drain the healthcare system and can harm patients.",
            "Interpreters occasionally witness red flags: a request to interpret a consent the patient clearly did not receive, pressure to 'just say yes,' billing discussions that do not match the service delivered, or a party asking you to misrepresent what was said. You are not an investigator, and it is not your job to judge — but you must not participate in or conceal wrongdoing.",
          ],
          terminology: [
            { term: "Fraud", definition: "Intentional deception or misrepresentation made for unlawful gain." },
            { term: "Waste", definition: "Overuse or careless use of resources resulting in unnecessary cost." },
            { term: "Abuse", definition: "Practices inconsistent with sound standards that cause unnecessary cost or harm." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Billing a payer for a service that was never provided is an example of:",
              options: ["Waste", "Fraud", "Abuse", "A clerical error only"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Reporting obligations and breach response",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: [
            "Describe how and when to report suspected fraud or a breach",
            "Explain the interpreter's duty to report through proper channels",
          ],
          content: [
            "If you suspect fraud, waste, or abuse, or if you become aware of a privacy breach, report it through the proper compliance channels — typically your agency's compliance officer or the facility's reporting line. Report promptly and factually: describe what you observed without speculation. Do not attempt to investigate, confront anyone, or 'fix' it yourself.",
            "Reporting is protected. Good-faith reports made through the correct channels are shielded from retaliation, and failing to report known wrongdoing can itself be a violation. When a breach of PHI occurs — for example, notes left where others could read them — reporting quickly allows the covered entity to meet its legal notification obligations and limit harm.",
          ],
          terminology: [
            { term: "Compliance officer", definition: "The designated person responsible for receiving and acting on compliance and privacy reports." },
            { term: "Good-faith report", definition: "An honest report of suspected wrongdoing, protected from retaliation." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An interpreter who suspects fraud should:",
              options: [
                "Investigate it personally first",
                "Report it promptly through the proper compliance channels",
                "Ignore it unless it is large",
                "Confront the person involved",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("hipaa"),
  finalAssessment: {
    title: "HIPAA & Fraud Awareness Quiz",
    category: "Compliance",
    durationMinutes: 20,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "PHI stands for:",
        options: ["Private Health Interpretation", "Protected Health Information", "Patient Health Index", "Public Health Inspection"],
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
        options: ["Kept quiet", "Reported through the proper channels immediately", "Handled only if the patient complains", "Fixed by deleting records"],
        answer: 1,
      },
      {
        id: "q5",
        question: "The 'minimum necessary' rule tells interpreters to:",
        options: [
          "Use and disclose only the PHI needed for the task",
          "Always read the full medical record",
          "Share PHI with any clinician who asks",
          "Keep notes indefinitely",
        ],
        answer: 0,
      },
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// 3. Compliance Training
// ───────────────────────────────────────────────────────────────────────────
const compliance: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "The Compliance Framework",
      lessons: [
        {
          id: "l1",
          title: "What compliance means for language professionals",
          duration: "13:15",
          type: "video",
          completed: false,
          videoUrl: V.e,
          objectives: [
            "Define compliance and its role in language services",
            "Identify the main sources of compliance obligations",
          ],
          content: [
            "Compliance means conducting your work in accordance with the laws, regulations, contractual requirements, and organizational policies that apply to it. For a language professional, those obligations come from several directions at once: federal and state law (such as HIPAA and language-access requirements), the standards of the clients you serve, and the policies of the agency that assigns your work.",
            "The goal of a compliance program is not paperwork for its own sake. It exists to prevent harm, protect vulnerable people, and ensure that services are delivered lawfully and ethically. When you follow compliance requirements, you protect patients and clients, your agency, and your own professional standing.",
            "A useful habit is to ask, before acting in an unfamiliar situation, 'What policy or law applies here, and who can tell me if I'm unsure?' Compliance is rarely about memorizing every rule; it is about knowing that rules apply and knowing where to get an answer.",
          ],
          terminology: [
            { term: "Compliance", definition: "Conducting work in accordance with applicable laws, regulations, contracts, and policies." },
            { term: "Language access", definition: "The legal obligation of many organizations to provide meaningful access to people with limited English proficiency." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Compliance policies primarily exist to:",
              options: [
                "Slow down the workflow",
                "Ensure legal, ethical, and regulatory obligations are met",
                "Increase paperwork",
                "Limit interpreter assignments",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Policies, documentation, and record-keeping (lecture)",
          duration: "17:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Follow documentation and record-keeping requirements",
            "Handle sensitive records according to policy",
          ],
          content: [
            "Many assignments require accurate records: confirming your identity and credentials, logging the time and nature of the service, and sometimes noting that certain disclosures were interpreted. Accurate, honest documentation protects everyone and is itself a compliance obligation — falsifying or padding records is a serious violation.",
            "Sensitive records must be handled according to policy: stored securely, shared only with authorized people, retained only as long as required, and disposed of properly. Never store client or patient records on personal devices or unsecured cloud accounts, and follow your agency's specific retention and destruction rules.",
          ],
          terminology: [
            { term: "Record retention", definition: "The policy governing how long records must be kept and when they must be destroyed." },
            { term: "Falsification", definition: "Deliberately entering false or misleading information into a record." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Records containing sensitive information must be:",
              options: [
                "Stored on personal devices for convenience",
                "Handled and stored according to policy",
                "Shared freely within the team",
                "Kept indefinitely",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Acting Compliantly Day to Day",
      lessons: [
        {
          id: "l3",
          title: "Escalation: what to do when you are unsure",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: ["Escalate compliance questions correctly", "Recognize when to pause and ask"],
          content: [
            "The single most important compliance skill is knowing when to stop and ask. If you are unsure whether an action is permitted — whether you can share a document, accept an assignment, or proceed with a request — the compliant choice is to ask the compliance team or your agency before acting, not after. A short delay to confirm is always preferable to an irreversible mistake.",
            "Escalation is a normal, expected part of professional work, not a sign of weakness. Agencies build reporting and question channels precisely because no one can anticipate every situation. Using them protects you and demonstrates exactly the judgment a professional is expected to have.",
          ],
          terminology: [
            { term: "Escalation", definition: "Raising a question or concern to a higher authority who can decide or advise." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When unsure whether an action is compliant, an interpreter should:",
              options: ["Proceed anyway", "Ask the compliance team before acting", "Guess", "Ask another interpreter and move on"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Compliance scenarios and self-review",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Apply compliance reasoning to realistic scenarios"],
          content: [
            "Work through common situations mentally: A client asks you to email a session recording to a personal address — do you have authorization and a secure method? A provider asks you to sign a log for a session you did not attend — is that accurate? A friend asks how a mutual acquaintance's appointment went — is that a disclosure?",
            "In each case, the compliant answer follows from the same logic: identify the rule, protect sensitive information, document honestly, and escalate anything uncertain. Practicing this reasoning until it becomes automatic is the aim of compliance training.",
          ],
          terminology: [
            { term: "Authorization", definition: "Documented permission to use or disclose information for a specific purpose." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A provider asks you to sign a log for a session you did not attend. You should:",
              options: [
                "Sign it to be helpful",
                "Decline, because signing would falsify a record",
                "Sign but add a note later",
                "Ask a colleague to sign instead",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("comp"),
  finalAssessment: {
    title: "Compliance Training Final Quiz",
    category: "Compliance",
    durationMinutes: 15,
    passingScore: 80,
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
      {
        id: "q4",
        question: "Falsifying a service record is:",
        options: ["Acceptable if minor", "A serious compliance violation", "Encouraged to save time", "Only an issue if discovered"],
        answer: 1,
      },
      {
        id: "q5",
        question: "Language access requirements are intended to serve:",
        options: [
          "People with limited English proficiency",
          "Only certified interpreters",
          "Hospital administrators",
          "Insurance companies",
        ],
        answer: 0,
      },
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// 4. Ethics & Standards of Practice
// ───────────────────────────────────────────────────────────────────────────
const ethics: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "Core Ethical Principles",
      lessons: [
        {
          id: "l1",
          title: "Impartiality, accuracy, and confidentiality",
          duration: "15:50",
          type: "video",
          completed: false,
          videoUrl: V.f,
          objectives: [
            "Explain the core ethical principles of interpreting",
            "Apply impartiality, accuracy, and confidentiality to practice",
          ],
          content: [
            "Professional interpreting rests on a small set of ethical principles that recur in every recognized code of ethics. Accuracy requires you to convey the full meaning of each message faithfully, preserving tone and register, without adding, omitting, or editing. Impartiality requires you to remain neutral — you do not advocate, advise, or let personal views influence your rendering. Confidentiality requires you to keep everything you learn on assignment private.",
            "These principles frequently reinforce one another, but they can also create tension. Accuracy may require you to interpret an offensive or mistaken statement exactly as spoken; impartiality forbids softening it. Confidentiality may prevent you from explaining to a curious family member why you cannot discuss the case. In each situation, the principles — not your personal comfort — govern the right choice.",
          ],
          terminology: [
            { term: "Impartiality", definition: "Remaining neutral and refraining from advocacy, advice, or personal bias." },
            { term: "Register", definition: "The level of formality and style of language, which the interpreter must preserve." },
            { term: "Confidentiality", definition: "The duty to keep all assignment information private." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The principle of impartiality requires interpreters to:",
              options: [
                "Take the side of the vulnerable party",
                "Refrain from expressing personal opinions or bias",
                "Advise clients on the best decision",
                "Correct participants' factual errors",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Role boundaries and transparency (lecture)",
          duration: "18:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Maintain role boundaries",
            "Use transparency to keep the encounter clear",
          ],
          content: [
            "Transparency is the principle that everything said in the encounter is interpreted, and nothing happens 'off the record.' If a party speaks to you directly, you interpret that too, so no one is left out. If you must step out of your role briefly — to ask for a repetition or to note a possible misunderstanding — you say so openly in both languages so everyone knows what is happening.",
            "Role boundaries and transparency work together. You do not hold private side conversations, you do not answer questions meant for the provider, and you make your role visible when you begin: 'I am your interpreter; I will interpret everything that is said.' This clarity prevents the parties from mistaking you for an advocate, advisor, or decision-maker.",
          ],
          terminology: [
            { term: "Transparency", definition: "The practice of interpreting everything and openly signaling any step outside the interpreter role." },
            { term: "Advocacy", definition: "Taking action on behalf of a party's interests — generally outside the interpreter's role." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Transparency means that an interpreter:",
              options: [
                "Keeps some remarks off the record for efficiency",
                "Interprets everything said and openly signals any step out of role",
                "Explains the provider's reasoning to the patient",
                "Shares their notes with both parties",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Ethical Decision-Making",
      lessons: [
        {
          id: "l3",
          title: "Managing ethical dilemmas and competence limits",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: [
            "Work through ethical dilemmas systematically",
            "Recognize when to decline or withdraw",
          ],
          content: [
            "Ethical dilemmas arise when principles seem to conflict or when the right action is unclear. A useful method is to name the principles in tension, consider the parties affected, identify the option that best preserves accuracy and impartiality, and choose transparency over silence whenever possible. When a genuine misunderstanding threatens safety, professional standards allow you to note it neutrally — 'The interpreter would like to point out a possible miscommunication' — rather than staying silent or overstepping.",
            "Competence is also an ethical matter. If an assignment exceeds your skills — an unfamiliar specialty, a dialect you cannot render accurately, or a conflict of interest you cannot manage — the ethical course is to decline or withdraw. Continuing beyond your competence risks the very harm the ethical principles exist to prevent.",
          ],
          terminology: [
            { term: "Ethical dilemma", definition: "A situation where ethical principles appear to conflict or the right action is unclear." },
            { term: "Withdrawal", definition: "Stepping away from an assignment you cannot perform ethically or competently." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If an assignment exceeds an interpreter's competence, they should:",
              options: ["Continue anyway", "Decline or withdraw from the assignment", "Improvise", "Ask the client to slow down"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Standards of practice illustrated",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Connect ethical principles to concrete standards of practice"],
          content: [
            "Standards of practice translate principles into observable behaviors: introducing yourself and your role, using the first person for the speaker's words, managing turn-taking, maintaining a complete and accurate rendering, and protecting confidentiality afterward. Picture each standard as a checkpoint you can verify in any encounter.",
            "When principles and standards align in your habits, ethical practice becomes second nature rather than a series of difficult decisions. That reliability is what earns the trust of clients and the people they serve.",
          ],
          terminology: [
            { term: "Standards of practice", definition: "The concrete, observable behaviors that implement ethical principles during an encounter." },
            { term: "First person", definition: "Interpreting in the voice of the speaker ('I') rather than reporting ('he said')." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Interpreting in the first person means the interpreter:",
              options: [
                "Speaks as 'I' in the voice of the actual speaker",
                "Always refers to 'the patient' and 'the doctor'",
                "Adds their own commentary",
                "Summarizes in the third person",
              ],
              answer: 0,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("eth"),
  finalAssessment: {
    title: "Ethics & Standards Knowledge Check",
    category: "Ethics",
    durationMinutes: 25,
    passingScore: 80,
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
      {
        id: "q4",
        question: "Transparency in interpreting means:",
        options: [
          "Interpreting everything and signaling any step out of role",
          "Keeping side conversations private",
          "Explaining the provider's decisions",
          "Sharing notes with both parties",
        ],
        answer: 0,
      },
      {
        id: "q5",
        question: "Preserving 'register' means keeping the:",
        options: ["Speaker's level of formality and style", "Volume of the conversation", "Length of each sentence", "Interpreter's own tone"],
        answer: 0,
      },
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// 5. Customer Service Interpretation
// ───────────────────────────────────────────────────────────────────────────
const customerService: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "Contact-Center Fundamentals",
      lessons: [
        {
          id: "l1",
          title: "The customer-service interpreting environment",
          duration: "13:20",
          type: "video",
          completed: false,
          videoUrl: V.g,
          objectives: [
            "Describe the customer-service interpreting setting",
            "Identify the goals of a support call",
          ],
          content: [
            "Customer-service interpreting supports business and contact-center interactions: billing questions, account support, technical help, retail issues, insurance, and utilities. The tone is professional and efficient, and calls are often measured against handle-time targets, so clarity and pace matter as much as accuracy.",
            "The interpreter's goal is to let the customer and the representative communicate as though no language barrier existed. You convey the customer's issue accurately, interpret the representative's questions and solutions faithfully, and keep the exchange moving without inserting yourself into the transaction.",
          ],
          terminology: [
            { term: "Contact center", definition: "A facility handling large volumes of customer inquiries by phone or chat." },
            { term: "Handle time", definition: "The total time spent on a customer interaction, often measured for efficiency." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The interpreter's goal on a support call is to:",
              options: [
                "Resolve the issue themselves",
                "Enable direct communication between customer and representative",
                "Speed the call by summarizing",
                "Advocate for the customer",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Tone, register, and turn-taking (lecture)",
          duration: "16:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Manage tone and register on business calls",
            "Control turn-taking to keep exchanges clear",
          ],
          content: [
            "Tone management is a core customer-service skill. Customers may be frustrated, confused, or upset; representatives must stay courteous and on-script. You preserve the tone of each speaker faithfully — including frustration — while keeping your own delivery calm and neutral. You never soften a complaint or sharpen a reply.",
            "Turn-taking keeps fast business calls intelligible. Use brief, clear signals to manage the flow, ask speakers to pause when segments run long, and render each turn completely before the next begins. Good turn-taking prevents overlap, reduces repetition, and shortens handle time — a direct benefit to the client.",
          ],
          terminology: [
            { term: "Turn-taking", definition: "Managing the order and length of speaking turns so each can be interpreted accurately." },
            { term: "Tone management", definition: "Faithfully preserving each speaker's emotional tone while remaining neutral in delivery." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a customer is audibly angry, the interpreter should:",
              options: [
                "Soften the message to keep things calm",
                "Preserve the customer's tone while delivering neutrally",
                "Add an apology of their own",
                "Skip the emotional parts",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Handling Difficult Calls",
      lessons: [
        {
          id: "l3",
          title: "De-escalation, scripts, and verification",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: [
            "Interpret scripted and compliance language accurately",
            "Support de-escalation without leaving the interpreter role",
          ],
          content: [
            "Business calls are full of scripted and compliance language: identity verification, recorded-line disclosures, terms and conditions, and mini-Miranda style debt-collection notices. These must be interpreted completely and precisely, because they carry legal weight. Never paraphrase or shorten them, even when they are long or repetitive.",
            "De-escalation happens through the representative, not the interpreter. You support it by conveying the representative's calm, solution-focused language accurately and by interpreting the customer's concerns fully so they feel heard. You do not add reassurances of your own or coach either party; faithful interpreting is itself the most powerful de-escalation tool you control.",
          ],
          terminology: [
            { term: "Identity verification", definition: "A scripted process confirming a caller's identity before account access." },
            { term: "Disclosure", definition: "Required scripted language, such as a recorded-line notice, that must be interpreted verbatim." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Scripted compliance language on a call should be:",
              options: [
                "Summarized to save time",
                "Interpreted completely and precisely",
                "Skipped if the customer is impatient",
                "Reworded in simpler terms",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Efficiency and quality metrics",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Balance speed and accuracy against quality metrics"],
          content: [
            "Contact centers track metrics such as handle time, first-call resolution, and customer satisfaction. Interpreters influence all three: clear turn-taking shortens calls, complete rendering improves resolution, and a professional, warm delivery raises satisfaction. Speed and quality are not opposites when your technique is disciplined.",
            "The one thing you never trade for speed is accuracy. If a rushed pace threatens a correct rendering — especially on numbers, names, and compliance language — it is professional to ask briefly for a repeat. A short pause protects the customer far more than a fast but wrong call.",
          ],
          terminology: [
            { term: "First-call resolution", definition: "Resolving a customer's issue in a single interaction without follow-up." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If speed threatens accuracy on account numbers, the interpreter should:",
              options: ["Guess to keep pace", "Ask briefly for a repeat", "Skip the numbers", "End the call"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("cs"),
  finalAssessment: {
    title: "Customer Service Interpretation Assessment",
    category: "Customer Service",
    durationMinutes: 20,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "On a support call, the interpreter's role is to:",
        options: [
          "Resolve the customer's issue directly",
          "Enable direct communication between the customer and representative",
          "Advocate for the customer",
          "Summarize to shorten the call",
        ],
        answer: 1,
      },
      {
        id: "q2",
        question: "When a customer is angry, the interpreter should:",
        options: ["Soften the message", "Preserve the tone while delivering neutrally", "Add their own apology", "Skip emotional content"],
        answer: 1,
      },
      {
        id: "q3",
        question: "Scripted compliance disclosures must be interpreted:",
        options: ["In summary", "Completely and precisely", "Only if requested", "In simpler words"],
        answer: 1,
      },
      {
        id: "q4",
        question: "Good turn-taking on business calls helps by:",
        options: [
          "Increasing overlap",
          "Keeping exchanges clear and reducing repetition",
          "Letting the interpreter speak first",
          "Removing the need to interpret every turn",
        ],
        answer: 1,
      },
      {
        id: "q5",
        question: "Speed should never be gained at the expense of:",
        options: ["Politeness", "Accuracy", "Call volume", "Script length"],
        answer: 1,
      },
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// 6. OPI (Over-the-Phone Interpreting)
// ───────────────────────────────────────────────────────────────────────────
const opi: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "Audio-Only Skills",
      lessons: [
        {
          id: "l1",
          title: "The over-the-phone interpreting call flow",
          duration: "14:00",
          type: "video",
          completed: false,
          videoUrl: V.h,
          objectives: [
            "Describe the standard OPI call flow",
            "Deliver a professional call introduction",
          ],
          content: [
            "Over-the-phone interpreting (OPI) is audio-only, on-demand interpreting connected in seconds. A typical call follows a predictable flow: you receive the language and sometimes the context, you are connected to the requesting party, you give a brief professional introduction, you confirm the limited-English-proficient (LEP) speaker is on the line, and then you interpret the conversation until it ends.",
            "The introduction sets the tone: state your interpreter ID or name, your role, and that everything will be interpreted and kept confidential. A crisp introduction reassures both parties, establishes the ground rules for turn-taking, and signals that a trained professional is handling the exchange.",
          ],
          terminology: [
            { term: "OPI", definition: "Over-the-phone interpreting: audio-only interpreting delivered remotely, often on demand." },
            { term: "LEP", definition: "Limited English Proficiency: a person who does not speak English as their primary language and has a limited ability to communicate in it." },
            { term: "Pre-session / introduction", definition: "A brief opening statement of the interpreter's ID, role, and ground rules." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A professional OPI introduction should include:",
              options: [
                "The interpreter's personal opinions",
                "The interpreter's ID/role and a confidentiality note",
                "A summary of the expected outcome",
                "The interpreter's home city",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Note-taking and memory for audio (lecture)",
          duration: "17:15",
          type: "lecture",
          completed: false,
          objectives: [
            "Use note-taking to support consecutive OPI",
            "Retain numbers, names, and lists accurately",
          ],
          content: [
            "Without visual cues, OPI relies heavily on listening and memory. Consecutive interpreting is the norm: the speaker produces a segment, pauses, and you render it. Good note-taking captures the load-bearing details — numbers, names, dates, dosages, and the sequence of items — using quick symbols and abbreviations rather than full sentences.",
            "Train your memory to hold the structure of a segment while your notes anchor the specifics. If a segment runs too long to render accurately, it is professional to interject politely and ask the speaker to pause. Accuracy on numbers and names is critical in OPI because there is no document or screen to double-check against.",
          ],
          terminology: [
            { term: "Consecutive interpreting", definition: "Interpreting after the speaker pauses, rather than while they speak." },
            { term: "Note-taking", definition: "Capturing key details with symbols and abbreviations to support accurate rendering." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In OPI, note-taking is most important for capturing:",
              options: [
                "Every word verbatim",
                "Numbers, names, dates, and sequences",
                "The interpreter's opinions",
                "Background noise",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Managing the Audio Encounter",
      lessons: [
        {
          id: "l3",
          title: "Clarifications, transparency, and audio challenges",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: [
            "Request clarification transparently",
            "Handle poor audio and crosstalk professionally",
          ],
          content: [
            "When you miss a word, hit an unfamiliar term, or cannot hear clearly, ask for clarification transparently: 'This is the interpreter — I need to confirm a term,' then interpret both your request and the answer so no one is excluded. Never guess on the essentials; a brief clarification is always better than an invented rendering.",
            "Audio problems are common. If there is crosstalk, ask that only one person speak at a time. If the line is poor, ask for a repeat or a callback. If a speaker is on speakerphone in a noisy room, request a handset. Managing the channel is part of professional OPI, because nothing can be interpreted accurately if it cannot be heard.",
          ],
          terminology: [
            { term: "Crosstalk", definition: "Two or more people speaking at once, making accurate interpreting impossible." },
            { term: "Clarification", definition: "A transparent request to confirm or repeat something before interpreting it." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When the interpreter cannot hear a key detail, they should:",
              options: [
                "Guess based on context",
                "Transparently ask for a repeat or clarification",
                "Omit the detail",
                "Continue and hope it is unimportant",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Positioning and etiquette without video",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Apply phone etiquette that compensates for the lack of visual cues"],
          content: [
            "Because callers cannot see you, your voice must do all the work of presence: speak at a measured pace, articulate clearly, and avoid filler sounds. Signal turn changes verbally, and use the third-party's name or role when needed to keep track of who is speaking.",
            "Etiquette also means minimizing your own noise — a quiet environment, a good headset, and no typing or shuffling near the microphone. A clean audio channel from your side is a professional courtesy that directly improves accuracy for everyone.",
          ],
          terminology: [
            { term: "Etiquette", definition: "The professional courtesies that keep a remote call clear and respectful." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Because OPI has no video, the interpreter should especially focus on:",
              options: ["Clear voice, pacing, and a quiet channel", "Facial expressions", "Hand gestures", "Screen sharing"],
              answer: 0,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("opi"),
  finalAssessment: {
    title: "OPI Training Assessment",
    category: "Remote Interpreting",
    durationMinutes: 20,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "OPI stands for:",
        options: ["Official Public Interpreting", "Over-the-Phone Interpreting", "Optional Phone Interaction", "On-Premises Interpreting"],
        answer: 1,
      },
      {
        id: "q2",
        question: "A professional OPI introduction includes:",
        options: [
          "The interpreter's opinions",
          "The interpreter's ID/role and a confidentiality note",
          "A prediction of the outcome",
          "Personal small talk",
        ],
        answer: 1,
      },
      {
        id: "q3",
        question: "The standard mode for most OPI calls is:",
        options: ["Simultaneous", "Consecutive", "Summary", "Sight translation"],
        answer: 1,
      },
      {
        id: "q4",
        question: "When the interpreter cannot hear a key detail, they should:",
        options: ["Guess", "Transparently ask for a repeat", "Omit it", "End the call"],
        answer: 1,
      },
      {
        id: "q5",
        question: "In OPI, note-taking most helps with:",
        options: ["Numbers, names, and sequences", "Interpreter opinions", "Background sounds", "Video framing"],
        answer: 0,
      },
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// 7. VRI (Video Remote Interpreting)
// ───────────────────────────────────────────────────────────────────────────
const vri: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "Camera Presence & Setup",
      lessons: [
        {
          id: "l1",
          title: "The VRI environment and technical setup",
          duration: "14:30",
          type: "video",
          completed: false,
          videoUrl: V.i,
          objectives: [
            "Set up a professional VRI workspace",
            "Explain when VRI is preferred over OPI",
          ],
          content: [
            "Video Remote Interpreting (VRI) adds a visual channel to remote interpreting, which is essential for encounters that rely on visual cues — signed-language interpreting, showing a body part or a document, or reading facial expression and affect. VRI is often preferred when visual context materially improves accuracy and rapport.",
            "A professional VRI setup is deliberate: a stable high-speed connection, a quality camera at eye level, even front lighting, a plain and non-distracting background, and a headset that captures clear audio. Test everything before the encounter. Technical failures on video are disruptive and erode confidence, so preparation is a professional obligation, not an afterthought.",
          ],
          terminology: [
            { term: "VRI", definition: "Video Remote Interpreting: remote interpreting with both audio and video channels." },
            { term: "Affect", definition: "The observable emotional state of a speaker, visible on video and relevant to accurate interpreting." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "VRI is especially preferred over phone interpreting when:",
              options: [
                "The call is expected to be short",
                "Visual cues materially improve accuracy or rapport",
                "The interpreter prefers not to speak",
                "The connection is unstable",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Framing, eye contact, and camera presence (lecture)",
          duration: "16:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Frame and present professionally on camera",
            "Manage eye contact and non-verbal signals",
          ],
          content: [
            "Camera presence is a learned skill. Frame yourself from roughly the chest up, centered, with your eyes about one-third from the top of the frame. Look toward the camera to approximate eye contact, keep movements calm, and dress professionally. Your visible demeanor should be neutral and attentive — you are present but not the focus.",
            "Use the visual channel to support turn-taking: a raised hand or a small gesture can signal that you need a pause without interrupting verbally. Because parties can see you, avoid distracting habits — looking off-screen, eating, or fidgeting — that would undermine the professional impression and pull attention away from the parties.",
          ],
          terminology: [
            { term: "Framing", definition: "How the interpreter is positioned within the camera's view." },
            { term: "Non-verbal signal", definition: "A gesture or expression used to manage the encounter without interrupting speech." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Good VRI framing places the interpreter:",
              options: [
                "Far from the camera, full body",
                "Centered, from about the chest up, at eye level",
                "Off to the edge of the frame",
                "Backlit by a window",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Managing the Video Encounter",
      lessons: [
        {
          id: "l3",
          title: "Platform tools and troubleshooting",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: [
            "Use platform tools appropriately",
            "Recover from technical problems professionally",
          ],
          content: [
            "VRI platforms offer tools — mute, chat, screen share, pinning a speaker — that can help or distract. Use them purposefully: mute when not speaking in noisy settings, pin the active speaker to track turns, and avoid the chat for anything that should be interpreted aloud, since side-channel text can violate transparency.",
            "When technology fails — frozen video, dropped audio, a crashed session — stay calm and follow a simple protocol: acknowledge the problem transparently, attempt a quick fix (reconnect, switch to audio), and, if needed, fall back to a phone line so the encounter can continue. Announcing the fallback in both languages keeps everyone informed and preserves trust.",
          ],
          terminology: [
            { term: "Fallback", definition: "A backup method, such as switching to phone audio, used when video fails." },
            { term: "Pinning", definition: "Fixing a particular participant's video as the main view to track the active speaker." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When VRI video freezes mid-encounter, the interpreter should:",
              options: [
                "Silently wait and hope it recovers",
                "Transparently acknowledge it and move to a fallback such as audio",
                "End the session immediately",
                "Keep interpreting the frozen image",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Positioning for signed and multi-party video",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Adapt positioning for signed-language and multi-party video encounters"],
          content: [
            "For signed-language VRI, framing must show the full signing space — typically head to mid-torso with room for the hands — and lighting must avoid shadows across the face and hands. For multi-party encounters, position and pin participants so you can see whoever is speaking, and manage turn-taking actively so only one visual speaker holds the floor at a time.",
            "In every configuration, the aim is the same as on-site positioning: arrange the visual field so communication flows between the parties, with the interpreter clearly present but never the center of the interaction.",
          ],
          terminology: [
            { term: "Signing space", definition: "The visual area in front of a signer where signs are produced, which must be fully visible on camera." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "For signed-language VRI, the camera framing must:",
              options: [
                "Show only the face",
                "Show the full signing space with clear lighting",
                "Zoom in on the hands only",
                "Be as far away as possible",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("vri"),
  finalAssessment: {
    title: "VRI Training Assessment",
    category: "Remote Interpreting",
    durationMinutes: 20,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "VRI stands for:",
        options: ["Verified Remote Interpreting", "Video Remote Interpreting", "Virtual Real-time Interaction", "Voice Recognition Interface"],
        answer: 1,
      },
      {
        id: "q2",
        question: "VRI is preferred over OPI when:",
        options: [
          "The call will be short",
          "Visual cues improve accuracy or rapport",
          "The interpreter has a weak connection",
          "No LEP speaker is present",
        ],
        answer: 1,
      },
      {
        id: "q3",
        question: "Professional VRI framing is:",
        options: ["Full body, far away", "Centered, chest-up, at eye level", "Off to one edge", "Backlit"],
        answer: 1,
      },
      {
        id: "q4",
        question: "When video freezes, the interpreter should:",
        options: ["Wait silently", "Acknowledge it and use a fallback like audio", "End the session", "Interpret the frozen frame"],
        answer: 1,
      },
      {
        id: "q5",
        question: "For signed-language VRI, framing must show:",
        options: ["Only the face", "The full signing space with good lighting", "The hands only", "The background"],
        answer: 1,
      },
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// 8. Immigration Interpretation
// ───────────────────────────────────────────────────────────────────────────
const immigration: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "Settings & Procedures",
      lessons: [
        {
          id: "l1",
          title: "Immigration settings: USCIS, asylum, and hearings",
          duration: "15:30",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Identify the main immigration interpreting settings",
            "Describe the interpreter's role in each",
          ],
          content: [
            "Immigration interpreting spans USCIS interviews (such as naturalization and green-card appointments), credible-fear and asylum interviews, and immigration court hearings before an immigration judge. Each setting is high-stakes: the accuracy of interpretation can influence whether a person is granted status, protection, or the ability to remain with their family.",
            "Across all settings, the interpreter conveys everything faithfully and impartially, in the first person, without simplifying, coaching, or advocating. In court, you interpret for the record; in interviews, you enable a precise exchange between officer and applicant. Your neutrality is essential — you serve the communication, not any party's goal.",
          ],
          terminology: [
            { term: "USCIS", definition: "U.S. Citizenship and Immigration Services, which conducts immigration benefit interviews." },
            { term: "Asylum interview", definition: "An interview to determine whether a person qualifies for protection from persecution." },
            { term: "Credible fear", definition: "A screening standard used to determine whether an asylum claim can proceed." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In an asylum interview, the interpreter's job is to:",
              options: [
                "Help the applicant present the strongest case",
                "Convey everything faithfully and impartially",
                "Summarize to save the officer time",
                "Explain immigration law to the applicant",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Trauma-informed interpreting and cultural sensitivity (lecture)",
          duration: "18:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply trauma-informed practices",
            "Handle cultural and dialectal sensitivity",
          ],
          content: [
            "Asylum and immigration accounts often involve trauma — violence, persecution, loss. Trauma-informed interpreting means rendering these accounts accurately and steadily without adding or absorbing emotion, taking care not to re-traumatize, and recognizing that your own reactions must not intrude. You maintain composure even with difficult content, because the applicant's exact words matter.",
            "Cultural and dialectal sensitivity is equally important. Terms for family relationships, geography, dates, and customs may not map neatly between languages, and a wrong assumption can distort a record. When a term is ambiguous or culturally specific, interpret what is said and, if necessary, transparently note the ambiguity rather than choosing an interpretation that could mislead.",
          ],
          terminology: [
            { term: "Trauma-informed", definition: "An approach that recognizes the effects of trauma and avoids re-traumatizing the speaker." },
            { term: "Dialectal variation", definition: "Differences in vocabulary or usage across regions that can affect accurate interpreting." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When an asylum seeker describes traumatic events, the interpreter should:",
              options: [
                "Soften the account to protect them",
                "Render it accurately and steadily without adding or absorbing emotion",
                "Summarize the disturbing parts",
                "Offer comfort and advice",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Accuracy on the Record",
      lessons: [
        {
          id: "l3",
          title: "Terminology, sight translation, and the record",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: [
            "Handle immigration terminology and documents",
            "Correct errors on the record properly",
          ],
          content: [
            "Immigration encounters use specialized terminology — forms and statuses (I-589, adjustment of status, parole), legal terms, and country-condition references. Prepare by reviewing common terms, and when you encounter an unfamiliar one, ask for clarification rather than guessing. You may be asked to sight translate a document — reading a written text aloud in the other language — which must be done completely and accurately.",
            "Because much of this work is on the record, error correction is a professional duty. If you realize you made a mistake, correct it immediately and transparently ('The interpreter wishes to correct the record') rather than letting an inaccurate rendering stand. An honest, prompt correction protects the integrity of the proceeding.",
          ],
          terminology: [
            { term: "Sight translation", definition: "Reading a written document aloud in another language in real time." },
            { term: "On the record", definition: "Part of the official transcript of a proceeding, where accuracy is legally critical." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If an interpreter realizes they made an error on the record, they should:",
              options: [
                "Leave it to avoid disruption",
                "Correct it immediately and transparently",
                "Fix it quietly after the session",
                "Ask the attorney to fix it",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Roles in the immigration hearing illustrated",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Recognize the participants and interpreter positioning in a hearing"],
          content: [
            "An immigration hearing involves the immigration judge, the respondent (the person in proceedings), attorneys for each side, and the interpreter. The interpreter renders everything for the respondent and interprets the respondent's testimony for the record, remaining strictly neutral among all parties.",
            "Positioning and turn management keep the record clean: interpret in the first person, signal when you need a pause, and never engage in side conversation with the respondent. Your visible neutrality reassures the court that the testimony is faithfully conveyed.",
          ],
          terminology: [
            { term: "Respondent", definition: "The individual who is the subject of immigration proceedings." },
            { term: "Immigration judge", definition: "The official who presides over immigration court hearings." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "During testimony, the interpreter must remain:",
              options: ["An ally to the respondent", "Strictly neutral among all parties", "An advisor to the judge", "Silent unless asked"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("imm"),
  finalAssessment: {
    title: "Immigration Interpretation Assessment",
    category: "Immigration",
    durationMinutes: 30,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "In immigration settings, the interpreter must be:",
        options: ["An advocate for the applicant", "Faithful and impartial", "A legal advisor", "A summarizer"],
        answer: 1,
      },
      {
        id: "q2",
        question: "Trauma-informed interpreting means:",
        options: [
          "Softening traumatic accounts",
          "Rendering accurately and steadily without adding or absorbing emotion",
          "Skipping disturbing details",
          "Giving the speaker advice",
        ],
        answer: 1,
      },
      {
        id: "q3",
        question: "Sight translation is:",
        options: ["Interpreting a video", "Reading a written document aloud in another language", "Whispered interpreting", "Translating road signs"],
        answer: 1,
      },
      {
        id: "q4",
        question: "An error made on the record should be:",
        options: ["Ignored", "Corrected immediately and transparently", "Fixed privately later", "Left to the attorney"],
        answer: 1,
      },
      {
        id: "q5",
        question: "When an immigration term is unfamiliar, the interpreter should:",
        options: ["Guess from context", "Ask for clarification", "Omit it", "Substitute a similar word"],
        answer: 1,
      },
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// 9. Government & Public Sector Interpretation
// ───────────────────────────────────────────────────────────────────────────
const government: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "Serving Public Institutions",
      lessons: [
        {
          id: "l1",
          title: "Public-sector settings and language access",
          duration: "14:20",
          type: "video",
          completed: false,
          videoUrl: V.c,
          objectives: [
            "Identify government and public-sector interpreting settings",
            "Explain language-access obligations",
          ],
          content: [
            "Government and public-sector interpreting supports social services, benefits offices, public health, housing, education, law enforcement contact, and civic processes. Many of these agencies are legally required to provide meaningful language access to people with limited English proficiency, and interpreters are how that obligation is met in practice.",
            "The interpreter's role is to enable precise, neutral, and compliant communication between the public and the institution. You render everything faithfully, keep information confidential, and remain impartial toward both the agency and the individual, so that people can exercise their rights and access services without a language barrier standing in the way.",
          ],
          terminology: [
            { term: "Public sector", definition: "Government agencies and publicly funded institutions serving the community." },
            { term: "Meaningful access", definition: "Language assistance sufficient for a person to understand and participate in a service or process." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Language-access requirements in public agencies exist to:",
              options: [
                "Reduce the agency's workload",
                "Give people with limited English meaningful access to services",
                "Replace written translation",
                "Limit who can receive services",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Neutrality, terminology, and register (lecture)",
          duration: "16:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Maintain neutrality with public institutions",
            "Handle agency-specific terminology and register",
          ],
          content: [
            "Public-sector encounters carry a natural power imbalance between the institution and the individual. The interpreter must remain scrupulously neutral, resisting any pull to advocate for the person or to align with the agency. You convey each side accurately, including bureaucratic language the individual may find confusing — because it is not your role to simplify or interpret the meaning of a policy, only to render it faithfully.",
            "Government work is dense with agency-specific terminology, program names, and formal register. Prepare by learning common terms for the setting, and preserve the register of official language so that formal notices, rights advisements, and instructions retain their weight and precision in the other language.",
          ],
          terminology: [
            { term: "Power imbalance", definition: "An unequal relationship, such as between an agency and an individual, that the interpreter must not tilt." },
            { term: "Rights advisement", definition: "Formal notification of a person's rights, which must be interpreted precisely." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Faced with confusing bureaucratic language, the interpreter should:",
              options: [
                "Simplify it so the person understands",
                "Render it faithfully and let the agency explain",
                "Skip it if it seems unimportant",
                "Advise the person what it means",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Compliance & Sensitive Encounters",
      lessons: [
        {
          id: "l3",
          title: "Confidentiality, consent, and sensitive services",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: [
            "Protect confidentiality in public services",
            "Handle sensitive service encounters professionally",
          ],
          content: [
            "Public services often involve sensitive matters: benefits eligibility, child welfare, domestic violence services, public health, and law-enforcement contact. Confidentiality is critical, and consent and privacy rules vary by setting. Handle every detail as private, follow the agency's rules, and never discuss cases outside the encounter.",
            "Sensitive encounters demand composure and strict role discipline. Emotions may run high and the stakes are personal, but your task remains constant: faithful, neutral, complete interpreting. If a situation raises a safety concern or a clear misunderstanding, note it transparently and neutrally rather than acting on it yourself.",
          ],
          terminology: [
            { term: "Consent", definition: "A person's informed agreement, which may be required before certain services or disclosures." },
            { term: "Child welfare", definition: "Public services concerned with the safety and well-being of children." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In sensitive public-service encounters, the interpreter should:",
              options: [
                "Take the side of the vulnerable party",
                "Keep faithful, neutral, and confidential",
                "Advise on the best course of action",
                "Share details with relevant agencies",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "The public-service encounter illustrated",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Recognize roles and flow in a public-service encounter"],
          content: [
            "A typical public-service encounter involves an agency representative, the member of the public, and the interpreter. The representative explains a process, requirements, or a decision; the individual asks questions or provides information; and the interpreter conveys each turn accurately in the first person.",
            "Managing turn-taking and preserving formal register keep the encounter both clear and compliant. The interpreter's neutral presence lets the individual engage with the institution on equal footing linguistically, which is the entire purpose of public-sector language access.",
          ],
          terminology: [
            { term: "Turn management", definition: "Controlling the order and length of speaking turns to keep an encounter accurate and clear." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Preserving formal register in official notices matters because it:",
              options: [
                "Makes the interpreter sound expert",
                "Keeps the notice's precision and legal weight intact",
                "Shortens the encounter",
                "Simplifies the message",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("gov"),
  finalAssessment: {
    title: "Government & Public Sector Assessment",
    category: "Government",
    durationMinutes: 25,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "Public-sector language access exists to:",
        options: [
          "Reduce agency workload",
          "Give limited-English speakers meaningful access to services",
          "Replace interpreters with technology",
          "Limit services",
        ],
        answer: 1,
      },
      {
        id: "q2",
        question: "Given a power imbalance between agency and individual, the interpreter must:",
        options: ["Support the individual", "Remain scrupulously neutral", "Support the agency", "Stay silent"],
        answer: 1,
      },
      {
        id: "q3",
        question: "Confusing bureaucratic language should be:",
        options: ["Simplified by the interpreter", "Rendered faithfully", "Skipped", "Explained by the interpreter"],
        answer: 1,
      },
      {
        id: "q4",
        question: "In sensitive public-service encounters, confidentiality is:",
        options: ["Optional", "Critical", "Only for medical cases", "The agency's job alone"],
        answer: 1,
      },
      {
        id: "q5",
        question: "Preserving formal register in official notices keeps their:",
        options: ["Length short", "Precision and legal weight", "Tone casual", "Meaning hidden"],
        answer: 1,
      },
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// 10. Legal Interpretation Fundamentals
// ───────────────────────────────────────────────────────────────────────────
const legal: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "The Courtroom & Legal Settings",
      lessons: [
        {
          id: "l1",
          title: "Legal settings and the interpreter's duty",
          duration: "16:00",
          type: "video",
          completed: false,
          videoUrl: V.d,
          objectives: [
            "Identify legal interpreting settings",
            "Explain the duty of complete, verbatim rendering",
          ],
          content: [
            "Legal interpreting occurs in courtrooms, depositions, attorney-client meetings, law-enforcement interviews, and administrative hearings. The defining requirement is completeness: in a legal setting you interpret everything that is said, verbatim and in the same register, preserving hesitations, slang, profanity, and even grammatical errors, because the exact words can carry legal significance.",
            "This is stricter than in many other settings. You do not clean up, summarize, or explain — a 'cleaned-up' rendering can alter the record and prejudice a party. The interpreter's duty runs to accuracy and the court, and that duty is enforced by the oath interpreters take to interpret faithfully.",
          ],
          terminology: [
            { term: "Verbatim", definition: "Word-for-word rendering that preserves exactly what was said." },
            { term: "Deposition", definition: "Sworn out-of-court testimony recorded for later use in a case." },
            { term: "Interpreter's oath", definition: "A sworn promise to interpret faithfully and completely." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In a courtroom, the interpreter must interpret:",
              options: [
                "Only what is relevant",
                "Everything said, verbatim and in the same register",
                "A cleaned-up version",
                "Only the attorney's statements",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Modes of legal interpreting and the record (lecture)",
          duration: "19:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply simultaneous, consecutive, and sight translation in legal settings",
            "Protect the accuracy of the record",
          ],
          content: [
            "Legal interpreting uses all three primary modes. Simultaneous interpreting (often whispered or via equipment) is used to keep a defendant informed of proceedings in real time. Consecutive interpreting is standard for witness testimony, where precision on the record is paramount. Sight translation is used when a written document must be read aloud in the other language.",
            "Protecting the record is the interpreter's constant concern. Interpret in the first person, request repetitions when needed, and correct any error on the record immediately and openly. Do not engage in unrecorded side conversations with a party, and address the court — not the witness — when you need to raise an interpreting issue.",
          ],
          terminology: [
            { term: "Simultaneous interpreting", definition: "Interpreting in real time while the speaker continues, often whispered in court." },
            { term: "The record", definition: "The official transcript of a legal proceeding, whose accuracy the interpreter must protect." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "For witness testimony, the standard mode is usually:",
              options: ["Simultaneous", "Consecutive", "Summary", "Sight translation"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Terminology, Ethics & Neutrality",
      lessons: [
        {
          id: "l3",
          title: "Legal terminology and sight translation",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: [
            "Handle legal terminology accurately",
            "Perform sight translation of legal documents",
          ],
          content: [
            "Legal language is precise and often has no everyday equivalent: terms like arraignment, plea, subpoena, custody, and liability carry specific meanings that must be rendered exactly, not approximated. Build and maintain a legal glossary in your working languages, and when a term has no direct equivalent, use the recognized rendering and, if necessary, transparently flag the difficulty for the court.",
            "Sight translation of legal documents — waivers, advisements, plea forms — must be complete and faithful, delivered at a measured pace. Never paraphrase a legal document; the wording is what the party is agreeing to or being informed of, so every clause matters.",
          ],
          terminology: [
            { term: "Arraignment", definition: "A court proceeding where a defendant is formally charged and enters a plea." },
            { term: "Subpoena", definition: "A legal order requiring a person to testify or produce evidence." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Sight translation of a plea form must be:",
              options: ["Paraphrased simply", "Complete and faithful to the wording", "Summarized", "Skipped if long"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Impartiality and courtroom positioning illustrated",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Maintain impartiality and correct positioning in the courtroom"],
          content: [
            "The interpreter's relationship to every party must remain impartial and neutral — never friendly to the defense, sympathetic to a witness, or aligned with the prosecution. Positioning supports this: interpret from a place where you can hear clearly and be heard, address issues to the court, and avoid any conduct that could suggest bias.",
            "If an error is made on the record, correct it at once. If you cannot continue impartially or competently, disclose it to the court. Visible, consistent neutrality is what allows a court to rely on your rendering as an accurate substitute for the witness's own words.",
          ],
          terminology: [
            { term: "Impartiality", definition: "Complete neutrality toward every party in the proceeding." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If an interpreter makes an error on the record, they should:",
              options: [
                "Ignore it to avoid disruption",
                "Correct it immediately on the record",
                "Fix it privately after",
                "Ask the attorney to fix it",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("leg"),
  finalAssessment: {
    title: "Legal Interpretation Assessment",
    category: "Legal",
    durationMinutes: 60,
    passingScore: 80,
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
      {
        id: "q5",
        question: "The standard mode for interpreting witness testimony is:",
        options: ["Simultaneous", "Consecutive", "Summary", "Sight translation only"],
        answer: 1,
      },
    ],
  },
}

// ───────────────────────────────────────────────────────────────────────────
// 11. 40-Hour Medical Interpreter Training (capstone)
// ────────────────��──────────────────────────────────────────────────────────
const medical: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "Unit 1 · Role & Ethics of the Medical Interpreter",
      lessons: [
        {
          id: "l1",
          title: "The interpreter's role in healthcare",
          duration: "16:20",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Define the medical interpreter's role and scope",
            "Distinguish interpreting from advocacy and cultural brokering",
          ],
          content: [
            "The medical interpreter's core role is to enable accurate, complete communication between a patient and their healthcare team across a language barrier. You interpret everything faithfully in the first person, preserve register and tone, and protect confidentiality under HIPAA. You are a conduit for communication first and foremost — the provider remains responsible for clinical decisions and the patient for their choices.",
            "Recognized standards describe additional roles the interpreter may step into transparently and sparingly: clarifier (when a term or concept does not translate directly), cultural broker (when a cultural difference threatens understanding), and, rarely and only when patient safety is at risk, advocate. Each step beyond straight interpreting must be transparent, announced to both parties, and immediately returned from. The default is always the conduit role.",
          ],
          terminology: [
            { term: "Conduit", definition: "The interpreter's default role: faithfully transmitting messages without alteration." },
            { term: "Cultural broker", definition: "A transparent role in which the interpreter surfaces a cultural difference that threatens understanding." },
            { term: "Advocate", definition: "A rare role, used only for patient safety, where the interpreter takes action beyond interpreting." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The primary role of a medical interpreter during a patient encounter is to:",
              options: [
                "Advocate for the patient's treatment plan",
                "Convey messages accurately and impartially between parties",
                "Summarize the conversation for efficiency",
                "Offer medical advice when the provider is unavailable",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Code of ethics & standards (lecture)",
          duration: "22:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply the medical interpreting code of ethics",
            "Handle confidentiality and cultural brokering correctly",
          ],
          content: [
            "The national codes of ethics for medical interpreters (such as those from IMIA and NCIHC) center on confidentiality, accuracy, impartiality, respect, cultural awareness, professionalism, and advocacy limited to patient welfare. Confidentiality is reinforced by HIPAA: everything you learn is protected health information and must never be shared or retained.",
            "Cultural brokering is permitted only transparently and only when a cultural difference would otherwise cause a misunderstanding. You surface the issue to both parties ('The interpreter would like to note a possible cultural point') and let the provider decide how to proceed. You never substitute your own cultural explanation for the provider's questions, and you never make clinical or personal decisions for the patient.",
          ],
          terminology: [
            { term: "IMIA / NCIHC", definition: "Professional bodies that publish medical interpreting standards and ethics." },
            { term: "Patient welfare", definition: "The patient's health and safety, the only basis for interpreter advocacy." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Cultural brokering by an interpreter should be done:",
              options: [
                "Freely whenever the interpreter feels it helps",
                "Only transparently and when it prevents a misunderstanding",
                "Never under any circumstances",
                "By replacing the provider's questions",
              ],
              answer: 1,
            },
            {
              id: "k2",
              question: "Which practice best protects patient confidentiality?",
              options: [
                "Discussing cases with colleagues for feedback",
                "Keeping session notes on a personal phone",
                "Following HIPAA guidelines and destroying notes after the session",
                "Sharing details with family members present",
              ],
              answer: 2,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Unit 2 · Clinical Terminology & Body Systems",
      lessons: [
        {
          id: "l3",
          title: "Medical terminology foundations",
          duration: "28:45",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Decode medical terms using roots, prefixes, and suffixes",
            "Interpret common clinical terminology accurately",
          ],
          content: [
            "Medical terminology is largely built from Greek and Latin roots, prefixes, and suffixes. Learning these building blocks lets you decode unfamiliar terms: 'cardio-' (heart) + '-megaly' (enlargement) = cardiomegaly, an enlarged heart. 'Hyper-' (excess) and 'hypo-' (deficient), '-itis' (inflammation), and '-ectomy' (surgical removal) recur constantly across specialties.",
            "Accurate interpreting requires knowing both the technical term and its lay equivalent, and choosing the register the situation calls for. A physician may say 'myocardial infarction' while the patient needs 'heart attack.' You render the provider's meaning at a register the patient can understand — without simplifying away clinical precision — and you ask for clarification whenever a term is genuinely unfamiliar rather than guessing.",
          ],
          terminology: [
            { term: "Prefix / root / suffix", definition: "The components that combine to form most medical terms (e.g., hyper- / cardi / -itis)." },
            { term: "Myocardial infarction", definition: "The clinical term for a heart attack." },
            { term: "-ectomy", definition: "A suffix meaning surgical removal (e.g., appendectomy)." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When an interpreter does not understand a medical term, they should:",
              options: ["Guess based on context", "Skip the term", "Ask for clarification before interpreting", "Substitute a similar-sounding word"],
              answer: 2,
            },
          ],
        },
        {
          id: "l4",
          title: "Body systems illustrated",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Identify major body systems and associated terminology"],
          content: [
            "A working medical interpreter needs a map of the major body systems — cardiovascular, respiratory, nervous, digestive, musculoskeletal, endocrine, renal, and reproductive — and the common conditions, procedures, and vocabulary tied to each. Understanding the system a term belongs to helps you disambiguate and choose the correct rendering under time pressure.",
            "Study anatomy alongside terminology so that when a provider references an organ, a procedure, or a symptom, you can place it accurately. This structural knowledge is what separates a fluent bilingual speaker from a competent medical interpreter.",
          ],
          terminology: [
            { term: "Cardiovascular system", definition: "The heart and blood vessels." },
            { term: "Renal system", definition: "The kidneys and urinary tract." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Knowing which body system a term belongs to primarily helps the interpreter:",
              options: [
                "Impress the provider",
                "Disambiguate and choose the correct rendering quickly",
                "Skip clarification",
                "Give medical advice",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m3",
      title: "Unit 3 · Modes of Interpreting & Encounter Management",
      lessons: [
        {
          id: "l5",
          title: "Consecutive, simultaneous & sight translation",
          duration: "31:00",
          type: "video",
          completed: false,
          videoUrl: V.c,
          objectives: [
            "Apply the three interpreting modes in clinical settings",
            "Choose the right mode for each part of an encounter",
          ],
          content: [
            "Consecutive interpreting — rendering after the speaker pauses — is the workhorse of the clinical encounter, used for history-taking, questions, and discharge instructions where precision matters most. Simultaneous interpreting is used selectively, for example during a lengthy explanation or a mental-status exam. Sight translation applies when a written item — a consent form, instructions, a medication label — must be read aloud in the patient's language.",
            "Managing the encounter means controlling flow so accuracy holds: position yourself to support direct provider-patient communication, manage turn-taking, ask for pauses when segments are too long, and use the first person. Discharge instructions in particular are usually interpreted consecutively so each step is confirmed and nothing is lost.",
          ],
          terminology: [
            { term: "History-taking", definition: "The provider's structured questioning about a patient's symptoms and background." },
            { term: "Discharge instructions", definition: "Directions given to a patient at the end of care, requiring precise interpretation." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The correct interpreting mode for a physician giving discharge instructions is usually:",
              options: ["Simultaneous", "Consecutive", "Summary", "Sight translation only"],
              answer: 1,
            },
          ],
        },
        {
          id: "l6",
          title: "Managing the triadic clinical encounter (lecture)",
          duration: "24:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Manage the provider-patient-interpreter triad",
            "Handle interruptions, pre-sessions, and turn-taking",
          ],
          content: [
            "The clinical encounter is a triad: provider, patient, and interpreter. A brief pre-session — introducing your role, confidentiality, and the ground rules (speak directly to each other, pause for interpreting) — sets the encounter up for success. During the visit you keep the two parties talking to each other, not to you.",
            "You manage the flow discreetly: signal for a pause when a segment is too long, request a repetition when needed, and interject transparently only to clarify or to note a communication problem. Everything is interpreted; nothing is left out or added. Skilled encounter management keeps a high-stakes, emotionally charged interaction accurate and humane.",
          ],
          terminology: [
            { term: "Triadic encounter", definition: "A three-party interaction among provider, patient, and interpreter." },
            { term: "Pre-session", definition: "A brief introduction of the interpreter's role and ground rules before the encounter." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A pre-session before a clinical encounter is used to:",
              options: [
                "Give the interpreter's opinion on the case",
                "Introduce the interpreter's role and ground rules",
                "Diagnose the patient",
                "Skip the provider's questions",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m4",
      title: "Unit 4 · Specialized Settings & Final Practicum",
      lessons: [
        {
          id: "l7",
          title: "Mental health, oncology & emergency settings",
          duration: "26:15",
          type: "video",
          completed: false,
          videoUrl: V.d,
          objectives: [
            "Adapt to specialized and high-acuity settings",
            "Maintain accuracy and composure under pressure",
          ],
          content: [
            "Specialized settings raise the stakes. In mental health, exact wording and affect carry clinical meaning, so you preserve them precisely and avoid paraphrase. In oncology and palliative care, you interpret difficult news faithfully and steadily, without softening prognoses or absorbing the emotion. In emergency and trauma settings, you interpret rapidly and accurately while staying composed amid urgency.",
            "Across all of these, self-awareness matters: distressing content can affect the interpreter too. Maintaining professional composure, using clarification when needed, and applying strict confidentiality afterward allow you to serve patients well in the hardest moments without stepping outside your role.",
          ],
          terminology: [
            { term: "Palliative care", definition: "Care focused on relief of symptoms and quality of life in serious illness." },
            { term: "High-acuity", definition: "Settings involving urgent, severe, or life-threatening conditions." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In a mental-health encounter, the interpreter should:",
              options: [
                "Paraphrase to make the patient sound clearer",
                "Preserve exact wording and affect",
                "Summarize the session",
                "Offer reassurance of their own",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l8",
          title: "Cultural mediation case studies",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: ["Apply transparent cultural mediation to realistic cases"],
          content: [
            "Consider cases where culture affects care: a patient's explanatory model of illness differs from the biomedical one; a family expects to receive news on the patient's behalf; a patient nods politely without understanding. In each, the interpreter's transparent cultural mediation — surfacing the issue neutrally to both parties — prevents a breakdown without the interpreter taking over.",
            "The discipline is always the same: interpret faithfully by default, flag a cultural or comprehension issue transparently when it threatens understanding, and return immediately to the conduit role. You illuminate the difference; the provider and patient decide what to do about it.",
          ],
          terminology: [
            { term: "Explanatory model", definition: "A patient's own understanding of the cause and meaning of their illness." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a cultural difference threatens understanding, the interpreter should:",
              options: [
                "Resolve it privately with the patient",
                "Surface it transparently to both parties and return to interpreting",
                "Ignore it",
                "Decide for the patient",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l9",
          title: "Final practicum walkthrough",
          duration: "33:40",
          type: "video",
          completed: false,
          videoUrl: V.e,
          objectives: [
            "Integrate role, terminology, modes, and ethics in a full encounter",
            "Prepare for the final assessment",
          ],
          content: [
            "The final practicum brings the whole program together in a simulated end-to-end encounter: a pre-session, history-taking in consecutive mode, sight translation of a consent form, difficult news handled with composure, transparent cultural mediation, precise discharge instructions, and strict confidentiality throughout. Watch how each skill you have studied appears in sequence.",
            "As you prepare for the final assessment, review the role and its limits, the ethics and HIPAA obligations, the terminology-decoding method, the three interpreting modes, and encounter management. The Medical Interpreter Certificate is the program's single credential — it does not expire, is protected, and is released by an administrator only after the required waiting period, reflecting the weight this qualification carries.",
          ],
          terminology: [
            { term: "Practicum", definition: "A supervised, applied exercise integrating all learned skills." },
            { term: "Credential", definition: "A formal qualification certifying competence, here the protected Medical Interpreter Certificate." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The Medical Interpreter Certificate for this program is:",
              options: [
                "Issued instantly and expires yearly",
                "A single protected credential released by an admin after a waiting period",
                "Downloadable by the learner immediately",
                "Issued for each unit separately",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("med"),
  finalAssessment: {
    title: "40-Hour Medical Interpreter — Final Assessment",
    category: "Medical",
    durationMinutes: 45,
    passingScore: 80,
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
        options: ["Guess based on context", "Skip the term", "Ask for clarification before interpreting", "Substitute a similar sounding word"],
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
}

// ───────────────────────────────────────────────────────────────────────────
// 12. US Healthcare Interpreting: A Refresher Course for Remote Interpreters
// ───────���───────────────────────────────────────────────────────────────────
const usHealthcareRefresher: CourseContent = {
  modules: [
    {
      id: "m1",
      title: "Refresher: Core Practice",
      lessons: [
        {
          id: "l1",
          title: "Refreshing the remote medical interpreter's role",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.f,
          objectives: [
            "Refresh the core role and ethics for remote healthcare interpreting",
            "Re-anchor HIPAA obligations in a remote context",
          ],
          content: [
            "This refresher is designed for experienced interpreters returning to or continuing remote US healthcare work. The fundamentals are unchanged: interpret faithfully in the first person, stay impartial, protect confidentiality under HIPAA, and use transparent clarification and cultural mediation only when needed. What the refresher sharpens is applying these fundamentals well over phone and video, where the channel adds friction.",
            "Remotely, HIPAA discipline requires extra attention: a private workspace where no one can overhear, secure handling of any notes, and awareness that you may be interpreting sensitive PHI without the situational cues of an in-person room. Re-commit to the minimum-necessary principle and to keeping every encounter private and un-retained.",
          ],
          terminology: [
            { term: "Refresher", definition: "Focused review that reinforces existing skills rather than teaching them for the first time." },
            { term: "Remote workspace", definition: "A private, secure environment required for confidential remote interpreting." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Working remotely, HIPAA discipline especially requires:",
              options: [
                "A public, convenient location",
                "A private workspace and secure handling of PHI",
                "Sharing notes with colleagues",
                "Recording the session for reference",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Terminology refresh and register (lecture)",
          duration: "15:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Refresh high-frequency clinical terminology",
            "Match register to the patient without losing precision",
          ],
          content: [
            "Reactivate your high-frequency clinical vocabulary: common conditions, medications, procedures, and the paired technical/lay terms you must switch between (hypertension / high blood pressure, biopsy, MRI, prescription refills, side effects). Fluency here reduces hesitation on calls where pace is tight.",
            "Register matching remains a judgment call: render the provider's meaning at a level the patient can act on, without stripping out clinical precision, and clarify transparently whenever a term is ambiguous. On audio-only calls especially, confirm numbers — dosages, dates, quantities — since there is no shared screen to verify against.",
          ],
          terminology: [
            { term: "Hypertension", definition: "The clinical term for high blood pressure." },
            { term: "Register matching", definition: "Choosing a level of language the listener understands while preserving meaning." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "On an audio-only healthcare call, the interpreter should be especially careful to:",
              options: ["Speak as fast as possible", "Confirm numbers such as dosages and dates", "Skip lay explanations", "Avoid clarifying terms"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Remote Encounter Best Practices",
      lessons: [
        {
          id: "l3",
          title: "OPI and VRI best practices for healthcare",
          duration: "Reading",
          type: "reading",
          completed: false,
          objectives: [
            "Apply OPI and VRI best practices to clinical calls",
            "Manage call flow, introductions, and clarifications remotely",
          ],
          content: [
            "For healthcare OPI, give a crisp introduction (ID, role, confidentiality), use consecutive mode, take notes for numbers and instructions, and manage turn-taking so segments stay renderable. For healthcare VRI, set up a professional frame and lighting, use the visual channel to read affect and support signed-language or show-me moments, and keep a phone fallback ready for technical failure.",
            "In both modes, transparent clarification is your safety valve: when audio is poor, a term is unclear, or a segment is too long, say so as the interpreter and confirm before rendering. Remote channels make small ambiguities easy to miss, so disciplined clarification is what keeps a remote clinical encounter as safe as an in-person one.",
          ],
          terminology: [
            { term: "Consecutive mode", definition: "Interpreting after each speaker segment, the default for clinical accuracy." },
            { term: "Phone fallback", definition: "Switching a failed video call to audio so the encounter can continue." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If audio is poor during a healthcare OPI call, the interpreter should:",
              options: [
                "Guess to keep the call moving",
                "Transparently ask for a repeat before rendering",
                "Summarize what they think was said",
                "End the call",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Remote healthcare scenarios illustrated",
          duration: "Image",
          type: "image",
          completed: false,
          objectives: ["Apply refreshed skills to realistic remote healthcare scenarios"],
          content: [
            "Picture common remote scenarios: a triage nurse taking symptoms by phone, a tele-behavioral-health session on video, a pharmacy confirming a prescription, a discharge call reviewing instructions. In each, apply the refreshed fundamentals — faithful rendering, confirmed numbers, transparent clarification, HIPAA-safe conduct, and appropriate mode.",
            "The refresher's goal is confidence and consistency: not new theory, but sharp, reliable execution of everything you already know, adapted to the realities of the phone and the camera in US healthcare.",
          ],
          terminology: [
            { term: "Tele-behavioral health", definition: "Mental-health care delivered remotely by phone or video." },
            { term: "Triage", definition: "Initial assessment that prioritizes patients by urgency." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The main goal of this refresher is:",
              options: [
                "Teaching interpreting from scratch",
                "Sharp, reliable execution of existing skills in remote healthcare",
                "Replacing HIPAA rules",
                "Eliminating clarification",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  resources: standardResources("ushc"),
  finalAssessment: {
    title: "US Healthcare Interpreting Refresher — Final Quiz",
    category: "Medical",
    durationMinutes: 20,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "Working remotely, HIPAA discipline especially requires:",
        options: [
          "A convenient public location",
          "A private workspace and secure handling of PHI",
          "Recording every session",
          "Sharing notes with colleagues",
        ],
        answer: 1,
      },
      {
        id: "q2",
        question: "On audio-only healthcare calls, the interpreter should be careful to:",
        options: ["Speak as fast as possible", "Confirm numbers like dosages and dates", "Skip lay explanations", "Avoid clarifying"],
        answer: 1,
      },
      {
        id: "q3",
        question: "The default interpreting mode for clinical accuracy is:",
        options: ["Simultaneous", "Consecutive", "Summary", "Sight translation only"],
        answer: 1,
      },
      {
        id: "q4",
        question: "When VRI video fails, the interpreter should:",
        options: ["End the encounter", "Switch to a phone fallback", "Keep interpreting the frozen frame", "Wait silently"],
        answer: 1,
      },
      {
        id: "q5",
        question: "The purpose of this refresher is to:",
        options: [
          "Teach interpreting from scratch",
          "Sharpen reliable execution of existing skills in remote healthcare",
          "Replace the code of ethics",
          "Remove the need for clarification",
        ],
        answer: 1,
      },
    ],
  },
}

/** Master content map keyed by course slug. */
export const courseContent: Record<string, CourseContent> = {
  "code-of-conduct": codeOfConduct,
  "hipaa-fraud-awareness": hipaa,
  "compliance-training": compliance,
  "ethics-and-standards": ethics,
  "customer-service-interpretation": customerService,
  "opi-training": opi,
  "vri-training": vri,
  "immigration-interpretation": immigration,
  "government-interpretation": government,
  "legal-interpretation": legal,
  "medical-interpreter-training-40h": medical,
  "us-healthcare-interpreting-refresher": usHealthcareRefresher,
  // CCHI-aligned Healthcare Interpreter Training Program
  ...cchiContent,
}

/** Total lesson count for a course slug (used to keep metadata in sync). */
export function contentLessonCount(slug: string): number {
  const c = courseContent[slug]
  if (!c) return 0
  return c.modules.reduce((n, m) => n + m.lessons.length, 0)
}
