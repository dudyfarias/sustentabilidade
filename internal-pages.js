const search = document.querySelector('[data-catalog-search]');
const filter = document.querySelector('[data-catalog-filter]');
const cards = [...document.querySelectorAll('[data-catalog-card]')];
const count = document.querySelector('[data-result-count]');
const empty = document.querySelector('.empty');

function normalize(value=''){return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase()}
function updateCatalog(){
  if(!cards.length)return;
  const query=normalize(search?.value);
  const category=filter?.value||'todos';
  let visible=0;
  cards.forEach(card=>{
    const matchesText=normalize(card.textContent).includes(query);
    const matchesCategory=category==='todos'||card.dataset.category===category;
    card.classList.toggle('hidden',!(matchesText&&matchesCategory));
    if(matchesText&&matchesCategory)visible++;
  });
  if(count)count.textContent=`${visible} ${visible===1?'resultado':'resultados'} encontrados`;
  empty?.classList.toggle('show',visible===0);
}
search?.addEventListener('input',updateCatalog);filter?.addEventListener('change',updateCatalog);updateCatalog();

const dialog=document.querySelector('#content-dialog');
document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{
  dialog.querySelector('h2').textContent=button.dataset.title;
  dialog.querySelector('.dialog-body').innerHTML=button.dataset.detail;
  dialog.showModal();
}));
dialog?.querySelector('.dialog-close')?.addEventListener('click',()=>dialog.close());

const faqButtons=[...document.querySelectorAll('[data-faq-category]')];
const faqItems=[...document.querySelectorAll('[data-faq-item]')];
faqButtons.forEach(button=>button.addEventListener('click',()=>{
  faqButtons.forEach(item=>item.classList.toggle('active',item===button));
  faqItems.forEach(item=>item.classList.toggle('hidden',button.dataset.faqCategory!=='todos'&&item.dataset.faqItem!==button.dataset.faqCategory));
}));
