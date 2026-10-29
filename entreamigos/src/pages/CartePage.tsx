// La carte, HOY!'s menu page: a gold page hero with the PDF link, an accent-insensitive search with the
// "Viande / Poisson / Tout" filter, a sticky dark band of the 11 section pills with a sliding pill that follows
// the section in view, then the sections of the live carte as colour blocks, each with its live title, its
// photos and the lines with dotted leaders and prices exactly as written.
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { UI, type Lang } from "@/i18n";
import { useSite, planDish } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { CARTE, SECTION_PHOTOS, SECTION_TITLES, WAIT_L, descText, noteText, priceText, type Dish, type Side } from "@/content/carte";
import { cutout, photo, type Cutout } from "@/content/photos";
import { cn, fold } from "@/lib/utils";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { FadeIn, MaskImage, SplitReveal } from "@/components/Reveal";
import { DeliverySticker, SideToggle } from "@/components/home/CarteTeaser";
import { DeliveryLinks } from "@/components/Contact";
import { Enfants } from "@/components/home/Enfants";
import { FonduePot } from "@/components/Illustrations";
import { PillButton, PillLink } from "@/components/ui/Pill";
import { IconExternal, IconSearch } from "@/components/icons";

const TONE_CYCLE = [
  { bg: "bg-marca-escura", ink: "text-branco", sub: "text-destaque", dark: true },
  { bg: "bg-fundo", ink: "text-tinta", sub: "text-marca", dark: false },
  { bg: "bg-acento-escuro", ink: "text-branco", sub: "text-destaque", dark: true },
  { bg: "bg-destaque", ink: "text-marca-escura", sub: "text-marca-escura", dark: false },
  { bg: "bg-marca", ink: "text-branco", sub: "text-destaque", dark: true },
];
const FLY: Record<string, Cutout | null> = { entrees: "rissoles", specialites: "poulet", viandes: "bifanas", poissons: "polvo", pates: "bolognaise" };

function haystack(d: Dish) {
  return fold([d.name, d.desc, descText(d, "en"), descText(d, "pt"), descText(d, "de"), descText(d, "it")].join(" "));
}

function Listing({ d, lang, dark }: { d: Dish; lang: Lang; dark: boolean }) {
  const { go } = useSite();
  const desc = descText(d, lang);
  return (
    <li className="py-4">
      <div className="flex items-baseline gap-3">
        <h3 lang={/^(Salade|Cocktail|Accras|Rissoles|Poulet|Travers|Poitrine|Grillades|Steak|Entrecôte|Filet|Viande|Gambas|Pavé|Calamares|Filets|Carbonara|Bolognaise|Gnocchi|Moitié|Aux|JE|PEU|Tiramisù|Gâteau|Fondant|Flan|Tarte|Moonlight|Maison|Jazz|Cha|Le |Blues|Général|Glaces|Sorbets|Garniture)/.test(d.name) ? "fr" : "pt-PT"} className="dish-name font-display text-[clamp(22px,1.9vw,30px)] font-bold uppercase leading-[1.02]">
          {d.group && <span className="mr-2 opacity-70">{d.group} ·</span>}
          {d.name}
        </h3>
        <span aria-hidden="true" className="leader" />
        <span className="shrink-0 whitespace-nowrap text-right font-display text-[clamp(22px,1.9vw,30px)] font-bold leading-none">{priceText(d, lang)}</span>
      </div>
      {desc && <p className={cn("mt-1.5 max-w-[640px] text-[16px] leading-snug", dark ? "text-branco/80" : "text-tinta")}>{desc}</p>}
      {d.wait && <p className="mt-1 font-hand text-[24px] leading-none text-destaque">{WAIT_L[lang]}</p>}
      {d.section === "commande" && (
        <button
          type="button"
          onClick={() => {
            planDish(d.id);
            go("home", "sur-commande");
          }}
          className="link mt-2 font-display text-[14px] font-semibold uppercase tracking-[0.12em] text-destaque"
        >
          {UI.planGroup[lang]} → {UI.min10[lang].toLowerCase()}
        </button>
      )}
    </li>
  );
}

function SectionBlock({ id, index, dishes, lang, notes }: { id: string; index: number; dishes: Dish[]; lang: Lang; notes: string[] }) {
  const t = TONE_CYCLE[index % TONE_CYCLE.length];
  const title = SECTION_TITLES[id];
  const photos = SECTION_PHOTOS[id].map(photo);
  const fly = FLY[id];
  return (
    <section id={id} className={cn("carte-sec relative overflow-hidden py-20 md:py-28", t.bg, t.ink, t.dark && "on-dark")} aria-labelledby={`${id}-title`}>
      {fly && <img src={cutout(fly).src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="carte-fly pointer-events-none absolute -right-16 top-24 w-[min(320px,40vw)] opacity-95" />}
      <div className="container-x relative">
        <p className={cn("eyebrow", t.sub)}>
          {String(index + 1).padStart(2, "0")} / 11 · {dishes.length} {UI.lines[lang]}
        </p>
        <h2 id={`${id}-title`} className="mt-4">
          <span lang="fr" className="block fs-xxl font-extrabold">
            {CARTE.find((s) => s.id === id)!.live}
          </span>
          {lang !== "fr" && <span className="mt-2 block fs-l font-bold opacity-75">{title.local[lang]}</span>}
        </h2>
        {notes.length > 0 && (
          <ul className="mt-5 list-none space-y-1">
            {notes.map((n) => (
              <li key={n} className={cn("text-[15px]", t.dark ? "text-suave" : t.sub)}>
                {noteText(n, lang)}
              </li>
            ))}
          </ul>
        )}
        <div className={cn("mt-12 grid gap-12", (photos.length || id === "fondues") && "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]")}>
          {id === "fondues" ? (
            <div className="arch grid aspect-[4/3.4] place-items-center bg-destaque">
              <FonduePot className="w-[58%]" />
              <p className="-mt-6 rounded-full bg-tinta/10 px-4 py-2 font-display text-[13px] font-semibold uppercase tracking-[0.14em] text-tinta">
                {UI.photo[lang]} : <span className="normal-case tracking-normal">Fondue au fromage</span>
              </p>
            </div>
          ) : photos.length ? (
            <div className="grid grid-cols-2 content-start gap-3">
              {photos.map((p, i) => (
                <MaskImage key={p.id} src={i === 0 ? p.src : p.sm} alt={p.alt[lang]} w={p.w} h={p.h} delay={i * 0.08} from={i === 0 ? "bottom" : "left"} className={cn("w-full", i === 0 ? "arch col-span-2 aspect-[4/3.4]" : "aspect-square rounded-[18px]")} />
              ))}
            </div>
          ) : null}
          <ul className={cn("list-none divide-y self-start", t.dark ? "divide-branco/15" : "divide-tinta/15")}>
            {dishes.map((d) => (
              <Listing key={d.id} d={d} lang={lang} dark={t.dark} />
            ))}
          </ul>
        </div>
        <p className={cn("mt-10 text-[14px]", t.dark ? "text-suave" : t.sub)}>{TEXT.prices[lang]}</p>
      </div>
    </section>
  );
}

export default function CartePage() {
  const { lang, book } = useSite();
  const reduce = useReduced();
  const [query, setQuery] = useState("");
  const [side, setSide] = useState<Side>("tout");
  const [active, setActive] = useState(CARTE[0].id);
  const band = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const q = fold(query.trim());
  // one search result per name: the carte lists each dish once (the menu page keeps both photos)
  const filtered = useMemo(() => CARTE.map((s) => ({ ...s, dishes: s.dishes.filter((d) => (!q || haystack(d).includes(q)) && (side === "tout" || d.side === side)) })), [q, side]);
  const total = filtered.reduce((n, s) => n + s.dishes.length, 0);
  const hero = photo("plats-table");
  const closing = photo("terrasse");

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
      <section className="cp-hero relative overflow-hidden bg-destaque pb-16 text-tinta" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
        <div className="container-x">
          <p className="eyebrow text-marca-escura">{TEXT.carteIntro[lang]}</p>
          <SplitReveal as="h1" text={[UI.carte[lang]]} className="mt-4 fs-mega font-extrabold text-marca-escura" />
          <div className="relative mt-10">
            <MaskImage src={hero.src} srcSet={`${hero.sm} 640w, ${hero.src} 1200w`} sizes="(min-width: 1520px) 1400px, 92vw" alt={hero.alt[lang]} w={hero.w} h={hero.h} eager className="arch aspect-[16/9] w-full md:aspect-[21/9]" imgClassName="cp-hero-img scale-110" />
            <DeliverySticker lang={lang} className="absolute -bottom-10 right-4 w-28 md:right-12 md:w-40" onClick={() => document.getElementById("carte-note")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })} />
          </div>
          <div className="mt-14 flex flex-wrap items-center gap-5">
            <p className="max-w-[640px] text-lg">{TEXT.prices[lang]}</p>
            <PillLink href={BUSINESS.pdf} target="_blank" rel="noopener noreferrer" variant="dark" iconRight={<IconExternal size={16} />}>
              {UI.pdf[lang]}
            </PillLink>
          </div>
        </div>
      </section>

      {/* search */}
      <div className="bg-fundo py-6">
        <div className="container-x flex flex-wrap items-center gap-4">
          <label className="relative w-full max-w-[520px]">
            <span className="sr-only">{UI.search[lang]}</span>
            <IconSearch size={20} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-linha" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`${UI.search[lang]} · bacalhau, polvo, crème…`} className="h-14 w-full rounded-full bg-branco pl-14 pr-5 text-[17px] shadow-[inset_0_0_0_1.5px_rgba(107,107,107,0.3)]" />
          </label>
          <div className="rounded-full bg-marca-escura">
            <SideToggle value={side} onChange={setSide} id="cp-side" className="text-branco" />
          </div>
          <p aria-live="polite" className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-linha">
            {q || side !== "tout" ? (total ? `${total} ${UI.results[lang]}` : UI.noResult[lang]) : `${total} ${UI.lines[lang]}`}
          </p>
        </div>
      </div>

      {/* the sticky band of section pills */}
      <div className="sticky z-40 bg-marca-escura/95 backdrop-blur" style={{ top: "calc(var(--label-h) + 64px)" }}>
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
                {active === s.id && <motion.span layoutId="carte-pill" className="absolute inset-0 rounded-full bg-destaque" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }} />}
                <span className="relative">{String(i + 1).padStart(2, "0")}</span>
                <span className="relative">{SECTION_TITLES[s.id].short[lang]}</span>
                <span className={cn("relative rounded-full px-1.5 text-[12px]", active === s.id ? "bg-marca-escura text-branco" : "bg-branco/15")}>{s.dishes.length}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {filtered.map((s, i) =>
        s.dishes.length ? (
          s.id === "enfants" && !q && side === "tout" ? (
            <Enfants key={s.id} eyebrow={`${String(i + 1).padStart(2, "0")} / 11 · ${s.dishes.length} ${UI.lines[lang]}`} />
          ) : (
            <SectionBlock key={s.id} id={s.id} index={i} dishes={s.dishes} lang={lang} notes={s.notes} />
          )
        ) : (
          <div key={s.id} id={s.id} />
        ),
      )}

      {/* the note band: prices, the phone and delivery */}
      <section id="carte-note" className="bg-tinta py-14 text-branco">
        <FadeIn className="container-x flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[860px] text-[clamp(18px,1.5vw,22px)] leading-relaxed">{TEXT.prices[lang]}</p>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:${BUSINESS.phoneTel}`} className="btn">
              <span className="btn-roll">
                <span>{BUSINESS.phone}</span>
                <span aria-hidden="true">{BUSINESS.phone}</span>
              </span>
            </a>
            <DeliveryLinks />
          </div>
        </FadeIn>
      </section>

      {/* closing band */}
      <section className="overflow-hidden bg-marca py-20 text-branco md:py-28">
        <div className="container-x grid items-center gap-12 md:grid-cols-[minmax(240px,4fr)_minmax(0,7fr)]">
          <MaskImage src={closing.sm} alt={closing.alt[lang]} w={closing.w} h={closing.h} className="arch-full aspect-[3/4] w-full max-w-[380px]" />
          <div>
            <p className="font-display text-[clamp(30px,3.4vw,58px)] font-bold uppercase leading-[0.98]">
              {TEXT.heroLeft[lang]} <span className="text-destaque">{TEXT.heroRight[lang]}</span>
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
