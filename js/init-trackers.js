// js/init-trackers.js
// Este módulo é responsável por inicializar os rastreadores de página e cliques.

import { trackPageView } from './core/page-tracker.js';
import { initClickTracker, registerClick } from './core/clicker-tracker.js'; 
import { getDeviceType } from './utils/device-detector.js';

document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do rastreador de visualização de página
    const url = window.location.pathname;
    const deviceType = window.deviceType || getDeviceType();
    const country = window.userCountry || 'Unknown';
    trackPageView(url, deviceType, country);

    initClickTracker();

});