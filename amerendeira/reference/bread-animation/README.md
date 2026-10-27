# Animação do pão — versão de referência (antes do redesign escuro)

Cópia guardada a 27/10/2026, antes de qualquer alteração de layout, para comparação. Nada aqui é
compilado (a pasta está excluída do `tsconfig.json`).

## Código protegido

| Ficheiro (no projeto) | Papel |
| --- | --- |
| `src/components/Film.tsx` — efeito “Frame renderer” | Liga o progresso do scroll (ScrollTrigger, `start: top top`, `end: bottom bottom` da `.film__track`) ao frame desenhado no canvas; desenha a placa de fundo; carrega os frames; confirma o primeiro frame antes de esconder a capa (correção iPhone) |
| `src/lib/frameSequence.ts` | Carregamento progressivo dos 193 frames (1 em 16 → todos), prioridade ao frame atual, placas de fundo |
| `src/lib/videoTimeline.ts` | Mapeamento progresso → tempo do vídeo (troços) e janelas das legendas |
| `src/components/Intro.tsx` (`introScript`) | Abertura: arco que revela o palco e logótipo que voa para o cabeçalho |
| `film.css` (extraído de `src/styles/globals.css`) | Altura do percurso (`100svh + 300svh`), palco `sticky`, dimensões da janela 16:9 (`--win-w`, `--win-h`), layout empilhado em ecrãs estreitos/verticais |

## Recursos protegidos

`public/videos/sequence/{desktop,mobile}/f_000…192.webp`, `public/videos/sequence/plates.webp`,
`public/videos/sequence/manifest.json`, `public/videos/poster/cover-*`, `final-*`,
`public/videos/pao-com-chourico-720p.mp4`. As somas SHA-256 estão em `assets.sha256.json`.

## Medições de referência (`baseline.json`)

Percurso medido com `node measure.cjs` (Chromium, frames todos carregados), indo de 0 a 100 % do
scroll do filme e voltando a 0:

| Ecrã | Altura do percurso | Janela do filme (x, y, largura, altura) | Frames 0 → 10 → 25 → 50 → 75 → 90 → 100 % (ida e volta) |
| --- | --- | --- | --- |
| 1440×900 | 3600 px (2700 px de scroll) | 48, 72, 1344, 756 | 0, 27, 53, 85, 136, 181, 192 / 136, 85, 53, 27, 0 |
| 1280×720 | 2880 px (2160 px) | 102, 58, 1075, 605 | igual |
| 768×1024 | 4096 px (3072 px) | 0, 238, 768, 432 | igual |
| 390×844 | 3376 px (2532 px) | 0, 208, 390, 219 | igual |
