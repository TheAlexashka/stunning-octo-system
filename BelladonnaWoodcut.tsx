import { useId, type CSSProperties } from 'react';

/** Plain vector game art: paths, gradients and text only. No bitmap or image data. */
export function BelladonnaBottle({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const uid = `belladonna-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const body = 'M62 78 L98 78 L98 96 C98 105 123 104 123 124 L123 215 Q123 227 111 228 L49 228 Q37 227 37 215 L37 124 C37 104 62 105 62 96 Z';
  return <svg viewBox="0 0 160 244" className={className} style={style} role="img"
    aria-label="Флакон Belladonna Augentropfen — векторный рисунок" data-belladonna-art="svg">
    <defs>
      <linearGradient id={`${uid}-glass`} x1="0" x2="1">
        <stop offset="0" stopColor="#382211" /><stop offset=".22" stopColor="#98602a" />
        <stop offset=".46" stopColor="#704318" /><stop offset=".72" stopColor="#b77932" /><stop offset="1" stopColor="#3c2410" />
      </linearGradient>
      <linearGradient id={`${uid}-rubber`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#59503e" /><stop offset=".5" stopColor="#302a21" /><stop offset="1" stopColor="#16140f" />
      </linearGradient>
      <linearGradient id={`${uid}-paper`} x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#ddc99e" /><stop offset="1" stopColor="#b5996b" />
      </linearGradient>
      <clipPath id={`${uid}-body`}><path d={body} /></clipPath>
    </defs>
    <ellipse cx="80" cy="232" rx="49" ry="5" fill="#100c09" opacity=".55" />
    <path d={body} fill={`url(#${uid}-glass)`} stroke="#1a120b" strokeWidth="2" strokeLinejoin="round" />
    <g clipPath={`url(#${uid}-body)`}>
      <path d="M49 107 Q60 101 66 87 L72 90 Q65 107 61 120 L60 213 Q58 222 47 219 Z" fill="#f3d29a" opacity=".18" />
      <path d="M113 119 L111 215 Q109 222 97 222 L119 224 L125 117 Z" fill="#1c120a" opacity=".35" />
      {Array.from({ length: 13 }, (_, i) => <path key={i} d={`M${42 + i * 6} 110 Q${44 + i * 6} 125 ${43 + i * 6} 216`}
        fill="none" stroke={i % 3 ? '#1e140b' : '#dca253'} strokeWidth=".45" opacity=".25" />)}
      <path d="M37 210 Q80 216 123 210 L123 224 Q80 231 37 223 Z" fill="#170f09" opacity=".4" />
    </g>
    <path d="M62 81 Q80 85 98 81 M61 91 Q80 95 99 91" fill="none" stroke="#c18b43" strokeWidth="1.2" opacity=".65" />
    <path d="M49 59 L111 59 L111 79 Q80 85 49 79 Z" fill={`url(#${uid}-rubber)`} stroke="#17120d" strokeWidth="2" />
    {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M${53 + i * 4} 62 V78`} stroke={i % 2 ? '#18140f' : '#7d6a49'} strokeWidth="1" opacity=".65" />)}
    <ellipse cx="80" cy="59" rx="31" ry="5" fill="#4c4030" stroke="#1b160e" strokeWidth="1.5" />
    <path d="M64 58 L64 31 C64 7 96 7 96 31 L96 58 Q80 63 64 58 Z" fill={`url(#${uid}-rubber)`} stroke="#1b170f" strokeWidth="1.5" />
    <path d="M70 32 Q70 17 80 18" fill="none" stroke="#9b8660" strokeWidth="1.1" opacity=".45" />
    <path d="M42 133 Q80 138 118 133 L118 201 Q80 207 42 201 Z" fill={`url(#${uid}-paper)`} stroke="#70512c" strokeWidth="1" />
    <path d="M47 139 Q80 143 113 139 L113 196 Q80 201 47 196 Z" fill="none" stroke="#6b4b28" strokeWidth=".8" />
    <text x="80" y="158" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="12.5" fill="#352415">Belladonna</text>
    <text x="80" y="172" textAnchor="middle" fontFamily="Georgia, 'Times New Roman', serif" fontSize="8.4" fill="#49321c">Augentropfen</text>
    <g fill="#766142" stroke="#493c26" strokeWidth=".6">
      <path d="M80 190 Q67 176 61 183 Q63 191 76 190 Z" /><path d="M80 190 Q91 176 99 181 Q97 189 84 191 Z" />
      <path d="M80 192 Q71 181 75 177 Q82 179 83 190 Z" />
    </g>
    <path d="M71 183 L80 193 L95 183 M80 193 V196" fill="none" stroke="#493c26" strokeWidth=".7" />
    <path d="M44 222 Q80 228 115 221" fill="none" stroke="#cb924d" strokeWidth="1" opacity=".65" />
  </svg>;
}
