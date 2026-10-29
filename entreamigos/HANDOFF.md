# Entre Amigos · proposta de redesign

**Pré-visualização:** https://claude.ai/artifact/RNLVfRgY3vxZKox6ru5LHk
(privada; abre-se pelo menu Partilhar da página para a mostrar a alguém)

É uma proposta. O site WordPress em entreamigos.ch não foi tocado. O logótipo, as fotografias e os textos pertencem ao Café-Restaurant Entre Amigos, por isso o site novo só vai para o ar com o acordo dos donos. Até lá, todas as páginas mostram a faixa fixa "Proposta de design · não é o site oficial".

Na pré-visualização, as páginas abrem-se pelo fim do endereço: `#fr`, `#fr-carte`, `#de-speisekarte`, `#pt-por-encomenda`, `#it-vini`, `#en-getting-here`… Sem nada, abre na língua do navegador (francês por defeito).

## Como correr e publicar

```bash
npm install
npm run dev              # http://127.0.0.1:5190/fr/
npm run build            # site estático em dist/ (30 páginas, sitemap, robots, _redirects)
npm run build:artifact   # a versão para a pré-visualização claude.ai, em artifact/
npm run count            # confere a carta e os vinhos com a cópia guardada do site atual
python3 -I scripts/extract_menu.py    # volta a gerar content/menu.json e content/wines.json de content/raw/
python3 -I scripts/prepare_images.py  # volta a gerar as imagens de public/ a partir de media/
```

- `VITE_PROPOSAL=0` tira a faixa de proposta. Só se usa quando os donos aprovarem.
- Cada endereço tem o seu HTML com título, descrição, `canonical`, `hreflang` e o JSON-LD `Restaurant` (horário incluído, sem `geo`: ver as decisões).
- Pilha: React 19, Vite 6, TypeScript, Tailwind 4, Motion 12, GSAP ScrollTrigger, three.js, lottie-web, Radix. A base é a do redesign Le Portugais (`../leportugais`), adaptada.

## O que está feito

**Página inicial, por esta ordem** (os números são os capítulos que aparecem no site):

0. Introdução na primeira visita (uma vez por sessão, só quando a visita começa na página inicial): o logótipo num disco, "ENTRE AMIGOS" letra a letra, o lema por baixo; depois o logótipo voa para o cabeçalho e o arco do hero abre-se. Botão "Passer l'intro", Esc ou clique.
1. Hero: "Café-Restaurant Entre Amigos" por cima, "SPÉCIALITÉS PORTUGAISES ET FRANÇAISES" à esquerda e "À TOMBER PAR TERRE !" à direita, à volta do arco com o "Mar e sol" em WebGL (o mar à hora dourada nas cores do site). O ponteiro faz ondas. O tamanho do título segue a palavra mais longa, para o alemão caber.
2. "Envie d'évasion ?" (cena fixa): o arco cresce até o mar encher o ecrã, o lema acende linha a linha com os "*" do site e afasta-se, as quatro frases do site aparecem como 3 legendas numeradas com a barra de progresso, e acaba em "PLUTÔT VIANDE OU POISSON ?" com os botões "Viande" (salta para a Picanha) e "Poisson" (salta para o Bacalhau à Braga).
3. "Plutôt viande ou poisson ?" (cena fixa, folha escura): Rissoles (dès 2.00 / pièce), Bacalhau à Braga (28.00, "Délai d'attente : 30 min." em Caveat), Picanha (28.00), Francesinha (22.00, "Une portion généreuse vous sera servie."), cada uma com a sua frase da página inicial. Recortes a três profundidades; na Francesinha o molho escorre sobre o arco ao passar o rato ou tocar.
4. Faixa do logótipo: acelera com o scroll, inverte com a direção, tem pausa.
5. Plats du jour: as duas frases do site, o cartão do Facebook que só carrega depois do clique, a foto da esplanada num arco e o selo de hoje ("Aujourd'hui : midi et soir" / "midi" / "jusqu'à 16h00").
6. La carte: as 11 secções com as contagens, "Viande / Poisson / Tout" que troca a colagem de fotos, e o autocolante "Just Eat · UberEats" que roda com o scroll.
7. Sur commande: os 5 pratos com a descrição francesa em Caveat e o preço "/ par personne", a foto do leitão, e o planeador de grupo.
8. "Vous en avez l'eau à la bouche ?…" em letras enormes que acendem palavra a palavra (25 % → 100 %), dois copos que brindam, a foto do vinho num arco.
9. "BLANC, ROSÉ OU ROUGE ?": a viagem do vinho (mapa fixo enquanto o parágrafo do site passa ao lado; o alfinete viaja Minho → Douro → Dão → Alentejo e cada paragem mostra os vinhos com preços), o filtro de cor, a frase do Sumol com laranja e ananás, e a base de cortiça com o logótipo para rodar.
10. "Nos Horaires": a roda da semana (hoje marcado, "Midi / Soir"; com "Soir" o domingo e a segunda apagam-se), o horário como no site e "Ouvert maintenant / Fermé maintenant" na hora de Genebra.
11. Réserver: telefone e e-mail em pílulas grandes, o serviço de hoje e "Combien êtes-vous ?" (de 1 a 9: ligar ou e-mail; a partir de 10: também os 5 pratos por encomenda, que abrem o planeador).
12. "Pour vos livraisons": Just Eat e UberEats.
13. Galerie: faixa horizontal fixa no computador, deslizar no telemóvel, lightbox, "Voir en grille".
14. Menus enfants: quatro cartões que inclinam para o ponteiro e viram ao tocar (conteúdo e preço; a piada traduzida por baixo nas outras línguas).
15. Plan d'accès (bento): aberto/fechado agora com o horário completo, a morada com os separadores "Itinéraire" (Google Maps, Waze, Apple Plans), "Accès" (Bus A, Bus 1 et 9, Parking), telefone, e-mail, Facebook. Sem formulário.
16. Rodapé: "ENTRE AMIGOS" em tamanho gigante, Réserver, telefone, e-mail, morada, horário, entregas, Facebook, as 5 línguas e "Copyright © 2026 Café-Restaurant Entre Amigos".

**Outras páginas:** la carte (pesquisa sem acentos, filtro carne/peixe, faixa fixa das 11 secções que acompanha o scroll, preços como no site, as notas de origem e acompanhamentos, os três "Délai d'attente", a fondue com ilustração, os menus infantis em cartões, ligação ao PDF), sur commande (o planeador em tamanho grande), nos vins (a viagem, a lista completa por secção com as garrafas, "Les vins portugais" palavra por palavra ao lado do mapa do site, o Sumol), galerie e plan d'accès (com o mapa que só carrega depois do clique).

**Em todo o site:** 5 línguas com o menu de idioma no topo de todas as páginas (também nos telemóveis), o diapositivo de boas-vindas em cada mudança, a gaveta "Réserver" com a faixa "RÉSERVER ✱ RESERVAR ✱ BOOK A TABLE ✱ PRENOTARE ✱ RESERVIEREN ✱", o menu móvel com o botão de chamada grande (o botão flutuante do site atual vive aqui agora), e a versão com movimento reduzido.

## Cores

**Medidas no site atual** (1440 px, as 5 páginas, script do brief):

| Cor | Uso no site | Ocorrências |
|---|---|---|
| `#576674` | texto corrente | 1662 |
| `#FFFFFF` | texto sobre as bandas, fundos | 577 + 6 |
| `#6A0719` | títulos, nav ativa, bandas, botões da carta | 247 + 32 |
| `#8F0F0F` | links | 89 |
| `#757575` | texto cinzento | 44 |
| `#DD9933` | botões, botão de chamada flutuante | 15 |
| `#3B5998`, `#000000`, `#800000` | ícones sociais e detalhes | ≤ 5 |

**Logótipo:** branco sobre transparente (aparece cinzento no cabeçalho atual), por isso não dá cores. A paleta vem toda do site.

**Tokens:**

| Token | Valor | De onde vem |
|---|---|---|
| `--marca` | `#6A0719` | títulos, bandas e nav ativa do site |
| `--marca-escura` | `#3D0612` | `--marca` escurecido (o site não tem banda escura) |
| `--destaque` | `#DD9933` | botões e botão de chamada do site |
| `--acento` | `#576674` | o ardósia do texto corrente do site |
| `--acento-escuro` | `#2F3943` | `--acento` escurecido |
| `--fundo` | `#FBF4EA` | tom muito claro de `--destaque` (o site usa branco) |
| `--branco` | `#FFFFFF` | o branco do site |
| `--tinta` | `#26303A` | `--acento` muito escurecido |
| `--suave` | `#F2D9DD` | tom claro de `--marca` |
| `--linha` | `#6B6B6B` | o cinzento `#757575` do site, escurecido |

Decisão: para `--acento` usei o ardósia do texto e não o vermelho dos links (`#8F0F0F`), que tem o mesmo tom de `--marca` e não daria um bloco de cor diferente. O vermelho dos links ficou nas ilustrações (gambas, polvo, francesinha) e nas cadeiras do "Combien êtes-vous ?". Nenhum tom fora do site foi acrescentado.

**Contraste (WCAG 2.x):**

| Par | Rácio | Uso |
|---|---|---|
| `--branco` sobre `--marca-escura` | 17.03 | texto das folhas escuras |
| `--branco` sobre `--marca` | 12.67 | hero, reserva, contacto |
| `--destaque` sobre `--marca` | 5.24 | metade direita do título, destaques |
| `--suave` sobre `--marca` | 9.50 | linhas pequenas |
| `--branco` sobre `--acento` | 5.90 | la carte, horário |
| `--acento-escuro` sobre `--destaque` | 4.86 | a frase grande da banda dourada |
| `--destaque` sobre `--marca-escura` | 7.04 | preços e títulos nas folhas escuras |
| `--acento` sobre `--fundo` | 5.40 | |
| `--linha` sobre `--fundo` | 4.88 | etiquetas pequenas, pontilhados |
| `--tinta` sobre `--destaque` | 5.54 | texto dos botões |
| `--destaque` sobre `--acento` | 2.44 | **nunca**: lá usa-se `--branco` |

**Mudanças para contraste:**

- `--linha`: `#757575` → `#6B6B6B` (4.22 → 4.88 sobre `--fundo`).
- Os botões dourados do site têm texto branco (2.42:1). Aqui o texto dos botões é `--tinta` (5.54:1).
- A frase da banda dourada começa a 25 % de opacidade, como pede o brief, e só fica legível quando acende. O Lighthouse conta isso como falta de contraste (acessibilidade 97 na página inicial).

O site antigo ao lado das amostras: `docs/old-site-vs-tokens.png`.

## Verificações

- **Contagens** (`npm run count`): 11 secções e 68 linhas, todas com preço escrito como no site ("28.00"), todos os nomes encontrados palavra por palavra na página guardada; 4 secções e 15 vinhos com preço; descrições nas 5 línguas.
- **Línguas:** as 24 páginas em inglês, português, italiano e alemão foram percorridas à procura de texto francês esquecido: nenhum. `<html lang>`, endereço, título e escolha guardada mudam com o menu de idioma, no computador e no telemóvel.
- **Larguras** 375, 390, 768, 1280, 1440 e 1920: sem scroll horizontal (6 páginas nas 5 línguas). Sem erros na consola.
- **Teclado:** o planeador (setas no calendário e no seletor de pessoas, que não desce abaixo de 10; "Soir" desativa-se à segunda e ao domingo), a roda da semana (setas), a viagem do vinho (setas nas regiões), os separadores, a gaveta e o menu de idioma.
- **Lighthouse, telemóvel:**

  | Página | Desempenho | Acessibilidade | Boas práticas | SEO |
  |---|---|---|---|---|
  | /fr/ | 80–84 | 97 | 100 | 100 |
  | /fr/carte · /en/menu | 83–85 | 100 | 100 | 100 |
  | /fr/galerie | 85 | 100 | 100 | 100 |
  | /de/weine | 97 | 100 | 100 | 100 |
  | /pt/por-encomenda · /de/auf-bestellung | 96 | 100 | 100 | 100 |
  | /it/come-arrivare | 96 | 100 | 100 | 100 |

  O que pesa na página inicial: o Lighthouse vê sempre a introdução da primeira visita, e o texto dela muda de tamanho quando as fontes chegam (CLS 0.1). Uma visita real vê a introdução uma vez por sessão. Nas outras páginas o LCP espera pelo JavaScript principal; o passo seguinte seria pré-gerar o HTML de cada página no build.

**Capturas de ecrã:** `docs/screenshots/1440/` e `docs/screenshots/390/` (cada secção da página inicial, a carta e os vinhos).

## Registo do tempo

Início às 19:00 (UTC). Pré-visualização publicada às 19:45, hand-off às 19:50.

| Fase | Duração aproximada |
|---|---|
| 1. Conteúdo (páginas, PDF, sitemap, 21 ficheiros de imagem, recortes) | 10 min |
| 2. Sistema (cores medidas, tokens, cabeçalho, gaveta, menu, rodapé, ilustrações) | 9 min |
| 3. Páginas (secções 1–16, carta, sur commande, vinhos, galeria, acesso) | 14 min |
| 4–6. Línguas, movimento e interação | vieram da base Le Portugais e foram adaptados nas fases 2–3 (planeador de grupo, roda da semana, viagem do vinho, cartões infantis, novos) |
| 7. Verificações, correções, publicação | 12 min |

O contentor reiniciou duas vezes durante o trabalho; por segurança fiz um commit intermédio antes da publicação. Nada da lista de cortes foi largado por falta de tempo.

## Decisões tomadas

- **Títulos com acentos:** "SPECIALITES … A TOMBER PAR TERRE!" passou a "SPÉCIALITÉS … À TOMBER PAR TERRE !". Também normalizei os espaços de "Poissons -Fruits de mer - Crustacés" para "Poissons - Fruits de mer - Crustacés".
- **Filtro "Viande / Poisson / Tout":** Spécialités e Viandes são carne; Poissons é peixe; nas entradas, rissóis de camarão e atum e os accras são peixe, rissóis de vaca, frango e leitão são carne; o resto é "tout".
- **Menus infantis:** os nomes ficam em francês em todas as línguas, com a tradução da piada por baixo.
- **Meta descrições** escritas só com frases das próprias páginas (o site não tem).
- **Mapas:** o site não tem ligação de mapa. Criei Google Maps, Waze e Apple Plans a partir da morada. Não consegui confirmar daqui as coordenadas no Google Maps, por isso o JSON-LD não tem `geo` e os links usam a morada.
- **Just Eat** sem os parâmetros de rastreio (`k1111`, `gclid`, `gclsrc`).
- **Fotos de banco de imagens** deixadas de fora: `pexels-pixabay-164268` (substituída pelo mar em WebGL) e `image-fondue-pixabay` (substituída por uma ilustração de fondue).
- **Crédito** "Site réalisé par Aline Forestier" deixado de fora.
- **`LEAD_DAYS = 0`** em `src/lib/groupOrder.ts` até os donos dizerem o prazo de encomenda. O planeador diz que o prazo não está no site e pede para ligar.
- **Planeador:** o total é indicativo (preço por pessoa × pessoas, nunca menos de 10), escrito com ponto como a carta ("350.00 CHF").
- **"Combien êtes-vous ?":** o limite de 10 vem do site e está numa só constante (`MIN_PERSONS`).
- **Viagem do vinho:** o parágrafo da página inicial fala do Minho, do Douro e do Alentejo; acrescentei uma paragem no Dão (há dois Dão na lista) com o texto do Dão da página "Les vins portugais". Os rosés espumantes não indicam região e ficam num bloco à parte.
- **Introdução** só quando a visita começa na página inicial (como no Le Portugais).
- **Ícones Lottie:** usam lottie-web com JSON feito à mão (o dotLottie precisa de WebAssembly, que a pré-visualização bloqueia). Reaproveitei o conjunto existente: o autocarro usa o ícone de transporte, a entrega usa o saco. Sem ícones novos de sol, onda, fondue ou gelado (há ilustrações planas no lugar).
- `/design-taste-frontend` não existe nesta sessão e o `/21st-ui` precisa do servidor da 21st.dev, que não está ligado.

## Conteúdo: contagens e diferenças

- **Carta:** 11 secções, 68 linhas (11 · 4 · 10 · 10 · 4 · 3 · 4 · 5 · 6 · 8 · 3).
- **Vinhos:** 15 (Rosés Pétillants 4, Vinho Verde 2, Rouges Portugais 7, Blancs Portugais 2). O Sumol não tem preço no site, por isso não tem aqui.
- **Fotos:** 21 ficheiros descarregados, 20 diferentes (`IMG-20230320-WA0003-1` é igual a `WA0003`): 16 fotos do restaurante, 2 imagens de garrafas, o mapa dos vinhos, o logótipo e o garfo (favicon). Todas usadas, em WebP.
- **Recortes** (só de fotos do restaurante): poulet (WA0013), rissoles (WA0009), polvo (WA0012), bifanas (WA0008), calamares (WA0007), bolognaise (WA0014).
- **Pares prato-foto** (a confirmar): Accras e Rissoles 6 pièces → WA0009; Poulet grillé → WA0013; Travers e Poitrine de porc → WA0010; Bifanas → WA0008; Secretos de porco preto → WA0011; Calamares à la romaine → WA0007; Polvo com molho verde → WA0012; Bolognaise → WA0014; Gâteau au chocolat → WA0015; Leitao → leitao.jpg. Sem foto: Bacalhau à Braga, Picanha e Francesinha (ilustração e espaço "Photo : …").
- **Fotos a confirmar com os donos:** `dessert-avec-glace_1` e `_2` e `leitao.jpg` parecem fotos de banco; `20230320_151440` mostra uma garrafa "Pomares" que não está na carta de vinhos; as garrafas Casal Garcia/Gazela e Douro Planalto parecem imagens dos produtores; o mapa dos vinhos é de www.villaferia.com (o crédito do site foi mantido).
- **Carta web vs. PDF** (vale a página web): o PDF tem a mais "Sauces : Moutarde 1,50 / Poivre 1,50 / Morilles 7.-", "Gambas à gogo (minimum 2 personnes) 33.-", a "Fondue Bourguignonne, sur commande 24h en avance (min. 2 pers.) 35.- par personne" e as bebidas (com "Sumol orange / ananas 30cl 4.50"); escreve "Francisinhas" e "Filets de Perches" (a web diz "Francesinha" e "Filets de Perches Meunière"); não tem as linhas de origem da carne e do peixe. Os preços em comum são iguais.
- **Sitemap:** além das 5 páginas do menu, há `/contact-version-test-elementor-sans-wp-form/` (uma cópia de teste de uma página de contacto com formulário), modelos e menus do construtor e `/author/aline/`. Não usei o conteúdo da página de teste; ela redireciona para o plano de acesso.
- **Não consegui ler:** nada ficou bloqueado. Só as coordenadas ficaram por confirmar (acima).

## Perguntas em aberto para os donos

- **Horário:** continua certo (segunda 10h30–14h30; terça a sábado 10h30–14h30 e 18h00–23h00; domingo 10h30–16h00)? Fecham nos feriados?
- **Reservas:** por telefone, por e-mail ou ambos? Querem reservas online?
- **Pratos do dia:** quanto custam? Podem ser publicados no site além do Facebook?
- **Sur commande:** com quantos dias de antecedência se encomenda?
- **Carta:** os preços de 2023 ainda valem? Onde o PDF e a página web diferem, qual está certo?
- **Grafia:** os nomes dos pratos e dos vinhos ficam como no site ("Cabrito no formo", "Vitela no Formo", "Polvo a Gallega", "Leitao", "Esporao", "Casa da Santar") ou passam ao português padrão?
- **Esplanada:** quantos lugares e em que meses?
- **Take-away:** além das entregas, pode-se levantar ao balcão?
- **Fotos:** as fotos de banco podem sair? Há fotos mais recentes ou maiores? Os pratos podem ser recortados? As imagens das garrafas podem ser usadas?
- **Cores:** as cores medidas no site antigo estão certas, com as mudanças feitas para o contraste?
- **Logótipo:** há uma versão vetorial (SVG)?
- **Privacidade:** o site atual não tem declaração de privacidade. O novo liga ao Facebook, a mapas e às apps de entrega: quem a escreve?
- **Revisão:** quem revê os textos em inglês, português, italiano e alemão?
- **Crédito:** manter "Site réalisé par Aline Forestier" ou não creditar ninguém?
- **Endereços antigos:** redirecionar todos como na tabela abaixo?

## Redirecionamentos (301, para quando o site novo substituir o WordPress)

Já estão em `dist/_redirects`, com e sem a barra final.

| Endereço antigo | Endereço novo |
|---|---|
| / | /fr/ (ou a língua guardada / do navegador) |
| /la-carte/ | /fr/carte |
| /sur-commande/ | /fr/sur-commande |
| /nos-vins/ | /fr/vins |
| /plan-dacces/ | /fr/plan-d-acces |
| /contact-version-test-elementor-sans-wp-form/ (no sitemap) | /fr/plan-d-acces |
| /wp-content/uploads/2023/04/Menu-Entre-Amigos.pdf | continua a ser servido até os donos o retirarem; depois /fr/carte |

## Notas

- **Sem formulário de contacto:** o site atual não tem, por isso há botões de telefone e e-mail. Pode acrescentar-se um se os donos quiserem.
- **Privacidade:** o site precisa de uma declaração de privacidade antes de ir para o ar. O rodapé já tem o link "Protection des données" escondido: aparece quando se põe o endereço da declaração em `PRIVACY_URL` (`src/components/Footer.tsx`).
- **Traduções:** o francês é o do site. O inglês, o português, o italiano e o alemão foram escritos para esta proposta e precisam de ser revistos por falantes nativos antes do lançamento.
