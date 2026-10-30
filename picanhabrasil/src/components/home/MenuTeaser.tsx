// The menu's five categories as big tilted cards with the site's own food cut-outs; hovering lifts the food,
// a card opens the full menu at that category. Prices "from" come from the menu data.
import { useSite } from "@/site";
import { MENU, chf, minCents } from "@/content/menu";
import { cn } from "@/lib/utils";
import { Img } from "../Img";
import { Reveal } from "../Reveal";
import { IconArrow } from "../icons";

const SKINS = ["bg-brasa text-carvao", "bg-vinho text-creme", "bg-ouro text-carvao", "bg-mato-2 text-creme", "bg-creme text-tinta"];

export function MenuTeaser() {
  const { t, lang, go, href } = useSite();
  return (
    <section id="karte" data-anchor="karte" className="skin-carvao2 overflow-hidden py-24 md:py-32" aria-labelledby="menu-teaser-title">
      <div className="gutter">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="kicker text-ouro" data-lang-stagger>{t.karte.kicker}</p>
              <h2 id="menu-teaser-title" className="display mt-3 text-[clamp(3rem,8vw,8rem)]">{t.karte.teaserTitle}</h2>
              <p className="lead mt-4 text-creme/80">{t.karte.teaserLead}</p>
            </div>
            <a className="pill pill-cream" href={href("karte")} onClick={(e) => { e.preventDefault(); go("karte"); }}>{t.cta.fullMenu}<IconArrow size={17} className="arrow" /></a>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MENU.map((s, i) => {
              const from = Math.min(...s.items.map(minCents));
              return (
                <Reveal as="li" key={s.id} delay={i * 70}>
                  <a
                    href={`${href("karte")}${__ARTIFACT__ ? "" : `#${s.id}`}`}
                    onClick={(e) => { e.preventDefault(); go("karte"); requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(s.id)?.scrollIntoView())); }}
                    className={cn("group relative flex h-full min-h-[300px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-6 transition-transform duration-300 hover:-translate-y-1", SKINS[i])}
                  >
                    <div>
                      <p className="kicker opacity-90">{s.titlePt}</p>
                      <h3 className="display mt-2 text-[2.3rem]">{s.title[lang]}</h3>
                      <p className="mt-2 text-sm opacity-80">{t.karte.teaser[s.id as keyof typeof t.karte.teaser]}</p>
                    </div>
                    <div className="mt-6 flex items-end justify-between gap-2">
                      <p className="text-sm"><span className="opacity-90">{t.karte.from} </span><span className="display text-[1.8rem]">CHF {chf(from)}</span></p>
                      <Img id={s.cutout} alt="" sizes="160px" fit="contain" className="w-[46%] max-w-[150px] shrink-0 drop-shadow-[0_14px_18px_rgba(0,0,0,0.35)] transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:-translate-y-3 group-hover:rotate-6 group-hover:scale-110" />
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
