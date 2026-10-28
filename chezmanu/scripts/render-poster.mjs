// Renders the custard hero's still frames from the real shader (dev/custard.html), for first paint, devices
// without WebGL and reduced motion: public/images/custard-poster(-portrait).webp|avif.
// Needs `npm run dev` running (port 5175) and Playwright's Chromium; converts with Python + Pillow.
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

// Playwright is pre-installed globally in this environment (not a project dependency), so load it through require.
const { chromium } = createRequire(import.meta.url)("playwright");
const root = new URL("..", import.meta.url).pathname;
const tmp = join(root, ".cache/poster");
mkdirSync(tmp, { recursive: true });
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const [name, w, h] of [["custard-poster", 1600, 1000], ["custard-poster-portrait", 800, 1300]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:5175/dev/custard.html?t=21.5`);
  await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: join(tmp, `${name}.png`) });
  await page.close();
}
await browser.close();
execFileSync("python3", ["-I", "-c", `
import sys
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
for n in ("custard-poster", "custard-poster-portrait"):
    im = Image.open(f"{src}/{n}.png").convert("RGB")
    im.save(f"{dst}/{n}.webp", "WEBP", quality=74, method=6)
    im.save(f"{dst}/{n}.avif", "AVIF", quality=52, speed=4)
    print(n, im.size)
`, tmp, join(root, "public/images")], { stdio: "inherit" });
