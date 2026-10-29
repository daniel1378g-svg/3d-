// The wine map: an original map of Portugal with the nine regions of the list (and a Champagne chip off the
// map), a red / rosé / white toggle with a sliding gold pill, a search, and the wines of the chosen region.
// The regions are also a list of buttons beside the map (arrow keys move between them).
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { COLOURS, MAP_REGIONS, PORTUGAL_PATH, REGIONS, WINE_NOTES, WINES, wineDetails, wineExtra, type ColourId, type Wine } from "@/content/vins";
import { cn, fold } from "@/lib/utils";
import { IconSearch } from "./icons";

const COLOUR_LABEL: Record<ColourId, "red" | "rose" | "white"> = { tinto: "red", rosado: "rose", branco: "white" };
const KEYS = ["minho", "tras-os-montes", "douro", "dao", "bairrada", "ribatejo", "palmela", "setubal", "alentejo", "champagne"];
const regionLabel = (key: string) => (key === "champagne" ? "Champagne" : MAP_REGIONS.find((r) => r.key === key)?.label ?? key);

export function WineCard({ w, lang }: { w: Wine; lang: Lang }) {
  const tone = COLOURS.find((c) => c.id === w.colour)!.tone;
  return (
    <article className="relative flex h-full flex-col rounded-[18px] bg-branco/[0.06] p-5 shadow-[inset_0_0_0_1px_rgba(207,224,234,0.16)]">
      <span aria-hidden="true" className="absolute right-5 top-5 h-3.5 w-3.5 rounded-full shadow-[0_0_0_3px_rgba(255,250,242,0.12)]" style={{ background: tone }} />
      <p className="eyebrow text-dourado">{w.regionName}</p>
      <h3 lang="pt-PT" className="dish-name mt-2 pr-6 font-display text-[22px] font-bold uppercase leading-[1.02]">
        {w.name}
      </h3>
      <p className="mt-1 text-[15px] text-espuma">{w.producer}</p>
      <p className="mt-3 flex-1 text-[15px] leading-snug text-branco/85">
        {wineDetails(w, lang)}
        {w.extra && <span className="ml-1 text-espuma">· {wineExtra(w, lang)}</span>}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-dourado px-3 py-1 font-display text-[15px] font-bold text-tinta">{w.abv}</span>
        {w.notes.map((n) => (
          <span key={n} className="rounded-full bg-branco/10 px-3 py-1 font-display text-[13px] font-semibold uppercase tracking-[0.1em]">
            {WINE_NOTES[n][lang]}
          </span>
        ))}
      </div>
    </article>
  );
}

export function WineExplorer({ large = false, onRegion }: { large?: boolean; onRegion?: (key: string | null) => void }) {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const [colour, setColour] = useState<ColourId>("tinto");
  const [region, setRegion] = useState<string | null>("douro");
  const [query, setQuery] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const has = (key: string, c: ColourId) => REGIONS.some((r) => r.key === key && r.colour === c);
  const q = fold(query.trim());
  const shown = useMemo(() => {
    if (q) return WINES.filter((w) => fold(`${w.name} ${w.producer}`).includes(q));
    return WINES.filter((w) => w.colour === colour && (!region || REGIONS.find((r) => r.id === w.region)!.key === region));
  }, [q, colour, region]);
  const counts = COLOURS.map((c) => WINES.filter((w) => w.colour === c.id).length);

  const pick = (key: string | null) => {
    setRegion(key);
    setQuery("");
    onRegion?.(key);
    // a region without wines of the current colour switches to a colour it has
    if (key && !has(key, colour)) {
      const c = COLOURS.find((x) => has(key, x.id));
      if (c) setColour(c.id);
    }
  };

  return (
    <div className={cn("grid gap-10", large ? "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" : "lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)]")}>
      {/* the map and the region buttons */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:gap-6">
        <svg viewBox="0 0 360 690" className="w-full max-w-[340px] overflow-visible" aria-hidden="true">
          <path d={PORTUGAL_PATH} fill="rgba(255,250,242,0.06)" stroke="rgba(207,224,234,0.45)" strokeWidth="2" strokeLinejoin="round" />
          {MAP_REGIONS.map((r) => {
            const on = region === r.key;
            const dim = !has(r.key, colour);
            return (
              <g
                key={r.key}
                onClick={() => pick(on ? null : r.key)}
                className="cursor-pointer"
                style={{ opacity: dim && !on ? 0.28 : 1, transition: "opacity .3s" }}
              >
                <motion.ellipse
                  cx={r.x}
                  cy={r.y}
                  rx={r.rx}
                  ry={r.ry}
                  animate={{ y: on && !reduce ? -6 : 0, fill: on ? "#F2C05A" : "rgba(207,224,234,0.18)", stroke: on ? "#FFFAF2" : "rgba(207,224,234,0.5)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  strokeWidth={on ? 2.5 : 1.5}
                  style={{ filter: on ? "drop-shadow(0 10px 10px rgba(0,0,0,.45))" : undefined }}
                />
                <text x={r.lx ?? r.x} y={(r.ly ?? r.y) + 5} textAnchor={r.anchor ?? "middle"} fontFamily="Barlow Condensed" fontWeight="700" fontSize="17" letterSpacing="1.5" fill={on ? "#F2C05A" : "#CFE0EA"} style={{ textTransform: "uppercase", pointerEvents: "none" }}>
                  {r.label.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
        <div role="group" aria-label={UI.regions[lang]} className="flex flex-col gap-1.5" onKeyDown={(e) => {
          if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
          const items = [...(e.currentTarget.querySelectorAll<HTMLButtonElement>("button"))];
          const i = items.indexOf(document.activeElement as HTMLButtonElement);
          const next = items[(i + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + items.length) % items.length];
          next.focus();
          e.preventDefault();
        }}>
          <button type="button" aria-pressed={region === null} tabIndex={region === null ? 0 : -1} onClick={() => pick(null)} className={cn("rounded-full px-3 py-1.5 text-left font-display text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors", region === null ? "bg-dourado text-tinta" : "text-espuma hover:bg-branco/10")}>
            {UI.allRegions[lang]}
          </button>
          {KEYS.map((key) => {
            const on = region === key;
            const dim = !has(key, colour);
            return (
              <button
                key={key}
                type="button"
                aria-pressed={on}
                tabIndex={on ? 0 : -1}
                onClick={() => pick(on ? null : key)}
                className={cn("rounded-full px-3 py-1.5 text-left font-display text-[14px] font-semibold uppercase tracking-[0.1em] transition-[background-color,color,opacity]", on ? "bg-dourado text-tinta" : "text-branco hover:bg-branco/10", dim && !on && "opacity-60", key === "champagne" && "mt-3 shadow-[inset_0_0_0_1.5px_rgba(207,224,234,0.4)]")}
              >
                {regionLabel(key)}
                {key === "champagne" && <span className="block text-[11px] font-medium normal-case tracking-[0.06em] text-espuma">{UI.outsidePortugal[lang]}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* toggle, search and cards */}
      <div>
        <div className="flex flex-wrap items-center gap-3">
          <div role="group" aria-label={`${UI.red[lang]} / ${UI.rose[lang]} / ${UI.white[lang]}`} className="inline-flex rounded-full bg-branco/10 p-1">
            {COLOURS.map((c, i) => (
              <button key={c.id} type="button" aria-pressed={colour === c.id && !q} onClick={() => (setColour(c.id), setQuery(""))} className={cn("relative rounded-full px-4 py-2.5 font-display text-[15px] font-semibold uppercase tracking-[0.1em]", colour === c.id && !q ? "text-tinta" : "text-branco")}>
                {colour === c.id && !q && <motion.span layoutId={large ? "colour-pill-lg" : "colour-pill"} className="absolute inset-0 rounded-full bg-dourado" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
                <span className="relative">
                  {UI[COLOUR_LABEL[c.id]][lang]} <span className="opacity-75">{counts[i]}</span>
                </span>
              </button>
            ))}
          </div>
          <label className="relative min-w-[200px] flex-1">
            <span className="sr-only">{UI.searchWine[lang]}</span>
            <IconSearch size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-espuma" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={UI.searchWine[lang]}
              className="h-12 w-full rounded-full bg-branco/10 pl-11 pr-4 text-branco placeholder:text-espuma/70 focus:bg-branco/15"
            />
          </label>
        </div>
        <p aria-live="polite" className="mt-5 font-display text-[15px] font-semibold uppercase tracking-[0.14em] text-espuma">
          <span className="text-dourado">{shown.length}</span> {shown.length === 1 ? UI.wine[lang] : UI.wines[lang]}
          {!q && region && ` · ${regionLabel(region)}`}
          {!q && ` · ${UI[COLOUR_LABEL[colour]][lang]}`}
        </p>
        <div ref={listRef} className={cn("mt-4 grid gap-3 sm:grid-cols-2", !large && "max-h-[640px] overflow-y-auto pr-1 [scrollbar-color:rgba(207,224,234,.3)_transparent]")}>
          <AnimatePresence initial={false} mode="popLayout">
            {shown.length ? (
              shown.map((w) => (
                <motion.div key={w.id} layout={!reduce} initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <WineCard w={w} lang={lang} />
                </motion.div>
              ))
            ) : (
              <motion.p key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full rounded-[18px] bg-branco/5 p-6 text-espuma">
                {q ? UI.noResult[lang] : UI.noWineColour[lang]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
