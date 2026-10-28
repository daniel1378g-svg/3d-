import { Hero } from "@/components/home/Hero";
import { LanguageChooser } from "@/components/LanguageChooser";
import { LogoStrip } from "@/components/home/LogoStrip";
import { Story } from "@/components/home/Story";
import { Commitments } from "@/components/home/Commitments";
import { Vitrine } from "@/components/home/Vitrine";
import { TeaRoom } from "@/components/home/TeaRoom";
import { PhotoStrip } from "@/components/home/PhotoStrip";
import { ContactBlock } from "@/components/ContactBlock";

export function Home() {
  return (
    <>
      <Hero />
      <LanguageChooser />
      <LogoStrip />
      <Story />
      <Commitments />
      <Vitrine />
      <TeaRoom />
      <PhotoStrip />
      <ContactBlock lead="home" />
    </>
  );
}
