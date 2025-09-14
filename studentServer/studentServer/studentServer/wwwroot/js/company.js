import * as api from './apiCompany.js';
import * as ui from './uiCompany.js';

let currentPage = 1;
let companyIdToDelete = null;

async function loadAndRenderCompanies() {
    try {
        const companies = await api.fetchCompanies(currentPage);
        ui.renderCompaniesTable(companies);
        document.getElementById('currentPage').textContent = currentPage;
    } catch (error) {
        console.error(error);
        ui.showNotification(error.message, 'error');
    }
}

function handlePrevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadAndRenderCompanies();
    }
}

function handleNextPage() {
    currentPage++;
    loadAndRenderCompanies();
}

function handleAddCompanyClick() {
    ui.populateCompanyForm(null);
    ui.toggleModal('companyModal', true);
}

async function handleTableActions(event) {
    const button = event.target.closest('button');
    if (!button) return;

    const id = button.dataset.id;
    if (!id) return;

    if (button.classList.contains('edit-btn')) {
        try {
            const company = await api.fetchCompanyById(id);
            ui.populateCompanyForm(company);
            ui.toggleModal('companyModal', true);
        } catch (error) {
            ui.showNotification(error.message, 'error');
        }
    }

    if (button.classList.contains('delete-btn')) {
        companyIdToDelete = id;
        ui.toggleModal('deleteModal', true);
    }
}

async function handleSaveCompany(event) {
    event.preventDefault();
    ui.toggleLoading(true);

    const form = event.target;
    const companyId = document.getElementById('companyId').value;

    // Сначала создаем объект со всеми данными, КРОМЕ id
    const companyData = {
        name: form.querySelector('input[placeholder="Введите название компании"]').value,
        inn: form.querySelector('input[placeholder="Введите ИНН"]').value,
        kpp: form.querySelector('input[placeholder="Введите КПП"]').value,
        ogrn: form.querySelector('input[placeholder="Введите ОГРН"]').value,
        paymantAccount: form.querySelector('input[placeholder="Введите расчетный счет"]').value,
        bank: form.querySelector('input[placeholder="Введите банк"]').value,
        correspondentAccount: form.querySelector('input[placeholder="Введите корр. счет"]').value,
        bik: form.querySelector('input[placeholder="Введите БИК"]').value,
        mail: form.querySelector('input[placeholder="Введите email"]').value,
        director: form.querySelector('input[placeholder="Введите директора"]').value,
        headOfTheCompany: form.querySelector('input[placeholder="Введите руководителя"]').value,
        companyAddress: form.querySelector('input[placeholder="Введите адрес компании"]').value,
        practiceAddress: form.querySelector('input[placeholder="Введите адрес практики"]').value
    };

    if (companyId) {
        companyData.id = companyId;
    }

    try {
        await api.saveCompany(companyData);
        ui.toggleModal('companyModal', false);
        ui.showNotification('Компания успешно сохранена!', 'success');
        await loadAndRenderCompanies();
    } catch (error) {
        console.error(error);
        ui.showNotification(error.message, 'error');
    } finally {
        ui.toggleLoading(false);
    }
}

async function handleConfirmDelete() {
    if (!companyIdToDelete) return;

    try {
        await api.deleteCompany(companyIdToDelete);
        ui.toggleModal('deleteModal', false);
        ui.showNotification('Компания успешно удалена!', 'success');
        await loadAndRenderCompanies();
    } catch (error) {
        console.error(error);
        ui.showNotification(error.message, 'error');
    } finally {
        companyIdToDelete = null;
    }
}


function handleLogin(event) {
    event.preventDefault();
    // Здесь будет ваша логика авторизации
    const username = document.getElementById('username').value;
    console.log(`Попытка входа: ${username}`);
    
    ui.toggleModal('authModal', false);
    ui.showNotification(`Добро пожаловать, ${username}!`, 'success');
    
    const authBtn = document.getElementById('authBtn');
    authBtn.innerHTML = `<i class="fas fa-user-circle"></i> <span>${username}</span>`;
}


function setupEventListeners() {
    // Пагинация
    document.getElementById('prevPageBtn').addEventListener('click', handlePrevPage);
    document.getElementById('nextPageBtn').addEventListener('click', handleNextPage);

    // Открытие модальных окон
    document.getElementById('addCompanyBtn').addEventListener('click', handleAddCompanyClick);
    document.getElementById('authBtn').addEventListener('click', () => ui.toggleModal('authModal', true));

    // Закрытие модальных окон
    document.getElementById('closeCompanyModalBtn').addEventListener('click', () => ui.toggleModal('companyModal', false));
    document.getElementById('cancelCompanyModalBtn').addEventListener('click', () => ui.toggleModal('companyModal', false));
    document.getElementById('closeAuthModalBtn').addEventListener('click', () => ui.toggleModal('authModal', false));
    document.getElementById('closeDeleteModal').addEventListener('click', () => ui.toggleModal('deleteModal', false));
    document.getElementById('cancelDelete').addEventListener('click', () => ui.toggleModal('deleteModal', false));

    // Действия в таблице (используем делегирование событий)
    document.getElementById('companiesTableBody').addEventListener('click', handleTableActions);

    // Отправка форм
    document.getElementById('companyForm').addEventListener('submit', handleSaveCompany);
    document.getElementById('loginForm').addEventListener('submit', handleLogin);

    // Подтверждение удаления
    document.getElementById('confirmDelete').addEventListener('click', handleConfirmDelete);
}

// Запуск приложения
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    loadAndRenderCompanies();
});