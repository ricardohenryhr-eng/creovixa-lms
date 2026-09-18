import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib"
import { buildResourceDoc, resourceFileName } from "@/lib/resource-docs"
import type { ResourceKind } from "@/lib/data"

const VALID_KINDS: ResourceKind[] = ["study_guide", "vocabulary", "manual", "handout"]

const PAGE_W = 612
const PAGE_H = 792
const MARGIN = 56
const MAX_W = PAGE_W - MARGIN * 2
const ORANGE = rgb(0.79, 0.35, 0.09)
const INK = rgb(0.1, 0.12, 0.16)
const MUTED = rgb(0.42, 0.45, 0.5)

/** Wrap a string into lines that fit maxWidth at the given font/size. */
function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean)
  const lines: string[] = []
  let line = ""
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line)
      line = word
    } else {
      line = candidate
    }
  }
  if (line) lines.push(line)
  return lines.length ? lines : [""]
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string; kind: string }> },
) {
  const { slug, kind } = await params
  if (!VALID_KINDS.includes(kind as ResourceKind)) {
    return new Response("Unknown resource type", { status: 404 })
  }

  const doc = buildResourceDoc(slug, kind as ResourceKind)
  if (!doc) return new Response("Resource not found", { status: 404 })

  const pdf = await PDFDocument.create()
  pdf.setTitle(doc.title)
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)

  let page: PDFPage = pdf.addPage([PAGE_W, PAGE_H])
  let y = PAGE_H - MARGIN

  const newPage = () => {
    page = pdf.addPage([PAGE_W, PAGE_H])
    y = PAGE_H - MARGIN
  }
  const ensure = (needed: number) => {
    if (y - needed < MARGIN) newPage()
  }
  const drawLines = (
    text: string,
    opts: { font: PDFFont; size: number; color?: ReturnType<typeof rgb>; gap?: number; indent?: number },
  ) => {
    const indent = opts.indent ?? 0
    const lines = wrapText(text, opts.font, opts.size, MAX_W - indent)
    const lineHeight = opts.size * 1.4
    for (const line of lines) {
      ensure(lineHeight)
      page.drawText(line, { x: MARGIN + indent, y: y - opts.size, size: opts.size, font: opts.font, color: opts.color ?? INK })
      y -= lineHeight
    }
    if (opts.gap) y -= opts.gap
  }

  // Document header
  drawLines("Creovixa Learn", { font: bold, size: 12, color: ORANGE })
  y -= 2
  drawLines(doc.title, { font: bold, size: 20, color: INK, gap: 4 })
  drawLines(doc.subtitle, { font, size: 10, color: MUTED, gap: 14 })

  for (const block of doc.blocks) {
    switch (block.type) {
      case "heading":
        y -= 6
        ensure(28)
        drawLines(block.text, { font: bold, size: 15, color: ORANGE, gap: 4 })
        break
      case "subheading":
        y -= 2
        ensure(22)
        drawLines(block.text, { font: bold, size: 12.5, color: INK, gap: 3 })
        break
      case "paragraph":
        drawLines(block.text, { font, size: 10.5, color: INK, gap: 6 })
        break
      case "bullet":
        drawLines(`•  ${block.text}`, { font, size: 10.5, color: INK, gap: 3, indent: 10 })
        break
      case "term":
        drawLines(block.term, { font: bold, size: 10.5, color: INK, gap: 1 })
        drawLines(block.definition, { font, size: 10.5, color: MUTED, gap: 6, indent: 10 })
        break
      case "spacer":
        y -= 8
        break
    }
  }

  const bytes = await pdf.save()
  return new Response(Buffer.from(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${resourceFileName(slug, kind as ResourceKind)}"`,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  })
}
