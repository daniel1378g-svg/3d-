// Section 13: the wall of ten press clippings, and the latest news post beside it.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { PRESS } from "@/content/press";
import { NEWS } from "@/content/news";
import { SplitReveal } from "../Reveal";
import { PressClip } from "../PressClip";
import { PillLink } from "../ui/Pill";
import { IconArrow } from "../icons";

export function PresseSection() {
  const { lang, href, go } = useSite();
  const latest = NEWS[0];
  return (
    <section id="presse" className="tex-azulejo relative overflow-hidden bg-sal py-24 text-tinta md:py-36" aria-labelledby="press-title">
      <div className="container-x">
        <p className="eyebrow text-cortica">13 / 15 · {PRESS.length}</p>
        <SplitReveal as="h2" id="press-title" text={[UI.presse[lang]]} className="mt-4 fs-mega font-extrabold" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]">
          <ul className="grid list-none grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
            {PRESS.map((p, i) => (
              <li key={p.id} className={i % 2 ? "sm:mt-8" : ""}>
                <PressClip item={p} lang={lang} index={i} href={href("presse", p.id)} onOpen={() => go("presse", p.id)} />
              </li>
            ))}
          </ul>
          <aside className="self-start rounded-[24px] bg-azulejo p-7 text-branco lg:sticky lg:top-28">
            <p className="eyebrow text-dourado">{UI.latestNews[lang]}</p>
            <p className="mt-3 font-display text-[28px] font-bold uppercase leading-none">{latest.dateline[lang]}</p>
            <p className="mt-4 text-[17px]">{latest.paras[0][lang]}</p>
            <PillLink
              className="mt-6"
              href={href("actualites")}
              onClick={(e) => {
                e.preventDefault();
                go("actualites");
              }}
              iconRight={<IconArrow size={18} />}
            >
              {UI.archive[lang]}
            </PillLink>
            <PillLink
              variant="ghost"
              className="mt-3"
              href={href("presse")}
              onClick={(e) => {
                e.preventDefault();
                go("presse");
              }}
            >
              {UI.pressAll[lang]}
            </PillLink>
          </aside>
        </div>
      </div>
    </section>
  );
}
