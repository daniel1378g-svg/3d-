// The group request (from 12 people), with the live form's three steps and fields. The restaurant's own form shows a
// calendar of likely availability from its booking system; that data is not reachable from here, so this form shows
// none and says that only the restaurant's confirmation counts. Without VITE_FORM_ENDPOINT it composes an e-mail to
// info@boinabrasa.ch with every answer.
import { useState, type FormEvent } from "react";
import { fill } from "@/i18n";
import { useSite } from "@/site";
import { useStore, booking } from "@/lib/store";
import { EMAIL, GROUP_MIN, PHONE } from "@/content/facts";
import { cn } from "@/lib/utils";
import { PageHero } from "@/components/PageHero";
import { Groups } from "@/components/home/Groups";
import { TableViz } from "@/components/reservation/TableViz";
import { IconMail, IconPhone } from "@/components/icons";

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

export function Gruppen() {
  const { t, go, href } = useSite();
  const f = t.groups.form;
  const { guests } = useStore(booking);
  const [v, setV] = useState({
    total: Math.max(GROUP_MIN, guests), kids5: 0, kids12: 0, date: "", time: "19:00", occasion: f.occasions[0], pkg: 0, exclusive: f.exclusiveOptions[0],
    company: "", invoice: false, name: "", first: "", street: "", zip: "", city: "", email: "", phone: "", other: "", consent: false, agb: false,
  });
  const [err, setErr] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "mailto" | "sent" | "error">("idle");
  const set = <K extends keyof typeof v>(k: K, val: (typeof v)[K]) => setV((s) => ({ ...s, [k]: val }));
  const kids = v.kids5 + v.kids12;
  const adults = Math.max(0, v.total - kids);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (v.total < GROUP_MIN) x.total = f.minGuests;
    if (kids > v.total) x.total = f.kidsTooMany;
    for (const k of ["date", "time", "name", "first", "street", "zip", "city", "email", "phone"] as const) if (!String(v[k]).trim()) x[k] = t.contact.fieldMissing;
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email)) x.email = t.contact.emailInvalid;
    if (!v.consent) x.consent = t.contact.consentMissing;
    if (v.pkg === 0 && !v.agb) x.agb = t.contact.fieldMissing;
    setErr(x);
    if (Object.keys(x).length) { document.getElementById(`gf-${Object.keys(x)[0]}`)?.focus(); return; }
    const lines = [
      `${f.total}: ${v.total} (${fill(f.split, { adults, kids })})`,
      `${f.kidsUnder5}: ${v.kids5}`, `${f.kids5to12}: ${v.kids12}`,
      `${f.date}: ${v.date} ${v.time}`, `${f.occasion}: ${v.occasion}`,
      `${f.offer}: ${fill(t.groups.packageLabel, { n: v.pkg })} – ${t.groups.packages[v.pkg].name}`,
      `${f.exclusive}: ${v.exclusive}`,
      v.company && `${f.company}: ${v.company}${v.invoice ? ` (${f.invoice})` : ""}`,
      `${f.name}: ${v.name}, ${f.firstName}: ${v.first}`,
      `${v.street}, ${v.zip} ${v.city}`, `${f.email}: ${v.email}`, `${f.phone}: ${v.phone}`,
      v.other && `${f.other}: ${v.other}`,
    ].filter(Boolean).join("\n");
    if (!ENDPOINT) {
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`${t.groups.pageTitle} – ${v.date} – ${v.total}`)}&body=${encodeURIComponent(lines)}`;
      setState("mailto");
      return;
    }
    try {
      const r = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ subject: t.groups.pageTitle, message: lines, email: v.email }) });
      setState(r.ok ? "sent" : "error");
    } catch { setState("error"); }
  };

  const input = (k: "date" | "time" | "company" | "name" | "first" | "street" | "zip" | "city" | "email" | "phone", label: string, type = "text", req = true, auto?: string) => (
    <label className="block">
      <span className="label">{label}{req && " *"}</span>
      <input id={`gf-${k}`} className="field" type={type} value={v[k] as string} onChange={(e) => set(k, e.target.value as never)} autoComplete={auto} aria-invalid={!!err[k]} />
      {err[k] && <span className="mt-1 block text-sm text-[#ff9b85]">{err[k]}</span>}
    </label>
  );
  const num = (k: "total" | "kids5" | "kids12", label: string) => (
    <label className="block">
      <span className="label">{label}{k === "total" && " *"}</span>
      <input id={`gf-${k}`} className="field tabular" type="number" inputMode="numeric" min={0} max={500} value={v[k]} onChange={(e) => set(k, Math.max(0, Number(e.target.value) || 0))} aria-invalid={!!err[k]} />
      {err[k] && <span className="mt-1 block text-sm text-[#ff9b85]">{err[k]}</span>}
    </label>
  );

  return (
    <>
      <PageHero kicker={t.groups.kicker} title={t.groups.pageTitle} lead={`${t.groups.pageLead} ${t.groups.guide}`} image="header-tische_2" />
      <Groups />
      <section className="skin-carvao2 py-20 md:py-28" aria-labelledby="gf-title">
        <div className="gutter">
          <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <form onSubmit={submit} noValidate className="flex flex-col gap-10">
              <h2 id="gf-title" className="display text-[clamp(2.8rem,6vw,5.6rem)]">{t.groups.pageTitle}</h2>
              <p className="text-creme/75">{t.groups.deposit}</p>
              <fieldset className="flex flex-col gap-4">
                <legend className="kicker mb-4 text-ouro">1. {f.step1}</legend>
                <div className="grid gap-4 sm:grid-cols-3">{num("total", f.total)}{num("kids5", f.kidsUnder5)}{num("kids12", f.kids5to12)}</div>
                <p className="text-sm text-creme/70">{fill(f.split, { adults, kids })}</p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {input("date", f.date, "date")}
                  {input("time", f.time, "time")}
                  <label className="block"><span className="label">{f.occasion} *</span>
                    <select className="field" value={v.occasion} onChange={(e) => set("occasion", e.target.value)}>{f.occasions.map((o) => <option key={o} className="text-tinta">{o}</option>)}</select>
                  </label>
                </div>
                <p className="text-sm text-creme/60">{t.groups.availabilityNote}</p>
              </fieldset>
              <fieldset>
                <legend className="kicker mb-4 text-ouro">2. {f.step2}</legend>
                <p className="mb-3 text-sm text-creme/70">{t.groups.packagesNote}</p>
                <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label={f.offer}>
                  {t.groups.packages.map((p, i) => (
                    <button key={p.name} type="button" role="radio" aria-checked={v.pkg === i} onClick={() => set("pkg", i)}
                      className={cn("rounded-[20px] p-4 text-left ring-2 transition-colors", v.pkg === i ? "bg-creme text-tinta ring-ouro" : "bg-creme/[0.06] ring-transparent hover:ring-creme/20")}>
                      <span className="kicker text-[0.66rem] opacity-60">{fill(t.groups.packageLabel, { n: i })}</span>
                      <span className="mt-1 block font-display text-[1.15rem] font-bold leading-tight">{p.name}</span>
                      <span className="mt-1 block text-sm opacity-80">{p.price}</span>
                      <span className="mt-2 block text-sm opacity-70">{p.services}</span>
                    </button>
                  ))}
                </div>
                <label className="mt-4 block"><span className="label">{f.exclusive}</span>
                  <select className="field" value={v.exclusive} onChange={(e) => set("exclusive", e.target.value)}>{f.exclusiveOptions.map((o) => <option key={o} className="text-tinta">{o}</option>)}</select>
                </label>
                <p className="mt-2 text-sm text-creme/60">{t.groups.rooms}</p>
              </fieldset>
              <fieldset className="flex flex-col gap-4">
                <legend className="kicker mb-4 text-ouro">3. {f.step3}</legend>
                {input("company", f.company, "text", false, "organization")}
                <label className="flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1 h-5 w-5 accent-[#f26a2e]" checked={v.invoice} onChange={(e) => set("invoice", e.target.checked)} /><span><strong>{f.invoice}</strong> — {t.groups.invoiceText}</span></label>
                <div className="grid gap-4 sm:grid-cols-2">{input("name", f.name, "text", true, "family-name")}{input("first", f.firstName, "text", true, "given-name")}</div>
                {input("street", f.street, "text", true, "street-address")}
                <div className="grid gap-4 sm:grid-cols-[0.6fr_1.4fr]">{input("zip", f.zip, "text", true, "postal-code")}{input("city", f.city, "text", true, "address-level2")}</div>
                <div className="grid gap-4 sm:grid-cols-2">{input("email", f.email, "email", true, "email")}{input("phone", f.phone, "tel", true, "tel")}</div>
                <label className="block"><span className="label">{f.other}</span><textarea className="field min-h-[110px]" value={v.other} onChange={(e) => set("other", e.target.value)} /></label>
                <label className="flex items-start gap-3 text-sm"><input id="gf-consent" type="checkbox" className="mt-1 h-5 w-5 accent-[#f26a2e]" checked={v.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={!!err.consent} />
                  <span>{f.consent} <a className="link-u" href={href("datenschutz")} onClick={(e) => { e.preventDefault(); go("datenschutz"); }}>{t.nav.datenschutz}</a> *{err.consent && <span className="block text-[#ff9b85]">{err.consent}</span>}</span></label>
                {v.pkg === 0 && (
                  <label className="flex items-start gap-3 text-sm"><input id="gf-agb" type="checkbox" className="mt-1 h-5 w-5 accent-[#f26a2e]" checked={v.agb} onChange={(e) => set("agb", e.target.checked)} aria-invalid={!!err.agb} />
                    <span>{f.agb} <a className="link-u" href={href("agb")} onClick={(e) => { e.preventDefault(); go("agb"); }}>{t.nav.agb}</a> *{err.agb && <span className="block text-[#ff9b85]">{err.agb}</span>}</span></label>
                )}
              </fieldset>
              {!ENDPOINT && <p className="text-sm text-creme/65">{t.contact.mailtoNote}</p>}
              <div className="flex flex-wrap items-center gap-4">
                <button type="submit" className="pill">{f.submit}</button>
                <p role="status" className="text-sm">{state === "mailto" ? t.contact.mailtoDone : state === "sent" ? t.contact.sent : state === "error" ? t.contact.error : ""}</p>
              </div>
            </form>
            <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
              <TableViz guests={v.total} />
              <div className="rounded-[24px] bg-creme/[0.06] p-5 ring-1 ring-creme/10">
                <p className="kicker text-ouro">{t.groups.support}</p>
                <a className="mt-3 flex items-center gap-3 link-u" href={PHONE.href}><IconPhone size={18} />{PHONE.display}</a>
                <a className="mt-2 flex items-center gap-3 link-u" href={`mailto:${EMAIL}`}><IconMail size={18} />{EMAIL}</a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
