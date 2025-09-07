using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class companyRepo(AppDbStudentContext _dbContext)
    {
        int pageSize = 20;
        public async Task<List<Company>> GetAllCompanyAsync(int page)
        {
            return await _dbContext.Company.OrderBy(a => a.Id)
                                           .Skip((page - 1)* pageSize)
                                           .Take(pageSize)
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
