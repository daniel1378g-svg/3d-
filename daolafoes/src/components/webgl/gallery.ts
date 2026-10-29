// Scene C: the pictures as panels hanging in a dark room. The camera glides along the row with the wheel /
// drag / scroll and leans with the pointer; a tap on a panel opens the lightbox at that index. Textures load
// lazily; DPR ≤ 1.5; pauses off screen; disposes everything.
import { AmbientLight, Color, DoubleSide, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PlaneGeometry, PointLight, Raycaster, SRGBColorSpace, Scene, TextureLoader, Vector2, WebGLRenderer } from "three";

type Pic = { src: string; w: number; h: number };
export function createGallery(canvas: HTMLCanvasElement, host: HTMLElement, pics: Pic[], onOpen: (i: number) => void) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  const scene = new Scene();
  scene.background = new Color("#2B1A12");
  const camera = new PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0, 6);
  scene.add(new AmbientLight(0xffffff, 1.4));
  const warm = new PointLight(0xffb27a, 30, 30, 1.6);
  warm.position.set(0, 3, 4);
  scene.add(warm);
  const group = new Group();
  scene.add(group);
  const loader = new TextureLoader();
  const gap = 3.1;
  const panels: Mesh[] = [];
  pics.forEach((p, i) => {
    const h = 2.4;
    const w = h * (p.w / p.h);
    const frame = new Mesh(new PlaneGeometry(w + 0.16, h + 0.16), new MeshStandardMaterial({ color: new Color("#FDF9F6"), roughness: 0.9, side: DoubleSide }));
    const mat = new MeshBasicMaterial({ color: new Color("#8a6a58") });
    const pic = new Mesh(new PlaneGeometry(w, h), mat);
    pic.position.z = 0.01;
    const node = new Group();
    node.add(frame, pic);
    node.position.set(i * gap, (i % 2 ? 1 : -1) * 0.25, -((i % 3) * 0.6));
    node.rotation.y = (i % 2 ? -1 : 1) * 0.12;
    node.userData.index = i;
    group.add(node);
    panels.push(pic);
    loader.load(p.src, (tex) => {
      tex.colorSpace = SRGBColorSpace;
      mat.map = tex;
      mat.color.set(0xffffff);
      mat.needsUpdate = true;
    });
  });
  const total = (pics.length - 1) * gap;
  let x = 0;
  let targetX = 0;
  const pointer = new Vector2();
  const lean = new Vector2();
  let paused = false;
  let visible = true;
  let raf = 0;
  const resize = () => {
    const w = host.clientWidth || 1;
    const h = host.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.05 });
  io.observe(host);
  const onWheel = (e: WheelEvent) => {
    const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    // only take the wheel while the row still has somewhere to go, so the page keeps scrolling at the ends
    const next = Math.max(0, Math.min(total, targetX + d * 0.01));
    if (next !== targetX) {
      e.preventDefault();
      targetX = next;
    }
  };
  let drag: { x: number; start: number; moved: boolean } | null = null;
  const ray = new Raycaster();
  const onDown = (e: PointerEvent) => {
    drag = { x: e.clientX, start: targetX, moved: false };
    canvas.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    if (drag) {
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 4) drag.moved = true;
      targetX = Math.max(0, Math.min(total, drag.start - dx * 0.012));
    }
  };
  const onUp = (e: PointerEvent) => {
    const wasDrag = drag?.moved;
    drag = null;
    if (wasDrag) return;
    const r = canvas.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(panels, false)[0];
    if (hit) onOpen(hit.object.parent!.userData.index as number);
  };
  canvas.addEventListener("wheel", onWheel, { passive: false });
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (paused || !visible || document.hidden) return;
    x += (targetX - x) * 0.08;
    lean.lerp(pointer, 0.06);
    camera.position.x = x + lean.x * 0.4;
    camera.position.y = lean.y * 0.3;
    camera.lookAt(x, 0, 0);
    warm.position.x = x;
    // hover: the panel under the pointer tilts to face the camera
    ray.setFromCamera(pointer, camera);
    const hit = ray.intersectObjects(panels, false)[0];
    group.children.forEach((n) => {
      const base = (n.userData.index % 2 ? -1 : 1) * 0.12;
      const want = hit && hit.object.parent === n ? 0 : base;
      n.rotation.y += (want - n.rotation.y) * 0.1;
    });
    canvas.style.cursor = hit ? "pointer" : drag ? "grabbing" : "grab";
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(loop);
  return {
    setPaused: (v: boolean) => (paused = v),
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      scene.traverse((o) => {
        const m = o as Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as MeshBasicMaterial | undefined;
        if (mat) {
          mat.map?.dispose();
          mat.dispose();
        }
      });
      renderer.dispose();
    },
  };
}
