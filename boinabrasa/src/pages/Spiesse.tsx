import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { MeatExplorer } from "@/components/home/MeatExplorer";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { IconArrow } from "@/components/icons";

export function Spiesse() {
  const { t, go, href, openBooking } = useSite();
  return (
    <>
      <PageHero kicker={t.nav.spiesse} title={t.meats.title} lead={t.meats.tagline} image="header-spiesse" />
      <MeatExplorer compact />
      <section className="skin-carvao py-24" aria-labelledby="origin-title">
        <div className="gutter">
          <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
            <Reveal className="grid grid-cols-2 gap-4">
              <figure><Img id="cutout-picanha" fit="contain" sizes="40vw" className="aspect-[280/380] rounded-[24px] bg-carvao-2" /><figcaption className="mt-2 text-sm text-creme/70">{t.meats.captions.picanha}</figcaption></figure>
              <figure><Img id="cutout-costela_de_boi" fit="contain" sizes="40vw" className="aspect-[280/380] rounded-[24px] bg-carvao-2" /><figcaption className="mt-2 text-sm text-creme/70">{t.meats.captions.costela}</figcaption></figure>
            </Reveal>
            <div>
              <h2 id="origin-title" className="display text-[clamp(2.6rem,5vw,4.6rem)]">{t.meats.originTitle}</h2>
              <dl className="mt-6 flex flex-col">
                {t.meats.origin.map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 border-b border-creme/15 py-3"><dt className="kicker text-ouro">{k}</dt><dd className="text-right text-creme/85">{v}</dd></div>
                ))}
              </dl>
              <p className="mt-5 text-creme/70">{t.meats.originNote}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" className="pill" onClick={() => openBooking()}>{t.cta.reserveNow}</button>
                <a className="pill pill-ghost text-creme" href={href("preise")} onClick={(e) => { e.preventDefault(); go("preise"); }}>{t.cta.discoverPrices} <IconArrow size={17} className="arrow" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
