import type { Traits } from './Portrait';
import { SkinZoom } from './InspectionViews';
import type { Conversation } from '../game/conversation';
import type { VisitorSpeech } from '../game/useVisitorSpeech';
import { VisitorText } from './VisitorSpeech';
import './DentalInspection.css';

export function BodyHairInspection({ traits, name, conversation, speech, disabled, paused }: {
  traits: Traits; name: string; conversation: Conversation; speech: VisitorSpeech; disabled: boolean; paused: boolean;
}) {
  const labels = { smooth: 'ГЛАДКАЯ КОЖА', stubble: 'КОРОТКАЯ ЩЕТИНА', long: 'ДЛИННЫЕ ВОЛОСЫ' };
  return (
    <section className="dental-inspection" aria-label="Осмотр кожи и вопрос о волосах">
      <div className="dental-image">
        <SkinZoom t={traits} />
        <div className="dental-state">{labels[traits.bodyHair]}</div>
      </div>
      <div className="dental-conversation">
        <div className="dental-conversation__heading">ВОПРОС ПОСЕТИТЕЛЮ</div>
        {conversation.lines.length > 0 && (
          <div className="dental-log" role="log" aria-live="polite">
            {conversation.lines.map((line, i) => (
              <div key={i} className={`dental-line dental-line--${line.speaker}`}>
                <span className="dental-line__speaker">{line.speaker === 'clerk' ? 'КЛЕРК' : name}</span><p>{line.speaker === 'visitor' ? <VisitorText text={line.text} speech={speech} /> : line.text}</p>
              </div>
            ))}
            {conversation.phase === 'waiting' && <div className="dental-waiting">Посетитель обдумывает ответ…</div>}
          </div>
        )}
        {conversation.phase === 'unasked' && (
          <button className="metal-btn dental-choice" disabled={disabled || paused} onClick={conversation.request}>
            {traits.bodyHair === 'smooth' ? 'Спросить о бритье' : 'Спросить о волосах'}
          </button>
        )}
      </div>
    </section>
  );
}
