// The double clock: a ring of seven days around a 24-hour dial, with the restaurant's hours as the outer arc and
// the shop's as the inner one, a needle at the current time in Schlieren, and a "Restaurant / Laden / Beide"
// toggle. Friday and Saturday's restaurant arc runs past midnight into the next day's dial. The days are also a
// list of buttons in reading order (arrow keys move between them), and the hours are plain text beside it.
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { HOURS, arcs, dayName, localNow, show, showSlots, type Place } from "@/content/hours";
import { cn } from "@/lib/utils";
import { PlaceToggle } from "./Contact";
import { Moon } from "./Illustrations";

const ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first, as the site lists them
const C = 200;
const polar = (r: number, min: number) => {
  const a = (min / 1440) * Math.PI * 2 - Math.PI / 2;
  return [C + r * Math.cos(a), C + r * Math.sin(a)];
};
/** An SVG arc from `start` to `end` minutes on a ring of radius `r` and width `w`. */
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

export function DoubleClock({ className }: { className?: string }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [now, setNow] = useState(() => localNow());
  useEffect(() => {
    const id = setInterval(() => setNow(localNow()), 30_000);
    return () => clearInterval(id);
  }, []);
  const [day, setDay] = useState(now.day);
  const [filter, setFilter] = useState<Place | "both">("both");
  const showPlace = (p: Place) => filter === "both" || filter === p;
  const needleMin = now.minutes;
  const [nx, ny] = polar(148, needleMin);
  const isToday = day === now.day;
  const restArcs = arcs("restaurant", day);
  const shopArcs = arcs("laden", day);
  const late = HOURS.restaurant[day].some((s) => s.to > "24:00");

  return (
    <div className={cn("grid items-start gap-6", className)}>
      <div className="relative mx-auto w-full max-w-[440px]">
        <svg viewBox="0 0 400 400" className="w-full overflow-visible" aria-hidden="true">
          {/* the seven days */}
          {ORDER.map((d, i) => {
            const on = d === day;
            const mid = ((i + 0.5) / 7) * Math.PI * 2 - Math.PI / 2;
            return (
              <g key={d} onClick={() => setDay(d)} className="cursor-pointer">
                <motion.path d={daySeg(i)} animate={{ fill: on ? "#DFCE9B" : d === now.day ? "rgba(255,255,255,0.26)" : "rgba(255,255,255,0.1)" }} transition={{ duration: reduce ? 0 : 0.3 }} stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                <text x={C + 181 * Math.cos(mid)} y={C + 181 * Math.sin(mid) + 5} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="800" fontSize="14" letterSpacing="1" fill={on ? "#1B1B1B" : "#FFFFFF"} style={{ textTransform: "uppercase", pointerEvents: "none" }}>
                  {dayName(d, lang, "short").replace(".", "")}
                </text>
              </g>
            );
          })}
          {/* the 24-hour dial */}
          <circle cx={C} cy={C} r="150" fill="rgba(0,0,0,0.25)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
          {[0, 6, 12, 18].map((h) => {
            const [x, y] = polar(150, h * 60);
            const [tx, ty] = polar(118, h * 60);
            return (
              <g key={h}>
                <circle cx={x} cy={y} r="2.5" fill="#F3F2E1" />
                <text x={tx} y={ty + 4} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="600" fontSize="11" fill="#F3F2E1" opacity="0.7">
                  {h}:00
                </text>
              </g>
            );
          })}
          {/* restaurant: the outer arc; shop: the inner arc */}
          {showPlace("restaurant") && restArcs.map((a, i) => <motion.path key={`r${i}`} d={ring(140, 14, a.start, a.end)} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} fill="#DFCE9B" stroke={a.spill || a.over ? "#FFFFFF" : "none"} strokeWidth={1.5} strokeDasharray={a.spill || a.over ? "4 3" : undefined} />)}
          {showPlace("laden") && shopArcs.map((a, i) => <motion.path key={`l${i}`} d={ring(120, 12, a.start, a.end)} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} fill="#FFFFFF" opacity={0.85} />)}
          {/* the needle: now in Schlieren, on today's dial only */}
          {isToday && (
            <motion.g animate={{ rotate: 0 }}>
              <line x1={C} y1={C} x2={nx} y2={ny} stroke="#6E6140" strokeWidth="4" strokeLinecap="round" />
              <circle cx={C} cy={C} r="7" fill="#6E6140" stroke="#FFFFFF" strokeWidth="2" />
            </motion.g>
          )}
          {late && (
            <g transform="translate(300 300)">
              <Moon className="h-10 w-10" />
            </g>
          )}
        </svg>
        <div aria-live="polite" className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div className="max-w-[150px]">
            <p className="font-display text-[20px] font-extrabold uppercase leading-none">{dayName(day, lang)}</p>
            {showPlace("restaurant") && (
              <p className="mt-2 font-display text-[13px] font-semibold uppercase tracking-[0.08em] text-destaque">
                {UI.restaurant[lang]}: {showSlots(HOURS.restaurant[day], lang, TX.geschlossen[lang])}
              </p>
            )}
            {showPlace("laden") && (
              <p className="mt-1 font-display text-[13px] font-semibold uppercase tracking-[0.08em]">
                {UI.shopPlace[lang]}: {showSlots(HOURS.laden[day], lang, TX.geschlossen[lang])}
              </p>
            )}
            {late && <p className="mt-1 font-hand text-[20px] text-destaque">{UI.pastMidnight[lang]}</p>}
            {isToday && <p className="mt-1 text-[11px] uppercase tracking-[0.14em] opacity-75">{UI.today[lang]} · {show(`${Math.floor(needleMin / 60)}:${String(needleMin % 60).padStart(2, "0")}`, lang)}</p>}
          </div>
        </div>
      </div>
      <PlaceToggle value={filter} onChange={setFilter} id="clock-place" both className="mx-auto" />
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
        {ORDER.map((d) => (
          <button key={d} type="button" aria-pressed={d === day} tabIndex={d === day ? 0 : -1} onClick={() => setDay(d)} className={cn("rounded-full px-3 py-1.5 font-display text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors", d === day ? "bg-destaque text-marca-escura" : "bg-marca-escura/35 hover:bg-marca-escura/50")}>
            {dayName(d, lang, "short").replace(".", "")}
            <span className="sr-only">
              {" "}
              {dayName(d, lang)} · {UI.restaurant[lang]} {showSlots(HOURS.restaurant[d], lang, TX.geschlossen[lang])} · {UI.shopPlace[lang]} {showSlots(HOURS.laden[d], lang, TX.geschlossen[lang])}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
