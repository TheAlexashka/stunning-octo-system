export { bounded, tone } from '../poster1930/types';
export type Layer = 'front' | 'back';
export type BBox = [number, number, number, number];
export type Point = [number, number];
/** Кубическая кривая: x0 y0 c1x c1y c2x c2y x1 y1 — формат исходного SVG-бандла. */
export type Curve = [number, number, number, number, number, number, number, number];

/** Internal renderer parameters, supplied with fixed author defaults.
 * No FaceSel, wardrobe, editor controls or headwear API is transferred.
 */
export interface PosterSettings {
  hairFrontWidth?: number;
  hairFrontHeight?: number;
  hairBackWidth?: number;
  hairBackHeight?: number;
  posterHairColor?: string;
  posterHairSecondary?: string;
  curlTightness?: number;
  curlVolume?: number;
  hairSheen?: number;
}

/**
 * Локон в ЛОКАЛЬНЫХ координатах: рисуется в начале координат и переносится
 * translate(x y) rotate(rotation) scale(±1 1). Зеркало всего примитива
 * зеркалит и кончик, и конус, и текстуру.
 */
export interface CurlSpec {
  x: number;
  y: number;
  /** радиус витка у основания */
  r: number;
  /** длина по оси */
  h: number;
  /** число Werwolf */
  coils: number;
  /** конусность 0..0.95 */
  taper?: number;
  /** наклон −2..2 */
  tilt?: number;
  phase?: number;
  /** ширина ленты у корня */
  w?: number;
  /** 'pin' — плоский pin-curl (спираль в плоскости), иначе висящий локон */
  kind?: 'pin' | 'ringlet';
  rotation?: number;
  mirrored?: boolean;
}

export interface Surface {
  d?: string;
  transform?: string;
  strands?: string[];
  highlights?: string[];
  shadows?: string[];
  part?: string;
  coils?: CurlSpec[];
}

export interface PosterDesign {
  id: string;
  name: string;
  year: number;
  caption?: string;
  description: string;
  position: string;
  referenceView: string;
  construction: string;
  recommendedHeadwear?: string;
  bbox: BBox;
  back: Surface[];
  front: Surface[];
}

