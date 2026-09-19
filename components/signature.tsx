// Decorative handwritten-style signatures rendered as SVG so no extra font
// family is required. Each signatory has a distinct stroke path.
const SIGNATURE_PATHS: Record<string, string> = {
  ricardo:
    "M4 30 C 10 8, 16 8, 18 24 C 20 34, 24 12, 30 20 C 34 25, 34 30, 40 18 C 44 10, 52 32, 64 20 C 74 10, 84 30, 96 16 C 104 6, 112 26, 124 18",
  belson:
    "M4 26 C 8 12, 18 10, 20 26 C 22 36, 28 14, 34 24 C 40 32, 44 8, 52 22 C 58 32, 66 12, 76 24 C 84 32, 92 14, 104 22 C 114 28, 118 18, 126 22",
  anderson:
    "M4 22 C 12 6, 18 34, 26 20 C 32 10, 36 30, 44 20 C 50 12, 58 30, 68 18 C 76 8, 82 32, 94 20 C 102 12, 110 28, 122 16 C 125 13, 127 15, 128 18",
}

export function Signature({
  nameKey,
  className,
  style,
}: {
  nameKey: string
  className?: string
  style?: React.CSSProperties
}) {
  const d = SIGNATURE_PATHS[nameKey] ?? SIGNATURE_PATHS.ricardo
  return (
    <svg
      viewBox="0 0 132 40"
      className={className}
      style={style}
      fill="none"
      role="img"
      aria-label="Digital signature"
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={d} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
