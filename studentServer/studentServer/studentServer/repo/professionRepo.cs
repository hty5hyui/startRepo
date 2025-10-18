using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using studentServer.repo.Data;
using studentServer.Service;

namespace studentServer.repo
{
    public class professionRepo(AppDbStudentContext _dbContext)
    {
        public async Task<List<ProfessionDTO>> GetAllProffesionAsync()
        {
            return await _dbContext.Profession
                                   .Select(p => new ProfessionDTO
                                   {
                                       Id = p.Id,
                                       ProfessionName = p.ProfessionName,
                                       ProfessionNumber = p.ProfessionNumber

                                   })
                                   .ToListAsync();
        }

        public async Task<ProfessionDTO> GetProffesionByIdAsync(int id)
        {
            Profession p = await _dbContext.Profession.FindAsync(id);
            return EntityMapper.ToProfessionDTO(p);
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
