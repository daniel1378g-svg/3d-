// Browser QA of the built site (BRIEF §13/§14), against dist/ served by the real server (server/, API off in proposal
// mode). Writes content/qa/report.json and screenshots content/qa/<lang>/<page>-<width>.jpg (viewport, not full page).
//
//   every route × locale    HTTP 200, no console errors, axe-core (WCAG 2.2 AA tags) critical/serious = 0,
//                           no German on en/fr/it pages (text outside lang="de" elements), third-party requests and
//                           cookies counted, screenshots at 360×800, 768×1024 and 1440×900
//   language switch         duration (click → logo settled), CLS during the switch, state kept (page, ?m, ?q, scroll
//                           section, reservation draft), back returns to the previous language, reduced-motion crossfade
//   reservation             Wednesdays and 01.11.–17.12.2026 not selectable, first free day 18.12.2026, mailto + tel
//   keyboard                skip link first, language panel opens/closes with Enter/Escape, focus returns, focus ring
//   no JavaScript           menus, hours, phone, the reservation form and the legal pages are in the HTML
//   no WebGL / reduced      the poster stays (no canvas painting)
//
// Usage: node scripts/browser-check.cjs [--no-shots] [--routes=de/home,en/menu]   (run `npm run build` first)
const { chromium } = require("playwright");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const root = path.join(__dirname, "..");
const args = process.argv.slice(2);
const SHOTS = !args.includes("--no-shots");
const PORT = 4391;
const BASE = `http://127.0.0.1:${PORT}`;
const AXE = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
const QA = path.join(root, "content/qa");

// routes from the built site itself: every dist/<lang>/**/index.html
const LANGS = ["de", "en", "fr", "it"];
function routes() {
  const out = [];
  for (const lang of LANGS) {
    const walk = (dir) => {
      for (const name of fs.readdirSync(dir)) {
        const p = path.join(dir, name);
        if (fs.statSync(p).isDirectory()) walk(p);
        else if (name === "index.html") out.push({ lang, url: "/" + path.relative(path.join(root, "dist"), path.dirname(p)).split(path.sep).join("/") });
      }
    };
    walk(path.join(root, "dist", lang));
  }
  return out;
}
const slugName = (url) => (url.split("/").slice(2).join("-") || "home").replace(/[^a-z0-9-]/gi, "_");

// German words that never belong in an EN/FR/IT sentence (dish names carry lang="de"/"it" and are skipped)
// («des», «die», «den» etc. are also French/English words and are not listed)
const GERMAN = /\b(und|oder|nicht|wir|Sie|Ihre?n?|mit|für|auf|bei|vom|zum|zur|der|das|dem|ist|sind|werden|Uhr|Speisekarte|Tisch|Anfrage|Öffnungszeiten|Betriebsferien|Ruhetag)\b/g;

async function startServer() {
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "giardino-qa-"));
  const proc = spawn(process.execPath, ["--disable-warning=ExperimentalWarning", path.join(root, "dist-server/server.mjs")], {
    env: { ...process.env, PORT: String(PORT), HOST: "127.0.0.1", DIST_DIR: path.join(root, "dist"), DATA_DIR: data },
    stdio: ["ignore", "pipe", "pipe"],
  });
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`${BASE}/api/health`);
      if (r.ok) return proc;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  proc.kill();
  throw new Error("server did not start");
}

(async () => {
  const server = await startServer();
  const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const report = { date: new Date().toISOString(), routes: [], switch: {}, reservation: {}, keyboard: {}, nojs: {}, fallback: {}, totals: {} };
  const only = (args.find((a) => a.startsWith("--routes=")) || "").slice(9).split(",").filter(Boolean);
  const list = routes().filter((r) => !only.length || only.includes(`${r.lang}/${slugName(r.url)}`));
  const thirdParty = new Set();

  // ---- every route ---------------------------------------------------------------------------------------------
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, bypassCSP: true });
  for (const r of list) {
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    page.on("request", (q) => {
      const u = new URL(q.url());
      if (!["127.0.0.1", "localhost"].includes(u.hostname) && !u.protocol.startsWith("data")) thirdParty.add(`${u.hostname} (${r.url})`);
    });
    const res = await page.goto(BASE + r.url, { waitUntil: "networkidle" });
    await page.waitForTimeout(400);
    await page.addScriptTag({ content: AXE });
    const axe = await page.evaluate(async () => {
      const out = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] }, resultTypes: ["violations"] });
      return out.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, target: v.nodes[0]?.target?.join(" ") }));
    });
    let german = [];
    if (r.lang !== "de") {
      german = await page.evaluate((src) => {
        const re = new RegExp(src, "g");
        const hits = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          const el = n.parentElement;
          if (!el || el.closest("script,style,[hidden],.sr-only[aria-hidden='true']")) continue;
          const langEl = el.closest("[lang]");
          const l = (langEl?.getAttribute("lang") || "").toLowerCase();
          if (l.startsWith("de") || l === "pt") continue;
          const m = n.textContent.replace(/\S+\.(ch|com|de|org|net)\b\S*/g, "").match(re);
          if (m) hits.push(`${m.join(",")}: «${n.textContent.trim().slice(0, 80)}»`);
        }
        return hits;
      }, GERMAN.source);
    }
    const cookies = (await ctx.cookies()).length;
    report.routes.push({ url: r.url, status: res.status(), errors, axe, german, cookies });
    process.stdout.write(`${res.status() === 200 && !errors.length && !axe.some((v) => ["critical", "serious"].includes(v.impact)) && !german.length ? "·" : "✗"}`);
    await page.close();
  }
  await ctx.close();
  console.log("");

  // ---- screenshots -----------------------------------------------------------------------------------------------
  if (SHOTS) {
    for (const [w, h] of [[360, 800], [768, 1024], [1440, 900]]) {
      const c = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, reducedMotion: "reduce" });
      const page = await c.newPage();
      for (const r of list) {
        await page.goto(BASE + r.url, { waitUntil: "networkidle" });
        await page.waitForTimeout(250);
        const dir = path.join(QA, r.lang);
        fs.mkdirSync(dir, { recursive: true });
        await page.screenshot({ path: path.join(dir, `${slugName(r.url)}-${w}.jpg`), type: "jpeg", quality: 55 });
      }
      await c.close();
    }
  }

  const phase = async (name, fn) => {
    try {
      await fn();
    } catch (e) {
      (report.failures ??= []).push(`${name}: ${String(e.message || e).split("\n")[0]}`);
      console.log(`✗ ${name}: ${String(e.message || e).split("\n")[0]}`);
    }
  };
  // ---- language switch ---------------------------------------------------------------------------------------------
  await phase("language switch", async () => {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await c.newPage();
    await page.goto(`${BASE}/de/essen-geniessen?m=drinks&q=gin`, { waitUntil: "networkidle" });
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(500);
    await page.evaluate(() => {
      window.__shifts = [];
      new PerformanceObserver((l) => l.getEntries().forEach((e) => window.__shifts.push({ value: e.value, recent: e.hadRecentInput }))).observe({ type: "layout-shift", buffered: false });
      // timing measured in the page: click → logo carriage attached → removed (settled)
      window.__t = {};
      document.addEventListener("click", () => (window.__t.click ??= performance.now()), true);
      new MutationObserver(() => {
        const fx = document.querySelector(".langfx");
        if (fx && !window.__t.attached) window.__t.attached = performance.now();
        if (!fx && window.__t.attached && !window.__t.detached) window.__t.detached = performance.now();
      }).observe(document.body, { subtree: true, childList: true });
    });
    await page.click("#site-header .lang__btn");
    await page.waitForSelector(".lang__panel:not([hidden])");
    await page.waitForTimeout(300); // the dictionaries are prefetched while the panel is open
    await page.evaluate(() => (window.__t = {}));
    await page.click('.lang__panel a[hreflang="en"]');
    await page.waitForFunction(() => window.__t.detached, null, { timeout: 4000 });
    const timing = await page.evaluate(() => window.__t);
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => ({ url: location.pathname + location.search, q: document.querySelector("#menu-q")?.value, lang: document.documentElement.lang, shifts: window.__shifts, scrollY: window.scrollY, stored: localStorage.getItem("giardino-lang") }));
    await page.goBack();
    await page.waitForTimeout(700);
    const back = await page.evaluate(() => ({ url: location.pathname + location.search, lang: document.documentElement.lang }));
    report.switch = {
      durationMs: Math.round(timing.detached - timing.click),
      animationMs: Math.round(timing.detached - timing.attached),
      cls: after.shifts.filter((s) => !s.recent).reduce((n, s) => n + s.value, 0),
      clsIncludingInput: after.shifts.reduce((n, s) => n + s.value, 0),
      url: after.url,
      search: after.q,
      lang: after.lang,
      scrolled: after.scrollY > 300,
      remembered: after.stored,
      back,
      ok: after.url === "/en/eat-enjoy?m=drinks&q=gin" && after.q === "gin" && after.lang === "en" && back.url === "/de/essen-geniessen?m=drinks&q=gin",
    };
    // reservation draft survives a switch
    await page.goto(`${BASE}/de/reservation`, { waitUntil: "networkidle" });
    await page.waitForSelector('[data-day]:not([aria-disabled="true"])');
    await page.click('[data-day]:not([aria-disabled="true"])');
    const picked = await page.evaluate(() => JSON.parse(sessionStorage.getItem("giardino-reservation") || "{}").date);
    await page.click("#site-header .lang__btn");
    await page.click('.lang__panel a[hreflang="fr-CH"]');
    await page.waitForSelector(".langfx", { state: "detached", timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(500);
    const kept = await page.evaluate(() => ({ url: location.pathname, draft: JSON.parse(sessionStorage.getItem("giardino-reservation") || "{}").date, summary: document.querySelector(".summary dd")?.textContent }));
    report.switch.reservationKept = { picked, ...kept, ok: !!picked && kept.draft === picked && kept.url === "/fr/reservation" };
    await c.close();
    // reduced motion: a crossfade, no logo flight
    const rc = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const rp = await rc.newPage();
    await rp.goto(`${BASE}/de`, { waitUntil: "networkidle" });
    await rp.click("#site-header .lang__btn");
    const r0 = Date.now();
    await rp.click('.lang__panel a[hreflang="it-CH"]');
    await rp.waitForURL(`${BASE}/it`, { timeout: 3000 });
    report.switch.reduced = { ms: Date.now() - r0, logoFlight: (await rp.$(".langfx")) !== null, motionClass: await rp.evaluate(() => document.documentElement.classList.contains("motion-ok")) };
    await rc.close();
  });

  // ---- reservation rules (proposal mode: mailto/tel hand-off) -------------------------------------------------------
  await phase("reservation", async () => {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await c.newPage();
    await page.goto(`${BASE}/de/reservation`, { waitUntil: "networkidle" });
    await page.waitForSelector("[data-day]");
    const cal = await page.evaluate(() => {
      const days = [...document.querySelectorAll("[data-day]")].map((b) => ({ d: b.dataset.day, off: b.getAttribute("aria-disabled") === "true" }));
      return { days, month: document.querySelector(".cal__month")?.textContent };
    });
    const free = cal.days.filter((d) => !d.off).map((d) => d.d);
    const wed = cal.days.filter((d) => new Date(d.d + "T12:00:00Z").getUTCDay() === 3);
    report.reservation = {
      month: cal.month,
      firstFree: free[0],
      wednesdaysBlocked: wed.every((d) => d.off),
      closureBlocked: cal.days.filter((d) => d.d >= "2026-11-01" && d.d <= "2026-12-17").every((d) => d.off),
    };
    // walk the flow to the review step
    await page.click(`[data-day="${free[0]}"]`);
    await page.click(".resv__nav .btn:not(.btn--ghost)");
    await page.click(".resv__nav .btn:not(.btn--ghost)");
    await page.click('.slot:not([aria-disabled="true"])');
    await page.click(".resv__nav .btn:not(.btn--ghost)");
    await page.click(".resv__nav .btn:not(.btn--ghost)");
    await page.fill('.resv input[autocomplete="name"]', "Test Person");
    await page.fill('.resv input[autocomplete="tel"]', "+41 79 123 45 67");
    await page.click(".resv__nav .btn:not(.btn--ghost)");
    const review = await page.evaluate(() => ({
      mailto: document.querySelector('.resv a[href^="mailto:info@pizzeriagiardino.ch"]')?.getAttribute("href") ?? null,
      tel: !!document.querySelector('.resv a[href="tel:+41275300584"]'),
      text: document.querySelector(".resv__card")?.textContent ?? "",
    }));
    report.reservation.mailto = !!review.mailto && decodeURIComponent(review.mailto).includes("Test Person");
    report.reservation.tel = review.tel;
    report.reservation.confirmedWordInFlow = /bestätigt|confirmed|confirmée|confermata/i.test(review.text);
    await c.close();
  });

  // ---- keyboard ------------------------------------------------------------------------------------------------------
  await phase("keyboard", async () => {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await c.newPage();
    await page.goto(`${BASE}/de`, { waitUntil: "networkidle" });
    await page.keyboard.press("Tab");
    const first = await page.evaluate(() => document.activeElement?.className);
    const ring = await page.evaluate(() => {
      const s = getComputedStyle(document.activeElement);
      return s.outlineStyle !== "none" && parseFloat(s.outlineWidth) >= 2;
    });
    await page.focus("#site-header .lang__btn");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(150);
    const opened = await page.evaluate(() => !document.querySelector("#site-header .lang__panel").hidden && document.activeElement?.getAttribute("hreflang"));
    await page.keyboard.press("ArrowDown");
    const moved = await page.evaluate(() => document.activeElement?.getAttribute("hreflang"));
    await page.keyboard.press("Escape");
    const closed = await page.evaluate(() => document.querySelector("#site-header .lang__panel").hidden && document.activeElement?.classList.contains("lang__btn"));
    report.keyboard = { skipLinkFirst: /skip-link/.test(first || ""), focusRing: ring, panelOpensOnCurrent: opened, arrowMoves: moved, escapeClosesAndReturns: closed };
    await c.close();
  });

  // ---- without JavaScript --------------------------------------------------------------------------------------------
  await phase("no javascript", async () => {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
    const page = await c.newPage();
    const check = async (url, fn) => {
      await page.goto(BASE + url);
      return page.evaluate(fn);
    };
    report.nojs = {
      menu: await check("/de/essen-geniessen", () => document.querySelectorAll(".mrow").length),
      reservationForm: await check("/de/reservation", () => {
        const f = document.querySelector("form.nojs-form");
        return !!f && getComputedStyle(f).display !== "none" && f.getAttribute("action")?.startsWith("mailto:");
      }),
      hoursAndPhone: await check("/en/meta/arrival", () => !!document.querySelector(".hours") && !!document.querySelector('a[href="tel:+41275300584"]')),
      closureNotice: await check("/it", () => !!document.querySelector(".closure")),
      imprint: await check("/fr/mentions-legales", () => document.querySelector("main")?.textContent.includes("[Exploitant de l’aperçu]")),
    };
    await c.close();
  });

  // ---- no WebGL / reduced motion: the poster ---------------------------------------------------------------------
  await phase("fallbacks", async () => {
    const b2 = await chromium.launch({ args: ["--disable-gpu", "--disable-webgl", "--disable-3d-apis"] });
    const c = await b2.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await c.newPage();
    await page.goto(`${BASE}/de`, { waitUntil: "networkidle" });
    await page.waitForTimeout(3500);
    report.fallback.noWebgl = await page.evaluate(() => ({ poster: !!document.querySelector(".hero__branch img")?.complete, live: document.querySelector(".hero__branch")?.classList.contains("is-live") }));
    await b2.close();
    const rc = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const rp = await rc.newPage();
    await rp.goto(`${BASE}/de`, { waitUntil: "networkidle" });
    await rp.waitForTimeout(3500);
    report.fallback.reducedMotion = await rp.evaluate(() => ({ live: document.querySelector(".hero__branch")?.classList.contains("is-live"), motionOk: document.documentElement.classList.contains("motion-ok") }));
    await rc.close();
  });

  await browser.close();
  server.kill();

  // ---- summary ---------------------------------------------------------------------------------------------------
  const bad = report.routes.filter((r) => r.status !== 200 || r.errors.length);
  const axeBad = report.routes.filter((r) => r.axe.some((v) => ["critical", "serious"].includes(v.impact)));
  const germanBad = report.routes.filter((r) => r.german.length);
  report.totals = {
    routes: report.routes.length,
    httpOrConsoleErrors: bad.length,
    axeCriticalSerious: axeBad.length,
    axeOther: report.routes.reduce((n, r) => n + r.axe.filter((v) => !["critical", "serious"].includes(v.impact)).length, 0),
    germanHits: germanBad.reduce((n, r) => n + r.german.length, 0),
    thirdPartyRequests: [...thirdParty],
    cookies: Math.max(0, ...report.routes.map((r) => r.cookies)),
  };
  fs.mkdirSync(QA, { recursive: true });
  fs.writeFileSync(path.join(QA, "report.json"), JSON.stringify(report, null, 1));
  console.log(JSON.stringify({ totals: report.totals, switch: report.switch, reservation: report.reservation, keyboard: report.keyboard, nojs: report.nojs, fallback: report.fallback }, null, 1));
  for (const r of bad) console.log("✗", r.url, r.status, r.errors.slice(0, 3));
  for (const r of axeBad) console.log("✗ axe", r.url, r.axe.filter((v) => ["critical", "serious"].includes(v.impact)).map((v) => `${v.id}(${v.nodes}) ${v.target}`).join("; "));
  for (const r of germanBad) console.log("✗ german", r.url, r.german.slice(0, 4).join(" | "));
  process.exit(bad.length || axeBad.length || germanBad.length ? 1 : 0);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
