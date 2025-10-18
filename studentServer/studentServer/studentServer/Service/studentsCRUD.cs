using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using studentServer.Entity;
using studentServer.repo;

namespace studentServer.Service
{
    public class studentsCRUD(studentRepo repository)
    {
        public async Task<List<StudentPreview>> getStudentPreviewAsync(int page)
        {
            return await repository.GetStudentPreviewAsync(page);
        }

        public async Task<StudentDataDTO> getStudentDataAsync(int idStudent)
        {
            return await repository.GetStudentByIdAsync(idStudent);
        }


        public async Task deleteStudentsAsync(List<int> idCompany)
        {

        }

        public async Task patchStudentsyAsync(PatchStudent newStudentsData)
        {
            Console.WriteLine(JsonConvert.SerializeObject(newStudentsData));
        }

        public async Task addStudentsAsync(StudentDataDTO newStudentData, int count)
        {
            await repository.AddStudentAsync(newStudentData);
        }       
    }
}
