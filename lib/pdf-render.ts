import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib"
import type { GeneratedDoc } from "@/lib/resource-docs"

const PAGE_W = 612
const PAGE_H = 792
const MARGIN = 56
const MAX_W = PAGE_W - MARGIN * 2
const ORANGE = rgb(0.79, 0.35, 0.09)
const INK = rgb(0.1, 0.12, 0.16)
const MUTED = rgb(0.42, 0.45, 0.5)

/** pdf-lib's standard fonts are WinAnsi-only; replace characters it cannot encode. */
function sanitize(text: string): string {
  return text
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00B7/g, "-")
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, "")
}

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

/** Render a structured document to a branded, paginated PDF. */
export async function renderDocPdf(doc: GeneratedDoc): Promise<Uint8Array> {
  const pdf = await PDFDocument.create()
  pdf.setTitle(sanitize(doc.title))
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)

  let page: PDFPage = pdf.addPage([PAGE_W, PAGE_H])
  let y = PAGE_H - MARGIN

  const ensure = (needed: number) => {
    if (y - needed < MARGIN) {
      page = pdf.addPage([PAGE_W, PAGE_H])
      y = PAGE_H - MARGIN
    }
  }
  const drawLines = (
    raw: string,
    opts: { font: PDFFont; size: number; color?: ReturnType<typeof rgb>; gap?: number; indent?: number },
  ) => {
    const indent = opts.indent ?? 0
    const lineHeight = opts.size * 1.4
    for (const line of wrapText(sanitize(raw), opts.font, opts.size, MAX_W - indent)) {
      ensure(lineHeight)
      page.drawText(line, { x: MARGIN + indent, y: y - opts.size, size: opts.size, font: opts.font, color: opts.color ?? INK })
      y -= lineHeight
    }
    if (opts.gap) y -= opts.gap
  }

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
        drawLines(`-  ${block.text}`, { font, size: 10.5, color: INK, gap: 3, indent: 10 })
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

  return pdf.save()
}
