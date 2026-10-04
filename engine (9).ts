import { memo, useId } from 'react';
import { bounded, tone, type Layer, type PosterHeadwearDef, type PosterSettings } from './types';

/**
 * 1930–1940 Headdresses & Hats from the poster:
 * - Redesigned to be deeply authentic to the illustration (proportions, textures, plumes, bows).
 * - Proper front & back layers so hats sit ON the head naturally.
 */
export const POSTER_HEADWEAR: PosterHeadwearDef[] = [
  // ── 1. Снуды и петли ──
  { id: 'headgear-poster-1938-snood-cord', name: 'Снуд из шнура', year: 1938, kind: 'cord', bbox: [90, 10, 120, 151], description: 'Тонкая ромбовидная сетка с узелками; волосы видны между ячейками.', position: 'Снуд 1938' },
  { id: 'headgear-poster-1938-snood-ribbon', name: 'Снуд из ленты', year: 1938, kind: 'ribbon', bbox: [90, 10, 120, 151], description: 'Более широкое переплетение лент с мягким атласным бликом.', position: 'Снуд 1938' },
  { id: 'headgear-poster-1938-snood-chenille', name: 'Синельный снуд', year: 1938, kind: 'chenille', bbox: [90, 10, 120, 151], description: 'Плотные бархатистые нити и мягкий край. Вариант материала из подписи к постеру.', position: 'Снуд 1938' },
  { id: 'headgear-poster-1939-satin-loops', name: 'Атласные петли «Инфанты»', year: 1939, kind: 'satin-loops', bbox: [80, 17, 140, 142], description: 'Отдельное украшение по подписи Balenciaga: вытянутые петли по бокам, цвет не зависит от волос.', position: 'Инфанта 1939' },

  // ── 2. Головные уборы с листа 1930-1940 ──
  { id: 'headgear-poster-1939-burnt-toast', name: '«Burnt Toast» соломенная канотье', year: 1939, kind: 'sailor', color: '#d1ab73', accent: '#f7f4ec', bbox: [72, -4, 156, 80], position: 'Верхний левый (Bruyère)', description: 'Соломенная шляпа-канотье с бантом в горошек, розой и шёлковым шарфом вокруг шеи. Bruyère, 1939.' },
  { id: 'headgear-poster-1938-persian-toque', name: 'Ток из каракуля с вимплом-вуалью', year: 1938, kind: 'toque', color: '#1a1817', accent: '#262422', bbox: [82, 0, 136, 150], position: 'Верхний правый (1938)', description: 'Маленький ток из чёрного каракуля с широкой драпированной вуалью-вимплом из жоржета вокруг всей шеи.' },
  { id: 'headgear-poster-1938-dolls-hat', name: '«Doll’s Hat» Schiaparelli с пером и розой', year: 1938, kind: 'doll', color: '#161413', accent: '#e8a5b8', bbox: [88, -20, 124, 96], position: 'Второй ряд слева (Schiaparelli)', description: 'Крошечная кукольная шапочка с розой-капустой, чёрным страусиным пером и бархатной лентой под подбородком.' },
  { id: 'headgear-poster-1939-cossack', name: 'Казачья папаха Rose Valois', year: 1939, kind: 'cossack', color: '#1c1a18', accent: '#d4af37', bbox: [88, -8, 124, 88], position: 'Средний правый (Rose Valois)', description: 'Высокая асимметричная папаха из каракуля с характерным заломом назад и золотым ожерельем у горла.' },
  { id: 'headgear-poster-1939-plush-toque', name: 'Красный плюшевый ток с пером-пером', year: 1939, kind: 'plush', color: '#8c2430', accent: '#181414', bbox: [80, -32, 140, 108], position: 'Нижний левый (Suzy)', description: 'Красный плюшевый ток с огромным вертикальным пером-шпагой (quill), кручёными шнурами, кистями и бантом.' },
  { id: 'headgear-poster-1939-topper', name: 'Жёсткий цилиндр Rose Valois', year: 1939, kind: 'topper', color: '#8f2832', accent: '#1c1919', bbox: [84, -10, 132, 88], position: 'Центр снизу (Rose Valois)', description: 'Жёсткий красный фетровый цилиндр с расширяющейся тульей, загнутыми полями и чёрной репсовой лентой.' },
  { id: 'headgear-poster-1937-self-tied-turban', name: 'Шёлковый тюрбан self-tied', year: 1937, kind: 'turban', color: '#252e42', accent: '#baa177', bbox: [88, 6, 124, 68], position: 'Низ слева (1937)', description: 'Мягкий тюрбан диагонального плетения со швом на затылке по точной выкройке с постера.' },
  { id: 'headgear-poster-1939-shako', name: 'Бархатный шако Patou с петушиными перьями', year: 1939, kind: 'shako', color: '#181514', accent: '#c9a24b', bbox: [86, -26, 128, 102], position: 'Нижний правый (Patou)', description: 'Чёрный бархатный шако с пышным фонтаном изогнутых петушиных перьев, рвущихся вверх-вперёд.' },
  { id: 'headgear-poster-1939-velvet-snood', name: 'Бархатный снуд-капюшон Suzy', year: 1939, kind: 'snood-hood', color: '#8b242e', accent: '#b83b48', bbox: [82, 4, 136, 150], position: 'Низ по центру (Suzy)', description: 'Красный бархатный снуд-капюшон со структурированным бантом на макушке, драпирующийся по плечам.' },

  // ── 3. Аксессуары и головные уборы по отдельному референсу ──
  { id: 'headgear-poster-acc-aviator-goggles', name: 'Лётные очки-гогглы', year: 1939, kind: 'goggles', category: 'headgear', color: '#201b18', accent: '#7a7062', bbox: [94, 24, 112, 44], position: 'Головной убор / Очки', description: 'Мотоциклетно-лётные очки со стеклами, металлической оправой и аккуратными тонкими ушками, посаженные на лоб.' },
  { id: 'acc-poster-carbuncle', name: 'Карбункул на лбу', year: 1939, kind: 'forehead-gem', category: 'accessories', color: '#b81c28', accent: '#d4af37', bbox: [132, 46, 36, 22], position: 'Аксессуар (лоб)', description: 'Гранёный красный рубиновый камень-карбункул в золотой оправе, надетый по центру лба.' },
];

const BAG = 'M109 44C107 25 128 18 150 20C175 18 194 31 193 51C205 71 210 105 197 128C187 147 169 150 150 149C130 150 110 142 102 128C90 108 94 73 109 44Z';
const SIDES = 'M106 52C93 69 91 104 102 128C107 139 119 145 132 147L135 136C117 130 110 113 111 96C110 79 111 65 117 54Z M194 52C207 69 209 104 198 128C193 139 181 145 168 147L165 136C183 130 190 113 189 96C190 79 189 65 183 54Z';
const RIM = 'M109 64C106 39 123 23 149 23C176 21 195 38 191 64';

export function posterHatTransform(face: PosterSettings = {}): string {
  const scale = bounded(face.hatScale, 100, 55, 165) / 100;
  const width = bounded(face.hatWidth, 100, 55, 165) / 100;
  const rotation = bounded(face.hatRotation, 0, 0, 360);
  return `translate(150 44) scale(${face.hatMirrored ? -1 : 1} 1) rotate(${rotation}) scale(${scale * width} ${scale}) translate(-150 -44)`;
}

/* ── 1. Снуд сетка ── */
function NetSnood({ item, layer, face, uid }: { item: PosterHeadwearDef; layer: Layer; face: PosterSettings; uid: string }) {
  const color = face.posterHatColor || '#382d27';
  const ribbon = face.posterRibbonColor || face.ribbonColor || '#bda175';
  const hair = face.posterHairColor || 'var(--hair, #4a3222)';
  const spacing = bounded(face.posterSnoodSpacing, 100, 70, 140) / 100 * 9;
  const opacity = bounded(face.posterSnoodOpacity, 92, 20, 100) / 100;
  const width = item.kind === 'ribbon' ? 2.1 : item.kind === 'chenille' ? 2.35 : 0.85;
  const d = layer === 'back' ? BAG : SIDES;
  return (
    <g>
      <defs>
        <clipPath id={`${uid}-bag`}><path d={d} /></clipPath>
        <pattern id={`${uid}-net`} width={spacing} height={spacing * 1.4} patternUnits="userSpaceOnUse">
          <path d={`M${-spacing / 2} 0L${spacing / 2} ${spacing * 1.4}L${spacing * 1.5} 0M${-spacing / 2} ${spacing * 1.4}L${spacing / 2} 0L${spacing * 1.5} ${spacing * 1.4}`} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
          {item.kind === 'cord' && <circle cx={spacing / 2} cy="0" r="1.15" fill={color} />}
          {item.kind === 'ribbon' && <path d={`M${-spacing / 2 + 0.35} 0L${spacing / 2 + 0.35} ${spacing * 1.4}M${spacing / 2 + 0.35} 0L${spacing * 1.5 + 0.35} ${spacing * 1.4}`} fill="none" stroke={tone(color, 0.48)} strokeWidth="0.45" opacity="0.7" />}
          {item.kind === 'chenille' && <path d={`M${-spacing / 2} 0L${spacing / 2} ${spacing * 1.4}L${spacing * 1.5} 0M${-spacing / 2} ${spacing * 1.4}L${spacing / 2} 0L${spacing * 1.5} ${spacing * 1.4}`} fill="none" stroke={tone(color, 0.24)} strokeWidth="3.8" strokeDasharray="0.25 1.25" opacity="0.5" />}
        </pattern>
        <linearGradient id={`${uid}-bag-shade`} x1="0%" y1="0%" x2="85%" y2="100%">
          <stop offset="0" stopColor={tone(hair, 0.08)} />
          <stop offset="1" stopColor={tone(hair, -0.35)} />
        </linearGradient>
      </defs>
      {layer === 'back' && <path d={BAG} fill={`url(#${uid}-bag-shade)`} />}
      <g clipPath={`url(#${uid}-bag)`}>
        {layer === 'back' && Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${102 + i * 8} 41C${90 + i * 10} 80 ${95 + i * 9} 112 ${126 + i * 4} 147`} stroke={tone(hair, -0.5)} strokeWidth="0.45" fill="none" opacity="0.5" />
        ))}
        <path d={d} fill={`url(#${uid}-net)`} opacity={opacity} />
      </g>
      <path d={d} fill="none" stroke={color} strokeWidth={item.kind === 'chenille' ? 2 : 1.2} opacity={opacity} />
      {layer === 'front' && (
        <g>
          <path d={RIM} fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" />
          <path d={RIM} fill="none" stroke={tone(color, 0.32)} strokeWidth="0.55" />
          <g transform="translate(111 54) rotate(-25)">
            <path d="M0 0C-13 -10 -14 7 0 2C13 -10 15 7 0 2Z" fill={ribbon} stroke={tone(ribbon, -0.3)} strokeWidth="0.55" />
            <path d="M-1 2Q-7 10 -6 15M1 2Q8 8 6 13" fill="none" stroke={ribbon} strokeWidth="2.8" />
            <ellipse rx="2" ry="3" fill={tone(ribbon, -0.2)} />
          </g>
        </g>
      )}
    </g>
  );
}

/* ── 2. Атласные петли Инфанты ── */
function SatinLoops({ layer, color, uid }: { layer: Layer; color: string; uid: string }) {
  const rings = Array.from({ length: layer === 'back' ? 6 : 4 }, (_, i) => {
    const x = layer === 'back' ? 99 + (i % 2) * 7 : 111 + (i % 2) * 4;
    const y = 41 + i * 11;
    const h = 26 - i * 1.4;
    return { x, y, h, rotation: -8 + i * 3 };
  });
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-satin`} x1="0%" y1="0%" x2="100%" y2="30%">
          <stop offset="0" stopColor={tone(color, -0.42)} /><stop offset="0.4" stopColor={color} /><stop offset="0.56" stopColor={tone(color, 0.48)} /><stop offset="0.78" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.45)} />
        </linearGradient>
      </defs>
      {[false, true].map((mirror) => (
        <g key={String(mirror)} transform={mirror ? 'translate(300 0) scale(-1 1)' : undefined}>
          {rings.map(({ x, y, h, rotation }, i) => (
            <g key={i} transform={`translate(${x} ${y}) rotate(${rotation})`}>
              <path d={`M0 0C-8 3 -8 ${h - 1} -2 ${h}C5 ${h + 2} 7 6 0 0ZM-0.4 5C3 8 2 ${h - 3} -1.5 ${h - 4}C-5 ${h - 5} -4 9 -0.4 5Z`} fill={`url(#${uid}-satin)`} fillRule="evenodd" stroke={tone(color, -0.4)} strokeWidth="0.22" />
              <path d={`M-2 3C-7 8 -6 ${h - 4} -2 ${h - 1}`} fill="none" stroke={tone(color, 0.58)} strokeWidth="0.48" opacity="0.75" />
            </g>
          ))}
        </g>
      ))}
    </g>
  );
}

/* ── Текстура каракуля (Persian lamb / astrakhan) ── */
function AstrakhanDef({ uid, color }: { uid: string; color: string }) {
  return (
    <defs>
      <pattern id={`${uid}-karakul`} width="6" height="6" patternUnits="userSpaceOnUse">
        <path d="M1 3C1.5 1.5 3 1.5 3.5 3C4 4.5 5.5 4.5 5 2.5" fill="none" stroke={tone(color, 0.28)} strokeWidth="0.75" strokeLinecap="round" />
        <path d="M0.5 4.5C1 5.5 2.5 5.5 3 4.5" fill="none" stroke={tone(color, -0.32)} strokeWidth="0.5" strokeLinecap="round" />
      </pattern>
    </defs>
  );
}

/* ── 3. Bruyère 1939: «Burnt Toast» соломенная канотье ── */
function SailorHat({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <ellipse cx="150" cy="50" rx="66" ry="11" fill={tone(color, -0.3)} stroke={tone(color, -0.5)} strokeWidth="0.8" />
        <path d="M112 46C114 24 130 14 150 14C170 14 186 24 188 46Z" fill={tone(color, -0.35)} />
      </g>
    );
  }
  return (
    <g transform="translate(-4 -2) rotate(-5 150 48)">
      <defs>
        <linearGradient id={`${uid}-straw`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.32)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.32)} />
        </linearGradient>
        <pattern id={`${uid}-dots`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.3" fill="#1b1816" />
        </pattern>
      </defs>

      {/* Поля канотье с текстурой соломенных кругов */}
      <ellipse cx="150" cy="52" rx="72" ry="14" fill={`url(#${uid}-straw)`} stroke={tone(color, -0.45)} strokeWidth="0.8" />
      <ellipse cx="150" cy="50" rx="69" ry="11" fill="none" stroke={tone(color, -0.2)} strokeWidth="0.6" strokeDasharray="3 2" />
      <ellipse cx="150" cy="48" rx="65" ry="9" fill="none" stroke={tone(color, 0.25)} strokeWidth="0.6" />

      {/* Плоская цилиндрическая тулья */}
      <path d="M116 48C116 22 130 12 150 12C170 12 184 22 184 48C184 56 168 60 150 60C132 60 116 56 116 48Z" fill={`url(#${uid}-straw)`} stroke={tone(color, -0.48)} strokeWidth="0.85" strokeLinejoin="round" />
      <path d="M120 34C134 18 166 18 180 34C166 26 134 26 120 34Z" fill={tone(color, 0.35)} opacity="0.65" />

      {/* Трёхцветная шёлковая лента (синий, белый, красный) */}
      <path d="M116 46C132 55 168 55 184 46L184 52C168 61 132 61 116 52Z" fill="#203a6b" />
      <path d="M116 48C132 57 168 57 184 48L184 51C168 60 132 60 116 51Z" fill="#f7f4ec" />
      <path d="M116 50C132 59 168 59 184 50L184 52C168 61 132 61 116 52Z" fill="#9c242c" />

      {/* Огромный бант в горошек на левой стороне тульи */}
      <g transform="translate(112 36) rotate(-22)">
        <path d="M0 0C-16 -16 -24 -4 -18 8C-10 16 0 8 0 0ZM0 0C16 -16 24 -4 18 8C10 16 0 8 0 0Z" fill={accent} stroke="#2b2522" strokeWidth="0.6" />
        <path d="M0 0C-16 -16 -24 -4 -18 8C-10 16 0 8 0 0ZM0 0C16 -16 24 -4 18 8C-10 16 0 8 0 0Z" fill={`url(#${uid}-dots)`} opacity="0.85" />
        <ellipse rx="3.5" ry="4.5" fill="#1b1816" />
      </g>
    </g>
  );
}

/* ── 4. 1938: Ток из каракуля с вимплом-вуалью ── */
function PersianToqueWithWimple({ color, layer, uid }: { color: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <AstrakhanDef uid={uid} color={color} />
        {/* Задняя часть толка */}
        <path d="M118 42C116 22 130 12 150 12C170 12 184 22 182 42C180 52 166 56 150 56C134 56 120 52 118 42Z" fill={color} />
        <path d="M118 42C116 22 130 12 150 12C170 12 184 22 182 42C180 52 166 56 150 56C134 56 120 52 118 42Z" fill={`url(#${uid}-karakul)`} />

        {/* Пышный жоржетовый вимпл, обнимающий затылок и плечи */}
        <path d="M106 48C94 76 92 116 104 150C116 162 184 162 196 150C208 116 206 76 194 48Z" fill={tone(color, 0.08)} opacity="0.94" stroke={tone(color, -0.35)} strokeWidth="0.6" />
        {/* Вертикальные драпировочные складки */}
        {[-36, -24, -12, 0, 12, 24, 36].map((dx, i) => (
          <path key={i} d={`M${150 + dx} 52C${150 + dx * 1.15} 90 ${150 + dx * 1.25} 128 ${150 + dx * 1.1} 154`} fill="none" stroke={tone(color, -0.32)} strokeWidth="1.2" opacity="0.6" />
        ))}
      </g>
    );
  }

  return (
    <g>
      <AstrakhanDef uid={uid} color={color} />
      {/* Маленький плотный ток на макушке */}
      <path d="M120 44C118 24 132 12 150 12C168 12 182 24 180 44C178 52 166 56 150 56C134 56 122 52 120 44Z" fill={color} stroke={tone(color, -0.45)} strokeWidth="0.8" />
      <path d="M120 44C118 24 132 12 150 12C168 12 182 24 180 44C178 52 166 56 150 56C134 56 122 52 120 44Z" fill={`url(#${uid}-karakul)`} />
      <path d="M126 30C136 18 164 18 174 30C164 24 136 24 126 30Z" fill={tone(color, 0.35)} opacity="0.4" />

      {/* Драпированные края вимпла, обрамляющие щёки и шею спереди */}
      <path d="M108 50C98 74 96 106 106 136C112 144 126 142 128 132C120 114 118 84 122 58Z" fill={tone(color, 0.05)} stroke={tone(color, -0.35)} strokeWidth="0.6" />
      <path d="M192 50C202 74 204 106 194 136C188 144 174 142 172 132C180 114 182 84 178 58Z" fill={tone(color, 0.05)} stroke={tone(color, -0.35)} strokeWidth="0.6" />

      {/* Складки ткани вимпла вокруг лица */}
      <path d="M112 56C106 82 108 112 118 134" fill="none" stroke={tone(color, 0.3)} strokeWidth="0.9" opacity="0.5" />
      <path d="M188 56C194 82 192 112 182 134" fill="none" stroke={tone(color, 0.3)} strokeWidth="0.9" opacity="0.5" />
    </g>
  );
}

/* ── 5. Schiaparelli 1938: «Doll's Hat» с пером и розой-капустой ── */
function DollsHat({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        {/* Бархатная лента вокруг затылка */}
        <path d="M118 64C120 44 134 36 150 36C166 36 180 44 182 64" fill="none" stroke={tone(color, -0.4)} strokeWidth="3.2" strokeLinecap="round" />
        {/* Страусиное перо, уходящее назад */}
        <path d="M142 22C140 -2 152 -18 168 -24C158 -16 150 0 152 20" fill={tone(color, -0.3)} opacity="0.8" />
      </g>
    );
  }

  return (
    <g transform="translate(-8 -4) rotate(-14 150 38)">
      <defs>
        <linearGradient id={`${uid}-doll-felt`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.28)} /><stop offset="1" stopColor={tone(color, -0.4)} />
        </linearGradient>
      </defs>

      {/* Длинное изогнутое страусиное перо, рвущееся вверх-назад */}
      <g transform="translate(136 16) rotate(-28)">
        <path d="M0 0C-4 -20 6 -42 22 -54C12 -38 6 -16 0 0Z" fill={tone(color, 0.1)} stroke={tone(color, -0.45)} strokeWidth="0.6" />
        <path d="M0 0C-4 -20 6 -42 22 -54" fill="none" stroke={tone(color, 0.45)} strokeWidth="0.9" strokeLinecap="round" />
        {/* Бородки страусиного пера */}
        {[-12, -22, -32, -42].map((y, i) => (
          <path key={i} d={`M${i * 3} ${y}Q${i * 4 - 8} ${y - 4} ${i * 5 - 12} ${y + 2}`} fill="none" stroke={tone(color, 0.35)} strokeWidth="0.7" opacity="0.7" />
        ))}
      </g>

      {/* Крошечная кукольная шапочка-таблетка */}
      <ellipse cx="150" cy="42" rx="22" ry="7" fill={tone(color, -0.2)} stroke={tone(color, -0.45)} strokeWidth="0.6" />
      <path d="M130 40C130 24 138 16 150 16C162 16 170 24 170 40C170 46 160 50 150 50C140 50 130 46 130 40Z" fill={`url(#${uid}-doll-felt)`} stroke={tone(color, -0.5)} strokeWidth="0.75" />

      {/* Огромная пышная роза-капуста (pink cabbage rose) */}
      <g transform="translate(164 28)">
        <circle r="9" fill={accent} stroke={tone(accent, -0.35)} strokeWidth="0.6" />
        <circle r="6.2" fill={tone(accent, 0.2)} />
        <circle r="3.8" fill={tone(accent, -0.15)} />
        <circle r="1.6" fill="#fff" opacity="0.7" />
        <path d="M-6 0C-4 -5 4 -5 6 0C4 5 -4 5 -6 0Z" fill="none" stroke={tone(accent, -0.3)} strokeWidth="0.6" />
      </g>

      {/* Бархатная лента, завязывающаяся под подбородком */}
      <path d="M136 46C130 68 132 94 144 112" fill="none" stroke={tone(color, -0.4)} strokeWidth="2.8" strokeLinecap="round" />
      <path d="M164 46C170 68 168 94 156 112" fill="none" stroke={tone(color, -0.4)} strokeWidth="2.8" strokeLinecap="round" />
      {/* Бант под подбородком */}
      <g transform="translate(150 114)">
        <path d="M0 0C-10 -8 -16 2 -10 8C-4 12 0 4 0 0ZM0 0C10 -8 16 2 10 8C4 12 0 4 0 0Z" fill={tone(color, -0.3)} stroke={tone(color, -0.5)} strokeWidth="0.5" />
        <circle r="2" fill={tone(color, -0.5)} />
        <path d="M-2 4L-8 18M2 4L8 18" stroke={tone(color, -0.35)} strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ── 6. Rose Valois 1939: Казачья папаха с золотым ожерельем ── */
function CossackCap({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <AstrakhanDef uid={uid} color={color} />
        {/* Высокий скошенный купол папахи назад */}
        <path d="M118 48C114 18 126 -6 152 -8C174 -10 188 16 184 48Z" fill={color} />
        <path d="M118 48C114 18 126 -6 152 -8C174 -10 188 16 184 48Z" fill={`url(#${uid}-karakul)`} />
      </g>
    );
  }

  return (
    <g transform="translate(2 -2) rotate(4 150 36)">
      <AstrakhanDef uid={uid} color={color} />
      {/* Высокая папаха с асимметричным заломом на правый бок */}
      <path d="M118 52C114 20 126 -6 152 -8C176 -10 188 14 184 52C180 62 166 66 150 66C134 66 120 62 118 52Z" fill={color} stroke={tone(color, -0.5)} strokeWidth="0.85" />
      <path d="M118 52C114 20 126 -6 152 -8C176 -10 188 14 184 52C180 62 166 66 150 66C134 66 120 62 118 52Z" fill={`url(#${uid}-karakul)`} />

      {/* Залом по диагонали каракуля */}
      <path d="M128 22C142 16 164 12 178 26" fill="none" stroke={tone(color, -0.45)} strokeWidth="2.4" opacity="0.8" />
      <path d="M126 34C140 22 168 20 178 36" fill="none" stroke={tone(color, 0.35)} strokeWidth="1.2" opacity="0.5" />

      {/* Золотое бусинное ожерелье на шее (Rose Valois) */}
      <g transform="translate(0 76)">
        <path d="M124 38C136 50 164 50 176 38" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        <path d="M122 44C136 58 164 58 178 44" fill="none" stroke={accent} strokeWidth="2.2" strokeLinecap="round" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const t = i / 7;
          const x = 124 + t * 52;
          const y = 38 + Math.sin(t * Math.PI) * 11;
          return <circle key={i} cx={x} cy={y} r="2.2" fill={tone(accent, 0.2)} stroke={tone(accent, -0.3)} strokeWidth="0.4" />;
        })}
      </g>
    </g>
  );
}

/* ── 7. Suzy 1939: Красный плюшевый ток с пером-шпагой (quill) ── */
function PlushToqueQuill({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <path d="M122 46C120 26 132 14 150 14C168 14 180 26 178 46Z" fill={tone(color, -0.3)} />
        {/* Задняя часть длинного пера-шпаги */}
        <path d="M128 14C122 -18 116 -46 108 -68" fill="none" stroke={tone(accent, -0.3)} strokeWidth="4.5" strokeLinecap="round" />
      </g>
    );
  }

  return (
    <g transform="translate(-4 -2) rotate(-8 150 40)">
      <defs>
        <linearGradient id={`${uid}-plush-red`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.35)} /><stop offset="0.45" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.35)} />
        </linearGradient>
      </defs>

      {/* Огромное прямое перо-шпага (black quill), рвущееся высоко вверх */}
      <g transform="translate(126 16)">
        <path d="M0 0C-6 -32 -14 -64 -22 -92C-10 -74 -4 -38 0 0Z" fill={accent} stroke={tone(accent, 0.4)} strokeWidth="0.6" />
        <path d="M0 0C-6 -32 -14 -64 -22 -92" fill="none" stroke={tone(accent, 0.65)} strokeWidth="1.2" strokeLinecap="round" />
        {/* Текстура бороздок пера */}
        {[-20, -40, -60, -80].map((y, i) => (
          <path key={i} d={`M${i * -2.5} ${y}L${i * -2.5 - 6} ${y - 4}`} stroke={tone(accent, 0.3)} strokeWidth="0.7" opacity="0.6" />
        ))}
      </g>

      {/* Плюшевый красный ток, надетый на лоб */}
      <path d="M122 48C120 26 132 12 150 12C168 12 180 26 178 48C176 58 164 62 150 62C136 62 124 58 122 48Z" fill={`url(#${uid}-plush-red)`} stroke={tone(color, -0.5)} strokeWidth="0.8" />
      <path d="M128 34C138 22 162 22 172 34C162 28 138 28 128 34Z" fill={tone(color, 0.35)} opacity="0.6" />

      {/* Чёрные шёлковые кручёные шнуры и висячие кисти */}
      <path d="M124 44C138 52 162 52 176 44" fill="none" stroke={accent} strokeWidth="3" strokeDasharray="3 1.5" />
      <g transform="translate(174 46)">
        <circle r="3" fill={accent} />
        <path d="M-1 3L-4 22M2 3L4 22M0 3L0 24" stroke={accent} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="0" cy="22" r="1.8" fill={tone(accent, 0.3)} />
      </g>

      {/* Большой шёлковый бант на шее */}
      <g transform="translate(150 118)">
        <path d="M0 0C-16 -12 -28 4 -16 12C-6 16 0 6 0 0ZM0 0C16 -12 28 4 16 12C6 16 0 6 0 0Z" fill="#f4efdf" stroke="#b0a894" strokeWidth="0.6" />
        <ellipse rx="3.5" ry="4" fill="#ddd5c2" />
        <path d="M-3 6L-12 28M3 6L12 28" stroke="#f4efdf" strokeWidth="4.5" strokeLinecap="round" />
      </g>
    </g>
  );
}

/* ── 8. Rose Valois 1939: Жёсткий красный цилиндр ── */
function TopperRoseValois({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <ellipse cx="150" cy="48" rx="54" ry="10" fill={tone(color, -0.35)} />
        <path d="M126 46C124 16 134 0 150 0C166 0 176 16 174 46Z" fill={tone(color, -0.3)} />
      </g>
    );
  }

  return (
    <g transform="translate(2 -4) rotate(6 150 44)">
      <defs>
        <linearGradient id={`${uid}-topper-red`} x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.35)} /><stop offset="0.45" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.35)} />
        </linearGradient>
      </defs>

      {/* Загнутые вверх поля */}
      <ellipse cx="150" cy="52" rx="58" ry="11" fill={color} stroke={tone(color, -0.45)} strokeWidth="0.8" />
      <ellipse cx="150" cy="50" rx="56" ry="8" fill={tone(color, 0.15)} opacity="0.4" />

      {/* Высокая расширяющаяся кверху тулья (flared top hat) */}
      <path d="M126 50C124 20 132 -2 150 -2C168 -2 176 20 174 50C174 58 162 60 150 60C138 60 126 58 126 50Z" fill={`url(#${uid}-topper-red)`} stroke={tone(color, -0.5)} strokeWidth="0.85" />
      <path d="M130 22C138 6 162 6 170 22C162 14 138 14 130 22Z" fill={tone(color, 0.4)} opacity="0.6" />

      {/* Чёрная репсовая лента (grosgrain ribbon) с широким бантом */}
      <path d="M126 46C138 52 162 52 174 46L174 52C162 58 138 58 126 52Z" fill={accent} />
      <path d="M126 46C138 52 162 52 174 46" fill="none" stroke={tone(accent, 0.4)} strokeWidth="0.6" />

      <g transform="translate(172 48) rotate(8)">
        <path d="M0 0C10 -10 18 -4 14 6C10 12 2 6 0 0Z" fill={accent} stroke={tone(accent, 0.3)} strokeWidth="0.5" />
        <path d="M0 0C-6 -8 -12 -2 -8 6C-5 10 0 5 0 0Z" fill={tone(accent, 0.15)} stroke={tone(accent, 0.3)} strokeWidth="0.5" />
        <circle r="2.2" fill={tone(accent, 0.2)} />
      </g>
    </g>
  );
}

/* ── 9. 1937: Шёлковый самозавязывающийся тюрбан ── */
function SelfTiedTurban({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <path d="M116 52C114 30 128 16 150 16C172 16 186 30 184 52C180 62 166 66 150 66C134 66 120 62 116 52Z" fill={tone(color, -0.28)} />
        {/* Центральный задний шов по выкройке с постера */}
        <path d="M150 16L150 66" stroke={tone(color, -0.45)} strokeWidth="1.2" strokeDasharray="2 1.5" />
      </g>
    );
  }

  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-turban-silk`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.35)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.32)} />
        </linearGradient>
      </defs>

      {/* Мягкая основа тюрбана, полностью закрывающая линию роста волос */}
      <path d="M114 56C112 30 128 14 150 14C172 14 188 30 186 56C182 68 166 70 150 70C134 70 118 68 114 56Z" fill={`url(#${uid}-turban-silk)`} stroke={tone(color, -0.45)} strokeWidth="0.8" />

      {/* Диагональные концентрические складки ткани */}
      <path d="M116 52C132 38 156 34 180 40C186 46 184 54 182 58C166 50 144 48 126 54C118 56 116 54 116 52Z" fill={tone(color, -0.2)} opacity="0.8" />
      <path d="M118 44C134 32 162 32 182 44C172 36 138 36 122 44Z" fill={tone(color, 0.3)} opacity="0.6" />
      <path d="M116 60C136 50 164 50 184 60" fill="none" stroke={tone(color, -0.35)} strokeWidth="1.4" opacity="0.65" />
      <path d="M120 38C138 24 162 24 180 38" fill="none" stroke={tone(color, 0.25)} strokeWidth="0.8" opacity="0.7" />

      {/* Центральный передний узел-перехлёст */}
      <g transform="translate(150 36)">
        <path d="M0 0C-12 -12 -22 -4 -16 8C-10 14 -2 8 0 0ZM0 0C12 -12 22 -4 16 8C10 14 2 8 0 0Z" fill={tone(color, 0.12)} stroke={tone(color, -0.38)} strokeWidth="0.6" />
        <ellipse rx="4.5" ry="3.5" fill={color} stroke={tone(color, -0.4)} strokeWidth="0.5" />
        <circle r="1.5" fill={accent} />
      </g>
    </g>
  );
}

/* ── 10. Patou 1939: Чёрный бархатный шако с петушиными перьями ── */
function ShakoPatou({ color, layer, uid }: { color: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <path d="M124 50C122 22 134 6 150 6C166 6 178 22 176 50Z" fill={tone(color, -0.35)} />
        {/* Перья, идущие назад */}
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${140 + i * 7} 8C${138 + i * 6} -14 ${144 + i * 8} -32 ${148 + i * 9} -46`} fill="none" stroke={tone(color, 0.15)} strokeWidth="2.8" strokeLinecap="round" opacity="0.75" />
        ))}
      </g>
    );
  }

  return (
    <g transform="translate(4 -4) rotate(8 150 42)">
      <defs>
        <linearGradient id={`${uid}-shako-velvet`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor={tone(color, 0.3)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.38)} />
        </linearGradient>
      </defs>

      {/* Высокий конический бархатный корпус шако */}
      <path d="M126 54C124 22 136 6 150 6C164 6 176 22 174 54C172 64 160 68 150 68C140 68 128 64 126 54Z" fill={`url(#${uid}-shako-velvet)`} stroke={tone(color, -0.5)} strokeWidth="0.85" />
      <path d="M130 30C138 14 162 14 170 30C162 22 138 22 130 30Z" fill={tone(color, 0.35)} opacity="0.6" />

      {/* Пышный фонтан изогнутых петушиных перьев, рвущихся вверх-вперёд */}
      <g transform="translate(144 14)">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const spread = (i - 3) * 6;
          return (
            <g key={i}>
              <path d={`M${spread * 0.8} 0C${spread * 1.2} -24 ${spread * 1.8 - 10} -48 ${spread * 2 - 18} -68`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
              <path d={`M${spread * 0.8} 0C${spread * 1.2} -24 ${spread * 1.8 - 10} -48 ${spread * 2 - 18} -68`} fill="none" stroke={tone(color, 0.45)} strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
            </g>
          );
        })}
      </g>

      {/* Золотая эмблема спереди */}
      <circle cx="150" cy="38" r="3.6" fill="#d4af37" stroke="#8a6e2e" strokeWidth="0.5" />
      <circle cx="150" cy="38" r="1.5" fill="#fff" opacity="0.8" />
    </g>
  );
}

/* ── 11. Suzy 1939: Красный бархатный снуд-капюшон ── */
function VelvetSnoodHood({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        <defs>
          <linearGradient id={`${uid}-velvet-drape`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0" stopColor={tone(color, 0.15)} /><stop offset="0.5" stopColor={color} /><stop offset="1" stopColor={tone(color, -0.38)} />
          </linearGradient>
        </defs>

        {/* Обширный драпированный капюшон-снуд, падающий вокруг шеи и плеч */}
        <path d="M102 46C90 74 88 116 98 148C110 164 190 164 202 148C212 116 210 74 198 46C186 32 114 32 102 46Z" fill={`url(#${uid}-velvet-drape)`} stroke={tone(color, -0.45)} strokeWidth="0.75" />

        {/* Богатые складки бархатной ткани */}
        {[-38, -26, -14, 0, 14, 26, 38].map((dx, i) => (
          <path key={i} d={`M${150 + dx} 48C${150 + dx * 1.15} 84 ${150 + dx * 1.25} 120 ${150 + dx * 1.1} 154`} fill="none" stroke={tone(color, -0.35)} strokeWidth="1.4" opacity="0.7" />
        ))}
        {[-32, -18, 0, 18, 32].map((dx, i) => (
          <path key={i} d={`M${150 + dx} 52C${150 + dx * 1.1} 86 ${150 + dx * 1.2} 122 ${150 + dx * 1.05} 150`} fill="none" stroke={tone(color, 0.35)} strokeWidth="0.7" opacity="0.55" />
        ))}
      </g>
    );
  }

  return (
    <g>
      {/* Боковые драпировки бархата спереди */}
      <path d="M104 48C94 72 94 104 102 134C110 142 122 140 124 130C118 110 116 80 120 54Z" fill={color} stroke={tone(color, -0.4)} strokeWidth="0.6" />
      <path d="M196 48C206 72 206 104 198 134C190 142 178 140 176 130C182 110 184 80 180 54Z" fill={color} stroke={tone(color, -0.4)} strokeWidth="0.6" />

      {/* Большой структурированный бархатный бант на макушке головы */}
      <g transform="translate(150 28)">
        <path d="M0 0C-18 -16 -28 -2 -18 8C-8 14 0 6 0 0ZM0 0C18 -16 28 -2 18 8C8 14 0 6 0 0Z" fill={accent} stroke={tone(accent, -0.45)} strokeWidth="0.75" />
        <path d="M0 0C-16 -12 -22 -2 -16 6ZM0 0C16 -12 22 -2 16 6" fill="none" stroke={tone(accent, 0.35)} strokeWidth="0.8" />
        <ellipse rx="4" ry="4.5" fill={tone(accent, -0.25)} />
      </g>
    </g>
  );
}

/* ── 12. Лётные очки-гогглы, посаженные на лоб (без верхней дуги, с тонкими ушками) ── */
function AviatorGoggles({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') {
    return (
      <g>
        {/* Боковой ремень за головой */}
        <path d="M104 38C96 44 94 56 98 68L106 65C102 54 104 46 112 41Z" fill={tone(accent, -0.4)} />
        <path d="M196 38C204 44 206 56 202 68L194 65C198 54 196 46 188 41Z" fill={tone(accent, -0.4)} />
      </g>
    );
  }

  const lens = (
    <>
      {/* Мягкая прокладка / корпус очков */}
      <ellipse rx="22" ry="15" fill={tone(color, -0.15)} stroke={tone(color, -0.5)} strokeWidth="0.8" />
      <ellipse rx="20" ry="13.2" fill={tone(color, 0.15)} />
      {/* Металлический ободок и выпуклое стекло */}
      <ellipse rx="18.2" ry="11.8" fill={`url(#${uid}-glass)`} stroke={tone(color, -0.42)} strokeWidth="1.2" />
      {/* Блики и отражения */}
      <path d="M-14 -4C-10 -9.5 -2 -10.5 5 -7.5C-2 -7.5 -8.5 -4 -12 1.5Z" fill="#ffffff" opacity="0.65" />
      <path d="M3 5C7.5 2.5 11 -0.5 13 -3.5C13 1 9 4.8 4 6.5Z" fill="#ffffff" opacity="0.25" />
      <ellipse rx="18.2" ry="11.8" fill="none" stroke="#ffffff" strokeWidth="0.4" opacity="0.75" />
    </>
  );

  return (
    <g transform="translate(0 -2)">
      <defs>
        <linearGradient id={`${uid}-glass`} x1="10%" y1="5%" x2="90%" y2="95%">
          <stop offset="0" stopColor="#f7faf8" />
          <stop offset="0.28" stopColor="#d2dddb" />
          <stop offset="0.7" stopColor="#879997" />
          <stop offset="1" stopColor="#4f5e5c" />
        </linearGradient>
        <linearGradient id={`${uid}-strap`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0" stopColor={tone(accent, -0.3)} />
          <stop offset="0.5" stopColor={accent} />
          <stop offset="1" stopColor={tone(accent, -0.3)} />
        </linearGradient>
      </defs>

      {/* Тонкие эластичные боковые ремешки, уходящие за виски (без дуги над макушкой!) */}
      <path d="M106 39C102 39 98 42 96 46L98 49C101 46 104 43 108 43Z" fill={`url(#${uid}-strap)`} />
      <path d="M194 39C198 39 202 42 204 46L202 49C199 46 196 43 192 43Z" fill={`url(#${uid}-strap)`} />

      {/* Тонкие металлические шарнирные ушки по бокам очков */}
      <g transform="translate(106 41)">
        <rect x="-1" y="-4.5" width="3" height="9" rx="1.2" fill={tone(color, 0.45)} stroke={tone(color, -0.4)} strokeWidth="0.4" />
        <circle cx="0.5" cy="0" r="1.1" fill={tone(color, -0.2)} />
      </g>
      <g transform="translate(194 41)">
        <rect x="-2" y="-4.5" width="3" height="9" rx="1.2" fill={tone(color, 0.45)} stroke={tone(color, -0.4)} strokeWidth="0.4" />
        <circle cx="-0.5" cy="0" r="1.1" fill={tone(color, -0.2)} />
      </g>

      {/* Окуляры очков (левый и правый) */}
      <g transform="translate(128 40) rotate(-6)">{lens}</g>
      <g transform="translate(172 40) rotate(6)">{lens}</g>

      {/* Тонкая металлическая переносица с шарниром/винтом */}
      <path d="M144 40C147 37.5 153 37.5 156 40C153 42.5 147 42.5 144 40Z" fill={tone(color, 0.35)} stroke={tone(color, -0.45)} strokeWidth="0.5" />
      <circle cx="150" cy="40" r="1.5" fill={tone(color, -0.1)} />
      <circle cx="150" cy="40" r="0.6" fill="#ffffff" opacity="0.8" />
    </g>
  );
}

/* ── 13. Карбункл: гранёный камень на лбу ── */
function ForeheadCarbuncle({ color, accent, layer, uid }: { color: string; accent: string; layer: Layer; uid: string }) {
  if (layer === 'back') return null;
  return (
    <g transform="translate(150 57)">
      <defs>
        <radialGradient id={`${uid}-gem`} cx="40%" cy="32%" r="72%">
          <stop offset="0" stopColor={tone(color, 0.6)} />
          <stop offset="0.4" stopColor={tone(color, 0.12)} />
          <stop offset="0.78" stopColor={color} />
          <stop offset="1" stopColor={tone(color, -0.5)} />
        </radialGradient>
      </defs>

      {/* Металлическая оправа */}
      <ellipse rx="14.6" ry="9.6" fill={tone(accent, -0.28)} />
      <ellipse rx="13.6" ry="8.8" fill={tone(accent, 0.15)} />
      <ellipse rx="12.8" ry="8.1" fill={tone(accent, -0.35)} />

      {/* Сам камень */}
      <ellipse rx="12.2" ry="7.5" fill={`url(#${uid}-gem)`} stroke={tone(color, -0.55)} strokeWidth="0.6" />

      {/* Грани огранки */}
      <path d="M-12.2 0Q-6 -4.4 0 -4.9Q6 -4.4 12.2 0Q6 4.4 0 4.9Q-6 4.4 -12.2 0Z" fill="none" stroke={tone(color, 0.35)} strokeWidth="0.55" opacity="0.65" />
      <path d="M-6.6 -2.6L-2.6 0L-6.6 2.6M6.6 -2.6L2.6 0L6.6 2.6" fill="none" stroke={tone(color, -0.4)} strokeWidth="0.5" opacity="0.72" />
      <path d="M0 -4.9L0 4.9" stroke={tone(color, -0.35)} strokeWidth="0.4" opacity="0.4" />

      {/* Блики */}
      <ellipse cx="-4.2" cy="-2.7" rx="3.7" ry="1.7" fill="#ffffff" opacity="0.6" transform="rotate(-16 -4.2 -2.7)" />
      <ellipse cx="4.6" cy="2.5" rx="2.1" ry="0.95" fill="#ffffff" opacity="0.26" />

      {/* Крапаны оправы */}
      {[-11.5, 0, 11.5].map((x, i) => (
        <circle key={i} cx={x} cy={i === 1 ? -7.9 : 0} r="1.5" fill={tone(accent, 0.3)} stroke={tone(accent, -0.4)} strokeWidth="0.4" />
      ))}
      <circle cx="0" cy="7.9" r="1.5" fill={tone(accent, 0.3)} stroke={tone(accent, -0.4)} strokeWidth="0.4" />
    </g>
  );
}

/* ── Диспетчер отрисовки головных уборов ── */
function StructuredHat({ item, layer, face, uid }: { item: PosterHeadwearDef; layer: Layer; face: PosterSettings; uid: string }) {
  const color = face.posterHatColor || item.color || '#1c1917';
  const accent = face.posterRibbonColor || face.ribbonColor || item.accent || '#c9a24b';
  switch (item.kind) {
    case 'sailor': return <SailorHat color={color} accent={accent} layer={layer} uid={uid} />;
    case 'toque': return <PersianToqueWithWimple color={color} layer={layer} uid={uid} />;
    case 'doll': return <DollsHat color={color} accent={accent} layer={layer} uid={uid} />;
    case 'cossack': return <CossackCap color={color} accent={accent} layer={layer} uid={uid} />;
    case 'plush': return <PlushToqueQuill color={color} accent={accent} layer={layer} uid={uid} />;
    case 'topper': return <TopperRoseValois color={color} accent={accent} layer={layer} uid={uid} />;
    case 'turban': return <SelfTiedTurban color={color} accent={accent} layer={layer} uid={uid} />;
    case 'shako': return <ShakoPatou color={color} layer={layer} uid={uid} />;
    case 'snood-hood': return <VelvetSnoodHood color={color} accent={accent} layer={layer} uid={uid} />;
    case 'goggles': return <AviatorGoggles color={color} accent={accent} layer={layer} uid={uid} />;
    case 'forehead-gem': return <ForeheadCarbuncle color={color} accent={accent} layer={layer} uid={uid} />;
    default: return null;
  }
}

export const PosterHeadwear = memo(function PosterHeadwear({ id, layer = 'front', face = {}, applyFit = false }: {
  id: string; layer?: Layer; face?: PosterSettings; applyFit?: boolean;
}) {
  const uid = `poster-hat-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const item = POSTER_HEADWEAR.find((entry) => entry.id === id);
  if (!item) return null;
  const ribbon = face.posterRibbonColor || face.ribbonColor || item.accent || '#bda175';
  const transform = applyFit ? posterHatTransform(face) : undefined;
  const snood = item.kind === 'cord' || item.kind === 'ribbon' || item.kind === 'chenille';
  return (
    <g data-poster-headwear={id} data-layer={layer} transform={transform}>
      {item.kind === 'satin-loops' && <SatinLoops layer={layer} uid={uid} color={ribbon} />}
      {snood && <NetSnood item={item} layer={layer} face={face} uid={uid} />}
      {!snood && item.kind !== 'satin-loops' && <StructuredHat item={item} layer={layer} face={face} uid={uid} />}
    </g>
  );
});

