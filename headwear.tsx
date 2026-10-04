import { useId, type ReactNode } from 'react';
import { isRebuiltFemaleHairStyle, WomensHairBack, WomensHairFront } from './WomensHair';
import { isLindenHair, isLindenFemalePosterHair, LINDEN_FEMALE_POSTER_HAIRSTYLES, LINDEN_FEMALE_POSTER_LABELS, LINDEN_HAIR_LABELS, LINDEN_MALE_HAIRSTYLES } from '../features/linden/catalog';
import { LindenHair, LindenPosterWomenHair } from '../features/linden/LindenArt';
import { isLindenFemaleHair, LINDEN_FEMALE_HAIRSTYLES, LINDEN_WOMENS_HAIR_LABELS } from '../features/lindenWomen/catalog';
import { LindenWomenHair } from '../features/lindenWomen/LindenWomenHair';

// Hair only. Headwear has its own type, catalogue and independent SVG layers.
export const MALE_HAIRSTYLES = [
  'highSlickBack', 'hatShort', 'diagonalWave', 'flatPartReceding', 'standingWave',
  'fallingLock', 'fallenLock', 'curlyTop', 'highPartStubble', 'longFringeStubble',
  ...LINDEN_MALE_HAIRSTYLES,
] as const;


// Requested removals are permanent. Gallery numbering follows this active list.
export const FEMALE_HAIRSTYLES = [
  'sculptedCurls', 'rolledFringe', 'napeChignon', 'crownBun', 'braidedCrown',
  'milkmaidBraids', 'twinBraids', 'halfUp', 'sideSweep', 'shortSculpted',
  ...LINDEN_FEMALE_HAIRSTYLES,
  ...LINDEN_FEMALE_POSTER_HAIRSTYLES,
] as const;

export type MaleHairStyle = (typeof MALE_HAIRSTYLES)[number];
export type FemaleHairStyle = (typeof FEMALE_HAIRSTYLES)[number];
export type HairStyle = MaleHairStyle | FemaleHairStyle;

export const HAIRSTYLE_LABELS: Record<HairStyle, string> = {
  ...LINDEN_HAIR_LABELS,
  ...LINDEN_FEMALE_POSTER_LABELS,
  ...LINDEN_WOMENS_HAIR_LABELS,
  highSlickBack: 'Высокий зачёс назад',
  hatShort: 'Короткая стрижка',
  diagonalWave: 'Косой зачёс с волной',
  flatPartReceding: 'Плоский пробор, стерня до макушки',
  standingWave: 'Стоячая волна надо лбом',
  fallingLock: 'Пробор с падающей прядью',
  fallenLock: 'Пробор с упавшей прядью',
  curlyTop: 'Кудрявый верх с завитком',
  highPartStubble: 'Высокий пробор со стернёй',
  longFringeStubble: 'Длинная чёлка',
  sculptedCurls: 'Уложенные локоны',
  rolledFringe: 'Валик у линии лба',
  napeChignon: 'Низкий шиньон',
  crownBun: 'Высокий пучок',
  braidedCrown: 'Коса через макушку',
  milkmaidBraids: 'Косы вокруг головы',
  twinBraids: 'Две косы с лентами',
  halfUp: 'Полусобранные волны',
  sideSweep: 'Боковая укладка',
  shortSculpted: 'Короткая фигурная укладка',
};

export type HairPaint = {
  gradient: string;
  base: string;
  dark: string;
  shine: string;
  stubble: string;
  headClip: string;
};

type Point = [number, number];
type Bezier = [Point, Point, Point, Point];
type Hairline = 'side' | 'center' | 'swept' | 'pulled' | 'fringe' | 'receding';

function Mirror({ children }: { children: ReactNode }) {
  return <g transform="matrix(-1 0 0 1 200 0)">{children}</g>;
}

function Pair({ children }: { children: ReactNode }) {
  return <>{children}<Mirror>{children}</Mirror></>;
}

// Every stroke is a small shaded ridge, rather than a line drawn on a flat cap.
function Strands({ p, paths, weight = 1 }: { p: HairPaint; paths: string[]; weight?: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} stroke={p.dark} strokeWidth={weight * 2.5} opacity="0.39" transform="translate(0 1.2)" />
          <path d={d} stroke={p.shine} strokeWidth={weight * (i % 2 ? 0.85 : 1.2)} opacity={i % 2 ? 0.33 : 0.54} />
        </g>
      ))}
    </g>
  );
}

// A narrow crown with its root at the real hairline. The forehead remains
// visible; the volume grows *away* from the scalp, not down toward the brows.
function Crown({ p, top = 23, side = 42, line = 'side' }: {
  p: HairPaint; top?: number; side?: number; line?: Hairline;
}) {
  const inner: Record<Hairline, string> = {
    side: 'L151 77 C140 62 115 54 91 55 C72 55 59 65 49 78',
    center: 'L151 77 C136 62 115 54 100 52 C85 54 64 62 49 77',
    swept: 'L151 77 C137 61 110 54 88 56 C70 59 59 68 49 78',
    pulled: 'L151 77 C138 61 118 57 100 56 C82 57 62 61 49 77',
    fringe: 'L151 79 C137 70 118 65 100 66 C82 65 63 70 49 79',
    receding: 'L151 78 C141 68 133 62 123 62 Q111 66 100 66 Q89 66 77 62 C67 62 59 68 49 78',
  };
  // Distinct outer contours avoid a repeated symmetrical helmet on every face.
  const outer: Record<Hairline, string> = {
    side: `C${side - 9} 51 57 ${top + 11} 88 ${top + 5} C110 ${top - 7} 144 ${top + 11} ${200 - side} 78`,
    center: `C${side - 6} 55 66 ${top + 2} 100 ${top} C134 ${top + 2} ${206 - side} 55 ${200 - side} 78`,
    swept: `C${side - 9} 60 63 ${top + 10} 105 ${top} C133 ${top - 4} ${205 - side} 52 ${200 - side} 78`,
    pulled: `C${side - 3} 57 72 ${top + 6} 100 ${top} C128 ${top + 6} ${203 - side} 57 ${200 - side} 78`,
    fringe: `C${side - 8} 55 68 ${top - 3} 100 ${top + 2} C132 ${top - 3} ${208 - side} 55 ${200 - side} 78`,
    receding: `C${side - 6} 57 69 ${top + 6} 100 ${top} C131 ${top + 6} ${206 - side} 57 ${200 - side} 78`,
  };
  const shape = `M${side} 78 ${outer[line]} ${inner[line]} Z`;
  return (
    <g>
      <path d={shape} fill={p.gradient} stroke={p.dark} strokeWidth="0.9" />
      <path d="M52 69 Q68 38 100 34 Q132 38 148 69" fill="none" stroke={p.shine} strokeWidth="0.8" opacity="0.17" />
    </g>
  );
}

function BackShell({ p, top = 22, side = 40, bottom = 122 }: {
  p: HairPaint; top?: number; side?: number; bottom?: number;
}) {
  // No second dark dome behind the crown: only side and nape hair peeks out.
  const start = Math.max(48, top + 19);
  const sidePath = `M51 ${start} C${side - 7} ${start + 13} ${side - 7} 87 ${side} 105 Q${side - 3} ${bottom - 2} ${side + 9} ${bottom + 2} L68 ${bottom - 4} Q55 97 60 ${start + 9} Z`;
  return <Pair><path d={sidePath} fill={p.dark} stroke={p.base} strokeOpacity="0.3" strokeWidth="0.8" /></Pair>;
}

// A sculpted lock has a pinched root and a soft, asymmetric curled tip.
function Curl({ p, x, y, r, flip = false }: { p: HairPaint; x: number; y: number; r: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${flip ? -1 : 1} 1)`}>
      <path d={`M${-r} 1 C${-r * 1.08} ${-r * 0.57} ${-r * 0.32} ${-r * 1.06} ${r * 0.35} ${-r * 0.88} C${r * 1.13} ${-r * 0.74} ${r * 1.18} ${-r * 0.08} ${r * 0.75} ${r * 0.46} C${r * 0.22} ${r * 1.05} ${-r * 0.51} ${r * 0.97} ${-r} 1 Z`} fill={p.dark} />
      <path d={`M${-r + 2} 0 C${-r} ${-r * 0.57} ${-r * 0.29} ${-r} ${r * 0.31} ${-r * 0.82} C${r * 0.93} ${-r * 0.66} ${r * 1.03} ${-r * 0.1} ${r * 0.66} ${r * 0.38} C${r * 0.08} ${r * 0.89} ${-r * 0.49} ${r * 0.82} ${-r + 2} 0 Z`} fill={p.gradient} />
      <path d={`M${-r * 0.66} ${-r * 0.2} C${-r * 0.43} ${-r * 0.86} ${r * 0.34} ${-r * 0.94} ${r * 0.68} ${-r * 0.46}`} fill="none" stroke={p.shine} strokeWidth="1.7" opacity="0.58" strokeLinecap="round" />
      <path d={`M${r * 0.37} ${r * 0.44} C${-r * 0.02} ${r * 0.73} ${-r * 0.39} ${r * 0.15} ${-r * 0.02} ${-r * 0.16} Q${r * 0.35} ${-r * 0.4} ${r * 0.34} ${-r * 0.04}`} fill="none" stroke={p.dark} strokeWidth="1.2" opacity="0.7" strokeLinecap="round" />
    </g>
  );
}

function CurlSet({ p, positions }: { p: HairPaint; positions: Array<[number, number, number]> }) {
  return <g>{positions.map(([x, y, r], i) => <Curl key={i} p={p} x={x} y={y} r={r} flip={i % 2 === 1} />)}</g>;
}

function bez(pts: Bezier, t: number): Point {
  const u = 1 - t;
  return [
    u ** 3 * pts[0][0] + 3 * u ** 2 * t * pts[1][0] + 3 * u * t ** 2 * pts[2][0] + t ** 3 * pts[3][0],
    u ** 3 * pts[0][1] + 3 * u ** 2 * t * pts[1][1] + 3 * u * t ** 2 * pts[2][1] + t ** 3 * pts[3][1],
  ];
}

function bezTan([a, b, c, d]: Bezier, t: number): Point {
  const u = 1 - t;
  return [
    3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (d[0] - c[0]),
    3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (d[1] - c[1]),
  ];
}

// A real three-strand plait: two wide lobes cross over each other per link,
// each lower link tucks under the one above it. Local +x runs along the braid.
function Braid({ p, pts, width = 13, segments = 12, ribbon = false }: {
  p: HairPaint; pts: Bezier; width?: number; segments?: number; ribbon?: boolean;
}) {
  const [a, b, c, d] = pts;
  const path = `M${a[0]} ${a[1]} C${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`;
  const samples = Array.from({ length: segments + 1 }, (_, i) => {
    const t = i / segments;
    const [x, y] = bez(pts, t);
    const [dx, dy] = bezTan(pts, t);
    const len = Math.hypot(dx, dy) || 1;
    return { x, y, ang: Math.atan2(dy, dx) * 180 / Math.PI, nx: -dy / len, ny: dx / len };
  });
  const wAt = (i: number) => width * (1 - 0.22 * i / segments);
  const rail = (side: 1 | -1) => samples.map((s, i) =>
    `${i ? 'L' : 'M'}${(s.x + s.nx * side * wAt(i) * 0.52).toFixed(1)} ${(s.y + s.ny * side * wAt(i) * 0.52).toFixed(1)}`
  ).join(' ');
  const links = [];
  for (let i = segments - 1; i >= 0; i--) {
    const s0 = samples[i], s1 = samples[i + 1];
    const mx = (s0.x + s1.x) / 2, my = (s0.y + s1.y) / 2;
    const ang = (s0.ang + s1.ang) / 2;
    const w = wAt(i);
    const along = Math.max(Math.hypot(s1.x - s0.x, s1.y - s0.y) * 0.82, w * 0.62);
    const leftOver = i % 2 === 0;
    const overY = leftOver ? -w * 0.2 : w * 0.2;
    const underY = -overY;
    links.push(
      <g key={i} transform={`translate(${mx.toFixed(1)} ${my.toFixed(1)}) rotate(${ang.toFixed(1)})`}>
        <ellipse cx="0" cy={underY} rx={along} ry={w * 0.36} fill={p.dark} opacity="0.94"
          transform={`rotate(${leftOver ? 24 : -24} 0 ${underY})`} />
        <ellipse cx="0" cy={overY} rx={along} ry={w * 0.37} fill={p.gradient} stroke={p.dark} strokeWidth="0.7"
          transform={`rotate(${leftOver ? -24 : 24} 0 ${overY})`} />
        <path d={`M${-along * 0.72} 0 Q0 ${overY * 0.5} ${along * 0.72} 0`} fill="none"
          stroke={p.dark} strokeWidth={w * 0.13} opacity="0.55" />
        <path d={`M${-along * 0.5} ${overY - w * 0.1} Q0 ${overY - w * 0.2} ${along * 0.5} ${overY - w * 0.1}`} fill="none"
          stroke={p.shine} strokeWidth="1" opacity="0.6" />
        <path d={`M${-along * 0.55} ${overY + w * 0.1} Q0 ${overY + w * 0.16} ${along * 0.55} ${overY + w * 0.1}`} fill="none"
          stroke={p.dark} strokeWidth="0.6" opacity="0.5" />
      </g>
    );
  }
  const end = samples[segments];
  return (
    <g>
      <path d={path} fill="none" stroke={p.dark} strokeWidth={width * 0.92} strokeLinecap="round" opacity="0.95" />
      {links}
      <path d={rail(1)} fill="none" stroke={p.dark} strokeWidth="0.8" opacity="0.6" />
      <path d={rail(-1)} fill="none" stroke={p.dark} strokeWidth="0.8" opacity="0.6" />
      <ellipse cx={samples[0].x} cy={samples[0].y} rx={width * 0.34} ry={width * 0.55} fill={p.dark}
        transform={`rotate(${samples[0].ang} ${samples[0].x} ${samples[0].y})`} />
      <g transform={`translate(${end.x.toFixed(1)} ${end.y.toFixed(1)}) rotate(${end.ang.toFixed(1)})`}>
        <rect x="-3.6" y={-width * 0.44} width="7.2" height={width * 0.88} rx="2.2" fill="#6e2a24" stroke="#3a1414" strokeWidth="0.7" />
        {ribbon ? (
          <g>
            <path d="M3.4 0 L13 -8.5 L11.5 2.5 Z" fill="#7d2927" stroke="#431415" strokeWidth="0.7" />
            <path d="M3.4 0 L13 8.5 L11.5 -2.5 Z" fill="#9c4033" stroke="#431415" strokeWidth="0.7" />
            <path d="M4 3.5 L14 9 M4 -3.5 L14 -9" stroke="#431415" strokeWidth="0.6" opacity="0.7" />
            <circle cx="3.4" cy="0" r="2.7" fill="#a84743" stroke="#431415" strokeWidth="0.7" />
          </g>
        ) : (
          <g fill="none" strokeLinecap="round">
            <path d={`M3.4 -2.6 L${3.4 + width * 0.62} -4.4 M3.4 0 L${3.4 + width * 0.78} 0.4 M3.4 2.6 L${3.4 + width * 0.62} 4.4`} stroke={p.dark} strokeWidth="1.7" />
            <path d={`M3.4 -2.6 L${3.4 + width * 0.62} -4.4 M3.4 0 L${3.4 + width * 0.78} 0.4 M3.4 2.6 L${3.4 + width * 0.62} 4.4`} stroke={p.base} strokeWidth="0.7" opacity="0.85" />
          </g>
        )}
      </g>
    </g>
  );
}

// Separate deterministic little ink strokes, clipped to the individual head.
function TempleStubble({ p, density = 34, bottom = 142 }: { p: HairPaint; density?: number; bottom?: number }) {
  const top = 110;
  const make = (left: boolean) => {
    let seed = left ? 117 : 911;
    return Array.from({ length: density }, (_, i) => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const a = seed / 4294967296;
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const b = seed / 4294967296;
      const x = left ? 49 + a * 12 : 139 + a * 12;
      const y = top + b * (bottom - top);
      return `M${x.toFixed(1)} ${y.toFixed(1)} l${left ? 1.1 : -1.1} ${1.5 + i % 3 * 0.65}`;
    }).join(' ');
  };
  return (
    <g clipPath={p.headClip}>
      <path d={`M48 ${top} h14 v${bottom - top} H48 Z M138 ${top} h14 v${bottom - top} h-14 Z`} fill={p.stubble} opacity="0.37" />
      <path d={make(true)} stroke={p.dark} strokeWidth="0.72" strokeLinecap="round" fill="none" opacity="0.77" />
      <path d={make(false)} stroke={p.dark} strokeWidth="0.72" strokeLinecap="round" fill="none" opacity="0.77" />
    </g>
  );
}

// Cropped scalp sides reach the crown. The small forelock is rendered on top,
// while both the individual head outline and this scalp mask exclude the face.
function ScalpStubble({ p, bottom = 144, trimLowerHalf = false }: {
  p: HairPaint; bottom?: number; trimLowerHalf?: boolean;
}) {
  const id = `cropped-scalp-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const visibleBottom = trimLowerHalf ? Math.round((36 + bottom) / 2) : bottom;
  const zone = `M44 30 H156 V${bottom} H138 L137 103 C141 78 131 58 111 52 Q100 47 89 52 C69 58 59 78 63 103 L62 ${bottom} H44 Z`;
  const rows = Math.max(10, Math.floor((bottom - 8 - 35) / 4.35));
  const strokes = Array.from({ length: 22 * rows }, (_, i) => {
    const col = i % 22;
    const row = Math.floor(i / 22);
    const x = 46 + col * 5 + ((i * 17) % 7) * 0.17;
    const y = 35 + row * 4.35 + ((i * 11) % 5) * 0.2;
    const direction = x < 100 ? 0.65 : -0.65;
    return `M${x.toFixed(2)} ${y.toFixed(2)} l${direction} ${(1.25 + i % 4 * 0.3).toFixed(2)}`;
  }).join(' ');

  return (
    <g clipPath={p.headClip}>
      <defs>
        <clipPath id={id}><path d={zone} /></clipPath>
        <clipPath id={`${id}-trim`}><rect width="200" height={visibleBottom} /></clipPath>
      </defs>
      <g clipPath={`url(#${id}-trim)`} data-stubble-bottom={visibleBottom}>
        <g clipPath={`url(#${id})`}>
          <path d={zone} fill={p.stubble} opacity="0.36" />
          <path d={strokes} fill="none" stroke={p.dark} strokeWidth="0.6" strokeLinecap="round" opacity="0.65" />
          <path d={strokes} fill="none" stroke={p.shine} strokeWidth="0.4" strokeLinecap="round" opacity="0.18" transform="translate(-0.45 -0.4)" />
        </g>
      </g>
    </g>
  );
}

function Sideburns({ p, long = false }: { p: HairPaint; long?: boolean }) {
  // Long sideburns reach toward the jaw (y≈146); short ones end below the ear top.
  return <Pair><path d={`M49 86 C46 94 48 ${long ? 138 : 112} 51 ${long ? 146 : 118} L58 ${long ? 138 : 114} L59 87 Z`} fill={p.dark} /></Pair>;
}

const CURLS_SCULPTED: Array<[number, number, number]> = [
  [54, 64, 12], [71, 43, 14], [91, 36, 13], [112, 35, 14], [133, 45, 13], [148, 66, 12],
  [46, 86, 10], [153, 84, 10], [64, 61, 10], [98, 53, 10], [129, 62, 10],
];

/* ------------------------------ the two layers ------------------------------ */

export function HairBack({ style, paint: p }: { style: HairStyle; paint: HairPaint }) {
  if (isLindenFemaleHair(style)) return <LindenWomenHair style={style} layer="back" color={p.base} />;
  if (isLindenFemalePosterHair(style)) return <LindenPosterWomenHair style={style} layer="back" color={p.base} />;
  if (isLindenHair(style)) return <LindenHair style={style} layer="back" color={p.base} />;
  if (isRebuiltFemaleHairStyle(style)) return <WomensHairBack style={style} paint={p} />;

  switch (style) {
    case 'highSlickBack': return <BackShell p={p} top={17} side={41} bottom={104} />;
    case 'hatShort': return <BackShell p={p} top={31} side={47} bottom={104} />;
    case 'diagonalWave': return <BackShell p={p} top={21} side={42} />;
    case 'flatPartReceding': return <g />;
    case 'standingWave': return <BackShell p={p} top={23} side={41} />;
    case 'fallingLock': return <BackShell p={p} top={23} side={43} />;
    case 'fallenLock': return <BackShell p={p} top={25} side={43} />;
    case 'curlyTop': return <g><BackShell p={p} top={21} side={39} /><CurlSet p={p} positions={[[43, 51, 11], [59, 30, 11], [80, 22, 11], [104, 20, 11], [129, 25, 11], [151, 42, 11], [157, 73, 10], [41, 73, 10]]} /></g>;
    case 'highPartStubble': return <g />;
    case 'longFringeStubble': return <BackShell p={p} top={25} side={43} />;
    case 'sculptedCurls': return <g><BackShell p={p} top={17} side={37} bottom={149} /><CurlSet p={p} positions={[[37, 78, 12], [39, 101, 12], [45, 125, 12], [160, 79, 12], [162, 104, 12], [153, 128, 12]]} /></g>;
    case 'braidedCrown': return <BackShell p={p} top={24} side={40} bottom={134} />;
    case 'milkmaidBraids': return <BackShell p={p} top={24} side={40} bottom={132} />;
    case 'twinBraids': return <g><BackShell p={p} top={25} side={41} /><Braid p={p} pts={[[47, 110], [31, 147], [48, 184], [41, 211]]} ribbon /><Mirror><Braid p={p} pts={[[47, 110], [31, 147], [48, 184], [41, 211]]} ribbon /></Mirror></g>;
    case 'shortSculpted': return <BackShell p={p} top={24} side={43} bottom={131} />;
  }
}

export function HairFront({ style, paint: p }: { style: HairStyle; paint: HairPaint }) {
  if (isLindenFemaleHair(style)) return <LindenWomenHair style={style} layer="front" color={p.base} />;
  if (isLindenFemalePosterHair(style)) return <LindenPosterWomenHair style={style} layer="front" color={p.base} />;
  if (isLindenHair(style)) return <LindenHair style={style} layer="front" color={p.base} />;
  if (isRebuiltFemaleHairStyle(style)) return <WomensHairFront style={style} paint={p} />;

  switch (style) {
    // 01: vertical, combed-back strands anchored at the hairline.
    case 'highSlickBack': return <g>
      <Crown p={p} top={16} side={41} line="pulled" />
      <Strands p={p} paths={['M56 73 C51 60 63 41 78 22', 'M66 70 C63 55 79 34 94 18', 'M80 64 C77 52 92 29 108 18', 'M99 54 C104 39 124 24 139 29', 'M145 72 C153 55 141 38 126 22']} />
    </g>;

    // 02: short combed hair, with no sideburns or cropped stubble.
    case 'hatShort': return <g>
      <Crown p={p} top={31} side={47} line="fringe" />
      <Strands p={p} paths={['M61 67 Q79 47 103 48 Q127 48 141 67', 'M65 57 Q85 41 111 44 Q132 48 138 57']} weight={0.75} />
    </g>;

    // 03: generous diagonal S-wave, with its root visible at the part.
    case 'diagonalWave': return <g>
      <TempleStubble p={p} density={21} />
      <Crown p={p} top={20} side={40} line="side" />
      <path d="M82 59 C105 38 131 39 151 66 Q123 54 101 65 Q82 70 60 78 Q72 64 82 59 Z" fill={p.base} opacity="0.8" />
      <Strands p={p} paths={['M85 56 C110 34 135 42 152 63', 'M80 65 C107 47 134 51 149 75', 'M57 80 C68 62 79 57 95 55']} />
      <path d="M79 60 Q78 46 88 30" fill="none" stroke={p.dark} strokeWidth="1.5" />
      <Sideburns p={p} />
    </g>;

    // 04: shaved sides extend to the crown; only the central parted lock is long.
    case 'flatPartReceding': return <g>
      <ScalpStubble p={p} bottom={130} trimLowerHalf />
      <path d="M73 58 C65 45 81 32 103 31 C126 31 143 43 140 56 L134 66 C123 59 111 55 98 59 Q83 62 73 58 Z" fill={p.gradient} stroke={p.dark} strokeWidth="0.8" />
      <path d="M83 54 Q80 44 91 34" fill="none" stroke={p.dark} strokeWidth="1.3" />
      <Strands p={p} paths={['M75 51 C88 39 117 37 136 53', 'M80 55 Q104 43 130 57', 'M84 45 Q109 34 130 46']} weight={0.75} />
    </g>;

    // 05: raised front wave, not a flat stripe across the forehead.
    case 'standingWave': return <g>
      <TempleStubble p={p} density={20} bottom={130} />
      <Crown p={p} top={24} side={41} line="pulled" />
      <path d="M60 77 C70 57 90 44 113 46 C132 48 145 60 146 73 C132 62 114 60 99 63 C80 65 68 71 60 77 Z" fill={p.dark} />
      <path d="M63 74 C74 57 91 48 112 49 C129 51 140 61 143 69 C127 59 112 61 99 64 C80 66 70 72 63 74 Z" fill={p.gradient} />
      <Strands p={p} paths={['M67 70 C78 55 96 47 111 49 Q132 50 141 66', 'M71 64 Q92 49 112 53 Q127 54 136 63']} weight={1.1} />
      <Sideburns p={p} />
    </g>;

    // 06: one soft, tapered lock reaches the upper forehead.
    case 'fallingLock': return <g>
      <TempleStubble p={p} density={21} />
      <Crown p={p} top={24} side={42} line="side" />
      <Strands p={p} paths={['M84 57 C103 43 132 43 148 67', 'M82 64 C104 53 131 53 146 76']} />
      <path d="M95 56 C84 60 79 68 77 85 C77 91 82 92 84 84 C85 72 91 64 100 58 Z" fill={p.dark} />
      <path d="M96 57 C85 61 82 72 80 85 Q84 79 87 70 Q93 62 100 59 Z" fill={p.gradient} />
      <Strands p={p} paths={['M96 58 Q84 67 81 84']} weight={0.8} />
      <Sideburns p={p} />
    </g>;

    // 07: a broader forelock bends toward the brow without hiding the eye.
    case 'fallenLock': return <g>
      <TempleStubble p={p} density={22} />
      <Crown p={p} top={22} side={40} line="swept" />
      <path d="M102 53 C88 57 78 68 75 89 C74 100 81 102 84 91 Q91 66 106 58 Z" fill={p.dark} />
      <path d="M101 55 C88 60 82 72 79 89 Q79 96 84 89 Q92 66 104 59 Z" fill={p.gradient} />
      <Strands p={p} paths={['M100 57 Q86 67 81 89', 'M64 78 C84 49 125 41 149 73', 'M65 86 Q104 51 147 83']} />
      <Sideburns p={p} />
    </g>;

    // 08: one glossy, sculpted curl over a textured top; no row of circles.
    case 'curlyTop': return <g>
      <Crown p={p} top={24} side={40} line="fringe" />
      <CurlSet p={p} positions={[[60, 48, 10], [82, 36, 11], [104, 34, 12], [126, 39, 11], [144, 53, 10], [74, 57, 8], [119, 58, 8]]} />
      <CurlSet p={p} positions={[[56, 68, 7], [72, 62, 7], [90, 59, 7], [108, 59, 7], [126, 62, 7], [142, 68, 7]]} />
      <Strands p={p} paths={['M59 74 Q82 60 100 63 Q127 60 143 74', 'M68 66 Q86 54 106 56']} weight={0.9} />
      <path d="M101 62 C111 56 120 60 119 68 Q118 75 110 73 Q104 73 107 79" fill="none" stroke={p.dark} strokeWidth="6.5" strokeLinecap="round" />
      <path d="M101 62 C111 56 120 60 119 68 Q118 75 110 73 Q104 73 107 79" fill="none" stroke={p.base} strokeWidth="4.2" strokeLinecap="round" />
      <path d="M102 61 Q111 58 116 62" fill="none" stroke={p.shine} strokeWidth="1.1" />
    </g>;

    // 09: high part with cropped stubble up to the crown; the long front lock stays intact.
    case 'highPartStubble': return <g>
      <ScalpStubble p={p} trimLowerHalf />
      <Crown p={p} top={29} side={45} line="receding" />
      <Strands p={p} paths={['M75 53 C91 41 122 42 143 62', 'M72 61 Q108 44 142 70']} />
      <path d="M76 54 L82 35" fill="none" stroke={p.dark} strokeWidth="1.5" />
    </g>;

    // 10: long crest over the forehead, closely clipped sides — no stubble.
    case 'longFringeStubble': return <g>
      <Crown p={p} top={23} side={42} line="swept" />
      <path d="M53 87 C69 57 100 41 128 51 C143 57 152 72 151 83 C129 67 106 59 85 65 Q65 71 53 87 Z" fill={p.dark} />
      <path d="M57 85 Q86 55 116 55 Q137 55 148 77 C127 65 106 60 86 67 Q70 73 57 85 Z" fill={p.gradient} />
      <Strands p={p} paths={['M57 82 Q88 53 117 54 Q138 56 148 78', 'M64 83 Q93 62 118 62 Q136 65 145 82']} />
    </g>;

    case 'sculptedCurls': return <g>
      <Crown p={p} top={19} side={38} line="side" />
      <CurlSet p={p} positions={CURLS_SCULPTED} />
      <Strands p={p} paths={['M53 84 Q68 62 85 63', 'M112 61 Q134 55 149 80']} weight={0.8} />
    </g>;

    case 'braidedCrown': return <g>
      <Crown p={p} top={25} side={41} line="center" />
      <path d="M100 50 L100 30" fill="none" stroke={p.dark} strokeWidth="1.2" />
      <Braid p={p} pts={[[50, 82], [46, 30], [154, 30], [150, 82]]} width={13} segments={20} />
      <path d="M50 84 Q46 94 50 102 M150 84 Q154 94 150 102" fill="none" stroke={p.dark} strokeWidth="2.4" opacity="0.8" />
    </g>;

    case 'milkmaidBraids': return <g>
      <Crown p={p} top={27} side={42} line="center" />
      <path d="M100 60 L100 34" fill="none" stroke={p.dark} strokeWidth="1.3" />
      <Braid p={p} pts={[[46, 78], [52, 34], [148, 34], [154, 78]]} width={12} segments={18} />
      <Braid p={p} pts={[[54, 66], [70, 30], [130, 30], [146, 66]]} width={10} segments={14} />
      <path d="M46 80 Q42 92 47 102 M154 80 Q158 92 153 102" fill="none" stroke={p.dark} strokeWidth="2.2" opacity="0.8" />
      <circle cx="52" cy="96" r="1.4" fill="#c7a168" />
      <circle cx="148" cy="96" r="1.4" fill="#c7a168" />
    </g>;

    case 'twinBraids': return <g>
      <Crown p={p} top={26} side={43} line="center" />
      <path d="M100 58 L100 28" fill="none" stroke={p.dark} strokeWidth="1.4" />
      <Strands p={p} paths={['M96 58 Q69 63 52 91', 'M104 58 Q131 63 148 91', 'M94 49 Q71 52 55 77', 'M106 49 Q129 52 145 77']} weight={0.9} />
      <path d="M47 92 Q43 102 47 112 M153 92 Q157 102 153 112" fill="none" stroke={p.dark} strokeWidth="3" opacity="0.8" />
      <path d="M47 92 Q43 102 47 112 M153 92 Q157 102 153 112" fill="none" stroke={p.base} strokeWidth="1.4" opacity="0.8" />
    </g>;

    case 'shortSculpted': return <g>
      <Crown p={p} top={25} side={43} line="swept" />
      <path d="M55 79 C71 55 98 43 123 50 Q141 56 147 77 Q116 59 90 63 Q67 68 55 79 Z" fill={p.dark} opacity="0.7" />
      <path d="M57 77 C73 55 99 45 122 52 Q138 58 144 75 Q114 60 90 64 Q69 69 57 77 Z" fill={p.gradient} />
      <Strands p={p} paths={['M55 76 Q84 43 118 47 Q139 51 146 71', 'M60 84 Q89 55 128 62', 'M66 72 Q92 50 120 55']} />
      <path d="M85 52 Q83 42 90 32" fill="none" stroke={p.dark} strokeWidth="1.3" />
      <path d="M50 90 Q43 105 51 117 M150 90 Q157 105 149 117" fill="none" stroke={p.dark} strokeWidth="2.4" opacity="0.9" />
      <path d="M50 90 Q43 105 51 117 M150 90 Q157 105 149 117" fill="none" stroke={p.base} strokeWidth="1" opacity="0.7" />
    </g>;
  }
}