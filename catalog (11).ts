import { memo, useId } from 'react';
import { bounded, tone, type Layer, type MenHeadwearDef, type MenSettings } from './types';

/**
 * Шесть головных уборов с постера. Поля разделены на два слоя: задняя часть
 * рисуется за головой, передняя перекрывает лоб. Так шляпа садится на голову,
 * а не висит перед лицом.
 */
export const MEN_HEADWEAR: MenHeadwearDef[] = [
  {
    id: 'headgear-poster-m-1931-snap-brim-tan', name: 'Рыжая шляпа с загнутыми полями', years: '1930–1932', kind: 'snapbrim',
    description: 'Тёплый охристый фетр с широкой лентой. Соответствует рисованному портрету в верхнем ряду.',
    bbox: [86, 2, 128, 62], crownWidth: 28, crownHeight: 33, brimRx: 62, brimRy: 12, bandHeight: 9, color: '#a9682f', band: '#6f3f1d',
  },
  {
    id: 'headgear-poster-m-1932-fedora-light', name: 'Светлая федора', years: '1930–1932', kind: 'fedora',
    description: 'Классическая светлая федора с тёмной лентой и заломом по центру тульи.',
    bbox: [84, 0, 132, 64], crownWidth: 28, crownHeight: 35, brimRx: 65, brimRy: 13, bandHeight: 9, color: '#cbbda1', band: '#4a4038',
  },
  {
    id: 'headgear-poster-m-1932-homburg-dark', name: 'Тёмный хомбург', years: '1930–1932', kind: 'homburg',
    description: 'Высокая тулья, жёсткие подвёрнутые поля, тёмный фетр парадного вида.',
    bbox: [86, 0, 128, 62], crownWidth: 27, crownHeight: 37, brimRx: 60, brimRy: 12, bandHeight: 10, color: '#2f3038', band: '#17181d',
  },
  {
    id: 'headgear-poster-m-1935-porkpie', name: 'Порк-пай с широкой лентой', years: '1933–1936', kind: 'porkpie',
    description: 'Низкая плоская тулья и очень широкая лента. Соответствует профилю в среднем ряду.',
    bbox: [90, 8, 120, 56], crownWidth: 29, crownHeight: 23, brimRx: 58, brimRy: 11, bandHeight: 13, color: '#3b3f56', band: '#23263a',
  },
  {
    id: 'headgear-poster-m-1936-mallory-liberty', name: 'Mallory Liberty, голубая', years: 'c. 1936', kind: 'fedora',
    description: 'Светло-голубая федора с чёрной лентой и пером, по рекламному кадру справа на постере.',
    bbox: [84, 0, 132, 64], crownWidth: 28, crownHeight: 35, brimRx: 66, brimRy: 13, bandHeight: 10, color: '#b9d3dd', band: '#1d1f24', feather: true,
  },
  {
    id: 'headgear-poster-m-1937-flat-cap', name: 'Плоская кепка', years: '1937–1939', kind: 'flatcap',
    description: 'Мягкая суконная кепка с коротким козырьком. Соответствует портрету в нижнем ряду.',
    bbox: [96, 14, 110, 44], crownWidth: 34, crownHeight: 22, brimRx: 44, brimRy: 7, bandHeight: 0, color: '#7c7566', band: '#57513f',
  },
];

export function menHatTransform(face: MenSettings = {}): string {
  const scale = bounded(face.hatScale, 100, 55, 165) / 100;
  const width = bounded(face.hatWidth, 100, 55, 165) / 100;
  const rotation = bounded(face.hatRotation, 0, 0, 360);
  return `translate(150 44) scale(${face.hatMirrored ? -1 : 1} 1) rotate(${rotation}) scale(${scale * width} ${scale}) translate(-150 -44)`;
}

const BRIM_Y = 50;

function crownPath(item: MenHeadwearDef): string {
  const { crownWidth: cw, crownHeight: ch, kind } = item;
  const top = BRIM_Y - ch;
  if (kind === 'porkpie') {
    return `M${150 - cw} ${BRIM_Y}C${150 - cw - 1} ${top + 6} ${150 - cw * 0.9} ${top} ${150 - cw * 0.7} ${top}` +
      `L${150 + cw * 0.7} ${top}C${150 + cw * 0.9} ${top} ${150 + cw + 1} ${top + 6} ${150 + cw} ${BRIM_Y}Z`;
  }
  if (kind === 'homburg') {
    return `M${150 - cw} ${BRIM_Y}C${150 - cw - 1} ${top + 12} ${150 - cw * 0.78} ${top} ${150 - cw * 0.2} ${top}` +
      `Q150 ${top - 2} ${150 + cw * 0.2} ${top}C${150 + cw * 0.78} ${top} ${150 + cw + 1} ${top + 12} ${150 + cw} ${BRIM_Y}Z`;
  }
  return `M${150 - cw} ${BRIM_Y}C${150 - cw - 2} ${top + 13} ${150 - cw * 0.8} ${top + 1} ${150 - cw * 0.34} ${top}` +
    `Q150 ${top - 3} ${150 + cw * 0.34} ${top}C${150 + cw * 0.8} ${top + 1} ${150 + cw + 2} ${top + 13} ${150 + cw} ${BRIM_Y}Z`;
}

const EMPTY: MenSettings = {};

export const MenHeadwear = memo(function MenHeadwear({ id, layer = 'front', face = EMPTY, applyFit = false }: {
  id: string; layer?: Layer; face?: MenSettings; applyFit?: boolean;
}) {
  const uid = `men-hat-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const item = MEN_HEADWEAR.find((entry) => entry.id === id);
  if (!item) return null;

  const felt = face.posterHatColor || item.color;
  const band = face.posterRibbonColor || item.band;
  // В игре ItemArt уже применяет hatFitTransform. Включать здесь только в
  // самостоятельном предпросмотре, иначе поворот применится дважды.
  const transform = applyFit ? menHatTransform(face) : undefined;
  const { brimRx: rx, brimRy: ry, crownHeight: ch, crownWidth: cw } = item;
  const top = BRIM_Y - ch;

  if (item.kind === 'flatcap') {
    const backCap = `M${150 - cw} ${BRIM_Y - 2}C${150 - cw - 3} ${top + 4} ${150 - cw * 0.6} ${top - 3} 150 ${top - 2}C${150 + cw * 0.7} ${top - 1} ${150 + cw + 4} ${top + 8} ${150 + cw} ${BRIM_Y - 2}Z`;
    if (layer === 'back') {
      return <g data-men-headwear={id} data-layer={layer} transform={transform}>
        <path d={backCap} fill={tone(felt, -0.3)} />
      </g>;
    }
    return <g data-men-headwear={id} data-layer={layer} transform={transform}>
      <defs>
        <linearGradient id={`${uid}-cap`} x1="14%" y1="0%" x2="86%" y2="100%">
          <stop offset="0" stopColor={tone(felt, 0.2)} /><stop offset="0.6" stopColor={felt} /><stop offset="1" stopColor={tone(felt, -0.32)} />
        </linearGradient>
      </defs>
      {/* мягкая тулья со смещением вбок и короткий козырёк */}
      <path d={`M${150 - cw} ${BRIM_Y - 1}C${150 - cw - 4} ${top + 3} ${150 - cw * 0.5} ${top - 4} ${150 + cw * 0.2} ${top - 3}C${150 + cw * 0.95} ${top - 1} ${150 + cw + 6} ${top + 10} ${150 + cw + 2} ${BRIM_Y}C${150 + cw * 0.4} ${BRIM_Y + 4} ${150 - cw * 0.4} ${BRIM_Y + 4} ${150 - cw} ${BRIM_Y - 1}Z`}
        fill={`url(#${uid}-cap)`} stroke={tone(felt, -0.45)} strokeWidth="0.7" strokeLinejoin="round" />
      <path d={`M${150 - cw * 0.9} ${top + 9}C${150 - cw * 0.3} ${top - 2} ${150 + cw * 0.6} ${top + 1} ${150 + cw} ${top + 12}C${150 + cw * 0.4} ${top + 5} ${150 - cw * 0.3} ${top + 4} ${150 - cw * 0.9} ${top + 9}Z`} fill={tone(felt, 0.26)} opacity="0.75" />
      <path d={`M${150 - rx} ${BRIM_Y + 1}Q150 ${BRIM_Y + ry * 2.1} ${150 + rx * 0.72} ${BRIM_Y - 1}Q150 ${BRIM_Y + ry * 0.5} ${150 - rx} ${BRIM_Y + 1}Z`} fill={tone(band, -0.1)} stroke={tone(felt, -0.5)} strokeWidth="0.6" strokeLinejoin="round" />
      <path d={`M${150 - rx * 0.85} ${BRIM_Y + 1.6}Q150 ${BRIM_Y + ry * 1.5} ${150 + rx * 0.6} ${BRIM_Y - 0.2}`} fill="none" stroke={tone(band, 0.3)} strokeWidth="0.5" opacity="0.7" />
    </g>;
  }

  if (layer === 'back') {
    return <g data-men-headwear={id} data-layer={layer} transform={transform}>
      {/* задняя половина полей за головой */}
      <path d={`M${150 - rx} ${BRIM_Y}Q150 ${BRIM_Y - ry * 1.7} ${150 + rx} ${BRIM_Y}Q150 ${BRIM_Y - ry * 0.25} ${150 - rx} ${BRIM_Y}Z`} fill={tone(felt, -0.26)} stroke={tone(felt, -0.5)} strokeWidth="0.6" strokeLinejoin="round" />
      <path d={`M${150 - cw} ${BRIM_Y}C${150 - cw} ${top + 10} ${150 - cw * 0.6} ${top + 2} 150 ${top + 2}C${150 + cw * 0.6} ${top + 2} ${150 + cw} ${top + 10} ${150 + cw} ${BRIM_Y}Z`} fill={tone(felt, -0.34)} />
    </g>;
  }

  return <g data-men-headwear={id} data-layer={layer} transform={transform}>
    <defs>
      <linearGradient id={`${uid}-felt`} x1="12%" y1="0%" x2="88%" y2="96%">
        <stop offset="0" stopColor={tone(felt, 0.22)} /><stop offset="0.45" stopColor={felt} /><stop offset="1" stopColor={tone(felt, -0.34)} />
      </linearGradient>
      <linearGradient id={`${uid}-brim`} x1="0%" y1="0%" x2="10%" y2="100%">
        <stop offset="0" stopColor={tone(felt, -0.12)} /><stop offset="1" stopColor={tone(felt, -0.42)} />
      </linearGradient>
    </defs>

    <path d={crownPath(item)} fill={`url(#${uid}-felt)`} stroke={tone(felt, -0.5)} strokeWidth="0.7" strokeLinejoin="round" />

    {/* залом по центру и боковые вмятины */}
    {item.kind !== 'porkpie' && <>
      <path d={`M${150 - cw * 0.3} ${top + 1}Q150 ${top + 11} ${150 + cw * 0.3} ${top + 1}`} fill="none" stroke={tone(felt, -0.4)} strokeWidth="1.5" opacity="0.7" />
      <path d={`M${150 - cw * 0.82} ${top + 11}C${150 - cw * 0.5} ${top + 6} ${150 - cw * 0.3} ${top + 8} ${150 - cw * 0.26} ${top + 14}C${150 - cw * 0.5} ${top + 12} ${150 - cw * 0.66} ${top + 14} ${150 - cw * 0.82} ${top + 11}Z`} fill={tone(felt, -0.34)} opacity="0.75" />
    </>}
    {item.kind === 'porkpie' && <path d={`M${150 - cw * 0.72} ${top + 1.5}L${150 + cw * 0.72} ${top + 1.5}`} fill="none" stroke={tone(felt, -0.38)} strokeWidth="1.6" opacity="0.65" />}
    <path d={`M${150 - cw * 0.74} ${top + 8}C${150 - cw * 0.3} ${top + 1} ${150 + cw * 0.25} ${top + 2} ${150 + cw * 0.6} ${top + 9}C${150 + cw * 0.2} ${top + 5} ${150 - cw * 0.3} ${top + 5} ${150 - cw * 0.74} ${top + 8}Z`} fill={tone(felt, 0.32)} opacity="0.6" />

    {/* лента */}
    <path d={`M${150 - cw - 0.6} ${BRIM_Y - item.bandHeight}C${150 - cw * 0.4} ${BRIM_Y - item.bandHeight + 2.4} ${150 + cw * 0.4} ${BRIM_Y - item.bandHeight + 2.4} ${150 + cw + 0.6} ${BRIM_Y - item.bandHeight}L${150 + cw + 0.6} ${BRIM_Y}L${150 - cw - 0.6} ${BRIM_Y}Z`} fill={band} />
    <path d={`M${150 - cw - 0.6} ${BRIM_Y - item.bandHeight * 0.45}C${150 - cw * 0.4} ${BRIM_Y - item.bandHeight * 0.45 + 2.2} ${150 + cw * 0.4} ${BRIM_Y - item.bandHeight * 0.45 + 2.2} ${150 + cw + 0.6} ${BRIM_Y - item.bandHeight * 0.45}`} fill="none" stroke={tone(band, 0.34)} strokeWidth="0.55" opacity="0.65" />
    <path d={`M${150 + cw * 0.5} ${BRIM_Y - item.bandHeight + 1.4}L${150 + cw * 0.72} ${BRIM_Y - 0.4}`} stroke={tone(band, -0.35)} strokeWidth="1.6" />

    {item.feather && <g>
      <path d={`M${150 + cw * 0.52} ${BRIM_Y - item.bandHeight - 1}C${150 + cw * 0.8} ${top + 9} ${150 + cw * 0.95} ${top + 2} ${150 + cw * 0.86} ${top - 3}`} fill="none" stroke="#b7643f" strokeWidth="1.7" strokeLinecap="round" />
      <path d={`M${150 + cw * 0.64} ${top + 13}L${150 + cw * 1.02} ${top + 9}M${150 + cw * 0.7} ${top + 8}L${150 + cw * 1.04} ${top + 4}`} fill="none" stroke="#5d8f62" strokeWidth="1.1" strokeLinecap="round" />
    </g>}

    {/* передние поля */}
    <path d={`M${150 - rx} ${BRIM_Y}Q150 ${BRIM_Y + ry * (item.kind === 'homburg' ? 1.3 : 1.9)} ${150 + rx} ${BRIM_Y}Q150 ${BRIM_Y + ry * 0.35} ${150 - rx} ${BRIM_Y}Z`}
      fill={`url(#${uid}-brim)`} stroke={tone(felt, -0.52)} strokeWidth="0.7" strokeLinejoin="round" />
    <path d={`M${150 - rx * 0.9} ${BRIM_Y + ry * 0.42}Q150 ${BRIM_Y + ry * 1.55} ${150 + rx * 0.9} ${BRIM_Y + ry * 0.42}`} fill="none" stroke={tone(felt, 0.22)} strokeWidth="0.55" opacity="0.6" />
    {item.kind === 'homburg' && <path d={`M${150 - rx} ${BRIM_Y}Q150 ${BRIM_Y + ry * 1.3} ${150 + rx} ${BRIM_Y}`} fill="none" stroke={tone(felt, 0.3)} strokeWidth="1.3" opacity="0.7" />}
  </g>;
});

