import { memo, useEffect, useId, useState } from 'react';
import { HairBack, HairFront, type HairPaint, type HairStyle } from './hairstyles';
import { Nose, type NoseType } from './Noses';
import { FacialHairLayer, type FacialHair } from './Mustaches';
import { FACE_SPECS, FacePlanes, AgingLines, type FaceShape } from './FaceShapes';
import { PortraitGlasses, type GlassesStyle, type GloveStyle } from './Glasses';
import { shade } from '../utils/color';

export type Traits = {
  skinTone: string;
  hairColor: string;
  hairStyle: HairStyle;
  faceShape: FaceShape;
  nose: NoseType;
  eyeColor: string;
  eyeShape: 'normal' | 'slit' | 'wide';
  // Eye slant in degrees: > 0 raises the outer corners, < 0 lowers them.
  eyeTilt: number;
  hasFangs: boolean;
  hasClaws: boolean;
  hasWebbing: boolean;
  dirtyNails: boolean;
  nailColor: string;
  hasScales: boolean;
  hasFur: boolean;
  bodyHair: 'smooth' | 'stubble' | 'long';
  hasSecondJaw: boolean;
  hasExtraFinger?: boolean;
  hasMultiplePupils?: boolean;
  pupilReactsToLight?: boolean;
  bloodshotSclera: boolean;
  paleSkin: boolean;
  gender: 'm' | 'f';
  facialHair: FacialHair;
  age: 'young' | 'mid' | 'old';
  ageYears: number;
  greyHair: boolean;
  wearsGlasses: boolean;
  glassesStyle: GlassesStyle;
  wearsGloves: boolean;
  gloveStyle: GloveStyle;
  gloveColor: string;
};

type BlinkFrame = 0 | 1 | 2 | 3 | 4;

export const Portrait = memo(function Portrait({
  t,
  className = '',
  animated = false,
  glassesRemoved = false,
  irisScale = 1,
}: {
  t: Traits;
  className?: string;
  animated?: boolean;
  glassesRemoved?: boolean;
  irisScale?: number;
}) {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');
  const [blink, setBlink] = useState<BlinkFrame>(0);
  const skin = t.paleSkin ? '#d9d0c8' : t.skinTone;
  const skinShadow = shade(skin, -23);
  const skinDeep = shade(skin, -39);
  const skinLight = shade(skin, 10);
  const lipTop = t.paleSkin ? '#805e62' : '#9d5c51';
  const lipBottom = t.paleSkin ? '#947176' : '#b57063';

  const paint: HairPaint = {
    gradient: `url(#${id}-hair)`,
    base: t.hairColor,
    dark: shade(t.hairColor, -32),
    shine: t.greyHair ? '#e4e1d8' : shade(t.hairColor, 24),
    stubble: `url(#${id}-stubble)`,
    headClip: `url(#${id}-head)`,
  };

  useEffect(() => {
    if (!animated) {
      setBlink(0);
      return;
    }
    const timers = new Set<number>();
    const blinkOnce = () => {
      // Roughly one scheduled blink in fourteen is skipped.
      if (Math.floor(Math.random() * 14) === 0 || document.hidden) return;
      ([1, 2, 3, 4] as BlinkFrame[]).forEach((frame, index) => {
        const timer = window.setTimeout(() => {
          timers.delete(timer);
          setBlink(frame);
        }, index * 62);
        timers.add(timer);
      });
      const reset = window.setTimeout(() => {
        timers.delete(reset);
        setBlink(0);
      }, 4 * 62);
      timers.add(reset);
    };
    const interval = window.setInterval(blinkOnce, 7000);
    return () => {
      window.clearInterval(interval);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [animated, t]);

  const face = FACE_SPECS[t.faceShape];
  // Hair stubble and facial shading use the same individual head contour.
  const facePath = face.outline;
  const neckLeft = 100 - face.neckHalf;
  const neckRight = 100 + face.neckHalf;
  const neckPath = `M${neckLeft} 166 C${neckLeft + 4} 179 ${neckLeft + 3} 190 ${neckLeft - 2} 195 L100 207 L${neckRight + 2} 195 C${neckRight - 3} 190 ${neckRight - 4} 179 ${neckRight} 166 Z`;
  const browColor = t.greyHair ? shade(t.hairColor, -12) : t.hairColor;

  return (
    <svg viewBox="0 0 200 240" className={className} style={{ background: '#211b16' }} role="img" aria-label="Портрет посетителя">
      <defs>
        <radialGradient id={`${id}-back`} cx="50%" cy="37%" r="73%">
          <stop offset="0%" stopColor="#5a4a39" />
          <stop offset="62%" stopColor="#352a21" />
          <stop offset="100%" stopColor="#17120f" />
        </radialGradient>
        <linearGradient id={`${id}-coat`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#48463e" />
          <stop offset="55%" stopColor="#292a27" />
          <stop offset="100%" stopColor="#151716" />
        </linearGradient>
        <radialGradient id={`${id}-face`} cx="47%" cy="34%" r="67%">
          <stop offset="0%" stopColor={skinLight} />
          <stop offset="61%" stopColor={skin} />
          <stop offset="100%" stopColor={skinShadow} />
        </radialGradient>
        <linearGradient id={`${id}-neck`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={skinShadow} />
          <stop offset="45%" stopColor={skin} />
          <stop offset="100%" stopColor={skinDeep} />
        </linearGradient>
        <linearGradient id={`${id}-hair`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={shade(t.hairColor, 14)} />
          <stop offset="46%" stopColor={t.hairColor} />
          <stop offset="100%" stopColor={shade(t.hairColor, -30)} />
        </linearGradient>
        {/* Fine stubble for shaved temples, buzz cuts and stubble beards. */}
        <pattern id={`${id}-stubble`} width="3.2" height="3.2" patternUnits="userSpaceOnUse">
          <rect width="3.2" height="3.2" fill={shade(t.hairColor, -10)} opacity="0.3" />
          <circle cx="0.7" cy="0.8" r="0.42" fill={shade(t.hairColor, -34)} />
          <circle cx="2.3" cy="1.4" r="0.38" fill={shade(t.hairColor, -34)} />
          <circle cx="1.3" cy="2.6" r="0.4" fill={shade(t.hairColor, -34)} />
          <circle cx="2.8" cy="3" r="0.3" fill={shade(t.hairColor, -34)} />
        </pattern>
        <clipPath id={`${id}-head`}>
          <path d={facePath} />
        </clipPath>
        <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      <rect width="200" height="240" fill={`url(#${id}-back)`} />
      <ellipse cx="100" cy="224" rx="87" ry="17" fill="#080706" opacity="0.52" />

      {/* BACK hair layer: drawn before the body, so the shoulders and coat cover it. */}
      <HairBack style={t.hairStyle} paint={paint} />

      {/* Shoulders and period clothing. */}
      <path d="M12 240 C16 211 35 200 69 192 L100 205 L131 192 C165 200 184 211 188 240 Z" fill={`url(#${id}-coat)`} />
      <path d="M17 240 C25 218 43 207 68 201" fill="none" stroke="#666154" strokeWidth="2" opacity="0.42" />
      <path d="M183 240 C175 218 157 207 132 201" fill="none" stroke="#111311" strokeWidth="3" opacity="0.65" />
      <path d="M72 190 L100 205 L87 236 L58 202 Z" fill="#5b5b53" stroke="#1d1e1c" strokeWidth="1" />
      <path d="M128 190 L100 205 L113 236 L142 202 Z" fill="#3a3b37" stroke="#171816" strokeWidth="1" />
      <circle cx="46" cy="224" r="2.3" fill="#767064" opacity="0.7" />
      <circle cx="154" cy="224" r="2.3" fill="#171817" />

      {/* Neck width follows the jaw; the shirt collar stays on top. */}
      <path d={neckPath} fill={`url(#${id}-neck)`} />
      <path d={`M${neckLeft} 167 Q100 ${face.chinY + 3} ${neckRight} 167 Q${neckRight - 7} 190 100 194 Q${neckLeft + 7} 190 ${neckLeft} 167`} fill={skinDeep} opacity="0.3" />
      <path d="M83 190 L100 204 L117 190 L112 221 L88 221 Z" fill="#d3c7ad" />
      <path d="M96 204 L104 204 L107 240 L93 240 Z" fill="#5b2020" />
      <path d="M100 204 L107 214 L100 220 L93 214 Z" fill="#711f20" />

      <Ear x={52} flip={false} skin={skin} shadow={skinShadow} deep={skinDeep} />
      <Ear x={148} flip skin={skin} shadow={skinShadow} deep={skinDeep} />

      <path d={facePath} fill={`url(#${id}-face)`} stroke={skinDeep} strokeWidth="0.65" />
      <FacePlanes shape={t.faceShape} skin={skin} clip={paint.headClip} soft={`url(#${id}-soft)`} />

      <Eyebrow x={77} y={95} flip={false} color={browColor} thin={t.gender === 'f'} tilt={t.eyeTilt * 0.6} />
      <Eyebrow x={123} y={95} flip color={browColor} thin={t.gender === 'f'} tilt={t.eyeTilt * 0.6} />
      <PortraitEye id={`${id}-left`} cx={77} cy={109} t={t} blink={blink} flip={false} irisScale={irisScale} />
      <PortraitEye id={`${id}-right`} cx={123} cy={109} t={t} blink={blink} flip irisScale={irisScale} />

      <Nose type={t.nose} skin={skin} uid={id} />

      {/* Spectacles obscure the eyes until the visitor agrees to remove them. */}
      {t.wearsGlasses && !glassesRemoved && (
        <PortraitGlasses style={t.glassesStyle} uid={id} />
      )}

      {/* Keep the mouth and mustache anchors unchanged. */}
      <g transform="translate(0 -6)">
        <path d="M83 166 C89 162 95 161 100 164 C105 161 111 162 117 166 Q100 168 83 166 Z" fill={lipTop} opacity="0.9" />
        <path d="M84 166 Q100 170 116 166 Q108 174 100 174 Q92 174 84 166 Z" fill={lipBottom} opacity="0.9" />
        <path d="M84 166 Q100 168 116 166" fill="none" stroke={shade(lipTop, -34)} strokeWidth="1" strokeLinecap="round" />
        <path d="M93 171 Q100 173 107 171" fill="none" stroke={shade(lipBottom, 20)} strokeWidth="0.65" opacity="0.65" />
        <path d="M89 180 Q100 183 111 180" fill="none" stroke={skinDeep} strokeWidth="0.7" opacity="0.21" />
      </g>

      {t.age === 'old' && (
        <AgingLines years={t.ageYears} skin={skin} clip={paint.headClip} eyeTilt={t.eyeTilt} chinY={face.chinY} />
      )}

      {/* FRONT hair layer: fringe, side locks and hairline. */}
      <HairFront style={t.hairStyle} paint={paint} />

      {/* Mustaches sit directly on the upper lip. No beards for now. */}
      <FacialHairLayer type={t.facialHair} color={t.hairColor} stubble={paint.stubble} clip={paint.headClip} />

      <rect x="0" y="0" width="200" height="240" fill="none" stroke="#0c0907" strokeWidth="8" opacity="0.38" />
    </svg>
  );
});

function PortraitEye({ id, cx, cy, t, blink, flip, irisScale }: {
  id: string;
  cx: number;
  cy: number;
  t: Traits;
  blink: BlinkFrame;
  flip: boolean;
  irisScale: number;
}) {
  const openness: Record<BlinkFrame, number> = { 0: 1, 1: 0.64, 2: 0.22, 3: 0.035, 4: 0.58 };
  const open = openness[blink] * (t.eyeShape === 'wide' ? 1.13 : 1);
  const left = cx - 11;
  const right = cx + 11;
  const top = 7.2 * open;
  const bottom = 5.1 * open;
  const almond = `M ${left} ${cy} C ${cx - 5} ${cy - top} ${cx + 5} ${cy - top} ${right} ${cy} C ${cx + 5} ${cy + bottom} ${cx - 5} ${cy + bottom} ${left} ${cy} Z`;
  // Positive tilt always raises the OUTER corner of each eye.
  const rotation = flip ? -t.eyeTilt : t.eyeTilt;
  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      <defs><clipPath id={`${id}-clip`}><path d={almond} /></clipPath></defs>
      <path d={almond} fill={t.bloodshotSclera ? '#f0c6c2' : '#eee8dc'} stroke="#4a332a" strokeWidth="0.65" />
      <g clipPath={`url(#${id}-clip)`}>
        {/* Slightly raised, but not pressed against the upper eyelid. */}
        <circle cx={cx} cy={cy - 2.2} r={5.2 * irisScale} fill={shade(t.eyeColor, -24)} />
        <circle cx={cx} cy={cy - 2.2} r={4.25 * irisScale} fill={t.eyeColor} />
        {t.hasMultiplePupils ? (
          <>
            <circle cx={cx - 1.4} cy={cy - 2.2} r="1.35" fill="#080605" />
            <circle cx={cx + 1.4} cy={cy - 2.2} r="1.35" fill="#080605" />
          </>
        ) : t.eyeShape === 'slit' ? (
          <ellipse cx={cx} cy={cy - 2.2} rx="0.85" ry="4.1" fill="#050403" />
        ) : (
          <circle cx={cx} cy={cy - 2.2} r="2.15" fill="#090705" />
        )}
        <circle cx={cx - 1.4} cy={cy - 4} r="0.9" fill="#fff" opacity="0.9" />
      </g>
      <path d={`M ${left} ${cy} C ${cx - 5} ${cy - top} ${cx + 5} ${cy - top} ${right} ${cy}`} fill="none" stroke="#34231e" strokeWidth="1.15" strokeLinecap="round" />
      <path d={`M ${left} ${cy} C ${cx - 5} ${cy + bottom} ${cx + 5} ${cy + bottom} ${right} ${cy}`} fill="none" stroke="#6f4e42" strokeWidth="0.55" opacity="0.8" />
      {[0.2, 0.38, 0.62, 0.8].map((position, index) => {
        const x = left + (right - left) * position;
        const y = cy - top * Math.sin(Math.PI * position) * 0.92;
        const direction = flip ? 1 : -1;
        const outer = index === (flip ? 3 : 0);
        return (
          <path
            key={position}
            d={`M ${x} ${y} q ${direction * (outer ? 1.5 : 0.6)} -${outer ? 2.5 : 1.8} ${direction * (outer ? 3 : 1.5)} -${outer ? 3 : 2.1}`}
            fill="none" stroke="#2b1d19" strokeWidth="0.55" strokeLinecap="round" opacity={open < 0.1 ? 0.25 : 0.75}
          />
        );
      })}
      {blink === 3 && (
        <path d={`M ${left - 1} ${cy + 2} Q ${cx} ${cy + 4} ${right + 1} ${cy + 2}`} fill="none" stroke="#8b6252" strokeWidth="0.55" opacity="0.45" />
      )}
    </g>
  );
}

// Anchor x is the point where the ear meets the head; the ear extends only ~8 px outwards.
function Ear({ x, flip, skin, shadow, deep }: { x: number; flip: boolean; skin: string; shadow: string; deep: string }) {
  const direction = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} 121) scale(${direction * 0.82} 0.92)`}>
      <path d="M0 -15 C-9 -17 -11 -4 -9 8 C-7 21 1 24 5 14 L6 -9 C5 -13 3 -15 0 -15 Z" fill={skin} stroke={deep} strokeWidth="0.8" />
      <path d="M0 -9 C-5 -10 -6 -2 -5 6 C-4 13 0 16 2 10 C-1 8 -1 4 2 1 C4 -2 3 -7 0 -9 Z" fill="none" stroke={shadow} strokeWidth="1.3" opacity="0.7" />
      <path d="M-3 9 Q0 5 3 9" fill="none" stroke={deep} strokeWidth="0.85" opacity="0.55" />
    </g>
  );
}

function Eyebrow({ x, y, flip, color, thin, tilt }: {
  x: number;
  y: number;
  flip: boolean;
  color: string;
  thin: boolean;
  tilt: number;
}) {
  const direction = flip ? -1 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${direction} 1) rotate(${tilt})`}>
      <path
        d={thin ? 'M-11 2 Q-2 -7 11 0' : 'M-11 1 Q0 -6 11 -1'}
        fill="none" stroke={shade(color, -4)} strokeWidth={thin ? 1.6 : 2.3} strokeLinecap="round"
      />
      {[-8, -4, 0, 4, 8].map((dx) => (
        <path key={dx} d={`M ${dx} ${dx < 0 ? -1 : -2} l 4 -2`} stroke={shade(color, 18)} strokeWidth="0.55" opacity="0.58" />
      ))}
    </g>
  );
}
