const filterToggle = document.querySelector('#filter-toggle');
const filterPanel = document.querySelector('#filter-panel');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchStatus = document.querySelector('#search-status');
const dialog = document.querySelector('#site-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogCopy = document.querySelector('#dialog-copy');

function showDialog(title, copy) {
  dialogTitle.textContent = title;
  dialogCopy.textContent = copy;
  dialog.showModal();
}

filterToggle.addEventListener('click', () => {
  filterPanel.classList.toggle('open');
  filterToggle.setAttribute('aria-expanded', String(filterPanel.classList.contains('open')));
});

function runSearch() {
  const query = searchInput.value.trim();
  const filters = [...filterPanel.querySelectorAll('input:checked')].map((item) => item.parentElement.textContent.trim());
  searchStatus.textContent = query
    ? `Resultados demonstrativos para “${query}”${filters.length ? ` em ${filters.join(', ')}` : ''}.`
    : 'Digite um termo para pesquisar na plataforma.';
  searchStatus.classList.add('show');
  document.querySelector('#destaques').scrollIntoView({ behavior: 'smooth' });
}

searchForm.addEventListener('submit', (event) => { event.preventDefault(); runSearch(); });
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') { event.preventDefault(); runSearch(); }
});

document.querySelector('[data-dialog="about"]').addEventListener('click', () => showDialog(
  'Sobre a plataforma',
  'A plataforma apoia gestores na aplicação de critérios sustentáveis em contratações públicas, reunindo indicadores, documentos e referências da Agenda 2030.'
));

document.querySelectorAll('.faq-item').forEach((item) => item.addEventListener('click', () => {
  showDialog(item.textContent.trim(), item.dataset.answer);
}));

document.querySelectorAll('.download').forEach((item) => item.addEventListener('click', () => {
  showDialog('Download demonstrativo', 'O arquivo estará disponível quando a biblioteca for conectada à API de documentos.')
}));

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
