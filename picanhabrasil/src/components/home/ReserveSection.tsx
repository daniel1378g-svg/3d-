import { useSite } from "@/site";
import { Reservation } from "../reservation/Reservation";

export function ReserveSection() {
  const { t } = useSite();
  return (
    <section id="reservieren" data-anchor="reservieren" className="skin-mato relative overflow-hidden py-24 md:py-32" aria-labelledby="reserve-title">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-[#2f7d55] opacity-20 blur-[120px]" />
      <div className="gutter relative">
        <div className="wrap">
          <p className="kicker text-[#9fd8b6]" data-lang-stagger>{t.reservation.kicker}</p>
          <h2 id="reserve-title" className="display mt-3 text-[clamp(3.4rem,9vw,9rem)]">{t.reservation.title}</h2>
          <p className="lead measure mt-5 text-creme/85">{t.reservation.lead}</p>
          <div className="mt-14">
            <Reservation />
          </div>
        </div>
      </div>
    </section>
  );
}
