import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { Reveal } from "../Reveal";

// A hand-drawn route across a 1000 × 420 box: Portugal on the left, the mountains of Winterthur on the right.
const W = 1000;
const H = 420;
const PATH = "M 72 352 C 150 250, 250 228, 340 286 S 480 372, 560 312 S 650 150, 742 168 S 860 236, 912 178";
const START = { x: 72, y: 352 };
const END = { x: 912, y: 178 };
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

/** The olive branch from the logo's world, on a linen disc: it travels the route as you scroll. */
function BranchBadge() {
  return (
    <span className="grid h-12 w-12 place-items-center rounded-full bg-linen shadow-lift ring-1 ring-charcoal/10 md:h-16 md:w-16">
      <svg viewBox="0 0 48 48" className="h-7 w-7 md:h-9 md:w-9" aria-hidden="true">
        <path d="M9 39 C17 31 27 21 40 9" fill="none" stroke="#3E6B1F" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M15 33 C12 27 14 22 19 20 C20 25 19 29 15 33 Z M21 26 C21 20 25 16 30 16 C28 21 26 24 21 26 Z M27 20 C29 15 33 12 38 13 C35 17 32 19 27 20 Z M19 32 C24 30 29 32 31 36 C26 37 22 36 19 32 Z" fill="#4AA400" />
        <ellipse cx="31" cy="29" rx="3.6" ry="4.8" transform="rotate(-25 31 29)" fill="#4a2d34" />
      </svg>
    </span>
  );
}

/**
 * "Portugal → Winterthur": the line draws itself as the section scrolls through, and the badge rides its
 * tip. With reduced motion the whole route is drawn and the badge waits at Winterthur.
 */
export function Route() {
  const { lang } = useSite();
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const path = useRef<SVGPathElement>(null);
  const badge = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: box, offset: ["start 85%", "end 45%"] });
  const progress = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), { stiffness: 120, damping: 24, restDelta: 0.001 });

  useEffect(() => {
    const p = path.current!;
    const total = p.getTotalLength();
    const place = (t: number) => {
      const pt = p.getPointAtLength(Math.max(0, Math.min(1, t)) * total);
      if (badge.current) {
        badge.current.style.left = pct(pt.x, W);
        badge.current.style.top = pct(pt.y, H);
      }
    };
    if (reduce) {
      place(1);
      return;
    }
    place(progress.get());
    return progress.on("change", place);
  }, [reduce, progress]);

  return (
    <section aria-labelledby="route-title" className="linen gutter overflow-x-clip py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <h2 id="route-title" className="kicker text-center text-leaf">{UI.routeLabel[lang]}</h2>
        </Reveal>
        <div ref={box} className="relative mx-auto mt-6 w-full max-w-[1080px]" style={{ aspectRatio: `${W} / ${H}` }}>
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <path d={PATH} fill="none" stroke="#A9B39B" strokeOpacity="0.45" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 14" />
            <motion.path
              ref={path}
              d={PATH}
              fill="none"
              stroke="#3E6B1F"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={reduce ? undefined : { pathLength: progress }}
            />
            {/* Portugal: a small dot */}
            <circle cx={START.x} cy={START.y} r="11" fill="#F6F1E7" stroke="#3E6B1F" strokeWidth="5" />
            {/* Winterthur: two hills, the near one in leaf green */}
            <path d={`M ${END.x - 46} ${END.y + 22} L ${END.x + 6} ${END.y - 52} L ${END.x + 58} ${END.y + 22} Z`} fill="#A9B39B" opacity="0.75" />
            <path d={`M ${END.x - 6} ${END.y + 22} L ${END.x + 38} ${END.y - 30} L ${END.x + 82} ${END.y + 22} Z`} fill="#84C054" opacity="0.8" />
            <path d={`M ${END.x - 4} ${END.y - 36} L ${END.x + 6} ${END.y - 52} L ${END.x + 16} ${END.y - 36}`} fill="#F6F1E7" />
          </svg>
          <span className="display absolute -translate-x-1/4 text-[clamp(1rem,2.6vw,1.75rem)] font-semibold text-leaf" style={{ left: pct(START.x, W), top: `calc(${pct(START.y, H)} + 18px)` }}>
            {UI.portugal[lang]}
          </span>
          <span className="display absolute -translate-x-3/4 text-[clamp(1rem,2.6vw,1.75rem)] font-semibold text-apetite-text" style={{ left: pct(END.x + 30, W), top: `calc(${pct(END.y, H)} + 30px)` }}>
            Winterthur
          </span>
          <div ref={badge} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: pct(START.x, W), top: pct(START.y, H) }}>
            <BranchBadge />
          </div>
        </div>
        <Reveal>
          <p className="display mx-auto mt-10 max-w-[30ch] text-center text-[clamp(1.4rem,3.2vw,2.4rem)] italic leading-snug text-charcoal">{UI.routeLine[lang]}</p>
        </Reveal>
      </div>
    </section>
  );
}
