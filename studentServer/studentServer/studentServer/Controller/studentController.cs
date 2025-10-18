using Microsoft.AspNetCore.Mvc;
using studentServer.Entity;
using studentServer.repo;
using studentServer.Service;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class studentController(studentsCRUD studentsService) :ControllerBase
    {
        [HttpGet("allStudents")]
        public async Task<IActionResult> GetStudentPreviewAsync([FromQuery] int page)
        {
            try
            {
                List<StudentPreview> studentList = await studentsService.getStudentPreviewAsync(page);
                return new JsonResult(studentList);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetStudentData([FromQuery] int idStudent)
        {
            try
            {
                StudentDataDTO student = await studentsService.getStudentDataAsync(idStudent);
                return new JsonResult(student);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteStudents([FromBody] List<int> idStudents)
        {
            
            try
            {
                await studentsService.deleteStudentsAsync(idStudents);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpPatch]
        public async Task<IActionResult> PatchStudents([FromBody] PatchStudent newStudentsData)
        {
            try
            {
                await studentsService.patchStudentsyAsync(newStudentsData);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddStudents([FromQuery] int count, [FromBody] StudentDataDTO newStudentData)
        {
            try
            {
                await studentsService.addStudentsAsync(newStudentData, count);
                
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
