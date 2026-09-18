import type { Resource } from "@/lib/data"
import type { CourseContent } from "@/lib/course-content"

/**
 * CCHI-aligned Healthcare Interpreter Training Program.
 *
 * Full, professionally authored training content for the eleven courses that
 * make up Creovixa's healthcare interpreter track. Each lesson carries real
 * educational prose, a learning summary, key terminology, worked healthcare
 * interpreting examples, a practice scenario, and a knowledge check. Course
 * metadata (title, hours, sequence, certificate rule) lives in lib/data.ts and
 * pulls its modules, resources, and final assessment from here by slug.
 */

/** Openly-hosted sample streams used to demonstrate the in-lesson player. */
const V = {
  a: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  b: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  c: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  d: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  e: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  f: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
}

function res(prefix: string): Resource[] {
  return [
    { id: `${prefix}-sg`, name: "Study Guide.pdf", size: "PDF", type: "pdf", kind: "study_guide" },
    { id: `${prefix}-vocab`, name: "Vocabulary List.pdf", size: "PDF", type: "pdf", kind: "vocabulary" },
    { id: `${prefix}-manual`, name: "Course Manual.pdf", size: "PDF", type: "pdf", kind: "manual" },
  ]
}

export const cchiContent: Record<string, CourseContent> = {}

// ─────────────────────────────────────────────────────────────────────────
// 11. CCHI Exam Preparation
// ─────────────────────────────────────────────────────────────────────────
cchiContent["cchi-exam-preparation"] = {
  resources: res("CEP"),
  modules: [
    {
      id: "m1",
      title: "CCHI Certification Readiness",
      lessons: [
        {
          id: "l1",
          title: "Ethics Review",
          duration: "15:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Recall the core ethical tenets tested on the CCHI exam",
            "Apply ethics to scenario-based questions",
            "Identify the least intrusive professional response",
          ],
          content: [
            "The CCHI examinations — the CoreCHI and the specialty CHI — test ethical reasoning heavily, usually through scenarios rather than definitions. Review the core tenets: confidentiality, accuracy, impartiality, respect for cultural context, professional boundaries, limited advocacy, and transparency. For each, be ready to recognize a situation that tests it and to choose the response that keeps the interpreter faithful, neutral, and transparent.",
            "A reliable exam strategy for ethics items is to choose the least intrusive, most transparent action that preserves accuracy and the patient's autonomy. Answers that have the interpreter giving advice, taking sides, acting covertly, or overstepping the role are almost always wrong. Answers that keep the interpreter in a faithful, transparent, bounded role are almost always right. Practice reading each scenario for which tenet is being tested.",
          ],
          terminology: [
            { term: "CoreCHI", definition: "CCHI's core certification exam covering ethics, standards, and general skills." },
            { term: "CHI", definition: "Certified Healthcare Interpreter — CCHI's language-specific performance certification." },
            { term: "Least intrusive response", definition: "The smallest transparent action that resolves an issue while preserving the role." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "On CCHI ethics scenarios, the best answer usually:",
              options: ["Has the interpreter give advice", "Keeps the interpreter faithful, neutral, and transparent", "Has the interpreter act covertly", "Has the interpreter take sides"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Medical Terminology Review",
          duration: "14:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Consolidate high-frequency medical vocabulary",
            "Decode unfamiliar terms from word parts",
            "Prepare for terminology-based exam items",
          ],
          content: [
            "Terminology appears throughout the CCHI exams, often embedded in clinical scenarios. Review the systems covered in Medical Terminology I — cardiovascular, respiratory, digestive, musculoskeletal, neurological, reproductive — and the abbreviation set. The most efficient preparation is mastering word parts (roots, prefixes, suffixes) so you can decode terms you have not memorized: '-ectomy' (removal), '-itis' (inflammation), 'hyper-/hypo-' (high/low).",
            "Build and drill a two-language glossary of high-frequency terms, focusing on ones where a small error changes meaning (hypertension vs. hypotension, hyper- vs. hypoglycemia). Terminology items reward both memorization and decoding skill, so practice both. Reciting terms aloud in both languages also strengthens the retrieval speed you need in a timed exam and in real assignments.",
          ],
          terminology: [
            { term: "-ectomy", definition: "Surgical removal of a structure (e.g., appendectomy)." },
            { term: "-ostomy", definition: "Creation of an opening (e.g., colostomy)." },
            { term: "hyper- / hypo-", definition: "Excessive/high versus deficient/low." },
            { term: "-emia", definition: "A condition of the blood (e.g., anemia, hypoglycemia)." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The suffix '-ectomy' means:",
              options: ["Inflammation", "Surgical removal", "Study of", "Opening"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Anatomy Review",
          duration: "14:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Consolidate body-system structure and function",
            "Connect anatomy to clinical scenarios",
            "Prepare for anatomy-based exam items",
          ],
          content: [
            "Anatomy questions on the CCHI exams are practical: they test whether you understand enough about body systems to interpret clinical explanations accurately. Review each system's core structures and functions — the heart's chambers and circulation, the path of air to the alveoli, the digestive tract, the central vs. peripheral nervous system, and the major endocrine glands — as covered in Anatomy & Physiology for Interpreters.",
            "Rather than memorizing isolated facts, connect anatomy to the kinds of explanations providers give: why a blocked coronary artery causes chest pain, why a stroke on one side of the brain affects the opposite side of the body, why insulin matters in diabetes. This functional understanding is what lets you interpret provider explanations smoothly, and it is exactly what the exam is designed to check.",
          ],
          terminology: [
            { term: "Systemic circulation", definition: "Blood flow between the heart and the rest of the body." },
            { term: "Contralateral control", definition: "Each side of the brain controlling the opposite side of the body." },
            { term: "Functional anatomy", definition: "Understanding structures in terms of what they do." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A stroke in the brain's left hemisphere typically affects the body's:",
              options: ["Left side", "Right side", "Both sides equally", "Neither side"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Practice Questions",
          duration: "16:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply exam strategies to mixed practice items",
            "Analyze answer choices systematically",
            "Identify and correct common mistakes",
          ],
          content: [
            "Effective practice is not just answering questions but analyzing why each choice is right or wrong. For every item, identify what is being tested (ethics, standards, terminology, anatomy, or role), eliminate choices that violate the interpreter role, and select the faithful, transparent, accurate option. Review your errors to find patterns — for example, a tendency to over-advocate or to summarize.",
            "Consider a sample item: 'A provider is speaking too quickly and the interpreter is losing content. The best action is to (a) summarize the key points, (b) transparently ask the provider to pause, (c) interpret only what was caught, (d) stop interpreting.' The answer is (b): a transparent flow-management intervention that preserves accuracy. Working many items this way builds both speed and reliable judgment.",
          ],
          terminology: [
            { term: "Distractor", definition: "An incorrect answer choice designed to look plausible." },
            { term: "Elimination strategy", definition: "Ruling out choices that violate the role or accuracy." },
            { term: "Error analysis", definition: "Reviewing missed items to identify and fix patterns." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a provider speaks too fast and content is lost, the best answer is to:",
              options: ["Summarize the key points", "Transparently ask the provider to pause", "Interpret only what was caught", "Stop interpreting"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Mock Exams",
          duration: "18:00",
          type: "reading",
          completed: false,
          objectives: [
            "Simulate exam conditions and timing",
            "Build stamina and pacing",
            "Interpret score results to target weak areas",
          ],
          content: [
            "Mock exams under realistic conditions are the single best predictor of readiness. Take a full-length, timed practice set without interruptions, in a quiet space, to build the stamina and pacing the real exam demands. Do not stop to look up answers mid-test; complete it as you would the real thing, then review thoroughly afterward.",
            "Use your mock-exam results diagnostically. Break your score down by domain — ethics, standards, terminology, anatomy, role management — and direct your remaining study to the weakest areas rather than reviewing everything equally. Repeat mock exams periodically to confirm that your weak areas are improving. Consistent scores comfortably above the passing threshold across several mocks are the signal that you are ready.",
          ],
          terminology: [
            { term: "Mock exam", definition: "A full-length, timed practice test simulating real conditions." },
            { term: "Domain analysis", definition: "Breaking a score into topic areas to target study." },
            { term: "Test stamina", definition: "The sustained focus needed to perform across a full exam." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The most useful way to use mock-exam results is to:",
              options: ["Review every topic equally", "Target study toward the weakest domains", "Ignore the breakdown", "Only celebrate the score"],
              answer: 1,
            },
          ],
        },
        {
          id: "l6",
          title: "Final Readiness Assessment",
          duration: "12:30",
          type: "reading",
          completed: false,
          objectives: [
            "Confirm readiness across all exam domains",
            "Finalize a study and test-day plan",
            "Approach the exam with calm, prepared confidence",
          ],
          content: [
            "This final review confirms readiness. Self-assess across every domain: Can you reason through ethics scenarios to the least intrusive transparent answer? Can you decode and produce high-frequency terminology in both languages? Do you understand functional anatomy well enough to interpret clinical explanations? Can you manage flow, clarify transparently, and hold boundaries? If all domains are solid and your mock scores are consistently strong, you are prepared.",
            "Finalize a plan: schedule the exam, prepare logistics and required identification, rest before test day, and plan your pacing so you do not rush. Confidence on exam day comes from preparation, not from cramming. Completing this course and its final assessment marks the culmination of the CCHI-aligned program — you have built the ethics, knowledge, and skills the certification is designed to verify.",
          ],
          terminology: [
            { term: "Readiness self-assessment", definition: "A structured check of competence across all exam domains." },
            { term: "Test-day plan", definition: "Logistics, rest, and pacing prepared in advance of the exam." },
            { term: "Certification", definition: "Formal verification of an interpreter's competence and ethics." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Confidence on exam day is best built through:",
              options: ["Last-minute cramming", "Consistent preparation across all domains", "Skipping mock exams", "Memorizing one topic"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "CCHI Exam Preparation — Final Readiness Assessment",
    category: "Medical",
    durationMinutes: 40,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "On an ethics scenario, the best answer generally keeps the interpreter:",
        options: ["Advising the patient", "Faithful, neutral, and transparent", "Acting covertly", "Taking a side"],
        answer: 1,
      },
      {
        id: "q2",
        question: "The suffix '-ectomy' means:",
        options: ["Inflammation", "Surgical removal", "Blood condition", "Opening"],
        answer: 1,
      },
      {
        id: "q3",
        question: "A left-hemisphere stroke typically affects the body's:",
        options: ["Left side", "Right side", "Both sides", "Neither side"],
        answer: 1,
      },
      {
        id: "q4",
        question: "When a provider speaks too fast and content is lost, the interpreter should:",
        options: ["Summarize", "Transparently ask for a pause", "Interpret only fragments", "Stop"],
        answer: 1,
      },
      {
        id: "q5",
        question: "Mock-exam results are most useful for:",
        options: ["Targeting the weakest domains", "Reviewing everything equally", "Ignoring weak areas", "Only tracking the score"],
        answer: 0,
      },
      {
        id: "q6",
        question: "'CoreCHI' primarily tests:",
        options: ["Ethics, standards, and general interpreting skills", "Only medical terminology", "Only anatomy", "Only language fluency"],
        answer: 0,
      },
      {
        id: "q7",
        question: "The minimum-necessary principle requires interpreters to:",
        options: ["Access only PHI needed to interpret", "Read the whole chart", "Share with family", "Keep notes forever"],
        answer: 0,
      },
      {
        id: "q8",
        question: "Interpreting a medication dosage requires:",
        options: ["Exact rendering, with read-back if needed", "Rounding", "Summarizing", "Omitting when unsure"],
        answer: 0,
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 10. Sight Translation Skills
// ─────────────────────────────────────────────────────────────────────────
cchiContent["sight-translation-skills"] = {
  resources: res("STS"),
  modules: [
    {
      id: "m1",
      title: "Sight Translation in Health Care",
      lessons: [
        {
          id: "l1",
          title: "What Sight Translation Is (and Isn't)",
          duration: "12:30",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Define sight translation and its place in healthcare",
            "Distinguish it from written translation and interpreting",
            "Recognize appropriate and inappropriate uses",
          ],
          content: [
            "Sight translation is reading a document written in one language and delivering it aloud in another, in real time. In healthcare it is used for short, standardized documents — consent forms, discharge instructions, medication labels, and appointment notices. It is not the same as written translation, which is produced and reviewed on paper, and it is not the same as interpreting spoken dialogue, though it draws on both skills.",
            "Sight translation has limits. It is appropriate for brief, relatively simple documents; it is not appropriate for long, dense, or legally complex texts that require certified written translation. When a document exceeds what can be safely sight-translated, the professional response is to say so and recommend a written translation, rather than improvising through pages of complex material.",
          ],
          terminology: [
            { term: "Sight translation", definition: "Reading a written text aloud in the target language in real time." },
            { term: "Written translation", definition: "A reviewed, written rendering of a document — distinct from sight translation." },
            { term: "Standardized document", definition: "A short, common form (consent, discharge) suitable for sight translation." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Sight translation is best suited for:",
              options: ["Long legal contracts", "Short standardized documents like consent forms", "Spoken dialogue only", "Any document regardless of length"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Consent Forms and Discharge Instructions",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Sight-translate consent and discharge documents accurately",
            "Preserve legal and clinical meaning",
            "Support informed consent through faithful delivery",
          ],
          content: [
            "Consent forms and discharge instructions are the most common sight-translation tasks and among the highest-stakes. A consent form must be rendered completely and accurately, including risks, benefits, and alternatives, because it underpins the patient's legally and ethically informed agreement. Discharge instructions carry medication schedules, warning signs, and follow-up steps that directly affect recovery and safety.",
            "The interpreter reads the document faithfully and does not summarize, omit, or 'explain' clauses on their own — clarifying questions go to the provider. If the patient does not understand a section, the interpreter renders their question and the provider's answer. Faithful sight translation of these documents is a cornerstone of informed consent and safe discharge.",
          ],
          terminology: [
            { term: "Informed consent", definition: "A patient's agreement to care after understanding risks, benefits, and alternatives." },
            { term: "Discharge instructions", definition: "Written guidance for care after leaving a facility." },
            { term: "Completeness", definition: "Rendering the entire document without omission." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If a patient doesn't understand a consent clause, the interpreter should:",
              options: ["Explain the clause themselves", "Render the patient's question and the provider's answer", "Skip the clause", "Sign for the patient"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Techniques for Fluent Delivery",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Use previewing and chunking for smooth delivery",
            "Manage pace and avoid false starts",
            "Maintain accuracy while reading aloud",
          ],
          content: [
            "Fluent sight translation relies on a few techniques. Previewing — quickly scanning the document or a sentence ahead — lets you anticipate structure and avoid stumbling. Chunking means processing meaningful units rather than word by word, which produces natural target-language phrasing instead of stiff, literal output. A steady, unhurried pace reduces errors and false starts.",
            "Reading aloud in another language while comprehending the source is cognitively demanding, so control your speed and do not be afraid to pause. It is better to deliver a slightly slower, accurate rendering than a fast one full of corrections. Practicing with common form templates builds the automaticity that makes delivery both fluent and faithful.",
          ],
          terminology: [
            { term: "Previewing", definition: "Scanning ahead in the text to anticipate structure and meaning." },
            { term: "Chunking", definition: "Processing meaningful units of text rather than individual words." },
            { term: "Pacing", definition: "Controlling delivery speed to maintain accuracy." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Chunking' in sight translation means:",
              options: ["Translating word by word", "Processing meaningful units for natural phrasing", "Skipping sections", "Reading silently"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Handling Complex Documents",
          duration: "12:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Recognize documents beyond safe sight translation",
            "Handle tables, dense terminology, and legalese",
            "Know when to recommend written translation",
          ],
          content: [
            "Some documents are too complex for safe sight translation: multi-page legal notices, insurance appeals, dense research consent for trials, or forms with tables and fine print. Attempting to sight-translate these risks omission and error. The competent interpreter recognizes the limit, delivers what is appropriate, and transparently recommends a certified written translation for the rest.",
            "When complexity is moderate — a form with a table or a few technical terms — techniques help: reading table data row by row with clear labels, and clarifying an unfamiliar term with the provider rather than guessing. But judgment about when to stop is itself a professional skill. Recommending written translation for a genuinely complex document protects the patient and is never a failure.",
          ],
          terminology: [
            { term: "Complex document", definition: "A long, dense, or legally intricate text unsuitable for sight translation." },
            { term: "Certified translation", definition: "A reviewed written translation, appropriate for complex or legal documents." },
            { term: "Professional judgment", definition: "Deciding when a task exceeds safe sight-translation limits." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Faced with a dense multi-page legal document, the interpreter should:",
              options: ["Sight-translate all of it quickly", "Recommend a certified written translation", "Summarize the key points", "Skip it entirely without comment"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Boundaries and Referral",
          duration: "11:40",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Keep sight translation within professional scope",
            "Refuse tasks like filling forms or advising",
            "Refer appropriately and transparently",
          ],
          content: [
            "Sight-translation boundaries mirror the broader interpreter role. You read documents aloud faithfully; you do not fill out forms on the patient's behalf, offer opinions about what they should choose, witness signatures in a legal capacity, or advise on the document's implications. These tasks belong to the provider, the patient, or other professionals.",
            "When asked to step outside scope, the interpreter declines with empathy and refers appropriately: clinical questions to the provider, legal questions to the appropriate resource, and complex documents to written translation. Transparent referral keeps the interpreter neutral and the patient properly served, closing the course on the same principle that runs through the whole program — accuracy and integrity within a clearly bounded role.",
          ],
          terminology: [
            { term: "Scope boundary", definition: "The limit separating sight translation from advising, form-filling, or witnessing." },
            { term: "Referral", definition: "Directing an out-of-scope task to the appropriate party." },
            { term: "Empathetic decline", definition: "Refusing an out-of-scope request respectfully and clearly." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If asked to fill out a consent form for the patient, the interpreter should:",
              options: ["Do it to be helpful", "Decline and refer the task appropriately", "Fill part of it", "Sign it themselves"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "Sight Translation Skills — Final Assessment",
    category: "Medical",
    durationMinutes: 25,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "Sight translation means:",
        options: ["Reading a written document aloud in another language", "Written, reviewed translation", "Interpreting spoken dialogue", "Summarizing a document"],
        answer: 0,
      },
      {
        id: "q2",
        question: "For a consent clause the patient doesn't understand, the interpreter should:",
        options: ["Render the patient's question and the provider's answer", "Explain it themselves", "Skip it", "Sign for the patient"],
        answer: 0,
      },
      {
        id: "q3",
        question: "'Chunking' produces:",
        options: ["Natural phrasing from meaningful units", "Word-by-word literal output", "Faster skipping", "Silent reading"],
        answer: 0,
      },
      {
        id: "q4",
        question: "A dense multi-page legal document should be:",
        options: ["Referred for certified written translation", "Sight-translated quickly", "Summarized", "Ignored"],
        answer: 0,
      },
      {
        id: "q5",
        question: "Filling out a form for the patient is:",
        options: ["Outside the interpreter's scope", "A normal interpreter duty", "Required by ethics", "Encouraged"],
        answer: 0,
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 9. Cultural Competency in Healthcare
// ─────────────────────────────────────────────────────────────────────────
cchiContent["cultural-competency-healthcare"] = {
  resources: res("CCH"),
  modules: [
    {
      id: "m1",
      title: "Culture, Communication & Care",
      lessons: [
        {
          id: "l1",
          title: "Culture and Health Beliefs",
          duration: "13:40",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Explain how culture shapes health beliefs and behavior",
            "Recognize diverse explanatory models of illness",
            "Avoid stereotyping while staying culturally aware",
          ],
          content: [
            "Culture shapes how people understand illness, express pain, make decisions, and relate to authority. A patient's 'explanatory model' — their beliefs about what caused an illness and how it should be treated — may differ from the biomedical model providers use. These differences are not obstacles to dismiss; they are information that, when understood, leads to better communication and adherence.",
            "Cultural awareness must avoid its opposite error: stereotyping. Culture influences individuals but does not determine them. Two people from the same background may hold very different beliefs. The competent stance is curiosity about the individual in front of you, not assumptions based on nationality, religion, or language. For interpreters, this means surfacing cultural points only when a real gap appears, never presuming.",
          ],
          terminology: [
            { term: "Explanatory model", definition: "A person's beliefs about the cause, meaning, and treatment of their illness." },
            { term: "Biomedical model", definition: "The scientific framework of disease used in Western medicine." },
            { term: "Cultural humility", definition: "An ongoing, respectful stance of learning about each individual's perspective." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Cultural competence requires interpreters to:",
              options: ["Assume beliefs from a patient's background", "Stay curious about the individual and avoid stereotyping", "Ignore culture entirely", "Advise patients on beliefs"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "The LEARN and RESPECT Models",
          duration: "13:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Describe the LEARN and RESPECT cross-cultural frameworks",
            "See how interpreters support these provider approaches",
            "Apply the frameworks' principles to communication",
          ],
          content: [
            "Cross-cultural care frameworks give providers a structure for respectful communication. LEARN stands for Listen (to the patient's perspective), Explain (your own), Acknowledge (differences), Recommend, and Negotiate. RESPECT emphasizes Rapport, Empathy, Support, Partnership, Explanations, Cultural competence, and Trust. Interpreters do not run these frameworks, but their accurate, faithful rendering is what makes each step possible.",
            "For example, the 'Listen' and 'Acknowledge' steps depend entirely on the patient's perspective reaching the provider intact — which is the interpreter's contribution. When an interpreter conveys not just words but tone and cultural nuance (transparently, when needed), they enable the negotiation and partnership these models aim for. Understanding the frameworks helps interpreters see how their work fits the larger goal of respectful care.",
          ],
          terminology: [
            { term: "LEARN model", definition: "Listen, Explain, Acknowledge, Recommend, Negotiate — a cross-cultural communication framework." },
            { term: "RESPECT model", definition: "Rapport, Empathy, Support, Partnership, Explanations, Cultural competence, Trust." },
            { term: "Negotiation", definition: "Working toward a treatment plan that respects the patient's perspective." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In the LEARN model, the interpreter most directly enables the provider to:",
              options: ["Skip the patient's perspective", "Listen to and acknowledge the patient's perspective", "Decide unilaterally", "Avoid explanation"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Health Literacy and Plain Language",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Define health literacy and its impact on outcomes",
            "Render clinical language at an accessible level faithfully",
            "Recognize signs of low health literacy",
          ],
          content: [
            "Health literacy is a patient's ability to obtain, understand, and use health information to make decisions. Many patients — in any language — struggle with medical jargon, and language barriers compound the challenge. When a provider uses plain language, the interpreter renders that plain language faithfully; when a provider uses jargon, the interpreter conveys it accurately and, if the patient shows confusion, transparently signals that a simpler explanation may help.",
            "Interpreters must resist the urge to simplify on their own, because deciding what to leave out is a clinical judgment outside their role. Instead, they render faithfully and surface confusion so the provider can adjust. Recognizing signs of low health literacy — nodding without questions, difficulty with teach-back — helps the interpreter know when to transparently flag a possible comprehension gap.",
          ],
          terminology: [
            { term: "Health literacy", definition: "The capacity to obtain, understand, and act on health information." },
            { term: "Plain language", definition: "Clear, jargon-free communication tailored to the audience." },
            { term: "Jargon", definition: "Specialized terminology that can impede patient understanding." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a provider uses heavy jargon and the patient looks confused, the interpreter should:",
              options: ["Silently simplify the message", "Render faithfully and transparently signal possible confusion", "Skip the jargon", "Explain the medicine themselves"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Traditional Medicine and Complementary Practices",
          duration: "12:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Recognize common traditional and complementary practices",
            "Convey their mention neutrally and accurately",
            "Support safe integration by faithful rendering",
          ],
          content: [
            "Many patients use traditional remedies, herbal preparations, or complementary practices alongside biomedical care. These can matter clinically — some herbs interact with medications — so when a patient mentions them, the interpreter conveys the information faithfully and neutrally, without judgment or dismissal. Suppressing or minimizing such disclosures can hide a real safety issue.",
            "The interpreter's neutrality is key. You neither endorse nor criticize a practice; you render what the patient says so the provider can ask appropriate follow-up questions. If a term for a remedy has no direct equivalent, you may transparently describe it briefly. Faithful, respectful rendering of traditional-medicine disclosures supports both patient trust and safe care.",
          ],
          terminology: [
            { term: "Traditional medicine", definition: "Health practices rooted in a culture's historical knowledge and beliefs." },
            { term: "Complementary practice", definition: "A therapy used alongside conventional medical care." },
            { term: "Herb-drug interaction", definition: "A clinically relevant effect between an herbal remedy and a medication." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a patient mentions an herbal remedy, the interpreter should:",
              options: ["Dismiss it as irrelevant", "Convey it faithfully and neutrally", "Warn the patient against it", "Omit it"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Culturally Sensitive Topics",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Interpret sensitive subjects with accuracy and dignity",
            "Maintain neutrality on topics that may be taboo",
            "Manage your own reactions professionally",
          ],
          content: [
            "Some topics — sexuality, mental health, substance use, end-of-life, reproductive choices — carry cultural sensitivity and may be taboo for a patient. The interpreter renders these subjects accurately and with a calm, respectful register, neither softening clinical meaning to spare discomfort nor reacting visibly in ways that could shame the patient. Dignity and accuracy go together.",
            "Managing your own reactions is a professional skill. You may personally hold strong views, but impartiality requires you to interpret faithfully regardless. If a topic genuinely exceeds your ability to remain neutral — for example, due to a personal connection — the professional step is to disclose the conflict and, if necessary, withdraw, rather than let bias affect the rendering. Handling sensitive topics well protects the patient's voice and the integrity of care.",
          ],
          terminology: [
            { term: "Taboo topic", definition: "A subject that is culturally sensitive or restricted to discuss openly." },
            { term: "Neutral register", definition: "A calm, non-judgmental tone maintained during sensitive content." },
            { term: "Conflict of interest", definition: "A personal factor that could compromise impartiality, requiring disclosure." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When interpreting a culturally sensitive topic, the interpreter should:",
              options: ["Soften the clinical meaning", "Render accurately with a calm, respectful register", "Show personal disapproval", "Change the subject"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "Cultural Competency in Healthcare — Final Assessment",
    category: "Medical",
    durationMinutes: 25,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "A patient's 'explanatory model' refers to:",
        options: ["Their beliefs about the cause and treatment of illness", "Their insurance plan", "The hospital's protocol", "The interpreter's opinion"],
        answer: 0,
      },
      {
        id: "q2",
        question: "Cultural competence avoids which error?",
        options: ["Stereotyping individuals by background", "Listening to the patient", "Rendering faithfully", "Staying neutral"],
        answer: 0,
      },
      {
        id: "q3",
        question: "When jargon confuses a patient, the interpreter should:",
        options: ["Render faithfully and transparently signal confusion", "Silently simplify", "Skip it", "Explain the medicine themselves"],
        answer: 0,
      },
      {
        id: "q4",
        question: "A patient's mention of an herbal remedy should be:",
        options: ["Conveyed faithfully and neutrally", "Dismissed", "Criticized", "Omitted"],
        answer: 0,
      },
      {
        id: "q5",
        question: "If a sensitive topic exceeds an interpreter's ability to stay neutral, they should:",
        options: ["Disclose the conflict and, if needed, withdraw", "Interpret with visible bias", "Change the subject", "Give personal advice"],
        answer: 0,
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 8. Patient Safety & Risk Management
// ─────────────────────────────────────────────────────────────────────────
cchiContent["patient-safety-risk-management"] = {
  resources: res("PSR"),
  modules: [
    {
      id: "m1",
      title: "Interpreting for Patient Safety",
      lessons: [
        {
          id: "l1",
          title: "Interpreting and Patient Safety",
          duration: "13:30",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Explain how interpreting affects patient safety",
            "Identify high-risk communication points",
            "Adopt a safety-first mindset",
          ],
          content: [
            "Interpreters are patient-safety professionals. Communication failures are a leading contributor to medical errors, and language barriers multiply that risk. When an interpreter renders a symptom, a dosage, an allergy, or a consent accurately, they directly prevent harm; when meaning is lost, the consequences can be severe. A safety-first mindset treats every rendering — especially numbers, names, and instructions — as potentially decisive.",
            "High-risk points recur: medication reconciliation, allergy history, informed consent, discharge instructions, and hand-offs between staff. At these moments the interpreter slows down, confirms critical details, and clarifies rather than guesses. Recognizing where risk concentrates lets the interpreter apply extra care exactly where it matters most.",
          ],
          terminology: [
            { term: "Patient safety", definition: "The prevention of harm to patients during health care." },
            { term: "Communication error", definition: "A breakdown in information transfer that can cause harm." },
            { term: "High-risk point", definition: "A moment (dosing, allergies, consent) where errors are especially dangerous." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Interpreters contribute to patient safety mainly by:",
              options: ["Giving medical advice", "Accurately conveying symptoms, dosages, and instructions", "Speeding up visits", "Making decisions for patients"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Common Interpreting Errors and Their Consequences",
          duration: "14:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Name the major categories of interpreting error",
            "Connect each error type to potential harm",
            "Adopt habits that prevent them",
          ],
          content: [
            "Research identifies recurring error types: omission (leaving something out), addition (inserting information not said), substitution (replacing a term with a wrong one), editorialization (adding one's own view), and false fluency (using a target-language word that does not mean what the speaker intended). Each can change clinical meaning — omitting a symptom, substituting a dosage unit, or editorializing a patient's refusal.",
            "The consequences are concrete: a substituted number can cause an overdose; an omitted allergy can cause a reaction; an editorialized refusal can undermine informed consent. Prevention comes from disciplined habits — render everything, note numbers, clarify the unclear, and never smooth over what a speaker actually said. Knowing the error taxonomy helps interpreters catch themselves in the act.",
          ],
          terminology: [
            { term: "Omission", definition: "Failing to render part of a message." },
            { term: "Substitution", definition: "Replacing a term with an incorrect one (dangerous with dosages)." },
            { term: "Editorialization", definition: "Adding the interpreter's own commentary or opinion." },
            { term: "False fluency", definition: "Using a plausible target word that misrepresents the intended meaning." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Replacing '15 mg' with '50 mg' is an example of:",
              options: ["Omission", "Substitution", "Editorialization", "Clarification"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Medication and Dosage Accuracy",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Render medications, doses, routes, and frequencies exactly",
            "Use read-back for critical numbers",
            "Flag ambiguous or unsafe-sounding instructions",
          ],
          content: [
            "Medication information is among the highest-risk content an interpreter handles. A complete rendering includes the drug name, dose, unit, route (by mouth, injection), and frequency. Because these details are easy to lose by ear, the interpreter notes them and, for critical values, uses a read-back: rendering the number and confirming it with the speaker before moving on.",
            "The interpreter never rounds, converts, or 'fixes' a dosage — that is outside scope and unsafe. If an instruction is ambiguous ('take one', without saying of what) or sounds internally inconsistent, the professional response is to transparently ask the provider to clarify. Protecting dosage accuracy is one of the most direct ways an interpreter prevents harm.",
          ],
          terminology: [
            { term: "Read-back", definition: "Repeating a critical value to confirm accuracy before continuing." },
            { term: "Route", definition: "How a medication is given (oral, IV, injection, topical)." },
            { term: "Frequency", definition: "How often a medication is taken (e.g., twice daily)." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If a dosage instruction is ambiguous, the interpreter should:",
              options: ["Guess a reasonable value", "Transparently ask the provider to clarify", "Round to a common dose", "Skip it"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Teach-Back and Confirming Understanding",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Support the teach-back method during encounters",
            "Interpret confirmation of understanding accurately",
            "Recognize when a patient has not understood",
          ],
          content: [
            "Teach-back is a safety technique in which the provider asks the patient to restate instructions in their own words to confirm understanding. The interpreter's job is to render the provider's teach-back prompt and the patient's response faithfully — including when the patient's restatement reveals a misunderstanding. The interpreter does not correct the patient or fill gaps; they convey exactly what the patient says so the provider can re-explain.",
            "This is a place where the temptation to help can cause harm. If a patient restates a dosage incorrectly, an interpreter who 'corrects' it silently hides the misunderstanding from the provider, defeating the purpose of teach-back. Faithful rendering of a wrong answer is safer than a smoothed-over right-sounding one, because it lets the provider fix the real gap.",
          ],
          terminology: [
            { term: "Teach-back", definition: "Asking a patient to restate instructions to confirm understanding." },
            { term: "Confirmation of understanding", definition: "Verification that the patient has correctly grasped the information." },
            { term: "Faithful rendering", definition: "Conveying exactly what was said, even a mistaken restatement." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If a patient restates instructions incorrectly during teach-back, the interpreter should:",
              options: ["Silently correct it", "Render the incorrect restatement so the provider can re-explain", "Skip the error", "Explain it themselves"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Incident Reporting and Error Recovery",
          duration: "12:10",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Correct your own interpreting errors transparently",
            "Report safety concerns through proper channels",
            "Support a just, non-punitive safety culture",
          ],
          content: [
            "Interpreters make mistakes, and the professional response is transparent correction. If you realize you mis-rendered something, you immediately and openly correct it: 'The interpreter needs to correct the previous statement — the dose is fifteen milligrams, not fifty.' Correcting an error the moment you catch it is a mark of competence, not weakness, and it can prevent harm.",
            "Beyond in-the-moment correction, interpreters report safety concerns and possible errors through the organization's incident-reporting process. A just safety culture treats reports as learning opportunities rather than blame, which encourages people to surface near-misses. Interpreters support this culture by reporting promptly, honestly, and without fear, because catching problems early protects patients.",
          ],
          terminology: [
            { term: "Transparent correction", definition: "Openly fixing an interpreting error the moment it is noticed." },
            { term: "Incident report", definition: "A formal notification of an error, near-miss, or safety concern." },
            { term: "Just culture", definition: "A non-punitive environment that treats reported errors as learning opportunities." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When you notice you mis-rendered a dosage moments ago, you should:",
              options: ["Ignore it to avoid embarrassment", "Transparently correct it right away", "Wait until the visit ends", "Change the topic"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "Patient Safety & Risk Management — Final Assessment",
    category: "Medical",
    durationMinutes: 25,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "Interpreters improve patient safety primarily by:",
        options: ["Accurate rendering of symptoms, dosages, and instructions", "Advising patients", "Shortening visits", "Deciding treatment"],
        answer: 0,
      },
      {
        id: "q2",
        question: "Rendering '15 mg' as '50 mg' is which error type?",
        options: ["Substitution", "Omission", "Clarification", "Teach-back"],
        answer: 0,
      },
      {
        id: "q3",
        question: "A 'read-back' is used to:",
        options: ["Confirm a critical value like a dosage", "Summarize the visit", "End the call", "Skip clarification"],
        answer: 0,
      },
      {
        id: "q4",
        question: "During teach-back, an incorrect patient restatement should be:",
        options: ["Rendered faithfully so the provider can re-explain", "Silently corrected", "Omitted", "Explained by the interpreter"],
        answer: 0,
      },
      {
        id: "q5",
        question: "The correct response to noticing your own error is:",
        options: ["Transparent, immediate correction", "Ignoring it", "Waiting until later", "Blaming the provider"],
        answer: 0,
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 7. Healthcare Interpreting Foundations
// ─────────────────────────────────────────────────────────────────────────
cchiContent["healthcare-interpreting-foundations"] = {
  resources: res("HIF"),
  modules: [
    {
      id: "m1",
      title: "Foundations of the Role",
      lessons: [
        {
          id: "l1",
          title: "The Healthcare Interpreter's Role",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Define the interpreter's role and its boundaries",
            "Distinguish interpreting from translation and advocacy",
            "Explain the interpreter's impact on care quality",
          ],
          content: [
            "A healthcare interpreter's core role is to enable accurate, complete communication between a patient and a provider who do not share a language. Interpreting is spoken or signed and happens in real time; translation is written and done with time to revise. The interpreter is a neutral conduit first: everything said is conveyed faithfully, in the first person, without adding, omitting, or advising.",
            "The role has defined edges. The interpreter is not the patient's advocate in general matters, not a source of medical advice, and not a decision-maker. Within the encounter, however, the interpreter's accuracy and management of communication have a direct effect on whether the patient understands their diagnosis, consents meaningfully, and follows treatment. Understanding the role — and its limits — is the foundation everything else builds on.",
          ],
          terminology: [
            { term: "Interpreting", definition: "Real-time oral or signed rendering of spoken/signed communication." },
            { term: "Translation", definition: "Rendering of written text from one language to another." },
            { term: "Conduit role", definition: "The interpreter's primary function as a neutral, faithful relay of communication." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Interpreting differs from translation because interpreting is:",
              options: ["Written and revisable", "Spoken/signed and in real time", "Only for legal work", "Done by machines"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Modes of Interpreting",
          duration: "14:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Distinguish consecutive, simultaneous, and sight translation",
            "Select the appropriate mode for a healthcare situation",
            "Understand the demands of each mode",
          ],
          content: [
            "There are three primary modes. Consecutive interpreting — the workhorse of healthcare — means the speaker pauses and the interpreter renders segments in turn; it maximizes accuracy for dialogue like history-taking. Simultaneous interpreting means rendering while the speaker continues, used for monologue situations like a provider explaining to a group or in some mental-health settings. Sight translation means reading a written document aloud in the target language, such as consent forms.",
            "Choosing a mode depends on the situation. Consecutive is default for two-way clinical conversation because it supports precision and clarification. Simultaneous is reserved for one-directional speech where interrupting would be disruptive. Skilled interpreters shift modes appropriately and tell the parties when they do, keeping the encounter both accurate and smooth.",
          ],
          terminology: [
            { term: "Consecutive interpreting", definition: "Rendering after the speaker pauses; default for clinical dialogue." },
            { term: "Simultaneous interpreting", definition: "Rendering while the speaker continues, used for monologue." },
            { term: "Sight translation", definition: "Reading a written document aloud in the target language." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The default mode for two-way clinical conversation is:",
              options: ["Simultaneous", "Consecutive", "Sight translation", "Written translation"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Message Transfer & Accuracy",
          duration: "14:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Convey meaning, register, and intent faithfully",
            "Preserve everything without addition or omission",
            "Manage memory for accurate rendering",
          ],
          content: [
            "Accurate message transfer means conveying not just words but meaning, register (formal vs. informal), and intent. A faithful rendering preserves the patient's tone — hesitation, certainty, distress — because these carry clinical information. The interpreter neither polishes rough speech nor intensifies calm speech; the message arrives as it was sent.",
            "Memory is the enabling skill. In consecutive mode you hold a segment, capture numbers and names in notes, and render completely. When a segment is too long, you transparently ask the speaker to pause. Accuracy is not perfection of vocabulary alone; it is completeness and faithfulness, sustained across the whole encounter.",
          ],
          terminology: [
            { term: "Register", definition: "The level of formality and tone of speech, preserved in rendering." },
            { term: "Fidelity", definition: "Complete, faithful transfer of meaning and intent." },
            { term: "Working memory", definition: "The short-term retention that supports consecutive interpreting." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Faithful message transfer preserves:",
              options: ["Only the literal words", "Meaning, register, and intent", "A polished version", "The interpreter's summary"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Managing the Flow of Communication",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Control pacing and turn-taking without dominating",
            "Signal for pauses and repetitions professionally",
            "Keep the encounter accurate and orderly",
          ],
          content: [
            "The interpreter manages flow so that nothing is lost, without taking over the conversation. Techniques include a clear pre-session that asks speakers to pause after a few sentences, a discreet hand or verbal signal to request a pause, and brief transparent requests for repetition. The aim is a natural rhythm where the interpreter can render complete, accurate segments.",
            "Flow management protects both accuracy and rapport. If a provider races ahead, information is lost; if the interpreter interrupts constantly, the encounter feels stilted. The skill is calibrated intervention — enough to keep segments manageable, little enough to keep the patient and provider in genuine dialogue with each other.",
          ],
          terminology: [
            { term: "Pacing", definition: "Managing the speed and segment length of the conversation." },
            { term: "Turn-taking", definition: "Coordinating who speaks and when." },
            { term: "Calibrated intervention", definition: "Intervening just enough to preserve accuracy without dominating." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Good flow management aims to:",
              options: ["Let the interpreter control the conversation", "Keep segments manageable while preserving direct dialogue", "Speed the encounter up regardless of accuracy", "Eliminate all pauses"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "The Interpreter as Cultural Broker",
          duration: "13:20",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Recognize when culture affects understanding",
            "Surface cultural gaps transparently and neutrally",
            "Avoid stereotyping and overstepping",
          ],
          content: [
            "Beyond words, interpreters sometimes serve as cultural brokers — surfacing a cultural difference that is blocking understanding so the parties can address it. This is a limited, transparent role: you note that a cultural point may be relevant, briefly and neutrally, and let the provider and patient continue. You do not lecture, assume, or decide.",
            "The boundary is important. Culture-brokering is warranted only when a real communication gap exists, not whenever a patient comes from a particular background. Assuming a belief from someone's origin is stereotyping and a form of error. Done well, culture-brokering is another expression of accuracy: it protects meaning where a literal rendering would leave a gap.",
          ],
          terminology: [
            { term: "Cultural broker", definition: "A limited role surfacing culturally rooted misunderstandings for the parties to resolve." },
            { term: "Transparency", definition: "Announcing any cultural note to both parties, neutrally and briefly." },
            { term: "Stereotyping", definition: "Assuming an individual's beliefs from group membership; an error to avoid." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Culture-brokering is appropriate when:",
              options: ["The patient is from another country", "A real cultural gap is blocking understanding", "The interpreter disagrees with the patient", "Always, in every encounter"],
              answer: 1,
            },
          ],
        },
        {
          id: "l6",
          title: "Working Across Healthcare Settings",
          duration: "12:30",
          type: "reading",
          completed: false,
          objectives: [
            "Adapt to emergency, clinic, mental health, and remote settings",
            "Prepare appropriately for different assignments",
            "Apply consistent ethics across varied contexts",
          ],
          content: [
            "Healthcare interpreting spans very different settings — a fast, high-stress emergency department; a routine primary-care visit; an emotionally intense mental-health session; a bedside discharge; and remote OPI/VRI queues. Each has its own rhythm and demands, but the ethics and standards remain constant: accuracy, confidentiality, impartiality, transparency, and boundaries apply everywhere.",
            "Preparation adapts to the setting. For a specialty visit you review likely terminology; for mental health you brace for emotional content and pacing; for emergencies you prepare for speed and interruptions. Recognizing the demands of each context, while holding the same professional standards, is what allows an interpreter to be effective across the whole range of healthcare communication.",
          ],
          terminology: [
            { term: "Setting-specific preparation", definition: "Tailoring readiness (terminology, pacing, emotional load) to the assignment type." },
            { term: "Standard consistency", definition: "Applying the same ethics across all settings." },
            { term: "Acuity", definition: "The urgency and severity level of a clinical setting." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Across different healthcare settings, the interpreter's ethics and standards:",
              options: ["Change with each setting", "Remain constant while preparation adapts", "Apply only in emergencies", "Are optional in routine visits"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "Healthcare Interpreting Foundations — Final Assessment",
    category: "Medical",
    durationMinutes: 25,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "Interpreting is best defined as:",
        options: ["Written rendering with time to revise", "Real-time oral/signed rendering of communication", "Giving medical advice", "Summarizing conversations"],
        answer: 1,
      },
      {
        id: "q2",
        question: "The default mode for clinical dialogue is:",
        options: ["Consecutive", "Simultaneous", "Sight translation", "Whispered"],
        answer: 0,
      },
      {
        id: "q3",
        question: "Faithful message transfer preserves meaning, intent, and:",
        options: ["Register/tone", "The interpreter's opinion", "A polished version", "Only key words"],
        answer: 0,
      },
      {
        id: "q4",
        question: "Culture-brokering is appropriate:",
        options: ["Only when a real cultural gap blocks understanding", "In every encounter", "Whenever the patient is foreign-born", "When the interpreter disagrees"],
        answer: 0,
      },
      {
        id: "q5",
        question: "Across settings, interpreter ethics:",
        options: ["Stay constant while preparation adapts", "Change per setting", "Apply only remotely", "Are optional"],
        answer: 0,
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 6. VRI Professional Skills
// ─────────────────────────────────────────────────────────────────────────
cchiContent["vri-professional-skills"] = {
  resources: res("VRIP"),
  modules: [
    {
      id: "m1",
      title: "Video Remote Interpreting Skills",
      lessons: [
        {
          id: "l1",
          title: "Camera Positioning",
          duration: "12:20",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Set up a camera for clear, professional framing",
            "Use lighting and background to support communication",
            "Ensure sign-language visibility where relevant",
          ],
          content: [
            "In video remote interpreting (VRI), the camera is your presence in the room. Frame yourself head-and-shoulders, centered, with the camera at eye level so you appear to be looking at participants rather than down or up at them. Good, even lighting on your face (facing a light source, not backlit by a window) keeps your expressions readable, which supports rapport and, for signed languages, comprehension.",
            "Background matters: use a plain, uncluttered, non-distracting backdrop and ensure nothing confidential is visible behind you. For signed-language VRI, positioning must give enough space for hands and signing space to be fully visible in frame. A quick pre-call self-check of framing and lighting prevents mid-session disruptions.",
          ],
          terminology: [
            { term: "Framing", definition: "How the interpreter is positioned within the camera's view (typically head-and-shoulders, centered)." },
            { term: "Eye-level camera", definition: "Camera placed at eye height so gaze appears natural and direct." },
            { term: "Backlighting", definition: "Light behind the subject that darkens the face; avoided in VRI." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "For clear VRI, the camera should be placed:",
              options: ["Below the face, angled up", "At eye level, centered", "Far to the side", "Behind a bright window"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Professional Appearance",
          duration: "10:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Present a professional on-camera appearance",
            "Avoid clothing and patterns that distract on video",
            "Project competence and neutrality visually",
          ],
          content: [
            "On camera, appearance communicates professionalism before you say a word. Wear solid, muted colors; avoid busy patterns, stripes, and bright reds/greens that can distort or 'vibrate' on video. Keep grooming neat and remove distracting jewelry or accessories, especially for signed-language work where the hands and torso must be clearly readable.",
            "Professional appearance reinforces neutrality and trust. Just as an in-person interpreter dresses appropriately for a clinical setting, a VRI interpreter's tidy, understated presentation helps patients and providers focus on the communication rather than on the interpreter. Appearance is part of the same professionalism standard that governs punctuality and preparation.",
          ],
          terminology: [
            { term: "Solid colors", definition: "Plain, non-patterned clothing that reads cleanly on camera." },
            { term: "Visual neutrality", definition: "An understated appearance that keeps focus on the communication." },
            { term: "Moiré", definition: "A distracting shimmer that fine patterns can cause on video." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Best clothing choice for VRI is:",
              options: ["Fine stripes or busy patterns", "Solid, muted colors", "Bright neon", "Reflective accessories"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Video Etiquette",
          duration: "12:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply professional conduct specific to video encounters",
            "Manage gaze, gestures, and turn-taking on camera",
            "Maintain privacy and focus during sessions",
          ],
          content: [
            "Video etiquette blends interpreting standards with on-camera behavior. Look toward the camera when appropriate to simulate eye contact, use small clear gestures to manage turn-taking, and avoid off-camera distractions like checking a phone. As always, deliver a pre-session, interpret in the first person, and keep interventions transparent — the video medium does not change the ethics, only the channel.",
            "Focus and privacy are essential: close other applications, silence notifications, and ensure no one else is present or can see the screen. If you must look away to take a note, a brief transparent cue ('the interpreter is noting the dosage') keeps participants oriented, just as with dead air on the phone. Professional video etiquette makes the technology invisible and the communication clear.",
          ],
          terminology: [
            { term: "Simulated eye contact", definition: "Looking toward the camera so participants perceive direct gaze." },
            { term: "Turn-taking cues", definition: "Small visual signals that manage who speaks when." },
            { term: "Focus discipline", definition: "Eliminating distractions to stay present in the encounter." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Video etiquette changes which aspect of interpreting?",
              options: ["The code of ethics", "The channel/medium, not the ethics", "The need for accuracy", "Confidentiality duties"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Technical Troubleshooting",
          duration: "13:30",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Diagnose and resolve common VRI technical problems",
            "Communicate technical issues transparently",
            "Have a fallback plan when video fails",
          ],
          content: [
            "Technical problems are inevitable in VRI: frozen video, audio lag, echo, dropped connections, or a failing camera. The interpreter should run a pre-session tech check (camera, microphone, connection, platform login) and know the basic fixes: rejoin the session, switch to headphones to stop echo, disable video to preserve audio bandwidth, or move closer to the router.",
            "When a problem affects communication, handle it transparently: tell both parties what is happening ('the interpreter's video froze; audio is still connected') so no one is left guessing. Always have a fallback — most VRI setups can drop to phone audio if video fails. The goal is uninterrupted, accurate communication, so choosing a working channel quickly matters more than restoring perfect video.",
            "Practice scenario: mid-session your video freezes but audio is fine. The professional move is to state this transparently and continue in audio-only rather than losing time trying to fix video while the patient waits.",
          ],
          terminology: [
            { term: "Tech check", definition: "A pre-session verification of camera, microphone, connection, and platform." },
            { term: "Fallback", definition: "A backup channel (e.g., phone audio) used when video fails." },
            { term: "Latency", definition: "Delay between speaking and the audio/video reaching the other side." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If video freezes but audio works, the interpreter should:",
              options: ["Silently keep trying to fix video", "Transparently state the issue and continue in audio", "End the session", "Ignore the participants"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Managing Multi-party Calls",
          duration: "13:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Coordinate turn-taking among several on-screen participants",
            "Track and attribute speakers accurately",
            "Maintain accuracy in complex, multi-voice encounters",
          ],
          content: [
            "VRI encounters often involve several participants — a patient, a family member, a physician, and a nurse — sometimes across multiple screens. The interpreter must track who is speaking, attribute statements correctly, and manage turn-taking so voices do not collide. A clear pre-session that asks participants to speak one at a time and to identify themselves when needed prevents most confusion.",
            "Accuracy is harder with many voices, so the interpreter may transparently request that speakers pause or take turns, and may confirm attribution when it is unclear who said what ('the interpreter wants to confirm — was that the nurse or the doctor?'). Managing a multi-party call well is an advanced skill that combines flow management, memory, and transparent intervention to keep the encounter accurate and orderly.",
          ],
          terminology: [
            { term: "Speaker attribution", definition: "Correctly identifying which participant produced a given statement." },
            { term: "Turn management", definition: "Coordinating who speaks and when to prevent overlap." },
            { term: "Multi-party encounter", definition: "A session with three or more participants requiring extra coordination." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In a multi-party VRI call, when it is unclear who spoke, the interpreter should:",
              options: ["Guess", "Transparently confirm the speaker's identity", "Interpret it as anonymous", "Ignore attribution"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "VRI Professional Skills — Final Assessment",
    category: "Remote Interpreting",
    durationMinutes: 25,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "Ideal VRI camera placement is:",
        options: ["At eye level, centered", "Low and angled up", "Backlit by a window", "Far off to one side"],
        answer: 0,
      },
      {
        id: "q2",
        question: "Best on-camera clothing is:",
        options: ["Solid, muted colors", "Fine stripes", "Neon brights", "Reflective jewelry"],
        answer: 0,
      },
      {
        id: "q3",
        question: "Moving to video does NOT change the interpreter's:",
        options: ["Code of ethics and accuracy duty", "Camera angle", "Lighting", "Background"],
        answer: 0,
      },
      {
        id: "q4",
        question: "If video freezes but audio is fine, the interpreter should:",
        options: ["Continue transparently in audio", "End the call", "Stop interpreting", "Keep silent"],
        answer: 0,
      },
      {
        id: "q5",
        question: "In multi-party calls, unclear speaker identity should be:",
        options: ["Transparently confirmed", "Guessed", "Ignored", "Treated as anonymous"],
        answer: 0,
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 5. OPI Professional Skills
// ─────────────────────────────────────────────────────────────────────────
cchiContent["opi-professional-skills"] = {
  resources: res("OPIP"),
  modules: [
    {
      id: "m1",
      title: "Over-the-Phone Interpreting Skills",
      lessons: [
        {
          id: "l1",
          title: "Call Flow",
          duration: "13:40",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Describe the standard OPI call flow from connection to closing",
            "Manage timing, dead air, and hand-offs by voice alone",
            "Log required call data without breaching privacy",
          ],
          content: [
            "Over-the-phone interpreting (OPI) removes visual cues, so structure carries the call. A typical flow is: connect and greet, give a brief pre-session, confirm the languages, interpret the encounter managing turn-taking, and close professionally. Because you cannot see gestures or lips, you rely on clear voice, active listening, and explicit signals ('This is the interpreter — please go ahead').",
            "Managing 'dead air' — silence where the caller cannot tell what is happening — is an OPI-specific skill. When you need a moment to take a note or the line goes quiet, a short transparent cue keeps everyone oriented. Efficient call flow protects both accuracy and the patient's experience, especially in high-volume phone queues.",
          ],
          terminology: [
            { term: "OPI", definition: "Over-the-Phone Interpreting — audio-only remote interpreting." },
            { term: "Dead air", definition: "Unexplained silence on a call that can confuse or worry participants." },
            { term: "Hand-off", definition: "The transition of speaking turns managed by the interpreter." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Because OPI removes visual cues, the interpreter relies most on:",
              options: ["Facial expressions", "Clear voice signals and turn management", "Screen sharing", "Body language"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Introductions",
          duration: "11:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Deliver a concise, complete OPI pre-session",
            "State role, confidentiality, and first-person interpreting",
            "Set clarification and pacing expectations",
          ],
          content: [
            "The OPI introduction (pre-session) orients callers who cannot see you. In a few sentences you state your interpreter ID or name, that you will keep everything confidential, that you will interpret everything in the first person, and that either party may ask to pause or repeat. On the phone this brief script also confirms audio quality and that both parties can hear.",
            "A good introduction prevents the two most common OPI problems: people talking over each other and people addressing the interpreter instead of each other. By setting expectations up front — 'please speak directly to each other and pause after a few sentences' — you make the rest of the call smoother and more accurate.",
          ],
          terminology: [
            { term: "Pre-session", definition: "The interpreter's opening statement of role, confidentiality, and process." },
            { term: "First-person interpreting", definition: "Rendering each speaker as 'I' to keep parties in direct dialogue." },
            { term: "Interpreter ID", definition: "An identifier stated at the start of a call for logging and accountability." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A key purpose of the OPI introduction is to:",
              options: ["Fill time", "Set role, confidentiality, and turn-taking expectations", "Collect payment", "Record the patient"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Accuracy",
          duration: "14:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Maintain complete, faithful renderings by ear",
            "Use effective note-taking for numbers and names",
            "Avoid omission and summarizing under time pressure",
          ],
          content: [
            "Accuracy is the heart of interpreting, and OPI stresses it because you have only sound to work with. You must render everything — including numbers, dosages, names, and hesitations — without adding, omitting, or summarizing. Under phone-queue time pressure, the temptation to condense is real, but summarizing is a source of clinically significant error.",
            "Targeted note-taking protects accuracy: jot numbers, dosages, and proper names as you hear them, since these are easy to lose by ear. Worked example: a nurse says 'take 2.5 milligrams twice daily.' You note '2.5 mg BID' and render 'two point five milligrams, two times a day.' Reading a critical number back is far safer than trusting memory.",
          ],
          terminology: [
            { term: "Fidelity", definition: "Faithful rendering of the full message without addition, omission, or distortion." },
            { term: "Omission error", definition: "Leaving out part of a message, a common and dangerous accuracy failure." },
            { term: "Note-taking", definition: "Capturing numbers, names, and key details to support accurate rendering." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The safest way to handle a medication dosage on a call is to:",
              options: ["Summarize it", "Note it and render it exactly, reading back if needed", "Round it", "Skip it if unsure"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Clarification Protocols",
          duration: "12:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Request clarification transparently and professionally",
            "Distinguish clarifying from paraphrasing or explaining",
            "Keep interventions brief and neutral",
          ],
          content: [
            "When something is unclear — a mumbled word, an unfamiliar term, an ambiguous pronoun — the interpreter must clarify rather than guess. The protocol is transparent: 'This is the interpreter. I need to ask the doctor to repeat the last dosage.' You address the specific point, keep it brief, and interpret both the request and the answer so nothing happens off the record.",
            "Clarifying is not the same as paraphrasing or explaining. The interpreter does not decide what a speaker 'probably meant' or add explanations of their own; they ask the speaker to clarify and then render the clarified message. This discipline keeps the interpreter neutral and the information accurate.",
          ],
          terminology: [
            { term: "Clarification", definition: "A transparent request to a speaker to repeat or specify an unclear point." },
            { term: "Transparency", definition: "Announcing interventions to both parties so nothing is off the record." },
            { term: "Paraphrase", definition: "Restating in different words — something interpreters avoid in place of faithful rendering." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a term is unclear, the interpreter should:",
              options: ["Guess the meaning", "Transparently ask the speaker to clarify, then interpret the answer", "Skip it", "Explain what they think it means"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Managing Difficult Calls",
          duration: "15:10",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Handle distress, conflict, and poor audio on OPI calls",
            "Stay in role while managing pace and emotion",
            "Know when to escalate or end a call appropriately",
          ],
          content: [
            "Difficult OPI calls include distressed or crying callers, angry parties, overlapping speech, background noise, and poor connections. The interpreter stays in role — interpreting everything impartially — while using voice-based tools: requesting one speaker at a time, asking for a repeat when audio drops, and maintaining a calm, steady tone that helps de-escalate tension without taking sides.",
            "Some situations require escalation. If the audio is unusable, the interpreter transparently reports it and the parties arrange a callback. If a caller is abusive toward the interpreter, professional policy typically allows a warning and, if it continues, ending the call through the proper process. Managing difficulty is about protecting accuracy and safety, not enduring anything.",
          ],
          terminology: [
            { term: "De-escalation", definition: "Using calm, neutral communication to reduce tension." },
            { term: "Escalation", definition: "Involving a supervisor or ending a call per policy when needed." },
            { term: "Crosstalk", definition: "Multiple people speaking at once, which the interpreter must manage." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When two people talk over each other on a call, the interpreter should:",
              options: ["Interpret only the louder one", "Transparently ask for one speaker at a time", "Stop interpreting", "Pick a side"],
              answer: 1,
            },
          ],
        },
        {
          id: "l6",
          title: "Customer Service",
          duration: "11:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Deliver professional, courteous service within the interpreter role",
            "Balance warmth with impartiality and boundaries",
            "Represent the language-services provider well",
          ],
          content: [
            "OPI interpreters are often the voice of a language-services company, and professional customer service builds trust with clients and patients. Service means a courteous greeting, a patient and respectful tone, clear audio etiquette, and reliability — being ready, prepared, and professional on every call. Good service does not mean stepping outside the role; it means performing the role gracefully.",
            "The balance is warmth with impartiality. You can be kind and reassuring in tone while remaining neutral in content, never advising or advocating outside scope. Ending calls professionally — confirming both parties are finished, thanking them briefly — leaves a positive impression and reflects well on both you and the provider you represent.",
          ],
          terminology: [
            { term: "Audio etiquette", definition: "Professional voice practices: clear speech, no interruptions, minimal noise." },
            { term: "Impartiality", definition: "Neutral conduct that does not favor or advise any party." },
            { term: "Professional demeanor", definition: "Courteous, reliable, prepared conduct on every call." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Good OPI customer service means:",
              options: ["Giving advice to be helpful", "Being courteous and reliable while staying neutral and in role", "Chatting personally with callers", "Advocating for one side"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "OPI Professional Skills — Final Assessment",
    category: "Remote Interpreting",
    durationMinutes: 25,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "'Dead air' on an OPI call refers to:",
        options: ["Unexplained silence that confuses callers", "A dropped call", "Background music", "The pre-session"],
        answer: 0,
      },
      {
        id: "q2",
        question: "The OPI introduction should state role, confidentiality, first-person use, and:",
        options: ["The interpreter's opinion", "Clarification and pacing expectations", "The patient's diagnosis", "Payment terms"],
        answer: 1,
      },
      {
        id: "q3",
        question: "For a spoken medication dosage, the interpreter should:",
        options: ["Round it", "Note and render it exactly, reading back if needed", "Summarize it", "Omit if unsure"],
        answer: 1,
      },
      {
        id: "q4",
        question: "Clarification differs from paraphrasing because it:",
        options: ["Adds the interpreter's explanation", "Asks the speaker to specify, then renders the answer", "Guesses the meaning", "Skips the unclear part"],
        answer: 1,
      },
      {
        id: "q5",
        question: "When callers talk over each other, the professional move is to:",
        options: ["Pick the louder speaker", "Ask transparently for one speaker at a time", "Stop the call", "Interpret a summary"],
        answer: 1,
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 4. HIPAA & Compliance
// ───────────────────────────────────────────────────���─────────────────────
cchiContent["healthcare-hipaa-compliance"] = {
  resources: res("HHC"),
  modules: [
    {
      id: "m1",
      title: "HIPAA Rules & Compliance",
      lessons: [
        {
          id: "l1",
          title: "Protected Health Information",
          duration: "13:10",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Define protected health information (PHI) and its identifiers",
            "Recognize PHI in interpreting contexts",
            "Apply the minimum-necessary standard",
          ],
          content: [
            "Protected Health Information (PHI) is any individually identifiable health information created, received, or handled in the course of care. It includes obvious data like name, diagnosis, and treatment, and less obvious identifiers like dates of service, medical record numbers, addresses, and even a rare condition that could identify someone in a small community. For interpreters, virtually everything you hear in an encounter is PHI.",
            "The minimum-necessary standard requires that only the least PHI needed for a task be accessed, used, or disclosed. An interpreter never needs to browse a chart, and should not request details unrelated to the communication being interpreted. Treating all encounter information as PHI, by default, is the safest professional habit.",
          ],
          terminology: [
            { term: "PHI", definition: "Protected Health Information — individually identifiable health data safeguarded by HIPAA." },
            { term: "Identifier", definition: "Any data element (name, date, record number) that can identify a patient." },
            { term: "Minimum necessary", definition: "Using or disclosing only the least PHI required for the task." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which of the following is PHI?",
              options: ["A patient's diagnosis and appointment date", "The weather", "A generic drug's chemical formula", "The clinic's business hours"],
              answer: 0,
            },
          ],
        },
        {
          id: "l2",
          title: "Privacy Rule",
          duration: "14:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain the purpose of the HIPAA Privacy Rule",
            "Describe permitted uses and disclosures of PHI",
            "Apply the rule to interpreter conduct",
          ],
          content: [
            "The HIPAA Privacy Rule sets national standards for how PHI may be used and disclosed. It permits sharing PHI for treatment, payment, and health care operations, and otherwise generally requires patient authorization. Interpreters, as part of the treatment team or as business associates, are bound by these standards: PHI may be used only to accomplish the interpreting task, never for personal purposes or casual conversation.",
            "In practice, the Privacy Rule means an interpreter does not confirm to an outsider that a person is even a patient, does not discuss cases in hallways or online, and does not share stories that include identifiers. Even de-identified anecdotes are risky if details could re-identify someone. When in doubt, say nothing.",
          ],
          terminology: [
            { term: "Privacy Rule", definition: "HIPAA standards governing how PHI may be used and disclosed." },
            { term: "Business associate", definition: "A person or entity handling PHI on behalf of a covered entity, bound by HIPAA." },
            { term: "Authorization", definition: "A patient's written permission to use or disclose PHI beyond permitted purposes." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Under the Privacy Rule, PHI may be used without extra authorization for:",
              options: ["Treatment, payment, and health care operations", "Social media posts", "Personal storytelling", "Marketing to friends"],
              answer: 0,
            },
          ],
        },
        {
          id: "l3",
          title: "Security Rule",
          duration: "13:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain the HIPAA Security Rule and electronic PHI",
            "Apply administrative, physical, and technical safeguards",
            "Secure devices used for remote interpreting",
          ],
          content: [
            "The HIPAA Security Rule protects electronic PHI (ePHI) through administrative, physical, and technical safeguards. For interpreters, especially remote ones, this means using secure, approved platforms; protecting devices with passwords and encryption; keeping software updated; and never storing ePHI on personal, unsecured devices or cloud accounts.",
            "Physical safeguards matter too: working in a private space, positioning screens away from others, and locking devices when away. Technical safeguards include using the vendor-provided secure video or phone system rather than a personal app. A single insecure connection can expose a patient's information and create a reportable breach.",
          ],
          terminology: [
            { term: "ePHI", definition: "Electronic Protected Health Information." },
            { term: "Encryption", definition: "Converting data into a coded form unreadable without a key." },
            { term: "Safeguards", definition: "Administrative, physical, and technical controls that protect ePHI." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A remote interpreter should conduct sessions on:",
              options: ["A personal social app", "The vendor-provided secure platform", "Any free public tool", "A shared family computer"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Confidentiality",
          duration: "12:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Distinguish confidentiality from privacy and security",
            "Maintain confidentiality across settings",
            "Recognize narrow limits and mandatory reporting",
          ],
          content: [
            "Confidentiality is the professional duty to keep encounter information private. It overlaps with HIPAA but is also an ethical obligation independent of the law. For interpreters it means not discussing assignments with family, colleagues, or friends, and not reacting to sensitive content in ways that reveal it. Confidentiality persists after the encounter ends and after the assignment relationship ends.",
            "There are narrow limits. Certain disclosures are legally required — for example, imminent threats of harm or mandated reporting of abuse in some roles — but these are handled through the provider and proper channels, not by the interpreter acting alone. When such a situation arises, the interpreter interprets faithfully and, if needed, transparently raises the concern with the provider rather than breaching confidentiality independently.",
          ],
          terminology: [
            { term: "Confidentiality", definition: "The duty to keep encounter information private and undisclosed." },
            { term: "Mandatory reporting", definition: "Legally required disclosure of certain harms (e.g., abuse), handled through proper channels." },
            { term: "Breach", definition: "An unauthorized use or disclosure of protected information." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An interpreter's duty of confidentiality:",
              options: ["Ends when the session ends", "Continues after the encounter and assignment end", "Applies only to written records", "Allows sharing with family"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Data Protection",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Handle notes, recordings, and documents securely",
            "Dispose of PHI properly",
            "Prevent common data-protection failures",
          ],
          content: [
            "Data protection covers the full life cycle of any information an interpreter touches. Temporary notes taken to aid memory during a session should contain the minimum necessary, never leave the interpreter's control, and be securely destroyed (shredded or permanently deleted) as soon as they are no longer needed. Interpreters do not record sessions unless explicitly authorized and using approved, secure systems.",
            "Common failures are mundane but serious: leaving notes visible, discussing a case where others can hear, emailing PHI to a personal account, or reusing a scratch pad. Building small, consistent habits — clearing your workspace, using approved tools, destroying notes — prevents the majority of breaches.",
          ],
          terminology: [
            { term: "Data life cycle", definition: "The stages from creation and use to storage and secure destruction of information." },
            { term: "Secure disposal", definition: "Destroying PHI so it cannot be recovered (shredding or permanent deletion)." },
            { term: "Data minimization", definition: "Collecting and keeping only the information necessary for the task." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "After a session, temporary notes containing PHI should be:",
              options: ["Kept for future reference", "Securely destroyed when no longer needed", "Emailed to yourself", "Posted for colleagues"],
              answer: 1,
            },
          ],
        },
        {
          id: "l6",
          title: "Compliance Scenarios",
          duration: "15:00",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Apply HIPAA rules to realistic dilemmas",
            "Choose compliant responses under pressure",
            "Know how and when to report a possible breach",
          ],
          content: [
            "This lesson works through realistic scenarios. Scenario one: a friend recognizes a patient's name during your call and asks about them afterward — the compliant response is to decline to confirm or discuss anything, because even acknowledging the person is a patient is a disclosure. Scenario two: you accidentally sent a note with PHI to the wrong address — the compliant response is to report it promptly through your organization's breach process, not to hide it.",
            "Scenario three: a provider asks you to interpret while another patient's chart is visible on a shared screen — the compliant response is to point out the exposure so it can be corrected, applying the minimum-necessary and safeguard principles. In every case, compliance is about acting transparently, protecting PHI, and using proper channels rather than improvising. Reporting a mistake early is itself compliant behavior.",
          ],
          terminology: [
            { term: "Incident report", definition: "A formal notification of a possible privacy or security event." },
            { term: "Breach notification", definition: "The required process for reporting and addressing an unauthorized disclosure." },
            { term: "Compliance", definition: "Acting in accordance with legal and organizational privacy and security rules." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If you accidentally disclose PHI to the wrong person, you should:",
              options: ["Hope no one notices", "Report it promptly through the breach process", "Delete all your notes", "Tell the patient's family"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "HIPAA & Compliance — Final Assessment",
    category: "Compliance",
    durationMinutes: 25,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "PHI includes:",
        options: ["Any individually identifiable health information", "Only written diagnoses", "Only lab results", "Only insurance data"],
        answer: 0,
      },
      {
        id: "q2",
        question: "The Privacy Rule permits using PHI without extra authorization for:",
        options: ["Treatment, payment, and operations", "Marketing", "Social media", "Personal use"],
        answer: 0,
      },
      {
        id: "q3",
        question: "The Security Rule specifically protects:",
        options: ["Electronic PHI (ePHI)", "Only paper records", "Only verbal disclosures", "Only billing"],
        answer: 0,
      },
      {
        id: "q4",
        question: "An interpreter's confidentiality duty:",
        options: ["Continues after the assignment ends", "Ends immediately after the call", "Applies only to written notes", "Allows sharing with friends"],
        answer: 0,
      },
      {
        id: "q5",
        question: "The best response to an accidental PHI disclosure is to:",
        options: ["Report it through the breach process", "Ignore it", "Conceal it", "Blame the provider"],
        answer: 0,
      },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 3. Anatomy & Physiology for Interpreters
// ─────────────────────────────────────────────────────────────────────────
cchiContent["anatomy-physiology-interpreters"] = {
  resources: res("ANP"),
  modules: [
    {
      id: "m1",
      title: "Introduction to Anatomy & Physiology",
      lessons: [
        {
          id: "l1",
          title: "Anatomy vs Physiology",
          duration: "13:30",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Distinguish anatomy (structure) from physiology (function)",
            "Explain why interpreters need both perspectives",
            "Recognize how structure and function are linked",
          ],
          content: [
            "Anatomy is the study of the body's structures — what parts exist and where they are located — while physiology is the study of how those structures work and interact to keep the body alive. The two are inseparable: the shape of the alveoli (anatomy) is what allows efficient gas exchange (physiology), and the thick wall of the left ventricle (anatomy) is what lets it pump blood to the whole body (physiology). Providers move fluidly between the two, and interpreters must follow.",
            "For a healthcare interpreter, this distinction matters because providers constantly explain both what a structure is and what it does. When a cardiologist says 'the valve is not closing properly, so blood leaks backward', they are describing structure (the valve) and function (blood flow) in one breath. An interpreter who understands the link renders the explanation smoothly rather than word by word.",
            "A study diagram pairing each major organ with its primary function accompanies this lesson. Interpreters do not diagnose, but a working mental model of structure-and-function makes renderings faster, calmer, and more accurate — especially in fast-moving clinical encounters.",
          ],
          terminology: [
            { term: "Anatomy", definition: "The study of the body's structures and where they are located." },
            { term: "Physiology", definition: "The study of how body structures function and interact." },
            { term: "Structure-function link", definition: "The principle that a part's shape determines what it can do." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Physiology' is best described as the study of:",
              options: ["Where body parts are located", "How body structures function", "Disease names", "Surgical procedures"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Levels of Organization",
          duration: "13:00",
          type: "image",
          completed: false,
          objectives: [
            "List the levels of organization from cells to the organism",
            "Place clinical terms at the correct level",
            "Use the hierarchy to decode unfamiliar terms",
          ],
          content: [
            "The body is organized in a hierarchy of increasing complexity: chemicals form cells, cells combine into tissues, tissues form organs, organs work together as organ systems, and all systems together make the organism. Each level builds on the one below it. Understanding this order helps interpreters place a term correctly — a 'biopsy' samples tissue, an 'organ transplant' replaces an organ, and 'systemic' disease affects a whole system.",
            "A labeled diagram of the cell → tissue → organ → system → organism hierarchy accompanies this lesson. When a provider says 'the infection has become systemic', an interpreter who knows the hierarchy conveys that it has spread throughout the body rather than staying in one organ — an important distinction for the patient's understanding of how serious the situation is.",
          ],
          terminology: [
            { term: "Cell", definition: "The basic structural and functional unit of the body." },
            { term: "Tissue", definition: "A group of similar cells performing a shared function." },
            { term: "Organ", definition: "A structure of two or more tissue types with a specific job." },
            { term: "Organ system", definition: "A group of organs working together (e.g., the digestive system)." },
            { term: "Systemic", definition: "Affecting the entire body or a whole system." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The correct order of organization is:",
              options: ["Organ → cell → tissue → system", "Cell → tissue → organ → system", "System → organ → cell → tissue", "Tissue → cell → system → organ"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Homeostasis",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Define homeostasis and give physiological examples",
            "Explain negative feedback in plain language",
            "Interpret explanations of imbalance and its correction",
          ],
          content: [
            "Homeostasis is the body's ability to maintain a stable internal environment despite changes outside it — keeping temperature, blood sugar, blood pressure, and fluid balance within narrow, healthy ranges. The body constantly senses and corrects deviations. Most homeostasis works by negative feedback: when a value drifts too high or too low, the body triggers a response that brings it back toward normal, the way a thermostat switches heating on and off.",
            "Examples interpreters encounter: when blood sugar rises after a meal, the pancreas releases insulin to lower it; when the body overheats, it sweats to cool down; when blood pressure drops, the heart rate rises to compensate. Many diseases are failures of homeostasis — diabetes is a failure of blood-sugar regulation, and fever is the body resetting its temperature during infection.",
            "When a provider explains that 'your body is trying to compensate, but it can't keep up', the interpreter who understands homeostasis conveys the idea of a balancing system being overwhelmed. This framing helps patients understand why a condition is being treated and what the treatment is trying to restore.",
          ],
          terminology: [
            { term: "Homeostasis", definition: "Maintenance of a stable internal environment within healthy ranges." },
            { term: "Negative feedback", definition: "A correction that reverses a change to restore balance." },
            { term: "Compensation", definition: "The body's effort to offset an imbalance or loss of function." },
            { term: "Regulation", definition: "The control of a body value such as temperature or blood sugar." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Homeostasis' refers to the body's ability to:",
              options: ["Grow larger over time", "Maintain a stable internal environment", "Fight only infections", "Digest food"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Human Body Systems Overview",
          duration: "15:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Name the major organ systems and their primary functions",
            "Match a common complaint to the relevant system",
            "Preview the system-by-system vocabulary that follows",
          ],
          content: [
            "The body is made up of interacting organ systems, each with a core function: skeletal (support and protection), muscular (movement), cardiovascular (circulation), respiratory (gas exchange), digestive (breakdown and absorption of food), nervous (control and sensation), endocrine (hormonal regulation), urinary (filtering waste), reproductive (producing offspring), integumentary (skin), and immune/lymphatic (defense). No system works alone — the respiratory and cardiovascular systems together deliver oxygen to every cell.",
            "Interpreters do not need a physician's depth in any one system, but they must command the core vocabulary of each in both languages so a symptom or diagnosis is never lost. Being able to match a complaint to a system also helps anticipate the terminology likely to arise: chest pain points to cardiovascular or respiratory terms, while frequent urination points to urinary or endocrine terms.",
            "The modules that follow build each system in turn — structure first, then function, then the common conditions and vocabulary interpreters encounter most. A one-page overview diagram of all the systems accompanies this lesson as a reference to return to throughout the course.",
          ],
          terminology: [
            { term: "Organ system", definition: "A group of organs cooperating on a shared function." },
            { term: "Cardiovascular system", definition: "Heart and vessels; circulates blood." },
            { term: "Respiratory system", definition: "Airways and lungs; exchanges oxygen and carbon dioxide." },
            { term: "Endocrine system", definition: "Glands and hormones; regulates body processes." },
            { term: "Integumentary system", definition: "The skin, hair, and nails; the body's outer covering." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which system is primarily responsible for circulating blood?",
              options: ["Respiratory", "Cardiovascular", "Digestive", "Nervous"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Cells and Tissues",
      lessons: [
        {
          id: "l1",
          title: "Cell Structure",
          duration: "14:00",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Identify the main parts of a cell",
            "Describe the role of the nucleus, membrane, and organelles",
            "Connect cell structure to clinical vocabulary",
          ],
          content: [
            "The cell is the smallest living unit of the body. Each cell is surrounded by a cell membrane that controls what enters and leaves, filled with cytoplasm, and directed by a nucleus that contains the DNA — the cell's instructions. Inside the cytoplasm are organelles, including mitochondria, often called the cell's 'powerhouses' because they produce energy. Different cells specialize: nerve cells carry signals, muscle cells contract, and red blood cells carry oxygen.",
            "A labeled cell diagram accompanies this lesson. Interpreters meet cell vocabulary in genetics counseling, cancer care, and lab explanations. When a provider explains that 'the medication targets the DNA inside cancer cells to stop them from dividing', an interpreter who understands basic cell structure can render the mechanism accurately and reassuringly.",
          ],
          terminology: [
            { term: "Cell membrane", definition: "The outer boundary controlling what enters and leaves the cell." },
            { term: "Nucleus", definition: "The control center of the cell, containing DNA." },
            { term: "Mitochondria", definition: "Organelles that produce the cell's energy." },
            { term: "DNA", definition: "The genetic instructions stored in the nucleus." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The part of the cell that contains DNA and acts as its control center is the:",
              options: ["Membrane", "Nucleus", "Mitochondria", "Cytoplasm"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Cell Function",
          duration: "13:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Describe how cells obtain energy and divide",
            "Explain metabolism in plain language",
            "Interpret explanations involving abnormal cell growth",
          ],
          content: [
            "Cells carry out the body's work: they take in nutrients and oxygen, convert them into energy through metabolism, build proteins, and remove waste. Cells also reproduce by dividing — one cell becomes two — which is how the body grows and repairs itself. Normally, cell division is tightly controlled. When that control fails and cells divide uncontrollably, the result can be a tumor, and cancerous (malignant) cells may spread, a process called metastasis.",
            "Interpreters encounter these concepts in oncology and wound-healing conversations. When a provider explains that 'the biopsy shows the cells are dividing abnormally', or that 'the tumor is benign and not spreading', accurate rendering of terms like benign, malignant, and metastasis directly shapes how the patient understands the seriousness of their diagnosis.",
          ],
          terminology: [
            { term: "Metabolism", definition: "The chemical processes that convert nutrients into energy." },
            { term: "Cell division", definition: "The process by which one cell becomes two for growth and repair." },
            { term: "Benign", definition: "Not cancerous; not spreading to other tissues." },
            { term: "Malignant", definition: "Cancerous; able to invade and spread." },
            { term: "Metastasis", definition: "The spread of cancer cells from the original site to other parts of the body." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Metastasis' means the:",
              options: ["Death of a cell", "Spread of cancer cells to other parts of the body", "Production of energy", "Repair of a wound"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Tissue Types",
          duration: "13:40",
          type: "image",
          completed: false,
          objectives: [
            "Name the four basic tissue types and their roles",
            "Give an example of each tissue type",
            "Interpret tissue-related terminology",
          ],
          content: [
            "There are four basic tissue types. Epithelial tissue covers and lines surfaces, such as the skin and the lining of the stomach. Connective tissue supports and connects — it includes bone, cartilage, fat, and even blood. Muscle tissue contracts to produce movement. Nervous tissue carries electrical signals for communication. Every organ is built from a combination of these four types working together.",
            "A comparison diagram of the four tissue types accompanies this lesson. Interpreters meet these terms in pathology and surgery. When a provider explains that 'the biopsy sampled the epithelial lining' or that 'scar tissue is a type of connective tissue', understanding tissue categories lets the interpreter convey exactly what part of the body is being described.",
          ],
          terminology: [
            { term: "Epithelial tissue", definition: "Tissue that covers and lines body surfaces and cavities." },
            { term: "Connective tissue", definition: "Supporting tissue including bone, cartilage, fat, and blood." },
            { term: "Muscle tissue", definition: "Tissue that contracts to produce movement." },
            { term: "Nervous tissue", definition: "Tissue that transmits electrical signals." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Bone, cartilage, fat, and blood are all examples of:",
              options: ["Epithelial tissue", "Connective tissue", "Muscle tissue", "Nervous tissue"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Organ Formation",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain how tissues combine to form organs",
            "Describe how organs form systems",
            "Interpret references to organs and systems accurately",
          ],
          content: [
            "An organ is a structure made of two or more tissue types that work together to perform a specific function. The stomach, for example, combines epithelial tissue (its lining), muscle tissue (to churn food), connective tissue (support), and nervous tissue (control) into a single organ. Organs in turn cooperate as organ systems — the stomach works with the esophagus, intestines, liver, and pancreas as the digestive system.",
            "This building-block logic helps interpreters understand why a problem in one tissue can affect a whole organ, and why a problem in one organ can affect a whole system. When a provider explains that 'the damage to the heart muscle has weakened the whole heart's pumping', the interpreter conveys how a tissue-level injury produces an organ-level and then a system-level effect, which is often central to explaining a diagnosis and its treatment.",
          ],
          terminology: [
            { term: "Organ", definition: "A structure of two or more tissue types performing a specific function." },
            { term: "Organ system", definition: "A group of organs working together toward a shared function." },
            { term: "Function", definition: "The specific job a tissue, organ, or system performs." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An organ is defined as a structure made of:",
              options: ["A single cell", "Two or more tissue types working together", "Only muscle", "Only nervous tissue"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m3",
      title: "Skeletal System",
      lessons: [
        {
          id: "l1",
          title: "Bone Structure",
          duration: "14:00",
          type: "video",
          completed: false,
          videoUrl: V.c,
          objectives: [
            "Describe the composition and layers of a bone",
            "Explain the functions of the skeletal system",
            "Interpret bone-related terminology",
          ],
          content: [
            "The skeletal system provides structure, protects organs, allows movement (with muscles), stores minerals like calcium, and produces blood cells in the marrow. A typical bone has a hard outer layer (compact bone) for strength, a spongy inner layer for lightness, and a central cavity containing marrow, the tissue that makes blood cells. Bones are living tissue with their own blood supply, which is why they can heal after a fracture.",
            "A labeled bone-cross-section diagram accompanies this lesson. Interpreters meet this vocabulary in orthopedics and after injuries. When a provider explains that 'the fracture is healing and new bone is forming', an interpreter who understands that bone is living, regenerating tissue can convey the reassurance accurately, helping the patient understand the recovery timeline.",
          ],
          terminology: [
            { term: "Compact bone", definition: "The dense, hard outer layer of a bone." },
            { term: "Marrow", definition: "Tissue inside bones that produces blood cells." },
            { term: "Calcium", definition: "A mineral stored in bone and essential for strength." },
            { term: "Periosteum", definition: "The membrane covering the outer surface of bone." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Blood cells are produced in the bone's:",
              options: ["Compact layer", "Marrow", "Periosteum", "Cartilage"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Major Bones",
          duration: "13:20",
          type: "image",
          completed: false,
          objectives: [
            "Identify major bones by common and clinical names",
            "Distinguish the axial from the appendicular skeleton",
            "Render bone names precisely in injury descriptions",
          ],
          content: [
            "Interpreters should know the bones patients and providers name most often: the skull (cranium), spine (vertebrae), ribs, sternum (breastbone), pelvis, femur (thigh bone), tibia and fibula (lower leg), humerus (upper arm), and radius and ulna (forearm). The skeleton is divided into the axial skeleton (skull, spine, and rib cage — the body's central axis) and the appendicular skeleton (the limbs and the girdles that attach them).",
            "A labeled full-skeleton diagram accompanies this lesson so learners can pair each term with its location. Practice scenario: a provider points to an X-ray and says 'there is a hairline fracture of the distal radius.' The interpreter conveys both the location (near the wrist end of the forearm bone) and the nature (a thin, incomplete break) in language the patient understands, while preserving the clinical precision the provider intended.",
          ],
          terminology: [
            { term: "Vertebrae", definition: "The bones that form the spinal column." },
            { term: "Femur", definition: "The thigh bone, the longest bone in the body." },
            { term: "Axial skeleton", definition: "The skull, spine, and rib cage." },
            { term: "Appendicular skeleton", definition: "The limbs and the girdles that attach them." },
            { term: "Radius / Ulna", definition: "The two bones of the forearm." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which is part of the axial skeleton?",
              options: ["Femur", "Spine", "Wrist", "Ankle"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Joint Types",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Define a joint and name common joint types",
            "Describe the structures that support a joint",
            "Interpret descriptions of joint movement and problems",
          ],
          content: [
            "A joint is where two bones meet, and joints are what make the skeleton movable. Different joints allow different motions: a hinge joint (like the knee or elbow) bends and straightens; a ball-and-socket joint (like the hip or shoulder) rotates in many directions; and some joints, like those between skull bones, barely move at all. Joints are supported by ligaments (connecting bone to bone) and cushioned by cartilage, with tendons attaching muscle to bone nearby.",
            "A diagram comparing joint types accompanies this lesson. 'Range of motion' — how far a joint can move — is a phrase interpreters hear often in exams and physical therapy. When a provider assesses whether a patient can 'flex and extend' a joint, or notes that 'the cartilage is worn down', the interpreter renders the specific joint and motion precisely, since these details guide diagnosis and treatment.",
          ],
          terminology: [
            { term: "Joint", definition: "A point where two bones meet, usually allowing movement." },
            { term: "Hinge joint", definition: "A joint that bends and straightens, such as the knee or elbow." },
            { term: "Ball-and-socket joint", definition: "A joint allowing rotation, such as the hip or shoulder." },
            { term: "Ligament", definition: "Tissue connecting bone to bone at a joint." },
            { term: "Cartilage", definition: "Cushioning tissue at the ends of bones." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The hip and shoulder are examples of which joint type?",
              options: ["Hinge", "Ball-and-socket", "Fixed", "Pivot"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Common Skeletal Disorders",
          duration: "13:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency skeletal diagnoses in both languages",
            "Distinguish fracture, osteoporosis, arthritis, and scoliosis",
            "Preserve clinically significant descriptions of bone problems",
          ],
          content: [
            "Skeletal disorders are common across the lifespan. A fracture is a broken bone, ranging from a thin hairline crack to a complete break. Osteoporosis is a loss of bone density that makes bones weak and prone to fracture, common in older adults. Arthritis is inflammation of the joints, causing pain and stiffness. Scoliosis is an abnormal sideways curvature of the spine, often identified in childhood or adolescence.",
            "Vocabulary examples to master here: fracture, osteoporosis, arthritis, and scoliosis. Each carries different implications, so the interpreter must render the exact diagnosis rather than a generic 'bone problem'. Practice scenario: a patient describes falling and says their hip 'gave out and now I can't put any weight on it.' The interpreter conveys the mechanism and the inability to bear weight precisely, because these details guide whether imaging for a fracture is ordered.",
          ],
          terminology: [
            { term: "Fracture", definition: "A break in a bone." },
            { term: "Osteoporosis", definition: "Loss of bone density making bones weak and brittle." },
            { term: "Arthritis", definition: "Inflammation of a joint, causing pain and stiffness." },
            { term: "Scoliosis", definition: "An abnormal sideways curvature of the spine." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Osteoporosis' refers to:",
              options: ["A broken bone", "Loss of bone density making bones weak", "A curved spine", "Joint inflammation"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m4",
      title: "Muscular System",
      lessons: [
        {
          id: "l1",
          title: "Muscle Types",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.d,
          objectives: [
            "Distinguish the three types of muscle tissue",
            "Match each muscle type to its location and control",
            "Interpret muscle-related terminology",
          ],
          content: [
            "There are three types of muscle. Skeletal muscle attaches to bones and produces voluntary movement — the muscles you consciously control to walk or lift. Cardiac muscle forms the heart and contracts involuntarily and rhythmically for a lifetime. Smooth muscle lines organs and blood vessels, working involuntarily to move food through the digestive tract or adjust vessel width. The combining forms for muscle are my/o and muscul/o.",
            "A comparison diagram of the three muscle types accompanies this lesson. Interpreters meet these terms in cardiology (cardiac muscle), rehabilitation (skeletal muscle), and digestive care (smooth muscle). Distinguishing 'voluntary' from 'involuntary' helps convey why a patient can control some movements but not others — for example, why they cannot consciously speed up digestion.",
          ],
          terminology: [
            { term: "Skeletal muscle", definition: "Voluntary muscle attached to bone that produces movement." },
            { term: "Cardiac muscle", definition: "Involuntary muscle of the heart." },
            { term: "Smooth muscle", definition: "Involuntary muscle in organs and blood vessels." },
            { term: "Voluntary / Involuntary", definition: "Under conscious control / not under conscious control." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The heart is made of which muscle type?",
              options: ["Skeletal", "Cardiac", "Smooth", "Voluntary"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Muscle Function",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain how muscles produce movement",
            "Describe contraction, tone, and the muscle-bone connection",
            "Interpret movement instructions precisely",
          ],
          content: [
            "Muscles work by contracting — shortening to pull on the structures they attach to. Skeletal muscles connect to bones by tendons, so when a muscle contracts it moves the bone at a joint. Muscles usually work in pairs: one contracts to bend a joint while its partner relaxes, then they reverse to straighten it. Beyond movement, muscles maintain posture, stabilize joints, and generate heat, which is why shivering warms the body.",
            "Interpreters encounter muscle function most in physical therapy and neurology. Worked example: a therapist instructs the patient to 'contract the muscle, hold for five seconds, then slowly release.' The interpreter renders each action verb and the timing precisely, because an inaccurate instruction can make the exercise ineffective or cause injury. Distinguishing weakness (reduced strength) from paralysis (loss of movement) is also clinically important.",
          ],
          terminology: [
            { term: "Contraction", definition: "The shortening of a muscle to produce force or movement." },
            { term: "Tendon", definition: "Tissue connecting muscle to bone." },
            { term: "Muscle tone", definition: "The continuous, slight tension muscles maintain at rest." },
            { term: "Atrophy", definition: "Wasting or shrinking of muscle from disuse or disease." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Muscles produce movement by:",
              options: ["Growing longer", "Contracting to pull on bones", "Storing calcium", "Producing blood cells"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Common Injuries",
          duration: "13:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency muscular injury terms",
            "Distinguish strain, spasm, and tendonitis",
            "Preserve the mechanism of injury in the rendering",
          ],
          content: [
            "Muscular injuries are common and carry specific meanings. A strain is an injury to a muscle or tendon from overstretching or overuse — distinct from a sprain, which injures a ligament. A spasm is a sudden, involuntary muscle contraction, such as a painful cramp. Tendonitis is inflammation of a tendon, often from repetitive motion, causing pain and tenderness where muscle meets bone.",
            "Vocabulary examples to master here: strain, spasm, and tendonitis. Practice scenario: a patient says they 'lifted a heavy box, felt something pull in the lower back, and now it seizes up when I move.' The interpreter conveys the mechanism (lifting), the sensation (a pull), and the spasm (seizing up) precisely, because these details help the provider distinguish a muscle strain from other causes of back pain and choose the right treatment.",
          ],
          terminology: [
            { term: "Strain", definition: "Injury to a muscle or tendon from overstretching or overuse." },
            { term: "Spasm", definition: "A sudden, involuntary muscle contraction, such as a cramp." },
            { term: "Tendonitis", definition: "Inflammation of a tendon, often from repetitive motion." },
            { term: "Sprain", definition: "Injury to a ligament (contrast with strain)." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A 'strain' is an injury to a:",
              options: ["Ligament", "Muscle or tendon", "Bone", "Joint capsule"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m5",
      title: "Cardiovascular System",
      lessons: [
        {
          id: "l1",
          title: "Heart Anatomy",
          duration: "14:30",
          type: "video",
          completed: false,
          videoUrl: V.e,
          objectives: [
            "Name the chambers, valves, and great vessels of the heart",
            "Describe how blood moves through the heart",
            "Interpret cardiac anatomy in patient-friendly language",
          ],
          content: [
            "The heart is a four-chambered muscular pump. The two upper chambers (atria) receive blood, and the two lower chambers (ventricles) pump it out. Four valves keep blood flowing in one direction. Oxygen-poor blood returns to the right atrium, is pumped by the right ventricle to the lungs to pick up oxygen, returns to the left atrium, and is pumped by the powerful left ventricle out through the aorta to the entire body.",
            "A labeled heart diagram accompanies this lesson. Interpreters meet this anatomy in cardiology visits, echocardiogram explanations, and surgical consent for valve or bypass procedures. When a provider says 'the left ventricle isn't pumping strongly enough', an interpreter who knows that the left ventricle drives blood to the whole body can convey why the patient feels tired and short of breath.",
          ],
          terminology: [
            { term: "Atrium / Ventricle", definition: "Upper receiving chamber / lower pumping chamber of the heart." },
            { term: "Valve", definition: "A structure keeping blood flowing in one direction." },
            { term: "Aorta", definition: "The largest artery, carrying blood from the left ventricle to the body." },
            { term: "Coronary arteries", definition: "Vessels that supply blood to the heart muscle itself." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The heart's main pumping chamber to the body is the:",
              options: ["Right atrium", "Left ventricle", "Right ventricle", "Left atrium"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Blood Circulation",
          duration: "13:40",
          type: "image",
          completed: false,
          objectives: [
            "Distinguish arteries, veins, and capillaries",
            "Trace the flow of blood through the body and lungs",
            "Interpret circulation in explanations of disease",
          ],
          content: [
            "Blood circulates through three vessel types. Arteries carry blood away from the heart, usually oxygen-rich and under high pressure. Veins return blood to the heart, usually oxygen-poor and under lower pressure, with valves to prevent backflow. Capillaries are microscopic vessels where oxygen, nutrients, and waste are actually exchanged between blood and tissue. Circulation has two loops: one to the lungs to pick up oxygen, and one to the rest of the body to deliver it.",
            "A labeled circulation diagram accompanies this lesson. Practice scenario: a cardiologist explains that 'a coronary artery is narrowed, reducing blood flow to the heart muscle, which is why you feel chest pain on exertion.' The interpreter conveys the cause-and-effect chain accurately, helping the patient understand why activity triggers symptoms and why treatment is recommended.",
          ],
          terminology: [
            { term: "Artery", definition: "A vessel carrying blood away from the heart." },
            { term: "Vein", definition: "A vessel carrying blood back to the heart." },
            { term: "Capillary", definition: "A tiny vessel where oxygen and nutrient exchange occurs." },
            { term: "Circulation", definition: "The continuous movement of blood through the heart and vessels." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Arteries carry blood:",
              options: ["Toward the heart", "Away from the heart", "Only in the lungs", "Only in the brain"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Blood Pressure",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain what blood pressure measures",
            "Interpret systolic and diastolic values",
            "Render blood-pressure readings exactly",
          ],
          content: [
            "Blood pressure is the force of blood against the walls of the arteries. It is reported as two numbers: the systolic pressure (the higher number, when the heart contracts) over the diastolic pressure (the lower number, when the heart rests between beats), for example 120 over 80. Blood pressure is measured with a cuff (sphygmomanometer) and is one of the most common vital signs interpreters encounter.",
            "Because the exact numbers guide treatment, the interpreter must render them precisely — never round '150 over 95' to 'about 150'. Worked example: a nurse says 'your pressure is 160 over 100, which is high.' The interpreter conveys both numbers and the assessment exactly. Understanding that the top number reflects the heart's contraction and the bottom its rest helps the interpreter explain the reading clearly if the provider asks them to.",
          ],
          terminology: [
            { term: "Blood pressure", definition: "The force of blood against artery walls." },
            { term: "Systolic", definition: "The higher blood-pressure number, when the heart contracts." },
            { term: "Diastolic", definition: "The lower blood-pressure number, when the heart rests." },
            { term: "Sphygmomanometer", definition: "The cuff device used to measure blood pressure." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In a blood-pressure reading, the systolic number reflects the heart:",
              options: ["Resting between beats", "Contracting", "Filling with blood", "Beating slowly"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Common Disorders",
          duration: "14:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency cardiovascular diagnoses in both languages",
            "Distinguish hypertension, hypotension, arrhythmia, and MI",
            "Convey cardiac symptoms with clinical precision",
          ],
          content: [
            "Cardiovascular disorders are among the most common and highest-stakes an interpreter encounters. Hypertension is high blood pressure; hypotension is low blood pressure — a one-syllable difference that reverses the meaning, so precision is critical. An arrhythmia is an irregular heart rhythm. A myocardial infarction (MI) is a heart attack, the death of heart muscle from blocked blood flow.",
            "Vocabulary examples to master here: hypertension, hypotension, arrhythmia, and myocardial infarction. Worked example: a provider says 'the patient is having an MI.' A weak rendering leaves the letters floating; a competent interpreter conveys 'heart attack' in the target language and, if the patient looks confused, transparently supports the provider's explanation. Always interpret the clinical meaning, never just the abbreviation.",
          ],
          terminology: [
            { term: "Hypertension", definition: "High blood pressure." },
            { term: "Hypotension", definition: "Low blood pressure." },
            { term: "Arrhythmia", definition: "An irregular heartbeat rhythm." },
            { term: "Myocardial infarction (MI)", definition: "Heart attack — death of heart muscle from blocked blood flow." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Hypotension' means:",
              options: ["High blood pressure", "Low blood pressure", "Irregular rhythm", "Chest pain"],
              answer: 1,
              explanation: "hypo- (low) + tension (pressure).",
            },
          ],
        },
      ],
    },
    {
      id: "m6",
      title: "Respiratory System",
      lessons: [
        {
          id: "l1",
          title: "Respiratory Anatomy",
          duration: "13:40",
          type: "video",
          completed: false,
          videoUrl: V.f,
          objectives: [
            "Trace the path of air from the nose to the alveoli",
            "Name the major respiratory structures",
            "Interpret respiratory anatomy accurately",
          ],
          content: [
            "Air enters through the nose and mouth, passes down the pharynx (throat) and larynx (voice box), and travels through the trachea (windpipe). The trachea branches into two bronchi, one per lung, which subdivide into smaller bronchioles ending in tiny air sacs called alveoli. The diaphragm, a dome-shaped muscle beneath the lungs, drives breathing by contracting to pull air in.",
            "A labeled airway diagram accompanies this lesson. Interpreters meet this vocabulary in asthma, pneumonia, and COVID-related care. When a provider distinguishes 'inflammation of the bronchi' (bronchitis) from 'infection in the air sacs' (pneumonia), an interpreter who knows the anatomy can convey exactly where the problem lies, which shapes the patient's understanding of their condition and treatment.",
          ],
          terminology: [
            { term: "Trachea", definition: "The windpipe carrying air to the bronchi." },
            { term: "Bronchi", definition: "The two main airways branching into each lung." },
            { term: "Alveoli", definition: "Tiny air sacs in the lungs where gas exchange occurs." },
            { term: "Diaphragm", definition: "The main breathing muscle beneath the lungs." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Gas exchange in the lungs occurs in the:",
              options: ["Trachea", "Alveoli", "Bronchi", "Diaphragm"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Gas Exchange",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain how oxygen and carbon dioxide are exchanged",
            "Interpret oxygenation vocabulary such as oxygen saturation",
            "Render breathing measurements exactly",
          ],
          content: [
            "Gas exchange is the core job of the respiratory system. In the alveoli, oxygen from inhaled air passes into the blood, and carbon dioxide — a waste product — passes from the blood into the air to be exhaled. The blood then carries oxygen to every cell. Clinicians measure how well this works: oxygen saturation (often 'O2 sat' or SpO2) is the percentage of hemoglobin carrying oxygen, read from a fingertip pulse oximeter, with a normal value around 95 to 100 percent.",
            "When a provider says 'your oxygen saturation is 88 percent', that is a clinically low, meaningful number, and the interpreter must render the figure exactly — never round or generalize a measurement. Terms like hypoxia (low oxygen in the tissues) and hypoxemia (low oxygen in the blood) should be conveyed precisely, as they signal how urgent the situation is and why oxygen therapy may be started.",
          ],
          terminology: [
            { term: "Gas exchange", definition: "The swapping of oxygen and carbon dioxide in the alveoli." },
            { term: "Oxygen saturation (SpO2)", definition: "Percentage of hemoglobin carrying oxygen; normal ~95-100%." },
            { term: "Hypoxia", definition: "Low oxygen levels in the tissues." },
            { term: "Respiratory rate", definition: "The number of breaths per minute." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "During gas exchange, oxygen moves from the alveoli into the:",
              options: ["Stomach", "Blood", "Trachea", "Diaphragm"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Common Respiratory Disorders",
          duration: "14:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency respiratory diagnoses in both languages",
            "Distinguish asthma, COPD, pneumonia, and bronchitis",
            "Preserve patient descriptions of breathing difficulty",
          ],
          content: [
            "Respiratory diseases are common and often urgent. Asthma is a chronic condition causing reversible airway narrowing and wheezing. COPD (chronic obstructive pulmonary disease) is long-term, largely irreversible airflow limitation, often from smoking. Pneumonia is an infection that inflames the alveoli, filling them with fluid. Bronchitis is inflammation of the bronchi.",
            "Vocabulary examples to master here: asthma, COPD, pneumonia, and bronchitis. Each has distinct implications, so the interpreter must render the exact diagnosis rather than a generic 'lung problem'. Practice scenario: a patient says 'I feel like a weight is sitting on my chest and I can't get a full breath.' The interpreter renders the metaphor and the symptom faithfully, because the provider may be distinguishing a respiratory from a cardiac cause. Never flatten a vivid patient description into vague words.",
          ],
          terminology: [
            { term: "Asthma", definition: "Chronic condition causing reversible airway narrowing and wheezing." },
            { term: "COPD", definition: "Chronic obstructive pulmonary disease — long-term airflow limitation." },
            { term: "Pneumonia", definition: "Infection that inflames the air sacs (alveoli) of the lungs." },
            { term: "Bronchitis", definition: "Inflammation of the bronchi." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'COPD' stands for:",
              options: ["Chronic obstructive pulmonary disease", "Cardiac output pressure disorder", "Chronic oxygen pump deficiency", "Central obstructive pain disorder"],
              answer: 0,
            },
          ],
        },
      ],
    },
    {
      id: "m7",
      title: "Digestive System",
      lessons: [
        {
          id: "l1",
          title: "Digestive Anatomy",
          duration: "13:40",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Trace the path of food through the GI tract",
            "Name the digestive organs and accessory organs",
            "Interpret digestive anatomy accurately",
          ],
          content: [
            "The digestive (gastrointestinal, or GI) system runs from mouth to anus. Food passes from the mouth through the esophagus to the stomach, then into the small intestine where most absorption occurs, and finally through the large intestine (colon) to the rectum. Accessory organs — the liver, gallbladder, and pancreas — produce and store fluids that aid digestion. The liver processes nutrients and makes bile; the gallbladder stores bile; the pancreas releases digestive enzymes.",
            "A labeled GI-tract diagram accompanies this lesson. Interpreters use this vocabulary when providers explain acid reflux, ulcers, gallstones, or the purpose of a colonoscopy. When a provider discusses where a problem lies — the stomach, the small bowel, the colon, or the liver — accurate anatomy vocabulary lets the patient follow the explanation.",
          ],
          terminology: [
            { term: "Esophagus", definition: "The tube carrying food from the throat to the stomach." },
            { term: "Small intestine", definition: "Where most nutrient absorption occurs." },
            { term: "Colon (large intestine)", definition: "Absorbs water and forms stool." },
            { term: "Liver / Gallbladder / Pancreas", definition: "Accessory organs that aid digestion." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which organ stores bile that helps digest fat?",
              options: ["Pancreas", "Gallbladder", "Stomach", "Colon"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Nutrient Absorption",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain how digestion breaks food into absorbable nutrients",
            "Describe where and how absorption occurs",
            "Interpret explanations of digestion and malabsorption",
          ],
          content: [
            "Digestion breaks food into small nutrients the body can absorb. Mechanical digestion (chewing and the stomach's churning) and chemical digestion (enzymes and acids) work together to reduce food to sugars, amino acids, and fats. Most absorption happens in the small intestine, whose lining is covered in tiny finger-like projections (villi) that vastly increase surface area. Absorbed nutrients enter the blood and travel to the liver for processing.",
            "Interpreters meet these concepts in nutrition counseling and GI care. When a provider explains that 'the damaged intestinal lining isn't absorbing nutrients well, which is why you're losing weight', an interpreter who understands absorption can convey the cause of the symptom. Rendering the link between the digestive problem and its visible effect helps the patient accept dietary changes or further testing.",
          ],
          terminology: [
            { term: "Digestion", definition: "The breakdown of food into absorbable nutrients." },
            { term: "Enzyme", definition: "A substance that speeds the chemical breakdown of food." },
            { term: "Villi", definition: "Tiny projections in the small intestine that absorb nutrients." },
            { term: "Absorption", definition: "The passage of nutrients from the gut into the blood." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Most nutrient absorption happens in the:",
              options: ["Stomach", "Small intestine", "Esophagus", "Liver"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Common Conditions",
          duration: "13:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency GI diagnoses in both languages",
            "Distinguish GERD, gastritis, ulcer, and hepatitis",
            "Convey GI symptoms without euphemism or distortion",
          ],
          content: [
            "GI complaints are among the most common in primary care. GERD (gastroesophageal reflux disease) is chronic acid reflux, where stomach acid flows back into the esophagus, causing heartburn. Gastritis is inflammation of the stomach lining. An ulcer is an open sore in the lining of the stomach or duodenum. Hepatitis is inflammation of the liver, which can be caused by viruses, alcohol, or other factors.",
            "Vocabulary examples to master here: GERD, gastritis, ulcer, and hepatitis. Practice scenario: a patient reports 'black, tarry stools' — this is melena, a possible sign of upper GI bleeding, and softening it to 'dark stools' could cause the provider to miss its significance. Render frank descriptions frankly; euphemisms can hide red flags in digestive care.",
          ],
          terminology: [
            { term: "GERD", definition: "Gastroesophageal reflux disease — chronic acid reflux causing heartburn." },
            { term: "Gastritis", definition: "Inflammation of the stomach lining." },
            { term: "Ulcer", definition: "An open sore in the lining of the stomach or duodenum." },
            { term: "Hepatitis", definition: "Inflammation of the liver." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'GERD' is best described as:",
              options: ["Inflammation of the liver", "Chronic acid reflux into the esophagus", "A stomach ulcer", "Inflammation of the colon"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m8",
      title: "Nervous System",
      lessons: [
        {
          id: "l1",
          title: "Brain Anatomy",
          duration: "14:10",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Identify the major regions of the brain and their roles",
            "Explain the brain's cross-control of the body",
            "Interpret brain anatomy in stroke and injury contexts",
          ],
          content: [
            "The brain has three major parts. The cerebrum, the largest, governs thought, voluntary movement, sensation, and speech, and is divided into left and right hemispheres. The cerebellum, at the back, controls balance and coordination. The brainstem connects the brain to the spinal cord and controls vital automatic functions such as breathing and heart rate. Importantly, each hemisphere controls the opposite side of the body.",
            "A labeled brain diagram accompanies this lesson. Worked example: a provider explains that 'the stroke affected the left side of the brain, which controls the right side of the body and speech.' Understanding this cross-control helps the interpreter render why the patient's right arm is weak and why speech is affected, supporting the family's understanding of the diagnosis and rehabilitation goals.",
          ],
          terminology: [
            { term: "Cerebrum", definition: "The largest brain part; governs thought, movement, sensation, and speech." },
            { term: "Cerebellum", definition: "Brain region controlling balance and coordination." },
            { term: "Brainstem", definition: "Controls vital functions like breathing and heart rate." },
            { term: "Hemisphere", definition: "One half of the cerebrum; each controls the opposite side of the body." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which brain region controls balance and coordination?",
              options: ["Cerebrum", "Cerebellum", "Brainstem", "Spinal cord"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Spinal Cord",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Describe the spinal cord's structure and role",
            "Explain how it links the brain to the body",
            "Interpret spinal injury descriptions accurately",
          ],
          content: [
            "The spinal cord is a thick bundle of nerves running from the brainstem down through the protective bones of the spine (vertebrae). Together with the brain, it forms the central nervous system. The spinal cord carries messages in both directions: motor signals from the brain to the muscles, and sensory signals from the body back to the brain. It also controls reflexes — rapid, automatic responses that do not wait for the brain.",
            "Interpreters meet this in trauma and neurology. Because the cord is organized by level, an injury higher on the cord affects more of the body. When a provider explains that 'the injury is at the neck level, which affects both the arms and the legs', an interpreter who understands the cord's role can convey why the injury's location determines how much function is lost — critical information for the patient and family.",
          ],
          terminology: [
            { term: "Spinal cord", definition: "The bundle of nerves connecting the brain to the body." },
            { term: "Vertebrae", definition: "The bones of the spine that protect the spinal cord." },
            { term: "Motor signal", definition: "A message from the brain to the muscles to produce movement." },
            { term: "Reflex", definition: "A rapid, automatic response controlled by the spinal cord." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The brain and spinal cord together form the:",
              options: ["Peripheral nervous system", "Central nervous system", "Endocrine system", "Muscular system"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Peripheral Nervous System",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Define the peripheral nervous system and its role",
            "Master high-frequency neurological diagnoses",
            "Render stroke and seizure descriptions with time-critical accuracy",
          ],
          content: [
            "The peripheral nervous system (PNS) is all the nerves outside the brain and spinal cord — the network that carries signals between the central nervous system and the rest of the body. Damage to these nerves is called neuropathy, causing numbness, tingling, pain, or weakness, and is common in diabetes. Interpreters also encounter central nervous system conditions here: a stroke (interrupted blood flow to the brain), a seizure (a sudden burst of abnormal brain electrical activity), epilepsy (a disorder of recurrent seizures), and migraine (a severe recurring headache).",
            "Vocabulary examples to master here: stroke, seizure, migraine, and epilepsy. Worked example: a family member says the patient's face 'drooped on one side about an hour ago and one arm went weak.' Every element — the side, the drooping, the arm weakness, and 'about an hour ago' — is clinically decisive, because onset time can determine stroke treatment eligibility. Do not round or summarize time in neurology; render it exactly as stated.",
          ],
          terminology: [
            { term: "Peripheral nervous system (PNS)", definition: "The nerves outside the brain and spinal cord." },
            { term: "Stroke", definition: "Interrupted blood flow to the brain (cerebrovascular accident)." },
            { term: "Seizure", definition: "A sudden burst of abnormal electrical activity in the brain." },
            { term: "Epilepsy", definition: "A disorder characterized by recurrent seizures." },
            { term: "Migraine", definition: "A severe, often recurring headache." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In neurology interpreting, the time of symptom onset should be:",
              options: ["Rounded for simplicity", "Rendered exactly as stated", "Omitted", "Estimated by the interpreter"],
              answer: 1,
              explanation: "Onset time can determine stroke treatment eligibility.",
            },
          ],
        },
      ],
    },
    {
      id: "m9",
      title: "Endocrine System",
      lessons: [
        {
          id: "l1",
          title: "Hormones",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.c,
          objectives: [
            "Define hormones and how they act as messengers",
            "Explain how the endocrine system regulates the body",
            "Interpret hormone-related vocabulary",
          ],
          content: [
            "Hormones are chemical messengers made by glands and released into the blood, which carries them to distant organs where they produce an effect. Unlike the fast, electrical nervous system, the endocrine system works more slowly and steadily, regulating processes like metabolism, growth, mood, reproduction, and blood sugar. A tiny amount of a hormone can have a large effect, and balance is maintained by feedback — when a hormone's job is done, its release slows.",
            "Interpreters meet hormone vocabulary in diabetes, thyroid, and reproductive care. When a provider explains that 'your thyroid isn't making enough hormone, which is why you feel tired and cold', an interpreter who understands hormones as regulators can convey why a single gland's output affects the whole body's energy and temperature — helping the patient understand their symptoms and treatment.",
          ],
          terminology: [
            { term: "Hormone", definition: "A chemical messenger released by a gland into the blood." },
            { term: "Endocrine system", definition: "The network of glands that release hormones." },
            { term: "Metabolism", definition: "The body processes that hormones help regulate, such as energy use." },
            { term: "Feedback", definition: "The self-regulating control of hormone levels." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Hormones travel through the body via the:",
              options: ["Nerves", "Blood", "Lymph only", "Digestive tract"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Glands",
          duration: "12:50",
          type: "image",
          completed: false,
          objectives: [
            "Identify the major endocrine glands and their hormones",
            "Match each gland to its primary effect",
            "Interpret gland-related terminology",
          ],
          content: [
            "The major endocrine glands each produce specific hormones. The pituitary, at the base of the brain, is the 'master gland' that directs others. The thyroid, in the neck, regulates metabolism. The adrenal glands, atop the kidneys, release stress hormones like adrenaline and cortisol. The pancreas produces insulin to control blood sugar. The ovaries and testes produce reproductive hormones. A single gland problem can ripple through many body functions.",
            "A labeled diagram of the major glands accompanies this lesson. Interpreters render gland names and their effects when providers explain endocrine conditions. When a provider says 'the adrenal glands are producing too much cortisol', an interpreter who knows the adrenal glands' role can convey why the patient has the symptoms being discussed, keeping the explanation coherent for the patient.",
          ],
          terminology: [
            { term: "Pituitary gland", definition: "The 'master gland' at the base of the brain that directs others." },
            { term: "Thyroid gland", definition: "A neck gland that regulates metabolism." },
            { term: "Adrenal glands", definition: "Glands atop the kidneys that release stress hormones." },
            { term: "Pancreas", definition: "A gland that produces insulin to control blood sugar." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which gland regulates the body's metabolism?",
              options: ["Adrenal", "Thyroid", "Pituitary", "Ovary"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Diabetes",
          duration: "14:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain how diabetes disrupts blood-sugar control",
            "Distinguish insulin, glucose, hyperglycemia, and hypoglycemia",
            "Interpret diabetes education safely and precisely",
          ],
          content: [
            "Diabetes is a condition in which the body cannot properly control blood glucose (sugar). Normally, insulin — a hormone from the pancreas — moves glucose from the blood into the cells for energy. In diabetes, the body either does not make enough insulin or cannot use it well, so glucose builds up in the blood. Too much glucose is hyperglycemia; too little is hypoglycemia, which can happen if medication lowers blood sugar too far.",
            "Vocabulary examples to master here: insulin, glucose, hyperglycemia, and hypoglycemia. Diabetes education is one of the most common interpreting assignments, and accuracy directly affects safety. Practice scenario: an educator explains that 'insulin moves sugar from the blood into the cells; without enough insulin, sugar builds up in the blood.' The interpreter conveys this mechanism so the patient understands why they monitor glucose, take medication, and recognize the warning signs of both high and low blood sugar.",
          ],
          terminology: [
            { term: "Insulin", definition: "A hormone from the pancreas that lowers blood sugar." },
            { term: "Glucose", definition: "Sugar in the blood used by cells for energy." },
            { term: "Hyperglycemia", definition: "High blood sugar." },
            { term: "Hypoglycemia", definition: "Low blood sugar." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Hypoglycemia' means:",
              options: ["High blood sugar", "Low blood sugar", "No insulin", "High blood pressure"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m10",
      title: "Reproductive System",
      lessons: [
        {
          id: "l1",
          title: "Male Reproductive System",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Name the major male reproductive structures",
            "Describe their primary functions",
            "Interpret reproductive terminology neutrally and accurately",
          ],
          content: [
            "The male reproductive system produces and delivers sperm and makes the hormone testosterone. Its main structures include the testes (which produce sperm and testosterone), the epididymis and vas deferens (which store and carry sperm), the prostate gland (which contributes fluid to semen), and the penis. The prostate is clinically important because it commonly enlarges with age and is a frequent subject of screening and cancer care.",
            "Interpreters must render anatomical and clinical terms accurately and neutrally, without substituting vague euphemisms that could obscure meaning. When a urologist explains that 'the prostate is enlarged and pressing on the urethra, making it hard to urinate', an interpreter who knows the anatomy conveys the cause-and-effect clearly. Maintaining a calm, matter-of-fact register helps sensitive encounters proceed with dignity.",
          ],
          terminology: [
            { term: "Testes", definition: "Male organs that produce sperm and testosterone." },
            { term: "Prostate gland", definition: "A gland that contributes fluid to semen; commonly enlarges with age." },
            { term: "Testosterone", definition: "The main male reproductive hormone." },
            { term: "Vas deferens", definition: "The tube that carries sperm from the testes." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which structure commonly enlarges with age and can affect urination?",
              options: ["Testes", "Prostate gland", "Vas deferens", "Epididymis"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Female Reproductive System",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Name the major female reproductive structures",
            "Describe the menstrual cycle in plain terms",
            "Interpret reproductive terminology neutrally and accurately",
          ],
          content: [
            "The female reproductive system produces eggs, supports pregnancy, and makes hormones like estrogen and progesterone. Its main structures include the ovaries (which produce eggs and hormones), the fallopian tubes (which carry eggs toward the uterus), the uterus (where a pregnancy develops), the cervix (the opening of the uterus), and the vagina. The menstrual cycle is the monthly process of preparing the uterus for a possible pregnancy, with menstruation being the shedding of the uterine lining when no pregnancy occurs.",
            "Interpreters render these terms accurately and neutrally across dialects and cultures, where vocabulary varies widely and patients may feel embarrassed. When a provider discusses menstruation, contraception, or a Pap smear (a screening of the cervix), the interpreter conveys the clinical meaning precisely and respectfully so the patient can make informed decisions.",
          ],
          terminology: [
            { term: "Ovaries", definition: "Female organs that produce eggs and hormones." },
            { term: "Uterus", definition: "The organ where a pregnancy develops." },
            { term: "Cervix", definition: "The lower opening of the uterus." },
            { term: "Menstruation", definition: "The monthly shedding of the uterine lining." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In which organ does a pregnancy develop?",
              options: ["Ovary", "Uterus", "Cervix", "Fallopian tube"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Pregnancy Terminology",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Master core obstetric vocabulary in both languages",
            "Interpret prenatal terms accurately",
            "Handle sensitive pregnancy topics with a professional register",
          ],
          content: [
            "Obstetric care has its own vocabulary that interpreters must command. Gestation is the period of development from conception to birth, divided into three trimesters of roughly three months each. Prenatal care is the medical care during pregnancy. Clinicians describe a pregnancy history with 'gravida' (number of pregnancies) and 'para' (number of births). A fetus is the developing baby, and labor is the process of childbirth.",
            "Practice scenario: during prenatal counseling, a provider asks about 'gravida and para.' The interpreter conveys the clinical question in plain, respectful language the patient understands, and renders the patient's answer exactly. Pregnancy conversations can include difficult topics such as miscarriage or complications; the interpreter maintains a calm, matter-of-fact register and renders everything faithfully so the patient receives complete, accurate information.",
          ],
          terminology: [
            { term: "Gestation", definition: "The period of development from conception to birth (pregnancy)." },
            { term: "Trimester", definition: "One of three roughly three-month stages of pregnancy." },
            { term: "Prenatal", definition: "Care and events occurring before birth." },
            { term: "Gravida / Para", definition: "Number of pregnancies / number of births." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A 'trimester' is:",
              options: ["A type of prenatal test", "One of three stages of pregnancy", "The moment of birth", "A pregnancy hormone"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m11",
      title: "Urinary System",
      lessons: [
        {
          id: "l1",
          title: "Kidney Function",
          duration: "13:30",
          type: "video",
          completed: false,
          videoUrl: V.d,
          objectives: [
            "Describe the urinary system's structures and role",
            "Explain how the kidneys filter blood",
            "Interpret urinary anatomy and function accurately",
          ],
          content: [
            "The urinary system filters waste and excess water from the blood and removes it as urine. Its main structures are the two kidneys (which filter the blood), the ureters (tubes carrying urine to the bladder), the bladder (which stores urine), and the urethra (through which urine leaves the body). Beyond filtering waste, the kidneys help regulate blood pressure, fluid balance, and the blood's mineral levels — so kidney problems can affect the whole body.",
            "A labeled urinary-system diagram accompanies this lesson. Interpreters meet this vocabulary in nephrology and primary care. When a provider explains that 'your kidneys aren't filtering well, so waste is building up in your blood', an interpreter who understands kidney function can convey why the patient feels unwell and why treatments like dialysis or a change in medication are being considered.",
          ],
          terminology: [
            { term: "Kidneys", definition: "Organs that filter waste and excess water from the blood." },
            { term: "Ureter", definition: "The tube carrying urine from a kidney to the bladder." },
            { term: "Bladder", definition: "The organ that stores urine." },
            { term: "Urethra", definition: "The tube through which urine leaves the body." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The main job of the kidneys is to:",
              options: ["Pump blood", "Filter waste from the blood", "Store bile", "Produce insulin"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Urinary Disorders",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency urinary diagnoses in both languages",
            "Distinguish UTI, kidney stones, and dialysis",
            "Convey urinary symptoms precisely",
          ],
          content: [
            "Urinary disorders are common. A UTI (urinary tract infection) is an infection anywhere in the urinary system, most often the bladder, causing burning with urination, urgency, and frequency. Kidney stones are hard mineral deposits that form in the kidneys and cause severe pain as they pass through the urinary tract. Dialysis is a treatment that artificially filters the blood when the kidneys can no longer do the job adequately.",
            "Vocabulary examples to master here: UTI, kidney stones, and dialysis. Practice scenario: a patient describes 'sharp pain in my side that comes in waves and blood in my urine.' The interpreter conveys the location, the wave-like pattern, and the blood precisely, because these details point the provider toward kidney stones. Rendering urinary symptoms frankly and exactly supports accurate diagnosis.",
          ],
          terminology: [
            { term: "UTI", definition: "Urinary tract infection — infection of the urinary system, often the bladder." },
            { term: "Kidney stones", definition: "Hard mineral deposits that form in the kidneys." },
            { term: "Dialysis", definition: "A treatment that artificially filters the blood when kidneys fail." },
            { term: "Urgency / Frequency", definition: "A strong, sudden need to urinate / needing to urinate often." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Dialysis' is a treatment that:",
              options: ["Removes kidney stones", "Artificially filters the blood when kidneys fail", "Treats a bladder infection", "Measures blood pressure"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m12",
      title: "Final Review",
      lessons: [
        {
          id: "l1",
          title: "Comprehensive Review & Practice Activities",
          duration: "16:00",
          type: "reading",
          completed: false,
          objectives: [
            "Consolidate anatomy and physiology across all body systems",
            "Self-test with practice exercises and interactive activities",
            "Prepare for the final exam",
          ],
          content: [
            "This review pulls the course together. Return to the organizing ideas: the body is built in levels (cell → tissue → organ → system → organism), structure determines function, and homeostasis keeps every system in balance. Then walk each system in turn and recall its core structures, its main function, and the conditions interpreters meet most: cardiovascular (heart, vessels, hypertension, MI), respiratory (alveoli, gas exchange, asthma, COPD), digestive (GI tract, absorption, GERD, hepatitis), nervous (brain, spinal cord, stroke, seizure), endocrine (glands, hormones, diabetes), and urinary (kidneys, UTI, dialysis).",
            "Practice activity — system-to-symptom matching: for each complaint, name the system and the likely vocabulary. 'Chest pain on exertion' → cardiovascular (angina, coronary artery); 'burning with urination' → urinary (UTI); 'face drooping on one side' → nervous (stroke); 'high blood sugar' → endocrine (hyperglycemia, insulin). Then reverse the drill: given a term, place it in its system. Rehearse each set in both your working languages until recall is instant.",
            "Interactive learning activity — teach-back: explain one body system out loud to an imaginary patient in plain language, as if interpreting a provider's overview, then check your explanation against the lesson terminology. Finally, review the professional habits woven through the course — render clinical meaning rather than letters, preserve numbers and onset times exactly, and keep a calm, neutral register for sensitive topics. You are now ready for the final exam, which draws 60 questions from every module. A passing score of 80 percent confirms your readiness and completion awards your course certificate.",
          ],
          terminology: [
            { term: "Levels of organization", definition: "Cell → tissue → organ → system → organism." },
            { term: "Structure-function link", definition: "The principle that a part's shape determines what it does." },
            { term: "Homeostasis", definition: "Maintenance of a stable internal environment." },
            { term: "System-to-symptom matching", definition: "Linking a complaint to its body system and vocabulary." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The complaint 'burning with urination' most likely involves which system?",
              options: ["Respiratory", "Urinary", "Nervous", "Skeletal"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "Anatomy & Physiology for Healthcare Interpreters — Final Exam",
    category: "Medical",
    durationMinutes: 60,
    passingScore: 80,
    questions: [
      { id: "q1", question: "'Anatomy' is the study of the body's:", options: ["Functions", "Structures", "Diseases", "Medications"], answer: 1 },
      { id: "q2", question: "'Physiology' is the study of how body structures:", options: ["Are located", "Function", "Are named", "Are removed"], answer: 1 },
      { id: "q3", question: "The correct order of organization is:", options: ["Organ → cell → tissue → system", "Cell → tissue → organ → system", "System → organ → cell → tissue", "Tissue → cell → system → organ"], answer: 1 },
      { id: "q4", question: "'Homeostasis' is the body's ability to:", options: ["Grow continuously", "Maintain a stable internal environment", "Fight only infection", "Digest food"], answer: 1 },
      { id: "q5", question: "Which system is primarily responsible for circulating blood?", options: ["Respiratory", "Cardiovascular", "Digestive", "Nervous"], answer: 1 },
      { id: "q6", question: "The control center of the cell, containing DNA, is the:", options: ["Membrane", "Nucleus", "Mitochondria", "Cytoplasm"], answer: 1 },
      { id: "q7", question: "The 'powerhouses' of the cell that produce energy are the:", options: ["Nucleus", "Mitochondria", "Membrane", "Villi"], answer: 1 },
      { id: "q8", question: "'Metastasis' means the:", options: ["Death of a cell", "Spread of cancer cells to other parts of the body", "Repair of tissue", "Production of energy"], answer: 1 },
      { id: "q9", question: "Bone, cartilage, fat, and blood are all examples of:", options: ["Epithelial tissue", "Connective tissue", "Muscle tissue", "Nervous tissue"], answer: 1 },
      { id: "q10", question: "An organ is defined as a structure made of:", options: ["A single cell", "Two or more tissue types working together", "Only muscle", "Only bone"], answer: 1 },
      { id: "q11", question: "Blood cells are produced in the bone's:", options: ["Compact layer", "Marrow", "Periosteum", "Cartilage"], answer: 1 },
      { id: "q12", question: "Which is part of the axial skeleton?", options: ["Femur", "Spine", "Wrist", "Ankle"], answer: 1 },
      { id: "q13", question: "The hip and shoulder are examples of which joint type?", options: ["Hinge", "Ball-and-socket", "Fixed", "Pivot"], answer: 1 },
      { id: "q14", question: "A 'fracture' is a:", options: ["Torn ligament", "Broken bone", "Curved spine", "Joint inflammation"], answer: 1 },
      { id: "q15", question: "'Osteoporosis' refers to:", options: ["A broken bone", "Loss of bone density making bones weak", "A curved spine", "Joint inflammation"], answer: 1 },
      { id: "q16", question: "'Scoliosis' is an abnormal:", options: ["Sideways curvature of the spine", "Break in the femur", "Inflammation of a joint", "Loss of bone density"], answer: 0 },
      { id: "q17", question: "The heart is made of which muscle type?", options: ["Skeletal", "Cardiac", "Smooth", "Voluntary"], answer: 1 },
      { id: "q18", question: "Muscles produce movement by:", options: ["Growing longer", "Contracting to pull on bones", "Storing calcium", "Producing blood"], answer: 1 },
      { id: "q19", question: "A 'strain' is an injury to a:", options: ["Ligament", "Muscle or tendon", "Bone", "Joint capsule"], answer: 1 },
      { id: "q20", question: "'Tendonitis' is inflammation of a:", options: ["Ligament", "Tendon", "Bone", "Nerve"], answer: 1 },
      { id: "q21", question: "A 'spasm' is a:", options: ["Broken bone", "Sudden, involuntary muscle contraction", "Torn ligament", "Loss of sensation"], answer: 1 },
      { id: "q22", question: "The heart's main pumping chamber to the body is the:", options: ["Right atrium", "Left ventricle", "Right ventricle", "Left atrium"], answer: 1 },
      { id: "q23", question: "The upper receiving chambers of the heart are the:", options: ["Ventricles", "Atria", "Valves", "Arteries"], answer: 1 },
      { id: "q24", question: "Arteries carry blood:", options: ["Toward the heart", "Away from the heart", "Only in the lungs", "Only in the brain"], answer: 1 },
      { id: "q25", question: "In a blood-pressure reading, the systolic number reflects the heart:", options: ["Resting between beats", "Contracting", "Filling slowly", "Beating irregularly"], answer: 1 },
      { id: "q26", question: "'Hypertension' means:", options: ["Low blood pressure", "High blood pressure", "Irregular rhythm", "Chest pain"], answer: 1 },
      { id: "q27", question: "'Hypotension' means:", options: ["High blood pressure", "Low blood pressure", "Fast heart rate", "Chest pain"], answer: 1 },
      { id: "q28", question: "An 'arrhythmia' is:", options: ["An irregular heartbeat rhythm", "A heart attack", "High blood pressure", "Chest pain"], answer: 0 },
      { id: "q29", question: "'Myocardial infarction' is commonly known as:", options: ["Stroke", "Heart attack", "Seizure", "High blood pressure"], answer: 1 },
      { id: "q30", question: "Gas exchange in the lungs occurs in the:", options: ["Trachea", "Alveoli", "Bronchi", "Diaphragm"], answer: 1 },
      { id: "q31", question: "The main breathing muscle beneath the lungs is the:", options: ["Diaphragm", "Bronchus", "Pleura", "Larynx"], answer: 0 },
      { id: "q32", question: "During gas exchange, oxygen moves from the alveoli into the:", options: ["Stomach", "Blood", "Trachea", "Diaphragm"], answer: 1 },
      { id: "q33", question: "'Oxygen saturation' measures the percentage of:", options: ["Breaths per minute", "Hemoglobin carrying oxygen", "Lung volume", "Carbon dioxide only"], answer: 1 },
      { id: "q34", question: "'COPD' stands for:", options: ["Chronic obstructive pulmonary disease", "Cardiac output pressure disorder", "Chronic oxygen pump deficiency", "Central obstructive pain disorder"], answer: 0 },
      { id: "q35", question: "'Pneumonia' is an infection that inflames the:", options: ["Bronchi only", "Air sacs (alveoli) of the lungs", "Trachea", "Pleura only"], answer: 1 },
      { id: "q36", question: "'Asthma' is best described as:", options: ["A lung infection", "Reversible airway narrowing and wheezing", "Loss of lung tissue", "Inflammation of the pleura"], answer: 1 },
      { id: "q37", question: "Which organ stores bile that helps digest fat?", options: ["Pancreas", "Gallbladder", "Stomach", "Colon"], answer: 1 },
      { id: "q38", question: "Most nutrient absorption happens in the:", options: ["Stomach", "Small intestine", "Esophagus", "Liver"], answer: 1 },
      { id: "q39", question: "'GERD' is best described as:", options: ["Inflammation of the liver", "Chronic acid reflux into the esophagus", "A stomach ulcer", "Inflammation of the colon"], answer: 1 },
      { id: "q40", question: "'Hepatitis' is inflammation of the:", options: ["Stomach", "Liver", "Colon", "Gallbladder"], answer: 1 },
      { id: "q41", question: "An 'ulcer' is:", options: ["A hardened deposit in the gallbladder", "An open sore in the stomach or duodenal lining", "Inflammation of the colon", "Difficulty swallowing"], answer: 1 },
      { id: "q42", question: "Which brain region controls balance and coordination?", options: ["Cerebrum", "Cerebellum", "Brainstem", "Spinal cord"], answer: 1 },
      { id: "q43", question: "The brain and spinal cord together form the:", options: ["Peripheral nervous system", "Central nervous system", "Endocrine system", "Muscular system"], answer: 1 },
      { id: "q44", question: "The nerves outside the brain and spinal cord make up the:", options: ["Central nervous system", "Peripheral nervous system", "Endocrine system", "Lymphatic system"], answer: 1 },
      { id: "q45", question: "A 'stroke' is caused by:", options: ["Interrupted blood flow to the brain", "A broken bone", "A lung infection", "High blood sugar"], answer: 0 },
      { id: "q46", question: "'Epilepsy' is characterized by:", options: ["Recurrent seizures", "Chronic headaches", "Loss of speech", "Muscle weakness"], answer: 0 },
      { id: "q47", question: "A 'migraine' is a:", options: ["Sudden loss of movement", "Severe, often recurring headache", "Type of seizure", "Nerve infection"], answer: 1 },
      { id: "q48", question: "In neurology interpreting, symptom onset time should be:", options: ["Rounded for simplicity", "Rendered exactly as stated", "Omitted", "Estimated"], answer: 1 },
      { id: "q49", question: "Hormones travel through the body via the:", options: ["Nerves", "Blood", "Lymph only", "Digestive tract"], answer: 1 },
      { id: "q50", question: "Which gland regulates the body's metabolism?", options: ["Adrenal", "Thyroid", "Pituitary", "Ovary"], answer: 1 },
      { id: "q51", question: "Insulin, which lowers blood sugar, is produced by the:", options: ["Liver", "Pancreas", "Thyroid", "Kidney"], answer: 1 },
      { id: "q52", question: "'Glucose' is:", options: ["A hormone", "Sugar in the blood used for energy", "A gland", "A digestive enzyme"], answer: 1 },
      { id: "q53", question: "'Hyperglycemia' means:", options: ["Low blood sugar", "High blood sugar", "Low blood pressure", "High heart rate"], answer: 1 },
      { id: "q54", question: "'Hypoglycemia' means:", options: ["High blood sugar", "Low blood sugar", "No insulin", "High blood pressure"], answer: 1 },
      { id: "q55", question: "Which male structure commonly enlarges with age and can affect urination?", options: ["Testes", "Prostate gland", "Vas deferens", "Epididymis"], answer: 1 },
      { id: "q56", question: "In which organ does a pregnancy develop?", options: ["Ovary", "Uterus", "Cervix", "Fallopian tube"], answer: 1 },
      { id: "q57", question: "A 'trimester' is:", options: ["A prenatal test", "One of three stages of pregnancy", "The moment of birth", "A pregnancy hormone"], answer: 1 },
      { id: "q58", question: "The main job of the kidneys is to:", options: ["Pump blood", "Filter waste from the blood", "Store bile", "Produce insulin"], answer: 1 },
      { id: "q59", question: "A 'UTI' is an infection of the:", options: ["Lungs", "Urinary system", "Liver", "Joints"], answer: 1 },
      { id: "q60", question: "'Dialysis' is a treatment that:", options: ["Removes kidney stones", "Artificially filters the blood when kidneys fail", "Treats a bladder infection", "Measures blood pressure"], answer: 1 },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 2. Medical Terminology I
// ─────────────────────────────────────────────────────────────────────────
cchiContent["medical-terminology-i"] = {
  resources: res("MT1"),
  modules: [
    {
      id: "m1",
      title: "Introduction to Medical Terminology",
      lessons: [
        {
          id: "l1",
          title: "What is Medical Terminology?",
          duration: "16:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Explain why medical terminology matters for accurate interpreting",
            "Identify the Greek and Latin origins of most medical terms",
            "Describe the four building blocks: root, prefix, suffix, combining form",
          ],
          content: [
            "Medical terminology is the specialized vocabulary used by healthcare professionals to describe the body, its functions, diseases, procedures, and treatments. Most terms are built from Greek and Latin word parts, which means that once you learn the parts you can decode thousands of words you have never seen before. For a healthcare interpreter, this is not academic trivia — it is the difference between rendering a diagnosis precisely and leaving a patient confused or misinformed.",
            "A single medical term is usually assembled from up to four building blocks: a root (the core meaning, such as cardi = heart), a prefix (added to the front to change meaning, such as brady = slow), a suffix (added to the end to name a condition or procedure, such as -itis = inflammation), and a combining vowel (usually 'o') that joins parts for easier pronunciation. Learning to see these parts turns an intimidating word like 'electrocardiogram' into a readable phrase: electro (electrical) + cardi (heart) + -gram (record).",
            "Definition and example: the word 'gastritis' = gastr (stomach) + -itis (inflammation) = inflammation of the stomach. 'Cardiology' = cardi (heart) + -ology (study of) = the study of the heart. Throughout this course you will practice this decoding method system by system so that unfamiliar terms become solvable rather than frightening.",
          ],
          terminology: [
            { term: "Medical terminology", definition: "The standardized vocabulary used to describe the body, diseases, and treatments." },
            { term: "Greek/Latin origin", definition: "The classical languages from which most medical word parts are derived." },
            { term: "Decoding", definition: "Breaking a term into its parts to determine its meaning." },
            { term: "Combining vowel", definition: "A vowel (usually 'o') that links word parts for pronunciation, as in cardi-o-logy." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Most medical terms are built from word parts derived from:",
              options: ["English and French", "Greek and Latin", "Arabic and Spanish", "German and Italian"],
              answer: 1,
              explanation: "The majority of medical vocabulary comes from Greek and Latin roots.",
            },
          ],
        },
        {
          id: "l2",
          title: "Word Roots",
          duration: "14:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Define what a word root is and the meaning it carries",
            "Recognize high-frequency roots for organs and body parts",
            "Use roots to decode unfamiliar terms",
          ],
          content: [
            "The root is the foundation of a medical term — it carries the term's central meaning, almost always a body part or system. Every medical term has at least one root. For example, in 'nephritis', the root is nephr (kidney); in 'dermatology', the root is dermat (skin). If you know the root, you already know what part of the body the term is about, which is often enough to interpret the gist accurately even before decoding the rest.",
            "Practice activity: read each term and name the root and its meaning — 'hepatomegaly' (hepat = liver), 'osteoarthritis' (oste = bone), 'pulmonary' (pulmon = lung), 'neuralgia' (neur = nerve). Notice how a single root reappears across many words: cardi shows up in cardiology, cardiac, cardiomyopathy, and electrocardiogram. Building a mental list of the most common roots is the highest-value study you can do early in this course.",
          ],
          terminology: [
            { term: "Cardi(o)", definition: "Heart." },
            { term: "Hepat(o)", definition: "Liver." },
            { term: "Nephr(o) / Ren(o)", definition: "Kidney." },
            { term: "Dermat(o) / Derm(o)", definition: "Skin." },
            { term: "Neur(o)", definition: "Nerve or nervous system." },
            { term: "Oste(o)", definition: "Bone." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In the term 'nephritis', the root 'nephr' means:",
              options: ["Liver", "Kidney", "Nerve", "Bone"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Prefixes",
          duration: "13:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain how a prefix changes a term's meaning",
            "Recognize prefixes for direction, number, size, and negation",
            "Distinguish easily confused prefix pairs",
          ],
          content: [
            "A prefix is placed at the beginning of a term to modify the root's meaning — often indicating position, number, size, time, or negation. Not every term has a prefix, but when present it can completely change meaning. 'Hypertension' (hyper = excessive) and 'hypotension' (hypo = deficient) share a root but describe opposite conditions. For an interpreter, misreading a prefix can invert a diagnosis, so prefix accuracy is patient-safety critical.",
            "Examples and practice: brady- (slow) as in bradycardia; tachy- (fast) as in tachycardia; a-/an- (without) as in apnea (without breathing); dys- (difficult/painful) as in dysphagia (difficult swallowing); poly- (many) as in polyuria (frequent urination). A useful drill is to take a single root, such as -pnea (breathing), and cycle prefixes through it: apnea, dyspnea, tachypnea, bradypnea — each a distinct clinical state.",
          ],
          terminology: [
            { term: "Hyper-", definition: "Excessive, above normal." },
            { term: "Hypo-", definition: "Deficient, below normal." },
            { term: "Brady-", definition: "Slow." },
            { term: "Tachy-", definition: "Fast, rapid." },
            { term: "Dys-", definition: "Difficult, painful, or abnormal." },
            { term: "A- / An-", definition: "Without or absence of." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The prefix 'brady-' means:",
              options: ["Fast", "Slow", "Excessive", "Absent"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Suffixes",
          duration: "13:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain how a suffix names a condition, procedure, or specialty",
            "Recognize common diagnostic and surgical suffixes",
            "Combine a suffix with a root to build a full term",
          ],
          content: [
            "A suffix is attached to the end of a term and usually names a condition, disease, procedure, or medical specialty. It tells you what is happening to the body part named by the root. '-itis' means inflammation (appendicitis), '-ectomy' means surgical removal (appendectomy), '-ology' means the study of (cardiology), and '-pathy' means disease (neuropathy). Because suffixes describe the action or state, they are essential to conveying whether a term is a symptom, a diagnosis, or a treatment.",
            "Practice activity: pair the root 'gastr' (stomach) with different suffixes — gastritis (inflammation), gastrectomy (removal), gastroscopy (visual examination), gastralgia (pain). Notice how surgical suffixes (-ectomy, -otomy, -ostomy) are especially important in surgical consent conversations, where the exact procedure must be rendered precisely so the patient understands what they are agreeing to.",
          ],
          terminology: [
            { term: "-itis", definition: "Inflammation." },
            { term: "-ectomy", definition: "Surgical removal or excision." },
            { term: "-ology", definition: "The study of." },
            { term: "-pathy", definition: "Disease or disorder." },
            { term: "-otomy", definition: "Surgical incision (cutting into)." },
            { term: "-ostomy", definition: "Creation of a surgical opening." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The suffix '-ectomy' means:",
              options: ["Inflammation", "Surgical removal", "Study of", "Pain"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Combining Forms",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Define a combining form and the role of the combining vowel",
            "Apply the rule for keeping or dropping the combining vowel",
            "Build multi-part terms smoothly",
          ],
          content: [
            "A combining form is a word root plus a combining vowel, written as root/vowel (for example, cardi/o, gastr/o, oste/o). The combining vowel — nearly always 'o' — makes long terms pronounceable and links roots to other roots or to suffixes. Without it, 'gastroenterology' would be an unpronounceable string of consonants. Recognizing combining forms helps interpreters read and say complex terms confidently.",
            "The rule of thumb: keep the combining vowel when joining a root to a suffix that begins with a consonant (cardi/o + -logy = cardiology), and usually drop it when the suffix begins with a vowel (gastr/o + -itis = gastritis, not gastroitis). When joining two roots, keep the vowel even if the second root starts with a vowel (gastr/o + enter/o = gastroenter-). Practice: build 'oste/o' + 'arthr/o' + '-itis' into osteoarthritis and say it aloud.",
          ],
          terminology: [
            { term: "Combining form", definition: "A word root joined to a combining vowel, e.g., cardi/o." },
            { term: "Combining vowel", definition: "Usually 'o', used to link word parts for easier pronunciation." },
            { term: "Cardi/o", definition: "Combining form for heart." },
            { term: "Gastr/o", definition: "Combining form for stomach." },
            { term: "Oste/o", definition: "Combining form for bone." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The combining vowel is usually dropped when the suffix:",
              options: ["Begins with a consonant", "Begins with a vowel", "Is a surgical suffix", "Names a specialty"],
              answer: 1,
              explanation: "gastr/o + -itis = gastritis (the 'o' is dropped before the vowel).",
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "The Human Body",
      lessons: [
        {
          id: "l1",
          title: "Anatomical Position",
          duration: "12:30",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Describe the standard anatomical position",
            "Explain why a reference position is needed",
            "Use the position to interpret directional descriptions",
          ],
          content: [
            "The anatomical position is the agreed-upon reference posture for describing the body: standing upright, facing forward, arms at the sides, palms turned forward, and feet together. All directional terms (left, right, front, back) are defined relative to this position and relative to the patient's own body — not the observer's. This matters in interpreting: when a provider says a wound is on the patient's 'right', it is the patient's right, and the interpreter must preserve that orientation exactly.",
            "Because everyone in healthcare uses the same reference position, descriptions of location stay consistent across providers, shifts, and facilities. When you interpret a physical exam or a description of where pain is located, keeping the anatomical frame straight prevents dangerous left/right or front/back errors — for example, in marking a surgical site.",
          ],
          terminology: [
            { term: "Anatomical position", definition: "Standing erect, facing forward, arms at sides, palms forward." },
            { term: "Patient's right/left", definition: "Direction defined from the patient's perspective, not the viewer's." },
            { term: "Reference position", definition: "A standard posture that keeps directional terms consistent." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a provider says a lesion is on the 'right', it refers to:",
              options: ["The observer's right", "The patient's right", "Either side", "The dominant hand"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Body Directions",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Define the principal directional terms in pairs",
            "Interpret descriptions of location on the body accurately",
            "Avoid reversing paired directional terms",
          ],
          content: [
            "Directional terms describe where one structure is relative to another, and they come in opposing pairs. Superior means toward the head; inferior means toward the feet. Anterior (ventral) means toward the front; posterior (dorsal) means toward the back. Medial means toward the midline; lateral means away from it. Proximal means nearer the point of attachment; distal means farther from it. Superficial means near the surface; deep means farther inside.",
            "Vocabulary table in use: 'the pain is in the lateral aspect of the distal forearm' means the outer side of the forearm, nearer the wrist. Interpreters should render these precisely rather than substituting vague words like 'lower' or 'outer', because the provider is often mapping a specific anatomical location. Practice by translating each pair and describing the location of a landmark such as the elbow (proximal to the wrist, distal to the shoulder).",
          ],
          terminology: [
            { term: "Superior / Inferior", definition: "Toward the head / toward the feet." },
            { term: "Anterior / Posterior", definition: "Toward the front / toward the back." },
            { term: "Medial / Lateral", definition: "Toward the midline / away from the midline." },
            { term: "Proximal / Distal", definition: "Nearer to / farther from the point of attachment." },
            { term: "Superficial / Deep", definition: "Near the surface / farther inside the body." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Distal' means:",
              options: ["Nearer the point of attachment", "Farther from the point of attachment", "Toward the head", "Toward the midline"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Body Cavities",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Name the major body cavities and their contents",
            "Locate organs by the cavity that houses them",
            "Interpret references to cavities during exams and imaging",
          ],
          content: [
            "The body's organs are housed in spaces called cavities. The two main groups are the dorsal cavity (containing the cranial cavity for the brain and the spinal cavity for the spinal cord) and the larger ventral cavity. The ventral cavity divides into the thoracic cavity (heart and lungs), the abdominal cavity (stomach, intestines, liver, and more), and the pelvic cavity (bladder and reproductive organs). The diaphragm separates the thoracic from the abdominal cavity.",
            "Knowing cavities helps an interpreter place a finding: 'a mass in the thoracic cavity' involves the chest, while 'abdominal cavity' involves the belly. During imaging discussions (CT of the abdomen and pelvis, chest X-ray) the cavity named tells the patient which region is being examined. Rendering the cavity accurately keeps the patient oriented to what part of the body the conversation concerns.",
          ],
          terminology: [
            { term: "Cranial cavity", definition: "Space housing the brain." },
            { term: "Thoracic cavity", definition: "Chest space containing the heart and lungs." },
            { term: "Abdominal cavity", definition: "Space containing the stomach, intestines, liver, and other organs." },
            { term: "Pelvic cavity", definition: "Space containing the bladder and reproductive organs." },
            { term: "Diaphragm", definition: "Muscle separating the thoracic and abdominal cavities." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The heart and lungs are located in the:",
              options: ["Abdominal cavity", "Thoracic cavity", "Pelvic cavity", "Cranial cavity"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Body Regions",
          duration: "12:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Identify the major surface regions of the body",
            "Use the abdominal quadrants to localize symptoms",
            "Interpret regional descriptions during a history and exam",
          ],
          content: [
            "Beyond cavities, clinicians describe surface regions to localize symptoms. The abdomen is commonly divided into four quadrants — right upper quadrant (RUQ), left upper quadrant (LUQ), right lower quadrant (RLQ), and left lower quadrant (LLQ) — each associated with particular organs. Appendicitis pain, for example, classically settles in the RLQ, while gallbladder pain is often in the RUQ. Other regional terms include thoracic (chest), lumbar (lower back), and cervical (neck).",
            "Vocabulary table in use: 'sharp RLQ pain' points toward the appendix region; 'LUQ tenderness' may involve the spleen or stomach. When a patient localizes pain, render the region precisely, including the quadrant if the provider uses one, so the clinical reasoning is preserved. Practice mapping common complaints to their regions.",
          ],
          terminology: [
            { term: "RUQ / LUQ", definition: "Right and left upper quadrants of the abdomen." },
            { term: "RLQ / LLQ", definition: "Right and left lower quadrants of the abdomen." },
            { term: "Thoracic region", definition: "The chest area." },
            { term: "Lumbar region", definition: "The lower back area." },
            { term: "Cervical region", definition: "The neck area." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Classic appendicitis pain localizes to the:",
              options: ["RUQ", "LUQ", "RLQ", "LLQ"],
              answer: 2,
            },
          ],
        },
        {
          id: "l5",
          title: "Major Organ Systems",
          duration: "15:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Name the major organ systems and their primary functions",
            "Match common complaints to the relevant system",
            "Prepare for the system-by-system vocabulary that follows",
          ],
          content: [
            "The body is organized into interacting organ systems, each with a core function: cardiovascular (circulates blood), respiratory (exchanges oxygen and carbon dioxide), digestive/gastrointestinal (processes food and absorbs nutrients), musculoskeletal (supports and moves the body), nervous (controls sensation, movement, and cognition), endocrine (hormonal regulation), urinary (filters and removes waste), reproductive, integumentary (skin), and immune/lymphatic (defense).",
            "Interpreters do not need a physician's depth in any one system, but they must command the core vocabulary of each in both languages so a symptom or diagnosis is never lost. Being able to match a complaint to a system also helps you anticipate the terminology likely to arise: chest pain suggests cardiovascular or respiratory terms; heartburn suggests digestive terms. The next modules build each system's vocabulary in turn.",
          ],
          terminology: [
            { term: "Cardiovascular system", definition: "Heart and blood vessels; circulates blood." },
            { term: "Respiratory system", definition: "Airways and lungs; exchanges oxygen and carbon dioxide." },
            { term: "Digestive system", definition: "Gastrointestinal tract; processes food and absorbs nutrients." },
            { term: "Musculoskeletal system", definition: "Bones, muscles, and joints; supports and moves the body." },
            { term: "Nervous system", definition: "Brain, spinal cord, and nerves; controls sensation and movement." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which system is responsible for exchanging oxygen and carbon dioxide?",
              options: ["Digestive", "Respiratory", "Urinary", "Endocrine"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m3",
      title: "Cardiovascular System",
      lessons: [
        {
          id: "l1",
          title: "Heart Anatomy",
          duration: "15:00",
          type: "video",
          completed: false,
          videoUrl: V.c,
          objectives: [
            "Name the chambers, valves, and great vessels of the heart",
            "Describe the path of blood through the heart",
            "Use anatomical vocabulary in cardiac discussions",
          ],
          content: [
            "The heart is a four-chambered muscular pump: two upper chambers (the right and left atria) receive blood, and two lower chambers (the right and left ventricles) pump it out. Four valves keep blood moving in one direction — the tricuspid, pulmonary, mitral, and aortic valves. Oxygen-poor blood returns to the right atrium, is pumped by the right ventricle to the lungs, returns oxygen-rich to the left atrium, and is pumped by the powerful left ventricle out through the aorta to the body.",
            "Interpreters meet this anatomy in cardiology visits, echocardiogram explanations, and pre-surgical consent for valve or bypass procedures. Rendering 'left ventricle', 'mitral valve', or 'aorta' accurately lets the patient follow explanations of their own condition. A visual diagram of the heart's chambers and valves is a helpful study aid for anchoring these terms in both languages.",
          ],
          terminology: [
            { term: "Atrium (atria)", definition: "Upper receiving chamber(s) of the heart." },
            { term: "Ventricle", definition: "Lower pumping chamber of the heart." },
            { term: "Valve", definition: "Structure that keeps blood flowing in one direction." },
            { term: "Aorta", definition: "The largest artery, carrying blood from the left ventricle to the body." },
            { term: "Myocardium", definition: "The muscular wall of the heart." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The heart's main pumping chamber to the body is the:",
              options: ["Right atrium", "Left ventricle", "Right ventricle", "Left atrium"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Blood Vessels",
          duration: "13:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Distinguish arteries, veins, and capillaries by function",
            "Recognize vessel-related vocabulary",
            "Interpret descriptions of circulation and blood flow",
          ],
          content: [
            "Blood travels through three types of vessels. Arteries carry blood away from the heart, usually oxygen-rich and under high pressure. Veins return blood toward the heart, usually oxygen-poor and under lower pressure, and contain valves to prevent backflow. Capillaries are microscopic vessels where the actual exchange of oxygen, nutrients, and waste occurs between blood and tissue. The combining form for vessel is vas/o or angi/o.",
            "This vocabulary appears in discussions of blood pressure, blockages, and procedures. 'Atherosclerosis' is the buildup of plaque narrowing arteries; 'thrombus' is a clot; 'embolus' is a clot or plug that travels and lodges elsewhere. When a provider explains a blocked coronary artery, the interpreter must convey artery, blockage, and consequence precisely, because these terms often precede urgent decisions.",
          ],
          terminology: [
            { term: "Artery", definition: "Vessel carrying blood away from the heart." },
            { term: "Vein", definition: "Vessel returning blood toward the heart." },
            { term: "Capillary", definition: "Tiny vessel where oxygen and nutrient exchange occurs." },
            { term: "Atherosclerosis", definition: "Plaque buildup that narrows and hardens arteries." },
            { term: "Thrombus / Embolus", definition: "A stationary clot / a clot or plug that travels and lodges elsewhere." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Arteries generally carry blood:",
              options: ["Toward the heart", "Away from the heart", "Only in the lungs", "Only to the brain"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Common Conditions",
          duration: "15:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency cardiovascular diagnoses in both languages",
            "Distinguish easily confused terms (hypertension vs. hypotension)",
            "Convey cardiac symptoms with clinical precision",
          ],
          content: [
            "Cardiovascular conditions are among the most common and highest-stakes an interpreter encounters. Hypertension is high blood pressure; hypotension is low blood pressure — a one-syllable difference that reverses the meaning. A myocardial infarction (MI) is a heart attack, the death of heart muscle from blocked blood flow. Angina is chest pain from reduced blood flow to the heart, and an arrhythmia is an irregular heart rhythm.",
            "Worked example: a provider says 'the patient has an MI.' A weak rendering leaves the letters 'MI' floating; a competent interpreter conveys 'heart attack' in the target language and, if the patient looks confused, transparently supports the provider's explanation. Vocabulary examples to master here: hypertension, hypotension, myocardial infarction, angina, and arrhythmia. Always interpret the clinical meaning, never just the abbreviation.",
          ],
          terminology: [
            { term: "Hypertension", definition: "High blood pressure." },
            { term: "Hypotension", definition: "Low blood pressure." },
            { term: "Myocardial infarction (MI)", definition: "Heart attack — death of heart muscle from blocked blood flow." },
            { term: "Angina", definition: "Chest pain from reduced blood flow to the heart." },
            { term: "Arrhythmia", definition: "Irregular heartbeat rhythm." },
            { term: "Tachycardia / Bradycardia", definition: "Fast heart rate / slow heart rate." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Hypotension' means:",
              options: ["High blood pressure", "Low blood pressure", "Irregular rhythm", "Chest pain"],
              answer: 1,
              explanation: "hypo- (low) + tension (pressure).",
            },
          ],
        },
        {
          id: "l4",
          title: "Diagnostic Tests",
          duration: "13:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Recognize common cardiac diagnostic tests",
            "Explain in plain language what each test measures",
            "Interpret test instructions and results accurately",
          ],
          content: [
            "Several tests assess the heart, and interpreters must render both the test names and the instructions patients receive. An electrocardiogram (ECG or EKG) records the heart's electrical activity through skin electrodes. An echocardiogram uses ultrasound to image the heart's structure and pumping. A stress test measures heart function during exertion, and cardiac catheterization threads a thin tube into the heart's vessels to check for blockages.",
            "The word parts help: electr/o (electrical) + cardi/o (heart) + -gram (record) = electrocardiogram. When a provider orders 'an echo', the interpreter renders 'echocardiogram — an ultrasound of your heart' so the patient understands. Rendering the purpose alongside the name (what the test looks at and what it will involve) supports informed consent and reduces patient anxiety.",
          ],
          terminology: [
            { term: "Electrocardiogram (ECG/EKG)", definition: "A recording of the heart's electrical activity." },
            { term: "Echocardiogram", definition: "An ultrasound image of the heart's structure and function." },
            { term: "Stress test", definition: "A test of heart function during physical exertion." },
            { term: "Cardiac catheterization", definition: "Threading a catheter into heart vessels to check for blockages." },
            { term: "-gram / -graphy", definition: "A record or image / the process of recording." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An 'electrocardiogram' records the heart's:",
              options: ["Blood pressure", "Electrical activity", "Oxygen level", "Cholesterol"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Procedures",
          duration: "13:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Recognize common cardiac procedures and their purposes",
            "Render surgical terms precisely for consent conversations",
            "Distinguish related procedure names",
          ],
          content: [
            "Cardiac procedures range from minimally invasive to open surgery, and precise rendering is essential during consent. Angioplasty widens a narrowed artery, often with a balloon; a stent is a small mesh tube placed to keep the artery open. Coronary artery bypass graft (CABG, said as 'cabbage') reroutes blood around blocked arteries. A pacemaker is an implanted device that regulates heart rhythm.",
            "Because these procedures carry risks and alternatives, the interpreter must render every element of the explanation faithfully — what will be done, why, and what the risks are — without simplifying away important detail. Vocabulary such as angioplasty, stent, bypass, and pacemaker should be automatic in both languages so the patient can give truly informed consent.",
          ],
          terminology: [
            { term: "Angioplasty", definition: "A procedure to widen a narrowed or blocked artery." },
            { term: "Stent", definition: "A mesh tube placed to hold an artery open." },
            { term: "Coronary artery bypass graft (CABG)", definition: "Surgery that reroutes blood around blocked coronary arteries." },
            { term: "Pacemaker", definition: "An implanted device that regulates the heart's rhythm." },
            { term: "-plasty", definition: "Surgical repair or reshaping." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A 'stent' is used to:",
              options: ["Record heart rhythm", "Hold a narrowed artery open", "Measure blood pressure", "Replace a valve"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m4",
      title: "Respiratory System",
      lessons: [
        {
          id: "l1",
          title: "Respiratory Anatomy",
          duration: "14:00",
          type: "video",
          completed: false,
          videoUrl: V.d,
          objectives: [
            "Trace the path of air from the nose to the alveoli",
            "Name the major respiratory structures",
            "Use respiratory anatomy vocabulary accurately",
          ],
          content: [
            "Air enters through the nose and mouth, passes down the pharynx (throat) and larynx (voice box), and travels through the trachea (windpipe). The trachea branches into two bronchi, one for each lung, which subdivide into smaller bronchioles ending in tiny air sacs called alveoli. It is in the alveoli that oxygen enters the blood and carbon dioxide leaves it. The diaphragm and chest muscles drive breathing.",
            "The combining forms are worth memorizing: pulmon/o and pneum/o (lung), bronch/o (bronchus), and trache/o (trachea). When a provider explains where a problem lies — 'inflammation of the bronchi' (bronchitis) versus 'infection in the alveoli' (pneumonia) — the interpreter's accurate anatomy vocabulary lets the patient understand the location and nature of their condition. A labeled diagram of the airway is a useful study aid.",
          ],
          terminology: [
            { term: "Trachea", definition: "The windpipe, carrying air to the bronchi." },
            { term: "Bronchi / Bronchioles", definition: "Airway branches leading into the lungs." },
            { term: "Alveoli", definition: "Tiny air sacs where gas exchange occurs." },
            { term: "Larynx / Pharynx", definition: "Voice box / throat." },
            { term: "Pulmon/o, Pneum/o", definition: "Combining forms for lung." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Gas exchange in the lungs occurs in the:",
              options: ["Trachea", "Bronchi", "Alveoli", "Larynx"],
              answer: 2,
            },
          ],
        },
        {
          id: "l2",
          title: "Lung Function",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain the basics of ventilation and gas exchange",
            "Interpret oxygenation vocabulary such as oxygen saturation",
            "Render breathing measurements accurately",
          ],
          content: [
            "Lung function has two parts: ventilation (moving air in and out) and gas exchange (oxygen into the blood, carbon dioxide out). Clinicians measure how well this works with values interpreters frequently encounter. Oxygen saturation (often 'O2 sat' or SpO2) is the percentage of hemoglobin carrying oxygen, read from a fingertip pulse oximeter; a normal value is roughly 95 to 100 percent. Respiratory rate is the number of breaths per minute.",
            "When a provider says 'your oxygen saturation is 88 percent', that is a clinically low, meaningful number, and the interpreter must render the figure exactly — never round or generalize a measurement. Similarly, terms like hypoxia (low oxygen in tissues) and hypoxemia (low oxygen in the blood) should be conveyed precisely, as they signal how urgent the situation is.",
          ],
          terminology: [
            { term: "Ventilation", definition: "The movement of air into and out of the lungs." },
            { term: "Oxygen saturation (SpO2)", definition: "Percentage of hemoglobin carrying oxygen; normal ~95-100%." },
            { term: "Respiratory rate", definition: "Number of breaths per minute." },
            { term: "Hypoxia", definition: "Low oxygen level in body tissues." },
            { term: "Hypoxemia", definition: "Low oxygen level in the blood." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Oxygen saturation' measures:",
              options: ["Breaths per minute", "Percentage of hemoglobin carrying oxygen", "Lung size", "Carbon dioxide only"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Common Diseases",
          duration: "14:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency respiratory diagnoses in both languages",
            "Distinguish asthma, COPD, pneumonia, and bronchitis",
            "Preserve patient descriptions of breathing difficulty",
          ],
          content: [
            "Respiratory diseases are common and often urgent. Asthma is a chronic condition causing reversible airway narrowing and wheezing. COPD (chronic obstructive pulmonary disease) is long-term, largely irreversible airflow limitation, often from smoking. Pneumonia is an infection inflaming the alveoli. Bronchitis is inflammation of the bronchi. Each has distinct implications, so the interpreter must render the exact diagnosis rather than a generic 'lung problem'.",
            "Practice scenario: a patient says 'I feel like a weight is sitting on my chest and I can't get a full breath.' Render the metaphor and the symptom faithfully — the provider may be distinguishing a cardiac from a respiratory cause. Vocabulary examples to master here: asthma, COPD, pneumonia, bronchitis, and oxygen saturation. Never flatten a vivid patient description into vague words.",
          ],
          terminology: [
            { term: "Asthma", definition: "Chronic condition causing reversible airway narrowing and wheezing." },
            { term: "COPD", definition: "Chronic obstructive pulmonary disease — long-term airflow limitation." },
            { term: "Pneumonia", definition: "Infection that inflames the air sacs (alveoli) of the lungs." },
            { term: "Bronchitis", definition: "Inflammation of the bronchi." },
            { term: "Dyspnea", definition: "Shortness of breath or difficulty breathing." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'COPD' stands for:",
              options: ["Chronic obstructive pulmonary disease", "Cardiac output pressure disorder", "Chronic oxygen pump deficiency", "Central obstructive pain disorder"],
              answer: 0,
            },
          ],
        },
        {
          id: "l4",
          title: "Diagnostic Procedures",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Recognize common respiratory diagnostic procedures",
            "Explain each procedure's purpose in plain language",
            "Render test instructions accurately",
          ],
          content: [
            "Several tests evaluate the lungs. A chest X-ray images the lungs and chest structures. A pulmonary function test (PFT) or spirometry measures how much and how fast a person can breathe out. A CT scan of the chest gives detailed cross-sectional images. Bronchoscopy uses a thin scope to look inside the airways, and arterial blood gas (ABG) measures oxygen and carbon dioxide levels in the blood.",
            "Interpreters render both the name and the instruction: for spirometry, the patient is told to 'take a deep breath and blow out as hard and fast as you can', and that coaching must be conveyed clearly for the test to work. Word parts help again: bronch/o (bronchus) + -scopy (visual examination) = bronchoscopy. Rendering purpose and instruction together keeps the patient oriented and cooperative.",
          ],
          terminology: [
            { term: "Chest X-ray", definition: "An image of the lungs and chest structures." },
            { term: "Spirometry / PFT", definition: "Test measuring how much and how fast air is exhaled." },
            { term: "Bronchoscopy", definition: "Using a scope to examine the inside of the airways." },
            { term: "Arterial blood gas (ABG)", definition: "Blood test measuring oxygen and carbon dioxide levels." },
            { term: "-scopy", definition: "Visual examination with a scope." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Bronchoscopy' means:",
              options: ["Imaging with X-ray", "Visual examination of the airways with a scope", "Measuring blood gases", "Removing a lung"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m5",
      title: "Digestive System",
      lessons: [
        {
          id: "l1",
          title: "Digestive Anatomy",
          duration: "14:10",
          type: "video",
          completed: false,
          videoUrl: V.e,
          objectives: [
            "Trace the path of food through the gastrointestinal tract",
            "Name the digestive organs and accessory organs",
            "Use gastrointestinal vocabulary accurately",
          ],
          content: [
            "The digestive (gastrointestinal, or GI) system runs from mouth to anus and breaks food down for absorption. Food passes from the mouth through the esophagus to the stomach, then into the small intestine (duodenum, jejunum, ileum) where most absorption occurs, and finally through the large intestine (colon) to the rectum. Accessory organs — the liver, gallbladder, and pancreas — produce and store substances that aid digestion.",
            "Key combining forms include gastr/o (stomach), enter/o (intestine), hepat/o (liver), and col/o (colon). When a provider discusses where a problem lies — the stomach, the small bowel, the colon, or the liver — accurate anatomy vocabulary lets the patient follow the explanation. A labeled diagram of the GI tract is a helpful study aid for anchoring these terms in both languages.",
          ],
          terminology: [
            { term: "Esophagus", definition: "The tube carrying food from the throat to the stomach." },
            { term: "Stomach", definition: "Organ where food is mixed with digestive juices; root gastr/o." },
            { term: "Small intestine", definition: "Where most nutrient absorption occurs; root enter/o." },
            { term: "Colon (large intestine)", definition: "Absorbs water and forms stool; root col/o." },
            { term: "Liver / Gallbladder / Pancreas", definition: "Accessory organs aiding digestion." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Most nutrient absorption occurs in the:",
              options: ["Stomach", "Small intestine", "Colon", "Esophagus"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Common Conditions",
          duration: "14:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency GI diagnoses in both languages",
            "Convey GI symptoms without euphemism or distortion",
            "Preserve clinically significant descriptions",
          ],
          content: [
            "GI complaints are among the most common in primary care, and patients often describe them with informal or culturally specific words. The interpreter conveys clinical meaning precisely: nausea, emesis (vomiting), diarrhea, and constipation. Gastritis is inflammation of the stomach; an ulcer is an open sore in the stomach or duodenal lining; hepatitis is inflammation of the liver; gallstones are hardened deposits in the gallbladder.",
            "Worked example: a patient reports 'black, tarry stools' — this is melena, a possible sign of upper GI bleeding, and softening it to 'dark stools' could cause the provider to miss its significance. Vocabulary examples to master here: gastritis, ulcer, colonoscopy, hepatitis, and gallstones. Render frank descriptions frankly; euphemisms can hide red flags.",
          ],
          terminology: [
            { term: "Gastritis", definition: "Inflammation of the stomach lining." },
            { term: "Ulcer", definition: "An open sore in the lining of the stomach or duodenum." },
            { term: "Hepatitis", definition: "Inflammation of the liver." },
            { term: "Gallstones", definition: "Hardened deposits that form in the gallbladder." },
            { term: "Melena", definition: "Black, tarry stool suggesting upper GI bleeding." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Hepatitis' is inflammation of the:",
              options: ["Stomach", "Liver", "Colon", "Gallbladder"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Procedures",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Recognize common GI procedures and their purposes",
            "Render preparation instructions accurately",
            "Distinguish endoscopy from colonoscopy",
          ],
          content: [
            "Common GI procedures let clinicians look inside the tract or take samples. An endoscopy (esophagogastroduodenoscopy, or EGD) uses a scope through the mouth to examine the esophagus, stomach, and duodenum. A colonoscopy uses a scope through the rectum to examine the colon. A biopsy takes a small tissue sample for analysis. These procedures often require preparation the interpreter must render clearly.",
            "For a colonoscopy, the patient must follow bowel-prep instructions and typically be NPO (nothing by mouth) beforehand — instructions that directly affect whether the procedure can proceed. Word parts: col/o (colon) + -scopy (visual examination) = colonoscopy. Rendering both the procedure and its preparation precisely protects patient safety and prevents cancelled appointments.",
          ],
          terminology: [
            { term: "Endoscopy (EGD)", definition: "Scope examination of the upper GI tract through the mouth." },
            { term: "Colonoscopy", definition: "Scope examination of the colon through the rectum." },
            { term: "Biopsy", definition: "Removal of a small tissue sample for analysis." },
            { term: "NPO", definition: "Nothing by mouth (no food or drink)." },
            { term: "Bowel prep", definition: "Cleansing of the colon before a colonoscopy." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A 'colonoscopy' examines the:",
              options: ["Stomach", "Colon", "Esophagus", "Liver"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m6",
      title: "Musculoskeletal System",
      lessons: [
        {
          id: "l1",
          title: "Bones",
          duration: "13:30",
          type: "video",
          completed: false,
          videoUrl: V.f,
          objectives: [
            "Recognize the functions of the skeletal system",
            "Use bone-related combining forms",
            "Interpret descriptions involving specific bones",
          ],
          content: [
            "The skeletal system provides structure, protects organs, stores minerals, and produces blood cells in the marrow. Bones interpreters commonly hear named include the femur (thigh bone), tibia and fibula (lower leg), humerus (upper arm), radius and ulna (forearm), vertebrae (spine), and clavicle (collarbone). The combining form for bone is oste/o, and for bone marrow, myel/o.",
            "In orthopedic and injury care, the exact bone named guides imaging and treatment. When a patient says 'I broke the bone in my thigh', rendering 'femur' if the provider uses it, or preserving 'thigh bone' if the patient does, keeps the anatomical reference accurate. Osteoporosis (oste/o + por/o + -osis) is a condition of weak, brittle bones from loss of density — a frequent topic in older-adult care.",
          ],
          terminology: [
            { term: "Oste/o", definition: "Combining form for bone." },
            { term: "Femur", definition: "The thigh bone." },
            { term: "Humerus", definition: "The upper arm bone." },
            { term: "Vertebrae", definition: "The bones of the spinal column." },
            { term: "Osteoporosis", definition: "Weak, brittle bones from loss of density." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The combining form 'oste/o' refers to:",
              options: ["Muscle", "Bone", "Joint", "Nerve"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Muscles",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Distinguish the main types of muscle tissue",
            "Use muscle-related combining forms",
            "Interpret descriptions of muscle symptoms",
          ],
          content: [
            "Muscles produce movement and maintain posture. There are three types: skeletal muscle (voluntary, moving bones), cardiac muscle (the heart), and smooth muscle (involuntary, in organs and vessels). The combining forms are my/o and muscul/o. Muscles connect to bones by tendons, and interpreters frequently encounter complaints of muscle pain (myalgia), weakness, cramps, and spasms.",
            "A strain is an injury to a muscle or tendon, distinct from a sprain (ligament injury) — a distinction that affects treatment, so interpreters must keep the terms straight. When a patient describes a pulled muscle, a cramp, or weakness, rendering the specific symptom and its location precisely helps the provider localize the problem. Myalgia (my/o + -algia) simply means muscle pain.",
          ],
          terminology: [
            { term: "My/o, Muscul/o", definition: "Combining forms for muscle." },
            { term: "Skeletal muscle", definition: "Voluntary muscle that moves bones." },
            { term: "Smooth muscle", definition: "Involuntary muscle in organs and vessels." },
            { term: "Myalgia", definition: "Muscle pain." },
            { term: "Strain", definition: "Injury to a muscle or tendon." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Myalgia' means:",
              options: ["Muscle pain", "Bone pain", "Joint stiffness", "Nerve damage"],
              answer: 0,
            },
          ],
        },
        {
          id: "l3",
          title: "Joints",
          duration: "12:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Define what a joint is and name common joint structures",
            "Use joint-related combining forms",
            "Interpret descriptions of joint problems",
          ],
          content: [
            "A joint is where two bones meet, allowing movement. Joints are supported by ligaments (which connect bone to bone) and cushioned by cartilage. The combining form for joint is arthr/o. Common joints in clinical conversation include the knee, hip, shoulder, and the small joints of the hands. Range of motion — how far a joint can move — is a phrase interpreters hear often in exams and physical therapy.",
            "A sprain injures a ligament, and arthritis (arthr/o + -itis) is inflammation of a joint. Arthroscopy (arthr/o + -scopy) is a scope procedure to look inside a joint. When a patient describes a joint that is swollen, stiff, or cannot move fully, rendering both the joint named and the character of the problem accurately supports the provider's assessment and treatment plan.",
          ],
          terminology: [
            { term: "Arthr/o", definition: "Combining form for joint." },
            { term: "Ligament", definition: "Tissue connecting bone to bone at a joint." },
            { term: "Cartilage", definition: "Cushioning tissue at the ends of bones." },
            { term: "Arthritis", definition: "Inflammation of a joint." },
            { term: "Range of motion", definition: "The extent to which a joint can move." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A ligament connects:",
              options: ["Muscle to bone", "Bone to bone", "Nerve to muscle", "Skin to bone"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Common Conditions",
          duration: "13:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency musculoskeletal diagnoses",
            "Distinguish fracture, sprain, and strain precisely",
            "Preserve the mechanism of injury in the rendering",
          ],
          content: [
            "Musculoskeletal conditions carry different treatment paths, so precision is essential. A fracture is a broken bone; a sprain injures a ligament; a strain injures a muscle or tendon. Arthritis is joint inflammation, and osteoporosis is loss of bone density that raises fracture risk. Interpreters meet these terms in orthopedics, physical therapy, and injury care, often in the emergency department.",
            "Practice scenario: a patient describes falling and says their wrist 'bent the wrong way and now it is swollen and I cannot turn it.' Convey the mechanism, the swelling, and the loss of motion precisely — the provider uses these details to decide on imaging. Vocabulary examples to master here: fracture, arthritis, sprain, and osteoporosis. Preserving the mechanism of injury is a safety-relevant part of the rendering.",
          ],
          terminology: [
            { term: "Fracture", definition: "A break in a bone." },
            { term: "Sprain", definition: "Injury to a ligament." },
            { term: "Strain", definition: "Injury to a muscle or tendon." },
            { term: "Arthritis", definition: "Inflammation of a joint." },
            { term: "Osteoporosis", definition: "Weak, brittle bones from loss of density." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A 'sprain' specifically injures a:",
              options: ["Bone", "Ligament", "Nerve", "Blood vessel"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m7",
      title: "Nervous System",
      lessons: [
        {
          id: "l1",
          title: "Brain Anatomy",
          duration: "14:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Name the major divisions of the nervous system",
            "Identify key brain structures and their roles",
            "Use neurological combining forms accurately",
          ],
          content: [
            "The nervous system has two divisions: the central nervous system (CNS), made up of the brain and spinal cord, and the peripheral nervous system (PNS), the nerves branching to the rest of the body. The brain includes the cerebrum (thought, movement, sensation), the cerebellum (balance and coordination), and the brainstem (vital functions such as breathing and heart rate). The combining forms are neur/o (nerve), encephal/o (brain), and cerebr/o (cerebrum).",
            "Interpreters meet this anatomy in neurology, stroke care, and after head injuries. When a provider references the cerebellum affecting balance, or the brainstem controlling breathing, accurate anatomy vocabulary helps the patient and family understand the significance of a finding. A labeled diagram of the brain's major regions is a valuable study aid for anchoring these terms in both languages.",
          ],
          terminology: [
            { term: "Central nervous system (CNS)", definition: "The brain and spinal cord." },
            { term: "Peripheral nervous system (PNS)", definition: "The nerves outside the brain and spinal cord." },
            { term: "Cerebrum", definition: "The largest brain part; governs thought, movement, and sensation." },
            { term: "Cerebellum", definition: "Brain region controlling balance and coordination." },
            { term: "Neur/o, Encephal/o", definition: "Combining forms for nerve / brain." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The central nervous system consists of the:",
              options: ["Brain and spinal cord", "Nerves in the limbs", "Heart and lungs", "Muscles and joints"],
              answer: 0,
            },
          ],
        },
        {
          id: "l2",
          title: "Nervous System Disorders",
          duration: "14:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Master high-frequency neurological diagnoses",
            "Render stroke and seizure descriptions with time-critical accuracy",
            "Convey onset time exactly as stated",
          ],
          content: [
            "Neurological terms are frequently time-critical. A stroke (CVA, cerebrovascular accident) is interrupted blood flow to the brain; the exact onset time often determines treatment eligibility. A seizure is a sudden burst of abnormal electrical activity in the brain, and epilepsy is a disorder of recurrent seizures. A migraine is a severe recurring headache. Interpreters must render numbness, weakness, slurred speech, and vision changes precisely and quickly.",
            "Worked example: a family member says the patient's face 'drooped on one side about an hour ago and one arm went weak.' Every element — the side, the drooping, the arm weakness, and 'about an hour ago' — is clinically decisive. Vocabulary examples to master here: stroke, seizure, epilepsy, and migraine. Do not round or summarize time in neurology; render it exactly as stated.",
          ],
          terminology: [
            { term: "Stroke (CVA)", definition: "Cerebrovascular accident — interrupted blood flow to the brain." },
            { term: "Seizure", definition: "A sudden burst of abnormal electrical activity in the brain." },
            { term: "Epilepsy", definition: "A disorder characterized by recurrent seizures." },
            { term: "Migraine", definition: "A severe, often recurring headache." },
            { term: "Aphasia", definition: "Loss or impairment of the ability to produce or understand speech." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In neurology interpreting, the time of symptom onset should be:",
              options: ["Rounded for simplicity", "Rendered exactly as stated", "Omitted", "Estimated by the interpreter"],
              answer: 1,
              explanation: "Onset time can determine stroke treatment eligibility.",
            },
          ],
        },
      ],
    },
    {
      id: "m8",
      title: "Medical Abbreviations",
      lessons: [
        {
          id: "l1",
          title: "Common Clinical Abbreviations",
          duration: "14:00",
          type: "reading",
          completed: false,
          objectives: [
            "Recognize high-frequency clinical abbreviations and their meanings",
            "Render abbreviations as full clinical meaning for patients",
            "Flag ambiguous or dangerous abbreviations rather than guessing",
          ],
          content: [
            "Providers use abbreviations constantly, and patients rarely know them, so the interpreter's job is to render the full meaning rather than the letters. Vital-sign and status abbreviations include BP (blood pressure), HR (heart rate), and SOB (shortness of breath). Dosing-schedule abbreviations include PRN (as needed), BID (twice a day), TID (three times a day), and QID (four times a day). Setting and status abbreviations include NPO (nothing by mouth), ER (emergency room), and ICU (intensive care unit).",
            "Usage examples: 'take this medication BID' must become 'take this twice a day'; 'the patient is NPO' must become 'the patient may have nothing to eat or drink'; 'SOB on exertion' becomes 'shortness of breath with activity'. Rendering the letters alone is useless to the patient.",
            "Some abbreviations are ambiguous or dangerous — the same letters can mean different things across specialties, and dosing abbreviations are especially high-risk. The professional rule is never to guess: if an abbreviation's meaning is unclear or safety-critical, the interpreter transparently asks the provider to clarify before rendering. A brief pause for accuracy is always better than a confident error.",
          ],
          terminology: [
            { term: "BP / HR", definition: "Blood pressure / heart rate." },
            { term: "SOB", definition: "Shortness of breath." },
            { term: "PRN", definition: "As needed (pro re nata)." },
            { term: "BID / TID / QID", definition: "Twice / three times / four times a day." },
            { term: "NPO", definition: "Nothing by mouth (no food or drink)." },
            { term: "ER / ICU", definition: "Emergency room / intensive care unit." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A provider says 'take this medication PRN.' The interpreter should render it as:",
              options: ["'take this PRN'", "'take this as needed'", "'take this now'", "Skip it"],
              answer: 1,
              explanation: "Render the clinical meaning, not the letters.",
            },
          ],
        },
      ],
    },
    {
      id: "m9",
      title: "Medication Terminology",
      lessons: [
        {
          id: "l1",
          title: "Drug Classifications",
          duration: "14:00",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Recognize common drug classes by what they do",
            "Render medication categories accurately",
            "Convey a drug's purpose to the patient",
          ],
          content: [
            "Medications are grouped into classes by their action, and interpreters must render both the class and its purpose. An analgesic relieves pain; an antibiotic treats bacterial infection; an anticoagulant (a 'blood thinner') reduces clotting; an antihypertensive lowers blood pressure; and insulin regulates blood sugar in diabetes. Knowing the class helps you convey why a medication is being prescribed, which supports adherence.",
            "The prefix anti- (against) appears throughout: antibiotic (against bacteria), anticoagulant (against clotting), antiemetic (against vomiting), antipyretic (against fever). Vocabulary examples to master here: analgesic, antibiotic, anticoagulant, and insulin. When a provider explains 'this is a blood thinner to prevent clots', rendering both the effect and the reason helps the patient understand and follow the treatment.",
          ],
          terminology: [
            { term: "Analgesic", definition: "A medication that relieves pain." },
            { term: "Antibiotic", definition: "A medication that treats bacterial infection." },
            { term: "Anticoagulant", definition: "A 'blood thinner' that reduces clot formation." },
            { term: "Insulin", definition: "A hormone/medication regulating blood sugar in diabetes." },
            { term: "Anti-", definition: "Prefix meaning against (e.g., antibiotic, antiemetic)." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An 'analgesic' is a medication that:",
              options: ["Treats infection", "Relieves pain", "Lowers blood sugar", "Prevents clots"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Routes of Administration",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Recognize the common routes for giving medication",
            "Render route abbreviations as clear instructions",
            "Avoid dangerous route confusion",
          ],
          content: [
            "The route is how a medication enters the body, and it changes both effect and safety. Oral (PO, by mouth) is most common. Other routes include intravenous (IV, into a vein), intramuscular (IM, into a muscle), subcutaneous (subcut/SC, under the skin), topical (on the skin), sublingual (SL, under the tongue), and rectal (PR). Confusing routes can be dangerous, so interpreters render them exactly.",
            "Usage examples: 'give 5 mg PO' becomes 'take 5 milligrams by mouth'; 'insulin subcutaneously' becomes 'insulin injected under the skin'; 'nitroglycerin SL' becomes 'nitroglycerin placed under the tongue'. When a route instruction is unclear or seems inconsistent with the medication, the interpreter asks the provider to clarify rather than guessing, because route errors can cause serious harm.",
          ],
          terminology: [
            { term: "PO", definition: "By mouth (oral)." },
            { term: "IV", definition: "Intravenous — into a vein." },
            { term: "IM", definition: "Intramuscular — into a muscle." },
            { term: "Subcutaneous (SC)", definition: "Injected under the skin." },
            { term: "Sublingual (SL)", definition: "Placed under the tongue." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The abbreviation 'PO' means the medication is given:",
              options: ["Into a vein", "By mouth", "Under the skin", "On the skin"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Dosages",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Interpret dosage amounts, units, and frequency precisely",
            "Render numbers and units exactly without rounding",
            "Recognize when to request clarification on dosing",
          ],
          content: [
            "A dosage instruction combines an amount, a unit, a route, and a frequency — for example, '500 mg by mouth every 8 hours.' Interpreters must render every element exactly. Units matter enormously: milligram (mg) and microgram (mcg) differ by a thousandfold, and confusing them is a classic, dangerous error. Numbers must be rendered precisely and never rounded, and frequency terms (once daily, BID, every 6 hours) must be exact.",
            "The professional rule for dosing is the strictest form of the accuracy standard: if any part of a dose — amount, unit, route, or frequency — is unclear, the interpreter pauses and asks the provider to clarify before rendering, rather than approximating. A confident but wrong dose can cause direct harm, so precision and transparent clarification are non-negotiable in medication conversations.",
          ],
          terminology: [
            { term: "Dosage", definition: "The amount, unit, route, and frequency of a medication." },
            { term: "mg vs. mcg", definition: "Milligram vs. microgram — differ by a factor of 1000." },
            { term: "Frequency", definition: "How often a medication is taken (e.g., BID, every 6 hours)." },
            { term: "Unit", definition: "The measure of an amount (mg, mcg, mL, units)." },
            { term: "Clarification", definition: "Requesting confirmation of an unclear dose before rendering." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If part of a dosage instruction is unclear, the interpreter should:",
              options: ["Round to a safe number", "Ask the provider to clarify before rendering", "Skip the dose", "Use the most common dose"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m10",
      title: "Final Review",
      lessons: [
        {
          id: "l1",
          title: "Comprehensive Review & Flashcards",
          duration: "16:00",
          type: "reading",
          completed: false,
          objectives: [
            "Consolidate word-part decoding across all body systems",
            "Self-test with terminology flashcards",
            "Prepare for the final exam",
          ],
          content: [
            "This review pulls the course together. Return to the master method: decode every unfamiliar term into root (body part), prefix (position, number, negation), and suffix (condition or procedure). Practice across systems: cardiology (cardi/o + -ology), gastritis (gastr/o + -itis), bronchoscopy (bronch/o + -scopy), osteoporosis (oste/o + -osis), and hemiparesis (hemi- + paresis). If you can break a term into parts, you can interpret its meaning even when you have not seen the exact word.",
            "Practice activity — terminology flashcards: cover the definition and recall it from the term, then reverse it. Drill the high-yield pairs that flip meaning (hyper-/hypo-, brady-/tachy-, -ectomy/-otomy) and the safety-critical vocabulary (MI, CVA, NPO, mg vs. mcg). Rehearse each set in both your languages until recall is instant. Also review the professional habits woven through the course: render clinical meaning rather than abbreviations, preserve numbers and onset times exactly, and clarify rather than guess.",
            "You are now ready for the final exam, which draws 50 questions from every module — word parts, body systems, cardiovascular, respiratory, digestive, musculoskeletal, nervous, abbreviations, and medications. A passing score of 80 percent confirms you can decode and render foundational medical terminology accurately, and completion awards your course certificate.",
          ],
          terminology: [
            { term: "Decode", definition: "Break a term into root, prefix, and suffix to find its meaning." },
            { term: "High-yield pair", definition: "Opposing word parts that flip meaning (hyper-/hypo-, brady-/tachy-)." },
            { term: "Safety-critical term", definition: "Vocabulary where an error can cause harm (MI, NPO, mg vs. mcg)." },
            { term: "Flashcard drill", definition: "Two-way self-testing of term and definition in both languages." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The most reliable way to handle an unfamiliar medical term is to:",
              options: [
                "Guess from context and move on",
                "Decode it into root, prefix, and suffix",
                "Render only the letters",
                "Skip it",
              ],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "Medical Terminology I — Final Exam",
    category: "Medical",
    durationMinutes: 60,
    passingScore: 80,
    questions: [
      { id: "q1", question: "Most medical terms are built from word parts derived from:", options: ["English and French", "Greek and Latin", "Arabic and Spanish", "German and Italian"], answer: 1 },
      { id: "q2", question: "The part of a term that carries its core meaning (usually a body part) is the:", options: ["Prefix", "Suffix", "Root", "Combining vowel"], answer: 2 },
      { id: "q3", question: "A word part added to the front of a term to modify its meaning is a:", options: ["Root", "Prefix", "Suffix", "Combining form"], answer: 1 },
      { id: "q4", question: "The suffix '-itis' means:", options: ["Removal", "Inflammation", "Study of", "Pain"], answer: 1 },
      { id: "q5", question: "The suffix '-ectomy' means:", options: ["Inflammation", "Surgical removal", "Study of", "Incision"], answer: 1 },
      { id: "q6", question: "The combining vowel used to link word parts is usually:", options: ["a", "e", "o", "u"], answer: 2 },
      { id: "q7", question: "'Cardiology' breaks down as:", options: ["heart + inflammation", "heart + study of", "heart + removal", "heart + pain"], answer: 1 },
      { id: "q8", question: "'Gastritis' means:", options: ["Removal of the stomach", "Inflammation of the stomach", "Study of the stomach", "Pain in the liver"], answer: 1 },
      { id: "q9", question: "The prefix 'hyper-' means:", options: ["Below normal", "Above normal / excessive", "Slow", "Without"], answer: 1 },
      { id: "q10", question: "The prefix 'brady-' means:", options: ["Fast", "Slow", "Excessive", "Absent"], answer: 1 },
      { id: "q11", question: "In the anatomical position, the body is:", options: ["Lying face down", "Standing upright, facing forward, palms forward", "Seated", "Lying on the side"], answer: 1 },
      { id: "q12", question: "'Distal' means:", options: ["Nearer the point of attachment", "Farther from the point of attachment", "Toward the head", "Toward the midline"], answer: 1 },
      { id: "q13", question: "'Superior' means toward the:", options: ["Feet", "Head", "Front", "Back"], answer: 1 },
      { id: "q14", question: "The heart and lungs are located in the:", options: ["Abdominal cavity", "Thoracic cavity", "Pelvic cavity", "Cranial cavity"], answer: 1 },
      { id: "q15", question: "Classic appendicitis pain localizes to the:", options: ["RUQ", "LUQ", "RLQ", "LLQ"], answer: 2 },
      { id: "q16", question: "Which system exchanges oxygen and carbon dioxide?", options: ["Digestive", "Respiratory", "Urinary", "Endocrine"], answer: 1 },
      { id: "q17", question: "The heart's main pumping chamber to the body is the:", options: ["Right atrium", "Left ventricle", "Right ventricle", "Left atrium"], answer: 1 },
      { id: "q18", question: "Arteries generally carry blood:", options: ["Toward the heart", "Away from the heart", "Only in the lungs", "Only to the brain"], answer: 1 },
      { id: "q19", question: "'Myocardial infarction' is commonly known as:", options: ["Stroke", "Heart attack", "Seizure", "High blood pressure"], answer: 1 },
      { id: "q20", question: "'Hypertension' means:", options: ["Low blood pressure", "High blood pressure", "Irregular rhythm", "Chest pain"], answer: 1 },
      { id: "q21", question: "'Hypotension' means:", options: ["High blood pressure", "Low blood pressure", "Fast heart rate", "Chest pain"], answer: 1 },
      { id: "q22", question: "'Angina' refers to:", options: ["An irregular rhythm", "Chest pain from reduced blood flow to the heart", "A heart attack", "High blood pressure"], answer: 1 },
      { id: "q23", question: "An 'arrhythmia' is:", options: ["An irregular heartbeat rhythm", "A heart attack", "High blood pressure", "Chest pain"], answer: 0 },
      { id: "q24", question: "An 'electrocardiogram' records the heart's:", options: ["Blood pressure", "Electrical activity", "Oxygen level", "Cholesterol"], answer: 1 },
      { id: "q25", question: "A 'stent' is used to:", options: ["Record heart rhythm", "Hold a narrowed artery open", "Measure blood pressure", "Replace a valve"], answer: 1 },
      { id: "q26", question: "Gas exchange in the lungs occurs in the:", options: ["Trachea", "Bronchi", "Alveoli", "Larynx"], answer: 2 },
      { id: "q27", question: "'Dyspnea' refers to:", options: ["Difficulty swallowing", "Shortness of breath", "Chest pain", "Coughing blood"], answer: 1 },
      { id: "q28", question: "'COPD' stands for:", options: ["Chronic obstructive pulmonary disease", "Cardiac output pressure disorder", "Chronic oxygen pump deficiency", "Central obstructive pain disorder"], answer: 0 },
      { id: "q29", question: "'Pneumonia' is an infection that inflames the:", options: ["Bronchi only", "Air sacs (alveoli) of the lungs", "Trachea", "Pleura only"], answer: 1 },
      { id: "q30", question: "'Oxygen saturation' measures:", options: ["Breaths per minute", "Percentage of hemoglobin carrying oxygen", "Lung size", "Carbon dioxide only"], answer: 1 },
      { id: "q31", question: "'Bronchoscopy' means:", options: ["Imaging with X-ray", "Visual examination of the airways with a scope", "Measuring blood gases", "Removing a lung"], answer: 1 },
      { id: "q32", question: "Most nutrient absorption occurs in the:", options: ["Stomach", "Small intestine", "Colon", "Esophagus"], answer: 1 },
      { id: "q33", question: "'Hepatitis' is inflammation of the:", options: ["Stomach", "Liver", "Colon", "Gallbladder"], answer: 1 },
      { id: "q34", question: "An 'ulcer' is:", options: ["A hardened deposit in the gallbladder", "An open sore in the stomach or duodenal lining", "Inflammation of the colon", "Difficulty swallowing"], answer: 1 },
      { id: "q35", question: "'Melena' is:", options: ["Difficulty swallowing", "Black, tarry stool suggesting GI bleeding", "Vomiting", "Constipation"], answer: 1 },
      { id: "q36", question: "A 'colonoscopy' examines the:", options: ["Stomach", "Colon", "Esophagus", "Liver"], answer: 1 },
      { id: "q37", question: "The combining form 'oste/o' refers to:", options: ["Muscle", "Bone", "Joint", "Nerve"], answer: 1 },
      { id: "q38", question: "A 'fracture' is a:", options: ["Torn ligament", "Broken bone", "Pulled muscle", "Joint inflammation"], answer: 1 },
      { id: "q39", question: "A 'sprain' specifically injures a:", options: ["Bone", "Ligament", "Nerve", "Blood vessel"], answer: 1 },
      { id: "q40", question: "A 'strain' specifically injures a:", options: ["Ligament", "Muscle or tendon", "Bone", "Joint"], answer: 1 },
      { id: "q41", question: "'Arthritis' is inflammation of a:", options: ["Muscle", "Joint", "Bone", "Nerve"], answer: 1 },
      { id: "q42", question: "'Osteoporosis' refers to:", options: ["Joint inflammation", "Weak, brittle bones from loss of density", "A broken bone", "Muscle pain"], answer: 1 },
      { id: "q43", question: "The central nervous system consists of the:", options: ["Brain and spinal cord", "Nerves in the limbs", "Heart and lungs", "Muscles and joints"], answer: 0 },
      { id: "q44", question: "A 'CVA' is commonly known as a:", options: ["Heart attack", "Stroke", "Seizure", "Migraine"], answer: 1 },
      { id: "q45", question: "'Epilepsy' is characterized by:", options: ["Recurrent seizures", "Chronic headaches", "Loss of speech", "Muscle weakness"], answer: 0 },
      { id: "q46", question: "A provider says 'take this medication PRN.' It should be rendered as:", options: ["'take this PRN'", "'take this as needed'", "'take this now'", "Skip it"], answer: 1 },
      { id: "q47", question: "'NPO' instructs the patient to:", options: ["Take nothing by mouth", "Take medication as needed", "Rest", "Return tomorrow"], answer: 0 },
      { id: "q48", question: "An 'anticoagulant' is a medication that:", options: ["Relieves pain", "Reduces blood clotting", "Treats infection", "Lowers blood sugar"], answer: 1 },
      { id: "q49", question: "The abbreviation 'PO' means the medication is given:", options: ["Into a vein", "By mouth", "Under the skin", "On the skin"], answer: 1 },
      { id: "q50", question: "If part of a dosage instruction is unclear, the interpreter should:", options: ["Round to a safe number", "Ask the provider to clarify before rendering", "Skip the dose", "Use the most common dose"], answer: 1 },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 1. Medical Interpreter Ethics & Standards of Practice
// ─────────────────────────────────────────────────────────────────────────
cchiContent["medical-interpreter-ethics-sop"] = {
  resources: res("MIES"),
  modules: [
    {
      id: "m1",
      title: "Ethics & Standards of Practice",
      lessons: [
        {
          id: "l1",
          title: "Introduction to Healthcare Interpreting",
          duration: "14:20",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Describe the purpose and settings of healthcare interpreting",
            "Distinguish qualified interpreters from bilingual staff and ad hoc interpreters",
            "Explain why professional interpreters improve patient safety and outcomes",
          ],
          content: [
            "Healthcare interpreting is the practice of converting spoken or signed communication between a patient and a provider who do not share a language, accurately and impartially, so that the patient can participate fully in their own care. It happens in emergency departments, clinics, mental health sessions, discharge planning, and over the phone and video. Unlike casual bilingual conversation, professional interpreting is governed by a code of ethics, national standards of practice, and a duty to protect patient safety. The interpreter is a trained professional, not simply a person who happens to speak two languages.",
            "The distinction between a qualified interpreter and an ad hoc interpreter — a family member, a bilingual nurse pulled from other duties, or a bystander — is central to this field. Research consistently shows that using untrained interpreters increases clinically significant errors: omitted symptoms, altered dosages, and editorializing that changes the meaning of what a patient said. A qualified interpreter renders the full message, manages the flow of the conversation, and stays within a defined professional role. That discipline is what makes language access safe rather than merely available.",
          ],
          terminology: [
            { term: "Qualified interpreter", definition: "A trained, competent interpreter who has demonstrated the skills and ethics required for the setting." },
            { term: "Ad hoc interpreter", definition: "An untrained person (often a family member or bilingual staffer) used to interpret; associated with higher error rates." },
            { term: "Language access", definition: "A patient's right to meaningful communication with providers regardless of the language they speak." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Why are qualified interpreters preferred over family members in clinical encounters?",
              options: [
                "They work for lower fees",
                "They render the full message accurately and reduce clinically significant errors",
                "They can make medical decisions for the patient",
                "They are always faster",
              ],
              answer: 1,
              explanation: "Trained interpreters reduce omissions and distortions that harm patient safety.",
            },
          ],
        },
        {
          id: "l2",
          title: "National Code of Ethics",
          duration: "16:10",
          type: "lecture",
          completed: false,
          objectives: [
            "List the core tenets of the National Code of Ethics for interpreters in health care",
            "Apply confidentiality, accuracy, and impartiality to real encounters",
            "Recognize when a tenet is being tested and choose a professional response",
          ],
          content: [
            "The National Code of Ethics for Interpreters in Health Care, published by the National Council on Interpreting in Health Care (NCIHC), defines the values that guide professional conduct. Its central tenets are confidentiality, accuracy, impartiality, respect for the parties, cultural awareness, professional boundaries (refraining from personal involvement), professional development, and advocacy limited to situations affecting health, well-being, or dignity. These are not abstract ideals; they are decision rules you apply under pressure, often in seconds.",
            "Consider accuracy and impartiality together. If a patient uses profanity to describe their pain, you interpret the profanity — softening it would distort the clinical picture and violate accuracy. If you personally disagree with a patient's decision to decline treatment, impartiality requires you to interpret their refusal faithfully and without editorializing. The code protects the patient's voice, not your comfort. When two tenets appear to conflict, interpreters are trained to make the conflict transparent to the parties rather than resolve it silently on their own.",
          ],
          terminology: [
            { term: "NCIHC", definition: "National Council on Interpreting in Health Care, publisher of the widely used Code of Ethics and Standards of Practice." },
            { term: "Impartiality", definition: "Remaining neutral: not taking sides, advising, or letting personal opinion affect the rendering." },
            { term: "Advocacy", definition: "Speaking or acting on a patient's behalf, permitted only when health, well-being, or dignity is at risk and after careful judgment." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A patient swears while describing severe pain. The interpreter should:",
              options: [
                "Omit the profanity to be polite",
                "Interpret the statement faithfully, including its intensity",
                "Tell the patient to calm down",
                "Summarize that the patient is upset",
              ],
              answer: 1,
              explanation: "Accuracy requires conveying register and intensity; softening distorts the clinical picture.",
            },
          ],
        },
        {
          id: "l3",
          title: "Standards of Practice",
          duration: "15:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Connect each ethical principle to a concrete standard of practice",
            "Use first-person interpreting and manage turn-taking",
            "Apply position, introductions, and transparency techniques",
          ],
          content: [
            "Where the Code of Ethics states values, the Standards of Practice describe the observable behaviors that carry those values into the room. Standards cover the pre-session introduction, using the first person ('I have chest pain' rather than 'she says she has chest pain'), managing turn-taking and pacing, positioning oneself to support direct provider-patient communication, and the transparency rule: anything the interpreter says on their own behalf is announced to both parties so nothing happens 'off the record.'",
            "A strong pre-session sets up the whole encounter. In a few sentences the interpreter states their role, that everything will be kept confidential, that they will interpret everything said in the first person, and that either party may ask to pause for clarification. This orients the patient and provider, reduces side conversations, and establishes the interpreter as a neutral conduit. Managing flow — signaling politely when a speaker should pause so nothing is lost — is a skill that protects accuracy just as much as vocabulary does.",
          ],
          terminology: [
            { term: "Pre-session", definition: "A brief interpreter introduction that sets role, confidentiality, first-person use, and clarification norms." },
            { term: "First-person interpreting", definition: "Rendering each speaker's words as 'I', preserving directness between patient and provider." },
            { term: "Transparency", definition: "Announcing to both parties anything the interpreter says on their own behalf." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Interpreting in the first person ('I have chest pain') primarily serves to:",
              options: [
                "Make the interpreter sound fluent",
                "Preserve direct communication between patient and provider",
                "Save time",
                "Avoid confidentiality rules",
              ],
              answer: 1,
              explanation: "First-person rendering keeps the provider and patient in direct dialogue.",
            },
          ],
        },
        {
          id: "l4",
          title: "HIPAA & Patient Privacy",
          duration: "13:45",
          type: "lecture",
          completed: false,
          objectives: [
            "Define protected health information in the interpreting context",
            "Apply the minimum-necessary principle to interpreter conduct",
            "Handle records, notes, and remote settings without breaching privacy",
          ],
          content: [
            "Interpreters routinely handle protected health information (PHI): names, diagnoses, medications, and any detail that could identify a patient and their care. Under HIPAA, interpreters working for or on behalf of a covered entity are bound to protect PHI just as clinical staff are. In practice this means you do not discuss cases outside the encounter, you do not retain notes beyond what a session requires, and you destroy any temporary notes securely once they are no longer needed.",
            "Privacy risks multiply in remote work. On a video or phone assignment, you must ensure no one else can overhear the call, that you are in a private space, and that screens showing PHI are not visible to others. The minimum-necessary principle applies to interpreters too: you access and relay only the information required to interpret the encounter, never browsing charts or asking for details that are not relevant to the communication in front of you.",
          ],
          terminology: [
            { term: "PHI", definition: "Protected Health Information — any individually identifiable health data that must be safeguarded under HIPAA." },
            { term: "Minimum necessary", definition: "The rule that only the least amount of PHI needed for a task should be accessed or shared." },
            { term: "Covered entity", definition: "A health plan, clearinghouse, or provider that transmits health information and is bound by HIPAA." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "During a phone assignment at home, the interpreter should first ensure that:",
              options: [
                "The call is recorded",
                "They are in a private space where no one can overhear PHI",
                "Family members can listen to help",
                "The patient's chart is open on screen",
              ],
              answer: 1,
              explanation: "Protecting PHI requires a private environment with no unauthorized listeners.",
            },
          ],
        },
        {
          id: "l5",
          title: "Cultural Competency",
          duration: "15:05",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Explain the interpreter's role as a cultural clarifier",
            "Identify culturally rooted misunderstandings without stereotyping",
            "Signal a potential cultural gap transparently and neutrally",
          ],
          content: [
            "Language and culture are inseparable. A faithful rendering sometimes leaves a genuine gap in understanding — a metaphor, a folk illness like 'susto', a gesture, or an indirect way of declining that does not translate word-for-word. The interpreter's role is not to lecture on culture but to recognize when a cultural difference is blocking communication and to bring it to the surface so the parties can address it themselves.",
            "The professional technique is transparent and brief: 'The interpreter would like to note a possible cultural point,' then a short, neutral explanation, delivered to both parties. You never assume a patient holds a belief because of their background — that is stereotyping, which is its own error. Instead you watch for signs of a breakdown, offer a bridge, and hand the conversation back to the provider and patient. Cultural competency is a form of accuracy: it protects meaning, not just words.",
          ],
          terminology: [
            { term: "Cultural broker", definition: "A role in which the interpreter surfaces culturally rooted misunderstandings for the parties to resolve." },
            { term: "Culture-bound syndrome", definition: "A pattern of illness (e.g., 'susto') recognized within a specific culture that may not map to a biomedical category." },
            { term: "Stereotyping", definition: "Assuming an individual holds a belief or trait based solely on their group membership." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a cultural concept blocks understanding, the interpreter should:",
              options: [
                "Decide the answer for the patient",
                "Transparently note a possible cultural point to both parties, neutrally",
                "Ignore it and continue",
                "Assume the belief based on the patient's country of origin",
              ],
              answer: 1,
              explanation: "Surface the gap neutrally and let the parties resolve it; never stereotype or decide for them.",
            },
          ],
        },
        {
          id: "l6",
          title: "Professional Boundaries",
          duration: "12:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Define the limits of the interpreter role",
            "Decline tasks outside scope (giving advice, transporting, chaperoning)",
            "Maintain boundaries with empathy",
          ],
          content: [
            "Professional boundaries define what the interpreter does and does not do. You interpret; you do not give medical or legal advice, fill out forms on the patient's behalf, offer personal opinions, run errands, or become the patient's advocate in matters unrelated to the encounter. These limits protect both parties: they keep the encounter neutral and prevent the interpreter from taking on responsibilities they are not trained or authorized to carry.",
            "Boundaries are hardest to hold when a patient is vulnerable and turns to you for help. A patient may ask you to explain their diagnosis, drive them home, or tell them what you would do. The skilled response is warm but clear: you redirect clinical questions to the provider ('Please ask the doctor and I will interpret the answer') and decline out-of-scope requests without coldness. Holding a boundary with empathy is a core professional skill, not a failure of kindness.",
          ],
          terminology: [
            { term: "Scope of practice", definition: "The defined set of tasks an interpreter is authorized and trained to perform." },
            { term: "Role boundary", definition: "The limit that keeps the interpreter from taking on clinical, advisory, or personal roles." },
            { term: "Redirection", definition: "Steering an out-of-scope question back to the appropriate party, e.g., the provider." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A patient asks the interpreter, 'What would you do about this surgery?' The best response is to:",
              options: [
                "Share personal medical opinion",
                "Redirect the question to the provider and interpret the answer",
                "Refuse and end the session",
                "Tell the patient to decide alone",
              ],
              answer: 1,
              explanation: "Clinical questions belong to the provider; the interpreter redirects with empathy.",
            },
          ],
        },
        {
          id: "l7",
          title: "Difficult Situations",
          duration: "17:40",
          type: "video",
          completed: false,
          videoUrl: V.c,
          objectives: [
            "Manage emotionally charged, conflictual, or ambiguous encounters",
            "Apply a structured approach to ethical dilemmas",
            "Protect accuracy and neutrality under stress",
          ],
          content: [
            "Difficult situations test every principle at once: a distraught family in an end-of-life discussion, a provider speaking too fast, a patient disclosing abuse, or a conflict where a party asks the interpreter to take a side. The professional response starts with staying in role — interpret everything, remain impartial — while using standards-based tools: request a pause for pacing, ask for clarification when meaning is unclear, and make any intervention transparent to both parties.",
            "For genuine ethical dilemmas, use a simple structured approach: identify the conflict (which principles are colliding), consider the options and their impact on the patient, weigh the least intrusive action that resolves the problem, and act transparently. For example, if you notice the provider missed that a patient said they cannot afford a medication, the transparent move is to note that the patient mentioned a concern, not to silently advocate or solve it yourself. Documentation and self-care afterward matter too; vicarious trauma is real and interpreters should debrief and seek support when encounters are heavy.",
          ],
          terminology: [
            { term: "Ethical dilemma", definition: "A situation where two or more professional principles appear to conflict." },
            { term: "Least intrusive intervention", definition: "The smallest transparent action that resolves a communication or safety problem." },
            { term: "Vicarious trauma", definition: "Emotional strain interpreters may absorb from repeatedly relaying distressing content." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The interpreter notices the provider didn't catch that the patient can't afford a drug. The interpreter should:",
              options: [
                "Solve it by finding a cheaper drug",
                "Transparently note the patient raised a concern so the parties can address it",
                "Stay silent because it's not their job",
                "Advise the patient to skip the medication",
              ],
              answer: 1,
              explanation: "Make the missed concern transparent; don't solve it yourself or suppress it.",
            },
          ],
        },
        {
          id: "l8",
          title: "Final Review",
          duration: "11:15",
          type: "reading",
          completed: false,
          objectives: [
            "Consolidate the code of ethics and standards of practice",
            "Self-assess readiness against professional expectations",
            "Prepare for the course final assessment",
          ],
          content: [
            "This review ties the course together. The Code of Ethics gives you the values — confidentiality, accuracy, impartiality, respect, cultural awareness, boundaries, professionalism, and limited advocacy. The Standards of Practice turn those values into observable behavior — the pre-session, first-person rendering, transparency, flow management, and privacy protection. Ethics without standards is vague; standards without ethics are hollow. Competent interpreters carry both at once and can explain why they acted as they did.",
            "Before the final assessment, self-check against a few benchmarks: Can you deliver a clear pre-session? Can you keep a rendering accurate when the content is uncomfortable? Can you hold a boundary with empathy? Can you surface a cultural or safety concern transparently rather than acting on it silently? If any answer is shaky, revisit that lesson. The final assessment checks recognition and application, not memorization of wording.",
          ],
          terminology: [
            { term: "Standards of Practice", definition: "The behavioral norms that operationalize the interpreter code of ethics." },
            { term: "Self-assessment", definition: "Reflective checking of one's own competence against professional benchmarks." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The relationship between the Code of Ethics and the Standards of Practice is best described as:",
              options: [
                "They are identical",
                "Ethics states the values; standards describe the behaviors that enact them",
                "Standards replace ethics",
                "They are unrelated",
              ],
              answer: 1,
              explanation: "Standards operationalize the values in the code.",
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "Medical Interpreter Ethics & Standards — Final Assessment",
    category: "Ethics",
    durationMinutes: 30,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "The core tenets of the healthcare interpreter code of ethics include all EXCEPT:",
        options: ["Confidentiality", "Accuracy", "Making treatment decisions for patients", "Impartiality"],
        answer: 2,
      },
      {
        id: "q2",
        question: "Transparency in interpreting means:",
        options: [
          "Sharing the patient's case with colleagues",
          "Announcing to both parties anything the interpreter says on their own behalf",
          "Translating word for word only",
          "Recording the session",
        ],
        answer: 1,
      },
      {
        id: "q3",
        question: "The minimum-necessary principle requires interpreters to:",
        options: [
          "Access only the PHI needed to interpret the encounter",
          "Memorize the full chart",
          "Share information with the patient's family",
          "Keep notes indefinitely",
        ],
        answer: 0,
      },
      {
        id: "q4",
        question: "When a cultural concept blocks understanding, the interpreter should:",
        options: [
          "Decide for the patient",
          "Neutrally surface a possible cultural point to both parties",
          "Assume the belief from the patient's origin",
          "Ignore it",
        ],
        answer: 1,
      },
      {
        id: "q5",
        question: "Holding a professional boundary with empathy means:",
        options: [
          "Coldly refusing all requests",
          "Warmly redirecting out-of-scope requests while staying in role",
          "Doing whatever the patient asks",
          "Giving personal advice",
        ],
        answer: 1,
      },
    ],
  },
}
