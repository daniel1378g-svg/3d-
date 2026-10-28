// The story's logo coin: the logo on both faces, a reeded bordeaux rim, lit warm from the grill side.
// Drag (or the keys, through `nudge`) to spin it; it keeps spinning with inertia and settles into a slow turn.
import * as THREE from "three";

type Options = { still: boolean; texture: string; onFirstFrame: () => void };

function softwareGl(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  return /swiftshader|llvmpipe|software|basic render/i.test(name);
}

/** Vertical ridges for the rim, drawn once on a small canvas. */
function reededTexture() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 4;
  const g = c.getContext("2d")!;
  for (let x = 0; x < 64; x++) {
    const v = 0.5 + 0.5 * Math.sin((x / 64) * Math.PI * 2);
    g.fillStyle = `rgb(${Math.round(82 + v * 40)}, ${Math.round(22 + v * 14)}, ${Math.round(36 + v * 16)})`;
    g.fillRect(x, 0, 1, 4);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = THREE.RepeatWrapping;
  t.repeat.set(90, 1);
  return t;
}

export function createCoin(canvas: HTMLCanvasElement, options: Options) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  const still = options.still || softwareGl(renderer.getContext());
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, 0, 7.4);

  const R = 1.5;
  const H = 0.22;
  const tex = new THREE.TextureLoader().load(options.texture, () => draw());
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const rimTex = reededTexture();
  const face = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, metalness: 0, emissive: new THREE.Color(0xffffff), emissiveMap: tex, emissiveIntensity: 0.28 });
  const rim = new THREE.MeshStandardMaterial({ map: rimTex, color: 0xffffff, roughness: 0.38, metalness: 0.35 });
  const lip = new THREE.MeshStandardMaterial({ color: 0x6b1e2e, roughness: 0.4, metalness: 0.3 });

  const coin = new THREE.Group();
  const rimGeo = new THREE.CylinderGeometry(R, R, H, 120, 1, true);
  const rimMesh = new THREE.Mesh(rimGeo, rim);
  rimMesh.rotation.x = Math.PI / 2;
  coin.add(rimMesh);
  // a raised bordeaux lip round each face
  const lipGeo = new THREE.RingGeometry(R * 0.965, R, 120);
  const faceGeo = new THREE.CircleGeometry(R * 0.97, 120);
  for (const side of [1, -1]) {
    const f = new THREE.Mesh(faceGeo, face);
    f.position.z = (side * H) / 2;
    if (side < 0) f.rotation.y = Math.PI;
    const l = new THREE.Mesh(lipGeo, lip);
    l.position.z = (side * H) / 2 + side * 0.002;
    if (side < 0) l.rotation.y = Math.PI;
    coin.add(f, l);
  }
  scene.add(coin);

  scene.add(new THREE.HemisphereLight(0xfff4e8, 0x2a1f1e, 1.6));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(2.5, 3.5, 5);
  scene.add(key);
  const ember = new THREE.PointLight(0xe0612b, 14, 12, 1.6);
  ember.position.set(-3, -2.5, 2.5);
  scene.add(ember);

  // spin state (radians, radians per second)
  let angle = -0.5;
  let velocity = still ? 0 : 0.6;
  const idle = still ? 0 : 0.35;
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
    coin.rotation.y = angle;
    renderer.render(scene, camera);
    if (first) {
      first = false;
      options.onFirstFrame();
    }
  }

  const timer = new THREE.Timer();
  timer.connect(document);
  function frame() {
    timer.update();
    const dt = Math.min(timer.getDelta(), 0.05);
    if (!dragging) {
      // inertia, easing back to the idle turn in the direction it was going
      const target = Math.sign(velocity || 1) * idle;
      velocity += (target - velocity) * Math.min(1, dt * 1.6);
      angle += velocity * dt;
    }
    coin.rotation.x += (tiltTarget - coin.rotation.x) * Math.min(1, dt * 6);
    draw();
  }

  let running = false;
  let onScreen = false;
  const sync = () => {
    const should = onScreen && document.visibilityState === "visible" && (!still || dragging);
    if (should !== running) {
      running = should;
      renderer.setAnimationLoop(should ? frame : null);
    }
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
    sync();
  };
  const onMove = (e: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    if (e.pointerType === "mouse") tiltTarget = ((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
    if (!dragging) return;
    const now = performance.now();
    const dx = e.clientX - lastX;
    const d = (dx / rect.width) * Math.PI * 1.6;
    angle += d;
    velocity = d / Math.max(0.008, (now - lastT) / 1000);
    lastX = e.clientX;
    lastT = now;
    if (still) draw();
  };
  const onUp = () => {
    dragging = false;
    velocity = Math.max(-14, Math.min(14, velocity));
    if (still) velocity = 0;
    sync();
  };
  const onLeave = () => (tiltTarget = 0);
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);
  canvas.addEventListener("pointerleave", onLeave);
  resize();

  return {
    /** A flick from the keyboard or the spin button: +1 / −1. */
    nudge(direction: number) {
      if (still) {
        angle += direction * (Math.PI / 4);
        draw();
      } else velocity = direction * 9;
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
      [rimGeo, lipGeo, faceGeo].forEach((g) => g.dispose());
      [face, rim, lip].forEach((m) => m.dispose());
      tex.dispose();
      rimTex.dispose();
      renderer.dispose();
    },
  };
}
