using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using studentServer.Entity.DBEntity;
using studentServer.Service.CRUD;

namespace studentServer.Filters
{
    public class GlobalExceptionFilter(LogService _logService) : IAsyncExceptionFilter
    {
        public async Task OnExceptionAsync(ExceptionContext context)
        {
            Console.WriteLine($"Ошибка при выполнении запроса: {context.Exception.Message}");
            await _logService.addMessageAsync(new LogMessage
            {
                Message = $"Ошибка при выполнении запроса {context.Exception.Message}",
                Timestamp = DateTime.UtcNow,
                Type = "Ошибка",
                User = ""
            });

            var response = new
            {
                error = new
                {
                    message = context.Exception.Message,
                    statusCode = StatusCodes.Status500InternalServerError,
                    path = context.HttpContext.Request.Path,
                    timestamp = DateTime.UtcNow
                }
            };

            context.Result = new JsonResult(response)
            {
                StatusCode = StatusCodes.Status500InternalServerError
            };

            context.ExceptionHandled = true;
        }
    }
}
