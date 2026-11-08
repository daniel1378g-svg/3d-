// Splits the published journey bundle into the bundled three.js r170 part and the app part,
// and lists every top-level three.js identifier the app part references.
import { readFileSync, writeFileSync } from 'node:fs';
import * as acorn from 'acorn';
import * as eslintScope from 'eslint-scope';

const src = readFileSync(process.argv[2], 'utf8');
const ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'module', ranges: true });
const body = ast.body;
const startIdx = body.findIndex((n) => n.type === 'FunctionDeclaration' && n.id.name === 'Ah');
const appIdx = body.findIndex((n) => n.type === 'FunctionDeclaration' && n.id.name === 'ei');
console.log('top-level statements', body.length, 'utils start', startIdx, 'app start', appIdx);
const declNames = (n) => {
  if (n.type === 'FunctionDeclaration' || n.type === 'ClassDeclaration') return [n.id.name];
  if (n.type === 'VariableDeclaration') return n.declarations.flatMap((d) => (d.id.type === 'Identifier' ? [d.id.name] : []));
  return [];
};
const threeDecl = new Map();
body.slice(0, startIdx).forEach((n) => declNames(n).forEach((nm) => threeDecl.set(nm, n)));
const utilDecl = new Map();
body.slice(startIdx, appIdx).forEach((n) => declNames(n).forEach((nm) => utilDecl.set(nm, n)));
const scope = eslintScope.analyze(ast, { ecmaVersion: 2022, sourceType: 'module' });
const moduleScope = scope.globalScope.childScopes[0];
const used = new Map();
const appStart = body[appIdx].range[0];
const visit = (sc) => {
  for (const ref of sc.references) {
    const r = ref.identifier.range[0];
    if (r < appStart) continue;
    const v = ref.resolved;
    if (v && v.scope === moduleScope) {
      const nm = v.name;
      if (threeDecl.has(nm) || utilDecl.has(nm)) used.set(nm, (used.get(nm) || 0) + 1);
    }
  }
  sc.childScopes.forEach(visit);
};
visit(moduleScope);
console.log('three/utils identifiers used by app:', used.size);
const out = [];
for (const [nm, count] of [...used].sort()) {
  const n = threeDecl.get(nm) || utilDecl.get(nm);
  const text = src.slice(n.range[0], n.range[1]);
  let kind = n.type, guess = '';
  if (n.type === 'ClassDeclaration') {
    const m = text.match(/\.is([A-Z]\w*)=!0/); const t = text.match(/\.type="([A-Za-z0-9]+)"/);
    guess = m ? m[1] : t ? t[1] : '';
  } else if (n.type === 'VariableDeclaration') {
    const d = n.declarations.find((d) => d.id.name === nm);
    kind += ':' + (d.init ? src.slice(d.init.range[0], Math.min(d.init.range[1], d.init.range[0] + 80)) : 'undef');
  }
  out.push({ nm, count, kind, guess, util: utilDecl.has(nm), head: text.slice(0, 160) });
}
writeFileSync(process.argv[3], JSON.stringify({ appStartOffset: appStart, utilStartOffset: body[startIdx].range[0], ids: out }, null, 1));
for (const o of out) console.log(o.nm.padEnd(4), String(o.count).padStart(4), (o.util ? 'UTIL ' : '') + o.kind.slice(0, 60).padEnd(60), o.guess);
