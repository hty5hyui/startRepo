/**
 * Модуль для работы с API шаблонов документов
 */

import { API_BASE_URL } from './config.js';

/**
 * Загружает список всех шаблонов документов
 * @param {number} page - номер страницы
 * @returns {Promise<Array>} массив шаблонов документов
 */
export async function loadDocumentTemplates(page = 1) {
    try {
        const response = await fetch(`${API_BASE_URL}/document/all?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const templates = await response.json();
        return templates;
    } catch (error) {
        console.error('Ошибка загрузки шаблонов документов:', error);
        throw error;
    }
}

/**
 * Загружает PDF файл шаблона документа
 * @param {number} id - ID шаблона документа
 * @returns {Promise<Blob>} PDF файл
 */
export async function loadDocumentTemplatePdf(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/document?id=${id}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Ошибка загрузки PDF шаблона:', error);
        throw error;
    }
}

/**
 * Загружает шаблон документа на сервер
 * @param {File} file - файл шаблона (.doc или .docx)
 * @param {string} templateName - название шаблона
 * @returns {Promise<Response>}
 */
export async function uploadDocumentTemplate(file, templateName) {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/document?templateName=${encodeURIComponent(templateName)}`, {
            method: 'POST',
            body: formData
        });

        return response;
    } catch (error) {
        console.error('Ошибка загрузки шаблона:', error);
        throw error;
    }
}

/**
 * Удаляет шаблон документа (заглушка)
 * @param {number} id - ID шаблона документа
 * @returns {Promise<void>}
 */
export async function deleteDocumentTemplate(id) {
    // Заглушка - пока не реализовано
    console.log('Удаление шаблона с ID:', id);
    return Promise.resolve();
}

