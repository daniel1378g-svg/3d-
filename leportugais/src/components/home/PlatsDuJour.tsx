// Section 5: the three plats du jour at 25.-. The dishes aren't published, so the cards invite a call.
import type { CSSProperties } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { useInView } from "@/lib/useInView";
import { genevaToday, isClosedDay } from "@/lib/time";
import { cn } from "@/lib/utils";
import { SplitReveal } from "../Reveal";
import { LottieIcon } from "../lottie/LottieIcon";
import type { IconName } from "../lottie/icons";
import { Tile } from "../Illustrations";

const CARDS: { key: "meat" | "fish" | "vegan"; icon: IconName; tone: string }[] = [
  { key: "meat", icon: "pot", tone: "bg-coral text-branco" },
  { key: "fish", icon: "fish", tone: "bg-azulejo text-branco" },
  { key: "vegan", icon: "leaf", tone: "bg-oceano text-branco" },
];

export function PlatsDuJour() {
  const { lang } = useSite();
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const closed = isClosedDay(genevaToday());
  return (
    <section className="tex-azulejo relative overflow-hidden bg-sal py-24 md:py-36" aria-labelledby="pdj-title">
      <Tile className="pointer-events-none absolute -right-10 top-16 w-40 rotate-12 opacity-90 md:w-56" />
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-cortica">05 / 15 · {UI.today[lang]}</p>
            <SplitReveal as="h2" id="pdj-title" text={TEXT.platsTitle[lang]} className="mt-4 fs-mega font-extrabold text-tinta" />
          </div>
          {closed && (
            <p className="flex items-center gap-3 rounded-full bg-tinta px-5 py-3 font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-dourado">
              <span className="relative h-2.5 w-2.5 rounded-full bg-coral">
                <span className="absolute inset-0 rounded-full bg-coral [animation:pulse-dot_1.8s_ease-out_3]" />
              </span>
              {UI.closedTodayShort[lang]}
            </p>
          )}
        </div>
        <p className="mt-8 max-w-[760px] font-display text-[clamp(24px,2.4vw,38px)] font-semibold uppercase leading-[1.05] text-coral">{TEXT.platsDuJour[lang]}</p>
        <div ref={ref} className="mt-14 grid gap-5 [perspective:1400px] md:grid-cols-3">
          {CARDS.map((c, i) => (
            <article
              key={c.key}
              className={cn("group relative flex min-h-[360px] flex-col justify-between rounded-[24px] p-7 shadow-[0_30px_60px_-34px_rgba(12,27,42,0.55)] transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out)] [transform-origin:50%_100%] motion-reduce:transition-none", c.tone, inView ? "[transform:rotateX(0deg)] opacity-100" : "[transform:rotateX(-80deg)] opacity-0")}
              style={{ transitionDelay: `${i * 160}ms` } as CSSProperties}
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-[clamp(44px,4vw,64px)] font-extrabold uppercase leading-none">{UI[c.key][lang]}</h3>
                <span className="grid h-16 w-16 place-items-center rounded-full bg-branco">
                  <LottieIcon name={c.icon} size={44} color="#1A1614" accent="#A22E1E" />
                </span>
              </div>
              <div>
                <p className="font-display text-[clamp(64px,6vw,96px)] font-extrabold leading-none text-dourado">25.-</p>
                <p className="mt-3 text-lg">{UI.askDish[lang]}</p>
                <a href={`tel:${BUSINESS.mobile.tel}`} className="btn btn--cream btn--sm mt-5">
                  <span className="btn-roll">
                    <span>{UI.call[lang]} · {BUSINESS.mobile.label}</span>
                    <span aria-hidden="true">{UI.call[lang]} · {BUSINESS.mobile.label}</span>
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
