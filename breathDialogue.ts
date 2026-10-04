import { camouflageRoll } from './eyeCamouflage';

export const BAG_ITEMS = {
  ticket: { title: 'Железнодорожный билет', note: 'Помятый билет с отметкой станции.', kind: 'paper' },
  letters: { title: 'Письма в конвертах', note: 'Личные письма, перетянутые бечёвкой.', kind: 'paper' },
  notebook: { title: 'Карманная записная книжка', note: 'Адреса, расходы и заметки в дороге.', kind: 'paper' },
  comb: { title: 'Гребень', note: 'Обычный деревянный гребень.', kind: 'comb' },
  handkerchief: { title: 'Носовой платок', note: 'Сложенный тканевый платок.', kind: 'cloth' },
  bread: { title: 'Сверток с едой', note: 'Дорожный перекус в бумаге.', kind: 'parcel' },
  belladonna: { title: 'Капли «Belladonna»', note: 'На немецкой этикетке: «Belladonna · Augentropfen». Флакон глазных капель.', kind: 'drops' },
  partyBadge: { title: 'Партийный значок', note: 'Тяжёлый партийный знак на булавке, отполированный до блеска.', kind: 'paper' },
  partyDirective: { title: 'Служебная партийная записка', note: 'Папка с распоряжениями и отметками канцелярии.', kind: 'paper' },
  partyArmband: { title: 'Партийная повязка', note: 'Сложенная красная повязка с официальной символикой.', kind: 'cloth' },
  partyCards: { title: 'Партийные удостоверения', note: 'Несколько карточек с печатями и фамилиями сопровождающих.', kind: 'paper' },
} as const;
export type BagItemId = keyof typeof BAG_ITEMS;
const ORDINARY: readonly BagItemId[] = ['ticket', 'letters', 'notebook', 'comb', 'handkerchief', 'bread'];

export function bagContents(id: number, hasBelladonna: boolean): BagItemId[] {
  const start = Math.floor(camouflageRoll(id, 0x42414737) * ORDINARY.length);
  const items = [ORDINARY[start], ORDINARY[(start + 2) % ORDINARY.length], ORDINARY[(start + 4) % ORDINARY.length]];
  return hasBelladonna ? [...items, 'belladonna'] : items;
}
