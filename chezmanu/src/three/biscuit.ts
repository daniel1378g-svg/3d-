// The story's logo biscuit: a round butter biscuit with a scalloped edge and the Chez Manu logo printed on top.
// Drag (or flick) to spin it; it settles facing front. Rendered on demand: the loop runs only while the biscuit
// moves, and never off-screen or in a hidden tab. Device pixel ratio capped at 1.5.
import {
  ACESFilmicToneMapping, CanvasTexture, Color, DirectionalLight, ExtrudeGeometry, Group, HemisphereLight, MathUtils, Mesh,
  MeshStandardMaterial, PerspectiveCamera, Scene, Shape, SRGBColorSpace, WebGLRenderer,
} from "three";

const R = 1;
const SCALLOPS = 22;

function biscuitShape() {
  const s = new Shape();
  const steps = SCALLOPS * 16;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = R * (1 - 0.035 * (1 - Math.abs(Math.cos((a * SCALLOPS) / 2))) * 1.6);
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  return s;
}

/** Biscuit colour and bump: baked butter tones, darker rim, docking holes; the logo printed on the face. */
function faceTextures(logo: HTMLImageElement | null, back: boolean) {
  const N = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = N;
  const g = c.getContext("2d")!;
  const b = document.createElement("canvas");
  b.width = b.height = N;
  const h = b.getContext("2d")!;
  // Base: golden butter, browner towards the rim.
  const grad = g.createRadialGradient(N / 2, N / 2, N * 0.05, N / 2, N / 2, N * 0.52);
  grad.addColorStop(0, "#f2cf86");
  grad.addColorStop(0.62, "#e9b864");
  grad.addColorStop(0.86, "#c98a3a");
  grad.addColorStop(1, "#9a5a24");
  g.fillStyle = grad;
  g.fillRect(0, 0, N, N);
  h.fillStyle = "#808080";
  h.fillRect(0, 0, N, N);
  // Baked speckle.
  let seed = back ? 41 : 7;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < 2600; i++) {
    const x = rnd() * N, y = rnd() * N, r = 1 + rnd() * 3.5;
    g.fillStyle = rnd() < 0.5 ? "rgba(150,85,30,0.18)" : "rgba(255,240,200,0.2)";
    g.beginPath();
    g.arc(x, y, r, 0, Math.PI * 2);
    g.fill();
    h.fillStyle = rnd() < 0.5 ? "rgba(0,0,0,0.25)" : "rgba(255,255,255,0.25)";
    h.beginPath();
    h.arc(x, y, r, 0, Math.PI * 2);
    h.fill();
  }
  // A ring of docking holes near the edge.
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2;
    const x = N / 2 + Math.cos(a) * N * 0.4, y = N / 2 + Math.sin(a) * N * 0.4;
    g.fillStyle = "rgba(120,60,20,0.55)";
    g.beginPath();
    g.arc(x, y, 7, 0, Math.PI * 2);
    g.fill();
    h.fillStyle = "#202020";
    h.beginPath();
    h.arc(x, y, 8, 0, Math.PI * 2);
    h.fill();
  }
  if (logo && !back) {
    const w = N * 0.7, ht = (w * logo.height) / logo.width;
    g.save();
    g.globalCompositeOperation = "multiply";
    g.globalAlpha = 0.95;
    g.drawImage(logo, (N - w) / 2, (N - ht) / 2 + N * 0.02, w, ht);
    g.restore();
    // The print sits a hair proud of the dough.
    h.save();
    h.globalAlpha = 0.35;
    h.filter = "grayscale(1) invert(1) brightness(0.9)";
    h.globalCompositeOperation = "lighter";
    h.drawImage(logo, (N - w) / 2, (N - ht) / 2 + N * 0.02, w, ht);
    h.restore();
  }
  const map = new CanvasTexture(c);
  map.colorSpace = SRGBColorSpace;
  map.anisotropy = 4;
  const bump = new CanvasTexture(b);
  // ExtrudeGeometry gives the caps UVs in shape units (−R…R); stretch them onto the texture.
  for (const t of [map, bump]) {
    t.repeat.set(1 / (2 * R * 1.02), 1 / (2 * R * 1.02));
    t.offset.set(0.5, 0.5);
    if (back) t.repeat.x *= -1;
  }
  return { map, bump };
}

export type BiscuitHandle = { stop: () => void; nudge: (radians: number) => void; spin: () => void };

export function mountBiscuit(host: HTMLElement, canvas: HTMLCanvasElement, logoUrl: string, onReady: () => void): BiscuitHandle {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 20);
  camera.position.set(0, 0, 4.9);

  scene.add(new HemisphereLight(new Color("#fff4dc"), new Color("#8a5a2c"), 1.4));
  const key = new DirectionalLight(new Color("#fff1d6"), 2.4);
  key.position.set(-2.2, 2.6, 3.2);
  scene.add(key);
  const rim = new DirectionalLight(new Color("#f2c14e"), 1.2);
  rim.position.set(2.5, -1.5, -2);
  scene.add(rim);

  const geo = new ExtrudeGeometry(biscuitShape(), { depth: 0.2, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.06, bevelSegments: 5, curveSegments: 4 });
  geo.center();
  const side = new MeshStandardMaterial({ color: new Color("#c98a3a"), roughness: 0.85 });
  const biscuit = new Group();
  const mesh = new Mesh(geo, [side, side]);
  biscuit.add(mesh);
  scene.add(biscuit);
  biscuit.rotation.x = -0.12;

  const disposables: { dispose: () => void }[] = [geo, side, renderer];
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    const front = faceTextures(img, false);
    const back = faceTextures(null, true);
    const frontMat = new MeshStandardMaterial({ map: front.map, bumpMap: front.bump, bumpScale: 2.5, roughness: 0.78 });
    const backMat = new MeshStandardMaterial({ map: back.map, bumpMap: back.bump, bumpScale: 2.5, roughness: 0.82 });
    // Group 0 holds both caps; split them by their normal into front (+z) and back (−z).
    const idx = geo.index;
    const pos = geo.attributes.position;
    const nor = geo.attributes.normal;
    geo.clearGroups();
    const count = idx ? idx.count : pos.count;
    const faceOf = (i: number) => (idx ? idx.getX(i) : i);
    let runStart = 0;
    let runMat = -1;
    for (let i = 0; i < count; i += 3) {
      const v = faceOf(i);
      const nz = nor.getZ(v);
      const z = pos.getZ(v);
      const m = Math.abs(nz) > 0.9 ? (z > 0 ? 1 : 2) : 0;
      if (m !== runMat) {
        if (runMat >= 0) geo.addGroup(runStart, i - runStart, runMat);
        runStart = i;
        runMat = m;
      }
    }
    geo.addGroup(runStart, count - runStart, runMat);
    mesh.material = [side, frontMat, backMat];
    disposables.push(frontMat, backMat, front.map, front.bump, back.map, back.bump);
    kick();
    requestAnimationFrame(() => {
      render();
      onReady();
    });
  };
  img.src = logoUrl;

  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / Math.max(h, 1);
    camera.updateProjectionMatrix();
    render();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  // Spin physics: angle and angular velocity around Y; a spring pulls back to the nearest front face.
  let angle = 0, vel = 0, tiltX = 0, tiltVel = 0;
  let dragging = false, lastX = 0, lastY = 0, lastT = 0;
  let raf = 0, visible = true, prev = performance.now(), idle = 0;
  const render = () => renderer.render(scene, camera);
  const kick = () => {
    if (!raf && visible && !document.hidden) {
      prev = performance.now();
      raf = requestAnimationFrame(loop);
    }
  };
  function loop(now: number) {
    raf = 0;
    const dt = Math.min((now - prev) / 1000, 0.05);
    prev = now;
    if (!dragging) {
      const target = Math.round(angle / (Math.PI * 2)) * Math.PI * 2;
      const spring = Math.abs(vel) < 2.2 ? 14 : 0; // let a flick spin freely, then settle
      vel += (target - angle) * spring * dt;
      vel *= Math.exp(-(Math.abs(vel) > 2.2 ? 0.9 : 5.5) * dt);
      angle += vel * dt;
      tiltVel += (-0.12 - tiltX) * 30 * dt;
      tiltVel *= Math.exp(-8 * dt);
      tiltX += tiltVel * dt;
    }
    idle += dt;
    biscuit.rotation.y = angle;
    biscuit.rotation.x = tiltX;
    biscuit.position.y = Math.sin(idle * 1.4) * 0.03;
    render();
    const settled = !dragging && Math.abs(vel) < 0.002 && Math.abs(angle - Math.round(angle / (Math.PI * 2)) * Math.PI * 2) < 0.001 && Math.abs(tiltVel) < 0.001;
    if (!settled && visible && !document.hidden) raf = requestAnimationFrame(loop);
  }
  tiltX = -0.12;

  const down = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = performance.now();
    vel = 0;
    host.setPointerCapture(e.pointerId);
    kick();
  };
  const move = (e: PointerEvent) => {
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastX, dy = e.clientY - lastY;
    const dtm = Math.max((now - lastT) / 1000, 0.001);
    const da = (dx / host.clientWidth) * Math.PI * 1.6;
    angle += da;
    vel = MathUtils.lerp(vel, da / dtm, 0.5);
    tiltX = MathUtils.clamp(tiltX + (dy / host.clientHeight) * 1.2, -0.7, 0.5);
    lastX = e.clientX;
    lastY = e.clientY;
    lastT = now;
  };
  const up = (e: PointerEvent) => {
    dragging = false;
    if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId);
    kick();
  };
  host.addEventListener("pointerdown", down);
  host.addEventListener("pointermove", move);
  host.addEventListener("pointerup", up);
  host.addEventListener("pointercancel", up);

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) kick();
  });
  io.observe(host);
  const onVis = () => !document.hidden && kick();
  document.addEventListener("visibilitychange", onVis);

  return {
    stop() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      host.removeEventListener("pointerdown", down);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerup", up);
      host.removeEventListener("pointercancel", up);
      disposables.forEach((d) => d.dispose());
    },
    nudge(radians) {
      vel += radians * 6;
      kick();
    },
    spin() {
      vel += Math.PI * 2 * 3.2;
      kick();
    },
  };
}
