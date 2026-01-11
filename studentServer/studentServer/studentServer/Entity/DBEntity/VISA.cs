using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace studentServer.Entity.DBEntity
{
    [Table("VISA")]
    public class VISA
    {
        [Key]
        public int Id { get; set; }
        public string? InviteNumber { get; set; }
        public DateOnly? ArrivalDate { get; set; }
        public string? VisaId { get; set; }
        public string? VisaSeries { get; set; }
        public string? VisaNumber { get; set; }
        public DateOnly? VisaIssueDate { get; set; }
        public DateOnly? VisaReceiptDate { get; set; }
        public DateOnly? VisaValidityDate { get; set; }
        public string? ArrivalInvite { get; set; }
        public string? MigrationСardSeries { get; set; }
        public string? MigrationСardNumber { get; set; }
        public DateOnly? MigrationСardFromDate { get; set; }//Миграционная карта действительная с
        public DateOnly? MigrationСardToDate { get; set; }//Миграционная карта действительная по

        // Навигационное свойство обратно к главной сущности
        public virtual Student Student { get; set; }
    }

    public class VISADTO
    {
        public int? Id { get; set; }
        public string? InviteNumber { get; set; }
        public DateOnly? ArrivalDate { get; set; }
        public string? VisaId { get; set; }
        public string? VisaSeries { get; set; }
        public string? VisaNumber { get; set; }
        public DateOnly? VisaIssueDate { get; set; }
        public DateOnly? VisaReceiptDate { get; set; }
        public DateOnly? VisaValidityDate { get; set; }
        public string? ArrivalInvite { get; set; }
        public string? MigrationСardSeries { get; set; }
        public string? MigrationСardNumber { get; set; }
        public DateOnly? MigrationСardFromDate { get; set; }//Миграционная карта действительная с
        public DateOnly? MigrationСardToDate { get; set; }//Миграционная карта действительная по
    }
}
