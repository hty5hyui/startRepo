using Microsoft.AspNetCore.Mvc;
using studentServer.Entity.DBEntity;
using studentServer.Service.CRUD;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class professionController(professionCRUD professionService) :ControllerBase
    {

        [HttpGet("allProfession")]
        public async Task<IActionResult> GetAllProfession()
        {
            List<ProfessionDTO> ProfessiontList = await professionService.GetAllProfessionAsync();
            return new JsonResult(ProfessiontList);
        }

        [HttpGet("profession")]
        public async Task<IActionResult> GetProfessionById([FromQuery] int id)
        {
            ProfessionDTO profession = await professionService.GetProfessionByIdAsync(id);
            return new JsonResult(profession);
        }

        [HttpPost("profession")]
        public async Task<IActionResult> SetProfession([FromBody] Profession profession)
        {
            await professionService.SetProfessionAsync(profession);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpPatch("profession")]
        public async Task<IActionResult> UpdateProfession([FromBody] Profession profession)
        {
            await professionService.UpdateProfessionAsync(profession);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpDelete("profession")]
        public async Task<IActionResult> DeleteProfession([FromBody] Profession profession)
        {
            await professionService.DeleteProfessionAsync(profession);
            return StatusCode(StatusCodes.Status200OK);
        }
    }
}
