// Kontakt: the live heading and lines, then the bento at full size and the map that loads only on tap.
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { MapEmbed } from "@/components/Contact";
import { ContactBento } from "@/components/home/ContactSection";

export default function KontaktPage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero lang={lang} eyebrow={TX.kontaktH1[lang]} title={[TX.kontaktdetails[lang]]}>
        <p className="mt-6 max-w-[860px] font-display text-[clamp(22px,2.2vw,36px)] font-semibold uppercase leading-[1.05] text-suave">{TX.kontakt1[lang]}</p>
        <p className="mt-3 max-w-[760px] text-[clamp(17px,1.2vw,20px)]">{TX.kontakt2[lang]}</p>
        <p className="mt-2 font-hand text-[clamp(26px,2vw,34px)] text-destaque">{TX.kontakt3[lang]}</p>
      </PageHero>
      <section className="bg-marca pb-24 text-branco">
        <div className="container-x space-y-4">
          <ContactBento full />
          <MapEmbed />
        </div>
      </section>
    </>
  );
}
