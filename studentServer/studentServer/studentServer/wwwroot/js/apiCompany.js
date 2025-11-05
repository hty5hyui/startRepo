/**
 * Модуль для работы с API компаний
 */

import { API_BASE_URL } from './config.js';

export async function fetchCompanies(page = 1) {
    const response = await fetch(`${API_BASE_URL}/company/allCompany?page=${page}`);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке компаний');
    }
    return response.json();
}

export async function fetchCompanyById(companyId) {
    const response = await fetch(`${API_BASE_URL}/company?idCompany=${companyId}`);
    if (!response.ok) {
        throw new Error('Ошибка при загрузке данных компании');
    }
    return response.json();
}

export async function saveCompany(companyData) {
    const companyId = companyData.id;
    const method = companyId ? 'PATCH' : 'POST';
    
    const response = await fetch(`${API_BASE_URL}/company`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(companyData)
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка сохранения: ${errorText}`);
    }
    return response;
}

export async function deleteCompany(companyId) {
    const response = await fetch(`${API_BASE_URL}/company?idCompany=${companyId}`, {
        method: 'DELETE'
    });
     if (!response.ok) {
        throw new Error('Ошибка при удалении компании');
    }
    return response;
}