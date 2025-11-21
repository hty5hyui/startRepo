using System.Reflection;

namespace studentServer.Service
{
    public class DtoMerger
    {
        public static void ApplyPatch<T>(T target, T source)
        {
            if (target == null || source == null) return;

            var type = typeof(T);
            var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (var prop in properties)
            {
                var sourceValue = prop.GetValue(source);
                var targetValue = prop.GetValue(target);

                if (sourceValue == null) continue;

                bool isNestedDto = prop.PropertyType.IsClass
                                   && prop.PropertyType != typeof(string)
                                   && !typeof(System.Collections.IEnumerable).IsAssignableFrom(prop.PropertyType);

                if (isNestedDto)
                {
                    if (targetValue == null)
                    {
                        prop.SetValue(target, sourceValue);
                    }
                    else
                    {
                        ApplyPatch((dynamic)targetValue, (dynamic)sourceValue);
                    }
                }
                else
                {
                    if (prop.CanWrite)
                    {
                        prop.SetValue(target, sourceValue);
                    }
                }
            }
        }
    }
}
