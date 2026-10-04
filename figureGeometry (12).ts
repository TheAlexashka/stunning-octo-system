import { bounded, type Point, type TaperSpec, type WaveSpec } from './types';

/**
 * Движок мужских укладок 1930-х. Здесь нет висящих спиралей: мужская
 * причёска эпохи это плоская волна с бриолиновым бликом, прочёс гребнем и
 * короткая окантовка машинкой. Все генераторы детерминированы.
 */
const TAU = Math.PI * 2;
const num = (value: number) => Number(value.toFixed(3));
const pair = (p: Point) => `${num(p[0])} ${num(p[1])}`;

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

function normals(points: Point[]): Point[] {
  return points.map((_, i) => {
    const a = points[Math.max(0, i - 1)];
    const b = points[Math.min(points.length - 1, i + 1)];
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const length = Math.hypot(dx, dy) || 1;
    return [-dy / length, dx / length] as Point;
  });
}

export function offsetPolyline(points: Point[], distance: number): Point[] {
  const ns = normals(points);
  return points.map((p, i) => [p[0] + ns[i][0] * distance, p[1] + ns[i][1] * distance] as Point);
}

/** Ось волны: синус, затухающий к обоим концам пряди. */
export function wavePoints(spec: WaveSpec, amplitude: number, steps = 30): Point[] {
  const dx = spec.x1 - spec.x0, dy = spec.y1 - spec.y0;
  const length = Math.hypot(dx, dy) || 1;
  const nx = -dy / length, ny = dx / length;
  return Array.from({ length: steps + 1 }, (_, i) => {
    const t = i / steps;
    const fade = Math.sin(Math.PI * Math.min(1, t * 1.12 + 0.06));
    const offset = Math.sin((spec.phase ?? 0) + t * spec.waves * TAU) * amplitude * fade;
    return [spec.x0 + dx * t + nx * offset, spec.y0 + dy * t + ny * offset] as Point;
  });
}

/** Замкнутая лента с шириной, убывающей от корня к кончику пряди. */
export function ribbonFromPoints(points: Point[], w0: number, w1: number): string {
  const ns = normals(points);
  const widths = points.map((_, i) => {
    const t = i / (points.length - 1);
    const ease = t * t * (3 - 2 * t);
    return (w0 + (w1 - w0) * ease) * (1 + Math.sin(Math.PI * t) * 0.12);
  });
  const left = points.map((p, i) => [p[0] + ns[i][0] * widths[i] * 0.5, p[1] + ns[i][1] * widths[i] * 0.5] as Point);
  const right = points.map((p, i) => [p[0] - ns[i][0] * widths[i] * 0.5, p[1] - ns[i][1] * widths[i] * 0.5] as Point);
  return smoothPath([...left, ...right.reverse()], true);
}

export interface WavePaths { body: string; crest: string; groove: string; hairs: string[] }

export function resolveWave(spec: WaveSpec, depth = 100): WavePaths {
  const points = wavePoints(spec, spec.amp * bounded(depth, 100, 60, 150) / 100);
  return {
    body: ribbonFromPoints(points, spec.w0, spec.w1),
    crest: smoothPath(offsetPolyline(points, -spec.w0 * 0.24)),
    groove: smoothPath(offsetPolyline(points, spec.w0 * 0.3)),
    hairs: [-0.34, -0.08, 0.16, 0.36].map((k) => smoothPath(offsetPolyline(points, spec.w0 * k))),
  };
}

/** Прочёс гребнем: веер прядей между двумя направляющими. */
export function combFan(from: Point[], to: Point[], count: number): string[] {
  const size = Math.max(from.length, to.length);
  return Array.from({ length: count }, (_, i) => {
    const t = count === 1 ? 0.5 : i / (count - 1);
    const points = Array.from({ length: size }, (_, j) => {
      const a = from[Math.min(j, from.length - 1)];
      const b = to[Math.min(j, to.length - 1)];
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t] as Point;
    });
    return smoothPath(points);
  });
}

/** Окантовка машинкой: короткие штрихи, густота зависит от ползунка. */
export function resolveTaper(spec: TaperSpec, density = 100): string[] {
  const k = bounded(density, 100, 0, 150) / 100;
  if (k <= 0.02) return [];
  const rows = Math.max(1, Math.round(spec.rows * k));
  const cols = Math.max(1, Math.round(spec.cols * k));
  const radians = spec.angle * Math.PI / 180;
  const strokes: string[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const jitter = seedNoise(spec.seed + row * 7.3 + col * 3.1);
      const x = spec.x + (col + 0.5 + (jitter - 0.5) * 0.7) * (spec.w / cols);
      const y = spec.y + (row + 0.5 + (seedNoise(spec.seed + row * 2.7 + col * 5.9) - 0.5) * 0.6) * (spec.h / rows);
      const len = spec.len * (0.7 + jitter * 0.6);
      strokes.push(`M${num(x)} ${num(y)}L${num(x + Math.cos(radians) * len)} ${num(y + Math.sin(radians) * len)}`);
    }
  }
  return strokes;
}

/** Кольцо волос: внешний контур черепа минус линия роста волос. */
export function shell(o: { top: number; volume: number; hairline: number; temple: number; peak?: number; bottom?: number }): string {
  const { top, volume, hairline, temple } = o;
  const peak = o.peak ?? 0;
  const bottom = o.bottom ?? 90;
  const left = 150 - volume, right = 150 + volume;
  return `M${left} ${bottom}C${left - 1} ${top + 26} ${150 - volume * 0.66} ${top} 150 ${top}` +
    `C${150 + volume * 0.66} ${top} ${right + 1} ${top + 26} ${right} ${bottom}` +
    `L${right - 9} ${bottom - 1}C${right - 7} ${top + 31} ${150 + temple} ${hairline - 5} 150 ${hairline - peak}` +
    `C${150 - temple} ${hairline - 5} ${left + 7} ${top + 31} ${left + 9} ${bottom - 1}Z`;
}

/** Приподнятая масса: кок, валик надо лбом, объём под кепкой. */
export function lift(x: number, y: number, rx: number, ry: number, rotation = 0) {
  return {
    transform: `translate(${x} ${y}) rotate(${rotation})`,
    d: `M${-rx} 0C${-rx} ${-ry * 1.15} ${rx * 0.5} ${-ry * 1.35} ${rx} ${-ry * 0.35}C${rx * 1.1} ${ry * 0.6} ${-rx * 0.55} ${ry} ${-rx} 0Z`,
    strands: combFan([[-rx * 0.95, 0], [-rx * 0.2, -ry * 1.05], [rx * 0.95, -ry * 0.3]], [[-rx * 0.7, ry * 0.35], [-rx * 0.1, -ry * 0.35], [rx * 0.7, ry * 0.2]], 13),
    highlights: [`M${-rx * 0.86} ${-ry * 0.12}C${-rx * 0.5} ${-ry * 1.05} ${rx * 0.42} ${-ry * 1.1} ${rx * 0.86} ${-ry * 0.42}C${rx * 0.25} ${-ry * 0.82} ${-rx * 0.42} ${-ry * 0.62} ${-rx * 0.86} ${-ry * 0.12}Z`],
    shadows: [`M${-rx * 0.6} ${ry * 0.1}C${-rx * 0.25} ${-ry * 0.2} ${rx * 0.7} ${-ry * 0.02} ${rx * 0.78} ${ry * 0.24}C${rx * 0.15} ${ry * 0.7} ${-rx * 0.42} ${ry * 0.5} ${-rx * 0.6} ${ry * 0.1}Z`],
  };
}

