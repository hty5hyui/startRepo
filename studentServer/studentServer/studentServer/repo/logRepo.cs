using studentServer.Entity.DBEntity;
using studentServer.repo.Data;

namespace studentServer.repo
{
    public class logRepo(AppDbStudentContext _dbContext)
    {
        internal async Task addMessage(LogMessage message)
        {
            await _dbContext.LogMessage.AddAsync(message);
            await _dbContext.SaveChangesAsync();
        }
    }
}
