// Unsere Küche, built like HOY!'s menu page without a price list: a sand page hero, a sticky chapter band with
// a sliding pill, the four chapters as colour blocks with the live sentences and the photos that show that food,
// the 70 → 1 counter on Nachspeisen, an empty slot for the owner's Speisekarte (preview only), then the note and
// closing bands.
import { useEffect, useRef, useState } from "react";
import { animate, motion } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TX } from "@/content/site";
import { PHOTOS, cutout, photo, type Shows } from "@/content/photos";
import { cn } from "@/lib/utils";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { FadeIn, MaskImage, SplitReveal } from "@/components/Reveal";
import { CHAPTERS, NataCounter, Visual } from "@/components/home/FourFromSea";
import { RecipeSticker } from "@/components/home/Kueche";
import { PillButton, PillLink } from "@/components/ui/Pill";
import { IconPhone } from "@/components/icons";

const TONES = [
  { bg: "bg-marca-escura", ink: "text-branco", sub: "text-destaque", dark: true },
  { bg: "bg-fundo", ink: "text-tinta", sub: "text-marca", dark: false },
  { bg: "bg-acento-escuro", ink: "text-branco", sub: "text-destaque", dark: true },
  { bg: "bg-destaque", ink: "text-marca-escura", sub: "text-marca-escura", dark: false },
];
const SHOWS: Record<string, Shows[]> = { burger: ["burger"], "fleisch-fisch": ["fleisch", "fisch"], meer: ["meeresfruechte"], nata: ["nachspeise"] };
const NAMES: Record<string, "chapterBurger" | "chapterFleischFisch" | "chapterMeer" | "chapterNachspeisen"> = { burger: "chapterBurger", "fleisch-fisch": "chapterFleischFisch", meer: "chapterMeer", nata: "chapterNachspeisen" };

export default function KuechePage() {
  const { lang, book } = useSite();
  const reduce = useReduced();
  const [active, setActive] = useState(CHAPTERS[0].key);
  const [count, setCount] = useState(70);
  const band = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const hero = photo("schweinebauch");
  const closing = photo("restaurant-saal");

  useEffect(() => {
    const on = () => {
      let cur = CHAPTERS[0].key;
      for (const c of CHAPTERS) {
        const el = document.getElementById(`k-${c.key}`);
        if (el && el.getBoundingClientRect().top <= 200) cur = c.key;
      }
      setActive(cur);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    const b = band.current;
    const pill = b?.querySelector<HTMLElement>(`[data-sec="${active}"]`);
    if (!b || !pill) return;
    b.scrollTo({ left: pill.offsetLeft - b.clientWidth / 2 + pill.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);
  useGsap(
    (gsap) => {
      gsap.fromTo(".cp-hero-img", { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: { trigger: ".cp-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".carte-fly").forEach((el) => gsap.fromTo(el, { yPercent: 40, rotate: -10 }, { yPercent: -120, rotate: 10, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
      // Nachspeisen: 70 dishes count down to 1 as the chapter scrolls through
      gsap.to({ v: 70 }, { v: 1, ease: "none", scrollTrigger: { trigger: "#k-nata", start: "top 70%", end: "bottom 60%", scrub: true, onUpdate: (self) => setCount(Math.round(70 - 69 * self.progress)) } });
    },
    root,
    [reduce],
    !reduce,
  );
  const restart = () => {
    animate(70, 1, { duration: 1.2, ease: "easeOut", onUpdate: (v) => setCount(Math.round(v)) });
  };
  const jump = (id: string) => {
    const el = document.getElementById(`k-${id}`);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div ref={root}>
      <section className="cp-hero relative overflow-hidden bg-destaque pb-16 text-marca-escura" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
        <div className="container-x">
          <p className="eyebrow">{TX.kuecheH2[lang]}</p>
          <SplitReveal as="h1" text={[UI.kueche[lang]]} className="mt-4 fs-mega font-extrabold" />
          <div className="relative mt-10">
            <MaskImage src={hero.src} srcSet={`${hero.sm} 800w, ${hero.src} 1600w`} sizes="(min-width: 1520px) 1400px, 92vw" alt={hero.alt[lang]} w={hero.w} h={hero.h} eager className="arch aspect-[16/9] w-full md:aspect-[21/9]" imgClassName="cp-hero-img scale-110" />
            <RecipeSticker className="absolute -bottom-10 right-4 w-28 md:right-12 md:w-40" />
          </div>
          <p className="mt-14 max-w-[760px] text-[clamp(18px,1.4vw,24px)] leading-relaxed">{TX.kuecheSpeisekarte[lang]}</p>
          <p className="mt-3 max-w-[760px] font-display text-[clamp(22px,2.2vw,36px)] font-semibold uppercase leading-[1.05]">{TX.kuecheH1[lang]}</p>
        </div>
      </section>

      <div className="sticky z-40 bg-marca-escura/95 backdrop-blur" style={{ top: "calc(var(--label-h) + 64px)" }}>
        <nav aria-label={UI.chapters[lang]} className="container-x">
          <div ref={band} className="no-scrollbar flex gap-1.5 overflow-x-auto py-2.5">
            {CHAPTERS.map((c, i) => (
              <button key={c.key} type="button" data-sec={c.key} aria-current={active === c.key ? "true" : undefined} onClick={() => jump(c.key)} className={cn("relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 font-display text-[15px] font-semibold uppercase tracking-[0.12em]", active === c.key ? "text-tinta" : "text-branco")}>
                {active === c.key && <motion.span layoutId="chapter-pill" className="absolute inset-0 rounded-full bg-destaque" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }} />}
                <span className="relative">0{i + 1}</span>
                <span className="relative">{TX[NAMES[c.key]][lang]}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {CHAPTERS.map((c, i) => {
        const t = TONES[i];
        const pics = PHOTOS.filter((p) => p.cat === "restaurant" && SHOWS[c.key].includes(p.shows) && !p.stock).slice(0, 3);
        const fly = (["burger", "steak", "polvo", "gebaeck"] as const)[i];
        return (
          <section key={c.key} id={`k-${c.key}`} className={cn("relative overflow-hidden py-20 md:py-28", t.bg, t.ink, t.dark && "on-dark")} aria-labelledby={`k-${c.key}-title`}>
            <img src={cutout(fly).src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="carte-fly pointer-events-none absolute -right-16 top-24 w-[min(320px,40vw)] opacity-95" />
            <div className="container-x relative">
              <p className={cn("eyebrow", t.sub)}>0{i + 1} / 04</p>
              <h2 id={`k-${c.key}-title`} className="mt-4 fs-xxl font-extrabold">
                {TX[NAMES[c.key]][lang]}
              </h2>
              {c.note && <p className="mt-6 max-w-[760px] text-[clamp(17px,1.2vw,20px)] opacity-85">{c.note[lang]}</p>}
              <p className="mt-4 max-w-[760px] font-display text-[clamp(22px,2vw,32px)] font-semibold uppercase leading-[1.08]">{c.line[lang]}</p>
              {c.key === "nata" && (
                <>
                  <p className="mt-3 font-hand text-[26px] text-marca">{UI.nata2011[lang]}</p>
                  <NataCounter value={reduce ? 1 : count} onRestart={restart} lang={lang} />
                </>
              )}
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {pics.length
                  ? pics.map((p, k) => <MaskImage key={p.id} src={p.sm} srcSet={`${p.sm} 800w, ${p.src} 1600w`} sizes="(min-width: 640px) 33vw, 92vw" alt={p.alt[lang]} w={p.w} h={p.h} delay={k * 0.08} className={cn("w-full", k === 0 ? "arch aspect-[4/3.4]" : "aspect-[4/3] rounded-[18px]")} />)
                  : (
                    <div className="arch aspect-[4/3.4]">
                      <Visual chapter={c} lang={lang} />
                    </div>
                  )}
              </div>
              {/* the owner's Speisekarte: an empty, marked slot (preview only) */}
              {import.meta.env.VITE_PROPOSAL !== "0" && <p className={cn("mt-8 rounded-[16px] border-2 border-dashed px-4 py-3 text-[14px]", t.dark ? "border-branco/30 text-suave" : "border-tinta/25 text-linha")}>{UI.menuSlot[lang]}</p>}
            </div>
          </section>
        );
      })}

      <section className="bg-tinta py-14 text-branco">
        <FadeIn className="container-x flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[760px] font-display text-[clamp(22px,2vw,32px)] font-semibold uppercase leading-[1.08]">{TX.kuecheVorbei[lang]}</p>
          <div className="flex flex-wrap gap-3">
            <PillLink href={`tel:${BUSINESS.restaurant.tel}`} icon={<IconPhone size={18} />}>
              {BUSINESS.restaurant.phone}
            </PillLink>
            <PillButton variant="cream" onClick={book}>
              {UI.online[lang]}
            </PillButton>
          </div>
        </FadeIn>
      </section>
      <section className="overflow-hidden bg-marca py-20 text-branco md:py-28">
        <div className="container-x grid items-center gap-12 md:grid-cols-[minmax(240px,4fr)_minmax(0,7fr)]">
          <MaskImage src={closing.sm} alt={closing.alt[lang]} w={closing.w} h={closing.h} className="arch-full aspect-[3/4] w-full max-w-[380px]" />
          <div>
            <p className="font-display text-[clamp(30px,3.4vw,58px)] font-bold uppercase leading-[0.98]">
              {TX.ui_heroLeft[lang]} <span className="text-destaque">{TX.ui_heroRight[lang]}</span>
            </p>
            <PillButton className="mt-8" size="lg" onClick={book}>
              {UI.reserve[lang]}
            </PillButton>
          </div>
        </div>
      </section>
    </div>
  );
}
