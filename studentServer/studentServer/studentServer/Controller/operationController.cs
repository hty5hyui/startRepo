using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using studentServer.Entity;
using studentServer.Service.FileOperation;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class operationController(OperationService operationService, IMemoryCache cache) :ControllerBase
    {
        [HttpPost("makeDocumet")]
        public IActionResult StartMakeStudentDocument([FromBody] OperationEntity operationEntity)
        {
            string ticketId = Guid.NewGuid().ToString();//Создаем уникальный идентификатор задачи
            ProgressEntity progressEntity = new ProgressEntity();
            cache.Set(ticketId, progressEntity, TimeSpan.FromMinutes(10));//Сохраняем прогресс в кэш на 10 минут

            Task.Run(() =>
            {
                operationService.makeStudentDocumentAsync(operationEntity, ticketId);
            });

            //byte[] data = await operationService.makeStudentDocumentAsync(operationEntity);
            //return File(data, "application/zip", "documents.zip");
            return Accepted(new { TicketId = ticketId });
        }


        [HttpGet("makeDocumet/status/{ticketId}")]
        public IActionResult CheckStatus(string ticketId)
        {
            if (!cache.TryGetValue(ticketId, out ProgressEntity? status))
            {
                return NotFound(new { Message = "Задачи с таким ID не существует или срок действия истек" });
            }

            return Ok(new { status.Progress, status.IsReady, status.Error });
        }

        [HttpGet("makeDocumet/download/{ticketId}")]
        public IActionResult DownloadZip(string ticketId)
        {
            if (!cache.TryGetValue(ticketId, out ProgressEntity? status) || !status.IsReady || status.ResultData == null)
            {
                return BadRequest("Файл еще не готов или удален");
            }

            // Отдаем ZIP пользователю
            FileContentResult result = File(status.ResultData, "application/zip", "documents.zip");

            // Очищаем память
            cache.Remove(ticketId);

            return result;
        }
    }
}
