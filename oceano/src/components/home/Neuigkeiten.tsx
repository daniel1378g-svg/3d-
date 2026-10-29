// Section 5: "Neuigkeiten": the three live teasers as big cards, each with its photo uncovering in an arch, its
// live line and its button. The cards rise one after another; the "Über uns" card carries the chef line in Caveat.
import type { CSSProperties } from "react";
import { UI, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { photo } from "@/content/photos";
import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";
import { MaskImage, SplitReveal } from "../Reveal";
import { PillLink } from "../ui/Pill";
import { IconArrow } from "../icons";
import { Tile } from "../Illustrations";

const CARDS: { page: PageKey; title: "kueche" | "laden" | "ueber"; text: "teaserKueche" | "teaserLaden" | "teaserUeber"; btn: "btnAngebot" | "btnMehr"; photo: string; tone: string }[] = [
  { page: "kueche", title: "kueche", text: "teaserKueche", btn: "btnAngebot", photo: "steak-brett", tone: "bg-marca text-branco" },
  { page: "laden", title: "laden", text: "teaserLaden", btn: "btnAngebot", photo: "laden-kuehlregal", tone: "bg-acento-escuro text-branco" },
  { page: "ueber", title: "ueber", text: "teaserUeber", btn: "btnMehr", photo: "gebaeck", tone: "bg-marca-escura text-branco" },
];

export function Neuigkeiten() {
  const { lang, href, go } = useSite();
  const [ref, inView] = useInView<HTMLDivElement>(0.2);
  return (
    <section id="neuigkeiten" className="tex-marca relative overflow-hidden bg-fundo py-24 md:py-36" aria-labelledby="news-title">
      <Tile className="pointer-events-none absolute -right-10 top-16 w-28 rotate-12 opacity-90 md:w-56" />
      <div className="container-x relative">
        <p className="eyebrow text-linha">05 / 16</p>
        <SplitReveal as="h2" id="news-title" text={TX.neuigkeiten[lang]} className="mt-4 fs-mega font-extrabold text-marca-escura" />
        <div ref={ref} className="mt-14 grid gap-5 [perspective:1400px] md:grid-cols-3">
          {CARDS.map((c, i) => {
            const p = photo(c.photo);
            return (
              <article
                key={c.page}
                className={cn("flex flex-col overflow-hidden rounded-[24px] shadow-[0_30px_60px_-34px_rgba(27,27,27,0.55)] transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out)] [transform-origin:50%_100%] motion-reduce:transition-none", c.tone, inView ? "[transform:rotateX(0deg)] opacity-100" : "[transform:rotateX(-60deg)] opacity-0")}
                style={{ transitionDelay: `${i * 160}ms` } as CSSProperties}
              >
                <MaskImage src={p.sm} srcSet={`${p.sm} 800w, ${p.src} 1600w`} sizes="(min-width: 768px) 33vw, 92vw" alt={p.alt[lang]} w={p.w} h={p.h} delay={i * 0.1} className="arch aspect-[4/3] w-full" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-[clamp(32px,2.8vw,44px)] font-extrabold uppercase leading-none">{UI[c.title][lang]}</h3>
                  {c.page === "ueber" && <p className="mt-3 font-hand text-[22px] leading-tight text-destaque">{TX.teaserUeberShort[lang]}</p>}
                  <p className="mt-3 flex-1 text-[16px] leading-snug opacity-90">{TX[c.text][lang]}</p>
                  <PillLink
                    variant="cream"
                    size="sm"
                    className="mt-5 self-start"
                    href={href(c.page)}
                    onClick={(e) => {
                      e.preventDefault();
                      go(c.page);
                    }}
                    iconRight={<IconArrow size={16} />}
                  >
                    {TX[c.btn][lang]}
                  </PillLink>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
