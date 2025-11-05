using Microsoft.EntityFrameworkCore;
using studentServer.Entity;

namespace studentServer.Service
{
    public static class queryBuilder
    {
        public static IQueryable<Student> ApplyFilters(IQueryable<Student> query, SearchFilterDTO filter)
        {
            // PersonalData
            if (!string.IsNullOrEmpty(filter.Surname))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.Surname, $"%{filter.Surname}%"));
            if (!string.IsNullOrEmpty(filter.Name))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.Name, $"%{filter.Name}%"));
            if (!string.IsNullOrEmpty(filter.Patronymic))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.Patronymic, $"%{filter.Patronymic}%"));
            if (!string.IsNullOrEmpty(filter.SurnameEn))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.SurnameEn, $"%{filter.SurnameEn}%"));
            if (!string.IsNullOrEmpty(filter.NameEn))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.NameEn, $"%{filter.NameEn}%"));
            if (!string.IsNullOrEmpty(filter.PatronymicEn))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.PatronymicEn, $"%{filter.PatronymicEn}%"));
            if (filter.Birthday.HasValue)
                query = query.Where(pr => pr.PersonalData.Birthday == filter.Birthday);
            if (!string.IsNullOrEmpty(filter.PassportSeries))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.PassportSeries, $"%{filter.PassportSeries}%"));
            if (!string.IsNullOrEmpty(filter.PassportNumber))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.PassportNumber, $"%{filter.PassportNumber}%"));
            if (filter.PassportDateOfIssue.HasValue)
                query = query.Where(pr => pr.PersonalData.PassportDateOfIssue == filter.PassportDateOfIssue);
            if (filter.PassportDateEnd.HasValue)
                query = query.Where(pr => pr.PersonalData.PassportDateEnd == filter.PassportDateEnd);
            if (!string.IsNullOrEmpty(filter.PlaceOfBirth))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.PlaceOfBirth, $"%{filter.PlaceOfBirth}%"));
            if (!string.IsNullOrEmpty(filter.CityOfRegistration))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.CityOfRegistration, $"%{filter.CityOfRegistration}%"));
            if (!string.IsNullOrEmpty(filter.AddressRegistration))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.AddressRegistration, $"%{filter.AddressRegistration}%"));
            if (!string.IsNullOrEmpty(filter.AddressRegistrationIndex))
                query = query.Where(pr => EF.Functions.ILike(pr.PersonalData.AddressRegistrationIndex, $"%{filter.AddressRegistrationIndex}%"));

            // FinanceDoc
            if (filter.PaymentOfContribution.HasValue)
                query = query.Where(pr => pr.FinanceDoc.PaymentOfContribution == filter.PaymentOfContribution);
            if (filter.PaymentOfContributionYear.HasValue)
                query = query.Where(pr => pr.FinanceDoc.PaymentOfContributionYear == filter.PaymentOfContributionYear);
            if (!string.IsNullOrEmpty(filter.CheckNumber))
                query = query.Where(pr => EF.Functions.ILike(pr.FinanceDoc.CheckNumber, $"%{filter.CheckNumber}%"));
            if (filter.CheckDate.HasValue)
                query = query.Where(pr => pr.FinanceDoc.CheckDate == filter.CheckDate);
            if (filter.CardIsReady.HasValue)
                query = query.Where(pr => pr.FinanceDoc.CardIsReady == filter.CardIsReady);
            if (filter.CardIsGet.HasValue)
                query = query.Where(pr => pr.FinanceDoc.CardIsGet == filter.CardIsGet);

            // Contract
            if (!string.IsNullOrEmpty(filter.NumberUVM))
                query = query.Where(pr => EF.Functions.ILike(pr.Contract.NumberUVM, $"%{filter.NumberUVM}%"));
            if (!string.IsNullOrEmpty(filter.Number3Party))
                query = query.Where(pr => EF.Functions.ILike(pr.Contract.Number3Party, $"%{filter.Number3Party}%"));
            if (filter.Date3Party.HasValue)
                query = query.Where(pr => pr.Contract.Date3Party == filter.Date3Party);
            if (!string.IsNullOrEmpty(filter.Number2Party))
                query = query.Where(pr => EF.Functions.ILike(pr.Contract.Number2Party, $"%{filter.Number2Party}%"));
            if (filter.Date2Party.HasValue)
                query = query.Where(pr => pr.Contract.Date2Party == filter.Date2Party);
            if (!string.IsNullOrEmpty(filter.GroupNumber))
                query = query.Where(pr => EF.Functions.ILike(pr.Contract.GroupNumber, $"%{filter.GroupNumber}%"));
            if (filter.DateOfDispatch.HasValue)
                query = query.Where(pr => pr.Contract.DateOfDispatch == filter.DateOfDispatch);
            if (!string.IsNullOrEmpty(filter.MailCompany))
                query = query.Where(pr => EF.Functions.ILike(pr.Contract.MailCompany, $"%{filter.MailCompany}%"));
            if (filter.DateReturn.HasValue)
                query = query.Where(pr => pr.Contract.DateReturn == filter.DateReturn);

            // VISA
            if (!string.IsNullOrEmpty(filter.InviteNumber))
                query = query.Where(pr => EF.Functions.ILike(pr.VISA.InviteNumber, $"%{filter.InviteNumber}%"));
            if (filter.ArrivalDate.HasValue)
                query = query.Where(pr => pr.VISA.ArrivalDate == filter.ArrivalDate);
            if (!string.IsNullOrEmpty(filter.VisaId))
                query = query.Where(pr => EF.Functions.ILike(pr.VISA.VisaId, $"%{filter.VisaId}%"));
            if (!string.IsNullOrEmpty(filter.VisaSeries))
                query = query.Where(pr => EF.Functions.ILike(pr.VISA.VisaSeries, $"%{filter.VisaSeries}%"));
            if (!string.IsNullOrEmpty(filter.VisaNumber))
                query = query.Where(pr => EF.Functions.ILike(pr.VISA.VisaNumber, $"%{filter.VisaNumber}%"));
            if (filter.VisaIssueDate.HasValue)
                query = query.Where(pr => pr.VISA.VisaIssueDate == filter.VisaIssueDate);
            if (filter.VisaReceiptDate.HasValue)
                query = query.Where(pr => pr.VISA.VisaReceiptDate == filter.VisaReceiptDate);
            if (filter.VisaValidityDate.HasValue)
                query = query.Where(pr => pr.VISA.VisaValidityDate == filter.VisaValidityDate);

            // Company
            if (!string.IsNullOrEmpty(filter.CompanyName))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.Name, $"%{filter.CompanyName}%"));
            if (!string.IsNullOrEmpty(filter.PracticeAddress))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.PracticeAddress, $"%{filter.PracticeAddress}%"));
            if (!string.IsNullOrEmpty(filter.INN))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.INN, $"%{filter.INN}%"));
            if (!string.IsNullOrEmpty(filter.KPP))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.KPP, $"%{filter.KPP}%"));
            if (!string.IsNullOrEmpty(filter.OGRN))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.OGRN, $"%{filter.OGRN}%"));
            if (!string.IsNullOrEmpty(filter.PaymantAccount))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.PaymantAccount, $"%{filter.PaymantAccount}%"));
            if (!string.IsNullOrEmpty(filter.Bank))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.Bank, $"%{filter.Bank}%"));
            if (!string.IsNullOrEmpty(filter.CorrespondentAccount))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.CorrespondentAccount, $"%{filter.CorrespondentAccount}%"));
            if (!string.IsNullOrEmpty(filter.BIK))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.BIK, $"%{filter.BIK}%"));
            if (!string.IsNullOrEmpty(filter.CompanyMail))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.Mail, $"%{filter.CompanyMail}%"));
            if (!string.IsNullOrEmpty(filter.Director))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.Director, $"%{filter.Director}%"));
            if (!string.IsNullOrEmpty(filter.HeadOfTheCompany))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.HeadOfTheCompany, $"%{filter.HeadOfTheCompany}%"));
            if (!string.IsNullOrEmpty(filter.CompanyAddress))
                query = query.Where(pr => pr.Company != null && EF.Functions.ILike(pr.Company.CompanyAddress, $"%{filter.CompanyAddress}%"));

            // Profession
            if (!string.IsNullOrEmpty(filter.ProfessionName))
                query = query.Where(pr => pr.Profession != null && EF.Functions.ILike(pr.Profession.ProfessionName, $"%{filter.ProfessionName}%"));
            if (!string.IsNullOrEmpty(filter.ProfessionNumber))
                query = query.Where(pr => pr.Profession != null && EF.Functions.ILike(pr.Profession.ProfessionNumber, $"%{filter.ProfessionNumber}%"));

            // Curator
            if (!string.IsNullOrEmpty(filter.CuratorName))
                query = query.Where(pr => pr.Curator != null && EF.Functions.ILike(pr.Curator.Name, $"%{filter.CuratorName}%"));

            return query;
        }
    }
}
