"use client"

import { useState, type RefObject } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui"

const PIXEL_RATIO = 2
const TARGET_EXPORT_WIDTH = 3840
const PAGE_WIDTH_PT = 792 // 11in landscape page width

export function CertificateDownloadButton({
  targetRef,
  certId,
}: {
  targetRef: RefObject<HTMLElement | null>
  certId: string
}) {
  const [busy, setBusy] = useState(false)
  const [failed, setFailed] = useState(false)

  async function handleDownload() {
    const node = targetRef.current?.querySelector<HTMLElement>("[data-cert-print]") ?? targetRef.current
    if (!node) return
    setBusy(true)
    setFailed(false)
    try {
      const [{ toPng }, { jsPDF }] = await Promise.all([import("html-to-image"), import("jspdf")])
      const width = node.offsetWidth
      const height = node.offsetHeight
      // Export at a fixed ~3840px wide regardless of on-screen size.
      const pixelRatio = Math.max(PIXEL_RATIO, TARGET_EXPORT_WIDTH / width)
      const png = await toPng(node, { pixelRatio, cacheBust: true, backgroundColor: "#fdfbf4" })

      const pageHeight = (PAGE_WIDTH_PT * height) / width
      const pdf = new jsPDF({
        orientation: width >= height ? "landscape" : "portrait",
        unit: "pt",
        format: [PAGE_WIDTH_PT, pageHeight],
        compress: true,
      })
      pdf.setProperties({ title: `Creovixa Certificate ${certId}`, author: "Creovixa Language Services" })
      pdf.addImage(png, "PNG", 0, 0, PAGE_WIDTH_PT, pageHeight, undefined, "FAST")
      pdf.save(`${certId}.pdf`)
    } catch (error) {
      console.log("[v0] certificate PDF export failed:", error)
      setFailed(true)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Button size="sm" onClick={handleDownload} disabled={busy} aria-live="polite">
      {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {busy ? "Generating PDF…" : failed ? "Retry PDF" : "Download PDF"}
    </Button>
  )
}
