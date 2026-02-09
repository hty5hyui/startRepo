using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using studentServer.Entity;
using studentServer.Entity.DBEntity;
using studentServer.repo;
using studentServer.Service.CRUD;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController(studentsCRUD studentsService) :ControllerBase
    {
        [HttpPost("allStudents")]
        public async Task<IActionResult> GetStudentPreviewAsync([FromBody] PageSearchEntity filterQuery)
        {
            StudentPreviewPageData studentDataList = await studentsService.getStudentPreviewAsync(filterQuery);
            return new JsonResult(studentDataList);
        }

        [HttpGet]
        public async Task<IActionResult> GetStudentData([FromQuery] int idStudent)
        {
            StudentDataDTO student = await studentsService.getStudentDataAsync(idStudent);
            return new JsonResult(student);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteStudents([FromBody] List<int> idStudents)
        {
            await studentsService.deleteStudentsAsync(idStudents);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpPatch]
        public async Task<IActionResult> PatchStudents([FromBody] StudentDataDTO newStudentsData)
        {
            await studentsService.patchStudentsAsync(newStudentsData);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpPatch("group")]
        public async Task<IActionResult> PatchGroupStudents([FromBody] StudentGroupDataDTO newStudentsData)
        {
            await studentsService.patchGroupStudentsAsync(newStudentsData);
            return StatusCode(StatusCodes.Status200OK);
        }


        [HttpPost]
        public async Task<IActionResult> AddStudents([FromQuery] int count, [FromBody] StudentDataDTO newStudentData)
        {
            await studentsService.addStudentsAsync(newStudentData, count);
            return StatusCode(StatusCodes.Status200OK);
        }
    }
}
