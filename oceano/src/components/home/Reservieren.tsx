// Section 11: "Tisch reservieren". The three Kontakt lines, the phone as a big pill, today's restaurant hours;
// on the right "Wie viele sind Sie?" with the stepper and the chairs, then "Online Reservierung" (the MyLocalina
// widget in the drawer) and "Anrufen". The stepper passes nothing to the widget: MyLocalina documents no parameter.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { SplitReveal } from "../Reveal";
import { PartySize } from "../PartySize";
import { IconMail, IconPhone } from "../icons";
import { todayLine } from "../Contact";

export function Reservieren() {
  const { lang } = useSite();
  return (
    <section id="reservieren" className="relative overflow-hidden bg-marca py-24 text-branco md:py-36" aria-labelledby="res-title">
      <div className="container-x grid gap-14 lg:grid-cols-2">
        <div>
          <p className="eyebrow text-destaque">11 / 16 · {UI.reserve[lang]}</p>
          <SplitReveal as="h2" id="res-title" text={[TX.tischReservieren[lang]]} className="mt-4 fs-xxl font-extrabold" />
          <p className="mt-8 max-w-[640px] font-display text-[clamp(22px,2vw,32px)] font-semibold uppercase leading-[1.08]">{TX.kontakt1[lang]}</p>
          <p className="mt-4 max-w-[640px] text-[clamp(17px,1.2vw,20px)] text-suave">{TX.kontakt2[lang]}</p>
          <p className="mt-2 max-w-[640px] font-hand text-[clamp(26px,2vw,34px)] leading-tight text-destaque">{TX.kontakt3[lang]}</p>
          <div className="mt-8 flex flex-col gap-3 sm:max-w-[460px]">
            <a href={`tel:${BUSINESS.restaurant.tel}`} className="btn btn--lg justify-between">
              <span className="btn-roll">
                <span>{BUSINESS.restaurant.phone}</span>
                <span aria-hidden="true">{BUSINESS.restaurant.phone}</span>
              </span>
              <IconPhone size={22} />
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="btn btn--lg btn--cream justify-between normal-case tracking-[0.04em]">
              <span className="btn-roll">
                <span>{BUSINESS.email}</span>
                <span aria-hidden="true">{BUSINESS.email}</span>
              </span>
              <IconMail size={22} />
            </a>
          </div>
          <p className="mt-6 text-lg font-bold">{todayLine("restaurant", lang)}</p>
        </div>
        <div className="lg:pt-24">
          <PartySize />
        </div>
      </div>
    </section>
  );
}
