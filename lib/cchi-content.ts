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
// ─────────────────────────────────────────────────────────────────────────
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
      title: "Structure & Function of the Body",
      lessons: [
        {
          id: "l1",
          title: "Cells and Tissues",
          duration: "14:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Describe cells, tissues, organs, and systems as levels of organization",
            "Explain why interpreters need functional anatomy",
            "Connect structure to the vocabulary providers use",
          ],
          content: [
            "The body is organized in levels: cells combine into tissues, tissues form organs, and organs work together as systems. There are four basic tissue types — epithelial (covering and lining), connective (support, including blood and bone), muscle (movement), and nervous (signaling). Understanding these levels helps interpreters make sense of terms like 'biopsy' (sampling tissue) or 'metastasis' (spread of abnormal cells) rather than treating them as isolated words.",
            "Interpreters do not diagnose, but a working mental model of how the body fits together makes their renderings faster and more accurate. When a provider explains that 'the tumor is confined to the tissue and hasn't spread', an interpreter who understands cells and tissues can convey the reassurance accurately. A diagram of the cell-to-system hierarchy accompanies this lesson as a study reference.",
          ],
          terminology: [
            { term: "Cell", definition: "The basic structural and functional unit of the body." },
            { term: "Tissue", definition: "A group of similar cells performing a shared function." },
            { term: "Biopsy", definition: "Removal of a small tissue sample for examination." },
            { term: "Metastasis", definition: "The spread of cancer cells from the original site to other parts of the body." },
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
          id: "l2",
          title: "Skeletal System",
          duration: "13:20",
          type: "image",
          completed: false,
          objectives: [
            "Identify major bones and their functions",
            "Interpret skeletal terminology and injury descriptions",
          ],
          content: [
            "The skeletal system provides structure, protects organs, stores minerals, and produces blood cells in the marrow. Interpreters should know the common bone names patients and providers use — skull, spine (vertebrae), ribs, pelvis, femur, tibia — and the difference between the axial skeleton (skull, spine, ribs) and the appendicular skeleton (limbs and their girdles). A labeled skeletal diagram accompanies this lesson so learners can pair each term with its location.",
            "Practice scenario: a provider points to an X-ray and says 'there is a hairline fracture of the distal radius.' The interpreter must convey the location (near the wrist end of the forearm bone) and the nature (a thin, incomplete break) in language the patient understands, while keeping the clinical precision the provider intended.",
          ],
          terminology: [
            { term: "Vertebrae", definition: "The bones that form the spinal column." },
            { term: "Femur", definition: "The thigh bone, the longest bone in the body." },
            { term: "Axial skeleton", definition: "The skull, spine, and rib cage." },
            { term: "Marrow", definition: "Tissue inside bones that produces blood cells." },
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
          title: "Muscular System",
          duration: "12:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Distinguish the three muscle types and their roles",
            "Interpret movement and muscle-related terminology",
          ],
          content: [
            "The muscular system produces movement, maintains posture, and generates heat. There are three muscle types: skeletal (voluntary movement), cardiac (the heart), and smooth (involuntary, in organs and vessels). Interpreters encounter muscle terminology in rehabilitation, injury, and neurology settings, where distinguishing weakness (loss of strength) from paralysis (loss of movement) matters clinically.",
            "Worked example: in physical therapy a provider instructs the patient to 'contract and then relax' a muscle group. The interpreter renders the action verbs precisely so the patient performs the exercise correctly, since an inaccurate instruction can slow recovery or cause harm.",
          ],
          terminology: [
            { term: "Skeletal muscle", definition: "Voluntary muscle attached to bone that produces movement." },
            { term: "Cardiac muscle", definition: "Involuntary muscle of the heart." },
            { term: "Smooth muscle", definition: "Involuntary muscle in organs and blood vessels." },
            { term: "Atrophy", definition: "Wasting or shrinking of muscle from disuse or disease." },
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
          id: "l4",
          title: "Cardiovascular System",
          duration: "14:30",
          type: "image",
          completed: false,
          objectives: [
            "Describe the heart, blood vessels, and circulation",
            "Interpret cardiovascular physiology in patient-friendly language",
          ],
          content: [
            "The cardiovascular system circulates blood through the heart, arteries, veins, and capillaries. The heart's four chambers (two atria, two ventricles) pump oxygen-poor blood to the lungs and oxygen-rich blood to the body. Interpreters benefit from understanding this flow so that explanations of conditions like heart failure or a blocked artery can be rendered clearly. A labeled heart-and-circulation diagram accompanies this lesson.",
            "Practice scenario: a cardiologist explains that 'a coronary artery is narrowed, reducing blood flow to the heart muscle, which is why you feel chest pain on exertion.' The interpreter conveys the cause-and-effect chain accurately, helping the patient understand why activity triggers symptoms and why treatment is recommended.",
          ],
          terminology: [
            { term: "Atrium / Ventricle", definition: "Upper receiving chamber / lower pumping chamber of the heart." },
            { term: "Artery", definition: "A vessel carrying blood away from the heart." },
            { term: "Vein", definition: "A vessel carrying blood back to the heart." },
            { term: "Coronary arteries", definition: "Vessels that supply blood to the heart muscle itself." },
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
          id: "l5",
          title: "Respiratory System",
          duration: "13:00",
          type: "lecture",
          completed: false,
          objectives: [
            "Trace the path of air through the respiratory system",
            "Interpret respiratory physiology and gas exchange",
          ],
          content: [
            "The respiratory system moves air from the nose and mouth through the trachea and bronchi into the lungs, where tiny air sacs (alveoli) exchange oxygen and carbon dioxide with the blood. Understanding gas exchange helps interpreters render explanations of low oxygen ('hypoxia'), why oxygen therapy is used, and how conditions like asthma or pneumonia interfere with breathing.",
            "Worked example: a provider explains that 'in pneumonia the air sacs fill with fluid, so less oxygen reaches the blood.' The interpreter conveys the mechanism plainly, which helps the patient accept treatments like antibiotics and rest and understand warning signs to return for.",
          ],
          terminology: [
            { term: "Alveoli", definition: "Tiny air sacs in the lungs where gas exchange occurs." },
            { term: "Trachea", definition: "The windpipe carrying air to the bronchi." },
            { term: "Bronchi", definition: "The two main airways branching into each lung." },
            { term: "Hypoxia", definition: "Low oxygen levels in the tissues." },
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
          id: "l6",
          title: "Digestive System",
          duration: "13:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Trace the digestive tract and describe digestion",
            "Interpret GI physiology and related procedures",
          ],
          content: [
            "The digestive system breaks food into nutrients the body can absorb, moving it from the mouth through the esophagus, stomach, small intestine, and large intestine, with the liver, gallbladder, and pancreas contributing digestive fluids. Interpreters use this knowledge when providers explain conditions like acid reflux, ulcers, gallstones, or the purpose of a colonoscopy.",
            "Practice scenario: a provider explains that 'the gallbladder stores bile that helps digest fat, and your gallstones are blocking that flow, causing pain after fatty meals.' The interpreter renders the function and the cause of the pain so the patient understands why surgery or a diet change may be recommended.",
          ],
          terminology: [
            { term: "Esophagus", definition: "The tube carrying food from the throat to the stomach." },
            { term: "Small intestine", definition: "Where most nutrient absorption occurs." },
            { term: "Liver", definition: "Organ that processes nutrients and produces bile." },
            { term: "Bile", definition: "Digestive fluid that helps break down fats." },
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
          id: "l7",
          title: "Nervous System",
          duration: "14:10",
          type: "image",
          completed: false,
          objectives: [
            "Distinguish the central and peripheral nervous systems",
            "Interpret neurological function and common conditions",
          ],
          content: [
            "The nervous system is divided into the central nervous system (brain and spinal cord) and the peripheral nervous system (nerves throughout the body). It controls movement, sensation, thought, and automatic functions like heartbeat and breathing. Interpreters encounter this system in stroke, seizure, neuropathy, and mental-health contexts. A labeled brain-and-spinal-cord diagram accompanies this lesson.",
            "Worked example: a provider explains that 'the stroke affected the left side of the brain, which controls the right side of the body and speech.' Understanding this cross-control helps the interpreter render why the patient's right arm is weak and why speech is affected, supporting the family's understanding of rehabilitation goals.",
          ],
          terminology: [
            { term: "Central nervous system (CNS)", definition: "The brain and spinal cord." },
            { term: "Peripheral nervous system (PNS)", definition: "Nerves outside the brain and spinal cord." },
            { term: "Neuron", definition: "A nerve cell that transmits signals." },
            { term: "Neuropathy", definition: "Nerve damage causing numbness, pain, or weakness." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The central nervous system consists of the:",
              options: ["Heart and lungs", "Brain and spinal cord", "Nerves in the limbs", "Muscles and joints"],
              answer: 1,
            },
          ],
        },
        {
          id: "l8",
          title: "Endocrine System",
          duration: "12:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Describe hormones and the major endocrine glands",
            "Interpret endocrine conditions such as diabetes and thyroid disorders",
          ],
          content: [
            "The endocrine system uses glands — including the thyroid, pancreas, adrenal glands, and pituitary — to release hormones that regulate metabolism, growth, mood, and blood sugar. Interpreters frequently work with diabetes education, where accurate rendering of insulin, blood glucose, and diet instructions directly affects the patient's safety and self-management.",
            "Practice scenario: a diabetes educator explains that 'insulin moves sugar from the blood into the cells; without enough insulin, sugar builds up in the blood.' The interpreter conveys this mechanism so the patient understands why they monitor glucose and take medication, and why symptoms of high or low blood sugar require action. A study diagram of the major glands accompanies this lesson.",
          ],
          terminology: [
            { term: "Hormone", definition: "A chemical messenger released by a gland into the blood." },
            { term: "Insulin", definition: "A hormone from the pancreas that lowers blood sugar." },
            { term: "Thyroid", definition: "A gland regulating metabolism." },
            { term: "Glucose", definition: "Sugar in the blood used by cells for energy." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "Insulin is produced by the:",
              options: ["Thyroid", "Pancreas", "Adrenal glands", "Liver"],
              answer: 1,
            },
          ],
        },
      ],
    },
  ],
  finalAssessment: {
    title: "Anatomy & Physiology for Interpreters — Final Assessment",
    category: "Medical",
    durationMinutes: 30,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "The four basic tissue types are epithelial, connective, nervous, and:",
        options: ["Skeletal", "Muscle", "Vascular", "Glandular"],
        answer: 1,
      },
      {
        id: "q2",
        question: "Which chamber of the heart pumps oxygen-rich blood to the body?",
        options: ["Right atrium", "Left ventricle", "Right ventricle", "Left atrium"],
        answer: 1,
      },
      {
        id: "q3",
        question: "Gas exchange in the lungs occurs in the:",
        options: ["Bronchi", "Alveoli", "Trachea", "Pleura"],
        answer: 1,
      },
      {
        id: "q4",
        question: "The central nervous system is made up of the:",
        options: ["Brain and spinal cord", "Heart and lungs", "Nerves and muscles", "Glands and hormones"],
        answer: 0,
      },
      {
        id: "q5",
        question: "Insulin, which lowers blood sugar, is produced by the:",
        options: ["Liver", "Pancreas", "Thyroid", "Kidney"],
        answer: 1,
      },
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
      title: "Foundations & Body Systems",
      lessons: [
        {
          id: "l1",
          title: "Human Body Systems",
          duration: "16:00",
          type: "video",
          completed: false,
          videoUrl: V.a,
          objectives: [
            "Name the major body systems and their primary functions",
            "Break medical terms into root, prefix, and suffix",
            "Build accurate equivalents in the target language",
          ],
          content: [
            "Most medical terms are built from Greek and Latin word parts: a root (the core meaning, e.g., cardi- = heart), a prefix (position, number, or negation, e.g., brady- = slow), and a suffix (procedure or condition, e.g., -itis = inflammation). Learning to decode word parts lets an interpreter handle unfamiliar terms on the fly — 'gastritis' becomes gastr- (stomach) + -itis (inflammation), and you can render the concept even if you had never seen the exact word.",
            "The human body is organized into interacting systems: cardiovascular, respiratory, digestive, musculoskeletal, nervous, endocrine, urinary, reproductive, integumentary (skin), lymphatic/immune, and sensory. Interpreters do not need a physician's depth, but they must know each system's core vocabulary in both languages so that a symptom or diagnosis is never lost. This lesson establishes the decoding method used throughout the course.",
          ],
          terminology: [
            { term: "Root", definition: "The core meaning of a medical term (e.g., cardi- = heart, hepat- = liver)." },
            { term: "Prefix", definition: "A word part at the front that modifies meaning (e.g., hyper- = excessive, brady- = slow)." },
            { term: "Suffix", definition: "A word part at the end naming a condition or procedure (e.g., -itis = inflammation, -ectomy = surgical removal)." },
            { term: "-ology", definition: "The study of (e.g., cardiology = study of the heart)." },
            { term: "-itis", definition: "Inflammation of a structure (e.g., appendicitis)." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "The term 'hepatitis' breaks down as:",
              options: ["liver + removal", "liver + inflammation", "slow + liver", "heart + inflammation"],
              answer: 1,
              explanation: "hepat- (liver) + -itis (inflammation).",
            },
          ],
        },
        {
          id: "l2",
          title: "Cardiovascular Terminology",
          duration: "15:10",
          type: "lecture",
          completed: false,
          objectives: [
            "Master core cardiovascular vocabulary in both languages",
            "Interpret common cardiac symptoms and diagnoses accurately",
            "Avoid false friends and near-miss terms",
          ],
          content: [
            "The cardiovascular system moves blood, oxygen, and nutrients through the heart and vessels. Interpreters encounter this vocabulary in emergency, cardiology, and primary-care settings, often in high-acuity moments like chest pain. Precision matters: confusing 'hypertension' (high blood pressure) with 'hypotension' (low blood pressure) can send care in the wrong direction. Build a reliable two-language glossary for the terms below and rehearse them until they are automatic.",
            "Worked example: a provider says 'The patient has an MI.' 'MI' is myocardial infarction — a heart attack. A weaker interpreter might render 'MI' as loose letters; a competent one conveys 'heart attack' in the target language, then, if the patient looks confused, transparently supports the provider in explaining. Always interpret the clinical meaning, not the abbreviation alone.",
          ],
          terminology: [
            { term: "Myocardial infarction (MI)", definition: "Heart attack — death of heart muscle from blocked blood flow." },
            { term: "Hypertension", definition: "High blood pressure." },
            { term: "Hypotension", definition: "Low blood pressure." },
            { term: "Arrhythmia", definition: "Irregular heartbeat rhythm." },
            { term: "Tachycardia / Bradycardia", definition: "Fast heart rate / slow heart rate." },
            { term: "Angina", definition: "Chest pain from reduced blood flow to the heart." },
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
          id: "l3",
          title: "Respiratory Terminology",
          duration: "14:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Master respiratory vocabulary in both languages",
            "Interpret breathing symptoms and respiratory diagnoses precisely",
          ],
          content: [
            "The respiratory system exchanges oxygen and carbon dioxide through the airways and lungs. Interpreters meet these terms in urgent settings — asthma attacks, pneumonia, COVID-related care — where a patient's description of breathing difficulty must be rendered exactly. 'Dyspnea' (shortness of breath) and 'wheezing' are patient-safety-critical symptoms; never generalize them into 'trouble breathing' if the provider is trying to distinguish patterns.",
            "Practice scenario: a patient says, in their language, 'I feel like a weight is sitting on my chest and I can't get a full breath.' Render the metaphor and the symptom faithfully — the provider may be listening for descriptors that point to cardiac versus respiratory causes. Preserving the patient's exact imagery is part of accuracy.",
          ],
          terminology: [
            { term: "Dyspnea", definition: "Shortness of breath or difficulty breathing." },
            { term: "Asthma", definition: "A chronic condition causing airway narrowing and wheezing." },
            { term: "Pneumonia", definition: "Infection that inflames the air sacs of the lungs." },
            { term: "COPD", definition: "Chronic obstructive pulmonary disease — long-term airflow limitation." },
            { term: "Wheezing", definition: "A whistling sound during breathing from narrowed airways." },
            { term: "Sputum", definition: "Mucus coughed up from the respiratory tract." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Dyspnea' refers to:",
              options: ["Difficulty swallowing", "Shortness of breath", "Chest pain", "Coughing blood"],
              answer: 1,
            },
          ],
        },
        {
          id: "l4",
          title: "Digestive Terminology",
          duration: "13:50",
          type: "lecture",
          completed: false,
          objectives: [
            "Master gastrointestinal vocabulary in both languages",
            "Interpret common GI symptoms without euphemism or distortion",
          ],
          content: [
            "The digestive (gastrointestinal) system processes food from mouth to intestines. GI complaints are among the most common in primary care, and patients often describe them with informal or culturally specific words. The interpreter's task is to convey the clinical meaning precisely: 'nausea', 'emesis' (vomiting), 'diarrhea', 'constipation', and the location and character of pain. Euphemisms can hide red flags, so render frank descriptions frankly.",
            "Worked example: a patient reports 'black, tarry stools.' This is 'melena', a possible sign of gastrointestinal bleeding — a clinically urgent detail. If you soften it to 'dark stools', the provider may miss the significance. Always preserve descriptive precision in GI reporting.",
          ],
          terminology: [
            { term: "Nausea", definition: "The sensation of needing to vomit." },
            { term: "Emesis", definition: "Vomiting." },
            { term: "Melena", definition: "Black, tarry stool indicating possible upper GI bleeding." },
            { term: "Dysphagia", definition: "Difficulty swallowing." },
            { term: "Hepat-", definition: "Root meaning liver (e.g., hepatitis, hepatomegaly)." },
            { term: "Gastroenteritis", definition: "Inflammation of the stomach and intestines." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "'Melena' is:",
              options: ["Difficulty swallowing", "Black, tarry stool suggesting GI bleeding", "Vomiting", "Constipation"],
              answer: 1,
            },
          ],
        },
        {
          id: "l5",
          title: "Musculoskeletal Terminology",
          duration: "13:30",
          type: "lecture",
          completed: false,
          objectives: [
            "Master bone, joint, and muscle vocabulary in both languages",
            "Interpret orthopedic and injury descriptions accurately",
          ],
          content: [
            "The musculoskeletal system — bones, muscles, joints, tendons, and ligaments — supports movement and structure. Interpreters meet this vocabulary in orthopedics, physical therapy, and injury care. Directional and structural terms (fracture vs. sprain vs. strain) carry different treatment paths, so accuracy is essential. A 'fracture' is a broken bone; a 'sprain' injures a ligament; a 'strain' injures a muscle or tendon.",
            "Practice scenario: a patient describes falling and says their wrist 'bent the wrong way and now it's swollen and I can't turn it.' Convey the mechanism, the swelling, and the loss of motion precisely — the provider uses these details to decide on imaging. Preserving the mechanism of injury is a safety-relevant part of the rendering.",
          ],
          terminology: [
            { term: "Fracture", definition: "A break in a bone." },
            { term: "Sprain", definition: "Injury to a ligament (connects bone to bone)." },
            { term: "Strain", definition: "Injury to a muscle or tendon." },
            { term: "Arthr-", definition: "Root meaning joint (e.g., arthritis, arthroscopy)." },
            { term: "Osteoporosis", definition: "Weak, brittle bones from loss of density." },
            { term: "Tendon / Ligament", definition: "Tissue connecting muscle to bone / bone to bone." },
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
        {
          id: "l6",
          title: "Neurology Terminology",
          duration: "14:40",
          type: "lecture",
          completed: false,
          objectives: [
            "Master core neurological vocabulary in both languages",
            "Interpret stroke and seizure descriptions with time-critical accuracy",
          ],
          content: [
            "The nervous system controls sensation, movement, and cognition. Neurological terms are frequently time-critical: in a suspected stroke ('CVA' — cerebrovascular accident), the exact onset time and symptoms determine treatment eligibility. Interpreters must render descriptions of numbness, weakness, slurred speech, and vision changes precisely and quickly, and must convey time references exactly.",
            "Worked example: a family member says the patient's face 'drooped on one side about an hour ago and one arm went weak.' Every element — the side, the drooping, the arm weakness, and 'about an hour ago' — is clinically decisive. Do not round or summarize time in neurology; render it as stated.",
          ],
          terminology: [
            { term: "CVA (stroke)", definition: "Cerebrovascular accident — interrupted blood flow to the brain." },
            { term: "Seizure", definition: "A sudden burst of abnormal electrical activity in the brain." },
            { term: "Aphasia", definition: "Loss or impairment of the ability to produce or understand speech." },
            { term: "Paresthesia", definition: "Abnormal sensations such as tingling or numbness." },
            { term: "Hemiparesis", definition: "Weakness on one side of the body." },
            { term: "Neur-/-plegia", definition: "Root for nerve / suffix meaning paralysis." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "In neurology interpreting, time of symptom onset should be:",
              options: ["Rounded for simplicity", "Rendered exactly as stated", "Omitted", "Estimated by the interpreter"],
              answer: 1,
              explanation: "Onset time can determine stroke treatment eligibility.",
            },
          ],
        },
        {
          id: "l7",
          title: "Reproductive Health Terminology",
          duration: "13:20",
          type: "lecture",
          completed: false,
          objectives: [
            "Master reproductive and obstetric vocabulary in both languages",
            "Interpret sensitive topics accurately and without embarrassment",
          ],
          content: [
            "Reproductive and obstetric care involves vocabulary that patients may find embarrassing and that varies widely by dialect and culture. The interpreter must render anatomical and clinical terms accurately and neutrally, without substituting vague euphemisms that could obscure meaning. Terms like 'gestation', 'trimester', 'contraception', and 'menstruation' must be conveyed precisely so the patient can make informed decisions.",
            "Practice scenario: during prenatal counseling, a provider asks about 'gravida and para' (number of pregnancies and births). The interpreter conveys the clinical question in plain, respectful language the patient understands, and renders the patient's answer exactly. Maintaining a calm, matter-of-fact register helps sensitive encounters proceed with dignity.",
          ],
          terminology: [
            { term: "Gestation", definition: "The period of development from conception to birth (pregnancy)." },
            { term: "Trimester", definition: "One of three roughly three-month stages of pregnancy." },
            { term: "Contraception", definition: "Methods used to prevent pregnancy." },
            { term: "Gravida / Para", definition: "Number of pregnancies / number of births." },
            { term: "Menstruation", definition: "Monthly shedding of the uterine lining." },
            { term: "Prenatal", definition: "Care and events occurring before birth." },
          ],
          knowledgeCheck: [
            {
              id: "k1",
              question: "When interpreting sensitive reproductive terms, the interpreter should:",
              options: [
                "Use vague euphemisms",
                "Render terms accurately and neutrally to preserve meaning",
                "Skip embarrassing details",
                "Give personal advice",
              ],
              answer: 1,
            },
          ],
        },
        {
          id: "l8",
          title: "Medical Abbreviations",
          duration: "12:10",
          type: "reading",
          completed: false,
          objectives: [
            "Recognize high-frequency clinical abbreviations",
            "Render abbreviations as full clinical meaning for patients",
            "Flag ambiguous abbreviations rather than guessing",
          ],
          content: [
            "Providers use abbreviations constantly: 'BP' (blood pressure), 'HR' (heart rate), 'PRN' (as needed), 'BID/TID' (twice/three times a day), 'NPO' (nothing by mouth), 'Rx' (prescription). Patients rarely know these, so the interpreter's job is to render the full meaning, not the letters. Saying 'take this BID' to a patient is useless; 'take this twice a day' is care.",
            "Some abbreviations are ambiguous or dangerous — the same letters can mean different things across specialties. The professional rule is never to guess: if an abbreviation's meaning is unclear or safety-critical (especially in dosing), the interpreter transparently asks the provider to clarify before rendering. A brief pause for accuracy is always better than a confident error.",
          ],
          terminology: [
            { term: "PRN", definition: "Pro re nata — take as needed." },
            { term: "BID / TID / QID", definition: "Twice / three times / four times a day." },
            { term: "NPO", definition: "Nothing by mouth (no food or drink)." },
            { term: "Rx / Dx / Tx", definition: "Prescription / diagnosis / treatment." },
            { term: "PO", definition: "By mouth (oral route)." },
            { term: "STAT", definition: "Immediately, without delay." },
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
  ],
  finalAssessment: {
    title: "Medical Terminology I — Final Assessment",
    category: "Medical",
    durationMinutes: 30,
    passingScore: 80,
    questions: [
      {
        id: "q1",
        question: "The suffix '-itis' means:",
        options: ["Removal", "Inflammation", "Study of", "Pain"],
        answer: 1,
      },
      {
        id: "q2",
        question: "'Myocardial infarction' is commonly known as:",
        options: ["Stroke", "Heart attack", "Seizure", "High blood pressure"],
        answer: 1,
      },
      {
        id: "q3",
        question: "'Dysphagia' means difficulty:",
        options: ["Breathing", "Swallowing", "Walking", "Seeing"],
        answer: 1,
      },
      {
        id: "q4",
        question: "A 'fracture' is a:",
        options: ["Torn ligament", "Broken bone", "Pulled muscle", "Joint inflammation"],
        answer: 1,
      },
      {
        id: "q5",
        question: "'NPO' instructs the patient to:",
        options: ["Take nothing by mouth", "Take medication as needed", "Rest", "Return tomorrow"],
        answer: 0,
      },
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
