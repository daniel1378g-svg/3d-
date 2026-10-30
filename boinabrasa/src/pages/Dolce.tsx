import { useSite } from "@/site";
import { useArticles } from "@/content/articles";
import { PageHero } from "@/components/PageHero";
import { ArticleBody } from "@/components/ArticleBody";
import { URLS } from "@/content/facts";
import { IconExternal } from "@/components/icons";

export function Dolce() {
  const { t, lang } = useSite();
  const a = useArticles(lang)?.dolcebrigadeiro;
  return (
    <>
      <PageHero kicker={t.nav.dolce} title={t.dolce.claim} image="header-dolcebrigadeiro" />
      <section className="skin-creme py-20 md:py-28"><div className="gutter"><div className="mx-auto max-w-[760px]">
        {a && <ArticleBody blocks={a.blocks.slice(1)} />}
        <a className="pill pill-dark mt-10" href={URLS.dolce} target="_blank" rel="noopener">{t.cta.dolceSite}<IconExternal size={16} /><span className="sr-only">{t.a11y.newTab}</span></a>
      </div></div></section>
    </>
  );
}
