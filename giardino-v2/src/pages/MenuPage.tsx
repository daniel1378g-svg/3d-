import { UI } from "@/i18n";
import { useSite } from "@/site";
import { PX } from "@/content/pages";
import { PageHero } from "@/components/PageHero";
import { PillButton } from "@/components/ui/Pill";
import { FoodShowcase } from "@/sections/FoodShowcase";
import { MenusSection } from "@/sections/MenusSection";
import { Delights } from "@/sections/Delights";
import { MarqueeBand } from "@/sections/MarqueeBand";

export default function MenuPage() {
  const { lang, book } = useSite();
  return (
    <>
      <PageHero eyebrow="La carta · Giardino" title={UI.menu[lang]} lead={PX.menuLead[lang]} photo="pizza-rocket" focus="45% 50%">
        <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
      </PageHero>
      <MenusSection />
      <FoodShowcase standalone />
      <MarqueeBand />
      <Delights compact />
    </>
  );
}
