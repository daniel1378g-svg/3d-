// Renders the still image of the Douro shader (shown before WebGL loads, without a GPU, and with reduced
// motion). Needs the dev server: `npx vite --port 5181` then `node scripts/render-douro.cjs`.
const { chromium } = require("playwright");
const { execFileSync } = require("node:child_process");
const path = require("node:path");

const root = path.join(__dirname, "..");
const shots = [
  { name: "douro-1600", w: 1600, h: 1000 },
  { name: "douro-800", w: 800, h: 1200 },
];
(async () => {
  const browser = await chromium.launch({ args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  for (const s of shots) {
    const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
    await page.goto("http://localhost:5181/dev/douro.html?t=42");
    await page.waitForFunction(() => document.title === "ready", null, { timeout: 60000 });
    const png = path.join(root, `.cache/${s.name}.png`);
    await page.screenshot({ path: png });
    execFileSync("python3", ["-c", `from PIL import Image; Image.open("${png}").convert("RGB").save("${path.join(root, "public/media", s.name + ".webp")}", "WEBP", quality=78, method=6)`]);
    await page.close();
  }
  await browser.close();
  console.log("public/media/douro-1600.webp, douro-800.webp");
})();
