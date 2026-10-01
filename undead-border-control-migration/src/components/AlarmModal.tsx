import { useEffect, useRef, useState } from 'react';
import { ALARM_EVIDENCE_LIST, type AlarmEvidenceId } from '../game/alarmReasons';
import { CREATURE_LABELS, type CreatureType } from '../game/visitors';
import type { Shift } from '../game/session';
import './AlarmModal.css';

export function AlarmModal({
  shift,
  requireEvidence,
  onConfirm,
  onClose,
}: {
  shift: Shift;
  requireEvidence: boolean;
  onConfirm: (type: CreatureType, reasons: AlarmEvidenceId[]) => void;
  onClose: () => void;
}) {
  const [selectedType, setSelectedType] = useState<CreatureType | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<AlarmEvidenceId[]>([]);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function toggleReason(id: AlarmEvidenceId) {
    setSelectedReasons((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  }

  function handleExecute() {
    if (!selectedType) return;
    if (requireEvidence && selectedReasons.length === 0) return;
    onConfirm(selectedType, selectedReasons);
  }

  // Doppelgänger is only revealed on Night 5 and 6!
  const creatureOptions: CreatureType[] = shift >= 5
    ? ['vampire', 'werewolf', 'mermaid', 'ghoul', 'doppelganger']
    : ['vampire', 'werewolf', 'mermaid', 'ghoul'];

  // Filter evidence list according to current night to prevent spoilers
  const visibleEvidence = ALARM_EVIDENCE_LIST.filter((evidence) => {
    if (evidence.id === 'dry_breath' || evidence.id === 'droplets_breath') {
      return shift >= 4;
    }
    if (evidence.id === 'second_jaw' || evidence.id === 'smooth_hairless' || evidence.id === 'extra_finger' || evidence.id === 'multi_pupil') {
      return shift >= 5;
    }
    if (evidence.id === 'no_light_reaction') {
      return shift >= 6;
    }
    return true;
  });

  const canExecute = selectedType !== null && (!requireEvidence || selectedReasons.length > 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3">
      <div
        ref={dialogRef}
        className="alarm-modal paper"
        role="dialog"
        aria-modal="true"
        aria-labelledby="alarm-modal-title"
      >
        <div className="alarm-modal__header">
          <div className="alarm-modal__emblem">✠</div>
          <div>
            <div className="alarm-modal__subtitle">ПРОТОКОЛ ЛИКВИДАЦИИ УГРОЗЫ СД</div>
            <h2 id="alarm-modal-title" className="alarm-modal__title">
              ВЫЗОВ ЛИКВИДАТОРА
            </h2>
          </div>
        </div>

        <div className="alarm-modal__body">
          {requireEvidence && (
            <div className="alarm-step">
              <div className="alarm-step__label">
                1. УКАЖИТЕ УЛИКИ И ПРИЧИНЫ ВЫЗОВА СД:
                <span className="alarm-step__hint">(требуется минимум 1 улика)</span>
              </div>
              <div className="alarm-reasons-grid">
                {visibleEvidence.map((reason) => {
                  const active = selectedReasons.includes(reason.id);
                  return (
                    <button
                      key={reason.id}
                      type="button"
                      role="checkbox"
                      aria-checked={active}
                      onClick={() => toggleReason(reason.id)}
                      className={`alarm-reason-btn${active ? ' is-selected' : ''}`}
                    >
                      <span className="alarm-reason-check">{active ? '✓' : ''}</span>
                      <span className="alarm-reason-text">{reason.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="alarm-step">
            <div className="alarm-step__label">
              {requireEvidence ? '2. ИДЕНТИФИЦИРУЙТЕ ВИД НЕЖИТИ:' : 'ИДЕНТИФИЦИРУЙТЕ ВИД НЕЖИТИ:'}
            </div>
            <div className="alarm-creatures-grid">
              {creatureOptions.map((type) => {
                const active = selectedType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`alarm-creature-btn${active ? ' is-selected' : ''}`}
                  >
                    {CREATURE_LABELS[type].toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="alarm-modal__footer">
          <button
            type="button"
            className="metal-btn alarm-confirm-btn"
            onClick={handleExecute}
            disabled={!canExecute}
          >
            {selectedType
              ? `ОТДАТЬ ПРИКАЗ: ОГОНЬ (${CREATURE_LABELS[selectedType].toUpperCase()})`
              : 'ВЫБЕРИТЕ ВИД НЕЖИТИ'}
          </button>
          <button type="button" className="metal-btn alarm-cancel-btn" onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}
