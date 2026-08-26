(() => {
  const topics = {
    introducao: {
      title: 'Introdução e Desenvolvimento Sustentável',
      copy: 'A 8ª edição oferece orientação e segurança jurídica aos gestores públicos e divide o conteúdo em uma Parte Geral e uma Parte Específica. O desenvolvimento sustentável envolve dimensões ambiental, social, econômica e cultural. O guia também aborda os ODS, a Comissão Nacional para os ODS e o ODS 18, adotado pelo Brasil para promover a igualdade étnico-racial.',
      page: 9,
      pages: 'páginas 9 a 12'
    },
    direitos: {
      title: 'Direitos Humanos, Diversidade e Inclusão',
      copy: 'As contratações públicas podem fomentar direitos humanos e remover barreiras de acesso. O guia destaca a obrigatoriedade da acessibilidade e recomenda previsões antidiscriminatórias em contratos de serviços com mão de obra e em locações com serviços associados, além de capacitação para atendimento respeitoso e inclusivo.',
      page: 13,
      pages: 'páginas 13 a 17'
    },
    integridade: {
      title: 'Integridade e Lei nº 14.133/2021',
      copy: 'O guia apresenta as hipóteses de implantação e comprovação de programas de integridade, incluindo contratações de grande vulto, critérios de desempate, sanções e reabilitação. A sustentabilidade é tratada como princípio e objetivo da Lei nº 14.133/2021, aplicável desde o planejamento até a execução e a destinação dos resíduos.',
      page: 18,
      pages: 'páginas 18 a 21'
    },
    planejamento: {
      title: 'Planejamento, ETP e PLS',
      copy: 'O Estudo Técnico Preliminar deve avaliar o problema, a solução, os riscos, os critérios de sustentabilidade, os impactos ambientais e suas medidas mitigadoras. Também deve considerar baixo consumo de recursos e logística reversa. O Plano de Logística Sustentável orienta o Plano de Contratações Anual, o ETP e as especificações da contratação.',
      page: 22,
      pages: 'páginas 22 a 25'
    },
    aquisicoes: {
      title: 'Aquisições e Logística Reversa',
      copy: 'Os critérios devem aparecer no termo de referência, edital e contrato e estar diretamente relacionados ao objeto. O guia orienta a distinguir certificações obrigatórias das voluntárias, consultar normas específicas e justificar os casos em que o critério não seja aplicável. A edição inclui o Decreto nº 12.688/2025 sobre logística reversa de embalagens plásticas.',
      page: 26,
      pages: 'páginas 26 a 32'
    },
    engenharia: {
      title: 'Serviços, Obras e Engenharia',
      copy: 'Em serviços, os critérios podem integrar as obrigações da contratada, a especificação do objeto ou requisitos previstos em lei, sempre com mecanismos de fiscalização. Em obras e engenharia, o guia aborda iluminação e ventilação naturais, aproveitamento de água, acessibilidade, materiais locais, direitos dos trabalhadores, licenciamento ambiental e gestão de resíduos.',
      page: 32,
      pages: 'páginas 32 a 35'
    },
    preferencia: {
      title: 'Margens de Preferência e CICS',
      copy: 'O Decreto nº 11.890/2024 regulamenta margens de preferência e institui a CICS. Após regulamentação por resolução, a margem normal pode chegar a 10%, e a adicional para inovação nacional pode ser acumulada até o limite total de 20%. A CICS articula demanda estatal, sustentabilidade, inclusão, inovação e desenvolvimento industrial.',
      page: 36,
      pages: 'páginas 36 a 42'
    },
    tabelas: {
      title: 'Convênios e Tabelas por Objeto',
      copy: 'A sustentabilidade também incide sobre convênios, contratos de repasse, acordos de cooperação, termos de execução descentralizada e parcerias da Lei nº 13.019/2014. A Parte Específica reúne 43 tabelas com legislação, determinações, precauções e providências. O guia também explica que infrações ambientais especialmente graves podem levar à declaração de inidoneidade, observando o devido processo legal.',
      page: 43,
      pages: 'páginas 43 a 266'
    }
  };

  const guidePath = 'assets/documents/Guia_Nacional_Contratacoes_Sustentaveis_AGU_2025.pdf';
  const dialog = document.querySelector('#agu-topic-dialog');
  const title = document.querySelector('#agu-dialog-title');
  const copy = document.querySelector('#agu-dialog-copy');
  const icon = document.querySelector('#agu-dialog-icon');
  const link = document.querySelector('#agu-dialog-link');

  document.querySelectorAll('[data-agu-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      const content = topics[button.dataset.aguTopic];
      if (!content || !dialog) return;

      title.textContent = content.title;
      copy.textContent = content.copy;
      icon.innerHTML = button.querySelector('.manual-topic-icon').innerHTML;
      link.href = `${guidePath}#page=${content.page}`;
      link.childNodes[0].textContent = `Consultar ${content.pages} no guia `;
      dialog.showModal();
    });
  });

  dialog?.querySelector('.manual-dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
})();
