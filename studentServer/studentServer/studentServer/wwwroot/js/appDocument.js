/**
 * Главный файл приложения для работы с шаблонами документов
 */

import {
    openModal,
    closeModal,
    showSuccessMessage,
    showErrorMessage,
    disableButton,
    enableButton,
    getValue,
    clearForm,
    createDeleteModal
} from './utils.js';

import {
    loadDocumentTemplates,
    loadDocumentTemplatePdf,
    uploadDocumentTemplate,
    deleteDocumentTemplate,
    downloadDocumentTemplate
} from './apiDocument.js';

import { AuthModal } from './auth.js';

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация модального окна авторизации
    new AuthModal();

    // --- Переменные состояния ---
    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');
    let currentTemplateIdToDelete = null;
    let currentPage = 1;
    let pageCount = 1;
    let currentSearchFilter = null;

    // --- Поиск DOM-элементов ---

    // Модальное окно добавления шаблона
    const addTemplateBtn = document.getElementById('addTemplateBtn');
    const addTemplateModal = document.getElementById('addTemplateModal');
    const closeAddTemplateModalBtn = document.getElementById('closeAddTemplateModal');
    const cancelAddTemplateBtn = document.getElementById('cancelAddTemplateBtn');
    const addTemplateForm = document.getElementById('addTemplateForm');
    const submitAddTemplateBtn = document.getElementById('submitAddTemplateBtn');

    // Модальное окно удаления
    const deleteModal = createDeleteModal();
    // Обновляем текст сообщения для шаблонов документов
    const deleteModalMessage = deleteModal.querySelector('.mb-6 p');
    if (deleteModalMessage) {
        deleteModalMessage.textContent = 'Вы уверены, что хотите удалить этот шаблон документа? Это действие нельзя отменить.';
    }
    const closeDeleteModalBtn = deleteModal.querySelector('#closeDeleteModal');
    const cancelDeleteBtn = deleteModal.querySelector('#cancelDelete');
    const confirmDeleteBtn = deleteModal.querySelector('#confirmDelete');

    // Таблица
    const templatesTableBody = document.getElementById('templatesTableBody');
    const paginationContainer = document.getElementById('paginationContainer');

    // Поиск
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    // --- Обертки для функций с правильными параметрами ---
    const openModalWrapper = (modalElement) => openModal(modalElement, mainContent, header);
    const closeModalWrapper = (modalElement) => closeModal(modalElement, mainContent, header);

    /**
     * Форматирует дату для отображения
     * @param {string} dateString - строка даты в формате ISO
     * @returns {string} отформатированная дата
     */
    function formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Отображает шаблоны документов в таблице
     * @param {Array} templates - массив шаблонов
     */
    function renderTemplates(templates) {
        if (!templates || templates.length === 0) {
            templatesTableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="px-6 py-4 text-center text-gray-500">Нет шаблонов документов</td>
                </tr>
            `;
            return;
        }

        templatesTableBody.innerHTML = templates.map((template, index) => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${index + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${template.documentName || '-'}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${formatDate(template.createdAt)}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button class="download-template-btn text-blue-600 hover:text-blue-900 mr-4" data-template-id="${template.id}" title="Скачать">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="view-template-btn text-teal-600 hover:text-teal-900 mr-4" data-template-id="${template.id}" title="Просмотреть">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="delete-template-btn text-red-600 hover:text-red-900" data-template-id="${template.id}" title="Удалить">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Рендерит пагинацию
     * @param {number} currentPage - текущая страница
     * @param {number} pageCount - общее количество страниц
     * @param {Function} onPageChange - функция обработки изменения страницы
     */
    function renderPagination(currentPage, pageCount, onPageChange) {
        if (!paginationContainer) return;

        paginationContainer.innerHTML = `
            <div class="flex items-center justify-between px-6 py-3 bg-teal-50">
                <div class="flex items-center space-x-2">
                    <button 
                        id="prevPageBtn" 
                        class="px-4 py-2 border border-blue-300 text-sm rounded-md text-gray-700 bg-white hover:bg-blue-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                        ${currentPage === 1 ? 'disabled' : ''}
                    >
                        Назад
                    </button>
                    <span class="px-4 py-2 text-sm font-medium text-gray-700">
                        Страница ${currentPage} из ${pageCount}
                    </span>
                    <button 
                        id="nextPageBtn" 
                        class="px-4 py-2 border border-blue-300 text-sm rounded-md text-gray-700 bg-white hover:bg-blue-50 ${currentPage === pageCount ? 'opacity-50 cursor-not-allowed' : ''}"
                        ${currentPage === pageCount ? 'disabled' : ''}
                    >
                        Вперед
                    </button>
                </div>
            </div>
        `;

        const prevBtn = paginationContainer.querySelector('#prevPageBtn');
        const nextBtn = paginationContainer.querySelector('#nextPageBtn');

        if (prevBtn && currentPage > 1) {
            prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
        }

        if (nextBtn && currentPage < pageCount) {
            nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
        }
    }

    /**
     * Обработчик изменения страницы
     * @param {number} page - номер страницы
     */
    function handlePageChange(page) {
        loadTemplates(page, currentSearchFilter);
    }

    /**
     * Загружает и отображает список шаблонов
     * @param {number} page - номер страницы
     * @param {Array|null} searchFilter - фильтр поиска (опционально)
     */
    async function loadTemplates(page = 1, searchFilter = null) {
        try {
            currentPage = page;
            currentSearchFilter = searchFilter;
            templatesTableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="px-6 py-4 text-center text-gray-500">Загрузка...</td>
                </tr>
            `;

            const result = await loadDocumentTemplates(page, searchFilter);
            pageCount = result.pageCount || 1;
            const templates = result.documentTemplatePreview || [];
            
            renderTemplates(templates);
            renderPagination(currentPage, pageCount, handlePageChange);
        } catch (error) {
            console.error('Ошибка загрузки шаблонов:', error);
            showErrorMessage('Ошибка загрузки шаблонов документов');
            templatesTableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="px-6 py-4 text-center text-red-500">Ошибка загрузки данных</td>
                </tr>
            `;
        }
    }

    /**
     * Выполняет поиск шаблонов
     */
    function performSearch() {
        const searchText = searchInput.value.trim();
        
        if (searchText === '') {
            // Если поле пустое, очищаем фильтр и загружаем все шаблоны
            currentSearchFilter = null;
            loadTemplates(1, null);
            return;
        }

        // Создаем фильтр поиска
        const searchFilter = [
            {
                FieldName: "DocumentName",
                MatchMode: "Contains",
                Value: searchText
            }
        ];

        // Сбрасываем на первую страницу при новом поиске
        loadTemplates(1, searchFilter);
    }

    /**
     * Открывает PDF файл шаблона в новой вкладке
     * @param {number} templateId - ID шаблона
     */
    async function viewTemplate(templateId) {
        try {
            const blob = await loadDocumentTemplatePdf(templateId);
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank');
            // Освобождаем память после загрузки
            setTimeout(() => window.URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error('Ошибка загрузки PDF:', error);
            showErrorMessage('Ошибка загрузки PDF файла');
        }
    }

    /**
     * Обработчик скачивания шаблона
     * @param {number} templateId - ID шаблона
     */
    async function handleDownloadTemplate(templateId) {
        try {
            await downloadDocumentTemplate(templateId);
            showSuccessMessage('Файл успешно скачан');
        } catch (error) {
            console.error('Ошибка скачивания:', error);
            if (error.message === 'NotFound') {
                showErrorMessage('Файл не найден');
            } else {
                showErrorMessage('Ошибка при скачивании файла');
            }
        }
    }

    /**
     * Обработчик удаления шаблона
     * @param {number} templateId - ID шаблона
     */
    function handleDeleteTemplate(templateId) {
        currentTemplateIdToDelete = templateId;
        openModalWrapper(deleteModal);
    }

    // --- Обработчики событий ---

    // Обработка формы добавления шаблона
    addTemplateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        disableButton(submitAddTemplateBtn, 'Загрузка...');

        const templateName = getValue('templateName');
        const fileInput = document.getElementById('templateFile');
        const file = fileInput.files[0];

        if (!file) {
            showErrorMessage('Пожалуйста, выберите файл');
            enableButton(submitAddTemplateBtn);
            return;
        }

        // Проверка расширения файла
        const fileName = file.name.toLowerCase();
        if (!fileName.endsWith('.doc') && !fileName.endsWith('.docx')) {
            showErrorMessage('Файл должен быть формата .doc или .docx');
            enableButton(submitAddTemplateBtn);
            return;
        }

        try {
            const response = await uploadDocumentTemplate(file, templateName);

            if (response.ok) {
                showSuccessMessage('Шаблон успешно загружен');
                closeModalWrapper(addTemplateModal);
                clearForm(addTemplateForm);
                loadTemplates(currentPage, currentSearchFilter);
            } else {
                const errorText = await response.text();
                showErrorMessage(`Ошибка при загрузке шаблона: ${errorText}`);
            }
        } catch (error) {
            console.error('Ошибка:', error);
            showErrorMessage('Произошла ошибка при загрузке шаблона');
        } finally {
            enableButton(submitAddTemplateBtn);
        }
    });

    // Обработка кликов по кнопкам в таблице
    templatesTableBody.addEventListener('click', async (e) => {
        // Кнопка Скачать
        const downloadButton = e.target.closest('.download-template-btn');
        if (downloadButton) {
            const templateId = parseInt(downloadButton.dataset.templateId);
            await handleDownloadTemplate(templateId);
            return;
        }

        // Кнопка Просмотреть
        const viewButton = e.target.closest('.view-template-btn');
        if (viewButton) {
            const templateId = parseInt(viewButton.dataset.templateId);
            await viewTemplate(templateId);
            return;
        }

        // Кнопка Удалить
        const deleteButton = e.target.closest('.delete-template-btn');
        if (deleteButton) {
            const templateId = parseInt(deleteButton.dataset.templateId);
            handleDeleteTemplate(templateId);
            return;
        }
    });

    // --- Инициализация модальных окон ---

    // Окно добавления шаблона
    addTemplateBtn.addEventListener('click', () => openModalWrapper(addTemplateModal));
    closeAddTemplateModalBtn.addEventListener('click', () => {
        closeModalWrapper(addTemplateModal);
        clearForm(addTemplateForm);
    });
    cancelAddTemplateBtn.addEventListener('click', () => {
        closeModalWrapper(addTemplateModal);
        clearForm(addTemplateForm);
    });

    // Закрытие модального окна добавления шаблона по клику на фон
    window.addEventListener('click', (e) => {
        if (e.target === addTemplateModal) {
            closeModalWrapper(addTemplateModal);
            clearForm(addTemplateForm);
        }
    });

    // Обработка подтверждения удаления
    confirmDeleteBtn.addEventListener('click', async () => {
        if (!currentTemplateIdToDelete) return;

        try {
            const response = await deleteDocumentTemplate(currentTemplateIdToDelete);

            if (response.ok) {
                showSuccessMessage('Шаблон успешно удален');
                loadTemplates(currentPage, currentSearchFilter); // Обновляем список шаблонов
                closeModalWrapper(deleteModal);
            } else {
                if (response.status === 404) {
                    showErrorMessage('Шаблон не найден');
                } else {
                    const errorText = await response.text();
                    showErrorMessage(`Ошибка при удалении шаблона: ${errorText || 'Неизвестная ошибка'}`);
                }
            }
        } catch (error) {
            console.error('Ошибка удаления:', error);
            showErrorMessage('Произошла ошибка при удалении шаблона');
        } finally {
            currentTemplateIdToDelete = null;
        }
    });

    // Окно удаления
    closeDeleteModalBtn.addEventListener('click', () => {
        closeModalWrapper(deleteModal);
        currentTemplateIdToDelete = null;
    });
    cancelDeleteBtn.addEventListener('click', () => {
        closeModalWrapper(deleteModal);
        currentTemplateIdToDelete = null;
    });

    // Закрытие модального окна удаления по клику на фон
    window.addEventListener('click', (e) => {
        if (e.target === deleteModal) {
            closeModalWrapper(deleteModal);
            currentTemplateIdToDelete = null;
        }
    });

    // --- Обработчики поиска ---
    
    // Обработчик кнопки поиска
    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    // Обработчик нажатия Enter в поле поиска
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // --- Первичная загрузка данных ---
    loadTemplates(1, null);
});

