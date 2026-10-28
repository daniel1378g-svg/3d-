import { Story } from "@/components/home/Story";
import { Commitments } from "@/components/home/Commitments";
import { Vitrine } from "@/components/home/Vitrine";
import { TeaRoom } from "@/components/home/TeaRoom";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { ContactBlock } from "@/components/ContactBlock";

/** Everything below the logo strip, in its own chunk so the first screen starts sooner. */
export default function HomeBelow() {
  return (
    <>
      <Story />
      <Commitments />
      <Vitrine />
      <TeaRoom />
      <PhotoStrip />
      <ContactBlock lead="home" />
    </>
  );
}
