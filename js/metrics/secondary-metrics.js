// js/metrics/secondary-metrics.js
// Módulo responsável por renderizar as métricas secundárias (por dispositivo, por país).

import { getPageViewEvents } from '../core/page-tracker.js';
import { getClickEvents } from '../core/clicker-tracker.js';

/**
 * Agrega eventos por uma chave específica (ex: tipo de dispositivo, país).
 * @param {Array<Object>} events - Array de eventos (visualizações ou cliques).
 * @param {string} key - A chave pela qual os eventos serão agregados (ex: 'deviceType', 'country').
 * @returns {Object} Um objeto com a contagem de eventos por valor da chave.
 */
function aggregateEventsByKey(events, key) {
    const counts = {};
    events.forEach(event => {
        const value = event[key] || 'Desconhecido'; // Usa 'Desconhecido' se a chave não existir
        if (!counts[value]) {
            counts[value] = 0;
        }
        counts[value]++;
    });
    return counts;
}

/**
 * Renderiza a seção de Métricas Secundárias.
 */
export function renderSecondaryMetrics() {
    const container = document.getElementById('secondary-metrics-display');
    if (!container) {
        console.error('Elemento #secondary-metrics-display não encontrado.');
        return;
    }
    container.innerHTML = ''; // Limpa o conteúdo anterior

    // --- Métricas por Dispositivo (Visualizações) ---
    const pageViewEvents = getPageViewEvents();
    const pageViewsByDevice = aggregateEventsByKey(pageViewEvents, 'deviceType');

    const deviceViewsTitle = document.createElement('h3');
    deviceViewsTitle.textContent = 'Visualizações por Dispositivo:';
    deviceViewsTitle.className = 'font-bold mt-4 text-gray-800';
    container.appendChild(deviceViewsTitle);

    if (Object.keys(pageViewsByDevice).length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Nenhuma visualização registrada por dispositivo.';
        p.className = 'text-gray-500 italic';
        container.appendChild(p);
    } else {
        for (const [device, count] of Object.entries(pageViewsByDevice)) {
            const p = document.createElement('p');
            p.textContent = `💻 ${device}: ${count} visualizações`;
            p.className = 'text-gray-700';
            container.appendChild(p);
        }
    }

    // --- Métricas por Dispositivo (Cliques) ---
    const clickEvents = getClickEvents();
    const clicksByDevice = aggregateEventsByKey(clickEvents, 'deviceType');

    const deviceClicksTitle = document.createElement('h3');
    deviceClicksTitle.textContent = 'Cliques por Dispositivo:';
    deviceClicksTitle.className = 'font-bold mt-4 text-gray-800';
    container.appendChild(deviceClicksTitle);

    if (Object.keys(clicksByDevice).length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Nenhum clique registrado por dispositivo.';
        p.className = 'text-gray-500 italic';
        container.appendChild(p);
    } else {
        for (const [device, count] of Object.entries(clicksByDevice)) {
            const p = document.createElement('p');
            p.textContent = `🖱️ ${device}: ${count} cliques`;
            p.className = 'text-gray-700';
            container.appendChild(p);
        }
    }

    // --- Métricas por País (Visualizações) ---
    const pageViewsByCountry = aggregateEventsByKey(pageViewEvents, 'country');

    const countryViewsTitle = document.createElement('h3');
    countryViewsTitle.textContent = 'Visualizações por País:';
    countryViewsTitle.className = 'font-bold mt-4 text-gray-800';
    container.appendChild(countryViewsTitle);

    if (Object.keys(pageViewsByCountry).length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Nenhuma visualização registrada por país.';
        p.className = 'text-gray-500 italic';
        container.appendChild(p);
    } else {
        for (const [country, count] of Object.entries(pageViewsByCountry)) {
            const p = document.createElement('p');
            p.textContent = `🌍 ${country}: ${count} visualizações`;
            p.className = 'text-gray-700';
            container.appendChild(p);
        }
    }

    // --- Métricas por País (Cliques) ---
    const clicksByCountry = aggregateEventsByKey(clickEvents, 'country');

    const countryClicksTitle = document.createElement('h3');
    countryClicksTitle.textContent = 'Cliques por País:';
    countryClicksTitle.className = 'font-bold mt-4 text-gray-800';
    container.appendChild(countryClicksTitle);

    if (Object.keys(clicksByCountry).length === 0) {
        const p = document.createElement('p');
        p.textContent = 'Nenhum clique registrado por país.';
        p.className = 'text-gray-500 italic';
        container.appendChild(p);
    } else {
        for (const [country, count] of Object.entries(clicksByCountry)) {
            const p = document.createElement('p');
            p.textContent = `🎯 ${country}: ${count} cliques`;
            p.className = 'text-gray-700';
            container.appendChild(p);
        }
    }
}
