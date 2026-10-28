import { Suspense, lazy } from "react";
import { Hero } from "@/components/home/Hero";
import { LogoStrip } from "@/components/home/LogoStrip";

const HomeBelow = lazy(() => import("./HomeBelow"));

export function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Suspense fallback={<div className="min-h-[200svh]" />}>
        <HomeBelow />
      </Suspense>
    </>
  );
}
