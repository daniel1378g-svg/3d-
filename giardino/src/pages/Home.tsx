// Home: the visitor's journey – welcome, story, kitchen, menus, hosts, family, film, photographs, reservation, visit,
// services. Section anchors are language-neutral, so a language switch lands on the same section.
// Every section below the hero is its own Suspense boundary: React hydrates them one by one and yields to the browser
// in between, so hydrating the long page never becomes one long task (TBT, INP).
import { Suspense, type ReactNode } from "react";
import { Hero } from "@/home/Hero";
import { Story, Kitchen, Carta, Hosts, Family, GalleryTeaser, ReserveSection, VisitSection, Services } from "@/home/Sections";
import { FilmBand } from "@/components/Film";
import { useReveals } from "@/lib/reveal";
import { useSite } from "@/site";
import { ANCHORS } from "@/routes";

const Part = ({ children }: { children: ReactNode }) => <Suspense fallback={null}>{children}</Suspense>;

export default function Home() {
  const { lang } = useSite();
  useReveals(`home-${lang}`);
  return (
    <>
      <Hero />
      <Part><Story /></Part>
      <Part><Kitchen /></Part>
      <Part><Carta /></Part>
      <Part><Hosts /></Part>
      <Part><Family /></Part>
      <Part><FilmBand id={ANCHORS.film} /></Part>
      <Part><GalleryTeaser /></Part>
      <Part><ReserveSection /></Part>
      <Part><VisitSection /></Part>
      <Part><Services /></Part>
    </>
  );
}
