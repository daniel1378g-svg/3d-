// Hydrates the pre-rendered page inside the Artifact viewer, which owns <html>, <head> and
// <body>; the page therefore lives in #mrd-app instead of the whole document.
import { hydrateRoot } from "react-dom/client";
import { Site } from "@/components/Site";

hydrateRoot(document.getElementById("mrd-app")!, <Site />);
