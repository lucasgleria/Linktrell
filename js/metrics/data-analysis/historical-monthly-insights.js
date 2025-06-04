// js/metrics/data-analysis/historical-monthly-insights.js

import { getAllPageViewEvents, getAllClickEvents, getEventsInTimeframe } from '../../core/data-store.js';
import { getStartOfMonth, getEndOfMonth } from '../../utils/date-utils.js';
import { renderChart } from '../charts/render-chart.js';
import { aggregateViewsByDay, aggregateClicksByButton, aggregateByDevice, aggregateByCountry } from './data-helpers.js';

export function renderHistoricalMonthlyInsights(month) {
    const [year, m] = month.split('-').map(Number);
    const startOfMonth = getStartOfMonth(new Date(year, m - 1, 1));
    const endOfMonth = getEndOfMonth(startOfMonth);

    const allPageViews = getAllPageViewEvents();
    const allClicks = getAllClickEvents();

    const pageViews = getEventsInTimeframe(allPageViews, startOfMonth, endOfMonth);
    const clicks = getEventsInTimeframe(allClicks, startOfMonth, endOfMonth);

    const numDays = endOfMonth.getDate();

    // 1. Visualizações por Dia
    const dataViewsByDay = {
        labels: Array.from({ length: numDays }, (_, i) => `${i + 1}`),
        datasets: [{
            label: 'Visualizações',
            data: aggregateViewsByDay(pageViews, numDays),
            backgroundColor: '#60a5fa'
        }]
    };
    renderChart({
        canvasId: 'historical-views-chart',
        data: dataViewsByDay,
        title: `Visualizações - ${month}`,
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
        canvasId: 'historical-clicks-buttons-chart',
        data: dataClicksButtons,
        title: `Cliques por Botões - ${month}`,
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
        canvasId: 'historical-clicks-devices-chart',
        data: dataClicksDevices,
        title: `Cliques por Dispositivo - ${month}`,
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
        canvasId: 'historical-views-devices-chart',
        data: dataViewsDevices,
        title: `Visualizações por Dispositivo - ${month}`,
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
        canvasId: 'historical-clicks-countries-chart',
        data: dataClicksCountries,
        title: `Cliques por País - ${month}`,
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
        canvasId: 'historical-views-countries-chart',
        data: dataViewsCountries,
        title: `Visualizações por País - ${month}`,
        type: 'bar'
    });
}
