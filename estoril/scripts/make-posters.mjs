// Renders the still posters of the journey (site/assets/img/stage-1..5.webp, landscape, and
// stage-1..5-p.webp, portrait) from the live 3D scene, against a served build.
//
//   node scripts/make-posters.mjs [--base http://127.0.0.1:8080/] [--out site/assets/img]
//                                 [--max-kb 100] [--sheet docs/comparisons/posters/x.jpg --before <dir>]
//
// Where the posters are used (src/home.js, site/index.html, site/en/index.html): without the 3D scene
// (?3d=off, no WebGL or a software renderer, prefers-reduced-motion, Save-Data, a lost context) the
// stage shows a poster per stage instead of the canvas, under the same panels; the first is in the
// HTML (fetchpriority high, it is also what shows while the scene loads), the other four come from
// data-posters when the stills are needed. Each is a <picture>: the portrait file for viewports with
// max-aspect-ratio 4/5 (phones, portrait tablets), the landscape one otherwise, both drawn with
// object-fit: cover under the panel shade (.jr__shade, which is drawn over the poster by the page, so
// the posters are the bare canvas).
//
// How: the home page in capture mode (?capture=1&3d=force&q=high) renders each stage's moment
// (POSTERS: inside the stage's panel window, where the stage buttons and test-site.mjs look) as a
// deterministic still (renderAt, dt 0), with the framing the live page uses at that size: the car in
// the area the panels leave free (home.js updateFraming). Landscape: a 1600x900 viewport at 1x, the
// posters' size since the first release (width/height in the HTML), and what a 1440-1920 px wide
// window crops it to with object-fit: cover keeps the car beside the panel column. Portrait: a 450x800
// viewport at 2x (900x1600, 9:16, between phones at ~9:19.5, which crop its sides, and portrait
// tablets at 3:4, which crop its top and bottom), with the bottom-sheet layout of phones.
// The canvas is read right after the still is drawn and encoded to WebP by Chromium's encoder
// (libwebp, canvas.toDataURL; no cwebp or other encoder is needed): quality 0.75, lowered in steps of
// 0.05 until the file is at most --max-kb (default 100 KB). The new frames hold more detail (woods,
// crowds, Armco) than the originals, which were 30-66 KB at the same size.
// --sheet writes a before/after JPEG (quality 0.82) of the posters in --before and the new ones.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
const { chromium } = createRequire(import.meta.url)('playwright');

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const BASE = arg('base', 'http://127.0.0.1:8080/');
const OUT = resolve(arg('out', new URL('../site/assets/img', import.meta.url).pathname));
const MAX_BYTES = +arg('max-kb', 100) * 1024;
const SHEET = arg('sheet', '');
const BEFORE = arg('before', '');

/** [file number, journey progress, stage]: the middle of each panel window (src/home.js PANEL_WINDOWS). */
const POSTERS = [
  [1, 0.04, 'arrival'],
  [2, 0.26, 'pit lane'],
  [3, 0.49, 'on track'],
  [4, 0.73, 'paddock'],
  [5, 0.95, 'golden hour'],
];
const LAYOUTS = [
  { suffix: '', width: 1600, height: 900, dpr: 1 },
  { suffix: '-p', width: 450, height: 800, dpr: 2 },
];

const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const messages = [];
mkdirSync(OUT, { recursive: true });
const written = [];

for (const layout of LAYOUTS) {
  const page = await browser.newPage({
    viewport: { width: layout.width, height: layout.height },
    deviceScaleFactor: layout.dpr,
  });
  page.on('pageerror', (e) => messages.push('pageerror ' + e));
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') messages.push(m.type() + ' ' + m.text());
  });
  await page.goto(BASE + 'index.html?capture=1&3d=force&q=high', { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.__cap === 'function', null, { timeout: 600000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  for (const [number, t, stage] of POSTERS) {
    const result = await page.evaluate(
      ([t, maxBytes]) => {
        window.__cap(t, 0);
        const source = document.querySelector('.jr__canvas');
        // copy the frame now, while the drawing buffer still holds it
        const copy = document.createElement('canvas');
        copy.width = source.width;
        copy.height = source.height;
        copy.getContext('2d').drawImage(source, 0, 0);
        let quality = 0.75;
        let url = copy.toDataURL('image/webp', quality);
        while (url.length * 0.75 > maxBytes && quality > 0.5) {
          quality = Math.round((quality - 0.05) * 100) / 100;
          url = copy.toDataURL('image/webp', quality);
        }
        return { url, quality, width: copy.width, height: copy.height };
      },
      [t, MAX_BYTES],
    );
    if (!result.url.startsWith('data:image/webp')) throw new Error('this browser cannot encode WebP');
    const bytes = Buffer.from(result.url.split(',')[1], 'base64');
    const file = `${OUT}/stage-${number}${layout.suffix}.webp`;
    writeFileSync(file, bytes);
    written.push(file);
    console.log(
      `${file}  ${stage} t=${t}  ${result.width}x${result.height}  q=${result.quality}  ${(bytes.length / 1024).toFixed(1)} KB`,
    );
  }
  await page.close();
}

if (SHEET) {
  // before (top) and after (bottom) rows: the five landscape posters, then the five portrait ones
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  const images = (dir) =>
    LAYOUTS.flatMap((layout) =>
      POSTERS.map(([number]) => {
        const file = `${dir}/stage-${number}${layout.suffix}.webp`;
        return 'data:image/webp;base64,' + readFileSync(file).toString('base64');
      }),
    );
  const jpeg = await page.evaluate(
    async ({ before, after, labels }) => {
      const load = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });
      const [b, a] = [await Promise.all(before.map(load)), await Promise.all(after.map(load))];
      const W = 400; // landscape thumbnail width
      const H = 225;
      const PW = 160; // portrait thumbnail width
      const PH = 284;
      const label = 26;
      const gap = 8;
      const canvas = document.createElement('canvas');
      canvas.width = 5 * W + 6 * gap;
      canvas.height = 2 * (label + H + gap + PH + gap) + gap;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#16181b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '600 16px sans-serif';
      [b, a].forEach((set, row) => {
        const y0 = gap + row * (label + H + gap + PH + gap);
        ctx.fillStyle = '#fff';
        ctx.fillText(row ? 'after: the final journey' : 'before: the original renders', gap, y0 + 17);
        for (let i = 0; i < 5; i++) {
          const x = gap + i * (W + gap);
          ctx.drawImage(set[i], x, y0 + label, W, H);
          ctx.drawImage(set[5 + i], x + (W - PW) / 2, y0 + label + H + gap, PW, PH);
          ctx.fillStyle = 'rgba(0,0,0,.6)';
          ctx.fillRect(x, y0 + label, 132, 22);
          ctx.fillStyle = '#fff';
          ctx.fillText(labels[i], x + 6, y0 + label + 16);
        }
      });
      return canvas.toDataURL('image/jpeg', 0.82);
    },
    {
      before: images(resolve(BEFORE)),
      after: images(OUT),
      labels: POSTERS.map(([number, , stage]) => `${number} · ${stage}`),
    },
  );
  mkdirSync(dirname(resolve(SHEET)), { recursive: true });
  const bytes = Buffer.from(jpeg.split(',')[1], 'base64');
  writeFileSync(resolve(SHEET), bytes);
  console.log(`${resolve(SHEET)}  ${(bytes.length / 1024).toFixed(1)} KB`);
  await page.close();
}

await browser.close();
if (messages.length) {
  console.log('PAGE MESSAGES:\n' + [...new Set(messages)].join('\n'));
  process.exit(1);
}
