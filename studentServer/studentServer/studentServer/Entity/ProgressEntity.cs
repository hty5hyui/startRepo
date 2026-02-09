namespace studentServer.Entity
{
    public class ProgressEntity
    {
        public bool IsReady { get; set; } = false;
        public int Progress { get; set; } = 0;
        public byte[]? ResultData { get; set; }
        public string? Error { get; set; }
    }
}
