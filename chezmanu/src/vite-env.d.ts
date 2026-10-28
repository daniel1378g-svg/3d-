/// <reference types="vite/client" />
declare const __ARTIFACT__: boolean;
declare module "@fonts";
interface ImportMetaEnv {
  /** "0" drops the permanent design-proposal band (only once the owner has approved the site). */
  readonly VITE_PROPOSAL?: string;
  /** "netlify" posts the contact form to Netlify Forms; anything else keeps it in test mode. */
  readonly VITE_FORM?: string;
}
