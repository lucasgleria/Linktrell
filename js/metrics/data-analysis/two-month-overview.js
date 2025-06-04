// js/metrics/data-analysis/two-month-overview.js

import { getAllPageViewEvents, getAllClickEvents, getEventsInTimeframe } from '../../core/data-store.js';
import { getStartOfMonth, getEndOfMonth } from '../../utils/date-utils.js';
import { renderChart } from '../charts/render-chart.js';
import { aggregateViewsByDay, aggregateClicksByButton, aggregateByDevice, aggregateByCountry } from './data-helpers.js';

export function renderTwoMonthOverview(month1, month2) {
    const [year1, m1] = month1.split('-').map(Number);
    const [year2, m2] = month2.split('-').map(Number);

    const startOfMonth1 = getStartOfMonth(new Date(year1, m1 - 1, 1));
    const endOfMonth1 = getEndOfMonth(startOfMonth1);
    const startOfMonth2 = getStartOfMonth(new Date(year2, m2 - 1, 1));
    const endOfMonth2 = getEndOfMonth(startOfMonth2);

    const allPageViews = getAllPageViewEvents();
    const allClicks = getAllClickEvents();

    const month1PageViews = getEventsInTimeframe(allPageViews, startOfMonth1, endOfMonth1);
    const month1Clicks = getEventsInTimeframe(allClicks, startOfMonth1, endOfMonth1);

    const month2PageViews = getEventsInTimeframe(allPageViews, startOfMonth2, endOfMonth2);
    const month2Clicks = getEventsInTimeframe(allClicks, startOfMonth2, endOfMonth2);

    const combinedViews = month1PageViews.concat(month2PageViews);
    const combinedClicks = month1Clicks.concat(month2Clicks);

    const numDays = Math.max(endOfMonth1.getDate(), endOfMonth2.getDate());

    // 1. Visualizações por Dia
    const dataViewsByDay = {
        labels: Array.from({ length: numDays }, (_, i) => `${i + 1}`),
        datasets: [{
            label: `Visualizações ${month1}`,
            data: aggregateViewsByDay(month1PageViews, numDays),
            borderColor: '#60a5fa',
            backgroundColor: 'rgba(96, 165, 250, 0.2)',
            tension: 0.3
        }, {
            label: `Visualizações ${month2}`,
            data: aggregateViewsByDay(month2PageViews, numDays),
            borderColor: '#f87171',
            backgroundColor: 'rgba(248, 113, 113, 0.2)',
            tension: 0.3
        }]
    };
    renderChart({
        canvasId: 'two-month-views-chart',
        data: dataViewsByDay,
        title: `Comparativo Visualizações - ${month1} vs ${month2}`,
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
        canvasId: 'two-month-clicks-buttons-chart',
        data: dataClicksButtons,
        title: `Cliques por Botão - ${month1} vs ${month2}`,
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
        canvasId: 'two-month-clicks-devices-chart',
        data: dataClicksDevices,
        title: `Cliques por Dispositivo - ${month1} vs ${month2}`,
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
        canvasId: 'two-month-views-devices-chart',
        data: dataViewsDevices,
        title: `Visualizações por Dispositivo - ${month1} vs ${month2}`,
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
        canvasId: 'two-month-clicks-countries-chart',
        data: dataClicksCountries,
        title: `Cliques por País - ${month1} vs ${month2}`,
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
        canvasId: 'two-month-views-countries-chart',
        data: dataViewsCountries,
        title: `Visualizações por País - ${month1} vs ${month2}`,
        type: 'bar'
    });
}
