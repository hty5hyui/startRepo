using Microsoft.AspNetCore.Mvc;
using studentServer.Entity;
using studentServer.Service;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class curatorController(curatorCRUD curatorService): ControllerBase
    {
        [HttpGet("allCurator")]
        public async Task<IActionResult> GetAllCurator()
        {
            try
            {
                List<CuratorDTO> CuratortList = await curatorService.GetAllCuratorAsync();
                return new JsonResult(CuratortList);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpGet("curator")]
        public async Task<IActionResult> GetCuratorById([FromQuery] int id)
        {
            try
            {
                string curator = await curatorService.GetCuratorDataAsync(id);
                return new JsonResult(curator);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpPost("curator")]
        public async Task<IActionResult> SetCurator([FromBody] Curator curator)
        {
            try
            {
                await curatorService.SetCuratorAsync(curator);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpPatch("curator")]
        public async Task<IActionResult> UpdateCurator([FromBody] Curator curator)
        {
            try
            {
                await curatorService.UpdateCuratorAsync(curator);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpDelete("curator")]
        public async Task<IActionResult> DeleteCurator([FromBody] int idCurator)
        {
            try
            {
                await curatorService.DeleteCuratorAsync(idCurator);
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
