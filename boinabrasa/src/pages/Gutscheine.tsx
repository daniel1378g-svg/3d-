import { useSite } from "@/site";
import { PageHero } from "@/components/PageHero";
import { Vouchers } from "@/components/home/Vouchers";

export function Gutscheine() {
  const { t } = useSite();
  return (
    <>
      <PageHero kicker={t.vouchers.kicker} title={t.vouchers.shopClaim} lead={t.vouchers.lead} image="header-gutscheine" />
      <Vouchers />
    </>
  );
}
