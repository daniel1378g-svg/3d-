// Pre-renders the page for the Artifact preview (run by scripts/build-artifact.mjs).
import { renderToString } from "react-dom/server";
import { introScript } from "@/components/Intro";
import { Site } from "@/components/Site";

export function render() {
  return { markup: renderToString(<Site />), introScript };
}
