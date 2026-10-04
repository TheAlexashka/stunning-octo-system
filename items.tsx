import { headSpanAt, resolveScalp, resolveStubble } from './scalpGeometry';
import type { HeadGeometry, MenDesign, Point } from './types';

export interface ScalpCheck { name: string; passed: boolean }

function fixture(sx = 1, sy = 1, view: HeadGeometry['view'] = 'front'): HeadGeometry {
  const outline: Point[] = [[150, 30], [126, 34], [114, 48], [110, 73], [114, 98], [132, 125], [150, 132], [168, 125], [186, 98], [190, 73], [186, 48], [174, 34]];
  const contour = outline.map(([x, y]): Point => [150 + (x - 150) * sx, 30 + (y - 30) * sy]);
  return { path: `M${contour.map((p) => p.join(' ')).join('L')}Z`, contour, bounds: [150 - 40 * sx, 30, 80 * sx, 102 * sy], view };
}

export function checkScalpGeometry(designs: readonly MenDesign[]): ScalpCheck[] {
  const scalpDesigns = designs.filter((d) => !!d.scalp?.length);
  const specs = scalpDesigns.flatMap((d) => d.scalp ?? []);
  const headFor = (region: string) => fixture(1, 1, region === 'nape' ? 'back' : 'front');
  const usable = specs.length > 0;
  const hasBadNumber = (d: string) => /NaN|Infinity|undefined/.test(d);
  return [
    { name: 'scalp is a third layer, not a hair surface', passed: usable && designs.every((d) => [...d.front, ...d.back].every((s) => !('stubble' in s))) },
    { name: 'fine hair strokes instead of circular dots', passed: usable && specs.every((spec) => {
      const texture = resolveStubble(spec, headFor(spec.region));
      return texture.strokes.length > 10 && texture.strokes.every((s) => /^M[-\d. ]+Q[-\d. ]+$/.test(s.d) && Math.hypot(s.end[0] - s.start[0], s.end[1] - s.start[1]) > s.width * 4);
    }) },
    { name: 'density zero removes both ink and tint', passed: usable && specs.every((spec) => {
      const texture = resolveStubble(spec, headFor(spec.region), 0);
      return texture.strokes.length === 0 && texture.fillOpacity === 0;
    }) },
    { name: 'increasing density preserves existing hair positions', passed: usable && specs.every((spec) => {
      const a = resolveStubble(spec, headFor(spec.region), 100);
      const b = resolveStubble(spec, headFor(spec.region), 150);
      const paths = new Set(b.strokes.map((s) => s.d));
      return b.strokes.length >= a.strokes.length && a.strokes.every((s) => paths.has(s.d));
    }) },
    { name: 'scalp is independent of all four hair-fit sliders', passed: usable && scalpDesigns.every((d) => {
      const original = JSON.stringify(resolveScalp(d, fixture()));
      return [72, 128].every((v) => original === JSON.stringify(resolveScalp(d, fixture(), { hairFrontWidth: v, hairFrontHeight: v, hairBackWidth: v, hairBackHeight: v })));
    }) },
    { name: 'strokes remain inside narrow and wide heads at extremes', passed: usable && specs.every((spec) => [0.8, 1, 1.2].every((sx) => [0.9, 1.1].every((sy) => [50, 175].every((length) => {
      const head = fixture(sx, sy, spec.region === 'nape' ? 'back' : 'front');
      const texture = resolveStubble(spec, head, 150, length);
      return !hasBadNumber(texture.boundary) && texture.strokes.every((s) => !hasBadNumber(s.d) && [s.start, s.control, s.end].every(([x, y]) => {
        const span = headSpanAt(head, y);
        return !!span && x - s.width / 2 >= span[0] && x + s.width / 2 <= span[1];
      }));
    })))) },
    { name: 'nape never appears on the front of the face', passed: usable && specs.filter((s) => s.region === 'nape').every((spec) => resolveStubble(spec, fixture()).strokes.length === 0) },
    { name: 'missing head geometry produces no unbounded texture', passed: specs.every((spec) => resolveStubble(spec, { path: '', bounds: [0, 0, 0, 0], contour: [], view: 'front' }).strokes.length === 0) },
    { name: 'scalp generation is deterministic', passed: usable && specs.every((spec) => JSON.stringify(resolveStubble(spec, headFor(spec.region))) === JSON.stringify(resolveStubble(spec, headFor(spec.region)))) },
  ];
}

/** Browser-only checks of the displayed preview, not just path generation. */
export function checkScalpPreview(svg: SVGSVGElement, expected: boolean): ScalpCheck[] {
  const roots = svg.querySelectorAll('[data-men-scalp]');
  if (!expected) return [{ name: 'disabled scalp is absent from the SVG', passed: roots.length === 0 }];
  const root = roots[0];
  const skin = svg.querySelector('[data-head-skin]');
  const clip = root?.querySelector('[data-head-clip]');
  const ids = Array.from(svg.querySelectorAll('[id]'), (element) => element.id);
  return [
    { name: 'exactly one independent scalp layer in the portrait', passed: roots.length === 1 && !root?.parentElement?.closest('[data-men-hair]') && !root?.hasAttribute('transform') },
    { name: 'scalp clipping uses the identical skin path', passed: !!skin && !!clip && skin.getAttribute('d') === clip.getAttribute('d') },
    { name: 'scalp markup has no dots or ellipses', passed: !!root && root.querySelectorAll('circle, ellipse').length === 0 },
    { name: 'SVG ids are unique in this portrait', passed: new Set(ids).size === ids.length },
  ];
}
