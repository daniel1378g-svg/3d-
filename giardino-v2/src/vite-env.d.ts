/// <reference types="vite/client" />
declare const __ARTIFACT__: boolean;
interface ImportMetaEnv {
  /** Formspree-compatible endpoint for the contact form. Without it the form hands over to the visitor's e-mail program. */
  readonly VITE_FORM_ENDPOINT?: string;
  /** Public origin used for canonical links, hreflang and JSON-LD. */
  readonly VITE_ORIGIN?: string;
}
