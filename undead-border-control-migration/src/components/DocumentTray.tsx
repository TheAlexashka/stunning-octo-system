import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';

type DocumentType = 'passport' | 'visa';
export function DocumentTray({ requested, passportTaken, visaTaken, disabled, onRequest, onTake, onTakeAll }: {
  requested: boolean; passportTaken: boolean; visaTaken: boolean; disabled: boolean;
  onRequest: () => void; onTake: (doc: DocumentType) => void; onTakeAll: () => void;
}) {
  const pending = requested && (!passportTaken || !visaTaken);
  return (
    <div className="booth-slot" aria-label="Лоток документов под окном">
      <div className="booth-slot__opening">
        <span className="booth-slot__label">ЛОТОК ПОД ОКНОМ</span>
        {!requested ? <button type="button" className="metal-btn booth-slot__request-btn" onClick={onRequest} disabled={disabled}>Ваши документы!</button>
          : pending ? <button type="button" className="booth-slot__take-all" onClick={onTakeAll} disabled={disabled}>Забрать на стол</button>
            : <span className="booth-slot__status">Документы на столе</span>}
      </div>
      {pending && <div className="booth-slot__tray">
        {!passportTaken && <DocumentToken kind="passport" label="REICHSPASS" onTake={onTake} disabled={disabled} />}
        {!visaTaken && <DocumentToken kind="visa" label="РАБОЧАЯ ВИЗА" onTake={onTake} disabled={disabled} />}
      </div>}
    </div>
  );
}

function DocumentToken({ kind, label, onTake, disabled }: { kind: DocumentType; label: string; onTake: (doc: DocumentType) => void; disabled: boolean }) {
  const [offset, setOffset] = useState(0);
  const drag = useRef<{ id: number; start: number } | null>(null);
  const consumeClick = useRef(false);
  function down(event: PointerEvent<HTMLButtonElement>) {
    // Do not capture touch. A swipe over this button scrolls instead of taking
    // a document; a native tap/click still takes it, including keyboard clicks.
    if (disabled || event.pointerType === 'touch' || event.button !== 0) return;
    consumeClick.current = false;
    drag.current = { id: event.pointerId, start: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    if (drag.current?.id === event.pointerId) setOffset(Math.max(-8, Math.min(72, event.clientY - drag.current.start)));
  }
  function up(event: PointerEvent<HTMLButtonElement>) {
    if (drag.current?.id !== event.pointerId) return;
    drag.current = null; setOffset(0); consumeClick.current = true;
    if (!disabled) onTake(kind);
  }
  function cancel() { drag.current = null; setOffset(0); consumeClick.current = false; }
  return (
    <button type="button" className={`slot-doc-token slot-doc-token--${kind}`} style={{ transform: offset ? `translateY(${offset}px)` : undefined }}
      onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={cancel}
      onClick={() => { if (consumeClick.current) { consumeClick.current = false; return; } if (!disabled) onTake(kind); }} disabled={disabled}
      title="Нажмите, чтобы взять. Мышью можно перетащить вниз.">
      <span className="slot-doc-token__title">{label}</span><span className="slot-doc-token__hint">нажать / взять</span>
    </button>
  );
}
