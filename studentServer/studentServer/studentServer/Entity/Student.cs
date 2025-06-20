namespace studentServer.Entity
{
    public class Student
    {
        public Contract Contract { get; set; } = new Contract();
        public Finance Finance { get; set; } = new Finance();
        public PersonalData PersonalData { get; set; } = new PersonalData();
        public VISA Visa { get; set; } = new VISA();
    }

    public class Finance
    {
        public int Id { get; set; }
        public bool PaymentOfContribution { get; set; } = false;
        public bool PaymentOfOontributionYear { get; set; } = false;
        public string? CheckNumber { get; set; }
        public DateOnly? CheckDate { get; set; }
        public bool CardIsReady { get; set; } = false;
        public bool CardIsGet { get; set; } = false;
    }

    public class PersonalData
    {
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
    public class VISA
    {
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
    public struct Profession
    {
        public int Id { get; set; }
        public string? ProfessionName { get; set; }
        public string? ProfessionNumber { get; set; }
    }
}
