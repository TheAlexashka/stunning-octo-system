import { useEffect, useRef, useState } from 'react';
import { LATEST_SHIFT, type Shift } from '../game/session';
import { HairGallery } from './HairGallery';
import './SessionScreens.css';

const SHIFTS: { shift: Shift; title: string; subtitle: string; desc: string }[] = [
  { shift: 1, title: 'День 1', subtitle: '12 октября 1943 г.', desc: 'Вводный инструктаж. Базовый осмотр зубов, ногтей и кожи.' },
  { shift: 2, title: 'Ночь 2', subtitle: '13 октября 1943 г.', desc: 'Ночной режим. Обязательное снятие очков и перчаток.' },
  { shift: 3, title: 'Ночь 3', subtitle: '14 октября 1943 г.', desc: 'Проба кожи и волос. Вопросы о бритье и седине.' },
  { shift: 4, title: 'Ночь 4', subtitle: '15 октября 1943 г.', desc: 'Проба дыхания на стекле. Ледяной выдох и капли.' },
  { shift: 5, title: 'Ночь 5', subtitle: '16 октября 1943 г.', desc: 'Особое донесение. Новый порядок обоснования тревоги.' },
  { shift: 6, title: 'Ночь 6', subtitle: '17 октября 1943 г.', desc: 'Новая директива. Досмотровый фонарик и проверка реакции зрачков.' },
];

export function Menu({
  onStart,
  onSelectShift,
  onSaves,
}: {
  onStart: () => void;
  onSelectShift: (shift: Shift) => void;
  onSaves: () => void;
}) {
  const [shiftPickerOpen, setShiftPickerOpen] = useState(false);
  const [hairGalleryOpen, setHairGalleryOpen] = useState(false);

  return (
    <div className="menu-screen wood">
      <div className="menu-screen__content text-center space-y-8">
        <div className="title-main flicker">DAS GRENZAMT</div>
        <div className="title-sub">— 1943 —</div>
        <div className="text-[#a89878] text-sm max-w-md mx-auto italic px-6">
          Не все, кто приходит к границе — люди. Служба Безопасности рассчитывает на вашу бдительность.
        </div>
        <div className="menu-controls">
          <button className="metal-btn px-8 py-4 text-sm sm:text-xl tracking-widest w-full" onClick={onStart}>
            НАЧАТЬ СЛУЖБУ
          </button>
          <button className="metal-btn px-8 py-3 text-sm tracking-widest w-full" onClick={() => setShiftPickerOpen(true)}
            aria-haspopup="dialog" aria-expanded={shiftPickerOpen} aria-controls="shift-picker">
            ВЫБРАТЬ СМЕНУ
          </button>
          <button className="metal-btn px-8 py-3 text-sm tracking-widest w-full" onClick={onSaves}>
            СОХРАНЕНИЯ
          </button>
          <button className="metal-btn px-8 py-3 text-sm tracking-widest w-full" onClick={() => setHairGalleryOpen(true)}
            aria-haspopup="dialog" aria-expanded={hairGalleryOpen}>
            ГАЛЕРЕЯ ПРИЧЁСОК
          </button>
        </div>
      </div>
      <div className="menu-screen__footnote">
        Доступны смены 1–{LATEST_SHIFT} · 3 ручных слота · 1 автосохранение
      </div>

      {shiftPickerOpen && (
        <ShiftPicker onClose={() => setShiftPickerOpen(false)} onSelect={(shift) => {
          setShiftPickerOpen(false);
          onSelectShift(shift);
        }} />
      )}
      {hairGalleryOpen && <HairGallery onClose={() => setHairGalleryOpen(false)} />}
    </div>
  );
}

function ShiftPicker({ onClose, onSelect }: { onClose: () => void; onSelect: (shift: Shift) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);

  return (
    <dialog id="shift-picker" ref={dialogRef} className="shift-dialog paper" aria-labelledby="shift-picker-title"
      onKeyDown={(event) => { if (event.key === 'Escape') event.stopPropagation(); }}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <header className="shift-dialog__header">
        <div>
          <span className="shift-dialog__eyebrow">ГРАФИК ДЕЖУРСТВ ПОСТА OSTMARK-3</span>
          <h2 id="shift-picker-title">ВЫБОР СМЕНЫ</h2>
        </div>
        <button type="button" className="metal-btn shift-dialog__close" onClick={onClose} aria-label="Закрыть выбор смены" autoFocus>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>
      <p className="shift-dialog__intro">Выберите смену. Перед дежурством откроется соответствующая служебная газета.</p>
      <div className="shift-dialog__list">
        {SHIFTS.map((shift) => (
          <button key={shift.shift} type="button" className="metal-btn shift-choice" onClick={() => onSelect(shift.shift)}>
            <span className="shift-choice__heading">
              <strong>{shift.title.toUpperCase()}</strong><span>{shift.subtitle}</span>
            </span>
            <span className="shift-choice__description">{shift.desc}</span>
          </button>
        ))}
      </div>
    </dialog>
  );
}

export function Intro({ onNext }: { onNext: () => void }) {
  return (
    <div className="scroll-screen wood">
      <div className="max-w-2xl paper doc-sheet space-y-4 text-[13px] sm:text-[15px] leading-relaxed">
        <div className="text-center text-[10px] sm:text-xs tracking-[0.3em] mb-3">— СОВЕРШЕННО СЕКРЕТНО —</div>
        <div className="paper-title">Циркуляр СД № 7-B / 1943</div>
        <p>В приграничные районы Рейха проникают существа, отвергнутые природой. Разведка подтвердила: <b>вампиры, оборотни, русалки и упыри</b> пытаются пересечь границу под видом граждан.</p>
        <p>Вы — младший клерк пограничного пункта. Каждого посетителя вы обязаны проверить лично: <b>глаза, зубы, ногти, кожа</b>. Ищите отклонения.</p>
        <p>Человеку с неправильными документами можно отказать во въезде. При обнаружении нежити используется отдельная красная кнопка тревоги СД.</p>
        <p className="text-[#7a1010] font-bold">Три ошибки за смену — и вы отправитесь на Восточный фронт. Или в подвал.</p>
        <p className="text-xs italic">После завершения смены прогресс сохраняется автоматически. Ручные сохранения доступны через паузу.</p>
        <div className="text-right pt-4"><button className="metal-btn px-6 py-2" onClick={onNext}>Далее</button></div>
      </div>
    </div>
  );
}

export function Briefing({ onNext }: { onNext: () => void }) {
  const entries = [
    { name: 'ВАМПИР', css: 'vampire', signs: ['Мертвенно-бледная кожа, синие вены', 'Удлинённые клыки', 'Красные глаза', 'Не стареет даже после 55 лет'] },
    { name: 'ОБОРОТЕНЬ', css: 'werewolf', signs: ['Чёрные когти вместо ногтей', 'Жёлтые глаза, вертикальный зрачок', 'Волосы могут быть сбриты до гладкой кожи или щетины'] },
    { name: 'РУСАЛКА', css: 'mermaid', signs: ['Перепонки между пальцами', 'Чешуя на коже, синеватый отлив', 'Бирюзовые глаза, просит воды'] },
    { name: 'УПЫРЬ', css: 'ghoul', signs: ['Серая кожа, трупный вид', 'Жёлто-зелёные глаза, вертикальный зрачок', 'Обычные ногти с грязью под краями'] },
  ];
  return (
    <div className="scroll-screen wood">
      <div className="max-w-3xl paper doc-sheet space-y-4 sm:space-y-5 text-[13px] sm:text-[14px]">
        <div className="paper-title">Определитель нежити</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {entries.map((e) => (
            <section key={e.css}>
              <div className={`bestiary-name bestiary-name--${e.css}`}>{e.name}</div>
              <ul className="list-disc list-inside text-[12px] sm:text-sm space-y-1">
                {e.signs.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </section>
          ))}
        </div>
        <div className="text-xs text-[#5a4020] italic border-t border-[#8a7050] pt-3">
          Сверяйте паспорт и рабочую визу: людям с ошибкой в документах ставьте «Отказать», а при обнаружении нежити жмите круглую красную кнопку тревоги СД.
        </div>
        <div className="text-xs text-[#5a4020] italic">
          Осматривайте обе руки и оба глаза. С последующих ночей появятся новые директивы и методы контроля.
        </div>
        <div className="text-right"><button className="metal-btn px-6 py-2" onClick={onNext}>К утренней сводке</button></div>
      </div>
    </div>
  );
}

export function EndScreen({ title, text, onRetry, onSaves, onMainMenu }: {
  title: string; text: string; onRetry: () => void; onSaves: () => void; onMainMenu?: () => void;
}) {
  return (
    <div className="end-screen wood text-center">
      <div className="title-end flicker">{title}</div>
      <div className="text-[#a89878] max-w-xl text-sm sm:text-base px-4">{text}</div>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {onMainMenu && <button className="metal-btn px-7 py-3 tracking-widest" onClick={onMainMenu}>В ГЛАВНОЕ МЕНЮ</button>}
        <button className="metal-btn px-7 py-3 tracking-widest" onClick={onRetry}>НАЧАТЬ ЗАНОВО</button>
        <button className="metal-btn px-7 py-3 tracking-widest" onClick={onSaves}>СОХРАНЕНИЯ</button>
      </div>
    </div>
  );
}
