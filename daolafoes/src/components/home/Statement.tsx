// Section 5: the Pessoa poem from the live home, set as a statement band; the lines light up as you scroll.
import { useRef } from "react";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { HTML_LANG } from "@/i18n";
import { Tile } from "../Illustrations";

export function Statement() {
  const { lang } = useSite();
  const root = useRef<HTMLElement>(null);
  const reduce = useReduced();
  useGsap(
    (gsap) => {
      gsap.fromTo(".po-line", { opacity: 0.22 }, { opacity: 1, ease: "none", stagger: 0.12, scrollTrigger: { trigger: ".po-text", start: "top 78%", end: "bottom 50%", scrub: true } });
    },
    root,
    [reduce, lang],
    !reduce,
  );
  const lines = TX.poem[lang].split("\n");
  return (
    <section ref={root} className="relative overflow-hidden bg-destaque py-24 text-branco md:py-36" aria-label={TX.n_statementEyebrow[lang]}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-6 opacity-[0.07] md:grid-cols-12">
        {Array.from({ length: 24 }, (_, i) => (
          <Tile key={i} tone="#FFFFFF" bg="transparent" className="w-full" />
        ))}
      </div>
      <div className="container-x relative grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,9fr)]">
        <p className="eyebrow text-branco/80">{TX.n_statementEyebrow[lang]}</p>
        <blockquote lang={HTML_LANG[lang]} className="po-text m-0">
          <p className="font-display text-[clamp(26px,3.4vw,56px)] font-semibold leading-[1.15] tracking-[-0.01em] text-balance">
            {lines.map((l, i) => (
              <span key={i} className="po-line block">
                {l}
              </span>
            ))}
          </p>
          <footer className="serif-i mt-8 text-[clamp(18px,1.6vw,24px)] text-branco/85">
            {TX.poemSource[lang]} {TX.poemAuthor[lang]}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
