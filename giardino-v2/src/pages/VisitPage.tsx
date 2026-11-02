import { UI } from "@/i18n";
import { useSite } from "@/site";
import { PX } from "@/content/pages";
import { PageHero } from "@/components/PageHero";
import { PillButton } from "@/components/ui/Pill";
import { HoursSection } from "@/sections/HoursSection";
import { ContactSection } from "@/sections/ContactSection";
import { Experience } from "@/sections/Experience";
import { GiftsStays } from "@/sections/GiftsStays";

export default function VisitPage() {
  const { lang, book } = useSite();
  return (
    <>
      <PageHero eyebrow="Visita · Leukerbad" title={UI.visit[lang]} lead={PX.visitLead[lang]} photo="aerial-front" focus="45% 50%" tone="ink">
        <PillButton onClick={book}>{UI.reserve[lang]}</PillButton>
      </PageHero>
      <HoursSection />
      <ContactSection />
      <Experience />
      <GiftsStays />
    </>
  );
}
