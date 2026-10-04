import { getFigureGeometry, HAND_OUTLINE, FOOT_OUTLINE } from '../body/figureGeometry';
import { Clothes } from '../clothes/Clothes';
import type { ClothingStyle } from './catalog';
import { shade } from '../../utils/color';

// Clothing has its OWN fit: neckline y152 -> y190, shoulders y160 -> y200.
// It must never scale the face or reuse the hair's transform.
export const CLOTHING_FIT = 'matrix(1.5 0 0 1.25 -125 0)';
export const FEMALE_CLOTHING_RIG = getFigureGeometry('female', { shoulders: 125 });

/** Clothed figure underlay, not the source project's editable Body/Face demo. */
export function ClothingBody({ skin, uid, gender = 'female', topClipId, shoulders }: { skin: string; uid: string; gender?: 'female' | 'male'; topClipId?: string; shoulders?: number }) {
  const rig = shoulders !== undefined
    ? getFigureGeometry(gender, { shoulders })
    : gender === 'male' ? getFigureGeometry('male', { shoulders: 125 }) : FEMALE_CLOTHING_RIG;
  const shadow = shade(skin, -25);
  return <g data-clothed-body={gender} clipPath={`url(#${uid}-body-crop)`}>
    <defs>
      <clipPath id={`${uid}-body-crop`}><rect x="-100" y="185" width="400" height="600" /></clipPath>
      <linearGradient id={`${uid}-body-skin`} x1="10%" y1="0%" x2="90%" y2="100%">
        <stop offset="0" stopColor={shade(skin, 10)} /><stop offset="0.5" stopColor={skin} /><stop offset="1" stopColor={shadow} />
      </linearGradient>
    </defs>
    <g clipPath={topClipId ? `url(#${topClipId})` : undefined}>
      <g transform={CLOTHING_FIT}>
        <path d={rig.corePath} fill={`url(#${uid}-body-skin)`} stroke={shadow} strokeWidth="0.5" />
        {rig.arms.map(arm => <g key={arm.side}>
          <path d={arm.path} fill={`url(#${uid}-body-skin)`} stroke={shadow} strokeWidth="0.5" />
          <path d={HAND_OUTLINE} transform={arm.handTransform} fill={skin} stroke={shadow} strokeWidth="0.5" />
        </g>)}
        {rig.legs.map(leg => <path key={leg.side} d={FOOT_OUTLINE} transform={leg.footTransform} fill={skin} stroke={shadow} strokeWidth="0.5" />)}
      </g>
    </g>
  </g>;
}

export function LindenClothing({ style, skin }: { style: ClothingStyle; skin: string }) {
  return <g data-linden-clothing={style} data-shoulder-scale="1.25" transform={CLOTHING_FIT}>
    <Clothes id={style} rig={FEMALE_CLOTHING_RIG} skin={skin} />
  </g>;
}
