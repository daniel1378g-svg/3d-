// The reservation, step by step: how many, which day, what time. The table illustration follows the party size.
// Nothing is booked here: "Weiter zum Reservierungssystem" opens Boinabrasa's own booking system with the three
// values filled in, and only that system knows what is free. 1 person: the online form starts at 2 → phone.
// From 13 people: the group request (from 12 the restaurant has a group form; for exactly 12 both are offered).
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fill, LOCALE } from "@/i18n";
import { useSite } from "@/site";
import { useStore, booking } from "@/lib/store";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import { arrivalSlots, BOOKING_DAYS_AHEAD, BOOKING_MAX, BOOKING_MIN, bookingUrl, CLOSED_DATES, GROUP_MIN, isOpenDay, PHONE, PRICES, SILVESTER_URL, URLS } from "@/content/facts";
import { TableViz } from "./TableViz";
import { IconArrow, IconCalendar, IconChevronLeft, IconChevronRight, IconClock, IconExternal, IconFlame, IconMinus, IconPhone, IconPlus, IconUsers } from "../icons";

const MAX_GUESTS = 150;
const SILVESTER = "2026-12-31";

/** Today's date in Dielsdorf as yyyy-mm-dd. */
function zurichToday() {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zurich", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return p; // en-CA formats as yyyy-mm-dd
}
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromIso = (s: string) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const addDays = (s: string, n: number) => { const d = fromIso(s); d.setDate(d.getDate() + n); return iso(d); };

type DayState = "ok" | "past" | "closed" | "far" | "special";
function dayState(day: string, today: string, last: string): DayState {
  if (day === SILVESTER && day >= today) return "special";
  if (day < today) return "past";
  if (day > last) return "far";
  if (!isOpenDay(fromIso(day).getDay()) || CLOSED_DATES.includes(day)) return "closed";
  return "ok";
}

function Calendar({ value, onChange }: { value: string | null; onChange: (d: string) => void }) {
  const { t, lang } = useSite();
  const today = zurichToday();
  const last = addDays(today, BOOKING_DAYS_AHEAD);
  const [month, setMonth] = useState(() => (value ?? today).slice(0, 7));
  const grid = useRef<HTMLDivElement>(null);
  const [y, m] = month.split("-").map(Number);
  const first = new Date(y, m - 1, 1);
  const offset = (first.getDay() + 6) % 7; // weeks start on Monday
  const days = new Date(y, m, 0).getDate();
  const cells: (string | null)[] = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => iso(new Date(y, m - 1, i + 1)))];
  while (cells.length % 7) cells.push(null);
  const monthName = new Intl.DateTimeFormat(LOCALE[lang], { month: "long", year: "numeric" }).format(first);
  const weekdays = Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(LOCALE[lang], { weekday: "narrow" }).format(new Date(2024, 0, 1 + i)));
  const longDate = (d: string) => new Intl.DateTimeFormat(LOCALE[lang], { weekday: "long", day: "numeric", month: "long" }).format(fromIso(d));
  const canPrev = month > today.slice(0, 7);
  const canNext = month < last.slice(0, 7);
  const shift = (k: number) => {
    const d = new Date(y, m - 1 + k, 1);
    setMonth(iso(d).slice(0, 7));
  };
  const focusDay = (d: string) => {
    if (d.slice(0, 7) !== month) setMonth(d.slice(0, 7));
    requestAnimationFrame(() => grid.current?.querySelector<HTMLButtonElement>(`[data-day="${d}"]`)?.focus());
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, d: string) => {
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key];
    if (step) { e.preventDefault(); focusDay(addDays(d, step)); }
  };
  const tabDay = value && value.slice(0, 7) === month ? value : cells.find((c) => c && dayState(c, today, last) !== "past") ?? null;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <button type="button" className="icon-btn h-10 w-10 disabled:opacity-25" onClick={() => shift(-1)} disabled={!canPrev} aria-label={t.reservation.prevMonth}><IconChevronLeft size={18} /></button>
        <p className="font-display text-[1.05rem] font-bold capitalize" aria-live="polite">{monthName}</p>
        <button type="button" className="icon-btn h-10 w-10 disabled:opacity-25" onClick={() => shift(1)} disabled={!canNext} aria-label={t.reservation.nextMonth}><IconChevronRight size={18} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[0.72rem] text-creme/70" aria-hidden="true">
        {weekdays.map((w, i) => <span key={i} className="py-1">{w}</span>)}
      </div>
      <div ref={grid} role="group" aria-label={t.reservation.chooseDate} className="grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (!d) return <span key={i} />;
          const st = dayState(d, today, last);
          const disabled = st === "past" || st === "closed" || st === "far";
          const selected = value === d;
          const reason = st === "closed" ? t.reservation.dateInvalid : st === "far" ? t.reservation.dateTooFar : st === "past" ? t.reservation.datePast : st === "special" ? t.reservation.silvesterTitle : "";
          return (
            <button
              key={d}
              type="button"
              data-day={d}
              tabIndex={d === tabDay ? 0 : -1}
              aria-pressed={selected}
              aria-disabled={disabled}
              aria-label={`${longDate(d)}${reason ? ` – ${reason}` : ""}${d === today ? ` (${t.reservation.today})` : ""}`}
              title={reason || undefined}
              onKeyDown={(e) => onKey(e, d)}
              onClick={() => { if (!disabled) onChange(d); }}
              className={cn(
                "relative grid aspect-square place-items-center rounded-full text-[0.95rem] tabular transition-[background-color,color,transform] duration-150 active:scale-95",
                selected ? "bg-brasa font-bold text-carvao" : disabled ? "cursor-not-allowed text-creme/25 line-through decoration-creme/20" : "text-creme hover:bg-creme/10",
                d === today && !selected && "ring-1 ring-ouro/60",
              )}
            >
              {Number(d.slice(8))}
              {st === "special" && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-ouro" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[0.8rem] text-creme/70">{t.reservation.closedDay}</p>
    </div>
  );
}

export function Reservation({ variant = "section" }: { variant?: "section" | "sheet" }) {
  const { t, lang, go, reduce } = useSite();
  const { guests, date, time } = useStore(booking);
  const setGuests = (n: number) => booking.set({ guests: Math.max(1, Math.min(MAX_GUESTS, n)) });
  const weekday = date ? fromIso(date).getDay() : null;
  const slots = useMemo(() => (weekday === null ? [] : arrivalSlots(weekday)), [weekday]);
  const isSilvester = date === SILVESTER;
  const guestLabel = guests === 1 ? fill(t.reservation.guestOne, { n: guests }) : fill(t.reservation.guestMany, { n: guests });
  const longDate = date ? new Intl.DateTimeFormat(LOCALE[lang], { weekday: "short", day: "numeric", month: "long" }).format(fromIso(date)) : "";
  const [hh, mm] = time ? time.split(":").map(Number) : [undefined, undefined];
  const online = guests >= BOOKING_MIN && guests <= BOOKING_MAX;
  const group = guests >= GROUP_MIN;
  const ready = !!date && (!!time || isSilvester);
  const url = isSilvester ? SILVESTER_URL(lang) : bookingUrl(lang, { date: date ? fromIso(date) : undefined, hour: hh, minute: mm, people: guests });
  const sheet = variant === "sheet";

  const pickDate = (d: string) => {
    const wd = fromIso(d).getDay();
    const keep = time && arrivalSlots(wd).some((s) => s.times.some(([h, m]) => `${h}:${String(m).padStart(2, "0")}` === time));
    booking.set({ date: d, time: keep ? time : null });
  };

  const step = (n: number, icon: React.ReactNode, title: string) => (
    <div className="mb-4 flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-creme/10 font-display text-sm font-bold text-ouro" aria-hidden="true">{n}</span>
      <h3 className="kicker flex items-center gap-2 text-creme">{icon}{title}</h3>
    </div>
  );

  return (
    <div className={cn("grid gap-8", !sheet && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14")}>
      <div className={cn("order-2 flex flex-col gap-8", !sheet && "lg:order-1")}>
        {/* 1 guests */}
        <section aria-labelledby={`rs-guests-${variant}`}>
          {step(1, <IconUsers size={16} />, t.reservation.guestsLabel)}
          <span id={`rs-guests-${variant}`} className="sr-only">{t.reservation.guestsLabel}</span>
          <div className="flex items-center gap-3">
            <button type="button" className="icon-btn h-14 w-14 bg-creme/10 disabled:opacity-30" onClick={() => setGuests(guests - 1)} disabled={guests <= 1} aria-label={t.reservation.fewer}><IconMinus /></button>
            <div className="min-w-[9.5rem] flex-1 text-center">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.output
                  key={guests}
                  className="display block text-[3.4rem] leading-none text-creme tabular"
                  initial={reduce ? false : { opacity: 0, transform: "translateY(40%)" }}
                  animate={{ opacity: 1, transform: "translateY(0%)" }}
                  exit={reduce ? undefined : { opacity: 0, transform: "translateY(-40%)" }}
                  transition={{ duration: 0.22, ease: EASE_OUT }}
                  aria-live="polite"
                >
                  {guests}
                </motion.output>
              </AnimatePresence>
              <span className="kicker text-creme/70">{fill(guests === 1 ? t.reservation.guestOne : t.reservation.guestMany, { n: "" }).trim()}</span>
            </div>
            <button type="button" className="icon-btn h-14 w-14 bg-creme/10 disabled:opacity-30" onClick={() => setGuests(guests + 1)} disabled={guests >= MAX_GUESTS} aria-label={t.reservation.more}><IconPlus /></button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={t.reservation.guestsLabel}>
            {[2, 4, 6, 8, 10, 12, 20].map((n) => (
              <button key={n} type="button" className="chip text-creme" aria-pressed={guests === n} onClick={() => setGuests(n)}>{n === 20 ? "12+" : n}</button>
            ))}
          </div>
        </section>

        {/* 2 date */}
        <section>
          {step(2, <IconCalendar size={16} />, t.reservation.date)}
          <Calendar value={date} onChange={pickDate} />
        </section>

        {/* 3 time */}
        <section>
          {step(3, <IconClock size={16} />, t.reservation.time)}
          {!date ? (
            <p className="text-creme/70">{t.reservation.pickFirst}</p>
          ) : isSilvester ? (
            <p className="text-creme/80">{t.reservation.silvesterDate}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {slots.map((s) => (
                <div key={s.label}>
                  <p className="kicker mb-2 text-creme/70">{s.label === "lunch" ? t.reservation.lunch : t.reservation.dinner}</p>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={`${t.reservation.time} – ${s.label === "lunch" ? t.reservation.lunch : t.reservation.dinner}`}>
                    {s.times.map(([h, m]) => {
                      const v = `${h}:${String(m).padStart(2, "0")}`;
                      return (
                        <button key={v} type="button" role="radio" aria-checked={time === v} className="chip tabular text-creme" onClick={() => booking.set({ time: v })}>
                          {String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <p className="text-[0.8rem] text-creme/70">{t.reservation.lastArrival}</p>
            </div>
          )}
        </section>

        {/* hand-off */}
        <section className="rounded-[24px] bg-creme/[0.06] p-5 ring-1 ring-creme/10" aria-live="polite">
          <p className="font-display text-[1.15rem] font-bold text-creme">
            {[guestLabel, longDate, isSilvester ? t.reservation.silvesterKicker : time].filter(Boolean).join(" · ")}
          </p>
          {guests === 1 ? (
            <div className="mt-4 flex flex-col gap-3">
              <p className="text-creme/80">{t.reservation.single}</p>
              <a className="pill self-start" href={PHONE.href}><IconPhone size={18} />{PHONE.display}</a>
            </div>
          ) : (
            <div className="mt-4 flex flex-col gap-3">
              {group && <p className="text-creme/80">{guests === GROUP_MIN ? t.reservation.group12 : t.reservation.groupText}</p>}
              <div className="flex flex-wrap gap-2">
                {(online || isSilvester) && (
                  <a
                    className={cn("pill", !ready && "pointer-events-none opacity-40")}
                    href={ready ? url : undefined}
                    target="_blank"
                    rel="noopener"
                    aria-disabled={!ready}
                    onClick={(e) => { if (!ready) e.preventDefault(); }}
                  >
                    {isSilvester ? t.reservation.silvesterCta : t.reservation.toSystem}
                    <IconExternal size={17} />
                    <span className="sr-only">{t.a11y.newTab}</span>
                  </a>
                )}
                {group && !isSilvester && (
                  <button type="button" className={cn("pill", online ? "pill-ghost text-creme" : "")} onClick={() => go("gruppen")}>
                    {t.cta.groupRequestShort} <IconArrow size={17} className="arrow" />
                  </button>
                )}
              </div>
              {!ready && (online || isSilvester) && <p className="text-[0.85rem] text-creme/70">{t.reservation.pickFirst}</p>}
              {(online || isSilvester) && <p className="text-[0.85rem] text-creme/70">{t.reservation.toSystemNote} {lang !== "de" && lang !== "en" ? t.reservation.systemLangs : ""}</p>}
              <p className="text-[0.85rem] text-creme/70">{t.reservation.noConfirm}</p>
            </div>
          )}
        </section>
      </div>

      <div className={cn("order-1 flex flex-col gap-6", !sheet && "lg:sticky lg:top-28 lg:order-2 lg:self-start")}>
        <TableViz guests={guests} className={sheet ? "mx-auto w-full max-w-[520px]" : ""} />
        {!sheet && <SilvesterCard />}
      </div>
    </div>
  );
}

export function SilvesterCard() {
  const { t, lang } = useSite();
  if (zurichToday() > SILVESTER) return null;
  return (
    <aside className="relative overflow-hidden rounded-[26px] bg-[linear-gradient(135deg,#2a1810,#4d0f1b)] p-6 ring-1 ring-ouro/25" aria-labelledby="silvester-title">
      <p className="kicker flex items-center gap-2 text-ouro"><IconFlame size={16} />{t.reservation.silvesterKicker}</p>
      <h3 id="silvester-title" className="display mt-2 text-[2.4rem] text-creme">{t.reservation.silvesterTitle}</h3>
      <p className="mt-1 text-creme/80">{t.reservation.silvesterDate}</p>
      <ul className="mt-4 flex flex-col gap-1.5 text-[0.95rem] text-creme/85">
        {t.reservation.silvesterItems.map((x) => <li key={x} className="flex gap-2"><span className="text-ouro" aria-hidden="true">✱</span>{x}</li>)}
      </ul>
      <p className="mt-4"><span className="display text-[2.2rem] text-ouro">CHF {PRICES.silvester}.–</span> <span className="text-sm text-creme/70">{t.reservation.silvesterPrice}</span></p>
      <p className="text-sm text-creme/70">{t.reservation.silvesterKids}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        <a className="pill pill-gold pill-sm" href={SILVESTER_URL(lang)} target="_blank" rel="noopener">{t.reservation.silvesterCta}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
        <a className="pill pill-ghost pill-sm text-creme" href={URLS.silvesterFlyer} target="_blank" rel="noopener">{t.reservation.silvesterFlyer}<span className="sr-only">{t.a11y.newTab}</span></a>
      </div>
      <p className="mt-4 text-[0.75rem] text-creme/70">{t.reservation.silvesterSource}</p>
    </aside>
  );
}
