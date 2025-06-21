using studentServer.Entity;
using studentServer.TempService;

namespace studentServer.Service
{
    public class companyCRUD
    {
        public static async Task<List<Company>> getAllCompanyDataAsync(int page)
        {
            List<Company> companies = new List<Company>();
            for (int i = 0; i < 5; i++)
            {
                companies.Add(companyGenerator.GenerateRandomCompany());
            }
            return companies;
        }

        public static async Task<Company> getCompanyDataAsync(int idCompany)
        {
            return companyGenerator.GenerateRandomCompany();
        }

        public static async Task deleteCompanyAsync(int idCompany)
        {

        }

        public static async Task patchCompanyAsync(Company newCompanyData)
        {

        }

        public static async Task addCompanyAsync(Company companyData)
        {

        }
    }
}
