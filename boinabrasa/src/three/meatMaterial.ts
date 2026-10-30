// The meat shader: MeshPhysicalMaterial with procedural colour, roughness, clear coat (juice) and relief, driven by
// `uCook` (0 raw → 1 grilled) and the per-vertex attributes from meatGeometry.ts.
//
//  • muscle outside: deep red raw meat → grey → Maillard brown → dark crust with charred flecks, edges first
//  • fat cap: creamy white → translucent gold → toasted, blistered, glossy; coarse salt melting away
//  • cut face: thin crust line → grey band → pink medium-rare core, muscle bundles and a wet sheen
//  • slice only: the vertex shader peels it away from the meat around the knife edge (hinge) and the fragment
//    shader discards the zero-thickness margin so the slice ends in a knife edge.
import * as THREE from "three";
import { NOISE } from "./glsl";

export type MeatUniforms = {
  uCook: { value: number };
  uTime: { value: number };
  uSeed: { value: number };
  uSkewerX: { value: number };
  uHingeO: { value: THREE.Vector3 };
  uAxisX: { value: THREE.Vector3 };
  uAxisY: { value: THREE.Vector3 };
  uAxisN: { value: THREE.Vector3 };
  uBendR: { value: number };
  uBendL: { value: number };
  uBendOn: { value: number };
  uLift: { value: number };
  uLiftTop: { value: number };
  uPress: { value: number };
  uPressX: { value: number };
};

const c = (hex: string) => new THREE.Color(hex);
const PALETTE = {
  raw1: c("#5a0e18"), raw2: c("#7e1b25"), rawFat: c("#e6d8c0"),
  grey: c("#6e4a3e"), brown1: c("#3d1d0e"), brown2: c("#5e3018"), crust1: c("#1d0d07"), crust2: c("#3b1d0e"), char: c("#0b0605"),
  gold1: c("#f2c873"), gold2: c("#d99c48"), toast: c("#7a4219"),
  pink1: c("#cf6f72"), pink2: c("#b84a5a"), greyBand: c("#8c5a4c"), fatIn: c("#efe0c2"),
};

const VERT_HEAD = /* glsl */ `
attribute float aFat;
attribute float aCut;
attribute float aDepth;
attribute float aEdge;
#ifdef SLICE
attribute float aThick;
varying float vThick;
#endif
varying vec3 vRest;
varying float vFat;
varying float vCut;
varying float vDepth;
varying float vEdge;
uniform float uCook;
uniform vec3 uHingeO;
uniform vec3 uAxisX;
uniform vec3 uAxisY;
uniform vec3 uAxisN;
uniform float uBendR;
uniform float uBendL;
uniform float uBendOn;
uniform float uLift;
uniform float uLiftTop;
uniform float uPress;
uniform float uPressX;

// Peel: everything above the hinge line curls away from the meat (towards +N), first in an arc of radius uBendR,
// then straight, like a slice folding over the knife and hanging down.
void peel(inout vec3 p, inout vec3 n, float isSlice) {
  vec3 d = p - uHingeO;
  float h = dot(d, uAxisY);
  float off = dot(d, uAxisN);
  float al = dot(d, uAxisX);
  // the blade sits in the cut: push the two faces apart around it (seam), from the edge up to the spine
  float seam = smoothstep(-0.006, 0.004, h) * (1.0 - smoothstep(uLiftTop - 0.03, uLiftTop, h));
  p += uAxisN * uLift * seam * (isSlice > 0.5 ? 1.0 : -aCut);
  // the edge presses into the meat before it cuts
  float dent = exp(-(h * h) / 0.0009 - (off * off) / 0.0016) * smoothstep(-0.02, 0.06, al - uPressX + 0.35) * (1.0 - smoothstep(0.0, 0.08, al - uPressX));
  p -= uAxisY * uPress * dent;
  if (isSlice < 0.5 || uBendOn < 0.001 || h <= 0.0) return;
  float R = uBendR;
  float hb = min(h, uBendL);
  float ph = hb / R * uBendOn;
  float rr = R - off;
  vec3 C = uHingeO + uAxisX * al + uAxisN * R;
  vec3 q = C - uAxisN * rr * cos(ph) + uAxisY * rr * sin(ph);
  vec3 tang = uAxisY * cos(ph) + uAxisN * sin(ph);
  q += tang * max(0.0, h - uBendL);
  q += uAxisN * uLift * seam;
  float nx = dot(n, uAxisX), ny = dot(n, uAxisY), nn = dot(n, uAxisN);
  n = uAxisX * nx + (uAxisY * cos(ph) + uAxisN * sin(ph)) * ny + (-uAxisY * sin(ph) + uAxisN * cos(ph)) * nn;
  p = q;
}
`;

const FRAG_HEAD = /* glsl */ `
#ifdef SLICE
varying float vThick;
#endif
varying vec3 vRest;
varying float vFat;
varying float vCut;
varying float vDepth;
varying float vEdge;
uniform float uCook;
uniform float uTime;
uniform float uSeed;
uniform float uSkewerX;
uniform vec3 cRaw1; uniform vec3 cRaw2; uniform vec3 cRawFat;
uniform vec3 cGrey; uniform vec3 cBrown1; uniform vec3 cBrown2; uniform vec3 cCrust1; uniform vec3 cCrust2; uniform vec3 cChar;
uniform vec3 cGold1; uniform vec3 cGold2; uniform vec3 cToast;
uniform vec3 cPink1; uniform vec3 cPink2; uniform vec3 cGreyBand; uniform vec3 cFatIn;
${NOISE}
#if OCTAVES < 3
#define CELLS(q) (0.5 + 0.5 * snoise(q))
#else
#define CELLS(q) cells(q)
#endif

struct Meat { vec3 albedo; float rough; float coat; float coatRough; float height; float glow; float sheen; };

Meat meatSurface() {
  vec3 p = vRest + vec3(uSeed * 3.17, uSeed * 1.31, uSeed * 2.23);
  float n1 = fbm4(p * 6.5);            // large blotches: how fast an area browns
  float n2 = fbm3(p * 21.0);           // medium variation
  float n3 = snoise(p * 47.0);          // fine flecks
  float salt = CELLS(p * 62.0);         // coarse salt / fibre cells
  Meat m;

  // ---------------------------------------------------------------- outside: muscle
  float stage = clamp(uCook * 1.32 - 0.24 * n1 + 0.3 * vEdge - 0.16, 0.0, 1.0);
  vec3 raw = mix(cRaw1, cRaw2, clamp(n2 * 0.7 + 0.5, 0.0, 1.0));
  raw = mix(raw, raw * vec3(0.78, 0.82, 0.95), smoothstep(-0.2, 0.5, n1) * 0.35);       // darker, purplish areas
  float marb = smoothstep(0.55, 0.72, snoise(p * vec3(30.0, 9.0, 30.0)) * 0.7 + n3 * 0.4);
  raw = mix(raw, cRawFat * 0.85, marb * 0.45 * (1.0 - smoothstep(0.1, 0.5, uCook)));   // marbling streaks
  vec3 brown = mix(cBrown1, cBrown2, clamp(n2 * 0.8 + 0.5, 0.0, 1.0));
  vec3 crust = mix(cCrust1, cCrust2, clamp(n2 * 0.9 + 0.45 + n3 * 0.15, 0.0, 1.0));
  vec3 muscle = raw;
  muscle = mix(muscle, cGrey, smoothstep(0.02, 0.28, stage));
  muscle = mix(muscle, brown, smoothstep(0.22, 0.62, stage));
  muscle = mix(muscle, crust, smoothstep(0.58, 0.98, stage));
  float charMask = smoothstep(0.55, 0.82, n3 * 0.55 + n2 * 0.45 + vEdge * 0.38) * smoothstep(0.78, 1.0, stage);
  muscle = mix(muscle, cChar, charMask * 0.85);
  // where the skewer goes through, the hot metal browns the meat a little more
  float skw = 1.0 - smoothstep(0.03, 0.09, length(vec2(vRest.x - uSkewerX, vRest.z)));
  muscle = mix(muscle, muscle * 0.55, skw * uCook);
  float bundle = CELLS(p * 26.0 + 3.0);                       // seared fibre bundles on the steak faces
  float glint = smoothstep(0.55, 0.85, snoise(p * 34.0 + 9.0)) * smoothstep(-0.1, 0.4, n1);
  float mRough = mix(0.52, 0.62, smoothstep(0.2, 0.9, stage)) - 0.25 * glint * uCook;
  float mCoat = mix(0.14, 0.45, uCook) * (0.35 + 0.65 * smoothstep(-0.3, 0.3, n1)) + 0.4 * glint * uCook;
  float ridge = smoothstep(0.08, 0.62, bundle);
  float mH = (n2 * 0.5 + n3 * 0.3) * (0.3 + stage) * 0.0045 + ridge * 0.0075 * (0.3 + stage) + (1.0 - smoothstep(0.0, 0.28, salt)) * 0.0006 * (1.0 - uCook);
  muscle *= mix(1.0, 0.45 + 0.85 * ridge * (0.65 + 0.35 * smoothstep(-0.3, 0.4, n2)), smoothstep(0.2, 0.8, stage));

  // ---------------------------------------------------------------- outside: fat cap
  float fStage = clamp(uCook * 1.22 - 0.16 * n1 + 0.2 * vEdge - 0.08, 0.0, 1.0);
  vec3 fat = cRawFat * (0.94 + 0.08 * n2);
  fat = mix(fat, mix(cGold1, cGold2, clamp(n2 * 0.8 + 0.45, 0.0, 1.0)), smoothstep(0.08, 0.62, fStage));
  // turning over the flames leaves irregular toasted patches and a few near-black crisp spots on the fat
  float toastMask = smoothstep(-0.15, 0.4, n1 * 0.8 + snoise(p * vec3(5.0, 14.0, 5.0)) * 0.45 + n3 * 0.2);
  fat = mix(fat, cToast, smoothstep(0.45, 1.0, fStage) * toastMask * 0.85);
  float crisp = smoothstep(0.58, 0.8, n2 * 0.6 + snoise(p * 18.0 + 7.0) * 0.5) * smoothstep(0.7, 1.0, fStage);
  fat = mix(fat, cChar * 1.8, crisp * 0.7);
  float fleck = smoothstep(0.62, 0.78, n3 * 0.6 + n2 * 0.5) * smoothstep(0.6, 1.0, fStage);
  fat = mix(fat, cChar * 1.4, fleck * 0.8);
  // coarse black pepper and charred specks, as in the reference
  float pep = 1.0 - smoothstep(0.0, 0.11, CELLS(p * 30.0 + 41.0));
  fat = mix(fat, vec3(0.03, 0.018, 0.012), pep * 0.85 * smoothstep(0.3, 0.8, fStage));
  muscle = mix(muscle, vec3(0.02, 0.012, 0.008), pep * 0.6 * smoothstep(0.4, 0.9, stage));
  float saltSpot = (1.0 - smoothstep(0.0, 0.16, salt)) * (1.0 - smoothstep(0.35, 0.85, uCook));
  fat = mix(fat, vec3(0.95), saltSpot * 0.7);
  float blister = 1.0 - smoothstep(0.05, 0.5, CELLS(p * 30.0 + 11.0));
  fat *= mix(1.0, 0.72 + 0.42 * blister, smoothstep(0.3, 0.8, fStage));
  float fRough = mix(0.58, 0.22, smoothstep(0.1, 0.7, fStage)) + saltSpot * -0.2;
  float fCoat = mix(0.08, 0.95, smoothstep(0.15, 0.8, fStage));
  fat = mix(fat * vec3(1.0, 0.97, 0.9), fat, smoothstep(0.0, 0.3, fStage)) * mix(0.92 + 0.1 * n2, 1.0, fStage);
  float fH = (blister * 0.0062 + n2 * 0.0022) * (0.3 + fStage) + saltSpot * 0.0012 + pep * 0.0015;

  // ---------------------------------------------------------------- cut face
  float d = vDepth;
  vec3 pink = mix(cPink1, cPink2, smoothstep(0.03, 0.11, d));
  pink *= 0.92 + 0.12 * n2;
  float bundles = smoothstep(0.0, 0.07, salt);                 // dark-ish fibre cells, pale connective lines
  pink = mix(pink * vec3(1.12, 1.05, 1.02), pink, bundles);
  pink = mix(pink, pink * 0.86, smoothstep(0.35, 0.8, n3) * 0.4);
  vec3 cutMuscle = mix(crust, cGreyBand, smoothstep(0.0018, 0.0065, d));
  cutMuscle = mix(cutMuscle, pink, smoothstep(0.012, 0.034, d));
  vec3 cutFat = mix(mix(cGold2, cGold1, 0.5), cFatIn, smoothstep(0.0025, 0.012, d));
  vec3 cutCol = mix(cutMuscle, cutFat, vFat);
  float cRough = mix(0.36, 0.3, vFat) + 0.08 * n3;
  float cH = (1.0 - bundles) * -0.0005 + n3 * 0.00025;

  // ---------------------------------------------------------------- combine
  vec3 outside = mix(muscle, fat, vFat);
  m.albedo = mix(outside, cutCol, vCut);
  m.rough = clamp(mix(mix(mRough, fRough, vFat), cRough, vCut), 0.12, 0.9);
  m.coat = mix(mix(mCoat, fCoat, vFat), 0.85, vCut);
  m.coatRough = mix(mix(0.2, 0.1, vFat), 0.12, vCut);
  m.height = mix(mix(mH, fH, vFat), cH, vCut);
  m.glow = vFat * (1.0 - vCut) * smoothstep(0.25, 0.85, fStage);
  m.sheen = vFat * smoothstep(0.3, 0.9, uCook);
  return m;
}

vec3 perturbMeat(vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection) {
  vec3 vSigmaX = normalize(dFdx(surf_pos.xyz));
  vec3 vSigmaY = normalize(dFdy(surf_pos.xyz));
  vec3 vN = surf_norm;
  vec3 R1 = cross(vSigmaY, vN);
  vec3 R2 = cross(vN, vSigmaX);
  float fDet = dot(vSigmaX, R1) * faceDirection;
  vec3 vGrad = sign(fDet) * (dHdxy.x * R1 + dHdxy.y * R2);
  return normalize(abs(fDet) * surf_norm - vGrad);
}
`;

export function createMeatMaterial(opts: { slice?: boolean; lowQuality?: boolean; seed: number; skewerX: number }) {
  const uniforms: MeatUniforms = {
    uCook: { value: 0 },
    uTime: { value: 0 },
    uSeed: { value: opts.seed },
    uSkewerX: { value: opts.skewerX },
    uHingeO: { value: new THREE.Vector3() },
    uAxisX: { value: new THREE.Vector3(1, 0, 0) },
    uAxisY: { value: new THREE.Vector3(0, 1, 0) },
    uAxisN: { value: new THREE.Vector3(0, 0, 1) },
    uBendR: { value: 0.1 },
    uBendL: { value: 0.2 },
    uBendOn: { value: 0 },
    uLift: { value: 0 },
    uLiftTop: { value: 0.4 },
    uPress: { value: 0 },
    uPressX: { value: 0 },
  };
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
    envMapIntensity: 0.8,
    sheen: 0.6,
    sheenRoughness: 0.5,
    sheenColor: new THREE.Color("#ffb46a"),
    side: THREE.FrontSide,
  });
  mat.defines = { ...(mat.defines ?? {}), OCTAVES: opts.lowQuality ? 2 : 4, ...(opts.slice ? { SLICE: "" } : {}) };
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);
    for (const [k, v] of Object.entries(PALETTE)) shader.uniforms["c" + k[0].toUpperCase() + k.slice(1)] = { value: v };
    shader.vertexShader = VERT_HEAD + shader.vertexShader
      .replace(
        "#include <beginnormal_vertex>",
        /* glsl */ `#include <beginnormal_vertex>
        vec3 meatPos = position;
        float shrink = uCook * (0.03 + 0.045 * aFat);
        meatPos *= 1.0 - shrink;
        #ifdef SLICE
        peel(meatPos, objectNormal, 1.0);
        #else
        peel(meatPos, objectNormal, 0.0);
        #endif`,
      )
      .replace(
        "#include <begin_vertex>",
        /* glsl */ `vec3 transformed = meatPos;
        vRest = position; vFat = aFat; vCut = aCut; vDepth = aDepth; vEdge = aEdge;
        #ifdef SLICE
        vThick = aThick;
        #endif`,
      );
    shader.fragmentShader = FRAG_HEAD + shader.fragmentShader
      .replace(
        "#include <color_fragment>",
        /* glsl */ `#include <color_fragment>
        #ifdef SLICE
        if (vThick < 0.0012) discard;
        #endif
        Meat meat = meatSurface();
        diffuseColor.rgb = meat.albedo;`,
      )
      .replace(
        "#include <roughnessmap_fragment>",
        /* glsl */ `#include <roughnessmap_fragment>
        roughnessFactor = meat.rough;`,
      )
      .replace(
        "#include <normal_fragment_maps>",
        /* glsl */ `#include <normal_fragment_maps>
        {
          float hgt = meat.height;
          normal = perturbMeat(-vViewPosition, normal, vec2(dFdx(hgt), dFdy(hgt)) * 1.25, faceDirection);
        }`,
      )
      .replace(
        "#include <clearcoat_normal_fragment_maps>",
        /* glsl */ `#include <clearcoat_normal_fragment_maps>
        // the juice film follows the relief: highlights break up into many small wet glints
        clearcoatNormal = normalize(mix(clearcoatNormal, normal, 0.85));`,
      )
      .replace(
        "#include <lights_physical_fragment>",
        /* glsl */ `#include <lights_physical_fragment>
        #ifdef USE_CLEARCOAT
        material.clearcoat = meat.coat;
        material.clearcoatRoughness = meat.coatRough;
        #endif
        #ifdef USE_SHEEN
        material.sheenColor *= meat.sheen;
        #endif`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        /* glsl */ `#include <emissivemap_fragment>
        {
          // rendered fat lets light through: a warm glow, strongest at grazing angles
          float fres = pow(1.0 - abs(dot(normalize(vViewPosition), normal)), 2.0);
          totalEmissiveRadiance += vec3(1.0, 0.45, 0.12) * meat.glow * (0.035 + 0.16 * fres);
        }`,
      );
  };
  mat.customProgramCacheKey = () => `meat-${opts.slice ? "slice" : "main"}-${opts.lowQuality ? "lo" : "hi"}`;
  return { material: mat, uniforms };
}
