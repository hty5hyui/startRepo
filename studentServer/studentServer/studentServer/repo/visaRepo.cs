using Microsoft.EntityFrameworkCore;
using studentServer.Entity.DBEntity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class visaRepo(AppDbStudentContext _dbContext)
    {
        public async Task<List<VISA>> GetAllVISAAsync()
        {
            return await _dbContext.VISA.ToListAsync();
        }

        public async Task<VISA> GetVISAByIdAsync(int id)
        {
            return await _dbContext.VISA.FindAsync(id);
        }

        public async Task SetVISAAsync(VISA visa)
        {
            await _dbContext.VISA.AddAsync(visa);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateVISAAsync(VISA visa)
        {
            _dbContext.VISA.Update(visa);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteVISAAsync(VISA visa)
        {
            _dbContext.VISA.Remove(visa);
            await _dbContext.SaveChangesAsync();
        }
    }
}
