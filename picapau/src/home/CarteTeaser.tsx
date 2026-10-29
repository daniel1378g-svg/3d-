// Section 5 (#carte, cream): a giant blue "LA CARTE" rising line by line, six numbered pills leading into
// the carte page, a collage of the restaurant's dish photos at staggered heights, a cut-out floating across.
import { copy } from "@/copy";
import { CARTE } from "@/content/carte";
import { useSite } from "@/site";
import { pad2 } from "@/lib/utils";
import { Arrow, MaskPhoto, SplitText } from "@/components/ui";
import { LottieIcon } from "@/lottie/LottieIcon";
import { Flyers } from "./Flyers";

const COLLAGE = [
  { name: "salgados-presunto", tag: "Salgados Tradicionais", cls: "aspect-[4/3] md:mt-24", from: "bottom" as const },
  { name: "gambas-ao-alho", tag: "Gambas ao Alho", cls: "aspect-[3/4]", from: "left" as const },
  { name: "pica-pau-companhia", tag: "Pica Pau & Companhia", cls: "aspect-[3/4] md:mt-40", from: "bottom" as const },
  { name: "bacalhau-a-braga", tag: "Bacalhau à Braga", cls: "aspect-[3/4] md:-mt-8", from: "right" as const },
];

export function CarteTeaser() {
  const { lang, go, href } = useSite();
  const t = copy(lang);
  return (
    <section id="carte" className="tone-nata tex-azulejo relative z-[2] overflow-hidden py-[clamp(90px,11vw,170px)]" aria-labelledby="carte-title">
      <Flyers items={[{ cutout: "polvo-a-lagareiro", left: "78%", top: "40%", width: "clamp(160px, 18vw, 300px)", depth: 0.6, rotate: [-8, 10] }]} />
      <div className="container relative grid gap-[clamp(40px,6vw,80px)]">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-end">
          <div className="grid gap-5">
            <p className="eyebrow text-francesinha">{t.badges.join(" · ")}</p>
            <SplitText as="h2" id="carte-title" by="lines" text={t.menu.kicker} className="display text-azulejo" style={{ fontSize: "var(--fs-mega)", lineHeight: 0.84 }} />
          </div>
          <div className="grid gap-5">
            <p className="lede max-w-[34ch]">{t.menu.subtitle}</p>
            <div className="group flex items-center gap-3">
              <LottieIcon name="pot" mode="hover" size={44} color="#1C1712" accent="#C23B26" />
              <a
                href={href("carte")}
                onClick={(e) => {
                  e.preventDefault();
                  go("carte");
                }}
                className="link-line text-tinta"
              >
                {t.ui.seeFullCarte} <Arrow />
              </a>
            </div>
          </div>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0" aria-label={t.ui.categories}>
          {CARTE.map((s, i) => (
            <li key={s.id}>
              <a
                href={href("carte", s.id)}
                onClick={(e) => {
                  e.preventDefault();
                  go("carte", s.id);
                }}
                className="roll-host inline-flex min-h-12 items-center gap-3 rounded-full bg-branco px-5 font-display text-[17px] font-semibold uppercase tracking-[0.1em] text-tinta no-underline shadow-[inset_0_0_0_1.5px_rgba(31,78,153,0.25)] transition-colors duration-300 hover:bg-azulejo hover:text-branco focus-visible:bg-azulejo focus-visible:text-branco"
              >
                <span className="tnum text-[13px] text-francesinha group-hover:text-dourado">{pad2(i + 1)}</span>
                {s.title[lang]}
                <span className="rounded-full bg-black/[0.06] px-2 py-0.5 text-[12px] tnum">{s.items.length}</span>
              </a>
            </li>
          ))}
        </ul>
        <ul className="m-0 grid list-none grid-cols-2 gap-[clamp(12px,2vw,28px)] p-0 md:grid-cols-4">
          {COLLAGE.map((c) => (
            <li key={c.name} className={c.cls}>
              <MaskPhoto name={c.name} className="h-full w-full rounded-[22px]" from={c.from} sizes="(max-width: 767px) 46vw, 24vw">
                <span className="tag absolute bottom-3 left-3 max-w-[calc(100%-24px)] overflow-hidden text-ellipsis">{c.tag}</span>
              </MaskPhoto>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
