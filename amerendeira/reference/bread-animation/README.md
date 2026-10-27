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

## Integração do vídeo carvão (27/10/2026, segunda iteração)

O vídeo do pão foi substituído pela versão com fundo carvão
(`media/original/pao-com-chourico-carvao.mov`, 1248×704, 24 fps, 193 frames, 8,04 s — a mesma
duração e o mesmo número de frames do original). Mantido sem alterações: o efeito que desenha os
frames (idêntico byte a byte a `Film.tsx` desta pasta), o carregamento progressivo, a placa de fundo,
a altura do percurso (`100svh + 300svh`), o palco `sticky`, o tamanho e a posição da janela 16:9 e o
comportamento em desktop e telemóvel.

Adaptado:

- **Frames** (`scripts/prepare_video.py`): o vídeo é cortado a 16:9 (1248×702, uma linha em cima e
  outra em baixo) e exportado em 1248 px (desktop, sem ampliação) e 960 px (telemóvel), com as mesmas
  margens esbatidas e as mesmas placas de fundo. `SEQUENCE.desktop` passa a 1248×702.
- **Mapeamento** (`src/lib/videoTimeline.ts`): a ordem das fases mudou (no vídeo novo a crosta doura
  antes de os cortes abrirem sobre o chouriço). Os nós do mapeamento mantêm as mesmas fatias de
  scroll — entrada 14 %, desenvolvimento 50 %, vapor 30 %, pausa final 6 % — apontadas às fases
  novas (massa até 1,4 s, desenvolvimento até 3,9 s, vapor até ao fim), por isso o ritmo sentido ao
  fazer scroll é o mesmo.
- **Legendas**: reordenadas para seguirem o vídeo — Massa → Forno → Chouriço → Quente — com janelas
  0,10–0,20, 0,22–0,42, 0,44–0,62, 0,66–1,01.

Medição depois da integração (`baseline-carvao.json`, `node measure.cjs`):

| Ecrã | Altura do percurso | Janela | Frames 0 → 10 → 25 → 50 → 75 → 90 → 100 % (ida e volta) |
| --- | --- | --- | --- |
| 1440×900 | 3600 px | 48, 72, 1344, 756 | 0, 24, 47, 77, 130, 180, 192 / 130, 77, 47, 24, 0 |
| 1280×720 | 2880 px | 102, 58, 1075, 605 | igual |
| 768×1024 | 4096 px | 0, 265, 768, 432 | igual |
| 390×844 | 3376 px | 0, 255, 390, 219 | igual |

Percurso, início, fim e janela iguais à versão publicada anterior (`baseline-v9.json`); os números de
frame em cada ponto mudam só porque o vídeo e o mapeamento das fases mudaram. A sopa acrescentada
mais abaixo não altera nenhum destes valores (medidos com ela na página).
