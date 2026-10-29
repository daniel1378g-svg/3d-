// The week wheel: seven segments for the days, today lit and chosen first, the chosen day's hours in the centre
// with "Ouvert maintenant" / "Fermé maintenant" on today, and a "Tout / Midi / Soir" filter with a sliding pill
// (with "Soir", Sunday and Monday dim). The days are also a list of buttons in reading order; ← → move between
// them. Reduced motion: no lift, the days just highlight.
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { HOURS, glandNow } from "@content/hours";
import { cn } from "@/lib/utils";
import { dayName, fmtSlot, statusText, useGlandNow } from "./Hours";

type Filter = "both" | "midi" | "soir";
const ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first
const C = 160; // centre of the 320 × 320 drawing
const R0 = 96;
const R1 = 152;

function segment(i: number, lift = 0) {
  const gap = 0.035;
  const a0 = (i / 7) * Math.PI * 2 - Math.PI / 2 + gap;
  const a1 = ((i + 1) / 7) * Math.PI * 2 - Math.PI / 2 - gap;
  const mid = (a0 + a1) / 2;
  const dx = Math.cos(mid) * lift;
  const dy = Math.sin(mid) * lift;
  const p = (r: number, a: number) => `${C + dx + Math.cos(a) * r} ${C + dy + Math.sin(a) * r}`;
  return `M${p(R0, a0)} L${p(R1, a0)} A${R1} ${R1} 0 0 1 ${p(R1, a1)} L${p(R0, a1)} A${R0} ${R0} 0 0 0 ${p(R0, a0)} Z`;
}
const labelAt = (i: number) => {
  const a = ((i + 0.5) / 7) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + (Math.cos(a) * (R0 + R1)) / 2 / 3.2, y: 50 + (Math.sin(a) * (R0 + R1)) / 2 / 3.2 };
};

export function WeekWheel({ className }: { className?: string }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const now = useGlandNow();
  const today = glandNow(now).day;
  const [day, setDay] = useState(today);
  const [filter, setFilter] = useState<Filter>("both");
  const list = useRef<HTMLDivElement>(null);
  const slots = HOURS[day];
  const has = (d: number) => filter !== "soir" || HOURS[d].length > 1;
  const shown = filter === "both" ? slots : filter === "midi" ? slots.slice(0, 1) : slots.slice(1);
  const st = statusText(lang, now);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const n = (i + (e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : 6)) % 7;
    setDay(ORDER[n]);
    list.current?.querySelectorAll<HTMLButtonElement>("button")[n]?.focus();
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        <svg viewBox="0 0 320 320" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
          {ORDER.map((d, i) => {
            const on = d === day;
            const dim = !has(d);
            return (
              <path
                key={d}
                d={segment(i, on && !reduce ? 8 : 0)}
                onClick={() => setDay(d)}
                className="cursor-pointer transition-[fill,opacity] duration-300"
                style={{ transition: reduce ? undefined : "d 0.45s cubic-bezier(0.16,1,0.3,1), fill 0.3s, opacity 0.3s" }}
                fill={on ? "#FFCB8E" : d === today ? "#931A25" : "rgba(255,251,232,0.1)"}
                opacity={dim ? 0.28 : 1}
                stroke={d === today && !on ? "#FFCB8E" : "none"}
                strokeWidth="2"
              />
            );
          })}
        </svg>
        {/* the days as buttons, placed on the ring, in reading order */}
        <div ref={list} role="group" aria-label={UI.weekWheel[lang]} className="absolute inset-0">
          {ORDER.map((d, i) => {
            const { x, y } = labelAt(i);
            const on = d === day;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                tabIndex={on ? 0 : -1}
                aria-label={`${dayName(lang, d, "short").replace(".", "")} · ${dayName(lang, d)}${d === today ? ` · ${UI.today[lang]}` : ""} · ${HOURS[d].map((s) => fmtSlot(lang, s)).join(", ")}`}
                onClick={() => setDay(d)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn("absolute grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-display text-[15px] font-bold uppercase tracking-[0.06em] transition-colors", on ? "text-marca-escura" : "text-branco", !has(d) && "opacity-40")}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                {dayName(lang, d, "short").replace(".", "")}
              </button>
            );
          })}
        </div>
        {/* the centre: the chosen day's hours */}
        <div aria-live="polite" className="pointer-events-none absolute inset-[31%] grid place-items-center rounded-full text-center">
          <div>
            <p className="font-display text-[clamp(16px,1.4vw,20px)] font-bold uppercase tracking-[0.08em] text-destaque">{dayName(lang, day)}</p>
            {shown.length ? (
              shown.map((s) => (
                <p key={s.from} className="font-display text-[clamp(20px,2vw,28px)] font-extrabold leading-[1.05] tabular-nums">
                  {fmtSlot(lang, s)}
                </p>
              ))
            ) : (
              <p className="font-display text-[18px] font-bold uppercase text-suave">{UI.closedService[lang]}</p>
            )}
            {day === today && <p className={cn("mt-1 text-[12px] font-bold uppercase tracking-[0.08em]", st.open ? "text-[#7ee08f]" : "text-suave")}>{st.open ? UI.openNow[lang] : UI.closedNow[lang]}</p>}
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <div role="group" aria-label={`${UI.midi[lang]} / ${UI.soir[lang]}`} className="inline-flex rounded-full bg-branco/10 p-1 shadow-[inset_0_0_0_1px_rgba(255,251,232,0.2)]">
          {(["both", "midi", "soir"] as Filter[]).map((f) => (
            <button key={f} type="button" aria-pressed={filter === f} onClick={() => setFilter(f)} className={cn("relative rounded-full px-5 py-2.5 font-display text-[15px] font-bold uppercase tracking-[0.12em]", filter === f ? "text-marca-escura" : "text-branco")}>
              {filter === f && <motion.span layoutId="wheel-filter" className="absolute inset-0 rounded-full bg-destaque" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }} />}
              <span className="relative">{f === "both" ? UI.both[lang] : UI[f][lang]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
