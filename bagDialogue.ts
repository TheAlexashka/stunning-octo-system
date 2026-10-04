// Shared audio clock, with independent persistent volume controls for music/SFX.
export type AudioChannel = 'music' | 'sound';
export type AudioSettings = Record<AudioChannel, number>;

const STORAGE_KEY = 'das-grenzamt-audio-v1';
const DEFAULTS: AudioSettings = { music: 70, sound: 80 };
let context: AudioContext | null = null;
let activated = false;
let watchingVisibility = false;
let outputs: Partial<Record<AudioChannel, GainNode>> = {};

function clampVolume(value: unknown, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.round(Math.max(0, Math.min(100, value)))
    : fallback;
}

function readSettings(): AudioSettings {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<AudioSettings> | null;
    return {
      music: clampVolume(saved?.music, DEFAULTS.music),
      sound: clampVolume(saved?.sound, DEFAULTS.sound),
    };
  } catch {
    return { ...DEFAULTS };
  }
}

let settings = readSettings();

export function getAudioSettings(): AudioSettings {
  return { ...settings };
}

export function setAudioVolume(channel: AudioChannel, value: number): AudioSettings {
  settings = { ...settings, [channel]: clampVolume(value, settings[channel]) };
  const output = outputs[channel];
  if (output && context) {
    const now = context.currentTime;
    output.gain.cancelScheduledValues(now);
    output.gain.setValueAtTime(output.gain.value, now);
    output.gain.linearRampToValueAtTime(settings[channel] / 100, now + 0.04);
  }
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Private browsing/storage restrictions do not prevent volume adjustment.
  }
  return getAudioSettings();
}

export function getGameAudioContext(): AudioContext | null {
  if (context && context.state !== 'closed') return context;
  const BrowserAudio = window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!BrowserAudio) return null;
  try {
    context = new BrowserAudio({ latencyHint: 'interactive' });
    outputs = {};
  } catch {
    return null;
  }

  if (!watchingVisibility) {
    watchingVisibility = true;
    document.addEventListener('visibilitychange', () => {
      if (!context || context.state === 'closed') return;
      if (document.hidden) {
        void context.suspend().catch(() => undefined);
      } else if (activated) {
        void context.resume().catch(() => undefined);
      }
    });
  }
  return context;
}

export function getAudioOutput(channel: AudioChannel): GainNode | null {
  const audio = getGameAudioContext();
  if (!audio) return null;
  if (!outputs[channel]) {
    const gain = audio.createGain();
    gain.gain.value = settings[channel] / 100;
    gain.connect(audio.destination);
    outputs[channel] = gain;
  }
  return outputs[channel] ?? null;
}

// Invoke synchronously in a user-input handler for mobile autoplay policies.
export async function resumeGameAudio(): Promise<boolean> {
  const audio = getGameAudioContext();
  if (!audio) return false;
  try {
    await audio.resume();
    activated = true;
    return audio.state === 'running';
  } catch {
    return false;
  }
}
