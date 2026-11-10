// Plan view drawn from the same data as the model: walls, rooms, furniture footprints, the visitor's position.
export class Minimap {
  constructor(canvas, sceneData, { onPick, label }) {
    this.cv = canvas; this.data = sceneData; this.onPick = onPick; this.label = label;
    this.b = sceneData.bounds;
    this.pad = 1.2;
    this.base = document.createElement('canvas');
    this.room = null;
    canvas.addEventListener('click', (e) => {
      const r = canvas.getBoundingClientRect();
      const [x, z] = this.toWorld((e.clientX - r.left) * (canvas.width / r.width), (e.clientY - r.top) * (canvas.height / r.height));
      this.onPick?.(x, z);
    });
    this.resize();
  }

  colors() {
    const cs = getComputedStyle(document.documentElement);
    const g = (n) => cs.getPropertyValue(n).trim();
    return { paper: g('--map-paper'), wall: g('--map-wall'), room: g('--map-room'), prop: g('--map-prop'), ink: g('--ink-2'), accent: g('--accent'), here: g('--map-here') };
  }

  resize() {
    const cv = this.cv; const dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = cv.clientWidth || 240, h = cv.clientHeight || 150;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const bw = this.b[2] - this.b[0] + this.pad * 2, bh = this.b[3] - this.b[1] + this.pad * 2;
    this.s = Math.min(cv.width / bw, cv.height / bh);
    this.ox = (cv.width - bw * this.s) / 2 - (this.b[0] - this.pad) * this.s;
    this.oy = (cv.height - bh * this.s) / 2 - (this.b[1] - this.pad) * this.s;
    this.redraw();
  }

  toPx(x, z) { return [x * this.s + this.ox, z * this.s + this.oy]; }
  toWorld(px, py) { return [(px - this.ox) / this.s, (py - this.oy) / this.s]; }

  redraw() {
    const b = this.base; b.width = this.cv.width; b.height = this.cv.height;
    const c = b.getContext('2d'); const col = this.colors(); const s = this.s;
    c.clearRect(0, 0, b.width, b.height);
    const R = (q, pad = 0) => c.fillRect(q[0] * s + this.ox - pad, q[1] * s + this.oy - pad, (q[2] - q[0]) * s + pad * 2, (q[3] - q[1]) * s + pad * 2);
    c.fillStyle = col.room;
    for (const r of this.data.rooms) { if (r.closed) continue; for (const q of r.rects) R(q, 0.12 * s); }
    c.fillStyle = col.prop;
    for (const q of this.data.props) R(q);
    c.fillStyle = col.wall;
    for (const w of this.data.walls) R(w.r, 0.5);
    this.dirty = true;
  }

  draw(x, z, yaw, roomId) {
    const c = this.cv.getContext('2d'); const col = this.colors(); const s = this.s;
    c.clearRect(0, 0, this.cv.width, this.cv.height);
    if (roomId) {
      c.fillStyle = col.here;
      for (const r of this.data.rooms) if (r.id === roomId || r.parent === roomId) for (const q of r.rects) c.fillRect(q[0] * s + this.ox, q[1] * s + this.oy, (q[2] - q[0]) * s, (q[3] - q[1]) * s);
    }
    c.drawImage(this.base, 0, 0);
    const [px, py] = this.toPx(x, z);
    const dpr = this.cv.width / (this.cv.clientWidth || 1);
    // view cone
    c.save(); c.translate(px, py); c.rotate(-yaw);
    const g = c.createRadialGradient(0, 0, 0, 0, 0, 26 * dpr);
    g.addColorStop(0, col.accent + 'aa'); g.addColorStop(1, col.accent + '00');
    c.fillStyle = g; c.beginPath(); c.moveTo(0, 0); c.arc(0, 0, 26 * dpr, -Math.PI / 2 - 0.55, -Math.PI / 2 + 0.55); c.closePath(); c.fill();
    c.fillStyle = col.accent; c.strokeStyle = col.paper; c.lineWidth = 1.5 * dpr;
    c.beginPath(); c.arc(0, 0, 4.2 * dpr, 0, Math.PI * 2); c.fill(); c.stroke();
    c.restore();
  }
}
