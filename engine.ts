import { CLOTHES_BY_ID } from '../clothes/Clothes';

// Clothing only. The handoff's headgear category is a metadata export error.
// Four source accessories are explicitly excluded by the user's selection.
export const FEMALE_CLOTHING_STYLES = [
  'cloth-1931-green-wrap',
  'cloth-1931-tweed-suit',
  'cloth-1931-blue-stole',
  'cloth-1932-tiered-flounce',
  'cloth-1932-terracotta-ensemble',
  'cloth-1932-terracotta-open',
  'cloth-1932-plaid-bias',
  'cloth-1933-batwing-coat',
  'cloth-1933-nautical-jumper',
  'cloth-1934-satin-evening',
  'cloth-1934-satin-bolero',
  'cloth-1934-mint-tea',
  'cloth-1935-cobalt-day',
  'cloth-1935-peplum-dinner',
  'cloth-1936-burgundy-wool',
  'cloth-1936-floral-chiffon',
  'cloth-1937-palazzo-trousers',
  'cloth-1937-contrast-tailored',
  'cloth-1937-pink-garden',
  'cloth-1938-sculpted-sheath',
  'cloth-1938-polka-puffs',
  'cloth-1939-royal-floral',
  'cloth-1938-uberfrau-uniform',
] as const;
export type ClothingStyle = (typeof FEMALE_CLOTHING_STYLES)[number];
export const CLOTHING_LABELS = Object.fromEntries(FEMALE_CLOTHING_STYLES.map(id => [id, `${CLOTHES_BY_ID[id].name} · Линден`])) as Record<ClothingStyle, string>;
export function isFemaleClothing(style: string | null | undefined): style is ClothingStyle {
  return typeof style === 'string' && (FEMALE_CLOTHING_STYLES as readonly string[]).includes(style);
}
