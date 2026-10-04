import { getAudioOutput, getGameAudioContext } from './audio';

export function playGunshot() {
  const c = getGameAudioContext();
  const output = getAudioOutput('sound');
  if (!c || !output) return;
  const now = c.currentTime;
  const size = Math.floor(c.sampleRate * 0.4);
  const buffer = c.createBuffer(1, size, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.08));
  }
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2200, now);
  filter.frequency.exponentialRampToValueAtTime(200, now + 0.35);
  const gain = c.createGain();
  gain.gain.setValueAtTime(1.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
  source.connect(filter).connect(gain).connect(output);
  source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  source.start(now);

  const thump = c.createOscillator();
  thump.type = 'sine';
  thump.frequency.setValueAtTime(90, now);
  thump.frequency.exponentialRampToValueAtTime(30, now + 0.2);
  const body = c.createGain();
  body.gain.setValueAtTime(0.8, now);
  body.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
  thump.connect(body).connect(output);
  thump.onended = () => { thump.disconnect(); body.disconnect(); };
  thump.start(now);
  thump.stop(now + 0.3);
}

export function playButtonClick() {
  const c = getGameAudioContext();
  const output = getAudioOutput('sound');
  if (!c || !output) return;
  const now = c.currentTime;

  // A muted wooden key: a soft low knock and a very short filtered tap,
  // deliberately quieter and less metallic than the stamp sound.
  const oscillator = c.createOscillator();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(230, now);
  oscillator.frequency.exponentialRampToValueAtTime(125, now + 0.055);
  const toneGain = c.createGain();
  toneGain.gain.setValueAtTime(0.0001, now);
  toneGain.gain.exponentialRampToValueAtTime(0.045, now + 0.003);
  toneGain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
  oscillator.connect(toneGain).connect(output);
  oscillator.onended = () => { oscillator.disconnect(); toneGain.disconnect(); };
  oscillator.start(now);
  oscillator.stop(now + 0.08);

  const size = Math.floor(c.sampleRate * 0.045);
  const buffer = c.createBuffer(1, size, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.012));
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 700;
  const tapGain = c.createGain();
  tapGain.gain.value = 0.022;
  source.connect(filter).connect(tapGain).connect(output);
  source.onended = () => { source.disconnect(); filter.disconnect(); tapGain.disconnect(); };
  source.start(now);
}

export function playStamp() {
  const c = getGameAudioContext();
  const output = getAudioOutput('sound');
  if (!c || !output) return;
  const now = c.currentTime;
  const size = Math.floor(c.sampleRate * 0.12);
  const buffer = c.createBuffer(1, size, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < size; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (c.sampleRate * 0.02));
  }
  const source = c.createBufferSource();
  source.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 400;
  const gain = c.createGain();
  gain.gain.value = 0.5;
  source.connect(filter).connect(gain).connect(output);
  source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
  source.start(now);
}

export function playDoor() {
  const c = getGameAudioContext();
  const output = getAudioOutput('sound');
  if (!c || !output) return;
  const now = c.currentTime;
  const oscillator = c.createOscillator();
  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(120, now);
  oscillator.frequency.linearRampToValueAtTime(80, now + 0.6);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
  gain.gain.linearRampToValueAtTime(0.001, now + 0.6);
  const filter = c.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 500;
  oscillator.connect(filter).connect(gain).connect(output);
  oscillator.onended = () => { oscillator.disconnect(); filter.disconnect(); gain.disconnect(); };
  oscillator.start(now);
  oscillator.stop(now + 0.7);
}
