using Aspose.Words;
using Microsoft.EntityFrameworkCore;
using studentServer.Entity;
using studentServer.repo;

namespace studentServer.Service
{
    public class documentTemplateCRUD(documentTemplateRepo repository)
    {
        public async Task UploadDocumentTemplateAsync(IFormFile file, string templateName)
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

        public async Task<byte[]> GetDocumentTemplateByIdAsync(int id)
        {
            DocumentTemplate template = await repository.GetDocumentTemplateByIdAsync(id);

            using (var inputStream = new MemoryStream(template.Content))
            {
                // 3. Загружаем документ в Aspose
                // (Библиотека сама определит, что это .docx)
                Document doc = new Document(inputStream);

                // 4. Готовим поток для результата (PDF)
                using (MemoryStream outputStream = new MemoryStream())
                {
                    // Сохраняем документ как PDF в выходной поток
                    doc.Save(outputStream, SaveFormat.Pdf);
                    
                    return outputStream.ToArray();
                }
            }
        }

        public async Task<List<DocumentTemplate>> GetAllPreviewDocumentTemplateAsync(int page)
        {
            return await repository.GetAllPreviewDocumentTemplateAsync(page);
        }
    }
}
