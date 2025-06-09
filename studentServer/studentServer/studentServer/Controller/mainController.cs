using Microsoft.AspNetCore.Mvc;
using studentServer.Service;

namespace studentServer.Controller
{
    [ApiController]
    //[Route("[controller]")]
    public class mainController : ControllerBase
    {
        [HttpGet("/")]
        public async Task<IActionResult> GetMainPage()
        {
            try
            {
                string page = await htmlGenerator.mainPageGenerator();
                return new ContentResult
                {
                    Content = page,
                    ContentType = "text/html"
                };

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }
    }
}
