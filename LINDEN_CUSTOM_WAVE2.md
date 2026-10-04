# ЗАДАНИЕ ДЛЯ AGENT MODE: ИНТЕГРАЦИЯ ВЫБРАННЫХ ПРИЧЁСОК И ГОЛОВНЫХ УБОРОВ

Ты работаешь в репозитории https://github.com/TheAlexashka/shiny-potato (Ателье Линден).
Пользователь выбрал 3 предметов для добавления в игру.

## ВЫБРАННЫЕ ПРЕДМЕТЫ (3 шт.):
1. [Причёска] Каре «тедди» (id: `hair-poster-1938-teddy-bob`)
2. [Причёска] Клин-каре (id: `hair-poster-1939-wedge-bob`)
3. [Причёска] Скульптурный глянец (id: `hair-poster-1940-sculpted-sleek`)

---

## ПРАВИЛА ИНТЕГРАЦИИ:
1. НЕ ПЕРЕПИСЫВАЙ существующие файлы игры (App.tsx, Face.tsx, Hair.tsx, data/types.ts).
2. Создай приложенные файлы в папках `src/features/...` и `src/components/HeadStubble.tsx`.
3. Зарегистрируй выбранные предметы в `src/data/items.tsx`, импортируя их массивы:
   - `POSTER_ITEMS` из `../features/poster1930/items`

4. ⚠️ **ПО СТЕРНЕ НА ГОЛОВЕ:** Стерня находится в компоненте `src/components/HeadStubble.tsx`.
   Вставь его в `Face.tsx` (или `Head.tsx`) **СРАЗУ ПОСЛЕ заливки кожи головы и ДО бровей/глаз/волос!**
   Не вставляй стерню в `Hair.tsx`. Подробный гайд: `src/features/stubble/STUBBLE_GUIDE.md`.


---

# ИНСТРУКЦИИ И ГАЙДЫ

## src/features/poster1930/README.md

# poster1930 — женская коллекция 1930–1940

Изолированный бандл: движок (`engine.ts`), 16 дизайнов (`designs.ts`),
рендер (`PosterHair.tsx`), 15 уборов (`PosterHeadwear.tsx`), каталог
(`items.tsx`), проверки (`checks.ts`).

## Соответствие листу

| id | рисунок | примечание |
| --- | --- | --- |
| hair-poster-1936-marcel | ряд 1, п.1 | четыре ряда марсельских волн |
| hair-poster-1936-finger-waves | ряд 1, п.2 | S-волны на висках |
| hair-poster-1937-crescent-bob | ряд 1, п.3 | дуга-полумесяц по лбу |
| hair-poster-1937-shell-curls | ряд 1, п.4 | плоские завитки-чехлы |
| hair-poster-1937-side-part-roll | ряд 1, п.5 | асимметричный ролл |
| hair-poster-1938-tea-waves | ряд 2, п.6 | каскад C-волн |
| hair-poster-1938-doll-pomp | ряд 2, п.7 | под кукольную шапочку |
| hair-poster-1938-teddy-bob | ряд 2, п.8 | фестончатое каре |
| hair-poster-1938-twin-waves | ряд 2, п.9 | двойная волна на лбу |
| hair-poster-1939-pompadour | ряд 3, п.10 | высокий купол |
| hair-poster-1939-cossack-curls | ряд 3, п.11 | под папаху |
| hair-poster-1939-quill-waves | ряд 3, п.12 | под плюшевый ток |
| hair-poster-1939-snood-rolls | ряд 3, п.13 | под бархатный снуд |
| hair-poster-1939-wedge-bob | ряд 3, п.14 | клин на глаз |
| hair-poster-1940-sculpted-sleek | ряд 3, п.15 | глянцевый зачёс |
| hair-poster-1938-braided-coils | Überfrau | вертикальные косы-петли в анфас |

Снуд на листе один, подпись даёт три материала: cord / ribbon / chenille —
отсюда три варианта снуда. Шейные платки шапками не считались; клошей,
беретов и тюрбанов «кроме шёлкового» в этом референсе нет. Знаки различия
намеренно не переносились. Ракурсы с профилей — художественная адаптация.

## Происхождение геометрии (важно для agent mode)

`engine.ts` (конические ленты, `roll`, `braid`, `braidLoop`), `PosterHair.tsx`,
`PosterHeadwear.tsx` (15 уборов с полной прорисовкой: каракуль, солома,
перья, вимпл, сетки снудов) и `items.tsx` — исходники предыдущих сессий.
`types.ts` и `designs.ts` (16 контуров причёсок) восстановлены по этим
контрактам: `CurlSpec` с `kind: 'pin'`, поверхности с `transform`, поле
`caption`, пары «укладка ↔ recommendedHeadwear». Изображения листа в
проекте нет, поэтому контуры причёсок — авторская адаптация по описаниям,
а не трассировка; при наличии оригинального `designs.ts` он заменяется
без правок остального (`checkPosterCollection()` должна остаться зелёной).

Состав набора здесь намеренно другой, чем в старом портретном демо
(`src/lib/hairDesigns.ts` + `src/components/Headwear.tsx`): там свои
ID (`hair-thirties-curls`, `hat-cloche`…), свой движок завитков и свои
9 уборов. Это два независимых набора, они не смешиваются.


---

## src/features/poster1930/AGENT_MODE.md

# AGENT_MODE — женская коллекция по постеру 1930–1940

## Задание
Встроить 16 причёсок `hair-poster-*` и 15 уборов/аксессуаров в настоящую игру
«Ателье Линден» (https://github.com/TheAlexashka/shiny-potato), не подменяя
существующие файлы игры.

## Безопасная интеграция
1. Скопировать папку `src/features/poster1930/` как есть. Она не импортирует
   старый `Hair.tsx`, `FaceSel` или `utils/curl` демо (только автономный
   `src/utils/curl.ts`, который тоже входит в пакет).
2. Прочитать реальный `Item` и `FaceSel` игры. `POSTER_ITEMS` (структурное
   подмножество Item с `back`/`render`) зарегистрировать через
   `satisfies Item[]` после `assertNoPosterCollisions(existing)` —
   ДОБАВИТЬ записи, не заменять старые.
3. `FaceSel` расширять необязательными полями (`curlTightness`, `curlVolume`,
   `hairSheen`, `posterHairColor`…), а не копировать заглушку демо.
4. `PosterHair` наследует `var(--hair)`: без `posterHairColor` рисует базовым
   тоном. При изменении старой палитры очищать `posterHairColor` и
   `posterHairSecondary`, если пользователь установил их в новом интерфейсе.

## Головные уборы
- `applyFit` у `PosterHeadwear` по умолчанию **false**: `ItemArt` исходной
  игры уже применяет `hatFitTransform`. Нельзя поворачивать/масштабировать
  дважды. Диапазон `hatRotation` 0..360, `hatScale` действует по обеим осям.
- `posterHatColor` / `posterRibbonColor` по умолчанию `undefined` — каждый
  убор рисуется авторским материалом (солома, каракуль, красный карбункул).
- Карбункул `acc-poster-carbuncle` — категория `accessories`: надевается
  ОДНОВРЕМЕННО со шляпой или очками.

## Приёмка
- [ ] `vite build` проходит, `checkPosterCollection()` — все проверки зелёные
- [ ] старые причёски и одежда до/после не изменились
- [ ] посадка на исходную голову, миниатюры и bbox корректны
- [ ] сохранения и разрешение CSS-переменных при экспорте игры

CURLS_INTEGRATION.md — предыдущий прототип, для этой коллекции НЕ использовать.


---

## src/features/stubble/STUBBLE_GUIDE.md

# Гайд по стерни — подключение `HeadStubble.tsx` в игру

## Правило одно
Стерня — **третий слой головы**, не парик. Она рисуется на кожу черепа
и обрезается ТОТ ЖЕ путь `headPath`, что и заливка кожи.

## Порядок в Face.tsx / Head.tsx

```tsx
{/* 1) кожа черепа */}
<path d={headPath} fill={skin} />

{/* 2) СРАЗУ ПОСЛЕ кожи и ДО бровей/глаз/волос — стерня */}
<HeadStubble
  headPath={headPath}          // ТОТ ЖЕ path, что у заливки кожи
  preset={item.preset}         // 'heydrich' | 'undercut' | 'clipper-crop' | 'himmler' | 'temples' | 'custom'
  zones={item.zones}           // для preset='custom'; в men3040 отдаёт item.scalp({ face, head })
  hairColor="var(--hair)"
  density={100}
  length={menStubbleLength}    // 50..175, относительная длина штриха
/>

{/* 3) брови, глаза, нос, губы */}
{/* 4) волосы (Hair.tsx) — стерня уже под ними */}
```

## Не делать
- НЕ вставлять `<HeadStubble>` в Hair.tsx.
- НЕ передавать другой path: маска должна совпадать с заливкой кожи 1-в-1.
- НЕ читать hairFront/BackWidth/Height — стерня к ним не привязана.

## Пресеты
| preset | где |
| --- | --- |
| `heydrich` | виски 54..86, затухание вниз + затылок |
| `undercut` | высокие выбритые виски 50..88 |
| `clipper-crop` | армейский ёжик, плотность 0.7, без затухания |
| `himmler` | редкая низкая 62..86, плотность 0.35 |
| `temples` | лёгкая окантовка 64..84 |

## men3040
У пяти предметов (`MEN3040_STUBBLED`) callback
`scalp({ face, head })` — вызывать в реальном Head после кожи, до черт
лица и волос. Затылочная зона работает только при `head.view === 'back'`.
Поле `menStubbleLength` (50..175, default 100) — относительная длина
штриха, не физические миллиметры.


---


# ПОЛНЫЕ ИСХОДНЫЕ ФАЙЛЫ

## src/features/poster1930/types.ts

```ts
export type Layer = 'front' | 'back';
export type BBox = [number, number, number, number];
export type Point = [number, number];
/** Кубическая кривая одной прядью: x0 y0 c1x c1y c2x c2y x1 y1. */
export type Curve = [number, number, number, number, number, number, number, number];

/**
 * Настройки женского бандла. Всё необязательное: без posterHairColor
 * причёска наследует var(--hair) игры. posterHatColor / posterRibbonColor
 * по умолчанию undefined — уборы рисуются своим авторским цветом.
 * `ribbonColor` — уже существующее поле FaceSel игры, читается как запасное.
 */
export interface PosterSettings {
  hairFrontWidth?: number;
  hairFrontHeight?: number;
  hairBackWidth?: number;
  hairBackHeight?: number;
  posterHairColor?: string;
  posterHairSecondary?: string;
  /** 60..150, тугость витков */
  curlTightness?: number;
  /** 70..140, объём (радиус) локонов */
  curlVolume?: number;
  /** 0..200, сила блика */
  hairSheen?: number;
  posterHatColor?: string;
  posterRibbonColor?: string;
  ribbonColor?: string;
  /** 70..140, шаг ячеек снуда */
  posterSnoodSpacing?: number;
  /** 20..100, плотность сетки снуда */
  posterSnoodOpacity?: number;
  hatWidth?: number;
  hatScale?: number;
  hatRotation?: number;
  hatMirrored?: boolean;
}

/**
 * Локон в локальных координатах: примитив строится в начале координат,
 * затем переносится в (x, y), поворачивается и при необходимости зеркалится.
 * `kind: 'pin'` — плоский пришпиленный завиток (спираль в плоскости),
 * иначе — висящий конический локон.
 */
export interface CurlSpec {
  x: number;
  y: number;
  /** радиус витка у основания */
  r: number;
  /** длина (вертикаль) висящего локона или высота плоского */
  h: number;
  /** число оборотов */
  coils: number;
  /** ширина ленты у корня */
  w?: number;
  /** конусность 0..0.95 */
  taper?: number;
  /** наклон оси −2..2 */
  tilt?: number;
  phase?: number;
  rotation?: number;
  mirrored?: boolean;
  kind?: 'hanging' | 'pin';
}

export interface Surface {
  d?: string;
  transform?: string;
  strands?: string[];
  highlights?: string[];
  shadows?: string[];
  part?: string;
  coils?: CurlSpec[];
}

export interface PosterDesign {
  id: string;
  name: string;
  year: number;
  caption: string;
  position: string;
  description: string;
  construction: string;
  referenceView: string;
  bbox: BBox;
  front: Surface[];
  back: Surface[];
  recommendedHeadwear?: string;
}

export type PosterHeadwearKind =
  | 'cord' | 'ribbon' | 'chenille' | 'satin-loops'
  | 'sailor' | 'toque' | 'doll' | 'cossack' | 'plush' | 'topper' | 'turban' | 'shako' | 'snood-hood'
  | 'goggles' | 'forehead-gem';

export interface PosterHeadwearDef {
  id: string;
  name: string;
  year: number;
  kind: PosterHeadwearKind;
  category?: 'headgear' | 'accessories';
  bbox: BBox;
  description: string;
  position: string;
  /** авторский цвет материала; показывается, пока posterHatColor не задан */
  color?: string;
  accent?: string;
}

export function bounded(value: number | undefined, fallback: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, typeof value === 'number' && Number.isFinite(value) ? value : fallback));
}

/** Численный расчёт оттенка, чтобы экспорт SVG не зависел от CSS-переменных. */
export function tone(color: string, amount: number): string {
  const value = Math.min(1, Math.max(-1, amount));
  if (!/^#[\da-f]{6}$/i.test(color)) {
    return `color-mix(in srgb, ${color} ${(1 - Math.abs(value)) * 100}%, ${value < 0 ? 'black' : 'white'})`;
  }
  const target = value < 0 ? 0 : 255;
  const channels = [1, 3, 5].map((offset) => {
    const channel = parseInt(color.slice(offset, offset + 2), 16);
    return Math.round(channel + (target - channel) * Math.abs(value));
  });
  return `rgb(${channels.join(',')})`;
}

```

## src/features/poster1930/engine.ts

```ts
import { bounded, type CurlSpec, type Point, type Curve, type Surface } from './types';

// An isolated edition of the tapered-ribbon engine. No legacy generator changes.
const TAU = Math.PI * 2;
const number = (value: number) => Number(value.toFixed(3));
const pair = (p: Point) => `${number(p[0])} ${number(p[1])}`;

export function seedNoise(seed: number): number {
  const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return n - Math.floor(n);
}

export function smoothPath(points: Point[], closed = false): string {
  if (points.length < 2) return '';
  const at = (index: number): Point => closed
    ? points[(index + points.length) % points.length]
    : points[Math.min(points.length - 1, Math.max(0, index))];
  let d = `M${pair(points[0])}`;
  const segments = closed ? points.length : points.length - 1;
  for (let i = 0; i < segments; i++) {
    const a = at(i - 1), b = at(i), c = at(i + 1), e = at(i + 2);
    d += `C${pair([b[0] + (c[0] - a[0]) / 6, b[1] + (c[1] - a[1]) / 6])} ${pair([c[0] - (e[0] - b[0]) / 6, c[1] - (e[1] - b[1]) / 6])} ${pair(c)}`;
  }
  return d + (closed ? 'Z' : '');
}

function offset(points: Point[], widths: number[], ratio: number): Point[] {
  return points.map((p, i) => {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(points.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const length = Math.hypot(dx, dy) || 1;
    return [p[0] - dy / length * widths[i] * ratio, p[1] + dx / length * widths[i] * ratio];
  });
}

export interface CurlPaths {
  body: string;
  groove: string;
  sheen: string;
  shade: string;
  strands: string[];
}

export function resolvePosterCurl(spec: CurlSpec, tightness = 100, volume = 100): CurlPaths {
  const radius = bounded(spec.r, 6, 0.1, 40) * bounded(volume, 100, 70, 140) / 100;
  const height = bounded(spec.h, 24, 2, 150);
  const turns = bounded(spec.coils, 2, 0.2, 6) * bounded(tightness, 100, 60, 150) / 100;
  const taper = bounded(spec.taper, 0.55, 0, 0.95);
  const tilt = bounded(spec.tilt, 0, -2, 2);
  const phase = bounded(spec.phase, 0, -TAU * 2, TAU * 2);
  const requestedWidth = bounded(spec.w, spec.r * 0.72, 0.3, 25) * radius / bounded(spec.r, 6, 0.1, 40);
  const width = spec.kind === 'pin'
    ? Math.min(requestedWidth, radius * 0.65)
    : Math.min(requestedWidth, height / (turns * 1.6));
  const count = Math.max(50, Math.ceil(turns * 38));
  const points: Point[] = [];
  const widths: number[] = [];
  for (let i = 0; i <= count; i++) {
    const t = i / count;
    const ease = t * t * (3 - 2 * t);
    if (spec.kind === 'pin') {
      const angle = phase + t * turns * TAU;
      const r = radius * (1 - 0.88 * t);
      points.push([Math.cos(angle) * r, Math.sin(angle) * r * height / (radius * 2)]);
    } else {
      const angle = phase + t * turns * TAU;
      const r = radius * (1 - taper * t);
      points.push([Math.sin(angle) * r + tilt * t * radius * 0.7, height * t]);
    }
    widths.push(width * (1 - ease * 0.94) * (1 + Math.sin(Math.PI * t) * 0.15));
  }
  const left = offset(points, widths, 0.5);
  const right = offset(points, widths, -0.5);
  return {
    body: smoothPath([...left, ...right.reverse()], true),
    groove: smoothPath(offset(points, widths, 0.04)),
    sheen: smoothPath(offset(points, widths, -0.25)),
    shade: smoothPath(offset(points, widths, 0.35)),
    strands: [-0.36, -0.14, 0.18].map((k) => smoothPath(offset(points, widths, k))),
  };
}

// Mirroring the whole local primitive also mirrors its tip, taper and texture.
export function mirrorCurl(spec: CurlSpec, axis = 150): CurlSpec {
  return { ...spec, x: 2 * axis - spec.x, rotation: -(spec.rotation ?? 0), mirrored: !spec.mirrored };
}

export function bundle(a: Curve, b: Curve, count = 20): string[] {
  return Array.from({ length: count }, (_, i) => {
    const t = i / Math.max(1, count - 1);
    const p = a.map((v, j) => number(v + (b[j] - v) * t));
    return `M${p[0]} ${p[1]}C${p[2]} ${p[3]} ${p[4]} ${p[5]} ${p[6]} ${p[7]}`;
  });
}

// A sculpted barrel is a filled roll, not a stretched hanging ringlet.
export function roll(x: number, y: number, rx: number, ry: number, rotation = 0): Surface {
  return {
    transform: `translate(${x} ${y}) rotate(${rotation})`,
    d: `M${-rx} 0C${-rx} ${-ry * 1.2} ${rx * 0.65} ${-ry * 1.3} ${rx} ${-ry * 0.2}C${rx * 1.2} ${ry * 0.8} ${-rx * 0.6} ${ry * 1.2} ${-rx} 0Z`,
    strands: bundle([-rx, 0, -rx, -ry * 1.05, rx * 0.8, -ry, rx, 0], [-rx * 0.7, ry * 0.3, -rx * 0.5, -ry * 0.6, rx * 0.65, -ry * 0.55, rx * 0.7, ry * 0.45], 15),
    highlights: [`M${-rx * 0.92} ${-ry * 0.05}C${-rx * 0.6} ${-ry * 1.1} ${rx * 0.52} ${-ry * 1.05} ${rx * 0.88} ${-ry * 0.3}C${rx * 0.3} ${-ry * 0.8} ${-rx * 0.45} ${-ry * 0.65} ${-rx * 0.92} ${-ry * 0.05}Z`],
    shadows: [`M${-rx * 0.6} ${ry * 0.15}C${-rx * 0.3} ${-ry * 0.18} ${rx * 0.75} ${-ry * 0.05} ${rx * 0.8} ${ry * 0.3}C${rx * 0.2} ${ry * 0.82} ${-rx * 0.45} ${ry * 0.65} ${-rx * 0.6} ${ry * 0.15}Z`],
  };
}

export function braid(x: number, y: number, length: number, width = 5): Surface[] {
  return Array.from({ length: Math.round(length / 6) }, (_, i) => ({
    transform: `translate(${x} ${y + i * 6}) scale(${1 - i * 0.045})`,
    d: `M0 -3C${-width * 1.7} -7 ${-width * 1.4} 3 0 7C${width * 1.4} 3 ${width * 1.7} -7 0 -3Z`,
    strands: [`M${-width} -2Q${-width * 0.6} 2 2 5`, `M${width} -2Q${width * 0.6} 2 -2 5`],
    highlights: [`M${-width} -1Q${-width * 0.7} 2 0 4L-1 6Q${-width * 1.4} 2 ${-width} -1Z`],
  }));
}

/**
 * «Баранка в анфас»: вертикальная вытянутая коса-петля вдоль щеки.
 * Идёт вниз до `bottom` и подворачивается снизу вверх; каждое из `links`
 * звеньев — отдельная поверхность с rotate, развёрнутая плетением к зрителю.
 */
export function braidLoop(x: number, top: number, bottom: number, dir: 1 | -1, links = 24, linkWidth = 6.5): Surface[] {
  const span = bottom - top;
  const outer = Math.round(links * 0.58);
  const inner = links - outer;
  const out: Surface[] = [];
  for (let i = 0; i < outer; i++) {
    const t = i / (outer - 1);
    const bulge = Math.sin(t * Math.PI) * 7;
    const y = t < 0.86 ? top + t * (span - 6) : top + (span - 6) + Math.sin(((t - 0.86) / 0.14) * Math.PI) * 8;
    const cx = x + dir * (1.5 + bulge);
    const angle = dir * (90 - Math.cos(t * Math.PI) * 18) + (t > 0.86 ? dir * (t - 0.86) * 400 : 0);
    out.push(link(cx, y, angle, linkWidth, i));
  }
  for (let i = 0; i < inner; i++) {
    const t = i / (inner - 1);
    const bulge = Math.sin(t * Math.PI) * 3.5;
    const y = bottom - 6 - t * (span - 22);
    const cx = x - dir * (1.2 + bulge);
    out.push(link(cx, y, -dir * (90 + Math.cos(t * Math.PI) * 10), linkWidth * 0.92, outer + i));
  }
  return out;
}

function link(x: number, y: number, angle: number, w: number, index: number): Surface {
  const h = w * 0.62;
  const flip = index % 2 === 0 ? 1 : -1;
  return {
    transform: `translate(${number(x)} ${number(y)}) rotate(${number(angle)})`,
    d: `M${-w / 2} 0Q${-w * 0.15} ${-h * flip} ${w / 2} 0Q${w * 0.15} ${h * flip} ${-w / 2} 0Z`,
    strands: [`M${-w * 0.42} ${-h * 0.15 * flip}Q0 ${-h * 0.55 * flip} ${w * 0.42} ${-h * 0.1 * flip}`],
    highlights: [`M${-w * 0.4} ${-h * 0.2 * flip}Q${-w * 0.1} ${-h * 0.75 * flip} ${w * 0.3} ${-h * 0.35 * flip}L${w * 0.2} ${-h * 0.1 * flip}Q${-w * 0.1} ${-h * 0.4 * flip} ${-w * 0.4} ${-h * 0.05 * flip}Z`],
  };
}

```

## src/features/poster1930/designs.ts

```ts
import { braidLoop, bundle, roll } from './engine';
import type { CurlSpec, PosterDesign, Surface } from './types';

/**
 * Женский лист 1930–1940: 12 причёсок с постера + 4 укладки под уборы
 * (Schiaparelli, Rose Valois, Suzy ×2) = 16. У каждой СВОЙ контур и СВОЯ
 * линия роста; checks.ts требует уникальные контуры и передний+задний слой.
 *
 * Система координат: макушка черепа y≈33, линия роста y≈50, виски x≈113/187,
 * уши y≈86, подбородок y≈130. Локоны — локальные примитивы движка:
 * `kind: 'pin'` — плоский пришпиленный завиток, иначе висящий конический.
 */

/* ── общие задние массы (разные bottom и густота) ────────────────────── */

function backMass(bottom: number, seed: number, wide = 0): Surface {
  const l = 110 - wide, r = 190 + wide;
  return {
    d: `M${l} 62C${l - 5} 40 ${l + 12} 26 150 26C${r - 12} 26 ${r + 5} 40 ${r} 62C${r + 3} 84 ${r - 2} ${bottom - 14} ${r - 8} ${bottom}Q150 ${bottom + 8} ${l + 8} ${bottom}C${l + 2} ${bottom - 14} ${l - 3} 84 ${l} 62Z`,
    strands: [
      ...bundle([l + 6, 58, l - 2, 84, l + 1, bottom - 20, l + 10, bottom - 2], [150, 40, 146, 80, 148, bottom - 18, 150, bottom - 2], 10 + (seed % 4)),
      ...bundle([r - 6, 58, r + 2, 84, r - 1, bottom - 20, r - 10, bottom - 2], [150, 40, 154, 80, 152, bottom - 18, 150, bottom - 2], 10 + (seed % 4)),
    ],
    highlights: [`M${l + 8} 64C${l + 2} 84 ${l + 4} ${bottom - 18} ${l + 12} ${bottom - 4}L${l + 18} ${bottom - 6}C${l + 10} ${bottom - 20} ${l + 8} 84 ${l + 14} 64Z`],
    shadows: [`M150 40C150 70 150 ${bottom - 20} 150 ${bottom}Q160 ${bottom - 4} 164 ${bottom - 14}C160 80 156 60 156 40Z`],
  };
}

const pin = (x: number, y: number, r: number, rotation = 0, mirrored = false, extra: Partial<CurlSpec> = {}): CurlSpec =>
  ({ x, y, r, h: r * 2, coils: 2.2, w: r * 0.8, kind: 'pin', rotation, mirrored, ...extra });

const hang = (x: number, y: number, r: number, h: number, extra: Partial<CurlSpec> = {}): CurlSpec =>
  ({ x, y, r, h, coils: 2.3, w: r * 0.9, taper: 0.6, ...extra });

/* ═══════════════════════ ЛИСТ, РЯД 1 ═══════════════════════ */

/** 1. Марсель 1936: тесные волны по всей шапочке. */
const marcel: PosterDesign = {
  id: 'hair-poster-1936-marcel', name: 'Марсель', year: 1936,
  caption: 'Tight Marcel waves over the whole cap',
  position: 'Лист, ряд 1, портрет 1',
  description: 'Четыре ряда мелких волн-гребней от пробора до висков: самая густая текстура набора, лоб открыт.',
  construction: 'Контур гладкой шапочки; вся фактура — четыре поперечные ряда пришпиленных плоских волн (pin) с чередующимся поворотом, по 5 в ряду.',
  referenceView: 'На постере анфас.',
  bbox: [100, 22, 100, 84],
  back: [backMass(104, 1)],
  front: [
    {
      d: 'M103 92C101 50 120 27 150 27C180 27 199 50 197 92L186 88C188 60 174 45 150 45C126 45 112 60 114 88Z',
      strands: [...bundle([150, 28, 128, 28, 110, 48, 114, 88], [150, 44, 134, 46, 122, 62, 120, 88], 12), ...bundle([150, 28, 172, 28, 190, 48, 186, 88], [150, 44, 166, 46, 178, 62, 180, 88], 12)],
      part: 'M150 27L150 45',
    },
    { coils: [0, 1, 2, 3].flatMap((row) => [0, 1, 2, 3, 4].map((i) => pin(114 + i * 18 + (row % 2) * 9, 40 + row * 11, 5.2, row % 2 ? 18 : -18, i > 2, { coils: 1.6, h: 6 }))) },
  ],
};

/** 2. Пальцевые волны 1936: три S-волны на каждом виске. */
const fingerWaves: PosterDesign = {
  id: 'hair-poster-1936-finger-waves', name: 'Пальцевые волны', year: 1936,
  caption: 'Finger waves at the temples, smooth crown',
  position: 'Лист, ряд 1, портрет 2',
  description: 'Гладкая макушка с центральным пробором и три параллельные S-волны на каждом виске, спускающиеся к уху.',
  construction: 'Единственная укладка с тремя параллельными волнами на висках: три плоских завитка на сторону, повёрнутых на 70°, макушка без фактуры.',
  referenceView: 'На постере анфас.',
  bbox: [100, 22, 100, 86],
  back: [backMass(106, 2)],
  front: [
    {
      d: 'M103 94C101 52 120 28 150 28C180 28 199 52 197 94L186 90C188 60 174 46 150 46C126 46 112 60 114 90Z',
      strands: [...bundle([150, 29, 128, 27, 108, 50, 112, 90], [150, 45, 134, 47, 120, 64, 120, 90], 14), ...bundle([150, 29, 172, 27, 192, 50, 188, 90], [150, 45, 166, 47, 180, 64, 180, 90], 14)],
      highlights: ['M116 52Q132 32 148 34Q132 42 120 58Z', 'M184 52Q168 32 152 34Q168 42 180 58Z'],
      part: 'M150 28L150 46',
    },
    { coils: [0, 1, 2].flatMap((i) => [pin(112, 60 + i * 11, 6, 70, false, { h: 10, coils: 1.4 }), pin(188, 60 + i * 11, 6, -70, true, { h: 10, coils: 1.4 })]) },
  ],
};

/** 3. Полумесяц-каре 1937. */
const crescentBob: PosterDesign = {
  id: 'hair-poster-1937-crescent-bob', name: 'Полумесяц-каре', year: 1937,
  caption: 'Bob with a crescent sweep across the brow',
  position: 'Лист, ряд 1, портрет 3',
  description: 'Каре до подбородка; поперёк лба лежит гладкая дуга-полумесяц, концы подвёрнуты внутрь у челюсти.',
  construction: 'Единственный закрытый лоб без волн: линия роста заменена дугой от виска до виска на y≈70. Масса до y=128 с подвёрнутыми концами-валиками по краям.',
  referenceView: 'На постере анфас.',
  bbox: [98, 22, 104, 110],
  back: [backMass(118, 3, 2)],
  front: [
    {
      d: 'M104 90C102 50 120 28 150 28C180 28 198 50 196 90L192 120C186 130 178 132 172 126L170 90L130 90L128 126C122 132 114 130 108 120Z',
      strands: [...bundle([150, 30, 126, 30, 108, 56, 110, 118], [150, 46, 136, 50, 124, 70, 128, 118], 14), ...bundle([150, 30, 174, 30, 192, 56, 190, 118], [150, 46, 164, 50, 176, 70, 172, 118], 14)],
      highlights: ['M116 52Q132 33 148 35Q132 43 120 59Z'],
    },
    {
      d: 'M106 72C118 60 136 56 150 58C164 56 182 60 194 72C180 68 164 68 150 70C136 68 120 68 106 72Z',
      strands: bundle([108, 71, 128, 62, 172, 62, 192, 71], [110, 74, 130, 68, 170, 68, 190, 74], 8),
      highlights: ['M112 70Q150 60 188 70Q150 64 112 70Z'],
    },
    roll(118, 122, 8, 6, 20), roll(182, 122, 8, 6, -20),
  ],
};

/** 4. Чехолочные завитки 1937. */
const shellCurls: PosterDesign = {
  id: 'hair-poster-1937-shell-curls', name: 'Чехолочные завитки', year: 1937,
  caption: 'Flat shell curls at the temples',
  position: 'Лист, ряд 1, портрет 4',
  description: 'Гладкая макушка, а у висков два ряда плоских завитков-«чехлов» и по одному крупному у уха.',
  construction: 'Семь плоских завитков (pin) на сторону в шахматном порядке — отличие от пальцевых волн: круглые чехлы, а не S-полосы.',
  referenceView: 'На постере три четверти; адаптировано в анфас.',
  bbox: [100, 22, 100, 84],
  back: [backMass(104, 4)],
  front: [
    {
      d: 'M104 90C102 50 121 27 150 27C179 27 198 50 196 90L185 86C187 58 173 45 150 45C127 45 113 58 115 86Z',
      strands: [...bundle([150, 28, 128, 28, 110, 50, 114, 86], [150, 44, 136, 46, 124, 62, 122, 86], 12), ...bundle([150, 28, 172, 28, 190, 50, 186, 86], [150, 44, 164, 46, 176, 62, 178, 86], 12)],
      highlights: ['M117 50Q133 31 149 33Q133 41 121 57Z', 'M183 50Q167 31 151 33Q167 41 179 57Z'],
      part: 'M150 27L150 46',
    },
    { coils: [[116, 58], [126, 66], [114, 74], [124, 82], [112, 90]].flatMap(([x, y]) => [pin(x, y, 5.6, 0, false, { coils: 2.4, h: 11 }), pin(300 - x, y, 5.6, 0, true, { coils: 2.4, h: 11 })]) },
  ],
};

/** 5. Боковой ролл 1937. */
const sidePartRoll: PosterDesign = {
  id: 'hair-poster-1937-side-part-roll', name: 'Боковой ролл', year: 1937,
  caption: 'Deep side part with a sculpted roll on the heavy side',
  position: 'Лист, ряд 1, портрет 5',
  description: 'Глубокий пробор слева; тяжёлая сторона уходит по диагонали к правому виску и заканчивается скульптурным валиком.',
  construction: 'Асимметрия: пробор на x=126, валик roll один — на левой макушке; справа пряди по диагонали без объёма.',
  referenceView: 'На постере анфас с лёгким поворотом.',
  bbox: [100, 22, 100, 84],
  back: [backMass(106, 5)],
  front: [
    {
      d: 'M103 90C101 50 119 27 150 27C181 27 199 51 197 90L186 86C188 57 175 44 152 44C128 44 114 58 116 86Z',
      strands: [...bundle([126, 30, 118, 40, 112, 60, 114, 86], [128, 46, 124, 52, 120, 66, 120, 86], 6), ...bundle([128, 30, 156, 27, 186, 48, 188, 86], [128, 46, 152, 46, 176, 62, 180, 86], 20)],
      highlights: ['M132 44Q152 30 176 34Q152 40 138 52Z'],
      part: 'M126 30Q122 42 126 56',
    },
    roll(124, 40, 13, 9, -14),
  ],
};

/* ═══════════════════════ ЛИСТ, РЯД 2 ═══════════════════════ */

/** 6. Чайные волны 1938. */
const teaWaves: PosterDesign = {
  id: 'hair-poster-1938-tea-waves', name: 'Чайные волны', year: 1938,
  caption: 'Cascade of C-waves down both sides to the neck',
  position: 'Лист, ряд 2, портрет 6',
  description: 'Макушка с центральной линией, по бокам каскад из четырёх ступенчатых C-волн до шеи.',
  construction: 'Четыре висячих локона на сторону с малым радиусом и длиной 14, уложенных ступенями от виска к шее — длиннее пальцевых волн и уходят ниже уха.',
  referenceView: 'На постере анфас.',
  bbox: [98, 22, 104, 96],
  back: [backMass(110, 6, 1)],
  front: [
    {
      d: 'M104 96C102 52 120 28 150 28C180 28 198 52 196 96L185 92C187 62 173 47 150 47C127 47 113 62 115 92Z',
      strands: [...bundle([150, 29, 128, 28, 108, 52, 112, 92], [150, 46, 134, 48, 122, 66, 120, 92], 12), ...bundle([150, 29, 172, 28, 192, 52, 188, 92], [150, 46, 166, 48, 178, 66, 180, 92], 12)],
      highlights: ['M116 52Q132 33 148 35Q132 43 120 59Z', 'M184 52Q168 33 152 35Q168 43 180 59Z'],
      part: 'M150 28L150 48',
    },
    { coils: [0, 1, 2, 3].flatMap((i) => [hang(110, 58 + i * 12, 5.5, 14, { coils: 1.5, tilt: -0.4, phase: i }), hang(190, 58 + i * 12, 5.5, 14, { coils: 1.5, tilt: 0.4, phase: i, mirrored: true })]) },
  ],
};

/** 7. Помпадур Schiaparelli 1938 — под кукольную шапочку. */
const dollPomp: PosterDesign = {
  id: 'hair-poster-1938-doll-pomp', name: 'Помпадур Schiaparelli', year: 1938,
  caption: 'Front roll with smooth lifted sides, made for the doll’s hat',
  position: 'Под кукольную шапочку Schiaparelli (лист, ряд 2, портрет 7)',
  description: 'Высокий валик поперёк всего лба и гладко поднятые бока: лицо открыто, шапочка садится на валик.',
  construction: 'Один широкий фронтальный roll (rx 30) на y=42 и низкий контур позади него; боковых завитков нет.',
  referenceView: 'На постере анфас в шапочке; укладка реконструирована.',
  bbox: [100, 22, 100, 84],
  back: [backMass(104, 7)],
  front: [
    {
      d: 'M106 86C104 52 120 32 150 32C180 32 196 52 194 86L185 82C186 58 174 46 150 46C126 46 114 58 115 82Z',
      strands: [...bundle([150, 33, 128, 33, 112, 54, 116, 82], [150, 46, 136, 48, 124, 64, 122, 82], 10), ...bundle([150, 33, 172, 33, 188, 54, 184, 82], [150, 46, 164, 48, 176, 64, 178, 82], 10)],
      highlights: ['M118 50Q134 36 148 37Q134 44 122 58Z', 'M182 50Q166 36 152 37Q166 44 178 58Z'],
    },
    roll(150, 44, 30, 10),
  ],
  recommendedHeadwear: 'headgear-poster-1938-dolls-hat',
};

/** 8. Каре «тедди» 1938. */
const teddyBob: PosterDesign = {
  id: 'hair-poster-1938-teddy-bob', name: 'Каре «тедди»', year: 1938,
  caption: 'Full bob with a scalloped hemline',
  position: 'Лист, ряд 2, портрет 8',
  description: 'Объёмное каре до подбородка; нижний край собран в ряд подвёрнутых фестонов.',
  construction: 'Масса до y=126 с прямой кромкой; по нижнему краю шесть плоских завитков-фестонов (pin) — единственное каре с фестонами.',
  referenceView: 'На постере анфас.',
  bbox: [96, 20, 108, 112],
  back: [backMass(122, 8, 3)],
  front: [
    {
      d: 'M103 88C101 50 120 28 150 28C180 28 199 50 197 88C197 108 193 122 188 126L180 118C184 106 185 94 183 84L117 84C115 94 116 106 120 118L112 126C107 122 103 108 103 88Z',
      strands: [...bundle([150, 29, 126, 29, 106, 56, 112, 122], [150, 46, 136, 50, 122, 70, 124, 118], 14), ...bundle([150, 29, 174, 29, 194, 56, 188, 122], [150, 46, 164, 50, 178, 70, 176, 118], 14)],
      highlights: ['M116 52Q132 33 148 35Q132 43 120 59Z'],
      part: 'M150 28L150 47',
    },
    { coils: [116, 126, 136, 164, 174, 184].map((x, i) => pin(x, 118, 5.4, i < 3 ? 100 : -100, i >= 3, { coils: 1.8, h: 10 })) },
  ],
};

/** 9. Двойная волна 1938. */
const twinWaves: PosterDesign = {
  id: 'hair-poster-1938-twin-waves', name: 'Двойная волна', year: 1938,
  caption: 'Two horizontal wave bands across the forehead',
  position: 'Лист, ряд 2, портрет 9',
  description: 'Виски приглажены, а поперёк лба лежат две горизонтальные широкие волны одна над другой.',
  construction: 'Две поверхности-ленты поперёк лба (y=58 и y=70) с прядями вдоль; завитков нет — отличие от марселя в редкости и ширине полос.',
  referenceView: 'На постере анфас.',
  bbox: [100, 22, 100, 84],
  back: [backMass(104, 9)],
  front: [
    {
      d: 'M104 90C102 50 120 27 150 27C180 27 198 50 196 90L185 86C187 58 173 44 150 44C127 44 113 58 115 86Z',
      strands: [...bundle([150, 28, 128, 28, 110, 50, 114, 86], [150, 44, 136, 46, 124, 62, 122, 86], 10), ...bundle([150, 28, 172, 28, 190, 50, 186, 86], [150, 44, 164, 46, 176, 62, 178, 86], 10)],
      highlights: ['M117 50Q133 31 149 33Q133 41 121 57Z', 'M183 50Q167 31 151 33Q167 41 179 57Z'],
      part: 'M150 27L150 45',
    },
    {
      d: 'M116 54C130 60 142 50 150 56C158 50 170 60 184 54C184 62 170 68 150 64C130 68 116 62 116 54Z',
      strands: bundle([118, 56, 134, 52, 166, 52, 182, 56], [118, 60, 134, 64, 166, 64, 182, 60], 9),
      highlights: ['M120 56Q150 52 180 56Q150 58 120 56Z'],
    },
    {
      d: 'M118 66C132 72 142 62 150 68C158 62 168 72 182 66C182 74 168 80 150 76C132 80 118 74 118 66Z',
      strands: bundle([120, 68, 136, 64, 164, 64, 180, 68], [120, 72, 136, 76, 164, 76, 180, 72], 9),
      shadows: ['M120 72Q150 78 180 72Q150 82 120 72Z'],
    },
  ],
};

/* ═══════════════════════ ЛИСТ, РЯД 3 ═══════════════════════ */

/** 10. Помпадур 1939. */
const pompadour: PosterDesign = {
  id: 'hair-poster-1939-pompadour', name: 'Помпадур', year: 1939,
  caption: 'Tall front dome rising above the crown',
  position: 'Лист, ряд 3, портрет 10',
  description: 'Высокий цельный купол над лбом, поднятый выше макушки; бока срезаны низко и уходят назад.',
  construction: 'Самый высокий контур набора (y=9); одна большая волна-roll на вершине купола. В отличие от Schiaparelli купол цельный, а не валик на низкой шапочке.',
  referenceView: 'На постере три четверти; адаптирован в анфас.',
  bbox: [98, 6, 104, 100],
  back: [backMass(104, 10)],
  front: [
    {
      d: 'M105 84C103 56 110 30 128 18C142 9 166 9 179 20C192 32 197 56 195 84L186 80C187 54 180 34 164 26C148 19 134 26 126 42C120 54 116 68 114 80Z',
      strands: [...bundle([150, 10, 130, 14, 112, 40, 114, 80], [150, 26, 138, 28, 126, 46, 120, 80], 14), ...bundle([150, 10, 170, 14, 188, 40, 186, 80], [150, 26, 162, 28, 174, 46, 180, 80], 14)],
      highlights: ['M126 30Q146 14 168 24Q148 22 132 38Z'],
      shadows: ['M116 70Q120 48 132 36Q124 52 122 72Z'],
    },
    roll(150, 24, 16, 9),
  ],
};

/** 11. Локоны на затылке 1939 — под папаху Rose Valois. */
const cossackCurls: PosterDesign = {
  id: 'hair-poster-1939-cossack-curls', name: 'Локоны на затылке', year: 1939,
  caption: 'Smooth front, tight ringlets clustered at the nape',
  position: 'Под папаху Rose Valois (лист, ряд 3, портрет 11)',
  description: 'Спереди гладко зачёсано под шапку, весь объём — гроздь тугих локонов на затылке ниже ушей.',
  construction: 'Единственная укладка, где локоны только в заднем слое: семь висячих локонов в два ряда на y=100..112; передний контур низкий и гладкий.',
  referenceView: 'На постере в папахе; затылочные локоны видны в заднем слое и виде сзади.',
  bbox: [98, 22, 104, 118],
  back: [
    backMass(112, 11),
    { coils: [[116, 98], [132, 104], [150, 108], [168, 104], [184, 98], [124, 116], [176, 116]].map(([x, y], i) => hang(x, y, 7, 24, { coils: 2.2, tilt: (x - 150) / 60, phase: i * 0.9, mirrored: x > 150 })) },
  ],
  front: [{
    d: 'M104 86C102 48 121 27 150 27C179 27 198 48 196 86L186 82C188 56 174 43 150 43C126 43 112 56 114 82Z',
    strands: [...bundle([150, 28, 128, 28, 110, 50, 114, 82], [150, 44, 136, 46, 124, 60, 122, 82], 12), ...bundle([150, 28, 172, 28, 190, 50, 186, 82], [150, 44, 164, 46, 176, 60, 178, 82], 12)],
    highlights: ['M116 50Q132 31 148 33Q132 41 120 57Z', 'M184 50Q168 31 152 33Q168 41 180 57Z'],
    part: 'M150 27L150 46',
  }],
  recommendedHeadwear: 'headgear-poster-1939-cossack',
};

/** 12. Скульптурная волна у уха 1939 — под плюшевый ток Suzy. */
const quillWaves: PosterDesign = {
  id: 'hair-poster-1939-quill-waves', name: 'Скульптурная волна у уха', year: 1939,
  caption: 'Flat crown with one sculpted S-wave at the left ear',
  position: 'Под плюшевый ток Suzy (лист, ряд 3, портрет 12)',
  description: 'Макушка плоская под ток; у левого уха одна крупная скульптурная S-волна с завитком на конце.',
  construction: 'Одна асимметричная поверхность-волна от виска к уху слева и один висячий локон под ней; справа гладко.',
  referenceView: 'На постере три четверти в токе.',
  bbox: [98, 22, 104, 92],
  back: [backMass(106, 12)],
  front: [
    {
      d: 'M103 88C101 50 119 28 150 28C181 28 199 50 197 88L186 84C188 56 174 44 150 44C126 44 112 56 114 84Z',
      strands: [...bundle([150, 29, 128, 29, 110, 50, 114, 84], [150, 44, 136, 46, 124, 62, 122, 84], 10), ...bundle([150, 29, 172, 29, 190, 50, 186, 84], [150, 44, 164, 46, 176, 62, 178, 84], 14)],
      highlights: ['M184 50Q168 31 152 33Q168 41 180 57Z'],
      part: 'M150 28L150 47',
    },
    {
      d: 'M112 56C104 66 100 78 104 92C108 100 116 102 122 96C118 86 120 74 124 64C122 58 118 54 112 56Z',
      strands: bundle([113, 58, 104, 72, 104, 90, 118, 98], [122, 62, 118, 76, 118, 90, 122, 96], 8),
      highlights: ['M110 62C104 74 104 86 110 94L114 92C108 84 108 72 114 62Z'],
    },
    { coils: [hang(112, 96, 6.5, 18, { coils: 1.8, tilt: -0.3 })] },
  ],
  recommendedHeadwear: 'headgear-poster-1939-plush-toque',
};

/** 13. Двойной помпадур-ролл 1939 — под бархатный снуд Suzy. */
const snoodRolls: PosterDesign = {
  id: 'hair-poster-1939-snood-rolls', name: 'Двойной помпадур-ролл', year: 1939,
  caption: 'Twin rolls on the crown, sides swept back into the snood',
  position: 'Под бархатный снуд Suzy (лист, ряд 3, портрет 13)',
  description: 'Пара симметричных валиков на макушке, бока гладко уложены назад под снуд.',
  construction: 'Два roll по бокам от центра на y=38 с наклоном друг к другу; контур ниже и уже, чем у одиночного помпадура.',
  referenceView: 'На постере анфас в снуде.',
  bbox: [100, 22, 100, 84],
  back: [backMass(106, 13)],
  front: [
    {
      d: 'M105 88C103 50 121 28 150 28C179 28 197 50 195 88L186 84C188 56 174 44 150 44C126 44 112 56 114 84Z',
      strands: [...bundle([150, 29, 128, 29, 110, 50, 114, 84], [150, 44, 136, 46, 124, 62, 122, 84], 10), ...bundle([150, 29, 172, 29, 190, 50, 186, 84], [150, 44, 164, 46, 176, 62, 178, 84], 10)],
      highlights: ['M117 50Q133 31 149 33Q133 41 121 57Z', 'M183 50Q167 31 151 33Q167 41 179 57Z'],
      part: 'M150 28L150 47',
    },
    roll(130, 38, 14, 9, -12), roll(170, 38, 14, 9, 192),
  ],
  recommendedHeadwear: 'headgear-poster-1939-velvet-snood',
};

/** 14. Клин-каре 1939. */
const wedgeBob: PosterDesign = {
  id: 'hair-poster-1939-wedge-bob', name: 'Клин-каре', year: 1939,
  caption: 'Asymmetric bob wedging over the right eye',
  position: 'Лист, ряд 3, портрет 14',
  description: 'Асимметричное каре: левая сторона короче и выше, правая длинным клином заходит на глаз.',
  construction: 'Единственная асимметрия каре — правая кромка спускается клином до y=96, левая держится на y=82; пробор смещён влево.',
  referenceView: 'На постере три четверти; адаптирован в анфас.',
  bbox: [100, 22, 100, 84],
  back: [backMass(108, 14, 2)],
  front: [{
    d: 'M103 82C101 48 119 27 150 27C181 27 199 49 197 86L196 96C188 98 176 94 168 86C172 72 168 58 158 52C142 44 124 48 117 58C112 66 111 76 113 82L108 90C104 88 103 85 103 82Z',
    strands: [...bundle([140, 28, 122, 30, 108, 54, 110, 84], [142, 50, 128, 52, 118, 66, 116, 84], 8), ...bundle([142, 28, 172, 28, 196, 60, 194, 96], [144, 50, 164, 52, 176, 74, 172, 88], 20)],
    highlights: ['M118 48Q134 30 156 32Q138 40 126 56Z'],
    part: 'M140 28Q136 40 141 50',
  }],
};

/** 15. Скульптурный глянец 1940. */
const sculptedSleek: PosterDesign = {
  id: 'hair-poster-1940-sculpted-sleek', name: 'Скульптурный глянец', year: 1940,
  caption: 'Glossy sculpted sweep with one hook wave',
  position: 'Лист, ряд 3, портрет 15',
  description: 'Максимально гладкий глянцевый зачёс с длинным бликом; справа одна крупная волна-крюк опускается к уху.',
  construction: 'Гладкая масса без прядей (только 8 бликовых линий) и одна поверхность-крюк у правого уха с завитком — самая гладкая укладка набора.',
  referenceView: 'На постере анфас.',
  bbox: [100, 22, 100, 84],
  back: [backMass(108, 15, 4)],
  front: [
    {
      d: 'M104 86C102 48 121 27 150 27C179 27 198 48 196 86L186 82C188 54 174 42 150 42C126 42 112 54 114 82Z',
      strands: [...bundle([150, 28, 132, 28, 114, 48, 116, 82], [150, 42, 138, 44, 126, 58, 122, 82], 4), ...bundle([150, 28, 168, 28, 186, 48, 184, 82], [150, 42, 162, 44, 174, 58, 178, 82], 4)],
      highlights: ['M117 50Q133 31 149 33Q133 41 121 57Z', 'M138 30Q160 28 178 44Q160 34 140 34Z'],
      part: 'M150 27Q148 38 152 48',
    },
    {
      d: 'M176 46C188 54 194 66 190 80C186 88 178 88 176 80C178 70 176 60 172 52C172 48 174 46 176 46Z',
      strands: bundle([177, 48, 190, 60, 190, 78, 180, 86], [173, 52, 180, 62, 182, 76, 178, 84], 6),
      highlights: ['M180 50C190 58 192 70 188 80L184 78C188 70 186 60 178 52Z'],
    },
    { coils: [pin(186, 80, 6, 0, true, { coils: 2.2, h: 12 })] },
  ],
};

/* ═══════════════════════ ОТДЕЛЬНЫЙ РЕФЕРЕНС ═══════════════════════ */

/** 16. Баранки в анфас 1938 (Überfrau). */
const braidedCoils: PosterDesign = {
  id: 'hair-poster-1938-braided-coils', name: 'Баранки в анфас', year: 1938,
  caption: 'Vertical braided loops along the cheeks, plait facing the viewer',
  position: 'Референс Überfrau, анфас',
  description: 'Гладкая макушка с центральным пробором; вдоль каждой щеки вертикальная вытянутая коса-петля: вниз до челюсти и подворот снизу вверх, плетение развёрнуто к зрителю.',
  construction: 'Две петли braidLoop по 24 звена шириной 6.5 (48 поверхностей с rotate), а не круглые плоские диски: внешняя нитка вниз до y≈128, внутренняя обратно к виску.',
  referenceView: 'Анфас. Знаки различия с референса намеренно не переносились.',
  bbox: [94, 22, 112, 112],
  back: [backMass(104, 16)],
  front: [
    {
      d: 'M102 88C100 48 119 26 150 26C181 26 200 48 198 88L187 84C189 56 175 43 150 43C125 43 111 56 113 84Z',
      strands: [...bundle([150, 27, 128, 27, 108, 50, 112, 84], [150, 44, 136, 46, 122, 62, 120, 84], 12), ...bundle([150, 27, 172, 27, 192, 50, 188, 84], [150, 44, 164, 46, 178, 62, 180, 84], 12)],
      highlights: ['M115 50Q131 30 147 32Q131 40 119 56Z', 'M185 50Q169 30 153 32Q169 40 181 56Z'],
      part: 'M150 26L150 45',
    },
    ...braidLoop(109, 84, 128, -1),
    ...braidLoop(191, 84, 128, 1),
  ],
  recommendedHeadwear: 'headgear-poster-acc-aviator-goggles',
};

export const POSTER_HAIR: PosterDesign[] = [
  marcel, fingerWaves, crescentBob, shellCurls, sidePartRoll,
  teaWaves, dollPomp, teddyBob, twinWaves,
  pompadour, cossackCurls, quillWaves, snoodRolls, wedgeBob, sculptedSleek,
  braidedCoils,
];

export const POSTER_DESIGNS: Readonly<Record<string, PosterDesign>> = Object.fromEntries(POSTER_HAIR.map((design) => [design.id, design]));

/** true, если стиль содержит локоны движка и реагирует на ползунки завитков. */
export function hasPosterCurls(id: string): boolean {
  const design = POSTER_DESIGNS[id];
  return !!design && [...design.front, ...design.back].some((surface) => !!surface.coils?.length);
}

```

## src/features/poster1930/PosterHair.tsx

```tsx
import { memo, useId, useMemo } from 'react';
import { POSTER_DESIGNS } from './designs';
import { resolvePosterCurl } from './engine';
import { bounded, tone, type CurlSpec, type Layer, type PosterSettings, type Surface } from './types';

function CurlArt({ spec, uid, base, secondary, settings }: {
  spec: CurlSpec; uid: string; base: string; secondary: string; settings: PosterSettings;
}) {
  const tightness = bounded(settings.curlTightness, 100, 60, 150);
  const volume = bounded(settings.curlVolume, 100, 70, 140);
  const sheen = bounded(settings.hairSheen, 100, 0, 200) / 200;
  const paths = useMemo(() => resolvePosterCurl(spec, tightness, volume), [spec, tightness, volume]);
  const transform = `translate(${spec.x} ${spec.y}) rotate(${spec.rotation ?? 0}) scale(${spec.mirrored ? -1 : 1} 1)`;
  return (
    <g transform={transform}>
      <defs>
        <linearGradient id={`${uid}-fill`} x1="8%" y1="5%" x2="88%" y2="96%">
          <stop offset="0" stopColor={tone(base, 0.16)} />
          <stop offset="0.4" stopColor={base} />
          <stop offset="1" stopColor={tone(secondary, -0.28)} />
        </linearGradient>
        <clipPath id={`${uid}-clip`}><path d={paths.body} /></clipPath>
      </defs>
      <path d={paths.body} fill={`url(#${uid}-fill)`} stroke={tone(base, -0.5)} strokeWidth="0.24" strokeLinejoin="round" />
      <g clipPath={`url(#${uid}-clip)`} fill="none" strokeLinecap="round">
        <path d={paths.shade} stroke={tone(base, -0.65)} strokeWidth="1.4" opacity="0.5" />
        <path d={paths.groove} stroke={tone(base, -0.52)} strokeWidth="0.5" opacity="0.7" />
        {paths.strands.map((d, i) => <path key={i} d={d} stroke={tone(base, -0.25)} strokeWidth="0.22" opacity="0.7" />)}
        <path d={paths.sheen} stroke={tone(secondary, 0.46)} strokeWidth="1.2" opacity={sheen * 0.68} />
        <path d={paths.sheen} stroke={tone(secondary, 0.7)} strokeWidth="0.35" opacity={sheen * 0.8} />
      </g>
    </g>
  );
}

function HairSurface({ surface, uid, settings, base, secondary }: {
  surface: Surface; uid: string; settings: PosterSettings; base: string; secondary: string;
}) {
  const sheen = bounded(settings.hairSheen, 100, 0, 200) / 200;
  return (
    <g transform={surface.transform}>
      {surface.d && <>
        <defs>
          <linearGradient id={`${uid}-mass`} x1="18%" y1="4%" x2="82%" y2="100%">
            <stop offset="0" stopColor={tone(base, 0.18)} />
            <stop offset="0.3" stopColor={base} />
            <stop offset="0.66" stopColor={secondary} />
            <stop offset="1" stopColor={tone(base, -0.32)} />
          </linearGradient>
          <clipPath id={`${uid}-mask`}><path d={surface.d} /></clipPath>
          <filter id={`${uid}-soft`} x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation="0.6" /></filter>
        </defs>
        <path d={surface.d} fill={`url(#${uid}-mass)`} stroke={tone(base, -0.55)} strokeWidth="0.65" strokeLinejoin="round" />
        <g clipPath={`url(#${uid}-mask)`}>
          {surface.shadows?.map((d, i) => <path key={`s${i}`} d={d} fill={tone(base, -0.6)} opacity="0.62" />)}
          {surface.highlights?.map((d, i) => <path key={`h${i}`} d={d} fill={tone(secondary, 0.5)} opacity={sheen * 0.55} filter={`url(#${uid}-soft)`} />)}
          {surface.strands?.map((d, i) => <path key={`t${i}`} d={d} fill="none" stroke={i % 4 === 0 ? tone(secondary, 0.27) : tone(base, -0.6)} strokeWidth={i % 4 === 0 ? 0.38 : 0.35} strokeLinecap="round" opacity={i % 4 === 0 ? 0.5 : 0.58} />)}
        </g>
        {surface.part && <path d={surface.part} fill="none" stroke={tone(base, -0.6)} strokeWidth="0.85" strokeLinecap="round" />}
      </>}
      {surface.coils?.map((spec, i) => <CurlArt key={i} spec={spec} uid={`${uid}-curl-${i}`} base={base} secondary={secondary} settings={settings} />)}
    </g>
  );
}

const EMPTY_SETTINGS: PosterSettings = {};

export const PosterHair = memo(function PosterHair({ styleId, layer = 'front', face = EMPTY_SETTINGS }: {
  styleId: string; layer?: Layer; face?: PosterSettings;
}) {
  const uid = `poster-hair-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const design = POSTER_DESIGNS[styleId];
  if (!design) return null;
  const width = bounded(layer === 'front' ? face.hairFrontWidth : face.hairBackWidth, 100, 72, 128) / 100;
  const height = bounded(layer === 'front' ? face.hairFrontHeight : face.hairBackHeight, 100, 72, 128) / 100;
  const base = face.posterHairColor || 'var(--hair, #4a3222)';
  const secondary = face.posterHairSecondary || base;
  return (
    <g data-poster-hair={styleId} data-layer={layer} transform={`translate(150 48) scale(${width} ${height}) translate(-150 -48)`}>
      {design[layer].map((surface, i) => <HairSurface key={i} surface={surface} uid={`${uid}-${layer}-${i}`} settings={face} base={base} secondary={secondary} />)}
    </g>
  );
});

```

## src/features/poster1930/PosterHeadwear.tsx

```tsx
import { memo, useId } from 'react';
import { bounded, tone, type Layer, type PosterHeadwearDef, type PosterSettings } from './types';

/**
 * 1930–1940 Headdresses & Hats from the poster:
 * - Redesigned to be deeply authentic to the illustration (proportions, textures, plumes, bows).
 * - Proper front & back layers so hats sit ON the head naturally.
 */
export const POSTER_HEADWEAR: PosterHeadwearDef[] = [
  // ── 1. Снуды и петли ──
  { id: 'headgear-poster-1938-snood-cord', name: 'Снуд из шнура', year: 1938, kind: 'cord', bbox: [90, 10, 120, 151], description: 'Тонкая ромбовидная сетка с узелками; волосы видны между ячейками.', position: 'Снуд 1938' },
  { id: 'headgear-poster-1938-snood-ribbon', name: 'Снуд из ленты', year: 1938, kind: 'ribbon', bbox: [90, 10, 120, 151], description: 'Более широкое переплетение лент с мягким атласным бликом.', position: 'Снуд 1938' },
  { id: 'headgear-poster-1938-snood-chenille', name: 'Синельный снуд', year: 1938, kind: 'chenille', bbox: [90, 10, 120, 151], description: 'Плотные бархатистые нити и мягкий край. Вариант материала из подписи к постеру.', position: 'Снуд 1938' },
  { id: 'headgear-poster-1939-satin-loops', name: 'Атласные петли «Инфанты»', year: 1939, kind: 'satin-loops', bbox: [80, 17, 140, 142], description: 'Отдельное украшение по подписи Balenciaga: вытянутые петли по бокам, цвет не зависит от волос.', position: 'Инфанта 1939' },

  // ── 2. Головные уборы с листа 1930-1940 ──
  { id: 'headgear-poster-1939-burnt-toast', name: '«Burnt Toast» соломенная канотье', year: 1939, kind: 'sailor', color: '#d1ab73', accent: '#f7f4ec', bbox: [72, -4, 156, 80], position: 'Верхний левый (Bruyère)', description: 'Соломенная шляпа-канотье с бантом в горошек, розой и шёлковым шарфом вокруг шеи. Bruyère, 1939.' },
  { id: 'headgear-poster-1938-persian-toque', name: 'Ток из каракуля с вимплом-вуалью', year: 1938, kind: 'toque', color: '#1a1817', accent: '#262422', bbox: [82, 0, 136, 150], position: 'Верхний правый (1938)', description: 'Маленький ток из чёрного каракуля с широкой драпированной вуалью-вимплом из жоржета вокруг всей шеи.' },
  { id: 'headgear-poster-1938-dolls-hat', name: '«Doll’s Hat» Schiaparelli с пером и розой', year: 1938, kind: 'doll', color: '#161413', accent: '#e8a5b8', bbox: [88, -20, 124, 96], position: 'Второй ряд слева (Schiaparelli)', description: 'Крошечная кукольная шапочка с розой-капустой, чёрным страусиным пером и бархатной лентой под подбородком.' },
  { id: 'headgear-poster-1939-cossack', name: 'Казачья папаха Rose Valois', year: 1939, kind: 'cossack', color: '#1c1a18', accent: '#d4af37', bbox: [88, -8, 124, 88], position: 'Средний правый (Rose Valois)', description: 'Высокая асимметричная папаха из каракуля с характерным заломом назад и золотым ожерельем у горла.' },
  { id: 'headgear-poster-1939-plush-toque', name: 'Красный плюшевый ток с пером-пером', year: 1939, kind: 'plush', color: '#8c2430', accent: '#181414', bbox: [80, -32, 140, 108], position: 'Нижний левый (Suzy)', description: 'Красный плюшевый ток с огромным вертикальным пером-шпагой (quill), кручёными шнурами, кистями и бантом.' },
  { id: 'headgear-poster-1939-topper', name: 'Жёсткий цилиндр Rose Valois', year: 1939, kind: 'topper', color: '#8f2832', accent: '#1c1919', bbox: [84, -10, 132, 88], position: 'Центр снизу (Rose Valois)', description: 'Жёсткий красный фетровый цилиндр с расширяющейся тульей, загнутыми полями и чёрной репсовой лентой.' },
  { id: 'headgear-poster-1937-self-tied-turban', name: 'Шёлковый тюрбан self-tied', year: 1937, kind: 'turban', color: '#252e42', accent: '#baa177', bbox: [88, 6, 124, 68], position: 'Низ слева (1937)', description: 'Мягкий тюрбан диагонального плетения со швом на затылке по точной выкройке с постера.' },
  { id: 'headgear-poster-1939-shako', name: 'Бархатный шако Patou с петушиными перьями', year: 1939, kind: 'shako', color: '#181514', accent: '#c9a24b', bbox: [86, -26, 128, 102], position: 'Нижний правый (Patou)', description: 'Чёрный бархатный шако с пышным фонтаном изогнутых петушиных перьев, рвущихся вверх-вперёд.' },
  { id: 'headgear-poster-1939-velvet-snood', name: 'Бархатный снуд-капюшон Suzy', year: 1939, kind: 'snood-hood', color: '#8b242e', accent: '#b83b48', bbox: [82, 4, 136, 150], position: 'Низ по центру (Suzy)', description: 'Красный бархатный снуд-капюшон со структурированным бантом на макушке, драпирующийся по плечам.' },

  // ── 3. Аксессуары и головные уборы по отдельному референсу ──
  { id: 'headgear-poster-acc-aviator-goggles', name: 'Лётные очки-гогглы', year: 1939, kind: 'goggles', category: 'headgear', color: '#201b18', accent: '#7a7062', bbox: [94, 24, 112, 44], position: 'Головной убор / Очки', description: 'Мотоциклетно-лётные очки со стеклами, металлической оправой и аккуратными тонкими ушками, посаженные на лоб.' },
  { id: 'acc-poster-carbuncle', name: 'Карбункул на лбу', year: 1939, kind: 'forehead-gem', category: 'accessories', color: '#b81c28', accent: '#d4af37', bbox: [132, 46, 36, 22], position: 'Аксессуар (лоб)', description: 'Гранёный красный рубиновый камень-карбункул в золотой оправе, надетый по центру лба.' },
];

const BAG = 'M109 44C107 25 128 18 150 20C175 18 194 31 193 51C205 71 210 105 197 128C187 147 169 150 150 149C130 150 110 142 102 128C90 108 94 73 109 44Z';
const SIDES = 'M106 52C93 69 91 104 102 128C107 139 119 145 132 147L135 136C117 130 110 113 111 96C110 79 111 65 117 54Z M194 52C207 69 209 104 198 128C193 139 181 145 168 147L165 136C183 130 190 113 189 96C190 79 189 65 183 54Z';
const RIM = 'M109 64C106 39 123 23 149 23C176 21 195 38 191 64';

export function posterHatTransform(face: PosterSettings = {}): string {
  const scale = bounded(face.hatScale, 100, 55, 165) / 100;
  const width = bounded(face.hatWidth, 100, 55, 165) / 100;
  const rotation = bounded(face.hatRotation, 0, 0, 360);
  return `translate(150 44) scale(${face.hatMirrored ? -1 : 1} 1) rotate(${rotation}) scale(${scale * width} ${scale}) translate(-150 -44)`;
}

/* ── 1. Снуд сетка ── */
function NetSnood({ item, layer, face, uid }: { item: PosterHeadwearDef; layer: Layer; face: PosterSettings; uid: string }) {
  const color = face.posterHatColor || '#382d27';
  const ribbon = face.posterRibbonColor || face.ribbonColor || '#bda175';
  const hair = face.posterHairColor || 'var(--hair, #4a3222)';
  const spacing = bounded(face.posterSnoodSpacing, 100, 70, 140) / 100 * 9;
  const opacity = bounded(face.posterSnoodOpacity, 92, 20, 100) / 100;
  const width = item.kind === 'ribbon' ? 2.1 : item.kind === 'chenille' ? 2.35 : 0.85;
  const d = layer === 'back' ? BAG : SIDES;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-bag`}><path d={d} /></clipPath>
        <pattern id={`${uid}-net`} width={spacing} height={spacing * 1.4} patternUnits="userSpaceOnUse">
          <path d={`M${-spacing / 2} 0L${spacing / 2} ${spacing * 1.4}L${spacing * 1.5} 0M${-spacing / 2} ${spacing * 1.4}L${spacing / 2} 0L${spacing * 1.5} ${spacing * 1.4}`} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
          {item.kind === 'cord' && <circle cx={spacing / 2} cy="0" r="1.15" fill={color} />}
          {item.kind === 'ribbon' && <path d={`M${-spacing / 2 + 0.35} 0L${spacing / 2 + 0.35} ${spacing * 1.4}M${spacing / 2 + 0.35} 0L${spacing * 1.5 + 0.35} ${spacing * 1.4}`} fill="none" stroke={tone(color, 0.48)} strokeWidth="0.45" opacity="0.7" />}
          {item.kind === 'chenille' && <path d={`M${-spacing / 2} 0L${spacing / 2} ${spacing * 1.4}L${spacing * 1.5} 0M${-spacing / 2} ${spacing * 1.4}L${spacing / 2} 0L${spacing * 1.5} ${spacing * 1.4}`} fill="none" stroke={tone(color, 0.24)} strokeWidth="3.8" strokeDasharray="0.25 1.25" opacity="0.5" />}
        </pattern>
        <linearGradient id={`${uid}-bag-shade`} x1="0%" y1="0%" x2="85%" y2="100%">
          <stop offset="0" stopColor={tone(hair, 0.08)} />
          <stop offset="1" stopColor={tone(hair, -0.35)} />
        </linearGradient>
      </defs>
      {layer === 'back' && <path d={BAG} fill={`url(#${uid}-bag-shade)`} />}
      <g clipPath={`url(#${uid}-bag)`}>
        {layer === 'back' && Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${102 + i * 8} 41C${90 + i * 10} 80 ${95 + i * 9} 112 ${126 + i * 4} 147`} stroke={tone(hair, -0.5)} strokeWidth="0.45" fill="none" opacity="0.5" />
        ))}
        <path d={d} fill={`url(#${uid}-net)`} opacity={opacity} />
      </g>
      <path d={d} fill="none" stroke={color} strokeWidth={item.kind === 'chenille' ? 2 : 1.2} opacity={opacity} />
      {layer === 'front' && (
        <g>
          <path d={RIM} fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
          <path d={RIM} fill="none" stroke={tone(color, 0.32)} strokeWidth="0.55" />
          <g transform="translate(111 54) rotate(-25)">
            <path d="M0 0C-13 -10 -14 7 0 2C13 -10 15 7 0 2Z" fill={ribbon} stroke={tone(ribbon, -0.3)} strokeWidth="0.55" />
            <path d="M-1 2Q-7 10 -6 15M1 2Q8 8 6 13" fill="none" stroke={ribbon} strokeWidth="2.8" />
            <ellipse rx="2" ry="3" fill={tone(ribbon, -0.2)} />
          </g>
        </g>
      )}
    </g>
  );
}

/* ── 2. Атласные петли Инфанты ── */
function SatinLoops({ layer, color, uid }: { layer: Layer; color: string; uid: string }) {
  const rings = Array.from({ length: layer === 'back' ? 6 : 4 }, (_, i) => {
    const x = layer === 'back' ? 99 + (i % 2) * 7 : 111 + (i % 2) * 4;
    const y = 41 + i * 11;
    const h = 26 - i * 1.4;
    return { x, y, h, rotation: -8 + i * 3 };
  });
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-satin`} x1="0%" y1="0%" x2="100%" y2="30%">
          <stop offset="0" stopColor={tone(color, -0.42)} /><stop offset="0.4" stopColor={color} /><stop offset="0.56" stopColor={tone(color, 0.48)} /><stop offset="0.78" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.45)} />
        </linearGradient>
      </defs>
      {[false, true].map((mirror) => (
        <g key={String(mirror)} transform={mirror ? 'translate(300 0) scale(-1 1)' : undefined}>
          {rings.map(({ x, y, h, rotation }, i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${rotation})`}>
              <path d={`M0 0C-8 3 -8 ${h - 1} -2 ${h}C5 ${h + 2} 7 6 0 0ZM-0.4 5C3 8 2 ${h - 3} -1.5 ${h - 4}C-5 ${h - 5} -4 9 -0.4 5Z`} fill={`url(#${uid}-satin)`} fillRule="evenodd" stroke={tone(color, -0.4)} strokeWidth="0.22" />
              <path d={`M-2 3C-7 8 -6 ${h - 4} -2 ${h - 1}`} fill="none" stroke={tone(color, 0.58)} strokeWidth="0.48" opacity="0.75" />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

/* ── Текстура каракуля (Persian lamb / astrakhan) ── */
function AstrakhanDef({ uid, color }: { uid: string; color: string }) {
  return (
    <defs>
      <pattern id={`${uid}-karakul`} width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M1 3C1.5 1.5 3 1.5 3.5 3C4 4.5 5.5 4.5 5 2.5" fill="none" stroke={tone(color, 0.28)} strokeWidth="0.75" strokeLinecap="round" />
        <path d="M0.5 4.5C1 5.5 2.5 5.5 3 4.5" fill="none" stroke={tone(color, -0.32)} strokeWidth="0.5" strokeLinecap="round" />
      </pattern>
    </defs>
  );
}

/* ── 3. Bruyère 1939: «Burnt Toast» соломенная канотье ── */
function SailorHat({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <ellipse cx="150" cy="50" rx="66" ry="11" fill={tone(color, -0.3)} stroke={tone(color, -0.5)} strokeWidth="0.8" />
        <path d="M112 46C114 24 130 14 150 14C170 14 186 24 188 46Z" fill={tone(color, -0.35)} />
      </g>
    );
  }
  return (
    <g transform="translate(-4 -2) rotate(-5 150 48)">
      <defs>
        <linearGradient id={`${uid}-straw`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.32)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.32)} />
        </linearGradient>
        <pattern id={`${uid}-dots`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.3" fill="#1b1816" />
        </pattern>
      </defs>

      {/* Поля канотье с текстурой соломенных кругов */}
      <ellipse cx="150" cy="52" rx="72" ry="14" fill={`url(#${uid}-straw)`} stroke={tone(color, -0.45)} strokeWidth="0.8" />
      <ellipse cx="150" cy="50" rx="69" ry="11" fill="none" stroke={tone(color, -0.2)} strokeWidth="0.6" strokeDasharray="3 2" />
      <ellipse cx="150" cy="48" rx="65" ry="9" fill="none" stroke={tone(color, 0.25)} strokeWidth="0.6" />

      {/* Плоская цилиндрическая тулья */}
      <path d="M116 48C116 22 130 12 150 12C170 12 184 22 184 48C184 56 168 60 150 60C132 60 116 56 116 48Z" fill={`url(#${uid}-straw)`} stroke={tone(color, -0.48)} strokeWidth="0.85" strokeLinejoin="round" />
      <path d="M120 34C134 18 166 18 180 34C166 26 134 26 120 34Z" fill={tone(color, 0.35)} opacity="0.65" />

      {/* Трёхцветная шёлковая лента (синий, белый, красный) */}
      <path d="M116 46C132 55 168 55 184 46L184 52C168 61 132 61 116 52Z" fill="#203a6b" />
      <path d="M116 48C132 57 168 57 184 48L184 51C168 60 132 60 116 51Z" fill="#f7f4ec" />
      <path d="M116 50C132 59 168 59 184 50L184 52C168 61 132 61 116 52Z" fill="#9c242c" />

      {/* Огромный бант в горошек на левой стороне тульи */}
      <g transform="translate(112 36) rotate(-22)">
        <path d="M0 0C-16 -16 -24 -4 -18 8C-10 16 0 8 0 0ZM0 0C16 -16 24 -4 18 8C10 16 0 8 0 0Z" fill={accent} stroke="#2b2522" strokeWidth="0.6" />
        <path d="M0 0C-16 -16 -24 -4 -18 8C-10 16 0 8 0 0ZM0 0C16 -16 24 -4 18 8C-10 16 0 8 0 0Z" fill={`url(#${uid}-dots)`} opacity="0.85" />
        <ellipse rx="3.5" ry="4.5" fill="#1b1816" />
      </g>
    </g>
  );
}

/* ── 4. 1938: Ток из каракуля с вимплом-вуалью ── */
function PersianToqueWithWimple({ color, layer, uid }: { color: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <AstrakhanDef uid={uid} color={color} />
        {/* Задняя часть толка */}
        <path d="M118 42C116 22 130 12 150 12C170 12 184 22 182 42C180 52 166 56 150 56C134 56 120 52 118 42Z" fill={color} />
        <path d="M118 42C116 22 130 12 150 12C170 12 184 22 182 42C180 52 166 56 150 56C134 56 120 52 118 42Z" fill={`url(#${uid}-karakul)`} />

        {/* Пышный жоржетовый вимпл, обнимающий затылок и плечи */}
        <path d="M106 48C94 76 92 116 104 150C116 162 184 162 196 150C208 116 206 76 194 48Z" fill={tone(color, 0.08)} opacity="0.94" stroke={tone(color, -0.35)} strokeWidth="0.6" />
        {/* Вертикальные драпировочные складки */}
        {[-36, -24, -12, 0, 12, 24, 36].map((dx, i) => (
          <path key={i} d={`M${150 + dx} 52C${150 + dx * 1.15} 90 ${150 + dx * 1.25} 128 ${150 + dx * 1.1} 154`} fill="none" stroke={tone(color, -0.32)} strokeWidth="1.2" opacity="0.6" />
        ))}
      </g>
    );
  }

  return (
    <g>
      <AstrakhanDef uid={uid} color={color} />
      {/* Маленький плотный ток на макушке */}
      <path d="M120 44C118 24 132 12 150 12C168 12 182 24 180 44C178 52 166 56 150 56C134 56 122 52 120 44Z" fill={color} stroke={tone(color, -0.45)} strokeWidth="0.8" />
      <path d="M120 44C118 24 132 12 150 12C168 12 182 24 180 44C178 52 166 56 150 56C134 56 122 52 120 44Z" fill={`url(#${uid}-karakul)`} />
      <path d="M126 30C136 18 164 18 174 30C164 24 136 24 126 30Z" fill={tone(color, 0.35)} opacity="0.4" />

      {/* Драпированные края вимпла, обрамляющие щёки и шею спереди */}
      <path d="M108 50C98 74 96 106 106 136C112 144 126 142 128 132C120 114 118 84 122 58Z" fill={tone(color, 0.05)} stroke={tone(color, -0.35)} strokeWidth="0.6" />
      <path d="M192 50C202 74 204 106 194 136C188 144 174 142 172 132C180 114 182 84 178 58Z" fill={tone(color, 0.05)} stroke={tone(color, -0.35)} strokeWidth="0.6" />

      {/* Складки ткани вимпла вокруг лица */}
      <path d="M112 56C106 82 108 112 118 134" fill="none" stroke={tone(color, 0.3)} strokeWidth="0.9" opacity="0.5" />
      <path d="M188 56C194 82 192 112 182 134" fill="none" stroke={tone(color, 0.3)} strokeWidth="0.9" opacity="0.5" />
    </g>
  );
}

/* ── 5. Schiaparelli 1938: «Doll's Hat» с пером и розой-капустой ── */
function DollsHat({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        {/* Бархатная лента вокруг затылка */}
        <path d="M118 64C120 44 134 36 150 36C166 36 180 44 182 64" fill="none" stroke={tone(color, -0.4)} strokeWidth="3.2" strokeLinecap="round" />
        {/* Страусиное перо, уходящее назад */}
        <path d="M142 22C140 -2 152 -18 168 -24C158 -16 150 0 152 20" fill={tone(color, -0.3)} opacity="0.8" />
      </g>
    );
  }

  return (
    <g transform="translate(-8 -4) rotate(-14 150 38)">
      <defs>
        <linearGradient id={`${uid}-doll-felt`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.28)} /><stop offset="1" stopColor={tone(color, -0.4)} />
        </linearGradient>
      </defs>

      {/* Длинное изогнутое страусиное перо, рвущееся вверх-назад */}
      <g transform="translate(136 16) rotate(-28)">
        <path d="M0 0C-4 -20 6 -42 22 -54C12 -38 6 -16 0 0Z" fill={tone(color, 0.1)} stroke={tone(color, -0.45)} strokeWidth="0.6" />
        <path d="M0 0C-4 -20 6 -42 22 -54" fill="none" stroke={tone(color, 0.45)} strokeWidth="0.9" strokeLinecap="round" />
        {/* Бородки страусиного пера */}
        {[-12, -22, -32, -42].map((y, i) => (
          <path key={i} d={`M${i * 3} ${y}Q${i * 4 - 8} ${y - 4} ${i * 5 - 12} ${y + 2}`} fill="none" stroke={tone(color, 0.35)} strokeWidth="0.7" opacity="0.7" />
        ))}
      </g>

      {/* Крошечная кукольная шапочка-таблетка */}
      <ellipse cx="150" cy="42" rx="22" ry="7" fill={tone(color, -0.2)} stroke={tone(color, -0.45)} strokeWidth="0.6" />
      <path d="M130 40C130 24 138 16 150 16C162 16 170 24 170 40C170 46 160 50 150 50C140 50 130 46 130 40Z" fill={`url(#${uid}-doll-felt)`} stroke={tone(color, -0.5)} strokeWidth="0.75" />

      {/* Огромная пышная роза-капуста (pink cabbage rose) */}
      <g transform="translate(164 28)">
        <circle r="9" fill={accent} stroke={tone(accent, -0.35)} strokeWidth="0.6" />
        <circle r="6.2" fill={tone(accent, 0.2)} />
        <circle r="3.8" fill={tone(accent, -0.15)} />
        <circle r="1.6" fill="#fff" opacity="0.7" />
        <path d="M-6 0C-4 -5 4 -5 6 0C4 5 -4 5 -6 0Z" fill="none" stroke={tone(accent, -0.3)} strokeWidth="0.6" />
      </g>

      {/* Бархатная лента, завязывающаяся под подбородком */}
      <path d="M136 46C130 68 132 94 144 112" fill="none" stroke={tone(color, -0.4)} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M164 46C170 68 168 94 156 112" fill="none" stroke={tone(color, -0.4)} strokeWidth="2.8" strokeLinecap="round" />
      {/* Бант под подбородком */}
      <g transform="translate(150 114)">
        <path d="M0 0C-10 -8 -16 2 -10 8C-4 12 0 4 0 0ZM0 0C10 -8 16 2 10 8C4 12 0 4 0 0Z" fill={tone(color, -0.3)} stroke={tone(color, -0.5)} strokeWidth="0.5" />
        <circle r="2" fill={tone(color, -0.5)} />
        <path d="M-2 4L-8 18M2 4L8 18" stroke={tone(color, -0.35)} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ── 6. Rose Valois 1939: Казачья папаха с золотым ожерельем ── */
function CossackCap({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <AstrakhanDef uid={uid} color={color} />
        {/* Высокий скошенный купол папахи назад */}
        <path d="M118 48C114 18 126 -6 152 -8C174 -10 188 16 184 48Z" fill={color} />
        <path d="M118 48C114 18 126 -6 152 -8C174 -10 188 16 184 48Z" fill={`url(#${uid}-karakul)`} />
      </g>
    );
  }

  return (
    <g transform="translate(2 -2) rotate(4 150 36)">
      <AstrakhanDef uid={uid} color={color} />
      {/* Высокая папаха с асимметричным заломом на правый бок */}
      <path d="M118 52C114 20 126 -6 152 -8C176 -10 188 14 184 52C180 62 166 66 150 66C134 66 120 62 118 52Z" fill={color} stroke={tone(color, -0.5)} strokeWidth="0.85" />
      <path d="M118 52C114 20 126 -6 152 -8C176 -10 188 14 184 52C180 62 166 66 150 66C134 66 120 62 118 52Z" fill={`url(#${uid}-karakul)`} />

      {/* Залом по диагонали каракуля */}
      <path d="M128 22C142 16 164 12 178 26" fill="none" stroke={tone(color, -0.45)} strokeWidth="2.4" opacity="0.8" />
      <path d="M126 34C140 22 168 20 178 36" fill="none" stroke={tone(color, 0.35)} strokeWidth="1.2" opacity="0.5" />

      {/* Золотое бусинное ожерелье на шее (Rose Valois) */}
      <g transform="translate(0 76)">
        <path d="M124 38C136 50 164 50 176 38" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <path d="M122 44C136 58 164 58 178 44" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const t = i / 7;
          const x = 124 + t * 52;
          const y = 38 + Math.sin(t * Math.PI) * 11;
          return <circle key={i} cx={x} cy={y} r="2.2" fill={tone(accent, 0.2)} stroke={tone(accent, -0.3)} strokeWidth="0.4" />;
        })}
      </g>
    </g>
  );
}

/* ── 7. Suzy 1939: Красный плюшевый ток с пером-шпагой (quill) ── */
function PlushToqueQuill({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <path d="M122 46C120 26 132 14 150 14C168 14 180 26 178 46Z" fill={tone(color, -0.3)} />
        {/* Задняя часть длинного пера-шпаги */}
        <path d="M128 14C122 -18 116 -46 108 -68" fill="none" stroke={tone(accent, -0.3)} strokeWidth="4.5" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g transform="translate(-4 -2) rotate(-8 150 40)">
      <defs>
        <linearGradient id={`${uid}-plush-red`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.35)} /><stop offset="0.45" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.35)} />
        </linearGradient>
      </defs>

      {/* Огромное прямое перо-шпага (black quill), рвущееся высоко вверх */}
      <g transform="translate(126 16)">
        <path d="M0 0C-6 -32 -14 -64 -22 -92C-10 -74 -4 -38 0 0Z" fill={accent} stroke={tone(accent, 0.4)} strokeWidth="0.6" />
        <path d="M0 0C-6 -32 -14 -64 -22 -92" fill="none" stroke={tone(accent, 0.65)} strokeWidth="1.2" strokeLinecap="round" />
        {/* Текстура бороздок пера */}
        {[-20, -40, -60, -80].map((y, i) => (
          <path key={i} d={`M${i * -2.5} ${y}L${i * -2.5 - 6} ${y - 4}`} stroke={tone(accent, 0.3)} strokeWidth="0.7" opacity="0.6" />
        ))}
      </g>

      {/* Плюшевый красный ток, надетый на лоб */}
      <path d="M122 48C120 26 132 12 150 12C168 12 180 26 178 48C176 58 164 62 150 62C136 62 124 58 122 48Z" fill={`url(#${uid}-plush-red)`} stroke={tone(color, -0.5)} strokeWidth="0.8" />
      <path d="M128 34C138 22 162 22 172 34C162 28 138 28 128 34Z" fill={tone(color, 0.35)} opacity="0.6" />

      {/* Чёрные шёлковые кручёные шнуры и висячие кисти */}
      <path d="M124 44C138 52 162 52 176 44" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="3 1.5" />
      <g transform="translate(174 46)">
        <circle r="3" fill={accent} />
        <path d="M-1 3L-4 22M2 3L4 22M0 3L0 24" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="0" cy="22" r="1.8" fill={tone(accent, 0.3)} />
      </g>

      {/* Большой шёлковый бант на шее */}
      <g transform="translate(150 118)">
        <path d="M0 0C-16 -12 -28 4 -16 12C-6 16 0 6 0 0ZM0 0C16 -12 28 4 16 12C6 16 0 6 0 0Z" fill="#f4efdf" stroke="#b0a894" strokeWidth="0.6" />
        <ellipse rx="3.5" ry="4" fill="#ddd5c2" />
        <path d="M-3 6L-12 28M3 6L12 28" stroke="#f4efdf" strokeWidth="4.5" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ── 8. Rose Valois 1939: Жёсткий красный цилиндр ── */
function TopperRoseValois({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <ellipse cx="150" cy="48" rx="54" ry="10" fill={tone(color, -0.35)} />
        <path d="M126 46C124 16 134 0 150 0C166 0 176 16 174 46Z" fill={tone(color, -0.3)} />
      </g>
    );
  }

  return (
    <g transform="translate(2 -4) rotate(6 150 44)">
      <defs>
        <linearGradient id={`${uid}-topper-red`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.35)} /><stop offset="0.45" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.35)} />
        </linearGradient>
      </defs>

      {/* Загнутые вверх поля */}
      <ellipse cx="150" cy="52" rx="58" ry="11" fill={color} stroke={tone(color, -0.45)} strokeWidth="0.8" />
      <ellipse cx="150" cy="50" rx="56" ry="8" fill={tone(color, 0.15)} opacity="0.4" />

      {/* Высокая расширяющаяся кверху тулья (flared top hat) */}
      <path d="M126 50C124 20 132 -2 150 -2C168 -2 176 20 174 50C174 58 162 60 150 60C138 60 126 58 126 50Z" fill={`url(#${uid}-topper-red)`} stroke={tone(color, -0.5)} strokeWidth="0.85" />
      <path d="M130 22C138 6 162 6 170 22C162 14 138 14 130 22Z" fill={tone(color, 0.4)} opacity="0.6" />

      {/* Чёрная репсовая лента (grosgrain ribbon) с широким бантом */}
      <path d="M126 46C138 52 162 52 174 46L174 52C162 58 138 58 126 52Z" fill={accent} />
      <path d="M126 46C138 52 162 52 174 46" fill="none" stroke={tone(accent, 0.4)} strokeWidth="0.6" />

      <g transform="translate(172 48) rotate(8)">
        <path d="M0 0C10 -10 18 -4 14 6C10 12 2 6 0 0Z" fill={accent} stroke={tone(accent, 0.3)} strokeWidth="0.5" />
        <path d="M0 0C-6 -8 -12 -2 -8 6C-5 10 0 5 0 0Z" fill={tone(accent, 0.15)} stroke={tone(accent, 0.3)} strokeWidth="0.5" />
        <circle r="2.2" fill={tone(accent, 0.2)} />
      </g>
    </g>
  );
}

/* ── 9. 1937: Шёлковый самозавязывающийся тюрбан ── */
function SelfTiedTurban({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <path d="M116 52C114 30 128 16 150 16C172 16 186 30 184 52C180 62 166 66 150 66C134 66 120 62 116 52Z" fill={tone(color, -0.28)} />
        {/* Центральный задний шов по выкройке с постера */}
        <path d="M150 16L150 66" stroke={tone(color, -0.45)} strokeWidth="1.2" strokeDasharray="2 1.5" />
      </g>
    );
  }

  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-turban-silk`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.35)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.32)} />
        </linearGradient>
      </defs>

      {/* Мягкая основа тюрбана, полностью закрывающая линию роста волос */}
      <path d="M114 56C112 30 128 14 150 14C172 14 188 30 186 56C182 68 166 70 150 70C134 70 118 68 114 56Z" fill={`url(#${uid}-turban-silk)`} stroke={tone(color, -0.45)} strokeWidth="0.8" />

      {/* Диагональные концентрические складки ткани */}
      <path d="M116 52C132 38 156 34 180 40C186 46 184 54 182 58C166 50 144 48 126 54C118 56 116 54 116 52Z" fill={tone(color, -0.2)} opacity="0.8" />
      <path d="M118 44C134 32 162 32 182 44C172 36 138 36 122 44Z" fill={tone(color, 0.3)} opacity="0.6" />
      <path d="M116 60C136 50 164 50 184 60" fill="none" stroke={tone(color, -0.35)} strokeWidth="1.4" opacity="0.65" />
      <path d="M120 38C138 24 162 24 180 38" fill="none" stroke={tone(color, 0.25)} strokeWidth="0.8" opacity="0.7" />

      {/* Центральный передний узел-перехлёст */}
      <g transform="translate(150 36)">
        <path d="M0 0C-12 -12 -22 -4 -16 8C-10 14 -2 8 0 0ZM0 0C12 -12 22 -4 16 8C10 14 2 8 0 0Z" fill={tone(color, 0.12)} stroke={tone(color, -0.38)} strokeWidth="0.6" />
        <ellipse rx="4.5" ry="3.5" fill={color} stroke={tone(color, -0.4)} strokeWidth="0.5" />
        <circle r="1.5" fill={accent} />
      </g>
    </g>
  );
}

/* ── 10. Patou 1939: Чёрный бархатный шако с петушиными перьями ── */
function ShakoPatou({ color, layer, uid }: { color: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <path d="M124 50C122 22 134 6 150 6C166 6 178 22 176 50Z" fill={tone(color, -0.35)} />
        {/* Перья, идущие назад */}
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${140 + i * 7} 8C${138 + i * 6} -14 ${144 + i * 8} -32 ${148 + i * 9} -46`} fill="none" stroke={tone(color, 0.15)} strokeWidth="2.8" strokeLinecap="round" opacity="0.75" />
        ))}
      </g>
    );
  }

  return (
    <g transform="translate(4 -4) rotate(8 150 42)">
      <defs>
        <linearGradient id={`${uid}-shako-velvet`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.3)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.38)} />
        </linearGradient>
      </defs>

      {/* Высокий конический бархатный корпус шако */}
      <path d="M126 54C124 22 136 6 150 6C164 6 176 22 174 54C172 64 160 68 150 68C140 68 128 64 126 54Z" fill={`url(#${uid}-shako-velvet)`} stroke={tone(color, -0.5)} strokeWidth="0.85" />
      <path d="M130 30C138 14 162 14 170 30C162 22 138 22 130 30Z" fill={tone(color, 0.35)} opacity="0.6" />

      {/* Пышный фонтан изогнутых петушиных перьев, рвущихся вверх-вперёд */}
      <g transform="translate(144 14)">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const spread = (i - 3) * 6;
          return (
            <g key={i}>
              <path d={`M${spread * 0.8} 0C${spread * 1.2} -24 ${spread * 1.8 - 10} -48 ${spread * 2 - 18} -68`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
              <path d={`M${spread * 0.8} 0C${spread * 1.2} -24 ${spread * 1.8 - 10} -48 ${spread * 2 - 18} -68`} fill="none" stroke={tone(color, 0.45)} strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
            </g>
          );
        })}
      </g>

      {/* Золотая эмблема спереди */}
      <circle cx="150" cy="38" r="3.6" fill="#d4af37" stroke="#8a6e2e" strokeWidth="0.5" />
      <circle cx="150" cy="38" r="1.5" fill="#fff" opacity="0.8" />
    </g>
  );
}

/* ── 11. Suzy 1939: Красный бархатный снуд-капюшон ── */
function VelvetSnoodHood({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <defs>
          <linearGradient id={`${uid}-velvet-drape`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0" stopColor={tone(color, 0.15)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.38)} />
          </linearGradient>
        </defs>

        {/* Обширный драпированный капюшон-снуд, падающий вокруг шеи и плеч */}
        <path d="M102 46C90 74 88 116 98 148C110 164 190 164 202 148C212 116 210 74 198 46C186 32 114 32 102 46Z" fill={`url(#${uid}-velvet-drape)`} stroke={tone(color, -0.45)} strokeWidth="0.75" />

        {/* Богатые складки бархатной ткани */}
        {[-38, -26, -14, 0, 14, 26, 38].map((dx, i) => (
          <path key={i} d={`M${150 + dx} 48C${150 + dx * 1.15} 84 ${150 + dx * 1.25} 120 ${150 + dx * 1.1} 154`} fill="none" stroke={tone(color, -0.35)} strokeWidth="1.4" opacity="0.7" />
        ))}
        {[-32, -18, 0, 18, 32].map((dx, i) => (
          <path key={i} d={`M${150 + dx} 52C${150 + dx * 1.1} 86 ${150 + dx * 1.2} 122 ${150 + dx * 1.05} 150`} fill="none" stroke={tone(color, 0.35)} strokeWidth="0.7" opacity="0.55" />
        ))}
      </g>
    );
  }

  return (
    <g>
      {/* Боковые драпировки бархата спереди */}
      <path d="M104 48C94 72 94 104 102 134C110 142 122 140 124 130C118 110 116 80 120 54Z" fill={color} stroke={tone(color, -0.4)} strokeWidth="0.6" />
      <path d="M196 48C206 72 206 104 198 134C190 142 178 140 176 130C182 110 184 80 180 54Z" fill={color} stroke={tone(color, -0.4)} strokeWidth="0.6" />

      {/* Большой структурированный бархатный бант на макушке головы */}
      <g transform="translate(150 28)">
        <path d="M0 0C-18 -16 -28 -2 -18 8C-8 14 0 6 0 0ZM0 0C18 -16 28 -2 18 8C8 14 0 6 0 0Z" fill={accent} stroke={tone(accent, -0.45)} strokeWidth="0.75" />
        <path d="M0 0C-16 -12 -22 -2 -16 6ZM0 0C16 -12 22 -2 16 6" fill="none" stroke={tone(accent, 0.35)} strokeWidth="0.8" />
        <ellipse rx="4" ry="4.5" fill={tone(accent, -0.25)} />
      </g>
    </g>
  );
}

/* ── 12. Лётные очки-гогглы, посаженные на лоб (без верхней дуги, с тонкими ушками) ── */
function AviatorGoggles({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        {/* Боковой ремень за головой */}
        <path d="M104 38C96 44 94 56 98 68L106 65C102 54 104 46 112 41Z" fill={tone(accent, -0.4)} />
        <path d="M196 38C204 44 206 56 202 68L194 65C198 54 196 46 188 41Z" fill={tone(accent, -0.4)} />
      </g>
    );
  }

  const lens = (
    <>
      {/* Мягкая прокладка / корпус очков */}
      <ellipse rx="22" ry="15" fill={tone(color, -0.15)} stroke={tone(color, -0.5)} strokeWidth="0.8" />
      <ellipse rx="20" ry="13.2" fill={tone(color, 0.15)} />
      {/* Металлический ободок и выпуклое стекло */}
      <ellipse rx="18.2" ry="11.8" fill={`url(#${uid}-glass)`} stroke={tone(color, -0.42)} strokeWidth="1.2" />
      {/* Блики и отражения */}
      <path d="M-14 -4C-10 -9.5 -2 -10.5 5 -7.5C-2 -7.5 -8.5 -4 -12 1.5Z" fill="#ffffff" opacity="0.65" />
      <path d="M3 5C7.5 2.5 11 -0.5 13 -3.5C13 1 9 4.8 4 6.5Z" fill="#ffffff" opacity="0.25" />
      <ellipse rx="18.2" ry="11.8" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.75" />
    </>
  );

  return (
    <g transform="translate(0 -2)">
      <defs>
        <linearGradient id={`${uid}-glass`} x1="10%" y1="5%" x2="90%" y2="95%">
          <stop offset="0" stopColor="#f7faf8" />
          <stop offset="0.28" stopColor="#d2dddb" />
          <stop offset="0.7" stopColor="#879997" />
          <stop offset="1" stopColor="#4f5e5c" />
        </linearGradient>
        <linearGradient id={`${uid}-strap`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0" stopColor={tone(accent, -0.3)} />
          <stop offset="0.5" stopColor={accent} />
          <stop offset="1" stopColor={tone(accent, -0.3)} />
        </linearGradient>
      </defs>

      {/* Тонкие эластичные боковые ремешки, уходящие за виски (без дуги над макушкой!) */}
      <path d="M106 39C102 39 98 42 96 46L98 49C101 46 104 43 108 43Z" fill={`url(#${uid}-strap)`} />
      <path d="M194 39C198 39 202 42 204 46L202 49C199 46 196 43 192 43Z" fill={`url(#${uid}-strap)`} />

      {/* Тонкие металлические шарнирные ушки по бокам очков */}
      <g transform="translate(106 41)">
        <rect x="-1" y="-4.5" width="3" height="9" rx="1.2" fill={tone(color, 0.45)} stroke={tone(color, -0.4)} strokeWidth="0.4" />
        <circle cx="0.5" cy="0" r="1.1" fill={tone(color, -0.2)} />
      </g>
      <g transform="translate(194 41)">
        <rect x="-2" y="-4.5" width="3" height="9" rx="1.2" fill={tone(color, 0.45)} stroke={tone(color, -0.4)} strokeWidth="0.4" />
        <circle cx="-0.5" cy="0" r="1.1" fill={tone(color, -0.2)} />
      </g>

      {/* Окуляры очков (левый и правый) */}
      <g transform="translate(128 40) rotate(-6)">{lens}</g>
      <g transform="translate(172 40) rotate(6)">{lens}</g>

      {/* Тонкая металлическая переносица с шарниром/винтом */}
      <path d="M144 40C147 37.5 153 37.5 156 40C153 42.5 147 42.5 144 40Z" fill={tone(color, 0.35)} stroke={tone(color, -0.45)} strokeWidth="0.5" />
      <circle cx="150" cy="40" r="1.5" fill={tone(color, -0.1)} />
      <circle cx="150" cy="40" r="0.6" fill="#ffffff" opacity="0.8" />
    </g>
  );
}

/* ── 13. Карбункл: гранёный камень на лбу ── */
function ForeheadCarbuncle({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') return null;
  return (
    <g transform="translate(150 57)">
      <defs>
        <radialGradient id={`${uid}-gem`} cx="40%" cy="32%" r="72%">
          <stop offset="0" stopColor={tone(color, 0.6)} />
          <stop offset="0.4" stopColor={tone(color, 0.12)} />
          <stop offset="0.78" stopColor={color} />
          <stop offset="1" stopColor={tone(color, -0.5)} />
        </radialGradient>
      </defs>

      {/* Металлическая оправа */}
      <ellipse rx="14.6" ry="9.6" fill={tone(accent, -0.28)} />
      <ellipse rx="13.6" ry="8.8" fill={tone(accent, 0.15)} />
      <ellipse rx="12.8" ry="8.1" fill={tone(accent, -0.35)} />

      {/* Сам камень */}
      <ellipse rx="12.2" ry="7.5" fill={`url(#${uid}-gem)`} stroke={tone(color, -0.55)} strokeWidth="0.6" />

      {/* Грани огранки */}
      <path d="M-12.2 0Q-6 -4.4 0 -4.9Q6 -4.4 12.2 0Q6 4.4 0 4.9Q-6 4.4 -12.2 0Z" fill="none" stroke={tone(color, 0.35)} strokeWidth="0.55" opacity="0.65" />
      <path d="M-6.6 -2.6L-2.6 0L-6.6 2.6M6.6 -2.6L2.6 0L6.6 2.6" fill="none" stroke={tone(color, -0.4)} strokeWidth="0.5" opacity="0.72" />
      <path d="M0 -4.9L0 4.9" stroke={tone(color, -0.35)} strokeWidth="0.4" opacity="0.4" />

      {/* Блики */}
      <ellipse cx="-4.2" cy="-2.7" rx="3.7" ry="1.7" fill="#ffffff" opacity="0.6" transform="rotate(-16 -4.2 -2.7)" />
      <ellipse cx="4.6" cy="2.5" rx="2.1" ry="0.95" fill="#ffffff" opacity="0.26" />

      {/* Крапаны оправы */}
      {[-11.5, 0, 11.5].map((x, i) => (
        <circle key={i} cx={x} cy={i === 1 ? -7.9 : 0} r="1.5" fill={tone(accent, 0.3)} stroke={tone(accent, -0.4)} strokeWidth="0.4" />
      ))}
      <circle cx="0" cy="7.9" r="1.5" fill={tone(accent, 0.3)} stroke={tone(accent, -0.4)} strokeWidth="0.4" />
    </g>
  );
}

/* ── Диспетчер отрисовки головных уборов ── */
function StructuredHat({ item, layer, face, uid }: { item: PosterHeadwearDef; layer: Layer; face: PosterSettings; uid: string }) {
  const color = face.posterHatColor || item.color || '#1c1917';
  const accent = face.posterRibbonColor || face.ribbonColor || item.accent || '#c9a24b';
  switch (item.kind) {
    case 'sailor': return <SailorHat color={color} accent={accent} layer={layer} uid={uid} />;
    case 'toque': return <PersianToqueWithWimple color={color} layer={layer} uid={uid} />;
    case 'doll': return <DollsHat color={color} accent={accent} layer={layer} uid={uid} />;
    case 'cossack': return <CossackCap color={color} accent={accent} layer={layer} uid={uid} />;
    case 'plush': return <PlushToqueQuill color={color} accent={accent} layer={layer} uid={uid} />;
    case 'topper': return <TopperRoseValois color={color} accent={accent} layer={layer} uid={uid} />;
    case 'turban': return <SelfTiedTurban color={color} accent={accent} layer={layer} uid={uid} />;
    case 'shako': return <ShakoPatou color={color} layer={layer} uid={uid} />;
    case 'snood-hood': return <VelvetSnoodHood color={color} accent={accent} layer={layer} uid={uid} />;
    case 'goggles': return <AviatorGoggles color={color} accent={accent} layer={layer} uid={uid} />;
    case 'forehead-gem': return <ForeheadCarbuncle color={color} accent={accent} layer={layer} uid={uid} />;
    default: return null;
  }
}

export const PosterHeadwear = memo(function PosterHeadwear({ id, layer = 'front', face = {}, applyFit = false }: {
  id: string; layer?: Layer; face?: PosterSettings; applyFit?: boolean;
}) {
  const uid = `poster-hat-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const item = POSTER_HEADWEAR.find((entry) => entry.id === id);
  if (!item) return null;
  const ribbon = face.posterRibbonColor || face.ribbonColor || item.accent || '#bda175';
  const transform = applyFit ? posterHatTransform(face) : undefined;
  const snood = item.kind === 'cord' || item.kind === 'ribbon' || item.kind === 'chenille';
  return (
    <g data-poster-headwear={id} data-layer={layer} transform={transform}>
      {item.kind === 'satin-loops' && <SatinLoops layer={layer} uid={uid} color={ribbon} />}
      {snood && <NetSnood item={item} layer={layer} face={face} uid={uid} />}
      {!snood && item.kind !== 'satin-loops' && <StructuredHat item={item} layer={layer} face={face} uid={uid} />}
    </g>
  );
});

```

## src/features/poster1930/items.tsx

```tsx
import type { ReactNode } from 'react';
import { POSTER_HAIR } from './designs';
import { PosterHair } from './PosterHair';
import { POSTER_HEADWEAR, PosterHeadwear } from './PosterHeadwear';
import type { BBox, PosterSettings } from './types';

interface RenderContext { face?: PosterSettings }

// Structural subset of the handoff's Item. Agent mode should verify this with
// `satisfies Item[]` in the real repository, without replacing its Item type.
export interface PosterItem {
  id: string;
  name: string;
  category: 'hair' | 'headgear' | 'accessories';
  fit: 'f';
  z: number;
  bbox: BBox;
  back: (gender: unknown, rig?: unknown, ctx?: RenderContext) => ReactNode;
  render: (gender: unknown, rig?: unknown, ctx?: RenderContext) => ReactNode;
}

export const POSTER_ITEMS: PosterItem[] = [
  ...POSTER_HAIR.map((design): PosterItem => ({
    id: design.id, name: `${design.name} (${design.year})`, category: 'hair', fit: 'f', z: 60, bbox: [...design.bbox],
    back: (_gender, _rig, ctx) => <PosterHair styleId={design.id} layer="back" face={ctx?.face} />,
    render: (_gender, _rig, ctx) => <PosterHair styleId={design.id} layer="front" face={ctx?.face} />,
  })),
  ...POSTER_HEADWEAR.map((item): PosterItem => ({
    id: item.id,
    name: `${item.name} (${item.year})`,
    category: item.category ?? 'headgear',
    fit: 'f',
    z: item.category === 'accessories' ? 75 : 70,
    bbox: [...item.bbox],
    back: (_gender, _rig, ctx) => <PosterHeadwear id={item.id} layer="back" face={ctx?.face} />,
    render: (_gender, _rig, ctx) => <PosterHeadwear id={item.id} layer="front" face={ctx?.face} />,
  })),
];

export function assertNoPosterCollisions(existing: ReadonlyArray<{ id: string }>): void {
  const ids = new Set(existing.map((item) => item.id));
  for (const item of POSTER_ITEMS) {
    if (ids.has(item.id)) throw new Error(`Poster item already registered: ${item.id}`);
    ids.add(item.id);
  }
}

```

## src/features/poster1930/checks.ts

```ts
import { POSTER_HAIR } from './designs';
import { mirrorCurl, resolvePosterCurl } from './engine';
import { POSTER_ITEMS } from './items';
import { POSTER_HEADWEAR, posterHatTransform } from './PosterHeadwear';

export interface PosterCheck { name: string; passed: boolean }

// These pure checks can run in the preview or a test runner in the real game.
// They do not replace screenshot tests or SVG export checks in a browser.
export function checkPosterCollection(): PosterCheck[] {
  const ids = POSTER_ITEMS.map((item) => item.id);
  const allCoils = POSTER_HAIR.flatMap((style) => [...style.front, ...style.back].flatMap((surface) => surface.coils ?? []));
  const badPath = (d: string) => !d || /NaN|Infinity|undefined/.test(d);
  return [
    { name: '16 причёсок и 15 уборов/аксессуаров', passed: POSTER_HAIR.length === 16 && POSTER_HEADWEAR.length === 15 && POSTER_ITEMS.length === 31 },
    { name: 'Нет свадебной фаты и нет дубля modern snood', passed: !POSTER_HEADWEAR.some((h) => /veil|bridal|фата/i.test(h.id + h.name)) && POSTER_HEADWEAR.filter((h) => h.kind === 'cord' || h.kind === 'ribbon' || h.kind === 'chenille').length === 3 },
    { name: 'Уникальные kind у шляп и аксессуаров', passed: ['sailor', 'doll', 'toque', 'cossack', 'plush', 'topper', 'turban', 'shako', 'snood-hood', 'goggles', 'forehead-gem'].every((k) => POSTER_HEADWEAR.some((h) => h.kind === k)) },
    { name: 'Косы-баранки: 48 звеньев вертикальных петель', passed: (() => {
      const coils = POSTER_HAIR.find((h) => h.id === 'hair-poster-1938-braided-coils');
      return !!coils && coils.front.filter((s) => /rotate/.test(s.transform ?? '')).length === 48;
    })() },
    { name: 'Уникальные новые ID без подмены старых', passed: new Set(ids).size === ids.length && ids.every((id) => /^(hair|headgear|acc)-poster-/.test(id)) },
    { name: 'Передний и задний слои у каждой причёски', passed: POSTER_HAIR.every((design) => design.front.length > 0 && design.back.length > 0) },
    { name: 'Конечные координаты на крайних настройках', passed: allCoils.every((spec) => [60, 100, 150].every((tight) => [70, 100, 140].every((volume) => {
      const result = resolvePosterCurl(spec, tight, volume);
      return [result.body, result.groove, result.shade, result.sheen, ...result.strands].every((d) => !badPath(d));
    }))) },
    { name: 'Зеркалирование локонов обратимо', passed: allCoils.every((spec) => {
      const twice = mirrorCurl(mirrorCurl(spec));
      return Math.abs(twice.x - spec.x) < 1e-8 && twice.y === spec.y && (twice.rotation ?? 0) === (spec.rotation ?? 0) && !!twice.mirrored === !!spec.mirrored;
    }) },
    { name: 'Масштаб шапки действует по обеим осям', passed: posterHatTransform({ hatScale: 125, hatWidth: 120 }).includes('scale(1.5 1.25)') },
    { name: 'Повторная генерация не меняет рисунок', passed: allCoils.every((spec) => JSON.stringify(resolvePosterCurl(spec)) === JSON.stringify(resolvePosterCurl(spec))) },
    { name: 'Миниатюры имеют ненулевой bbox', passed: POSTER_ITEMS.every((item) => item.bbox.every(Number.isFinite) && item.bbox[2] > 0 && item.bbox[3] > 0) },
  ];
}

```

## src/components/HeadStubble.tsx

```tsx
import { memo, useId, useMemo } from 'react';

/**
 * ============================================================================
 * HeadStubble.tsx — Автономный компонент стерни для головы (Face.tsx / Head.tsx)
 * ============================================================================
 *
 * ВАЖНО ДЛЯ AGENT MODE:
 * 1. Этот компонент вставляется в Face.tsx (или Head.tsx) СРАЗУ ПОСЛЕ отрисовки
 *    кожи головы (<path d={headPath} fill={skin} />) и ДО бровей/глаз/волос!
 * 2. НЕ ВСТАВЛЯТЬ в Hair.tsx! Стерня — это часть головы/кожи, а не парик.
 * 3. Он автоматически обрезается по контуру черепа (headPath) и рисует короткие
 *    тонкие волоски на висках и затылке.
 */

export type StubblePreset =
  | 'heydrich'       // Высокий пробор: ровная стерня на висках от брови до уха
  | 'undercut'       // Выбритые виски с обеих сторон (высокий андеркат)
  | 'clipper-crop'   // Армейский ёжик: стерня по всем бокам и затылку
  | 'himmler'        // Редкая низкая стерня около ушей
  | 'temples'        // Классическая лёгкая окантовка на висках
  | 'custom';        // Ручная настройка зон

export interface StubbleZone {
  side: 'left' | 'right' | 'nape' | 'both-temples';
  /** Верхняя граница в координатах лица (по умолчанию 52..62) */
  topY: number;
  /** Нижняя граница (по умолчанию 82..94) */
  bottomY: number;
  /** Отступ от центра лица по X (по умолчанию 28..42) */
  spreadX: number;
  /** Густота: 0..1 (по умолчанию 0.5) */
  density: number;
  /** Затухание: 'down' (редеет к шее), 'up' (редеет вверх), 'none' */
  fade?: 'down' | 'up' | 'none';
}

export interface HeadStubbleProps {
  /** SVG-путь контура головы, по которому обрезается стерня */
  headPath?: string;
  /** Готовый пресет стрижки */
  preset?: StubblePreset;
  /** Пользовательские зоны, если preset = 'custom' */
  zones?: StubbleZone[];
  /** Цвет волос (поддерживает hex, rgb или CSS-переменную var(--hair)) */
  hairColor?: string;
  /** Общий множитель густоты (0..150%, по умолчанию 100) */
  density?: number;
  /** Множитель длины волосков (50..175%, по умолчанию 100) */
  length?: number;
  /** Скрывать стерню при density = 0 */
  disabled?: boolean;
}

const PRESET_ZONES: Record<StubblePreset, StubbleZone[]> = {
  heydrich: [
    { side: 'left', topY: 54, bottomY: 86, spreadX: 38, density: 0.55, fade: 'down' },
    { side: 'right', topY: 56, bottomY: 86, spreadX: 38, density: 0.5, fade: 'down' },
    { side: 'nape', topY: 62, bottomY: 88, spreadX: 36, density: 0.5, fade: 'down' },
  ],
  undercut: [
    { side: 'left', topY: 50, bottomY: 88, spreadX: 40, density: 0.6, fade: 'down' },
    { side: 'right', topY: 50, bottomY: 88, spreadX: 40, density: 0.6, fade: 'down' },
    { side: 'nape', topY: 56, bottomY: 90, spreadX: 38, density: 0.55, fade: 'down' },
  ],
  'clipper-crop': [
    { side: 'left', topY: 58, bottomY: 90, spreadX: 40, density: 0.7, fade: 'none' },
    { side: 'right', topY: 58, bottomY: 90, spreadX: 40, density: 0.7, fade: 'none' },
    { side: 'nape', topY: 58, bottomY: 92, spreadX: 40, density: 0.7, fade: 'none' },
  ],
  himmler: [
    { side: 'left', topY: 62, bottomY: 86, spreadX: 36, density: 0.35, fade: 'down' },
    { side: 'right', topY: 62, bottomY: 86, spreadX: 36, density: 0.35, fade: 'down' },
    { side: 'nape', topY: 66, bottomY: 88, spreadX: 34, density: 0.35, fade: 'down' },
  ],
  temples: [
    { side: 'left', topY: 64, bottomY: 84, spreadX: 36, density: 0.4, fade: 'down' },
    { side: 'right', topY: 64, bottomY: 84, spreadX: 36, density: 0.4, fade: 'down' },
  ],
  custom: [],
};

// Детерминированный генератор псевдослучайных чисел
function pseudoRand(seed: number): number {
  const n = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return n - Math.floor(n);
}

interface GeneratedStroke {
  d: string;
  width: number;
  opacity: number;
}

interface RenderedZone {
  id: string;
  fillPath: string;
  fillOpacity: number;
  strokes: GeneratedStroke[];
}

// По умолчанию используется стандартный овал головы Atelier Linden (300x400)
const DEFAULT_HEAD_PATH = 'M114 72C111 50 126 33 150 33C174 33 189 50 187 72L185 93C183 111 168 124 150 130C132 124 117 111 115 93Z';

export const HeadStubble = memo(function HeadStubble({
  headPath = DEFAULT_HEAD_PATH,
  preset = 'heydrich',
  zones,
  hairColor = 'var(--hair, #3a2a1e)',
  density = 100,
  length = 100,
  disabled = false,
}: HeadStubbleProps) {
  const uid = `stubble-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const effectiveDensity = Math.max(0, Math.min(150, density)) / 100;
  const lengthScale = Math.max(0.5, Math.min(1.75, length / 100));

  const activeZones = useMemo(() => {
    if (zones && zones.length > 0) return zones;
    return PRESET_ZONES[preset] || PRESET_ZONES.heydrich;
  }, [preset, zones]);

  const renderedZones = useMemo((): RenderedZone[] => {
    if (disabled || effectiveDensity <= 0.02) return [];

    return activeZones.map((zone, zIdx) => {
      const isLeft = zone.side === 'left' || zone.side === 'both-temples';
      const isRight = zone.side === 'right' || zone.side === 'both-temples';
      const isNape = zone.side === 'nape';

      const strokes: GeneratedStroke[] = [];
      const topY = zone.topY;
      const botY = zone.bottomY;
      const height = botY - topY;
      const baseLength = 2.2 * lengthScale;

      // Ограничивающий полигон зоны стерни
      let fillPath = '';
      if (isLeft) {
        fillPath = `M111 ${topY}C113 ${topY - 2} 120 ${topY - 3} 128 ${topY}L130 ${botY}C122 ${botY + 3} 115 ${botY + 2} 112 ${botY - 2}Z`;
      } else if (isRight) {
        fillPath = `M189 ${topY}C187 ${topY - 2} 180 ${topY - 3} 172 ${topY}L170 ${botY}C178 ${botY + 3} 185 ${botY + 2} 188 ${botY - 2}Z`;
      } else if (isNape) {
        fillPath = `M118 ${topY}C130 ${topY - 2} 170 ${topY - 2} 182 ${topY}L184 ${botY}C170 ${botY + 4} 130 ${botY + 4} 116 ${botY}Z`;
      }

      const rows = Math.max(8, Math.round(height * 0.9));
      const cols = isNape ? 32 : 12;
      const zoneDensity = zone.density * effectiveDensity;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const seed = zIdx * 1000 + r * 37 + c * 17;
          const noise1 = pseudoRand(seed + 1);
          const noise2 = pseudoRand(seed + 2);
          const noise3 = pseudoRand(seed + 3);

          const tY = (r + 0.3 + noise1 * 0.4) / rows;
          const fadeMult = zone.fade === 'down'
            ? 1 - tY * 0.75
            : zone.fade === 'up'
              ? 0.25 + tY * 0.75
              : 1;

          // Пропускаем часть точек по плотности
          if (noise2 > zoneDensity * fadeMult * 1.3) continue;

          const y = topY + tY * height;
          let x = 150;

          if (isLeft) {
            const spread = 112 + (c / cols) * 16 + (noise3 - 0.5) * 2;
            x = spread;
          } else if (isRight) {
            const spread = 188 - (c / cols) * 16 + (noise3 - 0.5) * 2;
            x = spread;
          } else if (isNape) {
            const spread = 118 + (c / cols) * 64 + (noise3 - 0.5) * 3;
            x = spread;
          }

          // Генерируем короткую изогнутую линию волоска (Q-curve)
          const strokeLen = baseLength * (0.8 + noise1 * 0.4);
          const tiltX = isLeft ? (noise3 - 0.2) * 1.2 : isRight ? (0.2 - noise3) * 1.2 : (noise3 - 0.5) * 1.5;
          const endX = x + tiltX;
          const endY = y + strokeLen;
          const midX = x + tiltX * 0.4;
          const midY = y + strokeLen * 0.5;

          strokes.push({
            d: `M${x.toFixed(2)} ${y.toFixed(2)}Q${midX.toFixed(2)} ${midY.toFixed(2)} ${endX.toFixed(2)} ${endY.toFixed(2)}`,
            width: 0.32 + noise1 * 0.12,
            opacity: (0.45 + noise2 * 0.35) * fadeMult,
          });
        }
      }

      return {
        id: `${uid}-zone-${zIdx}`,
        fillPath,
        fillOpacity: Math.min(0.25, zone.density * effectiveDensity * 0.18),
        strokes,
      };
    });
  }, [activeZones, disabled, effectiveDensity, lengthScale, uid]);

  if (disabled || renderedZones.length === 0) return null;

  return (
    <g data-component="HeadStubble" className="head-stubble-layer" pointerEvents="none">
      <defs>
        {/* Маска, строго ограничивающая волоски контуром кожи головы */}
        <clipPath id={`${uid}-head-clip`} clipPathUnits="userSpaceOnUse">
          <path d={headPath} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${uid}-head-clip)`}>
        {renderedZones.map((zone) => (
          <g key={zone.id} data-zone={zone.id}>
            {/* Мягкая фоновая полупрозрачная растушёвка цвета волос на коже */}
            {zone.fillPath && (
              <path
                d={zone.fillPath}
                fill={hairColor}
                opacity={zone.fillOpacity}
              />
            )}
            {/* Тонкие изогнутые волоски стерни */}
            <g fill="none" stroke={hairColor} strokeLinecap="round">
              {zone.strokes.map((s, idx) => (
                <path
                  key={idx}
                  d={s.d}
                  strokeWidth={s.width}
                  opacity={s.opacity}
                />
              ))}
            </g>
          </g>
        ))}
      </g>
    </g>
  );
});
export default HeadStubble;

```
