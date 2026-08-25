# Portal de Sustentabilidade

Protótipo funcional da Plataforma Estadual de Sustentabilidade em Contratações Públicas, em HTML semântico, CSS responsivo e JavaScript, sem etapa de build.

## Executar localmente

Não há dependências. Inicie qualquer servidor estático na raiz do projeto:

```bash
python3 -m http.server 4173
```

Depois acesse `http://localhost:4173`.

## Publicar na Vercel

Importe este repositório na Vercel. O projeto é estático e a configuração em `vercel.json` publica a raiz sem etapa de build.

## Escopo

Quatorze páginas funcionais, todas compartilhando `styles.css` e `main.js`:

| Página | Arquivo |
| --- | --- |
| Início | `index.html` |
| Critérios | `criterios.html` |
| Contratações | `contratacoes.html` |
| ODS | `ods.html` |
| Glossário | `glossario.html` |
| Biblioteca | `biblioteca.html` |
| Transparência | `transparencia.html` |
| Sobre | `sobre.html` |
| Perguntas frequentes | `faq.html` |
| Termos de Uso | `termos.html` |
| Política de Privacidade | `privacidade.html` |
| Acessibilidade | `acessibilidade.html` |
| Manual de Gestão Sustentável do TCESP | `manual-gestao-sustentavel-tcesp.html` |
| Cartilha de Contratações Sustentáveis da PGE-SP | `cartilha-contratacoes-sustentaveis-pge.html` |

- Navegação institucional com publicações técnicas do TCESP e da PGE-SP; Produtos com Selo Verde permanece sinalizado como "Em breve"
- Busca, filtros combináveis, ordenação e estados vazios em todos os catálogos
- Busca insensível a acentuação em todas as páginas
- Cada um dos 17 ODS possui card e link individual para a página oficial da ONU Brasil
- Link de salto e foco visível em todas as páginas
- Diálogos, feedbacks e navegação por teclado
- Layout responsivo para desktop e dispositivos móveis
- Metadados de compartilhamento (Open Graph e Twitter Card) com imagem própria
- `robots.txt`, `sitemap.xml`, favicon, manifest e página 404 institucional
- Sem autenticação, banco de dados ou APIs nesta fase

## Documentação

- [`HANDOFF.md`](./HANDOFF.md) — modelo de dados, endpoints sugeridos e pontos de integração para o time de backend
- [`design-qa.md`](./design-qa.md) — estado da implementação e verificações realizadas

## Nota para produção

Esta entrega é a **camada visual**. Todos os dados exibidos são demonstrativos e devem ser
substituídos pelas APIs reais, conforme o contrato descrito em [`HANDOFF.md`](./HANDOFF.md).
