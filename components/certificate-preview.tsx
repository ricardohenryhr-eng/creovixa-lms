"use client"

import { QRCodeSVG } from "qrcode.react"
import { Signature } from "@/components/signature"
import { formatDate } from "@/lib/utils"
import type { Certificate } from "@/lib/data"

const SIGNATORIES = [
  { key: "ricardo", name: "Ricardo Henry", title: "Chief Executive Officer (CEO)" },
  { key: "belson", name: "Belson Bugotte", title: "Training Director" },
  { key: "anderson", name: "Anderson Verger", title: "Human Resources Manager (HR)" },
] as const

// Official Creovixa palette for the printed certificate document. These exact
// navy/gold values intentionally live here (not the app tokens) so the
// certificate reproduces the branded template regardless of app theme.
const NAVY = "#0f2a5e"
const GOLD = "#c8a34a"
const GOLD_DEEP = "#8a6516"

/**
 * QR verification always points at the production verification route so a
 * scanned certificate resolves no matter where it was rendered or printed.
 */
function verificationUrl(certId: string) {
  return `https://lms.creovixa.com/verify/${encodeURIComponent(certId)}`
}

function isMedicalCert(cert: Certificate) {
  return cert.variant === "medical" || cert.certId.split("-")[1]?.toUpperCase() === "MED"
}

/** Small gold diamond used as an ornamental divider. */
function Diamond() {
  return <span className="inline-block h-2 w-2 rotate-45" style={{ backgroundColor: GOLD }} aria-hidden="true" />
}

/** Gold wax-style seal with the Creovixa mark and circular lettering. */
function Seal() {
  return (
    <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
      <div
        className="absolute inset-0 rounded-full shadow-md"
        style={{ background: `radial-gradient(circle at 35% 30%, #f3d98b, ${GOLD} 55%, ${GOLD_DEEP})` }}
      />
      <div className="absolute inset-[6px] rounded-full border-2" style={{ borderColor: "#fdfbf4aa" }} />
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <defs>
          <path id="sealArc" d="M50,50 m-34,0 a34,34 0 1,1 68,0 a34,34 0 1,1 -68,0" />
        </defs>
        <text fill={NAVY} fontSize="9.5" fontWeight="700" letterSpacing="1.2">
          <textPath href="#sealArc" startOffset="0%">
            · CREOVIXA LANGUAGE SERVICES · EST. 2024
          </textPath>
        </text>
      </svg>
      <img
        src="/creovixa-mark.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 m-auto h-8 w-8 object-contain sm:h-9 sm:w-9"
      />
    </div>
  )
}

export function CertificatePreview({ cert }: { cert: Certificate }) {
  const verifyUrl = verificationUrl(cert.certId)
  const medical = isMedicalCert(cert)
  const hours = cert.hours ?? (medical ? 40 : undefined)

  const completedLine = medical
    ? "has successfully completed the full medical interpreter program"
    : "has successfully completed the certification course"

  const description = medical
    ? "This certifies that the learner has successfully completed the full 40-Hour Medical Interpreter Training Program, including medical terminology, ethics, confidentiality, cultural competency, patient-provider communication, interpreting protocols, and final competency assessment."
    : "This certificate confirms the completion of training on professional ethics, confidentiality, cultural sensitivity, and best practices in language services."

  const corners = [
    "left-3 top-3 border-l-2 border-t-2",
    "right-3 top-3 border-r-2 border-t-2",
    "right-3 bottom-3 border-r-2 border-b-2",
    "left-3 bottom-3 border-l-2 border-b-2",
  ]

  return (
    <div data-cert-print className="mx-auto w-full">
      {/* Outer navy frame → gold band → inner navy keyline → cream document */}
      <div className="rounded-sm p-1.5 sm:p-2" style={{ backgroundColor: NAVY }}>
        <div
          className="p-[3px]"
          style={{ background: `linear-gradient(135deg, #f3d98b, ${GOLD} 45%, ${GOLD_DEEP})` }}
        >
          <div className="p-[2px]" style={{ backgroundColor: NAVY }}>
            <div className="relative overflow-hidden bg-[#fdfbf4] px-5 py-6 text-center sm:px-10 sm:py-9">
              {/* Gold corner accents */}
              {corners.map((c) => (
                <span key={c} className={`pointer-events-none absolute h-7 w-7 ${c}`} style={{ borderColor: GOLD }} aria-hidden="true" />
              ))}

              {/* Header: logo + service tagline */}
              <div className="flex items-start justify-between gap-3 text-left">
                <img
                  src="/creovixa-logo-full.png"
                  alt="Creovixa Language Services"
                  className="h-9 w-auto sm:h-12"
                />
                <div className="text-right">
                  <p className="text-[8px] font-semibold tracking-[0.12em] sm:text-[11px]" style={{ color: NAVY }}>
                    INTERPRETATION&nbsp; | &nbsp;TRANSLATION&nbsp; | &nbsp;CULTURAL CONNECTIVITY
                  </p>
                  <p className="mt-1 font-script text-lg leading-none sm:text-2xl" style={{ color: GOLD_DEEP }}>
                    A More Inclusive World.
                  </p>
                </div>
              </div>

              {/* Title */}
              <h2
                className="mt-5 font-display text-4xl font-extrabold uppercase leading-none tracking-[0.06em] text-transparent sm:mt-6 sm:text-6xl"
                style={{
                  backgroundImage: `linear-gradient(180deg, #f3d98b, ${GOLD} 45%, ${GOLD_DEEP})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                }}
              >
                Certificate
              </h2>
              <div className="mt-2 flex items-center justify-center gap-3">
                <span className="h-px w-10 sm:w-16" style={{ backgroundColor: GOLD }} />
                <p className="text-xs font-semibold tracking-[0.35em] sm:text-sm" style={{ color: NAVY }}>
                  OF COMPLETION
                </p>
                <span className="h-px w-10 sm:w-16" style={{ backgroundColor: GOLD }} />
              </div>

              {/* Recipient */}
              <p className="mt-5 text-[10px] font-medium tracking-[0.3em] sm:text-xs" style={{ color: `${NAVY}b3` }}>
                THIS CERTIFIES THAT
              </p>
              <p className="mt-1 font-script text-4xl leading-tight sm:text-6xl" style={{ color: NAVY }}>
                {cert.recipient}
              </p>
              <span className="mx-auto mt-1 block h-px w-48 sm:w-72" style={{ backgroundColor: GOLD }} />

              {/* Course / program */}
              <p className="mt-4 text-xs sm:text-sm" style={{ color: `${NAVY}cc` }}>
                {completedLine}
              </p>
              <p className="mt-1.5 font-display text-2xl font-bold sm:text-3xl" style={{ color: NAVY }}>
                {cert.courseTitle}
              </p>

              {medical && hours ? (
                <p className="mt-2 text-sm font-semibold sm:text-base" style={{ color: GOLD_DEEP }}>
                  Training Hours Completed: {hours} Hours
                </p>
              ) : null}

              <p className="mt-1.5 text-xs sm:text-sm" style={{ color: `${NAVY}cc` }}>
                with a final score of <span className="font-bold" style={{ color: NAVY }}>{cert.score}%</span>
              </p>

              {/* Description */}
              <p className="mx-auto mt-3 max-w-xl text-pretty text-[11px] italic leading-relaxed sm:text-xs" style={{ color: `${NAVY}b3` }}>
                {description}
              </p>

              {/* Meta row */}
              <div className="mx-auto mt-5 grid max-w-2xl grid-cols-3">
                <div className="px-2">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] sm:text-[10px]" style={{ color: `${NAVY}99` }}>
                    Date of Completion
                  </p>
                  <p className="mt-1 text-xs font-semibold sm:text-sm" style={{ color: NAVY }}>{formatDate(cert.issuedAt)}</p>
                </div>
                <div className="border-x px-2" style={{ borderColor: `${GOLD}80` }}>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] sm:text-[10px]" style={{ color: `${NAVY}99` }}>
                    Valid Until
                  </p>
                  <p className="mt-1 text-xs font-semibold sm:text-sm" style={{ color: NAVY }}>
                    {cert.expiresAt ? formatDate(cert.expiresAt) : "No Expiration"}
                  </p>
                </div>
                <div className="px-2">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] sm:text-[10px]" style={{ color: `${NAVY}99` }}>
                    Certificate No.
                  </p>
                  <p className="mt-1 font-mono text-xs font-semibold sm:text-sm" style={{ color: NAVY }}>{cert.certId}</p>
                </div>
              </div>

              {/* Seal · signatures · QR */}
              <div className="mt-6 flex items-end justify-between gap-3">
                <Seal />

                <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-4">
                  {SIGNATORIES.map((s) => (
                    <div key={s.key} className="flex flex-col items-center text-center">
                      <Signature nameKey={s.key} className="h-7 w-full sm:h-9" style={{ color: NAVY }} />
                      <span className="mt-1 h-px w-full" style={{ backgroundColor: `${NAVY}66` }} />
                      <span className="mt-1 text-[9px] font-bold leading-tight sm:text-[11px]" style={{ color: NAVY }}>
                        {s.name}
                      </span>
                      <span className="text-[7px] leading-tight sm:text-[9px]" style={{ color: `${NAVY}99` }}>
                        {s.title}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex shrink-0 flex-col items-center">
                  <span className="rounded border bg-white p-1" style={{ borderColor: GOLD }}>
                    <QRCodeSVG value={verifyUrl} size={60} level="M" fgColor={NAVY} />
                  </span>
                  <span className="mt-1 text-[7px] font-semibold tracking-[0.2em] sm:text-[8px]" style={{ color: `${NAVY}b3` }}>
                    SCAN TO VERIFY
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 border-t pt-3" style={{ borderColor: `${GOLD}66` }}>
                <p className="text-[9px] font-semibold tracking-[0.3em] sm:text-[11px]" style={{ color: GOLD_DEEP }}>
                  PEOPLE&nbsp; | &nbsp;COMMUNICATION&nbsp; | &nbsp;OPPORTUNITY
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
