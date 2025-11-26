using Aspose.Words;
using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using studentServer.repo;

namespace studentServer.Service
{
    public class documentTemplateCRUD(documentTemplateRepo repository)
    {
        internal async Task UploadDocumentTemplateAsync(IFormFile file, string templateName)
        {

            DocumentTemplate template;

            using (MemoryStream memoryStream = new MemoryStream())
            {
                // Копируем поток файла в память
                await file.CopyToAsync(memoryStream);

                template = new DocumentTemplate
                {
                    DocumentName = templateName,
                    Content = memoryStream.ToArray(),
                    CreatedAt = DateTime.UtcNow
                };
            }

            await repository.UploadDocumentTemplateAsync(template);
        }

        internal async Task<byte[]> GetDocumentTemplatePDFByIdAsync(int id)
        {
            DocumentTemplate template = await repository.GetDocumentTemplateByIdAsync(id);

            using (var inputStream = new MemoryStream(template.Content))
            {
                //Загружаем документ в Aspose
                //(Библиотека сама определит, что это .docx)
                Document doc = new Document(inputStream);

                //Готовим поток для результата (PDF)
                using (MemoryStream outputStream = new MemoryStream())
                {
                    // Сохраняем документ как PDF в выходной поток
                    doc.Save(outputStream, SaveFormat.Pdf);

                    return outputStream.ToArray();
                }
            }
        }

        internal async Task<DocumentTemplate> GetDocumentTemplateByIdAsync(int id)
        {
            DocumentTemplate template = await repository.GetDocumentTemplateByIdAsync(id);
            return template;

        }

        internal async Task<List<DocumentTemplate>> GetAllPreviewDocumentTemplateAsync(int page)
        {
            return await repository.GetAllPreviewDocumentTemplateAsync(page);
        }

        internal async Task DeleteDocumentTemplateAsync(int id)
        {
            DocumentTemplate template = new DocumentTemplate { Id = id };
            await repository.DeleteDocumentTemplateAsync(template);
        }
    }
}
