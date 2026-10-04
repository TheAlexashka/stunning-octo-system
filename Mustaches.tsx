export function MobilizationWoodcut() {
  return (
    <svg viewBox="0 0 220 96" className="newspaper-woodcut__svg" aria-hidden="true">
      <rect width="220" height="96" fill="#c7b086" />
      <rect x="3" y="3" width="214" height="90" fill="none" stroke="#2a1e10" strokeWidth="1.6" />
      <path d="M0 73 Q54 64 108 72 T220 70 L220 96 L0 96 Z" fill="#2b1e12" />
      <path d="M5 81 Q55 74 108 81 T215 79 M4 89 Q54 83 111 90 T216 87" fill="none" stroke="#c7b086" strokeWidth="1" opacity=".55" />

      {/* A scale and ruler: an archival object, not an instruction panel. */}
      <path d="M105 18 L105 75 M86 75 H124" stroke="#2b1e12" strokeWidth="2.4" />
      <path d="M74 29 H136" stroke="#2b1e12" strokeWidth="2.1" />
      <path d="M75 30 L61 56 M135 30 L149 56" stroke="#2b1e12" strokeWidth="1.2" />
      <path d="M47 56 Q61 49 75 56 Q61 67 47 56 Z M135 56 Q149 49 163 56 Q149 67 135 56 Z" fill="#c7b086" stroke="#2b1e12" strokeWidth="1.2" />
      <path d="M55 57 Q61 61 68 57 M143 57 Q149 61 156 57" fill="none" stroke="#2b1e12" strokeWidth=".7" />
      <path d="M95 24 V16 M115 24 V16" stroke="#2b1e12" strokeWidth=".9" />
      <path d="M95 17 H115" stroke="#2b1e12" strokeWidth="1" />

      {/* Filed cards and a marching column in the distance. */}
      <path d="M15 21 L49 17 L53 46 L19 50 Z" fill="#c7b086" stroke="#2b1e12" strokeWidth="1.1" />
      <path d="M22 27 L45 24 M23 33 L46 30 M24 39 L39 37" stroke="#2b1e12" strokeWidth="1" opacity=".75" />
      {[174, 187, 200].map((x, i) => <g key={i} fill="#2b1e12"><circle cx={x} cy={52 - i * 2} r="3" /><path d={`M${x - 5} ${72 - i * 2} Q${x} ${57 - i * 2} ${x + 5} ${72 - i * 2} Z`} /><path d={`M${x - 2} ${68 - i * 2} L${x - 7} ${80 - i * 2} M${x + 2} ${68 - i * 2} L${x + 7} ${80 - i * 2}`} stroke="#2b1e12" strokeWidth="2" /></g>)}
      <path d="M170 38 V70" stroke="#2b1e12" strokeWidth="1.2" /><path d="M170 39 L205 47 L170 54 Z" fill="#c7b086" stroke="#2b1e12" strokeWidth="1" />
      <text x="17" y="15" fontFamily="Georgia, serif" fontSize="6.5" fill="#2b1e12">ARCHIV</text>
    </svg>
  );
}
