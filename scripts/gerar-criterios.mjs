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
const toc = [['descricao','Descrição'],['aplicacao','Aplicação'],['orientacoes','Orientações'],['clausulas','Cláusulas a definir'],['comprovacao','Comprovação'],['exemplo','Exemplo de requisito'],['acompanhamento','Acompanhamento'],['base-normativa','Base normativa'],['referencias','Referências complementares']];
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
      ${section('descricao','Descrição','file-lines',paragraphs(c.description))}
      ${section('aplicacao','Aplicação na contratação','clipboard-check',`<h3>Fase da contratação</h3><p>${escape(c.phase)}</p><h3>Providências a tomar</h3>${paragraphs(c.application)}`)}
      ${section('orientacoes','Orientações','gears',`<ol class="criterion-steps">${c.steps.map(step=>`<li><h3>${escape(step.title)}</h3><p>${escape(step.text)}</p></li>`).join('')}</ol><div class="criterion-caution"><h3>Cuidados na aplicação</h3>${list(c.cautions)}</div>`)}
      ${section('clausulas','Cláusulas a definir','file-contract',`<p>Ao preparar o TR, o edital e o contrato, conforme o caso:</p>${list(c.clauses)}`)}
      ${section('comprovacao','Como comprovar','file-circle-check',list(c.evidence))}
      ${section('exemplo','Exemplo de requisito','pen-to-square',`<p class="criterion-example-label">Redação ilustrativa · adaptar ao objeto</p><blockquote class="criterion-example">${escape(c.example)}</blockquote><p class="criterion-example-footnote">Antes de usar, defina os parâmetros técnicos, os prazos, os responsáveis e a forma de verificação na contratação.</p>`)}
      ${section('acompanhamento','Como acompanhar o resultado','chart-line',`<p>Indicadores sugeridos para a fiscalização e a gestão do contrato:</p>${list(c.metrics)}`)}
      ${section('base-normativa','Base normativa','scale-balanced',sourceList(c.sources))}
      ${section('referencias','Referências complementares','book-open',sourceList(c.references)+`<div class="criterion-caution"><h3>Conteúdos na plataforma</h3><div class="criterion-terms"><a href="guia-nacional-contratacoes-sustentaveis-agu.html">Guia da AGU</a><a href="manual-gestao-sustentavel-tcesp.html">Manual do TCESP</a><a href="cartilha-contratacoes-sustentaveis-pge.html">Cartilha da PGE-SP</a><a href="cadernos-ods.html">Cadernos ODS</a></div></div><p class="criterion-reviewed">Referências consultadas em 22/10/2026. Síntese orientativa para este exemplo; a definição dos requisitos depende do objeto e da análise técnica e jurídica aplicável.</p>`)}
      <a class="criterion-back" href="criterios.html#${c.code.toLowerCase()}"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Voltar ao catálogo de critérios</a>
    </article>
    <aside class="criterion-sidebar" aria-label="Informações e navegação do critério">
      <section class="criterion-side-panel"><h2>Contribui para os ODS</h2><div class="criterion-ods">${ods}</div><p class="criterion-side-caption">Relação temática proposta neste exemplo.</p></section>
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
