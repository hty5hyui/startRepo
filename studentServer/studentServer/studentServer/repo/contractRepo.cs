using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class contractRepo(AppDbStudentContext _dbContext)
    {
        public async Task<List<Contract>> GetAllContractAsync()
        {
            return await _dbContext.Contract.ToListAsync();
        }

        public async Task<Contract> GetContractByIdAsync(int id) 
        {
            return await _dbContext.Contract.FindAsync(id);
        }

        public async Task SetContractAsync(Contract contract)
        {
            await _dbContext.Contract.AddAsync(contract);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateContractAsync(Contract contract)
        {
            _dbContext.Contract.Update(contract);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteContractAsync(Contract contract)
        {
            _dbContext.Contract.Remove(contract);
            await _dbContext.SaveChangesAsync();
        }
    }
}
