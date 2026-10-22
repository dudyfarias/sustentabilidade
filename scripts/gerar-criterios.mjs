import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Gera páginas estáticas; o site publicado continua sem etapa de build.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => fs.readFileSync(path.join(root, name), 'utf8');
const data = JSON.parse(read('data/criterios.json'));
const catalog = read('criterios.html');
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const header = catalog.match(/<header[\s\S]*?<\/header>/)[0].replace('class="active" aria-current="page"', 'class="active"');
const footer = catalog.match(/<footer[\s\S]*?<\/footer>/)[0];
const list = items => `<ul>${items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`;
const paragraphs = items => items.map(item => `<p>${escape(item)}</p>`).join('\n');
const section = (id, title, icon, content) => `<section class="criterion-section" id="${id}" aria-labelledby="${id}-titulo"><h2 id="${id}-titulo"><i class="fa-solid fa-${icon}" aria-hidden="true"></i> ${title}</h2>${content}</section>`;
const sourceList = sources => `<ul class="criterion-source-list">${sources.map(source => `<li><a href="${escape(source.url)}" target="_blank" rel="noopener noreferrer">${escape(source.title)} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i><span class="sr-only"> (abre em nova aba)</span></a><span>${escape(source.note)}</span></li>`).join('')}</ul>`;
const toc = [['identificacao','1. Identificação'],['base-normativa','2. Fundamentação legal'],['aplicacao','3. Aplicação na contratação'],['comprovacao','4. Cuidados e comprovação'],['referencias','5. Referências e materiais']];
const field = (id,title,content,wide=false) => `<div class="criterion-field${wide?' criterion-field-wide':''}" id="${id}" data-field="${title}"><h3>${title}</h3>${content}</div>`;
let changed = 0;
for (const criterion of data) {
  const c = criterion;
  const url = `https://sustentabilidade-neon.vercel.app/${c.slug}`;
  let head = catalog.slice(0, catalog.indexOf('<body>'));
  head = head.replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(c.title)} — Critérios de Sustentabilidade</title>`)
    .replaceAll('https://sustentabilidade-neon.vercel.app/criterios', url)
    .replaceAll('content="Critérios de Sustentabilidade"', `content="${escape(c.title)}"`)
    .replaceAll('Consulte critérios de sustentabilidade aplicáveis às contratações públicas estaduais de São Paulo.', escape(c.summary))
    .replace('styles.css?v=20260903-public-header', 'styles.css?v=20261022-criterios');
  const facts = [['Código',c.code],['Categoria',c.category],['Subcategoria',c.subcategory],['Tipo de documento',c.document],['Nível de aplicação',c.level],['Área temática',c.theme],['Última atualização','22/10/2026']];
  const ods = c.ods.map(n=>`<a href="https://brasil.un.org/pt-br/sdgs/${n}" target="_blank" rel="noopener noreferrer" aria-label="ODS ${n} no site da ONU Brasil (abre em nova aba)"><img src="assets/quick-access/ods-${n}.svg" width="96" height="96" alt="ODS ${n}" loading="lazy"></a>`).join('');
  const related = c.related.map(code => data.find(item=>item.code===code)).filter(Boolean);
  const content = `${head}<body class="criterion-page">
<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
${header}
<main id="conteudo">
  <div class="criterion-breadcrumb"><nav class="container breadcrumb" aria-label="Você está aqui"><a href="index.html">Início</a><span aria-hidden="true">›</span><a href="criterios.html">Critérios de Sustentabilidade</a><span aria-hidden="true">›</span><span aria-current="page">${escape(c.title)}</span></nav></div>
  <div class="container criterion-actions"><button class="btn btn-primary" type="button" id="copy-criterion"><i class="fa-solid fa-link" aria-hidden="true"></i> Copiar link do critério</button><button class="btn btn-secondary" type="button" id="print-criterion"><i class="fa-solid fa-print" aria-hidden="true"></i> Imprimir</button><span role="status" id="criterion-share-status" aria-live="polite"></span><input id="criterion-link-fallback" aria-label="Link do critério para copiar" readonly hidden></div>
  <div class="container criterion-layout">
    <article class="criterion-content" aria-labelledby="criterion-title">
      <div class="criterion-heading"><div class="criterion-illustration" aria-hidden="true"><i class="fa-solid fa-${escape(c.icon)}"></i></div><div><div class="criterion-kicker">${escape(c.theme)} <span>${escape(c.code)}</span></div><h1 id="criterion-title">${escape(c.title)}</h1><p class="criterion-summary">${escape(c.summary)}</p><div class="criterion-tags">${c.ods.map(n=>`<a href="ods.html">ODS ${n}</a>`).join('')}<span>${escape(c.scope)}</span></div></div></div>
      <p class="criterion-note"><strong>Critério de exemplo.</strong> ${escape(c.context)}</p>
      ${section('identificacao','1. Identificação do critério','file-lines',`<dl class="criterion-identification"><div data-field="Categoria"><dt>Categoria</dt><dd>${escape(c.category)}</dd></div><div data-field="Subcategoria"><dt>Subcategoria</dt><dd>${escape(c.subcategory)}</dd></div><div data-field="Critério"><dt>Critério</dt><dd>${escape(c.title)}</dd></div></dl><div class="criterion-fields">${field('descricao','Descrição Técnica (Base AGU)',paragraphs(c.description)+`<p class="criterion-field-note">Síntese adaptada para este exemplo, com apoio do Guia AGU (2025) e das fontes indicadas nesta ficha. ${escape(c.aguNote)} <a href="assets/documents/Guia_Nacional_Contratacoes_Sustentaveis_AGU_2025.pdf#page=${c.aguPage}" target="_blank" rel="noopener noreferrer">Consultar a base no Guia AGU<span class="sr-only"> (abre em nova aba)</span></a></p>`,true)}</div>`)}
      ${section('base-normativa','2. Fundamentação legal','scale-balanced',`<div class="criterion-fields">${field('base-federal','Base Legal Federal',sourceList(c.sources.filter(s=>s.title.startsWith('Lei nº')||s.title.startsWith('Decreto nº'))))}${field('pontos-federais','Principais Pontos da Legislação Federal',list(c.federalPoints))}${field('pontos-lei','Pontos Específicos Lei 14.133',list(c.lawPoints),true)}${c.sources.some(s=>!s.title.startsWith('Lei nº')&&!s.title.startsWith('Decreto nº'))?field('base-complementar','Normas estaduais e referências técnicas',sourceList(c.sources.filter(s=>!s.title.startsWith('Lei nº')&&!s.title.startsWith('Decreto nº'))),true):''}</div>`)}
      ${section('aplicacao','3. Aplicação na contratação','gears',`<div class="criterion-fields">${field('providencia','Providência a Ser Tomada',paragraphs(c.application))}${field('fase','Fase da Contratação',`<p>${escape(c.phase)}</p>`)}${field('clausulas','Cláusulas Necessárias',`<p>Definir no TR, no edital e no contrato, conforme o objeto e o enquadramento:</p>${list(c.clauses)}<div class="criterion-caution"><h4>Exemplo de redação — adaptar ao objeto</h4><blockquote class="criterion-example">${escape(c.example)}</blockquote><p class="criterion-example-footnote">Redação ilustrativa. Defina parâmetros, prazos, responsáveis e forma de verificação antes de utilizar.</p></div>`,true)}${field('orientacoes','Roteiro prático',`<ol class="criterion-steps">${c.steps.map(step=>`<li><h4>${escape(step.title)}</h4><p>${escape(step.text)}</p></li>`).join('')}</ol>`,true)}</div>`)}
      ${section('comprovacao','4. Cuidados e comprovação','file-circle-check',`<div class="criterion-fields">${field('precaucoes','Precauções e Observações',list(c.cautions))}${field('documentacao','Documentação Comprobatória',list(c.evidence))}${field('acompanhamento','Acompanhamento sugerido',list(c.metrics),true)}</div>`)}
      ${section('referencias','5. Referências e materiais relacionados','book-open',`<div class="criterion-fields">${field('referencias-complementares','Documentos de referência',sourceList(c.references)+`<a class="criterion-guide-link" href="assets/documents/Guia_Nacional_Contratacoes_Sustentaveis_AGU_2025.pdf#page=${c.aguPage}" target="_blank" rel="noopener noreferrer">Guia AGU (2025) — página ${c.aguPage}<span class="sr-only"> (abre em nova aba)</span></a>`)}${field('conteudos-relacionados','Conteúdos na plataforma',`<div class="criterion-terms"><a href="guia-nacional-contratacoes-sustentaveis-agu.html">Guia da AGU</a><a href="manual-gestao-sustentavel-tcesp.html">Manual do TCESP</a><a href="cartilha-contratacoes-sustentaveis-pge.html">Cartilha da PGE-SP</a><a href="cadernos-ods.html">Cadernos ODS</a></div>`)}</div><p class="criterion-reviewed">Referências consultadas em 22/10/2026. Síntese orientativa para este exemplo; a definição dos requisitos depende do objeto e da análise técnica e jurídica aplicável.</p>`)}
      <a class="criterion-back" href="criterios.html#${c.code.toLowerCase()}"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Voltar ao catálogo de critérios</a>
    </article>
    <aside class="criterion-sidebar" aria-label="Informações e navegação do critério">
      <section class="criterion-side-panel" data-field="ODS"><h2>ODS relacionados</h2><div class="criterion-ods">${ods}</div><p class="criterion-side-caption">Relação temática proposta neste exemplo.</p></section>
      <section class="criterion-side-panel"><h2>Informações do critério</h2><dl class="criterion-facts">${facts.map(([label,value])=>`<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join('')}</dl></section>
      <nav class="criterion-side-panel criterion-toc" aria-label="Nesta página"><h2>Nesta página</h2>${toc.map(([id,title])=>`<a href="#${id}">${title}</a>`).join('')}</nav>
      <section class="criterion-side-panel"><h2>Termos relacionados</h2><div class="criterion-terms">${c.terms.map(term=>`<a href="glossario.html#termo-${escape(term.id)}">${escape(term.title)}</a>`).join('')}</div></section>
      <section class="criterion-side-panel"><h2>Critérios relacionados</h2><div class="criterion-related">${related.map(item=>`<a href="${item.slug}.html"><span>${item.code}</span>${escape(item.title)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>`).join('')}</div></section>
    </aside>
  </div>
</main>
${footer}
<script src="criterio-detalhe.js"></script>
</body>
</html>
`;
  const output = path.join(root, `${c.slug}.html`);
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(output) || fs.readFileSync(output,'utf8')!==content) { console.error(`Desatualizada: ${c.slug}`); changed++; }
  } else { fs.writeFileSync(output, content); }
}
if (changed) process.exit(1);
console.log(`${data.length} fichas ${process.argv.includes('--check')?'conferidas':'geradas'}.`);
