// "The distinctive pizzeria": three cards with arched photographs – Eat & Enjoy, For the Whole Family, Meet Your Hosts.
// They rise from rotateX(−60°) and opacity 0 to rest over .9 s, 160 ms apart.
import type { CSSProperties } from "react";
import { UI, type PageKey } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { useInView } from "@/lib/useInView";
import { cn } from "@/lib/utils";
import { MaskPhoto, SplitReveal, FadeIn } from "@/components/Reveal";
import { PillLink } from "@/components/ui/Pill";
import { IconArrow } from "@/components/icons";
import { OliveSprig } from "@/components/Illustrations";

const CARDS: { page: PageKey; title: keyof typeof TX; text: keyof typeof TX; hand?: keyof typeof TX; cta: "exploreMenu" | "families" | "story"; photo: string; tone: string }[] = [
  { page: "menu", title: "cardEatTitle", text: "cardEat", cta: "exploreMenu", photo: "pizza-egg", tone: "bg-olive text-white" },
  { page: "families", title: "cardFamilyTitle", text: "cardFamily", cta: "families", photo: "ship-cliffs", tone: "bg-green text-cream" },
  { page: "story", title: "cardHostsTitle", text: "cardHosts", hand: "cardHostsHand", cta: "story", photo: "hosts", tone: "bg-ink text-white" },
];

export function WelcomeCards() {
  const { lang, href, go } = useSite();
  const [ref, inView] = useInView<HTMLDivElement>(0.18);
  return (
    <section id="welcome" data-anchor className="tex-leaf relative overflow-hidden bg-ivory py-24 md:py-36" aria-labelledby="welcome-title">
      <OliveSprig className="pointer-events-none absolute -right-8 top-10 w-40 rotate-12 opacity-80 md:w-72" />
      <div className="container-x relative">
        <p className="eyebrow text-muted">Benvenuti · Leukerbad</p>
        <SplitReveal as="h2" id="welcome-title" text={TX.distinctive[lang]} className="mt-4 fs-xxl font-extrabold text-ink" />
        <FadeIn as="p" className="lede mt-6 max-w-[760px] text-ink/85">
          {TX.distinctiveLead[lang]}
        </FadeIn>
        <div ref={ref} className={cn("mt-14 grid gap-5 [perspective:1400px] md:grid-cols-3", inView && "is-in")}>
          {CARDS.map((c, i) => (
            <article key={c.page} className={cn("tilt-card flex flex-col overflow-hidden rounded-[26px] shadow-[0_30px_60px_-34px_rgba(27,27,27,0.55)]", c.tone)} style={{ transitionDelay: `${i * 160}ms` } as CSSProperties}>
              <MaskPhoto id={c.photo} sizes="(min-width: 768px) 32vw, 92vw" delay={0.15 + i * 0.1} className="arch aspect-[4/3] w-full" focus={c.photo === "hosts" ? "60% 40%" : undefined} />
              <div className="flex flex-1 flex-col p-6 md:p-7">
                <h3 className="font-display text-[clamp(32px,2.8vw,46px)] font-extrabold uppercase leading-[0.92]">{TX[c.title][lang]}</h3>
                {c.hand && <p className="mt-2 font-hand text-[26px] leading-none text-gold">{TX[c.hand][lang]}</p>}
                <p className="mt-3 flex-1 text-[16px] leading-snug opacity-90">{TX[c.text][lang]}</p>
                <PillLink
                  variant="cream"
                  size="sm"
                  className="mt-6 self-start"
                  href={href(c.page)}
                  onClick={(e) => {
                    e.preventDefault();
                    go(c.page);
                  }}
                  iconRight={<IconArrow size={16} />}
                >
                  {UI[c.cta][lang]}
                </PillLink>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
