// The cork coaster with the logo burnt into it. Drag (or flick) to spin it around its vertical axis; it
// coasts, slows down and settles facing front. ← → give it a turn. Renders only while it moves.
import * as THREE from "three";

export type Coaster = {
  resize: (size: number) => void;
  flick: (velocity: number) => void;
  dispose: () => void;
};

/** A cork texture: a warm base and a few thousand grains, lighter and darker. */
function corkCanvas(size = 512) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  g.fillStyle = "#c48f58";
  g.fillRect(0, 0, size, size);
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const shades = ["#a8743f", "#d9a76f", "#8a5a32", "#e6bb86", "#b07c45"];
  for (let i = 0; i < 5200; i++) {
    g.fillStyle = shades[Math.floor(rnd() * shades.length)];
    g.globalAlpha = 0.35 + rnd() * 0.5;
    g.beginPath();
    g.ellipse(rnd() * size, rnd() * size, 0.6 + rnd() * 3.2, 0.5 + rnd() * 2.2, rnd() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  g.globalAlpha = 1;
  return c;
}

function faceTexture(logo: HTMLImageElement | null, text: string | null) {
  const size = 1024;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const g = c.getContext("2d")!;
  g.drawImage(corkCanvas(512), 0, 0, size, size);
  // a pressed ring near the edge
  g.strokeStyle = "rgba(74, 42, 18, 0.55)";
  g.lineWidth = 10;
  g.beginPath();
  g.arc(size / 2, size / 2, size * 0.44, 0, Math.PI * 2);
  g.stroke();
  if (logo) {
    // the bird, burnt in: drawn as a dark brown silhouette
    const ink = document.createElement("canvas");
    ink.width = ink.height = size;
    const k = ink.getContext("2d")!;
    const w = size * 0.6;
    const h = (w * logo.naturalHeight) / logo.naturalWidth;
    k.drawImage(logo, (size - w) / 2, (size - h) / 2 - size * 0.02, w, h);
    k.globalCompositeOperation = "source-in";
    k.fillStyle = "#4a2a12";
    k.fillRect(0, 0, size, size);
    g.globalAlpha = 0.88;
    g.drawImage(ink, 0, 0);
    g.globalAlpha = 1;
  }
  if (text) {
    g.fillStyle = "rgba(74, 42, 18, 0.8)";
    g.font = `700 ${size * 0.13}px "Barlow Condensed", "Arial Narrow", sans-serif`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(text, size / 2, size / 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

export function createCoaster(canvas: HTMLCanvasElement, logoUrl: string, onSettle?: () => void): Coaster {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, 0, 7.2);

  const side = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(corkCanvas(256)), roughness: 0.92 });
  (side.map as THREE.Texture).colorSpace = THREE.SRGBColorSpace;
  (side.map as THREE.Texture).wrapS = THREE.RepeatWrapping;
  (side.map as THREE.Texture).repeat.set(6, 1);
  const front = new THREE.MeshStandardMaterial({ map: faceTexture(null, null), roughness: 0.88 });
  const back = new THREE.MeshStandardMaterial({ map: faceTexture(null, "PICA PAU"), roughness: 0.88 });
  const geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.17, 96, 1);
  const disc = new THREE.Mesh(geometry, [side, front, back]);
  disc.rotation.x = Math.PI / 2; // the top cap faces the camera
  const pivot = new THREE.Group();
  pivot.add(disc);
  scene.add(pivot);

  scene.add(new THREE.HemisphereLight(0xfff1dc, 0x5a1626, 1.4));
  const key = new THREE.DirectionalLight(0xffe2b8, 2.2);
  key.position.set(-3, 4, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xf2b84b, 1.2);
  rim.position.set(4, -2, -3);
  scene.add(rim);

  const logo = new Image();
  logo.crossOrigin = "anonymous";
  logo.onload = () => {
    front.map?.dispose();
    front.map = faceTexture(logo, null);
    front.needsUpdate = true;
    render();
  };
  logo.src = logoUrl;

  let angle = 0;
  let velocity = 0;
  let tilt = 0;
  let tiltTarget = 0;
  let dragging = false;
  let lastX = 0;
  let lastT = 0;
  let raf = 0;
  const TAU = Math.PI * 2;

  const render = () => renderer.render(scene, camera);
  const step = () => {
    raf = 0;
    if (!dragging) {
      if (Math.abs(velocity) > 0.004) {
        angle += velocity;
        velocity *= 0.965;
      } else {
        // settle facing front: spring to the nearest whole turn
        const target = Math.round(angle / TAU) * TAU;
        const diff = target - angle;
        velocity = 0;
        angle += diff * 0.12;
        if (Math.abs(diff) < 0.0008) {
          angle = target;
          onSettle?.();
        }
      }
    }
    tilt += (tiltTarget - tilt) * 0.12;
    pivot.rotation.y = angle;
    pivot.rotation.x = tilt;
    render();
    const moving = dragging || Math.abs(velocity) > 0.004 || Math.abs(Math.round(angle / TAU) * TAU - angle) > 0.0008 || Math.abs(tiltTarget - tilt) > 0.001;
    if (moving) raf = requestAnimationFrame(step);
  };
  const kick = () => {
    if (!raf) raf = requestAnimationFrame(step);
  };

  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastT = performance.now();
    velocity = 0;
    canvas.setPointerCapture(e.pointerId);
    kick();
  };
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    tiltTarget = ((e.clientY - r.top) / r.height - 0.5) * 0.35;
    if (dragging) {
      const now = performance.now();
      const dx = e.clientX - lastX;
      angle += dx * 0.012;
      velocity = (dx * 0.012 * 16) / Math.max(8, now - lastT);
      lastX = e.clientX;
      lastT = now;
    }
    kick();
  };
  const onUp = () => {
    dragging = false;
    velocity = Math.max(-0.6, Math.min(0.6, velocity));
    kick();
  };
  const onLeave = () => {
    tiltTarget = 0;
    kick();
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);
  canvas.addEventListener("pointerleave", onLeave);

  return {
    resize(size) {
      renderer.setSize(size, size, false);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      render();
    },
    flick(v) {
      velocity += v;
      kick();
    },
    dispose() {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      [side, front, back].forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      geometry.dispose();
      renderer.dispose();
    },
  };
}
