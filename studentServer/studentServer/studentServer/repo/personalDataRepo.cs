using Microsoft.EntityFrameworkCore;
using studentServer.Entity.DBEntity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class personalDataRepo(AppDbStudentContext _dbContext)
    {
        public async Task<List<PersonalData>> GetAllPersonalDataAsync()
        {
            return await _dbContext.PersonalData.ToListAsync();
        }

        public async Task<PersonalData> GetPersonalDataByIdAsync(int id)
        {
            return await _dbContext.PersonalData.FindAsync(id);
        }

        public async Task SetPersonalDataAsync(PersonalData personalData)
        {
            await _dbContext.PersonalData.AddAsync(personalData);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdatePersonalDataAsync(PersonalData personalData)
        {
            _dbContext.PersonalData.Update(personalData);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeletePersonalDataAsync(PersonalData personalData)
        {
            _dbContext.PersonalData.Remove(personalData);
            await _dbContext.SaveChangesAsync();
        }
    }
}
