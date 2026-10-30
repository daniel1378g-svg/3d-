// The reservation, step by step: how many, which day, what time. The table illustration follows the party size.
// Nothing is booked here: "Weiter zum Reservationsformular" opens the restaurant's own form on picanha-brasil.ch
// (bigbites), which cannot be pre-filled, so the choice is shown ready to copy. The restaurant's own notes – seats
// held for 30 minutes, CHF 5.00 per person against no-shows – are quoted next to the button.
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fill, LOCALE } from "@/i18n";
import { useSite } from "@/site";
import { useStore, booking } from "@/lib/store";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "@/lib/motion";
import { CALENDAR_DAYS, isOpenDay, PHONE, preferenceTimes, RESERVATION, RESERVATION_NOTE_DE, URLS } from "@/content/facts";
import { chf } from "@/content/menu";
import { TableViz } from "./TableViz";
import { IconCalendar, IconChevronLeft, IconChevronRight, IconClock, IconExternal, IconMinus, IconPhone, IconPlus, IconUsers } from "../icons";

/** the counter needs an end; it is not a booking limit (none is published) */
const MAX_GUESTS = 99;
/** from 11 the table illustration shows a group arrangement, and the restaurant asks groups to call */
const GROUP_FROM = 11;

/** Today's date in Zürich as yyyy-mm-dd. */
function zurichToday() {
  const p = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zurich", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return p; // en-CA formats as yyyy-mm-dd
}
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromIso = (s: string) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const addDays = (s: string, n: number) => { const d = fromIso(s); d.setDate(d.getDate() + n); return iso(d); };

type DayState = "ok" | "past" | "closed" | "far";
function dayState(day: string, today: string, last: string): DayState {
  if (day < today) return "past";
  if (day > last) return "far";
  if (!isOpenDay(fromIso(day).getDay())) return "closed";
  return "ok";
}

function Calendar({ value, onChange }: { value: string | null; onChange: (d: string) => void }) {
  const { t, lang } = useSite();
  const today = zurichToday();
  const last = addDays(today, CALENDAR_DAYS);
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
          const reason = st === "far" ? t.reservation.dateTooFar : st === "past" ? t.reservation.datePast : "";
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
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-[0.8rem] text-creme/70">{t.reservation.openEveryDay}</p>
    </div>
  );
}

export function Reservation({ variant = "section" }: { variant?: "section" | "sheet" }) {
  const { t, lang, reduce } = useSite();
  const r = t.reservation;
  const { guests, date, time } = useStore(booking);
  const [copied, setCopied] = useState(false);
  const setGuests = (n: number) => booking.set({ guests: Math.max(1, Math.min(MAX_GUESTS, n)) });
  const weekday = date ? fromIso(date).getDay() : null;
  const slots = useMemo(() => (weekday === null ? [] : preferenceTimes(weekday)), [weekday]);
  const guestLabel = fill(guests === 1 ? r.guestOne : r.guestMany, { n: guests });
  const longDate = date ? new Intl.DateTimeFormat(LOCALE[lang], { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(fromIso(date)) : "";
  const ready = !!date && !!time;
  const sheet = variant === "sheet";
  const summary = [guestLabel, longDate, time].filter(Boolean).join(" · ");

  const pickDate = (d: string) => {
    const wd = fromIso(d).getDay();
    const keep = time && preferenceTimes(wd).some((s) => s.times.some(([h, m]) => `${h}:${String(m).padStart(2, "0")}` === time));
    booking.set({ date: d, time: keep ? time : null });
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(summary); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* the text stays visible to copy by hand */ }
  };
  const slotTitle = (l: "lunch" | "dinner" | "allDay") => (l === "lunch" ? r.lunch : l === "dinner" ? r.dinner : r.allDay);

  const step = (n: number, icon: React.ReactNode, title: string) => (
    <div className="mb-4 flex items-center gap-3">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-creme/10 font-display text-sm font-bold text-ouro" aria-hidden="true">{n}</span>
      <h3 className="kicker flex items-center gap-2 text-creme">{icon}{title}</h3>
    </div>
  );

  return (
    <div className={cn("grid grid-cols-1 gap-8", !sheet && "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14")}>
      <div className={cn("order-2 flex min-w-0 flex-col gap-8", !sheet && "lg:order-1")}>
        {/* 1 guests */}
        <section aria-labelledby={`rs-guests-${variant}`}>
          {step(1, <IconUsers size={16} />, r.guestsLabel)}
          <span id={`rs-guests-${variant}`} className="sr-only">{r.guestsLabel}</span>
          <div className="flex items-center gap-3">
            <button type="button" className="icon-btn h-14 w-14 bg-creme/10 disabled:opacity-30" onClick={() => setGuests(guests - 1)} disabled={guests <= 1} aria-label={r.fewer}><IconMinus /></button>
            <div className="min-w-0 flex-1 text-center">
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
              <span className="kicker text-creme/70">{fill(guests === 1 ? r.guestOne : r.guestMany, { n: "" }).trim()}</span>
            </div>
            <button type="button" className="icon-btn h-14 w-14 bg-creme/10 disabled:opacity-30" onClick={() => setGuests(guests + 1)} disabled={guests >= MAX_GUESTS} aria-label={r.more}><IconPlus /></button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={r.guestsLabel}>
            {[2, 4, 6, 8, 10, 14].map((n) => (
              <button key={n} type="button" className="chip text-creme" aria-pressed={guests === n} onClick={() => setGuests(n)}>{n}</button>
            ))}
          </div>
        </section>

        {/* 2 date */}
        <section>
          {step(2, <IconCalendar size={16} />, r.date)}
          <Calendar value={date} onChange={pickDate} />
        </section>

        {/* 3 time */}
        <section>
          {step(3, <IconClock size={16} />, r.time)}
          {!date ? (
            <p className="text-creme/70">{r.pickFirst}</p>
          ) : (
            <div className="flex flex-col gap-4">
              {slots.map((s) => (
                <div key={s.label}>
                  <p className="kicker mb-2 text-creme/70">{slotTitle(s.label)}</p>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={`${r.time} – ${slotTitle(s.label)}`}>
                    {s.times.map(([h, m]) => {
                      const v = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
                      return (
                        <button key={v} type="button" role="radio" aria-checked={time === v} className="chip tabular text-creme" onClick={() => booking.set({ time: v })}>{v}</button>
                      );
                    })}
                  </div>
                </div>
              ))}
              <p className="text-[0.8rem] text-creme/70">{r.timesNote}</p>
            </div>
          )}
        </section>

        {/* hand-off */}
        <section className="rounded-[24px] bg-creme/[0.06] p-5 ring-1 ring-creme/10" aria-live="polite">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-[1.15rem] font-bold text-creme">{summary}</p>
            {ready && <button type="button" className="chip text-creme" onClick={copy}>{copied ? r.copied : r.copy}</button>}
          </div>
          {guests >= GROUP_FROM && (
            <p className="mt-3 text-creme/85">{r.groupText} <a className="link-u whitespace-nowrap" href={PHONE.href}>{PHONE.display}</a></p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              className={cn("pill max-w-full whitespace-normal text-center leading-tight", !ready && "pointer-events-none opacity-40")}
              href={ready ? URLS.reservation : undefined}
              target="_blank"
              rel="noopener"
              aria-disabled={!ready}
              onClick={(e) => { if (!ready) e.preventDefault(); }}
            >
              {r.toSystem}
              <IconExternal size={17} />
              <span className="sr-only">{t.a11y.newTab}</span>
            </a>
            <a className="pill pill-ghost text-creme" href={PHONE.href}><IconPhone size={17} />{r.orCall}</a>
          </div>
          {!ready && <p className="mt-3 text-[0.85rem] text-creme/70">{r.pickFirst}</p>}
          <p className="mt-3 text-[0.85rem] text-creme/70">{r.toSystemNote}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[18px] bg-carvao/40 p-4 text-[0.88rem] text-creme/85">
              <p className="kicker mb-1 text-ouro">{r.holdTitle}</p>
              <p>{r.hold}</p>
            </div>
            <div className="rounded-[18px] bg-vinho/60 p-4 text-[0.88rem] text-creme/90">
              <p className="kicker mb-1 text-ouro">{r.feeTitle}</p>
              <p>{r.fee}</p>
              <p className="mt-2 font-semibold">{fill(r.feeTotal, { n: guestLabel, sum: chf(guests * RESERVATION.feeCents).replace(".–", "") })}</p>
            </div>
          </div>
          <p className="mt-2 text-[0.75rem] text-creme/80">{r.noteSource}</p>
          {lang !== "de" && (
            <details className="mt-2 text-[0.8rem] text-creme/75">
              <summary className="cursor-pointer">{r.feeOriginal}</summary>
              <p lang="de-CH" className="mt-2">{RESERVATION_NOTE_DE.info}</p>
              <p lang="de-CH" className="mt-1">{RESERVATION_NOTE_DE.fee}</p>
            </details>
          )}
          <p className="mt-3 text-[0.85rem] text-creme/70">{r.noConfirm}</p>
        </section>
      </div>

      <div className={cn("order-1 flex min-w-0 flex-col gap-6", !sheet && "lg:sticky lg:top-28 lg:order-2 lg:self-start")}>
        <TableViz guests={guests} className={sheet ? "mx-auto w-full max-w-[520px]" : ""} />
      </div>
    </div>
  );
}
