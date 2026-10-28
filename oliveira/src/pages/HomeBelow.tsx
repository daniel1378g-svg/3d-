import { Route } from "@/components/home/Route";
import { KitchenTeaser } from "@/components/home/KitchenTeaser";
import { Story } from "@/components/home/Story";
import { Reviews } from "@/components/home/Reviews";
import { Gallery } from "@/components/home/Gallery";
import { Reserve } from "@/components/home/Reserve";
import { Contact } from "@/components/home/Contact";

export function HomeBelow() {
  return (
    <>
      <Route />
      <KitchenTeaser />
      <Story />
      <Reviews />
      <Gallery />
      <Reserve />
      <Contact />
    </>
  );
}
