export function WaterQualityWoodcut() {
  return (
    <svg viewBox="0 0 220 96" className="newspaper-woodcut__svg" aria-hidden="true">
      <rect width="220" height="96" fill="#c7b086" />
      <rect x="3" y="3" width="214" height="90" fill="none" stroke="#2a1e10" strokeWidth="1.6" />

      {/* Night 9 is a water-quality report: the engraving contains no hand,
          person or skin mark, only the contaminated water itself. */}
      <path d="M4 42 Q31 34 59 43 T113 42 T168 40 T216 44 L216 93 L4 93 Z" fill="#2b1e12" />
      <path d="M5 51 Q32 43 61 52 T116 51 T171 49 T215 53" fill="none" stroke="#c7b086" strokeWidth="1.1" opacity=".8" />
      <path d="M5 62 Q34 54 64 63 T119 62 T175 60 T215 64" fill="none" stroke="#c7b086" strokeWidth=".9" opacity=".72" />
      <path d="M6 74 Q35 66 68 75 T125 74 T181 72 T214 76" fill="none" stroke="#c7b086" strokeWidth="1.4" opacity=".62" />
      <path d="M7 86 Q38 78 72 87 T128 86 T183 84 T214 88" fill="none" stroke="#c7b086" strokeWidth=".7" opacity=".55" />

      {/* A sampling jar with a dark oily surface, suspended sediment and sludge. */}
      <g transform="translate(77 11)">
        <path d="M10 12 L47 12 L44 20 L47 69 Q28 78 8 69 L12 20 Z" fill="#c7b086" stroke="#2b1e12" strokeWidth="1.4" />
        <path d="M10 12 L47 12 L47 20 L10 20 Z" fill="#2b1e12" />
        <path d="M12 37 Q28 30 45 37 L46 66 Q28 73 10 66 Z" fill="#2b1e12" opacity=".9" />
        <path d="M12 37 Q28 44 45 37" fill="none" stroke="#c7b086" strokeWidth="1.1" />
        <path d="M13 55 Q28 48 45 55" fill="none" stroke="#c7b086" strokeWidth=".8" opacity=".8" />
        <path d="M15 63 Q29 57 43 63" fill="none" stroke="#c7b086" strokeWidth=".65" opacity=".62" />
        <g fill="#2b1e12">
          <circle cx="18" cy="28" r="1.4" /><circle cx="28" cy="25" r="1" /><circle cx="38" cy="31" r="1.5" />
          <circle cx="22" cy="48" r="1.2" /><circle cx="35" cy="45" r=".9" /><circle cx="39" cy="59" r="1.25" />
        </g>
        <path d="M7 8 H50 M15 4 H42" stroke="#2b1e12" strokeWidth="1.1" />
      </g>

      {/* Slicks, chemical foam, dead fish and reeds complete the report. */}
      <path d="M13 29 Q28 23 43 29 T72 28" fill="none" stroke="#2b1e12" strokeWidth="2.4" opacity=".7" />
      <path d="M143 29 Q161 23 179 29 T211 28" fill="none" stroke="#2b1e12" strokeWidth="2.1" opacity=".72" />
      <path d="M145 48 Q164 41 184 48 T213 47" fill="none" stroke="#c7b086" strokeWidth="1.4" opacity=".85" />
      <path d="M151 63 Q165 56 180 63 T207 62" fill="none" stroke="#2b1e12" strokeWidth="1.2" opacity=".75" />
      <path d="M157 88 Q164 81 171 88 Q164 94 157 88 Z M187 81 Q194 75 201 81 Q194 87 187 81 Z" fill="#c7b086" stroke="#2b1e12" strokeWidth="1" />
      <path d="M164 88 l4 -4 M194 81 l4 -4" stroke="#2b1e12" strokeWidth=".8" />
      <path d="M54 63 C48 52 49 41 55 31 M61 64 C65 49 71 39 77 31 M203 64 C199 50 195 42 188 35" fill="none" stroke="#2b1e12" strokeWidth="1.5" />
      <path d="M15 15 Q28 10 42 15 M179 12 Q193 8 208 13" fill="none" stroke="#5a4025" strokeWidth=".6" opacity=".6" />
      <text x="12" y="20" fontFamily="Georgia, serif" fontSize="7" fill="#2b1e12">WASSER</text>
      <text x="167" y="19" fontFamily="Georgia, serif" fontSize="6.5" fill="#2b1e12">WARNUNG</text>
    </svg>
  );
}
