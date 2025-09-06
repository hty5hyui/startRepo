using studentServer.Entity;
using studentServer.repo;
using studentServer.TempService;

namespace studentServer.Service
{
    public class studentsCRUD(studentRepo repository)
    {
        public async Task<List<StudentData>> getAllStudent(int page)
        {
            List<StudentData> students = new List<StudentData>();
            for (int i = 0; i < 5; i++)
            {
                students.Add(studentGenerator.GenerateRandomStudent());
            }

            return students;
        }

        public async Task<StudentData> getStudentDataAsync(int idStudent)
        {
            return studentGenerator.GenerateRandomStudent();
        }


        public async Task deleteStudentsAsync(List<int> idCompany)
        {

        }

        public async Task patchStudentsyAsync(PatchStudent newStudentsData)
        {

        }

        public async Task addStudentsAsync(StudentData newStudentData, int count)
        {

        }

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
            if(string.IsNullOrWhiteSpace(profession.ProfessionName) ||
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
