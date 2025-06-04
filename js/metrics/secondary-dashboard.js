// js/metrics/secondary-dashboard.js
// Módulo responsável por renderizar os gráficos para as métricas secundárias (dispositivo e país).

import { getPageViewEvents } from '../core/page-tracker.js';
import { getClickEvents } from '../core/clicker-tracker.js';
import { enableChartExpansion } from '../utils/chart-expander.js';



let deviceChartInstance = null;
let countryChartInstance = null;

/**
 * Agrega eventos por uma chave específica (ex: tipo de dispositivo, país).
 * @param {Array<Object>} events - Array de eventos (visualizações ou cliques).
 * @param {string} key - A chave pela qual os eventos serão agregados (ex: 'deviceType', 'country').
 * @returns {Object} Um objeto com a contagem de eventos por valor da chave.
 */
function aggregateEventsByKey(events, key) {
    const counts = {};
    events.forEach(event => {
        const value = event[key] || 'Desconhecido';
        if (!counts[value]) {
            counts[value] = 0;
        }
        counts[value]++;
    });
    return counts;
}

/**
 * Renderiza o dashboard de métricas secundárias.
 */
export function renderSecondaryDashboard() {
    // --- Gráfico de Visualizações por Dispositivo ---
    const pageViewEvents = getPageViewEvents();
    const pageViewsByDevice = aggregateEventsByKey(pageViewEvents, 'deviceType');

    const deviceLabels = Object.keys(pageViewsByDevice);
    const deviceData = Object.values(pageViewsByDevice);

    const deviceCtx = document.getElementById('secondary-dashboard-chart-devices');
    if (deviceCtx) {
        if (deviceChartInstance) {
            deviceChartInstance.destroy();
        }
        deviceChartInstance = new Chart(deviceCtx, {
            type: 'bar', // Gráfico de barras para melhor comparação
            data: {
                labels: deviceLabels,
                datasets: [{
                    label: 'Visualizações por Dispositivo',
                    data: deviceData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)', // Vermelho
                        'rgba(54, 162, 235, 0.6)', // Azul
                        'rgba(255, 206, 86, 0.6)', // Amarelo
                        'rgba(75, 192, 192, 0.6)', // Verde
                        'rgba(153, 102, 255, 0.6)', // Roxo
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false // Não precisa de legenda se só tem um dataset
                    },
                    title: {
                        display: true,
                        text: 'Visualizações de Página por Tipo de Dispositivo'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Visualizações'
                        }
                    }
                }
            }
        });
        enableChartExpansion(document.getElementById('secondary-dashboard-chart-devices'), 'Dashboard Secundário - Dispositivos');
    } else {
        console.error('Canvas #secondary-dashboard-chart-devices não encontrado.');
    }

    // --- Gráfico de Visualizações por País ---
    const pageViewsByCountry = aggregateEventsByKey(pageViewEvents, 'country');
    const countryLabels = Object.keys(pageViewsByCountry);
    const countryData = Object.values(pageViewsByCountry);

    const countryCtx = document.getElementById('secondary-dashboard-chart-countries');
    if (countryCtx) {
        if (countryChartInstance) {
            countryChartInstance.destroy();
        }
        countryChartInstance = new Chart(countryCtx, {
            type: 'bar', // Gráfico de barras
            data: {
                labels: countryLabels,
                datasets: [{
                    label: 'Visualizações por País',
                    data: countryData,
                    backgroundColor: [
                        'rgba(255, 159, 64, 0.6)',  // Laranja
                        'rgba(75, 192, 192, 0.6)',  // Verde-água
                        'rgba(153, 102, 255, 0.6)', // Roxo
                        'rgba(201, 203, 207, 0.6)', // Cinza
                        'rgba(54, 162, 235, 0.6)',  // Azul
                    ],
                    borderColor: [
                        'rgba(255, 159, 64, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(201, 203, 207, 1)',
                        'rgba(54, 162, 235, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Visualizações de Página por País'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Número de Visualizações'
                        }
                    }
                }
            }
        });
        enableChartExpansion(document.getElementById('secondary-dashboard-chart-countries'), 'Dashboard Secundário - Países');
    } else {
        console.error('Canvas #secondary-dashboard-chart-countries não encontrado.');
    }
}
