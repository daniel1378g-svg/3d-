# Redesign escuro — comparação com o site original

Comparação feita a 27/10/2026 entre https://amerendeira.pt/ e a proposta publicada
(https://claude.ai/artifact/QbdAeCvakThLzH3UAAe4W1), em 1440×900 e 390×844.

## O que tornava a proposta demasiado parecida com o original

| Elemento | Original | Proposta anterior | Efeito |
| --- | --- | --- | --- |
| Cores | Fundo `#F7F6F1`, texto `#191919`, amarelo `#FFC629` só no painel do menu | As mesmas três cores, na mesma proporção (creme dominante) | A primeira impressão era idêntica |
| Tipografia | Inter em caixa alta nos títulos; lettering serifado em SVG (“é boa nas horas”, “os nossos menus”, “fala connosco”) | Os mesmos três SVG desenhados, em tamanho gigante; Playfair (serifa de alto contraste, muito próxima do lettering); Inter no texto | Os títulos eram literalmente os mesmos desenhos |
| Escala dos títulos | Lettering a toda a largura no hero e na abertura dos menus | Igual: título de largura total por cima do produto e por cima do lume | Mesma hierarquia e mesmo ritmo |
| Composição do hero | Título centrado, faixa de três colunas por baixo (texto à esquerda, botão ao centro, nota à direita) | Exatamente a mesma faixa de três colunas | Reconhecível como o mesmo layout |
| Sequência | Hero → números → lojas → experiência → sabor → menus (lume) → imprensa → galeria → contactos | Hero → tradição/números → lojas → experiência → sabor → lume → menus → imprensa → hospitalidade → galeria → contactos | Mesma ordem, com uma secção a mais |
| Espaçamentos e linhas | Muito espaço vazio entre secções, linhas finas de 1 px a separar linhas (números, imprensa, menus) | Mesmos grandes vazios e mesmas linhas divisórias (imprensa em tabela, números, lojas) | Mesma textura |
| Botões | Pílula com contorno de 1 px, caixa alta pequena e seta (“MENUS →”, “VER NO MAPA →”) | Pílula com contorno, caixa alta, seta | Mesmo componente |
| Logótipo | Escuro sobre creme | Escuro sobre creme | — |

## O que muda no redesign

- **Cores invertidas por tokens**: fundo carvão `#191919`, superfícies `#242424`, texto e logótipo
  marfim `#F7F6F1`, amarelo `#FFC629` só em botões, estados ativos, números e estrelas (texto carvão
  sobre amarelo). Sem filtros de inversão: as fotografias e os vídeos mantêm as cores reais.
- **Tipografia**: Space Grotesk nos títulos (pesos 500–600, entrelinha 0,9–1,05, tracking negativo,
  caixa normal) e Manrope no corpo, navegação e botões. Os três letterings em SVG deixam de ser
  usados: as frases passam a texto real, com escalas e quebras de linha novas.
- **Hero**: a animação do pão mantém-se intacta. O fundo claro de estúdio, que faz parte dos frames,
  fica numa área clara enquadrada (painel de cantos arredondados) dentro da página escura; título em
  texto real no canto superior esquerdo do painel, texto e botões numa faixa escura por baixo.
- **Nova sequência**: menus e caldo verde → história e experiência → galeria → avaliações → lojas e
  contactos → imprensa e rodapé.
- **Menus** em cartões assimétricos com escalas alternadas; **caldo verde** com o vídeo fornecido.
- **Fotografias agrupadas**: o “sabor em imagens” e a galeria passam a ser um único slideshow; as
  fotografias do espaço e do serviço juntam-se na história.
- **Sem linhas divisórias** entre linhas de conteúdo: cartões e superfícies `#242424`.
- **Botões**: retangulares com cantos de 12 px, Manrope em caixa normal, amarelo sólido para a ação
  principal e contorno marfim para a secundária.

## Segunda iteração — animações do pão e da sopa controladas pelo scroll (27/10/2026)

### Comparação antes de alterar (original vs proposta publicada, v9)

| Elemento | Original | Proposta v9 | Semelhança que restava |
| --- | --- | --- | --- |
| Cores | Creme `#F7F6F1` dominante, texto `#191919`, amarelo só no menu | Página carvão, mas o hero mostrava o estúdio cinzento-claro dos frames num painel claro e o caldo verde numa caixa clara `#d8d7d8` | Duas áreas claras grandes repetiam a luminosidade do original e pareciam vídeos retangulares |
| Tipografia | Inter em caixa alta + lettering SVG | Space Grotesk / Manrope, texto real | Nenhuma relevante |
| Composição do hero | Título centrado, faixa de três colunas (texto, botão, nota) | Título em cima à esquerda; por baixo do pão, texto + botões + nota numa faixa | A faixa inferior ainda lê como uma fila de três blocos (mantida: a altura disponível por baixo da janela protegida não permite empilhar sem tapar o pão) |
| Escala dos títulos | Lettering à largura do ecrã | Títulos grandes em texto real, alinhados à esquerda | Nenhuma relevante |
| Sequência | Hero → números → lojas → … → contactos | Pão → menus e caldo verde → história → galeria → avaliações → lojas e contactos → imprensa e rodapé | Nenhuma |
| Espaçamentos | Grandes vazios, linhas de 1 px | Cartões e superfícies, sem linhas | Nenhuma |
| Botões | Pílula com contorno, caixa alta | Retângulo 12 px, caixa normal, amarelo sólido / contorno marfim | Nenhuma |
| Vídeos | — | Caldo verde num leitor com reprodução automática e botões | Lia-se como um vídeo incorporado, não como parte da página |

### O que mudou nesta iteração

- **Pão**: os frames passam a vir do vídeo com fundo carvão (`media/original/pao-com-chourico-carvao.mov`).
  O painel claro foi retirado: a placa de fundo (o próprio fundo de cada frame, já existente no
  renderizador) prolonga o estúdio carvão até às margens do ecrã e, por baixo do pão, o chão funde-se
  na cor da página. O título “é boa nas horas” é marfim sobre o carvão do frame.
- **Caldo verde**: deixa de ser um vídeo com leitor. É uma sequência de frames controlada pelo scroll,
  com percurso, ScrollTrigger e carregamento próprios: a taça vazia enche-se ao descer, congela quando
  se para e esvazia ao subir. O fundo do vídeo é nivelado à cor da página só nos píxeis de fundo, por
  isso não há retângulo à volta da taça.
- **Movimento reduzido**: o pão acabado e a taça cheia como imagens fixas, sem percursos longos; sem
  leitor de vídeo em nenhum caso.
- **Avaliações**: rótulo “Excerto de avaliação no Google” (EN “Google review excerpt”).
