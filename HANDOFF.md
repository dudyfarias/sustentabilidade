# Handoff para o time de backend

Este documento descreve o que existe no protótipo, o modelo de dados implícito em cada
tela e onde exatamente conectar a API. O front-end está pronto: os catálogos ainda são
estáticos e servem como contrato visual; as publicações anexadas do TCESP, da PGE-SP e da AGU são oficiais. A obra A Lei de Licitações e os ODS e os quatro Cadernos ODS são acessados nos visualizadores oficiais indicados pelas fontes.

---

## 1. O que é este repositório

Protótipo funcional em HTML, CSS e JavaScript, **sem etapa de build e sem dependências
de pacote**. Basta servir a pasta como estática.

```bash
python3 -m http.server 4173
```

| Item | Situação |
| --- | --- |
| Telas | 17 páginas concluídas |
| Estilo | `styles.css` único, compartilhado por todas as páginas |
| Comportamento | `main.js` global + um script por página de catálogo |
| Dados | **Estáticos no HTML** — a substituir pela API |
| Autenticação | Não existe. O "Olá, gestor" do cabeçalho é decorativo |
| Navegação | Menu enxuto de 3 itens; demais páginas via rodapé e navegação rápida |
| Backend | Inexistente |

---

## 2. Mapa de páginas

| Rota (com `cleanUrls`) | Arquivo | Script | Precisa de API? |
| --- | --- | --- | --- |
| `/` | `index.html` | `main.js` | Parcial — destaques e notícias |
| `/criterios` | `criterios.html` | `criterios.js` | **Sim** |
| `/contratacoes` | `contratacoes.html` | `contratacoes.js` | **Sim** |
| `/ods` | `ods.html` | `main.js` | Parcial — contagem de critérios por ODS |
| `/cadernos-ods` | `cadernos-ods.html` | `main.js` | Não — quatro leituras oficiais externas no FlipHTML5 |
| `/glossario` | `glossario.html` | `glossario.js` | **Sim** |
| `/biblioteca` | `biblioteca.html` | `biblioteca.js` | **Sim** |
| `/manual-gestao-sustentavel-tcesp` | `manual-gestao-sustentavel-tcesp.html` | `manual-tcesp.js` | Não — publicação oficial local |
| `/cartilha-contratacoes-sustentaveis-pge` | `cartilha-contratacoes-sustentaveis-pge.html` | `cartilha-pge.js` | Não — publicação oficial local |
| `/guia-nacional-contratacoes-sustentaveis-agu` | `guia-nacional-contratacoes-sustentaveis-agu.html` | `guia-agu.js` | Não — publicação oficial local |
| `/lei-licitacoes-ods` | `lei-licitacoes-ods.html` | `lei-licitacoes-ods.js` | Não — leitura oficial externa no FlipHTML5 |
| `/transparencia` | `transparencia.html` | `main.js` | **Sim** — downloads e indicadores |
| `/faq` | `faq.html` | `faq.js` | Opcional — conteúdo pode seguir estático |
| `/sobre` | `sobre.html` | `main.js` | Não |
| `/termos` | `termos.html` | `main.js` | Não |
| `/privacidade` | `privacidade.html` | `main.js` | Não |
| `/acessibilidade` | `acessibilidade.html` | `main.js` | Não |

> Ouvidoria e Fale conosco são atendidos pelos canais oficiais do Estado
> (`fala.sp.gov.br` e `compras.sp.gov.br/fale-conosco`) e não têm página própria
> nem endpoint nesta plataforma.

> `vercel.json` usa `cleanUrls: true`. As URLs canônicas **não têm `.html`**.
> Mantenha esse comportamento ao migrar de host, ou atualize `sitemap.xml`,
> as tags `canonical` e as `og:url` das páginas.

---

## 3. Modelo de dados

Os campos abaixo já estão expressos como atributos `data-*` no HTML. O front usa esses
atributos para filtrar sem recarregar a página, então a API deve entregar exatamente
esses domínios de valores.

### 3.1 Critério

Origem: `criterios.html`, um `<article class="criterio-card">` por registro.

| Campo | Tipo | Atributo no HTML | Domínio |
| --- | --- | --- | --- |
| `codigo` | string | conteúdo de `.criterio-code` | Padrão `CRIT-SP-000` |
| `titulo` | string | `<h3>` | — |
| `descricao` | string | `<p>` | — |
| `categoria` | enum | `data-category` | `obras`, `tecnologia`, `veiculos`, `alimentacao`, `servicos`, `residuos` |
| `ods` | int[] | `data-ods` (separado por espaço) | 1 a 17 |
| `documento` | enum | `data-documento` | `Projeto Básico`, `ETP`, `TR`, `Edital`, `Contrato` |
| `nivel` | enum | `data-nivel` | `obrigatorio`, `recomendado`, `complementar` |
| `area` | enum | `data-area` | `ambiental`, `social`, `economico`, `governanca` |

```json
{
  "codigo": "CRIT-SP-002",
  "titulo": "Sistema Fotovoltaico",
  "descricao": "Priorizar a instalação de sistemas fotovoltaicos...",
  "categoria": "obras",
  "ods": [7, 11, 13],
  "documento": "ETP",
  "nivel": "recomendado",
  "area": "ambiental"
}
```

### 3.2 Contratação

Origem: `contratacoes.html`, um `<article class="contrato-card">` por registro.

| Campo | Tipo | Atributo no HTML | Domínio |
| --- | --- | --- | --- |
| `codigo` | string | `.contrato-code` | Padrão `CTR-AAAA-0000` |
| `objeto` | string | `<h3>` | — |
| `orgao` | string | `.contrato-org` | — |
| `categoria` | enum | `data-contrato-category` | mesmos valores de `categoria` do critério |
| `situacao` | enum | `data-contrato-status` | `em-execucao`, `concluida` |
| `modalidade` | string | 1º `.contrato-dado` | `Concorrência`, `Pregão eletrônico`, … |
| `valor` | decimal | 2º `.contrato-dado` | exibido formatado (`R$ 12,4 mi`) |
| `assinatura` | date | 3º `.contrato-dado` | exibido como `Mar/2026` |
| `criterios` | string[] | `.tags` | códigos de critério vinculados |

> **Atenção:** `valor` e `assinatura` chegam ao HTML **já formatados**. Prefira devolver
> os valores crus na API (`valor_centavos`, `assinatura` em ISO 8601) e formatar no
> front, para permitir ordenação e agregação corretas.

### 3.3 Termo do glossário

Origem: `glossario.html`, `<article class="termo-card">`, agrupados por letra em
`<section class="letra-grupo">`. São 60 verbetes; a letra é derivada do termo.

| Campo | Tipo | Atributo | Domínio |
| --- | --- | --- | --- |
| `termo` | string | `<h3>` | — |
| `sigla` | string | `.termo-sigla` | opcional, ex.: ETP, SRP, PCA |
| `definicao` | string | `<p>` | — |
| `categoria` | enum | `data-term-category` | `contratacao`, `ambiental`, `normativo`, `ods`, `indicadores` |
| `inicial` | char | `data-term-initial` | A–Z, derivável de `termo` |
| `remissoes` | string[] | `.termo-veja a` | outros verbetes, por âncora `#termo-slug` |
| `relacionados` | link[] | `.termo-link` | páginas da plataforma ligadas ao verbete |

### 3.4 Documento da biblioteca

Origem: `biblioteca.html`, `<article class="doc-card">`. São 20 documentos.

| Campo | Tipo | Atributo | Domínio |
| --- | --- | --- | --- |
| `titulo` | string | `<h3>` | — |
| `descricao` | string | `<p>` | — |
| `tipo` | enum | `data-doc-type` | `guia`, `manual`, `cartilha`, `modelo`, `publicacao` |
| `cor` | hex | `style="--c:…"` | cor do tipo; tinge ícone e etiqueta via `color-mix` |
| `temas` | string[] | `.doc-tag` | rótulos livres, alcançados pela busca |
| `formato` | string | `.doc-meta` | `PDF`, `DOCX`, `XLSX`, `Publicação` |
| `extensao` | string | `.doc-meta` | `68 páginas`, `18 cláusulas`, `4 abas` |
| `tamanho` | string | `.doc-meta` | `2,4 MB` |
| `ano` | int | `.doc-meta` | — |
| `sinopse` | string | `data-doc-sinopse` | texto do diálogo "Ler resumo" |
| `url_arquivo` | string | `a.doc-btn[href]` | presente nos documentos oficiais; os itens demonstrativos ainda abrem diálogo |
| `url_externa` | string | `a.doc-btn[href]` | só em `publicacao`; substitui as duas ações |

O resumo é lido do próprio card (`data-doc-sinopse`), não de um mapa no
JavaScript: acrescentar um documento no HTML não exige tocar em `biblioteca.js`.

O bloco **Documento em destaque** (`#doc-destaque`) é uma seleção editorial da
visão inicial e some assim que há busca ou filtro. O documento destacado também
está na listagem, então nenhuma busca deixa de encontrá-lo.

A seção **Legislação de referência** (`.normas-bloco`) é conteúdo fixo com cinco
links para o Planalto — não vem de API.

### 3.5 Pergunta frequente

Origem: `faq.html`, `<details class="faq-entry">`, agrupados em `<section class="faq-grupo">`.
São 30 perguntas distribuídas nas cinco categorias abaixo; o grupo é derivado da categoria.

| Campo | Tipo | Atributo | Domínio |
| --- | --- | --- | --- |
| `pergunta` | string | `<summary>` | — |
| `resposta` | string (HTML) | `.faq-answer p` | aceita links |
| `resumo` | string | `.faq-resumo` | teaser exibido com o card fechado |
| `icone` | string | `.faq-icone i` | classe do Font Awesome, um por pergunta |
| `relacionados` | link[] | `.faq-link` | rótulo, destino e indicação de link externo |
| `categoria` | enum | `data-faq-item` | `plataforma`, `criterios`, `aplicacao`, `comprovacao`, `suporte` |
| `ordem` | int | ordem no HTML | define a exibição dentro do grupo |

### 3.6 ODS

Origem: `ods.html`. **Dado de referência, não editável** — os 17 objetivos, títulos e
cores oficiais da ONU são fixos. O único campo dinâmico é a contagem de critérios
vinculados a cada objetivo.

### 3.7 Indicadores

Aparecem em `contratacoes.html`, `transparencia.html` e `ods.html`, no bloco
`.kpi-panel`. Cada indicador tem valor, rótulo e uma nota de apoio.

```json
{ "valor": "1.248", "rotulo": "Contratações com critérios", "nota": "+96 no último trimestre" }
```

---

## 4. Endpoints sugeridos

Contrato proposto, coerente com o exemplo já publicado em `/transparencia`.

```
GET /api/v1/criterios?categoria=&ods=&documento=&nivel=&area=&q=&pagina=&por_pagina=
GET /api/v1/criterios/{codigo}
GET /api/v1/contratacoes?categoria=&situacao=&orgao=&periodo=&q=&pagina=
GET /api/v1/contratacoes/{codigo}
GET /api/v1/glossario?categoria=&inicial=&q=
GET /api/v1/biblioteca?tipo=&q=
GET /api/v1/faq?categoria=&q=
GET /api/v1/ods
GET /api/v1/indicadores?escopo=contratacoes|transparencia|ods
```

Envelope sugerido para as listagens:

```json
{
  "total": 356,
  "pagina": 1,
  "por_pagina": 12,
  "total_paginas": 30,
  "itens": []
}
```

---

## 5. Onde plugar a API

Cada página de catálogo tem o mesmo desenho: um array de nós do DOM, um objeto `state`
com os filtros e uma função `apply()` que decide o que fica visível.

| Arquivo | Contêiner | Onde trocar |
| --- | --- | --- |
| `criterios.js` | `#criteria-grid` | `const cards = [...]` na linha 7 |
| `contratacoes.js` | `#contrato-grid` | `const cards = [...]` na linha 7 |
| `glossario.js` | `#term-grid` | `const terms = [...]` na linha 7 |
| `biblioteca.js` | `#doc-grid` | `const docs = [...]` na linha 7 |
| `faq.js` | `#faq-items` | `const entries = [...]` na linha 7 |

O caminho mais curto de integração, sem reescrever a lógica de filtro:

1. buscar os dados na API;
2. renderizar os cards no mesmo formato HTML atual, com os mesmos `data-*`;
3. reaproveitar `apply()` como está.

Se o volume crescer, mova a filtragem para o servidor e substitua `apply()` por uma
chamada com querystring — a estrutura de `state` já corresponde aos parâmetros sugeridos
na seção 4.

### Pontos que hoje abrem diálogo e precisarão de ação real

Todos usam `data-dialog` e estão mapeados em `main.js`, no objeto `DIALOGS`.

| `data-dialog` | Onde aparece | O que deve fazer |
| --- | --- | --- |
| `download` | Biblioteca, Transparência | Baixar o arquivo real |
| `dados` | Transparência | Gerar CSV/JSON/XLSX do conjunto |
| `dicionario` | Transparência | Abrir o dicionário de dados |
| `contato` | Várias | Formulário ou `mailto:` |
| `selo` | Menu e home | Liberar a área quando o catálogo existir |

---

## 6. Estados de interface a preservar

O protótipo já implementa três estados por catálogo. Mantenha-os ao integrar:

- **Vazio** — elemento `.criteria-empty` / `#doc-empty` / `#term-empty` / `#faq-empty`,
  exibido com a classe `show` quando nenhum registro atende aos filtros.
- **Contagem** — `#results-count`, `#doc-count`, `#term-count`, `#contrato-count`,
  `#faq-count` acompanham o número de itens visíveis.
- **Carregando** — **ainda não existe**. Será necessário ao introduzir chamadas
  assíncronas; sugerimos um esqueleto reaproveitando as medidas dos cards.

---

## 7. Convenções que valem manter

- **Busca sem acento.** Todas as páginas normalizam texto antes de comparar:
  ```js
  const strip = (t) => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  ```
  Ao migrar a busca para o banco, aplique a mesma regra (`unaccent` no Postgres).
- **Acessibilidade.** Link de salto, foco visível, `aria-label`, `aria-current` e
  acordeões nativos já estão implementados. Ao renderizar via JavaScript, preserve os
  atributos ARIA presentes no HTML atual.
- **Sem dependências.** O projeto não usa framework nem bundler. Se isso mudar, o
  `styles.css` pode ser aproveitado integralmente.
- **Ícones** vêm do Font Awesome 6.7.2 por CDN; as ilustrações são SVG próprios em
  `assets/`.

---

## 8. Pendências que não são de código

| Item | Responsável sugerido |
| --- | --- |
| Revisão jurídica das minutas de Termos, Privacidade e Ouvidoria | Área jurídica |
| Designação formal do Encarregado de dados (DPO) | Governança |
| Arquivos PDF da Biblioteca e conjuntos de dados abertos | Comunicação e dados |
| Auditoria de acessibilidade e avaliador oficial do eMAG | Governança digital |
| Domínio definitivo | Infraestrutura |

> Ao definir o domínio, atualize `sitemap.xml`, `robots.txt` e as tags `canonical`,
> `og:url` e `twitter:*` das 17 páginas. Hoje todas apontam para
> `https://sustentabilidade-neon.vercel.app`.

---

## 9. Verificações já realizadas

- As 17 páginas e a 404 respondem HTTP 200.
- As cinco entradas `data-dialog` do HTML correspondem 1:1 às entradas de `main.js`: nenhum
  gatilho órfão e nenhuma entrada ociosa.
- Nenhum link interno aponta para arquivo inexistente e não há `href="#"` no site.
- Todo `data-dialog` do HTML tem entrada correspondente em `main.js`.
- Filtros, buscas, ordenações e estados vazios testados no navegador em cada catálogo.
- Sem erros de console e sem rolagem horizontal de 390 px a 1440 px.
- Link de salto e foco visível verificados com navegação real por teclado.

Detalhamento em [`design-qa.md`](./design-qa.md).

---

_Última atualização: agosto de 2026._
