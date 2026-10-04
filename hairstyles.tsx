import { useId } from 'react';
import type { HairPaint } from './hairstyles';
import { HairSurface as LindenHairSurface } from '../features/lindenWomen/PosterHair';
import { bundle } from '../features/lindenWomen/engine';
import { tone, type Curve, type Surface } from '../features/lindenWomen/types';

// User's numbers BEFORE the five removals: 06, 07, 08, 13, 14.
// Only the material/texture changes; all front/back paths retain their shapes.
export const REBUILT_FEMALE_HAIRSTYLES = [
  'rolledFringe', 'napeChignon', 'crownBun', 'halfUp', 'sideSweep',
] as const;
export type RebuiltFemaleHairStyle = (typeof REBUILT_FEMALE_HAIRSTYLES)[number];
export function isRebuiltFemaleHairStyle(style: string): style is RebuiltFemaleHairStyle {
  return (REBUILT_FEMALE_HAIRSTYLES as readonly string[]).includes(style);
}

type Cut = { back: string; front: string; backStrands: string[]; strands: string[] };

const ROLL_TOP = 'M44 97 C38 74 44 46 65 32 C83 20 111 20 131 30 C152 43 162 69 156 97';
const PULLED_TOP = 'M44 98 C38 72 45 44 69 31 C87 20 110 20 129 29 C151 40 162 66 156 98';
const PULLED_INNER = ' L150 112 C147 99 150 89 140 77 C129 64 115 61 100 60 C85 61 71 64 60 77 C50 89 53 99 50 112 Z';

const HALF_TOP = 'M38 94 C31 69 43 39 67 28 C86 17 111 19 128 28 C150 36 166 65 160 94';
const HALF_RIGHT = ' C157 114 166 130 162 145 C158 161 167 179 154 188 Q142 193 136 181';
const HALF_LEFT = ' C44 195 32 183 38 168 C30 153 36 139 33 127 C29 113 35 102 38 94 Z';

const SWEEP_TOP = 'M39 91 C32 67 46 34 73 26 C102 15 132 21 149 40 C163 57 166 80 158 100';

const CUTS: Record<RebuiltFemaleHairStyle, Cut> = {
  rolledFringe: {
    back: `${ROLL_TOP} L150 126 Q100 149 50 126 Z`,
    front: `${ROLL_TOP} L150 113 C149 96 145 85 134 77 C126 72 120 76 109 77 C94 80 79 78 67 74 C57 81 52 96 50 113 Z`,
    backStrands: ['M44 84 Q40 104 51 125', 'M156 84 Q160 104 149 125'],
    strands: [
      'M49 78 C54 48 76 29 95 27', 'M60 68 Q81 35 104 29', 'M151 78 C146 49 127 30 110 27',
      'M64 62 C77 44 124 44 137 61', 'M64 68 C80 83 119 83 136 68',
      'M69 61 C81 50 119 50 131 61', 'M73 65 Q100 76 127 65',
      'M54 87 Q48 101 51 109', 'M146 87 Q152 101 149 109',
    ],
  },
  napeChignon: {
    back: `${PULLED_TOP} C153 114 151 128 153 135 C176 142 179 163 164 177 C150 191 128 188 112 176 L63 174 C43 158 36 124 44 98 Z`,
    front: `${PULLED_TOP}${PULLED_INNER}`,
    backStrands: [
      'M151 139 C165 141 177 157 160 172 Q145 187 123 175',
      'M150 145 C171 156 157 178 137 177 Q123 173 129 161 Q136 151 147 157',
      'M151 151 Q162 161 151 169 Q142 174 136 168', 'M45 111 Q43 145 61 163',
    ],
    strands: [
      'M49 88 C53 66 70 39 88 29', 'M58 78 C63 57 79 40 97 27',
      'M72 64 Q85 45 101 31', 'M151 88 C147 66 130 39 112 29',
      'M142 78 C137 57 121 40 103 27', 'M128 64 Q115 45 102 31',
      'M53 95 Q47 105 51 112', 'M147 95 Q153 105 149 112',
    ],
  },
  crownBun: {
    back: 'M44 102 C36 69 49 42 77 30 C70 20 76 7 94 5 C113 1 132 13 126 30 C151 41 163 69 156 102 L149 131 Q100 148 51 131 Z',
    front: 'M44 98 C39 65 59 36 82 29 C92 26 108 26 118 29 C141 36 161 65 156 98' + PULLED_INNER,
    backStrands: [
      'M80 18 C88 8 114 8 123 19', 'M79 24 C92 14 112 14 125 25',
      'M84 30 Q102 20 121 30', 'M89 10 Q96 16 94 26',
      'M44 93 Q39 114 53 130', 'M156 93 Q161 114 147 130',
    ],
    strands: [
      'M49 91 C54 64 70 44 87 32', 'M60 79 Q76 48 98 30',
      'M74 67 Q88 46 100 32', 'M151 91 C146 64 130 44 113 32',
      'M140 79 Q124 48 102 30', 'M126 67 Q112 46 101 32',
    ],
  },
  halfUp: {
    back: `${HALF_TOP} C157 115 166 132 162 149 C159 167 170 184 160 198 Q100 216 40 198 C30 184 41 167 38 149 C34 132 43 115 38 94 Z`,
    front: `${HALF_TOP}${HALF_RIGHT} C145 158 143 136 147 115 C150 96 141 80 127 71 C116 65 108 58 98 59 C79 61 63 75 56 91 C51 105 56 119 51 134 C46 152 54 171 57 184 Q48 192 45 188${HALF_LEFT}`,
    backStrands: [
      'M38 107 C29 129 45 145 38 163 S44 190 45 197',
      'M162 107 C171 129 155 145 162 163 S156 190 155 197',
      'M47 131 Q54 149 47 169 Q52 186 52 199', 'M153 131 Q146 149 153 169 Q148 186 148 199',
      'M153 85 Q166 100 152 114 Q144 107 149 97',
    ],
    strands: [
      'M90 24 Q84 34 88 47', 'M45 78 Q58 47 87 34 Q110 28 134 42',
      'M46 87 Q69 59 98 50 Q130 41 152 76',
      'M53 87 C64 64 82 56 103 55 Q132 55 146 86',
      'M43 99 C36 114 49 127 43 143 S49 173 48 185',
      'M157 99 C164 114 151 127 157 143 S151 173 152 185',
      'M52 108 Q58 121 51 140 Q47 157 54 174', 'M148 108 Q142 121 149 140 Q153 157 146 174',
    ],
  },
  sideSweep: {
    back: `${SWEEP_TOP} C158 121 164 136 155 150 Q144 155 140 145 L61 187 C52 205 32 197 36 181 C26 164 35 147 32 130 C28 113 36 101 39 91 Z`,
    front: `${SWEEP_TOP} C158 112 160 120 155 129 L149 133 C145 117 149 97 139 82 C127 66 111 61 94 64 C78 65 66 74 58 86 C51 99 55 114 52 130 C47 145 55 164 58 177 Q46 187 39 175 C30 160 38 146 35 131 C30 114 36 102 39 91 Z`,
    backStrands: ['M36 111 C27 133 43 147 36 164 S40 187 46 192', 'M44 131 Q50 150 44 168 Q52 185 51 194'],
    strands: [
      'M88 26 C80 37 82 49 88 56', 'M91 34 C111 24 136 40 148 60',
      'M46 78 C63 53 86 41 105 44 Q135 42 154 73',
      'M47 88 C68 65 90 54 111 55 Q138 56 152 89',
      'M44 98 C34 112 49 126 43 142 C35 157 47 167 47 177',
      'M53 104 Q48 120 54 133 Q47 152 54 168', 'M154 95 Q159 110 153 124',
    ],
  },
};

// Native coordinates (200 × 240). Linden source strokes are transformed from
// 300 × 400: match their visual weight without moving/scaling the old outline.
const TEXTURE_SCALE = Math.sqrt(1.35 * 1.6);
const SETTINGS = {};
const mirrorCurve = (curve: Curve): Curve => curve.map((v, i) => i % 2 ? v : 200 - v) as Curve;
function pairedBundle(a: Curve, b: Curve, count: number): string[] {
  return [...bundle(a, b, count), ...bundle(mirrorCurve(a), mirrorCurve(b), count)];
}
const PULLED_FLOW = pairedBundle(
  [100, 26, 68, 25, 40, 56, 46, 105],
  [100, 60, 85, 61, 57, 79, 50, 112], 24,
);
const SWEPT_FLOW = [
  ...bundle([90, 24, 58, 27, 33, 60, 43, 100], [94, 63, 73, 64, 49, 85, 53, 120], 24),
  ...bundle([91, 24, 127, 17, 163, 54, 157, 109], [94, 64, 123, 56, 153, 83, 147, 117], 25),
];
const WAVY_LEFT = bundle(
  [39, 88, 25, 126, 44, 145, 42, 193],
  [58, 92, 63, 128, 42, 145, 60, 182], 16,
);
const WAVY_RIGHT = bundle(
  [161, 88, 175, 126, 156, 145, 158, 193],
  [142, 92, 137, 128, 158, 145, 140, 182], 16,
);
const FRONT_GLEAM = [
  'M49 62 C62 36 86 28 98 28 C79 37 61 51 53 75 Z',
  'M107 30 C126 35 144 49 151 68 L147 78 C137 52 122 43 108 38 Z',
];
const LEFT_WAVE_GLEAM = 'M41 104 C33 134 47 146 42 171 L48 182 C50 157 42 139 48 109 Z';
const RIGHT_WAVE_GLEAM = 'M159 104 C167 134 153 146 158 171 L152 182 C150 157 158 139 152 109 Z';
const PULLED_SHADOWS = ['M98 27 C101 41 104 49 106 62 L99 64 C99 48 96 37 94 29 Z'];

const ROLL_SURFACE: Surface = {
  d: 'M64 62 C66 46 133 46 136 62 C135 80 66 80 64 62 Z',
  strands: bundle([66, 62, 68, 46, 132, 46, 134, 62], [70, 68, 80, 77, 120, 77, 130, 68], 24),
  highlights: ['M68 59 C82 49 119 49 132 59 L129 61 C114 55 86 54 71 63 Z'],
  shadows: ['M69 70 C85 78 115 79 131 69 L128 74 C112 80 86 79 72 74 Z'],
};

function texture(style: RebuiltFemaleHairStyle, layer: 'front' | 'back'): Omit<Surface, 'd'> {
  const cut = CUTS[style];
  const swept = style === 'halfUp' || style === 'sideSweep';
  const sides = swept ? [...WAVY_LEFT, ...(style === 'halfUp' ? WAVY_RIGHT : [])] : [];
  if (layer === 'front') return {
    strands: [...(swept ? SWEPT_FLOW : PULLED_FLOW), ...sides, ...cut.strands],
    highlights: [...FRONT_GLEAM, ...(swept ? [LEFT_WAVE_GLEAM, ...(style === 'halfUp' ? [RIGHT_WAVE_GLEAM] : [])] : [])],
    shadows: PULLED_SHADOWS,
  };
  return {
    strands: [
      ...(swept ? SWEPT_FLOW : PULLED_FLOW), ...sides, ...cut.backStrands,
      ...(style === 'napeChignon' ? bundle([149, 137, 174, 136, 181, 167, 159, 181], [126, 157, 145, 143, 164, 170, 128, 178], 22) : []),
      ...(style === 'crownBun' ? bundle([79, 21, 82, 5, 122, 4, 126, 23], [83, 29, 91, 18, 114, 18, 121, 30], 23) : []),
    ],
    highlights: [
      ...FRONT_GLEAM,
      ...(swept ? [LEFT_WAVE_GLEAM, ...(style === 'halfUp' ? [RIGHT_WAVE_GLEAM] : [])] : []),
      ...(style === 'crownBun' ? ['M80 19 C88 8 114 6 123 18 L119 20 C106 13 91 13 83 23 Z'] : []),
      ...(style === 'napeChignon' ? ['M154 139 C174 148 177 164 160 178 L153 179 C169 164 168 151 151 145 Z'] : []),
    ],
  };
}

function HairMass({ style, layer, p }: { style: RebuiltFemaleHairStyle; layer: 'front' | 'back'; p: HairPaint }) {
  const uid = `native-linden-hair-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const surface: Surface = { d: CUTS[style][layer], ...texture(style, layer) };
  return <g data-womens-material="linden" data-womens-cut={style} data-womens-layer={layer}>
    <LindenHairSurface surface={surface} uid={uid} settings={SETTINGS} base={p.base} secondary={p.base} textureScale={TEXTURE_SCALE}>
      {layer === 'front' && style === 'rolledFringe' && <LindenHairSurface
        surface={ROLL_SURFACE} uid={`${uid}-roll`} settings={SETTINGS} base={p.base} secondary={p.base} textureScale={TEXTURE_SCALE} />}
      {layer === 'back' && style === 'crownBun' && <path d="M80 31 Q103 38 125 31" fill="none"
        stroke={tone(p.base, -0.6)} strokeWidth="1.3" opacity="0.58" />}
    </LindenHairSurface>
  </g>;
}

export function WomensHairBack({ style, paint }: { style: RebuiltFemaleHairStyle; paint: HairPaint }) {
  return <HairMass style={style} layer="back" p={paint} />;
}
export function WomensHairFront({ style, paint }: { style: RebuiltFemaleHairStyle; paint: HairPaint }) {
  return <HairMass style={style} layer="front" p={paint} />;
}
