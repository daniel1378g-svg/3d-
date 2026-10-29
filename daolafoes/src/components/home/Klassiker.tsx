// Section 3: the four signature dishes of the "Über uns" text, pinned (scene B): the cut-out photo planes sit
// in depth and move with the scroll, the names change one by one. Phones and reduced motion get the four cards.
import { useRef, useState } from "react";
import { useSite } from "@/site";
import { TX } from "@/content/site";
import { photo } from "@/content/photos";
import { useGsap } from "@/lib/useGsap";
import { useIsDesktop, useReduced } from "@/lib/useMedia";
import { cn } from "@/lib/utils";
import { SplitReveal } from "../Reveal";
import { PillLink } from "../ui/Pill";

const DISHES = [
  { key: "n_sig1", line: "n_sig1Line", photo: "t-leitao-dose", dish: "leitao-dose" },
  { key: "n_sig2", line: "n_sig2Line", photo: "t-bacalhau-lafoes", dish: "bacalhau-lafoes" },
  { key: "n_sig3", line: "n_sig3Line", photo: "g-cabrito", dish: null },
  { key: "n_sig4", line: "n_sig4Line", photo: "t-sandes-leitao", dish: "sandes-leitao" },
] as const;

export function Klassiker() {
  const { lang, href, go } = useSite();
  const desktop = useIsDesktop();
  const reduce = useReduced();
  const root = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const pinned = desktop && !reduce;

  useGsap(
    (gsap) => {
      if (!root.current) return;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: `+=${window.innerHeight * 3}`, scrub: 0.6, pin: true, onUpdate: (s) => setStep(Math.min(3, Math.floor(s.progress * 4))) },
      });
      DISHES.forEach((_, i) => {
        const at = i / 4;
        tl.fromTo(`.kl-plane-${i}`, { xPercent: 30, yPercent: 20, scale: 0.7, autoAlpha: 0, rotate: 6 }, { xPercent: 0, yPercent: 0, scale: 1, autoAlpha: 1, rotate: 0, duration: 0.12, ease: "power2.out" }, at);
        if (i < 3) tl.to(`.kl-plane-${i}`, { xPercent: -40, yPercent: -30, scale: 0.55, autoAlpha: 0, rotate: -8, duration: 0.1, ease: "power2.in" }, at + 0.17);
        tl.fromTo(`.kl-back-${i}`, { scale: 1.3, autoAlpha: 0 }, { scale: 1, autoAlpha: 0.18, duration: 0.14 }, at).to(`.kl-back-${i}`, { scale: 0.8, autoAlpha: 0, duration: 0.1 }, at + 0.17);
      });
      tl.to({}, { duration: 0.08 });
    },
    root,
    [pinned],
    pinned,
  );

  const grid = (
    <ul className="grid list-none gap-5 sm:grid-cols-2">
      {DISHES.map((d, i) => {
        const p = photo(d.photo);
        return (
          <li key={d.key} className="paper relative overflow-hidden p-5">
            <img src={p.cut?.src ?? p.sm} alt={p.alt[lang]} loading="lazy" decoding="async" width={p.cut?.w ?? p.w} height={p.cut?.h ?? p.h} className="mx-auto h-44 w-auto object-contain drop-shadow-[0_20px_30px_rgba(43,26,18,0.35)]" />
            <p className="eyebrow mt-4 text-acento">0{i + 1}</p>
            <h3 className="dish-name mt-1 font-display text-[26px] font-semibold leading-tight">{TX[d.key][lang]}</h3>
            <p className="mt-2 text-[15px] text-linha">{TX[d.line][lang]}</p>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section ref={root} id="klassiker" className="on-dark tex-azulejo relative overflow-hidden bg-marca-escura text-fundo" aria-labelledby="kl-title">
      <div className={cn("container-x", pinned ? "flex h-[100svh] flex-col justify-center" : "py-20 md:py-28")}>
        <p className="eyebrow text-ember">{TX.n_sigEyebrow[lang]}</p>
        <SplitReveal as="h2" id="kl-title" text={TX.n_sigTitle[lang]} className="mt-3 fs-xl font-semibold" />
        {pinned ? (
          <div className="relative mt-6 grid flex-1 grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-10" style={{ maxHeight: "68svh" }}>
            <div aria-live="polite">
              {DISHES.map((d, i) => (
                <div key={d.key} className={cn("transition-all duration-500", step === i ? "translate-y-0 opacity-100" : "absolute -translate-y-4 opacity-0")} aria-hidden={step !== i}>
                  <p className="eyebrow text-ember">0{i + 1} / 04</p>
                  <h3 className="dish-name mt-2 font-display text-[clamp(32px,3.6vw,60px)] font-semibold leading-[1.02]">{TX[d.key][lang]}</h3>
                  <p className="mt-4 max-w-[420px] text-[clamp(16px,1.2vw,19px)] leading-relaxed text-fundo/80">{TX[d.line][lang]}</p>
                  <PillLink
                    href={d.dish ? href("takeaway", d.dish) : href("speisekarte")}
                    variant="cream"
                    size="sm"
                    className="mt-6"
                    onClick={(e) => {
                      e.preventDefault();
                      d.dish ? go("takeaway", d.dish) : go("speisekarte");
                    }}
                  >
                    {d.dish ? TX.n_btnTakeaway[lang] : TX.n_btnSpeisekarte[lang]}
                  </PillLink>
                </div>
              ))}
            </div>
            <div className="relative h-full min-h-[420px] [perspective:1200px]">
              {DISHES.map((d, i) => {
                const p = photo(d.photo);
                return (
                  <div key={d.key} className="absolute inset-0 grid place-items-center">
                    <div className={`kl-back-${i} absolute h-[70%] w-[70%] rounded-full bg-destaque opacity-0 blur-3xl`} />
                    <img src={p.cut?.src ?? p.src} alt="" aria-hidden="true" loading={i === 0 ? "eager" : "lazy"} decoding="async" width={p.cut?.w ?? p.w} height={p.cut?.h ?? p.h} className={`kl-plane-${i} absolute max-h-[64svh] w-auto max-w-[90%] object-contain opacity-0 drop-shadow-[0_40px_60px_rgba(0,0,0,0.5)]`} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-10">{grid}</div>
        )}
      </div>
    </section>
  );
}
