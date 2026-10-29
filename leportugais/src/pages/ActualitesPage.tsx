// Actualités: the six posts of the live blog as a vertical timeline, newest first, verbatim in French and
// translated in the other languages, with their images and links.
import { UI } from "@/i18n";
import { useSite } from "@/site";
import { NEWS } from "@/content/news";
import { PageHero } from "@/components/PageHero";
import { FadeIn } from "@/components/Reveal";
import { IconExternal } from "@/components/icons";

export default function ActualitesPage() {
  const { lang } = useSite();
  return (
    <>
      <PageHero lang={lang} eyebrow={`${NEWS.length} · 2016 – 2021`} title={[UI.actualites[lang]]} />
      <section className="bg-sal py-20 text-tinta md:py-28">
        <div className="container-x">
          {lang !== "fr" && <p className="mb-10 text-[15px] text-cortica">{UI.translatedNote[lang]}</p>}
          <ol className="relative list-none border-l-2 border-cortica/30 pl-6 md:ml-[12%] md:pl-12">
            {NEWS.map((post) => (
              <FadeIn as="li" key={post.id} className="relative pb-16">
                <span aria-hidden="true" className="absolute -left-[33px] top-2 h-4 w-4 rounded-full bg-coral shadow-[0_0_0_6px_var(--color-sal)] md:-left-[57px]" />
                <article id={post.id} className="scroll-mt-40">
                  <h2 className="font-display text-[clamp(30px,3vw,50px)] font-extrabold uppercase leading-none text-azulejo">{post.dateline[lang]}</h2>
                  <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
                    <div className="max-w-[720px] space-y-4 text-[18px] leading-relaxed" lang={lang === "fr" ? "fr" : undefined}>
                      {post.paras.map((para, i) => {
                        const m = para[lang].match(/^\[link:(\d+)\]$/);
                        if (m) {
                          const url = post.links[+m[1]];
                          return (
                            <p key={i}>
                              <a className="link break-all text-coral" href={url} target="_blank" rel="noopener noreferrer">
                                {url}
                              </a>
                            </p>
                          );
                        }
                        return <p key={i}>{para[lang]}</p>;
                      })}
                      {post.links
                        .filter((_, i) => !post.paras.some((p) => p.fr === `[link:${i}]`))
                        .map((url) => (
                          <p key={url}>
                            <a className="link inline-flex items-center gap-2 break-all text-coral" href={url} target="_blank" rel="noopener noreferrer">
                              {url} <IconExternal size={14} />
                              <span className="sr-only">{UI.externalNew[lang]}</span>
                            </a>
                          </p>
                        ))}
                    </div>
                    {post.image && (
                      <figure className="self-start">
                        <img src={post.image.src} alt={post.image.alt[lang]} width={post.image.w} height={post.image.h} loading="lazy" className={post.image.w < 400 ? "w-[220px] rounded-[10px] shadow-xl" : "w-full rounded-[18px]"} />
                      </figure>
                    )}
                  </div>
                </article>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
