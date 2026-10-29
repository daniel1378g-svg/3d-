// The opening hours everywhere on the site: the live block line by line, today's hours, and "Ouvert maintenant ·
// jusqu'à 14h00" / "Fermé maintenant · réouverture à 17h00", computed in Gland (Europe/Zurich) time. The times
// never change between languages; only their format follows the language (9h00 in French, 9:00 in English).
import { useEffect, useState } from "react";
import { LOCALE, UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { TEXT } from "@/content/site";
import { HOURS, glandNow, status, type Slot } from "@content/hours";
import { cn } from "@/lib/utils";

export function fmtTime(lang: Lang, t: string) {
  const [h, m] = t.split(":").map(Number);
  return lang === "fr" || lang === "pt" ? `${h}h${String(m).padStart(2, "0")}` : `${h}:${String(m).padStart(2, "0")}`;
}
export const fmtSlot = (lang: Lang, s: Slot) => `${fmtTime(lang, s.from)} - ${fmtTime(lang, s.to)}`;
/** 0 = Sunday. */
export const dayName = (lang: Lang, day: number, style: "long" | "short" = "long") => new Intl.DateTimeFormat(LOCALE[lang], { weekday: style }).format(new Date(2024, 0, 7 + day));
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Re-renders every minute so the open/closed status stays true. */
export function useGlandNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function statusText(lang: Lang, now: Date) {
  const s = status(now);
  if (s.open) return { open: true, text: `${UI.openNow[lang]} · ${UI.until[lang]} ${fmtTime(lang, s.until)}` };
  const today = glandNow(now).day;
  const when = s.next.day === today ? "" : s.next.day === (today + 1) % 7 ? `${UI.tomorrow[lang]} ` : `${dayName(lang, s.next.day)} `;
  return { open: false, text: `${UI.closedNow[lang]} · ${UI.reopens[lang]} ${when}${UI.reopensAt[lang]} ${fmtTime(lang, s.next.from)}` };
}

/** The live/closed dot and line. */
export function OpenNow({ className, big = false }: { className?: string; big?: boolean }) {
  const { lang } = useSite();
  const now = useGlandNow();
  const s = statusText(lang, now);
  return (
    <p className={cn("flex items-center gap-3 font-display font-bold uppercase leading-[1.05]", big ? "text-[clamp(26px,2.4vw,38px)]" : "text-[18px] tracking-[0.04em]", className)}>
      <span className={cn("relative shrink-0 rounded-full", big ? "h-3.5 w-3.5" : "h-2.5 w-2.5", s.open ? "bg-[#7ee08f]" : "bg-destaque")}>
        <span className={cn("absolute inset-0 rounded-full [animation:pulse-dot_1.8s_ease-out_3]", s.open ? "bg-[#7ee08f]" : "bg-destaque")} />
      </span>
      <span>{s.text}</span>
    </p>
  );
}

/** "Horaires d'aujourd'hui : 9h00 - 14h00 · 17h00 - 22h00". */
export function TodayHours({ className }: { className?: string }) {
  const { lang } = useSite();
  const now = useGlandNow();
  const day = glandNow(now).day;
  return (
    <div className={cn("space-y-1", className)}>
      <OpenNow />
      <p className="text-[15px] opacity-85">
        {UI.todayHours[lang]} ({dayName(lang, day)}) : {HOURS[day].map((s) => fmtSlot(lang, s)).join(" · ")}
      </p>
    </div>
  );
}

/** The live hours block, line by line: "Lundi & Dimanche / 9h00 - 14h00 · Mardi à Samedi / 9h00 - 14h00 / 17h00 - 22h00". */
export function HoursList({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  const { lang } = useSite();
  const today = glandNow(useGlandNow()).day;
  const rows = [
    { days: TEXT.monSun[lang], slots: HOURS[1], on: today === 0 || today === 1 },
    { days: TEXT.tueSat[lang], slots: HOURS[2], on: today >= 2 },
  ];
  return (
    <dl className={cn("divide-y", tone === "dark" ? "divide-branco/15" : "divide-tinta/15", className)}>
      {rows.map((r) => (
        <div key={r.days} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
          <dt className="font-display text-[clamp(20px,1.6vw,26px)] font-bold uppercase">
            {r.days}
            {r.on && <span className={cn("ml-3 rounded-full px-2.5 py-1 align-middle text-[12px] tracking-[0.14em]", tone === "dark" ? "bg-destaque text-marca-escura" : "bg-marca text-branco")}>{UI.today[lang]}</span>}
          </dt>
          <dd className="font-display text-[clamp(20px,1.6vw,26px)] font-semibold tabular-nums">
            {r.slots.map((s) => (
              <span key={s.from} className="block text-right">
                {fmtSlot(lang, s)}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export { cap };
