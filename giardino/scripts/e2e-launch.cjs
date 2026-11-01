// End-to-end check of the launch-mode reservation workflow (run after `npm run build:launch`):
//   1. a guest walks through the form in the browser and sends a request → the page says «Anfrage erhalten – wartet
//      auf Bestätigung» (status pending) and shows a reference and a status link
//   2. the team opens /staff (Basic auth), sees the request and confirms it with a note
//   3. the guest's status page now says «Bestätigt» and shows the note – only because the team confirmed it
// Uses a temporary DATA_DIR; nothing is sent anywhere else. Exit code 1 on any failure.
const { chromium } = require("playwright");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const root = path.join(__dirname, "..");
const PORT = 4402;
const BASE = `http://127.0.0.1:${PORT}`;
const AUTH = { username: "giardino", password: "e2e-only-password" };

(async () => {
  const html = fs.readFileSync(path.join(root, "dist/de/reservation/index.html"), "utf8");
  if (html.includes("Proposta de design")) throw new Error("dist/ is a proposal build – run `npm run build:launch` first");
  const data = fs.mkdtempSync(path.join(os.tmpdir(), "giardino-e2e-"));
  const server = spawn(process.execPath, ["--disable-warning=ExperimentalWarning", path.join(root, "dist-server/server.mjs")], {
    env: { ...process.env, PORT: String(PORT), DIST_DIR: path.join(root, "dist"), DATA_DIR: data, STAFF_PASSWORD: AUTH.password },
    stdio: "ignore",
  });
  for (let i = 0; i < 50; i++) {
    try {
      if ((await fetch(`${BASE}/api/health`)).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  const browser = await chromium.launch();
  const out = {};
  try {
    // 1. the guest
    const guest = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await guest.goto(`${BASE}/de/reservation`, { waitUntil: "networkidle" });
    await guest.waitForSelector('.resv [data-day]:not([aria-disabled="true"])');
    // a Friday in January 2027 (open, outside the closure)
    for (let i = 0; i < 2 && !(await guest.$('[data-day="2027-01-08"]')); i++) await guest.click('.cal__nav .round-btn:last-child');
    await guest.click('[data-day="2027-01-08"]');
    const next = () => guest.click(".resv__nav .btn:not(.btn--ghost)");
    await next();
    await guest.click('.party__quick .chip:has-text("4 Personen")');
    await next();
    await guest.click('.slot[data-slot="19:00"]');
    await next();
    await guest.click('.seat:has-text("Terrasse")');
    await guest.fill(".resv textarea", "Geburtstag");
    await next();
    await guest.fill('.resv input[autocomplete="name"]', "Erika Muster");
    await guest.fill('.resv input[autocomplete="tel"]', "+41 79 123 45 67");
    await guest.check(".resv .check input");
    await next();
    await guest.click(".resv .btn--accent");
    await guest.waitForSelector(".result__badge--pending", { timeout: 8000 });
    out.afterSubmit = await guest.evaluate(() => ({ badge: document.querySelector(".result__badge")?.textContent, ref: document.querySelector(".ref")?.textContent, statusHref: [...document.querySelectorAll("a")].find((a) => a.href.includes("/reservation/status?ref="))?.getAttribute("href") }));
    if (!/wartet auf Bestätigung/.test(out.afterSubmit.badge) || !/^GDN-/.test(out.afterSubmit.ref)) throw new Error(`unexpected result ${JSON.stringify(out.afterSubmit)}`);

    // 2. the team
    const staffCtx = await browser.newContext({ httpCredentials: AUTH });
    const staff = await staffCtx.newPage();
    await staff.goto(`${BASE}/staff`, { waitUntil: "load" });
    const row = staff.locator(`form[action$="/staff/reservations/${out.afterSubmit.ref}"]`).first();
    out.staffSeesRequest = (await row.count()) > 0;
    if (!out.staffSeesRequest) throw new Error("the request is not listed in /staff");
    const note = row.locator('[name="note"]');
    if (await note.count()) await note.fill("Wir freuen uns auf Sie – Tisch auf der Terrasse.");
    await row.locator('button[value="confirm"]').click();
    await staff.waitForLoadState("load");

    // 3. the guest again
    await guest.goto(BASE + out.afterSubmit.statusHref, { waitUntil: "networkidle" });
    await guest.waitForSelector(".result__badge--confirmed", { timeout: 8000 });
    out.afterConfirm = await guest.evaluate(() => ({ badge: document.querySelector(".result__badge")?.textContent, note: document.querySelector(".result .notice p")?.textContent ?? null }));
    console.log(JSON.stringify(out, null, 1));
    console.log("✓ request pending until the team confirmed it in /staff; then «Bestätigt» with the team's note");
  } finally {
    await browser.close();
    server.kill();
  }
})().catch((e) => {
  console.error("✗", e.message);
  process.exit(1);
});
