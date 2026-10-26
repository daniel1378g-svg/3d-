// Pre-renders the page for the Artifact preview (run by scripts/build-artifact.mjs).
import { renderToString } from "react-dom/server";
import { introScript } from "@/components/Intro";
import { Site } from "@/components/Site";
import { drawnTitle } from "@/lib/drawnTitles";

export function render() {
  const titles = {
    hero: drawnTitle("boaNasHoras"),
    menus: drawnTitle("osNossosMenus"),
    contact: drawnTitle("falaConnosco"),
  };
  return { markup: renderToString(<Site titles={titles} />), titles, introScript };
}
