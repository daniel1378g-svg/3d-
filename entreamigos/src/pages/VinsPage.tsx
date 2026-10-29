// Nos vins: the hero with the cork coaster and the wine count, the wine journey (large, without the home
// paragraph), the full list by the live sections with prices and the bottle pictures, "Les vins portugais"
// verbatim beside the live map image, and the Sumol line.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { SECTION_L, WINE_SECTIONS, WINES } from "@/content/vins";
import { wineImage } from "@/content/photos";
import { FadeIn, SplitReveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { CorkCoaster } from "@/components/CorkCoaster";
import { WineJourney, WineLine } from "@/components/WineJourney";
import { Orange, Pineapple } from "@/components/Illustrations";

const REGION_ORDER = ["Dão", "Douro", "Alentejo"];

export default function VinsPage() {
  const { lang } = useSite();
  const bottles = { verde: wineImage("casal-gazela"), blanc: wineImage("douro-planalto") } as Record<string, ReturnType<typeof wineImage> | undefined>;
  const map = wineImage("carte-vins");
  return (
    <div className="on-dark bg-marca-escura text-branco">
      <section className="tex-wave relative overflow-hidden pb-20" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
        <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(260px,4fr)]">
          <div>
            <p className="eyebrow text-destaque">{UI.vins[lang]}</p>
            <SplitReveal as="h1" text={[TEXT.wineTitle[lang]]} className="mt-4 fs-xxl font-extrabold" />
            <p className="mt-8 font-display text-[clamp(56px,6vw,104px)] font-extrabold leading-none text-destaque">
              <Counter to={WINES.length} /> <span className="text-[0.4em] uppercase tracking-[0.08em] text-branco">{UI.wines[lang]}</span>
            </p>
          </div>
          <div>
            <CorkCoaster className="mx-auto w-full max-w-[340px]" />
            <p className="mt-3 text-center font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-suave">{UI.spinHint[lang]}</p>
          </div>
        </div>
      </section>

      <section className="pb-24" aria-labelledby="journey-title">
        <div className="container-x">
          <h2 id="journey-title" className="sr-only">
            {UI.regions[lang]}
          </h2>
          <WineJourney withText={false} />
        </div>
      </section>

      {/* the full list, by the live sections */}
      <section className="bg-acento-escuro py-20 md:py-28" aria-labelledby="list-title">
        <div className="container-x">
          <h2 id="list-title" className="sr-only">
            {UI.allWines[lang]}
          </h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {WINE_SECTIONS.map((s) => {
              const groups = s.id === "rouge" ? REGION_ORDER.map((r) => ({ region: r, wines: s.wines.filter((w) => w.regionName === r) })) : [{ region: null, wines: s.wines }];
              const bottle = bottles[s.id];
              return (
                <FadeIn key={s.id} as="section" aria-labelledby={`ws-${s.id}`} className="relative rounded-[24px] bg-branco/[0.06] p-6 md:p-8">
                  <h3 id={`ws-${s.id}`}>
                    <span lang="fr" className="block font-display text-[clamp(34px,3.2vw,56px)] font-extrabold uppercase leading-[0.9]">
                      {s.title}
                      {s.id === "rouge" && <span className="ml-2 text-[0.5em] opacity-75">75cl</span>}
                    </span>
                    {lang !== "fr" && <span className="mt-1 block font-display text-[20px] font-semibold uppercase tracking-[0.06em] text-suave">{SECTION_L[s.id][lang]}</span>}
                  </h3>
                  <div className="mt-4 flex gap-6">
                    <div className="flex-1">
                      {groups.map((g) => (
                        <div key={g.region ?? s.id} className="mt-2">
                          {g.region && <p className="eyebrow mt-4 text-destaque">{g.region} 75cl</p>}
                          <ul className="list-none">
                            {g.wines.map((w) => (
                              <WineLine key={w.id} w={w} lang={lang} />
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {bottle && <img src={bottle.src} alt="" width={bottle.w} height={bottle.h} loading="lazy" className="hidden w-20 self-end sm:block" />}
                  </div>
                </FadeIn>
              );
            })}
          </div>
          <p className="mt-6 text-[14px] text-suave">
            {TEXT.prices[lang]} · {UI.bottles[lang]}
          </p>
        </div>
      </section>

      {/* "Les vins portugais", verbatim */}
      <section className="py-20 md:py-28" aria-labelledby="lvp-title">
        <div className="container-x grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(260px,4fr)]">
          <div>
            <SplitReveal as="h2" id="lvp-title" text={[TEXT.lesVinsTitle[lang]]} className="fs-xl font-extrabold" />
            <p className="mt-6 text-[clamp(17px,1.2vw,19px)] leading-relaxed text-branco/85">{TEXT.lesVinsIntro[lang]}</p>
            <dl className="mt-8 space-y-5">
              {TEXT.lesVinsRegions.map((r) => (
                <div key={r.name}>
                  <dt lang="pt-PT" className="font-display text-[24px] font-bold uppercase text-destaque">
                    {r.name}
                  </dt>
                  <dd className="mt-1 leading-relaxed text-branco/85">{r.text[lang]}</dd>
                </div>
              ))}
            </dl>
            {lang !== "fr" && <p className="mt-6 text-[13px] text-suave">{UI.translation[lang]} · fr</p>}
          </div>
          <figure className="self-start">
            <img src={map.src} alt={TEXT.lesVinsTitle[lang]} width={map.w} height={map.h} loading="lazy" className="w-full rounded-[18px]" />
            <figcaption className="mt-2 text-[13px] text-suave">{TEXT.mapCredit}</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-destaque py-16 text-marca-escura">
        <div className="container-x flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-4">
            <Orange className="w-20" />
            <Pineapple className="w-14" />
          </div>
          <p className="max-w-[820px] font-display text-[clamp(24px,2.2vw,36px)] font-bold uppercase leading-[1.05]">{TEXT.sumol[lang]}</p>
        </div>
      </section>
    </div>
  );
}
