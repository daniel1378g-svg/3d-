// Renders the poster, product photography and craft image from the live 3D scene.
// Usage: npm run dev  (in another terminal), then  node scripts/render-photos.cjs [baseUrl]
// Needs Playwright with Chromium; output goes to public/ as WebP (via Pillow: python3 -m pip install pillow).
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const base = process.argv[2] || 'http://127.0.0.1:5173/';
const out = path.resolve(__dirname, '..', 'public');
const tmp = fs.mkdtempSync(path.join(require('os').tmpdir(), 'nur-photos-'));
const products = ['yildiz', 'lale', 'gece', 'safran', 'bosphorus', 'gul'];
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
const shots = [
  { name: 'poster', file: 'poster-desktop.webp', vw: 1600, vh: 900, dsf: 1.25, w: 1920, h: 1080, q: 80 },
  { name: 'poster', file: 'poster-mobile.webp', vw: 450, vh: 800, dsf: 2, w: 900, h: 1600, q: 78 },
  { name: 'craft-glass', file: 'photos/craft-glass.webp', vw: 1200, vh: 800, dsf: 1.25, w: 1200, h: 800, q: 82 },
  ...products.flatMap((p) => ['a', 'b'].map((v) => ({ name: `${p}-${v}`, file: `photos/${p}-${v}.webp`, vw: 640, vh: 800, dsf: 1.5, w: 800, h: 1000, q: 80 }))),
].filter((s) => !only || only.includes(s.name) || only.includes(s.file));

(async () => {
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const s of shots) {
    const page = await browser.newPage({ viewport: { width: s.vw, height: s.vh }, deviceScaleFactor: s.dsf });
    page.on('pageerror', (e) => console.error(s.name, e.message));
    await page.goto(`${base}?photo=${s.name}`);
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 300000, polling: 500 });
    const png = path.join(tmp, `${s.name}-${s.w}.png`);
    await page.locator('#scene').screenshot({ path: png });
    await page.close();
    const dest = path.join(out, s.file);
    execFileSync('python3', ['-c', `
from PIL import Image
im = Image.open(${JSON.stringify(png)}).convert('RGB').resize((${s.w}, ${s.h}), Image.LANCZOS)
im.save(${JSON.stringify(dest)}, 'WEBP', quality=${s.q}, method=6)
`]);
    console.log('wrote', s.file, Math.round(fs.statSync(dest).size / 1024) + ' KB');
  }
  await browser.close();
})();
