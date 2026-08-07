/* =========================================================================
   FAQ: filtro por categoria e busca por palavra-chave, com agrupamento visual.
   ========================================================================= */

const faqList = document.querySelector('#faq-items');
if (faqList) {
  const grupos = [...faqList.querySelectorAll('.faq-grupo')];
  const entries = [...faqList.querySelectorAll('.faq-entry')];
  const empty = document.querySelector('#faq-empty');
  const countEl = document.querySelector('#faq-count');
  const searchField = document.querySelector('#faq-search');
  const form = document.querySelector('#faq-form');
  const clearBtn = document.querySelector('#faq-clear');
  const cats = [...document.querySelectorAll('.faq-cat')];

  const state = { q: '', categoria: '' };
  const strip = (text) => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  function apply() {
    let visiveis = 0;

    entries.forEach((entry) => {
      const okCat = !state.categoria || entry.dataset.faqItem === state.categoria;
      const okBusca = !state.q || strip(entry.textContent).includes(strip(state.q));
      const ok = okCat && okBusca;
      entry.hidden = !ok;
      if (ok) {
        visiveis += 1;
        // Com busca ativa, abre o que foi encontrado para a resposta ficar à vista
        if (state.q) entry.open = true;
      }
    });

    // Um grupo sem nenhuma pergunta visível some junto com seu cabeçalho
    grupos.forEach((grupo) => {
      const temVisivel = [...grupo.querySelectorAll('.faq-entry')].some((e) => !e.hidden);
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

  cats.forEach((cat) => {
    cat.addEventListener('click', () => {
      cats.forEach((c) => c.classList.remove('active'));
      cat.classList.add('active');
      const value = cat.dataset.faqCategory;
      state.categoria = value === 'todos' ? '' : value;
      apply();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      state.q = '';
      state.categoria = '';
      if (searchField) searchField.value = '';
      cats.forEach((c) => c.classList.toggle('active', c.dataset.faqCategory === 'todos'));
      entries.forEach((entry, i) => { entry.open = i === 0; });
      apply();
    });
  }

  apply();
}
