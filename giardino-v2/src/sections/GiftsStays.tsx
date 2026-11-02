// The reference's shop, adapted: gift vouchers (sold through felizzio), the three partner hotels in Leukerbad and
// the virtual tour (Matterport). Every external destination is marked as such.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { BUSINESS, HOTELS } from "@/content/business";
import { FadeIn, SplitReveal } from "@/components/Reveal";
import { PillLink } from "@/components/ui/Pill";
import { IconBed, IconCube, IconGift, IconMail, IconPhone } from "@/components/icons";
import { Medallion } from "@/components/Brand";

export function HotelCards({ className }: { className?: string }) {
  const { lang } = useSite();
  return (
    <ul className={`grid list-none gap-4 md:grid-cols-3 ${className ?? ""}`}>
      {HOTELS.map((h, i) => (
        <FadeIn as="li" key={h.name} delay={i * 0.08} className="flex flex-col rounded-[24px] bg-white p-6 text-ink shadow-[0_24px_50px_-36px_rgba(27,27,27,0.6)]">
          <IconBed size={26} className="text-olive" />
          <h3 className="mt-4 font-display text-[30px] font-extrabold uppercase leading-none">{h.name}</h3>
          <p className="mt-1 text-[14px] text-muted">{h.host}</p>
          <address className="mt-3 not-italic leading-relaxed text-ink/85">
            {h.street}
            <br />
            {h.town}
          </address>
          <div className="mb-5 mt-4 flex flex-col gap-1 text-[15px]">
            <a className="inline-flex min-h-11 items-center gap-2" href={`tel:${h.tel}`}>
              <IconPhone size={16} /> <span className="link">{h.phone}</span>
            </a>
            <a className="inline-flex min-h-11 items-center gap-2" href={`mailto:${h.email}`}>
              <IconMail size={16} className="shrink-0" /> <span className="link break-all">{h.email}</span>
            </a>
          </div>
          <PillLink href={h.web} external size="sm" variant="dark" className="mt-auto self-start">
            {TX.website[lang]}
          </PillLink>
        </FadeIn>
      ))}
    </ul>
  );
}

export function GiftsStays() {
  const { lang } = useSite();
  return (
    <section id="gifts" data-anchor className="relative overflow-hidden bg-cream py-24 text-ink md:py-32" aria-labelledby="gifts-title">
      <div className="container-x">
        <p className="eyebrow text-muted">
          {UI.vouchers[lang]} · {UI.hotels[lang]} · {UI.tour[lang]}
        </p>
        <SplitReveal as="h2" id="gifts-title" text={TX.giftsTitle[lang]} className="mt-4 fs-xxl font-extrabold" />
        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <FadeIn className="relative flex flex-col justify-between overflow-hidden rounded-[30px] bg-gold p-7 md:p-10">
            <div className="flex items-start justify-between gap-6">
              <IconGift size={34} />
              <Medallion className="h-24 w-24 md:h-28 md:w-28" />
            </div>
            <div className="mt-8">
              <h3 className="fs-l font-extrabold">{TX.vouchersTitle[lang]}</h3>
              <p className="mt-4 max-w-[560px] text-[18px] leading-relaxed">{TX.vouchersText[lang]}</p>
              <ul className="mt-6 flex list-none flex-wrap gap-2" aria-label={TX.vouchersTitle[lang]}>
                {BUSINESS.voucherOptions.map((v) => (
                  <li key={v} className="rounded-full bg-ink px-4 py-2 font-display text-[18px] font-bold tracking-[0.06em] text-gold">
                    CHF {v}
                  </li>
                ))}
                <li className="rounded-full px-4 py-2 font-display text-[18px] font-bold tracking-[0.06em] shadow-[inset_0_0_0_2px_currentColor]">CHF …</li>
              </ul>
              <PillLink href={BUSINESS.vouchers(lang)} external variant="dark" className="mt-8">
                {TX.vouchersCta[lang]} · felizzio
              </PillLink>
              {TX.vouchersLangNote[lang] && <p className="mt-3 text-[14px]">{TX.vouchersLangNote[lang]}</p>}
            </div>
          </FadeIn>
          <FadeIn delay={0.1} className="flex flex-col justify-between rounded-[30px] bg-ink p-7 text-white md:p-10">
            <IconCube size={34} className="text-gold" />
            <div className="mt-8">
              <h3 className="fs-l font-extrabold">{TX.tourTitle[lang]}</h3>
              <p className="mt-4 text-[18px] leading-relaxed text-cream/90">{TX.tourText[lang]}</p>
              <PillLink href={BUSINESS.tour(lang)} external className="mt-8">
                {TX.tourCta[lang]} · Matterport
              </PillLink>
            </div>
          </FadeIn>
        </div>
        <h3 id="hotels" data-anchor className="mt-16 font-display text-[clamp(34px,3.4vw,56px)] font-extrabold uppercase leading-none">
          {TX.hotelsTitle[lang]}
        </h3>
        <p className="mt-3 text-[17px] text-ink/80">{TX.hotelsLead[lang]}</p>
        <HotelCards className="mt-8" />
      </div>
    </section>
  );
}
