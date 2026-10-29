// A press clipping: a paper card with the title, the date and a cork pin, tilting toward the pointer.
import { useRef } from "react";
import { LOCALE, type Lang } from "@/i18n";
import type { PressItem } from "@/content/press";
import { cn, prefersReducedMotion } from "@/lib/utils";

export const pressDate = (iso: string, lang: Lang) => new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", year: "numeric" }).format(new Date(iso + "T12:00:00"));

export function PressClip({ item, lang, href, onOpen, index, className, titleAs: Title = "h3", eager = false }: { item: PressItem; lang: Lang; href: string; onOpen: () => void; index: number; className?: string; titleAs?: "h3" | "p"; eager?: boolean }) {
  const card = useRef<HTMLAnchorElement>(null);
  const rest = ((index * 37) % 7) - 3; // a slight resting angle per card
  const tilt = (e: React.PointerEvent) => {
    if (prefersReducedMotion() || e.pointerType !== "mouse" || !card.current) return;
    const r = card.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.current.style.transform = `perspective(700px) rotateX(${-y * 12}deg) rotateY(${x * 14}deg) rotate(${rest * 0.3}deg) translateY(-4px)`;
  };
  const reset = () => card.current && (card.current.style.transform = `rotate(${rest}deg)`);
  return (
    <a
      ref={card}
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onOpen();
      }}
      onPointerMove={tilt}
      onPointerLeave={reset}
      className={cn("group relative block rounded-[6px] bg-branco p-5 pt-8 text-tinta shadow-[0_18px_30px_-18px_rgba(26,22,20,0.55),0_2px_0_rgba(26,22,20,0.06)] transition-transform duration-300 ease-[var(--ease-out)]", className)}
      style={{ transform: `rotate(${rest}deg)` }}
    >
      <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-4 w-4 -translate-x-1/2 rounded-full bg-cortica shadow-[0_3px_4px_rgba(0,0,0,0.35),inset_0_-2px_0_rgba(0,0,0,0.2)]" />
      {item.scan ? (
        <img src={item.scan.sm} alt="" width={480} height={360} loading={eager ? "eager" : "lazy"} className="mb-4 aspect-[4/3] w-full rounded-[3px] object-cover object-top grayscale-[35%] sepia-[25%]" />
      ) : (
        <div aria-hidden="true" className="mb-4 grid aspect-[4/3] w-full place-items-center rounded-[3px] bg-sal font-display text-[44px] font-extrabold text-cortica/40">✱</div>
      )}
      <p className="font-display text-[13px] font-semibold uppercase tracking-[0.16em] text-cortica">{pressDate(item.date, lang)}</p>
      <Title className="mt-1 font-display text-[22px] font-bold uppercase leading-[1.02] [overflow-wrap:anywhere]" lang="fr">
        {item.title}
      </Title>
    </a>
  );
}
