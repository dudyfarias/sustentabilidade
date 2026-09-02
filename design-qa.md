# Design QA — Plataforma Estadual de Sustentabilidade

Protótipo funcional em HTML semântico, CSS e JavaScript, sem dependências de build.
Este documento registra o estado atual da implementação e as verificações feitas.

Os catálogos exibidos são **demonstrativos por decisão de escopo**: esta entrega é a camada
visual, destinada ao time que implementará o backend. As publicações anexadas do TCESP,
da PGE-SP e da AGU são documentos oficiais; os quatro Cadernos ODS usam capas e leitores
digitais da fonte oficial. O contrato de dados está em [`HANDOFF.md`](./HANDOFF.md).

---

## Páginas

| Página | Arquivo | Script | Conteúdo |
| --- | --- | --- | --- |
| Início | `index.html` | `main.js` | Hero, busca, navegação rápida (7 cards alinhados), ODS, destaques e chamada final |
| Critérios | `criterios.html` | `criterios.js` | Catálogo com busca, 5 filtros, chips de categoria, 6 critérios e paginação |
| Contratações | `contratacoes.html` | `contratacoes.js` | KPIs, filtros por objeto e situação, 6 contratações |
| Glossário | `glossario.html` | `glossario.js` | 60 termos agrupados por letra, com sigla, categoria, remissões e links |
| Biblioteca | `biblioteca.html` | `biblioteca.js` | Documento em destaque, 20 documentos em 5 tipos e legislação de referência |
| Transparência | `transparencia.html` | — | KPIs, 3 conjuntos de dados abertos, 3 relatórios e API pública |
| Sobre | `sobre.html` | — | Objetivos, referências institucionais e canais de contato |
| ODS | `ods.html` | `main.js` | 17 objetivos agrupados nos 5 eixos da Agenda 2030 |
| Cadernos ODS | `cadernos-ods.html` | `main.js` | Coleção oficial com quatro cadernos, capas reais e leitores digitais externos |
| Central de Ajuda | `faq.html` | `faq.js` | 30 perguntas em cards, com ícone semântico, resumo, links relacionados e chips de categoria |
| Termos de Uso | `termos.html` | — | 12 seções sobre condições de uso da plataforma |
| Política de Privacidade | `privacidade.html` | — | 11 seções conforme a LGPD |
| Acessibilidade | `acessibilidade.html` | — | 8 seções com recursos e limitações conhecidas |
| Manual de Gestão Sustentável do TCESP | `manual-gestao-sustentavel-tcesp.html` | `manual-tcesp.js` | Publicação oficial, oito temas e documentos relacionados |
| Cartilha de Contratações Sustentáveis da PGE-SP | `cartilha-contratacoes-sustentaveis-pge.html` | `cartilha-pge.js` | Publicação oficial, oito temas e download do PDF |
| Guia Nacional de Contratações Sustentáveis da AGU | `guia-nacional-contratacoes-sustentaveis-agu.html` | `guia-agu.js` | 8ª edição oficial de 2025, oito temas e acesso ao PDF |
| A Lei de Licitações e os ODS | `lei-licitacoes-ods.html` | `lei-licitacoes-ods.js` | Publicação digital, oito temas e leitura oficial externa |
| Página não encontrada | `404.html` | `main.js` | Atalhos para as áreas principais e canal da Ouvidoria |

---

## Arquitetura

- **`styles.css`** concentra todo o CSS do site. Nenhuma página tem estilo inline.
- **`main.js`** carrega em todas as páginas: diálogos, busca da home e filtros da home.
  Todos os seletores são opcionais, então incluir o arquivo em qualquer página é seguro.
- Cada página com catálogo tem seu próprio script, isolado por uma checagem do
  contêiner principal (`if (grid) { ... }`).
- Ícones vetoriais próprios em `assets/`, sem dependência de imagens rasterizadas
  para os elementos de interface.

---

## Identidade visual

- **Marca institucional**: brasão + "Governo do Estado de São Paulo" +
  "Secretaria de Gestão e Governo Digital", repetida no cabeçalho e no rodapé.
- **Verde** `#087A3E` como cor principal da plataforma.
- **Vermelho institucional** `#ED1C24` reservado ao indicador do item ativo da navegação.
- **Navegação enxuta de 3 itens**: Início, Critérios e Sobre.
  As demais áreas são alcançadas pelo rodapé e pela navegação rápida da página
  inicial. TCESP, PGE-SP, AGU, A Lei de Licitações e os ODS e os Cadernos ODS possuem páginas próprias.
- **Rodapé de 5 colunas** com redes sociais e assinatura institucional.
- **Ouvidoria** e **Fale conosco** apontam para os canais oficiais do Estado
  (`fala.sp.gov.br` e `compras.sp.gov.br/fale-conosco`), abertos em nova aba.
- Composição fiel a 1024 px de largura, com contêiner de 1000 px.

---

## Indexação e compartilhamento

- `robots.txt` liberando indexação e apontando para o sitemap.
- `sitemap.xml` com as 17 URLs canônicas, em formato limpo (sem `.html`).
- `canonical` em todas as páginas, coerente com `cleanUrls` da Vercel.
- Open Graph e Twitter Card completos, com imagem própria de 1200×630.
- Favicon em `.ico`, `.svg`, `apple-touch-icon` e ícones de 192 e 512 px.
- `site.webmanifest` com nome, cores e ícones para instalação em dispositivos.
- `404.html` institucional, marcado com `noindex`.

---

## Verificação funcional

Cada item abaixo foi executado no navegador contra a implementação.

**Navegação**
- As 17 páginas e a 404 respondem HTTP 200.
- `robots.txt`, `sitemap.xml`, `favicon.ico`, `og-image.png` e `site.webmanifest` são servidos corretamente.
- O `sitemap.xml` é XML válido e o `site.webmanifest` é JSON válido.
- Nenhum link interno aponta para arquivo inexistente.
- Nenhum asset referenciado está ausente.
- Nenhum link do rodapé aponta para `#`: todos têm destino real.
- Todo `data-dialog` presente no HTML tem entrada correspondente em `main.js`.
- O item ativo da navegação é destacado corretamente em cada página.

**Critérios**
- Chips de categoria filtram os cards e sincronizam com o select "Categoria".
- Filtros de ODS, tipo de documento, nível e área temática são combináveis.
- Busca ignora acentuação: "residuos" encontra "Resíduos".
- Ordenação por código e por título reordena os cards.
- Favoritar alterna o ícone e o estado `aria-pressed`.
- Estado vazio aparece quando nenhum critério atende aos filtros.
- Painel de filtros recolhe e expande.

**Contratações**
- Chips por objeto contratual e select de situação filtram os cards.
- Busca cobre código, objeto e órgão contratante, ignorando acentuação.
- Contador de resultados e estado vazio acompanham os filtros.

**Glossário**
- Filtro por categoria e por letra inicial funcionam de forma combinada.
- Letras sem termos correspondentes ficam desabilitadas no índice fixo.
- A faixa de uma letra desaparece quando nenhum termo dela resta visível.
- A busca alcança também as siglas: "SRP" encontra Sistema de Registro de Preços.
- As 93 remissões entre termos apontam para verbetes existentes na página.
- As contagens exibidas nos chips conferem com o número real de termos.

**Biblioteca**
- Chips por tipo filtram os cards e a contagem exibida acompanha o resultado.
- O documento em destaque some assim que há busca ou filtro, e volta ao limpar.
- A busca alcança título, descrição, temas e formato: "XLSX" encontra a planilha.
- "Ler resumo" abre diálogo com o texto do próprio card, sem mapa fixo no JavaScript.
- Ordenação por título percorre os 20 documentos em ordem alfabética.
- Os cinco links de legislação apontam para a íntegra publicada no Planalto,
  todos verificados com resposta HTTP 200.

**Transparência**
- Conjuntos de dados, relatórios e painel da API renderizam corretamente.
- Ações de download e de dicionário de dados abrem diálogo explicativo.

**Central de Ajuda**
- Cada pergunta é um card com ícone próprio, resumo visível quando fechado e
  alternador "+" e "−" no lugar da seta.
- O estado expandido traz a resposta completa e os conteúdos relacionados.
- Os chips de categoria filtram as perguntas e o contador acompanha o resultado.
- O cabeçalho de um grupo desaparece junto quando nenhuma pergunta dele resta visível.
- A busca ignora acentuação e expande automaticamente as perguntas encontradas.

**Navegação rápida da página inicial**
- Os sete cards compartilham a mesma caixa de arte, a mesma linha de base de
  título, de texto e de link: uma única medida para cada, em vez de três ritmos.
- TCESP, PGE-SP e AGU usam livros próprios, com acesso direto às páginas das publicações.
- O card inteiro responde ao clique, e não apenas o link no rodapé do card.
- Os downloads de "Biblioteca em destaque" abrem diálogo — antes eram inertes.

**Geral**
- Sem erros no console em nenhuma página.
- Páginas principais verificadas a 1024 px e a 390 px: nenhuma imagem quebrada,
  nenhum erro e nenhuma sobra horizontal.
- Sem overflow horizontal em 1024 px nem em 390 px.
- A faixa de ODS rola horizontalmente dentro do próprio contêiner em telas estreitas,
  sem provocar rolagem lateral da página.

---

## Acessibilidade

- **Link de salto** "Pular para o conteúdo" em todas as páginas, revelado ao primeiro Tab.
- **Foco visível** global: contorno verde de 3 px em qualquer elemento navegável por teclado.
- Ambos verificados com navegação real por teclado, não apenas por inspeção de código.
- Estrutura semântica: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`.
- `aria-label` em todas as navegações e nos botões sem texto visível.
- `aria-current="page"` no item ativo da navegação e da trilha de navegação.
- Acordeões do FAQ usam `details`/`summary` nativos, operáveis por teclado.
- Ícones decorativos marcados com `aria-hidden="true"`.
- Os 17 cards de ODS abrem as páginas oficiais da ONU Brasil, cada um com rótulo próprio.

---

## Escopo do time de backend

Descrito em detalhe em [`HANDOFF.md`](./HANDOFF.md).

- Substituir os dados demonstrativos por integração com as bases oficiais.
- Publicar os arquivos reais da biblioteca e dos conjuntos de dados abertos.
- Implementar a API pública descrita na página de Transparência.
- Conectar os catálogos demonstrativos a um gerenciador de conteúdo quando a API estiver disponível.
- Substituir os recortes editoriais por arquivos-fonte quando o time de design os fornecer.

---

## Pendências institucionais

- Validação institucional do conteúdo antes da publicação oficial.
- Revisão jurídica das minutas de Termos de Uso e Política de Privacidade.
- Designação formal do Encarregado pelo tratamento de dados pessoais (DPO).
- Auditoria externa de acessibilidade e submissão ao avaliador oficial do eMAG.

---

_Última atualização: agosto de 2026._

---

## QA visual — topo da Central de Ajuda (11/08/2026)

- **Fonte visual:** `/Users/eduardofariascappia/Downloads/WhatsApp Image 2026-08-11 at 11.22.07 (1).jpeg`
- **Implementação:** [`qa/faq-implementation-1024.png`](./qa/faq-implementation-1024.png)
- **Comparação lado a lado:** [`qa/faq-design-comparison.png`](./qa/faq-design-comparison.png)
- **Viewport comparado:** 1024 × 1200 CSS px, densidade 1×.
- **Dimensões da fonte:** 1024 × 1536 px; comparação normalizada pela largura e recortada nos 1200 px superiores.
- **Estado:** página carregada, todas as perguntas recolhidas, categoria “Todos” ativa.

### Evidência e superfícies verificadas

- **Visão completa:** cabeçalho, breadcrumb, hero, busca, filtros e início das perguntas comparados no mesmo quadro.
- **Tipografia:** hierarquia, peso, quebra do título e destaque verde equivalentes à referência.
- **Espaçamento:** largura útil corrigida para 894 px; margens, busca e filtros alinhados à composição da fonte.
- **Cores:** verde institucional, branco, bordas cinza e sombras suaves consistentes.
- **Imagem:** ornamento botânico dedicado em 1774 × 887 px, sem pixelização e com área branca para o conteúdo.
- **Texto:** título, descrição, placeholder, filtros e título da seção correspondem à referência.
- **Interações testadas:** busca (4 resultados para “certificação”), limpar (30 resultados), filtro Critérios (8), menu Mais assuntos e acordeões.
- **Console:** nenhum erro ou aviso encontrado.

### Histórico da comparação

1. **P2 — largura excessiva:** implementação ocupava cerca de 45 px a mais de cada lado. Corrigido com largura útil de 894 px.
2. **P2 — estado inicial divergente:** primeira pergunta estava aberta; a referência mostra todas recolhidas. O estado inicial e o botão Limpar agora fecham todos os acordeões.
3. **P2 — comportamento de Mais assuntos:** menu permanecia aberto após selecionar uma categoria. Corrigido para fechar e preservar o estado visual selecionado.

Não restaram diferenças P0, P1 ou P2 dentro do escopo solicitado, que é a área acima das perguntas. Os cards de resposta abaixo mantêm deliberadamente o padrão funcional já existente no portal.

**final result: passed**

---

## QA visual e funcional — Cadernos ODS (28/08/2026)

- **Referência visual:** `/tmp/codex-remote-attachments/019f8ae7-758a-71e1-9f98-fc02b7eb65e3/4386875B-F5F0-46EB-80C2-916CF46646DE/1-Foto-1.jpg`.
- **Implementação final:** [`qa/cadernos-ods-implementation-1019x1280.png`](./qa/cadernos-ods-implementation-1019x1280.png).
- **Comparação pareada:** [`qa/cadernos-ods-comparison-final.png`](./qa/cadernos-ods-comparison-final.png), com a referência e a implementação lado a lado em 1019 × 1280 px cada.
- **Viewport desktop:** 1280 × 720 CSS px, DPR 1 e zoom de 100%. A captura principal foi composta a partir de três estados de viewport e normalizada por recorte central para a mesma densidade e dimensões da referência.
- **Viewport móvel:** 390 × 844 CSS px, DPR 1, registrado em [`qa/cadernos-ods-mobile-390x844.png`](./qa/cadernos-ods-mobile-390x844.png).
- **Estado capturado:** página no topo, sem diálogo, filtros ou estados temporários; cartões no estado padrão.

### Comparação de página inteira

- **Tipografia:** a página mantém a família institucional do portal e reproduz a hierarquia, os pesos e as quebras principais da referência.
- **Espaçamento:** contêiner de 930 px, herói de 520 px, grade de quatro cartões, dois painéis informativos e chamada final seguem a mesma composição vertical da imagem fornecida.
- **Cores:** fundo verde-sálvia, acentos verde-lima, superfícies brancas e cores individuais dos ODS foram aproximados diretamente da referência.
- **Imagens:** herói e quatro livros 3D foram produzidos como imagens reais, inspecionados em resolução original e exportados em WebP otimizado. Todos os livros aparecem inteiros, nítidos, sem faixas ou textos inventados e sem recorte por CSS.
- **Conteúdo:** a estrutura editorial da referência foi preservada. Os rótulos de formato e data usam os dados efetivamente disponíveis nos leitores oficiais, em vez de reproduzir informações apenas ilustrativas da montagem de referência.
- **Interações:** o CTA principal rola para a coleção; o segundo abre a página oficial; cada capa e link abre o leitor digital correspondente em nova aba; a chamada final leva à Biblioteca.
- **Responsividade:** não há rolagem horizontal em 1280 px ou 390 px; no celular os quatro livros do herói permanecem visíveis e os cartões formam uma única coluna.
- **Console e carregamento:** nenhum erro ou aviso no console; as quatro imagens dos cartões carregaram com suas dimensões naturais esperadas.

### Histórico de correções

1. **P1 — composição anterior distante da referência:** o herói claro e as capas planas foram substituídos pelo cenário verde-sálvia com pedestal, folhagem e os quatro livros em 3D.
2. **P2 — proporções de texto e cartões:** largura do texto, metadados, imagens, altura dos cartões e painéis foram recalibrados após comparação lado a lado.
3. **P2 — livro cortado no celular:** posição e escala do herói foram ajustadas e verificadas visualmente em 390 × 844 px.
4. **P2 — elementos gráficos inventados nas capas:** os quatro mockups dos cartões foram regenerados e os WebP finais foram inspecionados individualmente.

Não restaram diferenças acionáveis P0, P1 ou P2 no escopo solicitado.

**final result: passed**

---

## QA visual — A Lei de Licitações e os ODS (26/08/2026)

- **Referência de layout:** `/Users/eduardofariascappia/Downloads/PHOTO-2026-08-25-18-49-37.jpg`
- **Capa oficial usada como fonte:** `https://online.fliphtml5.com/kpxxz/qqct/files/shot.jpg?v=5`
- **Implementação em 1280 × 720:** [`qa/lei-ods-desktop.jpg`](./qa/lei-ods-desktop.jpg)
- **Implementação em 1024 × 1173:** [`qa/lei-ods-1024x1173.jpg`](./qa/lei-ods-1024x1173.jpg)
- **Comparação pareada:** [`qa/lei-ods-comparison.jpg`](./qa/lei-ods-comparison.jpg)
- **Verificação móvel em 390 × 844:** [`qa/lei-ods-mobile.jpg`](./qa/lei-ods-mobile.jpg)

### Resultado

- A nova página usa o mesmo cabeçalho, rodapé, container de 930 px, hero de 520 px, grade temática 4 × 2 e blocos inferiores das demais publicações do portal.
- O livro aparece inteiro em zoom de 100%, integrado a uma única cena raster em verde-sálvia com pedestal, círculos, folhagem, luz e sombra de contato.
- A capa verde-azulada é a capa efetivamente publicada no FlipHTML5. Os dados ilustrativos divergentes do mock — capa branca, ano 2022, 1ª edição, Fórum e PDF de 6,1 MB — não foram usados.
- Os dados exibidos foram limitados ao que pôde ser verificado: autores Cristina Castro-Lucas e Renato Fenili, publicação em 2024, 331 páginas e leitura digital.
- Como o publicador desabilitou o download no FlipHTML5, a página oferece leitura online e acesso à plataforma dos autores, sem prometer PDF.
- Os oito temas relacionados abrem e fecham diálogos correspondentes; a página identifica explicitamente esse conteúdo como uma síntese orientativa do portal, sem apresentá-lo como sumário oficial da obra.
- O card da navegação rápida usa o novo livro 3D, mantém o palco visual de 104 px e abre a rota interna da publicação.
- Home, Biblioteca, Sobre, sitemap e os rodapés das páginas públicas apontam para a nova rota interna.
- Em 390 px, não há overflow horizontal; CTAs ocupam a largura disponível e os metadados formam grade 2 × 2.
- Nenhum erro ou aviso foi encontrado no console.

Não restaram diferenças P0, P1 ou P2 no escopo solicitado. As diferenças em relação ao mock são intencionais e factuais: capa e metadados reais substituem os elementos ilustrativos da referência.

**final result: passed**

---

## QA visual — Guia Nacional de Contratações Sustentáveis da AGU (25/08/2026)

- **Fonte visual:** `/Users/eduardofariascappia/Downloads/PHOTO-2026-08-25-17-43-58.jpg`
- **Conteúdo oficial:** `/Users/eduardofariascappia/Downloads/guia-nacional-de-contratacoes-sustentaveis_2025.pdf`
- **Implementação desktop:** [`qa/agu-implementation-1280-top.png`](./qa/agu-implementation-1280-top.png)
- **Comparação lado a lado:** [`qa/agu-comparison.png`](./qa/agu-comparison.png)
- **Card na página inicial:** [`qa/agu-home-card-detail-1280.png`](./qa/agu-home-card-detail-1280.png)
- **Viewport:** 1280 × 720 CSS px, navegador em 100%.
- **Estado:** página carregada no topo, livro completo e nenhum diálogo aberto.

### Evidência e superfícies verificadas

- **Fonte de verdade:** título, 8ª edição revista, atualizada e ampliada, outubro de 2025, 266 páginas e arquivo de 2,85 MB foram conferidos diretamente no PDF mais novo enviado pelo usuário.
- **Composição:** o hero usa uma cena raster integrada em verde-sálvia, com círculos discretos, pedestal, folhagem, livro 3D, iluminação e sombra de contato pertencendo à mesma imagem.
- **Livro completo em 100%:** capa, lombada, bloco de páginas, topo e base permanecem visíveis dentro da cena em zoom de 100%, sem sobreposição HTML e sem efeito de imagem colada.
- **Cabeçalho e rodapé:** ambos reutilizam o padrão institucional do portal, com Início, Critérios, Sobre, busca, acessibilidade, perfil e os grupos globais do rodapé.
- **Conteúdo:** oito cards seguem os capítulos reais do guia, incluindo direitos humanos, integridade, ETP, logística reversa, engenharia, CICS e as 43 tabelas por objeto.
- **Interações:** os oito cards abriram o diálogo correto, com link direto à página inicial correspondente no PDF; abertura e fechamento foram testados individualmente.
- **Integração:** entradas internas confirmadas na Home, na Biblioteca e na seção Sobre. A Biblioteca exibe 20 documentos e inclui o guia nos filtros.
- **Navegação rápida:** a Home agora contém sete cards alinhados; o novo card mostra o livro 3D de 2025, badge “Novo”, descrição e acesso interno funcional.
- **Responsividade:** o desktop mantém o livro inteiro em 100%; em faixas menores, a cena integrada reposiciona o livro acima do conteúdo sem cortar capa, lombada ou base.
- **Console:** nenhum erro ou aviso encontrado na página, na Biblioteca ou na seção Sobre.

Não restaram diferenças P0, P1 ou P2 no layout, nos dados oficiais, no enquadramento do livro e nas interações solicitadas.

**final result: passed**

---

## QA visual — livro completo na página da PGE em 100% (25/08/2026)

- **Fonte visual do problema:** `/var/folders/jq/drpbqr_j16g_594_xn6q_qf80000gn/T/TemporaryItems/NSIRD_screencaptureui_bHZfAU/Captura de Tela 2026-08-25 às 18.12.22.png`
- **Implementação corrigida:** [`qa/pge-book-full-1280.png`](./qa/pge-book-full-1280.png)
- **Comparação antes/depois:** [`qa/pge-book-full-comparison.png`](./qa/pge-book-full-comparison.png)
- **Viewport da implementação:** 1280 × 720 CSS px, zoom de 100%, DPR 2; captura normalizada pelo navegador para 1280 × 720 px.
- **Fonte normalizada:** captura original de 2938 × 1854 px; a área do portal foi recortada e redimensionada para 1280 × 720 px na comparação.
- **Estado:** página no topo, sem diálogo aberto.

### Histórico da correção

1. **P1 — capa cortada no topo e na base:** a imagem 1920 × 1080 herdava `background-size: cover`. Em uma hero larga, a escala pela largura ampliava a arte para aproximadamente 150% da altura disponível e o `overflow: hidden` removia partes do livro.
2. **Correção aplicada:** em desktop, somente na página da PGE, a imagem agora usa `background-size: auto 125%` e `background-position: 72% center`. A escala passa a ser controlada pela altura, mantendo a capa inteira e preservando o centro visual da composição.
3. **Evidência pós-correção:** em 1280 px, topo, lombada, base e sombra do livro ficam visíveis. Pela geometria do próprio asset, a capa também permanece inteira na largura de aproximadamente 1470 px mostrada no relato.

### Superfícies verificadas

- **Tipografia:** sem alterações; família, pesos, quebras e hierarquia permanecem iguais.
- **Espaçamento e layout:** texto, ações, metadados e início da grade mantêm suas posições; não há overflow horizontal (`1280 / 1280 px`).
- **Cores:** fundo verde e contraste do hero permanecem coerentes; a extensão sólida nas laterais usa o fundo nativo da seção.
- **Imagem:** o asset WebP de alta definição permanece sem ampliação destrutiva, com a capa completa e nítida.
- **Conteúdo:** títulos, dados da cartilha, links e oito temas permanecem inalterados.
- **Responsividade:** a nova regra vale somente acima de 900 px; tablet e celular continuam usando o enquadramento móvel existente.
- **Console:** nenhum erro ou aviso encontrado.

Não restaram diferenças P0, P1 ou P2 no enquadramento solicitado. A comparação focada no hero foi suficiente porque a alteração não toca as demais seções nem suas interações.

**final result: passed**

---

## QA visual — Cartilha de Contratações Sustentáveis da PGE-SP (25/08/2026)

- **Fonte visual:** `/Users/eduardofariascappia/Downloads/PHOTO-2026-08-25-17-19-45.jpg`
- **Conteúdo oficial:** `/Users/eduardofariascappia/Downloads/Cartilha_Contratacoes_Sustentaveis_PGE.pdf`
- **Implementação desktop:** [`qa/pge-implementation-1024-final-frame.png`](./qa/pge-implementation-1024-final-frame.png)
- **Comparação lado a lado:** [`qa/pge-comparison.png`](./qa/pge-comparison.png)
- **Implementação móvel:** [`qa/pge-mobile-390-final.png`](./qa/pge-mobile-390-final.png)
- **Card na página inicial:** [`qa/pge-home-card-1024.png`](./qa/pge-home-card-1024.png)
- **Viewports:** 1024 × 900 e 390 × 844 CSS px.

### Evidência e superfícies verificadas

- Hero próprio em alta definição com livro 3D, pedestal, círculos e folhagem; a composição mantém o lado esquerdo livre para o conteúdo HTML.
- Cabeçalho e rodapé seguem o padrão global do portal.
- Título, descrição, oito temas, destaques e documento disponível reproduzem a ordem e a hierarquia da referência.
- Os dados foram conferidos no PDF: PGE-SP, 1ª edição de 2025, 88 páginas e arquivo de 4,23 MB. Dados ilustrativos sem respaldo no documento não foram usados.
- Cada um dos oito temas abre e fecha um diálogo funcional com conteúdo correspondente à cartilha.
- Leitura e download apontam para o PDF local oficial.
- A página possui entradas internas pela Home, Biblioteca e seção Sobre.
- O card rápido da PGE usa livro 3D isolado, com transparência real, no mesmo padrão dos demais livros.
- Hero otimizado para WebP com 63 KB e miniatura do livro com 10 KB.
- Em 390 px, CTAs ocupam toda a largura, metadados formam grade 2 × 2 e não existe overflow horizontal.
- Nenhum erro ou aviso foi encontrado no console.

Não restaram diferenças P0, P1 ou P2 no layout, conteúdo e interações solicitadas.

**final result: passed**

---

## QA de regressão — livro completo do Manual do TCESP em 100% (25/08/2026)

- **Relato visual:** `/var/folders/jq/drpbqr_j16g_594_xn6q_qf80000gn/T/TemporaryItems/NSIRD_screencaptureui_tQHOKp/Captura de Tela 2026-08-25 às 17.53.55.png`
- **Referência com o livro inteiro:** `/Users/eduardofariascappia/Downloads/Manual de Gestão Sustentável do TCESP.png`
- **Implementação em tela larga:** [`qa/manual-tcesp-book-full-1470.png`](./qa/manual-tcesp-book-full-1470.png)
- **Implementação em 1024 px:** [`qa/manual-tcesp-book-full-1024.png`](./qa/manual-tcesp-book-full-1024.png)
- **Comparação lado a lado:** [`qa/manual-tcesp-book-visibility-comparison.png`](./qa/manual-tcesp-book-visibility-comparison.png)
- **Regressão móvel:** [`qa/manual-tcesp-book-mobile-390.png`](./qa/manual-tcesp-book-mobile-390.png)

### Resultado

- A causa era o uso de `background-size: cover`: em telas largas, a escala pela largura ultrapassava a altura do hero e cortava topo e base do livro.
- Em desktop, a arte agora usa altura proporcional de 125% e alinhamento à direita. O livro fica maior, mas totalmente visível, inclusive em 1470 px com zoom de 100%.
- Em 1024 px, o livro continua inteiro e não invade a coluna de texto.
- A regra é restrita ao Manual do TCESP acima de 900 px; a página da PGE e a composição móvel permanecem independentes.
- Não há overflow horizontal nem erros ou avisos no console.

Não restaram diferenças P0, P1 ou P2 na visibilidade da capa em 100%.

**final result: passed**

---

## QA visual — livros sem fundo retangular (25/08/2026)

- **Fonte visual:** `/var/folders/jq/drpbqr_j16g_594_xn6q_qf80000gn/T/TemporaryItems/NSIRD_screencaptureui_N4h9C3/Captura de Tela 2026-08-25 às 17.28.18.png`
- **Implementação:** [`qa/home-livros-sem-fundo-1024.png`](./qa/home-livros-sem-fundo-1024.png)
- **Viewport:** 1024 × 900 CSS px.

O fundo branco das miniaturas agora se integra ao fundo dos cards por composição de cor, e a sombra retangular foi removida. Permanecem visíveis apenas os livros e suas sombras naturais. Nenhum erro ou aviso foi encontrado no console.

**final result: passed**

---

## QA visual — capas da Home e cabeçalho do Manual (25/08/2026)

- **Referência das capas:** `/var/folders/jq/drpbqr_j16g_594_xn6q_qf80000gn/T/TemporaryItems/NSIRD_screencaptureui_0uVIGY/Captura de Tela 2026-08-25 às 17.16.13.png`
- **Referência do cabeçalho:** `/var/folders/jq/drpbqr_j16g_594_xn6q_qf80000gn/T/TemporaryItems/NSIRD_screencaptureui_mbQn4i/Captura de Tela 2026-08-25 às 17.17.07.png`
- **Implementação das capas:** [`qa/home-livros-1024.png`](./qa/home-livros-1024.png)
- **Implementação do cabeçalho:** [`qa/manual-header-1024.png`](./qa/manual-header-1024.png)
- **Verificação móvel:** [`qa/home-livros-mobile-390.png`](./qa/home-livros-mobile-390.png)

### Resultado

- O card “Manual de Gestão Sustentável do TCESP” agora usa uma miniatura real do livro, não o antigo ícone institucional.
- A capa de “A Lei de Licitações e os ODS” aumentou de uma caixa de 70 × 66 px para 104 × 96 px.
- Os dois livros compartilham a mesma área visual, alinhamento e sombra, preservando a linha de títulos.
- A miniatura do manual foi otimizada para WebP com 18 KB.
- O cabeçalho do Manual agora contém exatamente Início, Critérios e Sobre, além de busca, notificação, acessibilidade e perfil.
- O layout móvel mantém largura de 390 px sem overflow horizontal; as capas permanecem em 104 × 96 px.
- Nenhum erro ou aviso foi encontrado no console.

Não restaram diferenças P0, P1 ou P2 no escopo solicitado.

**final result: passed**

---

## QA de integração — página do Manual no portal (25/08/2026)

- **Implementação desktop:** [`qa/manual-tcesp-integrated-top-1024.png`](./qa/manual-tcesp-integrated-top-1024.png)
- **Implementação móvel:** [`qa/manual-tcesp-integrated-mobile-390.png`](./qa/manual-tcesp-integrated-mobile-390.png)
- **Viewports:** 1024 × 1200 e 390 × 844 CSS px.
- **Estado:** página carregada no topo, tema fechado e Biblioteca marcada como seção atual.

### Integrações verificadas

- Cabeçalho global com marca do Governo do Estado, navegação principal e busca.
- Marca do cabeçalho retorna à página inicial; breadcrumb retorna à Biblioteca.
- Rodapé global com 21 acessos para Plataforma, Recursos, Suporte e Governo do Estado.
- Entradas internas confirmadas na página inicial, na Biblioteca e na seção Sobre.
- `main.js` e `manual-tcesp.js` carregam juntos sem conflito; o diálogo dos temas continua funcional.
- PDF local, links oficiais e download foram preservados.
- Em 390 px, não há overflow horizontal; marca, breadcrumb e rodapé mantêm a conexão com o portal.
- Nenhum erro ou aviso no console em desktop ou celular.

### Histórico da correção

1. **P1 — página isolada:** o manual não possuía cabeçalho, rodapé ou script compartilhado. O shell institucional completo foi incorporado.
2. **P1 — conflito de JavaScript:** os scripts compartilhado e específico declaravam o mesmo identificador global. O código do manual foi isolado e renomeado antes da integração.
3. **P2 — poucos caminhos de entrada:** além da Biblioteca, a página agora também pode ser acessada pela Home e pelas Referências Técnicas da página Sobre.

Não restaram diferenças P0, P1 ou P2 no fluxo de entrada, retorno e navegação da página.

**final result: passed**

---

## QA visual — Manual de Gestão Sustentável do TCESP (25/08/2026)

- **Fonte visual:** `/Users/eduardofariascappia/Downloads/PHOTO-2026-08-25-13-10-34.jpg`
- **Conteúdo oficial:** `/Users/eduardofariascappia/Downloads/Manual-Sustentabilidade-TCESP.pdf`
- **Implementação:** [`qa/manual-tcesp-implementation-1024.png`](./qa/manual-tcesp-implementation-1024.png)
- **Comparação lado a lado:** [`qa/manual-tcesp-comparison-pass1.png`](./qa/manual-tcesp-comparison-pass1.png)
- **Versão móvel:** [`qa/manual-tcesp-mobile-390.png`](./qa/manual-tcesp-mobile-390.png)
- **Viewport desktop:** 1024 × 1250 CSS px; captura raster normalizada para 1024 px de largura.
- **Viewport móvel:** 390 × 844 CSS px, densidade do navegador 2×.
- **Dimensões da fonte:** 1024 × 1249 px.
- **Estado:** página carregada, nenhum diálogo aberto e primeiro tema visível.

### Evidência e superfícies verificadas

- **Visão completa:** hero verde, livro, trilha de navegação, ações, metadados, oito temas, destaques, documentos e faixa sobre o TCESP aparecem na mesma ordem e proporção da referência.
- **Tipografia:** título em duas linhas, pesos, contraste e hierarquia correspondem ao alvo; textos pequenos permanecem legíveis.
- **Espaçamento:** grade de quatro colunas no desktop e uma coluna no celular; margens e ritmo vertical preservam a composição compacta da referência.
- **Cores:** verde profundo, verde oliva, fundos brancos, bordas suaves e sombras discretas reproduzem os tokens visuais da fonte.
- **Imagem:** hero próprio em alta definição (1674 × 941 px), sem recorte do livro e sem pixelização; a capa mantém a identidade visual do manual.
- **Conteúdo:** ano, número de páginas e tamanho do arquivo foram corrigidos com base no PDF real enviado pelo usuário.
- **Interações testadas:** entrada pela Biblioteca, abertura e fechamento dos temas, leitura do PDF, download do PDF e links oficiais do TCESP.
- **Responsividade:** 390 px sem overflow horizontal; botões ocupam a largura disponível e os metadados formam grade 2 × 2.
- **Console:** nenhum erro ou aviso encontrado.

### Histórico da comparação

1. **P2 — dados demonstrativos divergentes:** a referência sugeria versão e atualização que não constam no arquivo oficial. Corrigido para 41 páginas, publicação em fevereiro de 2019 e arquivo de 2,0 MB.
2. **P2 — ativo visual insuficiente:** a captura original não suportava ampliação do livro. Substituída por uma cena de hero dedicada em alta definição, mantendo livro, pedestal, círculos e folhagem.
3. **P2 — experiência móvel não definida na fonte:** implementada adaptação com imagem suavizada, conteúdo linear, CTAs empilhados e grade de metadados sem rolagem lateral.

Não restaram diferenças P0, P1 ou P2 no layout e nas interações solicitadas. A redação dos oito temas foi ajustada para refletir os capítulos e eixos reais do manual, em vez de copiar títulos ilustrativos da imagem.

**final result: passed**

---

## QA visual — heróis unificados em verde-sálvia e livros 3D (25/08/2026)

- **Fonte visual:** `/Users/eduardofariascappia/Downloads/PHOTO-2026-08-25-19-01-08.jpg`
- **AGU em 100%:** [`qa/publication-agu-sage-1280.png`](./qa/publication-agu-sage-1280.png)
- **PGE em 100%:** [`qa/publication-pge-sage-1280.png`](./qa/publication-pge-sage-1280.png)
- **TCESP em 100%:** [`qa/publication-tcesp-sage-1280.png`](./qa/publication-tcesp-sage-1280.png)
- **Comparação direta com a referência:** [`qa/publication-sage-comparison.png`](./qa/publication-sage-comparison.png)
- **Viewport verificado:** 1280 × 720 CSS px, zoom de 100%.

### Superfícies de fidelidade verificadas

- **Composição:** as três páginas usam a mesma cena com fundo verde-sálvia, círculos discretos, pedestal claro e folhagem na borda direita; a coluna esquerda permanece livre para o conteúdo HTML.
- **Livros:** AGU, PGE e TCESP aparecem como volumes 3D completos, com capa, lombada e bloco de páginas visíveis. Nenhum topo, base ou lateral é cortado no viewport verificado.
- **Cor:** o token compartilhado `#7c887a` reproduz a família verde-sálvia da referência e evita variações de fundo entre as publicações.
- **Hierarquia e legibilidade:** título, órgão, descrição, ações e metadados mantêm contraste branco/verde-claro e não colidem com os livros.
- **Funcionalidade:** o primeiro tema de cada uma das três publicações abre e fecha seu diálogo com conteúdo real. Não houve erro ou aviso no console.

Não restaram diferenças P0, P1 ou P2 no escopo solicitado para os heróis das publicações técnicas.

**final result: passed**

---

## QA de regressão — livros integrados aos cenários (25/08/2026)

- **Problema reportado:** os três livros pareciam imagens separadas, flutuando sobre o mesmo fundo, com diferenças de escala, perspectiva e sombra.
- **Referências do problema:** capturas do usuário de PGE, AGU e TCESP às 19h47–19h48.
- **PGE corrigido em 100%:** [`qa/publication-integrated-pge-1280.png`](./qa/publication-integrated-pge-1280.png)
- **AGU corrigido em 100%:** [`qa/publication-integrated-agu-1280.png`](./qa/publication-integrated-agu-1280.png)
- **TCESP corrigido em 100%:** [`qa/publication-integrated-tcesp-1280.png`](./qa/publication-integrated-tcesp-1280.png)
- **Viewport verificado:** 1280 × 720 CSS px, zoom de 100%.

### Correção e resultado

- Cada herói agora é uma composição raster única: fundo, folhagem, círculos, pedestal, livro, iluminação e sombra de contato pertencem à mesma cena.
- Os três livros compartilham câmera quase frontal, altura visual equivalente e a mesma posição sobre o pedestal.
- Nenhuma capa, lombada, topo ou base é cortada no viewport verificado.
- A sombra de contato elimina o efeito de livro colado ou flutuando; não há mais sobreposição HTML separada para o livro.
- A inspeção pareada das três capturas anteriores com as três novas capturas não encontrou costuras, caixas brancas ou colisões com o conteúdo.
- O primeiro cartão temático de AGU, PGE e TCESP abre e fecha o diálogo correto; os três consoles permaneceram sem erros ou avisos.

Não restaram diferenças P0, P1 ou P2 no padrão visual e funcional dos três heróis.

**final result: passed**

---

## QA visual — navegação rápida padronizada (25/08/2026)

- **Fonte visual:** `/var/folders/jq/drpbqr_j16g_594_xn6q_qf80000gn/T/TemporaryItems/NSIRD_screencaptureui_oT3J5O/Captura de Tela 2026-08-25 às 20.19.48.png`
- **Implementação completa:** [`qa/quick-access-standardized-pass2-1280.png`](./qa/quick-access-standardized-pass2-1280.png)
- **Recorte comparado:** [`qa/quick-access-standardized-crop-1280.jpg`](./qa/quick-access-standardized-crop-1280.jpg)
- **Viewport verificado:** 1280 × 720 CSS px, zoom de 100%.
- **Dimensões da fonte:** 2048 × 658 px; comparação concentrada na seção de navegação rápida.
- **Estado:** página inicial carregada, navegação rápida visível e nenhum diálogo aberto.

### Correções e superfícies verificadas

- **P1 — escalas e linhas de base divergentes:** ícones e capas ocupavam áreas diferentes e os títulos começavam em alturas irregulares. Todos os cartões agora usam um palco de mídia de 104 px e um palco de título de 60 px.
- **P1 — capa da AGU sem padrão:** a imagem plana ultrapassava o espaço visual do cartão e se sobrepunha ao título. Foi substituída pelo livro 3D completo, contido no mesmo palco dos demais livros.
- **P2 — ativos rasterizados frágeis:** ODS e glossário usavam imagens com pouca definição. Ambos foram substituídos por SVG e permanecem nítidos no palco padronizado.
- **Escala óptica:** selos, ícones e livros recebem dimensões próprias dentro do mesmo palco, preservando peso visual equivalente sem distorção ou corte.
- **Alinhamento medido:** os sete palcos começam em `y = 584 px` e medem `104 px`; os sete títulos começam em `y = 698 px` e medem `60 px`.
- **Responsividade:** a grade mantém sete colunas em telas largas, duas colunas em tablets e uma coluna em celulares, sem overflow horizontal.
- **Interações:** este registro foi sucedido pela inclusão do card Cadernos ODS; a validação atual da navegação rápida está documentada na seção de 28/08/2026.
- **Console:** nenhum erro ou aviso encontrado.

Não restaram diferenças P0, P1 ou P2 no tamanho, alinhamento, nitidez e comportamento dos acessos rápidos.

**final result: passed**

---

## QA visual — novas imagens dos acessos rápidos (02/09/2026)

### Escopo e evidências

- **Fonte visual:** `/Users/eduardofariascappia/Downloads/PHOTO-2026-09-02-17-49-14.jpg`, 676 × 468 px.
- **Escopo:** imagens dos cards Cadernos ODS, ODS e Glossário de Sustentabilidade. O link da coleção foi encurtado para “Acessar coleção”, como na referência. Os outros quatro cards, destinos, cabeçalho e rodapé foram preservados.
- **Prévia:** `http://127.0.0.1:4173/index.html#navegacao`.
- **Desktop final:** [`qa/quick-access-desktop-1280.png`](./qa/quick-access-desktop-1280.png), 1280 × 720 CSS px e arquivo PNG de 1280 × 720 px. O navegador informa DPR 2; a API exporta a captura em pixels CSS.
- **Desktop intermediário:** [`qa/quick-access-desktop-1024.png`](./qa/quick-access-desktop-1024.png), 1024 × 768 px. Também inspecionado o limite da grade em 901 × 768 CSS px.
- **Mobile:** [`qa/quick-access-mobile-390.png`](./qa/quick-access-mobile-390.png) e [`glossário após rolagem`](./qa/quick-access-mobile-glossario-390.png), 390 × 844 CSS px, PNGs de 390 × 844 px.
- **Comparação pareada final:** [`qa/quick-access-comparison-final.png`](./qa/quick-access-comparison-final.png).
- **Detalhe das imagens:** [`qa/quick-access-art-comparison.png`](./qa/quick-access-art-comparison.png).
- **Normalização:** recorte da referência em `(60,12)-(659,449)`, 599 × 437 px; recorte da implementação em `(154,38)-(565,344)`, 411 × 306 px, ampliado proporcionalmente para 599 × 446 px. Comparação dos mesmos três cards, sem moldura de navegador. Não foi alterada a proporção das capturas para forçar igualdade.
- **Estado:** página carregada, sem diálogo aberto, imagens carregadas, nenhum card em hover na captura comparada. No mobile a rolagem foi feita até as imagens para validar o carregamento adiado.

### Histórico da comparação e correções

1. **P2 — mosaico com proporção horizontal diferente da referência.** A primeira comparação, [`quick-access-comparison-v1.png`](./qa/quick-access-comparison-v1.png), mostrava cinco colunas. Foi ajustado para quatro colunas e assinatura abaixo, mantendo todos os 17 ícones oficiais em ordem. A comparação final mostra a composição vertical corrigida.
2. **P2 — sobreposição móvel da assinatura com o título ODS.** Visível em [`quick-access-mobile-before.png`](./qa/quick-access-mobile-before.png). A imagem ultrapassava o palco de 104 px quando o título passava a altura automática. Os três palcos de mídia recebem 124 px abaixo de 560 px. Na captura final móvel, a assinatura termina 10,25 px antes do título, sem colisão.
3. As novas artes foram ampliadas e centralizadas opticamente, sem cortar livros ou peças. A coluna do palco usa `minmax(0,1fr)` para impedir que imagens maiores desloquem o centro. A versão da folha de estilo no `index.html` foi atualizada para impedir a reutilização dos estilos antigos em cache.

### Superfícies de fidelidade

- **Fontes e tipografia:** família Arial/Helvetica, pesos e tamanhos dos cards existentes preservados. Títulos, descrições e ações continuam em HTML. Textos das capas e das quatro peças do glossário pertencem às imagens. O link “Acessar coleção” permanece em uma linha no desktop comparado.
- **Espaçamento e ritmo:** mesma grade, bordas e alinhamento dos sete cards. Os primeiros três medem 130,28 × 304,84 px em 1280 px de largura. Livros e glossário usam escala óptica própria no palco comum, sem encobrir títulos. Em mobile permanece uma coluna e não há sobreposição após a correção.
- **Cores e tokens:** superfícies brancas e ações verdes preservadas. Os livros mantêm a sequência vermelho/laranja/verde/vermelho. As peças do glossário usam verde-sálvia muito claro, texto verde-escuro e sombras suaves. O mosaico usa os vetores coloridos originais da ONU Brasil, sem filtros sobre suas cores.
- **Qualidade de imagem:** dois WebP de 1024 px, com livros inteiros e quatro peças completas; sem quadro branco ou sombra retangular adicionada. Os ícones ODS e o emblema são vetoriais oficiais, não redesenhados. A imagem e os ícones permanecem nítidos no tamanho nativo; a ampliação da captura de QA não é a resolução dos arquivos servidos.
- **Conteúdo:** títulos, descrições e destinos mantidos. Os 17 ODS foram preservados, embora a referência mostre uma seleção menor e outra ordem. Não se reproduziram essas omissões nem os símbolos incorretos de algumas capas do mock. Esta é uma adaptação deliberada de conteúdo, não uma alegação de identidade pixel a pixel.

### Validação funcional e estática

- Clique em “Acessar coleção” abriu `cadernos-ods.html`, com título Cadernos ODS.
- Clique em “Conhecer ODS” abriu `ods.html`, com título Objetivos de Desenvolvimento Sustentável.
- Clique diretamente sobre a nova imagem do glossário abriu `glossario.html`, com título “O que significa esse termo?”.
- Navegação por Tab entre os cards funcionou; foco visível de 3 px confirmado no card ODS.
- Todas as 20 imagens dos três cards carregadas, sem imagens quebradas. Nenhum overflow horizontal em 390, 901, 1024 ou 1280 CSS px.
- Nenhum erro ou aviso capturado no console durante os testes.
- Revisão independente somente leitura: estrutura HTML balanceada, IDs únicos, 116 referências verificadas sem arquivo local ausente; 18 SVGs válidos sem scripts/eventos/recursos externos. Os quatro cards restantes são idênticos ao HEAD.
- `git diff --check` sem erros. O portal é estático, sem etapa de build.

### Limites e acabamento

- P3: pequenas diferenças de perspectiva e microdetalhes nas duas ilustrações recriadas; o estilo, os assuntos, a paleta e o enquadramento foram reproduzidos. Os selos “Novo” adicionais da referência não foram incluídos, pois o pedido era de alteração das imagens.
- Este registro documenta a validação local anterior ao envio ao GitHub. A produção na Vercel não foi testada nesta etapa.
- Arquivos, fontes e prompts finais: [`assets/quick-access/README.md`](./assets/quick-access/README.md).

Não restaram achados P0, P1 ou P2 no escopo desta alteração.

**final result: passed**
