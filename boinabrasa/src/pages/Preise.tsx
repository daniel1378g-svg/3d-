import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { Prices } from "@/components/home/Prices";
import { MenuCard } from "@/components/MenuCard";
import { Faq } from "@/components/home/Faq";
import { URLS } from "@/content/facts";
import { IconArrow, IconExternal } from "@/components/icons";
import { Packages } from "@/components/home/Groups";

export function Preise() {
  const { t, go, href } = useSite();
  return (
    <>
      <PageHero kicker={t.prices.kicker} title={t.prices.title} lead={t.prices.lead} image="header-preise">
        <a href="#faq" className="pill pill-ghost mt-8 text-creme" onClick={(e) => { e.preventDefault(); document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }); }}>{t.cta.toFaq} ↓</a>
      </PageHero>
      <Prices withLinks={false} />
      <MenuCard />
      <section className="skin-carvao py-20" aria-labelledby="allergens-title">
        <div className="gutter"><div className="wrap grid gap-10 md:grid-cols-2">
          <div>
            <h2 id="allergens-title" className="display text-[clamp(2.4rem,5vw,4.4rem)]">{t.prices.allergensTitle}</h2>
            <p className="mt-4 max-w-[36rem] text-creme/80">{t.prices.allergensText}</p>
            <a className="pill mt-6" href={URLS.allergensPdf} target="_blank" rel="noopener">{t.cta.allergensPdf}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
          </div>
          <div>
            <h2 className="display text-[clamp(2.4rem,5vw,4.4rem)]">{t.prices.groupsTitle}</h2>
            <p className="mt-4 max-w-[36rem] text-creme/80">{t.prices.groupsText}</p>
            <p className="mt-2 max-w-[36rem] text-creme/70">{t.prices.groupsFacts}</p>
            <a className="pill pill-cream mt-6" href={href("gruppen")} onClick={(e) => { e.preventDefault(); go("gruppen"); }}>{t.cta.groupRequestShort} <IconArrow size={17} className="arrow" /></a>
          </div>
        </div></div>
      </section>
      <section className="skin-creme2 py-16"><div className="gutter"><div className="wrap"><p className="kicker mb-4 text-vinho-2">{t.groups.packagesTitle} · {t.groups.guide}</p><Packages /></div></div></section>
      <Faq skin="skin-creme" />
    </>
  );
}
