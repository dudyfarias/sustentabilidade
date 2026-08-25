# Design QA — Plataforma Estadual de Sustentabilidade

Protótipo funcional em HTML semântico, CSS e JavaScript, sem dependências de build.
Este documento registra o estado atual da implementação e as verificações feitas.

Os catálogos exibidos são **demonstrativos por decisão de escopo**: esta entrega é a camada
visual, destinada ao time que implementará o backend. As publicações anexadas do TCESP e
da PGE-SP são documentos oficiais. O contrato de dados está em [`HANDOFF.md`](./HANDOFF.md).

---

## Páginas

| Página | Arquivo | Script | Conteúdo |
| --- | --- | --- | --- |
| Início | `index.html` | `main.js` | Hero, busca, navegação rápida (6 cards alinhados), ODS, destaques e chamada final |
| Critérios | `criterios.html` | `criterios.js` | Catálogo com busca, 5 filtros, chips de categoria, 6 critérios e paginação |
| Contratações | `contratacoes.html` | `contratacoes.js` | KPIs, filtros por objeto e situação, 6 contratações |
| Glossário | `glossario.html` | `glossario.js` | 60 termos agrupados por letra, com sigla, categoria, remissões e links |
| Biblioteca | `biblioteca.html` | `biblioteca.js` | Documento em destaque, 15 documentos em 5 tipos e legislação de referência |
| Transparência | `transparencia.html` | — | KPIs, 3 conjuntos de dados abertos, 3 relatórios e API pública |
| Sobre | `sobre.html` | — | Objetivos, referências institucionais e canais de contato |
| ODS | `ods.html` | `main.js` | 17 objetivos agrupados nos 5 eixos da Agenda 2030 |
| Central de Ajuda | `faq.html` | `faq.js` | 30 perguntas em cards, com ícone semântico, resumo, links relacionados e chips de categoria |
| Termos de Uso | `termos.html` | — | 12 seções sobre condições de uso da plataforma |
| Política de Privacidade | `privacidade.html` | — | 11 seções conforme a LGPD |
| Acessibilidade | `acessibilidade.html` | — | 8 seções com recursos e limitações conhecidas |
| Manual de Gestão Sustentável do TCESP | `manual-gestao-sustentavel-tcesp.html` | `manual-tcesp.js` | Publicação oficial, oito temas e documentos relacionados |
| Cartilha de Contratações Sustentáveis da PGE-SP | `cartilha-contratacoes-sustentaveis-pge.html` | `cartilha-pge.js` | Publicação oficial, oito temas e download do PDF |
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
  inicial. TCESP e PGE-SP possuem páginas próprias; apenas Selo Verde permanece "Em breve".
- **Rodapé de 5 colunas** com redes sociais e assinatura institucional.
- **Ouvidoria** e **Fale conosco** apontam para os canais oficiais do Estado
  (`fala.sp.gov.br` e `compras.sp.gov.br/fale-conosco`), abertos em nova aba.
- Composição fiel a 1024 px de largura, com contêiner de 1000 px.

---

## Indexação e compartilhamento

- `robots.txt` liberando indexação e apontando para o sitemap.
- `sitemap.xml` com as 14 URLs canônicas, em formato limpo (sem `.html`).
- `canonical` em todas as páginas, coerente com `cleanUrls` da Vercel.
- Open Graph e Twitter Card completos, com imagem própria de 1200×630.
- Favicon em `.ico`, `.svg`, `apple-touch-icon` e ícones de 192 e 512 px.
- `site.webmanifest` com nome, cores e ícones para instalação em dispositivos.
- `404.html` institucional, marcado com `noindex`.

---

## Verificação funcional

Cada item abaixo foi executado no navegador contra a implementação.

**Navegação**
- As 14 páginas e a 404 respondem HTTP 200.
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
- Ordenação por título percorre os 15 documentos em ordem alfabética.
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
- Os seis cards compartilham a mesma caixa de arte, a mesma linha de base de
  título, de texto e de link: uma única medida para cada, em vez de três ritmos.
- TCESP e PGE-SP usam livros próprios, com acesso direto às páginas das publicações.
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
- Liberar a área de Produtos com Selo Verde, hoje sinalizada como "Em breve".
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
