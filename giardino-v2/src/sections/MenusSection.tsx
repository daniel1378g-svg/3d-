// The four menus as the live site publishes them (PDF on pizzeriagiardino.ch, German with French): main menu,
// children's menu, desserts, drinks. Each card says it is a PDF, its size and pages, and that it opens in a new tab.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { MENUS } from "@/content/business";
import { cn } from "@/lib/utils";
import { FadeIn, SplitReveal } from "@/components/Reveal";
import { IconExternal, IconFile } from "@/components/icons";

const TONES = ["bg-olive text-white", "bg-gold text-ink", "bg-cream text-ink", "bg-ink text-white"];

export function MenusSection({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const { lang } = useSite();
  return (
    <section id="menus" data-anchor data-nav="menus" className="tex-leaf relative bg-ivory py-24 text-ink md:py-32" aria-labelledby="menus-title">
      <div className="container-x">
        <p className="eyebrow text-muted">La carta · PDF</p>
        <SplitReveal as={heading} id="menus-title" text={TX.menusTitle[lang]} className="mt-4 fs-xxl font-extrabold" />
        <FadeIn as="p" className="lede mt-5 max-w-[760px] text-ink/85">
          {TX.menusLead[lang]}
        </FadeIn>
        <ul className="mt-12 grid list-none gap-5 md:grid-cols-2 xl:grid-cols-4">
          {MENUS.map((m, i) => (
            <FadeIn as="li" key={m.id} delay={i * 0.08}>
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                data-menu={m.id}
                className={cn("roll-host group flex h-full min-h-[300px] flex-col justify-between rounded-[26px] p-7 shadow-[0_30px_60px_-38px_rgba(27,27,27,0.6)] transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-1.5", TONES[i])}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-current/10">
                    <IconFile size={26} />
                  </span>
                  <IconExternal size={20} className="opacity-70" />
                </div>
                <div>
                  <h3 className="font-display text-[clamp(34px,2.8vw,48px)] font-extrabold uppercase leading-[0.92]">{m.title[lang]}</h3>
                  <p className="mt-3 text-[15px] leading-snug opacity-85">{m.kicker[lang]}</p>
                  <p className="meta mt-5 text-[12px] opacity-80">
                    PDF · {m.pages} {UI.pages[lang]} · {m.mb.toLocaleString(lang)} MB · {UI.pdfLang[lang]}
                  </p>
                </div>
                <span className="sr-only"> ({UI.newTab[lang]})</span>
              </a>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
