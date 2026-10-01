import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { Portrait, type Traits } from './Portrait';
import {
  FEMALE_HAIRSTYLES,
  FEMALE_HEADWEAR_STYLES,
  HAIRSTYLE_LABELS,
  MALE_HAIRSTYLES,
  MALE_HEADWEAR_STYLES,
  type HairStyle,
} from './hairstyles';
import './HairGallery.css';

const HAIR_COLORS = [
  { name: 'Чёрные', value: '#20140e' },
  { name: 'Тёмно-каштановые', value: '#3f2517' },
  { name: 'Каштановые', value: '#6a4020' },
  { name: 'Рыжие', value: '#9a5728' },
  { name: 'Светлые', value: '#b98a4d' },
  { name: 'Седые', value: '#aaa79f' },
] as const;

type Gender = 'm' | 'f';
type Category = 'hair' | 'headwear';

const maleHeadwear = new Set<string>(MALE_HEADWEAR_STYLES);
const femaleHeadwear = new Set<string>(FEMALE_HEADWEAR_STYLES);

function stylesFor(gender: Gender, category: Category): readonly HairStyle[] {
  const all: readonly HairStyle[] = gender === 'm' ? MALE_HAIRSTYLES : FEMALE_HAIRSTYLES;
  const headwear = gender === 'm' ? maleHeadwear : femaleHeadwear;
  return all.filter((style) => category === 'headwear' ? headwear.has(style) : !headwear.has(style));
}

function previewTraits(gender: Gender, style: HairStyle, color: string): Traits {
  return {
    skinTone: gender === 'm' ? '#dfb18c' : '#e4b995',
    hairColor: color,
    hairStyle: style,
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
  const [style, setStyle] = useState<HairStyle>(MALE_HAIRSTYLES[0]);
  const [hairColor, setHairColor] = useState<string>(HAIR_COLORS[1].value);
  const options = useMemo(() => stylesFor(gender, category), [gender, category]);
  const traits = useMemo(() => previewTraits(gender, style, hairColor), [gender, style, hairColor]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, []);

  useEffect(() => {
    if (!options.includes(style)) setStyle(options[0]);
  }, [options, style]);

  return (
    <dialog ref={dialogRef} className="hair-gallery" aria-labelledby="hair-gallery-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <header className="hair-gallery__header">
        <div>
          <span>АРХИВ ВНЕШНОСТИ · 1943</span>
          <h2 id="hair-gallery-title">ПРИЧЁСКИ И ГОЛОВНЫЕ УБОРЫ</h2>
        </div>
        <button type="button" className="metal-btn hair-gallery__close" onClick={onClose} aria-label="Закрыть галерею" autoFocus>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </header>

      <div className="hair-gallery__body">
        <section className="hair-gallery__preview" aria-label="Предпросмотр выбранной причёски">
          <div className="hair-gallery__portrait">
            <Portrait key={`${gender}-${style}-${hairColor}`} t={traits} className="hair-gallery__portrait-svg" animated />
          </div>
          <div className="hair-gallery__selected">
            <strong>{HAIRSTYLE_LABELS[style]}</strong>
            <span>{gender === 'm' ? 'Мужской портрет' : 'Женский портрет'} · {category === 'hair' ? 'причёска' : 'головной убор'}</span>
          </div>

          <div className="hair-gallery__swatches" role="group" aria-label="Цвет волос">
            {HAIR_COLORS.map((color) => (
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
              onClick={() => { setGender('m'); setStyle(stylesFor('m', category)[0]); }}>Мужчина</button>
            <button type="button" role="tab" aria-selected={gender === 'f'} className={`metal-btn${gender === 'f' ? ' is-active' : ''}`}
              onClick={() => { setGender('f'); setStyle(stylesFor('f', category)[0]); }}>Женщина</button>
          </div>
          <div className="hair-gallery__tabs" role="tablist" aria-label="Тип оформления волос">
            <button type="button" role="tab" aria-selected={category === 'hair'} className={`metal-btn${category === 'hair' ? ' is-active' : ''}`}
              onClick={() => { setCategory('hair'); setStyle(stylesFor(gender, 'hair')[0]); }}>Причёски</button>
            <button type="button" role="tab" aria-selected={category === 'headwear'} className={`metal-btn${category === 'headwear' ? ' is-active' : ''}`}
              onClick={() => { setCategory('headwear'); setStyle(stylesFor(gender, 'headwear')[0]); }}>Головные уборы</button>
          </div>

          <div className="hair-gallery__options" role="listbox" aria-label="Доступные варианты">
            {options.map((option, index) => (
              <button key={option} type="button" role="option" aria-selected={style === option}
                className={`hair-option${style === option ? ' is-active' : ''}`} onClick={() => setStyle(option)}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{HAIRSTYLE_LABELS[option]}</strong>
              </button>
            ))}
          </div>
        </section>
      </div>
    </dialog>
  );
}