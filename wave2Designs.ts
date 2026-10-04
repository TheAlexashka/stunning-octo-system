import { PosterHair } from './PosterHair';
import { isWaveHair, LINDEN_WOMENS_DESIGNS, type LindenFemaleHairStyle } from './catalog';

// Shared fit of front AND back: source crown y≈33 -> game y=36,
// temples x114/186 -> x51.4/148.6; ears y86 -> y120.8.
export const LINDEN_WOMENS_HAIR_FIT = 'matrix(1.35 0 0 1.6 -102.5 -16.8)';

export function LindenWomenHair({ style, layer, color }: {
  style: LindenFemaleHairStyle;
  layer: 'front' | 'back';
  color: string;
}) {
  // The tallest pompadour needs four extra native pixels above its upper roll.
  // Move BOTH halves together so no hair is cut off by the portrait's frame.
  const fit = style === 'hair-poster-1939-pompadour'
    ? 'matrix(1.35 0 0 1.6 -102.5 -12.8)' : LINDEN_WOMENS_HAIR_FIT;
  return <g data-linden-womens-hair={style} data-wave-source={isWaveHair(style) ? 'WAVE' : 'WAVE2'}
    data-linden-layer={layer} transform={fit}>
    <PosterHair styleId={style} layer={layer} designs={LINDEN_WOMENS_DESIGNS}
      face={{ posterHairColor: color, posterHairSecondary: color }} />
  </g>;
}
