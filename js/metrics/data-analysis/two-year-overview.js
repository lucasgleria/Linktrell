// js/metrics/data-analysis/two-year-overview.js

import { getAllPageViewEvents, getAllClickEvents, getEventsInTimeframe } from '../../core/data-store.js';
import { getStartOfYear, getEndOfYear } from '../../utils/date-utils.js';
import { renderChart } from '../charts/render-chart.js';
import { aggregateClicksByButton, aggregateByDevice, aggregateByCountry } from './data-helpers.js';

export function renderTwoYearOverview(year1, year2) {
    const startOfYear1 = getStartOfYear(new Date(year1, 0, 1));
    const endOfYear1 = getEndOfYear(startOfYear1);
    const startOfYear2 = getStartOfYear(new Date(year2, 0, 1));
    const endOfYear2 = getEndOfYear(startOfYear2);

    const allPageViews = getAllPageViewEvents();
    const allClicks = getAllClickEvents();

    const year1PageViews = getEventsInTimeframe(allPageViews, startOfYear1, endOfYear1);
    const year1Clicks = getEventsInTimeframe(allClicks, startOfYear1, endOfYear1);
    const year2PageViews = getEventsInTimeframe(allPageViews, startOfYear2, endOfYear2);
    const year2Clicks = getEventsInTimeframe(allClicks, startOfYear2, endOfYear2);

    const combinedViews = year1PageViews.concat(year2PageViews);
    const combinedClicks = year1Clicks.concat(year2Clicks);

    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    // 1. Visualizações por Mês
    const viewsByMonth1 = new Array(12).fill(0);
    const viewsByMonth2 = new Array(12).fill(0);
    year1PageViews.forEach(e => viewsByMonth1[new Date(e.timestamp).getMonth()]++);
    year2PageViews.forEach(e => viewsByMonth2[new Date(e.timestamp).getMonth()]++);

    const dataViewsByMonth = {
        labels: months,
        datasets: [{
            label: `Visualizações ${year1}`,
            data: viewsByMonth1,
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.2)',
            tension: 0.3
        }, {
            label: `Visualizações ${year2}`,
            data: viewsByMonth2,
            borderColor: '#f87171',
            backgroundColor: 'rgba(248, 113, 113, 0.2)',
            tension: 0.3
        }]
    };
    renderChart({
        canvasId: 'two-year-views-chart',
        data: dataViewsByMonth,
        title: `Visualizações - ${year1} vs ${year2}`,
        type: 'line'
    });

    // 2. Cliques por Botões
    const clicksByButton = aggregateClicksByButton(combinedClicks);
    const dataClicksButtons = {
        labels: Object.keys(clicksByButton),
        datasets: [{
            label: 'Cliques por Botão',
            data: Object.values(clicksByButton),
            backgroundColor: ['#f87171', '#fbbf24', '#34d399']
        }]
    };
    renderChart({
        canvasId: 'two-year-clicks-buttons-chart',
        data: dataClicksButtons,
        title: `Cliques por Botão - ${year1} vs ${year2}`,
        type: 'pie'
    });

    // 3. Cliques por Dispositivos
    const clicksByDevice = aggregateByDevice(combinedClicks);
    const dataClicksDevices = {
        labels: Object.keys(clicksByDevice),
        datasets: [{
            label: 'Cliques por Dispositivo',
            data: Object.values(clicksByDevice),
            backgroundColor: ['#c084fc', '#6ee7b7', '#f472b6']
        }]
    };
    renderChart({
        canvasId: 'two-year-clicks-devices-chart',
        data: dataClicksDevices,
        title: `Cliques por Dispositivo - ${year1} vs ${year2}`,
        type: 'doughnut'
    });

    // 4. Visualizações por Dispositivos
    const viewsByDevice = aggregateByDevice(combinedViews);
    const dataViewsDevices = {
        labels: Object.keys(viewsByDevice),
        datasets: [{
            label: 'Visualizações por Dispositivo',
            data: Object.values(viewsByDevice),
            backgroundColor: ['#a78bfa', '#34d399', '#fbbf24']
        }]
    };
    renderChart({
        canvasId: 'two-year-views-devices-chart',
        data: dataViewsDevices,
        title: `Visualizações por Dispositivo - ${year1} vs ${year2}`,
        type: 'doughnut'
    });

    // 5. Cliques por País
    const clicksByCountry = aggregateByCountry(combinedClicks);
    const dataClicksCountries = {
        labels: Object.keys(clicksByCountry),
        datasets: [{
            label: 'Cliques por País',
            data: Object.values(clicksByCountry),
            backgroundColor: ['#f87171', '#60a5fa', '#34d399']
        }]
    };
    renderChart({
        canvasId: 'two-year-clicks-countries-chart',
        data: dataClicksCountries,
        title: `Cliques por País - ${year1} vs ${year2}`,
        type: 'bar'
    });

    // 6. Visualizações por País
    const viewsByCountry = aggregateByCountry(combinedViews);
    const dataViewsCountries = {
        labels: Object.keys(viewsByCountry),
        datasets: [{
            label: 'Visualizações por País',
            data: Object.values(viewsByCountry),
            backgroundColor: ['#fbbf24', '#a78bfa', '#6ee7b7']
        }]
    };
    renderChart({
        canvasId: 'two-year-views-countries-chart',
        data: dataViewsCountries,
        title: `Visualizações por País - ${year1} vs ${year2}`,
        type: 'bar'
    });
}
