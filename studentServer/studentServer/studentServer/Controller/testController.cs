using Microsoft.AspNetCore.Mvc;
using studentServer.Service;
using studentServer.TempService;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class testController(RandomDataSetInBase testBase) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> TEST()
        {
            try
            {
                testBase.setInBaseCompany();
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }
    }
}
