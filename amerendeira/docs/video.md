# Vídeo do pão com chouriço — análise e técnica

## Ficheiro fornecido

`media/original/pao-com-chourico.mp4` (cópia sem alterações do ficheiro enviado,
`hf_20261026_171159_1ac83183-….mp4`, 11,5 MB).

| Propriedade | Valor |
| --- | --- |
| Duração | 8,04 s (193 frames) |
| Resolução / orientação | 1920 × 1080, horizontal 16:9 |
| Frame rate | 24 fps constante |
| Vídeo | H.264 Main, yuv420p, BT.709, ~11,4 Mbit/s |
| Áudio | AAC estéreo 44,1 kHz (não é usado: as versões web não têm faixa de áudio) |
| Keyframes | **um único keyframe (frame 0)**: cada seek obriga a descodificar desde o início |
| Metadados | etiqueta AIGC: `ContentProducer: kling` (vídeo gerado com Kling AI) |

## O que o vídeo mostra (verificado frame a frame)

| Tempo | Ação |
| --- | --- |
| 0,0–2,0 s | Massa crua, lisa, sobre fundo cinzento-claro de estúdio. Cresce ligeiramente; a câmara aproxima-se devagar. |
| 2,0–2,6 s | A superfície ganha farinha; surgem três pequenos cortes. |
| 2,6–3,3 s | Os cortes abrem e mostram rodelas de chouriço. |
| 3,0–4,0 s | A crosta doura até um castanho-dourado. |
| 3,9–8,0 s | Pão pronto, imóvel; o vapor sobe por cima dele. A câmara continua a aproximar-se muito ligeiramente. |

O vídeo não mostra forno, mãos, corte com faca nem pessoas. A narrativa do site acompanha apenas
estas etapas visíveis e usa frases do site original (“feito à moda antiga”, “o pão com chouriço é
rei”, “assado em fornos a lenha”, “a tradição é servida quente”).

Caixa do produto (incluindo sombra), em fração do frame: no início x 0,10–0,90 / y 0,33–0,84; no
fim x 0,025–0,965 / y 0,19–0,885. No fim o pão ocupa quase toda a largura, por isso o frame nunca é
recortado (nada de `object-fit: cover`): o texto vive nas faixas acima e abaixo do produto.

Fundo: o clip foi filmado num cinzento neutro com vinheta (topo `#a8a8a9`, base `#dad9da`, cantos
superiores mais escuros). No site o hero é branco limpo: cada frame é “reiluminado” para branco.
O fundo de estúdio é estimado longe do pão (convolução normalizada sobre os píxeis de croma baixa,
com o pão, a sombra e o vapor excluídos por uma margem larga), suavizado no tempo para nunca
cintilar, e cada píxel é dividido por ele. Os píxeis coloridos (o pão) recebem só 20 % dessa
correção, de forma suave, por isso a cor e o sombreado do pão ficam como foram filmados; o fundo
fica branco puro e a sombra de contacto e o vapor mantêm-se, apenas mais claros. O frame encontra o
palco branco sem qualquer aresta, sem máscaras nem placas de fundo.

## Segmento e mapeamento

Usa-se o clip inteiro (frames 0–192): os 2 s iniciais estabelecem a composição e os 4 s finais de
vapor são a conclusão. O progresso 0–100 % da secção fixa é mapeado por troços, para que o scroll
dedicado a cada fase seja proporcional à ação (`src/lib/videoTimeline.ts`):

| Progresso da secção | Tempo do vídeo | Fase |
| --- | --- | --- |
| 0–4 % | 0,0 s (primeiro frame) | Repouso: os textos do hero saem |
| 4–13 % | 0,0–1,0 s | O primeiro segundo do clip (massa quase parada) |
| 13–60 % | 1,0–4,3 s | Desenvolvimento: crescimento, cortes, chouriço, crosta dourada |
| 60–88 % | 4,3–7,04 s | Vapor |
| 88–96 % | 7,04–8,04 s | O último segundo do clip (pão pronto) |
| 96–100 % | 8,04 s (último frame) | Repouso no pão acabado antes da secção seguinte |

O scroll da secção é 230 % da altura do ecrã (200 % em telemóveis). Os frames seguem o scroll com
uma suavização curta e independente da taxa de atualização (constante de tempo de 55 ms), nos dois
sentidos.

Cada frame é mostrado tal como foi filmado: não há interpolação nem frames inventados.

## Técnica escolhida: sequência de frames em canvas 2D

Medição no Chromium 153 (headless, 100 posicionamentos: avanço contínuo, recuo contínuo e saltos):

| Técnica | Tempo por frame (média) | p95 |
| --- | --- | --- |
| `<video>` original, seek por `currentTime` | 394,5 ms | 776 ms |
| H.264 1280p, keyframe a cada 48 frames | 63,0 ms | 122 ms |
| H.264 1280p, keyframe a cada 4 frames | 38,6 ms | 61,4 ms |
| H.264 1280p, todos os frames intra | 22,0 ms | 30,2 ms |
| **WebP 1280p desenhado em canvas 2D** | **6,4 ms** | **13,5 ms** |

O canvas desenha o frame certo de forma determinística nos dois sentidos, não depende do motor de
seek de cada browser (Safari iOS é o caso mais fraco com `currentTime`) e nunca acumula pedidos de
seek concorrentes: o render lê o progresso atual em cada `requestAnimationFrame` e só desenha
quando o índice muda.

Memória e rede:

- 193 frames, sem passar disso, em WebP opaco sobre branco. 1920×1080 (resolução da fonte) quando
  o filme ocupa mais de ~1500 píxeis do ecrã (ecrãs grandes ou de alta densidade); 1280×720 nos
  restantes casos e sempre com Save-Data.
- Carregamento progressivo: primeiro 1 frame em cada 16, depois 1 em 8, 4, 2 e todos. O scroll
  funciona desde cedo com a granularidade disponível e mostra sempre o frame carregado mais próximo.
- O carregamento começa depois da imagem de capa e do conteúdo essencial (`requestIdleCallback`),
  com prioridade baixa.
- O render para quando a secção sai do ecrã (`IntersectionObserver`) e os listeners e timelines são
  limpos ao desmontar.

## Ficheiros gerados (`npm run video`)

- `public/videos/sequence/{desktop,mobile}/f_000…192.webp` (1920 e 1280 px) + `manifest.json`
- `public/videos/poster/cover-{1920,1280,960}.{avif,webp,jpg}`: frame 0 (intro, hero, alternativa)
- `public/videos/poster/final-{1920,1280,960}.{avif,webp,jpg}`: último frame (conclusão)
- `public/videos/pao-com-chourico-720p.mp4`: H.264 sem áudio, sobre branco, keyframe a cada 4 frames. Só é
  usado no botão “Ver o vídeo” do modo de movimento reduzido (reprodução inline com controlos,
  nunca em autoplay).
- `public/images/cutouts/pao-com-chourico{,-960}.webp`: recorte limpo do pão dourado (frame 101,
  4,2 s) por chave de croma, sem a sombra de contacto. Entra pela esquerda sobre a fotografia do lume
  e assenta no chão do forno, com luz quente por trás e uma sombra de contacto desenhada em CSS. PNG sem perdas em `media/derived/`.
- `public/og/a-merendeira.jpg`: imagem de partilha (frame final + logótipo), gerada por
  `scripts/make_og.cjs`.

## Alternativas

- `prefers-reduced-motion`: sem scrub; mostra o frame final em grande com a capa ao lado e um
  botão para ver o vídeo inline com controlos.
- Falha ou lentidão dos frames: a capa (frame 0) está no HTML desde o primeiro byte; se os frames
  não chegarem, a capa fica e os textos continuam a avançar. Se a capa também falhar, o palco
  branco mantém a composição.
- Sem JavaScript: a capa estática e todo o conteúdo continuam acessíveis.
