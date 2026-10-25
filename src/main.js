import './styles.css';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { Stage, detectQuality } from './scene/stage.js';
import { getState, subscribe, setConfig, configFromHash } from './state.js';
import { applyTranslations, initLangSelector, tr } from './ui/lang.js';
import { initSplits, initReveals } from './ui/reveal.js';
import { initControls } from './ui/controls.js';
import { initScroll } from './ui/scroll.js';
import { renderCollection } from './ui/collection.js';
import { initConfigurator } from './ui/configurator.js';
import { initContact } from './ui/contact.js';
import { createAmbient } from './ui/audio.js';
import { PRODUCTS } from './config.js';

const params = new URLSearchParams(location.search);
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const live = document.getElementById('live');
const announce = (msg) => { live.textContent = ''; requestAnimationFrame(() => { live.textContent = msg; }); };
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

if (params.has('photo')) {
  photoMode();
} else {
  site();
}

function site() {
  // ── text first: translate, split headings, start the headline reveal
  initSplits();
  applyTranslations();
  const langSel = initLangSelector();
  const heroTitle = document.getElementById('hero-title');
  if (!reduced) {
    heroTitle.classList.add('is-revealing');
    // play once; a later language switch re-splits the words without replaying the reveal
    setTimeout(() => heroTitle.classList.remove('is-revealing'), 2600);
    document.querySelectorAll('[data-intro]').forEach((el) => {
      if (el === heroTitle) return;
      el.classList.add('is-fading');
      el.style.setProperty('--d', `${Number(el.dataset.intro) * 220 + 200}ms`);
    });
  }

  const configurator = initConfigurator({ announce, onRequest: () => {} });
  const contact = initContact({ announce });
  renderCollection({ reduced, onConfigure: (p) => configureProduct(p) });
  configurator.sync(false);
  initReveals({ reduced });

  // mobile menu
  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  menuBtn.addEventListener('click', () => {
    const open = menuBtn.getAttribute('aria-expanded') !== 'true';
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', tr(open ? 'a11y.menuClose' : 'a11y.menu'));
    mobileNav.hidden = !open;
  });

  // ambient sound, off until asked for
  const ambient = createAmbient();
  const soundBtn = document.getElementById('sound-btn');
  const soundLabel = soundBtn.querySelector('.sound-label');
  soundBtn.addEventListener('click', async () => {
    const on = await ambient.toggle();
    soundBtn.setAttribute('aria-pressed', String(on));
    soundLabel.dataset.i18n = on ? 'audio.on' : 'audio.off';
    soundLabel.textContent = tr(soundLabel.dataset.i18n);
    soundBtn.setAttribute('aria-label', tr(soundLabel.dataset.i18n));
  });
  soundBtn.setAttribute('aria-label', tr('audio.off'));

  // ── the 3D stage
  const canvas = document.getElementById('scene');
  const stageEl = document.getElementById('stage');
  const loader = document.getElementById('loader');
  const loaderBar = document.getElementById('loader-bar');
  let stage = null;
  let controls = null;
  let scroll = null;
  let interactive = true;
  let introDone = false;

  const webgl = (() => {
    try {
      const c = document.createElement('canvas');
      return !!(c.getContext('webgl2') || c.getContext('webgl'));
    } catch { return false; }
  })();

  function onSection(section) {
    const stageSection = section === 'hero' || section === 'config';
    interactive = stageSection;
    if (!controls) return;
    controls.showDock(stageSection && introDone);
    if (!stageSection) {
      controls.blurGlobe();
      controls.hideHint();
    }
    if (section === 'glass' || section === 'metal') {
      // story shots are composed for the chandelier's front view
      stage.zoomT = 1;
      stage.orbit.azT = 0;
      stage.orbit.elT = 0;
      stage.yawGoal = Math.round(stage.yaw / (Math.PI * 2)) * Math.PI * 2;
    }
  }

  function configureProduct(p) {
    setConfig({ palette: p.palette, finish: p.finish, globes: p.globes });
    if (scroll) scroll.scrollTo('#configurator');
    else document.getElementById('configurator').scrollIntoView();
  }

  subscribe((state, change) => {
    if (change.lang) {
      applyTranslations();
      langSel.sync();
      renderCollection({ reduced, onConfigure: (p) => configureProduct(p) });
      configurator.build();
      contact.refresh();
      controls?.refresh();
      announce(tr('meta.title'));
    }
    if (change.config) {
      configurator.sync();
      if (stage) {
        const c = state.config;
        if (change.config.includes('palette')) stage.chandelier.setPalette(c.palette, { animate: !reduced });
        if (change.config.includes('finish')) stage.chandelier.setFinish(c.finish, { animate: !reduced });
        if (change.config.includes('globes')) stage.chandelier.setCount(c.globes, { animate: !reduced });
      }
      announce(tr('a11y.config', {
        palette: tr(`palette.${state.config.palette}`),
        finish: tr(`finish.${state.config.finish}`),
        globes: tr('config.globesN', { n: state.config.globes }),
        price: document.getElementById('price').textContent,
      }));
    }
  });

  if (!webgl) {
    loader.classList.add('is-done');
    scroll = initScroll({ setScrollCamera() {}, visible: true }, { reduced, onSection: () => {} });
    return;
  }

  const quality = detectQuality();
  stage = new Stage(canvas, { quality, reducedMotion: reduced });
  scroll = initScroll(stage, { reduced, onSection });
  // a shared design link (#cfg-…) opens on the configurator
  if (configFromHash()) setTimeout(() => scroll.scrollTo('#configurator'), 200);

  stage.load((p) => {
    loaderBar.style.setProperty('--p', p.toFixed(3));
    loader.setAttribute('aria-valuenow', String(Math.round(p * 100)));
  }).then(() => {
    stage.setup(getState().config);
    controls = initControls(stage, {
      isInteractive: () => interactive,
      announce,
      onFirstUse: () => skipIntro?.(),
    });
    loader.classList.add('is-done');
    stage.start();
    // let the first frames render behind the poster, then cross-fade
    requestAnimationFrame(() => requestAnimationFrame(() => {
      stageEl.classList.add('is-live');
      announce(tr('a11y.loaded'));
    }));
    runIntro();
    scroll.update();
  }).catch((err) => {
    console.error(err);
    loader.classList.add('is-done');
  });

  let skipIntro = null;
  function runIntro() {
    const seen = (() => { try { return sessionStorage.getItem('nur.intro') === '1'; } catch { return false; } })();
    const startsLow = window.scrollY > 40 || (location.hash && location.hash.length > 1);
    const globes = stage.chandelier.globes;
    const finish = () => {
      if (introDone) return;
      introDone = true;
      stage.intro.active = false;
      stage.intro.t = 1;
      stage.chandelier.setGlobeLevels(globes.map(() => 1));
      document.getElementById('skip-intro').hidden = true;
      try { sessionStorage.setItem('nur.intro', '1'); } catch { /* ignore */ }
      const section = document.body.className.match(/cam-(\w+)/)?.[1] || 'hero';
      controls.showDock(section === 'hero' || section === 'config');
      if (section === 'hero') setTimeout(() => controls.showHint(), 400);
      removeSkipListeners();
    };
    const removeSkipListeners = () => {
      window.removeEventListener('wheel', onUserMove);
      window.removeEventListener('touchmove', onUserMove);
      window.removeEventListener('keydown', onUserMove);
    };
    if (seen || startsLow || reduced) {
      stage.intro.t = 1;
      if (reduced || startsLow) { finish(); return; }
    }
    // the poster frame: camera pulled back, globes barely warm
    const levels = globes.map(() => 0.4);
    const cam = { t: seen ? 0.6 : 0 };
    stage.intro.active = true;
    stage.intro.t = cam.t;
    stage.chandelier.setGlobeLevels(levels);
    const tl = gsap.timeline({
      onUpdate: () => { stage.intro.t = cam.t; stage.chandelier.setGlobeLevels(levels); },
      onComplete: finish,
    });
    tl.to(cam, { t: 1, duration: seen ? 1.6 : 3.8, ease: 'power2.inOut' }, 0.15);
    // light the globes one after another, each with a short filament flicker
    const order = globes.map((_, i) => i);
    order.forEach((i, k) => {
      const at = (seen ? 0.1 : 0.55) + k * (seen ? 0.12 : 0.36);
      tl.to(levels, { [i]: 0.75, duration: 0.09, ease: 'none' }, at)
        .to(levels, { [i]: 0.45, duration: 0.07, ease: 'none' }, at + 0.09)
        .to(levels, { [i]: 1, duration: 0.9, ease: 'power2.out' }, at + 0.16);
    });
    const skipBtn = document.getElementById('skip-intro');
    skipBtn.hidden = seen;
    skipIntro = () => { if (!introDone) tl.progress(1); };
    skipBtn.addEventListener('click', skipIntro, { once: true });
    function onUserMove() { skipIntro(); }
    window.addEventListener('wheel', onUserMove, { passive: true });
    window.addEventListener('touchmove', onUserMove, { passive: true });
    window.addEventListener('keydown', onUserMove);
  }
}

// ── stills for the poster and product photography, rendered from this same scene
async function photoMode() {
  document.body.classList.add('photo');
  const shot = params.get('photo');
  const quality = { ...detectQuality(), tier: 'high', dprMax: 2, msaa: 4, mosaicSize: 2048, bloomScale: 0.5 };
  const texturesLoaded = new Promise((res) => { THREE.DefaultLoadingManager.onLoad = res; });
  const stage = new Stage(document.getElementById('scene'), { quality, reducedMotion: true, photo: true });
  window.stage = stage;
  await stage.load();
  const product = PRODUCTS.find((p) => shot.startsWith(p.id));
  const config = product ? { palette: product.palette, finish: product.finish, globes: product.globes } : { palette: params.get('palette') || 'iznik', finish: params.get('finish') || 'antique', globes: Number(params.get('globes') || 5) };
  stage.setup(config);
  await Promise.race([texturesLoaded, new Promise((r) => setTimeout(r, 4000))]);
  const c = stage.chandelier.center;
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  stage.light.on = true;
  stage.light.dimmer = Number(params.get('dim') || 0.85);
  stage.light.value = stage.light.dimmer;
  let levels = 1;
  if (shot === 'poster') {
    levels = 0.4;
    const pose = stage.pose('intro');
    stage.override = { pos: pose.pos, target: pose.target, off: pose.off };
  } else if (shot === 'craft-glass') {
    stage.yaw = 0.15;
    stage.renderOnce();
    const g = stage.frontGlobe();
    stage.override = { pos: g.clone().add(V(0.2, 0.06, 0.24)), target: g.clone().add(V(0.01, -0.005, 0)), off: new THREE.Vector2() };
  } else if (product) {
    const b = shot.endsWith('-b');
    stage.yaw = b ? 0.55 : 0;
    const s = product.globes === 7 ? 1.08 : product.globes === 3 ? 0.94 : 1;
    stage.override = b
      ? { pos: V(-0.56 * s, c.y - 0.4, 1.66 * s), target: V(0, c.y - 0.05, 0), off: new THREE.Vector2() }
      : { pos: V(0.28 * s, c.y - 0.32, 1.82 * s), target: V(0, c.y - 0.04, 0), off: new THREE.Vector2() };
  }
  stage.chandelier.setGlobeLevels(stage.chandelier.globes.map(() => levels));
  for (let i = 0; i < 4; i++) stage.renderOnce();
  window.__ready = true;
}
