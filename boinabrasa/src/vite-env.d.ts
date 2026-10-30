/// <reference types="vite/client" />
declare const __ARTIFACT__: boolean;
interface ImportMetaEnv {
  /** "0" removes the proposal band (only once the owners approve the site). */
  readonly VITE_PROPOSAL?: string;
  /** Formspree-compatible endpoint for the contact and group forms; without it they compose an e-mail instead. */
  readonly VITE_FORM_ENDPOINT?: string;
}
