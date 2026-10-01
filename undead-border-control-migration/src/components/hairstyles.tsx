import { useId, type ReactNode } from 'react';

// The first ten men's cuts follow the supplied 1930s/40s reference. Women's
// looks are distinct period silhouettes, including working headwear and hats.
export const MALE_HAIRSTYLES = [
  'highSlickBack', 'hatShort', 'diagonalWave', 'flatPartReceding', 'standingWave',
  'fallingLock', 'fallenLock', 'curlyTop', 'highPartStubble', 'longFringeStubble', 'baldingPart',
  'fedora', 'homburg', 'trilby', 'flatCap', 'workCap',
] as const;

export const FEMALE_HAIRSTYLES = [
  'sculptedCurls', 'softPerm', 'marcelWaves', 'sideWaves', 'shoulderWaves',
  'rolledFringe', 'turban', 'napeChignon', 'crownBun', 'frenchTwist',
  'braidedCrown', 'milkmaidBraids', 'twinBraids', 'halfUp', 'sideSweep',
  'shortSculpted', 'headscarf', 'snood', 'tiltHat', 'beret',
] as const;

export type MaleHairStyle = (typeof MALE_HAIRSTYLES)[number];
export type FemaleHairStyle = (typeof FEMALE_HAIRSTYLES)[number];
export type HairStyle = MaleHairStyle | FemaleHairStyle;

export const HAT_STYLES = ['fedora', 'homburg', 'trilby', 'flatCap', 'workCap'] as const;
export type HatStyle = (typeof HAT_STYLES)[number];
export const MALE_HEADWEAR_STYLES: readonly MaleHairStyle[] = HAT_STYLES;
export const FEMALE_HEADWEAR_STYLES: readonly FemaleHairStyle[] = ['headscarf', 'snood', 'tiltHat', 'beret', 'turban'];

export const HAIRSTYLE_LABELS: Record<HairStyle, string> = {
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
  baldingPart: 'Плоский пробор с залысинами',
  fedora: 'Фетровая федора',
  homburg: 'Хомбург',
  trilby: 'Трилби',
  flatCap: 'Кепка-восьмиклинка',
  workCap: 'Рабочая кепка',
  sculptedCurls: 'Уложенные локоны',
  softPerm: 'Мягкая завивка',
  marcelWaves: 'Марсельские волны',
  sideWaves: 'Волна с косым пробором',
  shoulderWaves: 'Волны до плеч',
  rolledFringe: 'Валик у линии лба',
  turban: 'Тюрбан со складками',
  napeChignon: 'Низкий шиньон',
  crownBun: 'Высокий пучок',
  frenchTwist: 'Французский валик',
  braidedCrown: 'Коса через макушку',
  milkmaidBraids: 'Косы вокруг головы',
  twinBraids: 'Две косы с лентами',
  halfUp: 'Полусобранные волны',
  sideSweep: 'Боковая укладка',
  shortSculpted: 'Короткая фигурная укладка',
  headscarf: 'Платок с узлом',
  snood: 'Сетка для волос — снуд',
  tiltHat: 'Шляпка набок',
  beret: 'Фетровый берет',
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

function BackFall({ p, bottom = 202, side = 37, waved = false }: {
  p: HairPaint; bottom?: number; side?: number; waved?: boolean;
}) {
  const left = waved
    ? `C${side - 13} ${bottom - 24} ${side + 4} 159 ${side - 5} 145 C${side - 11} 128 ${side - 5} 113 ${side} 104`
    : `C${side - 11} ${bottom - 26} ${side - 8} 140 ${side} 104`;
  const right = waved
    ? `C${207 - side} 130 ${199 - side} 144 ${205 - side} 160 C${212 - side} 177 ${202 - side} ${bottom - 16} ${207 - side} ${bottom}`
    : `C${209 - side} 143 ${204 - side} ${bottom - 19} ${206 - side} ${bottom}`;
  const outline = `M${side} 104 C${side - 8} 62 62 36 100 33 C138 36 ${208 - side} 62 ${200 - side} 104 ${right} Q100 ${bottom + 15} ${side - 7} ${bottom} ${left} Z`;
  return (
    <g>
      <path d={outline} fill={p.dark} />
      <path d={`M${side + 10} 100 C${side + 1} 138 ${side + 7} ${bottom - 29} ${side + 4} ${bottom - 5}`} fill="none" stroke={p.base} strokeWidth="2.3" opacity="0.5" />
      <path d={`M${190 - side} 100 C${199 - side} 138 ${193 - side} ${bottom - 29} ${196 - side} ${bottom - 5}`} fill="none" stroke={p.base} strokeWidth="2.3" opacity="0.5" />
    </g>
  );
}

function SideLock({ p, bottom = 175, waved = false, both = true }: {
  p: HairPaint; bottom?: number; waved?: boolean; both?: boolean;
}) {
  const outer = waved
    ? `C36 98 38 119 43 137 C36 150 37 ${bottom - 20} 44 ${bottom}`
    : `C37 98 37 135 43 ${bottom}`;
  const d = `M54 72 ${outer} Q54 ${bottom + 8} 64 ${bottom - 6} C57 ${bottom - 35} 56 110 67 82 Q61 72 54 72 Z`;
  const lock = (
    <g>
      <path d={d} fill={p.dark} transform="translate(-1 1)" opacity="0.64" />
      <path d={d} fill={p.gradient} stroke={p.dark} strokeWidth="0.75" />
      <Strands p={p} paths={[
        `M52 82 C43 111 43 ${bottom - 30} 48 ${bottom - 7}`,
        `M59 87 C53 116 53 ${bottom - 26} 57 ${bottom - 10}`,
      ]} weight={0.85} />
    </g>
  );
  return both ? <Pair>{lock}</Pair> : lock;
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

function Roll({ p, x, y, tilt = 0, width = 26 }: {
  p: HairPaint; x: number; y: number; tilt?: number; width?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
      <ellipse cx="1.5" cy="2.5" rx={width + 2} ry="13" fill={p.dark} opacity="0.5" />
      <ellipse rx={width} ry="12" fill={p.gradient} stroke={p.dark} strokeWidth="0.9" />
      <path d={`M${-width + 5} -2 C${-width / 2} -11 ${width / 2} -11 ${width - 5} -2`} fill="none" stroke={p.shine} strokeWidth="1.4" opacity="0.5" strokeLinecap="round" />
      <path d={`M${-width + 8} 6 Q0 13 ${width - 8} 6`} fill="none" stroke={p.dark} strokeWidth="1.4" opacity="0.7" />
      <path d={`M${width - 8} 1 q6 4 0 8 q-7 3 -9 -4`} fill="none" stroke={p.dark} strokeWidth="1" opacity="0.67" />
    </g>
  );
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

// Separate deterministic little ink strokes, and ONLY here use headClip.
// Kept low around the ears and upper jaw, well clear of the eyes (y≈102-114).
function TempleStubble({ p, density = 34, high = false, bottom = 142 }: { p: HairPaint; density?: number; high?: boolean; bottom?: number }) {
  const top = high ? 102 : 110;
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
function ScalpStubble({ p, bottom = 144 }: { p: HairPaint; bottom?: number }) {
  const id = `cropped-scalp-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
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
      <defs><clipPath id={id}><path d={zone} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>
        <path d={zone} fill={p.stubble} opacity="0.36" />
        <path d={strokes} fill="none" stroke={p.dark} strokeWidth="0.6" strokeLinecap="round" opacity="0.65" />
        <path d={strokes} fill="none" stroke={p.shine} strokeWidth="0.4" strokeLinecap="round" opacity="0.18" transform="translate(-0.45 -0.4)" />
      </g>
    </g>
  );
}

function Sideburns({ p, long = false }: { p: HairPaint; long?: boolean }) {
  // Long sideburns reach toward the jaw (y≈146); short ones end below the ear top.
  return <Pair><path d={`M49 86 C46 94 48 ${long ? 138 : 112} 51 ${long ? 146 : 118} L58 ${long ? 138 : 114} L59 87 Z`} fill={p.dark} /></Pair>;
}

const FELT = '#35291f';
const FELT_LIT = '#65503d';
const FELT_DARK = '#1b1511';

// The crown begins above the skull; the brim overlaps hair at its root.
function MensHat({ p, kind }: { p: HairPaint; kind: HatStyle }) {
  const cap = kind === 'flatCap' || kind === 'workCap';
  return (
    <g>
      <TempleStubble p={p} density={22} />
      <path d="M48 77 C48 60 67 48 100 48 C133 48 152 60 152 77 L146 81 Q100 64 54 81 Z" fill={p.gradient} />
      <Sideburns p={p} />
      <path d="M58 65 Q100 58 142 65" fill="none" stroke={FELT_DARK} strokeWidth="2" opacity="0.3" />
      {cap ? (
        <g>
          <path d="M48 52 C49 29 68 17 100 18 C132 17 151 29 152 52 Q100 66 48 52 Z" fill={FELT} stroke={FELT_DARK} strokeWidth="1.4" />
          <Strands p={{ ...p, dark: FELT_DARK, shine: FELT_LIT }} paths={['M57 49 Q79 22 100 22 Q121 22 143 49', 'M65 47 Q87 28 100 26 Q113 28 135 47']} weight={0.7} />
          {[69, 87, 112, 131].map((x) => <path key={x} d={`M${x} 26 Q${x - 4} 36 ${x - 7} 54`} fill="none" stroke={FELT_DARK} strokeWidth="0.75" opacity="0.45" />)}
          <path d="M44 52 C71 48 129 48 156 52 Q125 70 57 62 Q44 58 44 52 Z" fill={FELT_DARK} />
          <path d="M47 53 Q100 46 153 53 Q106 63 48 56 Z" fill={FELT} stroke={FELT_DARK} strokeWidth="0.85" />
          {kind === 'workCap' && <circle cx="100" cy="20" r="2.6" fill={FELT_LIT} />}
        </g>
      ) : (
        <g>
          <ellipse cx="100" cy="52" rx={kind === 'fedora' ? 69 : kind === 'homburg' ? 62 : 52} ry="9" fill={FELT} stroke={FELT_DARK} strokeWidth="1.2" />
          <path d={`M${kind === 'trilby' ? 68 : 61} 53 C${kind === 'trilby' ? 68 : 62} 31 79 14 100 14 C121 14 ${kind === 'trilby' ? 132 : 138} 31 ${kind === 'trilby' ? 132 : 139} 53 Z`} fill={FELT} stroke={FELT_DARK} strokeWidth="1.3" />
          <path d="M71 45 Q100 50 129 45 L132 53 Q100 59 68 53 Z" fill={FELT_DARK} />
          <path d="M73 27 Q87 20 100 25 Q113 20 127 27" fill="none" stroke={FELT_DARK} strokeWidth="2.5" opacity="0.7" />
          <path d="M78 26 Q87 22 100 28 Q113 22 122 26" fill="none" stroke={FELT_LIT} strokeWidth="1.1" opacity="0.65" />
          {kind === 'homburg' && <path d="M84 18 Q100 24 116 18" fill="none" stroke={FELT_DARK} strokeWidth="1.4" />}
        </g>
      )}
    </g>
  );
}

function WomensHat({ p, kind }: { p: HairPaint; kind: 'tiltHat' | 'beret' }) {
  return (
    <g>
      <Crown p={p} top={32} side={46} line="pulled" />
      <SideLock p={p} bottom={156} />
      {kind === 'beret' ? (
        <g>
          <ellipse cx="98" cy="54" rx="50" ry="8" fill="#150e0a" opacity="0.3" />
          <path d="M42 50 C44 26 72 12 108 14 C144 15 160 33 155 51 Q104 66 42 50 Z"
            fill="#5c4334" stroke="#211711" strokeWidth="1.3" />
          <path d="M50 44 C66 24 92 16 116 18 C98 24 76 36 64 54 Z" fill="#6e5240" opacity="0.9" />
          <path d="M58 40 Q84 20 114 22 M70 46 Q98 28 130 32 M118 46 Q136 40 146 46" fill="none"
            stroke="#2b1d13" strokeWidth="1.1" opacity="0.55" />
          <path d="M62 36 Q90 18 120 23" fill="none" stroke="#b28e68" strokeWidth="1.4" opacity="0.6" />
          <path d="M46 49 Q100 41 154 49" stroke="#241811" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M46 47.5 Q100 39.5 154 47.5" stroke="#8a6a4a" strokeWidth="1.2" fill="none" opacity="0.8" />
          <path d="M102 17 l2.5 -8" stroke="#241811" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="104.5" cy="7.5" r="2.4" fill="#8a6a4a" stroke="#241811" strokeWidth="0.7" />
        </g>
      ) : (
        <g>
          <ellipse cx="122" cy="58" rx="34" ry="7" fill="#140d0a" opacity="0.3" />
          <g transform="rotate(-13 120 46)">
            <ellipse cx="120" cy="50" rx="37" ry="9" fill="#221610" />
            <ellipse cx="120" cy="48" rx="37" ry="8.5" fill="#6d4b33" stroke="#221610" strokeWidth="1.1" />
            <path d="M88 46 Q120 39 152 46" fill="none" stroke="#a37f57" strokeWidth="1.3" opacity="0.7" />
            <path d="M94 45 C93 31 102 19 120 18 C138 19 147 31 146 45 Z" fill="#543824" stroke="#221610" strokeWidth="1.1" />
            <path d="M97 41 Q120 46 143 41 L143 47 Q120 52 97 47 Z" fill="#241a14" />
            <path d="M99 44 Q120 48 141 44" fill="none" stroke="#c39a67" strokeWidth="0.9" opacity="0.8" />
            <path d="M106 29 Q118 22 134 28" fill="none" stroke="#8a6845" strokeWidth="1.2" opacity="0.7" />
            <path d="M141 36 C156 28 158 14 157 10 C150 18 145 28 139 35 Z" fill="#7d5c3e" stroke="#3a281a" strokeWidth="0.8" />
            <path d="M141 35 C150 26 153 17 153 11" fill="none" stroke="#3a281a" strokeWidth="0.9" />
            <path d="M146 28 l5 -2 M149 23 l5 -2 M144 32 l5 -1" stroke="#3a281a" strokeWidth="0.6" />
            <g transform="translate(103 42)">
              <circle r="5.5" fill="#7d3230" stroke="#471b1a" strokeWidth="0.8" />
              <path d="M-3.5 -1 Q0 -5.5 3.5 -1 Q1 3.5 -2 1.5 Q-4.5 0 -3.5 -1 Z" fill="#a8514d" />
              <circle r="1.4" fill="#e0a35f" />
            </g>
            <g fill="#2c1e14" opacity="0.5">
              {Array.from({ length: 26 }, (_, i) => {
                const col = i % 7;
                const row = Math.floor(i / 7);
                return <circle key={i} cx={104 + col * 7 + (row % 2) * 3.5} cy={54 + row * 6} r="0.85" />;
              })}
            </g>
          </g>
          <path d="M96 58 Q112 54 128 58" fill="none" stroke={p.dark} strokeWidth="2" opacity="0.7" />
        </g>
      )}
    </g>
  );
}

function Headscarf({ p }: { p: HairPaint }) {
  const cloth = '#8a4a34';
  const clothDark = '#5c2d20';
  const clothLit = '#c07a58';
  const trim = '#e3c795';
  return (
    <g>
      {/* Front wrap only. Long tails are rendered in HairBack behind the body. */}
      <Crown p={p} top={36} side={46} line="center" />
      <path d="M37 100 C31 46 59 12 100 12 C141 12 169 46 163 100 L154 128 Q147 108 146 92 C141 68 124 56 100 56 C76 56 59 68 54 92 Q53 108 46 128 Z"
        fill={cloth} stroke="#472619" strokeWidth="1.2" />
      {/* Printed border following the face opening. */}
      <path d="M46 96 C52 68 72 54 100 54 C128 54 148 68 154 96" fill="none" stroke={trim} strokeWidth="2.6" opacity="0.85" />
      <path d="M49 99 C55 73 74 60 100 60 C126 60 145 73 151 99" fill="none" stroke={clothDark} strokeWidth="1" opacity="0.8" />
      <g fill={trim} opacity="0.8">
        {[[62, 78], [74, 66], [89, 60], [104, 59], [119, 61], [133, 68], [144, 79]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" />
        ))}
      </g>
      {/* Crown folds and small floral print. */}
      <path d="M52 62 C62 36 80 22 100 20 C120 22 138 36 148 62" fill="none" stroke={clothLit} strokeWidth="1.6" opacity="0.65" />
      <path d="M60 50 C72 32 86 24 100 23 C114 24 128 32 140 50" fill="none" stroke={clothDark} strokeWidth="1.1" opacity="0.6" />
      <g fill={clothLit} opacity="0.5">
        {[[78, 38], [100, 31], [122, 38], [66, 52], [134, 52], [89, 44], [111, 44]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="1.7" />
            <circle cx={x - 3.4} cy={y + 1} r="0.9" />
            <circle cx={x + 3.4} cy={y + 1} r="0.9" />
          </g>
        ))}
      </g>
      {/* Knot tied at the side of the jaw, with two short folded ends. */}
      <path d="M128 124 Q146 114 158 130 Q148 144 130 137 Z" fill="#74392b" stroke="#472619" strokeWidth="1" />
      <path d="M132 126 Q144 120 154 130" fill="none" stroke={clothLit} strokeWidth="1.2" opacity="0.8" />
      <path d="M150 136 L158 152 L150 154 L143 140 Z" fill="#6d3a2a" stroke="#472619" strokeWidth="0.8" />
      <path d="M138 138 L136 154 L143 153 L143 140 Z" fill="#7d4433" stroke="#472619" strokeWidth="0.8" />
      <circle cx="141" cy="130" r="2.6" fill={clothLit} stroke="#472619" strokeWidth="0.7" />
      {/* Hair escaping at the temples. */}
      <path d="M50 92 Q53 104 55 118 M150 92 Q147 104 145 118" fill="none" stroke={p.base} strokeWidth="2.4" strokeLinecap="round" opacity="0.85" />
      <path d="M56 90 Q58 102 60 114 M144 90 Q142 102 140 114" fill="none" stroke={p.dark} strokeWidth="1" opacity="0.7" />
    </g>
  );
}

function SnoodBack({ p }: { p: HairPaint }) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <g>
      <BackShell p={p} top={26} />
      {/* Hair gathered into the net, visible through the mesh. */}
      <ellipse cx="151" cy="146" rx="29" ry="40" fill={p.dark} />
      <path d="M138 118 Q130 140 136 162 M164 118 Q172 140 166 162" fill="none" stroke={p.base} strokeWidth="2.2" opacity="0.5" />
      <path d="M144 124 Q140 144 144 164 M158 124 Q162 144 158 164" fill="none" stroke={p.shine} strokeWidth="1" opacity="0.4" />
      <defs><clipPath id={`snood-${id}`}><ellipse cx="151" cy="146" rx="28" ry="39" /></clipPath></defs>
      <g clipPath={`url(#snood-${id})`}>
        <g stroke="#c4a87e" strokeWidth="0.8" opacity="0.75" fill="none">
          {Array.from({ length: 13 }, (_, i) => (
            <g key={i}>
              <path d={`M${117 + i * 6.5} 105 l38 84`} />
              <path d={`M${183 - i * 6.5} 105 l-38 84`} />
            </g>
          ))}
        </g>
        <g fill="#c4a87e" opacity="0.85">
          {Array.from({ length: 24 }, (_, i) => {
            const col = i % 6;
            const row = Math.floor(i / 6);
            return <circle key={i} cx={133 + col * 7.5} cy={120 + row * 13} r="0.9" />;
          })}
        </g>
      </g>
      <ellipse cx="151" cy="146" rx="29" ry="40" fill="none" stroke="#6b4c34" strokeWidth="1.8" />
      <path d="M124 119 Q151 107 178 119" fill="none" stroke="#2b1d12" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M124 119 Q151 107 178 119" fill="none" stroke="#8a6845" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
      <g transform="translate(151 112)">
        <path d="M0 0 L-11 -7 L-9 3 Z" fill="#7d3230" stroke="#471b1a" strokeWidth="0.7" />
        <path d="M0 0 L11 -7 L9 3 Z" fill="#9c4033" stroke="#471b1a" strokeWidth="0.7" />
        <circle r="2.4" fill="#b0514c" stroke="#471b1a" strokeWidth="0.7" />
      </g>
    </g>
  );
}

function Turban() {
  const fabric = '#5d4c3a';
  const fabricDark = '#33271c';
  const fabricLit = '#9a7f5e';
  const seam = '#2b2119';
  return (
    <g>
      {/* Turban sits on the crown; the face opening stays high and clear. */}
      <path d="M36 102 C30 44 60 8 100 8 C140 8 170 44 164 102 L151 114 C149 80 130 60 100 60 C70 60 51 80 49 114 Z"
        fill={fabric} stroke={seam} strokeWidth="1.4" />
      {/* Three overlapping wrap bands, each with a lit upper edge and a shaded fold. */}
      <path d="M38 84 C52 44 78 22 112 18 C88 30 64 52 52 88 Z" fill={fabricDark} opacity="0.55" />
      <path d="M40 80 C56 40 84 20 118 16 C92 30 68 52 56 86 Z" fill="#6b5844" />
      <path d="M42 76 C58 38 86 20 118 16" fill="none" stroke={fabricLit} strokeWidth="1.6" opacity="0.7" />
      <path d="M52 96 C64 56 92 32 128 30 C104 40 80 62 70 98 Z" fill={fabricDark} opacity="0.5" />
      <path d="M54 92 C66 54 94 34 128 32 C106 42 84 64 74 96 Z" fill="#665442" />
      <path d="M56 88 C68 52 96 36 128 34" fill="none" stroke={fabricLit} strokeWidth="1.4" opacity="0.65" />
      <path d="M150 88 C138 52 112 32 82 30 C106 40 130 60 142 92 Z" fill={fabricDark} opacity="0.45" />
      <path d="M148 84 C136 50 110 34 82 32 C104 42 128 62 140 88 Z" fill="#71604c" opacity="0.9" />
      <path d="M146 80 C134 48 108 34 82 32" fill="none" stroke={fabricLit} strokeWidth="1.3" opacity="0.6" />
      {/* Gathered front knot with radiating pleats. */}
      <g transform="translate(126 74)">
        <ellipse rx="13" ry="11" fill="#4a3b2c" stroke={seam} strokeWidth="1" />
        <path d="M-9 -6 Q0 -11 9 -6 M-11 0 Q0 -5 11 0 M-9 6 Q0 1 9 6" fill="none" stroke={fabricLit} strokeWidth="0.9" opacity="0.7" />
        <circle r="4.4" fill="#c9a45c" stroke="#6d5328" strokeWidth="0.9" />
        <circle cx="-1.2" cy="-1.2" r="1.3" fill="#ffe9b8" />
      </g>
      {/* Short draped tail over the right temple. */}
      <path d="M152 92 C162 104 162 120 154 132 L144 128 C150 116 150 104 144 94 Z"
        fill="#4f4234" stroke={seam} strokeWidth="1" />
      <path d="M151 96 C157 108 157 120 152 128" fill="none" stroke={fabricLit} strokeWidth="1" opacity="0.6" />
      {/* Hem shadow where the wrap meets the forehead. */}
      <path d="M52 104 C70 78 130 78 148 104" fill="none" stroke={seam} strokeWidth="2.4" opacity="0.4" />
    </g>
  );
}

const CURLS_SCULPTED: Array<[number, number, number]> = [
  [54, 64, 12], [71, 43, 14], [91, 36, 13], [112, 35, 14], [133, 45, 13], [148, 66, 12],
  [46, 86, 10], [153, 84, 10], [64, 61, 10], [98, 53, 10], [129, 62, 10],
];

/* ------------------------------ the two layers ------------------------------ */

export function HairBack({ style, paint: p }: { style: HairStyle; paint: HairPaint }) {
  if (style === 'fedora' || style === 'homburg' || style === 'trilby' || style === 'flatCap' || style === 'workCap') {
    return <BackShell p={p} top={36} side={47} bottom={112} />;
  }

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
    case 'baldingPart': return <g />;

    case 'sculptedCurls': return <g><BackShell p={p} top={17} side={37} bottom={149} /><CurlSet p={p} positions={[[37, 78, 12], [39, 101, 12], [45, 125, 12], [160, 79, 12], [162, 104, 12], [153, 128, 12]]} /></g>;
    case 'softPerm': return <g><BackShell p={p} top={19} side={38} bottom={143} /><CurlSet p={p} positions={[[39, 72, 9], [40, 91, 10], [43, 113, 10], [157, 72, 10], [160, 94, 10], [154, 115, 10]]} /></g>;
    case 'marcelWaves': return <BackFall p={p} bottom={173} side={41} waved />;
    case 'sideWaves': return <BackFall p={p} bottom={187} side={38} waved />;
    case 'shoulderWaves': return <BackFall p={p} bottom={218} side={36} waved />;
    case 'rolledFringe': return <BackShell p={p} top={22} side={42} bottom={134} />;
    case 'turban': return <g>
      <path d="M40 104 C34 52 62 14 100 12 C138 14 166 52 160 104 L152 128 Q100 140 48 128 Z"
        fill="#4c4032" stroke="#241e18" strokeWidth="1.1" />
      <path d="M52 60 Q80 30 116 28 M148 60 Q120 30 84 28" fill="none" stroke="#8a7460" strokeWidth="1.4" opacity="0.55" />
      <path d="M60 110 Q100 122 140 110" fill="none" stroke="#241e18" strokeWidth="2" opacity="0.5" />
    </g>;
    case 'napeChignon': return <g><BackShell p={p} top={25} side={42} /><ellipse cx="153" cy="161" rx="19" ry="25" fill={p.dark} /></g>;
    case 'crownBun': return <g><BackShell p={p} top={24} side={42} /><ellipse cx="105" cy="18" rx="26" ry="19" fill={p.dark} /></g>;
    case 'frenchTwist': return <g><BackShell p={p} top={24} side={41} /><path d="M146 82 Q172 112 162 168 Q150 174 140 158 Z" fill={p.dark} /></g>;
    case 'braidedCrown': return <BackShell p={p} top={24} side={40} bottom={134} />;
    case 'milkmaidBraids': return <BackShell p={p} top={24} side={40} bottom={132} />;
    case 'twinBraids': return <g><BackShell p={p} top={25} side={41} /><Braid p={p} pts={[[47, 110], [31, 147], [48, 184], [41, 211]]} ribbon /><Mirror><Braid p={p} pts={[[47, 110], [31, 147], [48, 184], [41, 211]]} ribbon /></Mirror></g>;
    case 'halfUp': return <BackFall p={p} bottom={202} side={38} waved />;
    case 'sideSweep': return <BackFall p={p} bottom={190} side={37} waved />;
    case 'shortSculpted': return <BackShell p={p} top={24} side={43} bottom={131} />;
    case 'headscarf': return <g>
      {/* Rear hood and both tails: all stay behind the neck and coat. */}
      <path d="M41 100 C34 48 60 14 100 12 C140 14 166 48 159 100 Q147 115 142 129 L58 129 Q53 115 41 100 Z" fill="#68442f" stroke="#3e2418" strokeWidth="1" />
      <path d="M54 112 C38 139 42 173 60 210 L78 194 Q62 151 70 124 Z" fill="#754733" stroke="#3e2418" strokeWidth="1" />
      <path d="M146 112 C162 139 158 173 140 210 L122 194 Q138 151 130 124 Z" fill="#754733" stroke="#3e2418" strokeWidth="1" />
      <path d="M58 128 Q48 160 65 199 M142 128 Q152 160 135 199" fill="none" stroke="#aa7659" strokeWidth="1.6" opacity="0.55" />
      <BackShell p={p} top={31} side={45} bottom={119} />
    </g>;
    case 'snood': return <SnoodBack p={p} />;
    case 'tiltHat': return <BackShell p={p} top={36} side={43} bottom={136} />;
    case 'beret': return <BackShell p={p} top={36} side={43} bottom={136} />;
  }
}

export function HairFront({ style, paint: p }: { style: HairStyle; paint: HairPaint }) {
  if (style === 'fedora' || style === 'homburg' || style === 'trilby' || style === 'flatCap' || style === 'workCap') {
    return <MensHat p={p} kind={style} />;
  }

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
      <ScalpStubble p={p} bottom={130} />
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
      <ScalpStubble p={p} />
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

    // 11: restored — the old receding flat part with a balding crown.
    case 'baldingPart': return <g>
      <TempleStubble p={p} density={48} high />
      <Crown p={p} top={34} side={46} line="receding" />
      <path d="M80 58 Q100 49 119 58" fill="none" stroke={p.dark} strokeWidth="1.3" />
      <Strands p={p} paths={['M61 68 Q79 44 101 45 Q122 45 139 68', 'M65 58 Q81 40 102 40 Q123 41 135 58']} weight={0.75} />
    </g>;

    case 'sculptedCurls': return <g>
      <Crown p={p} top={19} side={38} line="side" />
      <CurlSet p={p} positions={CURLS_SCULPTED} />
      <Strands p={p} paths={['M53 84 Q68 62 85 63', 'M112 61 Q134 55 149 80']} weight={0.8} />
    </g>;

    case 'softPerm': return <g>
      <Crown p={p} top={22} side={39} line="fringe" />
      <CurlSet p={p} positions={[[52, 62, 10], [64, 44, 10], [82, 36, 9], [101, 35, 10], [120, 38, 10], [138, 46, 10], [150, 63, 9], [47, 84, 9], [61, 72, 7], [82, 62, 7], [100, 60, 7], [118, 62, 7], [137, 72, 7], [153, 85, 8]]} />
      <Strands p={p} paths={['M56 78 Q99 60 144 78', 'M60 70 Q99 54 140 70']} weight={0.7} />
      <path d="M52 88 Q49 96 52 102 M148 88 Q151 96 148 102" fill="none" stroke={p.dark} strokeWidth="1.6" opacity="0.6" />
    </g>;

    case 'marcelWaves': return <g>
      <Crown p={p} top={24} side={42} line="side" />
      <SideLock p={p} bottom={168} />
      <path d="M84 62 Q81 48 90 34" fill="none" stroke={p.dark} strokeWidth="1.4" />
      {[0, 1, 2].map((row) => (
        <g key={row}>
          <path d={`M50 ${80 + row * 9} C59 ${66 + row * 9} 65 ${78 + row * 9} 74 ${64 + row * 9} S89 ${62 + row * 9} 98 ${50 + row * 9} S115 ${51 + row * 9} 124 ${41 + row * 9} S141 ${46 + row * 9} 152 ${67 + row * 9}`}
            fill="none" stroke={p.dark} strokeWidth="3.4" opacity="0.5" transform="translate(0 1.6)" />
          <path d={`M50 ${80 + row * 9} C59 ${66 + row * 9} 65 ${78 + row * 9} 74 ${64 + row * 9} S89 ${62 + row * 9} 98 ${50 + row * 9} S115 ${51 + row * 9} 124 ${41 + row * 9} S141 ${46 + row * 9} 152 ${67 + row * 9}`}
            fill="none" stroke={p.gradient} strokeWidth="3" />
          <path d={`M50 ${79 + row * 9} C59 ${65 + row * 9} 65 ${77 + row * 9} 74 ${63 + row * 9} S89 ${61 + row * 9} 98 ${49 + row * 9} S115 ${50 + row * 9} 124 ${40 + row * 9} S141 ${45 + row * 9} 152 ${66 + row * 9}`}
            fill="none" stroke={p.shine} strokeWidth="1" opacity="0.6" />
        </g>
      ))}
    </g>;

    case 'sideWaves': return <g>
      <Crown p={p} top={22} side={39} line="side" />
      <SideLock p={p} bottom={179} waved />
      <path d="M86 60 C103 45 137 47 153 72 Q129 58 104 66 Q81 74 57 87 Q66 68 86 60 Z" fill={p.dark} opacity="0.85" />
      <path d="M88 58 C105 44 136 46 151 70 Q128 57 104 65 Q83 73 61 85 Q69 69 88 58 Z" fill={p.gradient} />
      <path d="M88 56 C82 48 84 38 92 30" fill="none" stroke={p.dark} strokeWidth="1.5" />
      <Strands p={p} paths={['M90 55 Q122 37 151 70', 'M72 70 Q108 49 147 78', 'M60 76 Q84 58 104 60', 'M49 117 Q41 148 47 171']} />
    </g>;

    case 'shoulderWaves': return <g>
      <Crown p={p} top={21} side={39} line="center" />
      <SideLock p={p} bottom={205} waved />
      <path d="M100 55 L100 27" fill="none" stroke={p.dark} strokeWidth="1.3" />
      <path d="M96 52 Q88 44 80 46 M104 52 Q112 44 120 46" fill="none" stroke={p.dark} strokeWidth="0.9" opacity="0.7" />
      <Strands p={p} paths={['M97 59 Q69 63 54 85', 'M103 59 Q131 63 146 85', 'M96 64 Q70 70 58 92', 'M104 64 Q130 70 142 92', 'M47 141 Q55 155 46 173 Q40 187 47 199', 'M153 141 Q145 155 154 173 Q160 187 153 199']} weight={1.1} />
    </g>;

    case 'rolledFringe': return <g>
      <Crown p={p} top={24} side={42} line="pulled" />
      <Strands p={p} paths={['M55 83 Q73 54 102 53 Q126 51 145 82', 'M59 76 Q100 42 141 77']} />
      <ellipse cx="100" cy="65" rx="33" ry="14" fill={p.dark} opacity="0.55" />
      <Roll p={p} x={100} y={62} width={31} tilt={-4} />
      <Curl p={p} x={68} y={70} r={7} />
      <Curl p={p} x={132} y={70} r={7} flip />
      <path d="M63 74 Q55 84 52 100 M137 74 Q145 84 148 100" fill="none" stroke={p.dark} strokeWidth="1.4" opacity="0.7" />
      <circle cx="72" cy="70" r="1.1" fill="#c7a168" />
      <circle cx="128" cy="70" r="1.1" fill="#c7a168" />
    </g>;

    case 'turban': return <Turban />;

    case 'napeChignon': return <g>
      <Crown p={p} top={25} side={43} line="pulled" />
      <Strands p={p} paths={['M54 86 Q73 61 99 62 Q125 61 145 86', 'M60 75 Q81 52 102 52 Q128 52 140 75', 'M67 65 Q91 42 118 51']} />
      <path d="M140 108 Q158 128 158 152" fill="none" stroke={p.dark} strokeWidth="4" />
      <path d="M140 108 Q158 128 158 152" fill="none" stroke={p.gradient} strokeWidth="2.2" />
      <g transform="translate(152 158)">
        <ellipse rx="15" ry="19" fill={p.dark} />
        <ellipse rx="12.5" ry="16.5" fill={p.gradient} />
        <path d="M-8 -10 Q0 -14 8 -10 M-10 -2 Q0 -7 10 -2 M-10 6 Q0 1 10 6 M-8 13 Q0 9 8 13" fill="none" stroke={p.dark} strokeWidth="0.9" opacity="0.7" />
        <path d="M-6 -12 Q-2 -4 0 6" fill="none" stroke={p.shine} strokeWidth="1" opacity="0.55" />
      </g>
      <circle cx="145" cy="143" r="1.3" fill="#c7a168" />
      <circle cx="158" cy="150" r="1.3" fill="#c7a168" />
    </g>;

    case 'crownBun': return <g>
      <Crown p={p} top={24} side={43} line="pulled" />
      <ellipse cx="104" cy="23" rx="27" ry="20" fill={p.dark} />
      <ellipse cx="104" cy="21" rx="23" ry="16.5" fill={p.gradient} />
      <path d="M84 15 Q104 6 124 15 M82 22 Q104 12 126 22 M84 28 Q104 20 124 28" fill="none" stroke={p.dark} strokeWidth="1" opacity="0.6" />
      <path d="M88 14 Q100 8 114 13" fill="none" stroke={p.shine} strokeWidth="1.4" opacity="0.6" />
      <Strands p={p} paths={['M53 89 Q73 58 99 44', 'M64 81 Q81 53 103 39', 'M147 89 Q127 55 105 39']} />
      <path d="M80 36 Q103 47 128 36" fill="none" stroke={p.dark} strokeWidth="4.5" opacity="0.85" />
      <path d="M80 36 Q103 47 128 36" fill="none" stroke="#8a5c38" strokeWidth="2.4" />
      <circle cx="103" cy="42" r="2" fill="#c7a168" stroke="#6d5328" strokeWidth="0.6" />
    </g>;

    case 'frenchTwist': return <g>
      <Crown p={p} top={25} side={43} line="pulled" />
      <path d="M140 88 C154 104 168 134 159 166 Q148 181 137 164 Q148 134 140 88 Z" fill={p.dark} />
      <path d="M143 93 Q159 126 152 160 Q146 170 140 161 Q149 132 143 93 Z" fill={p.gradient} />
      <path d="M143 93 Q159 126 152 160" fill="none" stroke={p.shine} strokeWidth="1.6" opacity="0.5" />
      <path d="M147 100 Q157 126 152 152" fill="none" stroke={p.dark} strokeWidth="1" opacity="0.7" />
      <Strands p={p} paths={['M55 89 Q79 55 102 56 Q128 55 144 87', 'M61 77 Q81 46 110 47 Q131 50 143 77']} />
      <circle cx="145" cy="120" r="1.5" fill="#c7a168" />
      <circle cx="149" cy="140" r="1.5" fill="#c7a168" />
      <circle cx="146" cy="158" r="1.5" fill="#c7a168" />
    </g>;

    case 'braidedCrown': return <g>
      <Crown p={p} top={25} side={41} line="center" />
      <path d="M100 58 L100 30" fill="none" stroke={p.dark} strokeWidth="1.2" />
      <Strands p={p} paths={['M97 60 Q74 66 55 88', 'M103 60 Q126 66 145 88']} weight={0.75} />
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

    case 'halfUp': return <g>
      <Crown p={p} top={22} side={40} line="side" />
      <SideLock p={p} bottom={190} waved />
      <path d="M60 70 Q85 45 110 44" fill="none" stroke={p.dark} strokeWidth="5" opacity="0.85" strokeLinecap="round" />
      <path d="M60 70 Q85 45 110 44" fill="none" stroke={p.gradient} strokeWidth="3" strokeLinecap="round" />
      <Roll p={p} x={108} y={44} width={22} tilt={-18} />
      <circle cx="108" cy="44" r="2" fill="#c7a168" stroke="#6d5328" strokeWidth="0.6" />
      <Strands p={p} paths={['M57 87 Q72 59 87 51', 'M143 87 Q127 57 109 51', 'M66 75 Q79 48 99 42']} />
    </g>;

    case 'sideSweep': return <g>
      <Crown p={p} top={22} side={38} line="swept" />
      <SideLock p={p} bottom={177} waved both={false} />
      <path d="M62 75 C80 48 116 40 143 59 Q153 68 150 82 Q130 61 105 62 Q82 61 62 75 Z" fill={p.base} opacity="0.85" />
      <Strands p={p} paths={['M64 73 Q93 40 130 51 Q143 56 149 76', 'M68 79 Q102 50 138 66']} />
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

    case 'headscarf': return <Headscarf p={p} />;
    case 'snood': return <g>
      <Crown p={p} top={26} side={41} line="pulled" />
      <Strands p={p} paths={['M54 88 Q74 59 103 62 Q128 62 146 88', 'M62 75 Q87 51 114 56 Q136 61 142 79']} />
      <path d="M48 74 Q100 58 152 74 L150 86 Q100 70 50 86 Z" fill="#4a3524" stroke="#241811" strokeWidth="0.9" />
      <path d="M52 78 Q100 63 148 78 M52 82 Q100 67 148 82" fill="none" stroke="#8a6845" strokeWidth="0.7" strokeDasharray="2.5 2" opacity="0.8" />
      <g transform="translate(148 79)">
        <path d="M0 0 L-10 -6 L-8 4 Z" fill="#7d3230" stroke="#471b1a" strokeWidth="0.7" />
        <path d="M0 0 L10 -6 L8 4 Z" fill="#9c4033" stroke="#471b1a" strokeWidth="0.7" />
        <circle r="2.3" fill="#b0514c" stroke="#471b1a" strokeWidth="0.7" />
      </g>
    </g>;
    case 'tiltHat': return <WomensHat p={p} kind="tiltHat" />;
    case 'beret': return <WomensHat p={p} kind="beret" />;
  }
}