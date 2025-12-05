using System.IO.Pipelines;
using Aspose.Words;
using studentServer.Entity;
using studentServer.Entity.DBEntity;
using studentServer.repo;
using studentServer.Service.FileOperation;

namespace studentServer.Service.CRUD
{
    public class documentTemplateCRUD(documentTemplateRepo repository, LogService logger)
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

            return await Task.Run(() =>
            {
                byte[] replaceWord = WordReplacer.PlaceholderReplace(template.Content);
                return ConvertFileService.ConvertWordToPDF(replaceWord);
            });
        }

        internal async Task<DocumentTemplate> GetDocumentTemplateByIdAsync(int id)
        {
            DocumentTemplate template = await repository.GetDocumentTemplateByIdAsync(id);
            return template;

        }

        internal async Task<DocumentTemplatePreviewPageData> GetAllPreviewDocumentTemplateAsync(PageSearchEntity pageQuery)
        {
            DocumentTemplatePreviewPageData documentTemplatePreviewPageData = new DocumentTemplatePreviewPageData();

            if (pageQuery.searchFilter == null)
            {
                documentTemplatePreviewPageData = await repository.GetAllPreviewDocumentTemplateAsync(pageQuery.page);
            }
            else
            {
                documentTemplatePreviewPageData = await repository.GetPreviewDocumentTemplateSearchAsync(pageQuery);
            }

            return documentTemplatePreviewPageData;
        }

        internal async Task DeleteDocumentTemplateAsync(int id)
        {
            DocumentTemplate template = new DocumentTemplate { Id = id };
            await repository.DeleteDocumentTemplateAsync(template);
        }

        internal async Task<DocumentTemplatePreviewPageData> SearchPreviewDocumentTemplateAsync(string str)
        {
            DocumentTemplatePreviewPageData data = await repository.SearchPreviewDocumentTemplateAsync(str);
            return data;
        }
    }
}
