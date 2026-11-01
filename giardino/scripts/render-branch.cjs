// Renders the static olive-branch poster (the WebGL fallback and first paint of the hero) from the live scene:
// same seed, same pose, transparent background. Needs the dev server: `npm run dev` (port 5340), then `npm run poster`.
const { chromium } = require("playwright");
const { execFileSync } = require("node:child_process");
const path = require("node:path");
const out = path.join(__dirname, "..", "public", "brand");
(async () => {
  const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  for (const [w, h, scale, name] of [[1000, 800, 1.4, "olive-branch"], [560, 448, 1.25, "olive-branch-sm"]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: scale });
    await p.goto(`http://127.0.0.1:5340/dev/branch.html?dpr=${scale}&w=${w}&h=${h}&transparent=1`, { waitUntil: "networkidle" });
    await p.addStyleTag({ content: "html,body{background:transparent!important}" });
    await p.waitForFunction(() => window.__ready === true, null, { timeout: 60000 });
    const png = path.join(out, `${name}.png`);
    await (await p.$("#c")).screenshot({ path: png, omitBackground: true });
    // WebP with alpha, 2× pixels of the CSS box
    execFileSync("python3", ["-I", "-c", `from PIL import Image; im=Image.open(${JSON.stringify(png)}); im.save(${JSON.stringify(png.replace(/\.png$/, ".webp"))}, "WEBP", quality=86, method=6)`]);
    require("node:fs").unlinkSync(png);
    console.log(name, w, h);
    await p.close();
  }
  await b.close();
})();
