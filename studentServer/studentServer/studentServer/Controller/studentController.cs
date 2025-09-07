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
                List<StudentData> studentList = await studentsService.getAllStudent(page);
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
                StudentData student = await studentsService.getStudentDataAsync(idStudent);
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
        public async Task<IActionResult> AddStudents([FromQuery] int count, [FromBody] StudentData newStudentData)
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

        [HttpGet("allProfession")]
        public async Task<IActionResult> GetAllProfession()
        {
            try
            {
                List<Profession> ProfessiontList = await studentsService.GetAllProfessionAsync();
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
                Profession profession = await studentsService.GetProfessionByIdAsync(id);
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
                await studentsService.SetProfessionAsync(profession);
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
                await studentsService.UpdateProfessionAsync(profession);
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
                await studentsService.DeleteProfessionAsync(profession);
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
