import { UI } from "@/i18n";
import { useSite } from "@/site";
import { PX } from "@/content/pages";
import { PageHero } from "@/components/PageHero";
import { PillButton } from "@/components/ui/Pill";
import { Offerings } from "@/sections/Offerings";
import { GallerySection } from "@/sections/GallerySection";
import { MarqueeBand } from "@/sections/MarqueeBand";

export default function FamiliesPage() {
  const { lang, book } = useSite();
  return (
    <>
      <PageHero eyebrow="La famiglia · Bambini" title={UI.families[lang]} lead={PX.familiesLead[lang]} photo="ship-cliffs" focus="50% 45%" tone="green">
        <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
      </PageHero>
      <Offerings only="families" />
      <MarqueeBand />
      <GallerySection initial="families" />
    </>
  );
}
