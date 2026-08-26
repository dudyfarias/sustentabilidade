(() => {
  const topics = {
    introducao: {
      title: 'Introdução',
      copy: 'A contratação pública pode funcionar como instrumento de transformação. Ao definir necessidades, requisitos e resultados esperados, o poder público influencia mercados, estimula inovação e amplia os benefícios sociais, ambientais e econômicos da despesa pública.'
    },
    'nova-lei': {
      title: 'A Nova Lei de Licitações',
      copy: 'A Lei nº 14.133/2021 aproxima planejamento, governança, transparência, gestão de riscos e eficiência. Esses elementos permitem considerar o desenvolvimento sustentável ao longo de todo o ciclo da contratação, da definição da necessidade à avaliação dos resultados.'
    },
    ods: {
      title: 'Objetivos de Desenvolvimento Sustentável',
      copy: 'Os Objetivos de Desenvolvimento Sustentável organizam compromissos globais em temas como inclusão, trabalho decente, inovação, cidades sustentáveis, consumo responsável, clima e instituições eficazes. A Agenda 2030 oferece uma linguagem comum para relacionar políticas públicas e resultados.'
    },
    conexoes: {
      title: 'Conexões entre a Lei e os ODS',
      copy: 'Princípios, objetivos e instrumentos da Lei nº 14.133/2021 podem ser analisados à luz dos ODS. Essa leitura ajuda a reconhecer como decisões de contratação contribuem para metas públicas mais amplas, sem afastar a legalidade, a competitividade e a busca pela proposta mais vantajosa.'
    },
    planejamento: {
      title: 'Planejamento da Contratação e ODS',
      copy: 'O planejamento é o momento de traduzir objetivos de sustentabilidade em requisitos proporcionais e verificáveis. Estudos técnicos preliminares, análise de riscos e definição de resultados permitem justificar escolhas e relacioná-las aos ODS pertinentes ao objeto.'
    },
    selecao: {
      title: 'Seleção e Critérios Sustentáveis',
      copy: 'Critérios de seleção e julgamento devem guardar relação com o objeto e oferecer parâmetros claros de comprovação. A abordagem sustentável considera desempenho, ciclo de vida, inclusão, eficiência e impactos, preservando a isonomia e a competitividade.'
    },
    execucao: {
      title: 'Execução e Gestão Sustentável',
      copy: 'Os compromissos previstos no planejamento precisam chegar à execução. Indicadores, responsabilidades, evidências e rotinas de fiscalização ajudam a acompanhar obrigações socioambientais e a corrigir desvios durante a vigência do contrato.'
    },
    impactos: {
      title: 'Impactos e Resultados',
      copy: 'A mensuração permite verificar se a contratação gerou o valor público esperado. Resultados econômicos, sociais, ambientais e institucionais podem ser acompanhados e relacionados aos ODS, apoiando aprendizado, transparência e melhoria contínua.'
    }
  };

  const dialog = document.querySelector('#lei-topic-dialog');
  const title = document.querySelector('#lei-dialog-title');
  const copy = document.querySelector('#lei-dialog-copy');
  const icon = document.querySelector('#lei-dialog-icon');

  document.querySelectorAll('[data-lei-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      const content = topics[button.dataset.leiTopic];
      if (!content || !dialog) return;

      title.textContent = content.title;
      copy.textContent = content.copy;
      icon.innerHTML = button.querySelector('.manual-topic-icon').innerHTML;
      dialog.showModal();
    });
  });

  dialog?.querySelector('.manual-dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
