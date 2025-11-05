namespace studentServer.Entity
{
    public class SearchFilterDTO
    {
        // PersonalData
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

        // FinanceDoc
        public bool? PaymentOfContribution { get; set; }
        public bool? PaymentOfContributionYear { get; set; }
        public string? CheckNumber { get; set; }
        public DateOnly? CheckDate { get; set; }
        public bool? CardIsReady { get; set; }
        public bool? CardIsGet { get; set; }

        // Contract
        public string? NumberUVM { get; set; }
        public string? Number3Party { get; set; }
        public DateOnly? Date3Party { get; set; }
        public string? Number2Party { get; set; }
        public DateOnly? Date2Party { get; set; }
        public string? GroupNumber { get; set; }
        public DateOnly? DateOfDispatch { get; set; }
        public string? MailCompany { get; set; }
        public DateOnly? DateReturn { get; set; }

        // VISA
        public string? InviteNumber { get; set; }
        public DateOnly? ArrivalDate { get; set; }
        public string? VisaId { get; set; }
        public string? VisaSeries { get; set; }
        public string? VisaNumber { get; set; }
        public DateOnly? VisaIssueDate { get; set; }
        public DateOnly? VisaReceiptDate { get; set; }
        public DateOnly? VisaValidityDate { get; set; }

        // Company
        public string? CompanyName { get; set; }
        public string? PracticeAddress { get; set; }
        public string? INN { get; set; }
        public string? KPP { get; set; }
        public string? OGRN { get; set; }
        public string? PaymantAccount { get; set; }
        public string? Bank { get; set; }
        public string? CorrespondentAccount { get; set; }
        public string? BIK { get; set; }
        public string? CompanyMail { get; set; }
        public string? Director { get; set; }
        public string? HeadOfTheCompany { get; set; }
        public string? CompanyAddress { get; set; }

        // Profession
        public string? ProfessionName { get; set; }
        public string? ProfessionNumber { get; set; }

        // Curator
        public string? CuratorName { get; set; }
    }
}
