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
};

export function GameScreen(props: Props) {
  const v = props.visitor;
  const blocked = !!props.stamped;
  const initialDesk = props.initial?.desk ?? emptyDeskProgress();
  const [docsRequested, setDocsRequested] = useState(initialDesk.docsRequested);
  const [passportTaken, setPassportTaken] = useState(initialDesk.passportTaken);
  const [visaTaken, setVisaTaken] = useState(initialDesk.visaTaken);
  const [activeDoc, setActiveDoc] = useState(initialDesk.activeDoc);
  const [ageAsked, setAgeAsked] = useState(initialDesk.ageAsked);
  const [occupationStage, setOccupationStage] = useState(initialDesk.occupationStage);
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
  const speech = useVisitorSpeech(v.voice, v.quote, props.paused, blocked, initialDesk.speech);
  const dental = useDentalConversation(v.id, props.paused, props.initial?.teeth, blocked, speech.speak, v.traits.gender);
  const glasses = useGlassesConversation(v.id, props.paused, props.initial?.glasses, blocked, speech.speak, v.traits.gender);
  const gloves = useGlovesConversation(v.id, props.paused, props.initial?.gloves, blocked, speech.speak, v.traits.gender);
  const hair = useHairConversation(v.id, v.traits.bodyHair, props.paused, props.initial?.hair, blocked, speech.speak, v.traits.gender);
  const breath = useBreathConversation(v.id, props.paused, props.initial?.breath, blocked, speech.speak, v.traits.gender);
  const scleraConv = useEyeQuestionConversation({
    visitorId: v.id, isBloodshot: v.traits.bloodshotSclera, eyeShape: v.traits.eyeShape,
    paused: props.paused, disabled: blocked, onReply: speech.speak, gender: v.traits.gender, kind: 'sclera',
  });
  const shapeConv = useEyeQuestionConversation({
    visitorId: v.id, isBloodshot: v.traits.bloodshotSclera, eyeShape: v.traits.eyeShape,
    paused: props.paused, disabled: blocked, onReply: speech.speak, gender: v.traits.gender, kind: 'shape',
  });

  useEffect(() => { if (quoteRef.current) quoteRef.current.scrollTop = 0; }, [speech.text, speech.serial]);
  useEffect(() => {
    if (props.tool !== 'eye' || props.paused || blocked || (v.traits.wearsGlasses && glasses.phase !== 'accepted')) return;
    setCheckedEyes((previous) => previous.includes(eyeSide) ? previous : [...previous, eyeSide]);
  }, [props.tool, props.paused, blocked, v.traits.wearsGlasses, glasses.phase, eyeSide]);

  useLayoutEffect(() => {
    props.registerSnapshot(() => ({
      teeth: dental.snapshot(), glasses: glasses.snapshot(), gloves: gloves.snapshot(), hair: hair.snapshot(),
      breath: breath.snapshot(), breathProgress: breathProgress.current,
      desk: {
        docsRequested, passportTaken, visaTaken, activeDoc, ageAsked, occupationStage, checkedSigns,
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
    setFlashlightOn((prev) => !prev);
  }

  function chooseTool(selection: Exclude<Tool, null>) {
    if (props.paused || blocked) return;
    if (selection === 'breath' && props.shift < 4) return;
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
    speech.speak('Вот мои документы: паспорт и рабочее разрешение. Возьмите в окошке.');
  }
  function takeDocument(doc: 'passport' | 'visa') {
    if (props.paused || blocked || !docsRequested) return;
    playStamp();
    if (doc === 'passport') setPassportTaken(true); else setVisaTaken(true);
    setActiveDoc(doc); props.setTool(null);
  }
  function takeAllDocuments() {
    if (props.paused || blocked || !docsRequested) return;
    playStamp(); setPassportTaken(true); setVisaTaken(true); setActiveDoc('passport'); props.setTool(null);
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
    setVoiceAsked(true); speech.speak(v.voiceReply);
  }
  function toggleSign(id: string) {
    if (props.paused || blocked) return;
    setCheckedSigns((previous) => previous.includes(id) ? previous.filter((value) => value !== id) : [...previous, id]);
  }
  function changeEye(side: EyeSide) {
    if (!props.paused && !blocked) setEyeSide(side);
  }

  const dialogLayout = props.tool === 'teeth' || props.tool === 'skin' || props.tool === 'breath'
    || (props.tool === 'eye' && v.traits.wearsGlasses) || (props.tool === 'nails' && v.traits.wearsGloves);
  const shared = { traits: v.traits, name: v.name, speech, paused: props.paused, disabled: blocked, onBack: () => props.setTool(null) };
  const tools: ReadonlyArray<readonly [Exclude<Tool, null>, string]> = props.shift >= 4
    ? [['eye', 'ГЛАЗ'], ['teeth', 'ЗУБЫ'], ['nails', 'НОГТИ'], ['skin', 'КОЖА'], ['breath', 'ДЫХАНИЕ']]
    : [['eye', 'ГЛАЗ'], ['teeth', 'ЗУБЫ'], ['nails', 'НОГТИ'], ['skin', 'КОЖА']];

  return (
    <div className="game-screen wood">
      <section className="visitor-panel" aria-label="Окно приёма">
        <div className="visitor-panel__top"><span>ОКНО ПРИЁМА · {shiftLabel(props.shift).toUpperCase()}</span><span>{props.processed + 1} / {props.total}</span></div>
        <div className="visitor-window"><div className="visitor-photo-frame">
          <Portrait t={v.traits} className="visitor-portrait" animated={!props.paused}
            irisScale={v.actualType === 'human' ? 0.72 : 1}
            glassesRemoved={!v.traits.wearsGlasses || glasses.phase === 'accepted'} />
          <div className="visitor-bars" aria-hidden="true" />
        </div></div>
        <div className="visitor-quote" ref={quoteRef}>
          {voiceAsked && speech.text === v.voiceReply && <span className="speech-clerk-prompt">Клерк: {v.voiceQuestion}</span>}
          <VisitorText text={speech.text} speech={speech} />
        </div>
        <SpeechControls speech={speech} paused={props.paused} disabled={blocked} onAskVoice={askVoice} asked={voiceAsked} />
        <DocumentTray requested={docsRequested} passportTaken={passportTaken} visaTaken={visaTaken} disabled={blocked || props.paused} onRequest={requestDocuments} onTake={takeDocument} onTakeAll={takeAllDocuments} />
      </section>

      <div className="game-bottom">
        <main className="game-main-column">
          <div className={`tool-bar${props.shift >= 4 ? ' tool-bar--five' : ''}`} aria-label="Инструменты осмотра">
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
                    : props.tool === 'teeth' ? '— ОСМОТР ЗУБОВ —' : props.tool === 'nails' ? '— ОСМОТР ОБЕИХ РУК —' : props.tool === 'breath' ? '— ПРОБА ДЫХАНИЯ —' : '— КОЖНАЯ ПРОБА —'}
                </div>
                {props.tool === 'teeth' ? <DentalInspection {...shared} conversation={dental} />
                  : props.tool === 'skin' ? <BodyHairInspection traits={v.traits} name={v.name} conversation={hair} speech={speech} paused={props.paused} disabled={blocked} />
                    : props.tool === 'breath' ? <BreathInspection result={v.breathResult} name={v.name} conversation={breath} speech={speech} paused={props.paused} disabled={blocked} onBack={() => props.setTool(null)} initialProgress={breathProgress.current} onProgress={recordBreathProgress} />
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
                    ) : props.tool === 'nails' && v.traits.wearsGloves ? <GlovesInspection {...shared} conversation={gloves} />
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
                      ) : <div className="inspection-visual inspection-visual--hands"><NailsZoom t={v.traits} paused={props.paused || blocked} /></div>}
              </div>
            ) : <DocumentDesk visitor={v} docsRequested={docsRequested} passportTaken={passportTaken} visaTaken={visaTaken} activeDoc={activeDoc} setActiveDoc={setActiveDoc}
              ageAsked={ageAsked} occupationStage={occupationStage} voiceAsked={voiceAsked} speech={speech} onRequestDocs={requestDocuments} onTakeDoc={takeDocument}
              onAskAge={askAge} onAskOccupation={askOccupation} stamped={props.stamped} disabled={blocked || props.paused} />}
            {props.feedback && <div className="game-feedback" role="status">{props.feedback}</div>}
          </div>
          <div className="action-bar action-bar--three">
            <button type="button" className="metal-btn approve-btn" onClick={props.onApprove} disabled={blocked} title="Пропустить человека с исправными документами">ПРОПУСТИТЬ</button>
            <button type="button" className="metal-btn refuse-btn" onClick={props.onRefuse} disabled={blocked} title="Отказать во въезде без выстрела">ОТКАЗАТЬ</button>
            <div className="alarm-btn-wrap"><button type="button" className="sd-alarm-btn" onClick={props.onAlarm} disabled={blocked} aria-label="Тревога СД: идентификация нежити">
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
