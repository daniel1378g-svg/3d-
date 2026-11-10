// Behaviour checks of the built viewer in headless Chromium (logic stepped directly, so they do not depend on frame rate).
//   node scripts/test-interactions.cjs
const { chromium } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', process.env.SHOT_ROOT || 'dist');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.glb': 'model/gltf-binary', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok }); console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail ? '  — ' + detail : '')); };

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const url = `http://127.0.0.1:${server.address().port}/${process.env.SHOT_PAGE || 'index.html'}`;
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--use-gl=angle', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, locale: 'pt-PT' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  await page.goto(url);
  await page.waitForFunction(() => document.getElementById('app').dataset.state === 'ready', null, { timeout: 240000 });
  check('loads and reaches the ready state', true);
  check('enter button enabled after load', await page.evaluate(() => !document.getElementById('btnEnter').disabled));
  await page.click('#btnEnter');
  await page.waitForFunction(() => document.getElementById('app').dataset.state === 'run');
  check('enter switches to walking', await page.evaluate(() => window.__viewer.state.mode === 'walk'));
  check('starts in the circulation hall', await page.waitForFunction(() => document.getElementById('roomName').textContent === 'Zona de Circulação', null, { timeout: 20000 }).then(() => true, () => false));

  // walking forward moves the visitor; a wall stops them
  const walk = await page.evaluate(() => {
    const v = window.__viewer, p = v.player;
    v.goTo('CIRC'); const a = p.pos.clone();
    p.keys.add('w'); for (let i = 0; i < 40; i++) p.update(0.05); p.keys.clear();
    const b = p.pos.clone();
    // now face the north wall of the hall and push into it for 6 s
    p.set(28.5 - 26, 19.0 - 23, 0); p.keys.add('w'); for (let i = 0; i < 120; i++) p.update(0.05); p.keys.clear();
    return { moved: a.distanceTo(b), z: p.pos.y };
  });
  check('W walks forward', walk.moved > 2, `${walk.moved.toFixed(2)} m in 2 s`);
  check('walls stop the visitor', walk.z > (17.174 - 23) + 0.2 && walk.z < (18.0 - 23), `stopped at plan y = ${(walk.z + 23).toFixed(2)} (wall face at 17.17)`);

  // furniture blocks: walk from the canteen door straight into the first table
  const furn = await page.evaluate(() => {
    const p = window.__viewer.player;
    p.set(24.5 - 26, 24.2 - 23, 180); p.keys.add('w'); for (let i = 0; i < 120; i++) p.update(0.05); p.keys.clear();
    return p.pos.y + 23;
  });
  check('furniture blocks walking', furn < 25.0, `stopped at plan y = ${furn.toFixed(2)} (table edge at 24.85)`);

  // doors swing open on approach and close again
  const door = await page.evaluate(async () => {
    const v = window.__viewer; const leaves = v.world.doors.get('D19');
    v.player.set(29.6 - 26, 18.2 - 23, -90);
    await new Promise((r) => setTimeout(r, 3500));
    const open = leaves[0].t;
    v.player.set(24.4 - 26, 19.9 - 23, -90);
    await new Promise((r) => setTimeout(r, 4000));
    return { open, closed: leaves[0].t, n: v.world.doors.size };
  });
  check('door opens when the visitor is near', door.open > 0.5, `opening ${(door.open * 100).toFixed(0)}% after 3.5 s, ${door.n} door sets`);
  check('door closes when the visitor leaves', door.closed < door.open, `${(door.closed * 100).toFixed(0)}%`);

  // walking through an open door ends up in the next room
  const through = await page.evaluate(() => {
    const p = window.__viewer.player;
    p.set(29.4 - 26, 18.215 - 23, -90); p.keys.add('w'); for (let i = 0; i < 60; i++) p.update(0.05); p.keys.clear();
    return p.pos.x + 26;
  });
  check('doorways are walkable', through > 31.0, `reached plan x = ${through.toFixed(2)} (door at 30.39)`);

  // the hygiene bench between changing room and transition room can be stepped over
  const bench = await page.evaluate(() => {
    const p = window.__viewer.player;
    p.set(43.4 - 26, 14.66 - 23, -90); p.keys.add('w'); let maxOff = 0;
    for (let i = 0; i < 70; i++) { p.update(0.05); maxOff = Math.max(maxOff, p.eyeOffset); } p.keys.clear();
    return { x: p.pos.x + 26, maxOff };
  });
  check('step-over bench is crossable', bench.x > 45.0 && bench.maxOff > 0.1, `reached x = ${bench.x.toFixed(2)}, eye rose ${(bench.maxOff * 100).toFixed(0)} cm`);

  // guided tour: runs the whole path without leaving the building or entering a wall
  const tour = await page.evaluate(() => {
    const v = window.__viewer, t = v.tour, p = v.player, col = p.col;
    v.startTour(); let steps = 0, blocked = 0, rooms = new Set();
    const caps = []; const old = t.onCaption; t.onCaption = (s) => { caps.push(s.room); old(s); };
    while (t.active && steps < 20000) { t.update(0.05); steps++; if (!col.free(p.pos.x, p.pos.y, 0.1)) blocked++; }
    return { len: t.len, steps, blocked, caps: caps.length, done: !t.active };
  });
  check('guided tour completes', tour.done && tour.len > 150, `${tour.len.toFixed(0)} m, ${(tour.steps * 0.05 / 60).toFixed(1)} min, ${tour.caps} captions`);
  check('guided tour never crosses a wall or furniture', tour.blocked === 0, `${tour.blocked} blocked samples`);

  // rooms panel teleports
  await page.click('#btnRooms');
  await page.click('#roomList li[data-id="REF"] button');
  check('room list jumps to the canteen', await page.evaluate(() => document.getElementById('roomName').textContent) === 'Refeitório' || await page.waitForFunction(() => document.getElementById('roomName').textContent === 'Refeitório', null, { timeout: 8000 }).then(() => true, () => false));
  const count = await page.evaluate(() => document.querySelectorAll('#roomList li').length);
  check('room list covers the rooms of the plan', count >= 15, `${count} entries`);

  // model view hides the ceilings and comes back
  await page.click('#btnOverview');
  const ov = await page.evaluate(() => { const v = window.__viewer; return { mode: v.state.mode, hidden: v.world.hideInOverview.filter((o) => !o.visible).length, total: v.world.hideInOverview.length }; });
  check('model view lifts ceilings and lights', ov.mode === 'overview' && ov.hidden === ov.total && ov.total > 20, `${ov.hidden}/${ov.total} objects hidden`);
  await page.click('#btnOverview');
  check('back to walking restores them', await page.evaluate(() => window.__viewer.world.hideInOverview.every((o) => o.visible)));

  // language switch
  await page.click('#btnMenu'); await page.selectOption('#optLang', 'en');
  check('English interface', await page.evaluate(() => document.querySelector('#btnTour span').textContent) === 'Guided tour');
  check('English room gloss next to the plan name', (await page.evaluate(() => document.getElementById('roomMeta').textContent)).includes('Canteen'));
  check('no console errors', errors.filter((e) => !/404/.test(e)).length === 0, errors.slice(0, 3).join(' | '));

  await browser.close(); server.close();
  const failed = results.filter((r) => !r.ok).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  process.exit(failed ? 1 : 0);
})();
