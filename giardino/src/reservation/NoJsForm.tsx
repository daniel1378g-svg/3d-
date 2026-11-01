// The reservation request without JavaScript (BRIEF §1.5): a plain HTML form in the pre-rendered page, hidden as soon
// as the script runs (`html.js`). Proposal mode: a mailto form, so the visitor's e-mail program sends the request to
// info@pizzeriagiardino.ch; launch mode: a normal POST to the server, which answers with its own result page.
// The rules are the same as in the interactive flow: kitchen hours only, Wednesdays and the closure are named.
import { useId } from "react";
import { useSite, API_BASE } from "@/site";
import { BOOKING, CLOSURES, HOURS, fromMin, toMin } from "@shared/schedule";
import { SEATING, LIMITS } from "@shared/reservation";
import { RESTAURANT } from "@/content/restaurant";
import { fmtDate, fmtTime } from "@/lib/format";

/** every start time the kitchen hours allow, 11:30–14:45 and 17:00–21:15 */
const TIMES = HOURS.kitchen.flatMap((k) => {
  const out: string[] = [];
  for (let m = toMin(k.from); m <= toMin(k.to) - BOOKING.lastSlotBeforeKitchenClose; m += BOOKING.slotMinutes) out.push(fromMin(m));
  return out;
});

export function NoJsForm() {
  const { t, lang } = useSite();
  const id = useId();
  const r = t.reserve;
  const seatLabel: Record<string, string> = { none: r.seating.none, inside: r.seating.inside, terrace: r.seating.terrace, playroom: r.seating.playroom };
  const native = API_BASE
    ? { action: `${API_BASE}/reservations`, method: "post" }
    : { action: `mailto:${RESTAURANT.email}?subject=${encodeURIComponent(r.handoff.mailSubject(r.title))}`, method: "post", encType: "text/plain" };
  const f = (name: string) => `${id}-${name}`;
  return (
    <form className="nojs-only resv__card nojs-form" {...native}>
      <h2 className="resv__step-title">{r.title}</h2>
      <p className="muted">{API_BASE ? r.review.note : r.handoff.note}</p>
      <ul className="nojs-form__rules">
        <li>{t.hours.kitchen}: {HOURS.kitchen.map((k) => `${fmtTime(k.from, lang)}–${fmtTime(k.to, lang)}`).join(` ${t.hours.and} `)}</li>
        <li>{r.calendar.weekly}</li>
        {CLOSURES.map((c) => (
          <li key={c.id}>{c.title[lang]}: {fmtDate(c.from, lang, { day: "numeric", month: "long" })} – {fmtDate(c.to, lang, { day: "numeric", month: "long", year: "numeric" })}</li>
        ))}
        <li>{r.party.largeGroup(BOOKING.maxPartyOnline)} <a className="link num" href={RESTAURANT.phoneHref}>{RESTAURANT.phoneDisplay}</a></li>
      </ul>
      <input type="hidden" name="lang" value={lang} />
      <div className="form-grid">
        <div className="field">
          <label htmlFor={f("date")}>{r.summary.date} <span className="req" aria-hidden="true">*</span></label>
          <input id={f("date")} name="date" type="date" className="input" required />
        </div>
        <div className="field">
          <label htmlFor={f("time")}>{r.summary.time} <span className="req" aria-hidden="true">*</span></label>
          <select id={f("time")} name="time" className="input select" required defaultValue="">
            <option value="" disabled>–</option>
            {TIMES.map((x) => <option key={x} value={x}>{fmtTime(x, lang)}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor={f("party")}>{r.summary.party} <span className="req" aria-hidden="true">*</span></label>
          <input id={f("party")} name="party" type="number" className="input" min={BOOKING.minParty} max={BOOKING.maxPartyOnline} defaultValue={2} required />
        </div>
        <div className="field">
          <label htmlFor={f("children")}>{r.party.children}</label>
          <input id={f("children")} name="children" type="number" className="input" min={0} max={BOOKING.maxPartyOnline} defaultValue={0} />
        </div>
        <div className="field full">
          <label htmlFor={f("seating")}>{r.seating.label}</label>
          <select id={f("seating")} name="seating" className="input select" defaultValue="none">
            {SEATING.map((s) => <option key={s} value={s}>{seatLabel[s]}</option>)}
          </select>
        </div>
        <div className="field full">
          <label htmlFor={f("notes")}>{r.seating.notes}</label>
          <textarea id={f("notes")} name="notes" className="textarea" maxLength={LIMITS.notes} aria-describedby={f("notes-h")} />
          <span className="hint" id={f("notes-h")}>{r.seating.notesHint}</span>
        </div>
        <div className="field full">
          <label htmlFor={f("name")}>{r.contact.name} <span className="req" aria-hidden="true">*</span></label>
          <input id={f("name")} name="name" className="input" autoComplete="name" maxLength={LIMITS.name} required />
        </div>
        <div className="field">
          <label htmlFor={f("phone")}>{r.contact.phone} <span className="req" aria-hidden="true">*</span></label>
          <input id={f("phone")} name="phone" type="tel" className="input" autoComplete="tel" maxLength={LIMITS.phone} required />
        </div>
        <div className="field">
          <label htmlFor={f("email")}>{r.contact.email}</label>
          <input id={f("email")} name="email" type="email" className="input" autoComplete="email" maxLength={LIMITS.email} />
        </div>
        {API_BASE && (
          <>
            <div className="full">
              <label className="check">
                <input name="consent" type="checkbox" required />
                <span>{r.contact.consent} <span className="req" aria-hidden="true">*</span></span>
              </label>
            </div>
            <div aria-hidden="true" style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
              <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
          </>
        )}
        <p className="muted full" style={{ fontSize: 13 }}><span aria-hidden="true">* </span>{r.contact.required}</p>
        <div className="full" style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <button type="submit" className="btn btn--accent">{API_BASE ? r.review.submit : r.handoff.mail}</button>
          <a className="textlink num" href={RESTAURANT.phoneHref}>{r.handoff.call} {RESTAURANT.phoneDisplay}</a>
        </div>
      </div>
    </form>
  );
}
