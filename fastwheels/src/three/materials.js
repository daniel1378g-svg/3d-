// Shared material library. Models take these instead of inventing their own, so the wrap colour, the finish
// and the overall exposure are controlled in one place.
//
// PAINT: every paintable panel of a vehicle uses that vehicle's single `paint` material (createPaint()).
// The configurator recolours it with applyPaint(). Nothing else may use it: glass, tyres, lights, trim,
// grilles, frame and engine parts keep their own materials.

export const FINISHES = ['gloss', 'satin', 'matte'];
export const EFFECTS = ['solid', 'metallic', 'pearl'];

const FINISH = {
  gloss: { roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.035, envMapIntensity: 1.15 },
  satin: { roughness: 0.48, clearcoat: 0.3, clearcoatRoughness: 0.42, envMapIntensity: 0.95 },
  matte: { roughness: 0.86, clearcoat: 0, clearcoatRoughness: 0.6, envMapIntensity: 0.7 },
};
const EFFECT = {
  solid: { metalness: 0, iridescence: 0, roughnessScale: 1 },
  metallic: { metalness: 0.62, iridescence: 0, roughnessScale: 1.12 },
  pearl: { metalness: 0.22, iridescence: 0.55, roughnessScale: 1 },
};

export function createPaint(THREE) {
  const m = new THREE.MeshPhysicalMaterial({ color: 0x1b2f8f, roughness: 0.3, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.035 });
  m.iridescenceIOR = 1.45;
  m.iridescenceThicknessRange = [180, 520];
  m.name = 'paint';
  m.userData.isPaint = true;
  return m;
}

/** Recolour a paint material. `hex` is a CSS hex string or a number. */
export function applyPaint(material, { hex, finish = 'gloss', effect = 'solid' }) {
  const f = FINISH[finish] || FINISH.gloss;
  const e = EFFECT[effect] || EFFECT.solid;
  if (hex !== undefined) material.color.set(hex);
  material.roughness = Math.min(1, f.roughness * e.roughnessScale);
  material.metalness = e.metalness * (finish === 'matte' ? 0.75 : 1);
  material.clearcoat = f.clearcoat;
  material.clearcoatRoughness = f.clearcoatRoughness;
  material.iridescence = e.iridescence * (finish === 'matte' ? 0.6 : 1);
  material.envMapIntensity = f.envMapIntensity;
  material.needsUpdate = true;
}

/** Non-paint materials shared by all models. One instance each; do not mutate colours on them. */
export function createMaterials(THREE) {
  const std = (o) => new THREE.MeshStandardMaterial(o);
  const phys = (o) => new THREE.MeshPhysicalMaterial(o);
  const mats = {
    // Exterior
    glass: phys({ color: 0x0b0f14, roughness: 0.06, metalness: 0, transparent: true, opacity: 0.62, envMapIntensity: 1.3, side: THREE.DoubleSide, depthWrite: false }),
    glassClear: phys({ color: 0x9fb2c0, roughness: 0.05, transparent: true, opacity: 0.22, envMapIntensity: 1.2, side: THREE.DoubleSide, depthWrite: false }),
    lens: phys({ color: 0xdfe8f2, roughness: 0.08, transparent: true, opacity: 0.35, envMapIntensity: 1.4, depthWrite: false }),
    tire: std({ color: 0x0d0d0e, roughness: 0.92, metalness: 0 }),
    rim: std({ color: 0x23252a, roughness: 0.34, metalness: 0.9, envMapIntensity: 1.1 }),
    rimBright: std({ color: 0xb9bdc4, roughness: 0.22, metalness: 1, envMapIntensity: 1.2 }),
    brakeDisc: std({ color: 0x6f7378, roughness: 0.45, metalness: 0.9 }),
    caliper: std({ color: 0x2f55d8, roughness: 0.4, metalness: 0.3 }),
    blackTrim: std({ color: 0x0b0c0e, roughness: 0.6, metalness: 0.1 }),          // grilles, diffuser, window surrounds
    blackGloss: phys({ color: 0x050607, roughness: 0.18, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05 }),
    chrome: std({ color: 0xd9dde2, roughness: 0.12, metalness: 1, envMapIntensity: 1.3 }),
    aluminium: std({ color: 0x9a9fa6, roughness: 0.38, metalness: 0.95 }),
    darkMetal: std({ color: 0x2a2c30, roughness: 0.5, metalness: 0.85 }),
    exhaust: std({ color: 0x6b6258, roughness: 0.3, metalness: 1 }),
    underbody: std({ color: 0x050506, roughness: 0.95, metalness: 0 }),
    carbon: phys({ color: 0x111316, roughness: 0.32, metalness: 0.2, clearcoat: 0.9, clearcoatRoughness: 0.12 }),
    // Lights (emissive colours; intensity is driven by the models' setLights())
    drl: std({ color: 0x111418, emissive: 0xe8f1ff, emissiveIntensity: 2.2, roughness: 0.3 }),
    tail: std({ color: 0x1a0204, emissive: 0xff1a22, emissiveIntensity: 1.6, roughness: 0.35 }),
    // Interior
    leather: std({ color: 0x141416, roughness: 0.62, metalness: 0 }),
    leatherSoft: std({ color: 0x1a1a1d, roughness: 0.78, metalness: 0 }),
    alcantara: std({ color: 0x0e0e10, roughness: 0.98, metalness: 0 }),
    headliner: std({ color: 0x0c0c0e, roughness: 1, metalness: 0 }),
    plastic: std({ color: 0x0f1012, roughness: 0.74, metalness: 0 }),
    plasticGloss: phys({ color: 0x08090a, roughness: 0.2, clearcoat: 0.8, clearcoatRoughness: 0.1 }),
    carpet: std({ color: 0x0a0a0b, roughness: 1 }),
    stitch: std({ color: 0x8f949c, roughness: 0.8 }),
    screenOff: phys({ color: 0x030405, roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.04 }),
    accentRed: std({ color: 0xc8161d, roughness: 0.45, metalness: 0.1 }),
    rubber: std({ color: 0x09090a, roughness: 0.95 }),
  };
  for (const [name, m] of Object.entries(mats)) m.name = name;
  return mats;
}
