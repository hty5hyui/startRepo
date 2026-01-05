using studentServer.Entity.DBEntity;

namespace studentServer.Service
{
    public class ReplacePlaceholderDictionaryService
    {

        public static Dictionary<string, string?> BuildDictionary(StudentDataDTO studentData)
        {
            Dictionary<string, string?> PlaceholderValues = new Dictionary<string, string?>()
            {
                // ContractDTO
                { "{НОМЕР ДОГОВОРА УВМ}", studentData.contract?.NumberUVM },
                { "{НОМЕР ДОГОВОРА 3-Х}", studentData.contract?.Number3Party },
                { "{ДАТА ДОГОВОРА 3-Х}", studentData.contract?.Date3Party?.ToString("dd.MM.yyyy") },
                { "{НОМЕР ДОГОВОРА 2-Х}", studentData.contract?.Number2Party },
                { "{ДАТА ДОГОВОРА 2-Х}", studentData.contract?.Date2Party?.ToString("dd.MM.yyyy") },
                { "{НОМЕР ГРУППЫ}", studentData.contract?.GroupNumber },
                { "{ДАТА ОТПРАВКИ}", studentData.contract?.DateOfDispatch?.ToString("dd.MM.yyyy") },
                { "{ПОЧТА КОМПАНИИ}", studentData.contract?.MailCompany },
                { "{ДАТА ВОЗВРАТА}", studentData.contract?.DateReturn?.ToString("dd.MM.yyyy") },

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

                // VISADTO
                { "{НОМЕР ПРИГЛАШЕНИЯ}", studentData.visa?.InviteNumber },
                { "{ДАТА ПРИБЫТИЯ}", studentData.visa?.ArrivalDate?.ToString("dd.MM.yyyy") },
                { "{ID ВИЗЫ}", studentData.visa?.VisaId },
                { "{СЕРИЯ ВИЗЫ}", studentData.visa?.VisaSeries },
                { "{НОМЕР ВИЗЫ}", studentData.visa?.VisaNumber },
                { "{ДАТА ВЫДАЧИ ВИЗЫ}", studentData.visa?.VisaIssueDate?.ToString("dd.MM.yyyy") },
                { "{ДАТА ПОЛУЧЕНИЯ ВИЗЫ}", studentData.visa?.VisaReceiptDate?.ToString("dd.MM.yyyy") },
                { "{ДАТА ДЕЙСТВИЯ ВИЗЫ}", studentData.visa?.VisaValidityDate?.ToString("dd.MM.yyyy") },

                //CompanyDTO
                { "{ID КОМПАНИИ}", studentData.student?.CompanyId.ToString() },
            };

            return PlaceholderValues;
        }
    }
}
