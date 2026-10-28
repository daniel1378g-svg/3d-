import { Suspense, lazy } from "react";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";

// Everything below the first screen arrives in its own chunk, so the hero paints and runs sooner.
const Below = lazy(() => import("./HomeBelow").then((m) => ({ default: m.HomeBelow })));

export function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Suspense fallback={<div className="linen min-h-[200vh]" />}>
        <Below />
      </Suspense>
    </>
  );
}
