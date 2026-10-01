import { useId } from 'react';

// Sepia newspaper engraving, in the same palette as the night 3 and 4 cuts.
const INK = '#2c1e10';
const DARK = '#342517';
const MID = '#6b5135';
const PAPER = '#c8b18a';
const PAPER_LIGHT = '#d2bd96';
const CREAM = '#f0e4c8';

export function FlashlightWoodcut() {
  const id = `light-plate-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <svg viewBox="0 0 440 256" className="newspaper-woodcut__svg" role="img"
      aria-label="Гравюра: фонарик освещает два глаза. Обычный зрачок сужается, зрачок двойника не меняется">
      <defs>
        <pattern id={`${id}-hatch`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <path d="M0 0 V6" stroke={MID} strokeWidth="0.8" />
        </pattern>
      </defs>

      <rect width="440" height="256" fill={PAPER} />
      <rect x="4" y="4" width="432" height="248" fill="none" stroke={INK} strokeWidth="2" />
      <rect x="8" y="8" width="424" height="240" fill="none" stroke={MID} strokeWidth="0.8" />
      <text x="220" y="26" fontFamily="Georgia, serif" fontSize="14" fontWeight="700" letterSpacing="2" textAnchor="middle" fill={INK}>
        ПРОБА СВЕТОМ · VI
      </text>
      <path d="M20 35 H420" fill="none" stroke={INK} strokeWidth="1.3" />

      {/* Light beams */}
      <path d="M98 116 L284 47 L284 108 Z M98 132 L284 148 L284 208 Z" fill={`url(#${id}-hatch)`} opacity="0.3" />
      <g fill="none" stroke={MID} strokeWidth="1">
        <path d="M98 116 L274 54 M98 116 L274 105 M98 132 L274 151 M98 132 L274 203" />
        <path d="M102 123 L273 79 M102 125 L273 177" strokeDasharray="4 4" />
      </g>

      {/* Torch */}
      <g transform="translate(21 106)">
        <rect x="0" y="5" width="49" height="28" rx="3" fill="#4a3f31" stroke={INK} strokeWidth="1.8" />
        <path d="M49 5 L67 0 L77 3 V35 L67 39 L49 33 Z" fill="#a8926e" stroke={INK} strokeWidth="1.8" />
        <ellipse cx="76" cy="19" rx="5" ry="15" fill={CREAM} stroke={INK} strokeWidth="1.5" />
        <rect x="19" y="1" width="13" height="5" rx="1" fill={INK} />
        <g stroke={PAPER_LIGHT} strokeWidth="0.9">
          {[9, 15, 21, 27, 33, 39].map((x) => <path key={x} d={`M${x} 9 V29`} />)}
        </g>
        <path d="M51 10 L66 5 M51 17 H68 M51 24 L66 29" fill="none" stroke={MID} strokeWidth="0.9" />
      </g>

      {[{ y: 79, radius: 7, label: 'РЕАКЦИЯ ЕСТЬ' }, { y: 178, radius: 18, label: 'РЕАКЦИИ НЕТ' }].map(({ y, radius, label }) => (
        <g key={y}>
          <path d={`M255 ${y} C282 ${y - 35} 365 ${y - 35} 400 ${y} C365 ${y + 31} 282 ${y + 31} 255 ${y} Z`} fill="#e2d3b3" stroke={INK} strokeWidth="1.8" />
          <path d={`M257 ${y - 9} Q323 ${y - 45} 397 ${y - 9}`} fill="none" stroke={MID} strokeWidth="0.9" />
          <circle cx="326" cy={y} r="25" fill="#c0ac85" stroke={INK} strokeWidth="1.1" />
          {Array.from({ length: 20 }, (_, i) => {
            const a = i * Math.PI / 10;
            return <path key={i} d={`M${326 + Math.cos(a) * 19} ${y + Math.sin(a) * 19} L${326 + Math.cos(a) * 24} ${y + Math.sin(a) * 24}`} stroke={MID} strokeWidth="0.9" />;
          })}
          <circle cx="326" cy={y} r={radius} fill={DARK} />
          <circle cx="320" cy={y - 8} r="3" fill={CREAM} />
          <text x="326" y={y + 42} fill={INK} fontFamily="Georgia, serif" fontSize="11" fontWeight="700" textAnchor="middle" letterSpacing="0.6">
            {label}
          </text>
        </g>
      ))}

      <g fill={INK} fontFamily="Georgia, serif" textAnchor="middle" fontSize="10">
        <text x="85" y="181">ДОСМОТРОВЫЙ</text>
        <text x="85" y="195">ФОНАРИК</text>
      </g>
      <path d="M20 233 H420" fill="none" stroke={INK} strokeWidth="0.9" />
      <text x="220" y="246" fontFamily="Georgia, serif" fontSize="9" textAnchor="middle" fill="#5b4326">Сравните зрачок до и после освещения</text>
    </svg>
  );
}
