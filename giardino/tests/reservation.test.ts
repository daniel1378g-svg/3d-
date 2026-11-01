// The reservation request shape and its validation (shared/reservation.ts) – the same code runs in the form and on
// the server.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  LIMITS,
  SEATING,
  WISHES,
  isEmail,
  isKey,
  isPhone,
  isValid,
  makeRef,
  normalise,
  validateContact,
  validateReservation,
  type ReservationInput,
} from "../shared/reservation.ts";

const NOW = { date: "2026-11-01", minutes: 12 * 60 };
const valid: ReservationInput = {
  key: "k-0123456789abcdef",
  date: "2027-01-08",
  time: "19:00",
  party: 4,
  children: 1,
  seating: "terrace",
  wishes: ["highchair"],
  notes: "",
  name: "Anna Muster",
  phone: "+41 79 123 45 67",
  email: "",
  consent: true,
  lang: "de",
};

test("a complete request with an open date is valid", () => {
  const v = validateReservation(valid, NOW);
  assert.deepEqual(v, { fields: {}, schedule: [] });
  assert.ok(isValid(v));
});

test("e-mail is optional, but a wrong one is reported", () => {
  assert.equal(validateContact({ ...valid, email: "" }).email, undefined);
  assert.equal(validateContact({ ...valid, email: "   " }).email, undefined);
  assert.equal(validateContact({ ...valid, email: "anna@example.ch" }).email, undefined);
  assert.equal(validateContact({ ...valid, email: "anna@example" }).email, "email");
  assert.equal(validateContact({ ...valid, email: "anna example.ch" }).email, "email");
  assert.ok(!isEmail("a@b.c"), "top-level domain of at least two letters");
  assert.ok(!isEmail(`${"a".repeat(115)}@example.ch`), "longer than the limit");
});

test("name, phone and consent are required", () => {
  const empty = validateContact({});
  assert.deepEqual(empty, { name: "required", phone: "required", consent: "consent" });
  assert.equal(validateContact({ ...valid, name: "A" }).name, "name");
  assert.equal(validateContact({ ...valid, name: "x".repeat(LIMITS.name + 1) }).name, "name");
  assert.equal(validateContact({ ...valid, phone: "123" }).phone, "phone");
  assert.equal(validateContact({ ...valid, consent: false }).consent, "consent");
  assert.equal(validateContact({ ...valid, notes: "x".repeat(LIMITS.notes + 1) }).notes, "notesLong");
  assert.equal(validateContact({ ...valid, notes: "x".repeat(LIMITS.notes) }).notes, undefined);
});

test("phone numbers: Swiss and international formats, 9 to 15 digits", () => {
  for (const ok of ["+41 79 123 45 67", "079 123 45 67", "027/530 05 84", "+49 (0)30 1234567", "0041.27.530.05.84"]) assert.ok(isPhone(ok), ok);
  for (const bad of ["12345678", "+41 79 123 45 67 89 01 2", "phone: 079", "079-123-ABC"]) assert.ok(!isPhone(bad), bad);
});

test("party, children, seating, wishes, key and language", () => {
  const f = (patch: Partial<ReservationInput> | Record<string, unknown>) => validateReservation({ ...valid, ...patch } as Partial<ReservationInput>, NOW).fields;
  assert.equal(f({ party: 2, children: 3 }).children, "childrenTooMany");
  assert.equal(f({ children: -1 }).children, "invalid");
  assert.equal(f({ children: 1.5 }).children, "invalid");
  assert.equal(f({ party: 2, children: 2 }).children, undefined);
  assert.equal(f({ seating: "garden" }).seating, "invalid");
  for (const s of SEATING) assert.equal(f({ seating: s }).seating, undefined, s);
  assert.deepEqual([...WISHES], ["highchair", "stroller", "celebration"], "no health or accessibility data is asked for");
  assert.equal(f({ wishes: ["allergies"] }).wishes, "invalid");
  assert.equal(f({ wishes: ["wheelchair"] }).wishes, "invalid");
  assert.equal(f({ wishes: "highchair" }).wishes, "invalid");
  assert.equal(f({ wishes: [...WISHES] }).wishes, undefined);
  assert.equal(f({ key: "short" }).key, "invalid");
  assert.equal(f({ key: "has spaces in it 123" }).key, "invalid");
  assert.equal(f({ lang: "es" }).lang, "invalid");
  assert.ok(isKey("0123456789abcdef"));
  assert.ok(isKey("a".repeat(64)));
  assert.ok(!isKey("a".repeat(65)));
  assert.ok(!isKey(42));
});

test("schedule problems come back as codes next to the field errors", () => {
  const v = validateReservation({ ...valid, date: "2026-12-10", party: 13 }, NOW);
  assert.deepEqual(v.fields, {});
  assert.deepEqual(v.schedule, ["party-too-large", "date-closure"]);
  assert.ok(!isValid(v));
});

test("normalise keeps only what the restaurant needs, tidied", () => {
  const n = normalise({
    ...valid,
    name: "  Anna   Muster ",
    phone: " +41  79 123 45 67 ",
    email: " Anna@Example.CH ",
    notes: "  Geburtstag  \n  ",
    wishes: ["highchair", "highchair", "allergies" as never, "stroller"],
    party: "4" as never,
    children: undefined as never,
    website: "should be dropped",
  });
  assert.equal(n.name, "Anna Muster");
  assert.equal(n.phone, "+41 79 123 45 67");
  assert.equal(n.email, "anna@example.ch");
  assert.equal(n.notes, "Geburtstag");
  assert.deepEqual(n.wishes, ["highchair", "stroller"]);
  assert.equal(n.party, 4);
  assert.equal(n.children, 0);
  assert.equal("website" in n, false);
  assert.equal(normalise({ ...valid, notes: "x".repeat(900) }).notes.length, LIMITS.notes);
});

test("makeRef: short, readable, without look-alike characters", () => {
  for (let i = 0; i < 200; i++) assert.match(makeRef(), /^GDN-[A-HJ-NP-Z2-9]{5}$/);
  let seed = 0;
  const seq = () => (seed = (seed + 0.137) % 1);
  const a = makeRef(seq);
  seed = 0;
  assert.equal(makeRef(seq), a, "deterministic for a given random source");
});
