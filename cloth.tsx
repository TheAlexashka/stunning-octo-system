import { memo, useId, useMemo } from 'react';
import { resolveScalp, validHead } from './scalpGeometry';
import { bounded, tone, type HeadGeometry, type MenDesign, type MenSettings } from './types';

const EMPTY: MenSettings = {};

/** Mount once, inside the head's coordinate system, after skin and before hair. */
export const MenScalp = memo(function MenScalp({ styleId, designs, head, face = EMPTY }: {
  styleId: string;
  designs: Readonly<Record<string, MenDesign>>;
  head: HeadGeometry;
  face?: MenSettings;
}) {
  const uid = `men-scalp-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const specs = designs[styleId]?.scalp;
  const density = bounded(face.menTaper, 100, 0, 150);
  const length = bounded(face.menStubbleLength, 100, 50, 175);
  const textures = useMemo(() => resolveScalp(designs[styleId], head, { menTaper: density, menStubbleLength: length }), [designs, styleId, head, density, length]);
  if (!specs?.length || !validHead(head) || density === 0) return null;
  const base = face.posterHairColor || 'var(--hair, #3a2a1e)';
  const hasExclusions = !!head.exclude?.length;

  return <g data-men-scalp={styleId} data-layer="scalp" data-coordinate-space="head">
    <defs>
      <clipPath id={`${uid}-head`} clipPathUnits="userSpaceOnUse"><path d={head.path} data-head-clip="true" /></clipPath>
      {hasExclusions && <mask id={`${uid}-features`} maskUnits="userSpaceOnUse" x={head.bounds[0]} y={head.bounds[1]} width={head.bounds[2]} height={head.bounds[3]}>
        <path d={head.path} fill="white" />
        {head.exclude?.map((d, i) => <path key={i} d={d} fill="black" />)}
      </mask>}
    </defs>
    <g clipPath={`url(#${uid}-head)`} mask={hasExclusions ? `url(#${uid}-features)` : undefined}>
      {textures.map((texture, i) => texture.strokes.length > 0 && <g key={i} data-scalp-region={texture.region}>
        <defs>
          <clipPath id={`${uid}-zone-${i}`} clipPathUnits="userSpaceOnUse"><path d={texture.boundary} /></clipPath>
          <linearGradient id={`${uid}-tone-${i}`} gradientUnits="userSpaceOnUse" x1={head.bounds[0]} x2={head.bounds[0]} y1={specs[i].fadeTo === 'up' ? texture.y1 : texture.y0} y2={specs[i].fadeTo === 'up' ? texture.y0 : texture.y1}>
            <stop offset="0" stopColor={base} stopOpacity={texture.fillOpacity} />
            <stop offset="1" stopColor={base} stopOpacity={texture.fillOpacity * (specs[i].fadeTo === 'none' || !specs[i].fadeTo ? 1 : 0.1)} />
          </linearGradient>
        </defs>
        <g clipPath={`url(#${uid}-zone-${i})`}>
          <path d={texture.boundary} fill={`url(#${uid}-tone-${i})`} />
          <g fill="none" stroke={tone(base, -0.25)} strokeLinecap="butt">
            {texture.strokes.map((stroke, index) => <path key={index} d={stroke.d} strokeWidth={stroke.width} opacity={stroke.opacity} />)}
          </g>
        </g>
      </g>)}
    </g>
  </g>;
});
