// Headless checks: the model drive must pass clean, and every rule must be caught when it is broken.
//   node test.cjs [screenshot-dir]
const { chromium, devices } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1100, height: 700 } });
  const errs = []; page.on('pageerror', (e) => errs.push(e.message)); page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
  const url = 'file://' + path.join(__dirname, 'index.html');
  await page.goto(url); await page.waitForTimeout(300);
  const r = await page.evaluate(() => {
    const { G, update, newExam } = window.__game;
    const tick = () => update(1 / 120);
    const drive = (cheat, opts = {}) => {
      for (const id of ['ckBelt', 'ckMir', 'ckLight']) document.getElementById(id).checked = !opts.noChecks;
      newExam(false, true); G.cheat = cheat || null; let maxV = 0;
      while (G.mode === 'drive' && G.t < 420) { tick(); maxV = Math.max(maxV, G.car.v); }
      const o = { mode: G.mode, t: Math.round(G.t), leg: G.leg, minors: [...G.minors], crits: [...G.crits], stalls: G.stalls, maxKmh: Math.round(maxV * 3.6) };
      G.cheat = null; return o;
    };
    const out = {};
    out.clean = drive();
    out.noChecks = drive(null, { noChecks: true });
    out.noYield = drive({ noYield: true });
    out.noYield1 = drive({ noYield: true, leg: 1 });
    out.noYield3 = drive({ noYield: true, leg: 3 });
    out.noYield6 = drive({ noYield: true, leg: 6 });
    out.noStop = drive({ noStop: true, noYield: true, leg: 4 });
    out.noRed = drive({ noRed: true });
    out.noPed = drive({ noPed: true });
    out.fast = (() => { newExam(false, false); const c = G.car; c.engine = true; c.rpm = 2000; G.movedOff = true; c.x = 1.75; c.y = 40; c.gear = 3; c.locked = true; c.v = 15.3; G.keys = { ArrowUp: true }; for (let i = 0; i < 300; i++) { c.v = 15.3; tick(); } const m = [...G.minors]; c.v = 18; tick(); tick(); return { minors: m, crits: [...G.crits] }; })();
    out.noSignal = drive({ noSignal: true, noMirror: true });
    // a human who lets the clutch up in 3rd gear with no gas, then one who brakes to a stop in gear
    const human = (script) => { for (const id of ['ckBelt', 'ckMir', 'ckLight']) document.getElementById(id).checked = true; newExam(false, false); const c = G.car; script(c); return { minors: [...G.minors], crits: [...G.crits], engine: c.engine, gear: c.gear, v: +c.v.toFixed(2), mode: G.mode }; };
    const run = (sec, keys) => { G.keys = keys; for (let i = 0; i < sec * 120; i++) tick(); };
    out.stallIn3rd = human((c) => { run(0.5, { ' ': true }); c.engine = true; c.rpm = 850; c.gear = 3; run(4, {}); });
    out.grind = human((c) => { c.engine = true; c.rpm = 850; run(0.2, {}); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e' })); });
    out.launchOK = human((c) => { run(0.5, { ' ': true }); c.engine = true; c.rpm = 850; c.gear = 1; G.mirrorT = G.t; c.ind = 'L'; run(4, { ArrowUp: true }); });
    out.stopInGear = human((c) => { run(0.5, { ' ': true }); c.engine = true; c.rpm = 850; c.gear = 1; G.mirrorT = G.t; c.ind = 'L'; run(3, { ArrowUp: true }); run(4, { ArrowDown: true }); });
    out.offroad = human((c) => { run(0.5, { ' ': true }); c.engine = true; c.rpm = 850; c.gear = 1; G.mirrorT = G.t; c.ind = 'L'; run(6, { ArrowUp: true, ArrowRight: true }); });
    out.wrongWay = human((c) => { run(0.5, { ' ': true }); c.engine = true; c.rpm = 850; c.gear = 1; G.mirrorT = G.t; c.ind = 'L'; G.movedOff = true; G.leg = 1; window.__game.checkpoint(); G.zeb.forEach((z) => (z.done = true)); G.scn[1].on = G.scn[1].npc = true; c.gear = 1; c.cl = 1; run(0.3, { ' ': true });
      // drive straight on at the junction where the examiner asked for a right turn
      let n = 0; while (!G.minors.includes('route') && G.mode === 'drive' && n++ < 120 * 40) { G.keys = c.v < 6 ? { ArrowUp: true } : {}; tick(); } return; });
    return out;
  });
  const exp = [
    ['model drive passes with no faults', r.clean.mode === 'result' && !r.clean.crits.length && !r.clean.minors.length, r.clean],
    ['skipped checklist = 3 minor faults', r.noChecks.minors.join() === 'belt,adjust,lights', r.noChecks.minors],
    ['not giving way is caught (priority from the right)', r.noYield.crits[0] === 'right' && r.noYield.leg === 0, r.noYield],
    ['rolling through STOP is caught', r.noStop.crits[0] === 'nostop' && r.noStop.leg === 4, r.noStop],
    ['red light is caught', r.noRed.crits[0] === 'red' && r.noRed.leg === 2, r.noRed],
    ['pedestrian on the crossing is caught', r.noPed.crits[0] === 'ped' && r.noPed.leg === 1, r.noPed],
    ['55 km/h in a 50 is a minor fault, 65 km/h ends the exam', r.fast.minors.includes('speed') && r.fast.crits[0] === 'speed', r.fast],
    ['not giving way at the give-way sign is caught', r.noYield1.crits[0] === 'giveway' && r.noYield1.leg === 1, r.noYield1],
    ['turning left across oncoming traffic is caught', r.noYield3.crits[0] === 'oncoming' && r.noYield3.leg === 3, r.noYield3],
    ['priority from the right when turning left is caught', r.noYield6.crits[0] === 'right' && r.noYield6.leg === 6, r.noYield6],
    ['missing signal and mirror are minor faults', r.noSignal.minors.includes('signal') && r.noSignal.minors.includes('mirror') && !r.noSignal.crits.length, r.noSignal.minors],
    ['clutch up in 3rd with no gas stalls', r.stallIn3rd.minors.includes('stall') && !r.stallIn3rd.engine, r.stallIn3rd],
    ['gear change without clutch is refused', r.grind.minors.includes('grind') && r.grind.gear === 0, r.grind],
    ['1st gear + gas + clutch up moves off without stalling', r.launchOK.v > 3 && !r.launchOK.minors.includes('stall'), r.launchOK],
    ['braking to a stop in gear stalls', r.stopInGear.minors.includes('stall'), r.stopInGear],
    ['leaving the road ends the exam', r.offroad.crits[0] === 'offroad', r.offroad],
    ['ignoring the direction puts you back with a minor fault', r.wrongWay.minors.includes('route') && r.wrongWay.mode === 'drive', r.wrongWay],
  ];
  let bad = 0; for (const [name, ok, info] of exp) { if (!ok) bad++; console.log((ok ? 'PASS ' : 'FAIL ') + name + (ok ? '' : '  ' + JSON.stringify(info))); }
  console.log('page errors:', errs.length ? errs.slice(0, 4) : 'none');
  const dir = process.argv[2];
  if (dir) {
    const snap = async (pg, name, t, leg) => { await pg.evaluate(([t]) => { const { G, update, newExam } = window.__game; newExam(true); while (G.t < t && G.mode === 'drive') update(1 / 120); }, [t]); await pg.waitForTimeout(250); await pg.screenshot({ path: `${dir}/${name}.png` }); };
    await page.reload(); await page.waitForTimeout(600); await page.screenshot({ path: `${dir}/menu.png` });
    await snap(page, 'd_j1', 14.5); await snap(page, 'd_zebra', 26.5); await snap(page, 'd_lights', 51); await snap(page, 'd_stop', 90);
    const ctx = await browser.newContext({ ...devices['iPhone 13'] }); const ph = await ctx.newPage(); await ph.goto(url); await ph.waitForTimeout(600);
    await ph.screenshot({ path: `${dir}/p_menu.png` }); await snap(ph, 'p_zebra', 26.5); await snap(ph, 'p_left', 70);
    await ctx.close();
  }
  await browser.close(); process.exit(bad || errs.length ? 1 : 0);
})();
