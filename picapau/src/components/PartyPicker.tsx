// "Combien êtes-vous ?": a − n + stepper (buttons, ← → on the number, or drag the number sideways),
// chairs appearing around a drawn table, and the right way to book for the group size, as the live site
// says it: up to 4 online (TheFork, loaded on click), 5 to 8 by phone, 9 and more on request.
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { copy } from "@/copy";
import { CONTACT } from "@/contact";
import { useSite } from "@/site";
import { cn, EASE_OUT } from "@/lib/utils";
import { PhoneGlyph, Roll, Arrow } from "./ui";

const MIN = 1;
const MAX = 16;
const firstSentence = (s: string) => s.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? s;

export function PartyPicker({ tone = "light", idPrefix }: { tone?: "light" | "dark"; idPrefix: string }) {
  const { lang } = useSite();
  const t = copy(lang);
  const reduce = useReducedMotion();
  const [n, setN] = useState(2);
  const drag = useRef<{ x: number; start: number } | null>(null);
  const set = (v: number) => setN(Math.max(MIN, Math.min(MAX, v)));
  const band = n <= 4 ? "online" : n <= 8 ? "phone" : "request";
  const dark = tone === "dark";
  const labelId = `${idPrefix}-howmany`;

  return (
    <div className="grid gap-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="grid gap-4">
          <h3 id={labelId} className="font-display text-[clamp(30px,3vw,42px)] font-bold uppercase leading-none">
            {t.ui.howMany}
          </h3>
          <div className="flex items-center gap-3">
            <StepButton label={t.ui.fewer} onClick={() => set(n - 1)} disabled={n <= MIN} dark={dark} sign="−" />
            <div
              role="spinbutton"
              tabIndex={0}
              aria-labelledby={labelId}
              aria-valuemin={MIN}
              aria-valuemax={MAX}
              aria-valuenow={n}
              aria-valuetext={t.ui.people(n)}
              onKeyDown={(e) => {
                const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1, PageUp: 4, PageDown: -4 }[e.key];
                if (step) {
                  e.preventDefault();
                  set(n + step);
                } else if (e.key === "Home") set(MIN);
                else if (e.key === "End") set(MAX);
              }}
              onPointerDown={(e) => {
                drag.current = { x: e.clientX, start: n };
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (drag.current) set(drag.current.start + Math.round((e.clientX - drag.current.x) / 28));
              }}
              onPointerUp={() => (drag.current = null)}
              onPointerCancel={() => (drag.current = null)}
              className={cn(
                "relative grid h-[72px] w-[92px] cursor-ew-resize touch-none select-none place-items-center overflow-hidden rounded-2xl font-display text-5xl font-bold tnum",
                dark ? "bg-black/25 text-branco" : "bg-nata text-tinta",
              )}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={n}
                  initial={reduce ? { opacity: 0 } : { y: "70%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={reduce ? { opacity: 0 } : { y: "-70%", opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE_OUT }}
                >
                  {n}
                  {n === MAX ? "+" : ""}
                </motion.span>
              </AnimatePresence>
            </div>
            <StepButton label={t.ui.more} onClick={() => set(n + 1)} disabled={n >= MAX} dark={dark} sign="+" />
          </div>
          <p className={cn("meta text-[13px]", dark ? "text-azulejo-claro" : "text-cortica")} aria-live="polite">
            {t.ui.people(n)}
          </p>
        </div>
        <Table n={n} dark={dark} />
      </div>

      <div aria-live="polite" className="min-h-[188px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={band}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className={cn("grid gap-4 rounded-3xl p-5 sm:p-6", dark ? "bg-black/20" : "bg-nata")}
          >
            <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <span className={cn("eyebrow", dark ? "text-dourado" : "text-francesinha")}>
                {band === "online" ? t.info.bookingOnline : band === "phone" ? t.info.bookingPhone : t.info.bookingLarge}
              </span>
              <strong className="font-display text-xl font-semibold uppercase tracking-[0.06em]">
                {band === "online" ? t.info.bookingOnlineAction : band === "phone" ? t.info.bookingPhoneAction : t.info.bookingLargeAction}
              </strong>
            </p>
            {band === "online" && <TheFork dark={dark} />}
            {band === "phone" && (
              <>
                <p>{firstSentence(t.reservation.phone)}</p>
                <a href={CONTACT.phoneHref} className={cn("btn btn--lg justify-self-start", dark ? "" : "btn--vinho")}>
                  <PhoneGlyph />
                  <Roll>
                    {t.ui.call} · {CONTACT.phoneDisplay}
                  </Roll>
                </a>
              </>
            )}
            {band === "request" && (
              <>
                <p>{t.info.bookingNote}</p>
                <a href={CONTACT.phoneHref} className={cn("btn justify-self-start", dark ? "" : "btn--vinho")}>
                  <PhoneGlyph />
                  <Roll>
                    {t.ui.call} · {CONTACT.phoneDisplay}
                  </Roll>
                </a>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepButton({ label, onClick, disabled, dark, sign }: { label: string; onClick: () => void; disabled: boolean; dark: boolean; sign: string }) {
  return (
    <motion.button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.9 }}
      className={cn(
        "grid h-14 w-14 cursor-pointer place-items-center rounded-full font-display text-3xl font-semibold leading-none transition-opacity disabled:cursor-not-allowed disabled:opacity-35",
        dark ? "bg-dourado text-tinta" : "bg-tinta text-branco",
      )}
    >
      <span aria-hidden="true">{sign}</span>
    </motion.button>
  );
}

/** A round table seen from above; one chair per guest pops in around it (12 drawn at most). */
function Table({ n, dark }: { n: number; dark: boolean }) {
  const reduce = useReducedMotion();
  const shown = Math.min(n, 12);
  const r = 56 + Math.max(0, shown - 4) * 3.2;
  return (
    <svg viewBox="-110 -110 220 220" className="mx-auto h-[190px] w-[190px] sm:h-[210px] sm:w-[210px]" aria-hidden="true">
      <AnimatePresence initial={false}>
        {Array.from({ length: shown }, (_, i) => {
          const a = (i / shown) * Math.PI * 2 - Math.PI / 2;
          const cx = Math.cos(a) * (r + 22);
          const cy = Math.sin(a) * (r + 22);
          return (
            <motion.g
              key={i}
              initial={reduce ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, x: cx, y: cy, rotate: (a * 180) / Math.PI + 90 }}
              exit={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 22 }}
            >
              <rect x="-15" y="-12" width="30" height="24" rx="8" fill={dark ? "#f2b84b" : "#1f4e99"} />
              <rect x="-13" y="8" width="26" height="6" rx="3" fill={dark ? "#fffaf2" : "#c9daf2"} opacity="0.9" />
            </motion.g>
          );
        })}
      </AnimatePresence>
      <motion.g initial={false} animate={{ scale: r / 56 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
        <circle r="56" fill={dark ? "#fffaf2" : "#8a5a32"} />
        <circle r="47" fill="none" stroke={dark ? "#5a1626" : "#f4ecdf"} strokeWidth="2" strokeDasharray="4 6" opacity="0.5" />
      </motion.g>
      {n > 12 && (
        <text textAnchor="middle" dy="0.35em" className="font-display" fontSize="34" fontWeight="700" fill={dark ? "#5a1626" : "#fffaf2"}>
          +{n - 12}
        </text>
      )}
    </svg>
  );
}

/** The TheFork widget the live site embeds: it loads only when the visitor asks for it. */
export function TheFork({ dark }: { dark: boolean }) {
  const { lang } = useSite();
  const t = copy(lang);
  const [load, setLoad] = useState(false);
  if (__ARTIFACT__) {
    // the claude.ai preview cannot embed other sites: the same widget opens in a new tab
    return (
      <a href={CONTACT.booking} target="_blank" rel="noopener" className={cn("btn btn--lg justify-self-start", dark ? "" : "btn--vinho")}>
        <Roll>{t.ui.bookOnline}</Roll>
        <Arrow external />
        <span className="sr-only">{t.ui.newWindow}</span>
      </a>
    );
  }
  if (!load)
    return (
      <div className="grid gap-3">
        <button type="button" onClick={() => setLoad(true)} className={cn("btn btn--lg justify-self-start", dark ? "" : "btn--vinho")}>
          <Roll>{t.ui.bookOnline}</Roll>
          <Arrow />
        </button>
        <a href={CONTACT.booking} target="_blank" rel="noopener" className="text-sm underline underline-offset-4 opacity-80">
          {t.ui.bookOnlineNew} <span className="sr-only">{t.ui.newWindow}</span>
        </a>
      </div>
    );
  return (
    <div className="grid gap-3">
      <div className="overflow-hidden rounded-2xl bg-noite">
        <iframe src={CONTACT.booking} title="Réservation Pica Pau" className="block h-[620px] w-full border-0" loading="lazy" />
      </div>
      <p className="text-sm opacity-85">{t.reservation.subtitle}</p>
    </div>
  );
}
