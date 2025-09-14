using studentServer.Entity;
using studentServer.repo;
using studentServer.TempService;

namespace studentServer.Service
{
    public class studentsCRUD(studentRepo repository)
    {
        public async Task<List<StudentPreview>> getStudentPreviewAsync(int page)
        {
            return await repository.GetStudentPreviewAsync(page);
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
    }
}
