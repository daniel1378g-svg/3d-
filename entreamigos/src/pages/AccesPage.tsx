// Plan d'accès: "PLAN D'ACCÈS" set giant, then the contact bento at full size (the address, the bus lines,
// parking, the phone, the e-mail, the hours, the "Itinéraire" tabs) and the map that loads only on tap.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { MapEmbed } from "@/components/Contact";
import { ContactBento } from "@/components/home/ContactSection";
import { Bus } from "@/components/Illustrations";

export default function AccesPage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero lang={lang} eyebrow={BUSINESS.name} title={[UI.acces[lang]]}>
        <p className="mt-6 font-display text-[clamp(24px,2.4vw,38px)] font-semibold uppercase leading-tight text-suave">{BUSINESS.addressLine}</p>
      </PageHero>
      <section className="bg-marca pb-24 text-branco">
        <div className="container-x space-y-4">
          <ContactBento full />
          <MapEmbed className="min-h-[420px]" />
          <Bus className="mx-auto mt-10 w-[min(360px,80%)]" />
        </div>
      </section>
    </>
  );
}
