using studentServer.Entity;

namespace studentServer.Service
{
    public class companyCRUD
    {
        public static async Task<List<CompanyStruct>> getAllCompanyDataAsync()
        {
            return [];
        }

        public static async Task<CompanyStruct> getCompanyDataAsync(int idCompany)
        {
            return new CompanyStruct();
        }

        public static async Task deleteCompanyAsync(int idCompany)
        {

        }

        public static async Task patchCompanyAsync(CompanyStruct newCompanyData)
        {

        }

        public static async Task addCompanyAsync(CompanyStruct companyData)
        {

        }
    }
}
