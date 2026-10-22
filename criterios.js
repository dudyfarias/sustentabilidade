/* =========================================================================
   Catálogo de critérios: busca nas fichas, filtros combinados e ordenação.
   ========================================================================= */

const grid = document.querySelector('#criteria-grid');
if (grid) {
  const cards = [...grid.querySelectorAll('.criterio-card')];
  const empty = document.querySelector('#criteria-empty');
  const countEl = document.querySelector('#results-count');
  const searchField = document.querySelector('#catalogo-search');
  const catalogoForm = document.querySelector('#catalogo-form');
  const chips = [...document.querySelectorAll('.chip[data-category]')];
  const filterFields = [...document.querySelectorAll('[data-filter]')];
  const clearBtn = document.querySelector('#filters-clear');
  const collapseBtn = document.querySelector('#filters-collapse');
  const toggleBtn = document.querySelector('#filters-toggle');
  const filtersCard = document.querySelector('#filters-card');
  const sortSelect = document.querySelector('#sort-select');
  const filterSummary = document.querySelector('#criteria-filter-summary');

  const normalize = value => String(value ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\bart(?:igo)?\s*\.?\s*(\d+)/g, 'art $1')
    .replace(/\s+/g, ' ')
    .trim();
  const textOf = value => {
    if (Array.isArray(value)) return value.map(textOf).join(' ');
    if (value && typeof value === 'object') return Object.values(value).map(textOf).join(' ');
    return String(value ?? '');
  };

  let criteriaData = [];
  try {
    const parsed = JSON.parse(document.querySelector('#criteria-data')?.textContent || '[]');
    if (Array.isArray(parsed)) criteriaData = parsed;
  } catch {
    // Os cards e seus links continuam disponíveis se os dados não forem válidos.
  }
  const byCode = new Map(criteriaData.map(criterion => [normalize(criterion.code), criterion]));
  const records = new Map(cards.map(card => {
    const code = card.querySelector('.criterio-code')?.textContent || '';
    const criterion = byCode.get(normalize(code)) || {};
    const fields = {
      q: [code, card.textContent, criterion],
      criterio: [code, criterion.title],
      descricaoTecnica: [criterion.description, criterion.aguNote],
      pontosFederais: criterion.federalPoints,
      providencia: [criterion.application, criterion.steps],
      precaucoes: criterion.cautions,
      comprovacao: criterion.evidence,
      clausulas: [criterion.clauses, criterion.example],
      pontosLei: criterion.lawPoints
    };
    const text = Object.fromEntries(Object.entries(fields)
      .map(([key, value]) => [key, normalize(textOf(value))]));
    const federalUrls = (criterion.sources || [])
      .filter(source => /^(?:Lei|Decreto) nº/.test(source.title || ''))
      .map(source => source.url);
    return [card, { criterion, text, federalUrls }];
  }));
  const state = {
    q: searchField?.value.trim() || '', criterio: '', categoria: '', subcategoria: '', ods: '',
    fase: '', descricaoTecnica: '', baseFederal: '', pontosFederais: '',
    providencia: '', precaucoes: '', comprovacao: '', clausulas: '', pontosLei: '',
    documento: '', nivel: '', area: ''
  };
  filterFields.forEach(field => { state[field.dataset.filter] = field.value.trim(); });

  function matches(card) {
    const data = card.dataset;
    const { criterion, text, federalUrls } = records.get(card);

    if (state.categoria && data.category !== state.categoria) return false;
    if (state.subcategoria && normalize(criterion.subcategory) !== normalize(state.subcategoria)) return false;
    if (state.ods && !(criterion.ods || (data.ods || '').split(' ')).map(String).includes(state.ods)) return false;
    if (state.fase && !(criterion.phases || []).includes(state.fase)) return false;
    if (state.baseFederal && !federalUrls.includes(state.baseFederal)) return false;
    if (state.documento && !(data.documentos || data.documento || '').split('|').includes(state.documento)) return false;
    if (state.nivel && data.nivel !== state.nivel) return false;
    if (state.area && data.area !== state.area) return false;

    for (const key of Object.keys(text)) {
      if (state[key] && !text[key].includes(normalize(state[key]))) return false;
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
    if (countEl) countEl.textContent = String(visible);
    if (filterSummary) {
      const active = Object.values(state).filter(Boolean).length;
      filterSummary.textContent = active === 0 ? 'Nenhum filtro ativo.'
        : `${active} ${active === 1 ? 'filtro ativo' : 'filtros ativos'}.`;
    }
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

  /* Selects usam change; campos de texto atualizam a cada entrada. */
  filterFields.forEach((field) => {
    field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', () => {
      state[field.dataset.filter] = field.value.trim();
      if (field.dataset.filter === 'categoria') syncChips(field.value);
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
      filterFields.forEach((field) => { field.value = ''; });
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

  /* Os detalhes são páginas estáticas acessadas pelos links dos cards. */

  syncChips(state.categoria);
  apply();
}
