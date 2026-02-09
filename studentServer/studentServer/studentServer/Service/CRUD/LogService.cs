using studentServer.Entity.DBEntity;
using studentServer.repo;

namespace studentServer.Service.CRUD
{
    public class LogService(logRepo repository)
    {
        internal async Task addMessageAsync(LogMessage message)
        {
            await repository.addMessage(message);
        }
    }
}
