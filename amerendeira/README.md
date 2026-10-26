# A Merendeira — website

Nova versão de https://amerendeira.pt/: uma página única, cinematográfica, com o vídeo do pão com
chouriço controlado pelo scroll, as fotografias originais e todo o conteúdo do site atual.

Next.js 16 (App Router, exportação estática) · React 19 · TypeScript · GSAP 3 + ScrollTrigger
(coreografia de scroll) · Motion (painel do menu) · CSS próprio. Sem Three.js nem WebGL.

## Correr

```bash
npm install
npm run dev        # desenvolvimento, http://localhost:3000
npm run build      # site estático em out/
npm start          # serve out/ em http://localhost:3000
```

`out/` pode ser publicado em qualquer alojamento estático. As âncoras do site original (`#Lojas`,
`#menus`, `#Media`, `#contact`, `#Top`) foram mantidas, por isso não são precisos redirecionamentos.

## Estrutura

| Caminho | Conteúdo |
| --- | --- |
| `src/content/site.ts` | Todos os textos e links (fonte única, copiados do site original) |
| `src/components/Film.tsx` | Hero + vídeo controlado pelo scroll (canvas 2D, legendas, alternativas) |
| `src/components/Intro.tsx` | Abertura (script inline com Web Animations API) |
| `src/components/SiteHeader.tsx`, `MenuPanel.tsx` | Navegação, logótipo animado, painel amarelo |
| `src/components/Sections.tsx` | Tradição, Lojas, Ambiente, Sabor, Lume, Imprensa, Hospitalidade, Rodapé |
| `src/components/Menus.tsx`, `Gallery.tsx` | Menus (fotografia fixa) e galeria com lightbox |
| `src/components/ScrollEffects.tsx` | Revelações, arcos, parallax, deriva lateral, pão recortado |
| `src/lib/videoTimeline.ts`, `frameSequence.ts` | Mapeamento scroll → tempo e carregamento dos frames |
| `public/brand/` | Logótipo, ícones e títulos desenhados originais |
| `public/images/originals/` | Fotografias originais, sem alterações |
| `public/images/optimized/` | AVIF/WebP gerados (`npm run assets`) |
| `public/videos/` | Frames do vídeo, capa, frame final, MP4 sem som (`npm run video`) |
| `media/original/` | Vídeo fornecido, sem alterações (não é publicado) |
| `scripts/` | Preparação de imagens e vídeo, servidor local, testes (`scripts/qa/`) |

## Documentação

- `docs/content-inventory.md`: levantamento do site original, âncoras, textos, problemas encontrados.
- `docs/asset-manifest.md` / `.json`: origem, ficheiro local, dimensões, conteúdo, secção e uso de
  cada ficheiro, e o que foi excluído.
- `docs/references.md`: o que foi consultado no MotionSites.ai e no 21st.dev e como foi usado.
- `docs/video.md`: análise do vídeo, técnica escolhida, medições.
- `docs/qa-report.md`: testes feitos, resultados e o que ficou por validar.
- `docs/screenshots/`: capturas reais (390, 768, 1440 px).

## A rever pelo cliente

- **Política de Privacidade**: não existe no site original (o link aponta para `#`). Está como texto
  até haver um documento.
- **“36 anos a servir”** e **“receita original de 1972”**: mantidos tal como estão; confirmar se o
  número de anos continua atual.
- **Crédito do rodapé**: “Site original por Flowwwzy” (antes “Desenvolvido por Flowwwzy”).
- **Vídeo**: os metadados indicam que foi gerado com Kling AI. O pão do vídeo tem cortes na
  superfície com o chouriço à vista, e as fotografias reais mostram o chouriço cozido dentro da
  massa. Confirmar se esta representação serve a marca.
- O link da NiT abre a página de uma fotografia dentro do artigo (`/attachment/1981`), como no
  original.
