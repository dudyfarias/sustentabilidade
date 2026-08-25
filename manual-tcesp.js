const topics = {
  introducao: ['Introdução e sustentabilidade', 'O manual apresenta o papel indutor do poder público e propõe uma cultura institucional orientada por responsabilidade socioambiental e uso consciente dos recursos.'],
  fundamentacao: ['Fundamentação e referências', 'Reúne a base constitucional, legal e institucional que sustenta a adoção de práticas sustentáveis na Administração Pública.'],
  compras: ['Compras e contratações sustentáveis', 'Orienta a inclusão de critérios socioambientais nas aquisições e contratações, além do consumo racional de papel, água, energia e serviços.'],
  residuos: ['Prevenção e gestão de resíduos', 'Apresenta ações para reduzir descartáveis, modernizar impressões, destinar resíduos sólidos corretamente e recuperar bens ociosos.'],
  recursos: ['Uso eficiente de recursos', 'Define metas e indicadores para acompanhar o consumo de papel, água, energia e combustíveis, buscando reduzir desperdícios.'],
  construcoes: ['Construções sustentáveis', 'Propõe reduzir locações convencionais e priorizar instalações que incorporem eficiência, acessibilidade e menor impacto ambiental.'],
  servidores: ['Servidores e controle social', 'Trata da sensibilização contínua de servidores, da educação para a sustentabilidade e da participação social no acompanhamento da gestão pública.'],
  resultados: ['Indicadores e divulgação', 'Cada ação combina responsáveis, prazos, metas e indicadores; os resultados devem ser divulgados de forma transparente.']
};

const dialog = document.querySelector('#manual-topic-dialog');
const title = document.querySelector('#manual-dialog-title');
const copy = document.querySelector('#manual-dialog-copy');
const icon = document.querySelector('#manual-dialog-icon');

document.querySelectorAll('[data-topic]').forEach((button) => {
  button.addEventListener('click', () => {
    const content = topics[button.dataset.topic];
    if (!content || !dialog) return;
    title.textContent = content[0];
    copy.textContent = content[1];
    icon.innerHTML = button.querySelector('.manual-topic-icon').innerHTML;
    dialog.showModal();
  });
});

document.querySelector('.manual-dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
