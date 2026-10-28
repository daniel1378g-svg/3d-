import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { UI, fill, type Lang } from "@/i18n";
import { MENU, chf, photo, photoAlt, type Dish, type Section, type Venue } from "@/content";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { ChiliIcon, SearchIcon } from "./icons";

type Filter = "all" | "pizzeria" | "oasis";
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const matches = (d: Dish, q: string, lang: Lang) => !q || fold([d.name, d.desc[lang], d.desc.de, d.extra?.[lang] ?? ""].join(" ")).includes(q);
const inFilter = (v: Venue, f: Filter) => f === "all" || v === f || v === "both";
const VENUE_DOT: Record<Venue, string> = { pizzeria: "bg-oven", oasis: "bg-ember", both: "bg-brand" };

/**
 * Every section, dish and price from the menu PDF. `only` fixes the filter (the venue pages show their
 * own part); without it the visitor gets the Pizza / Grill / Alle toggle, sticky section tabs and search.
 */
export function MenuBoard({ only, compact = false }: { only?: Exclude<Filter, "all">; compact?: boolean }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>(only ?? "all");
  const [query, setQuery] = useState("");
  const q = fold(query.trim());
  const sections = useMemo(
    () =>
      MENU.sections
        .filter((s) => inFilter(s.venue, filter) && (!only || s.venue === only))
        .map((s) => ({ ...s, items: s.items.filter((d) => matches(d, q, lang)) }))
        .filter((s) => s.items.length > 0),
    [filter, q, lang, only],
  );
  const count = sections.reduce((n, s) => n + s.items.length, 0);
  const uid = useId();

  return (
    <div>
      {!only && (
        <div className="flex flex-wrap items-center gap-3">
          <div role="radiogroup" aria-label={UI.filterLabel[lang]} className="inline-flex rounded-full bg-ink/6 p-1">
            {(["all", "pizzeria", "oasis"] as Filter[]).map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setFilter(f)}
                  onKeyDown={(e) => {
                    const order: Filter[] = ["all", "pizzeria", "oasis"];
                    const i = order.indexOf(f);
                    const to = e.key === "ArrowRight" ? order[(i + 1) % 3] : e.key === "ArrowLeft" ? order[(i + 2) % 3] : null;
                    if (to) {
                      e.preventDefault();
                      setFilter(to);
                      (e.currentTarget.parentElement?.children[order.indexOf(to)] as HTMLElement | undefined)?.focus();
                    }
                  }}
                  tabIndex={active ? 0 : -1}
                  className={cn("relative inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] font-bold transition-colors", active ? "text-snow" : "text-ink/75 hover:text-ink")}
                >
                  {active && <motion.span layoutId={`${uid}-filter`} className="absolute inset-0 rounded-full bg-ink" transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.4 }} />}
                  {f !== "all" && <span aria-hidden="true" className={cn("relative size-2 rounded-full", f === "pizzeria" ? "bg-oven" : "bg-ember")} />}
                  <span className="relative">{f === "all" ? UI.all[lang] : f === "pizzeria" ? UI.pizzaFilter[lang] : UI.grillFilter[lang]}</span>
                </button>
              );
            })}
          </div>
          <label className="relative ml-auto flex min-w-[min(100%,300px)] flex-1 items-center sm:max-w-[360px]">
            <span className="sr-only">{UI.search[lang]}</span>
            <SearchIcon className="pointer-events-none absolute left-4 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={UI.searchPlaceholder[lang]}
              className="h-12 w-full rounded-full border-2 border-ink/12 bg-white pl-11 pr-4 text-[16px] placeholder:text-muted/80 focus:border-ink"
            />
          </label>
        </div>
      )}
      {!only && (
        <p className="mt-3 text-sm text-muted" aria-live="polite">
          {fill(count === 1 ? UI.resultsOne[lang] : UI.results[lang], { n: count })} · {UI.pricesChf[lang]}
          {query && (
            <button type="button" onClick={() => setQuery("")} className="ml-2 font-semibold text-ink underline underline-offset-4">
              {UI.clear[lang]}
            </button>
          )}
        </p>
      )}
      {!only && sections.length > 1 && <SectionTabs sections={sections} />}
      {count === 0 && <p className="mt-10 rounded-2xl bg-white p-6 text-lg">{fill(UI.noResults[lang], { q: query })}</p>}
      <LayoutGroup>
        <div className={cn("grid gap-14", compact ? "mt-8" : "mt-10")}>
          <AnimatePresence initial={false} mode="popLayout">
            {sections.map((s) => (
              <motion.section
                key={s.id}
                id={only ? undefined : `karte-${s.id}`}
                aria-labelledby={`${uid}-${s.id}`}
                layout={reduce ? false : "position"}
                initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(20px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="scroll-mt-[calc(var(--header-h)+var(--label-h)+80px)]"
              >
                <SectionBlock section={s} headingId={`${uid}-${s.id}`} />
              </motion.section>
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>
    </div>
  );
}

/** Sticky tabs that follow the scroll; a click jumps to the section. */
function SectionTabs({ sections }: { sections: Section[] }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(sections[0]?.id);
  const bar = useRef<HTMLDivElement>(null);
  const ids = sections.map((s) => s.id).join(",");
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(`karte-${s.id}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id.replace("karte-", ""));
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);
  useEffect(() => {
    bar.current?.querySelector<HTMLElement>(`[data-id="${active}"]`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);
  return (
    <nav aria-label={UI.sections[lang]} className="sticky z-30 -mx-4 mt-6 bg-snow/92 px-4 py-2 backdrop-blur-md md:-mx-8 md:px-8" style={{ top: "calc(var(--label-h) + 64px)" }}>
      <div ref={bar} className="no-scrollbar flex gap-1 overflow-x-auto">
        {sections.map((s) => (
          <a
            key={s.id}
            data-id={s.id}
            href={`#karte-${s.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(`karte-${s.id}`)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
              setActive(s.id);
            }}
            aria-current={active === s.id ? "true" : undefined}
            className={cn("relative inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-[15px] font-semibold", active === s.id ? "text-ink" : "text-ink/65 hover:text-ink")}
          >
            {active === s.id && <motion.span layoutId="menu-tab" className="absolute inset-x-3 bottom-1 h-[3px] rounded-full bg-brand" transition={reduce ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.4 }} />}
            {s.title[lang]}
          </a>
        ))}
      </div>
    </nav>
  );
}

function SectionBlock({ section, headingId }: { section: Section; headingId: string }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const venueLabel = section.venue === "pizzeria" ? UI.venuePizzeria[lang] : section.venue === "oasis" ? UI.venueOasis[lang] : UI.venueBoth[lang];
  return (
    <>
      <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-3">
        <h3 id={headingId} className="font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-none">
          {section.title[lang]}
          {section.isNew && <span className="ml-3 inline-block -translate-y-1 rounded-full bg-oven px-2.5 py-1 align-middle text-xs font-bold uppercase tracking-wider text-snow">{UI.newBadge[lang]}</span>}
        </h3>
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-muted">
          <span aria-hidden="true" className={cn("size-2 rounded-full", VENUE_DOT[section.venue])} />
          {venueLabel}
        </span>
      </div>
      {section.note && <p className="mt-3 inline-block rounded-full bg-beak/30 px-4 py-1.5 text-[15px] font-semibold">{section.note[lang]}</p>}
      <ul className="mt-2">
        {section.items.map((d, i) => (
          <motion.li
            key={d.name}
            layout={reduce ? false : "position"}
            initial={reduce ? false : { opacity: 0, transform: "translateY(12px)" }}
            whileInView={{ opacity: 1, transform: "translateY(0px)" }}
            viewport={{ once: true, margin: "0px 0px -5% 0px" }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.4), ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-ink/10"
          >
            <DishRow dish={d} />
          </motion.li>
        ))}
      </ul>
    </>
  );
}

function DishRow({ dish }: { dish: Dish }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const id = useId();
  const desc = dish.desc[lang];
  const price = dish.sizes ? dish.sizes.map((s) => chf(s.price)).join(" · ") : chf(dish.price);
  return (
    <div>
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} className="group grid w-full gap-1 py-4 text-left">
        <span className="flex items-baseline gap-3">
          <span className="font-display text-xl font-semibold leading-tight md:text-2xl" lang="de-CH">
            {dish.name}
          </span>
          {dish.hot && (
            <span className="inline-flex translate-y-0.5 items-center text-oven" title={UI.hot[lang]}>
              <ChiliIcon />
              <span className="sr-only">{UI.hot[lang]}</span>
            </span>
          )}
          {dish.tip && <span className="rounded-full bg-oven px-2 py-0.5 text-xs font-bold uppercase text-snow">{UI.tipBadge[lang]}</span>}
          <span aria-hidden="true" className="leader" />
          <span className="whitespace-nowrap text-right font-semibold tabular-nums">{price}</span>
        </span>
        {desc && <span className={cn("max-w-[70ch] text-[16px] leading-snug text-muted", !open && "line-clamp-1")}>{desc}</span>}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-4 pb-5 sm:grid-cols-[1fr_auto]">
              <div className="grid content-start gap-3">
                {dish.extra && <p className="max-w-[70ch] text-[16px] leading-snug">{dish.extra[lang]}</p>}
                {dish.sizes && (
                  <ul className="grid max-w-[520px] gap-1">
                    {dish.sizes.map((s) => (
                      <li key={s.price} className="flex items-baseline gap-3 text-[16px]">
                        <span>{s.label[lang]}</span>
                        <span aria-hidden="true" className="leader" />
                        <span className="whitespace-nowrap font-semibold tabular-nums">{chf(s.price)}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {!dish.extra && !dish.sizes && !dish.photo && <p className="text-[16px] text-muted">{desc || dish.name}</p>}
              </div>
              {dish.photo && <img src={photo(dish.photo, true)} alt={photoAlt(dish.photo, lang)} loading="lazy" className="h-40 w-full rounded-2xl object-cover sm:w-60" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
