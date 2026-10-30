import { useEffect, useState } from "react";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Explorer } from "@/components/home/Explorer";
import { CupStory } from "@/components/home/CupStory";
import { Waffles } from "@/components/home/Waffles";
import { About } from "@/components/home/About";
import { Gallery } from "@/components/home/Gallery";
import { Visit } from "@/components/home/Visit";
import { Faq } from "@/components/home/Faq";
import { IconPin } from "@/components/icons";

/** Phones: a small "So findest du uns" pill once the hero is passed, gone again while the visit section is on screen. */
function FindUs() {
  const { t, go, href } = useSite();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("start");
    const visit = document.getElementById("besuch");
    let past = false, there = false;
    const io = new IntersectionObserver((es) => {
      for (const e of es) {
        if (e.target === hero) past = !e.isIntersecting;
        if (e.target === visit) there = e.isIntersecting;
      }
      setShow(past && !there);
    });
    if (hero) io.observe(hero);
    if (visit) io.observe(visit);
    return () => io.disconnect();
  }, []);
  return (
    <a
      href={`${href("home")}#besuch`}
      onClick={(e) => { e.preventDefault(); go("home", { anchor: "besuch" }); }}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      className={cn("pill pill-lime fixed bottom-[max(16px,env(safe-area-inset-bottom))] right-4 z-[700] shadow-[0_14px_30px_-12px_rgba(36,16,40,0.7)] transition-[opacity,transform] duration-200 md:hidden", show ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0")}
    >
      <IconPin size={17} />{t.cta.findUs}
    </a>
  );
}

export function Home() {
  const { t } = useSite();
  return (
    <>
      <Hero />
      <Marquee items={t.facts} />
      <Explorer />
      <CupStory />
      <Waffles />
      <About />
      <Gallery />
      <Visit />
      <Faq />
      <FindUs />
    </>
  );
}
