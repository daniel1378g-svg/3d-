// Splits the reconstructed single-file journey into ES modules with descriptive top-level names.
// Scope-aware renames via eslint-scope; imports/exports are derived from the reference graph.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, relative } from 'node:path';
import * as acorn from 'acorn';
import * as eslintScope from 'eslint-scope';
import * as walk from 'acorn-walk';

const NAMES = {
  ei: 'createRng', Ei: 'PERM', Rh: 'fade', yo: 'grad', D0: 'perlin2', Un: 'fbm2',
  Mn: 'lerp', pe: 'clamp', wi: 'smoothstep', zh: 'easeInOutCubic', or: 'monotoneCurve', kc: 'monotoneSlope', Zh: 'hermite',
  rn: 'canvasTexture', Ch: 'asphaltTexture', Ih: 'grassTexture', Ph: 'gravelTexture', Lh: 'kerbTexture', Dh: 'barrierTexture',
  Uh: 'puffTexture', Mo: 'blobShadowTexture', Ss: 'roundedShadowTexture', Nh: 'aoFadeTexture', Fh: 'shutterTexture',
  Oh: 'glazingTexture', Bh: 'grassTuftTexture',
  bi: 'buildStrip', U0: 'buildBarrierWall', So: 'LAYOUT', Hh: 'buildWorld',
  kh: 'contactShadowMat', Wh: 'contactShadowMaterial', Vh: 'capsule', Ai: 'buildPerson',
  Hc: 'loftBody', Xh: 'VEHICLE_SPECS', Gh: 'geometryCache', Ti: 'cachedGeometry', N0: 'buildVehicle', qh: 'buildPaddockCar',
  F0: 'ACCENT_RED', O0: 'tyreGeometry', B0: 'rimShape', z0: 'buildWheel', H0: 'discTexture', k0: 'wheelMaterials',
  V0: 'loadCarMesh', G0: 'creasedNormals', Yh: 'buildHeroCar',
  Eo: 'TIME_OF_DAY', W0: 'tmpColorA', X0: 'tmpColorB', q0: 'sampleTimeOfDay',
  Y0: 'buildCarPath', Ri: 'arcLengthNear', fx: 'createJourney',
};
const MODULE = {
  'util/rng.js': ['ei'], 'util/noise.js': ['Ei', '#block', 'Rh', 'yo', 'D0', 'Un'],
  'util/math.js': ['Mn', 'pe', 'wi', 'zh', 'or', 'kc', 'Zh'],
  'textures.js': ['rn', 'Ch', 'Ih', 'Ph', 'Lh', 'Dh', 'Uh', 'Mo', 'Ss', 'Nh', 'Fh', 'Oh', 'Bh'],
  'track/strip.js': ['bi', 'U0'], 'layout.js': ['So'], 'world.js': ['Hh'],
  'people.js': ['kh', 'Wh', 'Vh', 'Ai'], 'vehicles.js': ['Hc', 'Xh', 'Gh', 'Ti', 'N0', 'qh'],
  'car/wheel.js': ['F0', 'O0', 'B0', 'z0', 'H0', 'k0'], 'car/hero-car.js': ['V0', 'G0', 'Yh'],
  'time-of-day.js': ['Eo', 'W0', 'X0', 'q0'], 'car-path.js': ['Y0', 'Ri'], 'journey.js': ['fx', '#export'],
};
const DOC = {
  'util/rng.js': 'Deterministic seeded random numbers (LCG).',
  'util/noise.js': '2D gradient noise and fractal Brownian motion, seeded once.',
  'util/math.js': 'Scalar helpers and monotone cubic (Fritsch-Carlson) interpolation.',
  'textures.js': 'Procedural canvas textures for the circuit.',
  'track/strip.js': 'Ribbon geometry that follows the track centre line at signed lateral offsets.',
  'layout.js': 'Fixed layout of the main straight, pit lane, grandstand and paddock (metres, world XZ).',
  'world.js': 'Builds the circuit world: terrain, hills, track surfaces, pits, grandstand, paddock and vegetation.',
  'people.js': 'Low-poly pit crew and visitors.',
  'vehicles.js': 'Procedural paddock cars (classic, GT, prototype).',
  'car/wheel.js': 'Hero-car wheels: tyre, rim, brake disc and caliper.',
  'car/hero-car.js': 'Loads the hero car mesh and builds its materials, wheels and contact shadow.',
  'time-of-day.js': 'Morning to golden-hour lighting keys.',
  'car-path.js': 'The hero car\'s driving line and arc-length lookups.',
  'journey.js': 'createJourney(): renderer, scene assembly, camera direction and the frame loop.',
};
const src = readFileSync(process.argv[2], 'utf8');
const outDir = process.argv[3];
const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'module', ranges: true });
const scope = eslintScope.analyze(ast, { ecmaVersion: 2022, sourceType: 'module' });
const moduleScope = scope.globalScope.childScopes[0];
// statement -> module
const stmtModule = new Map(); const nameModule = new Map();
const declOf = (n) => n.type === 'FunctionDeclaration' ? [n.id.name] : n.type === 'VariableDeclaration' ? n.declarations.map((d) => d.id.name) : [];
for (const n of ast.body) {
  if (n.type === 'ImportDeclaration') continue;
  let key = n.type === 'BlockStatement' ? '#block' : n.type === 'ExportNamedDeclaration' ? '#export' : declOf(n)[0];
  const mod = Object.keys(MODULE).find((m) => MODULE[m].includes(key));
  if (!mod) throw new Error('unassigned ' + key);
  stmtModule.set(n, mod);
  declOf(n).forEach((nm) => { if (!MODULE[mod].includes(nm) && !NAMES[nm]) throw new Error('unnamed ' + nm); nameModule.set(nm, mod); });
}
// references to module-scope variables
const threeImports = new Map(); // local name -> source
for (const n of ast.body) if (n.type === 'ImportDeclaration') n.specifiers.forEach((s) => threeImports.set(s.local.name, n.source.value));
const edits = []; // [start,end,text]
const uses = new Map(); // module -> Set(top-level names) ; threeUses module -> Set
const threeUses = new Map();
const add = (m, k, v) => { if (!m.has(k)) m.set(k, new Set()); m.get(k).add(v); };
const posModule = (pos) => { for (const [n, m] of stmtModule) if (pos >= n.range[0] && pos < n.range[1]) return m; return null; };
const shorthand = new Set();
walk.full(ast, (n) => { if (n.type === 'Property' && n.shorthand) shorthand.add(n.value.range[0]); });
for (const v of moduleScope.variables) {
  const nm = v.name;
  if (threeImports.has(nm)) {
    for (const r of v.references) { const m = posModule(r.identifier.range[0]); if (m) add(threeUses, m, nm); }
    continue;
  }
  const home = nameModule.get(nm);
  if (!home) throw new Error('no module for ' + nm);
  const real = NAMES[nm];
  for (const d of v.identifiers) edits.push([d.range[0], d.range[1], real]);
  for (const r of v.references) {
    const [s, e] = r.identifier.range;
    const m = posModule(s);
    if (m !== home) {
      if (r.isWrite()) throw new Error(`cross-module write to ${nm} from ${m}`);
      add(uses, m, nm);
    }
    if (v.identifiers.some((d) => d.range[0] === s)) continue;
    edits.push([s, e, shorthand.has(s) ? `${nm}: ${real}` : real]);
  }
}
const editsSorted = [...new Map(edits.map((e) => [e[0], e])).values()].sort((a, b) => b[0] - a[0]);
let text = src;
for (const [s, e, t] of editsSorted) text = text.slice(0, s) + t + text.slice(e);
// recompute statement ranges after edits: map original offsets
const shift = (pos) => { let d = 0; for (const [s, e, t] of editsSorted) if (s < pos) d += t.length - (e - s); return pos + d; };
const exportsOf = new Map();
for (const [m, set] of uses) for (const nm of set) add(exportsOf, nameModule.get(nm), NAMES[nm]);
for (const mod of Object.keys(MODULE)) {
  const stmts = ast.body.filter((n) => stmtModule.get(n) === mod);
  let body = stmts.map((n) => text.slice(shift(n.range[0]), shift(n.range[1]))).join('\n');
  if (mod === 'journey.js') body = body.replace(/export\s*\{\s*createJourney as createJourney\s*\};?/, '');
  const head = [`// ${DOC[mod]}`];
  const t3 = [...(threeUses.get(mod) || [])].sort();
  const core = t3.filter((n) => threeImports.get(n) === 'three');
  const utils = t3.filter((n) => threeImports.get(n) !== 'three');
  if (core.length) head.push(`import { ${core.join(', ')} } from 'three';`);
  if (utils.length) head.push(`import { ${utils.join(', ')} } from 'three/examples/jsm/utils/BufferGeometryUtils.js';`);
  const byMod = new Map();
  for (const nm of uses.get(mod) || []) add(byMod, nameModule.get(nm), NAMES[nm]);
  for (const [m, set] of [...byMod].sort()) {
    let rel = relative(dirname(mod), m); if (!rel.startsWith('.')) rel = './' + rel;
    head.push(`import { ${[...set].sort().join(', ')} } from '${rel}';`);
  }
  const exp = [...(exportsOf.get(mod) || [])];
  if (mod === 'journey.js') exp.push('createJourney');
  const tail = exp.length ? `\nexport { ${exp.sort().join(', ')} };\n` : '\n';
  const file = `${outDir}/${mod}`;
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, head.join('\n') + '\n\n' + body + '\n' + tail);
  console.log(mod.padEnd(18), 'exports', exp.join(','));
}
