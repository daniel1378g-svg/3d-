import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { Order } from "@/components/home/Order";
import { MenuTeaser } from "@/components/home/MenuTeaser";

export function Bestellen() {
  const { t } = useSite();
  return (
    <>
      <PageHero kicker={t.order.kicker} title={t.nav.bestellen} lead={t.order.lead} image="prato-picanha" />
      <Order asPage />
      <MenuTeaser />
    </>
  );
}
