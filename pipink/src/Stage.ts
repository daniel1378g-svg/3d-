// The WebGL stage: loads the stills and their depth maps, and renders the shot the scroll
// position (or the wrap picker) asks for.
import * as THREE from 'three';
import { vertex, fragment } from './shader';

export type Key = 'a_dirty' | 'b_foam' | 'c_clean' | 'd_bike' | 'e_macro' | 'f_blue' | 'g_bike_blue' | 'h_bike_black' | 'i_bike_green' | 'j_bike_red';
export const WRAPS: { key: Key; name: string; swatch: string }[] = [
  { key: 'g_bike_blue', name: 'Midnight blue', swatch: '#1b2f8f' },
  { key: 'h_bike_black', name: 'Satin black', swatch: '#1a1b1f' },
  { key: 'i_bike_green', name: 'Racing green', swatch: '#0f4a2c' },
  { key: 'j_bike_red', name: 'Candy red', swatch: '#b3121c' },
];

// Where the subject sits in each still (0..1, origin bottom left). Used as the zoom target and
// as the crop centre on narrow screens.
const FOCUS: Record<Key, [number, number]> = {
  a_dirty: [0.62, 0.5], b_foam: [0.62, 0.5], c_clean: [0.62, 0.5], d_bike: [0.6, 0.52], e_macro: [0.66, 0.42],
  f_blue: [0.6, 0.42], g_bike_blue: [0.5, 0.45], h_bike_black: [0.5, 0.45], i_bike_green: [0.5, 0.45], j_bike_red: [0.5, 0.45],
};
const NARROW_FOCUS: Partial<Record<Key, number>> = { a_dirty: 0.56, b_foam: 0.55, c_clean: 0.56, d_bike: 0.66, e_macro: 0.72, f_blue: 0.5 };
// Wide shots keep at least this share of their width on screen (matters on phones held upright).
const WIDE: Partial<Record<Key, number>> = { f_blue: 0.9, g_bike_blue: 0.74, h_bike_black: 0.74, i_bike_green: 0.74, j_bike_red: 0.74 };

// The scroll story, in "beats" (the page maps its scroll range onto 0..BEATS).
// mode: 1 foam wipe, 2 rinse wipe, 3 cross-zoom, 0 cut hidden behind the whiteout.
export const BEATS = 8;
const SEGMENTS: { from: Key; to: Key; mode: number; start: number; end: number }[] = [
  { from: 'a_dirty', to: 'b_foam', mode: 1, start: 1.0, end: 1.8 },
  { from: 'b_foam', to: 'c_clean', mode: 2, start: 2.25, end: 2.95 },
  { from: 'c_clean', to: 'd_bike', mode: 3, start: 3.3, end: 4.0 },
  { from: 'd_bike', to: 'e_macro', mode: 3, start: 4.55, end: 5.15 },
  { from: 'e_macro', to: 'f_blue', mode: 0, start: 5.85, end: 5.9 },
];
// Slow push-in while a shot is on screen: [first beat, last beat] per shot. The three wash shots
// share one move so the wipes between them stay aligned.
const SPAN: Partial<Record<Key, [number, number]>> = { a_dirty: [0, 3.9], b_foam: [0, 3.9], c_clean: [0, 3.9], d_bike: [3.3, 5.1], e_macro: [4.6, 6], f_blue: [5.9, 8] };

const sat = (x: number) => Math.max(0, Math.min(1, x));
const ease = (x: number) => x * x * (3 - 2 * x);
const ramp = (u: number, a: number, b: number) => sat((u - a) / (b - a));

export class Stage {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private material: THREE.ShaderMaterial;
  private tex = new Map<string, THREE.Texture>();
  private clock = new THREE.Clock();
  private raf = 0;
  private u = 0;                                    // smoothed scroll beat
  private target = 0;
  private mouse = new THREE.Vector2();
  private mouseTarget = new THREE.Vector2();
  private fade = 0;
  private reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Wrap picker state.
  picker = { open: 0, openTarget: 0, wrap: 0, prev: 0, sweep: 1 };

  constructor(private canvas: HTMLCanvasElement, private mobile: boolean) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace;      // the stills are shown as they are
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertex, fragmentShader: fragment, depthTest: false, depthWrite: false,
      uniforms: {
        tA: { value: null }, tB: { value: null }, dA: { value: null }, dB: { value: null },
        uRes: { value: new THREE.Vector2(1, 1) }, uAspect: { value: 2688 / 1520 }, uTime: { value: 0 },
        uMix: { value: 0 }, uMode: { value: 0 }, uWhite: { value: 0 }, uSmoke: { value: 0 }, uDim: { value: 0 }, uFade: { value: 0 },
        uZoomA: { value: 0 }, uZoomB: { value: 0 }, uWideA: { value: 0 }, uWideB: { value: 0 }, uFocusA: { value: new THREE.Vector2(0.5, 0.5) }, uFocusB: { value: new THREE.Vector2(0.5, 0.5) },
        uPar: { value: new THREE.Vector2() }, uTint: { value: new THREE.Vector3(0.3, 0.4, 1) },
      },
    });
    this.scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material));
    this.resize();
    window.addEventListener('resize', this.resize);
    window.addEventListener('pointermove', this.onPointer, { passive: true });
  }

  private onPointer = (e: PointerEvent) => {
    if (e.pointerType === 'touch') return;
    this.mouseTarget.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
  };

  resize = () => {
    const w = this.canvas.clientWidth || window.innerWidth, h = this.canvas.clientHeight || window.innerHeight;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, this.mobile ? 1.5 : 2));
    this.renderer.setSize(w, h, false);
    this.material.uniforms.uRes.value.set(w, h);
  };

  // Loads every still and depth map. onProgress gets 0..1.
  async load(keys: Key[], onProgress: (f: number) => void) {
    const loader = new THREE.TextureLoader();
    const jobs: Promise<void>[] = [];
    let done = 0;
    const total = keys.length * 2;
    const one = (name: string, file: string) => loader.loadAsync(file).then((t) => {
      t.colorSpace = THREE.NoColorSpace; t.generateMipmaps = false; t.minFilter = THREE.LinearFilter; t.magFilter = THREE.LinearFilter;
      t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
      this.tex.set(name, t);
      onProgress(++done / total);
    });
    for (const k of keys) {
      jobs.push(one(k, `img/${k}${this.mobile ? '_m' : ''}.webp`));
      jobs.push(one(`${k}:d`, `img/${k}_d.webp`));
    }
    await Promise.all(jobs);
  }

  start() {
    const loop = () => { this.raf = requestAnimationFrame(loop); this.frame(); };
    loop();
  }

  setBeat(u: number) { this.target = u; }
  openPicker() { this.picker.openTarget = 1; }
  closePicker() { this.picker.openTarget = 0; }
  setWrap(i: number) {
    if (i === this.picker.wrap) return;
    this.picker.prev = this.picker.wrap; this.picker.wrap = i; this.picker.sweep = 0;
  }

  private zoomOf(key: Key, u: number) {
    const span = SPAN[key];
    return 0.035 + (span ? 0.085 * ease(ramp(u, span[0], span[1])) : 0.02);
  }

  private bind(slot: 'A' | 'B', key: Key, zoom: number) {
    const un = this.material.uniforms;
    un[`t${slot}`].value = this.tex.get(key) || null;
    un[`d${slot}`].value = this.tex.get(`${key}:d`) || null;
    const f = FOCUS[key];
    const narrow = window.innerWidth / window.innerHeight < 1 ? NARROW_FOCUS[key] : undefined;
    un[`uFocus${slot}`].value.set(narrow ?? f[0], f[1]);
    un[`uZoom${slot}`].value = zoom;
    un[`uWide${slot}`].value = WIDE[key] ?? 0;
  }

  private frame() {
    const dt = Math.min(0.05, this.clock.getDelta());
    const un = this.material.uniforms;
    const p = this.picker;
    this.u += (this.target - this.u) * Math.min(1, dt * (this.reduced ? 30 : 7));
    this.mouse.lerp(this.mouseTarget, Math.min(1, dt * 3));
    this.fade += (1 - this.fade) * Math.min(1, dt * 2.2);
    p.open += (p.openTarget - p.open) * Math.min(1, dt * 2.6);
    if (Math.abs(p.openTarget - p.open) < 0.002) p.open = p.openTarget;
    p.sweep = Math.min(1, p.sweep + dt / 0.85);
    const u = this.u, time = this.clock.elapsedTime;
    un.uTime.value = time;
    un.uFade.value = this.fade;
    const drift = this.reduced ? 0 : 1;
    un.uPar.value.set((-this.mouse.x * 0.014 + Math.sin(time * 0.23) * 0.004) * drift, (this.mouse.y * 0.008 + Math.cos(time * 0.19) * 0.003) * drift);

    if (p.open > 0.001) {
      // The wrap picker: fly from the wide blue shot to the bike's profile, then sweep colours.
      if (p.open < 0.999) {
        this.bind('A', 'f_blue', this.zoomOf('f_blue', u)); this.bind('B', WRAPS[p.wrap].key, 0.04);
        un.uFocusA.value.set(0.22, 0.42);                               // fly toward the bike on the left
        un.uMode.value = 3; un.uMix.value = ease(p.open);
      } else {
        this.bind('A', WRAPS[p.prev].key, 0.04 + Math.sin(time * 0.3) * 0.006); this.bind('B', WRAPS[p.wrap].key, 0.04 + Math.sin(time * 0.3) * 0.006);
        un.uMode.value = 5; un.uMix.value = ease(p.sweep);
      }
      un.uWhite.value = 0; un.uDim.value = 0; un.uSmoke.value = 0.34;
      un.uTint.value.set(0.34, 0.42, 0.95);
    } else {
      let seg = SEGMENTS[0], mix = 0;
      for (const s of SEGMENTS) { if (u >= s.start) { seg = s; mix = ramp(u, s.start, s.end); } }
      if (u < SEGMENTS[0].start) mix = 0;
      this.bind('A', seg.from, this.zoomOf(seg.from, u)); this.bind('B', seg.to, this.zoomOf(seg.to, u));
      un.uMode.value = seg.mode;
      un.uMix.value = seg.mode === 3 ? ease(mix) : mix;
      // Whiteout between the white car and its new colour.
      un.uWhite.value = ease(ramp(u, 5.25, 5.75)) * (1 - ease(ramp(u, 6.15, 6.75)));
      const blue = ramp(u, 5.9, 6.4);
      un.uSmoke.value = 0.07 + blue * 0.33;
      un.uTint.value.set(0.42 - blue * 0.1, 0.42, 0.6 + blue * 0.38);
      // Darken the side the text sits on.
      const left = Math.max(1 - ramp(u, 0.75, 1.0), ease(ramp(u, 1.15, 1.35)) * (1 - ramp(u, 2.1, 2.3)), ease(ramp(u, 2.75, 2.95)) * (1 - ramp(u, 3.15, 3.3)), ease(ramp(u, 3.85, 4.05)) * (1 - ramp(u, 4.4, 4.6)), ease(ramp(u, 7.2, 7.5)));
      un.uDim.value = left;
    }
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('pointermove', this.onPointer);
    for (const t of this.tex.values()) t.dispose();
    this.material.dispose(); this.renderer.dispose();
  }
}
