// Mounts what is below the fold once the browser is idle after the first paint, one section at a time, so
// the first screen becomes interactive sooner. Each placeholder keeps the section's anchor (id), so an old
// link such as /#infos still finds its target; asking for one mounts everything at once.
import { useEffect, useState, type ReactNode } from "react";

type Item = { id?: string; node: ReactNode };

export function Deferred({ items, eager = false }: { items: Item[]; eager?: boolean }) {
  const [count, setCount] = useState(eager ? items.length : 0);
  useEffect(() => {
    if (count >= items.length) return;
    const next = () => setCount((c) => c + 1);
    const hasIdle = typeof requestIdleCallback === "function";
    const id = hasIdle ? requestIdleCallback(next, { timeout: 900 }) : window.setTimeout(next, 120);
    return () => (hasIdle ? cancelIdleCallback(id) : window.clearTimeout(id));
  }, [count, items.length]);
  return (
    <>
      {items.map((item, i) => (i < count ? <div key={i} className="contents">{item.node}</div> : <div key={i} id={item.id} className="min-h-[100svh] bg-nata" />))}
    </>
  );
}
