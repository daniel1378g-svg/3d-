// La carte, HOY!'s menu page: a gold page hero, an accent-insensitive search, a sticky night band of section
// pills with a sliding gold pill that follows the section in view, then the four sections of the live carte
// as colour blocks, each with its live heading, its photos and the listings with dotted leaders and prices.
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { UI, type Lang } from "@/i18n";
import { useSite, planDish } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { CARTE, NOTES, SECTION_TITLES, SUB_ON_ORDER, priceText, priceUnitText, type Dish } from "@/content/carte";
import { cutout, photo } from "@/content/photos";
import { cn, fold, storage } from "@/lib/utils";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { FadeIn, MaskImage, SplitReveal } from "@/components/Reveal";
import { GlutenSticker } from "@/components/home/CarteTeaser";
import { PillButton } from "@/components/ui/Pill";
import { IconSearch } from "@/components/icons";

const TONES: Record<string, { bg: string; ink: string; sub: string; dark: boolean }> = {
  entradas: { bg: "bg-oceano", ink: "text-branco", sub: "text-dourado", dark: true },
  pratos: { bg: "bg-sal", ink: "text-tinta", sub: "text-coral", dark: false },
  "sur-commande": { bg: "bg-vinho", ink: "text-branco", sub: "text-dourado", dark: true },
  sobremesas: { bg: "bg-dourado", ink: "text-tinta", sub: "text-vinho", dark: false },
};
const SECTION_PHOTOS: Record<string, string[]> = {
  entradas: ["specialites-fruits-de-mer-plainpalais"],
  pratos: ["plats-du-jour-plainpalais", "fruits-de-mer-plainpalais-geneve", "restaurant-de-poisson-geneve", "restaurant-specialites-de-la-mer-geneve"],
  "sur-commande": ["restaurant-specialites-poisson-geneve-1", "poisson-arrivage-journalier-geneve", "portugais-poisson-frais-geneve"],
  sobremesas: ["restaurant-plainpalais"],
};
const FLY: Record<string, Parameters<typeof cutout>[0] | null> = { entradas: "mariscos", pratos: "peixes", "sur-commande": null, sobremesas: null };

function haystack(d: Dish) {
  return fold([d.name, ...Object.values(d.desc)].join(" "));
}

function Listing({ d, lang, dark }: { d: Dish; lang: Lang; dark: boolean }) {
  const { go } = useSite();
  const price = priceText(d, lang);
  const unit = priceUnitText(d, lang);
  return (
    <li className="py-4">
      <div className="flex items-baseline gap-3">
        <h3 lang="pt-PT" className="dish-name font-display text-[clamp(22px,1.9vw,30px)] font-bold uppercase leading-[1.02]">
          {d.name}
        </h3>
        {price && <span aria-hidden="true" className="leader" />}
        {price && (
          <span className="shrink-0 whitespace-nowrap text-right font-display text-[clamp(22px,1.9vw,30px)] font-bold leading-none">
            {price}
            {unit && <span className="ml-1.5 text-[14px] font-semibold uppercase tracking-[0.1em] opacity-70">{unit}</span>}
          </span>
        )}
      </div>
      <p className={cn("mt-1.5 max-w-[640px] text-[16px] leading-snug", dark ? "text-branco/80" : "text-tinta/80")}>{d.desc[lang]}</p>
      {(d.notes.length > 0 || d.onOrder) && (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          {d.notes
            .filter((n) => !d.onOrder || n !== "arrivals")
            .map((n) => (
              <span key={n} className={cn("font-display text-[13px] font-semibold uppercase tracking-[0.14em]", dark ? "text-espuma" : "text-cortica")}>
                {NOTES[n][lang]}
              </span>
            ))}
          {d.onOrder && (
            <>
              <span className="font-hand text-[24px] leading-none text-dourado">{NOTES.arrivals[lang]}</span>
              <button
                type="button"
                onClick={() => {
                  planDish(d.id);
                  storage("session").set("lp-plan", d.id);
                  go("home", "sur-commande");
                }}
                className="link font-display text-[14px] font-semibold uppercase tracking-[0.12em] text-dourado"
              >
                {UI.plan72[lang]} →
              </button>
            </>
          )}
        </div>
      )}
    </li>
  );
}

function SectionBlock({ id, index, dishes, lang, children }: { id: string; index: number; dishes: Dish[]; lang: Lang; children?: ReactNode }) {
  const t = TONES[id];
  const title = SECTION_TITLES[id];
  const photos = SECTION_PHOTOS[id].map(photo);
  const fly = FLY[id];
  return (
    <section id={id} className={cn("carte-sec relative overflow-hidden py-20 md:py-28", t.bg, t.ink, t.dark && "on-dark")} aria-labelledby={`${id}-title`}>
      {fly && <img src={cutout(fly).src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="carte-fly pointer-events-none absolute -right-20 top-24 w-[min(380px,46vw)] opacity-90" />}
      <div className="container-x">
        <p className={cn("eyebrow", t.sub)}>
          0{index + 1} / 04 · {dishes.length} {UI.dishes[lang]}
        </p>
        <h2 id={`${id}-title`} className="mt-4">
          {title.pt ? (
            <>
              <span lang="pt-PT" className="block fs-xxl font-extrabold">
                {title.pt}
              </span>
              {lang !== "pt" && <span className="mt-2 block fs-l font-bold opacity-75">{title.local[lang]}</span>}
            </>
          ) : (
            <>
              <span className="block fs-xxl font-extrabold">{UI.surCommande[lang]} · 72 h</span>
              <span className="mt-3 block fs-m font-bold normal-case opacity-85">{title.local[lang]}</span>
            </>
          )}
        </h2>
        {id === "sur-commande" && <p className="mt-3 font-hand text-[30px] text-dourado">{SUB_ON_ORDER[lang]}</p>}
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="grid grid-cols-2 content-start gap-3">
            {photos.map((p, i) => (
              <MaskImage
                key={p.id}
                src={i === 0 ? p.src : p.sm}
                alt={p.alt[lang]}
                w={p.w}
                h={p.h}
                delay={i * 0.08}
                from={i === 0 ? "bottom" : "left"}
                className={cn("w-full", i === 0 ? "arch col-span-2 aspect-[4/3.4]" : "aspect-square rounded-[18px]")}
              />
            ))}
          </div>
          <ul className={cn("list-none divide-y self-start", t.dark ? "divide-branco/15" : "divide-tinta/15")}>
            {dishes.map((d) => (
              <Listing key={d.id} d={d} lang={lang} dark={t.dark} />
            ))}
          </ul>
        </div>
        {children}
      </div>
    </section>
  );
}

export default function CartePage() {
  const { lang, book } = useSite();
  const reduce = useReduced();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(CARTE[0].id);
  const band = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const q = fold(query.trim());
  const filtered = useMemo(() => CARTE.map((s) => ({ ...s, dishes: q ? s.dishes.filter((d) => haystack(d).includes(q)) : s.dishes })), [q]);
  const total = filtered.reduce((n, s) => n + s.dishes.length, 0);
  const hero = photo("plats-du-jour-plainpalais");
  const closing = photo("restaurant-portugais-plainpalais-banquets-4");

  // the band follows the section in view
  useEffect(() => {
    const on = () => {
      const line = 200;
      let cur = CARTE[0].id;
      for (const s of CARTE) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) cur = s.id;
      }
      setActive(cur);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  // …and scrolls itself to keep the current pill centred
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
    },
    root,
    [reduce],
    !reduce,
  );

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 130, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div ref={root}>
      {/* page hero */}
      <section className="cp-hero relative overflow-hidden bg-dourado pb-16 text-tinta" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
        <div className="container-x">
          <p className="eyebrow text-vinho">Entradas · Pratos principais · {UI.surCommande[lang]} · Sobremesas</p>
          <SplitReveal as="h1" text={[UI.carte[lang]]} className="mt-4 fs-mega font-extrabold" />
          <div className="relative mt-10">
            <MaskImage src={hero.src} srcSet={`${hero.sm} 640w, ${hero.src} 1200w`} sizes="(min-width: 1520px) 1400px, 92vw" alt={hero.alt[lang]} w={hero.w} h={hero.h} eager className="arch aspect-[16/9] w-full md:aspect-[21/9]" imgClassName="cp-hero-img scale-110" />
            <GlutenSticker lang={lang} className="absolute -bottom-10 right-4 w-28 md:right-12 md:w-40" />
          </div>
          <p className="mt-14 max-w-[640px] text-lg">{TEXT.gluten[lang]}</p>
        </div>
      </section>

      {/* search */}
      <div className="bg-sal py-6">
        <div className="container-x flex flex-wrap items-center gap-4">
          <label className="relative w-full max-w-[520px]">
            <span className="sr-only">{UI.search[lang]}</span>
            <IconSearch size={20} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-cortica" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`${UI.search[lang]} · bacalhau, polvo, acorda…`} className="h-14 w-full rounded-full bg-branco pl-14 pr-5 text-[17px] shadow-[inset_0_0_0_1.5px_rgba(138,90,50,0.3)]" />
          </label>
          <p aria-live="polite" className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-cortica">
            {q ? (total ? `${total} ${UI.results[lang]}` : UI.noResult[lang]) : `${total} ${UI.dishes[lang]}`}
          </p>
        </div>
      </div>

      {/* the sticky band of section pills */}
      <div className="sticky z-40 bg-oceano/95 backdrop-blur" style={{ top: "calc(var(--label-h) + 64px)" }}>
        <nav aria-label={UI.sections[lang]} className="container-x">
          <div ref={band} className="no-scrollbar flex gap-1.5 overflow-x-auto py-2.5">
            {filtered.map((s, i) => (
              <button
                key={s.id}
                type="button"
                data-sec={s.id}
                aria-current={active === s.id ? "true" : undefined}
                onClick={() => jump(s.id)}
                disabled={!s.dishes.length}
                className={cn("relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 font-display text-[15px] font-semibold uppercase tracking-[0.12em] disabled:opacity-35", active === s.id ? "text-tinta" : "text-branco")}
              >
                {active === s.id && <motion.span layoutId="carte-pill" className="absolute inset-0 rounded-full bg-dourado" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }} />}
                <span className="relative">0{i + 1}</span>
                <span className="relative">{SECTION_TITLES[s.id].short[lang]}</span>
                <span className={cn("relative rounded-full px-1.5 text-[12px]", active === s.id ? "bg-tinta/15" : "bg-branco/15")}>{s.dishes.length}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {filtered.map((s, i) =>
        s.dishes.length ? (
          <SectionBlock key={s.id} id={s.id} index={i} dishes={s.dishes} lang={lang} />
        ) : (
          <div key={s.id} id={s.id} />
        ),
      )}

      {/* the note about seasons and arrivals */}
      <section className="bg-tinta py-14 text-branco">
        <FadeIn className="container-x flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[860px] text-[clamp(18px,1.5vw,22px)] leading-relaxed">{TEXT.availability[lang]}</p>
          <a href={`tel:${BUSINESS.mobile.tel}`} className="btn">
            <span className="btn-roll">
              <span>{BUSINESS.mobile.label}</span>
              <span aria-hidden="true">{BUSINESS.mobile.label}</span>
            </span>
          </a>
        </FadeIn>
      </section>

      {/* closing band */}
      <section className="overflow-hidden bg-azulejo py-20 text-branco md:py-28">
        <div className="container-x grid items-center gap-12 md:grid-cols-[minmax(240px,4fr)_minmax(0,7fr)]">
          <MaskImage src={closing.sm} alt={closing.alt[lang]} w={closing.w} h={closing.h} className="arch-full aspect-[3/4] w-full max-w-[380px]" />
          <div>
            <p className="font-display text-[clamp(30px,3.4vw,58px)] font-bold uppercase leading-[0.98]">{TEXT.heroLine[lang]}</p>
            <PillButton className="mt-8" size="lg" onClick={book}>
              {UI.reserve[lang]}
            </PillButton>
          </div>
        </div>
      </section>
    </div>
  );
}
