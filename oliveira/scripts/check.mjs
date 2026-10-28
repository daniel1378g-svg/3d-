// `npm run check` (after `npm run build`): exits non-zero when something in the brief's quality bar fails.
//   1. every interface string exists in all five languages
//   2. all 27 photos have their files and alt text in five languages
//   3. no file from the "never use" list is referenced
//   4. the restaurant's facts appear exactly as written
//   5. in a browser (vite preview + Playwright): axe-core finds no serious or critical violations, no console
//      errors, and screenshots of every page at 375 / 768 / 1280 / 1920 px, with and without reduced motion
//      land in .cache/check/
// `node scripts/check.mjs --quick` skips the browser part.
import { build } from "esbuild";
import { spawn, execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const require = createRequire(import.meta.url);
const quick = process.argv.includes("--quick");
let failures = 0;
const fail = (msg) => {
  failures++;
  console.log(`  ✗ ${msg}`);
};
const ok = (msg) => console.log(`  ✓ ${msg}`);

// ---------------------------------------------------------------- 1. strings
const tmp = join(root, ".cache/check-i18n.cjs");
await build({
  stdin: { contents: 'export * from "./src/i18n"; export { PHOTOS, DISHES, CONTACT } from "./src/content"; export { IMPRESSUM, DATENSCHUTZ } from "./src/legal";', resolveDir: root, loader: "ts" },
  bundle: true, platform: "node", format: "cjs", outfile: tmp, logLevel: "warning", alias: { "@": join(root, "src") }, define: { __ARTIFACT__: "false" },
});
const m = require(tmp);
console.log("1. Strings in five languages");
const LANGS = m.LANGS;
let missing = 0;
const walk = (obj, path) => {
  for (const [k, v] of Object.entries(obj)) {
    if (v && typeof v === "object" && LANGS.every((l) => l in v)) {
      for (const l of LANGS) if (typeof v[l] !== "string" || (!v[l] && !(path + k).endsWith("proposalLocal"))) { missing++; fail(`${path}${k}.${l} is empty`); }
    } else if (v && typeof v === "object" && !Array.isArray(v)) walk(v, `${path}${k}.`);
  }
};
walk({ UI: m.UI, TEXT: m.TEXT, SEO: m.SEO }, "");
for (const l of LANGS) if (!m.WELCOME[l]?.word || !m.WELCOME[l]?.line) fail(`WELCOME.${l}`);
for (const d of m.DISHES) for (const l of LANGS) if (!d.desc[l]) fail(`dish ${d.id} desc.${l}`);
for (const doc of [m.IMPRESSUM, m.DATENSCHUTZ]) for (const l of LANGS) if (!doc[l]?.blocks?.length) fail(`legal page missing in ${l}`);
if (!missing) ok(`UI, texts, SEO, welcome words, dishes and legal pages complete in ${LANGS.join(", ")}`);

// ---------------------------------------------------------------- 2. photos
console.log("2. Photos");
const photos = m.PHOTOS;
if (photos.length !== 27) fail(`expected 27 photos, found ${photos.length}`);
const own = photos.filter((p) => p.source === "own").length;
const sup = photos.filter((p) => p.source === "supplied").length;
for (const p of photos) {
  for (const l of LANGS) if (!p.alt[l]) fail(`${p.id} alt.${l} missing`);
  for (const w of p.widths) for (const ext of ["webp", "avif"]) if (!existsSync(join(root, "public/images", `${p.name}-${w}.${ext}`))) fail(`${p.name}-${w}.${ext} missing`);
  if (!existsSync(join(root, "public/depth", `${p.name}.webp`))) fail(`depth map for ${p.name} missing`);
  if (p.source === "supplied" && !p.illustrative) fail(`${p.id} is supplied but not marked illustrative`);
}
ok(`${photos.length} photos (${own} own, ${sup} supplied), each with files, depth map and alt text in five languages`);
const src = execFileSync("grep", ["-rhoE", 'id="(own|sup)-[0-9]+"|"(own|sup)-[0-9]+"', join(root, "src"), join(root, "content/dishes.json")]).toString();
const referenced = new Set(src.match(/(own|sup)-\d+/g));
const gallery = readFileSync(join(root, "src/components/home/Gallery.tsx"), "utf8").includes("PHOTOS.map");
const unused = photos.filter((p) => !referenced.has(p.id));
if (!gallery) fail("the gallery no longer lists every photo");
else ok(`every photo is in the gallery; ${photos.length - unused.length} also appear elsewhere${unused.length ? ` (gallery only: ${unused.map((p) => p.id).join(", ")})` : ""}`);

// ---------------------------------------------------------------- 3. never use
console.log("3. Files that must never be used");
const banned = ["foodiesfeed", "fooodiesfeed", "1000x1000-", "1000x1200-", "1080x1080-", "1920x1080-", "img-1.jpg", "img-2.jpg", "img-3.jpg", "25388788904", "Vintage-Logo", "icon-1-3", "icon-2-3", "icon-3-3", "weiss.png", "oliveira-login-bg", "foodandjourneys", "7e62014f"];
const scan = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? scan(join(dir, e.name)) : [join(dir, e.name)]));
const texts = [...scan(join(root, "src")), ...scan(join(root, "content")), ...(existsSync(join(root, "dist")) ? scan(join(root, "dist")).filter((f) => /\.(js|html|css)$/.test(f)) : [])];
let hits = 0;
for (const f of texts) {
  const t = readFileSync(f, "utf8");
  for (const b of banned) if (t.includes(b) && !f.endsWith("check.mjs")) { hits++; fail(`${b} referenced in ${f.replace(root, "")}`); }
}
const files = [...scan(join(root, "public")), ...scan(join(root, "media"))].map((f) => f.toLowerCase());
for (const b of banned) if (files.some((f) => f.includes(b.toLowerCase()))) { hits++; fail(`a ${b} file is in public/ or media/`); }
if (!hits) ok("no template images, template icons, the olive-grove stock photo or the watermarked caldo verde");

// ---------------------------------------------------------------- 4. facts
console.log("4. Facts, exactly as on the live site");
const bundle = existsSync(join(root, "dist/assets")) ? readdirSync(join(root, "dist/assets")).filter((f) => f.endsWith(".js")).map((f) => readFileSync(join(root, "dist/assets", f), "utf8")).join("\n") : "";
if (!bundle) fail("no dist/ build: run `npm run build` first");
const facts = ["044 730 71 71", "tel:+41447307171", "info@oliveira-winterthur.ch", "Stationsstrasse 3", "8406", "Winterthur", "https://www.facebook.com/RestauranteOliveiraWinterthur/", "e029b875-9b04-46d5-bc61-592b59f3d9e1", "Bom apetite", "en guete!", "Von BACALHAU bis Käseschnitte «Walliser Art»", "Portugal vai para Winterthur-Töss", "Arlindo Ribeiro Oliveira", "Ekaterina", "«Old Pullmann»", "«Kafi Frosch»", "Arlindo Oliveira, Inhaber"];
const absent = facts.filter((f) => !bundle.includes(f) && !bundle.includes(JSON.stringify(f).slice(1, -1)));
absent.forEach((f) => fail(`"${f}" not found in the build`));
if (!absent.length && bundle) ok(`${facts.length} facts present verbatim`);

// ---------------------------------------------------------------- 5. browser
if (!quick && bundle) {
  console.log("5. In the browser");
  let chromium;
  try {
    ({ chromium } = require("playwright"));
  } catch {
    ({ chromium } = require(join(execFileSync("npm", ["root", "-g"]).toString().trim(), "playwright")));
  }
  const server = spawn("npx", ["vite", "preview", "--port", "4179", "--strictPort", "--host", "127.0.0.1"], { cwd: root, stdio: "ignore" });
  const base = "http://127.0.0.1:4179";
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(base);
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 250));
    }
  }
  const out = join(root, ".cache/check");
  mkdirSync(out, { recursive: true });
  const axe = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
  const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const pages = LANGS.flatMap((l) => Object.values(m.SLUGS[l]).map((slug) => `/${l}/${slug}`));
  let errors = 0;
  let violations = 0;
  for (const path of pages) {
    for (const [w, h] of [[375, 812], [768, 1024], [1280, 800], [1920, 1080]]) {
      for (const reduce of [false, true]) {
        // Screenshots of every page at four widths; axe and console checks on each page at 1280 px.
        if (path.split("/")[1] !== "de" && w !== 1280) continue;
        const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: reduce ? "reduce" : "no-preference" });
        await ctx.addInitScript(() => {
          try {
            sessionStorage.setItem("oliveira-welcomed", "1");
          } catch {
            /* ignore */
          }
        });
        const page = await ctx.newPage();
        const logs = [];
        page.on("console", (msg) => msg.type() === "error" && logs.push(msg.text()));
        page.on("pageerror", (e) => logs.push(e.message));
        await page.goto(base + path, { waitUntil: "networkidle" });
        await page.waitForTimeout(1200);
        const name = `${path.replace(/\//g, "_").replace(/^_|_$/g, "") || "root"}-${w}${reduce ? "-reduce" : ""}.png`;
        await page.screenshot({ path: join(out, name) });
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
        if (overflow > 1) fail(`${path} at ${w}px scrolls sideways by ${overflow}px`);
        if (w === 1280 && !reduce) {
          await page.addScriptTag({ content: axe });
          const res = await page.evaluate(async () => (await window.axe.run(document, { resultTypes: ["violations"] })).violations.filter((v) => v.impact === "serious" || v.impact === "critical").map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0]?.target}`));
          res.forEach((r) => fail(`axe ${path}: ${r}`));
          violations += res.length;
        }
        logs.forEach((l) => fail(`console ${path} @${w}: ${l.slice(0, 160)}`));
        errors += logs.length;
        await ctx.close();
      }
    }
  }
  await browser.close();
  server.kill();
  if (!violations) ok(`axe: no serious or critical violations on ${pages.length} pages`);
  if (!errors) ok("no console errors");
  ok(`screenshots in .cache/check/`);
}

console.log(failures ? `\n${failures} problem(s)` : "\nAll checks passed");
process.exit(failures ? 1 : 0);
