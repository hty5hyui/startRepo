using Microsoft.EntityFrameworkCore;
using Npgsql;
using studentServer.Entity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class studentRepo(AppDbStudentContext _dbContext)
    {
        int pageSize = 30;
        public async Task<List<Student>> GetAllStudentAsync()
        {
            return await _dbContext.Students.ToListAsync();
        }

        public async Task<Student> GetStudentByIdAsync(int id)
        {
            return await _dbContext.Students.FindAsync(id);
        }

        public async Task SetStudentAsync(Student student)
        {
            await _dbContext.Students.AddAsync(student);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateStudentAsync(Student student)
        {
            _dbContext.Students.Update(student);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteStudentAsync(Student student)
        {
            _dbContext.Students.Remove(student);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<StudentPreview>> GetStudentPreviewAsync(int page)
        {
            return await _dbContext.Students.OrderBy(a => a.Id)
                                            .Select(s => new StudentPreview
                                            {
                                                Id = s.Id,
                                                Surname = s.PersonalData.Surname,
                                                Name = s.PersonalData.Name,
                                                Patronymic = s.PersonalData.Patronymic,
                                                PassportSeries = s.PersonalData.PassportSeries,
                                                PassportNumber = s.PersonalData.PassportNumber,
                                                GroupNumber = s.Contract.GroupNumber,
                                                CompanyName = s.Company != null ? s.Company.Name : null,
                                                ProfessionName = s.Profession != null ? s.Profession.ProfessionName : null,
                                                Curator = s.Curator
                                            })
                                            .Skip((page - 1) * pageSize)
                                            .Take(pageSize)
                                            .ToListAsync();
        }
    }
}
 