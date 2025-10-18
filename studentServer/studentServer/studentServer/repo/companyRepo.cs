using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class companyRepo(AppDbStudentContext _dbContext)
    {
        int pageSize = 20;
        public async Task<List<CompanyDTO>> GetAllCompanyAsync(int page)
        {
            return await _dbContext.Company.OrderBy(a => a.Name)
                                           .Skip((page - 1)* pageSize)
                                           .Take(pageSize)
                                           .Select(c => new CompanyDTO
                                           {
                                               Id = c.Id,
                                               Name = c.Name,
                                               Bank = c.Bank,
                                               BIK = c.BIK,
                                               CompanyAddress = c.CompanyAddress,
                                               CorrespondentAccount = c.CorrespondentAccount,
                                               Director = c.Director,
                                               HeadOfTheCompany = c.HeadOfTheCompany,
                                               INN = c.INN,
                                               KPP = c.KPP,
                                               Mail = c.Mail,
                                               OGRN = c.OGRN,
                                               PaymantAccount = c.PaymantAccount,
                                               PracticeAddress = c.PracticeAddress,
                                           })
                                           .ToListAsync();
        }

        public async Task<List<CompanyNameDTO>> GetAllCompanyNameAsync()
        {
            return await _dbContext.Company.OrderBy(a => a.Name)
                                           .Select(c => new CompanyNameDTO 
                                           {
                                               Id = c.Id,
                                               Name = c.Name
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
