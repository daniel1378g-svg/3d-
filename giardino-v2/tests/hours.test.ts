import { test } from "node:test";
import assert from "node:assert/strict";
import { CLOSURES, closureOn, noticeFor, rollingWeek, showSlot, showTime, status, zurichNow, type Closure } from "../src/content/hours";

const at = (iso: string) => new Date(iso);

test("Zurich wall clock across both daylight-saving changes", () => {
  // 29 March 2026: 02:00 CET jumps to 03:00 CEST
  assert.deepEqual(zurichNow(at("2026-03-29T00:30:00Z")), { date: "2026-03-29", day: 0, minutes: 90 });
  assert.deepEqual(zurichNow(at("2026-03-29T01:30:00Z")), { date: "2026-03-29", day: 0, minutes: 210 });
  // 25 October 2026: 03:00 CEST falls back to 02:00 CET (02:30 happens twice)
  assert.equal(zurichNow(at("2026-10-25T00:30:00Z")).minutes, 150);
  assert.equal(zurichNow(at("2026-10-25T01:30:00Z")).minutes, 150);
  // late evening in summer (UTC+2) is already the next calendar day in Zurich
  assert.deepEqual(zurichNow(at("2026-07-14T22:30:00Z")), { date: "2026-07-15", day: 3, minutes: 30 });
});

test("the autumn closure overrides the week and names the reopening", () => {
  const s = status("restaurant", at("2026-11-02T10:00:00Z")); // Monday 11:00 in Leukerbad
  assert.equal(s.open, false);
  if (!s.open) {
    assert.deepEqual(s.next, { date: "2026-12-18", from: "11:00" });
    assert.equal(s.closure?.id, "autumn-2026");
  }
  const k = status("kitchen", at("2026-12-17T21:00:00Z")); // last closed day, 22:00
  assert.equal(k.open, false);
  if (!k.open) assert.deepEqual(k.next, { date: "2026-12-18", from: "11:30" });
  const reopened = status("restaurant", at("2026-12-18T10:30:00Z")); // Friday 11:30 CET
  assert.deepEqual(reopened, { open: true, until: "23:00", closesSoon: false });
});

test("Wednesday is the rest day; the kitchen has a break in the afternoon", () => {
  const wed = status("restaurant", at("2027-01-06T11:00:00Z")); // Wednesday 12:00
  assert.equal(wed.open, false);
  if (!wed.open) assert.deepEqual(wed.next, { date: "2027-01-07", from: "11:00" });
  const tueLate = status("restaurant", at("2027-01-05T21:30:00Z")); // Tuesday 22:30
  assert.deepEqual(tueLate, { open: true, until: "23:00", closesSoon: true });
  const kitchenLate = status("kitchen", at("2027-01-05T21:30:00Z"));
  assert.equal(kitchenLate.open, false);
  if (!kitchenLate.open) assert.deepEqual(kitchenLate.next, { date: "2027-01-07", from: "11:30" }); // skips Wednesday
  const gap = status("kitchen", at("2027-01-05T15:00:00Z")); // Tuesday 16:00
  assert.equal(gap.open, false);
  if (!gap.open) assert.deepEqual(gap.next, { date: "2027-01-05", from: "17:00" });
  const early = status("restaurant", at("2027-01-04T08:00:00Z")); // Monday 09:00
  assert.equal(early.open, false);
  if (!early.open) assert.deepEqual(early.next, { date: "2027-01-04", from: "11:00" });
});

test("open on the day clocks go forward", () => {
  assert.deepEqual(status("restaurant", at("2027-03-28T10:30:00Z")), { open: true, until: "23:00", closesSoon: false }); // 12:30 CEST
  assert.equal(status("restaurant", at("2027-03-28T08:30:00Z")).open, false); // 10:30 CEST
});

test("closure notices appear before and expire by themselves", () => {
  assert.equal(noticeFor("2026-09-01"), null);
  assert.equal(noticeFor("2026-10-01")?.id, "autumn-2026");
  assert.equal(noticeFor("2026-12-17")?.id, "autumn-2026");
  assert.equal(noticeFor("2026-12-18"), null);
  assert.equal(closureOn("2026-12-17")?.id, "autumn-2026");
  assert.equal(closureOn("2026-12-18"), null);
});

test("an edited single-day closure is honoured", () => {
  const extra: Closure[] = [...CLOSURES, { id: "x", from: "2027-01-07", to: "2027-01-07", title: CLOSURES[0].title, text: CLOSURES[0].text }];
  const s = status("restaurant", at("2027-01-06T11:00:00Z"), extra); // Wednesday; Thursday closed too
  assert.equal(s.open, false);
  if (!s.open) assert.deepEqual(s.next, { date: "2027-01-08", from: "11:00" });
});

test("rolling week across the reopening", () => {
  const week = rollingWeek(at("2026-12-14T09:00:00Z")); // Monday 14 December
  assert.deepEqual(week.map((d) => d.restaurant.length > 0), [false, false, false, false, true, true, true]);
  assert.equal(week[4].date, "2026-12-18");
  assert.equal(week[2].closure?.id, "autumn-2026");
});

test("times are written the local way", () => {
  assert.equal(showTime("11:00", "fr"), "11 h");
  assert.equal(showTime("21:30", "fr"), "21 h 30");
  assert.equal(showTime("09:00", "de"), "09:00");
  assert.equal(showSlot({ from: "11:30", to: "15:00" }, "en"), "11:30–15:00");
});
