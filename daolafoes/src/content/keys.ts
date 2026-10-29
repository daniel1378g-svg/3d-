import type de from "@content/texts.de.json";
export type Keys = Exclude<keyof typeof de, "_source">;
