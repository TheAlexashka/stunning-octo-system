import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Portrait } from './Portrait';
import { EyeZoom, NailsZoom } from './InspectionViews';
import { DentalInspection, GlassesInspection, GlovesInspection } from './DentalInspection';
import { BodyHairInspection } from './BodyHairInspection';
import { DocumentDesk } from './DocumentDesk';
import { DocumentTray } from './DocumentTray';
import { FieldNotebook } from './FieldNotebook';
import { SpeechControls, VisitorText } from './VisitorSpeech';
import { useDentalConversation, useGlassesConversation, useGlovesConversation } from '../game/dentalDialogue';
import { useGoebbelsDialogue } from '../game/goebbelsDialogue';
import { useHairConversation } from '../game/hairDialogue';
import { useVisitorSpeech } from '../game/useVisitorSpeech';
import { emptyDeskProgress, type InspectionProgress } from '../game/conversation';
import { type CreatureType, type Visitor } from '../game/visitors';
import { shiftDate, shiftLabel, type SessionState, type Shift, type Tool } from '../game/session';
import { playStamp } from '../game/sounds';
import { EyeSelector, type EyeSide } from './EyeSelector';
import { BreathInspection } from './BreathInspection';
import { useBreathConversation } from '../game/breathDialogue';
import { useEyeQuestionConversation } from '../game/eyeDialogue';
import { AlarmModal } from './AlarmModal';
import type { AlarmEvidenceId } from '../game/alarmReasons';
import { normalizeArrivalSpeech } from '../game/arrivalPhrases';
import { useBagConversation } from '../game/bagDialogue';
import { useNailShineConversation } from '../game/nailDialogue';
import { useTeethQuestionConversation } from '../game/teethQuestionDialogue';
import { DialogInspectionLayout } from './DentalInspection';
import { BagInspection } from './BagInspection';

type Props = {
  shift: Shift;
  visitor: Visitor;
  total: number;
  errors: number;
  tool: Tool;
  setTool: (value: Tool) => void;
  paused: boolean;
  stamped: SessionState['stamped'];
  onApprove: () => void;
  onRefuse: () => void;
  onAlarm: () => void;
  showDenyMenu: boolean;
  onCloseDeny: () => void;
  onSelectCreature: (type: CreatureType, reasons?: AlarmEvidenceId[]) => void;
  feedback: string | null;
  processed: number;
  initial: InspectionProgress | null;
  registerSnapshot: (read: (() => InspectionProgress) | null) => void;
  goebbelsConfrontationStep?: number;
};

export function GameScreen(props: Props) {
  const v = props.visitor;
  const blocked = !!props.stamped;
  const isGoebbels = v.specialOutcome === 'goebbels';
  const initialDesk = props.initial?.desk ?? emptyDeskProgress();
  const [docsRequested, setDocsRequested] = useState(initialDesk.docsRequested);
  const [passportTaken, setPassportTaken] = useState(initialDesk.passportTaken);
  const [visaTaken, setVisaTaken] = useState(initialDesk.visaTaken);
  const [activeDoc, setActiveDoc] = useState(initialDesk.activeDoc);
  const [ageAsked, setAgeAsked] = useState(initialDesk.ageAsked);
  const [occupationStage, setOccupationStage] = useState(initialDesk.occupationStage);
  const [missingDocumentAsked, setMissingDocumentAsked] = useState(initialDesk.missingDocumentAsked ?? false);
  const [weightMeasured, setWeightMeasured] = useState(initialDesk.weightMeasured ?? false);
  const [heightMeasured, setHeightMeasured] = useState(initialDesk.heightMeasured ?? false);
  const [browGesture, setBrowGesture] = useState<'none' | 'both' | 'one'>('none');
  const [voiceAsked, setVoiceAsked] = useState(initialDesk.voiceAsked ?? false);
  const [checkedSigns, setCheckedSigns] = useState(initialDesk.checkedSigns);
  const [eyeSide, setEyeSide] = useState<EyeSide>(initialDesk.eyeSide ?? 'right');
  const [checkedEyes, setCheckedEyes] = useState<EyeSide[]>(initialDesk.checkedEyes ?? []);
  const [scleraAsked, setScleraAsked] = useState(initialDesk.scleraAsked ?? false);
  const [shapeAsked, setShapeAsked] = useState(initialDesk.shapeAsked ?? false);
  const [flashlightOn, setFlashlightOn] = useState(false);
  const breathProgress = useRef(props.initial?.breathProgress ?? 0);
  const recordBreathProgress = useCallback((value: number) => { breathProgress.current = value; }, []);
  const quoteRef = useRef<HTMLDivElement>(null);
  const speech = useVisitorSpeech(v.voice, v.quote, props.paused, blocked, normalizeArrivalSpeech(initialDesk.speech, v.quote));
  const regularDental = useDentalConversation(v.id, props.paused, props.initial?.teeth, blocked, speech.speak, v.traits.gender);
  const goebbelsTeeth = useGoebbelsDialogue(v.id, props.paused, 'teeth', props.initial?.teeth, blocked, speech.speak, v.traits.gender);
  const dental = isGoebbels ? goebbelsTeeth : regularDental;
  const teethQuestion = useTeethQuestionConversation({ visitorId: v.id, traits: v.traits, paused: props.paused, disabled: blocked, onReply: speech.speak, gender: v.traits.gender, initial: props.initial?.teethq });
  const glasses = useGlassesConversation(v.id, props.paused, props.initial?.glasses, blocked, speech.speak, v.traits.gender);
  const regularGloves = useGlovesConversation(v.id, props.paused, props.initial?.gloves, blocked, speech.speak, v.traits.gender);
  const goebbelsGloves = useGoebbelsDialogue(v.id, props.paused, 'gloves', props.initial?.gloves, blocked, speech.speak, v.traits.gender);
  const gloves = isGoebbels ? goebbelsGloves : regularGloves;
  const hair = useHairConversation(v.id, v.traits.bodyHair, props.paused, props.initial?.hair, blocked, speech.speak, v.traits.gender, v.traits.hasScales, v.actualType === 'mermaid' ? 'mermaid' : v.actualType === 'human' ? 'human' : 'other', isGoebbels ? 'goebbels' : undefined);
  const nailShine = useNailShineConversation({ visitorId: v.id, pearly: v.traits.pearlyNails, algae: v.traits.nailAlgae, paused: props.paused, disabled: blocked, onReply: speech.speak, gender: v.traits.gender });
  const regularBag = useBagConversation(v.id, props.paused, props.initial?.bag, blocked, speech.speak, v.traits.gender);
  const goebbelsBag = useGoebbelsDialogue(v.id, props.paused, 'bag', props.initial?.bag, blocked, speech.speak, v.traits.gender);
  const bag = isGoebbels ? goebbelsBag : regularBag;
  const regularBreath = useBreathConversation(v.id, props.paused, props.initial?.breath, blocked, speech.speak, v.traits.gender);
  const goebbelsBreath = useGoebbelsDialogue(v.id, props.paused, 'breath', props.initial?.breath, blocked, speech.speak, v.traits.gender);
  const breath = isGoebbels ? goebbelsBreath : regularBreath;
  const scleraConv = useEyeQuestionConversation({
    visitorId: v.id, isBloodshot: v.traits.bloodshotSclera, eyeShape: v.traits.eyeShape,
    paused: props.paused, disabled: blocked, onReply: speech.speak, gender: v.traits.gender, kind: 'sclera', specialCharacter: isGoebbels ? 'goebbels' : undefined,
  });
  const shapeConv = useEyeQuestionConversation({
    visitorId: v.id, isBloodshot: v.traits.bloodshotSclera, eyeShape: v.traits.eyeShape,
    paused: props.paused, disabled: blocked, onReply: speech.speak, gender: v.traits.gender, kind: 'shape', specialCharacter: isGoebbels ? 'goebbels' : undefined,
  });

  useEffect(() => { if (quoteRef.current) quoteRef.current.scrollTop = 0; }, [speech.text, speech.serial]);
  useEffect(() => {
    const step = props.goebbelsConfrontationStep ?? 0;
    if (!isGoebbels || step < 1 || step > 3) return;
    const lines = [
      'Вы хотите меня развернуть? Посмотрите на документы — всё перед вами.',
      'Спокойно. Не нужно повышать голос. Давайте ещё раз сверим карточку.',
      'Я устал это повторять. Решайте уже, только не задерживайте меня.',
    ];
    triggerBrowGesture('both');
    speech.speak(lines[step - 1]);
  }, [isGoebbels, props.goebbelsConfrontationStep, speech.speak]);
  useEffect(() => {
    if (props.tool !== 'eye' || props.paused || blocked || (v.traits.wearsGlasses && glasses.phase !== 'accepted')) return;
    setCheckedEyes((previous) => previous.includes(eyeSide) ? previous : [...previous, eyeSide]);
  }, [props.tool, props.paused, blocked, v.traits.wearsGlasses, glasses.phase, eyeSide]);

  useLayoutEffect(() => {
    props.registerSnapshot(() => ({
      teeth: dental.snapshot(), glasses: glasses.snapshot(), gloves: gloves.snapshot(), hair: hair.snapshot(),
      breath: breath.snapshot(), nail: nailShine.snapshot(), teethq: teethQuestion.snapshot(), ...(props.shift >= 7 ? { bag: bag.snapshot() } : {}), breathProgress: breathProgress.current,
      desk: {
        docsRequested, passportTaken, visaTaken, activeDoc, ageAsked, occupationStage, missingDocumentAsked, weightMeasured, heightMeasured, checkedSigns,
        voiceAsked, speech: speech.snapshot(), eyeSide, checkedEyes, scleraAsked, shapeAsked,
      },
    }));
    return () => props.registerSnapshot(null);
  });

  function askSclera() {
    if (props.paused || blocked) return;
    setScleraAsked(true);
    scleraConv.request();
  }
  function askShape() {
    if (props.paused || blocked) return;
    setShapeAsked(true);
    shapeConv.request();
  }
  function toggleFlashlight() {
    if (props.paused || blocked || props.shift < 6 || props.tool !== 'eye'
      || (v.traits.wearsGlasses && glasses.phase !== 'accepted')) return;
    setFlashlightOn((prev) => {
      const next = !prev;
      if (next && isGoebbels) speech.speak('Чёрт, уберите фонарь! Вы мне прямо в глаза светите.');
      return next;
    });
  }

  function chooseTool(selection: Exclude<Tool, null>) {
    if (props.paused || blocked) return;
    if (selection === 'breath' && props.shift < 4) return;
    if (selection === 'bag' && props.shift < 7) return;
    const next = props.tool === selection ? null : selection;
    props.setTool(next);
    if (next !== 'eye') setFlashlightOn(false);
    if (next === 'teeth') dental.request();
    if (next === 'eye' && v.traits.wearsGlasses) glasses.request();
    if (next === 'nails' && v.traits.wearsGloves) gloves.request();
    if (next === 'breath') breath.request();
  }
  function requestDocuments() {
    if (props.paused || blocked || docsRequested) return;
    playStamp(); setDocsRequested(true);
    speech.speak(v.missingDocument
      ? v.missingDocument === 'passport'
        ? 'Вот рабочая виза. Паспорт я, кажется, оставил дома — сейчас объясню.'
        : 'Вот паспорт. Рабочую визу я, похоже, не взял с собой — сейчас объясню.'
      : 'Вот мои документы: паспорт и рабочее разрешение. Возьмите в окошке.');
  }
  function takeDocument(doc: 'passport' | 'visa') {
    if (props.paused || blocked || !docsRequested || v.missingDocument === doc) return;
    playStamp();
    if (doc === 'passport') setPassportTaken(true); else setVisaTaken(true);
    setActiveDoc(doc); props.setTool(null);
  }
  function takeAllDocuments() {
    if (props.paused || blocked || !docsRequested) return;
    playStamp();
    setPassportTaken(v.missingDocument !== 'passport');
    setVisaTaken(v.missingDocument !== 'visa');
    setActiveDoc(v.missingDocument === 'passport' ? 'visa' : 'passport');
    props.setTool(null);
  }
  function triggerBrowGesture(gesture: 'both' | 'one') {
    setBrowGesture('none');
    window.setTimeout(() => setBrowGesture(gesture), 20);
    window.setTimeout(() => setBrowGesture('none'), 1250);
  }
  function askMissingDocument() {
    if (props.paused || blocked || !v.missingDocument || missingDocumentAsked) return;
    setMissingDocumentAsked(true);
    speech.speak(v.missingDocumentReply);
  }
  function measureWeight() {
    if (props.paused || blocked || props.shift < 10 || weightMeasured) return;
    setWeightMeasured(true);
    if (isGoebbels) triggerBrowGesture('one');
    speech.speak(v.weightReply);
  }
  function measureHeight() {
    if (props.paused || blocked || props.shift < 10 || heightMeasured) return;
    setHeightMeasured(true);
    if (isGoebbels) triggerBrowGesture('one');
    speech.speak(v.heightReply);
  }
  function askAge() {
    if (props.paused || blocked || !passportTaken) return;
    setAgeAsked(true); speech.speak(v.greyHairReply);
  }
  function askOccupation() {
    if (props.paused || blocked) return;
    setOccupationStage(occupationStage === 0 ? 1 : 2);
    speech.speak(occupationStage === 0 ? v.occupationInitialReply : v.occupationFollowUpReply);
  }
  function askVoice() {
    if (props.paused || blocked) return;
    setVoiceAsked(true);
    if (isGoebbels) triggerBrowGesture('both');
    speech.speak(v.voiceReply);
  }
  function toggleSign(id: string) {
    if (props.paused || blocked) return;
    setCheckedSigns((previous) => previous.includes(id) ? previous.filter((value) => value !== id) : [...previous, id]);
  }
  function changeEye(side: EyeSide) {
    if (!props.paused && !blocked) setEyeSide(side);
  }

  const measurementsComplete = props.shift < 10 || (weightMeasured && heightMeasured);
  const dialogLayout = props.tool === 'teeth' || props.tool === 'skin' || props.tool === 'breath' || props.tool === 'bag'
    || (props.tool === 'eye' && v.traits.wearsGlasses) || (props.tool === 'nails' && v.traits.wearsGloves);
  const shared = { traits: v.traits, name: v.name, speech, paused: props.paused, disabled: blocked, onBack: () => props.setTool(null) };
  const tools: ReadonlyArray<readonly [Exclude<Tool, null>, string]> = props.shift >= 7
    ? [['eye', 'ГЛАЗ'], ['teeth', 'ЗУБЫ'], ['nails', 'НОГТИ'], ['skin', 'КОЖА'], ['breath', 'ДЫХАНИЕ'], ['bag', 'СУМКА']]
    : props.shift >= 4
    ? [['eye', 'ГЛАЗ'], ['teeth', 'ЗУБЫ'], ['nails', 'НОГТИ'], ['skin', 'КОЖА'], ['breath', 'ДЫХАНИЕ']]
    : [['eye', 'ГЛАЗ'], ['teeth', 'ЗУБЫ'], ['nails', 'НОГТИ'], ['skin', 'КОЖА']];

  return (
    <div className="game-screen wood">
      <section className="visitor-panel" aria-label="Окно приёма">
        <div className="visitor-panel__top"><span>ОКНО ПРИЁМА · {shiftLabel(props.shift).toUpperCase()}</span><span>{props.processed + 1} / {props.total}</span></div>
        <div className="visitor-window"><div className="visitor-photo-frame">
          <Portrait t={v.traits} className="visitor-portrait" animated={!props.paused}
            irisScale={0.72} irisOffsetY={-0.8}
            glassesRemoved={!v.traits.wearsGlasses || glasses.phase === 'accepted'}
            browGesture={browGesture}
            mouthScale={isGoebbels ? 1.18 : 1}
            mouthHeightScale={isGoebbels ? 0.48 : 1} />
          <div className="visitor-bars" aria-hidden="true" />
        </div></div>
        <div className="visitor-quote" ref={quoteRef}>
          {voiceAsked && speech.text === v.voiceReply && <span className="speech-clerk-prompt">Клерк: {v.voiceQuestion}</span>}
          <VisitorText text={speech.text} speech={speech} />
        </div>
        <SpeechControls speech={speech} paused={props.paused} disabled={blocked} onAskVoice={askVoice} asked={voiceAsked} />
        <DocumentTray requested={docsRequested} passportTaken={passportTaken} visaTaken={visaTaken} missingDocument={v.missingDocument} disabled={blocked || props.paused} onRequest={requestDocuments} onTake={takeDocument} onTakeAll={takeAllDocuments} />
      </section>

      <div className="game-bottom">
        <main className="game-main-column">
          <div className={`tool-bar${props.shift >= 7 ? ' tool-bar--six' : props.shift >= 4 ? ' tool-bar--five' : ''}`} aria-label="Инструменты осмотра">
            {tools.map(([tool, label]) => (
              <button key={tool} className={`metal-btn tool-button${props.tool === tool ? ' is-active' : ''}`} aria-pressed={props.tool === tool} disabled={blocked} onClick={() => chooseTool(tool)}>{label}</button>
            ))}
          </div>
          <div className="inspection-panel">
            {props.tool ? (
              <div className={`inspection-content${dialogLayout ? ' inspection-content--dental' : ''}`} key={props.tool}>
                <div className="inspection-title">
                  {props.tool === 'eye'
                    ? (flashlightOn ? '— ОПТИЧЕСКАЯ ЛУПА · ФОНАРИК ВКЛЮЧЁН —' : '— ОПТИЧЕСКАЯ ЛУПА —')
                    : props.tool === 'teeth' ? '— ОСМОТР ЗУБОВ —' : props.tool === 'nails' ? '— ОСМОТР ОБЕИХ РУК —' : props.tool === 'bag' ? '— ДОСМОТР РУЧНОЙ КЛАДИ —' : props.tool === 'breath' ? '— ПРОБА ДЫХАНИЯ —' : '— КОЖНАЯ ПРОБА —'}
                </div>
                {props.tool === 'bag' ? <BagInspection {...shared} items={v.bagItems} conversation={bag}
                  notedDrops={checkedSigns.includes('belladonna_drops')} onNoteDrops={() => {
                    if (!props.paused && !blocked && bag.phase === 'accepted' && v.bagItems.includes('belladonna'))
                      setCheckedSigns(previous => previous.includes('belladonna_drops') ? previous : [...previous, 'belladonna_drops']);
                  }} />
                  : props.tool === 'teeth' ? <DentalInspection {...shared} conversation={dental} question={teethQuestion} />
                  : props.tool === 'skin' ? <BodyHairInspection traits={v.traits} name={v.name} conversation={hair} speech={speech} paused={props.paused} disabled={blocked} />
                    : props.tool === 'breath' ? <BreathInspection result={v.breathResult} odor={v.breathOdor} name={v.name} conversation={breath} speech={speech} paused={props.paused} disabled={blocked} onBack={() => props.setTool(null)} initialProgress={breathProgress.current} onProgress={recordBreathProgress} />
                    : props.tool === 'eye' && v.traits.wearsGlasses ? (
                      <GlassesInspection
                        {...shared}
                        conversation={glasses}
                        eyeSide={eyeSide}
                        onEyeSide={changeEye}
                        checkedEyes={checkedEyes}
                        onAskSclera={askSclera}
                        onAskShape={askShape}
                        scleraAsked={scleraAsked}
                        shapeAsked={shapeAsked}
                        flashlightOn={props.shift >= 6 && flashlightOn}
                        onToggleFlashlight={props.shift >= 6 ? toggleFlashlight : undefined}
                      />
                    ) : props.tool === 'nails' && v.traits.wearsGloves && gloves.phase !== 'accepted' ? <GlovesInspection {...shared} conversation={gloves} />
                      : props.tool === 'eye' ? (
                        <div className="inspection-eye-content">
                          <EyeSelector
                            side={eyeSide}
                            onChange={changeEye}
                            checked={checkedEyes}
                            disabled={blocked || props.paused}
                            onAskSclera={askSclera}
                            onAskShape={askShape}
                            scleraAsked={scleraAsked}
                            shapeAsked={shapeAsked}
                            isBloodshot={v.traits.bloodshotSclera}
                            flashlightOn={props.shift >= 6 && flashlightOn}
                            onToggleFlashlight={props.shift >= 6 ? toggleFlashlight : undefined}
                            showFlashlight={props.shift >= 6}
                          />
                          <div className="inspection-visual">
                            <EyeZoom key={eyeSide} t={v.traits} side={eyeSide} paused={props.paused || blocked} flashlightOn={props.shift >= 6 && flashlightOn} />
                          </div>
                        </div>
                      ) : (v.traits.pearlyNails || v.traits.nailAlgae) ? <DialogInspectionLayout ariaLabel="Осмотр ногтей и вопрос о блеске" heading="НОГТИ · ВОПРОС О БЛЕСКЕ"
                        badgeClosed={nailShine.phase === 'refused' ? 'ВОПРОС ЗАКРЫТ' : 'ЖДЁМ ВОПРОСА'} badgeOpen="ОТВЕТ ПОЛУЧЕН"
                        requestButtonLabel={v.traits.pearlyNails ? 'Спросить про перламутровый блеск ногтей' : 'Спросить про зелень под ногтями'}
                        refusalText="Посетитель ушёл от вопроса. Блеск или тина остаются непроверенными — смотрите другие признаки."
                        visual={<NailsZoom t={v.traits} paused={props.paused || blocked} />}
                        name={v.name} conversation={nailShine} speech={speech} paused={props.paused} disabled={blocked} onBack={() => props.setTool(null)} />
                        : <div className="inspection-visual inspection-visual--hands"><NailsZoom t={v.traits} paused={props.paused || blocked} /></div>}
              </div>
            ) : <DocumentDesk visitor={v} shift={props.shift} docsRequested={docsRequested} passportTaken={passportTaken} visaTaken={visaTaken} missingDocument={v.missingDocument} missingDocumentAsked={missingDocumentAsked} weightMeasured={weightMeasured} heightMeasured={heightMeasured} activeDoc={activeDoc} setActiveDoc={setActiveDoc}
              ageAsked={ageAsked} occupationStage={occupationStage} voiceAsked={voiceAsked} speech={speech} onRequestDocs={requestDocuments} onTakeDoc={takeDocument} onAskMissingDocument={askMissingDocument} onMeasureWeight={measureWeight} onMeasureHeight={measureHeight}
              onAskAge={askAge} onAskOccupation={askOccupation} stamped={props.stamped} disabled={blocked || props.paused} />}
            {props.feedback && <div className="game-feedback" role="status">{props.feedback}</div>}
          </div>
          <div className="action-bar action-bar--three">
            <button type="button" className="metal-btn approve-btn" onClick={props.onApprove} disabled={blocked || !measurementsComplete} title={measurementsComplete ? 'Пропустить человека с исправными документами' : 'Сначала внесите рост и вес в каталог'}>ПРОПУСТИТЬ</button>
            <button type="button" className="metal-btn refuse-btn" onClick={props.onRefuse} disabled={blocked || !measurementsComplete} title={measurementsComplete ? 'Отказать во въезде без выстрела' : 'Сначала внесите рост и вес в каталог'}>ОТКАЗАТЬ</button>
            <div className="alarm-btn-wrap"><button type="button" className="sd-alarm-btn" onClick={props.onAlarm} disabled={blocked || !measurementsComplete} aria-label="Тревога СД: идентификация нежити">
              <span className="sd-alarm-btn__core"><span className="sd-alarm-btn__shine" aria-hidden="true" /><span className="sd-alarm-btn__label">СД</span></span>
            </button><span className="alarm-btn-caption">ОГОНЬ</span></div>
          </div>
        </main>
        <aside className="game-sidebar">
          <section className="status-panel"><div className="status-panel__heading">СТАТУС СЛУЖБЫ</div><div className="status-panel__clerk">Клерк № 4471</div><div className="status-panel__detail">Пост: Ostmark-3 · {shiftLabel(props.shift)}</div><div className="status-panel__detail">{shiftDate(props.shift)}</div></section>
          <section className="errors-panel" aria-label={`Ошибки: ${props.errors} из 3`}>
            <div className="errors-panel__heading"><span>ОШИБКИ</span><span>{props.errors} / 3</span></div>
            <div className="error-meter" aria-hidden="true">{Array.from({ length: 3 }, (_, i) => <span key={i} className={i < props.errors ? 'error-meter__mark is-active' : 'error-meter__mark'} />)}</div>
          </section>
          <FieldNotebook shift={props.shift} checked={checkedSigns} onToggle={toggleSign} onClear={() => setCheckedSigns([])} disabled={blocked || props.paused} />
        </aside>
      </div>
      {props.showDenyMenu && (
        <AlarmModal
          shift={props.shift}
          requireEvidence={props.shift >= 5}
          onConfirm={(type, reasons) => props.onSelectCreature(type, reasons)}
          onClose={props.onCloseDeny}
        />
      )}
    </div>
  );
}
