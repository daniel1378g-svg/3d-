// Catering: the live site's text, the catering site's claim (30–500 people) and three steps, photos from the
// restaurant's catering, the hotline and the link to churrascocatering.ch.
import { useSite } from "@/site";
import { CATERING_HOTLINE, URLS } from "@/content/facts";
import { Img } from "../Img";
import { Reveal } from "../Reveal";
import { IconExternal, IconPhone } from "../icons";

export function Catering({ full = false }: { full?: boolean }) {
  const { t } = useSite();
  return (
    <section id="catering" data-anchor="catering" className="skin-carvao relative overflow-hidden py-24 md:py-32" aria-labelledby="catering-title">
      <div className="gutter">
        <div className="wrap grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="kicker text-ouro" data-lang-stagger>{t.catering.kicker}</p>
            <h2 id="catering-title" className="display mt-3 text-[clamp(3rem,7vw,7rem)]">{t.catering.title}</h2>
            <p className="serif-i mt-4 text-[1.6rem] text-brasa-2">{t.catering.subtitle}</p>
            {t.catering.text.map((p) => <p key={p} className="mt-5 max-w-[40rem] text-creme/80">{p}</p>)}
            <p className="mt-6 font-display text-[1.3rem] font-bold text-creme" style={{ fontStretch: "88%" }}>{t.catering.claim}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="pill" href={URLS.catering} target="_blank" rel="noopener">{t.cta.cateringDiscover}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
              <a className="pill pill-ghost text-creme" href={CATERING_HOTLINE.href}><IconPhone size={17} />{t.catering.hotline} {CATERING_HOTLINE.display}</a>
            </div>
            <p className="mt-4 text-xs text-creme/45">{t.catering.source}</p>
          </div>
          <div className="grid grid-cols-6 grid-rows-[repeat(6,minmax(0,1fr))] gap-3" style={{ aspectRatio: "1 / 1.02" }}>
            <Reveal className="col-span-4 row-span-4 overflow-hidden rounded-[28px]"><Img id="catering-impressionen-9" sizes="(min-width: 1024px) 34vw, 66vw" className="h-full w-full" /></Reveal>
            <Reveal delay={90} className="col-span-2 row-span-3 overflow-hidden rounded-[28px]"><Img id="catering-impressionen-2" sizes="(min-width: 1024px) 18vw, 33vw" className="h-full w-full" /></Reveal>
            <Reveal delay={160} className="col-span-2 row-span-3 overflow-hidden rounded-[28px]"><Img id="catering-impressionen-6" sizes="(min-width: 1024px) 18vw, 33vw" className="h-full w-full" /></Reveal>
            <Reveal delay={220} className="col-span-4 row-span-2 overflow-hidden rounded-[28px]"><Img id="catering-impressionen-10" sizes="(min-width: 1024px) 34vw, 66vw" className="h-full w-full" /></Reveal>
          </div>
        </div>
        {full && (
          <ol className="wrap mt-16 grid gap-4 md:grid-cols-3">
            {t.catering.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="rounded-[var(--radius-card)] bg-carvao-2 p-6 ring-1 ring-creme/10">
                <p className="display text-[3rem] text-brasa">{i + 1}</p>
                <h3 className="mt-2 font-display text-[1.3rem] font-bold">{s.title}</h3>
                <p className="mt-2 text-creme/75">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
