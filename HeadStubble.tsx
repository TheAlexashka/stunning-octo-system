import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Portrait, type Traits } from './Portrait';
import { FEMALE_HAIRSTYLES, HAIRSTYLE_LABELS, MALE_HAIRSTYLES, type HairStyle } from './hairstyles';
import { FEMALE_HEADWEAR_STYLES, HEADWEAR_LABELS, MALE_HEADWEAR_STYLES, type HeadwearStyle } from './headwear';
import { FEMALE_CLOTHING_STYLES, CLOTHING_LABELS, type ClothingStyle } from '../features/lindenClothes/catalog';
import { POTATO_FEMALE_CLOTHING, POTATO_MALE_CLOTHING, POTATO_CLOTHING_LABELS } from '../features/potato/catalog';
import './HairGallery.css';

const HAIR_COLORS = [
  { name: 'Чёрные', value: '#20140e' },
  { name: 'Тёмно-каштановые', value: '#3f2517' },
  { name: 'Каштановые', value: '#6a4020' },
  { name: 'Рыжие', value: '#9a5728' },
  { name: 'Светлые', value: '#b98a4d' },
  { name: 'Седые', value: '#aaa79f' },
] as const;
// Reserved special colour: only offered together with the reserved «Баранки» style.
const SPECIAL_WHITE = { name: 'Особый белый', value: '#f2efe6' } as const;
const RESERVED_WHITE_HAIR = 'hair-poster-1938-braided-coils';

type Gender = 'm' | 'f';
type Category = 'hair' | 'headwear' | 'clothing';
type Selection = { hairStyle: HairStyle; headwear: HeadwearStyle | null; clothingStyle: ClothingStyle | string | null };
const ALL_CLOTHING_LABELS: Record<string, string> = { ...CLOTHING_LABELS, ...POTATO_CLOTHING_LABELS };

function previewTraits(gender: Gender, selection: Selection, color: string): Traits {
  return {
    skinTone: gender === 'm' ? '#dfb18c' : '#e4b995',
    hairColor: color,
    hairStyle: selection.hairStyle,
    headwear: selection.headwear,
    clothingStyle: selection.clothingStyle,
    faceShape: gender === 'm' ? 'male-oval' : 'female-oval',
    nose: gender === 'm' ? 'straight' : 'button',
    eyeColor: gender === 'm' ? '#516b83' : '#577149',
    eyeShape: 'normal',
    eyeTilt: gender === 'm' ? -0.5 : 2,
    hasFangs: false,
    hasClaws: false,
    hasWebbing: false,
    dirtyNails: false,
    nailColor: '#eed2bc',
    hasScales: false,
    hasFur: false,
    bodyHair: gender === 'm' ? 'stubble' : 'smooth',
    hasSecondJaw: false,
    hasExtraFinger: false,
    hasMultiplePupils: false,
    pupilReactsToLight: true,
    bloodshotSclera: false,
    yellowSclera: false,
    pearlyNails: false,
    nailAlgae: false,
    sharkTeeth: false,
    greenTeeth: false,
    paleSkin: false,
    gender,
    facialHair: 'none',
    age: 'mid',
    ageYears: gender === 'm' ? 38 : 32,
    greyHair: color === '#aaa79f',
    wearsGlasses: false,
    glassesStyle: 'round',
    wearsGloves: false,
    gloveStyle: 'leather',
    gloveColor: '#2a1d17',
  };
}

export function HairGallery({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [gender, setGender] = useState<Gender>('m');
  const [category, setCategory] = useState<Category>('hair');
  // Each gender remembers its independent appearance selections; changing a tab never changes hair.
  const [selections, setSelections] = useState<Record<Gender, Selection>>({
    m: { hairStyle: MALE_HAIRSTYLES[0], headwear: null, clothingStyle: null },
    f: { hairStyle: FEMALE_HAIRSTYLES[0], headwear: null, clothingStyle: FEMALE_CLOTHING_STYLES[0] },
  });
  const [hairColor, setHairColor] = useState<string>(HAIR_COLORS[1].value);
  const selection = selections[gender];
  useEffect(() => { if (hairColor === SPECIAL_WHITE.value && selection.hairStyle !== RESERVED_WHITE_HAIR) setHairColor(HAIR_COLORS[1].value); }, [selection.hairStyle, hairColor]);
  const hairOptions: readonly HairStyle[] = gender === 'm' ? MALE_HAIRSTYLES : FEMALE_HAIRSTYLES;
  const headwearOptions: readonly HeadwearStyle[] = gender === 'm' ? MALE_HEADWEAR_STYLES : FEMALE_HEADWEAR_STYLES;
  const clothingOptions: readonly string[] = gender === 'm' ? POTATO_MALE_CLOTHING : [...FEMALE_CLOTHING_STYLES, ...POTATO_FEMALE_CLOTHING];
  const traits = useMemo(() => previewTraits(gender, selection, hairColor), [gender, selection, hairColor]);

  function selectHair(hairStyle: HairStyle) {
    setSelections((previous) => ({ ...previous, [gender]: { ...previous[gender], hairStyle } }));
  }
  function selectHeadwear(headwear: HeadwearStyle | null) {
    setSelections((previous) => ({ ...previous, [gender]: { ...previous[gender], headwear } }));
  }

  function selectClothing(clothingStyle: string | null) {
    setSelections(previous => ({ ...previous, [gender]: { ...previous[gender], clothingStyle } }));
  }
  function selectGender(next: Gender) {
    setGender(next);
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);

  return (
    <dialog ref={dialogRef} className="hair-gallery" aria-labelledby="hair-gallery-title"
      onKeyDown={(event) => { if (event.key === 'Escape') event.stopPropagation(); }}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <header className="hair-gallery__header">
        <div>
          <span>АРХИВ ВНЕШНОСТИ · 1943</span>
          <h2 id="hair-gallery-title">ГАЛЕРЕЯ ВНЕШНОСТИ</h2>
        </div>
        <button type="button" className="metal-btn hair-gallery__close" onClick={onClose} aria-label="Закрыть галерею" autoFocus>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div className="hair-gallery__body">
        <section className="hair-gallery__preview" aria-label="Предпросмотр внешности">
          <div className={`hair-gallery__portrait${category === 'clothing' && selection.clothingStyle ? ' hair-gallery__portrait--full' : ''}`}>
            <Portrait t={traits} className="hair-gallery__portrait-svg" animated fullLength={category === 'clothing' && !!selection.clothingStyle} />
          </div>
          <div className="hair-gallery__selected" aria-live="polite">
            <strong>{category === 'clothing' && selection.clothingStyle ? ALL_CLOTHING_LABELS[selection.clothingStyle] : HAIRSTYLE_LABELS[selection.hairStyle]}</strong>
            <span>{selection.headwear ? HEADWEAR_LABELS[selection.headwear] : 'Без головного убора'}</span>
            {category !== 'clothing' && <span>{selection.clothingStyle ? ALL_CLOTHING_LABELS[selection.clothingStyle] : 'Прежний костюм'}</span>}
            <small>{gender === 'm' ? 'Мужской портрет' : 'Женский портрет'} · независимые слои</small>
          </div>

          <div className="hair-gallery__swatches" role="group" aria-label="Цвет волос">
            {(selection.hairStyle === RESERVED_WHITE_HAIR ? [...HAIR_COLORS, SPECIAL_WHITE] : HAIR_COLORS).map((color) => (
              <button key={color.value} type="button" className={hairColor === color.value ? 'is-active' : ''}
                style={{ '--swatch': color.value } as CSSProperties}
                aria-label={color.name} title={color.name} aria-pressed={hairColor === color.value}
                onClick={() => setHairColor(color.value)} />
            ))}
          </div>
        </section>

        <section className="hair-gallery__browser">
          <div className="hair-gallery__tabs" role="tablist" aria-label="Персонаж">
            <button type="button" role="tab" aria-selected={gender === 'm'} className={`metal-btn${gender === 'm' ? ' is-active' : ''}`}
              onClick={() => selectGender('m')}>Мужчина</button>
            <button type="button" role="tab" aria-selected={gender === 'f'} className={`metal-btn${gender === 'f' ? ' is-active' : ''}`}
              onClick={() => selectGender('f')}>Женщина</button>
          </div>
          <div className="hair-gallery__tabs hair-gallery__tabs--three" role="tablist" aria-label="Слой внешности">
            <button type="button" role="tab" aria-selected={category === 'hair'} className={`metal-btn${category === 'hair' ? ' is-active' : ''}`}
              onClick={() => setCategory('hair')}>Причёски</button>
            <button type="button" role="tab" aria-selected={category === 'headwear'} className={`metal-btn${category === 'headwear' ? ' is-active' : ''}`}
              onClick={() => setCategory('headwear')}>Головные уборы</button>
            <button type="button" role="tab" aria-selected={category === 'clothing'} className={`metal-btn${category === 'clothing' ? ' is-active' : ''}`} onClick={() => setCategory('clothing')}>Одежда</button>
          </div>

          <div className="hair-gallery__layers">
            <label htmlFor="hair-gallery-base-hair">Причёска
              <select id="hair-gallery-base-hair" value={selection.hairStyle} aria-describedby="hair-gallery-layer-help"
                onChange={(event) => { const next = hairOptions.find((option) => option === event.target.value); if (next) selectHair(next); }}>
                {hairOptions.map((option, index) => <option key={option} value={option}>{String(index + 1).padStart(2, '0')} · {HAIRSTYLE_LABELS[option]}</option>)}
              </select>
            </label>
            <label htmlFor="hair-gallery-headwear">Убор поверх волос
              <select id="hair-gallery-headwear" value={selection.headwear ?? ''} aria-describedby="hair-gallery-layer-help"
                onChange={(event) => { const next = headwearOptions.find((option) => option === event.target.value); selectHeadwear(next ?? null); }}>
                <option value="">Без головного убора</option>
                {headwearOptions.map((option) => <option key={option} value={option}>{HEADWEAR_LABELS[option]}</option>)}
              </select>
            </label>
            <label className="hair-gallery__clothing-label" htmlFor="hair-gallery-clothing">{gender === 'f' ? 'Женская одежда' : 'Мужская одежда'}
              <select id="hair-gallery-clothing" value={selection.clothingStyle ?? ''}
                onChange={event => selectClothing(clothingOptions.find(id => id === event.target.value) ?? null)}>
                <option value="">Прежний костюм</option>
                {clothingOptions.map((id, index) => <option key={id} value={id}>{String(index + 1).padStart(2, '0')} · {ALL_CLOTHING_LABELS[id]}</option>)}
              </select>
            </label>
            <p id="hair-gallery-layer-help">Волосы, убор и одежда выбираются независимо. Одежда не заменяет причёску.</p>
          </div>

          <div className="hair-gallery__options" role="listbox" aria-label={category === 'hair' ? 'Доступные причёски' : category === 'headwear' ? 'Доступные головные уборы' : 'Доступная одежда'}>
            {category === 'hair' ? hairOptions.map((option, index) => (
              <button key={option} type="button" role="option" aria-selected={selection.hairStyle === option}
                className={`hair-option${selection.hairStyle === option ? ' is-active' : ''}`} onClick={() => selectHair(option)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{HAIRSTYLE_LABELS[option]}</strong>
              </button>
            )) : category === 'headwear' ? <>
              <button type="button" role="option" aria-selected={selection.headwear === null}
                className={`hair-option hair-option--remove${selection.headwear === null ? ' is-active' : ''}`} onClick={() => selectHeadwear(null)}>
                <span>—</span><strong>Без головного убора · снять убор</strong>
              </button>
              {headwearOptions.map((option, index) => (
                <button key={option} type="button" role="option" aria-selected={selection.headwear === option}
                  className={`hair-option${selection.headwear === option ? ' is-active' : ''}`} onClick={() => selectHeadwear(option)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{HEADWEAR_LABELS[option]}</strong>
                </button>
              ))}
            </> : <>
              <button type="button" role="option" aria-selected={selection.clothingStyle === null}
                className={`hair-option hair-option--remove${selection.clothingStyle === null ? ' is-active' : ''}`} onClick={() => selectClothing(null)}>
                <span>—</span><strong>Прежний костюм</strong>
              </button>
              {clothingOptions.map((id, index) => <button key={id} type="button" role="option"
                aria-selected={selection.clothingStyle === id} className={`hair-option${selection.clothingStyle === id ? ' is-active' : ''}`} onClick={() => selectClothing(id)}>
                <span>{String(index + 1).padStart(2, '0')}</span><strong>{ALL_CLOTHING_LABELS[id]}</strong>
              </button>)}
            </>}
          </div>
        </section>
      </div>
    </dialog>
  );
}
