# Portal de Sustentabilidade

Protótipo funcional da Plataforma Estadual de Sustentabilidade em Contratações Públicas, com composição visual idêntica à referência de 1024 × 1536 px e uma camada semântica interativa sobre os controles visíveis.

## Executar localmente

Não há dependências. Inicie qualquer servidor estático na raiz do projeto:

```bash
python3 -m http.server 4173
```

Depois acesse `http://localhost:4173`.

## Publicar na Vercel

Importe este repositório na Vercel. O projeto é estático e a configuração em `vercel.json` publica a raiz sem etapa de build.

## Escopo

- Reprodução visual pixel a pixel no viewport de referência (1024 px)
- Busca, filtros, navegação, ODS, critérios, documentos e FAQ interativos
- Diálogos, feedbacks e foco por teclado
- Sem autenticação, banco de dados ou APIs nesta fase

## Nota para produção

A composição integral da referência é proposital nesta fase para garantir fidelidade visual absoluta. Na implementação definitiva, a equipe deve reconstruir a camada visual em componentes responsivos usando os arquivos-fonte do design e conectar as APIs reais.
