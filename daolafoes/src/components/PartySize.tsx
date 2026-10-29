// "Wie viele sind Sie?": a white card with − / number pill / +. The number is a spinbutton (1–40), draggable,
// ← → on the keyboard. Up to 8 people sit around a round cream table; from 9 the table is a long rounded
// rectangle with one chair at each end and the rest split on the long sides (the top side takes the odd one);
// over 20 the drawing stays at 20 chairs and prints "+N". Chairs spring in one by one. Below: "Rufen Sie an
// oder schreiben Sie uns…", the phone pill and the e-mail pill (party size in the subject); from 10 the four
// party services. The size is kept for the reservation form's "Zusatzinformationen".
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI } from "@/i18n";
import { getParty, setParty, useSite } from "@/site";
import { BUSINESS, TX, fill } from "@/content/site";
import { cn } from "@/lib/utils";
import { IconMail, IconPhone } from "./icons";

const MIN = 1;
const MAX = 40;
const SHOWN_MAX = 20;

type Chair = { x: number; y: number; r: number };
function seats(n: number): { table: React.ReactNode; chairs: Chair[]; long: boolean } {
  const shown = Math.min(n, SHOWN_MAX);
  if (shown <= 8) {
    return {
      long: false,
      table: <circle cx="160" cy="112" r="54" />,
      chairs: Array.from({ length: shown }, (_, i) => {
        const a = (i / shown) * Math.PI * 2 - Math.PI / 2;
        return { x: 160 + Math.cos(a) * 84, y: 112 + Math.sin(a) * 80, r: (a * 180) / Math.PI + 90 };
      }),
    };
  }
  const sides = shown - 2;
  const top = Math.ceil(sides / 2);
  const bottom = sides - top;
  const w = Math.min(276, 70 + top * 24);
  const x0 = 160 - w / 2;
  const chairs: Chair[] = [
    { x: x0 - 22, y: 112, r: -90 },
    { x: x0 + w + 22, y: 112, r: 90 },
  ];
  const place = (count: number, y: number, r: number) => {
    for (let i = 0; i < count; i++) {
      const x = count === 1 ? 160 : x0 + 18 + (i * (w - 36)) / (count - 1);
      chairs.push({ x, y, r });
    }
  };
  place(top, 72, 0);
  place(bottom, 152, 180);
  return { long: true, table: <rect x={x0} y="90" width={w} height="44" rx="14" />, chairs };
}

export function PartySize({ className, compact = false, onChange }: { className?: string; compact?: boolean; onChange?: (n: number) => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [n, setN] = useState(() => getParty());
  const drag = useRef<{ x: number; start: number } | null>(null);
  const set = (v: number) => setN(Math.max(MIN, Math.min(MAX, v)));
  useEffect(() => {
    setParty(n);
    onChange?.(n);
  }, [n]); // eslint-disable-line react-hooks/exhaustive-deps
  const { table, chairs, long } = seats(n);
  const subject = n === 1 ? TX.n_emailSubject1[lang] : fill(TX.n_emailSubject[lang], { n });
  const big = n >= BUSINESS.bigParty;
  const party = [TX.svc3, TX.svc4, TX.svc5, TX.svc6];

  return (
    <div className={cn("rounded-[24px] bg-branco p-5 text-marca shadow-[0_30px_60px_-40px_rgba(43,26,18,0.5)] sm:p-7", className)}>
      <h3 id="party-label" className="font-display text-[clamp(24px,2.2vw,34px)] font-semibold leading-tight">
        {UI.howMany[lang]}
      </h3>
      <div className="mt-4 flex items-center gap-3">
        <button type="button" onClick={() => set(n - 1)} disabled={n <= MIN} aria-label={UI.fewer[lang]} className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-fundo text-3xl leading-none text-marca transition active:scale-95 disabled:opacity-30">
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
          title={UI.dragHint[lang]}
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
          className="flex h-14 flex-1 cursor-ew-resize touch-none select-none items-center justify-center gap-2 rounded-full bg-fundo font-display text-4xl font-semibold text-marca"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={n} initial={reduce ? false : { y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? undefined : { y: -18, opacity: 0 }} transition={{ duration: 0.2 }}>
              {n}
            </motion.span>
          </AnimatePresence>
          <span className="eyebrow text-linha">{n === 1 ? UI.person[lang] : UI.people[lang]}</span>
        </div>
        <button type="button" onClick={() => set(n + 1)} disabled={n >= MAX} aria-label={UI.more[lang]} className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-fundo text-3xl leading-none text-marca transition active:scale-95 disabled:opacity-30">
          +
        </button>
      </div>

      <svg aria-hidden="true" viewBox="0 0 320 224" className={cn("mx-auto mt-3 w-full text-marca", compact ? "max-w-[300px]" : "max-w-[360px]")}>
        <motion.g key={long ? "long" : "round"} initial={reduce ? false : { scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} style={{ originX: "160px", originY: "112px" }} fill="#FDF9F6" stroke="currentColor" strokeWidth="3">
          {table}
        </motion.g>
        {chairs.map((c, i) => (
          <motion.g key={`${long ? "l" : "r"}-${i}`} initial={reduce ? false : { scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 420, damping: 22, delay: reduce ? 0 : 0.025 * i }} style={{ originX: `${c.x}px`, originY: `${c.y}px` }}>
            <g transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}>
              <rect x="-11" y="-9" width="22" height="18" rx="5" fill="#E04505" />
              <rect x="-11" y="-15" width="22" height="5" rx="2.5" fill="#513528" />
            </g>
          </motion.g>
        ))}
        {n > SHOWN_MAX && (
          <text x="160" y="119" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontWeight="600" fontSize="24" fill="currentColor">
            +{n - SHOWN_MAX}
          </text>
        )}
      </svg>

      <div aria-live="polite" className="mt-3 space-y-3">
        <p className="text-[15px] leading-snug text-linha">{TX.n_svcResLine[lang]}</p>
        <div className="flex flex-wrap gap-2">
          <a href={`tel:${BUSINESS.phones[0].tel}`} className="btn btn--sm btn--orange">
            <IconPhone size={18} />
            <span className="btn-roll">
              <span>{BUSINESS.phones[0].show}</span>
              <span aria-hidden="true">{BUSINESS.phones[0].show}</span>
            </span>
          </a>
          <a href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(subject)}`} className="btn btn--sm btn--dark">
            <IconMail size={18} />
            <span className="btn-roll">
              <span>{UI.email[lang]}</span>
              <span aria-hidden="true">{UI.email[lang]}</span>
            </span>
          </a>
        </div>
        <AnimatePresence initial={false}>
          {big && (
            <motion.div key="party" initial={reduce ? false : { opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={reduce ? undefined : { opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
              <p className="text-[14px] text-linha">{fill(TX.n_bigParty[lang], { n: BUSINESS.bigParty })}</p>
              <ul className="mt-2 flex list-none flex-wrap gap-1.5">
                {party.map((p, i) => (
                  <motion.li key={i} initial={reduce ? false : { scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.05 * i, type: "spring", stiffness: 400, damping: 22 }} className="rounded-full bg-suave px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-marca">
                    {p[lang].toLowerCase().replace(/^\p{L}/u, (c) => c.toUpperCase())}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
        <p className="text-[12px] text-linha/80">{TX.n_partyNote[lang]}</p>
      </div>
    </div>
  );
}
