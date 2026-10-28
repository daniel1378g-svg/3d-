// The hero scene alone, full window, for tuning and for rendering the poster (scripts/render-poster.mjs).
//   /dev/hero.html?sun=2026-06-21T13:00&mobile=1&t=2.5   t = seconds of wind before the still is taken
import { createHero } from "../src/three/oliveTree";
import { sunDate } from "../src/three/sun";

const q = new URLSearchParams(location.search);
const canvas = document.getElementById("c") as HTMLCanvasElement;
const scene = createHero(canvas, {
  mobile: q.get("mobile") === "1",
  date: sunDate(),
  onReady: () => {
    const t = Number(q.get("t") ?? "0");
    if (t > 0) {
      scene.start();
      setTimeout(() => {
        scene.stop();
        scene.renderOnce();
        document.body.dataset.ready = "1";
      }, t * 1000);
    } else document.body.dataset.ready = "1";
  },
});
addEventListener("resize", () => scene.resize());
if (q.get("live") === "1") scene.start();
