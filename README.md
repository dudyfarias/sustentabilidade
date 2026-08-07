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

Oito páginas funcionais, todas compartilhando `styles.css` e `main.js`:

| Página | Arquivo |
| --- | --- |
| Início | `index.html` |
| Critérios | `criterios.html` |
| Contratações | `contratacoes.html` |
| Glossário | `glossario.html` |
| Biblioteca | `biblioteca.html` |
| Transparência | `transparencia.html` |
| Sobre | `sobre.html` |
| Perguntas frequentes | `faq.html` |

- Navegação institucional de 9 itens, com TCE e PGE sinalizados como "Em breve"
- Busca, filtros combináveis, ordenação e estados vazios em todos os catálogos
- Busca insensível a acentuação em todas as páginas
- Cada um dos 17 ODS possui card e link individual para a página oficial da ONU Brasil
- Diálogos, feedbacks e navegação por teclado
- Layout responsivo para desktop e dispositivos móveis
- Sem autenticação, banco de dados ou APIs nesta fase

## Nota para produção

Na implementação definitiva, a equipe deve substituir os dados locais pelas APIs reais e trocar os recortes editoriais pelos arquivos-fonte do design quando estiverem disponíveis.
