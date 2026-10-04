// Adapted from LINDEN_CUSTOM_WAVE2.md: ONLY 10 selected styles.
import { bundle, mirrorCurl, roll } from './engine';
import type { CurlSpec, PosterDesign, Surface } from './types';

/**
 * Женский лист 1930–1940: 11 причёсок по постеру + 4 укладки под уборы
 * листа + «Баранки» по референсу Überfrau = 16. Каждая укладка имеет СВОЙ
 * внешний контур и СВОЮ линию роста — checks.ts следит за дублями.
 *
 * Система координат: макушка черепа y≈34, линия роста y≈50, виски x≈114/186,
 * уши y≈86, подбородок y≈129. Передний слой рисуется поверх головы, задний —
 * за черепом. Локоны — локальные примитивы, переносятся translate/rotate.
 */

/* Общая гладкая шапочка (перед) с центральным пробором. */
const CAP = 'M114 90C108 70 108 46 121 35C130 27 140 25 150 25C160 25 170 27 179 35C192 46 192 70 186 90L180 88C183 70 180 58 173 53C165 49 157 50 150 51C143 50 135 49 127 53C120 58 117 70 120 88Z';
const CAP_PART = 'M150 25C150 33 150 42 150 51';
const CAP_STRANDS = [
  ...bundle([149, 27, 124, 27, 110, 50, 118, 84], [149, 50, 133, 50, 122, 66, 122, 88], 20),
  ...bundle([151, 27, 176, 27, 190, 50, 182, 84], [151, 50, 167, 50, 178, 66, 178, 88], 20),
];
const CAP_LIGHTS = ['M118 46C128 32 146 29 150 29C132 33 124 42 121 56Z', 'M182 46C172 32 154 29 150 29C168 33 176 42 179 56Z'];

/** Затылочная масса разного объёма: bottom — нижняя кромка. */
function backMass(bottom: number, spread = 0, seed = 0): Surface {
  const l = 108 - spread, r = 192 + spread;
  return {
    d: `M${l} 62C${l - 4} 42 ${l + 10} 28 150 28C${r - 10} 28 ${r + 4} 42 ${r} 62C${r + 2} ${bottom - 30} ${r - 4} ${bottom - 10} ${r - 12} ${bottom}L${l + 12} ${bottom}C${l + 4} ${bottom - 10} ${l - 2} ${bottom - 30} ${l} 62Z`,
    strands: [
      ...bundle([l + 6, 60, l, 90, l + 2, bottom - 20, l + 10, bottom - 2], [150, 56, 142, 90, 138, bottom - 20, 140, bottom - 2], 12 + (seed % 3)),
      ...bundle([r - 6, 60, r, 90, r - 2, bottom - 20, r - 10, bottom - 2], [150, 56, 158, 90, 162, bottom - 20, 160, bottom - 2], 12 + (seed % 3)),
    ],
    highlights: [`M${l + 8} 70C${l + 2} 96 ${l + 4} ${bottom - 24} ${l + 12} ${bottom - 6}L${l + 20} ${bottom - 8}C${l + 12} ${bottom - 24} ${l + 12} 96 ${l + 18} 70Z`],
    shadows: [`M${l} 92C${l - 2} ${bottom - 40} ${l + 6} ${bottom - 14} ${l + 12} ${bottom}L${l + 18} ${bottom - 2}C${l + 8} ${bottom - 16} ${l + 6} ${bottom - 40} ${l + 6} 92Z`],
  };
}

/** Плоский pin-curl у виска: локальный примитив. */
const pin = (x: number, y: number, r: number, h: number, rotation = 0, phase = 0, coils = 1.6): CurlSpec =>
  ({ x, y, r, h, coils, kind: 'pin', rotation, phase, w: r * 0.6 });

/** Висящий локон (ringlet) — конический, с наклоном. */
const ringlet = (x: number, y: number, r: number, h: number, coils: number, tilt = 0, phase = 0): CurlSpec =>
  ({ x, y, r, h, coils, tilt, phase, taper: 0.6, w: r * 0.85 });

/* ═══════════════════════ 11 ПРИЧЁСОК С ЛИСТА ═══════════════════════ */

/** 1. Марсель 1936: тесные ряды волн по всей шапочке. */
const marcel: PosterDesign = {
  id: 'hair-poster-1936-marcel', name: 'Марсель', year: 1936,
  caption: 'Close marcel waves over the whole cap',
  position: 'Лист, ряд 1, портрет 1',
  referenceView: 'На постере анфас.',
  description: 'Тесные марсельские волны рядами от пробора вниз: четыре гребня с каждой стороны, самая густая текстура набора.',
  construction: 'Контур гладкой шапочки. Текстура — четыре ряда pin-curls с Werwolf 1.2, уложенные рядами вдоль висков; каждый ряд смещён на 9 px. Локоны не висят.',
  bbox: [106, 22, 88, 72],
  back: [backMass(112, 0, 1)],
  front: [
    { d: CAP, strands: CAP_STRANDS, highlights: CAP_LIGHTS, part: CAP_PART },
    {
      coils: [0, 1, 2, 3].flatMap((i) => {
        const left = pin(118 + i * 2, 42 + i * 11, 7.5, 10, -18 + i * 6, i * 0.9, 1.2);
        return [left, mirrorCurl(left)];
      }),
    },
  ],
};

const fingerWaves: PosterDesign = {
  id: 'hair-poster-1936-finger-waves', name: 'Пальцевые волны', year: 1936,
  caption: 'Three sculpted finger waves at each temple, open brow',
  position: 'Лист, ряд 1, портрет 2',
  referenceView: 'На постере анфас, прямая трассировка силуэта.',
  description: 'Гладкая шапочка с глубоким пробором; на каждом виске три параллельные S-волны, лоб полностью открыт.',
  construction: 'Отличие от марселя: волн всего три на сторону и они крупнее (радиус 9), между ними видна гладкая масса. Линия роста поднята до 53.',
  bbox: [106, 24, 88, 70],
  back: [backMass(112)],
  front: [
    {
      d: 'M114 90C108 70 108 48 121 37C130 29 140 27 150 27C160 27 170 29 179 37C192 48 192 70 186 90L180 88C183 70 180 60 173 55C165 51 157 53 150 53C143 53 135 51 127 55C120 60 117 70 120 88Z',
      strands: CAP_STRANDS, highlights: CAP_LIGHTS, part: CAP_PART,
    },
    {
      coils: [0, 1, 2].flatMap((i) => {
        const left = pin(117 + i * 1.5, 58 + i * 11, 9, 12, -30 + i * 8, 0.6 + i * 1.1, 1.1);
        return [left, mirrorCurl(left)];
      }),
    },
  ],
};

const shellCurls: PosterDesign = {
  id: 'hair-poster-1937-shell-curls', name: 'Чехолочные завитки', year: 1937,
  caption: 'Flat shell curls at the temples, smooth crown',
  position: 'Лист, ряд 1, портрет 4',
  referenceView: 'На постере полупрофиль, адаптирован в анфас.',
  description: 'Гладкая макушка и лоб; у каждого виска по два плоских завитка-«чехла» и один у уха, закрученные к лицу.',
  construction: 'Три pin-curls на сторону с 1.8 Werwolf (туже, чем у пальцевых волн) и с чередованием направления: верхние закручены к лицу, нижний — от лица.',
  bbox: [104, 24, 92, 74],
  back: [backMass(112)],
  front: [
    { d: CAP, strands: CAP_STRANDS, highlights: CAP_LIGHTS, part: CAP_PART },
    {
      coils: [
        pin(119, 56, 8, 12, -10, 0.2, 1.8), mirrorCurl(pin(119, 56, 8, 12, -10, 0.2, 1.8)),
        pin(116, 72, 7.5, 11, 12, 1.4, 1.8), mirrorCurl(pin(116, 72, 7.5, 11, 12, 1.4, 1.8)),
        pin(113, 88, 6.5, 10, 30, 2.6, 1.7), mirrorCurl(pin(113, 88, 6.5, 10, 30, 2.6, 1.7)),
      ],
    },
  ],
};

const sidePartRoll: PosterDesign = {
  id: 'hair-poster-1937-side-part-roll', name: 'Боковой ролл', year: 1937,
  caption: 'Deep side part with one sculpted roll over the temple',
  position: 'Лист, ряд 1, портрет 5',
  referenceView: 'На постере анфас с лёгким поворотом.',
  description: 'Глубокий пробор слева, над левым виском скульптурный валик, справа пряди гладко уходят по диагонали к уху.',
  construction: 'Асимметрия: ролл (roll 12×8) только слева; пробор смещён к x=128. Справа 22 пряди диагональю, слева всего 6 — под валиком.',
  bbox: [104, 22, 92, 72],
  back: [backMass(112)],
  front: [
    {
      d: 'M114 90C108 70 108 46 121 35C130 27 140 25 150 25C160 25 170 27 179 35C192 46 192 70 186 90L180 88C183 70 180 58 173 53C165 49 157 50 150 51C143 50 135 49 127 53C120 58 117 70 120 88Z',
      strands: [
        ...bundle([128, 28, 118, 34, 112, 50, 118, 84], [128, 50, 126, 54, 122, 66, 122, 88], 6),
        ...bundle([130, 27, 160, 25, 188, 46, 182, 84], [130, 50, 158, 52, 178, 66, 178, 88], 22),
      ],
      highlights: ['M134 32C152 26 172 30 184 46C170 36 152 34 136 40Z'],
      part: 'M128 28C127 36 128 44 129 52',
    },
    roll(124, 46, 12, 8, -22),
  ],
};

const teaWaves: PosterDesign = {
  id: 'hair-poster-1938-tea-waves', name: 'Чайные волны', year: 1938,
  caption: 'Cascade of C-waves down both sides to the neck',
  position: 'Лист, ряд 2, портрет 6',
  referenceView: 'На постере анфас.',
  description: 'Гладкая макушка переходит в каскад из четырёх ступенчатых C-волн с каждой стороны, спускающихся до линии шеи.',
  construction: 'Отличие от пальцевых волн — длина: четыре pin-curls на сторону, шаг 12, последний на y=104 ниже уха. Werwolf 1.0 — это открытые C-дуги, не спирали.',
  bbox: [102, 24, 96, 96],
  back: [backMass(118, 2)],
  front: [
    {
      d: 'M112 94C106 72 108 46 121 35C130 27 140 25 150 25C160 25 170 27 179 35C192 46 194 72 188 94L182 92C185 72 181 58 174 53C166 49 157 50 150 51C143 50 134 49 126 53C119 58 115 72 118 92Z',
      strands: CAP_STRANDS, highlights: CAP_LIGHTS, part: CAP_PART,
    },
    {
      coils: [0, 1, 2, 3].flatMap((i) => {
        const left = pin(115 + i * 0.5, 62 + i * 12, 9.5, 14, -40 + i * 10, 1 + i * 0.8, 1.0);
        return [left, mirrorCurl(left)];
      }),
    },
  ],
};

const teddyBob: PosterDesign = {
  id: 'hair-poster-1938-teddy-bob', name: 'Каре «тедди»', year: 1938,
  caption: 'Full bob with a scalloped, curled-under hem',
  position: 'Лист, ряд 2, портрет 7',
  referenceView: 'На постере анфас.',
  description: 'Объёмное каре до подбородка; нижний край собран в фестоны из подвёрнутых внутрь локонов.',
  construction: 'Масса каре шире черепа (x 100–200). Фестоны — шесть маленьких ringlets на y=112 с Werwolf 1.3, повёрнутых внутрь; они единственные локоны набора, лежащие горизонтальным рядом.',
  bbox: [98, 22, 104, 106],
  back: [backMass(122, 4, 2)],
  front: [
    {
      d: 'M108 92C102 70 104 46 118 34C128 26 140 24 150 24C160 24 172 26 182 34C196 46 198 70 192 92L194 112C186 122 178 120 176 114C178 98 176 78 172 65C166 54 158 58 150 59C142 58 134 54 128 65C124 78 122 98 124 114C122 120 114 122 106 112Z',
      strands: [
        ...bundle([149, 26, 124, 26, 110, 48, 108, 72], [149, 48, 134, 50, 126, 60, 128, 72], 18),
        ...bundle([151, 26, 176, 26, 190, 48, 192, 72], [151, 48, 166, 50, 174, 60, 172, 72], 18),
      ],
      highlights: CAP_LIGHTS,
      part: CAP_PART,
    },
    {
      coils: [0, 1, 2].flatMap((i) => {
        const left = ringlet(112 + i * 4, 104 + i * 3, 6, 12, 1.3, 0.4, i * 1.2);
        return [left, mirrorCurl(left)];
      }),
    },
  ],
};

const twinWaves: PosterDesign = {
  id: 'hair-poster-1938-twin-waves', name: 'Двойная волна', year: 1938,
  caption: 'Two horizontal wave bands across the forehead',
  position: 'Лист, ряд 2, портрет 8',
  referenceView: 'На постере анфас.',
  description: 'Виски гладко приглажены; поперёк лба лежат две широкие горизонтальные волны-полосы, одна над другой.',
  construction: 'Две горизонтальные ленты-роллы (roll 26×5) на y=40 и y=52 с противоположным наклоном; единственная укладка, где рельеф идёт поперёк лба, а не вдоль висков.',
  bbox: [104, 24, 92, 72],
  back: [backMass(112)],
  front: [
    { d: CAP, strands: CAP_STRANDS, highlights: CAP_LIGHTS },
    roll(150, 40, 26, 5, -3),
    roll(150, 52, 24, 4.5, 3),
  ],
};

const pompadour: PosterDesign = {
  id: 'hair-poster-1939-pompadour', name: 'Помпадур', year: 1939,
  caption: 'Tall front pompadour rising above the crown',
  position: 'Лист, ряд 3, портрет 9',
  referenceView: 'На постере полупрофиль, адаптирован в анфас.',
  description: 'Волосы надо лбом подняты высоким куполом выше макушки и уходят назад; бока срезаны низко и гладко.',
  construction: 'Самый высокий контур набора: купол до y=12 при плоских боках. Валик (roll 20×11) сидит на самом лбу и даёт объём; пряди веером идут снизу вверх.',
  bbox: [104, 6, 92, 88],
  back: [backMass(112)],
  front: [
    {
      d: 'M114 90C108 68 108 40 124 24C134 14 146 12 152 12C164 12 178 20 184 36C192 50 192 70 186 90L180 88C183 70 181 58 174 53C166 49 157 50 150 51C143 50 135 49 127 53C120 58 117 70 120 88Z',
      strands: [
        ...bundle([120, 60, 112, 40, 126, 24, 150, 16], [128, 56, 124, 42, 134, 30, 150, 24], 12),
        ...bundle([180, 60, 188, 40, 174, 24, 150, 16], [172, 56, 176, 42, 166, 30, 150, 24], 12),
      ],
      highlights: ['M126 30C138 14 164 14 178 32C164 22 138 22 126 30Z'],
      shadows: ['M124 54Q150 46 176 54Q150 50 124 54Z'],
    },
    roll(150, 26, 20, 11, 0),
  ],
};

const sculptedSleek: PosterDesign = {
  id: 'hair-poster-1940-sculpted-sleek', name: 'Скульптурный глянец', year: 1940,
  caption: 'Lacquered sleek sweep with one large hook-wave',
  position: 'Лист, ряд 3, портрет 12',
  referenceView: 'На постере анфас.',
  description: 'Максимально гладкая лакированная масса без пробора; справа у виска одна крупная волна-крюк, спускающаяся к уху.',
  construction: 'Контур точно по черепу, блик самый широкий в наборе (два длинных пятна). Один крупный pin-curl радиуса 11 с 0.9 Werwolf справа — больше нигде одиночной волны нет.',
  bbox: [106, 24, 88, 70],
  back: [backMass(110)],
  front: [
    {
      d: 'M114 88C108 68 108 46 121 35C130 27 140 25 150 25C160 25 170 27 179 35C192 46 192 68 186 88L180 86C183 68 180 56 173 51C165 47 157 48 150 49C143 48 135 47 127 51C120 56 117 68 120 86Z',
      strands: [
        ...bundle([128, 30, 116, 40, 112, 60, 118, 84], [136, 48, 128, 54, 124, 66, 122, 86], 14),
        ...bundle([132, 28, 160, 26, 186, 44, 182, 84], [136, 48, 158, 50, 176, 62, 178, 86], 18),
      ],
      highlights: ['M120 44C132 28 158 26 176 38C160 30 136 32 124 50Z', 'M128 54C144 46 162 46 174 54C160 50 144 50 128 56Z'],
    },
    { coils: [pin(178, 66, 11, 16, 20, 0.4, 0.9)] },
  ],
};

const dollPomp: PosterDesign = {
  id: 'hair-poster-1938-doll-pomp', name: 'Помпадур Schiaparelli', year: 1938,
  caption: 'Front roll over the brow with smooth lifted sides, made for the doll’s hat',
  position: 'Под кукольную шапочку: лист, ряд 2, портрет 7',
  referenceView: 'На постере анфас; реконструкция под убор.',
  description: 'Высокий валик на лбу и гладко поднятые бока; макушка оставлена низкой, чтобы на неё села кукольная шапочка.',
  construction: 'Отличие от помпадура 1939: купол не поднимается выше макушки (верх 30), объём — только валик roll 22×7 на y=38. Лицо открыто.',
  recommendedHeadwear: 'headgear-poster-1938-dolls-hat',
  bbox: [106, 26, 88, 70],
  back: [backMass(110)],
  front: [
    {
      d: 'M116 88C110 68 110 46 122 36C131 29 141 30 150 30C159 30 169 29 178 36C190 46 190 68 184 88L178 86C181 68 178 56 172 51C165 47 157 48 150 49C143 48 135 47 128 51C122 56 119 68 122 86Z',
      strands: [
        ...bundle([120, 60, 114, 44, 128, 32, 150, 31], [128, 56, 124, 46, 134, 38, 150, 38], 10),
        ...bundle([180, 60, 186, 44, 172, 32, 150, 31], [172, 56, 176, 46, 166, 38, 150, 38], 10),
      ],
      highlights: CAP_LIGHTS,
    },
    roll(150, 38, 22, 7, 0),
  ],
};

export const POSTER_HAIR: PosterDesign[] = [marcel, fingerWaves, shellCurls, sidePartRoll, teaWaves, teddyBob, twinWaves, pompadour, sculptedSleek, dollPomp];
export const POSTER_DESIGNS: Readonly<Record<string, PosterDesign>> = Object.fromEntries(POSTER_HAIR.map(d => [d.id, d]));
