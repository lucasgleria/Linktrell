// js/utils/date-utils.js

/**
 * Formata um objeto Date para uma string 'YYYY-MM-DD'.
 * @param {Date} date - O objeto Date a ser formatado.
 * @returns {string} A data formatada.
 */
export function formatDate(date) {
    if (!(date instanceof Date)) {
        console.warn('[Date Utils] formatDate: Input is not a Date object:', date);
        // Tenta converter se for um timestamp numérico
        if (typeof date === 'number') {
            date = new Date(date);
        } else {
            return 'Data Inválida';
        }
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * Retorna um objeto Date representando o início do dia da data fornecida.
 * @param {Date} date - O objeto Date de referência.
 * @returns {Date} Um novo objeto Date no início do dia.
 */
export function getStartOfDay(date) {
    const d = new Date(date); // Cria uma nova instância para não modificar o original
    d.setHours(0, 0, 0, 0);
    return d; // Retorna um objeto Date
}

/**
 * Retorna um objeto Date representando o fim do dia da data fornecida.
 * @param {Date} date - O objeto Date de referência.
 * @returns {Date} Um novo objeto Date no fim do dia.
 */
export function getEndOfDay(date) {
    const d = new Date(date); // Cria uma nova instância
    d.setHours(23, 59, 59, 999);
    return d; // Retorna um objeto Date
}

/**
 * Retorna um objeto Date representando o início da semana (domingo) da data fornecida.
 * @param {Date} date - O objeto Date de referência.
 * @returns {Date} Um novo objeto Date no início da semana.
 */
export function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const diff = d.getDate() - day; // calculate the start of the week
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Retorna um objeto Date representando o fim da semana (sábado) da data fornecida.
 * @param {Date} date - O objeto Date de referência.
 * @returns {Date} Um novo objeto Date no fim da semana.
 */
export function getEndOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const diff = d.getDate() + (6 - day); // calculate the end of the week
    d.setDate(diff);
    d.setHours(23, 59, 59, 999);
    return d;
}

/**
 * Retorna um objeto Date representando o início do mês da data fornecida.
 * @param {Date} date - O objeto Date de referência.
 * @returns {Date} Um novo objeto Date no início do mês.
 */
export function getStartOfMonth(date) {
    const d = new Date(date);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Retorna um objeto Date representando o fim do mês da data fornecida.
 * @param {Date} date - O objeto Date de referência.
 * @returns {Date} Um novo objeto Date no fim do mês.
 */
export function getEndOfMonth(date) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + 1, 0); // Define para o último dia do mês atual
    d.setHours(23, 59, 59, 999);
    return d;
}

/**
 * Retorna um objeto Date representando o início do ano da data fornecida.
 * @param {Date} date - O objeto Date de referência.
 * @returns {Date} Um novo objeto Date no início do ano.
 */
export function getStartOfYear(date) {
    const d = new Date(date);
    d.setMonth(0, 1); // Janeiro, dia 1
    d.setHours(0, 0, 0, 0);
    return d;
}

/**
 * Retorna um objeto Date representando o fim do ano da data fornecida.
 * @param {Date} date - O objeto Date de referência.
 * @returns {Date} Um novo objeto Date no fim do ano.
 */
export function getEndOfYear(date) {
    const d = new Date(date);
    d.setMonth(11, 31); // Dezembro, dia 31
    d.setHours(23, 59, 59, 999);
    return d;
}

/**
 * Gera opções de mês/ano para um seletor (dropdown).
 * @param {number} numberOfMonths - O número de meses a serem gerados no passado.
 * @returns {Array<Object>} Um array de objetos { value: 'YYYY-MM', text: 'Nome do Mês YYYY' }.
 */
export function generateMonthOptions(numberOfMonths) {
    const options = [];
    const today = new Date();
    for (let i = 0; i < numberOfMonths; i++) {
        const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const value = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
        const text = date.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
        options.push({ value, text: text.charAt(0).toUpperCase() + text.slice(1) }); // Capitaliza a primeira letra
    }
    return options;
}

/**
 * Gera opções de ano para um seletor (dropdown).
 * @param {number} numberOfYears - O número de anos a serem gerados (inclui o ano atual e anos anteriores).
 * @returns {Array<Object>} Um array de objetos { value: 'YYYY', text: 'YYYY' }.
 */
export function generateYearOptions(numberOfYears) {
    const options = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < numberOfYears; i++) {
        const year = currentYear - i;
        options.push({ value: String(year), text: String(year) });
    }
    return options;
}