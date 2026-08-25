/* =========================================================================
   Comportamentos compartilhados: diálogos, busca da home e filtros da home.
   Seguro para incluir em qualquer página — todos os seletores são opcionais.
   ========================================================================= */

const dialog = document.querySelector('#site-dialog');
const dialogTitle = document.querySelector('#dialog-title');
const dialogCopy = document.querySelector('#dialog-copy');

function showDialog(title, copy) {
  if (!dialog) return;
  dialogTitle.textContent = title;
  dialogCopy.textContent = copy;
  dialog.showModal();
}

const DIALOGS = {
  about: {
    title: 'Sobre a plataforma',
    copy: 'A plataforma apoia gestores na aplicação de critérios sustentáveis em contratações públicas, reunindo indicadores, documentos e referências da Agenda 2030.'
  },
  selo: {
    title: 'Produtos com Selo Verde — Em breve',
    copy: 'A consulta a produtos certificados que atendem a critérios de sustentabilidade será disponibilizada em breve, com filtros por categoria e certificação.'
  },
  dados: {
    title: 'Download de dados abertos',
    copy: 'Os arquivos CSV, JSON e XLSX serão gerados dinamicamente quando a plataforma for integrada às bases oficiais. Enquanto isso, os conjuntos exibidos são demonstrativos.'
  },
  dicionario: {
    title: 'Dicionário de dados',
    copy: 'Cada conjunto será publicado com dicionário de dados descrevendo campos, tipos, domínios de valores e periodicidade de atualização, conforme a Política de Dados Abertos do Estado.'
  },
  categorias: {
    title: 'Mais categorias',
    copy: 'Além das categorias em destaque, o catálogo cobre mobiliário, limpeza e higiene, saúde, eventos, comunicação e serviços continuados. A listagem completa será liberada com a integração ao catálogo oficial.'
  },
  download: {
    title: 'Download em preparação',
    copy: 'O arquivo definitivo será disponibilizado quando a biblioteca documental for integrada às fontes oficiais.'
  }
};

document.querySelectorAll('[data-dialog]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    const content = DIALOGS[trigger.dataset.dialog];
    if (!content) return;
    event.preventDefault();
    showDialog(content.title, content.copy);
  });
});

if (dialog) {
  const close = dialog.querySelector('.dialog-close');
  if (close) close.addEventListener('click', () => dialog.close());
}

/* ---------- Busca e filtros da página inicial ---------- */

const filterToggle = document.querySelector('#filter-toggle');
const filterPanel = document.querySelector('#filter-panel');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const searchStatus = document.querySelector('#search-status');

if (filterToggle && filterPanel) {
  filterToggle.addEventListener('click', () => {
    filterPanel.classList.toggle('open');
    filterToggle.setAttribute('aria-expanded', String(filterPanel.classList.contains('open')));
  });
}

function runSearch() {
  if (!searchInput || !searchStatus) return;
  const query = searchInput.value.trim();
  const filters = filterPanel
    ? [...filterPanel.querySelectorAll('input:checked')].map((item) => item.parentElement.textContent.trim())
    : [];
  searchStatus.textContent = query
    ? `Resultados demonstrativos para “${query}”${filters.length ? ` em ${filters.join(', ')}` : ''}.`
    : 'Digite um termo para pesquisar na plataforma.';
  searchStatus.classList.add('show');
  const destaques = document.querySelector('#destaques');
  if (destaques) destaques.scrollIntoView({ behavior: 'smooth' });
}

if (searchForm) {
  searchForm.addEventListener('submit', (event) => { event.preventDefault(); runSearch(); });
}
if (searchInput) {
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { event.preventDefault(); runSearch(); }
  });
}

document.querySelectorAll('.faq-item').forEach((item) => item.addEventListener('click', () => {
  showDialog(item.textContent.trim(), item.dataset.answer);
}));

