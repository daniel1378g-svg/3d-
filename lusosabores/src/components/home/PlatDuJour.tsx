// Section 5: the plat du jour. The two live lines, then three cards that flip in one by one ("Assiette du jour
// 01–03"; the third "selon le jour", since the menu page says "2 ou 3 assiettes du jour"). The dishes aren't
// published, so the cards invite a call. The live block's photo is Unsplash stock, so the arch holds an
// illustration and a labelled photo slot instead. A badge shows today's service from the hours.
import type { CSSProperties } from "react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { HOURS, glandNow } from "@content/hours";
import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";
import { SplitReveal } from "../Reveal";
import { LottieIcon } from "../lottie/LottieIcon";
import type { IconName } from "../lottie/icons";
import { Francesinha, Tile } from "../Illustrations";
import { useGlandNow } from "../Hours";

const CARDS: { icon: IconName; tone: string; ink: string; accent: string }[] = [
  { icon: "pot", tone: "bg-marca text-branco", ink: "#310B0A", accent: "#931A25" },
  { icon: "flame", tone: "bg-acento text-marca-escura", ink: "#310B0A", accent: "#931A25" },
  { icon: "fish", tone: "bg-marca-escura text-branco", ink: "#310B0A", accent: "#931A25" },
];

export function PlatDuJour() {
  const { lang } = useSite();
  const [ref, inView] = useInView<HTMLDivElement>(0.25);
  const now = useGlandNow();
  const day = glandNow(now).day;
  const both = HOURS[day].length > 1;
  return (
    <section className="tex-azulejo relative overflow-hidden bg-fundo py-24 text-tinta md:py-36" aria-labelledby="pdj-title">
      <Tile className="pointer-events-none absolute -right-10 top-16 w-40 rotate-12 opacity-90 md:w-56" />
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-linha">05 / 15 · {UI.today[lang]}</p>
            <SplitReveal as="h2" id="pdj-title" text={[UI.platDuJour[lang]]} className="mt-4 fs-mega font-extrabold text-marca" />
          </div>
          <p className="flex items-center gap-3 rounded-full bg-marca-escura px-5 py-3 font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-destaque">
            <LottieIcon name="clock" size={24} color="#FFFBE8" accent="#FFCB8E" mode="loop" />
            {both ? UI.todayLunchDinner[lang] : UI.todayLunch[lang]}
          </p>
        </div>
        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(280px,4fr)]">
          <div>
            <p className="max-w-[820px] font-display text-[clamp(26px,2.6vw,42px)] font-semibold uppercase leading-[1.04] text-marca">{TEXT.platDuJour1[lang]}</p>
            <p className="mt-5 max-w-[640px] text-[clamp(18px,1.3vw,21px)]">{TEXT.platDuJour2[lang]}</p>
            <div ref={ref} className="mt-12 grid gap-5 [perspective:1400px] md:grid-cols-3">
              {CARDS.map((c, i) => (
                <article
                  key={i}
                  className={cn("group relative flex min-h-[340px] flex-col justify-between rounded-[24px] p-6 shadow-[0_30px_60px_-34px_rgba(49,11,10,0.55)] transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out)] [transform-origin:50%_100%] motion-reduce:transition-none", c.tone, inView ? "[transform:rotateX(0deg)] opacity-100" : "[transform:rotateX(-80deg)] opacity-0")}
                  style={{ transitionDelay: `${i * 160}ms` } as CSSProperties}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[clamp(24px,2vw,30px)] font-extrabold uppercase leading-[0.95]">
                      {UI.plate[lang]}
                      <span className="mt-1 block text-[clamp(56px,5vw,80px)] leading-none">0{i + 1}</span>
                    </h3>
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-branco">
                      <LottieIcon name={c.icon} size={38} color={c.ink} accent={c.accent} />
                    </span>
                  </div>
                  <div>
                    {i === 2 && <p className="mb-2 inline-block rounded-full bg-destaque px-3 py-1 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-marca-escura">{UI.dependsDay[lang]}</p>}
                    <p className="text-lg font-bold">{UI.askDish[lang]}</p>
                    <a href={`tel:${BUSINESS.booking.tel}`} className="btn btn--cream btn--sm mt-4">
                      <span className="btn-roll">
                        <span>{BUSINESS.booking.label}</span>
                        <span aria-hidden="true">{BUSINESS.booking.label}</span>
                      </span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="arch-full relative grid aspect-[3/4] w-full max-w-[440px] place-items-center self-start justify-self-center bg-acento lg:mt-2">
            <Francesinha className="w-[70%]" />
            <p className="absolute inset-x-6 bottom-8 rounded-full bg-marca-escura/80 px-4 py-2 text-center font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-branco">
              {UI.photo[lang]} : {UI.platDuJour[lang]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
