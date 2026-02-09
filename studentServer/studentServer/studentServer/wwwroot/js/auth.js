/**
 * Модуль для работы с авторизацией
 */

/**
 * Управление модальным окном авторизации
 */
export class AuthModal {
    constructor() {
        this.authBtn = document.getElementById('authBtn');
        this.authModal = document.getElementById('authModal');
        this.closeModal = document.getElementById('closeModal');
        this.loginForm = document.getElementById('loginForm');
        this.mainContent = document.querySelector('main');
        this.header = document.querySelector('header');
        this.usernameInput = document.getElementById('username');
        this.passwordInput = document.getElementById('password');
        this.submitBtn = this.loginForm?.querySelector('button[type="submit"]');

        // Проверка существования элементов
        if (!this.authBtn || !this.authModal || !this.closeModal || !this.loginForm) {
            console.error('Не найдены необходимые элементы для авторизации');
            return;
        }

        this.init();
    }

    /**
     * Инициализация обработчиков событий
     */
    init() {
        // Убеждаемся, что модальное окно закрыто при загрузке
        this.authModal.style.display = 'none';
        this.authModal.classList.add('hidden');

        // Обработчики событий
        this.authBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.open();
        });

        this.closeModal.addEventListener('click', () => this.close());

        // Закрытие по клику вне модального окна
        window.addEventListener('click', (e) => {
            if (e.target === this.authModal) {
                this.close();
            }
        });

        // Закрытие по нажатию Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.authModal.classList.contains('hidden')) {
                this.close();
            }
        });

        // Обработка формы входа
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(e);
        });
    }

    /**
     * Открывает модальное окно авторизации
     */
    open() {
        this.authModal.style.display = 'flex';
        this.authModal.classList.remove('hidden');
        if (this.mainContent) this.mainContent.classList.add('blur-background');
        if (this.header) this.header.classList.add('blur-background');
        // Фокус на поле логина
        if (this.usernameInput) {
            setTimeout(() => this.usernameInput.focus(), 100);
        }
    }

    /**
     * Закрывает модальное окно авторизации
     */
    close() {
        this.authModal.style.display = 'none';
        this.authModal.classList.add('hidden');
        if (this.mainContent) this.mainContent.classList.remove('blur-background');
        if (this.header) this.header.classList.remove('blur-background');
        // Очищаем форму при закрытии
        if (this.loginForm) this.loginForm.reset();
    }

    /**
     * Валидация формы входа
     */
    validateLoginForm(username, password) {
        if (!username || username.trim().length === 0) {
            this.showErrorMessage('Пожалуйста, введите логин');
            if (this.usernameInput) this.usernameInput.focus();
            return false;
        }
        if (!password || password.length === 0) {
            this.showErrorMessage('Пожалуйста, введите пароль');
            if (this.passwordInput) this.passwordInput.focus();
            return false;
        }
        if (username.trim().length < 3) {
            this.showErrorMessage('Логин должен содержать минимум 3 символа');
            if (this.usernameInput) this.usernameInput.focus();
            return false;
        }
        if (password.length < 3) {
            this.showErrorMessage('Пароль должен содержать минимум 3 символа');
            if (this.passwordInput) this.passwordInput.focus();
            return false;
        }
        return true;
    }

    /**
     * Обработка отправки формы входа
     */
    async handleLogin(e) {
        const username = this.usernameInput?.value?.trim() || '';
        const password = this.passwordInput?.value || '';
        
        // Валидация
        if (!this.validateLoginForm(username, password)) {
            return;
        }

        // Блокируем кнопку отправки
        this.setSubmitButtonLoading(true);
        
        try {
            // Здесь должна быть логика авторизации через API
            console.log('Попытка входа:', { username });
            
            // Временная имитация успешного входа
            await this.authenticate(username, password);
            
            this.close();
            
            // Меняем кнопку на профиль пользователя
            this.updateAuthButton(username);
            
            // Показываем уведомление об успешном входе
            this.showSuccessMessage(`Добро пожаловать, ${username}!`);
        } catch (error) {
            console.error('Ошибка авторизации:', error);
            this.showErrorMessage('Ошибка входа. Пожалуйста, попробуйте снова.');
        } finally {
            this.setSubmitButtonLoading(false);
        }
    }

    /**
     * Авторизация пользователя (заглушка для будущей интеграции с API)
     */
    async authenticate(username, password) {
        // Временная имитация успешного входа
        await new Promise(resolve => setTimeout(resolve, 1000));
        // TODO: Заменить на реальный API вызов
        // const response = await fetch('/api/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ username, password })
        // });
        // if (!response.ok) throw new Error('Ошибка авторизации');
        // return await response.json();
    }

    /**
     * Устанавливает состояние загрузки кнопки отправки
     */
    setSubmitButtonLoading(isLoading) {
        if (!this.submitBtn) return;
        
        if (isLoading) {
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = 'Вход...';
            this.submitBtn.style.opacity = '0.6';
            this.submitBtn.style.cursor = 'not-allowed';
        } else {
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Войти';
            this.submitBtn.style.opacity = '1';
            this.submitBtn.style.cursor = 'pointer';
        }
    }

    /**
     * Обновляет кнопку авторизации после успешного входа
     */
    updateAuthButton(username) {
        if (this.authBtn) {
            this.authBtn.innerHTML = `
                <i class="fas fa-user-circle"></i>
                <span>${username}</span>
            `;
        }
    }

    /**
     * Показывает уведомление об успешном входе
     */
    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    /**
     * Показывает сообщение об ошибке
     */
    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    /**
     * Показывает уведомление
     */
    showNotification(message, type = 'success') {
        const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-fade-in`;
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        document.body.appendChild(notification);

        // Автоматически скрываем уведомление через 3 секунды
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

