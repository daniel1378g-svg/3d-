// Le menu, HOY!'s menu page: an apricot page hero, an accent-insensitive search, a sticky dark band of group
// pills with a sliding apricot pill that follows the group in view, then the six groups as colour blocks. The
// live menu is a photo gallery (no prices, no descriptions, no sections), so photo tiles carry it: each tile has
// its photo, the dish name exactly as written, a group tag and a "Planifier (48 h)" link; under the tiles a
// compact list runs dotted leaders to a "Photo ↗" link where HOY! has prices.
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { UI, type Lang } from "@/i18n";
import { useSite, planDish } from "@/site";
import { BUSINESS, GROUPS, TEXT, TILES, type GroupId, type Tile } from "@/content/site";
import { cutout, photo, srcSet, type Cutout, type Photo } from "@/content/photos";
import { cn, fold, storage } from "@/lib/utils";
import { useGsap } from "@/lib/useGsap";
import { useReduced } from "@/lib/useMedia";
import { FadeIn, MaskImage, SplitReveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { TakeawaySticker } from "@/components/home/MenuTeaser";
import { PillButton } from "@/components/ui/Pill";
import { IconPhone, IconSearch } from "@/components/icons";

const TONES: Record<GroupId, { bg: string; ink: string; sub: string; dark: boolean }> = {
  grelhados: { bg: "bg-marca-escura", ink: "text-branco", sub: "text-destaque", dark: true },
  bacalhau: { bg: "bg-fundo", ink: "text-tinta", sub: "text-marca", dark: false },
  pratos: { bg: "bg-acento-escuro", ink: "text-branco", sub: "text-destaque", dark: true },
  marisco: { bg: "bg-destaque", ink: "text-marca-escura", sub: "text-acento-escuro", dark: false },
  petiscos: { bg: "bg-marca", ink: "text-branco", sub: "text-destaque", dark: true },
  especialidades: { bg: "bg-marca-escura", ink: "text-branco", sub: "text-destaque", dark: true },
};
const FLY: Partial<Record<GroupId, Cutout>> = { grelhados: "frango", bacalhau: "bacalhau", pratos: "frango-prato" };
const plan = (go: ReturnType<typeof useSite>["go"], id: string) => {
  planDish(id);
  storage("session").set("ls-plan", id);
  go("home", "specialites");
};

function TileCard({ t, big, lang, onOpen, dark, i }: { t: Tile; big: boolean; lang: Lang; onOpen: () => void; dark: boolean; i: number }) {
  const { go } = useSite();
  const p = photo(t.photo);
  const g = GROUPS.find((x) => x.id === t.group)!;
  const canon = TILES.find((x) => x.name === t.name)!; // the planner lists each name once
  return (
    <figure className={cn("group", big && "col-span-2 row-span-2")}>
      <button type="button" onClick={onOpen} aria-label={`${UI.openPhoto[lang]} · ${t.name}`} className="block w-full">
        <MaskImage src={big ? p.src : p.sm} srcSet={srcSet(p)} sizes={big ? "(min-width: 1024px) 50vw, 92vw" : "(min-width: 1024px) 25vw, 46vw"} alt={p.alt[lang]} w={p.w} h={p.h} delay={(i % 4) * 0.06} from={big ? "bottom" : i % 2 ? "left" : "bottom"} className={cn("w-full", big ? "arch aspect-[4/4.2]" : "aspect-[4/3] rounded-[18px]")} imgClassName="transition-transform duration-700 group-hover:scale-[1.06]" />
      </button>
      <figcaption className="mt-3">
        <span className={cn("mb-1.5 inline-block rounded-full px-2.5 py-0.5 font-display text-[12px] font-bold uppercase tracking-[0.14em]", dark ? "bg-branco/15" : "bg-marca-escura/10")} lang="pt-PT">
          {g.pt}
        </span>
        <span lang="pt-PT" className={cn("dish-name block font-display font-bold uppercase leading-[1.02]", big ? "text-[clamp(26px,2.4vw,38px)]" : "text-[clamp(19px,1.5vw,23px)]")}>
          {t.name}
        </span>
        <button type="button" onClick={() => plan(go, canon.id)} className={cn("link mt-1.5 font-display text-[13px] font-semibold uppercase tracking-[0.12em]", dark ? "text-destaque" : "text-marca")}>
          {UI.plan48[lang]} →
        </button>
      </figcaption>
    </figure>
  );
}

function GroupBlock({ id, index, tiles, lang, onOpen }: { id: GroupId; index: number; tiles: Tile[]; lang: Lang; onOpen: (p: Photo) => void }) {
  const t = TONES[id];
  const g = GROUPS.find((x) => x.id === id)!;
  const fly = FLY[id];
  const names = tiles.filter((x, i) => tiles.findIndex((y) => y.name === x.name) === i);
  return (
    <section id={id} className={cn("relative overflow-hidden py-20 md:py-28", t.bg, t.ink, t.dark && "on-dark")} aria-labelledby={`${id}-title`}>
      {fly && <img src={cutout(fly).src} alt="" aria-hidden="true" loading="lazy" decoding="async" className="menu-fly pointer-events-none absolute -right-16 top-24 w-[min(340px,42vw)] opacity-90 rm-hide" />}
      <div className="container-x relative">
        <p className={cn("eyebrow", t.sub)}>
          0{index + 1} / 0{GROUPS.length} · {tiles.length} {UI.photos[lang]}
        </p>
        <h2 id={`${id}-title`} className="mt-4">
          <span lang="pt-PT" className="block fs-xxl font-extrabold">
            {g.pt}
          </span>
          {lang !== "pt" && <span className="mt-2 block fs-l font-bold opacity-80">{g.local[lang]}</span>}
        </h2>
        {id === "especialidades" && (
          <>
            <p className="mt-6 max-w-[760px] text-[clamp(18px,1.4vw,22px)]">{TEXT.freshness[lang]}</p>
            <p className="mt-3 font-hand text-[34px] leading-none text-destaque">{UI.handNote[lang]}</p>
          </>
        )}
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {tiles.map((x, i) => (
            <TileCard key={x.id} t={x} big={i === 0 && tiles.length > 2} lang={lang} onOpen={() => onOpen(photo(x.photo))} dark={t.dark} i={i} />
          ))}
        </div>
        {names.length > 1 && (
          <ul className={cn("mt-14 max-w-[880px] list-none divide-y", t.dark ? "divide-branco/15" : "divide-tinta/15")}>
            {names.map((x) => (
              <li key={x.id} className="flex items-baseline gap-3 py-3">
                <span lang="pt-PT" className="dish-name font-display text-[clamp(20px,1.7vw,26px)] font-bold uppercase leading-[1.05]">
                  {x.name}
                </span>
                <span aria-hidden="true" className="leader" />
                <button type="button" onClick={() => onOpen(photo(x.photo))} className="shrink-0 font-display text-[15px] font-semibold uppercase tracking-[0.12em]">
                  <span className="link">{UI.photoLink[lang]}</span> ↗<span className="sr-only"> · {x.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default function MenuPage() {
  const { lang, book } = useSite();
  const reduce = useReduced();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<GroupId>(GROUPS[0].id);
  const [box, setBox] = useState<{ list: Photo[]; i: number } | null>(null);
  const band = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const q = fold(query.trim());
  const filtered = useMemo(() => GROUPS.map((g) => ({ ...g, tiles: TILES.filter((t) => t.group === g.id && (!q || fold(`${t.name} ${g.pt} ${g.local[lang]}`).includes(q))) })), [q, lang]);
  const unique = new Set(filtered.flatMap((g) => g.tiles.map((t) => t.name))).size;
  const hero = photo("grelhada-mista");
  const closing = photo("frango-churrasco");
  const allPhotos = useMemo(() => TILES.map((t) => photo(t.photo)), []);

  // the band follows the group in view
  useEffect(() => {
    const on = () => {
      const line = 220;
      let cur = GROUPS[0].id;
      for (const g of GROUPS) {
        const el = document.getElementById(g.id);
        if (el && el.getBoundingClientRect().top <= line) cur = g.id;
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
      gsap.fromTo(".mp-hero-img", { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: { trigger: ".mp-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".menu-fly").forEach((el) => gsap.fromTo(el, { yPercent: 40, rotate: -10 }, { yPercent: -120, rotate: 10, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
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
  const open = (p: Photo) => setBox({ list: allPhotos, i: Math.max(0, allPhotos.findIndex((x) => x.id === p.id)) });

  return (
    <div ref={root}>
      {/* page hero */}
      <section className="mp-hero relative overflow-hidden bg-destaque pb-16 text-marca-escura" style={{ paddingTop: "calc(var(--label-h) + 130px)" }}>
        <div className="container-x">
          <p className="eyebrow text-acento-escuro">{TEXT.heroLine[lang]}</p>
          <SplitReveal as="h1" text={lines(TEXT.menuTitle[lang])} className="mt-4 fs-mega font-extrabold" />
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[minmax(0,8fr)_minmax(280px,4fr)]">
            <div className="relative">
              <MaskImage src={hero.src} srcSet={srcSet(hero)} sizes="(min-width: 1520px) 1000px, 92vw" alt={hero.alt[lang]} w={hero.w} h={hero.h} eager className="arch aspect-[16/10] w-full" imgClassName="mp-hero-img scale-110" />
              <TakeawaySticker lang={lang} className="absolute -bottom-10 right-4 w-28 md:right-10 md:w-36" />
            </div>
            <p className="text-[clamp(18px,1.4vw,22px)] font-bold leading-snug">{TEXT.freshness[lang]}</p>
          </div>
        </div>
      </section>

      {/* search */}
      <div className="bg-fundo py-6 pt-14">
        <div className="container-x flex flex-wrap items-center gap-4">
          <label className="relative w-full max-w-[520px]">
            <span className="sr-only">{UI.search[lang]}</span>
            <IconSearch size={20} className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-linha" />
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`${UI.search[lang]} · picanha, bacalhau, polvo…`} className="h-14 w-full rounded-full bg-branco pl-14 pr-5 text-[17px] shadow-[inset_0_0_0_1.5px_rgba(110,103,103,0.4)]" />
          </label>
          <p aria-live="polite" className="font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-linha">
            {q ? (unique ? `${unique} ${UI.results[lang]}` : UI.noResult[lang]) : `${TILES.length} ${UI.photos[lang]} · ${unique} ${UI.dishes[lang]}`}
          </p>
        </div>
      </div>

      {/* the sticky band of group pills */}
      <div className="sticky z-40 bg-marca-escura/95 backdrop-blur" style={{ top: "calc(var(--label-h) + 64px)" }}>
        <nav aria-label={UI.groups[lang]} className="container-x">
          <div ref={band} className="no-scrollbar flex gap-1.5 overflow-x-auto py-2.5">
            {filtered.map((g, i) => (
              <button
                key={g.id}
                type="button"
                data-sec={g.id}
                aria-current={active === g.id ? "true" : undefined}
                onClick={() => jump(g.id)}
                disabled={!g.tiles.length}
                className={cn("relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 font-display text-[15px] font-semibold uppercase tracking-[0.12em] disabled:opacity-35", active === g.id ? "text-marca-escura" : "text-branco")}
              >
                {active === g.id && <motion.span layoutId="menu-pill" className="absolute inset-0 rounded-full bg-destaque" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 480, damping: 38 }} />}
                <span className="relative">0{i + 1}</span>
                <span className="relative" lang="pt-PT">
                  {g.pt}
                </span>
                <span className={cn("relative rounded-full px-1.5 text-[12px]", active === g.id ? "bg-marca-escura/15" : "bg-branco/15")}>{g.tiles.length}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      {filtered.map((g, i) => (g.tiles.length ? <GroupBlock key={g.id} id={g.id} index={i} tiles={g.tiles} lang={lang} onOpen={open} /> : <div key={g.id} id={g.id} />))}

      {/* the note band */}
      <section className="bg-marca-escura py-14 text-branco">
        <FadeIn className="container-x flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[860px] text-[clamp(18px,1.5vw,22px)] leading-relaxed">{TEXT.toBook[lang]}</p>
          <a href={`tel:${BUSINESS.booking.tel}`} className="btn">
            <IconPhone size={18} />
            <span className="btn-roll">
              <span>{BUSINESS.booking.label}</span>
              <span aria-hidden="true">{BUSINESS.booking.label}</span>
            </span>
          </a>
        </FadeIn>
      </section>

      {/* closing band */}
      <section className="overflow-hidden bg-marca py-20 text-branco md:py-28">
        <div className="container-x grid items-center gap-12 md:grid-cols-[minmax(240px,4fr)_minmax(0,7fr)]">
          <MaskImage src={closing.sm} srcSet={srcSet(closing)} sizes="380px" alt={closing.alt[lang]} w={closing.w} h={closing.h} className="arch-full aspect-[3/4] w-full max-w-[380px]" />
          <div>
            <p className="font-display text-[clamp(34px,4vw,72px)] font-bold uppercase leading-[0.94]">{TEXT.heroLine[lang]}</p>
            <PillButton className="mt-8" size="lg" onClick={book}>
              {UI.reserve[lang]}
            </PillButton>
          </div>
        </div>
      </section>
      <Lightbox photos={box?.list ?? allPhotos} index={box ? box.i : null} onIndex={(i) => setBox((b) => (b ? { ...b, i } : b))} onClose={() => setBox(null)} />
    </div>
  );
}

function lines(s: string) {
  const w = s.split(" ");
  return w.length > 2 ? [w.slice(0, -2).join(" "), w.slice(-2).join(" ")] : [s];
}
