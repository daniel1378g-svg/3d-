import { Suspense, lazy, useEffect, useState } from "react";
import { useLocation } from "@/lib/router";
import { HeroStory } from "@/sections/HeroStory";
import { FoodShowcase } from "@/sections/FoodShowcase";

const HomeBelow = lazy(() => import("./HomeBelow"));

export default function Home() {
  // the lower half waits for an idle moment (or the first scroll), unless a link asks for one of its sections
  const loc = useLocation();
  const [below, setBelow] = useState(() => !!loc.hash || !!(loc.state as { section?: string } | null)?.section || !!(loc.state as { langSwitch?: boolean } | null)?.langSwitch);
  useEffect(() => {
    if (below) return;
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: object) => number; cancelIdleCallback?: (id: number) => void };
    const show = () => setBelow(true);
    const id = w.requestIdleCallback ? w.requestIdleCallback(show, { timeout: 1500 }) : window.setTimeout(show, 600);
    window.addEventListener("scroll", show, { once: true, passive: true });
    return () => {
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      else clearTimeout(id);
      window.removeEventListener("scroll", show);
    };
  }, [below]);
  return (
    <>
      <HeroStory />
      <FoodShowcase />
      {below ? (
        <Suspense fallback={<div className="h-[200svh] bg-gold" />}>
          <HomeBelow />
        </Suspense>
      ) : (
        <div className="h-[200svh] bg-gold" />
      )}
    </>
  );
}
