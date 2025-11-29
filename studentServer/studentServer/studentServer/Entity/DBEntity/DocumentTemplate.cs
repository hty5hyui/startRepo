using System.ComponentModel.DataAnnotations;

namespace studentServer.Entity.DBEntity
{
    public class DocumentTemplate
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string DocumentName { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public byte[]? Content { get; set; } = Array.Empty<byte>();
    }
}
