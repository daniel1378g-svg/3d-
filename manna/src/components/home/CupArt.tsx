// The illustrated cup, three-quarter view: a clear cup that fills in four layers – açaí, fruit, extras, the
// finished cup with a spoon and the Manna logo. Each layer is its own group so it can arrive on its own: the açaí
// rises from the bottom (transform only), fruit drops in with a small springy stagger, extras scatter on top.
// It illustrates the idea of building your own cup; it is not a product, a size or a recipe.
import { AnimatePresence, motion } from "motion/react";
import { asset } from "@/lib/utils";

const rng = (seed: number) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

// cup geometry (viewBox 0 0 360 460): rim ellipse at y=70, base ellipse at y=420
const TOP = { cx: 180, cy: 78, rx: 128, ry: 22 };
const BOT = { cx: 180, cy: 418, rx: 92, ry: 15 };

export function CupArt({ step, reduce, label }: { step: number; reduce: boolean; label: string }) {
  const r = rng(11);
  const acaiTop = 250;
  const fruit = [
    ...Array.from({ length: 5 }, (_, i) => ({ k: "straw", x: 105 + i * 38 + r() * 8, y: acaiTop - 6 + r() * 10, rot: -30 + r() * 60 })),
    ...Array.from({ length: 4 }, (_, i) => ({ k: "banana", x: 120 + i * 40 + r() * 6, y: acaiTop - 26 + r() * 8, rot: 0 })),
    ...Array.from({ length: 3 }, (_, i) => ({ k: "kiwi", x: 135 + i * 45 + r() * 6, y: acaiTop - 44 + r() * 8, rot: r() * 40 })),
    ...Array.from({ length: 9 }, () => ({ k: "blue", x: 95 + r() * 170, y: acaiTop - 50 + r() * 50, rot: 0 })),
  ];
  const granola = Array.from({ length: 46 }, () => ({ x: 70 + r() * 220, y: 150 + r() * 46, w: 6 + r() * 9, h: 4 + r() * 6, rot: r() * 180, c: ["#d9a457", "#c48a3c", "#e8be78", "#b07531"][Math.floor(r() * 4)] }));
  const coco = Array.from({ length: 14 }, () => ({ x: 80 + r() * 200, y: 140 + r() * 40, rot: r() * 180 }));
  const drop = (i: number) => (reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.2 } }
    : { initial: { opacity: 0, transform: "translateY(-120px)" }, animate: { opacity: 1, transform: "translateY(0px)" }, exit: { opacity: 0, transform: "translateY(-30px)" }, transition: { type: "spring" as const, duration: 0.6, bounce: 0.25, delay: i * 0.03 } });

  return (
    <svg viewBox="0 0 360 460" role="img" aria-label={label} className="h-auto w-full overflow-visible">
      <defs>
        <clipPath id="cup-inside">
          <path d={`M${TOP.cx - TOP.rx + 6} ${TOP.cy} L${BOT.cx - BOT.rx + 4} ${BOT.cy} A${BOT.rx - 4} ${BOT.ry} 0 0 0 ${BOT.cx + BOT.rx - 4} ${BOT.cy} L${TOP.cx + TOP.rx - 6} ${TOP.cy} Z`} />
        </clipPath>
        <linearGradient id="acai-fill" x1="0" x2="1">
          <stop offset="0" stopColor="#3d1d43" />
          <stop offset="0.35" stopColor="#63195c" />
          <stop offset="0.7" stopColor="#4a1245" />
          <stop offset="1" stopColor="#2e1434" />
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.8" stopColor="#fff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* shadow */}
      <ellipse cx="186" cy="430" rx="120" ry="16" fill="#241028" opacity="0.18" />
      {/* back of the cup */}
      <ellipse {...{ cx: TOP.cx, cy: TOP.cy, rx: TOP.rx, ry: TOP.ry }} fill="#f2e6f4" opacity="0.45" />

      <g clipPath="url(#cup-inside)">
        <AnimatePresence>
          {step >= 1 && (
            <motion.g key="acai"
              initial={reduce ? { opacity: 0 } : { transform: "translateY(240px)" }}
              animate={reduce ? { opacity: 1 } : { transform: "translateY(0px)" }}
              exit={reduce ? { opacity: 0 } : { transform: "translateY(240px)" }}
              transition={{ duration: reduce ? 0.2 : 0.9, ease: [0.23, 1, 0.32, 1] }}>
              <path d={`M40 ${acaiTop} C 110 ${acaiTop - 22}, 160 ${acaiTop + 18}, 220 ${acaiTop - 8} S 300 ${acaiTop - 16}, 330 ${acaiTop} L330 440 L40 440 Z`} fill="url(#acai-fill)" />
              <path d={`M70 ${acaiTop + 30} C 120 ${acaiTop + 14}, 170 ${acaiTop + 46}, 230 ${acaiTop + 26}`} stroke="#bf8bbe" strokeOpacity="0.35" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d={`M60 ${acaiTop + 90} C 130 ${acaiTop + 70}, 190 ${acaiTop + 110}, 290 ${acaiTop + 84}`} stroke="#84458b" strokeOpacity="0.55" strokeWidth="8" fill="none" strokeLinecap="round" />
            </motion.g>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step >= 2 && fruit.map((f, i) => (
            <motion.g key={`f${i}`} {...drop(i)}>
              {f.k === "straw" && (
                <g transform={`rotate(${f.rot} ${f.x} ${f.y})`}>
                  <path d={`M${f.x} ${f.y + 16} C ${f.x - 16} ${f.y + 4}, ${f.x - 14} ${f.y - 12}, ${f.x} ${f.y - 10} C ${f.x + 14} ${f.y - 12}, ${f.x + 16} ${f.y + 4}, ${f.x} ${f.y + 16} Z`} fill="#d9364f" />
                  <path d={`M${f.x} ${f.y + 10} C ${f.x - 8} ${f.y + 2}, ${f.x - 7} ${f.y - 6}, ${f.x} ${f.y - 5} C ${f.x + 7} ${f.y - 6}, ${f.x + 8} ${f.y + 2}, ${f.x} ${f.y + 10} Z`} fill="#f39aa8" />
                  {[[-5, 0], [4, 2], [0, 8], [-2, -4], [6, -3]].map(([dx, dy], k) => <ellipse key={k} cx={f.x + dx} cy={f.y + dy} rx="1" ry="1.6" fill="#ffe08a" />)}
                </g>
              )}
              {f.k === "banana" && (<g><circle cx={f.x} cy={f.y} r="13" fill="#f7e7a8" stroke="#e5c66b" strokeWidth="2" /><circle cx={f.x} cy={f.y} r="3" fill="#e8d28c" /></g>)}
              {f.k === "kiwi" && (
                <g transform={`rotate(${f.rot} ${f.x} ${f.y})`}>
                  <circle cx={f.x} cy={f.y} r="14" fill="#7aa83a" stroke="#5b4a2a" strokeWidth="2" />
                  <circle cx={f.x} cy={f.y} r="5" fill="#eef5d0" />
                  {Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * Math.PI * 2; return <ellipse key={k} cx={f.x + Math.cos(a) * 8} cy={f.y + Math.sin(a) * 8} rx="1.2" ry="0.8" fill="#241028" transform={`rotate(${(a * 180) / Math.PI} ${f.x + Math.cos(a) * 8} ${f.y + Math.sin(a) * 8})`} />; })}
                </g>
              )}
              {f.k === "blue" && (<g><circle cx={f.x} cy={f.y} r="7" fill="#3b3f8f" /><circle cx={f.x - 2} cy={f.y - 2} r="2" fill="#8d92d8" opacity="0.7" /></g>)}
            </motion.g>
          ))}
        </AnimatePresence>
      </g>

      {/* extras pile up over the rim */}
      <AnimatePresence>
        {step >= 3 && (
          <motion.g key="extras"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-50px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0.2 } : { type: "spring", duration: 0.7, bounce: 0.2 }}>
            <path d={`M64 ${TOP.cy + 8} C 90 128, 130 112, 180 116 C 232 110, 274 126, 296 ${TOP.cy + 8} C 270 196, 90 196, 64 ${TOP.cy + 8} Z`} fill="#4a1245" />
            {granola.map((g, i) => <rect key={i} x={g.x} y={g.y - 40} width={g.w} height={g.h} rx="2" fill={g.c} transform={`rotate(${g.rot} ${g.x} ${g.y - 40})`} />)}
            {coco.map((c, i) => <rect key={`c${i}`} x={c.x} y={c.y - 44} width="9" height="3" rx="1.5" fill="#fff7ed" transform={`rotate(${c.rot} ${c.x} ${c.y - 44})`} />)}
            <path d="M120 112 C 150 98, 170 132, 200 108 S 250 102, 262 118" stroke="#3a1d12" strokeWidth="5" fill="none" strokeLinecap="round" />
          </motion.g>
        )}
      </AnimatePresence>

      {/* the clear cup over everything */}
      <path d={`M${TOP.cx - TOP.rx} ${TOP.cy} L${BOT.cx - BOT.rx} ${BOT.cy} A${BOT.rx} ${BOT.ry} 0 0 0 ${BOT.cx + BOT.rx} ${BOT.cy} L${TOP.cx + TOP.rx} ${TOP.cy}`} fill="url(#glass)" stroke="#bf8bbe" strokeOpacity="0.7" strokeWidth="2.5" />
      <path d={`M${TOP.cx - TOP.rx + 18} ${TOP.cy + 20} L${BOT.cx - BOT.rx + 14} ${BOT.cy - 18}`} stroke="#fff" strokeOpacity="0.7" strokeWidth="6" strokeLinecap="round" />
      <ellipse {...{ cx: TOP.cx, cy: TOP.cy, rx: TOP.rx, ry: TOP.ry }} fill="none" stroke="#bf8bbe" strokeWidth="3" />

      {/* finished: spoon and the logo on the cup */}
      <AnimatePresence>
        {step >= 4 && (
          <motion.g key="done"
            initial={reduce ? { opacity: 0 } : { opacity: 0, transform: "translateY(-30px) rotate(-6deg)" }}
            animate={{ opacity: 1, transform: "translateY(0px) rotate(0deg)" }}
            exit={{ opacity: 0 }}
            transition={reduce ? { duration: 0.2 } : { type: "spring", duration: 0.6, bounce: 0.2 }}>
            <rect x="238" y="18" width="12" height="120" rx="6" fill="#9ebc3a" transform="rotate(18 244 78)" />
            <ellipse cx="226" cy="134" rx="16" ry="11" fill="#9ebc3a" transform="rotate(18 226 134)" />
            <circle cx="180" cy="346" r="52" fill="#fff7ed" stroke="#bf8bbe" strokeWidth="3" />
            <image href={asset("/brand/logo-320.webp")} x={180 - 42} y={346 - 37} width="84" height="73" />
            {[[60, 40], [310, 60], [40, 150], [326, 170]].map(([x, y], i) => (
              <path key={i} d={`M${x} ${y - 9} L${x + 3} ${y - 3} L${x + 9} ${y} L${x + 3} ${y + 3} L${x} ${y + 9} L${x - 3} ${y + 3} L${x - 9} ${y} L${x - 3} ${y - 3} Z`} fill="#9ebc3a" />
            ))}
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
