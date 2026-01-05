using Microsoft.EntityFrameworkCore;
using studentServer.Entity.DBEntity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class companyRepo(AppDbStudentContext _dbContext)
    {
        int pageSize = 20; //Количество записей на странице

        public async Task<List<CompanyDTO>> GetAllCompanyAsync(int page)
        {
            return await _dbContext.Company.OrderBy(a => a.NameCompanyRF)
                                           .Skip((page - 1)* pageSize)
                                           .Take(pageSize)
                                           .Select(c => new CompanyDTO
                                           {
                                               Id = c.Id,
                                               NameCompanyRF = c.NameCompanyRF,
                                               NameCompanyKNDR = c.NameCompanyKNDR,
                                               CompanyAddress = c.CompanyAddress,
                                               HeadOfTheCompany = c.HeadOfTheCompany,
                                               INN = c.INN,
                                               CompanyActivities = c.CompanyActivities
                                           })
                                           .ToListAsync();
        }

        public async Task<List<CompanyNameDTO>> GetAllCompanyNameAsync()
        {
            return await _dbContext.Company.OrderBy(a => a.NameCompanyRF)
                                           .Select(c => new CompanyNameDTO 
                                           {
                                               Id = c.Id,
                                               Name = c.NameCompanyRF
                                           })
                                           .ToListAsync();
        }

        public async Task<Company> GetCompanyByIdAsync(int id)
        {
            return await _dbContext.Company.FindAsync(id);
        }

        public async Task SetCompanyAsync(Company company)
        {
            await _dbContext.Company.AddAsync(company);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateCompanyAsync(Company company)
        {
            _dbContext.Company.Update(company);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteCompanyAsync(Company company)
        {
            _dbContext.Company.Remove(company);
            await _dbContext.SaveChangesAsync();
        }
    }
}
