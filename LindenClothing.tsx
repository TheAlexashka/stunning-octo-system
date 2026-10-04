import type { FigureRig } from '../body/figureGeometry';

export type ClothingCategory = 'dress' | 'suit' | 'coat' | 'costume' | 'accessory';

export interface ClothesDef {
  id: string;
  name: string;
  year: number;
  category: ClothingCategory;
  description: string;
  position: string;
  color: string;
  accent?: string;
  pattern?: string;
}

export interface ClothesSettings {
  clothesColor?: string;
  clothesAccent?: string;
}

export interface ClothesRenderContext {
  rig: FigureRig;
  skin: string;
  color: string;
  accent: string;
  uid: string;
  /** id SVG-паттерна ткани (если у предмета есть принт) */
  patId?: string;
}

export function tone(color: string, amount: number): string {
  const value = Math.min(1, Math.max(-1, amount));
  if (!/^#[\da-f]{6}$/i.test(color)) {
    return `color-mix(in srgb, ${color} ${(1 - Math.abs(value)) * 100}%, ${value < 0 ? 'black' : 'white'})`;
  }
  const target = value < 0 ? 0 : 255;
  const channels = [1, 3, 5].map((offset) => {
    const channel = parseInt(color.slice(offset, offset + 2), 16);
    return Math.round(channel + (target - channel) * Math.abs(value));
  });
  return `rgb(${channels.join(',')})`;
}

