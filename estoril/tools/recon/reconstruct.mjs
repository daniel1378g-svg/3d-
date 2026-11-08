// Rewrites the app part of the published bundle into an ES module that imports from `three`.
// References that resolve to the bundled three.js r170 declarations are renamed to their real
// export names (scope-aware, via eslint-scope), so the module can be rebuilt against npm three.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import * as acorn from 'acorn';
import * as eslintScope from 'eslint-scope';
import * as walk from 'acorn-walk';

const MAP = {
  $s: 'LatheGeometry', Ac: 'AgXToneMapping', Dn: 'Shape', Ee: 'DoubleSide', Fe: 'PerspectiveCamera',
  Gs: 'CubeCamera', Gt: 'Float32BufferAttribute', Ke: 'ShaderMaterial', Kr: 'WebGLRenderer', L: 'Vector3',
  Oe: 'BackSide', Pe: 'BufferAttribute', Pt: 'MeshStandardMaterial', Qn: 'CanvasTexture', Qr: 'Fog',
  Qt: 'Matrix4', Tc: 'PCFSoftShadowMap', Ws: 'WebGLCubeRenderTarget', Ye: 'Euler', Ys: 'SpriteMaterial',
  _s: 'MeshPhysicalMaterial', ao: 'ExtrudeGeometry', co: 'TubeGeometry', de: 'Group', ds: 'DepthTexture',
  dt: 'Vector2', en: 'WebGLRenderTarget', er: 'ShapeGeometry', fe: 'BufferGeometry', fs: 'Scene',
  gi: 'RepeatWrapping', gs: 'CapsuleGeometry', ho: 'TextureLoader', hs: 'OrthographicCamera',
  jn: 'CircleGeometry', kt: 'Color', me: 'CylinderGeometry', mo: 'DirectionalLight', ms: 'SplineCurve',
  mt: 'Mesh', nn: 'Quaternion', oo: 'ConeGeometry', po: 'PointLight', ps: 'CatmullRomCurve3',
  sr: 'MathUtils', ti: 'HalfFloatType', to: 'Sprite', tr: 'IcosahedronGeometry', uo: 'HemisphereLight',
  us: 'PMREMGenerator', ve: 'MeshBasicMaterial', vi: 'Path', we: 'SRGBColorSpace', xe: 'PlaneGeometry',
  xs: 'TorusGeometry', ye: 'BoxGeometry', yn: 'InstancedMesh', ze: 'SphereGeometry',
};
const UTIL = { Ah: 'mergeGeometries' };

const src = readFileSync(process.argv[2], 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'module', ranges: true });
const appIdx = ast.body.findIndex((n) => n.type === 'FunctionDeclaration' && n.id.name === 'ei');
const appStart = ast.body[appIdx].range[0];
const scope = eslintScope.analyze(ast, { ecmaVersion: 2022, sourceType: 'module' });
const moduleScope = scope.globalScope.childScopes[0];
// which module-scope names are declared in the app part
const appNames = new Set();
for (const n of ast.body.slice(appIdx)) {
  if (n.id) appNames.add(n.id.name);
  if (n.type === 'VariableDeclaration') n.declarations.forEach((d) => walk.fullAncestor(d.id, (x) => x.type === 'Identifier' && appNames.add(x.name)));
}
// shorthand properties need expanding
const shorthand = new Set();
walk.full(ast, (n) => { if (n.type === 'Property' && n.shorthand && n.range[0] >= appStart) shorthand.add(n.value.range[0]); });

const edits = [];
const missing = new Map();
const visit = (sc) => {
  for (const ref of sc.references) {
    const r = ref.identifier.range;
    if (r[0] < appStart) continue;
    const v = ref.resolved;
    if (!v || v.scope !== moduleScope || appNames.has(v.name)) continue;
    const real = MAP[v.name] || UTIL[v.name];
    if (!real) { missing.set(v.name, (missing.get(v.name) || 0) + 1); continue; }
    edits.push([r[0], r[1], shorthand.has(r[0]) ? `${v.name}: ${real}` : real]);
  }
  sc.childScopes.forEach(visit);
};
visit(moduleScope);
if (missing.size) { console.error('UNMAPPED', [...missing]); process.exit(1); }
// collisions: a real name that is also declared somewhere in the app part
const allNames = new Set();
walk.full(ast, (n) => { if (n.type === 'Identifier' && n.range[0] >= appStart) allNames.add(n.name); });
const used = new Set(edits.map((e) => e[2].split(': ').pop()));
const clash = [...used].filter((n) => allNames.has(n));
if (clash.length) { console.error('NAME CLASH', clash); process.exit(1); }

let out = src.slice(appStart);
edits.sort((a, b) => b[0] - a[0]).forEach(([s, e, t]) => { out = out.slice(0, s - appStart) + t + out.slice(e - appStart); });
const threeNames = [...used].filter((n) => n !== 'mergeGeometries').sort();
const header = `import {\n  ${threeNames.join(',\n  ')},\n} from 'three';\n` + (used.has('mergeGeometries') ? `import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';\n` : '') + '\n';
mkdirSync(process.argv[3].replace(/\/[^/]+$/, ''), { recursive: true });
writeFileSync(process.argv[3], header + out);
console.log('edits', edits.length, 'imports', threeNames.length, '-> ', process.argv[3]);
