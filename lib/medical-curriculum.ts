import type { KnowledgeQuestion, Lesson } from "@/lib/data"

/**
 * Expanded curriculum for the 40-Hour Medical Interpreter program: reading and
 * diagram lessons for topics where video adds little, a scenario exercise for
 * every lesson, and a module quiz that closes each module. Merged into the
 * program in lib/medical-program.ts by module index (0-based).
 */

export type ExtraLessonSpec = Omit<Lesson, "completed" | "attachments"> & {
  moduleIndex: number
  /** Place this lesson before the module's existing lessons. */
  first?: boolean
}

export const extraLessons: ExtraLessonSpec[] = [
  {
    moduleIndex: 1,
    id: "l27",
    title: "Medical ethics and ethical decision-making",
    duration: "45 min",
    type: "reading",
    images: [{ url: "/images/medical/m2-ethics.png", caption: "The interpreter stays neutral so the patient and provider can speak directly to each other." }],
    objectives: [
      "Explain the four principles of biomedical ethics: autonomy, beneficence, non-maleficence, and justice",
      "Distinguish the provider's ethical duties from the interpreter's",
      "Apply a step-by-step decision process to an ethical dilemma",
    ],
    content: [
      "Healthcare ethics rests on four widely taught principles. Autonomy is the patient's right to make informed decisions about their own body, including refusing treatment. Beneficence is the duty to act in the patient's best interest. Non-maleficence means 'first, do no harm'. Justice requires fair access to care and fair distribution of resources. Language access itself is a justice issue: without an interpreter, an LEP patient cannot exercise autonomy because they cannot give informed consent.",
      "These principles guide the care team's decisions, but the interpreter has a narrower ethical role. You protect autonomy by making sure the patient hears everything the provider says and the provider hears everything the patient says. You do not decide what is in the patient's best interest, you do not persuade a patient to accept or refuse a procedure, and you do not withhold information because you believe it would harm them. The provider, not the interpreter, decides how to deliver difficult news.",
      "Ethical dilemmas arise when two duties conflict. A patient may ask you privately not to tell the doctor about a symptom; a relative may ask you to 'soften' a prognosis; a provider may ask you to leave out a phrase they regret saying. The NCIHC code gives you a framework: accuracy, confidentiality, impartiality, respect, cultural awareness, role boundaries, professionalism, professional development, and advocacy only when safety is at risk.",
      "Use a consistent decision process. First, identify the question: what is being asked of you, and which code principle applies? Second, identify the people affected and the possible consequences. Third, consider your options and choose the one that best upholds accuracy and the patient's autonomy. Fourth, act transparently, ideally by interpreting the request itself ('The patient has asked me not to interpret this'), and fifth, reflect afterward and document per your organization's policy.",
    ],
    terminology: [
      { term: "Autonomy", definition: "A patient's right to make informed, voluntary decisions about their own care." },
      { term: "Beneficence", definition: "The duty to act for the benefit of the patient." },
      { term: "Non-maleficence", definition: "The duty to avoid causing harm." },
      { term: "Justice", definition: "Fair and equal access to care and resources." },
      { term: "Ethical dilemma", definition: "A situation in which two ethical duties point toward different actions." },
    ],
    summary: "The four principles of biomedical ethics guide the care team. The interpreter's ethical job is narrower: protect the patient's autonomy through complete, accurate, impartial communication, and resolve dilemmas transparently using the code of ethics and a consistent decision process.",
    scenario: {
      situation: "Before the doctor enters, an elderly patient's son pulls you aside: 'Please don't tell my mother if the biopsy shows cancer. In our family we protect our elders from bad news.'",
      task: "Decide what you say to the son now, and what you do when the doctor arrives.",
      debrief: "Explain politely that you interpret everything said in the room and cannot withhold information. When the doctor arrives, interpret transparently that the son has a request about how results are shared, so the provider can explore the patient's own wishes about receiving information. The provider and patient decide; you do not.",
    },
    knowledgeCheck: [
      { id: "k1", question: "Which principle is most directly undermined when an LEP patient signs consent without an interpreter?", options: ["Justice only", "Autonomy", "Non-maleficence only", "None"], answer: 1 },
      { id: "k2", question: "A relative asks you to soften a diagnosis. The best response is to:", options: ["Soften it slightly", "Refuse and leave", "Explain you interpret everything, and transparently bring the request to the provider", "Ask the patient whether they want the truth"], answer: 2 },
    ],
  },
  {
    moduleIndex: 2,
    id: "l19",
    title: "Interpreter protocols: pre-session, introduction, and post-session",
    duration: "40 min",
    type: "reading",
    images: [{ url: "/images/medical/m3-protocols.png", caption: "A clear introduction sets expectations for both the patient and the provider." }],
    objectives: [
      "Conduct a brief pre-session with the provider",
      "Deliver a complete professional introduction",
      "Close a session and complete post-session duties",
    ],
    content: [
      "Every encounter follows a protocol that protects accuracy and trust. The pre-session is a short exchange with the provider before entering the room: confirm the patient's name and language, ask the purpose of the visit and any sensitive topics, and agree on how the provider will pause for interpretation. The pre-session is never a place to discuss the patient's personal history or opinions about them.",
      "The professional introduction is delivered to both parties, in both languages, before any clinical conversation. A complete introduction includes your name and that you are the interpreter, that you will interpret everything said in the first person, that everything is confidential, and a request that both parties speak directly to each other and pause so you can interpret. Example: 'My name is Ana, I am the Spanish interpreter. I will interpret everything said, in the first person. Everything is confidential. Please speak directly to each other and pause so I can interpret completely.'",
      "During the session, position yourself to support direct communication, keep segments manageable, and use transparent interventions when you need clarification, a repetition, or must manage the flow. If you are left alone with the patient, do not engage in personal conversation or answer clinical questions; explain that you will interpret the question when the provider returns.",
      "At the close, confirm whether the parties have further questions, then leave with the provider when possible. Post-session duties include shredding any notes in front of the patient or in a secure bin, completing the encounter log (time, language, department, encounter ID, never clinical details), and reporting incidents such as a safety concern or an ethical conflict to your supervisor through the proper channel.",
    ],
    terminology: [
      { term: "Pre-session", definition: "A brief conversation with the provider before the encounter to set expectations." },
      { term: "Professional introduction", definition: "The standard statement of role, first-person interpreting, and confidentiality given to both parties." },
      { term: "Post-session", definition: "The close of the encounter, including note destruction and documentation." },
      { term: "Encounter log", definition: "An administrative record of the assignment without clinical details." },
    ],
    summary: "Protocols frame every encounter: a short pre-session with the provider, a complete introduction to both parties, transparent flow management during the session, and a clean close with secure note destruction and administrative documentation.",
    scenario: {
      situation: "You arrive at a clinic room and the nurse says, 'Just go in and start, the doctor will be here in a minute.' The patient begins telling you about her chest pain.",
      task: "Describe what you say to the patient and what you do until the doctor arrives.",
      debrief: "Introduce yourself and your role briefly, then explain politely that you will interpret everything she says once the doctor arrives so the doctor hears it directly. Avoid side conversations. If the pain sounds urgent, alert the nurse immediately. When the doctor enters, deliver your full introduction to both parties.",
    },
    knowledgeCheck: [
      { id: "k1", question: "Which element must be included in the professional introduction?", options: ["Your years of experience", "That you will interpret everything and keep it confidential", "Your opinion of the provider", "The patient's diagnosis"], answer: 1 },
      { id: "k2", question: "What belongs in the post-session encounter log?", options: ["The patient's diagnosis", "Time, language, department, and encounter ID", "Your notes from the session", "The patient's address"], answer: 1 },
    ],
  },
  {
    moduleIndex: 3,
    id: "l26",
    title: "Abbreviations, sound-alikes, and specialty vocabulary",
    duration: "50 min",
    type: "reading",
    images: [{ url: "/images/medical/m4-abbreviations.png", caption: "Charts and prescriptions are full of abbreviations, so confirm any you are unsure of." }],
    objectives: [
      "Recognize common clinical abbreviations and dosing terms",
      "Avoid errors with sound-alike and look-alike terms",
      "Build and maintain a bilingual specialty glossary",
    ],
    content: [
      "Providers speak in abbreviations. Common examples include BP (blood pressure), HR (heart rate), SOB (shortness of breath), NPO (nothing by mouth), PRN (as needed), BID (twice a day), TID (three times a day), QID (four times a day), PO (by mouth), IV (intravenous), and STAT (immediately). Never interpret an abbreviation as letters; render its meaning in plain language the patient understands, and ask for clarification if you are unsure.",
      "Sound-alike terms are a major source of error. Hypertension (high blood pressure) and hypotension (low blood pressure) differ by one syllable; ileum (part of the small intestine) and ilium (hip bone) sound identical; dysphagia (difficulty swallowing) and dysphasia (difficulty speaking) are easily confused. When a term is ambiguous, ask the provider to repeat or spell it rather than guessing.",
      "Patients use everyday language, regional terms, and euphemisms: 'sugar' for diabetes, 'water pill' for a diuretic, 'my pressure' for blood pressure. Interpret the patient's register faithfully — do not upgrade 'my sugar is high' to 'my glucose is elevated' — and let the provider clarify.",
      "Professional interpreters keep a living glossary organized by specialty (cardiology, oncology, obstetrics, pharmacy). For each entry record the term, its definition, the target-language equivalent, a patient-friendly rendering, and the source. Review the glossary before specialty assignments.",
    ],
    terminology: [
      { term: "NPO", definition: "Nil per os: nothing by mouth, often before surgery." },
      { term: "PRN", definition: "Pro re nata: take only as needed." },
      { term: "BID / TID / QID", definition: "Twice, three times, and four times a day." },
      { term: "Dysphagia", definition: "Difficulty swallowing (not to be confused with dysphasia, difficulty speaking)." },
      { term: "Register", definition: "The level of formality and vocabulary a speaker uses." },
    ],
    summary: "Translate abbreviations into their meaning, never as letters; treat sound-alike terms as high-risk and clarify rather than guess; preserve the patient's register; and keep a specialty glossary up to date.",
    scenario: {
      situation: "A surgeon says quickly: 'Patient should be NPO after midnight, take the BP med with a sip of water, and we'll start the IV in pre-op.'",
      task: "Write how you would render this to the patient in plain language.",
      debrief: "'Do not eat or drink anything after midnight. You may take your blood pressure medicine with a small sip of water. We will put a small tube in your vein (an IV) before surgery.' Every abbreviation is rendered by meaning, and the instruction about the medication is kept exact.",
    },
    knowledgeCheck: [
      { id: "k1", question: "'Take one tablet BID' means:", options: ["Once a day", "Twice a day", "At bedtime", "As needed"], answer: 1 },
      { id: "k2", question: "A patient says 'my sugar is high'. You should:", options: ["Say 'my glucose is elevated'", "Interpret in the same everyday register", "Say 'I have diabetes'", "Ask the patient to use the medical term"], answer: 1 },
    ],
  },
  {
    moduleIndex: 4,
    id: "l28",
    title: "Physiology in practice: vital signs, homeostasis, and lab results",
    duration: "50 min",
    type: "reading",
    images: [{ url: "/images/medical/m5-vitals-labs.png", caption: "Vital signs and lab results show whether the body is keeping internal conditions in balance (homeostasis)." }],
    objectives: [
      "Explain homeostasis and how body systems interact",
      "Interpret conversations about vital signs and their normal ranges",
      "Recognize common lab tests and what they measure",
    ],
    content: [
      "Physiology is how the body works. Its central idea is homeostasis: the body keeps temperature, blood pressure, blood sugar, fluid, and pH within narrow ranges. When one system fails, others compensate — a failing heart makes the kidneys retain fluid; uncontrolled diabetes damages nerves, eyes, and kidneys. Understanding these links helps you follow a provider's explanation of why a disease in one organ causes symptoms elsewhere.",
      "Vital signs are the first data in almost every encounter. Temperature (normal around 36.5–37.5 °C / 97.7–99.5 °F; fever above 38 °C / 100.4 °F); pulse or heart rate (about 60–100 beats per minute in adults); respiratory rate (12–20 breaths per minute); blood pressure (systolic over diastolic, with under 120/80 mmHg considered normal); and oxygen saturation (usually 95–100%). Pain is often called the 'fifth vital sign' and is rated on a 0–10 scale.",
      "Common lab tests appear in nearly every specialty. A complete blood count (CBC) measures red cells, white cells, hemoglobin, and platelets. A metabolic panel measures electrolytes (sodium, potassium), kidney function (creatinine), and glucose. Hemoglobin A1c reflects average blood sugar over about three months. A lipid panel measures cholesterol. A urinalysis checks urine for infection, protein, and blood.",
      "Interpret numbers with extreme care: units, decimal points, and ranges must be exact. 'One hundred forty over ninety' is a blood pressure; '1.4' and '14' are very different creatinine results. If you are unsure of a number, ask for a repetition.",
    ],
    terminology: [
      { term: "Homeostasis", definition: "The body's maintenance of stable internal conditions." },
      { term: "Systolic / diastolic", definition: "The pressure in the arteries when the heart beats, and between beats." },
      { term: "Oxygen saturation", definition: "The percentage of hemoglobin carrying oxygen, measured with a pulse oximeter." },
      { term: "CBC", definition: "Complete blood count: red cells, white cells, hemoglobin, and platelets." },
      { term: "Hemoglobin A1c", definition: "A blood test showing average blood sugar over about three months." },
    ],
    summary: "Homeostasis explains how body systems depend on each other. Know the normal ranges for vital signs and what common labs measure, and treat every number and unit as high-risk information to be interpreted exactly.",
    scenario: {
      situation: "A nurse says: 'Your pressure is one-sixty over ninety-five, your sat is ninety-one percent, and your A1c came back at nine point two.'",
      task: "Render the message and identify which values are outside the normal range.",
      debrief: "Interpret every number exactly ('Your blood pressure is 160 over 95, your oxygen level is 91 percent, and your A1c is 9.2'). All three are abnormal: blood pressure is high, oxygen saturation is low, and the A1c indicates poorly controlled blood sugar. You do not explain the significance; the nurse does.",
    },
    knowledgeCheck: [
      { id: "k1", question: "A normal resting adult heart rate is about:", options: ["30–50 bpm", "60–100 bpm", "110–140 bpm", "150–180 bpm"], answer: 1 },
      { id: "k2", question: "Hemoglobin A1c reflects:", options: ["Today's blood sugar", "Average blood sugar over about three months", "Cholesterol", "Kidney function"], answer: 1 },
    ],
  },
  {
    moduleIndex: 6,
    id: "l16",
    first: true,
    title: "Patient registration and intake",
    duration: "40 min",
    type: "reading",
    images: [{ url: "/images/medical/m7-registration-intake.png", caption: "Registration is often the patient's first contact with the care team." }],
    objectives: [
      "Interpret registration, insurance, and demographic questions accurately",
      "Handle names, dates, and identifiers without error",
      "Support the patient through the medical history intake",
    ],
    content: [
      "Registration collects the information the organization needs to identify, treat, and bill the patient: full legal name, date of birth, address, phone, emergency contact, preferred language, insurance, and consent to treat. Errors here follow the patient through the whole record — a reversed surname or a wrong birth date can lead to the wrong chart.",
      "Names and dates deserve special care. Many cultures use two surnames, a compound given name, or a different name order. Do not reorder names yourself; interpret the question and the patient's answer, and if the registrar seems confused, transparently suggest they ask the patient to spell the name. Date formats also vary (day/month versus month/day); interpret the date as words ('the fifth of March') to avoid ambiguity.",
      "Insurance terms often have no direct equivalent. Copay (a fixed amount paid at each visit), deductible (the amount paid before insurance starts paying), premium, in-network, prior authorization, and sliding-scale fee should be rendered by meaning. If a patient asks you whether they qualify for assistance, interpret the question to the registrar or financial counselor rather than answering it.",
      "The intake history follows: chief complaint, history of present illness, past medical and surgical history, medications, allergies, family history, and social history (tobacco, alcohol, drugs, occupation). Allergies and current medications are safety-critical; interpret them completely, including the patient's description of the reaction.",
    ],
    terminology: [
      { term: "Chief complaint", definition: "The main reason for the visit, in the patient's own words." },
      { term: "Copay", definition: "A fixed amount the patient pays for a visit or prescription." },
      { term: "Deductible", definition: "The amount a patient pays each year before insurance begins paying." },
      { term: "Prior authorization", definition: "Insurer approval required before a service is covered." },
      { term: "Social history", definition: "Information about lifestyle such as tobacco, alcohol, occupation, and living situation." },
    ],
    summary: "Registration and intake set up the patient's record. Interpret names and dates exactly, render insurance terms by meaning, route financial questions to the right staff, and treat allergies and medications as safety-critical.",
    scenario: {
      situation: "The registrar asks for the patient's name. The patient answers 'María José Hernández Ruiz', and the registrar types 'José' as the last name.",
      task: "Decide whether and how to intervene.",
      debrief: "Interpret the answer exactly, then intervene transparently: 'The interpreter would like to note there may be a misunderstanding about the name order; you may want to ask the patient to spell her first and last names.' The registrar confirms with the patient directly. You do not type or correct the record yourself.",
    },
    knowledgeCheck: [
      { id: "k1", question: "A patient asks you whether they qualify for financial assistance. You should:", options: ["Tell them they probably do", "Interpret the question to the registrar or financial counselor", "Give them a website", "Ignore the question"], answer: 1 },
      { id: "k2", question: "Which intake information is most safety-critical?", options: ["Occupation", "Allergies and current medications", "Preferred appointment time", "Emergency contact's address"], answer: 1 },
    ],
  },
  {
    moduleIndex: 6,
    id: "l17",
    title: "Informed consent",
    duration: "45 min",
    type: "reading",
    images: [{ url: "/images/medical/m7-informed-consent.png", caption: "Consent is a conversation led by the provider, not a form handed to the patient." }],
    objectives: [
      "Describe the elements of valid informed consent",
      "Explain the interpreter's role in the consent conversation",
      "Handle consent forms, sight translation, and patient questions correctly",
    ],
    content: [
      "Informed consent is a process, not a signature. For consent to be valid the patient must have the capacity to decide, receive information about the diagnosis, the proposed procedure, its risks, benefits, and alternatives (including doing nothing), understand that information, and agree voluntarily without pressure. Without a qualified interpreter, an LEP patient's consent is not informed.",
      "Obtaining consent is the provider's responsibility. The interpreter's role is to interpret the provider's explanation and the patient's questions completely. Never explain the procedure yourself, never summarize the risks, and never obtain a signature on your own. If a nurse hands you a form and asks you to 'go over it with the patient', explain that the provider must explain the content; you can sight translate the form while the provider is present to answer questions.",
      "Consent forms should be available in the patient's language. When they are not, short documents may be sight translated in the provider's presence; long or complex forms should be translated in writing per organizational policy. Many organizations ask the interpreter to sign or note their participation on the form — this confirms you interpreted, not that the patient understood.",
      "Watch for signs that understanding is incomplete — the patient agrees without questions, asks 'what should I do?', or defers to a family member. You may transparently suggest the provider use teach-back ('Can you tell me in your own words what the surgery will involve?'). Respect the patient's right to refuse or to take time to decide.",
    ],
    terminology: [
      { term: "Capacity", definition: "The patient's ability to understand information and make a decision." },
      { term: "Risks, benefits, and alternatives", definition: "The core information a provider must share for consent to be informed." },
      { term: "Teach-back", definition: "Asking the patient to explain the information in their own words to confirm understanding." },
      { term: "Witness signature", definition: "A signature confirming the consent process took place, not that the patient understood." },
    ],
    summary: "Informed consent requires capacity, full information about risks, benefits, and alternatives, understanding, and voluntary agreement. The provider leads it; the interpreter interprets everything, sight translates forms only with the provider present, and never explains or obtains consent alone.",
    scenario: {
      situation: "A busy nurse hands you a surgical consent form: 'The doctor already explained everything in English. Can you just read this to her in Spanish and get her to sign?'",
      task: "Explain how you respond and what should happen next.",
      debrief: "Politely explain that you cannot obtain consent and that the patient has not yet heard the explanation in her language. Ask for the provider to return so you can interpret the explanation of risks, benefits, and alternatives, and sight translate the form in their presence. If a translated form exists, request it.",
    },
    knowledgeCheck: [
      { id: "k1", question: "Who is responsible for obtaining informed consent?", options: ["The interpreter", "The provider", "The family", "The registrar"], answer: 1 },
      { id: "k2", question: "Which is NOT required for valid informed consent?", options: ["Capacity", "Information about alternatives", "Voluntary agreement", "A family member's approval"], answer: 3 },
    ],
  },
  {
    moduleIndex: 6,
    id: "l18",
    title: "Discharge instructions and teach-back",
    duration: "40 min",
    type: "reading",
    images: [{ url: "/images/medical/m7-discharge.png", caption: "Discharge teaching: medications, warning signs, and follow-up, confirmed with teach-back." }],
    objectives: [
      "Identify the components of discharge instructions",
      "Interpret medication schedules, warning signs, and follow-up accurately",
      "Support the provider's use of teach-back",
    ],
    content: [
      "Discharge is one of the highest-risk moments for LEP patients. Readmissions and medication errors rise when patients leave without understanding their instructions. A complete discharge conversation covers the diagnosis and what happened during the stay, new, changed, and stopped medications, activity and diet restrictions, wound or device care, warning signs that require a return to the emergency department, and follow-up appointments.",
      "Medication instructions must be interpreted exactly: drug name, dose, route, frequency, duration, and purpose ('Take one 500-milligram tablet of amoxicillin by mouth three times a day for ten days, for the infection'). Stopped medications matter as much as new ones. Interpret warning signs with their thresholds ('Return if your fever is above 38.5 degrees, or if the wound becomes red, hot, or drains pus').",
      "Written discharge papers are often in English. If the patient has no translated copy, sight translate the key sections with the nurse present, and note that the organization should provide translated documents. Never write instructions for the patient in your own handwriting unless your organization's policy allows it.",
      "Teach-back is the most effective check of understanding. The nurse or doctor asks the patient to repeat the plan in their own words. Interpret the patient's answer exactly, including mistakes — if the patient says 'twice a day' instead of 'three times', the provider must hear that so they can correct it.",
    ],
    terminology: [
      { term: "Discharge summary", definition: "A written record of the hospital stay, diagnosis, and plan of care." },
      { term: "Medication reconciliation", definition: "Comparing old and new medication lists so the patient knows what to take and stop." },
      { term: "Warning signs", definition: "Symptoms that mean the patient should seek urgent care." },
      { term: "Follow-up", definition: "The next appointment or test after discharge." },
    ],
    summary: "Discharge instructions cover diagnosis, medications (new, changed, stopped), restrictions, care tasks, warning signs, and follow-up. Interpret doses and thresholds exactly, sight translate key documents with staff present, and interpret teach-back answers word for word, including errors.",
    scenario: {
      situation: "During teach-back the patient says, 'So I take the blood thinner in the morning and the evening, and I stop the aspirin.' The nurse had said to take the blood thinner once a day in the evening, and to continue the aspirin.",
      task: "Decide what you do with the patient's answer.",
      debrief: "Interpret the patient's answer exactly as spoken. Do not correct it yourself. The nurse hears the two errors and re-teaches, then repeats teach-back. Your accuracy is what allows the provider to catch a potentially dangerous misunderstanding.",
    },
    knowledgeCheck: [
      { id: "k1", question: "During teach-back the patient repeats the dose incorrectly. You should:", options: ["Correct the patient yourself", "Interpret the incorrect answer exactly so the provider can correct it", "Say the correct dose instead", "Skip that part"], answer: 1 },
      { id: "k2", question: "Which is part of complete discharge instructions?", options: ["Stopped medications and warning signs", "The interpreter's phone number", "Billing codes", "The provider's schedule"], answer: 0 },
    ],
  },
  {
    moduleIndex: 7,
    id: "l20",
    title: "Emergency room interpreting",
    duration: "45 min",
    type: "reading",
    images: [{ url: "/images/medical/m8-emergency-room.png", caption: "In the ED, many speakers and urgent decisions demand short segments and precise terminology." }],
    objectives: [
      "Describe the emergency department workflow from triage to disposition",
      "Adapt interpreting technique to speed, noise, and multiple speakers",
      "Prioritize safety-critical information under pressure",
    ],
    content: [
      "The emergency department (ED) sees patients by severity, not arrival time. The workflow runs from triage (a nurse assesses urgency, often with a 1–5 acuity scale) to evaluation by a provider, diagnostics (labs, imaging, ECG), treatment, and disposition: discharge home, admission, transfer, or observation. Interpreters may join at any stage and must orient quickly.",
      "The ED is loud and crowded. Several staff may speak at once, and a trauma team may give orders in rapid succession. Identify yourself to each new team member, position yourself near the patient's head so they can hear you, keep segments short, and use brief simultaneous interpreting when the team is giving instructions while acting ('We're going to roll you on your side now').",
      "Prioritize accuracy for safety-critical information: allergies, current medications (especially blood thinners and insulin), time of symptom onset (critical in stroke and heart attack), pain location and character, and consent. In stroke assessment, the time the patient was 'last known well' determines treatment options; interpret times exactly.",
      "Common ED vocabulary includes chest pain characterized as pressure, tightness, sharp, or burning; shortness of breath; loss of consciousness (syncope); laceration and sutures; fracture and splint; CT scan and X-ray; and admission versus observation. Emotions run high; maintain a calm tone while preserving the urgency of the message. After traumatic encounters, debrief with your supervisor.",
    ],
    terminology: [
      { term: "Triage", definition: "Sorting patients by the urgency of their condition." },
      { term: "Acuity", definition: "The severity of a patient's condition, often rated 1 (most urgent) to 5." },
      { term: "Last known well", definition: "The last time a patient was seen without stroke symptoms." },
      { term: "Syncope", definition: "Fainting; a temporary loss of consciousness." },
      { term: "Disposition", definition: "The decision at the end of the ED visit: discharge, admit, transfer, or observe." },
    ],
    summary: "ED care moves from triage to disposition at speed. Introduce yourself to each team member, keep segments short, use brief simultaneous when needed, and treat allergies, medications, onset times, and consent as the highest-priority information.",
    scenario: {
      situation: "A man with sudden weakness on one side arrives. As you interpret, his wife says he 'woke up like this', but he says he felt fine 'when he went to the bathroom at five'.",
      task: "Decide what you interpret and why it matters.",
      debrief: "Interpret both statements exactly and attribute them to each speaker. The difference between 'woke up like this' and 'fine at five' changes the 'last known well' time, which determines whether clot-busting treatment is possible. Do not reconcile the two versions; the team will clarify.",
    },
    knowledgeCheck: [
      { id: "k1", question: "In stroke care, which detail is especially time-critical?", options: ["The patient's insurance", "The 'last known well' time", "The patient's occupation", "The name of their pharmacy"], answer: 1 },
      { id: "k2", question: "When a trauma team gives instructions while acting, the interpreter may:", options: ["Wait until everyone finishes", "Use brief simultaneous interpreting", "Summarize afterward", "Leave the room"], answer: 1 },
    ],
  },
  {
    moduleIndex: 7,
    id: "l21",
    title: "Mental health interpreting",
    duration: "45 min",
    type: "reading",
    images: [{ url: "/images/medical/m8-mental-health.png", caption: "In mental health sessions, the patient's exact words, tone, and pauses carry clinical meaning." }],
    objectives: [
      "Explain why form, not just content, carries clinical meaning in mental health",
      "Interpret assessments of mood, risk, and thought process accurately",
      "Manage emotional intensity and protect your own wellbeing",
    ],
    content: [
      "In psychiatry and behavioral health, the way a patient speaks is part of the diagnosis. Rate of speech, pauses, repetition, word choice, incoherence, and emotional tone help clinicians assess conditions such as depression, mania, psychosis, and cognitive impairment. Interpret disorganized or unusual speech as it is; do not organize, clarify, or complete the patient's sentences. If something is untranslatable — a made-up word or a pun — tell the clinician transparently.",
      "Common assessments include screening questionnaires (such as the PHQ-9 for depression and GAD-7 for anxiety), the mental status exam, and suicide risk assessment. Questions about suicide must be interpreted directly and completely: 'Are you thinking about killing yourself?' — never softened to 'Are you feeling bad?'. A softened question can hide risk.",
      "Before a session, a brief with the clinician helps: the type of session (intake, therapy, crisis evaluation), any safety concerns, and how the clinician wants you to handle silences. Consistency matters — patients may build trust with one interpreter, so organizations often schedule the same interpreter for ongoing therapy. Sit slightly behind or beside the patient so the therapeutic relationship is between patient and clinician.",
      "Mental health sessions can expose interpreters to trauma narratives. Recognize signs of vicarious trauma — intrusive thoughts, irritability, emotional numbness — and use your supports: debriefing without identifying details, peer support, and employee assistance programs.",
    ],
    terminology: [
      { term: "Mental status exam", definition: "A structured assessment of appearance, behavior, mood, thought, and cognition." },
      { term: "Psychosis", definition: "A state of losing touch with reality, which may include hallucinations or delusions." },
      { term: "PHQ-9", definition: "A nine-question screening tool for depression." },
      { term: "Suicidal ideation", definition: "Thoughts about ending one's life." },
      { term: "Flat affect", definition: "Reduced emotional expression in face and voice." },
    ],
    summary: "In mental health, the form of speech carries clinical meaning: interpret disorganized speech as it is, never soften risk questions, brief with the clinician, aim for interpreter consistency, and manage your own exposure to trauma.",
    scenario: {
      situation: "During an intake, the patient answers a question about sleep with: 'The radio talks at night, the numbers come, seven, seven, the neighbors know.'",
      task: "Describe how you interpret this answer.",
      debrief: "Interpret the answer word for word in the first person, preserving the fragmented structure and repetition ('The radio talks at night, the numbers come, seven, seven, the neighbors know'). Do not add 'the patient seems confused'. If any phrase has no clear meaning in the source language, transparently note that to the clinician.",
    },
    knowledgeCheck: [
      { id: "k1", question: "A clinician asks, 'Are you thinking of killing yourself?' You should:", options: ["Soften it to 'Are you sad?'", "Interpret it directly and completely", "Ask the clinician to rephrase", "Skip it"], answer: 1 },
      { id: "k2", question: "Why do mental health providers prefer the same interpreter for ongoing therapy?", options: ["It is cheaper", "It supports trust and consistency", "It is legally required", "Interpreters can then summarize"], answer: 1 },
    ],
  },
  {
    moduleIndex: 7,
    id: "l22",
    title: "Pediatric interpreting",
    duration: "40 min",
    type: "reading",
    images: [{ url: "/images/medical/m8-pediatrics.png", caption: "In pediatrics, interpret for every speaker, including the child." }],
    objectives: [
      "Manage three-way communication between provider, parent, and child",
      "Use age-appropriate register when interpreting for children",
      "Recognize pediatric vocabulary and safeguarding obligations",
    ],
    content: [
      "Pediatric encounters usually involve at least three parties: the provider, the parent or guardian, and the child. Interpret for every speaker, including the child's own words, in the first person. When the provider speaks to the child, interpret to the child; when the parent answers for the child, interpret that too, so the provider can decide how to proceed.",
      "Match register to the speaker. If a pediatrician says to a five-year-old, 'I'm going to listen to your tummy', render it in equally simple, friendly language rather than clinical terms. Adolescents may be interviewed alone for confidential topics such as sexual health or substance use; follow the provider's lead and respect the confidentiality boundaries they explain.",
      "Well-child visits cover growth (height, weight, head circumference, percentiles), developmental milestones, immunizations, nutrition, and safety (car seats, safe sleep). Sick visits often involve fever, ear infections (otitis media), dehydration, asthma, and rashes. Weight-based dosing means numbers must be exact: '5 milliliters' and '5 milligrams' are not interchangeable.",
      "Interpreters are not mandated reporters in most settings, but if you witness something suggesting abuse or neglect, follow your organization's policy, which usually means informing the provider or your supervisor. Never use a child to interpret for their parents.",
    ],
    terminology: [
      { term: "Developmental milestones", definition: "Skills most children reach by a certain age, such as walking or first words." },
      { term: "Percentile", definition: "How a child's measurement compares with other children of the same age and sex." },
      { term: "Otitis media", definition: "A middle-ear infection, common in young children." },
      { term: "Immunization schedule", definition: "The recommended timing of childhood vaccines." },
      { term: "Weight-based dosing", definition: "Calculating a medication dose from the child's weight." },
    ],
    summary: "Pediatric interpreting means interpreting for provider, parent, and child alike, in age-appropriate language, with exact numbers for weight-based doses, respect for adolescent confidentiality, and adherence to safeguarding policy.",
    scenario: {
      situation: "The doctor asks a seven-year-old, 'Where does it hurt?' Before the child can answer, the mother says, 'It's her stomach, she always complains about her stomach.'",
      task: "Decide what you interpret, and in what order.",
      debrief: "Interpret the doctor's question to the child, then interpret the mother's answer exactly. The doctor decides whether to redirect the question to the child. If the child then speaks, interpret her words too. You do not stop the mother from answering or decide who should speak.",
    },
    knowledgeCheck: [
      { id: "k1", question: "A pediatrician speaks to a young child in simple words. You should:", options: ["Use formal medical terms", "Interpret in equally simple, child-friendly language", "Interpret only to the parent", "Summarize later"], answer: 1 },
      { id: "k2", question: "Why must numbers in pediatric dosing be interpreted exactly?", options: ["Doses are weight-based and small errors can be dangerous", "Parents prefer exact numbers", "It is faster", "It is not important"], answer: 0 },
    ],
  },
  {
    moduleIndex: 7,
    id: "l23",
    title: "Obstetrics and gynecology",
    duration: "50 min",
    type: "reading",
    images: [{ url: "/images/medical/m8-obgyn-anatomy.png", caption: "Female reproductive anatomy and fetal position at full term." }],
    objectives: [
      "Identify female reproductive anatomy and pregnancy terminology",
      "Interpret prenatal, labor and delivery, and postpartum encounters",
      "Handle sensitive gynecological topics with professionalism and privacy",
    ],
    content: [
      "Reproductive anatomy: the uterus (womb) holds a developing pregnancy; the cervix is its lower opening into the vagina; the fallopian tubes carry eggs from the ovaries to the uterus. During pregnancy the placenta supplies oxygen and nutrients through the umbilical cord, and the fetus is surrounded by amniotic fluid. Pregnancy is counted in weeks from the last menstrual period (LMP), about 40 weeks in total, divided into three trimesters.",
      "Prenatal visits involve the due date (estimated date of delivery), ultrasound, blood pressure, glucose screening for gestational diabetes, fetal heart rate, and warning signs such as bleeding, severe headache, swelling, or decreased fetal movement. Obstetric history uses 'gravida' (number of pregnancies) and 'para' (number of births) — interpret these by meaning if the patient may not know the terms.",
      "Labor and delivery move fast. Expect contractions, dilation (the cervix opening, measured in centimeters to 10), effacement, rupture of membranes ('water breaking'), epidural anesthesia, induction, and cesarean section. During pushing, the interpreter may use brief simultaneous interpreting and must keep instructions short and clear. Postpartum care covers bleeding, breastfeeding, contraception, and postpartum depression screening.",
      "Gynecology includes pelvic exams, Pap tests, contraception, menstrual problems, menopause, sexually transmitted infections, and pregnancy loss. Position yourself to protect the patient's privacy — often behind a curtain or at the head of the bed facing away — and interpret intimate questions with the same directness as the provider. Respect the patient's preference for an interpreter of a particular gender when the organization can accommodate it.",
    ],
    terminology: [
      { term: "Trimester", definition: "One of three periods of about 13 weeks into which pregnancy is divided." },
      { term: "Gravida / para", definition: "Number of pregnancies / number of births." },
      { term: "Dilation", definition: "Opening of the cervix during labor, measured from 0 to 10 centimeters." },
      { term: "Cesarean section", definition: "Delivery of a baby through a surgical incision in the abdomen and uterus." },
      { term: "Preeclampsia", definition: "A pregnancy complication with high blood pressure and possible organ damage." },
    ],
    summary: "OB/GYN interpreting covers anatomy, prenatal care, labor and delivery, postpartum care, and gynecology. Know pregnancy terminology and warning signs, use brief simultaneous during delivery, and protect the patient's privacy and dignity throughout.",
    scenario: {
      situation: "A pregnant patient at 34 weeks tells the nurse, 'Since yesterday the baby isn't kicking like before, and my feet are very swollen and my head hurts a lot.'",
      task: "Identify the safety-critical information and how you render it.",
      debrief: "Interpret all three symptoms completely and in the patient's words: decreased fetal movement, swelling, and severe headache. Together these are warning signs (possible preeclampsia and fetal distress). Do not add your own concern, but do not omit or minimize any symptom, including its timing ('since yesterday').",
    },
    knowledgeCheck: [
      { id: "k1", question: "Dilation during labor refers to:", options: ["The baby's heart rate", "The opening of the cervix, measured to 10 cm", "The length of contractions", "The mother's blood pressure"], answer: 1 },
      { id: "k2", question: "'Gravida 3, para 2' means:", options: ["Three births, two pregnancies", "Three pregnancies, two births", "Three trimesters, two ultrasounds", "Third week, second visit"], answer: 1 },
    ],
  },
  {
    moduleIndex: 7,
    id: "l24",
    title: "Surgery and perioperative care",
    duration: "45 min",
    type: "reading",
    images: [{ url: "/images/medical/m8-surgery-periop.png", caption: "The perioperative journey: pre-op consent, the operating room, and recovery." }],
    objectives: [
      "Describe the phases of perioperative care",
      "Interpret surgical terminology, anesthesia, and pre-op instructions",
      "Support patients in recovery and post-operative teaching",
    ],
    content: [
      "Perioperative care has three phases. Pre-operative: consultation, consent, pre-op testing, and instructions (fasting, stopping blood thinners, bathing with antiseptic soap). Intra-operative: the procedure itself, where the interpreter is rarely present except during regional anesthesia or awake procedures. Post-operative: recovery in the PACU (post-anesthesia care unit), pain control, and discharge teaching.",
      "Surgical terms follow predictable patterns: -ectomy (removal: appendectomy, cholecystectomy), -otomy (cutting into: laparotomy), -ostomy (creating an opening: colostomy), -plasty (repair: angioplasty), and -scopy (looking inside: laparoscopy, arthroscopy). Minimally invasive or laparoscopic surgery uses small incisions; open surgery uses a larger incision.",
      "Anesthesia comes in three main types: local (numbing a small area), regional (numbing a larger area, such as a spinal or epidural), and general (the patient is unconscious). The anesthesiologist will ask about allergies, previous reactions to anesthesia, last food and drink, loose teeth, and medications. Interpret answers about timing ('I had coffee at 7') exactly — they can delay surgery for safety.",
      "Patients waking up from anesthesia may be confused, emotional, or in pain. Speak calmly and clearly, interpret pain scores exactly, and expect repetition. Post-op teaching covers incision care, signs of infection, pain medication, mobility, drains, and when to call the surgeon.",
    ],
    terminology: [
      { term: "PACU", definition: "Post-anesthesia care unit, where patients recover after surgery." },
      { term: "General anesthesia", definition: "Medication that makes the patient fully unconscious during surgery." },
      { term: "Laparoscopic", definition: "Minimally invasive surgery using a camera and small incisions." },
      { term: "Cholecystectomy", definition: "Surgical removal of the gallbladder." },
      { term: "Incision", definition: "A surgical cut through the skin." },
    ],
    summary: "Perioperative care runs from pre-op consent and instructions through surgery to recovery and post-op teaching. Use word parts to decode surgical terms, interpret anesthesia questions and timing exactly, and stay calm and clear with patients in recovery.",
    scenario: {
      situation: "In pre-op, the anesthesiologist asks when the patient last ate. The patient says, 'Nothing since last night', and then adds quietly, 'just a little juice this morning at seven.'",
      task: "Decide what you interpret.",
      debrief: "Interpret both parts, including the quiet addition: 'Nothing since last night... just a little juice this morning at seven.' The juice and its time may change the surgery start for safety reasons. Omitting a detail that seems minor would be a serious accuracy error.",
    },
    knowledgeCheck: [
      { id: "k1", question: "The suffix '-ectomy' means:", options: ["Looking inside", "Surgical removal", "Repair", "Creating an opening"], answer: 1 },
      { id: "k2", question: "Under general anesthesia, the patient is:", options: ["Awake but numb in one area", "Fully unconscious", "Numb from the waist down", "Only sedated lightly"], answer: 1 },
    ],
  },
  {
    moduleIndex: 7,
    id: "l25",
    title: "Pharmacy and medication interpreting",
    duration: "45 min",
    type: "reading",
    images: [{ url: "/images/medical/m8-pharmacy.png", caption: "Pharmacy counseling: dose, timing, route, and side effects must be interpreted exactly." }],
    objectives: [
      "Interpret prescription labels and pharmacist counseling accurately",
      "Explain dose, route, frequency, and duration in patient-friendly language",
      "Recognize high-risk medications and common side-effect vocabulary",
    ],
    content: [
      "Medication errors are among the most frequent harms for LEP patients. Every prescription includes the drug name, strength (for example 10 mg), dose (how many tablets or how much liquid), route (by mouth, inhaled, injected, topical, under the tongue), frequency, duration, and purpose. Interpret all of these exactly. 'Once daily' in English can be confused with 'once' (eleven) in Spanish on written labels — a known safety issue — so pharmacists should confirm instructions verbally.",
      "Pharmacist counseling covers how and when to take the medication (with food, on an empty stomach, at bedtime), what to avoid (alcohol, grapefruit, other drugs), common side effects, serious reactions that require care, storage, and refills. Brand and generic names differ; interpret the name the pharmacist uses and do not substitute one for the other.",
      "High-risk medications need particular care: blood thinners (warfarin, apixaban), insulin, opioids, seizure medications, and pediatric liquids. Insulin may involve units and sliding scales; liquids may be measured in milliliters with a dosing syringe — never 'spoons'. If the patient describes a dose with a household measure, interpret it as said and let the pharmacist clarify.",
      "Side-effect vocabulary includes drowsiness, dizziness, nausea, constipation, diarrhea, rash, hives, and swelling of the face or throat (a sign of a severe allergic reaction, anaphylaxis). Patients may describe effects vaguely ('it makes me feel strange'); interpret their words without interpreting their meaning.",
    ],
    terminology: [
      { term: "Generic name", definition: "The official chemical name of a drug, as opposed to the brand name." },
      { term: "Route", definition: "How a medication enters the body: oral, topical, inhaled, injected, sublingual." },
      { term: "Anaphylaxis", definition: "A severe, life-threatening allergic reaction." },
      { term: "Sliding scale", definition: "Adjusting an insulin dose based on a blood sugar reading." },
      { term: "Refill", definition: "An authorized repeat supply of a prescription." },
    ],
    summary: "Interpret every element of a prescription exactly: name, strength, dose, route, frequency, duration, and purpose. Take special care with high-risk drugs, insulin units, and liquid measurements, and interpret side-effect descriptions in the patient's own words.",
    scenario: {
      situation: "A pharmacist says: 'Take 7.5 milliliters of this antibiotic twice a day for ten days using the syringe, not a kitchen spoon. Finish it even if she feels better.' The mother says, 'So one spoon in the morning, until she's well.'",
      task: "Interpret both parts and identify the misunderstanding.",
      debrief: "Interpret the pharmacist's instruction exactly (7.5 mL, twice a day, ten days, with the syringe, finish the course), then the mother's reply exactly. Her answer contains three errors: spoon, once a day, and stopping early. The pharmacist hears them and re-teaches. You do not correct her yourself.",
    },
    knowledgeCheck: [
      { id: "k1", question: "Which is a sign of anaphylaxis?", options: ["Mild drowsiness", "Swelling of the face or throat", "Constipation", "Dry mouth"], answer: 1 },
      { id: "k2", question: "A pharmacist uses a brand name. You should:", options: ["Substitute the generic name", "Interpret the name the pharmacist used", "Skip the name", "Use whichever name you know"], answer: 1 },
    ],
  },
]

/** Scenario exercises for the original 15 program lessons, keyed by lesson id. */
export const lessonScenarios: Record<string, NonNullable<Lesson["scenario"]>> = {
  l1: {
    situation: "At a busy clinic the provider says, 'Her daughter is here and speaks English, let's just use her to save time.' The daughter is 14.",
    task: "Explain what you would recommend and why.",
    debrief: "Transparently explain that a qualified interpreter is available and that using a minor risks omissions and emotional harm and conflicts with language-access requirements. Offer to interpret now. The decision is the provider's, but your recommendation should be clear.",
  },
  l2: {
    situation: "A patient keeps asking you directly, 'What do you think, should I have the surgery?' while the doctor waits.",
    task: "Decide how you respond while staying in your role.",
    debrief: "Interpret the question to the doctor in the first person ('What do you think, should I have the surgery?'). If the patient addresses you personally, transparently explain that you cannot give advice and that the doctor can answer. Then return to the conduit role.",
  },
  l3: {
    situation: "You realize the patient is your neighbor's mother. Nobody else knows you are acquainted.",
    task: "Identify the ethical issue and your course of action.",
    debrief: "This is a potential conflict of interest that affects impartiality and confidentiality. Disclose it to the provider and patient (or your scheduler) before starting and offer to be replaced. If the patient and provider agree to proceed, maintain strict confidentiality and never discuss the encounter.",
  },
  l4: {
    situation: "Midway through a session, you realize you interpreted 'every 6 hours' as 'every 8 hours' two minutes ago.",
    task: "Decide what the standards of practice require you to do.",
    debrief: "Correct the error immediately and transparently: 'The interpreter needs to correct an error: the instruction was every 6 hours, not every 8 hours.' Accuracy standards require you to fix your own mistakes, even when it is uncomfortable.",
  },
  l5: {
    situation: "In the hospital cafeteria, a colleague asks, 'Wasn't that the famous singer you interpreted for this morning? What's wrong with him?'",
    task: "Decide how you respond.",
    debrief: "Decline to confirm or discuss anything, including whether you interpreted for the person: 'I can't talk about any patient.' HIPAA and the code of ethics apply everywhere, not only in the exam room. If the colleague persists, report it per policy.",
  },
  l6: {
    situation: "A pulmonologist speaks in long, uninterrupted explanations of several minutes about a new inhaler regimen.",
    task: "Choose a mode and a technique to maintain accuracy.",
    debrief: "Use consecutive interpreting with note-taking, and transparently ask the provider to pause after shorter segments: 'The interpreter requests shorter segments to ensure accuracy.' Do not summarize; if you lose a detail, ask for a repetition.",
  },
  l7: {
    situation: "The patient's husband keeps answering questions addressed to the patient, and both start speaking over the doctor.",
    task: "Manage the flow without taking control of the encounter.",
    debrief: "Interpret everything said, attributing each statement. If overlapping speech prevents accuracy, intervene briefly and transparently: 'The interpreter cannot interpret two people at once; please speak one at a time.' Let the doctor decide whether to redirect questions to the patient.",
  },
  l8: {
    situation: "The doctor mentions 'cholecystitis' and 'cholelithiasis' in the same sentence.",
    task: "Break both terms into word parts and render their meaning.",
    debrief: "Chole- (bile) + cyst (bladder) + -itis (inflammation) = inflammation of the gallbladder. Chole- (bile) + lith (stone) + -iasis (condition) = gallstones. Render both accurately; if the target language has a standard medical term, use it, otherwise render by meaning.",
  },
  l9: {
    situation: "A cardiologist says: 'The left ventricle isn't pumping well and the mitral valve is leaking, so fluid backs up into the lungs.'",
    task: "Explain the anatomy behind this message so you can interpret it confidently.",
    debrief: "The left ventricle pumps oxygen-rich blood to the body; the mitral valve separates the left atrium and ventricle. When the valve leaks and the ventricle is weak, blood backs up into the lungs, causing shortness of breath. Interpret the cardiologist's words exactly; your anatomy knowledge prevents errors, but you do not add explanation.",
  },
  l10: {
    situation: "A patient refuses a blood draw, saying that taking blood will weaken her. The provider looks frustrated and says, 'Just tell her it's necessary.'",
    task: "Decide whether and how to act as a cultural broker.",
    debrief: "Interpret the provider's statement. Then, transparently, note to both parties that there may be a cultural concern about blood, and suggest the provider ask the patient about it directly. Do not explain the belief yourself or persuade the patient.",
  },
  l11: {
    situation: "An oncologist tells a patient the cancer has spread and treatment will now focus on comfort. The patient asks you, in tears, 'Is it true? Am I dying?'",
    task: "Decide how you respond in the moment and afterward.",
    debrief: "Interpret the patient's question to the oncologist in the first person and let the oncologist answer. Preserve the emotional tone without adding your own. Afterward, recognize the emotional weight of the session and use your supports, such as a supervisor debrief without identifying details.",
  },
  l12: {
    situation: "On a VRI call, the video freezes for several seconds while the doctor is explaining a medication dose.",
    task: "Decide what you do before continuing.",
    debrief: "Inform both parties immediately that the connection froze and you did not hear part of the message, and ask the doctor to repeat the dose. Never fill in a missed message from context. If the connection keeps failing, follow the reconnection or OPI fallback protocol.",
  },
  l13: {
    situation: "You have completed this program and want to become nationally certified within the next year.",
    task: "Outline the steps you would take.",
    debrief: "Confirm language proficiency, choose CCHI (CoreCHI/CHI) or NBCMI (CMI), submit proof of your 40 hours of training, schedule and prepare for the written exam, then the oral exam, and plan continuing education to maintain your credential.",
  },
  l14: {
    situation: "A patient asks, 'Why do I need a referral to see the heart doctor? Can't I just go?'",
    task: "Decide who answers and what you interpret.",
    debrief: "Interpret the question to the provider or staff member; do not explain the insurance system yourself. Your knowledge of referrals and primary versus specialty care lets you interpret their answer accurately.",
  },
  l15: {
    situation: "A nurse hands you a two-page English post-procedure instruction sheet and asks you to sight translate it to the patient while she steps out.",
    task: "Decide how to respond.",
    debrief: "Explain that sight translation should take place with the nurse present so she can answer questions, and ask whether a translated version exists. Sight translate the document when she returns, rendering its meaning accurately and indicating any part you need clarified.",
  },
}

/** A module quiz closes every module: four questions, all must be correct. */
export const moduleQuizzes: KnowledgeQuestion[][] = [
  [
    { id: "q1", question: "Language access in federally funded healthcare is required by:", options: ["Title VI and ACA Section 1557", "HIPAA only", "OSHA", "State law only"], answer: 0 },
    { id: "q2", question: "The interpreter's default role is:", options: ["Advocate", "Conduit", "Cultural broker", "Clarifier"], answer: 1 },
    { id: "q3", question: "Who is responsible for medical decisions in the encounter?", options: ["The interpreter", "The provider and the patient", "The family", "The interpreter and provider together"], answer: 1 },
    { id: "q4", question: "Stepping out of the conduit role must be:", options: ["Silent", "Transparent to both parties", "Approved by the family", "Avoided at all costs, even for safety"], answer: 1 },
  ],
  [
    { id: "q1", question: "Which is one of the four principles of biomedical ethics?", options: ["Efficiency", "Autonomy", "Seniority", "Profitability"], answer: 1 },
    { id: "q2", question: "Disclosing a prior relationship with a patient protects:", options: ["Your schedule", "Impartiality", "Your income", "The provider's time"], answer: 1 },
    { id: "q3", question: "A patient asks you not to tell the doctor something. You should:", options: ["Agree", "Explain you interpret everything and interpret the request transparently", "Tell the family", "Leave"], answer: 1 },
    { id: "q4", question: "Advocacy is appropriate only when:", options: ["You disagree with the provider", "Patient safety or dignity is seriously at risk", "The patient asks", "The session is running late"], answer: 1 },
  ],
  [
    { id: "q1", question: "The pre-session with the provider should NOT include:", options: ["The purpose of the visit", "Opinions about the patient's personal life", "The patient's language", "How the provider will pause"], answer: 1 },
    { id: "q2", question: "If you realize you made an interpreting error, you should:", options: ["Ignore it", "Correct it transparently right away", "Correct it at the next visit", "Tell only the patient"], answer: 1 },
    { id: "q3", question: "Interpreter notes should be:", options: ["Kept for future visits", "Destroyed securely after the session", "Given to the patient", "Filed in the chart"], answer: 1 },
    { id: "q4", question: "If left alone with the patient, you should:", options: ["Chat about their symptoms", "Avoid side conversations and wait for the provider", "Give health advice", "Review their chart"], answer: 1 },
  ],
  [
    { id: "q1", question: "The suffix '-itis' means:", options: ["Removal", "Inflammation", "Study of", "Pain"], answer: 1 },
    { id: "q2", question: "'NPO' means:", options: ["As needed", "Nothing by mouth", "By mouth", "Immediately"], answer: 1 },
    { id: "q3", question: "Hypotension means:", options: ["High blood pressure", "Low blood pressure", "High blood sugar", "Rapid heart rate"], answer: 1 },
    { id: "q4", question: "When a term is ambiguous, you should:", options: ["Guess from context", "Ask for clarification", "Skip it", "Use the closest-sounding word"], answer: 1 },
  ],
  [
    { id: "q1", question: "Which chamber pumps oxygen-rich blood to the body?", options: ["Right atrium", "Right ventricle", "Left ventricle", "Left atrium"], answer: 2 },
    { id: "q2", question: "Gas exchange in the lungs happens in the:", options: ["Bronchi", "Trachea", "Alveoli", "Diaphragm"], answer: 2 },
    { id: "q3", question: "A normal adult oxygen saturation is usually:", options: ["70–80%", "85–90%", "95–100%", "Above 110%"], answer: 2 },
    { id: "q4", question: "Homeostasis means:", options: ["A type of infection", "Maintaining stable internal conditions", "A blood test", "A surgical procedure"], answer: 1 },
  ],
  [
    { id: "q1", question: "Care by a specialist after a referral is called:", options: ["Primary care", "Secondary care", "Hospice", "Self-care"], answer: 1 },
    { id: "q2", question: "Medicare primarily covers:", options: ["People 65 and older and some people with disabilities", "Only children", "Only veterans", "Everyone"], answer: 0 },
    { id: "q3", question: "Emergency departments see patients in order of:", options: ["Arrival time", "Severity", "Insurance type", "Age"], answer: 1 },
    { id: "q4", question: "If a patient asks how their insurance works, you should:", options: ["Explain it yourself", "Interpret the question to the appropriate staff", "Ignore it", "Give your opinion"], answer: 1 },
  ],
  [
    { id: "q1", question: "Who obtains informed consent?", options: ["The interpreter", "The provider", "The registrar", "The family"], answer: 1 },
    { id: "q2", question: "During teach-back, a patient repeats a dose incorrectly. You:", options: ["Correct them", "Interpret the incorrect answer exactly", "Skip it", "Give the right dose"], answer: 1 },
    { id: "q3", question: "To avoid date-format confusion at registration, interpret dates:", options: ["As numbers only", "In words, e.g., 'the fifth of March'", "In any format", "By writing them down"], answer: 1 },
    { id: "q4", question: "Complete discharge instructions include:", options: ["Stopped medications and warning signs", "The interpreter's opinion", "Billing codes", "Staff schedules"], answer: 0 },
  ],
  [
    { id: "q1", question: "'Last known well' time matters most in:", options: ["Stroke", "Ear infection", "Sprained ankle", "Routine physicals"], answer: 0 },
    { id: "q2", question: "In mental health, disorganized speech should be:", options: ["Organized for clarity", "Interpreted as it is", "Summarized", "Omitted"], answer: 1 },
    { id: "q3", question: "Cervical dilation is complete at:", options: ["4 cm", "7 cm", "10 cm", "15 cm"], answer: 2 },
    { id: "q4", question: "Pediatric liquid doses should be measured with:", options: ["A kitchen spoon", "A dosing syringe or cup in milliliters", "A cup of any size", "Drops by estimate"], answer: 1 },
  ],
  [
    { id: "q1", question: "A patient's explanatory model is:", options: ["The provider's diagnosis", "The patient's own understanding of the illness", "A billing model", "A cultural stereotype"], answer: 1 },
    { id: "q2", question: "The CLAS Standards address:", options: ["Billing", "Culturally and linguistically appropriate services", "Surgical safety", "Pharmacy labeling"], answer: 1 },
    { id: "q3", question: "When acting as a cultural broker, you should:", options: ["Explain the culture yourself", "Flag the issue transparently and let the provider ask the patient", "Agree with the patient", "Change the question"], answer: 1 },
    { id: "q4", question: "Cultural competence begins with:", options: ["Memorizing rules", "Self-awareness", "Speaking for the community", "Avoiding all cultural topics"], answer: 1 },
  ],
  [
    { id: "q1", question: "HIPAA protects:", options: ["Only paper records", "Protected health information in any form", "Only billing data", "Only test results"], answer: 1 },
    { id: "q2", question: "Discussing a patient with a colleague in the cafeteria is:", options: ["Fine if no name is used", "A breach of confidentiality", "Allowed for training", "Allowed after the visit"], answer: 1 },
    { id: "q3", question: "Patient information may be shared:", options: ["With anyone who asks", "Only as needed for care, per policy", "On social media without names", "With your family"], answer: 1 },
    { id: "q4", question: "A suspected privacy breach should be:", options: ["Ignored", "Reported per organizational policy", "Posted online", "Discussed with the patient's family"], answer: 1 },
  ],
  [
    { id: "q1", question: "The most common mode in medical interpreting is:", options: ["Simultaneous", "Consecutive", "Summary", "Whispered only"], answer: 1 },
    { id: "q2", question: "Interpreting in the first person means saying:", options: ["'He says it hurts'", "'It hurts'", "'The patient reports pain'", "'She is in pain'"], answer: 1 },
    { id: "q3", question: "If a segment is too long to hold accurately, you should:", options: ["Summarize it", "Ask the speaker to pause or repeat", "Skip parts", "Guess"], answer: 1 },
    { id: "q4", question: "Note-taking in consecutive interpreting helps with:", options: ["Numbers, names, and sequence", "Writing the chart", "Keeping records for later", "Billing"], answer: 0 },
  ],
  [
    { id: "q1", question: "Sight translation means:", options: ["Translating a document in writing", "Reading a written document aloud in another language", "Interpreting body language", "Summarizing a form"], answer: 1 },
    { id: "q2", question: "Before sight translating, you should:", options: ["Start immediately", "Scan the document for structure and unfamiliar terms", "Ask the patient to read it", "Skip the headings"], answer: 1 },
    { id: "q3", question: "Long, complex documents should usually be:", options: ["Sight translated quickly", "Translated in writing per policy", "Summarized", "Ignored"], answer: 1 },
    { id: "q4", question: "During sight translation of a consent form, the provider should be:", options: ["Absent", "Present to answer questions", "Optional", "Waiting outside"], answer: 1 },
  ],
  [
    { id: "q1", question: "A compliant remote interpreting workstation requires:", options: ["A shared office", "A private, quiet room and a headset", "A speakerphone", "Recording all calls"], answer: 1 },
    { id: "q2", question: "If audio drops during OPI, you should:", options: ["Fill in the gap", "Tell both parties and ask for a repetition", "End the call", "Continue"], answer: 1 },
    { id: "q3", question: "CCHI and NBCMI require how many hours of training?", options: ["10", "20", "40", "100"], answer: 2 },
    { id: "q4", question: "This program's final assessment passing score is:", options: ["60%", "70%", "80%", "100%"], answer: 2 },
  ],
]
