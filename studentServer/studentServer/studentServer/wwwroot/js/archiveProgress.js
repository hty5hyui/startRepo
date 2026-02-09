/**
 * Скрипт для страницы прогресса формирования архива документов
 */

import { checkArchiveStatus, downloadArchive } from './apiDocument.js';

// Получаем ticketId из URL параметров
const urlParams = new URLSearchParams(window.location.search);
const ticketId = urlParams.get('ticketId');

// DOM элементы
const loadingSpinner = document.getElementById('loadingSpinner');
const progressText = document.getElementById('progressText');
const progressBar = document.getElementById('progressBar');
const errorMessage = document.getElementById('errorMessage');
const downloadBtn = document.getElementById('downloadBtn');
const statusMessage = document.getElementById('statusMessage');
const closeBtn = document.getElementById('closeBtn');

// Переменная для хранения интервала опроса
let statusCheckInterval = null;

/**
 * Обновляет отображение прогресса
 * @param {number} progress - процент выполнения (0-100)
 */
function updateProgress(progress) {
    const progressValue = Math.min(100, Math.max(0, progress));
    progressText.textContent = `${progressValue}%`;
    progressBar.style.width = `${progressValue}%`;
}

/**
 * Показывает сообщение об ошибке
 * @param {string} error - текст ошибки
 */
function showError(error) {
    errorMessage.textContent = error || 'Произошла неизвестная ошибка';
    errorMessage.classList.remove('hidden');
    loadingSpinner.classList.add('hidden');
    statusMessage.textContent = 'Произошла ошибка при формировании архива';
    closeBtn.classList.remove('hidden');
}

/**
 * Показывает кнопку скачивания и скрывает индикатор загрузки
 */
function showDownloadButton() {
    loadingSpinner.classList.add('hidden');
    downloadBtn.classList.remove('hidden');
    statusMessage.textContent = 'Архив успешно подготовлен! Нажмите кнопку для скачивания.';
    closeBtn.classList.remove('hidden');
    updateProgress(100);
}

/**
 * Проверяет статус формирования архива
 */
async function checkStatus() {
    if (!ticketId) {
        showError('Не указан идентификатор задачи (ticketId)');
        return;
    }

    try {
        const status = await checkArchiveStatus(ticketId);
        
        // Обновляем прогресс
        updateProgress(status.progress || 0);

        // Проверяем наличие ошибки
        if (status.error) {
            stopStatusCheck();
            showError(status.error);
            return;
        }

        // Если архив готов
        if (status.isReady) {
            stopStatusCheck();
            showDownloadButton();
            return;
        }

        // Если еще не готов, продолжаем опрос
        // (интервал уже запущен, просто продолжаем)
    } catch (error) {
        console.error('Ошибка проверки статуса:', error);
        stopStatusCheck();
        showError('Ошибка при проверке статуса формирования архива');
    }
}

/**
 * Останавливает периодическую проверку статуса
 */
function stopStatusCheck() {
    if (statusCheckInterval) {
        clearInterval(statusCheckInterval);
        statusCheckInterval = null;
    }
}

/**
 * Обработчик нажатия на кнопку скачивания
 */
async function handleDownload() {
    if (!ticketId) {
        showError('Не указан идентификатор задачи (ticketId)');
        return;
    }

    try {
        downloadBtn.disabled = true;
        downloadBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Скачивание...';
        
        await downloadArchive(ticketId);
        
        downloadBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Скачано';
        downloadBtn.classList.remove('bg-teal-600', 'hover:bg-teal-700');
        downloadBtn.classList.add('bg-green-600');
        statusMessage.textContent = 'Архив успешно скачан!';
        
        // Через 2 секунды можно закрыть окно
        setTimeout(() => {
            closeBtn.focus();
        }, 2000);
    } catch (error) {
        console.error('Ошибка скачивания:', error);
        showError('Ошибка при скачивании архива. Попробуйте еще раз.');
        downloadBtn.disabled = false;
        downloadBtn.innerHTML = '<i class="fas fa-download mr-2"></i>Скачать архив';
    }
}

/**
 * Обработчик закрытия окна
 */
function handleClose() {
    window.close();
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    if (!ticketId) {
        showError('Не указан идентификатор задачи (ticketId)');
        return;
    }

    // Назначаем обработчики событий
    downloadBtn.addEventListener('click', handleDownload);
    closeBtn.addEventListener('click', handleClose);

    // Запускаем первую проверку статуса сразу
    checkStatus();

    // Начинаем периодическую проверку статуса каждые 1 секунду
    statusCheckInterval = setInterval(checkStatus, 1000);

    // Очищаем интервал при закрытии страницы
    window.addEventListener('beforeunload', stopStatusCheck);
});

