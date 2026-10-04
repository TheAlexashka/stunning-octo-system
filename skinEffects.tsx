export type Layer = 'front' | 'back';
export type BBox = [number, number, number, number];
export type Point = [number, number];

/**
 * Настройки мужского бандла. Поля посадки, цвета и шляп намеренно те же, что
 * в женском наборе: расширение FaceSel остаётся одним на две коллекции.
 * Новых полей всего три: menGloss, menWaveDepth, menTaper.
 */
export interface MenSettings {
  hairFrontWidth?: number;
  hairFrontHeight?: number;
  hairBackWidth?: number;
  hairBackHeight?: number;
  posterHairColor?: string;
  posterHairSecondary?: string;
  posterHatColor?: string;
  posterRibbonColor?: string;
  hatWidth?: number;
  hatScale?: number;
  hatRotation?: number;
  hatMirrored?: boolean;
  /** 0..200, сила бриолинового блика */
  menGloss?: number;
  /** 60..150, глубина волн «марсель» */
  menWaveDepth?: number;
  /** 0..150, плотность машинной окантовки на висках и затылке */
  menTaper?: number;
  /** 50..175, relative length of the scalp-layer hair strokes. */
  menStubbleLength?: number;
}

/** Волна: скульптурная лента переменной ширины вдоль S-образной оси. */
export interface WaveSpec {
  x0: number; y0: number; x1: number; y1: number;
  /** амплитуда до применения menWaveDepth */
  amp: number;
  /** число гребней */
  waves: number;
  phase?: number;
  /** ширина ленты у корня */
  w0: number;
  /** ширина ленты у кончика */
  w1: number;
}

/** Окантовка машинкой: поле коротких штрихов. */
export interface TaperSpec {
  x: number; y: number; w: number; h: number;
  rows: number; cols: number;
  seed: number;
  /** длина штриха */
  len: number;
  /** наклон штриха в градусах */
  angle: number;
}

// The host supplies the SAME local skull path used to paint the head.
// The sampled contour defines cross-sections; the exact path clips the ink.
export interface HeadGeometry {
  path: string;
  contour: readonly Point[];
  bounds: BBox;
  view: 'front' | 'back';
  exclude?: readonly string[];
}

/** Stubble lives in normalized head space, never on a hair Surface. */
export interface StubbleSpec {
  region: 'left-temple' | 'right-temple' | 'nape';
  /** Normalized vertical interval within the current head bounds. */
  start: number;
  end: number;
  /** Width as a fraction of the skull cross-section at each row. */
  width: number;
  /** Relative texture coverage, 0..1; not a physical millimeter value. */
  density: number;
  /** Stroke length as a fraction of head height. */
  length?: number;
  fadeTo?: 'down' | 'up' | 'none';
  seed: number;
}

export interface Surface {
  d?: string;
  strands?: string[];
  highlights?: string[];
  shadows?: string[];
  part?: string;
  transform?: string;
  waves?: WaveSpec[];
  taper?: TaperSpec[];
}

export interface MenDesign {
  id: string;
  name: string;
  years: string;
  caption: string;
  position: string;
  description: string;
  construction: string;
  referenceView: string;
  bbox: BBox;
  front: Surface[];
  back: Surface[];
  /** Third layer: painted on the head, between skin and long hair. */
  scalp?: StubbleSpec[];
  recommendedHeadwear?: string;
}

export type MenHatKind = 'fedora' | 'homburg' | 'porkpie' | 'snapbrim' | 'flatcap';

export interface MenHeadwearDef {
  id: string;
  name: string;
  years: string;
  kind: MenHatKind;
  description: string;
  bbox: BBox;
  crownWidth: number;
  crownHeight: number;
  brimRx: number;
  brimRy: number;
  bandHeight: number;
  color: string;
  band: string;
  feather?: boolean;
}

export function bounded(value: number | undefined, fallback: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, typeof value === 'number' && Number.isFinite(value) ? value : fallback));
}

/** Численный расчёт оттенка, чтобы экспорт SVG не зависел от CSS-переменных. */
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

