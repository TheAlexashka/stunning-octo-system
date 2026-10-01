import { useEffect, useRef, type ReactNode } from 'react';
import type { Traits } from './Portrait';
import { EyeZoom, NailsZoom, TeethZoom } from './InspectionViews';
import type { DentalConversation } from '../game/dentalDialogue';
import type { VisitorSpeech } from '../game/useVisitorSpeech';
import { VisitorText } from './VisitorSpeech';
import { EyeSelector, type EyeSide } from './EyeSelector';
import './DentalInspection.css';

export function DialogInspectionLayout({
  ariaLabel,
  heading,
  badgeClosed,
  badgeOpen,
  requestButtonLabel,
  refusalText,
  visual,
  name,
  conversation,
  speech,
  paused,
  disabled,
  onBack,
  tallVisual = false,
  visualControls,
}: {
  ariaLabel: string;
  heading: string;
  badgeClosed: string;
  badgeOpen: string;
  requestButtonLabel: string;
  refusalText: string;
  visual: ReactNode;
  name: string;
  conversation: DentalConversation;
  speech: VisitorSpeech;
  paused: boolean;
  disabled: boolean;
  onBack: () => void;
  tallVisual?: boolean;
  visualControls?: ReactNode;
}) {
  const { phase, lines, used, request, respond } = conversation;
  const accepted = phase === 'accepted';
  const busy = phase === 'waiting';
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [lines.length]);

  return (
    <section className="dental-inspection" aria-label={ariaLabel}>
      {visualControls}
      <div className={`dental-image${tallVisual ? ' dental-image--hands' : ''}`}>
        {visual}
        <div className={`dental-state${accepted ? ' dental-state--open' : ''}`}>
          {accepted ? badgeOpen : badgeClosed}
        </div>
      </div>
      <div className="dental-conversation">
        <div className="dental-conversation__heading">{heading}</div>
        <div className="dental-log" ref={logRef} role="log" aria-live="polite" aria-relevant="additions">
          {lines.map((line, index) => (
            <div className={`dental-line dental-line--${line.speaker}`} key={index}>
              <span className="dental-line__speaker">{line.speaker === 'clerk' ? 'КЛЕРК' : name}</span>
              <p>{line.speaker === 'visitor' ? <VisitorText text={line.text} speech={speech} /> : line.text}</p>
            </div>
          ))}
          {busy && <div className="dental-waiting" role="status">Посетитель обдумывает ответ…</div>}
        </div>

        {phase === 'unasked' && (
          <button className="metal-btn dental-choice" onClick={request} disabled={disabled || paused}>
            {requestButtonLabel}
          </button>
        )}
        {phase === 'hesitant' && (
          <div className="dental-choices">
            {!used.reassure && (
              <button className="metal-btn dental-choice" onClick={() => respond('reassure')} disabled={disabled || paused}>
                Объяснить спокойно
              </button>
            )}
            {!used.insist && (
              <button className="metal-btn dental-choice" onClick={() => respond('insist')} disabled={disabled || paused}>
                Напомнить о правилах
              </button>
            )}
          </div>
        )}
        {phase === 'refused' && (
          <p className="dental-refusal">{refusalText}</p>
        )}
        {!accepted && (
          <button className="dental-back" onClick={onBack} disabled={disabled || paused}>
            Вернуться к другим проверкам
          </button>
        )}
      </div>
    </section>
  );
}

export function DentalInspection({ traits, name, conversation, speech, paused, disabled, onBack }: {
  traits: Traits;
  name: string;
  conversation: DentalConversation;
  speech: VisitorSpeech;
  paused: boolean;
  disabled: boolean;
  onBack: () => void;
}) {
  const accepted = conversation.phase === 'accepted';
  return (
    <DialogInspectionLayout
      ariaLabel="Разговор перед осмотром зубов"
      heading="ОСМОТР ЗУБОВ · ДИАЛОГ"
      badgeClosed="РОТ ЗАКРЫТ"
      badgeOpen="СОГЛАСИЕ ПОЛУЧЕНО"
      requestButtonLabel="Попросить открыть рот"
      refusalText="Согласия нет. Проверьте другие признаки — отказ сам по себе не доказывает, что перед вами нежить."
      visual={<TeethZoom t={traits} opened={accepted} paused={paused} />}
      name={name}
      conversation={conversation}
      speech={speech}
      paused={paused}
      disabled={disabled}
      onBack={onBack}
    />
  );
}

export function GlassesInspection({
  traits,
  name,
  conversation,
  speech,
  paused,
  disabled,
  onBack,
  eyeSide,
  onEyeSide,
  checkedEyes,
  onAskSclera,
  onAskShape,
  scleraAsked,
  shapeAsked,
  flashlightOn,
  onToggleFlashlight,
}: {
  traits: Traits;
  name: string;
  conversation: DentalConversation;
  speech: VisitorSpeech;
  paused: boolean;
  disabled: boolean;
  onBack: () => void;
  eyeSide: EyeSide;
  onEyeSide: (side: EyeSide) => void;
  checkedEyes: EyeSide[];
  onAskSclera?: () => void;
  onAskShape?: () => void;
  scleraAsked?: boolean;
  shapeAsked?: boolean;
  flashlightOn?: boolean;
  onToggleFlashlight?: () => void;
}) {
  const accepted = conversation.phase === 'accepted';
  return (
    <DialogInspectionLayout
      ariaLabel="Разговор с просьбой снять очки"
      heading="ОСМОТР ГЛАЗ · ОЧКИ"
      badgeClosed="ОЧКИ НАДЕТЫ"
      badgeOpen="ОЧКИ СНЯТЫ"
      requestButtonLabel="Попросить снять очки"
      refusalText="Посетитель отказался снимать очки. Проверьте зубы, руки и кожу."
      visual={
        <EyeZoom
          key={eyeSide}
          t={traits}
          side={eyeSide}
          opened={accepted}
          paused={paused || disabled}
          animateGlassesRemoval={!accepted || !checkedEyes.some((side) => side !== eyeSide)}
          flashlightOn={flashlightOn && accepted}
        />
      }
      visualControls={
        <EyeSelector
          side={eyeSide}
          onChange={onEyeSide}
          checked={checkedEyes}
          disabled={disabled || paused}
          onAskSclera={accepted ? onAskSclera : undefined}
          onAskShape={accepted ? onAskShape : undefined}
          scleraAsked={scleraAsked}
          shapeAsked={shapeAsked}
          isBloodshot={traits.bloodshotSclera}
          flashlightOn={flashlightOn}
          onToggleFlashlight={accepted ? onToggleFlashlight : undefined}
          showFlashlight={accepted}
        />
      }
      name={name}
      conversation={conversation}
      speech={speech}
      paused={paused}
      disabled={disabled}
      onBack={onBack}
    />
  );
}

export function GlovesInspection({ traits, name, conversation, speech, paused, disabled, onBack }: {
  traits: Traits;
  name: string;
  conversation: DentalConversation;
  speech: VisitorSpeech;
  paused: boolean;
  disabled: boolean;
  onBack: () => void;
}) {
  const accepted = conversation.phase === 'accepted';
  return (
    <DialogInspectionLayout
      ariaLabel="Разговор с просьбой снять перчатки"
      heading="ОСМОТР РУК · ПЕРЧАТКИ"
      badgeClosed="ПЕРЧАТКИ НАДЕТЫ"
      badgeOpen="ПЕРЧАТКИ СНЯТЫ"
      requestButtonLabel="Попросить снять перчатки"
      refusalText="Посетитель отказался снимать перчатки. Проверьте глаза, зубы и кожу."
      visual={<NailsZoom t={traits} opened={accepted} paused={paused} />}
      name={name}
      conversation={conversation}
      speech={speech}
      paused={paused}
      disabled={disabled}
      onBack={onBack}
      tallVisual
    />
  );
}
