// Every "Reserve a Table" opens this drawer from the right. Giardino takes reservations by telephone, so calling is
// the primary action; there is no online booking and nothing pretends to confirm one. The party-size stepper with
// its chairs is a planning aid for the call only (labelled as such: nothing is booked or sent).
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import * as Dialog from "@radix-ui/react-dialog";
import { useReturnFocus } from "@/lib/useReturnFocus";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/business";
import { cn, fmt } from "@/lib/utils";
import { Marquee } from "./Marquee";
import { ClosureNotice, OpenStatus, TodayLine } from "./Hours";
import { IconClose, IconMail, IconMinus, IconPhone, IconPlus, Spark } from "./icons";

const BAND = ["Tisch reservieren", "Réserver une table", "Book a table", "Prenotare un tavolo"];
const MIN = 1;
const MAX = 40;

function seats(n: number) {
  const shown = Math.min(n, 16);
  if (shown <= 8) {
    return {
      table: <circle cx="160" cy="105" r="52" />,
      chairs: Array.from({ length: shown }, (_, i) => {
        const a = (i / shown) * Math.PI * 2 - Math.PI / 2;
        return { x: 160 + Math.cos(a) * 80, y: 105 + Math.sin(a) * 74, r: (a * 180) / Math.PI + 90 };
      }),
    };
  }
  const perSide = Math.ceil((shown - 2) / 2);
  const w = Math.min(270, 60 + perSide * 28);
  const x0 = 160 - w / 2;
  const chairs: { x: number; y: number; r: number }[] = [
    { x: x0 - 22, y: 105, r: -90 },
    { x: x0 + w + 22, y: 105, r: 90 },
  ];
  for (let i = 0; chairs.length < shown; i++) {
    const x = x0 + 20 + (i % perSide) * ((w - 40) / Math.max(1, perSide - 1));
    chairs.push(i < perSide ? { x, y: 64, r: 0 } : { x, y: 146, r: 180 });
  }
  return { table: <rect x={x0} y="83" width={w} height="44" rx="12" />, chairs };
}

function PlanCall() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [n, setN] = useState(2);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const set = (v: number) => setN(Math.max(MIN, Math.min(MAX, v)));
  const { table, chairs } = seats(n);
  const guests = `${n} ${n === 1 ? UI.person[lang] : UI.people[lang]}`;
  return (
    <section aria-labelledby="plan-title" className="rounded-[24px] bg-white/10 p-5 sm:p-6">
      <h3 id="plan-title" className="font-display text-[26px] font-extrabold uppercase leading-none">
        {UI.planTitle[lang]}
      </h3>
      <p className="mt-2 text-[14px] text-cream/85">{UI.planNote[lang]}</p>
      <p id="party-label" className="eyebrow mt-5 text-gold">
        {UI.howMany[lang]}
      </p>
      <div className="mt-3 flex items-center gap-3">
        <button type="button" onClick={() => set(n - 1)} disabled={n <= MIN} aria-label={UI.fewer[lang]} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15 transition active:scale-95 disabled:opacity-30">
          <IconMinus size={20} />
        </button>
        <div
          role="spinbutton"
          tabIndex={0}
          aria-labelledby="party-label"
          aria-valuenow={n}
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuetext={guests}
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
          onPointerMove={(e) => drag.current && set(drag.current.start + Math.round((e.clientX - drag.current.x) / 24))}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
          className="flex h-12 flex-1 cursor-ew-resize touch-none select-none items-center justify-center gap-2 overflow-hidden rounded-full bg-white/15 font-display text-3xl font-bold"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={n} initial={reduce ? false : { y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? undefined : { y: -18, opacity: 0 }} transition={{ duration: 0.22 }}>
              {n}
            </motion.span>
          </AnimatePresence>
          <span className="text-sm font-semibold uppercase tracking-[0.16em] opacity-75">{n === 1 ? UI.person[lang] : UI.people[lang]}</span>
        </div>
        <button type="button" onClick={() => set(n + 1)} disabled={n >= MAX} aria-label={UI.moreGuests[lang]} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/15 transition active:scale-95 disabled:opacity-30">
          <IconPlus size={20} />
        </button>
      </div>
      <svg aria-hidden="true" viewBox="0 0 320 210" className="mx-auto mt-3 w-full max-w-[320px] text-cream">
        <g fill="rgba(255,255,255,.1)" stroke="currentColor" strokeWidth="3">
          {table}
        </g>
        {chairs.map((c, i) => (
          <motion.g key={i} initial={reduce ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 420, damping: 22, delay: reduce ? 0 : 0.02 * i }} style={{ originX: `${c.x}px`, originY: `${c.y}px` }}>
            <g transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}>
              <rect x="-11" y="-9" width="22" height="18" rx="5" fill="#DFCE9B" />
              <rect x="-11" y="-15" width="22" height="5" rx="2.5" fill="currentColor" />
            </g>
          </motion.g>
        ))}
        {n > 16 && (
          <text x="160" y="112" textAnchor="middle" fontFamily="Barlow Condensed" fontWeight="800" fontSize="24" fill="currentColor">
            +{n - 16}
          </text>
        )}
      </svg>
      <div aria-live="polite" className="mt-2 rounded-[18px] bg-ink/25 p-4">
        <p className="text-[13px] uppercase tracking-[0.14em] text-cream/80">{UI.sayOnPhone[lang]}</p>
        <p className="mt-1 font-hand text-[26px] leading-tight text-gold">{fmt(UI.phrase[lang], { n: guests })}</p>
      </div>
      <p className="mt-3 text-[14px] text-cream/85">{UI.haveReady[lang]}</p>
    </section>
  );
}

export function BookingDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const returnFocus = useReturnFocus(open);
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay forceMount asChild>
              <motion.div className="fixed inset-0 z-[450] bg-ink/55 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
            </Dialog.Overlay>
            <Dialog.Content forceMount onCloseAutoFocus={returnFocus} asChild aria-describedby="booking-desc">
              <motion.div
                data-drawer="booking"
                style={{ top: "var(--top-safe)" }}
                className="fixed bottom-0 right-0 z-[460] flex w-full max-w-[560px] flex-col overflow-hidden bg-olive text-white shadow-[-30px_0_60px_-30px_rgba(27,27,27,0.7)] sm:rounded-l-[28px]"
                initial={reduce ? { opacity: 0 } : { x: "100%" }}
                animate={reduce ? { opacity: 1 } : { x: "0%" }}
                exit={reduce ? { opacity: 0 } : { x: "100%" }}
                transition={{ duration: reduce ? 0.15 : 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Marquee className="shrink-0 bg-gold py-3 text-ink" speed={70} scrollLinked={false} pauseClassName="h-9 w-9 bg-ink text-gold">
                  {BAND.map((w) => (
                    <span key={w} className="flex items-center gap-5 pr-5 font-display text-[28px] font-extrabold uppercase leading-none tracking-[0.02em]">
                      {w}
                      <Spark className="h-5 w-5 text-olive" />
                    </span>
                  ))}
                </Marquee>
                <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-10 pt-7 sm:px-10">
                  <div className="flex items-start justify-between gap-4">
                    <Dialog.Title className="fs-xl text-gold">{UI.bookingTitle[lang]}</Dialog.Title>
                    <Dialog.Close asChild>
                      <button type="button" aria-label={UI.close[lang]} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cream text-ink transition active:scale-95">
                        <IconClose size={22} />
                      </button>
                    </Dialog.Close>
                  </div>
                  <p id="booking-desc" className="mt-5 text-[18px] leading-snug">
                    {UI.bookingLead[lang]}
                  </p>
                  <ClosureNotice className="mt-5" />
                  <a href={`tel:${BUSINESS.tel}`} data-call className="btn btn--lg mt-6 w-full justify-between">
                    <span className="btn-roll">
                      <span>
                        {UI.call[lang]} · {BUSINESS.phone}
                      </span>
                      <span aria-hidden="true">
                        {UI.call[lang]} · {BUSINESS.phone}
                      </span>
                    </span>
                    <IconPhone size={22} />
                  </a>
                  <p className="eyebrow mt-3 text-cream/90">{UI.phoneHours[lang]}</p>
                  <div className="mt-6 grid gap-2 rounded-[22px] bg-ink/20 p-5">
                    <OpenStatus />
                    <TodayLine className="text-[15px] text-cream/85" />
                  </div>
                  <div className="mt-6">
                    <PlanCall />
                  </div>
                  <a href={`mailto:${BUSINESS.email}`} className={cn("btn btn--ghost btn--sm mt-6 normal-case tracking-[0.04em] text-white")}>
                    <IconMail size={16} />
                    <span className="btn-roll">
                      <span>{BUSINESS.email}</span>
                      <span aria-hidden="true">{BUSINESS.email}</span>
                    </span>
                  </a>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
