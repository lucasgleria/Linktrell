// js/core/clicker-tracker.js
// Módulo responsável por rastrear cliques em elementos no localStorage.

import { getDeviceType } from '../utils/device-detector.js';
import { getCurrentCountry } from '../utils/country-detector.js';

export const CLICK_DATA_KEY = 'clickData';
export const CLICK_EVENTS_KEY = 'clickEvents';

/**
 * Obtém os eventos detalhados de clique do localStorage.
 * Cada evento inclui label, timestamp, deviceType e country.
 * @returns {Array<Object>} Lista de eventos de clique.
 */
export function getClickEvents() {
  const events = localStorage.getItem(CLICK_EVENTS_KEY);
  // Converte o timestamp de ISO string para número se for a versão antiga
  const parsedEvents = events ? JSON.parse(events) : [];
  return parsedEvents.map(event => ({
    ...event,
    // Garante que o timestamp seja um número (ms desde epoch) para compatibilidade com Date.now()
    // Se for uma string ISO (versão antiga), converte. Caso contrário, mantém.
    timestamp: typeof event.timestamp === 'string' ? new Date(event.timestamp).getTime() : event.timestamp
  }));
}

/**
 * Obtém a contagem agregada de cliques.
 * Esta função agora sempre agrega a partir dos eventos detalhados.
 * @returns {Object} Um objeto com a contagem de cliques por label.
 */
export function getClickData() {
  const events = getClickEvents(); // Sempre agrega dos eventos detalhados
  const aggregatedData = {};
  events.forEach(event => {
    // Garante que a contagem seja para o label, como esperado pelos módulos antigos
    aggregatedData[event.label] = (aggregatedData[event.label] || 0) + 1;
  });
  return aggregatedData;
}

/**
 * Registra um clique em um elemento, capturando detalhes como timestamp, tipo de dispositivo e país.
 * Esta é a função principal para registrar novos cliques.
 * @param {string} label - O rótulo/identificador do botão clicado (data-track-click).
 * @param {string} [country='Unknown'] - O país de origem do clique (do backend).
 * @param {string} [deviceType='Unknown'] - O tipo de dispositivo do usuário (do backend).
 */
export function registerClick(label, country = 'Unknown', deviceType = 'Unknown') {
    const events = getClickEvents();
    
    // Debug: verifique os valores recebidos
    console.log('[DEBUG] registerClick params:', {label, country, deviceType});
    
    const newEvent = {
        timestamp: Date.now(),
        label: label,
        deviceType: deviceType, // Garanta que está usando deviceType
        country: country
    };
    
    events.push(newEvent);
    localStorage.setItem(CLICK_EVENTS_KEY, JSON.stringify(events));
    
    // Debug adicional
    console.log('[DEBUG] Evento armazenado:', newEvent);
    console.log('[DEBUG] Todos os eventos:', events);

  // **Compatibilidade**: Recalcula e salva os dados agregados para a chave antiga.
  // Isso garante que os dashboards antigos continuem funcionando.
  const aggregatedData = getClickData();
  localStorage.setItem(CLICK_DATA_KEY, JSON.stringify(aggregatedData));
  
  // Dispara um evento customizado para notificar outros módulos (como o insights.js)
  // que os dados locais foram atualizados. Isso é mais específico que 'storage'.
  window.dispatchEvent(new Event('localDataUpdated'));
}

/**
 * Inicializa os ouvintes de clique em elementos com 'data-track-click'.
 * @param {string} selector - Seletor CSS para os botões a serem rastreados.
 */
export function initClickTracker(selector = '[data-track-click]') {
    document.querySelectorAll(selector).forEach(button => {
        button.addEventListener('click', () => {
            const label = button.getAttribute('data-track-click') || button.textContent.trim();
            
            // Priorize window.deviceType, depois fallback para getDeviceType()
            const deviceType = window.deviceType || getDeviceType() || 'Unknown';
            const country = window.userCountry || 'Unknown';
            
            console.log('[DEBUG] Pré-registro - deviceType:', deviceType, 'country:', country);
            
            registerClick(label, country, deviceType);
        });
    });
}

/**
 * Reseta todos os dados de clique (agregados e detalhados) no localStorage.
 */
export function resetClickEvents() { // Renomeado de resetClickData para ser mais descritivo
  localStorage.removeItem(CLICK_EVENTS_KEY); // Limpa os eventos detalhados
  localStorage.removeItem(CLICK_DATA_KEY); // Limpa os dados agregados (compatibilidade)
  console.log('[Click Tracker] Todos os dados de clique e eventos resetados.');
  // Dispara um evento para notificar a UI de que os dados foram resetados
  window.dispatchEvent(new Event('localDataUpdated'));
}

// Inicializa o rastreador de cliques quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initClickTracker();
});