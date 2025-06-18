using Microsoft.AspNetCore.Mvc;
using studentServer.Entity;
using studentServer.Service;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class companyController: ControllerBase
    {
        [HttpGet("companyPage")]
        public async Task<IActionResult> GetCompanyPage()
        {
            try
            {
                string page = await htmlGenerator.companyPageGenerator();
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


        [HttpGet("allCompany")]
        public async Task<IActionResult> GetAllCompany()
        {
            try
            {
                List<CompanyStruct> company = await companyCRUD.getAllCompanyDataAsync();
                return new JsonResult(company);

            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }
    }
}
