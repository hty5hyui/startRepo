using studentServer.Entity;
using studentServer.repo;

namespace studentServer.Service
{
    public class curatorCRUD(curatorRepo repository)
    {
        public async Task<List<CuratorDTO>> GetAllCuratorAsync()
        {
            return await repository.GetAllCuratorAsync();
        }

        public async Task<String> GetCuratorDataAsync(int idCurator)
        {
            return await repository.GetCuratorByIdAsync(idCurator);
        }

        public async Task DeleteCuratorAsync(int idCurator)
        {
            Curator curator = new Curator { Id = idCurator };
            await repository.DeleteCuratorAsync(curator);
        }

        public async Task UpdateCuratorAsync(Curator newCuratorData)
        {
            await repository.UpdateCuratorAsync(newCuratorData);
        }

        public async Task SetCuratorAsync(Curator curatorData)
        {
            await repository.SetCuratorAsync(curatorData);
        }
    }
}
