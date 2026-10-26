import { introScript } from "@/components/Intro";
import { Site } from "@/components/Site";
import { brand, contact, stores } from "@/content/site";
import { drawnTitle } from "@/lib/drawnTitles";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: brand.name,
  url: "https://amerendeira.pt/",
  logo: "https://amerendeira.pt/brand/icon-m-256.png",
  email: contact.email.label,
  telephone: "+351213972726",
  sameAs: [contact.instagram.href, contact.facebook.href],
  location: stores.map((s) => ({
    "@type": "Place",
    name: `A Merendeira — ${s.city}`,
    address: s.address.join(" "),
    hasMap: s.map,
  })),
};

export default function Home() {
  const titles = {
    hero: drawnTitle("boaNasHoras"),
    menus: drawnTitle("osNossosMenus"),
    contact: drawnTitle("falaConnosco"),
  };
  return (
    <>
      <Site titles={titles} />
      {/* Runs while the HTML is parsed, before the app bundle: see Intro.tsx */}
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
