import { useCallback, useEffect, useRef, useState } from 'react';
import { playVoiceLetter, stopVoiceLetters, voicePace, type VoiceId } from './voices';

export type SpeechSnapshot = { text: string; revealed: number; serial: number };
export type VisitorSpeech = {
  text: string;
  serial: number;
  visibleText: string;
  speaking: boolean;
  speak: (text: string) => void;
  finish: () => void;
  replay: () => void;
  snapshot: () => SpeechSnapshot;
};

export function useVisitorSpeech(voice: VoiceId, opening: string, paused: boolean, disabled: boolean, initial?: SpeechSnapshot): VisitorSpeech {
  const seed = useRef(initial ?? { text: opening, revealed: 0, serial: 1 }).current;
  const [state, setState] = useState(seed);
  const current = useRef(seed);
  const timer = useRef<number | null>(null);
  const cancel = useCallback(() => {
    if (timer.current !== null) window.clearTimeout(timer.current);
    timer.current = null;
    stopVoiceLetters();
  }, []);
  const speak = useCallback((text: string) => {
    cancel();
    current.current = { text, revealed: 0, serial: current.current.serial + 1 };
    setState(current.current);
  }, [cancel]);
  const finish = useCallback(() => {
    cancel();
    current.current = { ...current.current, revealed: Array.from(current.current.text).length };
    setState(current.current);
  }, [cancel]);
  const replay = useCallback(() => speak(current.current.text), [speak]);
  const snapshot = useCallback(() => ({ ...current.current }), []);

  useEffect(() => {
    if (paused || disabled) { cancel(); return; }
    const serial = state.serial;
    const characters = Array.from(current.current.text);
    const step = () => {
      if (current.current.serial !== serial || current.current.revealed >= characters.length) return;
      if (document.hidden) { timer.current = window.setTimeout(step, 120); return; }
      const index = current.current.revealed;
      const character = characters[index];
      playVoiceLetter(voice, character, index);
      current.current = { ...current.current, revealed: index + 1 };
      setState(current.current);
      const delay = /[.!?…]/u.test(character) ? 210 : /[,;:]/.test(character) ? 115 : voicePace(voice);
      timer.current = window.setTimeout(step, delay);
    };
    timer.current = window.setTimeout(step, 100);
    return cancel;
  }, [voice, state.serial, paused, disabled, cancel]);

  return {
    text: state.text,
    serial: state.serial,
    visibleText: Array.from(state.text).slice(0, state.revealed).join(''),
    speaking: state.revealed < Array.from(state.text).length,
    speak, finish, replay, snapshot,
  };
}
