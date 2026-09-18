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
      title: "Introduction to VRI",
      lessons: [
        {
          id: "l1",
          title: "What is VRI?",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Define video remote interpreting and how it works",
            "Identify the settings where VRI is used",
            "Explain when a visual channel materially improves interpreting",
          ],
          content: [
            "Video Remote Interpreting (VRI) is spoken- or signed-language interpreting delivered over a live video connection, linking a limited-English-proficient (LEP) or Deaf participant, an English-speaking provider, and an interpreter who joins by video. It combines the on-demand convenience of remote interpreting with a visual channel, so the interpreter can both hear and see the encounter. Calls typically arrive through a healthcare-grade video platform that routes them by language and connects all parties on screen.",
            "VRI is used wherever a visual dimension improves communication but an in-person interpreter is not practical: hospital emergency departments, clinics, mental-health sessions, pediatric visits, and bedside encounters. It is the standard channel for American Sign Language, where the visual signal is the language itself, and it is valuable for spoken-language encounters that rely on seeing a document, a gesture, or a patient's affect and body language.",
            "The visual channel is what distinguishes VRI from audio-only work. Being able to see facial expression, gestures, a provider pointing to a body part, or a patient's distress adds context that supports accuracy and rapport. That same channel, however, brings its own responsibilities — camera presence, lighting, background privacy, and technology management — which is what this course builds. VRI is not simply 'OPI with a picture'; it is a distinct professional skill set.",
          ],
          terminology: [
            { term: "VRI", definition: "Video Remote Interpreting — interpreting delivered over a live video connection." },
            { term: "LEP", definition: "Limited English Proficient — a person who cannot communicate effectively in English." },
            { term: "Visual channel", definition: "The video signal that lets the interpreter see facial expression, gestures, and context." },
            { term: "Video platform", definition: "The secure application that connects all parties on screen and routes calls by language." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "VRI is distinguished from OPI primarily by:",
              options: ["The use of a telephone", "A live visual channel that lets the interpreter see the encounter", "The absence of an interpreter", "Being only for written translation"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Differences Between OPI and VRI",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Compare OPI and VRI across channel, cues, and setup",
            "Choose the appropriate modality for an encounter",
            "Recognize the added responsibilities VRI introduces",
          ],
          content: [
            "OPI (Over-the-Phone Interpreting) and VRI share the same interpreting ethics and standards — accuracy, confidentiality, impartiality, transparency, and role boundaries apply identically — but they differ in channel and demands. OPI is audio-only and can be delivered from almost anywhere with a phone; VRI adds live video, which requires a camera, adequate bandwidth, controlled lighting, a private and appropriate background, and attention to how the interpreter appears on screen.",
            "The visual channel changes what the interpreter can do and must manage. In VRI, the interpreter can use and read visual cues — gaze, gestures, facial affect, and pointing — and can interpret signed languages, which OPI cannot support at all. In exchange, VRI carries risks OPI does not: the camera can reveal confidential documents or people in the background, technical failures are more disruptive, and the interpreter's appearance and environment become part of the professional impression.",
            "Choosing the modality depends on the encounter. VRI is preferred when visual context materially improves accuracy and rapport — signed-language work, showing a body part, reading a distressed patient's affect, or pediatric visits where a child responds to a face. OPI is appropriate for quick, information-driven calls where video adds little, or as a fallback when video fails. Worked example: a Deaf patient's emergency visit requires VRI (or in-person) because the language is visual, whereas a brief prescription-refill call is well served by OPI.",
          ],
          terminology: [
            { term: "OPI", definition: "Over-the-Phone Interpreting — audio-only remote interpreting." },
            { term: "Modality", definition: "The delivery channel of interpreting: in-person, OPI, or VRI." },
            { term: "Bandwidth", definition: "The connection capacity needed to carry stable video and audio." },
            { term: "Fallback modality", definition: "Switching to a working channel (e.g., OPI) when video fails." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Compared with OPI, VRI additionally requires the interpreter to manage:",
              options: ["The code of ethics", "Camera presence, lighting, background privacy, and technology", "The need for accuracy", "Confidentiality"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Benefits and Limitations",
          duration: "12:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain the main benefits of VRI for patients and providers",
            "Identify the limitations and risks of the video medium",
            "Apply strategies that maximize benefits and manage limits",
          ],
          content: [
            "VRI's benefits are significant. It provides fast access to interpreters — including for signed languages and less common spoken languages — without travel time, while preserving the visual cues that support accuracy and rapport. It lets providers and patients see the interpreter, which can build trust, and it enables communication in encounters that depend on visual information. For many facilities, VRI is the practical way to meet legal language-access obligations across many languages at once.",
            "The limitations are real. VRI depends on technology: a weak connection, a poor camera, or platform trouble can freeze video, garble audio, or drop the session, which is more disruptive than a phone hiccup. The camera frame is narrow, so an interpreter may miss something happening off-screen, and physically manipulating documents or repositioning the camera is harder. There are also privacy risks unique to video — anything visible on camera or on a shared screen can disclose protected information.",
            "Professional practice maximizes the benefits while controlling the limits. The interpreter runs a pre-session technical check, arranges good lighting and a private background, asks the provider to keep relevant activity within camera view, and always has an audio fallback ready. Worked example: during a wound assessment the provider tilts the camera to show the injury; the interpreter confirms they can see it clearly and continues, but if the video degrades, they transparently switch to audio so care is not delayed. Understanding both sides of VRI is what lets an interpreter use the medium to its full advantage.",
          ],
          terminology: [
            { term: "Language access", definition: "Providing interpreting so LEP and Deaf individuals can use services — often legally required." },
            { term: "Frame limitation", definition: "The narrow camera view that can miss off-screen activity." },
            { term: "Technology dependence", definition: "VRI's reliance on connection, camera, and platform stability." },
            { term: "Audio fallback", definition: "A ready backup to phone audio when the video channel fails." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A limitation unique to VRI compared with OPI is that:",
              options: ["It cannot interpret at all", "The camera frame is narrow and technology can fail more disruptively", "It never supports signed languages", "It removes the need for accuracy"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Interpreter Responsibilities",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "State the interpreter's responsibilities specific to VRI",
            "Combine interpreting standards with video-environment duties",
            "Prepare a professional VRI setup before every encounter",
          ],
          content: [
            "In VRI the interpreter carries all the core responsibilities of any interpreting assignment — faithful, complete, first-person rendering; transparent management of the encounter; confidentiality, impartiality, and staying in role — plus a layer of responsibilities created by the video environment. These added duties are not optional extras; a frozen screen, a cluttered background, or bad lighting can compromise an encounter just as an omission would, so managing the setup is part of interpreting well.",
            "The video-specific responsibilities include: preparing and testing equipment before the session, positioning the camera and lighting for clear presence, securing a private and appropriate background, managing on-screen turn-taking and visual cues, protecting confidentiality across both audio and video channels, and handling technical problems transparently with a fallback ready. The interpreter also represents the language-services provider on screen, so a professional appearance and demeanor matter throughout.",
            "Meeting these responsibilities starts before the call with a deliberate setup and continues through disciplined conduct during it. Worked example: fifteen minutes before a scheduled VRI session an interpreter checks camera framing and lighting, confirms the microphone and connection, clears the desk of any prior notes, closes unrelated applications, and verifies the space is private and the door closed — then joins ready to focus entirely on the communication. This introductory module has defined what VRI is and the responsibilities you hold; the next modules build the concrete skills, beginning with video professionalism.",
          ],
          terminology: [
            { term: "Pre-session setup", definition: "Preparing and testing equipment, lighting, and privacy before the encounter." },
            { term: "Dual-channel confidentiality", definition: "Protecting both what is heard and what is seen on camera or shared screen." },
            { term: "Professional presence", definition: "The interpreter's appearance, demeanor, and readiness on screen." },
            { term: "Scope of practice", definition: "The boundaries of what an interpreter may and may not do in the role." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Managing camera, lighting, and a private background in VRI is:",
              options: ["Optional and separate from interpreting", "Part of the interpreter's responsibility because it protects the encounter", "The provider's job only", "Unnecessary if audio works"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Video Professionalism",
      lessons: [
        {
          id: "l1",
          title: "Camera Positioning",
          duration: "12:40",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Frame yourself clearly and professionally on camera",
            "Place the camera at eye level for natural gaze",
            "Ensure signing space is visible for signed-language work",
          ],
          content: [
            "The camera is your presence in the room, so how you frame yourself shapes the entire encounter. Position the camera at eye level and center yourself head-and-shoulders in the frame, close enough that your face and expressions are clearly readable but not so close that you fill the whole screen. An eye-level camera makes your gaze appear direct and natural; a camera placed too low (angled up) or too high (angled down) distorts your presence and undermines rapport.",
            "Framing must match the language. For spoken-language VRI, a head-and-shoulders frame is ideal. For signed-language VRI, the frame must be wider — typically head to mid-torso — so the full signing space, including the hands and their movement, is visible at all times; cutting off the hands makes the language impossible to read. Keep the camera stable on a stand or laptop rather than handheld, so the image does not shake.",
            "A quick pre-session self-check prevents mid-encounter problems. Confirm you are centered, at eye level, well-framed, and that your image is stable. Worked example: before a session an interpreter notices the laptop camera is angled up from a low desk, making them look down at participants; they raise the laptop on a stand to eye level and re-center, so participants perceive direct, professional eye contact from the first moment.",
          ],
          terminology: [
            { term: "Framing", definition: "How the interpreter is positioned within the camera's view." },
            { term: "Eye-level camera", definition: "Camera placed at eye height so gaze appears natural and direct." },
            { term: "Signing space", definition: "The area around the signer where signs are produced, which must stay fully in frame." },
            { term: "Head-and-shoulders", definition: "The standard spoken-language VRI frame showing the face and upper body." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "For clear VRI, the camera should be placed:",
              options: ["Below the face, angled up", "At eye level, centered", "Far to the side", "Handheld for flexibility"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Eye Contact",
          duration: "11:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Simulate natural eye contact through the camera",
            "Balance looking at the lens with reading participants",
            "Use gaze to support rapport and turn-taking",
          ],
          content: [
            "Eye contact on video is a learned skill because looking at a participant's face on your screen is not the same as looking into the camera. To appear as though you are making eye contact, you look toward the camera lens when it matters — during your rendering and at key moments — since that is what places your gaze on the other person from their side. Constantly staring only at the on-screen image makes you appear to be looking slightly away.",
            "The practical technique is a balance: glance at the lens to convey direct engagement, while still watching participants' faces and cues on your screen so you can read affect and manage turns. With practice this alternation becomes natural. Positioning the participant's video window near the camera lens narrows the gap between 'looking at them' and 'looking at the camera,' making eye contact easier to sustain.",
            "Eye contact supports rapport and flow, especially with anxious patients, children, and in mental-health encounters where connection matters. Worked example: a pediatric patient is shy; the interpreter looks toward the lens while rendering warmly, so the child perceives friendly eye contact, then watches the child's reactions on screen to gauge understanding. Simulated eye contact is not about staring at a lens the whole time — it is about directing your gaze so participants feel seen.",
          ],
          terminology: [
            { term: "Simulated eye contact", definition: "Looking toward the camera lens so participants perceive direct gaze." },
            { term: "Gaze management", definition: "Alternating between the lens and the on-screen image to engage and read cues." },
            { term: "Window placement", definition: "Positioning the participant's video near the lens to ease eye contact." },
            { term: "Rapport", definition: "The sense of connection that supports trust and communication." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "To simulate eye contact on VRI, the interpreter should:",
              options: ["Stare only at their own image", "Look toward the camera lens at key moments while still reading participants", "Avoid looking at the screen", "Close the video window"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Professional Appearance",
          duration: "11:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Present a professional on-camera appearance",
            "Avoid clothing and patterns that distort on video",
            "Project neutrality and competence visually",
          ],
          content: [
            "On camera, appearance communicates professionalism before you say a word. Wear solid, muted colors and avoid busy patterns, fine stripes, and checks that can 'vibrate' or shimmer on video (an effect called moiré). Steer clear of bright neon and pure white or black, which cameras handle poorly. Keep grooming neat and minimize distracting or noisy jewelry, especially for signed-language work where the hands and torso must be clearly readable against your clothing.",
            "Appearance reinforces neutrality and trust. Just as an in-person interpreter dresses appropriately for a clinical setting, a VRI interpreter's tidy, understated presentation helps patients and providers focus on the communication rather than on the interpreter. For signed languages, solid clothing that contrasts with skin tone makes the hands easier to see — a functional requirement, not just a style choice.",
            "Professional appearance is part of the same standard that governs punctuality and preparation. Worked example: an interpreter with a finely striped shirt notices it shimmers on the camera preview and changes into a solid, medium-tone top before joining — removing a visual distraction and, for any signing, improving hand visibility. Dressing for the camera is a small habit that consistently supports a professional impression.",
          ],
          terminology: [
            { term: "Solid colors", definition: "Plain, non-patterned clothing that reads cleanly on camera." },
            { term: "Moiré", definition: "A distracting shimmer that fine patterns cause on video." },
            { term: "Visual neutrality", definition: "An understated appearance that keeps focus on the communication." },
            { term: "Contrast", definition: "Clothing that contrasts with skin tone to make hands visible in signed languages." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The best clothing choice for VRI is:",
              options: ["Fine stripes or busy patterns", "Solid, muted colors", "Bright neon", "Reflective accessories"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Lighting Setup",
          duration: "11:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Light your face evenly for clear visibility",
            "Avoid backlighting and harsh shadows",
            "Adapt lighting for signed-language clarity",
          ],
          content: [
            "Good lighting makes your face and expressions readable, which is essential for rapport in spoken-language VRI and for comprehension in signed languages. The core principle is to face your main light source — a window or lamp in front of you — so your face is evenly lit. The most common mistake is backlighting: sitting with a bright window or light behind you, which turns your face into a dark silhouette the camera cannot render.",
            "Aim for soft, even illumination without harsh shadows. A light directly in front, slightly above eye level, works well; two balanced side lights or a ring light reduce shadows further. Avoid a single harsh overhead light that casts shadows under the eyes, and avoid mixed or flickering light that the camera struggles with. For signed-language work, even lighting on the hands and face is critical so no part of the signing space falls into shadow.",
            "Check your lighting in the camera preview before every session, since daylight changes through the day. Worked example: an interpreter's morning setup is well-lit, but by afternoon the window behind them has become a bright backlight; they close the blind and switch on a front-facing lamp, restoring an evenly lit, clearly visible face. Reliable lighting is a small, repeatable setup step that keeps you visible and professional.",
          ],
          terminology: [
            { term: "Front lighting", definition: "Light placed in front of the interpreter to evenly illuminate the face." },
            { term: "Backlighting", definition: "Light behind the subject that darkens the face into a silhouette; avoided in VRI." },
            { term: "Soft light", definition: "Diffused, even light that minimizes harsh shadows." },
            { term: "Ring light", definition: "A circular light that provides balanced, shadow-reducing front illumination." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "To be clearly visible on camera, the interpreter should:",
              options: ["Sit with a bright window behind them", "Face the main light source so the face is evenly lit", "Use a single harsh overhead light", "Turn off all lighting"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Background Requirements",
          duration: "11:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Choose a plain, non-distracting background",
            "Ensure no confidential information is visible on camera",
            "Decide when virtual backgrounds are appropriate",
          ],
          content: [
            "Your background is part of your professional presence and a confidentiality safeguard. Use a plain, uncluttered, neutral backdrop — a blank wall or a tidy, non-distracting space — so participants focus on you, not on what is behind you. A messy or busy background looks unprofessional and can pull attention, and for signed-language work a plain background of contrasting tone makes the hands easier to read.",
            "Most importantly, nothing confidential may be visible behind you or anywhere in frame. Prior patient notes, other screens, mail, whiteboards, or family members passing by can all disclose protected or private information. Because the camera captures your whole environment, background control is a privacy responsibility, not just an aesthetic one. Clear the space, remove or cover documents, and make sure no other person can appear on camera or overhear the session.",
            "Virtual or blurred backgrounds can help mask an imperfect space, but use them carefully: they can glitch, especially during signing, sometimes erasing hands or edges, so a real plain background is more reliable for signed-language work. Worked example: an interpreter working from a home office angles the camera toward a blank wall, clears the visible desk, and closes the door — achieving a clean, private background without relying on a virtual filter. This completes video professionalism; the next module covers the technology that carries it.",
          ],
          terminology: [
            { term: "Neutral background", definition: "A plain, uncluttered backdrop that keeps focus on the interpreter." },
            { term: "Background privacy", definition: "Ensuring nothing confidential is visible anywhere in the camera frame." },
            { term: "Virtual background", definition: "A digital backdrop that can mask a space but may glitch during signing." },
            { term: "Frame audit", definition: "Checking everything visible on camera before joining a session." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A VRI background must above all be:",
              options: ["Colorful and interesting", "Plain and free of any confidential or private information", "Filled with credentials", "A busy office scene"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m3",
      title: "Technical Requirements",
      lessons: [
        {
          id: "l1",
          title: "Internet Requirements",
          duration: "12:20",
          type: "video",
          completed: false,
          videoUrl: V.c,
          objectives: [
            "Identify the connection needed for stable VRI",
            "Prefer wired or strong connections over weak Wi-Fi",
            "Reduce bandwidth competition during sessions",
          ],
          content: [
            "A stable internet connection is the foundation of VRI; without it, video freezes, audio breaks up, and sessions drop. Video calls need consistent upload and download bandwidth, and consistency matters more than peak speed — a connection that fluctuates will stutter even if it is 'fast' on average. A wired Ethernet connection is the most reliable; if you use Wi-Fi, sit close to the router with a strong signal and avoid far corners of a building.",
            "Bandwidth is shared, so competition degrades your session. Large downloads, streaming video, cloud backups, or others on the same network using heavy applications can starve your call. Before sessions, close bandwidth-hungry applications and, where possible, avoid scheduling heavy network activity at the same time. Signed-language VRI is especially sensitive because dropped frames can make signs unreadable, so a strong, steady connection is non-negotiable for that work.",
            "Test your connection as part of the pre-session check and know your fallback. Worked example: an interpreter notices video stuttering during a preview, sees a large system update downloading in the background, pauses it, and the connection stabilizes before the session begins. If a solid connection cannot be achieved, switching to audio (OPI) is better than struggling through unreadable video — the priority is always clear, accurate communication.",
          ],
          terminology: [
            { term: "Bandwidth", definition: "The connection capacity available to carry video and audio." },
            { term: "Ethernet", definition: "A wired network connection that is more stable than Wi-Fi for video." },
            { term: "Dropped frames", definition: "Missing video frames that can make signs or expressions unreadable." },
            { term: "Bandwidth competition", definition: "Other applications or users consuming capacity needed by the session." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The most reliable connection for VRI is generally:",
              options: ["Weak Wi-Fi far from the router", "A wired Ethernet or strong, steady connection", "A shared connection during large downloads", "Any connection, since speed does not matter"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Audio Quality",
          duration: "12:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Ensure clear, echo-free audio for every session",
            "Use a headset to improve audio and privacy",
            "Diagnose and fix common audio problems",
          ],
          content: [
            "Even on video, audio is where most interpreting happens, so audio quality is critical. A good headset with a microphone is strongly preferred over built-in laptop speakers and mics: it captures your voice clearly, reduces background noise, prevents echo (which happens when speakers feed back into the mic), and supports confidentiality by keeping the other party's audio in your ears rather than out loud in your space.",
            "Common audio problems have standard fixes. Echo is usually solved by switching to a headset so the speaker output no longer reaches the microphone. Background noise is reduced by working in a quiet room, closing windows, and using a directional headset mic. Low or distorted volume can come from a wrong input/output device selected in the platform — verify the correct microphone and speaker are chosen before the call. Muting when not speaking in noisy environments also helps clarity.",
            "Confirm audio in the pre-session check by testing both what you hear and how you sound. Worked example: at the start of a session the provider reports an echo; the interpreter, who was using laptop speakers, plugs in a headset, and the echo disappears immediately. Because audio carries the bulk of the message, protecting its quality is as important in VRI as any visual factor.",
          ],
          terminology: [
            { term: "Headset", definition: "Headphones with a microphone that improve audio clarity, reduce echo, and protect privacy." },
            { term: "Echo", definition: "Feedback that occurs when speaker output re-enters the microphone." },
            { term: "Input/output device", definition: "The microphone and speaker selected in the platform settings." },
            { term: "Background noise", definition: "Ambient sound that degrades audio and must be minimized." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The most common fix for audio echo in VRI is to:",
              options: ["Speak louder", "Switch to a headset so speaker output stops reaching the mic", "Turn off the camera", "Move farther from the microphone"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Camera Quality",
          duration: "11:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Provide a clear, stable video image",
            "Optimize camera settings and placement",
            "Ensure image quality sufficient for signed languages",
          ],
          content: [
            "A clear video image lets participants read your expressions and, for signed languages, your hands — so camera quality matters. A decent HD webcam generally outperforms an older built-in camera, but placement and conditions matter as much as the hardware: a good camera in poor lighting still produces a poor image. Keep the lens clean, position the camera at eye level, and ensure it is stable so the picture does not shake.",
            "Optimize the conditions the camera depends on. Adequate front lighting (from the previous module) dramatically improves image quality, since cameras produce grainy, dim images in low light. A stable connection prevents the image from pixelating or freezing. Frame yourself appropriately for the language — wider for signing — and check the preview so you know exactly what participants see before the session starts.",
            "For signed-language VRI, image quality is not cosmetic; it is comprehension. Blurry, dark, or stuttering video can render signs ambiguous or unreadable. Worked example: an interpreter previews their camera and sees a dim, soft image; they add a front light and clean the lens, and the picture becomes sharp enough for clear hand visibility. Treat camera quality as a communication requirement, verified every time as part of setup.",
          ],
          terminology: [
            { term: "HD webcam", definition: "A high-definition camera that provides a clearer image than many built-in cameras." },
            { term: "Resolution", definition: "The detail level of the video image; higher supports clearer visibility." },
            { term: "Pixelation", definition: "Blocky image degradation caused by a weak connection." },
            { term: "Camera preview", definition: "The self-view used to verify image quality and framing before a session." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "For signed-language VRI, a clear camera image is:",
              options: ["Only cosmetic", "A comprehension requirement, since blurry video can make signs unreadable", "Unnecessary if audio works", "Handled entirely by the platform"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Troubleshooting",
          duration: "13:20",
          type: "video",
          completed: false,
          videoUrl: V.d,
          objectives: [
            "Diagnose and resolve common VRI technical problems",
            "Communicate technical issues transparently",
            "Use a fallback plan when video fails",
          ],
          content: [
            "Technical problems are inevitable in VRI — frozen video, audio lag, echo, dropped connections, or a failing camera — so troubleshooting is a core skill, not an emergency. The best defense is prevention: a pre-session tech check of camera, microphone, connection, and platform login catches most issues before a patient is waiting. Beyond that, know the quick fixes: rejoin the session to clear a frozen state, switch to a headset to stop echo, turn off your own video to preserve bandwidth for audio, or move closer to the router.",
            "When a problem affects communication, handle it transparently rather than silently struggling. Tell both parties what is happening — 'This is the interpreter; my video has frozen but audio is still connected' — so no one is left guessing, and so the provider can decide how to proceed. Transparency during technical trouble is the same principle as transparency in interpreting: participants should never be confused about what is going on.",
            "Always have a fallback and use it decisively. Most VRI setups can drop to phone audio if video fails, and continuing accurately in audio beats losing minutes chasing a perfect picture while care stalls. Worked example: mid-session the video freezes but audio is fine; the interpreter states this transparently and continues in audio-only, restoring video later if it recovers. The goal is uninterrupted, accurate communication — choosing a working channel quickly matters more than the channel being video. This completes the technology module; next are the communication skills the technology serves.",
          ],
          terminology: [
            { term: "Tech check", definition: "A pre-session verification of camera, microphone, connection, and platform." },
            { term: "Fallback", definition: "A backup channel (e.g., phone audio) used when video fails." },
            { term: "Latency", definition: "Delay between speaking and the audio or video reaching the other side." },
            { term: "Rejoin", definition: "Leaving and re-entering a session to clear a frozen or broken state." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If video freezes but audio still works, the interpreter should:",
              options: ["Silently keep trying to fix the video", "Transparently state the issue and continue in audio", "End the session", "Ignore the participants"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m4",
      title: "Communication Skills",
      lessons: [
        {
          id: "l1",
          title: "Managing Visual Cues",
          duration: "12:50",
          type: "video",
          completed: false,
          videoUrl: V.e,
          objectives: [
            "Use and interpret visual cues available on video",
            "Leverage gestures and affect to support accuracy",
            "Know the boundary between reading cues and interpreting them",
          ],
          content: [
            "The visual channel is VRI's great advantage, and using it well is a distinct skill. On video the interpreter can see gestures, facial affect, where a provider points, and a patient's body language — context that supports accuracy and helps resolve ambiguity that audio alone would leave unclear. The interpreter uses these cues to inform their rendering: seeing a patient wince while saying 'I'm fine' or watching a provider indicate a specific area adds meaning the words may not fully carry.",
            "The interpreter also produces visual cues intentionally. Small, clear gestures manage turn-taking; a raised hand or a lean toward the camera signals a need to interrupt transparently; a nod acknowledges receipt. In signed-language VRI the visual channel is the language itself, so facial grammar and clear signing are the rendering, not an accessory to it. Managing your own visible behavior — steady, purposeful, professional — is part of communicating well on camera.",
            "There is a boundary to respect: the interpreter reads visual cues to interpret accurately, but does not narrate or editorialize them. Seeing a patient look frightened does not license the interpreter to announce 'the patient seems scared'; if the fear is expressed, it is rendered, and if a visible cue is clinically relevant but unspoken, that is generally for the provider to observe. Worked example: a provider points to the lower right abdomen and says 'here'; the interpreter renders 'here' and, because the gesture is essential to meaning, may transparently note the location so the reference is not lost. Using visual cues sharpens accuracy without expanding the interpreter's role.",
          ],
          terminology: [
            { term: "Visual cue", definition: "Gesture, gaze, affect, or pointing visible on video that carries meaning." },
            { term: "Facial grammar", definition: "In signed languages, facial expression that conveys grammatical meaning." },
            { term: "Affect", definition: "Observable emotional expression that can inform interpretation." },
            { term: "Non-narration", definition: "Reading cues to interpret accurately without describing or editorializing them." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a provider points and says 'here,' the interpreter should:",
              options: ["Ignore the gesture", "Render 'here' and transparently note the location since the gesture is essential to meaning", "Guess the diagnosis", "Describe the patient's mood"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Turn Taking",
          duration: "12:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Manage speaking turns using both visual and verbal signals",
            "Keep segments short enough for accurate rendering",
            "Coordinate turns across the slight delay of video",
          ],
          content: [
            "Turn-taking on VRI blends the audio discipline of remote interpreting with the visual signals video makes possible. As in any interpreting, the goal is a rhythm of short segments — a speaker talks for a couple of sentences, pauses, the interpreter renders, the other responds — so nothing overflows memory. On video the interpreter can also use visual cues to manage this: a small raised hand to signal 'let me interpret,' a nod to yield the floor, or leaning slightly toward the camera to indicate a turn.",
            "Video's slight transmission delay (latency) complicates turns, because participants may start speaking before the interpreter's rendering reaches them, causing accidental overlap. The interpreter compensates by setting clear expectations in the pre-session ('please pause after a few sentences and one at a time'), using visible cues to mark transitions, and allowing a brief beat before responding. Establishing this rhythm early makes the whole encounter smoother.",
            "When needed, the interpreter manages turns transparently as 'the interpreter.' Worked example: a provider and patient begin speaking at once because of lag; the interpreter raises a hand on camera and says, 'This is the interpreter — please, one at a time; go ahead, doctor,' then renders and cues the patient. Combining visual and verbal turn management is what keeps a video encounter orderly and accurate despite the delay.",
          ],
          terminology: [
            { term: "Turn-taking", definition: "Managing the sequence of who speaks and when so each turn can be interpreted." },
            { term: "Segment length", definition: "The amount of speech before a pause; kept short for accuracy." },
            { term: "Latency", definition: "Transmission delay on video that can cause accidental overlap." },
            { term: "Visual turn cue", definition: "A gesture (raised hand, nod, lean) that signals a turn transition on camera." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Video latency affects turn-taking by:",
              options: ["Eliminating the need for turns", "Causing accidental overlap, which the interpreter manages with clear cues and pauses", "Making rendering unnecessary", "Speeding up the encounter"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Clarification Techniques",
          duration: "12:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Request clarification transparently on video",
            "Use the visual channel to resolve ambiguity",
            "Keep interventions brief, neutral, and interpreted",
          ],
          content: [
            "When something is genuinely unclear — a mumbled word, an unfamiliar term, an ambiguous gesture, or audio that dropped — the interpreter clarifies rather than guesses. The technique mirrors all interpreting: identify yourself, name exactly what you need, keep it brief, and interpret both the request and the answer so nothing happens off the record. On video you can pair this with a visual cue, such as a raised hand, to signal the interruption clearly before speaking.",
            "The visual channel can both cause and resolve the need to clarify. A gesture the interpreter cannot see fully, or something off-screen, may need clarifying ('This is the interpreter — I could not see what the doctor indicated; could you say the location?'). Conversely, seeing a document or a pointed-to area can resolve an ambiguity that audio alone would not. The interpreter clarifies purposefully, reserving it for points where guessing would risk accuracy, so the encounter stays efficient.",
            "Clarifying is not paraphrasing or explaining, and it is not narrating what you see. The interpreter asks the speaker to specify and then renders that, without substituting their own definition or describing a visual cue. Worked example: a provider refers to 'this medication' while holding up a bottle the interpreter cannot read on camera; the interpreter transparently asks the provider to state the name, then interprets it exactly rather than guessing from a blurry label. Clarification protects accuracy while keeping the interpreter neutral and in role.",
          ],
          terminology: [
            { term: "Clarification", definition: "A transparent request to a speaker to repeat, define, or specify an unclear point." },
            { term: "Transparency", definition: "Announcing an intervention to both parties so nothing is off the record." },
            { term: "Off-screen ambiguity", definition: "Meaning tied to something outside the camera frame that may need clarifying." },
            { term: "Neutral intervention", definition: "A brief process request that does not add the interpreter's own content." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If a provider holds up a medication bottle the interpreter cannot read on camera, the interpreter should:",
              options: ["Guess the medication from the label", "Transparently ask the provider to state the name, then interpret it exactly", "Describe the bottle", "Skip the reference"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Managing Multiple Speakers",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Coordinate turn-taking among several on-screen participants",
            "Track and attribute speakers accurately",
            "Use platform tools to manage multi-party encounters",
          ],
          content: [
            "VRI encounters often involve several participants — a patient, a family member, a physician, and a nurse — sometimes across multiple windows or locations. The interpreter must track who is speaking, attribute statements correctly, and manage turn-taking so voices do not collide. A clear pre-session that asks participants to speak one at a time, and to identify themselves when it may be unclear, prevents most of the confusion before it starts.",
            "Video offers tools that audio does not. The gallery view lets you see everyone, and 'pinning' or 'spotlighting' the active speaker helps you focus and track turns; name labels on each window aid attribution. When it is genuinely unclear who spoke — voices are similar or someone is off-screen — the interpreter confirms transparently ('This is the interpreter — was that the nurse or the doctor?') rather than guessing at attribution, since misattributing a statement can mislead the encounter.",
            "Accuracy is harder with many voices, so the interpreter actively manages the flow: requesting pauses, asking for one speaker at a time, and rendering completely for each. Worked example: in a family conference the patient's daughter and the physician speak over each other; the interpreter raises a hand on camera, asks for one at a time, renders the physician first, then invites the daughter, confirming her identity for the record. Managing multiple speakers combines visual tools, transparent intervention, and disciplined attribution — closing out the communication-skills module.",
          ],
          terminology: [
            { term: "Speaker attribution", definition: "Correctly identifying which participant produced a given statement." },
            { term: "Gallery view", definition: "A layout showing all participants at once to aid tracking." },
            { term: "Pinning/spotlighting", definition: "Focusing the view on the active speaker to manage turns." },
            { term: "Multi-party encounter", definition: "A session with three or more participants requiring extra coordination." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In a multi-party VRI call, when it is unclear who spoke, the interpreter should:",
              options: ["Guess the speaker", "Transparently confirm the speaker's identity before rendering", "Interpret it as anonymous", "Ignore attribution"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m5",
      title: "Ethics in VRI",
      lessons: [
        {
          id: "l1",
          title: "Confidentiality",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.f,
          objectives: [
            "Apply the duty of confidentiality across audio and video",
            "Protect information visible on camera and screen",
            "Handle back-to-back sessions without carrying information over",
          ],
          content: [
            "Confidentiality is the interpreter's duty to keep everything from an encounter private, and in VRI it applies to two channels at once: what is heard and what is seen. The duty covers the full content of every session — names, clinical and personal details, and even that a particular encounter took place — and it is permanent, not lifted when the session ends. Because interpreters handle sensitive information constantly, confidentiality is the bedrock of professional trust.",
            "VRI adds visual confidentiality risks that audio work does not have. Anything visible in your camera frame — prior patient notes, another screen, mail, a whiteboard, or a person walking behind you — can disclose protected information, as can anything you display if you ever share a screen. Protecting confidentiality therefore means a private, cleared space, a controlled background, a door closed so no one overhears or appears on camera, and never capturing screenshots or recordings of a session.",
            "High session volume adds the risk of carrying information from one encounter into the next; each session is sealed, and notes are cleared between them. Worked example: an interpreter finishes one VRI visit and, before the next, removes the sticky note they jotted, closes the prior window, and confirms nothing from that encounter is visible or referenced. Confidentiality is not secrecy for its own sake — it is what lets patients speak honestly enough to receive the care they need.",
          ],
          terminology: [
            { term: "Confidentiality", definition: "The permanent duty to keep all encounter content private." },
            { term: "Dual-channel privacy", definition: "Protecting both audible and visible information in VRI." },
            { term: "Session sealing", definition: "Treating each encounter as separate and not carrying information between them." },
            { term: "Recording restriction", definition: "The prohibition on capturing screenshots or recordings of a session." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A confidentiality risk unique to VRI is that:",
              options: ["The interpreter can hear the patient", "Documents or people visible on camera can disclose protected information", "A headset is used", "The session is interpreted at all"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Professional Conduct",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply professional standards of conduct on video",
            "Maintain impartiality, boundaries, and reliability",
            "Represent the language-services provider well on camera",
          ],
          content: [
            "Professional conduct in VRI combines the ethics of all interpreting — accuracy, impartiality, staying in role — with the visible discipline of being on camera. It includes reliability (joining on time, prepared, with equipment tested), competence (accepting only assignments you can handle), integrity (owning and transparently correcting errors), and respect (courtesy to all parties). Because the interpreter is seen as well as heard, conduct is judged continuously throughout the session, from posture and attentiveness to how issues are handled.",
            "Impartiality and boundaries remain central. The interpreter renders everyone faithfully without taking sides, does not give advice or personal opinions, does not perform tasks outside interpreting, and does not let visible reactions reveal judgment. On camera, neutrality includes controlling facial expression and body language so they convey the speakers' message, not the interpreter's own assessment. When a party asks the interpreter directly for help beyond interpreting, the professional response is to interpret that request to the other party.",
            "The interpreter is the visible face of the language-services provider, so demeanor reflects on the whole service. Worked example: a provider, rushed, asks the interpreter to 'just explain the consent form' to the patient; the interpreter declines the out-of-scope task and instead interprets the provider's explanation, keeping a calm, neutral on-camera manner throughout. Professional conduct is the habit that keeps every VRI encounter trustworthy and in role.",
          ],
          terminology: [
            { term: "Professional conduct", definition: "Reliable, competent, respectful behavior that upholds ethical standards." },
            { term: "On-camera neutrality", definition: "Controlling visible expression so it conveys the message, not the interpreter's judgment." },
            { term: "Boundaries", definition: "Limits that keep the interpreter within scope of practice." },
            { term: "Provider representation", definition: "Reflecting well on the language-services company on every session." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If a provider asks the interpreter to 'just explain the consent form,' professional conduct means:",
              options: ["Explaining it to be helpful", "Declining the out-of-scope task and interpreting the provider's explanation instead", "Signing the form", "Giving the patient advice"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "HIPAA Compliance",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply HIPAA requirements to VRI encounters",
            "Use approved, encrypted platforms and secure setups",
            "Prevent common VRI privacy breaches",
          ],
          content: [
            "In US healthcare, VRI interpreters handle Protected Health Information (PHI) and must comply with HIPAA, which governs how that information is used, disclosed, and safeguarded. For interpreting, HIPAA reinforces confidentiality with concrete requirements: use only the covered entity's approved, secure video platform; interpret from a private location; access only the information needed for the encounter; and never disclose PHI to anyone not authorized to receive it. Both the audio and the video of a VRI session are PHI channels that must be protected.",
            "VRI raises HIPAA's Security Rule concerns because PHI travels and appears electronically. That means the platform must be encrypted and organization-approved (not a personal consumer video app unless it is authorized and configured for healthcare), the connection and device should be secured, and the visual environment must reveal no PHI — no prior notes, other patients' screens, or bystanders in frame. Screenshots and recordings of sessions are prohibited because they create unauthorized permanent copies of PHI.",
            "Compliance is a repeatable pre-session and in-session discipline. Worked example: before a VRI encounter an interpreter confirms they are on the approved encrypted platform, clears the desk of a prior patient's note, closes unrelated windows, and ensures the room is private and the door closed — protecting both what can be heard and what can be seen. A single lapse, like a visible note or a bystander, is a breach even if unintentional. HIPAA-compliant habits complete the ethics module and prepare you for the realistic case studies that follow.",
          ],
          terminology: [
            { term: "HIPAA", definition: "The US law governing the privacy and security of Protected Health Information." },
            { term: "PHI", definition: "Protected Health Information — identifiable health information that must be safeguarded." },
            { term: "Security Rule", definition: "HIPAA provisions governing the protection of electronic PHI, relevant to VRI." },
            { term: "Approved platform", definition: "An organization-authorized, encrypted video system required for compliant VRI." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Taking a screenshot of a patient's information during a VRI session to review later is:",
              options: ["Acceptable for learning", "A HIPAA violation — an unauthorized permanent copy of PHI", "Fine if names are cropped", "Allowed with a colleague"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m6",
      title: "VRI Case Studies",
      lessons: [
        {
          id: "l1",
          title: "Case Study: Emergency Room Encounter",
          duration: "15:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Apply VRI skills in a fast, high-stress ER encounter",
            "Manage urgency, movement, and technical pressure on video",
            "Maintain accuracy and role while the team works quickly",
          ],
          content: [
            "Emergency-room VRI is fast, loud, and visually chaotic: staff move in and out of frame, equipment beeps, and decisions happen quickly. The interpreter must render rapidly and completely, track who is speaking as the camera view shifts, and manage technology under pressure — all while staying strictly in role. This case study follows an ER encounter for a Spanish-speaking patient with abdominal pain.",
            "Case study — ER abdominal pain:\nThe portable VRI cart is wheeled to the bedside; the interpreter confirms audio and a clear view.\nInterpreter (greeting, brief): 'This is Spanish interpreter 5120. Everything is confidential; I will interpret in the first person. Please speak directly to each other.'\nPhysician: 'Where does it hurt the most?'\nInterpreter (renders); Patient (rendered, first person): 'Here, on the lower right side, since last night.'\nInterpreter (transparent cue): 'This is the interpreter — the patient indicated the lower right abdomen.'\nA nurse steps into frame and speaks off-camera; the interpreter: 'This is the interpreter — I could not see who spoke; may I confirm that was the nurse?'\nMid-encounter the video stutters; the interpreter: 'This is the interpreter — my video is unstable; I will continue in audio so we are not delayed.'",
            "Debrief: the interpreter kept pace with the ER's urgency without sacrificing completeness, rendered the patient in the first person, and transparently conveyed the essential pointing gesture (lower right abdomen) since it carried clinical meaning. They confirmed an unclear speaker rather than misattributing, and when video degraded they switched to audio decisively rather than delaying care. Notice they did not add reassurance or clinical opinions — the team leads, the interpreter interprets. This is ER VRI to standard: fast, complete, transparent, and in role.",
          ],
          terminology: [
            { term: "VRI cart", definition: "A mobile video unit brought to the bedside in hospital settings." },
            { term: "Gesture rendering", definition: "Transparently conveying an essential pointing or gesture that carries meaning." },
            { term: "Speaker confirmation", definition: "Verifying who spoke when the camera view does not make it clear." },
            { term: "Decisive fallback", definition: "Switching to audio promptly when video degrades so care is not delayed." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In the ER case study, when the video became unstable, the interpreter:",
              options: ["Kept trying to fix video while the team waited", "Transparently switched to audio so care was not delayed", "Ended the encounter", "Stopped interpreting"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Case Study: Mental Health Session",
          duration: "15:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply VRI skills in an emotionally sensitive session",
            "Preserve tone, affect, and register faithfully",
            "Maintain rapport and neutrality on camera",
          ],
          content: [
            "Mental-health VRI requires sensitivity, exact preservation of emotional content, and steady on-camera presence. The visual channel matters here — a therapist reads a patient's affect and vice versa — so framing, eye contact, and a calm demeanor support the therapeutic relationship. The interpreter must render tone and register faithfully, including silences and emotion, while remaining neutral and in role. This case study follows a therapy session for a Mandarin-speaking patient with depression.",
            "Case study — Therapy session:\nInterpreter (warm, composed, looking toward the lens): 'This is Mandarin interpreter 3308. Everything is confidential; I will interpret in the first person.'\nTherapist: 'How have you been feeling since our last session?'\nPatient (rendered, first person, conveying flat affect): 'I don't know... some days I can't get out of bed. Nothing feels worth it.'\nThe patient pauses and becomes tearful; the interpreter holds the pause rather than filling it, then renders the next words faithfully.\nTherapist: 'That sounds really hard. Can you tell me more about those days?'\nPatient (rendered): 'I just feel empty.'",
            "Debrief: the interpreter preserved the patient's exact words and flat, heavy tone without softening or brightening them — 'I just feel empty,' not a cleaned-up version — because emotional register is clinical information in mental health. They respected the meaningful silence instead of rushing it, kept a warm but neutral on-camera presence, and did not comfort, advise, or interpret the patient's tears into commentary. The interpreter faithfully rendered emotion while letting the therapist do the therapy. Fidelity to affect plus composed neutrality defines mental-health VRI.",
          ],
          terminology: [
            { term: "Affect", definition: "Observable emotional expression, which is clinically meaningful and must be preserved." },
            { term: "Register fidelity", definition: "Rendering tone and emotional level exactly as expressed." },
            { term: "Therapeutic silence", definition: "A meaningful pause the interpreter preserves rather than filling." },
            { term: "Composed neutrality", definition: "A warm but impartial on-camera presence that supports the session." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In the mental-health case study, the interpreter handled the patient's flat, heavy tone by:",
              options: ["Softening it to sound more positive", "Rendering the words and emotional register faithfully", "Summarizing the feelings", "Comforting the patient directly"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Case Study: Pediatrics Encounter",
          duration: "14:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply VRI skills in a pediatric visit with family present",
            "Manage a child, a parent, and a provider on camera",
            "Render for multiple speakers while staying in role",
          ],
          content: [
            "Pediatric VRI typically involves at least three parties — a child, a parent or guardian, and a provider — and the visual channel helps a young patient engage with a friendly face. The interpreter manages multiple speakers, renders age-appropriate language faithfully, and preserves who is speaking to whom, all without stepping into a caregiving or advising role. This case study follows a well-child visit for a Vietnamese-speaking family.",
            "Case study — Well-child visit:\nInterpreter (warm, looking toward the lens to engage the child): 'This is Vietnamese interpreter 7742. Everything is confidential; I will interpret in the first person.'\nPediatrician (to child): 'Can you show me how you jump?'\nInterpreter (renders warmly to the child); Child (rendered, first person): 'Like this!' (jumps on camera)\nParent (rendered): 'He has been coughing at night for a week, and he is not eating well.'\nInterpreter (managing turns): 'This is the interpreter — I will render the parent, then the doctor.'\nPediatrician: 'Any fever?' Parent (rendered): 'Yes, 38.5 two nights ago.'\nInterpreter (notes 38.5, renders exactly).",
            "Debrief: the interpreter engaged the child with warm delivery and simulated eye contact while faithfully rendering everyone — child, parent, and provider — in the first person, and managed turns so the three voices did not collide. The temperature (38.5) was captured and rendered exactly. Crucially, the interpreter did not answer for the parent, coach the child, or offer parenting or medical advice; they interpreted the provider's questions and the family's answers precisely. Warmth with multi-party discipline and strict role boundaries defines pediatric VRI.",
          ],
          terminology: [
            { term: "Multi-party rendering", definition: "Faithfully interpreting among a child, caregiver, and provider." },
            { term: "Age-appropriate delivery", definition: "Warm, clear rendering that engages a young patient without changing content." },
            { term: "Turn coordination", definition: "Managing three or more speakers so voices do not overlap." },
            { term: "Role boundary", definition: "Interpreting without answering for, coaching, or advising the family." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In the pediatrics case study, the interpreter engaged the child while:",
              options: ["Answering the doctor's questions for the parent", "Faithfully rendering all parties in the first person and managing turns", "Coaching the child what to say", "Giving parenting advice"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Case Study: Follow-Up Appointment",
          duration: "14:20",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Apply VRI skills in a routine follow-up visit",
            "Render medication changes and instructions precisely",
            "Confirm understanding transparently within role",
          ],
          content: [
            "Follow-up VRI visits are often information-dense: reviewing results, adjusting medications, and giving instructions. Accuracy on numbers, dosages, and next steps is paramount, and the visual channel helps when a provider shows a chart or a medication. The interpreter renders precisely, uses transparent clarification for anything ambiguous, and lets the provider confirm the patient's understanding rather than doing so themselves. This case study follows a diabetes follow-up for an Arabic-speaking patient.",
            "Case study — Diabetes follow-up:\nInterpreter (greeting): 'This is Arabic interpreter 6015. Everything is confidential; I will interpret in the first person.'\nProvider: 'Your A1C is 8.2, so we're increasing your metformin to 1000 milligrams twice a day.'\nInterpreter (notes A1C 8.2 / metformin 1000 mg BID; renders exactly).\nPatient (rendered, first person): 'I sometimes forget the evening dose.'\nProvider: 'Try taking it with dinner. Let's recheck in three months.'\nInterpreter (renders); then, an ambiguous term: 'This is the interpreter — the provider used a lab abbreviation; may I confirm the patient understood, or should the provider explain A1C?'\nProvider explains; interpreter renders the explanation.",
            "Debrief: the interpreter rendered the lab value (A1C 8.2), the exact new dosage (metformin 1000 mg twice daily), and the follow-up interval precisely, using notes so nothing was lost. When a lab abbreviation risked confusion, the interpreter did not define it themselves — they transparently prompted the provider to explain and then interpreted that explanation, staying in role. They did not remind the patient how to take medication or add their own encouragement; the provider gave the instruction, the interpreter conveyed it. Precise rendering plus transparent, in-role clarification completes the case studies. You are now ready for the 40-question final exam, which requires an 80% score to pass; on completion you receive a Creovixa-branded certificate with your name, completion date, certificate ID, and QR verification.",
          ],
          terminology: [
            { term: "Dosage precision", definition: "Rendering medication amounts and frequencies exactly, using notes." },
            { term: "Lab value", definition: "A clinical number (e.g., A1C) that must be rendered accurately." },
            { term: "Transparent clarification", definition: "Prompting the provider to explain a term rather than the interpreter defining it." },
            { term: "Understanding check", definition: "Confirmation of comprehension performed by the provider, not the interpreter." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In the follow-up case study, when a lab abbreviation risked confusion, the interpreter:",
              options: ["Defined it for the patient", "Transparently prompted the provider to explain it, then rendered the explanation", "Skipped it", "Reminded the patient how to take the medication"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "VRI Professional Skills — Final Exam",
    category: "Remote Interpreting",
    durationMinutes: 40,
    passingScore: 80,
    questions: [
      { id: "q1", question: "VRI is best defined as:", options: ["Interpreting over a live video connection", "Written translation of documents", "Audio-only interpreting", "In-person interpreting only"], answer: 0 },
      { id: "q2", question: "The feature that distinguishes VRI from OPI is:", options: ["The telephone", "A live visual channel", "The absence of an interpreter", "The lack of ethics"], answer: 1 },
      { id: "q3", question: "'PHI' stands for:", options: ["Public Health Index", "Protected Health Information", "Private Hospital Interpreter", "Patient Health Insurance"], answer: 1 },
      { id: "q4", question: "VRI is especially preferred over OPI when:", options: ["The call is a quick refill", "Visual context (e.g., signed language or a shown injury) improves accuracy", "No interpreter is needed", "Audio is the only concern"], answer: 1 },
      { id: "q5", question: "Compared with OPI, VRI additionally requires managing:", options: ["The code of ethics", "Camera, lighting, background privacy, and technology", "The need for accuracy", "Confidentiality alone"], answer: 1 },
      { id: "q6", question: "A limitation unique to VRI is that:", options: ["It cannot interpret", "The narrow camera frame can miss off-screen activity and tech can fail disruptively", "It never supports signing", "It removes accuracy needs"], answer: 1 },
      { id: "q7", question: "Managing camera, lighting, and a private background in VRI is:", options: ["Optional and unrelated to interpreting", "Part of the interpreter's responsibility because it protects the encounter", "The provider's job only", "Unnecessary if audio works"], answer: 1 },
      { id: "q8", question: "Ideal VRI camera placement is:", options: ["Below the face, angled up", "At eye level, centered", "Far off to one side", "Handheld"], answer: 1 },
      { id: "q9", question: "For signed-language VRI, the frame must:", options: ["Show only the face", "Be wide enough to show the full signing space including the hands", "Be as close as possible", "Cut off at the neck"], answer: 1 },
      { id: "q10", question: "To simulate eye contact on video, the interpreter should:", options: ["Stare only at their own image", "Look toward the camera lens at key moments while still reading participants", "Never look at the screen", "Close the video window"], answer: 1 },
      { id: "q11", question: "The best on-camera clothing is:", options: ["Fine stripes or busy patterns", "Solid, muted colors", "Bright neon", "Reflective jewelry"], answer: 1 },
      { id: "q12", question: "'Moiré' refers to:", options: ["A camera brand", "A shimmer that fine patterns cause on video", "A lighting technique", "A type of headset"], answer: 1 },
      { id: "q13", question: "To be clearly visible, the interpreter should:", options: ["Sit with a bright window behind them", "Face the main light source so the face is evenly lit", "Use one harsh overhead light", "Turn off lighting"], answer: 1 },
      { id: "q14", question: "Backlighting is a problem because it:", options: ["Improves the image", "Turns the face into a dark silhouette", "Reduces bandwidth", "Adds echo"], answer: 1 },
      { id: "q15", question: "A VRI background must above all be:", options: ["Colorful and interesting", "Plain and free of any confidential information", "Full of credentials", "A busy office scene"], answer: 1 },
      { id: "q16", question: "The most reliable connection for VRI is generally:", options: ["Weak Wi-Fi far from the router", "Wired Ethernet or a strong, steady connection", "A shared line during large downloads", "Any connection, since speed is irrelevant"], answer: 1 },
      { id: "q17", question: "The most common fix for audio echo is to:", options: ["Speak louder", "Switch to a headset so speaker output stops reaching the mic", "Turn off the camera", "Move away from the mic"], answer: 1 },
      { id: "q18", question: "For signed-language VRI, a clear camera image is:", options: ["Only cosmetic", "A comprehension requirement", "Unnecessary if audio works", "Handled entirely by the platform"], answer: 1 },
      { id: "q19", question: "If video freezes but audio works, the interpreter should:", options: ["Silently keep trying to fix video", "Transparently state the issue and continue in audio", "End the session", "Ignore participants"], answer: 1 },
      { id: "q20", question: "A pre-session tech check should verify:", options: ["Only the camera", "Camera, microphone, connection, and platform login", "Nothing in advance", "Only the background color"], answer: 1 },
      { id: "q21", question: "When a provider points and says 'here,' the interpreter should:", options: ["Ignore the gesture", "Render 'here' and transparently note the location since it is essential to meaning", "Guess the diagnosis", "Describe the patient's mood"], answer: 1 },
      { id: "q22", question: "The interpreter reads visual cues in order to:", options: ["Narrate the patient's emotions aloud", "Interpret accurately, without editorializing the cues", "Replace the spoken message", "Diagnose the patient"], answer: 1 },
      { id: "q23", question: "Video latency affects turn-taking by:", options: ["Removing the need for turns", "Causing accidental overlap, managed with clear cues and pauses", "Making rendering unnecessary", "Speeding up the visit"], answer: 1 },
      { id: "q24", question: "If a provider holds up a medication bottle the interpreter cannot read, the interpreter should:", options: ["Guess from the label", "Ask the provider to state the name, then interpret it exactly", "Describe the bottle", "Skip it"], answer: 1 },
      { id: "q25", question: "In a multi-party call, unclear speaker identity should be:", options: ["Guessed", "Transparently confirmed before rendering", "Treated as anonymous", "Ignored"], answer: 1 },
      { id: "q26", question: "Platform tools like pinning or spotlighting help the interpreter:", options: ["Record the session", "Focus on and track the active speaker", "Change the ethics", "Skip attribution"], answer: 1 },
      { id: "q27", question: "In VRI, confidentiality applies to:", options: ["Only what is heard", "Both what is heard and what is seen on camera or screen", "Only medical calls", "Nothing after the session"], answer: 1 },
      { id: "q28", question: "A confidentiality risk unique to VRI is:", options: ["Hearing the patient", "Documents or people visible on camera disclosing information", "Using a headset", "Interpreting at all"], answer: 1 },
      { id: "q29", question: "Moving to video does NOT change the interpreter's:", options: ["Camera angle", "Code of ethics and accuracy duty", "Lighting", "Background"], answer: 1 },
      { id: "q30", question: "If a provider asks the interpreter to 'just explain the consent form,' conduct means:", options: ["Explaining it", "Declining the out-of-scope task and interpreting the provider's explanation", "Signing the form", "Advising the patient"], answer: 1 },
      { id: "q31", question: "On-camera neutrality includes:", options: ["Showing personal reactions to statements", "Controlling facial expression so it conveys the message, not the interpreter's judgment", "Advising the weaker party", "Debating the provider"], answer: 1 },
      { id: "q32", question: "HIPAA requires VRI to use:", options: ["Any personal video app", "An organization-approved, encrypted platform", "No platform at all", "A public chat room"], answer: 1 },
      { id: "q33", question: "Taking a screenshot of patient information during a session to review later is:", options: ["Acceptable for learning", "A HIPAA violation — an unauthorized permanent copy of PHI", "Fine if names are cropped", "Allowed with a colleague"], answer: 1 },
      { id: "q34", question: "In the ER case study, when video became unstable, the interpreter:", options: ["Kept trying to fix video while the team waited", "Transparently switched to audio so care was not delayed", "Ended the encounter", "Stopped interpreting"], answer: 1 },
      { id: "q35", question: "In the mental-health case study, the patient's flat, heavy tone was:", options: ["Softened to sound positive", "Rendered faithfully because emotional register is clinical information", "Summarized", "Replaced with comfort"], answer: 1 },
      { id: "q36", question: "In the pediatrics case study, the interpreter engaged the child while:", options: ["Answering the doctor for the parent", "Faithfully rendering all parties and managing turns", "Coaching the child", "Giving parenting advice"], answer: 1 },
      { id: "q37", question: "In the follow-up case study, an ambiguous lab abbreviation was handled by:", options: ["The interpreter defining it", "Prompting the provider to explain it, then rendering the explanation", "Skipping it", "Reminding the patient about medication"], answer: 1 },
      { id: "q38", question: "A good audio setup for VRI uses:", options: ["Laptop speakers on full volume", "A headset with a microphone", "A speakerphone in a shared room", "No microphone"], answer: 1 },
      { id: "q39", question: "The safest way to handle a medication dosage on video is to:", options: ["Round it", "Note and render it exactly, clarifying if needed", "Summarize it", "Omit it if unsure"], answer: 1 },
      { id: "q40", question: "Across all VRI encounters, the interpreter's core standard is:", options: ["Speed over accuracy", "Complete, faithful, first-person rendering with transparent management and dual-channel privacy", "Helpful advice when needed", "Summarizing to save time"], answer: 1 },
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
      title: "Introduction to OPI",
      lessons: [
        {
          id: "l1",
          title: "What is OPI?",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Define over-the-phone interpreting and how it works",
            "Distinguish OPI from in-person and video interpreting",
            "Identify the settings where OPI is used",
          ],
          content: [
            "Over-the-phone interpreting (OPI) is spoken-language interpreting delivered by telephone, connecting a limited-English-proficient (LEP) speaker and an English speaker through an interpreter on the line. It is almost always consecutive: one person speaks, pauses, and the interpreter renders the message, then the other responds. Calls arrive through a language-services platform that routes them by language, and the interpreter joins already connected to both parties.",
            "OPI differs from in-person and video interpreting in one decisive way: there are no visual cues. You cannot see facial expressions, gestures, documents, or who is in the room. Everything you know about the encounter arrives through sound, and everything the parties know about you arrives through your voice. This makes voice control, active listening, and verbal signposting the core professional skills of the medium.",
            "OPI is used everywhere immediate language access is needed: hospitals and clinics, 911 and emergency lines, insurance and benefits calls, banks, utilities, schools, and government social services. Its strengths are speed and availability — an interpreter for a rare language can be on the line in seconds, at any hour — which is exactly why professional call handling matters: the interpreter is often the only bridge between a caller and urgent help.",
          ],
          terminology: [
            { term: "OPI", definition: "Over-the-Phone Interpreting — spoken-language interpreting delivered by telephone." },
            { term: "LEP", definition: "Limited English Proficient — a person who cannot communicate effectively in English." },
            { term: "Consecutive interpreting", definition: "The speaker pauses so the interpreter can render each segment in turn." },
            { term: "Language platform", definition: "The service that routes calls to interpreters by language and connects all parties." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The defining feature of OPI compared with in-person interpreting is that it:",
              options: ["Is always simultaneous", "Has no visual cues — everything is conveyed by sound", "Requires a video screen", "Only serves medical settings"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Benefits and Challenges",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain the main benefits of OPI for clients and patients",
            "Identify the challenges unique to audio-only interpreting",
            "Apply strategies that turn challenges into manageable habits",
          ],
          content: [
            "OPI's benefits are substantial. It provides on-demand access to hundreds of languages within seconds, around the clock, without travel time or scheduling. It is cost-effective and scalable, letting a small clinic or a national call center serve any language a caller speaks. For rare languages and after-hours emergencies, OPI is frequently the only realistic way to provide meaningful language access, which is also a legal obligation for many organizations.",
            "The challenges are the flip side of the same coin. Without visual cues, it is harder to tell who is speaking, when someone has finished, or whether a message was understood. Audio problems — background noise, weak signals, speakerphones, crosstalk — degrade accuracy. The interpreter cannot see documents being referenced or a provider pointing to a body part, and cannot read the emotional room except through tone. Fatigue is real in high-volume queues where calls arrive back to back.",
            "Professional OPI turns these challenges into routines. You compensate for missing sight with explicit verbal signals ('This is the interpreter — go ahead'), disciplined turn management, targeted note-taking for numbers and names, and transparent requests to repeat when audio fails. Recognizing the medium's limits is not a weakness; it is what lets a skilled interpreter deliver accurate, safe communication using voice alone.",
          ],
          terminology: [
            { term: "On-demand access", definition: "The ability to reach an interpreter within seconds, at any time." },
            { term: "Language access", definition: "The provision of interpreting so LEP individuals can use services — often legally required." },
            { term: "Crosstalk", definition: "Multiple people speaking at once, which garbles audio and accuracy." },
            { term: "Verbal signposting", definition: "Spoken cues that tell parties what is happening in the absence of visual cues." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A challenge specific to OPI is that the interpreter:",
              options: ["Can see documents being discussed", "Cannot rely on visual cues to manage turns or gauge understanding", "Always works simultaneously", "Never faces audio problems"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Interpreter Role",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "State the interpreter's role and its boundaries on OPI calls",
            "Explain the conduit model and when limited clarification fits",
            "Recognize actions that fall outside the interpreter's scope",
          ],
          content: [
            "The OPI interpreter's role is to enable communication by faithfully rendering everything each party says, in the first person, without adding, omitting, or changing meaning. The core mental model is the 'conduit': the interpreter is the channel through which two people talk to each other, not a participant with opinions. On the phone this role must be actively announced and protected, because parties cannot see the interpreter and may drift into treating them as an assistant, advocate, or decision-maker.",
            "The role has defined edges. The interpreter may transparently manage the flow (asking for one speaker at a time), request clarification of an unclear term, and note a possible cultural misunderstanding for the parties to resolve — always openly and briefly. The interpreter does not give advice, answer questions on the provider's behalf, fill out forms, offer personal opinions, or soften or 'improve' what someone said. When a party asks the interpreter directly for help beyond interpreting, the professional response is to interpret that request to the other party rather than act on it.",
            "Staying in role is what makes the interpreter trustworthy and the communication accurate. Case in point: if a caller says to the interpreter, 'Just tell them I already paid, they'll believe you,' the interpreter does not vouch for anyone — they interpret the caller's statement to the English speaker and let the parties handle it. This module has established what OPI is and the role you play; the next modules build the concrete skills, starting with how to open a call.",
          ],
          terminology: [
            { term: "Conduit model", definition: "The interpreter as a faithful channel between two speakers, not a participant." },
            { term: "Scope of practice", definition: "The boundaries of what an interpreter may and may not do in the role." },
            { term: "First person", definition: "Rendering each speaker's words as 'I', keeping them in direct dialogue." },
            { term: "Advocacy limit", definition: "The restriction against taking sides or acting on a party's behalf." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If a caller asks the interpreter to personally vouch that they 'already paid,' the interpreter should:",
              options: ["Confirm it to be helpful", "Interpret the caller's statement to the other party and stay neutral", "Refuse and end the call", "Give the caller advice"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Call Opening Protocol",
      lessons: [
        {
          id: "l1",
          title: "Standard Greeting",
          duration: "13:10",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Deliver a concise, complete standard OPI greeting",
            "State ID, confidentiality, and first-person interpreting up front",
            "Use a practice script to standardize your opening",
          ],
          content: [
            "The standard greeting is the interpreter's opening pre-session, and on the phone it does the work that a handshake and eye contact would do in person. In a few seconds it identifies you, reassures the caller of confidentiality, and sets the ground rules that keep the call accurate. A crisp, consistent greeting also signals competence to the client and calms an anxious LEP caller who may never have used an interpreter before.",
            "A complete greeting covers: your interpreter ID or name, the language you are providing, a confidentiality assurance, a statement that you will interpret everything in the first person, and a request to speak directly to each other in short segments. You keep it brief — the client is waiting to work — while making sure nothing essential is skipped.",
            "Practice script (English side): 'Thank you for calling. This is Spanish interpreter ID 4471. Everything said will be kept confidential. I will interpret everything in the first person, so please speak directly to each other and pause after a few sentences so I can interpret. Go ahead, please.' Practice script (rendered to the LEP caller in their language): the same content — ID, confidentiality, first-person, pacing — so both parties start with identical expectations. Rehearse your greeting until it is automatic in both languages.",
          ],
          terminology: [
            { term: "Pre-session", definition: "The interpreter's opening statement of identity, confidentiality, and process." },
            { term: "Interpreter ID", definition: "A number or name stated at the start of a call for accountability and logging." },
            { term: "Confidentiality assurance", definition: "The spoken promise that everything said on the call is kept private." },
            { term: "Segment", definition: "A short chunk of speech the speaker completes before pausing for interpretation." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A complete standard greeting includes ID, confidentiality, first-person interpreting, and:",
              options: ["The interpreter's opinion of the case", "A request to speak directly to each other in short segments", "The caller's full medical history", "Payment details"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Verifying Participants",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Confirm who is on the line and in what role",
            "Verify the correct language and dialect before proceeding",
            "Handle missing or additional participants professionally",
          ],
          content: [
            "Because you cannot see the room, verifying participants is a deliberate step. At the start you confirm that both the requesting party (for example, the provider or agent) and the LEP speaker are present and can hear you, and you note their roles. A quick check — 'This is the interpreter; I can hear the agent and the caller, is everyone able to hear me clearly?' — prevents the common problem of interpreting into a void because someone stepped away or is muted.",
            "Language and dialect verification protects the whole call. If the caller does not respond as expected, confirm the language early: many callers request 'Spanish' when they need a specific indigenous language, or 'Chinese' when they need Cantonese rather than Mandarin. It is far better to identify a mismatch in the first thirty seconds and transfer to the correct interpreter than to struggle through an inaccurate call.",
            "Participants can change mid-call. A provider may bring in a colleague, or a family member may take the phone. When you hear a new voice, briefly and transparently confirm who has joined ('This is the interpreter — may I confirm who is now on the line?') so you always know whom you are rendering. Practice script: 'This is the interpreter. Before we begin, I'd like to confirm I'm speaking with the patient and the nurse — is that correct, and can you both hear me?'",
          ],
          terminology: [
            { term: "Requesting party", definition: "The English-speaking professional (provider, agent) who initiated the interpreted call." },
            { term: "Dialect verification", definition: "Confirming the specific language variety the caller actually needs." },
            { term: "Role confirmation", definition: "Establishing who each participant is and their part in the encounter." },
            { term: "Transfer", definition: "Routing the call to a different interpreter when the language or dialect does not match." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If the caller does not respond as expected at the start of a call, the interpreter should first:",
              options: ["Keep interpreting anyway", "Verify the correct language or dialect before proceeding", "End the call", "Guess the language"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Establishing Control",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Set pacing and turn-taking expectations at the opening",
            "Use transparent techniques to keep control by voice",
            "Recover control when a call runs away",
          ],
          content: [
            "'Control' in OPI does not mean dominating the call; it means managing the flow so that everything can be interpreted accurately. The interpreter establishes control at the opening by asking parties to speak in short segments and pause, and to speak one at a time. Because there are no visual cues to regulate turns, the interpreter must set these expectations verbally and then reinforce them consistently throughout the call.",
            "Transparent control techniques include a brief, neutral interruption when a speaker goes too long ('This is the interpreter — I need to interpret before we continue'), a request for one speaker at a time during crosstalk, and a gentle pacing cue when someone speaks too fast. Because you always speak in the third person when managing the call ('the interpreter'), everyone understands these are process requests, not the interpreter joining the conversation.",
            "Sometimes a call runs away — a party delivers a long monologue or two people argue over each other. Recovering control is done calmly and transparently: wait for a natural micro-pause, insert 'This is the interpreter,' render what you have, and re-state the pacing request. Practice script: 'This is the interpreter. To make sure nothing is missed, please pause after two or three sentences so I can interpret everything accurately.' Establishing and recovering control is the backbone of every well-run OPI call.",
          ],
          terminology: [
            { term: "Managing the flow", definition: "Regulating pace and turns so every message can be interpreted accurately." },
            { term: "Transparent interruption", definition: "A brief, announced intervention ('This is the interpreter') to manage the call." },
            { term: "Third-person intervention", definition: "Speaking as 'the interpreter' to signal a process request, not participation." },
            { term: "Pacing cue", definition: "A request that a speaker slow down or pause to allow accurate rendering." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a speaker delivers too long a passage to interpret accurately, the interpreter should:",
              options: ["Summarize the gist", "Transparently interrupt as 'the interpreter' and ask for shorter segments", "Interpret only the ending", "Stay silent and hope to remember"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m3",
      title: "Accuracy & Message Conversion",
      lessons: [
        {
          id: "l1",
          title: "First-Person Interpreting",
          duration: "12:50",
          type: "video",
          completed: false,
          videoUrl: V.c,
          objectives: [
            "Explain why interpreters render speech in the first person",
            "Apply first-person interpreting consistently",
            "Handle confusion about who is speaking on an audio call",
          ],
          content: [
            "First-person interpreting means the interpreter speaks as each party does — 'I have chest pain,' not 'She says she has chest pain.' This keeps the two speakers in direct dialogue with each other, preserves the accuracy and tone of the original, and keeps the interpreter out of the exchange as a commentator. It is the professional standard in every setting, and on the phone it is especially important because parties already tend to talk about the interpreter rather than to each other.",
            "Applied consistently, first person prevents distortion. Reporting speech ('he says he thinks...') invites the interpreter to summarize and subtly editorialize, and it doubles the length of every turn. Direct first-person rendering is cleaner, faster, and more faithful. The interpreter only steps out of first person to speak as themselves — always as 'the interpreter' — when managing the call or requesting clarification.",
            "On audio-only calls, first person can occasionally confuse a party about who is talking. The fix is set up in the greeting ('I will interpret everything in the first person') and reinforced with clear voice and, when truly necessary, a brief transparent clarification. Worked example: the patient says, in their language, 'I stopped taking the pills.' You render, in English, 'I stopped taking the pills' — not 'the patient says she stopped' — so the provider hears the patient's own statement directly.",
          ],
          terminology: [
            { term: "First-person interpreting", definition: "Rendering each speaker's words as 'I', keeping parties in direct dialogue." },
            { term: "Reported speech", definition: "The 'he says / she says' style interpreters avoid because it invites distortion." },
            { term: "Register", definition: "The tone and formality of speech, which first-person rendering helps preserve." },
            { term: "Direct address", definition: "Parties speaking to each other rather than about the interpreter." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "First-person interpreting means the interpreter renders a patient's statement as:",
              options: ["'She says she stopped taking the pills'", "'I stopped taking the pills'", "'The patient reports non-compliance'", "'They probably meant they stopped'"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Accuracy Standards",
          duration: "13:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Define accuracy and completeness in interpreting",
            "Preserve meaning, tone, and register faithfully",
            "Use note-taking to protect numbers, names, and details",
          ],
          content: [
            "Accuracy is the interpreter's highest obligation: rendering the complete message faithfully, preserving meaning, tone, and register, without adding, omitting, or changing anything. Completeness matters as much as word choice — profanity, hesitations, emotional tone, and 'I don't know' answers all carry information and must be conveyed. The interpreter renders what is said, not a cleaned-up or improved version of it.",
            "Accuracy is about meaning, not word-for-word literalism. The goal is dynamic equivalence: conveying what the speaker actually meant in natural target-language phrasing, including idioms and culturally bound expressions. A literal rendering that distorts the intent is an error just as much as an omission. The interpreter also preserves register — a formal explanation stays formal, a blunt statement stays blunt.",
            "On the phone, targeted note-taking is the practical guardian of accuracy. Numbers, dosages, dates, addresses, and proper names are easy to lose by ear, so you jot them as you hear them. Worked example: an agent says, 'Your reference number is 4-0-9-2-7 and the appointment is March 3rd at 2:15.' You note '40927 / Mar 3, 2:15' and render it exactly, reading a critical number back when precision is essential. Memory alone is not an accuracy strategy.",
          ],
          terminology: [
            { term: "Accuracy", definition: "Faithful, complete rendering of meaning, tone, and register without addition or omission." },
            { term: "Completeness", definition: "Conveying everything said, including tone, hesitations, and profanity." },
            { term: "Dynamic equivalence", definition: "Rendering the intended meaning naturally rather than word-for-word." },
            { term: "Register", definition: "The level of formality and tone of the original message." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Preserving accuracy means the interpreter should render profanity and emotional tone by:",
              options: ["Softening or removing them to be polite", "Conveying them faithfully because they carry meaning", "Summarizing them", "Explaining them to the parties"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Omissions and Additions",
          duration: "12:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Identify omission and addition errors and their causes",
            "Explain why both compromise accuracy and safety",
            "Apply strategies to prevent both under call pressure",
          ],
          content: [
            "Omissions (leaving something out) and additions (putting something in) are the two most common accuracy failures, and both are serious. Omissions often come from memory overload, speakers who run too long, or a temptation to condense under time pressure; additions come from the urge to explain, soften, or 'help.' In healthcare and emergency calls, a single omitted dosage or added assumption can change the outcome, which is why the standard is zero tolerance for both.",
            "Not every difference is an error. A justified omission is rare and transparent — for example, a false start the speaker themselves abandons. But 'the patient rambled so I gave the main point' is an omission error, and 'I added that they should rest because it seemed helpful' is an addition error. The interpreter's judgment is applied to how to render meaning faithfully, never to what to leave in or out for the parties.",
            "Prevention is procedural. Keep speakers to short segments so nothing overflows your memory; take notes on numbers and lists; and when you realize you missed something, correct it transparently: 'The interpreter needs to add a phrase that was omitted.' Worked example: if you rendered a symptom list but forgot 'and dizziness,' you say, 'This is the interpreter — correction: the patient also said dizziness.' Owning and fixing a slip immediately is professional, not embarrassing.",
          ],
          terminology: [
            { term: "Omission", definition: "Leaving out part of the message — a common and dangerous accuracy failure." },
            { term: "Addition", definition: "Inserting words or meaning the speaker did not say." },
            { term: "Condensing", definition: "Improperly shortening a message, a frequent source of omissions." },
            { term: "Transparent correction", definition: "Openly fixing an interpreting error as soon as it is noticed." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If you realize you left out part of a patient's symptom list, you should:",
              options: ["Leave it, to avoid confusion", "Transparently correct it: 'This is the interpreter — correction...'", "Wait to see if it matters", "Add extra advice to compensate"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Clarification Techniques",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Request clarification transparently and neutrally",
            "Distinguish clarifying from paraphrasing or explaining",
            "Keep interventions brief and interpret the result",
          ],
          content: [
            "When something is genuinely unclear — a mumbled word, an unknown term, an ambiguous pronoun, or an acronym — the interpreter clarifies rather than guesses. The technique is transparent and specific: 'This is the interpreter. I need to ask the doctor to repeat the last dosage.' You identify yourself, name exactly what you need, keep it brief, and then interpret both your request and the answer so nothing happens off the record for either party.",
            "Clarifying is not paraphrasing or explaining. The interpreter never decides what a speaker 'probably meant' or adds their own explanation of a term; they ask the speaker to restate or define it and then render that. If a provider uses jargon the patient will not know, the interpreter does not substitute their own definition — they may transparently note that a term may be unfamiliar and let the provider explain, then interpret the explanation.",
            "Clarification should be used purposefully, not for every minor uncertainty, so the call stays efficient. Reserve it for points where guessing would risk accuracy. Practice script: 'This is the interpreter. The caller used a regional term for a document; may I ask them to describe it so I can interpret it precisely?' Then you interpret the caller's description. Used this way, clarification protects accuracy without the interpreter ever stepping out of the neutral, faithful role.",
          ],
          terminology: [
            { term: "Clarification", definition: "A transparent request to a speaker to repeat, define, or specify an unclear point." },
            { term: "Transparency", definition: "Announcing an intervention to both parties so nothing is off the record." },
            { term: "Paraphrase", definition: "Restating in different words — avoided in place of faithful rendering." },
            { term: "Neutral intervention", definition: "A brief process request that does not add the interpreter's own content." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a term is unclear, the correct clarification technique is to:",
              options: ["Guess the most likely meaning", "Transparently ask the speaker to clarify, then interpret their answer", "Substitute your own definition", "Skip the unclear part"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m4",
      title: "Call Management",
      lessons: [
        {
          id: "l1",
          title: "Turn Taking",
          duration: "12:40",
          type: "video",
          completed: false,
          videoUrl: V.d,
          objectives: [
            "Manage speaking turns without visual cues",
            "Signal turn transitions clearly by voice",
            "Keep segments short enough for accurate rendering",
          ],
          content: [
            "Turn-taking is the mechanics of who speaks when, and on the phone the interpreter manages it entirely by ear. The goal is a rhythm of short segments: a speaker talks for two or three sentences, pauses, the interpreter renders, and the other party responds. This rhythm keeps each segment within the interpreter's accurate memory and prevents the pileups that cause omissions.",
            "Because no one can see a raised hand or a nod, the interpreter uses clear voice signals to manage turns. A slight pause after rendering invites the next speaker; a brief 'This is the interpreter, go ahead' hands the floor explicitly when needed. Setting the expectation in the greeting — 'please pause after a few sentences' — does most of the work, and gentle reinforcement handles the rest.",
            "Worked example: a benefits agent explains three eligibility rules in one long breath. Rather than let it overflow, the interpreter waits for the first natural pause, renders what was said, and cues: 'This is the interpreter — please continue with the next point.' Good turn-taking feels invisible to the parties; they simply experience a smooth conversation, which is exactly the sign of a skilled interpreter at work.",
          ],
          terminology: [
            { term: "Turn-taking", definition: "Managing the sequence of who speaks and when so each turn can be interpreted." },
            { term: "Segment length", definition: "The amount of speech before a pause; kept short for accuracy." },
            { term: "Floor", definition: "The right to speak, handed between parties by the interpreter's cues." },
            { term: "Verbal signal", definition: "A spoken cue that manages turns in place of a visual gesture." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Effective OPI turn-taking depends most on:",
              options: ["Interpreting several minutes at once", "A rhythm of short segments managed by clear voice cues", "Visual hand signals", "Letting the louder party dominate"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Interruptions",
          duration: "12:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Interrupt transparently and professionally when necessary",
            "Manage crosstalk and simultaneous speakers",
            "Minimize the need to interrupt through good setup",
          ],
          content: [
            "Sometimes the interpreter must interrupt — a speaker runs too long, two people talk at once, or something needs clarification. A professional interruption is transparent and neutral: you identify yourself as 'the interpreter,' state the need briefly, and resolve it. 'This is the interpreter — I need to interpret before we continue' is understood as a process request, not the interpreter joining the conversation or taking sides.",
            "Crosstalk — two or more people speaking simultaneously — is the classic OPI interruption problem, because you cannot interpret two voices at once and callers cannot see each other to yield. The technique is to wait for a micro-pause, insert 'This is the interpreter — please, one speaker at a time,' render what you captured, and then invite the parties to continue in order. You never pick the louder voice or silently drop one party's words.",
            "The best interruption is the one you never need. Strong openings that set pacing and one-at-a-time expectations dramatically reduce crosstalk. When interruptions are necessary, keep them short, calm, and consistent so parties learn the rhythm. Practice script: 'This is the interpreter. I heard both of you speak at once and want to capture everything accurately — please go one at a time, starting with the caller.'",
          ],
          terminology: [
            { term: "Transparent interruption", definition: "An announced, neutral intervention to manage the call." },
            { term: "Crosstalk", definition: "Two or more people speaking at once, which cannot be interpreted accurately." },
            { term: "Micro-pause", definition: "A brief natural gap the interpreter uses to insert a process request." },
            { term: "One speaker at a time", definition: "The rule the interpreter enforces to keep audio interpretable." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "During crosstalk, the interpreter should:",
              options: ["Interpret whoever is louder", "Wait for a pause and ask, as 'the interpreter,' for one speaker at a time", "Silently drop one party", "Stop interpreting entirely"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Fast Speakers",
          duration: "12:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Manage speakers who talk too quickly for accurate rendering",
            "Combine pacing requests with note-taking",
            "Protect accuracy without embarrassing the speaker",
          ],
          content: [
            "Fast speakers are common on high-volume calls — an agent reading a script, a provider in a hurry, or an anxious caller. Speed threatens accuracy because it overloads memory and blurs numbers and names. The interpreter's job is to slow the pace enough to render everything faithfully, using transparent pacing requests rather than trying to keep up and dropping content.",
            "The primary tool is a neutral pacing cue: 'This is the interpreter — please slow down slightly so I can interpret everything accurately.' Paired with short segments, this usually solves the problem. Note-taking is the second tool: even at speed, capturing numbers, dates, and key nouns lets you render them precisely. If a speaker cannot slow down, you break in more frequently at natural pauses rather than absorbing a flood.",
            "Handle it respectfully so the speaker does not feel criticized. Framing it around accuracy ('so nothing is missed') keeps it professional. Worked example: an insurance agent rattles off a policy number, effective date, and premium in one breath; the interpreter notes them, then says, 'This is the interpreter — to confirm accurately, may I read the numbers back?' Managing fast speakers is not about slowing the call for its own sake; it is about protecting the completeness callers depend on.",
          ],
          terminology: [
            { term: "Pacing request", definition: "A transparent ask for a speaker to slow down for accuracy." },
            { term: "Memory load", definition: "The amount of information held before rendering; overloaded by fast speech." },
            { term: "Read-back", definition: "Repeating critical numbers to confirm accuracy." },
            { term: "Chunking", definition: "Breaking rapid speech into short interpretable segments." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The best first response to a speaker who talks too fast is to:",
              options: ["Interpret only part of what they say", "Transparently ask them to slow down for accuracy and take notes", "Match their speed and hope to keep up", "Tell them they are hard to understand"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Long Responses",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Manage speakers who deliver long, unbroken passages",
            "Use note-taking and transparent segmenting",
            "Render long content completely without summarizing",
          ],
          content: [
            "Long responses — a patient recounting a full history, a caller telling a story, a provider giving detailed instructions — are a core OPI challenge because they can exceed what memory holds accurately. The wrong response is to summarize; the right response is to segment the speech and render it in complete pieces. The interpreter manages length transparently rather than silently condensing.",
            "Two techniques work together. First, prevent overflow by politely segmenting: at a natural pause you say, 'This is the interpreter — let me interpret that portion before you continue,' render it fully, and invite the rest. Second, when you cannot interrupt (an uninterruptible emotional account, for example), use structured note-taking — capturing the sequence, numbers, and key points — so you can render the whole passage accurately afterward.",
            "The standard remains completeness: everything the speaker said, rendered faithfully, even if it takes several segments. Worked example: a caller describes a two-week symptom timeline in one long turn; the interpreter takes brief chronological notes (day 1 fever, day 4 rash, day 10 worse) and either segments the delivery or renders the full timeline from notes without dropping a single stage. Completing this module, you now have the tools to keep any call flowing accurately — next is delivering it all with professional service.",
          ],
          terminology: [
            { term: "Segmenting", definition: "Breaking a long passage into interpretable pieces with transparent cues." },
            { term: "Structured notes", definition: "Organized notes (sequence, numbers, key points) that support accurate rendering." },
            { term: "Summarizing", definition: "Improperly shortening content — never a substitute for complete rendering." },
            { term: "Chronology", definition: "The time order of events, preserved when interpreting a long account." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a caller gives a very long response, the interpreter should:",
              options: ["Summarize the main idea", "Segment it or use notes to render everything completely", "Interpret only the first and last parts", "Ask them to write it down instead"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m5",
      title: "Customer Service",
      lessons: [
        {
          id: "l1",
          title: "Professional Tone",
          duration: "12:30",
          type: "video",
          completed: false,
          videoUrl: V.e,
          objectives: [
            "Project professionalism through voice alone",
            "Balance warmth with neutrality",
            "Represent the language-services provider well",
          ],
          content: [
            "On an audio-only call, tone of voice is the interpreter's entire professional presence. A clear, calm, courteous voice conveys competence and puts an anxious caller at ease; a rushed, flat, or irritated tone undermines trust even when the words are accurate. Professional tone means good enunciation, a steady pace, appropriate volume, and a warmth that reassures without becoming personal.",
            "The balance is warmth with neutrality. The interpreter can sound kind and reassuring in delivery while staying strictly neutral in content — never advising, never taking sides. Crucially, the interpreter conveys the speakers' tone rather than substituting their own: if a caller is angry, the interpreter renders the anger faithfully in a controlled professional voice, not by becoming angry themselves. Tone carries the speaker's emotion; the interpreter's own manner stays composed.",
            "The interpreter is often the human voice of a language-services company, and every call reflects on that provider. Reliability, courtesy, and a professional greeting and closing build the client relationship as much as accuracy does. Worked example: a frustrated caller snaps at the beginning of a call; the interpreter keeps a warm, even tone, faithfully interprets the caller's frustration to the agent, and never lets the caller's mood degrade their own professionalism.",
          ],
          terminology: [
            { term: "Professional tone", definition: "A clear, calm, courteous voice that conveys competence over the phone." },
            { term: "Warmth with neutrality", definition: "Sounding kind while keeping content strictly impartial." },
            { term: "Tone transfer", definition: "Conveying the speaker's emotion without adopting it personally." },
            { term: "Provider representation", definition: "Reflecting well on the language-services company on every call." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a caller sounds angry, the interpreter should:",
              options: ["Become angry to match them", "Faithfully convey the anger while keeping their own tone composed", "Soften the caller's words", "Refuse to interpret the emotion"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Active Listening",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply active listening to capture full meaning by ear",
            "Use focus and note-taking to avoid missing content",
            "Confirm understanding without overstepping the role",
          ],
          content: [
            "Active listening is deliberate, full-attention listening — the foundation of accurate OPI. Without visual input, the interpreter must concentrate entirely on the audio: the words, the numbers, the tone, and the meaning behind them. Distractions, multitasking, or mentally rushing ahead all cause missed content. Active listening means giving each speaker complete focus and processing meaning, not just sounds.",
            "Practical active-listening skills for the phone include: anticipating structure (a benefits explanation will have steps; a symptom account will have a timeline), noting numbers and names as they arrive, and holding the thread of a long turn. It also means listening for confusion or non-answers — when a caller's reply does not match the question, that itself is information to render faithfully, not to fix.",
            "Active listening supports transparent confirmation when precision demands it. If audio drops during a critical number, you do not guess — you say, 'This is the interpreter — I lost part of that number; could you repeat it?' This is confirming what you heard, which is within role, as opposed to interpreting your own assumptions. Worked example: a caller mumbles an address mid-sentence; the interpreter, having listened actively, catches that it was incomplete and requests a clean repeat before rendering.",
          ],
          terminology: [
            { term: "Active listening", definition: "Deliberate, full-attention listening focused on complete meaning." },
            { term: "Anticipation", definition: "Predicting the structure of a message to follow it accurately." },
            { term: "Thread", definition: "The continuous line of meaning held across a long turn." },
            { term: "Confirmation", definition: "Transparently verifying something heard, without adding assumptions." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If audio drops during a critical number, active listening leads the interpreter to:",
              options: ["Guess the most likely number", "Transparently ask for the number to be repeated", "Skip it", "Round to a convenient figure"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Difficult Customers",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Stay professional with upset, rude, or demanding callers",
            "Keep interpreting faithfully while managing tension",
            "Recognize the limits of the interpreter's responsibility",
          ],
          content: [
            "Difficult callers — angry, distressed, rude, or demanding — are a normal part of OPI, especially on complaint lines, benefits denials, and emergencies. The interpreter's task does not change: interpret everything faithfully and impartially, including the difficult content, while maintaining a calm, professional voice. The interpreter is not the target of the anger even when it sounds that way; they are the channel through which it must accurately pass.",
            "Managing tension is done through steadiness and role discipline, not by engaging. You do not defend yourself, argue back, apologize on a party's behalf, or try to placate anyone — all of which would break neutrality. If a caller vents at length, you interpret it; if they demand the interpreter 'take their side,' you interpret that demand to the other party rather than responding to it. A calm, even tone often de-escalates on its own by not adding fuel.",
            "There are limits to what an interpreter must absorb. Faithfully interpreting hostile content is the job; being personally abused is not. If a caller directs sustained abuse at the interpreter, professional policy typically allows a transparent warning and, if it continues, escalation or ending the call through the proper process — the subject of the next lesson. Worked example: a caller shouts insults about the agent; the interpreter renders them faithfully and neutrally. If the caller then turns to insulting the interpreter directly and will not stop, the interpreter moves to the escalation procedure rather than continuing to endure it.",
          ],
          terminology: [
            { term: "Impartial rendering", definition: "Faithfully interpreting hostile or emotional content without engaging." },
            { term: "Role discipline", definition: "Staying in the interpreter role instead of defending, arguing, or placating." },
            { term: "De-escalation", definition: "Reducing tension through a calm, neutral voice rather than reacting." },
            { term: "Personal abuse", definition: "Sustained hostility aimed at the interpreter, which may warrant escalation." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a caller angrily demands the interpreter 'take their side,' the interpreter should:",
              options: ["Agree to keep the peace", "Interpret that demand to the other party and remain neutral", "Argue back", "Hang up immediately"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Escalation Procedures",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Know when and how to escalate an OPI call",
            "Follow proper procedures for abuse, safety, and technical failure",
            "Document and report per provider policy",
          ],
          content: [
            "Escalation is the defined process for handling situations an interpreter should not manage alone: sustained abuse of the interpreter, threats or safety emergencies, unusable audio, suspected fraud, or requests that fall outside the interpreter's scope. Knowing the procedure in advance means you respond calmly and correctly under pressure rather than improvising. Escalation is a professional tool, not a failure.",
            "The mechanics depend on the platform and client, but the pattern is consistent: stay professional, use a transparent statement, and follow the provider's protocol. For interpreter abuse, that is usually a warning ('This is the interpreter — I am here to help, but I cannot continue if the abuse continues') and then, if needed, involving a supervisor or ending the call as policy allows. For a safety emergency on a non-emergency line, you interpret faithfully and follow the client's protocol for flagging it. For unusable audio, you report the problem and the parties arrange a callback.",
            "After escalation, follow any required reporting or documentation without breaching confidentiality — noting only what policy requires. Worked example: mid-call, a distressed caller states an intent to harm themselves; the interpreter continues to interpret everything faithfully so the provider hears it directly and can act, and follows the provider's and platform's protocol, never taking independent clinical action. Escalation keeps the interpreter safe and the call handled by the right people, closing out the customer-service module.",
          ],
          terminology: [
            { term: "Escalation", definition: "The defined process for handling situations beyond the interpreter's role." },
            { term: "Warning statement", definition: "A transparent notice given before ending a call due to abuse." },
            { term: "Protocol", definition: "The client's or platform's required steps for safety or technical issues." },
            { term: "Documentation", definition: "Recording only what policy requires, without breaching confidentiality." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If a caller expresses intent to harm themselves during a call, the interpreter should:",
              options: ["Give the caller counseling", "Interpret everything faithfully so the provider can act, and follow protocol", "End the call to avoid liability", "Keep it private from the provider"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m6",
      title: "Ethics in OPI",
      lessons: [
        {
          id: "l1",
          title: "Confidentiality",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.f,
          objectives: [
            "Apply the duty of confidentiality to OPI calls",
            "Protect information during and after every call",
            "Handle back-to-back calls without carrying information over",
          ],
          content: [
            "Confidentiality is the interpreter's duty to keep everything heard on a call private. On OPI lines this covers the entire content of every call — names, numbers, medical and financial details, and even the fact that a particular call took place. The duty is permanent: it does not end when the call ends and does not lapse over time. Because interpreters handle sensitive information constantly, confidentiality is the bedrock of the profession's trust.",
            "Protecting confidentiality has practical, phone-specific dimensions. Work in a private space where no one can overhear the call; use a headset; never repeat call content to family, friends, or colleagues; and never make personal recordings or notes beyond what is needed and securely destroyed. In healthcare contexts, this duty aligns with HIPAA, but confidentiality is also an independent ethical obligation that applies to insurance, legal, and social-services calls alike.",
            "High call volume creates a specific risk: carrying information from one call into the next. Each call is sealed — you do not reference a previous caller, and you clear your notes between calls. Worked example: you interpret a benefits call for one caller and, minutes later, a similar call for another; you treat them as entirely separate, never mentioning or comparing them. Confidentiality is not about secrecy for its own sake; it is what lets callers speak honestly enough to get the help they need.",
          ],
          terminology: [
            { term: "Confidentiality", definition: "The permanent duty to keep all call content private." },
            { term: "Private environment", definition: "A space where calls cannot be overheard, protecting confidentiality." },
            { term: "Call sealing", definition: "Treating each call as separate and not carrying information between calls." },
            { term: "Secure notes", definition: "Minimal notes, kept in the interpreter's control and destroyed after use." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An OPI interpreter's duty of confidentiality:",
              options: ["Ends when the call ends", "Is permanent and covers even that a call took place", "Applies only to medical calls", "Allows sharing with colleagues"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Impartiality",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Define impartiality and its role in interpreting",
            "Recognize and manage conflicts of interest and bias",
            "Stay neutral in emotionally charged calls",
          ],
          content: [
            "Impartiality means the interpreter does not take sides, advise, or let personal views affect the rendering. The interpreter serves the communication, not either party's interests. On OPI calls — where an interpreter may personally disagree with a caller, sympathize with one side, or hold opinions about the subject — impartiality requires setting all of that aside and rendering everyone's words with equal fidelity.",
            "A conflict of interest arises when the interpreter has a personal stake or relationship that could compromise neutrality — for example, recognizing the caller's voice as someone they know, or a call touching a matter they have strong personal feelings about. The professional response is to disclose the conflict transparently and, when appropriate, withdraw so another interpreter can take the call. Recognizing bias in yourself and consciously neutralizing it is part of the skill.",
            "Impartiality is hardest, and most important, in emotionally charged calls. You may feel a caller is being treated unfairly or that a party is lying, but the interpreter neither advocates nor editorializes; they render faithfully and let the parties and professionals act. Worked example: an interpreter believes an insurance denial is unjust; they interpret the denial and the caller's appeal exactly, without adding sympathy, advice, or their own opinion. Neutrality is what makes the interpreter trustworthy to both sides at once.",
          ],
          terminology: [
            { term: "Impartiality", definition: "Remaining neutral, taking no side and adding no opinion." },
            { term: "Conflict of interest", definition: "A personal stake or relationship that could compromise neutrality." },
            { term: "Bias", definition: "A personal leaning the interpreter must recognize and set aside." },
            { term: "Withdrawal", definition: "Stepping off a call when a conflict prevents impartial service." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If an interpreter recognizes the caller as someone they know personally, they should:",
              options: ["Continue quietly", "Disclose the conflict and withdraw when appropriate", "Give the caller extra help", "Share their opinion of the case"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Professional Conduct",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply professional standards of conduct on every call",
            "Maintain competence, boundaries, and accountability",
            "Integrate ethics into daily OPI practice",
          ],
          content: [
            "Professional conduct ties the ethical principles together into how an interpreter actually behaves. It includes reliability (being ready and punctual for calls), competence (accepting only assignments you can handle and continuing to develop your skills), integrity (owning and correcting errors transparently), and respect (courtesy to all parties regardless of the situation). On OPI lines, conduct is judged entirely through voice and behavior, so consistency matters.",
            "Boundaries are central. The interpreter does not offer personal opinions, give advice, run errands for callers, accept gifts or tips, or use call information for any purpose beyond interpreting. Maintaining scope of practice — declining tasks like completing forms or making decisions — is not unhelpful; it protects the accuracy and trust the role depends on. Accountability means following platform policies, completing required training, and reporting problems honestly.",
            "Integrating ethics into daily practice makes the right action automatic under pressure. Before this final scenario module, recall the through-line of the course: faithful, complete, first-person rendering; transparent management of the call; confidentiality, impartiality, and professional conduct on every interaction. Worked example: at the end of a long shift, tired and rushed, an interpreter still gives a full greeting, renders completely, and declines a caller's request to 'just fill in the form for me' — because professional conduct is a habit, not a mood. The final module applies all of this to realistic role plays.",
          ],
          terminology: [
            { term: "Professional conduct", definition: "Reliable, competent, respectful behavior that upholds ethical standards." },
            { term: "Competence", definition: "Accepting only work you can handle and continuing to build skill." },
            { term: "Boundaries", definition: "Limits that keep the interpreter within scope of practice." },
            { term: "Accountability", definition: "Following policy, correcting errors, and reporting problems honestly." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A caller asks the interpreter to fill out a form on their behalf. Professional conduct means:",
              options: ["Filling it out to be helpful", "Declining, as it is outside scope, and interpreting the request instead", "Charging an extra fee", "Doing part of it"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m7",
      title: "Common OPI Scenarios",
      lessons: [
        {
          id: "l1",
          title: "Role Play: Medical Calls",
          duration: "15:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Apply OPI skills to a realistic medical call",
            "Manage clinical terminology, dosages, and emotion",
            "Maintain accuracy and role in a healthcare context",
          ],
          content: [
            "Medical OPI calls demand precise terminology, exact numbers, and sensitivity to distress, all handled by voice. This role play walks through a nurse triage call for a Spanish-speaking patient with chest pain. Read it noticing how the interpreter opens, controls pace, renders in the first person, and clarifies a dosage — every skill from the course applied at once.",
            "Role play — Nurse triage call:\nInterpreter (greeting): 'Thank you for calling. This is Spanish interpreter 4471. Everything will be kept confidential; I will interpret in the first person. Please speak directly to each other in short segments. Go ahead.'\nNurse: 'Can you tell me what's going on today?'\nPatient (rendered, first person): 'I have had chest pain since this morning and I feel short of breath.'\nNurse: 'Are you taking any heart medication?'\nPatient (rendered): 'Yes, I take a small white pill, but I stopped three days ago.'\nInterpreter (clarification): 'This is the interpreter — the patient referred to a pill by color only; may the nurse ask for the name or dosage?'\nNurse: 'Is it your metoprolol, 25 milligrams?'\nPatient (rendered): 'Yes, metoprolol, but I stopped because I ran out.'",
            "Debrief: the interpreter opened completely, kept the patient in first person, and used a transparent clarification for the ambiguous 'small white pill' rather than guessing the medication — a potentially life-critical distinction. Notice the interpreter did not advise the patient to resume the medication or reassure them about the chest pain; that is the nurse's role. The dosage ('25 milligrams') was rendered exactly. This is medical OPI done to standard: complete, precise, first-person, transparent, and strictly in role.",
          ],
          terminology: [
            { term: "Triage", definition: "Clinical assessment of urgency, common in nurse-line calls." },
            { term: "Dosage precision", definition: "Rendering medication amounts exactly, never rounding or guessing." },
            { term: "Clinical clarification", definition: "Transparently resolving an ambiguous medical reference." },
            { term: "Scope in healthcare", definition: "Interpreting clinical content without giving medical advice." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In the medical role play, the interpreter handled 'a small white pill' by:",
              options: ["Guessing the medication", "Transparently asking the nurse to get the name or dosage", "Ignoring it", "Advising the patient to restart it"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Role Play: Insurance Calls",
          duration: "14:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply OPI skills to an insurance or benefits call",
            "Render policy numbers, dates, and terms precisely",
            "Manage a fast, scripted agent and a frustrated caller",
          ],
          content: [
            "Insurance calls combine dense numbers, scripted agents who speak quickly, and callers who are often anxious about coverage or claims. This role play shows a claims call for a Mandarin-speaking policyholder, highlighting pacing control, note-taking for reference numbers, and neutral rendering of a frustrating denial.",
            "Role play — Claims call:\nAgent (fast): 'Your policy 40-927-B was effective March 3rd, and the claim from April 12th was denied under exclusion code 7.'\nInterpreter (pacing): 'This is the interpreter — please slow down slightly so I can interpret everything accurately.' (Notes: policy 40927B / eff Mar 3 / claim Apr 12 / denied excl. 7)\nInterpreter (rendered to caller, first person as agent): 'Your policy 40-927-B was effective March 3rd, and the claim from April 12th was denied under exclusion code 7.'\nCaller (rendered, first person): 'That is not fair — no one told me about any exclusion. I want to appeal.'\nAgent: 'You can file an appeal within thirty days; I'll send the form.'\nCaller (rendered): 'Please send it today.'",
            "Debrief: the interpreter controlled a fast agent with a transparent pacing request, took notes so the policy number, dates, and exclusion code were rendered exactly, and interpreted the caller's frustration faithfully ('That is not fair') without softening it or adding sympathy. The interpreter did not explain the exclusion, advise the caller how to win the appeal, or take the caller's side — they rendered the appeal request and the agent's response precisely. Accurate numbers plus strict neutrality is the essence of insurance OPI.",
          ],
          terminology: [
            { term: "Exclusion code", definition: "A policy provision cited to deny a claim; must be rendered exactly." },
            { term: "Policy number", definition: "A precise identifier requiring accurate rendering and read-back." },
            { term: "Neutral rendering", definition: "Conveying frustration or denial faithfully without editorializing." },
            { term: "Appeal", definition: "A caller's formal challenge, interpreted precisely, not advised on." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In the insurance role play, when the caller said the denial 'is not fair,' the interpreter:",
              options: ["Softened it to be polite", "Rendered it faithfully without adding sympathy or advice", "Agreed with the caller", "Explained how to win the appeal"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Role Play: Social Services Calls",
          duration: "14:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply OPI skills to a social services call",
            "Handle sensitive personal circumstances with neutrality",
            "Manage cultural references and eligibility details accurately",
          ],
          content: [
            "Social services calls — benefits eligibility, housing, food assistance, child services — involve sensitive personal circumstances, detailed eligibility rules, and callers who may be in crisis or distrustful of authority. This role play shows a benefits eligibility call for an Arabic-speaking applicant, focusing on complete rendering of multi-step rules and neutral handling of sensitive details.",
            "Role play — Benefits eligibility call:\nCaseworker: 'To qualify, your household income must be below the limit, you must provide proof of address, and you must report all household members.'\nInterpreter (segmenting): 'This is the interpreter — let me interpret each requirement.' (Renders all three requirements completely, in first person.)\nApplicant (rendered): 'I live with my brother and his family, but I am not sure if they count as my household.'\nInterpreter (transparent culture note): 'This is the interpreter — the applicant is describing an extended-family living arrangement that may need clarification for the household definition.'\nCaseworker: 'Anyone who shares meals and expenses counts — please list them.'\nApplicant (rendered): 'Then it is five people total.'",
            "Debrief: the interpreter segmented a three-part eligibility rule so nothing was omitted, rendered the applicant's uncertainty faithfully, and used a brief transparent note to flag a cultural point about 'household' — without deciding the answer or advising the applicant. The interpreter neither coached the applicant on what to say nor judged the arrangement; they let the caseworker define the term and interpreted the result. Completeness on multi-step rules and neutral handling of sensitive family details define social-services OPI.",
          ],
          terminology: [
            { term: "Eligibility rules", definition: "Multi-step requirements that must be rendered completely and in order." },
            { term: "Cultural note", definition: "A brief, transparent flag of a possible cultural misunderstanding for the parties to resolve." },
            { term: "Sensitive information", definition: "Personal circumstances handled with neutrality and confidentiality." },
            { term: "Household definition", definition: "A program term the professional defines, not the interpreter." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In the social services role play, the interpreter handled the 'household' question by:",
              options: ["Deciding whether the brother counted", "Flagging it transparently and letting the caseworker define the term", "Advising the applicant what to say", "Omitting the confusing part"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Role Play: Emergency Calls",
          duration: "15:30",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Apply OPI skills to a high-stakes emergency call",
            "Render quickly and completely under extreme pressure",
            "Support the dispatcher's control while staying in role",
          ],
          content: [
            "Emergency calls — 911, poison control, crisis lines — are the highest-stakes OPI work: speed, accuracy, and composure can affect survival. The interpreter must render rapidly and completely, keep pace with a dispatcher who controls the call, and stay strictly in role while conveying life-critical information. This role play shows a 911 call for a Vietnamese-speaking caller reporting a collapse.",
            "Role play — 911 emergency:\nDispatcher: '911, what is the address of your emergency?'\nCaller (rendered, first person, immediate): 'My father collapsed, he is not breathing — 1428 Oak Street, apartment 3.'\nInterpreter (notes: 1428 Oak St, apt 3 / not breathing)\nDispatcher: 'Is he conscious? Is he breathing at all?'\nCaller (rendered): 'No, he is not breathing and his lips are blue.'\nDispatcher: 'Help is on the way. I'm going to tell you how to start CPR — repeat exactly what I say.'\nInterpreter (renders each CPR instruction immediately and completely, keeping the dispatcher's pace and urgency).",
            "Debrief: the interpreter matched the emergency's urgency without sacrificing completeness — the address and 'not breathing' were rendered instantly and exactly, and the CPR instructions were interpreted step by step in real time. The interpreter let the dispatcher control the call, did not add their own instructions or reassurance, and stayed composed so the caller could act. In emergencies the interpreter's voice must be fast, clear, complete, and strictly faithful — the culmination of every skill in this course. You are now ready for the 40-question final exam, which requires an 80% score to pass; on completion you receive a certificate with your name, completion date, certificate ID, and QR verification.",
          ],
          terminology: [
            { term: "Dispatcher control", definition: "The emergency operator directs the call; the interpreter supports, not leads." },
            { term: "Life-critical rendering", definition: "Instant, exact interpreting of information affecting survival." },
            { term: "Composure", definition: "Staying calm under pressure so the caller can act on instructions." },
            { term: "Real-time instructions", definition: "Step-by-step directions (e.g., CPR) interpreted immediately and completely." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "During the 911 role play, the interpreter's job with the CPR instructions was to:",
              options: ["Add their own first-aid advice", "Render each instruction immediately, completely, and faithfully, letting the dispatcher lead", "Summarize the steps", "Reassure the caller instead of interpreting"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "OPI Professional Skills — Final Exam",
    category: "Remote Interpreting",
    durationMinutes: 40,
    passingScore: 80,
    questions: [
      { id: "q1", question: "OPI is best defined as:", options: ["Interpreting delivered by telephone, audio-only", "Written translation of documents", "Video-only interpreting", "In-person interpreting"], answer: 0 },
      { id: "q2", question: "The defining challenge of OPI versus in-person work is the absence of:", options: ["Sound", "Visual cues", "A second language", "A telephone"], answer: 1 },
      { id: "q3", question: "'LEP' stands for:", options: ["Language Exchange Program", "Limited English Proficient", "Legal Entry Permit", "Local Emergency Provider"], answer: 1 },
      { id: "q4", question: "A key benefit of OPI is:", options: ["It never has audio problems", "On-demand access to many languages within seconds", "It removes the need for accuracy", "It works without a phone"], answer: 1 },
      { id: "q5", question: "The 'conduit' model means the interpreter is:", options: ["A decision-maker", "A faithful channel between two speakers, not a participant", "An advocate for the caller", "The provider's assistant"], answer: 1 },
      { id: "q6", question: "If a caller asks the interpreter to personally vouch for them, the interpreter should:", options: ["Vouch to be helpful", "Interpret the caller's statement to the other party and stay neutral", "Refuse and hang up", "Give advice"], answer: 1 },
      { id: "q7", question: "A complete standard greeting includes ID, confidentiality, first-person interpreting, and:", options: ["The interpreter's opinion", "A request to speak directly in short segments", "The caller's diagnosis", "Payment terms"], answer: 1 },
      { id: "q8", question: "If a caller does not respond as expected at the start, the interpreter should first:", options: ["Keep interpreting anyway", "Verify the correct language or dialect", "End the call", "Guess the language"], answer: 1 },
      { id: "q9", question: "When a new voice joins mid-call, the interpreter should:", options: ["Ignore it", "Transparently confirm who is now on the line", "Refuse to continue", "Assume it is the same person"], answer: 1 },
      { id: "q10", question: "'Establishing control' on an OPI call means:", options: ["Dominating the conversation", "Managing pace and turns so everything can be interpreted accurately", "Telling parties what to say", "Speaking for the caller"], answer: 1 },
      { id: "q11", question: "When a speaker delivers too long a passage, the interpreter should:", options: ["Summarize the gist", "Transparently interrupt as 'the interpreter' and ask for shorter segments", "Interpret only the ending", "Stay silent"], answer: 1 },
      { id: "q12", question: "First-person interpreting renders a patient's words as:", options: ["'She says she has pain'", "'I have pain'", "'The patient reports pain'", "'They probably have pain'"], answer: 1 },
      { id: "q13", question: "When managing the call or clarifying, the interpreter refers to themselves as:", options: ["'I' as a participant", "'the interpreter' in the third person", "The provider", "The caller"], answer: 1 },
      { id: "q14", question: "Accuracy requires the interpreter to render profanity and emotional tone by:", options: ["Softening them", "Conveying them faithfully because they carry meaning", "Omitting them", "Explaining them"], answer: 1 },
      { id: "q15", question: "'Dynamic equivalence' means:", options: ["Word-for-word literal translation", "Rendering the intended meaning naturally in the target language", "Summarizing the message", "Adding cultural explanations"], answer: 1 },
      { id: "q16", question: "An addition error is:", options: ["Leaving out part of the message", "Inserting words or meaning the speaker did not say", "Rendering exactly", "Asking for clarification"], answer: 1 },
      { id: "q17", question: "If you realize you omitted part of a symptom list, you should:", options: ["Leave it out", "Transparently correct it: 'This is the interpreter — correction...'", "Wait to see if it matters", "Add advice to compensate"], answer: 1 },
      { id: "q18", question: "When a term is genuinely unclear, the correct technique is to:", options: ["Guess the meaning", "Transparently ask the speaker to clarify, then interpret the answer", "Substitute your own definition", "Skip it"], answer: 1 },
      { id: "q19", question: "For a spoken medication dosage, the interpreter should:", options: ["Round it", "Note and render it exactly, reading back if needed", "Summarize it", "Omit if unsure"], answer: 1 },
      { id: "q20", question: "Effective turn-taking on OPI depends on:", options: ["Interpreting several minutes at once", "Short segments managed by clear voice cues", "Visual hand signals", "Letting the louder party dominate"], answer: 1 },
      { id: "q21", question: "During crosstalk, the interpreter should:", options: ["Interpret the louder speaker", "Wait for a pause and ask for one speaker at a time", "Drop one party silently", "Stop interpreting"], answer: 1 },
      { id: "q22", question: "The best first response to a fast speaker is to:", options: ["Interpret only part", "Transparently ask them to slow down and take notes", "Match their speed", "Tell them they are hard to understand"], answer: 1 },
      { id: "q23", question: "When a caller gives a very long response, the interpreter should:", options: ["Summarize the main idea", "Segment it or use notes to render everything completely", "Interpret only the first and last parts", "Ask them to write it down"], answer: 1 },
      { id: "q24", question: "On an audio-only call, the interpreter's professional presence is carried mainly by:", options: ["Their appearance", "Their tone of voice", "Their notes", "The platform"], answer: 1 },
      { id: "q25", question: "When a caller sounds angry, the interpreter should:", options: ["Become angry to match", "Faithfully convey the anger while keeping their own tone composed", "Soften the words", "Refuse to interpret the emotion"], answer: 1 },
      { id: "q26", question: "Active listening on OPI includes:", options: ["Multitasking during calls", "Full focus, anticipating structure, and noting numbers and names", "Rushing ahead mentally", "Ignoring tone"], answer: 1 },
      { id: "q27", question: "If audio drops during a critical number, the interpreter should:", options: ["Guess the number", "Transparently ask for it to be repeated", "Skip it", "Round it"], answer: 1 },
      { id: "q28", question: "When a caller demands the interpreter 'take their side,' the interpreter should:", options: ["Agree", "Interpret that demand to the other party and stay neutral", "Argue back", "Hang up"], answer: 1 },
      { id: "q29", question: "Faithfully interpreting hostile content is the job, but sustained abuse aimed at the interpreter may warrant:", options: ["Arguing with the caller", "Escalation per policy after a transparent warning", "Silently enduring it", "Insulting the caller back"], answer: 1 },
      { id: "q30", question: "If a caller expresses intent to harm themselves, the interpreter should:", options: ["Provide counseling", "Interpret everything faithfully so the provider can act, and follow protocol", "End the call", "Keep it from the provider"], answer: 1 },
      { id: "q31", question: "An OPI interpreter's duty of confidentiality is:", options: ["Over when the call ends", "Permanent, covering even that a call took place", "Only for medical calls", "Waivable among colleagues"], answer: 1 },
      { id: "q32", question: "To avoid carrying information between back-to-back calls, the interpreter should:", options: ["Compare callers", "Treat each call as sealed and clear notes between calls", "Keep a running log of callers", "Discuss patterns with peers"], answer: 1 },
      { id: "q33", question: "Impartiality requires the interpreter to:", options: ["Advise the weaker party", "Take no side and add no opinion, rendering all parties faithfully", "Favor the caller", "Correct unfair outcomes"], answer: 1 },
      { id: "q34", question: "If an interpreter recognizes the caller as someone they know, they should:", options: ["Continue quietly", "Disclose the conflict and withdraw when appropriate", "Give extra help", "Share their opinion"], answer: 1 },
      { id: "q35", question: "A caller asks the interpreter to fill out a form for them. Professional conduct means:", options: ["Filling it out", "Declining as out of scope and interpreting the request instead", "Charging a fee", "Doing part of it"], answer: 1 },
      { id: "q36", question: "In the medical role play, 'a small white pill' was handled by:", options: ["Guessing the drug", "Transparently asking the nurse to get the name or dosage", "Ignoring it", "Advising the patient"], answer: 1 },
      { id: "q37", question: "In the insurance role play, the caller's statement that a denial 'is not fair' was:", options: ["Softened", "Rendered faithfully without added sympathy or advice", "Agreed with", "Omitted"], answer: 1 },
      { id: "q38", question: "In the social services role play, the 'household' question was handled by:", options: ["The interpreter deciding it", "Flagging it transparently and letting the caseworker define the term", "Coaching the applicant", "Omitting it"], answer: 1 },
      { id: "q39", question: "During the emergency role play, the interpreter handled the CPR instructions by:", options: ["Adding their own advice", "Rendering each step immediately and faithfully while the dispatcher led", "Summarizing them", "Reassuring instead of interpreting"], answer: 1 },
      { id: "q40", question: "Across all OPI calls, the interpreter's core standard is:", options: ["Speed over accuracy", "Complete, faithful, first-person rendering with transparent call management", "Helpful advice when needed", "Summarizing to save time"], answer: 1 },
    ],
  },
}

// ─────────────────────────────────────────────────────────────────────────
// 4. HIPAA & Compliance
// ───────────────────────────────────────────────────�����─────────────────────
cchiContent["healthcare-hipaa-compliance"] = {
  resources: res("HHC"),
  modules: [
    {
      id: "m1",
      title: "Introduction to HIPAA",
      lessons: [
        {
          id: "l1",
          title: "What is HIPAA?",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Define HIPAA and state its purpose",
            "Identify the main rules HIPAA established",
            "Explain why interpreters are bound by HIPAA",
          ],
          content: [
            "HIPAA — the Health Insurance Portability and Accountability Act — is the U.S. federal law that sets national standards for protecting sensitive patient health information. It is enforced by the Department of Health and Human Services (HHS) through its Office for Civil Rights (OCR). Two of its rules matter most day to day: the Privacy Rule, which governs who may see and use health information, and the Security Rule, which governs how electronic information must be safeguarded.",
            "HIPAA applies to 'covered entities' — health plans, health care clearinghouses, and providers who transmit health information electronically — and to their 'business associates,' the outside parties who handle protected information on their behalf. Medical interpreters, whether staff or contracted through an agency, function as part of the treatment team or as business associates, which makes them personally responsible for following HIPAA.",
            "For an interpreter, HIPAA is not legal background trivia — it directly defines how you must treat everything you hear and see on an assignment. Every name, diagnosis, and detail exchanged in an encounter is protected, and mishandling it can harm the patient and expose you and the organization to penalties. This module builds the foundation the rest of the course relies on.",
          ],
          terminology: [
            { term: "HIPAA", definition: "The U.S. law setting national standards for protecting patient health information." },
            { term: "Covered entity", definition: "A health plan, clearinghouse, or provider bound by HIPAA." },
            { term: "Business associate", definition: "An outside party that handles protected health information on behalf of a covered entity." },
            { term: "OCR", definition: "The HHS Office for Civil Rights, which enforces HIPAA." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "HIPAA is best described as the U.S. law that:",
              options: ["Licenses interpreters", "Sets national standards for protecting patient health information", "Sets hospital prices", "Regulates medications"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "History of HIPAA",
          duration: "12:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Summarize why HIPAA was enacted in 1996",
            "Describe how the Privacy and Security Rules and HITECH expanded it",
            "Connect this history to today's remote-interpreting obligations",
          ],
          content: [
            "Congress passed HIPAA in 1996. Its original goals were twofold: 'portability,' letting people keep health coverage when they changed or lost jobs, and 'accountability,' reducing fraud and standardizing electronic health transactions. As health care moved to electronic records, the need to protect that information grew, and HHS issued the Privacy Rule (effective 2003) and the Security Rule (effective 2005) to fill the gap.",
            "In 2009 the HITECH Act strengthened HIPAA significantly: it made business associates directly liable, raised penalties, and created formal breach-notification requirements. The 2013 Omnibus Rule folded these changes into the regulations. The result is the modern framework in which an agency's contracted interpreter can be held directly accountable for a privacy violation.",
            "This history explains why remote interpreting carries real compliance weight today. Each expansion responded to how information was actually being lost or misused. Understanding that arc helps interpreters see privacy rules not as arbitrary red tape but as lessons learned from real breaches that harmed real patients.",
          ],
          terminology: [
            { term: "Portability", definition: "HIPAA's goal of letting people keep health coverage across job changes." },
            { term: "HITECH Act", definition: "A 2009 law that strengthened HIPAA, adding breach notification and business-associate liability." },
            { term: "Omnibus Rule", definition: "The 2013 rule that incorporated HITECH changes into HIPAA regulations." },
            { term: "Breach notification", definition: "The required process for reporting unauthorized disclosures of protected information." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The 2009 HITECH Act notably:",
              options: ["Repealed HIPAA", "Made business associates directly liable and added breach notification", "Removed penalties", "Applied only to dentists"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Why HIPAA Matters",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain the harms HIPAA prevents for patients",
            "Describe the consequences of violations for interpreters",
            "Connect privacy to patient trust and care quality",
          ],
          content: [
            "HIPAA matters first because privacy breaches harm patients. Exposure of a diagnosis — a mental-health condition, HIV status, a pregnancy, substance use — can lead to discrimination, job loss, family conflict, or physical danger. When patients trust that what they say is protected, they speak openly, and honest communication is essential to accurate diagnosis and safe care. A breach damages that trust for the individual and the community.",
            "HIPAA also matters because violations carry real consequences. Civil penalties range from roughly a thousand dollars to tens of thousands per violation, up to an annual maximum in the millions, and willful violations can bring criminal charges and prison time. Interpreters can be terminated, removed from an agency's roster, or personally sanctioned. A single careless disclosure can end a career.",
            "For interpreters specifically, privacy is inseparable from the professional role. You often hear the most sensitive details in a patient's life. Protecting that information is not only a legal duty but a core ethical obligation that lets you be trusted in the room — the reason patients and providers can speak freely through you.",
          ],
          terminology: [
            { term: "Civil penalty", definition: "A monetary fine imposed for a HIPAA violation." },
            { term: "Criminal violation", definition: "A willful HIPAA breach that can bring fines and imprisonment." },
            { term: "Patient trust", definition: "The confidence that allows patients to share information needed for care." },
            { term: "Harm", definition: "The discrimination, danger, or loss a patient can suffer from exposed health information." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A primary reason HIPAA matters for patient care is that privacy:",
              options: ["Slows down appointments", "Lets patients speak openly, which supports accurate, safe care", "Reduces staffing", "Is only a billing concern"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Healthcare Privacy Standards",
          duration: "13:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Identify the standards that govern healthcare privacy beyond HIPAA",
            "Distinguish federal, state, and organizational requirements",
            "Apply the 'most protective rule wins' principle",
          ],
          content: [
            "HIPAA sets a national floor, but interpreters operate within layered standards. State laws often add stronger protections — for example, extra safeguards for mental-health records, HIV status, substance-use treatment (governed federally by 42 CFR Part 2), and minors' care. Where a state law is more protective than HIPAA, the more protective rule applies. Organizational policies and agency contracts add another layer of specific requirements.",
            "Professional codes of ethics reinforce these legal standards. The National Council on Interpreting in Health Care (NCIHC) and the International Medical Interpreters Association (IMIA) both place confidentiality at the center of the interpreter's role. So an interpreter is simultaneously bound by federal law, state law, employer or agency policy, and a professional code — all pointing toward rigorous protection of patient information.",
            "The practical takeaway is a simple decision rule: when standards differ, follow the most protective one, and when unsure, protect more rather than less. This lesson closes the introductory module; the remaining modules examine each pillar — PHI, the Privacy Rule, the Security Rule, confidentiality, remote compliance, and real-world decision-making — in depth.",
          ],
          terminology: [
            { term: "Federal floor", definition: "The minimum protection HIPAA guarantees nationwide." },
            { term: "42 CFR Part 2", definition: "Federal rules giving extra protection to substance-use treatment records." },
            { term: "Most protective rule", definition: "The principle that the strictest applicable privacy standard governs." },
            { term: "Code of ethics", definition: "Professional standards (e.g., NCIHC, IMIA) that center confidentiality." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a state privacy law is stricter than HIPAA, an interpreter should follow:",
              options: ["Whichever is easier", "The stricter, more protective law", "Only HIPAA", "Neither"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m2",
      title: "Protected Health Information (PHI)",
      lessons: [
        {
          id: "l1",
          title: "Definition of PHI",
          duration: "13:20",
          type: "video",
          completed: false,
          videoUrl: V.b,
          objectives: [
            "Define PHI precisely",
            "Explain what makes information 'individually identifiable'",
            "Distinguish PHI from de-identified information",
          ],
          content: [
            "Protected Health Information (PHI) is any individually identifiable health information that is created, received, stored, or transmitted by a covered entity or business associate. It links a person's identity to their health: their physical or mental condition, the care they received, or payment for that care. For an interpreter, virtually everything exchanged in an encounter is PHI, because it connects a specific patient to their health situation.",
            "Information is 'individually identifiable' when it could reasonably be used to figure out who the patient is — alone or combined with other data. HIPAA lists eighteen types of identifiers, including name, address, dates tied to the person, phone number, email, medical record number, and any other unique characteristic. Even a rare diagnosis in a small community can identify someone.",
            "PHI that has been stripped of all identifiers becomes 'de-identified' and is no longer protected — but true de-identification is strict and technical, and it is never an interpreter's job to decide something is de-identified. The safe rule for interpreters is to treat all encounter information as PHI by default.",
          ],
          terminology: [
            { term: "PHI", definition: "Individually identifiable health information protected under HIPAA." },
            { term: "Individually identifiable", definition: "Information that could reasonably be used to determine a patient's identity." },
            { term: "18 identifiers", definition: "The categories of data (name, dates, record numbers, etc.) that make information identifiable." },
            { term: "De-identified", definition: "Information stripped of all identifiers so it is no longer PHI." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Information becomes PHI when it links a person's identity to their:",
              options: ["Favorite color", "Health condition, care, or payment for care", "Zip code alone", "Job title"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Examples of PHI",
          duration: "12:40",
          type: "image",
          completed: false,
          objectives: [
            "Recognize concrete examples of PHI",
            "Identify less-obvious identifiers",
            "Apply the identifier list to interpreting situations",
          ],
          content: [
            "Obvious PHI includes a patient's name, date of birth, diagnosis, medications, test results, and the reason for a visit. Less obvious but equally protected are the appointment date and time, the medical record or account number, the patient's address, phone number, and email, insurance details, and photographs or video. Even the fact that a specific person is a patient at a particular clinic is PHI.",
            "A useful way to think about it: a single data point can be harmless on its own but become PHI in context. 'Diabetes' is a general term, but 'the patient you interpreted for at 3 p.m. Tuesday has diabetes' is clearly PHI. Combining a date, a location, and a condition can re-identify someone even without a name.",
            "For interpreters, examples that trip people up include: casually mentioning you interpreted for a neighbor, describing an unusual case that colleagues could recognize, or leaving a note with initials and a room number visible. Learning to spot PHI in all these forms is the first step toward protecting it consistently.",
          ],
          terminology: [
            { term: "Direct identifier", definition: "Data that names a patient outright, such as name or record number." },
            { term: "Indirect identifier", definition: "Data (date, location, rare condition) that identifies someone in combination." },
            { term: "Demographic data", definition: "Address, phone, email, and similar identifying details." },
            { term: "Context", definition: "The surrounding facts that can turn a general detail into PHI." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which of the following is PHI?",
              options: ["A generic drug's chemical formula", "The clinic's business hours", "The fact that a named person is a patient with a specific diagnosis", "The current weather"],
              answer: 2,
            },
          ],
        },
        {
          id: "l3",
          title: "Handling PHI Properly",
          duration: "13:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply the minimum-necessary standard to PHI",
            "Describe safe practices for notes and communication",
            "Avoid common everyday PHI-handling mistakes",
          ],
          content: [
            "Handling PHI properly starts with the minimum-necessary standard: access, use, and disclose only the least information needed to do your job. An interpreter never needs to browse a chart, ask for details unrelated to the communication, or retain information after the encounter. If you take temporary notes to support your memory during a session, keep them minimal, keep them in your control, and destroy them securely as soon as they are no longer needed.",
            "Safe handling also means where and how you communicate. Do not discuss cases in hallways, elevators, break rooms, or online. Do not send PHI through personal email, texting, or unapproved apps. When you must confirm a spelling or a number, do it discreetly and only with the provider or patient involved. Position screens and papers so others cannot see them.",
            "Case study: an interpreter finishes a video session and, still logged in, takes a personal call within earshot, repeating the patient's symptoms to a friend. Even without saying the name, the combination of details and the visible session could identify the patient — a clear mishandling of PHI. The proper practice is to end the session, close the platform, and never discuss the encounter at all.",
          ],
          terminology: [
            { term: "Minimum necessary", definition: "Using or sharing only the least PHI required for a task." },
            { term: "Secure disposal", definition: "Shredding or permanently deleting PHI so it cannot be recovered." },
            { term: "Approved channel", definition: "A vendor-sanctioned, secure method for handling health information." },
            { term: "Discretion", definition: "Confirming details quietly and only with those directly involved." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The minimum-necessary standard tells an interpreter to:",
              options: ["Learn as much as possible about each patient", "Use and share only the least PHI needed for the task", "Keep detailed notes forever", "Share cases with colleagues"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Interpreter Responsibilities",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "State the interpreter's specific PHI responsibilities",
            "Explain the interpreter's status as a business associate",
            "Apply responsibilities through a realistic case study",
          ],
          content: [
            "As a business associate or member of the treatment team, an interpreter has concrete responsibilities: protect all PHI encountered, use it only to perform interpreting, follow the covered entity's and agency's policies, complete required training, secure any devices and notes, and report suspected breaches promptly. These duties apply equally on the phone, on video, and in person, and they continue after the encounter ends.",
            "Crucially, the interpreter's duty is independent of convenience or curiosity. You do not read parts of the chart you were not asked to interpret, you do not look up a patient afterward, and you do not keep 'interesting' cases as stories. You render communication faithfully and impartially while treating the information as something entrusted to you, not something you own.",
            "Case study: a bilingual staff interpreter recognizes an incoming patient as a former classmate. The responsible actions are to disclose the potential conflict to the provider so a different interpreter can be assigned if appropriate, to say nothing to the patient about their shared past unless the patient raises it, and never to mention the encounter to mutual acquaintances. Recognizing someone does not create any right to their health information.",
          ],
          terminology: [
            { term: "Business associate agreement", definition: "A contract binding an outside party to protect PHI under HIPAA." },
            { term: "Conflict of interest", definition: "A personal relationship or interest that could compromise impartiality or privacy." },
            { term: "Entrusted information", definition: "PHI held on behalf of the patient and organization, not owned by the interpreter." },
            { term: "Duty to report", definition: "The obligation to promptly report a suspected privacy or security incident." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If an interpreter recognizes an incoming patient as an acquaintance, the responsible first step is to:",
              options: ["Greet them by discussing their past", "Disclose the potential conflict to the provider", "Tell mutual friends later", "Look up their chart"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m3",
      title: "Privacy Rule",
      lessons: [
        {
          id: "l1",
          title: "Patient Rights",
          duration: "13:10",
          type: "video",
          completed: false,
          videoUrl: V.c,
          objectives: [
            "List the key rights the Privacy Rule gives patients",
            "Explain how these rights shape the encounter",
            "Describe the interpreter's supporting role",
          ],
          content: [
            "The HIPAA Privacy Rule grants patients specific rights over their own health information: the right to see and get a copy of their records, to request corrections, to receive a notice of privacy practices, to know who their information has been disclosed to (an accounting of disclosures), to request restrictions on certain sharing, and to ask for confidential communications (for example, being contacted only at a certain phone number).",
            "These rights frame many encounters interpreters support. A patient may ask to review results, request that information not be shared with a family member, or ask how their data is used. The interpreter's job is to render these requests and the provider's responses faithfully and completely, so the patient can exercise their rights fully in their own language.",
            "The interpreter never decides or advises on these rights — that is the provider's and organization's role — but accurate interpreting is what makes the rights real for a limited-English-proficient patient. A request to restrict disclosure means nothing if it is not interpreted precisely, so faithful rendering directly protects patient autonomy.",
          ],
          terminology: [
            { term: "Right of access", definition: "A patient's right to view and obtain copies of their health records." },
            { term: "Accounting of disclosures", definition: "A patient's right to learn to whom their PHI has been disclosed." },
            { term: "Notice of Privacy Practices", definition: "The document telling patients how their information may be used and shared." },
            { term: "Confidential communications", definition: "A patient's right to be contacted in a specific, private way." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Under the Privacy Rule, patients have the right to:",
              options: ["Access and request corrections to their records", "Read other patients' charts", "Set hospital prices", "Waive all interpreter confidentiality"],
              answer: 0,
            },
          ],
        },
        {
          id: "l2",
          title: "Authorized Disclosures",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Identify when PHI may be shared without extra authorization",
            "Explain the role of patient authorization",
            "Apply the concept to interpreting situations",
          ],
          content: [
            "The Privacy Rule permits sharing PHI without separate patient authorization for three core purposes: treatment (coordinating care), payment (billing and insurance), and health care operations (quality, training, administration) — often abbreviated TPO. Interpreting falls under treatment and operations, which is exactly why an interpreter may hear PHI in the first place. Beyond TPO and a limited set of public-interest exceptions, most other disclosures require the patient's written authorization.",
            "A valid authorization is specific: it names what information may be shared, with whom, for what purpose, and when it expires, and it can be revoked. When a patient signs a release so records can go to another clinic, a school, or a family member, that is an authorized disclosure. Interpreters frequently interpret the discussion and signing of these forms.",
            "For interpreters the boundary is clear: your authorized use of PHI is limited to performing the interpretation. You are authorized to hear and render it in the encounter — nothing more. Using it for any other purpose, or sharing it with anyone outside the encounter, exceeds your authorization and becomes an unauthorized disclosure.",
          ],
          terminology: [
            { term: "TPO", definition: "Treatment, Payment, and Operations — purposes for which PHI may be used without extra authorization." },
            { term: "Authorization", definition: "A patient's specific written permission to use or disclose PHI beyond permitted purposes." },
            { term: "Release of information", definition: "A signed authorization allowing records to be shared with a named party." },
            { term: "Revocation", definition: "A patient's withdrawal of a previously granted authorization." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "PHI may be used without separate authorization for:",
              options: ["Treatment, payment, and health care operations", "Marketing to the public", "Personal storytelling", "Selling to advertisers"],
              answer: 0,
            },
          ],
        },
        {
          id: "l3",
          title: "Unauthorized Disclosures",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Recognize what counts as an unauthorized disclosure",
            "Identify common ways interpreters risk unauthorized disclosure",
            "Explain the consequences and how to prevent them",
          ],
          content: [
            "An unauthorized disclosure is any use or sharing of PHI that HIPAA does not permit and the patient did not authorize. It does not require bad intent — most breaches are accidental. Talking about a case where others can overhear, confirming that someone is a patient, posting on social media, texting PHI, or leaving records visible are all unauthorized disclosures, even when the interpreter meant no harm.",
            "Interpreters face specific temptations: a family member asks 'what did the doctor really mean?' after the session, a friend recognizes a name, or a curious colleague asks about an unusual case. In each situation the correct response is to disclose nothing outside the encounter and to redirect medical questions back to the provider through proper interpreting, not private conversation.",
            "Consequences of unauthorized disclosure include disciplinary action, removal from an agency, civil penalties, and — for willful misuse — criminal liability. Prevention is straightforward but requires discipline: say nothing about encounters, use only approved channels, keep your workspace private, and treat silence outside the room as part of the job.",
          ],
          terminology: [
            { term: "Unauthorized disclosure", definition: "Any use or sharing of PHI not permitted by HIPAA or authorized by the patient." },
            { term: "Incidental disclosure", definition: "A limited, unavoidable disclosure that occurs despite reasonable safeguards." },
            { term: "Social media risk", definition: "The danger of exposing PHI through posts, photos, or comments online." },
            { term: "Redirect", definition: "Sending a patient's or family's questions back to the provider rather than answering privately." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An unauthorized disclosure:",
              options: ["Requires proof of bad intent", "Can happen accidentally, such as being overheard", "Only applies to written records", "Is allowed among colleagues"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Minimum Necessary Rule",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "State the minimum-necessary rule and its purpose",
            "Note where it does and does not apply",
            "Apply it to interpreter conduct",
          ],
          content: [
            "The minimum-necessary rule requires covered entities and business associates to limit the use, access, and disclosure of PHI to the least amount needed to accomplish the intended purpose. It is a cornerstone of the Privacy Rule and a practical safeguard: the less information that moves around, the smaller the risk of exposure.",
            "There are important exceptions where minimum necessary does not apply — most notably disclosures for treatment (so clinicians get the full picture they need), disclosures to the patient themselves, and disclosures the patient has authorized. For interpreting, the treatment exception explains why you may hear complete clinical details in a session, while minimum necessary still governs what you retain, note, or ever repeat.",
            "In practice the rule shapes small daily choices: do not ask for a diagnosis you were not engaged to interpret, do not read ahead in a chart, keep notes to the minimum, and never carry information out of the encounter. When you apply minimum necessary consistently, most privacy risks simply never arise.",
          ],
          terminology: [
            { term: "Minimum necessary", definition: "The rule limiting PHI to the least needed for a purpose." },
            { term: "Treatment exception", definition: "The provision allowing full PHI sharing among clinicians for care." },
            { term: "Need to know", definition: "The principle of accessing only information required for one's specific role." },
            { term: "Retention limit", definition: "Keeping PHI only as long as necessary for the task." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The minimum-necessary rule generally does NOT restrict disclosures made for:",
              options: ["Marketing", "Treatment", "Social media", "Personal curiosity"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m4",
      title: "Security Rule",
      lessons: [
        {
          id: "l1",
          title: "Electronic PHI",
          duration: "13:10",
          type: "video",
          completed: false,
          videoUrl: V.d,
          objectives: [
            "Define electronic PHI (ePHI) and the Security Rule",
            "Describe the three types of safeguards",
            "Relate ePHI protection to interpreting work",
          ],
          content: [
            "The HIPAA Security Rule protects electronic PHI (ePHI) — any PHI created, stored, or transmitted in electronic form. It requires three kinds of safeguards. Administrative safeguards are policies, training, and access management. Physical safeguards protect the devices and spaces where ePHI lives. Technical safeguards are the technology controls: access controls, encryption, audit logs, and secure transmission.",
            "Interpreting today is saturated with ePHI: video and phone platforms carry it, scheduling systems store it, and messages about assignments may reference it. Even without touching a medical record, a remote interpreter transmits ePHI every time a patient speaks over a video link. That makes Security Rule habits central to the modern interpreting role, not an IT afterthought.",
            "The core idea is that protecting ePHI is a shared, layered responsibility. The organization provides secure systems; the interpreter must use them correctly — logging in properly, keeping software current, and never routing health information through personal, unsecured technology.",
          ],
          terminology: [
            { term: "ePHI", definition: "Electronic Protected Health Information." },
            { term: "Security Rule", definition: "The HIPAA rule requiring safeguards for electronic PHI." },
            { term: "Administrative safeguard", definition: "Policies, training, and access management protecting ePHI." },
            { term: "Technical safeguard", definition: "Technology controls such as access control, encryption, and audit logs." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The Security Rule specifically protects:",
              options: ["Only paper records", "Electronic PHI (ePHI)", "Only verbal disclosures", "Only billing statements"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Password Protection",
          duration: "12:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply strong password and authentication practices",
            "Explain why credentials must never be shared",
            "Use multi-factor authentication appropriately",
          ],
          content: [
            "Passwords are the first technical safeguard an interpreter controls directly. Use long, unique passwords for each work account, never reuse personal passwords, and store them in a reputable password manager rather than on sticky notes or in a browser on a shared computer. Weak or reused passwords are among the most common causes of account compromise.",
            "Never share your credentials — not with a colleague 'just this once,' not with family, not with anyone. Access to interpreting platforms is tied to your identity and creates audit records; if someone uses your login, any misuse is attributed to you. Log out fully when you finish, especially on any device others can reach.",
            "Multi-factor authentication (MFA) adds a second check — typically a code from an app or device — so a stolen password alone cannot open your account. Enable it wherever your platform offers it. These habits are simple, but they are exactly what stands between a lost password and a reportable breach of patient information.",
          ],
          terminology: [
            { term: "Strong password", definition: "A long, unique password not reused across accounts." },
            { term: "Password manager", definition: "A secure tool for storing and generating unique passwords." },
            { term: "Multi-factor authentication (MFA)", definition: "A second verification step beyond a password." },
            { term: "Credential sharing", definition: "Giving login access to another person — prohibited for ePHI systems." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A remote interpreter should protect account access by:",
              options: ["Sharing a password with a trusted colleague", "Using strong, unique passwords and enabling MFA", "Reusing the same password everywhere", "Writing passwords on a visible note"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Device Security",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Secure the devices used for interpreting",
            "Apply encryption, updates, and screen-lock practices",
            "Handle lost or stolen devices correctly",
          ],
          content: [
            "Device security protects the phones, tablets, and computers through which ePHI flows. Keep the operating system and applications updated so known vulnerabilities are patched. Enable full-disk encryption so information is unreadable if the device is lost. Use automatic screen locks with a strong PIN or biometric, and lock the device whenever you step away.",
            "Keep work and personal use separated as much as possible. Do not install unvetted apps on a device used for interpreting, avoid public or unsecured Wi-Fi for sessions (use a trusted network or a VPN if your organization provides one), and run reputable security software. Physically secure devices — do not leave them visible in a car or unattended in public.",
            "If a device that could contain or access ePHI is lost or stolen, report it immediately through your organization's process so access can be revoked and, if required, a breach assessment can begin. Fast reporting can prevent a lost phone from becoming a full-scale disclosure. Prompt honesty here is itself compliant behavior.",
          ],
          terminology: [
            { term: "Encryption", definition: "Encoding data so it is unreadable without a key, protecting lost devices." },
            { term: "Screen lock", definition: "An automatic lock requiring a PIN or biometric to regain access." },
            { term: "Patch/update", definition: "Software fixes that close known security vulnerabilities." },
            { term: "VPN", definition: "A virtual private network that secures data over untrusted connections." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If a device with access to ePHI is lost or stolen, the interpreter should:",
              options: ["Wait to see if it turns up", "Report it immediately through the organization's process", "Buy a replacement quietly", "Do nothing if it was password-locked"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Remote Interpretation Security",
          duration: "13:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply Security Rule practices to OPI and VRI",
            "Create a technically and physically secure remote setup",
            "Recognize security failures unique to remote work",
          ],
          content: [
            "Remote interpretation combines technical and physical security in one workflow. Technically, always connect through the vendor-provided, encrypted platform rather than a personal video or phone app, keep that software updated, and use a secure network. Physically, work where no one can see your screen or overhear the audio, use a headset to contain sound, and never let household members wander into the session's view or earshot.",
            "Remote work introduces failure modes that in-person work does not. Smart speakers and voice assistants may be listening; screen-sharing can accidentally reveal another window; a background may show notes or another patient's information; and 'quick' sessions from a coffee shop expose audio to strangers. Each of these can turn an ordinary call into a disclosure.",
            "Case study: an interpreter takes a VRI session from a home office but leaves a previous patient's note on the desk, visible on camera. The provider spots it. The lesson: a secure remote setup is checked every time — clear the desk, close other windows, confirm the space is private, and verify you are on the approved platform before the encounter begins.",
          ],
          terminology: [
            { term: "OPI", definition: "Over-the-Phone Interpreting." },
            { term: "VRI", definition: "Video Remote Interpreting." },
            { term: "Approved platform", definition: "The vendor-sanctioned, encrypted system required for remote sessions." },
            { term: "Ambient capture", definition: "Unintended recording or listening by nearby smart devices." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A secure VRI setup includes:",
              options: ["Working in a public café for good Wi-Fi", "A private space, headset, cleared background, and the approved platform", "Using a personal social video app", "Leaving prior notes visible for reference"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m5",
      title: "Confidentiality",
      lessons: [
        {
          id: "l1",
          title: "Confidentiality Principles",
          duration: "13:00",
          type: "video",
          completed: false,
          videoUrl: V.e,
          objectives: [
            "Define confidentiality and distinguish it from privacy and security",
            "Explain that confidentiality is permanent",
            "Identify the narrow, proper limits to confidentiality",
          ],
          content: [
            "Confidentiality is the professional and ethical duty to keep everything learned in an encounter private. It overlaps with HIPAA but is broader: even where a specific law might not reach, the interpreter's code of ethics still forbids disclosure. Privacy is the patient's right, security is how information is technically protected, and confidentiality is the interpreter's personal commitment not to reveal what they learn.",
            "Confidentiality is permanent. It does not end when the session ends, when the assignment relationship ends, or even years later. An interpreter carries the duty for life. This includes not reacting visibly to sensitive content in ways that reveal it, not discussing 'old' cases, and not treating the passage of time as permission to talk.",
            "The limits are narrow and never left to the interpreter alone. Certain situations — an imminent threat of serious harm, or legally mandated reporting of abuse in some roles — may require disclosure, but these are handled through the provider and proper channels. The interpreter interprets faithfully and, if needed, transparently raises the concern, rather than breaching confidentiality on their own initiative.",
          ],
          terminology: [
            { term: "Confidentiality", definition: "The interpreter's duty to keep encounter information private, permanently." },
            { term: "Privacy vs. security vs. confidentiality", definition: "The patient's right, the technical protection, and the interpreter's personal duty." },
            { term: "Duration", definition: "The permanence of confidentiality, continuing after the assignment ends." },
            { term: "Narrow limits", definition: "Rare situations (imminent harm, mandated reporting) handled through proper channels." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An interpreter's duty of confidentiality:",
              options: ["Ends when the session ends", "Continues permanently, even after the assignment ends", "Applies only to written notes", "Allows sharing with family"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "Interpreter Ethics",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Connect confidentiality to the broader interpreter code of ethics",
            "Explain how impartiality and accuracy support privacy",
            "Apply ethical principles to a dilemma",
          ],
          content: [
            "Confidentiality sits within a larger ethical framework. The NCIHC and IMIA codes center on accuracy, confidentiality, impartiality, respect, cultural awareness, professional boundaries, and advocacy limited to patient welfare. These principles reinforce one another: an impartial interpreter who keeps strict boundaries is also less likely to overshare or get drawn into private conversations that risk disclosure.",
            "Accuracy and confidentiality work together. Rendering everything faithfully — without adding, omitting, or editorializing — keeps the interpreter in the role of a conduit rather than a participant who accumulates and might repeat information. Maintaining boundaries (declining to give opinions, not befriending patients on the basis of an encounter) protects both the professional relationship and the patient's privacy.",
            "Ethical dilemma: after a difficult session, a patient's relative pulls the interpreter aside and pleads for 'the truth' about the prognosis. The ethical response honors confidentiality and role boundaries: the interpreter does not disclose or interpret privately, but offers to interpret the relative's questions to the care team, keeping all information within the proper channel.",
          ],
          terminology: [
            { term: "Code of ethics", definition: "Professional standards (NCIHC, IMIA) governing interpreter conduct." },
            { term: "Impartiality", definition: "Remaining neutral and not taking sides in the encounter." },
            { term: "Professional boundaries", definition: "Limits that keep the interpreter in a defined, appropriate role." },
            { term: "Conduit role", definition: "The interpreter's primary function as a faithful channel for communication." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When a relative privately asks the interpreter for 'the truth' about a prognosis, the ethical response is to:",
              options: ["Share what was heard", "Decline to disclose and offer to interpret their questions to the care team", "Give a personal opinion", "Guess to reassure them"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Privacy Breaches",
          duration: "13:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Define a breach and give common examples",
            "Distinguish breaches from permitted incidental disclosures",
            "Understand breach-notification obligations at a high level",
          ],
          content: [
            "A breach is an unauthorized acquisition, access, use, or disclosure of PHI that compromises its security or privacy. Common examples for interpreters include being overheard discussing a case, sending PHI to the wrong recipient, a lost or stolen unencrypted device, leaving records visible, or posting identifiable details online. Most breaches are unintentional, but they are breaches nonetheless.",
            "Not every incidental exposure is a reportable breach. HIPAA allows limited 'incidental disclosures' that occur despite reasonable safeguards — for example, a word briefly overheard in a properly managed setting. The distinction turns on whether reasonable safeguards were in place and how much information was exposed. When in doubt, treat it as a possible breach and report it.",
            "When a breach is confirmed, organizations must follow breach-notification requirements: assessing the risk, notifying affected individuals, and in larger cases notifying HHS and sometimes the media. Interpreters are not responsible for running this process, but they are responsible for triggering it by reporting promptly, which allows the organization to contain harm quickly.",
          ],
          terminology: [
            { term: "Breach", definition: "An unauthorized use or disclosure of PHI that compromises its security or privacy." },
            { term: "Incidental disclosure", definition: "A limited, permitted exposure occurring despite reasonable safeguards." },
            { term: "Risk assessment", definition: "The evaluation of a possible breach's likelihood and impact." },
            { term: "Breach notification", definition: "The required process of informing affected individuals and authorities." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which is a common privacy breach for interpreters?",
              options: ["Interpreting faithfully in session", "Sending PHI to the wrong recipient", "Using the approved platform", "Ending the session on time"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Reporting Violations",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Explain how and when to report a violation",
            "Describe protections for those who report in good faith",
            "Apply reporting steps to a scenario",
          ],
          content: [
            "Reporting is a core compliance responsibility. If you cause, witness, or suspect a privacy or security violation, report it promptly through your organization's or agency's designated channel — typically a privacy officer, compliance line, or incident-report process. Report the facts you know without speculating, and do so as soon as possible, since speed limits the harm.",
            "Reporting in good faith is protected. Organizations are prohibited from retaliating against someone for reporting a suspected violation, and reporting your own honest mistake is viewed far more favorably than concealing it. Attempting to hide a breach can turn a manageable incident into willful neglect, which carries the heaviest penalties.",
            "Scenario: you realize you accidentally emailed a document containing a patient's name and diagnosis to the wrong address. The correct steps are to stop and not forward it further, notify your privacy officer or agency contact immediately with the details, follow their instructions (such as recall or documentation), and cooperate fully. Prompt, honest reporting is exactly what the system is designed to reward.",
          ],
          terminology: [
            { term: "Privacy officer", definition: "The designated person responsible for handling HIPAA compliance and incidents." },
            { term: "Incident report", definition: "A formal notification of a possible privacy or security event." },
            { term: "Non-retaliation", definition: "Protection against punishment for reporting a violation in good faith." },
            { term: "Willful neglect", definition: "Conscious failure to comply, carrying the most severe penalties." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The best response to discovering your own accidental PHI disclosure is to:",
              options: ["Conceal it and hope it is not noticed", "Report it promptly to the privacy officer and follow instructions", "Delete all evidence", "Blame the provider"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m6",
      title: "Compliance for Remote Interpreters",
      lessons: [
        {
          id: "l1",
          title: "OPI Compliance",
          duration: "12:40",
          type: "video",
          completed: false,
          videoUrl: V.f,
          objectives: [
            "Apply HIPAA specifically to over-the-phone interpreting",
            "Identify OPI-specific privacy risks",
            "Adopt compliant OPI habits",
          ],
          content: [
            "Over-the-phone interpreting (OPI) carries full HIPAA obligations even though there is no video. The audio itself is PHI: everything the patient says is protected, and it can be overheard by anyone near you. OPI compliance therefore centers on the audio environment and the phone system — using the vendor-provided line or app rather than a personal phone connection whenever required, and keeping the conversation contained.",
            "OPI-specific risks are easy to underestimate. Speakerphone in a shared space, taking a call in a car with passengers, background voices that reveal you are interpreting, or notes jotted on any handy paper all create exposure. Because the other parties cannot see your surroundings, the discipline of a private space rests entirely on you.",
            "Compliant OPI habits: work in a private room, use a headset, keep your voice low, silence and secure other devices, take only minimum-necessary notes on approved materials and destroy them afterward, and confirm you are on the correct, secure line before beginning. The invisibility of the phone is exactly why self-discipline matters most.",
          ],
          terminology: [
            { term: "OPI", definition: "Over-the-Phone Interpreting." },
            { term: "Audio PHI", definition: "Spoken health information, which is protected just like written PHI." },
            { term: "Private environment", definition: "A space where the interpreter cannot be overheard." },
            { term: "Headset use", definition: "Containing session audio so it is not broadcast to others." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In OPI, the spoken content of the call is:",
              options: ["Not protected because it is not written", "PHI that must be kept private", "Public information", "Only protected if recorded"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "VRI Compliance",
          duration: "13:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Apply HIPAA specifically to video remote interpreting",
            "Manage camera, screen, and background risks",
            "Adopt compliant VRI habits",
          ],
          content: [
            "Video remote interpreting (VRI) adds visual dimensions to every OPI concern. Now your camera background, your screen, and anything visible in your space can disclose PHI. VRI compliance means using the approved, encrypted video platform, and controlling exactly what the camera and any shared screen reveal. Both audio and video are PHI channels that must be protected at once.",
            "Manage the visual field deliberately: use a plain or virtual background, ensure no notes, other patients' information, or personal documents are in view, and close every unrelated window before any screen-share. Confirm no one else can see your monitor. Verify the patient and provider are who they should be, and that you have joined the correct session.",
            "Compliant VRI habits combine the OPI basics — private space, headset, minimal notes — with visual discipline: cleared desk and background, locked door if possible, camera framed to reveal nothing sensitive, and the platform's security features enabled. A final pre-session check of both what can be heard and what can be seen prevents the most common VRI breaches.",
          ],
          terminology: [
            { term: "VRI", definition: "Video Remote Interpreting." },
            { term: "Background control", definition: "Managing what the camera reveals behind the interpreter." },
            { term: "Screen-share hygiene", definition: "Closing unrelated windows before sharing a screen." },
            { term: "Identity verification", definition: "Confirming the correct parties and session before proceeding." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "A VRI-specific privacy risk that OPI does not have is:",
              options: ["Spoken PHI", "The camera revealing notes or documents in view", "Using a headset", "Hearing the patient"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Secure Work Environment",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Set up a physically secure remote workspace",
            "Control who and what can access the space",
            "Maintain the environment consistently",
          ],
          content: [
            "A secure work environment is the physical foundation of remote compliance. Ideally, interpret from a private room with a door that closes; if that is not possible, choose the most private space available and position yourself so screens and papers face away from others. Household members, visitors, and even pets that draw people into the room can all create exposure.",
            "Control the space actively. Silence or remove smart speakers and voice assistants that may capture audio, use a headset so only you hear the patient, keep the desk clear of any other patient's information, and lock the door when feasible. Public spaces — cafés, shared offices, transit — are not appropriate for handling PHI and should be avoided for sessions.",
            "Consistency is what makes a workspace truly secure. A room that is private during scheduled hours but shared at other times still requires you to secure devices and notes every time you step away. Building a repeatable routine — same private setup, same checks, every session — turns environmental security into a reliable habit rather than a hope.",
          ],
          terminology: [
            { term: "Private workspace", definition: "A controlled area where sessions cannot be seen or overheard." },
            { term: "Ambient devices", definition: "Smart speakers or assistants that may capture session audio." },
            { term: "Access control", definition: "Limiting who can enter or observe the work area." },
            { term: "Routine", definition: "A repeatable setup and check process that keeps the environment secure." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Which is an appropriate remote interpreting environment?",
              options: ["A busy coffee shop", "A private room with a headset and cleared desk", "A shared bus", "An open office within earshot of others"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Recording Restrictions",
          duration: "12:30",
          type: "lecture",
          completed: false,
          objectives: [
            "State the rules on recording interpreting sessions",
            "Explain why unauthorized recording is prohibited",
            "Respond correctly if recording is requested or occurring",
          ],
          content: [
            "The baseline rule is simple: interpreters do not record sessions — audio, video, screenshots, or otherwise — unless explicitly authorized in writing and using approved, secure systems. A recording is a permanent copy of PHI, and creating one without authorization is a serious violation that multiplies the risk of exposure far beyond the moment of the encounter.",
            "This extends to seemingly harmless acts: no screenshots of a video session, no photos of documents, no personal 'practice' recordings, and no saving of chat logs to personal devices. Even if a recording would help you review terminology, the privacy risk is unacceptable, and any authorized recording belongs solely to the covered entity under strict controls.",
            "If a provider or platform is recording as part of the official record, that is their authorized decision, not yours to initiate, and you simply continue interpreting. If a patient or family member asks you to record, decline and refer the request to the provider. If you discover an unauthorized recording is occurring, raise it transparently and report it through proper channels.",
          ],
          terminology: [
            { term: "Recording", definition: "Any audio, video, screenshot, or copy capturing session content." },
            { term: "Written authorization", definition: "Explicit documented permission required before any recording." },
            { term: "Permanent copy", definition: "A stored reproduction of PHI that extends exposure risk over time." },
            { term: "Screenshot prohibition", definition: "The rule against capturing images of a session or its documents." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "An interpreter may record a session only when:",
              options: ["It would help them review later", "Explicitly authorized in writing and using approved systems", "A family member asks", "The session is difficult"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Data Handling",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Manage the full life cycle of any data an interpreter touches",
            "Apply minimization, secure storage, and secure disposal",
            "Avoid common remote data-handling failures",
          ],
          content: [
            "Data handling covers everything from a scribbled term to a scheduling message. Apply data minimization: create as little as possible, keep only what a task truly requires, and delete it promptly. Temporary notes should contain the minimum necessary, never leave your control, and be shredded or permanently deleted as soon as the session's need has passed.",
            "Store and transmit data only through approved, secure channels. Do not email PHI to personal accounts, do not save it to personal cloud storage or messaging apps, and do not keep spreadsheets or logs of patients you have served. Assignment details from your agency are themselves sensitive and should be handled with the same care, kept on approved systems and out of personal tools.",
            "Common remote failures are mundane: a reused scratch pad with old notes, a screenshot saved 'just in case,' PHI in a personal text thread, or files left in a downloads folder. Building disciplined habits — minimize, secure, dispose — closes these gaps. This lesson completes the remote-compliance module and leads into applying everything to real-world scenarios.",
          ],
          terminology: [
            { term: "Data life cycle", definition: "The stages from creation and use to storage and secure destruction of information." },
            { term: "Data minimization", definition: "Creating and keeping only the information necessary for the task." },
            { term: "Secure disposal", definition: "Shredding or permanently deleting PHI so it cannot be recovered." },
            { term: "Approved storage", definition: "Vendor-sanctioned systems, never personal email or cloud accounts." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Temporary notes containing PHI should be:",
              options: ["Kept for future reference", "Securely destroyed as soon as they are no longer needed", "Emailed to yourself", "Saved to personal cloud storage"],
              answer: 1,
            },
          ],
        },
      ],
    },
    {
      id: "m7",
      title: "Real-World Scenarios",
      lessons: [
        {
          id: "l1",
          title: "Compliance Scenarios",
          duration: "15:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Apply HIPAA rules to realistic, layered situations",
            "Choose the compliant action under pressure",
            "Explain the reasoning behind each choice",
          ],
          content: [
            "This lesson works through compliant decision-making in realistic situations. Scenario one: mid-session, a family member off-camera asks you privately, in the patient's language, to 'tell the doctor to say it's not serious.' The compliant action is to interpret their statement transparently to the provider rather than acting on it privately — you remain a faithful conduit and do not filter or negotiate content.",
            "Scenario two: a provider asks you to 'quickly look up' the patient's last visit in the chart to save time. The compliant action is to decline access you were not engaged to use, applying minimum necessary, and let the provider retrieve what they need. Scenario three: your agency dispatcher, curious, asks how a well-known local figure's appointment went. The compliant action is to share nothing — confirming even that the person was seen is a disclosure.",
            "Across these, the pattern is consistent: stay in role, apply minimum necessary, use only approved access and channels, and keep everything within the encounter. Compliance under pressure is rarely about knowing an obscure rule — it is about calmly applying the same core principles when someone invites you, however innocently, to bend them.",
          ],
          terminology: [
            { term: "Stay in role", definition: "Remaining a faithful conduit rather than a decision-maker or advocate." },
            { term: "Access boundary", definition: "Using only the information and systems your task requires." },
            { term: "Non-confirmation", definition: "Refusing to confirm even that a person is a patient." },
            { term: "Transparency", definition: "Openly interpreting side comments to the full care team." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If a dispatcher asks how a well-known person's appointment went, the interpreter should:",
              options: ["Share a brief summary", "Share nothing, since even confirming the visit is a disclosure", "Confirm only the diagnosis", "Describe it without names"],
              answer: 1,
            },
          ],
        },
        {
          id: "l2",
          title: "HIPAA Violations",
          duration: "14:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Recognize violations across the full range of interpreter work",
            "Analyze why each example is a violation",
            "Connect violations to their likely consequences",
          ],
          content: [
            "Studying real violation patterns builds instinct. Violation one — 'the overheard call': an interpreter takes an OPI session on speakerphone in a shared home office; a roommate hears the patient's mental-health details. This breaches confidentiality and the Security/Privacy expectations of a private environment; the fix is a headset and a private room.",
            "Violation two — 'the helpful screenshot': an interpreter captures a screen of medical terms during a VRI session to study later. This creates an unauthorized permanent copy of PHI, breaking recording restrictions and data-handling rules. Violation three — 'the small-world slip': at a family gathering, an interpreter mentions having interpreted for a relative's neighbor, revealing the person is a patient — an unauthorized disclosure that no passage of time or good intention excuses.",
            "Violation four — 'the convenient email': an interpreter forwards an assignment document containing a name and diagnosis to a personal address to work from later, exposing PHI on an unsecured account. Each example maps to consequences — disciplinary action, removal from a roster, civil penalties, and for willful misuse, criminal liability. Seeing the pattern makes the correct alternative obvious in the moment.",
          ],
          terminology: [
            { term: "Confidentiality breach", definition: "Revealing encounter information to anyone outside the encounter." },
            { term: "Unauthorized copy", definition: "A screenshot or recording of PHI made without written authorization." },
            { term: "Small-world disclosure", definition: "Revealing patient status through casual mention to acquaintances." },
            { term: "Consequence", definition: "The discipline, penalties, or liability resulting from a violation." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Taking a screenshot of medical terms during a VRI session to study later is:",
              options: ["Acceptable for learning", "A violation — an unauthorized permanent copy of PHI", "Fine if names are cropped", "Allowed with a colleague"],
              answer: 1,
            },
          ],
        },
        {
          id: "l3",
          title: "Decision-Making Exercises",
          duration: "15:30",
          type: "reading",
          completed: false,
          objectives: [
            "Practice a repeatable decision framework for privacy dilemmas",
            "Work through exercises and self-check the reasoning",
            "Prepare for the final exam",
          ],
          content: [
            "Use a simple decision framework whenever a privacy dilemma arises: (1) Is this information PHI? (usually yes); (2) Does what I'm about to do use or share it beyond performing my interpreting role?; (3) Is there authorization or a HIPAA-permitted purpose?; (4) Am I using an approved, secure channel and a private environment?; (5) If anything is uncertain, protect more, and report if a breach may have occurred. Running these five questions takes seconds and resolves most situations.",
            "Practice exercise A: a patient hands you their phone mid-visit and asks you to photograph their discharge papers 'so you both have a copy.' Work the framework: it is PHI; photographing to your device exceeds your role and creates an unauthorized copy; there is no authorization for you to hold it; decline and redirect the request to the provider or front desk. Exercise B: a colleague asks you to cover a session under their login because theirs is glitching — the framework flags credential sharing and identity/audit problems; decline and have them contact support.",
            "Practice exercise C: after a session, you notice you still have a sticky note with a patient's initials and medication — the framework says minimize and dispose, so shred it now and avoid initials next time. Self-check each exercise against the principles from earlier modules, then rehearse the framework until it is automatic. You are now ready for the 40-question final exam; a passing score of 80 percent confirms your readiness, and completion awards a certificate valid for one year, after which renewal is required.",
          ],
          terminology: [
            { term: "Decision framework", definition: "A repeatable set of questions for resolving privacy dilemmas." },
            { term: "Redirect", definition: "Sending a request to the proper party (provider or front desk) instead of acting on it." },
            { term: "Credential sharing", definition: "Using another person's login — prohibited for ePHI systems." },
            { term: "Protect more", definition: "The default of choosing the more protective action when uncertain." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "If a patient asks you to photograph their discharge papers on your own phone, you should:",
              options: ["Do it to be helpful", "Decline and redirect the request to the provider or front desk", "Do it but delete later", "Photograph only part of it"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "HIPAA & Compliance for Healthcare Interpreters — Final Exam",
    category: "Compliance",
    durationMinutes: 40,
    passingScore: 80,
    questions: [
      { id: "q1", question: "HIPAA is the U.S. law that:", options: ["Licenses interpreters", "Sets national standards for protecting patient health information", "Sets hospital prices", "Regulates medication approval"], answer: 1 },
      { id: "q2", question: "The two HIPAA rules interpreters deal with most are the:", options: ["Privacy Rule and Security Rule", "Tax Rule and Labor Rule", "Billing Rule and Patent Rule", "Import and Export Rules"], answer: 0 },
      { id: "q3", question: "A medical interpreter working through an agency is generally considered a:", options: ["Covered entity's owner", "Business associate or member of the treatment team", "Regulator", "Unrelated third party"], answer: 1 },
      { id: "q4", question: "HIPAA was originally enacted in:", options: ["1986", "1996", "2009", "2013"], answer: 1 },
      { id: "q5", question: "The 2009 HITECH Act notably:", options: ["Repealed HIPAA", "Made business associates directly liable and added breach notification", "Removed all penalties", "Applied only to pharmacies"], answer: 1 },
      { id: "q6", question: "When a state privacy law is stricter than HIPAA, an interpreter follows:", options: ["Whichever is easier", "The stricter, more protective law", "Only HIPAA", "Neither"], answer: 1 },
      { id: "q7", question: "A primary reason HIPAA matters for care is that privacy lets patients:", options: ["Pay less", "Speak openly, supporting accurate and safe care", "Skip appointments", "Avoid interpreters"], answer: 1 },
      { id: "q8", question: "PHI is best defined as:", options: ["Any individually identifiable health information", "Only written diagnoses", "Only lab results", "Only insurance numbers"], answer: 0 },
      { id: "q9", question: "Information is 'individually identifiable' when it:", options: ["Is written in English", "Could reasonably be used to determine who the patient is", "Comes from a doctor", "Is older than a year"], answer: 1 },
      { id: "q10", question: "Which is PHI?", options: ["The clinic's business hours", "A generic drug's formula", "The fact that a named person is a patient with a specific diagnosis", "Today's weather"], answer: 2 },
      { id: "q11", question: "An appointment date and time for a specific patient is:", options: ["Not PHI", "PHI", "Public record", "Only PHI if written"], answer: 1 },
      { id: "q12", question: "The minimum-necessary standard directs interpreters to:", options: ["Learn everything about each patient", "Use and share only the least PHI needed for the task", "Keep permanent case notes", "Share cases with peers"], answer: 1 },
      { id: "q13", question: "If an interpreter recognizes an incoming patient as an acquaintance, the responsible first step is to:", options: ["Discuss their shared past", "Disclose the potential conflict to the provider", "Tell mutual friends afterward", "Read the chart"], answer: 1 },
      { id: "q14", question: "Truly de-identified information is:", options: ["Still fully protected as PHI", "No longer PHI, but interpreters should not decide this themselves", "Always safe to post online", "The same as minimum necessary"], answer: 1 },
      { id: "q15", question: "Under the Privacy Rule, patients have the right to:", options: ["Read other patients' charts", "Access and request corrections to their own records", "Set staff schedules", "Waive interpreter confidentiality for others"], answer: 1 },
      { id: "q16", question: "'TPO' stands for:", options: ["Treatment, Payment, and Operations", "Time, Place, and Order", "Test, Prescribe, Observe", "Transfer, Protect, Omit"], answer: 0 },
      { id: "q17", question: "PHI may be used without separate authorization for:", options: ["Marketing to the public", "Treatment, payment, and health care operations", "Personal storytelling", "Selling to advertisers"], answer: 1 },
      { id: "q18", question: "A valid patient authorization is:", options: ["Verbal and permanent", "Specific about what, to whom, why, and when it expires, and revocable", "Unlimited in scope", "Decided by the interpreter"], answer: 1 },
      { id: "q19", question: "An unauthorized disclosure:", options: ["Requires proof of bad intent", "Can happen accidentally, such as being overheard", "Applies only to paper records", "Is fine among colleagues"], answer: 1 },
      { id: "q20", question: "The minimum-necessary rule generally does NOT restrict disclosures for:", options: ["Marketing", "Treatment", "Social media", "Personal curiosity"], answer: 1 },
      { id: "q21", question: "An interpreter's authorized use of PHI is limited to:", options: ["Anything they find interesting", "Performing the interpretation in the encounter", "Sharing with family", "Building a case portfolio"], answer: 1 },
      { id: "q22", question: "The Security Rule specifically protects:", options: ["Only paper records", "Electronic PHI (ePHI)", "Only verbal disclosures", "Only billing"], answer: 1 },
      { id: "q23", question: "The three types of Security Rule safeguards are:", options: ["Legal, financial, and clinical", "Administrative, physical, and technical", "Local, state, and federal", "Verbal, written, and visual"], answer: 1 },
      { id: "q24", question: "A remote interpreter should protect account access by:", options: ["Sharing a password with a colleague", "Using strong, unique passwords and enabling MFA", "Reusing one password everywhere", "Writing passwords on a visible note"], answer: 1 },
      { id: "q25", question: "Multi-factor authentication (MFA) provides:", options: ["A faster login with no password", "A second verification step beyond the password", "Automatic recording", "Shared access for teams"], answer: 1 },
      { id: "q26", question: "Full-disk encryption on a device ensures that:", options: ["The device runs faster", "Data is unreadable if the device is lost or stolen", "No password is needed", "Files can be shared publicly"], answer: 1 },
      { id: "q27", question: "If a device with access to ePHI is lost or stolen, the interpreter should:", options: ["Wait to see if it turns up", "Report it immediately through the organization's process", "Replace it quietly", "Do nothing if it was locked"], answer: 1 },
      { id: "q28", question: "In OPI, the spoken content of the call is:", options: ["Not protected because it is unwritten", "PHI that must be kept private", "Public information", "Protected only if recorded"], answer: 1 },
      { id: "q29", question: "A VRI-specific risk that OPI does not have is:", options: ["Spoken PHI", "The camera revealing notes or documents", "Using a headset", "Hearing the patient"], answer: 1 },
      { id: "q30", question: "An appropriate remote interpreting environment is:", options: ["A busy café", "A private room with a headset and cleared desk", "A shared bus", "An open office within earshot"], answer: 1 },
      { id: "q31", question: "Smart speakers and voice assistants near a session are a risk because they may:", options: ["Improve audio quality", "Capture session audio (ambient capture)", "Translate automatically", "Encrypt the call"], answer: 1 },
      { id: "q32", question: "An interpreter may record a session only when:", options: ["It would help them review later", "Explicitly authorized in writing and using approved systems", "A family member requests it", "The content is difficult"], answer: 1 },
      { id: "q33", question: "Taking a screenshot of medical terms during a VRI session to study later is:", options: ["Acceptable for learning", "A violation — an unauthorized permanent copy of PHI", "Fine if names are cropped", "Allowed with a colleague"], answer: 1 },
      { id: "q34", question: "Temporary notes containing PHI should be:", options: ["Kept for future reference", "Securely destroyed when no longer needed", "Emailed to yourself", "Saved to personal cloud storage"], answer: 1 },
      { id: "q35", question: "An interpreter's duty of confidentiality:", options: ["Ends when the session ends", "Continues permanently, even after the assignment ends", "Applies only to written notes", "Allows sharing with family"], answer: 1 },
      { id: "q36", question: "Confidentiality differs from privacy and security in that it is:", options: ["A government rule only", "The interpreter's personal, ethical duty not to reveal what they learn", "A billing requirement", "A technical control"], answer: 1 },
      { id: "q37", question: "A common privacy breach for interpreters is:", options: ["Interpreting faithfully", "Sending PHI to the wrong recipient", "Using the approved platform", "Ending on time"], answer: 1 },
      { id: "q38", question: "The best response to discovering your own accidental PHI disclosure is to:", options: ["Conceal it", "Report it promptly to the privacy officer and follow instructions", "Delete the evidence", "Blame the provider"], answer: 1 },
      { id: "q39", question: "Reporting a suspected violation in good faith is:", options: ["Grounds for punishment", "Protected against retaliation", "Optional and discouraged", "Only for managers"], answer: 1 },
      { id: "q40", question: "If a patient asks you to photograph their discharge papers on your own phone, you should:", options: ["Do it to be helpful", "Decline and redirect the request to the provider or front desk", "Do it but delete later", "Photograph only part"], answer: 1 },
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
            "A diagram comparing joint types accompanies this lesson. 'Range of motion' — how far a joint can move ��� is a phrase interpreters hear often in exams and physical therapy. When a provider assesses whether a patient can 'flex and extend' a joint, or notes that 'the cartilage is worn down', the interpreter renders the specific joint and motion precisely, since these details guide diagnosis and treatment.",
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

// ────────���────────────────────────────────────────────────────────────────
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
