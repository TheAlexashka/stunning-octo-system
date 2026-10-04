export type Layer = 'front' | 'back';
export type BBox = [number, number, number, number];
export type Curve = [number, number, number, number, number, number, number, number];
export type Point = [number, number];

// Optional, structural settings: importing the game's FaceSel is not required.
export interface PosterSettings {
  hairFrontWidth?: number;
  hairFrontHeight?: number;
  hairBackWidth?: number;
  hairBackHeight?: number;
  curlTightness?: number;
  curlVolume?: number;
  hairSheen?: number;
  posterHairColor?: string;
  posterHairSecondary?: string;
  posterHatColor?: string;
  posterRibbonColor?: string;
  posterSnoodSpacing?: number;
  posterSnoodOpacity?: number;
  ribbonColor?: string;
  hatWidth?: number;
  hatScale?: number;
  hatRotation?: number;
  hatMirrored?: boolean;
}

export interface CurlSpec {
  kind: 'ringlet' | 'pin';
  x: number;
  y: number;
  r: number;
  h: number;
  coils: number;
  w?: number;
  phase?: number;
  taper?: number;
  tilt?: number;
  rotation?: number;
  mirrored?: boolean;
}

export interface Surface {
  d: string;
  strands?: string[];
  highlights?: string[];
  shadows?: string[];
  part?: string;
  transform?: string;
  coils?: CurlSpec[];
}

export interface PosterDesign {
  id: string;
  name: string;
  year: number;
  caption: string;
  position: string;
  description: string;
  construction: string;
  referenceView: string;
  bbox: BBox;
  front: Surface[];
  back: Surface[];
  recommendedHeadwear?: string;
}

export type PosterHatKind =
  | 'cord' | 'ribbon' | 'chenille' | 'satin-loops'
  | 'toque' | 'sailor' | 'doll' | 'cossack' | 'topper'
  | 'turban' | 'plush' | 'shako' | 'snood-hood'
  | 'goggles' | 'forehead-gem';

export interface PosterHeadwearDef {
  id: string;
  name: string;
  year: number;
  kind: PosterHatKind;
  category?: 'headgear' | 'accessories';
  description: string;
  bbox: BBox;
  color?: string;
  accent?: string;
  position?: string;
}

export function bounded(value: number | undefined, fallback: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, typeof value === 'number' && Number.isFinite(value) ? value : fallback));
}

// Hex colors are resolved numerically for standalone SVG export. The game can
// continue supplying its inherited --hair variable without an adapter.
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
