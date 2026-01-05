/**
 * Главный файл приложения для работы со студентами
 * Использует модульную архитектуру
 */

// Импорт модулей
import {
    openModal,
    closeModal,
    showSuccessMessage,
    showErrorMessage,
    disableButton,
    enableButton,
    getValue,
    clearForm,
    createDeleteModal,
    setupTabs
} from './utils.js';

import {
    loadStudents as apiLoadStudents,
    addStudent,
    updateStudent,
    updateStudentsGroup,
    deleteStudent,
    loadCompanyData,
    loadProfessionData
} from './apiStudent.js';

import {
    loadDocumentTemplates,
    searchDocumentTemplates,
    makeDocuments
} from './apiDocument.js';

import {
    renderStudents,
    renderPagination,
    loadCompanies,
    loadProfessions,
    loadStudentDataToForm
} from './uiStudent.js';

import {
    createSearchField,
    buildSearchFilter,
    clearSearch as clearSearchFields,
    searchFields
} from './search.js';

import {
    initTriStateCheckboxes,
    resetTriStateCheckboxes,
    removeTriStateCheckboxes,
    getTriStateValue
} from './triStateCheckbox.js';

// Ждем, пока вся HTML-структура (DOM) будет загружена, прежде чем выполнять скрипт
document.addEventListener('DOMContentLoaded', () => {

    // --- Переменные состояния ---
    let currentStudentId = null;
    let currentStudentIdToDelete = null;

    // --- Поиск DOM-элементов ---
    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');

    // Модальное окно авторизации
    const authBtn = document.getElementById('authBtn');
    const authModal = document.getElementById('authModal');
    const closeModalBtn = document.getElementById('closeModal');
    const loginForm = document.getElementById('loginForm');
    
    // Убеждаемся, что модальное окно авторизации закрыто при загрузке
    if (authModal) {
        authModal.style.display = 'none';
        authModal.classList.add('hidden');
    }

    // Модальное окно добавления сотрудника
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const employeeModal = document.getElementById('employeeModal');
    const closeEmployeeModalBtn = document.getElementById('closeEmployeeModal');
    const cancelEmployeeBtn = document.getElementById('cancelEmployeeBtn');
    const employeeForm = document.getElementById('employeeForm');
    const submitEmployeeBtn = document.getElementById('submitEmployeeBtn');

    // Модальное окно редактирования сотрудника
    const editEmployeeModal = document.getElementById('editEmployeeModal');
    const closeEditEmployeeModalBtn = document.getElementById('closeEditEmployeeModal');
    const cancelEditEmployeeBtn = document.getElementById('cancelEditEmployeeBtn');
    const editEmployeeForm = document.getElementById('editEmployeeForm');
    const submitEditEmployeeBtn = document.getElementById('submitEditEmployeeBtn');

    // Модальное окно удаления
    const deleteModal = createDeleteModal();
    const closeDeleteModalBtn = deleteModal.querySelector('#closeDeleteModal');
    const cancelDeleteBtn = deleteModal.querySelector('#cancelDelete');
    const confirmDeleteBtn = deleteModal.querySelector('#confirmDelete');

    // Таблица
    const studentsTableBody = document.getElementById('studentsTableBody');
    const paginationContainer = document.getElementById('paginationContainer');
    const tableContainer = document.getElementById('tableContainer');

    // Поиск
    const toggleSearchBtn = document.getElementById('toggleSearchBtn');
    const searchPanel = document.getElementById('searchPanel');
    const addSearchFieldBtn = document.getElementById('addSearchFieldBtn');
    const searchFieldsContainer = document.getElementById('searchFieldsContainer');
    const searchBtn = document.getElementById('searchBtn');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    // Состояние пагинации и поиска
    let currentPage = 1;
    let pageCount = 1;
    let currentSearchFilter = null;

    // Состояние выделения студентов и группового редактирования
    let selectedStudentIds = new Set();
    let isGroupEditMode = false;
    let initialFormValues = {};
    let changedFields = new Set();
    let triStateControllers = null;

    // Элементы для группового редактирования
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const editSelectedBtn = document.getElementById('editSelectedBtn');
    const selectedCountSpan = document.getElementById('selectedCount');
    const prepareDocumentsBtn = document.getElementById('prepareDocumentsBtn');
    const selectedCountForDocs = document.getElementById('selectedCountForDocs');

    // Модальное окно выбора шаблона
    const selectTemplateModal = document.getElementById('selectTemplateModal');
    const closeSelectTemplateModal = document.getElementById('closeSelectTemplateModal');
    const cancelSelectTemplateBtn = document.getElementById('cancelSelectTemplateBtn');
    const confirmSelectTemplateBtn = document.getElementById('confirmSelectTemplateBtn');
    const templateSearchInput = document.getElementById('templateSearchInput');
    const templateSearchResults = document.getElementById('templateSearchResults');
    const selectedTemplateId = document.getElementById('selectedTemplateId');
    const templateLoadingOverlay = document.getElementById('templateLoadingOverlay');
    const archiveGenerationModal = document.getElementById('archiveGenerationModal');

    // --- Обертки для функций с правильными параметрами ---

    /**
     * Обертка для openModal с правильными параметрами
     */
    const openModalWrapper = (modalElement) => openModal(modalElement, mainContent, header);

    /**
     * Обертка для closeModal с правильными параметрами
     */
    const closeModalWrapper = (modalElement) => closeModal(modalElement, mainContent, header);

    /**
     * Загружает и отображает список студентов в таблице
     * @param {number} page - номер страницы
     * @param {Object} searchFilter - фильтр поиска (опционально)
     */
    async function loadStudents(page = 1, searchFilter = null) {
        try {
            currentPage = page;
            currentSearchFilter = searchFilter;

            // Очищаем выделение при переключении страницы
            // При переключении страницы выделение сбрасывается
            selectedStudentIds.clear();
            if (selectAllCheckbox) {
                selectAllCheckbox.checked = false;
                selectAllCheckbox.indeterminate = false;
            }

            const result = await apiLoadStudents(page, searchFilter);
            pageCount = result.pageCount || 1;
            const students = result.studentPreviews || [];

            renderStudents(students, studentsTableBody, tableContainer, paginationContainer, currentPage);
            renderPagination(paginationContainer, currentPage, pageCount, handlePageChange);
            
            // Обновляем состояние кнопок после рендеринга
            updateGroupEditButton();
            // Обновляем состояние чекбокса "Выделить все" после рендеринга
            updateSelectAllCheckbox();
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
            showErrorMessage('Ошибка загрузки данных студентов');
        }
    }

    /**
     * Обработчик изменения страницы
     * @param {number} page - номер страницы
     */
    function handlePageChange(page) {
        loadStudents(page, currentSearchFilter);
    }

    /**
     * Выполняет поиск студентов
     */
    async function performSearch() {
        if (!searchFieldsContainer) {
            console.error('Контейнер поиска не найден');
            return;
        }
        
        const searchFilter = buildSearchFilter(searchFieldsContainer);
        
        // Сбрасываем на первую страницу при новом поиске
        loadStudents(1, searchFilter);
    }

    /**
     * Очищает все поля поиска
     */
    function clearSearch() {
        if (searchFieldsContainer) {
            searchFieldsContainer.innerHTML = '';
        }
        currentSearchFilter = null;
        loadStudents(1, null);
    }

    /**
     * Загружает детальные данные студента в форму редактирования
     */
    async function loadStudentData(studentId) {
        try {
            await loadStudentDataToForm(
                studentId,
                editEmployeeForm,
                loadCompanyData,
                loadProfessionData
            );
        } catch (error) {
            console.error('Ошибка загрузки данных студента:', error);
            throw error;
        }
    }

    /**
     * Обновляет счетчик и видимость кнопок группового редактирования и подготовки документов
     */
    function updateGroupEditButton() {
        const count = selectedStudentIds.size;
        if (selectedCountSpan) {
            selectedCountSpan.textContent = count;
        }
        if (selectedCountForDocs) {
            selectedCountForDocs.textContent = count;
        }
        if (editSelectedBtn) {
            if (count > 0) {
                editSelectedBtn.classList.remove('hidden');
            } else {
                editSelectedBtn.classList.add('hidden');
            }
        }
        if (prepareDocumentsBtn) {
            if (count > 0) {
                prepareDocumentsBtn.classList.remove('hidden');
            } else {
                prepareDocumentsBtn.classList.add('hidden');
            }
        }
    }

    /**
     * Обработчик изменения чекбокса студента
     */
    function handleStudentCheckboxChange(e) {
        const checkbox = e.target;
        const studentId = checkbox.dataset.studentId;
        
        if (checkbox.checked) {
            selectedStudentIds.add(studentId);
        } else {
            selectedStudentIds.delete(studentId);
        }
        
        updateGroupEditButton();
        updateSelectAllCheckbox();
    }

    /**
     * Обновляет состояние чекбокса "Выделить все"
     */
    function updateSelectAllCheckbox() {
        if (!selectAllCheckbox) return;
        
        const checkboxes = document.querySelectorAll('.student-checkbox');
        const checkedCount = document.querySelectorAll('.student-checkbox:checked').length;
        
        selectAllCheckbox.checked = checkboxes.length > 0 && checkedCount === checkboxes.length;
        selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < checkboxes.length;
    }

    /**
     * Обработчик чекбокса "Выделить все"
     */
    function handleSelectAllChange(e) {
        const checkboxes = document.querySelectorAll('.student-checkbox');
        const isChecked = e.target.checked;
        
        // Очищаем только ID студентов с текущей страницы перед установкой нового состояния
        checkboxes.forEach(checkbox => {
            const studentId = checkbox.dataset.studentId;
            selectedStudentIds.delete(studentId); // Удаляем ID текущей страницы
        });
        
        // Теперь устанавливаем новое состояние для всех чекбоксов на текущей странице
        checkboxes.forEach(checkbox => {
            checkbox.checked = isChecked;
            if (isChecked) {
                selectedStudentIds.add(checkbox.dataset.studentId);
            }
        });
        
        updateGroupEditButton();
    }

    /**
     * Сохраняет начальные значения формы для отслеживания изменений
     */
    function saveInitialFormValues(form) {
        initialFormValues = {};
        changedFields.clear();
        
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.name) {
                initialFormValues[input.name] = input.value;
            }
        });
    }

    /**
     * Отслеживает изменения полей формы
     */
    function trackFormChanges(e) {
        const input = e.target;
        if (!input.name && !input.id) return;
        
        const fieldName = input.name || input.id;
        
        // Для трехпозиционных чекбоксов проверяем их состояние
        if (input.type === 'checkbox' && triStateControllers && triStateControllers[input.id]) {
            const currentValue = getTriStateValue(input.id);
            // Добавляем в измененные поля, если значение не null
            if (currentValue !== null) {
                changedFields.add(fieldName);
            } else {
                changedFields.delete(fieldName);
            }
        } else {
            // Для обычных полей
            if (input.value !== initialFormValues[fieldName]) {
                changedFields.add(fieldName);
            } else {
                changedFields.delete(fieldName);
            }
        }
    }

    /**
     * Открывает форму для группового редактирования
     */
    function openGroupEditForm() {
        if (selectedStudentIds.size === 0) {
            showErrorMessage('Не выбраны студенты для редактирования');
            return;
        }
        
        isGroupEditMode = true;
        
        // Список ID чекбоксов для группового редактирования
        const checkboxIds = [
            'edit_payment_contribution',
            'edit_payment_contribution_year',
            'edit_card_ready',
            'edit_card_get'
        ];
        
        // Удаляем старые трехпозиционные чекбоксы если они есть
        if (triStateControllers) {
            removeTriStateCheckboxes(checkboxIds);
            triStateControllers = null;
        }
        
        // Очищаем форму
        clearForm(editEmployeeForm);
        
        // Инициализируем трехпозиционные чекбоксы для группового редактирования
        triStateControllers = initTriStateCheckboxes(editEmployeeForm, checkboxIds);
        
        // Сохраняем начальные значения (пустые для группового редактирования)
        saveInitialFormValues(editEmployeeForm);
        
        // Меняем заголовок модального окна
        const modalTitle = editEmployeeModal.querySelector('h3');
        if (modalTitle) {
            modalTitle.innerHTML = `
                Групповое редактирование (выбрано: ${selectedStudentIds.size})
                <span class="text-sm font-normal text-gray-600 block mt-1">
                    <i class="fas fa-info-circle"></i> Заполните только поля, которые нужно изменить
                </span>
            `;
        }
        
        // Открываем модальное окно
        openModalWrapper(editEmployeeModal);
        
        // Загружаем компании и профессии
        loadCompanies('edit_company', 'edit_director', 'edit_company_address', 'edit_practice_address', loadCompanyData);
        loadProfessions('edit_profession', 'edit_profession_number', loadProfessionData);
    }

    /**
     * Получает только измененные поля формы
     */
    function getChangedFormData(form) {
        const formData = {};
        
        changedFields.forEach(fieldName => {
            // Ищем поле по name или id
            let input = form.querySelector(`[name="${fieldName}"]`);
            if (!input) {
                input = form.querySelector(`#${fieldName}`);
            }
            
            if (input) {
                // Проверяем, является ли это трехпозиционным чекбоксом
                if (input.type === 'checkbox' && triStateControllers && triStateControllers[input.id]) {
                    const value = getTriStateValue(input.id);
                    formData[fieldName] = value;
                } else {
                    formData[fieldName] = getValue(fieldName) || null;
                }
            }
        });
        
        return formData;
    }

    // --- Обработчики событий ---

    // Обработка формы входа
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Попытка входа:', { username, password });

        // Временная имитация успешного входа
        setTimeout(() => {
            closeModalWrapper(authModal);
            authBtn.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span>${username}</span>
            `;
            showSuccessMessage(`Добро пожаловать, ${username}!`);
        }, 1000);
    });

    // Обработка формы добавления сотрудника
    employeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        disableButton(submitEmployeeBtn, 'Сохранение...');

        const count = document.getElementById('employeeCount').value;
        const formData = {
            Contract: {
                NumberUVM: getValue('uvm_contract_number'),
                Number3Party: getValue('tripartite_contract_number'),
                Date3Party: getValue('tripartite_contract_date'),
                Number2Party: getValue('bipartite_contract_number'),
                Date2Party: getValue('bipartite_contract_date'),
                GroupNumber: getValue('group_number'),
                DateOfDispatch: getValue('shipment_date'),
                MailCompany: getValue('postal_company'),
                DateReturn: getValue('return_date')
            },
            FinanceDoc: {
                PaymentOfContribution: document.getElementById('payment_contribution').checked,
                PaymentOfContributionYear: document.getElementById('payment_contribution_year').checked,
                CheckNumber: getValue('receipt_number'),
                CheckDate: getValue('receipt_date'),
                CardIsReady: document.getElementById('card_ready').checked,
                CardIsGet: document.getElementById('card_get').checked
            },
            PersonalData: {
                Surname: getValue('surname'),
                Name: getValue('name'),
                Patronymic: getValue('patronymic'),
                SurnameEn: getValue('surname_en'),
                NameEn: getValue('name_en'),
                PatronymicEn: getValue('patronymic_en'),
                Birthday: getValue('birth_date'),
                PassportSeries: getValue('passport_series'),
                PassportNumber: getValue('passport_number'),
                PassportDateOfIssue: getValue('passport_issue_date'),
                PassportDateEnd: getValue('passport_expiry_date'),
                PlaceOfBirth: getValue('birth_place'),
                CityOfRegistration: getValue('registration_city'),
                AddressRegistration: getValue('registration_address'),
                AddressRegistrationIndex: getValue('registration_zip')
            },
            Visa: {
                InviteNumber: getValue('invitation_number'),
                ArrivalDate: getValue('arrival_date'),
                VisaId: getValue('visa_id'),
                VisaSeries: getValue('visa_form_series'),
                VisaNumber: getValue('visa_number'),
                VisaIssueDate: getValue('visa_issue_date'),
                VisaReceiptDate: getValue('visa_receipt_date'),
                VisaValidityDate: getValue('visa_expiry_date')
            },
            Student: {
                "CompanyId": getValue('company'),
                "ProfessionId": getValue('profession'),
                "CuratorId": getValue('curator')
            }
        };

        try {
            const response = await addStudent(formData, count);

            if (response.ok) {
                showSuccessMessage('Сотрудник успешно добавлен');
                closeModalWrapper(employeeModal);
                clearForm(employeeForm);
                loadStudents(currentPage, currentSearchFilter);
            } else {
                throw new Error('Ошибка при добавлении сотрудника');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            showErrorMessage('Произошла ошибка при добавлении сотрудника');
        } finally {
            enableButton(submitEmployeeBtn);
        }
    });

    // Обработка формы редактирования сотрудника
    editEmployeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        disableButton(submitEditEmployeeBtn, 'Обновление...');

        try {
            // Проверяем режим группового редактирования
            if (isGroupEditMode) {
                // Групповое редактирование - отправляем только измененные поля
                const changedData = getChangedFormData(editEmployeeForm);
                
                // Создаем структуру с null для неизменённых полей
                const formData = {
                    Contract: {
                        NumberUVM: changedData.edit_uvm_contract_number || null,
                        Number3Party: changedData.edit_tripartite_contract_number || null,
                        Date3Party: changedData.edit_tripartite_contract_date || null,
                        Number2Party: changedData.edit_bipartite_contract_number || null,
                        Date2Party: changedData.edit_bipartite_contract_date || null,
                        GroupNumber: changedData.edit_group_number || null,
                        DateOfDispatch: changedData.edit_shipment_date || null,
                        MailCompany: changedData.edit_postal_company || null,
                        DateReturn: changedData.edit_return_date || null
                    },
                    FinanceDoc: {
                        PaymentOfContribution: changedData.edit_payment_contribution !== undefined ? changedData.edit_payment_contribution : null,
                        PaymentOfContributionYear: changedData.edit_payment_contribution_year !== undefined ? changedData.edit_payment_contribution_year : null,
                        CheckNumber: changedData.edit_receipt_number || null,
                        CheckDate: changedData.edit_receipt_date || null,
                        CardIsReady: changedData.edit_card_ready !== undefined ? changedData.edit_card_ready : null,
                        CardIsGet: changedData.edit_card_get !== undefined ? changedData.edit_card_get : null
                    },
                    PersonalData: {
                        Surname: changedData.edit_surname || null,
                        Name: changedData.edit_name || null,
                        Patronymic: changedData.edit_patronymic || null,
                        SurnameEn: changedData.edit_surname_en || null,
                        NameEn: changedData.edit_name_en || null,
                        PatronymicEn: changedData.edit_patronymic_en || null,
                        Birthday: changedData.edit_birth_date || null,
                        PassportSeries: changedData.edit_passport_series || null,
                        PassportNumber: changedData.edit_passport_number || null,
                        PassportDateOfIssue: changedData.edit_passport_issue_date || null,
                        PassportDateEnd: changedData.edit_passport_expiry_date || null,
                        PlaceOfBirth: changedData.edit_birth_place || null,
                        CityOfRegistration: changedData.edit_registration_city || null,
                        AddressRegistration: changedData.edit_registration_address || null,
                        AddressRegistrationIndex: changedData.edit_registration_zip || null
                    },
                    Visa: {
                        InviteNumber: changedData.edit_invitation_number || null,
                        ArrivalDate: changedData.edit_arrival_date || null,
                        VisaId: changedData.edit_visa_id || null,
                        VisaSeries: changedData.edit_visa_form_series || null,
                        VisaNumber: changedData.edit_visa_number || null,
                        VisaIssueDate: changedData.edit_visa_issue_date || null,
                        VisaReceiptDate: changedData.edit_visa_receipt_date || null,
                        VisaValidityDate: changedData.edit_visa_expiry_date || null
                    },
                    Student: {
                        CompanyId: changedData.edit_company || null,
                        ProfessionId: changedData.edit_profession || null,
                        CuratorId: changedData.edit_curator || null
                    }
                };

                const response = await updateStudentsGroup(formData, Array.from(selectedStudentIds));

                if (response.ok) {
                    showSuccessMessage(`Успешно обновлено студентов: ${selectedStudentIds.size}`);
                    
                    // Удаляем трехпозиционные чекбоксы
                    const checkboxIds = [
                        'edit_payment_contribution',
                        'edit_payment_contribution_year',
                        'edit_card_ready',
                        'edit_card_get'
                    ];
                    removeTriStateCheckboxes(checkboxIds);
                    triStateControllers = null;
                    
                    closeModalWrapper(editEmployeeModal);
                    isGroupEditMode = false;
                    changedFields.clear();
                    selectedStudentIds.clear();
                    updateGroupEditButton();
                    
                    // Восстанавливаем заголовок
                    const modalTitle = editEmployeeModal.querySelector('h3');
                    if (modalTitle) {
                        modalTitle.textContent = 'Редактирование сотрудника';
                    }
                    
                    loadStudents(currentPage, currentSearchFilter);
                } else {
                    const errorText = await response.text();
                    showErrorMessage(`Ошибка группового обновления: ${errorText}`);
                }
            } else {
                // Обычное редактирование одного студента
                const formData = {
                    Contract: {
                        NumberUVM: getValue('edit_uvm_contract_number'),
                        Number3Party: getValue('edit_tripartite_contract_number'),
                        Date3Party: getValue('edit_tripartite_contract_date'),
                        Number2Party: getValue('edit_bipartite_contract_number'),
                        Date2Party: getValue('edit_bipartite_contract_date'),
                        GroupNumber: getValue('edit_group_number'),
                        DateOfDispatch: getValue('edit_shipment_date'),
                        MailCompany: getValue('edit_postal_company'),
                        DateReturn: getValue('edit_return_date')
                    },
                    FinanceDoc: {
                        PaymentOfContribution: document.getElementById('edit_payment_contribution')?.checked || false,
                        PaymentOfContributionYear: document.getElementById('edit_payment_contribution_year')?.checked || false,
                        CheckNumber: getValue('edit_receipt_number'),
                        CheckDate: getValue('edit_receipt_date'),
                        CardIsReady: document.getElementById('edit_card_ready')?.checked || false,
                        CardIsGet: document.getElementById('edit_card_get')?.checked || false
                    },
                    PersonalData: {
                        Surname: getValue('edit_surname'),
                        Name: getValue('edit_name'),
                        Patronymic: getValue('edit_patronymic'),
                        SurnameEn: getValue('edit_surname_en'),
                        NameEn: getValue('edit_name_en'),
                        PatronymicEn: getValue('edit_patronymic_en'),
                        Birthday: getValue('edit_birth_date'),
                        PassportSeries: getValue('edit_passport_series'),
                        PassportNumber: getValue('edit_passport_number'),
                        PassportDateOfIssue: getValue('edit_passport_issue_date'),
                        PassportDateEnd: getValue('edit_passport_expiry_date'),
                        PlaceOfBirth: getValue('edit_birth_place'),
                        CityOfRegistration: getValue('edit_registration_city'),
                        AddressRegistration: getValue('edit_registration_address'),
                        AddressRegistrationIndex: getValue('edit_registration_zip')
                    },
                    Visa: {
                        InviteNumber: getValue('edit_invitation_number'),
                        ArrivalDate: getValue('edit_arrival_date'),
                        VisaId: getValue('edit_visa_id'),
                        VisaSeries: getValue('edit_visa_form_series'),
                        VisaNumber: getValue('edit_visa_number'),
                        VisaIssueDate: getValue('edit_visa_issue_date'),
                        VisaReceiptDate: getValue('edit_visa_receipt_date'),
                        VisaValidityDate: getValue('edit_visa_expiry_date')
                    },
                    Student: {
                        Id: currentStudentId,
                        CompanyId: getValue('edit_company'),
                        ProfessionId: getValue('edit_profession'),
                        CuratorId: getValue('edit_curator')
                    }
                };

                const response = await updateStudent(formData);
                currentStudentId = null;

                if (response.ok) {
                    showSuccessMessage('Данные сотрудника успешно обновлены');
                    closeModalWrapper(editEmployeeModal);
                    loadStudents(currentPage, currentSearchFilter);
                } else {
                    const errorText = await response.text();
                    showErrorMessage(`Ошибка при обновлении данных сотрудника: ${errorText}`);
                }
            }
        } catch (error) {
            console.error('Ошибка:', error);
            showErrorMessage('Произошла ошибка при обновлении данных сотрудника');
        } finally {
            enableButton(submitEditEmployeeBtn);
        }
    });

    // Обработка кликов по кнопкам в таблице (Редактировать, Удалить)
    studentsTableBody.addEventListener('click', async (e) => {
        // Чекбоксы студентов
        if (e.target.classList.contains('student-checkbox')) {
            handleStudentCheckboxChange(e);
            return;
        }

        // Кнопка Редактировать
        const editButton = e.target.closest('.edit-employee-btn');
        if (editButton) {
            const studentId = editButton.dataset.studentId;
            console.log('Редактирование студента с ID:', studentId);
            currentStudentId = studentId;
            
            // Убедимся, что режим группового редактирования выключен
            isGroupEditMode = false;
            
            // Удаляем трехпозиционные чекбоксы если они остались
            if (triStateControllers) {
                const checkboxIds = [
                    'edit_payment_contribution',
                    'edit_payment_contribution_year',
                    'edit_card_ready',
                    'edit_card_get'
                ];
                removeTriStateCheckboxes(checkboxIds);
                triStateControllers = null;
            }
            
            // Очищаем changedFields
            changedFields.clear();
            
            // Восстанавливаем заголовок
            const modalTitle = editEmployeeModal.querySelector('h3');
            if (modalTitle) {
                modalTitle.textContent = 'Редактирование сотрудника';
            }

            try {
                await loadStudentData(studentId);
                openModalWrapper(editEmployeeModal);
            } catch (error) {
                console.error('Ошибка загрузки данных студента:', error);
                showErrorMessage('Ошибка загрузки данных студента');
            }
            return;
        }

        // Кнопка Удалить
        const deleteButton = e.target.closest('.delete-employee-btn');
        if (deleteButton) {
            const studentId = deleteButton.dataset.studentId;
            console.log('Удаление студента с ID:', studentId);
            currentStudentIdToDelete = studentId;
            openModalWrapper(deleteModal);
        }
    });

    // Обработчик чекбокса "Выделить все"
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', handleSelectAllChange);
    }

    // Обработчик кнопки "Редактировать выделенные"
    if (editSelectedBtn) {
        editSelectedBtn.addEventListener('click', openGroupEditForm);
    }

    // Переменная для хранения debounce таймера
    let searchDebounceTimer = null;
    let currentTemplates = [];

    /**
     * Утилита для debounce
     */
    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(searchDebounceTimer);
                func(...args);
            };
            clearTimeout(searchDebounceTimer);
            searchDebounceTimer = setTimeout(later, wait);
        };
    }

    /**
     * Отображает результаты поиска в выпадающем списке
     */
    function renderTemplateResults(templates) {
        currentTemplates = templates;
        templateSearchResults.innerHTML = '';

        if (!templates || templates.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'px-4 py-3 text-gray-500 text-sm';
            noResults.textContent = 'Шаблоны не найдены';
            templateSearchResults.appendChild(noResults);
            templateSearchResults.classList.remove('hidden');
            return;
        }

        templates.forEach(template => {
            const resultItem = document.createElement('div');
            resultItem.className = 'px-4 py-3 hover:bg-teal-50 cursor-pointer border-b border-gray-100 last:border-b-0';
            resultItem.dataset.templateId = template.id;
            resultItem.textContent = template.documentName || `Шаблон #${template.id}`;
            
            resultItem.addEventListener('click', () => {
                selectTemplate(template.id, template.documentName || `Шаблон #${template.id}`);
            });
            
            templateSearchResults.appendChild(resultItem);
        });

        templateSearchResults.classList.remove('hidden');
    }

    /**
     * Выбирает шаблон
     */
    function selectTemplate(templateId, templateName) {
        selectedTemplateId.value = templateId;
        templateSearchInput.value = templateName;
        templateSearchInput.dataset.selectedName = templateName;
        templateSearchResults.classList.add('hidden');
        confirmSelectTemplateBtn.disabled = false;
    }

    /**
     * Загружает шаблоны с первой страницы
     */
    async function loadInitialTemplates() {
        try {
            templateLoadingOverlay.classList.remove('hidden');
            const result = await loadDocumentTemplates(1, null);
            const templates = result.documentTemplatePreview || [];
            renderTemplateResults(templates);
        } catch (error) {
            console.error('Ошибка загрузки шаблонов:', error);
            showErrorMessage('Ошибка загрузки списка шаблонов');
            templateSearchResults.classList.add('hidden');
        } finally {
            templateLoadingOverlay.classList.add('hidden');
        }
    }

    /**
     * Выполняет поиск шаблонов
     */
    async function performTemplateSearch(searchString) {
        const trimmedSearch = searchString ? searchString.trim() : '';
        
        // Если поле пустое, показываем шаблоны с первой страницы
        if (!trimmedSearch) {
            await loadInitialTemplates();
            return;
        }

        try {
            templateLoadingOverlay.classList.remove('hidden');
            const result = await searchDocumentTemplates(trimmedSearch);
            const templates = result.documentTemplatePreview || [];
            renderTemplateResults(templates);
        } catch (error) {
            console.error('Ошибка поиска шаблонов:', error);
            showErrorMessage('Ошибка поиска шаблонов');
            templateSearchResults.classList.add('hidden');
        } finally {
            templateLoadingOverlay.classList.add('hidden');
        }
    }

    /**
     * Debounced функция поиска
     */
    const debouncedSearch = debounce(performTemplateSearch, 300);

    /**
     * Открывает модальное окно выбора шаблона
     */
    function openSelectTemplateModal() {
        if (selectedStudentIds.size === 0) {
            showErrorMessage('Не выбраны студенты для подготовки документов');
            return;
        }

        // Очищаем поля при открытии
        templateSearchInput.value = '';
        selectedTemplateId.value = '';
        templateSearchResults.classList.add('hidden');
        confirmSelectTemplateBtn.disabled = true;
        currentTemplates = [];
        
        openModalWrapper(selectTemplateModal);
    }

    /**
     * Создает документы для выбранных студентов
     */
    async function createDocuments() {
        const templateIdValue = selectedTemplateId.value;
        if (!templateIdValue) {
            showErrorMessage('Пожалуйста, выберите шаблон документа');
            return;
        }

        const userIds = Array.from(selectedStudentIds).map(id => parseInt(id));
        if (userIds.length === 0) {
            showErrorMessage('Не выбраны студенты');
            return;
        }

        try {
            // Закрываем модальное окно выбора шаблона
            closeModalWrapper(selectTemplateModal);
            
            // Показываем модальное окно ожидания
            openModalWrapper(archiveGenerationModal);

            // Отправляем запрос на создание документов
            const blob = await makeDocuments(userIds, parseInt(templateIdValue));

            // Скрываем модальное окно ожидания
            closeModalWrapper(archiveGenerationModal);

            // Скачиваем архив
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `documents_${new Date().getTime()}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            showSuccessMessage('Документы успешно подготовлены');
        } catch (error) {
            console.error('Ошибка создания документов:', error);
            closeModalWrapper(archiveGenerationModal);
            showErrorMessage('Ошибка при подготовке документов');
        }
    }

    // Обработчик кнопки "Подготовить документы"
    if (prepareDocumentsBtn) {
        prepareDocumentsBtn.addEventListener('click', openSelectTemplateModal);
    }

    // Обработчики модального окна выбора шаблона
    if (closeSelectTemplateModal) {
        closeSelectTemplateModal.addEventListener('click', () => {
            closeModalWrapper(selectTemplateModal);
            templateSearchInput.value = '';
            selectedTemplateId.value = '';
            templateSearchResults.classList.add('hidden');
        });
    }

    if (cancelSelectTemplateBtn) {
        cancelSelectTemplateBtn.addEventListener('click', () => {
            closeModalWrapper(selectTemplateModal);
            templateSearchInput.value = '';
            selectedTemplateId.value = '';
            templateSearchResults.classList.add('hidden');
        });
    }

    if (confirmSelectTemplateBtn) {
        confirmSelectTemplateBtn.addEventListener('click', createDocuments);
    }

    // Обработчик поиска в реальном времени
    if (templateSearchInput) {
        templateSearchInput.addEventListener('input', (e) => {
            const searchValue = e.target.value;
            // Если пользователь начал вводить новый текст, очищаем выбранный шаблон
            if (selectedTemplateId.value && searchValue !== templateSearchInput.dataset.selectedName) {
                selectedTemplateId.value = '';
                confirmSelectTemplateBtn.disabled = true;
            }
            debouncedSearch(searchValue);
        });

        // Обработка клавиатуры
        templateSearchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                templateSearchResults.classList.add('hidden');
                templateSearchInput.blur();
            } else if (e.key === 'Enter' && selectedTemplateId.value) {
                e.preventDefault();
                createDocuments();
            }
        });

        // Закрытие выпадающего списка при потере фокуса
        templateSearchInput.addEventListener('blur', () => {
            // Используем небольшую задержку, чтобы обработчик клика успел сработать
            setTimeout(() => {
                templateSearchResults.classList.add('hidden');
            }, 200);
        });

        // Открытие результатов при фокусе (клике на поле)
        templateSearchInput.addEventListener('focus', async () => {
            const currentValue = templateSearchInput.value.trim();
            if (currentValue && currentTemplates.length > 0) {
                // Если есть значение и уже загружены шаблоны, показываем их
                renderTemplateResults(currentTemplates);
            } else if (!currentValue && currentTemplates.length === 0) {
                // Если поле пустое и шаблоны не загружены, загружаем с первой страницы
                await loadInitialTemplates();
            } else if (!currentValue && currentTemplates.length > 0) {
                // Если поле пустое, но шаблоны есть, показываем их
                renderTemplateResults(currentTemplates);
            }
        });
    }

    // Закрытие модального окна выбора шаблона по клику на фон
    window.addEventListener('click', (e) => {
        if (e.target === selectTemplateModal) {
            closeModalWrapper(selectTemplateModal);
            templateSearchInput.value = '';
            selectedTemplateId.value = '';
            templateSearchResults.classList.add('hidden');
        }
    });

    // Отслеживание изменений в форме редактирования
    editEmployeeForm.addEventListener('input', trackFormChanges);
    editEmployeeForm.addEventListener('change', trackFormChanges);

    // Обработка подтверждения удаления
    confirmDeleteBtn.addEventListener('click', async () => {
        if (!currentStudentIdToDelete) return;

        const idStudents = [currentStudentIdToDelete];

        try {
            const response = await deleteStudent(idStudents);

            if (response.ok) {
                loadStudents(currentPage, currentSearchFilter);
                closeModalWrapper(deleteModal);
                showSuccessMessage('Студент успешно удален');
            } else {
                showErrorMessage('Ошибка при удалении студента');
            }
        } catch (error) {
            console.error('Error deleting student:', error);
            showErrorMessage('Ошибка при удалении студента');
        } finally {
            currentStudentIdToDelete = null;
        }
    });

    // --- Инициализация модальных окон ---

    // Окно авторизации
    authBtn.addEventListener('click', () => openModalWrapper(authModal));
    closeModalBtn.addEventListener('click', () => closeModalWrapper(authModal));

    // Окно добавления сотрудника
    addEmployeeBtn.addEventListener('click', () => openModalWrapper(employeeModal));
    closeEmployeeModalBtn.addEventListener('click', () => {
        closeModalWrapper(employeeModal);
        clearForm(employeeForm);
    });
    cancelEmployeeBtn.addEventListener('click', () => {
        closeModalWrapper(employeeModal);
        clearForm(employeeForm);
    });

    // Окно редактирования сотрудника
    closeEditEmployeeModalBtn.addEventListener('click', () => {
        // Удаляем трехпозиционные чекбоксы если были активированы
        if (triStateControllers) {
            const checkboxIds = [
                'edit_payment_contribution',
                'edit_payment_contribution_year',
                'edit_card_ready',
                'edit_card_get'
            ];
            removeTriStateCheckboxes(checkboxIds);
            triStateControllers = null;
        }
        
        closeModalWrapper(editEmployeeModal);
        isGroupEditMode = false;
        changedFields.clear();
        
        // Восстанавливаем заголовок
        const modalTitle = editEmployeeModal.querySelector('h3');
        if (modalTitle) {
            modalTitle.textContent = 'Редактирование сотрудника';
        }
    });
    cancelEditEmployeeBtn.addEventListener('click', () => {
        // Удаляем трехпозиционные чекбоксы если были активированы
        if (triStateControllers) {
            const checkboxIds = [
                'edit_payment_contribution',
                'edit_payment_contribution_year',
                'edit_card_ready',
                'edit_card_get'
            ];
            removeTriStateCheckboxes(checkboxIds);
            triStateControllers = null;
        }
        
        closeModalWrapper(editEmployeeModal);
        isGroupEditMode = false;
        changedFields.clear();
        
        // Восстанавливаем заголовок
        const modalTitle = editEmployeeModal.querySelector('h3');
        if (modalTitle) {
            modalTitle.textContent = 'Редактирование сотрудника';
        }
    });

    // Окно удаления
    closeDeleteModalBtn.addEventListener('click', () => closeModalWrapper(deleteModal));
    cancelDeleteBtn.addEventListener('click', () => closeModalWrapper(deleteModal));

    // Закрытие модальных окон по клику на фон
    window.addEventListener('click', (e) => {
        if (e.target === authModal) closeModalWrapper(authModal);
        if (e.target === deleteModal) closeModalWrapper(deleteModal);
        if (e.target === employeeModal) {
            closeModalWrapper(employeeModal);
            clearForm(employeeForm);
        }
        if (e.target === editEmployeeModal) {
            closeModalWrapper(editEmployeeModal);
        }
    });

    // --- Инициализация вкладок ---
    setupTabs(employeeModal, '.tab-btn', '.tab-content');
    setupTabs(editEmployeeModal, '.edit-tab-btn', '.edit-tab-content');

    // --- Обработчики поиска ---
    // Переключение видимости панели поиска
    if (toggleSearchBtn && searchPanel) {
        toggleSearchBtn.addEventListener('click', () => {
            const isHidden = searchPanel.classList.contains('hidden');
            if (isHidden) {
                searchPanel.classList.remove('hidden');
                toggleSearchBtn.innerHTML = `
                    <i class="fas fa-times"></i>
                    <span>Скрыть поиск</span>
                `;
            } else {
                searchPanel.classList.add('hidden');
                toggleSearchBtn.innerHTML = `
                    <i class="fas fa-search"></i>
                    <span>Поиск</span>
                `;
            }
        });
    }

    if (addSearchFieldBtn && searchFieldsContainer) {
        addSearchFieldBtn.addEventListener('click', () => {
            const newField = createSearchField();
            searchFieldsContainer.appendChild(newField);
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }

    // --- Первичная загрузка данных ---
    loadStudents(1, null);
    // Загружаем компании для обеих форм (с куратором)
    loadCompanies('company', 'director', 'company_address', 'practice_address', loadCompanyData, 'curator');
    loadCompanies('edit_company', 'edit_director', 'edit_company_address', 'edit_practice_address', loadCompanyData, 'edit_curator');
    // Загружаем профессии для обеих форм
    loadProfessions('profession', 'profession_number', loadProfessionData);
    loadProfessions('edit_profession', 'edit_profession_number', loadProfessionData);

});
