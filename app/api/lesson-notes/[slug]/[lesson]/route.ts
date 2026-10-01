import { getCourse } from "@/lib/data"
import { courseContent } from "@/lib/course-content"
import { renderDocPdf } from "@/lib/pdf-render"
import type { DocBlock } from "@/lib/resource-docs"

/** Downloadable PDF notes for one lesson. `lesson` is `<moduleId>-<lessonId>`, e.g. `m3-l3`. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const { slug, lesson } = await params
  const course = getCourse(slug)
  const content = courseContent[slug]
  const [moduleId, lessonId] = lesson.split("-")
  const mod = content?.modules.find((m) => m.id === moduleId)
  const item = mod?.lessons.find((l) => l.id === lessonId)
  if (!course || !mod || !item) return new Response("Lesson not found", { status: 404 })

  const blocks: DocBlock[] = [{ type: "heading", text: item.title }]
  if (item.objectives?.length) {
    blocks.push({ type: "subheading", text: "Learning objectives" })
    for (const o of item.objectives) blocks.push({ type: "bullet", text: o })
  }
  if (item.content?.length) {
    blocks.push({ type: "subheading", text: "Training notes" })
    for (const p of item.content) blocks.push({ type: "paragraph", text: p })
  }
  if (item.terminology?.length) {
    blocks.push({ type: "subheading", text: "Key terminology" })
    for (const t of item.terminology) blocks.push({ type: "term", term: t.term, definition: t.definition })
  }
  if (item.knowledgeCheck?.length) {
    blocks.push({ type: "subheading", text: "Review questions" })
    item.knowledgeCheck.forEach((q, i) => blocks.push({ type: "bullet", text: `${i + 1}. ${q.question}` }))
  }

  const bytes = await renderDocPdf({ title: mod.title, subtitle: `${course.title} - Lesson notes`, blocks })
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}-${moduleId}-notes.pdf"`,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
