import { useContent } from "@/content/i18n";
import { Logo } from "./Logo";

// Opening (~2.8 s), played once per session and never with reduced motion (decided before
// first paint by the boot script in layout.tsx, which adds `has-intro` to <html>).
//   0.0–0.6  the logotype rises letter by letter through a mask (CSS, from the first paint)
//   0.6–1.7  an arch — the shape of the M, of the oven mouth and of the shop's arcades — opens on
//            the first frame of the film
//   1.7–2.8  the arch becomes the full hero, the logotype flies to the header, copy and buttons
//            come in. The film's own action is left for the scroll.
// The choreography is plain JavaScript (Web Animations API) inlined at the end of the page, so
// it starts as soon as the HTML is parsed instead of waiting for the application bundle.
// Scrolling, a key press, a click or "Saltar intro" end it at once; nothing waits for it.
export function Intro() {
  const { ui } = useContent();
  return (
    <div className="intro">
      <div className="intro__logo" aria-hidden="true">
        <Logo decorative />
      </div>
      <button type="button" className="intro__skip">
        {ui.skipIntro}
      </button>
    </div>
  );
}

export const introScript = `(function () {
  var html = document.documentElement;
  if (!html.classList.contains('has-intro')) return;
  var stage = document.querySelector('[data-intro="stage"]');
  var header = document.querySelector('[data-intro="header"]');
  var navLogo = document.querySelector('[data-intro="nav-logo"]');
  var logo = document.querySelector('.intro__logo');
  var skipBtn = document.querySelector('.intro__skip');
  var win = stage && stage.querySelector('.film__window');
  if (!stage || !header || !navLogo || !logo || !skipBtn || !win || !stage.animate) { html.classList.remove('has-intro'); return; }
  html.classList.add('intro-running');

  var vw = innerWidth, vh = innerHeight;
  var w = win.getBoundingClientRect();
  var cx = w.left + w.width / 2, cy = w.top + w.height * 0.6;
  var archW = Math.min(vw * (vw < 700 ? 0.82 : 0.4), 620);
  var archH = Math.min(vh * 0.62, archW * 1.25);
  var base = cy + archH * 0.55, archTop = cy - archH * 0.45;
  function inset(t, r, b, l, rad) { return 'inset(' + t + 'px ' + r + 'px ' + b + 'px ' + l + 'px round ' + rad + 'px ' + rad + 'px 0px 0px)'; }
  var clipPoint = inset(base, vw - cx, vh - base, cx, 0);
  var clipArch = inset(archTop, vw - cx - archW / 2, vh - base, cx - archW / 2, archW / 2);
  var clipFull = inset(0, 0, 0, 0, 0);

  var from = logo.getBoundingClientRect();
  var to = navLogo.getBoundingClientRect();
  var lift = Math.max(archTop * 0.5, from.height * 0.5 + 20) - (from.top + from.height / 2);
  var dx = to.left - from.left, dy = to.top - from.top, s = to.width / from.width;

  var now = performance.now() / 1000;
  var t2 = Math.max(0, 0.62 - now) * 1000;     // the arch opens ~0.6 s after navigation start
  var speed = now > 1.2 ? 0.65 : 1;            // late start: play the rest faster
  var ease = 'cubic-bezier(.87,0,.13,1)';      // expo in-out
  var easeOut = 'cubic-bezier(.16,1,.3,1)';    // expo out
  var anims = [];
  function run(el, kf, o) {
    o.fill = 'both'; o.duration *= speed; o.delay = (o.delay || 0) * speed;
    anims.push(el.animate(kf, o));
  }

  run(stage, [{ clipPath: clipPoint }, { clipPath: clipArch }], { duration: 1100, delay: t2, easing: ease });
  run(stage, [{ clipPath: clipArch }, { clipPath: clipFull }], { duration: 1050, delay: t2 + 1100, easing: ease, composite: 'replace' });

  var up = 'translate(-50%, calc(-50% + ' + lift + 'px)) scale(1)';
  run(logo, [{ transform: 'translate(-50%, -50%) scale(1)' }, { transform: up }], { duration: 1100, delay: t2, easing: ease });
  run(logo, [{ transform: up }, { transform: 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px)) scale(' + s + ')' }], { duration: 1050, delay: t2 + 1100, easing: ease });
  run(logo, [{ opacity: 1 }, { opacity: 0 }], { duration: 150, delay: t2 + 2070, easing: 'linear' });
  run(header, [{ opacity: 0 }, { opacity: 1 }], { duration: 10, delay: t2 + 2050, easing: 'linear' });

  var glyphs = document.querySelectorAll('.drawn-title--hero .drawn-title__glyph');
  for (var i = 0; i < glyphs.length; i++) run(glyphs[i], [{ transform: 'translateY(120%)' }, { transform: 'none' }], { duration: 1000, delay: t2 + 1350 + i * 25, easing: easeOut });
  var lines = document.querySelectorAll('[data-intro="line"] > span');
  for (var j = 0; j < lines.length; j++) run(lines[j], [{ transform: 'translateY(110%)' }, { transform: 'none' }], { duration: 1000, delay: t2 + 1500 + j * 80, easing: easeOut });
  var fades = document.querySelectorAll('[data-intro="fade"]');
  for (var k = 0; k < fades.length; k++) run(fades[k], [{ opacity: 0 }, { opacity: 1 }], { duration: 800, delay: t2 + 1650 + k * 80, easing: 'ease-out' });
  run(skipBtn, [{ opacity: 1 }, { opacity: 0 }], { duration: 300, delay: t2 + 1950, easing: 'linear' });

  var done = false;
  function finish() {
    if (done) return;
    done = true;
    try { sessionStorage.setItem('mrd:intro', '1'); } catch (e) {}
    html.classList.remove('has-intro', 'intro-running');
    for (var n = 0; n < anims.length; n++) anims[n].cancel();
    removeEventListener('wheel', finish);
    removeEventListener('touchmove', finish);
    removeEventListener('keydown', onKey);
    document.removeEventListener('focusin', onFocus);
  }
  function onKey(e) { if (e.key !== 'Tab') finish(); }
  function onFocus(e) { if (!e.target.closest || !e.target.closest('.intro__skip')) finish(); }
  addEventListener('wheel', finish, { passive: true });
  addEventListener('touchmove', finish, { passive: true });
  addEventListener('keydown', onKey);
  document.addEventListener('focusin', onFocus);
  skipBtn.addEventListener('click', finish);
  Promise.all(anims.map(function (a) { return a.finished; })).then(finish, finish);
})();`;
