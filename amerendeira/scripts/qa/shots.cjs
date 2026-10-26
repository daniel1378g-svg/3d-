// QA screenshots: intro phases, film progress and every section, at a given viewport.
// node scripts/qa/shots.cjs <outDir> <width> <height> [--mobile] [--reduced] [--no-intro]
const { chromium } = require("playwright");
const fs = require("fs");
const [out, W, H] = [process.argv[2], +process.argv[3], +process.argv[4]];
const mobile = process.argv.includes("--mobile");
const reduced = process.argv.includes("--reduced");
const noIntro = process.argv.includes("--no-intro");
const base = process.env.BASE || "http://localhost:3000/";
fs.mkdirSync(out, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile, reducedMotion: reduced ? "reduce" : "no-preference" });
  const p = await ctx.newPage();
  const logs = [];
  p.on("console", (m) => { if (["error", "warning"].includes(m.type())) logs.push(`${m.type()}: ${m.text()}`); });
  p.on("pageerror", (e) => logs.push(`pageerror: ${e.message}`));
  if (noIntro) await p.addInitScript(() => sessionStorage.setItem("mrd:intro", "1"));
  // The opening is slowed 5× through the DevTools protocol so each phase can be captured
  // at its real composition (screenshots take longer than the phases themselves).
  const RATE = 0.2;
  const cdp = await ctx.newCDPSession(p);
  await cdp.send("Animation.enable");
  await cdp.send("Animation.setPlaybackRate", { playbackRate: RATE });
  await p.goto(base, { waitUntil: "commit" });
  const tag = `${W}x${H}${reduced ? "-reduced" : ""}`;
  if (!noIntro && !reduced) {
    for (const t of [300, 900, 1500, 2100, 2700, 3400]) {
      // page time is scaled: an animation moment t (ms) happens at about t / RATE
      await p.waitForFunction((ms) => performance.now() >= ms, t / RATE, { timeout: 60000, polling: 50 }).catch(() => {});
      await p.screenshot({ path: `${out}/${tag}-intro-${t}.png` });
    }
  }
  await cdp.send("Animation.setPlaybackRate", { playbackRate: 1 });
  if (noIntro || reduced) {
    await p.waitForTimeout(1500);
  }
  await p.waitForLoadState("networkidle").catch(() => {});
  await p.waitForTimeout(1500);
  const info = await p.evaluate(() => {
    const t = document.querySelector(".film__track");
    return { track: t ? t.offsetHeight : 0, vh: innerHeight, total: document.documentElement.scrollHeight, hasIntro: document.documentElement.className };
  });
  const range = info.track - info.vh;
  const film = reduced ? [0] : [0, 0.08, 0.2, 0.36, 0.52, 0.7, 0.9, 1];
  for (const pr of film) {
    await p.evaluate((y) => window.scrollTo(0, y), Math.round(pr * range));
    await p.waitForTimeout(1300);
    await p.screenshot({ path: `${out}/${tag}-film-${String(Math.round(pr * 100)).padStart(3, "0")}.png` });
  }
  // sections
  const ids = ["tradicao", "Lojas", "ambiente", "flavour-title", "fire-title", "menus", "Media", "galeria", "contact"];
  for (const id of ids) {
    const y = await p.evaluate((id) => { const el = document.getElementById(id); if (!el) return null; const s = el.closest("section,footer") || el; return s.getBoundingClientRect().top + scrollY; }, id);
    if (y === null) { logs.push("missing #" + id); continue; }
    for (const [k, off] of [["a", 0], ["b", 0.85]]) {
      await p.evaluate((yy) => window.scrollTo(0, yy), Math.round(y + off * info.vh));
      await p.waitForTimeout(900);
      await p.screenshot({ path: `${out}/${tag}-sec-${id}-${k}.png` });
    }
  }
  fs.writeFileSync(`${out}/${tag}-log.json`, JSON.stringify({ info, logs }, null, 1));
  console.log(tag, JSON.stringify(info), logs.length ? logs.slice(0, 15) : "no console errors");
  await b.close();
})();
