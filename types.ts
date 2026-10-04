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

