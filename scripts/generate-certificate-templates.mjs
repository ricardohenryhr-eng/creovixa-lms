import { readFile, writeFile } from "node:fs/promises"

const { cleanTemplate } = await import("../lib/certificate-cleaner.ts")

const source = await readFile(new URL("../public/certificate-template.jpeg", import.meta.url))
await writeFile(
  new URL("../public/certificate-template-standard.png", import.meta.url),
  await cleanTemplate(source, { removeTitle: false }),
)
await writeFile(
  new URL("../public/certificate-template-medical.png", import.meta.url),
  await cleanTemplate(source, { removeTitle: true }),
)
console.log("Generated standard and medical certificate backgrounds")
