// ============================================
// XVI GROUP — Synthesized Sound Engine
// All audio is generated procedurally with the
// Web Audio API. No external audio assets.
// ============================================

export type SoundName =
  | 'ctaHover'
  | 'ctaClick'
  | 'hologram'
  | 'dockOpen'
  | 'dockClose'
  | 'aiThink'
  | 'aiRespond';

const STORAGE_KEY = 'xvi-sound';
const isBrowser = typeof window !== 'undefined';

let ctx: AudioContext | null = null;
let muted: boolean = (() => {
  if (!isBrowser) return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'off';
  } catch {
    return false;
  }
})();
let playingCount = 0;
let ambient: { stop: () => void } | null = null;

function readPref() {
  if (!isBrowser) return;
  try {
    muted = localStorage.getItem(STORAGE_KEY) === 'off';
  } catch {
    /* storage unavailable */
  }
}

function ensureCtx(): AudioContext | null {
  if (!isBrowser) return null;
  readPref();
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  } catch {
    return null;
  }
}

function tone(opts: {
  type?: OscillatorType;
  freq: number;
  endFreq?: number;
  at: number;
  dur: number;
  gain: number;
}) {
  const ac = ctx;
  if (!ac) return;
  const { type = 'sine', freq, endFreq, at, dur, gain } = opts;
  try {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, at);
    if (endFreq) o.frequency.exponentialRampToValueAtTime(Math.max(1, endFreq), at + dur);
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    o.connect(g).connect(ac.destination);
    o.start(at);
    o.stop(at + dur + 0.02);
  } catch {
    /* ignore */
  }
}

function noise(opts: {
  at: number;
  dur: number;
  gain: number;
  type?: BiquadFilterType;
  freq: number;
}) {
  const ac = ctx;
  if (!ac) return;
  const { at, dur, gain, type = 'bandpass', freq } = opts;
  try {
    const len = Math.max(1, Math.floor(ac.sampleRate * dur));
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 1.6);
    const src = ac.createBufferSource();
    src.buffer = buf;
    const f = ac.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, at);
    f.Q.value = 1.4;
    const g = ac.createGain();
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), at + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
    src.connect(f).connect(g).connect(ac.destination);
    src.start(at);
    src.stop(at + dur + 0.02);
  } catch {
    /* ignore */
  }
}

export function playSound(name: SoundName): void {
  if (!isBrowser || muted) return;
  const ac = ensureCtx();
  if (!ac) return;
  const now = ac.currentTime;
  try {
    switch (name) {
      case 'ctaHover':
        tone({ type: 'sine', freq: 1560, endFreq: 1960, at: now, dur: 0.09, gain: 0.02 });
        break;
      case 'ctaClick':
        noise({ at: now, dur: 0.06, gain: 0.03, type: 'highpass', freq: 3200 });
        tone({ type: 'sine', freq: 660, endFreq: 990, at: now, dur: 0.16, gain: 0.045 });
        break;
      case 'hologram':
        tone({ type: 'sine', freq: 320, endFreq: 1240, at: now, dur: 0.3, gain: 0.035 });
        noise({ at: now, dur: 0.32, gain: 0.02, freq: 900 });
        break;
      case 'dockOpen':
        tone({ type: 'sine', freq: 880, at: now, dur: 0.5, gain: 0.04 });
        tone({ type: 'sine', freq: 1320, at: now + 0.09, dur: 0.55, gain: 0.035 });
        break;
      case 'dockClose':
        tone({ type: 'sine', freq: 240, endFreq: 118, at: now, dur: 0.24, gain: 0.04 });
        break;
      case 'aiThink':
        tone({ type: 'sine', freq: 1046, at: now, dur: 0.22, gain: 0.018 });
        tone({ type: 'sine', freq: 1318, at: now + 0.11, dur: 0.22, gain: 0.018 });
        tone({ type: 'sine', freq: 1568, at: now + 0.22, dur: 0.3, gain: 0.016 });
        break;
      case 'aiRespond':
        tone({ type: 'triangle', freq: 784, at: now, dur: 0.3, gain: 0.03 });
        tone({ type: 'triangle', freq: 1174, at: now + 0.12, dur: 0.4, gain: 0.03 });
        break;
    }
    playingCount += 1;
    window.dispatchEvent(new CustomEvent('xvi:sound-play', { detail: { name } }));
  } catch {
    /* ignore audio errors */
  }
}

function persist(v: boolean) {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEY, v ? 'off' : 'on');
  } catch {
    /* storage unavailable */
  }
}

export function setMuted(v: boolean) {
  const changed = muted !== v;
  muted = v;
  if (v) stopAmbient();
  if (changed && isBrowser) {
    persist(v);
    window.dispatchEvent(new CustomEvent('xvi:sound-muted', { detail: { muted: v } }));
  }
}

export function isMuted() {
  return muted;
}

export function toggleMuted() {
  setMuted(!muted);
}

export function getSoundCount() {
  return playingCount;
}

function buildAmbient(): { stop: () => void } | null {
  const ac = ensureCtx();
  if (!ac) return null;
  const now = ac.currentTime;
  const master = ac.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.linearRampToValueAtTime(1, now + 4);
  master.connect(ac.destination);

  const mk = (freq: number, gain: number, type: OscillatorType = 'sine') => {
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = gain;
    o.connect(g).connect(master);
    o.start(now);
    return o;
  };

  const a = mk(55, 0.008);
  const b = mk(82.5, 0.005);
  const c = mk(329.63, 0.0016);

  const len = Math.floor(ac.sampleRate * 2);
  const buf = ac.createBuffer(1, len, ac.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
  const n = ac.createBufferSource();
  n.buffer = buf;
  n.loop = true;
  const nf = ac.createBiquadFilter();
  nf.type = 'lowpass';
  nf.frequency.value = 240;
  const ng = ac.createGain();
  ng.gain.value = 0.003;
  n.connect(nf).connect(ng).connect(master);
  n.start(now);

  let stopped = false;
  return {
    stop() {
      if (stopped) return;
      stopped = true;
      const t = ac.currentTime;
      master.gain.cancelScheduledValues(t);
      master.gain.setValueAtTime(Math.max(0.0001, master.gain.value), t);
      master.gain.exponentialRampToValueAtTime(0.0001, t + 1);
      const stopAt = t + 1.1;
      [a, b, c, n].forEach((s) => {
        try {
          s.stop(stopAt);
        } catch {
          /* ignore */
        }
      });
    },
  };
}

export function startAmbient() {
  if (!isBrowser || muted || ambient) return;
  try {
    ambient = buildAmbient();
    if (ambient) {
      window.dispatchEvent(new CustomEvent('xvi:sound-ambient', { detail: { started: true } }));
    }
  } catch {
    /* ignore */
  }
}

export function stopAmbient() {
  if (!ambient) return;
  const nodes = ambient;
  ambient = null;
  try {
    nodes.stop();
  } catch {
    /* ignore */
  }
  if (isBrowser) {
    window.dispatchEvent(new CustomEvent('xvi:sound-ambient', { detail: { started: false } }));
  }
}

export function resetSoundEngine() {
  stopAmbient();
  if (ctx) {
    try {
      void ctx.close();
    } catch {
      /* ignore */
    }
    ctx = null;
  }
  playingCount = 0;
}
