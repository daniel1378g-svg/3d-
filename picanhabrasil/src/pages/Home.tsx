import { useSite } from "@/site";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { About } from "@/components/home/About";
import { Prato } from "@/components/home/Prato";
import { MenuTeaser } from "@/components/home/MenuTeaser";
import { ReserveSection } from "@/components/home/ReserveSection";
import { Order } from "@/components/home/Order";
import { Groups } from "@/components/home/Groups";
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
      <About />
      <Prato />
      <MenuTeaser />
      <ReserveSection />
      <Order />
      <Groups />
      <Reviews />
      <Gallery />
      <HoursLocation />
      <Faq />
      <ContactSection />
    </>
  );
}
