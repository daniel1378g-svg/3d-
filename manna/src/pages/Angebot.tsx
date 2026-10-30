// The whole range on one page: category navigation that follows the scroll, a search over names, localized texts
// and named flavours, every product with its published variants and notes, the source and date – and no prices,
// because Manna publishes none. Below, the gallery-only specialities, clearly marked as not confirmed.
import { useEffect, useMemo, useRef, useState } from "react";
import assets from "@content/assets.json";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { CATEGORIES, GALLERY_ONLY, PRODUCTS, searchProducts } from "@/content/products";
import { URLS } from "@/content/facts";
import { scrollTo } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/PageHero";
import { Img } from "@/components/Img";
import { ProductCard } from "@/components/home/Explorer";
import { IconExternal } from "@/components/icons";

const CAPTION = Object.fromEntries((assets as { assets: { id: string; caption: string | null }[] }).assets.map((a) => [a.id, a.caption]));
const SKIN = { acai: "bg-plum text-cream", bowls: "bg-berry text-cream", drinks: "bg-lime text-ink", waffles: "bg-waffle text-ink" } as const;

export function Angebot() {
  const { t } = useSite();
  const r = t.range;
  const [q, setQ] = useState("");
  const [active, setActive] = useState<string>(CATEGORIES[0]);
  const bar = useRef<HTMLDivElement>(null);
  const hits = useMemo(() => searchProducts(q, (p) => `${t.products.items[p.id].label} ${t.products.items[p.id].desc} ${(p.variants ?? []).map((v) => t.products.variants[v]).join(" ")}`), [q, t]);
  const ids = new Set(hits.map((p) => p.id));

  useEffect(() => {
    const els = CATEGORIES.map((c) => document.getElementById(`cat-${c}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver((es) => { for (const e of es) if (e.isIntersecting) setActive(e.target.id.slice(4)); }, { rootMargin: "-30% 0px -60% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [q]);

  return (
    <>
      <PageHero kicker={r.kicker} title={r.title} lead={r.lead} image="header-bowls" />
      <div className="skin-cream sticky z-[700] border-b border-ink/10 py-3" style={{ top: "var(--label-h)" }}>
        <div className="gutter">
          <div className="wrap flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div ref={bar} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pt-[calc(var(--header-h)-8px)] md:pt-0" role="navigation" aria-label={t.explorer.categoryLabel}>
              {CATEGORIES.map((c) => (
                <button key={c} type="button" className="chip shrink-0 text-ink" aria-pressed={active === c} aria-current={active === c ? "true" : undefined}
                  onClick={() => { const el = document.getElementById(`cat-${c}`); if (el) scrollTo(el); }}>
                  {t.explorer.categories[c]}
                </button>
              ))}
            </div>
            <label className="block md:w-[320px]">
              <span className="sr-only">{r.search}</span>
              <input type="search" className="field min-h-[44px] py-2 text-ink" placeholder={r.searchPlaceholder} value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
          </div>
        </div>
      </div>
      <section className="skin-cream pb-24 pt-10" aria-label={r.title}>
        <div className="gutter">
          <div className="wrap">
            <p className="text-sm text-ink/80" aria-live="polite">{q.trim() ? (hits.length ? fill(r.results, { n: hits.length }) : fill(r.noResults, { q: q.trim() })) : r.noPrices}</p>
            {CATEGORIES.map((c) => {
              const list = PRODUCTS.filter((p) => p.category === c && ids.has(p.id));
              if (!list.length) return null;
              return (
                <section key={c} id={`cat-${c}`} className="mt-14 scroll-mt-40" aria-labelledby={`h-${c}`}>
                  <h2 id={`h-${c}`} className="display text-[clamp(2.8rem,6vw,5.6rem)] text-plum">{t.explorer.categories[c]}</h2>
                  <ul className="mt-6 grid gap-4 md:grid-cols-2">
                    {list.map((p) => (
                      <li key={p.id} className={cn("grid gap-5 overflow-hidden rounded-[var(--radius-card)] p-5 sm:grid-cols-[150px_1fr]", SKIN[c])}>
                        {p.images[0] ? (
                          <Img id={p.images[0]} sizes="150px" className="aspect-[4/5] w-full max-w-[200px] rounded-[20px] ring-2 ring-cream/70" />
                        ) : (
                          <div className="grid aspect-[4/5] w-full max-w-[200px] place-items-center rounded-[20px] bg-current/10 p-3 text-center text-xs opacity-90">{t.explorer.noPhoto}</div>
                        )}
                        <ProductCard id={p.id} compact />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
            <section className="mt-20 rounded-[var(--radius-xl2)] bg-lilac-2 p-6 md:p-10" aria-labelledby="h-gallery-only">
              <h2 id="h-gallery-only" className="display text-[clamp(2.4rem,5vw,4.4rem)] text-plum">{r.galleryOnlyTitle}</h2>
              <p className="mt-3 max-w-[50rem] text-ink/85">{r.galleryOnlyNote}</p>
              <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {GALLERY_ONLY.map((id) => (
                  <li key={id}>
                    <Img id={id} sizes="(min-width: 1024px) 18vw, 45vw" className="aspect-square w-full rounded-[20px]" />
                    <p className="mt-2 font-display font-bold text-plum" lang="pt-BR">{CAPTION[id]}</p>
                  </li>
                ))}
              </ul>
            </section>
            <p className="mt-8 text-sm text-ink/80">{r.source} <a className="link-u" href={URLS.range} target="_blank" rel="noopener">manna-acai.ch<IconExternal size={13} className="ml-1 inline" /><span className="sr-only"> {t.a11y.newTab}</span></a></p>
          </div>
        </div>
      </section>
    </>
  );
}
