/**
 * Утилиты для работы с UI и формами
 */

/**
 * Открывает модальное окно и блюрит фон
 * @param {HTMLElement} modalElement - Элемент модального окна
 * @param {HTMLElement} mainContent - Основной контент страницы
 * @param {HTMLElement} header - Заголовок страницы
 */
export function openModal(modalElement, mainContent, header) {
    modalElement.style.display = 'flex';
    mainContent.classList.add('blur-background');
    header.classList.add('blur-background');
}

/**
 * Закрывает модальное окно и убирает блюр
 * @param {HTMLElement} modalElement - Элемент модального окна
 * @param {HTMLElement} mainContent - Основной контент страницы
 * @param {HTMLElement} header - Заголовок страницы
 */
export function closeModal(modalElement, mainContent, header) {
    modalElement.style.display = 'none';
    mainContent.classList.remove('blur-background');
    header.classList.remove('blur-background');
}

/**
 * Показывает всплывающее уведомление об успехе
 * @param {string} message - Текст сообщения
 */
export function showSuccessMessage(message) {
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
export function showErrorMessage(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

/**
 * Отключает кнопку и показывает индикатор загрузки
 * @param {HTMLButtonElement} button - Элемент кнопки
 * @param {string} loadingText - Текст для отображения во время загрузки
 */
export function disableButton(button, loadingText = 'Загрузка...') {
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
export function enableButton(button) {
    if (button.dataset.originalHtml) {
        button.innerHTML = button.dataset.originalHtml;
    }
    button.disabled = false;
}

/**
 * Получает значение из поля, возвращая null если оно пустое
 * @param {string} elementId - ID элемента
 * @returns {string|null}
 */
export function getValue(elementId) {
    const element = document.getElementById(elementId);
    if (!element) return null;
    const value = element.value;
    return value.trim() === '' ? null : value;
}

/**
 * Очищает все поля ввода, чекбоксы и селекты внутри формы
 * @param {HTMLElement} formElement - Элемент формы
 */
export function clearForm(formElement) {
    formElement.reset(); // Самый простой способ сбросить форму

    // Дополнительно сбрасываем "readonly" поля, которые не сбрасываются .reset()
    const readonlyInputs = formElement.querySelectorAll('input[readonly]');
    readonlyInputs.forEach(input => input.value = '');
}

/**
 * Создает и добавляет модальное окно подтверждения удаления в DOM
 * @returns {HTMLElement}
 */
export function createDeleteModal() {
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
export function setupTabs(parentElement, btnSelector, contentSelector) {
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

