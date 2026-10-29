// The group planner: pick one of the five "sur commande" dishes, the number of people (never fewer than 10),
// a day and "Midi" or "Soir" (no dinner on Sunday and Monday). The card shows the indicative total from the
// live price per person. Call, e-mail (prefilled) and "Copier". No order deadline: the site gives none.
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LOCALE, UI, type Lang } from "@/i18n";
import { useSite, PLAN_EVENT, type PlanRequest } from "@/site";
import { BUSINESS } from "@/content/site";
import { ON_ORDER, descText } from "@/content/carte";
import { hasService, type Service } from "@/content/hours";
import { canBook, indicativeTotal, MIN_PERSONS } from "@/lib/groupOrder";
import { addDays, genevaToday, sameDay } from "@/lib/time";
import { cn } from "@/lib/utils";
import { LottieIcon } from "./lottie/LottieIcon";
import { IconArrow, IconArrowLeft } from "./icons";

const fmt = (lang: Lang, d: Date, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat(LOCALE[lang], o).format(d);
/** Two decimals with a point, as the carte writes its prices ("35.00"), in every language. */
const money = (n: number) => n.toFixed(2);

function pending(): PlanRequest | null {
  try {
    const v = sessionStorage.getItem("ea-plan");
    sessionStorage.removeItem("ea-plan");
    return v ? (JSON.parse(v) as PlanRequest) : null;
  } catch {
    return null;
  }
}

export function GroupPlanner({ className }: { className?: string }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const today = useMemo(() => genevaToday(), []);
  const first = useMemo(pending, []);
  const [dish, setDish] = useState(() => (ON_ORDER.some((d) => d.id === first?.dish) ? first!.dish : ON_ORDER[0].id));
  const [persons, setPersons] = useState(() => Math.max(MIN_PERSONS, first?.persons ?? MIN_PERSONS));
  const [service, setService] = useState<Service>("midi");
  const [visit, setVisit] = useState<Date | null>(null);
  const [focusDay, setFocusDay] = useState<Date>(today);
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [copied, setCopied] = useState(false);
  const grid = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // the carte and "Combien êtes-vous ?" preselect a dish (and the party size)
  useEffect(() => {
    const on = (e: Event) => {
      const r = (e as CustomEvent<PlanRequest>).detail;
      if (ON_ORDER.some((d) => d.id === r.dish)) setDish(r.dish);
      if (r.persons) setPersons(Math.max(MIN_PERSONS, r.persons));
    };
    window.addEventListener(PLAN_EVENT, on);
    return () => window.removeEventListener(PLAN_EVENT, on);
  }, []);
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    grid.current?.querySelector<HTMLButtonElement>(`[data-day="${focusDay.toDateString()}"]`)?.focus();
  }, [focusDay, month]);
  // a chosen day that has no dinner drops the "Soir" choice back to "Midi"
  useEffect(() => {
    if (visit && !hasService(visit.getDay(), service)) setService("midi");
  }, [visit]); // eslint-disable-line react-hooks/exhaustive-deps

  const chosen = ON_ORDER.find((d) => d.id === dish)!;
  const per = parseFloat(chosen.price);
  const total = indicativeTotal(per, persons);
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);
  const lead = (firstDay.getDay() + 6) % 7; // weeks start on Monday
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [...Array(lead).fill(null), ...Array.from({ length: days }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  const weekdays = Array.from({ length: 7 }, (_, i) => fmt(lang, new Date(2024, 0, 1 + i), { weekday: "short" }));
  const canPrev = month > new Date(today.getFullYear(), today.getMonth(), 1);
  const inMonth = (d: Date) => d.getFullYear() === month.getFullYear() && d.getMonth() === month.getMonth();
  const tabDay = inMonth(focusDay) ? focusDay : ((cells.find((d) => d && canBook(d, service, today)) ?? cells[lead]) as Date);

  const move = (n: number) => {
    let d = addDays(focusDay, n);
    moved.current = true;
    if (d.getMonth() !== month.getMonth()) setMonth(new Date(d.getFullYear(), d.getMonth(), 1));
    if (d < today) d = today;
    setFocusDay(d);
  };
  const dateText = (d: Date) => fmt(lang, d, { weekday: "long", day: "numeric", month: "long" });
  const line = [chosen.name, `${persons} ${UI.people[lang]}`, visit ? dateText(visit) : null, UI[service][lang].toLowerCase()].filter(Boolean).join(" · ");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(line);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard refused: the line stays visible on the card */
    }
  };

  return (
    <div className={cn("rounded-[24px] bg-branco p-5 text-tinta shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)] sm:p-7", className)}>
      <p className="eyebrow text-linha">{UI.plannerTitle[lang]}</p>
      <fieldset className="mt-4">
        <legend className="font-display text-xl font-bold uppercase">{UI.pickDish[lang]}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {ON_ORDER.map((d) => (
            <label key={d.id} className={cn("cursor-pointer rounded-full px-3.5 py-2 text-[14px] leading-tight shadow-[inset_0_0_0_1.5px_rgba(38,48,58,0.18)] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-destaque", d.id === dish ? "bg-acento-escuro text-branco shadow-none" : "hover:bg-fundo")}>
              <input type="radio" name="planner-dish" value={d.id} checked={d.id === dish} onChange={() => setDish(d.id)} className="sr-only" />
              <span lang="pt-PT" className="dish-name font-semibold">
                {d.name}
              </span>{" "}
              <span className="opacity-75">· {d.price}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <p id="gp-persons" className="font-display text-xl font-bold uppercase">
            {UI.howMany[lang]}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <button type="button" onClick={() => setPersons((p) => Math.max(MIN_PERSONS, p - 1))} disabled={persons <= MIN_PERSONS} aria-label={UI.fewer[lang]} className="grid h-12 w-12 place-items-center rounded-full bg-fundo text-2xl leading-none transition active:scale-95 disabled:opacity-30">
              −
            </button>
            <div
              role="spinbutton"
              tabIndex={0}
              aria-labelledby="gp-persons"
              aria-valuemin={MIN_PERSONS}
              aria-valuemax={80}
              aria-valuenow={persons}
              aria-valuetext={`${persons} ${UI.people[lang]}`}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowUp") (e.preventDefault(), setPersons((p) => Math.min(80, p + 1)));
                if (e.key === "ArrowLeft" || e.key === "ArrowDown") (e.preventDefault(), setPersons((p) => Math.max(MIN_PERSONS, p - 1)));
              }}
              className="flex h-12 flex-1 items-center justify-center gap-1.5 rounded-full bg-fundo font-display text-3xl font-bold"
            >
              {persons} <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-linha">{UI.people[lang]}</span>
            </div>
            <button type="button" onClick={() => setPersons((p) => Math.min(80, p + 1))} aria-label={UI.more[lang]} className="grid h-12 w-12 place-items-center rounded-full bg-fundo text-2xl leading-none transition active:scale-95">
              +
            </button>
          </div>
        </div>
        <div>
          <p className="font-display text-xl font-bold uppercase">{UI.service[lang]}</p>
          <div role="group" aria-label={UI.service[lang]} className="mt-2 inline-flex rounded-full bg-fundo p-1">
            {(["midi", "soir"] as Service[]).map((sv) => {
              const off = sv === "soir" && visit !== null && !hasService(visit.getDay(), "soir");
              return (
                <button key={sv} type="button" aria-pressed={service === sv} disabled={off} onClick={() => setService(sv)} title={off ? UI.noDinner[lang] : undefined} className={cn("relative rounded-full px-5 py-2.5 font-display text-[15px] font-semibold uppercase tracking-[0.12em] disabled:opacity-35", service === sv && "text-marca-escura")}>
                  {service === sv && <motion.span layoutId="gp-service" className="absolute inset-0 rounded-full bg-destaque" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
                  <span className="relative">{UI[sv][lang]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6">
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
          {weekdays.map((w) => (
            <div key={w} aria-hidden="true" className="pb-1 font-display text-[12px] font-semibold uppercase tracking-[0.1em] text-linha">
              {w}
            </div>
          ))}
          {cells.map((d, i) => {
            if (!d) return <div key={`e${i}`} />;
            const ok = canBook(d, service, today);
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
                  aria-label={`${dateText(d)}${!ok && service === "soir" ? ` · ${UI.noDinner[lang]}` : ""}`}
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
                    sel ? "bg-acento-escuro text-branco" : ok ? "hover:bg-destaque/40" : "cursor-not-allowed text-tinta/25",
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
            key={`${dish}-${persons}-${visit?.toDateString() ?? "none"}-${service}`}
            initial={reduce ? false : { rotateX: -70, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { rotateX: 70, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[18px] bg-acento-escuro p-5 text-branco [transform-origin:50%_50%]"
          >
            <p className="eyebrow text-destaque">
              {UI.indicative[lang]} · {descText(chosen, lang)}
            </p>
            <p className="mt-2 font-display text-[clamp(30px,2.8vw,44px)] font-extrabold leading-none">
              ≈ {money(total)} CHF{" "}
              <span className="text-[0.55em] font-semibold uppercase tracking-[0.06em] text-branco/80">
                {UI.totalFor[lang]} {persons} {UI.people[lang]} ({chosen.price} × {persons})
              </span>
            </p>
            <p className="mt-3 text-[15px] text-branco/85">{visit ? line : UI.pickADay[lang]}</p>
            <p className="mt-2 flex items-start gap-2 text-[13px] text-branco/65">
              <LottieIcon name="calendar" size={22} color="#FFFFFF" accent="#DD9933" />
              {UI.noLead[lang]}
            </p>
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex flex-wrap gap-2">
          <a href={`tel:${BUSINESS.phoneTel}`} className="btn btn--sm group">
            <LottieIcon name="phone" size={22} color="#3D0612" accent="#8F0F0F" />
            <span className="btn-roll">
              <span>{UI.call[lang]}</span>
              <span aria-hidden="true">{UI.call[lang]}</span>
            </span>
          </a>
          <a href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(`${UI.mailSubject[lang]} · ${line}`)}`} className="btn btn--dark btn--sm">
            <span className="btn-roll">
              <span>{UI.email[lang]}</span>
              <span aria-hidden="true">{UI.email[lang]}</span>
            </span>
          </a>
          <button type="button" onClick={copy} className="btn btn--ghost btn--sm">
            <span className="btn-roll">
              <span>{copied ? UI.copied[lang] : UI.copy[lang]}</span>
              <span aria-hidden="true">{copied ? UI.copied[lang] : UI.copy[lang]}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
