// Anreise (directions, hours, closures, map on request) and Kontakt (the contact form of the current site).
import { useId, useState, type FormEvent } from "react";
import { useSite, API_BASE } from "@/site";
import { PageHead } from "@/components/PageHead";
import { Img } from "@/components/Img";
import { HoursList, ClosureNotices, OpeningStatus } from "@/components/Hours";
import { ClickToLoad } from "@/components/ClickToLoad";
import { Link, ExtLink } from "@/components/Link";
import { RESTAURANT, mapsHref, appleMapsHref, LEUKERBAD_THERME, HOTELS } from "@/content/restaurant";
import { Arrow, Phone, Mail, Pin } from "@/components/icons";
import { isEmail } from "@shared/reservation";
import { useReveals } from "@/lib/reveal";

const { lat, lng } = RESTAURANT.geo;
const OSM = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.006}%2C${lat - 0.0032}%2C${lng + 0.006}%2C${lat + 0.0032}&layer=mapnik&marker=${lat}%2C${lng}`;

function Contacts() {
  const { t } = useSite();
  return (
    <div style={{ display: "grid", gap: 10 }}>
      <address className="address">
        {RESTAURANT.name}
        <br />
        {RESTAURANT.hosts}
        <br />
        {RESTAURANT.street}
        <br />
        {RESTAURANT.postcode} {RESTAURANT.town}
      </address>
      <a className="textlink num" href={RESTAURANT.phoneHref}><Phone />{RESTAURANT.phoneDisplay}</a>
      <a className="textlink" href={`mailto:${RESTAURANT.email}`}><Mail />{RESTAURANT.email}</a>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
        <ExtLink href={mapsHref} className="btn"><Pin />{t.cta.directions}</ExtLink>
        <ExtLink href={appleMapsHref} className="btn btn--ghost">{t.cta.appleMaps}</ExtLink>
      </div>
    </div>
  );
}

export default function Visit() {
  const { t, lang, href } = useSite();
  useReveals(`visit-${lang}`);
  const v = t.visitPage;
  return (
    <>
      <PageHead kicker={v.kicker} title={v.title} photo="garden-view" focus="62% 55%" lead={<p>{v.lead}</p>}>
        <div style={{ marginTop: 26 }}>
          <OpeningStatus />
        </div>
      </PageHead>
      <section className="section section--paper" aria-labelledby="addr">
        <div className="wrap visit">
          <div style={{ display: "grid", gap: 28, alignContent: "start" }}>
            <h2 id="addr" className="display h-m">{v.address}</h2>
            <Contacts />
            <div>
              <h3 className="display h-s" style={{ marginBottom: 14 }}>{v.map}</h3>
              <ClickToLoad src={OSM} title={v.mapTitle} button={v.mapLoad} note={v.mapNote} poster="aerial-village">
                <p className="num" style={{ fontSize: 13 }}>{v.coordinates}: {lat.toFixed(5)}, {lng.toFixed(5)}</p>
              </ClickToLoad>
            </div>
          </div>
          <div style={{ display: "grid", gap: 26, alignContent: "start" }}>
            <h2 className="display h-m">{t.hours.title}</h2>
            <HoursList />
            <ClosureNotices />
            <p className="muted" style={{ fontSize: 13.5 }}>{t.hours.source}</p>
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="spa">
        <div className="wrap visit">
          <div>
            <Img id="aerial-front" sizes="(min-width: 900px) 50vw, 92vw" style={{ aspectRatio: "4 / 3" }} />
          </div>
          <div style={{ display: "grid", gap: 34, alignContent: "center" }}>
            <div>
              <h2 id="spa" className="display h-m">{v.spaTitle}</h2>
              <p className="lead" style={{ marginTop: 12 }}>{v.spaBody}</p>
              <ExtLink href={LEUKERBAD_THERME.href} className="textlink" >{t.nav.spa}<Arrow /></ExtLink>
            </div>
            <div>
              <h2 className="display h-m">{v.hotelsTitle}</h2>
              <p className="lead" style={{ marginTop: 12 }}>{v.hotelsBody} {HOTELS.map((h) => h.name).join(" · ")}</p>
              <Link href={href("hotels")} className="textlink">{t.cta.hotels}<Arrow /></Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type Status = "idle" | "sending" | "sent" | "error";
/**
 * Contact form with the fields of the current site. Proposal mode: the browser sends nothing – «Send» opens the visitor's
 * e-mail program with the message to info@pizzeriagiardino.ch (and without JavaScript the form itself is a mailto
 * form). Launch mode: POST /api/messages, or a plain form post when JavaScript is off.
 */
export function ContactPage() {
  const { t, lang, hydrated } = useSite();
  const c = t.contactPage;
  const id = useId();
  const [f, setF] = useState({ message: "", name: "", address: "", zipCity: "", phone: "", email: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [prepared, setPrepared] = useState(false);
  useReveals(`contact-${lang}`);
  const set = (k: keyof typeof f, v: string | boolean) => setF((x) => ({ ...x, [k]: v }));
  const mailto = () => {
    const lines = [f.message.trim(), "", f.name.trim(), f.address.trim(), f.zipCity.trim(), f.phone.trim(), f.email.trim()].filter((x, i) => i < 2 || x);
    return `mailto:${RESTAURANT.email}?subject=${encodeURIComponent(`${c.title} – ${f.name.trim()}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
  };
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (!f.message.trim()) err.message = t.reserve.errors.required;
    if (!f.name.trim()) err.name = t.reserve.errors.required;
    if (!f.email.trim()) err.email = t.reserve.errors.required;
    else if (!isEmail(f.email)) err.email = t.reserve.errors.email;
    if (API_BASE && !f.consent) err.consent = t.reserve.errors.consent;
    setErrors(err);
    if (Object.keys(err).length) {
      document.getElementById(`${id}-${Object.keys(err)[0]}`)?.focus();
      return;
    }
    if (!API_BASE) {
      window.location.href = mailto();
      setPrepared(true);
      return;
    }
    setStatus("sending");
    try {
      const r = await fetch(`${API_BASE}/messages`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...f, lang }) });
      setStatus(r.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };
  const input = (k: "name" | "address" | "zipCity" | "phone" | "email", label: string, req: boolean, type = "text", auto?: string) => (
    <div className="field">
      <label htmlFor={`${id}-${k}`}>{label}{req && <span className="req" aria-hidden="true"> *</span>}</label>
      <input id={`${id}-${k}`} name={k} className="input" type={type} autoComplete={auto} value={f[k]} onChange={(e) => set(k, e.target.value)} aria-invalid={!!errors[k]} required={req} aria-required={req || undefined} aria-describedby={`${id}-${k}-e`} />
      <span id={`${id}-${k}-e`}>{errors[k] && <span className="error">{errors[k]}</span>}</span>
    </div>
  );
  // without JavaScript the same form still works: as a mailto form (proposal) or a plain POST (launch)
  const native = API_BASE ? { action: `${API_BASE}/messages`, method: "post" } : { action: `mailto:${RESTAURANT.email}`, method: "post", encType: "text/plain" };
  return (
    <>
      <PageHead kicker={c.kicker} title={c.title} lead={<p>{c.lead}</p>} />
      <section className="wrap visit" style={{ paddingBottom: "clamp(80px, 10vw, 140px)" }} aria-label={c.title}>
        <div>
          {status === "sent" ? (
            <div className="notice notice--ok" role="status"><strong>{c.sent}</strong></div>
          ) : (
            <form onSubmit={submit} noValidate={hydrated} className="form-grid" style={{ marginTop: 0 }} {...native}>
              <input type="hidden" name="lang" value={lang} />
              {!API_BASE && <p className="notice full" role="note">{c.offline}</p>}
              <div className="field full">
                <label htmlFor={`${id}-message`}>{c.message}<span className="req" aria-hidden="true"> *</span></label>
                <textarea id={`${id}-message`} name="message" className="textarea" value={f.message} onChange={(e) => set("message", e.target.value)} aria-invalid={!!errors.message} required aria-required="true" maxLength={4000} aria-describedby={`${id}-message-e`} />
                <span id={`${id}-message-e`}>{errors.message && <span className="error">{errors.message}</span>}</span>
              </div>
              <div className="full">{input("name", c.name, true, "text", "name")}</div>
              {input("address", c.address, false, "text", "street-address")}
              {input("zipCity", c.town, false, "text", "address-level2")}
              {input("phone", c.phone, false, "tel", "tel")}
              {input("email", c.email, true, "email", "email")}
              {API_BASE && (
                <div aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
                  <label>Website<input name="website" tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} /></label>
                </div>
              )}
              {API_BASE && (
                <div className="full">
                  <label className="check">
                    <input id={`${id}-consent`} name="consent" type="checkbox" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!errors.consent} required />
                    <span>{c.consent} <span className="req" aria-hidden="true">*</span></span>
                  </label>
                  {errors.consent && <span className="error">{errors.consent}</span>}
                </div>
              )}
              <p className="muted full" style={{ fontSize: 13 }}>* {c.required}</p>
              {status === "error" && <p className="notice notice--warn full" role="alert">{c.error}</p>}
              <div className="full" role="status" aria-live="polite">{prepared && <p className="notice notice--ok">{c.prepared}</p>}</div>
              <div className="full">
                <button type="submit" className="btn" disabled={status === "sending"}>{status === "sending" ? c.sending : API_BASE ? c.send : c.sendMail}<Arrow /></button>
              </div>
            </form>
          )}
        </div>
        <div style={{ display: "grid", gap: 24, alignContent: "start" }}>
          <h2 className="display h-s">{c.direct}</h2>
          <Contacts />
          <HoursList compact />
        </div>
      </section>
    </>
  );
}
