import { DEFAULT_CONFIG, PALETTES, FINISHES, BASE_PRICE } from './config.js';
import { DICT } from './i18n.js';

// Language and configuration survive reloads and language switches.
const KEY = 'nur.atelier.v1';

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  } catch {
    return {};
  }
}

function write(data) {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage can be unavailable (private mode, blocked site data); state still works in memory */
  }
}

export function validConfig(c) {
  return !!c && PALETTES[c.palette] && FINISHES[c.finish] && BASE_PRICE[c.globes];
}

// Design links are plain anchors: #cfg-iznik-antique-5
export function configFromHash(hash = location.hash) {
  const m = /^#cfg-([a-z]+)-([a-z]+)-(\d)$/.exec(hash || '');
  if (!m) return null;
  const c = { palette: m[1], finish: m[2], globes: Number(m[3]) };
  return validConfig(c) ? c : null;
}

export function configToHash(c) {
  return `#cfg-${c.palette}-${c.finish}-${c.globes}`;
}

const saved = read();
const state = {
  lang: DICT[saved.lang] ? saved.lang : 'en',
  config: { ...DEFAULT_CONFIG, ...(validConfig(saved.config) ? saved.config : {}) },
};
const fromHash = configFromHash();
if (fromHash) state.config = fromHash;

const listeners = new Set();

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit(change) {
  write({ lang: state.lang, config: state.config });
  for (const fn of listeners) fn(state, change);
}

export function setLang(lang) {
  if (!DICT[lang] || lang === state.lang) return;
  state.lang = lang;
  emit({ lang: true });
}

export function setConfig(partial) {
  const next = { ...state.config, ...partial };
  if (!validConfig(next)) return;
  const changed = Object.keys(partial).filter((k) => state.config[k] !== next[k]);
  if (!changed.length) return;
  state.config = next;
  emit({ config: changed });
}
