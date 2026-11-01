// Dictionaries: German is always bundled; the other three are separate chunks, fetched when the language selector
// opens (so a switch never waits) or before hydrating a page in that language. The server renderer registers all.
import de, { type Dict } from "./de";
import type { Lang } from "./langs";

export type { Dict };
export * from "./langs";

const cache: Partial<Record<Lang, Dict>> = { de };
const loaders: Record<Lang, () => Promise<{ default: Dict }>> = {
  de: async () => ({ default: de }),
  en: () => import("./en"),
  fr: () => import("./fr"),
  it: () => import("./it"),
};

export const cachedDict = (lang: Lang) => cache[lang];
export async function loadDict(lang: Lang): Promise<Dict> {
  if (!cache[lang]) cache[lang] = (await loaders[lang]()).default;
  return cache[lang]!;
}
export const preloadDicts = () => Promise.all((Object.keys(loaders) as Lang[]).map(loadDict));
export const registerDicts = (all: Partial<Record<Lang, Dict>>) => Object.assign(cache, all);
