import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { HTML_LANG, UI, fill, type Lang, type Localized, type PageKey } from "@/i18n";
import { chf, descIn, nameIn, sectionsOf, type Menu, type MenuGroup, type MenuItem } from "@/content";
import { useSite } from "@/site";
import { cn, img } from "@/lib/utils";
import { PdfButton } from "@/components/PdfButton";
import { SiteLink } from "@/components/SiteLink";
import { LottieIcon } from "@/lottie/LottieIcon";
import type { IconName } from "@/lottie/icons";

const PAGE: Record<Exclude<PageKey, "home">, { title: Localized; dl: Localized; icon: IconName; band: string }> = {
  plats: { title: UI.titlePlats, dl: UI.dlPlats, icon: "flame", band: "bg-night" },
  vins: { title: UI.titleVins, dl: UI.dlVins, icon: "wine", band: "bg-wine" },
  desserts: { title: UI.titleDesserts, dl: UI.dlDesserts, icon: "icecream", band: "bg-azulejo" },
};
const PHOTO: Record<string, string> = {
  "terra-e-mar": "plat-terra-e-mar",
  francesinha: "cat-francesinha",
  polvo: "cat-poissons",
  "bacalhau-grelhado": "plat-bacalhau-grelhado",
  "bacalhau-braz": "plat-bacalhau-braz",
  "porco-alentejana": "cat-viandes",
};
const photoOf = (item: MenuItem) => (item.photo ? PHOTO[item.photo] ?? `dessert-${item.photo}` : null);

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
function matches(item: MenuItem, q: string) {
  const hay = [...Object.values(item.name), ...(item.desc ? Object.values(item.desc) : []), item.region ?? "", item.grapes ?? ""].join(" ");
  return fold(hay).includes(q);
}

// Lines fade up in a short stagger; the whole group takes 0.4 s at most.
const list: Variants = { hidden: {}, shown: {} };
const line: Variants = {
  hidden: { opacity: 0, transform: "translateY(8px)" },
  shown: (i: number) => ({ opacity: 1, transform: "translateY(0px)", transition: { duration: 0.2, delay: Math.min(i * 0.02, 0.2) } }),
};

function Price({ item, lang }: { item: MenuItem; lang: Lang }) {
  return (
    <span className="flex shrink-0 flex-wrap justify-end gap-x-3 gap-y-0.5 text-right font-bold tabular-nums">
      {item.prices.map((p, k) => (
        <span key={k} className="whitespace-nowrap">
          {item.priceLabels?.[k] && <span className="mr-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">{item.priceLabels[k][lang]}</span>}
          <span className="text-gold-ink">{chf(p)}</span>
        </span>
      ))}
    </span>
  );
}

function Line({ item, lang, index }: { item: MenuItem; lang: Lang; index: number }) {
  const reduce = useReducedMotion();
  const name = nameIn(item, lang);
  const desc = descIn(item, lang);
  const photo = photoOf(item);
  const frName = item.name.fr !== name && lang !== "fr" ? item.name.fr : null;
  return (
    <motion.li variants={reduce ? undefined : line} custom={index} className="flex gap-4 border-b border-ink/10 py-4 last:border-0">
      {photo && <img src={img(photo)} alt="" loading="lazy" className="mt-1 h-16 w-16 shrink-0 rounded-full object-cover ring-4 ring-tile-2 md:h-20 md:w-20" />}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 sm:flex-nowrap">
          <h3 className="min-w-0 basis-full font-sans sm:basis-auto text-[17px] font-bold leading-snug text-night" lang={item.name[lang] ? HTML_LANG[lang] : item.name.pt ? "pt-PT" : "fr"}>
            {name}
            {item.pdfOnly && (
              <abbr title={UI.pdfOnlyTitle[lang]} className="ml-2 rounded bg-gold/25 px-1.5 py-0.5 align-middle text-[11px] font-bold tracking-wider text-gold-ink no-underline">
                {UI.pdfOnly[lang]}
              </abbr>
            )}
          </h3>
          <span aria-hidden="true" className="leader hidden text-ink sm:block" />
          <span className="sm:ml-0">
            <Price item={item} lang={lang} />
          </span>
        </div>
        {frName && (
          <p className="text-sm text-ink-soft">
            {UI.frenchName[lang]} <span lang="fr">{frName}</span>
          </p>
        )}
        {desc && <p className="mt-1 max-w-[62ch] text-[15px] text-ink-soft">{desc}</p>}
        {(item.region || item.grapes) && (
          <p className="mt-1 text-sm text-ink-soft">
            {item.region && <span className="mr-2 inline-block rounded-full bg-azulejo-soft px-2 py-0.5 text-xs font-bold text-azulejo">{item.region}</span>}
            {item.grapes}
          </p>
        )}
        {item.notes?.map((n, k) => (
          <p key={k} className="mt-1 text-sm font-semibold italic text-red">{n[lang]}</p>
        ))}
      </div>
    </motion.li>
  );
}

function Group({ group, lang, query }: { group: MenuGroup; lang: Lang; query: string }) {
  const reduce = useReducedMotion();
  const sections = sectionsOf(group)
    .map((s) => ({ ...s, items: query ? s.items.filter((i) => matches(i, query)) : s.items }))
    .filter((s) => s.items.length || (!query && group.winesFromPdf));
  if (!sections.length && !(group.winesFromPdf && !query)) return null;
  let n = 0;
  return (
    <section id={group.id} data-group={group.id} className="scroll-mt-40">
      <header className="mb-2 flex flex-wrap items-end justify-between gap-2 border-b-2 border-night pb-3">
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-none text-night">{group.title[lang]}</h2>
        {group.note && <p className="font-display text-lg italic text-azulejo">{group.note[lang]}</p>}
      </header>
      {group.winesFromPdf && !query && (
        <div className="my-5 rounded-2xl bg-wine p-5 text-tile">
          <ul className="flex flex-wrap gap-2">
            {group.winesFromPdf.map((w) => (
              <li key={w} className="rounded-full bg-tile/10 px-3 py-1 text-sm font-semibold ring-1 ring-tile/20">{w}</li>
            ))}
          </ul>
          <p className="mt-4 flex flex-wrap items-center gap-3 text-sm">
            <span className="text-tile/80">{UI.winesInList[lang]}</span>
            <SiteLink page="vins" className="font-bold text-gold underline-offset-4 hover:underline">{UI.seeVins[lang]} →</SiteLink>
          </p>
        </div>
      )}
      {sections.map((s) => (
        <div key={s.id} id={s.title ? s.id : undefined} className="scroll-mt-40">
          {s.title && <h3 className="mb-1 mt-7 text-xs font-extrabold uppercase tracking-[0.18em] text-red">{s.title[lang]}</h3>}
          <motion.ul variants={reduce ? undefined : list} initial={reduce ? false : "hidden"} whileInView="shown" viewport={{ once: true, amount: 0.05 }}>
            {s.items.map((item) => (
              <Line key={item.id} item={item} lang={lang} index={n++} />
            ))}
          </motion.ul>
        </div>
      ))}
    </section>
  );
}

export function MenuPage({ page, menu }: { page: Exclude<PageKey, "home">; menu: Menu }) {
  const { lang } = useSite();
  const meta = PAGE[page];
  const [raw, setRaw] = useState("");
  const query = fold(raw.trim());
  const [active, setActive] = useState(menu.groups[0].id);
  const bar = useRef<HTMLDivElement>(null);
  const underline = useRef<HTMLSpanElement>(null);

  const visible = useMemo(
    () => menu.groups.filter((g) => !query || sectionsOf(g).some((s) => s.items.some((i) => matches(i, query)))),
    [menu, query],
  );
  const count = useMemo(() => (query ? visible.flatMap((g) => sectionsOf(g).flatMap((s) => s.items)).filter((i) => matches(i, query)).length : 0), [visible, query]);

  // Scrollspy: the tab of the group under the sticky bar is active.
  useEffect(() => {
    const groups = [...document.querySelectorAll<HTMLElement>("[data-group]")];
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top) setActive((top.target as HTMLElement).dataset.group!);
      },
      { rootMargin: "-180px 0px -60% 0px" },
    );
    groups.forEach((g) => io.observe(g));
    return () => io.disconnect();
  }, [visible, lang]);

  // The underline slides with transform only, and the active tab stays in view inside the bar.
  useLayoutEffect(() => {
    const tab = bar.current?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    const u = underline.current;
    if (!tab || !u) return;
    u.style.transform = `translateX(${tab.offsetLeft}px) scaleX(${tab.offsetWidth / 100})`;
    const b = bar.current!;
    const left = tab.offsetLeft - b.clientWidth / 2 + tab.offsetWidth / 2;
    b.scrollTo({ left, behavior: "smooth" });
  }, [active, visible, lang]);

  const jump = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };
  const others = (["plats", "vins", "desserts"] as const).filter((p) => p !== page);

  return (
    <>
      <section className={cn("tile-texture tile-texture--night gutter py-14 text-tile md:py-20", meta.band)}>
        <div className="wrap flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-tile">
              <LottieIcon name={meta.icon} size={46} color={page === "vins" ? "#6e1e2e" : "#1d4e9e"} accent="#b80601" />
            </span>
            <h1 className="font-display text-[clamp(2.8rem,7vw,5.6rem)] font-semibold leading-[0.95] tracking-[-0.02em]">{meta.title[lang]}</h1>
            <p className="mt-4 text-tile/75">{UI.pricesNote[lang]}</p>
            {menu.note && <p className="mt-2 max-w-2xl text-tile/90">{menu.note[lang]}</p>}
          </div>
          <PdfButton tone="dark" lang={lang} href={menu.pdf} label={meta.dl[lang]} />
        </div>
      </section>

      <div className="sticky z-[150] border-b border-ink/10 bg-tile/95 backdrop-blur-md" style={{ top: "calc(var(--label-h) + var(--header-h) - 8px)" }}>
        <div className="gutter">
          <div className="wrap flex flex-col gap-2 py-2 md:flex-row md:items-center md:gap-6">
            <nav aria-label={UI.categories[lang]} className="relative min-w-0 flex-1">
              <div ref={bar} className="no-scrollbar relative flex gap-1 overflow-x-auto">
                {visible.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    data-tab={g.id}
                    aria-current={active === g.id ? "true" : undefined}
                    onClick={() => jump(g.id)}
                    className={cn("shrink-0 whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm font-bold transition-colors", active === g.id ? "text-azulejo" : "text-ink-soft hover:text-ink")}
                  >
                    {g.title[lang]}
                  </button>
                ))}
                <span
                  ref={underline}
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-[100px] origin-left rounded-full bg-red transition-transform duration-300 ease-out-expo"
                />
              </div>
            </nav>
            <label className="relative block md:w-72">
              <span className="sr-only">{UI.search[lang]}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                id={`search-${page}`}
                type="search"
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
                placeholder={UI.searchPlaceholder[lang]}
                className="h-11 w-full rounded-full border border-ink/15 bg-white/70 pl-10 pr-4 text-[15px] text-ink placeholder:text-ink-soft/80 focus:border-azulejo focus:outline-none"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="tile-texture gutter bg-tile py-12">
        <div className="wrap grid gap-16">
          {query && (
            <p role="status" className="flex flex-wrap items-center gap-3 text-ink-soft">
              {count ? fill(count === 1 ? UI.resultsOne[lang] : UI.results[lang], { n: count }) : fill(UI.noResults[lang], { q: raw.trim() })}
              <button type="button" onClick={() => setRaw("")} className="rounded-full border border-ink/15 px-3 py-1 text-sm font-bold text-ink hover:border-azulejo">
                {UI.clear[lang]}
              </button>
            </p>
          )}
          <div className="mx-auto grid w-full max-w-4xl gap-16">
            {menu.groups.map((g) => (
              <Group key={g.id} group={g} lang={lang} query={query} />
            ))}
          </div>
          <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center gap-3 border-t border-ink/10 pt-10">
            <PdfButton lang={lang} href={menu.pdf} label={meta.dl[lang]} />
            <span className="mx-2 hidden h-6 w-px bg-ink/15 sm:block" />
            <p className="w-full text-xs font-bold uppercase tracking-[0.16em] text-ink-soft sm:w-auto">{UI.otherMenus[lang]}</p>
            {others.map((p) => (
              <SiteLink key={p} page={p} className="inline-flex min-h-11 items-center rounded-full bg-night px-5 text-sm font-bold text-tile hover:bg-azulejo">
                {p === "plats" ? UI.seePlats[lang] : p === "vins" ? UI.seeVins[lang] : UI.seeDesserts[lang]}
              </SiteLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
