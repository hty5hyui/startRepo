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
            List<CompanyDTO> companyList = await companyService.getAllCompanyDataAsync(page);
            return new JsonResult(companyList);
        }

        [HttpGet("allCompanyName")]
        public async Task<IActionResult> GetAllCompanyName()
        {
            List<CompanyNameDTO> companyList = await companyService.getAllCompanyNameAsync();
            return new JsonResult(companyList);
        }

        [HttpGet]
        public async Task<IActionResult> GetCompanyData([FromQuery] int idCompany)
        {
            Company company = await companyService.getCompanyDataAsync(idCompany);
            return new JsonResult(company);
        }

        [HttpPatch]
        public async Task<IActionResult> PatchCompany([FromBody] Company newData)
        {
            await companyService.patchCompanyAsync(newData);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpPost]
        public async Task<IActionResult> AddCompany([FromBody] Company newCompany)
        {
            await companyService.addCompanyAsync(newCompany);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteCompany([FromQuery] int idCompany)
        {
            await companyService.deleteCompanyAsync(idCompany);
            return StatusCode(StatusCodes.Status200OK);
        }
    }
}
