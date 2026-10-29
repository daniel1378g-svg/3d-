// The home page, one long page with the live site's anchors (#accueil, #carte, #reservation, #galerie,
// #infos, #facebook-latest), each section in its own colour tone.
import "@/home/home.css";
import { RiverStory } from "@/home/RiverStory";
import { Classics } from "@/home/Classics";
import { LogoStrip, Soul, Statement } from "@/home/Bands";
import { CarteTeaser } from "@/home/CarteTeaser";
import { Reserve } from "@/home/Reserve";
import { Gallery } from "@/home/Gallery";
import { Daily } from "@/home/Daily";
import { Infos } from "@/home/Infos";
import { Deferred } from "@/components/Deferred";
import { ANCHORS } from "@/i18n";
import { useLocation } from "react-router";

export function Home() {
  const location = useLocation();
  const state = location.state as { section?: string } | null;
  const target = state?.section ?? location.hash.replace(/^#/, "");
  // a requested section below the fold mounts everything at once
  const eager = Boolean(target && target !== "accueil" && (ANCHORS as readonly string[]).includes(target));
  return (
    <>
      <RiverStory />
      <Classics />
      <Deferred
        eager={eager}
        items={[
          { node: <LogoStrip /> },
          { id: "carte", node: <CarteTeaser /> },
          { node: <Statement /> },
          { id: "reservation", node: <Reserve /> },
          { node: <Soul /> },
          { id: "galerie", node: <Gallery /> },
          { id: "facebook-latest", node: <Daily /> },
          { id: "infos", node: <Infos /> },
        ]}
      />
    </>
  );
}
