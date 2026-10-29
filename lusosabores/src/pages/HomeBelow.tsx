import { useEffect } from "react";
import { refreshScroll } from "@/lib/scroll";
import { FourFromGrill } from "@/components/home/FourFromGrill";
import { LogoStrip } from "@/components/home/LogoStrip";
import { PlatDuJour } from "@/components/home/PlatDuJour";
import { MenuTeaser } from "@/components/home/MenuTeaser";
import { Specialites } from "@/components/home/Specialites";
import { Statement } from "@/components/home/Statement";
import { Ouverts77 } from "@/components/home/Ouverts77";
import { Reserver } from "@/components/home/Reserver";
import { ServicesHome } from "@/components/home/ServicesHome";
import { GalerieSection } from "@/components/home/GalerieSection";
import { Avis } from "@/components/home/Avis";
import { ContactSection } from "@/components/home/ContactSection";

export default function HomeBelow() {
  // the lower half arrives after the pinned scenes above have measured; re-measure once it is in
  useEffect(() => {
    const id = setTimeout(refreshScroll, 60);
    document.fonts?.ready.then(() => refreshScroll());
    return () => clearTimeout(id);
  }, []);
  return (
    <>
      <FourFromGrill />
      <LogoStrip />
      <PlatDuJour />
      <MenuTeaser />
      <Specialites />
      <Statement />
      <Ouverts77 />
      <Reserver />
      <ServicesHome />
      <GalerieSection />
      <Avis />
      <ContactSection />
    </>
  );
}
