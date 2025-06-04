// js/metrics/data-analysis/yearly-insights.js

import { getAllPageViewEvents, getAllClickEvents, getEventsInTimeframe } from '../../core/data-store.js';
import { getStartOfYear, getEndOfYear } from '../../utils/date-utils.js';
import { renderChart } from '../charts/render-chart.js';
import { aggregateViewsByDay, aggregateClicksByButton, aggregateByDevice, aggregateByCountry } from './data-helpers.js';

export function renderYearlyInsights(year) {
    const startOfYear = getStartOfYear(new Date(year, 0, 1));
    const endOfYear = getEndOfYear(startOfYear);

    const allPageViews = getAllPageViewEvents();
    const allClicks = getAllClickEvents();

    const pageViews = getEventsInTimeframe(allPageViews, startOfYear, endOfYear);
    const clicks = getEventsInTimeframe(allClicks, startOfYear, endOfYear);

    const numMonths = 12;

    // 1. Visualizações por Mês
    const viewsByMonth = new Array(numMonths).fill(0);
    pageViews.forEach(event => {
        const date = new Date(event.timestamp);
        viewsByMonth[date.getMonth()]++;
    });
    const dataViewsByMonth = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        datasets: [{
            label: 'Visualizações',
            data: viewsByMonth,
            backgroundColor: '#60a5fa'
        }]
    };
    renderChart({
        canvasId: 'yearly-views-chart',
        data: dataViewsByMonth,
        title: `Visualizações - ${year}`,
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
        canvasId: 'yearly-clicks-buttons-chart',
        data: dataClicksButtons,
        title: `Cliques por Botões - ${year}`,
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
        canvasId: 'yearly-clicks-devices-chart',
        data: dataClicksDevices,
        title: `Cliques por Dispositivo - ${year}`,
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
        canvasId: 'yearly-views-devices-chart',
        data: dataViewsDevices,
        title: `Visualizações por Dispositivo - ${year}`,
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
        canvasId: 'yearly-clicks-countries-chart',
        data: dataClicksCountries,
        title: `Cliques por País - ${year}`,
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
        canvasId: 'yearly-views-countries-chart',
        data: dataViewsCountries,
        title: `Visualizações por País - ${year}`,
        type: 'bar'
    });
}
