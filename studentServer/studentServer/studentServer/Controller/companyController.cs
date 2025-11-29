using Microsoft.AspNetCore.Mvc;
using studentServer.Entity.DBEntity;
using studentServer.Service.CRUD;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class companyController(companyCRUD companyService) : ControllerBase
    {
        [HttpGet("allCompany")]
        public async Task<IActionResult> GetAllCompany([FromQuery] int page)
        {
            try
            {
                List<CompanyDTO> companyList = await companyService.getAllCompanyDataAsync(page);
                return new JsonResult(companyList);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpGet("allCompanyName")]
        public async Task<IActionResult> GetAllCompanyName()
        {
            try
            {
                List<CompanyNameDTO> companyList = await companyService.getAllCompanyNameAsync();
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
                Company company = await companyService.getCompanyDataAsync(idCompany);
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
                await companyService.patchCompanyAsync(newData);
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
                await companyService.addCompanyAsync(newCompany);
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
                await companyService.deleteCompanyAsync(idCompany);
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
