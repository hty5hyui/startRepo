using Microsoft.AspNetCore.Mvc;
using studentServer.Entity;
using studentServer.Service;

namespace studentServer.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class documentController(documentTemplateCRUD documentService) :ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> UploadDocumentTemplate(IFormFile file, [FromQuery] string templateName)
        {
            if(file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            string extension = Path.GetExtension(file.FileName).ToLower();
            if (extension != ".docx" && extension != ".doc")
                return BadRequest("Файл должен быть формата Word");
            try
            {
                await documentService.UploadDocumentTemplateAsync(file, templateName);
                return StatusCode(StatusCodes.Status200OK);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
           $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetDocumentTemplateById([FromQuery] int id)
        {
            try
            {
                byte[] pdfBytes =  await documentService.GetDocumentTemplateByIdAsync(id);
                return File(pdfBytes, "application/pdf");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
           $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }


        [HttpGet("all")]
        public async Task<IActionResult> GetDocumentTemplatePreview([FromQuery] int page)
        {
            try
            {
                List<DocumentTemplate> templates = await documentService.GetAllPreviewDocumentTemplateAsync(page);
                return new JsonResult(templates);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
           $"<html><body><h1>Ошибка 500</h1><p>{ex.Message}</p></body></html>");
            }
        }

    }
}
