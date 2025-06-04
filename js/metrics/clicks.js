// js/metrics/clicks.js
// Módulo responsável por renderizar a contagem bruta de cliques.

import { getClickData } from '../core/clicker-tracker.js'; // Importa para obter dados de cliques

export function renderClicks() {
  const data = getClickData();
  const container = document.getElementById('metrics-display');

  // Adiciona um título para a seção de cliques brutos
  const title = document.createElement('h2');
  title.textContent = '📈 Cliques nos botões:';
  title.className = 'font-bold mt-4 text-gray-800';
  container.appendChild(title);

  if (Object.keys(data).length === 0) {
    const noClicksMessage = document.createElement('p');
    noClicksMessage.textContent = 'Nenhum clique registrado ainda.';
    noClicksMessage.className = 'text-gray-500 italic';
    container.appendChild(noClicksMessage);
  } else {
    for (const [label, count] of Object.entries(data)) {
      const p = document.createElement('p');
      p.textContent = `🔘 ${label}: ${count} cliques`;
      p.className = 'text-gray-700';
      container.appendChild(p);
    }
  }
}
