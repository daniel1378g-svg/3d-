// The hours dial: seven days around a 24-hour clock. Outer arc = the restaurant (11:00–23:00), inner arcs = the
// kitchen (11:30–15:00, 17:00–21:30). Each day stands for its next date in the coming week, so a closure shows as
// closed on exactly the right days, with the regular hours drawn as a dashed ghost. A needle shows the time in
// Leukerbad on today's dial. "Restaurant / Kitchen / Both" filters the arcs; the days are also buttons (arrow keys).
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { WEEK, arcs, dayName, rollingWeek, shortDate, showSlots, showTime, zurichNow, type Place, type Slot } from "@/content/hours";
import { cn, fmt } from "@/lib/utils";
import { useNow } from "./Hours";

const ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first
const C = 200;
const polar = (r: number, min: number) => {
  const a = (min / 1440) * Math.PI * 2 - Math.PI / 2;
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const;
};
function ring(r: number, w: number, start: number, end: number) {
  const r0 = r - w / 2;
  const r1 = r + w / 2;
  const big = end - start > 720 ? 1 : 0;
  const [ax, ay] = polar(r1, start);
  const [bx, by] = polar(r1, end);
  const [cx, cy] = polar(r0, end);
  const [dx, dy] = polar(r0, start);
  return `M ${ax} ${ay} A ${r1} ${r1} 0 ${big} 1 ${bx} ${by} L ${cx} ${cy} A ${r0} ${r0} 0 ${big} 0 ${dx} ${dy} Z`;
}
const daySeg = (i: number, gap = 0.03) => {
  const a0 = (i / 7) * Math.PI * 2 - Math.PI / 2 + gap;
  const a1 = ((i + 1) / 7) * Math.PI * 2 - Math.PI / 2 - gap;
  const p = (r: number, a: number) => `${C + r * Math.cos(a)} ${C + r * Math.sin(a)}`;
  return `M ${p(196, a0)} A 196 196 0 0 1 ${p(196, a1)} L ${p(166, a1)} A 166 166 0 0 0 ${p(166, a0)} Z`;
};

export type Filter = Place | "both";

export function FilterToggle({ value, onChange, id }: { value: Filter; onChange: (v: Filter) => void; id: string }) {
  const { lang } = useSite();
  const items: { v: Filter; label: string }[] = [
    { v: "restaurant", label: UI.restaurant[lang] },
    { v: "kitchen", label: UI.kitchen[lang] },
    { v: "both", label: UI.both[lang] },
  ];
  return (
    <div role="group" aria-label={UI.chooseView[lang]} className="inline-flex rounded-full bg-ink/30 p-1">
      {items.map((it) => (
        <button key={it.v} type="button" aria-pressed={value === it.v} onClick={() => onChange(it.v)} className={cn("relative min-h-11 rounded-full px-4 py-2 font-display text-[14px] font-semibold uppercase tracking-[0.12em]", value === it.v ? "text-ink" : "text-white")}>
          {value === it.v && <motion.span layoutId={id} className="absolute inset-0 rounded-full bg-gold" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
          <span className="relative">{it.label}</span>
        </button>
      ))}
    </div>
  );
}

function dayLine(slots: Slot[], lang: Lang, closedLabel: string) {
  return showSlots(slots, lang, closedLabel);
}

export function HoursDial({ className }: { className?: string }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const now = useNow();
  const zn = zurichNow(now);
  const week = rollingWeek(now);
  const byDay = Object.fromEntries(week.map((d) => [d.day, d]));
  const [day, setDay] = useState(zn.day);
  const [filter, setFilter] = useState<Filter>("both");
  const sel = byDay[day];
  const show = (p: Place) => filter === "both" || filter === p;
  const ghost = !!sel.closure || sel.restaurant.length === 0;
  const isToday = sel.date === zn.date;
  const [nx, ny] = polar(152, zn.minutes);
  const [hx, hy] = polar(96, zn.minutes);
  const closedLabel = sel.closure ? TX.closureDays[lang] : WEEK.restaurant[day].length ? UI.closedDay[lang] : UI.restDay[lang];
  const restArcs = arcs(sel.closure ? WEEK.restaurant[day] : sel.restaurant);
  const kitchenArcs = arcs(sel.closure ? WEEK.kitchen[day] : sel.kitchen);
  const clock = `${String(Math.floor(zn.minutes / 60)).padStart(2, "0")}:${String(zn.minutes % 60).padStart(2, "0")}`;

  return (
    <div className={cn("grid items-start gap-6", className)}>
      <div className="relative mx-auto w-full max-w-[460px]">
        <svg viewBox="0 0 400 400" className="w-full overflow-visible" aria-hidden="true">
          {ORDER.map((d, i) => {
            const on = d === day;
            const info = byDay[d];
            const mid = ((i + 0.5) / 7) * Math.PI * 2 - Math.PI / 2;
            const closed = info.restaurant.length === 0;
            return (
              <g key={d} onClick={() => setDay(d)} className="cursor-pointer">
                <motion.path d={daySeg(i)} initial={false} animate={{ fill: on ? "#DFCE9B" : d === zn.day ? "rgba(255,255,255,0.26)" : "rgba(255,255,255,0.1)" }} transition={{ duration: reduce ? 0 : 0.3 }} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                <text x={C + 181 * Math.cos(mid)} y={C + 181 * Math.sin(mid) + 5} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="800" fontSize="14" letterSpacing="1" fill={on ? "#1B1B1B" : "#FFFFFF"} opacity={closed && !on ? 0.55 : 1} style={{ textTransform: "uppercase", pointerEvents: "none" }}>
                  {dayName(d, lang, "short")}
                </text>
              </g>
            );
          })}
          <circle cx={C} cy={C} r="150" fill="rgba(0,0,0,0.22)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          {Array.from({ length: 24 }, (_, h) => {
            const [x, y] = polar(150, h * 60);
            const [x2, y2] = polar(h % 6 === 0 ? 141 : 146, h * 60);
            return <line key={h} x1={x} y1={y} x2={x2} y2={y2} stroke="#F3F2E1" strokeOpacity={h % 6 === 0 ? 0.8 : 0.35} strokeWidth={h % 6 === 0 ? 2 : 1} />;
          })}
          {[0, 6, 12, 18].map((h) => {
            const [tx, ty] = polar(104, h * 60);
            return (
              <text key={h} x={tx} y={ty + 4} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="600" fontSize="12" fill="#F3F2E1" opacity="0.75">
                {showTime(`${h}:00`, lang)}
              </text>
            );
          })}
          {show("restaurant") &&
            restArcs.map((a, i) => (
              <motion.path key={`r${day}${i}`} d={ring(132, 14, a.start, a.end)} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: ghost ? 0.9 : 1 }} fill={ghost ? "none" : "#DFCE9B"} stroke={ghost ? "#DFCE9B" : "none"} strokeWidth={1.5} strokeDasharray={ghost ? "5 4" : undefined} />
            ))}
          {show("kitchen") &&
            kitchenArcs.map((a, i) => (
              <motion.path key={`k${day}${i}`} d={ring(114, 11, a.start, a.end)} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: ghost ? 0.8 : 0.92 }} fill={ghost ? "none" : "#FBFAF5"} stroke={ghost ? "#FBFAF5" : "none"} strokeWidth={1.2} strokeDasharray={ghost ? "4 4" : undefined} />
            ))}
          {isToday && (
            // the hand starts outside the centre so the day's details stay readable
            <g>
              <line x1={hx} y1={hy} x2={nx} y2={ny} stroke="#1B1B1B" strokeWidth="4" strokeLinecap="round" />
              <circle cx={nx} cy={ny} r="6" fill="#1B1B1B" stroke="#FBFAF5" strokeWidth="2" />
            </g>
          )}
        </svg>
        <div aria-live="polite" className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div className="max-w-[170px]">
            <p className="font-display text-[22px] font-extrabold uppercase leading-none">{dayName(day, lang)}</p>
            <p className="mt-1 text-[12px] uppercase tracking-[0.14em] opacity-80">{shortDate(sel.date, lang)}</p>
            {show("restaurant") && (
              <p className="mt-2 font-display text-[14px] font-semibold uppercase tracking-[0.06em] text-gold">
                {UI.restaurant[lang]}: {dayLine(sel.restaurant, lang, closedLabel)}
              </p>
            )}
            {show("kitchen") && sel.restaurant.length > 0 && (
              <p className="mt-1 font-display text-[13px] font-semibold uppercase leading-tight tracking-[0.06em]">
                {UI.kitchen[lang]}: {dayLine(sel.kitchen, lang, UI.closedDay[lang])}
              </p>
            )}
            {ghost && sel.closure && sel.closure.reopens && <p className="mt-1 font-hand text-[19px] leading-tight text-gold">{fmt(TX.regularFrom[lang], { date: shortDate(sel.closure.reopens, lang) })}</p>}
            {isToday && (
              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] opacity-80">
                {UI.today[lang]} · {lang === "fr" ? clock.replace(":", " h ") : clock}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <FilterToggle value={filter} onChange={setFilter} id="dial-filter" />
      </div>
      <div
        role="group"
        aria-label={UI.days[lang]}
        className="flex flex-wrap justify-center gap-1.5"
        onKeyDown={(e) => {
          if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
          const items = [...e.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
          const i = items.indexOf(document.activeElement as HTMLButtonElement);
          const next = items[(i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length];
          next.focus();
          next.click();
          e.preventDefault();
        }}
      >
        {ORDER.map((d) => {
          const info = byDay[d];
          return (
            <button key={d} type="button" aria-pressed={d === day} tabIndex={d === day ? 0 : -1} onClick={() => setDay(d)} className={cn("min-h-11 min-w-11 rounded-full px-3 py-1.5 font-display text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors", d === day ? "bg-gold text-ink" : "bg-ink/30 hover:bg-ink/45")}>
              {dayName(d, lang, "short")}
              <span className="sr-only">
                {" "}
                {shortDate(info.date, lang)} · {UI.restaurant[lang]} {showSlots(info.restaurant, lang, info.closure ? TX.closureDays[lang] : UI.restDay[lang])}
                {info.restaurant.length ? ` · ${UI.kitchen[lang]} ${showSlots(info.kitchen, lang, "")}` : ""}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
