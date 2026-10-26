# Registo de referências — MotionSites.ai e 21st.dev

Consulta feita a 26/10/2026 num Chromium real (Playwright).

## Acesso disponível

| Recurso | O que foi possível | Dependência em falta |
| --- | --- | --- |
| https://motionsites.ai/ | Navegar no catálogo e abrir pré-visualizações. O botão oficial “Copy full prompt” funcionou sem conta em dois prompts gratuitos. | “Copy source code” abre a página de compra (packs desde 49 USD ou plano Unlimited). Os prompts marcados “Go Unlimited” exigem compra. |
| https://motionsites.ai/mcp | Lida a página. O MCP regista-se com `claude mcp add motionsites --transport http …`. | Requer iniciar sessão com conta MotionSites no browser (OAuth); as contas gratuitas abrem 3 prompts e as pagas desbloqueiam o resto. Não havia conta nesta sessão, por isso o MCP não foi usado. |
| https://21st.dev/ | Navegar no catálogo, abrir pré-visualizações e ler os metadados oficiais de cada componente no registo `https://21st.dev/r/<autor>/<componente>`. | O código (registo, “Copy prompt”, separador Code, CLI `@21st-dev/cli`) exige sessão iniciada ou token `API_KEY_21ST`. A CLI respondeu “Not signed in”. |
| https://21st.dev/mcp | Lida a página (CLI + skills, `21st login`). | O plugin 21st desta sessão não tem servidor MCP ligado nem chave configurada. |

Nada foi comprado e não foi integrado código de terceiros. Todo o código do site é original; as
referências abaixo inspiraram técnicas e coreografia.

## Recursos consultados

| Recurso | Aspeto que inspirou | Estado | Adaptação na Merendeira |
| --- | --- | --- | --- |
| [MotionSites — Freight Scroll Hero](https://motionsites.ai/?prompt=freight-scroll-hero) | Vídeo em `position: sticky` só controlado pelo scroll (nunca em reprodução); keyframe a cada 4 frames para seeks instantâneos; versão 720p para ecrãs pequenos e Save-Data; poster = primeiro frame; suavização `cur += (alvo − cur) × 0,22`; não pedir novo seek enquanto `seeking`; mapeamento em duas fases (“knee”); a secção seguinte sobe por cima do vídeo com um gradiente para a cor de fundo, de modo que o cenário do vídeo continua na página. | **Prompt copiado** pelo botão oficial (8 259 caracteres; guardado localmente, não redistribuído no repositório). Código-fonte não obtido (pago). | Princípios aplicados ao vídeo real: 0–100 % da secção mapeado para o segmento escolhido, suavização com o mesmo princípio e um único pedido de frame de cada vez. O fundo cinzento-claro de estúdio do vídeo funde-se com o fundo da página por gradiente. Em vez do `<video>` com seek, usamos frames em canvas 2D (decisão justificada em `docs/video.md`). |
| [MotionSites — Nature Portfolio](https://motionsites.ai/?prompt=nature-portfolio) | Abertura com filme + botão “Skip” com alvo de 44 px; fundo alternativo se o filme falhar; menu que abre com `clip-path: inset(0 0 100% 0) → inset(0)`; Escape fecha camadas pela ordem; tokens de easing `cubic-bezier(.22,.61,.36,1)`. | **Prompt copiado** pelo botão oficial (29 795 caracteres; guardado localmente). A esfera 3D do prompt não foi usada (fora do âmbito: sem 3D). | Intro com “Saltar intro”, uma vez por sessão; painel de menu amarelo (#FFC629, a cor real do menu original) com revelação por `clip-path`; Escape fecha o menu e devolve o foco ao botão. |
| [MotionSites — Ink Reveal](https://motionsites.ai/?prompt=ink-reveal), Hover Ink | Revelação de imagem no hover. | Apenas pré-visualização (bloqueado: “Go Unlimited”). | Não usado: o efeito de tinta não combina com a marca. |
| [21st — Hero Scrub](https://21st.dev/@jean.duthil13/components/hero-scrub) (Jean Duthil) | Sequência de imagens num canvas controlada por GSAP ScrollTrigger com pin; respeita `prefers-reduced-motion`; mobile-aware. | Consultado (pré-visualização + descrição oficial). Código exige sessão. | É a técnica escolhida para o vídeo: frames do vídeo real em canvas 2D, ScrollTrigger com pin, desenho apenas quando o frame muda. Sem o “cartão que cresce”: o pão fica em grande escala desde o início. |
| [21st — Scroll-Locked Video Hero](https://21st.dev/@gughigug/components/scroll-locked-video-hero) | Vídeo inteiro avança e recua frame a frame com o scroll; título dissolve-se com o progresso. | Consultado (descrição oficial). | O título “é boa nas horas” sai suavemente quando a ação do vídeo começa, para não tapar o pão. |
| [21st — Scroll media expansion hero](https://21st.dev/@arunachalam/components/scroll-expansion-hero) | Media que se expande com o scroll. | Consultado (pré-visualização). | Não usado no hero (o produto não pode ser cortado nem reduzido a um cartão). Inspirou a imagem do lume que se abre até à largura total na abertura dos menus. |
| [21st — Reveal Image Mask](https://21st.dev/@daiwiikharihar/components/reveal-image-mask) | Máscara que “floresce” de uma forma contida (arco) até à moldura editorial completa, guiada pelo scroll. | Consultado (pré-visualização + descrição oficial). | Motivo central do site: **máscara em arco**, a forma da boca do forno a lenha e das arcadas reais da loja (visíveis nas fotografias). Implementado com `clip-path` animado por GSAP. |
| [21st — Vertical Cut Reveal Characters](https://21st.dev/@cnippet-dev/components/m-vertical-cut-reveal-2) | Letras reveladas por um corte vertical, em cascata a partir do centro. | Consultado (pré-visualização). | Títulos de secção revelados linha a linha por máscara (`overflow: hidden` + translação), com a cascata adaptada à leitura (da esquerda para a direita). |
| [21st — Scroll word reveal (Motion)](https://21st.dev/@motiondotdev/components/motion-scroll-word-reveal) | Palavras que ganham opacidade com o scroll. | Consultado (descrição oficial). | Parágrafo de marca (“A Merendeira celebra a tradição…”) revelado palavra a palavra, apenas com o texto real. |
| [21st — Horizontal Scroll](https://21st.dev/@uilayout.contact/components/horizontal-scroll) | Fila de painéis que se desloca na horizontal com o scroll vertical. | Consultado (descrição oficial). | Fita de fotografias do espaço na secção Experiência e ambiente, com movimento lateral moderado (sem bloquear o scroll). |
| [21st — Stacking Cards](https://21st.dev/@danielpetho/components/stacking-cards), [Kinetic Scroll Gallery](https://21st.dev/@dhileepkumargm/components/kinetic-scroll-gallery) | Pilha de cartões e distorção pela velocidade do scroll. | Consultados (descrição). | Não usados: a grelha de cartões e a distorção iam contra a direção pedida. |
| [21st — Sterling Gate: Kinetic Navigation](https://21st.dev/@hardikkashiyani123456788/components/sterling-gate-kinetic-navigation) | Navegação em ecrã inteiro, tipográfica, “quiet luxury”. | Consultado (descrição oficial). | Menu em painel amarelo com links em tipografia grande, entrada em cascata e microinteração no hover. |

Os prompts obtidos não estão no repositório porque a licença do MotionSites não prevê
redistribuição. Ficam guardados localmente, na área temporária desta sessão.
