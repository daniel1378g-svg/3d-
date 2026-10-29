import { ContactSection } from "@/components/home/ContactSection";

export default function KontaktPage() {
  return (
    <>
      <div style={{ paddingTop: "calc(var(--label-h) + 70px)" }} className="bg-fundo" />
      <ContactSection full />
    </>
  );
}
