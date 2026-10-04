import type { Shift } from '../game/session';
import { getNotebookNewspaperAdditions } from './Newspaper';

type SignItem = { id: string; label: string; minShift?: number };

const BASE_SIGNS: SignItem[] = [
  { id: 'pale_veins', label: 'Бледная / серая кожа или синие вены' },
  { id: 'eyes', label: 'Нечеловеческие глаза: цвет, узкий или горизонтальный зрачок' },
  { id: 'bloodshot', label: 'Красные / воспалённые белки глаз' },
  { id: 'fangs', label: 'Удлинённые клыки' },
  { id: 'hands', label: 'Когти, перепонки или грязь под ногтями' },
  { id: 'scales_fur', label: 'Чешуя или подозрительные волосы на теле' },
  { id: 'no_grey_old', label: 'Выглядит не по возрасту' },
  { id: 'job_mismatch', label: 'Замеченное расхождение в документах' },
  { id: 'voice', label: 'Необычный тембр голоса' },
  { id: 'breath', label: 'Подозрительный след дыхания: сухо или капли', minShift: 4 },
  { id: 'second_jaw', label: 'Вторая челюсть в глубине рта за зубами', minShift: 5 },
  { id: 'extra_finger', label: 'Лишний шестой палец на руке или перчатке', minShift: 5 },
  { id: 'multi_pupil', label: 'Раздвоенные зрачки (поликория)', minShift: 5 },
  { id: 'belladonna_drops', label: 'Капли Belladonna Augentropfen найдены в сумке', minShift: 7 },
  { id: 'no_light_reaction', label: 'Зрачок не реагирует на свет фонарика', minShift: 6 },
  { id: 'salt_breath', label: 'Белёсый солёный налёт с кристаллами на стекле', minShift: 4 },
  { id: 'horizontal_pupil', label: 'Горизонтальные зрачки, как у осьминога' },
  { id: 'pearly_nails', label: 'Перламутровый блеск ногтей, как у раковины' },
  { id: 'shark_teeth', label: 'Мелкие острые зубы в несколько рядов' },
  { id: 'green_teeth', label: 'Зеленоватые зубы', minShift: 8 },
  { id: 'river_algae_nails', label: 'Тина под ногтями', minShift: 8 }
];

const BASE_CREATURES = [
  { name: 'BLUTSAUGER', css: 'vampire', minShift: 1, signs: 'Бледная кожа и синие вены, клыки, красные глаза. Не стареет.' },
  { name: 'WERWOLF', css: 'werewolf', minShift: 1, signs: 'Чёрные когти, жёлтые глаза с вертикальным зрачком. Кожа покрыта шерстью.' },
  { name: 'MEERLEUTE', css: 'mermaid', minShift: 1, signs: 'Желтоватые белки и горизонтальные зрачки. Перламутровые ногти, мелкие острые зубы в несколько рядов, чешуя и перепонки.' },
  { name: 'NIXEN', css: 'nix', minShift: 8, signs: 'Речные существа: кожа как у людей, без чешуи и перепонок; глаза часто голубые. Выдох оставляет капли. У мужчин зеленоватые зубы, у женщин тина под ногтями.' },
  { name: 'NACHZEHRER', css: 'ghoul', minShift: 1, signs: 'Серая кожа, жёлто-зелёные глаза с вертикальным зрачком, грязь под ногтями.' },
  { name: 'DOPPELGÄNGER', css: 'doppelganger', minShift: 5, signs: 'В глубине рта видна ВТОРАЯ ЧЕЛЮСТЬ. На теле нет волос и щетины. Белки всегда чисто белые. Возможны 6 пальцев или двойные зрачки. У половины голос не совпадает с полом в паспорте.' },
];

export function FieldNotebook({ shift, checked, onToggle, onClear, disabled }: {
  shift: Shift; checked: string[]; onToggle: (id: string) => void; onClear: () => void; disabled: boolean;
}) {
  const visibleSigns = BASE_SIGNS.filter((s) => !s.minShift || shift >= s.minShift);
  const visibleCreatures = BASE_CREATURES.filter((c) => !c.minShift || shift >= c.minShift);
  const additions = getNotebookNewspaperAdditions(shift);

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
      {additions.length > 0 && <div className="notebook-additions" aria-label="Дополнения из газет">
        {additions.map(issue => <section key={issue.day} className="notebook-addendum" data-notebook-night={issue.day}>
          <h3>НОЧЬ {issue.day} · ДОПОЛНЕНИЕ ИЗ ГАЗЕТЫ</h3>
          <ul>{issue.col3.directiveItems.map((text, index) => <li key={index}>{text}</li>)}</ul>
        </section>)}
      </div>}
    </section>
  );
}
