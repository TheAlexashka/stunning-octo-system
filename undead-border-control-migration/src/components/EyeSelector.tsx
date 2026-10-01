import './InspectionExtras.css';

export type EyeSide = 'right' | 'left';

export function EyeSelector({
  side,
  onChange,
  checked,
  disabled,
  onAskSclera,
  onAskShape,
  scleraAsked,
  shapeAsked,
  isBloodshot,
  flashlightOn,
  onToggleFlashlight,
  showFlashlight = true,
}: {
  side: EyeSide;
  onChange: (side: EyeSide) => void;
  checked: EyeSide[];
  disabled: boolean;
  onAskSclera?: () => void;
  onAskShape?: () => void;
  scleraAsked?: boolean;
  shapeAsked?: boolean;
  isBloodshot?: boolean;
  flashlightOn?: boolean;
  onToggleFlashlight?: () => void;
  showFlashlight?: boolean;
}) {
  return (
    <div className="eye-selection">
      <div className="eye-selection__buttons" aria-label="Какой глаз осмотреть">
        {(['right', 'left'] as const).map((value) => (
          <button
            type="button"
            key={value}
            className={`metal-btn eye-side${side === value ? ' is-active' : ''}`}
            aria-pressed={side === value}
            disabled={disabled}
            onClick={() => onChange(value)}
          >
            <span>{value === 'right' ? 'Правый глаз' : 'Левый глаз'}</span>
            <small>{checked.includes(value) ? 'осмотрен' : 'осмотреть'}</small>
          </button>
        ))}
      </div>

      <div className="eye-questions-row">
        {showFlashlight && onToggleFlashlight && (
          <button
            type="button"
            className={`metal-btn eye-question-btn eye-flashlight-btn${flashlightOn ? ' eye-question-btn--alert' : ''}`}
            onClick={onToggleFlashlight}
            disabled={disabled}
            aria-pressed={!!flashlightOn}
            title="Посветить фонариком в глаз для проверки реакции зрачка"
          >
            <svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <path d="m3 13 4 4 6-6-4-4zM9 7l2-4 6 6-4 2M15 2l1-1M18 5h2M13 1v2" />
            </svg>
            <span>{flashlightOn ? 'Выключить фонарик' : 'Посветить в глаз'}</span>
          </button>
        )}
        {onAskSclera && (
          <button
            type="button"
            className={`metal-btn eye-question-btn${isBloodshot && !scleraAsked ? ' eye-question-btn--alert' : ''}`}
            onClick={onAskSclera}
            disabled={disabled}
          >
            {isBloodshot ? 'Спросить о красных белках' : 'Спросить о белках глаз'}
          </button>
        )}
        {onAskShape && (
          <button
            type="button"
            className={`metal-btn eye-question-btn${shapeAsked ? ' is-active' : ''}`}
            onClick={onAskShape}
            disabled={disabled}
          >
            {shapeAsked ? 'Зрачки (спрошено)' : 'Спросить про разрез / зрачки'}
          </button>
        )}
      </div>

      <p>Правый и левый — со стороны посетителя.</p>
    </div>
  );
}
