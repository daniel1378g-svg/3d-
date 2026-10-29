import { Bewertungen } from "@/components/home/Bewertungen";
import { ContactSection } from "@/components/home/ContactSection";
import { useSite } from "@/site";
import { TX } from "@/content/site";

export default function BewertungenPage() {
  const { lang } = useSite();
  return (
    <>
      <div style={{ paddingTop: "calc(var(--label-h) + 70px)" }} className="bg-suave" />
      <Bewertungen full />
      <section className="bg-fundo py-10 text-marca">
        <p className="container-x text-[14px] text-linha">{TX.n_reference[lang]}</p>
      </section>
      <ContactSection />
    </>
  );
}
