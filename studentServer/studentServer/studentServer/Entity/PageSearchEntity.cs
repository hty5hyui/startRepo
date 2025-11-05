namespace studentServer.Entity
{
    public class PageSearchEntity
    {
        public int page { get; set; } = 1;
        public SearchFilterDTO? searchFilter { get; set; } = null;
    }
}
