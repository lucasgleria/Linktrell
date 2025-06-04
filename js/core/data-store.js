// js/core/data-store.js

const PAGE_VIEW_EVENTS_KEY = 'pageViewEvents';
const CLICK_EVENTS_KEY = 'clickEvents';

function saveEvent(key, event) {
    const events = JSON.parse(localStorage.getItem(key)) || [];
    const sanitizedEvent = {
        timestamp: event.timestamp || new Date().toISOString(),
        deviceType: event.deviceTypeType || event.deviceType || 'Unknown', // Aceita ambos
        country: event.country || 'Unknown'
    };

    if (key === CLICK_EVENTS_KEY) {
        sanitizedEvent.label = event.label || 'Unknown'; // Mudei de 'button' para 'label'
    }

    events.push(sanitizedEvent);
    localStorage.setItem(key, JSON.stringify(events));
}

// ✅ Para salvar Page Views
export function savePageViewEvent(event) {
    saveEvent(PAGE_VIEW_EVENTS_KEY, event);
}

// ✅ Para salvar Cliques
export function saveClickEvent(event) {
    saveEvent(CLICK_EVENTS_KEY, event);
}

// ✅ Para obter Page Views
export function getAllPageViewEvents() {
    return JSON.parse(localStorage.getItem(PAGE_VIEW_EVENTS_KEY)) || [];
}

// ✅ Para obter Cliques
export function getAllClickEvents() {
    return JSON.parse(localStorage.getItem(CLICK_EVENTS_KEY)) || [];
}

// ✅ Para buscar eventos por intervalo
export function getEventsInTimeframe(events, startDate, endDate) {
    return events.filter(event => {
        const eventTime = new Date(event.timestamp);
        return eventTime >= startDate && eventTime <= endDate;
    });
}
