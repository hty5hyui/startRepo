export function renderCompaniesTable(companies) {
    const tableBody = document.getElementById('companiesTableBody');
    tableBody.innerHTML = '';

    if (!companies || companies.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="8" class="text-center p-4 text-gray-500">Нет данных для отображения</td></tr>`;
        return;
    }

    companies.forEach(company => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${company.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${company.nameCompanyRF || company.name || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${company.nameCompanyKNDR || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${company.companyActivities || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${company.companyAddress || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${company.headOfTheCompany || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${company.inn || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button class="text-teal-600 hover:text-teal-900 mr-3 edit-btn" data-id="${company.id}" title="Редактировать">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="text-red-600 hover:text-red-900 delete-btn" data-id="${company.id}" title="Удалить">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

export function toggleModal(modalId, show) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const mainContent = document.querySelector('main');
    const header = document.querySelector('header');

    if (show) {
        modal.classList.remove('hidden');
        mainContent?.classList.add('blur-background');
        header?.classList.add('blur-background');
    } else {
        modal.classList.add('hidden');
        mainContent?.classList.remove('blur-background');
        header?.classList.remove('blur-background');
    }
}

export function populateCompanyForm(company = null) {
    const form = document.getElementById('companyForm');
    const title = document.getElementById('companyModalTitle');

    document.getElementById('companyId').value = company?.id || '';
    document.getElementById('nameCompanyRF').value = company?.nameCompanyRF || company?.name || '';
    document.getElementById('nameCompanyKNDR').value = company?.nameCompanyKNDR || '';
    document.getElementById('companyActivities').value = company?.companyActivities || '';
    document.getElementById('inn').value = company?.inn || '';
    document.getElementById('kpp').value = company?.kpp || '';
    document.getElementById('ogrn').value = company?.ogrn || '';
    document.getElementById('paymantAccount').value = company?.paymantAccount || '';
    document.getElementById('bank').value = company?.bank || '';
    document.getElementById('correspondentAccount').value = company?.correspondentAccount || '';
    document.getElementById('bik').value = company?.bik || '';
    document.getElementById('mail').value = company?.mail || '';
    document.getElementById('director').value = company?.director || '';
    document.getElementById('postHeadOfTheCompany').value = company?.postHeadOfTheCompany || '';
    document.getElementById('headOfTheCompany').value = company?.headOfTheCompany || '';
    document.getElementById('companyAddress').value = company?.companyAddress || '';
    document.getElementById('practiceAddress').value = company?.practiceAddress || '';
    document.getElementById('curator').value = company?.curator || '';

    const idFieldContainer = document.getElementById('companyId').parentElement;
    if (company) {
        title.textContent = 'Редактирование компании';
        idFieldContainer.style.display = 'block';
    } else {
        title.textContent = 'Добавление компании';
        idFieldContainer.style.display = 'none';
    }
}

export function showNotification(message, type = 'success') {
    const color = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${color} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-500`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('opacity-0');
        notification.addEventListener('transitionend', () => notification.remove());
    }, 3000);
}

export function toggleLoading(isLoading) {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const form = document.getElementById('companyForm');
    const submitButton = form.querySelector('button[type="submit"]');

    if (isLoading) {
        loadingOverlay.classList.remove('hidden');
        submitButton.disabled = true;
    } else {
        loadingOverlay.classList.add('hidden');
        submitButton.disabled = false;
    }
}