import { UI } from "@/i18n";
import { MENU_PAGE } from "@/copy";
import { CONTACT } from "@/content";
import { useSite } from "@/site";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";
import { ExternalIcon } from "./icons";
import { SmartImage } from "./SmartImage";

/** The two dishes the live Speisekarte page presents: Chef Parillada Argentina and Mexican BBQ Ribs. */
export function Featured() {
  const { lang } = useSite();
  return (
    <>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {MENU_PAGE.featured.map((f, i) => (
          <Reveal as="li" key={f.name} delay={i * 0.08}>
            <TiltCard className="h-full" max={6}>
              <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-line">
                <span className="relative block aspect-[16/10] w-full overflow-hidden">
                  <SmartImage id={f.photo} fill sizes="(min-width: 768px) 50vw, 100vw" reveal={i % 2 ? "right" : "left"} position="50% 55%" />
                </span>
                <div className="grid gap-3 p-6">
                  <h3 className="font-display text-3xl font-semibold tracking-tight" lang="de-CH">
                    {f.name}
                  </h3>
                  <p className="text-[17px] leading-relaxed">{f.text[lang]}</p>
                  {f.extra && <p className="text-[15px] text-muted">{f.extra[lang]}</p>}
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">{MENU_PAGE.featuredNote[lang]}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href={CONTACT.menuPdf} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-snow hover:bg-ink-2">
          {MENU_PAGE.pdfLine[lang]} (PDF)
          <ExternalIcon />
          <span className="sr-only"> ({UI.newTab[lang]})</span>
        </a>
        <a href={CONTACT.yoordi} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-ink/20 px-6 font-semibold hover:border-ink">
          {UI.yoordi[lang]}
          <ExternalIcon />
          <span className="sr-only"> ({UI.newTab[lang]})</span>
        </a>
      </div>
    </>
  );
}
