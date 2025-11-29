using Microsoft.EntityFrameworkCore;
using studentServer.Entity.DBEntity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class curatorRepo(AppDbStudentContext _dbContext)
    {
        public async Task<List<CuratorDTO>> GetAllCuratorAsync()
        {
            return await _dbContext.Curator
                                   .OrderBy(n => n.Name)
                                   .Select(c => new CuratorDTO
                                   {
                                       Id = c.Id,
                                       Name = c.Name
                                   })
                                   .ToListAsync();
        }

        public async Task<String> GetCuratorByIdAsync(int id)
        {
            Curator curator = await _dbContext.Curator.FindAsync(id);
            return curator.Name;
        }

        public async Task SetCuratorAsync(Curator curator)
        {
            await _dbContext.Curator.AddAsync(curator);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateCuratorAsync(Curator curator)
        {
            _dbContext.Curator.Update(curator);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteCuratorAsync(Curator curator)
        {
            _dbContext.Curator.Remove(curator);
            await _dbContext.SaveChangesAsync();
        }
    }
}
