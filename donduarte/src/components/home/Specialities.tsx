import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPECIALITIES, UI } from "@/i18n";
import { useSite } from "@/site";
import { img } from "@/lib/utils";
import { LottieIcon } from "@/lottie/LottieIcon";
import type { IconName } from "@/lottie/icons";
import { SiteLink } from "../SiteLink";

gsap.registerPlugin(ScrollTrigger);

/**
 * The eight category blocks of the live home page. On wide screens the section pins and the cards travel
 * sideways with the scroll; on phones, with reduced motion or without the script, it is a swipe row.
 */
export function Specialities() {
  const { lang } = useSite();
  const section = useRef<HTMLElement>(null);
  const rail = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // The pinned section sits below the proposal band and the sticky header.
    const offsetTop = () => (document.querySelector(".proposal-label")?.getBoundingClientRect().height ?? 0) + (document.querySelector("header")?.getBoundingClientRect().height ?? 0);
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = rail.current!;
      const distance = () => Math.max(0, el.scrollWidth - el.parentElement!.clientWidth);
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: () => `top top+=${offsetTop()}`,
          end: () => "+=" + distance(),
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      gsap.utils.toArray<HTMLElement>(el.children).forEach((card, i) => {
        gsap.from(card, {
          x: 120,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.06,
          scrollTrigger: { trigger: section.current, start: "top 75%", toggleActions: "play none none none" },
        });
        card.querySelector("img") && gsap.fromTo(card.querySelector("img"), { xPercent: -6 }, { xPercent: 6, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
    });
    return () => mm.revert();
  }, [lang]);

  return (
    <section ref={section} id="specialites" className="gutter py-3 md:py-5 lg:flex lg:min-h-[calc(100svh-var(--label-h)-var(--header-h))] lg:flex-col lg:justify-center">
      <div className="wrap panel overflow-hidden py-12 lg:py-10">
      <div className="px-6 md:px-12">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red">Don Duarte · 1988</p>
            <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-semibold leading-none tracking-[-0.02em] text-green">{UI.specialities[lang]}</h2>
          </div>
          <p className="max-w-sm text-ink-soft">{UI.specialitiesHint[lang]}</p>
        </div>
      </div>
      <div className="no-scrollbar snap-x snap-mandatory overflow-x-auto px-6 md:px-12 lg:overflow-visible">
        <div>
          <div ref={rail} className="flex w-max gap-5 pb-4">
            {SPECIALITIES.map((s, i) => (
              <SiteLink
                key={s.id}
                page={s.page}
                section={s.group}
                className="group relative flex w-[78vw] max-w-[340px] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] on-dark bg-green text-white shadow-[0_26px_50px_-34px_rgba(0,40,0,0.9)] sm:w-[320px] lg:w-[340px]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={img(s.photo)} alt="" loading="lazy" className="h-full w-[112%] max-w-none -translate-x-[6%] object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]" />
                  <span className="absolute left-4 top-4 rounded-full bg-green-deep/85 px-2.5 py-1 font-display text-sm font-semibold tabular-nums text-white">{String(i + 1).padStart(2, "0")} / 08</span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-green-deep">
                      <LottieIcon name={s.icon as IconName} size={40} color="#ffcc00" accent="#ffffff" />
                    </span>
                    <h3 className="font-display text-[1.4rem] font-semibold leading-tight">{s.title[lang]}</h3>
                  </div>
                  <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-gold">
                    {s.page === "vins" ? UI.seeVins[lang] : s.page === "desserts" ? UI.seeDesserts[lang] : UI.seeMenu[lang]}
                    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="transition-transform group-hover:translate-x-1"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" /></svg>
                  </span>
                </div>
              </SiteLink>
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
