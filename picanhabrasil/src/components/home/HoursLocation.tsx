// Opening hours (today highlighted, status in Zürich time from the published hours), address and routes. No map is
// embedded (no third-party map loads until the visitor asks for one) and none is drawn: the card links to the maps.
import { useSite } from "@/site";
import { ADDRESS, APPLE_MAPS_URL, MAPS_URL, OSM_URL, PHONE } from "@/content/facts";
import { zurichNow } from "@/lib/time";
import { cn } from "@/lib/utils";
import { OpenBadge } from "../OpenBadge";
import { IconExternal, IconPhone, IconPin } from "../icons";

export function HoursCard({ className }: { className?: string }) {
  const { t } = useSite();
  const wd = zurichNow().weekday;
  const rows = [
    { days: t.hours.monFri, hours: t.hours.monFriHours, on: wd >= 1 && wd <= 5 },
    { days: t.hours.satSun, hours: t.hours.satSunHours, on: wd === 0 || wd === 6 },
  ];
  return (
    <div className={className}>
      <dl className="flex flex-col">
        {rows.map((r) => (
          <div key={r.days} className={cn("flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b py-4", r.on ? "border-brasa" : "border-current/15")}>
            <dt className={cn("font-display text-[1.25rem] font-bold", r.on && "text-vinho-2")} style={{ fontStretch: "88%" }}>{r.days}{r.on && <span className="kicker ml-3 text-[0.62rem]">· {t.reservation.today}</span>}</dt>
            <dd className="tabular">{r.hours}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-sm opacity-80">{t.hours.kitchen}</p>
      <p className="mt-1 text-sm opacity-70">{t.hours.basis}</p>
    </div>
  );
}

function AddressCard() {
  const { t } = useSite();
  return (
    <a href={MAPS_URL} target="_blank" rel="noopener" className="group relative block overflow-hidden rounded-[28px] bg-mato-2 p-7 text-creme" aria-label={`${t.location.mapLabel} – ${t.cta.openMaps} ${t.a11y.newTab}`}>
      <span aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rotate-45 rounded-[36px] bg-mato opacity-70 transition-transform duration-700 group-hover:rotate-[60deg]" />
      <span aria-hidden="true" className="absolute -right-6 -top-6 h-28 w-28 rotate-45 rounded-[20px] bg-[#f2c94c] opacity-90 transition-transform duration-700 group-hover:rotate-[30deg]" />
      <IconPin size={40} className="relative text-ouro" />
      <span className="display relative mt-10 block text-[clamp(2.4rem,5vw,3.6rem)]">{ADDRESS.street}<br />{ADDRESS.zip} {ADDRESS.city}</span>
      <span className="pill pill-cream pill-sm relative mt-6">{t.cta.openMaps}<IconExternal size={15} /></span>
    </a>
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
            <p className="mt-3 text-tinta/75">{t.location.lead}</p>
            <address className="mt-6 flex flex-col gap-3 not-italic text-[1.1rem] text-tinta">
              <span className="flex items-start gap-3"><IconPin className="mt-0.5 text-brasa" />{ADDRESS.street}, {ADDRESS.zip} {ADDRESS.city}</span>
              <a className="flex items-center gap-3 link-u" href={PHONE.href}><IconPhone className="text-brasa" />{PHONE.display}</a>
            </address>
            <div className="mt-8"><AddressCard /></div>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="kicker mr-1 text-tinta/75">{t.location.routeWith}</span>
              <a className="chip text-tinta" href={MAPS_URL} target="_blank" rel="noopener">Google Maps</a>
              <a className="chip text-tinta" href={APPLE_MAPS_URL} target="_blank" rel="noopener">Apple Maps</a>
              <a className="chip text-tinta" href={OSM_URL} target="_blank" rel="noopener">OpenStreetMap</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
