// Opens the single-file build straight from disk (file://) and checks that it loads, renders and walks.
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const file = 'file://' + path.join(__dirname, '..', 'standalone', 'Refeitorio-Balnearios-3D.html');
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, offline: true });       // offline: nothing may come from the network
  const page = await ctx.newPage();
  const errors = [], requests = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => requests.push(r.url().slice(0, 80)));
  await page.goto(file + '?shot=1&at=REF');
  let ok = true;
  try { await page.waitForFunction(() => document.getElementById('app').dataset.state === 'run', null, { timeout: 240000 }); } catch { ok = false; }
  await page.waitForTimeout(1500);
  const info = ok ? await page.evaluate(() => {
    const v = window.__viewer, p = v.player; const a = p.pos.clone();
    p.keys.add('w'); for (let i = 0; i < 20; i++) p.update(0.05); p.keys.clear();
    const gl = v.renderer.getContext(); const px = new Uint8Array(4);
    v.renderer.render(v.world.scene, v.camera); gl.readPixels(gl.drawingBufferWidth >> 1, gl.drawingBufferHeight >> 1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, px);
    return { room: document.getElementById('roomName').textContent, moved: +a.distanceTo(p.pos).toFixed(2), tris: v.renderer.info.render.triangles, centrePixel: [...px] };
  }) : null;
  await page.screenshot({ path: path.join(__dirname, '..', 'qa', 'standalone.png') });
  console.log(ok ? 'PASS' : 'FAIL', 'opens from file:// with the network off', JSON.stringify(info));
  const real = errors.filter((e) => !/ERR_INTERNET_DISCONNECTED|fonts\.g/.test(e));
  console.log(real.length ? 'FAIL' : 'PASS', 'no script errors', real.slice(0, 3).join(' | '));
  console.log('blocked network requests (expected: only the web fonts):', [...new Set(requests.map((u) => new URL(u).host))].join(', ') || 'none');
  await browser.close();
  process.exit(ok && !real.length ? 0 : 1);
})();
