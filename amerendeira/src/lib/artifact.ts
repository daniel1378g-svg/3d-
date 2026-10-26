// Build for the claude.ai Artifact preview (scripts/build-artifact.mjs): adds the "proposta de
// design" label, keeps only WebP sources (file-count limit) and loads the menu panel eagerly.
export const IS_ARTIFACT = process.env.NEXT_PUBLIC_ARTIFACT === "1";
