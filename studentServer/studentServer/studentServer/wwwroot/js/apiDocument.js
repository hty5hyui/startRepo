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
 * Скачивает файл шаблона документа
 * @param {number} id - ID шаблона документа
 * @returns {Promise<void>}
 */
export async function downloadDocumentTemplate(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/document/download?id=${id}`, {
            method: 'GET'
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('NotFound');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Получаем имя файла из заголовка Content-Disposition или используем дефолтное
        const contentDisposition = response.headers.get('Content-Disposition');
        let fileName = 'document';
        if (contentDisposition) {
            // Сначала проверяем RFC 5987 формат (filename*=UTF-8''...)
            const rfc5987Match = contentDisposition.match(/filename\*=UTF-8''([^;]+)/i);
            if (rfc5987Match && rfc5987Match[1]) {
                try {
                    fileName = decodeURIComponent(rfc5987Match[1]);
                } catch (e) {
                    // Если декодирование не удалось, пробуем другие форматы
                }
            } else {
                // Проверяем обычный формат filename="..." или filename=...
                const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (fileNameMatch && fileNameMatch[1]) {
                    fileName = fileNameMatch[1].replace(/['"]/g, '');
                    // Пробуем декодировать, если это URL-encoded строка
                    try {
                        fileName = decodeURIComponent(fileName);
                    } catch (e) {
                        // Если не удалось декодировать, оставляем как есть
                    }
                }
            }
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Ошибка скачивания шаблона:', error);
        throw error;
    }
}

/**
 * Удаляет шаблон документа
 * @param {number} id - ID шаблона документа
 * @returns {Promise<Response>}
 */
export async function deleteDocumentTemplate(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/document?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        return response;
    } catch (error) {
        console.error('Ошибка удаления шаблона:', error);
        throw error;
    }
}

