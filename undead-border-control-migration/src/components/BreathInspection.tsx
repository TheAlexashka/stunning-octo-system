import { memo, useEffect, useId } from 'react';
import type { BreathResult } from '../game/visitors';
import type { Conversation } from '../game/conversation';
import type { VisitorSpeech } from '../game/useVisitorSpeech';
import { useInspectionOpening } from '../game/useInspectionOpening';
import { DialogInspectionLayout } from './DentalInspection';
import './BreathInspection.css';

export function BreathInspection({ result, name, conversation, speech, paused, disabled, onBack, initialProgress, onProgress }: {
  result: BreathResult; name: string; conversation: Conversation; speech: VisitorSpeech;
  paused: boolean; disabled: boolean; onBack: () => void;
  initialProgress: number; onProgress: (value: number) => void;
}) {
  const accepted = conversation.phase === 'accepted';
  return (
    <DialogInspectionLayout
      ariaLabel="Проба дыхания на стекле" heading="ДЫХАНИЕ · ОДИН ВЫДОХ НА СТЕКЛО"
      badgeClosed={conversation.phase === 'refused' ? 'ПРОБА НЕ ВЫПОЛНЕНА' : 'ОЖИДАЕМ СОГЛАСИЯ'}
      badgeOpen="ПРОБА ДЫХАНИЯ" requestButtonLabel="Попросить дыхнуть на стекло"
      refusalText="Посетитель не дал согласия. Отсутствие пробы — не то же самое, что сухое стекло после выдоха. Проверьте другие признаки."
      visual={<BreathGlass result={result} opened={accepted} paused={paused || disabled} initialProgress={initialProgress} onProgress={onProgress} />}
      name={name} conversation={conversation} speech={speech} paused={paused} disabled={disabled} onBack={onBack}
    />
  );
}

const BreathGlass = memo(function BreathGlass({ result, opened, paused, initialProgress, onProgress }: {
  result: BreathResult; opened: boolean; paused: boolean; initialProgress: number; onProgress: (value: number) => void;
}) {
  const id = useId().replace(/:/g, '');
  const progress = useInspectionOpening(opened, paused, 2600, initialProgress);
  useEffect(() => { onProgress(progress); }, [progress, onProgress]);
  const fog = result !== 'dry' ? Math.min(1, progress / 0.64) : 0;
  const drops = result === 'droplets' ? Math.max(0, (progress - 0.45) / 0.55) : 0;
  const observation = !opened ? 'Проба ещё не выполнена.' : progress < 1 ? 'Посетитель выдыхает на стекло...'
    : result === 'dry' ? 'После выдоха видимого следа нет.'
      : result === 'droplets' ? 'Стекло запотело. На нём остались капли.' : 'На стекле появился матовый след.';

  return (
    <>
      <svg viewBox="0 0 320 215" className="breath-glass" role="img" aria-label={observation}>
        <defs>
          <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#37413c" /><stop offset="48%" stopColor="#17201e" /><stop offset="100%" stopColor="#4a4c3d" />
          </linearGradient>
          <radialGradient id={`${id}-condensation`}>
            <stop offset="0%" stopColor="#e2e9df" stopOpacity="0.9" /><stop offset="55%" stopColor="#bdccc4" stopOpacity="0.7" /><stop offset="100%" stopColor="#9fb1a9" stopOpacity="0" />
          </radialGradient>
          <filter id={`${id}-soft`}><feGaussianBlur stdDeviation="3" /></filter>
          <clipPath id={`${id}-pane`}><rect x="20" y="19" width="280" height="175" rx="1" /></clipPath>
        </defs>
        <rect width="320" height="215" fill="#201912" />
        <rect x="12" y="11" width="296" height="192" fill="#4b4030" stroke="#847158" strokeWidth="1" />
        <rect x="20" y="19" width="280" height="175" fill={`url(#${id}-glass)`} stroke="#0b0e0c" strokeWidth="2" />
        <g clipPath={`url(#${id}-pane)`}>
          <g opacity="0.2" stroke="#bbcaac" fill="none"><path d="M28 85 Q70 60 118 82 T270 71" strokeWidth="3" /><path d="M52 151 H278" strokeWidth="6" /></g>
          <path d="M36 18 L78 18 L31 194 L20 194 Z" fill="#e0e9d8" opacity="0.095" />
          <path d="M108 19 L126 19 L82 194 L69 194 Z" fill="#e0e9d8" opacity="0.06" />
          <path d="M181 23 L176 29 M211 154 L203 168 M30 109 L35 116" stroke="#ccd6bc" strokeWidth="0.7" opacity="0.22" />
          <ellipse cx="158" cy="100" rx={18 + fog * 84} ry={8 + fog * 50} fill={`url(#${id}-condensation)`} opacity={fog * 0.8} filter={`url(#${id}-soft)`} />
          <ellipse cx="148" cy="105" rx={12 + fog * 55} ry={5 + fog * 33} fill={`url(#${id}-condensation)`} opacity={fog * 0.32} />
          {Array.from({ length: 60 }, (_, i) => (
            <circle key={`mist-${i}`} cx={83 + i * 29 % 151} cy={60 + i * 17 % 86} r={0.3 + i % 3 * 0.25} fill="#e6eee7" opacity={fog * (0.12 + i % 3 * 0.08)} />
          ))}
          {Array.from({ length: 10 }, (_, i) => {
            const x = 97 + i * 43 % 126;
            const y = 72 + i * 23 % 51 + drops * (i % 3) * 7;
            const r = 2.3 + i % 3 * 1.25;
            return (
              <g key={`drop-${i}`} opacity={drops}>
                <path d={`M${x} ${y - r * 2.7} Q${x - r * 1.5} ${y - r * 0.1} ${x - r} ${y + r} Q${x} ${y + r * 2.2} ${x + r} ${y + r} Q${x + r * 1.5} ${y - r * 0.1} ${x} ${y - r * 2.7} Z`} fill="#94c8c3" fillOpacity="0.6" stroke="#d5ece4" strokeWidth="0.75" />
                <path d={`M${x - r * 0.45} ${y - r * 0.4} l-0.5 ${r}`} stroke="#fff" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
                <path d={`M${x} ${y - r * 2.7} V${y - r * 2.7 - drops * 8}`} stroke="#9cb8ad" strokeWidth="0.65" opacity="0.3" />
              </g>
            );
          })}
        </g>
        {[[15, 15], [305, 15], [15, 200], [305, 200]].map(([x, y]) => (
          <g key={`${x}-${y}`}><circle cx={x} cy={y} r="2.3" fill="#9c8b6c" /><path d={`M${x - 1.3} ${y + 0.8} l2.6 -1.6`} stroke="#332719" strokeWidth="0.8" /></g>
        ))}
      </svg>
      <div className="breath-observation" role="status">{observation}</div>
    </>
  );
});
