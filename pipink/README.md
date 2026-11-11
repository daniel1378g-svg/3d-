# Pipinkautobazar: scroll-driven detailing and wrap studio site

A cinematic one-page site for a car and motorcycle detailing and wrap studio. The picture is a
single full-screen WebGL stage that the scroll position drives: a dirty white coupe and superbike
in a dark garage, snow foam rolling over them, a rinse revealing them clean with their lights on,
a push-in on the bike, a headlight macro, a whiteout, then the same pair wrapped midnight blue in
smoke. A wrap picker shows the bike in four colours, and a short form asks for a price.

It was built to follow a reference screen recording of another studio's concept site as closely
as the available assets allow. See "What matches the reference and what does not" below.

## Run it

```bash
npm install
npm run build      # dist/site (any web host) and dist/artifact (claude.ai Artifact)
npm run serve      # http://127.0.0.1:4190/
npm run typecheck
```

## How it works

- `src/Stage.ts` and `src/shader.ts`: the stage. Each scene is a 2K still with a depth map. The
  shader displaces pixels by depth, so the slow push-in and the mouse parallax move near and far
  things differently, like a camera. Transitions are shader effects: a noisy foam front, a
  streaked rinse, a cross-zoom between camera positions, a whiteout, and a soft sweep when the
  wrap colour changes. Procedural smoke drifts over every scene.
- `src/App.tsx`: the page. GSAP ScrollTrigger maps the scroll range onto eight "beats"; the text
  blocks fade in and out on the same beats. The story is in `SEGMENTS` (Stage.ts) and `BLOCKS`
  (App.tsx), so retiming a scene means changing two numbers.
- `tools/prepare.py`: turns `assets/src/*.webp` (the full-size masters) into web images (desktop, phone) and depth maps.
- Stack: React, TypeScript, three.js, GSAP, bundled with esbuild.

## What matches the reference and what does not

- **Matches:** the scene order, framing and mood, the headline copy and its placement, the nav,
  the wrap picker with its four colours and back button, the contact panel, the whiteout line.
- **Different on purpose:** the brand name. The reference's wordmark belongs to someone else.
- **Different by necessity:** the reference scrubs pre-rendered video. Those clips are not
  available, so the scenes here are newly generated stills, and the motion between them is done
  in the shader. A real orbit around the bike, for example, is a cross-zoom here. Any scene can be
  replaced by a clip later: give the stage a video texture for that segment.
- **The vehicles carry no badges or logos.** They were generated from descriptions, not from a
  manufacturer's models.
- **The form does not send anything yet.** It validates and says so on screen. Connect it to an
  email or CRM service in `submit` in `src/App.tsx`.

## Assets and credits

| Asset | Source |
| --- | --- |
| `assets/src/*.webp` (ten stills) | Generated for this project with Higgsfield (GPT Image 2.6). The later stills were made from the earlier ones so the car, bike and garage stay consistent. |
| `public/img/*_d.webp` (depth maps) | Computed from the stills with Depth Anything V2 Small (Apache 2.0), run locally with onnxruntime. |
| Typeface | Archivo, from Google Fonts (SIL Open Font License). |
