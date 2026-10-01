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
