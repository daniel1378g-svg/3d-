import Lenis from 'lenis';
import { gsap } from 'gsap';

// Scroll drives the camera: hero → glass close-up → brass → (collection, craft cover the
// scene) → configurator. Panels that cover the whole viewport pause rendering.
export function initScroll(stage, { reduced, onSection }) {
  const header = document.getElementById('header');
  const hero = document.getElementById('top');
  const stops = [
    { el: hero, cam: 'hero', at: () => 0 },
    { el: document.getElementById('glass'), cam: 'glass', at: (el) => centerOf(el) },
    { el: document.getElementById('metal'), cam: 'metal', at: (el) => centerOf(el) },
    { el: document.getElementById('configurator'), cam: 'config', at: (el) => topOf(el) },
  ];
  const panels = [...document.querySelectorAll('.panel, .site-footer')];
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const navTargets = navLinks.map((a) => document.querySelector(a.getAttribute('href')));

  let lenis = null;
  if (!reduced) {
    lenis = new Lenis({ lerp: 0.11, smoothWheel: true, wheelMultiplier: 0.95 });
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', update);
  }
  window.addEventListener('scroll', () => { if (!lenis) update(); }, { passive: true });
  window.addEventListener('resize', () => update());

  function topOf(el) { return el.getBoundingClientRect().top + window.scrollY; }
  function centerOf(el) { return topOf(el) + el.offsetHeight / 2 - window.innerHeight / 2; }

  let current = '';
  function update() {
    const y = window.scrollY;
    const vh = window.innerHeight;
    const pos = stops.map((s) => s.at(s.el));
    // camera
    let from = stops[0].cam, to = stops[0].cam, t = 0;
    if (y >= pos[pos.length - 1]) {
      from = to = stops[stops.length - 1].cam;
    } else {
      for (let i = 0; i < pos.length - 1; i++) {
        if (y >= pos[i] && y < pos[i + 1]) {
          from = stops[i].cam; to = stops[i + 1].cam;
          t = (y - pos[i]) / Math.max(1, pos[i + 1] - pos[i]);
          break;
        }
      }
    }
    if (reduced) {
      // no travelling camera: cut to whichever view is nearest
      const cam = t < 0.5 ? from : to;
      stage.setScrollCamera(cam, cam, 1);
    } else {
      stage.setScrollCamera(from, to, t);
    }

    // which part of the page fills the screen
    const covered = panels.some((p) => {
      const r = p.getBoundingClientRect();
      return r.top <= 0 && r.bottom >= vh;
    });
    stage.visible = !covered;
    let section = 'hero';
    const mid = vh * 0.5;
    for (const s of stops) {
      const r = s.el.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) section = s.cam;
    }
    for (const p of panels) {
      const r = p.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) section = 'panel';
    }
    if (section !== current) {
      current = section;
      document.body.classList.remove('cam-hero', 'cam-glass', 'cam-metal', 'cam-config', 'cam-panel');
      document.body.classList.add(`cam-${section}`);
      onSection?.(section);
    }
    header.classList.toggle('is-solid', y > vh * 0.6);
    // current nav item
    let active = -1;
    navTargets.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top <= mid && r.bottom >= mid) active = i;
    });
    navLinks.forEach((a, i) => a.setAttribute('aria-current', i === active ? 'true' : 'false'));
  }

  function scrollToTarget(target, { onDone } = {}) {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1.6, easing: (x) => 1 - Math.pow(1 - x, 4), onComplete: onDone });
    else { el.scrollIntoView({ behavior: 'auto', block: 'start' }); onDone?.(); }
  }

  // in-page links glide instead of jumping
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (href.length < 2 || href.startsWith('#cfg-')) return;
    const el = document.querySelector(href);
    if (!el) return;
    e.preventDefault();
    scrollToTarget(el, { onDone: () => focusSection(el) });
    document.getElementById('mobile-nav')?.setAttribute('hidden', '');
    document.getElementById('menu-btn')?.setAttribute('aria-expanded', 'false');
  });

  function focusSection(el) {
    // move keyboard focus to the section heading so tabbing continues from there
    const h = el.querySelector('h1, h2');
    if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }

  update();
  return { update, scrollTo: scrollToTarget, lenis, stop: () => lenis?.stop(), start: () => lenis?.start() };
}
