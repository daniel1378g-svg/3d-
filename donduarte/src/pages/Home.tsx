import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";
import { Specialities } from "@/components/home/Specialities";
import { TerreEtMer } from "@/components/home/TerreEtMer";
import { WineSection } from "@/components/home/WineSection";
import { DessertsSlider } from "@/components/home/DessertsSlider";
import { HoursContact } from "@/components/home/HoursContact";
import { Reviews } from "@/components/home/Reviews";
import { prefersReducedMotion } from "@/lib/utils";
import { useSite } from "@/site";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const { lang } = useSite();
  // Scroll reveals: only blocks still below the fold start hidden, so the first screen never waits.
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const below = gsap.utils.toArray<HTMLElement>("[data-reveal]").filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
      gsap.set(below, { opacity: 0, y: 36 });
      ScrollTrigger.batch(below, {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.08, overwrite: true }),
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [lang]);

  return (
    <>
      <Hero />
      <LogoStrip />
      <Specialities />
      <TerreEtMer />
      <WineSection />
      <DessertsSlider />
      <Reviews />
      <HoursContact />
    </>
  );
}
