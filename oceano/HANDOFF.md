# Restaurant Oceano · proposta de redesign

**Pré-visualização:** https://claude.ai/artifact/AjJtg6aSX23Rx7VLEbKHzz
(privada; abre-se pelo menu Partilhar da página para a mostrar a alguém)

É uma proposta. O site Duda em burguesa.ch não foi tocado. O logótipo, as fotografias e os textos pertencem ao Restaurant Oceano, por isso o site novo só vai para o ar com o acordo dos donos. Até lá, todas as páginas mostram a faixa fixa "Proposta de design · não é o site oficial".

Na pré-visualização, as páginas abrem-se pelo fim do endereço: `#de`, `#de-unsere-kueche`, `#en-our-shop`, `#pt-sobre-nos`, `#fr-contact`, `#it-note-legali`… Sem nada, abre na língua do navegador (alemão por defeito).

## Como correr e publicar

```bash
npm install
npm run dev              # http://127.0.0.1:5200/de/
npm run build            # site estático em dist/ (45 páginas, sitemap, robots, _redirects)
npm run build:artifact   # a versão para a pré-visualização claude.ai, em artifact/
npm run count            # confere os textos alemães com a captura do site atual e as 4 traduções
python3 -I scripts/prepare_images.py   # volta a gerar as imagens de public/ a partir de media/
```

- `VITE_FORM_ENDPOINT=https://formspree.io/f/xxxx` liga o formulário de contacto. Sem esta variável, o formulário fica em modo de teste: valida os campos mas não envia nada, e diz isso ao visitante.
- `VITE_PROPOSAL=0` tira a faixa de proposta e o espaço vazio da Speisekarte. Só se usa quando os donos aprovarem.
- Cada endereço tem o seu HTML com título, descrição, `canonical`, `hreflang` e o JSON-LD (`Restaurant` para o restaurante e `Store` para a loja, ligados um ao outro, com os dois horários; sexta e sábado fecham às 01:00 do dia seguinte).
- Pilha: React 19, Vite 6, TypeScript, Tailwind 4, Motion 12, GSAP ScrollTrigger, three.js, lottie-web, Radix. A base é a dos redesigns anteriores (`../entreamigos`, `../leportugais`), adaptada.
- Os textos alemães vivem em `content/texts.de.json` (copiados do site), as traduções em `content/translations/*.json`, as descrições das fotos em `content/translations/photos.json`.

## O que está feito

**Página inicial** (os números são os capítulos que aparecem no site):

0. Introdução na primeira visita: o logótipo num disco, "RESTAURANT OCEANO" letra a letra, "NICHT NUR BURGER · SCHLIEREN" por baixo; depois o logótipo voa para o cabeçalho e o arco do hero abre-se. "Intro überspringen", Esc ou clique.
1. Hero: o H1 do site por cima, "NICHT NUR BURGER" à esquerda e "IN SCHLIEREN" à direita, à volta do arco com o "Oceano" em WebGL (o Atlântico em águas profundas, nas cores do site). O ponteiro faz ondas.
2. A história 2004 · 2010 · 2020 (cena fixa): o arco cresce até o mar encher o ecrã, o ano rola no centro e afasta-se, o texto "Über uns" aparece em 3 legendas numeradas com a barra de progresso, e acaba em "Warum kommen Sie nicht vorbei und lernen uns kennen?" com "Online Reservierung" e o telefone.
3. "Mehr als nur Burger" (cena fixa): BURGER, FLEISCH & FISCH, MEERESFRÜCHTE, PASTÉIS DE NATA, cada capítulo com a frase do site e a foto onde se vê essa comida (os pastéis não têm foto: ilustração e espaço "Foto: Pastéis de nata"). No último capítulo, 70 → 1 conta com o scroll; tocar recomeça.
4. Faixa do logótipo (acelera com o scroll, inverte com a direção, pausa).
5. Neuigkeiten: os três teasers do site como cartões.
6. Unsere Küche: o título e o parágrafo do site, a colagem de fotos, o autocolante "Authentische Rezepte" que roda com o scroll, "Tisch reservieren".
7. Unser Laden: o primeiro parágrafo da loja, a foto da loja, o estado de hoje da loja, o telefone 043 495 07 74 e "Jetzt bestellen".
8. "Dabei haben wir so viel mehr als nur Burger zu bieten." em letras enormes que acendem palavra a palavra; um hambúrguer ilustrado vira um pastel de nata.
9. "Stockfisch und mehr in Schlieren": a viagem de sabores (mapa fixo com os Açores num recorte; o alfinete viaja Lissabon → Algarve → as costas acendem para "Mittelmeer und Atlantik" → Açores), os cartões Portwein e Licor Beirão, "Jetzt bestellen", e a base de cortiça com o logótipo para rodar.
10. Öffnungszeiten: o relógio duplo (anel dos dias, mostrador de 24 h, arco exterior do restaurante, arco interior da loja, ponteiro na hora de Schlieren; sexta e sábado continuam depois da meia-noite com a lua e "bis 1:00"; filtro Restaurant / Laden / Beide), e os dois horários em texto com o estado ao vivo.
11. Tisch reservieren: as três frases de Kontakt, o telefone e o e-mail em pílulas, o horário de hoje, "Wie viele sind Sie?" com o seletor e as cadeiras, "Online Reservierung" (abre a gaveta com o widget MyLocalina) e "Anrufen".
12. Web-Shop: a frase do site e "Zum Web-Shop" (os produtos não puderam ser recuperados: ver abaixo).
13. "Das Auge geniesst mit": galeria com o filtro Restaurant / Laden (os dois grupos do site), faixa horizontal fixa no computador, deslizar no telemóvel, lightbox, "Als Raster anzeigen".
14. Kundenbewertungen: o texto de introdução do site; a parede de opiniões ficou de fora (ver abaixo).
15. Kontakt (bento): cada local com morada, telefone, e-mail, estado ao vivo e horário; os separadores "Route" (Google Maps, Waze, Apple Karten) com o interruptor Restaurant / Laden; o formulário com os campos do site; "Online Reservierung".
16. Rodapé: "RESTAURANT OCEANO" gigante, os dois telefones e o e-mail, as colunas Restaurant, Laden, Web-Shop e Rechtliches (Impressum, Datenschutzerklärung), as 5 línguas, "© 2022 Restaurant Oceano".

**Outras páginas:** Unsere Küche (faixa fixa dos 4 capítulos com pílula deslizante, blocos de cor com as frases e as fotos, 70 → 1 em Nachspeisen, um espaço vazio marcado para a Speisekarte do dono — só na pré-visualização), Unser Laden (a viagem de sabores, o horário e o estado da loja, as 15 fotos da loja), Über uns (linha do tempo 2004 · 2010 · 2020), Kundenbewertungen, Galerie (as 34 fotos em dois grupos), Web-Shop, Kontakt (com o mapa que só carrega depois do clique) e Impressum (texto do site palavra por palavra, mais o link para a Datenschutzerklärung do site).

**Em todo o site:** 5 línguas (alemão por defeito, `de-CH`, com "ss"), menu de idioma no topo de todas as páginas (também nos telemóveis), diapositivo de boas-vindas em cada mudança, gaveta de reserva com a faixa "RESERVIEREN ✱ RESERVAR ✱ BOOK A TABLE ✱ RÉSERVER ✱ PRENOTARE ✱" e o widget MyLocalina (que só carrega depois do clique; botão para abrir em novo separador se não carregar numa moldura), menu móvel com os dois telefones, versão com movimento reduzido.

## Cores

**Medidas no site atual** (1440 px, as 9 páginas, script do brief):

| Cor | Uso no site | Ocorrências |
|---|---|---|
| `#1B1B1B` | texto corrente | 1659 |
| `#000000` | texto, bordas dos botões, fundos escuros | 294 + 27 + 20 |
| `#555555` | nav, links | 71 |
| `#333333` | títulos | 42 |
| `#DFCE9B` | fundos dos botões e dos blocos de horário | 43 |
| `#B2A47C` | cabeçalho | 18 |
| `#FBFAF5`, `#F3F2E1`, `#F5F5F5` | fundos claros | 13 + 8 + 9 |
| `#666666`, `#999999`, `#CCCCCC` | cinzentos, bordas | 36 + 18 + 14 |
| `#FFFFFF`, `#F7F7F7` | branco, texto sobre escuro | 55 + 45 |

**Logótipo:** o "Oceano" em letra manuscrita, cinzento `#555555` sobre transparente — uma só cor. A paleta vem do site.

**Tokens:**

| Token | Valor | De onde vem |
|---|---|---|
| `--marca` | `#6E6140` | o caqui do cabeçalho `#B2A47C`, escurecido para o texto branco (ver abaixo) |
| `--marca-escura` | `#1B1B1B` | o preto do texto e dos fundos escuros do site |
| `--destaque` | `#DFCE9B` | o areia dos botões e dos blocos de horário |
| `--acento` | `#555555` | o cinzento do logótipo, da nav e dos links |
| `--acento-escuro` | `#333333` | o cinzento dos títulos |
| `--fundo` | `#FBFAF5` | o fundo claro do site |
| `--branco` | `#FFFFFF` | o branco do site |
| `--tinta` | `#1B1B1B` | o texto corrente do site |
| `--suave` | `#F3F2E1` | o bege claro do site |
| `--linha` | `#666666` | o cinzento do site |

**Contraste (WCAG 2.x):**

| Par | Rácio | Uso |
|---|---|---|
| `--branco` sobre `--marca-escura` | 17.22 | texto das folhas escuras |
| `--branco` sobre `--marca` | 6.09 | hero, reserva, contacto |
| `--destaque` sobre `--marca` | 3.90 | metade direita do título do hero (texto de display) |
| `--suave` sobre `--marca` | 5.40 | linhas pequenas |
| `--branco` sobre `--acento` | 7.46 | Unsere Küche, horário |
| `--acento-escuro` sobre `--destaque` | 8.09 | a frase grande da banda areia |
| `--destaque` sobre `--marca-escura` | 11.02 | títulos e anos nas folhas escuras |
| `--acento` sobre `--fundo` | 7.13 | |
| `--linha` sobre `--fundo` | 5.49 | etiquetas pequenas |
| `--tinta` sobre `--destaque` | 11.02 | texto dos botões |
| `--destaque` sobre `--acento` | 4.77 | passa, mas lá usa-se branco |

**Mudanças para contraste:**

- `--marca`: o caqui do cabeçalho `#B2A47C` dá só 2.47:1 com o branco. Escureci-o no mesmo tom para `#6E6140` (6.09:1). É a maior mudança desta proposta: o site antigo usa o caqui claro só no cabeçalho, com texto escuro; aqui o tom serve de bloco de cor com texto branco.
- `--linha`: `#666666` em vez do `#999999` do site (2.85:1 sobre o fundo claro) para as etiquetas pequenas.
- A frase da banda areia começa a 25 % de opacidade, como pede o brief, e só fica legível quando acende. O Lighthouse conta isso como falta de contraste (acessibilidade 97).

O site antigo ao lado das amostras: `docs/old-site-vs-tokens.png`.

## Verificações

- **Textos** (`npm run count`): 84 textos alemães encontrados palavra por palavra nas páginas capturadas, menos 4 que não estão no texto visível: a segunda frase do slider ("Restaurant Oceano – Nicht nur Burger in Schlieren": está no HTML da página inicial), "Authentische Rezepte" (as palavras do site, em minúsculas no texto) e as duas mensagens do formulário ("Danke, dass Sie uns kontaktiert haben.", "Hoppla, beim Senden Ihrer Nachricht ist ein Fehler aufgetreten."), que o site só mostra depois de enviar e que vêm do brief. As 4 traduções têm as 157 chaves, sem "ß".
- **Traduções verificadas por um segundo passo** (um agente comparou cada chave com o alemão: números, anos, horas, nomes e marcas inalterados, nenhuma frase a mais ou a menos, português europeu): 0 problemas.
- **Línguas:** as 36 páginas em inglês, português, francês e italiano foram percorridas à procura de alemão esquecido: só o nome "Restaurant Oceano" e, no rodapé francês, "Impressum" (corrigido para "Mentions légales"). `<html lang>` certo em cada uma. Sem erros na consola.
- **Larguras** 375, 390, 768, 1280, 1440 e 1920: sem scroll horizontal (7 páginas nas 5 línguas). As palavras longas em alemão ("Kundenbewertungen", "Öffnungszeiten", "Geschmacksreise") cabem a 375 px.
- **Horas depois da meia-noite:** sexta 11:00–1:00 e sábado 9:00–1:00 estão no código como "25:00"; o estado "Jetzt geöffnet" à 0:30 de sábado vem do arco de sexta, e o mostrador do sábado mostra o pedaço de sexta até à 1:00 (tracejado).
- **Lighthouse, telemóvel:**

  | Página | Desempenho | Acessibilidade | Boas práticas | SEO |
  |---|---|---|---|---|
  | /de/ | 79 | 97 | 100 | 100 |
  | /de/unsere-kueche | 80 | 97 | 100 | 100 |
  | /en/our-shop | 94 | 100 | 100 | 100 |
  | /it/contatti | 96 | 97 | 100 | 100 |

  O que pesa nas duas primeiras: a introdução da primeira visita (o Lighthouse vê-a sempre) e o JavaScript principal, que a foto do hero espera (LCP 4,6 s). Já foi feito dentro da hora: versões de 800 px das fotos para o telemóvel (a página inicial passou de 68 para 79 e Unsere Küche de 73 para 80). O passo seguinte seria pré-gerar o HTML de cada página no build. O alvo de 85 fica por cumprir nessas duas páginas; as outras passam.

**Capturas de ecrã:** `docs/screenshots/1440/` e `docs/screenshots/390/` (cada secção da página inicial, Unsere Küche, Unser Laden e Web-Shop).

## Registo do tempo

Início às 21:07 (UTC). Pré-visualização publicada às 21:38, hand-off às 21:50.

| Fase | Duração aproximada |
|---|---|
| 1. Conteúdo (9 páginas num browser, sitemap, 35 imagens, recortes, textos alemães) | 7 min |
| 2. Sistema (cores medidas, tokens, cabeçalho, gaveta, menu, rodapé) | 6 min |
| 3. Páginas (secções 1–16, 8 páginas interiores) | 13 min |
| 4. Línguas | em paralelo, por um fluxo de 6 agentes: 4 tradutores, 1 descritor de fotos, 1 verificador (17 min, enquanto as fases 2–3 corriam) |
| 5–6. Movimento e interação | vieram da base e foram adaptados nas fases 2–3; o relógio duplo, a viagem de sabores e o 70 → 1 são novos |
| 7. Verificações, publicação, hand-off | 12 min |

Nada da lista de cortes foi largado. Ficou de fora, por não existir no site: a parede de opiniões e a fila de produtos (ver abaixo); as fotos do slider do site não passam atrás do ano na história (os três momentos usam o mar).

## Decisões tomadas

- **Os quatro capítulos** de "Mehr als nur Burger": Burger, Fleisch & Fisch, Meeresfrüchte, Pastéis de nata (na página Unsere Küche o quarto chama-se Nachspeisen). Cada um usa só a frase do site que lhe pertence; nenhum prato foi inventado e não há preços.
- **O espaço da Speisekarte:** cada capítulo de Unsere Küche tem um espaço vazio tracejado "Platz für die Speisekarte des Restaurants", visível só enquanto `VITE_PROPOSAL` estiver ligado.
- **Web-Shop:** a página do site é uma loja Duda (`ecom` no HTML) que não mostra nenhum produto, nem num browser. O site novo mostra a frase do site e "Zum Web-Shop" para a loja atual, com uma nota a dizer que os produtos não puderam ser recuperados.
- **Kundenbewertungen:** a página do site tem um widget de opiniões que não mostra nenhuma, nem num browser. O site novo mantém o texto de introdução e não inventa opiniões.
- **Mapas:** o site não tem links de mapa (tem um mapa Mapbox na página Kontakt, atrás de um consentimento). Criei Google Maps, Waze e Apple Karten a partir das duas moradas. Não consegui confirmar daqui as coordenadas, por isso o JSON-LD não tem `geo`.
- **Meta descrições:** as 5 do site mantidas e traduzidas; Galerie, Web-Shop, Kontakt e Impressum não têm no site e receberam frases das próprias páginas.
- **Crédito** "Realisiert durch localsearch.ch" deixado de fora. A linha de copyright do site é "© 2022 Realisiert durch localsearch.ch"; ficou "© 2022 Restaurant Oceano".
- **Datenschutzerklärung:** o site tem em `/privacy` uma declaração de privacidade completa gerada pelo Duda (não está no sitemap). O rodapé e o Impressum ligam a ela. O Impressum mantém também os links do site para local.ch e search.ch.
- **"Wie viele sind Sie?"** não passa o número ao widget MyLocalina: o widget não documenta nenhum parâmetro. O cartão diz-o ao visitante.
- **Take-away:** a página Kontakt do site fala de "Take-away und Geschäftsessen"; a frase está no site novo tal e qual.
- **Fotos:** 7 das fotos da galeria parecem imagens de banco (`RestaurantOceano-004` a `-011` e `-016`: tapas, mesa vista de cima, filete de peixe, espetadas, salada, hambúrguer de estúdio, sala). Ficaram na galeria, como no site, mas não nos lugares principais: o hero e os capítulos usam as fotos tiradas no restaurante. A confirmar com os donos.
- **Introdução** só quando a visita começa na página inicial.
- **Ícones Lottie:** reaproveitei o conjunto existente (lottie-web com JSON feito à mão; o dotLottie precisa de WebAssembly, que a pré-visualização bloqueia). Sem ícones novos de pastel de nata, lua ou cesto: há ilustrações planas no lugar.
- `/design-taste-frontend` não existe nesta sessão e o `/21st-ui` precisa do servidor da 21st.dev, que não está ligado.

## Conteúdo: contagens

- **Fotos:** 35 ficheiros no site, 34 fotos diferentes (`PHOTO-…-5321` existe em duas versões): 19 do restaurante e dos pratos, 15 da loja, mais o logótipo. Todas usadas, em WebP, com texto alternativo nas 5 línguas (escrito por um agente que olhou para cada uma).
- **Recortes** (só de fotos do restaurante): burger (o hambúrguer com molho de queijo), bacalhau (o bacalhau à lagareiro), polvo, steak (o bife na tábua), platte (a travessa de carne com vinho), gebaeck (o pastel).
- **Pares foto-comida** (a confirmar): Burger → o hambúrguer com molho de queijo; Fleisch & Fisch → bacalhau à lagareiro, bife com batatas roxas, bife com molho, barriga de porco; Meeresfrüchte → polvo grelhado; Nachspeisen → o pastel com café e as fatias de sobremesa; Unser Laden → o balcão da loja.
- **Opiniões:** 0 (a página não mostra nenhuma). **Produtos:** 0 (a página não mostra nenhum).
- **Sitemap:** só as 9 páginas do menu. `/privacy` existe mas não está no sitemap.
- **Não consegui ler:** os produtos do Web-Shop e as opiniões (ambos widgets Duda vazios); as mensagens do formulário (só aparecem depois de enviar).

## Perguntas em aberto para os donos

- **Nome:** o domínio é burguesa.ch, mas o site diz "Restaurant Oceano". "Burguesa" aparece em algum lado, ou é só o endereço?
- **Horário:** os dois horários continuam certos? À sexta e ao sábado serve-se comida até à 1:00, ou é o bar? Fecham nos feriados?
- **Ementa:** a Speisekarte pode ir online, com preços? Que hambúrgueres e pratos deve o site nomear?
- **Web-Shop:** que sistema corre a loja, e deve mudar com o site novo ou ficar onde está? Condições de envio, pagamento e levantamento?
- **Opiniões:** de onde vêm as opiniões? Mantê-las, ou ligar a um perfil Google?
- **Redes sociais:** há contas Instagram ou Facebook?
- **Legal:** a empresa é "Oceano Import GmbH"? Que forma jurídica, UID e responsável vão no Impressum? A Datenschutzerklärung gerada em `/privacy` serve, ou quem escreve uma própria?
- **Eventos:** "bei jedem Anlass herzlich willkommen": há grupos ou eventos privados, e a partir de quantas pessoas?
- **Fotos:** há fotos mais recentes ou maiores, sobretudo dos pratos? Podem ser recortadas? As 7 fotos que parecem de banco são do restaurante? Que foto mostra o quê?
- **Cores:** as cores medidas estão certas, com o caqui escurecido para o contraste?
- **Logótipo:** há uma versão vetorial (SVG)?
- **Reservas:** o widget MyLocalina aceita o número de pessoas ou a data como parâmetro?
- **Revisão:** quem revê os textos em inglês, português, francês e italiano?
- **Crédito:** manter "Realisiert durch localsearch.ch" ou não creditar ninguém?
- **Endereços antigos:** redirecionar todos como na tabela abaixo?

## Redirecionamentos (301, para quando o site novo substituir o Duda)

Já estão em `dist/_redirects`, com e sem a barra final.

| Endereço antigo | Endereço novo |
|---|---|
| / | /de/ (ou a língua guardada / do navegador) |
| /unsere-kueche | /de/unsere-kueche |
| /unser-laden | /de/unser-laden |
| /ueber-uns | /de/ueber-uns |
| /kundenbewertungen | /de/kundenbewertungen |
| /galerie | /de/galerie |
| /web-shop | /de/web-shop (ou o endereço da loja, se ela ficar no sistema atual) |
| /kontakt | /de/kontakt |
| /impressum | /de/impressum |
| /privacy (não está no sitemap) | continua a ser servido até existir uma declaração própria |

## Notas

- **Formulário:** compatível com o Formspree (`VITE_FORM_ENDPOINT`), com campo-isco e tempo mínimo de preenchimento no lugar do captcha; mantém as mensagens de sucesso e erro do site. Na pré-visualização está em modo de teste. Para enviar para oceanoimport.gmbh@bluewin.ch é preciso o acordo dos donos e uma conta Formspree (ou o serviço de formulários do alojamento).
- **Privacidade e Impressum:** antes do lançamento o site precisa de uma declaração de privacidade própria (a atual é gerada pelo Duda e fala de cookies de análise; o site novo não põe cookies de análise) e de um Impressum completo (forma jurídica, UID, responsável).
- **Traduções:** o alemão é o do site. O inglês, o português, o francês e o italiano foram escritos para esta proposta (e verificados por um segundo passo contra os factos) e precisam de ser revistos por falantes nativos antes do lançamento.
