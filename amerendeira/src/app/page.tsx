import { Film } from "@/components/Film";
import { Gallery } from "@/components/Gallery";
import { Intro, introScript } from "@/components/Intro";
import { Menus } from "@/components/Menus";
import { ScrollEffects } from "@/components/ScrollEffects";
import { Ambience, Fire, Flavour, Footer, Press, Stores, Tradition, Welcome } from "@/components/Sections";
import { SiteHeader } from "@/components/SiteHeader";
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
      <a className="skip-link" href="#conteudo">
        Saltar para o conteúdo
      </a>
      <SiteHeader />
      <Intro />
      <main id="conteudo">
        <Film headline={titles.hero} />
        <Tradition />
        <Stores />
        <Ambience />
        <Flavour />
        <Fire title={titles.menus} />
        <Menus />
        <Press />
        <Welcome />
        <Gallery />
      </main>
      <Footer title={titles.contact} />
      <ScrollEffects />
      {/* Runs while the HTML is parsed, before the app bundle: see Intro.tsx */}
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
