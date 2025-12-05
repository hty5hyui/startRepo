using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace studentServer.Entity.DBEntity
{
    public class LogMessage
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Message { get; set; }
        public DateTime Timestamp { get; set; }
        public string? User { get; set; }
        public string Type { get; set; }
    }
}
