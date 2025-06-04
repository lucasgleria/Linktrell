// js/metrics/charts/render-chart.js

import { enableChartExpansion } from '../../utils/chart-expander.js';

/**
 * Renderiza um gráfico genérico com Chart.js.
 * @param {string} canvasId - O ID do elemento <canvas>.
 * @param {Object} data - Dados para o gráfico.
 * @param {Object} options - Configurações adicionais do Chart.js.
 * @param {string} title - Título para o modal de expansão.
 * @param {string} type - Tipo do gráfico ('line', 'bar', 'pie', etc.).
 */
export function renderChart({ canvasId, data, options = {}, title, type = 'bar' }) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) {
        console.warn(`[renderChart] Canvas com ID "${canvasId}" não encontrado.`);
        return;
    }

    // Destruir gráfico existente se houver
    const existingChart = Chart.getChart(canvas);
    if (existingChart) {
        existingChart.destroy();
    }

    const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: title
            },
            legend: {
                position: 'bottom'
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    const mergedOptions = { ...defaultOptions, ...options };

    new Chart(canvas, {
        type,
        data,
        options: mergedOptions
    });

    enableChartExpansion(canvas, title);
}
