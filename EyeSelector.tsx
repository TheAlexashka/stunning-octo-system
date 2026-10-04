import { useId } from 'react';

// Sepia newspaper engraving, in the same palette as the night 3 and 4 cuts.
const INK = '#2c1e10';
const DARK = '#342314';
const MID = '#6b5135';
const PAPER = '#cbb58b';
const PAPER_LIGHT = '#e0cca2';
const BONE = '#ded2b8';
const CREAM = '#fbf5e6';

export function DoppelgangerWoodcut() {
  const id = `doppel-plate-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const head = 'M83 16 C52 16 38 40 40 75 C39 106 46 127 62 140 Q83 153 104 140 C120 127 127 106 126 75 C128 40 114 16 83 16 Z';

  return (
    <svg viewBox="0 0 440 260" className="newspaper-woodcut__svg" role="img"
      aria-label="Гравюра: человеческий облик двойника слева, обычные зубы и скрытая вторая челюсть справа">
      <defs>
        <pattern id={`${id}-hatch`} width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <path d="M0 0 V5" stroke={MID} strokeWidth="0.8" />
        </pattern>
        <clipPath id={`${id}-face`}><path d={head} /></clipPath>
      </defs>

      <rect width="440" height="260" fill={PAPER} />
      <rect x="4" y="4" width="432" height="252" fill="none" stroke={INK} strokeWidth="2" />
      <rect x="8" y="8" width="424" height="244" fill="none" stroke={MID} strokeWidth="0.8" />
      <g stroke={INK} fill="none">
        <path d="M20 35 H420 M20 226 H420" strokeWidth="1.3" />
        <path d="M202 45 V215" strokeWidth="0.8" strokeDasharray="3 4" />
      </g>
      <text x="220" y="26" textAnchor="middle" fill={INK} fontFamily="Georgia, serif" fontSize="14" fontWeight="700" letterSpacing="2">
        DOPPELGANGER · V
      </text>

      {/* I. Human mask */}
      <g transform="translate(18 43)">
        <ellipse cx="83" cy="88" rx="72" ry="80" fill={`url(#${id}-hatch)`} opacity="0.16" />
        <path d="M10 177 C18 155 38 151 59 145 L83 161 L106 145 C127 151 148 157 157 177 Z" fill={DARK} stroke={INK} strokeWidth="1.5" />
        <path d="M19 173 L50 154 M30 174 L59 155 M137 173 L110 155 M147 174 L116 154" stroke={PAPER_LIGHT} strokeWidth="1" />
        <path d="M64 132 L61 153 L83 168 L105 153 L102 132 Z" fill="#cfc0a0" stroke={INK} strokeWidth="1.4" />
        <path d="M61 151 L83 163 L70 178 L48 157 Z M105 151 L83 163 L97 178 L119 157 Z" fill={PAPER_LIGHT} stroke={INK} strokeWidth="1.4" />
        <path d="M79 165 L87 165 L90 179 H76 Z" fill={INK} />
        <path d="M41 73 C28 67 26 79 31 95 Q35 108 43 102 Z M125 73 C138 67 141 79 136 95 Q132 108 124 102 Z" fill="#d8c8a4" stroke={INK} strokeWidth="1.4" />
        <path d="M35 79 Q29 83 37 97 M131 79 Q138 83 129 97" fill="none" stroke={MID} strokeWidth="1" />
        <path d={head} fill="#e3d3b1" stroke={INK} strokeWidth="1.8" />
        <g clipPath={`url(#${id}-face)`}>
          <path d="M109 45 Q130 82 112 121 L97 141 L117 140 L136 71 Z" fill={`url(#${id}-hatch)`} opacity="0.5" />
          <path d="M44 82 Q44 108 61 132 Q48 111 54 92 Z" fill="#b7a37e" />
          <path d="M56 111 L67 121 M54 117 L64 127 M53 124 L61 132" fill="none" stroke={MID} strokeWidth="0.8" />
        </g>

        {/* Hair: side part with a 1940s wave */}
        <path d="M39 70 C34 31 51 10 82 10 C112 5 135 27 128 68 L119 49 C103 40 85 43 72 51 Q53 48 44 70 Z" fill={INK} stroke={INK} strokeWidth="1.5" />
        <g fill="none" stroke={PAPER_LIGHT} strokeWidth="0.9" strokeLinecap="round">
          <path d="M48 48 Q54 26 76 20 M53 44 Q60 26 82 18 M62 42 Q77 25 102 25 M74 40 Q94 29 116 38 M87 40 Q107 33 124 48" />
          <path d="M72 48 Q73 34 84 15" strokeWidth="1.3" />
        </g>
        <path d="M48 66 Q61 61 73 66 M94 66 Q105 60 118 66" fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
        {[61, 105].map((cx) => (
          <g key={cx}>
            <path d={`M${cx - 12} 77 Q${cx} 68 ${cx + 12} 77 Q${cx} 84 ${cx - 12} 77 Z`} fill={CREAM} stroke={INK} strokeWidth="1.25" />
            <circle cx={cx} cy="76.5" r="3.8" fill="#9a8a6c" stroke={INK} strokeWidth="0.8" />
            <circle cx={cx} cy="76.5" r="1.7" fill={INK} />
            <path d={`M${cx - 11} 85 Q${cx} 89 ${cx + 9} 85`} fill="none" stroke={MID} strokeWidth="0.7" />
          </g>
        ))}
        <path d="M81 80 Q80 96 74 106 Q79 112 84 110 Q92 112 96 106 M78 108 L80 108 M88 108 L91 108" fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M69 124 Q76 119 83 122 Q90 119 98 124 Q83 127 69 124 Z" fill="#b59672" stroke="#5b4326" strokeWidth="0.9" />
        <path d="M70 125 Q83 134 97 125 M76 137 Q83 140 91 137" fill="none" stroke={MID} strokeWidth="0.9" />
      </g>

      {/* II. Dual jaws */}
      <g transform="translate(217 43)">
        <path d="M6 98 C36 42 168 42 198 98 C168 169 36 169 6 98 Z" fill="#cbb98f" stroke={INK} strokeWidth="2" />
        <path d="M16 98 C43 61 161 61 188 98 C161 145 43 145 16 98 Z" fill={DARK} />
        <path d="M27 77 Q102 53 177 77 L168 90 Q102 78 36 90 Z M29 124 Q102 141 175 124 L164 143 Q102 153 40 143 Z" fill="#8a7458" />

        {Array.from({ length: 8 }, (_, i) => {
          const x = 37 + i * 16.5;
          const y = 67 + Math.abs(i - 3.5) * 1.3;
          return <path key={`outer-upper-${i}`} d={`M${x} ${y} Q${x + 7} ${y - 3} ${x + 14} ${y} L${x + 13} ${y + 20} Q${x + 7} ${y + 24} ${x + 1} ${y + 20} Z`} fill={BONE} stroke={INK} strokeWidth="0.8" />;
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const x = 40 + i * 16;
          const y = 120 + Math.abs(i - 3.5) * 0.9;
          return <path key={`outer-lower-${i}`} d={`M${x} 139 L${x + 1} ${y + 3} Q${x + 7} ${y - 1} ${x + 13} ${y + 3} L${x + 14} 139 Z`} fill="#e6dcc2" stroke={INK} strokeWidth="0.8" />;
        })}

        <ellipse cx="102" cy="104" rx="45" ry="16" fill="#7d6a4e" stroke={PAPER_LIGHT} strokeWidth="1.1" />
        <ellipse cx="102" cy="104" rx="41" ry="12.5" fill={DARK} />
        {Array.from({ length: 9 }, (_, i) => {
          const x = 66 + i * 8;
          return <path key={`inner-upper-${i}`} d={`M${x} 94 L${x + 5} 94 L${x + 2.5} 105 Z`} fill={CREAM} stroke={INK} strokeWidth="0.55" />;
        })}
        {Array.from({ length: 8 }, (_, i) => {
          const x = 70 + i * 8;
          return <path key={`inner-lower-${i}`} d={`M${x} 115 L${x + 5} 115 L${x + 2.5} 104 Z`} fill={CREAM} stroke={INK} strokeWidth="0.55" />;
        })}
        <g fill="none" stroke={INK} strokeWidth="0.9">
          <path d="M92 69 L111 42 H180 M140 104 L166 163 H180" />
          <path d="M26 116 l-7 9 M33 124 l-6 9 M170 125 l6 9 M177 117 l8 9" />
        </g>
        <g fontFamily="Georgia, serif" fontSize="11" fill={INK} textAnchor="middle">
          <text x="188" y="46">1</text><text x="188" y="167">2</text>
        </g>
      </g>

      <g fontFamily="Georgia, serif" fontSize="12" fontWeight="700" fill={INK} textAnchor="middle" letterSpacing="0.5">
        <text x="101" y="242">I. ОБЛИК</text>
        <text x="320" y="242">II. ДВА РЯДА</text>
      </g>
    </svg>
  );
}
