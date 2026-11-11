import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Stage, BEATS, WRAPS, type Key } from './Stage';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const KEYS: Key[] = ['a_dirty', 'b_foam', 'c_clean', 'd_bike', 'e_macro', 'f_blue', 'g_bike_blue', 'h_bike_black', 'i_bike_green', 'j_bike_red'];
// When each text block is on screen, in beats: [fade in from, fully in, fade out from, gone].
const BLOCKS: Record<string, [number, number, number, number]> = {
  hero: [-1, -0.5, 0.7, 0.95],
  foam: [1.2, 1.45, 2.05, 2.25],
  coat: [2.8, 3.0, 3.12, 3.3],
  bike: [3.9, 4.1, 4.4, 4.6],
  colour: [5.5, 5.72, 6.1, 6.3],
  wraps: [6.6, 6.9, 7.2, 7.4],
  contact: [7.3, 7.65, 99, 100],
};
const sat = (x: number) => Math.max(0, Math.min(1, x));
const ease = (x: number) => x * x * (3 - 2 * x);

export function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const story = useRef<HTMLDivElement>(null);
  const stage = useRef<Stage | null>(null);
  const blocks = useRef<Record<string, HTMLElement | null>>({});
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState('');
  const [picker, setPicker] = useState(false);
  const [wrap, setWrap] = useState(0);
  const [onLight, setOnLight] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const mobile = Math.min(window.innerWidth, window.innerHeight) < 700;
    let s: Stage;
    try { s = new Stage(canvas.current!, mobile); } catch (e) { setFailed('This browser could not start WebGL, which the site needs.'); return; }
    stage.current = s;
    s.load(KEYS, setLoaded).then(() => { s.start(); setReady(true); }).catch(() => setFailed('The pictures could not be loaded. Check the connection and reload.'));

    // Scroll position -> beat. The stage smooths the value itself; the text follows the same beat.
    let beat = 0, shown = 0, light = false;
    const st = ScrollTrigger.create({ trigger: story.current!, start: 'top top', end: 'bottom bottom', onUpdate: (self) => { beat = self.progress * BEATS; s.setBeat(beat); } });
    const tick = () => {
      shown += (beat - shown) * 0.12;
      for (const [name, [a, b, c, d]] of Object.entries(BLOCKS)) {
        const el = blocks.current[name];
        if (!el) continue;
        const v = ease(sat((shown - a) / (b - a))) * (1 - ease(sat((shown - c) / (d - c))));
        el.style.opacity = v.toFixed(3);
        el.style.transform = `translate3d(0, ${((1 - v) * 22).toFixed(1)}px, 0)`;
        el.style.visibility = v < 0.02 ? 'hidden' : 'visible';
      }
      const nowLight = shown > 5.5 && shown < 6.35;
      if (nowLight !== light) { light = nowLight; setOnLight(light); }
    };
    gsap.ticker.add(tick);
    return () => { gsap.ticker.remove(tick); st.kill(); s.dispose(); };
  }, []);

  // Smooth jump to a beat of the story.
  const go = (beat: number) => {
    const el = story.current!;
    const y = el.offsetTop + (beat / BEATS) * (el.offsetHeight - window.innerHeight);
    gsap.to(window, { scrollTo: y, duration: Math.min(2.4, 0.9 + Math.abs(y - window.scrollY) / 4000), ease: 'power2.inOut' });
  };

  const openPicker = () => { setPicker(true); stage.current?.openPicker(); document.documentElement.classList.add('locked'); };
  const closePicker = () => { setPicker(false); stage.current?.closePicker(); document.documentElement.classList.remove('locked'); };
  const pick = (i: number) => { setWrap(i); stage.current?.setWrap(i); };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && picker) closePicker(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [picker]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (!String(data.get('ride') || '').trim()) { setError('Tell us what you drive.'); return; }
    if (!String(data.get('contact') || '').trim()) { setError('Add a phone number or an email so we can reply.'); return; }
    setError(''); setSent(true);
  };

  const ref = (name: string) => (el: HTMLElement | null) => { blocks.current[name] = el; };

  return (
    <div className={`site${onLight ? ' on-light' : ''}${picker ? ' picking' : ''}`}>
      <div className={`loader${ready ? ' done' : ''}`} aria-hidden={ready}>
        <div className="wordmark"><b>PIPINK</b>AUTOBAZAR</div>
        <div className="bar"><i style={{ transform: `scaleX(${loaded})` }} /></div>
        {failed && <p role="alert">{failed}</p>}
      </div>

      <header className="top">
        <p className="strip">Detailing, ceramic coating and wraps for cars and motorcycles</p>
        <div className="row">
          <a className="wordmark" href="#top" onClick={(e) => { e.preventDefault(); go(0); }}><b>PIPINK</b>AUTOBAZAR</a>
          <nav aria-label="Sections">
            <button type="button" onClick={() => go(1.6)}>Detailing</button>
            <button type="button" onClick={() => go(3.05)}>Coating</button>
            <button type="button" onClick={() => go(7.0)}>Wraps</button>
            <button type="button" className="cta" onClick={() => go(BEATS)}>Bring it in</button>
          </nav>
        </div>
      </header>

      <main ref={story} className="story" id="top">
        <div className="pin">
          <canvas ref={canvas} aria-hidden="true" />

          <section ref={ref('hero')} className="block left">
            <h1>Better than the day you bought it.</h1>
            <p>Pipinkautobazar is a detailing and wrap studio for cars and motorcycles. We wash it properly, polish the paint flat, coat it, or change its colour.</p>
            <div className="actions">
              <button type="button" className="pill" onClick={() => go(BEATS)}>Bring it in</button>
              <button type="button" className="link" onClick={() => go(BEATS)}>Book a slot</button>
            </div>
          </section>

          <section ref={ref('foam')} className="block left">
            <h2>Foam and wash. Soft mitts only.</h2>
            <p>Snow foam lifts the grit before anything touches the paint. Then two buckets, and the wheels, arches and door shuts each get their own.</p>
          </section>

          <section ref={ref('coat')} className="block left">
            <h2>Polished flat. Coated to stay that way.</h2>
            <p>A machine polish takes the swirls out. A ceramic coat keeps them out.</p>
          </section>

          <section ref={ref('bike')} className="block left">
            <h2>Bikes get the same bench.</h2>
            <p>Fairings, tank, wheels, the chain side. Same process, smaller brushes.</p>
          </section>

          <section ref={ref('colour')} className="block centre dark">
            <h2>Or change the colour.</h2>
          </section>

          <section ref={ref('wraps')} className="block top-centre">
            <h2>Same car. Same bike. New colour.</h2>
            <p>A full wrap covers every painted panel in vinyl, and peels off cleanly the day you want your paint back. Pick one and see it wrapped.</p>
            <div className="actions"><button type="button" className="pill" onClick={openPicker}>See the bike wrapped</button></div>
          </section>

          <section ref={ref('contact')} className="block panel" aria-labelledby="contact-title">
            <h2 id="contact-title">Bring it in.</h2>
            <p>Tell us what you drive and what you want done. We reply with a price and a free slot.</p>
            {sent ? (
              <p className="note" role="status">Noted. This preview does not send the request anywhere yet, so nothing has left your device.</p>
            ) : (
              <form onSubmit={submit} noValidate>
                <label htmlFor="f-ride">Car or bike</label>
                <input id="f-ride" name="ride" type="text" placeholder="e.g. BMW M4, 2023" autoComplete="off" />
                <label htmlFor="f-job">What you want done</label>
                <select id="f-job" name="job" defaultValue="detail">
                  <option value="detail">Full detail</option>
                  <option value="coat">Ceramic coating</option>
                  <option value="wrap">Colour wrap</option>
                  <option value="unsure">Not sure yet</option>
                </select>
                <label htmlFor="f-contact">Phone or email</label>
                <input id="f-contact" name="contact" type="text" autoComplete="off" />
                {error && <p className="error" role="alert">{error}</p>}
                <button type="submit" className="pill wide">Ask for a price</button>
              </form>
            )}
          </section>

          <div className="picker" aria-hidden={!picker}>
            <button type="button" className="back" onClick={closePicker} tabIndex={picker ? 0 : -1}><span aria-hidden="true">←</span> the garage</button>
            <div className="chips" role="group" aria-label="Wrap colour">
              <p>Pick a wrap for the bike.</p>
              <div>
                {WRAPS.map((w, i) => (
                  <button key={w.key} type="button" className={i === wrap ? 'on' : ''} aria-pressed={i === wrap} onClick={() => pick(i)} tabIndex={picker ? 0 : -1}>
                    <i style={{ background: w.swatch }} />{w.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="scroll-hint" aria-hidden="true">Scroll</div>
        </div>
      </main>

      <footer>
        <span><b>PIPINK</b>AUTOBAZAR</span>
        <span>Detailing, ceramic coating and wraps for cars and motorcycles.</span>
        <span>Concept site. The pictures are generated, not photographs of customer vehicles.</span>
      </footer>
    </div>
  );
}
