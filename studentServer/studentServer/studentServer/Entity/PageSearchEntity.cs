namespace studentServer.Entity
{
    public class PageSearchEntity
    {
        public int page { get; set; } = 1;
        public List<FilterDescriptor>? searchFilter { get; set; } = null;
    }


    public enum MatchMode
    {
        Contains,      // Содержит
        Equals,        // Равно
        IsNull,        // Пусто (IS NULL или пустая строка)
        IsNotNull,     // Не пусто
        GreaterThan,   // Больше чем (для чисел и дат)
        LessThan       // Меньше чем (для чисел и дат)
    }

    public class FilterDescriptor
    {
        public required string FieldName { get; set; } //Название поля из БД
        public MatchMode MatchMode { get; set; } //Режим сравнения
        public object? Value { get; set; } //Значение для сравнения
    }
}
