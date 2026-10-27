"use client";

import { LangProvider, useContent } from "@/content/i18n";
import { IS_ARTIFACT } from "@/lib/artifact";
import { Film } from "./Film";
import { Gallery } from "./Gallery";
import { Intro } from "./Intro";
import { Menus } from "./Menus";
import { Reviews } from "./Reviews";
import { ScrollEffects } from "./ScrollEffects";
import { Footer, Places, Press, Story } from "./Sections";
import { SiteHeader } from "./SiteHeader";

// The whole page, shared by the Next.js route (src/app/page.tsx) and the Artifact preview
// (src/artifact/*), so both render exactly the same markup.
export function Site() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}

// Order after the bread film: menus (with the caldo verde video) → story and experience →
// gallery → reviews → shops and contact → press and footer.
function Page() {
  const { ui } = useContent();
  return (
    <>
      {IS_ARTIFACT && (
        <p className="proposal-label" role="note">
          {ui.proposal}
        </p>
      )}
      <a className="skip-link" href="#conteudo">
        {ui.skip}
      </a>
      <SiteHeader />
      <Intro />
      <main id="conteudo">
        <Film />
        <Menus />
        <Story />
        <Gallery />
        <Reviews />
        <Places />
        <Press />
      </main>
      <Footer />
      <ScrollEffects />
    </>
  );
}
