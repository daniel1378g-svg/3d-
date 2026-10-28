import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { HTML_LANG, UI, WELCOME, fill, type Lang } from "@/i18n";
import { CONTACT, MENU, descIn, photo, photoAlt, photoSize, priceLabel, sectionTitle, type Dish, type Section } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { PiriSparks } from "@/components/Sparks";
import { ArrowRight, ChiliIcon, CloseIcon, ExternalIcon, SearchIcon } from "@/components/icons";
import { LiveBadge } from "@/components/LiveBadge";

type Filter = "all" | "mar" | "terra";
const norm = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const capital = (t: string) => t.charAt(0).toLocaleUpperCase() + t.slice(1);
const tabLabel = (s: Section, lang: Lang) => (s.id === "bienvenue" ? WELCOME[lang].word : capital(s.title[lang].replace(/^(Nos|Our|As nossas|Os nossos|I nostri|Le nostre|Unsere)\s+/i, "")));

// Every listing, searchable in all five languages.
const INDEX = new Map(
  MENU.sections.flatMap((s) => s.items.map((d) => [d.id, norm([d.name, ...Object.values(d.desc), ...(d.notes ?? []).flatMap((n) => Object.values(n)), ...Object.values(s.title)].join(" "))] as const)),
);

export function MenuPage() {
  const { lang, book } = useSite();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(MENU.sections[0].id);
  const [open, setOpen] = useState<string | null>(null);
  const [hoverPhoto, setHoverPhoto] = useState<string | null>(null);
  const tabs = useRef<HTMLDivElement>(null);
  const searchId = useId();

  const sections = useMemo(() => {
    const q = norm(query.trim());
    return MENU.sections
      .map((s) => ({
        ...s,
        items: s.items.filter((d) => (filter === "all" || d.side === filter || d.side === "both") && (!q || INDEX.get(d.id)!.includes(q))),
      }))
      .filter((s) => s.items.length > 0);
  }, [filter, query]);
  const shown = sections.reduce((n, s) => n + s.items.length, 0);

  // Scrollspy: the section crossing the middle of the screen is the active tab.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);
  // Keep the active tab in view inside the tab strip without moving the page.
  useEffect(() => {
    const strip = tabs.current;
    const tab = strip?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (!strip || !tab) return;
    const left = tab.offsetLeft - strip.clientWidth / 2 + tab.offsetWidth / 2;
    strip.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    setActive(id);
  };

  return (
    <>
      <section aria-labelledby="menu-title" className="on-dark tex-grill gutter relative overflow-hidden bg-bordeaux pb-14 pt-14 text-linen md:pb-20 md:pt-20">
        <div className="wrap grid items-end gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <span aria-hidden="true" className="h-px w-8 bg-gold" />
              {UI.menu[lang]} · {fill(UI.results[lang], { n: MENU.liveListings })}
            </p>
            <h1 id="menu-title" lang={HTML_LANG[lang]} className="font-display text-[clamp(2.8rem,8vw,6.4rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
              {sectionTitle("bienvenue", lang)
                .split(" ")
                .map((w, i) => (
                  <span key={`${lang}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? false : { transform: "translateY(105%)" }}
                      animate={{ transform: "translateY(0%)" }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 * i }}
                    >
                      {w}
                    </motion.span>
                    {" "}
                  </span>
                ))}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <LiveBadge />
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={book} className="inline-flex min-h-12 items-center rounded-full bg-linen px-6 font-bold text-bordeaux hover:bg-gold hover:text-charcoal">
                {UI.book[lang]}
              </button>
              <a href={CONTACT.delivery} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-linen/45 px-6 font-bold text-linen hover:bg-linen/10">
                {UI.delivery[lang]}
                <ExternalIcon />
                <span className="sr-only">({UI.newTab[lang]})</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The board's controls stay under the header while the menu scrolls. */}
      <div className="on-light sticky z-[150] border-b border-charcoal/10 bg-linen/95 shadow-[0_14px_30px_-28px_rgba(27,20,20,0.8)] backdrop-blur-md" style={{ top: "calc(var(--label-h) + env(safe-area-inset-top, 0px) + var(--header-h) - 8px)" }}>
        <div className="gutter">
          <div className="wrap flex flex-wrap items-center gap-3 pt-3">
            <div role="group" aria-label={UI.filterLabel[lang]} className="relative flex rounded-full bg-linen-2 p-1">
              {(["all", "mar", "terra"] as Filter[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn("relative min-h-10 rounded-full px-4 text-sm font-bold transition-colors", filter === f ? "text-linen" : "text-charcoal hover:text-bordeaux")}
                >
                  {filter === f && <motion.span layoutId="filter-pill" aria-hidden="true" className={cn("absolute inset-0 rounded-full", f === "mar" ? "bg-atlantic" : f === "terra" ? "bg-ember-deep" : "bg-bordeaux")} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                  <span className="relative">{f === "all" ? UI.all[lang] : f === "mar" ? UI.sea[lang] : UI.land[lang]}</span>
                </button>
              ))}
            </div>
            <div className="relative min-w-[200px] flex-1 sm:max-w-sm">
              <label htmlFor={searchId} className="sr-only">
                {UI.search[lang]}
              </label>
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={UI.searchPlaceholder[lang]}
                className="h-11 w-full rounded-full border-2 border-charcoal/12 bg-white pl-10 pr-10 text-[16px] text-charcoal placeholder:text-ink-soft focus:border-bordeaux"
              />
              {query && (
                <button type="button" onClick={() => setQuery("")} className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-ink-soft hover:text-bordeaux">
                  <CloseIcon size={16} />
                  <span className="sr-only">{UI.clear[lang]}</span>
                </button>
              )}
            </div>
            <p className="text-sm font-semibold text-ink-soft" aria-live="polite">
              {fill(shown === 1 ? UI.resultsOne[lang] : UI.results[lang], { n: shown })}
            </p>
          </div>
          <nav aria-label={UI.sections[lang]} className="wrap">
            <div ref={tabs} className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 pb-1 pt-2">
              {MENU.sections.map((s) => {
                const visible = sections.some((x) => x.id === s.id);
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    data-tab={s.id}
                    aria-current={active === s.id ? "true" : undefined}
                    aria-disabled={!visible || undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      if (visible) jump(s.id);
                    }}
                    className={cn("relative shrink-0 whitespace-nowrap px-3 pb-3 pt-2 text-[15px] font-semibold transition-colors", active === s.id ? "text-bordeaux" : "text-charcoal/80 hover:text-bordeaux", !visible && "opacity-40")}
                  >
                    {tabLabel(s, lang)}
                    {active === s.id && <motion.span layoutId="menu-tab" aria-hidden="true" className="absolute inset-x-3 bottom-1 h-[3px] rounded-full bg-bordeaux" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      <div className="on-light gutter bg-linen pb-24 pt-6">
        <div className="wrap">
          {shown === 0 && (
            <div className="py-20 text-center">
              <p className="font-display text-2xl font-semibold text-charcoal">{fill(UI.noResults[lang], { q: query })}</p>
              <button type="button" onClick={() => (setQuery(""), setFilter("all"))} className="mt-5 inline-flex min-h-11 items-center rounded-full bg-bordeaux px-5 font-bold text-linen">
                {UI.clear[lang]}
              </button>
            </div>
          )}
          <LayoutGroup>
            <AnimatePresence initial={false} mode="popLayout">
              {sections.map((s) => (
                <motion.section
                  key={s.id}
                  id={s.id}
                  layout={reduce ? false : "position"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  aria-labelledby={s.id === "bienvenue" ? "menu-title" : `${s.id}-title`}
                  className="scroll-mt-[calc(var(--label-h)+var(--header-h)+132px)] border-b border-charcoal/10 py-12 last:border-0 md:py-16"
                >
                  <SectionHead section={s} lang={lang} />
                  <ul className="mt-8 grid gap-x-12 md:grid-cols-2">
                    <AnimatePresence initial={false} mode="popLayout">
                      {s.items.map((d) => (
                        <motion.li
                          key={d.id}
                          layout={reduce ? false : "position"}
                          initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "scale(0.97)" }}
                          animate={{ opacity: 1, transform: "scale(1)" }}
                          exit={{ opacity: 0, transition: { duration: 0.12 } }}
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          className="border-b border-dashed border-charcoal/12"
                        >
                          <DishRow dish={d} lang={lang} open={open === d.id} onToggle={() => setOpen((o) => (o === d.id ? null : d.id))} onHover={setHoverPhoto} onJump={jump} />
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </motion.section>
              ))}
            </AnimatePresence>
          </LayoutGroup>
          <p className="mt-10 text-sm text-ink-soft">{UI.pricesChf[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={book} className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-bordeaux px-6 font-bold text-linen hover:bg-bordeaux-deep">
              {UI.book[lang]}
              <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
            </button>
            <a href={CONTACT.delivery} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-bordeaux px-6 font-bold text-bordeaux hover:bg-bordeaux hover:text-linen">
              {UI.delivery[lang]}
              <ExternalIcon />
              <span className="sr-only">({UI.newTab[lang]})</span>
            </a>
          </div>
        </div>
      </div>
      <FollowPhoto id={hoverPhoto} lang={lang} />
    </>
  );
}

function SectionHead({ section, lang }: { section: Section; lang: Lang }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      {section.id === "bienvenue" ? (
        <p className="font-hand text-3xl font-semibold text-ember-deep">{WELCOME[lang].line}</p>
      ) : (
        <h2 id={`${section.id}-title`} className="font-display text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-none text-bordeaux">
          {section.title[lang]}
        </h2>
      )}
      <ul aria-label={UI.menuPhotos[lang]} className="flex -space-x-4">
        {section.photos.map((id, i) => {
          const [w, h] = photoSize(id);
          return (
            <li key={id} className="transition-transform duration-500 ease-out-expo hover:z-10 hover:-translate-y-2" style={{ rotate: `${[-5, 3, -2][i]}deg` }}>
              <img src={photo(id, true)} width={w} height={h} alt={photoAlt(id, lang)} loading="lazy" decoding="async" className="h-20 w-28 rounded-2xl border-4 border-linen object-cover shadow-[0_12px_24px_-14px_rgba(27,20,20,0.7)] md:h-24 md:w-32" />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const SideMark = ({ side, lang }: { side: Dish["side"]; lang: Lang }) => {
  if (side === "none") return null;
  const label = side === "mar" ? UI.seaTag[lang] : side === "terra" ? UI.landTag[lang] : UI.bothTag[lang];
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em]", side === "mar" ? "bg-atlantic/10 text-atlantic" : side === "terra" ? "bg-ember/15 text-[#8a3510]" : "bg-gold/20 text-[#6b5216]")}>
      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        {side !== "terra" && <path d="M2 14c2.5-3 5-3 7.5 0s5 3 7.5 0 3.5-2 5-1" />}
        {side !== "mar" && <path d="M12 3c3 4 6 6.5 6 11a6 6 0 0 1-12 0c0-2.5 1.5-4 3-6 .5 2 1.5 3 3 3-1-2.5-.5-5.5 0-8Z" />}
      </svg>
      {label}
    </span>
  );
};

function DishRow({ dish, lang, open, onToggle, onHover, onJump }: { dish: Dish; lang: Lang; open: boolean; onToggle: () => void; onHover: (id: string | null) => void; onJump: (id: string) => void }) {
  const reduce = useReducedMotion();
  const panelId = useId();
  const expandable = !!dish.photo;
  const name = <span className="font-display text-xl font-bold leading-snug text-charcoal md:text-[1.35rem]">{dish.name}</span>;
  const body = (
    <>
      <span className="flex items-baseline gap-3">
        {dish.piri ? (
          <PiriSparks className="inline-flex items-center gap-1.5">
            {name}
            <ChiliIcon className="text-ember-deep" />
            <span className="sr-only">(piri piri)</span>
          </PiriSparks>
        ) : (
          name
        )}
        <span aria-hidden="true" className="leader" />
        <span className="shrink-0 font-display text-lg font-bold tabular-nums text-bordeaux">{priceLabel(dish, lang, UI.from)}</span>
      </span>
      {descIn(dish, lang) && (
        <span lang={HTML_LANG[lang]} className="mt-1 block text-[15px] leading-relaxed text-ink-soft">
          {descIn(dish, lang)}
        </span>
      )}
      {(dish.side !== "none" || dish.notes?.length) && (
        <span className="mt-2 flex flex-wrap items-center gap-1.5">
          <SideMark side={dish.side} lang={lang} />
          {dish.notes?.map((n) => (
            <span key={n.fr} className="rounded-full bg-linen-2 px-2.5 py-0.5 text-xs font-semibold text-bordeaux">
              {n[lang]}
            </span>
          ))}
        </span>
      )}
    </>
  );

  return (
    <div className="py-4">
      {expandable ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          onPointerEnter={(e) => e.pointerType === "mouse" && onHover(dish.photo!)}
          onPointerLeave={() => onHover(null)}
          data-cursor="view"
          className="group block w-full rounded-xl text-left"
        >
          {body}
          <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.1em] text-bordeaux">
            {open ? UI.close[lang] : UI.open[lang]}
            <svg width="10" height="6" viewBox="0 0 10 6" aria-hidden="true" className={cn("transition-transform", open && "rotate-180")}>
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </button>
      ) : (
        <div>{body}</div>
      )}
      <AnimatePresence initial={false}>
        {expandable && open && (
          <motion.div
            id={panelId}
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-6px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start"
          >
            <img src={photo(dish.photo!)} width={photoSize(dish.photo!)[0]} height={photoSize(dish.photo!)[1]} alt={photoAlt(dish.photo!, lang)} loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover sm:w-64" />
            {dish.alsoIn && (
              <a
                href={`#${dish.alsoIn}`}
                onClick={(e) => {
                  e.preventDefault();
                  onJump(dish.alsoIn!);
                }}
                className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-bordeaux underline underline-offset-4"
              >
                {fill(UI.alsoIn[lang], { s: sectionTitle(dish.alsoIn, lang) })}
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Desktop: the dish photo follows the mouse over rows that have one. */
function FollowPhoto({ id, lang }: { id: string | null; lang: Lang }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 30 });
  const sy = useSpring(y, { stiffness: 300, damping: 30 });
  const [fine, setFine] = useState(false);
  useEffect(() => {
    setFine(matchMedia("(pointer: fine) and (hover: hover)").matches);
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX + 28);
      y.set(e.clientY - 90);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);
  if (!fine || reduce) return null;
  return (
    <motion.div aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[340]" style={{ x: sx, y: sy }}>
      <AnimatePresence>
        {id && (
          <motion.img
            key={id}
            src={photo(id, true)}
            alt={photoAlt(id, lang) && ""}
            className="h-[150px] w-[210px] rounded-2xl border-4 border-white object-cover shadow-[0_24px_50px_-20px_rgba(27,20,20,0.7)]"
            initial={{ opacity: 0, transform: "scale(0.8) rotate(-6deg)" }}
            animate={{ opacity: 1, transform: "scale(1) rotate(-3deg)" }}
            exit={{ opacity: 0, transform: "scale(0.85) rotate(0deg)", transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
