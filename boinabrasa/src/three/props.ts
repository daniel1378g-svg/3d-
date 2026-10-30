// The knife, the skewer, the plate and the table. Units: 1 = 10 cm.
//
// Knife: a 30 cm churrasco slicing knife like the one in the reference photo: straight edge rising slightly to the
// tip, spine falling to the tip in the last third, 2.2 mm thick at the spine, a flat grind down to a 6 mm edge bevel,
// a bolster and a white moulded handle. The blade lies in its local XY plane (x along the blade, tip at +x, edge at
// y = 0, spine up), centred on z = 0, so it can be laid straight into the cut plane.
import * as THREE from "three";

export const BLADE_LENGTH = 3.0;
export const BLADE_HEIGHT = 0.36;
const SPINE_T = 0.022;
const BEVEL_H = 0.055;

function edgeY(t: number) {
  // t: 0 heel → 1 tip; the edge curves up over the last fifth
  return Math.pow(Math.max(0, (t - 0.78) / 0.22), 2.2) * 0.17;
}
function spineY(t: number) {
  if (t < 0.62) return BLADE_HEIGHT - t * 0.025;
  const s = (t - 0.62) / 0.38;
  return THREE.MathUtils.lerp(BLADE_HEIGHT - 0.0155, edgeY(1) + 0.004, Math.pow(s, 1.55));
}

/** Blade: swept cross-sections along x (wedge with an edge bevel), closed at the tip. */
function bladeGeometry(stations = 120) {
  const pos: number[] = [];
  const uv: number[] = [];
  const bevel: number[] = [];
  const idx: number[] = [];
  // ring layout (counter-clockwise seen from the heel): front face from edge to spine, spine top, back face down
  const ringFor = (t: number) => {
    const e = edgeY(t);
    const s = Math.max(spineY(t), e + 0.004);
    const h = s - e;
    const thick = SPINE_T * (1 - 0.55 * Math.pow(t, 3)) * Math.min(1, h / 0.05);
    const bh = Math.min(BEVEL_H, h * 0.4);
    const tb = thick * (bh / h) * 0.55 + 0.0008;
    // [y, z, bevelFlag]
    return [
      [e, 0, 1],
      [e + bh, tb / 2, 1],
      [e + bh, tb / 2, 0],
      [s - 0.006, thick / 2, 0],
      [s, thick / 2 - 0.002, 0],
      [s, -thick / 2 + 0.002, 0],
      [s - 0.006, -thick / 2, 0],
      [e + bh, -tb / 2, 0],
      [e + bh, -tb / 2, 1],
      [e, 0, 1],
    ];
  };
  const R = 10;
  for (let i = 0; i < stations; i++) {
    const t = i / (stations - 1);
    const x = t * BLADE_LENGTH;
    const ring = ringFor(t);
    const collapse = i === stations - 1;
    for (let j = 0; j < R; j++) {
      const [y, z, b] = ring[j];
      const yy = collapse ? edgeY(1) + 0.002 : y;
      pos.push(x, yy, collapse ? 0 : z);
      uv.push(t, j / (R - 1));
      bevel.push(b);
    }
  }
  for (let i = 0; i < stations - 1; i++) {
    for (let j = 0; j < R - 1; j++) {
      const a = i * R + j, b = i * R + j + 1, c = (i + 1) * R + j, d = (i + 1) * R + j + 1;
      idx.push(a, b, c, b, d, c);
    }
  }
  // heel cap
  const h0 = pos.length / 3;
  const heel = ringFor(0);
  for (const [y, z] of heel) { pos.push(0, y, z); uv.push(0, 0); bevel.push(0); }
  for (let j = 1; j < R - 2; j++) idx.push(h0, h0 + j + 1, h0 + j);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setAttribute("aBevel", new THREE.Float32BufferAttribute(bevel, 1));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/** A lathe-like handle: an elongated, slightly waisted capsule along −x. */
function handleGeometry() {
  const len = 1.32;
  const pts: THREE.Vector2[] = [];
  const N = 40;
  for (let i = 0; i <= N; i++) {
    const t = i / N;
    // radius profile: bolster end, waist, swell, rounded butt
    let r = 0.15 + 0.035 * Math.sin(t * Math.PI * 0.9) - 0.03 * Math.exp(-Math.pow((t - 0.18) / 0.08, 2));
    if (t > 0.9) r *= Math.sqrt(Math.max(0, 1 - Math.pow((t - 0.9) / 0.1, 2)));
    pts.push(new THREE.Vector2(Math.max(0.0001, r), t * len));
  }
  const g = new THREE.LatheGeometry(pts, 48);
  g.rotateZ(Math.PI / 2); // lathe axis y → x (pointing to −x)
  g.scale(1, 1, 0.62); // flattened oval section
  return g;
}

export function createKnife(env: THREE.Texture | null, low: boolean) {
  const group = new THREE.Group();
  group.name = "knife";
  const steel = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#c9cdd2"),
    metalness: 1,
    roughness: 0.3,
    clearcoat: 0.15,
    clearcoatRoughness: 0.12,
    envMap: env ?? undefined,
    envMapIntensity: 0.75,
  });
  steel.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nattribute float aBevel;\nvarying float vBevel;\nvarying vec2 vBladeUv;")
      .replace("#include <uv_vertex>", "#include <uv_vertex>\nvBevel = aBevel; vBladeUv = uv;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying float vBevel;\nvarying vec2 vBladeUv;\nfloat kh(vec2 p){return fract(sin(dot(p, vec2(12.9898,78.233)))*43758.5453);}")
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
        // brushed along the blade, the bevel polished brighter
        float brush = kh(vec2(floor(vBladeUv.y * 900.0), 1.0)) * 0.5 + kh(vec2(floor(vBladeUv.x * 4000.0), floor(vBladeUv.y * 60.0))) * 0.5;
        roughnessFactor = mix(0.24 + brush * 0.1, 0.12, vBevel);`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        diffuseColor.rgb *= mix(0.94 + 0.06 * kh(vec2(floor(vBladeUv.x * 600.0), 3.0)), 1.04, vBevel);`,
      );
  };
  steel.customProgramCacheKey = () => "steel" + (low ? "lo" : "hi");
  const blade = new THREE.Mesh(bladeGeometry(low ? 70 : 140), steel);
  blade.name = "blade";
  group.add(blade);

  const bolsterMat = new THREE.MeshPhysicalMaterial({ color: "#c6cbd1", metalness: 1, roughness: 0.28, envMap: env ?? undefined, envMapIntensity: 1.1 });
  const bolster = new THREE.Mesh(new THREE.CylinderGeometry(0.155, 0.17, 0.09, 40, 1), bolsterMat);
  bolster.rotation.z = Math.PI / 2;
  bolster.scale.set(1, 1, 0.55);
  bolster.position.set(-0.045, BLADE_HEIGHT * 0.48, 0);
  group.add(bolster);

  const handleMat = new THREE.MeshPhysicalMaterial({ color: "#d9d4cc", roughness: 0.58, metalness: 0, clearcoat: 0.2, clearcoatRoughness: 0.5 });
  const handle = new THREE.Mesh(handleGeometry(), handleMat);
  handle.position.set(-0.09, BLADE_HEIGHT * 0.5, 0);
  handle.rotation.y = Math.PI; // lathe grows to +x after rotateZ; flip so it grows to −x
  group.add(handle);
  return { group, blade, materials: [steel, bolsterMat, handleMat] };
}

/** Skewer: a polished round rod with a point, a guard disc and a wooden grip above the frame. */
export function createSkewer(env: THREE.Texture | null, top: number, tip: number) {
  const group = new THREE.Group();
  const steel = new THREE.MeshPhysicalMaterial({ color: "#a9adb3", metalness: 1, roughness: 0.42, envMap: env ?? undefined, envMapIntensity: 0.55 });
  const len = top - tip;
  const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, len - 0.3, 24, 1), steel);
  rod.position.y = tip + 0.3 + (len - 0.3) / 2;
  group.add(rod);
  const point = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.3, 24, 1), steel);
  point.rotation.x = Math.PI;
  point.position.y = tip + 0.15;
  group.add(point);
  const guard = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.035, 40), steel);
  guard.position.y = top - 0.05;
  group.add(guard);
  const wood = new THREE.MeshStandardMaterial({ color: "#6b3f22", roughness: 0.55 });
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.12, 1.4, 28), wood);
  grip.position.y = top + 0.68;
  group.add(grip);
  return { group, materials: [steel, wood] };
}

/** A white porcelain plate (lathe) and a dark wooden table top. */
export function createPlate(env: THREE.Texture | null, low: boolean) {
  const R = 1.28;
  const prof = [
    [0.0, 0.0], [0.86, 0.0], [0.9, 0.012], [0.94, 0.045], [1.0, 0.08], [1.12, 0.12], [R, 0.145], [R + 0.015, 0.13], [R - 0.01, 0.112], [1.12, 0.095], [0.99, 0.062], [0.93, 0.03], [0.88, 0.025], [0.0, 0.025],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  const geo = new THREE.LatheGeometry(prof.reverse(), low ? 48 : 96);
  const mat = new THREE.MeshPhysicalMaterial({ color: "#f3f0ea", roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.06, envMap: env ?? undefined, envMapIntensity: 0.9 });
  const plate = new THREE.Mesh(geo, mat);
  plate.name = "plate";
  return { plate, materials: [mat], surfaceY: 0.025, radius: R };
}

export function createTable(low: boolean) {
  const mat = new THREE.MeshStandardMaterial({ color: "#2a1a10", roughness: 0.62, metalness: 0, envMapIntensity: 0.25 });
  mat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWp;")
      .replace("#include <worldpos_vertex>", "#include <worldpos_vertex>\nvWp = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWp;\nfloat th(float x){return fract(sin(x*127.1)*43758.5453);}\nfloat tn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(th(i.x+i.y*57.0),th(i.x+1.0+i.y*57.0),f.x),mix(th(i.x+(i.y+1.0)*57.0),th(i.x+1.0+(i.y+1.0)*57.0),f.x),f.y);}")
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        // dark oiled wood: long grain along x, a few planks, fading into the dark
        vec2 q = vWp.xz;
        float grain = tn(vec2(q.x * 1.2, q.y * 26.0)) * 0.6 + tn(vec2(q.x * 0.4, q.y * 7.0)) * 0.4;
        float plank = smoothstep(0.0, 0.02, abs(fract(q.y * 0.42) - 0.5) - 0.48);
        diffuseColor.rgb *= (0.55 + 0.6 * grain) * (1.0 - 0.6 * plank);
        tableFade = 1.0 - smoothstep(0.9, 3.2, length(q - vec2(-0.4, 0.8)));
        diffuseColor.rgb *= tableFade;`,
      )
      .replace("#include <roughnessmap_fragment>", "#include <roughnessmap_fragment>\nroughnessFactor = 0.5 + 0.2 * tn(vec2(vWp.x * 1.5, vWp.z * 30.0));")
      .replace("void main() {", "float tableFade = 1.0;\nvoid main() {")
      .replace("#include <opaque_fragment>", "outgoingLight *= tableFade * tableFade;\n#include <opaque_fragment>");
  };
  mat.customProgramCacheKey = () => "table";
  const top = new THREE.Mesh(new THREE.PlaneGeometry(16, 10, 1, 1), mat);
  top.rotation.x = -Math.PI / 2;
  top.name = "table";
  void low;
  return { table: top, materials: [mat] };
}
