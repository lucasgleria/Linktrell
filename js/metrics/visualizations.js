// js/metrics/visualizations.js
// Módulo responsável por carregar e renderizar métricas gerais e de cliques.

import { getPageViews } from '../core/page-tracker.js'; // Importa a função para obter visualizações
import { getClickData } from '../core/clicker-tracker.js'; // Importa a função para obter dados de clique

/**
 * Renderiza as métricas principais (visualizações e CTR dos cliques) na interface.
 */
export function renderMetrics() {
    const views = getPageViews(); // Obtém as visualizações diretamente do page-tracker
    const clickData = getClickData(); // Obtém os dados de clique agregados

    const container = document.getElementById('metrics-display');
    if (!container) {
        console.error('Elemento #metrics-display não encontrado.');
        return;
    }
    container.innerHTML = ''; // Limpa o conteúdo anterior

    // Exibe o total de visualizações
    const viewsEl = document.createElement('p');
    viewsEl.textContent = `👀 Visualizações: ${views}`;
    viewsEl.className = 'text-gray-700';
    container.appendChild(viewsEl);
}
