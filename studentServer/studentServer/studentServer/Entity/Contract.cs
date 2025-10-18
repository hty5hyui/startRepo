using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace studentServer.Entity
{
    [Table("Contracts")]
    public class Contract
    {
        [Key]
        public int Id { get; set; }
        public string? NumberUVM { get; set; }
        public string? Number3Party { get; set; }
        public DateOnly? Date3Party { get; set; }
        public string? Number2Party { get; set; }
        public DateOnly? Date2Party { get; set; }
        public string? GroupNumber { get; set; }
        public DateOnly? DateOfDispatch { get; set; }
        public string? MailCompany { get; set; }
        public DateOnly? DateReturn { get; set; }

        // Навигационное свойство обратно к главной сущности
        public virtual Student Student { get; set; }
    }

    public class ContractDTO
    {
        public int Id { get; set; }
        public string? NumberUVM { get; set; }
        public string? Number3Party { get; set; }
        public DateOnly? Date3Party { get; set; }
        public string? Number2Party { get; set; }
        public DateOnly? Date2Party { get; set; }
        public string? GroupNumber { get; set; }
        public DateOnly? DateOfDispatch { get; set; }
        public string? MailCompany { get; set; }
        public DateOnly? DateReturn { get; set; }
    }
}
