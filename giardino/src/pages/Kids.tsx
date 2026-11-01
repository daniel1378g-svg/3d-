// Kids: the restaurant's text to children, the playroom, the pirate ship and the whole kids menu.
import { useSite } from "@/site";
import { PageHead } from "@/components/PageHead";
import { Img, useAlt } from "@/components/Img";
import { useLightbox } from "@/components/Lightbox";
import { Link } from "@/components/Link";
import { MenuSection } from "./Menu";
import { MENUS } from "@/content/menu";
import { Arrow, Download } from "@/components/icons";
import { useReveals } from "@/lib/reveal";

const PLAYROOM = ["playroom-climber", "playroom-football", "playroom-mural", "playroom-slide", "playroom-ride-on", "toy-cars"];
const SHIP = ["ship-mountains", "ship-slide", "ship-cliffs", "ship-above", "ship-portrait", "pirate-masts"];
const ARCHIVE = ["pirate-kids", "pirate-climb", "pirate-slide"];
const pre = __ARTIFACT__ ? "" : "/";

export default function Kids() {
  const { t, lang, href } = useSite();
  const alt = useAlt();
  useReveals(`kids-${lang}`);
  const all = [...PLAYROOM, ...SHIP, ...ARCHIVE];
  const lb = useLightbox(all);
  const kids = MENUS.find((m) => m.id === "kids")!;
  const grid = (ids: string[], offset: number) => (
    <ul className="mosaic" role="list" style={{ padding: 0, margin: 0 }}>
      {ids.map((id, i) => (
        <li key={id} className={["m-1", "m-2", "m-3", "m-4", "m-5", "m-3"][i % 6]} style={{ listStyle: "none" }} data-reveal="mask" data-delay={String((i % 3) * 70)}>
          <button type="button" onClick={() => lb.open(offset + i)} aria-label={t.galleryPage.open(alt(id))}>
            <Img id={id} sizes="(min-width: 760px) 40vw, 92vw" />
          </button>
        </li>
      ))}
    </ul>
  );
  return (
    <>
      <PageHead kicker={t.kids.kicker} title={t.kids.title} photo="ship-cliffs" lead={<p>{t.kids.p1}</p>}>
        <p className="lead" style={{ marginTop: 14 }}>{t.kids.p2}</p>
        <p style={{ marginTop: 22, fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 24, maxWidth: "34ch", color: "var(--olive-deep)" }}>{t.kids.secret}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 28 }}>
          <img src={`${pre}images/family-destination-480.webp`} width={96} height={96} alt={alt("family-destination")} style={{ width: 96, height: 96, objectFit: "contain", transform: "rotate(-6deg)" }} loading="lazy" />
          <p className="muted" style={{ fontSize: 14.5, maxWidth: "32ch" }}>{t.kids.familyDestination}</p>
        </div>
      </PageHead>
      <section className="section section--paper" aria-labelledby="playroom">
        <div className="wrap">
          <h2 id="playroom" className="display h-l" style={{ marginBottom: 36 }} data-reveal>{t.kids.playroomTitle}</h2>
          {grid(PLAYROOM, 0)}
        </div>
      </section>
      <section className="section" aria-labelledby="ship">
        <div className="wrap">
          <h2 id="ship" className="display h-l" style={{ marginBottom: 36 }} data-reveal>{t.kids.shipTitle}</h2>
          {grid(SHIP, PLAYROOM.length)}
          <h3 className="display h-s" style={{ margin: "56px 0 20px" }}>{t.kids.archive}</h3>
          {grid(ARCHIVE, PLAYROOM.length + SHIP.length)}
        </div>
      </section>
      <section className="section section--paper" aria-labelledby="kidsmenu">
        <div className="wrap" style={{ maxWidth: 1080 }}>
          <p className="kicker">Kids World</p>
          <h2 id="kidsmenu" className="display h-l" style={{ margin: "20px 0 30px" }}>{t.kids.menuTitle}</h2>
          {kids.sections.map((s) => <MenuSection key={s.id} section={s} lang={lang} q="" />)}
          <p className="muted" style={{ fontSize: 14 }}>{kids.footnotes[0][lang]}</p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 28 }}>
            <Link href={href("menu", { search: "?m=kids" })} className="btn">{t.kids.menuLink}<Arrow /></Link>
            <a href={kids.pdf.href.replace(/^\//, pre)} className="btn btn--ghost" target="_blank" rel="noopener"><Download />PDF</a>
          </div>
        </div>
      </section>
      {lb.node}
    </>
  );
}
