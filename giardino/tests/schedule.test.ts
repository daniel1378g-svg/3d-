// Opening hours, closures, time slots and the open/closed status line (shared/schedule.ts).
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  BOOKING,
  CLOSURES,
  HOURS,
  addDays,
  checkSchedule,
  dayState,
  daysBetween,
  isHhmm,
  isYmd,
  openStatus,
  slotsFor,
  upcomingClosures,
  weekday,
  zurichNow,
  type Now,
} from "../shared/schedule.ts";

const at = (date: string, hhmm = "12:00"): Now => {
  const [h, m] = hhmm.split(":").map(Number);
  return { date, minutes: h * 60 + m };
};
const TODAY = at("2026-11-01"); // the day of the audit, inside the autumn closure

test("zurichNow converts instants to Zurich wall-clock time across both DST switches", () => {
  // spring forward on 29 March 2026: 02:00 CET → 03:00 CEST at 01:00 UTC
  assert.deepEqual(zurichNow(new Date("2026-03-29T00:59:00Z")), { date: "2026-03-29", minutes: 1 * 60 + 59 });
  assert.deepEqual(zurichNow(new Date("2026-03-29T01:00:00Z")), { date: "2026-03-29", minutes: 3 * 60 });
  // fall back on 25 October 2026: 03:00 CEST → 02:00 CET at 01:00 UTC (02:30 happens twice)
  assert.deepEqual(zurichNow(new Date("2026-10-25T00:30:00Z")), { date: "2026-10-25", minutes: 2 * 60 + 30 });
  assert.deepEqual(zurichNow(new Date("2026-10-25T01:30:00Z")), { date: "2026-10-25", minutes: 2 * 60 + 30 });
  // late evening UTC is already the next day in Zurich
  assert.deepEqual(zurichNow(new Date("2026-11-01T23:30:00Z")), { date: "2026-11-02", minutes: 30 });
  assert.deepEqual(zurichNow(new Date("2026-07-01T21:59:00Z")), { date: "2026-07-01", minutes: 23 * 60 + 59 });
});

test("civil-date helpers", () => {
  assert.equal(weekday("2026-11-01"), 0); // Sunday
  assert.equal(weekday("2026-11-04"), 3); // Wednesday
  assert.equal(weekday("2026-12-18"), 5); // Friday
  assert.equal(addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(addDays("2027-03-01", -1), "2027-02-28");
  assert.equal(daysBetween("2026-11-01", "2027-11-01"), 365);
  assert.ok(isYmd("2027-01-08"));
  assert.ok(!isYmd("8.1.2027"));
  assert.ok(!isYmd(""));
  assert.ok(isHhmm("19:15"));
  assert.ok(!isHhmm("24:00"));
  assert.ok(!isHhmm("7pm"));
});

test("published facts: Wednesday closed, hot kitchen 11:30–15:00 and 17:00–21:30, autumn closure", () => {
  assert.deepEqual(HOURS.closedWeekdays, [3]);
  assert.deepEqual(HOURS.kitchen, [
    { from: "11:30", to: "15:00" },
    { from: "17:00", to: "21:30" },
  ]);
  assert.equal("meat" in HOURS, false, "the PDF meat hours are not used (website is the master for hours)");
  const c = CLOSURES.find((x) => x.id === "herbst-2026")!;
  assert.deepEqual([c.from, c.to, c.reopen], ["2026-11-01", "2026-12-17", "2026-12-18"]);
});

test("dayState: past, weekly closed, closure, reopening day, horizon", () => {
  assert.equal(dayState("2026-10-31", TODAY), "past");
  assert.equal(dayState("2026-11-01", TODAY), "closure");
  assert.equal(dayState("2026-11-04", TODAY), "closure", "a Wednesday inside the closure reads as closure");
  assert.equal(dayState("2026-12-17", TODAY), "closure", "last day of the closure");
  assert.equal(dayState("2026-12-18", TODAY), "open", "Friday 18 December 2026: open again");
  assert.equal(dayState("2026-12-23", TODAY), "weekly-closed", "Wednesday");
  assert.equal(dayState("2027-01-06", TODAY), "weekly-closed", "Wednesday");
  assert.equal(dayState("2027-01-08", TODAY), "open");
  assert.equal(dayState("2027-11-01", TODAY), "open", "365 days ahead is still bookable");
  assert.equal(dayState("2027-11-02", TODAY), "beyond-horizon");
});

test("slotsFor: 15-minute steps from 11:30 to 14:45 and from 17:00 to 21:15", () => {
  const slots = slotsFor("2027-01-08", TODAY);
  const lunch = slots.filter((s) => s.service === "lunch").map((s) => s.time);
  const dinner = slots.filter((s) => s.service === "dinner").map((s) => s.time);
  assert.equal(lunch[0], "11:30");
  assert.equal(lunch.at(-1), "14:45");
  assert.equal(dinner[0], "17:00");
  assert.equal(dinner.at(-1), "21:15");
  assert.equal(lunch.length, 14);
  assert.equal(dinner.length, 18);
  assert.equal(BOOKING.slotMinutes, 15);
  for (let i = 1; i < lunch.length; i++) {
    const [h1, m1] = lunch[i - 1].split(":").map(Number);
    const [h2, m2] = lunch[i].split(":").map(Number);
    assert.equal(h2 * 60 + m2 - (h1 * 60 + m1), 15);
  }
  assert.ok(slots.every((s) => s.state === "available"));
  assert.equal("meatServed" in slots[0], false);
  // closed days have no slots
  assert.deepEqual(slotsFor("2027-01-06", TODAY), []);
  assert.deepEqual(slotsFor("2026-12-10", TODAY), []);
});

test("slotsFor on the same day: past times and the short-notice hint (a hint, not a block)", () => {
  const now = at("2027-01-08", "12:00");
  const slots = slotsFor("2027-01-08", now);
  const state = (t: string) => slots.find((s) => s.time === t)?.state;
  assert.equal(state("11:30"), "past");
  assert.equal(state("12:00"), "past");
  assert.equal(state("12:15"), "short-notice");
  assert.equal(state("13:45"), "short-notice");
  assert.equal(state("14:00"), "available");
  assert.equal(state("19:00"), "available");
  // a short-notice slot is still accepted
  assert.deepEqual(checkSchedule({ date: "2027-01-08", time: "12:30", party: 2 }, now), []);
});

test("checkSchedule reports every published constraint", () => {
  const ok = { date: "2027-01-08", time: "19:00", party: 4 };
  assert.deepEqual(checkSchedule(ok, TODAY), []);
  assert.deepEqual(checkSchedule({ ...ok, party: 0 }, TODAY), ["party-invalid"]);
  assert.deepEqual(checkSchedule({ ...ok, party: 2.5 }, TODAY), ["party-invalid"]);
  assert.deepEqual(checkSchedule({ ...ok, party: "x" }, TODAY), ["party-invalid"]);
  assert.deepEqual(checkSchedule({ ...ok, party: 12 }, TODAY), []);
  assert.deepEqual(checkSchedule({ ...ok, party: 13 }, TODAY), ["party-too-large"]);
  assert.deepEqual(checkSchedule({ ...ok, date: "8.1.2027" }, TODAY), ["date-invalid"]);
  assert.deepEqual(checkSchedule({ ...ok, date: "2026-10-30" }, TODAY), ["date-past"]);
  assert.deepEqual(checkSchedule({ ...ok, date: "2027-01-06" }, TODAY), ["date-weekly-closed"]);
  assert.deepEqual(checkSchedule({ ...ok, date: "2026-12-10" }, TODAY), ["date-closure"]);
  assert.deepEqual(checkSchedule({ ...ok, date: "2027-12-01" }, TODAY), ["date-beyond-horizon"]);
  assert.deepEqual(checkSchedule({ ...ok, time: "7pm" }, TODAY), ["time-invalid"]);
  assert.deepEqual(checkSchedule({ ...ok, time: "16:00" }, TODAY), ["time-outside-hours"]);
  assert.deepEqual(checkSchedule({ ...ok, time: "11:15" }, TODAY), ["time-outside-hours"]);
  assert.deepEqual(checkSchedule({ ...ok, time: "15:00" }, TODAY), ["time-outside-hours"]);
  assert.deepEqual(checkSchedule({ ...ok, time: "21:30" }, TODAY), ["time-outside-hours"]);
  assert.deepEqual(checkSchedule({ ...ok, time: "21:15" }, TODAY), []);
  assert.deepEqual(checkSchedule({ ...ok, date: "2027-01-08", time: "11:45" }, at("2027-01-08", "12:00")), ["time-past"]);
  // several problems at once
  assert.deepEqual(checkSchedule({ date: "2026-12-10", time: "19:00", party: 13 }, TODAY), ["party-too-large", "date-closure"]);
});

test("openStatus: during the closure, on Wednesdays, open, before and after hours", () => {
  const s = openStatus(TODAY);
  assert.equal(s.kind, "closure");
  if (s.kind === "closure") {
    assert.equal(s.next, "2026-12-18");
    assert.equal(s.nextFrom, "11:00");
    assert.equal(s.closure.id, "herbst-2026");
  }
  const wed = openStatus(at("2027-01-06", "12:00"));
  assert.equal(wed.kind, "weekly-closed");
  if (wed.kind === "weekly-closed") assert.equal(wed.next, "2027-01-07");
  const open = openStatus(at("2027-01-08", "12:00"));
  assert.equal(open.kind, "open");
  if (open.kind === "open") assert.deepEqual(open.kitchen, { from: "11:30", to: "15:00" });
  const between = openStatus(at("2027-01-08", "16:00"));
  assert.equal(between.kind, "open");
  if (between.kind === "open") assert.equal(between.kitchen, null, "open, but the kitchen pauses");
  assert.equal(openStatus(at("2027-01-08", "10:00")).kind, "later-today");
  const late = openStatus(at("2027-01-05", "23:30")); // Tuesday night → Thursday (Wednesday closed)
  assert.equal(late.kind, "closed-now");
  if (late.kind === "closed-now") assert.equal(late.next, "2027-01-07");
});

test("upcomingClosures: shown while running or within the notice window", () => {
  assert.deepEqual(upcomingClosures(TODAY).map((c) => c.id), ["herbst-2026"]);
  assert.deepEqual(upcomingClosures(at("2026-12-17")).map((c) => c.id), ["herbst-2026"]);
  assert.deepEqual(upcomingClosures(at("2026-12-18")), [], "gone the day the restaurant reopens");
  assert.deepEqual(upcomingClosures(at("2026-06-01"), 120), [], "153 days ahead is outside a 120-day window");
  assert.deepEqual(upcomingClosures(at("2026-06-01"), 160).map((c) => c.id), ["herbst-2026"]);
});
