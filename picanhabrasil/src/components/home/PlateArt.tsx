// The plate, seen from above, drawn in SVG: rice, beans, fries or cassava and the chosen main, each its own layer
// so they can pop in one by one while scrolling and swap when the visitor picks another dish. Shapes are seeded,
// so a dish always looks the same. It is an illustration (the caption says so), not a photo of the restaurant's food.
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

export type MainKey = "picanha" | "carne-seca" | "bisteca" | "frango" | "figado" | "peixe" | "camarao" | "bacalhau" | "feijoada";
export type SideKey = "fries" | "cassava" | "rice" | "banana" | "kale" | "vinaigrette";

const rng = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

function Rice({ cx, cy }: { cx: number; cy: number }) {
  const r = rng(7);
  return (
    <g>
      <ellipse cx={cx} cy={cy + 6} rx="66" ry="54" fill="#000" opacity="0.08" />
      <path d={`M${cx - 64} ${cy} C${cx - 66} ${cy - 46} ${cx - 10} ${cy - 62} ${cx + 30} ${cy - 50} C${cx + 72} ${cy - 36} ${cx + 70} ${cy + 22} ${cx + 40} ${cy + 44} C${cx + 6} ${cy + 66} ${cx - 56} ${cy + 46} ${cx - 64} ${cy}Z`} fill="#fbf7ee" />
      {Array.from({ length: 70 }, (_, i) => {
        const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 52;
        return <ellipse key={i} cx={cx + Math.cos(a) * d} cy={cy + Math.sin(a) * d * 0.85} rx="4.2" ry="1.6" transform={`rotate(${r() * 180} ${cx + Math.cos(a) * d} ${cy + Math.sin(a) * d * 0.85})`} fill={r() > 0.5 ? "#efe6d2" : "#fffdf7"} />;
      })}
    </g>
  );
}

function Beans({ cx, cy }: { cx: number; cy: number }) {
  const r = rng(13);
  return (
    <g>
      <path d={`M${cx - 70} ${cy} C${cx - 64} ${cy - 40} ${cx + 40} ${cy - 46} ${cx + 66} ${cy - 10} C${cx + 86} ${cy + 20} ${cx + 20} ${cy + 50} ${cx - 30} ${cy + 40} C${cx - 64} ${cy + 34} ${cx - 72} ${cy + 18} ${cx - 70} ${cy}Z`} fill="#3a2016" />
      {Array.from({ length: 46 }, (_, i) => {
        const x = cx - 58 + r() * 116, y = cy - 30 + r() * 62;
        return <ellipse key={i} cx={x} cy={y} rx="6.5" ry="4.2" transform={`rotate(${r() * 180} ${x} ${y})`} fill={r() > 0.5 ? "#1e0f0b" : "#2c1610"} stroke="#4a2a1c" strokeWidth="0.8" />;
      })}
      {Array.from({ length: 10 }, (_, i) => <circle key={i} cx={cx - 50 + r() * 100} cy={cy - 24 + r() * 50} r="1.6" fill="#7a4a30" opacity="0.7" />)}
    </g>
  );
}

function Fries({ cx, cy }: { cx: number; cy: number }) {
  const r = rng(21);
  return (
    <g>
      {Array.from({ length: 16 }, (_, i) => {
        const x = cx - 40 + r() * 70, y = cy - 40 + r() * 70, len = 48 + r() * 30;
        return <rect key={i} x={x} y={y} width="9" height={len} rx="3" transform={`rotate(${-50 + r() * 100} ${x} ${y})`} fill={r() > 0.5 ? "#f2c14e" : "#e9ae35"} stroke="#c98a1f" strokeWidth="0.8" />;
      })}
    </g>
  );
}

function Cassava({ cx, cy }: { cx: number; cy: number }) {
  const r = rng(33);
  return (
    <g>
      {Array.from({ length: 8 }, (_, i) => {
        const x = cx - 40 + r() * 60, y = cy - 36 + r() * 60, len = 56 + r() * 18;
        return (
          <g key={i} transform={`rotate(${-40 + r() * 80} ${x} ${y})`}>
            <rect x={x} y={y} width="17" height={len} rx="6" fill="#f3d58a" stroke="#c9963f" strokeWidth="1" />
            <rect x={x + 4} y={y + 6} width="4" height={len - 12} rx="2" fill="#fbe8b4" />
          </g>
        );
      })}
    </g>
  );
}

function Banana({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`rotate(${-30 + i * 16} ${cx} ${cy + 60})`}>
          <ellipse cx={cx} cy={cy - 6 + i * 2} rx="13" ry="34" fill="#e1a338" stroke="#a8641d" strokeWidth="1.2" />
          <ellipse cx={cx - 3} cy={cy - 10 + i * 2} rx="5" ry="22" fill="#f1c467" opacity="0.8" />
        </g>
      ))}
    </g>
  );
}

function Kale({ cx, cy }: { cx: number; cy: number }) {
  const r = rng(44);
  return (
    <g>
      {Array.from({ length: 34 }, (_, i) => {
        const x = cx - 44 + r() * 88, y = cy - 36 + r() * 72;
        return <path key={i} d={`M${x} ${y} q ${6 + r() * 10} ${-4 - r() * 8} ${18 + r() * 12} ${r() * 6 - 3}`} stroke={r() > 0.4 ? "#2f6b2a" : "#4b8f3a"} strokeWidth="4" strokeLinecap="round" fill="none" />;
      })}
    </g>
  );
}

function Vinaigrette({ cx, cy }: { cx: number; cy: number }) {
  const r = rng(55);
  const colors = ["#d83a2a", "#e65a3a", "#f1e4c8", "#3f8a3a", "#c9302c"];
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx="52" ry="44" fill="#f7efe0" opacity="0.4" />
      {Array.from({ length: 60 }, (_, i) => {
        const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 42;
        return <rect key={i} x={cx + Math.cos(a) * d} y={cy + Math.sin(a) * d * 0.85} width="6" height="6" rx="1.5" fill={colors[i % colors.length]} transform={`rotate(${r() * 90} ${cx + Math.cos(a) * d} ${cy + Math.sin(a) * d})`} />;
      })}
    </g>
  );
}

function Onions({ cx, cy, n = 6 }: { cx: number; cy: number; n?: number }) {
  const r = rng(66);
  return <g>{Array.from({ length: n }, (_, i) => <ellipse key={i} cx={cx - 40 + r() * 80} cy={cy - 30 + r() * 60} rx={10 + r() * 6} ry={7 + r() * 4} fill="none" stroke="#f3e2c0" strokeWidth="3" opacity="0.9" />)}</g>;
}

function Main({ k, large }: { k: MainKey; large: boolean }) {
  const cx = 250, cy = 140;
  switch (k) {
    case "picanha": {
      // fanned slices seen from above: each a wide slab whose cut face goes from a browned edge to a pink centre,
      // with the golden fat cap along the top
      const n = large ? 5 : 4;
      return (
        <g>
          <defs>
            <radialGradient id="pic-cut" cx="50%" cy="55%" r="60%">
              <stop offset="0%" stopColor="#d9707a" />
              <stop offset="55%" stopColor="#c0505a" />
              <stop offset="80%" stopColor="#8c4a3a" />
              <stop offset="100%" stopColor="#5a2614" />
            </radialGradient>
          </defs>
          {Array.from({ length: n }, (_, i) => {
            const x = cx - 70 + i * (140 / (n - 1)), y = cy + 6 - Math.abs(i - (n - 1) / 2) * 6;
            return (
              <g key={i} transform={`rotate(${-22 + i * (44 / (n - 1))} ${x} ${y + 60})`}>
                <path d={`M${x - 30} ${y - 46} C${x - 10} ${y - 58} ${x + 18} ${y - 56} ${x + 32} ${y - 42} C${x + 38} ${y - 10} ${x + 34} ${y + 30} ${x + 22} ${y + 52} C${x} ${y + 60} ${x - 22} ${y + 56} ${x - 30} ${y + 46} C${x - 38} ${y + 10} ${x - 36} ${y - 26} ${x - 30} ${y - 46}Z`} fill="url(#pic-cut)" stroke="#4a1c0e" strokeWidth="2.5" />
                <path d={`M${x - 30} ${y - 46} C${x - 10} ${y - 58} ${x + 18} ${y - 56} ${x + 32} ${y - 42} C${x + 18} ${y - 46} ${x - 12} ${y - 48} ${x - 30} ${y - 38}Z`} fill="#f3cf7a" stroke="#d9a74a" strokeWidth="1.5" />
                <path d={`M${x - 26} ${y - 40} C${x - 8} ${y - 46} ${x + 14} ${y - 45} ${x + 28} ${y - 38}`} stroke="#b9772f" strokeWidth="1.5" fill="none" opacity="0.7" />
                {[[-12, -6], [6, 12], [-4, 28], [14, -14]].map(([dx, dy], k) => <path key={k} d={`M${x + dx - 8} ${y + dy} q 8 -3 16 0`} stroke="#e48a92" strokeWidth="2" fill="none" opacity="0.5" />)}
              </g>
            );
          })}
        </g>
      );
    }
    case "carne-seca": {
      const r = rng(77);
      const n = large ? 70 : 52;
      return (
        <g>
          {Array.from({ length: n }, (_, i) => {
            const a = r() * Math.PI * 2, d = Math.sqrt(r()) * (large ? 66 : 56);
            const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * 0.8;
            return <path key={i} d={`M${x} ${y} q ${6 + r() * 6} ${-3 + r() * 6} ${14 + r() * 10} ${-2 + r() * 4}`} stroke={["#6e2418", "#8c3320", "#5a1d14"][i % 3]} strokeWidth={3 + r() * 3} strokeLinecap="round" fill="none" transform={`rotate(${r() * 180} ${x} ${y})`} />;
          })}
          <Onions cx={cx} cy={cy} n={5} />
        </g>
      );
    }
    case "bisteca":
      return (
        <g transform={`rotate(-14 ${cx} ${cy})`}>
          <path d={`M${cx - 80} ${cy - 20} C${cx - 76} ${cy - 66} ${cx + 10} ${cy - 76} ${cx + 66} ${cy - 50} C${cx + 100} ${cy - 30} ${cx + 92} ${cy + 40} ${cx + 40} ${cy + 58} C${cx - 20} ${cy + 76} ${cx - 86} ${cy + 40} ${cx - 80} ${cy - 20}Z`} fill="#7a2f1b" />
          <path d={`M${cx - 66} ${cy - 18} C${cx - 60} ${cy - 54} ${cx + 4} ${cy - 62} ${cx + 52} ${cy - 40} C${cx + 82} ${cy - 24} ${cx + 76} ${cy + 30} ${cx + 32} ${cy + 46} C${cx - 18} ${cy + 62} ${cx - 72} ${cy + 32} ${cx - 66} ${cy - 18}Z`} fill="#9c4128" />
          {[-40, -15, 10, 35].map((o) => <path key={o} d={`M${cx + o - 30} ${cy - 40} l 60 70`} stroke="#4a1a0e" strokeWidth="6" strokeLinecap="round" opacity="0.6" />)}
          <path d={`M${cx - 10} ${cy - 60} C${cx - 4} ${cy - 10} ${cx - 6} ${cy + 30} ${cx - 20} ${cy + 64}`} stroke="#efe4cf" strokeWidth="11" strokeLinecap="round" fill="none" />
          <path d={`M${cx - 80} ${cy - 20} C${cx - 76} ${cy - 66} ${cx + 10} ${cy - 76} ${cx + 66} ${cy - 50}`} stroke="#f0c766" strokeWidth="7" fill="none" strokeLinecap="round" />
        </g>
      );
    case "frango":
      return (
        <g transform={`rotate(-20 ${cx} ${cy})`}>
          <path d={`M${cx - 78} ${cy + 10} C${cx - 70} ${cy - 50} ${cx + 40} ${cy - 60} ${cx + 80} ${cy - 20} C${cx + 100} ${cy + 10} ${cx + 50} ${cy + 50} ${cx - 10} ${cy + 46} C${cx - 50} ${cy + 44} ${cx - 82} ${cy + 34} ${cx - 78} ${cy + 10}Z`} fill="#d9a35a" />
          <path d={`M${cx - 60} ${cy + 6} C${cx - 52} ${cy - 36} ${cx + 30} ${cy - 44} ${cx + 62} ${cy - 16}`} fill="none" stroke="#f0c98a" strokeWidth="10" strokeLinecap="round" opacity="0.6" />
          {[-50, -22, 6, 34, 62].map((o) => <path key={o} d={`M${cx + o - 14} ${cy - 40} l 22 70`} stroke="#7a4a1e" strokeWidth="5" strokeLinecap="round" opacity="0.75" />)}
        </g>
      );
    case "figado": {
      return (
        <g>
          {[0, 1, 2].map((i) => {
            const x = cx - 46 + i * 46, y = cy - 8 + (i % 2) * 18;
            return <path key={i} transform={`rotate(${-20 + i * 18} ${x} ${y})`} d={`M${x - 30} ${y} C${x - 28} ${y - 34} ${x + 26} ${y - 40} ${x + 34} ${y - 6} C${x + 40} ${y + 24} ${x - 6} ${y + 36} ${x - 30} ${y}Z`} fill={["#4a1612", "#5a1d16", "#43130f"][i]} stroke="#6e2a1e" strokeWidth="2" />;
          })}
          <Onions cx={cx} cy={cy - 4} n={9} />
        </g>
      );
    }
    case "peixe":
      return (
        <g transform={`rotate(-16 ${cx} ${cy})`}>
          <path d={`M${cx - 90} ${cy} C${cx - 70} ${cy - 44} ${cx + 40} ${cy - 50} ${cx + 92} ${cy - 10} C${cx + 70} ${cy + 36} ${cx - 40} ${cy + 46} ${cx - 90} ${cy}Z`} fill="#e9b768" />
          <path d={`M${cx - 70} ${cy - 2} C${cx - 50} ${cy - 30} ${cx + 30} ${cy - 34} ${cx + 70} ${cy - 10}`} fill="none" stroke="#f6d79c" strokeWidth="12" strokeLinecap="round" opacity="0.7" />
          {[-50, -25, 0, 25, 50].map((o) => <path key={o} d={`M${cx + o} ${cy - 30} q 8 30 0 58`} stroke="#c98a3c" strokeWidth="2.5" fill="none" opacity="0.7" />)}
        </g>
      );
    case "camarao": {
      // nine prawns, as on the menu
      return (
        <g>
          {Array.from({ length: 9 }, (_, i) => {
            const a = (i / 9) * Math.PI * 2, d = i === 8 ? 0 : 46;
            const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * 0.8;
            return (
              <g key={i} transform={`rotate(${(a * 180) / Math.PI + 90} ${x} ${y})`}>
                <path d={`M${x - 18} ${y - 4} C${x - 16} ${y - 24} ${x + 16} ${y - 24} ${x + 18} ${y - 2} C${x + 18} ${y + 10} ${x + 6} ${y + 12} ${x + 4} ${y + 2} C${x + 4} ${y - 8} ${x - 6} ${y - 8} ${x - 6} ${y + 2} C${x - 8} ${y + 12} ${x - 18} ${y + 8} ${x - 18} ${y - 4}Z`} fill="#f08a4b" stroke="#c2552a" strokeWidth="1.4" />
                {[-10, -2, 6, 13].map((o) => <path key={o} d={`M${x + o} ${y - 18} l 2 9`} stroke="#c2552a" strokeWidth="1.4" />)}
              </g>
            );
          })}
          {[0, 1, 2, 3, 4, 5].map((i) => <circle key={i} cx={cx - 50 + i * 20} cy={cy + 50 - (i % 2) * 8} r="2.4" fill="#f6e7c4" />)}
        </g>
      );
    }
    case "bacalhau": {
      const r = rng(88);
      return (
        <g>
          {Array.from({ length: 12 }, (_, i) => {
            const x = cx - 56 + r() * 112, y = cy - 40 + r() * 80;
            return <path key={i} transform={`rotate(${r() * 180} ${x} ${y})`} d={`M${x - 16} ${y} C${x - 14} ${y - 14} ${x + 14} ${y - 16} ${x + 18} ${y - 2} C${x + 20} ${y + 12} ${x - 10} ${y + 16} ${x - 16} ${y}Z`} fill={r() > 0.5 ? "#f6efe2" : "#ece1cc"} stroke="#d8c8aa" strokeWidth="1.2" />;
          })}
          {Array.from({ length: 10 }, (_, i) => {
            const x = cx - 56 + r() * 112, y = cy - 40 + r() * 80;
            return <path key={`p${i}`} d={`M${x} ${y} q 14 -6 28 0`} stroke={i % 2 ? "#d8392b" : "#3b8a3a"} strokeWidth="6" strokeLinecap="round" fill="none" transform={`rotate(${r() * 180} ${x} ${y})`} />;
          })}
        </g>
      );
    }
    case "feijoada": {
      const r = rng(99);
      return (
        <g>
          <circle cx={cx} cy={cy} r="82" fill="#9a4a2a" />
          <circle cx={cx} cy={cy} r="70" fill="#2a120c" />
          {Array.from({ length: 40 }, (_, i) => {
            const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 60;
            return <ellipse key={i} cx={cx + Math.cos(a) * d} cy={cy + Math.sin(a) * d} rx="6" ry="4" fill="#1a0b08" stroke="#3d1d14" strokeWidth="0.8" />;
          })}
          {Array.from({ length: 9 }, (_, i) => {
            const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 50;
            return <rect key={`m${i}`} x={cx + Math.cos(a) * d - 8} y={cy + Math.sin(a) * d - 6} width="16" height="12" rx="4" fill={i % 3 ? "#7a2e1c" : "#b0563a"} />;
          })}
          <path d={`M${cx - 78} ${cy - 30} a 82 82 0 0 1 40 -46`} stroke="#c87a52" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.6" />
        </g>
      );
    }
  }
}

const pop = (reduce: boolean, delay = 0) => ({
  initial: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: -40 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8, y: 30 },
  transition: { duration: reduce ? 0.2 : 0.55, ease: EASE_OUT, delay },
});

export function PlateArt({ main, side, large, shown, reduce, label }: { main: MainKey; side: SideKey; large: boolean; shown: number; reduce: boolean; label: string }) {
  const feijoada = main === "feijoada";
  const sideAt = { cx: 285, cy: 268 };
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={label} className="h-auto w-full overflow-visible">
      <defs>
        <radialGradient id="plate" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="75%" stopColor="#f2ece1" />
          <stop offset="100%" stopColor="#ddd3c2" />
        </radialGradient>
      </defs>
      <ellipse cx="206" cy="214" rx="186" ry="186" fill="#000" opacity="0.28" style={{ filter: "blur(14px)" }} />
      <circle cx="200" cy="200" r="186" fill="url(#plate)" />
      <circle cx="200" cy="200" r="150" fill="none" stroke="#e3d9c6" strokeWidth="2" />
      <circle cx="200" cy="200" r="182" fill="none" stroke="#fff" strokeWidth="2" opacity="0.7" />
      <AnimatePresence>
        {(feijoada ? shown >= 2 && side === "rice" : shown >= 2) && (
          <motion.g key="rice" {...pop(reduce)} style={{ transformOrigin: "120px 230px" }}><Rice cx={120} cy={226} /></motion.g>
        )}
        {!feijoada && shown >= 3 && (
          <motion.g key="beans" {...pop(reduce)} style={{ transformOrigin: "190px 312px" }}><Beans cx={190} cy={310} /></motion.g>
        )}
        {shown >= 4 && (
          <motion.g key={`side-${feijoada ? side : side}`} {...pop(reduce)} style={{ transformOrigin: `${sideAt.cx}px ${sideAt.cy}px` }}>
            {side === "fries" && <Fries {...sideAt} />}
            {side === "cassava" && <Cassava {...sideAt} />}
            {side === "banana" && <Banana {...sideAt} />}
            {side === "kale" && <Kale {...sideAt} />}
            {side === "vinaigrette" && <Vinaigrette {...sideAt} />}
          </motion.g>
        )}
        {shown >= 1 && (
          <motion.g key={`main-${main}-${large}`} {...pop(reduce)} style={{ transformOrigin: "250px 140px" }}><Main k={main} large={large} /></motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
