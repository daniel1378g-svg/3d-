// The 72-hour planner: pick one of the 11 "sur commande" dishes and the day of the visit (Sunday and Monday
// greyed out); the card shows the latest day to order, 72 hours earlier, stepping back to the last open day
// if that falls on a closed day. Call and e-mail buttons carry the dish and date.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LOCALE, UI, type Lang } from "@/i18n";
import { useSite, PLAN_EVENT } from "@/site";
import { BUSINESS } from "@/content/site";
import { ON_ORDER } from "@/content/carte";
import { canVisit, orderDeadline } from "@/lib/orderDeadline";
import { addDays, genevaToday, isClosedDay, sameDay } from "@/lib/time";
import { cn, storage } from "@/lib/utils";
import { LottieIcon } from "./lottie/LottieIcon";
import { IconArrow, IconArrowLeft } from "./icons";

const fmt = (lang: Lang, d: Date, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(LOCALE[lang], o).format(d);

export function Planner72({ className }: { className?: string }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const today = useMemo(() => genevaToday(), []);
  const [dish, setDish] = useState(() => {
    // a "Planifier (72 h)" link on the carte page leaves the dish here before coming to the home page
    const pending = storage("session").get("lp-plan");
    storage("session").set("lp-plan", "");
    return ON_ORDER.some((d) => d.id === pending) ? pending! : ON_ORDER[0].id;
  });
  const [visit, setVisit] = useState<Date | null>(null);
  const [focusDay, setFocusDay] = useState<Date>(() => {
    let d = addDays(today, 3);
    while (!canVisit(d, today)) d = addDays(d, 1);
    return d;
  });
  const [month, setMonth] = useState(() => new Date(focusDay.getFullYear(), focusDay.getMonth(), 1));
  const grid = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // "Planifier (72 h)" links elsewhere preselect a dish
  useEffect(() => {
    const on = (e: Event) => setDish((e as CustomEvent<string>).detail);
    window.addEventListener(PLAN_EVENT, on);
    return () => window.removeEventListener(PLAN_EVENT, on);
  }, []);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    grid.current?.querySelector<HTMLButtonElement>(`[data-day="${focusDay.toDateString()}"]`)?.focus();
  }, [focusDay, month]);

  const chosen = ON_ORDER.find((d) => d.id === dish)!;
  const deadline = visit ? orderDeadline(visit) : null;
  // weeks start on Monday
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  const weekdays = Array.from({ length: 7 }, (_, i) => fmt(lang, new Date(2024, 0, 1 + i), { weekday: "short" }));
  const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1);
  // one day of the shown month takes the tab stop (the focused day, else the first open one)
  const inMonth = (d: Date) => d.getFullYear() === month.getFullYear() && d.getMonth() === month.getMonth();
  const tabDay = inMonth(focusDay) ? focusDay : ((cells.find((d) => d && canVisit(d, today)) ?? cells[lead]) as Date);

  const move = (n: number) => {
    let d = addDays(focusDay, n);
    moved.current = true;
    if (d.getMonth() !== month.getMonth()) setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    if (d < today) d = today;
    setFocusDay(d);
  };
  const dateText = (d: Date) => fmt(lang, d, { weekday: "long", day: "numeric", month: "long" });
  const subject = visit && deadline ? `${UI.mailSubject[lang]} · ${chosen.name} · ${UI.for[lang]} ${dateText(visit)}` : `${UI.mailSubject[lang]} · ${chosen.name}`;

  return (
    <div className={cn("rounded-[24px] bg-branco p-5 text-tinta shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-7", className)}>
      <p className="eyebrow text-cortica">{UI.plannerTitle[lang]}</p>
      <fieldset className="mt-4">
        <legend className="font-display text-xl font-bold uppercase">{UI.pickDish[lang]}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ON_ORDER.map((d) => (
            <label key={d.id} className={cn("cursor-pointer rounded-full px-3.5 py-2 text-[14px] leading-tight shadow-[inset_0_0_0_1.5px_rgba(26,22,20,0.18)] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-dourado", d.id === dish ? "bg-vinho text-branco shadow-none" : "hover:bg-sal")}>
              <input type="radio" name="planner-dish" value={d.id} checked={d.id === dish} onChange={() => setDish(d.id)} className="sr-only" />
              <span lang="pt-PT" className="dish-name">
                {d.name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <div className="flex items-center justify-between">
          <p id="planner-month" className="font-display text-xl font-bold uppercase">
            {UI.whichDay[lang]} <span className="font-semibold text-cortica">· {fmt(lang, month, { month: "long", year: "numeric" })}</span>
          </p>
          <div className="flex gap-1">
            <button type="button" disabled={!canPrev} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label={UI.prevMonth[lang]} className="grid h-10 w-10 place-items-center rounded-full bg-sal disabled:opacity-30">
              <IconArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label={UI.nextMonth[lang]} className="grid h-10 w-10 place-items-center rounded-full bg-sal">
              <IconArrow size={18} />
            </button>
          </div>
        </div>
        <div ref={grid} role="group" aria-labelledby="planner-month" className="mt-3 grid grid-cols-7 gap-1 text-center">
          {weekdays.map((w, i) => (
            <div key={w} aria-hidden="true" className={cn("pb-1 font-display text-[12px] font-semibold uppercase tracking-[0.1em]", i === 6 || i === 0 ? "text-tinta/60 line-through" : "text-cortica")}>
              {w}
            </div>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={`e${i}`} />;
            const closed = isClosedDay(d);
            const ok = canVisit(d, today);
            const sel = visit && sameDay(d, visit);
            const isFocus = sameDay(d, tabDay);
            return (
              <div key={d.toDateString()}>
                <button
                  type="button"
                  data-day={d.toDateString()}
                  tabIndex={isFocus ? 0 : -1}
                  aria-disabled={!ok}
                  aria-pressed={!!sel}
                  aria-label={`${dateText(d)}${closed ? ` · ${UI.closedDay[lang]}` : !ok ? ` · ${UI.tooSoon[lang]}` : ""}`}
                  onClick={() => {
                    setFocusDay(d);
                    if (ok) setVisit(d);
                  }}
                  onKeyDown={(e) => {
                    const k: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
                    if (k[e.key]) {
                      e.preventDefault();
                      move(k[e.key]);
                    }
                  }}
                  className={cn(
                    "relative aspect-square w-full rounded-full font-display text-[16px] font-semibold transition-colors",
                    sel ? "bg-vinho text-branco" : ok ? "hover:bg-dourado/40" : "cursor-not-allowed text-tinta/25",
                    closed && "line-through decoration-1",
                    sameDay(d, today) && !sel && "shadow-[inset_0_0_0_1.5px_var(--color-cortica)]",
                  )}
                >
                  {d.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div aria-live="polite" className="mt-6 [perspective:900px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={deadline ? deadline.toDateString() + dish : "none"}
            initial={reduce ? { opacity: 0 } : { rotateX: -90, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { rotateX: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { rotateX: 90, opacity: 0 }}
            transition={{ duration: reduce ? 0.1 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[18px] bg-vinho p-5 text-branco [transform-origin:50%_50%]"
          >
            {deadline && visit ? (
              <>
                <p className="eyebrow text-dourado">{UI.orderBy[lang]}</p>
                <p className="mt-2 font-display text-[clamp(28px,2.6vw,40px)] font-extrabold uppercase leading-none">{dateText(deadline)}</p>
                <p className="mt-2 text-[15px] text-branco/80">
                  <span lang="pt-PT" className="dish-name font-bold">
                    {chosen.name}
                  </span>{" "}
                  · {UI.for[lang]} {dateText(visit)}
                </p>
                <p className="mt-1 text-[13px] text-branco/60">{UI.orderHint[lang]}</p>
              </>
            ) : (
              <p className="flex items-center gap-3 text-[16px]">
                <LottieIcon name="calendar" size={36} color="#FFFAF2" accent="#F2C05A" mode="loop" />
                {UI.pickADay[lang]}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={`tel:${BUSINESS.phones[0].tel}`} className="btn btn--sm group">
            <LottieIcon name="phone" size={22} />
            <span className="btn-roll">
              <span>{UI.call[lang]}</span>
              <span aria-hidden="true">{UI.call[lang]}</span>
            </span>
          </a>
          <a href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}`} className="btn btn--dark btn--sm">
            <span className="btn-roll">
              <span>{UI.email[lang]}</span>
              <span aria-hidden="true">{UI.email[lang]}</span>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
