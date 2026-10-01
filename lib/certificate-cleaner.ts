import sharp from "sharp"

/**
 * Removes the sample data that is printed on the official Creovixa template
 * (name, course, score, description, dates, number, QR) so the LMS can render
 * real values in the same positions. Every other pixel is left untouched.
 *
 * Coordinates are measured on the 1280x993 master and scaled to the upload.
 * Each erased box is rebuilt from the paper pixels just outside it:
 * "h" blends left/right edges, "v" blends top/bottom edges, "solid" fills with
 * one sampled colour (used for the white QR pad).
 */
export const TEMPLATE_BASE_WIDTH = 1280
export const TEMPLATE_BASE_HEIGHT = 993

type Mode = "h" | "v" | "solid"
type Region = { x0: number; y0: number; x1: number; y1: number; mode: Mode; sample?: [number, number] }

const FIELD_REGIONS: Region[] = [
  { x0: 338, y0: 352, x1: 947, y1: 458, mode: "h" }, // recipient name
  { x0: 845, y0: 466, x1: 942, y1: 490, mode: "h" }, // name descender below the rule
  { x0: 848, y0: 456, x1: 942, y1: 468, mode: "h" }, // rule segment the descender crossed
  { x0: 432, y0: 519, x1: 846, y1: 576, mode: "v" }, // course title
  { x0: 697, y0: 582, x1: 790, y1: 615, mode: "v" }, // score
  { x0: 292, y0: 619, x1: 992, y1: 672, mode: "v" }, // description
  { x0: 274, y0: 718, x1: 472, y1: 750, mode: "v" }, // completion date
  { x0: 562, y0: 718, x1: 766, y1: 750, mode: "v" }, // valid until
  { x0: 846, y0: 718, x1: 1060, y1: 750, mode: "v" }, // certificate number
  { x0: 1054, y0: 782, x1: 1161, y1: 889, mode: "solid", sample: [1052, 835] }, // QR code
]

const TITLE_REGIONS: Region[] = [
  { x0: 322, y0: 166, x1: 968, y1: 260, mode: "h" }, // "CERTIFICATE"
  { x0: 444, y0: 260, x1: 834, y1: 292, mode: "v" }, // "OF COMPLETION"
]

function noise(x: number, y: number) {
  const s = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return (s - Math.floor(s) - 0.5) * 2.4
}

function erase(data: Buffer, width: number, height: number, ch: number, r: Region, sx: number, sy: number) {
  const x0 = Math.max(2, Math.round(r.x0 * sx))
  const x1 = Math.min(width - 3, Math.round(r.x1 * sx))
  const y0 = Math.max(2, Math.round(r.y0 * sy))
  const y1 = Math.min(height - 3, Math.round(r.y1 * sy))
  const at = (x: number, y: number, c: number) => data[(y * width + x) * ch + c]
  // Average a 3px band outside the box so a single stray pixel can't streak.
  const band = (x: number, y: number, c: number, dx: number, dy: number) =>
    (at(x, y, c) + at(x + dx, y + dy, c) + at(x + 2 * dx, y + 2 * dy, c)) / 3

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      for (let c = 0; c < Math.min(ch, 3); c++) {
        let value: number
        if (r.mode === "solid") {
          value = at(Math.round(r.sample![0] * sx), Math.round(r.sample![1] * sy), c)
        } else if (r.mode === "h") {
          const u = (x - x0) / Math.max(1, x1 - x0)
          value = band(x0 - 1, y, c, -1, 0) * (1 - u) + band(x1 + 1, y, c, 1, 0) * u
        } else {
          const v = (y - y0) / Math.max(1, y1 - y0)
          value = band(x, y0 - 1, c, 0, -1) * (1 - v) + band(x, y1 + 1, c, 0, 1) * v
        }
        if (r.mode !== "solid") value += noise(x, y)
        data[(y * width + x) * ch + c] = Math.max(0, Math.min(255, Math.round(value)))
      }
    }
  }
}

export async function cleanTemplate(input: Buffer, options: { removeTitle: boolean }) {
  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const sx = info.width / TEMPLATE_BASE_WIDTH
  const sy = info.height / TEMPLATE_BASE_HEIGHT
  const regions = options.removeTitle ? [...TITLE_REGIONS, ...FIELD_REGIONS] : FIELD_REGIONS
  for (const r of regions) erase(data, info.width, info.height, info.channels, r, sx, sy)
  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png({ compressionLevel: 9 })
    .toBuffer()
}

/** Same layout as the master within 3%: anything else would misplace fields. */
export function matchesMasterLayout(width: number, height: number) {
  const ratio = width / height
  const master = TEMPLATE_BASE_WIDTH / TEMPLATE_BASE_HEIGHT
  return Math.abs(ratio - master) / master <= 0.03 && width >= 1000
}
