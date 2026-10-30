import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { Reservation } from "@/components/reservation/Reservation";
import { HoursCard } from "@/components/home/HoursLocation";
import { OpenBadge } from "@/components/OpenBadge";

export function Reservieren() {
  const { t } = useSite();
  return (
    <>
      <PageHero kicker={t.reservation.kicker} title={t.reservation.title} lead={t.reservation.lead} image="fachada" />
      <section className="skin-mato py-20"><div className="gutter"><div className="wrap"><Reservation /></div></div></section>
      <section className="skin-creme py-20"><div className="gutter"><div className="wrap grid gap-8 md:grid-cols-2">
        <div><h2 className="display text-[clamp(2.6rem,5vw,4.6rem)] text-vinho">{t.hours.title}</h2><div className="mt-4"><OpenBadge className="bg-vinho/10 text-tinta" /></div></div>
        <HoursCard className="text-tinta" />
      </div></div></section>
    </>
  );
}
