// Opening hours (today highlighted, live status in Zürich time), address and routes. The map is a drawn street
// card rather than an embedded map: no third-party map loads until the visitor asks for one.
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
    </div>
  );
}

function StreetCard() {
  const { t } = useSite();
  return (
    <a href={MAPS_URL} target="_blank" rel="noopener" className="group relative block overflow-hidden rounded-[28px] bg-[#e9dfcc] ring-1 ring-tinta/10" aria-label={`${t.location.mapLabel} – ${t.cta.openMaps} ${t.a11y.newTab}`}>
      <svg viewBox="0 0 600 300" className="block w-full" aria-hidden="true">
        <rect width="600" height="300" fill="#e9dfcc" />
        {[[-20, 70, 640, 40], [-20, 210, 640, 56], [120, -20, 34, 360], [420, -20, 30, 360]].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#fbf6ec" transform={i === 3 ? "rotate(8 435 150)" : undefined} />
        ))}
        <path d="M-20 160 C 150 140 300 175 620 150" stroke="#fbf6ec" strokeWidth="22" fill="none" />
        {Array.from({ length: 18 }, (_, i) => <rect key={i} x={20 + (i % 6) * 100} y={i < 6 ? 12 : i < 12 ? 118 : 250} width="70" height={i < 6 ? 46 : i < 12 ? 30 : 40} rx="6" fill="#d9ccb3" />)}
        <text x="300" y="155" textAnchor="middle" className="font-display" fontSize="15" fontWeight="700" letterSpacing="3" fill="#8b7b62">MATTENGASSE</text>
      </svg>
      <span className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-full text-boi drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-[115%]"><IconPin size={52} /></span>
      <span className="absolute left-1/2 top-[44%] h-3 w-8 -translate-x-1/2 rounded-full bg-black/20 blur-[2px]" />
      <span className="pill pill-dark pill-sm absolute bottom-4 left-4">{t.cta.openMaps}<IconExternal size={15} /></span>
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
            <div className="mt-8"><StreetCard /></div>
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
