import { useState } from "react";
import { LayoutGroup } from "motion/react";
import { UI } from "@/i18n";
import { CONTACT, DISHES, type Dish } from "@/content";
import { useSite } from "@/site";
import { DishCard, DishDetail } from "../Dishes";
import { SiteLink } from "../SiteLink";
import { Reveal } from "../Reveal";

/** Six served cards; a tap opens the dish, "Alle Gerichte" leads to the Küche page. */
export function KitchenTeaser() {
  const { lang } = useSite();
  const [open, setOpen] = useState<Dish | null>(null);
  const featured = DISHES.filter((d) => d.feature);
  return (
    <section aria-labelledby="kitchen-title" className="linen gutter overflow-x-clip pb-24 pt-6 md:pb-32">
      <div className="wrap">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="kicker text-leaf">{UI.navKitchen[lang]}</p>
            <h2 id="kitchen-title" className="display mt-2 text-[clamp(2.4rem,5.6vw,4.8rem)] font-semibold leading-none text-charcoal">{UI.kitchenTitle[lang]}</h2>
            <p className="mt-4 max-w-[46ch] text-lg text-charcoal/80">{UI.kitchenLead[lang]}</p>
          </div>
          <SiteLink page="kueche" className="btn btn-dark">{UI.allDishes[lang]} →</SiteLink>
        </Reveal>
        <LayoutGroup>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((d, i) => (
              <DishCard key={d.id} dish={d} index={i} onOpen={setOpen} />
            ))}
          </ul>
          <DishDetail dish={open} onClose={() => setOpen(null)} />
        </LayoutGroup>
        <p className="mt-10 text-[15px] text-charcoal/80">
          {UI.menuLine[lang]}{" "}
          <a href={CONTACT.phoneHref} className="font-semibold text-leaf underline underline-offset-4">{CONTACT.phone}</a>
          <span className="mx-2 opacity-40">·</span>
          {UI.noPrices[lang]}
        </p>
      </div>
    </section>
  );
}
