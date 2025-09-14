using Faker;
using studentServer.Entity;

namespace studentServer.TempService
{
    public class studentGenerator
    {
        private static readonly Random random = new();
        public static StudentData GenerateRandomStudent()
        {
            return new StudentData
            {
                Contract = GenerateRandomContract(),
                FinanceDoc = GenerateRandomFinance(),
                PersonalData = GenerateRandomPersonalData(),
                Visa = GenerateRandomVisa()
            };
        }

        private static Contract GenerateRandomContract()
        {
            return new Contract
            {
                NumberUVM = "UVM-" + random.Next(10000, 99999),
                Number3Party = random.Next(2) == 1 ? "3PTY-" + random.Next(1000, 9999) : null,
                Date3Party = random.Next(2) == 1 ? DateTime.Today.AddDays(-random.Next(30, 365)) : null,
                Number2Party = random.Next(2) == 1 ? "2PTY-" + random.Next(1000, 9999) : null,
                Date2Party = random.Next(2) == 1 ? DateTime.Today.AddDays(-random.Next(30, 180)) : null,
                GroupNumber = "GRP-" + random.Next(10, 99),
                DateOfDispatch = random.Next(2) == 1 ? DateTime.Today.AddDays(-random.Next(1, 30)) : null,
                MailCompany = random.Next(2) == 1 ? Faker.Company.Name() : null,
                DateReturn = random.Next(2) == 1 ? DateTime.Today.AddDays(random.Next(30, 90)) : null
            };
        }

        private static FinanceDoc GenerateRandomFinance()
        {
            return new FinanceDoc
            {
                PaymentOfContribution = random.Next(2) == 1,
                PaymentOfContributionYear = random.Next(2) == 1,
                CheckNumber = random.Next(2) == 1 ? random.Next(1000, 9999).ToString() : null,
                CheckDate = random.Next(2) == 1 ? DateOnly.FromDateTime(DateTime.Today.AddDays(-random.Next(365))) : null,
                CardIsReady = random.Next(2) == 1,
                CardIsGet = random.Next(2) == 1
            };
        }

        private static PersonalData GenerateRandomPersonalData()
        {
            return new PersonalData
            {
                Surname = Name.Last(),
                Name = Name.First(),
                Patronymic = random.Next(2) == 1 ? Name.Middle() : null,
                SurnameEn = random.Next(2) == 1 ? Faker.Lorem.GetFirstWord().ToUpper() : null,
                NameEn = random.Next(2) == 1 ? Faker.Lorem.GetFirstWord().ToUpper() : null,
                PatronymicEn = random.Next(2) == 1 ? Faker.Lorem.GetFirstWord().ToUpper() : null,
                Birthday = DateOnly.FromDateTime(DateTime.Today.AddYears(-random.Next(18, 30))),
                PassportSeries = random.Next(1000, 9999).ToString(),
                PassportNumber = random.Next(100000, 999999).ToString(),
                PassportDateOfIssue = DateOnly.FromDateTime(DateTime.Today.AddYears(-random.Next(1, 10))),
                PassportDateEnd = DateOnly.FromDateTime(DateTime.Today.AddYears(random.Next(1, 10))),
                PlaceOfBirth = $"{Address.City()}, {Address.Country()}",
                CityOfRegistration = Address.City(),
                AddressRegistration = Address.StreetAddress(),
                AddressRegistrationIndex = random.Next(100000, 999999).ToString(),
            };
        }

        private static VISA GenerateRandomVisa()
        {
            return new VISA
            {
                InviteNumber = random.Next(2) == 1 ? "INV-" + random.Next(1000, 9999) : null,
                ArrivalDate = random.Next(2) == 1 ? DateOnly.FromDateTime(DateTime.Today.AddDays(-random.Next(30, 365))) : null,
                VisaId = random.Next(2) == 1 ? "VID" + random.Next(10000, 99999) : null,
                VisaSeries = random.Next(2) == 1 ? random.Next(10, 99).ToString("00") : null,
                VisaNumber = random.Next(2) == 1 ? random.Next(100000, 999999).ToString() : null,
                VisaIssueDate = random.Next(2) == 1 ? DateOnly.FromDateTime(DateTime.Today.AddDays(-random.Next(30, 180))) : null,
                VisaReceiptDate = random.Next(2) == 1 ? DateOnly.FromDateTime(DateTime.Today.AddDays(-random.Next(1, 29))) : null,
                VisaValidityDate = random.Next(2) == 1 ? DateOnly.FromDateTime(DateTime.Today.AddDays(random.Next(90, 365))) : null
            };
        }
    }
}

