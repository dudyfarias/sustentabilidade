/* =========================================================================
   Catálogo de critérios: busca, filtros, categorias, ordenação e paginação.
   ========================================================================= */

const grid = document.querySelector('#criteria-grid');
if (grid) {
  const cards = [...grid.querySelectorAll('.criterio-card')];
  const empty = document.querySelector('#criteria-empty');
  const countEl = document.querySelector('#results-count');
  const searchField = document.querySelector('#catalogo-search');
  const catalogoForm = document.querySelector('#catalogo-form');
  const chips = [...document.querySelectorAll('.chip[data-category]')];
  const selects = [...document.querySelectorAll('[data-filter]')];
  const clearBtn = document.querySelector('#filters-clear');
  const collapseBtn = document.querySelector('#filters-collapse');
  const toggleBtn = document.querySelector('#filters-toggle');
  const filtersCard = document.querySelector('#filters-card');
  const sortSelect = document.querySelector('#sort-select');

  const TOTAL_CADASTRADOS = 356;
  const state = { q: '', categoria: '', ods: '', documento: '', nivel: '', area: '' };

  const isFiltering = () =>
    Boolean(state.q || state.categoria || state.ods || state.documento || state.nivel || state.area);

  function matches(card) {
    const data = card.dataset;

    if (state.categoria && data.category !== state.categoria) return false;
    if (state.ods && !data.ods.split(' ').includes(state.ods)) return false;
    if (state.documento && data.documento !== state.documento) return false;
    if (state.nivel && data.nivel !== state.nivel) return false;
    if (state.area && data.area !== state.area) return false;

    if (state.q) {
      const strip = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (!strip(card.textContent).includes(strip(state.q))) return false;
    }

    return true;
  }

  function apply() {
    let visible = 0;
    cards.forEach((card) => {
      const ok = matches(card);
      card.hidden = !ok;
      if (ok) visible += 1;
    });

    if (empty) empty.classList.toggle('show', visible === 0);
    if (countEl) countEl.textContent = isFiltering() ? String(visible) : String(TOTAL_CADASTRADOS);
  }

  /* Busca */
  if (searchField) {
    searchField.addEventListener('input', () => {
      state.q = searchField.value.trim();
      apply();
    });
  }
  if (catalogoForm) {
    catalogoForm.addEventListener('submit', (event) => event.preventDefault());
  }

  /* Chips de categoria — sincronizados com o select "Categoria" */
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const value = chip.dataset.category;
      state.categoria = value === 'todos' ? '' : value;
      const categoriaSelect = document.querySelector('[data-filter="categoria"]');
      if (categoriaSelect) categoriaSelect.value = state.categoria;
      apply();
    });
  });

  /* Selects de filtro */
  selects.forEach((select) => {
    select.addEventListener('change', () => {
      state[select.dataset.filter] = select.value;
      if (select.dataset.filter === 'categoria') syncChips(select.value);
      apply();
    });
  });

  function syncChips(value) {
    const target = value || 'todos';
    chips.forEach((c) => c.classList.toggle('active', c.dataset.category === target));
  }

  /* Limpar filtros */
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      Object.keys(state).forEach((key) => { state[key] = ''; });
      selects.forEach((s) => { s.value = ''; });
      if (searchField) searchField.value = '';
      syncChips('');
      apply();
    });
  }

  /* Recolher / expandir painel de filtros */
  function toggleFilters() {
    if (!filtersCard) return;
    const collapsed = filtersCard.classList.toggle('collapsed');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(!collapsed));
    if (collapseBtn) {
      collapseBtn.setAttribute('aria-label', collapsed ? 'Expandir filtros' : 'Recolher filtros');
    }
  }
  if (collapseBtn) collapseBtn.addEventListener('click', toggleFilters);
  if (toggleBtn) toggleBtn.addEventListener('click', toggleFilters);

  /* Ordenação */
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const mode = sortSelect.value;
      const sorted = [...cards].sort((a, b) => {
        if (mode === 'codigo') {
          return a.querySelector('.criterio-code').textContent
            .localeCompare(b.querySelector('.criterio-code').textContent, 'pt-BR');
        }
        if (mode === 'titulo') {
          return a.querySelector('h3').textContent
            .localeCompare(b.querySelector('h3').textContent, 'pt-BR');
        }
        return cards.indexOf(a) - cards.indexOf(b);
      });
      sorted.forEach((card) => grid.appendChild(card));
      if (empty) grid.appendChild(empty);
    });
  }

  /* Favoritar */
  document.querySelectorAll('.bookmark').forEach((btn) => {
    btn.addEventListener('click', () => {
      const saved = btn.classList.toggle('saved');
      const icon = btn.querySelector('i');
      icon.classList.toggle('fa-regular', !saved);
      icon.classList.toggle('fa-solid', saved);
      btn.setAttribute('aria-pressed', String(saved));
    });
  });

  /* Detalhe do critério */
  document.querySelectorAll('[data-detalhe]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const card = link.closest('.criterio-card');
      const code = card.querySelector('.criterio-code').textContent;
      const title = card.querySelector('h3').textContent;
      const desc = card.querySelector('p').textContent;
      const tags = [...card.querySelectorAll('.tag')].map((t) => t.textContent).join(' · ');
      if (typeof showDialog === 'function') {
        showDialog(`${code} — ${title}`, `${desc}\n\nRelacionado a: ${tags}`);
      }
    });
  });

  /* Paginação (demonstrativa) */
  const pageButtons = [...document.querySelectorAll('.page-btn')];
  const numberButtons = pageButtons.filter((b) => /^\d+$/.test(b.dataset.page));
  const prevBtn = document.querySelector('.page-btn[data-page="prev"]');
  const nextBtn = document.querySelector('.page-btn[data-page="next"]');
  const LAST_PAGE = 18;
  let current = 1;

  function setPage(page) {
    current = Math.min(Math.max(page, 1), LAST_PAGE);
    numberButtons.forEach((b) => {
      const active = Number(b.dataset.page) === current;
      b.classList.toggle('active', active);
      if (active) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
    if (prevBtn) prevBtn.disabled = current === 1;
    if (nextBtn) nextBtn.disabled = current === LAST_PAGE;
    grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  numberButtons.forEach((btn) => btn.addEventListener('click', () => setPage(Number(btn.dataset.page))));
  if (prevBtn) prevBtn.addEventListener('click', () => setPage(current - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => setPage(current + 1));

  apply();
}
