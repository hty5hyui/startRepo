using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace studentServer.Entity.DBEntity
{
    [Table("Contracts")]
    public class Contract
    {
        [Key]
        public int Id { get; set; }
        public string? NumberUVM { get; set; }
        public string? NumberStudentUniversity { get; set; }//номер договора студент-университет
        public DateOnly? DateStudentUniversity { get; set; }//дата договора студент-университет
        public string? Number2Party { get; set; }
        public DateOnly? Date2Party { get; set; }
        public string? Number2PartyRequest { get; set; }//номер заявки 2-х стороннего договора
        public string? Number3Party { get; set; }
        public DateOnly? Date3Party { get; set; }
        public string? NumberPractice { get; set; } //номер договора по практике
        public DateOnly? DatePractice { get; set; } //дата договора по практике
        public string? NumberPracticeRequest { get; set; } //номер заявки договора по практике
        public string? NumberRegistrySendInMoscow { get; set; } //номер реестра отправленного в Москву
        public DateOnly? DateRegistrySendInMoscow { get; set; } //дата реестра отправленного в Москву
        public DateOnly? DateOfTerminationOfTheContract { get; set; } //дата расторжения договора
        public string? OrganizationOfTermination { get; set; } //организация расторжения
        

        // Навигационное свойство обратно к главной сущности
        public virtual Student Student { get; set; }
    }

    public class ContractDTO
    {
        public int Id { get; set; }
        public string? NumberUVM { get; set; }
        public string? NumberStudentUniversity { get; set; }//номер договора студент-университет
        public DateOnly? DateStudentUniversity { get; set; }//дата договора студент-университет
        public string? Number2Party { get; set; }
        public DateOnly? Date2Party { get; set; }
        public string? Number2PartyRequest { get; set; }//номер заявки 2-х стороннего договора
        public string? Number3Party { get; set; }
        public DateOnly? Date3Party { get; set; }
        public string? NumberPractice { get; set; } //номер договора по практике
        public DateOnly? DatePractice { get; set; } //дата договора по практике
        public string? NumberPracticeRequest { get; set; } //номер заявки договора по практике
        public string? NumberRegistrySendInMoscow { get; set; } //номер реестра отправленного в Москву
        public DateOnly? DateRegistrySendInMoscow { get; set; } //дата реестра отправленного в Москву
        public DateOnly? DateOfTerminationOfTheContract { get; set; } //дата расторжения договора
        public string? OrganizationOfTermination { get; set; } //организация расторжения
    }
}
