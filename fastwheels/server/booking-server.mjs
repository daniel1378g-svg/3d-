// Reference handler for appointment requests. No dependencies: Node 18+.
//
//   BOOKING_ORIGIN=https://www.example.ch  BOOKING_WEBHOOK_URL=https://…  node server/booking-server.mjs
//
// POST /api/appointments   JSON body as sent by the site (see src/app.js → submitForm)
//   201 { ok: true, id }   stored (and forwarded, when a webhook is set)
//   400 { ok: false, errors: { field: reason } }
//   429 / 413 / 5xx        the site shows its "could not be sent" message and keeps the visitor's entries
//
// Every accepted request is appended to data/requests.jsonl. If BOOKING_WEBHOOK_URL is set, the same JSON is
// forwarded there (an automation tool, a mail relay, a CRM); a failed forward answers 502 so the visitor is not
// told the request arrived when the garage would never see it.
// Then set `booking.endpoint` in src/config.js (or window.FW_CONFIG.bookingEndpoint in the page) to this URL.
import { createServer } from 'node:http';
import { appendFile, mkdir } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

const PORT = Number(process.env.PORT || 8787);
const ORIGIN = process.env.BOOKING_ORIGIN || '*';
const WEBHOOK = process.env.BOOKING_WEBHOOK_URL || '';
const DATA_DIR = new URL('../data/', import.meta.url);
const SERVICES = ['detailing', 'ceramic', 'wrap', 'ambient', 'starlight'];
const hits = new Map();

const text = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
export function validate(body) {
  const errors = {};
  const d = {
    services: Array.isArray(body.services) ? body.services.filter((s) => SERVICES.includes(s)) : [],
    vehicleType: body.vehicleType === 'bike' ? 'bike' : 'car',
    make: text(body.make, 60), model: text(body.model, 60), year: text(body.year, 4), date: text(body.date, 10),
    name: text(body.name, 80), phone: text(body.phone, 30), email: text(body.email, 120), message: text(body.message, 1500),
    wrap: body.wrap && typeof body.wrap === 'object' ? { vehicle: text(body.wrap.vehicle, 10), color: text(body.wrap.color, 40), finish: text(body.wrap.finish, 10), effect: text(body.wrap.effect, 10), description: text(body.wrap.description, 200) } : null,
    language: text(body.language, 5), summary: text(body.summary, 3000),
  };
  if (!d.services.length) errors.services = 'required';
  if (!d.make) errors.make = 'required';
  if (!d.model) errors.model = 'required';
  if (d.year && !/^(19[5-9]\d|20\d\d)$/.test(d.year)) errors.year = 'invalid';
  if (d.date && !/^\d{4}-\d{2}-\d{2}$/.test(d.date)) errors.date = 'invalid';
  if (!d.name) errors.name = 'required';
  if (!d.phone && !d.email) errors.contact = 'required';
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.email = 'invalid';
  if (d.phone && d.phone.replace(/\D/g, '').length < 7) errors.phone = 'invalid';
  return { data: d, errors };
}

const send = (res, status, payload) => {
  res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'access-control-allow-origin': ORIGIN, 'access-control-allow-headers': 'content-type, accept', 'access-control-allow-methods': 'POST, OPTIONS', vary: 'origin' });
  res.end(JSON.stringify(payload));
};

export const server = createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, {});
  if (req.method !== 'POST' || new URL(req.url, 'http://x').pathname !== '/api/appointments') return send(res, 404, { ok: false });
  const ip = req.socket.remoteAddress || '';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 5) return send(res, 429, { ok: false });
  hits.set(ip, [...recent, now]);
  let raw = '';
  for await (const chunk of req) { raw += chunk; if (raw.length > 20_000) return send(res, 413, { ok: false }); }
  let body;
  try { body = JSON.parse(raw); } catch { return send(res, 400, { ok: false, errors: { body: 'invalid JSON' } }); }
  const { data, errors } = validate(body);
  if (Object.keys(errors).length) return send(res, 400, { ok: false, errors });
  const record = { id: randomUUID(), receivedAt: new Date().toISOString(), ...data };
  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(new URL('requests.jsonl', DATA_DIR), JSON.stringify(record) + '\n');
    if (WEBHOOK) {
      const forward = await fetch(WEBHOOK, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(record), signal: AbortSignal.timeout(8000) });
      if (!forward.ok) return send(res, 502, { ok: false });
    }
  } catch (error) {
    console.error('appointment request failed:', error.message);
    return send(res, 500, { ok: false });
  }
  send(res, 201, { ok: true, id: record.id });
});

if (import.meta.url === `file://${process.argv[1]}`) server.listen(PORT, () => console.log(`appointment handler on http://127.0.0.1:${PORT}/api/appointments (origin ${ORIGIN}${WEBHOOK ? ', forwarding to webhook' : ', no webhook'})`));
