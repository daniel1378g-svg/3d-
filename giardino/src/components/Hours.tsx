// Opening hours, the live status line and closure notices – all computed from shared/schedule.ts, in Zurich time.
// The status depends on the clock, so it renders only after hydration (the static HTML shows the fixed hours).
import { CLOSURES, HOURS, openStatus, upcomingClosures, type Closure } from "@shared/schedule";
import { useNow, useSite } from "@/site";
import { fmtDate, fmtDayLong, fmtTime } from "@/lib/format";
import { addDays } from "@shared/schedule";

export function OpeningStatus({ className = "" }: { className?: string }) {
  const { t, lang } = useSite();
  const now = useNow();
  if (!now) return <p className={`status ${className}`} aria-hidden="true">&nbsp;</p>;
  const s = openStatus(now);
  const day = (ymd: string) => (ymd === addDays(now.date, 1) ? t.status.tomorrow : fmtDate(ymd, lang, { weekday: "long", day: "numeric", month: "long" }));
  let text = "";
  let tone = "closed";
  if (s.kind === "open") {
    tone = "open";
    text = t.status.openNow(fmtTime(s.until, lang)) + (s.kitchen ? ` · ${t.status.kitchen(fmtTime(s.kitchen.to, lang))}` : "");
  } else if (s.kind === "later-today") text = t.status.laterToday(fmtTime(s.from, lang));
  else if (s.kind === "closed-now") text = t.status.closedNow(day(s.next), fmtTime(s.nextFrom, lang));
  else if (s.kind === "weekly-closed") text = t.status.weeklyClosed(day(s.next), fmtTime(s.nextFrom, lang));
  else text = t.status.closure(s.closure.title[lang], fmtDate(s.closure.to, lang, { day: "numeric", month: "long" }), fmtDate(s.next, lang, { weekday: "long", day: "numeric", month: "long" }));
  return (
    <p className={`status status--${tone} ${className}`} role="status">
      <span className="status__dot" aria-hidden="true" />
      <span>{text}</span>
    </p>
  );
}

const span = (from: string, to: string, lang: Parameters<typeof fmtTime>[1]) => `${fmtTime(from, lang)}–${fmtTime(to, lang)}`;

/** The weekly hours as a definition list. */
export function HoursList({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useSite();
  const two = (spans: { from: string; to: string }[]) => spans.map((s) => span(s.from, s.to, lang)).join(` ${t.hours.and} `);
  return (
    <dl className={compact ? "hours hours--compact" : "hours"}>
      <div className="hours__row">
        <dt>{t.hours.daily}</dt>
        <dd className="num">{t.hours.openTimes(fmtTime(HOURS.open.from, lang), fmtTime(HOURS.open.to, lang))}</dd>
      </div>
      <div className="hours__row">
        <dt>{t.hours.wednesday}</dt>
        <dd aria-hidden="true">—</dd>
      </div>
      <div className="hours__row">
        <dt>{t.hours.kitchen}</dt>
        <dd className="num">{two(HOURS.kitchen)}</dd>
      </div>
      <div className="hours__row">
        <dt>{t.hours.phone}</dt>
        <dd className="num">{span(HOURS.phone.from, HOURS.phone.to, lang)}</dd>
      </div>
    </dl>
  );
}

function closureSentence(c: Closure, t: ReturnType<typeof useSite>["t"], lang: ReturnType<typeof useSite>["lang"]) {
  const dd = (ymd: string) => fmtDate(ymd, lang, { day: "numeric", month: "long", year: "numeric" });
  return t.hours.closureText(dd(c.from), dd(c.to), fmtDayLong(c.reopen, lang));
}

/**
 * Seasonal closures. Before hydration all published closures that have not ended by the build are shown; afterwards
 * only those running now or starting within four months.
 */
export function ClosureNotices({ className = "" }: { className?: string }) {
  const { t, lang } = useSite();
  const now = useNow();
  const list = now ? upcomingClosures(now) : CLOSURES;
  if (!list.length) return null;
  return (
    <div className={className}>
      {list.map((c) => (
        <aside key={c.id} className="closure" aria-label={c.title[lang]}>
          <h3>{c.title[lang]}</h3>
          <p>{closureSentence(c, t, lang)}</p>
        </aside>
      ))}
    </div>
  );
}
