// The public API: reservation requests (create, status, cancel), contact messages and a health check, plus the small
// JSON view for staff tools. Validation is shared with the website (shared/*.ts); the server is the authority and
// never confirms anything by itself – only staff can (staff.ts).
import type { IncomingMessage, ServerResponse } from "node:http";
import { randomInt, timingSafeEqual } from "node:crypto";
import { zurichNow, type ScheduleError } from "../shared/schedule.ts";
import {
  STATUSES,
  isEmail,
  isKey,
  isPhone,
  makeRef,
  normalise,
  validateReservation,
  type ReservationInput,
  type Seating,
  type Status,
  type Wish,
} from "../shared/reservation.ts";
import { acceptLang, hmac, html, json, readBody, safeEqual, sha256, sha256Hex, type Body } from "./http.ts";
import { TEXTS, isLang, pagePath, type FieldCode, type Lang } from "./strings.ts";
import { messageReceived, noticePage, problemsPage, reservationReceived } from "./pages.ts";
import type { Ctx } from "./app.ts";
import type { Reservation } from "./store.ts";

const REF = /^GDN-[A-Z0-9]{5}$/;
const DUMMY_HASH = "0".repeat(64);
const MSG_LIMITS = { message: 4000, name: 80, address: 120, zipCity: 80, phone: 30, email: 120 };

const str = (v: unknown) => (typeof v === "string" ? v : typeof v === "number" ? String(v) : "");
const num = (v: unknown) => (typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN);
const truthy = (v: unknown) => v === true || v === "on" || v === "true" || v === "1" || v === "yes";
const empty = (v: unknown) => v === undefined || v === null || v === "";
const random = () => randomInt(0, 2 ** 32) / 2 ** 32;

/** A real calendar day ("2027-02-30" passes the shared format check but does not exist). */
const realDate = (s: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return true; // the shared validator reports the format
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const t = new Date(Date.UTC(y, mo - 1, d));
  return t.getUTCFullYear() === y && t.getUTCMonth() === mo - 1 && t.getUTCDate() === d;
};

/** The guest's token: derived from the idempotency key, so a repeated request gets the same one back. */
export const tokenFor = (secret: string, key: string) => hmac(secret, `reservation:${key}`);

/** Compares in constant time; an unknown reference costs the same as a wrong token. */
function tokenMatches(hash: string | undefined, token: string) {
  const expected = Buffer.from(hash ?? DUMMY_HASH, "hex");
  const got = sha256(token);
  return expected.length === got.length && timingSafeEqual(expected, got) && hash !== undefined;
}

const isFormRequest = (req: IncomingMessage) => String(req.headers["content-type"] ?? "").toLowerCase().startsWith("application/x-www-form-urlencoded");

function formObject(params: URLSearchParams) {
  const o: Record<string, unknown> = {};
  for (const [k, v] of params) {
    const key = k.endsWith("[]") ? k.slice(0, -2) : k;
    if (key === "wishes") ((o.wishes ??= []) as string[]).push(v);
    else o[key] = v;
  }
  return o;
}

const source = (body: Extract<Body, { ok: true }>) => (body.kind === "form" ? formObject(body.data) : body.data);

function coerceReservation(src: Record<string, unknown>, lang: Lang): Partial<ReservationInput> {
  return {
    key: str(src.key),
    date: str(src.date).trim(),
    time: str(src.time).trim(),
    party: num(src.party),
    children: empty(src.children) ? 0 : num(src.children),
    seating: (empty(src.seating) ? "none" : str(src.seating)) as Seating,
    // anything but an array is kept as is, so the validator reports it
    wishes: (src.wishes === undefined ? [] : src.wishes) as Wish[],
    notes: str(src.notes),
    name: str(src.name),
    phone: str(src.phone),
    email: str(src.email),
    consent: truthy(src.consent),
    lang: (empty(src.lang) ? lang : str(src.lang)) as Lang,
  };
}

/**
 * The no-JavaScript form cannot carry a per-visitor key (it is static HTML): the key is derived from what the guest
 * entered, mixed with any key the form did send, so reloading the answer page never stores a request twice.
 */
const formKey = (r: Partial<ReservationInput>, provided: string) =>
  sha256Hex(["form", (r.name ?? "").trim().toLowerCase(), (r.phone ?? "").replace(/\D/g, ""), r.date, r.time, provided].join("|"));

export const publicView = (r: Reservation) => ({
  ref: r.ref,
  status: r.status,
  date: r.date,
  time: r.time,
  party: r.party,
  children: r.children,
  seating: r.seating,
  wishes: r.wishes,
  lang: r.lang,
  createdAt: r.createdAt,
  updatedAt: r.updatedAt,
  staffNote: r.staffNote,
});

export async function handleApi(ctx: Ctx, req: IncomingMessage, res: ServerResponse, url: URL) {
  const path = url.pathname.replace(/\/+$/, "");
  const method = req.method ?? "GET";
  const allow = (methods: string) => {
    req.resume();
    return json(res, 405, { error: "method-not-allowed" }, { Allow: methods });
  };
  if (path === "/api/health") return method === "GET" || method === "HEAD" ? json(res, 200, { ok: true }) : allow("GET, HEAD");
  if (path === "/api/reservations") return method === "POST" ? createReservation(ctx, req, res) : allow("POST");
  let m = /^\/api\/reservations\/([^/]+)$/.exec(path);
  if (m) return method === "GET" || method === "HEAD" ? getReservation(ctx, req, res, m[1], url.searchParams.get("token") ?? "") : allow("GET, HEAD");
  m = /^\/api\/reservations\/([^/]+)\/cancel$/.exec(path);
  if (m) return method === "POST" ? cancelReservation(ctx, req, res, m[1]) : allow("POST");
  if (path === "/api/messages") return method === "POST" ? createMessage(ctx, req, res) : allow("POST");
  if (path === "/api/staff/reservations") return method === "GET" ? staffList(ctx, req, res, url) : allow("GET");
  req.resume();
  return json(res, 404, { error: "not-found" });
}

// ---------------------------------------------------------------------------------------------------------------
// reservation requests

async function createReservation(ctx: Ctx, req: IncomingMessage, res: ServerResponse) {
  const form = isFormRequest(req);
  const limit = ctx.limiter.hit("reservations", ctx.ip(req), ctx.opts.limits.reservations);
  if (!limit.ok) {
    req.resume();
    const lang = acceptLang(req);
    const headers = { "Retry-After": limit.retryAfter };
    return form
      ? html(res, 429, noticePage(lang, TEXTS[lang].errorTitle, TEXTS[lang].rateLimited, pagePath(lang, "reserve")), headers)
      : json(res, 429, { retryAfter: limit.retryAfter }, headers);
  }
  const body = await readBody(req);
  if (!body.ok) {
    const lang = acceptLang(req);
    return form ? html(res, body.status, noticePage(lang, TEXTS[lang].errorTitle, TEXTS[lang].serverError, pagePath(lang, "reserve"))) : json(res, body.status, { error: body.error });
  }
  const src = source(body);
  const lang: Lang = isLang(src.lang) ? src.lang : acceptLang(req);
  const back = pagePath(lang, "reserve");
  const answerFields = (fields: Partial<Record<string, FieldCode>>) => (form ? html(res, 422, problemsPage(lang, back, { fields })) : json(res, 422, { fields }));
  const answerCodes = (codes: ScheduleError[]) => (form ? html(res, 409, problemsPage(lang, back, { codes })) : json(res, 409, { codes }));

  // honeypot: a field people never see; bots fill it in. Nothing is stored.
  if (str(src.website).trim()) return answerFields({ website: "invalid" });

  const input = coerceReservation(src, lang);
  if (input.date && !realDate(input.date)) input.date = "invalid";
  if (form) input.key = formKey(input, str(src.key));

  const answerStored = (row: Reservation, duplicate: boolean) => {
    const token = tokenFor(ctx.secret, row.key);
    return form
      ? html(res, 200, reservationReceived(lang, { ref: row.ref, token, date: row.date, time: row.time, party: row.party, duplicate }))
      : json(res, duplicate ? 200 : 201, { ref: row.ref, token, status: row.status, duplicate });
  };

  // idempotency: the same key returns the request stored the first time
  if (isKey(input.key)) {
    const existing = ctx.store.findByKey(input.key);
    if (existing) return answerStored(existing, true);
  }

  const v = validateReservation(input, zurichNow(ctx.now()));
  if (Object.keys(v.fields).length) return answerFields(v.fields as Partial<Record<string, FieldCode>>);
  if (v.schedule.length) return answerCodes(v.schedule);

  const clean = normalise(input as ReservationInput);
  const tokenHash = sha256Hex(tokenFor(ctx.secret, clean.key));
  const at = ctx.now().toISOString();
  let row: Reservation | null = null;
  for (let attempt = 0; attempt < 12 && !row; attempt++) {
    try {
      row = ctx.store.insertReservation(clean, makeRef(random), tokenHash, at, form ? "form" : "web");
    } catch (e) {
      const msg = String((e as Error).message);
      if (msg.includes("reservations.key")) {
        const existing = ctx.store.findByKey(clean.key);
        if (existing) return answerStored(existing, true);
      }
      if (!msg.includes("reservations.ref")) throw e;
    }
  }
  if (!row) throw new Error("could not allocate a reservation reference");
  ctx.log(`reservation ${row.ref} received for ${row.date} ${row.time}, ${row.party} guests (${row.source})`);
  ctx.notify({ type: "reservation.created", ref: row.ref, date: row.date, time: row.time, party: row.party, lang: row.lang });
  return answerStored(row, false);
}

function getReservation(ctx: Ctx, req: IncomingMessage, res: ServerResponse, rawRef: string, token: string) {
  const limit = ctx.limiter.hit("status", ctx.ip(req), ctx.opts.limits.status);
  if (!limit.ok) return json(res, 429, { retryAfter: limit.retryAfter }, { "Retry-After": limit.retryAfter });
  const ref = decodeSafe(rawRef);
  const row = ref && REF.test(ref) ? ctx.store.get(ref) : null;
  if (!tokenMatches(row?.tokenHash, token) || !row) return json(res, 404, { error: "not-found" });
  return json(res, 200, publicView(row));
}

async function cancelReservation(ctx: Ctx, req: IncomingMessage, res: ServerResponse, rawRef: string) {
  const limit = ctx.limiter.hit("status", ctx.ip(req), ctx.opts.limits.status);
  if (!limit.ok) {
    req.resume();
    return json(res, 429, { retryAfter: limit.retryAfter }, { "Retry-After": limit.retryAfter });
  }
  const body = await readBody(req);
  if (!body.ok) return json(res, body.status, { error: body.error });
  const token = str(source(body).token);
  const ref = decodeSafe(rawRef);
  const row = ref && REF.test(ref) ? ctx.store.get(ref) : null;
  if (!tokenMatches(row?.tokenHash, token) || !row) return json(res, 404, { error: "not-found" });
  if (row.status === "cancelled") return json(res, 200, { status: "cancelled" });
  if (row.status === "declined" || row.date < zurichNow(ctx.now()).date) return json(res, 409, { error: "not-cancellable", status: row.status });
  ctx.store.setStatus(row.ref, "cancelled", null, "guest", ctx.now().toISOString());
  ctx.log(`reservation ${row.ref} cancelled by the guest`);
  ctx.notify({ type: "reservation.cancelled", ref: row.ref, date: row.date, time: row.time, party: row.party, lang: row.lang });
  return json(res, 200, { status: "cancelled" });
}

// ---------------------------------------------------------------------------------------------------------------
// contact messages

type MessageInput = { message: string; name: string; address: string; zipCity: string; phone: string; email: string; consent: boolean; lang: string };

export function validateMessage(m: MessageInput) {
  const fields: Partial<Record<keyof MessageInput, FieldCode>> = {};
  const message = m.message.trim();
  if (!message) fields.message = "required";
  else if (message.length > MSG_LIMITS.message) fields.message = "tooLong";
  const name = m.name.trim();
  if (!name) fields.name = "required";
  else if (name.length < 2 || name.length > MSG_LIMITS.name) fields.name = "name";
  const email = m.email.trim();
  if (!email) fields.email = "required";
  else if (!isEmail(email)) fields.email = "email";
  const phone = m.phone.trim();
  if (phone && !isPhone(phone)) fields.phone = "phone";
  if (m.address.trim().length > MSG_LIMITS.address) fields.address = "tooLong";
  if (m.zipCity.trim().length > MSG_LIMITS.zipCity) fields.zipCity = "tooLong";
  if (!m.consent) fields.consent = "consent";
  if (!isLang(m.lang)) fields.lang = "invalid";
  return fields;
}

async function createMessage(ctx: Ctx, req: IncomingMessage, res: ServerResponse) {
  const form = isFormRequest(req);
  const limit = ctx.limiter.hit("messages", ctx.ip(req), ctx.opts.limits.messages);
  if (!limit.ok) {
    req.resume();
    const lang = acceptLang(req);
    const headers = { "Retry-After": limit.retryAfter };
    return form
      ? html(res, 429, noticePage(lang, TEXTS[lang].errorTitle, TEXTS[lang].rateLimited, pagePath(lang, "contact")), headers)
      : json(res, 429, { retryAfter: limit.retryAfter }, headers);
  }
  const body = await readBody(req);
  if (!body.ok) {
    const lang = acceptLang(req);
    return form ? html(res, body.status, noticePage(lang, TEXTS[lang].errorTitle, TEXTS[lang].serverError, pagePath(lang, "contact"))) : json(res, body.status, { error: body.error });
  }
  const src = source(body);
  const lang: Lang = isLang(src.lang) ? src.lang : acceptLang(req);
  const back = pagePath(lang, "contact");
  const answerFields = (fields: Partial<Record<string, FieldCode>>) => (form ? html(res, 422, problemsPage(lang, back, { fields })) : json(res, 422, { fields }));
  if (str(src.website).trim()) return answerFields({ website: "invalid" });

  const m: MessageInput = {
    message: str(src.message),
    name: str(src.name),
    address: str(src.address),
    // the website's form calls it «town»
    zipCity: str(src.zipCity ?? src.town),
    phone: str(src.phone),
    email: str(src.email),
    consent: truthy(src.consent),
    lang: empty(src.lang) ? lang : str(src.lang),
  };
  const fields = validateMessage(m);
  if (Object.keys(fields).length) return answerFields(fields);

  const clean = (s: string, max: number) => s.replace(/\s+/g, " ").trim().slice(0, max);
  const data = {
    message: m.message.trim().slice(0, MSG_LIMITS.message),
    name: clean(m.name, MSG_LIMITS.name),
    address: clean(m.address, MSG_LIMITS.address),
    zipCity: clean(m.zipCity, MSG_LIMITS.zipCity),
    phone: clean(m.phone, MSG_LIMITS.phone),
    email: clean(m.email, MSG_LIMITS.email).toLowerCase(),
    lang: m.lang,
  };
  const at = ctx.now().toISOString();
  let ref: string | null = null;
  for (let attempt = 0; attempt < 12 && !ref; attempt++) {
    const candidate = makeRef(random).replace("GDN-", "MSG-");
    try {
      ctx.store.insertMessage(data, candidate, at);
      ref = candidate;
    } catch (e) {
      if (!String((e as Error).message).includes("messages.ref")) throw e;
    }
  }
  if (!ref) throw new Error("could not allocate a message reference");
  ctx.log(`message ${ref} received`);
  ctx.notify({ type: "message.created", ref, date: null, time: null, party: null, lang: data.lang });
  return form ? html(res, 200, messageReceived(lang, ref)) : json(res, 201, { ok: true, ref });
}

// ---------------------------------------------------------------------------------------------------------------
// staff tools (JSON, Bearer token)

function staffList(ctx: Ctx, req: IncomingMessage, res: ServerResponse, url: URL) {
  if (!ctx.opts.staffToken) return json(res, 503, { error: "not-configured" });
  const ip = ctx.ip(req);
  const blocked = ctx.limiter.blocked("auth", ip, ctx.opts.limits.auth);
  if (blocked.blocked) return json(res, 429, { retryAfter: blocked.retryAfter }, { "Retry-After": blocked.retryAfter });
  const header = String(req.headers.authorization ?? "");
  const m = /^Bearer\s+(\S+)\s*$/i.exec(header);
  if (!m || !safeEqual(m[1], ctx.opts.staffToken)) {
    if (header) ctx.limiter.hit("auth", ip, ctx.opts.limits.auth);
    return json(res, 401, { error: "unauthorized" }, { "WWW-Authenticate": 'Bearer realm="Giardino"' });
  }
  const status = url.searchParams.get("status") || "all";
  if (status !== "all" && !STATUSES.includes(status as Status)) return json(res, 400, { error: "bad-status" });
  const from = url.searchParams.get("from") || zurichNow(ctx.now()).date;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from)) return json(res, 400, { error: "bad-from" });
  const list = ctx.store.list({ status: status as Status | "all", fromDate: from });
  return json(res, 200, {
    reservations: list.map((r) => ({ ...publicView(r), name: r.name, phone: r.phone, email: r.email, notes: r.notes, source: r.source })),
  });
}

function decodeSafe(s: string) {
  try {
    return decodeURIComponent(s);
  } catch {
    return null;
  }
}
