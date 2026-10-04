import { memo, useId, useMemo, type ReactNode } from 'react';
import { resolvePosterCurl } from './engine';
import { bounded, tone, type CurlSpec, type PosterDesign, type Layer, type PosterSettings, type Surface } from './types';

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

export function HairSurface({ surface, uid, settings, base, secondary, textureScale = 1, children }: {
  surface: Surface; uid: string; settings: PosterSettings; base: string; secondary: string;
  textureScale?: number; children?: ReactNode;
}) {
  const sheen = bounded(settings.hairSheen, 100, 0, 200) / 200;
  return (
    <g transform={surface.transform} data-linden-material="hair">
      {surface.d && <>
        <defs>
          <linearGradient id={`${uid}-mass`} x1="18%" y1="4%" x2="82%" y2="100%">
            <stop offset="0" stopColor={tone(base, 0.18)} />
            <stop offset="0.3" stopColor={base} />
            <stop offset="0.66" stopColor={secondary} />
            <stop offset="1" stopColor={tone(base, -0.32)} />
          </linearGradient>
          <clipPath id={`${uid}-mask`}><path d={surface.d} /></clipPath>
          <filter id={`${uid}-soft`} x="-15%" y="-15%" width="130%" height="130%"><feGaussianBlur stdDeviation={0.6 * textureScale} /></filter>
        </defs>
        <path d={surface.d} fill={`url(#${uid}-mass)`} stroke={tone(base, -0.55)} strokeWidth={0.65 * textureScale} strokeLinejoin="round" />
        <g clipPath={`url(#${uid}-mask)`}>
          {surface.shadows?.map((d, i) => <path key={`s${i}`} d={d} fill={tone(base, -0.6)} opacity="0.62" />)}
          {surface.highlights?.map((d, i) => <path key={`h${i}`} d={d} fill={tone(secondary, 0.5)} opacity={sheen * 0.55} filter={`url(#${uid}-soft)`} />)}
          {surface.strands?.map((d, i) => <path key={`t${i}`} d={d} fill="none" stroke={i % 4 === 0 ? tone(secondary, 0.27) : tone(base, -0.6)} strokeWidth={(i % 4 === 0 ? 0.38 : 0.35) * textureScale} strokeLinecap="round" opacity={i % 4 === 0 ? 0.5 : 0.58} />)}
          {children}
        </g>
        {/* A part must end inside the hair, never continue as a loose forehead line. */}
        {surface.part && <path d={surface.part} clipPath={`url(#${uid}-mask)`} fill="none" stroke={tone(base, -0.6)} strokeWidth={0.85 * textureScale} strokeLinecap="round" />}
      </>}
      {surface.coils?.map((spec, i) => <CurlArt key={i} spec={spec} uid={`${uid}-curl-${i}`} base={base} secondary={secondary} settings={settings} />)}
    </g>
  );
}

const EMPTY_SETTINGS: PosterSettings = {};

export const PosterHair = memo(function PosterHair({ styleId, layer = 'front', face = EMPTY_SETTINGS, designs }: {
  styleId: string; layer?: Layer; face?: PosterSettings; designs: Readonly<Record<string, PosterDesign>>;
}) {
  const uid = `poster-hair-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const design = designs[styleId];
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

