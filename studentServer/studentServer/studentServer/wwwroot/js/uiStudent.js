/**
 * Модуль для работы с UI студентов
 */

/**
 * Рендерит строки таблицы на основе переданного списка студентов
 * @param {Array} students - список студентов для отображения (studentPreviews)
 * @param {HTMLElement} studentsTableBody - элемент tbody таблицы
 * @param {HTMLElement} tableContainer - контейнер таблицы для отображения пустого результата
 * @param {HTMLElement} paginationContainer - контейнер пагинации
 * @param {number} currentPage - текущая страница (для расчета индекса)
 * @param {number} itemsPerPage - количество элементов на странице
 */
export function renderStudents(students, studentsTableBody, tableContainer, paginationContainer, currentPage = 1, itemsPerPage = 30) {
    // Если нет студентов, показываем сообщение "Ничего не найдено"
    if (!students || students.length === 0) {
        const table = tableContainer?.querySelector('table');
        if (table) {
            table.style.display = 'none';
        }
        
        // Скрываем пагинацию
        if (paginationContainer) {
            paginationContainer.style.display = 'none';
        }
        
        // Проверяем, есть ли уже сообщение о пустом результате
        let emptyMessage = tableContainer?.querySelector('.empty-result');
        if (!emptyMessage && tableContainer) {
            emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-result flex flex-col items-center justify-center py-12 px-6';
            emptyMessage.innerHTML = `
                <div class="mb-4">
                    <svg class="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <p class="text-xl font-medium text-gray-600 mb-2">Ничего не найдено</p>
                <p class="text-sm text-gray-500">Попробуйте изменить параметры поиска</p>
            `;
            tableContainer.appendChild(emptyMessage);
        }
        return;
    }
    
    // Показываем пагинацию, если она была скрыта
    if (paginationContainer) {
        paginationContainer.style.display = 'block';
    }
    
    // Скрываем сообщение о пустом результате, если оно есть
    const emptyMessage = tableContainer?.querySelector('.empty-result');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    // Показываем таблицу
    const table = tableContainer?.querySelector('table');
    if (table) {
        table.style.display = 'table';
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    studentsTableBody.innerHTML = students.map((student, index) => `
        <tr class="hover:bg-blue-50 transition">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                <input type="checkbox" class="student-checkbox h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded cursor-pointer" data-student-id="${student.id}" aria-label="Выделить студента">
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${startIndex + index + 1}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                ${[student.surname, student.name, student.patronymic].filter(Boolean).join(' ')}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                ${[student.passportSeries, student.passportNumber].filter(Boolean).join(' ')}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${student.groupNumber ?? ''}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${student.companyName ?? ''}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${student.professionName ?? ''}</td>
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
 * Рендерит пагинацию
 * @param {HTMLElement} paginationContainer - контейнер для пагинации
 * @param {number} currentPage - текущая страница
 * @param {number} pageCount - общее количество страниц
 * @param {Function} onPageChange - функция обработки изменения страницы
 */
export function renderPagination(paginationContainer, currentPage, pageCount, onPageChange) {
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
 * Загружает список компаний в указанный <select>
 * @param {string} selectId - ID элемента <select>
 * @param {string} directorId - ID поля для директора
 * @param {string} addressId - ID поля для адреса компании
 * @param {string} practiceId - ID поля для адреса практики
 * @param {Function} loadCompanyData - функция для загрузки данных компании
 */
export async function loadCompanies(selectId, directorId, addressId, practiceId, loadCompanyDataFn, curatorId = null) {
    try {
        const { loadCompaniesList } = await import('./apiStudent.js');
        const companies = await loadCompaniesList();
        const companySelect = document.getElementById(selectId);

        while (companySelect.options.length > 1) {
            companySelect.remove(1);
        }

        companies.forEach(company => {
            const option = document.createElement('option');
            option.value = company.id;
            option.textContent = company.nameCompanyRF || company.name || '';
            companySelect.appendChild(option);
        });

        companySelect.addEventListener('change', async function () {
            const directorInput = document.getElementById(directorId);
            const addressInput = document.getElementById(addressId);
            const practiceInput = document.getElementById(practiceId);
            const curatorInput = curatorId ? document.getElementById(curatorId) : null;

            if (this.value) {
                try {
                    const companyData = await loadCompanyDataFn(this.value);
                    directorInput.value = companyData.director || '';
                    addressInput.value = companyData.companyAddress || '';
                    practiceInput.value = companyData.practiceAddress || '';
                    if (curatorInput) {
                        curatorInput.value = companyData.curator || '';
                    }
                } catch (error) {
                    console.error('Ошибка загрузки данных компании:', error);
                }
            } else {
                directorInput.value = '';
                addressInput.value = '';
                practiceInput.value = '';
                if (curatorInput) {
                    curatorInput.value = '';
                }
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
 * @param {Function} loadProfessionData - функция для загрузки данных профессии
 */
export async function loadProfessions(selectId, numberId, loadProfessionDataFn) {
    try {
        const { loadProfessionsList } = await import('./apiStudent.js');
        const professions = await loadProfessionsList();
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

        professionSelect.addEventListener('change', function () {
            const numberInput = document.getElementById(numberId);
            const selectedOption = this.options[this.selectedIndex];

            if (selectedOption && selectedOption.dataset.professionNumber) {
                numberInput.value = selectedOption.dataset.professionNumber;
            } else {
                numberInput.value = '';
            }
        });

    } catch (error) {
        console.error('Ошибка загрузки профессий:', error);
    }
}

/**
 * Загружает детальные данные студента в форму редактирования
 * @param {string} studentId - ID студента
 * @param {HTMLElement} editEmployeeForm - форма редактирования
 * @param {Function} loadCompanyData - функция для загрузки данных компании
 * @param {Function} loadProfessionData - функция для загрузки данных профессии
 */
export async function loadStudentDataToForm(studentId, editEmployeeForm, loadCompanyData, loadProfessionData) {
    const { loadStudentData } = await import('./apiStudent.js');
    const { clearForm } = await import('./utils.js');
    const data = await loadStudentData(studentId);

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
        document.getElementById('edit_gender').value = data.personalData.isMan ? 'true' : 'false';
        document.getElementById('edit_passport_series').value = data.personalData.passportSeries || '';
        document.getElementById('edit_passport_number').value = data.personalData.passportNumber || '';
        document.getElementById('edit_passport_issue_date').value = data.personalData.passportDateOfIssue || '';
        document.getElementById('edit_passport_expiry_date').value = data.personalData.passportDateEnd || '';
        document.getElementById('edit_birth_place').value = data.personalData.placeOfBirth || '';
        document.getElementById('edit_registration_city').value = data.personalData.cityOfRegistration || '';
        document.getElementById('edit_registration_address').value = data.personalData.addressRegistration || '';
        document.getElementById('edit_registration_zip').value = data.personalData.addressRegistrationIndex || '';
        document.getElementById('edit_group_number').value = data.personalData.groupNumber || '';
        document.getElementById('edit_is_target').value = data.personalData.isTarget ? 'true' : 'false';
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
        document.getElementById('edit_number_student_university').value = data.contract.numberStudentUniversity || '';
        document.getElementById('edit_date_student_university').value = data.contract.dateStudentUniversity || '';
        document.getElementById('edit_bipartite_contract_number').value = data.contract.number2Party || '';
        document.getElementById('edit_bipartite_contract_date').value = data.contract.date2Party || '';
        document.getElementById('edit_number_2party_request').value = data.contract.number2PartyRequest || '';
        document.getElementById('edit_tripartite_contract_number').value = data.contract.number3Party || '';
        document.getElementById('edit_tripartite_contract_date').value = data.contract.date3Party || '';
        document.getElementById('edit_number_practice').value = data.contract.numberPractice || '';
        document.getElementById('edit_date_practice').value = data.contract.datePractice || '';
        document.getElementById('edit_number_practice_request').value = data.contract.numberPracticeRequest || '';
        document.getElementById('edit_number_registry_send_in_moscow').value = data.contract.numberRegistrySendInMoscow || '';
        document.getElementById('edit_date_registry_send_in_moscow').value = data.contract.dateRegistrySendInMoscow || '';
        document.getElementById('edit_date_of_termination_of_the_contract').value = data.contract.dateOfTerminationOfTheContract || '';
        document.getElementById('edit_organization_of_termination').value = data.contract.organizationOfTermination || '';
    }

    // Заполняем поля визы
    if (data.visa) {
        document.getElementById('edit_invitation_number').value = data.visa.inviteNumber || '';
        document.getElementById('edit_arrival_date').value = data.visa.arrivalDate || '';
        document.getElementById('edit_arrival_invite').value = data.visa.arrivalInvite || '';
        document.getElementById('edit_visa_id').value = data.visa.visaId || '';
        document.getElementById('edit_visa_form_series').value = data.visa.visaSeries || '';
        document.getElementById('edit_visa_number').value = data.visa.visaNumber || '';
        document.getElementById('edit_visa_issue_date').value = data.visa.visaIssueDate || '';
        document.getElementById('edit_visa_receipt_date').value = data.visa.visaReceiptDate || '';
        document.getElementById('edit_visa_expiry_date').value = data.visa.visaValidityDate || '';
        document.getElementById('edit_migration_card_series').value = data.visa.migrationСardSeries || '';
        document.getElementById('edit_migration_card_number').value = data.visa.migrationСardNumber || '';
        document.getElementById('edit_migration_card_from_date').value = data.visa.migrationСardFromDate || '';
        document.getElementById('edit_migration_card_to_date').value = data.visa.migrationСardToDate || '';
    }

    // Заполняем поля работы
    if (data.student) {
        document.getElementById('edit_company').value = data.student.companyId || '';
        document.getElementById('edit_profession').value = data.student.professionId || '';

        // Если выбрана компания, загружаем её данные
        if (data.student.companyId) {
            try {
                const companyData = await loadCompanyData(data.student.companyId);
                document.getElementById('edit_director').value = companyData.director || '';
                document.getElementById('edit_company_address').value = companyData.companyAddress || '';
                document.getElementById('edit_practice_address').value = companyData.practiceAddress || '';
                document.getElementById('edit_curator').value = companyData.curator || '';
            } catch (error) {
                console.error('Ошибка загрузки данных компании:', error);
            }
        }

        // Если выбрана профессия, загружаем её данные
        if (data.student.professionId) {
            try {
                const professionData = await loadProfessionData(data.student.professionId);
                document.getElementById('edit_profession_number').value = professionData.professionNumber || '';
            } catch (error) {
                console.error('Ошибка загрузки данных профессии:', error);
            }
        }
    }
}

