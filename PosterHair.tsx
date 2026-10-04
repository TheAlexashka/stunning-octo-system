export const LEGACY_LINDEN_HAIR_STYLES = [
  'legacy-long-straight', 'legacy-side-part', 'legacy-fringe', 'legacy-middle-part',
  'legacy-curls', 'legacy-high-ponytail', 'legacy-bun', 'legacy-bob',
  'legacy-loose-waves', 'legacy-pixie',
] as const;
export const LEGACY_LINDEN_UNISEX_HEADWEAR = ['beret', 'pillbox', 'bow'] as const;
export const LEGACY_LINDEN_FEMALE_HEADWEAR = ['turban'] as const;

export type LegacyLindenHairStyle = (typeof LEGACY_LINDEN_HAIR_STYLES)[number];
export type LegacyLindenUnisexHeadwearStyle = (typeof LEGACY_LINDEN_UNISEX_HEADWEAR)[number];
export type LegacyLindenFemaleHeadwearStyle = (typeof LEGACY_LINDEN_FEMALE_HEADWEAR)[number];
export type LegacyLindenHeadwearStyle = LegacyLindenUnisexHeadwearStyle | LegacyLindenFemaleHeadwearStyle;

export const LEGACY_LINDEN_HAIR_LABELS: Record<LegacyLindenHairStyle, string> = {
  'legacy-long-straight': 'Длинные прямые',
  'legacy-side-part': 'Пробор набок',
  'legacy-fringe': 'Чёлка',
  'legacy-middle-part': 'Пробор посередине',
  'legacy-curls': 'Локоны',
  'legacy-high-ponytail': 'Высокий хвост',
  'legacy-bun': 'Пучок',
  'legacy-bob': 'Каре',
  'legacy-loose-waves': 'Свободные волны',
  'legacy-pixie': 'Пикси',
};
export const LEGACY_LINDEN_HEADWEAR_LABELS: Record<LegacyLindenHeadwearStyle, string> = {
  beret: 'Берет',
  pillbox: 'Шляпка-таблетка',
  bow: 'Бантик',
  turban: 'Тюрбан',
};

import { MEN3040_DESIGNS } from '../men3040/designs';
import { MEN_DESIGNS } from '../poster1930men/designs';
import { POSTER_HAIR } from '../poster1930/designs';

export type LindenHairStyle =
  | LegacyLindenHairStyle
  | (typeof MEN3040_DESIGNS)[number]['id']
  | (typeof MEN_DESIGNS)[number]['id'];

export const LINDEN_HAIR_DESIGNS = { ...MEN3040_DESIGNS, ...MEN_DESIGNS };

export const LINDEN_MALE_HAIRSTYLES: readonly LindenHairStyle[] = (
  Object.keys(MEN3040_DESIGNS) as LindenHairStyle[]
).filter((id) => id !== 'hair-m3040-clipper-crop' && id !== 'hair-m3040-cap-nomad');

export function isLindenHair(style: string): style is LindenHairStyle {
  return (LINDEN_MALE_HAIRSTYLES as readonly string[]).includes(style);
}

export const LINDEN_HAIR_LABELS: Record<LindenHairStyle, string> = {
  ...LEGACY_LINDEN_HAIR_LABELS,
  ...Object.fromEntries(
    LINDEN_MALE_HAIRSTYLES.map((id) => [id, `${MEN3040_DESIGNS[id].name} · Линден`]),
  ),
};

export const LINDEN_UNISEX_HEADWEAR = ['headgear-poster-acc-aviator-goggles', 'acc-poster-carbuncle'] as const;
export const LINDEN_FEMALE_HEADWEAR = [
  'headgear-poster-1937-self-tied-turban',
  'headgear-poster-1938-snood-cord',
  'headgear-poster-1938-snood-ribbon',
  'headgear-poster-1938-snood-chenille',
] as const;
export type LindenUnisexHeadwearStyle = (typeof LINDEN_UNISEX_HEADWEAR)[number];
export type LindenFemaleHeadwearStyle = (typeof LINDEN_FEMALE_HEADWEAR)[number];
export type LindenHeadwearStyle = LindenUnisexHeadwearStyle | LindenFemaleHeadwearStyle;

export function isLindenHeadwear(style: string): style is LindenHeadwearStyle {
  return [...LINDEN_UNISEX_HEADWEAR, ...LINDEN_FEMALE_HEADWEAR].includes(style as LindenHeadwearStyle);
}

export const LINDEN_HEADWEAR_LABELS: Record<LindenHeadwearStyle, string> = {
  'headgear-poster-acc-aviator-goggles': 'Лётные очки-гогглы · Линден',
  'acc-poster-carbuncle': 'Карбункул на лбу · Линден',
  'headgear-poster-1937-self-tied-turban': 'Самовязный тюрбан 1937 · Линден',
  'headgear-poster-1938-snood-cord': 'Снуд из шнура · Линден',
  'headgear-poster-1938-snood-ribbon': 'Снуд из ленты · Линден',
  'headgear-poster-1938-snood-chenille': 'Синельный снуд · Линден',
};

export const LINDEN_EXTRAS: readonly string[] = ['hair-1933-wavy-4x3', 'headgear-poster-1938-snood-ribbon'];

export function isLindenExtra(style: string): boolean {
  return LINDEN_EXTRAS.includes(style);
}

export const LINDEN_FEMALE_POSTER_HAIRSTYLES = [
  'hair-poster-1930-nape-roll',
  'hair-poster-1933-antoine',
  'hair-poster-1935-bangs-chignon',
  'hair-poster-1937-pompadour-bob',
  'hair-poster-1938-unbrushed',
  'hair-poster-1938-feather',
  'hair-poster-1939-infanta',
  'hair-poster-1939-parted-roll',
  'hair-poster-1939-short-rolled',
  'hair-poster-1939-pompadour-plaits',
  'hair-poster-1939-under-bob',
  'hair-poster-1939-cossack-curls',
  'hair-poster-1939-quill-waves',
  'hair-poster-1939-snood-rolls',
  'hair-poster-1938-braided-coils',
] as const;

export type LindenFemalePosterHairStyle = (typeof LINDEN_FEMALE_POSTER_HAIRSTYLES)[number];

export const LINDEN_FEMALE_POSTER_LABELS: Record<LindenFemalePosterHairStyle, string> = Object.fromEntries(
  POSTER_HAIR.map((design) => [design.id, design.name]),
) as Record<LindenFemalePosterHairStyle, string>;

export function isLindenFemalePosterHair(style: string): style is LindenFemalePosterHairStyle {
  return (LINDEN_FEMALE_POSTER_HAIRSTYLES as readonly string[]).includes(style);
}

export function hasLindenScalp(style: string): boolean {
  return Object.prototype.hasOwnProperty.call(LINDEN_HAIR_DESIGNS, style);
}
