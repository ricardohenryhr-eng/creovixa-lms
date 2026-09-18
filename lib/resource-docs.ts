import { getCourse, type ResourceKind } from "@/lib/data"
import { courseContent } from "@/lib/course-content"

/** A block within a generated document. */
export type DocBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "bullet"; text: string }
  | { type: "term"; term: string; definition: string }
  | { type: "spacer" }

export interface GeneratedDoc {
  title: string
  subtitle: string
  blocks: DocBlock[]
}

const kindTitles: Record<ResourceKind, string> = {
  study_guide: "Study Guide",
  vocabulary: "Vocabulary List",
  manual: "Course Manual",
  handout: "Handout",
}

/**
 * Build a structured, printable document for a course from its authored
 * content. The three document kinds draw on the same source material but
 * present it for different purposes: a concise study guide, an alphabetized
 * vocabulary list, or a comprehensive manual.
 */
export function buildResourceDoc(slug: string, kind: ResourceKind): GeneratedDoc | null {
  const course = getCourse(slug)
  const content = courseContent[slug]
  if (!course || !content) return null

  const title = `${course.title} — ${kindTitles[kind]}`
  const subtitle = "Creovixa Learn · Confidential training material"
  const blocks: DocBlock[] = []

  if (kind === "vocabulary") {
    const terms = new Map<string, string>()
    for (const m of content.modules) {
      for (const l of m.lessons) {
        for (const t of l.terminology ?? []) {
          if (!terms.has(t.term)) terms.set(t.term, t.definition)
        }
      }
    }
    const sorted = [...terms.entries()].sort((a, b) => a[0].localeCompare(b[0]))
    blocks.push({ type: "paragraph", text: `Key terminology for ${course.title}. ${sorted.length} terms.` })
    blocks.push({ type: "spacer" })
    for (const [term, definition] of sorted) blocks.push({ type: "term", term, definition })
    return { title, subtitle, blocks }
  }

  // Study guide and manual share structure; the manual includes the full
  // written material and knowledge-check questions, the study guide condenses.
  const full = kind === "manual"
  blocks.push({ type: "paragraph", text: course.description })
  blocks.push({ type: "spacer" })

  content.modules.forEach((m, mi) => {
    blocks.push({ type: "heading", text: `Module ${mi + 1}: ${m.title}` })
    for (const l of m.lessons) {
      blocks.push({ type: "subheading", text: l.title })
      if (l.objectives?.length) {
        blocks.push({ type: "paragraph", text: "Learning objectives:" })
        for (const o of l.objectives) blocks.push({ type: "bullet", text: o })
      }
      if (l.content?.length) {
        const paras = full ? l.content : l.content.slice(0, 1)
        for (const p of paras) blocks.push({ type: "paragraph", text: p })
      }
      if (l.terminology?.length) {
        blocks.push({ type: "paragraph", text: "Key terms:" })
        for (const t of l.terminology) blocks.push({ type: "term", term: t.term, definition: t.definition })
      }
      if (full && l.knowledgeCheck?.length) {
        blocks.push({ type: "paragraph", text: "Knowledge check:" })
        for (const q of l.knowledgeCheck) {
          blocks.push({ type: "bullet", text: q.question })
          blocks.push({ type: "paragraph", text: `Answer: ${q.options[q.answer]}` })
        }
      }
      blocks.push({ type: "spacer" })
    }
  })

  blocks.push({ type: "heading", text: "Final assessment" })
  blocks.push({
    type: "paragraph",
    text: `${content.finalAssessment.title} — ${content.finalAssessment.questions.length} questions, passing score ${content.finalAssessment.passingScore}%.`,
  })

  return { title, subtitle, blocks }
}

export function resourceFileName(slug: string, kind: ResourceKind): string {
  const course = getCourse(slug)
  const base = (course?.title ?? slug).replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "")
  return `${base}-${kind}.pdf`
}
