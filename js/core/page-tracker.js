

// js/core/page-tracker.js
// Módulo responsável por rastrear visualizações de página no localStorage.

import { getDeviceType } from '../utils/device-detector.js'; // Importa o detector de dispositivo (se ainda usado diretamente)
import { getCurrentCountry } from '../utils/country-detector.js'; // ➡️ já criado!
import { savePageViewEvent } from '../core/data-store.js';

export const PAGE_VIEWS_TOTAL_KEY = 'pageViewsTotal'; // NOVO: Chave para armazenar a contagem TOTAL de visualizações (compatibilidade)
export const PAGE_VIEW_EVENTS_KEY = 'pageViewEvents'; // Chave para armazenar os eventos detalhados de visualização de página



// Registra evento de visualização de página ao carregar
document.addEventListener('DOMContentLoaded', function() {
    const pageViewEvent = {
        timestamp: new Date().toISOString(),
        device: getDeviceType(),
        country: getCurrentCountry()
    };

    savePageViewEvent(pageViewEvent);
});

/**
 * Obtém o número total de visualizações da página do localStorage.
 * Esta função agora soma o total a partir dos eventos detalhados ou usa a chave antiga.
 * @returns {number} O número total de visualizações da página.
 */
export function getPageViews() {
    // Opção 1: Somar a partir dos eventos detalhados para garantir consistência
    const events = getPageViewEvents();
    const totalViews = events.length;
    
    return totalViews;
}

/**
 * Obtém os eventos detalhados de visualização de página do localStorage.
 * Cada evento inclui timestamp, deviceType e country.
 * @returns {Array<Object>} Um array de objetos de eventos de visualização de página.
 */
export function getPageViewEvents() {
    const events = localStorage.getItem(PAGE_VIEW_EVENTS_KEY);
    const parsedEvents = events ? JSON.parse(events) : [];
    // Garante que o timestamp seja um número (ms desde epoch) para compatibilidade
    return parsedEvents.map(event => ({
        ...event,
        timestamp: typeof event.timestamp === 'string' ? new Date(event.timestamp).getTime() : event.timestamp
    }));
}

/**
 * Registra uma visualização de página com detalhes (URL, tipo de dispositivo, país).
 * Esta é a função principal para registrar novas visualizações.
 * @param {string} url - A URL da página visualizada.
 * @param {string} [deviceType='Unknown'] - O tipo de dispositivo do usuário.
 * @param {string} [country='Unknown'] - O país do usuário.
 */
export function trackPageView(url, deviceType = 'Unknown', country = 'Unknown') {
    const events = getPageViewEvents(); // Obtém a lista atual de eventos detalhados

    // Cria o novo evento detalhado
    const newEvent = {
        timestamp: Date.now(), // Timestamp em milissegundos
        url: url,
        deviceType: deviceType,
        country: country
    };
    events.push(newEvent); // Adiciona o novo evento à lista

    // Salva a lista atualizada de eventos detalhados no localStorage
    localStorage.setItem(PAGE_VIEW_EVENTS_KEY, JSON.stringify(events));
    console.log(`[Page Tracker] Nova visualização registrada:`, newEvent);
    console.log(`[Page Tracker] DEBUG: País armazenado no evento de visualização: ${newEvent.country}`); // Log de depuração

    // **Compatibilidade**: Atualiza a contagem total de visualizações para a chave antiga.
    // Isso garante que os dashboards antigos continuem funcionando.
    localStorage.setItem(PAGE_VIEWS_TOTAL_KEY, events.length.toString());

    // Dispara um evento customizado para notificar outros módulos (como o insights.js)
    window.dispatchEvent(new Event('localDataUpdated'));
}

/**
 * Reseta todos os dados de visualização de página (total e detalhados) no localStorage.
 */
export function resetPageViews() {
    localStorage.removeItem(PAGE_VIEW_EVENTS_KEY); // Limpa os eventos detalhados
    localStorage.removeItem(PAGE_VIEWS_TOTAL_KEY); // Limpa também a contagem total (compatibilidade)
    console.log('[Page Tracker] Todas as visualizações de página e eventos resetados.');
    // Dispara um evento para notificar a UI de que os dados foram resetados
    window.dispatchEvent(new Event('localDataUpdated'));
}