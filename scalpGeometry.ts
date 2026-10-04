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
