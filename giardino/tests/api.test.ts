// The launch-mode server end to end: reservation requests, status, staff review, messages, the no-JavaScript forms,
// rate limits, retention, static serving with redirects and the security headers. Each server runs on a free port
// with its own temporary data and site folders and a controllable clock.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, statSync, writeFileSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { gunzipSync } from "node:zlib";
import { createServer as createHttpServer, request, type IncomingMessage, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { createServer, type App } from "../server/app.ts";
import { DEFAULT_LIMITS, fromEnv } from "../server/config.ts";
import { clientIp } from "../server/http.ts";
import { PAGE_SLUGS } from "../server/strings.ts";
import { SLUGS } from "../src/routes.ts";

// ---------------------------------------------------------------------------------------------------------------
// fixtures

const tmp = mkdtempSync(join(tmpdir(), "giardino-test-"));
const INLINE = 'document.documentElement.classList.add("js")';
const INLINE_HASH = createHash("sha256").update(INLINE).digest("base64");
const LD = '{"@context":"https://schema.org","@type":"Restaurant"}';
const LD_HASH = createHash("sha256").update(LD).digest("base64");
const pageHtml = (title: string) =>
  `<!doctype html><html lang="de-CH"><head><title>${title}</title><script>${INLINE}</script><script type="application/ld+json">${LD}</script><script type="module" src="/assets/app-1234abcd.js"></script></head><body><h1>${title}</h1><!-- ${"padding ".repeat(120)} --></body></html>`;

function writeSite(dir: string) {
  const put = (rel: string, content: string | Buffer) => {
    mkdirSync(join(dir, rel, ".."), { recursive: true });
    writeFileSync(join(dir, rel), content);
  };
  put("index.html", pageHtml("Giardino"));
  put("de/index.html", pageHtml("Willkommen"));
  put("de/kids/index.html", pageHtml("Kids"));
  put("de/essen-geniessen/index.html", pageHtml("Essen & Geniessen"));
  put("fr/mentions-legales/index.html", pageHtml("Mentions légales"));
  put("404.html", "<!doctype html><title>404</title><h1>Seite nicht gefunden</h1>");
  put("assets/app-1234abcd.js", `console.log(${JSON.stringify("x".repeat(800))});`);
  put("images/photo-480.webp", Buffer.alloc(4096, 7));
  put(
    "_redirects",
    [
      "# old addresses",
      "/fr/empreinte  /fr/mentions-legales  301",
      "/de/allgemein/leukerbad-therme  https://www.leukerbad.ch/therme  301",
      "/de/essen-geniessen  action=get_file  id=13  resource_link_id=124  /menus/Speisekarte-Menu.pdf  301",
      "/  action=get_file  id=13  resource_link_id=158  /menus/Speisekarte-Kids.pdf  301!",
      "/de/home  /de  301",
    ].join("\n"),
  );
}

const dist = join(tmp, "dist");
writeSite(dist);

let clock = new Date("2026-11-01T12:00:00+01:00");
const logs: string[] = [];
const hooks: Record<string, unknown>[] = [];
let hookServer: Server;
let app: App;
let base = "";

const BIG = { max: 10_000, windowMs: 60_000 };
const AUTH = "Basic " + Buffer.from("giardino:test-pass").toString("base64");

type Res = { status: number; headers: IncomingMessage["headers"]; body: string; raw: Buffer };
function call(url: string, opts: { method?: string; headers?: Record<string, string>; body?: string | Buffer } = {}): Promise<Res> {
  const u = new URL(url);
  return new Promise((resolve, reject) => {
    const req = request(
      { host: u.hostname, port: u.port, path: url.slice(u.origin.length), method: opts.method ?? "GET", headers: opts.headers, agent: false },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (c: Buffer) => chunks.push(c));
        res.on("end", () => {
          const raw = Buffer.concat(chunks);
          resolve({ status: res.statusCode ?? 0, headers: res.headers, body: raw.toString("utf8"), raw });
        });
      },
    );
    req.on("error", reject);
    if (opts.body !== undefined) req.write(opts.body);
    req.end();
  });
}
const parse = (r: Res) => JSON.parse(r.body);
const postJson = (path: string, data: unknown, headers: Record<string, string> = {}) =>
  call(base + path, { method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(data) });
const postForm = (path: string, fields: [string, string][], headers: Record<string, string> = {}) =>
  call(base + path, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers }, body: new URLSearchParams(fields).toString() });

let keyCounter = 0;
const request1 = (patch: Record<string, unknown> = {}) => ({
  key: `test-key-${String(++keyCounter).padStart(8, "0")}`,
  date: "2027-01-08",
  time: "19:00",
  party: 4,
  children: 1,
  seating: "terrace",
  wishes: ["highchair"],
  notes: "Wir feiern einen Geburtstag",
  name: "Anna Muster",
  phone: "+41 79 123 45 67",
  email: "anna@example.ch",
  consent: true,
  lang: "de",
  website: "",
  ...patch,
});

async function listen(server: Server) {
  await new Promise<void>((r) => server.listen(0, "127.0.0.1", () => r()));
  return `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
}

before(async () => {
  hookServer = createHttpServer((req, res) => {
    const chunks: Buffer[] = [];
    req.on("data", (c: Buffer) => chunks.push(c));
    req.on("end", () => {
      hooks.push(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      res.end("ok");
    });
  });
  const hookBase = await listen(hookServer);
  app = createServer({
    dataDir: join(tmp, "data"),
    distDir: dist,
    staffPassword: "test-pass",
    staffToken: "test-token-0123456789",
    notifyWebhook: `${hookBase}/hook`,
    publicOrigin: "https://giardino.example",
    now: () => new Date(clock),
    limits: { reservations: BIG, messages: BIG, status: BIG, auth: BIG },
    log: (line) => logs.push(line),
  });
  base = await listen(app.server);
});

after(async () => {
  await app.close();
  await new Promise<void>((r) => hookServer.close(() => r()));
  rmSync(tmp, { recursive: true, force: true });
});

const csrfFrom = (htmlText: string) => /name="csrf" value="([^"]+)"/.exec(htmlText)?.[1] ?? "";
async function dashboardCsrf() {
  const r = await call(`${base}/staff?status=all`, { headers: { Authorization: AUTH } });
  assert.equal(r.status, 200);
  return csrfFrom(r.body);
}
const decide = (ref: string, fields: [string, string][], headers: Record<string, string> = { Origin: base }) =>
  postForm(`/staff/reservations/${ref}`, fields, { Authorization: AUTH, ...headers });

// ---------------------------------------------------------------------------------------------------------------
// API

test("health check and security headers on every response", async () => {
  const r = await call(`${base}/api/health`);
  assert.equal(r.status, 200);
  assert.deepEqual(parse(r), { ok: true });
  const csp = String(r.headers["content-security-policy"]);
  for (const part of ["default-src 'self'", "frame-ancestors 'none'", "base-uri 'self'", "form-action 'self'", "img-src 'self' data: https://i.ytimg.com", "frame-src https://www.openstreetmap.org https://www.youtube-nocookie.com https://my.matterport.com"]) {
    assert.ok(csp.includes(part), part);
  }
  assert.equal(r.headers["x-content-type-options"], "nosniff");
  assert.equal(r.headers["referrer-policy"], "strict-origin-when-cross-origin");
  assert.equal(r.headers["cross-origin-opener-policy"], "same-origin");
  assert.match(String(r.headers["permissions-policy"]), /camera=\(\).*microphone=\(\).*geolocation=\(\)/);
  assert.equal(r.headers["strict-transport-security"], "max-age=31536000", "PUBLIC_ORIGIN is https");
  assert.equal(r.headers["cache-control"], "no-store");
});

test("a request is stored as pending (201) – the server never confirms on its own", async () => {
  const data = request1();
  const r = await postJson("/api/reservations", data);
  assert.equal(r.status, 201);
  const body = parse(r);
  assert.match(body.ref, /^GDN-[A-Z0-9]{5}$/);
  assert.ok(typeof body.token === "string" && body.token.length >= 40);
  assert.equal(body.status, "pending");
  assert.equal(body.duplicate, false);
  const s = await call(`${base}/api/reservations/${body.ref}?token=${body.token}`);
  assert.equal(s.status, 200);
  const view = parse(s);
  assert.deepEqual(Object.keys(view).sort(), ["children", "createdAt", "date", "lang", "party", "ref", "seating", "staffNote", "status", "time", "updatedAt", "wishes"]);
  assert.equal(view.status, "pending");
  assert.equal(view.staffNote, null);
  assert.deepEqual([view.date, view.time, view.party, view.children, view.seating], ["2027-01-08", "19:00", 4, 1, "terrace"]);
  assert.deepEqual(view.wishes, ["highchair"]);
  assert.ok(!s.body.includes("Anna") && !s.body.includes("anna@example.ch") && !s.body.includes("79 123"), "no personal data in the status view");
  // the stored row
  const row = app.store.get(body.ref)!;
  assert.equal(row.name, "Anna Muster");
  assert.equal(row.email, "anna@example.ch");
  assert.notEqual(row.tokenHash, body.token, "only a hash of the token is stored");
  assert.equal(row.tokenHash, createHash("sha256").update(body.token).digest("hex"));
});

test("the same idempotency key returns the same request (200, duplicate)", async () => {
  const data = request1();
  const first = parse(await postJson("/api/reservations", data));
  const again = await postJson("/api/reservations", data);
  assert.equal(again.status, 200);
  const b = parse(again);
  assert.deepEqual(b, { ref: first.ref, token: first.token, status: "pending", duplicate: true });
  // even with different details, the key wins (a retried submit never creates a second request)
  const changed = parse(await postJson("/api/reservations", { ...data, time: "20:00" }));
  assert.equal(changed.ref, first.ref);
  assert.equal(app.store.list().filter((r) => r.key === data.key).length, 1);
});

test("published constraints are enforced (409 with codes)", async () => {
  const codes = async (patch: Record<string, unknown>) => {
    const r = await postJson("/api/reservations", request1(patch));
    assert.equal(r.status, 409, JSON.stringify(patch));
    return parse(r).codes;
  };
  assert.deepEqual(await codes({ date: "2027-01-06" }), ["date-weekly-closed"]);
  assert.deepEqual(await codes({ date: "2026-12-10" }), ["date-closure"]);
  assert.deepEqual(await codes({ date: "2026-10-31" }), ["date-past"]);
  assert.deepEqual(await codes({ party: 13 }), ["party-too-large"]);
  assert.deepEqual(await codes({ time: "16:00" }), ["time-outside-hours"]);
  assert.deepEqual(await codes({ time: "21:30" }), ["time-outside-hours"]);
  assert.deepEqual(await codes({ date: "2027-02-30" }), ["date-invalid"], "an impossible calendar day");
  assert.deepEqual(await codes({ date: "2027-12-01" }), ["date-beyond-horizon"]);
  assert.deepEqual(await codes({ party: "" }), ["party-invalid"]);
});

test("invalid fields are reported (422) and nothing is stored", async () => {
  const before = app.store.list().length;
  const fields = async (patch: Record<string, unknown>) => {
    const r = await postJson("/api/reservations", request1(patch));
    assert.equal(r.status, 422, JSON.stringify(patch));
    return parse(r).fields;
  };
  assert.deepEqual(await fields({ email: "anna@" }), { email: "email" });
  assert.deepEqual(await fields({ phone: "" }), { phone: "required" });
  assert.deepEqual(await fields({ consent: false }), { consent: "consent" });
  assert.deepEqual(await fields({ wishes: ["allergies"] }), { wishes: "invalid" });
  assert.deepEqual(await fields({ children: 9 }), { children: "childrenTooMany" });
  assert.deepEqual(await fields({ key: "short" }), { key: "invalid" });
  assert.deepEqual(await fields({ lang: "es" }), { lang: "invalid" });
  // honeypot: only the honeypot is reported, nothing is stored
  const bot = request1({ website: "https://spam.example" });
  assert.deepEqual(await fields({ website: "https://spam.example", key: bot.key }), { website: "invalid" });
  assert.equal(app.store.findByKey(bot.key), null);
  assert.equal(app.store.list().length, before);
  // optional e-mail
  const noMail = await postJson("/api/reservations", request1({ email: "" }));
  assert.equal(noMail.status, 201);
});

test("malformed bodies: 400, 413, 415", async () => {
  const bad = await call(`${base}/api/reservations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "{not json" });
  assert.equal(bad.status, 400);
  assert.deepEqual(parse(bad), { error: "bad-json" });
  const arr = await call(`${base}/api/reservations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: "[1,2]" });
  assert.equal(arr.status, 400);
  const big = await call(`${base}/api/reservations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ notes: "x".repeat(17 * 1024) }) });
  assert.equal(big.status, 413);
  const text = await call(`${base}/api/reservations`, { method: "POST", headers: { "Content-Type": "text/plain" }, body: "hello" });
  assert.equal(text.status, 415);
  const get = await call(`${base}/api/reservations`);
  assert.equal(get.status, 405);
  assert.equal(get.headers.allow, "POST");
  const unknown = await call(`${base}/api/nothing`);
  assert.equal(unknown.status, 404);
});

test("status: a wrong token and an unknown reference give the same 404", async () => {
  const { ref, token } = parse(await postJson("/api/reservations", request1()));
  const wrong = await call(`${base}/api/reservations/${ref}?token=${token.slice(0, -2)}xx`);
  const unknown = await call(`${base}/api/reservations/GDN-ZZZZZ?token=${token}`);
  const malformed = await call(`${base}/api/reservations/%E0%A4%A?token=x`);
  const missing = await call(`${base}/api/reservations/${ref}`);
  for (const r of [wrong, unknown, malformed, missing]) {
    assert.equal(r.status, 404);
    assert.equal(r.body, '{"error":"not-found"}');
  }
});

// ---------------------------------------------------------------------------------------------------------------
// staff review

test("staff area: Basic auth, dashboard with every detail, no caching or indexing", async () => {
  const { ref } = parse(await postJson("/api/reservations", request1({ name: "Bruno Beispiel", phone: "079 765 43 21" })));
  const anon = await call(`${base}/staff`);
  assert.equal(anon.status, 401);
  assert.match(String(anon.headers["www-authenticate"]), /^Basic realm="Giardino Personal"/);
  const wrong = await call(`${base}/staff`, { headers: { Authorization: "Basic " + Buffer.from("giardino:nope").toString("base64") } });
  assert.equal(wrong.status, 401);
  const ok = await call(`${base}/staff`, { headers: { Authorization: AUTH } });
  assert.equal(ok.status, 200);
  assert.match(String(ok.headers["content-type"]), /text\/html/);
  assert.equal(ok.headers["cache-control"], "no-store");
  assert.equal(ok.headers["x-robots-tag"], "noindex, nofollow");
  for (const s of [ref, "Bruno Beispiel", "079 765 43 21", "Terrasse", "Kinderstuhl", "Wir feiern einen Geburtstag", "Freitag, 8. Januar 2027", "Bestätigen", "Ablehnen"]) assert.ok(ok.body.includes(s), s);
  assert.ok(!/<script/i.test(ok.body), "no scripts in the staff area");
});

test("staff decisions need the same origin and a valid CSRF token; confirm shows on the guest's status", async () => {
  const { ref, token } = parse(await postJson("/api/reservations", request1()));
  const csrf = await dashboardCsrf();
  assert.ok(csrf.length > 20);
  const fields: [string, string][] = [["action", "confirm"], ["note", "Wir freuen uns auf Sie!"], ["csrf", csrf], ["back", "/staff?status=pending"]];
  assert.equal((await decide(ref, fields, {})).status, 403, "no Origin / Sec-Fetch-Site");
  assert.equal((await decide(ref, fields, { "Sec-Fetch-Site": "cross-site" })).status, 403);
  assert.equal((await decide(ref, fields, { Origin: "https://evil.example" })).status, 403);
  assert.equal((await decide(ref, [["action", "confirm"]])).status, 403, "missing CSRF token");
  assert.equal((await decide(ref, [["action", "confirm"], ["csrf", "forged"]])).status, 403);
  assert.equal(parse(await call(`${base}/api/reservations/${ref}?token=${token}`)).status, "pending", "nothing changed so far");
  const done = await decide(ref, fields);
  assert.equal(done.status, 303);
  assert.equal(done.headers.location, "/staff?status=pending");
  const view = parse(await call(`${base}/api/reservations/${ref}?token=${token}`));
  assert.equal(view.status, "confirmed");
  assert.equal(view.staffNote, "Wir freuen uns auf Sie!");
  const again = await decide(ref, fields, { "Sec-Fetch-Site": "same-origin" });
  assert.equal(again.status, 409, "already confirmed");
  const history = app.store.events(ref);
  assert.deepEqual(history.map((e) => [e.fromStatus, e.toStatus, e.actor]), [
    [null, "pending", "guest"],
    ["pending", "confirmed", "staff:giardino"],
  ]);
  // an unsafe «back» value falls back to the dashboard
  const other = parse(await postJson("/api/reservations", request1()));
  const r = await decide(other.ref, [["action", "decline"], ["csrf", csrf], ["back", "https://evil.example/"]]);
  assert.equal(r.headers.location, "/staff");
});

test("CSRF tokens are valid for today and yesterday only", async () => {
  const { ref } = parse(await postJson("/api/reservations", request1()));
  const csrf = await dashboardCsrf();
  const saved = clock;
  try {
    clock = new Date(saved.getTime() + 86_400_000);
    const tomorrow = await decide(ref, [["action", "confirm"], ["csrf", csrf]]);
    assert.equal(tomorrow.status, 303, "yesterday's token still works");
    const second = parse(await postJson("/api/reservations", request1({ date: "2027-01-09" })));
    clock = new Date(saved.getTime() + 2 * 86_400_000);
    const late = await decide(second.ref, [["action", "confirm"], ["csrf", csrf]]);
    assert.equal(late.status, 403, "a token from two days ago is refused");
  } finally {
    clock = saved;
  }
});

test("staff decline, guest cancellation and the allowed transitions", async () => {
  const csrf = await dashboardCsrf();
  const a = parse(await postJson("/api/reservations", request1()));
  assert.equal((await decide(a.ref, [["action", "decline"], ["note", "Leider sind wir ausgebucht."], ["csrf", csrf]])).status, 303);
  const va = parse(await call(`${base}/api/reservations/${a.ref}?token=${a.token}`));
  assert.deepEqual([va.status, va.staffNote], ["declined", "Leider sind wir ausgebucht."]);
  const cancelDeclined = await postJson(`/api/reservations/${a.ref}/cancel`, { token: a.token });
  assert.equal(cancelDeclined.status, 409);
  assert.deepEqual(parse(cancelDeclined), { error: "not-cancellable", status: "declined" });

  const b = parse(await postJson("/api/reservations", request1()));
  assert.equal((await postJson(`/api/reservations/${b.ref}/cancel`, { token: "wrong" })).status, 404);
  const cancelled = await postJson(`/api/reservations/${b.ref}/cancel`, { token: b.token });
  assert.equal(cancelled.status, 200);
  assert.deepEqual(parse(cancelled), { status: "cancelled" });
  assert.deepEqual(parse(await postJson(`/api/reservations/${b.ref}/cancel`, { token: b.token })), { status: "cancelled" }, "idempotent");
  assert.equal(parse(await call(`${base}/api/reservations/${b.ref}?token=${b.token}`)).status, "cancelled");
  assert.equal((await decide(b.ref, [["action", "confirm"], ["csrf", csrf]])).status, 409, "a cancelled request cannot be confirmed");

  const c = parse(await postJson("/api/reservations", request1()));
  assert.equal((await decide(c.ref, [["action", "confirm"], ["csrf", csrf]])).status, 303);
  assert.equal((await decide(c.ref, [["action", "cancel"], ["note", "Wegen Unwetter geschlossen."], ["csrf", csrf]])).status, 303);
  assert.equal(parse(await call(`${base}/api/reservations/${c.ref}?token=${c.token}`)).status, "cancelled");
  assert.equal((await decide("GDN-ZZZZZ", [["action", "confirm"], ["csrf", csrf]])).status, 404);
  assert.equal((await decide(c.ref, [["action", "approve"], ["csrf", csrf]])).status, 400);
});

test("JSON staff API with a Bearer token", async () => {
  const { ref } = parse(await postJson("/api/reservations", request1({ name: "Carla Test" })));
  assert.equal((await call(`${base}/api/staff/reservations`)).status, 401);
  assert.equal((await call(`${base}/api/staff/reservations`, { headers: { Authorization: "Bearer nope" } })).status, 401);
  const r = await call(`${base}/api/staff/reservations?status=pending`, { headers: { Authorization: "Bearer test-token-0123456789" } });
  assert.equal(r.status, 200);
  const row = parse(r).reservations.find((x: { ref: string }) => x.ref === ref);
  assert.equal(row.name, "Carla Test");
  assert.equal(row.status, "pending");
  assert.equal((await call(`${base}/api/staff/reservations?status=maybe`, { headers: { Authorization: "Bearer test-token-0123456789" } })).status, 400);
});

// ---------------------------------------------------------------------------------------------------------------
// contact messages

test("contact messages: 201, 422, the «town» alias and the staff list", async () => {
  const msg = { message: "Haben Sie im Dezember geöffnet?", name: "Dora Frage", address: "Dorfstrasse 1", town: "3954 Leukerbad", phone: "", email: "dora@example.ch", consent: true, lang: "de", website: "" };
  const r = await postJson("/api/messages", msg);
  assert.equal(r.status, 201);
  const { ok, ref } = parse(r);
  assert.equal(ok, true);
  assert.match(ref, /^MSG-[A-Z0-9]{5}$/);
  assert.equal(app.store.getMessage(ref)!.zipCity, "3954 Leukerbad");
  const missing = await postJson("/api/messages", { ...msg, email: "" });
  assert.equal(missing.status, 422);
  assert.deepEqual(parse(missing).fields, { email: "required" });
  assert.deepEqual(parse(await postJson("/api/messages", { ...msg, consent: false, message: "" })).fields, { message: "required", consent: "consent" });
  assert.deepEqual(parse(await postJson("/api/messages", { ...msg, phone: "12" })).fields, { phone: "phone" });
  assert.deepEqual(parse(await postJson("/api/messages", { ...msg, website: "x" })).fields, { website: "invalid" });
  const list = await call(`${base}/staff/messages`, { headers: { Authorization: AUTH } });
  assert.ok(list.body.includes("Haben Sie im Dezember geöffnet?") && list.body.includes(ref));
  const done = await postForm(`/staff/messages/${ref}`, [["action", "done"], ["csrf", csrfFrom(list.body)]], { Authorization: AUTH, Origin: base });
  assert.equal(done.status, 303);
  assert.equal(app.store.getMessage(ref)!.done, true);
});

// ---------------------------------------------------------------------------------------------------------------
// the no-JavaScript fallback forms

test("no-JS reservation form: HTML answer in the visitor's language with reference and status link", async () => {
  const fields: [string, string][] = [
    ["key", "ssr-placeholder-key-000"],
    ["date", "2027-01-08"],
    ["time", "12:30"],
    ["party", "2"],
    ["children", ""],
    ["seating", "inside"],
    ["wishes", "highchair"],
    ["wishes", "stroller"],
    ["notes", ""],
    ["name", "Élise Exemple"],
    ["phone", "+41 27 123 45 67"],
    ["email", ""],
    ["consent", "on"],
    ["lang", "fr"],
    ["website", ""],
  ];
  const r = await postForm("/api/reservations", fields);
  assert.equal(r.status, 200);
  assert.match(String(r.headers["content-type"]), /text\/html/);
  assert.ok(r.body.includes('<html lang="fr-CH">'));
  assert.ok(r.body.includes("Demande reçue – en attente de confirmation"));
  assert.ok(r.body.includes('href="tel:+41275300584"'));
  const ref = /GDN-[A-Z0-9]{5}/.exec(r.body)![0];
  const link = /href="(\/fr\/reservation\/statut\?ref=[^"]+)"/.exec(r.body)![1].replace(/&amp;/g, "&");
  const token = new URL(link, base).searchParams.get("token")!;
  const view = parse(await call(`${base}/api/reservations/${ref}?token=${encodeURIComponent(token)}`));
  assert.equal(view.status, "pending");
  assert.deepEqual(view.wishes, ["highchair", "stroller"]);
  assert.equal(app.store.get(ref)!.source, "form");
  // reloading the answer page re-posts: same request, marked as already received
  const again = await postForm("/api/reservations", fields);
  assert.ok(again.body.includes(ref));
  assert.ok(again.body.includes("Nous avons déjà reçu cette demande"));
  // the static placeholder key does not merge different guests
  const other = await postForm("/api/reservations", fields.map(([k, v]) => [k, k === "name" ? "Paul Autre" : v] as [string, string]));
  assert.notEqual(/GDN-[A-Z0-9]{5}/.exec(other.body)![0], ref);
});

test("no-JS forms: problems are listed with a way back and the phone number", async () => {
  const closed = await postForm("/api/reservations", [
    ["date", "2026-12-10"],
    ["time", "19:00"],
    ["party", "2"],
    ["name", "Hans Muster"],
    ["phone", "079 123 45 67"],
    ["consent", "on"],
    ["lang", "de"],
  ]);
  assert.equal(closed.status, 409);
  assert.ok(closed.body.includes("An diesem Tag haben wir Betriebsferien."));
  assert.ok(closed.body.includes('href="/de/reservation"'));
  assert.ok(closed.body.includes("+41 27 530 05 84"));
  const fields = await postForm("/api/reservations", [["date", "2027-01-08"], ["time", "19:00"], ["party", "2"], ["lang", "it"]]);
  assert.equal(fields.status, 422);
  assert.ok(fields.body.includes("La vostra richiesta non è stata inviata"));
  assert.ok(fields.body.includes('href="/it/prenotazione"'));
  const message = await postForm("/api/messages", [["message", "Bonjour"], ["name", "Élise"], ["email", "elise@example.ch"], ["consent", "on"], ["lang", "fr"]]);
  assert.equal(message.status, 200);
  assert.ok(message.body.includes("Merci pour votre message"));
  assert.match(message.body, /MSG-[A-Z0-9]{5}/);
});

test("notifications carry no personal data, and neither do the logs", async () => {
  const { ref } = parse(await postJson("/api/reservations", request1({ name: "Greta Geheim", phone: "+41 79 999 88 77", email: "greta@example.ch" })));
  for (let i = 0; i < 100 && !hooks.some((h) => h.ref === ref); i++) await new Promise((r) => setTimeout(r, 20));
  const hook = hooks.find((h) => h.ref === ref)!;
  assert.deepEqual(hook, { type: "reservation.created", ref, date: "2027-01-08", time: "19:00", party: 4, lang: "de", dashboard: "https://giardino.example/staff" });
  const all = JSON.stringify(hooks) + logs.join("\n");
  for (const pii of ["Greta", "999 88 77", "greta@example.ch", "Anna Muster", "anna@example.ch"]) assert.ok(!all.includes(pii), pii);
});

// ---------------------------------------------------------------------------------------------------------------
// static site

test("static pages: trailing slash, inline-script hash in the CSP, caching, compression", async () => {
  const a = await call(`${base}/de/kids`);
  const b = await call(`${base}/de/kids/`);
  assert.equal(a.status, 200);
  assert.equal(b.status, 200);
  assert.equal(a.body, b.body);
  assert.match(String(a.headers["content-type"]), /text\/html/);
  assert.equal(a.headers["cache-control"], "no-cache");
  const csp = String(a.headers["content-security-policy"]);
  assert.ok(csp.includes(`script-src 'self' 'sha256-${INLINE_HASH}'`), csp);
  assert.ok(!csp.includes(LD_HASH), "JSON-LD is data, not script");
  assert.equal((await call(`${base}/`)).status, 200, "/ serves index.html (the app picks the language)");
  const js = await call(`${base}/assets/app-1234abcd.js`);
  assert.equal(js.headers["cache-control"], "public, max-age=31536000, immutable");
  const img = await call(`${base}/images/photo-480.webp`);
  assert.equal(img.headers["cache-control"], "public, max-age=604800");
  assert.equal(img.headers["content-type"], "image/webp");
  assert.equal(img.headers["accept-ranges"], "bytes");
  const part = await call(`${base}/images/photo-480.webp`, { headers: { Range: "bytes=100-199" } });
  assert.equal(part.status, 206);
  assert.equal(part.headers["content-range"], "bytes 100-199/4096");
  assert.equal(part.raw.length, 100);
  assert.equal((await call(`${base}/images/photo-480.webp`, { headers: { Range: "bytes=5000-" } })).status, 416);
  const gz = await call(`${base}/de/`, { headers: { "Accept-Encoding": "gzip" } });
  assert.equal(gz.headers["content-encoding"], "gzip");
  assert.equal(gunzipSync(gz.raw).toString("utf8"), readFileSync(join(dist, "de/index.html"), "utf8"));
  const head = await call(`${base}/de/`, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(head.raw.length, 0);
  assert.ok(Number(head.headers["content-length"]) > 0);
  const etag = String(a.headers.etag);
  assert.equal((await call(`${base}/de/kids`, { headers: { "If-None-Match": etag } })).status, 304);
  const post = await call(`${base}/de/`, { method: "POST" });
  assert.equal(post.status, 405);
});

test("legacy addresses redirect permanently; the old PDF links too", async () => {
  const r1 = await call(`${base}/fr/empreinte`);
  assert.equal(r1.status, 301);
  assert.equal(r1.headers.location, "/fr/mentions-legales");
  assert.equal((await call(`${base}/fr/empreinte/`)).headers.location, "/fr/mentions-legales");
  assert.equal((await call(`${base}/fr/empreinte?x=1`)).headers.location, "/fr/mentions-legales?x=1");
  const ext = await call(`${base}/de/allgemein/leukerbad-therme`);
  assert.equal(ext.status, 301);
  assert.equal(ext.headers.location, "https://www.leukerbad.ch/therme");
  const pdf = await call(`${base}/de/essen-geniessen?action=get_file&id=13&resource_link_id=124`);
  assert.equal(pdf.status, 301);
  assert.equal(pdf.headers.location, "/menus/Speisekarte-Menu.pdf");
  assert.equal((await call(`${base}/de/essen-geniessen`)).status, 200, "the page itself is not redirected");
  assert.equal((await call(`${base}/de/essen-geniessen?action=get_file&id=13&resource_link_id=999`)).status, 200);
  const rootPdf = await call(`${base}/?action=get_file&id=13&resource_link_id=158`);
  assert.equal(rootPdf.status, 301);
  assert.equal(rootPdf.headers.location, "/menus/Speisekarte-Kids.pdf");
  assert.equal((await call(`${base}/de/home`)).headers.location, "/de");
});

test("path traversal and hidden files are refused; unknown pages get the 404 page", async () => {
  for (const path of ["/../../../etc/passwd", "/%2e%2e/%2e%2e/etc/passwd", "/..%2f..%2f..%2fetc%2fpasswd", "/de/%2e%2e/%2e%2e/%2e%2e/etc/passwd", "/%00", "/de\\..\\..\\etc\\passwd"]) {
    const r = await call(base + path);
    assert.ok([400, 404].includes(r.status), `${path} → ${r.status}`);
    assert.ok(!r.body.includes("root:"), path);
  }
  const hidden = await call(`${base}/_redirects`);
  assert.equal(hidden.status, 404);
  const missing = await call(`${base}/de/gibt-es-nicht`);
  assert.equal(missing.status, 404);
  assert.ok(missing.body.includes("Seite nicht gefunden"));
  assert.equal(missing.headers["cache-control"], "no-cache");
});

// ---------------------------------------------------------------------------------------------------------------
// separate servers: API only, rate limits, closed staff area, persistent secret

test("API-only mode, closed staff area, rate limits and a persistent secret", async () => {
  const dir = join(tmp, "data2");
  const make = () =>
    createServer({
      dataDir: dir,
      distDir: join(tmp, "no-site"),
      now: () => new Date(clock),
      limits: { ...DEFAULT_LIMITS, auth: { max: 3, windowMs: 60_000 } },
      log: () => {},
    });
  const small = make();
  const url = await listen(small.server);
  try {
    assert.equal((await call(`${url}/de`)).status, 404, "no site folder: API only");
    assert.equal((await call(`${url}/api/health`)).status, 200);
    assert.equal((await call(`${url}/staff`)).status, 503, "STAFF_PASSWORD not set");
    // 6 reservation posts per 10 minutes and address – invalid ones count too
    const post = (data: unknown) => call(`${url}/api/reservations`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const first = parse(await post(request1()));
    for (let i = 0; i < 5; i++) await post({});
    const limited = await post(request1());
    assert.equal(limited.status, 429);
    assert.ok(Number(limited.headers["retry-after"]) > 0);
    assert.ok(parse(limited).retryAfter > 0);
    // the secret is generated once (0600) and survives a restart: status links keep working
    const secretFile = join(dir, "secret");
    assert.equal(statSync(secretFile).mode & 0o777, 0o600);
    await small.close();
    const again = make();
    const url2 = await listen(again.server);
    try {
      assert.equal(parse(await call(`${url2}/api/reservations/${first.ref}?token=${first.token}`)).status, "pending");
    } finally {
      await again.close();
    }
  } finally {
    await small.close();
  }
  // failed staff logins are limited per address (here: 3)
  const guarded = createServer({ dataDir: join(tmp, "data3"), distDir: join(tmp, "no-site"), staffPassword: "pw", limits: { ...DEFAULT_LIMITS, auth: { max: 3, windowMs: 60_000 } }, log: () => {} });
  const gurl = await listen(guarded.server);
  try {
    const bad = { Authorization: "Basic " + Buffer.from("giardino:wrong").toString("base64") };
    for (let i = 0; i < 3; i++) assert.equal((await call(`${gurl}/staff`, { headers: bad })).status, 401);
    const locked = await call(`${gurl}/staff`, { headers: { Authorization: "Basic " + Buffer.from("giardino:pw").toString("base64") } });
    assert.equal(locked.status, 429, "locked even with the right password until the window passes");
  } finally {
    await guarded.close();
  }
});

// ---------------------------------------------------------------------------------------------------------------
// configuration and helpers

test("configuration: defaults, and the fake clock only under NODE_ENV=test", () => {
  const d = fromEnv({});
  assert.equal(d.port, 4340);
  assert.equal(d.host, "127.0.0.1");
  assert.equal(d.staffUser, "giardino");
  assert.equal(d.staffPassword, null);
  assert.equal(d.retentionDays, 30);
  assert.equal(d.trustProxy, 0);
  const t = fromEnv({ NODE_ENV: "test", GIARDINO_FAKE_NOW: "2027-01-08T12:00:00+01:00" });
  assert.equal(t.now().toISOString(), "2027-01-08T11:00:00.000Z");
  const p = fromEnv({ NODE_ENV: "production", GIARDINO_FAKE_NOW: "2027-01-08T12:00:00+01:00" });
  assert.ok(Math.abs(p.now().getTime() - Date.now()) < 5000, "ignored outside tests");
  const c = fromEnv({ PORT: "8080", TRUST_PROXY: "1", RETENTION_DAYS: "14", PUBLIC_ORIGIN: "https://example.ch/", STAFF_PASSWORD: " secret " });
  assert.deepEqual([c.port, c.trustProxy, c.retentionDays, c.publicOrigin, c.staffPassword], [8080, 1, 14, "https://example.ch", "secret"]);
});

test("client address: X-Forwarded-For is used only behind a trusted proxy", () => {
  const req = (xff?: string) => ({ socket: { remoteAddress: "10.0.0.1" }, headers: xff ? { "x-forwarded-for": xff } : {} }) as unknown as IncomingMessage;
  assert.equal(clientIp(req("1.2.3.4"), 0), "10.0.0.1", "spoofed header ignored");
  assert.equal(clientIp(req("6.6.6.6, 1.2.3.4"), 1), "1.2.3.4", "the entry added by our proxy");
  assert.equal(clientIp(req(), 1), "10.0.0.1");
});

test("server-rendered links use the same paths as the website (src/routes.ts)", () => {
  for (const lang of ["de", "en", "fr", "it"] as const) {
    assert.equal(PAGE_SLUGS[lang].reserve, SLUGS[lang].reserve, `${lang} reserve`);
    assert.equal(PAGE_SLUGS[lang].status, SLUGS[lang].status, `${lang} status`);
    assert.equal(PAGE_SLUGS[lang].contact, SLUGS[lang].contact, `${lang} contact`);
  }
});

// last: moves the clock forward
test("retention: personal data is blanked 30 days after the reservation date; messages go after 90 days", async () => {
  const { ref, token } = parse(await postJson("/api/reservations", request1({ date: "2027-01-08", name: "Rita Rentention" })));
  const msg = parse(await postJson("/api/messages", { message: "Hallo", name: "Max Alt", email: "max@example.ch", consent: true, lang: "de" }));
  const saved = clock;
  const days = (n: number) => new Date(saved.getTime() + n * 86_400_000);
  try {
    // messages: kept for 90 days after they arrived
    clock = days(89);
    app.purge();
    assert.equal(app.store.getMessage(msg.ref)!.name, "Max Alt");
    clock = days(91);
    app.purge();
    assert.equal(app.store.getMessage(msg.ref), null);
    assert.deepEqual(app.store.events(msg.ref), []);
    // requests: personal data kept until 30 days after the reservation date
    clock = new Date("2027-02-07T12:00:00+01:00");
    app.purge();
    assert.equal(app.store.get(ref)!.name, "Rita Rentention");
    clock = new Date("2027-02-08T12:00:00+01:00");
    const out = app.purge();
    assert.ok(out.reservations >= 1);
    const row = app.store.get(ref)!;
    assert.deepEqual([row.name, row.phone, row.email, row.notes, row.staffNote], ["", "", "", "", null]);
    assert.ok(row.purgedAt);
    assert.equal(row.status, "pending", "the request itself (date, time, party, status) stays for the records");
    assert.equal(parse(await call(`${base}/api/reservations/${ref}?token=${token}`)).date, "2027-01-08");
    assert.ok(app.store.events(ref).every((e) => e.actor === "system" || e.note === null), "staff notes in the history are removed too");
  } finally {
    clock = saved;
  }
});
