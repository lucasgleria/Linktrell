// Este script verifica se o usuário está autenticado
export function initSessionGuard() {
  if (localStorage.getItem('session') !== 'authenticated') {
    // Se não estiver autenticado, redireciona para a página de login
    window.location.href = 'login.html';
  }
}

// Inicializa a guarda de sessão imediatamente
initSessionGuard();
