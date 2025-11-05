// Ждем, пока вся HTML-структура (DOM) будет загружена, прежде чем выполнять скрипт
document.addEventListener('DOMContentLoaded', () => {

    // --- Глобальные константы ---
    const API_BASE_URL = 'https://localhost:7229';

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

    // Модальное окно добавления сотрудника
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    const employeeModal = document.getElementById('employeeModal');
    const closeEmployeeModalBtn = document.getElementById('closeEmployeeModal');
    const cancelEmployeeBtn = document.getElementById('cancelEmployeeBtn');
    const employeeForm = document.getElementById('employeeForm');
    const submitEmployeeBtn = document.getElementById('submitEmployeeBtn'); // <-- НОВЫЙ

    // Модальное окно редактирования сотрудника
    const editEmployeeModal = document.getElementById('editEmployeeModal');
    const closeEditEmployeeModalBtn = document.getElementById('closeEditEmployeeModal');
    const cancelEditEmployeeBtn = document.getElementById('cancelEditEmployeeBtn');
    const editEmployeeForm = document.getElementById('editEmployeeForm');
    const submitEditEmployeeBtn = document.getElementById('submitEditEmployeeBtn'); // <-- НОВЫЙ

    // Модальное окно удаления
    const deleteModal = createDeleteModal();
    const closeDeleteModalBtn = deleteModal.querySelector('#closeDeleteModal');
    const cancelDeleteBtn = deleteModal.querySelector('#cancelDelete');
    const confirmDeleteBtn = deleteModal.querySelector('#confirmDelete');

    // Таблица
    const studentsTableBody = document.getElementById('studentsTableBody');
    const searchInput = document.getElementById('searchInput');

    // Хранилище списка студентов
    let allStudents = [];

    // --- Вспомогательные функции ---

    /**
     * Открывает модальное окно и блюрит фон
     * @param {HTMLElement} modalElement - Элемент модального окна
     */
    function openModal(modalElement) {
        modalElement.style.display = 'flex';
        mainContent.classList.add('blur-background');
        header.classList.add('blur-background');
    }

    /**
     * Закрывает модальное окно и убирает блюр
     * @param {HTMLElement} modalElement - Элемент модального окна
     */
    function closeModal(modalElement) {
        modalElement.style.display = 'none';
        mainContent.classList.remove('blur-background');
        header.classList.remove('blur-background');
    }

    /**
     * Показывает всплывающее уведомление об успехе
     * @param {string} message - Текст сообщения
     */
    function showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    /**
     * Показывает всплывающее уведомление об ошибке
     * @param {string} message - Текст сообщения
     */
    function showErrorMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // --- НОВЫЕ ФУНКЦИИ ДЛЯ КНОПОК ---

    /**
     * Отключает кнопку и показывает индикатор загрузки
     * @param {HTMLButtonElement} button - Элемент кнопки
     * @param {string} loadingText - Текст для отображения во время загрузки
     */
    function disableButton(button, loadingText = 'Загрузка...') {
        // Сохраняем оригинальный HTML
        button.dataset.originalHtml = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `
            <i class="fas fa-spinner fa-spin mr-2"></i>
            ${loadingText}
        `;
    }

    /**
     * Включает кнопку и восстанавливает ее оригинальное содержимое
     * @param {HTMLButtonElement} button - Элемент кнопки
     */
    function enableButton(button) {
        if (button.dataset.originalHtml) {
            button.innerHTML = button.dataset.originalHtml;
        }
        button.disabled = false;
    }

    // --- КОНЕЦ НОВЫХ ФУНКЦИЙ ---

    /**
     * Получает значение из поля, возвращая null если оно пустое
     * @param {string} elementId - ID элемента
     * @returns {string|null}
     */
    const getValue = (elementId) => {
        const value = document.getElementById(elementId).value;
        return value.trim() === '' ? null : value;
    };

    /**
     * Очищает все поля ввода, чекбоксы и селекты внутри формы
     * @param {HTMLElement} formElement - Элемент формы
     */
    function clearForm(formElement) {
        formElement.reset(); // Самый простой способ сбросить форму

        // Дополнительно сбрасываем "readonly" поля, которые не сбрасываются .reset()
        const readonlyInputs = formElement.querySelectorAll('input[readonly]');
        readonlyInputs.forEach(input => input.value = '');
    }

    /**
     * Создает и добавляет модальное окно подтверждения удаления в DOM
     * @returns {HTMLElement}
     */
    function createDeleteModal() {
        const modal = document.createElement('div');
        modal.id = 'deleteModal';
        modal.className = 'auth-modal fixed inset-0 items-center justify-center z-50 hidden';
        modal.innerHTML = `
            <div class="absolute inset-0 bg-black bg-opacity-50"></div>
            <div class="bg-blue-50 rounded-xl shadow-2xl z-10 w-full max-w-md mx-4">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-stone-700">Подтверждение удаления</h3>
                        <button id="closeDeleteModal" class="text-gray-500 hover:text-gray-700" aria-label="Закрыть">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="mb-6">
                        <p class="text-gray-700">Вы уверены, что хотите удалить этого студента? Это действие нельзя отменить.</p>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button id="cancelDelete" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                            Отмена
                        </button>
                        <button id="confirmDelete" class="bg-red-600 text-blue-50 px-6 py-2 rounded-lg hover:bg-red-700">
                            Удалить
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        return modal;
    }

    /**
     * Настраивает логику переключения вкладок
     * @param {HTMLElement} parentElement - Родительский элемент (модальное окно)
     * @param {string} btnSelector - CSS-селектор для кнопок вкладок
     * @param {string} contentSelector - CSS-селектор для контента вкладок
     */
    function setupTabs(parentElement, btnSelector, contentSelector) {
        const tabButtons = parentElement.querySelectorAll(btnSelector);
        const tabContents = parentElement.querySelectorAll(contentSelector);

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');

                tabButtons.forEach(btn => {
                    btn.classList.remove('active', 'border-teal-600', 'text-teal-600');
                });
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });

                button.classList.add('active', 'border-teal-600', 'text-teal-600');
                document.getElementById(`${tabId}Tab`).classList.add('active');
            });
        });
    }


    // --- Функции загрузки данных (API) ---

    /**
     * Загружает список компаний в указанный <select>
     * @param {string} selectId - ID элемента <select>
     * @param {string} directorId - ID поля для директора
     * @param {string} addressId - ID поля для адреса компании
     * @param {string} practiceId - ID поля для адреса практики
     */
    async function loadCompanies(selectId, directorId, addressId, practiceId) {
        try {
            const response = await fetch(`${API_BASE_URL}/company/allCompanyName`);
            const companies = await response.json();
            const companySelect = document.getElementById(selectId);

            while (companySelect.options.length > 1) {
                companySelect.remove(1);
            }

            companies.forEach(company => {
                const option = document.createElement('option');
                option.value = company.id;
                option.textContent = company.name;
                companySelect.appendChild(option);
            });

            companySelect.addEventListener('change', async function () {
                const directorInput = document.getElementById(directorId);
                const addressInput = document.getElementById(addressId);
                const practiceInput = document.getElementById(practiceId);

                if (this.value) {
                    try {
                        const companyResponse = await fetch(`${API_BASE_URL}/company?idCompany=${this.value}`);
                        const companyData = await companyResponse.json();
                        directorInput.value = companyData.director || '';
                        addressInput.value = companyData.companyAddress || '';
                        practiceInput.value = companyData.practiceAddress || '';
                    } catch (error) {
                        console.error('Ошибка загрузки данных компании:', error);
                    }
                } else {
                    directorInput.value = '';
                    addressInput.value = '';
                    practiceInput.value = '';
                }
            });

        } catch (error) {
            console.error('Ошибка загрузки компаний:', error);
        }
    }

    /**
     * Загружает список профессий в указанный <select>
     * @param {string} selectId - ID элемента <select>
     * @param {string} numberId - ID поля для номера профессии
     */
    async function loadProfessions(selectId, numberId) {
        try {
            const response = await fetch(`${API_BASE_URL}/profession/allProfession`);
            const professions = await response.json();
            const professionSelect = document.getElementById(selectId);

            while (professionSelect.options.length > 1) {
                professionSelect.remove(1);
            }

            professions.forEach(profession => {
                const option = document.createElement('option');
                option.value = profession.id;
                option.textContent = profession.professionName;
                option.dataset.professionNumber = profession.professionNumber;
                professionSelect.appendChild(option);
            });

            professionSelect.addEventListener('change', async function () {
                const numberInput = document.getElementById(numberId);
                if (this.value) {
                    try {
                        const professionResponse = await fetch(`${API_BASE_URL}/profession/profession?id=${this.value}`);
                        const professionData = await professionResponse.json();
                        numberInput.value = professionData.professionNumber || '';
                    } catch (error) {
                        console.error('Ошибка загрузки данных профессии:', error);
                    }
                } else {
                    numberInput.value = '';
                }
            });

        } catch (error) {
            console.error('Ошибка загрузки профессий:', error);
        }
    }

    /**
     * Загружает и отображает список студентов в таблице
     */
    async function loadStudents() {
        try {
            const response = await fetch(`${API_BASE_URL}/student/allStudents?page=1`);
            allStudents = await response.json();
            renderStudents(allStudents);
        } catch (error) {
            console.error('Ошибка загрузки данных:', error);
        }
    }

    /**
     * Рендерит строки таблицы на основе переданного списка студентов
     * @param {Array} students - список студентов для отображения
     */
    function renderStudents(students) {
        studentsTableBody.innerHTML = students.map((student, index) => `
            <tr class="hover:bg-blue-50 transition">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${index + 1}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                    ${[student.surname, student.name, student.patronymic].filter(Boolean).join(' ')}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ${[student.passportSeries, student.passportNumber].filter(Boolean).join(' ')}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${student.groupNumber ?? ''}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${student.companyName ?? ''}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${student.professionName ?? ''}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${student.curator ?? ''}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div class="flex space-x-2">
                        <button class="text-teal-600 hover:text-teal-800 edit-employee-btn" data-student-id="${student.id}" aria-label="Редактировать">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="text-red-600 hover:text-red-800 delete-employee-btn" data-student-id="${student.id}" aria-label="Удалить">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Фильтрует студентов по строке поиска и перерисовывает таблицу
     * @param {string} query - строка запроса
     */
    function filterAndRender(query) {
        const q = (query || '').toLowerCase().trim();
        if (!q) {
            renderStudents(allStudents);
            return;
        }

        const filtered = allStudents.filter((s) => {
            const fio = [s.surname, s.name, s.patronymic].filter(Boolean).join(' ').toLowerCase();
            const passport = [s.passportSeries, s.passportNumber].filter(Boolean).join(' ').toLowerCase();
            const group = (s.groupNumber ?? '').toString().toLowerCase();
            const company = (s.companyName ?? '').toLowerCase();
            const profession = (s.professionName ?? '').toLowerCase();
            const curator = (s.curator ?? '').toLowerCase();

            return (
                fio.includes(q) ||
                passport.includes(q) ||
                group.includes(q) ||
                company.includes(q) ||
                profession.includes(q) ||
                curator.includes(q)
            );
        });

        renderStudents(filtered);
    }

    /**
     * Загружает детальные данные студента в форму редактирования
     * @param {string} studentId - ID студента
     */
    async function loadStudentData(studentId) {
        try {
            const response = await fetch(`${API_BASE_URL}/student?idStudent=${studentId}`);
            const data = await response.json();

            console.log('Загруженные данные студента:', data);

            // Очищаем форму перед заполнением
            clearForm(editEmployeeForm);

            // Заполняем поля персональных данных
            if (data.personalData) {
                document.getElementById('edit_surname').value = data.personalData.surname || '';
                document.getElementById('edit_surname_en').value = data.personalData.surnameEn || '';
                document.getElementById('edit_name').value = data.personalData.name || '';
                document.getElementById('edit_name_en').value = data.personalData.nameEn || '';
                document.getElementById('edit_patronymic').value = data.personalData.patronymic || '';
                document.getElementById('edit_patronymic_en').value = data.personalData.patronymicEn || '';
                document.getElementById('edit_birth_date').value = data.personalData.birthday || '';
                document.getElementById('edit_passport_series').value = data.personalData.passportSeries || '';
                document.getElementById('edit_passport_number').value = data.personalData.passportNumber || '';
                document.getElementById('edit_passport_issue_date').value = data.personalData.passportDateOfIssue || '';
                document.getElementById('edit_passport_expiry_date').value = data.personalData.passportDateEnd || '';
                document.getElementById('edit_birth_place').value = data.personalData.placeOfBirth || '';
                document.getElementById('edit_registration_city').value = data.personalData.cityOfRegistration || '';
                document.getElementById('edit_registration_address').value = data.personalData.addressRegistration || '';
                document.getElementById('edit_registration_zip').value = data.personalData.addressRegistrationIndex || '';
            }

            // Заполняем поля финансовых документов
            if (data.financeDoc) {
                document.getElementById('edit_payment_contribution').checked = data.financeDoc.paymentOfContribution || false;
                document.getElementById('edit_payment_contribution_year').checked = data.financeDoc.paymentOfContributionYear || false;
                document.getElementById('edit_receipt_number').value = data.financeDoc.checkNumber || '';
                document.getElementById('edit_receipt_date').value = data.financeDoc.checkDate || '';
                document.getElementById('edit_card_ready').checked = data.financeDoc.cardIsReady || false;
                document.getElementById('edit_card_get').checked = data.financeDoc.cardIsGet || false;
            }

            // Заполняем поля договоров
            if (data.contract) {
                document.getElementById('edit_uvm_contract_number').value = data.contract.numberUVM || '';
                document.getElementById('edit_tripartite_contract_number').value = data.contract.number3Party || '';
                document.getElementById('edit_tripartite_contract_date').value = data.contract.date3Party || '';
                document.getElementById('edit_bipartite_contract_number').value = data.contract.number2Party || '';
                document.getElementById('edit_bipartite_contract_date').value = data.contract.date2Party || '';
                document.getElementById('edit_group_number').value = data.contract.groupNumber || '';
                document.getElementById('edit_shipment_date').value = data.contract.dateOfDispatch || '';
                document.getElementById('edit_postal_company').value = data.contract.mailCompany || '';
                document.getElementById('edit_return_date').value = data.contract.dateReturn || '';
            }

            // Заполняем поля визы
            if (data.visa) {
                document.getElementById('edit_invitation_number').value = data.visa.inviteNumber || '';
                document.getElementById('edit_arrival_date').value = data.visa.arrivalDate || '';
                document.getElementById('edit_visa_id').value = data.visa.visaId || '';
                document.getElementById('edit_visa_form_series').value = data.visa.visaSeries || '';
                document.getElementById('edit_visa_number').value = data.visa.visaNumber || '';
                document.getElementById('edit_visa_issue_date').value = data.visa.visaIssueDate || '';
                document.getElementById('edit_visa_receipt_date').value = data.visa.visaReceiptDate || '';
                document.getElementById('edit_visa_expiry_date').value = data.visa.visaValidityDate || '';
            }

            // Заполняем поля работы
            if (data.student) {
                document.getElementById('edit_company').value = data.student.companyId || '';
                document.getElementById('edit_profession').value = data.student.professionId || '';
                document.getElementById('edit_curator').value = data.student.curatorId || '';

                // Если выбрана компания, загружаем её данные
                if (data.student.companyId) {
                    try {
                        const companyResponse = await fetch(`${API_BASE_URL}/company?idCompany=${data.student.companyId}`);
                        const companyData = await companyResponse.json();
                        document.getElementById('edit_director').value = companyData.director || '';
                        document.getElementById('edit_company_address').value = companyData.companyAddress || '';
                        document.getElementById('edit_practice_address').value = companyData.practiceAddress || '';
                    } catch (error) {
                        console.error('Ошибка загрузки данных компании:', error);
                    }
                }

                // Если выбрана профессия, загружаем её данные
                if (data.student.professionId) {
                    try {
                        const professionResponse = await fetch(`${API_BASE_URL}/profession/profession?id=${data.student.professionId}`);
                        const professionData = await professionResponse.json();
                        document.getElementById('edit_profession_number').value = professionData.professionNumber || '';
                    } catch (error) {
                        console.error('Ошибка загрузки данных профессии:', error);
                    }
                }
            }

        } catch (error) {
            console.error('Ошибка загрузки данных студента:', error);
            throw error; // Пробрасываем ошибку, чтобы ее поймал обработчик клика
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
            closeModal(authModal);
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
        disableButton(submitEmployeeBtn, 'Сохранение...'); // <-- ИЗМЕНЕНИЕ

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
            const response = await fetch(`${API_BASE_URL}/student?count=${count}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                showSuccessMessage('Сотрудник успешно добавлен');
                closeModal(employeeModal);
                clearForm(employeeForm);
                loadStudents();
            } else {
                throw new Error('Ошибка при добавлении сотрудника');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            showErrorMessage('Произошла ошибка при добавлении сотрудника');
        } finally {
            enableButton(submitEmployeeBtn); // <-- ИЗМЕНЕНИЕ
        }
    });

    // Обработка формы редактирования сотрудника
    editEmployeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        disableButton(submitEditEmployeeBtn, 'Обновление...'); // <-- ИЗМЕНЕНИЕ

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
            const response = await fetch(`${API_BASE_URL}/student`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            currentStudentId = null;

            if (response.ok) {
                showSuccessMessage('Данные сотрудника успешно обновлены');
                closeModal(editEmployeeModal);
                loadStudents();
            } else {
                throw new Error('Ошибка при обновлении данных сотрудника');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            showErrorMessage('Произошла ошибка при обновлении данных сотрудника');
        } finally {
            enableButton(submitEditEmployeeBtn); // <-- ИЗМЕНЕНИЕ
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
                openModal(editEmployeeModal);
            } catch (error) {
                console.error('Ошибка загрузки данных студента:', error);
                showErrorMessage('Ошибка загрузки данных студента');
            }
            return; // Выходим, чтобы не обработать кнопку удаления
        }

        // Кнопка Удалить
        const deleteButton = e.target.closest('.delete-employee-btn');
        if (deleteButton) {
            const studentId = deleteButton.dataset.studentId;
            console.log('Удаление студента с ID:', studentId);
            currentStudentIdToDelete = studentId;
            openModal(deleteModal);
        }
    });

    // Обработка подтверждения удаления
    confirmDeleteBtn.addEventListener('click', async () => {
        if (!currentStudentIdToDelete) return;

        const idStudents = [currentStudentIdToDelete];

        try {
            const response = await fetch(`${API_BASE_URL}/student`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(idStudents)
            });

            if (response.ok) {
                loadStudents();
                closeModal(deleteModal);
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
    authBtn.addEventListener('click', () => openModal(authModal));
    closeModalBtn.addEventListener('click', () => closeModal(authModal));

    // Окно добавления сотрудника
    addEmployeeBtn.addEventListener('click', () => openModal(employeeModal));
    closeEmployeeModalBtn.addEventListener('click', () => {
        closeModal(employeeModal);
        clearForm(employeeForm);
    });
    cancelEmployeeBtn.addEventListener('click', () => {
        closeModal(employeeModal);
        clearForm(employeeForm);
    });

    // Окно редактирования сотрудника
    closeEditEmployeeModalBtn.addEventListener('click', () => closeModal(editEmployeeModal));
    cancelEditEmployeeBtn.addEventListener('click', () => closeModal(editEmployeeModal));

    // Окно удаления
    closeDeleteModalBtn.addEventListener('click', () => closeModal(deleteModal));
    cancelDeleteBtn.addEventListener('click', () => closeModal(deleteModal));

    // Закрытие модальных окон по клику на фон
    window.addEventListener('click', (e) => {
        if (e.target === authModal) closeModal(authModal);
        if (e.target === deleteModal) closeModal(deleteModal);
        if (e.target === employeeModal) {
            closeModal(employeeModal);
            clearForm(employeeForm);
        }
        if (e.target === editEmployeeModal) {
            closeModal(editEmployeeModal);
        }
    });

    // --- Инициализация вкладок ---
    setupTabs(employeeModal, '.tab-btn', '.tab-content');
    setupTabs(editEmployeeModal, '.edit-tab-btn', '.edit-tab-content');

    // --- Первичная загрузка данных ---
    loadStudents();
    // Поиск по таблице
    if (searchInput) {
        searchInput.addEventListener('input', (e) => filterAndRender(e.target.value));
    }
    // Загружаем компании для обеих форм
    loadCompanies('company', 'director', 'company_address', 'practice_address');
    loadCompanies('edit_company', 'edit_director', 'edit_company_address', 'edit_practice_address');
    // Загружаем профессии для обеих форм
    loadProfessions('profession', 'profession_number');
    loadProfessions('edit_profession', 'edit_profession_number');

});