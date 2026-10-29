// Unser Laden: the hero with the shop photo, the first paragraph, the taste journey large with the second
// paragraph, the shop's hours and status with its phone, the shop photos from the gallery, "Jetzt bestellen".
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { PHOTOS, photo } from "@/content/photos";
import { MaskImage, SplitReveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { TasteJourney } from "@/components/TasteJourney";
import { HoursList, OpenNow } from "@/components/Contact";
import { IconExternal, IconMail, IconPhone } from "@/components/icons";

export default function LadenPage() {
  const { lang } = useSite();
  const shop = PHOTOS.filter((p) => p.cat === "laden");
  return (
    <>
      <PageHero lang={lang} tone="bg-acento-escuro text-branco" eyebrow={`${BUSINESS.shop} · ${BUSINESS.laden.street}`} title={[UI.laden[lang]]} photo={photo("laden-theke")}>
        <p className="mt-6 max-w-[860px] font-display text-[clamp(22px,2.2vw,36px)] font-semibold uppercase leading-[1.05]">{TX.ladenH2[lang]}</p>
        <p className="mt-4 max-w-[760px] text-[clamp(17px,1.2vw,20px)] text-suave">{TX.ladenP1[lang]}</p>
        <p className="mt-3 max-w-[760px] text-[clamp(17px,1.2vw,20px)] text-suave">{TX.ladenP2[lang]}</p>
      </PageHero>
      <section className="on-dark tex-wave bg-marca-escura py-20 text-branco md:py-28" aria-labelledby="journey-title">
        <div className="container-x">
          <p className="eyebrow text-destaque">{UI.journey[lang]}</p>
          <SplitReveal as="h2" id="journey-title" text={[TX.ladenH1[lang]]} className="mt-4 fs-xl font-extrabold" />
          <div className="mt-12">
            <TasteJourney />
          </div>
        </div>
      </section>
      <section className="bg-acento py-20 text-branco md:py-28" aria-labelledby="shop-hours">
        <div className="container-x grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="rounded-[24px] bg-branco/[0.08] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] md:p-8">
            <h2 id="shop-hours" className="eyebrow text-fundo">
              {TX.oeffnungszeitenLaden[lang]}
            </h2>
            <OpenNow place="laden" large className="mt-4" />
            <HoursList place="laden" className="mt-6 text-[17px]" />
            <ul className="mt-6 list-none space-y-2">
              <li>
                <a href={`tel:${BUSINESS.laden.tel}`} className="link inline-flex items-center gap-2 font-display text-[26px] font-bold">
                  <IconPhone size={20} /> {BUSINESS.laden.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS.email}`} className="link inline-flex items-center gap-2 break-all text-lg">
                  <IconMail size={20} /> {BUSINESS.email}
                </a>
              </li>
            </ul>
            <p className="mt-4 text-suave">
              {BUSINESS.laden.street}, {BUSINESS.laden.city}
            </p>
            <a href={BUSINESS.webShop} target="_blank" rel="noopener noreferrer" className="btn mt-6">
              <span className="btn-roll">
                <span>{TX.btnBestellen[lang]}</span>
                <span aria-hidden="true">{TX.btnBestellen[lang]}</span>
              </span>
              <IconExternal size={16} />
              <span className="sr-only">{UI.externalNew[lang]}</span>
            </a>
          </div>
          <div className="columns-2 gap-4 md:columns-3">
            {shop.map((p, i) => (
              <MaskImage key={p.id} src={p.sm} srcSet={`${p.sm} 800w, ${p.src} 1600w`} sizes="(min-width: 768px) 25vw, 45vw" alt={p.alt[lang]} w={p.w} h={p.h} delay={(i % 3) * 0.08} className="mb-4 w-full rounded-[18px]" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
