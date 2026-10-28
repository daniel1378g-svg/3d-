import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LOCALE, UI, fill } from "@/i18n";
import { GROUPS } from "@/copy";
import { useSite, prefillContact } from "@/site";
import { cn } from "@/lib/utils";
import { Heading, Reveal } from "../Reveal";
import { ArrowRight } from "../icons";

const TYPES = ["team", "friends", "tour"] as const;
const LABEL = { team: UI.groupTeam, friends: UI.groupFriends, tour: UI.groupTour };
const MAX_DRAWN = 16;

// Chair places round the table, filled alternately top and bottom from the middle out, then the ends.
const SEATS: [number, number, number][] = [
  ...[140, 180, 100, 220, 60, 260].flatMap((x): [number, number, number][] => [[x, 44, 0], [x, 176, 180]]),
  [18, 92, -90], [302, 92, 90], [18, 128, -90], [302, 128, 90],
];

export function Groups() {
  const { lang, go } = useSite();
  const reduce = useReducedMotion();
  const id = useId();
  const [type, setType] = useState<(typeof TYPES)[number]>("team");
  const [guests, setGuests] = useState(12);
  const [date, setDate] = useState("");
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const shown = Math.min(guests, MAX_DRAWN);

  const send = () => {
    const when = date ? new Intl.DateTimeFormat(LOCALE[lang], { dateStyle: "long" }).format(new Date(`${date}T12:00:00`)) : "…";
    prefillContact(fill(UI.groupMessage[lang], { type: LABEL[type][lang].toLowerCase(), n: guests, date: when }));
    go("home", "contact");
  };
  const step = (d: number) => setGuests((g) => Math.min(80, Math.max(2, g + d)));

  return (
    <section id="groupes" aria-labelledby="groups-title" className="on-light gutter bg-linen py-20 md:py-28">
      <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Heading id="groups-title" eyebrow={GROUPS.lead[lang]} title={GROUPS.title[lang]} />
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-ink-soft md:text-xl">{GROUPS.text[lang]}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            className="rounded-[32px] bg-white p-6 shadow-[0_40px_80px_-50px_rgba(27,20,20,0.6)] ring-1 ring-charcoal/8 md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <svg viewBox="0 0 320 220" className="mx-auto w-full max-w-[360px]" role="img" aria-label={fill(UI.tableOf[lang], { n: guests })}>
              <rect x="40" y="70" width="240" height="80" rx="18" className="fill-linen-2 stroke-bordeaux" strokeWidth="2.5" />
              <g className="fill-bordeaux/15">
                {[90, 160, 230].map((x) => (
                  <circle key={x} cx={x} cy="110" r="12" />
                ))}
              </g>
              <AnimatePresence initial={false}>
                {SEATS.slice(0, shown).map(([x, y, r], i) => (
                  <motion.g
                    key={i}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.2, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", stiffness: 500, damping: 26 }}
                    style={{ originX: `${x}px`, originY: `${y}px`, transformBox: "view-box" }}
                  >
                    <g transform={`rotate(${r} ${x} ${y})`}>
                      <rect x={x - 14} y={y - 12} width="28" height="22" rx="7" className="fill-ember" />
                      <rect x={x - 14} y={y - 17} width="28" height="6" rx="3" className="fill-bordeaux" />
                    </g>
                  </motion.g>
                ))}
              </AnimatePresence>
              {guests > MAX_DRAWN && (
                <text x="160" y="116" textAnchor="middle" className="fill-bordeaux font-display text-[22px] font-bold">
                  +{guests - MAX_DRAWN}
                </text>
              )}
            </svg>

            <fieldset className="mt-6">
              <legend className="text-sm font-bold uppercase tracking-[0.14em] text-bordeaux">{UI.groupType[lang]}</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TYPES.map((t) => (
                  <label key={t} className={cn("relative inline-flex min-h-11 cursor-pointer items-center rounded-full border-2 px-4 text-[15px] font-semibold transition-colors", type === t ? "border-bordeaux bg-bordeaux text-linen" : "border-charcoal/15 text-charcoal hover:border-bordeaux")}>
                    <input type="radio" name={`${id}-type`} value={t} checked={type === t} onChange={() => setType(t)} className="peer sr-only" />
                    <span className="peer-focus-visible:underline">{LABEL[t][lang]}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-n`} className="text-sm font-bold uppercase tracking-[0.14em] text-bordeaux">
                  {UI.guests[lang]}
                </label>
                <div className="mt-2 flex items-center gap-2">
                  <button type="button" onClick={() => step(-1)} className="grid h-11 w-11 place-items-center rounded-full border-2 border-charcoal/15 text-xl font-bold text-charcoal hover:border-bordeaux" aria-label={UI.fewer[lang]}>
                    −
                  </button>
                  <input
                    id={`${id}-n`}
                    type="number"
                    inputMode="numeric"
                    min={2}
                    max={80}
                    value={guests}
                    onChange={(e) => setGuests(Math.min(80, Math.max(2, Number(e.target.value) || 2)))}
                    className="h-11 w-20 rounded-xl border-2 border-charcoal/15 bg-linen text-center font-display text-xl font-bold text-charcoal"
                  />
                  <button type="button" onClick={() => step(1)} className="grid h-11 w-11 place-items-center rounded-full border-2 border-charcoal/15 text-xl font-bold text-charcoal hover:border-bordeaux" aria-label={UI.more[lang]}>
                    +
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor={`${id}-d`} className="text-sm font-bold uppercase tracking-[0.14em] text-bordeaux">
                  {UI.date[lang]}
                </label>
                <input id={`${id}-d`} type="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 h-11 w-full rounded-xl border-2 border-charcoal/15 bg-linen px-3 text-[16px] font-semibold text-charcoal" />
              </div>
            </div>
            <button type="submit" className="group mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-bordeaux px-6 font-bold text-linen transition-colors hover:bg-bordeaux-deep">
              {UI.sendRequest[lang]}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
