/**
 * Конфигурация API
 * Динамическое определение базового URL API без жестких привязок
 */

/**
 * Получает базовый URL API
 * Приоритет:
 * 1. Meta-тег с именем 'api-base-url' (если указан в HTML)
 * 2. Переменная окружения window.API_BASE_URL (если задана)
 * 3. Текущий origin (API на том же домене)
 * 
 * @returns {string} Базовый URL API
 */
export function getApiBaseUrl() {
    // 1. Проверяем meta-тег в HTML
    const metaTag = document.querySelector('meta[name="api-base-url"]');
    if (metaTag && metaTag.content && metaTag.content.trim()) {
        const url = metaTag.content.trim();
        // Убираем trailing slash если есть
        return url.endsWith('/') ? url.slice(0, -1) : url;
    }

    // 2. Проверяем глобальную переменную
    if (window.API_BASE_URL) {
        const url = window.API_BASE_URL.toString().trim();
        return url.endsWith('/') ? url.slice(0, -1) : url;
    }

    // 3. Используем текущий origin (API на том же домене)
    // Для кастомного порта или поддомена используйте meta-тег или переменную
    return window.location.origin;
}

/**
 * Экспортируем функцию для получения базового URL
 * Используем функцию вместо константы, чтобы URL вычислялся динамически
 */
export function getApiBaseUrlValue() {
    return getApiBaseUrl();
}

/**
 * Экспортируем базовый URL для обратной совместимости
 * ВАЖНО: Используйте getApiBaseUrlValue() для динамического получения URL
 */
export const API_BASE_URL = typeof document !== 'undefined' ? getApiBaseUrl() : '';

/**
 * Проверяет, доступен ли API
 * @returns {Promise<boolean>}
 */
export async function checkApiAvailability() {
    try {
        const response = await fetch(`${API_BASE_URL}/health`, {
            method: 'GET',
            // Не ждем ответа долго
            signal: AbortSignal.timeout(2000)
        });
        return response.ok;
    } catch (error) {
        console.warn('API health check failed:', error);
        return false;
    }
}

