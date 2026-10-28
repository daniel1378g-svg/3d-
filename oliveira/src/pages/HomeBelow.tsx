import { Divider } from "@/components/home/Divider";
import { KitchenTeaser } from "@/components/home/KitchenTeaser";
import { Story } from "@/components/home/Story";
import { Gallery } from "@/components/home/Gallery";
import { Reserve } from "@/components/home/Reserve";
import { Contact } from "@/components/home/Contact";

export function HomeBelow() {
  return (
    <>
      <Divider />
      <KitchenTeaser />
      <Story />
      <Gallery />
      <Reserve />
      <Contact />
    </>
  );
}
