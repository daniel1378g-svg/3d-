/// <reference types="vite/client" />
declare const __ARTIFACT__: boolean;
declare module "*.glsl?raw" {
  const src: string;
  export default src;
}
