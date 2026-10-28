import { Suspense, lazy } from "react";
import { Hero } from "@/components/home/Hero";
import { LanguageChooser } from "@/components/LanguageChooser";
import { LogoStrip } from "@/components/home/LogoStrip";

const HomeBelow = lazy(() => import("./HomeBelow"));

export function Home() {
  return (
    <>
      <Hero />
      <LanguageChooser />
      <LogoStrip />
      <Suspense fallback={<div className="min-h-[200svh]" />}>
        <HomeBelow />
      </Suspense>
    </>
  );
}
