using studentServer.Entity;
using studentServer.repo;

namespace studentServer.Service
{
    public class professionCRUD(professionRepo repository)
    {
        public async Task<List<Profession>> GetAllProfessionAsync()
        {
            return await repository.GetAllProffesionAsync();
        }

        public async Task<Profession> GetProfessionByIdAsync(int id)
        {
            return await repository.GetProffesionByIdAsync(id);
        }

        public async Task SetProfessionAsync(Profession profession)
        {
            if (string.IsNullOrWhiteSpace(profession.ProfessionName) ||
               string.IsNullOrWhiteSpace(profession.ProfessionNumber))
            {
                throw new Exception("Имя или номер профессии не заданы");
            }
            await repository.SetProffesionAsync(profession);
        }

        public async Task UpdateProfessionAsync(Profession profession)
        {
            if (!profession.Id.HasValue ||
                string.IsNullOrWhiteSpace(profession.ProfessionName) ||
                string.IsNullOrWhiteSpace(profession.ProfessionNumber))
            {
                throw new Exception("Пустые данные");
            }
            await repository.UpdateProffesionAsync(profession);
        }

        public async Task DeleteProfessionAsync(Profession profession)
        {
            if (!profession.Id.HasValue ||
                string.IsNullOrWhiteSpace(profession.ProfessionName) ||
                string.IsNullOrWhiteSpace(profession.ProfessionNumber))
            {
                throw new Exception("Пустые данные");
            }
            await repository.DeleteProffesionAsync(profession);
        }
    }
}
