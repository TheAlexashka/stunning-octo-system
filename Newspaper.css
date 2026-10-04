import type { ReactNode } from 'react';
import { shade } from '../utils/color';

// Mustaches only (no beards for now). Every shape is built on the exact line
// of the upper lip (y ≈ 158 at the centre, 160 at the corners) so it is always
// attached to the lip. Chin stubble is the only style that is not above the lip.
export const MUSTACHE_TYPES = [
  'thin', 'toothbrush', 'brush', 'medium', 'large', 'stubbleMustache', 'chinStubble',
] as const;
export type FacialHair = 'none' | (typeof MUSTACHE_TYPES)[number];

export const FACIAL_HAIR_LABELS: Record<FacialHair, string> = {
  none: 'Чисто выбрит',
  thin: 'Тонкие усы',
  toothbrush: 'Усы-щёточка',
  brush: 'Усы-щётка',
  medium: 'Средние усы',
  large: 'Большие усы',
  stubbleMustache: 'Усы-щетина',
  chinStubble: 'Щетина на подбородке',
};

type Solid = 'thin' | 'toothbrush' | 'brush' | 'medium' | 'large';

// Right half of each mustache. The mirrored left half overlaps the centre line
// by ~1 px, so there is no visible seam. The lower edge hugs the lip line.
const HALF: Record<Solid, string> = {
  thin:
    'M99.4 156 C105 152.8 111.5 153.6 118.8 158.6 C119.3 159.3 119 160 118.4 160.2 L117.6 160.4 C111 156.6 105 155.6 99.4 158.6 Z',
  toothbrush:
    'M99.4 152.6 C103.8 152.1 107.8 152.4 109.6 154.6 C110.4 155.8 110.3 156.8 109.4 157.2 C106.5 156.9 102.5 157.6 99.4 158.6 Z',
  brush:
    'M99.4 152.8 C105 152.2 111 152.6 114 154.6 C115 155.8 115 157.6 114.4 159.4 C110.6 157.6 104.6 157.2 99.4 158.8 Z',
  medium:
    'M99.4 151.6 C105 149.6 112 150.8 118.6 157.2 C119.6 158.8 119 160.6 117.8 161 C112.5 157 105.5 156.6 99.4 158.8 Z',
  large:
    'M99.4 149.8 C106 147.2 116.5 148.4 121.6 155.4 C123.4 158 123 162 120.6 163.4 C119.6 160.6 117.6 158.6 114.4 157.6 C109.4 156.6 104 156.8 99.4 158.8 Z',
};

// Hair texture on top of the solid shape.
const STRANDS: Record<Solid, string[]> = {
  thin: ['M101 155.4 C106 153.6 111.5 154.4 117.6 158.6'],
  toothbrush: ['M102 153.2 V157.6', 'M104.4 152.9 V157.4', 'M106.8 153.3 V157.2', 'M108.6 154.6 V156.8'],
  brush: ['M102 153.4 V158', 'M104.6 153.1 V157.8', 'M107.2 153.2 V157.6', 'M109.8 153.6 V158', 'M112.2 154.6 V158.6'],
  medium: [
    'M100.5 153 C105 151.6 111 153 116.8 158.4',
    'M100.8 155.2 C105.4 153.6 111 155 116 159',
    'M103 152.4 C108 151.4 113 153.6 117.4 158',
  ],
  large: [
    'M100.6 151.2 C106 149 114 150.4 120.4 157.4',
    'M101 154 C106 152 113 153.4 119.8 159.6',
    'M103 150.4 C109 149.4 116 151.6 121 157',
    'M102 156.6 C107 155.2 112 156 117 158.4',
    'M120 158 C121.4 160 121.2 162 120.2 163',
  ],
};

const STUBBLE_MUSTACHE =
  'M81 160.6 C82 153.5 90 150.4 100 150.8 C110 150.4 118 153.5 119 160.6 C115.4 157.4 108 156.2 100 158.6 C92 156.2 84.6 157.4 81 160.6 Z';
const CHIN_STUBBLE =
  'M74 169 C76 178 85 187 100 189 C115 187 124 178 126 169 C119 172 110 172 100 172.4 C90 172 81 172 74 169 Z';

function Mirror({ children }: { children: ReactNode }) {
  return <g transform="matrix(-1 0 0 1 200 0)">{children}</g>;
}

export function FacialHairLayer({ type, color, stubble, clip }: {
  type: FacialHair;
  color: string;
  stubble: string;
  clip: string;
}) {
  if (type === 'none') return null;

  // Stubble is always clipped to the head outline.
  if (type === 'stubbleMustache' || type === 'chinStubble') {
    const d = type === 'stubbleMustache' ? STUBBLE_MUSTACHE : CHIN_STUBBLE;
    return (
      <g clipPath={clip}>
        <path d={d} fill={shade(color, -12)} opacity="0.17" />
        <path d={d} fill={stubble} opacity="0.92" />
      </g>
    );
  }

  const fill = shade(color, -4);
  const half = (
    <g>
      <path d={HALF[type]} fill={fill} />
      <path d={HALF[type]} fill="none" stroke={shade(color, -34)} strokeWidth="0.45" opacity="0.5" />
      <g fill="none" stroke={shade(color, 28)} strokeWidth="0.55" strokeLinecap="round" opacity="0.34">
        {STRANDS[type].map((d) => <path key={d} d={d} />)}
      </g>
    </g>
  );
  return (
    <g>
      {half}
      <Mirror>{half}</Mirror>
    </g>
  );
}
