import { seedNoise } from './engine';
import { bounded, type HeadGeometry, type MenDesign, type MenSettings, type Point, type StubbleSpec } from './types';

const fixed = (value: number) => Number(value.toFixed(4));
const pair = ([x, y]: Point) => `${fixed(x)} ${fixed(y)}`;

export function validHead(head: HeadGeometry): boolean {
  return !!head.path && head.bounds.every(Number.isFinite) && head.bounds[2] > 0 && head.bounds[3] > 0
    && head.contour.length >= 3 && head.contour.every((p) => p.every(Number.isFinite));
}

/** Optional DOM adapter when the host does not expose its contour numerically. */
export function sampleHeadPath(node: SVGPathElement, view: HeadGeometry['view'] = 'front'): HeadGeometry {
  const box = node.getBBox();
  const total = node.getTotalLength();
  const contour = Array.from({ length: 192 }, (_, i): Point => {
    const p = node.getPointAtLength(total * i / 192);
    return [p.x, p.y];
  });
  return { path: node.getAttribute('d') ?? '', bounds: [box.x, box.y, box.width, box.height], contour, view };
}

/** Intersect a horizontal scanline with the actual sampled skull silhouette. */
export function headSpanAt(head: HeadGeometry, y: number): [number, number] | null {
  const xs: number[] = [];
  head.contour.forEach((a, i) => {
    const b = head.contour[(i + 1) % head.contour.length];
    if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) {
      xs.push(a[0] + (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]));
    }
  });
  return xs.length >= 2 ? [Math.min(...xs), Math.max(...xs)] : null;
}

function zoneSpan(spec: StubbleSpec, head: HeadGeometry, y: number): [number, number] | null {
  const span = headSpanAt(head, y);
  if (!span) return null;
  const [left, right] = span;
  const inset = (right - left) * 0.006;
  const width = (right - left) * bounded(spec.width, 0.14, 0.04, 0.94);
  if (spec.region === 'left-temple') return [left + inset, left + width];
  if (spec.region === 'right-temple') return [right - width, right - inset];
  return [(left + right - width) / 2, (left + right + width) / 2];
}

export interface StubbleStroke {
  d: string;
  start: Point;
  control: Point;
  end: Point;
  width: number;
  opacity: number;
}

export interface ScalpTexture {
  region: StubbleSpec['region'];
  boundary: string;
  y0: number;
  y1: number;
  fillOpacity: number;
  strokes: StubbleStroke[];
}

/** Generates hair strokes in head coordinates. No hair-fit setting is read. */
export function resolveStubble(spec: StubbleSpec, head: HeadGeometry, density = 100, length = 100): ScalpTexture {
  const result: ScalpTexture = { region: spec.region, boundary: '', y0: 0, y1: 0, fillOpacity: 0, strokes: [] };
  const amount = bounded(density, 100, 0, 150) / 150;
  if (!validHead(head) || amount === 0 || spec.density <= 0) return result;
  if ((spec.region === 'nape') !== (head.view === 'back')) return result;

  const start = bounded(spec.start, 0.25, 0.02, 0.9);
  const end = bounded(spec.end, 0.61, start + 0.02, 0.98);
  const y0 = head.bounds[1] + head.bounds[3] * start;
  const y1 = head.bounds[1] + head.bounds[3] * end;
  const left: Point[] = [], right: Point[] = [];
  for (let i = 0; i <= 36; i++) {
    const y = y0 + (y1 - y0) * i / 36;
    const span = zoneSpan(spec, head, y);
    if (span) { left.push([span[0], y]); right.push([span[1], y]); }
  }
  if (left.length < 2) return result;
  result.boundary = `M${[...left, ...right.reverse()].map(pair).join('L')}Z`;
  result.y0 = y0;
  result.y1 = y1;
  result.fillOpacity = bounded(spec.density, 0.5, 0, 1) * amount * 0.18;

  const scale = Math.sqrt(head.bounds[2] * head.bounds[3] / (76 * 97));
  const strokeLength = head.bounds[3] * bounded(spec.length, 0.023, 0.012, 0.045) * bounded(length, 100, 50, 175) / 100;
  const rows = Math.min(120, Math.max(2, Math.ceil((y1 - y0) / (1.2 * scale))));
  const cols = Math.min(80, Math.max(3, Math.ceil(head.bounds[2] * bounded(spec.width, 0.14, 0.04, 0.94) / (0.95 * scale))));

  // Fixed candidates with independent density thresholds: changing density
  // reveals more hairs instead of moving all previously visible hairs around.
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const seed = spec.seed + row * 31.7 + col * 113.3;
      const t = (row + 0.18 + seedNoise(seed + 1) * 0.64) / rows;
      const fadeT = spec.fadeTo === 'up' ? 1 - t : t;
      const fade = spec.fadeTo === 'none' || !spec.fadeTo ? 1 : 1 - fadeT * fadeT * 0.9;
      if (seedNoise(seed + 2) > amount * fade * (0.6 + spec.density * 0.4)) continue;
      const y = y0 + (y1 - y0) * t;
      const span = zoneSpan(spec, head, y);
      if (!span) continue;
      const x = span[0] + (span[1] - span[0]) * (col + 0.2 + seedNoise(seed + 3) * 0.6) / cols;
      const len = strokeLength * (0.72 + seedNoise(seed + 4) * 0.48);
      const endY = y + len;
      if (endY >= y1) continue;
      const next = zoneSpan(spec, head, endY);
      if (!next) continue;
      const edge = spec.region === 'right-temple' ? 1 : 0;
      const bend = next[edge] - span[edge];
      const endX = x + bend * 0.72 + (seedNoise(seed + 5) - 0.5) * len * 0.32;
      const control: Point = [x + bend * 0.2, y + len * 0.5];
      const width = scale * (0.15 + seedNoise(seed + 6) * 0.11);
      const middle = zoneSpan(spec, head, control[1]);
      if (x - width / 2 < span[0] || x + width / 2 > span[1]
        || endX - width / 2 < next[0] || endX + width / 2 > next[1]
        || !middle || control[0] - width / 2 < middle[0] || control[0] + width / 2 > middle[1]) continue;
      const a: Point = [x, y], b: Point = [endX, endY];
      result.strokes.push({
        d: `M${pair(a)}Q${pair(control)} ${pair(b)}`,
        start: a, control, end: b, width,
        opacity: (0.38 + seedNoise(seed + 7) * 0.25) * Math.sqrt(fade),
      });
    }
  }
  return result;
}

export function resolveScalp(design: MenDesign | undefined, head: HeadGeometry, face: MenSettings = {}): ScalpTexture[] {
  return (design?.scalp ?? []).map((spec) => resolveStubble(spec, head, face.menTaper, face.menStubbleLength));
}
