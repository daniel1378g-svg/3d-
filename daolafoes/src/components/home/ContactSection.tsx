// Section 10: Reservierung und Kontakt. The table widget, the live reservation form, the phones, the e-mail,
// the GPS point, the live open status (Ruhetag Dienstag) and the map on tap.
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { PartySize } from "../PartySize";
import { ContactBlock, HoursList, MapEmbed, OpenNow, ReservationForm, RouteLinks } from "../Contact";
import { FadeIn, SplitReveal } from "../Reveal";

export function ContactSection({ full = false }: { full?: boolean }) {
  const { lang } = useSite();
  return (
    <section id="reservieren" className="relative overflow-hidden bg-fundo py-20 text-marca md:py-28" aria-labelledby="contact-title">
      <div className="container-x">
        <p className="eyebrow text-acento">{TX.n_contactEyebrow[lang]}</p>
        <SplitReveal as={full ? "h1" : "h2"} id="contact-title" text={TX.n_contactTitle[lang]} className="mt-4 fs-xl font-semibold" />
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="space-y-6">
            <PartySize />
            <FadeIn className="paper p-6">
              <OpenNow large />
              <HoursList className="mt-5 text-[15px]" />
              <ContactBlock className="mt-6" />
              <RouteLinks className="mt-5" />
            </FadeIn>
          </div>
          <div className="space-y-6">
            <FadeIn className="paper p-6 md:p-8" delay={0.05}>
              <h3 className="font-display text-[clamp(24px,2.2vw,34px)] font-semibold">{TX.n_formTitle[lang]}</h3>
              <ReservationForm className="mt-5" />
            </FadeIn>
            <FadeIn delay={0.1}>
              <MapEmbed />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
