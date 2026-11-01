// The hosts: Pascal and Anja Loretan, in their own words.
import { useSite } from "@/site";
import { PageHead } from "@/components/PageHead";
import { Img } from "@/components/Img";
import { Link } from "@/components/Link";
import { Arrow } from "@/components/icons";
import { useReveals } from "@/lib/reveal";

export default function Hosts() {
  const { t, lang, href } = useSite();
  useReveals(`hosts-${lang}`);
  const h = t.hostsPage;
  return (
    <>
      <PageHead kicker={h.kicker} title={h.title} photo="hosts" focus="64% 45%" lead={<p>{h.p1}</p>} />
      <section className="section section--paper grain" aria-label={h.signature}>
        <div className="wrap hosts">
          <div style={{ display: "grid", gap: 18 }}>
            <Img id="entrance-terrace" className="arch" sizes="(min-width: 900px) 40vw, 92vw" style={{ aspectRatio: "4 / 5" }} />
          </div>
          <div>
            <blockquote className="hosts__quote is-static" style={{ margin: 0 }} data-reveal>«{h.quote}»</blockquote>
            <p className="lead" style={{ marginTop: 28 }} data-reveal>{h.p2}</p>
            <p className="lead" style={{ marginTop: 16 }} data-reveal>{h.p3}</p>
            <p style={{ marginTop: 26, fontFamily: "var(--serif)", fontSize: 28 }} data-reveal>{h.p4}</p>
            <p className="hosts__sig">{h.signature}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30 }}>
              <Link href={href("reserve")} className="btn btn--accent">{t.cta.reserve}<Arrow /></Link>
              <Link href={href("press")} className="btn btn--ghost">{t.nav.press}</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section" aria-hidden="false">
        <div className="wrap">
          <Img id="door-lettering" sizes="92vw" style={{ aspectRatio: "21 / 9" }} />
        </div>
      </section>
    </>
  );
}
