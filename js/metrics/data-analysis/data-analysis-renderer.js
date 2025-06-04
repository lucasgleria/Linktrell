// js/metrics/data-analysis/data-analysis-renderer.js

import { generateMonthOptions, generateYearOptions } from '../../utils/date-utils.js';
import { renderDailyInsights } from './daily-insights.js';
import { renderWeeklyInsights } from './weekly-insights.js';
import { renderHistoricalMonthlyInsights } from './historical-monthly-insights.js';
import { renderYearlyInsights } from './yearly-insights.js';
import { renderTwoYearOverview } from './two-year-overview.js';
import { renderTwoMonthOverview } from './two-month-overview.js';

function populateSelect(selectElement, options, defaultValue = '') {
    selectElement.innerHTML = '';
    options.forEach(optionData => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.textContent = optionData.text;
        if (optionData.value === defaultValue) {
            option.selected = true;
        }
        selectElement.appendChild(option);
    });
}

export function renderDataAnalysis() {
    console.log('[Data Analysis Renderer] Renderizando seção de Análise de Dados...');

    const historicalMonthSelect = document.getElementById('select-historical-month');
    if (historicalMonthSelect) {
        const monthOptions = generateMonthOptions(24);
        const today = new Date();
        const defaultMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const defaultValue = `${defaultMonth.getFullYear()}-${(defaultMonth.getMonth() + 1).toString().padStart(2, '0')}`;
        populateSelect(historicalMonthSelect, monthOptions, defaultValue);

        historicalMonthSelect.addEventListener('change', () => {
            console.log(`[Data Analysis Renderer] Mês histórico selecionado: ${historicalMonthSelect.value}`);
            if (typeof renderHistoricalMonthlyInsights === 'function') {
                renderHistoricalMonthlyInsights(historicalMonthSelect.value);
            }
        });

        if (typeof renderHistoricalMonthlyInsights === 'function') {
            renderHistoricalMonthlyInsights(defaultValue);
        }
    }

    const yearlySelect = document.getElementById('select-yearly');
    if (yearlySelect) {
        const yearOptions = generateYearOptions(5);
        const defaultYear = String(new Date().getFullYear() - 1);
        populateSelect(yearlySelect, yearOptions, defaultYear);

        yearlySelect.addEventListener('change', () => {
            console.log(`[Data Analysis Renderer] Ano selecionado: ${yearlySelect.value}`);
            if (typeof renderYearlyInsights === 'function') {
                renderYearlyInsights(yearlySelect.value);
            }
        });

        if (typeof renderYearlyInsights === 'function') {
            renderYearlyInsights(defaultYear);
        }
    }

    const twoYearSelect1 = document.getElementById('select-two-year-1');
    const twoYearSelect2 = document.getElementById('select-two-year-2');
    if (twoYearSelect1 && twoYearSelect2) {
        const yearOptions = generateYearOptions(10);
        const currentYear = new Date().getFullYear();
        const defaultYear1 = String(currentYear - 1);
        const defaultYear2 = String(currentYear);
        populateSelect(twoYearSelect1, yearOptions, defaultYear1);
        populateSelect(twoYearSelect2, yearOptions, defaultYear2);

        const renderComparison = () => {
            const year1 = parseInt(twoYearSelect1.value);
            const year2 = parseInt(twoYearSelect2.value);
            if (year1 === year2) {
                alert('Por favor, selecione anos diferentes para comparação');
                return;
            }
            const sortedYears = [year1, year2].sort((a, b) => a - b);
            if (typeof renderTwoYearOverview === 'function') {
                renderTwoYearOverview(sortedYears[0], sortedYears[1]);
            }
        };

        twoYearSelect1.addEventListener('change', renderComparison);
        twoYearSelect2.addEventListener('change', renderComparison);
        renderComparison();
    }

    // NOVO: Comparação de Dois Meses
    const twoMonthSelect1 = document.getElementById('select-two-month-1');
    const twoMonthSelect2 = document.getElementById('select-two-month-2');
    if (twoMonthSelect1 && twoMonthSelect2) {
        const monthOptions = generateMonthOptions(24);
        const today = new Date();
        const defaultMonth1 = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}`;
        const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const defaultMonth2 = `${prevMonth.getFullYear()}-${(prevMonth.getMonth() + 1).toString().padStart(2, '0')}`;

        populateSelect(twoMonthSelect1, monthOptions, defaultMonth1);
        populateSelect(twoMonthSelect2, monthOptions, defaultMonth2);

        const renderMonthComparison = () => {
            const month1 = twoMonthSelect1.value;
            const month2 = twoMonthSelect2.value;

            if (month1 === month2) {
                alert('Por favor, selecione meses diferentes para comparação');
                return;
            }

            const sortedMonths = [month1, month2].sort();
            if (typeof renderTwoMonthOverview === 'function') {
                renderTwoMonthOverview(sortedMonths[0], sortedMonths[1]);
            }
        };

        twoMonthSelect1.addEventListener('change', renderMonthComparison);
        twoMonthSelect2.addEventListener('change', renderMonthComparison);
        renderMonthComparison();
    }

    if (typeof renderDailyInsights === 'function') {
        renderDailyInsights();
    }
    if (typeof renderWeeklyInsights === 'function') {
        renderWeeklyInsights();
    }
}
