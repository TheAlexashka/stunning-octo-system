import { memo, useId, useMemo } from 'react';
import { MEN_DESIGNS } from './designs';
import { resolveTaper, resolveWave } from './engine';
import { bounded, tone, type Layer, type MenDesign, type MenSettings, type Surface } from './types';

function HairSurface({ surface, uid, settings, base, secondary }: {
  surface: Surface; uid: string; settings: MenSettings; base: string; secondary: string;
}) {
  const glossLevel = bounded(settings.menGloss, 100, 0, 200) / 200;
  const depth = bounded(settings.menWaveDepth, 100, 60, 150);
  const density = bounded(settings.menTaper, 100, 0, 150);

  const waves = useMemo(() => (surface.waves ?? []).map((spec) => resolveWave(spec, depth)), [surface.waves, depth]);
  const taper = useMemo(() => (surface.taper ?? []).flatMap((spec) => resolveTaper(spec, density)), [surface.taper, density]);

  return (
    <g transform={surface.transform}>
      <defs>
        <linearGradient id={`${uid}-mass`} x1="16%" y1="0%" x2="84%" y2="100%">
          <stop offset="0" stopColor={tone(base, 0.14)} />
          <stop offset="0.34" stopColor={base} />
          <stop offset="0.7" stopColor={secondary} />
          <stop offset="1" stopColor={tone(base, -0.34)} />
        </linearGradient>
        <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="0.75" /></filter>
        {surface.d && <clipPath id={`${uid}-mask`}><path d={surface.d} /></clipPath>}
      </defs>

      {surface.d && <>
        <path d={surface.d} fill={`url(#${uid}-mass)`} stroke={tone(base, -0.55)} strokeWidth="0.6" strokeLinejoin="round" />
        <g clipPath={`url(#${uid}-mask)`}>
          {surface.shadows?.map((d, i) => <path key={`s${i}`} d={d} fill={tone(base, -0.58)} opacity="0.55" />)}
          {surface.strands?.map((d, i) => (
            <path key={`t${i}`} d={d} fill="none" stroke={i % 5 === 0 ? tone(secondary, 0.24) : tone(base, -0.6)} strokeWidth={i % 5 === 0 ? 0.34 : 0.3} strokeLinecap="round" opacity={i % 5 === 0 ? 0.48 : 0.5} />
          ))}
          {/* окантовка машинкой: короткие жёсткие волоски */}
          {taper.map((d, i) => <path key={`c${i}`} d={d} stroke={tone(base, -0.5)} strokeWidth="0.32" strokeLinecap="round" opacity="0.5" />)}
          {surface.highlights?.map((d, i) => (
            <path key={`h${i}`} d={d} fill={tone(secondary, 0.52)} opacity={0.18 + glossLevel * 0.62} filter={`url(#${uid}-soft)`} />
          ))}
        </g>
        {surface.part && <path d={surface.part} fill="none" stroke={tone(base, -0.66)} strokeWidth="0.9" strokeLinecap="round" />}
      </>}

      {/* скульптурные волны поверх массы */}
      {waves.map((paths, i) => (
        <g key={`w${i}`}>
          <defs><clipPath id={`${uid}-wave-${i}`}><path d={paths.body} /></clipPath></defs>
          <path d={paths.body} fill={`url(#${uid}-mass)`} stroke={tone(base, -0.5)} strokeWidth="0.26" strokeLinejoin="round" />
          <g clipPath={`url(#${uid}-wave-${i})`} fill="none" strokeLinecap="round">
            <path d={paths.groove} stroke={tone(base, -0.62)} strokeWidth="1.5" opacity="0.45" />
            {paths.hairs.map((d, k) => <path key={k} d={d} stroke={tone(base, -0.3)} strokeWidth="0.24" opacity="0.6" />)}
            <path d={paths.crest} stroke={tone(secondary, 0.5)} strokeWidth="1.5" opacity={glossLevel * 0.72} />
            <path d={paths.crest} stroke={tone(secondary, 0.74)} strokeWidth="0.4" opacity={glossLevel * 0.85} />
          </g>
        </g>
      ))}
    </g>
  );
}

const EMPTY: MenSettings = {};

/**
 * `designs` позволяет другому бандлу (например men3040) использовать тот же
 * рендерер со своим реестром, не трогая этот файл и не регистрируя ничего
 * через побочные эффекты.
 */
export const MenHair = memo(function MenHair({ styleId, layer = 'front', face = EMPTY, designs = MEN_DESIGNS }: {
  styleId: string; layer?: Layer; face?: MenSettings; designs?: Readonly<Record<string, MenDesign>>;
}) {
  const uid = `men-hair-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const design = designs[styleId];
  if (!design) return null;
  const width = bounded(layer === 'front' ? face.hairFrontWidth : face.hairBackWidth, 100, 72, 128) / 100;
  const height = bounded(layer === 'front' ? face.hairFrontHeight : face.hairBackHeight, 100, 72, 128) / 100;
  const base = face.posterHairColor || 'var(--hair, #3a2a1e)';
  const secondary = face.posterHairSecondary || base;
  return (
    <g data-men-hair={styleId} data-layer={layer} transform={`translate(150 52) scale(${width} ${height}) translate(-150 -52)`}>
      {design[layer].map((surface, i) => (
        <HairSurface key={i} surface={surface} uid={`${uid}-${layer}-${i}`} settings={face} base={base} secondary={secondary} />
      ))}
    </g>
  );
});

