# Конфигурация API

Система динамической конфигурации API позволяет автоматически определять базовый URL API без жесткой привязки к конкретному адресу.

## Как это работает

Система определяет базовый URL API в следующем порядке приоритета:

1. **Meta-тег в HTML** (высший приоритет)
2. **Глобальная переменная JavaScript**
3. **Текущий origin** (API на том же домене, где находится приложение)

## Способы настройки

### 1. Через meta-тег в HTML (рекомендуется для продакшена)

Добавьте в `<head>` вашего HTML файла:

```html
<!-- Полный URL API -->
<meta name="api-base-url" content="https://api.example.com">

<!-- Или только порт (для localhost) -->
<meta name="api-port" content="7229">
```

### 2. Через глобальную переменную JavaScript

Добавьте перед загрузкой модулей:

```html
<script>
    window.API_BASE_URL = 'https://api.example.com';
    // или
    window.API_PORT = '7229';
</script>
```

### 3. Автоматическое определение

Если ничего не указано, система использует текущий origin (API на том же домене, где находится приложение).

## Примеры использования

### Разработка (localhost, тот же порт)
- Приложение: `http://localhost:5000`
- API автоматически: `http://localhost:5000` (тот же origin)

### Разработка (localhost, другой порт)
Добавьте в HTML:
```html
<meta name="api-base-url" content="http://localhost:7229">
```

### Продакшен (тот же домен)
- Приложение: `https://example.com`
- API автоматически: `https://example.com` (тот же origin)

### Продакшен (отдельный поддомен)
Добавьте в HTML:
```html
<meta name="api-base-url" content="https://api.example.com">
```

## Использование в коде

Все модули API автоматически используют конфигурацию:

```javascript
import { API_BASE_URL } from './config.js';

// API_BASE_URL уже содержит правильный базовый URL
fetch(`${API_BASE_URL}/student/allStudents`, {...});
```

## Проверка доступности API

```javascript
import { checkApiAvailability } from './config.js';

const isAvailable = await checkApiAvailability();
if (!isAvailable) {
    console.warn('API недоступен');
}
```

## Файлы

- `js/config.js` - модуль конфигурации
- `js/apiStudent.js` - использует конфигурацию
- `js/apiCompany.js` - использует конфигурацию

