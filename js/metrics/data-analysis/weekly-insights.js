// js/metrics/data-analysis/weekly-insights.js

import { getAllPageViewEvents, getAllClickEvents } from '../../core/data-store.js';
import { renderChart } from '../charts/render-chart.js';
import { aggregateViewsByDay, aggregateClicksByButton, aggregateByDevice, aggregateByCountry } from './data-helpers.js';

export function renderWeeklyInsights() {
    const pageViews = getAllPageViewEvents();
    const clicks = getAllClickEvents();

    const numDays = 7; // Últimos 7 dias

    // 1. Visualizações por Dia
    const dataViewsByDay = {
        labels: Array.from({ length: numDays }, (_, i) => `Dia ${i + 1}`),
        datasets: [{
            label: 'Visualizações',
            data: aggregateViewsByDay(pageViews, numDays),
            backgroundColor: '#60a5fa'
        }]
    };
    renderChart({
        canvasId: 'weekly-views-chart',
        data: dataViewsByDay,
        title: 'Visualizações Semanais',
        type: 'bar'
    });

    // 2. Cliques por Botões
    const clicksByButton = aggregateClicksByButton(clicks);
    const dataClicksButtons = {
        labels: Object.keys(clicksByButton),
        datasets: [{
            label: 'Cliques por Botão',
            data: Object.values(clicksByButton),
            backgroundColor: ['#f87171', '#fbbf24', '#34d399']
        }]
    };
    renderChart({
        canvasId: 'weekly-clicks-buttons-chart',
        data: dataClicksButtons,
        title: 'Cliques por Botões',
        type: 'pie'
    });

    // 3. Cliques por Dispositivos
    const clicksByDevice = aggregateByDevice(clicks);
    const dataClicksDevices = {
        labels: Object.keys(clicksByDevice),
        datasets: [{
            label: 'Cliques por Dispositivo',
            data: Object.values(clicksByDevice),
            backgroundColor: ['#c084fc', '#6ee7b7', '#f472b6']
        }]
    };
    renderChart({
        canvasId: 'weekly-clicks-devices-chart',
        data: dataClicksDevices,
        title: 'Cliques por Dispositivo',
        type: 'doughnut'
    });

    // 4. Visualizações por Dispositivos
    const viewsByDevice = aggregateByDevice(pageViews);
    const dataViewsDevices = {
        labels: Object.keys(viewsByDevice),
        datasets: [{
            label: 'Visualizações por Dispositivo',
            data: Object.values(viewsByDevice),
            backgroundColor: ['#a78bfa', '#34d399', '#fbbf24']
        }]
    };
    renderChart({
        canvasId: 'weekly-views-devices-chart',
        data: dataViewsDevices,
        title: 'Visualizações por Dispositivo',
        type: 'doughnut'
    });

    // 5. Cliques por País
    const clicksByCountry = aggregateByCountry(clicks);
    const dataClicksCountries = {
        labels: Object.keys(clicksByCountry),
        datasets: [{
            label: 'Cliques por País',
            data: Object.values(clicksByCountry),
            backgroundColor: ['#f87171', '#60a5fa', '#34d399']
        }]
    };
    renderChart({
        canvasId: 'weekly-clicks-countries-chart',
        data: dataClicksCountries,
        title: 'Cliques por País',
        type: 'bar'
    });

    // 6. Visualizações por País
    const viewsByCountry = aggregateByCountry(pageViews);
    const dataViewsCountries = {
        labels: Object.keys(viewsByCountry),
        datasets: [{
            label: 'Visualizações por País',
            data: Object.values(viewsByCountry),
            backgroundColor: ['#fbbf24', '#a78bfa', '#6ee7b7']
        }]
    };
    renderChart({
        canvasId: 'weekly-views-countries-chart',
        data: dataViewsCountries,
        title: 'Visualizações por País',
        type: 'bar'
    });
}
