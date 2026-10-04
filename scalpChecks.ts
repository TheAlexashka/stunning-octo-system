import { braid, bundle, mirrorCurl, roll, seedNoise } from './engine';
import type { CurlSpec, PosterDesign, Surface } from './types';

const pin = (x: number, y: number, r: number, phase = 0, rotation = 0): CurlSpec => ({
  kind: 'pin', x, y, r, h: r * 1.7, coils: 1.15, w: r * 0.55, phase, rotation,
});
const pair = (spec: CurlSpec): CurlSpec[] => [spec, mirrorCurl(spec)];
const curls = (coils: CurlSpec[]): Surface => ({ d: '', coils });

function cap(part = 143, top = 27, hairline = 50): Surface {
  return {
    d: `M111 88C103 66 108 ${top + 14} 128 ${top + 5}C145 ${top - 5} 170 ${top} 184 ${top + 13}C197 ${top + 28} 194 69 189 88L181 85C184 69 177 ${hairline + 5} 165 ${hairline}C151 ${hairline - 6} 144 ${hairline - 2} 133 ${hairline + 4}C123 ${hairline + 11} 116 71 119 85Z`,
    strands: [
      ...bundle([part, top, 121, top - 3, 102, 48, 112, 83], [part + 4, hairline - 2, 134, hairline - 4, 119, 66, 120, 85], 22),
      ...bundle([part + 2, top, 177, top - 3, 197, 46, 188, 83], [part + 5, hairline, 168, hairline - 2, 181, 68, 180, 85], 26),
    ],
    highlights: [`M114 47Q131 ${top + 1} ${part} ${top + 3}Q131 ${top + 12} 118 56Z`, `M186 47Q173 ${top + 2} ${part + 3} ${top + 3}Q171 ${top + 13} 182 57Z`],
    part: `M${part} ${top}Q${part - 2} ${top + 12} ${part + 4} ${hairline}`,
  };
}

function backMass(bottom = 127, width = 46): Surface {
  return {
    d: `M${150 - width} 62C${148 - width} 39 125 25 150 25C175 25 ${152 + width} 39 ${150 + width} 62C${157 + width} 86 ${153 + width} ${bottom - 8} 181 ${bottom}Q150 ${bottom + 12} 119 ${bottom}C${147 - width} ${bottom - 8} ${143 - width} 86 ${150 - width} 62Z`,
    strands: [
      ...bundle([150 - width, 62, 97, 89, 106, bottom - 8, 126, bottom], [147, 50, 139, 85, 139, bottom - 10, 146, bottom + 2], 18),
      ...bundle([150 + width, 62, 203, 89, 194, bottom - 8, 174, bottom], [153, 50, 161, 85, 161, bottom - 10, 154, bottom + 2], 18),
    ],
    highlights: [`M108 85Q105 ${bottom - 12} 127 ${bottom - 2}Q110 ${bottom} 107 ${bottom - 10}Z`],
  };
}

function pageboySides(under = false): Surface[] {
  const left: Surface = {
    d: under
      ? 'M113 51C100 73 109 92 104 113C101 127 109 141 124 140Q131 141 134 133C119 132 118 123 121 114C126 99 116 85 121 68Z'
      : 'M113 50C102 67 107 91 103 109C99 124 110 135 128 131C116 124 120 114 120 104C121 92 116 76 123 66Z',
    strands: bundle([111, 54, 99, 91, 104, 128, 127, under ? 138 : 130], [120, 62, 111, 90, 115, 122, 133, under ? 133 : 126], 16),
    highlights: ['M110 75Q103 107 115 123Q108 107 115 83Z'],
    shadows: ['M109 128Q120 139 132 133Q119 132 114 125Z'],
  };
  return [left, { ...left, transform: 'translate(300 0) scale(-1 1)' }];
}

const sidePartRoll: PosterDesign = {
  id: 'hair-poster-1930-nape-roll', name: 'Боковой пробор и валик', year: 1930,
  caption: 'Side part with roll round back', position: 'Верхний левый рисунок',
  description: 'Мягкие боковые волны уходят в непрерывный валик у основания затылка.',
  construction: 'Гладкая макушка, асимметричный пробор, широкий поперечный валик. Не спиральные пружины.',
  referenceView: 'На постере вид сзади в три четверти. Передняя часть адаптирована.',
  bbox: [94, 16, 112, 125],
  back: [backMass(114, 43), roll(150, 115, 42, 14)],
  front: [cap(138, 28), { d: 'M109 61Q122 54 123 66Q114 68 118 77Q108 75 109 61Z', strands: ['M110 65Q119 60 120 66', 'M110 69Q115 76 120 74'], highlights: ['M110 63Q117 59 122 64L120 66Q116 63 110 67Z'] }, curls(pair(pin(113, 82, 4.2, 0.5)))],
};

const antoine: PosterDesign = {
  id: 'hair-poster-1933-antoine', name: 'Короткая укладка «Антуан»', year: 1933,
  caption: 'Short hair curled in back, Antoine', position: 'Верхний средний рисунок',
  description: 'Приглаженные пальцевые волны и плотные мелкие завитки на затылке.',
  construction: 'Короткий объём за ушами. Плоские pin-curls собраны в два ряда, лицо остаётся открытым.',
  referenceView: 'На постере профиль. Здесь фронтальная адаптация.',
  bbox: [94, 18, 112, 124],
  back: [backMass(108, 40), curls(Array.from({ length: 12 }, (_, i) => pin(111 + (i % 6) * 15.5, 98 + Math.floor(i / 6) * 13, 6.3, i * 0.67)))],
  front: [cap(140, 29), curls([...pair(pin(112, 76, 5.4, 0.7)), ...pair(pin(110, 88, 5.3, 1.1)), ...pair(pin(115, 100, 4.8, 1.7))])],
  recommendedHeadwear: 'headgear-poster-1938-snood-cord',
};

const bangsChignon: PosterDesign = {
  id: 'hair-poster-1935-bangs-chignon', name: 'Кудрявая чёлка и шиньон', year: 1935,
  caption: 'Curled bangs and chignon', position: 'Верхний правый рисунок',
  description: 'Короткая чёлка из колечек над лбом, гладкие виски и собранный шиньон.',
  construction: 'Компактные плоские завитки, а не длинные локоны. Отдельный задний шиньон.',
  referenceView: 'На постере три четверти. Здесь фронтальная адаптация.',
  bbox: [93, 7, 114, 135],
  back: [backMass(104, 39), roll(150, 113, 27, 16)],
  front: [cap(147, 30, 55), curls([
    pin(119, 41, 7.3, 1), pin(130, 32, 8.1, 2), pin(144, 28, 7.1, 0.4), pin(158, 28, 7.9, 2.8), pin(173, 34, 7.6, 1.7), pin(182, 43, 6.6, 0.6),
    pin(128, 49, 5.2, 1.5), pin(141, 47, 5.7, 2.3), pin(153, 47, 5.7, 0.4), pin(166, 48, 5.2, 1.8),
    ...pair(pin(113, 83, 4.2, 0.5)),
  ])],
};

const pompadourBob: PosterDesign = {
  id: 'hair-poster-1937-pompadour-bob', name: 'Паж с валиком-помпадуром', year: 1937,
  caption: 'Page-boy bob with rolled pompadour', position: 'Слева, над «Инфантой»',
  description: 'Боб до подбородка с гладкими боками и крупным поднятым валиком надо лбом.',
  construction: 'Крупный горизонтальный ролл с внутренней тенью. Боковые пряди длинные и плавные.',
  referenceView: 'На постере три четверти. Сохранены длина боба и асимметрия валика.',
  bbox: [88, 0, 124, 148],
  back: [backMass(126, 47)],
  front: [cap(151, 29), ...pageboySides(), roll(145, 32, 32, 14, 12), roll(171, 43, 12, 8, 34)],
};

const unbrushed: PosterDesign = {
  id: 'hair-poster-1938-unbrushed', name: 'Нерасчёсанные кудри', year: 1938,
  caption: 'Short hair dressed in un-brushed curls on top', position: 'Слева, под первым рядом',
  description: 'Короткие приглаженные бока и живые, неравномерные кудри на макушке.',
  construction: 'Два нерегулярных ряда pin-curls; фиксированный seed сохраняет укладку между кадрами.',
  referenceView: 'На постере профиль. Длина на висках сохранена короткой.',
  bbox: [89, 1, 122, 129],
  back: [backMass(99, 39)],
  front: [cap(142, 29), curls(Array.from({ length: 13 }, (_, i) => {
    const row = i < 7 ? 0 : 1;
    const index = row ? i - 7 : i;
    return pin(113 + index * 12 + row * 7, 27 + row * 13 + Math.abs(index - 3) * 2.7, 6 + seedNoise(i + 30) * 2.5, seedNoise(i + 92) * Math.PI * 2);
  }))],
};

const featherLeft: Surface = {
  d: 'M112 87C102 72 104 55 116 43C128 33 135 29 133 17C144 23 146 32 141 43C135 52 121 59 120 72L120 87Z',
  strands: bundle([133, 18, 151, 44, 96, 41, 113, 83], [133, 28, 138, 46, 113, 54, 120, 85], 21),
  highlights: ['M112 50C122 40 140 36 136 24C146 43 119 47 113 60Z'],
  shadows: ['M108 67Q104 54 116 46Q108 59 115 69Z'],
};
const feather: PosterDesign = {
  id: 'hair-poster-1938-feather', name: 'Укладка «Перо»', year: 1938,
  caption: 'Feather-shaped coiffure, short and rolled', position: 'В центре, под первым рядом',
  description: 'Две встречные волны поднимаются над открытым лбом, как перья.',
  construction: 'Два скульптурных S-образных гребня с высоким центральным разрывом. Висящих спиралей нет.',
  referenceView: 'На постере анфас. Силуэт ближе всего к исходному ракурсу.',
  bbox: [92, 5, 116, 127],
  back: [backMass(104, 40), roll(150, 110, 29, 10)],
  front: [cap(150, 32, 53), featherLeft, { ...featherLeft, transform: 'translate(300 0) scale(-1 1)' }],
};

const infantaLeft: CurlSpec[] = Array.from({ length: 5 }, (_, i) => ({
  kind: 'ringlet', x: 102 + i * 3.5, y: 47 + i * 7,
  r: 5.8 + seedNoise(i + 24) * 1.4, h: 66 - i * 5, coils: 3.2 + seedNoise(i + 81) * 0.65,
  w: 5.5, phase: i * 0.9, tilt: -0.18, taper: 0.38,
}));
const infanta: PosterDesign = {
  id: 'hair-poster-1939-infanta', name: '«Инфанта»', year: 1939,
  caption: 'Infante coiffure, satin loops, Balenciaga', position: 'Центральный рисунок с длинными петлями',
  description: 'Короткая объёмная основа обрамляет лицо удлинёнными локонами и атласными петлями.',
  construction: 'Ряды конических лент по бокам. Атласные петли вынесены в отдельный предмет, их цвет независим от волос.',
  referenceView: 'На постере три четверти. Петли интерпретированы по подписи, не как всецело натуральные волосы.',
  bbox: [82, 8, 136, 150],
  back: [backMass(123, 47), curls([...infantaLeft, ...infantaLeft.map((s) => mirrorCurl(s))])],
  front: [cap(147, 25), curls([
    ...pair({ kind: 'ringlet', x: 113, y: 62, r: 5.8, h: 58, coils: 3.1, w: 4.9, phase: 0.7, taper: 0.4, tilt: 0.05 }),
    pin(121, 38, 6.4, 1.2), pin(137, 29, 6, 1.7), pin(160, 30, 6, 0.2), pin(177, 40, 6.1, 0.5),
  ])],
  recommendedHeadwear: 'headgear-poster-1939-satin-loops',
};

const backParted: PosterDesign = {
  id: 'hair-poster-1939-parted-roll', name: 'Пробор и затылочные валики', year: 1939,
  caption: 'Short hair parted and rolled', position: 'Справа от «Инфанты», вид со спины',
  description: 'Крупные гладкие секции от пробора переходят в широкие валики на затылке.',
  construction: 'Задний слой содержит две рельефные продольные массы и нижний валик. Передняя часть сдержанная.',
  referenceView: 'Основная информация на постере со спины; фронтальная линия волос реконструирована.',
  bbox: [90, 5, 120, 137],
  back: [backMass(111, 47), roll(128, 67, 36, 16, -64), roll(174, 63, 37, 18, 62), roll(152, 113, 34, 12)],
  front: [cap(140, 26), roll(168, 33, 20, 10, 16), curls(pair(pin(112, 89, 4.4, 0.2)))],
};

const shortRolled: PosterDesign = {
  id: 'hair-poster-1939-short-rolled', name: 'Короткая укладка с пробором', year: 1939,
  caption: 'Short coiffure parted and rolled', position: 'Нижний левый рисунок',
  description: 'Высокая боковая волна и коротко подобранные концы за ушами.',
  construction: 'Асимметричный помпадур меньшего размера, короткий затылок и два компактных височных колечка.',
  referenceView: 'На постере боковой ракурс. Фронтальная асимметрия интерпретирована.',
  bbox: [89, 1, 122, 130],
  back: [backMass(101, 40), roll(150, 105, 29, 9)],
  front: [cap(137, 26), roll(137, 31, 24, 13, -23), roll(172, 43, 16, 10, 40), curls([...pair(pin(113, 88, 4.5, 0.8)), pin(119, 50, 5.5, 0.2)])],
};

const plaitedPompadour: PosterDesign = {
  id: 'hair-poster-1939-pompadour-plaits', name: 'Помпадур и косички', year: 1939,
  caption: 'Short coiffure with pompadour and plaits', position: 'Нижний центральный рисунок',
  description: 'Высокая откинутая назад волна, открытый лоб и небольшие косички на затылке.',
  construction: 'Широкая поднятая масса с направленными прядями. Косички состоят из перекрывающихся звеньев, не из колец.',
  referenceView: 'На постере три четверти. Косички находятся за шеей, не на лбу.',
  bbox: [92, 0, 116, 148],
  back: [backMass(104, 40), ...braid(117, 92, 37, 5), ...braid(183, 92, 37, 5), roll(150, 115, 25, 8)],
  front: [{
    d: 'M112 86C101 65 105 41 118 29C115 20 129 9 146 15C162 7 179 17 184 29C198 44 196 68 187 86L180 83C184 66 174 55 162 52Q150 48 138 53C124 59 116 70 120 84Z',
    strands: [
      ...bundle([121, 32, 112, 8, 135, 7, 149, 19], [127, 57, 121, 40, 135, 27, 152, 25], 23),
      ...bundle([149, 18, 176, 4, 196, 31, 189, 66], [144, 53, 176, 60, 186, 58, 181, 84], 30),
      ...bundle([114, 42, 104, 57, 111, 76, 116, 85], [128, 54, 117, 63, 116, 76, 120, 84], 9),
    ],
    highlights: ['M119 32C114 17 135 10 147 19C132 17 124 29 127 38Z', 'M154 19Q179 14 187 41Q174 24 150 28Z'],
    shadows: ['M129 55Q150 42 173 58L168 59Q149 51 136 57Z'],
  }],
};

const underBob: PosterDesign = {
  id: 'hair-poster-1939-under-bob', name: 'Паж с подвёрнутыми концами', year: 1939,
  caption: 'Page-boy bob, ends rolled under', position: 'Нижний правый рисунок',
  description: 'Мягкий боб до подбородка: гладкая длина, округлые концы внутрь и волна у лба.',
  construction: 'Сохранена ровная длина; внутрь подворачиваются только концы. По бокам нет висящих спиралей.',
  referenceView: 'На постере три четверти. Края адаптированы симметрично для анфаса.',
  bbox: [86, 10, 128, 145],
  back: [backMass(134, 48), roll(125, 132, 16, 8, 9), roll(175, 132, 16, 8, -9)],
  front: [cap(147, 26), ...pageboySides(true), roll(143, 39, 21, 9, -7), curls([pin(171, 42, 4.3, 0.9)])],
};

/* ── 4 новые укладки с листа головных уборов 1930–1940 ── */

/** 1. Помпадур Schiaparelli: каскад завитков-валиков на лбу с гладкими поднятыми боками */
const dollPomp: PosterDesign = {
  id: 'hair-poster-1938-doll-pomp', name: 'Помпадур Schiaparelli', year: 1938,
  caption: 'Sculptured front pompadour puff with sleek upswept sides (Schiaparelli model)',
  position: 'Второй ряд слева, под шляпку Schiaparelli',
  description: 'Высокая скульптурная укладка: над лбом возвышается пышный валик-помпадур, виски зачёсаны гладко вверх под ленту.',
  construction: 'Крупный двойной ролл надо лбом (y=22..38), боковые пряди идут вертикально вверх. Идеально под «Doll’s Hat».',
  referenceView: 'На листе анфас под шляпкой Schiaparelli.',
  bbox: [88, -2, 124, 136],
  back: [backMass(108, 42), roll(150, 112, 30, 12)],
  front: [
    cap(148, 28, 54),
    roll(144, 28, 24, 15, -12),
    roll(162, 36, 16, 11, 24),
    curls([
      pin(132, 44, 7.5, 1.2),
      pin(148, 46, 6.8, 2.4),
      pin(160, 48, 6.2, 0.5),
    ]),
  ],
  recommendedHeadwear: 'headgear-poster-1938-dolls-hat',
};

/** 2. Локоны-бочонки под папаху Rose Valois */
const cossackCurls: PosterDesign = {
  id: 'hair-poster-1939-cossack-curls', name: 'Локоны на затылке под папаху', year: 1939,
  caption: 'Smooth crown with cascading barrel ringlets at the neck (Rose Valois model)',
  position: 'Второй ряд справа, под папаху Rose Valois',
  description: 'Гладкая волна на макушке, переходящая в каскад плотных круглых локонов-бочонков вокруг шеи и плеч.',
  construction: 'Гладкая основа с длинными прядями назад, на затылке и по бокам шеи — 6 крупных скульптурных локонов.',
  referenceView: 'На листе анфас под казачьей шапкой.',
  bbox: [84, 8, 132, 154],
  back: [
    backMass(132, 48),
    curls([
      ...pair({ kind: 'ringlet', x: 114, y: 104, r: 8.5, h: 42, coils: 2.8, w: 7.8, phase: 0.8, taper: 0.4 }),
      ...pair({ kind: 'ringlet', x: 128, y: 112, r: 8, h: 36, coils: 2.4, w: 7.2, phase: 2.1, taper: 0.45 }),
    ]),
  ],
  front: [
    cap(146, 28, 52),
    curls([
      ...pair({ kind: 'ringlet', x: 112, y: 92, r: 8, h: 38, coils: 2.5, w: 7.5, phase: 1.4, taper: 0.42 }),
      ...pair(pin(116, 78, 5.2, 0.6)),
    ]),
  ],
  recommendedHeadwear: 'headgear-poster-1939-cossack',
};

/** 3. Волна у уха под плюшевый ток Suzy */
const quillWaves: PosterDesign = {
  id: 'hair-poster-1939-quill-waves', name: 'Скульптурная ушная волна', year: 1939,
  caption: 'Deep finger waves over the ears with low sculpted rolls (Suzy model)',
  position: 'Третий ряд слева, под плюшевый ток Suzy',
  description: 'Глубокие рельефные волны Марсель на висках, аккуратно огибающие уши и переходящие в плотные валики.',
  construction: 'S-образные волны с завитками у мочек ушей и низкий плотный затылочный валик.',
  referenceView: 'На листе три четверти под током Suzy.',
  bbox: [90, 10, 120, 138],
  back: [backMass(112, 44), roll(150, 114, 38, 14)],
  front: [
    cap(140, 27, 51),
    {
      d: 'M111 84C106 66 109 46 124 35C139 25 163 26 178 36C191 46 193 64 188 82L182 80C184 64 176 53 165 49C154 45 146 47 135 51C124 56 117 64 119 78Z',
      strands: [
        ...bundle([156, 26, 134, 22, 108, 38, 112, 66], [162, 46, 140, 42, 122, 62, 118, 80], 22),
        ...bundle([157, 26, 182, 23, 196, 46, 189, 70], [163, 47, 175, 47, 184, 66, 181, 80], 18),
      ],
      highlights: ['M113 46Q132 30 156 32Q138 38 118 54Z'],
      part: 'M156 26Q154 36 162 46',
    },
    curls([
      ...pair({ kind: 'ringlet', x: 110, y: 82, r: 7.2, h: 28, coils: 2.2, w: 6.8, phase: 0.9, taper: 0.5 }),
      ...pair(pin(114, 72, 5.5, 1.8)),
    ]),
  ],
  recommendedHeadwear: 'headgear-poster-1939-plush-toque',
};

/**
 * Коса, уложенная в вертикальную петлю-баранку (в анфас):
 * Коса спускается сверху вниз вдоль виска и щеки, а снизу мягко
 * огибает мочку уха и поднимается вверх параллельной петлёй.
 * Звенья развёрнуты плетением строго на зрителя.
 */
function braidLoop(points: [number, number][], width: number, count: number): Surface[] {
  // Интерполируем точки вдоль ломаной
  const sampled: { pt: [number, number]; angle: number }[] = [];
  
  // Вычисляем общую длину траектории
  let totalLength = 0;
  const dists: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    const dx = points[i][0] - points[i - 1][0];
    const dy = points[i][1] - points[i - 1][1];
    totalLength += Math.hypot(dx, dy);
    dists.push(totalLength);
  }

  for (let i = 0; i < count; i++) {
    const targetDist = (i / (count - 1)) * totalLength;
    // Находим сегмент
    let seg = 1;
    while (seg < dists.length - 1 && dists[seg] < targetDist) seg++;
    const segLen = dists[seg] - dists[seg - 1] || 1;
    const t = (targetDist - dists[seg - 1]) / segLen;
    const p0 = points[seg - 1];
    const p1 = points[seg];
    const x = p0[0] + (p1[0] - p0[0]) * t;
    const y = p0[1] + (p1[1] - p0[1]) * t;
    const angle = (Math.atan2(p1[1] - p0[1], p1[0] - p0[0]) * 180) / Math.PI;
    sampled.push({ pt: [x, y], angle });
  }

  return sampled.map(({ pt, angle }) => ({
    transform: `translate(${pt[0].toFixed(1)} ${pt[1].toFixed(1)}) rotate(${(angle - 90).toFixed(1)})`,
    d: `M0 -3.5C${-width * 1.7} -7.5 ${-width * 1.4} 3.5 0 8C${width * 1.4} 3.5 ${width * 1.7} -7.5 0 -3.5Z`,
    strands: [
      `M${-width} -2.5Q${-width * 0.6} 2.5 2 6`,
      `M${width} -2.5Q${width * 0.6} 2.5 -2 6`,
      `M0 -3L0 7`,
    ],
    highlights: [`M${-width} -1.5Q${-width * 0.7} 2.5 0 5L-1 7Q${-width * 1.4} 2.5 ${-width} -1.5Z`],
    shadows: [`M${-width * 0.45} 5Q0 7.5 ${width * 0.45} 5L${width * 0.25} 7.8Q0 8.6 ${-width * 0.25} 7.8Z`],
  }));
}

// Траектории вертикальных петель (спуск вниз и подворот снизу вверх):
const LEFT_LOOP_OUTER: [number, number][] = [
  [112, 54], [104, 66], [98, 82], [96, 100], [98, 116], [105, 128], [116, 131], [124, 122], [123, 104], [118, 88]
];
const RIGHT_LOOP_OUTER: [number, number][] = [
  [188, 54], [196, 66], [202, 82], [204, 100], [202, 116], [195, 128], [184, 131], [176, 122], [177, 104], [182, 88]
];

/** «Баранки»: гладкий пробор посередине и две вертикальные косы-петли по бокам */
const braidedCoils: PosterDesign = {
  id: 'hair-poster-1938-braided-coils', name: '«Баранки»: вертикальные косы-петли', year: 1938,
  caption: 'Centre-parted sleek hair with large vertical looping braids over the ears',
  position: 'По референсу пользователя (Überfrau / Gretchenfrisur)',
  description: 'Волосы гладко зачёсаны назад от прямого пробора посередине, а по бокам спускаются и подворачиваются вверх две массивные косы-петли.',
  construction: 'Гладкая центральная шапочка и два вертикальных U-образных рукава braidLoop (по 24 звена каждый, ширина 6.5). Косы видны спереди во всю ширину плетения, спускаются вдоль щёк и огибают уши снизу.',
  referenceView: 'Анфас, как на референсе: косы идут вертикально по бокам головы.',
  bbox: [72, 14, 156, 124],
  back: [
    backMass(112, 42),
    // Теневые подложки под косами
    {
      d: 'M94 74C92 98 94 122 106 132C118 136 128 126 126 102C124 84 120 70 114 62Z',
      shadows: ['M98 84Q96 114 108 126Q120 128 122 108Z']
    },
    {
      d: 'M206 74C208 98 206 122 194 132C182 136 172 126 174 102C176 84 180 70 186 62Z',
      shadows: ['M202 84Q204 114 192 126Q180 128 178 108Z']
    }
  ],
  front: [
    {
      d: 'M112 84C107 62 112 38 130 29C143 22 157 22 170 29C188 38 193 62 188 84L181 82C184 62 179 50 166 45C156 41 144 41 134 45C121 50 116 62 119 82Z',
      strands: [
        ...bundle([150, 24, 132, 26, 116, 46, 113, 78], [150, 44, 138, 46, 122, 60, 120, 82], 20),
        ...bundle([150, 24, 168, 26, 184, 46, 187, 78], [150, 44, 162, 46, 178, 60, 180, 82], 20),
      ],
      highlights: ['M116 48Q132 28 150 27Q134 36 121 56Z', 'M184 48Q168 28 150 27Q166 36 179 56Z'],
      shadows: ['M134 44Q150 39 166 44L164 47Q150 43 136 47Z'],
      part: 'M150 24L150 46',
    },
    ...braidLoop(LEFT_LOOP_OUTER, 6.5, 24),
    ...braidLoop(RIGHT_LOOP_OUTER, 6.5, 24),
  ],
  recommendedHeadwear: 'headgear-poster-acc-aviator-goggles',
};

/** 4. Двойной помпадур-ролл под бархатный снуд Suzy */
const snoodRolls: PosterDesign = {
  id: 'hair-poster-1939-snood-rolls', name: 'Двойной ролл под снуд', year: 1939,
  caption: 'Double front victory rolls with open forehead for snood hood (Suzy snood model)',
  position: 'Низ по центру, под красный бархатный снуд',
  description: 'Два симметричных приподнятых ролла по бокам от открытого лба, специально уложенные под бант и снуд.',
  construction: 'Два выпуклых ролла y=24..42 слева и справа, открытый центр лба. Волосы сзади подобраны.',
  referenceView: 'На листе анфас под бархатным снудом Suzy.',
  bbox: [88, 4, 124, 142],
  back: [backMass(126, 46)],
  front: [
    cap(150, 32, 54),
    roll(132, 34, 20, 13, -20),
    roll(168, 34, 20, 13, 20),
    curls([
      ...pair(pin(124, 46, 6.2, 0.4)),
      ...pair(pin(176, 46, 6.2, 2.7)),
    ]),
  ],
  recommendedHeadwear: 'headgear-poster-1939-velvet-snood',
};

export const POSTER_HAIR: PosterDesign[] = [
  sidePartRoll, antoine, bangsChignon, pompadourBob, unbrushed, feather,
  infanta, backParted, shortRolled, plaitedPompadour, underBob,
  dollPomp, cossackCurls, quillWaves, snoodRolls, braidedCoils,
];

export const POSTER_DESIGNS: Readonly<Record<string, PosterDesign>> = Object.fromEntries(POSTER_HAIR.map((design) => [design.id, design]));

export function hasPosterCurls(id: string): boolean {
  const design = POSTER_DESIGNS[id];
  return !!design && [...design.front, ...design.back].some((surface) => !!surface.coils?.length);
}
