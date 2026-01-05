/**
 * Модуль для работы с API шаблонов документов
 */

import { getApiBaseUrlValue } from './config.js';

/**
 * Загружает список всех шаблонов документов с пагинацией
 * @param {number} page - номер страницы
 * @param {Array<FilterDescriptor>|null} searchFilter - массив FilterDescriptor с критериями поиска (опционально)
 * @returns {Promise<Object>} объект с полями pageCount и documentTemplatePreview
 */
export async function loadDocumentTemplates(page = 1, searchFilter = null) {
    try {
        const requestBody = { page };
        
        // Если есть критерии поиска, добавляем searchFilter как массив
        if (searchFilter && Array.isArray(searchFilter) && searchFilter.length > 0) {
            requestBody.searchFilter = searchFilter;
        }

        const response = await fetch(`${getApiBaseUrlValue()}/document/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result; // { pageCount, documentTemplatePreview }
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
        const response = await fetch(`${getApiBaseUrlValue()}/document?id=${id}`, {
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

        const response = await fetch(`${getApiBaseUrlValue()}/document?templateName=${encodeURIComponent(templateName)}`, {
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
        const response = await fetch(`${getApiBaseUrlValue()}/document/download?id=${id}`, {
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
        const response = await fetch(`${getApiBaseUrlValue()}/document?id=${id}`, {
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

/**
 * Ищет шаблоны документов по строке поиска
 * @param {string} searchString - строка поиска
 * @returns {Promise<Object>} объект с полями pageCount и documentTemplatePreview
 */
export async function searchDocumentTemplates(searchString) {
    try {
        const encodedString = encodeURIComponent(searchString);
        const response = await fetch(`${getApiBaseUrlValue()}/document/search?str=${encodedString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result; // { pageCount, documentTemplatePreview }
    } catch (error) {
        console.error('Ошибка поиска шаблонов документов:', error);
        throw error;
    }
}

/**
 * Создает документы для выбранных пользователей
 * @param {Array<number>} userIds - массив ID пользователей
 * @param {number} documentId - ID шаблона документа
 * @returns {Promise<Blob>} архив с документами
 */
export async function makeDocuments(userIds, documentId) {
    try {
        const response = await fetch(`${getApiBaseUrlValue()}/operation/makeDocumet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userIds,
                documentId: documentId
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error('Ошибка создания документов:', error);
        throw error;
    }
}

