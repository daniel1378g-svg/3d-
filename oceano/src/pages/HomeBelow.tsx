import { useEffect } from "react";
import { refreshScroll } from "@/lib/scroll";
import { LogoStrip } from "@/components/home/LogoStrip";
import { Neuigkeiten } from "@/components/home/Neuigkeiten";
import { Kueche } from "@/components/home/Kueche";
import { Laden } from "@/components/home/Laden";
import { Geschmacksreise } from "@/components/home/Geschmacksreise";
import { Oeffnungszeiten } from "@/components/home/Oeffnungszeiten";
import { Reservieren } from "@/components/home/Reservieren";
import { WebShop } from "@/components/home/WebShop";
import { Bewertungen } from "@/components/home/Bewertungen";
import { Statement } from "@/components/home/Statement";
import { GalerieSection } from "@/components/home/GalerieSection";
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
      <Neuigkeiten />
      <Kueche />
      <Laden />
      <Statement />
      <Geschmacksreise />
      <Oeffnungszeiten />
      <Reservieren />
      <WebShop />
      <GalerieSection />
      <Bewertungen />
      <ContactSection />
    </>
  );
}
