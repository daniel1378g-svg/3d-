// Optional sound, off by default: a split-flap clack and a leaf rustle, both generated with Web Audio
// (no audio files). The choice is remembered in this browser only.
import { storage } from "./utils";

let enabled = storage("local").get("oliveira-sound") === "1";
let ctx: AudioContext | null = null;
let noise: AudioBuffer | null = null;
let lastClack = 0;

export const soundEnabled = () => enabled;
export function setSound(on: boolean) {
  enabled = on;
  storage("local").set("oliveira-sound", on ? "1" : "0");
  if (on) audio();
}

function audio() {
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function burst(freq: number, q: number, gain: number, attack: number, decay: number) {
  const ac = audio();
  if (!ac || !noise) return;
  const src = ac.createBufferSource();
  src.buffer = noise;
  src.playbackRate.value = 0.7 + Math.random() * 0.6;
  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = q;
  const g = ac.createGain();
  const t = ac.currentTime;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + attack + decay);
  src.connect(filter).connect(g).connect(ac.destination);
  src.start(t, Math.random() * 0.5, attack + decay + 0.05);
}

/** One flap landing: a short, dry click. Throttled so a whole board doesn't roar. */
export function clack() {
  if (!enabled) return;
  const now = performance.now();
  if (now - lastClack < 28) return;
  lastClack = now;
  burst(2400 + Math.random() * 900, 3.5, 0.18, 0.002, 0.045);
}

/** A gust through olive leaves: soft, airy, a second long. */
export function rustle(strength = 1) {
  if (!enabled) return;
  burst(5200, 0.6, 0.05 * Math.min(1, strength), 0.18, 0.9);
  burst(3200, 0.8, 0.035 * Math.min(1, strength), 0.3, 0.8);
}
