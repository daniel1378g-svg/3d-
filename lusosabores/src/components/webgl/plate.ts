// The plate with the logo: a glazed white plate (lathe profile) with a red rim line and the logo printed in the
// well on both faces. Drag (or ← →) to spin it: a flick spins it fast, then it slows down and settles facing
// front. It renders only while on screen and while it moves.
import * as THREE from "three";

type Options = { still: boolean; logo: string; onFirstFrame: () => void };

function softwareGl(gl: WebGLRenderingContext | WebGL2RenderingContext) {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
  return /swiftshader|llvmpipe|software|basic render/i.test(name);
}

/** The well's print: cream glaze, a dotted red ring and the logo. */
function faceCanvas(logo: HTMLImageElement | null) {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const g = c.getContext("2d")!;
  g.fillStyle = "#fffdf6";
  g.fillRect(0, 0, 1024, 1024);
  const grad = g.createRadialGradient(512, 512, 120, 512, 512, 520);
  grad.addColorStop(0, "rgba(255,251,232,0)");
  grad.addColorStop(1, "rgba(246,194,191,0.35)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 1024, 1024);
  g.strokeStyle = "#931A25";
  g.lineWidth = 14;
  g.setLineDash([2, 30]);
  g.lineCap = "round";
  g.beginPath();
  g.arc(512, 512, 455, 0, Math.PI * 2);
  g.stroke();
  g.setLineDash([]);
  g.lineWidth = 6;
  g.beginPath();
  g.arc(512, 512, 490, 0, Math.PI * 2);
  g.stroke();
  if (logo) {
    const s = 640 / Math.max(logo.width, logo.height);
    g.drawImage(logo, 512 - (logo.width * s) / 2, 512 - (logo.height * s) / 2, logo.width * s, logo.height * s);
  }
  return c;
}

export function createPlate(canvas: HTMLCanvasElement, options: Options) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  const forced = /gl=1/.test(location.search + location.hash);
  const still = options.still || (!forced && softwareGl(renderer.getContext()));
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
  camera.position.set(0, 0.25, 8.2);
  camera.lookAt(0, 0, 0);

  // the plate: a lathe around z (the face looks at the camera)
  const R = 1.7;
  const prof: THREE.Vector2[] = [
    [0, -0.06], [1.05, -0.06], [1.12, -0.02], [1.18, 0.05], [1.5, 0.13], [R, 0.17], [R + 0.02, 0.13], [1.55, 0.07], [1.2, 0.0], [1.1, -0.1], [0.98, -0.12], [0, -0.12],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const lathe = new THREE.LatheGeometry(prof, 128);
  lathe.rotateX(Math.PI / 2);
  const glaze = new THREE.MeshPhysicalMaterial({ color: 0xfffaf0, roughness: 0.28, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.12, side: THREE.DoubleSide });
  const plate = new THREE.Group();
  plate.add(new THREE.Mesh(lathe, glaze));
  // the printed well, front and back
  const tex = new THREE.CanvasTexture(faceCanvas(null));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const print = new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.1 });
  // the flat of the well sits at z = -0.06 (radius 1.05); the print lies just above it
  const well = new THREE.CircleGeometry(1.04, 96);
  const front = new THREE.Mesh(well, print);
  front.position.z = -0.055;
  plate.add(front);
  const back = new THREE.Mesh(well, print);
  back.rotation.y = Math.PI;
  back.position.z = -0.125;
  plate.add(back);
  const img = new Image();
  img.onload = () => {
    tex.image = faceCanvas(img);
    tex.needsUpdate = true;
    draw();
  };
  img.src = options.logo;
  plate.rotation.x = -0.12;
  scene.add(plate);
  scene.add(new THREE.HemisphereLight(0xfff4e6, 0x310b0a, 1.6));
  const key = new THREE.DirectionalLight(0xffe7c2, 2.6);
  key.position.set(3, 4, 6);
  scene.add(key);
  const ember = new THREE.PointLight(0xffcb8e, 14, 14, 1.6);
  ember.position.set(-3.5, -1.5, 2.5);
  scene.add(ember);
  const red = new THREE.PointLight(0xe36c6c, 8, 12, 1.6);
  red.position.set(3.2, -2, 1.5);
  scene.add(red);

  let angle = -0.7;
  let velocity = still ? 0 : 2.4;
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
    plate.rotation.y = angle;
    plate.rotation.z = tilt;
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
        // settle facing front: spring to the nearest face (both carry the logo)
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
      tiltTarget = ((e.clientX - rect.left) / rect.width - 0.5) * -0.14;
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
    velocity = Math.max(-26, Math.min(26, velocity));
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
    /** A flick from the keyboard: +1 / −1. */
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
      [lathe, well].forEach((g) => g.dispose());
      [glaze, print].forEach((m) => m.dispose());
      tex.dispose();
      renderer.dispose();
    },
  };
}
