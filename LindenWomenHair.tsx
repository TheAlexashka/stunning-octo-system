import { MenHair } from '../poster1930men/MenHair';
import { PosterHair } from '../poster1930/PosterHair';
import { PosterHeadwear } from '../poster1930/PosterHeadwear';
import { LINDEN_HAIR_DESIGNS, type LindenHairStyle, type LindenHeadwearStyle,  type LindenFemalePosterHairStyle } from './catalog';

type Layer = 'front' | 'back';

// Source portrait: 300 × 400, crown (150,33), ears near y=86, chin y=130.
// Game portrait: 200 × 240, crown (100,36), ears near y=121, chin y=191.
// Use one shared transform for both hair halves, NEVER for native scalp strokes.
export const LINDEN_HAIR_FIT = 'matrix(1.4 0 0 1.6 -110 -16.8)';
const SNOOD_FIT = 'matrix(1.3 0 0 1.4 -95 -10.2)';
const LINDEN_WOMEN_HAIR_FIT = 'matrix(1.35 0 0 1.6 -102.5 -16.8)';
const TURBAN_FIT = 'matrix(1.55 0 0 1.15 -132.5 -5)';

export function LindenHair({ style, layer, color }: { style: LindenHairStyle; layer: Layer; color: string }) {
  return <g data-linden-hair={style} data-linden-layer={layer} transform={LINDEN_HAIR_FIT}>
    <MenHair styleId={style} layer={layer} designs={LINDEN_HAIR_DESIGNS}
      face={{ posterHairColor: color, posterHairSecondary: color }} />
  </g>;
}

export function LindenPosterWomenHair({ style, layer, color }: { style: LindenFemalePosterHairStyle; layer: Layer; color: string }) {
  return <g data-linden-poster-hair={style} data-linden-layer={layer} transform={LINDEN_WOMEN_HAIR_FIT}>
    <PosterHair styleId={style} layer={layer}
      face={{ posterHairColor: color, posterHairSecondary: color }} />
  </g>;
}

export function LindenHeadwear({ style, layer }: { style: LindenHeadwearStyle; layer: Layer }) {
  const fit = style === 'headgear-poster-1937-self-tied-turban' ? TURBAN_FIT
    : (style === 'headgear-poster-acc-aviator-goggles' || style === 'acc-poster-carbuncle') ? LINDEN_HAIR_FIT : SNOOD_FIT;
  // Fixed garment materials: never receive hair colour or an underlying hairstyle.
  return <g data-linden-headwear={style} data-linden-layer={layer} transform={fit}>
    <PosterHeadwear id={style} layer={layer} />
  </g>;
}
