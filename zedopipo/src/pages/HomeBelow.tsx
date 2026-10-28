import { useEffect } from "react";
import { PlatDuJour } from "@/components/home/PlatDuJour";
import { Groups } from "@/components/home/Groups";
import { Story } from "@/components/home/Story";
import { Gallery } from "@/components/home/Gallery";
import { BookOrder } from "@/components/home/BookOrder";
import { Contact } from "@/components/home/Contact";
import { refreshScroll } from "@/lib/scroll";

export function HomeBelow() {
  useEffect(() => {
    refreshScroll();
  }, []);
  return (
    <>
      <PlatDuJour />
      <Groups />
      <Story />
      <Gallery />
      <BookOrder />
      <Contact />
    </>
  );
}
