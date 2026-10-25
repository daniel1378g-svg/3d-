import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { buildRoom, buildEnvironment } from './room.js';
import { Chandelier } from './chandelier.js';
import { MosaicTextures } from './mosaic.js';

const clamp = THREE.MathUtils.clamp;
const damp = (a, b, lambda, dt) => a + (b - a) * (1 - Math.exp(-lambda * dt));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// Film finish: soft vignette and fine grain, applied after tone mapping.
const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uGrain: { value: 0.035 }, uVignette: { value: 0.32 } },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uTime; uniform float uGrain; uniform float uVignette; varying vec2 vUv;
    float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 d = vUv - 0.5;
      float v = smoothstep(0.85, 0.2, length(d * vec2(1.1, 1.0)));
      c.rgb *= mix(1.0 - uVignette, 1.0, v);
      float n = hash(gl_FragCoord.xy + fract(uTime) * 61.0) - 0.5;
      c.rgb += n * uGrain * (1.0 - dot(c.rgb, vec3(0.333)) * 0.6);
      gl_FragColor = c;
    }`,
};

export function detectQuality() {
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const small = Math.min(window.innerWidth, window.innerHeight) < 700;
  const mem = navigator.deviceMemory || 8;
  const cores = navigator.hardwareConcurrency || 8;
  const low = (coarse && small) || mem <= 4 || cores <= 4;
  return {
    tier: low ? 'low' : 'high',
    dprMax: low ? 1.5 : 2,
    msaa: low ? 0 : 4,
    mosaicSize: low ? 1024 : 2048,
    bloomScale: low ? 0.35 : 0.5,
  };
}

export class Stage {
  constructor(canvas, { quality, reducedMotion, photo = false }) {
    this.canvas = canvas;
    this.quality = quality;
    this.reduced = reducedMotion;
    this.photo = photo;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance', alpha: false, preserveDrawingBuffer: photo });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.NeutralToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.dpr = Math.min(window.devicePixelRatio || 1, quality.dprMax);
    this.renderer.setPixelRatio(this.dpr);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0c0b0a');
    this.camera = new THREE.PerspectiveCamera(30, 1, 0.03, 80);
    this.room = buildRoom(this.scene, { quality });
    this.scene.environment = buildEnvironment(this.renderer);
    this.scene.environmentIntensity = 0.55;
    this.chandelier = new Chandelier(this.scene, { quality });
    this.mosaic = new MosaicTextures();

    // post-processing
    const target = new THREE.WebGLRenderTarget(2, 2, { type: THREE.HalfFloatType, samples: quality.msaa });
    this.composer = new EffectComposer(this.renderer, target);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.4, 0.55, 1.0);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
    this.grade = new ShaderPass(GradeShader);
    this.composer.addPass(this.grade);

    // view state
    this.light = { on: true, dimmer: 0.85, value: 0 };
    this.yaw = 0; this.yawVel = 0; this.yawAcc = 0; this.prevYawVel = 0;
    this.orbit = { az: 0, el: 0, azT: 0, elT: 0 };
    this.zoom = 1; this.zoomT = 1;
    this.focus = { index: -1, blend: 0, target: 0 };
    this.keys = {}; // camera keyframes by name
    this.scrollCam = { from: 'hero', to: 'hero', t: 0 };
    this.intro = { t: 1, active: false };
    this.camPos = new THREE.Vector3(0, 2.3, 3);
    this.camTarget = new THREE.Vector3(0, 2.5, 0);
    this.viewOffset = new THREE.Vector2();
    this.hover = null;
    this.visible = true;
    this.lastTime = performance.now();
    this.frameTimes = [];
    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.onResize = this.resize.bind(this);
    window.addEventListener('resize', this.onResize);
    this.resize();
  }

  async load(onProgress) {
    let modelP = 0, mosaicDone = 0;
    const report = () => onProgress?.(modelP * 0.75 + mosaicDone * 0.25);
    const [chandelier] = await Promise.all([
      this.chandelier.load((p) => { modelP = p; report(); }),
      this.mosaic.build(this.quality.mosaicSize).then(() => { mosaicDone = 1; report(); }),
    ]);
    this.defineKeys();
    return chandelier;
  }

  setup(config) {
    this.chandelier.setup(this.mosaic, config);
    this.chandelier.onGlobesChanged = (n) => this.onGlobesChanged?.(n);
    this.onGlobesChanged?.(this.chandelier.globes.length);
    // compile shaders up front so the first lit frame doesn't stutter
    this.renderer.compile(this.scene, this.camera);
  }

  defineKeys() {
    const c = this.chandelier.center.clone();
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    this.keys = {
      intro: { pos: V(0.12, c.y - 0.56, 3.25), target: V(0, c.y + 0.0, 0), off: [0, 0] },
      hero: { pos: V(0, c.y - 0.38, 2.15), target: V(0, c.y - 0.06, 0), off: [0, 0] },
      glass: { dynamic: 'glass' },
      metal: { pos: V(-0.5, this.chandelier.crownY - 0.46, 0.92), target: V(0, this.chandelier.crownY + 0.04, 0), off: [0.16, 0] },
      config: { pos: V(0, c.y - 0.35, 2.55), target: V(0, c.y - 0.02, 0), off: [-0.2, 0] },
    };
  }

  // keyframe → concrete pose, adapting to aspect ratio
  pose(name, out = { pos: new THREE.Vector3(), target: new THREE.Vector3(), off: new THREE.Vector2() }) {
    const k = this.keys[name] || this.keys.hero;
    const aspect = this.width / Math.max(1, this.height);
    if (k.dynamic === 'glass') {
      const g = this.frontGlobe();
      if (g) {
        out.target.copy(g);
        out.pos.copy(g).add(_tmp.set(0.22, 0.03, 0.4));
      } else {
        out.target.copy(this.chandelier.center);
        out.pos.set(0.2, this.chandelier.center.y, 0.8);
      }
      out.off.set(0.17, 0);
    } else {
      out.pos.copy(k.pos);
      out.target.copy(k.target);
      out.off.set(k.off[0], k.off[1]);
    }
    if (name === 'hero' && aspect > 1.2) out.off.x += 0.07; // leave the headline room on wide screens
    if (aspect < 0.9) {
      // portrait phones: step back and lift the object into the upper half, above the text
      const back = { glass: 1.5, metal: 1.3, hero: 1.32, intro: 1.25, config: 1.3 }[name] || 1.25;
      _tmp.copy(out.pos).sub(out.target).multiplyScalar(back);
      out.pos.copy(out.target).add(_tmp);
      out.off.set(0, { config: 0.2, hero: 0.19, intro: 0.17, glass: 0.24, metal: 0.22 }[name] ?? 0.18);
    }
    return out;
  }

  frontGlobe() {
    let best = null, bestZ = -Infinity;
    const v = new THREE.Vector3();
    for (const p of this.chandelier.active) {
      this.chandelier.globeWorld(p, v);
      const score = v.z - Math.abs(v.x) * 0.5 + v.y * 0.2;
      if (score > bestZ) { bestZ = score; best = v.clone(); }
    }
    return best;
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height, false);
    this.composer.setPixelRatio(this.dpr);
    this.composer.setSize(this.width, this.height);
    this.bloom.resolution.set(this.width * this.quality.bloomScale, this.height * this.quality.bloomScale);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  // ── interaction ─────────────────────────────────────────────
  dragBy(dx, dy, dtMs = 16) {
    if (this.focus.target > 0.5) {
      this.orbit.azT = clamp(this.orbit.azT - dx * 0.006, -1.1, 1.1);
      this.orbit.elT = clamp(this.orbit.elT + dy * 0.004, -0.5, 0.6);
      return;
    }
    const dyaw = dx * 0.0085;
    this.yaw += dyaw;
    this.yawGoal = undefined;
    // measured angular velocity, carried on as inertia once the pointer lets go
    const v = clamp(dyaw / Math.max(dtMs / 1000, 0.004), -10, 10);
    this.yawVel += (v - this.yawVel) * 0.5;
    this.orbit.elT = clamp(this.orbit.elT + dy * 0.003, -0.32, 0.42);
  }

  nudge(dyaw, del = 0) {
    if (this.focus.target > 0.5) {
      this.orbit.azT = clamp(this.orbit.azT + dyaw, -1.1, 1.1);
    } else {
      this.yawVel += dyaw * 5;
    }
    this.orbit.elT = clamp(this.orbit.elT + del, -0.32, 0.42);
  }

  zoomBy(f) { this.zoomT = clamp(this.zoomT * f, 0.42, 1.3); }

  resetView() {
    this.zoomT = 1; this.orbit.azT = 0; this.orbit.elT = 0;
    this.yawGoal = Math.round(this.yaw / (Math.PI * 2)) * Math.PI * 2;
    this.exitFocus();
  }

  pick(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.chandelier.pickables(), false);
    return hits.length ? hits[0].object : null;
  }

  focusGlobe(i) {
    const globes = this.chandelier.globes;
    if (!globes[i]) return;
    this.focus.index = i;
    this.focus.target = 1;
    this.orbit.azT = 0; this.orbit.elT = 0;
    this.zoomT = 1;
    const p = globes[i];
    // turn the chandelier so the chosen globe faces the viewer, three-quarters on
    if (!p.center) {
      const v = this.chandelier.globeWorld(p, new THREE.Vector3());
      const current = Math.atan2(v.z, v.x);
      const desired = Math.PI / 2 - 0.3;
      let d = desired - current;
      d = Math.atan2(Math.sin(d), Math.cos(d));
      this.yawGoal = this.yaw - d; // rotation.y moves atan2 angles by −Δ
    }
    this.yawVel = 0;
  }

  exitFocus() {
    this.focus.target = 0;
    this.orbit.azT = 0;
  }

  setLight(on) { this.light.on = on; }
  setDimmer(v) { this.light.dimmer = clamp(v, 0.08, 1); }

  setScrollCamera(from, to, t) {
    this.scrollCam.from = from; this.scrollCam.to = to; this.scrollCam.t = t;
  }

  // ── loop ───────────────────────────────────────────────────
  start() {
    const loop = () => {
      this.raf = requestAnimationFrame(loop);
      const now = performance.now();
      const dt = Math.min(0.05, (now - this.lastTime) / 1000);
      this.lastTime = now;
      if (!this.visible && !this.photo) return;
      this.tick(dt, now / 1000);
      this.adapt(dt);
    };
    loop();
  }

  tick(dt, time) {
    const reduced = this.reduced;
    // light: smooth switch & dimmer
    const lightTarget = this.light.on ? this.light.dimmer : 0;
    this.light.value = reduced ? lightTarget : damp(this.light.value, lightTarget, this.light.on ? 3.2 : 5, dt);

    // yaw with inertia, or eased toward a goal (globe focus / reset)
    if (this.yawGoal !== undefined) {
      const prev = this.yaw;
      this.yaw = reduced ? this.yawGoal : damp(this.yaw, this.yawGoal, 3.2, dt);
      this.yawVel = (this.yaw - prev) / Math.max(dt, 1e-3);
      if (Math.abs(this.yaw - this.yawGoal) < 1e-3) { this.yaw = this.yawGoal; this.yawGoal = undefined; }
    } else if (!this.dragging) {
      this.yaw += this.yawVel * dt * (reduced ? 0 : 1);
      this.yawVel *= Math.exp(-dt * 2.4);
      if (Math.abs(this.yawVel) < 0.002) this.yawVel = 0;
    }
    this.yawAcc = (this.yawVel - this.prevYawVel) / Math.max(dt, 1e-3);
    this.prevYawVel = this.yawVel;
    if (this.dragging) this.yawVel *= Math.exp(-dt * 10); // holding still stops the spin
    this.chandelier.root.rotation.y = this.yaw;

    this.chandelier.update(dt, {
      brightness: this.light.value,
      yawVel: this.yawVel,
      yawAcc: this.yawAcc,
      hoverMesh: this.hover,
      reduced,
    });

    // camera: scroll keyframes → intro blend → globe focus → orbit/zoom
    const a = this.pose(this.scrollCam.from, _poseA);
    const b = this.pose(this.scrollCam.to, _poseB);
    const st = ease(clamp(this.scrollCam.t, 0, 1));
    _pos.lerpVectors(a.pos, b.pos, st);
    _tgt.lerpVectors(a.target, b.target, st);
    _off.lerpVectors(a.off, b.off, st);
    if (this.intro.active || this.intro.t < 1) {
      const i = this.pose('intro', _poseC);
      const it = ease(clamp(this.intro.t, 0, 1));
      _pos.lerpVectors(i.pos, _pos, it);
      _tgt.lerpVectors(i.target, _tgt, it);
      _off.lerpVectors(i.off, _off, it);
    }
    if (this.override) {
      // fixed composition for rendered stills
      _pos.copy(this.override.pos);
      _tgt.copy(this.override.target);
      _off.copy(this.override.off || _zero2);
    }
    this.focus.blend = reduced ? this.focus.target : damp(this.focus.blend, this.focus.target, 2.6, dt);
    const fb = ease(clamp(this.focus.blend, 0, 1));
    if (fb > 0.001 && this.chandelier.globes[this.focus.index]) {
      const g = this.chandelier.globeWorld(this.chandelier.globes[this.focus.index], _gw);
      const dir = _tmp.set(g.x, 0, g.z);
      if (dir.lengthSq() < 1e-4) dir.set(0, 0, 1);
      dir.normalize();
      // look from outside the chandelier, slightly from below, keeping to the viewer's side
      dir.lerp(_tmp2.set(0, 0, 1), 0.35).normalize();
      const fpos = _tmp2.copy(g).addScaledVector(dir, 0.44).add(_tmp3.set(0, -0.035, 0));
      _pos.lerp(fpos, fb);
      _tgt.lerp(g, fb);
      _off.multiplyScalar(1 - fb);
      if (this.width / this.height < 0.9) _off.y += 0.1 * fb;
      else _off.x += 0.15 * fb;
    }
    // orbit offsets around the target
    this.orbit.az = reduced ? this.orbit.azT : damp(this.orbit.az, this.orbit.azT, 6, dt);
    this.orbit.el = reduced ? this.orbit.elT : damp(this.orbit.el, this.orbit.elT, 6, dt);
    this.zoom = reduced ? this.zoomT : damp(this.zoom, this.zoomT, 6, dt);
    _rel.copy(_pos).sub(_tgt);
    _sph.setFromVector3(_rel);
    _sph.theta += this.orbit.az;
    _sph.phi = clamp(_sph.phi - this.orbit.el, 0.35, 2.6);
    _sph.radius *= this.zoom;
    _rel.setFromSpherical(_sph);
    const fp = _tmp.copy(_tgt).add(_rel);
    // never leave the room
    fp.y = clamp(fp.y, 0.4, 2.95);
    fp.x = clamp(fp.x, -3.3, 3.3);
    fp.z = clamp(fp.z, -2.9, 4.2);
    this.camPos.copy(fp);
    this.camTarget.copy(_tgt);
    this.camera.position.copy(this.camPos);
    this.camera.lookAt(this.camTarget);
    this.viewOffset.copy(_off);
    this.applyViewOffset();

    // exposure follows the light a little, like a camera would
    const lv = this.light.value;
    this.renderer.toneMappingExposure = 0.92 + (1 - lv) * 0.45;
    // light bouncing off walls and floor, approximated by a warm ambient that follows the dimmer
    this.room.hemi.intensity = 0.1 + 0.55 * lv * (this.chandelier.globes.length / 5);
    this.room.hemi.color.copy(_warm).lerp(this.chandelier.bulbColor, 0.5);
    this.scene.environmentIntensity = 0.4 + 0.25 * (1 - lv);
    this.bloom.strength = 0.1 + 0.32 * lv;
    this.grade.uniforms.uTime.value = time;
    this.composer.render(dt);
  }

  applyViewOffset() {
    const w = this.width, h = this.height;
    const ox = -this.viewOffset.x * w; // positive offset moves the subject right
    const oy = this.viewOffset.y * h; // positive offset moves the subject up
    if (Math.abs(ox) < 0.5 && Math.abs(oy) < 0.5) {
      if (this.camera.view?.enabled) this.camera.clearViewOffset();
      return;
    }
    this.camera.setViewOffset(w, h, ox, oy, w, h);
  }

  // drop resolution if the device struggles, raise it back when there's headroom
  adapt(dt) {
    if (this.photo) return;
    this.frameTimes.push(dt);
    if (this.frameTimes.length < 90) return;
    const avg = this.frameTimes.reduce((s, v) => s + v, 0) / this.frameTimes.length;
    this.frameTimes.length = 0;
    const minDpr = 0.85;
    if (avg > 1 / 40 && this.dpr > minDpr) {
      this.dpr = Math.max(minDpr, this.dpr - 0.25);
      this.capped = true; // once lowered, stay there rather than oscillate

    } else if (avg < 1 / 58 && !this.capped && this.dpr < Math.min(window.devicePixelRatio || 1, this.quality.dprMax)) {
      this.dpr = Math.min(this.dpr + 0.25, this.quality.dprMax);
    } else return;
    this.renderer.setPixelRatio(this.dpr);
    this.resize();
  }

  renderOnce() {
    this.tick(1 / 60, performance.now() / 1000);
  }
}

const _tmp = new THREE.Vector3();
const _tmp2 = new THREE.Vector3();
const _tmp3 = new THREE.Vector3();
const _pos = new THREE.Vector3();
const _tgt = new THREE.Vector3();
const _off = new THREE.Vector2();
const _rel = new THREE.Vector3();
const _gw = new THREE.Vector3();
const _sph = new THREE.Spherical();
const _zero2 = new THREE.Vector2();
const _warm = new THREE.Color('#6a5a52');
const _poseA = { pos: new THREE.Vector3(), target: new THREE.Vector3(), off: new THREE.Vector2() };
const _poseB = { pos: new THREE.Vector3(), target: new THREE.Vector3(), off: new THREE.Vector2() };
const _poseC = { pos: new THREE.Vector3(), target: new THREE.Vector3(), off: new THREE.Vector2() };
