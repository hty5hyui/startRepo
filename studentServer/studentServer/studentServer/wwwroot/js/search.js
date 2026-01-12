/**
 * Модуль поиска студентов
 */

// Определение полей для поиска (имена полей соответствуют C# свойствам)
export const searchFields = [
        { key: 'PersonalData.Surname', label: 'Фамилия', type: 'string' },
        { key: 'PersonalData.Name', label: 'Имя', type: 'string' },
        { key: 'PersonalData.Patronymic', label: 'Отчество', type: 'string' },
        { key: 'PersonalData.SurnameEn', label: 'Фамилия (EN)', type: 'string' },
        { key: 'PersonalData.NameEn', label: 'Имя (EN)', type: 'string' },
        { key: 'PersonalData.PatronymicEn', label: 'Отчество (EN)', type: 'string' },
        { key: 'PersonalData.Birthday', label: 'Дата рождения', type: 'date' },
        { key: 'PersonalData.isMan', label: 'Пол', type: 'bool' },
        { key: 'PersonalData.PassportSeries', label: 'Серия паспорта', type: 'string' },
        { key: 'PersonalData.PassportNumber', label: 'Номер паспорта', type: 'string' },
        { key: 'PersonalData.PassportDateOfIssue', label: 'Дата выдачи паспорта', type: 'date' },
        { key: 'PersonalData.PassportDateEnd', label: 'Дата окончания паспорта', type: 'date' },
        { key: 'PersonalData.PlaceOfBirth', label: 'Место рождения', type: 'string' },
        { key: 'PersonalData.CityOfRegistration', label: 'Город прописки', type: 'string' },
        { key: 'PersonalData.AddressRegistration', label: 'Адрес прописки', type: 'string' },
        { key: 'PersonalData.AddressRegistrationIndex', label: 'Индекс адреса прописки', type: 'string' },
        { key: 'PersonalData.isTarget', label: 'Тип обучения', type: 'bool' },
        { key: 'PersonalData.GroupNumber', label: 'Номер группы', type: 'string' },
        { key: 'FinanceDoc.PaymentOfContribution', label: 'Оплата взноса', type: 'bool' },
        { key: 'FinanceDoc.PaymentOfContributionYear', label: 'Оплата годового взноса', type: 'bool' },
        { key: 'FinanceDoc.CheckNumber', label: 'Номер квитанции', type: 'string' },
        { key: 'FinanceDoc.CheckDate', label: 'Дата квитанции', type: 'date' },
        { key: 'FinanceDoc.CardIsReady', label: 'Оформление карты', type: 'bool' },
        { key: 'FinanceDoc.CardIsGet', label: 'Выдача карты', type: 'bool' },
        { key: 'Contract.NumberUVM', label: 'Номер договора УВМ', type: 'string' },
        { key: 'Contract.NumberStudentUniversity', label: 'Номер договора студент-университет', type: 'string' },
        { key: 'Contract.DateStudentUniversity', label: 'Дата договора студент-университет', type: 'date' },
        { key: 'Contract.Number2Party', label: 'Номер 2-х стороннего договора', type: 'string' },
        { key: 'Contract.Date2Party', label: 'Дата 2-х стороннего договора', type: 'date' },
        { key: 'Contract.Number2PartyRequest', label: 'Номер заявки 2-х стороннего договора', type: 'string' },
        { key: 'Contract.Number3Party', label: 'Номер 3-х стороннего договора', type: 'string' },
        { key: 'Contract.Date3Party', label: 'Дата 3-х стороннего договора', type: 'date' },
        { key: 'Contract.NumberPractice', label: 'Номер договора по практике', type: 'string' },
        { key: 'Contract.DatePractice', label: 'Дата договора по практике', type: 'date' },
        { key: 'Contract.NumberPracticeRequest', label: 'Номер заявки договора по практике', type: 'string' },
        { key: 'Contract.NumberRegistrySendInMoscow', label: 'Номер реестра отправленного в Москву', type: 'string' },
        { key: 'Contract.DateRegistrySendInMoscow', label: 'Дата реестра отправленного в Москву', type: 'date' },
        { key: 'Contract.DateOfTerminationOfTheContract', label: 'Дата расторжения договора', type: 'date' },
        { key: 'Contract.OrganizationOfTermination', label: 'Организация расторжения', type: 'string' },
        { key: 'VISA.InviteNumber', label: 'Номер приглашения', type: 'string' },
        { key: 'VISA.ArrivalDate', label: 'Дата прибытия', type: 'date' },
        { key: 'VISA.VisaId', label: 'Идентификатор визы', type: 'string' },
        { key: 'VISA.VisaSeries', label: 'Серия визы', type: 'string' },
        { key: 'VISA.VisaNumber', label: 'Номер визы', type: 'string' },
        { key: 'VISA.VisaIssueDate', label: 'Дата выдачи визы', type: 'date' },
        { key: 'VISA.VisaReceiptDate', label: 'Дата получения визы', type: 'date' },
        { key: 'VISA.VisaValidityDate', label: 'Виза действительна до', type: 'date' },
        { key: 'VISA.ArrivalInvite', label: 'Прибыл по приглашению', type: 'string' },
        { key: 'VISA.MigrationСardSeries', label: 'Серия миграционной карты', type: 'string' },
        { key: 'VISA.MigrationСardNumber', label: 'Номер миграционной карты', type: 'string' },
        { key: 'VISA.MigrationСardFromDate', label: 'Дата начала действия миграционной карты', type: 'date' },
        { key: 'VISA.MigrationСardToDate', label: 'Дата окончания действия миграционной карты', type: 'date' },
        { key: 'Company.NameCompanyRF', label: 'Название компании РФ', type: 'string' },
        { key: 'Company.NameCompanyKNDR', label: 'Название компании КНДР', type: 'string' },
        { key: 'Company.CompanyActivities', label: 'Деятельность компании', type: 'string' },
        { key: 'Company.PracticeAddress', label: 'Адрес практики', type: 'string' },
        { key: 'Company.INN', label: 'ИНН', type: 'string' },
        { key: 'Company.KPP', label: 'КПП', type: 'string' },
        { key: 'Company.OGRN', label: 'ОГРН', type: 'string' },
        { key: 'Company.PaymantAccount', label: 'Расчетный счет', type: 'string' },
        { key: 'Company.Bank', label: 'Банк', type: 'string' },
        { key: 'Company.CorrespondentAccount', label: 'Корреспондентский счет', type: 'string' },
        { key: 'Company.BIK', label: 'БИК', type: 'string' },
        { key: 'Company.CompanyMail', label: 'Почта компании', type: 'string' },
        { key: 'Company.Director', label: 'Директор', type: 'string' },
        { key: 'Company.PostHeadOfTheCompany', label: 'Должность руководителя компании', type: 'string' },
        { key: 'Company.HeadOfTheCompany', label: 'Руководитель компании', type: 'string' },
        { key: 'Company.CompanyAddress', label: 'Адрес компании', type: 'string' },
        { key: 'Company.Curator', label: 'Куратор', type: 'string' },
        { key: 'Profession.ProfessionName', label: 'Название профессии', type: 'string' },
        { key: 'Profession.ProfessionNumber', label: 'Номер профессии', type: 'string' }
    ];

let searchFieldCounter = 0;

/**
 * Создает новое поле поиска
 */
export function createSearchField() {
    const fieldId = `searchField_${searchFieldCounter++}`;
    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200';
    fieldDiv.id = fieldId;

    // Выбор поля
    const fieldSelect = document.createElement('select');
    fieldSelect.className = 'flex-1 px-3 py-2 border border-blue-200 rounded-lg';
    fieldSelect.innerHTML = '<option value="">Выберите поле...</option>' +
        searchFields.map(f => `<option value="${f.key}">${f.label}</option>`).join('');
    fieldSelect.id = `${fieldId}_field`;

    // Режим поиска
    const modeSelect = document.createElement('select');
    modeSelect.className = 'px-3 py-2 border border-blue-200 rounded-lg';
    modeSelect.id = `${fieldId}_mode`;
    modeSelect.innerHTML = `
        <option value="contains">Содержит</option>
        <option value="equals">Равно</option>
        <option value="notEmpty">Не пусто</option>
        <option value="empty">Пусто</option>
        <option value="greater">Больше</option>
        <option value="less">Меньше</option>
    `;

    // Поле ввода значения
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.className = 'flex-1 px-3 py-2 border border-blue-200 rounded-lg';
    valueInput.placeholder = 'Значение';
    valueInput.id = `${fieldId}_value`;

    // Кнопка удаления
    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition';
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.onclick = () => fieldDiv.remove();

    // Обработчик изменения поля для определения типа (date, bool)
    let currentFieldType = null;
    fieldSelect.addEventListener('change', () => {
        const selectedField = searchFields.find(f => f.key === fieldSelect.value);
        if (selectedField) {
            currentFieldType = selectedField.type;
            if (selectedField.type === 'date') {
                valueInput.type = 'date';
                valueInput.placeholder = 'Выберите дату';
                valueInput.style.display = 'block';
                // Режимы для дат (без "Содержит")
                modeSelect.innerHTML = `
                    <option value="equals">Равно</option>
                    <option value="notEmpty">Не пусто</option>
                    <option value="empty">Пусто</option>
                    <option value="greater">Больше</option>
                    <option value="less">Меньше</option>
                `;
            } else if (selectedField.type === 'bool') {
                // Для булевых полей используем выбор "Да"/"Нет" (только Equals)
                valueInput.style.display = 'none';
                modeSelect.innerHTML = `
                    <option value="true">Да</option>
                    <option value="false">Нет</option>
                `;
            } else if (selectedField.type === 'int') {
                // Для числовых полей (без "Содержит")
                valueInput.type = 'number';
                valueInput.placeholder = 'Введите число';
                valueInput.style.display = 'block';
                modeSelect.innerHTML = `
                    <option value="equals">Равно</option>
                    <option value="notEmpty">Не пусто</option>
                    <option value="empty">Пусто</option>
                    <option value="greater">Больше</option>
                    <option value="less">Меньше</option>
                `;
            } else {
                valueInput.type = 'text';
                valueInput.placeholder = 'Значение';
                valueInput.style.display = 'block';
                // Восстанавливаем стандартные режимы для строк
                modeSelect.innerHTML = `
                    <option value="contains">Содержит</option>
                    <option value="equals">Равно</option>
                    <option value="notEmpty">Не пусто</option>
                    <option value="empty">Пусто</option>
                    <option value="greater">Больше</option>
                    <option value="less">Меньше</option>
                `;
            }
        }
    });

    // Обработчик изменения режима поиска
    modeSelect.addEventListener('change', () => {
        const mode = modeSelect.value;
        
        // Для булевых полей всегда скрываем поле ввода
        if (currentFieldType === 'bool') {
            valueInput.style.display = 'none';
            return;
        }
        
        // Для других типов полей
        if (mode === 'notEmpty' || mode === 'empty') {
            valueInput.style.display = 'none';
        } else {
            valueInput.style.display = 'block';
        }
    });

    fieldDiv.appendChild(fieldSelect);
    fieldDiv.appendChild(modeSelect);
    fieldDiv.appendChild(valueInput);
    fieldDiv.appendChild(removeBtn);

    return fieldDiv;
}

/**
 * Маппинг режимов поиска на MatchMode enum
 */
const matchModeMap = {
    'contains': 'Contains',
    'equals': 'Equals',
    'empty': 'IsNull',
    'notEmpty': 'IsNotNull',
    'greater': 'GreaterThan',
    'less': 'LessThan'
};

/**
 * Собирает данные поиска и формирует массив FilterDescriptor для запроса
 * 
 * @returns {Array<FilterDescriptor>|null} массив FilterDescriptor или null, если нет критериев поиска
 */
export function buildSearchFilter(searchFieldsContainer) {
    const filterDescriptors = [];
    
    // Проверка на существование контейнера
    if (!searchFieldsContainer) {
        console.warn('Контейнер поиска не найден');
        return null;
    }
    
    const fieldDivs = searchFieldsContainer.querySelectorAll('[id^="searchField_"]');
    
    if (fieldDivs.length === 0) {
        console.log('Поля поиска не найдены');
        return null;
    }

    fieldDivs.forEach(fieldDiv => {
        // Используем более надежный поиск - сначала по ID, потом по типу элемента
        let fieldSelect = fieldDiv.querySelector('select[id$="_field"]');
        let modeSelect = fieldDiv.querySelector('select[id$="_mode"]');
        let valueInput = fieldDiv.querySelector('input[id$="_value"]');
        
        // Если не нашли по ID, пробуем найти по позиции (первый select, второй select, input)
        if (!fieldSelect || !modeSelect) {
            const selects = fieldDiv.querySelectorAll('select');
            const inputs = fieldDiv.querySelectorAll('input');
            
            if (selects.length >= 2) {
                fieldSelect = selects[0];
                modeSelect = selects[1];
            }
            if (inputs.length > 0) {
                valueInput = inputs[0];
            }
        }

        // Проверка на существование обязательных элементов
        if (!fieldSelect || !modeSelect) {
            console.warn('Не найдены обязательные элементы поля поиска', fieldDiv);
            return; // Пропускаем это поле, если элементы не найдены
        }

        const fieldKey = fieldSelect.value;
        const mode = modeSelect.value;
        const value = valueInput ? valueInput.value.trim() : '';

        if (!fieldKey) return;

        const fieldInfo = searchFields.find(f => f.key === fieldKey);
        if (!fieldInfo) return;

        // Обработка разных режимов поиска
        let matchMode;
        let filterValue = null;

        if (fieldInfo.type === 'bool') {
            // Для булевых полей используем Equals с boolean значением
            // mode будет "true" или "false" (строки)
            matchMode = 'Equals';
            filterValue = mode === 'true';
        } else if (mode === 'empty') {
            // Для "Пусто" используем IsNull, значение null
            matchMode = 'IsNull';
            filterValue = null;
        } else if (mode === 'notEmpty') {
            // Для "Не пусто" используем IsNotNull, значение null
            matchMode = 'IsNotNull';
            filterValue = null;
        } else {
            // Преобразуем режим поиска в MatchMode для не-булевых полей
            matchMode = matchModeMap[mode];
            if (!matchMode) {
                console.warn(`Неизвестный режим поиска: ${mode}`);
                return;
            }
            
            // Для других режимов нужное значение
            if (value) {
                if (fieldInfo.type === 'date') {
                    // Для дат передаем дату в формате YYYY-MM-DD
                    filterValue = value;
                } else if (fieldInfo.type === 'int') {
                    // Для числовых полей преобразуем в число
                    const numValue = parseInt(value, 10);
                    if (!isNaN(numValue)) {
                        filterValue = numValue;
                    } else {
                        console.warn(`Неверное числовое значение: ${value}`);
                        return; // Пропускаем это поле, если значение не число
                    }
                } else {
                    // Для строковых полей
                    filterValue = value;
                }
            } else {
                // Если нет значения и это не IsNull/IsNotNull, пропускаем
                if (mode !== 'empty' && mode !== 'notEmpty') {
                    return;
                }
            }
        }

        // Создаем FilterDescriptor
        filterDescriptors.push({
            FieldName: fieldKey,
            MatchMode: matchMode,
            Value: filterValue
        });
    });

    // Возвращаем null если нет критериев поиска
    return filterDescriptors.length > 0 ? filterDescriptors : null;
}

/**
 * Очищает все поля поиска
 */
export function clearSearch(searchFieldsContainer, loadStudents) {
    searchFieldsContainer.innerHTML = '';
    searchFieldCounter = 0;
    loadStudents();
}

