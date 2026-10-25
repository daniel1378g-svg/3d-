// Optional ambient sound, off by default: a low room tone, a warm drone, and now and then
// the soft ring of glass. Generated live with Web Audio, so there are no files to load.
export function createAmbient() {
  let ctx = null, master = null, chimeTimer = 0, on = false;

  function build() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain();
    master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);

    // room tone: filtered noise
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + w * 0.029; b1 = 0.985 * b1 + w * 0.032; b2 = 0.95 * b2 + w * 0.048;
      d[i] = (b0 + b1 + b2) * 0.3;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    const nf = ctx.createBiquadFilter();
    nf.type = 'lowpass';
    nf.frequency.value = 420;
    const ng = ctx.createGain();
    ng.gain.value = 0.22;
    noise.connect(nf).connect(ng).connect(master);
    noise.start();

    // drone: A2 / E3 / A3, slightly detuned, breathing through a slow filter
    const df = ctx.createBiquadFilter();
    df.type = 'lowpass';
    df.frequency.value = 600;
    df.Q.value = 0.6;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 260;
    lfo.connect(lfoGain).connect(df.frequency);
    lfo.start();
    const dg = ctx.createGain();
    dg.gain.value = 0.05;
    df.connect(dg).connect(master);
    for (const [f, det] of [[110, -4], [164.81, 3], [220, 6], [329.63, -2]]) {
      const o = ctx.createOscillator();
      o.type = f > 300 ? 'sine' : 'triangle';
      o.frequency.value = f;
      o.detune.value = det;
      const g = ctx.createGain();
      g.gain.value = f > 300 ? 0.25 : 0.6;
      o.connect(g).connect(df);
      o.start();
    }

    // a quiet echo for the glass
    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.42;
    const fb = ctx.createGain();
    fb.gain.value = 0.38;
    const wet = ctx.createGain();
    wet.gain.value = 0.35;
    delay.connect(fb).connect(delay);
    delay.connect(wet).connect(master);
    ctx.__echo = delay;
  }

  function chime() {
    if (!on || !ctx) return;
    const notes = [880, 987.77, 1108.73, 1318.51, 1479.98, 1760];
    const f = notes[Math.floor(Math.random() * notes.length)];
    const t = ctx.currentTime;
    for (const [mult, amp] of [[1, 0.05], [2.76, 0.012], [5.4, 0.006]]) {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f * mult;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(amp, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2 / mult);
      o.connect(g);
      g.connect(master);
      g.connect(ctx.__echo);
      o.start(t);
      o.stop(t + 3.5);
    }
    chimeTimer = setTimeout(chime, 6000 + Math.random() * 9000);
  }

  return {
    get on() { return on; },
    async toggle() {
      on = !on;
      if (on) {
        if (!ctx) build();
        await ctx.resume();
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0.5, ctx.currentTime, 0.8);
        chimeTimer = setTimeout(chime, 2500);
      } else if (ctx) {
        clearTimeout(chimeTimer);
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.setTargetAtTime(0, ctx.currentTime, 0.4);
        setTimeout(() => { if (!on) ctx.suspend(); }, 1800);
      }
      return on;
    },
  };
}
