import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { UI, fill } from "@/i18n";
import { VINS, type MenuSection } from "@/content";
import { PORTUGAL } from "@/data/portugal";
import { useSite } from "@/site";
import { cn } from "@/lib/utils";
import { LottieIcon } from "@/lottie/LottieIcon";
import { SiteLink } from "../SiteLink";
import { PdfButton } from "../PdfButton";

type RegionId = keyof typeof PORTUGAL.regions;
const ORDER: RegionId[] = ["verde", "douro", "dao", "setubal", "alentejo"];
const portugal = VINS.groups.find((g) => g.id === "portugal")!;
const sectionsFor = (r: RegionId): MenuSection[] => (portugal.sections ?? []).filter((s) => s.map === r);
const countFor = (r: RegionId) => sectionsFor(r).reduce((n, s) => n + s.items.length, 0);

/** "Variété de vins…": a schematic map of Portugal whose regions jump to their part of the wine list. */
export function WineSection() {
  const { lang, go } = useSite();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<RegionId | null>(null);
  const clip = useId().replace(/:/g, "");
  const open = (r: RegionId) => go("vins", sectionsFor(r)[0]?.id);
  const label = (r: RegionId) => `${PORTUGAL.regions[r].label} · ${fill(countFor(r) === 1 ? UI.wineCountOne[lang] : UI.wineCount[lang], { n: countFor(r) })}`;

  return (
    <section id="vins" className="gutter py-3 md:py-5">
      <div className="wrap panel grid items-center gap-12 overflow-hidden px-6 py-16 md:px-14 md:py-20 lg:grid-cols-[1fr_minmax(0,420px)]">
        <div data-reveal className="min-w-0">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-green">
              <LottieIcon name="wine" size={42} color="#ffcc00" accent="#ffffff" />
            </span>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red">{UI.navVins[lang]}</p>
          </div>
          <h2 className="max-w-2xl font-display text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.015em] text-green">{UI.winesLine[lang]}</h2>
          <p className="mt-5 max-w-lg text-ink-soft">{UI.wineMapHint[lang]}</p>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {ORDER.map((r) => (
              <li key={r}>
                <button
                  type="button"
                  onClick={() => open(r)}
                  onPointerEnter={() => setActive(r)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(r)}
                  onBlur={() => setActive(null)}
                  className={cn("flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-colors", active === r ? "border-green bg-green-soft" : "border-ink/15 hover:border-red")}
                >
                  <span className="font-display text-lg font-semibold text-ink">{PORTUGAL.regions[r].label}</span>
                  <span className="text-sm font-semibold text-ink-soft tabular-nums">{fill(countFor(r) === 1 ? UI.wineCountOne[lang] : UI.wineCount[lang], { n: countFor(r) })}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap gap-3">
            <SiteLink page="vins" className="inline-flex min-h-12 items-center rounded-full bg-red px-6 text-[15px] font-bold text-white hover:bg-red-deep">{UI.seeVins[lang]}</SiteLink>
            <PdfButton lang={lang} href={VINS.pdfHome!} label={UI.dlVins[lang]} />
          </div>
        </div>

        <figure data-reveal className="relative mx-auto w-full max-w-[360px]">
          <svg viewBox={PORTUGAL.viewBox} role="group" aria-label={UI.wineMapTitle[lang]} className="h-auto w-full overflow-visible">
            <defs>
              <clipPath id={clip}>
                <path d={PORTUGAL.outline} />
              </clipPath>
            </defs>
            <path d={PORTUGAL.outline} fill="#f4f7f4" stroke="rgba(31,31,31,0.45)" strokeWidth="1.5" strokeLinejoin="round" />
            <g clipPath={`url(#${clip})`}>
              {ORDER.map((r) => (
                <motion.path
                  key={r}
                  d={PORTUGAL.regions[r].d}
                  role="link"
                  tabIndex={0}
                  aria-label={label(r)}
                  onClick={() => open(r)}
                  onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), open(r))}
                  onPointerEnter={() => setActive(r)}
                  onPointerLeave={() => setActive(null)}
                  onFocus={() => setActive(r)}
                  onBlur={() => setActive(null)}
                  className="cursor-pointer outline-none"
                  initial={false}
                  animate={{ fill: active === r ? "#006600" : "rgba(0,102,0,0.2)", opacity: active && active !== r ? 0.55 : 1 }}
                  transition={{ duration: reduce ? 0 : 0.25 }}
                  stroke={active === r ? "#ffffff" : "rgba(0,102,0,0.5)"}
                  strokeWidth={active === r ? 2 : 1}
                />
              ))}
            </g>
            {ORDER.map((r) => {
              const { x, y } = PORTUGAL.regions[r];
              return (
                <g key={r} pointerEvents="none" className="font-sans">
                  <circle cx={x} cy={y} r={active === r ? 5 : 3.5} fill={active === r ? "#ffcc00" : "#006600"} />
                  <text x={x + 9} y={y + 4} fontSize="13" fontWeight="800" fill="#1f1f1f" stroke="#ffffff" strokeWidth="3" paintOrder="stroke">
                    {PORTUGAL.regions[r].label.split(" · ")[0]}
                  </text>
                </g>
              );
            })}
            {(["porto", "lisboa"] as const).map((c) => (
              <g key={c} pointerEvents="none">
                <rect x={PORTUGAL.cities[c][0] - 2.5} y={PORTUGAL.cities[c][1] - 2.5} width="5" height="5" fill="#1f1f1f" />
                <text x={PORTUGAL.cities[c][0] - 8} y={PORTUGAL.cities[c][1] + 4} textAnchor="end" fontSize="11" fontWeight="600" fill="#4d4d4d">
                  {c === "porto" ? "Porto" : "Lisboa"}
                </text>
              </g>
            ))}
          </svg>
          <figcaption className="mt-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-soft">{UI.wineMapNote[lang]}</figcaption>
        </figure>
      </div>
    </section>
  );
}
