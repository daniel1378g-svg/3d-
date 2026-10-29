// The week wheel: seven segments on a ring for the days, today lit and chosen first, the chosen day's hours in
// the centre, and a "Midi / Soir" toggle; with "Soir", Sunday and Monday dim (no dinner). The days are also a
// list of buttons in reading order (arrow keys move between them).
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { HOURS, dayName, fmtSlot, hasService, localNow, type Service } from "@/content/hours";
import { cn } from "@/lib/utils";

const ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday first, as the site lists them
const R1 = 150;
const R0 = 92;
function arc(i: number, n = 7, gap = 0.035) {
  const a0 = (i / n) * Math.PI * 2 - Math.PI / 2 + gap;
  const a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2 - gap;
  const p = (r: number, a: number) => `${170 + r * Math.cos(a)} ${170 + r * Math.sin(a)}`;
  return `M ${p(R1, a0)} A ${R1} ${R1} 0 0 1 ${p(R1, a1)} L ${p(R0, a1)} A ${R0} ${R0} 0 0 0 ${p(R0, a0)} Z`;
}

export function WeekWheel({ className }: { className?: string }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const today = localNow().day;
  const [day, setDay] = useState(today);
  const [service, setService] = useState<Service | "all">("all");
  const slots = HOURS[day].filter((_, i) => service === "all" || (service === "midi" ? i === 0 : i === 1));
  const off = (d: number) => service === "soir" && !hasService(d, "soir");

  return (
    <div className={cn("grid items-center gap-6", className)}>
      <div className="relative mx-auto w-full max-w-[380px]">
        <svg viewBox="0 0 340 340" className="w-full overflow-visible" aria-hidden="true">
          {ORDER.map((d, i) => {
            const on = d === day;
            const mid = ((i + 0.5) / 7) * Math.PI * 2 - Math.PI / 2;
            return (
              <g key={d} onClick={() => setDay(d)} className="cursor-pointer" style={{ opacity: off(d) ? 0.3 : 1, transition: "opacity .3s" }}>
                <motion.path
                  d={arc(i)}
                  animate={{ scale: on && !reduce ? 1.06 : 1, fill: on ? "#DD9933" : d === today ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.12)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  style={{ originX: "170px", originY: "170px" }}
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.5"
                />
                <text x={170 + 121 * Math.cos(mid)} y={170 + 121 * Math.sin(mid) + 6} textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="800" fontSize="17" letterSpacing="1" fill={on ? "#3D0612" : "#FFFFFF"} style={{ textTransform: "uppercase", pointerEvents: "none" }}>
                  {dayName(d, lang, "short").replace(".", "")}
                </text>
              </g>
            );
          })}
        </svg>
        <div aria-live="polite" className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div className="max-w-[150px]">
            <p className="font-display text-[22px] font-extrabold uppercase leading-none">{dayName(day, lang)}</p>
            {slots.length ? (
              slots.map((s) => (
                <p key={s.from} className="mt-1 font-display text-[17px] font-semibold tracking-[0.04em] text-destaque">
                  {fmtSlot(s, lang)}
                </p>
              ))
            ) : (
              <p className="mt-1 text-[14px]">{UI.noDinner[lang]}</p>
            )}
            {day === today && <p className="mt-1 text-[12px] uppercase tracking-[0.14em] opacity-75">{UI.today[lang]}</p>}
          </div>
        </div>
      </div>
      <div role="group" aria-label={UI.service[lang]} className="mx-auto inline-flex rounded-full bg-marca-escura/35 p-1">
        {(["all", "midi", "soir"] as const).map((sv) => (
          <button key={sv} type="button" aria-pressed={service === sv} onClick={() => setService(sv)} className={cn("relative rounded-full px-5 py-2.5 font-display text-[15px] font-semibold uppercase tracking-[0.12em]", service === sv && "text-marca-escura")}>
            {service === sv && <motion.span layoutId="ww-service" className="absolute inset-0 rounded-full bg-destaque" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
            <span className="relative">{sv === "all" ? UI.sideAll[lang] : UI[sv][lang]}</span>
          </button>
        ))}
      </div>
      {/* the days as buttons, in reading order */}
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
          <button key={d} type="button" aria-pressed={d === day} tabIndex={d === day ? 0 : -1} onClick={() => setDay(d)} className={cn("rounded-full px-3 py-1.5 font-display text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors", d === day ? "bg-destaque text-marca-escura" : "bg-marca-escura/35 hover:bg-marca-escura/50", off(d) && d !== day && "opacity-45")}>
            {dayName(d, lang, "short").replace(".", "")}
            <span className="sr-only">
              {" "}
              {dayName(d, lang)} · {HOURS[d].map((s) => fmtSlot(s, lang)).join(" + ")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
