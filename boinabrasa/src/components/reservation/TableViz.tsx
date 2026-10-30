// Seen from above: the table and chairs for the party size. 1–2 a small square table, 3–4 a round one, 5–6 a
// larger round one, 7–10 a long table, 11–12 a banquet table, 13 and more a group arrangement of two long tables.
// The table morphs (one rect whose size and corner radius spring between shapes) and every chair springs to its new
// place; chairs that are no longer needed fold away. Purely illustrative: no table is assigned.
import { useEffect, useMemo, useRef } from "react";
import { useSite } from "@/site";

type Seat = { x: number; y: number; r: number };
type Table = { x: number; y: number; w: number; h: number; rx: number };
type Layout = { tables: Table[]; seats: Seat[]; kind: "small" | "round" | "large" | "long" | "banquet" | "group" };

const W = 640, H = 440, CX = W / 2, CY = H / 2;
const MAX_DRAWN = 30;

function around(n: number, rx: number, ry: number, start = -Math.PI / 2): Seat[] {
  return Array.from({ length: n }, (_, i) => {
    const a = start + (i / n) * Math.PI * 2;
    return { x: CX + Math.cos(a) * rx, y: CY + Math.sin(a) * ry, r: (a * 180) / Math.PI + 90 };
  });
}
function sides(n: number, t: Table, ends: boolean): Seat[] {
  const seats: Seat[] = [];
  let rest = n;
  if (ends && n >= 9) {
    seats.push({ x: t.x - 38, y: t.y + t.h / 2, r: -90 }, { x: t.x + t.w + 38, y: t.y + t.h / 2, r: 90 });
    rest -= 2;
  }
  const top = Math.ceil(rest / 2), bottom = rest - top;
  const row = (k: number, y: number, r: number) => {
    for (let i = 0; i < k; i++) seats.push({ x: t.x + ((i + 0.5) / k) * t.w, y, r });
  };
  row(top, t.y - 36, 0);
  row(bottom, t.y + t.h + 36, 180);
  return seats;
}

export function layoutFor(n: number): Layout {
  const g = Math.max(1, n);
  if (g <= 2) {
    const t = { x: CX - 62, y: CY - 62, w: 124, h: 124, rx: 16 };
    return { kind: "small", tables: [t], seats: g === 1 ? [{ x: CX, y: CY - 98, r: 0 }] : [{ x: CX, y: CY - 98, r: 0 }, { x: CX, y: CY + 98, r: 180 }] };
  }
  if (g <= 4) return { kind: "round", tables: [{ x: CX - 82, y: CY - 82, w: 164, h: 164, rx: 82 }], seats: around(g, 122, 122) };
  if (g <= 6) return { kind: "large", tables: [{ x: CX - 112, y: CY - 112, w: 224, h: 224, rx: 112 }], seats: around(g, 152, 152) };
  if (g <= 10) {
    const w = 120 + Math.ceil(g / 2) * 62;
    const t = { x: CX - w / 2, y: CY - 62, w, h: 124, rx: 20 };
    return { kind: "long", tables: [t], seats: sides(g, t, g >= 9) };
  }
  if (g <= 12) {
    const t = { x: CX - 240, y: CY - 60, w: 480, h: 120, rx: 18 };
    return { kind: "banquet", tables: [t], seats: sides(g, t, true) };
  }
  // groups: two long tables; draw up to MAX_DRAWN seats
  const drawn = Math.min(g, MAX_DRAWN);
  const a = { x: CX - 255, y: CY - 128, w: 510, h: 82, rx: 16 };
  const b = { x: CX - 255, y: CY + 46, w: 510, h: 82, rx: 16 };
  const half = Math.ceil(drawn / 2);
  const s1 = sides(half, a, false).map((s) => ({ ...s, y: s.r === 0 ? a.y - 30 : a.y + a.h + 30 }));
  const s2 = sides(drawn - half, b, false).map((s) => ({ ...s, y: s.r === 0 ? b.y - 30 : b.y + b.h + 30 }));
  return { kind: "group", tables: [a, b], seats: [...s1, ...s2] };
}

/** Springs every chair, the tables and the skewer to the layout, writing SVG attributes directly (one rAF loop
 *  that stops once everything has settled). Reduced motion: jump. */
type Body = { v: number[]; x: number[] };
function useSprings(layout: Layout, reduce: boolean) {
  const chairs = useRef<(SVGGElement | null)[]>([]);
  const plates = useRef<(SVGGElement | null)[]>([]);
  const tables = useRef<(SVGRectElement | null)[]>([]);
  const skewer = useRef<SVGGElement | null>(null);
  const bodies = useRef<Map<string, Body>>(new Map());
  const raf = useRef(0);
  useEffect(() => {
    const targets = new Map<string, number[]>();
    for (let i = 0; i < MAX_DRAWN; i++) {
      const seat = layout.seats[i] ?? layout.seats[layout.seats.length - 1] ?? { x: CX, y: CY, r: 0 };
      const on = i < layout.seats.length;
      targets.set(`c${i}`, [seat.x, seat.y, seat.r, on ? 1 : 0, on ? 1 : 0.6]);
    }
    const t0 = layout.tables[0];
    const t1 = layout.tables[1] ?? { ...t0 };
    targets.set("t0", [t0.x, t0.y, t0.w, t0.h, t0.rx, 1]);
    targets.set("t1", [t1.x, t1.y, t1.w, t1.h, t1.rx, layout.tables[1] ? 1 : 0]);
    targets.set("sk", [t0.x + t0.w / 2, t0.y + t0.h / 2, layout.kind === "small" ? -35 : -18]);
    const write = () => {
      for (const [k, b] of bodies.current) {
        const x = b.x;
        if (k.startsWith("c")) {
          const tr = `translate(${x[0].toFixed(2)} ${x[1].toFixed(2)}) rotate(${x[2].toFixed(2)}) scale(${x[4].toFixed(3)})`;
          const op = Math.max(0, Math.min(1, x[3])).toFixed(3);
          for (const el of [chairs.current[Number(k.slice(1))], plates.current[Number(k.slice(1))]]) if (el) { el.setAttribute("transform", tr); el.setAttribute("opacity", op); }
        } else if (k === "sk") {
          skewer.current?.setAttribute("transform", `translate(${x[0].toFixed(2)} ${x[1].toFixed(2)}) rotate(${x[2].toFixed(2)})`);
        } else {
          const el = tables.current[k === "t0" ? 0 : 1];
          if (el) { el.setAttribute("x", x[0].toFixed(2)); el.setAttribute("y", x[1].toFixed(2)); el.setAttribute("width", Math.max(0, x[2]).toFixed(2)); el.setAttribute("height", Math.max(0, x[3]).toFixed(2)); el.setAttribute("rx", Math.max(0, x[4]).toFixed(2)); el.setAttribute("opacity", Math.max(0, Math.min(1, x[5])).toFixed(3)); }
        }
      }
    };
    const first = bodies.current.size === 0;
    for (const [k, tg] of targets) {
      const b = bodies.current.get(k);
      if (!b || reduce || first) bodies.current.set(k, { x: [...tg], v: tg.map(() => 0) });
    }
    if (reduce || first) { write(); return; }
    cancelAnimationFrame(raf.current);
    let last = performance.now();
    const stagger = new Map<string, number>();
    let i = 0;
    for (const k of targets.keys()) if (k.startsWith("c")) stagger.set(k, last + Math.min(i++ * 16, 260));
    const tick = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      let moving = false;
      for (const [k, tg] of targets) {
        const b = bodies.current.get(k)!;
        if ((stagger.get(k) ?? 0) > now) { moving = true; continue; }
        for (let j = 0; j < tg.length; j++) {
          const f = 210 * (tg[j] - b.x[j]) - 24 * b.v[j];
          b.v[j] += f * dt;
          b.x[j] += b.v[j] * dt;
          if (Math.abs(tg[j] - b.x[j]) > 0.01 || Math.abs(b.v[j]) > 0.01) moving = true;
        }
      }
      write();
      if (moving) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [layout, reduce]);
  return { chairs, plates, tables, skewer };
}

function Chair({ refFn }: { refFn: (el: SVGGElement | null) => void }) {
  return (
    <g ref={refFn} opacity={0}>
      {/* chair: seat and backrest, facing the table (the table is "down" in chair space) */}
      <rect x={-17} y={-15} width={34} height={30} rx={9} className="fill-[#3b2a20] stroke-ouro/50" strokeWidth={1.2} />
      <path d="M-15 -11 Q0 -22 15 -11" className="fill-none stroke-ouro" strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/** The place setting on the table edge in front of a chair: plate, knife and fork (drawn above the table). */
function Setting({ refFn }: { refFn: (el: SVGGElement | null) => void }) {
  return (
    <g ref={refFn} opacity={0}>
      <g transform="translate(0 40)">
        <circle r={14} className="fill-creme" />
        <circle r={9.5} className="fill-none stroke-creme-3" strokeWidth={1.2} />
        <path d="M-21 -9 V9" className="stroke-creme/80" strokeWidth={1.8} strokeLinecap="round" />
        <path d="M21 -9 V9" className="stroke-creme/80" strokeWidth={1.8} strokeLinecap="round" />
      </g>
    </g>
  );
}

export function TableViz({ guests, className }: { guests: number; className?: string }) {
  const { t, reduce } = useSite();
  const L = useMemo(() => layoutFor(guests), [guests]);
  const label = { small: t.reservation.tableSmall, round: t.reservation.tableRound, large: t.reservation.tableLarge, long: t.reservation.tableLong, banquet: t.reservation.tableLong, group: t.reservation.tableGroup }[L.kind];
  const more = guests - MAX_DRAWN;
  const { chairs, plates, tables, skewer } = useSprings(L, reduce);
  return (
    <figure className={className}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${label}: ${guests}. ${t.reservation.illustration}`}>
        <defs>
          <radialGradient id="tv-light" cx="50%" cy="48%" r="60%">
            <stop offset="0%" stopColor="#3a2418" />
            <stop offset="70%" stopColor="#1d1411" />
            <stop offset="100%" stopColor="#140e0c" />
          </radialGradient>
          <pattern id="tv-wood" width="64" height="64" patternUnits="userSpaceOnUse">
            <path d="M0 16 H64 M0 48 H64" stroke="#ffffff" strokeOpacity="0.025" strokeWidth="1" />
          </pattern>
          <radialGradient id="tv-table" cx="45%" cy="40%" r="75%">
            <stop offset="0%" stopColor="#7a4a2c" />
            <stop offset="100%" stopColor="#4a2a18" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} rx={28} fill="url(#tv-light)" />
        <rect width={W} height={H} rx={28} fill="url(#tv-wood)" />
        {/* chairs behind the table edge */}
        {Array.from({ length: MAX_DRAWN }, (_, i) => <Chair key={i} refFn={(el) => { chairs.current[i] = el; }} />)}
        <rect ref={(el) => { tables.current[0] = el; }} fill="url(#tv-table)" className="stroke-ouro/40" strokeWidth={1.5} />
        <rect ref={(el) => { tables.current[1] = el; }} fill="url(#tv-table)" className="stroke-ouro/40" strokeWidth={1.5} opacity={0} />
        {Array.from({ length: MAX_DRAWN }, (_, i) => <Setting key={i} refFn={(el) => { plates.current[i] = el; }} />)}
        {/* the skewer laid on the table: churrasco comes to you */}
        <g ref={skewer}>
          <path d="M-52 0 H52" className="stroke-creme-3" strokeWidth={3} strokeLinecap="round" />
          <circle cx={-20} cy={0} r={9} className="fill-[#8a4a24]" />
          <circle cx={0} cy={0} r={10} className="fill-[#9a5426]" />
          <circle cx={20} cy={0} r={9} className="fill-[#8a4a24]" />
          <path d="M-28 -6 A9 9 0 0 1 -12 -6 M-8 -7 A10 10 0 0 1 8 -7 M12 -6 A9 9 0 0 1 28 -6" className="fill-none stroke-ouro" strokeWidth={2.2} strokeLinecap="round" />
        </g>
        {more > 0 && (
          <g transform={`translate(${W - 92} ${H - 46})`}>
            <rect x={0} y={0} width={76} height={30} rx={15} className="fill-ouro" />
            <text x={38} y={20} textAnchor="middle" className="fill-carvao font-display text-[14px] font-bold">+{more}</text>
          </g>
        )}
      </svg>
      <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <span className="kicker text-ouro">{label}</span>
        <span className="text-creme/70">{t.reservation.illustration}</span>
      </figcaption>
    </figure>
  );
}
