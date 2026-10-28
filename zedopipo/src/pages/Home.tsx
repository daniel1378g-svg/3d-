import { Suspense, lazy } from "react";
import { MarTerraHero } from "@/components/home/MarTerraHero";
import { LanguageChooser } from "@/components/home/LanguageChooser";
import { LogoStrip } from "@/components/home/LogoStrip";
import { MenuTeaser } from "@/components/home/MenuTeaser";

// Everything below the menu teaser (and GSAP with it) comes in a second chunk that starts loading at once.
const Below = lazy(() => import("./HomeBelow").then((m) => ({ default: m.HomeBelow })));

export function Home() {
  return (
    <>
      <MarTerraHero />
      <LanguageChooser />
      <LogoStrip />
      <MenuTeaser />
      <Suspense fallback={<div className="min-h-[200svh] bg-linen" />}>
        <Below />
      </Suspense>
    </>
  );
}
