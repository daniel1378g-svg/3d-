// The 48-hour planner: pick a dish (chips by group, with an accent-insensitive search), the day of the visit on
// a small calendar and "Midi" or "Soir" ("Soir" is off on Sunday and Monday; days less than 48 hours away are
// off). The card shows "Commandez au plus tard le …", two days before the visit, with that day's opening hours
// as the time to call. "Appeler" for both numbers, and "Copier" to copy the dish, day and service.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LOCALE, UI, type Lang } from "@/i18n";
import { useSite, PLAN_EVENT } from "@/site";
import { BUSINESS, DISHES, GROUPS } from "@/content/site";
import { HOURS } from "@content/hours";
import { canVisit, hasService, orderDeadline, type Service } from "@/lib/orderDeadline";
import { addDays, sameDay, zurichToday } from "@/lib/time";
import { cn, fold, storage } from "@/lib/utils";
import { LottieIcon } from "./lottie/LottieIcon";
import { fmtSlot } from "./Hours";
import { IconArrow, IconArrowLeft, IconCheck, IconCopy, IconSearch } from "./icons";

const fmt = (lang: Lang, d: Date, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(LOCALE[lang], o).format(d);

export function Planner48({ className }: { className?: string }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const today = useMemo(() => zurichToday(), []);
  const [dish, setDish] = useState(() => {
    // a "Planifier (48 h)" link on the menu page leaves the dish here before coming to the home page
    const pending = storage("session").get("ls-plan");
    storage("session").set("ls-plan", "");
    return DISHES.some((d) => d.id === pending) ? pending! : "especialidades";
  });
  const [query, setQuery] = useState("");
  const [service, setService] = useState<Service>("midi");
  const [visit, setVisit] = useState<Date | null>(null);
  const [copied, setCopied] = useState(false);
  const [focusDay, setFocusDay] = useState<Date>(() => addDays(today, 2));
  const [month, setMonth] = useState(() => new Date(focusDay.getFullYear(), focusDay.getMonth(), 1));
  const grid = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    const on = (e: Event) => {
      setDish((e as CustomEvent<string>).detail);
      setQuery("");
    };
    window.addEventListener(PLAN_EVENT, on);
    return () => window.removeEventListener(PLAN_EVENT, on);
  }, []);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    grid.current?.querySelector<HTMLButtonElement>(`[data-day="${focusDay.toDateString()}"]`)?.focus();
  }, [focusDay, month]);
  // a dinner can't be on Sunday or Monday: switching to "Soir" drops such a day
  useEffect(() => {
    if (visit && !canVisit(visit, service, today)) setVisit(null);
  }, [service, visit, today]);

  const chosen = DISHES.find((d) => d.id === dish) ?? DISHES[0];
  const deadline = visit ? orderDeadline(visit) : null;
  const q = fold(query.trim());
  const shown = q ? DISHES.filter((d) => fold(d.name).includes(q)) : DISHES;
  // weeks start on Monday
  const first = new Date(month.getFullYear(), month.getMonth(), 1);
  const lead = (first.getDay() + 6) % 7;
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  const weekdays = Array.from({ length: 7 }, (_, i) => fmt(lang, new Date(2024, 0, 1 + i), { weekday: "short" }));
  const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1);
  const inMonth = (d: Date) => d.getFullYear() === month.getFullYear() && d.getMonth() === month.getMonth();
  const tabDay = inMonth(focusDay) ? focusDay : ((cells.find((d) => d && canVisit(d, service, today)) ?? cells[lead]) as Date);

  const move = (n: number) => {
    let d = addDays(focusDay, n);
    moved.current = true;
    if (d < today) d = today;
    if (d.getMonth() !== month.getMonth() || d.getFullYear() !== month.getFullYear()) setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    setFocusDay(d);
  };
  const dateText = (d: Date) => fmt(lang, d, { weekday: "long", day: "numeric", month: "long" });
  const line = visit ? `${chosen.name} · ${dateText(visit)} · ${UI[service][lang].toLowerCase()}` : chosen.name;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(line);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = line;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand?.("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div id="planner" className={cn("scroll-mt-28 rounded-[24px] bg-branco p-5 text-tinta shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-7", className)}>
      <p className="eyebrow text-linha">{UI.plannerTitle[lang]}</p>

      <fieldset className="mt-4">
        <legend className="font-display text-xl font-bold uppercase">{UI.pickDish[lang]}</legend>
        <label className="mt-3 flex items-center gap-2 rounded-full bg-fundo px-4 py-2.5 has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-destaque">
          <IconSearch size={18} />
          <span className="sr-only">{UI.searchDish[lang]}</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={UI.searchDish[lang]} className="w-full bg-transparent text-[16px] outline-none placeholder:text-linha" />
        </label>
        <div className="no-scrollbar mt-3 max-h-[220px] space-y-3 overflow-y-auto pr-1">
          {GROUPS.map((g) => {
            const items = shown.filter((d) => d.group === g.id);
            if (!items.length) return null;
            return (
              <div key={g.id}>
                <p className="mb-1.5 font-display text-[12px] font-bold uppercase tracking-[0.16em] text-linha">
                  <span lang="pt-PT">{g.pt}</span> · {g.local[lang]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((d) => (
                    <label key={d.id} className={cn("cursor-pointer rounded-full px-3 py-1.5 text-[14px] leading-tight shadow-[inset_0_0_0_1.5px_rgba(67,60,60,0.2)] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-destaque", d.id === dish ? "bg-acento-escuro text-branco shadow-none" : "hover:bg-fundo")}>
                      <input type="radio" name="planner-dish" value={d.id} checked={d.id === dish} onChange={() => setDish(d.id)} className="sr-only" />
                      <span lang="pt-PT" className="dish-name">
                        {d.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
          {!shown.length && <p className="text-[15px] text-linha">{UI.noResult[lang]}</p>}
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="font-display text-xl font-bold uppercase">{UI.whichService[lang]}</legend>
        <div className="relative mt-3 inline-flex rounded-full bg-fundo p-1">
          {(["midi", "soir"] as Service[]).map((s) => {
            const off = s === "soir" && visit !== null && !hasService(visit.getDay(), "soir");
            return (
              <button key={s} type="button" aria-pressed={service === s} disabled={off} onClick={() => setService(s)} className="relative rounded-full px-5 py-2 font-display text-[15px] font-bold uppercase tracking-[0.12em] disabled:opacity-35">
                {service === s && <motion.span layoutId="planner-service" className="absolute inset-0 rounded-full bg-destaque" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }} />}
                <span className="relative">{UI[s][lang]}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p id="planner-month" className="font-display text-xl font-bold uppercase">
            {UI.whichDay[lang]} <span className="font-semibold text-linha">· {fmt(lang, month, { month: "long", year: "numeric" })}</span>
          </p>
          <div className="flex gap-1">
            <button type="button" disabled={!canPrev} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} aria-label={UI.prevMonth[lang]} className="grid h-10 w-10 place-items-center rounded-full bg-fundo disabled:opacity-30">
              <IconArrowLeft size={18} />
            </button>
            <button type="button" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} aria-label={UI.nextMonth[lang]} className="grid h-10 w-10 place-items-center rounded-full bg-fundo">
              <IconArrow size={18} />
            </button>
          </div>
        </div>
        <div ref={grid} role="group" aria-labelledby="planner-month" className="mt-3 grid grid-cols-7 gap-1 text-center">
          {weekdays.map((w, i) => (
            <div key={w + i} aria-hidden="true" className="pb-1 font-display text-[12px] font-semibold uppercase tracking-[0.1em] text-linha">
              {w}
            </div>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={`e${i}`} />;
            const ok = canVisit(d, service, today);
            const tooSoon = d < addDays(today, 2);
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
                  aria-label={`${dateText(d)}${tooSoon ? ` · ${UI.tooSoon[lang]}` : !ok ? ` · ${UI.noDinner[lang]}` : ""}`}
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
                    sel ? "bg-acento-escuro text-branco" : ok ? "hover:bg-destaque/60" : "cursor-not-allowed text-tinta/30",
                    !tooSoon && !ok && "line-through decoration-1",
                    sameDay(d, today) && !sel && "shadow-[inset_0_0_0_1.5px_var(--color-linha)]",
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
            key={deadline ? deadline.toDateString() + dish + service : "none"}
            initial={reduce ? false : { rotateX: -90, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { rotateX: 0, opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { rotateX: 90, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[18px] bg-acento-escuro p-5 text-branco [transform-origin:50%_50%]"
          >
            {deadline && visit ? (
              <>
                <p className="eyebrow text-destaque">{UI.orderBy[lang]}</p>
                <p className="mt-2 font-display text-[clamp(28px,2.6vw,40px)] font-extrabold uppercase leading-none">{dateText(deadline)}</p>
                <p className="mt-3 text-[15px] text-branco/90">
                  <span lang="pt-PT" className="dish-name font-bold">
                    {chosen.name}
                  </span>{" "}
                  · {dateText(visit)} · {UI[service][lang].toLowerCase()}
                </p>
                <p className="mt-2 text-[14px] text-branco/80">
                  {UI.orderHint[lang]} {HOURS[deadline.getDay()].map((s) => fmtSlot(lang, s)).join(" · ")}
                </p>
              </>
            ) : (
              <p className="flex items-center gap-3 text-[16px]">
                <LottieIcon name="calendar" size={36} color="#FFFBE8" accent="#FFCB8E" mode="loop" />
                {UI.pickADay[lang]}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex flex-wrap gap-2">
          {BUSINESS.phones.map((p, i) => (
            <a key={p.tel} href={`tel:${p.tel}`} className={cn("btn btn--sm group", i === 1 && "btn--dark")}>
              <LottieIcon name="phone" size={22} color={i === 1 ? "#FFFBE8" : "#310B0A"} accent={i === 1 ? "#FFCB8E" : "#931A25"} />
              <span className="btn-roll">
                <span>
                  {UI.call[lang]} · {p.label}
                </span>
                <span aria-hidden="true">
                  {UI.call[lang]} · {p.label}
                </span>
              </span>
            </a>
          ))}
          <button type="button" onClick={copy} className="btn btn--ghost btn--sm">
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
            <span className="btn-roll">
              <span>{copied ? UI.copied[lang] : UI.copy[lang]}</span>
              <span aria-hidden="true">{copied ? UI.copied[lang] : UI.copy[lang]}</span>
            </span>
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? `${UI.copied[lang]} : ${line}` : ""}
          </span>
        </div>
      </div>
    </div>
  );
}
