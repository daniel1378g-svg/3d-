// Sound, all synthesised with Web Audio: engine hum, indicator relay, horn, chimes, and the
// examiner's voice through speechSynthesis where the browser has one.
//
//   const audio = createAudio();
//   audio.unlock()   call from a tap or key press; browsers keep audio silent until then
//
// Every method is safe to call before unlock() and where Web Audio is missing: it does nothing.

export function createAudio() {
  let ctx = null;
  let master = null;
  let enabled = true;
  let voice = true;
  let engine = null;     // { osc1, osc2, filter, gain }
  let horn = null;       // { oscs, gain }
  let noise = null;      // shared white-noise buffer for the relay click

  const now = () => ctx.currentTime;
  const ready = () => !!ctx && ctx.state === 'running' && enabled;

  const build = () => {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = enabled ? 1 : 0;
    master.connect(ctx.destination);

    // Engine: two detuned saws through a low-pass. Quiet on purpose; it runs for the whole drive.
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 220;
    filter.Q.value = 0.7;
    const gain = ctx.createGain();
    gain.gain.value = 0;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    osc1.start();
    osc2.start();
    engine = { osc1, osc2, filter, gain };

    const hornGain = ctx.createGain();
    hornGain.gain.value = 0;
    const hornFilter = ctx.createBiquadFilter();
    hornFilter.type = 'lowpass';
    hornFilter.frequency.value = 2200;
    const oscs = [415, 523].map((f) => {
      const o = ctx.createOscillator();
      o.type = 'square';
      o.frequency.value = f;
      o.connect(hornFilter);
      o.start();
      return o;
    });
    hornFilter.connect(hornGain);
    hornGain.connect(master);
    horn = { oscs, gain: hornGain };

    const length = Math.floor(ctx.sampleRate * 0.03);
    noise = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
  };

  // One soft sine note with a quick attack and an exponential tail.
  const note = (freq, at, length, level, type = 'sine') => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, at);
    g.gain.exponentialRampToValueAtTime(level, at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, at + length);
    o.connect(g);
    g.connect(master);
    o.start(at);
    o.stop(at + length + 0.02);
  };

  return {
    unlock() {
      try {
        if (!ctx) build();
        if (ctx && ctx.state !== 'running') ctx.resume();
      } catch { /* no audio on this device */ }
    },

    setEnabled(v) {
      enabled = !!v;
      if (master) master.gain.setTargetAtTime(enabled ? 1 : 0, now(), 0.03);
      if (!enabled) { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch { /* ignore */ } }
    },

    // Voice has its own switch in the settings; sound off also silences it.
    setVoice(v) {
      voice = !!v;
      if (!voice) { try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch { /* ignore */ } }
    },

    engine(rpm, throttle, on) {
      if (!ctx || !engine) return;
      const t = now();
      if (!on || !ready()) {
        engine.gain.gain.setTargetAtTime(0, t, 0.08);
        return;
      }
      // A four-cylinder fires twice per revolution: 800 rpm is about 27 Hz, 3000 rpm about 100 Hz.
      const f = Math.max(20, (rpm || 800) / 30);
      const load = Math.min(1, Math.max(0, throttle || 0));
      engine.osc1.frequency.setTargetAtTime(f * 2, t, 0.05);
      engine.osc2.frequency.setTargetAtTime(f * 3.01, t, 0.05);
      engine.filter.frequency.setTargetAtTime(180 + f * 2.2 + load * 420, t, 0.06);
      engine.gain.gain.setTargetAtTime(0.028 + load * 0.03, t, 0.08);
    },

    tick(on) {
      if (!ready()) return;
      const src = ctx.createBufferSource();
      src.buffer = noise;
      const f = ctx.createBiquadFilter();
      f.type = 'bandpass';
      f.frequency.value = on ? 2400 : 1500;   // tick, then the lower tock
      f.Q.value = 3;
      const g = ctx.createGain();
      g.gain.value = 0.22;
      src.connect(f);
      f.connect(g);
      g.connect(master);
      src.start();
    },

    horn(on) {
      if (!ctx || !horn) return;
      horn.gain.gain.setTargetAtTime(on && ready() ? 0.11 : 0, now(), 0.015);
    },

    chime(kind) {
      if (!ready()) return;
      const t = now() + 0.01;
      if (kind === 'instruction') { note(880, t, 0.28, 0.1); note(1174.700, t + 0.13, 0.4, 0.1); }
      else if (kind === 'minor') { note(392, t, 0.3, 0.12, 'triangle'); }
      else if (kind === 'serious') { note(349.200, t, 0.28, 0.14, 'triangle'); note(233.100, t + 0.22, 0.6, 0.14, 'triangle'); }
      else if (kind === 'pass') { note(523.300, t, 0.3, 0.1); note(659.300, t + 0.14, 0.3, 0.1); note(784, t + 0.28, 0.6, 0.1); }
    },

    speak(text, lang = 'cs-CZ') {
      if (!enabled || !voice || !text) return;
      try {
        const synth = window.speechSynthesis;
        if (!synth || typeof SpeechSynthesisUtterance !== 'function') return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang;
        const prefix = lang.slice(0, 2).toLowerCase();
        const match = synth.getVoices().find((v) => v.lang && v.lang.toLowerCase().startsWith(prefix));
        if (match) u.voice = match;
        u.rate = 0.98;
        synth.cancel();           // a new instruction replaces the one still being read
        synth.speak(u);
      } catch { /* speech is a nicety */ }
    },
  };
}
