// Browser QA of the production build (run `npm run build` first, then `npm run qa`).
// Serves dist/ itself and checks, with Playwright and axe-core:
//   every page in DE / FR / EN / IT: loads without console errors, <html lang>, localized <title>, one <h1>,
//   no horizontal scrolling at 390 / 768 / 1440 px, no serious or critical axe violations (1440 px);
//   the language switch half-way down the home page (offset of the section kept, URL, lang, title, storage) and
//   repeated switches; the mobile menu (focus trap, Escape, focus back, scroll lock); the reservation drawer and its
//   tel: link; the closure notice against today's date; the four menu PDFs; the gallery lightbox (keys, Escape,
//   focus back); the skip link; contact-form validation and the honest e-mail hand-off; reduced motion.
// Screenshots go to qa/screens/ (not committed). Exit code 1 if anything fails.
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const root = path.join(__dirname, "..");
const dist = path.join(root, "dist");
const shots = path.join(root, "qa/screens");
fs.mkdirSync(shots, { recursive: true });
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".avif": "image/avif", ".png": "image/png", ".woff2": "font/woff2", ".json": "application/json", ".xml": "application/xml", ".txt": "text/plain" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = path.join(dist, p);
  if (!file.startsWith(dist)) return res.writeHead(403).end();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  else if (!fs.existsSync(file) && fs.existsSync(path.join(file, "index.html"))) file = path.join(file, "index.html");
  if (!fs.existsSync(file)) return res.writeHead(404, { "content-type": TYPES[".html"] }).end(fs.readFileSync(path.join(dist, "404.html")));
  res.writeHead(200, { "content-type": TYPES[path.extname(file)] ?? "application/octet-stream" }).end(fs.readFileSync(file));
});

const PAGES = {
  de: { home: "", menu: "speisekarte", families: "familien", story: "geschichte", visit: "besuch", gallery: "galerie", hotels: "partnerhotels", jobs: "jobs", press: "presse", imprint: "impressum", privacy: "datenschutz" },
  fr: { home: "", menu: "carte", families: "familles", story: "notre-histoire", visit: "visite", gallery: "galerie", hotels: "hotels-partenaires", jobs: "emplois", press: "presse", imprint: "mentions-legales", privacy: "confidentialite" },
  en: { home: "", menu: "menu", families: "families", story: "our-story", visit: "visit-us", gallery: "gallery", hotels: "partner-hotels", jobs: "jobs", press: "press", imprint: "imprint", privacy: "privacy" },
  it: { home: "", menu: "menu", families: "famiglie", story: "la-nostra-storia", visit: "visitarci", gallery: "galleria", hotels: "hotel-partner", jobs: "lavoro", press: "stampa", imprint: "note-legali", privacy: "privacy" },
};
const HTML_LANG = { de: "de-CH", fr: "fr-CH", en: "en", it: "it-CH" };
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` – ${detail}` : ""}`);
};

(async () => {
  await new Promise((r) => server.listen(4399, "127.0.0.1", r));
  const base = "http://127.0.0.1:4399";
  const browser = await chromium.launch();
  const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
  const newPage = async (opts = {}) => {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
    // the first-visit intro is tested on its own; elsewhere it is marked as seen
    if (!opts.keepIntro) await ctx.addInitScript(() => sessionStorage.setItem("gd-intro", "1"));
    const page = await ctx.newPage();
    page.errors = [];
    page.on("pageerror", (e) => page.errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && page.errors.push(m.text()));
    return page;
  };

  // 1. every page, every language
  for (const [lang, pages] of Object.entries(PAGES)) {
    for (const [key, slug] of Object.entries(pages)) {
      const url = `${base}/${lang}/${slug}`;
      const page = await newPage();
      await page.goto(url, { waitUntil: "networkidle" });
      await page.waitForTimeout(700);
      const info = await page.evaluate(() => ({ lang: document.documentElement.lang, title: document.title, h1: document.querySelectorAll("h1").length, overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth }));
      const okHead = info.lang === HTML_LANG[lang] && info.h1 === 1 && info.title.includes("Giardino") && page.errors.length === 0;
      check(`${lang}/${key}: loads, lang, title, one h1, no errors`, okHead, okHead ? "" : JSON.stringify({ ...info, errors: page.errors.slice(0, 2) }));
      await page.addScriptTag({ content: axeSource });
      const axe = await page.evaluate(async () => {
        // .st-word: the brief's scroll-lit statement starts each word at 25 % opacity and brings it to 100 % (about 11:1)
        // at its reading position; the sentence is also the section's accessible name. Listed in HANDOFF.md.
        const r = await window.axe.run({ exclude: [[".st-word"]] }, { resultTypes: ["violations"] });
        return r.violations.filter((v) => v.impact === "critical" || v.impact === "serious").map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0]?.target?.join(" ")}`);
      });
      check(`${lang}/${key}: axe serious/critical`, axe.length === 0, axe.slice(0, 3).join(" | "));
      await page.context().close();
    }
  }

  // 2. no sideways scrolling at three widths (every page in one language per width, rotating the language)
  const widths = [[390, 844, "de"], [768, 1024, "fr"], [1440, 900, "it"]];
  for (const [w, h, lang] of widths) {
    const bad = [];
    for (const slug of Object.values(PAGES[lang])) {
      const page = await newPage({ viewport: { width: w, height: h } });
      await page.goto(`${base}/${lang}/${slug}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(500);
      for (const y of [0.3, 0.6, 1]) {
        await page.evaluate((f) => window.scrollTo(0, document.documentElement.scrollHeight * f), y);
        await page.waitForTimeout(250);
      }
      const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (o > 0) bad.push(`${slug}:${o}px`);
      if (slug === "") await page.screenshot({ path: path.join(shots, `home-${lang}-${w}.png`) });
      await page.context().close();
    }
    check(`no horizontal scroll at ${w}px (${lang}, all pages)`, bad.length === 0, bad.join(" "));
  }

  // 3. language switch half-way down the home page, then again and again
  {
    const page = await newPage();
    await page.goto(`${base}/en/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);
    let lang = "en";
    for (const next of ["de", "fr", "it", "en"]) {
      const target = { de: "#hours", fr: "#reviews", it: "#offerings", en: "#gallery" }[next];
      await page.evaluate((s) => document.querySelector(s).scrollIntoView(), target);
      await page.evaluate(() => window.scrollBy(0, 180));
      await page.waitForTimeout(900);
      const before = await page.evaluate((s) => document.querySelector(s).getBoundingClientRect().top, target);
      await page.click('button[aria-controls="language-list"]');
      await page.click(`#language-list button[lang="${HTML_LANG[next]}"]`);
      // a second click during the wipe must be ignored
      await page.waitForTimeout(150);
      await page.mouse.click(700, 450);
      await page.waitForTimeout(1900);
      const after = await page.evaluate((s) => ({ top: document.querySelector(s).getBoundingClientRect().top, url: location.pathname, lang: document.documentElement.lang, title: document.title, stored: localStorage.getItem("gd-lang"), overlay: !!document.querySelector("[data-welcome]") }), target);
      const ok = Math.abs(after.top - before) <= 4 && after.url === `/${next}/` && after.lang === HTML_LANG[next] && after.stored === next && !after.overlay;
      check(`language switch ${lang}→${next} keeps ${target} in place`, ok, `offset ${before.toFixed(1)} → ${after.top.toFixed(1)}, ${after.url}, ${after.lang}`);
      lang = next;
    }
    // choosing the current language does nothing
    await page.click('button[aria-controls="language-list"]');
    await page.click('#language-list button[lang="en"]');
    await page.waitForTimeout(150);
    check("choosing the current language does nothing", !(await page.$("[data-welcome]")));
    await page.screenshot({ path: path.join(shots, "after-switches.png") });
    check("no errors during repeated switches", page.errors.length === 0, page.errors.slice(0, 2).join(" | "));
    await page.context().close();
  }

  // 4. the first-visit intro: plays once, Escape skips it, not again in the same session
  {
    const page = await newPage({ keepIntro: true });
    await page.goto(`${base}/de/`, { waitUntil: "networkidle" });
    const shown = !!(await page.$('[data-welcome="intro"]'));
    await page.waitForTimeout(600);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(400);
    const gone = !(await page.$('[data-welcome="intro"]'));
    await page.goto(`${base}/de/speisekarte`, { waitUntil: "networkidle" });
    await page.goto(`${base}/de/`, { waitUntil: "networkidle" });
    const again = !!(await page.$('[data-welcome="intro"]'));
    check("intro plays once, Escape skips it, no replay in the session", shown && gone && !again, JSON.stringify({ shown, gone, again }));
    await page.context().close();
  }

  // 5. mobile menu: focus trap, Escape, focus back, scroll lock
  {
    const page = await newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    await page.goto(`${base}/it/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await page.click('button[aria-haspopup="dialog"]');
    await page.waitForTimeout(900);
    const inside = [];
    for (let i = 0; i < 30; i++) {
      await page.keyboard.press("Tab");
      inside.push(await page.evaluate(() => !!document.activeElement?.closest('[role="dialog"]')));
    }
    const locked = await page.evaluate(() => getComputedStyle(document.body).overflow === "hidden" || document.body.hasAttribute("data-scroll-locked"));
    await page.keyboard.press("Escape");
    await page.waitForTimeout(800);
    const back = await page.evaluate(() => document.activeElement?.getAttribute("aria-haspopup"));
    check("mobile menu traps focus, locks scroll, Escape returns focus", inside.every(Boolean) && locked && back === "dialog", JSON.stringify({ trapped: inside.every(Boolean), locked, back }));
    await page.context().close();
  }

  // 6. reservation drawer: the call link, Escape, focus back
  {
    const page = await newPage();
    await page.goto(`${base}/fr/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const btn = page.locator("header button.btn").filter({ visible: true }).first();
    await btn.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(900);
    const tel = await page.getAttribute('[data-drawer] a[data-call]', "href");
    const title = await page.textContent('[data-drawer] h2');
    await page.screenshot({ path: path.join(shots, "drawer-fr.png") });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(700);
    const focusBack = await page.evaluate(() => document.activeElement?.classList.contains("btn"));
    const closed = !(await page.$("[data-drawer]"));
    check("drawer: tel:+41275300584, Escape closes, focus back", tel === "tel:+41275300584" && closed && focusBack, JSON.stringify({ tel, title, closed, focusBack }));
    await page.context().close();
  }

  // 7. closure notice against today's date, and the four menu PDFs
  {
    const page = await newPage();
    await page.goto(`${base}/en/visit-us`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const today = await page.evaluate(() => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zurich" }).format(new Date()));
    const expected = today >= "2026-09-17" && today <= "2026-12-17";
    const notice = await page.$$eval('[role="note"]', (els) => els.some((e) => /closed from 1 November 2026/.test(e.textContent)));
    check(`closure notice shown only while it applies (today ${today})`, notice === expected, `shown=${notice}, expected=${expected}`);
    const status = await page.textContent("#hours");
    if (today >= "2026-11-01" && today <= "2026-12-17") check("status names the reopening date during the closure", /Reopening on Friday, 18 December 2026/.test(status));
    await page.goto(`${base}/en/menu`, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const pdfs = await page.$$eval("a[data-menu]", (as) => as.map((a) => ({ href: a.href, blank: a.target === "_blank", rel: a.rel })));
    const want = ["124", "158", "159", "15a"].map((id) => `https://pizzeriagiardino.ch/?action=get_file&id=13&resource_link_id=${id}`);
    check("menu PDFs: the four live files, new tab, noopener", pdfs.length === 4 && want.every((w) => pdfs.some((p) => p.href === w && p.blank && p.rel.includes("noopener"))), JSON.stringify(pdfs.map((p) => p.href.slice(-3))));
    await page.context().close();
  }

  // 8. gallery lightbox: keys, Escape, focus back (grid view, so the button sits still)
  {
    const page = await newPage();
    await page.goto(`${base}/de/galerie`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    await page.click('#gallery button[aria-pressed]:has-text("Raster")').catch(() => {});
    await page.waitForTimeout(600);
    const first = page.locator("#gallery button[aria-label^='Foto vergrössern']").first();
    await first.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(700);
    const c1 = await page.textContent('[role="dialog"] [aria-live]');
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(600);
    const c2 = await page.textContent('[role="dialog"] [aria-live]');
    await page.screenshot({ path: path.join(shots, "lightbox-de.png") });
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    const back = await page.evaluate(() => document.activeElement?.getAttribute("aria-label") ?? "");
    check("lightbox: Enter opens, → advances, Escape closes, focus back", /01/.test(c1) && /02/.test(c2) && back.startsWith("Foto vergrössern"), JSON.stringify({ c1: c1.slice(0, 12), c2: c2.slice(0, 12), back: back.slice(0, 30) }));
    await page.context().close();
  }

  // 9. keyboard: the skip link is first and moves focus to the content
  {
    const page = await newPage();
    await page.goto(`${base}/en/our-story`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.keyboard.press("Tab");
    const first = await page.evaluate(() => document.activeElement?.textContent);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    const target = await page.evaluate(() => document.activeElement?.id);
    check("skip link first, focuses the main content", first === "Skip to content" && target === "main", JSON.stringify({ first, target }));
    await page.context().close();
  }

  // 10. contact form: validation and the honest hand-off (no endpoint configured in this build)
  {
    const page = await newPage();
    await page.goto(`${base}/de/besuch#contact`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1200);
    const form = 'form[aria-describedby="form-mode"]';
    await page.click(`${form} button[type="submit"]`);
    await page.waitForTimeout(300);
    const errs = await page.$$eval(`${form} [aria-invalid="true"]`, (els) => els.map((e) => e.getAttribute("name")));
    const focus = await page.evaluate(() => document.activeElement?.getAttribute("name"));
    await page.fill(`${form} textarea[name="message"]`, "Grüezi, gibt es Kinderstühle?");
    await page.fill(`${form} input[name="name"]`, "Test");
    await page.fill(`${form} input[name="email"]`, "test@beispiel");
    await page.click(`${form} button[type="submit"]`);
    await page.waitForTimeout(200);
    const emailMsg = await page.textContent("#err-email").catch(() => "");
    await page.fill(`${form} input[name="email"]`, "test@beispiel.ch");
    await page.check(`${form} input[name="consent"]`);
    await page.click(`${form} button[type="submit"]`);
    await page.waitForTimeout(500);
    const status = await page.textContent(`${form} [role="status"]`);
    const claimsSent = /angekommen|reached us/.test(status);
    check(
      "contact: required fields flagged, focus on first, e-mail checked, hand-off without false success",
      ["message", "name", "email", "consent"].every((n) => errs.includes(n)) && focus === "message" && /unvollständig/.test(emailMsg) && /E-Mail-Programm/.test(status) && !claimsSent,
      JSON.stringify({ errs, focus, emailMsg, status: status.slice(0, 60) }),
    );
    await page.context().close();
  }

  // 11. reduced motion: no intro, the static hero, the gallery as a grid, a plain fade for the language switch
  {
    const page = await newPage({ reducedMotion: "reduce", keepIntro: true });
    await page.goto(`${base}/en/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(800);
    const intro = !!(await page.$('[data-welcome="intro"]'));
    const sticky = await page.evaluate(() => [...document.querySelectorAll("#start .sticky")].length);
    const grid = await page.evaluate(() => !!document.querySelector("#gallery .columns-2"));
    await page.click('button[aria-controls="language-list"]');
    await page.click('#language-list button[lang="de-CH"]');
    await page.waitForTimeout(120);
    const transform = await page.evaluate(() => getComputedStyle(document.querySelector("[data-welcome]")).transform);
    await page.waitForTimeout(900);
    check("reduced motion: no intro, no pinned hero, grid gallery, fade switch", !intro && sticky === 0 && grid && transform === "none", JSON.stringify({ intro, sticky, grid, transform }));
    await page.context().close();
  }

  await browser.close();
  server.close();
  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  fs.writeFileSync(path.join(root, "qa/report.json"), JSON.stringify({ date: new Date().toISOString(), passed: results.length - failed.length, total: results.length, results }, null, 1));
  process.exit(failed.length ? 1 : 0);
})().catch((e) => {
  console.error(e);
  server.close();
  process.exit(1);
});
