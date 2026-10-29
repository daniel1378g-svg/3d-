// Renders the ember shader alone (for the still frames in public/hero): /dev/brasa.html?gl=1&bed=0.4&t=18
import { createBrasa } from "../src/components/webgl/brasa";
const q = new URLSearchParams(location.search);
const c = document.getElementById("c") as HTMLCanvasElement;
const e = createBrasa(c, document.body, { still: false, onFirstFrame: () => (document.title = "ready") });
e.setBed(Number(q.get("bed") ?? 0.4));
setTimeout(() => {
  e.setPaused(true);
  document.title = "done";
}, Number(q.get("ms") ?? 2500));
