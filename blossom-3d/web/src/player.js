// First-person walking: keyboard, drag-to-look, optional pointer lock, touch joystick, tap/click-to-walk.
// Collision is 2D: a circle against the axis-aligned rectangles of walls, sills, locked doors and furniture.
import * as THREE from 'three';

const R = 0.24;            // body radius
const EYE = 1.62;
const CELL = 1.0;

export class Collider {
  constructor(sceneData) {
    this.rects = [];
    for (const w of sceneData.walls) this.rects.push(w.r);
    for (const b of sceneData.blockers) this.rects.push(b);
    for (const p of sceneData.props) this.rects.push(p);
    this.grid = new Map();
    this.rects.forEach((r, i) => {
      for (let gx = Math.floor((r[0] - R) / CELL); gx <= Math.floor((r[2] + R) / CELL); gx++)
        for (let gz = Math.floor((r[1] - R) / CELL); gz <= Math.floor((r[3] + R) / CELL); gz++) {
          const k = gx + ',' + gz; let a = this.grid.get(k); if (!a) this.grid.set(k, a = []); a.push(i);
        }
    });
    this.bounds = sceneData.bounds;
    this.limit = sceneData.limit || [this.bounds[0] - 9, this.bounds[1] - 9, this.bounds[2] + 4, this.bounds[3] + 9];
  }

  near(x, z) { return this.grid.get(Math.floor(x / CELL) + ',' + Math.floor(z / CELL)) || []; }

  // push a circle out of everything it overlaps; returns [x, z, touched]
  resolve(x, z, r = R) {
    let hit = false;
    for (let it = 0; it < 4; it++) {
      let moved = false;
      for (const i of this.near(x, z)) {
        const q = this.rects[i];
        const cx = Math.max(q[0], Math.min(x, q[2])), cz = Math.max(q[1], Math.min(z, q[3]));
        let dx = x - cx, dz = z - cz; const d2 = dx * dx + dz * dz;
        if (d2 >= r * r) continue;
        hit = true; moved = true;
        if (d2 > 1e-10) { const d = Math.sqrt(d2), k = (r - d) / d; x += dx * k; z += dz * k; } else {
          // centre is inside the rectangle: leave through the nearest side
          const l = x - q[0], rr = q[2] - x, t = z - q[1], b = q[3] - z, m = Math.min(l, rr, t, b);
          if (m === l) x = q[0] - r; else if (m === rr) x = q[2] + r; else if (m === t) z = q[1] - r; else z = q[3] + r;
        }
      }
      if (!moved) break;
    }
    const L = this.limit;
    x = Math.max(L[0], Math.min(L[2], x)); z = Math.max(L[1], Math.min(L[3], z));
    return [x, z, hit];
  }

  free(x, z, r = R) {
    for (const i of this.near(x, z)) {
      const q = this.rects[i];
      const cx = Math.max(q[0], Math.min(x, q[2])), cz = Math.max(q[1], Math.min(z, q[3]));
      if ((x - cx) ** 2 + (z - cz) ** 2 < r * r) return false;
    }
    return true;
  }

  // nearest free spot around (x, z)
  snapFree(x, z) {
    if (this.free(x, z)) return [x, z];
    for (let rad = 0.15; rad < 3; rad += 0.15)
      for (let a = 0; a < 16; a++) {
        const px = x + Math.cos(a * Math.PI / 8) * rad, pz = z + Math.sin(a * Math.PI / 8) * rad;
        if (this.free(px, pz)) return [px, pz];
      }
    return [x, z];
  }
}

export class Player {
  constructor(camera, dom, collider, sceneData) {
    this.camera = camera; this.dom = dom; this.col = collider;
    this.pos = new THREE.Vector2(0, 0);      // x, z
    this.yaw = 0; this.pitch = 0;
    this.vel = new THREE.Vector2();
    this.eye = EYE; this.eyeOffset = 0;
    this.keys = new Set();
    this.enabled = true;
    this.speed = 1.5;
    this.goal = null;              // click-to-walk target
    this.joy = { id: -1, ox: 0, oy: 0, x: 0, y: 0 };
    this.look = { id: -1, x: 0, y: 0, moved: 0, t: 0, sx: 0, sy: 0 };
    this.stepovers = sceneData.stepovers || [];
    this.onUserInput = () => {};
    this.onTap = null;             // (clientX, clientY) => bool  — return true if handled (overview mode)
    this.locked = false;
    this._bind();
  }

  set(x, z, yawDeg, pitchDeg = 0) {
    [x, z] = this.col.snapFree(x, z);
    this.pos.set(x, z); this.yaw = THREE.MathUtils.degToRad(yawDeg); this.pitch = THREE.MathUtils.degToRad(pitchDeg);
    this.vel.set(0, 0); this.goal = null;
    this.apply();
  }

  _bind() {
    const d = this.dom;
    addEventListener('keydown', (e) => {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (['w', 'a', 's', 'd', 'q', 'e', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Shift'].includes(k)) {
        this.keys.add(k); this.goal = null; this.onUserInput(); if (k.startsWith('Arrow')) e.preventDefault();
      }
    });
    addEventListener('keyup', (e) => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; this.keys.delete(k); });
    addEventListener('blur', () => this.keys.clear());

    d.addEventListener('pointerdown', (e) => {
      if (!this.enabled) return;
      d.setPointerCapture?.(e.pointerId);
      const touch = e.pointerType === 'touch';
      const rect = d.getBoundingClientRect();
      if (touch && this.joy.id < 0 && (e.clientX - rect.left) < rect.width * 0.42 && (e.clientY - rect.top) > rect.height * 0.45) {
        this.joy = { id: e.pointerId, ox: e.clientX, oy: e.clientY, x: 0, y: 0 };
        this.onJoy?.(this.joy, true); this.goal = null; this.onUserInput();
      } else if (this.look.id < 0) {
        this.look = { id: e.pointerId, x: e.clientX, y: e.clientY, moved: 0, t: performance.now(), sx: e.clientX, sy: e.clientY };
      }
    });
    d.addEventListener('pointermove', (e) => {
      if (!this.enabled) return;
      if (this.locked) { this._turn(-e.movementX, -e.movementY, 0.0022); this.onUserInput(); return; }
      if (e.pointerId === this.joy.id) {
        const m = 56; let x = (e.clientX - this.joy.ox) / m, y = (e.clientY - this.joy.oy) / m;
        const l = Math.hypot(x, y); if (l > 1) { x /= l; y /= l; }
        this.joy.x = x; this.joy.y = y; this.onJoy?.(this.joy, true);
      } else if (e.pointerId === this.look.id) {
        const dx = e.clientX - this.look.x, dy = e.clientY - this.look.y;
        this.look.x = e.clientX; this.look.y = e.clientY; this.look.moved += Math.abs(dx) + Math.abs(dy);
        if (this.look.moved > 6) { this._turn(dx, dy, e.pointerType === 'touch' ? 0.0048 : 0.0034); this.onUserInput(); }
      }
    });
    const up = (e) => {
      if (e.pointerId === this.joy.id) { this.joy = { id: -1, ox: 0, oy: 0, x: 0, y: 0 }; this.onJoy?.(this.joy, false); }
      if (e.pointerId === this.look.id) {
        const tap = this.look.moved <= 6 && performance.now() - this.look.t < 450;
        this.look.id = -1;
        if (tap && e.type === 'pointerup' && this.enabled) this._tap(e.clientX, e.clientY);
      }
    };
    d.addEventListener('pointerup', up); d.addEventListener('pointercancel', up);
    d.addEventListener('contextmenu', (e) => e.preventDefault());
    document.addEventListener('pointerlockchange', () => { this.locked = document.pointerLockElement === d; this.onLock?.(this.locked); });
    d.addEventListener('wheel', (e) => { if (this.onWheel) { this.onWheel(e); e.preventDefault(); } }, { passive: false });
  }

  requestLock() { try { const p = this.dom.requestPointerLock?.(); p?.catch?.(() => {}); } catch { /* optional */ } }

  _turn(dx, dy, k) {
    this.yaw += dx * k; this.pitch += dy * k;
    this.pitch = Math.max(-1.35, Math.min(1.35, this.pitch));
  }

  _tap(cx, cy) {
    if (this.onTap && this.onTap(cx, cy)) return;
    const rect = this.dom.getBoundingClientRect();
    const ndc = new THREE.Vector2(((cx - rect.left) / rect.width) * 2 - 1, -((cy - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, this.camera);
    const o = ray.ray.origin, dir = ray.ray.direction;
    if (dir.y > -0.02) return;
    const t = -o.y / dir.y; if (t > 40) return;
    const [gx, gz] = this.col.snapFree(o.x + dir.x * t, o.z + dir.z * t);
    this.goal = new THREE.Vector2(gx, gz); this.goalT = 0;
    this.onGoal?.(this.goal); this.onUserInput();
  }

  update(dt) {
    if (!this.enabled) return;
    const k = this.keys;
    let f = 0, s = 0;
    if (k.has('w') || k.has('ArrowUp')) f += 1;
    if (k.has('s') || k.has('ArrowDown')) f -= 1;
    if (k.has('d')) s += 1;
    if (k.has('a')) s -= 1;
    if (k.has('ArrowLeft') || k.has('q')) this.yaw += 1.9 * dt;
    if (k.has('ArrowRight') || k.has('e')) this.yaw -= 1.9 * dt;
    f -= this.joy.y; s += this.joy.x;
    let wish = new THREE.Vector2();
    const sin = Math.sin(this.yaw), cos = Math.cos(this.yaw);
    if (f || s) {
      // forward = (-sin, -cos) in (x, z); right = (cos, -sin)
      wish.set(-sin * f + cos * s, -cos * f - sin * s);
      const l = wish.length(); if (l > 1) wish.divideScalar(l);
      wish.multiplyScalar(this.speed * (k.has('Shift') ? 2.1 : 1));
      this.goal = null;
    } else if (this.goal) {
      const to = this.goal.clone().sub(this.pos); const dist = to.length();
      this.goalT += dt;
      if (dist < 0.12 || this.goalT > 30) { this.goal = null; this.onGoal?.(null); } else wish.copy(to.multiplyScalar(Math.min(this.speed * 1.25, dist * 3 + 0.4) / dist));
    }
    const a = 1 - Math.exp(-dt * 12);
    this.vel.lerp(wish, a);
    let steps = Math.max(1, Math.ceil(this.vel.length() * dt / 0.1));
    let stuck = false;
    for (let i = 0; i < steps; i++) {
      const nx = this.pos.x + this.vel.x * dt / steps, nz = this.pos.y + this.vel.y * dt / steps;
      const [rx, rz, hit] = this.col.resolve(nx, nz);
      if (hit && this.goal && Math.hypot(rx - this.pos.x, rz - this.pos.y) < this.vel.length() * dt / steps * 0.25) stuck = true;
      this.pos.set(rx, rz);
    }
    if (stuck) { this._stuck = (this._stuck || 0) + dt; if (this._stuck > 0.5) { this.goal = null; this.onGoal?.(null); this._stuck = 0; } } else this._stuck = 0;
    // stepping over the hygiene bench between changing room and transition room
    let off = 0;
    for (const q of this.stepovers) {
      const dx = Math.max(q[0] - this.pos.x, 0, this.pos.x - q[2]), dz = Math.max(q[1] - this.pos.y, 0, this.pos.y - q[3]);
      const dd = Math.hypot(dx, dz); if (dd < 0.45) off = Math.max(off, 0.22 * (1 - dd / 0.45));
    }
    this.eyeOffset += (off - this.eyeOffset) * (1 - Math.exp(-dt * 8));
    // gentle head bob
    const sp = this.vel.length();
    this.bobT = (this.bobT || 0) + sp * dt * 3.2;
    this.bob = Math.sin(this.bobT * 2) * 0.012 * Math.min(1, sp / 1.2);
    this.apply();
  }

  apply() {
    this.camera.position.set(this.pos.x, this.eye + this.eyeOffset + (this.bob || 0), this.pos.y);
    this.camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
  }
}
