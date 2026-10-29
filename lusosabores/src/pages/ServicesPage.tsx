// Services: "Privatisation pour évènements" (its live photo rising in an arch and its two live sentences),
// "Combien êtes-vous ?", "Ouverts 7/7" with its paragraph and the week wheel, and the "Pour réserver…" band.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { PRIVATISATION, srcSet } from "@/content/photos";
import { FadeIn, MaskImage, SplitReveal } from "@/components/Reveal";
import { PartySize } from "@/components/PartySize";
import { WeekWheel } from "@/components/WeekWheel";
import { TodayHours } from "@/components/Hours";
import { Pot } from "@/components/Illustrations";
import { IconPhone } from "@/components/icons";

export default function ServicesPage() {
  const { lang } = useSite();
  const p = PRIVATISATION;
  return (
    <>
      <section className="relative overflow-hidden bg-acento pb-20 text-marca-escura" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
        <div className="container-x">
          <p className="eyebrow">{UI.services[lang]}</p>
          <SplitReveal as="h1" text={TEXT.privTitle[lang].split(/ (?=pour |for |para |per |für )/i)} className="mt-4 text-[clamp(36px,7.6vw,136px)] font-extrabold text-branco" />
          <div className="mt-12 grid items-end gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <MaskImage src={p.src} srcSet={srcSet(p)} sizes="(min-width: 1024px) 40vw, 92vw" alt={p.alt[lang]} w={p.w} h={p.h} eager className="arch-full aspect-[3/4] w-full max-w-[520px]" />
            <div className="space-y-5 pb-4">
              <p className="font-display text-[clamp(26px,2.6vw,42px)] font-bold uppercase leading-[1.02]">{TEXT.priv1[lang]}</p>
              <p className="text-[clamp(18px,1.4vw,22px)] font-bold">{TEXT.priv2[lang]}</p>
              <Pot className="w-40" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-marca py-20 text-branco md:py-28" aria-label={UI.howMany[lang]}>
        <div className="container-x grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow text-destaque">{TEXT.privTitle[lang]}</p>
            <p className="mt-5 max-w-[560px] text-[clamp(19px,1.5vw,24px)]">{TEXT.toBook[lang]}</p>
            <TodayHours className="mt-8" />
          </div>
          <PartySize />
        </div>
      </section>
      <section className="on-dark tex-grill bg-marca-escura py-20 text-branco md:py-28" aria-labelledby="o77-page">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SplitReveal as="h2" id="o77-page" text={[TEXT.openTitle[lang]]} className="fs-mega font-extrabold text-destaque" />
            <p className="mt-8 max-w-[620px] text-[clamp(18px,1.4vw,22px)] leading-relaxed">{TEXT.open77[lang]}</p>
            <p className="mt-6 font-display text-[clamp(24px,2.2vw,34px)] font-bold uppercase leading-none text-destaque">{TEXT.onSite[lang]}</p>
          </div>
          <WeekWheel />
        </div>
      </section>
      <section className="bg-fundo py-14 text-tinta">
        <FadeIn className="container-x flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[860px] text-[clamp(18px,1.5vw,22px)] leading-relaxed">{TEXT.toBook[lang]}</p>
          <a href={`tel:${BUSINESS.booking.tel}`} className="btn btn--marca">
            <IconPhone size={18} />
            <span className="btn-roll">
              <span>{BUSINESS.booking.label}</span>
              <span aria-hidden="true">{BUSINESS.booking.label}</span>
            </span>
          </a>
        </FadeIn>
      </section>
    </>
  );
}
