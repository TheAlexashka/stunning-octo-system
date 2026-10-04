import { useId, useState } from 'react';
import { DialogInspectionLayout } from './DentalInspection';
import type { Conversation } from '../game/conversation';
import type { VisitorSpeech } from '../game/useVisitorSpeech';
import { BAG_ITEMS, type BagItemId } from '../game/bagItems';
import { BelladonnaBottle } from './BelladonnaBottle';
import './BagInspection.css';

export function BagInspection({ items, name, conversation, speech, paused, disabled, onBack, notedDrops, onNoteDrops }: {
  items: readonly BagItemId[]; name: string; conversation: Conversation; speech: VisitorSpeech;
  paused: boolean; disabled: boolean; onBack: () => void; notedDrops: boolean; onNoteDrops: () => void;
}) {
  const uid = `bag-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const [selected, setSelected] = useState<BagItemId | null>(null);
  const opened = conversation.phase === 'accepted';
  const active = opened && selected && items.includes(selected) ? selected : null;
  return <DialogInspectionLayout ariaLabel="Досмотр сумки" heading="РУЧНАЯ КЛАДЬ · ВЫЛОЖИТЬ НА СТОЛ"
    badgeClosed={conversation.phase === 'refused' ? 'ДОСМОТР НЕ СОСТОЯЛСЯ' : 'СУМКА ЗАКРЫТА'} badgeOpen="СОДЕРЖИМОЕ НА СТОЛЕ"
    requestButtonLabel="Попросить выпотрошить сумку"
    refusalText="Содержимое не осмотрено. Закрытая сумка не означает, что в ней ничего нет. Проверьте другие признаки."
    name={name} conversation={conversation} speech={speech} paused={paused} disabled={disabled} onBack={onBack}
    visual={<div className="bag-inspection-table" data-bag-opened={opened}>
      {!opened ? <div className="bag-closed">
        <svg viewBox="0 0 300 190" role="img" aria-label="Закрытая дорожная сумка">
          <defs><linearGradient id={`${uid}-leather`} x1="0" x2="1"><stop stopColor="#2f241b" /><stop offset=".5" stopColor="#735134" /><stop offset="1" stopColor="#38271c" /></linearGradient></defs>
          <path d="M104 53 C104 7 196 7 196 53" fill="none" stroke="#906846" strokeWidth="10" />
          <path d="M37 58 Q150 40 263 58 L277 162 Q150 190 23 162 Z" fill={`url(#${uid}-leather)`} stroke="#130e0b" strokeWidth="4" />
          <path d="M42 60 Q150 94 258 60 L252 109 Q150 145 48 109 Z" fill="#513923" stroke="#b08a58" strokeWidth="1.2" />
          <path d="M75 62 L72 157 M225 62 L228 157" stroke="#1d140e" strokeWidth="9" />
          <rect x="135" y="94" width="30" height="27" rx="3" fill="#907346" stroke="#2a2117" strokeWidth="2" /><path d="M144 105 H157" stroke="#e4c78e" strokeWidth="2" />
        </svg>
        <p>Сначала попросите выложить вещи.</p>
      </div> : <>
        <div className="bag-items" aria-label="Предметы из сумки">
          {items.map(id => <button key={id} type="button" className={`bag-item${active === id ? ' is-selected' : ''}`}
            disabled={paused || disabled} onClick={() => setSelected(id)} data-bag-item={id}>
            {id === 'belladonna' ? <BelladonnaBottle className="bag-drop-bottle" /> : <OrdinaryBagItem id={id} kind={BAG_ITEMS[id].kind} />}
            <span>{BAG_ITEMS[id].title}</span>
          </button>)}
        </div>
        <div className="bag-item-detail" aria-live="polite">
          {active ? <>
            <strong>{BAG_ITEMS[active].title}</strong><p>{BAG_ITEMS[active].note}</p>
            {active === 'belladonna' && <>
              <button type="button" className="metal-btn bag-note-btn" onClick={onNoteDrops} disabled={paused || disabled || notedDrops}>
                {notedDrops ? 'Капли отмечены в записной книжке' : 'Отметить капли как улику'}
              </button>
            </>}
          </> : <p>Вещи выложены. Нажмите на предмет, чтобы рассмотреть его. Отсутствие капель не доказывает, что посетитель — человек.</p>}
        </div>
      </>}
    </div>} />;
}

function OrdinaryBagItem({ id, kind }: { id: BagItemId; kind: 'paper' | 'cloth' | 'comb' | 'parcel' }) {
  if (id === 'partyBadge') return <PartyBadgeArtwork />;
  if (id === 'partyDirective') return <PartyDirectiveArtwork />;
  if (id === 'partyArmband') return <PartyArmbandArtwork />;
  if (id === 'partyCards') return <PartyCardsArtwork />;
  return <svg viewBox="0 0 110 90" role="img" aria-label="Дорожная вещь">
    {kind === 'paper' ? <><path d="M21 17 L80 12 L88 70 L29 77 Z" fill="#cbb38a" stroke="#775b36" strokeWidth="2" /><path d="M31 33 L72 28 M33 43 L75 38 M35 53 L62 49" stroke="#7d694d" strokeWidth="2" /><circle cx="70" cy="59" r="8" fill="none" stroke="#8d433a" strokeWidth="2" /></>
      : kind === 'comb' ? <><path d="M17 29 Q55 12 93 28 L91 42 L19 45 Z" fill="#866443" stroke="#3e2a19" strokeWidth="2" />{Array.from({length:12},(_,i)=><path key={i} d={`M${22+i*6} 40 V65`} stroke="#9f7a4a" strokeWidth="3" />)}</>
        : kind === 'cloth' ? <><path d="M23 19 L83 27 L78 74 L17 62 Z" fill="#bdb39e" stroke="#766b54" strokeWidth="2" /><path d="M30 23 L25 61 L75 69 M25 46 L79 43" fill="none" stroke="#e0d5ba" strokeWidth="2" /></>
          : <><path d="M20 27 L89 23 L85 69 L24 73 Z" fill="#ae8b5e" stroke="#60452d" strokeWidth="2" /><path d="M23 29 L85 67 M84 26 L25 69" stroke="#d1b386" strokeWidth="2" /><path d="M17 46 L92 44" stroke="#675237" strokeWidth="3" /></>}
  </svg>;
}

function PartyBadgeArtwork() {
  return <svg viewBox="0 0 110 90" role="img" aria-label="Партийный значок">
    <circle cx="55" cy="44" r="26" fill="#9e2f2b" stroke="#271811" strokeWidth="3" />
    <circle cx="55" cy="44" r="18" fill="#d2b477" stroke="#271811" strokeWidth="2" />
    <PartyMark color="#302018" transform="translate(55 44)" />
  </svg>;
}

function PartyDirectiveArtwork() {
  return <svg viewBox="0 0 110 90" role="img" aria-label="Служебная партийная записка">
    <path d="M18 14 H79 L92 26 V76 H18 Z" fill="#b7332f" stroke="#261711" strokeWidth="2.5" />
    <path d="M79 14 V27 H92" fill="#d66d51" stroke="#261711" strokeWidth="2" />
    <path d="M28 36 H80 M28 47 H75 M28 58 H65" stroke="#ecd0a1" strokeWidth="3" />
    <PartyMark color="#261711" transform="translate(35 68) scale(.55)" />
  </svg>;
}

function PartyArmbandArtwork() {
  return <svg viewBox="0 0 110 90" role="img" aria-label="Партийная повязка">
    <path d="M14 27 Q55 13 96 27 L91 64 Q55 76 19 64 Z" fill="#a92d2b" stroke="#271811" strokeWidth="3" />
    <path d="M30 25 L27 65 M80 25 L83 65" stroke="#e1c58d" strokeWidth="2" opacity=".7" />
    <PartyMark color="#272019" transform="translate(55 46) scale(.85)" />
  </svg>;
}

function PartyCardsArtwork() {
  return <svg viewBox="0 0 110 90" role="img" aria-label="Партийные удостоверения">
    <g transform="rotate(-8 55 45)">
      <rect x="18" y="17" width="67" height="53" fill="#d2b477" stroke="#281a12" strokeWidth="2" />
      <rect x="26" y="26" width="21" height="28" fill="#8f7860" stroke="#281a12" strokeWidth="1.5" />
      <path d="M53 30 H76 M53 39 H72 M53 48 H78 M29 60 H75" stroke="#5b3927" strokeWidth="2" />
      <PartyMark color="#8f2f2b" transform="translate(74 61) scale(.5)" />
    </g>
    <g transform="translate(13 8) rotate(9 55 45)" opacity=".92">
      <rect x="18" y="17" width="67" height="53" fill="#b84a37" stroke="#281a12" strokeWidth="2" />
      <path d="M29 31 H75 M29 41 H68 M29 51 H74" stroke="#edd2a1" strokeWidth="2" />
      <PartyMark color="#d2b477" transform="translate(74 61) scale(.5)" />
    </g>
  </svg>;
}

function PartyMark({ color, transform }: { color: string; transform: string }) {
  return <g transform={transform}>
    <circle cx="0" cy="0" r="5.4" fill="#f2efe6" stroke="rgba(0,0,0,.3)" strokeWidth=".4" />
    <g transform="rotate(45)" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="square">
      <path d="M-3.4 0 H3.4 M0 -3.4 V3.4" />
      <path d="M-3.4 0 v-2.4 M3.4 0 v2.4 M0 -3.4 h2.4 M0 3.4 h-2.4" />
    </g>
  </g>;
}
