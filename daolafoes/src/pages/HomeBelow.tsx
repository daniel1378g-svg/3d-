import { useEffect } from "react";
import { refreshScroll } from "@/lib/scroll";
import { Klassiker } from "@/components/home/Klassiker";
import { MenuTeaser } from "@/components/home/MenuTeaser";
import { Statement } from "@/components/home/Statement";
import { UeberUns } from "@/components/home/UeberUns";
import { Services } from "@/components/home/Services";
import { GalerieSection } from "@/components/home/GalerieSection";
import { Bewertungen } from "@/components/home/Bewertungen";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomeBelow() {
  useEffect(() => {
    const id = setTimeout(refreshScroll, 60);
    document.fonts?.ready.then(() => refreshScroll());
    return () => clearTimeout(id);
  }, []);
  return (
    <>
      <Klassiker />
      <MenuTeaser />
      <Statement />
      <UeberUns />
      <Services />
      <GalerieSection />
      <Bewertungen />
      <ContactSection />
    </>
  );
}
