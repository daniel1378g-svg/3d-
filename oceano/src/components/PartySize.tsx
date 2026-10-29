// "Combien êtes-vous ?": a − 2 + stepper (also draggable, and ← → on the number) with chairs that appear
// around a drawn table, then "Online Reservierung" (the MyLocalina widget in the drawer) and "Anrufen". The
// number is not passed to MyLocalina: its widget documents no parameter for it (listed in the hand-off).
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/site";
import { cn } from "@/lib/utils";
import { PillButton } from "./ui/Pill";
import { LottieIcon } from "./lottie/LottieIcon";

const MIN = 1;
const MAX = 80;

function seats(n: number) {
  const shown = Math.min(n, 20);
  // round table up to 8, then a long table
  if (shown <= 8) {
    return {
      table: <circle cx="160" cy="110" r="56" />,
      chairs: Array.from({ length: shown }, (_, i) => {
        const a = (i / shown) * Math.PI * 2 - Math.PI / 2;
        return { x: 160 + Math.cos(a) * 84, y: 110 + Math.sin(a) * 78, r: (a * 180) / Math.PI + 90 };
      }),
    };
  }
  const perSide = Math.ceil((shown - 2) / 2);
  const w = Math.min(280, 60 + perSide * 26);
  const x0 = 160 - w / 2;
  const chairs: { x: number; y: number; r: number }[] = [{ x: x0 - 22, y: 110, r: -90 }, { x: x0 + w + 22, y: 110, r: 90 }];
  for (let i = 0; chairs.length < shown; i++) {
    const x = x0 + 20 + (i % perSide) * ((w - 40) / Math.max(1, perSide - 1));
    chairs.push(i < perSide ? { x, y: 70, r: 0 } : { x, y: 150, r: 180 });
  }
  return { table: <rect x={x0} y="88" width={w} height="44" rx="12" />, chairs };
}

export function PartySize({ tone = "light", className }: { tone?: "light" | "blue"; className?: string }) {
  const { lang, book } = useSite();
  const reduce = useReducedMotion();
  const [n, setN] = useState(2);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const set = (v: number) => setN(Math.max(MIN, Math.min(MAX, v)));
  const { table, chairs } = seats(n);
  const ink = tone === "light" ? "text-tinta" : "text-branco";

  return (
    <div className={cn("rounded-[24px] p-6 sm:p-8", tone === "light" ? "bg-branco text-tinta" : "bg-branco/10 text-branco", className)}>
      <h3 id="party-label" className="fs-m">
        {UI.howMany[lang]}
      </h3>
      <div className="mt-5 flex items-center gap-3">
        <button type="button" onClick={() => set(n - 1)} disabled={n <= MIN} aria-label={UI.fewer[lang]} className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-full text-3xl leading-none transition active:scale-95 disabled:opacity-30", tone === "light" ? "bg-fundo" : "bg-branco/15")}>
          −
        </button>
        <div
          role="spinbutton"
          tabIndex={0}
          aria-labelledby="party-label"
          aria-valuenow={n}
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuetext={`${n} ${n === 1 ? UI.person[lang] : UI.people[lang]}`}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight" || e.key === "ArrowUp") (set(n + 1), e.preventDefault());
            if (e.key === "ArrowLeft" || e.key === "ArrowDown") (set(n - 1), e.preventDefault());
            if (e.key === "Home") (set(MIN), e.preventDefault());
            if (e.key === "End") (set(MAX), e.preventDefault());
          }}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, start: n };
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => drag.current && set(drag.current.start + Math.round((e.clientX - drag.current.x) / 22))}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
          className={cn("flex h-14 flex-1 cursor-ew-resize touch-none select-none items-center justify-center gap-2 rounded-full font-display text-4xl font-bold", tone === "light" ? "bg-fundo" : "bg-branco/15")}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={n} initial={reduce ? false : { y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? undefined : { y: -18, opacity: 0 }} transition={{ duration: 0.22 }}>
              {n}
            </motion.span>
          </AnimatePresence>
          <span className="font-display text-sm font-semibold uppercase tracking-[0.16em] opacity-70">{n === 1 ? UI.person[lang] : UI.people[lang]}</span>
        </div>
        <button type="button" onClick={() => set(n + 1)} disabled={n >= MAX} aria-label={UI.more[lang]} className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-full text-3xl leading-none transition active:scale-95 disabled:opacity-30", tone === "light" ? "bg-fundo" : "bg-branco/15")}>
          +
        </button>
      </div>

      <svg aria-hidden="true" viewBox="0 0 320 220" className={cn("mx-auto mt-4 w-full max-w-[360px]", ink)}>
        <g fill={tone === "light" ? "#F3EDE2" : "rgba(255,255,255,.12)"} stroke="currentColor" strokeWidth="3">
          {table}
        </g>
        {chairs.map((c, i) => (
          <motion.g key={i} initial={reduce ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 420, damping: 22, delay: reduce ? 0 : 0.02 * i }} style={{ originX: `${c.x}px`, originY: `${c.y}px` }}>
            <g transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}>
              <rect x="-11" y="-9" width="22" height="18" rx="5" fill={tone === "light" ? "#555555" : "#DFCE9B"} />
              <rect x="-11" y="-15" width="22" height="5" rx="2.5" fill="currentColor" />
            </g>
          </motion.g>
        ))}
        {n > 20 && (
          <text x="160" y="116" textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="800" fontSize="24" fill="currentColor">
            +{n - 20}
          </text>
        )}
      </svg>

      <div aria-live="polite" className="mt-4 space-y-3">
        <div className="flex flex-wrap gap-2">
          <PillButton size="sm" onClick={book} icon={<LottieIcon name="calendar" size={22} color="#1B1B1B" accent="#6E6140" />}>
            {UI.online[lang]}
          </PillButton>
          <a href={`tel:${BUSINESS.restaurant.tel}`} className={cn("btn btn--sm group", tone === "light" ? "btn--dark" : "btn--cream")}>
            <LottieIcon name="phone" size={22} color={tone === "light" ? "#FFFFFF" : "#1B1B1B"} accent="#DFCE9B" />
            <span className="btn-roll">
              <span>
                {UI.call[lang]} · {BUSINESS.restaurant.phone}
              </span>
              <span aria-hidden="true">
                {UI.call[lang]} · {BUSINESS.restaurant.phone}
              </span>
            </span>
          </a>
        </div>
        <p className={cn("text-[13px]", tone === "light" ? "text-linha" : "text-suave")}>{UI.partyNote[lang]}</p>
      </div>
    </div>
  );
}
