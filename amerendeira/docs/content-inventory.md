# Inventário de conteúdo — amerendeira.pt

Levantamento feito a 26/10/2026 num Chromium real (Playwright), em 1440×900 e 390×844, com scroll
completo da página e o menu de navegação aberto. Capturas de referência em `docs/original-site/`.

O site é uma única página Webflow (`<html>` sem atributo `lang`, título “A Merendeira”).
`/sitemap.xml` devolve 404 e `robots.txt` está vazio. Não existem páginas `/menu`, `/sobre`,
`/lojas` nem página de privacidade (todas 404).

## Âncoras reais

| Âncora | Elemento original | No novo site |
| --- | --- | --- |
| `#hero` | barra de navegação | barra de navegação (mesmo id) |
| `#Top` | secção hero | secção hero (mesmo id, maiúscula preservada) |
| `#Lojas` | secção Lojas | secção Lojas (mesmo id) |
| `#menus` | secção Menus | secção Menus (mesmo id) |
| `#Media` | “O que dizem sobre nós” | Imprensa e recomendações (mesmo id) |
| `#contact` | rodapé | rodapé / contactos (mesmo id) |

Como todas as âncoras se mantêm, não são precisos redirecionamentos. O novo site acrescenta
`#tradicao`, `#ambiente` e `#galeria` para as secções que antes não tinham âncora.

## Navegação (menu aberto, painel amarelo #FFC629)

LOJAS → `#Lojas` · MENUS → `#menus` · NOTÍCIAS → `#Media` · CONTACTOS → `#contact` ·
geral@amerendeira.pt (link `#`) · ícone Instagram → instagram.com/amerendeira.pt/

## Textos (transcrição integral)

**Hero** — título desenhado em SVG: “é boa nas horas”. Botão “MENUS”. “Pão com chouriço feito à moda
antiga. Com forno a lenha e alma portuguesa. Milhares de clientes felizes.” Nota lateral: “O PÃO COM
CHOURIÇO / É REI E A TRADIÇÃO / É SERVIDA QUENTE.”

**Números** — “2 LOCALIZAÇÕES”, “36 ANOS A SERVIR”. “A Merendeira celebra a tradição portuguesa com o
autêntico pão com chouriço, assado em fornos a lenha. Com foco na qualidade e na cultura
gastronómica, preservamos o sabor da tradição para o prazer das pessoas e a riqueza da nossa
herança.”

**Lojas** — “ONDE ESTAMOS / AS NOSSAS LOJAS”. LISBOA: “AV. 24 DE JULHO 54, 1200-657 LISBOA”, VER NO
MAPA → https://maps.app.goo.gl/YGrR9Q1cRhXgSeTN6 (resolve para “A Merendeira”, 38.70689,-9.15364).
COSTA DA CAPARICA: “R. DOS PESCADORES 20, 2825-386 COSTA DA CAPARICA”, VER NO MAPA →
https://maps.app.goo.gl/L7vDcLWHxvQPhHgB8 (resolve para “A Merendeira”, 38.64348,-9.23531).

**Experiência e ambiente** — “Mais do que uma refeição, visitar a Merendeira é uma celebração da mesa
portuguesa. Do crepitar da lenha no forno ao cheiro inconfundível do pão acabado de sair, tudo
convida a abrandar e saborear.”

**O sabor em imagens** — “Conhece o nosso espaço, os nossos pratos e os momentos especiais
partilhados à volta da mesa. Cada imagem, uma história de sabor.” Botão “CONHECE OS MENUS” → `#menus`.

**Menus** — título desenhado “os nossos menus”; “PRODUTOS / OS NOSSOS MENUS”; “Todos os nossos
produtos são confecionados com base na sua receita original de 1972”.

- 01. MENU BEBIDA — “Simples, direto e delicioso. Um pão com chouriço estaladiço, assado no nosso
  forno a lenha, servido com a tua bebida favorita, seja uma cerveja fresca, refrigerante ou água.
  Ideal para uma pausa rápida com sabor caseiro.t” (sic) — foto ME101.JPG
- 02. MENU DUO — “Dois clássicos que falam por si. O nosso pão com chouriço junta-se ao caldo verde,
  com aquele toque de chouriço que aquece. Uma bebida para refrescar e está feito: simples,
  português e reconfortante.” — foto ME106.JPG
- 03. MENU MERENDEIRA — “Um menu completo para quem quer saborear tudo. Pão com chouriço assado em
  forno de lenha, caldo verde à moda antiga, uma taça de arroz doce, café expresso e bebida à
  escolha. Perfeito para almoços ou jantares cheios de sabor e memória.” — foto ME112 (1).JPG
- 04. MENU SOPA — “Uma opção mais leve. Pão estaladiço assado no forno a lenha, acompanhado por uma
  sopa à tua escolha. Simples, nutritivo e cheio de sabor. Ideal para quem prefere alternativas mais
  completas.” — foto ME107.png

Não há preços nem horários em lado nenhum do site, nem dentro das imagens.

**O que dizem sobre nós** (`#Media`)

| # | Tipo | Nome | Destino | Verificação (browser) |
| --- | --- | --- | --- | --- |
| 01 | Notícia | NIT | https://www.nit.pt/comida/10-07-2016-onde-comer-pao-com-chourico-de-madrugada-em-lisboa/attachment/1981 | 200 — “A Merendeira, Santos — NiT”, artigo “Onde comer pão com chouriço quente de madrugada em Lisboa” |
| 02 | Notícia | El País | https://brasil.elpais.com/brasil/2018/01/04/elviajero/1515072432_714377.html | 200 — “Seis tascas autênticas para comer com gosto e barato em Lisboa” |
| 03 | Recomendação | Tripadvisor | https://www.tripadvisor.pt/Restaurant_Review-g189158-d5977644-Reviews-A_Merendeira-Lisbon_Lisbon_District_Central_Portugal.html | 403 para browsers automatizados (proteção anti-bot); não foi possível confirmar o conteúdo |
| 04 | Recomendação | Yelp | https://www.yelp.com/biz/a-merendeira-lisboa | 403 para browsers automatizados; não confirmado |
| 05 | Recomendação | Guia da Cidade | https://www.guiadacidade.pt/pt/r/restaurante-a-merendeira-28728 | 200 — “Restaurante A Merendeira - Lisboa - Santos” |

**Galeria de sabores**: repete o parágrafo “Conhece o nosso espaço…” e mostra 6 fotografias.

**Rodapé** (`#contact`): LOJAS, MENUS, MEDIA · INSTAGRAM → https://www.instagram.com/amerendeira.pt ·
FACEBOOK → https://www.facebook.com/AMerendeira/ · VOLTAR AO TOPO → `#Top` · título desenhado “fala
connosco” · +351 21 397 2726 → `tel:+351213972726` · GERAL@AMERENDEIRA.PT →
`mailto:geral@amerendeira.pt` · “©A Merendeira” · “Política de Privacidade” (link `#`) ·
“Desenvolvido por Flowwwzy” → https://www.lukas-rudrof.de

## Identidade visual observada

- Fundo `#F7F6F1` (white smoke), texto `#191919`, cinzento claro `#F1F0EC`, cinzento `#AFAFAF`,
  `#55554D`, amarelo `#FFC629` no painel do menu (o mesmo amarelo do letreiro e dos aventais aos
  quadrados que aparecem nas fotografias).
- Tipografia de texto: Inter (variável, caixa alta nos títulos de secção). Títulos expressivos em
  serifa de alto contraste, entregues como SVG (“é boa nas horas”, “os nossos menus”, “fala
  connosco”).
- Logótipo: “A MERENDEIRA” em letras condensadas, com o “M” sublinhado (SVG). Monograma “m” sublinhado
  no favicon e no ícone.

## Problemas encontrados no site original (para revisão)

1. O botão “MENUS” do hero aponta para `#Lojas`, não para `#menus`.
2. O email no menu (`geral@amerendeira.pt`) e o título “fala connosco” apontam para `#`.
3. As fotografias das lojas apontam para `#`.
4. “Política de Privacidade” aponta para `#`: não existe página de privacidade publicada.
5. Na lista de imprensa as imagens de hover de El País e Tripadvisor estão trocadas
   (`Tripadvisor.png` na linha El País e vice-versa). Estas imagens são fotografias do espaço, não
   logótipos das publicações.
6. Duas imagens da secção Lojas (`dada_design…unsplash.webp`, `hemant-kanojiya…unsplash.webp`) são
   fotografias de camas, restos do template de mobiliário. Muitos ficheiros reais da Merendeira
   também mantêm nomes do template (`bilal-mansuri…unsplash`).
7. Descrição do Menu Bebida termina com um “t” solto (“…sabor caseiro.t”). O novo site mostra
   “…sabor caseiro.”, sem outra alteração ao texto.
8. Todas as imagens têm `alt=""`; o `<html>` não declara idioma.
9. O link da NiT abre a página de anexo de uma fotografia dentro do artigo (`/attachment/1981`), não o
   artigo em si. O destino original é mantido.
10. “36 ANOS A SERVIR” e “receita original de 1972” são números fixos no texto. Foram mantidos tal
    como estão; não foram convertidos em data de fundação nem em contador automático. Convém
    confirmar se “36 anos” continua atual.
11. A og:image é uma captura de ecrã do próprio site.
12. A fotografia do pão com caldo verde aparece duas vezes (O sabor em imagens e Galeria de sabores).
