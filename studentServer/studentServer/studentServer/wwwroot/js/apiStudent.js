/**
 * Модуль для работы с API студентов
 */

const API_BASE_URL = 'https://localhost:7229';

/**
 * Загружает список студентов с пагинацией
 * @param {number} page - номер страницы
 * @param {Array<FilterDescriptor>|null} searchFilter - массив FilterDescriptor с критериями поиска (опционально)
 * @returns {Promise<Object>} объект с полями pageCount и studentPreviews
 */
export async function loadStudents(page = 1, searchFilter = null) {
    try {
        const requestBody = { page };
        
        // Если есть критерии поиска, добавляем searchFilter как массив
        if (searchFilter && Array.isArray(searchFilter) && searchFilter.length > 0) {
            requestBody.searchFilter = searchFilter;
        }

        const response = await fetch(`${API_BASE_URL}/student/allStudents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result; // { pageCount, studentPreviews }
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        throw error;
    }
}

/**
 * Загружает детальные данные студента
 * @param {string} studentId - ID студента
 * @returns {Promise<Object>}
 */
export async function loadStudentData(studentId) {
    try {
        const response = await fetch(`${API_BASE_URL}/student?idStudent=${studentId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка загрузки данных студента:', error);
        throw error;
    }
}

/**
 * Добавляет нового студента
 * @param {Object} formData - Данные студента
 * @param {number} count - Количество студентов для добавления
 * @returns {Promise<Response>}
 */
export async function addStudent(formData, count) {
    try {
        const response = await fetch(`${API_BASE_URL}/student?count=${count}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        return response;
    } catch (error) {
        console.error('Ошибка добавления студента:', error);
        throw error;
    }
}

/**
 * Обновляет данные студента
 * @param {Object} formData - Данные студента
 * @returns {Promise<Response>}
 */
export async function updateStudent(formData) {
    try {
        const response = await fetch(`${API_BASE_URL}/student`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        return response;
    } catch (error) {
        console.error('Ошибка обновления студента:', error);
        throw error;
    }
}

/**
 * Удаляет студентов
 * @param {Array<string>} idStudents - Массив ID студентов для удаления
 * @returns {Promise<Response>}
 */
export async function deleteStudent(idStudents) {
    try {
        const response = await fetch(`${API_BASE_URL}/student`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(idStudents)
        });
        return response;
    } catch (error) {
        console.error('Ошибка удаления студента:', error);
        throw error;
    }
}

/**
 * Загружает список компаний
 * @returns {Promise<Array>}
 */
export async function loadCompaniesList() {
    try {
        const response = await fetch(`${API_BASE_URL}/company/allCompanyName`);
        const companies = await response.json();
        return companies;
    } catch (error) {
        console.error('Ошибка загрузки компаний:', error);
        throw error;
    }
}

/**
 * Загружает данные компании по ID
 * @param {string} companyId - ID компании
 * @returns {Promise<Object>}
 */
export async function loadCompanyData(companyId) {
    try {
        const response = await fetch(`${API_BASE_URL}/company?idCompany=${companyId}`);
        const companyData = await response.json();
        return companyData;
    } catch (error) {
        console.error('Ошибка загрузки данных компании:', error);
        throw error;
    }
}

/**
 * Загружает список профессий
 * @returns {Promise<Array>}
 */
export async function loadProfessionsList() {
    try {
        const response = await fetch(`${API_BASE_URL}/profession/allProfession`);
        const professions = await response.json();
        return professions;
    } catch (error) {
        console.error('Ошибка загрузки профессий:', error);
        throw error;
    }
}

/**
 * Загружает данные профессии по ID
 * @param {string} professionId - ID профессии
 * @returns {Promise<Object>}
 */
export async function loadProfessionData(professionId) {
    try {
        const response = await fetch(`${API_BASE_URL}/profession/profession?id=${professionId}`);
        const professionData = await response.json();
        return professionData;
    } catch (error) {
        console.error('Ошибка загрузки данных профессии:', error);
        throw error;
    }
}

