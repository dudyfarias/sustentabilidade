/* =========================================================================
   Glossário: busca, filtro por categoria e por letra inicial, com
   agrupamento alfabético.
   ========================================================================= */

const termGrid = document.querySelector('#term-grid');
if (termGrid) {
  const grupos = [...termGrid.querySelectorAll('.letra-grupo')];
  const terms = [...termGrid.querySelectorAll('.termo-card')];
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
    let visiveis = 0;

    terms.forEach((card) => {
      const okCat = !state.categoria || card.dataset.termCategory === state.categoria;
      const okIni = !state.inicial || card.dataset.termInitial === state.inicial;
      const okBusca = !state.q || strip(card.textContent).includes(strip(state.q));
      const ok = okCat && okIni && okBusca;
      card.hidden = !ok;
      if (ok) visiveis += 1;
    });

    // A faixa da letra some junto quando nenhum termo dela permanece visível
    grupos.forEach((grupo) => {
      const temVisivel = [...grupo.querySelectorAll('.termo-card')].some((c) => !c.hidden);
      grupo.hidden = !temVisivel;
    });

    if (empty) empty.classList.toggle('show', visiveis === 0);
    if (countEl) countEl.textContent = String(visiveis);
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

      // Ao escolher uma letra, leva a leitura até a faixa correspondente
      if (state.inicial) {
        const alvo = document.querySelector('#letra-' + state.inicial);
        if (alvo && !alvo.hidden) alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
