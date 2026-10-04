import { POSTER_DESIGNS as WAVE } from './waveDesigns';
import { POSTER_DESIGNS as WAVE2 } from './wave2Designs';
import type { PosterDesign } from './types';

// User explicitly selected ALL 13 variants, including both duplicate-ID designs.
// Keep WAVE2 original IDs; WAVE's two alternate looks receive a stable suffix.
export const LINDEN_WAVE_HAIRSTYLES = [
  'hair-poster-1938-teddy-bob-wave',
  'hair-poster-1939-wedge-bob',
  'hair-poster-1940-sculpted-sleek-wave',
] as const;
export const LINDEN_WAVE2_HAIRSTYLES = [
  'hair-poster-1936-marcel',
  'hair-poster-1936-finger-waves',
  'hair-poster-1937-shell-curls',
  'hair-poster-1937-side-part-roll',
  'hair-poster-1938-tea-waves',
  'hair-poster-1938-teddy-bob',
  'hair-poster-1938-twin-waves',
  'hair-poster-1939-pompadour',
  'hair-poster-1940-sculpted-sleek',
  'hair-poster-1938-doll-pomp',
] as const;
export const LINDEN_FEMALE_HAIRSTYLES = [...LINDEN_WAVE_HAIRSTYLES, ...LINDEN_WAVE2_HAIRSTYLES] as const;
export type LindenFemaleHairStyle = (typeof LINDEN_FEMALE_HAIRSTYLES)[number];

const ALTERNATES: Readonly<Record<string, string>> = {
  'hair-poster-1938-teddy-bob-wave': 'hair-poster-1938-teddy-bob',
  'hair-poster-1940-sculpted-sleek-wave': 'hair-poster-1940-sculpted-sleek',
};
export function isWaveHair(style: string): boolean {
  return (LINDEN_WAVE_HAIRSTYLES as readonly string[]).includes(style);
}
export function isLindenFemaleHair(style: string): style is LindenFemaleHairStyle {
  return (LINDEN_FEMALE_HAIRSTYLES as readonly string[]).includes(style);
}

export const LINDEN_WOMENS_DESIGNS: Readonly<Record<string, PosterDesign>> = Object.fromEntries(
  LINDEN_FEMALE_HAIRSTYLES.map(id => {
    const original = (isWaveHair(id) ? WAVE : WAVE2)[ALTERNATES[id] ?? id];
    return [id, { ...original, id }];
  }),
);
export const LINDEN_WOMENS_HAIR_LABELS = Object.fromEntries(
  LINDEN_FEMALE_HAIRSTYLES.map(id => {
    const variant = /teddy-bob|sculpted-sleek/.test(id) ? ` · ${isWaveHair(id) ? 'WAVE' : 'WAVE2'}` : '';
    return [id, `${LINDEN_WOMENS_DESIGNS[id].name} · Линден${variant}`];
  }),
) as Record<LindenFemaleHairStyle, string>;
