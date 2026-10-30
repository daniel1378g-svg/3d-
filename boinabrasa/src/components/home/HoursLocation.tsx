// Opening hours (today highlighted, live status in Dielsdorf time), address, routes, parking, cards.
import { useSite } from "@/site";
import { ADDRESS, APPLE_MAPS_URL, EMAIL, MAPS_URL, PHONE, WAZE_URL } from "@/content/facts";
import { zurichNow } from "@/lib/time";
import { cn } from "@/lib/utils";
import { Img } from "../Img";
import { OpenBadge } from "../OpenBadge";
import { IconCar, IconCard, IconExternal, IconMail, IconPhone, IconPin } from "../icons";

export function HoursCard({ className }: { className?: string }) {
  const { t } = useSite();
  const wd = zurichNow().weekday;
  const rows: { days: string; hours: string; on: boolean; closed?: boolean }[] = [
    { days: t.hours.days.monWed, hours: t.hours.closed, on: wd >= 1 && wd <= 3, closed: true },
    { days: t.hours.days.thuSat, hours: t.hours.thuSatHours, on: wd >= 4 && wd <= 6 },
    { days: t.hours.days.sun, hours: t.hours.sunHours, on: wd === 0 },
  ];
  return (
    <div className={className}>
      <dl className="flex flex-col">
        {rows.map((r) => (
          <div key={r.days} className={cn("flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-4", r.on ? "border-brasa" : "border-current/15")}>
            <dt className={cn("font-display text-[1.25rem] font-bold", r.on && "text-vinho-2")} style={{ fontStretch: "88%" }}>{r.days}{r.on && <span className="kicker ml-3 text-[0.62rem]">· {t.reservation.today}</span>}</dt>
            <dd className={cn("tabular", r.closed && "opacity-60")}>{r.hours}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm opacity-80">{t.hours.kitchen}</p>
      <p className="mt-3 text-sm"><strong>{t.hours.lastArrivalTitle}</strong> {t.hours.lastArrival}</p>
      <p className="text-sm opacity-80">{t.hours.later}</p>
    </div>
  );
}

export function HoursLocation() {
  const { t } = useSite();
  return (
    <section id="oeffnungszeiten" data-anchor="oeffnungszeiten" className="skin-creme py-24 md:py-32" aria-labelledby="hours-title">
      <div className="gutter">
        <div className="wrap grid gap-14 lg:grid-cols-2">
          <div>
            <h2 id="hours-title" className="display text-[clamp(3rem,7vw,7rem)] text-vinho">{t.hours.title}</h2>
            <div className="mt-5"><OpenBadge className="bg-vinho/10 text-tinta" /></div>
            <HoursCard className="mt-8 text-tinta" />
          </div>
          <div>
            <h2 className="display text-[clamp(3rem,7vw,7rem)] text-vinho">{t.location.title}</h2>
            <address className="mt-6 flex flex-col gap-3 not-italic text-[1.1rem] text-tinta">
              <span className="flex items-start gap-3"><IconPin className="mt-0.5 text-brasa" />{ADDRESS.street}<br />{ADDRESS.zip} {ADDRESS.city}</span>
              <a className="flex items-center gap-3 link-u" href={PHONE.href}><IconPhone className="text-brasa" />{t.a11y.phone}: {PHONE.display}</a>
              <a className="flex items-center gap-3 link-u" href={`mailto:${EMAIL}`}><IconMail className="text-brasa" />{t.a11y.email}: {EMAIL}</a>
            </address>
            <a href={MAPS_URL} target="_blank" rel="noopener" className="group relative mt-8 block overflow-hidden rounded-[28px] ring-1 ring-tinta/10">
              <Img id="map" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[16/7] w-full" imgClassName="sepia-[0.35] saturate-[0.8] transition-transform duration-700 group-hover:scale-[1.03]" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full text-boi drop-shadow-lg" aria-hidden="true"><IconPin size={44} /></span>
              <span className="pill pill-dark pill-sm absolute bottom-4 left-4">{t.cta.openMaps}<IconExternal size={15} /><span className="sr-only">{t.a11y.newTab}</span></span>
            </a>
            <p className="mt-2 text-xs text-tinta/75">{t.location.mapNote}</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="kicker mr-1 text-tinta/75">{t.location.routeWith}</span>
              <a className="chip text-tinta" href={MAPS_URL} target="_blank" rel="noopener">Google Maps</a>
              <a className="chip text-tinta" href={APPLE_MAPS_URL} target="_blank" rel="noopener">Apple Maps</a>
              <a className="chip text-tinta" href={WAZE_URL} target="_blank" rel="noopener">Waze</a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[22px] bg-creme-2 p-5 text-tinta">
                <p className="kicker flex items-center gap-2 text-vinho-2"><IconCar size={18} />{t.location.parkingTitle}</p>
                <p className="mt-2 text-sm leading-relaxed text-tinta/80">{t.location.parking}</p>
              </div>
              <div className="rounded-[22px] bg-creme-2 p-5 text-tinta">
                <p className="kicker flex items-center gap-2 text-vinho-2"><IconCard size={18} />{t.location.cards}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
