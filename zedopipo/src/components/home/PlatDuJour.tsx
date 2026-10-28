import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { HTML_LANG, UI } from "@/i18n";
import { descIn, findDish, priceLabel } from "@/content";
import { genevaNow, type Day } from "@/hours";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Heading, Reveal } from "../Reveal";
import { LottieIcon } from "@/lottie/LottieIcon";

const PLAT = findDish("bienvenue", "Plat du jour");
const SUGGESTIONS = findDish("bienvenue", "Suggestions");
// Monday first; Date.getDay() numbering (0 = Sunday)
const WEEK: Day[] = [1, 2, 3, 4, 5, 6, 0];
const hasPlat = (d: Day) => d >= 1 && d <= 5;

export function PlatDuJour() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [today, setToday] = useState<Day | null>(null);
  useEffect(() => setToday(genevaNow().day), []);
  const names = UI.daysShort[lang].split(",");

  return (
    <section id="plat-du-jour" aria-labelledby="plat-title" className="on-dark tex-wave gutter bg-atlantic py-20 text-linen md:py-28">
      <div className="wrap">
        <Heading id="plat-title" eyebrow={UI.monSat[lang]} title={UI.platTitle[lang]} tone="dark" />
        <Reveal delay={0.05}>
          <ol className="mt-10 grid grid-cols-7 gap-1.5 sm:gap-3" aria-label={PLAT.notes?.[0]?.[lang]}>
            {WEEK.map((d, i) => {
              const isToday = d === today;
              const on = hasPlat(d);
              return (
                <li
                  key={d}
                  aria-current={isToday ? "date" : undefined}
                  className={cn(
                    "relative flex flex-col items-center justify-center rounded-2xl border py-3 text-center sm:py-5",
                    on ? "border-linen/25 bg-linen/8" : "border-linen/10 text-linen/60",
                    isToday && "border-gold bg-gold text-charcoal",
                  )}
                >
                  <span className="font-display text-base font-bold sm:text-2xl">{names[i]}</span>
                  <span aria-hidden="true" className={cn("mt-1 h-1.5 w-1.5 rounded-full", on ? (isToday ? "bg-charcoal" : "bg-ember") : "bg-transparent")} />
                  {isToday && (
                    <motion.span
                      className="absolute -top-3 rounded-full bg-ember px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-charcoal sm:text-xs"
                      initial={reduce ? false : { transform: "translateY(6px)", opacity: 0 }}
                      whileInView={{ transform: "translateY(0px)", opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {UI.today[lang]}
                    </motion.span>
                  )}
                </li>
              );
            })}
          </ol>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[PLAT, SUGGESTIONS].map((d, i) => (
            <Reveal key={d.id} delay={0.08 * i}>
              <article className="group flex h-full gap-5 rounded-[28px] bg-linen p-6 text-charcoal md:p-8">
                <LottieIcon name={i === 0 ? "clock" : "grill"} color="#6B1E2E" accent="#E0612B" size={48} mode="hover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-display text-2xl font-bold text-bordeaux md:text-3xl">{d.name}</h3>
                    <span className="ml-auto font-display text-xl font-bold text-bordeaux">{priceLabel(d, lang, UI.from)}</span>
                  </div>
                  <p lang={HTML_LANG[lang]} className="mt-2 text-[17px] leading-relaxed text-ink-soft">
                    {descIn(d, lang)}
                  </p>
                  {d.notes?.map((n) => (
                    <p key={n.fr} className="mt-3 inline-flex rounded-full bg-linen-2 px-3 py-1 text-sm font-semibold text-bordeaux">
                      {n[lang]}
                    </p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        {today !== null && !hasPlat(today) && <p className="mt-6 text-lg text-linen/90">{UI.noPlatToday[lang]}</p>}
      </div>
    </section>
  );
}
