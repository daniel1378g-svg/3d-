// The hero scene on its own. ?t=11.5 renders that moment and stops (for screenshots); ?q=low uses the phone path;
// without ?t the sequence plays. window.engine is exposed for the console.
import { PicanhaEngine } from "../src/three/engine";

const params = new URLSearchParams(location.search);
const canvas = document.querySelector("canvas")!;
const hud = document.getElementById("hud")!;
const t = params.get("t");
const engine = new PicanhaEngine({
  canvas,
  quality: params.get("q") === "low" ? "low" : "high",
  still: t !== null,
  onPhase: (p) => (hud.textContent = `phase ${p}`),
});
const cam = params.get("cam");
if (cam) engine.debugCam = cam.split(",").map(Number);
const size = () => engine.resize(innerWidth, innerHeight);
size();
addEventListener("resize", size);
addEventListener("pointermove", (e) => engine.setPointer((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1)));
if (t !== null) {
  engine.seek(parseFloat(t));
  requestAnimationFrame(() => requestAnimationFrame(() => ((window as unknown as { __ready: boolean }).__ready = true)));
} else engine.start();
(window as unknown as { engine: PicanhaEngine }).engine = engine;
