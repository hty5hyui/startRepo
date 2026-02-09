using studentServer.Entity.DBEntity;

namespace studentServer.Service
{
    public class ReplacePlaceholderDictionaryService
    {

        public static Dictionary<string, string?> BuildDictionary(StudentDataDTO studentData, Company company)
        {
            Dictionary<string, string?> PlaceholderValues = new Dictionary<string, string?>()
            {
                // ContractDTO
                { "{НОМЕР ДОГОВОРА УВМ}", studentData.contract?.NumberUVM },
                { "{НОМЕР ДОГОВОРА 3-Х}", studentData.contract?.Number3Party },
                { "{ДАТА ДОГОВОРА 3-Х}", studentData.contract?.Date3Party?.ToString("dd.MM.yyyy") },
                { "{НОМЕР ДОГОВОРА 2-Х}", studentData.contract?.Number2Party },
                { "{ДАТА ДОГОВОРА 2-Х}", studentData.contract?.Date2Party?.ToString("dd.MM.yyyy") },
                { "{НОМЕР ДОГОВОРА СТУДЕНТ-УНИВЕРСИТЕТ}", studentData.contract?.NumberStudentUniversity },
                { "{ДАТА ДОГОВОРА СТУДЕНТ-УНИВЕРСИТЕТ}", studentData.contract?.DateStudentUniversity?.ToString("dd.MM.yyyy") },
                { "{НОМЕР ЗАЯВКИ 2-Х}", studentData.contract?.Number2PartyRequest },
                { "{НОМЕР ДОГОВОРА ПРАКТИКИ}", studentData.contract?.NumberPractice },
                { "{ДАТА ДОГОВОРА ПРАКТИКИ}", studentData.contract?.DatePractice?.ToString("dd.MM.yyyy") },
                { "{НОМЕР ЗАЯВКИ ДОГОВОРА ПРАКТИКИ}", studentData.contract?.NumberPracticeRequest },
                { "{НОМЕР РЕЕСТРА В МОСКВУ}", studentData.contract?.NumberRegistrySendInMoscow },
                { "{ДАТА РЕЕСТРА В МОСКВУ}", studentData.contract?.DateRegistrySendInMoscow?.ToString("dd.MM.yyyy") },
                { "{ДАТА РАСТОРЖЕНИЯ ДОГОВОРА}", studentData.contract?.DateOfTerminationOfTheContract?.ToString("dd.MM.yyyy") },
                { "{ОРГАНИЗАЦИЯ РАСТОРЖЕНИЯ ДОГОВОРА}", studentData.contract?.OrganizationOfTermination },

                // FinanceDocDTO
                { "{НОМЕР КВИТАНЦИИ}", studentData.financeDoc?.CheckNumber },
                { "{ДАТА КВИТАНЦИИ}", studentData.financeDoc?.CheckDate?.ToString("dd.MM.yyyy") },
                { "{ОПЛАТА ВЗНОСА}", studentData.financeDoc?.PaymentOfContribution == true? "да":"нет" },
                { "{ОПЛАТА ВЗНОСА ГОД}", studentData.financeDoc?.PaymentOfContributionYear == true? "да":"нет" },
                { "{КАРТА ГОТОВА}", studentData.financeDoc?.CardIsReady == true? "да":"нет" },
                { "{КАРТА ПОЛУЧЕНА}", studentData.financeDoc?.CardIsGet == true? "да":"нет" },

                // PersonalDataDTO
                { "{ФАМИЛИЯ}", studentData.personalData?.Surname },
                { "{ИМЯ}", studentData.personalData?.Name },
                { "{ОТЧЕСТВО}", studentData.personalData?.Patronymic },
                { "{ФАМИЛИЯ АНГЛ}", studentData.personalData?.SurnameEn },
                { "{ИМЯ АНГЛ}", studentData.personalData?.NameEn },
                { "{ОТЧЕСТВО АНГЛ}", studentData.personalData?.PatronymicEn },
                { "{ДАТА РОЖДЕНИЯ}", studentData.personalData?.Birthday?.ToString("dd.MM.yyyy") },
                { "{СЕРИЯ ПАСПОРТА}", studentData.personalData?.PassportSeries },
                { "{НОМЕР ПАСПОРТА}", studentData.personalData?.PassportNumber },
                { "{ДАТА ВЫДАЧИ ПАСПОРТА}", studentData.personalData?.PassportDateOfIssue?.ToString("dd.MM.yyyy") },
                { "{ДАТА ОКОНЧАНИЯ ПАСПОРТА}", studentData.personalData?.PassportDateEnd?.ToString("dd.MM.yyyy") },
                { "{МЕСТО РОЖДЕНИЯ}", studentData.personalData?.PlaceOfBirth },
                { "{ГОРОД РЕГИСТРАЦИИ}", studentData.personalData?.CityOfRegistration },
                { "{АДРЕС РЕГИСТРАЦИИ}", studentData.personalData?.AddressRegistration },
                { "{ИНДЕКС РЕГИСТРАЦИИ}", studentData.personalData?.AddressRegistrationIndex },
                { "{НОМЕР ГРУППЫ}", studentData.personalData?.GroupNumber },

                // VISADTO
                { "{НОМЕР ПРИГЛАШЕНИЯ}", studentData.visa?.InviteNumber },
                { "{ДАТА ПРИБЫТИЯ}", studentData.visa?.ArrivalDate?.ToString("dd.MM.yyyy") },
                { "{ID ВИЗЫ}", studentData.visa?.VisaId },
                { "{СЕРИЯ ВИЗЫ}", studentData.visa?.VisaSeries },
                { "{НОМЕР ВИЗЫ}", studentData.visa?.VisaNumber },
                { "{ДАТА ВЫДАЧИ ВИЗЫ}", studentData.visa?.VisaIssueDate?.ToString("dd.MM.yyyy") },
                { "{ДАТА ПОЛУЧЕНИЯ ВИЗЫ}", studentData.visa?.VisaReceiptDate?.ToString("dd.MM.yyyy") },
                { "{ДАТА ДЕЙСТВИЯ ВИЗЫ}", studentData.visa?.VisaValidityDate?.ToString("dd.MM.yyyy") },
                { "{ПРИЕХАЛ ПО ПРИГЛАШЕНИЮ}", studentData.visa?.ArrivalInvite },
                { "{СЕРИЯ МИГРАЦИОННОЙ КАРТЫ}", studentData.visa?.MigrationСardSeries },
                { "{НОМЕР МИГРАЦИОННОЙ КАРТЫ}", studentData.visa?.MigrationСardNumber },
                { "{МИГРАЦИОННАЯ КАРТА С}", studentData.visa?.MigrationСardFromDate?.ToString("dd.MM.yyyy") },
                { "{МИГРАЦИОННАЯ КАРТА ПО}", studentData.visa?.MigrationСardToDate?.ToString("dd.MM.yyyy") },

                //COMPANY
                { "{НАЗВАНИЕ КОМПАНИИ РФ}", company?.NameCompanyRF },
                { "{НАЗВАНИЕ КОМПАНИИ КНДР}", company?.NameCompanyKNDR },
                { "{АДРЕС ПРАКТИКИ}", company?.PracticeAddress },
                { "{ИНН КОМПАНИИ}", company?.INN },
                { "{КПП КОМПАНИИ}",  company?.KPP },
                { "{ОГРН КОМПАНИИ}", company?.OGRN },
                { "{РАСЧЕТНЫЙ СЧЕТ КОМПАНИИ}", company?.PaymantAccount },
                { "{БАНК КОМПАНИИ}", company?.Bank },
                { "{КОРОСПОНДЕНТСКИЙ СЧЕТ КОМПАНИИ}", company?.CorrespondentAccount },
                { "{БИК КОМПАНИИ}", company?.BIK },
                { "{ПОЧТА КОМПАНИИ}", company?.Mail },
                { "{ВИДЫ ДЕЯТЕЛЬНОСТИ КОМПАНИИ}", company?.CompanyActivities },
                { "{ДИРЕКТОР КОМПАНИИ}", company?.Director },
                { "{ДОЛЖНОСТЬ РУКОВОДИТЕЛЯ КОМПАНИИ}", company?.PostHeadOfTheCompany },
                { "{РУКОВОДИТЕЛЬ КОМПАНИИ}", company?.HeadOfTheCompany },
                { "{АДРЕС КОМПАНИИ}", company?.CompanyAddress },
                { "{КУРАТОР КОМПАНИИ}", company?.Curator }
            };

            return PlaceholderValues;
        }
    }
}
