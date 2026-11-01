// The reservation request – one shape and one validator for the form (instant feedback) and the server (authority).
import { BOOKING, checkSchedule, type Closure, type Now, type ScheduleError } from "./schedule.ts";

export const SEATING = ["none", "inside", "terrace", "playroom"] as const;
export type Seating = (typeof SEATING)[number];
// Only practical wishes: no health or accessibility data is asked for (nDSG, sensitive data). Allergies are discussed
// in person, as the menu itself says; the notes field carries a hint to that effect.
export const WISHES = ["highchair", "stroller", "celebration"] as const;
export type Wish = (typeof WISHES)[number];
export const STATUSES = ["pending", "confirmed", "declined", "cancelled"] as const;
export type Status = (typeof STATUSES)[number];
export type Lang4 = "de" | "en" | "fr" | "it";

export type ReservationInput = {
  /** idempotency key: the same key never creates a second request */
  key: string;
  date: string;
  time: string;
  party: number;
  children: number;
  seating: Seating;
  wishes: Wish[];
  notes: string;
  name: string;
  phone: string;
  email: string;
  consent: boolean;
  lang: Lang4;
  /** honeypot – must stay empty */
  website?: string;
};

export type FieldError = "required" | "name" | "email" | "phone" | "consent" | "notesLong" | "childrenTooMany" | "invalid";
export type ValidationResult = { fields: Partial<Record<keyof ReservationInput, FieldError>>; schedule: ScheduleError[] };

export const LIMITS = { name: 80, email: 120, phone: 30, notes: 800 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** international or Swiss numbers: digits, spaces, +, (), / and -, 9–15 digits */
const PHONE = /^\+?[\d\s()/.-]{9,25}$/;
export const isEmail = (s: string) => EMAIL.test(s.trim()) && s.length <= LIMITS.email;
export const isPhone = (s: string) => {
  const digits = s.replace(/\D/g, "");
  return PHONE.test(s.trim()) && digits.length >= 9 && digits.length <= 15;
};
export const isKey = (s: unknown): s is string => typeof s === "string" && /^[A-Za-z0-9-]{16,64}$/.test(s);

export type ContactFields = { name?: string; phone?: string; email?: string; notes?: string; consent?: boolean };
export function validateContact(r: ContactFields) {
  const fields: ValidationResult["fields"] = {};
  const name = (r.name ?? "").trim();
  if (!name) fields.name = "required";
  else if (name.length < 2 || name.length > LIMITS.name) fields.name = "name";
  const phone = (r.phone ?? "").trim();
  if (!phone) fields.phone = "required";
  else if (!isPhone(phone)) fields.phone = "phone";
  // e-mail is optional (the restaurant answers by phone if there is none)
  const email = (r.email ?? "").trim();
  if (email && !isEmail(email)) fields.email = "email";
  if ((r.notes ?? "").length > LIMITS.notes) fields.notes = "notesLong";
  if (!r.consent) fields.consent = "consent";
  return fields;
}

export function validateReservation(r: Partial<ReservationInput>, now: Now, closures?: Closure[]): ValidationResult {
  const fields = validateContact(r);
  const party = Number(r.party);
  const children = Number(r.children ?? 0);
  if (!Number.isInteger(children) || children < 0) fields.children = "invalid";
  else if (Number.isInteger(party) && children > party) fields.children = "childrenTooMany";
  if (r.seating !== undefined && !SEATING.includes(r.seating as Seating)) fields.seating = "invalid";
  if (r.wishes !== undefined && (!Array.isArray(r.wishes) || r.wishes.some((w) => !WISHES.includes(w as Wish)))) fields.wishes = "invalid";
  if (!isKey(r.key)) fields.key = "invalid";
  if (r.lang !== undefined && !["de", "en", "fr", "it"].includes(r.lang)) fields.lang = "invalid";
  const schedule = checkSchedule({ date: r.date, time: r.time, party: r.party }, now, closures);
  return { fields, schedule };
}

export const isValid = (v: ValidationResult) => Object.keys(v.fields).length === 0 && v.schedule.length === 0;

/** Strips everything the server should not store and normalises whitespace. */
export function normalise(r: ReservationInput): ReservationInput {
  const clean = (s: string, max: number) => s.replace(/\s+/g, " ").trim().slice(0, max);
  return {
    key: r.key,
    date: r.date,
    time: r.time,
    party: Number(r.party),
    children: Number(r.children ?? 0),
    seating: r.seating,
    wishes: [...new Set(r.wishes ?? [])].filter((w) => WISHES.includes(w)),
    notes: (r.notes ?? "").trim().slice(0, LIMITS.notes),
    name: clean(r.name, LIMITS.name),
    phone: clean(r.phone, LIMITS.phone),
    email: clean(r.email, LIMITS.email).toLowerCase(),
    consent: !!r.consent,
    lang: r.lang,
  };
}

export const MAX_PARTY = BOOKING.maxPartyOnline;

/** Short, readable reference such as «GDN-7K4Q2». */
export function makeRef(random: () => number = Math.random) {
  const A = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += A[Math.floor(random() * A.length)];
  return `GDN-${s}`;
}
