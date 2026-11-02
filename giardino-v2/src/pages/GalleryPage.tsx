import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { PageHero } from "@/components/PageHero";
import { GallerySection } from "@/sections/GallerySection";

export default function GalleryPage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero eyebrow="Impressioni · Giardino" title={UI.gallery[lang]} lead={TX.galleryLead[lang]} photo="terrace-view" focus="45% 55%" tone="ink" />
      <GallerySection page />
    </>
  );
}
