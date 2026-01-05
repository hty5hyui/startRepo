using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using studentServer.Entity;
using studentServer.Entity.DBEntity;
using studentServer.Service.CRUD;
using Syncfusion.DocIO.DLS;

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

            await documentService.UploadDocumentTemplateAsync(file, templateName);
            return StatusCode(StatusCodes.Status200OK);
        }

        [HttpGet]
        public async Task<IActionResult> GetDocumentTemplateById([FromQuery] int id)
        {
            byte[] pdfBytes = await documentService.GetDocumentTemplatePDFByIdAsync(id);
            return File(pdfBytes, "application/pdf");
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteDocumentTemplateById([FromQuery] int id)
        {
            await documentService.DeleteDocumentTemplateAsync(id);
            return StatusCode(StatusCodes.Status200OK);
        }


        [HttpGet("download")]
        public async Task<IActionResult> DownloadDocumentTemplateById([FromQuery] int id)
        {
            DocumentTemplate template = await documentService.GetDocumentTemplateByIdAsync(id);
            if (template.Content == null) return NotFound("Шаблон не найден");
            Console.WriteLine(template.DocumentName);
            return File(template.Content, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", template.DocumentName);
        }

        [HttpPost("all")]
        public async Task<IActionResult> GetDocumentTemplatePreview([FromBody] PageSearchEntity filterQuery)
        {
            DocumentTemplatePreviewPageData templates = await documentService.GetAllPreviewDocumentTemplateAsync(filterQuery);
            return new JsonResult(templates);
        }
        [HttpGet("search")]
        public async Task<IActionResult> SearchDocumentTemplatePreview([FromQuery] string str)
        {
            DocumentTemplatePreviewPageData templates = await documentService.SearchPreviewDocumentTemplateAsync(str);
            return new JsonResult(templates);
        }
    }
}
