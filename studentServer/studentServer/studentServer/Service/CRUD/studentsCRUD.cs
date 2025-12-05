using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using studentServer.Entity;
using studentServer.Entity.DBEntity;
using studentServer.repo;

namespace studentServer.Service.CRUD
{
    public class studentsCRUD(studentRepo repository, LogService logger)
    {
        public async Task<StudentPreviewPageData> getStudentPreviewAsync(PageSearchEntity pageQuery)
        {
            StudentPreviewPageData studentPreviewPageData = new StudentPreviewPageData();

            if (pageQuery.searchFilter == null)
            {
                studentPreviewPageData = await repository.GetStudentPreviewAsync(pageQuery.page);
            }
            else
            {
                studentPreviewPageData = await repository.GetStudentPreviewSearchAsync(pageQuery);
            }

            return studentPreviewPageData;
        }

        public async Task<StudentDataDTO> getStudentDataAsync(int idStudent)
        {
            return await repository.GetStudentByIdAsync(idStudent);
        }

        public async Task deleteStudentsAsync(List<int> idCompany)
        {
            foreach (var id in idCompany)
            {
                Student student = new Student { Id = id };
                await repository.DeleteStudentAsync(student);

                await logger.addMessageAsync(new LogMessage
                {
                    Message = $"Студент с id={id} удален",
                    Timestamp = DateTime.UtcNow,
                    Type = "Удаление",
                    User = ""
                });
            }
        }

        public async Task patchStudentsAsync(StudentDataDTO newStudentsData)
        {
            await repository.UpdateStudentAsync(newStudentsData);

            await logger.addMessageAsync(new LogMessage
            {
                Message = $"Студент с id={newStudentsData.student.Id} изменен",
                Timestamp = DateTime.UtcNow,
                Type = "Редактирование",
                User = ""
            });
        }

        public async Task patchGroupStudentsAsync(StudentGroupDataDTO newStudentsData)
        {
            StudentDataDTO patchData = EntityMapper.ToStudentDataDTO(newStudentsData);

            foreach (int idUser in newStudentsData.idList)
            {
                try
                {
                    //Выгружаем старые данные
                    StudentDataDTO oldData = await repository.GetStudentByIdAsync(idUser);

                    DtoMerger.ApplyPatch(oldData, patchData);
                    //измененные даныне записываем
                    await patchStudentsAsync(oldData);

                    await logger.addMessageAsync(new LogMessage
                    {
                        Message = $"Студент с id={idUser} изменен",
                        Timestamp = DateTime.UtcNow,
                        Type = "Редактирование",
                        User = ""
                    });
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"Ошибка при груповом изменении данных пользователя {idUser}: {ex.Message}");
                }
            }
        }

        public async Task addStudentsAsync(StudentDataDTO newStudentData, int count)
        {
            for (int i = 0; i < count; i++)
            {
                await repository.AddStudentAsync(newStudentData);

                await logger.addMessageAsync(new LogMessage
                {
                    Message = $"Студент создан",
                    Timestamp = DateTime.UtcNow,
                    Type = "Создание",
                    User = ""
                });
            }
        }
    }
}
