# Design QA — Plataforma Estadual de Sustentabilidade

Protótipo funcional em HTML semântico, CSS e JavaScript, sem dependências de build.
Este documento registra o estado atual da implementação e as verificações feitas.

Os dados exibidos são **demonstrativos por decisão de escopo**: esta entrega é a camada
visual, destinada ao time que implementará o backend. O contrato de dados de cada tela
está descrito em [`HANDOFF.md`](./HANDOFF.md).

---

## Páginas

| Página | Arquivo | Script | Conteúdo |
| --- | --- | --- | --- |
| Início | `index.html` | `main.js` | Hero, busca, navegação rápida (6 cards), ODS, destaques e chamada final |
| Critérios | `criterios.html` | `criterios.js` | Catálogo com busca, 5 filtros, chips de categoria, 6 critérios e paginação |
| Contratações | `contratacoes.html` | `contratacoes.js` | KPIs, filtros por objeto e situação, 6 contratações |
| Glossário | `glossario.html` | `glossario.js` | 16 termos, filtro por categoria e por letra inicial |
| Biblioteca | `biblioteca.html` | `biblioteca.js` | 4 documentos com metadados, resumo e download |
| Transparência | `transparencia.html` | — | KPIs, 3 conjuntos de dados abertos, 3 relatórios e API pública |
| Sobre | `sobre.html` | — | Objetivos, referências institucionais e canais de contato |
| ODS | `ods.html` | `main.js` | 17 objetivos agrupados nos 5 eixos da Agenda 2030 |
| Perguntas frequentes | `faq.html` | `faq.js` | 8 perguntas com categorias e busca |
| Termos de Uso | `termos.html` | — | 12 seções sobre condições de uso da plataforma |
| Política de Privacidade | `privacidade.html` | — | 11 seções conforme a LGPD |
| Acessibilidade | `acessibilidade.html` | — | 8 seções com recursos e limitações conhecidas |
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
  inicial, onde TCE, PGE e Selo Verde exibem selo "Em breve" e abrem diálogo.
- **Rodapé de 5 colunas** com redes sociais e assinatura institucional.
- **Ouvidoria** e **Fale conosco** apontam para os canais oficiais do Estado
  (`fala.sp.gov.br` e `compras.sp.gov.br/fale-conosco`), abertos em nova aba.
- Composição fiel a 1024 px de largura, com contêiner de 1000 px.

---

## Indexação e compartilhamento

- `robots.txt` liberando indexação e apontando para o sitemap.
- `sitemap.xml` com as doze URLs canônicas, em formato limpo (sem `.html`).
- `canonical` em todas as páginas, coerente com `cleanUrls` da Vercel.
- Open Graph e Twitter Card completos, com imagem própria de 1200×630.
- Favicon em `.ico`, `.svg`, `apple-touch-icon` e ícones de 192 e 512 px.
- `site.webmanifest` com nome, cores e ícones para instalação em dispositivos.
- `404.html` institucional, marcado com `noindex`.

---

## Verificação funcional

Cada item abaixo foi executado no navegador contra a implementação.

**Navegação**
- As 12 páginas e a 404 respondem HTTP 200.
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
- Letras sem termos correspondentes ficam desabilitadas.
- Busca ignora acentuação: "criterio" e "critério" retornam o mesmo resultado.

**Biblioteca**
- Chips por tipo de documento filtram os cards.
- "Ler resumo" abre diálogo com a descrição do documento.
- Download informa que o arquivo será disponibilizado após a integração.

**Transparência**
- Conjuntos de dados, relatórios e painel da API renderizam corretamente.
- Ações de download e de dicionário de dados abrem diálogo explicativo.

**Perguntas frequentes**
- Categorias filtram as perguntas.
- A busca expande automaticamente as perguntas encontradas.

**Geral**
- Sem erros no console em nenhuma página.
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
- Liberar as áreas de TCE, PGE e Produtos com Selo Verde, hoje sinalizadas como "Em breve".
- Substituir os recortes editoriais por arquivos-fonte quando o time de design os fornecer.

---

## Pendências institucionais

- Validação institucional do conteúdo antes da publicação oficial.
- Revisão jurídica das minutas de Termos de Uso e Política de Privacidade.
- Designação formal do Encarregado pelo tratamento de dados pessoais (DPO).
- Auditoria externa de acessibilidade e submissão ao avaliador oficial do eMAG.

---

_Última atualização: julho de 2026._
