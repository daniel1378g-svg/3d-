// The cork coaster with the logo printed on both faces. Drag (or ← →) to spin it: a flick spins it fast,
// then it slows down and settles facing front. It renders only while on screen and while it moves.
import * as THREE from "three";

type Options = { still: boolean; logo: string; onFirstFrame: () => void };

function softwareGl(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  return /swiftshader|llvmpipe|software|basic render/i.test(name);
}

/** Cork granules, drawn once on a canvas. */
function corkCanvas(w: number, h: number, seed = 7) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  g.fillStyle = "#b8895a";
  g.fillRect(0, 0, w, h);
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const n = (w * h) / 60;
  for (let i = 0; i < n; i++) {
    const x = rnd() * w;
    const y = rnd() * h;
    const r = 0.6 + rnd() * 2.8;
    const v = rnd();
    g.fillStyle = v < 0.45 ? `rgba(94,59,31,${0.25 + rnd() * 0.45})` : v < 0.8 ? `rgba(214,170,120,${0.2 + rnd() * 0.4})` : `rgba(60,36,18,${0.3 + rnd() * 0.5})`;
    g.beginPath();
    g.ellipse(x, y, r, r * (0.6 + rnd() * 0.8), rnd() * Math.PI, 0, Math.PI * 2);
    g.fill();
  }
  return c;
}

export function createCork(canvas: HTMLCanvasElement, options: Options) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  const forced = /gl=1/.test(location.search + location.hash);
  const still = options.still || (!forced && softwareGl(renderer.getContext()));
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
  camera.position.set(0, 0.35, 7.6);
  camera.lookAt(0, 0, 0);

  const R = 1.6;
  const H = 0.26;
  // the faces: cork with the logo printed on it (multiply, like ink on cork)
  const faceCanvas = corkCanvas(1024, 1024, 11);
  const faceTex = new THREE.CanvasTexture(faceCanvas);
  faceTex.colorSpace = THREE.SRGBColorSpace;
  faceTex.anisotropy = 4;
  const img = new Image();
  img.onload = () => {
    const g = faceCanvas.getContext("2d")!;
    g.save();
    g.strokeStyle = "rgba(27,27,27,0.55)";
    g.lineWidth = 10;
    g.beginPath();
    g.arc(512, 512, 455, 0, Math.PI * 2);
    g.stroke();
    g.globalCompositeOperation = "multiply";
    const s = 700 / Math.max(img.width, img.height);
    g.drawImage(img, 512 - (img.width * s) / 2, 512 - (img.height * s) / 2, img.width * s, img.height * s);
    g.restore();
    faceTex.needsUpdate = true;
    draw();
  };
  img.src = options.logo;
  const rimTex = new THREE.CanvasTexture(corkCanvas(1024, 64, 3));
  rimTex.colorSpace = THREE.SRGBColorSpace;
  rimTex.wrapS = THREE.RepeatWrapping;

  const face = new THREE.MeshStandardMaterial({ map: faceTex, roughness: 0.92, metalness: 0 });
  const rim = new THREE.MeshStandardMaterial({ map: rimTex, roughness: 0.95, metalness: 0 });
  const coaster = new THREE.Group();
  const rimGeo = new THREE.CylinderGeometry(R, R, H, 96, 1, true);
  const rimMesh = new THREE.Mesh(rimGeo, rim);
  rimMesh.rotation.x = Math.PI / 2;
  coaster.add(rimMesh);
  const faceGeo = new THREE.CircleGeometry(R, 96);
  for (const side of [1, -1]) {
    const f = new THREE.Mesh(faceGeo, face);
    f.position.z = (side * H) / 2;
    if (side < 0) f.rotation.y = Math.PI;
    coaster.add(f);
  }
  coaster.rotation.x = -0.08;
  scene.add(coaster);
  scene.add(new THREE.HemisphereLight(0xfff4e6, 0x1a2a3a, 1.5));
  const key = new THREE.DirectionalLight(0xffe7c2, 2.4);
  key.position.set(3, 4, 6);
  scene.add(key);
  const rimLight = new THREE.PointLight(0xf2c05a, 10, 14, 1.6);
  rimLight.position.set(-3.5, -1, 2);
  scene.add(rimLight);

  let angle = -0.6;
  let velocity = still ? 0 : 2.2;
  let tilt = 0;
  let tiltTarget = 0;
  let dragging = false;
  let lastX = 0;
  let lastT = 0;
  let first = true;

  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(1, height);
    camera.updateProjectionMatrix();
    draw();
  };
  function draw() {
    coaster.rotation.y = angle;
    coaster.rotation.z = tilt;
    renderer.render(scene, camera);
    if (first) {
      first = false;
      options.onFirstFrame();
    }
  }

  const timer = new THREE.Timer();
  timer.connect(document);
  let settled = false;
  function frame() {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    if (!dragging) {
      velocity *= Math.exp(-dt * 1.4); // friction
      if (Math.abs(velocity) < 1.2) {
        // settle facing front: spring to the nearest face (front or back, both carry the logo)
        const target = Math.round(angle / Math.PI) * Math.PI;
        velocity += (target - angle) * dt * 26;
        velocity *= Math.exp(-dt * 5);
      }
      angle += velocity * dt;
    }
    tilt += (tiltTarget - tilt) * Math.min(1, dt * 6);
    draw();
    settled = !dragging && Math.abs(velocity) < 0.002 && Math.abs(angle - Math.round(angle / Math.PI) * Math.PI) < 0.001 && Math.abs(tilt - tiltTarget) < 0.001;
    if (settled) sync();
  }

  let running = false;
  let onScreen = false;
  const sync = () => {
    const should = onScreen && document.visibilityState === "visible" && !settled;
    if (should !== running) {
      running = should;
      renderer.setAnimationLoop(should ? frame : null);
    }
  };
  const wake = () => {
    settled = false;
    sync();
  };
  const io = new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
    sync();
  });
  io.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  document.addEventListener("visibilitychange", sync);

  const onDown = (e: PointerEvent) => {
    dragging = true;
    canvas.setPointerCapture(e.pointerId);
    lastX = e.clientX;
    lastT = performance.now();
    velocity = 0;
    wake();
  };
  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (e.pointerType === "mouse") {
      tiltTarget = ((e.clientX - rect.left) / rect.width - 0.5) * -0.12;
      wake();
    }
    if (!dragging) return;
    const now = performance.now();
    const d = ((e.clientX - lastX) / rect.width) * Math.PI * 1.8;
    angle += d;
    velocity = d / Math.max(0.008, (now - lastT) / 1000);
    lastX = e.clientX;
    lastT = now;
  };
  const onUp = () => {
    dragging = false;
    velocity = Math.max(-24, Math.min(24, velocity));
    wake();
  };
  const onLeave = () => {
    tiltTarget = 0;
    wake();
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);
  canvas.addEventListener("pointerleave", onLeave);
  resize();

  return {
    /** A flick from the keyboard or a button: +1 / −1. */
    nudge(direction: number) {
      velocity += direction * 9;
      wake();
    },
    dispose() {
      renderer.setAnimationLoop(null);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onLeave);
      timer.dispose();
      [rimGeo, faceGeo].forEach((g) => g.dispose());
      [face, rim].forEach((m) => m.dispose());
      faceTex.dispose();
      rimTex.dispose();
      renderer.dispose();
    },
  };
}
