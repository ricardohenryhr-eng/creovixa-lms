import type { Lesson, Module, Resource } from "@/lib/data"
import type { CourseContent } from "@/lib/course-content"

/**
 * 40-Hour Medical Interpreter Training — the full 13-module program.
 *
 * Video lessons point at verified, public, embeddable YouTube videos from
 * professional interpreting, healthcare, and education channels. The same URLs
 * are stored in the lesson_videos table so admins can replace them from the
 * Lesson Editor; resetting a lesson there falls back to these defaults.
 * HIPAA/Code of Conduct and OPI/VRI modules are deliberately text-based.
 */

export const MEDICAL_SLUG = "medical-interpreter-training-40h"

const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`
const notes = (moduleId: string, lessonId: string) => ({
  name: "Lesson notes (PDF)",
  url: `/api/lesson-notes/${MEDICAL_SLUG}/${moduleId}-${lessonId}`,
})

const M = [
  "Introduction to Medical Interpreting",
  "Interpreter Ethics",
  "Standards of Practice",
  "Medical Terminology",
  "Human Anatomy and Physiology",
  "Healthcare Systems",
  "Patient Interviews",
  "Medical Specialties",
  "Cultural Competency",
  "HIPAA and Confidentiality",
  "Consecutive Interpreting Skills",
  "Sight Translation",
  "Medical Interpreter Final Preparation",
] as const

type LessonSpec = Omit<Lesson, "completed" | "attachments"> & { moduleTitle: (typeof M)[number] }

const specs: LessonSpec[] = [
  {
    moduleTitle: M[0],
    id: "l1",
    title: "Why professional medical interpreters matter",
    duration: "11:18",
    type: "video",
    videoUrl: yt("Wds6QtDIGjo"),
    images: [{ url: "/images/medical/m1-introduction.png", caption: "A professional interpreter supporting a provider and patient during a clinic visit." }],
    objectives: [
      "Explain why language access is a patient-safety requirement, not a courtesy",
      "Describe the risks of using family members or untrained bilingual staff",
      "Identify the settings where healthcare interpreters work",
    ],
    content: [
      "More than 25 million people in the United States report limited English proficiency (LEP). For these patients, a language barrier is a clinical risk: studies consistently link the absence of a qualified interpreter to more medication errors, longer hospital stays, unnecessary tests, lower satisfaction, and a higher rate of adverse events. Professional interpreting is how a healthcare organization delivers the same quality and safety of care to every patient.",
      "Federal law reinforces this. Title VI of the Civil Rights Act and Section 1557 of the Affordable Care Act require organizations that receive federal funding to provide meaningful language access at no cost to the patient. In practice this means offering a qualified interpreter, never requiring patients to bring their own, and avoiding minors and untrained relatives as interpreters except in a true emergency.",
      "Ad hoc interpreters — family members, friends, or bilingual staff without training — commonly omit, add, or soften information. A daughter may not interpret a cancer diagnosis to her father; a spouse may answer for the patient; a bilingual receptionist may not know the terminology. A trained medical interpreter is bound by a code of ethics, renders the message completely and accurately, and protects the patient's privacy.",
      "Healthcare interpreters work across hospitals, outpatient clinics, emergency departments, mental health services, public health programs, pharmacies, and increasingly over the phone (OPI) and by video (VRI). This program prepares you for all of these settings across 13 modules covering ethics, standards, privacy, interpreting skills, terminology, anatomy, culture, specialty settings, and remote practice.",
    ],
    terminology: [
      { term: "Limited English Proficiency (LEP)", definition: "A person who does not speak English as a primary language and has a limited ability to read, write, speak, or understand English." },
      { term: "Language access", definition: "The policies and services that give LEP individuals meaningful access to care, including qualified interpreters and translated documents." },
      { term: "Ad hoc interpreter", definition: "An untrained person, such as a relative or bilingual staff member, used to interpret informally." },
      { term: "Qualified interpreter", definition: "An interpreter who has demonstrated language proficiency, interpreting skill, and knowledge of ethics and terminology." },
    ],
    summary: "Language access is a patient-safety and civil-rights requirement. Qualified medical interpreters, not family members or untrained bilingual staff, deliver complete, accurate, and confidential communication so LEP patients receive the same quality of care as everyone else.",
    knowledgeCheck: [
      { id: "k1", question: "Why should a patient's minor child not be used as an interpreter in a routine visit?", options: ["Children are slower interpreters", "It risks omissions, emotional harm, and breaches of privacy and accuracy", "Children cannot speak two languages", "It is faster to use a professional"], answer: 1, explanation: "Minors are not trained, may filter difficult information, and should not carry that burden." },
      { id: "k2", question: "Which law requires federally funded healthcare organizations to provide language access?", options: ["HIPAA only", "Title VI of the Civil Rights Act", "The Fair Labor Standards Act", "No law requires it"], answer: 1 },
    ],
  },
  {
    moduleTitle: M[0],
    id: "l2",
    title: "The interpreter's role in the clinical team",
    duration: "18:51",
    type: "video",
    videoUrl: yt("Uhzcl2JDi48"),
    images: [{ url: "/images/medical/m2-role.png", caption: "Working with a professional interpreter as part of the care team." }],
    objectives: [
      "Define the conduit, clarifier, cultural broker, and advocate roles",
      "Explain when stepping out of the conduit role is justified",
      "Describe how providers and interpreters work together effectively",
    ],
    content: [
      "The medical interpreter's core purpose is to make communication between a patient and provider as accurate and complete as if they shared a language. The interpreter does not lead the encounter, give advice, or make clinical decisions: the provider remains responsible for the medical care and the patient remains responsible for their own choices.",
      "Most professional frameworks describe four roles. As a conduit (the default role) you render every message faithfully in the first person. As a clarifier you pause to resolve a term or concept that does not have a direct equivalent. As a cultural broker you transparently surface a cultural difference that threatens understanding. As an advocate — rarely, and only when patient safety or dignity is at serious risk — you act beyond interpreting.",
      "Each step beyond the conduit role must be transparent: announce it to both parties ('The interpreter needs to clarify a term'), keep the intervention brief, and return immediately to interpreting. Side conversations with either party are avoided, and anything said in the room is interpreted.",
      "Providers get the best results when they brief the interpreter before the session, speak directly to the patient in short segments, avoid idioms, and allow time for clarification. Interpreters support this by introducing themselves, explaining their role, and positioning themselves so the provider and patient can communicate directly with each other.",
    ],
    terminology: [
      { term: "Conduit", definition: "The default role: transmitting messages completely and accurately, without additions or omissions." },
      { term: "Clarifier", definition: "Stepping out briefly and transparently to resolve a term or concept that does not transfer directly." },
      { term: "Cultural broker", definition: "Transparently raising a cultural issue that could cause a misunderstanding, without explaining it on anyone's behalf." },
      { term: "Advocate", definition: "A rare role used only when patient safety or dignity is seriously at risk." },
    ],
    summary: "The interpreter's default role is the conduit: render every message faithfully in the first person. Step into the clarifier, cultural broker, or (rarely) advocate role only when needed, always transparently, and return to interpreting right away.",
    knowledgeCheck: [
      { id: "k1", question: "The default role of a medical interpreter is:", options: ["Advocate", "Cultural broker", "Conduit", "Patient navigator"], answer: 2 },
      { id: "k2", question: "When an interpreter steps out of the conduit role, they must:", options: ["Do it silently", "Announce it transparently to both parties and return quickly", "Only tell the provider", "Ask permission from a supervisor first"], answer: 1 },
    ],
  },
  {
    moduleTitle: M[1],
    id: "l3",
    title: "The NCIHC national code of ethics",
    duration: "20:49",
    type: "video",
    videoUrl: yt("1fuf7uH6Dck"),
    images: [{ url: "/images/medical/m3-ethics.png", caption: "Ethical decision-making is central to every encounter." }],
    objectives: [
      "Name the nine ethical principles of the NCIHC code",
      "Apply the principles of accuracy, confidentiality, and impartiality",
      "Use a structured process to resolve an ethical dilemma",
    ],
    content: [
      "The National Council on Interpreting in Health Care (NCIHC) publishes the national code of ethics for healthcare interpreters in the United States. Its nine principles are: accuracy, confidentiality, impartiality, respect, cultural awareness, role boundaries, professionalism, professional development, and advocacy. Other codes from IMIA and CHIA share the same core values.",
      "Accuracy means rendering the message completely, preserving meaning, register, tone, and the speaker's intent, and correcting your own errors as soon as you notice them. Confidentiality means everything you hear is protected and never shared outside the care team. Impartiality means you do not let personal beliefs, opinions, or relationships influence how you interpret, and you disclose any conflict of interest.",
      "Respect and cultural awareness ask you to treat all parties with dignity and to understand how culture shapes communication about health. Role boundaries keep you from personal involvement — no advice, no rides home, no personal contact. Professionalism and professional development mean honesty about your skills, preparation, and ongoing learning.",
      "When principles appear to conflict, use a structured process: identify the problem, determine which principles are at stake, consider the options and their consequences, choose the action that best supports communication and patient wellbeing, and reflect on the result afterward. Most dilemmas are resolved by transparency rather than by acting alone.",
    ],
    terminology: [
      { term: "NCIHC", definition: "National Council on Interpreting in Health Care, publisher of the national code of ethics and standards of practice." },
      { term: "Impartiality", definition: "Interpreting without bias, opinion, or influence from personal relationships." },
      { term: "Conflict of interest", definition: "A personal relationship or interest that could affect, or appear to affect, impartial interpreting." },
      { term: "Register", definition: "The level of formality of speech, which the interpreter preserves." },
    ],
    summary: "The NCIHC code rests on nine principles: accuracy, confidentiality, impartiality, respect, cultural awareness, role boundaries, professionalism, professional development, and advocacy. Disclose conflicts, correct errors immediately, and resolve dilemmas through a structured, transparent process.",
    knowledgeCheck: [
      { id: "k1", question: "A patient you interpret for turns out to be your neighbor. You should:", options: ["Continue and say nothing", "Disclose the conflict of interest so a decision can be made", "Refuse to speak to them", "Interpret but summarize"], answer: 1 },
      { id: "k2", question: "If you realize you misinterpreted a dosage a moment ago, you should:", options: ["Hope no one noticed", "Correct the error immediately and transparently", "Tell the patient privately later", "Ask the provider to repeat everything"], answer: 1 },
    ],
  },
  {
    moduleTitle: M[2],
    id: "l4",
    title: "National standards of practice for healthcare interpreters",
    duration: "11:52",
    type: "video",
    videoUrl: yt("0bumuRYYJz4"),
    images: [{ url: "/images/medical/m4-standards.png", caption: "Standards turn ethical principles into observable professional behavior." }],
    objectives: [
      "Explain how standards of practice relate to the code of ethics",
      "Describe the 32 NCIHC standards at a high level",
      "Apply standards to pre-session, session, and post-session tasks",
    ],
    content: [
      "Where the code of ethics describes what interpreters value, the NCIHC National Standards of Practice describe what interpreters actually do. The 32 standards are grouped under the same nine principles and turn each one into observable behavior, such as 'the interpreter renders all messages accurately and completely, without adding, omitting, or substituting.'",
      "A professional encounter has three phases. In the pre-session you introduce yourself to the provider, confirm the language and dialect, ask about the purpose of the visit, and explain how you will work. During the session you interpret in the first person, manage the flow so both parties can speak, and intervene transparently only when needed. In the post-session you leave with the provider, avoid being alone with the patient, and secure or destroy any notes.",
      "Standards also cover professional conduct: arriving prepared and on time, dressing appropriately, being honest about your qualifications, declining assignments beyond your competence, and seeking continuing education. Many employers and certification bodies evaluate interpreters against these standards.",
      "Throughout the session, use the professional introduction: 'Hello, my name is ___, and I will be your interpreter today. I will interpret everything that is said, I will keep everything confidential, and please speak directly to each other.' This sets expectations for both parties in a few seconds.",
    ],
    terminology: [
      { term: "Standards of practice", definition: "Specific, observable behaviors that put the code of ethics into practice." },
      { term: "Pre-session", definition: "The brief exchange with the provider before the encounter to prepare and explain the interpreting process." },
      { term: "Professional introduction", definition: "A short statement of name, role, confidentiality, and first-person interpreting given to all parties." },
      { term: "First-person interpreting", definition: "Speaking as the speaker ('I have pain'), not about them ('She says she has pain')." },
    ],
    summary: "Standards of practice turn ethical values into observable behavior. Structure every encounter into pre-session, session, and post-session; open with a professional introduction, interpret in the first person, and leave with the provider while disposing of notes securely.",
    knowledgeCheck: [
      { id: "k1", question: "The difference between the code of ethics and the standards of practice is:", options: ["There is no difference", "Ethics state values; standards describe the behaviors that put them into practice", "Standards apply only to court interpreters", "Ethics are optional"], answer: 1 },
      { id: "k2", question: "After the encounter, the interpreter should generally:", options: ["Stay with the patient to chat", "Leave with the provider and dispose of notes securely", "Keep notes for the next visit", "Give the patient their phone number"], answer: 1 },
    ],
  },
  {
    moduleTitle: M[9],
    id: "l5",
    title: "Protecting patient information and professional conduct",
    duration: "14:37",
    type: "video",
    videoUrl: yt("JkDezj5gcjA"),
    images: [{ url: "/images/medical/m5-hipaa.png", caption: "Protected health information must be safeguarded in every format." }],
    objectives: [
      "Define protected health information (PHI) under HIPAA",
      "Apply the minimum necessary rule and secure note-taking practices",
      "Follow the Creovixa code of conduct in on-site and remote work",
    ],
    content: [
      "The Health Insurance Portability and Accountability Act (HIPAA) protects individually identifiable health information. Protected health information (PHI) includes names, dates, addresses, phone numbers, medical record numbers, photos, diagnoses, treatments, and payment information — in any format: spoken, written, or electronic. As an interpreter you are part of the care team's workforce and are bound by HIPAA.",
      "Practical rules: never discuss a patient outside the encounter, even anonymously in a way that could identify them; never post about assignments on social media; take notes only when needed, on paper provided for the session, and shred or hand them to the provider afterward; do not photograph or store anything on personal devices; and when working remotely, use a private, quiet room with a headset and a locked screen.",
      "The minimum necessary rule means you access and share only what is needed to do your job. If a family member in the waiting room asks how the patient is doing, you politely decline and refer them to the care team. If you learn of a privacy breach, report it to your supervisor promptly.",
      "Creovixa's code of conduct adds professional expectations: punctuality and preparation, respectful and neutral behavior, appropriate dress, no acceptance of gifts beyond token items, no personal relationships with patients, accurate timekeeping and invoicing, and immediate disclosure of any conflict of interest. Violations of privacy or conduct rules can result in removal from assignments and legal consequences.",
      "Remember that confidentiality has limits defined by law and policy: if a patient discloses intent to harm themselves or others, or abuse of a child or vulnerable adult, interpret it faithfully so the provider can act. The interpreter does not decide what is reportable; the provider and the organization's policies do.",
    ],
    terminology: [
      { term: "HIPAA", definition: "Health Insurance Portability and Accountability Act, the federal law protecting health information privacy and security." },
      { term: "PHI", definition: "Protected health information: any individually identifiable health information in any format." },
      { term: "Minimum necessary", definition: "Using or disclosing only the PHI required to accomplish the task." },
      { term: "Breach", definition: "An unauthorized use or disclosure of PHI that must be reported." },
    ],
    summary: "Protected health information is safeguarded in every format. Follow the minimum necessary rule, never discuss or post about patients, shred or hand over notes, work remotely only in private spaces, and report breaches. Safety disclosures are always interpreted faithfully.",
    knowledgeCheck: [
      { id: "k1", question: "Which of these is protected health information?", options: ["A hospital's public address", "A patient's name together with their diagnosis", "A general medical textbook", "The interpreter's schedule"], answer: 1 },
      { id: "k2", question: "Notes taken during a session should be:", options: ["Kept in your bag for reference", "Photographed for your records", "Shredded or given to the provider after the session", "Shared with your colleague"], answer: 2 },
    ],
  },
  {
    moduleTitle: M[10],
    id: "l6",
    title: "Consecutive, simultaneous, and sight translation",
    duration: "6:31",
    type: "video",
    videoUrl: yt("arMllIL70nc"),
    images: [{ url: "/images/medical/m6-modes.png", caption: "Consecutive interpreting is the standard mode in most clinical encounters." }],
    objectives: [
      "Distinguish consecutive, simultaneous, and sight translation",
      "Choose the right mode for a clinical situation",
      "Use note-taking and memory techniques for consecutive interpreting",
    ],
    content: [
      "Consecutive interpreting is the primary mode in healthcare: the speaker pauses after a segment and the interpreter renders it completely. It supports accuracy and allows clarification. Manage segment length by gently signaling when a speaker goes on too long, and use brief notes — numbers, names, dosages, and key words — to support memory.",
      "Simultaneous interpreting means rendering the message while the speaker continues, usually a few words behind. In healthcare it is useful when a patient is in crisis, during mental health sessions where interruptions would disrupt the flow, in group education, or when a speaker cannot pause. It demands strong concentration and usually equipment or very close positioning.",
      "Sight translation is the oral rendering of a written document, such as consent forms, discharge instructions, or medication labels. Read the entire document first, ask about unfamiliar terms, and render it faithfully without explaining it; explanations are the provider's job. Avoid sight translating long or complex legal documents when a translated version should be provided instead.",
      "Summary interpreting — condensing what was said — is not acceptable in healthcare because it omits information. If you are overwhelmed, ask the speaker to pause or repeat rather than summarize.",
    ],
    terminology: [
      { term: "Consecutive interpreting", definition: "Interpreting after the speaker pauses, segment by segment." },
      { term: "Simultaneous interpreting", definition: "Interpreting at nearly the same time as the speaker." },
      { term: "Sight translation", definition: "Reading a written document aloud in another language." },
      { term: "Décalage", definition: "The lag between the speaker and the interpreter in simultaneous mode." },
    ],
    summary: "Consecutive interpreting is the standard clinical mode; simultaneous fits crises, mental health, and group settings; sight translation renders short written documents aloud. Choose the mode that best protects accuracy and support memory with brief, secure notes.",
    knowledgeCheck: [
      { id: "k1", question: "The standard mode for most clinical appointments is:", options: ["Simultaneous", "Consecutive", "Summary", "Whispered"], answer: 1 },
      { id: "k2", question: "During sight translation of discharge instructions, the interpreter should:", options: ["Explain what the instructions mean", "Render the text faithfully and let the provider explain", "Skip the fine print", "Summarize the key points"], answer: 1 },
    ],
  },
  {
    moduleTitle: M[6],
    id: "l7",
    title: "Positioning, flow control, and interventions",
    duration: "5:32",
    type: "video",
    videoUrl: yt("I_tVrctngoU"),
    images: [{ url: "/images/medical/m7-encounter.png", caption: "Triangle positioning lets the provider and patient face each other." }],
    objectives: [
      "Position yourself to support direct provider–patient communication",
      "Manage turn-taking and segment length",
      "Perform transparent interventions in the third person",
    ],
    content: [
      "The interpreted encounter is a triad: provider, patient, and interpreter. Positioning matters. The most common arrangement is a triangle where you stand or sit slightly behind and beside the patient, so the provider and patient look at each other. During physical exams, step behind a curtain or turn away while continuing to interpret; in some settings, the patient's preference guides positioning.",
      "Manage the flow of communication. Ask speakers to pause at natural points, use a hand gesture to indicate you need to interpret, and never let side conversations go uninterpreted. If both parties talk at once, ask them to take turns: 'The interpreter asks that one person speak at a time.'",
      "When you need to intervene — to clarify a term, request a repetition, flag a cultural misunderstanding, or correct an error — speak in the third person so it is clear you are speaking for yourself: 'The interpreter would like to clarify the word ___.' Then interpret that intervention to the other party so no one is excluded.",
      "Close the encounter professionally. Confirm whether the provider needs you for further tasks, avoid remaining alone with the patient, and complete any required documentation of the session.",
    ],
    terminology: [
      { term: "Triadic encounter", definition: "A three-party interaction among provider, patient, and interpreter." },
      { term: "Intervention", definition: "A transparent, third-person statement by the interpreter to manage communication." },
      { term: "Turn-taking", definition: "Managing who speaks so every utterance can be interpreted." },
      { term: "Third person", definition: "Referring to yourself as 'the interpreter' to mark your own speech." },
    ],
    summary: "Position yourself so provider and patient speak directly to each other, manage segment length to protect accuracy, and intervene briefly in the third person ('the interpreter...') only when necessary. Interpret everything said in the room.",
    knowledgeCheck: [
      { id: "k1", question: "When the interpreter needs to clarify a term, they should say:", options: ["'What did you mean?' without explanation", "'The interpreter would like to clarify the term…' and inform both parties", "Nothing, and guess", "Ask the patient privately"], answer: 1 },
      { id: "k2", question: "Good positioning in an exam room allows:", options: ["The provider to speak only to the interpreter", "The provider and patient to communicate directly with each other", "The interpreter to lead the visit", "The patient to face the interpreter only"], answer: 1 },
    ],
  },
  {
    moduleTitle: M[3],
    id: "l8",
    title: "Building medical vocabulary from word parts",
    duration: "4:48",
    type: "video",
    videoUrl: yt("QoxNXx47jbI"),
    images: [{ url: "/images/medical/m8-terminology.png", caption: "Most medical terms are built from prefixes, roots, and suffixes." }],
    objectives: [
      "Break medical terms into prefixes, roots, and suffixes",
      "Recognize common word parts for body systems and conditions",
      "Build a personal bilingual glossary",
    ],
    content: [
      "Most medical terms are built from Greek and Latin word parts. The root carries the core meaning, usually a body part (cardi- = heart, gastr- = stomach, nephr- = kidney). The prefix modifies location, number, or degree (hyper- = above, brady- = slow, peri- = around). The suffix indicates a condition or procedure (-itis = inflammation, -ectomy = removal, -scopy = visual examination). A combining vowel, usually 'o', joins them: gastr-o-enter-itis.",
      "Learning word parts lets you decode unfamiliar terms in real time. 'Pericarditis' is inflammation around the heart; 'nephrectomy' is removal of a kidney; 'tachycardia' is a fast heart rate. Many Romance languages share these roots, but beware of false cognates and of register: patients often use everyday words ('sugar' for diabetes) and you must preserve the register each party uses.",
      "Build a bilingual glossary organized by body system, including formal terms, common patient expressions, and regional variants. Review it before assignments, especially for specialty appointments. Accuracy with numbers, dosages, frequencies, and units is critical; always verify by repeating them back if unclear.",
      "When you do not know a term, never guess. Ask for clarification transparently: 'The interpreter requests clarification of the term ___.' A request for clarification is a sign of professionalism, not weakness.",
    ],
    terminology: [
      { term: "Root", definition: "The core of a medical term, often a body part (e.g., cardi- for heart)." },
      { term: "Prefix", definition: "A word part placed before the root to modify meaning (e.g., hypo- = below)." },
      { term: "Suffix", definition: "A word part at the end indicating a condition or procedure (e.g., -itis)." },
      { term: "False cognate", definition: "A word that looks similar in two languages but has a different meaning." },
    ],
    summary: "Medical terms are built from roots, prefixes, and suffixes joined by combining vowels. Decoding word parts lets you understand unfamiliar terms in real time; keep a bilingual glossary, preserve each speaker's register, and never guess at a term.",
    knowledgeCheck: [
      { id: "k1", question: "The term 'gastritis' means:", options: ["Removal of the stomach", "Inflammation of the stomach", "Slow digestion", "Stomach examination"], answer: 1 },
      { id: "k2", question: "If you don't recognize a term during a session, you should:", options: ["Guess from context", "Skip it", "Ask for clarification transparently", "Substitute a similar word"], answer: 2 },
    ],
  },
  {
    moduleTitle: M[4],
    id: "l9",
    title: "Overview of the human body systems",
    duration: "9:47",
    type: "video",
    videoUrl: yt("0JDCViWGn-0"),
    images: [
      { url: "/images/medical/m9-anatomy.png", caption: "Knowing each body system helps you place terms accurately under pressure." },
      { url: "/images/medical/m5-heart-cardiovascular.png", caption: "Heart anatomy: four chambers, valves, and the arteries (red) and veins (blue) of the cardiovascular system." },
      { url: "/images/medical/m5-respiratory-digestive.png", caption: "Respiratory anatomy (trachea, bronchi, lungs) and digestive anatomy (esophagus to large intestine)." },
      { url: "/images/medical/m5-musculoskeletal-nervous.png", caption: "The skeletal, muscular, and nervous systems." },
    ],
    objectives: [
      "Identify the major body systems and their functions",
      "Describe the basic anatomy of the heart, lungs, digestive tract, skeleton, muscles, and nervous system",
      "Connect common conditions and procedures to each system",
      "Use anatomical knowledge to disambiguate terms",
    ],
    content: [
      "Heart anatomy: the heart has four chambers. The right atrium receives oxygen-poor blood from the body and the right ventricle pumps it to the lungs; the left atrium receives oxygen-rich blood from the lungs and the left ventricle, the strongest chamber, pumps it to the body through the aorta. Four valves (tricuspid, pulmonary, mitral, aortic) keep blood moving in one direction, and the coronary arteries supply the heart muscle itself. Patients may describe a 'murmur' or 'skipped beats'; providers may say 'valve regurgitation' or 'atrial fibrillation'.",
      "Respiratory anatomy: air travels through the nose and mouth, the pharynx and larynx, down the trachea, and into the right and left bronchi, which branch into bronchioles ending in tiny air sacs called alveoli, where oxygen enters the blood and carbon dioxide leaves it. The diaphragm is the main breathing muscle. Digestive anatomy: food passes from the mouth through the esophagus to the stomach, small intestine (duodenum, jejunum, ileum), and large intestine (colon, rectum), helped by the liver, gallbladder, and pancreas.",
      "Skeletal and muscular systems: the adult skeleton has 206 bones that support the body, protect organs, store minerals, and produce blood cells in the marrow. Muscles are skeletal (voluntary movement), smooth (in organs and vessels), or cardiac (the heart). Tendons attach muscle to bone and ligaments attach bone to bone. Nervous system: the central nervous system is the brain and spinal cord; the peripheral nervous system is the nerves that branch out to the rest of the body and carry sensory and motor signals.",
      "The cardiovascular system (heart, arteries, veins) moves blood; common topics include hypertension, myocardial infarction, arrhythmia, and cholesterol. The respiratory system (lungs, airways) exchanges gases; expect asthma, COPD, pneumonia, and oxygen saturation. The nervous system (brain, spinal cord, nerves) controls the body; expect stroke, seizures, migraines, and neuropathy.",
      "The digestive system processes food — think reflux, ulcers, hepatitis, gallstones, and colonoscopy. The musculoskeletal system covers bones, joints, and muscles — fractures, arthritis, sprains, and physical therapy. The endocrine system regulates hormones — diabetes, thyroid disorders, and insulin. The renal/urinary system filters blood — kidney disease, dialysis, and urinary tract infections.",
      "The reproductive system includes prenatal care, labor and delivery, and gynecological care; the integumentary system covers skin conditions and wounds; and the immune and lymphatic systems cover infections, vaccines, allergies, and cancers such as lymphoma.",
      "Understanding which system a provider is discussing helps you choose the right rendering under time pressure and prepare for specialty appointments. Review anatomy diagrams in both languages and practice describing symptoms the way patients actually say them.",
    ],
    terminology: [
      { term: "Myocardial infarction", definition: "Heart attack: death of heart muscle from blocked blood flow." },
      { term: "COPD", definition: "Chronic obstructive pulmonary disease, a long-term lung condition that restricts airflow." },
      { term: "Endocrine", definition: "Relating to glands that release hormones into the blood." },
      { term: "Dialysis", definition: "A treatment that filters the blood when the kidneys cannot." },
      { term: "Ventricle", definition: "One of the two lower pumping chambers of the heart." },
      { term: "Alveoli", definition: "Tiny air sacs in the lungs where oxygen and carbon dioxide are exchanged." },
      { term: "Ligament", definition: "Tough tissue connecting bone to bone at a joint." },
      { term: "Central nervous system", definition: "The brain and spinal cord." },
    ],
    summary: "Each body system has its own anatomy, vocabulary, and common conditions: the four-chambered heart and blood vessels, the airways and alveoli, the digestive tract, the 206-bone skeleton and three muscle types, and the central and peripheral nervous systems. Knowing them helps you interpret precisely under pressure.",
    knowledgeCheck: [
      { id: "k1", question: "Insulin and diabetes relate mainly to which system?", options: ["Respiratory", "Endocrine", "Musculoskeletal", "Integumentary"], answer: 1 },
      { id: "k2", question: "A provider discussing 'oxygen saturation' and 'inhalers' is most likely addressing the:", options: ["Respiratory system", "Renal system", "Digestive system", "Nervous system"], answer: 0 },
    ],
  },
  {
    moduleTitle: M[8],
    id: "l10",
    title: "Culture, health beliefs, and the interpreter",
    duration: "9:29",
    type: "video",
    videoUrl: yt("ZB-jmlA3veo"),
    images: [{ url: "/images/medical/m10-culture.png", caption: "Culture shapes how patients describe illness and make decisions." }],
    objectives: [
      "Explain how culture influences health beliefs and communication",
      "Recognize when a cultural difference threatens understanding",
      "Act as a transparent cultural broker without stereotyping",
    ],
    content: [
      "Culture shapes how people understand illness, describe symptoms, make decisions, and relate to authority. A patient's explanatory model — what they believe caused the illness and how it should be treated — may differ from the biomedical model. Family members may expect to make decisions together; some patients may avoid saying 'no' to a doctor out of respect.",
      "Cultural competence for interpreters starts with self-awareness: recognizing your own assumptions and avoiding generalizations about any group. Not every patient from a culture shares the same beliefs, and you must never speak for a patient's culture.",
      "When a cultural difference may cause a misunderstanding, act as a cultural broker transparently: alert both parties ('The interpreter would like to note that there may be a cultural misunderstanding about ___') and suggest that the provider ask the patient directly. The provider and patient resolve the issue; you do not explain the culture yourself or decide what the patient believes.",
      "The U.S. Department of Health and Human Services' National CLAS Standards (Culturally and Linguistically Appropriate Services) guide organizations to provide care that respects diverse beliefs, practices, and languages. Interpreters are a central part of meeting these standards.",
    ],
    terminology: [
      { term: "Explanatory model", definition: "A person's own understanding of the cause, meaning, and treatment of an illness." },
      { term: "CLAS Standards", definition: "National standards for culturally and linguistically appropriate services in health care." },
      { term: "Stereotyping", definition: "Assuming an individual holds beliefs because of their group identity." },
      { term: "Cultural brokering", definition: "Transparently flagging a cultural issue so the parties can address it directly." },
    ],
    summary: "Culture shapes how patients understand illness, describe symptoms, and make decisions. Recognize your own assumptions, avoid stereotypes, and act as a cultural broker only transparently, when a cultural gap threatens understanding.",
    knowledgeCheck: [
      { id: "k1", question: "When you notice a possible cultural misunderstanding, the best action is to:", options: ["Explain the patient's culture to the provider", "Transparently alert both parties and let the provider ask the patient", "Ignore it", "Change the provider's question"], answer: 1 },
      { id: "k2", question: "Cultural competence for an interpreter begins with:", options: ["Memorizing cultural rules", "Self-awareness and avoiding generalizations", "Agreeing with the patient", "Speaking for the patient's community"], answer: 1 },
    ],
  },
  {
    moduleTitle: M[7],
    id: "l11",
    title: "Emergency, mental health, oncology, and pediatrics",
    duration: "7:31",
    type: "video",
    videoUrl: yt("ZwWT7xmCFRI"),
    images: [{ url: "/images/medical/m11-specialty.png", caption: "Specialty settings bring unique pace, vocabulary, and emotional demands." }],
    objectives: [
      "Adapt interpreting techniques to emergency and mental health settings",
      "Prepare for oncology, pediatric, and end-of-life encounters",
      "Practice self-care to manage vicarious trauma",
    ],
    content: [
      "Emergency departments move quickly, with many speakers, interruptions, and urgent decisions. Stay calm, keep segments short, prioritize accuracy for allergies, medications, and consent, and switch to simultaneous briefly when needed. Identify yourself to each new team member.",
      "In mental health, the patient's exact words, hesitations, and even incoherence carry clinical meaning. Do not tidy up speech — interpret confusing or disorganized speech as it is and inform the provider if something is linguistically unclear. Brief with the clinician beforehand, keep a consistent interpreter when possible, and preserve emotional tone.",
      "Oncology and end-of-life care involve difficult news. Interpret completely even when the content is painful; do not soften a diagnosis. Pediatric encounters involve parents and children; interpret for each speaker, including the child, and preserve age-appropriate language.",
      "Repeated exposure to suffering can cause vicarious trauma. Build self-care habits: debrief (without identifying details) with supervisors, set boundaries, rest between difficult assignments, and seek support through employee assistance programs.",
    ],
    terminology: [
      { term: "Triage", definition: "Sorting patients by the urgency of their condition." },
      { term: "Vicarious trauma", definition: "Emotional strain from repeated exposure to others' traumatic experiences." },
      { term: "Palliative care", definition: "Care focused on comfort and quality of life in serious illness." },
      { term: "Informed consent", definition: "A patient's voluntary agreement after understanding risks, benefits, and alternatives." },
    ],
    summary: "Specialty settings bring specific demands: speed and stress in emergency care, preserving disorganized speech in mental health, emotional weight in oncology, and family dynamics in pediatrics. Prepare terminology in advance and practice self-care after difficult sessions.",
    knowledgeCheck: [
      { id: "k1", question: "A mental health patient speaks in disorganized sentences. You should:", options: ["Make the sentences coherent", "Interpret the speech as it is, noting any linguistic ambiguity", "Summarize the main idea", "Stop interpreting"], answer: 1 },
      { id: "k2", question: "When a provider delivers a cancer diagnosis, the interpreter should:", options: ["Soften the message to protect the patient", "Interpret it completely and accurately", "Let a family member interpret instead", "Wait for the patient to ask"], answer: 1 },
    ],
  },
  {
    moduleTitle: M[12],
    id: "l12",
    title: "Over-the-phone and video remote interpreting",
    duration: "7:14",
    type: "video",
    videoUrl: yt("9PX2VHL0xTs"),
    images: [{ url: "/images/medical/m12-remote.png", caption: "A compliant remote interpreting workstation: private room, headset, stable connection." }],
    objectives: [
      "Set up a compliant OPI/VRI workstation",
      "Run a remote session using a structured opening and closing",
      "Handle technical problems and remote-specific challenges",
    ],
    content: [
      "Over-the-phone interpreting (OPI) connects you by audio only; video remote interpreting (VRI) adds video so you can see the parties and use visual cues. Remote interpreting is widely used for short encounters, rare languages, and after-hours care. The same ethics and standards apply as on site.",
      "Your workstation must protect privacy: a closed, quiet room with no one else present, a wired noise-cancelling headset, a reliable wired internet connection, a neutral background and good front lighting for VRI, and a locked computer with no recordings unless the client requires them. Turn off notifications and keep paper for note-taking that you shred afterward.",
      "Open every call with a structured introduction: your interpreter ID, the language, a confirmation that both parties can hear (and see) you, and the standard statement about confidentiality and first-person interpreting. Because you cannot always see who is speaking, ask the provider to identify new speakers and to describe actions you cannot see ('I'm now pressing on your abdomen').",
      "Manage technical issues transparently. If audio or video degrades, tell both parties immediately; never guess at a message you did not hear. If the connection cannot be restored, follow the client's protocol for reconnecting or transferring the call. Close the session by confirming there are no further questions and disconnecting without retaining any information.",
    ],
    terminology: [
      { term: "OPI", definition: "Over-the-phone interpreting: audio-only remote interpreting." },
      { term: "VRI", definition: "Video remote interpreting: interpreting by live video connection." },
      { term: "Interpreter ID", definition: "The number or code that identifies the interpreter for the client's records." },
      { term: "Latency", definition: "Delay in audio or video transmission that can disrupt turn-taking." },
    ],
    summary: "Remote interpreting (OPI and VRI) requires a private, quiet workspace, a quality headset, stable connections, clear openings, and active flow management. Announce technical problems to both parties and ask for repetition rather than filling gaps.",
    knowledgeCheck: [
      { id: "k1", question: "If you miss part of a message because the audio cut out, you should:", options: ["Guess from context", "Tell both parties and ask for a repetition", "Skip it", "End the call"], answer: 1 },
      { id: "k2", question: "Which is required for a compliant remote workstation?", options: ["A shared open office", "A private, quiet room and a headset", "A speakerphone in a café", "Recording every call"], answer: 1 },
    ],
  },
  {
    moduleTitle: M[12],
    id: "l13",
    title: "Certification pathways and your interpreting career",
    duration: "9:14",
    type: "video",
    videoUrl: yt("OiuiNQ5MVag"),
    images: [{ url: "/images/medical/m13-career.png", caption: "Certification and continuing education build a sustainable career." }],
    objectives: [
      "Compare the CCHI and NBCMI national certification pathways",
      "Plan continuing education and skill building",
      "Prepare for the program's final assessment and certificate",
    ],
    content: [
      "Two national bodies certify healthcare interpreters in the United States. The Certification Commission for Healthcare Interpreters (CCHI) offers the CoreCHI (written) and CHI (oral, for Spanish, Arabic, and Mandarin) credentials. The National Board of Certification for Medical Interpreters (NBCMI) offers the CMI credential. Both require at least 40 hours of medical interpreter training — which this program provides — along with language proficiency and passing written and oral exams.",
      "Certification is a starting point. Maintain your credential with continuing education units, keep expanding your glossary, practice with recorded scenarios, study specialties such as oncology or pediatrics, and seek feedback from experienced colleagues. Joining professional associations such as IMIA, NCIHC, or your state association connects you with training and the profession.",
      "To complete this program, you must finish all 13 modules, pass the knowledge check in each lesson, and pass the final assessment with a score of at least 80%. Your 40-Hour Medical Interpreter Training certificate is issued by a Creovixa administrator after review and includes a verifiable certificate number and QR code.",
      "Before the final assessment, review the lesson notes for each module, revisit the vocabulary lists, and rewatch any videos where you feel less confident. Good luck — you are preparing for one of the most meaningful roles in healthcare.",
    ],
    terminology: [
      { term: "CCHI", definition: "Certification Commission for Healthcare Interpreters, issuer of CoreCHI and CHI credentials." },
      { term: "NBCMI", definition: "National Board of Certification for Medical Interpreters, issuer of the CMI credential." },
      { term: "CEU", definition: "Continuing education unit, required to maintain certification." },
      { term: "IMIA", definition: "International Medical Interpreters Association, a professional association." },
    ],
    summary: "Certification through NBCMI (CMI) or CCHI (CoreCHI, CHI) validates your skills. Plan your training hours, language testing, and exam preparation, then keep growing through continuing education and professional associations.",
    knowledgeCheck: [
      { id: "k1", question: "How many hours of medical interpreter training do CCHI and NBCMI require?", options: ["10", "20", "40", "100"], answer: 2 },
      { id: "k2", question: "What score is required to pass this program's final assessment?", options: ["60%", "70%", "80%", "100%"], answer: 2 },
    ],
  },
  {
    moduleTitle: M[5],
    id: "l14",
    title: "How the U.S. healthcare system is organized",
    duration: "7:36",
    type: "video",
    videoUrl: yt("yN-MkRcOJjY"),
    images: [{ url: "/images/medical/m6-healthcare-systems.png", caption: "Registration and insurance are often a patient's first contact with the healthcare system." }],
    objectives: [
      "Describe the levels of care from primary care to tertiary and long-term care",
      "Explain the main payers: private insurance, Medicare, Medicaid, and self-pay",
      "Identify the roles of the care team an interpreter works alongside",
    ],
    content: [
      "Interpreters move through the whole healthcare system with their patients, so they need a working map of it. Primary care (family medicine, internal medicine, pediatrics) is the patient's usual first point of contact and coordinates ongoing care. Secondary care is delivered by specialists, usually after a referral. Tertiary care covers highly specialized services such as transplant centers, trauma units, and cancer centers. Long-term and post-acute care includes rehabilitation facilities, skilled nursing, home health, and hospice.",
      "Care settings differ in pace and register. Outpatient clinics schedule visits and follow predictable routines; emergency departments triage by severity, not arrival time; inpatient units involve rounds, multiple providers, and discharge planning. Knowing the workflow of each setting helps the interpreter anticipate what will be said and prepare terminology.",
      "Payment shapes much of what patients experience. Private insurance is typically employer-sponsored or purchased on the marketplace. Medicare is the federal program for people 65 and older and some people with disabilities. Medicaid is a joint federal-state program for people with low income; CHIP covers children. Patients may also be uninsured or self-pay. Terms like premium, deductible, copay, coinsurance, prior authorization, and explanation of benefits (EOB) come up constantly during registration and billing encounters.",
      "The care team includes physicians (MD/DO), nurse practitioners and physician assistants, registered and licensed practical nurses, medical assistants, pharmacists, therapists, social workers, case managers, and patient financial counselors. The interpreter does not explain the system to the patient on their own initiative, but understanding it lets them render information accurately and recognize when a cultural or systemic misunderstanding may need to be flagged to the provider.",
    ],
    terminology: [
      { term: "Primary care provider (PCP)", definition: "The clinician who provides first-contact, continuing, and coordinated care." },
      { term: "Referral", definition: "A request from one provider for a patient to see another provider, often a specialist." },
      { term: "Deductible", definition: "The amount a patient pays for covered services before insurance begins to pay." },
      { term: "Prior authorization", definition: "Insurer approval required before certain services or medications are covered." },
      { term: "Triage", definition: "Sorting patients by the urgency of their condition." },
    ],
    summary: "The U.S. healthcare system spans primary, specialty, emergency, inpatient, and post-acute care, funded by private insurance, Medicare, and Medicaid. Understanding settings, payers, and common administrative terms helps you interpret registration, billing, and care-coordination conversations accurately.",
    knowledgeCheck: [
      { id: "k1", question: "Which program primarily covers people aged 65 and older?", options: ["Medicaid", "Medicare", "CHIP", "Marketplace plans"], answer: 1 },
      { id: "k2", question: "In the emergency department, patients are seen according to:", options: ["Arrival time", "Insurance type", "Severity of condition", "Preferred language"], answer: 2 },
    ],
  },
  {
    moduleTitle: M[11],
    id: "l15",
    title: "Sight translation of medical documents",
    duration: "2:37",
    type: "video",
    videoUrl: yt("AG0rYVYshVk"),
    images: [{ url: "/images/medical/m12-sight-translation.png", caption: "Sight translating a consent form aloud for a patient." }],
    objectives: [
      "Define sight translation and when it is appropriate in healthcare",
      "Apply a preview, render, and check technique",
      "Recognize documents and situations where sight translation should be declined or escalated",
    ],
    content: [
      "Sight translation is the oral rendering of a written document from one language into another, such as reading an English consent form aloud in the patient's language. It is common for short documents: discharge instructions, medication labels, intake questionnaires, appointment letters, and consent forms explained during the encounter.",
      "Use a three-step technique. Preview: scan the whole document first for its purpose, structure, unfamiliar terms, numbers, and dates. Render: read it aloud at a steady pace, keeping the register and meaning of the original without summarizing, adding, or omitting. Check: confirm numbers, dosages, and dates, and tell the provider if anything is unclear rather than guessing.",
      "Sight translation does not replace written translation. Long or legally significant documents (full consent packets, advance directives, research consents) should be professionally translated in writing. Most standards also say the provider, not the interpreter, explains the document's meaning; the interpreter renders the text and interprets the provider's explanation and the patient's questions.",
      "Protect accuracy and role boundaries. Do not sight translate a document you have not been able to preview, and do not sign as a witness to the patient's understanding unless your organization's policy explicitly allows it. If the patient cannot read, sight translation is a reasonable accommodation; note it according to policy.",
    ],
    terminology: [
      { term: "Sight translation", definition: "Oral rendering of a written text in another language." },
      { term: "Source document", definition: "The original written text being rendered." },
      { term: "Register", definition: "The level of formality and style of language." },
      { term: "Written translation", definition: "A full written rendering of a document by a qualified translator." },
    ],
    summary: "Sight translation is for short documents: preview, render faithfully, and check numbers and dates. Long or legally significant documents need written translation, and the provider, not the interpreter, explains what a document means.",
    knowledgeCheck: [
      { id: "k1", question: "What is the first step before sight translating a document?", options: ["Summarize it", "Preview the whole document", "Ask the patient to sign", "Translate only the headings"], answer: 1 },
      { id: "k2", question: "Who explains the meaning of a consent form to the patient?", options: ["The interpreter", "The patient's family", "The provider", "The registrar"], answer: 2 },
    ],
  },
]

const modules: Module[] = M.map((title, i) => {
  const moduleId = `m${i + 1}`
  const lessons = specs
    .filter((s) => s.moduleTitle === title)
    .map(({ moduleTitle: _moduleTitle, ...lesson }) => ({
      ...lesson,
      completed: false,
      attachments: [notes(moduleId, lesson.id)],
    }))
  return { id: moduleId, title: `Module ${i + 1} · ${title}`, lessons }
})

/** YouTube URL for every medical video lesson, keyed by `module::lesson`. */
export const medicalVideoSeed = modules.flatMap((m) =>
  m.lessons.filter((l) => l.videoUrl).map((l) => ({ key: `${m.id}::${l.id}`, title: l.title, videoUrl: l.videoUrl! })),
)

const resources: Resource[] = [
  { id: "med-sg", name: "Study Guide.pdf", size: "PDF", type: "pdf", kind: "study_guide" },
  { id: "med-vocab", name: "Vocabulary List.pdf", size: "PDF", type: "pdf", kind: "vocabulary" },
  { id: "med-manual", name: "Course Manual.pdf", size: "PDF", type: "pdf", kind: "manual" },
]

export const medicalProgram: CourseContent = {
  modules,
  resources,
  finalAssessment: {
    title: "40-Hour Medical Interpreter — Final Assessment",
    category: "Medical",
    durationMinutes: 60,
    passingScore: 80,
    questions: [
      { id: "q1", question: "What is the primary role of a medical interpreter during a patient encounter?", options: ["To advocate for the patient's treatment plan", "To convey messages accurately and impartially between parties", "To summarize the conversation for efficiency", "To offer medical advice when the provider is unavailable"], answer: 1 },
      { id: "q2", question: "Which practice best protects patient confidentiality?", options: ["Discussing cases with colleagues for feedback", "Keeping session notes on a personal phone", "Following HIPAA guidelines and destroying notes after the session", "Sharing details with family members present"], answer: 2 },
      { id: "q3", question: "When an interpreter does not understand a medical term, they should:", options: ["Guess based on context", "Skip the term", "Ask for clarification before interpreting", "Substitute a similar sounding word"], answer: 2 },
      { id: "q4", question: "The standard interpreting mode for a physician giving discharge instructions is usually:", options: ["Simultaneous", "Consecutive", "Summary", "Sight translation only"], answer: 1 },
      { id: "q5", question: "Cultural brokering by an interpreter should be done:", options: ["Freely whenever the interpreter feels it helps", "Only transparently and when it prevents a misunderstanding", "Never under any circumstances", "By replacing the provider's questions"], answer: 1 },
      { id: "q6", question: "Which federal law requires language access in federally funded healthcare?", options: ["Title VI of the Civil Rights Act", "The Clean Air Act", "OSHA", "FERPA"], answer: 0 },
      { id: "q7", question: "Interpreting in the first person means saying:", options: ["'She says she has pain'", "'I have pain'", "'The patient reports pain'", "'They have pain'"], answer: 1 },
      { id: "q8", question: "The term 'nephrectomy' means:", options: ["Inflammation of the kidney", "Removal of a kidney", "Examination of the nerves", "Kidney stone"], answer: 1 },
      { id: "q9", question: "During a remote call the audio drops mid-sentence. You should:", options: ["Fill in what was probably said", "Inform both parties and ask for a repetition", "End the call", "Ignore it"], answer: 1 },
      { id: "q10", question: "A mental health patient's speech is disorganized. The interpreter should:", options: ["Make it coherent", "Interpret it as it is", "Summarize it", "Ask the patient to speak clearly"], answer: 1 },
      { id: "q11", question: "Which credential is issued by NBCMI?", options: ["CoreCHI", "CMI", "CHI", "CCI"], answer: 1 },
      { id: "q12", question: "When you need to intervene, you should speak:", options: ["In the first person as the patient", "In the third person as 'the interpreter'", "Only to the provider", "Silently with gestures"], answer: 1 },
    ],
  },
}
