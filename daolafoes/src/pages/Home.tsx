import { Suspense, lazy, useEffect, useState } from "react";
import { useLocation } from "@/lib/router";
import { Hero } from "@/components/home/Hero";
import { Tagesgerichte } from "@/components/home/Tagesgerichte";

const HomeBelow = lazy(() => import("./HomeBelow"));

export default function Home() {
  // the lower part waits for the browser to be idle, unless a link asks for one of its sections
  const loc = useLocation();
  const [below, setBelow] = useState(() => !!loc.hash || !!(loc.state as { section?: string } | null)?.section);
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
      <Hero />
      <Tagesgerichte />
      {below ? (
        <Suspense fallback={<div className="h-[200svh] bg-marca-escura" />}>
          <HomeBelow />
        </Suspense>
      ) : (
        <div className="h-[200svh] bg-marca-escura" />
      )}
    </>
  );
}
