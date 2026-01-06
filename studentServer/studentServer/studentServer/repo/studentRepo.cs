using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using studentServer.Entity.DBEntity;
using studentServer.repo.Data;
using studentServer.Service;

namespace studentServer.repo
{
    public class studentRepo(AppDbStudentContext _dbContext)
    {
        int pageSize = 30;
        public async Task<List<Student>> GetAllStudentAsync()
        {
            return await _dbContext.Students.ToListAsync();
        }

        public async Task<StudentDataDTO> GetStudentByIdAsync(int id)
        {
            

            var data = await _dbContext.Students
                                       .AsNoTracking()
                                       .Include(s => s.Contract)
                                       .Include(s => s.FinanceDoc)
                                       .Include(s => s.PersonalData)
                                       .Include(s => s.VISA)
                                       .FirstOrDefaultAsync(s => s.Id == id);


            if (data != null)
            {
                StudentDataDTO studentDataDTO = new StudentDataDTO
                {
                    student = new StudentDTO
                    {
                        Id = id,
                        CompanyId = data.CompanyId,
                        ProfessionId = data.ProfessionId,
                        CuratorId = data.CuratorId
                    },
                    contract = EntityMapper.ToContractDTO(data.Contract),
                    financeDoc = EntityMapper.ToFinanceDocDTO(data.FinanceDoc),
                    personalData = EntityMapper.ToPersonalDataDTO(data.PersonalData),
                    visa = EntityMapper.ToVISADTO(data.VISA)
                };

                return studentDataDTO;
            }
            else
            {
                return new StudentDataDTO();
            }
            
        }

        public async Task AddStudentAsync(StudentDataDTO studentData)
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                Student student = EntityMapper.ToStudent(studentData.student);

                FinanceDoc financeDoc = EntityMapper.ToFinanceDoc(studentData.financeDoc);
                VISA visa = EntityMapper.ToVISA(studentData.visa);
                PersonalData personalData = EntityMapper.ToPersonalData(studentData.personalData);
                Contract contract = EntityMapper.ToContract(studentData.contract);

                student.FinanceDoc = financeDoc;
                student.VISA = visa;
                student.PersonalData = personalData;
                student.Contract = contract;

                _dbContext.Students.Add(student);

                await _dbContext.SaveChangesAsync();

                // Если все операции успешны, подтверждаем транзакцию
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка при добавлении студента: {ex.Message}");
                await transaction.RollbackAsync();
            }

        }

        public async Task UpdateStudentAsync(StudentDataDTO studentData)
        {
            await using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                Student student = EntityMapper.ToStudent(studentData.student);
                _dbContext.Students.Update(student);
                await _dbContext.SaveChangesAsync();

                FinanceDoc financeDoc = EntityMapper.ToFinanceDoc(studentData.financeDoc);
                financeDoc.Id = student.Id;
                _dbContext.FinanceDoc.Update(financeDoc);
                await _dbContext.SaveChangesAsync();

                VISA visa = EntityMapper.ToVISA(studentData.visa);
                visa.Id = student.Id;
                _dbContext.VISA.Update(visa);
                await _dbContext.SaveChangesAsync();

                PersonalData personalData = EntityMapper.ToPersonalData(studentData.personalData);
                personalData.Id = student.Id;
                _dbContext.PersonalData.Update(personalData);
                await _dbContext.SaveChangesAsync();

                Contract contract = EntityMapper.ToContract(studentData.contract);
                contract.Id = student.Id;
                _dbContext.Contract.Update(contract);
                await _dbContext.SaveChangesAsync();

                // Если все операции успешны, подтверждаем транзакцию
                await transaction.CommitAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка при обновлении студента: {ex.Message}");
                await transaction.RollbackAsync();
            }
        }

        public async Task DeleteStudentAsync(Student student)
        {
            try
            {
                _dbContext.Students.Remove(student);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Ошибка при удалении студента: {ex.Message}");
            }
        }

        internal async Task<StudentPreviewPageData> GetStudentPreviewAsync(int page)
        {
            StudentPreviewPageData data = new StudentPreviewPageData();

            data.studentPreviews = await _dbContext.Students.OrderByDescending(student => student.Id)
                                                                              .Skip((page - 1) * pageSize)
                                                                              .Take(pageSize)
                                                                              .Select(s => new StudentPreview
                                                                              {
                                                                                  Id = s.Id,
                                                                                  Surname = s.PersonalData.Surname,
                                                                                  Name = s.PersonalData.Name,
                                                                                  Patronymic = s.PersonalData.Patronymic,
                                                                                  PassportSeries = s.PersonalData.PassportSeries,
                                                                                  PassportNumber = s.PersonalData.PassportNumber,
                                                                                  GroupNumber = s.PersonalData.GroupNumber,
                                                                                  CompanyName = s.Company.NameCompanyRF,
                                                                                  ProfessionName = s.Profession.ProfessionName,
                                                                                  Curator = s.Curator.Name
                                                                              }).ToListAsync();

            int rowCount = await _dbContext.Students.CountAsync();
            data.pageCount = (int)Math.Ceiling((double)rowCount / pageSize);

            return data;
        }

        internal async Task<StudentPreviewPageData> GetStudentPreviewSearchAsync(PageSearchEntity pageQuery)
        {
            StudentPreviewPageData data = new StudentPreviewPageData();

            IQueryable<Student> baseQuery = _dbContext.Students
                                                      .Include(table => table.PersonalData)
                                                      .Include(table => table.Contract)
                                                      .Include(table => table.Company)
                                                      .Include(table => table.FinanceDoc)
                                                      .Include(table => table.VISA)
                                                      .Include(table => table.Profession)
                                                      .Include(table => table.Curator);

            IQueryable<Student> filteredQuery = queryBuilder.ApplyFilters(baseQuery, pageQuery.searchFilter!);

            data.studentPreviews = await filteredQuery.OrderByDescending(student => student.Id)
                                                      .Skip((pageQuery.page - 1) * pageSize)
                                                      .Take(pageSize)
                                                      .Select(s => new StudentPreview
                                                      {
                                                          Id = s.Id,
                                                          Surname = s.PersonalData.Surname,
                                                          Name = s.PersonalData.Name,
                                                          Patronymic = s.PersonalData.Patronymic,
                                                          PassportSeries = s.PersonalData.PassportSeries,
                                                          PassportNumber = s.PersonalData.PassportNumber,
                                                          GroupNumber = s.PersonalData.GroupNumber,
                                                          CompanyName = s.Company.NameCompanyRF,
                                                          ProfessionName = s.Profession.ProfessionName,
                                                          Curator = s.Curator.Name
                                                      }).ToListAsync();

            int rowCount = await filteredQuery.CountAsync();
            data.pageCount = (int)Math.Ceiling((double)rowCount / pageSize);

            return data;
        }
    }
}
 