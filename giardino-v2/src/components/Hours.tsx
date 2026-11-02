// Shared hours pieces: the live status (Europe/Zurich, closures first), the closure notice, today's line and the
// ordinary, accessible table of the week.
import { useEffect, useState } from "react";
import { UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { TX } from "@/content/copy";
import { PHONE_HOURS, WEEK, dayName, longDate, noticeFor, showSlot, showSlots, showTime, slotsOn, status, zurichNow, type Place, type Status } from "@/content/hours";
import { cn } from "@/lib/utils";

/** Re-evaluates every 30 s, so the page stays right across opening times, midnight and clock changes. */
export function useNow(interval = 30_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), interval);
    return () => clearInterval(id);
  }, [interval]);
  return now;
}

export function statusText(s: Status, place: Place, lang: Lang, now = new Date()) {
  const head = place === "kitchen" ? (s.open ? UI.kitchenOpen[lang] : UI.kitchenClosed[lang]) : s.open ? UI.openNow[lang] : UI.closedNow[lang];
  if (s.open) return { head, tail: `${UI.until[lang]} ${showTime(s.until, lang)}` };
  if (!s.next) return { head, tail: "" };
  const today = zurichNow(now).date;
  const tomorrow = zurichNow(new Date(now.getTime() + 864e5)).date;
  if (s.closure && s.next.date > s.closure.to) return { head, tail: `${UI.reopens[lang]} ${longDate(s.next.date, lang)} · ${showTime(s.next.from, lang)}` };
  const when = s.next.date === today ? "" : s.next.date === tomorrow ? `${UI.tomorrow[lang]} ` : `${dayName(new Date(`${s.next.date}T12:00:00Z`).getUTCDay(), lang)} `;
  return { head, tail: `${UI.opens[lang]} ${when}${UI.at[lang]} ${showTime(s.next.from, lang)}` };
}

export function OpenStatus({ place = "restaurant", className, large = false }: { place?: Place; className?: string; large?: boolean }) {
  const { lang } = useSite();
  const now = useNow();
  const s = status(place, now);
  const t = statusText(s, place, lang, now);
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <p className={cn("flex items-center gap-3 font-display font-extrabold uppercase leading-none", large ? "text-[clamp(26px,2.5vw,40px)]" : "text-[22px]")}>
        <span className={cn("relative h-3.5 w-3.5 shrink-0 rounded-full", s.open ? "bg-gold" : "bg-current opacity-40")}>{s.open && <span className="absolute inset-0 rounded-full bg-gold [animation:pulse-dot_1.8s_ease-out_3]" />}</span>
        {t.head}
      </p>
      {t.tail && <p className="font-display text-[16px] font-semibold uppercase tracking-[0.1em] opacity-85">{t.tail}</p>}
    </div>
  );
}

/** The current or announced closure, in the restaurant's own words; gone by itself after the last day. */
export function ClosureNotice({ className, tone = "gold" }: { className?: string; tone?: "gold" | "dark" | "light" }) {
  const { lang } = useSite();
  const now = useNow(60_000);
  const c = noticeFor(zurichNow(now).date);
  if (!c) return null;
  return (
    <div role="note" className={cn("rounded-[22px] p-5 md:p-6", tone === "gold" ? "bg-gold text-ink" : tone === "dark" ? "bg-ink text-cream" : "bg-white text-ink shadow-[0_20px_40px_-30px_rgba(27,27,27,0.5)]", className)}>
      <p className="eyebrow">{c.title[lang]}</p>
      <p className="mt-2 text-[16px] leading-snug md:text-[17px]">{c.text[lang]}</p>
    </div>
  );
}

/** "Today · 11:00–23:00", with closures and the rest day taken into account. */
export function TodayLine({ place = "restaurant", className }: { place?: Place; className?: string }) {
  const { lang } = useSite();
  const now = useNow(60_000);
  const date = zurichNow(now).date;
  return <p className={className}>{`${UI.today[lang]} · ${showSlots(slotsOn(place, date), lang, UI.closedDay[lang])}`}</p>;
}

/** The ordinary week as a table: restaurant and hot meals per day, Monday first. */
export function HoursTable({ className, caption = true, compact = false }: { className?: string; caption?: boolean; compact?: boolean }) {
  const { lang } = useSite();
  const order = [1, 2, 3, 4, 5, 6, 0];
  const today = zurichNow(useNow(60_000)).day;
  return (
    <table className={cn("w-full border-collapse text-left", className)}>
      {caption && <caption className="eyebrow pb-3 text-left opacity-80">{TX.regularHours[lang]}</caption>}
      <thead className="sr-only">
        <tr>
          <th scope="col">{UI.dayCol[lang]}</th>
          <th scope="col">{UI.restaurant[lang]}</th>
          {!compact && <th scope="col">{UI.hotMeals[lang]}</th>}
        </tr>
      </thead>
      <tbody>
        {order.map((d) => {
          const rest = WEEK.restaurant[d];
          return (
            <tr key={d} className={cn("border-b border-current/15 align-baseline", d === today && "font-bold")}>
              <th scope="row" className="py-2 pr-3 font-normal capitalize">
                {dayName(d, lang)}
              </th>
              <td className="whitespace-nowrap py-2 pr-3 font-display text-[17px] font-semibold tracking-[0.04em]">{rest.length ? showSlots(rest, lang, "") : UI.restDay[lang]}</td>
              {!compact && <td className="py-2 text-[15px] opacity-80">{rest.length ? showSlots(WEEK.kitchen[d], lang, "") : "—"}</td>}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={compact ? 2 : 3} className="pt-3 text-[14px] opacity-75">
            {compact && (
              <>
                {UI.hotMeals[lang]}: {showSlots(WEEK.kitchen[1], lang, "")}
                <br />
              </>
            )}
            {UI.phoneLabel[lang]}: {showSlot(PHONE_HOURS, lang)}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
