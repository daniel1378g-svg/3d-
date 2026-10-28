// Renders the hero's still frames (the LCP image and the no-WebGL fallback) from the real scene at midday
// on 21 June, then writes AVIF and WebP. Needs the dev server: `npm run dev` in another terminal.
//   node scripts/render-poster.mjs [http://127.0.0.1:5174]
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require(join(execFileSync("npm", ["root", "-g"]).toString().trim(), "playwright")));
}
const root = new URL("..", import.meta.url).pathname;
const base = process.argv[2] ?? "http://127.0.0.1:5174";
const tmp = join(root, ".cache/poster");
mkdirSync(tmp, { recursive: true });

const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const [name, w, h, mobile] of [["landscape", 1600, 1000, 0], ["portrait", 750, 1400, 1]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto(`${base}/dev/hero.html?sun=2026-06-21T13:00&mobile=${mobile}&t=1.4`);
  await page.waitForSelector('body[data-ready="1"]', { timeout: 180000 });
  await page.screenshot({ path: join(tmp, `${name}.png`) });
  await page.close();
  console.log(name, "rendered");
}
await browser.close();
execFileSync("python3", ["-I", "-c", `
from PIL import Image
t='${tmp}'; o='${join(root, "public/images")}'
l=Image.open(t+'/landscape.png').convert('RGB')
l.save(o+'/hero-poster.avif','AVIF',quality=52,speed=4); l.save(o+'/hero-poster.webp','WEBP',quality=74,method=6)
m=l.resize((960,600),Image.LANCZOS); m.save(o+'/hero-poster-960.avif','AVIF',quality=52,speed=4); m.save(o+'/hero-poster-960.webp','WEBP',quality=74,method=6)
p=Image.open(t+'/portrait.png').convert('RGB')
p.save(o+'/hero-poster-portrait.avif','AVIF',quality=50,speed=4); p.save(o+'/hero-poster-portrait.webp','WEBP',quality=72,method=6)
`]);
console.log("posters written");
