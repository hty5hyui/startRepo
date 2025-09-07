using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace studentServer.Entity
{
    


    public class StudentData
    {
        public Contract Contract { get; set; } = new Contract();
        public FinanceDoc FinanceDoc { get; set; } = new FinanceDoc();
        public PersonalData PersonalData { get; set; } = new PersonalData();
        public VISA Visa { get; set; } = new VISA();
    }

    public class PatchStudent
    {
        public List<int> idList { get; set; } = [];
        public StudentData data { get; set; } = new StudentData();
    }

    [Table("Student")]
    public class Student
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int PersonalDataId { get; set; }
        public int CompanyId { get; set; }
        public int FinanceId { get; set; }
        public int VisaId { get; set; }
        public int ProfessionId { get; set; }
        public int ContractsId { get; set; }
    }

    [Table("Contracts")]
    public class Contract
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? NumberUVM { get; set; }
        public string? Number3Party { get; set; }
        public DateTime? Date3Party { get; set; }
        public string? Number2Party { get; set; }
        public DateTime? Date2Party { get; set; }
        public string? GroupNumber { get; set; }
        public DateTime? DateOfDispatch { get; set; }
        public string? MailCompany { get; set; }
        public DateTime? DateReturn { get; set; }
    }

    [Table("Finance")]
    public class FinanceDoc
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public bool PaymentOfContribution { get; set; } = false;
        public bool PaymentOfContributionYear { get; set; } = false;
        public string? CheckNumber { get; set; }
        public DateOnly? CheckDate { get; set; }
        public bool CardIsReady { get; set; } = false;
        public bool CardIsGet { get; set; } = false;
    }

    [Table("PersonalData")]
    public class PersonalData
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Surname { get; set; }
        public string? Name { get; set; }
        public string? Patronymic { get; set; }
        public string? SurnameEn { get; set; }
        public string? NameEn { get; set; }
        public string? PatronymicEn { get; set; }
        public DateOnly? Birthday { get; set; }
        public string? PassportSeries { get; set; }
        public string? PassportNumber { get; set; }
        public DateOnly? PassportDateOfIssue { get; set; }
        public DateOnly? PassportDateEnd { get; set; }
        public string? PlaceOfBirth { get; set; }
        public string? CityOfRegistration { get; set; }
        public string? AddressRegistration { get; set; }
        public string? AddressRegistrationIndex { get; set; }
        public string? Curator { get; set; }
    }

    [Table("VISA")]
    public class VISA
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? InviteNumber { get; set; }
        public DateOnly? ArrivalDate { get; set; }
        public string? VisaId { get; set; }
        public string? VisaSeries { get; set; }
        public string? VisaNumber { get; set; }
        public DateOnly? VisaIssueDate { get; set; }
        public DateOnly? VisaReceiptDate { get; set; }
        public DateOnly? VisaValidityDate { get; set; }
    }

    [Table("Profession")]
    public class Profession
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? Id { get; set; }
        public string ProfessionName { get; set; }
        public string ProfessionNumber { get; set; }
    }
}
