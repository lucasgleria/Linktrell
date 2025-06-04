export function getCurrentCountry() {
    // Prioriza o país detectado pelo backend se estiver disponível
    if (typeof window !== 'undefined' && window.userCountry) {
        return window.userCountry;
    }
    // Fallback para navegador (menos confiável)
    try {
        const lang = navigator.language || navigator.userLanguage;
        return lang.slice(-2).toUpperCase();
    } catch {
        return 'Unknown'; // Padronizar para inglês
    }
}