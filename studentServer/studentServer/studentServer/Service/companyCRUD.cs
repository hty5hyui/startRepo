using Microsoft.AspNetCore.Mvc.RazorPages;
using studentServer.Entity;
using studentServer.repo;
using studentServer.TempService;

namespace studentServer.Service
{
    public class companyCRUD(companyRepo repository)
    {
        public async Task<List<CompanyDTO>> getAllCompanyDataAsync(int page)
        {
            return await repository.GetAllCompanyAsync(page);
        }

        public async Task<List<CompanyNameDTO>> getAllCompanyNameAsync()
        {
            return await repository.GetAllCompanyNameAsync();
        }

        public async Task<Company> getCompanyDataAsync(int idCompany)
        {
            return await repository.GetCompanyByIdAsync(idCompany);
        }

        public async Task deleteCompanyAsync(int idCompany)
        {
            Company company = new Company { Id = idCompany };
            await repository.DeleteCompanyAsync(company);
        }

        public async Task patchCompanyAsync(Company newCompanyData)
        {
            await repository.UpdateCompanyAsync(newCompanyData);
        }

        public async Task addCompanyAsync(Company companyData)
        {
            await repository.SetCompanyAsync(companyData);
        }
    }
}
