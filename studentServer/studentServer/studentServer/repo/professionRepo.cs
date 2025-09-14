using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class professionRepo(AppDbStudentContext _dbContext)
    {
        public async Task<List<Profession>> GetAllProffesionAsync()
        {
            return await _dbContext.Profession.ToListAsync();
        }

        public async Task<Profession> GetProffesionByIdAsync(int id)
        {
            return await _dbContext.Profession.FindAsync(id);
        }

        public async Task SetProffesionAsync(Profession profession)
        {
            await _dbContext.Profession.AddAsync(profession);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateProffesionAsync(Profession profession)
        {
            _dbContext.Profession.Update(profession);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteProffesionAsync(Profession profession)
        {
            _dbContext.Profession.Remove(profession);
            await _dbContext.SaveChangesAsync();
        }
    }
}
