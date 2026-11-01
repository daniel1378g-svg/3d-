// Staff review: a plain German HTML dashboard behind HTTP Basic auth (STAFF_USER / STAFF_PASSWORD). The team sees
// every request with its details and decides: confirm, decline or cancel, with an optional note that appears on the
// guest's status page. Only this changes a request to "confirmed". No JavaScript; every form carries a CSRF token and
// is accepted only from the same origin.
import type { IncomingMessage, ServerResponse } from "node:http";
import { zurichNow } from "../shared/schedule.ts";
import { STATUSES, type Status } from "../shared/reservation.ts";
import { escapeHtml as e, hmac, html, readBody, redirect, safeEqual } from "./http.ts";
import { formatDate } from "./strings.ts";
import type { Ctx } from "./app.ts";
import type { Event, Reservation } from "./store.ts";

const STATUS_DE: Record<Status, string> = { pending: "Offen", confirmed: "Bestätigt", declined: "Abgelehnt", cancelled: "Storniert" };
const SEATING_DE: Record<string, string> = { none: "Keine Präferenz", inside: "Im Restaurant", terrace: "Terrasse", playroom: "Nähe Spielzimmer" };
const WISH_DE: Record<string, string> = { highchair: "Kinderstuhl", stroller: "Mit Kinderwagen", celebration: "Geburtstag / Anlass" };
const LANG_DE: Record<string, string> = { de: "Deutsch", en: "Englisch", fr: "Französisch", it: "Italienisch" };
const ACTIONS = {
  confirm: { to: "confirmed" as Status, from: ["pending", "declined"] as Status[], label: "Bestätigen" },
  decline: { to: "declined" as Status, from: ["pending"] as Status[], label: "Ablehnen" },
  cancel: { to: "cancelled" as Status, from: ["pending", "confirmed"] as Status[], label: "Stornieren" },
};
type Action = keyof typeof ACTIONS;

const STYLE = `
:root{color-scheme:light;--ivory:#f6f1e7;--paper:#fffdf8;--ink:#24231f;--muted:#5d5a50;--olive:#29381b;--line:#d9d1bf;--terra:#a4512f}
*{box-sizing:border-box}
body{margin:0;background:var(--ivory);color:var(--ink);font:15px/1.5 system-ui,-apple-system,"Segoe UI",sans-serif}
header.top{display:flex;flex-wrap:wrap;gap:12px 28px;align-items:center;padding:16px 24px;background:var(--olive);color:var(--ivory)}
header.top strong{font-size:16px;letter-spacing:.04em}
header.top a{color:var(--ivory)}
main{max-width:1040px;margin:0 auto;padding:24px 20px 64px}
h1{font:600 24px/1.2 system-ui,sans-serif;margin:8px 0 12px}
h2{font:600 17px/1.3 system-ui,sans-serif;margin:32px 0 10px;padding-bottom:6px;border-bottom:1px solid var(--line)}
p.note{color:var(--muted);max-width:70ch}
nav.filters{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}
nav.filters a{padding:6px 12px;border-radius:999px;border:1px solid var(--line);color:var(--ink);text-decoration:none;background:var(--paper)}
nav.filters a[aria-current]{background:var(--olive);border-color:var(--olive);color:var(--ivory)}
.card{background:var(--paper);border:1px solid var(--line);border-left:5px solid var(--line);border-radius:8px;padding:14px 16px;margin:10px 0}
.card--pending{border-left-color:var(--terra)}.card--confirmed{border-left-color:var(--olive)}
.card--declined,.card--cancelled{opacity:.8}
.card header{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:baseline;font-size:16px}
.badge{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:2px 8px;border-radius:999px;background:var(--ivory);border:1px solid var(--line)}
.badge--pending{color:var(--terra);border-color:var(--terra)}.badge--confirmed{color:var(--olive);border-color:var(--olive)}
dl{display:grid;grid-template-columns:max-content 1fr;gap:4px 16px;margin:10px 0}
dt{color:var(--muted)}dd{margin:0;white-space:pre-wrap;overflow-wrap:anywhere}
form.decide{display:grid;gap:8px;margin-top:10px;padding-top:10px;border-top:1px dashed var(--line)}
textarea{width:100%;min-height:56px;font:inherit;padding:8px;border:1px solid var(--line);border-radius:6px;background:#fff}
.buttons{display:flex;flex-wrap:wrap;gap:8px}
button{font:inherit;font-weight:600;padding:8px 16px;border-radius:999px;border:1px solid var(--olive);background:var(--paper);color:var(--olive);cursor:pointer}
button[value=confirm]{background:var(--olive);color:var(--ivory)}
button:focus-visible,a:focus-visible,textarea:focus-visible{outline:3px solid var(--terra);outline-offset:2px}
details{margin-top:8px;color:var(--muted)}details ol{margin:6px 0;padding-left:20px}
.empty{padding:24px;text-align:center;color:var(--muted);background:var(--paper);border-radius:8px;border:1px dashed var(--line)}
`;

function staffPage(title: string, body: string, nav = true) {
  return `<!doctype html>
<html lang="de-CH">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${e(title)} · Giardino Personal</title>
<style>${STYLE}</style>
</head>
<body>
<header class="top"><strong>Pizzeria Giardino · Personal</strong>${nav ? '<a href="/staff">Reservationsanfragen</a><a href="/staff/messages">Nachrichten</a>' : ""}</header>
<main>
${body}
</main>
</body>
</html>`;
}

const when = (iso: string) =>
  new Intl.DateTimeFormat("de-CH", { timeZone: "Europe/Zurich", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

const csrfFor = (secret: string, at: Date) => hmac(secret, `csrf:${at.toISOString().slice(0, 10)}`);
function csrfValid(ctx: Ctx, token: string) {
  const now = ctx.now();
  const yesterday = new Date(now.getTime() - 86_400_000);
  // both comparisons always run (no early exit)
  const a = safeEqual(token, csrfFor(ctx.secret, now));
  const b = safeEqual(token, csrfFor(ctx.secret, yesterday));
  return a || b;
}

/** Browsers mark every request with Sec-Fetch-Site (or at least Origin): only our own pages may post here. */
function sameOrigin(req: IncomingMessage, publicOrigin: string | null) {
  const site = req.headers["sec-fetch-site"];
  if (typeof site === "string") return site === "same-origin";
  const origin = req.headers.origin;
  if (typeof origin !== "string" || origin === "null") return false;
  try {
    const o = new URL(origin);
    if (publicOrigin && o.origin === new URL(publicOrigin).origin) return true;
    return o.host === req.headers.host;
  } catch {
    return false;
  }
}

function checkBasic(req: IncomingMessage, user: string, password: string): true | "missing" | "wrong" {
  const header = String(req.headers.authorization ?? "");
  if (!header) return "missing";
  const m = /^Basic\s+([A-Za-z0-9+/=]+)\s*$/i.exec(header);
  if (!m) return "wrong";
  const decoded = Buffer.from(m[1], "base64").toString("utf8");
  const i = decoded.indexOf(":");
  const u = i < 0 ? decoded : decoded.slice(0, i);
  const p = i < 0 ? "" : decoded.slice(i + 1);
  // both comparisons always run
  const okUser = safeEqual(u, user);
  const okPass = safeEqual(p, password);
  return okUser && okPass ? true : "wrong";
}

export async function handleStaff(ctx: Ctx, req: IncomingMessage, res: ServerResponse, url: URL) {
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  const method = req.method ?? "GET";
  if (!ctx.opts.staffPassword) {
    req.resume();
    return html(res, 503, staffPage("Nicht konfiguriert", "<h1>Personalbereich nicht konfiguriert</h1><p class=\"note\">Setzen Sie die Umgebungsvariable STAFF_PASSWORD (und optional STAFF_USER), um diesen Bereich zu öffnen.</p>", false));
  }
  const ip = ctx.ip(req);
  const blocked = ctx.limiter.blocked("auth", ip, ctx.opts.limits.auth);
  if (blocked.blocked) {
    req.resume();
    return html(res, 429, staffPage("Gesperrt", "<h1>Zu viele Anmeldeversuche</h1><p class=\"note\">Bitte versuchen Sie es in einigen Minuten wieder.</p>", false), { "Retry-After": blocked.retryAfter });
  }
  const auth = checkBasic(req, ctx.opts.staffUser, ctx.opts.staffPassword);
  if (auth !== true) {
    req.resume();
    if (auth === "wrong") ctx.limiter.hit("auth", ip, ctx.opts.limits.auth);
    return html(res, 401, staffPage("Anmeldung", "<h1>Anmeldung erforderlich</h1>", false), { "WWW-Authenticate": 'Basic realm="Giardino Personal", charset="UTF-8"' });
  }
  const path = url.pathname.replace(/\/+$/, "") || "/staff";
  const notAllowed = (allow: string) => {
    req.resume();
    return html(res, 405, staffPage("Nicht erlaubt", "<h1>Methode nicht erlaubt</h1>"), { Allow: allow });
  };
  if (path === "/staff") return method === "GET" || method === "HEAD" ? dashboard(ctx, res, url) : notAllowed("GET, HEAD");
  let m = /^\/staff\/reservations\/([^/]+)$/.exec(path);
  if (m) return method === "POST" ? decide(ctx, req, res, m[1]) : notAllowed("POST");
  if (path === "/staff/messages") return method === "GET" || method === "HEAD" ? messagesPage(ctx, res, url) : notAllowed("GET, HEAD");
  m = /^\/staff\/messages\/([^/]+)$/.exec(path);
  if (m) return method === "POST" ? messageAction(ctx, req, res, m[1]) : notAllowed("POST");
  req.resume();
  return html(res, 404, staffPage("Nicht gefunden", "<h1>Nicht gefunden</h1>"));
}

/** Reads a staff form after the origin and CSRF checks; `null` when it was refused (the answer is already sent). */
async function staffForm(ctx: Ctx, req: IncomingMessage, res: ServerResponse) {
  if (!sameOrigin(req, ctx.opts.publicOrigin)) {
    req.resume();
    html(res, 403, staffPage("Abgelehnt", "<h1>Anfrage abgelehnt</h1><p class=\"note\">Diese Aktion ist nur aus dem Personalbereich selbst möglich.</p>"));
    return null;
  }
  const body = await readBody(req);
  if (!body.ok) {
    html(res, body.status, staffPage("Fehler", "<h1>Ungültige Anfrage</h1>"));
    return null;
  }
  const form = body.kind === "form" ? body.data : new URLSearchParams(Object.entries(body.data).map(([k, v]): [string, string] => [k, String(v)]));
  if (!csrfValid(ctx, form.get("csrf") ?? "")) {
    html(res, 403, staffPage("Abgelehnt", "<h1>Formular abgelaufen</h1><p class=\"note\">Bitte laden Sie die Seite neu und versuchen Sie es nochmals.</p><p><a href=\"/staff\">Zur Übersicht</a></p>"));
    return null;
  }
  return form;
}

const decode = (s: string) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return "";
  }
};

const safeBack = (v: string | null) => (v && /^\/staff(\/messages)?(\?[\w=&%.-]*)?$/.test(v) ? v : "/staff");

async function decide(ctx: Ctx, req: IncomingMessage, res: ServerResponse, rawRef: string) {
  const form = await staffForm(ctx, req, res);
  if (!form) return;
  const action = form.get("action") as Action | null;
  if (!action || !(action in ACTIONS)) return html(res, 400, staffPage("Fehler", "<h1>Unbekannte Aktion</h1>"));
  const row = ctx.store.get(decode(rawRef));
  if (!row) return html(res, 404, staffPage("Nicht gefunden", "<h1>Anfrage nicht gefunden</h1>"));
  const a = ACTIONS[action];
  if (!a.from.includes(row.status)) {
    return html(res, 409, staffPage("Nicht möglich", `<h1>Nicht möglich</h1><p class="note">Die Anfrage ${e(row.ref)} ist bereits «${e(STATUS_DE[row.status])}».</p><p><a href="/staff">Zur Übersicht</a></p>`));
  }
  const note = (form.get("note") ?? "").replace(/\r\n/g, "\n").trim().slice(0, 500);
  ctx.store.setStatus(row.ref, a.to, note, `staff:${ctx.opts.staffUser}`, ctx.now().toISOString());
  ctx.log(`reservation ${row.ref}: ${row.status} → ${a.to} (staff)`);
  return redirect(res, 303, safeBack(form.get("back")));
}

async function messageAction(ctx: Ctx, req: IncomingMessage, res: ServerResponse, rawRef: string) {
  const form = await staffForm(ctx, req, res);
  if (!form) return;
  const action = form.get("action");
  if (action !== "done" && action !== "open") return html(res, 400, staffPage("Fehler", "<h1>Unbekannte Aktion</h1>"));
  const row = ctx.store.setMessageDone(decode(rawRef), action === "done", `staff:${ctx.opts.staffUser}`, ctx.now().toISOString());
  if (!row) return html(res, 404, staffPage("Nicht gefunden", "<h1>Nachricht nicht gefunden</h1>"));
  return redirect(res, 303, safeBack(form.get("back") ?? "/staff/messages"));
}

function eventLine(ev: Event) {
  const what =
    ev.fromStatus === null && ev.toStatus === "pending"
      ? "Anfrage eingegangen"
      : ev.toStatus && ev.toStatus in STATUS_DE
        ? `${STATUS_DE[(ev.fromStatus ?? "pending") as Status] ?? ev.fromStatus} → ${STATUS_DE[ev.toStatus as Status]}`
        : (ev.note ?? "");
  const who = ev.actor === "guest" ? "Gast" : ev.actor === "system" ? "System" : ev.actor.replace(/^staff:/, "Team: ");
  const note = ev.note && ev.toStatus ? ` – «${e(ev.note)}»` : "";
  return `<li>${e(when(ev.at))} · ${e(who)} · ${e(what)}${note}</li>`;
}

function card(ctx: Ctx, r: Reservation, csrf: string, back: string) {
  const actions = (Object.keys(ACTIONS) as Action[]).filter((k) => ACTIONS[k].from.includes(r.status));
  const people = `${r.party} ${r.party === 1 ? "Person" : "Personen"}${r.children ? ` (davon ${r.children} ${r.children === 1 ? "Kind" : "Kinder"})` : ""}`;
  const rows: [string, string][] = [
    ["Name", r.name ? e(r.name) : "<em>gelöscht (Aufbewahrungsfrist)</em>"],
    ["Telefon", r.phone ? `<a href="tel:${e(r.phone.replace(/[^\d+]/g, ""))}">${e(r.phone)}</a>` : "–"],
    ["E-Mail", r.email ? `<a href="mailto:${e(r.email)}">${e(r.email)}</a>` : "–"],
    ["Platzwunsch", e(SEATING_DE[r.seating] ?? r.seating)],
    ["Wünsche", r.wishes.length ? e(r.wishes.map((w) => WISH_DE[w] ?? w).join(", ")) : "–"],
    ["Mitteilung", r.notes ? e(r.notes) : "–"],
    ["Sprache", e(LANG_DE[r.lang] ?? r.lang)],
    ["Referenz", `${e(r.ref)} · eingegangen ${e(when(r.createdAt))}${r.source === "form" ? " · Formular ohne JavaScript" : ""}`],
  ];
  if (r.staffNote) rows.push(["Nachricht an Gast", e(r.staffNote)]);
  const history = ctx.store.events(r.ref);
  return `<article class="card card--${r.status}" id="${e(r.ref)}">
<header><strong>${e(r.time)} Uhr</strong><span>${e(people)}</span><span class="badge badge--${r.status}">${e(STATUS_DE[r.status])}</span></header>
<dl>${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
${
  actions.length
    ? `<form class="decide" method="post" action="/staff/reservations/${encodeURIComponent(r.ref)}">
<input type="hidden" name="csrf" value="${e(csrf)}"><input type="hidden" name="back" value="${e(back)}">
<label for="note-${e(r.ref)}">Nachricht an den Gast (optional, erscheint auf seiner Statusseite)</label>
<textarea id="note-${e(r.ref)}" name="note" maxlength="500"></textarea>
<div class="buttons">${actions.map((k) => `<button type="submit" name="action" value="${k}">${ACTIONS[k].label}</button>`).join("")}</div>
</form>`
    : ""
}
<details><summary>Verlauf</summary><ol>${history.map(eventLine).join("")}</ol></details>
</article>`;
}

function dashboard(ctx: Ctx, res: ServerResponse, url: URL) {
  const raw = url.searchParams.get("status") ?? "pending";
  const status = raw === "all" || STATUSES.includes(raw as Status) ? (raw as Status | "all") : "pending";
  const past = url.searchParams.get("past") === "1";
  const today = zurichNow(ctx.now()).date;
  const list = ctx.store.list({ status, fromDate: past ? null : today });
  const counts = ctx.store.counts(today);
  const csrf = csrfFor(ctx.secret, ctx.now());
  const qs = (s: string, p: boolean) => `/staff?status=${s}${p ? "&past=1" : ""}`;
  const back = qs(status, past);
  const filters = [
    ...STATUSES.map((s) => [s, `${STATUS_DE[s]} (${counts[s]})`] as const),
    ["all", "Alle"] as const,
  ]
    .map(([s, label]) => `<a href="${qs(s, past)}"${s === status ? ' aria-current="page"' : ""}>${e(label)}</a>`)
    .join("");
  const byDate = new Map<string, Reservation[]>();
  for (const r of list) byDate.set(r.date, [...(byDate.get(r.date) ?? []), r]);
  const sections = [...byDate]
    .map(([date, rows]) => `<h2>${e(formatDate("de", date))}${date === today ? " · heute" : ""}</h2>${rows.map((r) => card(ctx, r, csrf, back)).join("")}`)
    .join("");
  const body = `<h1>Reservationsanfragen</h1>
<p class="note">Eine Anfrage ist erst reserviert, wenn Sie sie hier bestätigen; der Gast sieht den Stand und Ihre Nachricht auf seiner Statusseite. Rufen Sie bei Fragen den Gast an. Personendaten werden ${ctx.opts.retentionDays} Tage nach dem Reservationsdatum automatisch gelöscht.</p>
<nav class="filters" aria-label="Filter">${filters}<a href="${qs(status, !past)}">${past ? "Nur kommende" : "Auch vergangene"}</a></nav>
${sections || '<p class="empty">Keine Anfragen in dieser Ansicht.</p>'}`;
  return html(res, 200, staffPage("Reservationsanfragen", body));
}

function messagesPage(ctx: Ctx, res: ServerResponse, url: URL) {
  const raw = url.searchParams.get("show") ?? "open";
  const show = raw === "done" || raw === "all" ? raw : "open";
  const list = ctx.store.listMessages(show);
  const csrf = csrfFor(ctx.secret, ctx.now());
  const back = `/staff/messages?show=${show}`;
  const filters = (["open", "done", "all"] as const)
    .map((s) => `<a href="/staff/messages?show=${s}"${s === show ? ' aria-current="page"' : ""}>${{ open: "Offen", done: "Erledigt", all: "Alle" }[s]}</a>`)
    .join("");
  const cards = list
    .map(
      (m) => `<article class="card${m.done ? "" : " card--pending"}" id="${e(m.ref)}">
<header><strong>${e(m.name)}</strong><span>${e(when(m.createdAt))}</span><span class="badge${m.done ? "" : " badge--pending"}">${m.done ? "Erledigt" : "Offen"}</span></header>
<dl>
<dt>Nachricht</dt><dd>${e(m.message)}</dd>
<dt>E-Mail</dt><dd><a href="mailto:${e(m.email)}">${e(m.email)}</a></dd>
<dt>Telefon</dt><dd>${m.phone ? `<a href="tel:${e(m.phone.replace(/[^\d+]/g, ""))}">${e(m.phone)}</a>` : "–"}</dd>
<dt>Adresse</dt><dd>${e([m.address, m.zipCity].filter(Boolean).join(", ")) || "–"}</dd>
<dt>Sprache</dt><dd>${e(LANG_DE[m.lang] ?? m.lang)}</dd>
<dt>Referenz</dt><dd>${e(m.ref)}</dd>
</dl>
<form class="decide" method="post" action="/staff/messages/${encodeURIComponent(m.ref)}">
<input type="hidden" name="csrf" value="${e(csrf)}"><input type="hidden" name="back" value="${e(back)}">
<div class="buttons"><button type="submit" name="action" value="${m.done ? "open" : "done"}">${m.done ? "Wieder öffnen" : "Als erledigt markieren"}</button></div>
</form>
</article>`,
    )
    .join("");
  const body = `<h1>Nachrichten</h1>
<p class="note">Nachrichten aus dem Kontaktformular. Sie werden nach 90 Tagen automatisch gelöscht.</p>
<nav class="filters" aria-label="Filter">${filters}</nav>
${cards || '<p class="empty">Keine Nachrichten in dieser Ansicht.</p>'}`;
  return html(res, 200, staffPage("Nachrichten", body));
}
