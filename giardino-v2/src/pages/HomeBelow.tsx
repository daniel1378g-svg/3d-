import { useEffect } from "react";
import { refreshScroll } from "@/lib/scroll";
import { MarqueeBand } from "@/sections/MarqueeBand";
import { WelcomeCards } from "@/sections/WelcomeCards";
import { Delights } from "@/sections/Delights";
import { Statement } from "@/sections/Statement";
import { Offerings } from "@/sections/Offerings";
import { Experience } from "@/sections/Experience";
import { HoursSection } from "@/sections/HoursSection";
import { MenusSection } from "@/sections/MenusSection";
import { GiftsStays } from "@/sections/GiftsStays";
import { GallerySection } from "@/sections/GallerySection";
import { Reviews } from "@/sections/Reviews";
import { ContactSection } from "@/sections/ContactSection";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function HomeBelow() {
  // the lower half arrives after the scroll scenes above have measured: re-measure once it is in, and after fonts
  useEffect(() => {
    const id = setTimeout(refreshScroll, 60);
    document.fonts?.ready.then(() => refreshScroll());
    return () => clearTimeout(id);
  }, []);
  return (
    <>
      <ErrorBoundary>
        <MarqueeBand />
      </ErrorBoundary>
      <ErrorBoundary>
        <WelcomeCards />
      </ErrorBoundary>
      <ErrorBoundary>
        <Delights />
      </ErrorBoundary>
      <ErrorBoundary>
        <Statement />
      </ErrorBoundary>
      <ErrorBoundary>
        <Offerings />
      </ErrorBoundary>
      <ErrorBoundary>
        <Experience />
      </ErrorBoundary>
      <ErrorBoundary>
        <HoursSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <MenusSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <GiftsStays />
      </ErrorBoundary>
      <ErrorBoundary>
        <GallerySection />
      </ErrorBoundary>
      <ErrorBoundary>
        <Reviews />
      </ErrorBoundary>
      <ErrorBoundary>
        <ContactSection />
      </ErrorBoundary>
    </>
  );
}
