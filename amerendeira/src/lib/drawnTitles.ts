import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";

// The three hand-drawn titles of the original site, read from the untouched SVG files at build
// time so they can be inlined (currentColor, per-letter reveal) without redrawing them.

export type DrawnTitle = { viewBox: string; paths: string[]; label: string };

const FILES = {
  boaNasHoras: { file: "titulo-e-boa-nas-horas.svg", label: "é boa nas horas" },
  osNossosMenus: { file: "titulo-os-nossos-menus.svg", label: "os nossos menus" },
  falaConnosco: { file: "titulo-fala-connosco.svg", label: "fala connosco" },
} as const;

export type DrawnTitleId = keyof typeof FILES;

export function drawnTitle(id: DrawnTitleId): DrawnTitle {
  const { file, label } = FILES[id];
  const svg = readFileSync(path.join(process.cwd(), "public/brand", file), "utf8");
  const viewBox = /viewBox="([^"]+)"/.exec(svg)?.[1];
  const paths = [...svg.matchAll(/<path[^>]*\sd="([^"]+)"/g)].map((m) => m[1]);
  if (!viewBox || paths.length === 0) throw new Error(`Could not parse ${file}`);
  return { viewBox, paths, label };
}
