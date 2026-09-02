# Imagens dos acessos rápidos — 02/09/2026

Referência visual: `PHOTO-2026-09-02-17-49-14.jpg`, fornecida pelo usuário.
Aplicação: três primeiros cards da navegação rápida de `index.html`.

## Arquivos e procedência

- `cadernos-ods-3d.webp`: 1024 × 891 px, aproximadamente 76 KiB. Ilustração gerada com ImageGen a partir da referência e das capas dos cadernos, em duas passadas; quatro volumes completos, em vermelho, laranja, verde e vermelho. Não substitui as capas documentais nem os leitores oficiais na página da coleção.
- `glossario-sustentabilidade.webp`: 1024 × 1024 px, aproximadamente 49 KiB. Ilustração gerada com ImageGen, com quatro peças em verde-sálvia claro, textos e símbolos incorporados à imagem.
- `ods-1.svg` a `ods-17.svg`: ícones oficiais em português, obtidos em 02/09/2026 da [ONU Brasil](https://brasil.un.org/pt-br/sdgs). Origem de cada arquivo: `https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/SDGs/pt-br/SDG-N.svg`, com N de 1 a 17. Arquivos preservados sem redesenho.
- `un-emblem.svg`: emblema vetorial obtido do [arquivo oficial](https://brasil.un.org/profiles/undg_country/themes/custom/undg/images/logo/un-logo.svg). A assinatura textual segue o padrão de emblema e texto separados empregado no site da ONU Brasil.

O mosaico preserva os 17 objetivos, em ordem numérica. A referência apresenta uma seleção menor e outra ordem; isso não foi reproduzido para evitar omissões. O uso das marcas não implica chancela da ONU ao portal; validar as [diretrizes institucionais de uso de logomarcas](https://brasil.un.org/pt-br/80916-uso-de-logomarcas-da-onu) antes de uma publicação oficial.

Os WebP têm fundo branco integrado por composição `multiply` à superfície do card, sem caixa, moldura ou sombra adicional de CSS. As sombras pertencem às próprias ilustrações. O site mantém os três links como controles HTML, com foco visível e área clicável sobre o card inteiro.

## Prompts finais de geração

### Cadernos ODS

Use case: product-mockup. Refine the book group image (input 1) to match composition of input 2 LEFT CARD. Change only book proportions and camera perspective. Keep exactly the same four recognizable cover designs, order red ODS1/orange ODS2/green ODS3/red ODS4 and clean white background. All FOUR books must be TALL and SLENDER, much more like slim brochures: increase their visual height by 35% while reducing each visible front width, with a more pronounced three-quarter view as input 2. Target group bounds x=100..1160 y=130..1110 on a square image around 1254px: group aspect about 1.15:1, books themselves visible front about 220px wide by 880px high. Straight upright side-by-side row, all four exact same height, slight angled front cover showing cream page edges on right. Show every full book including top and bottom with soft floor contact shadow, all sharp. Pure white background, no pedestal no environment no border no extra text. Preserve the actual cover artwork and short titles from input1; don't invent brands or São Paulo logos. Final image should look like the LEFT CARD group in input 2 with real 3D thickness, not four wide flat rectangles.

### Glossário de Sustentabilidade

Recriar apenas a ilustração do card direito da referência: quatro peças quadradas arredondadas sobrepostas em grade 2×2, brancas/verde-sálvia muito claro, espessura 3D discreta e sombras suaves, isoladas em fundo branco puro. Textos exatos em verde-floresta: Logística Reversa, Economia Circular, Ciclo de Vida, Eficiência Energética; ícones correspondentes de folha circular, setas circulares, folha circular e raio. Pequenos detalhes sálvia nos cantos, leve rotação alternada, todas as bordas visíveis. Sem card externo, selo, título da página ou outros objetos.

## Verificação

Comparação visual, responsividade, carregamento e cliques registrados em `design-qa.md`, seção de 02/09/2026. Este registro documenta a validação local anterior ao envio ao GitHub; não atesta uma publicação na Vercel.
