import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { AudioChannel, AudioSettings } from '../game/audio';
import { playStamp } from '../game/sounds';
import { SaveSlots, type SaveSlotsProps } from './SaveSlots';
import './PauseMenu.css';

type Props = {
  settings: AudioSettings;
  onVolume: (channel: AudioChannel, value: number) => void;
  onResume: () => void;
  inShift: boolean;
  archive: SaveSlotsProps;
  onMainMenu?: () => void;
};

export function PauseMenu({ settings, onVolume, onResume, inShift, archive, onMainMenu }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [tab, setTab] = useState<'audio' | 'saves'>('audio');
  const [confirmExit, setConfirmExit] = useState(false);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);

  return (
    <dialog id="pause-menu" ref={dialogRef} className={`pause-dialog${tab === 'saves' ? ' pause-dialog--archive' : ''}`}
      aria-labelledby="pause-title" onCancel={(event) => { event.preventDefault(); onResume(); }}>
      <div className="pause-panel">
        <div className="pause-heading">
          <div><div className="pause-eyebrow">{inShift ? 'СЛУЖБА ПРИОСТАНОВЛЕНА' : 'НАСТРОЙКИ ИГРЫ'}</div><h2 id="pause-title">ПАУЗА</h2></div>
          <button type="button" className="pause-close" onClick={onResume} aria-label="Закрыть паузу" autoFocus>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className="pause-tabs" role="tablist" aria-label="Настройки паузы">
          <button id="audio-tab" role="tab" aria-selected={tab === 'audio'} aria-controls="audio-panel" className={`pause-tab${tab === 'audio' ? ' is-active' : ''}`} onClick={() => setTab('audio')}>Звук</button>
          <button id="saves-tab" role="tab" aria-selected={tab === 'saves'} aria-controls="saves-panel" className={`pause-tab${tab === 'saves' ? ' is-active' : ''}`} onClick={() => setTab('saves')}>Сохранения</button>
        </div>
        {tab === 'audio' ? (
          <section id="audio-panel" role="tabpanel" aria-labelledby="audio-tab">
            <p className="pause-description">Громкость меняется сразу и действует во всех сценах.</p>
            <VolumeSlider id="music-volume" title="Музыка" description="Мелодии меню, задания и смены" value={settings.music} onChange={(value) => onVolume('music', value)} />
            <VolumeSlider id="sound-volume" title="Звуки" description="Голоса, выстрел, дверь и штамп" value={settings.sound} onChange={(value) => onVolume('sound', value)} />
            <div className="pause-preview-row"><span>0 — без звука · 100 — максимум</span><button type="button" className="pause-preview" onClick={playStamp}>Проверить звук</button></div>
          </section>
        ) : <section id="saves-panel" role="tabpanel" aria-labelledby="saves-tab"><SaveSlots {...archive} /></section>}
        <button type="button" className="metal-btn pause-resume" style={{ marginTop: tab === 'saves' ? 18 : 0 }} onClick={onResume}>ПРОДОЛЖИТЬ</button>
        {onMainMenu && (confirmExit ? (
          <div className="save-confirm" style={{ marginTop: 12 }}>
            <p>Несохранённый прогресс будет потерян. Вернуться в главное меню?</p>
            <div className="save-card__actions"><button className="metal-btn" onClick={onMainMenu}>Выйти</button><button className="metal-btn" onClick={() => setConfirmExit(false)}>Отмена</button></div>
          </div>
        ) : <button className="pause-menu-return" onClick={() => setConfirmExit(true)}>В главное меню</button>)}
        <div className="pause-footnote">Настройки звука сохраняются автоматически</div>
      </div>
    </dialog>
  );
}

function VolumeSlider({ id, title, description, value, onChange }: { id: string; title: string; description: string; value: number; onChange: (value: number) => void }) {
  return (
    <div className="volume-control">
      <div className="volume-label-row"><label htmlFor={id}>{title}</label><output htmlFor={id}>{value}<span> / 100</span></output></div>
      <div id={`${id}-description`} className="volume-description">{description}</div>
      <input id={id} type="range" min="0" max="100" step="1" value={value} className="volume-slider"
        style={{ '--volume-fill': `${value}%` } as CSSProperties} aria-describedby={`${id}-description`}
        aria-valuetext={`${value} из 100`} onChange={(event) => onChange(Number(event.currentTarget.value))} />
      <div className="volume-scale" aria-hidden="true"><span>0</span><span>100</span></div>
    </div>
  );
}
