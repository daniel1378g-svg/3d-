import { useLayoutEffect, useRef } from "react";
import { HTML_LANG, UI } from "@/i18n";
import { GAUCHO } from "@/copy";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { ParallaxPhoto } from "./Parallax";
import { ExternalIcon } from "./icons";

/** "Das Original – Das Gaucho Steak" as a scroll scene: the words light up as the story scrolls by. */
export function GauchoStory() {
  const { lang } = useSite();
  const text = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = text.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        el.querySelectorAll(".sw"),
        { opacity: 0.16 },
        { opacity: 1, ease: "none", stagger: 0.03, scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 55%", scrub: 0.5 } },
      );
    });
    return () => mm.revert();
  }, [lang]);

  return (
    <section id="gaucho" aria-labelledby="gaucho-title" className="on-dark tex-hex gutter relative overflow-hidden bg-ink py-24 text-snow md:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--label-h)+96px)] lg:self-start">
          <p className="mb-3 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-beak">
            <span aria-hidden="true" className="size-2.5 rounded-full bg-ember" />
            Oasis Steakhouse
          </p>
          <h2 id="gaucho-title" className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-bold leading-[0.95]">
            {GAUCHO.title[lang]}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {GAUCHO.keywords.map((k) => (
              <li key={k.de} className="rounded-full border border-sand/40 px-3.5 py-1.5 text-sm font-semibold text-sand">
                {k[lang]}
              </li>
            ))}
          </ul>
          <ParallaxPhoto id="tbone2" sizes="(min-width: 1024px) 40vw, 100vw" className="mt-8 aspect-[16/10] rounded-[24px]" />
        </div>
        <div ref={text} lang={HTML_LANG[lang]}>
          {GAUCHO.paragraphs.map((p, i) => (
            <p key={`${lang}-${i}`} className={cn("text-[clamp(1.15rem,2vw,1.55rem)] leading-[1.55]", i > 0 && "mt-7", i === 0 && "font-display text-[clamp(1.35rem,2.5vw,2rem)] font-medium leading-[1.35]")}>
              {p[lang].split(/(\s+)/).map((w, k) => (/\s/.test(w) ? w : <span key={k} className="sw">{w}</span>))}
            </p>
          ))}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <p className="text-lg text-snow/85">{GAUCHO.menuText[lang]}</p>
            <a href={CONTACT.yoordi} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-beak px-6 font-bold text-ink hover:bg-white">
              {UI.yoordi[lang]}
              <ExternalIcon />
              <span className="sr-only"> ({UI.newTab[lang]})</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
