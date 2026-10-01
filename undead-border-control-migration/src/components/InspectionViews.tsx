import { memo, useId } from 'react';
import { Traits } from './Portrait';
import { useInspectionOpening } from '../game/useInspectionOpening';
import type { EyeSide } from './EyeSelector';
import { shade } from '../utils/color';

function EyeZoomView({
  t,
  opened = true,
  paused = false,
  side = 'right',
  animateGlassesRemoval = true,
  flashlightOn = false,
}: {
  t: Traits;
  opened?: boolean;
  paused?: boolean;
  side?: EyeSide;
  animateGlassesRemoval?: boolean;
  flashlightOn?: boolean;
}) {
  const canSeeEye = !t.wearsGlasses || opened;
  const open = useInspectionOpening(canSeeEye, paused, 650);
  const id = useId().replace(/:/g, '');
  const skin = t.paleSkin ? '#d9d0c8' : t.skinTone;
  const upperY = 102 - 67 * open;
  const lowerY = 102 + 66 * open;
  const upperRim = `M8 102 C72 ${upperY} 228 ${upperY} 292 102`;
  const lowerRim = `M8 102 C72 ${lowerY} 228 ${lowerY} 292 102`;
  const aperture = `${upperRim} C228 ${lowerY} 72 ${lowerY} 8 102 Z`;

  const isTinted = t.glassesStyle === 'tinted';
  const isHorn = t.glassesStyle === 'hornRimmed';
  const isPince = t.glassesStyle === 'pinceNez';
  const frameColor = isHorn ? '#22140c' : isPince ? '#8a7248' : '#4a3e31';

  // Light reflex: non-doppelgängers constrict in bright light; doppelgängers are unreactive.
  const isConstricted = flashlightOn && t.pupilReactsToLight !== false;
  const normalPupilRadius = isConstricted ? 7.5 : 20;
  const slitPupilRx = isConstricted ? 2.2 : 6;
  const slitPupilRy = isConstricted ? 26 : 45;

  function lashPoint(time: number, control: number, upper: boolean) {
    const u = 1 - time;
    const x = u ** 3 * 8 + 3 * u ** 2 * time * 72 + 3 * u * time ** 2 * 228 + time ** 3 * 292;
    const y = u ** 3 * 102 + 3 * u ** 2 * time * control + 3 * u * time ** 2 * control + time ** 3 * 102;
    const dx = 3 * u ** 2 * 64 + 6 * u * time * 156 + 3 * time ** 2 * 64;
    const dy = 3 * u ** 2 * (control - 102) + 3 * time ** 2 * (102 - control);
    const length = Math.hypot(dx, dy);
    const normal = upper ? 1 : -1;
    const size = upper ? 8 + Math.sin(Math.PI * time) * 5 : 6.5;
    return { x, y, endX: x + normal * dy / length * size, endY: y - normal * dx / length * size };
  }

  return (
    <svg
      viewBox="0 0 300 200"
      className="w-full h-full inspection-eye"
      role="img"
      aria-label={canSeeEye ? `Осмотр ${side === 'right' ? 'правого' : 'левого'} глаза посетителя${flashlightOn ? ' с фонариком' : ''}` : 'Глаз скрыт за очками'}
    >
      <defs>
        <radialGradient id={`${id}-white`} cx="50%" cy="50%" r="65%">
          {t.bloodshotSclera ? (
            <>
              <stop offset="0%" stopColor="#edd8d6" />
              <stop offset="50%" stopColor="#e2adab" />
              <stop offset="85%" stopColor="#cc7876" />
              <stop offset="100%" stopColor="#964040" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#f8f0dc" />
              <stop offset="75%" stopColor="#e8d8b8" />
              <stop offset="100%" stopColor="#a89578" />
            </>
          )}
        </radialGradient>
        <radialGradient id={`${id}-iris`}>
          <stop offset="0%" stopColor={shade(t.eyeColor, flashlightOn ? 35 : 20)} />
          <stop offset="65%" stopColor={t.eyeColor} />
          <stop offset="100%" stopColor={shade(t.eyeColor, -40)} />
        </radialGradient>
        <linearGradient id={`${id}-lid`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={shade(skin, -15)} /><stop offset="50%" stopColor={skin} /><stop offset="100%" stopColor={shade(skin, -22)} />
        </linearGradient>
        <linearGradient id={`${id}-spectacle-lens`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isTinted ? '#241a17' : '#d8e0dc'} stopOpacity="0.97" />
          <stop offset="50%" stopColor={isTinted ? '#120d0c' : '#96a39d'} stopOpacity="0.98" />
          <stop offset="100%" stopColor={isTinted ? '#080605' : '#58645f'} stopOpacity="0.99" />
        </linearGradient>
        <radialGradient id={`${id}-spotlight`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff9e6" stopOpacity="0.65" />
          <stop offset="60%" stopColor="#ffea9f" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#d8b04a" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}-aperture`}><path d={aperture} /></clipPath>
      </defs>
      <rect width="300" height="200" fill={`url(#${id}-lid)`} />
      <g transform={`rotate(${side === 'right' ? t.eyeTilt : -t.eyeTilt} 150 100)`}>
        {canSeeEye && (
          <g clipPath={`url(#${id}-aperture)`}>
            <rect x="0" y="20" width="300" height="170" fill={`url(#${id}-white)`} />
            <g stroke={t.bloodshotSclera ? '#8e1218' : '#a45c5b'} strokeWidth={t.bloodshotSclera ? 1.4 : 0.8} fill="none" opacity={t.bloodshotSclera ? 0.88 : 0.4}>
              <path d="M20 100 Q60 90 100 100 M280 100 Q240 110 200 100" />
              <path d="M30 110 Q70 120 110 115 M270 90 Q230 80 190 88" />
              {t.bloodshotSclera && (
                <>
                  <path d="M15 85 Q50 92 88 97 M285 85 Q245 92 212 97" strokeWidth="1.2" />
                  <path d="M25 115 Q65 110 95 106 M275 115 Q235 110 205 106" strokeWidth="1.2" />
                  <path d="M70 82 L82 96 L76 108 M230 82 L218 96 L224 108" strokeWidth="1" />
                </>
              )}
            </g>
            <circle cx="150" cy="100" r="55" fill={`url(#${id}-iris)`} />
            {Array.from({ length: 32 }, (_, i) => {
              const angle = i / 32 * Math.PI * 2 + (side === 'left' ? 0.065 : 0);
              return <line key={i} x1={150 + Math.cos(angle) * 18} y1={100 + Math.sin(angle) * 18} x2={150 + Math.cos(angle) * 50} y2={100 + Math.sin(angle) * 50} stroke={shade(t.eyeColor, -45)} strokeWidth="0.9" opacity="0.48" />;
            })}

            {/* PUPILS: Multiple pupils, Slit, or Normal (with light reflex) */}
            {t.hasMultiplePupils ? (
              <g className="transition-all duration-300">
                <circle cx="138" cy="100" r={isConstricted ? 6 : 12.5} fill="#080606" />
                <circle cx="162" cy="100" r={isConstricted ? 6 : 12.5} fill="#080606" />
                <circle cx="136" cy="97" r="2.5" fill="#fff" opacity="0.8" />
                <circle cx="160" cy="97" r="2.5" fill="#fff" opacity="0.8" />
              </g>
            ) : t.eyeShape === 'slit' ? (
              <ellipse cx="150" cy="100" rx={slitPupilRx} ry={slitPupilRy} fill="#080606" className="transition-all duration-300" />
            ) : (
              <circle cx="150" cy="100" r={normalPupilRadius} fill="#080606" className="transition-all duration-300" />
            )}

            {/* Highlights */}
            <ellipse cx={side === 'left' ? 160 : 140} cy="88" rx="8" ry="5" fill="#fff" opacity={flashlightOn ? 0.95 : 0.85} />
            <circle cx="165" cy="115" r="2" fill="#fff" opacity={flashlightOn ? 0.8 : 0.5} />

            {/* Flashlight beam illumination effect */}
            {flashlightOn && (
              <ellipse cx="150" cy="100" rx="90" ry="65" fill={`url(#${id}-spotlight)`} pointerEvents="none" />
            )}
          </g>
        )}
        <path d={`${upperRim} L460 102 L460 -200 L-160 -200 L-160 102 Z`} fill={`url(#${id}-lid)`} />
        <path d={`${lowerRim} L460 102 L460 400 L-160 400 L-160 102 Z`} fill={`url(#${id}-lid)`} />
        <path d={`M22 92 C82 ${upperY - 10} 218 ${upperY - 10} 278 92`} stroke={shade(skin, -38)} strokeWidth="1.2" opacity="0.35" fill="none" />
        <path d={upperRim} stroke="#3b2620" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d={lowerRim} stroke="#795247" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {Array.from({ length: 14 }, (_, index) => {
          const lash = lashPoint(0.06 + index * 0.88 / 13, upperY, true);
          return <path key={index} d={`M${lash.x} ${lash.y} Q${(lash.x + lash.endX) / 2 - 1} ${(lash.y + lash.endY) / 2} ${lash.endX} ${lash.endY}`} stroke="#302119" strokeWidth="1.65" fill="none" strokeLinecap="round" />;
        })}
        {[0.16, 0.28, 0.72, 0.84].map((time) => {
          const lash = lashPoint(time, lowerY, false);
          return <path key={time} d={`M${lash.x} ${lash.y} L${lash.endX} ${lash.endY}`} stroke="#463026" strokeWidth="1" fill="none" strokeLinecap="round" />;
        })}
      </g>

      {/* Close-up spectacles completely block the eye until removed */}
      {t.wearsGlasses && (!canSeeEye || animateGlassesRemoval) && open < 0.99 && (
        <g
          transform={`translate(0 ${-open * 210})`}
          opacity={1 - open * 0.35}
        >
          {/* Cast shadow of frame on skin */}
          <ellipse cx="150" cy="108" rx="134" ry="88" fill="#090605" opacity="0.45" />
          {/* Temple arm & bridge */}
          <path d="M 0 88 L 24 94" stroke={frameColor} strokeWidth={isHorn ? 14 : 8} strokeLinecap="round" />
          <path d="M 276 92 Q 292 84 300 88" stroke={frameColor} strokeWidth={isHorn ? 14 : 9} fill="none" />
          {/* Heavy opaque/glaring spectacle lens */}
          <ellipse
            cx="150"
            cy="100"
            rx="128"
            ry="84"
            fill={`url(#${id}-spectacle-lens)`}
            stroke={frameColor}
            strokeWidth={isHorn ? 14 : isPince ? 6 : 9}
          />
          {isHorn && (
            <path
              d="M 18 84 C 65 4 235 4 282 84"
              fill="none"
              stroke="#160c07"
              strokeWidth="18"
              strokeLinecap="round"
            />
          )}
          {/* Strong window lamp glare reflections hiding the eye behind the glass */}
          <polygon points="62,34 114,22 76,174 34,162" fill="#ffffff" opacity={isTinted ? 0.28 : 0.55} />
          <polygon points="132,20 156,18 118,178 96,176" fill="#ffffff" opacity={isTinted ? 0.18 : 0.38} />
          <ellipse cx="195" cy="74" rx="34" ry="18" fill="#ffffff" opacity={isTinted ? 0.12 : 0.25} />
          {/* Concentric lens refraction rings */}
          <ellipse
            cx="150"
            cy="100"
            rx="116"
            ry="74"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity="0.22"
          />
        </g>
      )}
    </svg>
  );
}

function TeethZoomView({ t, opened = true, paused = false }: { t: Traits; opened?: boolean; paused?: boolean }) {
  const open = useInspectionOpening(opened, paused, 750);
  const skin = t.paleSkin ? '#d9d0c8' : t.skinTone;
  const skinDeep = shade(skin, -42);

  const upperLipBase = t.paleSkin ? '#7e5d61' : '#9c5249';
  const lowerLipBase = t.paleSkin ? '#8f6c70' : '#b26257';
  const lipBorder = t.paleSkin ? '#4d3538' : '#5e2b25';
  const gumColor = t.paleSkin ? '#7d5258' : '#a14b52';
  const gumDark = t.paleSkin ? '#59363b' : '#742e35';
  const enamelTop = t.paleSkin || t.hasFangs ? '#f7f1e1' : '#efe3c6';
  const enamelBot = t.paleSkin || t.hasFangs ? '#dfd5be' : '#d5c39c';

  const mouthOpening =
    `M44 102 C78 ${102 - 30 * open} 118 ${102 - 37 * open} 150 ${102 - 35 * open} ` +
    `C182 ${102 - 37 * open} 222 ${102 - 30 * open} 256 102 ` +
    `C222 ${102 + 40 * open} 184 ${102 + 52 * open} 150 ${102 + 52 * open} ` +
    `C116 ${102 + 52 * open} 78 ${102 + 40 * open} 44 102 Z`;
  const upperLip =
    `M40 102 C68 ${96 - 22 * open} 106 ${88 - 38 * open} 135 ${90 - 38 * open} ` +
    `Q150 ${96 - 37 * open} 165 ${90 - 38 * open} ` +
    `C194 ${88 - 38 * open} 232 ${96 - 22 * open} 260 102 ` +
    `C222 ${102 - 30 * open} 182 ${102 - 37 * open} 150 ${102 - 35 * open} ` +
    `C118 ${102 - 37 * open} 78 ${102 - 30 * open} 40 102 Z`;
  const lowerLip =
    `M40 102 C78 ${102 + 40 * open} 116 ${102 + 52 * open} 150 ${102 + 52 * open} ` +
    `C184 ${102 + 52 * open} 222 ${102 + 40 * open} 260 102 ` +
    `C234 ${110 + 40 * open} 194 ${118 + 56 * open} 150 ${118 + 56 * open} ` +
    `C106 ${118 + 56 * open} 66 ${110 + 40 * open} 40 102 Z`;
  const upperOffset = (1 - open) * 32;
  const jawOffset = -(1 - open) * 41;

  const upperTeeth = [
    { x: 64, w: 18, h: 18, role: 'premolar' },
    { x: 83, w: 20, h: 21, role: 'canine' },
    { x: 104, w: 21, h: 21, role: 'lateral' },
    { x: 126, w: 23, h: 23, role: 'central' },
    { x: 151, w: 23, h: 23, role: 'central' },
    { x: 175, w: 21, h: 21, role: 'lateral' },
    { x: 197, w: 20, h: 21, role: 'canine' },
    { x: 218, w: 18, h: 18, role: 'premolar' },
  ] as const;

  const lowerTeeth = [
    { x: 72, w: 17, h: 16 },
    { x: 90, w: 18, h: 18 },
    { x: 109, w: 19, h: 17 },
    { x: 129, w: 20, h: 17 },
    { x: 151, w: 20, h: 17 },
    { x: 172, w: 19, h: 17 },
    { x: 192, w: 18, h: 18 },
    { x: 211, w: 17, h: 16 },
  ];

  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" role="img" aria-label={opened ? 'Посетитель открывает рот для осмотра зубов' : 'Рот закрыт: зубы пока не доступны для осмотра'}>
      <defs>
        <radialGradient id="faceBg" cx="50%" cy="48%" r="68%">
          <stop offset="0%" stopColor={shade(skin, 6)} />
          <stop offset="68%" stopColor={skin} />
          <stop offset="100%" stopColor={skinDeep} />
        </radialGradient>
        <radialGradient id="oralCavity" cx="50%" cy="50%" r="58%">
          <stop offset="0%" stopColor="#1b0507" />
          <stop offset="70%" stopColor="#320b10" />
          <stop offset="100%" stopColor="#4a141b" />
        </radialGradient>
        <linearGradient id="toothGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={enamelBot} />
          <stop offset="35%" stopColor={enamelTop} />
          <stop offset="100%" stopColor="#fcf8ec" />
        </linearGradient>
        <linearGradient id="lowerToothGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#faf4e4" />
          <stop offset="65%" stopColor={enamelTop} />
          <stop offset="100%" stopColor={enamelBot} />
        </linearGradient>
        <linearGradient id="upperLipGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={shade(upperLipBase, 8)} />
          <stop offset="60%" stopColor={upperLipBase} />
          <stop offset="100%" stopColor={shade(upperLipBase, -22)} />
        </linearGradient>
        <linearGradient id="lowerLipGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={shade(lowerLipBase, -12)} />
          <stop offset="38%" stopColor={shade(lowerLipBase, 14)} />
          <stop offset="100%" stopColor={shade(lowerLipBase, -24)} />
        </linearGradient>
        <clipPath id="mouthClip">
          <path d={mouthOpening} />
        </clipPath>
      </defs>

      {/* Surrounding lower face skin */}
      <rect width="300" height="200" fill="url(#faceBg)" />
      {/* Vignette at edges of inspection frame */}
      <rect width="300" height="200" fill="none" stroke="#1a1310" strokeWidth="14" opacity="0.65" />

      {/* Nasolabial creases only: no nose in the dental close-up */}
      <path d="M 52 24 Q 30 62 28 112" stroke={skinDeep} strokeWidth="2" fill="none" opacity="0.35" />
      <path d="M 248 24 Q 270 62 272 112" stroke={skinDeep} strokeWidth="2" fill="none" opacity="0.35" />
      <path
        d="M88 178 Q150 192 212 178 Q150 185 88 178 Z"
        transform={`translate(0 ${jawOffset})`} fill={skinDeep} opacity="0.4"
      />

      {/* A closed aperture has zero area: no teeth are visible before consent. */}
      <g clipPath="url(#mouthClip)">
        <rect x="30" y="50" width="240" height="120" fill="url(#oralCavity)" />
        {/* Deep throat cavity & Doppelgänger second internal jaw behind the main teeth */}
        {t.hasSecondJaw && (
          <g transform={`translate(0 ${jawOffset * 0.4})`}>
            {/* Pharyngeal second mouth aperture */}
            <ellipse cx="150" cy="106" rx="46" ry="22" fill="#070304" stroke="#680b12" strokeWidth="1.5" />
            <path d="M108 104 Q150 92 192 104 Q150 118 108 104 Z" fill="#200407" />
            {/* Upper row of needle-sharp second teeth */}
            {[114, 122, 130, 138, 146, 154, 162, 170, 178].map((x) => (
              <polygon key={`j2u-${x}`} points={`${x},96 ${x + 6},96 ${x + 3},106`} fill="#faf3df" stroke="#48050a" strokeWidth="0.6" />
            ))}
            {/* Lower row of needle-sharp second teeth */}
            {[118, 126, 134, 142, 150, 158, 166, 174].map((x) => (
              <polygon key={`j2d-${x}`} points={`${x},114 ${x + 6},114 ${x + 3},105`} fill="#faf3df" stroke="#48050a" strokeWidth="0.6" />
            ))}
            {/* Glistening second throat highlight */}
            <ellipse cx="150" cy="105" rx="16" ry="4" fill="#a40d16" opacity="0.4" />
          </g>
        )}

        <g transform={`translate(0 ${jawOffset})`}>
          <ellipse cx="150" cy="134" rx="68" ry="26" fill="#6e2229" />
          <ellipse cx="150" cy="136" rx="58" ry="20" fill="#8c323a" />
          <path d="M150 116 L150 146" stroke="#58181e" strokeWidth="1.6" opacity="0.55" />
          <ellipse cx="136" cy="130" rx="18" ry="6" fill="#ab4952" opacity="0.35" />
        </g>
        <path
          d="M44 52 L256 52 L256 78 Q150 70 44 78 Z"
          transform={`translate(0 ${upperOffset})`} fill={gumColor} stroke={gumDark} strokeWidth="1"
        />

        {lowerTeeth.map((lt, i) => {
          const cx = lt.x + lt.w / 2;
          const topY = 143 - lt.h;
          return (
            <g key={`low-${i}`} transform={`translate(0 ${jawOffset})`}>
              <path
                d={`M${lt.x + 1.5} 145 L${lt.x + 1} ${topY + 4} Q${cx} ${topY} ${lt.x + lt.w - 1} ${topY + 4} L${lt.x + lt.w - 1.5} 145 Z`}
                fill="url(#lowerToothGrad)" stroke="#6e583f" strokeWidth="0.7"
              />
              <path d={`M${lt.x + 2} 142 Q${cx} 138 ${lt.x + lt.w - 2} 142`} stroke={gumDark} strokeWidth="0.9" fill="none" opacity="0.6" />
            </g>
          );
        })}
        <path
          d="M44 141 Q150 137 256 141 L256 168 L44 168 Z"
          transform={`translate(0 ${jawOffset})`} fill={gumColor} stroke={gumDark} strokeWidth="1"
        />

        {upperTeeth.map((ut, i) => {
          const cx = ut.x + ut.w / 2;
          const rootY = 70 + upperOffset;
          const isCanine = ut.role === 'canine';
          const isFang = t.hasFangs && isCanine;
          const tipY = rootY + ut.h;

          return (
            <g key={`up-${i}`}>
              {isFang ? (
                <>
                  {/* Elongated pointed vampire canine */}
                  <path
                    d={`M ${ut.x + 1} ${rootY} Q ${cx} ${rootY - 3} ${ut.x + ut.w - 1} ${rootY} ` +
                      `Q ${ut.x + ut.w - 1} ${rootY + 18} ${cx} ${rootY + 46} ` +
                      `Q ${ut.x + 1} ${rootY + 18} ${ut.x + 1} ${rootY} Z`}
                    fill="url(#toothGrad)"
                    stroke="#6a563d"
                    strokeWidth="0.8"
                  />
                  {/* Fang ridge highlight */}
                  <path
                    d={`M ${cx - 2} ${rootY + 4} L ${cx} ${rootY + 42}`}
                    stroke="#ffffff"
                    strokeWidth="1"
                    opacity="0.45"
                  />
                  {/* Subtle blood trace near the fang tip */}
                  <path
                    d={`M ${cx - 2.5} ${rootY + 34} Q ${cx} ${rootY + 38} ${cx + 2.5} ${rootY + 34} L ${cx} ${rootY + 46} Z`}
                    fill="#7d0f14"
                    opacity="0.85"
                  />
                </>
              ) : isCanine ? (
                /* Normal human canine: gentle anatomical cusp */
                <path
                  d={`M ${ut.x + 1} ${rootY} Q ${cx} ${rootY - 3} ${ut.x + ut.w - 1} ${rootY} ` +
                    `L ${ut.x + ut.w - 1.5} ${tipY - 5} Q ${cx} ${tipY + 2} ${ut.x + 1.5} ${tipY - 5} Z`}
                  fill="url(#toothGrad)"
                  stroke="#6a563d"
                  strokeWidth="0.75"
                />
              ) : (
                /* Incisors and premolars: natural rounded crown */
                <path
                  d={`M ${ut.x + 1} ${rootY} Q ${cx} ${rootY - 3} ${ut.x + ut.w - 1} ${rootY} ` +
                    `L ${ut.x + ut.w - 1.5} ${tipY - 3} Q ${cx} ${tipY + 1} ${ut.x + 1.5} ${tipY - 3} Z`}
                  fill="url(#toothGrad)"
                  stroke="#6a563d"
                  strokeWidth="0.75"
                />
              )}
              {/* Enamel shine */}
              <ellipse
                cx={cx - 2}
                cy={rootY + 9}
                rx={ut.w * 0.18}
                ry="4.5"
                fill="#ffffff"
                opacity="0.28"
              />
              {/* Scalloped gum arch at root */}
              <path
                d={`M ${ut.x + 1} ${rootY + 2} Q ${cx} ${rootY - 4} ${ut.x + ut.w - 1} ${rootY + 2}`}
                stroke={gumDark}
                strokeWidth="1.2"
                fill="none"
                opacity="0.75"
              />
            </g>
          );
        })}

        <path
          d="M44 64 C82 72 118 66 150 68 C182 66 218 72 256 64 L256 76 C218 75 182 72 150 73 C118 72 82 75 44 76 Z"
          transform={`translate(0 ${upperOffset})`} fill="#160406" opacity="0.38"
        />
      </g>

      {/* The lip outlines change from closed to open, not a whole-image scale. */}
      <path d={upperLip} fill="url(#upperLipGrad)" stroke={lipBorder} strokeWidth="1.1" />
      <path
        d={`M118 ${92 - 37 * open} Q135 ${87 - 38 * open} 150 ${94 - 37 * open} Q165 ${87 - 38 * open} 182 ${92 - 37 * open}`}
        stroke={shade(skin, 18)} strokeWidth="1.1" fill="none" opacity="0.45"
      />
      <path d={lowerLip} fill="url(#lowerLipGrad)" stroke={lipBorder} strokeWidth="1.1" />
      <path
        d={`M104 ${112 + 49 * open} Q150 ${117 + 52 * open} 196 ${112 + 49 * open}`}
        stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.22"
      />

      {/* Mouth corners (commissures) */}
      <ellipse cx="41" cy="102" rx="4.5" ry="2.5" fill={lipBorder} opacity="0.7" />
      <ellipse cx="259" cy="102" rx="4.5" ry="2.5" fill={lipBorder} opacity="0.7" />
    </svg>
  );
}

function NailsZoomView({
  t,
  opened = true,
  paused = false,
}: {
  t: Traits;
  opened?: boolean;
  paused?: boolean;
}) {
  const canSeeHand = !t.wearsGloves || opened;
  const open = useInspectionOpening(canSeeHand, paused, 700);
  const id = useId().replace(/:/g, '');
  const gloveCovering = t.wearsGloves && open < 1;
  const skin = t.paleSkin ? '#d9d0c8' : t.skinTone;
  const shadow = shade(skin, -28);
  const gloveBase = t.gloveColor || '#2a1d17';
  const gloveDark = shade(gloveBase, -25);
  const gloveLight = shade(gloveBase, 16);

  // 6 fingers anomaly on Doppelgängers
  const has6Fingers = !!t.hasExtraFinger;

  const showSpreadWebbing = t.hasWebbing && !gloveCovering;
  const standardFingers = showSpreadWebbing ? [
    { x: 106, top: 43, joint: 132, width: 25 },
    { x: 145, top: 28, joint: 131, width: 27 },
    { x: 184, top: 42, joint: 136, width: 26 },
    { x: 222, top: 65, joint: 143, width: 22 },
  ] : [
    { x: 115, top: 43, joint: 132, width: 25 },
    { x: 145, top: 28, joint: 131, width: 27 },
    { x: 176, top: 42, joint: 136, width: 26 },
    { x: 206, top: 65, joint: 143, width: 22 },
  ];

  // 5 main fingers (plus thumb = 6 digits)
  const sixDigitsFingers = [
    { x: 104, top: 48, joint: 132, width: 21 },
    { x: 128, top: 38, joint: 131, width: 22 },
    { x: 153, top: 25, joint: 130, width: 24 },
    { x: 180, top: 38, joint: 134, width: 23 },
    { x: 206, top: 60, joint: 141, width: 21 },
  ];

  const fingers = has6Fingers ? sixDigitsFingers : standardFingers;

  const thumbAndWrist =
    'L 201 278 L 139 278 L 139 252 C 136 240 129 231 119 221 ' +
    'C 101 204 90 186 82 166 L 67 136 C 62 125 61 118 68 113 ' +
    'C 75 109 81 113 85 122 L 103 154 C 108 163 115 165 116 153 Z';

  const normalOutline =
    'M 115 130 L 115 55 C 115 39 140 39 140 55 L 140 118 ' +
    'Q 142 127 145 118 L 145 40 C 145 23 172 23 172 40 L 172 117 ' +
    'Q 174 127 176 118 L 176 54 C 176 38 202 38 202 54 L 202 126 ' +
    'Q 204 134 206 125 L 206 75 C 206 62 228 62 228 75 L 228 144 ' +
    'C 229 181 225 205 214 224 C 207 237 201 247 201 253 ' + thumbAndWrist;

  const sixFingerOutline =
    'M 104 130 L 104 60 C 104 46 125 46 125 60 L 125 118 ' +
    'Q 127 127 128 118 L 128 48 C 128 34 150 34 150 48 L 150 116 ' +
    'Q 152 126 153 117 L 153 36 C 153 22 176 22 176 36 L 176 116 ' +
    'Q 178 126 180 117 L 180 48 C 180 34 203 34 203 48 L 203 124 ' +
    'Q 205 133 206 124 L 206 70 C 206 57 227 57 227 70 L 227 144 ' +
    'C 229 181 225 205 214 224 C 207 237 201 247 201 253 ' + thumbAndWrist;

  const outline = has6Fingers ? sixFingerOutline : (showSpreadWebbing ? normalOutline.replace(/115/g, '106') : normalOutline);

  return (
    <svg
      viewBox="0 0 460 310"
      preserveAspectRatio="xMidYMid meet"
      className="hand-inspection w-full h-full"
      role="img"
      aria-label={`Осмотр кистей рук${has6Fingers ? ' (обнаружено 6 пальцев!)' : ''}`}
    >
      <defs>
        <linearGradient id={`${id}-handShade`} x1="0%" y1="0%" x2="100%" y2="20%">
          <stop offset="0%" stopColor={shadow} stopOpacity="0.6" />
          <stop offset="40%" stopColor={shadow} stopOpacity="0.04" />
          <stop offset="70%" stopColor={shadow} stopOpacity="0.06" />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.52" />
        </linearGradient>
        <radialGradient id={`${id}-handLight`} cx="62%" cy="26%" r="75%">
          <stop offset="0%" stopColor={shade(skin, 9)} stopOpacity="0.45" />
          <stop offset="100%" stopColor={skin} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-fingerMembrane`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#abc3ae" />
          <stop offset="100%" stopColor="#6e958b" />
        </linearGradient>
      </defs>

      <rect width="460" height="310" fill="#1a1310" />
      <defs>
      <g id={`${id}-hand`}>
      <g visibility={gloveCovering ? 'hidden' : 'visible'}>
      {showSpreadWebbing && (
        <g>
          {fingers.slice(0, -1).map((finger, i) => {
            const next = fingers[i + 1];
            const left = finger.x + finger.width - 0.5;
            const right = next.x + 0.5;
            const middle = (left + right) / 2;
            const top = Math.max(finger.top, next.top) + 35;
            const bottom = Math.max(finger.joint, next.joint) + 5;
            return (
              <g key={`membrane-${i}`}>
                <path
                  d={`M ${left} ${top} Q ${middle} ${top + 15} ${right} ${top + 3} L ${right} ${bottom} L ${left} ${bottom} Z`}
                  fill={`url(#${id}-fingerMembrane)`} stroke="#4c776e" strokeWidth="1"
                />
              </g>
            );
          })}
        </g>
      )}
      <path d={outline} fill={skin} stroke={shadow} strokeWidth="1.2" />
      <path d={outline} fill={`url(#${id}-handLight)`} />
      <path d={outline} fill={`url(#${id}-handShade)`} />

      {fingers.map((finger, i) => {
        const cx = finger.x + finger.width / 2;
        const end = 150 + i * 10;
        return (
          <g key={`tendon-${i}`}>
            <path
              d={`M ${cx} ${finger.joint + 6} Q ${cx + (end - cx) * 0.45} 189 ${end} 237`}
              fill="none" stroke={shadow} strokeWidth="1.2" opacity="0.25"
            />
            <path
              d={`M ${cx + 2} ${finger.joint + 7} Q ${cx + (end - cx) * 0.45 + 2} 189 ${end + 2} 237`}
              fill="none" stroke={shade(skin, 12)} strokeWidth="1.3" opacity="0.35"
            />
          </g>
        );
      })}
      <path d="M 105 177 Q 119 194 128 219" fill="none" stroke={shadow} strokeWidth="1.1" opacity="0.28" />
      <path d="M 82 147 Q 87 151 94 144" fill="none" stroke={shadow} strokeWidth="1" opacity="0.4" />
      <path d="M 138 247 Q 169 253 203 246" fill="none" stroke={shadow} strokeWidth="1.1" opacity="0.35" />

      {/* Thumb nail */}
      <g transform="translate(75 125) rotate(-32)">
        {t.hasClaws ? (
          <>
            <path d="M -8 12 Q -6 -8 0 -25 Q 6 -8 8 12 Q 0 16 -8 12 Z" fill={t.nailColor} stroke="#21160f" strokeWidth="0.8" />
          </>
        ) : (
          <>
            <path d="M -7 0 Q -8 -9 0 -10 Q 8 -9 7 0 L 7 12 Q 0 16 -7 12 Z" fill={t.nailColor} stroke={shade(t.nailColor, -25)} strokeWidth="0.7" />
            <path d="M -5 10 Q 0 7 5 10" stroke="#fff4e9" strokeWidth="1.2" opacity="0.4" fill="none" />
          </>
        )}
      </g>

      {/* Finger nails */}
      {fingers.map((finger, i) => {
        const cx = finger.x + finger.width / 2;
        const joint = finger.top + (finger.joint - finger.top) * 0.55;
        return (
          <g key={`finger-${i}`}>
            <path
              d={`M ${finger.x + 4} ${joint} Q ${cx} ${joint + 3} ${finger.x + finger.width - 4} ${joint}`}
              fill="none" stroke={shadow} strokeWidth="0.8" opacity="0.4"
            />
            {t.hasClaws ? (
              <path
                d={`M ${cx - 8} ${finger.top + 20} Q ${cx - 5} ${finger.top - 8} ${cx} ${finger.top - 21} Q ${cx + 5} ${finger.top - 8} ${cx + 8} ${finger.top + 20} Z`}
                fill={t.nailColor} stroke="#21160f" strokeWidth="0.9"
              />
            ) : (
              <>
                <path
                  d={`M ${cx - 7} ${finger.top + 10} Q ${cx} ${finger.top + 2} ${cx + 7} ${finger.top + 10} L ${cx + 7} ${finger.top + 24} Q ${cx} ${finger.top + 28} ${cx - 7} ${finger.top + 24} Z`}
                  fill={t.nailColor} stroke={shade(t.nailColor, -25)} strokeWidth="0.7"
                />
                <path
                  d={`M ${cx - 5} ${finger.top + 23} Q ${cx} ${finger.top + 18} ${cx + 5} ${finger.top + 23}`}
                  fill="none" stroke="#fff4e9" strokeWidth="1.2" opacity="0.45"
                />
                {t.dirtyNails && (
                  <path
                    d={`M ${cx - 6.5} ${finger.top + 10} Q ${cx} ${finger.top + 3.5} ${cx + 6.5} ${finger.top + 10} L ${cx + 6} ${finger.top + 13.5} L ${cx} ${finger.top + 12.8} L ${cx - 6.5} ${finger.top + 13} Z`}
                    fill="#34291d" opacity="0.95"
                  />
                )}
              </>
            )}
          </g>
        );
      })}

      <path d="M 137 263 Q 170 269 203 262 L 207 280 L 133 280 Z" fill="#302923" stroke="#524538" strokeWidth="1" />
      </g>

      {/* Glove body: accurately matches 5 or 6 digits! */}
      {t.wearsGloves && open < 1 && (
        <g transform={`translate(0 ${-open * 290})`}>
          <defs>
            <linearGradient id={`${id}-gloveGrad`} x1="0%" y1="0%" x2="100%" y2="25%">
              <stop offset="0%" stopColor={gloveDark} />
              <stop offset="42%" stopColor={gloveBase} />
              <stop offset="68%" stopColor={gloveLight} />
              <stop offset="100%" stopColor={gloveDark} />
            </linearGradient>
          </defs>
          <path
            d={outline}
            fill={`url(#${id}-gloveGrad)`}
            stroke={gloveDark}
            strokeWidth="2.4"
          />
          {fingers.map((fg, i) => {
            const cx = fg.x + fg.width / 2;
            return (
              <g key={`glove-finger-${i}`}>
                <path
                  d={`M ${fg.x + 3} ${fg.top + 14} Q ${cx} ${fg.top + 4} ${fg.x + fg.width - 3} ${fg.top + 14}`}
                  fill="none"
                  stroke={gloveLight}
                  strokeWidth="0.9"
                  strokeDasharray="2 1.5"
                  opacity="0.55"
                />
              </g>
            );
          })}
          {/* Raised ribs on back of the glove */}
          {[
            'M 142 150 L 149 224',
            'M 164 146 L 166 228',
            'M 186 150 L 182 224',
          ].map((rib, i) => (
            <g key={`rib-${i}`}>
              <path d={rib} stroke={gloveDark} strokeWidth="2.6" strokeLinecap="round" />
            </g>
          ))}
          <path
            d="M 134 242 Q 170 250 206 242 L 205 262 Q 170 269 135 262 Z"
            fill={gloveDark}
            stroke={gloveLight}
            strokeWidth="0.9"
          />
          <circle cx="182" cy="251" r="3.5" fill="#9a8255" stroke="#3b2f1d" strokeWidth="0.8" />
        </g>
      )}
      </g>
      </defs>

      <use href={`#${id}-hand`} transform="matrix(-1 0 0 1 255 22)" />
      <use href={`#${id}-hand`} transform="translate(205 22)" />
      <g fill="#bda585" fontFamily="Georgia, serif" fontSize="9" letterSpacing="1" textAnchor="middle">
        <text x="105" y="13">ПРАВАЯ РУКА {has6Fingers ? '(6 ПАЛЬЦЕВ)' : ''}</text>
        <text x="355" y="13">ЛЕВАЯ РУКА {has6Fingers ? '(6 ПАЛЬЦЕВ)' : ''}</text>
      </g>
    </svg>
  );
}

function SkinZoomView({ t }: { t: Traits }) {
  const skin = t.paleSkin ? '#d9d0c8' : t.skinTone;
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      <defs>
        <radialGradient id="skinLight" cx="30%" cy="30%" r="80%">
          <stop offset="0%" stopColor={shade(skin, 15)} />
          <stop offset="100%" stopColor={shade(skin, -20)} />
        </radialGradient>
      </defs>
      <rect width="300" height="200" fill="url(#skinLight)" />
      {Array.from({ length: 40 }).map((_, i) => {
        const x = ((i * 73) % 290) + 5;
        const y = ((i * 41) % 190) + 5;
        return <circle key={i} cx={x} cy={y} r="0.8" fill={shade(skin, -30)} opacity="0.4" />;
      })}

      {t.bodyHair !== 'smooth' && Array.from({ length: t.bodyHair === 'long' ? 150 : 120 }, (_, i) => {
        const x = ((i * 37) % 276) + 12;
        const y = ((i * 53) % 163) + 8;
        const long = t.bodyHair === 'long';
        const length = long ? 15 + (i % 8) : 2 + (i % 3) * 0.8;
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="0.75" fill="#806048" opacity="0.35" />
            <path
              d={`M${x} ${y} Q${x + Math.sin(i) * (long ? 7 : 1)} ${y + length * 0.65} ${x + Math.sin(i) * (long ? 9 : 1.4)} ${y + length}`}
              stroke="#483324" strokeWidth={long ? 0.85 : 1.1} fill="none" strokeLinecap="round" opacity={long ? 0.82 : 0.72}
            />
          </g>
        );
      })}

      {t.hasScales && (
        <g opacity="0.85">
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 15 }).map((_, col) => {
              const x = col * 22 + (row % 2 === 0 ? 0 : 11);
              const y = row * 15;
              return (
                <path
                  key={`${row}-${col}`}
                  d={`M ${x} ${y} Q ${x + 11} ${y - 6} ${x + 22} ${y} Q ${x + 11} ${y + 8} ${x} ${y} Z`}
                  fill="none"
                  stroke="#2a5a70"
                  strokeWidth="0.7"
                  opacity="0.6"
                />
              );
            })
          )}
          <rect width="300" height="200" fill="#4a90a0" opacity="0.15" />
        </g>
      )}

      {t.paleSkin && !t.hasFur && !t.hasScales && (
        <>
          <path d="M 40 100 Q 100 90 160 110 Q 220 100 280 105" stroke="#4060a0" strokeWidth="1.5" fill="none" opacity="0.45" />
          <path d="M 60 140 Q 130 130 200 150" stroke="#4060a0" strokeWidth="1.2" fill="none" opacity="0.35" />
        </>
      )}
    </svg>
  );
}

export const EyeZoom = memo(EyeZoomView);
export const TeethZoom = memo(TeethZoomView);
export const NailsZoom = memo(NailsZoomView);
export const SkinZoom = memo(SkinZoomView);
