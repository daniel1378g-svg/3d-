import { test } from "node:test";
import assert from "node:assert/strict";
import { openStatus, zurichNow } from "@/lib/time";
import { DELIVERY_MIN, DELIVERY_ZONES, deliveryZoneFor, preferenceTimes, RESERVATION } from "@/content/facts";
import { chf, findDish, MENU } from "@/content/menu";

test("Zürich time: winter (CET, UTC+1) and summer (CEST, UTC+2)", () => {
  // Monday 2 November 2026, 11:30 UTC = 12:30 in Zürich (winter)
  assert.deepEqual(zurichNow(new Date("2026-11-02T11:30:00Z")), { weekday: 1, minutes: 12 * 60 + 30 });
  // Monday 6 July 2026, 11:30 UTC = 13:30 in Zürich (summer)
  assert.deepEqual(zurichNow(new Date("2026-07-06T11:30:00Z")), { weekday: 1, minutes: 13 * 60 + 30 });
});

test("open status follows the split weekday hours", () => {
  const s = openStatus(new Date("2026-11-02T11:30:00Z")); // Mon 12:30
  assert.equal(s.open, true);
  assert.equal(s.open && s.until, 14 * 60 + 30);
  const gap = openStatus(new Date("2026-11-02T14:00:00Z")); // Mon 15:00, between services
  assert.equal(gap.open, false);
  assert.deepEqual(!gap.open && gap.next, { inDays: 0, weekday: 1, at: 17 * 60 + 30 });
  const night = openStatus(new Date("2026-11-07T22:30:00Z")); // Sat 23:30
  assert.equal(night.open, false);
  assert.deepEqual(!night.open && night.next, { inDays: 1, weekday: 0, at: 11 * 60 });
});

test("open status across the switch to summer time (Sunday 29 March 2026)", () => {
  // 09:30 UTC is 11:30 CEST (open); with the winter offset it would be 10:30 (closed)
  assert.equal(openStatus(new Date("2026-03-29T09:30:00Z")).open, true);
  assert.equal(openStatus(new Date("2026-03-28T09:30:00Z")).open, false); // Sat 10:30 CET, before opening
});

test("time preferences stay inside the published hours", () => {
  const mon = preferenceTimes(1);
  assert.equal(mon.length, 2);
  assert.deepEqual(mon[0].times[0], [11, 0]);
  assert.deepEqual(mon[0].times.at(-1), [14, 0]);
  assert.deepEqual(mon[1].times[0], [17, 30]);
  assert.deepEqual(mon[1].times.at(-1), [21, 30]);
  const sun = preferenceTimes(0);
  assert.equal(sun.length, 1);
  assert.deepEqual(sun[0].times.at(-1), [21, 30]);
});

test("prices and the reservation fee in centimes", () => {
  assert.equal(chf(2800), "28.–");
  assert.equal(chf(450), "4.50");
  assert.equal(RESERVATION.feeCents, 500);
  assert.equal(chf(4 * RESERVATION.feeCents), "20.–");
});

test("menu: published variants and prices", () => {
  assert.equal(MENU.length, 5);
  assert.equal(MENU.reduce((n, s) => n + s.items.length, 0), 54);
  assert.equal(MENU.flatMap((s) => s.items.flatMap((i) => i.variants)).length, 89);
  assert.deepEqual(findDish("picanha-porcao-pequena")!.variants.map((v) => v.cents), [3000, 3000]);
  assert.deepEqual(findDish("picanha-porcao-grande")!.variants.map((v) => v.cents), [3500, 3500]);
  assert.deepEqual(findDish("bisteca")!.variants.map((v) => v.cents), [3800, 3800]);
  const feijoada = findDish("feijoada")!;
  assert.equal(feijoada.variants.length, 4);
  assert.ok(feijoada.variants.every((v) => v.cents === 2800));
  assert.equal(feijoada.desc!.de, "Bohneneintopf - Nur Samstags und Sonntags");
});

test("delivery: only listed postcodes match", () => {
  assert.equal(DELIVERY_MIN, 50);
  assert.equal(DELIVERY_ZONES.flatMap((z) => z.places).length, 9);
  assert.equal((deliveryZoneFor("8050") as { fee: number }).fee, 17);
  assert.equal((deliveryZoneFor(" 8953 ") as { fee: number }).fee, 28);
  assert.deepEqual((deliveryZoneFor("8152") as { places: { city: string }[] }).places.map((p) => p.city), ["Glattbrugg", "Opfikon"]);
  assert.equal(deliveryZoneFor("8005"), null); // Zürich, but not a listed postcode
  assert.equal(deliveryZoneFor("80"), "invalid");
  assert.equal(deliveryZoneFor("abcd"), "invalid");
});
