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
        public async Task<IActionResult> GetAllCompany([FromQuery] int page)
        {
            try
            {
                List<Company> companyList = await companyCRUD.getAllCompanyDataAsync(page);
                return new JsonResult(companyList);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanyData([FromQuery] int idCompany)
        {
            try
            {
                Company company = await companyCRUD.getCompanyDataAsync(idCompany);
                return new JsonResult(company);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpPatch]
        public async Task<IActionResult> PatchCompany([FromBody] Company newData)
        {
            try
            {
                await companyCRUD.patchCompanyAsync(newData);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddCompany([FromBody] Company newCompany)
        {
            try
            {
                await companyCRUD.addCompanyAsync(newCompany);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCompany([FromQuery] int idCompany)
        {
            try
            {
                await companyCRUD.deleteCompanyAsync(idCompany);
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
