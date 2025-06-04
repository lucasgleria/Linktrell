// js/utils/chart-utils.js
export function generateChart(ctx, type, labels, data, title, options = {}) {
    return new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                backgroundColor: ['#4299E1', '#F6AD55', '#ECC94B', '#9F7AEA', '#ED8936', '#48BB78', '#667EEA', '#E53E3E'], // Cores padrão, podem ser sobrescritas
                borderColor: ['#3182CE', '#DD6B20', '#D69E2E', '#805AD5', '#C05621', '#38A169', '#5A67D8', '#C53030'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Importante para controlar o tamanho com a div pai
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: {
                        size: 16
                    }
                },
                legend: {
                    display: false // Oculta a legenda padrão se o título do dataset já for o suficiente
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            ...options // Mescla opções adicionais
        }
    });
}