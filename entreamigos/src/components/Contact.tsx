// Contact pieces shared by the home bento, the drawer and the access page: the open-now status (Geneva time),
// the hours as the site writes them, the "Itinéraire" and "Accès" tabs, the map that loads only on tap and the
// delivery links. No form: the live site has none.
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import * as Tabs from "@radix-ui/react-tabs";
import { UI, type Lang } from "@/i18n";
import { useSite } from "@/site";
import { BUSINESS, TEXT } from "@/content/site";
import { HOURS, HOUR_LINES, dayName, fmtSlots, fmtTime, localNow, status, type Status } from "@/content/hours";
import { cn } from "@/lib/utils";
import { LottieIcon } from "./lottie/LottieIcon";
import { IconExternal, IconPin } from "./icons";

/** The status, refreshed every minute. */
export function useStatus() {
  const [s, setS] = useState<Status>(() => status());
  useEffect(() => {
    const id = setInterval(() => setS(status()), 60_000);
    return () => clearInterval(id);
  }, []);
  return s;
}

export function statusText(s: Status, lang: Lang) {
  if (s.open) return { head: UI.openNow[lang], tail: `${UI.until[lang]} ${fmtTime(s.until, lang)}` };
  const today = localNow().day;
  const when = s.next.day === today ? "" : s.next.day === (today + 1) % 7 ? `${UI.tomorrow[lang]} ` : `${dayName(s.next.day, lang)} `;
  return { head: UI.closedNow[lang], tail: `${UI.reopens[lang]} ${when}${fmtTime(s.next.from, lang)}` };
}

/** "Aujourd'hui : midi et soir" / "midi" / "jusqu'à 16h00". */
export function todayLine(lang: Lang) {
  const day = localNow().day;
  if (day === 0) return `${UI.todayUntil16[lang]} ${fmtTime(HOURS[0][0].to, lang)}`;
  return HOURS[day].length > 1 ? UI.todayLunchDinner[lang] : UI.todayLunch[lang];
}

export function OpenNow({ className, large = false }: { className?: string; large?: boolean }) {
  const { lang } = useSite();
  const s = useStatus();
  const t = statusText(s, lang);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className={cn("flex items-center gap-3 font-display font-extrabold uppercase leading-none", large ? "text-[clamp(30px,2.8vw,44px)]" : "text-[26px]")}>
        <span className={cn("relative h-3.5 w-3.5 shrink-0 rounded-full", s.open ? "bg-destaque" : "bg-suave/50")}>
          {s.open && <span className="absolute inset-0 rounded-full bg-destaque [animation:pulse-dot_1.8s_ease-out_3]" />}
        </span>
        {t.head}
      </p>
      <p className="font-display text-[17px] font-semibold uppercase tracking-[0.12em] opacity-85">{t.tail}</p>
      <p className="text-[13px] opacity-75">{UI.genevaTime[lang]}</p>
    </div>
  );
}

/** The hours, line by line as on the site. */
export function HoursList({ className }: { className?: string }) {
  const { lang } = useSite();
  const today = localNow().day;
  const line = today === 1 ? 0 : today === 0 ? 2 : 1;
  return (
    <dl className={cn("grid gap-2", className)}>
      {HOUR_LINES.map((h, i) => (
        <div key={i} className={cn("flex flex-wrap items-baseline justify-between gap-x-4 border-b border-current/15 pb-2", i === line && "font-bold")}>
          <dt>{h.days[lang]} :</dt>
          <dd className="font-display text-[18px] font-semibold tracking-[0.06em]">{fmtSlots(h.slots, lang)}</dd>
        </div>
      ))}
    </dl>
  );
}

function TabsBar({ id, value, items, label }: { id: string; value: string; items: { id: string; label: string }[]; label: string }) {
  return (
    <Tabs.List aria-label={label} className="relative flex flex-wrap gap-1 border-b border-current/20">
      {items.map((t) => (
        <Tabs.Trigger key={t.id} value={t.id} className="relative px-3 pb-3 pt-1 font-display text-[16px] font-semibold uppercase tracking-[0.1em] opacity-75 data-[state=active]:opacity-100">
          {t.label}
          {value === t.id && <motion.span layoutId={id} className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-destaque" transition={{ type: "spring", stiffness: 480, damping: 38 }} />}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
}

/** "Itinéraire": Google Maps, Waze, Apple Plans, each opening only on tap. */
export function RouteTabs({ className, id = "route-line" }: { className?: string; id?: string }) {
  const { lang } = useSite();
  const [tab, setTab] = useState("google");
  const items = [
    { id: "google", label: "Google Maps", url: BUSINESS.mapUrl },
    { id: "waze", label: "Waze", url: BUSINESS.wazeUrl },
    { id: "apple", label: UI.appleMaps[lang], url: BUSINESS.appleUrl },
  ];
  return (
    <Tabs.Root value={tab} onValueChange={setTab} className={className}>
      <p className="eyebrow mb-2 opacity-80">{UI.route[lang]}</p>
      <TabsBar id={id} value={tab} items={items} label={UI.route[lang]} />
      {items.map((t) => (
        <Tabs.Content key={t.id} value={t.id} className="pt-4 outline-none">
          <a href={t.url} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
            <IconPin size={16} />
            <span className="btn-roll">
              <span>
                {UI.openRoute[lang]} · {t.label}
              </span>
              <span aria-hidden="true">
                {UI.openRoute[lang]} · {t.label}
              </span>
            </span>
            <span className="sr-only">{UI.externalNew[lang]}</span>
          </a>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

/** "Accès": Bus A, Bus 1 et 9, Parking, with the live lines. */
export function AccessTabs({ className, id = "access-line" }: { className?: string; id?: string }) {
  const { lang } = useSite();
  const [tab, setTab] = useState("a");
  const items = [
    { id: "a", label: "Bus A", text: TEXT.busA[lang] },
    { id: "19", label: "Bus 1 · 9", text: TEXT.bus19[lang] },
    { id: "p", label: TEXT.parking[lang].split(/[:·]/)[0].trim(), text: TEXT.parking[lang] },
  ];
  return (
    <Tabs.Root value={tab} onValueChange={setTab} className={className}>
      <p className="eyebrow mb-2 opacity-80">
        {UI.accessTabs[lang]} · {TEXT.tpg[lang]}
      </p>
      <TabsBar id={id} value={tab} items={items} label={UI.accessTabs[lang]} />
      {items.map((t) => (
        <Tabs.Content key={t.id} value={t.id} className="pt-4 outline-none">
          <div className="flex items-start gap-4">
            {t.id === "p" ? (
              <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-branco font-display text-2xl font-extrabold text-marca">
                P
              </span>
            ) : (
              <LottieIcon name="tram" size={48} color="currentColor" accent="#DD9933" mode="loop" />
            )}
            <p className="text-[18px]">
              {t.id === "p" && <span className="block text-[15px] opacity-80">{TEXT.byCar[lang]}</span>}
              {t.text}
            </p>
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}

/** Google Maps loads only once the visitor asks for it (privacy). The preview can't embed other sites. */
export function MapEmbed({ className }: { className?: string }) {
  const { lang } = useSite();
  const [on, setOn] = useState(false);
  if (on && !__ARTIFACT__)
    return <iframe title={UI.acces[lang]} src={BUSINESS.mapEmbed} className={cn("h-full min-h-[320px] w-full rounded-[20px] border-0", className)} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />;
  return (
    <div className={cn("grid min-h-[320px] place-items-center rounded-[20px] bg-branco/10 p-6 text-center", className)}>
      <div className="flex flex-col items-center gap-3">
        <IconPin size={36} className="text-destaque" />
        <p className="max-w-[320px] text-[15px] opacity-85">{UI.mapNote[lang]}</p>
        {on && __ARTIFACT__ ? (
          <a href={BUSINESS.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn--sm">
            Google Maps <span className="sr-only">{UI.externalNew[lang]}</span>
          </a>
        ) : (
          <button type="button" onClick={() => setOn(true)} className="btn btn--sm">
            <span className="btn-roll">
              <span>{UI.showMap[lang]}</span>
              <span aria-hidden="true">{UI.showMap[lang]}</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

/** "Pour vos livraisons :" Just Eat and UberEats, each in a new tab. */
export function DeliveryLinks({ className, size = "md", onGold = false }: { className?: string; size?: "sm" | "md" | "lg"; onGold?: boolean }) {
  const { lang } = useSite();
  const cls = size === "lg" ? "btn btn--lg" : size === "sm" ? "btn btn--sm" : "btn";
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {[
        { label: "Just Eat", url: BUSINESS.justEat },
        { label: "UberEats", url: BUSINESS.uberEats },
      ].map((d, i) => (
        <a key={d.label} href={d.url} target="_blank" rel="noopener noreferrer" className={cn(cls, onGold ? (i ? "btn--cream" : "btn--dark") : i && "btn--cream")}>
          <span className="btn-roll">
            <span>{d.label}</span>
            <span aria-hidden="true">{d.label}</span>
          </span>
          <IconExternal size={size === "lg" ? 22 : 16} />
          <span className="sr-only">{UI.externalNew[lang]}</span>
        </a>
      ))}
    </div>
  );
}
