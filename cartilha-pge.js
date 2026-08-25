(() => {
  const topics = {
    introducao: ['Introdução às Contratações Sustentáveis', 'A proposta mais vantajosa passa a considerar também custos ambientais, sociais e intergeracionais. A cartilha apresenta o poder de compra estatal como instrumento de desenvolvimento sustentável.'],
    ods: ['Objetivos de Desenvolvimento Sustentável', 'As compras públicas são relacionadas aos ODS 7, 8, 9, 10, 11, 12, 13, 15 e 16, articulando as dimensões econômica, social e ambiental da Agenda 2030.'],
    legislacao: ['Legislação e Normas Aplicáveis', 'A cartilha percorre a base constitucional e a evolução da Lei nº 12.349/2010 à Lei nº 14.133/2021, que reconhece o desenvolvimento sustentável como princípio e objetivo das licitações.'],
    ciclo: ['Ciclo de Vida do Produto', 'Desde o Estudo Técnico Preliminar, devem ser avaliados custos indiretos, consumo de energia e recursos naturais, impactos ambientais, logística reversa e reciclagem.'],
    obras: ['Obras e Serviços de Engenharia', 'O conteúdo detalha exigências relacionadas a resíduos, mitigação ambiental, consumo de energia e recursos, impacto de vizinhança, patrimônio cultural e acessibilidade.'],
    editais: ['Editais e Critérios de Julgamento', 'A cartilha mostra como considerar menor dispêndio total, custos ambientais, inclusão social e preferência por bens reciclados, recicláveis ou biodegradáveis.'],
    certificacoes: ['Certificações e Comprovações', 'São apresentados exemplos como ISO 14001, FSC, CERFLOR e TCO Certified, com orientação para comprovar requisitos sem comprometer a competitividade.'],
    controle: ['Órgãos de Controle e Boas Práticas', 'Orientações e precedentes do TCU, TCE-SP e TCM-SP ajudam a aplicar critérios ambientais, custo total de propriedade, PLS, capacitação e compras responsáveis.']
  };

  const pgeDialog = document.querySelector('#pge-topic-dialog');
  const pgeTitle = document.querySelector('#pge-dialog-title');
  const pgeCopy = document.querySelector('#pge-dialog-copy');
  const pgeIcon = document.querySelector('#pge-dialog-icon');

  document.querySelectorAll('[data-pge-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      const content = topics[button.dataset.pgeTopic];
      if (!content || !pgeDialog) return;
      pgeTitle.textContent = content[0];
      pgeCopy.textContent = content[1];
      pgeIcon.innerHTML = button.querySelector('.manual-topic-icon').innerHTML;
      pgeDialog.showModal();
    });
  });

  pgeDialog?.querySelector('.manual-dialog-close')?.addEventListener('click', () => pgeDialog.close());
  pgeDialog?.addEventListener('click', (event) => {
    if (event.target === pgeDialog) pgeDialog.close();
  });
})();
