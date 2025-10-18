using studentServer.Entity;

namespace studentServer.TempService
{
    public class companyGenerator
    {
        private static readonly Random random = new Random();

        //public static studentServer.Entity.Company GenerateRandomCompany()
        //{
        //    return new studentServer.Entity.Company
        //    {
        //        Name = Faker.Company.Name(),
        //        PracticeAddress = GeneratePracticeAddress(),
        //        INN = GenerateINN(),
        //        KPP = GenerateKPP(),
        //        OGRN = GenerateOGRN(),
        //        PaymantAccount = GenerateAccountNumber(20),
        //        Bank = $"{Faker.Company.Name()} Bank",
        //        CorrespondentAccount = GenerateAccountNumber(20),
        //        BIK = GenerateBIK(),
        //        Mail = Internet.Email(),
        //        Director = Name.FullName(),
        //        HeadOfTheCompany = random.Next(2) == 1 ? Name.FullName() : null
        //    };
        //}

        //private static string GeneratePracticeAddress()
        //{
        //    return $"{Address.Country()}, {Address.City()}, {Address.StreetAddress()}";
        //}

        //private static string GenerateINN()
        //{
        //    // 10-значный ИНН для юридических лиц
        //    return random.Next(1000000000, 2147483647).ToString("D10");
        //}

        //private static string GenerateKPP()
        //{
        //    // 9-значный КПП
        //    return random.Next(100000000, 999999999).ToString();
        //}

        //private static string GenerateOGRN()
        //{
        //    // 13-значный ОГРН
        //    return random.Next(1000000000, 2147483647).ToString("D13");
        //}

        //private static string GenerateAccountNumber(int length)
        //{
        //    // Генерация номера счета указанной длины
        //    var account = new char[length];
        //    for (int i = 0; i < length; i++)
        //    {
        //        account[i] = random.Next(0, 10).ToString()[0];
        //    }
        //    return new string(account);
        //}

        //private static string GenerateBIK()
        //{
        //    // 9-значный БИК
        //    return random.Next(100000000, 999999999).ToString();
        //}
    }
}
