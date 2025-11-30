using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using studentServer.Entity;
using studentServer.Service.FileOperation;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class operationController(OperationService operationService):ControllerBase
    {
        [HttpPost("makeDocumet")]
        public async Task<IActionResult> MakeStudentDocument([FromBody] OperationEntity operationEntity)
        {
            byte[] data = await operationService.makeStudentDocumentAsync(operationEntity);
            return File(data, "application/zip", "documents.zip");
        }
    }
}
