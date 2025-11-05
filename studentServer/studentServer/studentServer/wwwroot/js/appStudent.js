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
    deleteStudent,
    loadCompanyData,
    loadProfessionData
} from './apiStudent.js';

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

            const result = await apiLoadStudents(page, searchFilter);
            pageCount = result.pageCount || 1;
            const students = result.studentPreviews || [];

            renderStudents(students, studentsTableBody, tableContainer, paginationContainer, currentPage);
            renderPagination(paginationContainer, currentPage, pageCount, handlePageChange);
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
                PaymentOfContribution: document.getElementById('edit_payment_contribution').checked,
                PaymentOfContributionYear: document.getElementById('edit_payment_contribution_year').checked,
                CheckNumber: getValue('edit_receipt_number'),
                CheckDate: getValue('edit_receipt_date'),
                CardIsReady: document.getElementById('edit_card_ready').checked,
                CardIsGet: document.getElementById('edit_card_get').checked
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
                "Id": currentStudentId,
                "CompanyId": getValue('edit_company'),
                "ProfessionId": getValue('edit_profession'),
                "CuratorId": getValue('edit_curator')
            }
        };

        try {
            const response = await updateStudent(formData);
            currentStudentId = null;

            if (response.ok) {
                showSuccessMessage('Данные сотрудника успешно обновлены');
                closeModalWrapper(editEmployeeModal);
                loadStudents(currentPage, currentSearchFilter);
            } else {
                throw new Error('Ошибка при обновлении данных сотрудника');
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
        // Кнопка Редактировать
        const editButton = e.target.closest('.edit-employee-btn');
        if (editButton) {
            const studentId = editButton.dataset.studentId;
            console.log('Редактирование студента с ID:', studentId);
            currentStudentId = studentId;

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
    closeEditEmployeeModalBtn.addEventListener('click', () => closeModalWrapper(editEmployeeModal));
    cancelEditEmployeeBtn.addEventListener('click', () => closeModalWrapper(editEmployeeModal));

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
    // Загружаем компании для обеих форм
    loadCompanies('company', 'director', 'company_address', 'practice_address', loadCompanyData);
    loadCompanies('edit_company', 'edit_director', 'edit_company_address', 'edit_practice_address', loadCompanyData);
    // Загружаем профессии для обеих форм
    loadProfessions('profession', 'profession_number', loadProfessionData);
    loadProfessions('edit_profession', 'edit_profession_number', loadProfessionData);

});
