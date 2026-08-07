/* =========================================================================
   Glossário: busca, filtro por categoria e por letra inicial.
   ========================================================================= */

const termGrid = document.querySelector('#term-grid');
if (termGrid) {
  const terms = [...termGrid.querySelectorAll('.term-card')];
  const empty = document.querySelector('#term-empty');
  const countEl = document.querySelector('#term-count');
  const searchField = document.querySelector('#glossario-search');
  const form = document.querySelector('#glossario-form');
  const clearBtn = document.querySelector('#glossario-clear');
  const chips = [...document.querySelectorAll('.chip[data-term-category]')];
  const alphas = [...document.querySelectorAll('.alpha-btn')];

  const state = { q: '', categoria: '', inicial: '' };
  const strip = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function apply() {
    let visible = 0;
    terms.forEach((card) => {
      const okCat = !state.categoria || card.dataset.termCategory === state.categoria;
      const okIni = !state.inicial || card.dataset.termInitial === state.inicial;
      const okBusca = !state.q || strip(card.textContent).includes(strip(state.q));
      const ok = okCat && okIni && okBusca;
      card.hidden = !ok;
      if (ok) visible += 1;
    });
    if (empty) empty.classList.toggle('show', visible === 0);
    if (countEl) countEl.textContent = String(visible);
  }

  if (searchField) {
    searchField.addEventListener('input', () => {
      state.q = searchField.value.trim();
      apply();
    });
  }
  if (form) form.addEventListener('submit', (event) => event.preventDefault());

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const value = chip.dataset.termCategory;
      state.categoria = value === 'todas' ? '' : value;
      apply();
    });
  });

  alphas.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.disabled) return;
      alphas.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const value = btn.dataset.alpha;
      state.inicial = value === 'todas' ? '' : value;
      apply();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.q = '';
      state.categoria = '';
      state.inicial = '';
      if (searchField) searchField.value = '';
      chips.forEach((c) => c.classList.toggle('active', c.dataset.termCategory === 'todas'));
      alphas.forEach((b) => b.classList.toggle('active', b.dataset.alpha === 'todas'));
      apply();
    });
  }

  apply();
}
