/* =========================================================================
   Contratações: busca, filtro por objeto contratual e por situação.
   ========================================================================= */

const contratoGrid = document.querySelector('#contrato-grid');
if (contratoGrid) {
  const cards = [...contratoGrid.querySelectorAll('.contrato-card')];
  const empty = document.querySelector('#contrato-empty');
  const countEl = document.querySelector('#contrato-count');
  const searchField = document.querySelector('#contratos-search');
  const form = document.querySelector('#contratos-form');
  const clearBtn = document.querySelector('#contratos-clear');
  const chips = [...document.querySelectorAll('.chip[data-contrato-category]')];
  const statusSelect = document.querySelector('#contrato-status');

  const state = { q: '', categoria: '', situacao: '' };
  const strip = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function apply() {
    let visible = 0;
    cards.forEach((card) => {
      const okCat = !state.categoria || card.dataset.contratoCategory === state.categoria;
      const okStatus = !state.situacao || card.dataset.contratoStatus === state.situacao;
      const okBusca = !state.q || strip(card.textContent).includes(strip(state.q));
      const ok = okCat && okStatus && okBusca;
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
      const value = chip.dataset.contratoCategory;
      state.categoria = value === 'todos' ? '' : value;
      apply();
    });
  });

  if (statusSelect) {
    statusSelect.addEventListener('change', () => {
      state.situacao = statusSelect.value;
      apply();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.q = '';
      state.categoria = '';
      state.situacao = '';
      if (searchField) searchField.value = '';
      if (statusSelect) statusSelect.value = '';
      chips.forEach((c) => c.classList.toggle('active', c.dataset.contratoCategory === 'todos'));
      apply();
    });
  }

  apply();
}
