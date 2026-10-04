export function NixWoodcut() {
  return (
    <svg viewBox="0 0 220 96" className="newspaper-woodcut__svg" aria-hidden="true">
      <rect width="220" height="96" fill="#c7b086" />
      <rect x="3" y="3" width="214" height="90" fill="none" stroke="#2a1e10" strokeWidth="1.6" />
      <path d="M0 60 Q60 52 110 60 T220 58 L220 96 L0 96 Z" fill="#2b1e12" />
      <path d="M8 66 Q60 60 112 66 T216 64 M12 76 Q70 70 128 76 T214 74" stroke="#c7b086" strokeWidth="1" fill="none" opacity=".5" />
      {[26, 34, 42].map((x, i) => <path key={i} d={`M${x} 62 C${x - 3} 40 ${x + 2} 26 ${x + (i - 1) * 4} 14`} stroke="#2b1e12" strokeWidth="2.2" fill="none" />)}
      {[26, 34, 42].map((x, i) => <path key={`t${i}`} d={`M${x + (i - 1) * 4} 14 q6 3 4 9 q-5 2 -7 -3`} fill="#2b1e12" />)}
      {[64, 72, 80].map((x, i) => <path key={`r${i}`} d={`M${x} 62 C${x + 2} 46 ${x - 2} 36 ${x + 1} 26`} stroke="#2b1e12" strokeWidth="1.6" fill="none" />)}
      <g fill="#f2eee2" stroke="#2b1e12" strokeWidth="0.8">
        {[[120, 40, 4], [140, 30, 3], [160, 44, 5], [182, 34, 3], [200, 46, 4]].map(([x, y, r], i) => (
          <g key={`d${i}`}>
            <path d={`M${x} ${y - r * 2.4} Q${x - r * 1.4} ${y - r * 0.2} ${x - r} ${y + r} Q${x} ${y + r * 2} ${x + r} ${y + r} Q${x + r * 1.4} ${y - r * 0.2} ${x} ${y - r * 2.4} Z`} />
            <path d={`M${x - r * 0.4} ${y - r * 0.4} l-0.5 ${r}`} stroke="#c7b086" strokeWidth="0.8" />
          </g>
        ))}
      </g>
      <path d="M96 74 q10 -4 20 0 M128 80 q12 -4 24 0 M164 74 q10 -4 20 0" stroke="#c7b086" strokeWidth="0.9" fill="none" opacity=".6" />
      <text x="96" y="20" fontFamily="Georgia, serif" fontSize="8" fill="#2b1e12">NIXEN</text>
    </svg>
  );
}
