// js/metrics/data-analysis/data-helpers.js

/**
 * Agrega visualizações por dia.
 * @param {Array<Object>} events - Lista de eventos.
 * @param {number} numDays - Número de dias no período.
 * @returns {Array<number>} - Contagem de visualizações por dia.
 */
export function aggregateViewsByDay(events, numDays) {
    const counts = new Array(numDays).fill(0);
    events.forEach(event => {
        const date = new Date(event.timestamp);
        const day = date.getDate() - 1;
        counts[day]++;
    });
    return counts;
}

/**
 * Agrega cliques por botão.
 * @param {Array<Object>} events - Lista de eventos de clique.
 * @returns {Object} - { botão: contagem }
 */
export function aggregateClicksByButton(events) {
    const counts = {};
    events.forEach(event => {
        const btn = event.label || 'desconhecido';
        counts[btn] = (counts[btn] || 0) + 1;
    });
    return counts;
}

/**
 * Agrega eventos por dispositivo.
 * @param {Array<Object>} events - Lista de eventos.
 * @returns {Object} - { dispositivo: contagem }
 */
export function aggregateByDevice(events) {
    const counts = {};
    events.forEach(event => {
        const device = event.deviceType || 'desconhecido';
        counts[device] = (counts[device] || 0) + 1;
    });
    return counts;
}

/**
 * Agrega eventos por país.
 * @param {Array<Object>} events - Lista de eventos.
 * @returns {Object} - { país: contagem }
 */
export function aggregateByCountry(events) {
    const counts = {};
    events.forEach(event => {
        const country = event.country || 'desconhecido';
        counts[country] = (counts[country] || 0) + 1;
    });
    return counts;
}
