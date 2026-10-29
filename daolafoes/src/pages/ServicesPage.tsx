import { useSite } from "@/site";
import { TX } from "@/content/site";
import { Services } from "@/components/home/Services";
import { ContactSection } from "@/components/home/ContactSection";
import { photo } from "@/content/photos";
import { PageHero } from "@/components/PageHero";
import { UI } from "@/i18n";

export default function ServicesPage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero eyebrow={TX.service[lang]} title={UI.services[lang]} lang={lang} photo={photo("leitao-feuer")}>
        <p className="mt-6 max-w-[640px] text-[clamp(16px,1.2vw,19px)] leading-relaxed text-fundo/80">{TX.n_services_desc[lang]}</p>
      </PageHero>
      <Services full />
      <ContactSection />
    </>
  );
}
