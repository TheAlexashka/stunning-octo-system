import { useEffect, useRef } from 'react';
import { SaveSlots, type SaveSlotsProps } from './SaveSlots';

export function SaveMenu({ archive, onClose }: { archive: SaveSlotsProps; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);
  return (
    <dialog ref={ref} className="save-dialog" aria-labelledby="save-menu-title" onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <div className="save-menu-heading">
        <div><small>АРХИВ ПОГРАНИЧНОГО ПУНКТА</small><h2 id="save-menu-title">СОХРАНЕНИЯ</h2></div>
        <button onClick={onClose} aria-label="Закрыть сохранения" autoFocus>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </div>
      <SaveSlots {...archive} />
    </dialog>
  );
}
