import { memo, useId, type ReactNode } from 'react';
import { HAND_OUTLINE, FOOT_OUTLINE, between, type ArmGeometry, type FigureRig } from '../body/figureGeometry';
import { tone, type ClothesDef, type ClothesRenderContext, type ClothesSettings } from './types';

/* ══════════════════════════════════════════════════════════════════════════
   КАТАЛОГ — лист «1930's Women's fashion» (1931–1939) + костюм-униформа
   ══════════════════════════════════════════════════════════════════════════ */

export const CLOTHES: ClothesDef[] = [
  { id: 'cloth-1931-green-wrap', name: 'Зелёное платье с запахом и пагодами', year: 1931, category: 'dress', position: 'Ряд 1, №1 (1931)',
    description: 'Оливково-зелёный крепдешин: глубокий V-запах с драпировкой, рукава-пагода до локтя со светлыми оборками, широкий светло-зелёный кушак с бантом на бедре, юбка годе.',
    color: '#4c6857', accent: '#9ccc84', pattern: 'none' },
  { id: 'cloth-1931-tweed-suit', name: 'Твидовый костюм с галстуком', year: 1931, category: 'suit', position: 'Ряд 1, №2 (1931)',
    description: 'Серый шерстяной твид: длинный однобортный жакет с широкими лацканами и клапанами карманов, тонкий кожаный ремешок, белая рубашка с тёмным галстуком, юбка в мелкую клетку.',
    color: '#8c8783', accent: '#3c2d24', pattern: 'herringbone' },
  { id: 'cloth-1931-blue-stole', name: 'Васильковое платье в горошек', year: 1931, category: 'dress', position: 'Ряд 1, №3 (1931)',
    description: 'Струящееся синее платье в мелкий белый горошек, узкие длинные рукава, шнуровка у горла, алый ремешок; горжетка надевается отдельно.',
    color: '#35597f', accent: '#f3f1ea', pattern: 'dots' },
  { id: 'cloth-1932-tiered-flounce', name: 'Платье с ярусными оборками', year: 1932, category: 'dress', position: 'Ряд 1, №4 (1932)',
    description: 'Серо-голубой шёлк в мелкий горошек: оборчатый воротник-кокилье, узкие рукава с оборками у кисти, три мягких яруса воланов по юбке.',
    color: '#6a838d', accent: '#d9e4e8', pattern: 'dots' },
  { id: 'cloth-1932-terracotta-ensemble', name: 'Терракотовый ансамбль с пальто', year: 1932, category: 'coat', position: 'Ряд 1, №5 (1932)',
    description: 'Терракотовое шерстяное пальто-редингот с большим отложным воротником, тёмным поясом с пряжкой и накладными карманами; под ним прямая юбка того же тона.',
    color: '#b2593f', accent: '#2d2521', pattern: 'none' },
  { id: 'cloth-1932-terracotta-open', name: 'Терракотовое пальто нараспашку', year: 1932, category: 'coat', position: 'Ряд 1, №5 (1932) — вторая версия',
    description: 'То же пальто, распахнутое на груди: под ним рубашка в тон с круглым воротником, планкой на пуговицах и двумя круглыми накладными карманами.',
    color: '#b2593f', accent: '#2d2521', pattern: 'none' },
  { id: 'cloth-1932-plaid-bias', name: 'Клетчатое платье с белыми манжетами', year: 1932, category: 'dress', position: 'Ряд 1, №6 (1932)',
    description: 'Светло-голубая клетка косого кроя: V-вырез с белой окантовкой, рукава три четверти с широкими белыми манжетами, узкий ремешок, юбка с мягкими клиньями.',
    color: '#dbe3ea', accent: '#5a7590', pattern: 'plaid' },
  { id: 'cloth-1933-batwing-coat', name: 'Чёрное манто с рукавами-пагода', year: 1933, category: 'coat', position: 'Ряд 1, №7 (1933)',
    description: 'Вечернее суконное манто: высокий воротник-стойка, огромные рукава-пагода, расширяющиеся к запястью, узкий силуэт до щиколотки.',
    color: '#1a1819', accent: '#5a545e', pattern: 'none' },
  { id: 'cloth-1933-nautical-jumper', name: 'Морской джемпер и синяя юбка', year: 1933, category: 'suit', position: 'Ряд 1, №8 (1933)',
    description: 'Кремовый трикотажный джемпер с горизонтальными синими и терракотовыми полосами и белым отложным воротником; синяя юбка-клёш на высокой талии.',
    color: '#27456e', accent: '#d97d4b', pattern: 'none' },
  { id: 'cloth-1934-satin-evening', name: 'Чёрное атласное платье с пелериной', year: 1934, category: 'dress', position: 'Ряд 1, №9 (1934)',
    description: 'Матовый чёрный атлас в пол: круглый вырез, короткая пелерина-накидка, спадающая мягкими фестонами на плечи и предплечья, узкий силуэт.',
    color: '#17161a', accent: '#5e5768', pattern: 'none' },
  { id: 'cloth-1934-satin-bolero', name: 'Чёрное платье с распахнутым болеро', year: 1934, category: 'dress', position: 'Ряд 1, №9 (1934) — вторая версия',
    description: 'То же атласное платье, но вместо пелерины — короткое распахнутое болеро с закруглёнными полами и рукавами три четверти.',
    color: '#17161a', accent: '#5e5768', pattern: 'none' },
  { id: 'cloth-1934-mint-tea', name: 'Мятное платье с воланами на плечах', year: 1934, category: 'dress', position: 'Ряд 1, №10 (1934)',
    description: 'Зелёный принт «лиственный узор»: круглый вырез, двойные пышные воланы на плечах вместо рукавов, узкий пояс, юбка с мягким клёшем.',
    color: '#5f9c6c', accent: '#e2f2e0', pattern: 'leaf' },
  { id: 'cloth-1935-cobalt-day', name: 'Кобальтовое платье с жабо', year: 1935, category: 'dress', position: 'Ряд 2, №1 (1935)',
    description: 'Насыщенно-синее креповое платье с болеро-эффектом: синий воротник-стойка с пуговкой, белое каскадное жабо на животе, рукава три четверти с манжетами, пояс с пряжкой.',
    color: '#25638a', accent: '#eef3f7', pattern: 'none' },
  { id: 'cloth-1935-peplum-dinner', name: 'Чёрный костюм с баской', year: 1935, category: 'suit', position: 'Ряд 2, №2 (1935)',
    description: 'Чёрный крепдешин: жакет с квадратными плечами и рукавами-фонариками у плеча, воротник-стойка с брошью, короткая баска, узкая юбка.',
    color: '#1a191c', accent: '#b9b2a4', pattern: 'none' },
  { id: 'cloth-1936-burgundy-wool', name: 'Бордовое платье с широкими плечами', year: 1936, category: 'dress', position: 'Ряд 2, №3 (1936)',
    description: 'Марсала, плотная шерсть: воротник-стойка с косынкой, широкие мягкие плечи, длинные узкие рукава, широкий пояс с пряжкой, прямая юбка со шлицей.',
    color: '#5c2a2e', accent: '#c99252', pattern: 'none' },
  { id: 'cloth-1936-floral-chiffon', name: 'Шифоновое платье с рукавами-крыльями', year: 1936, category: 'dress', position: 'Ряд 2, №4 (1936)',
    description: 'Серо-лиловый шёлк в мелкий цветок: широкие рукава-крылья до локтя, запах на груди, кушак с длинными концами, юбка по косой до икры.',
    color: '#6f6780', accent: '#e8bdb6', pattern: 'floral' },
  { id: 'cloth-1937-palazzo-trousers', name: 'Брючный костюм-палаццо', year: 1937, category: 'suit', position: 'Ряд 2, №5 (1937)',
    description: 'Синие широкие брюки на высокой талии с рядами белых пуговиц на бёдрах, белая блуза, короткий синий жакет с белым кантом и алый шейный платок.',
    color: '#2e556e', accent: '#bf3437', pattern: 'none' },
  { id: 'cloth-1937-contrast-tailored', name: 'Белый костюм с чёрным кантом', year: 1937, category: 'suit', position: 'Ряд 2, №6 (1937)',
    description: 'Белый костюм: жакет с чёрным кантом по лацканам и бортам, три крупные чёрные пуговицы, прямая белая юбка; перчатки — отдельный аксессуар.',
    color: '#ebe6db', accent: '#1e1c1b', pattern: 'none' },
  { id: 'cloth-1937-pink-garden', name: 'Розовое платье в цветочек', year: 1937, category: 'dress', position: 'Ряд 2, №7 (1937)',
    description: 'Розовый принт «полевые цветы»: круглый воротничок, рукава-буфы до локтя, оборки вдоль планки на груди, пояс с пряжкой, расклёшённая юбка.',
    color: '#d6687a', accent: '#fdeaf0', pattern: 'floral' },
  { id: 'cloth-1938-sculpted-sheath', name: 'Графитовый костюм с плечиками', year: 1938, category: 'suit', position: 'Ряд 2, №8 (1938)',
    description: 'Тёмно-графитовая шерсть: жакет с очень широкими плечами и рукавами-буфами у плеча, вырез с зелёным цветком, узкая юбка до икры.',
    color: '#3f3c3a', accent: '#5f7a58', pattern: 'none' },
  { id: 'cloth-1938-polka-puffs', name: 'Голубое платье с белым воротничком', year: 1938, category: 'dress', position: 'Ряд 2, №9 (1938)',
    description: 'Васильковый горошек: широкий белый воротник, короткие рукава с белыми манжетами, центральная планка на пуговицах, пояс, юбка с клёшем.',
    color: '#49739a', accent: '#fdfefe', pattern: 'dots' },
  { id: 'cloth-1939-royal-floral', name: 'Синее платье с запахом в цветочек', year: 1939, category: 'dress', position: 'Ряд 2, №10 (1939)',
    description: 'Ярко-синий фон с мелкими жёлтыми цветами: V-вырез с запахом, короткие рукава-крылышки, широкий пояс, юбка со встречной складкой.',
    color: '#284687', accent: '#e5ad57', pattern: 'floral' },
  { id: 'cloth-1938-uberfrau-uniform', name: 'Костюм-униформа «Überfrau»', year: 1938, category: 'costume', position: 'Крайняя врезка листа, фигура в ремённом костюме',
    description: 'Чёрная кожаная униформа с красной окантовкой: китель с высоким воротником и молниями по стойке, портупея через плечо, широкий ремень с двойной пряжкой, бриджи-галифе, сапоги. На весь бюст — крупный белый круг в красной окантовке с нейтральной розеткой; исторические знаки не воспроизводятся.',
    color: '#141215', accent: '#b8262f', pattern: 'none' },
];

export const CLOTHES_BY_ID: Readonly<Record<string, ClothesDef>> = Object.fromEntries(CLOTHES.map((item) => [item.id, item]));

/* ══════════════════════════════════════════════════════════════════════════
   ГЕОМЕТРИЯ
   ══════════════════════════════════════════════════════════════════════════ */

type Pt = [number, number];
const X = 150;
const r2 = (v: number) => Number(v.toFixed(2));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
const pt = (p: { x: number; y: number }): Pt => [p.x, p.y];
const fmt = (p: Pt) => `${r2(p[0])} ${r2(p[1])}`;

/** Гладкий Catmull-Rom → Безье. Для замкнутых — стыкуется без «уголка». */
function smooth(pts: Pt[], closed = false): string {
  if (pts.length < 2) return '';
  const n = pts.length;
  const at = (i: number): Pt => (closed ? pts[((i % n) + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${fmt(pts[0])}`;
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    d += ` C${fmt([p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6])} ${fmt([p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6])} ${fmt(p2)}`;
  }
  return closed ? `${d} Z` : d;
}

/** Точки на кубической кривой (для сборки контура из дуг). */
function cubic(p0: Pt, c1: Pt, c2: Pt, p1: Pt, n = 8, includeStart = false): Pt[] {
  const out: Pt[] = [];
  for (let i = includeStart ? 0 : 1; i <= n; i++) {
    const t = i / n, u = 1 - t;
    out.push([
      u ** 3 * p0[0] + 3 * u * u * t * c1[0] + 3 * u * t * t * c2[0] + t ** 3 * p1[0],
      u ** 3 * p0[1] + 3 * u * u * t * c1[1] + 3 * u * t * t * c2[1] + t ** 3 * p1[1],
    ]);
  }
  return out;
}

function normals(pts: Pt[]): Pt[] {
  return pts.map((_, i) => {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.hypot(dx, dy) || 1;
    return [-dy / len, dx / len];
  });
}

/** Полуширина корпуса на высоте y с припуском ткани. */
function bodyHalf(rig: FigureRig, y: number, add = 0): number {
  const a = rig.anchors;
  const sh = Math.abs(rig.shoulders[1].x - X);
  if (y <= a.shoulder) return sh + add;
  if (y <= a.chest) return lerp(sh - 4, rig.chestHalf, ease((y - a.shoulder) / (a.chest - a.shoulder))) + add;
  if (y <= a.waist) return lerp(rig.chestHalf, rig.waistHalf, ease((y - a.chest) / (a.waist - a.chest))) + add;
  if (y <= a.hip) return lerp(rig.waistHalf, rig.hipHalf, ease((y - a.waist) / (a.hip - a.waist))) + add;
  return rig.hipHalf + add;
}

type Neck = 'v' | 'deepv' | 'round' | 'square' | 'boat' | 'high' | 'stand' | 'wrap';

interface Bodice {
  neck: Neck;
  neckHalf?: number;
  neckDrop?: number;
  /** припуск по груди/бёдрам и на талии */
  ease?: number;
  waistEase?: number;
  /** ширина плеч изделия сверх плеч фигуры (подплечники) */
  shoulderAdd?: number;
  /** высота плечевого шва над плечом (для подплечников) */
  shoulderLift?: number;
  hem: number;
  hemHalf: number;
  /** кривизна подола; отрицательная — подол вогнут вверх */
  hemBow?: number;
  /** тип расширения юбки */
  flare?: 'straight' | 'a-line' | 'godet' | 'bias';
}

/** Линия выреза от левого угла плеча к правому (без самих углов). */
function neckline(kind: Neck, nx: number, y0: number, drop: number): Pt[] {
  const L: Pt = [X - nx, y0], R: Pt = [X + nx, y0];
  switch (kind) {
    case 'v': return cubic(L, [X - nx * 0.42, y0 + drop * 0.75], [X + nx * 0.42, y0 + drop * 0.75], R, 8);
    case 'deepv': return cubic(L, [X - nx * 0.25, y0 + drop * 0.9], [X + nx * 0.25, y0 + drop * 0.9], R, 8);
    case 'wrap': return cubic(L, [X - nx * 0.15, y0 + drop], [X + nx * 0.62, y0 + drop * 0.35], R, 8);
    case 'round': return cubic(L, [X - nx * 0.9, y0 + drop * 1.45], [X + nx * 0.9, y0 + drop * 1.45], R, 9);
    case 'square': return [[X - nx * 0.72, y0 + drop], [X - nx * 0.35, y0 + drop * 1.05], [X + nx * 0.35, y0 + drop * 1.05], [X + nx * 0.72, y0 + drop]];
    case 'boat': return cubic(L, [X - nx * 0.7, y0 + drop * 0.55], [X + nx * 0.7, y0 + drop * 0.55], R, 6);
    case 'stand': return [[X - nx * 0.85, y0 - 6], [X, y0 - 8], [X + nx * 0.85, y0 - 6]];
    default: return [[X - nx * 0.7, y0 + 3], [X, y0 + 5], [X + nx * 0.7, y0 + 3]];
  }
}

/** Контур корпуса изделия. */
function bodice(rig: FigureRig, o: Bodice): string {
  const a = rig.anchors;
  const sh = Math.abs(rig.shoulders[1].x - X) + (o.shoulderAdd ?? 0);
  const nx = o.neckHalf ?? 14;
  const drop = o.neckDrop ?? 24;
  const add = o.ease ?? 2.4;
  const wadd = o.waistEase ?? 1.6;
  const lift = o.shoulderLift ?? 0;
  const y0 = a.shoulder - 8 - lift;
  const bow = o.hemBow ?? (o.hemHalf - rig.hipHalf) * 0.14 + 4;
  const flare = o.flare ?? 'a-line';

  const side = (s: number): Pt[] => {
    const pts: Pt[] = [
      [X + s * (sh + 1), a.shoulder - 1 - lift * 0.5],
      [X + s * bodyHalf(rig, a.chest, add), a.chest],
      [X + s * bodyHalf(rig, a.chest + (a.waist - a.chest) * 0.55, add * 0.8), a.chest + (a.waist - a.chest) * 0.55],
      [X + s * bodyHalf(rig, a.waist, wadd), a.waist],
      [X + s * bodyHalf(rig, a.hip, add + 1), a.hip],
    ];
    const span = o.hem - a.hip;
    if (flare === 'straight') {
      pts.push([X + s * (rig.hipHalf + add + 1), a.hip + span * 0.5], [X + s * o.hemHalf, o.hem]);
    } else if (flare === 'godet') {
      pts.push([X + s * (rig.hipHalf + add + 1.5), a.hip + span * 0.42], [X + s * lerp(rig.hipHalf + add, o.hemHalf, 0.45), a.hip + span * 0.78], [X + s * o.hemHalf, o.hem]);
    } else if (flare === 'bias') {
      pts.push([X + s * lerp(rig.hipHalf + add, o.hemHalf, 0.35), a.hip + span * 0.45], [X + s * lerp(rig.hipHalf + add, o.hemHalf, 0.72), a.hip + span * 0.78], [X + s * o.hemHalf, o.hem]);
    } else {
      pts.push([X + s * lerp(rig.hipHalf + add, o.hemHalf, 0.5), a.hip + span * 0.5], [X + s * o.hemHalf, o.hem]);
    }
    return pts;
  };

  const right = side(1);
  const leftRev = side(-1).reverse();
  const RH: Pt = [X + o.hemHalf, o.hem];
  const LH: Pt = [X - o.hemHalf, o.hem];
  // дубли углов подола: сглаживание не должно срезать угол и оставлять белый просвет
  const hemMid = cubic(RH, [X + o.hemHalf * 0.5, o.hem + bow], [X - o.hemHalf * 0.5, o.hem + bow], LH, 10).slice(0, -1);
  const ring: Pt[] = [[X - nx, y0], ...neckline(o.neck, nx, y0, drop), [X + nx, y0], ...right, RH, ...hemMid, LH, LH, ...leftRev.slice(1)];
  return smooth(ring, true);
}

/* ── Рукава ────────────────────────────────────────────────────────────── */

type SleeveStyle = 'fitted' | 'pagoda' | 'puff-top' | 'bishop' | 'wing' | 'cap';

interface SleeveOpts {
  style: SleeveStyle;
  /** длина по руке 0..1 (0.55 — локоть) */
  len: number;
  /** доп. припуск к обхвату руки */
  add?: number;
  /** множитель раструба для пагоды (1 — обычная, 1.5 — огромная) */
  flare?: number;
}

interface SleeveOut {
  body: string;
  cuff: Pt[];
  end: Pt;
  axis: Pt[];
}

/** Полная ширина руки (риг хранит полуширины 11 / 8.4 / 6.2). */
function armWidth(rig: FigureRig, t: number): number {
  const w = rig.female ? [22, 16.8, 12.4] : [26.4, 20, 14.4];
  return t <= 0.55 ? lerp(w[0], w[1], t / 0.55) : lerp(w[1], w[2], (t - 0.55) / 0.45);
}

function sleeve(rig: FigureRig, arm: ArmGeometry, o: SleeveOpts): SleeveOut {
  const len = Math.max(0.12, Math.min(0.98, o.len));
  const add = o.add ?? 2.6;
  const fl = o.flare ?? 1;
  const axisAt = (t: number): Pt => (t <= 0.55 ? pt(between(arm.shoulder, arm.elbow, t / 0.55)) : pt(between(arm.elbow, arm.hand, (t - 0.55) / 0.45)));
  const steps = 10;
  const axis: Pt[] = [];
  for (let i = 0; i <= steps; i++) axis.push(axisAt(-0.05 + ((len + 0.05) * i) / steps));

  // Профили ширины привязаны к реальной позиции на руке t (0 — плечо, 0.55 — локоть, 1 — запястье),
  // а не к нормализованной длине рукава — иначе короткие рукава раздувает.
  const width = (u: number) => {
    const t = Math.max(0, Math.min(1, -0.05 + (len + 0.05) * u));
    const base = armWidth(rig, t) + add;
    switch (o.style) {
      case 'pagoda': {
        // впритык до локтя, затем резкий раструб
        const k = Math.max(0, (t - 0.5) / Math.max(0.06, len - 0.5));
        return base * (1 + 2.4 * fl * k ** 1.25);
      }
      case 'puff-top': {
        // буф только у оката, ниже — впритык
        const g = Math.exp(-(((t - 0.13) / 0.23) ** 2));
        return base * (1 + 1.0 * g);
      }
      case 'bishop': return base * (1 + 0.95 * (t / Math.max(0.2, len)) ** 2);
      case 'wing': return base * (1 + 2.4 * (t / Math.max(0.2, len)));
      case 'cap': return base * (1 + 0.38 * Math.sin(Math.PI * Math.min(1, t / Math.max(0.2, len))));
      default: return base;
    }
  };

  // рукав по оси, начиная чуть выше плеча (корень прячется под корпус)
  const ns = normals(axis);
  const L: Pt[] = [], R: Pt[] = [];
  axis.forEach((p, i) => {
    const h = width(i / steps) / 2;
    L.push([p[0] + ns[i][0] * h, p[1] + ns[i][1] * h]);
    R.push([p[0] - ns[i][0] * h, p[1] - ns[i][1] * h]);
  });
  // у пагоды низ срезан наискось: наружный край длиннее внутреннего
  if (o.style === 'pagoda') {
    const n = axis.length - 1;
    const dx = axis[n][0] - axis[n - 1][0], dy = axis[n][1] - axis[n - 1][1];
    const l0 = Math.hypot(dx, dy) || 1;
    const ex = (dx / l0) * 7, ey = (dy / l0) * 7;
    const li = L.length - 1, ri = R.length - 1;
    const lIsOuter = arm.side === -1 ? L[li][0] < R[ri][0] : L[li][0] > R[ri][0];
    if (lIsOuter) L[li] = [L[li][0] + ex, L[li][1] + ey];
    else R[ri] = [R[ri][0] + ex, R[ri][1] + ey];
  }
  const end = axis[axis.length - 1];
  const cuff: Pt[] = [L[L.length - 1], end, R[R.length - 1]];
  const ring = [...L, ...R.reverse()];
  return { body: smooth(ring, true), cuff, end, axis };
}

/** Окат/тени рукава и ложбинки складок. */
function sleeveShading(s: SleeveOut, color: string, style: SleeveStyle): ReactNode {
  const a0 = s.axis[1], a1 = s.axis[Math.floor(s.axis.length * 0.55)], a2 = s.axis[s.axis.length - 1];
  const lines: string[] = [];
  if (style === 'pagoda' || style === 'wing' || style === 'bishop') {
    for (let k = -0.5; k <= 0.5; k += 0.5) {
      lines.push(`M${fmt([a1[0] + k * 4, a1[1]])} Q${fmt([lerp(a1[0], a2[0], 0.5) + k * 9, lerp(a1[1], a2[1], 0.5)])} ${fmt([a2[0] + k * 14, a2[1] - 2])}`);
    }
  } else if (style === 'puff-top') {
    for (let k = -1; k <= 1; k++) lines.push(`M${fmt([a0[0] + k * 3, a0[1] - 2])} Q${fmt([a0[0] + k * 7, lerp(a0[1], a1[1], 0.4)])} ${fmt([lerp(a0[0], a1[0], 0.8) + k * 2, lerp(a0[1], a1[1], 0.85)])}`);
  } else {
    lines.push(`M${fmt(a0)} Q${fmt([lerp(a0[0], a1[0], 0.5) - 2, lerp(a0[1], a1[1], 0.5)])} ${fmt(a1)}`);
  }
  return (
    <g fill="none" stroke={tone(color, -0.32)} strokeWidth={0.55} opacity={0.5}>
      {lines.map((d, i) => <path key={i} d={d} />)}
    </g>
  );
}

/** Манжета: полоса по низу рукава. */
function cuffBand(s: SleeveOut, color: string, w = 3.4): ReactNode {
  const [l, m, r] = s.cuff;
  const dirx = m[0] - s.axis[s.axis.length - 2][0], diry = m[1] - s.axis[s.axis.length - 2][1];
  const len = Math.hypot(dirx, diry) || 1;
  const ux = dirx / len, uy = diry / len;
  const up = (p: Pt): Pt => [p[0] - ux * w, p[1] - uy * w];
  return <path d={smooth([up(l), l, m, r, up(r), up(m)], true)} fill={color} stroke={tone(color, -0.3)} strokeWidth={0.45} />;
}

/* ── Юбочные детали ────────────────────────────────────────────────────── */

function skirtFolds(rig: FigureRig, hem: number, hemHalf: number, color: string, count = 5, from = 0.3): ReactNode {
  const a = rig.anchors;
  const y0 = a.hip + (hem - a.hip) * from;
  return (
    <g fill="none" stroke={tone(color, -0.34)} strokeWidth={0.55} opacity={0.42}>
      {Array.from({ length: count }, (_, i) => {
        const k = ((i / (count - 1)) - 0.5) * 1.5;
        const x0 = X + k * rig.hipHalf * 0.75;
        const x1 = X + k * hemHalf * 0.85;
        return <path key={i} d={`M${r2(x0)} ${r2(y0)} Q${r2(lerp(x0, x1, 0.5) + (k > 0 ? 2 : -2))} ${r2(lerp(y0, hem, 0.55))} ${r2(x1)} ${r2(hem - 4)}`} />;
      })}
    </g>
  );
}

/** Пояс: лента по контуру талии + пряжка. */
function belt(rig: FigureRig, y: number, color: string, opts: { w?: number; buckle?: 'plate' | 'frame' | 'bar' | 'knot' | 'none'; add?: number } = {}): ReactNode {
  const w = opts.w ?? 5;
  const half = bodyHalf(rig, y, opts.add ?? 1.8);
  const top = smooth([[X - half, y - w / 2], [X - half * 0.5, y - w / 2 + 1.2], [X, y - w / 2 + 1.6], [X + half * 0.5, y - w / 2 + 1.2], [X + half, y - w / 2]]);
  const bottom = smooth([[X + half, y + w / 2], [X + half * 0.5, y + w / 2 + 1.2], [X, y + w / 2 + 1.6], [X - half * 0.5, y + w / 2 + 1.2], [X - half, y + w / 2]]).replace(/^M/, 'L');
  const d = `${top} ${bottom} Z`;
  const buckle = opts.buckle ?? 'plate';
  return (
    <g data-part="belt">
      <path d={d} fill={color} stroke={tone(color, -0.4)} strokeWidth={0.5} />
      <path d={top} fill="none" stroke={tone(color, 0.35)} strokeWidth={0.5} opacity={0.7} />
      {buckle === 'plate' && <rect x={X - 5} y={y - w / 2 - 1.2} width={10} height={w + 2.4} rx={1.2} fill={tone(color, 0.45)} stroke={tone(color, -0.45)} strokeWidth={0.5} />}
      {buckle === 'frame' && <rect x={X - 5} y={y - w / 2 - 1.2} width={10} height={w + 2.4} rx={0.6} fill="none" stroke={tone(color, 0.6)} strokeWidth={1.4} />}
      {buckle === 'bar' && <rect x={X - 6} y={y - 1.2} width={12} height={2.4} fill={tone(color, 0.5)} />}
      {buckle === 'knot' && (
        <g transform={`translate(${X} ${y})`}>
          <path d="M0 0C-7 -5 -11 2 -6 5C-2 6.5 0 2.5 0 0ZM0 0C7 -5 11 2 6 5C2 6.5 0 2.5 0 0Z" fill={color} stroke={tone(color, -0.35)} strokeWidth={0.45} />
          <ellipse rx="1.8" ry="2" fill={tone(color, -0.25)} />
        </g>
      )}
    </g>
  );
}

function buttons(x: number, y0: number, y1: number, n: number, color: string, r = 1.7): ReactNode {
  return (
    <g data-part="buttons">
      {Array.from({ length: n }, (_, i) => {
        const y = lerp(y0, y1, n === 1 ? 0.5 : i / (n - 1));
        return <g key={i}><circle cx={x} cy={y} r={r} fill={color} stroke={tone(color, -0.4)} strokeWidth={0.4} /><circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.3} fill={tone(color, 0.5)} opacity={0.7} /></g>;
      })}
    </g>
  );
}

/** Лацканы однобортного жакета. */
function lapels(rig: FigureRig, color: string, opts: { depth?: number; width?: number; notch?: boolean } = {}): ReactNode {
  const a = rig.anchors;
  const y0 = a.shoulder - 8;
  const depth = opts.depth ?? 40;
  const w = opts.width ?? 13;
  const lap = (s: number) => smooth([
    [X + s * 5, y0 - 1],
    [X + s * (w + 4), y0 + 6],
    [X + s * (w + 2), y0 + 12],
    [X + s * (w - 1), y0 + depth * 0.55],
    [X + s * 3, y0 + depth],
    [X + s * 1, y0 + depth - 6],
    [X + s * 2, y0 + 10],
  ], true);
  return (
    <g data-part="lapels">
      <path d={lap(-1)} fill={tone(color, 0.06)} stroke={tone(color, -0.42)} strokeWidth={0.55} />
      <path d={lap(1)} fill={tone(color, 0.06)} stroke={tone(color, -0.42)} strokeWidth={0.55} />
      {opts.notch !== false && [1, -1].map((s) => <path key={s} d={`M${X + s * (w + 4)} ${y0 + 6} L${X + s * (w + 8)} ${y0 + 2} L${X + s * (w + 1)} ${y0 - 1}`} fill={tone(color, 0.06)} stroke={tone(color, -0.42)} strokeWidth={0.55} />)}
    </g>
  );
}

/** Круглый плоский воротник (Питер Пэн / отложной). */
function flatCollar(nx: number, y0: number, color: string, spread = 9, drop = 13): ReactNode {
  const lobe = (s: number) => smooth([
    [X + s * 1.5, y0 + 1],
    [X + s * (nx * 0.55), y0 - 3],
    [X + s * (nx + spread), y0 + 3],
    [X + s * (nx + spread - 2), y0 + drop],
    [X + s * (nx * 0.6), y0 + drop + 3],
    [X + s * 1.5, y0 + 8],
  ], true);
  return (
    <g data-part="collar">
      <path d={lobe(-1)} fill={color} stroke={tone(color, -0.32)} strokeWidth={0.5} />
      <path d={lobe(1)} fill={color} stroke={tone(color, -0.32)} strokeWidth={0.5} />
    </g>
  );
}

/** Каскадное жабо. */
function jabot(y0: number, color: string, rows = 4): ReactNode {
  return (
    <g data-part="jabot">
      {Array.from({ length: rows }, (_, i) => {
        const y = y0 + 4 + i * 8.5;
        const w = 13 - i * 1.8;
        return <path key={i} d={`M${X - w} ${y} C${X - w * 0.6} ${y + 9} ${X + w * 0.6} ${y + 9} ${X + w} ${y} C${X + w * 0.5} ${y + 3.5} ${X - w * 0.5} ${y + 3.5} ${X - w} ${y} Z`} fill={color} stroke={tone(color, -0.25)} strokeWidth={0.45} />;
      })}
    </g>
  );
}

/** Фестончатая кромка (для воланов и оборок). */
function scallop(x0: number, x1: number, y: number, bumps: number, depth: number, bow = 0): string {
  const step = (x1 - x0) / bumps;
  let d = `M${r2(x0)} ${r2(y)}`;
  for (let i = 0; i < bumps; i++) {
    const t = (i + 0.5) / bumps;
    const yy = y + bow * Math.sin(Math.PI * t);
    d += ` Q${r2(x0 + step * (i + 0.5))} ${r2(yy + depth)} ${r2(x0 + step * (i + 1))} ${r2(y + bow * Math.sin(Math.PI * ((i + 1) / bumps)))}`;
  }
  return d;
}

/** Паттерны ткани. */
function pattern(uid: string, kind: string | undefined, accent: string): { id: string; def: ReactNode } | null {
  if (!kind || kind === 'none') return null;
  const id = `${uid}-pat`;
  const defs: Record<string, ReactNode> = {
    dots: <pattern id={id} width="5.5" height="5.5" patternUnits="userSpaceOnUse"><circle cx="2.7" cy="2.7" r="0.95" fill={accent} opacity="0.92" /></pattern>,
    plaid: <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(38)"><rect width="1.6" height="9" fill={accent} opacity="0.5" /><rect width="9" height="1.6" fill={accent} opacity="0.32" /></pattern>,
    herringbone: <pattern id={id} width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 3L3 0L6 3M0 6L3 3L6 6" fill="none" stroke={accent} strokeWidth="0.6" opacity="0.32" /></pattern>,
    leaf: <pattern id={id} width="9" height="9" patternUnits="userSpaceOnUse"><path d="M1 8 Q4 2 8 1 Q5 4 1 8Z" fill={accent} opacity="0.55" /><circle cx="7" cy="7" r="0.7" fill={accent} opacity="0.5" /></pattern>,
    floral: (
      <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse">
        <g opacity="0.9">
          <circle cx="4.5" cy="4.5" r="1.3" fill={accent} />
          {[0, 90, 180, 270].map((deg) => <ellipse key={deg} cx="4.5" cy="1.9" rx="0.95" ry="1.55" fill={accent} opacity="0.8" transform={`rotate(${deg} 4.5 4.5)`} />)}
        </g>
        <circle cx="11" cy="11" r="0.8" fill={accent} opacity="0.6" />
        <path d="M10.4 12.4 q-1.4 1.2 -2.6 1.2" stroke={accent} strokeWidth="0.45" fill="none" opacity="0.6" />
      </pattern>
    ),
  };
  return defs[kind] ? { id, def: defs[kind] } : null;
}

function fabric(uid: string, color: string): ReactNode {
  return (
    <>
      <linearGradient id={`${uid}-fab`} x1="0%" y1="0%" x2="100%" y2="20%">
        <stop offset="0" stopColor={tone(color, -0.16)} />
        <stop offset="0.34" stopColor={tone(color, 0.12)} />
        <stop offset="0.7" stopColor={color} />
        <stop offset="1" stopColor={tone(color, -0.24)} />
      </linearGradient>
      <linearGradient id={`${uid}-hemshade`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0" stopColor={tone(color, -0.5)} stopOpacity="0" />
        <stop offset="1" stopColor={tone(color, -0.5)} stopOpacity="0.5" />
      </linearGradient>
    </>
  );
}

/** Общий слой: корпус + паттерн + складки + тень у подола. */
function Body({ rig, uid, color, patId, o }: { rig: FigureRig; uid: string; color: string; patId?: string; o: Bodice }): ReactNode {
  const d = bodice(rig, o);
  const bow = o.hemBow ?? (o.hemHalf - rig.hipHalf) * 0.14 + 4;
  const clipId = `${uid}-bd-${o.hem}-${o.hemHalf}`;
  return (
    <g data-part="bodice">
      <defs><clipPath id={clipId}><path d={d} /></clipPath></defs>
      <path d={d} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.45)} strokeWidth={0.7} />
      {patId && <path d={d} fill={`url(#${patId})`} />}
      <g clipPath={`url(#${clipId})`}>
        {skirtFolds(rig, o.hem, o.hemHalf, color, o.flare === 'straight' ? 3 : 5)}
        <path d={`M${X - o.hemHalf} ${o.hem - 14} Q${X} ${o.hem - 8} ${X + o.hemHalf} ${o.hem - 14} L${X + o.hemHalf} ${o.hem} Q${X} ${o.hem + bow} ${X - o.hemHalf} ${o.hem} Z`} fill={`url(#${uid}-hemshade)`} />
      </g>
    </g>
  );
}

function Sleeves({ rig, uid, color, patId, opts, cuff, cuffColor, shade = true }: { rig: FigureRig; uid: string; color: string; patId?: string; opts: SleeveOpts; cuff?: number; cuffColor?: string; shade?: boolean }): ReactNode {
  return (
    <g data-part="sleeves">
      {rig.arms.map((arm) => {
        const s = sleeve(rig, arm, opts);
        return (
          <g key={arm.side}>
            <path d={s.body} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.45)} strokeWidth={0.6} />
            {patId && <path d={s.body} fill={`url(#${patId})`} />}
            {shade && sleeveShading(s, color, opts.style)}
            {cuff && cuffBand(s, cuffColor ?? tone(color, -0.2), cuff)}
          </g>
        );
      })}
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   НАРЯДЫ
   ══════════════════════════════════════════════════════════════════════════ */

type Draw = (ctx: ClothesRenderContext, item: ClothesDef) => ReactNode;

const greenWrap: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'wrap', neckHalf: 13, neckDrop: 34, hem: a.knee + 60, hemHalf: rig.hipHalf + 16, flare: 'godet' };
  return (
    <g>
      {/* рукава-пагода под корпусом */}
      <Sleeves rig={rig} uid={uid} color={color} opts={{ style: 'pagoda', len: 0.62 }} />
      <Body rig={rig} uid={uid} color={color} o={o} />
      {/* линия запаха и драпировка */}
      <path d={`M${X - 13} ${a.shoulder - 8} C${X - 8} ${a.chest + 6} ${X + 4} ${a.chest + 22} ${X + 8} ${a.waist - 2}`} stroke={tone(color, -0.45)} strokeWidth={0.9} fill="none" />
      {[0, 1, 2].map((i) => <path key={i} d={`M${X - 10 + i * 4} ${a.shoulder + 2 + i * 6} Q${X - 2 + i * 3} ${a.chest + 8 + i * 4} ${X + 6 + i * 2} ${a.waist - 6}`} stroke={tone(color, 0.18)} strokeWidth={0.5} fill="none" opacity={0.5} />)}
      {rig.arms.map((arm) => {
        const s = sleeve(rig, arm, { style: 'pagoda', len: 0.62 });
        const [l, m, r] = s.cuff;
        return <path key={arm.side} d={`M${fmt(l)} Q${fmt([m[0], m[1] + 6])} ${fmt(r)} L${fmt([r[0], r[1] - 3])} Q${fmt([m[0], m[1] + 2])} ${fmt([l[0], l[1] - 3])} Z`} fill={accent} stroke={tone(accent, -0.3)} strokeWidth={0.45} />;
      })}
      {/* широкий кушак с бантом на бедре */}
      <path d={smooth([[X - bodyHalf(rig, a.waist + 4, 2), a.waist - 2], [X, a.waist + 5], [X + bodyHalf(rig, a.waist + 4, 2), a.waist - 2], [X + bodyHalf(rig, a.waist + 14, 2), a.waist + 12], [X, a.waist + 19], [X - bodyHalf(rig, a.waist + 14, 2), a.waist + 12]], true)} fill={accent} stroke={tone(accent, -0.35)} strokeWidth={0.5} />
      <g transform={`translate(${X - rig.waistHalf + 2} ${a.waist + 10})`}>
        <path d="M0 0C-9 -7 -14 2 -8 6C-3 8 0 3 0 0ZM0 0C9 -7 14 2 8 6C3 8 0 3 0 0Z" fill={accent} stroke={tone(accent, -0.35)} strokeWidth={0.45} />
        <path d="M-1 4L-6 26M1 4L5 24" stroke={accent} strokeWidth={3} strokeLinecap="round" />
        <ellipse rx="2.2" ry="2.6" fill={tone(accent, -0.25)} />
      </g>
    </g>
  );
};

const tweedSuit: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const skirtHem = a.knee + 46;
  const skirt: Bodice = { neck: 'high', hem: skirtHem, hemHalf: rig.hipHalf + 6, flare: 'a-line' };
  const jacket: Bodice = { neck: 'deepv', neckHalf: 16, neckDrop: 52, hem: a.hip + 28, hemHalf: rig.hipHalf + 4, hemBow: 2, flare: 'straight', ease: 3, waistEase: 3 };
  return (
    <g>
      <defs>
        <pattern id={`${uid}-check`} width="5" height="5" patternUnits="userSpaceOnUse"><rect width="2.5" height="2.5" fill={tone(color, -0.22)} opacity="0.6" /><rect x="2.5" y="2.5" width="2.5" height="2.5" fill={tone(color, -0.22)} opacity="0.6" /></pattern>
      </defs>
      {/* юбка в клетку */}
      <path d={bodice(rig, skirt)} fill={tone(color, 0.06)} stroke={tone(color, -0.45)} strokeWidth={0.7} />
      <path d={bodice(rig, skirt)} fill={`url(#${uid}-check)`} />
      {/* рукава под жакетом */}
      <Sleeves rig={rig} uid={uid} color={color} patId={`${uid}-pat`} opts={{ style: 'fitted', len: 0.96, add: 4 }} cuff={3} />
      {/* широкая рубашка и крупный галстук — видны в широком вырезе */}
      <path d={smooth([[X - 16, a.shoulder - 9], [X - 14, a.chest + 34], [X + 14, a.chest + 34], [X + 16, a.shoulder - 9]], true)} fill="#f4f1ea" stroke="#c9c3b6" strokeWidth={0.5} />
      <path d={`M${X - 12} ${a.shoulder - 9} L${X - 4} ${a.shoulder + 6} L${X - 2} ${a.shoulder - 2} Z`} fill="#f4f1ea" stroke="#c9c3b6" strokeWidth={0.5} />
      <path d={`M${X + 12} ${a.shoulder - 9} L${X + 4} ${a.shoulder + 6} L${X + 2} ${a.shoulder - 2} Z`} fill="#f4f1ea" stroke="#c9c3b6" strokeWidth={0.5} />
      <path d={smooth([[X - 4.2, a.shoulder - 2], [X + 4.2, a.shoulder - 2], [X + 5.4, a.chest + 12], [X + 2.6, a.chest + 34], [X - 2.6, a.chest + 34], [X - 5.4, a.chest + 12]], true)} fill={accent} stroke={tone(accent, -0.35)} strokeWidth={0.45} />
      <path d={smooth([[X - 4.2, a.shoulder - 2], [X + 4.2, a.shoulder - 2], [X + 1.6, a.shoulder + 4], [X - 1.6, a.shoulder + 4]], true)} fill={tone(accent, 0.35)} stroke={tone(accent, -0.3)} strokeWidth={0.4} />
      <path d={`M${X - 1} ${a.shoulder + 5} L${X - 1} ${a.chest + 30}`} stroke={tone(accent, 0.4)} strokeWidth={0.6} opacity={0.6} />
      {/* жакет */}
      <path d={bodice(rig, jacket)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.45)} strokeWidth={0.7} />
      <path d={bodice(rig, jacket)} fill={`url(#${uid}-pat)`} />
      {/* клапаны карманов */}
      {[1, -1].map((s) => <path key={s} d={`M${X + s * (rig.hipHalf * 0.3)} ${a.hip - 2} l${s * 15} 0 l0 5.5 l${-s * 15} 0 Z`} fill={tone(color, -0.06)} stroke={tone(color, -0.45)} strokeWidth={0.5} />)}
      {lapels(rig, color, { depth: 54, width: 15 })}
      {belt(rig, a.waist + 2, accent, { w: 3.2, buckle: 'frame', add: 3 })}
      {buttons(X + 4, a.waist + 14, a.hip + 16, 2, tone(color, -0.4))}
    </g>
  );
};

const blueDots: Draw = ({ rig, uid, color, patId }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'round', neckHalf: 10, neckDrop: 8, hem: a.ankle - 14, hemHalf: rig.hipHalf + 14, flare: 'bias' };
  return (
    <g>
      <Sleeves rig={rig} uid={uid} color={color} patId={patId} opts={{ style: 'fitted', len: 0.97 }} />
      <Body rig={rig} uid={uid} color={color} patId={patId} o={o} />
      {/* шнуровка у горла */}
      <path d={`M${X - 5} ${a.shoulder - 2} L${X + 5} ${a.shoulder + 8} M${X + 5} ${a.shoulder - 2} L${X - 5} ${a.shoulder + 8} M${X - 4} ${a.shoulder + 10} L${X + 4} ${a.shoulder + 18} M${X + 4} ${a.shoulder + 10} L${X - 4} ${a.shoulder + 18}`} stroke={tone(color, -0.5)} strokeWidth={0.7} />
      <path d={`M${X - 3} ${a.shoulder + 19} q3 6 0 12 M${X + 3} ${a.shoulder + 19} q-3 6 0 12`} stroke={tone(color, -0.5)} strokeWidth={0.7} fill="none" />
      {belt(rig, a.waist, '#b82d33', { w: 3.6, buckle: 'bar' })}
    </g>
  );
};

const tieredFlounce: Draw = ({ rig, uid, color, accent, patId }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'v', neckHalf: 13, neckDrop: 58, hem: a.hip + 22, hemHalf: rig.hipHalf + 3, flare: 'straight', hemBow: 2 };
  // три яруса внахлёст: верх каждого спрятан под предыдущим слоем
  const tiers = [
    { top: a.hip + 14, bottom: a.hip + 52, halfTop: rig.hipHalf + 1, half: rig.hipHalf + 8 },
    { top: a.hip + 46, bottom: a.knee + 12, halfTop: rig.hipHalf + 6, half: rig.hipHalf + 13 },
    { top: a.knee + 6, bottom: a.knee + 58, halfTop: rig.hipHalf + 11, half: rig.hipHalf + 19 },
  ];
  const vY = a.shoulder + 25;
  const trimSide = (s: number) => {
    const p0: Pt = [X + s * 13, a.shoulder - 8];
    const p1: Pt = [X + s * 1.5, vY];
    const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
    const L = Math.hypot(dx, dy) || 1;
    const nx = (-dy / L) * s, ny = (dx / L) * s;
    const bumps = 5;
    let outer = `M${r2(p0[0] + nx * 2)} ${r2(p0[1] + ny * 2)}`;
    for (let i = 0; i < bumps; i++) {
      const t0 = i / bumps, t1 = (i + 0.5) / bumps, t2 = (i + 1) / bumps;
      outer += ` Q${r2(lerp(p0[0], p1[0], t1) + nx * 7)} ${r2(lerp(p0[1], p1[1], t1) + ny * 7)} ${r2(lerp(p0[0], p1[0], t2) + nx * 2)} ${r2(lerp(p0[1], p1[1], t2) + ny * 2)}`;
      void t0;
    }
    return `${outer} L${r2(p1[0])} ${r2(p1[1])} L${r2(p0[0])} ${r2(p0[1])} Z`;
  };
  return (
    <g>
      <Sleeves rig={rig} uid={uid} color={color} patId={patId} opts={{ style: 'fitted', len: 0.95 }} />
      {/* ярусы снизу вверх: нижний рисуется первым */}
      {[...tiers].reverse().map((t) => {
        const bumps = 8;
        const wave = scallop(X + t.half, X - t.half, t.bottom, bumps, 4, 3).replace(/^M[^Q]+/, '');
        const path = `M${r2(X - t.halfTop)} ${r2(t.top)} Q${X} ${r2(t.top + 3)} ${r2(X + t.halfTop)} ${r2(t.top)}`
          + ` C${r2(X + t.halfTop + 3)} ${r2(lerp(t.top, t.bottom, 0.45))} ${r2(X + t.half - 1)} ${r2(t.bottom - 9)} ${r2(X + t.half)} ${r2(t.bottom)}`
          + ` ${wave}`
          + ` C${r2(X - t.half + 1)} ${r2(t.bottom - 9)} ${r2(X - t.halfTop - 3)} ${r2(lerp(t.top, t.bottom, 0.45))} ${r2(X - t.halfTop)} ${r2(t.top)} Z`;
        return (
          <g key={t.top} data-part="tier">
            <path d={path} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.42)} strokeWidth={0.6} />
            {patId && <path d={path} fill={`url(#${patId})`} />}
            {Array.from({ length: bumps }, (_, k) => {
              const x0 = X - t.halfTop + ((k + 0.5) * t.halfTop * 2) / bumps;
              const x1 = X - t.half + ((k + 0.5) * t.half * 2) / bumps;
              return <path key={k} d={`M${r2(x0)} ${t.top + 4} Q${r2(lerp(x0, x1, 0.55))} ${r2(lerp(t.top, t.bottom, 0.55))} ${r2(x1)} ${t.bottom - 3}`} stroke={tone(color, -0.3)} strokeWidth={0.5} fill="none" opacity={0.38} />;
            })}
          </g>
        );
      })}
      <Body rig={rig} uid={uid} color={color} patId={patId} o={o} />
      {/* оборки-манжеты у кисти */}
      {rig.arms.map((arm) => {
        const s = sleeve(rig, arm, { style: 'fitted', len: 0.95 });
        const [l, m, r] = s.cuff;
        const n = s.axis.length;
        const dx = s.axis[n - 1][0] - s.axis[n - 2][0], dy = s.axis[n - 1][1] - s.axis[n - 2][1];
        const L0 = Math.hypot(dx, dy) || 1;
        const ox = dx / L0 * 7, oy = dy / L0 * 7;
        return <path key={arm.side} d={`M${fmt(l)} L${fmt(r)} L${r2(r[0] + ox)} ${r2(r[1] + oy)} Q${r2(m[0] + ox)} ${r2(m[1] + oy + 2)} ${r2(l[0] + ox)} ${r2(l[1] + oy)} Z`} fill={accent} stroke={tone(accent, -0.3)} strokeWidth={0.45} />;
      })}
      {/* глубокий вырез, отороченный оборками */}
      <path d={trimSide(-1)} fill={accent} stroke={tone(accent, -0.28)} strokeWidth={0.45} />
      <path d={trimSide(1)} fill={accent} stroke={tone(accent, -0.28)} strokeWidth={0.45} />
      {/* тёмный бант у основания выреза */}
      <g transform={`translate(${X} ${vY + 2})`}>
        <path d="M0 0C-8 -6 -13 2 -7 6C-2 8 0 3 0 0ZM0 0C8 -6 13 2 7 6C2 8 0 3 0 0Z" fill={tone(color, -0.3)} stroke={tone(color, -0.5)} strokeWidth={0.45} />
        <path d="M-1 4L-5 18M1 4L5 16" stroke={tone(color, -0.3)} strokeWidth={2.2} strokeLinecap="round" />
        <ellipse rx="2" ry="2.4" fill={tone(color, -0.45)} />
      </g>
    </g>
  );
};

const terracottaCoat: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const skirt: Bodice = { neck: 'high', hem: a.knee + 48, hemHalf: rig.hipHalf + 4, flare: 'straight' };
  const coat: Bodice = { neck: 'v', neckHalf: 13, neckDrop: 36, hem: a.knee - 6, hemHalf: rig.hipHalf + 12, ease: 3.4, waistEase: 3.4, flare: 'a-line', hemBow: 3 };
  return (
    <g>
      <path d={bodice(rig, skirt)} fill={tone(color, -0.12)} stroke={tone(color, -0.45)} strokeWidth={0.7} />
      <Sleeves rig={rig} uid={uid} color={color} opts={{ style: 'fitted', len: 0.96, add: 5 }} cuff={4} />
      <path d={bodice(rig, coat)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.5)} strokeWidth={0.8} />
      {skirtFolds(rig, a.knee - 6, rig.hipHalf + 12, color, 4, 0.15)}
      {/* борт и накладные карманы */}
      <path d={`M${X + 1} ${a.chest + 10} L${X + 1} ${a.knee - 8}`} stroke={tone(color, -0.45)} strokeWidth={1.2} />
      {[1, -1].map((s) => (
        <g key={s}>
          <rect x={X + s * (rig.hipHalf * 0.55) - 8} y={a.hip + 2} width={16} height={14} rx={1.5} fill={tone(color, -0.05)} stroke={tone(color, -0.45)} strokeWidth={0.55} />
          <path d={`M${X + s * (rig.hipHalf * 0.55) - 8} ${a.hip + 6} h16`} stroke={tone(color, -0.4)} strokeWidth={0.5} />
        </g>
      ))}
      {buttons(X - 3, a.chest + 22, a.hip - 6, 3, tone(color, -0.4), 1.9)}
      {/* большой отложной воротник */}
      {flatCollar(13, a.shoulder - 8, tone(color, 0.06), 14, 20)}
      {belt(rig, a.waist + 1, accent, { w: 5.5, buckle: 'frame', add: 3.4 })}
    </g>
  );
};

const terracottaOpen: Draw = ({ rig, uid, color }) => {
  const a = rig.anchors;
  const skirt: Bodice = { neck: 'high', hem: a.knee + 48, hemHalf: rig.hipHalf + 4, flare: 'straight' };
  const shirt: Bodice = { neck: 'round', neckHalf: 12, neckDrop: 10, hem: a.waist + 10, hemHalf: rig.waistHalf + 3, flare: 'straight', hemBow: 1, ease: 2.2, waistEase: 1.6 };
  const strip = (d: string) => d.replace(/^M[^C]+/, '');
  const panel = (s: number) => {
    const sh = Math.abs(rig.shoulders[1].x - X);
    const O0: Pt = [X + s * (sh + 1), a.shoulder - 1];
    const O1: Pt = [X + s * bodyHalf(rig, a.chest, 3.4), a.chest];
    const O2: Pt = [X + s * bodyHalf(rig, a.waist, 3.4), a.waist];
    const O3: Pt = [X + s * bodyHalf(rig, a.hip, 4.4), a.hip];
    const O4: Pt = [X + s * (rig.hipHalf + 12), a.knee - 6];
    const I0: Pt = [X + s * 14, a.shoulder - 8];
    const I1: Pt = [X + s * 20, a.chest + 10];
    const I2: Pt = [X + s * 26, a.waist + 6];
    const I3: Pt = [X + s * 30, a.knee - 6];
    return `M${fmt(I0)} L${fmt(O0)}${strip(smooth([O0, O1, O2, O3, O4]))} L${fmt(I3)}${strip(smooth([I3, I2, I1, I0]))} Z`;
  };
  return (
    <g>
      <path d={bodice(rig, skirt)} fill={tone(color, -0.12)} stroke={tone(color, -0.45)} strokeWidth={0.7} />
      <Sleeves rig={rig} uid={uid} color={color} opts={{ style: 'fitted', len: 0.96, add: 5 }} cuff={4} />
      {/* рубашка в тон пальто */}
      <path d={bodice(rig, shirt)} fill={tone(color, 0.1)} stroke={tone(color, -0.4)} strokeWidth={0.6} />
      {flatCollar(12, a.shoulder - 8, tone(color, 0.16), 9, 13)}
      {/* круглые накладные карманы на рубашке */}
      {[1, -1].map((s) => (
        <g key={s}>
          <circle cx={X + s * 15} cy={a.waist - 4} r={7.5} fill={tone(color, 0.14)} stroke={tone(color, -0.4)} strokeWidth={0.6} />
          <path d={`M${X + s * 15 - 7.5} ${a.waist - 7} Q${X + s * 15} ${a.waist - 3.5} ${X + s * 15 + 7.5} ${a.waist - 7}`} stroke={tone(color, -0.4)} strokeWidth={0.5} fill="none" />
          <circle cx={X + s * 15} cy={a.waist - 4} r={1.4} fill={tone(color, -0.45)} />
        </g>
      ))}
      {buttons(X, a.chest + 14, a.waist + 4, 3, tone(color, -0.4), 1.5)}
      {/* распахнутые полы пальто */}
      {[1, -1].map((s) => (
        <g key={s}>
          <path d={panel(s)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.5)} strokeWidth={0.8} />
          <path d={`M${X + s * 14} ${a.shoulder - 8} C${X + s * 20} ${a.chest + 10} ${X + s * 26} ${a.waist + 6} ${X + s * 30} ${a.knee - 6}`} stroke={tone(color, -0.45)} strokeWidth={1.6} fill="none" />
          <path d={`M${X + s * 17} ${a.shoulder - 2} C${X + s * 23} ${a.chest + 12} ${X + s * 28.5} ${a.waist + 8} ${X + s * 32} ${a.knee - 10}`} stroke={tone(color, 0.25)} strokeWidth={0.6} fill="none" opacity={0.6} />
          <rect x={X + s * (rig.hipHalf * 0.55) - 8} y={a.hip + 2} width={16} height={13} rx={1.5} fill={tone(color, -0.05)} stroke={tone(color, -0.45)} strokeWidth={0.55} />
        </g>
      ))}
    </g>
  );
};

const plaidBias: Draw = ({ rig, uid, color, accent, patId }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'v', neckHalf: 12, neckDrop: 30, hem: a.knee + 50, hemHalf: rig.hipHalf + 18, flare: 'bias' };
  const vY = a.shoulder + 9;
  const mY = vY + 6;
  return (
    <g>
      <Sleeves rig={rig} uid={uid} color={color} patId={patId} opts={{ style: 'fitted', len: 0.72 }} cuff={5} cuffColor="#fbfaf6" />
      <Body rig={rig} uid={uid} color={color} patId={patId} o={o} />
      {/* белая окантовка V-выреза */}
      <path d={`M${X - 12} ${a.shoulder - 8} L${X} ${vY} L${X + 12} ${a.shoulder - 8}`} fill="none" stroke="#fbfaf6" strokeWidth={2.6} strokeLinecap="round" />
      <path d={`M${X - 12} ${a.shoulder - 8} L${X} ${vY} L${X + 12} ${a.shoulder - 8}`} fill="none" stroke={tone(accent, -0.1)} strokeWidth={0.5} />
      {/* вышитая «M» боком: оба пика смотрят влево */}
      <path d={`M${X + 7} ${mY} L${X - 5} ${mY + 3.5} L${X + 1} ${mY + 7} L${X - 5} ${mY + 10.5} L${X + 7} ${mY + 14}`} fill="none" stroke={tone(accent, -0.25)} strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
      {buttons(X, mY + 20, mY + 29, 2, accent, 1.7)}
      {belt(rig, a.waist, accent, { w: 3, buckle: 'bar' })}
    </g>
  );
};

const batwingCoat: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'stand', neckHalf: 11, hem: a.ankle - 6, hemHalf: rig.hipHalf + 10, flare: 'straight', ease: 3, waistEase: 3 };
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-velvet`} x1="0%" y1="0%" x2="100%" y2="30%">
          <stop offset="0" stopColor={tone(color, -0.1)} /><stop offset="0.4" stopColor={tone(color, 0.32)} /><stop offset="0.75" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.2)} />
        </linearGradient>
      </defs>
      {/* рукава-пагода под корпусом: впритык до локтя, огромный раструб ниже */}
      {rig.arms.map((arm) => {
        const s = sleeve(rig, arm, { style: 'pagoda', len: 0.9, add: 4, flare: 1.55 });
        const [l, m, r] = s.cuff;
        return (
          <g key={arm.side}>
            <path d={s.body} fill={`url(#${uid}-velvet)`} stroke={tone(color, -0.5)} strokeWidth={0.7} />
            {sleeveShading(s, tone(color, 0.6), 'pagoda')}
            {/* атласный подбой, видный изнутри раструба */}
            <path d={`M${fmt(l)} Q${fmt([m[0], m[1] + 7])} ${fmt(r)} Q${fmt([m[0], m[1] + 1])} ${fmt(l)} Z`} fill={tone(accent, 0.15)} stroke={tone(color, -0.4)} strokeWidth={0.4} />
          </g>
        );
      })}
      <path d={bodice(rig, o)} fill={`url(#${uid}-velvet)`} stroke={tone(color, -0.5)} strokeWidth={0.8} />
      {[-0.55, -0.2, 0.2, 0.55].map((k, i) => <path key={i} d={`M${r2(X + k * rig.waistHalf)} ${a.waist + 10} Q${r2(X + k * rig.hipHalf * 1.15)} ${a.knee} ${r2(X + k * (rig.hipHalf + 6))} ${a.ankle - 12}`} stroke={tone(color, 0.3)} strokeWidth={0.7} fill="none" opacity={0.35} />)}
      {/* воротник-стойка */}
      <path d={smooth([[X - 12, a.shoulder - 18], [X, a.shoulder - 21], [X + 12, a.shoulder - 18], [X + 11, a.shoulder - 4], [X, a.shoulder - 1], [X - 11, a.shoulder - 4]], true)} fill={tone(color, 0.2)} stroke={tone(color, -0.5)} strokeWidth={0.6} />
      <path d={`M${X - 2} ${a.shoulder - 6} L${X - 2} ${a.ankle - 10}`} stroke={tone(color, -0.6)} strokeWidth={1} opacity={0.6} />
    </g>
  );
};

const nauticalJumper: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const cream = '#f3ecdd';
  const highWaist = a.waist - 14;
  const skirt: Bodice = { neck: 'high', hem: a.knee + 56, hemHalf: rig.hipHalf + 22, flare: 'a-line' };
  const top: Bodice = { neck: 'v', neckHalf: 11, neckDrop: 22, hem: highWaist + 4, hemHalf: rig.waistHalf + 3, flare: 'straight', hemBow: 1, ease: 2.6 };
  const topPath = bodice(rig, top);
  const bowC = tone(color, -0.08);
  return (
    <g>
      <defs><clipPath id={`${uid}-top`}><path d={topPath} /></clipPath></defs>
      {/* юбка с завышенной талией */}
      <path d={bodice(rig, skirt)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.45)} strokeWidth={0.7} />
      {skirtFolds(rig, a.knee + 56, rig.hipHalf + 22, color, 6, 0.1)}
      {/* рукава джемпера под лифом */}
      {rig.arms.map((arm) => {
        const s = sleeve(rig, arm, { style: 'fitted', len: 0.96, add: 3 });
        return (
          <g key={arm.side}>
            <path d={s.body} fill={cream} stroke="#c6bda9" strokeWidth={0.6} />
            <defs><clipPath id={`${uid}-sl-${arm.side}`}><path d={s.body} /></clipPath></defs>
            <g clipPath={`url(#${uid}-sl-${arm.side})`}>
              {[0, 1, 2, 3].map((i) => <rect key={i} x={X - 90} y={a.shoulder + 6 + i * 7} width={180} height={3} fill={i % 2 ? color : accent} opacity={0.9} />)}
            </g>
            {cuffBand(s, color, 3)}
          </g>
        );
      })}
      {/* джемпер */}
      <path d={topPath} fill={cream} stroke="#c6bda9" strokeWidth={0.6} />
      <g clipPath={`url(#${uid}-top)`}>
        {[0, 1, 2, 3].map((i) => <rect key={i} x={X - 60} y={a.shoulder + 6 + i * 7} width={120} height={3} fill={i % 2 ? color : accent} opacity={0.9} />)}
      </g>
      {/* высокий пояс юбки */}
      <path d={smooth([[X - rig.waistHalf - 1, highWaist - 3], [X, highWaist], [X + rig.waistHalf + 1, highWaist - 3], [X + rig.waistHalf + 1, highWaist + 5], [X, highWaist + 8], [X - rig.waistHalf - 1, highWaist + 5]], true)} fill={tone(color, 0.12)} stroke={tone(color, -0.45)} strokeWidth={0.5} />
      {/* большой синий бант на талии */}
      <g transform={`translate(${X} ${highWaist + 2})`}>
        <path d="M0 0C-13 -10 -22 0 -14 6C-8 10 0 4 0 0ZM0 0C13 -10 22 0 14 6C8 10 0 4 0 0Z" fill={bowC} stroke={tone(bowC, -0.4)} strokeWidth={0.6} />
        <path d="M-2 4L-9 26M2 4L8 24" stroke={bowC} strokeWidth={3.4} strokeLinecap="round" />
        <ellipse rx="2.8" ry="3.2" fill={tone(bowC, -0.3)} stroke={tone(bowC, -0.5)} strokeWidth={0.4} />
      </g>
      {buttons(X, a.shoulder + 10, highWaist - 8, 3, color, 1.6)}
      {flatCollar(11, a.shoulder - 8, '#fbfaf6', 8, 12)}
    </g>
  );
};

const satinEvening: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'round', neckHalf: 13, neckDrop: 14, hem: a.floor, hemHalf: rig.hipHalf + 16, flare: 'bias' };
  const sh = Math.abs(rig.shoulders[1].x - X);
  // пелерина: накидка от горла через плечи до локтя, спереди — острые концы
  const capelet = (s: number) => {
    const arm = rig.arms.find((x) => x.side === s)!;
    const elb = pt(between(arm.shoulder, arm.elbow, 0.95));
    return smooth([
      [X, a.shoulder - 10],
      [X + s * 12, a.shoulder - 11],
      [X + s * (sh + 7), a.shoulder - 2],
      [elb[0] + s * 11, elb[1] + 2],
      [elb[0] + s * 5, elb[1] + 12],
      [X + s * 20, a.chest + 22],
      [X + s * 11, a.chest + 34],
      [X + s * 4, a.chest + 20],
      [X, a.chest + 24],
    ], true);
  };
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-satin`} x1="0%" y1="0%" x2="100%" y2="25%">
          <stop offset="0" stopColor={tone(color, -0.05)} /><stop offset="0.28" stopColor={tone(accent, 0.25)} /><stop offset="0.5" stopColor={color} /><stop offset="0.82" stopColor={tone(accent, 0.05)} /><stop offset="1" stopColor={tone(color, -0.2)} />
        </linearGradient>
      </defs>
      <path d={bodice(rig, o)} fill={`url(#${uid}-satin)`} stroke={tone(color, -0.5)} strokeWidth={0.7} />
      {/* атласные блики */}
      <path d={`M${X - 10} ${a.chest + 20} C${X - 4} ${a.waist} ${X - 12} ${a.hip + 40} ${X - 6} ${a.knee + 40}`} stroke={tone(accent, 0.7)} strokeWidth={2.8} fill="none" opacity={0.28} />
      <path d={`M${X + 12} ${a.waist} C${X + 6} ${a.hip + 20} ${X + 14} ${a.knee} ${X + 10} ${a.ankle - 10}`} stroke={tone(accent, 0.7)} strokeWidth={2} fill="none" opacity={0.2} />
      <path d={`M${X - rig.hipHalf - 14} ${a.floor - 10} Q${X} ${a.floor + 4} ${X + rig.hipHalf + 14} ${a.floor - 10}`} stroke={tone(accent, 0.75)} strokeWidth={1.4} fill="none" opacity={0.35} />
      {/* пелерина: складки от плеча и фестоны по нижнему краю */}
      {[1, -1].map((s) => {
        const arm = rig.arms.find((x) => x.side === s)!;
        const elb = pt(between(arm.shoulder, arm.elbow, 0.95));
        return (
          <g key={s}>
            <path d={capelet(s)} fill={`url(#${uid}-satin)`} stroke={tone(color, -0.5)} strokeWidth={0.65} />
            {[0.25, 0.45, 0.65, 0.85].map((t, i) => (
              <path key={i} d={`M${r2(X + s * lerp(6, sh + 2, t))} ${a.shoulder - 8} Q${r2(X + s * lerp(10, sh + 10, t))} ${r2(a.chest)} ${r2(X + s * lerp(8, sh + 8, t))} ${r2(elb[1] + 6)}`} stroke={tone(accent, 0.5)} strokeWidth={0.7} fill="none" opacity={0.45} />
            ))}
            {[0, 1, 2].map((i) => {
              const bx = elb[0] + s * (7 - i * 7);
              const by = elb[1] + 10 - i * 1.5;
              return <path key={i} d={`M${r2(bx - 4)} ${r2(by)} Q${r2(bx)} ${r2(by + 4)} ${r2(bx + 4)} ${r2(by)}`} stroke={tone(accent, 0.55)} strokeWidth={0.8} fill="none" opacity={0.7} />;
            })}
          </g>
        );
      })}
    </g>
  );
};

const satinBolero: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'round', neckHalf: 13, neckDrop: 14, hem: a.floor, hemHalf: rig.hipHalf + 16, flare: 'bias' };
  // полы распахнутого болеро: от горла через плечо, закруглённый низ, открытый центр
  const panel = (s: number) => smooth([
    [X + s * 10, a.shoulder - 10],
    [X + s * (Math.abs(rig.shoulders[1].x - X) + 5), a.shoulder - 1],
    [X + s * (Math.abs(rig.shoulders[1].x - X) + 7), a.chest + 2],
    [X + s * 22, a.chest + 26],
    [X + s * 12, a.chest + 33],
    [X + s * 7, a.chest + 20],
    [X + s * 8, a.chest + 4],
  ], true);
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-satin`} x1="0%" y1="0%" x2="100%" y2="25%">
          <stop offset="0" stopColor={tone(color, -0.05)} /><stop offset="0.28" stopColor={tone(accent, 0.25)} /><stop offset="0.5" stopColor={color} /><stop offset="0.82" stopColor={tone(accent, 0.05)} /><stop offset="1" stopColor={tone(color, -0.2)} />
        </linearGradient>
      </defs>
      <Sleeves rig={rig} uid={uid} color={color} opts={{ style: 'fitted', len: 0.62 }} />
      <path d={bodice(rig, o)} fill={`url(#${uid}-satin)`} stroke={tone(color, -0.5)} strokeWidth={0.7} />
      <path d={`M${X - 10} ${a.chest + 20} C${X - 4} ${a.waist} ${X - 12} ${a.hip + 40} ${X - 6} ${a.knee + 40}`} stroke={tone(accent, 0.7)} strokeWidth={2.8} fill="none" opacity={0.28} />
      <path d={`M${X - rig.hipHalf - 14} ${a.floor - 10} Q${X} ${a.floor + 4} ${X + rig.hipHalf + 14} ${a.floor - 10}`} stroke={tone(accent, 0.75)} strokeWidth={1.2} fill="none" opacity={0.35} />
      {[1, -1].map((s) => (
        <g key={s}>
          <path d={panel(s)} fill={`url(#${uid}-satin)`} stroke={tone(color, -0.5)} strokeWidth={0.65} />
          <path d={`M${X + s * 10} ${a.shoulder - 10} C${X + s * 8} ${a.chest + 4} ${X + s * 9} ${a.chest + 22} ${X + s * 12} ${a.chest + 33}`} stroke={tone(accent, 0.6)} strokeWidth={0.9} fill="none" opacity={0.7} />
        </g>
      ))}
    </g>
  );
};

const mintTea: Draw = ({ rig, uid, color, patId }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'round', neckHalf: 12, neckDrop: 12, hem: a.knee + 52, hemHalf: rig.hipHalf + 16, flare: 'a-line' };
  return (
    <g>
      {/* двойные воланы на плечах под корпусом */}
      {rig.arms.map((arm) => {
        const s1 = sleeve(rig, arm, { style: 'wing', len: 0.3, add: 2 });
        const s2 = sleeve(rig, arm, { style: 'wing', len: 0.2, add: 1 });
        return (
          <g key={arm.side}>
            <path d={s1.body} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.45)} strokeWidth={0.6} />
            {patId && <path d={s1.body} fill={`url(#${patId})`} />}
            {sleeveShading(s1, color, 'wing')}
            <path d={s2.body} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.45)} strokeWidth={0.6} />
            {patId && <path d={s2.body} fill={`url(#${patId})`} />}
          </g>
        );
      })}
      <Body rig={rig} uid={uid} color={color} patId={patId} o={o} />
      {belt(rig, a.waist, tone(color, -0.35), { w: 4, buckle: 'plate' })}
      <path d={`M${X - 12} ${a.shoulder - 8} Q${X} ${a.shoulder + 8} ${X + 12} ${a.shoulder - 8}`} stroke={tone(color, -0.45)} strokeWidth={0.7} fill="none" />
    </g>
  );
};

const cobaltDay: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'v', neckHalf: 12, neckDrop: 30, hem: a.ankle - 20, hemHalf: rig.hipHalf + 12, flare: 'godet' };
  return (
    <g>
      <Sleeves rig={rig} uid={uid} color={color} opts={{ style: 'fitted', len: 0.8 }} cuff={5} cuffColor={tone(color, -0.25)} />
      <Body rig={rig} uid={uid} color={color} o={o} />
      {/* болеро-эффект: горизонтальный шов под грудью */}
      <path d={`M${X - bodyHalf(rig, a.chest + 22, 1.8)} ${a.chest + 22} Q${X} ${a.chest + 26} ${X + bodyHalf(rig, a.chest + 22, 1.8)} ${a.chest + 22}`} stroke={tone(color, -0.45)} strokeWidth={0.9} fill="none" />
      {/* синий воротник-стойка с пуговкой */}
      <path d={smooth([[X - 13, a.shoulder - 13], [X, a.shoulder - 15.5], [X + 13, a.shoulder - 13], [X + 12, a.shoulder - 4], [X, a.shoulder - 1.5], [X - 12, a.shoulder - 4]], true)} fill={tone(color, 0.08)} stroke={tone(color, -0.45)} strokeWidth={0.6} />
      <circle cx={X} cy={a.shoulder - 6} r={2} fill={accent} stroke={tone(accent, -0.35)} strokeWidth={0.45} />
      {/* белое жабо на животе */}
      {jabot(a.chest + 30, accent, 4)}
      {belt(rig, a.waist, tone(color, -0.3), { w: 4, buckle: 'frame' })}
    </g>
  );
};

const peplumDinner: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const skirt: Bodice = { neck: 'high', hem: a.knee + 44, hemHalf: rig.hipHalf + 1, flare: 'straight' };
  const jacket: Bodice = { neck: 'stand', neckHalf: 11, hem: a.waist + 6, hemHalf: rig.waistHalf + 2, flare: 'straight', hemBow: 1, shoulderAdd: 4, shoulderLift: 2, ease: 2.6, waistEase: 1.4 };
  return (
    <g>
      <path d={bodice(rig, skirt)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.5)} strokeWidth={0.7} />
      <path d={`M${X} ${a.hip + 40} L${X} ${a.knee + 42}`} stroke={tone(color, 0.25)} strokeWidth={0.6} opacity={0.5} />
      {/* рукава с буфом у плеча под жакетом */}
      <Sleeves rig={rig} uid={uid} color={color} opts={{ style: 'puff-top', len: 0.96 }} cuff={3} />
      <path d={bodice(rig, jacket)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.5)} strokeWidth={0.7} />
      {/* баска поверх низа жакета */}
      <path d={smooth([[X - rig.waistHalf - 1, a.waist + 2], [X, a.waist + 5], [X + rig.waistHalf + 1, a.waist + 2], [X + rig.hipHalf + 9, a.hip + 6], [X + rig.hipHalf * 0.5, a.hip + 10], [X, a.hip + 9], [X - rig.hipHalf * 0.5, a.hip + 10], [X - rig.hipHalf - 9, a.hip + 6]], true)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.5)} strokeWidth={0.7} />
      {[-0.7, -0.35, 0, 0.35, 0.7].map((k, i) => <path key={i} d={`M${r2(X + k * rig.waistHalf)} ${a.waist + 6} L${r2(X + k * (rig.hipHalf + 8))} ${a.hip + 6}`} stroke={tone(color, 0.28)} strokeWidth={0.5} opacity={0.5} />)}
      {/* стойка и брошь */}
      <path d={smooth([[X - 11, a.shoulder - 16], [X, a.shoulder - 19], [X + 11, a.shoulder - 16], [X + 10, a.shoulder - 5], [X, a.shoulder - 2], [X - 10, a.shoulder - 5]], true)} fill={tone(color, 0.16)} stroke={tone(color, -0.5)} strokeWidth={0.6} />
      <circle cx={X} cy={a.shoulder + 4} r={3.6} fill={accent} stroke={tone(accent, -0.4)} strokeWidth={0.5} />
      <circle cx={X} cy={a.shoulder + 4} r={1.4} fill={tone(accent, 0.5)} />
      <path d={`M${X + 1} ${a.shoulder + 8} L${X + 1} ${a.waist + 2}`} stroke={tone(color, 0.3)} strokeWidth={0.8} opacity={0.6} />
      {belt(rig, a.waist + 2, tone(color, -0.1), { w: 3.6, buckle: 'bar', add: 2.6 })}
    </g>
  );
};

const burgundyWool: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'stand', neckHalf: 11, hem: a.knee + 46, hemHalf: rig.hipHalf + 3, flare: 'straight', shoulderAdd: 4, shoulderLift: 1.5, ease: 2.4, waistEase: 1.2 };
  const sh = Math.abs(rig.shoulders[1].x - X);
  return (
    <g>
      <Sleeves rig={rig} uid={uid} color={color} opts={{ style: 'fitted', len: 0.97, add: 3 }} cuff={3} />
      <Body rig={rig} uid={uid} color={color} o={o} />
      {/* шлица юбки */}
      <path d={`M${X} ${a.knee + 10} L${X} ${a.knee + 44}`} stroke={tone(color, -0.5)} strokeWidth={0.9} />
      {/* чистый плечевой шов и защип на окате */}
      {[1, -1].map((s) => (
        <g key={s} fill="none">
          <path d={`M${X + s * 9} ${a.shoulder - 10} Q${X + s * (sh + 2)} ${a.shoulder - 9} ${X + s * (sh + 4)} ${a.shoulder + 1}`} stroke={tone(color, -0.5)} strokeWidth={1.1} />
          <path d={`M${X + s * (sh - 2)} ${a.shoulder - 4} L${X + s * (sh - 2)} ${a.shoulder + 8}`} stroke={tone(color, -0.35)} strokeWidth={0.6} opacity={0.7} />
        </g>
      ))}
      {/* стойка с косынкой */}
      <path d={smooth([[X - 12, a.shoulder - 17], [X, a.shoulder - 20], [X + 12, a.shoulder - 17], [X + 11, a.shoulder - 5], [X, a.shoulder - 2], [X - 11, a.shoulder - 5]], true)} fill={tone(color, 0.14)} stroke={tone(color, -0.5)} strokeWidth={0.6} />
      <path d={smooth([[X - 9, a.shoulder - 6], [X + 9, a.shoulder - 6], [X + 4, a.shoulder + 12], [X, a.shoulder + 20], [X - 4, a.shoulder + 12]], true)} fill={accent} stroke={tone(accent, -0.35)} strokeWidth={0.5} />
      <path d={`M${X - 5} ${a.shoulder - 2} Q${X} ${a.shoulder + 6} ${X + 5} ${a.shoulder - 2}`} stroke={tone(accent, -0.35)} strokeWidth={0.6} fill="none" />
      {belt(rig, a.waist, '#3b1b1e', { w: 8, buckle: 'frame' })}
    </g>
  );
};

const floralChiffon: Draw = ({ rig, uid, color, accent, patId }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'wrap', neckHalf: 13, neckDrop: 32, hem: a.knee + 58, hemHalf: rig.hipHalf + 20, flare: 'bias' };
  return (
    <g>
      <Sleeves rig={rig} uid={uid} color={color} patId={patId} opts={{ style: 'wing', len: 0.5, add: 2 }} />
      <Body rig={rig} uid={uid} color={color} patId={patId} o={o} />
      <path d={`M${X - 13} ${a.shoulder - 8} C${X - 6} ${a.chest + 4} ${X + 2} ${a.chest + 16} ${X + 6} ${a.waist - 2}`} stroke={tone(color, -0.45)} strokeWidth={0.8} fill="none" />
      {/* кушак с длинными концами */}
      {belt(rig, a.waist, tone(accent, -0.3), { w: 6, buckle: 'knot' })}
      <path d={`M${X - 2} ${a.waist + 4} Q${X - 10} ${a.hip + 20} ${X - 8} ${a.hip + 46} M${X + 2} ${a.waist + 4} Q${X + 8} ${a.hip + 22} ${X + 5} ${a.hip + 40}`} stroke={tone(accent, -0.3)} strokeWidth={3} strokeLinecap="round" fill="none" />
    </g>
  );
};

const palazzoSuit: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const white = '#f4f1e8';
  const hemY = a.floor - 4;
  const hemOut = rig.hipHalf + 26;
  const hemIn = 4;
  // единый контур брюк: торс от талии → бедро → штанины → промежность
  const half = (s: number): Pt[] => [
    [X + s * (rig.waistHalf + 1.4), a.waist - 12],
    [X + s * bodyHalf(rig, a.waist + (a.hip - a.waist) * 0.5, 2.2), a.waist + (a.hip - a.waist) * 0.5],
    [X + s * (rig.hipHalf + 3), a.hip],
    [X + s * (rig.hipHalf + 8), a.hip + 30],
    [X + s * lerp(rig.hipHalf + 8, hemOut, 0.5), lerp(a.hip + 30, hemY, 0.5)],
    [X + s * hemOut, hemY],
    [X + s * hemIn, hemY + 2],
    [X + s * (hemIn + 2), lerp(hemY, a.crotch, 0.5)],
    [X + s * 3, a.crotch + 4],
  ];
  const R = half(1);
  const L = half(-1).reverse();
  const trousers = smooth([...R, [X, a.crotch + 3], [X, a.crotch + 3], ...L], true);
  const jacket: Bodice = { neck: 'v', neckHalf: 12, neckDrop: 34, hem: a.chest + 40, hemHalf: bodyHalf(rig, a.chest + 40, 3), flare: 'straight', hemBow: 1, ease: 3, waistEase: 3 };
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-legs`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0" stopColor={tone(color, -0.18)} /><stop offset="0.35" stopColor={tone(color, 0.14)} /><stop offset="0.65" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.24)} />
        </linearGradient>
      </defs>
      <path d={trousers} fill={`url(#${uid}-legs)`} stroke={tone(color, -0.45)} strokeWidth={0.7} />
      {/* стрелки и заломы */}
      {rig.legs.map((leg) => {
        const s = leg.side;
        return (
          <g key={s} fill="none" stroke={tone(color, 0.16)} strokeWidth={0.6} opacity={0.4}>
            <path d={`M${r2(X + s * 14)} ${a.hip + 14} Q${r2(X + s * 16)} ${a.knee + 30} ${r2(X + s * 15)} ${hemY - 4}`} />
            <path d={`M${r2(X + s * 24)} ${a.hip + 20} Q${r2(X + s * 26)} ${a.knee + 40} ${r2(X + s * 26)} ${hemY - 4}`} />
          </g>
        );
      })}
      {/* рукава под жакетом */}
      <Sleeves rig={rig} uid={uid} color={color} opts={{ style: 'fitted', len: 0.96, add: 4 }} cuff={3} cuffColor={white} />
      {/* белая блуза до пояса — закрывает живот */}
      <path d={smooth([[X - 13, a.shoulder - 9], [X - 11, a.waist - 2], [X + 11, a.waist - 2], [X + 13, a.shoulder - 9]], true)} fill={white} stroke="#cdc7b8" strokeWidth={0.5} />
      {/* жакет */}
      <path d={bodice(rig, jacket)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.45)} strokeWidth={0.7} />
      {/* пояс брюк поверх низа блузы + ряды пуговиц на бёдрах */}
      <path d={smooth([[X - rig.waistHalf - 1.4, a.waist - 12], [X, a.waist - 9], [X + rig.waistHalf + 1.4, a.waist - 12], [X + rig.waistHalf + 1.6, a.waist - 2], [X, a.waist + 1], [X - rig.waistHalf - 1.6, a.waist - 2]], true)} fill={tone(color, -0.14)} stroke={tone(color, -0.45)} strokeWidth={0.55} />
      {[-1, 1].map((s) => <g key={s}>{buttons(X + s * (rig.waistHalf * 0.62), a.waist + 8, a.hip + 12, 3, white, 1.7)}</g>)}
      {/* белый кант по борту и низу жакета */}
      <path d={`M${X - 12} ${a.shoulder - 8} L${X - 2} ${a.chest + 26} L${X - 2} ${a.chest + 38} M${X + 12} ${a.shoulder - 8} L${X + 2} ${a.chest + 26} L${X + 2} ${a.chest + 38}`} stroke={white} strokeWidth={1.4} fill="none" />
      {buttons(X - rig.chestHalf * 0.55, a.chest + 8, a.chest + 34, 2, white, 1.8)}
      {buttons(X + rig.chestHalf * 0.55, a.chest + 8, a.chest + 34, 2, white, 1.8)}
      {/* алый шейный платок */}
      <g transform={`translate(${X} ${a.shoulder - 3})`}>
        <path d="M-9 -4 Q0 -8 9 -4 Q4 2 0 1 Q-4 2 -9 -4Z" fill={accent} stroke={tone(accent, -0.35)} strokeWidth={0.4} />
        <path d="M0 0C-8 -6 -13 2 -7 6C-2 8 0 3 0 0ZM0 0C8 -6 13 2 7 6C2 8 0 3 0 0Z" fill={accent} stroke={tone(accent, -0.35)} strokeWidth={0.4} />
        <path d="M-1.5 4L-5 18M1.5 4L5 16" stroke={accent} strokeWidth={2.6} strokeLinecap="round" />
        <ellipse rx="2" ry="2.4" fill={tone(accent, -0.25)} />
      </g>
    </g>
  );
};

const contrastTailored: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const skirt: Bodice = { neck: 'high', hem: a.knee + 40, hemHalf: rig.hipHalf + 1, flare: 'straight' };
  const jacket: Bodice = { neck: 'deepv', neckHalf: 12, neckDrop: 44, hem: a.hip + 6, hemHalf: rig.hipHalf + 3, flare: 'straight', hemBow: 1.5, ease: 3, waistEase: 2.2 };
  return (
    <g>
      <path d={bodice(rig, skirt)} fill={`url(#${uid}-fab)`} stroke="#b7ae9c" strokeWidth={0.7} />
      <path d={`M${X} ${a.hip + 10} L${X} ${a.knee + 38}`} stroke="#b7ae9c" strokeWidth={0.6} opacity={0.7} />
      <Sleeves rig={rig} uid={uid} color={color} opts={{ style: 'fitted', len: 0.96, add: 4 }} cuff={3} cuffColor={accent} />
      <path d={bodice(rig, jacket)} fill={`url(#${uid}-fab)`} stroke="#b7ae9c" strokeWidth={0.7} />
      {/* чёрный кант по лацканам, бортам и низу */}
      <path d={`M${X - 12} ${a.shoulder - 8} C${X - 3} ${a.chest + 10} ${X - 2} ${a.chest + 30} ${X - 2} ${a.hip + 5} M${X + 12} ${a.shoulder - 8} C${X + 3} ${a.chest + 10} ${X + 2} ${a.chest + 30} ${X + 2} ${a.hip + 5}`} stroke={accent} strokeWidth={2.2} fill="none" strokeLinecap="round" />
      <path d={`M${X - rig.hipHalf - 3} ${a.hip + 6} Q${X} ${a.hip + 9} ${X + rig.hipHalf + 3} ${a.hip + 6}`} stroke={accent} strokeWidth={2} fill="none" />
      {lapels(rig, color, { depth: 46, width: 13 })}
      {[1, -1].map((s) => <path key={s} d={`M${X + s * 5} ${a.shoulder - 9} C${X + s * 17} ${a.shoulder - 2} ${X + s * 15} ${a.chest + 14} ${X + s * 3} ${a.chest + 32}`} stroke={accent} strokeWidth={2.2} fill="none" strokeLinecap="round" />)}
      {buttons(X + 4, a.chest + 34, a.hip - 2, 3, accent, 2.2)}
    </g>
  );
};

const pinkGarden: Draw = ({ rig, uid, color, accent, patId }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'round', neckHalf: 12, neckDrop: 12, hem: a.knee + 54, hemHalf: rig.hipHalf + 20, flare: 'a-line' };
  return (
    <g>
      <Sleeves rig={rig} uid={uid} color={color} patId={patId} opts={{ style: 'puff-top', len: 0.6, add: 3 }} cuff={3} cuffColor={accent} />
      <Body rig={rig} uid={uid} color={color} patId={patId} o={o} />
      {/* оборки-рюши вдоль планки на груди */}
      {[-1, 1].map((s) => {
        let d = `M${X + s * 4} ${a.shoulder + 4}`;
        for (let i = 0; i < 5; i++) {
          const y0 = a.shoulder + 4 + i * 9;
          d += ` Q${r2(X + s * 10)} ${r2(y0 + 4.5)} ${r2(X + s * 4)} ${r2(y0 + 9)}`;
        }
        return <path key={s} d={d} stroke={accent} strokeWidth={2.4} fill="none" strokeLinecap="round" opacity={0.92} />;
      })}
      <path d={`M${X} ${a.shoulder + 2} L${X} ${a.waist - 4}`} stroke={tone(color, -0.35)} strokeWidth={0.6} />
      {flatCollar(12, a.shoulder - 8, accent, 7, 11)}
      {belt(rig, a.waist, '#5c8a5c', { w: 4.4, buckle: 'plate' })}
    </g>
  );
};

const sculptedSuit: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const skirt: Bodice = { neck: 'high', hem: a.knee + 40, hemHalf: rig.hipHalf + 1, flare: 'straight' };
  const jacket: Bodice = { neck: 'v', neckHalf: 12, neckDrop: 30, hem: a.hip + 20, hemHalf: rig.hipHalf + 3, flare: 'straight', hemBow: 1.5, shoulderAdd: 8, shoulderLift: 4, ease: 2.6, waistEase: 1.2 };
  return (
    <g>
      <path d={bodice(rig, skirt)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.5)} strokeWidth={0.7} />
      {/* рукава с сильным буфом у плеча под жакетом */}
      <Sleeves rig={rig} uid={uid} color={color} opts={{ style: 'puff-top', len: 0.96, add: 3 }} cuff={3} />
      <path d={bodice(rig, jacket)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.5)} strokeWidth={0.7} />
      {[1, -1].map((s) => <path key={s} d={`M${X + s * 8} ${a.shoulder - 13} Q${X + s * (Math.abs(rig.shoulders[1].x - X) + 6)} ${a.shoulder - 14} ${X + s * (Math.abs(rig.shoulders[1].x - X) + 9)} ${a.shoulder - 1}`} stroke={tone(color, -0.55)} strokeWidth={1.6} fill="none" />)}
      <path d={`M${X + 1} ${a.chest + 16} L${X + 1} ${a.hip + 18}`} stroke={tone(color, -0.5)} strokeWidth={1.2} />
      {buttons(X - 3, a.chest + 22, a.hip + 10, 3, tone(color, -0.5), 1.8)}
      {/* зелёный цветок у выреза */}
      <g transform={`translate(${X + 8} ${a.chest + 2})`}>
        {[0, 72, 144, 216, 288].map((deg) => <ellipse key={deg} cx="0" cy="-4.2" rx="2.4" ry="3.6" fill={accent} stroke={tone(accent, -0.3)} strokeWidth={0.35} transform={`rotate(${deg})`} />)}
        <circle r="2" fill={tone(accent, 0.4)} />
      </g>
      {belt(rig, a.waist, tone(color, -0.2), { w: 3.4, buckle: 'bar', add: 2.6 })}
    </g>
  );
};

const polkaPuffs: Draw = ({ rig, uid, color, accent, patId }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'round', neckHalf: 12, neckDrop: 12, hem: a.knee + 52, hemHalf: rig.hipHalf + 22, flare: 'a-line' };
  return (
    <g>
      <Sleeves rig={rig} uid={uid} color={color} patId={patId} opts={{ style: 'cap', len: 0.36, add: 3 }} cuff={3.6} cuffColor={accent} />
      <Body rig={rig} uid={uid} color={color} patId={patId} o={o} />
      <path d={`M${X} ${a.shoulder + 4} L${X} ${o.hem - 12}`} stroke={tone(color, -0.4)} strokeWidth={1} />
      {buttons(X, a.shoulder + 12, a.waist - 8, 4, accent, 1.5)}
      {buttons(X, a.waist + 10, o.hem - 14, 4, accent, 1.5)}
      {flatCollar(12, a.shoulder - 8, accent, 12, 16)}
      {belt(rig, a.waist, tone(color, -0.35), { w: 4, buckle: 'plate' })}
    </g>
  );
};

const royalFloral: Draw = ({ rig, uid, color, patId }) => {
  const a = rig.anchors;
  const o: Bodice = { neck: 'wrap', neckHalf: 13, neckDrop: 30, hem: a.knee + 50, hemHalf: rig.hipHalf + 20, flare: 'a-line' };
  return (
    <g>
      <Sleeves rig={rig} uid={uid} color={color} patId={patId} opts={{ style: 'wing', len: 0.28, add: 2 }} />
      <Body rig={rig} uid={uid} color={color} patId={patId} o={o} />
      <path d={`M${X - 13} ${a.shoulder - 8} C${X - 6} ${a.chest + 4} ${X + 2} ${a.chest + 14} ${X + 6} ${a.waist - 2}`} stroke={tone(color, -0.45)} strokeWidth={0.8} fill="none" />
      {/* встречная складка юбки */}
      <path d={`M${X - 5} ${a.hip + 6} L${X - 7} ${a.knee + 48} M${X + 5} ${a.hip + 6} L${X + 7} ${a.knee + 48}`} stroke={tone(color, -0.4)} strokeWidth={0.7} />
      {belt(rig, a.waist, tone(color, -0.32), { w: 6, buckle: 'frame' })}
    </g>
  );
};

const uberfrau: Draw = ({ rig, uid, color, accent }) => {
  const a = rig.anchors;
  const red = accent;
  const grey = '#8d8f95';
  const jacket: Bodice = { neck: 'stand', neckHalf: 11, hem: a.hip + 10, hemHalf: rig.hipHalf + 1, flare: 'straight', hemBow: 1, shoulderAdd: 3, shoulderLift: 1, ease: 1.2, waistEase: 0.4 };
  const stripM = (d: string) => d.replace(/^M[^C]+/, '');
  const breeches = (s: number) => {
    const leg = rig.legs.find((l) => l.side === s)!;
    const kx = leg.knee.x, ky = leg.knee.y, kw = leg.kneeWidth;
    const outer: Pt[] = [
      [X + s * (rig.waistHalf - 1), a.waist + 2],
      [X + s * (rig.hipHalf + 12), a.hip + 8],
      [X + s * (rig.hipHalf + 15), a.hip + 42],
      [kx + s * (kw + 5), ky - 12],
      [kx + s * (kw + 2), ky],
    ];
    const inner: Pt[] = [
      [kx - s * (kw - 1), ky],
      [X + s * 5, a.crotch + 38],
      [X + s * 2, a.waist + 2],
    ];
    return `M${fmt(outer[0])}${stripM(smooth(outer))} L${fmt(inner[0])}${stripM(smooth(inner))} Z`;
  };
  const boot = (s: number) => {
    const leg = rig.legs.find((l) => l.side === s)!;
    const o2 = leg.outer[2], i0 = leg.inner[0], o1 = leg.outer[1];
    return `M${r2(o1.d.x + s * 1.5)} ${r2(o1.d.y - 4)} C${r2(o2.b.x + s)} ${r2(o2.b.y)} ${r2(o2.c.x + s)} ${r2(o2.c.y)} ${r2(o2.d.x + s)} ${r2(o2.d.y)} L${r2(i0.a.x - s)} ${r2(i0.a.y)} C${r2(i0.b.x - s)} ${r2(i0.b.y)} ${r2(i0.c.x - s)} ${r2(i0.c.y)} ${r2(i0.d.x - s * 1.5)} ${r2(o1.d.y - 4)} Z`;
  };
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-leather`} x1="0%" y1="0%" x2="100%" y2="60%">
          <stop offset="0" stopColor={tone(color, 0.5)} /><stop offset="0.3" stopColor={tone(color, 0.1)} /><stop offset="0.7" stopColor={color} /><stop offset="1" stopColor={tone(color, 0.08)} />
        </linearGradient>
      </defs>
      {/* сапоги */}
      {rig.legs.map((leg) => (
        <g key={leg.side}>
          <path d={FOOT_OUTLINE} transform={leg.footTransform} fill={`url(#${uid}-leather)`} stroke={tone(color, -0.6)} strokeWidth={0.7} />
          <path d={boot(leg.side)} fill={`url(#${uid}-leather)`} stroke={tone(color, -0.6)} strokeWidth={0.8} />
          <path d={`M${r2(leg.knee.x - leg.side * (leg.kneeWidth + 2))} ${r2(leg.knee.y + 4)} Q${r2(leg.knee.x)} ${r2(leg.knee.y + 1)} ${r2(leg.knee.x + leg.side * (leg.kneeWidth + 3))} ${r2(leg.knee.y + 4)}`} stroke={tone(color, 0.5)} strokeWidth={1.4} fill="none" opacity={0.8} />
          <path d={`M${r2(leg.calf.x - leg.side * 4)} ${r2(leg.knee.y + 12)} Q${r2(leg.calf.x - leg.side * 3)} ${r2(leg.calf.y + 10)} ${r2(leg.ankle.x - leg.side * 2)} ${r2(leg.ankle.y - 6)}`} stroke={tone(color, 0.6)} strokeWidth={1.8} fill="none" opacity={0.4} />
        </g>
      ))}
      {/* бриджи-галифе с красным кантом */}
      {rig.legs.map((leg) => (
        <g key={leg.side}>
          <path d={breeches(leg.side)} fill={`url(#${uid}-fab)`} stroke={tone(color, -0.55)} strokeWidth={0.8} />
          <path d={`M${r2(X + leg.side * (rig.hipHalf + 4))} ${a.hip + 12} Q${r2(X + leg.side * (rig.hipHalf + 13))} ${a.hip + 40} ${r2(leg.knee.x + leg.side * (leg.kneeWidth + 2))} ${leg.knee.y - 8}`} stroke={red} strokeWidth={1.1} fill="none" opacity={0.9} />
        </g>
      ))}
      {/* кожаные рукава под кителем */}
      {rig.arms.map((arm) => {
        const s = sleeve(rig, arm, { style: 'fitted', len: 0.97, add: 3 });
        return <g key={arm.side}><path d={s.body} fill={`url(#${uid}-leather)`} stroke={tone(color, -0.6)} strokeWidth={0.6} />{cuffBand(s, tone(color, 0.2), 4)}<path d={`M${fmt(s.cuff[0])} Q${fmt([s.cuff[1][0], s.cuff[1][1] - 2])} ${fmt(s.cuff[2])}`} stroke={red} strokeWidth={0.9} fill="none" /></g>;
      })}
      {/* китель */}
      <path d={bodice(rig, jacket)} fill={`url(#${uid}-leather)`} stroke={tone(color, -0.6)} strokeWidth={0.9} />
      {/* перчатки */}
      {rig.arms.map((arm) => <path key={arm.side} d={HAND_OUTLINE} transform={arm.handTransform} fill={tone(color, -0.1)} stroke={tone(color, -0.6)} strokeWidth={0.6} />)}
      {/* портупея через правое плечо */}
      <path d={`M${X + 16} ${a.shoulder - 6} C${X + 4} ${a.chest + 20} ${X - 14} ${a.waist - 10} ${X - rig.waistHalf + 2} ${a.waist - 2}`} stroke={tone(color, -0.35)} strokeWidth={4.2} fill="none" strokeLinecap="round" />
      <path d={`M${X + 16} ${a.shoulder - 6} C${X + 4} ${a.chest + 20} ${X - 14} ${a.waist - 10} ${X - rig.waistHalf + 2} ${a.waist - 2}`} stroke={tone(color, 0.3)} strokeWidth={0.6} fill="none" opacity={0.6} />
      {/* планка с красным кантом */}
      <path d={`M${X + 1} ${a.shoulder - 3} L${X + 1} ${a.hip + 8}`} stroke={red} strokeWidth={1.1} opacity={0.95} />
      <path d={`M${X - 2} ${a.shoulder - 3} L${X - 2} ${a.hip + 8}`} stroke={tone(color, -0.6)} strokeWidth={1.4} />
      {buttons(X - 6, a.chest + 32, a.hip + 2, 3, grey, 1.5)}
      {/* Увеличенный партийный знак — тот же геометрический знак, что на бумагах Геббельса. */}
      <g transform={`translate(${X} ${a.chest + 10})`}>
        <circle r="22" fill={red} stroke={tone(red, -0.45)} strokeWidth={1.3} />
        <circle r="15.5" fill="#d2b477" stroke="#271811" strokeWidth={1.1} />
        <circle r="6.8" fill="#f2efe6" stroke="rgba(0,0,0,.3)" strokeWidth="0.5" />
        <g transform="rotate(45)" stroke="#302018" strokeWidth="1.9" fill="none" strokeLinecap="square">
          <path d="M-4.3 0 H4.3 M0 -4.3 V4.3" />
          <path d="M-4.3 0 v-3 M4.3 0 v3 M0 -4.3 h3 M0 4.3 h-3" />
        </g>
      </g>
      {/* высокий воротник-стойка с двумя молниями */}
      <path d={smooth([[X - 12, a.shoulder - 19], [X, a.shoulder - 22], [X + 12, a.shoulder - 19], [X + 11, a.shoulder - 3], [X, a.shoulder], [X - 11, a.shoulder - 3]], true)} fill={`url(#${uid}-leather)`} stroke={tone(color, -0.6)} strokeWidth={0.7} />
      <path d={smooth([[X - 12, a.shoulder - 19], [X, a.shoulder - 22], [X + 12, a.shoulder - 19]])} stroke={red} strokeWidth={1} fill="none" />
      {[-1, 1].map((s) => (
        <g key={s}>
          <path d={`M${X + s * 5} ${a.shoulder - 17} L${X + s * 5} ${a.shoulder - 4}`} stroke="#c9ccd4" strokeWidth={2.4} />
          {[0, 1, 2, 3, 4].map((i) => <path key={i} d={`M${X + s * 3.6} ${a.shoulder - 16 + i * 2.6} h${s * 2.8}`} stroke={tone(color, 0.75)} strokeWidth={1} />)}
          <rect x={X + s * 5 - 1.6} y={a.shoulder - 7} width={3.2} height={4.4} rx={0.6} fill="#dfe3e8" stroke={tone(color, -0.4)} strokeWidth={0.4} />
          <circle cx={X + s * 5} cy={a.shoulder - 2} r={1} fill="#dfe3e8" />
        </g>
      ))}
      {/* широкий ремень с двойной рамочной пряжкой и красным кантом */}
      <path d={smooth([[X - rig.waistHalf - 0.8, a.waist - 7], [X, a.waist - 4], [X + rig.waistHalf + 0.8, a.waist - 7], [X + rig.waistHalf + 1, a.waist + 8], [X, a.waist + 11], [X - rig.waistHalf - 1, a.waist + 8]], true)} fill={tone(color, 0.24)} stroke={tone(color, -0.55)} strokeWidth={0.7} />
      <path d={smooth([[X - rig.waistHalf, a.waist - 4.5], [X, a.waist - 1.5], [X + rig.waistHalf, a.waist - 4.5]])} stroke={tone(color, 0.55)} strokeWidth={0.7} fill="none" opacity={0.7} />
      <path d={smooth([[X - rig.waistHalf, a.waist - 6.2], [X, a.waist - 3.2], [X + rig.waistHalf, a.waist - 6.2]])} stroke={red} strokeWidth={1.2} fill="none" />
      <path d={smooth([[X - rig.waistHalf, a.waist + 7.2], [X, a.waist + 10.2], [X + rig.waistHalf, a.waist + 7.2]])} stroke={red} strokeWidth={1.2} fill="none" />
      <rect x={X - 11} y={a.waist - 7} width={22} height={16} rx={1.6} fill="none" stroke="#c9ccd2" strokeWidth={2.2} />
      <path d={`M${X} ${a.waist - 7} L${X} ${a.waist + 9}`} stroke="#c9ccd2" strokeWidth={2.2} />
      <circle cx={X} cy={a.waist + 1} r={2.6} fill={red} stroke={tone(red, -0.4)} strokeWidth={0.5} />
    </g>
  );
};

const DRAWERS: Record<string, Draw> = {
  'cloth-1931-green-wrap': greenWrap,
  'cloth-1931-tweed-suit': tweedSuit,
  'cloth-1931-blue-stole': blueDots,
  'cloth-1932-tiered-flounce': tieredFlounce,
  'cloth-1932-terracotta-ensemble': terracottaCoat,
  'cloth-1932-terracotta-open': terracottaOpen,
  'cloth-1932-plaid-bias': plaidBias,
  'cloth-1933-batwing-coat': batwingCoat,
  'cloth-1933-nautical-jumper': nauticalJumper,
  'cloth-1934-satin-evening': satinEvening,
  'cloth-1934-satin-bolero': satinBolero,
  'cloth-1934-mint-tea': mintTea,
  'cloth-1935-cobalt-day': cobaltDay,
  'cloth-1935-peplum-dinner': peplumDinner,
  'cloth-1936-burgundy-wool': burgundyWool,
  'cloth-1936-floral-chiffon': floralChiffon,
  'cloth-1937-palazzo-trousers': palazzoSuit,
  'cloth-1937-contrast-tailored': contrastTailored,
  'cloth-1937-pink-garden': pinkGarden,
  'cloth-1938-sculpted-sheath': sculptedSuit,
  'cloth-1938-polka-puffs': polkaPuffs,
  'cloth-1939-royal-floral': royalFloral,
  'cloth-1938-uberfrau-uniform': uberfrau,
};

/* ══════════════════════════════════════════════════════════════════════════
   КОМПОНЕНТ
   ══════════════════════════════════════════════════════════════════════════ */

export const Clothes = memo(function Clothes({ id, rig, skin, settings }: { id: string; rig: FigureRig; skin: string; settings?: ClothesSettings }) {
  const item = CLOTHES_BY_ID[id];
  const uid = `cloth-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  if (!item) return null;
  const color = settings?.clothesColor || item.color;
  const accent = settings?.clothesAccent || item.accent || tone(color, 0.4);
  const pat = pattern(uid, item.pattern, accent);
  const draw = DRAWERS[item.id];
  return (
    <g data-clothing={id} data-category={item.category}>
      <defs>
        {fabric(uid, color)}
        {pat?.def}
      </defs>
      {draw({ rig, skin, color, accent, uid, patId: pat?.id }, item)}
    </g>
  );
});

export default Clothes;
/* eof */

