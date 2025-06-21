using Microsoft.AspNetCore.Mvc;
using studentServer.Entity;
using studentServer.Service;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class studentController:ControllerBase
    {
        [HttpGet("studentPage")]
        public async Task<IActionResult> GetStudentPage()
        {
            try
            {
                string page = await htmlGenerator.studentPageGenerator();
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

        [HttpGet("allStudents")]
        public async Task<IActionResult> GetAllStudents([FromQuery] int page)
        {
            try
            {
                List<Student> studentList = await studentsCRUD.getAllStudent(page);
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
                Student student = await studentsCRUD.getStudentDataAsync(idStudent);
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
                await studentsCRUD.deleteStudentsAsync(idStudents);
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
                await studentsCRUD.patchStudentsyAsync(newStudentsData);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
            $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddStudents([FromQuery] int count, [FromBody] Student newStudentData)
        {
            try
            {
                await studentsCRUD.addStudentsAsync(newStudentData, count);
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
