"use client";

import { LangProvider, useContent } from "@/content/i18n";
import type { DrawnTitle } from "@/lib/drawnTitles";
import { IS_ARTIFACT } from "@/lib/artifact";
import { Film } from "./Film";
import { Gallery } from "./Gallery";
import { Intro } from "./Intro";
import { Menus } from "./Menus";
import { ScrollEffects } from "./ScrollEffects";
import { Ambience, Fire, Flavour, Footer, Press, Stores, Tradition, Welcome } from "./Sections";
import { SiteHeader } from "./SiteHeader";

export type SiteTitles = { hero: DrawnTitle; menus: DrawnTitle; contact: DrawnTitle };

// The whole page, shared by the Next.js route (src/app/page.tsx) and the Artifact preview
// (src/artifact/*), so both render exactly the same markup.
export function Site({ titles }: { titles: SiteTitles }) {
  return (
    <LangProvider>
      <Page titles={titles} />
    </LangProvider>
  );
}

function Page({ titles }: { titles: SiteTitles }) {
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
    </>
  );
}
