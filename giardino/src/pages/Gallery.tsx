// Every original photograph of the current site, filterable, in a lightbox; the film and the virtual tour.
import { useMemo, useState } from "react";
import { useSite } from "@/site";
import { PageHead } from "@/components/PageHead";
import { Img, useAlt, ASSET_LIST } from "@/components/Img";
import { useLightbox } from "@/components/Lightbox";
import { FilmBand } from "@/components/Film";
import { Link } from "@/components/Link";
import { Arrow } from "@/components/icons";
import { useReveals } from "@/lib/reveal";

type Cat = "all" | "food" | "ambience" | "terrace" | "kids" | "hosts";
const CATS: Cat[] = ["all", "food", "ambience", "terrace", "kids", "hosts"];
// photographs only (the Family Destination mascot is a graphic and appears on the kids page)
const PHOTOS = ASSET_LIST.filter((a) => a.id !== "family-destination");

export default function Gallery() {
  const { t, lang, href } = useSite();
  const alt = useAlt();
  const [cat, setCat] = useState<Cat>("all");
  useReveals(`gallery-${lang}-${cat}`);
  const list = useMemo(() => (cat === "all" ? PHOTOS : PHOTOS.filter((a) => a.category === cat)), [cat]);
  const ids = list.map((a) => a.id);
  const lb = useLightbox(ids);
  return (
    <>
      <PageHead kicker={t.galleryPage.kicker} title={t.galleryPage.title} lead={<p>{t.galleryPage.lead(PHOTOS.length)}</p>} />
      <section className="wrap" style={{ paddingBottom: "clamp(80px, 10vw, 140px)" }} aria-labelledby="g-count">
        <div className="gallery-filters" role="group" aria-label={t.galleryPage.kicker}>
          {CATS.map((c) => {
            const n = c === "all" ? PHOTOS.length : PHOTOS.filter((a) => a.category === c).length;
            return (
              <button key={c} type="button" className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>
                {t.galleryPage.filters[c]} <span className="num" style={{ opacity: 0.8 }}>{n}</span>
              </button>
            );
          })}
        </div>
        <p id="g-count" className="muted" aria-live="polite" style={{ fontSize: 14, marginBottom: 18 }}>{t.galleryPage.count(list.length)}</p>
        <ul className="masonry" role="list" style={{ padding: 0, margin: 0 }}>
          {list.map((a, i) => (
            <li key={a.id} style={{ listStyle: "none" }} data-reveal data-delay={String((i % 3) * 60)}>
              <figure style={{ margin: 0 }}>
                <button type="button" onClick={() => lb.open(i)} aria-label={t.galleryPage.open(alt(a.id))}>
                  <Img id={a.id} sizes="(min-width: 1000px) 31vw, (min-width: 640px) 46vw, 92vw" />
                </button>
                <figcaption>{alt(a.id)} · <span className="num">{a.year}</span></figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="muted" style={{ fontSize: 13.5, marginTop: 24 }}>{t.galleryPage.credit}</p>
      </section>
      <FilmBand id="film" />
      <section className="section section--paper" aria-labelledby="tour-teaser">
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 24, justifyContent: "space-between", alignItems: "end" }}>
          <div>
            <h2 id="tour-teaser" className="display h-l">{t.galleryPage.tourTitle}</h2>
            <p className="lead" style={{ marginTop: 12 }}>{t.galleryPage.tourBody}</p>
          </div>
          <Link href={href("tour")} className="btn">{t.cta.tour}<Arrow /></Link>
        </div>
      </section>
      {lb.node}
    </>
  );
}
