// Web Audio API Procedural Sound & Lo-Fi Synthesizer for Midnight Brew
let audioCtx: AudioContext | null = null;
let rainNode: AudioNode | null = null;
let isRainPlaying = false;
let isSoundMuted = false;

// Lo-Fi Radio Synthesizer State
let lofiInterval: ReturnType<typeof setInterval> | null = null;
let isLofiPlaying = false;
let currentLofiStation: 'midnight' | 'rainy_jazz' | 'tokyo_cozy' | 'acoustic' = 'midnight';

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundMuted(muted: boolean) {
  isSoundMuted = muted;
  if (muted) {
    if (isRainPlaying) stopRainAmbience();
    if (isLofiPlaying) stopLofiRadio();
  }
}

export function getSoundMuted(): boolean {
  return isSoundMuted;
}

/**
 * 1. Gentle UI Click Sound
 */
export function playClick() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

/**
 * 2. Dialogue Speech Chirp
 */
export function playDialogueChirp(pitchModifier: number = 1.0) {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  const baseFreq = 420 * pitchModifier;
  osc.frequency.setValueAtTime(baseFreq, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.045);
}

/**
 * 3. Cat Purr Sound
 */
export function playCatPurr() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(38, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(44, ctx.currentTime + 0.2);
  osc.frequency.linearRampToValueAtTime(36, ctx.currentTime + 0.4);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.45);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.5);
}

/**
 * 4. Pastry Toaster Oven Bell Ding
 */
export function playOvenDing() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1760, ctx.currentTime); // A6
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.6);

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.75);
}

/**
 * 5. Thunder Rumble
 */
export function playThunder() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 1.5;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = (Math.random() * 2 - 1) * 0.9;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(120, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(60, ctx.currentTime + 1.2);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start();
}

/**
 * 6. Bean Grinder Crunch
 */
export function playGrinderCrunch() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 0.4;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = (Math.random() * 2 - 1) * 0.8;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1200, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.4);
  filter.Q.setValueAtTime(4.0, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start();
}

/**
 * 7. Ice Shaker Rattle Sound
 */
export function playIceShake() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  for (let i = 0; i < 3; i++) {
    const delay = i * 0.06;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800 + Math.random() * 400, ctx.currentTime + delay);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + delay + 0.05);

    gain.gain.setValueAtTime(0.12, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.06);
  }
}

/**
 * 8. Espresso Extraction Pump & Hiss
 */
export function playEspressoExtract() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 1.2;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    output[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = output[i];
    output[i] *= 3.5;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(450, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(850, ctx.currentTime + 0.6);
  filter.frequency.linearRampToValueAtTime(300, ctx.currentTime + 1.2);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start();
}

/**
 * 9. Liquid Pouring Bubbles
 */
export function playMilkPour() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.linearRampToValueAtTime(480, now + 0.35);
  osc.frequency.linearRampToValueAtTime(260, now + 0.7);

  gain.gain.setValueAtTime(0.02, now);
  gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.75);
}

/**
 * 10. Steam Wand Froth
 */
export function playSteamHiss() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const bufferSize = ctx.sampleRate * 0.8;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const whiteNoise = ctx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2200, ctx.currentTime);
  filter.Q.setValueAtTime(3.0, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.01, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

  whiteNoise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  whiteNoise.start();
}

/**
 * 11. Spice Shaker Sprinkle
 */
export function playSpiceShake() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  for (let i = 0; i < 4; i++) {
    const delay = i * 0.08;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1400 + Math.random() * 600, ctx.currentTime + delay);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + delay + 0.03);

    gain.gain.setValueAtTime(0.08, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.04);
  }
}

/**
 * 12. Cafe Door Bell Chime (Welcome Customer)
 */
export function playBellChime() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [1046.5, 1318.5, 1567.98]; // C6, E6, G6
  notes.forEach((freq, idx) => {
    const delay = idx * 0.12;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    gain.gain.setValueAtTime(0.15, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.85);
  });
}

/**
 * 13. Tip / Success Cash Chime
 */
export function playSuccessChime() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    const delay = idx * 0.09;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    gain.gain.setValueAtTime(0.2, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.9);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.95);
  });
}

/**
 * 14. Latte Art Foam Brush Dab
 */
export function playLatteDab() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600 + Math.random() * 200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03);

  gain.gain.setValueAtTime(0.05, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.035);
}

/**
 * 15. Ambient Rain Sound
 */
export function toggleRainAmbience(): boolean {
  if (isRainPlaying) {
    stopRainAmbience();
    return false;
  } else {
    startRainAmbience();
    return true;
  }
}

export function startRainAmbience() {
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx || isRainPlaying) return;

  try {
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.015 * white) / 1.015;
      lastOut = output[i];
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
    rainNode = gain;
    isRainPlaying = true;
  } catch (e) {
    console.warn('Could not start ambient rain audio:', e);
  }
}

export function stopRainAmbience() {
  if (!isRainPlaying) return;
  const ctx = getAudioContext();
  if (ctx && rainNode) {
    try {
      (rainNode as GainNode).gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      setTimeout(() => {
        rainNode?.disconnect();
        rainNode = null;
        isRainPlaying = false;
      }, 500);
    } catch {
      isRainPlaying = false;
    }
  } else {
    isRainPlaying = false;
  }
}

export function isRainAmbienceActive(): boolean {
  return isRainPlaying;
}

/**
 * 16. Procedural Lo-Fi Cafe Radio
 */
const LOFI_CHORD_PROGRESSIONS = {
  midnight: [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 349.23], // G7
  ],
  rainy_jazz: [
    [293.66, 349.23, 440.00, 523.25], // Dm7
    [196.00, 246.94, 293.66, 349.23], // G7
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
  ],
  tokyo_cozy: [
    [349.23, 440.00, 523.25, 659.25], // Fmaj7
    [329.63, 392.00, 493.88, 587.33], // Em7
    [293.66, 349.23, 440.00, 523.25], // Dm7
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
  ],
  acoustic: [
    [261.63, 329.63, 392.00], // C
    [196.00, 246.94, 293.66], // G
    [220.00, 261.63, 329.63], // Am
    [174.61, 220.00, 261.63], // F
  ]
};

let chordIndex = 0;

function playLofiChord(frequencies: number[]) {
  if (isSoundMuted || !isLofiPlaying) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 2, now + idx * 0.03);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.03);
    osc.stop(now + 3.0);
  });
}

export function startLofiRadio(station?: 'midnight' | 'rainy_jazz' | 'tokyo_cozy' | 'acoustic') {
  if (station) currentLofiStation = station;
  if (isSoundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (isLofiPlaying && lofiInterval) {
    clearInterval(lofiInterval);
  }

  isLofiPlaying = true;
  chordIndex = 0;

  const chords = LOFI_CHORD_PROGRESSIONS[currentLofiStation];
  playLofiChord(chords[0]);

  lofiInterval = setInterval(() => {
    if (!isLofiPlaying || isSoundMuted) return;
    chordIndex = (chordIndex + 1) % chords.length;
    playLofiChord(chords[chordIndex]);
  }, 3200);
}

export function stopLofiRadio() {
  isLofiPlaying = false;
  if (lofiInterval) {
    clearInterval(lofiInterval);
    lofiInterval = null;
  }
}

export function toggleLofiRadio(): boolean {
  if (isLofiPlaying) {
    stopLofiRadio();
    return false;
  } else {
    startLofiRadio();
    return true;
  }
}

export function isLofiRadioActive(): boolean {
  return isLofiPlaying;
}

export function getCurrentLofiStation() {
  return currentLofiStation;
}
