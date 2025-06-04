// js/utils/chart-expander.js

/**
 * Habilita a expansão de um gráfico ao clicar.
 * @param {HTMLCanvasElement} canvas - O canvas do gráfico original.
 * @param {string} titleText - O título a ser exibido no modal.
 */
export function enableChartExpansion(canvas, titleText) {
    const modal = document.getElementById('chart-modal');
    const expandedCanvas = document.getElementById('expanded-chart');
    const closeBtn = document.getElementById('close-chart-modal');

    if (!modal || !expandedCanvas || !closeBtn) {
        console.warn('[Chart Expander] Elementos do modal não encontrados.');
        return;
    }

    // Adiciona listener de expansão, evita múltiplos binds
    if (!canvas.dataset.listenerAdded) {
        canvas.addEventListener('click', () => {
            modal.classList.remove('hidden');

            setTimeout(() => {
                const existingChart = Chart.getChart(expandedCanvas);
                if (existingChart) {
                    existingChart.destroy();
                }

                const originalChart = Chart.getChart(canvas);
                if (!originalChart) {
                    console.warn('[Chart Expander] Nenhum gráfico associado ao canvas original.');
                    return;
                }

                new Chart(expandedCanvas, {
                    type: originalChart.config.type,
                    data: originalChart.data,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Número de Visualizações'
                                }
                            },
                            x: {
                                title: {
                                    display: true,
                                    text: 'Eixo X'
                                }
                            }
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: titleText
                            }
                        }
                    }
                });
            }, 100);
        });

        canvas.dataset.listenerAdded = 'true';
    }

    // Adiciona listener para fechar modal (uma vez)
    if (!closeBtn.dataset.listenerAdded) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        closeBtn.dataset.listenerAdded = 'true';
    }
}
