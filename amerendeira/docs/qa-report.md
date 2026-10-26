# Relatório de testes — 26/10/2026

Ambiente: build de produção (`next build`, exportação estática) servido localmente por
`scripts/serve.mjs`, Chromium 153 (Playwright) headless **sem GPU** (rasterização por software).
Scripts: `scripts/qa/shots.cjs` (capturas), `scripts/qa/behaviour.cjs` (comportamento + axe-core),
`scripts/qa/perf.cjs` (tempos de frame). Capturas em `docs/screenshots/`.

## Resultados

| Verificação | Resultado |
| --- | --- |
| Build (`next build`, TypeScript) | Sem erros nem avisos |
| Consola / erros JS (1440, 768, 390) | Nenhum |
| Pedidos HTTP locais com erro | Nenhum |
| Imagens visíveis carregadas | 26/26 (após percorrer a página toda); todas com `alt` |
| Fotografias originais usadas | 23/23 (manifesto ↔ HTML gerado) |
| Textos originais presentes | 69/71 linhas literais; as 2 restantes são alterações intencionais (ver abaixo) |
| Âncoras originais (`#hero`, `#Top`, `#Lojas`, `#menus`, `#Media`, `#contact`) | Todas existem; nenhum link interno aponta para um id inexistente |
| Ligações externas | 14, todas com `target="_blank"` e `rel="noopener noreferrer"` |
| Telefone / email | `tel:+351213972726`, `mailto:geral@amerendeira.pt` |
| Vídeo a descer e a subir (11 posições) | Frames idênticos nos dois sentidos (0, 27, 46, 59, 72, 85, 98, 121, 151, 181, 192), sequência monótona |
| Overflow horizontal (390 / 768 / 1440) | 0 / 0 / 0 px |
| Produto no enquadramento (390 / 768 / 1440) | Sempre dentro do ecrã; em 390 a ampliação inicial (1,12×) só acontece enquanto a massa ocupa 10–90 % da largura |
| Botões do primeiro ecrã | Clicáveis (nada por cima), incluindo durante o vídeo |
| Teclado | Ordem: saltar para o conteúdo → logótipo → Lojas → Menus → Notícias → Contactos → Menu → Ver menus…; contorno de foco de 2 px em todos |
| Menu | Abre, foco no painel, Tab fica preso no painel, Esc fecha e devolve o foco, “Menus” leva a `#menus` |
| Galeria | Lightbox abre, setas mudam de fotografia, Esc fecha e devolve o foco |
| Intro | “Saltar intro” termina de imediato; memorizada para a sessão (não repete ao recarregar) |
| `prefers-reduced-motion` | Sem intro, sem scrub, sem legendas; mostra o frame final; “Ver o vídeo” reproduz inline com controlos, sem som, só após clique |
| Sem JavaScript | Hero com capa, títulos, botões e todo o conteúdo visível |
| Rede lenta (+1,5 s por imagem) | Aos 800 ms os textos e botões já estão visíveis; o canvas fica ativo aos ~5,1 s; até lá vê-se a capa |
| Falha dos frames do vídeo | Sem erros; a capa (massa) dá lugar ao frame final (pão) com o scroll, por isso as legendas continuam coerentes |
| axe-core 4 (WCAG 2.0/2.1 A e AA), 1440 e 390 | 0 violações |

## Desempenho medido (headless, sem GPU)

Scroll por roda do rato (50 passos para baixo e 50 para cima), média de intervalos de
`requestAnimationFrame`:

| Viewport | Secção estática | Filme (canvas) |
| --- | --- | --- |
| 1440×900 | 60 fps | 46–48 fps (p95 33 ms) |
| 390×844 (DPR 2, frames 960 px) | 60 fps | 60 fps |

Primeiro registo do filme a 1440: 27 fps. A causa era um `filter: blur()` CSS sobre a placa de
fundo em ecrã inteiro; passou a um blur dentro do canvas de 1/6 de resolução (47 fps). Uma janela de
`ImageBitmap` pré-descodificados foi testada e piorou (31 fps), por isso foi retirada. Num browser
com GPU (o caso normal em desktop) é de esperar mais; **os 60 fps em desktop não foram confirmados
neste ambiente**.

Seek do vídeo original (antes da conversão): 395 ms por posição (só tem um keyframe). Detalhes em
`docs/video.md`.

## Alterações intencionais ao conteúdo

1. Menu Bebida: retirado o “t” solto no fim (“…sabor caseiro.t” → “…sabor caseiro.”).
2. Crédito: “Desenvolvido por Flowwwzy” → “Site original por Flowwwzy” (mesmo destino). O novo site
   não foi feito pela Flowwwzy; a redação final cabe ao cliente.
3. Botão do hero: no original “MENUS” levava a `#Lojas`; agora há “Ver menus” → `#menus` e
   “Encontrar uma loja” → `#Lojas`.
4. As fotografias de hover da imprensa (que eram fotos do espaço, duas delas trocadas) passaram para
   a secção Experiência e ambiente; a lista de imprensa mostra os títulos verificados dos artigos.

## Não validado aqui

- Safari / iOS e Firefox reais, e dispositivos móveis físicos (só emulação Chromium).
- Desempenho com GPU e em telemóveis de gama baixa (CPU sem limitação nos testes).
- Conteúdo das páginas do Tripadvisor e do Yelp (403 para browsers automatizados).
- Lighthouse (não disponível neste ambiente).
