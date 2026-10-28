import { BreakfastBuilder } from "@/components/offer/BreakfastBuilder";
import { TeaChips } from "@/components/offer/TeaChips";
import { GalleryWall } from "@/components/offer/GalleryWall";
import { CustomCake } from "@/components/offer/CustomCake";
import { ContactBlock } from "@/components/ContactBlock";

/** Everything after la carte, in its own chunk. */
export default function OfferBelow() {
  return (
    <>
      <BreakfastBuilder />
      <TeaChips />
      <GalleryWall />
      <CustomCake />
      <ContactBlock lead="offer" />
    </>
  );
}
