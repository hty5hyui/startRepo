using Microsoft.AspNetCore.Mvc;
using studentServer.Entity.DBEntity;
using studentServer.Service.CRUD;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class curatorController(curatorCRUD curatorService): ControllerBase
    {
        [HttpGet("allCurator")]
        public async Task<IActionResult> GetAllCurator()
        {
            List<CuratorDTO> CuratortList = await curatorService.GetAllCuratorAsync();
            return new JsonResult(CuratortList);
        }

        [HttpGet("curator")]
        public async Task<IActionResult> GetCuratorById([FromQuery] int id)
        {
            string curator = await curatorService.GetCuratorDataAsync(id);
            return new JsonResult(curator);
        }

        [HttpPost("curator")]
        public async Task<IActionResult> SetCurator([FromBody] Curator curator)
        {
            await curatorService.SetCuratorAsync(curator);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpPatch("curator")]
        public async Task<IActionResult> UpdateCurator([FromBody] Curator curator)
        {
            await curatorService.UpdateCuratorAsync(curator);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpDelete("curator")]
        public async Task<IActionResult> DeleteCurator([FromBody] int idCurator)
        {
            await curatorService.DeleteCuratorAsync(idCurator);
            return StatusCode(StatusCodes.Status200OK);
        }
    }
}
