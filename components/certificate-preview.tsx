"use client"

import type { CSSProperties, ReactNode } from "react"
import { Crimson_Pro } from "next/font/google"
import { QRCodeSVG } from "qrcode.react"
import { formatDate } from "@/lib/utils"
import type { Certificate } from "@/lib/data"
import { DEFAULT_TEMPLATE, certificateDescription, isMedicalCertificate } from "@/lib/certificates"

const crimson = Crimson_Pro({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" })

// Colours sampled from the official template so printed values blend in.
const NAVY = "#14214b"
const GOLD = "#9c6d1d"

// Every position below is measured in pixels on the 1280x993 master template
// and converted to percentages / container units, so the overlay lines up at
// any rendered size (screen, print, or high-resolution PDF export).
const BASE_W = 1280
const BASE_H = 993
const u = (px: number) => `${(px / BASE_W) * 100}cqw`

function Field({
  x,
  y,
  w,
  h,
  align = "center",
  children,
  className = "",
  style,
}: {
  x: number
  y: number
  w: number
  h: number
  align?: "center" | "start"
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={`absolute flex items-center ${align === "center" ? "justify-center text-center" : "justify-start"} ${className}`}
      style={{
        left: `${(x / BASE_W) * 100}%`,
        top: `${(y / BASE_H) * 100}%`,
        width: `${(w / BASE_W) * 100}%`,
        height: `${(h / BASE_H) * 100}%`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Shrink long values so they never overflow their slot on the template. */
function fitSize(base: number, text: string, comfortableLength: number, min: number) {
  if (text.length <= comfortableLength) return base
  return Math.max(min, (base * comfortableLength) / text.length)
}

/** QR verification always points at production so printed copies resolve. */
function verificationUrl(certId: string) {
  return `https://lms.creovixa.com/verify/${encodeURIComponent(certId)}`
}

export function CertificatePreview({ cert }: { cert: Certificate }) {
  const medical = isMedicalCertificate(cert)
  const background = cert.templateStandardUrl ?? DEFAULT_TEMPLATE.standardUrl
  const courseLine = medical ? `${cert.hours ?? 40}-Hour Medical Interpreter Training` : cert.courseTitle
  const values = { color: NAVY, fontSize: u(21.5), fontWeight: 500 }

  return (
    <div
      data-cert-print
      className={`relative mx-auto w-full overflow-hidden ${crimson.className}`}
      style={{ containerType: "inline-size", aspectRatio: `${BASE_W} / ${BASE_H}` }}
      role="img"
      aria-label={`Certificate ${cert.certId} awarded to ${cert.recipient} for ${medical ? "40-Hour Medical Interpreter Training" : cert.courseTitle}`}
    >
      <img
        src={background || "/placeholder.svg"}
        alt=""
        aria-hidden="true"
        crossOrigin="anonymous"
        className="absolute inset-0 h-full w-full select-none"
        draggable={false}
      />

      <Field x={338} y={352} w={609} h={106}>
        <p
          className="whitespace-nowrap font-script leading-none"
          style={{ color: NAVY, fontSize: u(fitSize(78, cert.recipient, 16, 46)) }}
        >
          {cert.recipient}
        </p>
      </Field>

      <Field x={290} y={519} w={700} h={57}>
        <p
          className="whitespace-nowrap font-bold leading-none"
          style={{ color: GOLD, fontSize: u(fitSize(50, courseLine, 22, 28)) }}
        >
          {courseLine}
        </p>
      </Field>

      <Field x={699} y={582} w={110} h={33} align="start">
        <p className="font-bold leading-none" style={{ color: NAVY, fontSize: u(31) }}>
          {cert.score}%
        </p>
      </Field>

      <Field x={292} y={619} w={700} h={53}>
        <p className="text-balance" style={{ color: NAVY, fontSize: u(18.5), lineHeight: 1.35 }}>
          {certificateDescription(cert)}
        </p>
      </Field>

      <Field x={274} y={718} w={198} h={32}>
        <p style={values}>{formatDate(cert.issuedAt)}</p>
      </Field>
      <Field x={562} y={718} w={204} h={32}>
        <p style={values}>{cert.expiresAt ? formatDate(cert.expiresAt) : "No Expiration"}</p>
      </Field>
      <Field x={846} y={718} w={214} h={32}>
        <p className="whitespace-nowrap" style={{ ...values, fontSize: u(fitSize(21.5, cert.certId, 18, 15)) }}>
          {cert.certId}
        </p>
      </Field>

      <Field x={1057} y={785} w={102} h={102}>
        <QRCodeSVG
          value={verificationUrl(cert.certId)}
          level="M"
          fgColor={NAVY}
          bgColor="#ffffff"
          marginSize={1}
          className="h-full w-full"
          title={`Verify certificate ${cert.certId}`}
        />
      </Field>
    </div>
  )
}
