// Shimmer test: renders a journey frame, then the same frame with the camera and its target moved
// 1 cm (along +x), and counts the pixels whose largest channel changes by more than 24/255
// (docs/diagnosis: "Shimmer"). Alpha-tested foliage, screen-anchored dithers and sub-pixel detail
// that alias show up here. The comparison runs in the page (no pixel transfer).
//
// node tools/env/flicker.mjs --base http://127.0.0.1:8080/ --t 0.05,0.5 [--size 1440x900] [--q high]
//   [--cam "name=px,py,pz/tx,ty,tz/fov;..."]  fixed cameras instead of the journey camera
//   [--diff dir]                               also save the changed pixels as a white-on-black PNG
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');

const arg = (k, d) => {
  const i = process.argv.indexOf('--' + k);
  return i > -1 ? process.argv[i + 1] : d;
};
const base = arg('base', 'http://127.0.0.1:8080/');
const ts = arg('t', '0.05').split(',').map(Number);
const [w, h] = arg('size', '1440x900').split('x').map(Number);
const q = arg('q', 'high');
const diffDir = arg('diff', '');
const cams = arg('cam', '')
  .split(';')
  .filter(Boolean)
  .map((c) => {
    const [name, spec] = c.split('=');
    const [pos, tgt, fov] = spec.split('/');
    return { name, pos: pos.split(',').map(Number), tgt: tgt.split(',').map(Number), fov: +(fov || 40) };
  });

const browser = await chromium.launch({
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
});
const page = await browser.newPage({ viewport: { width: w, height: h } });
const messages = [];
page.on('pageerror', (e) => messages.push(String(e)));
page.on('console', (m) => {
  if (m.type() === 'error' || m.type() === 'warning') messages.push(m.type() + ': ' + m.text());
});
await page.goto(`${base}index.html?capture=1&3d=force&q=${q}`, { waitUntil: 'load' });
await page.waitForFunction(() => typeof window.__cap === 'function' && window.__journey, null, {
  timeout: 300000,
});
await page.addStyleTag({
  content:
    '*,*::before,*::after{transition:none!important;animation:none!important}.jr__panels,.jr__ui,.jr__ticker,.hdr,.preview-strip{visibility:hidden!important}.jr__posters{display:none!important}',
});

/**
 * Renders t with the camera (fixed, or the journey's own frozen) moved by dx metres; keeps the pixels
 * of the first shot and compares the second with them. Returns { changed, mask } (mask: data URL).
 */
async function shot(t, cam, dx, compare, withMask) {
  return page.evaluate(
    ([t, cam, dx, compare, withMask]) => {
      const J = window.__journey;
      if (cam)
        J.debugCam = {
          pos: [cam.pos[0] + dx, cam.pos[1], cam.pos[2]],
          tgt: [cam.tgt[0] + dx, cam.tgt[1], cam.tgt[2]],
          fov: cam.fov,
        };
      else {
        if (!compare) {
          J.debugCam = null;
          window.__cap(t, 0);
          const p = J.camera.position;
          const d = J.camera.getWorldDirection(p.clone());
          window.__flickCam = { p: [p.x, p.y, p.z], d: [d.x, d.y, d.z], fov: J.camera.fov };
        }
        const { p, d, fov } = window.__flickCam;
        J.debugCam = {
          pos: [p[0] + dx, p[1], p[2]],
          tgt: [p[0] + d[0] * 20 + dx, p[1] + d[1] * 20, p[2] + d[2] * 20],
          fov,
        };
      }
      window.__cap(t, 0);
      window.__cap(t, 0); // twice: no blur history differences
      const canvas = J.renderer.domElement;
      const copy = document.createElement('canvas');
      copy.width = canvas.width;
      copy.height = canvas.height;
      const g = copy.getContext('2d');
      g.drawImage(canvas, 0, 0);
      const data = g.getImageData(0, 0, copy.width, copy.height);
      if (!compare) {
        window.__flickA = data.data;
        return { changed: 0 };
      }
      const a = window.__flickA;
      const b = data.data;
      let changed = 0;
      for (let i = 0; i < a.length; i += 4) {
        const hit =
          Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i + 1] - b[i + 1]), Math.abs(a[i + 2] - b[i + 2])) > 24;
        if (hit) changed++;
        if (withMask) b[i] = b[i + 1] = b[i + 2] = hit ? 255 : 0;
      }
      let mask = null;
      if (withMask) {
        g.putImageData(data, 0, 0);
        mask = copy.toDataURL('image/png');
      }
      return { changed, mask };
    },
    [t, cam, dx, compare, withMask],
  );
}

if (diffDir) mkdirSync(diffDir, { recursive: true });
for (const t of ts)
  for (const cam of cams.length ? cams : [null]) {
    await shot(t, cam, 0, false, false);
    const { changed, mask } = await shot(t, cam, 0.01, true, !!diffDir);
    const label = `t${t.toFixed(3)}${cam ? '-' + cam.name : ''}`;
    console.log(`${label}: ${changed} px change by more than 24/255 after a 1 cm camera move`);
    if (mask) writeFileSync(`${diffDir}/flicker-${label}.png`, Buffer.from(mask.split(',')[1], 'base64'));
  }
console.log('PAGE MESSAGES: ' + (messages.length ? '\n' + [...new Set(messages)].join('\n') : 'none'));
await browser.close();
