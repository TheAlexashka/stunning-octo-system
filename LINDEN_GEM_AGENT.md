# ЗАДАНИЕ ДЛЯ AGENT MODE: ИНТЕГРАЦИЯ ОЧИЩЕННОЙ КОЛЛЕКЦИИ

Ты работаешь в репозитории https://github.com/TheAlexashka/shiny-potato (Ателье Линден).
Пользователь выбрал 27 предметов для добавления в игру.
В рабочем каталоге оставлены 6 женских и 10 мужских причёсок. Мужской раздел
головных уборов пуст; женские уборы и аксессуары сохранены.

## ВЫБРАННЫЕ ПРЕДМЕТЫ (27 шт.):
1. [Головной убор] Зелёное платье с запахом и пагодами (id: `cloth-1931-green-wrap`)
2. [Головной убор] Твидовый костюм с галстуком (id: `cloth-1931-tweed-suit`)
3. [Головной убор] Васильковое платье в горошек (id: `cloth-1931-blue-stole`)
4. [Головной убор] Платье с ярусными оборками (id: `cloth-1932-tiered-flounce`)
5. [Головной убор] Терракотовый ансамбль с пальто (id: `cloth-1932-terracotta-ensemble`)
6. [Головной убор] Терракотовое пальто нараспашку (id: `cloth-1932-terracotta-open`)
7. [Головной убор] Клетчатое платье с белыми манжетами (id: `cloth-1932-plaid-bias`)
8. [Головной убор] Чёрное манто с рукавами-пагода (id: `cloth-1933-batwing-coat`)
9. [Головной убор] Морской джемпер и синяя юбка (id: `cloth-1933-nautical-jumper`)
10. [Головной убор] Чёрное атласное платье с пелериной (id: `cloth-1934-satin-evening`)
11. [Головной убор] Чёрное платье с распахнутым болеро (id: `cloth-1934-satin-bolero`)
12. [Головной убор] Мятное платье с воланами на плечах (id: `cloth-1934-mint-tea`)
13. [Головной убор] Кобальтовое платье с жабо (id: `cloth-1935-cobalt-day`)
14. [Головной убор] Чёрный костюм с баской (id: `cloth-1935-peplum-dinner`)
15. [Головной убор] Бордовое платье с широкими плечами (id: `cloth-1936-burgundy-wool`)
16. [Головной убор] Шифоновое платье с рукавами-крыльями (id: `cloth-1936-floral-chiffon`)
17. [Головной убор] Брючный костюм-палаццо (id: `cloth-1937-palazzo-trousers`)
18. [Головной убор] Белый костюм с чёрным кантом (id: `cloth-1937-contrast-tailored`)
19. [Головной убор] Розовое платье в цветочек (id: `cloth-1937-pink-garden`)
20. [Головной убор] Графитовый костюм с плечиками (id: `cloth-1938-sculpted-sheath`)
21. [Головной убор] Голубое платье с белым воротничком (id: `cloth-1938-polka-puffs`)
22. [Головной убор] Синее платье с запахом в цветочек (id: `cloth-1939-royal-floral`)
23. [Головной убор] Костюм-униформа «Überfrau» (id: `cloth-1938-uberfrau-uniform`)
24. [Аксессуар] Трость с костяным набалдашником (id: `acc-1933-cane`)
25. [Аксессуар] Клатч-конверт с застёжкой (id: `acc-1937-clutch`)
26. [Аксессуар] Шёлковая косынка на шее (id: `acc-1934-silk-kerchief`)
27. [Аксессуар] Брошь-камелия (id: `acc-1935-camelia-brooch`)

---

## ПРАВИЛА ИНТЕГРАЦИИ:
1. НЕ ПЕРЕПИСЫВАЙ существующие файлы игры (App.tsx, Face.tsx, Hair.tsx, data/types.ts).
2. Создай приложенные файлы в папках `src/features/...` и `src/components/HeadStubble.tsx`.
3. Зарегистрируй выбранные предметы в `src/data/items.tsx`, импортируя их массивы:
   
4. ⚠️ **ПО СТЕРНЕ НА ГОЛОВЕ:** Стерня находится в компоненте `src/components/HeadStubble.tsx`.
   Вставь его в `Face.tsx` (или `Head.tsx`) **СРАЗУ ПОСЛЕ заливки кожи головы и ДО бровей/глаз/волос!**
   Не вставляй стерню в `Hair.tsx`. Подробный гайд: `src/features/stubble/STUBBLE_GUIDE.md`.


---

# ИНСТРУКЦИИ И ГАЙДЫ

## src/features/body/README.md

# body — фигура-манекен для одежды

Автономный бандл: `figureGeometry.ts` (математика) и `Body.tsx` (рендер).
Не зависит от причёсок и не содержит пигментации: ни родинок, ни веснушек,
ни витилиго — только тело.

## Что рисуется

- непрерывный силуэт `corePath`: шея, торс, таз и обе ноги одним контуром;
- руки отдельными поверхностями поверх торса, с кистями (`HAND_OUTLINE`);
- стопы под щиколотками (`FOOT_OUTLINE`), носки наружу;
- светотень: ключицы, грудь или грудные мышцы, талия, пупок, колени,
  мягкий мышечный рельеф по `body.muscle`.

Голова, лицо и причёска рисуются снаружи — `Body` начинается от шеи.

## Пропорции

`BodySel` в процентах: `height` 90..112, `shoulders` 80..125, `bust` 60..160,
`waist` 80..130, `hips` 80..130, `muscle` 0..250.

## Посадка будущей одежды

`getFigureGeometry(gender, body)` возвращает риг с точками `shoulders`,
`chest`, `waist`, `hips`, `crotch`, половинами обхватов (`chestHalf`,
`waistHalf`, `hipHalf`), сегментами ног (`outer`/`inner`) и опорными
высотами `anchors`: neck, shoulder, chest, underbust, waist, hip, crotch,
knee, ankle, floor.

Те же высоты продублированы в data-атрибутах корневой группы SVG
(`data-waist-y`, `data-hip-y`, `data-knee-y`…), а пустая группа
`data-clothing-layer` в превью — точка монтирования предметов.
Одежду строим в тех же координатах: ось фигуры x=150.


---

## src/features/accessories/README.md

# accessories — аксессуары 1930-х

Надодежный слой: рисуется поверх исподнего и одежды, допускает несколько
предметов одновременно (например меховая горжетка + клатч + перчатки).
Головные уборы и очки сюда намеренно не входят.

| id | год | что это |
| --- | --- | --- |
| acc-1931-fur-stole | 1931 | меховая горжетка через плечи |
| acc-1935-fur-muff | 1935 | меховая муфта на шёлковой ленте |
| acc-1933-cane | 1933 | трость с костяным набалдашником (в руке) |
| acc-1937-clutch | 1937 | клатч-конверт с застёжкой (в руке) |
| acc-1936-gloves-white | 1932–1936 | белые лайковые перчатки |
| acc-1937-gloves-black | 1937 | чёрные лайковые перчатки |
| acc-1934-silk-kerchief | 1934 | шёлковая косынка на шее |
| acc-1935-camelia-brooch | 1935 | брошь-камелия на лацкане |

Мех рисуется процедурно: контур предмета служит `clipPath`, внутри —
детерминированная сетка завитков, поэтому текстура следует за посадкой
фигуры. Перчатки строятся по `handTransform` руки, трость и клатч — от
точки кисти, поэтому следуют за пропорциями тела.


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
  headPath={headPath}
  preset={item.preset}
  zones={item.zones}
  hairColor="var(--hair)"
  density={100}
  length={menStubbleLength}
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

## src/features/body/figureGeometry.ts

```ts
/**
 * Геометрия фигуры для примерки одежды. Автономный модуль: не зависит от
 * причёсок и preview-компонентов. Система координат та же, что у портретов:
 * ось фигуры x=150, голова занимает y≈33..130, шея начинается около y=114.
 *
 * Здесь нет пигментации, родинок и веснушек — только тело.
 */

export type Gender = 'female' | 'male';
export type Side = -1 | 1;

export interface Point { x: number; y: number }
export interface Segment { a: Point; b: Point; c: Point; d: Point }

/** Пропорции фигуры в процентах, 100 — базовое телосложение. */
export interface BodySel {
  /** 90..112, общая длина ног и корпуса */
  height?: number;
  /** 80..125, ширина плеч */
  shoulders?: number;
  /** 60..160, объём груди */
  bust?: number;
  /** 80..130, талия */
  waist?: number;
  /** 80..130, бёдра */
  hips?: number;
  /** 0..250, выраженность мышечного рельефа */
  muscle?: number;
}

export const DEFAULT_BODY: Required<BodySel> = {
  height: 100,
  shoulders: 100,
  bust: 100,
  waist: 100,
  hips: 100,
  muscle: 25,
};

export interface ArmGeometry {
  side: Side;
  shoulder: Point;
  elbow: Point;
  hand: Point;
  /** замкнутый силуэт руки от плеча до запястья */
  path: string;
  handTransform: string;
}

export interface LegGeometry {
  side: Side;
  hip: Point;
  knee: Point;
  calf: Point;
  ankle: Point;
  footTransform: string;
  outer: Segment[];
  inner: Segment[];
  kneeWidth: number;
  ankleWidth: number;
}

/** Опорные высоты: по ним удобно строить вырезы и длины одежды. */
export interface FigureAnchors {
  neck: number;
  shoulder: number;
  chest: number;
  underbust: number;
  waist: number;
  hip: number;
  crotch: number;
  knee: number;
  ankle: number;
  floor: number;
}

export interface FigureRig {
  female: boolean;
  neckScale: number;
  neckBaseHalf: number;
  shoulders: [Point, Point];
  chest: Point;
  waist: Point;
  hips: [Point, Point];
  crotch: Point;
  chestHalf: number;
  waistHalf: number;
  hipHalf: number;
  bust: number;
  bustRadius: number;
  bustCenterY: number;
  bustOffset: number;
  arms: ArmGeometry[];
  legs: LegGeometry[];
  /** непрерывный силуэт: шея, торс, таз и обе ноги одним контуром */
  corePath: string;
  anchors: FigureAnchors;
}

const CENTER = 150;
const NECK_TOP = 114;
const NECK_BASE = 148;

const clamp = (value: number | undefined, fallback: number, min: number, max: number) =>
  Math.min(max, Math.max(min, typeof value === 'number' && Number.isFinite(value) ? value : fallback));

const round = (value: number) => Number(value.toFixed(2));
const at = (x: number, y: number): Point => ({ x: round(x), y: round(y) });

const segment = (a: Point, b: Point, c: Point, d: Point): Segment => ({ a, b, c, d });
const cubic = (s: Segment) => `C${s.b.x} ${s.b.y} ${s.c.x} ${s.c.y} ${s.d.x} ${s.d.y}`;
const reverse = (s: Segment): Segment => segment(s.d, s.c, s.b, s.a);

/** Плавная незамкнутая кривая через набор точек (Catmull-Rom → Безье). */
function chain(points: Point[]): string {
  let d = '';
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1 = at(p1.x + (p2.x - p0.x) / 6, p1.y + (p2.y - p0.y) / 6);
    const c2 = at(p2.x - (p3.x - p1.x) / 6, p2.y - (p3.y - p1.y) / 6);
    d += `C${c1.x} ${c1.y} ${c2.x} ${c2.y} ${p2.x} ${p2.y}`;
  }
  return d;
}

function normals(points: Point[]): Point[] {
  return points.map((_, index) => {
    const a = points[Math.max(0, index - 1)];
    const b = points[Math.min(points.length - 1, index + 1)];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy) || 1;
    return { x: -dy / length, y: dx / length };
  });
}

/** Конечность переменной толщины: замкнутая лента со скруглением на конце. */
function limbPath(points: Point[], halfWidths: number[]): string {
  const ns = normals(points);
  const outer = points.map((p, i) => at(p.x + ns[i].x * halfWidths[i], p.y + ns[i].y * halfWidths[i]));
  const inner = points.map((p, i) => at(p.x - ns[i].x * halfWidths[i], p.y - ns[i].y * halfWidths[i]));
  const last = points[points.length - 1];
  const prev = points[points.length - 2];
  const dx = last.x - prev.x;
  const dy = last.y - prev.y;
  const length = Math.hypot(dx, dy) || 1;
  const tipWidth = halfWidths[halfWidths.length - 1] * 1.25;
  const tip = at(last.x + (dx / length) * tipWidth, last.y + (dy / length) * tipWidth);
  const backInner = [...inner].reverse();
  return [
    `M${outer[0].x} ${outer[0].y}`,
    chain(outer),
    `Q${tip.x} ${tip.y} ${backInner[0].x} ${backInner[0].y}`,
    chain(backInner),
    'Z',
  ].join(' ');
}

/** Кисть: мягкая варежка, направлена вниз от запястья. */
export const HAND_OUTLINE =
  'M-6.4 0C-8.6 5.4 -9 12.4 -7.4 18.6C-5.8 25.2 -2.6 29.4 1 29.4C5 29.4 8.4 24.6 9.2 17.4C9.8 10.6 9 4.6 7.2 0Z';

/** Стопа: щиколотка в начале координат, носок смотрит наружу по +x. */
export const FOOT_OUTLINE =
  'M-7.2 -6.4C-10.4 0.4 -10 8.8 -5.6 13.4C-1 18 9 18.6 19.4 17.2C25.6 16.4 27.6 13.6 25.4 10.2C20 5 11.8 2.2 5.6 -2.2C1.6 -5.2 -2.4 -7.6 -7.2 -6.4Z';

export function between(a: Point, b: Point, t: number): Point {
  return at(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t);
}

export function getFigureGeometry(gender: Gender, body: BodySel = DEFAULT_BODY): FigureRig {
  const female = gender === 'female';

  const heightK = clamp(body.height, 100, 90, 112) / 100;
  const shoulderK = clamp(body.shoulders, 100, 80, 125) / 100;
  const bust = clamp(body.bust, 100, 60, 160) / 100;
  const waistK = clamp(body.waist, 100, 80, 130) / 100;
  const hipK = clamp(body.hips, 100, 80, 130) / 100;

  const shoulderY = 160;
  const chestY = 182;
  const waistY = round(250 * heightK);
  const hipY = round(waistY + (female ? 44 : 40));
  const crotchY = round(hipY + 20);
  const kneeY = round(crotchY + 120 * heightK);
  const calfY = round(kneeY + 46 * heightK);
  const ankleY = round(kneeY + 120 * heightK);

  const neckHalf = female ? 10.5 : 13;
  const neckBaseHalf = female ? 14 : 17;
  const shoulderHalf = round((female ? 43 : 52) * shoulderK);
  const chestHalf = round((female ? 36 : 45) * (0.94 + 0.06 * bust));
  const waistHalf = round((female ? 28 : 36) * waistK);
  const hipHalf = round((female ? 45 : 39) * hipK);

  const kneeAxis = female ? 23 : 26;
  const ankleAxis = female ? 19 : 21;
  const kneeHalf = female ? 11.5 : 12.8;
  const calfHalf = female ? 13.6 : 15.2;
  const ankleHalf = female ? 7.4 : 8.4;

  const shoulders: [Point, Point] = [
    at(CENTER - shoulderHalf, shoulderY),
    at(CENTER + shoulderHalf, shoulderY),
  ];
  const chest = at(CENTER, chestY);
  const waist = at(CENTER, waistY);
  const hips: [Point, Point] = [at(CENTER - hipHalf, hipY), at(CENTER + hipHalf, hipY)];
  const crotch = at(CENTER, crotchY);

  const legs: LegGeometry[] = ([-1, 1] as Side[]).map((side) => {
    const axisKnee = CENTER + side * kneeAxis;
    const axisAnkle = CENTER + side * ankleAxis;

    const hipOuter = at(CENTER + side * hipHalf, hipY);
    const kneeOuter = at(axisKnee + side * kneeHalf, kneeY);
    const calfOuter = at(axisAnkle + side * calfHalf, calfY);
    const ankleOuter = at(axisAnkle + side * ankleHalf, ankleY);

    const outer: Segment[] = [
      segment(
        hipOuter,
        at(hipOuter.x + side * 1.5, hipY + 42 * heightK),
        at(kneeOuter.x + side * 7, kneeY - 54 * heightK),
        kneeOuter,
      ),
      segment(
        kneeOuter,
        at(kneeOuter.x - side * 0.5, kneeY + 14),
        at(calfOuter.x + side * 1.5, calfY - 20),
        calfOuter,
      ),
      segment(
        calfOuter,
        at(calfOuter.x + side * 0.5, calfY + 26),
        at(ankleOuter.x + side * 2, ankleY - 24),
        ankleOuter,
      ),
    ];

    const ankleInner = at(axisAnkle - side * ankleHalf, ankleY);
    const kneeInner = at(axisKnee - side * kneeHalf, kneeY);
    const crotchInner = at(CENTER + side * 2.5, crotchY);

    const inner: Segment[] = [
      segment(
        ankleInner,
        at(ankleInner.x - side * 1.5, ankleY - 32),
        at(kneeInner.x - side * 2.5, kneeY + 34),
        kneeInner,
      ),
      segment(
        kneeInner,
        at(kneeInner.x - side * 3.5, kneeY - 48 * heightK),
        at(crotchInner.x + side * 12, crotchY + 34),
        crotchInner,
      ),
    ];

    return {
      side,
      hip: hipOuter,
      knee: at(axisKnee, kneeY),
      calf: at(axisAnkle, calfY),
      ankle: at(axisAnkle, ankleY),
      footTransform: `translate(${axisAnkle} ${ankleY}) scale(${side} 1)`,
      outer,
      inner,
      kneeWidth: kneeHalf,
      ankleWidth: ankleHalf,
    };
  });

  const arms: ArmGeometry[] = ([-1, 1] as Side[]).map((side) => {
    const shoulder = at(CENTER + side * (shoulderHalf - 6), shoulderY + 8);
    const elbow = at(CENTER + side * (shoulderHalf + 3), round(waistY + 18));
    const hand = at(CENTER + side * (shoulderHalf + 8), round(hipY + 52));
    const widths = female ? [11, 8.4, 6.2] : [13.2, 10, 7.2];
    const angle = (Math.atan2(hand.y - elbow.y, hand.x - elbow.x) * 180) / Math.PI - 90;
    return {
      side,
      shoulder,
      elbow,
      hand,
      path: limbPath([shoulder, elbow, hand], widths),
      handTransform: `translate(${hand.x} ${hand.y}) rotate(${round(angle)}) scale(${side} 1)`,
    };
  });

  const [leftLeg, rightLeg] = legs;

  const corePath = [
    `M${shoulders[0].x} ${shoulders[0].y}`,
    // левый бок: плечо → талия → бедро
    `C${round(CENTER - chestHalf - 2)} ${chestY + 18} ${round(CENTER - waistHalf - 6)} ${round(waistY - 30)} ${round(CENTER - waistHalf)} ${waistY}`,
    `C${round(CENTER - waistHalf - 3)} ${round(waistY + 18)} ${round(CENTER - hipHalf)} ${round(hipY - 20)} ${hips[0].x} ${hips[0].y}`,
    // левая нога вниз, подошва и вверх до промежности
    ...leftLeg.outer.map(cubic),
    `L${leftLeg.inner[0].a.x} ${leftLeg.inner[0].a.y}`,
    ...leftLeg.inner.map(cubic),
    // правая нога вниз, подошва и вверх до бедра
    ...[...rightLeg.inner].reverse().map((s) => cubic(reverse(s))),
    `L${rightLeg.outer[2].d.x} ${rightLeg.outer[2].d.y}`,
    ...[...rightLeg.outer].reverse().map((s) => cubic(reverse(s))),
    // правый бок: бедро → талия → плечо
    `C${round(CENTER + hipHalf)} ${round(hipY - 20)} ${round(CENTER + waistHalf + 3)} ${round(waistY + 18)} ${round(CENTER + waistHalf)} ${waistY}`,
    `C${round(CENTER + waistHalf + 6)} ${round(waistY - 30)} ${round(CENTER + chestHalf + 2)} ${chestY + 18} ${shoulders[1].x} ${shoulders[1].y}`,
    // плечевой пояс и шея
    `C${round(CENTER + neckBaseHalf + 16)} ${shoulderY - 6} ${round(CENTER + neckBaseHalf + 4)} ${NECK_BASE + 4} ${round(CENTER + neckHalf)} ${NECK_BASE}`,
    `L${round(CENTER + neckHalf)} ${NECK_TOP}`,
    `L${round(CENTER - neckHalf)} ${NECK_TOP}`,
    `L${round(CENTER - neckHalf)} ${NECK_BASE}`,
    `C${round(CENTER - neckBaseHalf - 4)} ${NECK_BASE + 4} ${round(CENTER - neckBaseHalf - 16)} ${shoulderY - 6} ${shoulders[0].x} ${shoulders[0].y}`,
    'Z',
  ].join(' ');

  const bustCenterY = round(chestY + (female ? 16 : 14));
  const bustRadius = round((female ? 13.5 : 10) * (0.72 + 0.34 * bust));
  const bustOffset = round(female ? 15 + 2.4 * bust : 5);

  return {
    female,
    neckScale: female ? 0.94 : 1.06,
    neckBaseHalf,
    shoulders,
    chest,
    waist,
    hips,
    crotch,
    chestHalf,
    waistHalf,
    hipHalf,
    bust,
    bustRadius,
    bustCenterY,
    bustOffset,
    arms,
    legs,
    corePath,
    anchors: {
      neck: NECK_BASE,
      shoulder: shoulderY,
      chest: chestY,
      underbust: round(bustCenterY + bustRadius),
      waist: waistY,
      hip: hipY,
      crotch: crotchY,
      knee: kneeY,
      ankle: ankleY,
      floor: round(ankleY + 18),
    },
  };
}

```

## src/features/body/Body.tsx

```tsx
import { memo, useId } from 'react';
import {
  DEFAULT_BODY,
  FOOT_OUTLINE,
  HAND_OUTLINE,
  between,
  getFigureGeometry,
  type ArmGeometry,
  type BodySel,
  type FigureRig,
  type Gender,
  type LegGeometry,
} from './figureGeometry';

interface Props {
  gender: Gender;
  skin: string;
  body?: BodySel;
  uid?: string;
}

/** 0 — светлая кожа (нежный контур), 1 — тёмная кожа (выраженная тень) */
function skinShadowStrength(skin: string): number {
  const hex = skin.replace('#', '');
  if (hex.length < 6) return 0.5;
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return Math.max(0, Math.min(1, (0.72 - lum) / 0.38));
}

interface Tones {
  skin: string;
  shade: string;
  deepShade: string;
  highlight: string;
  specular: string;
  warmth: string;
}

function Hand({ arm, tones, id }: { arm: ArmGeometry; tones: Tones; id: string }) {
  return (
    <g transform={arm.handTransform} data-hand-side={arm.side}>
      <defs>
        <clipPath id={`${id}-hand-clip`}><path d={HAND_OUTLINE} /></clipPath>
      </defs>
      <path d={HAND_OUTLINE} fill={tones.skin} />
      <g clipPath={`url(#${id}-hand-clip)`} fill="none" strokeLinecap="round">
        {/* объём тыльной стороны кисти */}
        <path d="M-5.4 4 Q0 6.2 6.4 4.6" stroke={tones.shade} strokeWidth={0.7} opacity={0.32} />
        <path d="M-4 10.5 Q0.4 8.4 4.6 10.6" stroke={tones.shade} strokeWidth={0.65} opacity={0.34} />
        {/* костяшки */}
        <g fill={tones.warmth} opacity={0.18}>
          <circle cx={-4.6} cy={14.5} r={1.5} />
          <circle cx={-1.4} cy={16.5} r={1.6} />
          <circle cx={2.2} cy={16.8} r={1.6} />
          <circle cx={5.4} cy={14.2} r={1.4} />
        </g>
        {/* разделение пальцев */}
        <path d="M-3.6 15 Q-3.2 21 -2.6 26 M0 16 Q0.2 22 0.6 27.6 M3.6 15.2 Q3.6 21 3.2 26" stroke={tones.deepShade} strokeWidth={0.5} opacity={0.4} />
        {/* блик по ребру ладони */}
        <path d="M-6 6 Q-7 14 -5.6 22" stroke={tones.specular} strokeWidth={0.8} opacity={0.4} />
      </g>
    </g>
  );
}

function Foot({ leg, tones, id }: { leg: LegGeometry; tones: Tones; id: string }) {
  return (
    <g transform={leg.footTransform} data-foot-side={leg.side} data-toes="outward">
      <defs>
        <clipPath id={`${id}-foot-clip`}><path d={FOOT_OUTLINE} /></clipPath>
      </defs>
      <path d={FOOT_OUTLINE} fill={tones.skin} />
      <g clipPath={`url(#${id}-foot-clip)`} fill="none" strokeLinecap="round">
        {/* щиколотка */}
        <ellipse cx={-5} cy={-1.4} rx={2.2} ry={3.2} fill={tones.shade} opacity={0.3} stroke="none" />
        <circle cx={-5.2} cy={-1.8} r={1.1} fill={tones.highlight} opacity={0.35} stroke="none" />
        {/* подъём и свод */}
        <path d="M-5.6 -6.4 Q-4.6 1 -5.4 6.6" stroke={tones.shade} strokeWidth={0.7} opacity={0.4} />
        <path d="M-1.6 -3.6 Q2.4 2.2 12 7" stroke={tones.highlight} strokeWidth={1} opacity={0.24} />
        {/* линия пальцев */}
        <path d="M-4.4 15.2 C2 16.6 7 16.2 11 16.2 L21.6 16" stroke={tones.deepShade} strokeWidth={0.65} opacity={0.45} />
        <path d="M18.4 12.6 q-1.4 1.4 -.9 3.1 M14.4 11.4 q-1.1 1.5 -.7 2.9 M10.6 10.2 q-.9 1.4 -.5 2.6" stroke={tones.deepShade} strokeWidth={0.45} opacity={0.45} />
        <path d="M17.8 12 Q20 11.2 22 12.2" stroke={tones.specular} strokeWidth={0.7} opacity={0.4} />
      </g>
    </g>
  );
}

function Arm({ arm, rig, tones, id, muscle }: {
  arm: ArmGeometry;
  rig: FigureRig;
  tones: Tones;
  id: string;
  muscle: number;
}) {
  const upperA = between(arm.shoulder, arm.elbow, 0.22);
  const upperB = between(arm.shoulder, arm.elbow, 0.74);
  const lowerA = between(arm.elbow, arm.hand, 0.22);
  const lowerB = between(arm.elbow, arm.hand, 0.86);
  return (
    <g data-arm-side={arm.side}>
      <defs>
        <clipPath id={`${id}-arm-clip`}><path d={arm.path} /></clipPath>
      </defs>
      <path d={arm.path} fill={tones.skin} />
      <g clipPath={`url(#${id}-arm-clip)`} fill="none" strokeLinecap="round">
        {/* дельта и бицепс */}
        <path
          d={`M${upperA.x + arm.side * 3} ${upperA.y} Q${upperB.x + arm.side * 7} ${upperB.y - 10} ${upperB.x + arm.side * 2} ${upperB.y}`}
          stroke={tones.shade}
          strokeWidth={1.1}
          opacity={0.26 + muscle * 0.12}
        />
        {/* блик по передней поверхности */}
        <path
          d={`M${lowerA.x - arm.side * 3} ${lowerA.y} Q${lowerB.x - arm.side * 4} ${lowerB.y - 14} ${lowerB.x} ${lowerB.y}`}
          stroke={tones.highlight}
          strokeWidth={1.8}
          opacity={0.36}
        />
        {/* локтевой сгиб */}
        <path d={`M${arm.elbow.x - 3} ${arm.elbow.y - 1} q3 2.5 6 .7`} stroke={tones.shade} strokeWidth={0.9} opacity={0.45} />
        <circle cx={arm.elbow.x} cy={arm.elbow.y} r={rig.female ? 2.8 : 3.2} fill={tones.warmth} opacity={0.16} stroke="none" />
      </g>
      <Hand arm={arm} tones={tones} id={id} />
    </g>
  );
}

/**
 * Тело-манекен от шеи до стоп. Голова и одежда рисуются снаружи: сюда
 * намеренно не входят ни лицо, ни причёска, ни пигментация.
 */
export const Body = memo(function Body({ gender, skin, body = DEFAULT_BODY, uid = 'main' }: Props) {
  const id = `${uid}-figure-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const rig = getFigureGeometry(gender, body);
  const { arms, legs, shoulders, waist, chest, hips, crotch, female, anchors } = rig;

  const darkT = skinShadowStrength(skin);
  const darkSkin = darkT > 0.5;
  const muscle = Math.max(0, Math.min(250, body.muscle ?? DEFAULT_BODY.muscle)) / 100;

  const tones: Tones = {
    skin,
    shade: `color-mix(in srgb, ${skin} 68%, #36160e)`,
    deepShade: `color-mix(in srgb, ${skin} 42%, #1e0904)`,
    highlight: `color-mix(in srgb, ${skin} 76%, #fffaf2)`,
    specular: `color-mix(in srgb, ${skin} 52%, #ffffff)`,
    warmth: `color-mix(in srgb, ${skin} 70%, #d85446)`,
  };
  const { shade, deepShade, highlight, specular, warmth } = tones;

  return (
    <g
      data-body={gender}
      data-neck-y={anchors.neck}
      data-shoulder-y={anchors.shoulder}
      data-waist-y={anchors.waist}
      data-hip-y={anchors.hip}
      data-crotch-y={anchors.crotch}
      data-knee-y={anchors.knee}
      data-ankle-y={anchors.ankle}
    >
      <defs>
        {/* симметричный мягкий свет без затемнения одной из сторон */}
        <linearGradient id={`${id}-volume`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={highlight} stopOpacity={0.16} />
          <stop offset="0.28" stopColor={skin} stopOpacity={0} />
          <stop offset="0.74" stopColor={skin} stopOpacity={0} />
          <stop offset="1" stopColor={shade} stopOpacity={0.14} />
        </linearGradient>
        <radialGradient id={`${id}-shade`}>
          <stop stopColor={shade} stopOpacity={0.28} />
          <stop offset="1" stopColor={shade} stopOpacity={0} />
        </radialGradient>
        <radialGradient id={`${id}-bust`} cx="38%" cy="32%" r="72%">
          <stop stopColor={highlight} stopOpacity={darkSkin ? 0.6 : 0.5} />
          <stop offset="0.55" stopColor={skin} stopOpacity={0.12} />
          <stop offset="1" stopColor={shade} stopOpacity={darkSkin ? 0.5 : 0.34} />
        </radialGradient>
        <filter id={`${id}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <clipPath id={`${id}-core`}><path d={rig.corePath} /></clipPath>
      </defs>

      {/* стопы под щиколотками */}
      {legs.map((leg) => <Foot key={leg.side} leg={leg} tones={tones} id={`${id}-${leg.side}`} />)}

      {/* торс и ноги единым силуэтом */}
      <path d={rig.corePath} fill={skin} data-continuous-hips />
      <path d={rig.corePath} fill={`url(#${id}-volume)`} opacity={0.7} />

      <g clipPath={`url(#${id}-core)`}>
        {/* тень под подбородком на шее */}
        <g transform={`translate(150 0) scale(${rig.neckScale} 1) translate(-150 0)`}>
          <path d="M139 116 Q150 132 161 116" fill={shade} opacity={0.28} />
          <path d="M142 122 Q144 136 146 144 M158 122 Q156 136 154 144" stroke={shade} strokeWidth={0.6} fill="none" strokeLinecap="round" opacity={0.35} />
          {!female && <path d="M148 126 L150 124 L152 127 L150 131Z" fill={shade} opacity={0.26} />}
        </g>

        {/* ключицы и яремная ямка */}
        <g fill="none" strokeLinecap="round">
          <path d={`M${chest.x - 4.5} 152 Q${chest.x} 156 ${chest.x + 4.5} 152`} stroke={deepShade} strokeWidth={1} opacity={0.5} />
          <path d={`M${chest.x - 4} 151 Q${chest.x} 149 ${chest.x + 4} 151`} stroke={specular} strokeWidth={0.6} opacity={0.45} />
          {shoulders.map((shoulder, index) => {
            const side = index ? 1 : -1;
            return (
              <g key={index}>
                <path
                  d={`M${chest.x + side * 4} 155 Q${chest.x + side * 22} 158 ${shoulder.x - side * 10} ${shoulder.y + 2}`}
                  stroke={shade}
                  strokeWidth={1.2}
                  opacity={0.42}
                />
                <path
                  d={`M${chest.x + side * 5} 153 Q${chest.x + side * 21} 155.5 ${shoulder.x - side * 11} ${shoulder.y + 0.5}`}
                  stroke={specular}
                  strokeWidth={0.95}
                  opacity={0.55}
                />
              </g>
            );
          })}
        </g>

        {/* грудь: бюст или грудные мышцы */}
        {female ? (
          <g data-female-bust>
            {[-1, 1].map((side) => {
              const cx = chest.x + side * rig.bustOffset;
              const cy = rig.bustCenterY;
              const r = rig.bustRadius;
              return (
                <g key={side}>
                  <ellipse cx={cx} cy={cy + r * 0.72} rx={r * 0.95} ry={r * 0.42} fill={shade} opacity={0.12 + 0.14 * darkT} />
                  <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-bust)`} />
                  <path
                    d={`M${cx - r * 0.92} ${cy + r * 0.28} Q${cx} ${cy + r * 1.08} ${cx + r * 0.92} ${cy + r * 0.28}`}
                    stroke={darkSkin ? deepShade : shade}
                    strokeWidth={0.9}
                    fill="none"
                    opacity={0.18 + 0.2 * darkT}
                  />
                </g>
              );
            })}
          </g>
        ) : (
          <g data-male-pecs>
            {[-1, 1].map((side) => {
              const w = 17 * rig.bust;
              const h = 21 + 5 * (rig.bust - 1);
              const cx = chest.x;
              const cy = rig.bustCenterY;
              const off = rig.bustOffset;
              return (
                <g key={side}>
                  <path
                    d={`M${cx + side * off} ${cy - 4} Q${cx + side * (off + w * 0.85)} ${cy - 4} ${cx + side * (off + w)} ${cy + h * 0.35} Q${cx + side * (off + w * 0.95)} ${cy + h} ${cx + side * (off + w * 0.45)} ${cy + h + 1} Q${cx + side * (off + 2)} ${cy + h * 0.95} ${cx + side * off} ${cy + h * 0.72} Z`}
                    fill={`url(#${id}-bust)`}
                    opacity={0.45 + 0.3 * Math.min(1, rig.bust)}
                  />
                  <path
                    d={`M${cx + side * (off + w)} ${cy + h * 0.35} Q${cx + side * (off + w * 0.95)} ${cy + h} ${cx + side * (off + w * 0.45)} ${cy + h + 1} Q${cx + side * (off + 2)} ${cy + h * 0.95} ${cx + side * off} ${cy + h * 0.72}`}
                    stroke={shade}
                    strokeWidth={darkSkin ? 0.85 : 0.7}
                    fill="none"
                    opacity={darkSkin ? 0.26 : 0.18}
                  />
                  <path
                    d={`M${cx + side * (off + w * 0.15)} ${cy + h * 0.22} Q${cx + side * (off + w * 0.6)} ${cy + h * 0.08} ${cx + side * (off + w * 0.85)} ${cy + h * 0.28}`}
                    stroke={specular}
                    strokeWidth={0.9}
                    fill="none"
                    opacity={darkSkin ? 0.28 : 0.32}
                  />
                </g>
              );
            })}
            <path d={`M${chest.x} ${rig.bustCenterY - 6} L${chest.x} ${rig.bustCenterY + 28}`} stroke={shade} strokeWidth={0.7} opacity={0.16} fill="none" />
          </g>
        )}

        {/* боковые тени талии */}
        <ellipse cx={waist.x - rig.waistHalf + 4} cy={waist.y} rx={9} ry={27} fill={`url(#${id}-shade)`} opacity={0.5} />
        <ellipse cx={waist.x + rig.waistHalf - 4} cy={waist.y} rx={9} ry={27} fill={`url(#${id}-shade)`} opacity={0.5} />

        {/* белая линия живота */}
        <path d={`M${chest.x} ${chest.y + 30} Q${waist.x - 0.5} ${waist.y - 6} ${waist.x} ${waist.y + 7}`} stroke={shade} strokeWidth={0.6} opacity={0.24} fill="none" />

        {/* пупок */}
        <g data-navel transform={`translate(${waist.x} ${waist.y + 9})`}>
          <ellipse cx={0} cy={0} rx={2.1} ry={3} fill={deepShade} opacity={0.7} />
          <ellipse cx={0} cy={0.4} rx={1} ry={1.5} fill="#1a0804" opacity={0.4} />
          <path d="M-1.7 -0.8 Q0 -2.3 1.7 -0.8" stroke={specular} strokeWidth={0.7} fill="none" opacity={0.8} strokeLinecap="round" />
          <path d="M-1.1 1.7 Q0 2.5 1.1 1.7" stroke={shade} strokeWidth={0.55} fill="none" opacity={0.6} strokeLinecap="round" />
        </g>

        {/* линии подвздошных костей */}
        {hips.map((hip, index) => {
          const side = index ? 1 : -1;
          return (
            <path
              key={index}
              d={`M${hip.x - side * 11} ${hip.y - 13} Q${hip.x - side * 17} ${hip.y - 6} ${crotch.x + side * 10} ${crotch.y - 9}`}
              stroke={shade}
              strokeWidth={0.8}
              opacity={0.26}
              fill="none"
            />
          );
        })}

        {/* колени и рельеф ног */}
        {legs.map((leg) => (
          <g key={leg.side}>
            <ellipse cx={leg.knee.x} cy={leg.knee.y - 1.5} rx={5.8} ry={7.4} fill={`url(#${id}-shade)`} />
            <circle cx={leg.knee.x} cy={leg.knee.y} r={4.4} fill={warmth} opacity={0.16} stroke="none" />
            <path d={`M${leg.knee.x - 3.8} ${leg.knee.y + 4.5} Q${leg.knee.x} ${leg.knee.y + 7} ${leg.knee.x + 3.8} ${leg.knee.y + 4.5}`} stroke={deepShade} strokeWidth={0.7} opacity={0.45} fill="none" />
            <path d={`M${leg.knee.x - 3} ${leg.knee.y - 6} Q${leg.knee.x} ${leg.knee.y - 8.5} ${leg.knee.x + 3} ${leg.knee.y - 6}`} stroke={specular} strokeWidth={0.85} opacity={0.6} fill="none" />
            <path d={`M${leg.knee.x - leg.side * 3} ${leg.knee.y + 20} Q${leg.calf.x - leg.side * 6} ${leg.calf.y + 12} ${leg.ankle.x} ${leg.ankle.y - 22}`} stroke={highlight} strokeWidth={1.7} opacity={0.32} fill="none" />
            <path d={`M${leg.hip.x - leg.side * 13} ${leg.hip.y + 19} Q${leg.knee.x + leg.side * 9} ${leg.knee.y - 58} ${leg.knee.x + leg.side * 5} ${leg.knee.y - 19}`} stroke={shade} strokeWidth={0.8} opacity={0.2} fill="none" />
          </g>
        ))}

        {/* мышечный рельеф */}
        {muscle > 0.02 && (() => {
          const soft = `url(#${id}-soft)`;
          const shadeOp = Math.min(0.55, (0.05 + muscle * 0.18) * (1 - darkT * 0.3));
          const lightOp = Math.min(0.65, (0.06 + muscle * 0.2) * (0.7 + darkT * 0.6));
          const rows = muscle < 0.35 ? 1 : muscle < 0.7 ? 2 : muscle < 1.4 ? 3 : 4;
          return (
            <g data-muscles filter={soft}>
              <ellipse cx={waist.x} cy={waist.y - 9} rx={1.8} ry={24} fill={deepShade} opacity={shadeOp} />
              {Array.from({ length: rows }).map((_, index) => {
                const y = waist.y - 20 + index * 13;
                const width = 10 - index * 1.5;
                return (
                  <g key={index}>
                    <ellipse cx={waist.x - width * 0.55} cy={y + 6} rx={width * 0.55} ry={2.4} fill={shade} opacity={shadeOp * 0.9} />
                    <ellipse cx={waist.x + width * 0.55} cy={y + 6} rx={width * 0.55} ry={2.4} fill={shade} opacity={shadeOp * 0.9} />
                    <ellipse cx={waist.x - width * 0.5} cy={y - 1} rx={width * 0.45} ry={2} fill={highlight} opacity={lightOp * 0.75} />
                    <ellipse cx={waist.x + width * 0.5} cy={y - 1} rx={width * 0.45} ry={2} fill={highlight} opacity={lightOp * 0.75} />
                  </g>
                );
              })}
              {legs.map((leg) => {
                const thigh = between(leg.hip, leg.knee, 0.5);
                const calf = between(leg.knee, leg.ankle, 0.35);
                return (
                  <g key={leg.side}>
                    <ellipse cx={thigh.x - leg.side * 3} cy={thigh.y} rx={6.5} ry={26} fill={highlight} opacity={lightOp * 0.85} />
                    <ellipse cx={thigh.x + leg.side * 7} cy={thigh.y + 4} rx={3.2} ry={24} fill={shade} opacity={shadeOp * 0.7} />
                    <ellipse cx={calf.x + leg.side * 3} cy={calf.y} rx={4.8} ry={16} fill={highlight} opacity={lightOp * 0.75} />
                    <ellipse cx={calf.x - leg.side * 4} cy={calf.y + 2} rx={2.6} ry={15} fill={shade} opacity={shadeOp * 0.6} />
                  </g>
                );
              })}
            </g>
          );
        })()}
      </g>

      {/* руки поверх торса */}
      {arms.map((arm) => (
        <Arm key={arm.side} arm={arm} rig={rig} tones={tones} id={`${id}-arm-${arm.side}`} muscle={muscle} />
      ))}
    </g>
  );
});

export default Body;

```

## src/features/clothes/types.ts

```ts
import type { FigureRig } from '../body/figureGeometry';

export type ClothingCategory = 'dress' | 'suit' | 'coat' | 'costume' | 'accessory';

export interface ClothesDef {
  id: string;
  name: string;
  year: number;
  category: ClothingCategory;
  description: string;
  position: string;
  color: string;
  accent?: string;
  pattern?: string;
}

export interface ClothesSettings {
  clothesColor?: string;
  clothesAccent?: string;
}

export interface ClothesRenderContext {
  rig: FigureRig;
  skin: string;
  color: string;
  accent: string;
  uid: string;
  /** id SVG-паттерна ткани (если у предмета есть принт) */
  patId?: string;
}

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

## src/features/clothes/Clothes.tsx

```tsx
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
      {[-1, 1].map((s) => buttons(X + s * (rig.waistHalf * 0.62), a.waist + 8, a.hip + 12, 3, white, 1.7))}
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
      {/* крупная круглая эмблема на весь бюст: белый диск в красной окантовке */}
      <g transform={`translate(${X} ${a.chest + 10})`}>
        <circle r="17" fill="#ece8e0" stroke={red} strokeWidth={2.6} />
        <circle r="17" fill="none" stroke={tone(red, -0.35)} strokeWidth={0.5} />
        <circle r="12.5" fill="none" stroke={grey} strokeWidth={1} opacity={0.9} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => <path key={deg} d="M-9.5 0 L9.5 0" stroke={grey} strokeWidth={1.5} opacity={0.85} transform={`rotate(${deg})`} />)}
        <circle r="4.4" fill={red} stroke={tone(red, -0.4)} strokeWidth={0.6} />
        <circle r="1.5" fill="#ece8e0" />
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

```

## src/features/accessories/types.ts

```ts
import type { FigureRig } from '../body/figureGeometry';

export type AccessoryKind = 'stole' | 'muff' | 'cane' | 'clutch' | 'gloves' | 'kerchief' | 'brooch';

export interface AccessoryDef {
  id: string;
  name: string;
  year: number;
  kind: AccessoryKind;
  description: string;
  position: string;
  color: string;
  accent: string;
  /** рука, в которой предмет: −1 левая, 1 правая, 0 — не в руке */
  hand?: -1 | 1 | 0;
}

export interface AccessorySettings {
  accessoryColor?: string;
  accessoryAccent?: string;
}

export interface AccessoryRenderContext {
  rig: FigureRig;
  uid: string;
  color: string;
  accent: string;
}

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

## src/features/accessories/Accessories.tsx

```tsx
import { memo, useId, type ReactNode } from 'react';
import { HAND_OUTLINE, between, type ArmGeometry, type FigureRig } from '../body/figureGeometry';
import { tone, type AccessoryDef, type AccessoryRenderContext, type AccessorySettings } from './types';

/* ══════════════════════════════════════════════════════════════════════════
   КАТАЛОГ — аксессуары листа «1930's Women's fashion»
   Головные уборы и очки намеренно исключены.
   ══════════════════════════════════════════════════════════════════════════ */

export const ACCESSORIES: AccessoryDef[] = [
  {
    id: 'acc-1931-fur-stole', name: 'Меховая горжетка', year: 1931, kind: 'stole', hand: 0,
    position: 'Ряд 1, №3 (1931)',
    description: 'Серебристо-дымчатая лиса, переброшенная через плечи: плотный воротник вокруг шеи и две мягкие лапы, спускающиеся по груди.',
    color: '#b9b3a9', accent: '#efeae1',
  },
  {
    id: 'acc-1935-fur-muff', name: 'Меховая муфта на ленте', year: 1935, kind: 'muff', hand: 0,
    position: 'Ряд 2, №1 (1935)',
    description: 'Тёплая муфта из светлой плюшевой шерсти на шёлковой ленте через шею: руки спрятаны внутрь, снаружи видны только запястья.',
    color: '#e9c169', accent: '#f7e6bb',
  },
  {
    id: 'acc-1933-cane', name: 'Трость с костяным набалдашником', year: 1933, kind: 'cane', hand: 1,
    position: 'Ряд 1, №7 (1933)',
    description: 'Тонкая чёрная трость с полированным костяным набалдашником и стальным наконечником — непременный реквизит вечернего выхода.',
    color: '#241f1c', accent: '#d8c49a',
  },
  {
    id: 'acc-1937-clutch', name: 'Клатч-конверт с застёжкой', year: 1937, kind: 'clutch', hand: -1,
    position: 'Ряд 2, №5–6 (1937)',
    description: 'Плоский конверт из мягкой кожи с металлической застёжкой-бруском и подкладкой из шёлка, зажат под левой рукой.',
    color: '#2b2622', accent: '#c8ab6b',
  },
  {
    id: 'acc-1936-gloves-white', name: 'Белые лайковые перчатки', year: 1936, kind: 'gloves', hand: 0,
    position: 'Ряд 1, №4–6 (1932)', 
    description: 'Короткие перчатки из тонкой лайки цвета слоновой кости с тремя декоративными швами на тыльной стороне кисти.',
    color: '#f4efe4', accent: '#d9d0c0',
  },
  {
    id: 'acc-1937-gloves-black', name: 'Чёрные лайковые перчатки', year: 1937, kind: 'gloves', hand: 0,
    position: 'Ряд 2, №6 (1937)',
    description: 'Строгие чёрные перчатки к светлому костюму: узкое запястье с двумя пуговицами и матовый блеск кожи.',
    color: '#1b1918', accent: '#4c4642',
  },
  {
    id: 'acc-1934-silk-kerchief', name: 'Шёлковая косынка на шее', year: 1934, kind: 'kerchief', hand: 0,
    position: 'Ряд 1, №10 (1934)',
    description: 'Кремовая шёлковая косынка, подвязанная узлом под подбородком: мягкие складки ложатся мысом на грудь.',
    color: '#f3e9d5', accent: '#d6c39a',
  },
  {
    id: 'acc-1935-camelia-brooch', name: 'Брошь-камелия', year: 1935, kind: 'brooch', hand: 0,
    position: 'Ряд 2, №2 (1935)',
    description: 'Крупная белая камелия из вощёного шёлка приколота к лацкану; под ней два восковых листа и жемчужная серединка.',
    color: '#f6f3ea', accent: '#3f5438',
  },
];

export const ACCESSORY_BY_ID: Readonly<Record<string, AccessoryDef>> = Object.fromEntries(
  ACCESSORIES.map((item) => [item.id, item])
);

/* ══════════════════════════════════════════════════════════════════════════
   ПРИМИТИВЫ
   ══════════════════════════════════════════════════════════════════════════ */

const X = 150;
const r2 = (v: number) => Number(v.toFixed(2));

type Pt = [number, number];
const noise = (seed: number) => { const n = Math.sin(seed * 12.9898 + 78.233) * 43758.5453; return n - Math.floor(n); };

/**
 * Ворс по кромке: короткие штрихи, направленные наружу от осевой линии.
 * `spine` — осевая, `side` — куда растёт ворс (+1/−1 по нормали).
 */
function furEdge(spine: Pt[], side: 1 | -1, base: string, accent: string, len = 4, density = 1.2, seedBase = 1): ReactNode {
  const strokes: ReactNode[] = [];
  let s = seedBase;
  for (let i = 0; i < spine.length - 1; i++) {
    const [x0, y0] = spine[i], [x1, y1] = spine[i + 1];
    const dx = x1 - x0, dy = y1 - y0;
    const L = Math.hypot(dx, dy) || 1;
    const nx = (-dy / L) * side, ny = (dx / L) * side;
    const count = Math.max(1, Math.round(L * density));
    for (let k = 0; k < count; k++) {
      s += 1;
      const t = (k + noise(s)) / count;
      const px = x0 + dx * t, py = y0 + dy * t;
      const l = len * (0.6 + noise(s + 0.5) * 0.8);
      const bend = (noise(s + 0.25) - 0.5) * l * 0.9;
      const ex = px + nx * l + (dx / L) * bend, ey = py + ny * l + (dy / L) * bend;
      const cx = px + nx * l * 0.5 + (dx / L) * bend * 0.3, cy = py + ny * l * 0.5 + (dy / L) * bend * 0.3;
      strokes.push(<path key={s} d={`M${r2(px)} ${r2(py)} Q${r2(cx)} ${r2(cy)} ${r2(ex)} ${r2(ey)}`} stroke={noise(s + 0.75) > 0.6 ? tone(accent, 0.2) : tone(base, -0.25)} strokeWidth={0.5 + noise(s + 0.9) * 0.35} fill="none" strokeLinecap="round" opacity={0.85} />);
    }
  }
  return <g data-part="fur-edge">{strokes}</g>;
}

/** Внутренняя «рябь» меха вдоль направления ворса — внутри clipPath. */
function furGrain(uid: string, spine: Pt[], width: number, base: string, accent: string, seedBase = 100): ReactNode {
  const strokes: ReactNode[] = [];
  let s = seedBase;
  for (let i = 0; i < spine.length - 1; i++) {
    const [x0, y0] = spine[i], [x1, y1] = spine[i + 1];
    const dx = x1 - x0, dy = y1 - y0;
    const L = Math.hypot(dx, dy) || 1;
    const nx = -dy / L, ny = dx / L;
    for (let k = 0; k < 5; k++) {
      s += 1;
      const off = (noise(s) - 0.5) * width;
      const t = noise(s + 0.3);
      const px = x0 + dx * t + nx * off, py = y0 + dy * t + ny * off;
      const l = 2.6 + noise(s + 0.6) * 2.6;
      strokes.push(<path key={s} d={`M${r2(px)} ${r2(py)} q${r2(nx * l * 0.4 + (dx / L) * l * 0.3)} ${r2(ny * l * 0.4 + (dy / L) * l * 0.3)} ${r2(nx * l)} ${r2(ny * l)}`} stroke={noise(s + 0.8) > 0.5 ? tone(accent, 0.25) : tone(base, -0.3)} strokeWidth={0.45} fill="none" strokeLinecap="round" opacity={0.6} />);
    }
  }
  return <g clipPath={`url(#${uid}-fur-clip)`} data-part="fur-grain">{strokes}</g>;
}

const smoothPts = (pts: Pt[], closed = false): string => {
  if (pts.length < 2) return '';
  const n = pts.length;
  const at = (i: number): Pt => (closed ? pts[((i % n) + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${r2(pts[0][0])} ${r2(pts[0][1])}`;
  const segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    d += ` C${r2(p1[0] + (p2[0] - p0[0]) / 6)} ${r2(p1[1] + (p2[1] - p0[1]) / 6)} ${r2(p2[0] - (p3[0] - p1[0]) / 6)} ${r2(p2[1] - (p3[1] - p1[1]) / 6)} ${r2(p2[0])} ${r2(p2[1])}`;
  }
  return closed ? `${d} Z` : d;
};

function glove(arm: ArmGeometry, color: string, accent: string, forearm: ReactNode): ReactNode {
  return (
    <g key={arm.side} data-part="glove">
      <path d={HAND_OUTLINE} transform={arm.handTransform} fill={color} stroke={tone(color, -0.35)} strokeWidth={0.6} />
      {forearm}
      <g transform={arm.handTransform} fill="none" stroke={accent} strokeWidth={0.45} opacity={0.85}>
        <path d="M-4 12 Q0 14 4 12" />
        <path d="M-3.4 15 Q0 17 3.4 15" />
        <path d="M-6 6 Q-3 9 0 7" />
      </g>
    </g>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   ОТРИСОВКА ПРЕДМЕТОВ
   ══════════════════════════════════════════════════════════════════════════ */

function renderAccessory(item: AccessoryDef, ctx: AccessoryRenderContext): ReactNode {
  const { rig, uid, color, accent } = ctx;
  const a = rig.anchors;
  const sh = Math.abs(rig.shoulders[1].x - X);

  switch (item.kind) {
    case 'stole': {
      // Лиса вокруг шеи: объём на плечах, затылок тоньше, концы длинные и разные.
      const lTip: Pt = [X - sh - 4, a.waist + 2];
      const rTip: Pt = [X + sh - 8, a.chest + 44];
      const spine: Pt[] = [
        lTip,
        [X - sh - 8, a.chest + 12],
        [X - sh - 4, a.shoulder + 2],
        [X - 24, a.shoulder - 13],
        [X, a.shoulder - 15],
        [X + 24, a.shoulder - 13],
        [X + sh + 4, a.shoulder + 2],
        [X + sh, a.chest + 16],
        rTip,
      ];
      const w = (t: number) => {
        const bell = Math.sin(Math.PI * t) ** 0.7;
        const dip = 1 - 0.32 * Math.exp(-(((t - 0.5) / 0.16) ** 2));
        return 7 + 24 * bell * dip;
      };
      const ns: Pt[] = spine.map((_, i) => {
        const p0 = spine[Math.max(0, i - 1)], p1 = spine[Math.min(spine.length - 1, i + 1)];
        const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
        const L = Math.hypot(dx, dy) || 1;
        return [-dy / L, dx / L];
      });
      const outer: Pt[] = spine.map((p, i) => [p[0] + ns[i][0] * w(i / (spine.length - 1)) / 2, p[1] + ns[i][1] * w(i / (spine.length - 1)) / 2]);
      const inner: Pt[] = spine.map((p, i) => [p[0] - ns[i][0] * w(i / (spine.length - 1)) / 2, p[1] - ns[i][1] * w(i / (spine.length - 1)) / 2]);
      const body = smoothPts([...outer, ...[...inner].reverse()], true);
      const ridge = smoothPts(spine.slice(1, -1));
      const paw = (tip: Pt, dir: number) => (
        <g>
          <ellipse cx={tip[0]} cy={tip[1] + 3} rx={4.2} ry={5.6} fill={tone(color, -0.38)} stroke={tone(color, -0.5)} strokeWidth={0.5} />
          {[-1.8, 0, 1.8].map((dx, k) => (
            <path key={k} d={`M${r2(tip[0] + dx)} ${r2(tip[1] + 1)} q${r2(dx * 0.3)} 4 ${r2(dx * 0.5)} 7`} stroke={tone(color, 0.35)} strokeWidth={0.55} fill="none" />
          ))}
          {furEdge([[tip[0] - 5, tip[1] - 3], [tip[0] + dir * 2, tip[1] + 7], [tip[0] + 5, tip[1] - 3]], 1, color, accent, 5.5, 1.7, tip[0] > X ? 1300 : 1200)}
        </g>
      );
      return (
        <g data-accessory={item.id}>
          <defs>
            <clipPath id={`${uid}-fur-clip`}><path d={body} /></clipPath>
            <linearGradient id={`${uid}-fur-base`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0" stopColor={tone(color, 0.3)} />
              <stop offset="0.45" stopColor={tone(color, 0.08)} />
              <stop offset="1" stopColor={tone(color, -0.26)} />
            </linearGradient>
          </defs>
          {/* тень на платье под мехом */}
          <path d={body} fill="#000" opacity={0.16} transform="translate(0 3)" />
          {/* густой ворс по внешнему краю, короче — по внутреннему */}
          {furEdge(outer, 1, color, accent, 4.6, 1.35, 1)}
          {furEdge([...inner].reverse(), 1, color, accent, 3.2, 1.0, 400)}
          <path d={body} fill={`url(#${uid}-fur-base)`} />
          {furGrain(uid, spine, 24, color, accent, 800)}
          {/* тёмный хребет со светлой остью */}
          <path d={ridge} stroke={tone(color, -0.45)} strokeWidth={6} fill="none" strokeLinecap="round" opacity={0.4} clipPath={`url(#${uid}-fur-clip)`} />
          <path d={ridge} stroke={tone(accent, 0.32)} strokeWidth={1.4} fill="none" strokeLinecap="round" opacity={0.55} clipPath={`url(#${uid}-fur-clip)`} />
          {/* серебристые бока */}
          <path d={smoothPts(outer.slice(1, 5))} stroke={tone(accent, 0.35)} strokeWidth={2.2} fill="none" opacity={0.5} clipPath={`url(#${uid}-fur-clip)`} />
          <path d={smoothPts(outer.slice(4, 8))} stroke={tone(accent, 0.35)} strokeWidth={2.2} fill="none" opacity={0.5} clipPath={`url(#${uid}-fur-clip)`} />
          {paw(lTip, -1)}
          {paw(rTip, 1)}
        </g>
      );
    }

    case 'muff': {
      const cx = X - 20;
      const cy = a.hip + 6;
      const rx = 19, ry = 14;
      const ring: Pt[] = Array.from({ length: 16 }, (_, i) => {
        const t = (i / 16) * Math.PI * 2;
        return [cx + Math.cos(t) * rx, cy + Math.sin(t) * ry];
      });
      const muff = smoothPts(ring, true);
      return (
        <g data-accessory={item.id}>
          <defs>
            <clipPath id={`${uid}-fur-clip`}><path d={muff} /></clipPath>
            <radialGradient id={`${uid}-fur-base`} cx="40%" cy="35%" r="70%">
              <stop offset="0" stopColor={tone(color, 0.36)} />
              <stop offset="0.6" stopColor={color} />
              <stop offset="1" stopColor={tone(color, -0.28)} />
            </radialGradient>
          </defs>
          {/* лента через шею к муфте */}
          <path d={`M${r2(X - 10)} ${r2(a.neck - 2)} C${r2(X - 34)} ${r2(a.chest + 14)} ${r2(cx - 12)} ${r2(a.waist + 10)} ${r2(cx - 6)} ${r2(cy - 10)}`} stroke={tone(accent, -0.3)} strokeWidth={2.2} fill="none" />
          <path d={`M${r2(X + 10)} ${r2(a.neck - 2)} C${r2(X + 22)} ${r2(a.chest + 20)} ${r2(cx + 20)} ${r2(a.waist + 12)} ${r2(cx + 8)} ${r2(cy - 12)}`} stroke={tone(accent, -0.3)} strokeWidth={2.2} fill="none" />
          <path d={muff} fill="#000" opacity={0.16} transform="translate(0 3)" />
          {furEdge(ring.concat([ring[0]]), 1, color, accent, 4.2, 1.2, 2000)}
          <path d={muff} fill={`url(#${uid}-fur-base)`} />
          {furGrain(uid, [[cx - rx, cy], [cx, cy - 2], [cx + rx, cy]], ry * 1.6, color, accent, 2400)}
          {/* цилиндрическая тень — муфта круглая */}
          <path d={`M${r2(cx - rx + 2)} ${r2(cy)} Q${r2(cx)} ${r2(cy + ry * 0.9)} ${r2(cx + rx - 2)} ${r2(cy)}`} stroke={tone(color, -0.4)} strokeWidth={3} fill="none" opacity={0.35} clipPath={`url(#${uid}-fur-clip)`} />
        </g>
      );
    }

    case 'cane': {
      const arm = rig.arms.find((x) => x.side === (item.hand ?? 1)) ?? rig.arms[1];
      const hand = arm.hand;
      const top = { x: hand.x + 2, y: hand.y - 8 };
      const bottom = { x: hand.x + 22, y: a.floor - 2 };
      return (
        <g data-accessory={item.id}>
          <path d={`M${r2(top.x)} ${r2(top.y)} L${r2(bottom.x)} ${r2(bottom.y)}`} stroke={color} strokeWidth={2.6} strokeLinecap="round" />
          <path d={`M${r2(top.x)} ${r2(top.y)} L${r2(bottom.x)} ${r2(bottom.y)}`} stroke={tone(color, 0.45)} strokeWidth={0.7} strokeLinecap="round" opacity={0.6} />
          <path d={`M${r2(top.x - 4)} ${r2(top.y - 6)} Q${r2(top.x + 2)} ${r2(top.y - 12)} ${r2(top.x + 7)} ${r2(top.y - 6)} Q${r2(top.x + 2)} ${r2(top.y + 2)} ${r2(top.x - 4)} ${r2(top.y - 6)} Z`} fill={accent} stroke={tone(accent, -0.4)} strokeWidth={0.5} />
          <path d={`M${r2(bottom.x - 2)} ${r2(bottom.y - 5)} L${r2(bottom.x)} ${r2(bottom.y + 2)}`} stroke="#8a8a8a" strokeWidth={2.4} strokeLinecap="round" />
        </g>
      );
    }

    case 'clutch': {
      const arm = rig.arms.find((x) => x.side === (item.hand ?? -1)) ?? rig.arms[0];
      const hand = arm.hand;
      const cx = hand.x - 6;
      const cy = hand.y + 16;
      return (
        <g data-accessory={item.id}>
          <g transform={`translate(${r2(cx)} ${r2(cy)}) rotate(-10)`}>
            <rect x={-18} y={-9} width={36} height={19} rx={3} fill={color} stroke={tone(color, -0.45)} strokeWidth={0.7} />
            <path d="M-18 -1 Q0 4 18 -1" fill="none" stroke={tone(color, 0.28)} strokeWidth={0.7} opacity={0.7} />
            <rect x={-5} y={-2.6} width={10} height={5} rx={1.2} fill={accent} stroke={tone(accent, -0.35)} strokeWidth={0.45} />
            <circle cx={0} cy={0} r={1} fill={tone(accent, 0.2)} />
            <path d="M-16 7 Q0 10 16 7" fill="none" stroke={tone(color, 0.2)} strokeWidth={0.5} opacity={0.5} />
          </g>
        </g>
      );
    }

    case 'gloves': {
      return (
        <g data-accessory={item.id}>
          {rig.arms.map((arm) => {
            const female = rig.female;
            const p0 = between(arm.elbow, arm.hand, 0.7);
            const p1 = between(arm.elbow, arm.hand, 0.97);
            const w = female ? 8.6 : 10;
            const cuff = `M${r2(p0.x - w / 2)} ${r2(p0.y)} L${r2(p1.x - w * 0.4)} ${r2(p1.y)} L${r2(p1.x + w * 0.4)} ${r2(p1.y)} L${r2(p0.x + w / 2)} ${r2(p0.y)} Z`;
            return glove(arm, color, accent, (
              <>
                <path d={cuff} fill={color} stroke={tone(color, -0.32)} strokeWidth={0.55} />
                <path d={`M${r2(p1.x - w * 0.42)} ${r2(p1.y - 1)} L${r2(p1.x + w * 0.42)} ${r2(p1.y - 1)}`} stroke={accent} strokeWidth={0.7} />
              </>
            ));
          })}
        </g>
      );
    }

    case 'kerchief': {
      const top = a.shoulder - 6;
      return (
        <g data-accessory={item.id}>
          <path
            d={`M${r2(X - 17)} ${r2(top)} C${r2(X - 20)} ${r2(top + 18)} ${r2(X - 8)} ${r2(a.chest + 14)} ${r2(X - 4)} ${r2(a.chest + 22)} C${r2(X - 1)} ${r2(a.chest + 14)} ${r2(X + 6)} ${r2(a.chest + 18)} ${r2(X + 8)} ${r2(a.chest + 26)} C${r2(X + 12)} ${r2(a.chest + 16)} ${r2(X + 20)} ${r2(top + 16)} ${r2(X + 17)} ${r2(top)} C${r2(X + 8)} ${r2(top - 8)} ${r2(X - 8)} ${r2(top - 8)} ${r2(X - 17)} ${r2(top)} Z`}
            fill={color} stroke={tone(color, -0.3)} strokeWidth={0.6}
          />
          {[-8, -3, 3, 8].map((dx, i) => (
            <path key={i} d={`M${r2(X + dx)} ${r2(top + 8)} C${r2(X + dx * 1.3)} ${r2(top + 26)} ${r2(X + dx * 1.1)} ${r2(a.chest + 6)} ${r2(X + dx * 0.8)} ${r2(a.chest + 16)}`} stroke={tone(color, -0.22)} strokeWidth={0.5} fill="none" opacity={0.6} />
          ))}
          <g transform={`translate(${X} ${top + 2})`}>
            <path d="M0 0C-7 -5 -10 2 -5 5C-1 7 0 3 0 0ZM0 0C7 -5 10 2 5 5C1 7 0 3 0 0Z" fill={tone(color, 0.08)} stroke={tone(color, -0.25)} strokeWidth={0.5} />
            <ellipse rx="2.2" ry="2.4" fill={tone(color, -0.1)} />
          </g>
          <path d={`M${r2(X - 17)} ${r2(top + 2)} L${r2(X + 17)} ${r2(top + 2)}`} stroke={accent} strokeWidth={0.9} opacity={0.8} />
        </g>
      );
    }

    // brooch — камелия на лацкане
    default: {
      const cx = X + 16;
      const cy = a.chest + 6;
      return (
        <g data-accessory={item.id}>
          <g transform={`translate(${r2(cx)} ${r2(cy)})`}>
            {[0, 72, 144, 216, 288].map((deg) => (
              <ellipse key={deg} cx="0" cy="-7.4" rx="4.6" ry="6.4" fill={color} stroke={tone(color, -0.22)} strokeWidth={0.5} transform={`rotate(${deg})`} />
            ))}
            <circle r="3.4" fill={color} stroke={tone(color, -0.2)} strokeWidth={0.5} />
            <circle r="1.5" fill={accent} opacity={0.5} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <circle key={i} cx={Math.cos((i * Math.PI) / 3) * 2} cy={Math.sin((i * Math.PI) / 3) * 2} r="0.7" fill={accent} />
            ))}
            <path d="M-8 8 Q-14 12 -20 11" stroke={accent} strokeWidth={1.6} fill="none" />
            <path d="M8 8 Q14 12 20 11" stroke={accent} strokeWidth={1.6} fill="none" />
            <ellipse cx="-15" cy="12" rx="6" ry="2.6" fill={accent} opacity="0.85" transform="rotate(-12 -15 12)" />
            <ellipse cx="15" cy="12" rx="6" ry="2.6" fill={accent} opacity="0.85" transform="rotate(12 15 12)" />
          </g>
        </g>
      );
    }
  }
}

/* ══════════════════════════════════════════════════════════════════════════
   КОМПОНЕНТ
   ══════════════════════════════════════════════════════════════════════════ */

const EMPTY: AccessorySettings = {};

/** Аксессуары рисуются ПОВЕРХ одежды; можно надеть несколько сразу. */
export const Accessories = memo(function Accessories({
  ids,
  rig,
  settings = EMPTY,
}: {
  ids: string[];
  rig: FigureRig;
  settings?: AccessorySettings;
}) {
  const uid = `acc-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const items = ids.map((id) => ACCESSORY_BY_ID[id]).filter(Boolean);
  if (items.length === 0) return null;
  return (
    <g data-accessories={items.map((i) => i.id).join(',')}>
      {items.map((item, i) => (
        <g key={`${item.id}-${i}`} data-accessory-root={item.id}>
          {renderAccessory(item, {
            rig,
            uid: `${uid}-${i}`,
            color: settings.accessoryColor || item.color,
            accent: settings.accessoryAccent || item.accent,
          })}
        </g>
      ))}
    </g>
  );
});

export default Accessories;

```

## src/features/accessories/items.tsx

```tsx
import type { ReactNode } from 'react';
import { ACCESSORIES, Accessories } from './Accessories';
import type { AccessorySettings } from './types';
import type { FigureRig } from '../body/figureGeometry';

interface RenderContext {
  rig: FigureRig;
  settings?: AccessorySettings;
}

/**
 * Аксессуары — надодежный слой: рисуются ПОВЕРХ одежды (z выше, чем у
 * underwear и clothes), поэтому шаль, муфта и перчатки перекрывают ткань.
 * Головных уборов и очков в этой категории намеренно нет.
 */
export interface AccessoryItem {
  id: string;
  name: string;
  category: 'accessories';
  fit: 'f';
  z: number;
  back: () => null;
  render: (ctx: RenderContext) => ReactNode;
}

export const ACCESSORY_ITEMS: AccessoryItem[] = ACCESSORIES.map((item): AccessoryItem => ({
  id: item.id,
  name: `${item.name} (${item.year})`,
  category: 'accessories',
  fit: 'f',
  z: 80,
  back: () => null,
  render: (ctx) => <Accessories ids={[item.id]} rig={ctx.rig} settings={ctx.settings} />,
}));

export function assertNoAccessoryCollisions(existing: ReadonlyArray<{ id: string }>): void {
  const ids = new Set(existing.map((item) => item.id));
  for (const item of ACCESSORY_ITEMS) {
    if (ids.has(item.id)) throw new Error(`Accessory already registered: ${item.id}`);
    ids.add(item.id);
  }
}

```

## src/features/accessories/checks.ts

```ts
import { ACCESSORIES } from './Accessories';
import { ACCESSORY_ITEMS } from './items';

export interface AccessoryCheck { name: string; passed: boolean }

export function checkAccessoryCollection(): AccessoryCheck[] {
  const ids = ACCESSORY_ITEMS.map((item) => item.id);
  const kinds = ACCESSORIES.map((item) => item.kind);
  return [
    { name: '8 аксессуаров 1930-х с листа', passed: ACCESSORIES.length === 8 && ACCESSORY_ITEMS.length === 8 },
    { name: 'Категория accessories, женская посадка', passed: ACCESSORY_ITEMS.every((item) => item.category === 'accessories' && item.fit === 'f') },
    { name: 'Уникальные kind и ID без дублей', passed: new Set(kinds).size === kinds.length && new Set(ids).size === ids.length },
    { name: 'Ни одного головного убора и ни одних очков', passed: ACCESSORIES.every((item) => !/шап|шляп|берет|тюрбан|очки|гоггл|hat|cap|goggle/i.test(item.id + item.name + item.kind)) },
    { name: 'Слой аксессуаров выше одежды (z ≥ 60)', passed: ACCESSORY_ITEMS.every((item) => item.z >= 60) },
    { name: 'У каждого предмета родные цвета материала', passed: ACCESSORIES.every((item) => /^#[\da-f]{6}$/i.test(item.color) && /^#[\da-f]{6}$/i.test(item.accent)) },
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
  | 'heydrich'
  | 'undercut'
  | 'clipper-crop'
  | 'himmler'
  | 'temples'
  | 'custom';

export interface StubbleZone {
  side: 'left' | 'right' | 'nape' | 'both-temples';
  topY: number;
  bottomY: number;
  spreadX: number;
  density: number;
  fade?: 'down' | 'up' | 'none';
}

export interface HeadStubbleProps {
  headPath?: string;
  preset?: StubblePreset;
  zones?: StubbleZone[];
  hairColor?: string;
  density?: number;
  length?: number;
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

          if (noise2 > zoneDensity * fadeMult * 1.3) continue;

          const y = topY + tY * height;
          let x = 150;

          if (isLeft) {
            x = 112 + (c / cols) * 16 + (noise3 - 0.5) * 2;
          } else if (isRight) {
            x = 188 - (c / cols) * 16 + (noise3 - 0.5) * 2;
          } else if (isNape) {
            x = 118 + (c / cols) * 64 + (noise3 - 0.5) * 3;
          }

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
        <clipPath id={`${uid}-head-clip`} clipPathUnits="userSpaceOnUse">
          <path d={headPath} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${uid}-head-clip)`}>
        {renderedZones.map((zone) => (
          <g key={zone.id} data-zone={zone.id}>
            {zone.fillPath && (
              <path d={zone.fillPath} fill={hairColor} opacity={zone.fillOpacity} />
            )}
            <g fill="none" stroke={hairColor} strokeLinecap="round">
              {zone.strokes.map((s, idx) => (
                <path key={idx} d={s.d} strokeWidth={s.width} opacity={s.opacity} />
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
