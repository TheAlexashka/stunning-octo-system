export const GLASSES_STYLES = ['round', 'tinted', 'hornRimmed', 'pinceNez'] as const;
export type GlassesStyle = (typeof GLASSES_STYLES)[number];

export const GLOVE_STYLES = ['leather', 'wool', 'dress'] as const;
export type GloveStyle = (typeof GLOVE_STYLES)[number];

// Renders period 1940s spectacles on the 200x240 portrait.
// While worn, the lenses have dark tint or strong reflection glare so the
// clerk cannot read eye colour or pupil shape without asking to remove them.
export function PortraitGlasses({ style, uid }: { style: GlassesStyle; uid: string }) {
  const isTinted = style === 'tinted';
  const isHorn = style === 'hornRimmed';
  const isPince = style === 'pinceNez';

  const frameColor = isHorn ? '#24160e' : isPince ? '#8b734b' : '#4a3f32';
  const frameStroke = isHorn ? 2.8 : isPince ? 1.2 : 1.65;
  const lensFill = isTinted ? '#161110' : '#c9d2cc';
  const lensOpacity = isTinted ? 0.92 : 0.82;

  return (
    <g aria-label="Очки">
      <defs>
        <linearGradient id={`${uid}-glass-lens`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isTinted ? '#2b201d' : '#eef3ef'} stopOpacity={lensOpacity} />
          <stop offset="48%" stopColor={lensFill} stopOpacity={lensOpacity} />
          <stop offset="100%" stopColor={isTinted ? '#0d0908' : '#7d8a84'} stopOpacity={lensOpacity + 0.08} />
        </linearGradient>
      </defs>

      {/* Temples (side arms) going back to the ears, except for pince-nez */}
      {!isPince && (
        <g stroke={frameColor} strokeWidth={isHorn ? 2.3 : 1.3} strokeLinecap="round" fill="none">
          <path d="M 62 107 L 50 112" />
          <path d="M 138 107 L 150 112" />
        </g>
      )}

      {/* Pince-nez cord on the right side */}
      {isPince && (
        <path
          d="M 137 110 Q 144 138 136 190"
          fill="none"
          stroke="#6e5a3a"
          strokeWidth="0.85"
          strokeDasharray="1.5 1"
          opacity="0.8"
        />
      )}

      {/* Left and right lenses */}
      {[77, 123].map((cx) => (
        <g key={cx}>
          {/* Subtle shadow under frame */}
          <ellipse
            cx={cx}
            cy="110.5"
            rx={isPince ? 14 : 15}
            ry={isPince ? 10.5 : isHorn ? 12 : 13}
            fill="#0b0806"
            opacity="0.28"
          />

          {/* Opaque/glaring lens hiding the iris and pupil */}
          <ellipse
            cx={cx}
            cy="109"
            rx={isPince ? 13.8 : 14.6}
            ry={isPince ? 10.2 : isHorn ? 11.6 : 12.6}
            fill={`url(#${uid}-glass-lens)`}
            stroke={frameColor}
            strokeWidth={frameStroke}
          />

          {/* Extra thick upper brow rim for horn-rimmed glasses */}
          {isHorn && (
            <path
              d={`M ${cx - 15.2} 106 C ${cx - 10} 95 ${cx + 10} 95 ${cx + 15.2} 106`}
              fill="none"
              stroke="#190f09"
              strokeWidth="3.6"
              strokeLinecap="round"
            />
          )}

          {/* Strong reflection glare streaks across the lens */}
          <path
            d={`M ${cx - 9} 101 L ${cx - 2} 101 L ${cx - 7} 116 L ${cx - 11} 116 Z`}
            fill="#ffffff"
            opacity={isTinted ? 0.32 : 0.58}
          />
          <path
            d={`M ${cx + 1} 101 L ${cx + 4} 101 L ${cx - 1} 116 L ${cx - 3.5} 116 Z`}
            fill="#ffffff"
            opacity={isTinted ? 0.2 : 0.4}
          />
        </g>
      ))}

      {/* Nose bridge */}
      {isPince ? (
        <>
          <path d="M 90.5 106 Q 100 98 109.5 106" fill="none" stroke={frameColor} strokeWidth="1.4" />
          <ellipse cx="92" cy="108" rx="1.2" ry="2.2" fill={frameColor} />
          <ellipse cx="108" cy="108" rx="1.2" ry="2.2" fill={frameColor} />
        </>
      ) : (
        <path
          d="M 91.5 107 Q 100 102 108.5 107"
          fill="none"
          stroke={frameColor}
          strokeWidth={isHorn ? 2.6 : 1.6}
          strokeLinecap="round"
        />
      )}
    </g>
  );
}
