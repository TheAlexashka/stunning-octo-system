import { useEffect, useMemo, useRef, useState } from 'react';
import { useGameTimers } from './useGameTimers';
import type { SpeechSnapshot } from './useVisitorSpeech';
import { genderReply, type Gender } from './gender';

export type ConversationPhase = 'unasked' | 'waiting' | 'hesitant' | 'accepted' | 'refused';
export type ConversationResponse = 'reassure' | 'insist';
export type DialogueLine = { speaker: 'clerk' | 'visitor'; text: string };
export type DialogueProfile = {
  agreesImmediately: boolean;
  firstReply: string;
  reassurance: string;
  reassuredReply: string;
  reassured: boolean;
  firmReply: string;
  persuadedByRules: boolean;
};
export type ConversationSnapshot = {
  phase: ConversationPhase;
  lines: DialogueLine[];
  used: Record<ConversationResponse, boolean>;
  pending: { text: string; phase: ConversationPhase; delay: number } | null;
};
export type DeskProgress = {
  docsRequested: boolean;
  passportTaken: boolean;
  visaTaken: boolean;
  activeDoc: 'passport' | 'visa';
  ageAsked: boolean;
  occupationStage: 0 | 1 | 2;
  missingDocumentAsked?: boolean;
  weightMeasured?: boolean;
  heightMeasured?: boolean;
  checkedSigns: string[];
  voiceAsked?: boolean;
  speech?: SpeechSnapshot;
  eyeSide?: 'right' | 'left';
  checkedEyes?: Array<'right' | 'left'>;
  scleraAsked?: boolean;
  shapeAsked?: boolean;
};

export type InspectionProgress = {
  teeth: ConversationSnapshot;
  glasses: ConversationSnapshot;
  gloves: ConversationSnapshot;
  hair: ConversationSnapshot;
  breath?: ConversationSnapshot;
  nail?: ConversationSnapshot;
  teethq?: ConversationSnapshot;
  bag?: ConversationSnapshot;
  breathProgress?: number;
  desk?: DeskProgress;
};
export type Conversation = {
  phase: ConversationPhase;
  lines: DialogueLine[];
  latestReply: string | null;
  used: Record<ConversationResponse, boolean>;
  request: () => void;
  respond: (response: ConversationResponse) => void;
  snapshot: () => ConversationSnapshot;
};

export function emptyConversation(): ConversationSnapshot {
  return { phase: 'unasked', lines: [], used: { reassure: false, insist: false }, pending: null };
}
export function emptyDeskProgress(): DeskProgress {
  return {
    docsRequested: false,
    passportTaken: false,
    visaTaken: false,
    activeDoc: 'passport',
    ageAsked: false,
    occupationStage: 0,
    missingDocumentAsked: false,
    weightMeasured: false,
    heightMeasured: false,
    checkedSigns: [],
    voiceAsked: false,
    eyeSide: 'right',
    checkedEyes: [],
    scleraAsked: false,
    shapeAsked: false,
  };
}
export function emptyInspections(): InspectionProgress {
  return {
    teeth: emptyConversation(),
    glasses: emptyConversation(),
    gloves: emptyConversation(),
    hair: emptyConversation(),
    breath: emptyConversation(),
    nail: emptyConversation(),
    teethq: emptyConversation(),
    bag: emptyConversation(),
    breathProgress: 0,
    desk: emptyDeskProgress(),
  };
}

export function useConversation({ visitorId, paused, subject, profiles, prompt, insist, initial, disabled = false, onReply, gender = 'm' }: {
  visitorId: number;
  paused: boolean;
  subject: string;
  profiles: readonly DialogueProfile[];
  prompt: string;
  insist: string;
  initial?: ConversationSnapshot;
  disabled?: boolean;
  onReply?: (text: string) => void;
  gender?: Gender;
}): Conversation {
  const profile = useMemo(() => profiles[(visitorId * 7 + subject.length * 3) % profiles.length], [visitorId, profiles, subject]);
  const seed = useRef(initial ?? emptyConversation()).current;
  const [phase, setPhase] = useState(seed.phase);
  const [lines, setLines] = useState(seed.lines);
  const [used, setUsed] = useState(seed.used);
  const phaseRef = useRef(seed.phase);
  const linesRef = useRef(seed.lines);
  const usedRef = useRef(seed.used);
  const pendingRef = useRef(seed.pending);
  const started = useRef(seed.phase !== 'unasked');
  const { schedule, pause, resume, remaining } = useGameTimers();

  useEffect(() => { if (paused || disabled) pause(); else resume(); }, [paused, disabled, pause, resume]);

  function changePhase(value: ConversationPhase) { phaseRef.current = value; setPhase(value); }
  function append(speaker: DialogueLine['speaker'], text: string) {
    linesRef.current = [...linesRef.current, { speaker, text }];
    setLines(linesRef.current);
  }
  function reply(text: string, next: ConversationPhase, delay: number) {
    const resolvedText = genderReply(gender, text);
    pendingRef.current = { text: resolvedText, phase: next, delay };
    schedule(() => {
      pendingRef.current = null;
      append('visitor', resolvedText);
      onReply?.(resolvedText);
      changePhase(next);
    }, delay, 'reply');
  }

  // StrictMode may run this twice; named scheduling replaces the previous task.
  useEffect(() => {
    if (seed.phase === 'waiting' && seed.pending) reply(seed.pending.text, seed.pending.phase, seed.pending.delay);
    // Seed belongs to this mounted visitor and is never replaced in place.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seed, schedule]);

  function request() {
    if (started.current || paused || disabled) return;
    started.current = true;
    changePhase('waiting');
    append('clerk', prompt);
    reply(profile.firstReply, profile.agreesImmediately ? 'accepted' : 'hesitant', 950);
  }
  function respond(response: ConversationResponse) {
    if (paused || disabled || phaseRef.current !== 'hesitant' || usedRef.current[response]) return;
    const next = { ...usedRef.current, [response]: true };
    usedRef.current = next;
    setUsed(next);
    changePhase('waiting');
    const reassurance = response === 'reassure';
    append('clerk', reassurance ? profile.reassurance : insist);
    const accepted = reassurance ? profile.reassured : profile.persuadedByRules;
    reply(reassurance ? profile.reassuredReply : profile.firmReply,
      accepted ? 'accepted' : next.reassure && next.insist ? 'refused' : 'hesitant', 1000);
  }
  function snapshot(): ConversationSnapshot {
    return {
      phase: phaseRef.current,
      lines: linesRef.current.map((line) => ({ ...line })),
      used: { ...usedRef.current },
      pending: pendingRef.current ? { ...pendingRef.current, delay: remaining().reply ?? pendingRef.current.delay } : null,
    };
  }
  const latestReply = [...lines].reverse().find((line) => line.speaker === 'visitor')?.text ?? null;
  return { phase, lines, latestReply, used, request, respond, snapshot };
}
