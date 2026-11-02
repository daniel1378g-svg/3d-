// "What awaits you" – alternating editorial rows with the restaurant's own photographs, clipped reveals, a gentle
// parallax, oversized headings and handwritten notes: the children's menu, the indoor playroom, the summer
// playground with its pirate ship, the terrace facing the Gemmi and Torrent, and Pascal and Anja Loretan's hospitality.
import { useRef } from "react";
import { UI, type L } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { MENUS } from "@/content/business";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { cn } from "@/lib/utils";
import { FadeIn, MaskPhoto, SplitReveal } from "@/components/Reveal";
import { Stamp } from "@/components/Illustrations";
import { Medallion } from "@/components/Brand";
import { IconFile } from "@/components/icons";

type Row = { id: string; nav?: string; kicker: string; title: L; text: L; hand?: L; photo: string; second?: string; shape: string; focus?: string; menu?: "kids" };
const ROWS: Row[] = [
  { id: "kids-menu", nav: "offerings", kicker: "Bambini", title: TX.offKidsMenuTitle, text: TX.offKidsMenu, photo: "playroom-mural", shape: "aspect-[4/3] rounded-[26px]", menu: "kids" },
  { id: "playroom", nav: "offerings", kicker: "Gioco", title: TX.offPlayroomTitle, text: TX.offPlayroom, photo: "playroom-climber", second: "playroom-ride-on", shape: "aspect-[5/4] rounded-[26px]" },
  { id: "playground", nav: "offerings", kicker: "Pirati", title: TX.offShipTitle, text: TX.offShip, hand: TX.offShipHand, photo: "ship-portrait", shape: "arch-full aspect-[3/4]", focus: "50% 60%" },
  { id: "terrace", kicker: "Terrazza", title: TX.offTerraceTitle, text: TX.offTerrace, hand: TX.offTerraceHand, photo: "terrace-flowers", second: "garden-view", shape: "aspect-[4/3] rounded-[26px]" },
];

export function Offerings({ only }: { only?: "families" | "all" }) {
  const { lang } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();
  useGsap(
    (gsap) => {
      gsap.utils.toArray<HTMLElement>(".of-par").forEach((el) => {
        gsap.fromTo(el, { yPercent: 6 }, { yPercent: -6, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
      });
    },
    root,
    [reduce],
    !reduce,
  );
  const rows = only === "families" ? ROWS.slice(0, 3) : ROWS;
  const kids = MENUS.find((m) => m.id === "kids")!;
  return (
    <section id="offerings" data-anchor data-nav="offerings" ref={root} className="tex-leaf relative overflow-hidden bg-cream py-24 text-ink md:py-36" aria-labelledby="offerings-title">
      <div className="container-x">
        <p className="eyebrow text-muted">La famiglia · {UI.families[lang]}</p>
        <SplitReveal as="h2" id="offerings-title" text={TX.offeringsTitle[lang]} className="mt-4 fs-xxl font-extrabold" />
        <FadeIn as="p" className="mt-5 max-w-[820px] font-hand text-[clamp(30px,2.8vw,44px)] leading-[1.05] text-olive">
          {TX.kidsLine[lang]}
        </FadeIn>
        <div className="mt-16 space-y-24 md:space-y-36">
          {rows.map((r, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={r.id} id={r.id} data-anchor data-nav={r.nav} className={cn("grid items-center gap-10 md:gap-16 lg:grid-cols-2")} aria-labelledby={`${r.id}-title`}>
                <div className={cn("relative", flip && "lg:order-2")}>
                  <div className="of-par">
                    <MaskPhoto id={r.photo} sizes="(min-width: 1024px) 46vw, 92vw" from={flip ? "right" : "left"} className={cn(r.shape, "w-full", r.shape.includes("arch") && "mx-auto max-w-[460px]")} focus={r.focus} />
                  </div>
                  {r.second && (
                    <div className={cn("absolute -bottom-10 w-[38%] md:-bottom-14", flip ? "-left-4 md:-left-8" : "-right-4 md:-right-8")}>
                      <MaskPhoto id={r.second} sizes="20vw" delay={0.2} className="aspect-square rounded-[20px] shadow-[0_24px_50px_-24px_rgba(27,27,27,0.6)] ring-8 ring-cream" />
                    </div>
                  )}
                  {r.id === "playground" && (
                    <Stamp text={TX.stampFamily[lang]} tone="green" className="absolute -right-2 top-6 w-28 md:right-6 md:w-36">
                      <span aria-hidden="true" className="font-display text-[34px] font-extrabold leading-none text-gold">
                        2016
                      </span>
                    </Stamp>
                  )}
                </div>
                <div className={cn(flip && "lg:order-1")}>
                  <p className="font-display text-[clamp(64px,7vw,120px)] font-extrabold leading-none text-olive/25" aria-hidden="true">
                    0{i + 1}
                  </p>
                  <p className="eyebrow -mt-3 text-olive">{r.kicker}</p>
                  <SplitReveal as="h3" id={`${r.id}-title`} text={r.title[lang]} className="mt-3 fs-xl font-extrabold" />
                  {r.hand && <p className="mt-4 font-hand text-[clamp(28px,2.4vw,38px)] leading-none text-olive">{r.hand[lang]}</p>}
                  <FadeIn as="p" className="lede mt-5 max-w-[560px] text-ink/85">
                    {r.text[lang]}
                  </FadeIn>
                  {r.menu && (
                    <a href={kids.href} target="_blank" rel="noopener noreferrer" className="btn btn--dark btn--sm mt-6">
                      <IconFile size={18} />
                      <span className="btn-roll">
                        <span>{kids.title[lang]} · PDF</span>
                        <span aria-hidden="true">{kids.title[lang]} · PDF</span>
                      </span>
                      <span className="sr-only">
                        {" "}
                        · {kids.mb.toLocaleString(lang)} MB · {kids.pages} {UI.pages[lang]} ({UI.newTab[lang]})
                      </span>
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
      {only !== "families" && <Hosts />}
    </section>
  );
}

/** Pascal and Anja Loretan: the hosts' photograph in a tall arch, their motto and signature. */
export function Hosts() {
  const { lang } = useSite();
  return (
    <div id="hosts" data-anchor data-nav="hosts" className="container-x mt-28 md:mt-40">
      <div className="grid items-center gap-12 rounded-[34px] bg-ink p-6 text-white md:p-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <MaskPhoto id="hosts" sizes="(min-width: 1024px) 40vw, 90vw" className="arch-full aspect-[4/5] w-full" focus="62% 40%" />
        <div>
          <p className="eyebrow text-gold">Famiglia · {UI.story[lang]}</p>
          <SplitReveal as="h3" text={TX.offHostsTitle[lang]} className="mt-4 fs-l font-extrabold" />
          <FadeIn as="p" className="lede mt-6 text-white/90">
            {TX.offHosts[lang]}
          </FadeIn>
          <blockquote className="mt-8 border-l-4 border-gold pl-5">
            <p className="font-display text-[clamp(24px,2.2vw,34px)] font-bold uppercase leading-[1.05]">{TX.hostsQuote[lang]}</p>
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <Medallion className="h-16 w-16" />
            <p className="font-hand text-[clamp(28px,2.4vw,36px)] leading-none text-gold">{TX.hostsSign[lang]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
