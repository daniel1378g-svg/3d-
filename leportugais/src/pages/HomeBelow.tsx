import { useEffect } from "react";
import { refreshScroll } from "@/lib/scroll";
import { LogoStrip } from "@/components/home/LogoStrip";
import { PlatsDuJour } from "@/components/home/PlatsDuJour";
import { CarteTeaser } from "@/components/home/CarteTeaser";
import { SurCommande } from "@/components/home/SurCommande";
import { Statement } from "@/components/home/Statement";
import { Cave } from "@/components/home/Cave";
import { Reserver } from "@/components/home/Reserver";
import { Services } from "@/components/home/Services";
import { GalerieSection } from "@/components/home/GalerieSection";
import { PresseSection } from "@/components/home/PresseSection";
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
      <LogoStrip />
      <PlatsDuJour />
      <CarteTeaser />
      <SurCommande />
      <Statement />
      <Cave />
      <Reserver />
      <Services />
      <GalerieSection />
      <PresseSection />
      <ContactSection />
    </>
  );
}
