# Portal de Sustentabilidade

Protótipo funcional da Plataforma Estadual de Sustentabilidade em Contratações Públicas, baseado na referência visual fornecida pelo Governo do Estado de São Paulo.

## Executar localmente

Não há dependências. Inicie qualquer servidor estático na raiz do projeto:

```bash
python3 -m http.server 4173
```

Depois acesse `http://localhost:4173`.

## Publicar na Vercel

Importe este repositório na Vercel. O projeto é estático e a configuração em `vercel.json` publica a raiz sem etapa de build.

## Escopo

- Página inicial responsiva
- Busca e filtro demonstrativos
- Navegação e estados interativos de protótipo
- Sem autenticação, banco de dados ou APIs nesta fase
