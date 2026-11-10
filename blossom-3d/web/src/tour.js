// Guided visit: the camera follows a smooth path through the rooms at walking pace.
import * as THREE from 'three';

export class Tour {
  constructor(player, sceneData) {
    this.player = player; this.stops = sceneData.tour || [];
    this.active = false; this.onStop = () => {}; this.onCaption = () => {};
    const pts = this.stops.map((s) => new THREE.Vector3(s.p[0], 0, s.p[1]));
    this.curve = pts.length > 1 ? new THREE.CatmullRomCurve3(pts, false, 'centripetal', 0.5) : null;
    this.len = this.curve ? this.curve.getLength() : 0;
    // arc length at every stop, for pauses and captions
    this.at = [];
    if (this.curve) {
      const N = 2000; const L = this.curve.getLengths(N);
      let k = 0;
      for (const p of pts) {
        let best = 0, bd = 1e9;
        for (let i = k; i <= N; i++) { const q = this.curve.getPoint(i / N); const d = q.distanceToSquared(p); if (d < bd) { bd = d; best = i; } if (d > bd + 4 && i > k + 20) break; }
        k = best; this.at.push(L[best]);
      }
    }
  }

  start(fromStart = true) {
    if (!this.curve) return;
    this.active = true; this.s = fromStart ? 0 : this.s || 0; this.pause = 0; this.idx = -1; this.yaw = this.player.yaw;
    this.player.goal = null;
  }

  stop() { if (this.active) { this.active = false; this.onStop(); } }

  update(dt) {
    if (!this.active) return;
    const p = this.player;
    if (this.pause > 0) { this.pause -= dt; }
    else this.s += dt * 1.25;
    if (this.s >= this.len) { this.s = this.len; this.stop(); }
    const u = Math.min(1, this.s / this.len);
    const pos = this.curve.getPointAt(u);
    const ahead = this.curve.getPointAt(Math.min(1, (this.s + 1.4) / this.len));
    // next stop reached?
    while (this.idx + 1 < this.at.length && this.s >= this.at[this.idx + 1] - 0.05) {
      this.idx++; const st = this.stops[this.idx];
      if (st.pause) this.pause = st.pause;
      if (st.room) this.onCaption(st);
    }
    let target = Math.atan2(-(ahead.x - pos.x), -(ahead.z - pos.z));
    const st = this.stops[Math.max(0, this.idx)];
    if (this.pause > 0 && st && st.look) target = Math.atan2(-(st.look[0] - pos.x), -(st.look[1] - pos.z));
    let d = target - this.yaw; d = Math.atan2(Math.sin(d), Math.cos(d));
    this.yaw += d * (1 - Math.exp(-dt * (this.pause > 0 ? 1.6 : 2.4)));
    p.pos.set(pos.x, pos.z); p.yaw = this.yaw; p.pitch += (-0.04 - p.pitch) * (1 - Math.exp(-dt * 2));
    p.vel.set(0, 0); p.bob = 0; p.apply();
  }
}
