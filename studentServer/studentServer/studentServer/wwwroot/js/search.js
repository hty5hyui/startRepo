/**
 * Модуль поиска студентов
 */

// Определение полей для поиска (имена полей соответствуют C# свойствам)
export const searchFields = [
    { key: 'Surname', label: 'Фамилия', type: 'string' },
    { key: 'Name', label: 'Имя', type: 'string' },
    { key: 'Patronymic', label: 'Отчество', type: 'string' },
    { key: 'SurnameEn', label: 'Фамилия (EN)', type: 'string' },
    { key: 'NameEn', label: 'Имя (EN)', type: 'string' },
    { key: 'PatronymicEn', label: 'Отчество (EN)', type: 'string' },
    { key: 'Birthday', label: 'Дата рождения', type: 'date' },
    { key: 'PassportSeries', label: 'Серия паспорта', type: 'string' },
    { key: 'PassportNumber', label: 'Номер паспорта', type: 'string' },
    { key: 'PassportDateOfIssue', label: 'Дата выдачи паспорта', type: 'date' },
    { key: 'PassportDateEnd', label: 'Дата окончания паспорта', type: 'date' },
    { key: 'PlaceOfBirth', label: 'Место рождения', type: 'string' },
    { key: 'CityOfRegistration', label: 'Город прописки', type: 'string' },
    { key: 'AddressRegistration', label: 'Адрес прописки', type: 'string' },
    { key: 'AddressRegistrationIndex', label: 'Индекс адреса прописки', type: 'string' },
    { key: 'PaymentOfContribution', label: 'Оплата взноса', type: 'bool' },
    { key: 'PaymentOfContributionYear', label: 'Оплата годового взноса', type: 'bool' },
    { key: 'CheckNumber', label: 'Номер квитанции', type: 'string' },
    { key: 'CheckDate', label: 'Дата квитанции', type: 'date' },
    { key: 'CardIsReady', label: 'Оформление карты', type: 'bool' },
    { key: 'CardIsGet', label: 'Выдача карты', type: 'bool' },
    { key: 'NumberUVM', label: 'Номер договора УВМ', type: 'string' },
    { key: 'Number3Party', label: 'Номер 3-х стороннего договора', type: 'string' },
    { key: 'Date3Party', label: 'Дата 3-х стороннего договора', type: 'date' },
    { key: 'Number2Party', label: 'Номер 2-х стороннего договора', type: 'string' },
    { key: 'Date2Party', label: 'Дата 2-х стороннего договора', type: 'date' },
    { key: 'GroupNumber', label: 'Номер группы', type: 'string' },
    { key: 'DateOfDispatch', label: 'Дата отправки', type: 'date' },
    { key: 'MailCompany', label: 'Почтовая компания', type: 'string' },
    { key: 'DateReturn', label: 'Дата возврата', type: 'date' },
    { key: 'InviteNumber', label: 'Номер приглашения', type: 'string' },
    { key: 'ArrivalDate', label: 'Дата прибытия', type: 'date' },
    { key: 'VisaId', label: 'Идентификатор визы', type: 'string' },
    { key: 'VisaSeries', label: 'Серия визы', type: 'string' },
    { key: 'VisaNumber', label: 'Номер визы', type: 'string' },
    { key: 'VisaIssueDate', label: 'Дата выдачи визы', type: 'date' },
    { key: 'VisaReceiptDate', label: 'Дата получения визы', type: 'date' },
    { key: 'VisaValidityDate', label: 'Виза действительна до', type: 'date' },
    { key: 'CompanyName', label: 'Название компании', type: 'string' },
    { key: 'PracticeAddress', label: 'Адрес практики', type: 'string' },
    { key: 'INN', label: 'ИНН', type: 'string' },
    { key: 'KPP', label: 'КПП', type: 'string' },
    { key: 'OGRN', label: 'ОГРН', type: 'string' },
    { key: 'PaymantAccount', label: 'Расчетный счет', type: 'string' },
    { key: 'Bank', label: 'Банк', type: 'string' },
    { key: 'CorrespondentAccount', label: 'Корреспондентский счет', type: 'string' },
    { key: 'BIK', label: 'БИК', type: 'string' },
    { key: 'CompanyMail', label: 'Почта компании', type: 'string' },
    { key: 'Director', label: 'Директор', type: 'string' },
    { key: 'HeadOfTheCompany', label: 'Руководитель компании', type: 'string' },
    { key: 'CompanyAddress', label: 'Адрес компании', type: 'string' },
    { key: 'ProfessionName', label: 'Название профессии', type: 'string' },
    { key: 'ProfessionNumber', label: 'Номер профессии', type: 'string' },
    { key: 'CuratorName', label: 'Имя куратора', type: 'string' }
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
                // Восстанавливаем стандартные режимы для дат
                modeSelect.innerHTML = `
                    <option value="contains">Содержит</option>
                    <option value="notEmpty">Не пусто</option>
                    <option value="empty">Пусто</option>
                    <option value="greater">Больше</option>
                    <option value="less">Меньше</option>
                `;
            } else if (selectedField.type === 'bool') {
                // Для булевых полей используем выбор "Да"/"Нет"
                valueInput.style.display = 'none';
                modeSelect.innerHTML = `
                    <option value="true">Да</option>
                    <option value="false">Нет</option>
                `;
            } else {
                valueInput.type = 'text';
                valueInput.placeholder = 'Значение';
                valueInput.style.display = 'block';
                // Восстанавливаем стандартные режимы для строк
                modeSelect.innerHTML = `
                    <option value="contains">Содержит</option>
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
 * Собирает данные поиска и формирует searchFilter для запроса
 * 
 * Примечание: searchFilter соответствует структуре C# класса.
 * Сервер должен интерпретировать режимы поиска:
 * - "Пусто" (empty): значение null
 * - "Не пусто" (notEmpty): специальные маркеры в зависимости от типа поля
 * - "Содержит" (contains): значение для поиска по вхождению
 * - "Больше" (greater) / "Меньше" (less): значение для сравнения
 * 
 * Для режимов "Больше" и "Меньше" сервер должен определить операцию сравнения
 * на основе типа поля (дата, число, строка).
 * 
 * @returns {Object|null} объект searchFilter или null, если нет критериев поиска
 */
export function buildSearchFilter(searchFieldsContainer) {
    const searchFilter = {};
    
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
        if (fieldInfo.type === 'bool') {
            // Для булевых полей используем значение из режима (true/false)
            searchFilter[fieldKey] = mode === 'true';
        } else if (mode === 'empty') {
            // Для "Пусто" передаем null
            searchFilter[fieldKey] = null;
        } else if (mode === 'notEmpty') {
            // Для "Не пусто" - передаем специальное значение
            // Сервер должен интерпретировать это как "поле не пустое"
            if (fieldInfo.type === 'date') {
                // Для дат передаем минимальную дату как индикатор "не пусто"
                searchFilter[fieldKey] = '1900-01-01';
            } else {
                // Для строк передаем пустую строку (не null)
                searchFilter[fieldKey] = '';
            }
        } else if (value) {
            // Для других режимов нужное значение
            if (fieldInfo.type === 'date') {
                // Для дат "Больше" и "Меньше" передаем дату
                searchFilter[fieldKey] = value; // Дата в формате YYYY-MM-DD
            } else {
                // Для строковых полей
                if (mode === 'contains') {
                    searchFilter[fieldKey] = value; // "Содержит" - передаем значение как есть
                } else if (mode === 'greater' || mode === 'less') {
                    // Для "Больше" и "Меньше" строковых полей также передаем значение
                    // Сервер должен интерпретировать это соответственно
                    searchFilter[fieldKey] = value;
                } else {
                    searchFilter[fieldKey] = value;
                }
            }
        }
    });

    // Возвращаем null если нет критериев поиска
    return Object.keys(searchFilter).length > 0 ? searchFilter : null;
}

/**
 * Очищает все поля поиска
 */
export function clearSearch(searchFieldsContainer, loadStudents) {
    searchFieldsContainer.innerHTML = '';
    searchFieldCounter = 0;
    loadStudents();
}

