// "Wissen & Genuss": the six articles of the live site, as cards; each opens as a page.
import { ARTICLES, fill, LOCALE, type ArticleKey } from "@/i18n";
import { useSite } from "@/site";
import { useArticles, type Article } from "@/content/articles";
import { PageHero } from "@/components/PageHero";
import { ArticleBody } from "@/components/ArticleBody";
import { Img } from "@/components/Img";
import { Reveal } from "@/components/Reveal";
import { IconArrow } from "@/components/icons";

const words = (a: Article) => a.blocks.reduce((n, b) => n + ("text" in b ? b.text.split(/\s+/).length : "items" in b ? b.items.join(" ").split(/\s+/).length : 0), 0);
const first = (a: Article) => (a.blocks.find((b) => b.t === "p") as { text: string } | undefined)?.text.replace(/\*\*/g, "") ?? "";

function Card({ k, a }: { k: ArticleKey; a: Article }) {
  const { t, lang, go, href } = useSite();
  return (
    <a href={href("wissen", { article: k })} onClick={(e) => { e.preventDefault(); go("wissen", { article: k }); }} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white/60 ring-1 ring-tinta/10 transition-shadow hover:shadow-xl">
      {a.cover && <Img id={a.cover} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[16/10] w-full" imgClassName="transition-transform duration-700 group-hover:scale-[1.04]" />}
      <div className="flex flex-1 flex-col p-6">
        {a.date && <p className="kicker text-[0.66rem] text-tinta/55">{new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", year: "numeric" }).format(new Date(a.date))} · {fill(t.knowledge.readTime, { n: Math.max(2, Math.round(words(a) / 200)) })}</p>}
        <h2 className="display mt-2 text-[1.9rem] text-vinho">{a.title}</h2>
        <p className="mt-3 line-clamp-3 text-tinta/75">{first(a)}</p>
        <span className="kicker mt-auto flex items-center gap-2 pt-5 text-vinho-2">{t.cta.readMore}<IconArrow size={16} className="transition-transform group-hover:translate-x-1" /></span>
      </div>
    </a>
  );
}

export function Wissen() {
  const { t, lang, article, go, href, openBooking } = useSite();
  const all = useArticles(lang);
  if (article) {
    const a = all?.[article];
    return (
      <>
        <PageHero kicker={t.knowledge.kicker} title={a?.title ?? ""} image={a?.cover}>
          {a?.date && <p className="mt-6 text-creme/70">{new Intl.DateTimeFormat(LOCALE[lang], { day: "numeric", month: "long", year: "numeric" }).format(new Date(a.date))}</p>}
        </PageHero>
        <article className="skin-creme py-20 md:py-28"><div className="gutter"><div className="mx-auto max-w-[760px]">
          <a href={href("wissen")} onClick={(e) => { e.preventDefault(); go("wissen"); }} className="kicker mb-8 inline-flex items-center gap-2 text-vinho-2">← {t.knowledge.backToList}</a>
          {a && <ArticleBody blocks={a.blocks} />}
          <button type="button" className="pill mt-12" onClick={() => openBooking()}>{t.cta.reserveNow}</button>
        </div></div></article>
        <section className="skin-creme2 py-20"><div className="gutter"><div className="wrap">
          <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-vinho">{t.knowledge.more}</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {ARTICLES.filter((k) => k !== article).slice(0, 3).map((k) => all?.[k] && <li key={k}><Card k={k} a={all[k]} /></li>)}
          </ul>
        </div></div></section>
      </>
    );
  }
  return (
    <>
      <PageHero kicker={t.knowledge.kicker} title={t.knowledge.title} lead={t.knowledge.lead} image="gaucho_grill_wissen" />
      <section className="skin-creme py-20 md:py-28"><div className="gutter"><div className="wrap">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((k, i) => all?.[k] && <Reveal as="li" key={k} delay={(i % 3) * 70}><Card k={k} a={all[k]} /></Reveal>)}
        </ul>
      </div></div></section>
    </>
  );
}
