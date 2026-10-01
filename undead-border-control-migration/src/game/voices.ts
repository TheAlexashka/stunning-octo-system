import { getAudioOutput, getAudioSettings, getGameAudioContext } from './audio';

export const MALE_VOICES = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'] as const;
export const FEMALE_VOICES = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6', 'f7', 'f8'] as const;
export type VoiceId = (typeof MALE_VOICES)[number] | (typeof FEMALE_VOICES)[number];
type VoiceSpec = {
  pitch: number;
  brightness: number;
  breath: number;
  roughness: number;
  pace: number;
  pulse: number;
};

// Eight timbres per gender. The final male and first female preset deliberately
// sit outside the usual range; the game never labels them for the player.
const VOICES: Record<VoiceId, VoiceSpec> = {
  m1: { pitch: 84, brightness: 1450, breath: 0.025, roughness: 0.12, pace: 48, pulse: 62 },
  m2: { pitch: 98, brightness: 1650, breath: 0.035, roughness: 0.21, pace: 44, pulse: 57 },
  m3: { pitch: 113, brightness: 1900, breath: 0.018, roughness: 0.06, pace: 39, pulse: 52 },
  m4: { pitch: 129, brightness: 2150, breath: 0.045, roughness: 0.25, pace: 43, pulse: 58 },
  m5: { pitch: 146, brightness: 2550, breath: 0.02, roughness: 0.09, pace: 36, pulse: 49 },
  m6: { pitch: 160, brightness: 1800, breath: 0.065, roughness: 0.04, pace: 45, pulse: 60 },
  m7: { pitch: 182, brightness: 2750, breath: 0.025, roughness: 0.07, pace: 35, pulse: 47 },
  m8: { pitch: 305, brightness: 2950, breath: 0.055, roughness: 0.04, pace: 38, pulse: 50 },
  f1: { pitch: 101, brightness: 1600, breath: 0.045, roughness: 0.17, pace: 47, pulse: 61 },
  f2: { pitch: 185, brightness: 1950, breath: 0.05, roughness: 0.06, pace: 44, pulse: 56 },
  f3: { pitch: 212, brightness: 2300, breath: 0.025, roughness: 0.04, pace: 38, pulse: 50 },
  f4: { pitch: 233, brightness: 2050, breath: 0.075, roughness: 0.03, pace: 46, pulse: 60 },
  f5: { pitch: 253, brightness: 2900, breath: 0.018, roughness: 0.05, pace: 35, pulse: 47 },
  f6: { pitch: 273, brightness: 2500, breath: 0.09, roughness: 0.04, pace: 42, pulse: 57 },
  f7: { pitch: 289, brightness: 3200, breath: 0.025, roughness: 0.12, pace: 34, pulse: 46 },
  f8: { pitch: 323, brightness: 2750, breath: 0.055, roughness: 0.07, pace: 40, pulse: 54 },
};

export function voicePace(id: VoiceId): number { return VOICES[id].pace; }
export function unusualVoice(id: VoiceId): 'low' | 'high' | null {
  return id === 'f1' ? 'low' : id === 'm8' ? 'high' : null;
}
export function chooseVoice(gender: 'm' | 'f', random: () => number, typicalOnly = false): VoiceId {
  // Exclude the two atypical presets when an audible gender contrast is required.
  const pool = gender === 'm'
    ? typicalOnly ? MALE_VOICES.slice(0, -1) : MALE_VOICES
    : typicalOnly ? FEMALE_VOICES.slice(1) : FEMALE_VOICES;
  return pool[Math.min(pool.length - 1, Math.floor(random() * pool.length))];
}

let cachedContext: AudioContext | null = null;
const buffers = new Map<string, AudioBuffer>();
const playing = new Set<AudioBufferSourceNode>();

function vowelClass(character: string): number {
  const letter = character.toLowerCase();
  if ('аaя'.includes(letter)) return 0;
  if ('еeэ'.includes(letter)) return 1;
  if ('иiыy'.includes(letter)) return 2;
  if ('оoё'.includes(letter)) return 3;
  if ('уuю'.includes(letter)) return 4;
  return 5;
}

// Short voiced phoneme pulses, not text-to-speech. Buffers are cached so a long
// sentence does not generate a new waveform or leak oscillators for each letter.
export function playVoiceLetter(id: VoiceId, character: string, index: number): void {
  if (!/[\p{L}\p{N}]/u.test(character) || getAudioSettings().sound === 0) return;
  const ctx = getGameAudioContext();
  if (!ctx || ctx.state !== 'running' || document.hidden) return;
  const output = getAudioOutput('sound');
  if (!output) return;
  if (cachedContext !== ctx) { buffers.clear(); cachedContext = ctx; }
  const spec = VOICES[id];
  const category = vowelClass(character);
  const variation = index % 3;
  const key = `${id}-${category}-${variation}`;
  let buffer = buffers.get(key);
  if (!buffer) {
    const length = Math.ceil(ctx.sampleRate * spec.pulse / 1000);
    buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const samples = buffer.getChannelData(0);
    const pitch = spec.pitch * (1 + (variation - 1) * 0.025);
    const vowels = [1, 0.78, 0.48, 0.67, 0.4, 0.57];
    let noiseState = (id.charCodeAt(0) * 997 + category * 71 + variation * 17) >>> 0;
    for (let i = 0; i < length; i++) {
      const t = i / ctx.sampleRate;
      const phase = 2 * Math.PI * pitch * t + spec.roughness * Math.sin(t * 2 * Math.PI * 39);
      noiseState = (Math.imul(noiseState, 1664525) + 1013904223) >>> 0;
      const noise = noiseState / 4294967296 * 2 - 1;
      const signal = Math.sin(phase) * 0.68 + Math.sin(phase * 2) * 0.25 * vowels[category]
        + Math.sin(phase * 3) * 0.15 + Math.sin(phase * 5) * 0.07 * vowels[category];
      const attack = Math.min(1, i / (ctx.sampleRate * 0.006));
      const release = Math.min(1, (length - i) / (ctx.sampleRate * 0.013));
      samples[i] = (signal + noise * spec.breath) * attack * release * 0.29;
    }
    buffers.set(key, buffer);
  }
  if (playing.size >= 4) return;
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass'; filter.frequency.value = spec.brightness; filter.Q.value = 0.65;
  const level = ctx.createGain(); level.gain.value = 0.7;
  source.connect(filter).connect(level).connect(output);
  playing.add(source);
  source.onended = () => { playing.delete(source); source.disconnect(); filter.disconnect(); level.disconnect(); };
  source.start();
}

export function stopVoiceLetters(): void {
  for (const source of playing) { try { source.stop(); } catch { /* Already ended. */ } }
  playing.clear();
}
