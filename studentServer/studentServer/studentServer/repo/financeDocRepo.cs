using Microsoft.EntityFrameworkCore;
using studentServer.Entity.DBEntity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class financeDocRepo(AppDbStudentContext _dbContext)
    {
        public async Task<List<FinanceDoc>> GetAllFinanceDocAsync()
        {
            return await _dbContext.FinanceDoc.ToListAsync();
        }

        public async Task<FinanceDoc> GetFinanceDocByIdAsync(int id)
        {
            return await _dbContext.FinanceDoc.FindAsync(id);
        }

        public async Task SetFinanceDocAsync(FinanceDoc financeDoc)
        {
            await _dbContext.FinanceDoc.AddAsync(financeDoc);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateFinanceDocAsync(FinanceDoc financeDoc)
        {
            _dbContext.FinanceDoc.Update(financeDoc);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteFinanceDocAsync(FinanceDoc financeDoc)
        {
            _dbContext.FinanceDoc.Remove(financeDoc);
            await _dbContext.SaveChangesAsync();
        }
    }
}
