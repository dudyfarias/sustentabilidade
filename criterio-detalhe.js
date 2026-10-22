/* Compartilhamento e impressão das fichas; a leitura independe de JavaScript. */
const copyButton = document.querySelector('#copy-criterion');
const shareStatus = document.querySelector('#criterion-share-status');
const fallbackLink = document.querySelector('#criterion-link-fallback');

copyButton?.addEventListener('click', async () => {
  const link = document.querySelector('link[rel="canonical"]').href;
  try {
    await navigator.clipboard.writeText(link);
    shareStatus.textContent = 'Link copiado.';
    fallbackLink.hidden = true;
  } catch {
    fallbackLink.value = link;
    fallbackLink.hidden = false;
    fallbackLink.focus();
    fallbackLink.select();
    shareStatus.textContent = 'Selecione e copie o link abaixo.';
  }
});

document.querySelector('#print-criterion')?.addEventListener('click', () => window.print());
