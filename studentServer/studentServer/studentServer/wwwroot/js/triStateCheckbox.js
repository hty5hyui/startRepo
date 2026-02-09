/**
 * Модуль для работы с трехпозиционными чекбоксами (null, true, false)
 * Используется для группового редактирования
 */

/**
 * Создает обертку для трехпозиционного чекбокса
 * @param {HTMLInputElement} checkbox - оригинальный чекбокс
 */
export function createTriStateCheckbox(checkbox) {
    // Проверяем, не создана ли уже обертка для этого чекбокса
    const existingContainer = checkbox.parentNode.querySelector('.tri-state-checkbox-container');
    if (existingContainer) {
        // Удаляем старую обертку
        existingContainer.remove();
    }
    
    // Создаем контейнер
    const container = document.createElement('div');
    container.className = 'tri-state-checkbox-container';
    container.dataset.checkboxId = checkbox.id;
    
    // Создаем визуальный элемент
    const visual = document.createElement('div');
    visual.className = 'tri-state-visual';
    visual.dataset.state = 'null'; // Начальное состояние: null
    
    // Создаем иконку
    const icon = document.createElement('i');
    icon.className = 'fas fa-minus'; // Начальная иконка для null
    visual.appendChild(icon);
    
    // Создаем текстовую метку состояния
    const stateLabel = document.createElement('span');
    stateLabel.className = 'tri-state-label';
    stateLabel.textContent = 'не изменять';
    
    // Показываем оригинальный чекбокс (но он будет скрыт через CSS или стиль)
    checkbox.style.display = 'none';
    
    // Вставляем визуальный элемент перед чекбоксом
    checkbox.parentNode.insertBefore(container, checkbox);
    container.appendChild(visual);
    container.appendChild(stateLabel);
    checkbox.parentNode.insertBefore(checkbox, container.nextSibling);
    
    // Функция обновления визуального состояния
    const updateVisual = (state) => {
        visual.dataset.state = state;
        
        switch (state) {
            case 'null':
                icon.className = 'fas fa-minus';
                visual.style.backgroundColor = '#fbbf24'; // amber-400
                visual.style.borderColor = '#f59e0b'; // amber-500
                stateLabel.textContent = 'не изменять';
                stateLabel.style.color = '#92400e'; // amber-800
                break;
            case 'true':
                icon.className = 'fas fa-check';
                visual.style.backgroundColor = '#10b981'; // green-500
                visual.style.borderColor = '#059669'; // green-600
                stateLabel.textContent = 'да';
                stateLabel.style.color = '#065f46'; // green-800
                break;
            case 'false':
                icon.className = 'fas fa-times';
                visual.style.backgroundColor = '#ef4444'; // red-500
                visual.style.borderColor = '#dc2626'; // red-600
                stateLabel.textContent = 'нет';
                stateLabel.style.color = '#991b1b'; // red-800
                break;
        }
    };
    
    // Обработчик клика для переключения состояний: null -> true -> false -> null
    const handleClick = () => {
        const currentState = visual.dataset.state;
        let newState;
        
        switch (currentState) {
            case 'null':
                newState = 'true';
                checkbox.checked = true;
                checkbox.indeterminate = false;
                break;
            case 'true':
                newState = 'false';
                checkbox.checked = false;
                checkbox.indeterminate = false;
                break;
            case 'false':
                newState = 'null';
                checkbox.checked = false;
                checkbox.indeterminate = true;
                break;
        }
        
        visual.dataset.state = newState;
        updateVisual(newState);
        
        // Генерируем событие change и input для отслеживания изменений
        const changeEvent = new Event('change', { bubbles: true });
        const inputEvent = new Event('input', { bubbles: true });
        checkbox.dispatchEvent(changeEvent);
        checkbox.dispatchEvent(inputEvent);
    };
    
    visual.addEventListener('click', handleClick);
    
    // Инициализация
    updateVisual('null');
    checkbox.indeterminate = true;
    
    return {
        getState: () => visual.dataset.state,
        setState: (state) => {
            visual.dataset.state = state;
            updateVisual(state);
            
            if (state === 'true') {
                checkbox.checked = true;
                checkbox.indeterminate = false;
            } else if (state === 'false') {
                checkbox.checked = false;
                checkbox.indeterminate = false;
            } else {
                checkbox.checked = false;
                checkbox.indeterminate = true;
            }
        }
    };
}

/**
 * Инициализирует все чекбоксы в форме как трехпозиционные
 * @param {HTMLFormElement} form - форма
 * @param {Array<string>} checkboxIds - массив ID чекбоксов для преобразования
 */
export function initTriStateCheckboxes(form, checkboxIds) {
    const controllers = {};
    
    checkboxIds.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            controllers[id] = createTriStateCheckbox(checkbox);
        }
    });
    
    return controllers;
}

/**
 * Получает значение трехпозиционного чекбокса
 * @param {string} checkboxId - ID чекбокса
 * @returns {boolean|null} - true, false или null
 */
export function getTriStateValue(checkboxId) {
    const checkbox = document.getElementById(checkboxId);
    if (!checkbox) return null;
    
    // Ищем контейнер трехпозиционного чекбокса
    const parent = checkbox.parentNode;
    const container = parent.querySelector(`.tri-state-checkbox-container[data-checkbox-id="${checkboxId}"]`);
    
    if (!container) {
        // Обычный чекбокс
        return checkbox.checked;
    }
    
    const visual = container.querySelector('.tri-state-visual');
    if (!visual) return checkbox.checked;
    
    const state = visual.dataset.state;
    if (state === 'null') return null;
    return state === 'true';
}

/**
 * Сбрасывает все трехпозиционные чекбоксы в состояние null
 * @param {Object} controllers - объект с контроллерами чекбоксов
 */
export function resetTriStateCheckboxes(controllers) {
    if (controllers) {
        Object.values(controllers).forEach(controller => {
            if (controller && controller.setState) {
                controller.setState('null');
            }
        });
    }
}

/**
 * Создает трехпозиционный элемент для select
 * @param {HTMLSelectElement} select - оригинальный select элемент
 * @param {Object} labels - объект с метками для состояний { null: string, true: string, false: string }
 * @returns {Object} контроллер для управления состоянием
 */
export function createTriStateSelect(select, labels = { null: 'не изменять', true: 'да', false: 'нет' }) {
    // Проверяем, не создана ли уже обертка для этого select
    const existingContainer = select.parentNode.querySelector(`.tri-state-select-container[data-select-id="${select.id}"]`);
    if (existingContainer) {
        existingContainer.remove();
    }
    
    // Создаем скрытый чекбокс для хранения состояния
    const hiddenCheckbox = document.createElement('input');
    hiddenCheckbox.type = 'checkbox';
    hiddenCheckbox.id = `${select.id}_hidden_checkbox`;
    hiddenCheckbox.style.display = 'none';
    
    // Создаем контейнер
    const container = document.createElement('div');
    container.className = 'tri-state-select-container';
    container.dataset.selectId = select.id;
    
    // Создаем визуальный элемент
    const visual = document.createElement('div');
    visual.className = 'tri-state-visual';
    visual.dataset.state = 'null';
    
    // Создаем иконку
    const icon = document.createElement('i');
    icon.className = 'fas fa-minus';
    visual.appendChild(icon);
    
    // Создаем текстовую метку состояния
    const stateLabel = document.createElement('span');
    stateLabel.className = 'tri-state-label';
    stateLabel.textContent = labels.null || 'не изменять';
    
    // Скрываем оригинальный select
    select.style.display = 'none';
    
    // Вставляем элементы
    select.parentNode.insertBefore(container, select);
    container.appendChild(visual);
    container.appendChild(stateLabel);
    select.parentNode.insertBefore(hiddenCheckbox, select);
    
    // Функция обновления визуального состояния
    const updateVisual = (state) => {
        visual.dataset.state = state;
        
        switch (state) {
            case 'null':
                icon.className = 'fas fa-minus';
                visual.style.backgroundColor = '#fbbf24'; // amber-400
                visual.style.borderColor = '#f59e0b'; // amber-500
                stateLabel.textContent = labels.null || 'не изменять';
                stateLabel.style.color = '#92400e'; // amber-800
                hiddenCheckbox.checked = false;
                hiddenCheckbox.indeterminate = true;
                break;
            case 'true':
                icon.className = 'fas fa-check';
                visual.style.backgroundColor = '#10b981'; // green-500
                visual.style.borderColor = '#059669'; // green-600
                stateLabel.textContent = labels.true || 'да';
                stateLabel.style.color = '#065f46'; // green-800
                hiddenCheckbox.checked = true;
                hiddenCheckbox.indeterminate = false;
                break;
            case 'false':
                icon.className = 'fas fa-times';
                visual.style.backgroundColor = '#ef4444'; // red-500
                visual.style.borderColor = '#dc2626'; // red-600
                stateLabel.textContent = labels.false || 'нет';
                stateLabel.style.color = '#991b1b'; // red-800
                hiddenCheckbox.checked = false;
                hiddenCheckbox.indeterminate = false;
                break;
        }
    };
    
    // Обработчик клика для переключения состояний: null -> true -> false -> null
    const handleClick = () => {
        const currentState = visual.dataset.state;
        let newState;
        
        switch (currentState) {
            case 'null':
                newState = 'true';
                break;
            case 'true':
                newState = 'false';
                break;
            case 'false':
                newState = 'null';
                break;
        }
        
        visual.dataset.state = newState;
        updateVisual(newState);
        
        // Генерируем событие change и input для отслеживания изменений
        const changeEvent = new Event('change', { bubbles: true });
        const inputEvent = new Event('input', { bubbles: true });
        hiddenCheckbox.dispatchEvent(changeEvent);
        hiddenCheckbox.dispatchEvent(inputEvent);
    };
    
    visual.addEventListener('click', handleClick);
    
    // Инициализация
    updateVisual('null');
    
    return {
        getState: () => visual.dataset.state,
        setState: (state) => {
            visual.dataset.state = state;
            updateVisual(state);
        },
        getCheckboxId: () => hiddenCheckbox.id
    };
}

/**
 * Инициализирует select элементы как трехпозиционные
 * @param {HTMLFormElement} form - форма
 * @param {Array<Object>} selectConfigs - массив конфигураций { id: string, labels: { null, true, false } }
 * @returns {Object} объект с контроллерами
 */
export function initTriStateSelects(form, selectConfigs) {
    const controllers = {};
    
    selectConfigs.forEach(config => {
        const select = document.getElementById(config.id);
        if (select) {
            controllers[config.id] = createTriStateSelect(select, config.labels);
        }
    });
    
    return controllers;
}

/**
 * Получает значение трехпозиционного select
 * @param {string} selectId - ID select элемента
 * @returns {boolean|null} - true, false или null
 */
export function getTriStateSelectValue(selectId) {
    const select = document.getElementById(selectId);
    if (!select) return null;
    
    // Ищем контейнер трехпозиционного select
    const parent = select.parentNode;
    const container = parent.querySelector(`.tri-state-select-container[data-select-id="${selectId}"]`);
    
    if (!container) {
        // Обычный select
        const value = select.value;
        if (value === '' || value === null || value === undefined) return null;
        return value === 'true' || value === true;
    }
    
    const visual = container.querySelector('.tri-state-visual');
    if (!visual) {
        const value = select.value;
        if (value === '' || value === null || value === undefined) return null;
        return value === 'true' || value === true;
    }
    
    const state = visual.dataset.state;
    if (state === 'null') return null;
    return state === 'true';
}

/**
 * Удаляет все трехпозиционные чекбоксы
 * @param {Array<string>} checkboxIds - массив ID чекбоксов
 */
export function removeTriStateCheckboxes(checkboxIds) {
    checkboxIds.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            // Показываем оригинальный чекбокс
            checkbox.style.display = '';
            
            // Удаляем контейнер трехпозиционного чекбокса
            const parent = checkbox.parentNode;
            const container = parent.querySelector(`.tri-state-checkbox-container[data-checkbox-id="${id}"]`);
            if (container) {
                container.remove();
            }
            
            // Сбрасываем состояние чекбокса
            checkbox.checked = false;
            checkbox.indeterminate = false;
        }
    });
}

/**
 * Удаляет все трехпозиционные select элементы
 * @param {Array<string>} selectIds - массив ID select элементов
 */
export function removeTriStateSelects(selectIds) {
    selectIds.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            // Показываем оригинальный select
            select.style.display = '';
            
            // Удаляем контейнер трехпозиционного select
            const parent = select.parentNode;
            const container = parent.querySelector(`.tri-state-select-container[data-select-id="${id}"]`);
            if (container) {
                container.remove();
            }
            
            // Удаляем скрытый чекбокс
            const hiddenCheckbox = document.getElementById(`${id}_hidden_checkbox`);
            if (hiddenCheckbox) {
                hiddenCheckbox.remove();
            }
        }
    });
}

