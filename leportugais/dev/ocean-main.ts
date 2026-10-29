// Renders the ocean shader alone: /dev/ocean.html?gl=1&t=18&h=0.58 (used to tune it and to grab the still).
import { createOcean } from "../src/components/webgl/ocean";
const q = new URLSearchParams(location.search);
const canvas = document.getElementById("c") as HTMLCanvasElement;
const o = createOcean(canvas, document.body, { still: q.has("still"), onFirstFrame: () => document.body.setAttribute("data-ready", "1") });
if (q.has("h")) o.setHorizon(Number(q.get("h")));
