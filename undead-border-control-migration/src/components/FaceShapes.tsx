import { shade } from '../utils/color';

export const MALE_FACE_SHAPES = [
  'male-square', 'male-rectangular', 'male-trapezoid', 'male-oval', 'male-diamond',
] as const;
export const FEMALE_FACE_SHAPES = [
  'female-oval', 'female-heart', 'female-round', 'female-soft-square', 'female-diamond',
] as const;
export type FaceShape = (typeof MALE_FACE_SHAPES)[number] | (typeof FEMALE_FACE_SHAPES)[number];

type FaceSpec = {
  outline: string;
  cheekX: number;
  jawX: number;
  jawY: number;
  chinHalf: number;
  chinY: number;
  neckHalf: number;
};

// A shared upper skull makes all thirty hairstyles fit. Individual cheek, jaw
// and chin contours start below the temples, rather than scaling the features.
const UPPER = 'M100 36 C66 36 49 66 50 105';
const CLOSE = 'C151 66 134 36 100 36 Z';

export const FACE_SPECS: Record<FaceShape, FaceSpec> = {
  'male-square': {
    outline: `${UPPER} C48 125 51 143 56 156 Q61 169 77 180 Q85 189 100 189 Q115 189 123 180 Q139 169 144 156 C149 143 152 125 150 105 ${CLOSE}`,
    cheekX: 49, jawX: 56, jawY: 156, chinHalf: 20, chinY: 189, neckHalf: 25,
  },
  'male-rectangular': {
    outline: `${UPPER} C51 126 54 146 60 165 Q64 178 81 189 Q87 194 100 195 Q113 194 119 189 Q136 178 140 165 C146 146 149 126 150 105 ${CLOSE}`,
    cheekX: 52, jawX: 60, jawY: 165, chinHalf: 17, chinY: 195, neckHalf: 23,
  },
  'male-trapezoid': {
    outline: `${UPPER} C48 123 49 143 53 155 Q57 171 76 183 Q85 191 100 191 Q115 191 124 183 Q143 171 147 155 C151 143 152 123 150 105 ${CLOSE}`,
    cheekX: 49, jawX: 53, jawY: 155, chinHalf: 22, chinY: 191, neckHalf: 26,
  },
  'male-oval': {
    outline: `${UPPER} C49 126 57 149 66 166 Q74 180 86 187 Q100 193 114 187 Q126 180 134 166 C143 149 151 126 150 105 ${CLOSE}`,
    cheekX: 51, jawX: 66, jawY: 166, chinHalf: 14, chinY: 191, neckHalf: 23,
  },
  'male-diamond': {
    outline: `${UPPER} C47 116 46 128 51 137 L64 162 Q71 178 85 186 Q100 192 115 186 Q129 178 136 162 L149 137 C154 128 153 116 150 105 ${CLOSE}`,
    cheekX: 47, jawX: 64, jawY: 162, chinHalf: 15, chinY: 191, neckHalf: 24,
  },
  // All five feminine contours are close to a natural oval: restrained cheek
  // width and a rounded, adequately broad chin, with no pointed V-shaped jaw.
  'female-oval': {
    outline: `${UPPER} C51 125 57 146 66 162 C73 175 82 183 91 184 Q100 186 109 184 C118 183 127 175 134 162 C143 146 149 125 150 105 ${CLOSE}`,
    cheekX: 54, jawX: 66, jawY: 162, chinHalf: 16, chinY: 185, neckHalf: 21,
  },
  'female-heart': {
    outline: `${UPPER} C51 123 58 144 68 163 C75 176 84 184 92 185 Q100 187 108 185 C116 184 125 176 132 163 C142 144 149 123 150 105 ${CLOSE}`,
    cheekX: 55, jawX: 68, jawY: 163, chinHalf: 15, chinY: 186, neckHalf: 21,
  },
  'female-round': {
    outline: `${UPPER} C50 125 55 145 64 161 C71 175 83 183 100 184 C117 183 129 175 136 161 C145 145 150 125 150 105 ${CLOSE}`,
    cheekX: 53, jawX: 64, jawY: 161, chinHalf: 18, chinY: 184, neckHalf: 22,
  },
  'female-soft-square': {
    outline: `${UPPER} C51 125 57 145 64 161 C71 176 80 181 89 183 Q100 185 111 183 C120 181 129 176 136 161 C143 145 149 125 150 105 ${CLOSE}`,
    cheekX: 54, jawX: 64, jawY: 161, chinHalf: 18, chinY: 184, neckHalf: 22,
  },
  'female-diamond': {
    outline: `${UPPER} C51 119 53 136 59 147 C64 159 72 173 83 181 Q100 190 117 181 C128 173 136 159 141 147 C147 136 149 119 150 105 ${CLOSE}`,
    cheekX: 55, jawX: 67, jawY: 164, chinHalf: 16, chinY: 186, neckHalf: 21,
  },
};

export function FacePlanes({ shape, skin, clip, soft }: {
  shape: FaceShape;
  skin: string;
  clip: string;
  soft: string;
}) {
  const f = FACE_SPECS[shape];
  const masculine = shape.startsWith('male-');
  const dark = shade(skin, -39);
  const light = shade(skin, 10);
  const cheekCentre = f.cheekX + 25;
  const plane =
    `M50 86 C49 104 ${f.cheekX} 118 ${f.cheekX} 130 ` +
    `Q${f.cheekX} 142 ${f.jawX} ${f.jawY} ` +
    `Q${f.jawX + 5} ${f.jawY + 15} ${100 - f.chinHalf} ${f.chinY - 5} ` +
    `Q${f.jawX + 18} ${f.jawY + 6} ${f.jawX + 11} ${f.jawY - 5} ` +
    `C${f.cheekX + 13} 144 ${f.cheekX + 11} 129 ${f.cheekX + 12} 116 Q60 95 64 75 Z`;
  const cheekHollow =
    `M${f.cheekX + 9} 130 Q${cheekCentre} 139 ${cheekCentre + 11} 135 ` +
    `Q${cheekCentre + 4} 148 ${f.jawX + 12} ${f.jawY - 7} Q${f.cheekX + 11} 146 ${f.cheekX + 9} 130 Z`;
  const jawLine =
    `M${f.jawX + 4} ${f.jawY - 4} Q${f.jawX + 10} ${f.jawY + 13} ${100 - f.chinHalf + 2} ${f.chinY - 6}`;

  return (
    <g clipPath={clip}>
      <path d={plane} fill={dark} opacity={masculine ? 0.15 : 0.055} />
      <path d={plane} transform="matrix(-1 0 0 1 200 0)" fill={dark} opacity={masculine ? 0.22 : 0.095} />
      <path d={cheekHollow} fill={dark} opacity={masculine ? 0.11 : 0.025} filter={soft} />
      <path d={cheekHollow} transform="matrix(-1 0 0 1 200 0)" fill={dark} opacity={masculine ? 0.15 : 0.04} filter={soft} />
      <ellipse cx={cheekCentre} cy="133" rx="15" ry={masculine ? 7 : 10} fill={light} opacity={masculine ? 0.2 : 0.14} filter={soft} />
      <ellipse cx={200 - cheekCentre} cy="133" rx="15" ry={masculine ? 7 : 10} fill={light} opacity={masculine ? 0.09 : 0.065} filter={soft} />
      <g fill="none" stroke={dark} strokeWidth={masculine ? 0.8 : 0.6} opacity={masculine ? 0.23 : 0.1} strokeLinecap="round">
        <path d={jawLine} />
        <path d={jawLine} transform="matrix(-1 0 0 1 200 0)" />
      </g>
      <ellipse cx="100" cy={f.chinY - 8} rx={f.chinHalf * 0.75} ry="4.5" fill={light} opacity={masculine ? 0.13 : 0.08} filter={soft} />
    </g>
  );
}

// Only applied to the age-derived 'old' group. Vampire generation never assigns
// this group, regardless of its passport date of birth.
export function AgingLines({ years, skin, clip, eyeTilt, chinY }: {
  years: number;
  skin: string;
  clip: string;
  eyeTilt: number;
  chinY: number;
}) {
  const intensity = Math.min(0.62, 0.4 + Math.max(0, years - 55) * 0.014);
  const lines = [
    'M74 70 C86 66 96 67 103 68 C112 67 121 68 128 71',
    'M78 77 C89 74 98 75 103 76 C112 75 118 76 123 78',
    'M83 83 Q100 80 117 83',
    'M95 86 Q94 92 96 98',
    'M105 86 Q106 92 104 98',
    'M89 144 Q81 151 81 159 Q80 165 82 169',
    'M111 144 Q119 151 119 159 Q120 165 118 169',
    'M79 164 Q78 171 82 176',
    'M121 164 Q122 171 118 176',
    `M85 ${chinY - 8} Q100 ${chinY - 5} 115 ${chinY - 8}`,
    `M91 ${chinY - 4} Q100 ${chinY - 2} 109 ${chinY - 4}`,
  ];
  const eyeLines = [
    'M-12 -1 Q-16 -5 -20 -4',
    'M-12 2 Q-17 3 -21 6',
    'M-11 5 Q-16 9 -18 11',
    'M-10 6 Q0 11 10 6',
    'M-9 9 Q0 13 8 9',
  ];
  return (
    <g clipPath={clip}>
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g stroke={shade(skin, 12)} strokeWidth="0.85" opacity={intensity * 0.72} transform="translate(0 0.8)">
          {lines.map((d) => <path key={d} d={d} />)}
        </g>
        <g stroke={shade(skin, -35)} strokeWidth="0.78" opacity={intensity}>
          {lines.map((d) => <path key={d} d={d} />)}
        </g>
        {[false, true].map((right) => (
          <g key={String(right)} transform={`translate(${right ? 123 : 77} 109) rotate(${right ? -eyeTilt : eyeTilt}) scale(${right ? -1 : 1} 1)`}>
            <g stroke={shade(skin, -38)} strokeWidth="0.7" opacity={intensity}>
              {eyeLines.map((d) => <path key={d} d={d} />)}
            </g>
            <path d="M-9 10 Q0 14 8 10" stroke={shade(skin, 8)} strokeWidth="0.7" opacity="0.35" />
          </g>
        ))}
      </g>
      <g fill="#92714e" opacity="0.13">
        <ellipse cx="57" cy="133" rx="1.4" ry="1.1" />
        <ellipse cx="62" cy="141" rx="1" ry="0.8" />
        <ellipse cx="139" cy="134" rx="1.2" ry="0.9" />
        <ellipse cx="143" cy="145" rx="0.8" ry="1" />
      </g>
    </g>
  );
}
