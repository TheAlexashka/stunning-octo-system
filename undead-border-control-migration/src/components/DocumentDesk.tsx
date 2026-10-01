import { useState } from 'react';
import type { Visitor } from '../game/visitors';
import type { SessionState } from '../game/session';
import type { VisitorSpeech } from '../game/useVisitorSpeech';
import { Portrait } from './Portrait';
import { VisitorText } from './VisitorSpeech';
import './DocumentDesk.css';

type DocumentType = 'passport' | 'visa';
type Props = {
  visitor: Visitor;
  docsRequested: boolean;
  passportTaken: boolean;
  visaTaken: boolean;
  activeDoc: DocumentType;
  setActiveDoc: (doc: DocumentType) => void;
  ageAsked: boolean;
  occupationStage: 0 | 1 | 2;
  voiceAsked: boolean;
  speech: VisitorSpeech;
  onRequestDocs: () => void;
  onTakeDoc: (doc: DocumentType) => void;
  onAskAge: () => void;
  onAskOccupation: () => void;
  stamped: SessionState['stamped'];
  disabled: boolean;
};

export function DocumentDesk(props: Props) {
  const [sideBySide, setSideBySide] = useState(false);
  const v = props.visitor;
  if (!props.docsRequested || (!props.passportTaken && !props.visaTaken)) {
    return (
      <div className="desk-empty">
        <div className="desk-empty__title">{props.docsRequested ? 'БУМАГИ В ЛОТКЕ' : 'СТОЛ ДОСМОТРА'}</div>
        <p className="desk-empty__text">{props.docsRequested
          ? 'Документы под окном. На телефоне нажмите на бумагу, чтобы взять её; мышью можно потянуть вниз.'
          : 'Попросите документы и возьмите паспорт и рабочую визу из лотка.'}</p>
        {!props.docsRequested ? <button className="metal-btn desk-question-btn" onClick={props.onRequestDocs} disabled={props.disabled}>Ваши документы!</button>
          : <div className="desk-interrogation__actions"><button className="metal-btn desk-question-btn" onClick={() => props.onTakeDoc('passport')} disabled={props.disabled}>Взять паспорт</button><button className="metal-btn desk-question-btn" onClick={() => props.onTakeDoc('visa')} disabled={props.disabled}>Взять визу</button></div>}
      </div>
    );
  }
  const currentDoc: DocumentType = props.activeDoc === 'passport' && props.passportTaken ? 'passport' : props.visaTaken ? 'visa' : 'passport';
  const both = props.passportTaken && props.visaTaken;

  const passport = (
    <article className="paper document-card desk-document">
      <header className="desk-document__heading">REICHSPASS · ПАСПОРТ</header>
      <div className="passport-content">
        <div className="document-photo"><Portrait t={v.traits} className="w-full h-full block" /></div>
        <div className="desk-document__data">
          <DocRow label="ИМЯ" value={v.name} />
          <DocRow label="ПОЛ" value={v.traits.gender === 'm' ? 'M / Мужской' : 'F / Женский'} />
          <DocRow label="РОЖДЕНИЕ" value={v.birth} onClick={props.onAskAge} asked={props.ageAsked} disabled={props.disabled} />
          <DocRow label="ГОРОД" value={v.city} />
          <DocRow label="ЗАНЯТИЕ" value={v.occupation} onClick={props.onAskOccupation} asked={props.occupationStage > 0} disabled={props.disabled} />
          <DocRow label="ЦЕЛЬ" value={v.purpose} />
        </div>
      </div>
      <footer className="desk-document__footer">№ {String(v.id).padStart(5, '0')}-DE · Действителен до 1945 г.</footer>
      <Stamp stamped={props.stamped} />
    </article>
  );
  const permit = (
    <article className="paper document-card desk-document work-permit-card">
      <header className="desk-document__heading">ARBEITSGENEHMIGUNG · РАБОЧАЯ ВИЗА</header>
      <div className="desk-document__data">
        <DocRow label="НОМЕР" value={v.visaNumber} /><DocRow label="ВЛАДЕЛЕЦ" value={v.name} />
        <DocRow label="ПРОФЕССИЯ" value={v.visaOccupation} onClick={props.onAskOccupation} asked={props.occupationStage > 0} disabled={props.disabled} />
        <DocRow label="ПРЕДПРИЯТИЕ" value={v.visaEmployer} /><DocRow label="НАЗНАЧЕНИЕ" value={v.visaCity} />
      </div>
      <footer className="desk-document__footer">Инспекция труда Остмарка · 1943 <span className="work-permit-seal">ПЕЧАТЬ</span></footer>
      <Stamp stamped={props.stamped} />
    </article>
  );

  return (
    <div className="desk-workspace">
      <div className="desk-tabs" aria-label="Документы на столе">
        <button className={`desk-tab${currentDoc === 'passport' && !sideBySide ? ' is-active' : ''}`} onClick={() => { setSideBySide(false); props.passportTaken ? props.setActiveDoc('passport') : props.onTakeDoc('passport'); }} disabled={props.disabled}>{props.passportTaken ? 'Паспорт' : 'Взять паспорт'}</button>
        <button className={`desk-tab${currentDoc === 'visa' && !sideBySide ? ' is-active' : ''}`} onClick={() => { setSideBySide(false); props.visaTaken ? props.setActiveDoc('visa') : props.onTakeDoc('visa'); }} disabled={props.disabled}>{props.visaTaken ? 'Рабочая виза' : 'Взять визу'}</button>
      </div>
      {both && <button className="desk-layout-toggle" aria-pressed={sideBySide} onClick={() => setSideBySide((value) => !value)} disabled={props.disabled}>{sideBySide ? 'Убрать второй документ' : 'Разложить документы рядом'}</button>}
      {/* Only the original records are displayed. No computed mismatch, colour
          coding, equality badge or automatic evidence mark is shown. */}
      {sideBySide && both ? <div className="document-pair">{passport}{permit}</div> : currentDoc === 'passport' ? passport : permit}
      <div className="desk-interrogation">
        <p className="desk-interrogation__hint">Нажмите на дату рождения или профессию, чтобы задать вопрос. Записи в двух документах сверяйте самостоятельно.</p>
        <div className="desk-interrogation__actions">
          <button className="metal-btn desk-question-btn" onClick={props.onAskAge} disabled={props.disabled || !props.passportTaken}>Вопрос о возрасте</button>
          <button className="metal-btn desk-question-btn" onClick={props.onAskOccupation} disabled={props.disabled}>{props.occupationStage === 0 ? 'Спросить профессию' : 'Уточнить сведения'}</button>
        </div>
        {(props.ageAsked || props.occupationStage > 0 || props.voiceAsked) && (
          <div className="desk-transcript">
            {props.ageAsked && <div className="desk-transcript__item"><span className="desk-transcript__tag">ВОЗРАСТ:</span><VisitorText text={v.greyHairReply} speech={props.speech} /></div>}
            {props.occupationStage > 0 && <div className="desk-transcript__item"><span className="desk-transcript__tag">ПРОФЕССИЯ:</span><VisitorText text={props.occupationStage === 1 ? v.occupationInitialReply : v.occupationFollowUpReply} speech={props.speech} /></div>}
            {props.voiceAsked && <div className="desk-transcript__item"><span className="desk-transcript__tag">{v.voiceQuestion}</span><VisitorText text={v.voiceReply} speech={props.speech} /></div>}
          </div>
        )}
      </div>
    </div>
  );
}

function DocRow({ label, value, onClick, asked = false, disabled = false }: { label: string; value: string; onClick?: () => void; asked?: boolean; disabled?: boolean }) {
  const content = <><span className="desk-doc-label">{label}</span><span className="desk-doc-value">{value}</span>{onClick && <span className="desk-doc-question">{asked ? 'уточнить' : 'спросить'}</span>}</>;
  return onClick ? <button type="button" className="desk-doc-row desk-doc-row--question" onClick={onClick} disabled={disabled} title="Задать вопрос об этой записи">{content}</button> : <div className="desk-doc-row">{content}</div>;
}
function Stamp({ stamped }: { stamped: SessionState['stamped'] }) {
  if (!stamped) return null;
  const label = stamped === 'APPROVED' ? 'ПРОПУЩЕН' : stamped === 'REFUSED' ? 'ОТКАЗАНО' : 'ЛИКВИДИРОВАН';
  const modifier = stamped === 'APPROVED' ? 'ok' : stamped === 'REFUSED' ? 'refuse' : 'deny';
  return <div className={`document-stamp document-stamp--${modifier} desk-document__stamp stamp font-bold tracking-widest`}>{label}</div>;
}
