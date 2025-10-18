using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace studentServer.Entity
{
    [Table("Finance")]
    public class FinanceDoc
    {
        [Key]
        public int Id { get; set; }
        public bool PaymentOfContribution { get; set; } = false;
        public bool PaymentOfContributionYear { get; set; } = false;
        public string? CheckNumber { get; set; }
        public DateOnly? CheckDate { get; set; }
        public bool CardIsReady { get; set; } = false;
        public bool CardIsGet { get; set; } = false;

        // Навигационное свойство обратно к главной сущности
        public virtual Student Student { get; set; }
    }

    public class FinanceDocDTO
    {
        public int Id { get; set; }
        public bool PaymentOfContribution { get; set; } = false;
        public bool PaymentOfContributionYear { get; set; } = false;
        public string? CheckNumber { get; set; }
        public DateOnly? CheckDate { get; set; }
        public bool CardIsReady { get; set; } = false;
        public bool CardIsGet { get; set; } = false;
    }
}
