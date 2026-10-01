import type { ReactNode } from "react"

/**
 * Renders the lightweight formatting admins use for lesson notes:
 * `## Heading`, `### Subheading`, `- bullet`, `1. numbered`, `> callout`,
 * `**bold**`, and `*italic*`. Builds React elements directly (no HTML
 * injection), so admin-authored text can never execute markup.
 */
export function RichText({ text }: { text: string }) {
  const blocks: ReactNode[] = []
  const lines = text.replace(/\r\n/g, "\n").split("\n")
  let i = 0

  while (i < lines.length) {
    const line = lines[i].trimEnd()
    const trimmed = line.trim()

    if (!trimmed) {
      i++
      continue
    }

    if (trimmed.startsWith("### ")) {
      blocks.push(
        <h4 key={i} className="font-display text-sm font-semibold text-foreground">
          {inline(trimmed.slice(4))}
        </h4>,
      )
      i++
      continue
    }

    if (trimmed.startsWith("## ")) {
      blocks.push(
        <h3 key={i} className="font-display text-base font-semibold text-foreground text-balance">
          {inline(trimmed.slice(3))}
        </h3>,
      )
      i++
      continue
    }

    if (/^[-*] /.test(trimmed)) {
      const start = i
      const items: string[] = []
      while (i < lines.length && /^[-*] /.test(lines[i].trim())) items.push(lines[i++].trim().slice(2))
      blocks.push(
        <ul key={start} className="flex list-disc flex-col gap-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
          {items.map((t, j) => (
            <li key={j}>{inline(t)}</li>
          ))}
        </ul>,
      )
      continue
    }

    if (/^\d+\. /.test(trimmed)) {
      const start = i
      const items: string[] = []
      while (i < lines.length && /^\d+\. /.test(lines[i].trim())) items.push(lines[i++].trim().replace(/^\d+\. /, ""))
      blocks.push(
        <ol key={start} className="flex list-decimal flex-col gap-1.5 pl-5 text-sm leading-relaxed text-foreground/90">
          {items.map((t, j) => (
            <li key={j}>{inline(t)}</li>
          ))}
        </ol>,
      )
      continue
    }

    if (trimmed.startsWith("> ")) {
      const start = i
      const parts: string[] = []
      while (i < lines.length && lines[i].trim().startsWith("> ")) parts.push(lines[i++].trim().slice(2))
      blocks.push(
        <blockquote
          key={start}
          className="rounded-lg border border-primary/20 bg-accent/40 px-4 py-3 text-sm leading-relaxed text-foreground"
        >
          {inline(parts.join(" "))}
        </blockquote>,
      )
      continue
    }

    const start = i
    const parts: string[] = []
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines[i].trim())) parts.push(lines[i++].trim())
    blocks.push(
      <p key={start} className="text-pretty text-sm leading-relaxed text-foreground/90">
        {inline(parts.join(" "))}
      </p>,
    )
  }

  return <div className="flex flex-col gap-4">{blocks}</div>
}

function isBlockStart(line: string) {
  return /^(#{2,3} |[-*] |\d+\. |> )/.test(line)
}

function inline(text: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>
    }
    return part
  })
}
