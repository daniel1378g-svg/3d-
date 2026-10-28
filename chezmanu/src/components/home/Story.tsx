import { useEffect, useRef } from "react";
import { HTML_LANG, TEXT, UI } from "@/i18n";
import { CONTACT } from "@/content";
import { HOURS_ROWS, hm } from "@/hours";
import { useSite } from "@/site";
import { prefersReducedMotion } from "@/lib/utils";
import { Photo } from "../Photo";
import { OpenBadge } from "../OpenBadge";
import { SteamingCup } from "../Illustrations";
import { LogoBiscuit } from "./LogoBiscuit";

/** Each word in its own span, so the scroll can light them one after another. */
function Words({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="sw">{w}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

/**
 * The introduction as a scroll scene (GSAP ScrollTrigger): its words light up as you read down, the tea room
 * photo drifts, the cup slides in and steams, and «12 ans» counts up once the owner has confirmed the number.
 * With reduced motion (or before the script loads) everything is simply there, fully readable.
 */
export function Story() {
  const { lang } = useSite();
  const root = useRef<HTMLElement>(null);
  const years = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".story-text").forEach((p) => {
          gsap.fromTo(
            p.querySelectorAll(".sw"),
            { opacity: 0.28 },
            { opacity: 1, ease: "none", stagger: 0.08, scrollTrigger: { trigger: p, start: "top 82%", end: "bottom 52%", scrub: 0.6 } },
          );
        });
        gsap.fromTo(".story-photo", { yPercent: -7 }, { yPercent: 7, ease: "none", scrollTrigger: { trigger: ".story-figure", start: "top bottom", end: "bottom top", scrub: true } });
        gsap.fromTo(".story-cup", { y: 60, rotate: -8, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: ".story-figure", start: "top 85%", end: "top 35%", scrub: 0.8 } });
        if (years.current && CONTACT.yearsConfirmed) {
          const counter = { n: 0 };
          gsap.to(counter, {
            n: CONTACT.years,
            duration: 1.6,
            ease: "power2.out",
            snap: { n: 1 },
            onUpdate: () => years.current && (years.current.textContent = String(counter.n)),
            scrollTrigger: { trigger: years.current, start: "top 85%", once: true },
          });
        }
      }, root);
      ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [lang]);

  return (
    <section ref={root} id="histoire" aria-labelledby="story-title" className="dust gutter bg-flour py-24 md:py-36">
      <div className="wrap grid items-start gap-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <div>
          <p className="kicker">Chez Manu</p>
          <h2 id="story-title" className="display mt-3 max-w-[18ch] text-[clamp(2.3rem,5vw,4.2rem)] leading-[1.02] text-cocoa">
            {TEXT.introTitle[lang]}
          </h2>
          {CONTACT.yearsConfirmed && (
            <p className="mt-8 flex items-end gap-3 text-cocoa" aria-label={`${CONTACT.years} ${UI.years[lang]}`}>
              <span ref={years} aria-hidden="true" className="display price text-[clamp(5rem,12vw,9rem)] leading-[0.8]">
                {CONTACT.years}
              </span>
              <span aria-hidden="true" className="display pb-2 text-3xl">{UI.years[lang]}</span>
            </p>
          )}
          <p lang={HTML_LANG[lang]} className="story-text mt-8 max-w-[60ch] text-[clamp(1.15rem,1.8vw,1.45rem)] leading-[1.6] text-espresso">
            <Words text={TEXT.intro1[lang]} />
          </p>
          <p lang={HTML_LANG[lang]} className="story-text mt-6 max-w-[60ch] text-[clamp(1.15rem,1.8vw,1.45rem)] leading-[1.6] text-espresso">
            <Words text={TEXT.intro2[lang]} />
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5">
            <div>
              <h3 className="kicker mb-2">{TEXT.hoursTitle[lang]}</h3>
              <dl className="grid grid-cols-[auto_auto] gap-x-6 gap-y-1 text-lg">
                {HOURS_ROWS.map((r) => (
                  <div key={r.key} className="contents">
                    <dt className="font-semibold">{TEXT[r.key][lang]}</dt>
                    <dd className="price">
                      {hm(r.open)} – {hm(r.close)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <OpenBadge />
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <LogoBiscuit className="mx-auto w-[min(78vw,360px)]" />
          <figure className="story-figure relative">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-[32px] shadow-lift">
              <div className="story-photo scale-[1.16]">
                <Photo id="tearoom" sizes="(min-width: 1024px) 420px, 90vw" className="aspect-[4/5] w-full" position="50% 35%" />
              </div>
            </div>
            <SteamingCup size={150} className="story-cup absolute -bottom-10 -left-6 text-caramel drop-shadow-[0_18px_20px_rgb(60_25_8/0.3)] md:-left-14" />
          </figure>
        </div>
      </div>
    </section>
  );
}
