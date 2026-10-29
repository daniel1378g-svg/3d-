// Les vins: the hero with the cork coaster and the counts by colour, the large wine map, then the full list
// grouped by colour and region exactly as on the live page (no prices: the live list has none).
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, LINKS, TEXT } from "@/content/site";
import { COLOURS, FOOTNOTE_L, REGIONS, WINES, wineDetails, wineExtra, WINE_NOTES } from "@/content/vins";
import { cn } from "@/lib/utils";
import { FadeIn, SplitReveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { CorkCoaster } from "@/components/CorkCoaster";
import { WineExplorer } from "@/components/WineExplorer";
import { LottieIcon } from "@/components/lottie/LottieIcon";
import { IconExternal, IconMail, IconPhone } from "@/components/icons";
import { PortGlass, Cork } from "@/components/Illustrations";

const LABEL = { tinto: "red", rosado: "rose", branco: "white" } as const;

export default function VinsPage() {
  const { lang } = useSite();
  return (
    <div className="on-dark bg-oceano text-branco">
      <section className="tex-wave relative overflow-hidden pb-20" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
        <div className="container-x grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(260px,4fr)]">
          <div>
            <p className="eyebrow text-dourado">
              {UI.vins[lang]} · {WINES.length} {UI.wines[lang]} · {REGIONS.length} {UI.regions[lang].toLowerCase()}
            </p>
            <SplitReveal as="h1" lang="pt-PT" text={["Vinhos", "& Portos"]} lineClassName={(i) => (i ? "text-dourado" : undefined)} className="mt-4 fs-mega font-extrabold" />
            <dl className="mt-10 flex flex-wrap gap-8">
              {COLOURS.map((c) => (
                <div key={c.id}>
                  <dt className="eyebrow text-espuma">{UI[LABEL[c.id]][lang]}</dt>
                  <dd className="font-display text-[clamp(56px,6vw,96px)] font-extrabold leading-none" style={{ color: c.id === "tinto" ? "#F2C05A" : undefined }}>
                    <Counter to={WINES.filter((w) => w.colour === c.id).length} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative">
            <CorkCoaster className="mx-auto w-full max-w-[380px]" />
            <p className="mt-3 text-center font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-espuma">{UI.spinHint[lang]}</p>
            <PortGlass className="absolute -left-4 top-4 w-16 -rotate-12" />
          </div>
        </div>
      </section>

      <section className="bg-oceano py-16 md:py-24" aria-labelledby="map-title">
        <div className="container-x">
          <h2 id="map-title" className="sr-only">{UI.regions[lang]}</h2>
          <WineExplorer large />
        </div>
      </section>

      {/* the full list, as on the live page */}
      {COLOURS.map((c) => (
        <section key={c.id} className={cn("py-16 md:py-24", c.id === "tinto" ? "bg-vinho" : c.id === "rosado" ? "bg-coral" : "bg-sal text-tinta")} aria-labelledby={`list-${c.id}`}>
          <div className="container-x">
            <h2 id={`list-${c.id}`}>
              <span lang="pt-PT" className="block fs-xl font-extrabold">
                {c.pt}
              </span>
              {lang !== "pt" && <span className="mt-2 block fs-m font-bold opacity-75">{c.local[lang]}</span>}
            </h2>
            {REGIONS.filter((r) => r.colour === c.id).map((r) => (
              <div key={r.id} className={cn("mt-12 grid gap-6 border-t pt-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]", c.id === "branco" ? "border-tinta/20" : "border-branco/20")}>
                <h3 className="font-display text-[clamp(40px,5vw,84px)] font-extrabold uppercase leading-[0.9]">
                  {r.name}
                  <span className="mt-2 block font-display text-[14px] font-semibold tracking-[0.16em] opacity-90">
                    {r.wines.length} {r.wines.length === 1 ? UI.wine[lang] : UI.wines[lang]}
                  </span>
                </h3>
                <ul className="list-none">
                  {r.wines.map((w) => (
                    <FadeIn as="li" key={w.id} className={cn("grid gap-1 border-b py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-6", c.id === "branco" ? "border-tinta/10" : "border-branco/10")}>
                      <div>
                        <p lang="pt-PT" className="dish-name font-display text-[clamp(20px,1.7vw,26px)] font-bold uppercase leading-tight">
                          {w.name}
                          {w.notes.map((n) => (
                            <span key={n} className="ml-2 align-middle font-display text-[12px] font-semibold tracking-[0.12em] opacity-80">
                              ({WINE_NOTES[n][lang]})
                            </span>
                          ))}
                        </p>
                        <p className="text-[15px] opacity-85">
                          {w.producer}
                          {w.extra && ` · ${wineExtra(w, lang)}`} · {wineDetails(w, lang)}
                        </p>
                      </div>
                      <p className="font-display text-[22px] font-bold sm:text-right">{w.abv}</p>
                    </FadeIn>
                  ))}
                </ul>
              </div>
            ))}
            {c.id === "branco" && <p className="mt-10 font-hand text-[28px] text-cortica">{FOOTNOTE_L[lang]}</p>}
          </div>
        </section>
      ))}

      <section className="bg-azulejo py-20 md:py-28">
        <div className="container-x grid items-center gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
          <div>
            <p className="flex items-center gap-3 eyebrow text-dourado">
              <LottieIcon name="glass" size={36} color="#FFFAF2" accent="#F2C05A" mode="loop" />
              {UI.wineSales[lang]}
            </p>
            <p className="mt-4 font-display text-[clamp(28px,3vw,48px)] font-bold uppercase leading-[1.02]">{TEXT.services[lang]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`tel:${BUSINESS.phones[0].tel}`} className="btn">
                <IconPhone size={18} />
                <span className="btn-roll">
                  <span>{UI.call[lang]}</span>
                  <span aria-hidden="true">{UI.call[lang]}</span>
                </span>
              </a>
              <a href={`mailto:${BUSINESS.email}?subject=${encodeURIComponent(UI.wineSales[lang])}`} className="btn btn--cream">
                <IconMail size={18} />
                <span className="btn-roll">
                  <span>{UI.email[lang]}</span>
                  <span aria-hidden="true">{UI.email[lang]}</span>
                </span>
              </a>
            </div>
          </div>
          <Cork className="mx-auto w-32 rotate-12 md:w-44" />
        </div>
        <div className="container-x mt-16 grid gap-4 md:grid-cols-3">
          {LINKS.filter((k) => k.wine).map((k) => (
            <a key={k.url} href={k.url} target="_blank" rel="noopener noreferrer" className="group rounded-[22px] bg-branco/10 p-6 transition-colors hover:bg-branco hover:text-tinta">
              <IconExternal size={22} className="text-dourado" />
              <p className="mt-6 font-display text-[26px] font-bold uppercase leading-none">{k.label}</p>
              <p className="mt-2 text-[15px] opacity-80">{k.desc[lang]}</p>
              <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
