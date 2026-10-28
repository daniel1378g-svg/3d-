import { Suspense, lazy } from "react";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/LogoStrip";

// Everything below the strip is its own chunk, so the first paint only parses and renders the hero.
const HomeBelow = lazy(() => import("./HomeBelow").then((m) => ({ default: m.HomeBelow })));

export function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Suspense fallback={<div className="min-h-[200vh] bg-snow" />}>
        <HomeBelow />
      </Suspense>
    </>
  );
}
