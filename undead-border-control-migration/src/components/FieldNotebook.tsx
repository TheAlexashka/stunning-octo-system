import type { Shift } from '../game/session';

type SignItem = { id: string; label: string; minShift?: number };

const BASE_SIGNS: SignItem[] = [
  { id: 'pale_veins', label: 'Бледная / серая кожа или синие вены' },
  { id: 'eyes', label: 'Нечеловеческие глаза: цвет или узкий зрачок' },
  { id: 'bloodshot', label: 'Красные / воспалённые белки глаз' },
  { id: 'fangs', label: 'Удлинённые клыки' },
  { id: 'hands', label: 'Когти, перепонки или грязь под ногтями' },
  { id: 'scales_fur', label: 'Чешуя или подозрительные волосы на теле' },
  { id: 'no_grey_old', label: 'Возраст после 55: нет седины и морщин' },
  { id: 'job_mismatch', label: 'Замеченное расхождение в документах' },
  { id: 'voice', label: 'Необычный тембр голоса' },
  { id: 'breath', label: 'Подозрительный след дыхания: сухо или капли', minShift: 4 },
  { id: 'second_jaw', label: 'Вторая челюсть в глубине рта за зубами', minShift: 5 },
  { id: 'extra_finger', label: 'Лишний шестой палец на руке или перчатке', minShift: 5 },
  { id: 'multi_pupil', label: 'Раздвоенные зрачки (поликория)', minShift: 5 },
  { id: 'no_light_reaction', label: 'Зрачок не реагирует на свет фонарика', minShift: 6 },
];

const BASE_CREATURES = [
  { name: 'ВАМПИР', css: 'vampire', minShift: 1, signs: 'Бледная кожа и синие вены, клыки, красные глаза. Не стареет и не седеет даже после 55 лет.' },
  { name: 'ОБОРОТЕНЬ', css: 'werewolf', minShift: 1, signs: 'Чёрные когти, жёлтые глаза с вертикальным зрачком. Кожа: шерсть, щетина или выбрита. Белки глаз могут быть красными.' },
  { name: 'РУСАЛКА', css: 'mermaid', minShift: 1, signs: 'Перепонки между пальцами, чешуя, синеватая кожа, бирюзовые глаза.' },
  { name: 'УПЫРЬ', css: 'ghoul', minShift: 1, signs: 'Серая кожа, жёлто-зелёные глаза с вертикальным зрачком, грязь под ногтями. Белки глаз могут быть красными.' },
  { name: 'ДВОЙНИК (DOPPELGÄNGER)', css: 'doppelganger', minShift: 5, signs: 'В глубине рта видна ВТОРАЯ ЧЕЛЮСТЬ. На теле нет волос и щетины. Белки всегда чисто белые. Возможны 6 пальцев или двойные зрачки. У половины голос не совпадает с полом в паспорте.' },
];

export function FieldNotebook({ shift, checked, onToggle, onClear, disabled }: {
  shift: Shift; checked: string[]; onToggle: (id: string) => void; onClear: () => void; disabled: boolean;
}) {
  const visibleSigns = BASE_SIGNS.filter((s) => !s.minShift || shift >= s.minShift);
  const visibleCreatures = BASE_CREATURES.filter((c) => !c.minShift || shift >= c.minShift);

  return (
    <section className="notebook-panel" aria-labelledby="notebook-heading">
      <div className="notebook-panel__header"><h2 id="notebook-heading">ЗАПИСНАЯ КНИЖКА</h2><span className="notebook-counter">УЛИК: {checked.length}</span></div>
      <div className="notebook-checklist" role="group" aria-label="Подозрительные признаки, отмечаемые вручную">
        <div className="notebook-checklist__top"><span>ВАШИ НАБЛЮДЕНИЯ:</span><button className="notebook-clear-btn" style={{ visibility: checked.length ? 'visible' : 'hidden' }} onClick={onClear} disabled={disabled}>сбросить</button></div>
        {visibleSigns.map((sign) => {
          const selected = checked.includes(sign.id);
          return <button type="button" key={sign.id} role="checkbox" aria-checked={selected} className={`notebook-check-item${selected ? ' is-checked' : ''}`} onClick={() => onToggle(sign.id)} disabled={disabled}>
            <span className="notebook-check-box" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ opacity: selected ? 1 : 0 }}><path d="M2 6.2 4.8 9 10 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span className="notebook-check-text">{sign.label}</span>
          </button>;
        })}
      </div>
      <ul className="notebook-list">{visibleCreatures.map((entry) => <li key={entry.css} className={`notebook-entry notebook-entry--${entry.css}`}><strong>{entry.name}</strong><span>{entry.signs}</span></li>)}</ul>
      {shift >= 3 && <p style={{ fontSize: 11, lineHeight: 1.45, marginTop: 8 }}>Ночь 3: волосы и щетина встречаются у людей и упырей. Проверяйте несколько признаков.</p>}
      {shift >= 4 && <p style={{ fontSize: 11, lineHeight: 1.45, marginTop: 8 }}>Ночь 4: вампиры и упыри не запотевают стекло; у людей след тоже может отсутствовать. Русалки оставляют конденсат с каплями или без них. Отказ — не результат пробы.</p>}
      {shift >= 5 && <p style={{ fontSize: 11, lineHeight: 1.45, marginTop: 8 }}>Ночь 5: Двойники прячут вторую челюсть в горле. Белки их глаз никогда не краснеют, а на теле нет волос.</p>}
      {shift >= 6 && <p style={{ fontSize: 11, lineHeight: 1.45, marginTop: 8 }}>Ночь 6: светите фонариком в глаза. У двойников зрачки неподвижны. Считайте пальцы на руках и перчатках!</p>}
      <p style={{ fontSize: 11, lineHeight: 1.45, marginTop: 8 }}>Тембр может измениться от простуды или быть таким от природы. Голос сам по себе не доказывает наличие нежити.</p>
    </section>
  );
}
