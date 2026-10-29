import { GalerieSection } from "@/components/home/GalerieSection";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { UI } from "@/i18n";
import { photo } from "@/content/photos";

export default function GaleriePage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero eyebrow={TX.n_galleryEyebrow[lang]} title={UI.galerie[lang]} lang={lang} photo={photo("g-cabrito")} aspect="aspect-[16/9] md:aspect-[21/8]">
        <p className="mt-6 max-w-[640px] text-[clamp(16px,1.2vw,19px)] leading-relaxed text-fundo/80">{TX.n_galerie_desc[lang]}</p>
      </PageHero>
      <GalerieSection full />
    </>
  );
}
