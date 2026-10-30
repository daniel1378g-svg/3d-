import { useSite } from "@/site";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { AboutStatement } from "@/components/home/AboutStatement";
import { RodizioStory } from "@/components/home/RodizioStory";
import { MeatExplorer } from "@/components/home/MeatExplorer";
import { Prices } from "@/components/home/Prices";
import { ReserveSection } from "@/components/home/ReserveSection";
import { Groups } from "@/components/home/Groups";
import { Catering } from "@/components/home/Catering";
import { Vouchers } from "@/components/home/Vouchers";
import { Reviews } from "@/components/home/Reviews";
import { Gallery } from "@/components/home/Gallery";
import { HoursLocation } from "@/components/home/HoursLocation";
import { Faq } from "@/components/home/Faq";
import { ContactSection } from "@/components/home/Contact";

export function Home() {
  const { t } = useSite();
  return (
    <>
      <Hero />
      <Marquee items={t.facts} />
      <AboutStatement />
      <RodizioStory />
      <MeatExplorer />
      <Prices />
      <ReserveSection />
      <Groups />
      <Catering />
      <Vouchers />
      <Reviews />
      <Gallery />
      <HoursLocation />
      <Faq />
      <ContactSection />
    </>
  );
}
