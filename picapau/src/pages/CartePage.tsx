// La carte (HOY!'s menu page): a gold hero with a dish photo rising inside an arch, an accent-insensitive
// search, a night band of section pills that stays under the header (counts, a sliding gold pill that
// follows the section in view and keeps itself centred), then the six sections as colour blocks, each
// listing with a dotted leader to its price. "Sur commande" dishes carry a handwritten note.
import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { copy } from "@/copy";
import { CARTE, type Item, type Section } from "@/content/carte";
import { useSite } from "@/site";
import type { Lang } from "@/i18n";
import { cn, fold, pad2 } from "@/lib/utils";
import { MaskPhoto, Roll, SplitText } from "@/components/ui";
import { Cork, Pot, PortGlass, Woodpecker } from "@/components/illustrations";
import { LottieIcon } from "@/lottie/LottieIcon";
import type { Flyer } from "@/home/Flyers";

// GSAP only drives the cut-outs below the hero, so it loads after the first paint.
const Flyers = lazy(() => import("@/home/Flyers").then((m) => ({ default: m.Flyers })));

const TONES = ["tone-noite on-dark", "tone-nata", "tone-dourado", "tone-noite on-dark", "tone-nata", "tone-dourado"];
const FLYERS: Record<string, Flyer[]> = {
  entrees: [{ cutout: "salgados-presunto", left: "84%", top: "12%", width: "clamp(130px, 14vw, 230px)", depth: 0.4, rotate: [8, -8], desktopOnly: true }],
  poissons: [{ cutout: "bacalhau-a-braga", left: "-6%", top: "60%", width: "clamp(140px, 15vw, 250px)", depth: 0.6, rotate: [-8, 8], desktopOnly: true }],
  desserts: [{ cutout: "pica-pau-companhia", left: "80%", top: "70%", width: "clamp(140px, 15vw, 240px)", depth: 0.2, rotate: [6, -6], desktopOnly: true }],
};

function matches(item: Item, section: Section, q: string, lang: Lang) {
  if (!q) return true;
  const hay = [item.name, item.desc?.[lang], item.extra?.[lang], item.note?.[lang], section.title[lang]].filter(Boolean).join(" ");
  return fold(hay).includes(q);
}

export function CartePage() {
  const { lang, book } = useSite();
  const t = copy(lang);
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const q = fold(query.trim());
  const [active, setActive] = useState(CARTE[0].id);
  const band = useRef<HTMLUListElement>(null);

  const filtered = useMemo(
    () => CARTE.map((s) => ({ section: s, items: s.items.filter((i) => matches(i, s, q, lang)) })).filter((s) => s.items.length > 0),
    [q, lang],
  );

  // The pill follows the section in view…
  useEffect(() => {
    const els = filtered.map((f) => document.getElementById(f.section.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filtered]);
  // …and the band scrolls itself to keep it centred.
  useEffect(() => {
    const b = band.current, pill = b?.querySelector<HTMLElement>(`[data-nav="${active}"]`);
    if (!b || !pill) return;
    b.scrollTo({ left: pill.offsetLeft - b.clientWidth / 2 + pill.offsetWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  return (
    <>
      {/* 1 · Hero */}
      <section className="tone-dourado relative overflow-hidden pb-0 pt-[calc(var(--header-h)+var(--label-h)+clamp(48px,6vw,96px))]" aria-labelledby="carte-page-title">
        <div className="container grid gap-6">
          <p className="eyebrow text-vinho">{CARTE.map((s) => s.title[lang]).join(" · ")}</p>
          <SplitText as="h1" id="carte-page-title" text={t.menu.kicker} immediate stagger={0.07} delay={0.1} className="display text-tinta" style={{ fontSize: "var(--fs-mega)", lineHeight: 0.84 }} />
          <p className="lede max-w-[40ch]">{t.menu.subtitle}</p>
        </div>
        <div className="container mt-[clamp(32px,4vw,56px)]">
          <MaskPhoto
            name="salgados-presunto"
            eager
            rise
            className="aspect-[4/3] w-full [border-radius:50%_50%_0_0/22%_22%_0_0] md:aspect-[21/9] md:[border-radius:50%_50%_0_0/34%_34%_0_0]"
            sizes="(max-width: 767px) 100vw, 92vw"
            parallax={6}
          >
            <span className="tag absolute bottom-5 left-5">Salgados Tradicionais</span>
          </MaskPhoto>
        </div>
      </section>

      {/* 2 · Search and the section band */}
      <div className="tone-nata relative z-[5] border-b border-tinta/10">
        <div className="container flex flex-wrap items-center gap-x-6 gap-y-3 py-5">
          <label className="relative flex min-h-12 w-full max-w-[460px] items-center gap-3 rounded-full bg-branco px-5 shadow-[inset_0_0_0_1.5px_rgba(28,23,18,0.15)] has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-dourado has-[:focus-visible]:shadow-[0_0_0_6px_var(--tinta)]">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="6.5" />
              <path d="M16 16l4.5 4.5" strokeLinecap="round" />
            </svg>
            <span className="sr-only">{t.ui.search}</span>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t.ui.searchPlaceholder} autoComplete="off" className="min-h-12 w-full bg-transparent text-[17px] focus-visible:shadow-none focus-visible:outline-none [&::-webkit-search-cancel-button]:appearance-none" />
            {query && (
              <button type="button" onClick={() => setQuery("")} aria-label={t.ui.clear} className="grid h-8 w-8 flex-none cursor-pointer place-items-center rounded-full bg-tinta text-branco">
                ×
              </button>
            )}
          </label>
          <p className="text-[15px] text-cortica">{t.menu.alert}</p>
        </div>
      </div>
      <nav aria-label={t.ui.categories} className="sticky top-[calc(var(--label-h)+76px)] z-[30] bg-noite/95 backdrop-blur-md max-[1099px]:top-[calc(var(--label-h)+70px)]">
        <ul ref={band} className="no-scrollbar container m-0 flex list-none gap-1.5 overflow-x-auto py-3">
          {filtered.map(({ section, items }) => (
            <li key={section.id} className="flex-none">
              <a
                href={`#${section.id}`}
                data-nav={section.id}
                aria-current={active === section.id ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setActive(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
                }}
                className={cn(
                  "relative isolate inline-flex min-h-11 items-center gap-2 rounded-full px-4 font-display text-[15px] font-semibold uppercase tracking-[0.12em] no-underline",
                  active === section.id ? "text-tinta" : "text-branco",
                )}
              >
                {active === section.id && <motion.span layoutId="carte-pill" className="absolute inset-0 -z-10 rounded-full bg-dourado" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 36 }} />}
                {section.title[lang]}
                <span className={cn("rounded-full px-1.5 text-[12px] tnum", active === section.id ? "bg-tinta/15" : "bg-white/15")} aria-label={t.ui.itemCount(items.length)}>
                  {items.length}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div role="status" aria-live="polite">
        {q && !filtered.length && <p className="container py-20 text-center font-display text-3xl uppercase">{t.ui.searchNone(query.trim())}</p>}
      </div>

      {/* 3 · The six sections */}
      {filtered.map(({ section, items }) => {
        const n = CARTE.indexOf(section);
        return <CarteSection key={section.id} section={section} items={items} index={n} searching={!!q} />;
      })}

      {/* 4 · Closing band */}
      <section className="tone-vinho tex-cork py-[clamp(80px,10vw,150px)]" aria-label={t.lead}>
        <div className="container grid items-center gap-[clamp(32px,6vw,96px)] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <MaskPhoto name="polvo-a-lagareiro" className="arch-tall mx-auto aspect-[3/4] w-[min(80vw,420px)]" from="bottom" parallax={5} sizes="(max-width: 767px) 80vw, 34vw" />
          <div className="grid gap-8">
            <SplitText as="p" text={t.lead} className="display fs-xl text-branco" stagger={0.03} />
            <button type="button" className="btn justify-self-start" aria-haspopup="dialog" onClick={(e) => book(e.currentTarget)}>
              <Roll>{t.bookBtn}</Roll>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function CarteSection({ section, items, index, searching }: { section: Section; items: Item[]; index: number; searching: boolean }) {
  const { lang } = useSite();
  const t = copy(lang);
  const tone = TONES[index];
  const dark = tone.includes("noite");
  const photos = searching ? [] : section.photos;
  const art = { enfant: <Woodpecker className="w-full" />, desserts: <PortGlass className="w-full" />, commande: <Pot className="w-full" /> }[section.id];
  return (
    <section id={section.id} className={cn(tone, "relative overflow-hidden py-[clamp(72px,9vw,140px)] [scroll-margin-top:calc(var(--header-h)+var(--label-h)+76px)]")} aria-labelledby={`${section.id}-title`}>
      {!searching && FLYERS[section.id] && (
        <Suspense fallback={null}>
          <Flyers items={FLYERS[section.id]} />
        </Suspense>
      )}
      <div className="container relative grid gap-[clamp(32px,5vw,72px)] lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <header className="grid content-start gap-6 lg:sticky lg:top-[calc(var(--header-h)+var(--label-h)+110px)] lg:self-start">
          <p className={cn("group eyebrow tnum flex items-center gap-3", dark ? "text-dourado" : tone.includes("dourado") ? "text-vinho" : "text-francesinha")}>
            {pad2(index + 1)} / {pad2(CARTE.length)}
            {section.id === "poissons" && <LottieIcon name="fish" mode="hover" size={40} color="#5A1626" accent="#1F4E99" />}
            {section.id === "desserts" && <LottieIcon name="wine" mode="hover" size={40} color="#1C1712" accent="#5A1626" />}
          </p>
          <SplitText as="h2" id={`${section.id}-title`} text={section.title[lang]} className={cn("display", dark ? "text-branco" : section.id === "poissons" || section.id === "commande" ? "text-vinho" : "text-azulejo")} style={{ fontSize: section.title[lang].length > 10 ? "clamp(48px, 6.2vw, 112px)" : "clamp(56px, 8.4vw, 150px)", lineHeight: 0.86 }} />
          {photos.length > 0 && (
            <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0">
              {photos.map((name, i) => (
                <li key={name} className={i === 0 ? "col-span-2" : ""}>
                  <MaskPhoto name={name} className={cn("w-full rounded-[18px]", i === 0 ? "aspect-[4/3]" : "aspect-square")} from={i % 2 ? "right" : "bottom"} sizes={i === 0 ? "(max-width: 1023px) 92vw, 36vw" : "(max-width: 1023px) 46vw, 18vw"} />
                </li>
              ))}
            </ul>
          )}
          {photos.length === 0 && art && !searching && <div className="w-[clamp(120px,14vw,200px)]">{art}</div>}
        </header>

        <div className="grid content-start gap-2">
          {section.note && <p className={cn("mb-4 whitespace-pre-line rounded-2xl p-4 text-[16px]", dark ? "bg-white/[0.06]" : "bg-black/[0.05]")}>{section.note[lang]}</p>}
          {section.id === "commande" ? (
            <div className="grid gap-6">
              <div className="group flex items-center gap-4">
                <LottieIcon name="clock" mode="hover" size={52} color="#1C1712" accent="#5A1626" />
                <p className="hand text-[clamp(30px,3vw,42px)] leading-none text-vinho">{section.kicker![lang]}</p>
              </div>
              <p className="max-w-[56ch]">{section.text![lang]}</p>
              <ul className="m-0 grid list-none p-0">
                {items.map((item) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-4 border-t border-tinta/20 py-4 last:border-b">
                    <span className="font-display text-[clamp(24px,2.4vw,34px)] font-bold uppercase leading-none">{item.name}</span>
                    <span className="hand flex-none -rotate-2 text-[22px] leading-none text-vinho">{t.ui.surCommande}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <ul className="m-0 grid list-none p-0">
              {items.map((item) => (
                <li key={item.id} className={cn("grid gap-2 border-t py-5", dark ? "border-white/15" : "border-tinta/15")}>
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-[clamp(22px,2vw,30px)] font-bold uppercase leading-[1.02]">
                      {item.name}
                      {item.extra && <span className={cn("ml-2 font-body text-[14px] font-normal normal-case tracking-normal", dark ? "text-azulejo-claro" : "text-cortica")}>{item.extra[lang]}</span>}
                    </span>
                    <span className="leader" aria-hidden="true" />
                    <span className={cn("flex-none font-display text-[clamp(22px,2vw,28px)] font-bold tnum", dark ? "text-dourado" : "text-tinta")}>{item.price}</span>
                  </div>
                  {item.desc && <p className={cn("max-w-[60ch] whitespace-pre-line text-[16px] leading-relaxed", dark ? "text-branco/80" : "text-tinta/80")}>{item.desc[lang]}</p>}
                  {item.note && <p className={cn("text-[14px] font-bold", dark ? "text-dourado" : "text-vinho")}>{item.note[lang]}</p>}
                </li>
              ))}
            </ul>
          )}
          {section.id === "desserts" && !searching && (
            <div aria-hidden="true" className="mt-6 flex items-end gap-6">
              <Cork className="w-[90px]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
