// js/metrics/metrics-interface.js
// Módulo principal para inicialização e renderização de todas as métricas na página de insights.

// Importações de módulos de métricas existentes
import { renderMetrics } from './visualizations.js'; // Assumindo que esta é a função correta
import { renderClicks } from './clicks.js'; // Assumindo que esta é a função correta
import { renderDashboard } from './dashboard.js'; // Assumindo que esta é a função correta
import { renderSecondaryMetrics } from './secondary-metrics.js';
import { renderSecondaryDashboard } from './secondary-dashboard.js'; // Assumindo que esta é a função correta

// Importação do módulo de reset (com a função principal de reset)
import { initResetHandlers, resetAllData } from './reset-handlers.js'; // Importa a função initResetHandlers e resetAllData

// Importa as chaves de dados dos trackers para o listener 'storage' (usando as novas chaves refatoradas)
import { PAGE_VIEWS_TOTAL_KEY } from '../core/page-tracker.js'; // NOVO: Usando a chave correta e mais descritiva
import { PAGE_VIEW_EVENTS_KEY } from '../core/page-tracker.js'; // NOVO: Usando a chave correta e mais descritiva
import { CLICK_EVENTS_KEY } from '../core/clicker-tracker.js'; // Importa a chave de eventos de clique

// NOVO: Importa a função principal de renderização da nova seção de análise
import { renderDataAnalysis } from './data-analysis/data-analysis-renderer.js';

/**
 * Renderiza todas as seções de métricas na página.
 * Limpa os containers antes de re-renderizar para evitar duplicação.
 */
export function renderAllMetrics() { // Renomeado para 'renderAllMetrics' para ser mais descritivo
    console.log('[Metrics Interface] Renderizando todas as métricas...');

    // Limpa os containers para garantir que não haja elementos duplicados
    const metricsDisplayContainer = document.getElementById('metrics-display');
    if (metricsDisplayContainer) {
        metricsDisplayContainer.innerHTML = '';
    }
    const secondaryMetricsDisplayContainer = document.getElementById('secondary-metrics-display');
    if (secondaryMetricsDisplayContainer) {
        secondaryMetricsDisplayContainer.innerHTML = '';
    }
    // NOTA: A seção de 'data-analysis' não precisa ser limpa aqui, pois o data-analysis-renderer.js
    // já lida com a destruição e recriação de seus próprios elementos/gráficos internos.

    // Chama as funções de renderização para as métricas principais/antigas
    renderMetrics();
    renderClicks();
    renderDashboard();
    renderSecondaryMetrics();
    renderSecondaryDashboard();
    
    // Chama a função para renderizar a nova seção de Análise de Dados
    renderDataAnalysis(); 
}

/**
 * Inicia um timer para expirar a sessão após um período de inatividade.
 * Esta função foi restaurada e integrada.
 */
async function startSessionTimer() {
    const SESSION_DURATION = 10 * 60 * 1000; // 10 minutos
    setTimeout(async () => {
        const messageBox = document.createElement('div');
        messageBox.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        messageBox.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-xl text-center">
                <p class="text-xl font-bold mb-4">Sessão Expirada</p>
                <p class="text-gray-700 mb-6">Sua sessão expirou por inatividade. Por favor, faça login novamente.</p>
                <button id="close-message-box" class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">OK</button>
            </div>
        `;
        document.body.appendChild(messageBox);

        document.getElementById('close-message-box').addEventListener('click', async () => {
            messageBox.remove();
            try {
                // Modificado para usar o caminho relativo, se o backend for servido no mesmo domínio
                await fetch('/logout', { 
                    method: 'POST'
                });
            } catch (error) {
                console.error('Erro ao chamar logout do servidor no timer:', error);
            } finally {
                localStorage.removeItem('session'); // Assume que 'session' é a chave para o estado da sessão
                window.location.href = '/login.html'; // Redireciona para a página de login
            }
        });
    }, SESSION_DURATION);
}

/**
 * Inicializa os ouvintes de evento e a renderização inicial.
 */
function initializeMetricsPage() {
    console.log('[Metrics Interface] Inicializando página de métricas...');
    
    // Inicializa os handlers de reset para os botões existentes
    initResetHandlers(); 
    
    // Inicia o timer da sessão
    startSessionTimer();

    // Renderização inicial de todas as métricas e dashboards
    renderAllMetrics();

    // Listener para o evento 'localDataUpdated' (disparado pelos trackers refatorados)
    // Este é o método preferencial para atualização de UI.
    window.addEventListener('localDataUpdated', () => {
        console.log('[Metrics Interface] Evento customizado "localDataUpdated" detectado. Atualizando métricas...');
        renderAllMetrics(); // Re-renderiza tudo para refletir as mudanças
    });

    // Opcional: Listener para o evento 'storage' (para compatibilidade ou outras abas)
    // O evento 'storage' dispara se o localStorage for alterado por outra aba/janela.
    // O evento 'localDataUpdated' é para alterações na mesma aba.
    window.addEventListener('storage', (event) => {
        // Verifica se a chave alterada no localStorage é relevante para as métricas
        if (event.key === PAGE_VIEWS_TOTAL_KEY || event.key === PAGE_VIEW_EVENTS_KEY || event.key === CLICK_EVENTS_KEY) {
            console.log(`[Metrics Interface] Alteração detectada no localStorage para '${event.key}'. Re-renderizando métricas.`);
            renderAllMetrics();
        }
    });

    // Lógica para o botão de logout (se existir e for gerenciado aqui)
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                const response = await fetch('/logout', { // Usando caminho relativo
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await response.json();
                if (data.success) {
                    localStorage.removeItem('session'); // Limpa o localStorage da sessão
                    window.location.href = '/login.html'; // Redireciona
                } else {
                    alert('Falha ao fazer logout.');
                }
            } catch (error) {
                console.error('Erro ao fazer logout:', error);
                alert('Erro ao fazer logout.');
            }
        });
    }
}

// Inicializa a página de métricas quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', initializeMetricsPage);