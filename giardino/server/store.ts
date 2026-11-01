// Persistent storage: one SQLite file (node:sqlite, WAL). Three tables – reservation requests, contact messages and an
// append-only event log of every state change. Personal data is blanked after the retention period (purge()).
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import type { ReservationInput, Status } from "../shared/reservation.ts";

export type Reservation = {
  ref: string;
  key: string;
  tokenHash: string;
  status: Status;
  date: string;
  time: string;
  party: number;
  children: number;
  seating: string;
  wishes: string[];
  notes: string;
  name: string;
  phone: string;
  email: string;
  lang: string;
  staffNote: string | null;
  source: "web" | "form";
  createdAt: string;
  updatedAt: string;
  purgedAt: string | null;
};

export type Message = {
  ref: string;
  message: string;
  name: string;
  address: string;
  zipCity: string;
  phone: string;
  email: string;
  lang: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Event = { id: number; at: string; ref: string; kind: "reservation" | "message"; fromStatus: string | null; toStatus: string | null; actor: string; note: string | null };

type Row = Record<string, unknown>;

const SCHEMA_V1 = `
CREATE TABLE reservations (
  ref TEXT PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  token_hash TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'confirmed', 'declined', 'cancelled')),
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  party INTEGER NOT NULL,
  children INTEGER NOT NULL DEFAULT 0,
  seating TEXT NOT NULL DEFAULT 'none',
  wishes TEXT NOT NULL DEFAULT '[]',
  notes TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  lang TEXT NOT NULL DEFAULT 'de',
  staff_note TEXT,
  source TEXT NOT NULL DEFAULT 'web',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  purged_at TEXT
);
CREATE INDEX reservations_date ON reservations (date, time);
CREATE INDEX reservations_status ON reservations (status);
CREATE TABLE messages (
  ref TEXT PRIMARY KEY,
  message TEXT NOT NULL,
  name TEXT NOT NULL,
  address TEXT NOT NULL DEFAULT '',
  zip_city TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  lang TEXT NOT NULL DEFAULT 'de',
  done INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  at TEXT NOT NULL,
  ref TEXT NOT NULL,
  kind TEXT NOT NULL,
  from_status TEXT,
  to_status TEXT,
  actor TEXT NOT NULL,
  note TEXT
);
CREATE INDEX events_ref ON events (ref);
`;

const MIGRATIONS = [SCHEMA_V1];

const toReservation = (r: Row): Reservation => ({
  ref: String(r.ref),
  key: String(r.key),
  tokenHash: String(r.token_hash),
  status: r.status as Status,
  date: String(r.date),
  time: String(r.time),
  party: Number(r.party),
  children: Number(r.children),
  seating: String(r.seating),
  wishes: (() => {
    try {
      const w = JSON.parse(String(r.wishes));
      return Array.isArray(w) ? w.map(String) : [];
    } catch {
      return [];
    }
  })(),
  notes: String(r.notes),
  name: String(r.name),
  phone: String(r.phone),
  email: String(r.email),
  lang: String(r.lang),
  staffNote: r.staff_note == null ? null : String(r.staff_note),
  source: r.source === "form" ? "form" : "web",
  createdAt: String(r.created_at),
  updatedAt: String(r.updated_at),
  purgedAt: r.purged_at == null ? null : String(r.purged_at),
});

const toMessage = (r: Row): Message => ({
  ref: String(r.ref),
  message: String(r.message),
  name: String(r.name),
  address: String(r.address),
  zipCity: String(r.zip_city),
  phone: String(r.phone),
  email: String(r.email),
  lang: String(r.lang),
  done: Number(r.done) === 1,
  createdAt: String(r.created_at),
  updatedAt: String(r.updated_at),
});

const toEvent = (r: Row): Event => ({
  id: Number(r.id),
  at: String(r.at),
  ref: String(r.ref),
  kind: r.kind === "message" ? "message" : "reservation",
  fromStatus: r.from_status == null ? null : String(r.from_status),
  toStatus: r.to_status == null ? null : String(r.to_status),
  actor: String(r.actor),
  note: r.note == null ? null : String(r.note),
});

export type NewMessage = Omit<Message, "ref" | "done" | "createdAt" | "updatedAt">;
export type ListFilter = { status?: Status | "all"; fromDate?: string | null };

export function openStore(file: string) {
  mkdirSync(dirname(file), { recursive: true });
  const db = new DatabaseSync(file);
  db.exec("PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL; PRAGMA busy_timeout = 5000;");
  const version = Number((db.prepare("PRAGMA user_version").get() as Row).user_version ?? 0);
  for (let v = version; v < MIGRATIONS.length; v++) {
    db.exec("BEGIN");
    try {
      db.exec(MIGRATIONS[v]);
      db.exec(`PRAGMA user_version = ${v + 1}`);
      db.exec("COMMIT");
    } catch (e) {
      db.exec("ROLLBACK");
      throw e;
    }
  }

  const q = {
    byRef: db.prepare("SELECT * FROM reservations WHERE ref = ?"),
    byKey: db.prepare("SELECT * FROM reservations WHERE key = ?"),
    insert: db.prepare(
      `INSERT INTO reservations (ref, key, token_hash, status, date, time, party, children, seating, wishes, notes, name, phone, email, lang, source, created_at, updated_at)
       VALUES (?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ),
    setStatus: db.prepare("UPDATE reservations SET status = ?, staff_note = ?, updated_at = ? WHERE ref = ?"),
    event: db.prepare("INSERT INTO events (at, ref, kind, from_status, to_status, actor, note) VALUES (?, ?, ?, ?, ?, ?, ?)"),
    events: db.prepare("SELECT * FROM events WHERE ref = ? ORDER BY id"),
    counts: db.prepare("SELECT status, COUNT(*) AS n FROM reservations WHERE date >= ? GROUP BY status"),
    msgByRef: db.prepare("SELECT * FROM messages WHERE ref = ?"),
    msgInsert: db.prepare(
      "INSERT INTO messages (ref, message, name, address, zip_city, phone, email, lang, done, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)",
    ),
    msgDone: db.prepare("UPDATE messages SET done = ?, updated_at = ? WHERE ref = ?"),
    purgeList: db.prepare("SELECT ref FROM reservations WHERE date < ? AND purged_at IS NULL"),
    purgeOne: db.prepare("UPDATE reservations SET name = '', phone = '', email = '', notes = '', staff_note = NULL, purged_at = ? WHERE ref = ?"),
    purgeNotes: db.prepare("UPDATE events SET note = NULL WHERE ref = ?"),
    oldMessages: db.prepare("SELECT ref FROM messages WHERE created_at < ?"),
    deleteMessage: db.prepare("DELETE FROM messages WHERE ref = ?"),
    deleteEvents: db.prepare("DELETE FROM events WHERE ref = ?"),
  };

  const tx = <T>(fn: () => T): T => {
    db.exec("BEGIN IMMEDIATE");
    try {
      const out = fn();
      db.exec("COMMIT");
      return out;
    } catch (e) {
      db.exec("ROLLBACK");
      throw e;
    }
  };

  const get = (ref: string) => {
    const r = q.byRef.get(ref) as Row | undefined;
    return r ? toReservation(r) : null;
  };

  return {
    get,
    findByKey(key: string) {
      const r = q.byKey.get(key) as Row | undefined;
      return r ? toReservation(r) : null;
    },
    /** Stores a new pending request; throws on a reference collision (the caller retries with a new one). */
    insertReservation(input: ReservationInput, ref: string, tokenHash: string, at: string, source: "web" | "form") {
      return tx(() => {
        q.insert.run(
          ref,
          input.key,
          tokenHash,
          input.date,
          input.time,
          input.party,
          input.children,
          input.seating,
          JSON.stringify(input.wishes),
          input.notes,
          input.name,
          input.phone,
          input.email,
          input.lang,
          source,
          at,
          at,
        );
        q.event.run(at, ref, "reservation", null, "pending", "guest", null);
        return get(ref)!;
      });
    },
    setStatus(ref: string, to: Status, note: string | null, actor: string, at: string) {
      return tx(() => {
        const cur = get(ref);
        if (!cur) return null;
        // every decision carries its own note to the guest (or none)
        q.setStatus.run(to, note || null, at, ref);
        q.event.run(at, ref, "reservation", cur.status, to, actor, note || null);
        return get(ref)!;
      });
    },
    list({ status = "all", fromDate = null }: ListFilter = {}) {
      const where: string[] = [];
      const args: string[] = [];
      if (status !== "all") {
        where.push("status = ?");
        args.push(status);
      }
      if (fromDate) {
        where.push("date >= ?");
        args.push(fromDate);
      }
      const sql = `SELECT * FROM reservations ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY date, time, created_at`;
      return (db.prepare(sql).all(...args) as Row[]).map(toReservation);
    },
    counts(fromDate: string) {
      const out: Record<Status, number> = { pending: 0, confirmed: 0, declined: 0, cancelled: 0 };
      for (const r of q.counts.all(fromDate) as Row[]) out[r.status as Status] = Number(r.n);
      return out;
    },
    events(ref: string) {
      return (q.events.all(ref) as Row[]).map(toEvent);
    },
    insertMessage(m: NewMessage, ref: string, at: string) {
      return tx(() => {
        q.msgInsert.run(ref, m.message, m.name, m.address, m.zipCity, m.phone, m.email, m.lang, at, at);
        q.event.run(at, ref, "message", null, "open", "guest", null);
        return toMessage(q.msgByRef.get(ref) as Row);
      });
    },
    getMessage(ref: string) {
      const r = q.msgByRef.get(ref) as Row | undefined;
      return r ? toMessage(r) : null;
    },
    listMessages(show: "open" | "done" | "all" = "open") {
      const where = show === "all" ? "" : `WHERE done = ${show === "done" ? 1 : 0}`;
      return (db.prepare(`SELECT * FROM messages ${where} ORDER BY created_at DESC`).all() as Row[]).map(toMessage);
    },
    setMessageDone(ref: string, done: boolean, actor: string, at: string) {
      return tx(() => {
        const cur = q.msgByRef.get(ref) as Row | undefined;
        if (!cur) return null;
        q.msgDone.run(done ? 1 : 0, at, ref);
        q.event.run(at, ref, "message", Number(cur.done) === 1 ? "done" : "open", done ? "done" : "open", actor, null);
        return toMessage(q.msgByRef.get(ref) as Row);
      });
    },
    /**
     * Retention: blanks name, phone, e-mail, notes and the staff note of every request whose date is before
     * `reservationCutoff`, and deletes messages received before `messageCutoffIso` (with their events).
     */
    purge(reservationCutoff: string, messageCutoffIso: string, at: string) {
      return tx(() => {
        const refs = (q.purgeList.all(reservationCutoff) as Row[]).map((r) => String(r.ref));
        for (const ref of refs) {
          q.purgeOne.run(at, ref);
          q.purgeNotes.run(ref);
          q.event.run(at, ref, "reservation", null, null, "system", "Personendaten gelöscht (Aufbewahrungsfrist)");
        }
        const msgs = (q.oldMessages.all(messageCutoffIso) as Row[]).map((r) => String(r.ref));
        for (const ref of msgs) {
          q.deleteMessage.run(ref);
          q.deleteEvents.run(ref);
        }
        return { reservations: refs.length, messages: msgs.length };
      });
    },
    close() {
      try {
        db.close();
      } catch {
        // already closed
      }
    },
  };
}

export type Store = ReturnType<typeof openStore>;
