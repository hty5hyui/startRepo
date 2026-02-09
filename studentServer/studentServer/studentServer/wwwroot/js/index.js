/**
 * Главный файл для страницы index.html
 */

import { AuthModal } from './auth.js';

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация модального окна авторизации
    new AuthModal();
});

