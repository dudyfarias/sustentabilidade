/* =========================================================================
   Biblioteca: busca por texto, filtro por tipo de documento e ordenação.
   ========================================================================= */

const docGrid = document.querySelector('#doc-grid');
if (docGrid) {
  const docs = [...docGrid.querySelectorAll('.doc-card')];
  const empty = document.querySelector('#doc-empty');
  const countEl = document.querySelector('#doc-count');
  const destaque = document.querySelector('#doc-destaque');
  const searchField = document.querySelector('#biblioteca-search');
  const form = document.querySelector('#biblioteca-form');
  const clearBtn = document.querySelector('#biblioteca-clear');
  const sortSelect = document.querySelector('#doc-sort');
  const chips = [...document.querySelectorAll('.chip[data-doc-type]')];

  const state = { q: '', tipo: '' };
  const strip = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function apply() {
    let visible = 0;
    docs.forEach((card) => {
      const okTipo = !state.tipo || card.dataset.docType === state.tipo;
      const okBusca = !state.q || strip(card.textContent).includes(strip(state.q));
      const ok = okTipo && okBusca;
      card.hidden = !ok;
      if (ok) visible += 1;
    });

    // O destaque é uma seleção editorial da visão inicial: sai de cena assim
    // que o leitor busca ou filtra, para não competir com o resultado pedido.
    if (destaque) destaque.hidden = Boolean(state.q || state.tipo);

    if (empty) empty.classList.toggle('show', visible === 0);
    if (countEl) countEl.textContent = String(visible);
  }

  // O resumo vem do próprio card, não de um mapa fixo no main.js: acrescentar
  // um documento na página deixa de exigir alteração no JavaScript.
  docs.forEach((card) => {
    const botao = card.querySelector('[data-doc-resumo]');
    if (!botao || !card.dataset.docSinopse) return;
    botao.addEventListener('click', () => {
      showDialog(card.querySelector('h3').textContent, card.dataset.docSinopse);
    });
  });

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
      const value = chip.dataset.docType;
      state.tipo = value === 'todos' ? '' : value;
      apply();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.q = '';
      state.tipo = '';
      if (searchField) searchField.value = '';
      chips.forEach((c) => c.classList.toggle('active', c.dataset.docType === 'todos'));
      apply();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const mode = sortSelect.value;
      const sorted = [...docs].sort((a, b) => {
        if (mode === 'titulo') {
          return a.querySelector('h3').textContent
            .localeCompare(b.querySelector('h3').textContent, 'pt-BR');
        }
        return docs.indexOf(a) - docs.indexOf(b);
      });
      sorted.forEach((card) => docGrid.appendChild(card));
      if (empty) docGrid.appendChild(empty);
    });
  }

  apply();
}
