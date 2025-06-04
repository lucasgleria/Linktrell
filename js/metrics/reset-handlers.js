// Importa a função principal de renderização de metrics-interface
// js/metrics/reset-handlers.js
// Módulo responsável por lidar com os eventos de reset e logout.

// Importa a função principal de renderização de metrics-interface (com o nome atualizado)
import { renderAllMetrics } from './metrics-interface.js';

// Importa as funções de reset específicas dos trackers (usando os nomes corretos)
import { resetClickEvents } from '../core/clicker-tracker.js'; // Nome correto para resetar eventos de clique
import { resetPageViews } from '../core/page-tracker.js';     // Nome correto para resetar visualizações de página

/**
 * Esta função é um utilitário interno para resetar todos os dados.
 * É chamada pelos event listeners dos botões de reset.
 */
export function resetAllData() { // Esta função pode ser exportada e chamada de outros lugares, se necessário
    console.log('[Reset Handlers] Resetando TODOS os dados...');
    resetClickEvents(); // Chama a função correta para resetar cliques
    resetPageViews();   // Chama a função correta para resetar visualizações
    renderAllMetrics(); // Re-renderiza todas as métricas após o reset completo
    alert('Todas as métricas foram resetadas!');
}

/**
 * Inicializa os ouvintes de evento para os botões de reset e logout.
 * Esta é a função principal a ser chamada para configurar os handlers.
 */
export function initResetHandlers() {
    console.log('[Reset Handlers] Inicializando handlers de reset e logout...');

    // Handler para o botão "Resetar Métricas" (total)
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (confirm('Tem certeza de que deseja resetar TODAS as métricas? Esta ação é irreversível.')) {
                resetAllData(); // Chama a função que reseta tudo
            }
        });
    } else {
        console.warn('[Reset Handlers] Botão #reset-button não encontrado.');
    }

    // Handler para o botão "Resetar Cliques" (específico)
    const resetClicksButton = document.getElementById('reset-clicks');
    if (resetClicksButton) {
        resetClicksButton.addEventListener('click', () => {
            if (confirm('Tem certeza de que deseja resetar APENAS os cliques? Esta ação é irreversível.')) {
                console.log("[Reset Handlers] Resetando dados de clique...");
                resetClickEvents(); // Chama a função correta para resetar APENAS cliques
                renderAllMetrics(); // Re-renderiza para atualizar a UI
                alert('Métricas de cliques resetadas!');
            }
        });
    } else {
        console.warn('[Reset Handlers] Botão #reset-clicks não encontrado.');
    }

    // Handler para o botão de "Logout"
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            console.log("[Reset Handlers] Fazendo logout...");
            try {
                // Usar caminho relativo é mais robusto para produção
                const response = await fetch('/logout', {
                    method: 'POST'
                });
                const result = await response.json();
                if (result.success) {
                    localStorage.removeItem('session'); // Limpa a sessão no frontend
                    window.location.href = '/login.html'; // Redireciona para a página de login
                } else {
                    console.error('Erro ao fazer logout:', result.message);
                    alert('Erro ao fazer logout: ' + result.message);
                }
            } catch (error) {
                console.error('Erro de rede ao fazer logout:', error);
                alert('Não foi possível conectar ao servidor para fazer logout.');
            }
        });
    } else {
        console.warn('[Reset Handlers] Botão #logout-button não encontrado.');
    }
}