import { getAudioOutput, getGameAudioContext, resumeGameAudio } from './audio';

// Original, procedural film-noir score. No downloads or prerecorded assets.
// Detuned piano, muted horn, bowed strings, upright bass and shellac noise.
export type TrackName = 'menu' | 'letter' | 'shift' | 'victory' | 'defeat';
type Instrument = 'piano' | 'trumpet' | 'strings' | 'bowed' | 'bass' | 'brush';
type PhraseNote = [beat: number, pitch: number, hold: number, gain?: number, from?: number];
type ScoreEvent = {
  beat: number;
  pitch: number | number[];
  hold: number;
  gain: number;
  instrument: Instrument;
  from?: number;
};
type Score = {
  bpm: number;
  beats: number;
  volume: number;
  room: number;
  surface: number;
  events: ScoreEvent[];
};
type Arrangement = {
  mood: TrackName;
  bpm: number;
  roots: number[];
  chords: number[][];
  melody: PhraseNote[];
  lead: 'piano' | 'trumpet';
  leadGain: number;
  room: number;
  volume: number;
  horror?: ScoreEvent[];
};

function arrange(a: Arrangement): Score {
  const events: ScoreEvent[] = a.melody.map(([beat, pitch, hold, gain, from]) => ({
    beat, pitch, hold, gain: gain ?? a.leadGain, from, instrument: a.lead,
  }));

  a.chords.forEach((chord, bar) => {
    const base = bar * 4;
    const root = a.roots[bar];
    events.push({
      beat: base + 0.03,
      pitch: root,
      hold: 3.8,
      gain: 0.12,
      instrument: 'bowed',
    });

    if (a.mood === 'letter') {
      // Exact arrangement of the letter-reading theme.
      if (bar % 2 === 0) {
        events.push({ beat: base + 1.65, pitch: chord.slice(0, 3), hold: 3.4, gain: 0.058, instrument: 'piano' });
      }
    } else if (a.mood === 'shift') {
      // Quiet, hypnotic chamber accompaniment during the border shift.
      events.push({ beat: base + 1.5, pitch: chord.slice(0, 3), hold: 2.8, gain: 0.05, instrument: 'piano' });
    } else if (a.mood === 'menu') {
      // Slow, dark nocturne arpeggio on the piano.
      events.push({ beat: base + 1.0, pitch: chord.slice(0, 3), hold: 2.8, gain: 0.054, instrument: 'piano' });
      if (bar % 2 === 1) {
        events.push({ beat: base + 2.75, pitch: [chord[1], chord[2]], hold: 1.6, gain: 0.04, instrument: 'piano' });
      }
    } else if (a.mood === 'victory') {
      // Somber, lyrical piano chords for surviving the shift.
      events.push({ beat: base + 1.2, pitch: chord.slice(0, 3), hold: 2.9, gain: 0.054, instrument: 'piano' });
    } else {
      // Deep, solemn minor chords for defeat.
      if (bar % 2 === 0) {
        events.push({ beat: base + 1.5, pitch: chord.slice(0, 3), hold: 3.4, gain: 0.056, instrument: 'piano' });
      }
    }

    if (bar % 2 === 0) {
      events.push({
        beat: base + 0.16,
        pitch: a.mood === 'letter' ? [chord[0], chord[3]] : [chord[0], chord[2]],
        hold: 7.1,
        gain: a.mood === 'defeat' ? 0.032 : 0.028,
        instrument: 'strings',
      });
    }
  });

  events.push(...(a.horror ?? []));
  events.sort((left, right) => left.beat - right.beat);
  return {
    bpm: a.bpm,
    beats: a.chords.length * 4,
    events,
    volume: a.volume,
    room: a.room,
    surface: 0.05,
  };
}

const SCORES: Record<TrackName, Score> = {
  // A separate A-minor title theme: a slow, coherent nocturne, not the letter score.
  menu: arrange({
    mood: 'menu', bpm: 42, lead: 'piano', leadGain: 0.09, room: 0.5, volume: 0.64,
    roots: [33, 33, 29, 29, 38, 38, 28, 33],
    chords: [
      [45, 48, 52, 57], [45, 48, 52, 57], [41, 45, 48, 53], [41, 45, 48, 53],
      [50, 53, 57, 62], [50, 53, 57, 62], [40, 44, 47, 52], [45, 48, 52, 57],
    ],
    melody: [
      [0.25, 64, 2.45], [2.85, 67, 1.1, 0.075],
      [4.25, 69, 2.2], [6.7, 72, 0.7, 0.078], [7.5, 71, 0.65, 0.07],
      [8.25, 69, 2.6], [11.1, 65, 1.0, 0.076],
      [12.25, 65, 2.5], [15.0, 64, 1.0, 0.07],
      [16.25, 62, 2.4], [18.85, 65, 1.1, 0.076],
      [20.25, 69, 2.4], [22.85, 67, 1.1, 0.073],
      [24.25, 68, 2.35], [26.85, 64, 1.1, 0.075],
      [28.25, 69, 3.4, 0.083],
    ],
    horror: [
      { beat: 6.0, pitch: [57, 64], hold: 4.8, gain: 0.018, instrument: 'strings' },
      { beat: 22.0, pitch: [50, 57], hold: 5.0, gain: 0.018, instrument: 'strings' },
    ],
  }),
  // Sparse haunted piano against a slow cello and a nearly motionless cluster (kept intact).
  letter: arrange({
    mood: 'letter', bpm: 44, lead: 'piano', leadGain: 0.09, room: 0.49, volume: 0.63,
    roots: [38, 38, 37, 37, 36, 36, 35, 37],
    chords: [
      [50, 53, 57, 61], [50, 53, 56, 61], [49, 52, 55, 60], [49, 53, 56, 60],
      [48, 51, 54, 59], [48, 52, 55, 59], [47, 50, 53, 58], [49, 52, 55, 61],
    ],
    melody: [
      [0.12, 62, 3.2], [3.66, 73, 2.2, 0.062], [7.2, 72, 1.7, 0.048],
      [8.72, 61, 3.25], [13.6, 68, 2.6, 0.067], [17.15, 60, 3.4],
      [20.68, 71, 2.8, 0.055], [25.7, 58, 3.2], [29.35, 61, 2.5, 0.057],
    ],
    horror: [
      { beat: 5.6, pitch: [73, 74], hold: 5.2, gain: 0.018, instrument: 'strings' },
      { beat: 20.1, pitch: [66, 67], hold: 5.9, gain: 0.021, instrument: 'strings' },
    ],
  }),
  // Brooding, suspenseful piano & cello theme for the inspection shift, in the same palette as `letter`.
  shift: arrange({
    mood: 'shift', bpm: 45, lead: 'piano', leadGain: 0.084, room: 0.49, volume: 0.61,
    roots: [38, 36, 34, 33, 31, 29, 34, 33],
    chords: [
      [50, 53, 57, 62], [48, 52, 55, 60], [46, 50, 53, 58], [45, 49, 52, 57],
      [43, 46, 50, 55], [45, 50, 53, 57], [46, 50, 55, 58], [45, 49, 52, 57],
    ],
    melody: [
      [0.18, 62, 3.0], [3.4, 65, 2.0, 0.068],
      [6.8, 64, 2.4, 0.064], [8.8, 62, 3.1],
      [13.4, 69, 2.5, 0.07], [16.9, 67, 2.8],
      [20.4, 65, 2.4, 0.066], [24.6, 64, 2.8],
      [28.8, 61, 2.6, 0.064],
    ],
    horror: [
      { beat: 5.2, pitch: [62, 69], hold: 5.0, gain: 0.017, instrument: 'strings' },
      { beat: 19.6, pitch: [58, 65], hold: 5.4, gain: 0.019, instrument: 'strings' },
    ],
  }),
  // Melancholic, peaceful minor-to-relative-major nocturne at the end of the shift.
  victory: arrange({
    mood: 'victory', bpm: 46, lead: 'piano', leadGain: 0.09, room: 0.5, volume: 0.64,
    roots: [38, 41, 36, 34, 38, 41, 34, 38],
    chords: [
      [50, 53, 57, 62], [48, 53, 57, 60], [48, 52, 55, 60], [46, 50, 53, 58],
      [50, 53, 57, 62], [48, 53, 57, 60], [46, 50, 53, 58], [50, 53, 57, 62],
    ],
    melody: [
      [0.2, 65, 2.6], [3.0, 69, 1.4, 0.078],
      [4.3, 72, 2.6], [7.1, 69, 1.2, 0.075],
      [8.3, 67, 2.6], [11.0, 65, 1.2, 0.072],
      [12.3, 62, 3.2],
      [16.3, 69, 2.5], [19.0, 72, 1.3, 0.078],
      [20.3, 69, 2.5], [23.0, 65, 1.2, 0.072],
      [24.3, 67, 2.4], [26.9, 64, 1.3, 0.07],
      [28.3, 62, 3.3, 0.084],
    ],
    horror: [
      { beat: 4.0, pitch: [60, 69], hold: 5.2, gain: 0.017, instrument: 'strings' },
      { beat: 20.0, pitch: [57, 65], hold: 5.2, gain: 0.017, instrument: 'strings' },
    ],
  }),
  // Solemn, slow funeral elegy on piano and cello.
  defeat: arrange({
    mood: 'defeat', bpm: 41, lead: 'piano', leadGain: 0.09, room: 0.52, volume: 0.65,
    roots: [38, 34, 31, 33, 38, 36, 34, 33],
    chords: [
      [50, 53, 57, 62], [46, 50, 53, 58], [43, 46, 50, 55], [45, 49, 52, 57],
      [50, 53, 57, 62], [48, 51, 55, 60], [46, 50, 53, 58], [45, 49, 52, 57],
    ],
    melody: [
      [0.2, 65, 3.1], [3.6, 64, 2.2, 0.072],
      [8.2, 62, 3.2], [11.6, 61, 2.2, 0.068],
      [16.2, 62, 3.1], [19.6, 58, 2.5, 0.07],
      [24.2, 57, 3.2], [28.2, 50, 3.4, 0.078],
    ],
    horror: [
      { beat: 4.4, pitch: [57, 64], hold: 5.5, gain: 0.02, instrument: 'strings' },
      { beat: 20.4, pitch: [53, 62], hold: 5.8, gain: 0.02, instrument: 'strings' },
    ],
  }),
};

type Engine = {
  ctx: AudioContext;
  input: BiquadFilterNode;
  output: GainNode;
  waves: Record<'piano' | 'brass' | 'strings', PeriodicWave>;
  noise: AudioBuffer;
  surface: AudioBuffer;
  impulse: AudioBuffer;
  bassBuffers: Map<number, AudioBuffer>;
};
type Session = {
  name: TrackName;
  score: Score;
  input: GainNode;
  level: GainNode;
  nodes: Set<AudioNode>;
  sources: Set<AudioScheduledSourceNode>;
  origin: number;
  cycle: number;
  event: number;
  destroyed: boolean;
};

const frequency = (note: number) => 440 * 2 ** ((note - 69) / 12);
let engine: Engine | null = null;
let active: Session | null = null;
let requested: TrackName | null = null;
let unlocked = false;
let scheduler: number | null = null;
let unlockAttempt: Promise<boolean> | null = null;

function randomGenerator(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function makeEngine(): Engine | null {
  if (engine && engine.ctx.state !== 'closed') return engine;
  const ctx = getGameAudioContext();
  if (!ctx) return null;
  const input = ctx.createBiquadFilter();
  input.type = 'highpass';
  input.frequency.value = 45;
  input.Q.value = 0.6;
  const radio = ctx.createBiquadFilter();
  radio.type = 'lowpass';
  radio.frequency.value = 3100;
  radio.Q.value = 0.65;
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.knee.value = 16;
  compressor.ratio.value = 3;
  compressor.attack.value = 0.025;
  compressor.release.value = 0.35;
  const channel = getAudioOutput('music');
  if (!channel) return null;
  const output = ctx.createGain();
  output.gain.value = 0.74;
  input.connect(radio).connect(compressor).connect(output).connect(channel);

  const wave = (harmonics: number[]) => ctx.createPeriodicWave(
    new Float32Array(harmonics.length), new Float32Array(harmonics),
  );
  const rng = randomGenerator(19431012);
  const noise = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 2), ctx.sampleRate);
  const noiseData = noise.getChannelData(0);
  for (let i = 0; i < noiseData.length; i++) noiseData[i] = rng() * 2 - 1;

  const surface = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 4), ctx.sampleRate);
  const grain = surface.getChannelData(0);
  for (let i = 0; i < grain.length; i++) {
    grain[i] += (rng() * 2 - 1) * 0.055;
    if (rng() > 0.99995) {
      const pop = (rng() * 2 - 1) * 0.55;
      for (let j = 0; j < 14 && i + j < grain.length; j++) {
        grain[i + j] += pop * Math.exp(-j / 3);
      }
    }
  }

  // Short mono room impulse, cached and inexpensive enough for phones.
  const impulse = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 2.1), ctx.sampleRate);
  const room = impulse.getChannelData(0);
  const delay = Math.floor(ctx.sampleRate * 0.028);
  for (let i = delay; i < room.length; i++) {
    room[i] = (rng() * 2 - 1) * Math.exp(-(i - delay) / ctx.sampleRate * 3.8);
  }
  engine = {
    ctx, input, output, noise, surface, impulse, bassBuffers: new Map(),
    waves: {
      piano: wave([0, 1, 0.36, 0.17, 0.12, 0.061, 0.039, 0.026, 0.012]),
      brass: wave([0, 1, 0.72, 0.5, 0.33, 0.23, 0.16, 0.09, 0.053, 0.021]),
      strings: wave([0, 1, 0.34, 0.46, 0.23, 0.2, 0.13, 0.11, 0.07, 0.04]),
    },
  };
  return engine;
}

function destroySession(session: Session) {
  if (session.destroyed) return;
  session.destroyed = true;
  const now = engine?.ctx.currentTime ?? 0;
  for (const source of session.sources) {
    try { source.stop(now); } catch { /* It may already have ended. */ }
  }
  session.sources.clear();
  for (const node of session.nodes) node.disconnect();
  session.nodes.clear();
}

function fadeSession(session: Session, seconds: number) {
  if (!engine || session.destroyed) return;
  const now = engine.ctx.currentTime;
  session.level.gain.cancelScheduledValues(now);
  session.level.gain.setValueAtTime(session.level.gain.value, now);
  session.level.gain.linearRampToValueAtTime(0, now + seconds);
  window.setTimeout(() => destroySession(session), (seconds + 0.12) * 1000);
}

// Registers all voices/LFOs and disconnects their nodes when the note ends.
function voiceResources(session: Session) {
  const nodes: AudioNode[] = [];
  let remaining = 0;
  function node<T extends AudioNode>(value: T): T {
    nodes.push(value);
    session.nodes.add(value);
    return value;
  }
  function start(source: AudioScheduledSourceNode, when: number, end: number, offset?: number) {
    node(source);
    session.sources.add(source);
    remaining++;
    source.onended = () => {
      session.sources.delete(source);
      remaining--;
      if (remaining === 0) {
        for (const value of nodes) {
          value.disconnect();
          session.nodes.delete(value);
        }
      }
    };
    if (source instanceof AudioBufferSourceNode) source.start(when, offset ?? 0);
    else source.start(when);
    source.stop(end);
  }
  return { node, start };
}

function pluckedBuffer(e: Engine, midi: number): AudioBuffer {
  const existing = e.bassBuffers.get(midi);
  if (existing) return existing;
  const length = Math.floor(e.ctx.sampleRate * 3.6);
  const buffer = e.ctx.createBuffer(1, length, e.ctx.sampleRate);
  const data = buffer.getChannelData(0);
  const delay = Math.max(2, Math.round(e.ctx.sampleRate / frequency(midi)));
  const rng = randomGenerator(midi * 7919);
  for (let i = 0; i < delay; i++) data[i] = (rng() * 2 - 1) * 0.72;
  for (let i = delay; i < length; i++) {
    data[i] = 0.4975 * (data[i - delay] + data[Math.max(0, i - delay - 1)]);
  }
  if (e.bassBuffers.size >= 24) e.bassBuffers.clear();
  e.bassBuffers.set(midi, buffer);
  return buffer;
}

function noiseOrBass(session: Session, event: ScoreEvent, midi: number, when: number, duration: number) {
  const e = engine!;
  const resources = voiceResources(session);
  const source = e.ctx.createBufferSource();
  const filter = resources.node(e.ctx.createBiquadFilter());
  const gain = resources.node(e.ctx.createGain());
  const bass = event.instrument === 'bass';
  source.buffer = bass ? pluckedBuffer(e, midi) : e.noise;
  filter.type = bass ? 'lowpass' : 'bandpass';
  filter.frequency.value = bass ? 950 : 1900;
  filter.Q.value = bass ? 0.7 : 0.45;
  const hold = Math.min(bass ? 3.4 : 0.8, Math.max(0.08, duration));
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(event.gain, when + (bass ? 0.008 : 0.028));
  gain.gain.exponentialRampToValueAtTime(0.0001, when + hold);
  source.connect(filter).connect(gain).connect(session.input);
  resources.start(source, when, when + hold + 0.02, bass ? 0 : 0.2);
}

function pitchedVoice(session: Session, event: ScoreEvent, midi: number, when: number, duration: number) {
  const e = engine!;
  const c = e.ctx;
  const r = voiceResources(session);
  const piano = event.instrument === 'piano';
  const brass = event.instrument === 'trumpet';
  const bowed = event.instrument === 'bowed';
  const sustain = !piano && !brass;
  const hold = Math.max(0.2, duration);
  const release = piano ? 0.18 : brass ? 0.34 : 1.15;
  const end = when + hold + release;
  const amplitude = event.gain * (0.94 + Math.sin(midi * 2.71 + event.beat) * 0.06);
  const mix = r.node(c.createGain());
  const colour = r.node(c.createBiquadFilter());
  colour.type = brass ? 'peaking' : 'lowpass';
  colour.frequency.value = brass ? 1150 : bowed ? 850 : sustain ? 1750 : 3200;
  colour.Q.value = brass ? 1.4 : 0.6;
  if (brass) colour.gain.value = 4.5;
  if (piano) colour.frequency.exponentialRampToValueAtTime(1000, when + Math.min(1.3, hold));
  const damp = r.node(c.createBiquadFilter());
  damp.type = 'lowpass';
  damp.frequency.value = brass ? 2150 : sustain ? 2000 : 3700;
  damp.Q.value = 0.65;
  const envelope = r.node(c.createGain());
  mix.connect(colour).connect(damp).connect(envelope);
  envelope.gain.setValueAtTime(0.0001, when);

  if (piano) {
    envelope.gain.exponentialRampToValueAtTime(amplitude, when + 0.007);
    envelope.gain.exponentialRampToValueAtTime(amplitude * 0.48, when + 0.17);
    envelope.gain.exponentialRampToValueAtTime(0.0001, end);
  } else {
    const attack = brass ? Math.min(0.14, hold * 0.2) : Math.min(1.15, hold * 0.27);
    envelope.gain.linearRampToValueAtTime(amplitude, when + attack);
    envelope.gain.linearRampToValueAtTime(amplitude * 0.77, when + hold);
    envelope.gain.exponentialRampToValueAtTime(0.0001, end);
  }

  if (sustain) {
    const tremolo = r.node(c.createGain());
    tremolo.gain.value = 0.86;
    envelope.connect(tremolo).connect(session.input);
    const lfo = c.createOscillator();
    lfo.frequency.value = bowed ? 4.7 : 7.2;
    const depth = r.node(c.createGain());
    depth.gain.value = bowed ? 0.055 : 0.12;
    lfo.connect(depth).connect(tremolo.gain);
    r.start(lfo, when, end);
  } else {
    envelope.connect(session.input);
  }

  const oscillators: OscillatorNode[] = [];
  const copies = brass ? 1 : 2;
  for (let i = 0; i < copies; i++) {
    const osc = c.createOscillator();
    osc.setPeriodicWave(piano ? e.waves.piano : brass ? e.waves.brass : e.waves.strings);
    osc.frequency.setValueAtTime(frequency(brass ? (event.from ?? midi - 0.27) : midi), when);
    if (brass) osc.frequency.exponentialRampToValueAtTime(frequency(midi), when + 0.16);
    osc.detune.value = copies === 1 ? -1 : (i === 0 ? -1 : 1) * (piano ? 4 : bowed ? 6 : 9);
    const weight = r.node(c.createGain());
    weight.gain.value = copies === 1 ? 1 : 0.49;
    osc.connect(weight).connect(mix);
    oscillators.push(osc);
    r.start(osc, when, end + 0.04);
  }

  // Subtle pitch drift and breath, instead of a naked square-wave melody.
  const vibrato = c.createOscillator();
  vibrato.frequency.value = piano ? 0.42 : brass ? 4.6 : 5.15;
  const drift = r.node(c.createGain());
  drift.gain.setValueAtTime(piano ? 1.8 : 0, when);
  drift.gain.linearRampToValueAtTime(piano ? 2.4 : brass ? 9 : 6, when + Math.min(0.75, hold));
  vibrato.connect(drift);
  for (const osc of oscillators) drift.connect(osc.detune);
  r.start(vibrato, when, end + 0.04);

  if (brass || piano) {
    const air = c.createBufferSource();
    air.buffer = e.noise;
    air.loop = brass;
    const airFilter = r.node(c.createBiquadFilter());
    airFilter.type = 'bandpass';
    airFilter.frequency.value = brass ? 1450 : 2800;
    airFilter.Q.value = 0.7;
    const airGain = r.node(c.createGain());
    airGain.gain.setValueAtTime(amplitude * (brass ? 0.045 : 0.11), when);
    airGain.gain.exponentialRampToValueAtTime(0.0001, piano ? when + 0.055 : end);
    air.connect(airFilter).connect(airGain).connect(session.input);
    r.start(air, when, piano ? when + 0.07 : end, 0.16);
  }
}

function perform(session: Session, event: ScoreEvent, when: number) {
  if (session.destroyed || session.sources.size > 104) return;
  const notes = typeof event.pitch === 'number' ? [event.pitch] : event.pitch;
  const duration = event.hold * 60 / session.score.bpm;
  notes.forEach((midi, i) => {
    const offset = event.instrument === 'piano' ? i * 0.027 : i * 0.009;
    if (event.instrument === 'bass' || event.instrument === 'brush') {
      noiseOrBass(session, event, midi, when + offset, duration);
    } else {
      pitchedVoice(session, event, midi, when + offset, duration);
    }
  });
}

function schedule() {
  if (requested && active?.name !== requested && engine?.ctx.state === 'running' && !document.hidden) {
    begin(requested);
    return;
  }
  const session = active;
  const e = engine;
  if (!session || session.destroyed || !e || e.ctx.state !== 'running' || document.hidden) return;
  const secondsPerBeat = 60 / session.score.bpm;
  const cycleDuration = session.score.beats * secondsPerBeat;
  const elapsedCycle = Math.floor((e.ctx.currentTime - session.origin) / cycleDuration);
  if (elapsedCycle > session.cycle) {
    session.cycle = elapsedCycle;
    session.event = 0;
  }
  let checked = 0;
  while (checked++ < session.score.events.length * 2) {
    const event = session.score.events[session.event];
    const when = session.origin + session.cycle * cycleDuration + event.beat * secondsPerBeat;
    if (when > e.ctx.currentTime + 0.3) break;
    if (when >= e.ctx.currentTime - 0.06) perform(session, event, Math.max(when, e.ctx.currentTime + 0.006));
    session.event++;
    if (session.event >= session.score.events.length) {
      session.event = 0;
      session.cycle++;
    }
  }
}

function begin(name: TrackName) {
  const e = makeEngine();
  if (!e || e.ctx.state !== 'running' || active?.name === name) return;
  if (active) fadeSession(active, 0.85);
  const now = e.ctx.currentTime;
  const input = e.ctx.createGain();
  const level = e.ctx.createGain();
  const convolver = e.ctx.createConvolver();
  convolver.buffer = e.impulse;
  const wet = e.ctx.createGain();
  wet.gain.value = SCORES[name].room;
  input.connect(level);
  input.connect(convolver).connect(wet).connect(level);
  level.connect(e.input);
  level.gain.setValueAtTime(0, now);
  level.gain.linearRampToValueAtTime(SCORES[name].volume, now + 1.25);
  const session: Session = {
    name, score: SCORES[name], input, level,
    nodes: new Set([input, level, convolver, wet]), sources: new Set(),
    origin: now + 0.08, cycle: 0, event: 0, destroyed: false,
  };

  const record = e.ctx.createBufferSource();
  record.buffer = e.surface;
  record.loop = true;
  const noiseFilter = e.ctx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 700;
  const noiseGain = e.ctx.createGain();
  noiseGain.gain.value = session.score.surface;
  record.connect(noiseFilter).connect(noiseGain).connect(input);
  session.nodes.add(record);
  session.nodes.add(noiseFilter);
  session.nodes.add(noiseGain);
  session.sources.add(record);
  record.start(now);
  active = session;
  if (scheduler === null) scheduler = window.setInterval(schedule, 70);
  schedule();
}

export const music = {
  // Scene changes can select a score before audio has been unlocked.
  play(name: TrackName) {
    requested = name;
    if (unlocked) begin(name);
  },

  unlock(): Promise<boolean> {
    if (unlocked && engine?.ctx.state === 'running') {
      if (requested) begin(requested);
      return Promise.resolve(true);
    }
    if (unlockAttempt) return unlockAttempt;
    // resume() is invoked in the user's input event, including on iOS.
    unlockAttempt = resumeGameAudio().then((success) => {
      unlocked = success;
      unlockAttempt = null;
      if (success && requested) begin(requested);
      return success;
    });
    return unlockAttempt;
  },

  stop() {
    requested = null;
    if (scheduler !== null) window.clearInterval(scheduler);
    scheduler = null;
    if (active) fadeSession(active, 0.35);
    active = null;
  },
};
