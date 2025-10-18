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
            foreach (var id in idCompany)
            {
                Student student = new Student{Id = id};
                await repository.DeleteStudentAsync(student);
            }
        }

        public async Task patchStudentsAsync(StudentDataDTO newStudentsData)
        {
           await repository.UpdateStudentAsync(newStudentsData);
        }

        public async Task addStudentsAsync(StudentDataDTO newStudentData, int count)
        {
            for (int i = 0; i < count; i++)
            {
                await repository.AddStudentAsync(newStudentData);
            }   
        }       
    }
}
