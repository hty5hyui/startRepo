using studentServer.Entity.DBEntity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class EducationRepo(AppDbStudentContext _dbContext)
    {
        internal async Task<Education?> GetEducationByStudentIdAsync(int studentId)
        {
            return await _dbContext.Education.FindAsync(studentId);
        }

        internal async Task UpdateEducationAsync(Education education)
        {
            _dbContext.Education.Update(education);
            await _dbContext.SaveChangesAsync();
        }
    }
}
