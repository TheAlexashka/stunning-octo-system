import type { VisitorSpeech } from '../game/useVisitorSpeech';
import './VisitorSpeech.css';

// The hidden full line reserves its final height, so typewriting never moves
// the portrait or the question buttons as individual characters appear.
export function VisitorText({ text, speech }: { text: string; speech: VisitorSpeech }) {
  const typing = text === speech.text && speech.speaking;
  if (!typing) return <>{text}</>;
  return (
    <span className="visitor-typewriter">
      <span className="visitor-typewriter__reserve" aria-hidden="true">{text}</span>
      <span className="visitor-typewriter__visible" aria-hidden="true">{speech.visibleText}<span className="visitor-typewriter__cursor" /></span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

export function SpeechControls({ speech, paused, disabled, onAskVoice, asked }: {
  speech: VisitorSpeech; paused: boolean; disabled: boolean; onAskVoice: () => void; asked: boolean;
}) {
  return (
    <div className="speech-controls">
      <button type="button" onClick={speech.speaking ? speech.finish : speech.replay} disabled={paused || disabled}>
        <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M3 8h3l4-3v10l-4-3H3zM13 7q4 3 0 6" /></svg>
        {speech.speaking ? 'Показать целиком' : 'Послушать ещё'}
      </button>
      <button type="button" onClick={onAskVoice} disabled={paused || disabled || speech.speaking} aria-pressed={asked}>
        Спросить о голосе
      </button>
    </div>
  );
}
