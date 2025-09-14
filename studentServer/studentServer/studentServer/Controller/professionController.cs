using Microsoft.AspNetCore.Mvc;
using studentServer.Entity;
using studentServer.Service;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class professionController(professionCRUD professionService) :ControllerBase
    {

        [HttpGet("allProfession")]
        public async Task<IActionResult> GetAllProfession()
        {
            try
            {
                List<Profession> ProfessiontList = await professionService.GetAllProfessionAsync();
                return new JsonResult(ProfessiontList);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpGet("profession")]
        public async Task<IActionResult> GetProfessionById([FromQuery] int id)
        {
            try
            {
                Profession profession = await professionService.GetProfessionByIdAsync(id);
                return new JsonResult(profession);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpPost("profession")]
        public async Task<IActionResult> SetProfession([FromBody] Profession profession)
        {
            try
            {
                await professionService.SetProfessionAsync(profession);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpPatch("profession")]
        public async Task<IActionResult> UpdateProfession([FromBody] Profession profession)
        {
            try
            {
                await professionService.UpdateProfessionAsync(profession);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpDelete("profession")]
        public async Task<IActionResult> DeleteProfession([FromBody] Profession profession)
        {
            try
            {
                await professionService.DeleteProfessionAsync(profession);
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
