// js/metrics/dashboard.js
// Módulo responsável por renderizar o gráfico de dashboard (pizza de cliques).

import { getClickData } from '../core/clicker-tracker.js'; // Importa para obter dados de cliques
import { enableChartExpansion } from '../utils/chart-expander.js';



let chartInstance = null; // Mantém a instância do gráfico para destruí-lo antes de recriar

export function renderDashboard() {
  const ctx = document.getElementById('dashboard-chart').getContext('2d');
  const data = getClickData(); // Obtém os dados de cliques
  const labels = Object.keys(data);
  // Calcula a porcentagem de cliques. Certifique-se de que a soma total dos cliques seja usada para o cálculo.
  const totalClicks = Object.values(data).reduce((sum, count) => sum + count, 0);
  const values = labels.map(label => totalClicks > 0 ? ((data[label] / totalClicks) * 100).toFixed(2) : '0.00');
  
  if (chartInstance) {
    chartInstance.destroy(); // Destrói a instância anterior do gráfico
  }

  chartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Porcentagem de Cliques',
        data: values,
        backgroundColor: ['#f87171', '#fbbf24', '#34d399', '#60a5fa', '#c084fc', '#a78bfa', '#f472b6', '#6ee7b7'] // Cores para os segmentos
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom' // Posição da legenda
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.label || '';
              if (label) {
                label += ': ';
              }
              if (context.parsed !== null) {
                label += context.parsed + '%'; // Adiciona o símbolo de porcentagem ao tooltip
              }
              return label;
            }
          }
        }
      }
    }
  });
  enableChartExpansion(document.getElementById('dashboard-chart'), 'Dashboard Principal');

}

