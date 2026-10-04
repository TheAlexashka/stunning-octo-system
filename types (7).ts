// Adapted from LINDEN_CUSTOM_WAVE.md: ONLY 3 selected styles.
import { bundle } from './engine';
import type { CurlSpec, PosterDesign, Surface } from './types';

/**
 * Женский лист 1930–1940: 12 причёсок с постера + 4 укладки под уборы
 * (Schiaparelli, Rose Valois, Suzy ×2) = 16. У каждой СВОЙ контур и СВОЯ
 * линия роста; checks.ts требует уникальные контуры и передний+задний слой.
 *
 * Система координат: макушка черепа y≈33, линия роста y≈50, виски x≈113/187,
 * уши y≈86, подбородок y≈130. Локоны — локальные примитивы движка:
 * `kind: 'pin'` — плоский пришпиленный завиток, иначе висящий конический.
 */

/* ── общие задние массы (разные bottom и густота) ────────────────────── */

function backMass(bottom: number, seed: number, wide = 0): Surface {
  const l = 110 - wide, r = 190 + wide;
  return {
    d: `M${l} 62C${l - 5} 40 ${l + 12} 26 150 26C${r - 12} 26 ${r + 5} 40 ${r} 62C${r + 3} 84 ${r - 2} ${bottom - 14} ${r - 8} ${bottom}Q150 ${bottom + 8} ${l + 8} ${bottom}C${l + 2} ${bottom - 14} ${l - 3} 84 ${l} 62Z`,
    strands: [
      ...bundle([l + 6, 58, l - 2, 84, l + 1, bottom - 20, l + 10, bottom - 2], [150, 40, 146, 80, 148, bottom - 18, 150, bottom - 2], 10 + (seed % 4)),
      ...bundle([r - 6, 58, r + 2, 84, r - 1, bottom - 20, r - 10, bottom - 2], [150, 40, 154, 80, 152, bottom - 18, 150, bottom - 2], 10 + (seed % 4)),
    ],
    highlights: [`M${l + 8} 64C${l + 2} 84 ${l + 4} ${bottom - 18} ${l + 12} ${bottom - 4}L${l + 18} ${bottom - 6}C${l + 10} ${bottom - 20} ${l + 8} 84 ${l + 14} 64Z`],
    shadows: [`M150 40C150 70 150 ${bottom - 20} 150 ${bottom}Q160 ${bottom - 4} 164 ${bottom - 14}C160 80 156 60 156 40Z`],
  };
}

const pin = (x: number, y: number, r: number, rotation = 0, mirrored = false, extra: Partial<CurlSpec> = {}): CurlSpec =>
  ({ x, y, r, h: r * 2, coils: 2.2, w: r * 0.8, kind: 'pin', rotation, mirrored, ...extra });



/* ═══════════════════════ ЛИСТ, РЯД 1 ═══════════════════════ */

/** 1. Марсель 1936: тесные волны по всей шапочке. */
const teddyBob: PosterDesign = {
  id: 'hair-poster-1938-teddy-bob', name: 'Каре «тедди»', year: 1938,
  caption: 'Full bob with a scalloped hemline',
  position: 'Лист, ряд 2, портрет 8',
  description: 'Объёмное каре до подбородка; нижний край собран в ряд подвёрнутых фестонов.',
  construction: 'Масса до y=126 и шесть плоских завитков-фестонов (pin). Игровая адаптация: открытое лицо под прямой чёлкой и связная нижняя кромка, без исходной заливки поверх глаз.',
  referenceView: 'На постере анфас.',
  bbox: [96, 20, 108, 112],
  back: [backMass(122, 8, 3)],
  front: [
    {
      d: 'M103 88C101 50 120 28 150 28C180 28 199 50 197 88C197 108 193 122 188 126L170 125C181 112 185 98 183 84C181 68 174 63 165 63L135 63C126 63 119 68 117 84C115 98 119 112 130 125L112 126C107 122 103 108 103 88Z',
      strands: [...bundle([150, 29, 126, 29, 106, 56, 112, 122], [150, 46, 136, 50, 122, 70, 124, 118], 14), ...bundle([150, 29, 174, 29, 194, 56, 188, 122], [150, 46, 164, 50, 178, 70, 176, 118], 14)],
      highlights: ['M116 52Q132 33 148 35Q132 43 120 59Z'],
      part: 'M150 28L150 47',
    },
    { coils: [116, 123, 130, 170, 177, 184].map((x, i) => pin(x, 118, 5.4, i < 3 ? 100 : -100, i >= 3, { coils: 1.8, h: 10 })) },
  ],
};

const wedgeBob: PosterDesign = {
  id: 'hair-poster-1939-wedge-bob', name: 'Клин-каре', year: 1939,
  caption: 'Asymmetric bob wedging over the right eye',
  position: 'Лист, ряд 3, портрет 14',
  description: 'Асимметричное каре: левая сторона короче и выше, правая длинным клином заходит на глаз.',
  construction: 'Единственная асимметрия каре — правая кромка спускается клином до y=96, левая держится на y=82; пробор смещён влево.',
  referenceView: 'На постере три четверти; адаптирован в анфас.',
  bbox: [100, 22, 100, 84],
  back: [backMass(108, 14, 2)],
  front: [{
    d: 'M103 82C101 48 119 27 150 27C181 27 199 49 197 86L196 96C188 98 176 94 168 86C172 72 168 58 158 52C142 44 124 48 117 58C112 66 111 76 113 82L108 90C104 88 103 85 103 82Z',
    strands: [...bundle([140, 28, 122, 30, 108, 54, 110, 84], [142, 50, 128, 52, 118, 66, 116, 84], 8), ...bundle([142, 28, 172, 28, 196, 60, 194, 96], [144, 50, 164, 52, 176, 74, 172, 88], 20)],
    highlights: ['M118 48Q134 30 156 32Q138 40 126 56Z'],
    part: 'M140 28Q136 40 141 50',
  }],
};

const sculptedSleek: PosterDesign = {
  id: 'hair-poster-1940-sculpted-sleek', name: 'Скульптурный глянец', year: 1940,
  caption: 'Glossy sculpted sweep with one hook wave',
  position: 'Лист, ряд 3, портрет 15',
  description: 'Максимально гладкий глянцевый зачёс с длинным бликом; справа одна крупная волна-крюк опускается к уху.',
  construction: 'Гладкая масса без прядей (только 8 бликовых линий) и одна поверхность-крюк у правого уха с завитком — самая гладкая укладка набора.',
  referenceView: 'На постере анфас.',
  bbox: [100, 22, 100, 84],
  back: [backMass(108, 15, 4)],
  front: [
    {
      d: 'M104 86C102 48 121 27 150 27C179 27 198 48 196 86L186 82C188 54 174 42 150 42C126 42 112 54 114 82Z',
      strands: [...bundle([150, 28, 132, 28, 114, 48, 116, 82], [150, 42, 138, 44, 126, 58, 122, 82], 4), ...bundle([150, 28, 168, 28, 186, 48, 184, 82], [150, 42, 162, 44, 174, 58, 178, 82], 4)],
      highlights: ['M117 50Q133 31 149 33Q133 41 121 57Z', 'M138 30Q160 28 178 44Q160 34 140 34Z'],
      part: 'M150 27Q148 38 152 48',
    },
    {
      d: 'M176 46C188 54 194 66 190 80C186 88 178 88 176 80C178 70 176 60 172 52C172 48 174 46 176 46Z',
      strands: bundle([177, 48, 190, 60, 190, 78, 180, 86], [173, 52, 180, 62, 182, 76, 178, 84], 6),
      highlights: ['M180 50C190 58 192 70 188 80L184 78C188 70 186 60 178 52Z'],
    },
    { coils: [pin(186, 80, 6, 0, true, { coils: 2.2, h: 12 })] },
  ],
};

export const POSTER_HAIR: PosterDesign[] = [teddyBob, wedgeBob, sculptedSleek];
export const POSTER_DESIGNS: Readonly<Record<string, PosterDesign>> = Object.fromEntries(POSTER_HAIR.map(d => [d.id, d]));
