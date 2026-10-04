import type { CreatureType } from './visitors';

export const EYE_CAMOUFLAGE_CHANCE = 0.5;
export const BELLADONNA_IF_CAMOUFLAGED_CHANCE = 0.5;
const CAMOUFLAGED_TYPES: readonly CreatureType[] = ['werewolf', 'ghoul', 'mermaid'];

/** Independent, deterministic cosmetic/evidence rolls; never story RNG. */
export function camouflageRoll(id: number, salt: number): number {
  let x = (id ^ salt) >>> 0;
  x = Math.imul(x ^ (x >>> 16), 0x7feb352d);
  x = Math.imul(x ^ (x >>> 15), 0x846ca68b);
  return ((x ^ (x >>> 16)) >>> 0) / 4294967296;
}
export function eyeCamouflage(id: number, type: CreatureType, shift: number) {
  const eyesDisguised = shift >= 7 && CAMOUFLAGED_TYPES.includes(type)
    && camouflageRoll(id, 0x45594537) < EYE_CAMOUFLAGE_CHANCE;
  const hasBelladonna = eyesDisguised
    && camouflageRoll(id, 0x42454c37) < BELLADONNA_IF_CAMOUFLAGED_CHANCE;
  return { eyesDisguised, hasBelladonna };
}
