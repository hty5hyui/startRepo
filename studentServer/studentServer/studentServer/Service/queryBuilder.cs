using System.Reflection;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using System.Text.Json;


namespace studentServer.Service
{
    public static class queryBuilder
    {
        // Главный метод-расширение для IQueryable
        public static IQueryable<T> ApplyFilters<T>(this IQueryable<T> query, List<FilterDescriptor> filters)
        {
            // Параметр для лямбда-выражения: x =>
            var parameter = Expression.Parameter(typeof(T), "x");
            Expression? finalBody = null;

            foreach (var filter in filters)
            {
                // Строим тело выражения
                Expression? filterExpression = BuildExpression(parameter, filter);
                if (filterExpression == null) continue;

                // Объединяем с предыдущими фильтрами через AND
                finalBody = finalBody == null ? filterExpression : Expression.AndAlso(finalBody, filterExpression);
            }

            if (finalBody != null)
            {
                // Создаем и применяем финальное лямбда-выражение
                var lambda = Expression.Lambda<Func<T, bool>>(finalBody, parameter);
                query = query.Where(lambda);
            }

            return query;
        }

        private static Expression? BuildExpression(ParameterExpression parameter, FilterDescriptor filter)
        {
            // 1. Получаем доступ к свойству
            var member = GetNestedProperty(parameter, filter.FieldName);

            // 2. Обрабатываем IsNull и IsNotNull
            if (filter.MatchMode == MatchMode.IsNull)
            {
                return Expression.Equal(member, Expression.Constant(null));
            }
            if (filter.MatchMode == MatchMode.IsNotNull)
            {
                return Expression.NotEqual(member, Expression.Constant(null));
            }

            if (filter.Value == null) return null;

            // 3. конвертация значения
            object? convertedValue;
            try
            {
                // Проверяем, не является ли значение JsonElement
                if (filter.Value is JsonElement jsonElement)
                {
                    // Если да, используем JsonSerializer для корректной десериализации в целевой тип
                    convertedValue = jsonElement.Deserialize(member.Type, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
                }
                else
                {
                    // Если это уже обычный тип (string, long и т.д.), используем Convert.ChangeType
                    convertedValue = Convert.ChangeType(filter.Value, member.Type);
                }
            }
            catch (Exception)
            {
                return null;
            }

            var constant = Expression.Constant(convertedValue, member.Type);

            // 4. Строим выражение в зависимости от MatchMode
            switch (filter.MatchMode)
            {
                case MatchMode.Equals:
                    return Expression.Equal(member, constant);

                case MatchMode.GreaterThan:
                    return Expression.GreaterThan(member, constant);

                case MatchMode.LessThan:
                    return Expression.LessThan(member, constant);

                case MatchMode.Contains:
                    if (member.Type != typeof(string)) return null;
                    var ilikeMethod = typeof(NpgsqlDbFunctionsExtensions).GetMethod("ILike", new[] { typeof(DbFunctions), typeof(string), typeof(string) });
                    if (ilikeMethod == null) return null;
                    var pattern = Expression.Constant($"%{convertedValue}%");
                    return Expression.Call(null, ilikeMethod, Expression.Constant(EF.Functions), member, pattern);

                default:
                    return null;
            }
        }

        private static MemberExpression GetNestedProperty(Expression expression, string propertyName)
        {
            string[]? parts = propertyName.Split('.');
            foreach (string? part in parts)
            {
                expression = Expression.PropertyOrField(expression, part);
            }
            return (MemberExpression)expression;
        }
    }
}
